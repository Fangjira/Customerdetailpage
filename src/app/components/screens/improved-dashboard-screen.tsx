import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Plus,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle2,
  DollarSign,
  Users,
  Briefcase,
  Calendar,
  FileText,
  Target,
  ArrowRight,
  Zap,
  TrendingDown,
  Award,
  Phone,
  Mail,
  MapPin,
  Edit,
  Eye,
  Building2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRoleTheme } from "../../hooks/use-role-theme";
import { useRole } from "../../contexts/role-context";

interface ImprovedDashboardScreenProps {
  onNavigate?: (path: string, id?: string) => void;
}

export function ImprovedDashboardScreen({ onNavigate }: ImprovedDashboardScreenProps) {
  const { t } = useTranslation();
  const roleTheme = useRoleTheme();
  const { role } = useRole();
  const [quickActionType, setQuickActionType] = useState<string | null>(null);

  // Quick Actions ตาม Role
  const getQuickActions = () => {
    const commonActions = [
      {
        id: "add-lead",
        label: "เพิ่มลีด",
        icon: Users,
        color: "from-blue-500 to-blue-600",
        path: "/leads?action=add",
      },
      {
        id: "add-activity",
        label: "สร้างกิจกรรม",
        icon: Calendar,
        color: "from-purple-500 to-purple-600",
        path: "/calendar?action=add",
      },
      {
        id: "add-quotation",
        label: "สร้างใบเสนอราคา",
        icon: FileText,
        color: "from-amber-500 to-amber-600",
        path: "/quotations?action=add",
      },
    ];

    if (role === "sales_manager" || role === "admin") {
      return [
        ...commonActions,
        {
          id: "review-approvals",
          label: "อนุมัติ",
          icon: CheckCircle2,
          color: "from-green-500 to-green-600",
          path: "/approvals",
        },
      ];
    }

    return commonActions;
  };

  // Today's Priority Tasks
  const todayTasks = [
    {
      id: "1",
      type: "call",
      title: "โทรติดตามลูกค้า Acme Corporation",
      customer: "Acme Corporation",
      time: "10:00 AM",
      priority: "high",
      status: "pending",
    },
    {
      id: "2",
      type: "meeting",
      title: "นัดหมายเสนอราคา Global Tech",
      customer: "Global Tech Industries",
      time: "2:00 PM",
      priority: "high",
      status: "pending",
    },
    {
      id: "3",
      type: "follow-up",
      title: "ติดตามใบเสนอราคา QT-2024-145",
      customer: "Pacific Imports Ltd",
      time: "4:30 PM",
      priority: "medium",
      status: "pending",
    },
  ];

  // Hot Deals - Deals ที่ต้องดูแลเร่งด่วน
  const hotDeals = [
    {
      id: "DL-2024-145",
      customer: "Acme Corporation",
      value: "$245,000",
      stage: "Negotiation",
      probability: 75,
      nextAction: "ส่งสัญญา",
      daysOpen: 12,
      owner: "Sarah Chen",
    },
    {
      id: "DL-2024-146",
      customer: "Global Tech Industries",
      value: "$180,000",
      stage: "Proposal",
      probability: 60,
      nextAction: "เสนอราคา",
      daysOpen: 8,
      owner: "Michael Park",
    },
    {
      id: "DL-2024-147",
      customer: "Pacific Imports Ltd",
      value: "$95,000",
      stage: "Analysis",
      probability: 45,
      nextAction: "วิเคราะห์ความต้องการ",
      daysOpen: 5,
      owner: "Emily Rodriguez",
    },
  ];

  // Pending Approvals
  const pendingApprovals = [
    {
      id: "AP-001",
      type: "Quotation",
      title: "ใบเสนอราคา QT-2024-145",
      amount: "$245,000",
      submittedBy: "Sarah Chen",
      submittedAt: "2 hours ago",
      priority: "high",
    },
    {
      id: "AP-002",
      type: "Discount",
      title: "ส่วนลด 15% สำหรับ Global Tech",
      amount: "$27,000",
      submittedBy: "Michael Park",
      submittedAt: "5 hours ago",
      priority: "medium",
    },
  ];

  // Stats
  const stats = [
    {
      label: "ดีลของฉันวันนี้",
      value: "8",
      change: "+2",
      trend: "up",
      icon: Briefcase,
      color: roleTheme.primary,
      bgColor: roleTheme.primaryLight,
    },
    {
      label: "มูลค่าที่คาดหวัง",
      value: "$520K",
      change: "+12%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "กิจกรรมวันนี้",
      value: "5",
      change: "3 เสร็จแล้ว",
      trend: "neutral",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "รออนุมัติ",
      value: "3",
      change: "ด่วน 1",
      trend: role === "sales_manager" || role === "admin" ? "warning" : "neutral",
      icon: AlertCircle,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-amber-100 text-amber-700 border-amber-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      Negotiation: "bg-purple-100 text-purple-700 border-purple-200",
      Proposal: "bg-blue-100 text-blue-700 border-blue-200",
      Analysis: "bg-yellow-100 text-yellow-700 border-yellow-200",
    };
    return colors[stage] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="p-3 sm:p-4 lg:p-6">
        <div className="max-w-[1600px] mx-auto space-y-4 sm:space-y-5 lg:space-y-6">
          
          {/* Header */}
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
              {t("dashboard.title")}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
              {t("dashboard.welcome")}
            </p>
          </div>

          {/* Quick Actions - Mobile Optimized */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
            {getQuickActions().map((action) => (
              <Button
                key={action.id}
                onClick={() => onNavigate?.(action.path)}
                className={`h-20 sm:h-24 flex flex-col items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-br ${action.color} text-white border-0 hover:shadow-xl transition-all duration-200 rounded-xl`}
              >
                <action.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-xs sm:text-sm font-medium text-center leading-tight px-1">{action.label}</span>
              </Button>
            ))}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="border-2 hover:shadow-lg transition-shadow cursor-pointer"
                style={{ borderColor: roleTheme.primaryLight }}
              >
                <CardContent className="p-3 sm:p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] sm:text-sm text-gray-600 mb-1 sm:mb-2 truncate">{stat.label}</p>
                      <p className="text-xl sm:text-3xl font-bold truncate" style={{ color: roleTheme.primary }}>
                        {stat.value}
                      </p>
                      <div className="flex items-center gap-1 mt-1 sm:mt-2">
                        {stat.trend === "up" && (
                          <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
                        )}
                        {stat.trend === "down" && (
                          <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 text-red-600 flex-shrink-0" />
                        )}
                        {stat.trend === "warning" && (
                          <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-amber-600 flex-shrink-0" />
                        )}
                        <span
                          className={`text-[10px] sm:text-sm truncate ${
                            stat.trend === "up"
                              ? "text-green-600"
                              : stat.trend === "warning"
                              ? "text-amber-600"
                              : "text-gray-600"
                          }`}
                        >
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ${stat.bgColor} flex-shrink-0 ml-2`}>
                      <stat.icon className={`h-4 w-4 sm:h-6 sm:w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6">
            {/* Today's Priority Tasks */}
            <Card className="border-2 lg:col-span-2" style={{ borderColor: roleTheme.primaryLight }}>
              <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-6" style={{ background: roleTheme.primaryLight }}>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base" style={{ color: roleTheme.primary }}>
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="hidden sm:inline">งานสำคัญวันนี้</span>
                    <span className="sm:hidden">งานวันนี้</span>
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onNavigate?.("/tasks")}
                    style={{ color: roleTheme.primary }}
                    className="text-xs sm:text-sm"
                  >
                    <span className="hidden sm:inline">ดูทั้งหมด</span>
                    <span className="sm:inline lg:hidden">ทั้งหมด</span>
                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {todayTasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-3 sm:p-4 hover:bg-gray-50 transition-colors cursor-pointer flex items-center gap-2 sm:gap-4"
                    >
                      <div className="flex-shrink-0">
                        <div
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center"
                          style={{ background: roleTheme.primaryLight }}
                        >
                          {task.type === "call" && (
                            <Phone className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: roleTheme.primary }} />
                          )}
                          {task.type === "meeting" && (
                            <Users className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: roleTheme.primary }} />
                          )}
                          {task.type === "follow-up" && (
                            <Mail className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: roleTheme.primary }} />
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <p className="font-medium text-xs sm:text-sm text-gray-900 truncate">{task.title}</p>
                          <Badge className={`${getPriorityColor(task.priority)} text-[10px] sm:text-xs flex-shrink-0`}>
                            {task.priority === "high" ? "ด่วน" : "ปกติ"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-4 mt-0.5 sm:mt-1 text-[10px] sm:text-sm text-gray-600">
                          <span className="flex items-center gap-1 truncate">
                            <Building2 className="h-2.5 w-2.5 sm:h-3 sm:w-3 flex-shrink-0" />
                            <span className="truncate">{task.customer}</span>
                          </span>
                          <span className="flex items-center gap-1 flex-shrink-0">
                            <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                            {task.time}
                          </span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        style={{
                          background: roleTheme.gradient,
                          color: "white",
                          border: "none",
                        }}
                        className="rounded-lg text-xs h-7 px-2 sm:h-8 sm:px-3"
                      >
                        <span className="hidden sm:inline">เริ่มทำ</span>
                        <span className="sm:hidden">ทำ</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pending Approvals (for Manager/Admin) */}
            {(role === "sales_manager" || role === "admin") && (
              <Card className="border-2" style={{ borderColor: roleTheme.primaryLight }}>
                <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-6" style={{ background: roleTheme.primaryLight }}>
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base" style={{ color: roleTheme.primary }}>
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="hidden sm:inline">รออนุมัติ ({pendingApprovals.length})</span>
                    <span className="sm:hidden">รออนุมัติ ({pendingApprovals.length})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {pendingApprovals.map((approval) => (
                      <div
                        key={approval.id}
                        className="p-3 sm:p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-[10px] sm:text-xs">
                            {approval.type}
                          </Badge>
                          <Badge className={`${getPriorityColor(approval.priority)} text-[10px] sm:text-xs`}>
                            {approval.priority === "high" ? "ด่วน" : "ปกติ"}
                          </Badge>
                        </div>
                        <p className="font-medium text-gray-900 text-xs sm:text-sm mb-1 line-clamp-2">{approval.title}</p>
                        <p className="text-base sm:text-lg font-bold" style={{ color: roleTheme.primary }}>
                          {approval.amount}
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-[10px] sm:text-xs text-gray-600">
                          <Avatar className="h-4 w-4 sm:h-5 sm:w-5">
                            <AvatarFallback className="text-[8px] sm:text-xs bg-gray-200">
                              {approval.submittedBy
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="truncate">{approval.submittedAt}</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white text-[10px] sm:text-xs h-7 sm:h-8"
                          >
                            อนุมัติ
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 border-red-200 text-red-600 hover:bg-red-50 text-[10px] sm:text-xs h-7 sm:h-8"
                          >
                            ปฏิเสธ
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Hot Deals Widget (for Sales Rep) */}
            {role === "sales" && (
              <Card className="border-2" style={{ borderColor: roleTheme.primaryLight }}>
                <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-6" style={{ background: roleTheme.primaryLight }}>
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base" style={{ color: roleTheme.primary }}>
                    <Target className="h-4 w-4 sm:h-5 sm:w-5" />
                    ดีลเร่งด่วน
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                  {hotDeals.slice(0, 2).map((deal) => (
                    <div
                      key={deal.id}
                      className="p-2.5 sm:p-3 border-2 rounded-xl hover:shadow-md transition-shadow cursor-pointer"
                      style={{ borderColor: roleTheme.primaryLight }}
                    >
                      <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                        <span className="text-[10px] sm:text-xs font-medium text-gray-600">{deal.id}</span>
                        <Badge className={getStageColor(deal.stage)} style={{ fontSize: "9px" }}>
                          {deal.stage}
                        </Badge>
                      </div>
                      <p className="font-medium text-xs sm:text-sm text-gray-900 mb-1 truncate">{deal.customer}</p>
                      <p className="text-lg sm:text-xl font-bold mb-1.5 sm:mb-2" style={{ color: roleTheme.primary }}>
                        {deal.value}
                      </p>
                      <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-600 mb-1.5 sm:mb-2">
                        <span>{deal.probability}% โอกาส</span>
                        <span>{deal.daysOpen} วัน</span>
                      </div>
                      <Button
                        size="sm"
                        className="w-full text-[10px] sm:text-xs h-7 sm:h-8"
                        style={{
                          background: roleTheme.gradient,
                          color: "white",
                          border: "none",
                        }}
                      >
                        {deal.nextAction}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Hot Deals Table (Full Width for All Roles) */}
          <Card className="border-2" style={{ borderColor: roleTheme.primaryLight }}>
            <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6 pb-2 sm:pb-4" style={{ background: roleTheme.primaryLight }}>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-sm sm:text-base" style={{ color: roleTheme.primary }}>
                  <Target className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">ดีลที่ต้องติดตามอย่างใกล้ชิด</span>
                  <span className="sm:hidden">ดีลสำคัญ</span>
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate?.("/deals")}
                  style={{ color: roleTheme.primary }}
                  className="text-xs sm:text-sm"
                >
                  <span className="hidden sm:inline">ดู Pipeline เต็ม</span>
                  <span className="sm:hidden">ทั้งหมด</span>
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {/* Mobile Card View */}
              <div className="block lg:hidden divide-y">
                {hotDeals.map((deal) => (
                  <div
                    key={deal.id}
                    className="p-3 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => onNavigate?.("/deals/" + deal.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-medium" style={{ color: roleTheme.primary }}>
                        {deal.id}
                      </span>
                      <Badge className={getStageColor(deal.stage)} style={{ fontSize: "10px" }}>
                        {deal.stage}
                      </Badge>
                    </div>
                    <p className="font-medium text-sm text-gray-900 mb-1">{deal.customer}</p>
                    <p className="text-lg font-bold mb-2" style={{ color: roleTheme.primary }}>
                      {deal.value}
                    </p>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-400 to-green-600"
                          style={{ width: `${deal.probability}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-700">{deal.probability}%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>ต่อไป: {deal.nextAction}</span>
                      <div className="flex items-center gap-1">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-[8px]" style={{ background: roleTheme.primaryLight, color: roleTheme.primary }}>
                            {deal.owner
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span>{deal.owner.split(" ")[0]}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2" style={{ borderColor: roleTheme.primaryLight }}>
                    <tr>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">ดีล ID</th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">ลูกค้า</th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">มูลค่า</th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">ขั้นตอน</th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">โอกาสสำเร็จ</th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">ต่อไป</th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">ผู้รับผิดชอบ</th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {hotDeals.map((deal) => (
                      <tr key={deal.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <span className="font-medium text-sm" style={{ color: roleTheme.primary }}>
                            {deal.id}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-sm text-gray-900">{deal.customer}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-sm font-bold text-gray-900">{deal.value}</span>
                        </td>
                        <td className="py-4 px-6">
                          <Badge className={getStageColor(deal.stage)}>{deal.stage}</Badge>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-green-400 to-green-600"
                                style={{ width: `${deal.probability}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-700">{deal.probability}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-sm text-gray-700">{deal.nextAction}</span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7">
                              <AvatarFallback className="text-xs" style={{ background: roleTheme.primaryLight, color: roleTheme.primary }}>
                                {deal.owner
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-700">{deal.owner.split(" ")[0]}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => onNavigate?.("/deals/" + deal.id)}
                              style={{ color: roleTheme.primary }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => onNavigate?.("/deals/" + deal.id)}
                              style={{ color: roleTheme.primary }}
                            >
                              <Edit className="h-4 w-4" />
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
        </div>
      </div>
    </div>
  );
}