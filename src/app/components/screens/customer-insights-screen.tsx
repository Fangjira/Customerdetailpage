import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRoleTheme } from "../../hooks/use-role-theme";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Award,
  AlertTriangle,
  DollarSign,
  Package,
  ArrowUpRight,
  Eye,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Clock,
  Activity,
  Zap,
  Filter,
  Download,
  RefreshCw,
  Brain,
  Sparkles,
  BarChart3,
  PieChart,
  Calendar,
  ShoppingBag,
  Building2,
  Star,
  Percent,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface CustomerInsightsScreenProps {
  onNavigate?: (path: string, customerId?: string) => void;
}

export function CustomerInsightsScreen({ onNavigate }: CustomerInsightsScreenProps) {
  const { t } = useTranslation();
  const roleTheme = useRoleTheme();
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  // ==================== MOCK DATA ====================

  // Key Metrics
  const keyMetrics = [
    {
      title: "ลูกค้าทั้งหมด",
      value: "1,247",
      change: "+12.5%",
      trend: "up" as const,
      icon: Users,
      color: roleTheme.primary,
      bgColor: `${roleTheme.primary}15`,
    },
    {
      title: "รายได้รวม",
      value: "฿3.02M",
      change: "+8.2%",
      trend: "up" as const,
      icon: DollarSign,
      color: "#10b981",
      bgColor: "#10b98115",
    },
    {
      title: "คะแนนความพึงพอใจ",
      value: "88",
      change: "+3 คะแนน",
      trend: "up" as const,
      icon: Star,
      color: "#f59e0b",
      bgColor: "#f59e0b15",
    },
    {
      title: "Retention Rate",
      value: "94.2%",
      change: "+2.1%",
      trend: "up" as const,
      icon: Target,
      color: "#6366f1",
      bgColor: "#6366f115",
    },
  ];

  // Customer Segment Distribution
  const segmentData = [
    { name: "Enterprise", value: 285, percentage: 23, color: roleTheme.primary },
    { name: "Premium", value: 412, percentage: 33, color: "#10b981" },
    { name: "SME", value: 350, percentage: 28, color: "#f59e0b" },
    { name: "Personal", value: 200, percentage: 16, color: "#94a3b8" },
  ];

  // Revenue Trend Data (6 months)
  const revenueTrendData = [
    { month: "Jan", revenue: 2400, customers: 1180, avgValue: 2034 },
    { month: "Feb", revenue: 2520, customers: 1195, avgValue: 2109 },
    { month: "Mar", revenue: 2650, customers: 1210, avgValue: 2190 },
    { month: "Apr", revenue: 2780, customers: 1225, avgValue: 2269 },
    { month: "May", revenue: 2890, customers: 1238, avgValue: 2334 },
    { month: "Jun", revenue: 3020, customers: 1247, avgValue: 2422 },
  ];

  // Top Customers by Revenue
  const topCustomers = [
    { rank: 1, name: "บริษัท ABC จำกัด", segment: "Enterprise", revenue: 145000, growth: 15, deals: 8 },
    { rank: 2, name: "XYZ Corporation", segment: "Enterprise", revenue: 132000, growth: 22, deals: 6 },
    { rank: 3, name: "บริษัท DEF จำกัด", segment: "Premium", revenue: 98000, growth: -5, deals: 12 },
    { rank: 4, name: "GHI Industries", segment: "Enterprise", revenue: 87000, growth: 18, deals: 5 },
    { rank: 5, name: "คุณสมชาย ใจดี", segment: "Premium", revenue: 76000, growth: 8, deals: 4 },
  ];

  // Churn Risk Analysis
  const churnRiskData = [
    { risk: "Low Risk", count: 987, percentage: 79, color: roleTheme.primary },
    { risk: "Medium Risk", count: 237, percentage: 19, color: "#f59e0b" },
    { risk: "High Risk", count: 23, percentage: 2, color: "#ef4444" },
  ];

  // Service Performance
  const servicePerformance = [
    { service: "Business Storage", revenue: 1250, customers: 342, satisfaction: 92 },
    { service: "Personal Storage", revenue: 980, customers: 456, satisfaction: 88 },
    { service: "Wine Storage", revenue: 420, customers: 89, satisfaction: 95 },
    { service: "Safe Deposit", revenue: 185, customers: 124, satisfaction: 90 },
    { service: "Luggage Transfer", revenue: 95, customers: 78, satisfaction: 85 },
  ];

  // Growth Opportunities
  const opportunities = [
    {
      id: 1,
      type: "Upsell",
      customer: "บริษัท ABC จำกัด",
      description: "Upgrade to larger storage space",
      potential: 12000,
      probability: 85,
      priority: "high" as const,
    },
    {
      id: 2,
      type: "Cross-sell",
      customer: "คุณสมชาย ใจดี",
      description: "Add Safe Deposit service",
      potential: 3000,
      probability: 65,
      priority: "medium" as const,
    },
    {
      id: 3,
      type: "Win-back",
      customer: "ร้านค้า XYZ",
      description: "Re-engage inactive customer",
      potential: 8500,
      probability: 45,
      priority: "medium" as const,
    },
    {
      id: 4,
      type: "Upsell",
      customer: "GHI Industries",
      description: "Premium service upgrade",
      potential: 15000,
      probability: 72,
      priority: "high" as const,
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "low":
        return "bg-blue-100 text-blue-700 border-blue-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto p-4 sm:p-6 space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div 
                className="h-12 w-12 rounded-xl flex items-center justify-center shadow-md"
                style={{ background: `linear-gradient(135deg, ${roleTheme.primary}, ${roleTheme.gradientTo})` }}
              >
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Customer Insights</h1>
                <p className="text-sm text-gray-500">ข้อมูลเชิงลึกและแนวโน้มลูกค้า</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Period Selector */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
              <Button
                variant={selectedPeriod === "week" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedPeriod("week")}
                className="h-8"
                style={selectedPeriod === "week" ? { backgroundColor: roleTheme.primary } : {}}
              >
                7 วัน
              </Button>
              <Button
                variant={selectedPeriod === "month" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedPeriod("month")}
                className="h-8"
                style={selectedPeriod === "month" ? { backgroundColor: roleTheme.primary } : {}}
              >
                30 วัน
              </Button>
              <Button
                variant={selectedPeriod === "quarter" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedPeriod("quarter")}
                className="h-8"
                style={selectedPeriod === "quarter" ? { backgroundColor: roleTheme.primary } : {}}
              >
                90 วัน
              </Button>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              ตัวกรอง
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {keyMetrics.map((metric, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-0 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div 
                    className="h-12 w-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: metric.bgColor }}
                  >
                    <metric.icon className="h-6 w-6" style={{ color: metric.color }} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-semibold ${
                    metric.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}>
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <span>{metric.change}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">{metric.title}</p>
                <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Trend Chart */}
          <Card className="lg:col-span-2 border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" style={{ color: roleTheme.primary }} />
                  แนวโน้มรายได้
                </CardTitle>
                <Badge variant="outline" className="text-xs">
                  Last 6 months
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={revenueTrendData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={roleTheme.primary} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={roleTheme.primary} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12 }}
                    stroke="#94a3b8"
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    stroke="#94a3b8"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '8px', 
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke={roleTheme.primary}
                    strokeWidth={3}
                    fill="url(#colorRevenue)" 
                    name="รายได้ (พันบาท)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Customer Segments Pie Chart */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <PieChart className="h-5 w-5" style={{ color: roleTheme.primary }} />
                กลุ่มลูกค้า
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <RePieChart>
                  <Pie
                    data={segmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {segmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {segmentData.map((segment, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="h-3 w-3 rounded-full" 
                        style={{ backgroundColor: segment.color }}
                      />
                      <span className="text-gray-700">{segment.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">{segment.value}</span>
                      <span className="text-gray-500">({segment.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Customers & Churn Risk */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Customers */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Award className="h-5 w-5" style={{ color: roleTheme.primary }} />
                  Top 5 ลูกค้า
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-xs">
                  ดูทั้งหมด →
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {topCustomers.map((customer) => (
                <div 
                  key={customer.rank}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border border-gray-100"
                  onClick={() => onNavigate?.("/customer-detail", customer.name)}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div 
                      className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${roleTheme.primary}, ${roleTheme.gradientTo})` }}
                    >
                      #{customer.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">{customer.name}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Badge variant="outline" className="text-xs px-2 py-0">
                          {customer.segment}
                        </Badge>
                        <span>{customer.deals} ดีล</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-3">
                    <p className="font-bold text-gray-900">฿{(customer.revenue / 1000).toFixed(0)}K</p>
                    <div className={`flex items-center gap-1 text-xs ${
                      customer.growth >= 0 ? "text-green-600" : "text-red-600"
                    }`}>
                      {customer.growth >= 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      <span>{customer.growth >= 0 ? '+' : ''}{customer.growth}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Churn Risk Analysis */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" style={{ color: roleTheme.primary }} />
                การวิเคราะห์ความเสี่ยง
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {churnRiskData.map((risk, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div 
                          className="h-3 w-3 rounded-full" 
                          style={{ backgroundColor: risk.color }}
                        />
                        <span className="text-sm font-medium text-gray-700">{risk.risk}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-gray-900">{risk.count}</span>
                        <span className="text-xs text-gray-500 ml-2">({risk.percentage}%)</span>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${risk.percentage}%`,
                          backgroundColor: risk.color
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2 border-red-200 hover:bg-red-50"
                  onClick={() => console.log("View high risk customers")}
                >
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span className="text-sm">ดูลูกค้าความเสี่ยงสูง (23)</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  style={{ borderColor: roleTheme.lighter, color: roleTheme.primary }}
                  onClick={() => console.log("Generate retention plan")}
                >
                  <Target className="h-4 w-4" />
                  <span className="text-sm">สร้างแผน Retention</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Growth Opportunities */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Zap className="h-5 w-5" style={{ color: roleTheme.primary }} />
                โอกาสเพิ่มรายได้
              </CardTitle>
              <Badge className="text-xs" style={{ backgroundColor: `${roleTheme.primary}20`, color: roleTheme.primary }}>
                {opportunities.length} โอกาส
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {opportunities.map((opp) => (
                <div 
                  key={opp.id}
                  className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all cursor-pointer bg-white"
                >
                  <div className="flex items-start justify-between mb-3">
                    <Badge 
                      variant="outline" 
                      className={`text-xs font-semibold ${getPriorityColor(opp.priority)}`}
                    >
                      {opp.priority === "high" ? "สูง" : "ปานกลาง"}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {opp.type}
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm">{opp.customer}</h4>
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">{opp.description}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-bold text-green-600">
                        ฿{(opp.potential / 1000).toFixed(1)}K
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Percent className="h-3 w-3" />
                      <span>{opp.probability}% โอกาสสำเร็จ</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Service Performance Table */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Package className="h-5 w-5" style={{ color: roleTheme.primary }} />
              ประสิทธิภาพบริการ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">บริการ</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">รายได้</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">ลูกค้า</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">ความพึงพอใจ</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">AVG/ลูกค้า</th>
                  </tr>
                </thead>
                <tbody>
                  {servicePerformance.map((service, index) => (
                    <tr 
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div 
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: roleTheme.primary }}
                          />
                          <span className="text-sm font-medium text-gray-900">{service.service}</span>
                        </div>
                      </td>
                      <td className="text-right py-3 px-4">
                        <span className="text-sm font-semibold text-gray-900">
                          ฿{service.revenue}K
                        </span>
                      </td>
                      <td className="text-right py-3 px-4">
                        <span className="text-sm text-gray-700">{service.customers}</span>
                      </td>
                      <td className="text-right py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full"
                              style={{ 
                                width: `${service.satisfaction}%`,
                                backgroundColor: service.satisfaction >= 90 ? '#10b981' : '#f59e0b'
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-700 w-10">
                            {service.satisfaction}%
                          </span>
                        </div>
                      </td>
                      <td className="text-right py-3 px-4">
                        <span className="text-sm text-gray-700">
                          ฿{Math.round(service.revenue * 1000 / service.customers).toLocaleString()}
                        </span>
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
  );
}
