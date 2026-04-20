import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Search,
  Filter,
  ChevronDown,
  Plus,
  FileText,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertCircle,
  History,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { CreateContractWizard } from "../create-contract-wizard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { HistoryDialog } from "../history-dialog";

interface Contract {
  id: string;
  title: string;
  customer: string;
  value: string;
  startDate: string;
  endDate: string;
  status: string;
  utilization: number;
  businessUnit: string;
  paymentTerms: string;
  autoRenewal: boolean;
  owner: {
    name: string;
    initials: string;
  };
}

interface ContractsScreenProps {
  onContractClick: (contractId: string) => void;
  currentPath?: string; // Add this prop
  shouldOpenAddDialog?: boolean;
  setShouldOpenAddDialog?: (open: boolean) => void;
}

export function ContractsScreen({
  onContractClick,
  currentPath,
  shouldOpenAddDialog,
  setShouldOpenAddDialog,
}: ContractsScreenProps) {
  console.log("🔵 ContractsScreen rendered", { currentPath, shouldOpenAddDialog });
  
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateWizardOpen, setIsCreateWizardOpen] = useState(false);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterBU, setFilterBU] = useState<string>("all");
  const [filterExpiring, setFilterExpiring] = useState<string>("all");

  // Handle opening wizard from submenu navigation
  useEffect(() => {
    console.log("🟢 useEffect triggered", { shouldOpenAddDialog, setShouldOpenAddDialog });
    
    if (shouldOpenAddDialog && setShouldOpenAddDialog) {
      // Check currentPath from parent (which now includes query params)
      const currentUrl = currentPath || window.location.href;
      console.log("🟡 ContractsScreen: currentUrl =", currentUrl);
      console.log("🟡 ContractsScreen: shouldOpenAddDialog =", shouldOpenAddDialog);
      
      if (currentUrl.includes("action=add")) {
        console.log("🟢 Opening contract wizard...");
        setIsCreateWizardOpen(true);
      } else {
        console.log("🔴 No action parameter found in URL");
      }
      setShouldOpenAddDialog(false);
    }
  }, [shouldOpenAddDialog, setShouldOpenAddDialog, currentPath]);

  const contracts: Contract[] = [
    {
      id: "CT-2024-045",
      title: "International Air Freight Services Agreement",
      customer: "Global Freight Solutions Inc.",
      value: "$245,000",
      startDate: "2024-01-15",
      endDate: "2025-01-31",
      status: "active",
      utilization: 65,
      businessUnit: "Air Freight",
      paymentTerms: "Net 30",
      autoRenewal: true,
      owner: { name: "Sarah Chen", initials: "SC" },
    },
    {
      id: "CT-2024-046",
      title: "Sea Freight Long-term Contract",
      customer: "Asia Pacific Traders",
      value: "$520,000",
      startDate: "2024-03-01",
      endDate: "2026-02-28",
      status: "active",
      utilization: 42,
      businessUnit: "Sea Freight",
      paymentTerms: "Net 60",
      autoRenewal: false,
      owner: { name: "Emily Rodriguez", initials: "ER" },
    },
    {
      id: "CT-2024-047",
      title: "Warehousing Services Master Agreement",
      customer: "TransContinental Logistics",
      value: "$180,000",
      startDate: "2024-06-01",
      endDate: "2025-05-31",
      status: "active",
      utilization: 78,
      businessUnit: "Warehousing",
      paymentTerms: "Net 30",
      autoRenewal: true,
      owner: { name: "Michael Park", initials: "MP" },
    },
    {
      id: "CT-2023-089",
      title: "Distribution Network Services",
      customer: "FastTrack Express",
      value: "$320,000",
      startDate: "2023-09-01",
      endDate: "2024-08-31",
      status: "expired",
      utilization: 100,
      businessUnit: "Distribution",
      paymentTerms: "Net 45",
      autoRenewal: false,
      owner: { name: "David Kim", initials: "DK" },
    },
    {
      id: "CT-2024-048",
      title: "Cold Chain Logistics Agreement",
      customer: "PharmaCare Global",
      value: "$450,000",
      startDate: "2024-10-01",
      endDate: "2025-09-30",
      status: "pending",
      utilization: 0,
      businessUnit: "Special Cargo",
      paymentTerms: "Advance",
      autoRenewal: true,
      owner: { name: "Lisa Anderson", initials: "LA" },
    },
    {
      id: "CT-2024-049",
      title: "Customs Clearance Services Package",
      customer: "Pacific Distribution Co.",
      value: "$125,000",
      startDate: "2024-07-15",
      endDate: "2025-07-14",
      status: "active",
      utilization: 55,
      businessUnit: "Customs",
      paymentTerms: "Net 30",
      autoRenewal: true,
      owner: { name: "Sarah Chen", initials: "SC" },
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 border border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";
      case "expired":
        return "bg-red-100 text-red-700 border border-red-200";
      case "signed":
        return "bg-blue-100 text-blue-700 border border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    return t(`status.${status}`);
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 80) return "text-red-600";
    if (utilization >= 50) return "text-yellow-600";
    return "text-green-600";
  };

  const isExpiringSoon = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil(
      (end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysUntilExpiry > 0 && daysUntilExpiry <= 90;
  };

  const filteredContracts = contracts.filter(
    (contract) =>
      contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalContracts = contracts.length;
  const activeContracts = contracts.filter((c) => c.status === "active").length;
  const totalValue = contracts.reduce(
    (sum, c) => sum + parseFloat(c.value.replace(/[$,]/g, "")),
    0
  );
  const expiringSoonContracts = contracts.filter((c) =>
    isExpiringSoon(c.endDate)
  ).length;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900">
            {t("contracts.all_contracts")}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
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
          <Button
            onClick={() => setIsCreateWizardOpen(true)}
            className="bg-gradient-to-r from-[#a78bfa] to-[#705add] hover:from-[#8b5cf6] hover:to-[#6d28d9] text-white shadow-md hover:shadow-lg transition-all duration-200 rounded-xl border-0"
          >
            <Plus className="mr-2 h-4 w-4" />
            {t("contracts.new_contract")}
          </Button>
        </div>
      </div>

      <CreateContractWizard
        isOpen={isCreateWizardOpen}
        onClose={() => setIsCreateWizardOpen(false)}
      />

      {/* Search and Filters */}
      <Card className="border-2 border-[#ede9fe] shadow-sm">
        <CardContent className="p-5">
          <div className="space-y-4">
            {/* Search Bar Row */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8b5cf6]" />
              <Input
                placeholder={`${t("common.search")} ${t("contracts.all_contracts").toLowerCase()}...`}
                className="pl-12 pr-4 h-12 border-2 border-[#ede9fe] rounded-xl focus:border-[#705add] text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters Row */}
            <div className="flex items-center gap-3">
              <Select
                onValueChange={(value) => setFilterStatus(value)}
                defaultValue="all"
              >
                <SelectTrigger className="w-[200px] h-11 border-2 border-[#ede9fe] text-[#4c1d95] hover:bg-[#f5f3ff] rounded-xl transition-colors">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-[#705add]" />
                    <span>{t("contracts.status")}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-[#9333ea] rounded-full"></div>
                      <span>ทั้งหมด</span>
                      <Badge className="ml-2 bg-[#ede9fe] text-[#705add] border-0 text-xs">
                        6
                      </Badge>
                    </div>
                  </SelectItem>
                  <SelectItem value="active">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <span>ใช้งานอยู่</span>
                      <Badge className="ml-2 bg-green-100 text-green-700 border-0 text-xs">
                        4
                      </Badge>
                    </div>
                  </SelectItem>
                  <SelectItem value="pending">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                      <span>รออนุมัติ</span>
                      <Badge className="ml-2 bg-yellow-100 text-yellow-700 border-0 text-xs">
                        1
                      </Badge>
                    </div>
                  </SelectItem>
                  <SelectItem value="expired">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                      <span>หมดอายุ</span>
                      <Badge className="ml-2 bg-red-100 text-red-700 border-0 text-xs">
                        1
                      </Badge>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select
                onValueChange={(value) => setFilterBU(value)}
                defaultValue="all"
              >
                <SelectTrigger className="w-[200px] h-11 border-2 border-[#ede9fe] text-[#4c1d95] hover:bg-[#f5f3ff] rounded-xl transition-colors">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-[#705add]" />
                    <span>{t("approvals.business_unit")}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-[#9333ea] rounded-full"></div>
                      <span>ทั้งหมด</span>
                      <Badge className="ml-2 bg-[#ede9fe] text-[#705add] border-0 text-xs">
                        6
                      </Badge>
                    </div>
                  </SelectItem>
                  <SelectItem value="Air Freight">Air Freight</SelectItem>
                  <SelectItem value="Sea Freight">Sea Freight</SelectItem>
                  <SelectItem value="Warehousing">Warehousing</SelectItem>
                  <SelectItem value="Distribution">Distribution</SelectItem>
                  <SelectItem value="Special Cargo">Special Cargo</SelectItem>
                  <SelectItem value="Customs">Customs</SelectItem>
                </SelectContent>
              </Select>

              <Select
                onValueChange={(value) => setFilterExpiring(value)}
                defaultValue="all"
              >
                <SelectTrigger className="w-[200px] h-11 border-2 border-[#ede9fe] text-[#4c1d95] hover:bg-[#f5f3ff] rounded-xl transition-colors">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-[#705add]" />
                    <span>{t("contracts.expiring_soon")}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="expiring">กำลังหมดอายุ (90 วัน)</SelectItem>
                  <SelectItem value="not_expiring">ยังไม่หมดอายุ</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex-1"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="border-2 border-[#ede9fe] shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-white to-[#faf8ff]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-[#a78bfa] to-[#705add] rounded-xl shadow-md">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-[#8b5cf6]">
                  {t("contracts.total_contracts")}
                </p>
                <p className="text-2xl text-[#4c1d95] mt-1">{totalContracts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-100 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-white to-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-green-400 to-green-600 rounded-xl shadow-md">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-600">
                  {t("contracts.active_contracts")}
                </p>
                <p className="text-2xl text-green-700 mt-1">{activeContracts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-100 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-white to-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl shadow-md">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-600">
                  {t("contracts.total_value")}
                </p>
                <p className="text-2xl text-blue-700 mt-1">
                  ${(totalValue / 1000000).toFixed(2)}M
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-orange-100 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-white to-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl shadow-md">
                <AlertCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-orange-600">
                  {t("contracts.expiring_soon")}
                </p>
                <p className="text-2xl text-orange-700 mt-1">
                  {expiringSoonContracts}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contracts Table */}
      <Card className="border-2 border-[#ede9fe] shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-[#f5f3ff] to-[#ede9fe] border-b-2 border-[#ede9fe]">
                <tr>
                  <th className="text-left py-3 px-6 text-sm text-[#4c1d95] font-medium">
                    {t("contracts.contract_title")}
                  </th>
                  <th className="text-left py-3 px-6 text-sm text-[#4c1d95] font-medium">
                    {t("customers.customer")}
                  </th>
                  <th className="text-left py-3 px-6 text-sm text-[#4c1d95] font-medium">
                    {t("contracts.contract_value")}
                  </th>
                  <th className="text-left py-3 px-6 text-sm text-[#4c1d95] font-medium">
                    {t("contracts.contract_period")}
                  </th>
                  <th className="text-left py-3 px-6 text-sm text-[#4c1d95] font-medium">
                    {t("contracts.utilization")}
                  </th>
                  <th className="text-left py-3 px-6 text-sm text-[#4c1d95] font-medium">
                    {t("contracts.status")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredContracts.map((contract) => (
                  <tr
                    key={contract.id}
                    className="border-b border-[#ede9fe] hover:bg-gradient-to-r hover:from-[#faf8ff] hover:to-[#f5f3ff] transition-colors cursor-pointer"
                    onClick={() => onContractClick(contract.id)}
                  >
                    <td className="py-4 px-6">
                      <div>
                        <p className="text-sm text-[#4c1d95] font-medium">
                          {contract.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant="secondary"
                            className="bg-[#f5f3ff] text-[#705add] border border-[#ede9fe] text-xs"
                          >
                            {contract.id}
                          </Badge>
                          <span className="text-xs text-[#8b5cf6]">
                            {contract.businessUnit}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="text-sm text-gray-900">
                          {contract.customer}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback className="bg-gradient-to-br from-[#a78bfa] to-[#705add] text-white text-xs">
                              {contract.owner.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-gray-600">
                            {contract.owner.name}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-900 font-medium">
                        {contract.value}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-[#8b5cf6]" />
                          <span className="text-sm text-gray-700">
                            {new Date(contract.startDate).toLocaleDateString(
                              "th-TH",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-[#705add]" />
                          <span className="text-sm text-gray-700">
                            {new Date(contract.endDate).toLocaleDateString(
                              "th-TH",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                        {isExpiringSoon(contract.endDate) && (
                          <Badge
                            variant="secondary"
                            className="bg-orange-100 text-orange-700 border border-orange-200 text-xs"
                          >
                            {t("contracts.expiring_soon")}
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-sm font-semibold ${getUtilizationColor(
                              contract.utilization
                            )}`}
                          >
                            {contract.utilization}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              contract.utilization >= 80
                                ? "bg-red-500"
                                : contract.utilization >= 50
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`}
                            style={{ width: `${contract.utilization}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge
                        variant="secondary"
                        className={`${getStatusColor(contract.status)} rounded-lg`}
                      >
                        {getStatusText(contract.status)}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t-2 border-[#ede9fe] bg-gradient-to-r from-[#faf8ff] to-white">
            <p className="text-sm text-[#8b5cf6]">
              แสดง{" "}
              <span className="font-medium text-[#4c1d95]">
                1-{filteredContracts.length}
              </span>{" "}
              จาก{" "}
              <span className="font-medium text-[#4c1d95]">{totalContracts}</span>{" "}
              สัญญา
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-2 border-[#ede9fe] text-[#4c1d95] hover:bg-[#f5f3ff] rounded-xl"
              >
                ก่อนหน้า
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-2 border-[#ede9fe] text-[#4c1d95] hover:bg-[#f5f3ff] rounded-xl"
              >
                ถัดไป
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

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
            description: "Created contract \"International Air Freight Services Agreement\"",
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