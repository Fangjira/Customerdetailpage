import { useState } from "react";
import { 
  ArrowLeft, 
  FileText, 
  Upload, 
  Download, 
  Clock, 
  User, 
  Calendar,
  Building2,
  Package,
  FileCheck,
  Plus,
  Eye,
  Trash2,
  Edit2,
  Save,
  X,
  XCircle,
  CheckCircle2
} from "lucide-react";

interface QuotationFile {
  id: string;
  version: number;
  fileName: string;
  fileSize: string;
  fileType: string;
  uploadedBy: string;
  uploadedAt: string;
  notes: string;
  status: "active" | "archived";
}

interface ServiceItem {
  id: string;
  serviceName: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  discount: number;
}

interface QuotationUploadDetailProps {
  quotationId: string;
  onBack: () => void;
}

export function QuotationUploadDetailScreen({ quotationId, onBack }: QuotationUploadDetailProps) {
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadNotes, setUploadNotes] = useState("");
  const [isEditingServices, setIsEditingServices] = useState(false);
  const [showAllVersions, setShowAllVersions] = useState(false);
  const [isEditingQuotation, setIsEditingQuotation] = useState(false);

  // Mock data - ใบเสนอราคาแบบอัปโหลด
  const [quotation, setQuotation] = useState({
    id: "QT-2024-008",
    documentNumber: "EXT-QT-2024-001",
    supplier: "บริษัท เอบีซี โลจิสติกส์ โซลูชั่น จำกัด",
    customer: "บริษัท ไทยคอนซูเมอร์ โปรดักส์ จำกัด",
    issueDate: "2024-03-03",
    validUntil: "2024-04-15",
    services: [
      {
        id: "1",
        serviceName: "บริการขนส่งสินค้าอุปโภคบริโภค",
        description: "ขนส่งจากโรงงานถึงศูนย์กระจายสินค้า",
        quantity: 50,
        unit: "เที่ยว",
        unitPrice: 80000,
        discount: 5,
      },
      {
        id: "2",
        serviceName: "บริการจัดเก็บสินค้าในคลัง",
        description: "เก็บสินค้าในคลังควบคุมอุณหภูมิ",
        quantity: 3,
        unit: "เดือน",
        unitPrice: 120000,
        discount: 0,
      },
    ],
    uploadedBy: "สมชาย ใจดี (Sales Rep)",
    dealId: "DL-2024-152",
  });

  const [editedServices, setEditedServices] = useState<ServiceItem[]>([...quotation.services]);

  // Edited quotation state
  const [editedQuotation, setEditedQuotation] = useState({
    documentNumber: quotation.documentNumber,
    supplier: quotation.supplier,
    customer: quotation.customer,
    issueDate: quotation.issueDate,
    validUntil: quotation.validUntil,
    dealId: quotation.dealId,
  });

  // Mock data - ประวัติการอัปโหลดไฟล์
  const [fileHistory] = useState<QuotationFile[]>([
    {
      id: "f1",
      version: 1,
      fileName: "Quotation_Global_Logistics_v1.pdf",
      fileSize: "2.3 MB",
      fileType: "application/pdf",
      uploadedBy: "สมชาย ใจดี",
      uploadedAt: "2024-03-15T10:30:00",
      notes: "เวอร์ชันแรก - ใบเสนอราคาเบื้องต้น",
      status: "archived",
    },
    {
      id: "f2",
      version: 2,
      fileName: "Quotation_Global_Logistics_v2.pdf",
      fileSize: "2.5 MB",
      fileType: "application/pdf",
      uploadedBy: "สมชาย ใจดี",
      uploadedAt: "2024-03-16T14:20:00",
      notes: "แก้ไขราคาตามข้อเสนอของลูกค้า ลด 5%",
      status: "archived",
    },
    {
      id: "f3",
      version: 3,
      fileName: "Quotation_Global_Logistics_v3_Final.pdf",
      fileSize: "2.6 MB",
      fileType: "application/pdf",
      uploadedBy: "วิชัย ผู้จัดการ",
      uploadedAt: "2024-03-18T09:15:00",
      notes: "เวอร์ชันสุดท้าย - เพิ่ม Terms & Conditions ฉบับใหม่",
      status: "active",
    },
    {
      id: "f4",
      version: 4,
      fileName: "Quotation_Global_Logistics_Revised.pdf",
      fileSize: "2.7 MB",
      fileType: "application/pdf",
      uploadedBy: "สมชาย ใจดี",
      uploadedAt: "2024-03-20T16:45:00",
      notes: "เพิ่มรายละเอียดเส้นทางขนส่งและ SLA",
      status: "active",
    },
  ]);

  // Calculate totals
  const calculateSubtotal = (services: ServiceItem[]) => {
    return services.reduce((sum, service) => {
      const subtotal = service.quantity * service.unitPrice;
      const discountAmount = subtotal * (service.discount / 100);
      return sum + (subtotal - discountAmount);
    }, 0);
  };

  const subtotal = calculateSubtotal(quotation.services);
  const vat = subtotal * 0.07;
  const grandTotal = subtotal + vat;

  const handleEditServices = () => {
    setEditedServices([...quotation.services]);
    setIsEditingServices(true);
  };

  const handleSaveServices = () => {
    setQuotation({ ...quotation, services: editedServices });
    setIsEditingServices(false);
  };

  const handleCancelEdit = () => {
    setEditedServices([...quotation.services]);
    setIsEditingServices(false);
  };

  const handleServiceChange = (id: string, field: keyof ServiceItem, value: string | number) => {
    setEditedServices(
      editedServices.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const handleAddService = () => {
    const newService: ServiceItem = {
      id: Date.now().toString(),
      serviceName: "",
      description: "",
      quantity: 1,
      unit: "รายการ",
      unitPrice: 0,
      discount: 0,
    };
    setEditedServices([...editedServices, newService]);
  };

  const handleRemoveService = (id: string) => {
    if (editedServices.length > 1) {
      setEditedServices(editedServices.filter((s) => s.id !== id));
    }
  };

  // Quotation editing handlers
  const handleEditQuotation = () => {
    setEditedQuotation({
      documentNumber: quotation.documentNumber,
      supplier: quotation.supplier,
      customer: quotation.customer,
      issueDate: quotation.issueDate,
      validUntil: quotation.validUntil,
      dealId: quotation.dealId,
    });
    setIsEditingQuotation(true);
  };

  const handleSaveQuotation = () => {
    setQuotation({ ...quotation, ...editedQuotation });
    setIsEditingQuotation(false);
  };

  const handleCancelQuotationEdit = () => {
    setEditedQuotation({
      documentNumber: quotation.documentNumber,
      supplier: quotation.supplier,
      customer: quotation.customer,
      issueDate: quotation.issueDate,
      validUntil: quotation.validUntil,
      dealId: quotation.dealId,
    });
    setIsEditingQuotation(false);
  };

  const handleQuotationChange = (field: string, value: string) => {
    setEditedQuotation({ ...editedQuotation, [field]: value });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("th-TH", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatShortDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("th-TH", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  };

  const servicesToDisplay = isEditingServices ? editedServices : quotation.services;

  return (
    <div className="p-2 sm:p-3 lg:p-4 bg-gray-50 min-h-screen">
      <div className="max-w-[1400px] mx-auto space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="h-9 w-9 p-0 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">
                รายละเอียดใบเสนอราคา
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                {quotation.documentNumber} • {quotation.customer}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowUploadDialog(true)}
            className="h-9 px-3 text-xs bg-[#7BC9A6] hover:bg-[#6AB896] text-white border-[#7BC9A6] rounded-lg flex items-center gap-1.5"
          >
            <Upload className="h-3.5 w-3.5" />
            อัปโหลดเวอร์ชันใหม่
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Left Column - Quotation Info + Services (2/3) */}
          <div className="lg:col-span-2 space-y-3">
            {/* Quotation Info Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#7BC9A6]" />
                  <h2 className="text-sm font-bold text-gray-900">ข้อมูลใบเสนอราคา</h2>
                </div>
                
                {!isEditingQuotation ? (
                  <button
                    onClick={handleEditQuotation}
                    className="text-xs text-[#7BC9A6] hover:text-[#6AB896] font-medium"
                  >
                    แก้ไข
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancelQuotationEdit}
                      className="text-xs text-gray-600 hover:text-gray-900 font-medium"
                    >
                      ยกเลิก
                    </button>
                    <button
                      onClick={handleSaveQuotation}
                      className="text-xs text-[#7BC9A6] hover:text-[#6AB896] font-medium"
                    >
                      บันทึก
                    </button>
                  </div>
                )}
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <label className="text-xs text-gray-500">เลขที่เอกสาร</label>
                  {isEditingQuotation ? (
                    <input
                      type="text"
                      value={editedQuotation.documentNumber}
                      onChange={(e) => handleQuotationChange("documentNumber", e.target.value)}
                      className="w-full mt-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#7BC9A6]"
                    />
                  ) : (
                    <p className="font-medium text-gray-900">{quotation.documentNumber}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-gray-500">ผู้จัดทำใบเสนอราคา (Supplier)</label>
                  {isEditingQuotation ? (
                    <input
                      type="text"
                      value={editedQuotation.supplier}
                      onChange={(e) => handleQuotationChange("supplier", e.target.value)}
                      className="w-full mt-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#7BC9A6]"
                    />
                  ) : (
                    <p className="font-medium text-gray-900">{quotation.supplier}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-gray-500">วันที่ออกเอกสาร</label>
                  {isEditingQuotation ? (
                    <input
                      type="date"
                      value={editedQuotation.issueDate}
                      onChange={(e) => handleQuotationChange("issueDate", e.target.value)}
                      className="w-full mt-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#7BC9A6]"
                    />
                  ) : (
                    <p className="font-medium text-gray-900">{formatShortDate(quotation.issueDate)}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-gray-500">ลูกค้า</label>
                  {isEditingQuotation ? (
                    <input
                      type="text"
                      value={editedQuotation.customer}
                      onChange={(e) => handleQuotationChange("customer", e.target.value)}
                      className="w-full mt-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#7BC9A6]"
                    />
                  ) : (
                    <p className="font-medium text-gray-900">{quotation.customer}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-gray-500">วันหมดอายุ</label>
                  {isEditingQuotation ? (
                    <input
                      type="date"
                      value={editedQuotation.validUntil}
                      onChange={(e) => handleQuotationChange("validUntil", e.target.value)}
                      className="w-full mt-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#7BC9A6]"
                    />
                  ) : (
                    <p className="font-medium text-gray-900">{formatShortDate(quotation.validUntil)}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-gray-500">ดีล</label>
                  {isEditingQuotation ? (
                    <input
                      type="text"
                      value={editedQuotation.dealId}
                      onChange={(e) => handleQuotationChange("dealId", e.target.value)}
                      className="w-full mt-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#7BC9A6]"
                    />
                  ) : (
                    <p className="font-medium text-blue-600">{quotation.dealId}</p>
                  )}
                </div>

                <div className="col-span-2">
                  <label className="text-xs text-gray-500">ผู้รับผิดชอบ</label>
                  <p className="font-medium text-gray-900">{quotation.uploadedBy}</p>
                </div>
              </div>
            </div>

            {/* Services Table */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <Package className="h-4 w-4 text-[#7BC9A6]" />
                  รายการบริการ
                </h2>
                
                {!isEditingServices ? (
                  <button
                    onClick={handleEditServices}
                    className="px-3 py-1.5 bg-[#7BC9A6] hover:bg-[#6AB896] text-white text-xs rounded-lg font-medium"
                  >
                    แก้ไข
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancelEdit}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-lg font-medium"
                    >
                      ยกเลิก
                    </button>
                    <button
                      onClick={handleSaveServices}
                      className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs rounded-lg font-medium"
                    >
                      บันทึก
                    </button>
                  </div>
                )}
              </div>

              <div className="overflow-x-auto -mx-4 px-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-2 text-xs font-medium text-gray-700">#</th>
                      <th className="text-left py-2 px-2 text-xs font-medium text-gray-700">ชื่อบริการ</th>
                      <th className="text-left py-2 px-2 text-xs font-medium text-gray-700">รายละเอียด</th>
                      <th className="text-center py-2 px-2 text-xs font-medium text-gray-700">จำนวน</th>
                      <th className="text-center py-2 px-2 text-xs font-medium text-gray-700">หน่วย</th>
                      <th className="text-right py-2 px-2 text-xs font-medium text-gray-700">ราคา/หน่วย</th>
                      <th className="text-center py-2 px-2 text-xs font-medium text-gray-700">ส่วนลด</th>
                      <th className="text-right py-2 px-2 text-xs font-medium text-gray-700">ยอดรวม</th>
                      {isEditingServices && (
                        <th className="text-center py-2 px-2 text-xs font-medium text-gray-700"></th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {servicesToDisplay.map((service, index) => {
                      const lineSubtotal = service.quantity * service.unitPrice;
                      const discountAmount = lineSubtotal * (service.discount / 100);
                      const total = lineSubtotal - discountAmount;
                      
                      return (
                        <tr key={service.id} className="border-b border-gray-100">
                          <td className="py-2 px-2 text-gray-600">{index + 1}</td>
                          
                          <td className="py-2 px-2">
                            {isEditingServices ? (
                              <input
                                type="text"
                                value={service.serviceName}
                                onChange={(e) =>
                                  handleServiceChange(service.id, "serviceName", e.target.value)
                                }
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#7BC9A6]"
                                placeholder="ชื่อบริการ"
                              />
                            ) : (
                              <span className="font-medium text-gray-900">{service.serviceName}</span>
                            )}
                          </td>

                          <td className="py-2 px-2">
                            {isEditingServices ? (
                              <input
                                type="text"
                                value={service.description}
                                onChange={(e) =>
                                  handleServiceChange(service.id, "description", e.target.value)
                                }
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#7BC9A6]"
                                placeholder="รายละเอียด"
                              />
                            ) : (
                              <span className="text-gray-700">{service.description}</span>
                            )}
                          </td>

                          <td className="py-2 px-2 text-center">
                            {isEditingServices ? (
                              <input
                                type="number"
                                value={service.quantity}
                                onChange={(e) =>
                                  handleServiceChange(service.id, "quantity", parseFloat(e.target.value) || 0)
                                }
                                className="w-full px-2 py-1 text-sm text-center border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#7BC9A6]"
                                min="0"
                              />
                            ) : (
                              <span className="font-medium text-gray-900">{service.quantity}</span>
                            )}
                          </td>

                          <td className="py-2 px-2 text-center">
                            {isEditingServices ? (
                              <input
                                type="text"
                                value={service.unit}
                                onChange={(e) =>
                                  handleServiceChange(service.id, "unit", e.target.value)
                                }
                                className="w-full px-2 py-1 text-sm text-center border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#7BC9A6]"
                                placeholder="หน่วย"
                              />
                            ) : (
                              <span className="text-gray-700">{service.unit}</span>
                            )}
                          </td>

                          <td className="py-2 px-2 text-right">
                            {isEditingServices ? (
                              <input
                                type="number"
                                value={service.unitPrice}
                                onChange={(e) =>
                                  handleServiceChange(service.id, "unitPrice", parseFloat(e.target.value) || 0)
                                }
                                className="w-full px-2 py-1 text-sm text-right border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#7BC9A6]"
                                min="0"
                              />
                            ) : (
                              <span className="font-medium text-gray-900">
                                ฿{service.unitPrice.toLocaleString()}
                              </span>
                            )}
                          </td>

                          <td className="py-2 px-2 text-center">
                            {isEditingServices ? (
                              <input
                                type="number"
                                value={service.discount}
                                onChange={(e) =>
                                  handleServiceChange(service.id, "discount", parseFloat(e.target.value) || 0)
                                }
                                className="w-full px-2 py-1 text-sm text-center border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#7BC9A6]"
                                min="0"
                                max="100"
                              />
                            ) : (
                              service.discount > 0 ? (
                                <span className="text-red-600 font-medium">{service.discount}%</span>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )
                            )}
                          </td>

                          <td className="py-2 px-2 text-right font-medium text-[#7BC9A6]">
                            ฿{total.toLocaleString()}
                          </td>

                          {isEditingServices && (
                            <td className="py-2 px-2 text-center">
                              <button
                                onClick={() => handleRemoveService(service.id)}
                                disabled={editedServices.length === 1}
                                className="p-1 text-red-600 hover:bg-red-50 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                                title="ลบบริการ"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    {isEditingServices && (
                      <tr>
                        <td colSpan={9} className="py-2">
                          <button
                            onClick={handleAddService}
                            className="w-full py-2 text-sm text-[#7BC9A6] hover:bg-green-50 rounded font-medium border border-dashed border-[#7BC9A6]"
                          >
                            + เพิ่มบริการใหม่
                          </button>
                        </td>
                      </tr>
                    )}
                    <tr className="border-t-2 border-gray-200">
                      <td colSpan={isEditingServices ? 8 : 7} className="py-2 px-2 text-right text-sm font-medium text-gray-700">
                        ยอดรวม
                      </td>
                      <td className="py-2 px-2 text-right font-medium text-gray-900">
                        ฿{subtotal.toLocaleString(undefined, {minimumFractionDigits: 2})}
                      </td>
                      {isEditingServices && <td></td>}
                    </tr>
                    <tr>
                      <td colSpan={isEditingServices ? 8 : 7} className="py-1 px-2 text-right text-sm font-medium text-gray-700">
                        VAT 7%
                      </td>
                      <td className="py-1 px-2 text-right font-medium text-gray-900">
                        ฿{vat.toLocaleString(undefined, {minimumFractionDigits: 2})}
                      </td>
                      {isEditingServices && <td></td>}
                    </tr>
                    <tr className="bg-[#7BC9A6]/10 border-t border-[#7BC9A6]">
                      <td colSpan={isEditingServices ? 8 : 7} className="py-2 px-2 text-right text-sm font-bold text-[#7BC9A6]">
                        ยอดรวมทั้งสิ้น
                      </td>
                      <td className="py-2 px-2 text-right font-bold text-[#7BC9A6]">
                        ฿{grandTotal.toLocaleString(undefined, {minimumFractionDigits: 2})}
                      </td>
                      {isEditingServices && <td></td>}
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column - File History (1/3) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-gray-900">ประวัติการอัปโหลดไฟล์</h2>
              </div>

              <div className="space-y-2">
                {(showAllVersions ? fileHistory : fileHistory.slice(-2)).map((file) => (
                  <div
                    key={file.id}
                    className="p-3 border border-gray-200 rounded-lg hover:border-[#7BC9A6] transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                        <FileText className="h-4 w-4 text-red-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-medium text-gray-900 truncate">
                          {file.fileName}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                          <User className="h-3 w-3" />
                          <span>{file.uploadedBy}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-600">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(file.uploadedAt)}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <button className="p-1.5 bg-[#7BC9A6] text-white rounded hover:bg-[#6AB896]" title="ดาวน์โหลด">
                          <Download className="h-3 w-3" />
                        </button>
                        <button className="p-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200" title="ดูตัวอย่าง">
                          <Eye className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {fileHistory.length > 2 && (
                <button
                  onClick={() => setShowAllVersions(!showAllVersions)}
                  className="w-full mt-2 py-2 text-xs text-[#7BC9A6] hover:bg-green-50 rounded font-medium"
                >
                  {showAllVersions ? "ซ่อนเวอร์ชันเก่า" : `ดูทั้งหมด (${fileHistory.length} เวอร์ชัน)`}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Upload Dialog */}
      {showUploadDialog && (
        <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">อัปโหลดไฟล์เวอร์ชันใหม่</h3>
              <button
                onClick={() => {
                  setShowUploadDialog(false);
                  setSelectedFile(null);
                  setUploadNotes("");
                }}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <XCircle className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  เลือกไฟล์
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-white focus:outline-none file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-medium file:bg-[#7BC9A6]/10 file:text-[#7BC9A6] hover:file:bg-[#7BC9A6]/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  หมายเหตุการเปลี่ยนแปลง
                </label>
                <textarea
                  value={uploadNotes}
                  onChange={(e) => setUploadNotes(e.target.value)}
                  placeholder="บันทึกรายละเอียดการแก้ไข..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#7BC9A6] text-sm resize-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    setShowUploadDialog(false);
                    setSelectedFile(null);
                    setUploadNotes("");
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded hover:bg-gray-50 text-sm"
                >
                  ยกเลิก
                </button>
                <button
                  disabled={!selectedFile}
                  className="flex-1 px-4 py-2 bg-[#7BC9A6] text-white font-medium rounded hover:bg-[#6AB896] disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
                >
                  อัปโหลด
                </button>
              </div>
            </div>
          </div>
      )}
    </div>
  );
}
