import { useState, useRef } from "react";
import { X, Upload, FileText, AlertCircle, Calendar as CalendarIcon, Building2, DollarSign, Hash } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Combobox } from "./ui/combobox";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { toast } from "sonner";

interface UploadExternalQuotationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
}

export function UploadExternalQuotationDialog({
  isOpen,
  onClose,
  onSave,
}: UploadExternalQuotationDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Form data
  const [quotationNumber, setQuotationNumber] = useState("");
  const [quotationName, setQuotationName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [dealId, setDealId] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Draft");
  const [serviceType, setServiceType] = useState("");
  const [bu, setBU] = useState("");
  const [createdDate, setCreatedDate] = useState<Date | undefined>(new Date());
  const [validUntilDate, setValidUntilDate] = useState<Date | undefined>(undefined);
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const handleFileSelect = (file: File) => {
    // Validate file type
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("กรุณาอัปโหลดไฟล์ PDF หรือรูปภาพเท่านั้น");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("ขนาดไฟล์ต้องไม่เกิน 10MB");
      return;
    }

    setSelectedFile(file);
    toast.success(`เลือกไฟล์: ${file.name}`);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = () => {
    // Validation
    if (!selectedFile) {
      toast.error("กรุณาอัปโหลดไฟล์ใบเสนอราคา");
      return;
    }
    if (!quotationNumber.trim()) {
      toast.error("กรุณากรอกเลขที่ใบเสนอราคา");
      return;
    }
    if (!quotationName.trim()) {
      toast.error("กรุณากรอกชื่อใบเสนอราคา");
      return;
    }
    if (!customerName.trim()) {
      toast.error("กรุณากรอกชื่อลูกค้า");
      return;
    }
    if (!amount.trim()) {
      toast.error("กรุณากรอกมูลค่า");
      return;
    }
    if (!serviceType) {
      toast.error("กรุณาเลือกประเภทบริการ");
      return;
    }

    const data = {
      file: selectedFile,
      quotationNumber,
      quotationName,
      customerName,
      dealId,
      amount: parseFloat(amount.replace(/,/g, "")),
      status,
      serviceType,
      bu,
      createdDate,
      validUntilDate,
      notes,
      isExternal: true,
    };

    onSave?.(data);
    toast.success("อัปโหลดใบเสนอราคาสำเร็จ");
    handleClose();
  };

  const handleClose = () => {
    // Reset form
    setSelectedFile(null);
    setQuotationNumber("");
    setQuotationName("");
    setCustomerName("");
    setDealId("");
    setAmount("");
    setStatus("Draft");
    setServiceType("");
    setBU("");
    setCreatedDate(new Date());
    setValidUntilDate(undefined);
    setNotes("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onClose();
  };

  const formatCurrency = (value: string) => {
    const number = value.replace(/[^\d]/g, "");
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    setAmount(formatted);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-[#7BC9A6]/10 to-[#7BC9A6]/5">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Upload className="h-6 w-6 text-[#7BC9A6]" />
              อัปโหลดใบเสนอราคาจากภายนอก
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              นำเข้าใบเสนอราคาที่สร้างนอกระบบเข้าสู่ ONELINK CRM
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            
            {/* File Upload Section */}
            <div>
              <Label className="text-sm font-semibold text-gray-900 mb-3 block flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#7BC9A6]" />
                ไฟล์ใบเสนอราคา
                <span className="text-red-500">*</span>
              </Label>
              
              {!selectedFile ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                    isDragging
                      ? "border-[#7BC9A6] bg-[#7BC9A6]/10"
                      : "border-gray-300 hover:border-[#7BC9A6] hover:bg-gray-50"
                  }`}
                >
                  <Upload className={`h-12 w-12 mx-auto mb-4 ${isDragging ? "text-[#7BC9A6]" : "text-gray-400"}`} />
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    คลิกเพื่ออัปโหลด หรือลากไฟล์มาวางที่นี่
                  </p>
                  <p className="text-xs text-gray-500">
                    รองรับไฟล์ PDF, JPG, PNG (ขนาดไม่เกิน 10MB)
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="border-2 border-[#7BC9A6] rounded-xl p-4 bg-[#7BC9A6]/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 bg-[#7BC9A6]/20 rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-[#7BC9A6]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                        <p className="text-xs text-gray-500">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveFile}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Alert Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">กรอกข้อมูลเพื่อบันทึกลงระบบ</p>
                <p className="text-xs text-blue-700 mt-1">
                  ข้อมูลที่กรอกจะช่วยให้สามารถค้นหาและติดตามใบเสนอราคาได้ง่ายขึ้น
                </p>
              </div>
            </div>

            {/* Form Fields - Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-900 mb-2 block flex items-center gap-1.5">
                  <Hash className="h-4 w-4 text-gray-600" />
                  เลขที่ใบเสนอราคา
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={quotationNumber}
                  onChange={(e) => setQuotationNumber(e.target.value)}
                  placeholder="เช่น QT-2024-001"
                  className="border-gray-300 focus:border-[#7BC9A6] focus:ring-[#7BC9A6]"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-900 mb-2 block flex items-center gap-1.5">
                  <CalendarIcon className="h-4 w-4 text-gray-600" />
                  วันที่สร้าง
                  <span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left border-gray-300 hover:border-[#7BC9A6]"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-gray-600" />
                      {createdDate ? (
                        format(createdDate, "dd MMMM yyyy", { locale: th })
                      ) : (
                        <span className="text-gray-500">เลือกวันที่</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={createdDate}
                      onSelect={setCreatedDate}
                      locale={th}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Form Fields - Row 2 */}
            <div>
              <Label className="text-sm font-medium text-gray-900 mb-2 block flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-gray-600" />
                ชื่อใบเสนอราคา
                <span className="text-red-500">*</span>
              </Label>
              <Input
                value={quotationName}
                onChange={(e) => setQuotationName(e.target.value)}
                placeholder="เช่น ใบเสนอราคาบริการคลังสินค้าและขนส่ง"
                className="border-gray-300 focus:border-[#7BC9A6] focus:ring-[#7BC9A6]"
              />
            </div>

            {/* Form Fields - Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-900 mb-2 block flex items-center gap-1.5">
                  <Building2 className="h-4 w-4 text-gray-600" />
                  ชื่อลูกค้า
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="เช่น บริษัท เอบีซี จำกัด"
                  className="border-gray-300 focus:border-[#7BC9A6] focus:ring-[#7BC9A6]"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-900 mb-2 block flex items-center gap-1.5">
                  <Hash className="h-4 w-4 text-gray-600" />
                  รหัสดีล (ถ้ามี)
                </Label>
                <Input
                  value={dealId}
                  onChange={(e) => setDealId(e.target.value)}
                  placeholder="เช่น DL-2024-001"
                  className="border-gray-300 focus:border-[#7BC9A6] focus:ring-[#7BC9A6]"
                />
              </div>
            </div>

            {/* Form Fields - Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-900 mb-2 block flex items-center gap-1.5">
                  <DollarSign className="h-4 w-4 text-gray-600" />
                  มูลค่า (บาท)
                  <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">฿</span>
                  <Input
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="0"
                    className="pl-8 border-gray-300 focus:border-[#7BC9A6] focus:ring-[#7BC9A6]"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-900 mb-2 block flex items-center gap-1.5">
                  <CalendarIcon className="h-4 w-4 text-gray-600" />
                  วันที่หมดอายุ
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left border-gray-300 hover:border-[#7BC9A6]"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-gray-600" />
                      {validUntilDate ? (
                        format(validUntilDate, "dd MMMM yyyy", { locale: th })
                      ) : (
                        <span className="text-gray-500">เลือกวันที่</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={validUntilDate}
                      onSelect={setValidUntilDate}
                      locale={th}
                      disabled={(date) => createdDate ? date < createdDate : false}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Form Fields - Row 5 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-900 mb-2 block">
                  ประเภทบริการ
                  <span className="text-red-500 ml-1">*</span>
                </Label>
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
                  value={serviceType}
                  onValueChange={setServiceType}
                  placeholder="เลือกบริการ"
                  searchPlaceholder="ค้นหา..."
                  className="border-gray-300"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-900 mb-2 block">
                  Business Unit
                </Label>
                <Combobox
                  options={[
                    { value: "HCP", label: "HCP" },
                    { value: "F&B", label: "F&B" },
                    { value: "Retail", label: "Retail" },
                    { value: "Manufacturing", label: "Manufacturing" },
                    { value: "Energy", label: "Energy" },
                    { value: "Tech", label: "Tech" },
                    { value: "Other", label: "Other" },
                  ]}
                  value={bu}
                  onValueChange={setBU}
                  placeholder="เลือก BU"
                  searchPlaceholder="ค้นหา..."
                  className="border-gray-300"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-900 mb-2 block">
                  สถานะ
                </Label>
                <Combobox
                  options={[
                    { value: "Draft", label: "Draft" },
                    { value: "Pending Approval", label: "Pending Approval" },
                    { value: "Approved", label: "Approved" },
                    { value: "Sent to Customer", label: "Sent to Customer" },
                    { value: "Rejected", label: "Rejected" },
                  ]}
                  value={status}
                  onValueChange={setStatus}
                  placeholder="เลือกสถานะ..."
                  searchPlaceholder="ค้นหา..."
                  className="border-gray-300"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <Label className="text-sm font-medium text-gray-900 mb-2 block">
                หมายเหตุ
              </Label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="ข้อมูลเพิ่มเติมเกี่ยวกับใบเสนอราคานี้..."
                rows={3}
                className="border-gray-300 focus:border-[#7BC9A6] focus:ring-[#7BC9A6] resize-none"
              />
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <Button
            variant="outline"
            onClick={handleClose}
            className="px-6"
          >
            ยกเลิก
          </Button>
          <Button
            onClick={handleSubmit}
            className="px-6 bg-[#7BC9A6] hover:bg-[#6ab395] text-white"
          >
            <Upload className="h-4 w-4 mr-2" />
            อัปโหลดและบันทึก
          </Button>
        </div>
      </div>
    </div>
  );
}