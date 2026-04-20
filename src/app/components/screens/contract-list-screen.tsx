import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  Search,
  Filter,
  FileText,
  Plus,
  Calendar,
  DollarSign,
  Building2,
  AlertTriangle,
  CheckCircle,
  History,
  ChevronDown,
  User,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { HistoryMenu, HistoryEntry } from "../history-menu";
import { HistoryDialog } from "../history-dialog";

interface ContractListScreenProps {
  onContractClick: (contractId: string) => void;
}

export function ContractListScreen({ onContractClick }: ContractListScreenProps) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);

  const contracts = [
    {
      id: "CNT-2024-001",
      contractNumber: "GFS-2024-AIR-001",
      title: "International Air Freight Master Agreement",
      customer: "Global Freight Solutions Inc.",
      customerType: "Enterprise",
      businessUnit: "Air Freight",
      totalValue: "$2,450,000",
      startDate: "2024-01-15",
      endDate: "2026-01-14",
      status: "Active",
      paymentTerms: "Net 30",
      autoRenewal: true,
      daysToExpiry: 395,
      utilization: 65,
    },
    {
      id: "CNT-2024-002",
      contractNumber: "PTC-2024-WHS-002",
      title: "Warehousing Services Agreement",
      customer: "Pacific Trade Corp",
      customerType: "Enterprise",
      businessUnit: "Warehousing",
      totalValue: "$1,850,000",
      startDate: "2024-03-01",
      endDate: "2026-02-28",
      status: "Active",
      paymentTerms: "Net 45",
      autoRenewal: false,
      daysToExpiry: 440,
      utilization: 72,
    },
    {
      id: "CNT-2024-003",
      contractNumber: "ALN-2024-SEA-003",
      title: "Sea Freight Transportation Contract",
      customer: "Asian Logistics Network",
      customerType: "Enterprise",
      businessUnit: "Sea Freight",
      totalValue: "$3,200,000",
      startDate: "2024-02-10",
      endDate: "2026-02-09",
      status: "Active",
      paymentTerms: "Net 30",
      autoRenewal: true,
      daysToExpiry: 416,
      utilization: 58,
    },
    {
      id: "CNT-2023-015",
      contractNumber: "ESS-2023-CUS-015",
      title: "Customs Clearance Services",
      customer: "Euro Shipping Solutions",
      customerType: "Mid-Market",
      businessUnit: "Customs",
      totalValue: "$780,000",
      startDate: "2023-11-20",
      endDate: "2025-11-19",
      status: "Active",
      paymentTerms: "Net 30",
      autoRenewal: false,
      daysToExpiry: 335,
      utilization: 45,
    },
    {
      id: "CNT-2024-004",
      contractNumber: "TIL-2024-MLT-004",
      title: "Multi-Modal Transport Services",
      customer: "Tech Innovations Ltd",
      customerType: "SMB",
      businessUnit: "Multi-Modal",
      totalValue: "$450,000",
      startDate: "2024-06-01",
      endDate: "2025-05-31",
      status: "Active",
      paymentTerms: "Net 15",
      autoRenewal: true,
      daysToExpiry: 162,
      utilization: 38,
    },
    {
      id: "CNT-2023-008",
      contractNumber: "AMC-2023-AIR-008",
      title: "Air Freight Export Services",
      customer: "Australian Mining Co",
      customerType: "Enterprise",
      businessUnit: "Air Freight",
      totalValue: "$1,650,000",
      startDate: "2023-08-15",
      endDate: "2024-12-31",
      status: "Expiring Soon",
      paymentTerms: "Net 30",
      autoRenewal: false,
      daysToExpiry: 12,
      utilization: 89,
    },
    {
      id: "CNT-2022-025",
      contractNumber: "NAT-2022-EXP-025",
      title: "Express Delivery Services",
      customer: "North American Traders",
      customerType: "Enterprise",
      businessUnit: "Express",
      totalValue: "$890,000",
      startDate: "2022-10-01",
      endDate: "2024-09-30",
      status: "Expired",
      paymentTerms: "Net 30",
      autoRenewal: false,
      daysToExpiry: -80,
      utilization: 100,
    },
    {
      id: "CNT-2024-005",
      contractNumber: "MES-2024-SEA-005",
      title: "Maritime Shipping Agreement",
      customer: "Mediterranean Exports SA",
      customerType: "Mid-Market",
      businessUnit: "Sea Freight",
      totalValue: "$1,200,000",
      startDate: "2024-04-15",
      endDate: "2026-04-14",
      status: "Active",
      paymentTerms: "Net 45",
      autoRenewal: true,
      daysToExpiry: 485,
      utilization: 52,
    },
  ];

  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch =
      contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.contractNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" ||
      contract.status.toLowerCase().replace(" ", "_") === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string, daysToExpiry: number) => {
    switch (status) {
      case "Active":
        if (daysToExpiry <= 45) {
          return (
            <Badge className="bg-[#fef3c7] text-[#92400e] border-[#fcd34d] hover:bg-[#fde68a]">
              <AlertTriangle className="h-3 w-3 mr-1" />
              {t("contracts.expiring_soon")}
            </Badge>
          );
        }
        return (
          <Badge className="bg-[#dcfce7] text-[#166534] border-[#86efac] hover:bg-[#bbf7d0]">
            <CheckCircle className="h-3 w-3 mr-1" />
            {t("status.active")}
          </Badge>
        );
      case "Expiring Soon":
        return (
          <Badge className="bg-[#fef3c7] text-[#92400e] border-[#fcd34d] hover:bg-[#fde68a]">
            <AlertTriangle className="h-3 w-3 mr-1" />
            {t("contracts.expiring_soon")}
          </Badge>
        );
      case "Expired":
        return (
          <Badge className="bg-[#f3f4f6] text-[#6b7280] border-[#d1d5db]">
            {t("status.expired")}
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
    const colors: Record<string, string> = {
      Enterprise: "bg-[#ede9fe] text-[#5b21b6] border-[#c4b5fd]",
      "Mid-Market": "bg-[#dbeafe] text-[#1e40af] border-[#93c5fd]",
      SMB: "bg-[#fef3c7] text-[#92400e] border-[#fcd34d]",
    };
    return (
      <Badge className={colors[type] || colors.Enterprise}>
        {type}
      </Badge>
    );
  };

  const stats = {
    total: contracts.length,
    active: contracts.filter((c) => c.status === "Active" || c.status === "Expiring Soon").length,
    expiringSoon: contracts.filter((c) => c.daysToExpiry > 0 && c.daysToExpiry <= 45).length,
    expired: contracts.filter((c) => c.status === "Expired").length,
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-[#4c1d95] font-semibold">
              {t("contracts.all_contracts")}
            </h1>
            <p className="text-[#9333ea] mt-1">
              {t("contracts.subtitle")}
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsHistoryDialogOpen(true)}
              className="border-2 border-[#ede9fe] text-[#705add] hover:bg-[#f5f3ff] rounded-xl h-10 w-10"
            >
              <History className="h-4 w-4" />
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md">
              <Plus className="h-4 w-4 mr-2" />
              {t("contracts.new_contract")}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-2 border-[#ede9fe] shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#9333ea]">{t("contracts.total_contracts")}</p>
                  <p className="text-2xl font-semibold text-[#4c1d95] mt-1">
                    {stats.total}
                  </p>
                </div>
                <div className="h-12 w-12 bg-[#f5f3ff] rounded-xl flex items-center justify-center">
                  <FileText className="h-6 w-6 text-[#705add]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#ede9fe] shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#9333ea]">{t("contracts.active_contracts")}</p>
                  <p className="text-2xl font-semibold text-[#4c1d95] mt-1">
                    {stats.active}
                  </p>
                </div>
                <div className="h-12 w-12 bg-[#dcfce7] rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-[#166534]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#ede9fe] shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#9333ea]">{t("contracts.expiring_soon")}</p>
                  <p className="text-2xl font-semibold text-[#4c1d95] mt-1">
                    {stats.expiringSoon}
                  </p>
                </div>
                <div className="h-12 w-12 bg-[#fef3c7] rounded-xl flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-[#92400e]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#ede9fe] shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#9333ea]">{t("contracts.total_value")}</p>
                  <p className="text-2xl font-semibold text-[#4c1d95] mt-1">$12.47M</p>
                </div>
                <div className="h-12 w-12 bg-[#dbeafe] rounded-xl flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-[#1e40af]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="border-2 border-[#ede9fe] shadow-sm">
          <CardHeader className="border-b-2 border-[#ede9fe] bg-gradient-to-r from-[#faf8ff] to-white">
            <div className="flex items-center justify-between">
              <CardTitle className="text-[#4c1d95]">
                {t("contracts.contract_directory")}
              </CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a78bfa]" />
                  <Input
                    placeholder={t("common.search")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-80 border-2 border-[#ede9fe] rounded-xl bg-white focus:border-[#705add]"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={filterStatus === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterStatus("all")}
                    className={
                      filterStatus === "all"
                        ? "bg-[#705add] hover:bg-[#5b21b6] text-white rounded-xl"
                        : "border-2 border-[#ede9fe] text-[#705add] hover:bg-[#f5f3ff] rounded-xl"
                    }
                  >
                    {t("customers.all")}
                  </Button>
                  <Button
                    variant={filterStatus === "active" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterStatus("active")}
                    className={
                      filterStatus === "active"
                        ? "bg-[#705add] hover:bg-[#5b21b6] text-white rounded-xl"
                        : "border-2 border-[#ede9fe] text-[#705add] hover:bg-[#f5f3ff] rounded-xl"
                    }
                  >
                    {t("status.active")}
                  </Button>
                  <Button
                    variant={filterStatus === "expiring_soon" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterStatus("expiring_soon")}
                    className={
                      filterStatus === "expiring_soon"
                        ? "bg-[#705add] hover:bg-[#5b21b6] text-white rounded-xl"
                        : "border-2 border-[#ede9fe] text-[#705add] hover:bg-[#f5f3ff] rounded-xl"
                    }
                  >
                    {t("contracts.expiring_soon")}
                  </Button>
                  <Button
                    variant={filterStatus === "expired" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterStatus("expired")}
                    className={
                      filterStatus === "expired"
                        ? "bg-[#705add] hover:bg-[#5b21b6] text-white rounded-xl"
                        : "border-2 border-[#ede9fe] text-[#705add] hover:bg-[#f5f3ff] rounded-xl"
                    }
                  >
                    {t("status.expired")}
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#faf8ff] border-b-2 border-[#ede9fe]">
                  <tr>
                    <th className="text-left p-4 text-sm text-[#6b21a8]">
                      {t("contracts.contract_number")}
                    </th>
                    <th className="text-left p-4 text-sm text-[#6b21a8]">
                      {t("contracts.contract_title")}
                    </th>
                    <th className="text-left p-4 text-sm text-[#6b21a8]">
                      {t("customers.customer_name")}
                    </th>
                    <th className="text-left p-4 text-sm text-[#6b21a8]">
                      {t("contracts.business_unit_label")}
                    </th>
                    <th className="text-left p-4 text-sm text-[#6b21a8]">
                      {t("contracts.contract_value")}
                    </th>
                    <th className="text-left p-4 text-sm text-[#6b21a8]">
                      {t("contracts.contract_period")}
                    </th>
                    <th className="text-left p-4 text-sm text-[#6b21a8]">
                      {t("contracts.utilization")}
                    </th>
                    <th className="text-left p-4 text-sm text-[#6b21a8]">
                      {t("status.status")}
                    </th>
                    <th className="text-left p-4 text-sm text-[#6b21a8]">
                      {t("contracts.renewal")}
                    </th>
                    <th className="text-left p-4 text-sm text-[#6b21a8]">
                      {t("common.actions")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContracts.map((contract, index) => (
                    <tr
                      key={contract.id}
                      className={`border-b border-[#ede9fe] hover:bg-[#faf8ff] transition-colors cursor-pointer ${
                        index % 2 === 0 ? "bg-white" : "bg-[#fefeff]"
                      }`}
                      onClick={() => onContractClick(contract.id)}
                    >
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-[#4c1d95]">{contract.contractNumber}</p>
                          <p className="text-xs text-[#9333ea]">{contract.id}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-[#4c1d95] max-w-xs">
                            {contract.title}
                          </p>
                          <p className="text-sm text-[#9333ea]">{contract.businessUnit}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="text-sm text-[#4c1d95]">{contract.customer}</p>
                          {getTypeBadge(contract.customerType)}
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge className="bg-[#ede9fe] text-[#5b21b6] border-[#c4b5fd]">
                          {contract.businessUnit}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-[#4c1d95]">
                          {contract.totalValue}
                        </p>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm text-[#4c1d95]">
                            <Calendar className="h-3 w-3 text-[#a78bfa]" />
                            {contract.startDate}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-[#4c1d95]">
                            <Calendar className="h-3 w-3 text-[#a78bfa]" />
                            {contract.endDate}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-[#ede9fe] rounded-full h-2 max-w-[80px]">
                            <div
                              className="bg-[#705add] h-2 rounded-full"
                              style={{ width: `${contract.utilization}%` }}
                            />
                          </div>
                          <span className="text-sm text-[#4c1d95] font-medium">
                            {contract.utilization}%
                          </span>
                        </div>
                      </td>
                      <td className="p-4">{getStatusBadge(contract.status, contract.daysToExpiry)}</td>
                      <td className="p-4">
                        <Badge
                          className={
                            contract.autoRenewal
                              ? "bg-[#dcfce7] text-[#166534] border-[#86efac] hover:bg-[#bbf7d0]"
                              : "bg-[#f3f4f6] text-[#6b7280] border-[#d1d5db]"
                          }
                        >
                          {contract.autoRenewal ? t("contracts.auto_renewal") : t("contracts.manual")}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-2 border-[#ede9fe] text-[#705add] hover:bg-[#f5f3ff] rounded-xl"
                          onClick={(e) => {
                            e.stopPropagation();
                            onContractClick(contract.id);
                          }}
                        >
                          {t("customers.view_details")}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* History Dialog */}
      <HistoryDialog
        isOpen={isHistoryDialogOpen}
        onClose={() => setIsHistoryDialogOpen(false)}
        entries={[
          {
            id: "1",
            action: "created",
            entity: "Contract",
            user: "System",
            timestamp: new Date("2024-01-15").toISOString(),
            description: "Created contract \"International Air Freight Master Agreement\"",
          },
          {
            id: "2",
            action: "updated",
            entity: "Contract",
            field: "Status",
            oldValue: "Draft",
            newValue: "Active",
            user: "Admin",
            timestamp: new Date("2024-01-20").toISOString(),
          },
          {
            id: "3",
            action: "approved",
            entity: "Contract",
            user: "Finance Manager",
            timestamp: new Date("2024-02-01").toISOString(),
            description: "Contract approved by finance team",
          },
          {
            id: "4",
            action: "updated",
            entity: "Contract",
            field: "Value",
            oldValue: "$2,000,000",
            newValue: "$2,450,000",
            user: "Sales Manager",
            timestamp: new Date("2024-03-01").toISOString(),
          },
          {
            id: "5",
            action: "created",
            entity: "Contract",
            user: "System",
            timestamp: new Date("2024-03-01").toISOString(),
            description: "Created contract \"Warehousing Services Agreement\"",
          },
          {
            id: "6",
            action: "status_changed",
            entity: "Contract",
            user: "Account Manager",
            timestamp: new Date("2024-04-15").toISOString(),
            description: "Contract renewed for 2 years",
          },
          {
            id: "7",
            action: "updated",
            entity: "Contract",
            field: "Payment Terms",
            oldValue: "Net 30",
            newValue: "Net 45",
            user: "Finance Team",
            timestamp: new Date("2024-06-01").toISOString(),
          },
          {
            id: "8",
            action: "approved",
            entity: "Contract",
            user: "Legal Team",
            timestamp: new Date("2024-08-20").toISOString(),
            description: "Contract amendment approved",
          },
          {
            id: "9",
            action: "updated",
            entity: "Contract",
            field: "Auto-Renewal",
            oldValue: "No",
            newValue: "Yes",
            user: "Sales Team",
            timestamp: new Date("2024-10-10").toISOString(),
          },
          {
            id: "10",
            action: "status_changed",
            entity: "Contract",
            user: "System",
            timestamp: new Date("2024-12-01").toISOString(),
            description: "Contract status changed to Expiring Soon",
          },
        ]}
      />
    </div>
  );
}