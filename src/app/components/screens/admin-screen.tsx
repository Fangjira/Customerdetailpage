import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IntegrationsScreen } from "./integrations-screen";
import { SystemSettingsTabV3 as SystemSettingsTab } from "./system-settings-tab-v3";
import { ApprovalWorkflowsTab } from "./approval-workflows-tab";
import { DataAccessControlTab } from "./data-access-control-tab";
import { AuditLogScreen } from "./audit-log-screen";
import { DocumentsScreen } from "./documents-screen";
import { HistoryMenu } from "../history-menu";
import { useRoleTheme } from "../../hooks/use-role-theme";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Users,
  Building2,
  Settings,
  Shield,
  CheckCircle2,
  XCircle,
  Search,
  Plus,
  Edit,
  Trash2,
  GitBranch,
  FolderOpen,
  Link2,
} from "lucide-react";

interface AdminScreenProps {
  currentPath?: string;
}

export function AdminScreen({ currentPath }: AdminScreenProps) {
  console.log("🔵 AdminScreen rendered", { currentPath });
  
  const { t } = useTranslation();
  const roleTheme = useRoleTheme();
  const [isCreateUserDialogOpen, setIsCreateUserDialogOpen] = useState(false);
  const [isCreateBUDialogOpen, setIsCreateBUDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [isEditBUDialogOpen, setIsEditBUDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedBU, setSelectedBU] = useState<any>(null);
  const [searchUser, setSearchUser] = useState("");
  const [searchBU, setSearchBU] = useState("");
  
  // Extract tab from currentPath query parameter
  const getActiveTab = () => {
    if (!currentPath) return "users";
    
    const urlParams = new URLSearchParams(currentPath.split('?')[1] || '');
    const tab = urlParams.get('tab');
    console.log("🟡 AdminScreen: extracted tab =", tab);
    
    return tab || "users";
  };
  
  const [activeTab, setActiveTab] = useState(getActiveTab());
  
  // Update tab when currentPath changes
  useEffect(() => {
    const newTab = getActiveTab();
    console.log("🟢 AdminScreen: setting active tab to", newTab);
    setActiveTab(newTab);
  }, [currentPath]);

  // Mock user data
  const users = [
    {
      id: "1",
      name: "Sarah Chen",
      email: "sarah.chen@nexus.com",
      role: "Sales Manager",
      businessUnit: "Air Freight",
      status: "Active",
      lastLogin: "2024-12-24 10:30",
      phone: "+1 (555) 123-4567",
    },
    {
      id: "2",
      name: "Michael Wong",
      email: "michael.wong@nexus.com",
      role: "Sales Representative",
      businessUnit: "Sea Freight",
      status: "Active",
      lastLogin: "2024-12-24 09:15",
      phone: "+1 (555) 234-5678",
    },
    {
      id: "3",
      name: "Jessica Taylor",
      email: "jessica.taylor@nexus.com",
      role: "Sales Representative",
      businessUnit: "Air Freight",
      status: "Active",
      lastLogin: "2024-12-23 16:45",
      phone: "+1 (555) 345-6789",
    },
    {
      id: "4",
      name: "David Kim",
      email: "david.kim@nexus.com",
      role: "Sales Representative",
      businessUnit: "Logistics Solutions",
      status: "Active",
      lastLogin: "2024-12-24 08:00",
      phone: "+1 (555) 456-7890",
    },
    {
      id: "5",
      name: "Lisa Anderson",
      email: "lisa.anderson@nexus.com",
      role: "Admin",
      businessUnit: "Administration",
      status: "Active",
      lastLogin: "2024-12-24 11:00",
      phone: "+1 (555) 567-8901",
    },
    {
      id: "6",
      name: "Robert Johnson",
      email: "robert.johnson@nexus.com",
      role: "Sales Manager",
      businessUnit: "Finance",
      status: "Inactive",
      lastLogin: "2024-12-20 15:30",
      phone: "+1 (555) 678-9012",
    },
  ];

  // Mock business unit data
  const businessUnits = [
    {
      id: "1",
      code: "COM",
      name: "Commodity Business",
      nameTh: "ธุรกิจสินค้าโภคภัณฑ์",
      description: "Sourcing, Jumbo Barges, Cement, Packaging, Steels",
      descriptionTh: "จัดหา เรือบาร์จ ปูนซีเมนต์ บรรจุภัณฑ์ เหล็ก",
      manager: "Sarah Chen",
      users: 8,
      activeDeals: 24,
      status: "Active",
      hierarchyLevel: "N-2",
      department: "Multiple Departments",
    },
    {
      id: "2",
      code: "CMO",
      name: "Commercial Office",
      nameTh: "สำนักการพาณิชย์",
      description: "Sales, Marketing, E2E, BD Domestics, PMO",
      descriptionTh: "ฝ่ายขาย การตลาด E2E และ PMO",
      manager: "Michael Wong",
      users: 6,
      activeDeals: 18,
      status: "Active",
      hierarchyLevel: "N-2/N-3",
      department: "Sales and Marketing",
    },
    {
      id: "3",
      code: "JTS",
      name: "JTS",
      nameTh: "เจทีเอส",
      description: "Transport and Warehouse Operations",
      descriptionTh: "ปฏิบัติการขนส่งและคลังสินค้า",
      manager: "David Kim",
      users: 2,
      activeDeals: 15,
      status: "Active",
      hierarchyLevel: "N-2",
      department: "Transport Operations",
    },
    {
      id: "4",
      code: "ASEAN",
      name: "ASEAN Island Countries and Taiwan Business",
      nameTh: "ธุรกิจประเทศเกาะอาเซียนและไต้หวัน",
      description: "Indonesia, Philippines, Taiwan Business Execution",
      descriptionTh: "อินโดนีเซีย ฟิลิปปินส์ ไต้หวัน",
      manager: "Emily Zhang",
      users: 5,
      activeDeals: 12,
      status: "Active",
      hierarchyLevel: "N-2/N-3",
      department: "Business Execution",
    },
    {
      id: "5",
      code: "AUTO",
      name: "Automotive Business",
      nameTh: "ธุรกิจยานยนต์",
      description: "Autologic, Auto Business, Aftersales Services",
      descriptionTh: "ออโตโลจิก ธุรกิจรถยนต์ บริการหลังการขาย",
      manager: "Robert Johnson",
      users: 7,
      activeDeals: 20,
      status: "Active",
      hierarchyLevel: "N-2/N-3",
      department: "Autologic",
    },
    {
      id: "6",
      code: "B2B2C",
      name: "B2B2C Business",
      nameTh: "ธุรกิจ B2B2C",
      description: "E&E, FOOD, FMCG, Home Living, Agriculture",
      descriptionTh: "อิเล็กทรอนิกส์ อาหาร FMCG เฟอร์นิเจอร์ เกษตร",
      manager: "Lisa Anderson",
      users: 14,
      activeDeals: 35,
      status: "Active",
      hierarchyLevel: "N-2",
      department: "Multiple Departments",
    },
    {
      id: "7",
      code: "CLMV",
      name: "CLMV and China Business",
      nameTh: "ธุรกิจ CLMV และจีน",
      description: "Cambodia, Laos, Myanmar, Vietnam, China operations",
      descriptionTh: "กัมพูชา ลาว เมียนมา เวียดนาม จีน",
      manager: "Not Assigned",
      users: 0,
      activeDeals: 0,
      status: "Inactive",
      hierarchyLevel: "N-2",
      department: "-",
    },
    {
      id: "8",
      code: "COLD",
      name: "Cold Chain",
      nameTh: "โซ่ความเย็น",
      description: "Temperature-controlled logistics and storage",
      descriptionTh: "โลจิสติกส์และคลังสินค้าควบคุมอุณหภูมิ",
      manager: "Jessica Taylor",
      users: 3,
      activeDeals: 8,
      status: "Active",
      hierarchyLevel: "N-2/N-3",
      department: "Management",
    },
    {
      id: "9",
      code: "FREIGHT",
      name: "Freight Business",
      nameTh: "ธุรกิจขนส่งสินค้า",
      description: "International and domestic freight forwarding",
      descriptionTh: "ขนส่งสินค้าระหว่างประเทศและภายในประเทศ",
      manager: "Not Assigned",
      users: 0,
      activeDeals: 0,
      status: "Inactive",
      hierarchyLevel: "N-2",
      department: "-",
    },
    {
      id: "10",
      code: "HEALTH",
      name: "Healthcare and Pharmaceutical Business",
      nameTh: "ธุรกิจสุขภาพและเภสัชกรรม",
      description: "Healthcare logistics, Centralized Warehouse",
      descriptionTh: "โจิสติกส์ด้านสุขภาพ คลังสินค้ารวม",
      manager: "Sarah Chen",
      users: 5,
      activeDeals: 10,
      status: "Active",
      hierarchyLevel: "N-2/N-3",
      department: "Business Development",
    },
  ];

  const roles = [
    { value: "admin", label: "Administrator" },
    { value: "sales_manager", label: "Sales Manager" },
    { value: "sales_rep", label: "Sales Representative" },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
      user.email.toLowerCase().includes(searchUser.toLowerCase()) ||
      user.role.toLowerCase().includes(searchUser.toLowerCase())
  );

  const filteredBUs = businessUnits.filter(
    (bu) =>
      bu.name.toLowerCase().includes(searchBU.toLowerCase()) ||
      bu.code.toLowerCase().includes(searchBU.toLowerCase()) ||
      bu.nameTh.includes(searchBU)
  );

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setIsEditUserDialogOpen(true);
  };

  const handleEditBU = (bu: any) => {
    setSelectedBU(bu);
    setIsEditBUDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    if (status === "Active") {
      return (
        <Badge className="bg-green-100 text-green-700 border border-green-200">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          {t("admin.active")}
        </Badge>
      );
    }
    return (
      <Badge className="bg-gray-100 text-gray-700 border border-gray-200">
        <XCircle className="h-3 w-3 mr-1" />
        {t("admin.inactive")}
      </Badge>
    );
  };

  const getRoleBadge = (role: string) => {
    const roleColors: Record<string, string> = {
      "Admin": "bg-red-100 text-red-700 border-red-200",
      "Sales Manager": "bg-blue-100 text-blue-700 border-blue-200",
      "Sales Representative": "bg-green-100 text-green-700 border-green-200",
    };

    const colorClass = roleColors[role] || "bg-gray-100 text-gray-700 border-gray-200";

    return (
      <Badge variant="outline" className={colorClass}>
        {role}
      </Badge>
    );
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-[#4c1d95] flex items-center gap-3">
            <Settings className="h-7 w-7" style={{ color: roleTheme.primary }} />
            {t("admin.system_management")}
          </h1>
          <p className="text-sm mt-1" style={{ color: roleTheme.textColor }}>
            {t("admin.manage_users_and_settings")}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="border-2 border-[#ede9fe] shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-[#a78bfa] to-[#705add] rounded-xl shadow-md">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs" style={{ color: roleTheme.textColor }}>{t("admin.total_users")}</p>
                <p className="text-xl text-[#4c1d95] font-semibold">
                  {users.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#ede9fe] shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div 
                className="p-3 rounded-xl shadow-md"
                style={{
                  background: `linear-gradient(to bottom right, ${roleTheme.light}, ${roleTheme.primary})`
                }}
              >
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs" style={{ color: roleTheme.textColor }}>{t("admin.active_users")}</p>
                <p className="text-xl text-[#4c1d95] font-semibold">
                  {users.filter((u) => u.status === "Active").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#ede9fe] shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-[#f59e0b] to-[#d97706] rounded-xl shadow-md">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs" style={{ color: roleTheme.textColor }}>{t("admin.business_units")}</p>
                <p className="text-xl text-[#4c1d95] font-semibold">
                  {businessUnits.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#ede9fe] shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div 
                className="p-3 rounded-xl shadow-md"
                style={{
                  background: `linear-gradient(to bottom right, ${roleTheme.light}, ${roleTheme.primary})`
                }}
              >
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs" style={{ color: roleTheme.textColor }}>{t("admin.roles")}</p>
                <p className="text-xl text-[#4c1d95] font-semibold">
                  {roles.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-white border-2 border-[#ede9fe] p-1 rounded-xl">
          <TabsTrigger
            value="users"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#a78bfa] data-[state=active]:to-[#705add] data-[state=active]:text-white rounded-lg"
          >
            <Users className="h-4 w-4 mr-2" />
            {t("admin.user_management")}
          </TabsTrigger>
          <TabsTrigger
            value="business-units"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#a78bfa] data-[state=active]:to-[#705add] data-[state=active]:text-white rounded-lg"
          >
            <Building2 className="h-4 w-4 mr-2" />
            {t("admin.business_units")}
          </TabsTrigger>
          <TabsTrigger
            value="approval-workflows"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#a78bfa] data-[state=active]:to-[#705add] data-[state=active]:text-white rounded-lg"
          >
            <GitBranch className="h-4 w-4 mr-2" />
            {t("common.approval_workflows")}
          </TabsTrigger>
          <TabsTrigger
            value="data-access"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#a78bfa] data-[state=active]:to-[#705add] data-[state=active]:text-white rounded-lg"
          >
            <Shield className="h-4 w-4 mr-2" />
            {t("admin.data_access_control")}
          </TabsTrigger>
          <TabsTrigger
            value="audit-log"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#a78bfa] data-[state=active]:to-[#705add] data-[state=active]:text-white rounded-lg"
          >
            <Shield className="h-4 w-4 mr-2" />
            {t("audit.title")}
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#a78bfa] data-[state=active]:to-[#705add] data-[state=active]:text-white rounded-lg"
          >
            <FolderOpen className="h-4 w-4 mr-2" />
            {t("documents.title")}
          </TabsTrigger>
          <TabsTrigger
            value="integrations"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#a78bfa] data-[state=active]:to-[#705add] data-[state=active]:text-white rounded-lg"
          >
            <Link2 className="h-4 w-4 mr-2" />
            {t("integrations.title")}
          </TabsTrigger>
          <TabsTrigger
            value="system-settings"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#a78bfa] data-[state=active]:to-[#705add] data-[state=active]:text-white rounded-lg"
          >
            <Settings className="h-4 w-4 mr-2" />
            System Settings
          </TabsTrigger>
        </TabsList>

        {/* User Management Tab */}
        <TabsContent value="users" className="space-y-4">
          <Card className="border-2 border-[#ede9fe]">
            <CardHeader className="border-b-2 border-[#ede9fe] bg-gradient-to-r from-[#faf8ff] to-white">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[#4c1d95] flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#705add]" />
                  {t("admin.user_list")}
                </CardTitle>
                <Button
                  onClick={() => setIsCreateUserDialogOpen(true)}
                  className="bg-[#705add] hover:bg-[#5b21b6] text-white rounded-xl"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {t("admin.add_user")}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* Search */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a78bfa]" />
                  <Input
                    placeholder={t("admin.search_users")}
                    value={searchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                    className="pl-10 border-[#ede9fe] focus:border-[#705add] rounded-xl"
                  />
                </div>
              </div>

              {/* User Table */}
              <div className="border-2 border-[#ede9fe] rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-[#faf8ff] to-[#f5f3ff]">
                    <tr>
                      <th className="text-left py-3 px-4 text-xs font-medium text-[#8b5cf6]">
                        {t("admin.name")}
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-[#8b5cf6]">
                        {t("admin.email")}
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-[#8b5cf6]">
                        {t("admin.role")}
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-[#8b5cf6]">
                        {t("admin.business_unit")}
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-[#8b5cf6]">
                        {t("admin.status")}
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-[#8b5cf6]">
                        {t("admin.last_login")}
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-[#8b5cf6]">
                        {t("history")}
                      </th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-[#8b5cf6]">
                        {t("common.actions")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="border-t border-[#ede9fe] hover:bg-[#faf8ff]/50 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#a78bfa] to-[#705add] flex items-center justify-center text-white text-xs font-semibold">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <span className="text-sm text-[#4c1d95] font-medium">
                              {user.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-[#8b5cf6]">
                          {user.email}
                        </td>
                        <td className="py-3 px-4">{getRoleBadge(user.role)}</td>
                        <td className="py-3 px-4 text-sm text-[#4c1d95]">
                          {user.businessUnit}
                        </td>
                        <td className="py-3 px-4">{getStatusBadge(user.status)}</td>
                        <td className="py-3 px-4 text-sm text-[#8b5cf6]">
                          {user.lastLogin}
                        </td>
                        <td className="py-3 px-4">
                          <HistoryMenu
                            entries={[
                              {
                                id: "1",
                                action: "created",
                                entity: "User",
                                user: "Admin",
                                timestamp: new Date(
                                  Date.now() - 30 * 24 * 60 * 60 * 1000
                                ).toISOString(),
                                description: `Created user account for ${user.name}`,
                              },
                              {
                                id: "2",
                                action: "updated",
                                entity: "User",
                                field: "Role",
                                oldValue: "Sales Representative",
                                newValue: user.role,
                                user: "Admin",
                                timestamp: new Date(
                                  Date.now() - 15 * 24 * 60 * 60 * 1000
                                ).toISOString(),
                              },
                            ]}
                          />
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditUser(user)}
                              className="text-[#705add] hover:bg-[#f5f3ff]"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Business Units Tab */}
        <TabsContent value="business-units" className="space-y-4">
          <Card className="border-2 border-[#ede9fe]">
            <CardHeader className="border-b-2 border-[#ede9fe] bg-gradient-to-r from-[#faf8ff] to-white">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[#4c1d95] flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-[#705add]" />
                  {t("admin.business_unit_list")}
                </CardTitle>
                <Button
                  onClick={() => setIsCreateBUDialogOpen(true)}
                  className="bg-[#705add] hover:bg-[#5b21b6] text-white rounded-xl"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {t("admin.add_business_unit")}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* Search */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a78bfa]" />
                  <Input
                    placeholder={t("admin.search_business_units")}
                    value={searchBU}
                    onChange={(e) => setSearchBU(e.target.value)}
                    className="pl-10 border-[#ede9fe] focus:border-[#705add] rounded-xl"
                  />
                </div>
              </div>

              {/* Business Unit Grid */}
              <div className="grid gap-4 md:grid-cols-2">
                {filteredBUs.map((bu) => (
                  <Card
                    key={bu.id}
                    className="border-2 border-[#ede9fe] hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#a78bfa] to-[#705add] flex items-center justify-center text-white font-bold shadow-md">
                            {bu.code}
                          </div>
                          <div>
                            <h3 className="text-[#4c1d95] font-semibold">
                              {bu.name}
                            </h3>
                            <p className="text-sm text-[#8b5cf6]">{bu.nameTh}</p>
                          </div>
                        </div>
                        {getStatusBadge(bu.status)}
                      </div>

                      <p className="text-sm text-[#8b5cf6] mb-1">
                        {bu.description}
                      </p>
                      <p className="text-sm text-[#a78bfa] mb-4">
                        {bu.descriptionTh}
                      </p>

                      <div className="grid grid-cols-3 gap-4 mb-4 pt-4 border-t border-[#ede9fe]">
                        <div>
                          <p className="text-xs text-[#8b5cf6]">
                            {t("admin.manager")}
                          </p>
                          <p className="text-sm text-[#4c1d95] font-medium">
                            {bu.manager}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-[#8b5cf6]">
                            {t("admin.users")}
                          </p>
                          <p className="text-sm text-[#4c1d95] font-medium">
                            {bu.users}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-[#8b5cf6]">
                            {t("admin.active_deals")}
                          </p>
                          <p className="text-sm text-[#4c1d95] font-medium">
                            {bu.activeDeals}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditBU(bu)}
                          className="flex-1 border-[#ede9fe] text-[#705add] hover:bg-[#f5f3ff] rounded-lg"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          {t("common.edit")}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-200 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          {t("common.delete")}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Approval Workflows Tab */}
        <TabsContent value="approval-workflows" className="space-y-4">
          <ApprovalWorkflowsTab />
        </TabsContent>

        {/* Data Access Control Tab */}
        <TabsContent value="data-access" className="space-y-4">
          <DataAccessControlTab />
        </TabsContent>

        {/* Audit Log Tab */}
        <TabsContent value="audit-log" className="space-y-4">
          <AuditLogScreen />
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-4">
          <DocumentsScreen />
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-4">
          <IntegrationsScreen />
        </TabsContent>

        {/* System Settings Tab */}
        <TabsContent value="system-settings" className="space-y-4">
          <SystemSettingsTab />
        </TabsContent>
      </Tabs>

      {/* Create User Dialog */}
      <Dialog open={isCreateUserDialogOpen} onOpenChange={setIsCreateUserDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-[#4c1d95] flex items-center gap-2">
              <Users className="h-5 w-5 text-[#705add]" />
              {t("admin.add_user")}
            </DialogTitle>
            <DialogDescription className="text-[#8b5cf6]">
              {t("admin.add_user_description")}
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="name" className="text-[#4c1d95]">
                  {t("admin.full_name")} *
                </Label>
                <Input
                  id="name"
                  placeholder={t("admin.enter_full_name")}
                  className="mt-1.5 border-[#ede9fe] focus:border-[#705add] rounded-lg"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-[#4c1d95]">
                  {t("admin.email")} *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("admin.enter_email")}
                  className="mt-1.5 border-[#ede9fe] focus:border-[#705add] rounded-lg"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="phone" className="text-[#4c1d95]">
                  {t("admin.phone")}
                </Label>
                <Input
                  id="phone"
                  placeholder="+1 (555) 000-0000"
                  className="mt-1.5 border-[#ede9fe] focus:border-[#705add] rounded-lg"
                />
              </div>
              <div>
                <Label htmlFor="role" className="text-[#4c1d95]">
                  {t("admin.role")} *
                </Label>
                <Select>
                  <SelectTrigger className="mt-1.5 border-[#ede9fe] focus:border-[#705add] rounded-lg">
                    <SelectValue placeholder={t("admin.select_role")} />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="bu" className="text-[#4c1d95]">
                  {t("admin.business_unit")} *
                </Label>
                <Select>
                  <SelectTrigger className="mt-1.5 border-[#ede9fe] focus:border-[#705add] rounded-lg">
                    <SelectValue placeholder={t("admin.select_business_unit")} />
                  </SelectTrigger>
                  <SelectContent>
                    {businessUnits.map((bu) => (
                      <SelectItem key={bu.id} value={bu.id}>
                        {bu.name} ({bu.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status" className="text-[#4c1d95]">
                  {t("admin.status")} *
                </Label>
                <Select defaultValue="active">
                  <SelectTrigger className="mt-1.5 border-[#ede9fe] focus:border-[#705add] rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">{t("admin.active")}</SelectItem>
                    <SelectItem value="inactive">{t("admin.inactive")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#ede9fe]">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateUserDialogOpen(false)}
                className="border-[#ede9fe] text-[#705add] hover:bg-[#f5f3ff] rounded-xl"
              >
                {t("common.cancel")}
              </Button>
              <Button
                type="submit"
                className="bg-[#705add] hover:bg-[#5b21b6] text-white rounded-xl"
              >
                <Plus className="h-4 w-4 mr-2" />
                {t("admin.create_user")}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Create Business Unit Dialog */}
      <Dialog open={isCreateBUDialogOpen} onOpenChange={setIsCreateBUDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-[#4c1d95] flex items-center gap-2">
              <Building2 className="h-5 w-5 text-[#705add]" />
              {t("admin.add_business_unit")}
            </DialogTitle>
            <DialogDescription className="text-[#8b5cf6]">
              {t("admin.add_business_unit_description")}
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="bu-code" className="text-[#4c1d95]">
                  {t("admin.bu_code")} *
                </Label>
                <Input
                  id="bu-code"
                  placeholder="AF, SF, LS..."
                  className="mt-1.5 border-[#ede9fe] focus:border-[#705add] rounded-lg"
                  maxLength={4}
                />
              </div>
              <div>
                <Label htmlFor="bu-name" className="text-[#4c1d95]">
                  {t("admin.bu_name_en")} *
                </Label>
                <Input
                  id="bu-name"
                  placeholder="Air Freight"
                  className="mt-1.5 border-[#ede9fe] focus:border-[#705add] rounded-lg"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bu-name-th" className="text-[#4c1d95]">
                {t("admin.bu_name_th")} *
              </Label>
              <Input
                id="bu-name-th"
                placeholder="ขนส่งทางอากาศ"
                className="mt-1.5 border-[#ede9fe] focus:border-[#705add] rounded-lg"
              />
            </div>

            <div>
              <Label htmlFor="bu-desc-en" className="text-[#4c1d95]">
                {t("admin.description_en")}
              </Label>
              <Input
                id="bu-desc-en"
                placeholder="International and domestic air freight services"
                className="mt-1.5 border-[#ede9fe] focus:border-[#705add] rounded-lg"
              />
            </div>

            <div>
              <Label htmlFor="bu-desc-th" className="text-[#4c1d95]">
                {t("admin.description_th")}
              </Label>
              <Input
                id="bu-desc-th"
                placeholder="บริการขนส่งทางอากาศระหว่างประเทศและภายในประเทศ"
                className="mt-1.5 border-[#ede9fe] focus:border-[#705add] rounded-lg"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="bu-manager" className="text-[#4c1d95]">
                  {t("admin.manager")}
                </Label>
                <Select>
                  <SelectTrigger className="mt-1.5 border-[#ede9fe] focus:border-[#705add] rounded-lg">
                    <SelectValue placeholder={t("admin.select_manager")} />
                  </SelectTrigger>
                  <SelectContent>
                    {users
                      .filter((u) => u.role.includes("Manager"))
                      .map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="bu-status" className="text-[#4c1d95]">
                  {t("admin.status")} *
                </Label>
                <Select defaultValue="active">
                  <SelectTrigger className="mt-1.5 border-[#ede9fe] focus:border-[#705add] rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">{t("admin.active")}</SelectItem>
                    <SelectItem value="inactive">{t("admin.inactive")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#ede9fe]">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateBUDialogOpen(false)}
                className="border-[#ede9fe] text-[#705add] hover:bg-[#f5f3ff] rounded-xl"
              >
                {t("common.cancel")}
              </Button>
              <Button
                type="submit"
                className="bg-[#705add] hover:bg-[#5b21b6] text-white rounded-xl"
              >
                <Plus className="h-4 w-4 mr-2" />
                {t("admin.create_business_unit")}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserDialogOpen} onOpenChange={setIsEditUserDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-[#4c1d95] flex items-center gap-2">
              <Edit className="h-5 w-5 text-[#705add]" />
              {t("admin.edit_user")}
            </DialogTitle>
            <DialogDescription className="text-[#8b5cf6]">
              {t("admin.edit_user_description")}
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="edit-name" className="text-[#4c1d95]">
                  {t("admin.full_name")} *
                </Label>
                <Input
                  id="edit-name"
                  defaultValue={selectedUser?.name}
                  placeholder={t("admin.enter_full_name")}
                  className="mt-1.5 border-[#ede9fe] focus:border-[#705add] rounded-lg"
                />
              </div>
              <div>
                <Label htmlFor="edit-email" className="text-[#4c1d95]">
                  {t("admin.email")} *
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  defaultValue={selectedUser?.email}
                  placeholder={t("admin.enter_email")}
                  className="mt-1.5 border-[#ede9fe] focus:border-[#705add] rounded-lg"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="edit-phone" className="text-[#4c1d95]">
                  {t("admin.phone")}
                </Label>
                <Input
                  id="edit-phone"
                  defaultValue={selectedUser?.phone}
                  placeholder="+1 (555) 000-0000"
                  className="mt-1.5 border-[#ede9fe] focus:border-[#705add] rounded-lg"
                />
              </div>
              <div>
                <Label htmlFor="edit-role" className="text-[#4c1d95]">
                  {t("admin.role")} *
                </Label>
                <Select defaultValue={selectedUser?.role.toLowerCase().replace(" ", "_")}>
                  <SelectTrigger className="mt-1.5 border-[#ede9fe] focus:border-[#705add] rounded-lg">
                    <SelectValue placeholder={t("admin.select_role")} />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="edit-bu" className="text-[#4c1d95]">
                  {t("admin.business_unit")} *
                </Label>
                <Select defaultValue={selectedUser?.businessUnit}>
                  <SelectTrigger className="mt-1.5 border-[#ede9fe] focus:border-[#705add] rounded-lg">
                    <SelectValue placeholder={t("admin.select_business_unit")} />
                  </SelectTrigger>
                  <SelectContent>
                    {businessUnits.map((bu) => (
                      <SelectItem key={bu.id} value={bu.name}>
                        {bu.name} ({bu.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-status" className="text-[#4c1d95]">
                  {t("admin.status")} *
                </Label>
                <Select defaultValue={selectedUser?.status.toLowerCase()}>
                  <SelectTrigger className="mt-1.5 border-[#ede9fe] focus:border-[#705add] rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">{t("admin.active")}</SelectItem>
                    <SelectItem value="inactive">{t("admin.inactive")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#ede9fe]">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditUserDialogOpen(false)}
                className="border-[#ede9fe] text-[#705add] hover:bg-[#f5f3ff] rounded-xl"
              >
                {t("common.cancel")}
              </Button>
              <Button
                type="submit"
                className="bg-[#705add] hover:bg-[#5b21b6] text-white rounded-xl"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                {t("common.save_changes")}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Business Unit Dialog */}
      <Dialog open={isEditBUDialogOpen} onOpenChange={setIsEditBUDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-[#4c1d95] flex items-center gap-2">
              <Edit className="h-5 w-5 text-[#705add]" />
              {t("admin.edit_business_unit")}
            </DialogTitle>
            <DialogDescription className="text-[#8b5cf6]">
              {t("admin.edit_business_unit_description")}
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="edit-bu-code" className="text-[#4c1d95]">
                  {t("admin.bu_code")} *
                </Label>
                <Input
                  id="edit-bu-code"
                  defaultValue={selectedBU?.code}
                  placeholder="AF, SF, LS..."
                  className="mt-1.5 border-[#ede9fe] focus:border-[#705add] rounded-lg"
                  maxLength={4}
                />
              </div>
              <div>
                <Label htmlFor="edit-bu-name" className="text-[#4c1d95]">
                  {t("admin.bu_name_en")} *
                </Label>
                <Input
                  id="edit-bu-name"
                  defaultValue={selectedBU?.name}
                  placeholder="Air Freight"
                  className="mt-1.5 border-[#ede9fe] focus:border-[#705add] rounded-lg"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="edit-bu-name-th" className="text-[#4c1d95]">
                  {t("admin.bu_name_th")} *
                </Label>
                <Input
                  id="edit-bu-name-th"
                  defaultValue={selectedBU?.nameTh}
                  placeholder="ขนส่งทางอากาศ"
                  className="mt-1.5 border-[#ede9fe] focus:border-[#705add] rounded-lg"
                />
              </div>
              <div>
                <Label htmlFor="edit-bu-manager" className="text-[#4c1d95]">
                  {t("admin.bu_manager")}
                </Label>
                <Select defaultValue={selectedBU?.manager}>
                  <SelectTrigger className="mt-1.5 border-[#ede9fe] focus:border-[#705add] rounded-lg">
                    <SelectValue placeholder={t("admin.select_manager")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Not Assigned">{t("admin.not_assigned")}</SelectItem>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.name}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="edit-bu-desc" className="text-[#4c1d95]">
                {t("admin.bu_description_en")}
              </Label>
              <Input
                id="edit-bu-desc"
                defaultValue={selectedBU?.description}
                placeholder="International air freight forwarding..."
                className="mt-1.5 border-[#ede9fe] focus:border-[#705add] rounded-lg"
              />
            </div>

            <div>
              <Label htmlFor="edit-bu-desc-th" className="text-[#4c1d95]">
                {t("admin.bu_description_th")}
              </Label>
              <Input
                id="edit-bu-desc-th"
                defaultValue={selectedBU?.descriptionTh}
                placeholder="บริการขนส่งสินค้าทางอากาศระหว่างประเทศ..."
                className="mt-1.5 border-[#ede9fe] focus:border-[#705add] rounded-lg"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="edit-bu-hierarchy" className="text-[#4c1d95]">
                  {t("admin.hierarchy_level")}
                </Label>
                <Select defaultValue={selectedBU?.hierarchyLevel}>
                  <SelectTrigger className="mt-1.5 border-[#ede9fe] focus:border-[#705add] rounded-lg">
                    <SelectValue placeholder={t("admin.select_hierarchy")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="N-1">N-1 (Executive Level)</SelectItem>
                    <SelectItem value="N-2">N-2 (Management Level)</SelectItem>
                    <SelectItem value="N-3">N-3 (Department Level)</SelectItem>
                    <SelectItem value="N-2/N-3">N-2/N-3 (Mixed Level)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-bu-status" className="text-[#4c1d95]">
                  {t("admin.status")} *
                </Label>
                <Select defaultValue={selectedBU?.status.toLowerCase()}>
                  <SelectTrigger className="mt-1.5 border-[#ede9fe] focus:border-[#705add] rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">{t("admin.active")}</SelectItem>
                    <SelectItem value="inactive">{t("admin.inactive")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#ede9fe]">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditBUDialogOpen(false)}
                className="border-[#ede9fe] text-[#705add] hover:bg-[#f5f3ff] rounded-xl"
              >
                {t("common.cancel")}
              </Button>
              <Button
                type="submit"
                className="bg-[#705add] hover:bg-[#5b21b6] text-white rounded-xl"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                {t("common.save_changes")}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}