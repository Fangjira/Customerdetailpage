import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  History,
  Search,
  Filter,
  User,
  Building2,
  FileText,
  Edit,
  Trash2,
  UserPlus,
  GitBranch,
  Calendar,
} from "lucide-react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface AuditLog {
  id: string;
  timestamp: Date;
  user: string;
  action: string;
  target: string;
  details: string;
  ipAddress: string;
}

const mockLogs: AuditLog[] = [
  {
    id: "1",
    timestamp: new Date("2024-03-24T14:30:00"),
    user: "วิชัย ประสิทธิ์",
    action: "transfer_customer",
    target: "บริษัท ABC จำกัด",
    details: "โอนลูกค้าจาก สมชาย ใจดี ไปยัง สมหญิง รักษ์ดี",
    ipAddress: "192.168.1.100",
  },
  {
    id: "2",
    timestamp: new Date("2024-03-24T13:15:00"),
    user: "วิชัย ประสิทธิ์",
    action: "create_user",
    target: "นภา สุขใจ",
    details: "สร้างผู้ใช้ใหม่ บทบาท: Sales Representative",
    ipAddress: "192.168.1.100",
  },
  {
    id: "3",
    timestamp: new Date("2024-03-24T11:45:00"),
    user: "สมหญิง รักษ์ดี",
    action: "edit_customer",
    target: "บริษัท XYZ จำกัด",
    details: "แก้ไขข้อมูลลูกค้า: อัพเดทสถานะเป็น Active",
    ipAddress: "192.168.1.105",
  },
  {
    id: "4",
    timestamp: new Date("2024-03-24T10:20:00"),
    user: "วิชัย ประสิทธิ์",
    action: "deactivate_user",
    target: "ประเสริฐ สุขดี",
    details: "ระงับผู้ใช้",
    ipAddress: "192.168.1.100",
  },
  {
    id: "5",
    timestamp: new Date("2024-03-23T16:30:00"),
    user: "สมชาย ใจดี",
    action: "create_deal",
    target: "ดีล #D2024-0245",
    details: "สร้างดีลใหม่ มูลค่า 5,000,000 บาท",
    ipAddress: "192.168.1.102",
  },
  {
    id: "6",
    timestamp: new Date("2024-03-23T15:10:00"),
    user: "สมหญิง รักษ์ดี",
    action: "approve_request",
    target: "คำขอโอนลูกค้า #R-001",
    details: "อนุมัติคำขอโอนลูกค้า",
    ipAddress: "192.168.1.105",
  },
];

