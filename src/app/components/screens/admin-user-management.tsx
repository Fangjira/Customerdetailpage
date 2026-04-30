import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Users,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  UserCheck,
  UserX,
  Shield,
  Building2,
} from "lucide-react";
import { Button } from "../ui/button";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface User {
  id: string;
  name: string;
  email: string;
  role: "Sales Representative" | "Sales Manager" | "Sales Director" | "Admin" | "Support" | "Finance";
  businessUnit: string;
  team: string;
  status: "active" | "inactive";
  lastLogin: Date;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "สมชาย ใจดี",
    email: "somchai@company.com",
    role: "Sales Representative",
    businessUnit: "BU-North",
    team: "Team A",
    status: "active",
    lastLogin: new Date("2024-03-20T10:30:00"),
  },
  {
    id: "2",
    name: "สมหญิง รักษ์ดี",
    email: "somying@company.com",
    role: "Sales Manager",
    businessUnit: "BU-Central",
    team: "Team B",
    status: "active",
    lastLogin: new Date("2024-03-22T14:20:00"),
  },
  {
    id: "3",
    name: "วิชัย ประสิทธิ์",
    email: "wichai@company.com",
    role: "Admin",
    businessUnit: "HQ",
    team: "IT Team",
    status: "active",
    lastLogin: new Date("2024-03-24T09:15:00"),
  },
  {
    id: "4",
    name: "นภา สุขใจ",
    email: "napa@company.com",
    role: "Sales Representative",
    businessUnit: "BU-South",
    team: "Team C",
    status: "inactive",
    lastLogin: new Date("2024-03-10T16:45:00"),
  },
];

