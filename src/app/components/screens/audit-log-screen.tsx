import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Shield,
  Search,
  Download,
  Filter,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  FileText,
  Key,
  Settings,
  Plus,
  Check,
  X,
  LogIn,
  LogOut,
  Upload,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { advancedMockData, getMockAuditLogs } from "../../../data/advancedMockData";
import { extendedMasterData } from "../../../data/extendedMasterData";

interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  entity: string;
  entityId: string;
  details: string;
  ipAddress: string;
  userAgent: string;
  status: "success" | "failed";
}

export function AuditLogScreen() {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAction, setFilterAction] = useState("all");
  const [filterEntity, setFilterEntity] = useState("all");
  const [filterUser, setFilterUser] = useState("all");

  // Use mock data
  const auditLogs = advancedMockData.auditLogs;
  const users = advancedMockData.users;

  const getActionIcon = (action: string) => {
    switch (action) {
      case "CREATE":
        return <UserPlus className="h-4 w-4 text-[#10b981]" />;
      case "UPDATE":
        return <Edit className="h-4 w-4 text-[#3b82f6]" />;
      case "DELETE":
        return <Trash2 className="h-4 w-4 text-[#ef4444]" />;
      case "LOGIN":
        return <Key className="h-4 w-4 text-[#8b5cf6]" />;
      case "EXPORT":
        return <Download className="h-4 w-4 text-[#f59e0b]" />;
      default:
        return <FileText className="h-4 w-4 text-[#6b7280]" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "CREATE":
        return "bg-[#dcfce7] text-[#166534] border-[#86efac]";
      case "UPDATE":
        return "bg-[#dbeafe] text-[#1e40af] border-[#93c5fd]";
      case "DELETE":
        return "bg-[#fee2e2] text-[#991b1b] border-[#fca5a5]";
      case "LOGIN":
        return "bg-[#f3e8ff] text-[#6b21a8] border-[#d8b4fe]";
      case "EXPORT":
        return "bg-[#fef3c7] text-[#92400e] border-[#fcd34d]";
      default:
        return "bg-[#f3f4f6] text-[#4b5563] border-[#d1d5db]";
    }
  };

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      (log.userName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.entityType || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.entityId || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.entityName || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAction = filterAction === "all" || log.action === filterAction;
    const matchesEntity = filterEntity === "all" || log.entityType === filterEntity;
    const matchesUser = filterUser === "all" || log.userName === filterUser;

    return matchesSearch && matchesAction && matchesEntity && matchesUser;
  });

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-[#4c1d95] font-semibold flex items-center gap-2">
              <Shield className="h-6 w-6 text-[#705add]" />
              {t("audit.title")}
            </h1>
            <p className="text-[#9333ea] mt-1">{t("audit.subtitle")}</p>
          </div>
          <Button className="bg-[#705add] text-white hover:bg-[#5b21b6] rounded-xl gap-2">
            <Download className="h-4 w-4" />
            {t("audit.export")}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-2 border-[#ede9fe] shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#9333ea] mb-1">
                    {t("audit.total_events")}
                  </p>
                  <p className="text-2xl font-bold text-[#4c1d95]">
                    {auditLogs.length}
                  </p>
                </div>
                <div className="h-12 w-12 bg-[#f5f3ff] rounded-xl flex items-center justify-center">
                  <FileText className="h-6 w-6 text-[#705add]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#ede9fe] shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#9333ea] mb-1">
                    {t("audit.today")}
                  </p>
                  <p className="text-2xl font-bold text-[#4c1d95]">247</p>
                </div>
                <div className="h-12 w-12 bg-[#dbeafe] rounded-xl flex items-center justify-center">
                  <Shield className="h-6 w-6 text-[#1e40af]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#ede9fe] shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#9333ea] mb-1">
                    {t("audit.failed_attempts")}
                  </p>
                  <p className="text-2xl font-bold text-[#ef4444]">12</p>
                </div>
                <div className="h-12 w-12 bg-[#fee2e2] rounded-xl flex items-center justify-center">
                  <Key className="h-6 w-6 text-[#991b1b]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#ede9fe] shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#9333ea] mb-1">
                    {t("audit.active_users")}
                  </p>
                  <p className="text-2xl font-bold text-[#4c1d95]">45</p>
                </div>
                <div className="h-12 w-12 bg-[#dcfce7] rounded-xl flex items-center justify-center">
                  <UserPlus className="h-6 w-6 text-[#166534]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-2 border-[#ede9fe] shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a78bfa]" />
                <Input
                  placeholder={t("audit.search_placeholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-2 border-[#ede9fe] rounded-xl"
                />
              </div>
              <Select value={filterAction} onValueChange={setFilterAction}>
                <SelectTrigger className="w-48 border-2 border-[#ede9fe] rounded-xl">
                  <SelectValue placeholder={t("audit.filter_action")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("audit.all_actions")}</SelectItem>
                  <SelectItem value="CREATE">CREATE</SelectItem>
                  <SelectItem value="UPDATE">UPDATE</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                  <SelectItem value="LOGIN">LOGIN</SelectItem>
                  <SelectItem value="EXPORT">EXPORT</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterEntity} onValueChange={setFilterEntity}>
                <SelectTrigger className="w-48 border-2 border-[#ede9fe] rounded-xl">
                  <SelectValue placeholder={t("audit.filter_entity")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("audit.all_entities")}</SelectItem>
                  <SelectItem value="Deal">Deal</SelectItem>
                  <SelectItem value="Customer">Customer</SelectItem>
                  <SelectItem value="Quotation">Quotation</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="User">User</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterUser} onValueChange={setFilterUser}>
                <SelectTrigger className="w-48 border-2 border-[#ede9fe] rounded-xl">
                  <SelectValue placeholder={t("audit.filter_user")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("audit.all_users")}</SelectItem>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={`${user.firstName} ${user.lastName}`}>
                      {user.firstName} {user.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Audit Log Table */}
        <Card className="border-2 border-[#ede9fe] shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#faf8ff] hover:bg-[#faf8ff]">
                  <TableHead className="text-[#4c1d95] font-semibold">
                    {t("audit.timestamp")}
                  </TableHead>
                  <TableHead className="text-[#4c1d95] font-semibold">
                    {t("audit.user")}
                  </TableHead>
                  <TableHead className="text-[#4c1d95] font-semibold">
                    {t("audit.action")}
                  </TableHead>
                  <TableHead className="text-[#4c1d95] font-semibold">
                    {t("audit.entity")}
                  </TableHead>
                  <TableHead className="text-[#4c1d95] font-semibold">
                    {t("audit.details")}
                  </TableHead>
                  <TableHead className="text-[#4c1d95] font-semibold">
                    {t("audit.ip_address")}
                  </TableHead>
                  <TableHead className="text-[#4c1d95] font-semibold">
                    {t("audit.status")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow
                    key={log.id}
                    className="hover:bg-[#faf8ff] cursor-pointer"
                  >
                    <TableCell className="text-[#9333ea] text-sm">
                      {log.timestamp}
                    </TableCell>
                    <TableCell className="text-[#4c1d95] font-medium">
                      {log.userName}
                    </TableCell>
                    <TableCell>
                      <Badge className={getActionColor(log.action)}>
                        <span className="mr-1">{getActionIcon(log.action)}</span>
                        {log.action}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-[#f5f3ff] text-[#705add] border-[#ede9fe]">
                        {log.entityType}
                      </Badge>
                      <span className="text-xs text-[#a78bfa] ml-2">
                        {log.entityId}
                      </span>
                    </TableCell>
                    <TableCell className="text-[#6b7280] text-sm max-w-md truncate">
                      {log.entityName || "N/A"}
                    </TableCell>
                    <TableCell className="text-[#9333ea] text-sm">
                      {log.ipAddress}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className="bg-[#dcfce7] text-[#166534] border-[#86efac]"
                      >
                        success
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#9333ea]">
            {t("audit.showing")} {filteredLogs.length} {t("audit.of")}{" "}
            {auditLogs.length} {t("audit.entries")}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-2 border-[#ede9fe] text-[#705add] hover:bg-[#f5f3ff] rounded-lg"
            >
              {t("common.previous")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-2 border-[#ede9fe] text-[#705add] hover:bg-[#f5f3ff] rounded-lg"
            >
              {t("common.next")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}