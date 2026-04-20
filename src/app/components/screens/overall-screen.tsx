import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Search,
  Filter,
  Download,
  FileText,
  Briefcase,
  FileCheck,
  ChevronDown,
  Calendar,
  DollarSign,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";

type DocumentType = "Quotation" | "Contract";
type Status = "Approved" | "Expired" | "Rejected" | "Signed" | "Completed" | "Pending";

interface OverAllDocument {
  id: string;
  documentType: DocumentType;
  documentNo: string;
  customer: string;
  owner: string;
  revenue: string;
  status: Status;
  closedDate: string;
  businessUnit: string;
}

const mockDocuments: OverAllDocument[] = [
  {
    id: "3",
    documentType: "Quotation",
    documentNo: "QT-2025-0156",
    customer: "Central Food Hall",
    owner: "Emily Rodriguez",
    revenue: "$450K",
    status: "Approved",
    closedDate: "2025-01-20",
    businessUnit: "F&B",
  },
  {
    id: "4",
    documentType: "Quotation",
    documentNo: "QT-2025-0089",
    customer: "Tops Market",
    owner: "James Wilson",
    revenue: "$320K",
    status: "Rejected",
    closedDate: "2025-01-05",
    businessUnit: "Retail",
  },
  {
    id: "5",
    documentType: "Contract",
    documentNo: "CNT-2024-4920",
    customer: "Global Freight Solutions",
    owner: "Sarah Chen",
    revenue: "$2.73M",
    status: "Signed",
    closedDate: "2024-12-01",
    businessUnit: "HCP",
  },
  {
    id: "6",
    documentType: "Contract",
    documentNo: "CNT-2024-4855",
    customer: "Siam Cement Group",
    owner: "Tom Anderson",
    revenue: "$1.2M",
    status: "Completed",
    closedDate: "2024-11-15",
    businessUnit: "Manufacturing",
  },
  {
    id: "8",
    documentType: "Quotation",
    documentNo: "QT-2024-0234",
    customer: "AIS Thailand",
    owner: "David Kim",
    revenue: "$890K",
    status: "Expired",
    closedDate: "2024-12-31",
    businessUnit: "Tech",
  },
  {
    id: "9",
    documentType: "Contract",
    documentNo: "CNT-2025-0012",
    customer: "Bangkok Airways",
    owner: "Sarah Chen",
    revenue: "$1.8M",
    status: "Signed",
    closedDate: "2025-01-15",
    businessUnit: "HCP",
  },
  {
    id: "10",
    documentType: "Quotation",
    documentNo: "QT-2025-0178",
    customer: "PTT Energy",
    owner: "Lisa Thompson",
    revenue: "$2.5M",
    status: "Approved",
    closedDate: "2025-01-18",
    businessUnit: "Energy",
  },
  {
    id: "11",
    documentType: "Contract",
    documentNo: "CNT-2024-4788",
    customer: "Thai Airways",
    owner: "Michael Park",
    revenue: "$1.5M",
    status: "Completed",
    closedDate: "2024-12-20",
    businessUnit: "HCP",
  },
];

