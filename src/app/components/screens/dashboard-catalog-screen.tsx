import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Circle, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Line,
  LabelList,
} from "recharts";

// Mock data
const kpiData = [
  {
    id: "issue_count",
    title: "ISSUE",
    subtitle: "Count",
    value: "245",
    percent: "",
    bgColor: "#dbeafe",
    textColor: "#1e40af",
  },
  {
    id: "win_count",
    title: "WIN",
    subtitle: "Count",
    value: "182",
    percent: "(74.3%)",
    bgColor: "#fed7aa",
    textColor: "#c2410c",
  },
  {
    id: "issue_value",
    title: "ISSUE",
    subtitle: "Value",
    value: "1,250M",
    percent: "",
    bgColor: "#dbeafe",
    textColor: "#1e40af",
  },
  {
    id: "win_value",
    title: "WIN",
    subtitle: "Value",
    value: "980M",
    percent: "(78.4%)",
    bgColor: "#fed7aa",
    textColor: "#c2410c",
  },
  {
    id: "actual",
    title: "Actual",
    subtitle: "Revenue",
    value: "875M",
    percent: "(89.3%)",
    bgColor: "#d1fae5",
    textColor: "#065f46",
  },
];

const projectData = [
  { month: "Jan", issue: 18, win: 12, lastYear: 15 },
  { month: "Feb", issue: 22, win: 15, lastYear: 18 },
  { month: "Mar", issue: 25, win: 18, lastYear: 20 },
  { month: "Apr", issue: 20, win: 16, lastYear: 17 },
  { month: "May", issue: 28, win: 20, lastYear: 22 },
  { month: "Jun", issue: 24, win: 19, lastYear: 21 },
  { month: "Jul", issue: 26, win: 21, lastYear: 23 },
  { month: "Aug", issue: 23, win: 17, lastYear: 19 },
  { month: "Sep", issue: 27, win: 22, lastYear: 24 },
  { month: "Oct", issue: 21, win: 14, lastYear: 16 },
  { month: "Nov", issue: 19, win: 13, lastYear: 15 },
  { month: "Dec", issue: 12, win: 8, lastYear: 10 },
].map(item => ({
  ...item,
  winIssuePercent: Math.round((item.win / item.issue) * 100),
  lyPercent: Math.round((item.win / item.lastYear) * 100)
}));

const revenueData = [
  { month: "Jan", issue: 95000, win: 72000, actual: 68000, lastYear: 65000 },
  { month: "Feb", issue: 105000, win: 78000, actual: 73000, lastYear: 70000 },
  { month: "Mar", issue: 120000, win: 88000, actual: 82000, lastYear: 78000 },
  { month: "Apr", issue: 98000, win: 82000, actual: 76000, lastYear: 72000 },
  { month: "May", issue: 135000, win: 95000, actual: 88000, lastYear: 83000 },
  { month: "Jun", issue: 115000, win: 92000, actual: 85000, lastYear: 80000 },
  { month: "Jul", issue: 125000, win: 98000, actual: 91000, lastYear: 86000 },
  { month: "Aug", issue: 110000, win: 85000, actual: 79000, lastYear: 75000 },
  { month: "Sep", issue: 130000, win: 102000, actual: 94000, lastYear: 88000 },
  { month: "Oct", issue: 102000, win: 78000, actual: 72000, lastYear: 68000 },
  { month: "Nov", issue: 95000, win: 70000, actual: 65000, lastYear: 62000 },
  { month: "Dec", issue: 88000, win: 65000, actual: 60000, lastYear: 57000 },
].map(item => ({
  ...item,
  winIssuePercent: Math.round((item.win / item.issue) * 100),
  actualWinPercent: Math.round((item.actual / item.win) * 100),
  lyPercent: Math.round((item.actual / item.lastYear) * 100)
}));

// Sales Pipeline Status Data
const pipelineStatus = [
  { stage: "Leads", count: 45, color: "#94a3b8", bgColor: "#f1f5f9" },
  { stage: "Qualified", count: 32, color: "#60a5fa", bgColor: "#dbeafe" },
  { stage: "Proposal", count: 28, color: "#fbbf24", bgColor: "#fef3c7" },
  { stage: "Negotiation", count: 18, color: "#f97316", bgColor: "#fed7aa" },
  { stage: "Closed Won", count: 15, color: "#10b981", bgColor: "#d1fae5" },
  { stage: "Closed Lost", count: 8, color: "#ef4444", bgColor: "#fee2e2" },
];

