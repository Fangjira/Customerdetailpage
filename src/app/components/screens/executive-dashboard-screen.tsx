import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ComposedChart,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export function ExecutiveDashboardScreen() {
  // KPI Data (8 Cards - Combined from Overview + HCP)
  const kpiData = [
    {
      label: "ISSUE",
      sublabel: "Count",
      value: "245",
      bgColor: "bg-blue-100",
      textColor: "text-blue-900",
    },
    {
      label: "WIN",
      sublabel: "Count",
      value: "182",
      bgColor: "bg-orange-100",
      textColor: "text-orange-900",
    },
    {
      label: "WIN RATE",
      sublabel: "%",
      value: "74.3%",
      bgColor: "bg-green-100",
      textColor: "text-green-900",
    },
    {
      label: "REVENUE",
      sublabel: "YTD",
      value: "10.37M",
      bgColor: "bg-blue-100",
      textColor: "text-blue-900",
    },
    {
      label: "COST",
      sublabel: "YTD",
      value: "9.95M",
      bgColor: "bg-red-100",
      textColor: "text-red-900",
    },
    {
      label: "GROSS",
      sublabel: "Profit",
      value: "0.42M",
      percentage: "(4.4%)",
      bgColor: "bg-orange-100",
      textColor: "text-orange-900",
    },
    {
      label: "NET",
      sublabel: "Profit",
      value: "0.19M",
      bgColor: "bg-green-100",
      textColor: "text-green-900",
    },
    {
      label: "NPM",
      sublabel: "%",
      value: "1.8%",
      bgColor: "bg-blue-100",
      textColor: "text-blue-900",
    },
  ];

  // Number of Deals Data
  const dealsData = [
    { id: "deal-1", month: "Jan", issue: 22, win: 18, lastYear: 20 },
    { id: "deal-2", month: "Feb", issue: 18, win: 14, lastYear: 19 },
    { id: "deal-3", month: "Mar", issue: 32, win: 22, lastYear: 24 },
    { id: "deal-4", month: "Apr", issue: 28, win: 20, lastYear: 22 },
    { id: "deal-5", month: "May", issue: 38, win: 28, lastYear: 26 },
    { id: "deal-6", month: "Jun", issue: 24, win: 18, lastYear: 20 },
    { id: "deal-7", month: "Jul", issue: 28, win: 22, lastYear: 23 },
    { id: "deal-8", month: "Aug", issue: 26, win: 20, lastYear: 21 },
    { id: "deal-9", month: "Sep", issue: 34, win: 28, lastYear: 25 },
    { id: "deal-10", month: "Oct", issue: 22, win: 16, lastYear: 19 },
    { id: "deal-11", month: "Nov", issue: 18, win: 14, lastYear: 17 },
    { id: "deal-12", month: "Dec", issue: 16, win: 12, lastYear: 15 },
  ];

  // Revenue Data (Actual vs Plan)
  const revenueData = [
    { id: "rev-1", month: "Jan", actual25: 10.4, plan26: 11.8, actualCum: 10.4, planCum: 11.8 },
    { id: "rev-2", month: "Feb", actual25: 8.5, plan26: 12.0, actualCum: 18.9, planCum: 23.8 },
    { id: "rev-3", month: "Mar", actual25: 9.2, plan26: 13.3, actualCum: 28.1, planCum: 37.1 },
    { id: "rev-4", month: "Apr", actual25: 10.1, plan26: 14.9, actualCum: 38.2, planCum: 52.0 },
    { id: "rev-5", month: "May", actual25: 11.5, plan26: 15.5, actualCum: 49.7, planCum: 67.5 },
    { id: "rev-6", month: "Jun", actual25: 12.8, plan26: 16.3, actualCum: 62.5, planCum: 83.8 },
    { id: "rev-7", month: "Jul", actual25: 13.2, plan26: 16.1, actualCum: 75.7, planCum: 99.9 },
    { id: "rev-8", month: "Aug", actual25: 14.6, plan26: 16.4, actualCum: 90.3, planCum: 116.3 },
    { id: "rev-9", month: "Sep", actual25: 15.1, plan26: 15.8, actualCum: 105.4, planCum: 132.1 },
    { id: "rev-10", month: "Oct", actual25: 15.8, plan26: 15.9, actualCum: 121.2, planCum: 148.0 },
    { id: "rev-11", month: "Nov", actual25: 16.2, plan26: 15.6, actualCum: 137.4, planCum: 163.6 },
    { id: "rev-12", month: "Dec", actual25: 16.5, plan26: 15.6, actualCum: 153.9, planCum: 179.2 },
  ];

  // Net Profit Data
  const profitData = [
    { id: "profit-1", month: "Jan", actual24: 0.2, actual25: 0.05, plan26: 0.1 },
    { id: "profit-2", month: "Feb", actual24: -0.2, actual25: 0.1, plan26: 0.3 },
    { id: "profit-3", month: "Mar", actual24: 0.2, actual25: -0.2, plan26: 0.2 },
    { id: "profit-4", month: "Apr", actual24: 0.1, actual25: -0.2, plan26: 0.1 },
    { id: "profit-5", month: "May", actual24: 0.4, actual25: -0.1, plan26: 0.3 },
    { id: "profit-6", month: "Jun", actual24: 0.3, actual25: 0.3, plan26: 0.7 },
    { id: "profit-7", month: "Jul", actual24: 0.5, actual25: -0.1, plan26: 0.6 },
    { id: "profit-8", month: "Aug", actual24: 0.6, actual25: 0.8, plan26: 0.6 },
    { id: "profit-9", month: "Sep", actual24: 0.6, actual25: 0.6, plan26: 0.6 },
    { id: "profit-10", month: "Oct", actual24: 0.6, actual25: 0.6, plan26: 0.6 },
    { id: "profit-11", month: "Nov", actual24: 0.8, actual25: 0.8, plan26: 0.6 },
    { id: "profit-12", month: "Dec", actual24: 0.8, actual25: 0.8, plan26: 0.6 },
  ];

  // Achievement Donut Data
  const revenueAchievementData = [
    { name: "Achieved", value: 6 },
    { name: "Remaining", value: 94 },
  ];

  const expenseIncurredData = [
    { name: "Incurred", value: 6 },
    { name: "Remaining", value: 94 },
  ];

  const profitAchievementData = [
    { name: "Achieved", value: 9 },
    { name: "Remaining", value: 91 },
  ];

  const COLORS = {
    revenue: ["#2563EB", "#E5E7EB"],
    expense: ["#EA580C", "#E5E7EB"],
    profit: ["#16A34A", "#E5E7EB"],
  };

  // Sales Pipeline Status
  const pipelineStatus = [
    { 
      stage: "Leads", 
      count: 45, 
      bgColor: "bg-gray-100", 
      textColor: "text-gray-700",
      conversion: "71.1%"
    },
    { 
      stage: "Qualified", 
      count: 32, 
      bgColor: "bg-blue-100", 
      textColor: "text-blue-700",
      conversion: "87.5%"
    },
    { 
      stage: "Proposal", 
      count: 28, 
      bgColor: "bg-yellow-100", 
      textColor: "text-yellow-700",
      conversion: "64.3%"
    },
    { 
      stage: "Negotiation", 
      count: 18, 
      bgColor: "bg-orange-100", 
      textColor: "text-orange-700",
      conversion: "83.3%"
    },
    { 
      stage: "Closed Won", 
      count: 15, 
      bgColor: "bg-green-100", 
      textColor: "text-green-700",
      conversion: "65.2%"
    },
    { 
      stage: "Closed Lost", 
      count: 8, 
      bgColor: "bg-red-100", 
      textColor: "text-red-700",
      conversion: null
    },
  ];

  // Financial Metrics Cards
  const financialMetrics = [
    {
      label: "REVENUE",
      ytd: "10.37 MB",
      plan2026: "175 MB",
      actual2025: "121.4 MB",
      status: "below",
      variance: "-41%",
    },
    {
      label: "COST (VC + FOH)",
      ytd: "(9.95) MB",
      plan2026: "(166.36) MB",
      actual2025: "(117.3) MB",
      status: "above",
      variance: "+6%",
    },
    {
      label: "GROSS PROFIT %",
      ytd: "4.4%",
      plan2026: "4.93%",
      actual2025: "3.3%",
      status: "below",
      variance: "-0.53%",
    },
    {
      label: "ADMIN",
      ytd: "(0.23) MB",
      plan2026: "(4.18) MB",
      actual2025: "(1.7) MB",
      status: "good",
      variance: "Below Budget",
    },
    {
      label: "NET PROFIT",
      ytd: "0.19 MB",
      plan2026: "4.45 MB",
      actual2025: "2.1 MB",
      status: "below",
      variance: "-96%",
    },
    {
      label: "NET PROFIT %",
      ytd: "1.8%",
      plan2026: "2.54%",
      actual2025: "1.75%",
      status: "neutral",
      variance: "On Track",
    },
  ];

  const renderCustomLabel = ({ value }: any) => {
    return `${value}%`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "above":
      case "good":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "below":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "above":
      case "good":
        return "text-green-600";
      case "below":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Badge */}
      <div className="flex items-center justify-between">
        <Badge className="bg-purple-600 hover:bg-purple-700 text-white text-xs">
          Executive Dashboard - Full Business Overview
        </Badge>
        <Badge className="bg-gray-100 text-gray-700 text-xs">
          Last Updated: 20 Feb 2026
        </Badge>
      </div>

      {/* SECTION 1: KPI Cards (8 Cards) */}
      <div>
        <h2 className="text-sm font-bold text-gray-900 mb-2">
          Key Performance Indicators
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
          {kpiData.map((kpi, index) => (
            <Card key={index} className={`border-none ${kpi.bgColor}`}>
              <CardContent className="p-3 text-center">
                <p className={`text-[10px] font-semibold ${kpi.textColor} mb-0.5`}>
                  {kpi.label}
                </p>
                <p className={`text-[9px] ${kpi.textColor} mb-1`}>{kpi.sublabel}</p>
                <p className={`text-lg font-bold ${kpi.textColor}`}>
                  {kpi.value}
                </p>
                {kpi.percentage && (
                  <p className={`text-[9px] ${kpi.textColor} mt-0.5`}>
                    {kpi.percentage}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* SECTION 2: Main Charts - Sales & Revenue */}
      <div>
        <h2 className="text-sm font-bold text-gray-900 mb-2">
          Sales & Revenue Analysis
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Number of Deals */}
          <Card className="border-gray-200" key="deals-chart-card">
            <CardContent className="p-4">
              <h3 className="text-xs font-bold text-gray-900 mb-2">
                Number of Deals
              </h3>

              {/* Legend */}
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  <span className="text-[10px] text-gray-600">Issue</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-orange-600"></div>
                  <span className="text-[10px] text-gray-600">Win</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                  <span className="text-[10px] text-gray-600">Last Year</span>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={200} key="deals-chart-container">
                <ComposedChart data={dealsData} id="exec-deals-chart" margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="month"
                    stroke="#9ca3af"
                    style={{ fontSize: "10px" }}
                  />
                  <YAxis stroke="#9ca3af" style={{ fontSize: "10px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "10px",
                    }}
                  />
                  <Bar dataKey="issue" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={15} name="Issue" />
                  <Bar dataKey="win" fill="#EA580C" radius={[4, 4, 0, 0]} barSize={15} name="Win" />
                  <Line
                    type="monotone"
                    dataKey="lastYear"
                    stroke="#9333EA"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#9333EA" }}
                    strokeDasharray="5 5"
                    name="Last Year"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue (Actual vs Plan) */}
          <Card className="border-gray-200" key="revenue-chart-card">
            <CardContent className="p-4">
              <h3 className="text-xs font-bold text-gray-900 mb-2">
                Revenue (Actual vs Plan)
              </h3>

              {/* Legend */}
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-700"></div>
                  <span className="text-[10px] text-gray-600">Actual 25</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <span className="text-[10px] text-gray-600">Plan 26</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-800"></div>
                  <span className="text-[10px] text-gray-600">Cumulative</span>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={200} key="revenue-chart-container">
                <ComposedChart data={revenueData} id="exec-revenue-chart" margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="month"
                    stroke="#9ca3af"
                    style={{ fontSize: "10px" }}
                  />
                  <YAxis stroke="#9ca3af" style={{ fontSize: "10px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "10px",
                    }}
                  />
                  <Bar dataKey="actual25" fill="#1D4ED8" radius={[4, 4, 0, 0]} barSize={12} name="Actual 25" />
                  <Bar dataKey="plan26" fill="#60A5FA" radius={[4, 4, 0, 0]} barSize={12} name="Plan 26" />
                  <Line
                    type="monotone"
                    dataKey="actualCum"
                    stroke="#991B1B"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#991B1B" }}
                    name="Actual Cumulative"
                  />
                  <Line
                    type="monotone"
                    dataKey="planCum"
                    stroke="#4B5563"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 3, fill: "#4B5563" }}
                    name="Plan Cumulative"
                  />
                </ComposedChart>
              </ResponsiveContainer>

              {/* Status Badge */}
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                <p className="text-[10px] font-bold text-red-700">
                  Actual: 10.4 MB vs Plan: 11.8 MB
                </p>
                <p className="text-[9px] text-red-600">⚠️ Below Plan by 1.4 MB (12%)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SECTION 3: Profitability Analysis */}
      <div>
        <h2 className="text-sm font-bold text-gray-900 mb-2">
          Profitability Analysis
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Net Profit Trend */}
          <Card className="border-gray-200" key="profit-chart-card">
            <CardContent className="p-4">
              <h3 className="text-xs font-bold text-gray-900 mb-2">
                Net Profit Trend
              </h3>

              {/* Legend */}
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-[10px] text-gray-600">Actual 24</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-600"></div>
                  <span className="text-[10px] text-gray-600">Actual 25</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-600"></div>
                  <span className="text-[10px] text-gray-600">Plan 26</span>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={200} key="profit-chart-container">
                <LineChart data={profitData} id="exec-profit-chart" margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="month"
                    stroke="#9ca3af"
                    style={{ fontSize: "10px" }}
                  />
                  <YAxis stroke="#9ca3af" style={{ fontSize: "10px" }} domain={[-1, 1]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "10px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="actual24"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#3B82F6" }}
                    name="Actual 24"
                  />
                  <Line
                    type="monotone"
                    dataKey="actual25"
                    stroke="#DC2626"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#DC2626" }}
                    name="Actual 25"
                  />
                  <Line
                    type="monotone"
                    dataKey="plan26"
                    stroke="#059669"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 3, fill: "#059669" }}
                    name="Plan 26"
                  />
                </LineChart>
              </ResponsiveContainer>

              {/* Status Badge */}
              <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
                <p className="text-[10px] font-bold text-green-700">
                  Actual: 0.2 MB vs Plan: 0.1 MB
                </p>
                <p className="text-[9px] text-green-600">✅ Above Plan by 0.1 MB (100%)</p>
              </div>
            </CardContent>
          </Card>

          {/* Achievement Progress */}
          <Card className="border-gray-200" key="achievement-chart-card">
            <CardContent className="p-4">
              <h3 className="text-xs font-bold text-gray-900 mb-3">
                Achievement Progress (YTD)
              </h3>

              <div className="grid grid-cols-3 gap-2">
                {/* Revenue Achievement */}
                <div className="text-center">
                  <h4 className="text-[10px] font-bold text-gray-700 mb-2">
                    Revenue<br/>Achievement
                  </h4>
                  <ResponsiveContainer width="100%" height={90} key="revenue-pie-container">
                    <PieChart id="exec-revenue-pie">
                      <Pie
                        data={revenueAchievementData}
                        cx="50%"
                        cy="50%"
                        innerRadius={20}
                        outerRadius={35}
                        dataKey="value"
                        label={renderCustomLabel}
                        labelLine={false}
                        nameKey="name"
                        isAnimationActive={false}
                      >
                        {revenueAchievementData.map((entry, index) => (
                          <Cell key={`revenue-cell-${index}`} fill={COLORS.revenue[index]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <p className="text-[9px] text-gray-600 mt-1">
                    Target: <span className="font-bold">11.8 MB</span>
                  </p>
                </div>

                {/* Expense Incurred */}
                <div className="text-center">
                  <h4 className="text-[10px] font-bold text-gray-700 mb-2">
                    Expense<br/>Incurred
                  </h4>
                  <ResponsiveContainer width="100%" height={90} key="expense-pie-container">
                    <PieChart id="exec-expense-pie">
                      <Pie
                        data={expenseIncurredData}
                        cx="50%"
                        cy="50%"
                        innerRadius={20}
                        outerRadius={35}
                        dataKey="value"
                        label={renderCustomLabel}
                        labelLine={false}
                        nameKey="name"
                        isAnimationActive={false}
                      >
                        {expenseIncurredData.map((entry, index) => (
                          <Cell key={`expense-cell-${index}`} fill={COLORS.expense[index]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <p className="text-[9px] text-gray-600 mt-1">
                    Budget: <span className="font-bold">11.7 MB</span>
                  </p>
                </div>

                {/* Profit Achievement */}
                <div className="text-center">
                  <h4 className="text-[10px] font-bold text-gray-700 mb-2">
                    Profit<br/>Achievement
                  </h4>
                  <ResponsiveContainer width="100%" height={90} key="profit-pie-container">
                    <PieChart id="exec-profit-pie">
                      <Pie
                        data={profitAchievementData}
                        cx="50%"
                        cy="50%"
                        innerRadius={20}
                        outerRadius={35}
                        dataKey="value"
                        label={renderCustomLabel}
                        labelLine={false}
                        nameKey="name"
                        isAnimationActive={false}
                      >
                        {profitAchievementData.map((entry, index) => (
                          <Cell key={`profit-cell-${index}`} fill={COLORS.profit[index]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <p className="text-[9px] text-gray-600 mt-1">
                    Target: <span className="font-bold">0.14 MB</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SECTION 4: Sales Pipeline Status */}
      <div>
        <h2 className="text-sm font-bold text-gray-900 mb-2">
          Sales Pipeline Status
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {pipelineStatus.map((status, index) => (
            <Card key={index} className={`border ${status.bgColor}`}>
              <CardContent className="p-3 text-center">
                <p className={`text-[10px] font-semibold ${status.textColor} mb-1`}>
                  {status.stage}
                </p>
                <p className={`text-2xl font-bold ${status.textColor} mb-1`}>
                  {status.count}
                </p>
                {status.conversion && (
                  <div className="flex items-center justify-center gap-1">
                    <div className={`text-[9px] font-semibold ${status.textColor}`}>
                      → {status.conversion}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* SECTION 5: Detailed Financial Metrics */}
      <div>
        <h2 className="text-sm font-bold text-gray-900 mb-2">
          Detailed Financial Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {financialMetrics.map((metric, index) => (
            <Card key={index} className="border-gray-200">
              <CardContent className="p-3">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-[10px] font-semibold text-gray-600">
                    {metric.label}
                  </p>
                  {getStatusIcon(metric.status)}
                </div>
                
                <p className="text-2xl font-bold text-gray-900 mb-2">
                  {metric.ytd}
                </p>
                
                <div className="space-y-0.5 text-[9px] text-gray-500">
                  <p>Plan 2026: <span className="font-semibold text-gray-700">{metric.plan2026}</span></p>
                  <p>Actual 2025: <span className="font-semibold text-gray-700">{metric.actual2025}</span></p>
                </div>

                <div className={`mt-2 pt-2 border-t border-gray-200 flex items-center justify-between`}>
                  <span className={`text-[9px] font-semibold ${getStatusColor(metric.status)}`}>
                    {metric.variance}
                  </span>
                  <Badge 
                    className={`text-[9px] ${
                      metric.status === 'good' || metric.status === 'above' 
                        ? 'bg-green-100 text-green-700' 
                        : metric.status === 'below' 
                        ? 'bg-red-100 text-red-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {metric.status === 'good' ? '✅ Good' : metric.status === 'above' ? '📈 Above' : metric.status === 'below' ? '⚠️ Below' : '➡️ Track'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}