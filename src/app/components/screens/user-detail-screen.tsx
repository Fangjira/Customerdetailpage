import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Building2,
  Shield,
  Calendar,
  MapPin,
  Edit,
  Lock,
  Activity,
  FileText,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useRoleTheme } from "../../hooks/use-role-theme";

interface UserDetailScreenProps {
  userId: string;
  onBack: () => void;
  onEdit: (userId: string) => void;
}

export function UserDetailScreen({ userId, onBack, onEdit }: UserDetailScreenProps) {
  const { t } = useTranslation();
  const roleTheme = useRoleTheme();

  // Mock user data - ในการใช้งานจริงจะดึงจาก API
  const user = {
    id: userId,
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    phone: "+66 81 234 5678",
    role: "Sales Manager",
    department: "Sales Division",
    team: "Team A",
    branch: "Bangkok HQ",
    status: "active",
    joinDate: "2023-01-15",
    lastLogin: "2024-02-04 10:30 AM",
    avatar: "SJ",
    permissions: ["view_reports", "manage_team", "approve_quotations"],
    recentActivity: [
      { action: "อนุมัติใบเสนอราคา", detail: "QT-2024-001", time: "2 ชั่วโมงที่แล้ว" },
      { action: "แก้ไข Deal", detail: "DEAL-2024-045", time: "5 ชั่วโมงที่แล้ว" },
      { action: "เพิ่มลูกค้า", detail: "Acme Corp", time: "เมื่อวาน" },
    ],
  };

  const getStatusBadge = (status: string) => {
    if (status === "active") {
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Active
        </Badge>
      );
    }
    return (
      <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
        Inactive
      </Badge>
    );
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="mx-auto max-w-7xl p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="h-9 w-9 p-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">รายละเอียดผู้ใช้</h1>
              <p className="mt-1 text-sm text-gray-500">ข้อมูลและกิจกรรมของผู้ใช้ในระบบ</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => onEdit(userId)}
              className="gap-2"
            >
              <Edit className="h-4 w-4" />
              แก้ไขข้อมูล
            </Button>
            <Button
              variant="outline"
              className="gap-2"
            >
              <Lock className="h-4 w-4" />
              รีเซ็ตรหัสผ่าน
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - User Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start gap-6">
                <div
                  className="h-24 w-24 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-md flex-shrink-0"
                  style={{
                    background: `linear-gradient(to bottom right, ${roleTheme.gradientFrom}, ${roleTheme.gradientTo})`,
                  }}
                >
                  {user.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                    {getStatusBadge(user.status)}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Shield className="h-4 w-4" />
                      <span className="font-medium">{user.role}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>{user.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Organization Info */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">ข้อมูลองค์กร</h3>
              </div>
              <div className="p-6 grid grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <Building2 className="h-4 w-4" />
                    <span>แผนก</span>
                  </div>
                  <p className="text-base font-medium text-gray-900">{user.department}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <User className="h-4 w-4" />
                    <span>ทีม</span>
                  </div>
                  <p className="text-base font-medium text-gray-900">{user.team}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <MapPin className="h-4 w-4" />
                    <span>สาขา</span>
                  </div>
                  <p className="text-base font-medium text-gray-900">{user.branch}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <Calendar className="h-4 w-4" />
                    <span>วันที่เข้าร่วม</span>
                  </div>
                  <p className="text-base font-medium text-gray-900">{user.joinDate}</p>
                </div>
              </div>
            </div>

            {/* Permissions */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">สิทธิ์การใช้งาน</h3>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2">
                  {user.permissions.map((permission) => (
                    <Badge
                      key={permission}
                      className="bg-blue-50 text-blue-700 hover:bg-blue-50"
                    >
                      {permission}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">กิจกรรมล่าสุด</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {user.recentActivity.map((activity, index) => (
                  <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Activity className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600 mt-0.5">{activity.detail}</p>
                      </div>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Quick Actions */}
          <div className="space-y-6">
            {/* Login Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Clock className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Login ล่าสุด</h3>
              </div>
              <p className="text-sm text-gray-600">{user.lastLogin}</p>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-gray-900 mb-4">สถิติการใช้งาน</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Deals</span>
                    <span className="text-sm font-medium text-gray-900">24</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ 
                        width: '75%',
                        background: `linear-gradient(to right, ${roleTheme.gradientFrom}, ${roleTheme.gradientTo})`
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Quotations</span>
                    <span className="text-sm font-medium text-gray-900">18</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ 
                        width: '60%',
                        background: `linear-gradient(to right, ${roleTheme.gradientFrom}, ${roleTheme.gradientTo})`
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Tasks</span>
                    <span className="text-sm font-medium text-gray-900">32</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ 
                        width: '90%',
                        background: `linear-gradient(to right, ${roleTheme.gradientFrom}, ${roleTheme.gradientTo})`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-gray-900 mb-4">การดำเนินการ</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <FileText className="h-4 w-4" />
                  ดู Tasks ทั้งหมด
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Activity className="h-4 w-4" />
                  ดูประวัติการทำงาน
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 text-red-600 hover:text-red-700">
                  <Lock className="h-4 w-4" />
                  ระงับการใช้งาน
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
