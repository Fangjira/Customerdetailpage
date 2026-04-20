import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Search,
  FileText,
  Eye,
  Edit,
  Download,
  Mail,
  MoreVertical,
  Calendar,
  User,
  Building2,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  Plus,
  ChevronRight,
  Upload,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CreateContractWizard } from "../create-contract-wizard";
import { GenerateProposalDialog } from "../generate-proposal-dialog";
import { CreateNDADialog } from "../create-nda-dialog";
import { DocumentGeneratorModal } from "./document-generator-modal";
import { UploadExternalDocumentDialog } from "../upload-external-document-dialog";

type DocumentType = "proposal" | "contract" | "nda";
type DocumentStatus = "draft" | "sent" | "approved" | "rejected" | "expired" | "active" | "pending" | "signed";

interface Document {
  id: string;
  type: DocumentType;
  title: string;
  customer: string;
  totalValue: string;
  status: DocumentStatus;
  createdDate: string;
  startDate?: string;
  endDate?: string;
  expiryDate?: string;
  createdBy: string;
  dealId?: string;
  dealName?: string;
  template?: string;
  utilization?: number;
  businessUnit?: string;
  paymentTerms?: string;
  autoRenewal?: boolean;
  owner?: {
    name: string;
    initials: string;
  };
}

interface ProposalsContractsScreenProps {
  onNavigate: (path: string, id?: string) => void;
  onContractClick: (contractId: string) => void;
  onNDAClick?: (ndaId: string) => void;
  currentPath?: string;
  shouldOpenAddDialog?: boolean;
  setShouldOpenAddDialog?: (open: boolean) => void;
}

