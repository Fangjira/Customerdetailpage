import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Users,
  Shield,
  Building2,
  Briefcase,
  GitBranch,
  MapPin,
  Package,
  Tag,
  UserCheck,
  Sparkles,
  Columns,
  FileText,
  FileCheck,
  GitBranch as Workflow,
  Layers,
  Settings,
  Lock,
  FileStack,
  Sliders,
  Search,
  Plus,
  ArrowUpRight,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Clock,
  TrendingUp,
  Zap,
  Download,
  Upload,
  RefreshCw,
  Bell,
  Eye,
  Edit,
  BarChart3,
  Database,
  Globe,
  Server,
  HardDrive,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useRoleTheme } from "../../hooks/use-role-theme";
import { cn } from "../ui/utils";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: any;
  path: string;
  color: string;
  bgColor: string;
}

interface AdminModule {
  id: string;
  title: string;
  description: string;
  icon: any;
  items: {
    id: string;
    title: string;
    path: string;
    stats?: number;
  }[];
  color: string;
  bgColor: string;
}

interface RecentActivity {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  type: "success" | "warning" | "info";
}

interface EnterpriseAdminHubProps {
  onNavigate: (path: string) => void;
}

export function EnterpriseAdminHub({ onNavigate }: EnterpriseAdminHubProps) {
  const { t } = useTranslation();
  const roleTheme = useRoleTheme();
  const [searchTerm, setSearchTerm] = useState("");

  // System Health Metrics - Updated for Mobile
  const systemHealth = {
    overall: 94,
    database: 98,
    api: 95,
    storage: 87,
    security: 100,
  };

  // Quick Stats
  const stats = {
    totalUsers: 142,
    activeUsers: 136,
    totalOrganizations: 3,
    totalProducts: 45,
    totalBranches: 10,
    totalDeals: 487,
    pendingApprovals: 12,
    recentActivities: 156,
  };

  // Quick Actions - งานที่ทำบ่อย
  const quickActions: QuickAction[] = [
    {
      id: "add-user",
      title: "Add New User",
      description: "เพิ่มผู้ใช้ใหม่เข้าสู่ระบบ",
      icon: Users,
      path: "/admin/users?action=add",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "add-product",
      title: "Add Product",
      description: "เพิ่มสินค้าหรือบริการใหม่",
      icon: Package,
      path: "/admin/products-services?action=add",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      id: "manage-roles",
      title: "Manage Roles",
      description: "จัดการบทบาทและสิทธิ์",
      icon: Shield,
      path: "/admin/roles-permissions",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      id: "view-logs",
      title: "View Audit Logs",
      description: "ตรวจสอบประวัติการใช้งาน",
      icon: FileStack,
      path: "/admin/audit-log",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      id: "import-data",
      title: "Import Data",
      description: "นำเข้าข้อมูลจากไฟล์",
      icon: Upload,
      path: "/admin/import",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      id: "export-data",
      title: "Export Data",
      description: "ส่งออกข้อมูลระบบ",
      icon: Download,
      path: "/admin/export",
      color: "text-teal-600",
      bgColor: "bg-teal-50",
    },
  ];

  // Admin Modules - จัดกลุ่มตามหน้าที่
  const adminModules: AdminModule[] = [
    {
      id: "people",
      title: "People Management",
      description: "จัดการผู้ใช้ ทีม และสิทธิ์การเข้าถึง",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      items: [
        { id: "users", title: "User Management", path: "/admin/users", stats: 142 },
        { id: "roles", title: "Roles & Permissions", path: "/admin/roles-permissions", stats: 7 },
        { id: "teams", title: "Sales Teams", path: "/admin/teams", stats: 12 },
        { id: "departments", title: "Departments", path: "/admin/departments", stats: 8 },
      ],
    },
    {
      id: "organization",
      title: "Organization Setup",
      description: "โครงสร้างองค์กร สาขา และหน่วยธุรกิจ",
      icon: Building2,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      items: [
        { id: "organization", title: "Organizations", path: "/admin/organization", stats: 3 },
        { id: "business-units", title: "Business Units", path: "/admin/business-units", stats: 6 },
        { id: "branches", title: "Branches & Locations", path: "/admin/branches", stats: 10 },
        { id: "business-structure", title: "Business Structure", path: "/admin/business-structure" },
      ],
    },
    {
      id: "business-data",
      title: "Business Data",
      description: "ข้อมูลธุรกิจ สินค้า และลูกค้า",
      icon: Database,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      items: [
        { id: "products", title: "Products & Services", path: "/admin/products-services", stats: 45 },
        { id: "customer-types", title: "Customer Types", path: "/admin/customer-types", stats: 5 },
        { id: "lead-sources", title: "Lead Sources", path: "/admin/lead-sources", stats: 8 },
        { id: "tags", title: "Tags & Labels", path: "/admin/tags", stats: 24 },
        { id: "master-data", title: "Master Data", path: "/admin/master-data" },
        { id: "custom-fields", title: "Custom Fields", path: "/admin/custom-fields", stats: 15 },
      ],
    },
    {
      id: "sales-process",
      title: "Sales Process",
      description: "กระบวนการขายและเอกสาร",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
      items: [
        { id: "pipeline", title: "Pipeline Stages", path: "/admin/pipeline-stages", stats: 6 },
        { id: "quotation-templates", title: "Quotation Templates", path: "/admin/quotation-templates", stats: 3 },
        { id: "contract-templates", title: "Contract Templates", path: "/admin/contract-templates", stats: 2 },
      ],
    },
    {
      id: "automation",
      title: "Automation & Integration",
      description: "เวิร์กโฟลว์และการเชื่อมต่อ",
      icon: Zap,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      items: [
        { id: "workflows", title: "Approval Workflows", path: "/admin/workflows", stats: 4 },
        { id: "integrations", title: "Integrations", path: "/admin/integrations", stats: 3 },
      ],
    },
    {
      id: "system",
      title: "System Configuration",
      description: "การตั้งค่าระบบทั่วไป",
      icon: Settings,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      items: [
        { id: "settings", title: "System Settings", path: "/admin/settings" },
        { id: "audit-log", title: "Audit Log", path: "/admin/audit-log" },
        { id: "security", title: "Security Policy", path: "/admin/security-policy" },
      ],
    },
  ];

  // Recent Activities
  const recentActivities: RecentActivity[] = [
    {
      id: "1",
      user: "Somchai T.",
      action: "created new user",
      target: "Nattapong K.",
      timestamp: "5 minutes ago",
      type: "success",
    },
    {
      id: "2",
      user: "Admin",
      action: "updated role permissions",
      target: "Sales Manager",
      timestamp: "15 minutes ago",
      type: "info",
    },
    {
      id: "3",
      user: "Siriwan P.",
      action: "added new product",
      target: "Premium Storage Unit",
      timestamp: "1 hour ago",
      type: "success",
    },
    {
      id: "4",
      user: "System",
      action: "security alert",
      target: "Multiple login attempts",
      timestamp: "2 hours ago",
      type: "warning",
    },
    {
      id: "5",
      user: "Manit S.",
      action: "modified",
      target: "Organization settings",
      timestamp: "3 hours ago",
      type: "info",
    },
  ];

  // Filter modules based on search
  const filteredModules = adminModules.filter((module) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      module.title.toLowerCase().includes(searchLower) ||
      module.description.toLowerCase().includes(searchLower) ||
      module.items.some((item) => item.title.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="h-full bg-gray-50 overflow-y-auto">
      <div className="w-full mx-auto p-3 sm:p-6 lg:p-8 max-w-[1920px]">
        {/* Mobile Header - Only on mobile */}
        <div className="md:hidden mb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Admin Hub</h1>
              <p className="text-xs text-gray-500 mt-0.5">
                จัดการระบบ CRM
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0 relative">
                <Bell className="h-4 w-4" />
                {stats.pendingApprovals > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center">
                    {stats.pendingApprovals}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="ค้นหาเมนู..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 h-9 border-gray-200 bg-white text-sm"
            />
          </div>
        </div>

        {/* Desktop Header - Hidden on mobile */}
        <div className="hidden md:block mb-6 lg:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Enterprise Admin Hub</h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                จัดการและตั้งค่าระบบ CRM ทั้งหมด
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="gap-2 flex-1 sm:flex-none">
                <RefreshCw className="h-4 w-4" />
                <span className="hidden sm:inline">Refresh</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-2 flex-1 sm:flex-none">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Alerts</span>
                {stats.pendingApprovals > 0 && (
                  <Badge variant="destructive" className="ml-1">
                    {stats.pendingApprovals}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="ค้นหาเมนูหรือฟังก์ชัน..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 h-10 sm:h-12 border-gray-200 bg-white text-sm sm:text-base"
            />
          </div>
        </div>

        {/* System Health & Stats - Mobile Optimized */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 mb-4 md:mb-6 lg:mb-8">
          {/* System Health Card - Compact on mobile */}
          <Card className="lg:col-span-1 border-gray-200">
            <CardHeader className="pb-2 md:pb-3 px-3 md:px-6 pt-3 md:pt-6">
              <CardTitle className="text-xs md:text-sm lg:text-base font-semibold flex items-center gap-2">
                <Activity className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 md:space-y-3 px-3 md:px-6 pb-3 md:pb-6">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Overall</span>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 md:h-2 w-12 md:w-20 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: `${systemHealth.overall}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-green-600">
                    {systemHealth.overall}%
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 md:space-y-2 pt-2 border-t border-gray-100">
                {[
                  { label: "Database", value: systemHealth.database, icon: HardDrive },
                  { label: "API", value: systemHealth.api, icon: Server },
                  { label: "Storage", value: systemHealth.storage, icon: Database },
                  { label: "Security", value: systemHealth.security, icon: Lock },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <item.icon className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-600">{item.label}</span>
                    </div>
                    <span className="text-xs font-medium text-gray-900">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats - Mobile Grid 2x4 */}
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 lg:gap-4">
            {[
              {
                label: "Users",
                value: stats.totalUsers,
                subtext: `${stats.activeUsers} active`,
                icon: Users,
                color: "text-blue-600",
                bgColor: "bg-blue-50",
              },
              {
                label: "Orgs",
                value: stats.totalOrganizations,
                subtext: "companies",
                icon: Building2,
                color: "text-indigo-600",
                bgColor: "bg-indigo-50",
              },
              {
                label: "Products",
                value: stats.totalProducts,
                subtext: "items",
                icon: Package,
                color: "text-orange-600",
                bgColor: "bg-orange-50",
              },
              {
                label: "Branches",
                value: stats.totalBranches,
                subtext: "locations",
                icon: MapPin,
                color: "text-green-600",
                bgColor: "bg-green-50",
              },
              {
                label: "Deals",
                value: stats.totalDeals,
                subtext: "pipeline",
                icon: TrendingUp,
                color: "text-purple-600",
                bgColor: "bg-purple-50",
              },
              {
                label: "Approvals",
                value: stats.pendingApprovals,
                subtext: "pending",
                icon: CheckCircle2,
                color: "text-yellow-600",
                bgColor: "bg-yellow-50",
              },
              {
                label: "Activities",
                value: stats.recentActivities,
                subtext: "24h",
                icon: Activity,
                color: "text-teal-600",
                bgColor: "bg-teal-50",
              },
              {
                label: "Security",
                value: systemHealth.security,
                subtext: "score",
                icon: Shield,
                color: "text-green-600",
                bgColor: "bg-green-50",
              },
            ].map((stat, index) => (
              <Card key={index} className="border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-2.5 md:p-3 lg:p-4">
                  <div className="flex items-start justify-between mb-1.5 md:mb-2">
                    <div
                      className={cn(
                        "w-7 h-7 md:w-10 md:h-10 rounded-lg flex items-center justify-center",
                        stat.bgColor
                      )}
                    >
                      <stat.icon className={cn("h-3.5 w-3.5 md:h-5 md:w-5", stat.color)} />
                    </div>
                  </div>
                  <div className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-0.5">
                    {stat.value}
                  </div>
                  <div className="text-[10px] md:text-xs text-gray-500 truncate">{stat.label}</div>
                  <div className="text-[10px] md:text-xs text-gray-400 truncate">{stat.subtext}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions - Mobile 3 columns */}
        <div className="mb-4 md:mb-6 lg:mb-8">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h2 className="text-sm md:text-base lg:text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Zap className="h-4 w-4 md:h-5 md:w-5 text-yellow-500" />
              <span className="hidden md:inline">Quick Actions</span>
              <span className="md:hidden">Actions</span>
            </h2>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3 lg:gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Card
                  key={action.id}
                  className="group cursor-pointer border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200"
                  onClick={() => onNavigate(action.path)}
                >
                  <CardContent className="p-2 md:p-3 lg:p-4 text-center">
                    <div
                      className={cn(
                        "w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl mx-auto mb-1.5 md:mb-3 flex items-center justify-center transition-transform group-hover:scale-110",
                        action.bgColor
                      )}
                    >
                      <Icon className={cn("h-4 w-4 md:h-6 md:w-6", action.color)} />
                    </div>
                    <h3 className="font-semibold text-[10px] md:text-xs lg:text-sm text-gray-900 mb-0.5 md:mb-1 line-clamp-2 leading-tight">
                      {action.title}
                    </h3>
                    <p className="text-[9px] md:text-xs text-gray-500 line-clamp-2 hidden lg:block">
                      {action.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Main Content: Modules + Activity Monitor */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
          {/* Admin Modules */}
          <div className="lg:col-span-2 space-y-3 md:space-y-4 lg:space-y-6">
            <h2 className="text-sm md:text-base lg:text-lg font-semibold text-gray-900">
              <span className="hidden md:inline">Admin Modules</span>
              <span className="md:hidden">Modules</span>
            </h2>

            {filteredModules.map((module) => {
              const Icon = module.icon;
              return (
                <Card key={module.id} className="border-gray-200">
                  <CardHeader className="pb-2 md:pb-3 lg:pb-4 px-3 md:px-6 pt-3 md:pt-6">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                        <div
                          className={cn(
                            "w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0",
                            module.bgColor
                          )}
                        >
                          <Icon className={cn("h-4.5 w-4.5 md:h-6 md:w-6", module.color)} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-xs md:text-sm lg:text-base font-semibold truncate">
                            {module.title}
                          </CardTitle>
                          <p className="text-[10px] md:text-xs text-gray-500 mt-0.5 line-clamp-1 md:line-clamp-2">
                            {module.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="px-3 md:px-6 pb-3 md:pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 md:gap-2">
                      {module.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => onNavigate(item.path)}
                          className="flex items-center justify-between px-2.5 md:px-3 py-2 md:py-2.5 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors text-left group"
                        >
                          <span className="text-xs md:text-sm text-gray-700 group-hover:text-gray-900 truncate">
                            {item.title}
                          </span>
                          {item.stats !== undefined && (
                            <Badge variant="secondary" className="text-[10px] md:text-xs ml-2 flex-shrink-0 px-1.5 md:px-2">
                              {item.stats}
                            </Badge>
                          )}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* Empty State */}
            {filteredModules.length === 0 && (
              <Card className="border-gray-200">
                <CardContent className="py-8 md:py-12 text-center">
                  <Search className="h-10 w-10 md:h-12 md:w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm md:text-base text-gray-500 mb-2">
                    ไม่พบผลลัพธ์สำหรับ "{searchTerm}"
                  </p>
                  <Button
                    variant="link"
                    onClick={() => setSearchTerm("")}
                    className="text-xs md:text-sm"
                  >
                    ล้างการค้นหา
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Activity Monitor - Hidden on mobile, shown on tablet+ */}
          <div className="lg:col-span-1 hidden md:block">
            <Card className="border-gray-200 lg:sticky lg:top-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm md:text-base font-semibold flex items-center gap-2">
                  <Clock className="h-4 md:h-5 w-4 md:w-5 text-blue-600" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-2 md:gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0"
                    >
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full mt-1.5 flex-shrink-0",
                          activity.type === "success" && "bg-green-500",
                          activity.type === "warning" && "bg-yellow-500",
                          activity.type === "info" && "bg-blue-500"
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs md:text-sm text-gray-900">
                          <span className="font-medium">{activity.user}</span>{" "}
                          <span className="text-gray-600">{activity.action}</span>{" "}
                          <span className="font-medium truncate">{activity.target}</span>
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {activity.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4 text-xs md:text-sm"
                  onClick={() => onNavigate("/admin/audit-log")}
                >
                  <FileStack className="h-3 md:h-3.5 w-3 md:w-3.5 mr-2" />
                  View All
                </Button>
              </CardContent>
            </Card>

            {/* Security Center Quick Link */}
            <Card className="border-gray-200 mt-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm md:text-base font-semibold flex items-center gap-2">
                  <Shield className="h-4 md:h-5 w-4 md:w-5 text-green-600" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm text-gray-600">Score</span>
                    <Badge className="bg-green-100 text-green-700 border-0 text-xs">
                      Excellent
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm text-gray-600">Last Scan</span>
                    <span className="text-xs text-gray-500">2h ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm text-gray-600">Sessions</span>
                    <span className="text-xs font-semibold text-gray-900">
                      {stats.activeUsers}
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4 text-xs md:text-sm"
                  onClick={() => onNavigate("/admin/security-policy")}
                >
                  <Lock className="h-3 md:h-3.5 w-3 md:w-3.5 mr-2" />
                  Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mobile Activity Monitor - Show on mobile only */}
        <div className="md:hidden mt-4">
          <Card className="border-gray-200">
            <CardHeader className="pb-2 px-3 pt-3">
              <CardTitle className="text-xs font-semibold flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 pb-3">
              <div className="space-y-2">
                {recentActivities.slice(0, 3).map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-2 pb-2 border-b border-gray-100 last:border-0 last:pb-0"
                  >
                    <div
                      className={cn(
                        "w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0",
                        activity.type === "success" && "bg-green-500",
                        activity.type === "warning" && "bg-yellow-500",
                        activity.type === "info" && "bg-blue-500"
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] text-gray-900 leading-tight">
                        <span className="font-medium">{activity.user}</span>{" "}
                        <span className="text-gray-600">{activity.action}</span>{" "}
                        <span className="font-medium">{activity.target}</span>
                      </p>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {activity.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full mt-3 text-xs h-8"
                onClick={() => onNavigate("/admin/audit-log")}
              >
                <FileStack className="h-3 w-3 mr-1.5" />
                View All
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}