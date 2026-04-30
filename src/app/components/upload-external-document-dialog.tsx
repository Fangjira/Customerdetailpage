import { useState, useRef } from "react";
import { X, Upload, FileText, AlertCircle, Calendar as CalendarIcon, Building2, DollarSign, Hash, File } from "lucide-react";
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

type DocumentType = "proposal" | "contract" | "nda";

interface UploadExternalDocumentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
  documentType?: DocumentType;
}

export function UploadExternalDocumentDialog({
  isOpen,
  onClose,
  onSave,
  documentType = "proposal",
}: UploadExternalDocumentDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<DocumentType>(documentType);
  
  // Form data
  const [documentNumber, setDocumentNumber] = useState("");
  const [documentTitle, setDocumentTitle] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [dealId, setDealId] = useState("");
  const [totalValue, setTotalValue] = useState("");
  const [status, setStatus] = useState("draft");
  const [businessUnit, setBU] = useState("");
  const [createdDate, setCreatedDate] = useState<Date | undefined>(new Date());
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [expiryDate, setExpiryDate] = useState<Date | undefined>(undefined);
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const getDocumentTypeLabel = (type: DocumentType) => {
    switch (type) {
      case "proposal":
        return "ข้อเสนอ";
      case "contract":
        return "สัญญา";
      case "nda":
        return "เอกสาร NDA";
    }
  };

  const getDocumentTypeColor = (type: DocumentType) => {
    switch (type) {
      case "proposal":
        return "#7BC9A6"; // เขียวพาสเทล
      case "contract":
        return "#6366f1"; // น้ำเงิน
      case "nda":
        return "#f97316"; // ส้ม
    }
  };

  const handleFileSelect = (file: File) => {
    // Validate file type
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("กรุณาอัปโหลดไฟล์ PDF, Word หรือรูปภาพเท่านั้น");
      return;
    }

    // Validate file size (max 15MB)
    if (file.size > 15 * 1024 * 1024) {
      toast.error("ขนาดไฟล์ต้องไม่เกิน 15MB");
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
      toast.error("กรุณาอัปโหลดไฟล์เอกสาร");
      return;
    }
    if (!documentNumber.trim()) {
      toast.error("กรุณากรอกเลขที่เอกสาร");
      return;
    }
    if (!documentTitle.trim()) {
      toast.error("กรุณากรอกชื่อเอกสาร");
      return;
    }
    if (!customerName.trim()) {
      toast.error("กรุณากรอกชื่อลูกค้า");
      return;
    }

    // Contract specific validation
    if (selectedDocType === "contract") {
      if (!startDate) {
        toast.error("กรุณาเลือกวันที่เริ่มสัญญา");
        return;
      }
      if (!endDate) {
        toast.error("กรุณาเลือกวันที่สิ้นสุดสัญญา");
        return;
      }
    }

    // Proposal specific validation
    if (selectedDocType === "proposal" && !expiryDate) {
      toast.error("กรุณาเลือกวันที่หมดอายุข้อเสนอ");
      return;
    }

    const data = {
      file: selectedFile,
      documentType: selectedDocType,
      documentNumber,
      documentTitle,
      customerName,
      dealId,
      totalValue: totalValue ? parseFloat(totalValue.replace(/,/g, "")) : undefined,
      status,
      businessUnit: businessUnit,
      createdDate,
      startDate,
      endDate,
      expiryDate,
      notes,
      isExternal: true,
    };

    onSave?.(data);
    toast.success(`อัปโหลด${getDocumentTypeLabel(selectedDocType)}สำเร็จ`);
    handleClose();
  };

  const handleClose = () => {
    // Reset form
    setSelectedFile(null);
    setSelectedDocType(documentType);
    setDocumentNumber("");
    setDocumentTitle("");
    setCustomerName("");
    setDealId("");
    setTotalValue("");
    setStatus("draft");
    setBU("");
    setCreatedDate(new Date());
    setStartDate(undefined);
    setEndDate(undefined);
    setExpiryDate(undefined);
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
    setTotalValue(formatted);
  };

  const documentColor = getDocumentTypeColor(selectedDocType);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div 
          className="flex items-center justify-between p-6 border-b border-gray-200"
          style={{
            background: `linear-gradient(to right, ${documentColor}15, ${documentColor}05)`
          }}
        >
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Upload className="h-6 w-6" style={{ color: documentColor }} />
              อัปโหลดเอกสารจากภายนอก
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              นำเข้าเอกสารที่สร้างนอกระบบเข้าสู่ ONELINK CRM
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
            
            {/* Document Type Selection */}
            <div>
              <Label className="text-sm font-semibold text-gray-900 mb-3 block flex items-center gap-2">
                <File className="h-4 w-4" style={{ color: documentColor }} />
                ประเภทเอกสาร
                <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setSelectedDocType("proposal")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedDocType === "proposal"
                      ? "border-[#7BC9A6] bg-[#7BC9A6]/10"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <FileText className={`h-6 w-6 mx-auto mb-2 ${selectedDocType === "proposal" ? "text-[#7BC9A6]" : "text-gray-400"}`} />
                  <p className={`text-sm font-medium ${selectedDocType === "proposal" ? "text-[#7BC9A6]" : "text-gray-600"}`}>
                    ข้อเสนอ
                  </p>
                </button>
                <button
                  onClick={() => setSelectedDocType("contract")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedDocType === "contract"
                      ? "border-indigo-500 bg-indigo-500/10"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <FileText className={`h-6 w-6 mx-auto mb-2 ${selectedDocType === "contract" ? "text-indigo-500" : "text-gray-400"}`} />
                  <p className={`text-sm font-medium ${selectedDocType === "contract" ? "text-indigo-500" : "text-gray-600"}`}>
                    สัญญา
                  </p>
                </button>
                <button
                  onClick={() => setSelectedDocType("nda")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedDocType === "nda"
                      ? "border-orange-500 bg-orange-500/10"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <FileText className={`h-6 w-6 mx-auto mb-2 ${selectedDocType === "nda" ? "text-orange-500" : "text-gray-400"}`} />
                  <p className={`text-sm font-medium ${selectedDocType === "nda" ? "text-orange-500" : "text-gray-600"}`}>
                    NDA
                  </p>
                </button>
              </div>
            </div>

            {/* File Upload Section */}
            <div>
              <Label className="text-sm font-semibold text-gray-900 mb-3 block flex items-center gap-2">
                <FileText className="h-4 w-4" style={{ color: documentColor }} />
                ไฟล์เอกสาร
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
                      ? `bg-opacity-10`
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                  style={{
                    borderColor: isDragging ? documentColor : undefined,
                    backgroundColor: isDragging ? `${documentColor}15` : undefined,
                  }}
                >
                  <Upload 
                    className="h-12 w-12 mx-auto mb-4" 
                    style={{ color: isDragging ? documentColor : "#9ca3af" }}
                  />
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    คลิกเพื่ออัปโหลด หรือลากไฟล์มาวางที่นี่
                  </p>
                  <p className="text-xs text-gray-500">
                    รองรับไฟล์ PDF, Word, JPG, PNG (ขนาดไม่เกิน 15MB)
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                </div>
              ) : (
                <div 
                  className="border-2 rounded-xl p-4"
                  style={{
                    borderColor: documentColor,
                    backgroundColor: `${documentColor}08`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="h-12 w-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${documentColor}30` }}
                      >
                        <FileText className="h-6 w-6" style={{ color: documentColor }} />
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
                  ข้อมูลที่กรอกจะช่วยให้สามารถค้นหาและติดตามเอกสารได้ง่ายขึ้น
                </p>
              </div>
            </div>

            {/* Form Fields - Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-900 mb-2 block flex items-center gap-1.5">
                  <Hash className="h-4 w-4 text-gray-600" />
                  เลขที่เอกสาร
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={documentNumber}
                  onChange={(e) => setDocumentNumber(e.target.value)}
                  placeholder={
                    selectedDocType === "proposal" ? "เช่น PR-2024-001" :
                    selectedDocType === "contract" ? "เช่น CT-2024-001" :
                    "เช่น NDA-2024-001"
                  }
                  className="border-gray-300"
                  style={{
                    focusBorderColor: documentColor,
                  }}
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
                      className="w-full justify-start text-left border-gray-300"
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
                ชื่อเอกสาร
                <span className="text-red-500">*</span>
              </Label>
              <Input
                value={documentTitle}
                onChange={(e) => setDocumentTitle(e.target.value)}
                placeholder={
                  selectedDocType === "proposal" ? "เช่น ข้อเสนอบริการโลจิสติกส์ครบวงจร" :
                  selectedDocType === "contract" ? "เช่น สัญญาให้บริการคลังสินค้า" :
                  "เช่น บันทึกข้อตกลงความลับ"
                }
                className="border-gray-300"
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
                  className="border-gray-300"
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
                  className="border-gray-300"
                />
              </div>
            </div>

            {/* Form Fields - Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-900 mb-2 block flex items-center gap-1.5">
                  <DollarSign className="h-4 w-4 text-gray-600" />
                  มูลค่า (บาท)
                  {selectedDocType === "contract" && <span className="text-red-500">*</span>}
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">฿</span>
                  <Input
                    value={totalValue}
                    onChange={handleAmountChange}
                    placeholder="0"
                    className="pl-8 border-gray-300"
                  />
                </div>
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
                  value={businessUnit}
                  onValueChange={setBU}
                  placeholder="เลือก BU"
                  searchPlaceholder="ค้นหา..."
                  className="border-gray-300"
                />
              </div>
            </div>

            {/* Date Fields - Different for each type */}
            {selectedDocType === "contract" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-900 mb-2 block flex items-center gap-1.5">
                    <CalendarIcon className="h-4 w-4 text-gray-600" />
                    วันที่เริ่มสัญญา
                    <span className="text-red-500">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left border-gray-300"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-gray-600" />
                        {startDate ? (
                          format(startDate, "dd MMMM yyyy", { locale: th })
                        ) : (
                          <span className="text-gray-500">เลือกวันที่</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        locale={th}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-900 mb-2 block flex items-center gap-1.5">
                    <CalendarIcon className="h-4 w-4 text-gray-600" />
                    วันที่สิ้นสุดสัญญา
                    <span className="text-red-500">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left border-gray-300"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-gray-600" />
                        {endDate ? (
                          format(endDate, "dd MMMM yyyy", { locale: th })
                        ) : (
                          <span className="text-gray-500">เลือกวันที่</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        locale={th}
                        disabled={(date) => startDate ? date < startDate : false}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            ) : selectedDocType === "proposal" ? (
              <div>
                <Label className="text-sm font-medium text-gray-900 mb-2 block flex items-center gap-1.5">
                  <CalendarIcon className="h-4 w-4 text-gray-600" />
                  วันที่หมดอายุข้อเสนอ
                  <span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left border-gray-300"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-gray-600" />
                      {expiryDate ? (
                        format(expiryDate, "dd MMMM yyyy", { locale: th })
                      ) : (
                        <span className="text-gray-500">เลือกวันที่</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={expiryDate}
                      onSelect={setExpiryDate}
                      locale={th}
                      disabled={(date) => createdDate ? date < createdDate : false}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            ) : null}

            {/* Status Field */}
            <div>
              <Label className="text-sm font-medium text-gray-900 mb-2 block">
                สถานะ
              </Label>
              <Combobox
                options={
                  selectedDocType === "contract"
                    ? [
                        { value: "draft", label: "Draft" },
                        { value: "pending", label: "Pending Approval" },
                        { value: "active", label: "Active" },
                        { value: "signed", label: "Signed" },
                        { value: "expired", label: "Expired" },
                      ]
                    : [
                        { value: "draft", label: "Draft" },
                        { value: "sent", label: "Sent to Customer" },
                        { value: "approved", label: "Approved" },
                        { value: "rejected", label: "Rejected" },
                      ]
                }
                value={status}
                onValueChange={setStatus}
                placeholder="เลือกสถานะ..."
                searchPlaceholder="ค้นหา..."
                className="border-gray-300"
              />
            </div>

            {/* Notes */}
            <div>
              <Label className="text-sm font-medium text-gray-900 mb-2 block">
                หมายเหตุ
              </Label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="ข้อมูลเพิ่มเติมเกี่ยวกับเอกสารนี้..."
                rows={3}
                className="border-gray-300 resize-none"
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
            className="px-6 text-white"
            style={{ backgroundColor: documentColor }}
          >
            <Upload className="h-4 w-4 mr-2" />
            อัปโหลดและบันทึก
          </Button>
        </div>
      </div>
    </div>
  );
}
