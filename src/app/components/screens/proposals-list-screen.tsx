import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
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

interface Proposal {
  id: string;
  dealId: string;
  dealName: string;
  customer: string;
  totalValue: string;
  status: "draft" | "sent" | "approved" | "rejected" | "expired";
  createdDate: string;
  sentDate?: string;
  expiryDate: string;
  createdBy: string;
  template: string;
}

interface ProposalsListScreenProps {
  onNavigate: (path: string, id?: string) => void;
}

export function ProposalsListScreen({ onNavigate }: ProposalsListScreenProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Mock data
  const proposals: Proposal[] = [
    {
      id: "PROP-2024-001",
      dealId: "D-2024-045",
      dealName: "International Freight Solution - TechCorp Asia",
      customer: "TechCorp Asia Ltd.",
      totalValue: "฿4,500,000",
      status: "sent",
      createdDate: "2024-01-05",
      sentDate: "2024-01-05",
      expiryDate: "2024-02-05",
      createdBy: "Sarah Chen",
      template: "Standard Proposal Template",
    },
    {
      id: "PROP-2024-002",
      dealId: "D-2024-052",
      dealName: "Warehouse Management System - Global Trade",
      customer: "Global Trade Solutions",
      totalValue: "฿8,200,000",
      status: "approved",
      createdDate: "2024-01-03",
      sentDate: "2024-01-04",
      expiryDate: "2024-02-04",
      createdBy: "Michael Park",
      template: "Executive Summary Template",
    },
    {
      id: "PROP-2024-003",
      dealId: "D-2024-067",
      dealName: "Supply Chain Optimization - Pacific Trade",
      customer: "Pacific Trade Corp",
      totalValue: "฿3,200,000",
      status: "draft",
      createdDate: "2024-01-08",
      expiryDate: "2024-02-08",
      createdBy: "John Smith",
      template: "Detailed Technical Proposal",
    },
    {
      id: "PROP-2024-004",
      dealId: "D-2024-078",
      dealName: "Cold Chain Logistics - Food Distributors",
      customer: "Food Distributors Inc.",
      totalValue: "฿6,700,000",
      status: "rejected",
      createdDate: "2023-12-28",
      sentDate: "2023-12-29",
      expiryDate: "2024-01-29",
      createdBy: "Lisa Anderson",
      template: "Standard Proposal Template",
    },
    {
      id: "PROP-2024-005",
      dealId: "D-2024-081",
      dealName: "Last Mile Delivery Network - E-commerce Plus",
      customer: "E-commerce Plus Co.",
      totalValue: "฿5,100,000",
      status: "sent",
      createdDate: "2024-01-06",
      sentDate: "2024-01-07",
      expiryDate: "2024-02-07",
      createdBy: "David Kim",
      template: "Brief Quotation Format",
    },
  ];

  const getStatusBadge = (status: Proposal["status"]) => {
    const statusConfig = {
      draft: {
        label: t("status.draft"),
        className: "bg-gray-100 text-gray-800 border-gray-300",
        icon: <Clock className="w-3 h-3 mr-1" />,
      },
      sent: {
        label: t("status.sent_to_customer"),
        className: "bg-blue-100 text-blue-800 border-blue-300",
        icon: <Mail className="w-3 h-3 mr-1" />,
      },
      approved: {
        label: t("status.approved"),
        className: "bg-green-100 text-green-800 border-green-300",
        icon: <CheckCircle2 className="w-3 h-3 mr-1" />,
      },
      rejected: {
        label: t("status.rejected"),
        className: "bg-red-100 text-red-800 border-red-300",
        icon: <XCircle className="w-3 h-3 mr-1" />,
      },
      expired: {
        label: t("status.expired"),
        className: "bg-orange-100 text-orange-800 border-orange-300",
        icon: <Clock className="w-3 h-3 mr-1" />,
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

  const filteredProposals = proposals.filter((proposal) => {
    const matchesSearch =
      proposal.dealName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || proposal.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: proposals.length,
    draft: proposals.filter((p) => p.status === "draft").length,
    sent: proposals.filter((p) => p.status === "sent").length,
    approved: proposals.filter((p) => p.status === "approved").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="p-4">
          {/* Search Bar */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="ค้นหาข้อเสนอ, ลูกค้า, ดีล..."
              className="pl-10 pr-4 h-10 border-gray-300 rounded-lg bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-8 text-xs border-gray-300 bg-white min-w-[100px]">
                <SelectValue placeholder="สถานะ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">สถานะทั้งหมด</SelectItem>
                <SelectItem value="draft">แบบร่าง</SelectItem>
                <SelectItem value="sent">ส่งแล้ว</SelectItem>
                <SelectItem value="approved">อนุมัติ</SelectItem>
                <SelectItem value="rejected">ปฏิเสธ</SelectItem>
                <SelectItem value="expired">หมดอายุ</SelectItem>
              </SelectContent>
            </Select>

            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="h-8 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <XCircle className="h-3 w-3 mr-1" />
                ล้าง
              </Button>
            )}
          </div>
        </div>

        {/* Stats Row */}
        {filteredProposals.length > 0 && (
          <div className="px-4 pb-3">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-full whitespace-nowrap">
                <FileText className="h-3 w-3 text-blue-600" />
                <span className="text-xs font-semibold text-blue-600">ทั้งหมด</span>
                <span className="text-sm font-bold text-gray-900">{stats.total}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full whitespace-nowrap">
                <Clock className="h-3 w-3 text-gray-600" />
                <span className="text-xs font-semibold text-gray-600">ร่าง</span>
                <span className="text-sm font-bold text-gray-900">{stats.draft}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-full whitespace-nowrap">
                <Mail className="h-3 w-3 text-blue-600" />
                <span className="text-xs font-semibold text-blue-600">ส่งแล้ว</span>
                <span className="text-sm font-bold text-gray-900">{stats.sent}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 rounded-full whitespace-nowrap">
                <CheckCircle2 className="h-3 w-3 text-green-600" />
                <span className="text-xs font-semibold text-green-600">อนุมัติ</span>
                <span className="text-sm font-bold text-gray-900">{stats.approved}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Proposals List */}
      <div className="p-4 pb-24">
        {/* Mobile Card View */}
        <div className="space-y-3 lg:hidden">
          {filteredProposals.map((proposal) => (
            <div
              key={proposal.id}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-200 cursor-pointer"
              onClick={() => onNavigate("/proposal-preview", proposal.id)}
            >
              {/* Header Row */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-purple-600">{proposal.id}</span>
                {getStatusBadge(proposal.status)}
              </div>

              {/* Deal Name */}
              <h3 className="font-semibold text-gray-900 text-sm mb-3 line-clamp-2">
                {proposal.dealName}
              </h3>

              {/* Customer & Deal */}
              <div className="mb-3">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Building2 className="h-3 w-3 text-gray-500" />
                  <span className="text-xs text-gray-500 font-medium">ลูกค้า</span>
                </div>
                <p className="text-sm text-gray-900 mb-1">{proposal.customer}</p>
                <p className="text-xs text-purple-600">Deal: {proposal.dealId}</p>
              </div>

              {/* Info */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-500">มูลค่า:</span>
                  <span className="ml-1 font-semibold text-gray-900">{proposal.totalValue}</span>
                </div>
                <div>
                  <span className="text-gray-500">หมดอายุ:</span>
                  <span className="ml-1 text-gray-900">{proposal.expiryDate}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                <Button
                  size="sm"
                  variant="ghost"
                  className="flex-1 h-8 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate("/proposal-preview", proposal.id);
                  }}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  ดู
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="flex-1 h-8 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate("/proposal-editor", proposal.id);
                  }}
                >
                  <Edit className="h-3 w-3 mr-1" />
                  แก้ไข
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="flex-1 h-8 text-xs"
                >
                  <Download className="h-3 w-3 mr-1" />
                  ดาวน์โหลด
                </Button>
              </div>
            </div>
          ))}
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
                    เลขที่
                  </th>
                  <th className="text-left px-3 py-2 text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                    ชื่อดีล
                  </th>
                  <th className="text-left px-3 py-2 text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                    Template
                  </th>
                  <th className="text-left px-3 py-2 text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                    สถานะ
                  </th>
                  <th className="text-right px-3 py-2 text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                    มูลค่า (฿)
                  </th>
                  <th className="text-right px-3 py-2 text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                    หมดอายุ
                  </th>
                  <th className="text-right px-3 py-2 text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                    
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProposals.map((proposal) => (
                  <tr
                    key={proposal.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer group"
                    onClick={() => onNavigate("/proposal-preview", proposal.id)}
                  >
                    <td className="px-3 py-2.5">
                      <p className="text-xs text-gray-700">{proposal.customer}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">โดย: {proposal.createdBy}</p>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="text-xs font-bold text-purple-600">{proposal.id}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <p className="text-xs font-medium text-gray-900 line-clamp-2">{proposal.dealName}</p>
                      <p className="text-[10px] text-purple-600 mt-0.5">Deal: {proposal.dealId}</p>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="text-xs text-gray-700">{proposal.template}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      {getStatusBadge(proposal.status)}
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <span className="text-xs font-semibold text-gray-900">{proposal.totalValue}</span>
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-700">{proposal.expiryDate}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 px-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigate("/proposal-preview", proposal.id);
                            }}
                          >
                            <Eye className="h-3 w-3 mr-2" />
                            ดูรายละเอียด
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigate("/proposal-editor", proposal.id);
                            }}
                          >
                            <Edit className="h-3 w-3 mr-2" />
                            แก้ไข
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            <Download className="h-3 w-3 mr-2" />
                            ดาวน์โหลด PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            <Mail className="h-3 w-3 mr-2" />
                            ส่งอีเมล
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredProposals.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">
              ไม่พบข้อเสนอ
            </h3>
            <p className="text-sm text-gray-500 text-center">
              ลองเปลี่ยนตัวกรองหรือคำค้นหา
            </p>
          </div>
        )}
      </div>
    </div>
  );
}