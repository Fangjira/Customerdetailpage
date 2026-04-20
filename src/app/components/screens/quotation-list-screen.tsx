import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  FileText,
  Calendar,
  CheckCircle2,
  Clock,
  Send,
  ChevronRight,
  Tag,
  Building2,
  DollarSign,
  Upload,
  Pen,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CreateQuotationFormModal, QuotationFormData } from "../modals/create-quotation-form-modal";
import { QuotationTemplateType, QuotationData } from "../quotation/quotation-types";
import { QuotationBuilderMain } from "../quotation/quotation-builder-main";
import { UploadExternalQuotationModal } from "../modals/upload-external-quotation-modal";
import { QuotationSignatureDialog } from "../modals/quotation-signature-dialog";
import { toast } from "sonner";

interface Quotation {
  id: string;
  name: string;
  customer: string;
  dealId: string;
  amount: string;
  status: string;
  validUntil: string;
  createdDate: string;
  createdBy: {
    name: string;
    initials: string;
    userId: string;
  };
  bu: string;
  serviceType: string;
  type?: "template" | "uploaded"; // เพิ่ม field type
}

interface QuotationListScreenProps {
  onQuotationClick: (quotationId: string) => void;
  currentPath?: string;
  shouldOpenAddDialog?: boolean;
  setShouldOpenAddDialog?: (open: boolean) => void;
  onNavigate?: (path: string) => void;
  onViewUploadDetail?: (quotationId: string) => void;
}

