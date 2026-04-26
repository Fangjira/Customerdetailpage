import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Users,
  Target,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Clock,
  DollarSign,
  Activity,
  Award,
  Calendar,
  CheckCircle2,
  Package,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

interface SalesManagerDashboardProps {
  onNavigate?: (path: string) => void;
}

export function SalesManagerDashboard({ onNavigate }: SalesManagerDashboardProps) {
  const [timeRange, setTimeRange] = useState("30");

  // Manager KPI Cards
  const kpiCards = [
    {
      title: "Team Target",
      value: "฿45M",
      current: "฿32M",
      percentage: 71,
      trend: "up",
      icon: Target,
      color: "text-[#7BC9A6]",
      bgColor: "bg-[#7BC9A6]/10",
    },
    {
      title: "Team Members",
      value: "4",
      subtitle: "Active Sales",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Pipeline",
      value: "฿58M",
      change: "+18.2%",
      trend: "up",
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Team Win Rate",
      value: "68.5%",
      change: "+5.2%",
      trend: "up",
      icon: Award,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Avg Deal Size",
      value: "฿890K",
      change: "+12.8%",
      trend: "up",
      icon: Package,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Active Deals",
      value: "115",
      subtitle: "Across team",
      icon: Activity,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
    },
  ];

  // Team Performance Data
  const teamPerformance = [
    {
      name: "Sarah Chen",
      target: 9000000,
      actual: 8500000,
      deals: 28,
      winRate: 72,
      status: "on-track",
    },
    {
      name: "Michael Park",
      target: 9000000,
      actual: 7200000,
      deals: 24,
      winRate: 65,
      status: "needs-attention",
    },
    {
      name: "Emily Rodriguez",
      target: 9000000,
      actual: 6800000,
      deals: 31,
      winRate: 68,
      status: "needs-attention",
    },
    {
      name: "David Kim",
      target: 9000000,
      actual: 9500000,
      deals: 32,
      winRate: 75,
      status: "exceeding",
    },
  ];

  // Monthly Performance Chart Data
  const monthlyData = [
    { month: "Jan", team: 4200000, target: 4500000 },
    { month: "Feb", team: 3800000, target: 4500000 },
    { month: "Mar", team: 5100000, target: 4500000 },
    { month: "Apr", team: 4700000, target: 4500000 },
    { month: "May", team: 5300000, target: 4500000 },
    { month: "Jun", team: 4900000, target: 4500000 },
  ];

  // Pipeline by Stage
  const pipelineData = [
    { stage: "Lead", count: 45, value: 15000000 },
    { stage: "Qualified", count: 32, value: 22000000 },
    { stage: "Proposal", count: 18, value: 28000000 },
    { stage: "Negotiation", count: 12, value: 35000000 },
    { stage: "Won", count: 8, value: 42000000 },
  ];

  // Alerts & Actions
  const alerts = [
    {
      id: "1",
      type: "critical",
      title: "3 high-value deals stalled",
      description: "Deals worth ฿8.5M have no activity for 7+ days",
      action: "Review deals",
    },
    {
      id: "2",
      type: "warning",
      title: "Team member needs support",
      description: "Michael Park is 20% below target with 2 weeks left",
      action: "Schedule 1-on-1",
    },
    {
      id: "3",
      type: "info",
      title: "2 deals closing this week",
      description: "฿5.2M in potential revenue",
      action: "Monitor progress",
    },
  ];

  // Approvals Pending
  const pendingApprovals = [
    {
      id: "1",
      type: "Discount Approval",
      deal: "Enterprise CRM Implementation",
      amount: 5200000,
      requestedBy: "Sarah Chen",
      urgency: "high",
    },
    {
      id: "2",
      type: "Contract Terms",
      deal: "Digital Transformation Package",
      amount: 8500000,
      requestedBy: "David Kim",
      urgency: "medium",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "exceeding":
        return "bg-green-100 text-green-700 border-green-300";
      case "on-track":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "needs-attention":
        return "bg-orange-100 text-orange-700 border-orange-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "exceeding":
        return "เกินเป้า";
      case "on-track":
        return "ตามแผน";
      case "needs-attention":
        return "ต้องติดตาม";
      default:
        return status;
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Manager Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">ภาพรวมประสิทธิภาพทีมและดีลสำคัญ</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={timeRange === "7" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("7")}
          >
            7 วัน
          </Button>
          <Button
            variant={timeRange === "30" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("30")}
          >
            30 วัน
          </Button>
          <Button
            variant={timeRange === "90" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("90")}
          >
            90 วัน
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpiCards.map((card) => (
          <Card key={card.title} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`h-12 w-12 rounded-lg ${card.bgColor} flex items-center justify-center`}>
                  <card.icon className={`h-6 w-6 ${card.color}`} />
                </div>
                {card.trend && (
                  <div
                    className={`flex items-center gap-1 text-sm ${
                      card.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {card.trend === "up" ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <span>{card.change}</span>
                  </div>
                )}
              </div>
              <h3 className="text-sm text-muted-foreground mb-1">{card.title}</h3>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                {card.current && (
                  <span className="text-sm text-muted-foreground">/ {card.current}</span>
                )}
              </div>
              {card.percentage && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>Progress</span>
                    <span>{card.percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#7BC9A6]"
                      style={{ width: `${card.percentage}%` }}
                    />
                  </div>
                </div>
              )}
              {card.subtitle && <p className="text-sm text-muted-foreground mt-2">{card.subtitle}</p>}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alerts & Team Performance Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts & Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Alerts & Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border-2 cursor-pointer hover:shadow-md transition-shadow ${
                  alert.type === "critical"
                    ? "bg-red-50 border-red-200"
                    : alert.type === "warning"
                    ? "bg-orange-50 border-orange-200"
                    : "bg-blue-50 border-blue-200"
                }`}
                onClick={() => onNavigate?.("/manager/alerts")}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      alert.type === "critical"
                        ? "bg-red-500"
                        : alert.type === "warning"
                        ? "bg-orange-500"
                        : "bg-blue-500"
                    }`}
                  >
                    <AlertTriangle className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-gray-900 mb-1">{alert.title}</h4>
                    <p className="text-xs text-gray-600 mb-2">{alert.description}</p>
                    <Button size="sm" variant="outline" className="h-7 text-xs">
                      {alert.action}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Team Performance Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#7BC9A6]" />
              Team Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamPerformance.map((member) => (
                <div
                  key={member.name}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => onNavigate?.(`/manager/team/${member.name}`)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{member.name}</h4>
                      <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                        <span>{member.deals} deals</span>
                        <span>Win rate: {member.winRate}%</span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(member.status)}>
                      {getStatusText(member.status)}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Target</span>
                      <span className="font-semibold">
                        ฿{(member.target / 1000000).toFixed(1)}M
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Actual</span>
                      <span className="font-semibold text-[#7BC9A6]">
                        ฿{(member.actual / 1000000).toFixed(1)}M
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          member.status === "exceeding"
                            ? "bg-green-500"
                            : member.status === "on-track"
                            ? "bg-blue-500"
                            : "bg-orange-500"
                        }`}
                        style={{
                          width: `${Math.min((member.actual / member.target) * 100, 100)}%`,
                        }}
                      />
                    </div>
                    <div className="text-xs text-right text-muted-foreground">
                      {((member.actual / member.target) * 100).toFixed(1)}% of target
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Team Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis
                  tick={{ fontSize: 12 }}
                  stroke="#9ca3af"
                  tickFormatter={(value) => `฿${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip
                  contentStyle={{ fontSize: "12px", borderRadius: "8px", border: "1px solid #e5e7eb" }}
                  formatter={(value: number) => [`฿${(value / 1000000).toFixed(1)}M`, ""]}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Target"
                />
                <Line
                  type="monotone"
                  dataKey="team"
                  stroke="#7BC9A6"
                  strokeWidth={3}
                  dot={{ fill: "#7BC9A6", r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Actual"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pipeline by Stage */}
        <Card>
          <CardHeader>
            <CardTitle>Pipeline by Stage</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pipelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="stage" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis
                  tick={{ fontSize: 12 }}
                  stroke="#9ca3af"
                  tickFormatter={(value) => `฿${(value / 1000000).toFixed(0)}M`}
                />
                <Tooltip
                  contentStyle={{ fontSize: "12px", borderRadius: "8px", border: "1px solid #e5e7eb" }}
                  formatter={(value: number) => [`฿${(value / 1000000).toFixed(1)}M`, "Value"]}
                />
                <Bar dataKey="value" fill="#7BC9A6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Pending Approvals */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-[#7BC9A6]" />
              Pending Approvals
            </CardTitle>
            <Button size="sm" variant="outline" onClick={() => onNavigate?.("/manager/approvals")}>
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pendingApprovals.map((approval) => (
              <div
                key={approval.id}
                className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onNavigate?.(`/manager/approvals/${approval.id}`)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      className={
                        approval.urgency === "high"
                          ? "bg-red-100 text-red-700"
                          : "bg-orange-100 text-orange-700"
                      }
                    >
                      {approval.type}
                    </Badge>
                    {approval.urgency === "high" && (
                      <Badge className="bg-red-600 text-white">Urgent</Badge>
                    )}
                  </div>
                  <h4 className="font-semibold text-gray-900">{approval.deal}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Requested by {approval.requestedBy}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    ฿{(approval.amount / 1000000).toFixed(1)}M
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline" className="h-8">
                      Reject
                    </Button>
                    <Button size="sm" className="h-8 bg-[#7BC9A6] hover:bg-[#6CB88A]">
                      Approve
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
