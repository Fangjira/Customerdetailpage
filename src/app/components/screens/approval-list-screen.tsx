import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "../ui/dropdown-menu";
import {
  Search,
  Filter,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  DollarSign,
  Calendar,
  History,
  ChevronDown,
  Download,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  Eye,
  ChevronLeft,
  ChevronRight,
  GitBranch,
  Building2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { HistoryDialog } from "../history-dialog";
import { ApprovalFlowDialog } from "../approval-flow-dialog";

interface ApprovalListScreenProps {
  onApprovalClick: (approvalId: string) => void;
}

export function ApprovalListScreen({ onApprovalClick }: ApprovalListScreenProps) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<string[]>([]);
  const [filterPriority, setFilterPriority] = useState<string[]>([]);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [selectedApprovals, setSelectedApprovals] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"date" | "value" | "priority" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [flowDialogOpen, setFlowDialogOpen] = useState(false);
  const [selectedApprovalForFlow, setSelectedApprovalForFlow] = useState<any>(null);

  // Mock data - เฉพาะรายการที่รอหัวหน้าอนุมัติ (currentStage = Sales Manager หรือ Finance Review หรือ Final Approval)
  const approvals = [
    {
      id: "APR-2024-1205",
      type: "Contract",
      title: "International Freight Agreement - Global Freight Solutions",
      customer: "Global Freight Solutions Inc.",
      contactPerson: "Sarah Chen",
      totalValue: 2450000,
      businessUnit: "Air Freight",
      submittedBy: "Sarah Chen",
      submittedDate: "2024-12-15",
      currentStage: "Finance Review",
      status: "Pending Approval",
      priority: "High",
      daysOpen: 3,
      progress: 65,
    },
    {
      id: "APR-2024-1198",
      type: "Quotation",
      title: "Warehousing Services - Pacific Trade Corp",
      customer: "Pacific Trade Corp",
      contactPerson: "Michael Park",
      totalValue: 185000,
      businessUnit: "Warehousing",
      submittedBy: "Michael Park",
      submittedDate: "2024-12-10",
      currentStage: "Final Approval",
      status: "Pending Approval",
      priority: "Medium",
      daysOpen: 8,
      progress: 76,
    },
    {
      id: "APR-2024-1182",
      type: "Contract",
      title: "Multi-Modal Transport - Tech Innovations Ltd",
      customer: "Tech Innovations Ltd",
      contactPerson: "Lisa Anderson",
      totalValue: 780000,
      businessUnit: "Multi-Modal",
      submittedBy: "Lisa Anderson",
      submittedDate: "2024-11-28",
      currentStage: "Sales Manager",
      status: "Pending Approval",
      priority: "Medium",
      daysOpen: 20,
      progress: 74,
    },
    {
      id: "APR-2024-1165",
      type: "Contract",
      title: "Expedited Shipping - North American Traders",
      customer: "North American Traders",
      contactPerson: "Maria Garcia",
      totalValue: 520000,
      businessUnit: "Express",
      submittedBy: "Maria Garcia",
      submittedDate: "2024-11-20",
      currentStage: "Finance Review",
      status: "Pending Approval",
      priority: "High",
      daysOpen: 28,
      progress: 83,
    },
    {
      id: "APR-2024-1156",
      type: "Quotation",
      title: "Cold Chain Logistics - Fresh Foods Inc",
      customer: "Fresh Foods Inc",
      contactPerson: "David Kim",
      totalValue: 320000,
      businessUnit: "Cold Chain",
      submittedBy: "David Kim",
      submittedDate: "2024-11-18",
      currentStage: "Sales Manager",
      status: "Pending Approval",
      priority: "High",
      daysOpen: 30,
      progress: 45,
    },
  ];

  // Filter and sort approvals
  let filteredApprovals = approvals.filter((approval) => {
    const matchesSearch =
      approval.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      approval.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      approval.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus.length === 0 || filterStatus.includes(approval.status);
    const matchesType = filterType.length === 0 || filterType.includes(approval.type);
    const matchesPriority = filterPriority.length === 0 || filterPriority.includes(approval.priority);
    
    return matchesSearch && matchesStatus && matchesType && matchesPriority;
  });

  // Apply sorting
  if (sortBy) {
    filteredApprovals = [...filteredApprovals].sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === "date") {
        comparison = new Date(a.submittedDate).getTime() - new Date(b.submittedDate).getTime();
      } else if (sortBy === "value") {
        comparison = a.totalValue - b.totalValue;
      } else if (sortBy === "priority") {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        comparison = priorityOrder[a.priority as keyof typeof priorityOrder] - 
                    priorityOrder[b.priority as keyof typeof priorityOrder];
      }
      
      return sortOrder === "asc" ? comparison : -comparison;
    });
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending Approval":
        return (
          <Badge className="bg-[#fef3c7] text-[#92400e] border-[#fcd34d] hover:bg-[#fde68a]">
            {t("pending")}
          </Badge>
        );
      case "Approved":
        return (
          <Badge className="bg-[#dcfce7] text-[#166534] border-[#86efac] hover:bg-[#bbf7d0]">
            {t("approved")}
          </Badge>
        );
      case "Rejected":
        return (
          <Badge className="bg-[#fee2e2] text-[#991b1b] border-[#fca5a5] hover:bg-[#fecaca]">
            {t("rejected")}
          </Badge>
        );
      default:
        return (
          <Badge className="bg-[#f3f4f6] text-[#6b7280] border-[#d1d5db]">
            {status}
          </Badge>
        );
    }
  };

  const getTypeBadge = (type: string) => {
    if (type === "Contract") {
      return (
        <span className="text-sm text-gray-700">
          {t("approvals.contract")}
        </span>
      );
    }
    return (
      <span className="text-sm text-gray-700">
        {t("approvals.quotation")}
      </span>
    );
  };

  const stats = {
    total: approvals.length,
    pending: approvals.filter((a) => a.status === "Pending Approval").length,
    approved: approvals.filter((a) => a.status === "Approved").length,
    rejected: approvals.filter((a) => a.status === "Rejected").length,
  };

  const toggleApprovalSelection = (id: string) => {
    setSelectedApprovals(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedApprovals.length === paginatedApprovals.length) {
      setSelectedApprovals([]);
    } else {
      setSelectedApprovals(paginatedApprovals.map(a => a.id));
    }
  };

  const handleExport = () => {
    const csvData = filteredApprovals.map(a => ({
      ID: a.id,
      Type: a.type,
      Title: a.title,
      Customer: a.customer,
      Value: `$${a.totalValue.toLocaleString()}`,
      Status: a.status,
      Priority: a.priority,
      Date: a.submittedDate,
      Stage: a.currentStage,
    }));
    
    const csv = [
      Object.keys(csvData[0]).join(","),
      ...csvData.map(row => Object.values(row).join(","))
    ].join("\n");
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `approvals-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const clearAllFilters = () => {
    setFilterStatus([]);
    setFilterType([]);
    setFilterPriority([]);
    setSearchTerm("");
    setSortBy(null);
  };

  const hasActiveFilters = filterStatus.length > 0 || filterType.length > 0 || 
                          filterPriority.length > 0 || searchTerm !== "" || sortBy !== null;

  // Pagination
  const totalPages = Math.ceil(filteredApprovals.length / itemsPerPage);
  const paginatedApprovals = filteredApprovals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Generate approval flow steps based on approval data
  const getApprovalSteps = (approval: any) => {
    const baseSteps = [
      {
        id: "1",
        stage: t("approvals.submitted"),
        approver: approval.submittedBy,
        status: "completed" as const,
        date: approval.submittedDate,
        comment: undefined,
      },
      {
        id: "2",
        stage: t("approvals.sales_manager"),
        approver: "Sales Manager",
        status: approval.currentStage === "Sales Manager" ? "current" as const : 
                approval.status === "Rejected" && approval.currentStage === "Sales Manager" ? "rejected" as const :
                "completed" as const,
        date: approval.currentStage === "Sales Manager" ? undefined : "2024-12-16",
        comment: approval.status === "Rejected" && approval.currentStage === "Sales Manager" ? 
                 "Pricing not competitive enough" : undefined,
      },
      {
        id: "3",
        stage: t("approvals.finance_review"),
        approver: "Finance Manager",
        status: approval.currentStage === "Finance Review" ? "current" as const :
                approval.currentStage === "Completed" || approval.currentStage === "Legal Compliance" || 
                approval.currentStage === "Final Approval" ? "completed" as const : "pending" as const,
        date: approval.currentStage === "Completed" || approval.currentStage === "Legal Compliance" || 
              approval.currentStage === "Final Approval" ? "2024-12-17" : undefined,
      },
      {
        id: "4",
        stage: t("approvals.legal_compliance"),
        approver: "Legal Team",
        status: approval.currentStage === "Legal Compliance" ? "current" as const :
                approval.currentStage === "Completed" || approval.currentStage === "Final Approval" ? "completed" as const : 
                "pending" as const,
        date: approval.currentStage === "Completed" || approval.currentStage === "Final Approval" ? 
              "2024-12-18" : undefined,
      },
      {
        id: "5",
        stage: t("approvals.final_approval"),
        approver: "CEO",
        status: approval.currentStage === "Final Approval" ? "current" as const :
                approval.currentStage === "Completed" ? "completed" as const : "pending" as const,
        date: approval.currentStage === "Completed" ? "2024-12-19" : undefined,
      },
    ];

    return baseSteps;
  };

  const handleShowFlow = (approval: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedApprovalForFlow(approval);
    setFlowDialogOpen(true);
  };

  return (
    <div className="p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            {t("approvals.all_approvals")}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            {t("approvals.subtitle")}
          </p>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsHistoryDialogOpen(true)}
            className="h-9 w-9 flex-shrink-0"
          >
            <History className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={handleExport}
            className="h-9 gap-1.5 text-sm"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-2.5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-[9px] sm:text-[10px] font-medium text-gray-500 uppercase tracking-wide truncate">
                ทั้งหมด
              </p>
              <p className="text-lg sm:text-xl font-bold text-gray-900 mt-0.5">
                {stats.total}
              </p>
            </div>
            <div className="h-7 w-7 sm:h-8 sm:w-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-2.5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-[9px] sm:text-[10px] font-medium text-gray-500 uppercase tracking-wide truncate">
                รอดำเนินการ
              </p>
              <p className="text-lg sm:text-xl font-bold text-gray-900 mt-0.5">
                {stats.pending}
              </p>
            </div>
            <div className="h-7 w-7 sm:h-8 sm:w-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-2.5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-[9px] sm:text-[10px] font-medium text-gray-500 uppercase tracking-wide truncate">
                อนุมัติ
              </p>
              <p className="text-lg sm:text-xl font-bold text-gray-900 mt-0.5">
                {stats.approved}
              </p>
            </div>
            <div className="h-7 w-7 sm:h-8 sm:w-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-2.5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-[9px] sm:text-[10px] font-medium text-gray-500 uppercase tracking-wide truncate">
                ปฏิเสธ
              </p>
              <p className="text-lg sm:text-xl font-bold text-gray-900 mt-0.5">
                {stats.rejected}
              </p>
            </div>
            <div className="h-7 w-7 sm:h-8 sm:w-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <XCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap items-center gap-1.5">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={t("common.search")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-10 text-sm border-gray-300 bg-white rounded-lg"
          />
        </div>
        
        {/* Status Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-10 gap-1.5 text-sm border-gray-300 bg-white rounded-lg">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">{t("approvals.status")}</span>
              {filterStatus.length > 0 && (
                <Badge className="ml-1 bg-[#7BC9A6] text-white h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {filterStatus.length}
                </Badge>
              )}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuCheckboxItem
              checked={filterStatus.includes("Pending Approval")}
              onCheckedChange={(checked) => {
                setFilterStatus(prev =>
                  checked ? [...prev, "Pending Approval"] : prev.filter(s => s !== "Pending Approval")
                );
              }}
            >
              {t("status.pending")}
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filterStatus.includes("Approved")}
              onCheckedChange={(checked) => {
                setFilterStatus(prev =>
                  checked ? [...prev, "Approved"] : prev.filter(s => s !== "Approved")
                );
              }}
            >
              {t("status.approved")}
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filterStatus.includes("Rejected")}
              onCheckedChange={(checked) => {
                setFilterStatus(prev =>
                  checked ? [...prev, "Rejected"] : prev.filter(s => s !== "Rejected")
                );
              }}
            >
              {t("status.rejected")}
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Type Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-10 gap-1.5 text-sm border-gray-300 bg-white rounded-lg">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">{t("approvals.type")}</span>
              {filterType.length > 0 && (
                <Badge className="ml-1 bg-[#7BC9A6] text-white h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {filterType.length}
                </Badge>
              )}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuCheckboxItem
              checked={filterType.includes("Contract")}
              onCheckedChange={(checked) => {
                setFilterType(prev =>
                  checked ? [...prev, "Contract"] : prev.filter(t => t !== "Contract")
                );
              }}
            >
              {t("approvals.contract")}
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filterType.includes("Quotation")}
              onCheckedChange={(checked) => {
                setFilterType(prev =>
                  checked ? [...prev, "Quotation"] : prev.filter(t => t !== "Quotation")
                );
              }}
            >
              {t("approvals.quotation")}
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Priority Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-10 gap-1.5 text-sm border-gray-300 bg-white rounded-lg">
              <AlertCircle className="h-4 w-4" />
              <span className="hidden sm:inline">{t("approvals.priority")}</span>
              {filterPriority.length > 0 && (
                <Badge className="ml-1 bg-[#7BC9A6] text-white h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {filterPriority.length}
                </Badge>
              )}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuCheckboxItem
              checked={filterPriority.includes("High")}
              onCheckedChange={(checked) => {
                setFilterPriority(prev =>
                  checked ? [...prev, "High"] : prev.filter(p => p !== "High")
                );
              }}
            >
              {t("approvals.high_priority")}
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filterPriority.includes("Medium")}
              onCheckedChange={(checked) => {
                setFilterPriority(prev =>
                  checked ? [...prev, "Medium"] : prev.filter(p => p !== "Medium")
                );
              }}
            >
              {t("approvals.medium_priority")}
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filterPriority.includes("Low")}
              onCheckedChange={(checked) => {
                setFilterPriority(prev =>
                  checked ? [...prev, "Low"] : prev.filter(p => p !== "Low")
                );
              }}
            >
              {t("approvals.low_priority")}
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Sort Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-10 gap-1.5 text-sm border-gray-300 bg-white rounded-lg">
              <ArrowUpDown className="h-4 w-4" />
              <span className="hidden sm:inline">{t("approvals.sort")}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => {
              setSortBy("date");
              setSortOrder(sortBy === "date" && sortOrder === "desc" ? "asc" : "desc");
            }}>
              <Calendar className="h-4 w-4 mr-2" />
              {t("approvals.sort_by_date")}
              {sortBy === "date" && (
                sortOrder === "desc" ? <ArrowDown className="h-4 w-4 ml-auto" /> : <ArrowUp className="h-4 w-4 ml-auto" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              setSortBy("value");
              setSortOrder(sortBy === "value" && sortOrder === "desc" ? "asc" : "desc");
            }}>
              <DollarSign className="h-4 w-4 mr-2" />
              {t("approvals.sort_by_value")}
              {sortBy === "value" && (
                sortOrder === "desc" ? <ArrowDown className="h-4 w-4 ml-auto" /> : <ArrowUp className="h-4 w-4 ml-auto" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              setSortBy("priority");
              setSortOrder(sortBy === "priority" && sortOrder === "desc" ? "asc" : "desc");
            }}>
              <AlertCircle className="h-4 w-4 mr-2" />
              {t("approvals.sort_by_priority")}
              {sortBy === "priority" && (
                sortOrder === "desc" ? <ArrowDown className="h-4 w-4 ml-auto" /> : <ArrowUp className="h-4 w-4 ml-auto" />
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={clearAllFilters}
            className="h-10 text-sm text-gray-600 hover:text-gray-900"
          >
            ล้าง
          </Button>
        )}
      </div>

      {/* Approval List - Horizontal Cards (Desktop) + Compact Cards (Mobile) */}
      <div className="space-y-2.5">
        {paginatedApprovals.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-900">ไม่พบเอกสารรออนุมัติ</p>
              <p className="text-sm text-gray-500 mt-1">ลองปรับเปลี่ยนตัวกรอง</p>
            </CardContent>
          </Card>
        ) : (
          paginatedApprovals.map((approval) => (
            <Card 
              key={approval.id} 
              className="border border-gray-200 hover:shadow-md transition-all overflow-hidden"
            >
              <CardContent className="p-3 sm:p-3.5">
                {/* Mobile Layout */}
                <div className="lg:hidden">
                  <div 
                    className="cursor-pointer"
                    onClick={() => onApprovalClick(approval.id)}
                  >
                    {/* Header: ID + Priority Badge */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-semibold text-gray-500">{approval.id}</span>
                      <Badge className={`text-[10px] font-medium px-1.5 py-0.5 ${
                        approval.priority === "High" 
                          ? "bg-orange-50 text-orange-700 border border-orange-200" 
                          : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                      }`}>
                        {approval.priority === "High" ? "⚠️ ด่วน" : "⏱️ ปานกลาง"}
                      </Badge>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-sm font-bold text-gray-900 mb-1.5 leading-tight">
                      {approval.title}
                    </h3>
                    
                    {/* Customer */}
                    <div className="flex items-start gap-1.5 mb-2 pb-2 border-b border-gray-100">
                      <Building2 className="h-3.5 w-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-gray-700 leading-snug">{approval.customer}</span>
                    </div>
                    
                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-2 text-[11px]">
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500">มูลค่า</span>
                        <span className="font-bold text-[#7BC9A6]">฿{approval.totalValue.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500">ผู้ส่ง</span>
                        <span className="font-semibold text-gray-900 truncate">{approval.submittedBy}</span>
                      </div>
                    </div>
                    
                    {/* Current Stage */}
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3 text-amber-500" />
                      <span className="text-[11px] text-gray-600">
                        <span className="font-semibold text-gray-900">{approval.currentStage}</span>
                        <span className="text-gray-400 mx-1">•</span>
                        <span>{approval.daysOpen} วัน</span>
                      </span>
                    </div>
                  </div>
                  
                  {/* Action Buttons - Mobile */}
                  <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-gray-100">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 h-9 text-xs font-semibold border-2 border-red-200 text-red-700 hover:bg-red-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("Reject:", approval.id);
                      }}
                    >
                      <XCircle className="h-3.5 w-3.5 mr-1" />
                      ปฏิเสธ
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 h-9 text-xs font-semibold bg-[#7BC9A6] hover:bg-[#5FB88E] text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("Approve:", approval.id);
                      }}
                    >
                      <CheckCircle className="h-3.5 w-3.5 mr-1" />
                      อนุมัติ
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 border-gray-300"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="h-4 w-4 text-gray-600" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShowFlow(approval, e);
                          }}
                        >
                          <GitBranch className="h-4 w-4 mr-2" />
                          ดูเส้นทางอนุมัติ
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            onApprovalClick(approval.id);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          ดูรายละเอียดเต็ม
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:flex items-start justify-between gap-4">
                  {/* Left Side - Document Info */}
                  <div 
                    className="flex-1 min-w-0 cursor-pointer"
                    onClick={() => onApprovalClick(approval.id)}
                  >
                    {/* Document ID */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-semibold text-gray-500">{approval.id}</span>
                    </div>
                    
                    {/* Document Title */}
                    <h3 className="text-sm font-bold text-gray-900 mb-2 hover:text-[#7BC9A6] transition-colors">
                      {approval.title}
                    </h3>
                    
                    {/* Document Details */}
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500">ลูกค้า</span>
                        <span className="font-semibold text-gray-900">{approval.customer}</span>
                      </div>
                      <span className="text-gray-300">|</span>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500">มูลค่า</span>
                        <span className="font-bold text-[#7BC9A6]">฿{approval.totalValue.toLocaleString()}</span>
                      </div>
                      <span className="text-gray-300">|</span>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500">ผู้ส่ง</span>
                        <span className="font-medium text-gray-900">{approval.submittedBy}</span>
                      </div>
                      <span className="text-gray-300">|</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-amber-500" />
                        <span className="text-gray-500">รออนุมัติที่</span>
                        <span className="font-semibold text-gray-900">{approval.currentStage}</span>
                        <span className="text-gray-400">• {approval.daysOpen} วันที่ผ่านมา</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Side - Actions */}
                  <div className="flex items-center gap-2">
                    {/* Priority Badge */}
                    <Badge className={`text-xs font-medium h-6 px-2 ${
                      approval.priority === "High" 
                        ? "bg-orange-100 text-orange-700 border-orange-300" 
                        : "bg-yellow-100 text-yellow-700 border-yellow-300"
                    }`}>
                      {approval.priority === "High" ? "⚠️ ด่วน" : "ปานกลาง"}
                    </Badge>
                    
                    {/* Reject Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 px-4 text-xs font-semibold border-2 border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400 transition-all"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("Reject:", approval.id);
                      }}
                    >
                      <XCircle className="h-3.5 w-3.5 mr-1.5" />
                      ปฏิเสธ
                    </Button>
                    
                    {/* Approve Button */}
                    <Button
                      size="sm"
                      className="h-9 px-4 text-xs font-semibold bg-[#7BC9A6] hover:bg-[#5FB88E] text-white shadow-sm hover:shadow-md transition-all"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("Approve:", approval.id);
                      }}
                    >
                      <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                      อนุมัติ
                    </Button>
                    
                    {/* More Actions */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 text-gray-600 hover:text-gray-900"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShowFlow(approval, e);
                          }}
                        >
                          <GitBranch className="h-4 w-4 mr-2" />
                          ดูเส้นทางอนุมัติ
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            onApprovalClick(approval.id);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          ดูรายละเอียดเต็ม
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      {paginatedApprovals.length > 0 && (
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="text-sm border border-gray-300 rounded px-2 py-1 bg-white text-gray-700"
                >
                  <option value={5}>5 / หน้า</option>
                  <option value={10}>10 / หน้า</option>
                  <option value={20}>20 / หน้า</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`h-8 w-8 p-0 ${currentPage === pageNum ? 'bg-[#7BC9A6] hover:bg-[#5FB88E] text-white' : ''}`}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-sm text-gray-600">
                {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredApprovals.length)} จาก {filteredApprovals.length}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* History Dialog */}
      <HistoryDialog
        isOpen={isHistoryDialogOpen}
        onClose={() => setIsHistoryDialogOpen(false)}
        entries={[
          {
            id: "1",
            action: "submitted",
            entity: "Approval Request",
            user: "Sarah Chen",
            timestamp: new Date("2024-12-15T10:30:00").toISOString(),
            description: "Submitted contract approval for International Freight Agreement",
          },
          {
            id: "2",
            action: "approved",
            entity: "Approval Request",
            user: "Michael Park",
            timestamp: new Date("2024-12-16T14:20:00").toISOString(),
            description: "Approved by Sales Manager - Stage 1 completed",
          },
          {
            id: "3",
            action: "forwarded",
            entity: "Approval Request",
            user: "System",
            timestamp: new Date("2024-12-16T14:25:00").toISOString(),
            description: "Forwarded to Finance Review stage",
          },
          {
            id: "4",
            action: "submitted",
            entity: "Approval Request",
            user: "Michael Park",
            timestamp: new Date("2024-12-10T09:15:00").toISOString(),
            description: "Submitted quotation approval for Warehousing Services",
          },
          {
            id: "5",
            action: "approved",
            entity: "Approval Request",
            user: "Finance Manager",
            timestamp: new Date("2024-12-06T16:45:00").toISOString(),
            description: "Approved Sea Freight Contract - Finance Review completed",
          },
        ]}
      />

      {/* Approval Flow Dialog */}
      <ApprovalFlowDialog
        isOpen={flowDialogOpen}
        onClose={() => setFlowDialogOpen(false)}
        approval={selectedApprovalForFlow}
        steps={selectedApprovalForFlow ? getApprovalSteps(selectedApprovalForFlow) : []}
      />
    </div>
  );
}