// Deals Table Data
const dealsData = [
  {
    id: "D-001",
    dealName: "โครงการระบบ Logistics ABC Corporation",
    customer: "ABC Transport Co., Ltd.",
    stage: "Negotiation",
    value: "2,500,000",
    probability: "75%",
    closeDate: "2024-03-15",
    owner: "สมชาย วงศ์สกุล",
  },
  {
    id: "D-002",
    dealName: "ระบบ Warehouse Management XYZ",
    customer: "XYZ Logistics",
    stage: "Proposal",
    value: "3,200,000",
    probability: "60%",
    closeDate: "2024-03-20",
    owner: "อนุชา ศรีสวัสดิ์",
  },
  {
    id: "D-003",
    dealName: "ขนส่งสินค้าระหว่างประเทศ",
    customer: "Global Freight Ltd.",
    stage: "Closed Won",
    value: "2,800,000",
    probability: "100%",
    closeDate: "2024-02-28",
    owner: "วิภาวี จันทร์เจริญ",
  },
  {
    id: "D-004",
    dealName: "บริการขนส่งทางอากาศ",
    customer: "Air Cargo Plus",
    stage: "Qualified",
    value: "1,800,000",
    probability: "40%",
    closeDate: "2024-04-10",
    owner: "สมชาย วงศ์สกุล",
  },
  {
    id: "D-005",
    dealName: "โครงการคลังสินค้าอัตโนมัติ",
    customer: "Storage Solutions Inc.",
    stage: "Proposal",
    value: "4,500,000",
    probability: "65%",
    closeDate: "2024-03-25",
    owner: "อนุชา ศรีสวัสดิ์",
  },
];

interface DashboardCatalogScreenProps {
  onNavigate?: (path: string) => void;
}

