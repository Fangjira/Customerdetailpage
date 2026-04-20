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
} from "recharts";

export function OverviewDashboardScreen() {
  // KPI Data
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
      percentage: "(74.1%)",
      bgColor: "bg-orange-100",
      textColor: "text-orange-900",
    },
    {
      label: "ISSUE",
      sublabel: "Value",
      value: "1,250M",
      bgColor: "bg-blue-100",
      textColor: "text-blue-900",
    },
    {
      label: "WIN",
      sublabel: "Value",
      value: "980M",
      percentage: "(78.4%)",
      bgColor: "bg-orange-100",
      textColor: "text-orange-900",
    },
    {
      label: "Actual",
      sublabel: "Revenue",
      value: "875M",
      percentage: "(89.3%)",
      bgColor: "bg-green-100",
      textColor: "text-green-900",
    },
  ];

  // Number of Project Data
  const projectData = [
    { month: "Jan", issue: 22, win: 18, lastYear: 75 },
    { month: "Feb", issue: 18, win: 14, lastYear: 72 },
    { month: "Mar", issue: 32, win: 22, lastYear: 78 },
    { month: "Apr", issue: 28, win: 20, lastYear: 82 },
    { month: "May", issue: 38, win: 28, lastYear: 88 },
    { month: "Jun", issue: 24, win: 18, lastYear: 75 },
    { month: "Jul", issue: 28, win: 22, lastYear: 82 },
    { month: "Aug", issue: 26, win: 20, lastYear: 78 },
    { month: "Sep", issue: 34, win: 28, lastYear: 85 },
    { month: "Oct", issue: 22, win: 16, lastYear: 72 },
    { month: "Nov", issue: 18, win: 14, lastYear: 68 },
    { month: "Dec", issue: 16, win: 12, lastYear: 65 },
  ];

  // Revenue Data
  const revenueData = [
    { month: "Jan", issue: 950, win: 720, actual: 680, lastYear: 850 },
    { month: "Feb", issue: 880, win: 650, actual: 620, lastYear: 780 },
    { month: "Mar", issue: 1050, win: 780, actual: 750, lastYear: 920 },
    { month: "Apr", issue: 980, win: 720, actual: 690, lastYear: 850 },
    { month: "May", issue: 1320, win: 980, actual: 920, lastYear: 1050 },
    { month: "Jun", issue: 920, win: 680, actual: 650, lastYear: 820 },
    { month: "Jul", issue: 1180, win: 870, actual: 820, lastYear: 980 },
    { month: "Aug", issue: 1050, win: 780, actual: 740, lastYear: 920 },
    { month: "Sep", issue: 1380, win: 1020, actual: 980, lastYear: 1120 },
    { month: "Oct", issue: 980, win: 720, actual: 690, lastYear: 850 },
    { month: "Nov", issue: 920, win: 680, actual: 650, lastYear: 780 },
    { month: "Dec", issue: 880, win: 650, actual: 620, lastYear: 750 },
  ];

  // Sales Pipeline Status
  const pipelineStatus = [
    { stage: "Leads", count: 45, bgColor: "bg-gray-100", textColor: "text-gray-700" },
    { stage: "Qualified", count: 32, bgColor: "bg-blue-100", textColor: "text-blue-700" },
    { stage: "Proposal", count: 28, bgColor: "bg-yellow-100", textColor: "text-yellow-700" },
    { stage: "Negotiation", count: 18, bgColor: "bg-orange-100", textColor: "text-orange-700" },
    { stage: "Closed Won", count: 15, bgColor: "bg-green-100", textColor: "text-green-700" },
    { stage: "Closed Lost", count: 8, bgColor: "bg-red-100", textColor: "text-red-700" },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {kpiData.map((kpi, index) => (
          <Card key={index} className={`border-none ${kpi.bgColor}`}>
            <CardContent className="p-6 text-center">
              <p className={`text-xs font-semibold ${kpi.textColor} mb-1`}>
                {kpi.label}
              </p>
              <p className={`text-xs ${kpi.textColor} mb-2`}>{kpi.sublabel}</p>
              <p className={`text-3xl font-bold ${kpi.textColor}`}>
                {kpi.value}
              </p>
              {kpi.percentage && (
                <p className={`text-xs ${kpi.textColor} mt-1`}>
                  {kpi.percentage}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Number of Project Chart */}
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Number of Project
            </h3>

            {/* Legend */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-xs text-gray-600">Issue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-xs text-gray-600">Win</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-xs text-gray-600">Last Year</span>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={projectData}>
                <CartesianGrid key="grid-1" strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  key="xaxis-1"
                  dataKey="month"
                  stroke="#9ca3af"
                  style={{ fontSize: "11px" }}
                />
                <YAxis key="yaxis-1" stroke="#9ca3af" style={{ fontSize: "11px" }} domain={[0, 100]} />
                <Tooltip
                  key="tooltip-1"
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "11px",
                  }}
                />
                <Bar key="bar-issue" dataKey="issue" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar key="bar-win" dataKey="win" fill="#F97316" radius={[4, 4, 0, 0]} barSize={20} />
                <Line
                  key="line-lastYear"
                  type="monotone"
                  dataKey="lastYear"
                  stroke="#A855F7"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#A855F7" }}
                  strokeDasharray="5 5"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">REVENUE</h3>

            {/* Legend */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-xs text-gray-600">Issue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-xs text-gray-600">Win</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs text-gray-600">Actual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                <span className="text-xs text-gray-600">Last Year</span>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={revenueData}>
                <CartesianGrid key="grid-2" strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  key="xaxis-2"
                  dataKey="month"
                  stroke="#9ca3af"
                  style={{ fontSize: "11px" }}
                />
                <YAxis key="yaxis-2" stroke="#9ca3af" style={{ fontSize: "11px" }} domain={[0, 1400]} />
                <Tooltip
                  key="tooltip-2"
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "11px",
                  }}
                  formatter={(value: any) => `${value}M`}
                />
                <Bar key="bar-issue-2" dataKey="issue" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={15} />
                <Bar key="bar-win-2" dataKey="win" fill="#F97316" radius={[4, 4, 0, 0]} barSize={15} />
                <Bar key="bar-actual" dataKey="actual" fill="#10B981" radius={[4, 4, 0, 0]} barSize={15} />
                <Bar key="bar-lastYear" dataKey="lastYear" fill="#9CA3AF" radius={[4, 4, 0, 0]} barSize={15} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Sales Pipeline Status */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Sales Pipeline Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {pipelineStatus.map((status, index) => (
            <Card key={index} className={`border ${status.bgColor}`}>
              <CardContent className="p-6 text-center">
                <p className={`text-sm font-semibold ${status.textColor} mb-2`}>
                  {status.stage}
                </p>
                <p className={`text-4xl font-bold ${status.textColor}`}>
                  {status.count}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