export function AdminAuditLog() {
  const { t, i18n } = useTranslation();
  const [logs] = useState<AuditLog[]>(mockLogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAction, setFilterAction] = useState<string>("all");
  const [filterUser, setFilterUser] = useState<string>("all");

  const getActionIcon = (action: string) => {
    switch (action) {
      case "create_user":
        return <UserPlus className="h-4 w-4" />;
      case "edit_customer":
        return <Edit className="h-4 w-4" />;
      case "deactivate_user":
        return <Trash2 className="h-4 w-4" />;
      case "transfer_customer":
        return <GitBranch className="h-4 w-4" />;
      case "create_deal":
        return <FileText className="h-4 w-4" />;
      case "approve_request":
        return <Calendar className="h-4 w-4" />;
      default:
        return <History className="h-4 w-4" />;
    }
  };

  const getActionBadge = (action: string) => {
    const actionMap: Record<string, { color: string; label: string; labelEn: string }> = {
      create_user: { color: "bg-green-100 text-green-700 border-green-200", label: "สร้างผู้ใช้", labelEn: "Create User" },
      edit_customer: { color: "bg-blue-100 text-blue-700 border-blue-200", label: "แก้ไขลูกค้า", labelEn: "Edit Customer" },
      deactivate_user: { color: "bg-red-100 text-red-700 border-red-200", label: "ระงับผู้ใช้", labelEn: "Deactivate User" },
      transfer_customer: { color: "bg-purple-100 text-purple-700 border-purple-200", label: "โอนลูกค้า", labelEn: "Transfer Customer" },
      create_deal: { color: "bg-emerald-100 text-emerald-700 border-emerald-200", label: "สร้างดีล", labelEn: "Create Deal" },
      approve_request: { color: "bg-yellow-100 text-yellow-700 border-yellow-200", label: "อนุมัติคำขอ", labelEn: "Approve Request" },
    };

    const actionInfo = actionMap[action] || { color: "bg-gray-100 text-gray-700 border-gray-200", label: action, labelEn: action };

    return (
      <Badge className={`${actionInfo.color} border text-xs`}>
        {getActionIcon(action)}
        <span className="ml-1">{i18n.language === "th" ? actionInfo.label : actionInfo.labelEn}</span>
      </Badge>
    );
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = filterAction === "all" || log.action === filterAction;
    const matchesUser = filterUser === "all" || log.user === filterUser;
    return matchesSearch && matchesAction && matchesUser;
  });

  const uniqueUsers = Array.from(new Set(logs.map(log => log.user)));

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-md">
            <History className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {t("nav.audit_log")}
            </h1>
            <p className="text-sm text-gray-500">
              {i18n.language === "th" ? "ประวัติการเปลี่ยนแปลงและการดำเนินการในระบบ" : "System activity and change history"}
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder={i18n.language === "th" ? "ค้นหาผู้ใช้, เป้าหมาย, หรือรายละเอียด..." : "Search user, target, or details..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-gray-300 focus:border-red-500 focus:ring-red-500/20"
            />
          </div>
          <Select value={filterAction} onValueChange={setFilterAction}>
            <SelectTrigger className="w-full sm:w-48 border-gray-300">
              <SelectValue placeholder={i18n.language === "th" ? "การกระทำ" : "Action"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{i18n.language === "th" ? "การกระทำทั้งหมด" : "All Actions"}</SelectItem>
              <SelectItem value="create_user">{i18n.language === "th" ? "สร้างผู้ใช้" : "Create User"}</SelectItem>
              <SelectItem value="edit_customer">{i18n.language === "th" ? "แก้ไขลูกค้า" : "Edit Customer"}</SelectItem>
              <SelectItem value="deactivate_user">{i18n.language === "th" ? "ระงับผู้ใช้" : "Deactivate User"}</SelectItem>
              <SelectItem value="transfer_customer">{i18n.language === "th" ? "โอนลูกค้า" : "Transfer Customer"}</SelectItem>
              <SelectItem value="create_deal">{i18n.language === "th" ? "สร้างดีล" : "Create Deal"}</SelectItem>
              <SelectItem value="approve_request">{i18n.language === "th" ? "อนุมัติคำขอ" : "Approve Request"}</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterUser} onValueChange={setFilterUser}>
            <SelectTrigger className="w-full sm:w-48 border-gray-300">
              <SelectValue placeholder={i18n.language === "th" ? "ผู้ใช้" : "User"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{i18n.language === "th" ? "ผู้ใช้ทั้งหมด" : "All Users"}</SelectItem>
              {uniqueUsers.map(user => (
                <SelectItem key={user} value={user}>{user}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto px-6 py-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 border-b border-gray-200">
                <TableHead className="font-semibold text-gray-700">
                  {i18n.language === "th" ? "เวลา" : "Timestamp"}
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  {i18n.language === "th" ? "ผู้ใช้" : "User"}
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  {i18n.language === "th" ? "การกระทำ" : "Action"}
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  {i18n.language === "th" ? "เป้าหมาย" : "Target"}
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  {i18n.language === "th" ? "รายละเอียด" : "Details"}
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  IP Address
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id} className="hover:bg-gray-50 border-b border-gray-100">
                  <TableCell className="text-gray-600 text-sm whitespace-nowrap">
                    {log.timestamp.toLocaleString(i18n.language === "th" ? "th-TH" : "en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      {log.user}
                    </div>
                  </TableCell>
                  <TableCell>{getActionBadge(log.action)}</TableCell>
                  <TableCell className="text-gray-900">{log.target}</TableCell>
                  <TableCell className="text-gray-600 text-sm max-w-md">{log.details}</TableCell>
                  <TableCell className="text-gray-500 text-sm font-mono">{log.ipAddress}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
