import { useState, useEffect } from "react";
import { X, Upload, Plus, Trash2, FileText, Check } from "lucide-react";
import { Button } from "../ui/button";
import { Combobox, ComboboxOption } from "../ui/combobox";
import { toast } from "sonner";

interface ServiceItem {
  id: string;
  serviceType: string;
  serviceName: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  discount: number;
  documentNumber: string; // ใช้เฉพาะ separated mode
  referenceNumber: string; // ใช้เฉพาะ separated mode
  uploadedFile: File | null; // ใช้เฉพาะ separated mode
}

interface UploadExternalQuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
  initialData?: {
    customerName?: string;
    relatedDealId?: string;
    validUntil?: string;
    documentNumber?: string;
    services?: Omit<ServiceItem, 'documentNumber' | 'uploadedFile'>[];
  };
}

export function UploadExternalQuotationModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: UploadExternalQuotationModalProps) {
  const [quotationMode, setQuotationMode] = useState<'combined' | 'separated'>('combined');
  const [customerName, setCustomerName] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [supplier, setSupplier] = useState("");
  const [status, setStatus] = useState("draft");
  const [relatedDealId, setRelatedDealId] = useState("");
  const [documentNumber, setDocumentNumber] = useState(""); // สำหรับ combined mode
  const [referenceNumber, setReferenceNumber] = useState(""); // สำหรับ combined mode
  const [combinedFile, setCombinedFile] = useState<File | null>(null); // สำหรับ combined mode
  const [services, setServices] = useState<ServiceItem[]>([
    {
      id: "1",
      serviceType: "Freight",
      serviceName: "",
      description: "",
      quantity: 1,
      unit: "รายการ",
      unitPrice: 0,
      discount: 0,
      documentNumber: "",
      referenceNumber: "",
      uploadedFile: null,
    },
  ]);

  // Auto-fill from initialData
  useEffect(() => {
    if (initialData && isOpen) {
      if (initialData.customerName) setCustomerName(initialData.customerName);
      if (initialData.relatedDealId) setRelatedDealId(initialData.relatedDealId);
      if (initialData.validUntil) setValidUntil(initialData.validUntil);
      if (initialData.services && initialData.services.length > 0) {
        setServices(
          initialData.services.map((s, idx) => ({
            ...s,
            documentNumber: initialData.documentNumber 
              ? `${initialData.documentNumber}-${String(idx + 1).padStart(3, '0')}`
              : "",
            referenceNumber: "",
            uploadedFile: null,
          }))
        );
      }
    }
  }, [initialData, isOpen]);

  const handleFileChange = (serviceId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setServices(
        services.map((s) =>
          s.id === serviceId ? { ...s, uploadedFile: file } : s
        )
      );
      toast.success(`อัปโหลดไฟล์สำเร็จ: ${file.name}`);
    }
  };

  const handleAddService = () => {
    const newService: ServiceItem = {
      id: Date.now().toString(),
      serviceType: "Freight",
      serviceName: "",
      description: "",
      quantity: 1,
      unit: "รายการ",
      unitPrice: 0,
      discount: 0,
      documentNumber: "",
      referenceNumber: "",
      uploadedFile: null,
    };
    setServices([...services, newService]);
  };

  const handleRemoveService = (id: string) => {
    if (services.length > 1) {
      setServices(services.filter((s) => s.id !== id));
    }
  };

  const handleServiceChange = (id: string, field: keyof ServiceItem, value: any) => {
    setServices(
      services.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const calculateLineTotal = (item: ServiceItem) => {
    const subtotal = item.quantity * item.unitPrice;
    const discountAmount = subtotal * (item.discount / 100);
    return subtotal - discountAmount;
  };

  const calculateSubtotal = () => {
    return services.reduce((sum, item) => sum + calculateLineTotal(item), 0);
  };

  const calculateVat = () => {
    return calculateSubtotal() * 0.07;
  };

  const calculateGrandTotal = () => {
    return calculateSubtotal() + calculateVat();
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("th-TH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleSave = () => {
    // Validation
    if (!customerName || !supplier || !issueDate) {
      toast.error("กรุณากรอกข้อมูลพื้นฐานให้ครบถ้วน");
      return;
    }

    if (services.some((s) => !s.serviceName || !s.serviceType || s.unitPrice <= 0)) {
      toast.error("กรุณากรอกข้อมูลบริการให้ครบถ้วน");
      return;
    }

    // Validation for Combined Mode
    if (quotationMode === 'combined') {
      if (!documentNumber) {
        toast.error("กรุณากรอกเลขที่เอกสาร");
        return;
      }
      if (!combinedFile) {
        toast.error("กรุณาอัปโหลดไฟล์ใบเสนอราคา");
        return;
      }
    }

    // Validation for Separated Mode
    if (quotationMode === 'separated') {
      if (services.some((s) => !s.documentNumber)) {
        toast.error("กรุณากรอกเลขที่เอกสารสำหรับทุกรายการ");
        return;
      }
      if (services.some((s) => !s.uploadedFile)) {
        toast.error("กรุณาอัปโหลดไฟล์สำหรับทุกรายการ");
        return;
      }
    }

    const data = {
      mode: quotationMode,
      customerName,
      issueDate,
      validUntil,
      supplier,
      status,
      relatedDealId,
      // Combined mode data
      ...(quotationMode === 'combined' && {
        documentNumber,
        referenceNumber,
        combinedFile,
      }),
      services,
      subtotal: calculateSubtotal(),
      vat: calculateVat(),
      grandTotal: calculateGrandTotal(),
    };

    onSave?.(data);
    handleClose();
    
    if (quotationMode === 'combined') {
      toast.success(`บันทึกใบเสนอราคา (${services.length} บริการ) สำเร็จ!`);
    } else {
      toast.success(`อัปโหลด ${services.length} ใบเสนอราคาสำเร็จ!`);
    }
  };

  const handleClose = () => {
    setQuotationMode('combined');
    setDocumentNumber("");
    setReferenceNumber("");
    setCombinedFile(null);
    setServices([
      {
        id: "1",
        serviceType: "Freight",
        serviceName: "",
        description: "",
        quantity: 1,
        unit: "รายการ",
        unitPrice: 0,
        discount: 0,
        documentNumber: "",
        referenceNumber: "",
        uploadedFile: null,
      },
    ]);
    setCustomerName("");
    setIssueDate("");
    setValidUntil("");
    setSupplier("");
    setStatus("draft");
    setRelatedDealId("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[95vw] max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#7BC9A6]/10 to-white">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Upload className="h-6 w-6 text-[#7BC9A6]" />
              อัปโหลดใบเสนอราคาจากภายนอก
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              กรอกข้อมูลและอัปโหลดไฟล์สำหรับแต่ละรายการบริการ
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="h-8 w-8 p-0 hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-3 py-3">
          <div className="space-y-3">
            {/* Mode Selection */}
            <div className="bg-gradient-to-r from-[#7BC9A6]/5 to-transparent border border-[#7BC9A6]/20 rounded-lg p-2">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                รูปแบบการอัปโหลด *
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-3 px-4 py-3 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 flex-1"
                  style={{
                    borderColor: quotationMode === 'combined' ? '#7BC9A6' : '#E5E7EB',
                    backgroundColor: quotationMode === 'combined' ? '#7BC9A6/5' : 'white'
                  }}
                >
                  <input
                    type="radio"
                    name="quotationMode"
                    value="combined"
                    checked={quotationMode === 'combined'}
                    onChange={(e) => setQuotationMode(e.target.value as 'combined' | 'separated')}
                    className="w-4 h-4 text-[#7BC9A6] focus:ring-[#7BC9A6]"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">รวมหลายบริการ (1 ไฟล์)</div>
                    <div className="text-xs text-gray-500 mt-0.5">ใบเสนอราคา 1 ใบ มีหลายบริการ</div>
                  </div>
                </label>
                <label className="flex items-center gap-3 px-4 py-3 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 flex-1"
                  style={{
                    borderColor: quotationMode === 'separated' ? '#7BC9A6' : '#E5E7EB',
                    backgroundColor: quotationMode === 'separated' ? '#7BC9A6/5' : 'white'
                  }}
                >
                  <input
                    type="radio"
                    name="quotationMode"
                    value="separated"
                    checked={quotationMode === 'separated'}
                    onChange={(e) => setQuotationMode(e.target.value as 'combined' | 'separated')}
                    className="w-4 h-4 text-[#7BC9A6] focus:ring-[#7BC9A6]"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">แยกบริการ (หลายไฟล์)</div>
                    <div className="text-xs text-gray-500 mt-0.5">แต่ละบริการมีใบเสนอราคาแยกกัน</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  ผู้จัดทำใบเสนอราคา (Supplier) *
                </label>
                <input
                  type="text"
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent"
                  placeholder="เช่น บริษัท ABC จำกัด"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">ลูกค้า/ลีด *</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent"
                  placeholder="ชื่อลูกค้า"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  ดีลที่เกี่ยวข้อง
                </label>
                <input
                  type="text"
                  value={relatedDealId}
                  onChange={(e) => setRelatedDealId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent"
                  placeholder="เช่น DL-2024-001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  วันที่ออกเอกสาร *
                </label>
                <input
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  วันที่หมดอายุ
                </label>
                <input
                  type="date"
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  สถานะ *
                </label>
                <Combobox
                  options={[
                    { value: "draft", label: "📝 ฉบับร่าง (Draft)" },
                    { value: "pending", label: "⏳ รอดำเนินการ (Pending)" },
                    { value: "sent", label: "📤 ส่งแล้ว (Sent)" },
                    { value: "approved", label: "✅ อนุมัติ (Approved)" },
                    { value: "rejected", label: "❌ ปฏิเสธ (Rejected)" },
                    { value: "expired", label: "⌛ หมดอายุ (Expired)" },
                  ]}
                  value={status}
                  onValueChange={setStatus}
                  placeholder="เลือกสถานะ"
                  searchPlaceholder="ค้นหาสถานะ..."
                  className="w-full h-10 border-gray-300 focus:ring-2 focus:ring-[#7BC9A6]"
                />
              </div>
            </div>

            {/* Combined Mode: Document & File Upload */}
            {quotationMode === 'combined' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#7BC9A6]" />
                  ข้อมูลเอกสารและไฟล์ใบเสนอราคา
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      เลขที่เอกสาร *
                    </label>
                    <input
                      type="text"
                      value={documentNumber}
                      onChange={(e) => setDocumentNumber(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent"
                      placeholder="เช่น QT-2024-001"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      เลขที่เอกสารอ้างอิง
                    </label>
                    <input
                      type="text"
                      value={referenceNumber}
                      onChange={(e) => setReferenceNumber(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent"
                      placeholder="เช่น REF-001"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      อัปโหลดไฟล์ใบเสนอราคา *
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="combined-file-upload"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setCombinedFile(e.target.files[0]);
                            toast.success(`อัปโหลดไฟล์สำเร็จ: ${e.target.files[0].name}`);
                          }
                        }}
                      />
                      <label
                        htmlFor="combined-file-upload"
                        className={`cursor-pointer flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
                          combinedFile
                            ? "bg-[#7BC9A6] text-white border-[#7BC9A6] hover:bg-[#6AB896]"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {combinedFile ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            {combinedFile.name}
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4 mr-2" />
                            เลือกไฟล์
                          </>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Services Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  รายการบริการและไฟล์ใบเสนอราคา *
                </label>
                <Button
                  type="button"
                  size="sm"
                  onClick={handleAddService}
                  className="h-8 px-3 text-xs bg-[#7BC9A6] hover:bg-[#6AB896]"
                >
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  เพิ่มบริการ
                </Button>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="text-left px-3 py-2.5 font-medium text-gray-700 w-8">
                          #
                        </th>
                        {quotationMode === 'separated' && (
                          <>
                            <th className="text-left px-3 py-2.5 font-medium text-gray-700 min-w-[150px]">
                              เลขที่เอกสาร *
                            </th>
                            <th className="text-left px-3 py-2.5 font-medium text-gray-700 min-w-[150px]">
                              เลขที่เอกสารอ้างอิง
                            </th>
                          </>
                        )}
                        <th className="text-left px-3 py-2.5 font-medium text-gray-700 min-w-[140px]">
                          ประเภทบริการ *
                        </th>
                        <th className="text-left px-3 py-2.5 font-medium text-gray-700 min-w-[160px]">
                          ชื่อบริการ *
                        </th>
                        <th className="text-left px-3 py-2.5 font-medium text-gray-700 min-w-[200px]">
                          รายละเอียด
                        </th>
                        <th className="text-center px-3 py-2.5 font-medium text-gray-700 w-24">
                          จำนวน *
                        </th>
                        <th className="text-center px-3 py-2.5 font-medium text-gray-700 w-24">
                          หน่วย
                        </th>
                        <th className="text-right px-3 py-2.5 font-medium text-gray-700 w-32">
                          ราคา/หน่วย *
                        </th>
                        <th className="text-right px-3 py-2.5 font-medium text-gray-700 w-24">
                          ส่วนลด (%)
                        </th>
                        <th className="text-right px-3 py-2.5 font-medium text-gray-700 w-32">
                          รวม
                        </th>
                        {quotationMode === 'separated' && (
                          <th className="text-center px-3 py-2.5 font-medium text-gray-700 w-28">
                            อัปโหลด *
                          </th>
                        )}
                        <th className="text-center px-3 py-2.5 font-medium text-gray-700 w-12">
                          ลบ
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      {services.map((service, index) => (
                        <tr key={service.id} className="hover:bg-gray-50">
                          <td className="px-3 py-2.5 text-gray-600 text-center">
                            {index + 1}
                          </td>
                          {quotationMode === 'separated' && (
                            <>
                              <td className="px-3 py-2.5">
                                <input
                                  type="text"
                                  value={service.documentNumber}
                                  onChange={(e) =>
                                    handleServiceChange(
                                      service.id,
                                      "documentNumber",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#7BC9A6]"
                                  placeholder="QT-2024-001"
                                />
                              </td>
                              <td className="px-3 py-2.5">
                                <input
                                  type="text"
                                  value={service.referenceNumber}
                                  onChange={(e) =>
                                    handleServiceChange(
                                      service.id,
                                      "referenceNumber",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#7BC9A6]"
                                  placeholder="REF-001"
                                />
                              </td>
                            </>
                          )}
                          <td className="px-3 py-2.5">
                            <Combobox
                              options={[
                                { value: "Freight", label: "Freight" },
                                { value: "Customs", label: "Customs" },
                                { value: "Warehouse", label: "Warehouse" },
                                { value: "Transport", label: "Transport" },
                                { value: "Crossborder", label: "Crossborder" },
                                { value: "Trading", label: "Trading" },
                                { value: "Service", label: "Service" },
                                { value: "Other", label: "Other" },
                                { value: "Unknown", label: "Unknown" },
                              ]}
                              value={service.serviceType}
                              onValueChange={(value) =>
                                handleServiceChange(
                                  service.id,
                                  "serviceType",
                                  value
                                )
                              }
                              placeholder="เลือกประเภท"
                              searchPlaceholder="ค้นหาประเภท..."
                              className="w-full h-8 text-sm border-gray-300 focus:ring-1 focus:ring-[#7BC9A6]"
                            />
                          </td>
                          <td className="px-3 py-2.5">
                            <input
                              type="text"
                              value={service.serviceName}
                              onChange={(e) =>
                                handleServiceChange(
                                  service.id,
                                  "serviceName",
                                  e.target.value
                                )
                              }
                              className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#7BC9A6]"
                              placeholder="ระบุชื่อบริการ"
                            />
                          </td>
                          <td className="px-3 py-2.5">
                            <input
                              type="text"
                              value={service.description}
                              onChange={(e) =>
                                handleServiceChange(
                                  service.id,
                                  "description",
                                  e.target.value
                                )
                              }
                              className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#7BC9A6]"
                              placeholder="รายละเอียดเพิ่มเติม"
                            />
                          </td>
                          <td className="px-3 py-2.5">
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={service.quantity}
                              onChange={(e) =>
                                handleServiceChange(
                                  service.id,
                                  "quantity",
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm text-center focus:outline-none focus:ring-1 focus:ring-[#7BC9A6]"
                            />
                          </td>
                          <td className="px-3 py-2.5">
                            <input
                              type="text"
                              value={service.unit}
                              onChange={(e) =>
                                handleServiceChange(
                                  service.id,
                                  "unit",
                                  e.target.value
                                )
                              }
                              className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm text-center focus:outline-none focus:ring-1 focus:ring-[#7BC9A6]"
                              placeholder="หน่วย"
                            />
                          </td>
                          <td className="px-3 py-2.5">
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={service.unitPrice}
                              onChange={(e) =>
                                handleServiceChange(
                                  service.id,
                                  "unitPrice",
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm text-right focus:outline-none focus:ring-1 focus:ring-[#7BC9A6]"
                            />
                          </td>
                          <td className="px-3 py-2.5">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              step="0.01"
                              value={service.discount}
                              onChange={(e) =>
                                handleServiceChange(
                                  service.id,
                                  "discount",
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm text-right focus:outline-none focus:ring-1 focus:ring-[#7BC9A6]"
                            />
                          </td>
                          <td className="px-3 py-2.5 text-right font-medium text-gray-900">
                            ฿{formatCurrency(calculateLineTotal(service))}
                          </td>
                          {quotationMode === 'separated' && (
                            <td className="px-3 py-2.5 text-center">
                              <div className="relative">
                                <input
                                  type="file"
                                  id={`file-upload-${service.id}`}
                                  className="hidden"
                                  accept=".pdf,.jpg,.jpeg,.png"
                                  onChange={(e) => handleFileChange(service.id, e)}
                                />
                                <label
                                  htmlFor={`file-upload-${service.id}`}
                                  className={`cursor-pointer inline-flex items-center justify-center px-2 py-1 rounded text-xs font-medium transition-colors ${
                                    service.uploadedFile
                                      ? "bg-[#7BC9A6] text-white hover:bg-[#6AB896]"
                                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                  }`}
                                >
                                  {service.uploadedFile ? (
                                    <>
                                      <Check className="h-3 w-3 mr-1" />
                                      อัปโหลดแล้ว
                                    </>
                                  ) : (
                                    <>
                                      <Upload className="h-3 w-3 mr-1" />
                                      เลือกไฟล์
                                    </>
                                  )}
                                </label>
                                {service.uploadedFile && (
                                  <div className="text-xs text-gray-500 mt-1 truncate max-w-[100px]" title={service.uploadedFile.name}>
                                    {service.uploadedFile.name}
                                  </div>
                                )}
                              </div>
                            </td>
                          )}
                          <td className="px-3 py-2.5 text-center">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveService(service.id)}
                              disabled={services.length === 1}
                              className="h-7 w-7 p-0 hover:bg-red-50 hover:text-red-600 disabled:opacity-30"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="flex justify-end">
              <div className="w-full md:w-96 bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-gray-600">ยอดรวมก่อน VAT:</span>
                    <span className="font-medium text-gray-900">
                      ฿{formatCurrency(calculateSubtotal())}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-gray-600">VAT 7%:</span>
                    <span className="font-medium text-gray-900">
                      ฿{formatCurrency(calculateVat())}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-semibold text-gray-900">
                      ยอดรวมทั้งสิ้น:
                    </span>
                    <span className="text-lg font-bold text-[#7BC9A6]">
                      ฿{formatCurrency(calculateGrandTotal())}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            <span className="flex items-center gap-2">
              รายการทั้งหมด: <span className="font-semibold text-[#7BC9A6]">{services.length} ใบ</span>
              {services.filter(s => s.uploadedFile).length > 0 && (
                <>
                  | อัปโหลดแล้ว: <span className="font-semibold text-[#7BC9A6]">{services.filter(s => s.uploadedFile).length} ใบ</span>
                </>
              )}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleClose}
              className="px-6"
            >
              ยกเลิก
            </Button>
            <Button
              onClick={handleSave}
              className="px-6 bg-[#7BC9A6] hover:bg-[#6ab395] text-white"
            >
              <Check className="h-4 w-4 mr-2" />
              บันทึก {services.length} ใบเสนอราคา
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}