export function QuotationListScreen({
  onQuotationClick,
  currentPath,
  shouldOpenAddDialog,
  setShouldOpenAddDialog,
  onNavigate,
  onViewUploadDetail,
}: QuotationListScreenProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterServiceType, setFilterServiceType] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("all");

  const quotations: Quotation[] = [
    {
      id: "QT-2024-001",
      name: "ใบเสนอราคาขนส่งทางอากาศระหว่างประเทศ",
      customer: "บริษัท แอคมี คอร์ปอเรชั่น จำกัด",
      dealId: "DL-2024-145",
      amount: "฿8,575,000",
      status: "Approved",
      validUntil: "31 ธ.ค. 2567",
      createdDate: "1 ธ.ค. 2567",
      createdBy: { name: "Sarah Chen", initials: "SC", userId: "user1" },
      bu: "ขนส่งทางอากาศ",
      serviceType: "Freight Forwarding",
    },
    {
      id: "QT-2024-002",
      name: "แพ็คเกจบริการคลังสินค้า",
      customer: "บริษัท โกลบอล เทค อินดัสทรีส์ จำกัด",
      dealId: "DL-2024-146",
      amount: "฿6,300,000",
      status: "Pending Approval",
      validUntil: "25 ธ.ค. 2567",
      createdDate: "5 ธ.ค. 2567",
      createdBy: { name: "Michael Park", initials: "MP", userId: "user2" },
      bu: "คลังสินค้า",
      serviceType: "Warehousing",
    },
    {
      id: "QT-2024-003",
      name: "บริการพิธีการศุลกากร",
      customer: "บริษัท แปซิฟิค อิมพอร์ต จำกัด",
      dealId: "DL-2024-147",
      amount: "฿3,325,000",
      status: "Sent to Customer",
      validUntil: "20 ธ.ค. 2567",
      createdDate: "28 พ.ย. 2567",
      createdBy: { name: "Emily Rodriguez", initials: "ER", userId: "user3" },
      bu: "ศุลกากร",
      serviceType: "Customs Clearance",
    },
    {
      id: "QT-2024-004",
      name: "เครือข่ายกระจายสินค้าขั้นสุดท้าย",
      customer: "บริษัท เมโทร รีเทล กรุ๊ป จำกัด",
      dealId: "DL-2024-148",
      amount: "฿11,200,000",
      status: "Draft",
      validUntil: "28 ธ.ค. 2567",
      createdDate: "10 ธ.ค. 2567",
      createdBy: { name: "David Kim", initials: "DK", userId: "user4" },
      bu: "กระจายสินค้า",
      serviceType: "Distribution",
    },
    {
      id: "QT-2024-005",
      name: "โซลูชั่นโลจิสติกส์ห้องเย็น",
      customer: "บริษัท เฟรชฟาร์ม ฟู้ดส์ จำกัด",
      dealId: "DL-2024-149",
      amount: "฿15,750,000",
      status: "Rejected",
      validUntil: "15 ธ.ค. 2567",
      createdDate: "15 พ.ย. 2567",
      createdBy: { name: "Lisa Anderson", initials: "LA", userId: "user5" },
      bu: "สินค้าพิเศษ",
      serviceType: "Cold Chain",
    },
    {
      id: "QT-2024-006",
      name: "ขนส่งทางเรือตู้เต็มลำ",
      customer: "บริษัท แอคมี คอร์ปอเรชั่น จำกัด",
      dealId: "DL-2024-150",
      amount: "฿4,375,000",
      status: "Approved",
      validUntil: "10 ม.ค. 2568",
      createdDate: "12 ธ.ค. 2567",
      createdBy: { name: "Sarah Chen", initials: "SC", userId: "user1" },
      bu: "ขนส่งทางเรือ",
      serviceType: "Sea Freight",
    },
    {
      id: "QT-2024-007",
      name: "บริการส่งด่วนพิเศษ",
      customer: "บริษัท ควิกชิป โลจิสติกส์ จำกัด",
      dealId: "DL-2024-151",
      amount: "฿2,625,000",
      status: "Sent to Customer",
      validUntil: "22 ธ.ค. 2567",
      createdDate: "8 ธ.ค. 2567",
      createdBy: { name: "Michael Park", initials: "MP", userId: "user2" },
      bu: "กระจายสินค้า",
      serviceType: "Express Delivery",
    },
    {
      id: "QT-2024-008",
      name: "บริการขนส่งสินค้าอุปโภคบริโภค (อัปโหลด)",
      customer: "บริษัท ไทยคอนซูเมอร์ โปรดักส์ จำกัด",
      dealId: "DL-2024-152",
      amount: "฿5,200,000",
      status: "Approved",
      validUntil: "15 ม.ค. 2568",
      createdDate: "3 ก.พ. 2568",
      createdBy: { name: "Sarah Chen", initials: "SC", userId: "user1" },
      bu: "กระจายสินค้า",
      serviceType: "Transport",
      type: "uploaded" as const, // ใบเสนอราคาแบบอัปโหลด
    },
    {
      id: "QT-2024-009",
      name: "แพ็คเกจคลังสินค้าอัจฉริยะ",
      customer: "บริษัท อีคอมเมิร์ซ โซลูชั่นส์ จำกัด",
      dealId: "DL-2024-153",
      amount: "฿8,900,000",
      status: "Pending Approval",
      validUntil: "20 ม.ค. 2568",
      createdDate: "3 ก.พ. 2568",
      createdBy: { name: "Sarah Chen", initials: "SC", userId: "user1" },
      bu: "คลังสินค้า",
      serviceType: "Warehousing",
    },
    {
      id: "QT-2024-010",
      name: "บริการนำเข้าสินค้าจากจีน",
      customer: "บริษัท เทรดดิ้ง พลัส จำกัด",
      dealId: "DL-2024-154",
      amount: "฿4,750,000",
      status: "Sent to Customer",
      validUntil: "18 ม.ค. 2568",
      createdDate: "3 ก.พ. 2568",
      createdBy: { name: "Sarah Chen", initials: "SC", userId: "user1" },
      bu: "ศุลกากร",
      serviceType: "Customs Clearance",
    },
    {
      id: "QT-2024-011",
      name: "โซลูชั่นขนส่งข้ามพรมแดน",
      customer: "บริษัท เซาท์อีสต์ โลจิสติกส์ จำกัด",
      dealId: "DL-2024-155",
      amount: "฿12,300,000",
      status: "Approved",
      validUntil: "25 ม.ค. 2568",
      createdDate: "3 ก.พ. 2568",
      createdBy: { name: "Sarah Chen", initials: "SC", userId: "user1" },
      bu: "ข้ามพรมแดน",
      serviceType: "Cross Border",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700 border-green-200";
      case "Pending Approval":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Sent to Customer":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Draft":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "Rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle2 className="h-3 w-3" />;
      case "Pending Approval":
        return <Clock className="h-3 w-3" />;
      case "Sent to Customer":
        return <Send className="h-3 w-3" />;
      default:
        return <FileText className="h-3 w-3" />;
    }
  };

  // Filter quotations
  const filteredQuotations = quotations.filter((q) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      searchTerm === "" ||
      q.name.toLowerCase().includes(searchLower) ||
      q.id.toLowerCase().includes(searchLower) ||
      q.customer.toLowerCase().includes(searchLower) ||
      q.dealId.toLowerCase().includes(searchLower) ||
      q.serviceType.toLowerCase().includes(searchLower);

    const matchesTab = activeTab === "all" || q.status === activeTab;
    const matchesServiceType =
      filterServiceType === "all" || q.serviceType === filterServiceType;

    return matchesSearch && matchesTab && matchesServiceType;
  });

  // Calculate total amount
  const totalAmount = filteredQuotations.reduce((sum, q) => {
    const amount = parseFloat(q.amount.replace(/[฿,]/g, ""));
    return sum + amount;
  }, 0);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showBuilderModal, setShowBuilderModal] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<QuotationTemplateType | null>(null);
  const [formData, setFormData] = useState<QuotationFormData | null>(null);
  const [showSignatureDialog, setShowSignatureDialog] = useState(false);
  const [quotationToSign, setQuotationToSign] = useState<Quotation | null>(null);

  useEffect(() => {
    if (shouldOpenAddDialog) {
      setShowAddModal(true);
      setShouldOpenAddDialog?.(false);
    }
  }, [shouldOpenAddDialog, setShouldOpenAddDialog]);

  const handleCreateQuotation = () => {
    setShowAddModal(true);
  };

  const handleFormSubmit = (data: QuotationFormData) => {
    // Save form data and set template, then open builder modal
    setFormData(data);
    setSelectedTemplate(data.templateType);
    setShowAddModal(false);
    setShowBuilderModal(true);
  };

  const handleSaveQuotation = (data: QuotationData) => {
    console.log("Saving quotation:", data);
    console.log("With form data:", formData);
    // TODO: Save to backend with both formData and quotation data
    // Optionally refresh quotations list
    setShowBuilderModal(false);
    setSelectedTemplate(null);
    setFormData(null);
  };

  const handleCloseBuilder = () => {
    setShowBuilderModal(false);
    setSelectedTemplate(null);
    setFormData(null);
  };

  // Convert formData to CustomerInfo format
  const getInitialCustomerData = () => {
    if (!formData) return undefined;
    
    return {
      company: formData.companyNameTh || "",
      contactName: formData.contactName || "",
      email: formData.email || "",
      position: formData.position || "",
      phone: formData.phone || "",
      address: formData.address,
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-3 sm:px-4 py-4 sm:py-6">

        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">ใบเสนอราคาทั้งหมด</h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">จัดการใบเสนอราคาและข้อเสนอทางธุรกิจ</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 sm:flex-none border-gray-300 text-xs sm:text-sm h-9 sm:h-10"
                onClick={() => setShowUploadDialog(true)}
              >
                <Upload className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                อัปโหลด
              </Button>
              <Button
                size="sm"
                className="flex-1 sm:flex-none bg-[#7BC9A6] hover:bg-[#5BA88A] text-white text-xs sm:text-sm h-9 sm:h-10"
                onClick={handleCreateQuotation}
              >
                <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                สร้างใบเสนอราคา
              </Button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            <div className="bg-white rounded-lg sm:rounded-xl p-2.5 sm:p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-medium">ทั้งหมด</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-0.5 sm:mt-1">{quotations.length}</p>
                </div>
                <div className="h-9 w-9 sm:h-12 sm:w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-4 w-4 sm:h-6 sm:w-6 text-gray-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl p-2.5 sm:p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-medium">อนุมัติแล้ว</p>
                  <p className="text-xl sm:text-2xl font-bold text-green-600 mt-0.5 sm:mt-1">
                    {quotations.filter(q => q.status === "Approved").length}
                  </p>
                </div>
                <div className="h-9 w-9 sm:h-12 sm:w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl p-2.5 sm:p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-medium">รออนุมัติ</p>
                  <p className="text-xl sm:text-2xl font-bold text-yellow-600 mt-0.5 sm:mt-1">
                    {quotations.filter(q => q.status === "Pending Approval").length}
                  </p>
                </div>
                <div className="h-9 w-9 sm:h-12 sm:w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl p-2.5 sm:p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-medium">มูลค่ารวม</p>
                  <p className="text-xl sm:text-2xl font-bold text-purple-600 mt-0.5 sm:mt-1">
                    ฿{(totalAmount / 1000000).toFixed(1)}M
                  </p>
                </div>
                <div className="h-9 w-9 sm:h-12 sm:w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-4 w-4 sm:h-6 sm:w-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="ค้นหาใบเสนอราคา, ลูกค้า, เลขที่..."
              className="pl-10 h-10 bg-white text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={activeTab} onValueChange={setActiveTab}>
            <SelectTrigger className="w-full sm:w-[200px] h-10 bg-white">
              <SelectValue placeholder="การฟิลเตอร์ สถานะ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทั้งหมด ({quotations.length})</SelectItem>
              <SelectItem value="Draft">Draft ({quotations.filter(q => q.status === "Draft").length})</SelectItem>
              <SelectItem value="Pending Approval">รออนุมัติ ({quotations.filter(q => q.status === "Pending Approval").length})</SelectItem>
              <SelectItem value="Approved">อนุมัติแล้ว ({quotations.filter(q => q.status === "Approved").length})</SelectItem>
              <SelectItem value="Sent to Customer">ส่งแล้ว ({quotations.filter(q => q.status === "Sent to Customer").length})</SelectItem>
              <SelectItem value="Rejected">ปฏิเสธ ({quotations.filter(q => q.status === "Rejected").length})</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table View */}
        {filteredQuotations.length > 0 ? (
          <>
            {/* Desktop Table View */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hidden lg:block">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">เลขที่</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ชื่อใบเสนอราคา</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ประเภทบริการ</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">มูลค่า</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">สถานะ</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ผู้สร้าง</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">การดำเนินการ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredQuotations.map((quotation) => (
                      <tr
                        key={quotation.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-900">{quotation.id}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-sm font-medium text-gray-900 line-clamp-2">{quotation.name}</p>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <Badge variant="outline" className="text-xs">
                            {quotation.serviceType}
                          </Badge>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <p className="text-sm font-bold text-gray-600">
                            {quotation.amount}
                          </p>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <Badge className={`${getStatusColor(quotation.status)} text-xs font-medium border`}>
                            {quotation.status === "Approved" && "อนุมัติ"}
                            {quotation.status === "Pending Approval" && "รออนุมัติ"}
                            {quotation.status === "Sent to Customer" && "ส่งแล้ว"}
                            {quotation.status === "Draft" && "Draft"}
                            {quotation.status === "Rejected" && "ปฏิเสธ"}
                          </Badge>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">{quotation.createdBy.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-3 text-xs text-[#7BC9A6] hover:text-[#5BA88A] hover:bg-[#7BC9A6]/10"
                              onClick={(e) => {
                                e.stopPropagation();
                                onQuotationClick(quotation.id);
                              }}
                            >
                              ดูรายละเอียด
                              <ChevronRight className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-2">
              {filteredQuotations.map((quotation) => (
                <div
                  key={quotation.id}
                  className="bg-white rounded-lg border border-gray-200 p-2.5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => onQuotationClick(quotation.id)}
                >
                  {/* Header: Customer & ID */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Building2 className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                        <h3 className="text-xs font-semibold text-gray-900 truncate">{quotation.customer}</h3>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="h-5 w-5 rounded bg-gradient-to-br from-[#7BC9A6] to-[#5BA88A] flex items-center justify-center flex-shrink-0">
                          <FileText className="h-3 w-3 text-white" />
                        </div>
                        <p className="text-[10px] text-gray-500">{quotation.id}</p>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(quotation.status)} text-[10px] font-medium border ml-2 flex-shrink-0`}>
                      {quotation.status === "Approved" && "อนุมัติ"}
                      {quotation.status === "Pending Approval" && "รออนุมัติ"}
                      {quotation.status === "Sent to Customer" && "ส่งแล้ว"}
                      {quotation.status === "Draft" && "Draft"}
                      {quotation.status === "Rejected" && "ปฏิเสธ"}
                    </Badge>
                  </div>

                  {/* Quotation Name */}
                  <p className="text-xs font-medium text-gray-900 mb-2 line-clamp-2">
                    {quotation.name}
                  </p>

                  {/* Service Type & Amount */}
                  <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-gray-100">
                    <div className="flex items-center gap-1">
                      <Tag className="h-3 w-3 text-gray-400" />
                      <Badge variant="outline" className="text-[10px]">
                        {quotation.serviceType}
                      </Badge>
                    </div>
                    <p className="text-sm font-bold text-gray-600">
                      {quotation.amount}
                    </p>
                  </div>

                  {/* Dates & Creator */}
                  <div className="flex items-center justify-between text-[10px] text-gray-500">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span>สร้าง: {quotation.createdDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span>หมดอายุ: {quotation.validUntil}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-[8px] font-bold">
                        {quotation.createdBy.initials}
                      </div>
                      <span className="text-[10px] text-gray-600">{quotation.createdBy.name}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-[#7BC9A6] hover:text-[#5BA88A] hover:bg-[#7BC9A6]/10 h-7 text-[10px] font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuotationClick(quotation.id);
                      }}
                    >
                      ดูรายละเอียด
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 font-medium mb-2">ไม่พบใบเสนอราคา</p>
            <p className="text-sm text-gray-500 mb-4">ลองปรับเปลี่ยนคำค้นหาหรือตัวกรอง</p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setActiveTab("all");
                setFilterServiceType("all");
              }}
            >
              ล้างตัวกรอง
            </Button>
          </div>
        )}
      </div>

      {/* Create Quotation Modal */}
      <CreateQuotationFormModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleFormSubmit}
      />

      {/* Quotation Builder Modal */}
      <QuotationBuilderMain
        open={showBuilderModal}
        onOpenChange={(open) => !open && handleCloseBuilder()}
        initialTemplate={selectedTemplate}
        initialCustomerData={getInitialCustomerData()}
        onSave={handleSaveQuotation}
      />

      {/* Upload External Quotation Dialog */}
      <UploadExternalQuotationModal
        isOpen={showUploadDialog}
        onClose={() => setShowUploadDialog(false)}
        onSave={(data) => {
          console.log("Uploaded external quotation:", data);
          // TODO: Save external quotation to backend
        }}
      />

      {/* Quotation Signature Dialog */}
      <QuotationSignatureDialog
        open={showSignatureDialog}
        onClose={() => {
          setShowSignatureDialog(false);
          setQuotationToSign(null);
        }}
        quotation={quotationToSign}
        onSign={(signatureData) => {
          console.log("Signature data:", signatureData);
          toast.success("ลงนามเอกสารสำเร็จ");
          // TODO: Save signature to backend
          setShowSignatureDialog(false);
          setQuotationToSign(null);
        }}
      />
    </div>
  );
}