import {
  ChevronLeft,
  Edit,
  MoreVertical,
  FileText,
  Calendar,
  MapPin,
  User,
  Phone,
  Mail,
  DollarSign,
  Target,
  TrendingUp,
  Package,
  Truck,
  Clock,
  CheckCircle2,
  MessageSquare,
  Download,
  Building2,
  Percent,
  Activity,
  Info,
  History,
  Plus,
  Eye,
  Send,
  ArrowLeft,
  Save,
  X,
  Upload,
  Trash2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { CreateQuotationFormModal, QuotationFormData } from "../modals/create-quotation-form-modal";
import { UploadExternalQuotationModal } from "../modals/upload-external-quotation-modal";
import { MultiQuotationCreationDialog } from "../multi-quotation-creation-dialog";
import { HistoryDialog } from "../history-dialog";
import { GenerateProposalDialog } from "../generate-proposal-dialog";
import { ScheduleMeetingDialog } from "../schedule-meeting-dialog";
import { QuickStatusUpdateDialog } from "../quick-status-update-dialog";
import { toast } from "sonner";
import { COMMODITY_TYPES } from "../../../config/masterData";

const SERVICE_TYPE_LABELS: Record<string, string> = {
  Freight: "ขนส่งสินค้า",
  Customs: "พิธีการศุลกากร",
  Warehouse: "คลังสินค้า",
  Transport: "ขนส่งทางบก",
  Crossborder: "ข้ามพรมแดน",
  Trading: "การค้า",
  Service: "บริการทั่วไป",
  Other: "อื่นๆ",
  Unknown: "ไม่ระบุ",
};

const TEMPLATE_NAMES: Record<string, string> = {
  "international-freight": "ขนส่งระหว่างประเทศ (อากาศ/ทะเล)",
  "customs-license": "พิธีการศุลกากร + ใบอนุญาต",
  "warehouse-transport": "คลังสินค้า + ขนส่ง",
  "cross-border": "ขนส่งข้ามพรมแดน (CLMV)",
};

import { HistoryEntry } from "@/types/crm";

export function DealDetailScreen({ 
  dealId, 
  onBack,
  onQuotationClick,
  onNavigate
}: { 
  dealId: string; 
  onBack: () => void;
  onQuotationClick?: (quotationId: string) => void;
  onNavigate?: (path: string) => void;
}) {
  const { t, i18n } = useTranslation();
  const [isCreateQuotationDialogOpen, setIsCreateQuotationDialogOpen] = useState(false);
  const [isMultiQuotationDialogOpen, setIsMultiQuotationDialogOpen] = useState(false);
  const [selectedQuotationGroup, setSelectedQuotationGroup] = useState<any>(null);
  const [pendingQuotationGroups, setPendingQuotationGroups] = useState<any[]>([]);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [isUploadQuotationDialogOpen, setIsUploadQuotationDialogOpen] = useState(false);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [isGenerateProposalDialogOpen, setIsGenerateProposalDialogOpen] = useState(false);
  const [isScheduleMeetingDialogOpen, setIsScheduleMeetingDialogOpen] = useState(false);
  const [isQuickStatusUpdateDialogOpen, setIsQuickStatusUpdateDialogOpen] = useState(false);
  const [projectStatus, setProjectStatus] = useState("Negotiating Process");
  const [progress, setProgress] = useState(70);

  // Inline editing states
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<any>({});

  // Deal data states (can be edited)
  const [dealInfo, setDealInfo] = useState({
    contactPerson: "John Davidson",
    contactPosition: "Operations Director",
    customerEmail: "john.d@globalfreight.com",
    customerPhone: "+1 (555) 123-4567",
    billingAddress: "123 Commerce Street, New York, NY 10001, USA",
    industry: "Electronics",
    commodityTypes: ["Consumer Electronics", "Industrial Equipment"],
    projectType: "Solution Design",
    totalValue: "$254,000",
    expectedCloseDate: "2025-04-15",
    owner: "Sarah Chen",
    probability: "75",
  });

  // Services state (can be edited)
  const [services, setServices] = useState([
    {
      id: 1,
      serviceType: "Freight",
      service: "Sea Freight FCL 40'HC",
      description: "Shanghai to Bangkok, Door to Door Service",
      quantity: "50",
      unit: "Container",
      unitPrice: "75000",
      discount: "5",
      total: "3562500",
    },
    {
      id: 2,
      serviceType: "Customs",
      service: "Customs Clearance - Import",
      description: "Include duty payment and BOI documentation",
      quantity: "50",
      unit: "Shipment",
      unitPrice: "5000",
      discount: "0",
      total: "250000",
    },
    {
      id: 3,
      serviceType: "Warehouse",
      service: "Temperature Controlled Storage",
      description: "Climate-controlled warehouse 2-8°C",
      quantity: "3",
      unit: "Month",
      unitPrice: "120000",
      discount: "10",
      total: "324000",
    },
    {
      id: 4,
      serviceType: "Transport",
      service: "Local Delivery - Bangkok Metro",
      description: "10-wheeler truck with tail lift",
      quantity: "50",
      unit: "Trip",
      unitPrice: "8500",
      discount: "5",
      total: "403750",
    },
  ]);

  // Mock quotations data
  const [quotations, setQuotations] = useState([
    {
      id: "Q-2025-0123",
      version: "v1.0",
      title: "International Freight Contract - Initial Quote",
      amount: "$254,000",
      status: "sent",
      createdDate: "2025-01-10",
      validUntil: "2025-04-20T23:59:59Z",
      createdBy: "Sarah Chen",
    },
    {
      id: "Q-2025-0145",
      version: "v1.1",
      title: "International Freight Contract - Revised Quote",
      amount: "$248,500",
      status: "draft",
      createdDate: "2025-01-15",
      validUntil: "2025-04-25T23:59:59Z",
      createdBy: "Sarah Chen",
    },
  ]);

  // Activity History
  const activityHistory: HistoryEntry[] = [
    {
      id: "1",
      action: "created",
      entity: "Deal",
      user: "Sarah Chen",
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      details: "Created International Freight Contract deal",
    },
    {
      id: "2",
      action: "updated",
      entity: "Deal Status",
      user: "Sarah Chen",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      details: "Changed status from Approach to Quotation",
    },
    {
      id: "3",
      action: "created",
      entity: "Quotation",
      user: "Sarah Chen",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      details: "Generated quotation Q-2024-0123",
    },
    {
      id: "4",
      action: "updated",
      entity: "Deal Status",
      user: "Sarah Chen",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      details: "Changed status to Negotiating Process",
    },
  ];

  useEffect(() => {
    const statusProgressMap: { [key: string]: number } = {
      "Prospect": 0,
      "Approach": 10,
      "Quotation": 50,
      "Negotiating Process": 70,
      "Win": 100,
      "Lose": 100,
      "On-hold": 100,
      "Transfer": 100,
      "Terminate": 100,
      "Cancelled": 100,
    };
    setProgress(statusProgressMap[projectStatus] || 0);
  }, [projectStatus]);

  const dealData = {
    dealId: dealId,
    dealName: "International Freight Contract",
    customer: "Global Freight Solutions Inc.",
    customerId: "CUST-001",
    customerType: "customer" as "customer" | "lead",
    customerEmail: dealInfo.customerEmail,
    customerPhone: dealInfo.customerPhone,
    billingAddress: dealInfo.billingAddress,
    totalValue: dealInfo.totalValue,
    expectedCloseDate: dealInfo.expectedCloseDate + "T23:59:59Z",
    owner: dealInfo.owner,
    probability: `High (${dealInfo.probability}%)`,
    stage: "Negotiating Process",
    services: services,
    createdDate: "2024-12-20T09:30:00Z",
    createdBy: "Sarah Chen",
  };

  // Calculate deal age
  const calculateDealAge = (createdDate: string) => {
    const created = new Date(createdDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "วันนี้";
    if (diffDays === 1) return "1 วัน";
    if (diffDays < 7) return `${diffDays} วัน`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} สัปดาห์`;
    }
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} เดือน`;
    }
    const years = Math.floor(diffDays / 365);
    return `${years} ปี`;
  };

  // Calculate days until close
  const calculateDaysUntilClose = (closeDate: string) => {
    const close = new Date(closeDate);
    const now = new Date();
    const diffTime = close.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      const overdueDays = Math.abs(diffDays);
      if (overdueDays === 0) return { text: "วันนี้", isOverdue: false, color: "text-orange-600" };
      if (overdueDays === 1) return { text: "เกินกำหนด 1 วัน", isOverdue: true, color: "text-red-600" };
      if (overdueDays < 7) return { text: `เกินกำหนด ${overdueDays} วัน`, isOverdue: true, color: "text-red-600" };
      const weeks = Math.floor(overdueDays / 7);
      return { text: `เกินกำหนด ${weeks} สัปดาห์`, isOverdue: true, color: "text-red-600" };
    } else {
      if (diffDays === 0) return { text: "ปิดวันนี้", isOverdue: false, color: "text-orange-600" };
      if (diffDays === 1) return { text: "อีก 1 วัน", isOverdue: false, color: "text-orange-600" };
      if (diffDays < 7) return { text: `อีก ${diffDays} วัน`, isOverdue: false, color: diffDays <= 3 ? "text-orange-600" : "text-blue-600" };
      if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return { text: `อีก ${weeks} สัปดาห์`, isOverdue: false, color: "text-blue-600" };
      }
      const months = Math.floor(diffDays / 30);
      return { text: `อีก ${months} เดือน`, isOverdue: false, color: "text-green-600" };
    }
  };

  // Calculate deal cycle
  const calculateDealCycle = (createdDate: string, closeDate: string) => {
    const created = new Date(createdDate);
    const close = new Date(closeDate);
    const diffTime = Math.abs(close.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 7) return `${diffDays} วัน`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} สัปดาห์`;
    }
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} เดือน`;
    }
    const years = Math.floor(diffDays / 365);
    return `${years} ปี`;
  };

  const daysUntilClose = calculateDaysUntilClose(dealData.expectedCloseDate);

  const attachments = [
    { name: "Service_Proposal_v2.pdf", size: "2.4 MB", date: "Dec 12, 2024" },
    { name: "Company_Profile.pdf", size: "1.8 MB", date: "Dec 10, 2024" },
    { name: "Route_Analysis.xlsx", size: "856 KB", date: "Dec 8, 2024" },
  ];

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Win":
        return "bg-green-100 text-green-700";
      case "Negotiating Process":
        return "bg-purple-100 text-purple-700";
      case "Quotation":
        return "bg-blue-100 text-blue-700";
      case "Approach":
        return "bg-indigo-100 text-indigo-700";
      case "Lose":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Handler functions
  const handleEmailClick = () => {
    window.location.href = `mailto:${dealInfo.customerEmail}?subject=Regarding: ${dealData.dealName}`;
    toast.success("Opening email client...");
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${dealInfo.customerPhone}`;
    toast.success("Initiating call...");
  };

  const handleDocumentDownload = (doc: { name: string; size: string; date: string }) => {
    toast.success(`Downloading ${doc.name}...`);
  };

  // Handle edit section
  const handleEditSection = (section: string) => {
    setEditingSection(section);
    if (section === 'customer') {
      setEditedData({
        contactPerson: dealInfo.contactPerson,
        contactPosition: dealInfo.contactPosition,
        customerEmail: dealInfo.customerEmail,
        customerPhone: dealInfo.customerPhone,
        billingAddress: dealInfo.billingAddress,
        industry: dealInfo.industry,
        commodityTypes: [...dealInfo.commodityTypes],
        projectType: dealInfo.projectType,
      });
    } else if (section === 'deal-summary') {
      setEditedData({
        totalValue: dealInfo.totalValue,
        expectedCloseDate: dealInfo.expectedCloseDate,
        owner: dealInfo.owner,
        probability: dealInfo.probability,
      });
    } else if (section === 'services') {
      setEditedData({
        services: [...services],
      });
    }
  };

  // Handle save section
  const handleSaveSection = (section: string) => {
    if (section === 'customer') {
      setDealInfo({
        ...dealInfo,
        contactPerson: editedData.contactPerson,
        contactPosition: editedData.contactPosition,
        customerEmail: editedData.customerEmail,
        customerPhone: editedData.customerPhone,
        billingAddress: editedData.billingAddress,
        industry: editedData.industry,
        commodityTypes: editedData.commodityTypes,
        projectType: editedData.projectType,
      });
      toast.success('บันทึกข้อมูลลูกค้าสำเร็จ! ✅');
    } else if (section === 'deal-summary') {
      setDealInfo({
        ...dealInfo,
        totalValue: editedData.totalValue,
        expectedCloseDate: editedData.expectedCloseDate,
        owner: editedData.owner,
        probability: editedData.probability,
      });
      toast.success('บันทึกข้อมูลดีลสำเร็จ! ✅');
    } else if (section === 'services') {
      setServices(editedData.services);
      toast.success('บันทึกบริการสำเร็จ! ✅');
    }
    setEditingSection(null);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingSection(null);
    setEditedData({});
  };

  return (
    <div className="h-full w-full bg-gray-50 flex flex-col overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full h-full flex flex-col p-1.5 sm:p-2 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between gap-2 mb-1.5 flex-shrink-0">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="h-7 w-7 p-0 flex-shrink-0"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
            </Button>
            <div className="min-w-0 flex-1">
              <h1 className="text-sm font-semibold text-gray-900 truncate">
                {dealData.dealName}
              </h1>
              <p className="text-[10px] text-gray-500 truncate">
                {dealData.dealId} • {dealData.createdBy}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            <Button
              size="sm"
              className="h-7 px-2 text-[10px] bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
              onClick={() => setIsQuickStatusUpdateDialogOpen(true)}
            >
              <TrendingUp className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">อัพเดท</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-7 px-2 text-[10px]"
              onClick={() => setIsHistoryDialogOpen(true)}
            >
              <History className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Deal Summary Card - With Inline Edit */}
        <Card className="border-2 border-purple-200 shadow-sm bg-gradient-to-br from-white to-purple-50/30 mb-1.5 flex-shrink-0">
          <CardContent className="p-1.5">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-[10px] font-semibold text-gray-700">สรุปข้อมูลดีล</h3>
              {editingSection !== 'deal-summary' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditSection('deal-summary')}
                  className="h-5 w-5 p-0"
                >
                  <Edit className="h-3 w-3 text-purple-600" />
                </Button>
              )}
            </div>

            {editingSection === 'deal-summary' ? (
              // Edit Mode
              <div className="space-y-2 bg-white p-2 rounded-lg border border-purple-200">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[9px] text-gray-500 block mb-0.5">มูลค่าดีล</label>
                    <Input
                      value={editedData.totalValue || ''}
                      onChange={(e) => setEditedData({...editedData, totalValue: e.target.value})}
                      className="h-6 text-[10px]"
                      placeholder="$0"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-gray-500 block mb-0.5">โอกาสปิดดีล (%)</label>
                    <Input
                      type="number"
                      value={editedData.probability || ''}
                      onChange={(e) => setEditedData({...editedData, probability: e.target.value})}
                      className="h-6 text-[10px]"
                      placeholder="0-100"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-gray-500 block mb-0.5">วันที่คาดว่าจะปิด</label>
                    <Input
                      type="date"
                      value={editedData.expectedCloseDate || ''}
                      onChange={(e) => setEditedData({...editedData, expectedCloseDate: e.target.value})}
                      className="h-6 text-[10px]"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-gray-500 block mb-0.5">เจ้าของดีล</label>
                    <Input
                      value={editedData.owner || ''}
                      onChange={(e) => setEditedData({...editedData, owner: e.target.value})}
                      className="h-6 text-[10px]"
                      placeholder="ชื่อเจ้าของดีล"
                    />
                  </div>
                </div>
                <div className="flex gap-1.5 pt-1 border-t">
                  <Button
                    size="sm"
                    onClick={() => handleSaveSection('deal-summary')}
                    className="flex-1 h-6 text-[10px] bg-[#7BC9A6] hover:bg-[#6AB896]"
                  >
                    <Save className="h-3 w-3 mr-1" />
                    บันทึก
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancelEdit}
                    className="flex-1 h-6 text-[10px]"
                  >
                    <X className="h-3 w-3 mr-1" />
                    ยกเลิก
                  </Button>
                </div>
              </div>
            ) : (
              // View Mode
              <div className="grid grid-cols-3 lg:grid-cols-6 gap-1.5">
                {/* มูลค่าดีล */}
                <div className="flex items-center gap-1.5 p-1.5 bg-white/80 rounded-lg">
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                    <DollarSign className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-gray-500 leading-none mb-0.5">มูลค่า</p>
                    <p className="text-xs font-bold text-gray-900 leading-none">{dealInfo.totalValue}</p>
                  </div>
                </div>

                {/* สถานะดีล */}
                <div className="flex items-center gap-1.5 p-1.5 bg-white/80 rounded-lg">
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Target className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-gray-500 leading-none mb-0.5">สถานะ</p>
                    <Badge
                      variant="secondary"
                      className={`${getStageColor(dealData.stage)} text-[9px] px-1.5 py-0 font-medium border border-current leading-none h-4`}
                    >
                      {dealData.stage}
                    </Badge>
                  </div>
                </div>

                {/* วันที่คาดว่าจะปิด */}
                <div className="flex items-center gap-1.5 p-1.5 bg-white/80 rounded-lg">
                  <div className={`h-7 w-7 rounded-lg ${daysUntilClose.isOverdue ? 'bg-gradient-to-br from-red-500 to-red-600' : 'bg-gradient-to-br from-orange-500 to-orange-600'} flex items-center justify-center flex-shrink-0`}>
                    <Calendar className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-gray-500 leading-none mb-0.5">ปิดดีล</p>
                    <p className={`text-[10px] font-semibold leading-none ${daysUntilClose.color}`}>{daysUntilClose.text}</p>
                  </div>
                </div>

                {/* เจ้าของดีล */}
                <div className="flex items-center gap-1.5 p-1.5 bg-white/80 rounded-lg">
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <User className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-gray-500 leading-none mb-0.5">เจ้าของ</p>
                    <p className="text-[10px] font-semibold text-gray-900 leading-none truncate">{dealInfo.owner}</p>
                  </div>
                </div>

                {/* ระยะเวลาดีล */}
                <div className="flex items-center gap-1.5 p-1.5 bg-white/80 rounded-lg">
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-gray-500 leading-none mb-0.5">ระยะเวลา</p>
                    <p className="text-[10px] font-semibold text-gray-900 leading-none">{calculateDealCycle(dealData.createdDate, dealData.expectedCloseDate)}</p>
                  </div>
                </div>

                {/* วันที่สร้างดีล */}
                <div className="flex items-center gap-1.5 p-1.5 bg-white/80 rounded-lg">
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-gray-500 leading-none mb-0.5">สร้าง</p>
                    <p className="text-[10px] font-semibold text-gray-900 leading-none">{calculateDealAge(dealData.createdDate)}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Customer Type Badge */}
        <div className="mb-1.5 flex-shrink-0">
          <Badge
            variant="secondary"
            className={`${
              dealData.customerType === "customer"
                ? "bg-blue-100 text-blue-700 border-blue-300"
                : "bg-orange-100 text-orange-700 border-orange-300"
            } text-[10px] px-2 py-0.5 font-medium border h-5`}
          >
            {dealData.customerType === "customer" ? "ลูกค้า" : "ลีด"}
          </Badge>
        </div>

        {/* Two Column Layout - Scrollable Content */}
        <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5">
          {/* Left Column */}
          <div className="flex flex-col gap-2">
            {/* Customer Information Card - With Inline Edit */}
            <Card className="border-gray-200 shadow-sm flex-shrink-0">
              <CardContent className="p-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-blue-600" />
                    <h2 className="text-[11px] font-semibold text-gray-900">ข้อมูลลูกค้า</h2>
                  </div>
                  {editingSection !== 'customer' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditSection('customer')}
                      className="h-5 w-5 p-0"
                    >
                      <Edit className="h-3 w-3 text-blue-600" />
                    </Button>
                  )}
                </div>
                
                {editingSection === 'customer' ? (
                  // Edit Mode
                  <div className="space-y-2">
                    {/* Company Name - Read Only */}
                    <div>
                      <p className="text-[9px] text-gray-500 leading-none mb-0.5">ชื่อบริษัท</p>
                      <p className="text-xs font-semibold text-gray-900 leading-tight">{dealData.customer}</p>
                      <p className="text-[9px] text-gray-600 leading-none mt-0.5">{dealData.customerId}</p>
                    </div>
                    
                    <Separator className="my-1" />
                    
                    {/* Contact Person */}
                    <div>
                      <label className="text-[9px] text-gray-500 leading-none mb-0.5 block">ผู้ติดต่อ</label>
                      <Input
                        value={editedData.contactPerson || ''}
                        onChange={(e) => setEditedData({...editedData, contactPerson: e.target.value})}
                        className="h-6 text-[10px] mb-1"
                        placeholder="ชื่อผู้ติดต่อ"
                      />
                      <label className="text-[9px] text-gray-500 leading-none mb-0.5 block">ตำแหน่ง</label>
                      <Input
                        value={editedData.contactPosition || ''}
                        onChange={(e) => setEditedData({...editedData, contactPosition: e.target.value})}
                        className="h-6 text-[10px]"
                        placeholder="ตำแหน่ง"
                      />
                    </div>
                    
                    <Separator className="my-1" />
                    
                    {/* Contact Details */}
                    <div className="space-y-1.5">
                      <div>
                        <label className="text-[9px] text-gray-500 leading-none mb-0.5 block">อีเมล</label>
                        <Input
                          type="email"
                          value={editedData.customerEmail || ''}
                          onChange={(e) => setEditedData({...editedData, customerEmail: e.target.value})}
                          className="h-6 text-[10px]"
                          placeholder="email@example.com"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] text-gray-500 leading-none mb-0.5 block">โทรศัพท์</label>
                        <Input
                          type="tel"
                          value={editedData.customerPhone || ''}
                          onChange={(e) => setEditedData({...editedData, customerPhone: e.target.value})}
                          className="h-6 text-[10px]"
                          placeholder="0812345678"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] text-gray-500 leading-none mb-0.5 block">ที่อยู่</label>
                        <Textarea
                          value={editedData.billingAddress || ''}
                          onChange={(e) => setEditedData({...editedData, billingAddress: e.target.value})}
                          className="text-[10px] min-h-[50px]"
                          placeholder="กรอกที่อยู่..."
                        />
                      </div>
                    </div>
                    
                    <Separator className="my-1" />
                    
                    {/* Additional Information Section */}
                    <div>
                      <div className="flex items-center gap-1 mb-1.5">
                        <Info className="h-3 w-3 text-gray-600" />
                        <h3 className="text-[10px] font-semibold text-gray-900">ข้อมูลเพิ่มเติม</h3>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <label className="text-[9px] text-gray-500 mb-0.5 leading-none block">อุตสาหกรรม</label>
                          <Select
                            value={editedData.industry}
                            onValueChange={(value) => setEditedData({...editedData, industry: value})}
                          >
                            <SelectTrigger className="h-6 text-[10px]">
                              <SelectValue placeholder="เลือกอุตสาหกรรม" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Agriculture">Agriculture</SelectItem>
                              <SelectItem value="Automotive">Automotive</SelectItem>
                              <SelectItem value="Construction">Construction</SelectItem>
                              <SelectItem value="Chemical">Chemical</SelectItem>
                              <SelectItem value="Circular Economy">Circular Economy</SelectItem>
                              <SelectItem value="Electronics">Electronics</SelectItem>
                              <SelectItem value="Energy">Energy</SelectItem>
                              <SelectItem value="Fashion">Fashion</SelectItem>
                              <SelectItem value="Food & FMCG">Food & FMCG</SelectItem>
                              <SelectItem value="Home & Living">Home & Living</SelectItem>
                              <SelectItem value="Packaging">Packaging</SelectItem>
                              <SelectItem value="Healthcare">Healthcare</SelectItem>
                              <SelectItem value="Waste Management">Waste Management</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="text-[9px] text-gray-500 mb-0.5 leading-none block">ประเภทสินค้า</label>
                          <Select
                            onValueChange={(value) => {
                              if (value && !editedData.commodityTypes.includes(value)) {
                                setEditedData({
                                  ...editedData,
                                  commodityTypes: [...editedData.commodityTypes, value]
                                });
                              }
                            }}
                          >
                            <SelectTrigger className="h-6 text-[10px]">
                              <SelectValue placeholder="เพิ่มประเภทสินค้า" />
                            </SelectTrigger>
                            <SelectContent>
                              {COMMODITY_TYPES.map((commodity) => (
                                <SelectItem 
                                  key={commodity.value} 
                                  value={commodity.label}
                                  disabled={editedData.commodityTypes?.includes(commodity.label)}
                                >
                                  {commodity.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {editedData.commodityTypes?.map((type: string, index: number) => (
                              <Badge key={index} variant="secondary" className="bg-green-100 text-green-700 text-[9px] px-1.5 py-0 h-4">
                                {type}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditedData({
                                      ...editedData,
                                      commodityTypes: editedData.commodityTypes.filter((t: string) => t !== type)
                                    });
                                  }}
                                  className="ml-1 hover:text-red-600"
                                >
                                  <X className="h-2.5 w-2.5" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-[9px] text-gray-500 mb-0.5 leading-none block">ประเภทโครงการ</label>
                          <Select
                            value={editedData.projectType}
                            onValueChange={(value) => setEditedData({...editedData, projectType: value})}
                          >
                            <SelectTrigger className="h-6 text-[10px]">
                              <SelectValue placeholder="เลือกประเภทโครงการ" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Solution Design">Solution Design</SelectItem>
                              <SelectItem value="Product Development">Product Development</SelectItem>
                              <SelectItem value="Cost Improvement">Cost Improvement</SelectItem>
                              <SelectItem value="Internal Improvement">Internal Improvement</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-1.5 pt-2 border-t">
                      <Button
                        size="sm"
                        onClick={() => handleSaveSection('customer')}
                        className="flex-1 h-6 text-[10px] bg-[#7BC9A6] hover:bg-[#6AB896]"
                      >
                        <Save className="h-3 w-3 mr-1" />
                        บันทึก
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancelEdit}
                        className="flex-1 h-6 text-[10px]"
                      >
                        <X className="h-3 w-3 mr-1" />
                        ยกเลิก
                      </Button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="space-y-1.5">
                    {/* Company Name */}
                    <div>
                      <p className="text-[9px] text-gray-500 leading-none mb-0.5">ชื่อบริษัท</p>
                      <p className="text-xs font-semibold text-gray-900 leading-tight">{dealData.customer}</p>
                      <p className="text-[9px] text-gray-600 leading-none mt-0.5">{dealData.customerId}</p>
                    </div>
                    
                    <Separator className="my-1" />
                    
                    {/* Contact Person */}
                    <div>
                      <p className="text-[9px] text-gray-500 leading-none mb-0.5">ผู้ติดต่อ</p>
                      <p className="text-[11px] font-medium text-gray-900 leading-tight">{dealInfo.contactPerson}</p>
                      <p className="text-[9px] text-gray-600 leading-none">{dealInfo.contactPosition}</p>
                    </div>
                    
                    <Separator className="my-1" />
                    
                    {/* Contact Details */}
                    <div className="grid grid-cols-1 gap-1">
                      <button
                        onClick={handleEmailClick}
                        className="flex items-center gap-1.5 p-1 rounded hover:bg-gray-50 transition-colors group"
                      >
                        <div className="h-5 w-5 bg-blue-100 rounded flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                          <Mail className="h-2.5 w-2.5 text-blue-600" />
                        </div>
                        <div className="text-left flex-1 min-w-0">
                          <p className="text-[9px] text-gray-500 leading-none">อีเมล</p>
                          <p className="text-[10px] text-gray-900 truncate leading-tight">{dealInfo.customerEmail}</p>
                        </div>
                      </button>
                      
                      <button
                        onClick={handlePhoneClick}
                        className="flex items-center gap-1.5 p-1 rounded hover:bg-gray-50 transition-colors group"
                      >
                        <div className="h-5 w-5 bg-green-100 rounded flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                          <Phone className="h-2.5 w-2.5 text-green-600" />
                        </div>
                        <div className="text-left flex-1 min-w-0">
                          <p className="text-[9px] text-gray-500 leading-none">โทรศัพท์</p>
                          <p className="text-[10px] text-gray-900 leading-tight">{dealInfo.customerPhone}</p>
                        </div>
                      </button>
                      
                      <div className="flex items-center gap-1.5 p-1">
                        <div className="h-5 w-5 bg-purple-100 rounded flex items-center justify-center flex-shrink-0">
                          <MapPin className="h-2.5 w-2.5 text-purple-600" />
                        </div>
                        <div className="text-left flex-1 min-w-0">
                          <p className="text-[9px] text-gray-500 leading-none">ที่อยู่</p>
                          <p className="text-[10px] text-gray-900 line-clamp-1 leading-tight">{dealInfo.billingAddress}</p>
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="my-1" />
                    
                    {/* Additional Information */}
                    <div>
                      <div className="flex items-center gap-1 mb-1.5">
                        <Info className="h-3 w-3 text-gray-600" />
                        <h3 className="text-[10px] font-semibold text-gray-900">ข้อมูลเพิ่มเติม</h3>
                      </div>
                      
                      <div className="space-y-1.5">
                        <div>
                          <p className="text-[9px] text-gray-500 mb-0.5 leading-none">อุตสาหกรรม</p>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-[9px] px-1.5 py-0 h-4">
                            {dealInfo.industry}
                          </Badge>
                        </div>
                        
                        <div>
                          <p className="text-[9px] text-gray-500 mb-0.5 leading-none">ประเภทสินค้า</p>
                          <div className="flex flex-wrap gap-1">
                            {dealInfo.commodityTypes.map((type, index) => (
                              <Badge key={index} variant="secondary" className="bg-green-100 text-green-700 text-[9px] px-1.5 py-0 h-4">
                                {type}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-[9px] text-gray-500 mb-0.5 leading-none">ประเภทโครงการ</p>
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-[9px] px-1.5 py-0 h-4">
                            {dealInfo.projectType}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Services/Products Card */}
            <Card className="border-gray-200 shadow-sm flex-shrink-0">
              <CardContent className="p-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Package className="h-3.5 w-3.5 text-green-600" />
                    <h2 className="text-[11px] font-semibold text-gray-900">บริการ/รายการ</h2>
                  </div>
                  {editingSection !== 'services' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditSection('services')}
                      className="h-5 w-5 p-0"
                    >
                      <Edit className="h-3 w-3 text-green-600" />
                    </Button>
                  )}
                </div>
                
                {editingSection === 'services' ? (
                  // Edit Mode - Simplified Table Format
                  <div className="space-y-3 bg-white rounded-lg">
                    {/* Table */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      {/* Table Header */}
                      <div className="bg-gray-50 border-b border-gray-200">
                        <div className="grid grid-cols-[40px_100px_1fr_1fr_80px_80px_100px] gap-2 p-2.5 text-[10px] font-semibold text-gray-700">
                          <div className="text-center">#</div>
                          <div>ประเภทบริการ</div>
                          <div>ชื่อบริการ</div>
                          <div>รายละเอียด</div>
                          <div className="text-center">จำนวน</div>
                          <div className="text-center">หน่วย</div>
                          <div className="text-right">ราคา/หน่วย</div>
                        </div>
                      </div>

                      {/* Table Body */}
                      <div className="bg-white">
                        {editedData.services.map((service: any, index: number) => (
                          <div key={service.id} className="grid grid-cols-[40px_100px_1fr_1fr_80px_80px_100px] gap-2 p-2.5 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 group">
                            {/* # */}
                            <div className="text-center text-[11px] text-gray-600 flex items-center justify-center font-medium">
                              {index + 1}
                            </div>
                            
                            {/* ประเภทบริการ */}
                            <div>
                              <Select
                                value={service.serviceType || "Unknown"}
                                onValueChange={(value) => {
                                  const newServices = [...editedData.services];
                                  newServices[index].serviceType = value;
                                  setEditedData({ ...editedData, services: newServices });
                                }}
                              >
                                <SelectTrigger className="h-8 text-[10px] border-gray-200">
                                  <SelectValue placeholder="เลือก" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Freight">Freight</SelectItem>
                                  <SelectItem value="Customs">Customs</SelectItem>
                                  <SelectItem value="Warehouse">Warehouse</SelectItem>
                                  <SelectItem value="Transport">Transport</SelectItem>
                                  <SelectItem value="Crossborder">Crossborder</SelectItem>
                                  <SelectItem value="Trading">Trading</SelectItem>
                                  <SelectItem value="Service">Service</SelectItem>
                                  <SelectItem value="Other">Other</SelectItem>
                                  <SelectItem value="Unknown">Unknown</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            {/* ชื่อบริการ */}
                            <div>
                              <Input
                                value={service.service}
                                onChange={(e) => {
                                  const newServices = [...editedData.services];
                                  newServices[index].service = e.target.value;
                                  setEditedData({ ...editedData, services: newServices });
                                }}
                                className="h-8 text-[11px] border-gray-200 focus:border-[#7BC9A6] focus:ring-[#7BC9A6]"
                                placeholder="ชื่อบริการ"
                              />
                            </div>
                            
                            {/* รายละเอียด */}
                            <div>
                              <Input
                                value={service.description}
                                onChange={(e) => {
                                  const newServices = [...editedData.services];
                                  newServices[index].description = e.target.value;
                                  setEditedData({ ...editedData, services: newServices });
                                }}
                                className="h-8 text-[11px] border-gray-200 focus:border-[#7BC9A6] focus:ring-[#7BC9A6]"
                                placeholder="รายละเอียด"
                              />
                            </div>
                            
                            {/* จำนวน */}
                            <div>
                              <Input
                                type="number"
                                value={service.quantity}
                                onChange={(e) => {
                                  const newServices = [...editedData.services];
                                  newServices[index].quantity = e.target.value;
                                  // Auto calculate total
                                  const qty = parseFloat(e.target.value) || 0;
                                  const price = parseFloat(newServices[index].unitPrice) || 0;
                                  const discount = parseFloat(newServices[index].discount) || 0;
                                  const subtotal = qty * price;
                                  const discountAmount = (subtotal * discount) / 100;
                                  newServices[index].total = (subtotal - discountAmount).toFixed(0);
                                  setEditedData({ ...editedData, services: newServices });
                                }}
                                className="h-8 text-[11px] text-center border-gray-200 focus:border-[#7BC9A6] focus:ring-[#7BC9A6]"
                                placeholder="0"
                              />
                            </div>
                            
                            {/* หน่วย */}
                            <div>
                              <Input
                                value={service.unit}
                                onChange={(e) => {
                                  const newServices = [...editedData.services];
                                  newServices[index].unit = e.target.value;
                                  setEditedData({ ...editedData, services: newServices });
                                }}
                                className="h-8 text-[11px] text-center border-gray-200 focus:border-[#7BC9A6] focus:ring-[#7BC9A6]"
                                placeholder="หน่วย"
                              />
                            </div>
                            
                            {/* ราคา/หน่วย */}
                            <div className="flex items-center gap-1">
                              <Input
                                type="number"
                                value={service.unitPrice}
                                onChange={(e) => {
                                  const newServices = [...editedData.services];
                                  newServices[index].unitPrice = e.target.value;
                                  // Auto calculate total
                                  const qty = parseFloat(newServices[index].quantity) || 0;
                                  const price = parseFloat(e.target.value) || 0;
                                  const discount = parseFloat(newServices[index].discount) || 0;
                                  const subtotal = qty * price;
                                  const discountAmount = (subtotal * discount) / 100;
                                  newServices[index].total = (subtotal - discountAmount).toFixed(0);
                                  setEditedData({ ...editedData, services: newServices });
                                }}
                                className="h-8 text-[11px] text-right border-gray-200 focus:border-[#7BC9A6] focus:ring-[#7BC9A6] flex-1"
                                placeholder="0"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const newServices = editedData.services.filter((_: any, i: number) => i !== index);
                                  setEditedData({ ...editedData, services: newServices });
                                }}
                                className="h-8 w-8 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Add New Service Button */}
                    <div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newService = {
                            id: Date.now(),
                            service: "",
                            description: "",
                            quantity: "1",
                            unit: "",
                            unitPrice: "0",
                            discount: "0",
                            total: "0",
                          };
                          setEditedData({ ...editedData, services: [...editedData.services, newService] });
                        }}
                        className="w-full h-9 text-[11px] text-[#7BC9A6] hover:text-[#6AB896] hover:bg-green-50/50 border border-dashed border-gray-300 hover:border-[#7BC9A6]"
                      >
                        <Plus className="h-4 w-4 mr-1.5" />
                        เพิ่มบริการใหม่
                      </Button>
                    </div>

                    {/* Summary Section */}
                    <div className="space-y-1.5 pt-2 border-t border-gray-200">
                      {/* ยอดรวม */}
                      <div className="flex justify-end items-center gap-6">
                        <span className="text-[11px] text-gray-600 font-medium">ยอดรวม</span>
                        <span className="text-sm font-bold text-gray-900 min-w-[140px] text-right">
                          ฿{editedData.services.reduce((sum: number, s: any) => sum + parseFloat(s.total || 0), 0).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                      
                      {/* VAT 7% */}
                      <div className="flex justify-end items-center gap-6">
                        <span className="text-[11px] text-gray-600 font-medium">VAT 7%</span>
                        <span className="text-sm font-bold text-gray-900 min-w-[140px] text-right">
                          ฿{(editedData.services.reduce((sum: number, s: any) => sum + parseFloat(s.total || 0), 0) * 0.07).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                      
                      {/* ยอดรวมทั้งสิ้น */}
                      <div className="flex justify-end items-center gap-6 bg-[#7BC9A6]/10 p-3 rounded-lg mt-2">
                        <span className="text-[12px] font-semibold text-[#7BC9A6]">ยอดรวมทั้งสิ้น</span>
                        <span className="text-lg font-bold text-[#7BC9A6] min-w-[140px] text-right">
                          ฿{(editedData.services.reduce((sum: number, s: any) => sum + parseFloat(s.total || 0), 0) * 1.07).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-3">
                      <Button
                        size="sm"
                        onClick={() => handleSaveSection('services')}
                        className="flex-1 h-10 text-[12px] bg-[#7BC9A6] hover:bg-[#6AB896] text-white font-medium"
                      >
                        <Save className="h-4 w-4 mr-1.5" />
                        บันทึก
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancelEdit}
                        className="flex-1 h-10 text-[12px] border-gray-300 hover:bg-gray-50 font-medium"
                      >
                        <X className="h-4 w-4 mr-1.5" />
                        ยกเลิก
                      </Button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="space-y-1">
                    {services.map((service, index) => (
                      <div key={index} className="border border-gray-200 rounded p-1.5 bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex items-center gap-1.5 flex-1">
                            <p className="text-[10px] font-medium text-gray-900 leading-tight">
                              {index + 1}. {service.service}
                            </p>
                            <Badge 
                              variant="secondary" 
                              className={`text-[8px] h-4 px-1.5 ${
                                service.serviceType === "Freight" ? "bg-blue-100 text-blue-700" :
                                service.serviceType === "Customs" ? "bg-purple-100 text-purple-700" :
                                service.serviceType === "Warehouse" ? "bg-orange-100 text-orange-700" :
                                service.serviceType === "Transport" ? "bg-green-100 text-green-700" :
                                service.serviceType === "Crossborder" ? "bg-indigo-100 text-indigo-700" :
                                service.serviceType === "Trading" ? "bg-pink-100 text-pink-700" :
                                service.serviceType === "Service" ? "bg-teal-100 text-teal-700" :
                                service.serviceType === "Other" ? "bg-yellow-100 text-yellow-700" :
                                "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {service.serviceType || "Unknown"}
                            </Badge>
                          </div>
                          <span className="text-[10px] font-semibold text-[#7BC9A6]">
                            ฿{parseFloat(service.total || 0).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>
                        {service.description && (
                          <p className="text-[9px] text-gray-600 mb-1 leading-tight">{service.description}</p>
                        )}
                        <div className="grid grid-cols-4 gap-1.5 text-[9px] text-gray-600">
                          <div>
                            <span className="text-gray-500 block leading-none mb-0.5">จำนวน:</span>
                            <span className="font-medium text-gray-900 leading-tight">{service.quantity} {service.unit}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 block leading-none mb-0.5">ราคา/หน่วย:</span>
                            <span className="font-medium text-gray-900 leading-tight">฿{parseFloat(service.unitPrice || 0).toLocaleString('th-TH')}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 block leading-none mb-0.5">ส่วนลด:</span>
                            <span className="font-medium text-gray-900 leading-tight">{service.discount}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <Separator className="my-1.5" />
                    
                    {/* Summary */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center px-1.5">
                        <span className="text-[9px] text-gray-600">ยอดรวม</span>
                        <span className="text-[10px] font-semibold text-gray-900">
                          ฿{services.reduce((sum, s) => sum + parseFloat(s.total || 0), 0).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex justify-between items-center px-1.5">
                        <span className="text-[9px] text-gray-600">VAT 7%</span>
                        <span className="text-[10px] font-semibold text-gray-900">
                          ฿{(services.reduce((sum, s) => sum + parseFloat(s.total || 0), 0) * 0.07).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-1.5 bg-gradient-to-r from-green-50 to-emerald-50 rounded border border-green-200">
                        <span className="text-[10px] font-semibold text-[#7BC9A6]">ยอดรวมทั้งสิ้น</span>
                        <span className="text-sm font-bold text-[#7BC9A6]">
                          ฿{(services.reduce((sum, s) => sum + parseFloat(s.total || 0), 0) * 1.07).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-2">
            {/* Quotations Card */}
            <Card className="border-gray-200 shadow-sm flex-shrink-0">
              <CardContent className="p-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-purple-600" />
                    <h3 className="text-[11px] font-semibold text-gray-900">ใบเสนอราคา</h3>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-[9px] h-4 px-1.5">
                      {quotations.length}
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsUploadQuotationDialogOpen(true)}
                      className="h-6 px-2 text-[9px] border-gray-300"
                    >
                      <Upload className="h-3 w-3 mr-0.5" />
                      อัปโหลด
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setIsMultiQuotationDialogOpen(true)}
                      className="h-6 px-2 text-[9px] bg-[#7BC9A6] hover:bg-[#6AB896] text-white"
                    >
                      <Plus className="h-3 w-3 mr-0.5" />
                      สร้าง
                    </Button>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {quotations.length === 0 ? (
                    <div className="text-center py-4 border border-dashed border-gray-300 rounded">
                      <FileText className="h-6 w-6 text-gray-300 mx-auto mb-1" />
                      <p className="text-[10px] text-gray-500 mb-1">ยังไม่มีใบเสนอราคา</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsMultiQuotationDialogOpen(true)}
                        className="h-6 text-[9px]"
                      >
                        <Plus className="h-2.5 w-2.5 mr-0.5" />
                        สร้างใบเสนอราคา
                      </Button>
                    </div>
                  ) : (
                    quotations.map((quote, index) => {
                      return (
                        <div key={index} className="border border-gray-200 rounded p-2 bg-white hover:bg-gray-50 transition-colors">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                                <span className="text-[10px] font-bold text-blue-600">{quote.id}</span>
                                <Badge 
                                  variant="secondary" 
                                  className={`text-[9px] px-1 py-0 h-4 ${
                                    quote.status === 'sent' ? 'bg-green-100 text-green-700' :
                                    quote.status === 'draft' ? 'bg-gray-100 text-gray-700' :
                                    quote.status === 'accepted' ? 'bg-blue-100 text-blue-700' :
                                    'bg-red-100 text-red-700'
                                  }`}
                                >
                                  {quote.status === 'sent' ? 'ส่งแล้ว' :
                                   quote.status === 'draft' ? 'ฉบับร่าง' :
                                   quote.status === 'accepted' ? 'ยอมรับ' :
                                   'ปฏิเสธ'}
                                </Badge>
                                <span className="text-[9px] text-gray-500">{quote.version}</span>
                              </div>
                              <p className="text-[10px] font-medium text-gray-900 mb-1 line-clamp-1 leading-tight">
                                {quote.title}
                              </p>
                              <div className="flex items-center gap-2 text-[9px] text-gray-500 flex-wrap">
                                <span className="flex items-center gap-0.5">
                                  <Calendar className="h-2.5 w-2.5" />
                                  {quote.createdDate}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xs font-bold text-green-600 mb-1">{quote.amount}</p>
                              <div className="flex gap-0.5">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    toast.success(`Opening ${quote.id}...`);
                                    if (onQuotationClick) onQuotationClick(quote.id);
                                  }}
                                  className="h-5 w-5 p-0"
                                >
                                  <Eye className="h-2.5 w-2.5" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toast.success(`Downloading ${quote.id}...`)}
                                  className="h-5 w-5 p-0"
                                >
                                  <Download className="h-2.5 w-2.5" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
            {/* Documents Card */}
            <Card className="border-gray-200 shadow-sm flex-shrink-0">
              <CardContent className="p-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-orange-600" />
                    <h3 className="text-[11px] font-semibold text-gray-900">เอกสารแนบ</h3>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-[9px] h-4 px-1.5">
                      {attachments.length}
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => {
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.multiple = true;
                      input.accept = '.pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png';
                      input.onchange = (e: any) => {
                        const files = e.target.files;
                        if (files && files.length > 0) {
                          toast.success(`กำลังอัปโหลด ${files.length} ไฟล์...`);
                          // Here you would handle the actual file upload
                        }
                      };
                      input.click();
                    }}
                    className="h-6 px-2 text-[9px] bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    <Upload className="h-3 w-3 mr-0.5" />
                    อัปโหลด
                  </Button>
                </div>
                <div className="space-y-1">
                  {attachments.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-1.5 bg-gray-50 rounded border border-gray-200 hover:bg-gray-100 transition-colors group">
                      <div className="flex items-center gap-1.5 flex-1 min-w-0">
                        <div className="h-6 w-6 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                          <FileText className="h-3 w-3 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-medium text-gray-900 truncate leading-tight">{doc.name}</p>
                          <p className="text-[9px] text-gray-500 leading-none">{doc.size}</p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDocumentDownload(doc)}
                        className="h-6 w-6 p-0 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Download className="h-3 w-3 text-gray-600" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <CreateQuotationFormModal
        key={selectedQuotationGroup ? `${selectedQuotationGroup.serviceType}-${currentGroupIndex}` : 'single'}
        isOpen={isCreateQuotationDialogOpen}
        onClose={() => {
          setIsCreateQuotationDialogOpen(false);
          setSelectedQuotationGroup(null);
          setPendingQuotationGroups([]);
          setCurrentGroupIndex(0);
        }}
        progressInfo={pendingQuotationGroups.length > 1 ? {
          current: currentGroupIndex + 1,
          total: pendingQuotationGroups.length
        } : undefined}
        initialData={{
          source: "crm",
          crmDealId: dealData.dealId,
          // If creating from a specific group, use that template, otherwise use all services
          templateType: selectedQuotationGroup?.templateType,
          companyNameTh: dealData.customer,
          companyNameEn: dealData.customer,
          contactName: dealInfo.contactPerson || "",
          position: dealInfo.contactPosition || "",
          phone: dealData.customerPhone || "",
          email: dealData.customerEmail || "",
          address: dealData.billingAddress || "",
          validUntil: dealData.expectedCloseDate ? dealData.expectedCloseDate.split("T")[0] : "",
          quotationNumber: `QT-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
          // Auto-fill service descriptions - use selected group services or all services
          description: selectedQuotationGroup 
            ? selectedQuotationGroup.services.map((s: any, idx: number) => `${idx + 1}. ${s.service}${s.description ? ` - ${s.description}` : ''}`).join('\n')
            : services.length > 0 
              ? services.map((s, idx) => `${idx + 1}. ${s.service}${s.description ? ` - ${s.description}` : ''}`).join('\n')
              : "",
          // Map services to introduction text
          introduction: `ขอบคุณที่ให้โอกาสเราได้นำเสนอบริการสำหรับโครงการ "${dealData.dealName}"\n\nเรายินดีเสนอบริการที่ตอบสนองความต้องการของท่านดังต่อไปนี้`,
          warehouseServiceDescription: `ขอบคุณที่ให้โอกาสเราได้นำเสนอบริการสำหรับโครงการ "${dealData.dealName}"\n\nเรายินดีเสนอบริการที่ตอบสนองความต้องการของท่านดังต่อไปนี้`,
          crossBorderIntroduction: `ขอบคุณที่ให้โอกาสเราได้นำเสนอบริการสำหรับโครงการ "${dealData.dealName}"\n\nเรายินดีเสนอบริการที่ตอบสนองความต้องการของท่านดังต่อไปนี้`,
          internationalIntroduction: `ขอบคุณที่ให้โอกาสเราได้นำเสนอบริการสำหรับโครงการ "${dealData.dealName}"\n\nเรายินดีเสนอบริการที่ตอบสนองความต้องการของท่านดังต่อไปนี้`,
          
          // Product Information from commodity types
          warehouseProduct: dealInfo.commodityTypes?.join(", ") || "",
          customsProduct: dealInfo.commodityTypes?.join(", ") || "",
          crossBorderProduct: dealInfo.commodityTypes?.join(", ") || "",
          internationalProduct: dealInfo.commodityTypes?.join(", ") || "",
          productCategory: dealInfo.commodityTypes?.[0] || "",
          cargoType: dealInfo.commodityTypes?.[0] || "",
          
          // Volume information - use selected group or first service
          warehouseVolume: selectedQuotationGroup 
            ? `${selectedQuotationGroup.services[0]?.quantity} ${selectedQuotationGroup.services[0]?.unit}` 
            : services.length > 0 ? `${services[0].quantity} ${services[0].unit}` : "",
          customsVolume: selectedQuotationGroup 
            ? `${selectedQuotationGroup.services[0]?.quantity} ${selectedQuotationGroup.services[0]?.unit}` 
            : services.length > 0 ? `${services[0].quantity} ${services[0].unit}` : "",
          crossBorderVolume: selectedQuotationGroup 
            ? `${selectedQuotationGroup.services[0]?.quantity} ${selectedQuotationGroup.services[0]?.unit}` 
            : services.length > 0 ? `${services[0].quantity} ${services[0].unit}` : "",
          internationalVolume: selectedQuotationGroup 
            ? `${selectedQuotationGroup.services[0]?.quantity} ${selectedQuotationGroup.services[0]?.unit}` 
            : services.length > 0 ? `${services[0].quantity} ${services[0].unit}` : "",
          
          // Goods value for customs
          goodsValue: dealInfo.totalValue || "",
        }}
        onSubmit={(quotationData) => {
          console.log("Creating quotation from deal:", quotationData);
          
          const templateName = selectedQuotationGroup 
            ? `${SERVICE_TYPE_LABELS[selectedQuotationGroup.serviceType]}` 
            : "รวมทุกบริการ";
          
          toast.success(`สร้างใบเสนอราคา${templateName}สำเร็จ!`, {
            description: selectedQuotationGroup 
              ? `เทมเพลต: ${TEMPLATE_NAMES[selectedQuotationGroup.templateType]} | มูลค่า ฿${selectedQuotationGroup.totalAmount.toLocaleString('th-TH', { minimumFractionDigits: 2 })}` 
              : undefined,
          });
          
          // Check if there are more quotations to create
          if (pendingQuotationGroups.length > 0 && currentGroupIndex < pendingQuotationGroups.length - 1) {
            // Move to next quotation
            const nextIndex = currentGroupIndex + 1;
            const nextGroup = pendingQuotationGroups[nextIndex];
            
            setCurrentGroupIndex(nextIndex);
            setSelectedQuotationGroup(nextGroup);
            
            // Keep the modal open and show info about next quotation
            toast.info(`ต่อไป: ใบที่ ${nextIndex + 1} จาก ${pendingQuotationGroups.length}`, {
              description: `${SERVICE_TYPE_LABELS[nextGroup.serviceType]} (${TEMPLATE_NAMES[nextGroup.templateType]})`,
              duration: 2000,
            });
            
            // Don't close the modal, just update the form data
            // The modal will automatically refresh with new initialData
          } else {
            // All done - close modal and navigate
            setIsCreateQuotationDialogOpen(false);
            setSelectedQuotationGroup(null);
            setPendingQuotationGroups([]);
            setCurrentGroupIndex(0);
            
            if (pendingQuotationGroups.length > 1) {
              toast.success(`สร้างใบเสนอราคาเรียบร้อยทั้งหมด ${pendingQuotationGroups.length} ใบ`, {
                description: "คลิกที่นี่เพื่อดูรายการใบเสนอราคา",
                duration: 5000,
              });
            }
            
            // Navigate to quotation detail if navigation is available
            if (onNavigate) {
              setTimeout(() => {
                onNavigate("/quotations");
              }, 1500);
            }
          }
        }}
      />

      <UploadExternalQuotationModal
        isOpen={isUploadQuotationDialogOpen}
        onClose={() => setIsUploadQuotationDialogOpen(false)}
        initialData={{
          customerName: dealData.customer,
          relatedDealId: dealData.dealId,
          validUntil: dealData.expectedCloseDate ? dealData.expectedCloseDate.split("T")[0] : "",
          documentNumber: `QT-EXT-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
          services: services.map((service) => ({
            id: service.id.toString(),
            serviceName: service.serviceType || "Unknown",
            description: service.description || "",
            quantity: parseFloat(service.quantity) || 0,
            unit: service.unit || "รายการ",
            unitPrice: parseFloat(service.unitPrice) || 0,
            discount: parseFloat(service.discount) || 0,
          })),
        }}
        onSave={(data) => {
          console.log("Uploading external quotation:", data);
          setIsUploadQuotationDialogOpen(false);
          toast.success("อัปโหลดใบเสนอราคาสำเร็จ!");
          
          // Navigate to quotations if navigation is available
          if (onNavigate) {
            onNavigate("/quotations");
          }
        }}
      />

      <MultiQuotationCreationDialog
        isOpen={isMultiQuotationDialogOpen}
        onClose={() => setIsMultiQuotationDialogOpen(false)}
        services={services}
        dealData={{
          customer: dealData.customer,
          dealId: dealData.dealId,
          expectedCloseDate: dealData.expectedCloseDate,
        }}
        onCreateQuotations={(quotationGroups, mode) => {
          console.log("Creating quotations:", { quotationGroups, mode });
          
          if (mode === 'single') {
            // Single quotation with all services - open form with all templates
            setSelectedQuotationGroup(null);
            setPendingQuotationGroups([]);
            setCurrentGroupIndex(0);
            setIsCreateQuotationDialogOpen(true);
          } else {
            // Multiple quotations - open form for each group one by one
            setPendingQuotationGroups(quotationGroups);
            setCurrentGroupIndex(0);
            setSelectedQuotationGroup(quotationGroups[0]);
            
            toast.info(`เตรียมสร้างใบเสนอราคา ${quotationGroups.length} ใบ`, {
              description: `เริ่มต้นที่ใบที่ 1: ${SERVICE_TYPE_LABELS[quotationGroups[0].serviceType]} (${TEMPLATE_NAMES[quotationGroups[0].templateType]})`,
              duration: 3000,
            });
            
            setIsCreateQuotationDialogOpen(true);
          }
          
          setIsMultiQuotationDialogOpen(false);
        }}
      />

      {isHistoryDialogOpen && (
        <HistoryDialog
          isOpen={isHistoryDialogOpen}
          entries={activityHistory}
          onClose={() => setIsHistoryDialogOpen(false)}
          title="กิจกรรมดีล"
        />
      )}

      {isGenerateProposalDialogOpen && (
        <GenerateProposalDialog
          dealData={dealData}
          open={isGenerateProposalDialogOpen}
          onClose={() => setIsGenerateProposalDialogOpen(false)}
          onGenerate={(proposalData) => {
            console.log("Generating proposal:", proposalData);
            setIsGenerateProposalDialogOpen(false);
            toast.success("Proposal generated successfully!");
          }}
        />
      )}

      {isScheduleMeetingDialogOpen && (
        <ScheduleMeetingDialog
          dealData={dealData}
          open={isScheduleMeetingDialogOpen}
          onClose={() => setIsScheduleMeetingDialogOpen(false)}
          onSchedule={(meetingData) => {
            console.log("Scheduling meeting:", meetingData);
            setIsScheduleMeetingDialogOpen(false);
            toast.success("Meeting scheduled successfully!");
          }}
        />
      )}

      {isQuickStatusUpdateDialogOpen && (
        <QuickStatusUpdateDialog
          isOpen={isQuickStatusUpdateDialogOpen}
          onClose={() => setIsQuickStatusUpdateDialogOpen(false)}
          dealId={dealData.dealId}
          dealName={dealData.dealName}
          currentStatus={projectStatus}
          onSave={(newStatus, notes, winLossReason, winLossDetails) => {
            console.log("New status:", newStatus);
            console.log("Notes:", notes);
            if (winLossReason) {
              console.log("Win/Loss Reason:", winLossReason);
            }
            if (winLossDetails) {
              console.log("Win/Loss Details:", winLossDetails);
            }
            setProjectStatus(newStatus);
            setIsQuickStatusUpdateDialogOpen(false);
            
            if (newStatus === "Win") {
              toast.success(`🎉 ยินดีด้วย! อัปเดตดีลเป็น Win สำเร็จ!`);
            } else if (newStatus === "Lose") {
              toast.info(`อัปเดตดีลเป็น Lose แล้ว - ข้อมูลจะถูกใช้ในการวิเคราะห์`);
            } else {
              toast.success(`อัปเดตสถานะเป็น ${newStatus} สำเร็จ!`);
            }
          }}
        />
      )}
    </div>
  );
}