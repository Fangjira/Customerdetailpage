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
  DollarSign,
  Package,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Share2,
  Edit,
  Trash2,
  Eye,
  FileCheck,
  Mail,
  Pen,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Printer,
  History
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
  fileUrl?: string;
}

interface QuotationUploadedDetailProps {
  quotationId: string;
  onBack: () => void;
  onEdit?: () => void;
}

export function QuotationUploadedDetailScreen({ 
  quotationId, 
  onBack,
  onEdit 
}: QuotationUploadedDetailProps) {
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadNotes, setUploadNotes] = useState("");
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [pdfZoom, setPdfZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // Mock total pages

  // Mock data - ใบเสนอราคาแบบอัปโหลด
  const quotation = {
    id: "QT-2024-008",
    type: "uploaded" as const,
    customer: "บริษัท ไทยคอนซูเมอร์ โปรดักส์ จำกัด",
    subject: "ใบเสนอราคาบริการขนส่งสินค้าอุปโภคบริโภค",
    amount: 5200000,
    businessUnit: "Distribution",
    status: "approved" as const,
    createdDate: "2024-03-03",
    validUntil: "2024-04-15",
    uploadedBy: "สมชาย ใจดี (Sales Rep)",
    contactPerson: "คุณสมศักดิ์ วงศ์ใหญ่",
    contactEmail: "somsakdi@thaiconsumer.co.th",
    contactPhone: "02-234-5678",
    dealId: "DL-2024-152",
  };

  // Mock data - ประวัติการอัปโหลดไฟล์
  const [fileHistory, setFileHistory] = useState<QuotationFile[]>([
    {
      id: "f1",
      version: 1,
      fileName: "Quotation_ThaiConsumer_Draft_v1.pdf",
      fileSize: "1.8 MB",
      fileType: "application/pdf",
      uploadedBy: "สมชาย ใจดี",
      uploadedAt: "2024-03-03T09:30:00",
      notes: "เวอร์ชันแรก - ใบเสนอราคาเบื้องต้น",
      status: "archived",
    },
    {
      id: "f2",
      version: 2,
      fileName: "Quotation_ThaiConsumer_Revised_v2.pdf",
      fileSize: "2.1 MB",
      fileType: "application/pdf",
      uploadedBy: "สมชาย ใจดี",
      uploadedAt: "2024-03-05T14:15:00",
      notes: "ปรับราคาตามข้อเสนอของลูกค้า ลด 3%",
      status: "archived",
    },
    {
      id: "f3",
      version: 3,
      fileName: "Quotation_ThaiConsumer_Final_v3.pdf",
      fileSize: "2.3 MB",
      fileType: "application/pdf",
      uploadedBy: "วิชัย ผู้จัดการ",
      uploadedAt: "2024-03-08T10:45:00",
      notes: "เวอร์ชันสุดท้าย - ได้รับการอนุมัติจาก Manager แล้ว",
      status: "active",
      fileUrl: "/mock-quotation.pdf", // Mock URL
    },
  ]);

  const activeFile = fileHistory.find(f => f.status === "active") || fileHistory[fileHistory.length - 1];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    const newVersion = Math.max(...fileHistory.map(f => f.version)) + 1;
    const newFile: QuotationFile = {
      id: `f${fileHistory.length + 1}`,
      version: newVersion,
      fileName: selectedFile.name,
      fileSize: `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`,
      fileType: selectedFile.type,
      uploadedBy: "สมชาย ใจดี",
      uploadedAt: new Date().toISOString(),
      notes: uploadNotes,
      status: "active",
    };

    // Mark all other files as archived
    const updatedHistory = fileHistory.map(f => ({ ...f, status: "archived" as const }));
    setFileHistory([...updatedHistory, newFile]);
    setSelectedFile(null);
    setUploadNotes("");
    setShowUploadDialog(false);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending":
        return { label: "รอการอนุมัติ", color: "bg-yellow-100 text-yellow-700 border-yellow-300", icon: Clock };
      case "approved":
        return { label: "อนุมัติแล้ว", color: "bg-green-100 text-green-700 border-green-300", icon: CheckCircle2 };
      case "rejected":
        return { label: "ไม่อนุมัติ", color: "bg-red-100 text-red-700 border-red-300", icon: XCircle };
      case "sent":
        return { label: "ส่งให้ลูกค้าแล้ว", color: "bg-blue-100 text-blue-700 border-blue-300", icon: Mail };
      default:
        return { label: "รอการอนุมัติ", color: "bg-gray-100 text-gray-700 border-gray-300", icon: AlertCircle };
    }
  };

  const statusConfig = getStatusConfig(quotation.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <div className="bg-white border-b-2 border-gray-200 shadow-sm sticky top-0 z-20">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div>
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                  <h1 className="text-xl font-bold text-gray-900">
                    รายละเอียดใบเสนอราคา (อัปโหลด)
                  </h1>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {quotation.id} • {quotation.customer}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowVersionHistory(!showVersionHistory)}
                className={`flex items-center gap-2 px-4 py-2.5 border-2 rounded-lg transition-all ${
                  showVersionHistory
                    ? "bg-purple-50 border-purple-300 text-purple-700"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <History className="h-4 w-4" />
                <span className="font-medium hidden sm:inline">ประวัติเวอร์ชัน</span>
              </button>
              <button
                onClick={() => setShowUploadDialog(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                <Upload className="h-4 w-4" />
                <span className="font-medium hidden sm:inline">อัปโหลดเวอร์ชันใหม่</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md">
                <Download className="h-4 w-4" />
                <span className="font-medium hidden sm:inline">ดาวน์โหลด</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-md">
                <Share2 className="h-4 w-4" />
                <span className="font-medium hidden sm:inline">แชร์</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Quotation Info */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 p-6 sticky top-24 space-y-6">
              {/* Header */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileCheck className="h-5 w-5 text-blue-600" />
                  ข้อมูลใบเสนอราคา
                </h2>
              </div>

              {/* Status */}
              <div>
                <label className="text-xs text-gray-500 font-medium block mb-2">
                  สถานะ
                </label>
                <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border-2 ${statusConfig.color}`}>
                  <StatusIcon className="h-4 w-4" />
                  <span className="text-sm font-semibold">{statusConfig.label}</span>
                </div>
              </div>

              {/* Customer */}
              <div>
                <label className="text-xs text-gray-500 font-medium block mb-2">
                  ลูกค้า
                </label>
                <div className="flex items-start gap-2 text-sm">
                  <Building2 className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">{quotation.customer}</p>
                    <p className="text-xs text-gray-600 mt-1">{quotation.contactPerson}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{quotation.contactEmail}</p>
                    <p className="text-xs text-gray-500">{quotation.contactPhone}</p>
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="text-xs text-gray-500 font-medium block mb-2">
                  หัวข้อ
                </label>
                <p className="text-sm text-gray-900">{quotation.subject}</p>
              </div>

              {/* Amount */}
              <div>
                <label className="text-xs text-gray-500 font-medium block mb-2">
                  มูลค่า
                </label>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="text-2xl font-bold text-green-600">
                    ฿{quotation.amount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Business Unit */}
              <div>
                <label className="text-xs text-gray-500 font-medium block mb-2">
                  Business Unit
                </label>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg">
                    {quotation.businessUnit}
                  </span>
                </div>
              </div>

              {/* Deal Reference */}
              <div>
                <label className="text-xs text-gray-500 font-medium block mb-2">
                  ดีลที่เกี่ยวข้อง
                </label>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline">
                  {quotation.dealId}
                </button>
              </div>

              {/* Dates */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <div>
                    <p className="text-gray-500">สร้างเมื่อ</p>
                    <p className="font-medium text-gray-900">{new Date(quotation.createdDate).toLocaleDateString("th-TH")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Clock className="h-4 w-4" />
                  <div>
                    <p className="text-gray-500">ใช้ได้ถึง</p>
                    <p className="font-medium text-gray-900">{new Date(quotation.validUntil).toLocaleDateString("th-TH")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <User className="h-4 w-4" />
                  <div>
                    <p className="text-gray-500">อัปโหลดโดย</p>
                    <p className="font-medium text-gray-900">{quotation.uploadedBy}</p>
                  </div>
                </div>
              </div>

              {/* Current File Info */}
              <div className="pt-4 border-t border-gray-200">
                <label className="text-xs text-gray-500 font-medium block mb-2">
                  ไฟล์ปัจจุบัน
                </label>
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-blue-900 truncate">
                        {activeFile.fileName}
                      </p>
                      <p className="text-xs text-blue-700 mt-1">
                        เวอร์ชัน {activeFile.version} • {activeFile.fileSize}
                      </p>
                      <p className="text-xs text-blue-600 mt-1">
                        {formatDate(activeFile.uploadedAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className={`${showVersionHistory ? "lg:col-span-6" : "lg:col-span-9"}`}>
            <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden">
              {/* PDF Viewer Controls */}
              <div className="bg-gray-100 border-b-2 border-gray-200 px-4 py-3">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="p-2 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4 text-gray-700" />
                    </button>
                    <span className="text-sm font-medium text-gray-700 px-2">
                      หน้า {currentPage} / {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight className="h-4 w-4 text-gray-700" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPdfZoom(Math.max(50, pdfZoom - 10))}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      title="ซูมออก"
                    >
                      <ZoomOut className="h-4 w-4 text-gray-700" />
                    </button>
                    <span className="text-sm font-medium text-gray-700 px-2 min-w-[60px] text-center">
                      {pdfZoom}%
                    </span>
                    <button
                      onClick={() => setPdfZoom(Math.min(200, pdfZoom + 10))}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      title="ซูมเข้า"
                    >
                      <ZoomIn className="h-4 w-4 text-gray-700" />
                    </button>
                    <div className="w-px h-6 bg-gray-300 mx-2" />
                    <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors" title="พิมพ์">
                      <Printer className="h-4 w-4 text-gray-700" />
                    </button>
                    <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors" title="ดาวน์โหลด">
                      <Download className="h-4 w-4 text-gray-700" />
                    </button>
                  </div>
                </div>
              </div>

              {/* PDF Viewer */}
              <div className="bg-gray-200 p-6 min-h-[800px] flex items-center justify-center">
                <div 
                  className="bg-white shadow-2xl"
                  style={{ 
                    width: `${pdfZoom}%`,
                    maxWidth: "100%",
                    aspectRatio: "210/297" // A4 ratio
                  }}
                >
                  {/* Mock PDF Preview */}
                  <div className="w-full h-full flex items-center justify-center border-2 border-gray-300">
                    <div className="text-center p-12">
                      <FileText className="h-24 w-24 text-gray-300 mx-auto mb-4" />
                      <p className="text-lg font-semibold text-gray-600 mb-2">
                        PDF Viewer
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        {activeFile.fileName}
                      </p>
                      <p className="text-xs text-gray-400">
                        หน้า {currentPage} / {totalPages}
                      </p>
                      <div className="mt-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200 max-w-md mx-auto">
                        <p className="text-xs text-blue-700 italic">
                          💡 ในระบบจริง จะแสดง PDF Viewer แบบเต็มรูปแบบที่สามารถเลื่อนดูเอกสารได้
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Version History */}
          {showVersionHistory && (
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-md border-2 border-purple-200 p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <History className="h-5 w-5 text-purple-600" />
                    ประวัติเวอร์ชัน
                  </h2>
                  <span className="text-sm text-gray-500">
                    {fileHistory.length} เวอร์ชัน
                  </span>
                </div>

                {/* Version Timeline */}
                <div className="space-y-4 max-h-[700px] overflow-y-auto">
                  {fileHistory.slice().reverse().map((file, index) => {
                    const isActive = file.status === "active";
                    return (
                      <div key={file.id} className="relative">
                        {/* Timeline connector */}
                        {index < fileHistory.length - 1 && (
                          <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-purple-200" />
                        )}

                        <div className={`relative p-4 rounded-lg border-2 transition-all ${
                          isActive
                            ? "bg-purple-50 border-purple-300 shadow-md"
                            : "bg-white border-gray-200"
                        }`}>
                          {/* Version Badge */}
                          <div className={`absolute -left-2 -top-2 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border-2 ${
                            isActive
                              ? "bg-purple-600 text-white border-purple-700"
                              : "bg-gray-200 text-gray-600 border-gray-300"
                          }`}>
                            v{file.version}
                          </div>

                          <div className="ml-6">
                            <div className="flex items-start gap-2 mb-2">
                              <FileText className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                                isActive ? "text-purple-600" : "text-gray-500"
                              }`} />
                              <div className="flex-1 min-w-0">
                                <p className={`text-xs font-semibold truncate ${
                                  isActive ? "text-purple-900" : "text-gray-900"
                                }`}>
                                  {file.fileName}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {file.fileSize}
                                </p>
                              </div>
                              {isActive && (
                                <span className="px-2 py-0.5 bg-green-600 text-white text-xs font-bold rounded-full flex-shrink-0">
                                  ใช้งาน
                                </span>
                              )}
                            </div>

                            <div className="text-xs text-gray-600 space-y-1 mb-3">
                              <div className="flex items-center gap-1.5">
                                <User className="h-3 w-3" />
                                <span>{file.uploadedBy}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Calendar className="h-3 w-3" />
                                <span>{formatDate(file.uploadedAt)}</span>
                              </div>
                            </div>

                            {file.notes && (
                              <div className="bg-white border border-gray-200 rounded p-2 mb-3">
                                <p className="text-xs text-gray-700">{file.notes}</p>
                              </div>
                            )}

                            <div className="flex items-center gap-2">
                              <button className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors">
                                <Eye className="h-3 w-3" />
                                ดู
                              </button>
                              <button className="flex items-center justify-center gap-1 px-2 py-1.5 bg-white border border-gray-300 text-gray-700 text-xs font-medium rounded hover:bg-gray-50 transition-colors">
                                <Download className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upload Dialog */}
      {showUploadDialog && (
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Upload className="h-5 w-5 text-blue-600" />
                อัปโหลดเวอร์ชันใหม่
              </h3>
              <button
                onClick={() => {
                  setShowUploadDialog(false);
                  setSelectedFile(null);
                  setUploadNotes("");
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircle className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              {/* File Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  เลือกไฟล์
                </label>
                <input
                  type="file"
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx"
                  className="block w-full text-sm text-gray-900 border-2 border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50 focus:outline-none focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {selectedFile && (
                  <p className="mt-2 text-xs text-gray-600">
                    ไฟล์: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  หมายเหตุการเปลี่ยนแปลง
                </label>
                <textarea
                  value={uploadNotes}
                  onChange={(e) => setUploadNotes(e.target.value)}
                  placeholder="บันทึกรายละเอียดการแก้ไข เช่น 'แก้ไขราคา', 'เพิ่ม Terms & Conditions' เป็นต้น..."
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowUploadDialog(false);
                    setSelectedFile(null);
                    setUploadNotes("");
                  }}
                  className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={handleUpload}
                  disabled={!selectedFile}
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
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