export function OverAllScreen({ 
  onDealClick, 
  onQuotationClick, 
  onContractClick 
}: { 
  onDealClick?: (dealId: string) => void;
  onQuotationClick?: (quotationId: string) => void;
  onContractClick?: (contractId: string) => void;
}) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedBU, setSelectedBU] = useState<string>("all");

  const handleDocumentClick = (doc: OverAllDocument) => {
    switch (doc.documentType) {
      case "Quotation":
        onQuotationClick?.(doc.documentNo);
        break;
      case "Contract":
        onContractClick?.(doc.documentNo);
        break;
    }
  };

  const getStatusColor = (status: Status) => {
    switch (status) {
      case "Approved":
      case "Signed":
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      case "Expired":
        return "bg-gray-100 text-gray-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  const getDocumentIcon = (type: DocumentType) => {
    switch (type) {
      case "Quotation":
        return <FileText className="h-4 w-4" />;
      case "Contract":
        return <FileCheck className="h-4 w-4" />;
    }
  };

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch =
      doc.documentNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.owner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || doc.documentType === selectedType;
    const matchesStatus = selectedStatus === "all" || doc.status === selectedStatus;
    const matchesBU = selectedBU === "all" || doc.businessUnit === selectedBU;

    return matchesSearch && matchesType && matchesStatus && matchesBU;
  });

  const totalRevenue = filteredDocuments.reduce((sum, doc) => {
    const revenue = parseFloat(doc.revenue.replace(/[$MK,]/g, ""));
    const multiplier = doc.revenue.includes("M") ? 1000000 : doc.revenue.includes("K") ? 1000 : 1;
    return sum + revenue * multiplier;
  }, 0);

  return (
    <div className="p-3 sm:p-4 lg:p-6 space-y-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            {t("nav.overall")}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            รวมเอกสารการขายที่เสร็จสมบูรณ์แล้วทั้งหมด
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <Card>
          <CardContent className="p-2">
            <p className="text-[10px] text-gray-600">Total Documents</p>
            <p className="text-base font-bold text-gray-900 mt-0.5">
              {filteredDocuments.length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-2">
            <p className="text-[10px] text-gray-600">Total Revenue</p>
            <p className="text-base font-bold text-gray-900 mt-0.5">
              ${(totalRevenue / 1000000).toFixed(2)}M
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-2">
            <p className="text-[10px] text-gray-600">Approved/Signed</p>
            <p className="text-base font-bold text-green-700 mt-0.5">
              {filteredDocuments.filter((d) => d.status === "Approved" || d.status === "Signed").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-2">
            <p className="text-[10px] text-gray-600">Completed</p>
            <p className="text-base font-bold text-blue-700 mt-0.5">
              {
                filteredDocuments.filter(
                  (d) => d.status === "Completed"
                ).length
              }
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents, customers, owners..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] bg-white"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="Quotation">Quotations</option>
            <option value="Contract">Contracts</option>
          </select>
          <select
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] bg-white"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Approved">Approved</option>
            <option value="Signed">Signed</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
            <option value="Expired">Expired</option>
          </select>
          <select
            className="hidden sm:block px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] bg-white"
            value={selectedBU}
            onChange={(e) => setSelectedBU(e.target.value)}
          >
            <option value="all">All BU</option>
            <option value="HCP">HCP</option>
            <option value="F&B">F&B</option>
            <option value="Retail">Retail</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Energy">Energy</option>
            <option value="Tech">Tech</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <Card>
        <div>
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-2 px-2 text-[10px] font-semibold text-gray-600">
                  Type
                </th>
                <th className="text-left py-2 px-2 text-[10px] font-semibold text-gray-600">
                  Doc No.
                </th>
                <th className="text-left py-2 px-2 text-[10px] font-semibold text-gray-600">
                  Customer
                </th>
                <th className="hidden lg:table-cell text-left py-2 px-2 text-[10px] font-semibold text-gray-600">
                  Owner
                </th>
                <th className="text-right py-2 px-2 text-[10px] font-semibold text-gray-600">
                  Revenue
                </th>
                <th className="hidden xl:table-cell text-left py-2 px-2 text-[10px] font-semibold text-gray-600">
                  Status
                </th>
                <th className="hidden md:table-cell text-left py-2 px-2 text-[10px] font-semibold text-gray-600">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc) => (
                <tr
                  key={doc.id}
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleDocumentClick(doc)}
                >
                  <td className="py-2 px-2">
                    <div className="flex items-center gap-1 text-gray-700">
                      {getDocumentIcon(doc.documentType)}
                      <span className="text-[10px] font-medium hidden sm:inline">{doc.documentType}</span>
                    </div>
                  </td>
                  <td className="py-2 px-2">
                    <span className="text-xs font-medium text-blue-600">
                      {doc.documentNo}
                    </span>
                  </td>
                  <td className="py-2 px-2">
                    <div>
                      <p className="text-xs font-medium text-gray-900 truncate max-w-[120px] sm:max-w-none">
                        {doc.customer}
                      </p>
                      <p className="text-[10px] text-gray-500 lg:hidden truncate max-w-[120px] sm:max-w-none">
                        {doc.owner}
                      </p>
                    </div>
                  </td>
                  <td className="hidden lg:table-cell py-2 px-2 text-xs text-gray-700 truncate max-w-[100px]">
                    {doc.owner}
                  </td>
                  <td className="py-2 px-2 text-right">
                    <span className="text-xs font-semibold text-gray-900">
                      {doc.revenue}
                    </span>
                  </td>
                  <td className="hidden xl:table-cell py-2 px-2">
                    <Badge
                      variant="secondary"
                      className={`${getStatusColor(doc.status)} text-[10px] px-1.5 py-0.5`}
                    >
                      {doc.status}
                    </Badge>
                  </td>
                  <td className="hidden md:table-cell py-2 px-2 text-[10px] text-gray-700">
                    {new Date(doc.closedDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredDocuments.length === 0 && (
          <div className="text-center py-8">
            <FileText className="h-10 w-10 text-gray-300 mx-auto mb-2" />
            <p className="text-xs text-gray-600">No documents found</p>
          </div>
        )}
      </Card>
    </div>
  );
}