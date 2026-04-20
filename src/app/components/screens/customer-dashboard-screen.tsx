import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import {
  Home,
  FileText,
  CreditCard,
  Clock,
  MapPin,
  Package,
  ChevronRight,
  Calendar,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";

interface CustomerDashboardScreenProps {
  userEmail: string;
  onNavigate: (path: string) => void;
}

export function CustomerDashboardScreen({ userEmail, onNavigate }: CustomerDashboardScreenProps) {
  const { t } = useTranslation();
  const [selectedBranch, setSelectedBranch] = useState("all");

  // Mock customer data
  const customerData = {
    name: "คุณสมชาย ใจดี",
    email: userEmail,
    phone: "+66 81 234 5678",
    customerId: "CUST-2024-0001",
    memberSince: "2023-01-15",
  };

  // Mock active bookings
  const activeBookings = [
    {
      id: "BOOK-001",
      roomType: "ห้องเก็บของธุรกิจ",
      size: "M (5 ตรม.)",
      branch: "สาขาสยาม",
      price: "฿3,500/เดือน",
      startDate: "2024-01-01",
      endDate: "2025-01-01",
      status: "active",
      daysLeft: 245,
    },
    {
      id: "BOOK-002",
      roomType: "ตู้ล็อกเกอร์",
      size: "Locker (0.6 ตรม.)",
      branch: "สาขารามอินทรา",
      price: "฿800/เดือน",
      startDate: "2024-02-01",
      endDate: "2024-08-01",
      status: "active",
      daysLeft: 62,
    },
  ];

  // Mock pending payments
  const pendingPayments = [
    {
      id: "INV-2024-001",
      description: "ค่าเช่าห้องเก็บของ - กุมภาพันธ์ 2024",
      amount: 3500,
      dueDate: "2024-02-05",
      status: "pending",
    },
  ];

  // Quick stats
  const stats = [
    {
      label: t("customer.active_rooms"),
      value: "2",
      icon: Home,
      color: "from-purple-500 to-purple-600",
      trend: "+1 เดือนนี้",
    },
    {
      label: t("customer.total_spent"),
      value: "฿51,600",
      icon: DollarSign,
      color: "from-blue-500 to-blue-600",
      trend: "ปีนี้",
    },
    {
      label: t("customer.pending_payment"),
      value: "฿3,500",
      icon: AlertCircle,
      color: "from-orange-500 to-orange-600",
      trend: "ครบกำหนด 5 ก.พ.",
    },
    {
      label: t("customer.member_days"),
      value: "385",
      icon: Calendar,
      color: "from-green-500 to-green-600",
      trend: "วัน",
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {t("customer.welcome")}, {customerData.name}
        </h1>
        <p className="text-muted-foreground">
          {t("customer.dashboard_subtitle")}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="border-2 rounded-2xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.trend}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Bookings */}
          <Card className="border-2 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">
                  {t("customer.my_rooms")}
                </h2>
                <Button
                  onClick={() => onNavigate("/customer-bookings")}
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:bg-secondary rounded-xl"
                >
                  {t("common.view_all")}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>

              <div className="space-y-4">
                {activeBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="p-4 rounded-xl border-2 border-border bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
                    onClick={() => onNavigate("/customer-booking-detail")}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-[#a78bfa] to-[#705add]">
                          <Package className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            {booking.roomType}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {booking.size}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground">{booking.price}</p>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                          booking.daysLeft > 90
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                        }`}>
                          <Clock className="h-3 w-3" />
                          เหลือ {booking.daysLeft} วัน
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {booking.branch}
                    </div>
                    <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        สัญญา: {booking.startDate} - {booking.endDate}
                      </span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Payments */}
          {pendingPayments.length > 0 && (
            <Card className="border-2 rounded-2xl border-orange-200 dark:border-orange-900/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    <h2 className="text-xl font-bold text-foreground">
                      {t("customer.pending_payments")}
                    </h2>
                  </div>
                  <Button
                    onClick={() => onNavigate("/customer-payments")}
                    size="sm"
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl"
                  >
                    {t("customer.pay_now")}
                  </Button>
                </div>

                <div className="space-y-3">
                  {pendingPayments.map((payment) => (
                    <div
                      key={payment.id}
                      className="p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-900/50"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-foreground">
                            {payment.description}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            ครบกำหนด: {payment.dueDate}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-orange-600 dark:text-orange-400">
                            ฿{payment.amount.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="border-2 rounded-2xl">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-foreground mb-4">
                {t("customer.quick_actions")}
              </h2>
              <div className="space-y-2">
                <Button
                  onClick={() => onNavigate("/customer-book-room")}
                  className="w-full justify-start bg-gradient-to-r from-[#a78bfa] to-[#705add] hover:from-[#9333ea] hover:to-[#6d28d9] text-white rounded-xl"
                >
                  <Home className="h-4 w-4 mr-2" />
                  {t("customer.book_room")}
                </Button>
                <Button
                  onClick={() => onNavigate("/customer-contracts")}
                  variant="outline"
                  className="w-full justify-start border-2 rounded-xl hover:bg-secondary"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  {t("customer.view_contracts")}
                </Button>
                <Button
                  onClick={() => onNavigate("/customer-payments")}
                  variant="outline"
                  className="w-full justify-start border-2 rounded-xl hover:bg-secondary"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  {t("customer.payment_history")}
                </Button>
                <Button
                  onClick={() => onNavigate("/customer-support")}
                  variant="outline"
                  className="w-full justify-start border-2 rounded-xl hover:bg-secondary"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {t("customer.contact_support")}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="border-2 rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-foreground mb-4">
                {t("customer.need_help")}
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white dark:bg-gray-800">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">โทรศัพท์</p>
                    <p className="text-sm font-semibold text-foreground">02-710-4080</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white dark:bg-gray-800">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">อีเมล</p>
                    <p className="text-sm font-semibold text-foreground">support@onelink.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white dark:bg-gray-800">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">เวลาทำการ</p>
                    <p className="text-sm font-semibold text-foreground">24/7</p>
                  </div>
                </div>
              </div>
              <Button
                className="w-full mt-4 bg-white dark:bg-gray-800 text-primary hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl border-2"
                onClick={() => onNavigate("/customer-support")}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                {t("customer.chat_support")}
              </Button>
            </CardContent>
          </Card>

          {/* Account Info */}
          <Card className="border-2 rounded-2xl">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-foreground mb-4">
                {t("customer.account_info")}
              </h2>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">{t("customer.customer_id")}</p>
                  <p className="font-semibold text-foreground">{customerData.customerId}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">{t("customer.member_since")}</p>
                  <p className="font-semibold text-foreground">{customerData.memberSince}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">{t("common.email")}</p>
                  <p className="font-semibold text-foreground">{customerData.email}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">{t("common.phone")}</p>
                  <p className="font-semibold text-foreground">{customerData.phone}</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full mt-4 border-2 rounded-xl hover:bg-secondary"
                onClick={() => onNavigate("/profile-settings")}
              >
                {t("customer.edit_profile")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
