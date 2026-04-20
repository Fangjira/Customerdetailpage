import { useState } from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  ArrowRightLeft,
  Search,
  Download,
  Plus,
  Check,
  X,
  Clock,
  ArrowRight,
  Building2,
  User,
  Calendar,
  MessageSquare,
  FileText,
  Briefcase,
  DollarSign,
  Users,
  Package,
  ExternalLink,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";

interface TransferRequest {
  id: string;
  type: "customer" | "lead";
  customerName: string;
  customerNameEn: string;
  fromBU: string;
  toBU: string;
  fromOwner: string;
  fromOwnerEmail: string;
  fromOwnerInitials: string;
  toOwner?: string;
  toOwnerEmail?: string;
  toOwnerInitials?: string;
  interestedServices: string[];
  dealCode?: string;
  dealValue?: number;
  quotationCode?: string;
  quotationValue?: number;
  reason: string;
  status: "pending" | "approved" | "rejected";
  requestedBy: string;
  requestedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  notes?: string;
}

interface AdminTransferCenterProps {
  onCustomerClick?: (customerId: string) => void;
  onDealClick?: (dealId: string) => void;
  onQuotationClick?: (quotationId: string) => void;
}

export function AdminTransferCenter({
  onCustomerClick,
  onDealClick,
  onQuotationClick,
}: AdminTransferCenterProps = {}) {
  const [activeTab, setActiveTab] = useState<"incoming" | "outgoing">("incoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedOwners, setSelectedOwners] = useState<{ [key: string]: string }>({});
  const [approvingRequests, setApprovingRequests] = useState<Set<string>>(new Set());
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  // Available team members for assignment
  const availableOwners = [
    { name: "สมชาย วงศ์สกุล", email: "somchai.wong@onelink.co.th", initials: "สว", bu: "Healthcare & Pharmaceutical" },
    { name: "อนุชา ศรีสวัสดิ์", email: "anucha.sriswat@onelink.co.th", initials: "อศ", bu: "Healthcare & Pharmaceutical" },
    { name: "วิภาวี จันทร์เจริญ", email: "wipa.sriswat@onelink.co.th", initials: "วศ", bu: "Healthcare & Pharmaceutical" },
    { name: "ธนพล รัตนพงษ์", email: "thanakrit.wong@onelink.co.th", initials: "ธว", bu: "Healthcare & Pharmaceutical" },
    { name: "สมบัติ จินดาพล", email: "sombat.jindapol@onelink.co.th", initials: "สจ", bu: "Cold Chain" },
    { name: "วีระศักดิ์ โชติ", email: "weerasak.chot@onelink.co.th", initials: "วช", bu: "Commercial" },
    { name: "ปิยนุช สุวรรณ", email: "piyanuch.suwan@onelink.co.th", initials: "ปส", bu: "Commercial" },
    { name: "อภิญญา วงศ์", email: "apinya.wong@onelink.co.th", initials: "อว", bu: "B2B2C" },
  ];

  // Mock transfer requests data
  const transferRequests: TransferRequest[] = [
    // Incoming requests
    {
      id: "TRF-001",
      type: "customer",
      customerName: "องค์การเภสัชกรรม",
      customerNameEn: "Government Pharmaceutical Organization",
      fromBU: "B2B2C",
      toBU: "Healthcare & Pharmaceutical",
      fromOwner: "วิภาวี จันทร์เจริญ",
      fromOwnerEmail: "wipa.sriswat@onelink.co.th",
      fromOwnerInitials: "วศ",
      interestedServices: ["Freight Forwarding", "Customs Brokerage", "Warehousing"],
      dealCode: "DEAL-2024-0156",
      dealValue: 2500000,
      quotationCode: "QUO-2024-0234",
      quotationValue: 2500000,
      reason: "ลูกค้าต้องการบริการ Freight Forwarding สำหรับยาและเวชภัณฑ์ ซึ่งทีม Healthcare มีความเชี่ยวชาญในการจัดการสินค้าควบคุมอุณหภูมิและใบอนุญาตนำเข้า-ส่งออกยา",
      status: "pending",
      requestedBy: "วิภาวี จันทร์เจริญ",
      requestedDate: "2024-03-24T09:30:00",
    },
    {
      id: "TRF-002",
      type: "lead",
      customerName: "บริษัท ไบโอเทค ฟาร์มา จำกัด",
      customerNameEn: "BioTech Pharma Co., Ltd.",
      fromBU: "Freight",
      toBU: "Healthcare & Pharmaceutical",
      fromOwner: "สมบัติ จินดาพล",
      fromOwnerEmail: "sombat.jindapol@onelink.co.th",
      fromOwnerInitials: "สจ",
      interestedServices: ["Cold Chain Storage", "Temperature Controlled Transportation"],
      dealCode: "DEAL-2024-0189",
      dealValue: 3800000,
      reason: "ลีดใหม่ในอุตสาหกรรมยาชีววัตถุ (Biologics) ต้องการโซลูชั่น Cold Chain ที่มีมาตรฐาน GDP และควบคุมอุณหภูมิ 2-8°C ตลอดกระบวนการ",
      status: "pending",
      requestedBy: "สมบัติ จินดาพล",
      requestedDate: "2024-03-24T10:15:00",
    },
    {
      id: "TRF-003",
      type: "customer",
      customerName: "บริษัท เนสท์เล่ (ไทย) จำกัด",
      customerNameEn: "Nestle (Thai) Ltd.",
      fromBU: "Commercial",
      toBU: "Healthcare & Pharmaceutical",
      fromOwner: "ปิยนุช สุวรรณ",
      fromOwnerEmail: "piyanuch.suwan@onelink.co.th",
      fromOwnerInitials: "ปส",
      toOwner: "สมชาย วงศ์สกุล",
      toOwnerEmail: "somchai.wong@onelink.co.th",
      toOwnerInitials: "สว",
      interestedServices: ["Warehousing", "Distribution"],
      dealCode: "DEAL-2024-0092",
      dealValue: 1200000,
      quotationCode: "QUO-2024-0145",
      quotationValue: 1200000,
      reason: "ลูกค้าขยายธุรกิจสู่ Healthcare Products (Infant Formula Medical Grade) ต้องการผู้ดูแลที่มีประสบการณ์ในอุตสาหกรรมนี้และเข้าใจข้อกำหนดด้าน GMP",
      status: "approved",
      requestedBy: "ปิยนุช สุวรรณ",
      requestedDate: "2024-03-20T14:20:00",
      approvedBy: "Admin",
      approvedDate: "2024-03-21T09:00:00",
    },
    {
      id: "TRF-004",
      type: "lead",
      customerName: "โรงพยาบาลรามาธิบดี",
      customerNameEn: "Ramathibodi Hospital",
      fromBU: "Commercial",
      toBU: "Healthcare & Pharmaceutical",
      fromOwner: "วีระศักดิ์ โชติ",
      fromOwnerEmail: "weerasak.chot@onelink.co.th",
      fromOwnerInitials: "วช",
      interestedServices: ["Medical Equipment Logistics", "Just-in-Time Delivery"],
      quotationCode: "QUO-2024-0298",
      quotationValue: 950000,
      reason: "โรงพยาบาลต้องการบริการขนส่งอุปกรณ์การแพทย์และเวชภัณฑ์ที่ต้องการความเชี่ยวชาญพิเศษในการจัดการสินค้าควบคุม",
      status: "pending",
      requestedBy: "วีระศักดิ์ โชติ",
      requestedDate: "2024-03-23T16:00:00",
    },

    // Outgoing requests
    {
      id: "TRF-005",
      type: "customer",
      customerName: "สถาบันวิจัยจุฬาภรณ์",
      customerNameEn: "Chulabhorn Research Institute",
      fromBU: "Healthcare & Pharmaceutical",
      toBU: "B2B2C",
      fromOwner: "สมศักดิ์ เจริญ",
      fromOwnerEmail: "somsak.charoen@onelink.co.th",
      fromOwnerInitials: "สจ",
      toOwner: "อภิญญา วงศ์",
      toOwnerEmail: "apinya.wong@onelink.co.th",
      toOwnerInitials: "อว",
      interestedServices: ["E-commerce Fulfillment", "Last Mile Delivery"],
      dealCode: "DEAL-2024-0211",
      dealValue: 680000,
      reason: "ลูกค้าเปิดช่องทางขายออนไลน์สำหรับผลิตภัณฑ์เสริมอาหาร ต้องการบริการ E-commerce Fulfillment ซึ่งเป็นความเชี่ยวชาญของทีม B2B2C",
      status: "pending",
      requestedBy: "สมศักดิ์ เจริญ",
      requestedDate: "2024-03-23T11:00:00",
    },
    {
      id: "TRF-006",
      type: "lead",
      customerName: "สภากาชาดไทย",
      customerNameEn: "Thai Red Cross Society",
      fromBU: "Healthcare & Pharmaceutical",
      toBU: "Commercial",
      fromOwner: "สุรศักดิ์ วงศ์ชัย",
      fromOwnerEmail: "surasak.wong@onelink.co.th",
      fromOwnerInitials: "สว",
      interestedServices: ["General Warehousing", "Distribution"],
      quotationCode: "QUO-2024-0187",
      quotationValue: 450000,
      reason: "โครงการใหม่ที่ไม่เกี่ยวข้องกับเวชภัณฑ์ เป็นการจัดเก็บและจัดส่งสินค้าทั่วไป เหมาะกับทีม Commercial",
      status: "rejected",
      requestedBy: "สุรศักดิ์ วงศ์ชัย",
      requestedDate: "2024-03-18T16:45:00",
      approvedBy: "Admin",
      approvedDate: "2024-03-19T10:30:00",
      notes: "ลูกค้ายังต้องการผู้ดูแลที่มีความเชี่ยวชาญด้าน Healthcare อยู่ เนื่องจากอาจมีโครงการอื่นที่เกี่ยวข้องกับเวชภัณฑ์ในอนาคต",
    },
  ];

  const incomingRequests = transferRequests.filter(r => r.toBU === "Healthcare & Pharmaceutical");
  const outgoingRequests = transferRequests.filter(r => r.fromBU === "Healthcare & Pharmaceutical");

  const currentRequests = activeTab === "incoming" ? incomingRequests : outgoingRequests;

  const filteredRequests = currentRequests.filter(request => {
    const matchesSearch =
      searchTerm === "" ||
      request.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.customerNameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (request.dealCode && request.dealCode.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (request.quotationCode && request.quotationCode.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus =
      filterStatus === "all" || request.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (id: string) => {
    // เพิ่มคำขอนี้เข้าไปในรายการที่กำลังอนุมัติ
    setApprovingRequests(new Set(approvingRequests).add(id));
    toast.success("กรุณาเลือกผู้ดูแลใหม่เพื่อดำเนินการต่อ");
  };

  const handleConfirmAssignment = (id: string) => {
    const selectedOwner = selectedOwners[id];
    if (!selectedOwner) {
      toast.error("กรุณาเลือกผู้ดูแลใหม่");
      return;
    }
    const ownerInfo = availableOwners.find(o => o.email === selectedOwner);
    toast.success(`อนุมัติการโอนลูกค้าสำเร็จ → มอบหมายให้ ${ownerInfo?.name}`);
    // Reset state
    setApprovingRequests(new Set([...approvingRequests].filter(r => r !== id)));
    setSelectedOwners({...selectedOwners, [id]: ""});
  };

  const handleCancelApproval = (id: string) => {
    setApprovingRequests(new Set([...approvingRequests].filter(r => r !== id)));
    setSelectedOwners({...selectedOwners, [id]: ""});
  };

  const handleReject = (id: string) => {
    toast.error("ปฏิเสธการโอนลูกค้า");
  };

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('th-TH', { month: 'short' });
    const year = date.getFullYear() + 543;
    const time = date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
    return `${day} ${month} ${year} ${time}`;
  };

  const formatCurrency = (amount: number) => {
    return `฿${amount.toLocaleString()}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            รออนุมัติ
          </span>
        );
      case "approved":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Check className="h-3 w-3 mr-1" />
            อนุมัติแล้ว
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <X className="h-3 w-3 mr-1" />
            ปฏิเสธ
          </span>
        );
      default:
        return null;
    }
  };

  const getTypeBadge = (type: string) => {
    return type === "customer" ? (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">
        <Building2 className="h-3 w-3 mr-1" />
        ลูกค้า
      </span>
    ) : (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-700">
        <Users className="h-3 w-3 mr-1" />
        ลีด
      </span>
    );
  };

  const pendingCount = currentRequests.filter(r => r.status === "pending").length;
  const approvedCount = currentRequests.filter(r => r.status === "approved").length;
  const rejectedCount = currentRequests.filter(r => r.status === "rejected").length;

  return (
    <div className="p-6 bg-gray-50">
      <div className="max-w-[1400px] mx-auto space-y-6 pb-12">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              ศูนย์โอนลูกค้า
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              จัดการคำขอโอนลูกค้าและลีดระหว่าง Business Unit และทีมงาน
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-10 px-4 border-gray-300 hover:bg-gray-50"
            >
              <Download className="h-4 w-4 mr-2" />
              ส่งออก
            </Button>
            <Button
              size="sm"
              className="h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              สร้างคำขอโอน
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border border-gray-200 rounded-xl p-1 inline-flex gap-1">
          <button
            onClick={() => setActiveTab("incoming")}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === "incoming"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-2">
              <ArrowRightLeft className="h-4 w-4 rotate-90" />
              <span>งานรับเข้า</span>
              {incomingRequests.filter(r => r.status === "pending").length > 0 && (
                <span className="ml-1 px-2 py-0.5 rounded-full bg-red-500 text-white text-xs font-semibold">
                  {incomingRequests.filter(r => r.status === "pending").length}
                </span>
              )}
            </div>
          </button>
          <button
            onClick={() => setActiveTab("outgoing")}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === "outgoing"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-2">
              <ArrowRightLeft className="h-4 w-4 -rotate-90" />
              <span>งานส่งออก</span>
              {outgoingRequests.filter(r => r.status === "pending").length > 0 && (
                <span className="ml-1 px-2 py-0.5 rounded-full bg-orange-500 text-white text-xs font-semibold">
                  {outgoingRequests.filter(r => r.status === "pending").length}
                </span>
              )}
            </div>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">รออนุมัติ</p>
                <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">ดำเนินการแล้ว</p>
                <p className="text-3xl font-bold text-green-600">{approvedCount}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Check className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">ปฏิเสธ</p>
                <p className="text-3xl font-bold text-red-600">{rejectedCount}</p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-xl flex items-center justify-center">
                <X className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="ค้นหาชื่อลูกค้า, รหัสดีล, รหัสใบเสนอราคา..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
            />
          </div>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-64 h-12 rounded-xl bg-white border-gray-300">
              <SelectValue placeholder="สถานะทั้งหมด" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">สถานะทั้งหมด</SelectItem>
              <SelectItem value="pending">รออนุมัติ</SelectItem>
              <SelectItem value="approved">ดำเนินการแล้ว</SelectItem>
              <SelectItem value="rejected">ปฏิเสธ</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Transfer Requests List */}
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <div 
              key={request.id} 
              className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start gap-6">
                  
                  {/* Left Side - Main Content */}
                  <div className="flex-1 space-y-4">
                    
                    {/* Header with Type Badge and Customer Name */}
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleExpand(request.id)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
                      >
                        {expandedRows.has(request.id) ? (
                          <ChevronDown className="h-5 w-5 text-gray-600" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-600" />
                        )}
                      </button>
                      {getTypeBadge(request.type)}
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-gray-900 flex items-center gap-1.5">
                          {request.customerName}
                        </h3>
                        <p className="text-sm text-gray-500 mt-0.5">
                          {request.customerNameEn}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onCustomerClick && onCustomerClick(request.customerName)}
                          className="h-8 px-3 text-xs border-gray-300 hover:bg-gray-50"
                        >
                          <ExternalLink className="h-3 w-3 mr-1.5" />
                          รายละเอียด
                        </Button>
                        {getStatusBadge(request.status)}
                      </div>
                    </div>

                    {/* Summary Info (Always Visible) */}
                    <div className="space-y-3">
                      {/* Services */}
                      <div>
                        <p className="text-xs text-gray-500 mb-2">บริการที่สนใจ</p>
                        <div className="flex flex-wrap gap-2">
                          {request.interestedServices.map((service, idx) => (
                            <span key={idx} className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                              <Package className="h-3 w-3 mr-1.5" />
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Reason */}
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <div className="flex gap-2">
                          <MessageSquare className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-xs font-medium text-amber-800 mb-1">เหตุผล:</p>
                            <p className="text-sm text-amber-900 leading-relaxed">{request.reason}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Collapsible Content */}
                    <div className={`${expandedRows.has(request.id) ? 'block' : 'hidden'} space-y-4`}>
                      {/* Transfer Flow */}
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-gray-500">การโอนจากและข้อมูล</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
                          <span className="text-xs text-gray-500">จาก BU</span>
                          <span className="text-sm font-medium text-gray-900">{request.fromBU}</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-200">
                          <span className="text-xs text-blue-600">ไป BU</span>
                          <span className="text-sm font-medium text-blue-900">{request.toBU}</span>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-gray-400 text-white text-xs">
                              {request.fromOwnerInitials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-xs text-gray-500">ผู้ดูแลเดิม</p>
                            <p className="text-sm font-medium text-gray-900">{request.fromOwner}</p>
                          </div>
                        </div>
                      </div>

                      {/* Deal & Quotation */}
                      <div className="grid grid-cols-2 gap-3">
                        {request.dealCode && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3 relative">
                            <div className="flex items-start gap-2">
                              <Briefcase className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-green-700">รหัสดีล</p>
                                <p className="text-sm font-semibold text-green-900">
                                  {request.dealCode}
                                </p>
                                {request.dealValue && (
                                  <p className="text-xs text-green-700 mt-1">฿ {request.dealValue.toLocaleString()}</p>
                                )}
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => onDealClick && onDealClick(request.dealCode)}
                                className="h-7 px-2 text-xs text-green-700 hover:bg-green-100 absolute top-2 right-2"
                              >
                                <ExternalLink className="h-3 w-3 mr-1" />
                                รายละเอียด
                              </Button>
                            </div>
                          </div>
                        )}

                        {request.quotationCode && (
                          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 relative">
                            <div className="flex items-start gap-2">
                              <FileText className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-orange-700">รหัสใบเสนอราคา</p>
                                <p className="text-sm font-semibold text-orange-900">
                                  {request.quotationCode}
                                </p>
                                {request.quotationValue && (
                                  <p className="text-xs text-orange-700 mt-1">฿ {request.quotationValue.toLocaleString()}</p>
                                )}
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => onQuotationClick && onQuotationClick(request.quotationCode)}
                                className="h-7 px-2 text-xs text-orange-700 hover:bg-orange-100 absolute top-2 right-2"
                              >
                                <ExternalLink className="h-3 w-3 mr-1" />
                                รายละเอียด
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Footer - Requested By */}
                      <div className="flex items-center gap-2 text-xs text-gray-500 pt-2 border-t border-gray-100">
                        <User className="h-3 w-3" />
                        <span>ขอโอนโดย: <span className="font-medium text-gray-700">{request.requestedBy}</span></span>
                        <span className="mx-1">•</span>
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(request.requestedDate)}</span>
                      </div>

                      {/* Rejection Note */}
                      {request.status === "rejected" && request.notes && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                          <div className="flex gap-2">
                            <X className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-xs font-medium text-red-800 mb-1">หมายเหตุการปฏิเสธ:</p>
                              <p className="text-sm text-red-900">{request.notes}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Side - Actions */}
                  {request.status === "pending" && activeTab === "incoming" && (
                    <div className="w-80 flex flex-col gap-3">
                      {approvingRequests.has(request.id) ? (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleConfirmAssignment(request.id)}
                            className="h-11 bg-green-600 hover:bg-green-700 text-white justify-center rounded-lg font-medium"
                            disabled={!selectedOwners[request.id]}
                          >
                            <Check className="h-4 w-4 mr-2" />
                            ยืนยันมอบหมาย
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleCancelApproval(request.id)}
                            variant="outline"
                            className="h-11 border-gray-300 text-gray-600 hover:bg-gray-50 justify-center rounded-lg font-medium"
                          >
                            <X className="h-4 w-4 mr-2" />
                            ยกเลิก
                          </Button>
                          <div className="pt-2">
                            <p className="text-xs font-medium text-green-600 mb-2">เลือกผู้ดูแลใหม่</p>
                            <Select 
                              value={selectedOwners[request.id] || ""} 
                              onValueChange={(value) => setSelectedOwners({...selectedOwners, [request.id]: value})}
                            >
                              <SelectTrigger className="w-full h-11 bg-white border-green-300 rounded-lg">
                                <SelectValue placeholder="เลือกผู้ดูแลใหม่..." />
                              </SelectTrigger>
                              <SelectContent>
                                {availableOwners
                                  .filter(o => o.bu === request.toBU)
                                  .map((owner) => (
                                    <SelectItem key={owner.email} value={owner.email}>
                                      <div className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6">
                                          <AvatarFallback className="bg-green-600 text-white text-xs">
                                            {owner.initials}
                                          </AvatarFallback>
                                        </Avatar>
                                        <span>{owner.name}</span>
                                      </div>
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleApprove(request.id)}
                            className="h-11 bg-blue-600 hover:bg-blue-700 text-white justify-center rounded-lg font-medium"
                          >
                            <Check className="h-4 w-4 mr-2" />
                            อนุมัติ
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleReject(request.id)}
                            variant="outline"
                            className="h-11 border-red-300 text-red-600 hover:bg-red-50 justify-center rounded-lg font-medium"
                          >
                            <X className="h-4 w-4 mr-2" />
                            ปฏิเสธ
                          </Button>
                          <div className="pt-2">
                            <p className="text-xs font-medium text-gray-400 mb-2">เลือกผู้ดูแลใหม่ (กดอนุมัติก่อน)</p>
                            <Select disabled>
                              <SelectTrigger className="w-full h-11 bg-gray-100 border-gray-300 rounded-lg cursor-not-allowed">
                                <SelectValue placeholder="เลือกผู้ดูแลใหม่..." />
                              </SelectTrigger>
                            </Select>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Approved/Rejected State */}
                  {request.status !== "pending" && request.toOwner && (
                    <div className="w-80">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-xs font-medium text-green-700 mb-3">มอบหมายให้</p>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-green-600 text-white">
                              {request.toOwnerInitials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{request.toOwner}</p>
                            <p className="text-xs text-gray-500">{request.toOwnerEmail}</p>
                          </div>
                        </div>
                        {request.approvedBy && (
                          <div className="mt-3 pt-3 border-t border-green-200">
                            <p className="text-xs text-green-700">
                              {request.status === "approved" ? "อนุมัติโดย" : "ปฏิเสธโดย"}: <span className="font-medium">{request.approvedBy}</span>
                            </p>
                            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(request.approvedDate!)}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredRequests.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <ArrowRightLeft className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-sm text-gray-500">
              {activeTab === "incoming" ? "ไม่มีคำขอโอนลูกค้าเข้า" : "ไม่มีคำขอโอนลูกค้าออก"}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}