export function DashboardCatalogScreen({ onNavigate }: DashboardCatalogScreenProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleBack = () => {
    if (onNavigate) {
      onNavigate("/dashboard");
    } else {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-4">
      {/* Back Button */}
      <div className="max-w-[1600px] mx-auto mb-2">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>ย้อนกลับ</span>
        </button>
      </div>

      <div className="max-w-[1600px] mx-auto space-y-2 md:space-y-3">
        {/* Top Section: KPI Cards + Charts */}
        <div className="space-y-2 md:space-y-3">
          {/* KPI Cards - แนวนอน 5 cards */}
          <div className="grid grid-cols-5 gap-2">
            {kpiData.map((kpi) => (
              <Card key={kpi.id} style={{ backgroundColor: kpi.bgColor, border: 'none' }}>
                <CardContent className={`${isMobile ? 'p-2' : 'p-3'}`}>
                  <div className="text-center">
                    <p 
                      className={`${isMobile ? 'text-[10px]' : 'text-sm'} font-bold mb-0.5`}
                      style={{ color: kpi.textColor }}
                    >
                      {kpi.title}
                    </p>
                    <p className={`${isMobile ? 'text-[8px]' : 'text-[10px]'} text-gray-600 mb-1`}>
                      {kpi.subtitle}
                    </p>
                    <div 
                      className={`${isMobile ? 'text-base' : 'text-2xl'} font-bold`}
                      style={{ color: kpi.textColor }}
                    >
                      {kpi.value}
                    </div>
                    {kpi.percent && (
                      <p className={`${isMobile ? 'text-[8px]' : 'text-[10px]'} text-gray-500`}>
                        {kpi.percent}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts - 2 กราฟแยกกัน */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {/* กราฟซ้าย: Number of Project */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className={`${isMobile ? 'text-sm' : 'text-base'} font-bold`}>
                  Number of Project
                </CardTitle>
              </CardHeader>
              <CardContent className={`${isMobile ? 'p-2' : 'p-4'} pt-0`}>
                <div className="flex items-center gap-3 mb-3 text-xs flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-[#2563eb] rounded-sm" />
                    <span>Issue</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-[#f97316] rounded-sm" />
                    <span>Win</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-[#94a3b8] rounded-sm" />
                    <span>Last Year</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={isMobile ? 180 : 280}>
                  <ComposedChart data={projectData} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: isMobile ? 9 : 11 }}
                    />
                    <YAxis 
                      tick={{ fontSize: isMobile ? 9 : 11 }}
                      width={isMobile ? 35 : 45}
                    />
                    <Tooltip 
                      contentStyle={{ fontSize: isMobile ? 10 : 12 }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-2 border border-gray-200 rounded shadow-lg">
                              <p className="text-xs font-semibold mb-1">{data.month}</p>
                              <p className="text-xs text-blue-600">Issue: {data.issue}</p>
                              <p className="text-xs text-orange-600">Win: {data.win}</p>
                              <p className="text-xs text-gray-600">Last Year: {data.lastYear}</p>
                              <div className="mt-1 pt-1 border-t border-gray-200">
                                <p className="text-xs font-semibold text-purple-600">% Win/Issue: {data.winIssuePercent}%</p>
                                <p className="text-xs font-semibold text-green-600">% vs LY: {data.lyPercent}%</p>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="issue" fill="#2563eb" radius={[4, 4, 0, 0]}>
                      <LabelList dataKey="issue" position="top" fontSize={isMobile ? 8 : 10} />
                    </Bar>
                    <Bar dataKey="win" fill="#f97316" radius={[4, 4, 0, 0]}>
                      <LabelList dataKey="win" position="top" fontSize={isMobile ? 8 : 10} />
                    </Bar>
                    <Bar dataKey="lastYear" fill="#94a3b8" radius={[4, 4, 0, 0]}>
                      <LabelList dataKey="lastYear" position="top" fontSize={isMobile ? 8 : 10} />
                    </Bar>
                    <Line 
                      type="monotone" 
                      dataKey="winIssuePercent" 
                      stroke="#a855f7" 
                      strokeWidth={2}
                      dot={{ fill: "#a855f7", r: 3 }}
                    >
                      <LabelList 
                        dataKey="winIssuePercent" 
                        position="top" 
                        fontSize={isMobile ? 7 : 9}
                        formatter={(value: number) => `${value}%`}
                        fill="#a855f7"
                      />
                    </Line>
                    <Line 
                      type="monotone" 
                      dataKey="lyPercent" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      dot={{ fill: "#10b981", r: 3 }}
                      strokeDasharray="5 5"
                    >
                      <LabelList 
                        dataKey="lyPercent" 
                        position="bottom" 
                        fontSize={isMobile ? 7 : 9}
                        formatter={(value: number) => `${value}%`}
                        fill="#10b981"
                      />
                    </Line>
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* กราฟขวา: REVENUE */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className={`${isMobile ? 'text-sm' : 'text-base'} font-bold`}>
                  REVENUE
                </CardTitle>
              </CardHeader>
              <CardContent className={`${isMobile ? 'p-2' : 'p-4'} pt-0`}>
                <div className="flex items-center gap-3 mb-3 text-xs flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-[#2563eb] rounded-sm" />
                    <span>Issue</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-[#f97316] rounded-sm" />
                    <span>Win</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-[#10b981] rounded-sm" />
                    <span>Actual</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-[#94a3b8] rounded-sm" />
                    <span>Last Year</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={isMobile ? 180 : 280}>
                  <ComposedChart data={revenueData} barGap={2}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: isMobile ? 9 : 11 }}
                    />
                    <YAxis 
                      tick={{ fontSize: isMobile ? 9 : 11 }}
                      width={isMobile ? 35 : 50}
                      tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                    />
                    <Tooltip 
                      contentStyle={{ fontSize: isMobile ? 10 : 12 }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-2 border border-gray-200 rounded shadow-lg">
                              <p className="text-xs font-semibold mb-1">{data.month}</p>
                              <p className="text-xs text-blue-600">Issue: ฿{(data.issue / 1000).toFixed(0)}K</p>
                              <p className="text-xs text-orange-600">Win: ฿{(data.win / 1000).toFixed(0)}K</p>
                              <p className="text-xs text-green-600">Actual: ฿{(data.actual / 1000).toFixed(0)}K</p>
                              <p className="text-xs text-gray-600">Last Year: ฿{(data.lastYear / 1000).toFixed(0)}K</p>
                              <div className="mt-1 pt-1 border-t border-gray-200">
                                <p className="text-xs font-semibold text-purple-600">% Win/Issue: {data.winIssuePercent}%</p>
                                <p className="text-xs font-semibold text-teal-600">% Actual/Win: {data.actualWinPercent}%</p>
                                <p className="text-xs font-semibold text-green-600">% vs LY: {data.lyPercent}%</p>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="issue" fill="#2563eb" radius={[4, 4, 0, 0]}>
                      <LabelList 
                        dataKey="issue" 
                        position="top" 
                        fontSize={isMobile ? 7 : 9}
                        formatter={(value: number) => `${(value / 1000).toFixed(0)}K`}
                      />
                    </Bar>
                    <Bar dataKey="win" fill="#f97316" radius={[4, 4, 0, 0]}>
                      <LabelList 
                        dataKey="win" 
                        position="top" 
                        fontSize={isMobile ? 7 : 9}
                        formatter={(value: number) => `${(value / 1000).toFixed(0)}K`}
                      />
                    </Bar>
                    <Bar dataKey="actual" fill="#10b981" radius={[4, 4, 0, 0]}>
                      <LabelList 
                        dataKey="actual" 
                        position="top" 
                        fontSize={isMobile ? 7 : 9}
                        formatter={(value: number) => `${(value / 1000).toFixed(0)}K`}
                      />
                    </Bar>
                    <Bar dataKey="lastYear" fill="#94a3b8" radius={[4, 4, 0, 0]}>
                      <LabelList 
                        dataKey="lastYear" 
                        position="top" 
                        fontSize={isMobile ? 7 : 9}
                        formatter={(value: number) => `${(value / 1000).toFixed(0)}K`}
                      />
                    </Bar>
                    <Line 
                      type="monotone" 
                      dataKey="winIssuePercent" 
                      stroke="#a855f7" 
                      strokeWidth={1.5}
                      dot={{ fill: "#a855f7", r: 2 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="actualWinPercent" 
                      stroke="#14b8a6" 
                      strokeWidth={1.5}
                      dot={{ fill: "#14b8a6", r: 2 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sales Pipeline Status */}
        <Card>
          <CardHeader className={`${isMobile ? 'p-2 pb-1' : 'pb-3'}`}>
            <CardTitle className={`${isMobile ? 'text-sm' : 'text-base'} font-bold`}>
              Sales Pipeline Status
            </CardTitle>
          </CardHeader>
          <CardContent className={`${isMobile ? 'p-2 pt-0' : 'p-4 pt-0'}`}>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-3">
              {pipelineStatus.map((status) => (
                <div
                  key={status.stage}
                  className="rounded-lg p-3 md:p-4 text-center border"
                  style={{ backgroundColor: status.bgColor, borderColor: status.color }}
                >
                  <p className={`${isMobile ? 'text-[9px]' : 'text-xs'} font-semibold text-gray-600 mb-1`}>
                    {status.stage}
                  </p>
                  <p
                    className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold`}
                    style={{ color: status.color }}
                  >
                    {status.count}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Deals Table */}
        <Card>
          <CardHeader className={`${isMobile ? 'p-2' : ''}`}>
            <CardTitle className={`${isMobile ? 'text-sm' : 'text-base'} font-bold`}>
              Active Deals
            </CardTitle>
          </CardHeader>
          <CardContent className={`${isMobile ? 'p-2' : ''}`}>
            {isMobile ? (
              <div className="space-y-2">
                {dealsData.map((deal) => (
                  <div key={deal.id} className="bg-gray-50 rounded-lg p-2">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] font-bold text-gray-900 truncate">{deal.dealName}</p>
                        <p className="text-[8px] text-gray-600">{deal.customer}</p>
                      </div>
                      <span className="text-[8px] font-semibold text-[#7BC9A6] ml-2 flex-shrink-0">
                        {deal.id}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[7px] text-gray-500">
                      <span>{deal.stage}</span>
                      <span>฿{(parseInt(deal.value) / 1000000).toFixed(2)}M</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left py-3 px-3 text-xs font-semibold text-gray-600">Deal ID</th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-gray-600">Deal Name</th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-gray-600">Customer</th>
                      <th className="text-center py-3 px-3 text-xs font-semibold text-gray-600">Stage</th>
                      <th className="text-right py-3 px-3 text-xs font-semibold text-gray-600">Value (฿)</th>
                      <th className="text-center py-3 px-3 text-xs font-semibold text-gray-600">Probability</th>
                      <th className="text-center py-3 px-3 text-xs font-semibold text-gray-600">Close Date</th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-gray-600">Owner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dealsData.map((deal) => {
                      const stageColors: Record<string, string> = {
                        "Leads": "bg-gray-100 text-gray-700",
                        "Qualified": "bg-blue-100 text-blue-700",
                        "Proposal": "bg-yellow-100 text-yellow-700",
                        "Negotiation": "bg-orange-100 text-orange-700",
                        "Closed Won": "bg-green-100 text-green-700",
                        "Closed Lost": "bg-red-100 text-red-700",
                      };
                      return (
                        <tr key={deal.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-3 text-xs font-semibold text-[#7BC9A6]">{deal.id}</td>
                          <td className="py-3 px-3 text-xs text-gray-900 font-medium">{deal.dealName}</td>
                          <td className="py-3 px-3 text-xs text-gray-600">{deal.customer}</td>
                          <td className="py-3 px-3 text-center">
                            <span className={`inline-block px-2 py-1 rounded-full text-[10px] font-semibold ${stageColors[deal.stage] || "bg-gray-100 text-gray-700"}`}>
                              {deal.stage}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-xs text-right font-semibold text-gray-900">
                            {parseInt(deal.value).toLocaleString()}
                          </td>
                          <td className="py-3 px-3 text-xs text-center font-semibold text-gray-900">{deal.probability}</td>
                          <td className="py-3 px-3 text-xs text-center text-gray-600">{deal.closeDate}</td>
                          <td className="py-3 px-3 text-xs text-gray-700">{deal.owner}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}