export function ProposalsContractsScreen({
  onNavigate,
  onContractClick,
  onNDAClick,
  currentPath,
  shouldOpenAddDialog,
  setShouldOpenAddDialog,
}: ProposalsContractsScreenProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isCreateWizardOpen, setIsCreateWizardOpen] = useState(false);
  const [isGenerateProposalDialogOpen, setIsGenerateProposalDialogOpen] = useState(false);
  const [isCreateNDADialogOpen, setIsCreateNDADialogOpen] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  
  // 🎯 NEW: Unified Document Generator
  const [showDocumentGenerator, setShowDocumentGenerator] = useState(false);
  const [documentGeneratorType, setDocumentGeneratorType] = useState<"proposal" | "contract" | "nda">("proposal");

  // Handle opening wizard from submenu navigation
  useEffect(() => {
    if (shouldOpenAddDialog && setShouldOpenAddDialog) {
      const currentUrl = currentPath || window.location.href;
      if (currentUrl.includes("action=add")) {
        setIsCreateWizardOpen(true);
      }
      setShouldOpenAddDialog(false);
    }
  }, [shouldOpenAddDialog, setShouldOpenAddDialog, currentPath]);

  // Mock data - รวม Proposals และ Contracts ที่สอดคล้องกับดีลจริง
  const documents: Document[] = [
    // Proposals จากดีล PRJ-2507 (Bangkok Airways) - Sarah Chen
    {
      id: "QT-2025-0156",
      type: "proposal",
      title: "Air Cargo Management System",
      customer: "Bangkok Airways",
      totalValue: "฿2,100,000",
      status: "approved",
      createdDate: "2025-01-10",
      expiryDate: "2025-02-10",
      createdBy: "Sarah Chen",
      dealId: "PRJ-2507",
      dealName: "Air Cargo Management System",
      template: "Standard Proposal Template",
      owner: { name: "Sarah Chen", initials: "SC" },
    },
    // Proposals จากดีล PRJ-2426 (Thai Airways) - Michael Park
    {
      id: "QT-2025-0142",
      type: "proposal",
      title: "Freight Handling Solutions",
      customer: "Thai Airways",
      totalValue: "฿1,800,000",
      status: "sent",
      createdDate: "2025-01-05",
      expiryDate: "2025-02-05",
      createdBy: "Michael Park",
      dealId: "PRJ-2426",
      dealName: "Freight Handling Solutions",
      template: "Executive Summary Template",
      owner: { name: "Michael Park", initials: "MP" },
    },
    // Proposals จากดีล PRJ-2447 (PTT Energy) - Lisa Thompson
    {
      id: "QT-2025-0178",
      type: "proposal",
      title: "Energy Logistics Network",
      customer: "PTT Energy",
      totalValue: "฿3,500,000",
      status: "approved",
      createdDate: "2025-01-15",
      expiryDate: "2025-02-15",
      createdBy: "Lisa Thompson",
      dealId: "PRJ-2447",
      dealName: "Energy Logistics Network",
      template: "Detailed Technical Proposal",
      owner: { name: "Lisa Thompson", initials: "LT" },
    },
    // Proposals จากดีล PRJ-2402 (Central Food Hall) - Emily Rodriguez
    {
      id: "QT-2025-0089",
      type: "proposal",
      title: "F&B Supply Chain Solution",
      customer: "Central Food Hall",
      totalValue: "฿450,000",
      status: "draft",
      createdDate: "2025-01-03",
      expiryDate: "2025-02-03",
      createdBy: "Emily Rodriguez",
      dealId: "PRJ-2402",
      dealName: "F&B Supply Chain Solution",
      template: "Brief Quotation Format",
      owner: { name: "Emily Rodriguez", initials: "ER" },
    },
    // Proposals จากดีล PRJ-2405 (Siam Cement Group) - Tom Anderson
    {
      id: "QT-2024-0234",
      type: "proposal",
      title: "Industrial Materials Transport",
      customer: "Siam Cement Group",
      totalValue: "฿1,200,000",
      status: "rejected",
      createdDate: "2024-12-28",
      expiryDate: "2025-01-28",
      createdBy: "Tom Anderson",
      dealId: "PRJ-2405",
      dealName: "Industrial Materials Transport",
      template: "Standard Proposal Template",
      owner: { name: "Tom Anderson", initials: "TA" },
    },
    // เพิ่ม Proposals ของทีมอื่นๆ - David Kim
    {
      id: "QT-2025-0167",
      type: "proposal",
      title: "Healthcare Logistics Solution",
      customer: "โรงพยาบาลบำรุงราษฎร์",
      totalValue: "฿980,000",
      status: "sent",
      createdDate: "2025-01-12",
      expiryDate: "2025-02-12",
      createdBy: "David Kim",
      dealId: "PRJ-2450",
      dealName: "Healthcare Logistics Solution",
      template: "Healthcare Standard Template",
      owner: { name: "David Kim", initials: "DK" },
    },
    // Proposals - ทีม Jessica Wong
    {
      id: "QT-2025-0145",
      type: "proposal",
      title: "E-commerce Fulfillment System",
      customer: "Lazada Thailand",
      totalValue: "฿2,800,000",
      status: "approved",
      createdDate: "2025-01-08",
      expiryDate: "2025-02-08",
      createdBy: "Jessica Wong",
      dealId: "PRJ-2443",
      dealName: "E-commerce Fulfillment System",
      template: "Tech Solution Template",
      owner: { name: "Jessica Wong", initials: "JW" },
    },
    // Proposals - ทีม Robert Martinez
    {
      id: "QT-2024-0289",
      type: "proposal",
      title: "Cold Chain Distribution",
      customer: "CP Foods",
      totalValue: "฿1,650,000",
      status: "draft",
      createdDate: "2024-12-30",
      expiryDate: "2025-01-30",
      createdBy: "Robert Martinez",
      dealId: "PRJ-2410",
      dealName: "Cold Chain Distribution",
      template: "Food & Beverage Template",
      owner: { name: "Robert Martinez", initials: "RM" },
    },
    // Contracts - สัญญาที่ลงนามแล้ว
    {
      id: "CNT-2024-4920",
      type: "contract",
      title: "Air Freight Services Agreement",
      customer: "Global Freight Solutions",
      totalValue: "$2.73M",
      status: "signed",
      createdDate: "2024-11-15",
      startDate: "2024-12-01",
      endDate: "2025-11-30",
      createdBy: "Sarah Chen",
      utilization: 65,
      businessUnit: "HCP",
      paymentTerms: "Net 30",
      autoRenewal: true,
      owner: { name: "Sarah Chen", initials: "SC" },
    },
    {
      id: "CNT-2024-4855",
      type: "contract",
      title: "Manufacturing Logistics Contract",
      customer: "Siam Cement Group",
      totalValue: "$1.2M",
      status: "active",
      createdDate: "2024-10-20",
      startDate: "2024-11-15",
      endDate: "2025-11-14",
      createdBy: "Tom Anderson",
      utilization: 78,
      businessUnit: "Manufacturing",
      paymentTerms: "Net 60",
      autoRenewal: false,
      owner: { name: "Tom Anderson", initials: "TA" },
    },
    {
      id: "CNT-2024-4782",
      type: "contract",
      title: "Food Distribution Services",
      customer: "Central Food Hall",
      totalValue: "$450K",
      status: "active",
      createdDate: "2024-09-10",
      startDate: "2024-10-01",
      endDate: "2025-09-30",
      createdBy: "Emily Rodriguez",
      utilization: 55,
      businessUnit: "F&B",
      paymentTerms: "Net 30",
      autoRenewal: true,
      owner: { name: "Emily Rodriguez", initials: "ER" },
    },
    {
      id: "CNT-2024-4623",
      type: "contract",
      title: "Energy Supply Chain Management",
      customer: "PTT Energy",
      totalValue: "$3.5M",
      status: "pending",
      createdDate: "2024-12-01",
      startDate: "2025-01-01",
      endDate: "2026-12-31",
      createdBy: "Lisa Thompson",
      utilization: 0,
      businessUnit: "Energy",
      paymentTerms: "Net 45",
      autoRenewal: true,
      owner: { name: "Lisa Thompson", initials: "LT" },
    },
    {
      id: "CNT-2023-3891",
      type: "contract",
      title: "Retail Logistics Network",
      customer: "Tops Market",
      totalValue: "$320K",
      status: "expired",
      createdDate: "2023-08-15",
      startDate: "2023-09-01",
      endDate: "2024-08-31",
      createdBy: "James Wilson",
      utilization: 100,
      businessUnit: "Retail",
      paymentTerms: "Net 30",
      autoRenewal: false,
      owner: { name: "James Wilson", initials: "JW" },
    },
    {
      id: "CNT-2024-4701",
      type: "contract",
      title: "Aviation Cargo Services",
      customer: "Bangkok Airways",
      totalValue: "$2.1M",
      status: "active",
      createdDate: "2024-10-15",
      startDate: "2024-11-01",
      endDate: "2025-10-31",
      createdBy: "Sarah Chen",
      utilization: 42,
      businessUnit: "HCP",
      paymentTerms: "Net 30",
      autoRenewal: true,
      owner: { name: "Sarah Chen", initials: "SC" },
    },
    // เพิ่ม Contracts ของทีมอื่นๆ
    {
      id: "CNT-2024-4836",
      type: "contract",
      title: "Pharmaceutical Cold Chain",
      customer: "โรงพยาบาลบำรุงราษฎร์",
      totalValue: "$890K",
      status: "active",
      createdDate: "2024-11-05",
      startDate: "2024-12-01",
      endDate: "2025-11-30",
      createdBy: "David Kim",
      utilization: 68,
      businessUnit: "Healthcare",
      paymentTerms: "Net 30",
      autoRenewal: true,
      owner: { name: "David Kim", initials: "DK" },
    },
    {
      id: "CNT-2024-4912",
      type: "contract",
      title: "E-commerce Logistics Network",
      customer: "Lazada Thailand",
      totalValue: "$2.6M",
      status: "signed",
      createdDate: "2024-12-10",
      startDate: "2025-01-15",
      endDate: "2026-01-14",
      createdBy: "Jessica Wong",
      utilization: 0,
      businessUnit: "E-commerce",
      paymentTerms: "Net 45",
      autoRenewal: true,
      owner: { name: "Jessica Wong", initials: "JW" },
    },
    {
      id: "CNT-2024-4745",
      type: "contract",
      title: "Food Processing Distribution",
      customer: "CP Foods",
      totalValue: "$1.5M",
      status: "active",
      createdDate: "2024-09-25",
      startDate: "2024-10-15",
      endDate: "2025-10-14",
      createdBy: "Robert Martinez",
      utilization: 72,
      businessUnit: "F&B",
      paymentTerms: "Net 30",
      autoRenewal: false,
      owner: { name: "Robert Martinez", initials: "RM" },
    },
    // NDA Documents
    {
      id: "NDA-2025-003",
      type: "nda",
      title: "Supply Chain Platform Development NDA",
      customer: "บริษัท ไทยเทคโนโลยี อินโนเวชั่น จำกัด (มหาชน)",
      totalValue: "-",
      status: "signed",
      createdDate: "2025-02-19",
      startDate: "2025-03-01",
      endDate: "2028-03-01",
      createdBy: "Sarah Chen",
      template: "Mutual NDA Template",
      owner: { name: "Sarah Chen", initials: "SC" },
    },
    {
      id: "NDA-2025-002",
      type: "nda",
      title: "Strategic Partnership NDA",
      customer: "PTT Energy",
      totalValue: "-",
      status: "active",
      createdDate: "2025-02-10",
      startDate: "2025-02-15",
      endDate: "2028-02-15",
      createdBy: "Lisa Thompson",
      template: "Standard NDA Template",
      owner: { name: "Lisa Thompson", initials: "LT" },
    },
    {
      id: "NDA-2025-001",
      type: "nda",
      title: "Technology Collaboration NDA",
      customer: "Lazada Thailand",
      totalValue: "-",
      status: "draft",
      createdDate: "2025-02-05",
      createdBy: "Jessica Wong",
      template: "Unilateral NDA Template",
      owner: { name: "Jessica Wong", initials: "JW" },
    },
    {
      id: "NDA-2024-089",
      type: "nda",
      title: "Healthcare Data Sharing Agreement",
      customer: "โรงพยาบาลบำรุงราษฎร์",
      totalValue: "-",
      status: "active",
      createdDate: "2024-12-15",
      startDate: "2025-01-01",
      endDate: "2027-01-01",
      createdBy: "David Kim",
      template: "Mutual NDA Template",
      owner: { name: "David Kim", initials: "DK" },
    },
    {
      id: "NDA-2024-078",
      type: "nda",
      title: "Vendor Partnership NDA",
      customer: "Bangkok Airways",
      totalValue: "-",
      status: "pending",
      createdDate: "2024-11-20",
      createdBy: "Sarah Chen",
      template: "Vendor NDA Template",
      owner: { name: "Sarah Chen", initials: "SC" },
    },
  ];

  const getStatusBadge = (status: DocumentStatus, type: DocumentType) => {
    const statusConfig: Record<DocumentStatus, { label: string; className: string; icon: JSX.Element }> = {
      draft: {
        label: "ฉบับร่าง",
        className: "bg-gray-100 text-gray-800 border-gray-300",
        icon: <Clock className="w-3 h-3 mr-1" />,
      },
      sent: {
        label: "ส่งแล้ว",
        className: "bg-blue-100 text-blue-800 border-blue-300",
        icon: <Mail className="w-3 h-3 mr-1" />,
      },
      approved: {
        label: "อนุมัติแล้ว",
        className: "bg-green-100 text-green-800 border-green-300",
        icon: <CheckCircle2 className="w-3 h-3 mr-1" />,
      },
      rejected: {
        label: "ปฏิเสธ",
        className: "bg-red-100 text-red-800 border-red-300",
        icon: <XCircle className="w-3 h-3 mr-1" />,
      },
      expired: {
        label: "หมดอายุ",
        className: "bg-orange-100 text-orange-800 border-orange-300",
        icon: <Clock className="w-3 h-3 mr-1" />,
      },
      active: {
        label: "ใช้งานอยู่",
        className: "bg-green-100 text-green-800 border-green-300",
        icon: <CheckCircle2 className="w-3 h-3 mr-1" />,
      },
      pending: {
        label: "รอดำเนินการ",
        className: "bg-yellow-100 text-yellow-800 border-yellow-300",
        icon: <Clock className="w-3 h-3 mr-1" />,
      },
      signed: {
        label: "ลงนามแล้ว",
        className: "bg-blue-100 text-blue-800 border-blue-300",
        icon: <CheckCircle2 className="w-3 h-3 mr-1" />,
      },
    };

    const config = statusConfig[status];
    return (
      <Badge className={`flex items-center ${config.className}`}>
        {config.icon}
        {config.label}
      </Badge>
    );
  };

  const getTypeBadge = (type: DocumentType) => {
    const typeConfig = {
      proposal: {
        label: "ข้อเสนอ",
        className: "bg-purple-100 text-purple-800 border-purple-300",
      },
      contract: {
        label: "สัญญา",
        className: "bg-indigo-100 text-indigo-800 border-indigo-300",
      },
      nda: {
        label: "NDA",
        className: "bg-red-100 text-red-800 border-red-300",
      },
    };

    const config = typeConfig[type];
    return (
      <Badge className={`${config.className} text-xs`}>
        {config.label}
      </Badge>
    );
  };

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === "all" || doc.type === typeFilter;
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: documents.length,
    proposals: documents.filter((d) => d.type === "proposal").length,
    contracts: documents.filter((d) => d.type === "contract").length,
    nda: documents.filter((d) => d.type === "nda").length,
    active: documents.filter((d) => d.status === "active" || d.status === "approved").length,
  };

  return (
    <div className="p-2 sm:p-3 lg:p-4 bg-gray-50 min-h-screen">
      <div className="max-w-[1600px] mx-auto space-y-2 sm:space-y-3">

        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">ข้อเสนอและสัญญา</h1>
            <p className="text-[10px] sm:text-xs text-gray-500">จัดการเอกสารข้อเสนอและสัญญาทั้งหมด</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-3 border-[#7BC9A6] text-[#7BC9A6] hover:bg-[#7BC9A6]/10 text-sm font-medium rounded-full"
              onClick={() => setShowUploadDialog(true)}
            >
              <Upload className="h-4 w-4 mr-1.5" />
              <span className="hidden sm:inline">อัปโหลดเอกสาร</span>
              <span className="sm:hidden">อัปโหลด</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="h-9 px-4 bg-green-600 hover:bg-green-700 text-white shadow-sm text-sm font-medium rounded-full">
                  <Plus className="h-4 w-4 mr-1.5" />
                  สร้างเอกสาร
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => {
                  onNavigate("/proposal-builder");
                }}>
                  <FileText className="h-4 w-4 mr-2" />
                  สร้างข้อเสนอ
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  setDocumentGeneratorType("contract");
                  setShowDocumentGenerator(true);
                }}>
                  <FileText className="h-4 w-4 mr-2" />
                  สร้างสัญญา
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  setDocumentGeneratorType("nda");
                  setShowDocumentGenerator(true);
                }}>
                  <FileText className="h-4 w-4 mr-2" />
                  สร้างเอกสาร NDA
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Stats */}
        {filteredDocuments.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
            <div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-2.5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] font-medium text-gray-500 uppercase tracking-wide truncate">เอกสารทั้งหมด</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-900 mt-0.5">{stats.total}</p>
                </div>
                <div className="h-7 w-7 sm:h-8 sm:w-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-2.5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] font-medium text-gray-500 uppercase tracking-wide truncate">ข้อเสนอ</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-900 mt-0.5">{stats.proposals}</p>
                </div>
                <div className="h-7 w-7 sm:h-8 sm:w-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-2.5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] font-medium text-gray-500 uppercase tracking-wide truncate">สัญญา</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-900 mt-0.5">{stats.contracts}</p>
                </div>
                <div className="h-7 w-7 sm:h-8 sm:w-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-indigo-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-2.5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] font-medium text-gray-500 uppercase tracking-wide truncate">NDA</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-900 mt-0.5">{stats.nda}</p>
                </div>
                <div className="h-7 w-7 sm:h-8 sm:w-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-2.5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] font-medium text-gray-500 uppercase tracking-wide truncate">ใช้งานอยู่</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-900 mt-0.5">{stats.active}</p>
                </div>
                <div className="h-7 w-7 sm:h-8 sm:w-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="flex items-center gap-1.5">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="ค้นหา..."
              className="pl-10 pr-4 h-9 text-xs border-gray-300 bg-white rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="h-8 w-[90px] px-2 text-xs border-gray-300 bg-white gap-1 rounded-lg">
              <Filter className="h-3 w-3 text-gray-600 flex-shrink-0" />
              <span className="truncate text-[10px]">ประเภท</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทั้งหมด</SelectItem>
              <SelectItem value="proposal">ข้อเสนอ</SelectItem>
              <SelectItem value="contract">สัญญา</SelectItem>
              <SelectItem value="nda">NDA</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-8 w-[90px] px-2 text-xs border-gray-300 bg-white gap-1 rounded-lg">
              <Filter className="h-3 w-3 text-gray-600 flex-shrink-0" />
              <span className="truncate text-[10px]">สถานะ</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทุกสถานะ</SelectItem>
              <SelectItem value="draft">ฉบับร่าง</SelectItem>
              <SelectItem value="sent">ส่งแล้ว</SelectItem>
              <SelectItem value="approved">อนุมัติแล้ว</SelectItem>
              <SelectItem value="active">ใช้งานอยู่</SelectItem>
              <SelectItem value="pending">รอดำเนินการ</SelectItem>
              <SelectItem value="expired">หมดอายุ</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Desktop Table View */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hidden lg:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-3 py-2 text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                    ลูกค้า
                  </th>
                  <th className="text-left px-3 py-2 text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                    ประเภท
                  </th>
                  <th className="text-left px-3 py-2 text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                    เอกสาร
                  </th>
                  <th className="text-left px-3 py-2 text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                    สถานะ
                  </th>
                  <th className="text-right px-3 py-2 text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                    มูลค่า
                  </th>
                  <th className="text-center px-3 py-2 text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                    วันที่
                  </th>
                  <th className="text-left px-3 py-2 text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                    เจ้าของ
                  </th>
                  <th className="text-right px-3 py-2 text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                    
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDocuments.map((doc) => (
                  <tr
                    key={doc.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer group"
                    onClick={() => {
                      if (doc.type === "proposal") {
                        onNavigate("/proposal-detail", doc.id);
                      } else if (doc.type === "contract") {
                        onNavigate("/contract-editor", doc.id);
                      } else if (doc.type === "nda" && onNDAClick) {
                        onNDAClick(doc.id);
                      }
                    }}
                  >
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1">
                        <Building2 className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-900 truncate max-w-[150px]">{doc.customer}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      {getTypeBadge(doc.type)}
                    </td>
                    <td className="px-3 py-2.5">
                      <div>
                        <p className="text-xs font-medium text-gray-900 truncate max-w-[200px]">{doc.title}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">{doc.id}</p>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      {getStatusBadge(doc.status, doc.type)}
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <span className="text-xs font-semibold text-[#7BC9A6]">
                        {doc.totalValue}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-600">
                          {doc.type === "contract" && doc.startDate
                            ? doc.startDate
                            : doc.createdDate}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      {doc.owner && (
                        <div className="flex items-center gap-1.5">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-[#7BC9A6] text-white text-[9px]">
                              {doc.owner.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-gray-700 truncate max-w-[100px]">{doc.owner.name}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-7 px-2 text-[10px] font-medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (doc.type === "proposal") {
                            onNavigate("/proposal-detail", doc.id);
                          } else if (doc.type === "contract") {
                            onNavigate("/contract-editor", doc.id);
                          } else if (doc.type === "nda" && onNDAClick) {
                            onNDAClick(doc.id);
                          }
                        }}
                      >
                        ดูรายละเอียด
                        <ChevronRight className="h-3 w-3 ml-0.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-2">
          {filteredDocuments.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                <p className="text-gray-500">ไม่พบเอกสารที่ค้นหา</p>
              </CardContent>
            </Card>
          ) : (
            filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-lg border border-gray-200 p-2.5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => {
                  if (doc.type === "proposal") {
                    onNavigate("/proposal-detail", doc.id);
                  } else if (doc.type === "contract") {
                    onNavigate("/contract-editor", doc.id);
                  } else if (doc.type === "nda" && onNDAClick) {
                    onNDAClick(doc.id);
                  }
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-1.5">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {getTypeBadge(doc.type)}
                      <span className="text-[10px] text-gray-500">{doc.id}</span>
                    </div>
                    <h3 className="text-xs font-medium text-gray-900 truncate">{doc.title}</h3>
                  </div>
                </div>

                {/* Status */}
                <div className="mb-2">
                  {getStatusBadge(doc.status, doc.type)}
                </div>

                {/* Customer & Value */}
                <div className="mb-1.5 pb-1.5 border-b border-gray-100">
                  <div className="flex items-center gap-1 mb-1">
                    <Building2 className="h-3 w-3 text-gray-400" />
                    <p className="text-[10px] font-medium text-gray-700 truncate">{doc.customer}</p>
                  </div>
                  <p className="text-xs font-bold text-[#7BC9A6]">{doc.totalValue}</p>
                </div>

                {/* Date & Owner */}
                <div className="flex items-center justify-between pt-1.5">
                  <div className="flex items-center gap-1 text-[10px] text-gray-600">
                    <Calendar className="h-3 w-3 text-gray-400" />
                    <span>
                      {doc.type === "contract" && doc.startDate
                        ? doc.startDate
                        : doc.createdDate}
                    </span>
                  </div>
                  {doc.owner && (
                    <div className="flex items-center gap-1">
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="bg-[#7BC9A6] text-white text-[8px]">
                          {doc.owner.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-[10px] text-gray-700">{doc.owner.name}</span>
                    </div>
                  )}
                </div>

                {/* Contract Utilization Bar */}
                {doc.type === "contract" && doc.utilization !== undefined && (
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <div className="flex items-center justify-between text-[10px] text-gray-600 mb-1">
                      <span>การใช้งาน</span>
                      <span className="font-medium">{doc.utilization}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#7BC9A6] rounded-full transition-all"
                        style={{ width: `${doc.utilization}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <div className="flex justify-end mt-2 pt-2 border-t border-gray-100">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-6 px-1.5 text-[10px]"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (doc.type === "proposal") {
                        onNavigate("/proposal-detail", doc.id);
                      } else if (doc.type === "contract") {
                        onNavigate("/contract-editor", doc.id);
                      } else if (doc.type === "nda" && onNDAClick) {
                        onNDAClick(doc.id);
                      }
                    }}
                  >
                    ดูรายละเอียด
                    <ChevronRight className="h-2.5 w-2.5 ml-0.5" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Empty State */}
        {filteredDocuments.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">
              ไม่พบเอกสาร
            </h3>
            <p className="text-sm text-gray-500 text-center">
              ลองเปลี่ยนตัวกรองหรือคำค้นหา
            </p>
          </div>
        )}

        {/* Create Contract Wizard */}
        <CreateContractWizard
          isOpen={isCreateWizardOpen}
          onClose={() => setIsCreateWizardOpen(false)}
        />

        {/* Generate Proposal Dialog */}
        <GenerateProposalDialog
          open={isGenerateProposalDialogOpen}
          onClose={() => setIsGenerateProposalDialogOpen(false)}
          onGenerate={(proposalData) => {
            console.log("Generating proposal:", proposalData);
            setIsGenerateProposalDialogOpen(false);
            // TODO: Navigate to proposal editor or preview
          }}
        />

        {/* Create NDA Dialog */}
        <CreateNDADialog
          open={isCreateNDADialogOpen}
          onClose={() => setIsCreateNDADialogOpen(false)}
          onGenerate={(ndaData) => {
            console.log("Generating NDA:", ndaData);
            setIsCreateNDADialogOpen(false);
            // TODO: Navigate to NDA editor or preview
          }}
        />

        {/* Document Generator Modal */}
        <DocumentGeneratorModal
          isOpen={showDocumentGenerator}
          onClose={() => setShowDocumentGenerator(false)}
          documentType={documentGeneratorType}
          onGenerate={(documentData) => {
            console.log("Generating document:", documentData);
            setShowDocumentGenerator(false);
            // TODO: Navigate to document editor or preview
          }}
        />

        {/* Upload External Document Dialog */}
        <UploadExternalDocumentDialog
          isOpen={showUploadDialog}
          onClose={() => setShowUploadDialog(false)}
          documentType="proposal"
          onSave={(data) => {
            console.log("Uploaded external document:", data);
            // TODO: Save external document to backend
          }}
        />
      </div>
    </div>
  );
}