import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export function HCPDashboardScreen() {
  // Revenue Data (MB)
  const revenueData = [
    { month: "1", actual25: 10.4, plan26: 11.8, actual25Value: 11.8, plan26Value: 11.5 },
    { month: "2", actual25: 8.5, plan26: 12.0, actual25Value: 11.5, plan26Value: 12.2 },
    { month: "3", actual25: 9.2, plan26: 13.3, actual25Value: 12.0, plan26Value: 13.3 },
    { month: "4", actual25: 10.1, plan26: 14.9, actual25Value: 13.3, plan26Value: 14.9 },
    { month: "5", actual25: 11.5, plan26: 15.5, actual25Value: 14.9, plan26Value: 15.5 },
    { month: "6", actual25: 12.8, plan26: 16.3, actual25Value: 15.5, plan26Value: 16.3 },
    { month: "7", actual25: 13.2, plan26: 16.1, actual25Value: 16.3, plan26Value: 16.1 },
    { month: "8", actual25: 14.6, plan26: 16.4, actual25Value: 16.1, plan26Value: 16.4 },
    { month: "9", actual25: 15.1, plan26: 15.8, actual25Value: 16.4, plan26Value: 15.8 },
    { month: "10", actual25: 15.8, plan26: 15.9, actual25Value: 15.8, plan26Value: 15.9 },
    { month: "11", actual25: 16.2, plan26: 15.6, actual25Value: 15.9, plan26Value: 15.6 },
    { month: "12", actual25: 16.5, plan26: 15.6, actual25Value: 15.6, plan26Value: 15.6 },
  ];

  // Net Profit Data (MB)
  const netProfitData = [
    { month: "1", actual24: 0.2, actual25: 0.05, plan26: 0.1 },
    { month: "2", actual24: -0.2, actual25: 0.1, plan26: 0.3 },
    { month: "3", actual24: 0.2, actual25: -0.2, plan26: 0.2 },
    { month: "4", actual24: 0.1, actual25: -0.2, plan26: 0.1 },
    { month: "5", actual24: 0.4, actual25: -0.1, plan26: 0.3 },
    { month: "6", actual24: 0.3, actual25: 0.3, plan26: 0.7 },
    { month: "7", actual24: 0.5, actual25: -0.1, plan26: 0.6 },
    { month: "8", actual24: 0.6, actual25: 0.8, plan26: 0.6 },
    { month: "9", actual24: 0.6, actual25: 0.6, plan26: 0.6 },
    { month: "10", actual24: 0.6, actual25: 0.6, plan26: 0.6 },
    { month: "11", actual24: 0.8, actual25: 0.8, plan26: 0.6 },
    { month: "12", actual24: 0.8, actual25: 0.8, plan26: 0.6 },
  ];

  // Donut Chart Data
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

  // สีใหม่ที่ดูง่ายและชัดเจนขึ้น
  const COLORS = {
    revenue: ["#2563EB", "#E5E7EB"], // น้ำเงินเข้ม + เทาอ่อน
    expense: ["#EA580C", "#E5E7EB"], // ส้มเข้ม + เทาอ่อน
    profit: ["#16A34A", "#E5E7EB"], // เขียวเข้ม + เทาอ่อน
  };

  const renderCustomLabel = ({ value }: any) => {
    return `${value}%`;
  };

  return (
    <div className="space-y-4 p-4">
      {/* Status Badge & Title */}
      <div className="flex items-center justify-between">
        <div>
          <Badge className="bg-orange-500 hover:bg-orange-600 text-white text-xs mb-2">
            Status: 10 Feb 2026
          </Badge>
          <h1 className="text-2xl font-bold text-blue-600">Financial Projection</h1>
        </div>
      </div>

      {/* Explanation Card */}
      <Card className="border-gray-200 bg-gray-50">
        <CardContent className="p-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Revenue is below plan</span> as newly onboarded customers are small accounts, coupled with fewer working days in January.
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">The net profit shown below differs from accounting figures</span> due to prior-year bonus accrual reversals and operating expense adjustments.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Revenue Chart */}
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-blue-600 text-center mb-2">Revenue (MB)</h3>
            </div>
            
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="month" 
                  stroke="#9ca3af" 
                  style={{ fontSize: "11px" }}
                  label={{ value: "Month", position: "insideBottom", offset: -5, style: { fontSize: "10px" } }}
                />
                <YAxis 
                  stroke="#9ca3af" 
                  style={{ fontSize: "11px" }}
                  domain={[0, 20]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "11px",
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: "11px" }}
                  iconType="rect"
                />
                <Bar dataKey="actual25" fill="#1D4ED8" name="Actual 25" radius={[4, 4, 0, 0]} />
                <Bar dataKey="plan26" fill="#60A5FA" name="Plan 26" radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="actual25Value" stroke="#991B1B" strokeWidth={3} name="Actual 25 Line" dot={{ r: 4, fill: "#991B1B" }} />
                <Line type="monotone" dataKey="plan26Value" stroke="#4B5563" strokeWidth={3} strokeDasharray="5 5" name="Plan 26 Line" dot={{ r: 4, fill: "#4B5563" }} />
              </BarChart>
            </ResponsiveContainer>

            {/* Revenue Metrics */}
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded">
              <p className="text-xs font-bold text-red-700">
                P:18 MB, A: 10.4 MB
              </p>
              <p className="text-xs text-red-600">Lower than plan</p>
              <p className="text-xs font-semibold text-red-700">(1.45) MB (12%)</p>
            </div>
          </CardContent>
        </Card>

        {/* Net Profit Chart */}
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-green-600 text-center mb-2">Net Profit (MB)</h3>
            </div>
            
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={netProfitData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="month" 
                  stroke="#9ca3af" 
                  style={{ fontSize: "11px" }}
                  label={{ value: "Month", position: "insideBottom", offset: -5, style: { fontSize: "10px" } }}
                />
                <YAxis 
                  stroke="#9ca3af" 
                  style={{ fontSize: "11px" }}
                  domain={[-1, 1]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "11px",
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: "11px" }}
                  iconType="line"
                />
                <Line type="monotone" dataKey="actual24" stroke="#3B82F6" strokeWidth={3} name="Actual 24" dot={{ r: 4, fill: "#3B82F6" }} />
                <Line type="monotone" dataKey="actual25" stroke="#DC2626" strokeWidth={3} name="Actual 25" dot={{ r: 4, fill: "#DC2626" }} />
                <Line type="monotone" dataKey="plan26" stroke="#059669" strokeWidth={3} strokeDasharray="5 5" name="Plan 26" dot={{ r: 4, fill: "#059669" }} />
              </LineChart>
            </ResponsiveContainer>

            {/* Profit Metrics */}
            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
              <p className="text-xs font-bold text-green-700">
                P: 0.1 MB, A: 0.2 MB
              </p>
              <p className="text-xs text-green-600">Better than plan</p>
              <p className="text-xs font-semibold text-green-700">0.05 MB (33%)</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section - Donut Charts & Metrics */}
      <Card className="border-gray-200 bg-gradient-to-r from-blue-900 to-blue-800">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left: Donut Charts */}
            <div className="grid grid-cols-3 gap-3">
              {/* Revenue Achievement */}
              <div className="bg-white rounded-lg p-3">
                <h4 className="text-xs font-bold text-center text-gray-700 mb-2">
                  % Revenue<br/>Achievement
                </h4>
                <ResponsiveContainer width="100%" height={100}>
                  <PieChart>
                    <Pie
                      data={revenueAchievementData}
                      cx="50%"
                      cy="50%"
                      innerRadius={25}
                      outerRadius={40}
                      dataKey="value"
                      label={renderCustomLabel}
                      labelLine={false}
                    >
                      {revenueAchievementData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS.revenue[index]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <p className="text-xs text-center text-gray-600 mt-1">
                  YTD Plan 2025: <span className="font-bold">11.8 MB</span>
                </p>
              </div>

              {/* Expense Incurred */}
              <div className="bg-white rounded-lg p-3">
                <h4 className="text-xs font-bold text-center text-gray-700 mb-2">
                  % Expense<br/>Incurred
                </h4>
                <ResponsiveContainer width="100%" height={100}>
                  <PieChart>
                    <Pie
                      data={expenseIncurredData}
                      cx="50%"
                      cy="50%"
                      innerRadius={25}
                      outerRadius={40}
                      dataKey="value"
                      label={renderCustomLabel}
                      labelLine={false}
                    >
                      {expenseIncurredData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS.expense[index]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <p className="text-xs text-center text-gray-600 mt-1">
                  YTD Plan 2025: <span className="font-bold">11.7 MB</span>
                </p>
              </div>

              {/* Profit Achievement */}
              <div className="bg-white rounded-lg p-3">
                <h4 className="text-xs font-bold text-center text-gray-700 mb-2">
                  % Profit<br/>Achievement
                </h4>
                <ResponsiveContainer width="100%" height={100}>
                  <PieChart>
                    <Pie
                      data={profitAchievementData}
                      cx="50%"
                      cy="50%"
                      innerRadius={25}
                      outerRadius={40}
                      dataKey="value"
                      label={renderCustomLabel}
                      labelLine={false}
                    >
                      {profitAchievementData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS.profit[index]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <p className="text-xs text-center text-gray-600 mt-1">
                  YTD Plan 2025: <span className="font-bold">0.14 MB</span>
                </p>
              </div>
            </div>

            {/* Right: Metrics Cards */}
            <div className="grid grid-cols-3 gap-2">
              {/* REVENUE */}
              <div className="bg-white rounded-lg p-3 text-center">
                <p className="text-xs font-semibold text-gray-600 mb-1">REVENUE</p>
                <p className="text-3xl font-bold text-blue-600">10.37</p>
                <p className="text-xs text-gray-500 mt-1">Plan 2026: <span className="font-semibold">175 MB</span></p>
                <p className="text-xs text-gray-500">Actual 2025: <span className="font-semibold">121.4 MB</span></p>
              </div>

              {/* COST */}
              <div className="bg-white rounded-lg p-3 text-center">
                <p className="text-xs font-semibold text-gray-600 mb-1">COST (VC + FOH)</p>
                <p className="text-3xl font-bold text-red-600">(9.95)</p>
                <p className="text-xs text-gray-500 mt-1">Plan 2026: <span className="font-semibold">(166.36) MB</span></p>
                <p className="text-xs text-gray-500">Actual 2025: <span className="font-semibold">(117.3) MB</span></p>
              </div>

              {/* GROSS PROFIT % */}
              <div className="bg-white rounded-lg p-3 text-center">
                <p className="text-xs font-semibold text-gray-600 mb-1">GROSS PROFIT %</p>
                <p className="text-3xl font-bold text-blue-600">4.4%</p>
                <p className="text-xs text-gray-500 mt-1">Plan 2026: <span className="font-semibold">4.93%</span></p>
                <p className="text-xs text-gray-500">Actual 2025: <span className="font-semibold">3.3%</span></p>
              </div>

              {/* ADMIN */}
              <div className="bg-white rounded-lg p-3 text-center">
                <p className="text-xs font-semibold text-gray-600 mb-1">ADMIN</p>
                <p className="text-3xl font-bold text-red-600">(0.23)</p>
                <p className="text-xs text-gray-500 mt-1">Plan 2026: <span className="font-semibold">(4.18) MB</span></p>
                <p className="text-xs text-gray-500">Actual 2025: <span className="font-semibold">(1.7) MB</span></p>
              </div>

              {/* NET PROFIT */}
              <div className="bg-white rounded-lg p-3 text-center">
                <p className="text-xs font-semibold text-gray-600 mb-1">NET PROFIT</p>
                <p className="text-3xl font-bold text-green-600">0.19</p>
                <p className="text-xs text-gray-500 mt-1">Plan 2026: <span className="font-semibold">4.45 MB</span></p>
                <p className="text-xs text-gray-500">Actual 2025: <span className="font-semibold">2.1 MB</span></p>
              </div>

              {/* NET PROFIT % */}
              <div className="bg-white rounded-lg p-3 text-center">
                <p className="text-xs font-semibold text-gray-600 mb-1">NET PROFIT %</p>
                <p className="text-3xl font-bold text-blue-600">1.8%</p>
                <p className="text-xs text-gray-500 mt-1">Plan 2026: <span className="font-semibold">2.54%</span></p>
                <p className="text-xs text-gray-500">Actual 2025: <span className="font-semibold">1.75%</span></p>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-300">
              *2026 figure is deviated from the system budget due to BIM Allocation (2MiB/year) & not including estimated headcount increased (approx. 150MB/year)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}