export function AdminUserManagement() {
  const { t, i18n } = useTranslation();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Sales Representative":
        return "bg-green-100 text-green-700 border-green-200";
      case "Sales Manager":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Sales Director":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "Admin":
        return "bg-red-100 text-red-700 border-red-200";
      case "Support":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "Finance":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === "active") {
      return (
        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 border">
          <UserCheck className="h-3 w-3 mr-1" />
          {i18n.language === "th" ? "ใช้งานอยู่" : "Active"}
        </Badge>
      );
    }
    return (
      <Badge className="bg-red-100 text-red-700 border-red-200 border">
        <UserX className="h-3 w-3 mr-1" />
        {i18n.language === "th" ? "ระงับ" : "Inactive"}
      </Badge>
    );
  };

  const handleCreateUser = () => {
    setShowCreateDialog(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setShowEditDialog(true);
  };

  const handleDeactivateUser = (userId: string) => {
    if (confirm(i18n.language === "th" ? "ยืนยันการระงับผู้ใช้?" : "Confirm deactivate user?")) {
      setUsers(users.map(u => u.id === userId ? { ...u, status: "inactive" } : u));
    }
  };

  const handleActivateUser = (userId: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: "active" } : u));
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-md">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {t("nav.user_management")}
              </h1>
              <p className="text-sm text-gray-500">
                {i18n.language === "th" ? "จัดการผู้ใช้งานในระบบ" : "Manage system users"}
              </p>
            </div>
          </div>
          <Button
            onClick={handleCreateUser}
            className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-6"
          >
            <Plus className="h-4 w-4 mr-2" />
            {i18n.language === "th" ? "สร้างผู้ใช้ใหม่" : "Create User"}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder={i18n.language === "th" ? "ค้นหาชื่อหรืออีเมล..." : "Search name or email..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-gray-300 focus:border-red-500 focus:ring-red-500/20"
            />
          </div>
          <Select value={filterRole} onValueChange={setFilterRole}>
            <SelectTrigger className="w-full sm:w-48 border-gray-300">
              <SelectValue placeholder={i18n.language === "th" ? "บทบาท" : "Role"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{i18n.language === "th" ? "บทบาททั้งหมด" : "All Roles"}</SelectItem>
              <SelectItem value="Sales Representative">Sales Rep</SelectItem>
              <SelectItem value="Sales Manager">Manager</SelectItem>
              <SelectItem value="Sales Director">Director</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Support">Support</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-48 border-gray-300">
              <SelectValue placeholder={i18n.language === "th" ? "สถานะ" : "Status"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{i18n.language === "th" ? "สถานะทั้งหมด" : "All Status"}</SelectItem>
              <SelectItem value="active">{i18n.language === "th" ? "ใช้งานอยู่" : "Active"}</SelectItem>
              <SelectItem value="inactive">{i18n.language === "th" ? "ระงับ" : "Inactive"}</SelectItem>
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
                  {i18n.language === "th" ? "ชื่อ" : "Name"}
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  {i18n.language === "th" ? "อีเมล" : "Email"}
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  {i18n.language === "th" ? "บทบาท" : "Role"}
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  {i18n.language === "th" ? "หน่วยธุรกิจ" : "Business Unit"}
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  {i18n.language === "th" ? "ทีม" : "Team"}
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  {i18n.language === "th" ? "สถานะ" : "Status"}
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  {i18n.language === "th" ? "เข้าใช้ล่าสุด" : "Last Login"}
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-right">
                  {i18n.language === "th" ? "จัดการ" : "Actions"}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50 border-b border-gray-100">
                  <TableCell className="font-medium text-gray-900">{user.name}</TableCell>
                  <TableCell className="text-gray-600">{user.email}</TableCell>
                  <TableCell>
                    <Badge className={`${getRoleBadgeColor(user.role)} border text-xs`}>
                      <Shield className="h-3 w-3 mr-1" />
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-3.5 w-3.5 text-gray-400" />
                      {user.businessUnit}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{user.team}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell className="text-gray-600 text-sm">
                    {user.lastLogin.toLocaleString(i18n.language === "th" ? "th-TH" : "en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditUser(user)}
                        className="border-gray-300 text-gray-700 hover:bg-gray-100"
                      >
                        <Edit className="h-3.5 w-3.5 mr-1" />
                        {i18n.language === "th" ? "แก้ไข" : "Edit"}
                      </Button>
                      {user.status === "active" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeactivateUser(user.id)}
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <UserX className="h-3.5 w-3.5 mr-1" />
                          {i18n.language === "th" ? "ระงับ" : "Deactivate"}
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleActivateUser(user.id)}
                          className="border-green-200 text-green-600 hover:bg-green-50"
                        >
                          <UserCheck className="h-3.5 w-3.5 mr-1" />
                          {i18n.language === "th" ? "เปิดใช้" : "Activate"}
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={showCreateDialog || showEditDialog} onOpenChange={(open) => {
        if (!open) {
          setShowCreateDialog(false);
          setShowEditDialog(false);
          setSelectedUser(null);
        }
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl text-gray-900">
              {showEditDialog
                ? (i18n.language === "th" ? "แก้ไขผู้ใช้" : "Edit User")
                : (i18n.language === "th" ? "สร้างผู้ใช้ใหม่" : "Create New User")}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-700">
                  {i18n.language === "th" ? "ชื่อ" : "Name"} <span className="text-red-500">*</span>
                </Label>
                <Input
                  defaultValue={selectedUser?.name}
                  placeholder={i18n.language === "th" ? "ชื่อผู้ใช้" : "User name"}
                  className="border-gray-300 focus:border-red-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700">
                  {i18n.language === "th" ? "อีเมล" : "Email"} <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="email"
                  defaultValue={selectedUser?.email}
                  placeholder="user@company.com"
                  className="border-gray-300 focus:border-red-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-700">
                  {i18n.language === "th" ? "บทบาท" : "Role"} <span className="text-red-500">*</span>
                </Label>
                <Select defaultValue={selectedUser?.role || "Sales Representative"}>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sales Representative">Sales Representative</SelectItem>
                    <SelectItem value="Sales Manager">Sales Manager</SelectItem>
                    <SelectItem value="Sales Director">Sales Director</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Support">Support</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700">
                  {i18n.language === "th" ? "หน่วยธุรกิจ" : "Business Unit"} <span className="text-red-500">*</span>
                </Label>
                <Select defaultValue={selectedUser?.businessUnit || "BU-Central"}>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HQ">HQ</SelectItem>
                    <SelectItem value="BU-North">BU-North</SelectItem>
                    <SelectItem value="BU-Central">BU-Central</SelectItem>
                    <SelectItem value="BU-South">BU-South</SelectItem>
                    <SelectItem value="BU-East">BU-East</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-700">
                {i18n.language === "th" ? "ทีม" : "Team"} <span className="text-red-500">*</span>
              </Label>
              <Input
                defaultValue={selectedUser?.team}
                placeholder={i18n.language === "th" ? "ชื่อทีม" : "Team name"}
                className="border-gray-300 focus:border-red-500"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowCreateDialog(false);
                setShowEditDialog(false);
                setSelectedUser(null);
              }}
              className="border-gray-300"
            >
              {t("common.cancel")}
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => {
                console.log("Save user");
                setShowCreateDialog(false);
                setShowEditDialog(false);
                setSelectedUser(null);
              }}
            >
              {t("common.save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
