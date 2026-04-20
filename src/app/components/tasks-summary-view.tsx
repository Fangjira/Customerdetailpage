import { useMemo } from "react";
import { Card, CardContent } from "./ui/card";
import {
  CheckCircle2,
  Circle,
  AlertCircle,
  TrendingUp,
  Calendar,
  Clock,
  Target,
  Award,
  Zap,
  FileText,
  User,
} from "lucide-react";
import { Badge } from "./ui/badge";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "todo" | "in-progress" | "completed";
  dueDate: string;
  dueTime: string;
  assignee: string;
  completed: boolean;
  customer?: string;
  relatedTo?: string;
  activityType?: string;
}

interface TasksSummaryViewProps {
  tasks: Task[];
  selectedMonth: string; // Format: "2024-12"
  onMonthChange: (month: string) => void;
}

export function TasksSummaryView({ tasks, selectedMonth, onMonthChange }: TasksSummaryViewProps) {
  // Filter tasks for selected month
  const monthTasks = useMemo(() => {
    return tasks.filter((task) => {
      const taskMonth = task.dueDate.substring(0, 7); // "2024-12"
      return taskMonth === selectedMonth;
    }).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }, [tasks, selectedMonth]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = monthTasks.length;
    const completed = monthTasks.filter((t) => t.completed).length;
    const inProgress = monthTasks.filter((t) => t.status === "in-progress").length;
    const todo = monthTasks.filter((t) => t.status === "todo" && !t.completed).length;
    const overdue = monthTasks.filter(
      (t) => new Date(t.dueDate) < new Date() && !t.completed
    ).length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Priority breakdown
    const highPriority = monthTasks.filter((t) => t.priority === "high").length;
    const mediumPriority = monthTasks.filter((t) => t.priority === "medium").length;
    const lowPriority = monthTasks.filter((t) => t.priority === "low").length;

    // Top activity types
    const activityTypes: Record<string, number> = {};
    monthTasks.forEach((task) => {
      const type = task.activityType || "other";
      activityTypes[type] = (activityTypes[type] || 0) + 1;
    });
    const topActivities = Object.entries(activityTypes)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);

    return {
      total,
      completed,
      inProgress,
      todo,
      overdue,
      completionRate,
      highPriority,
      mediumPriority,
      lowPriority,
      topActivities,
    };
  }, [monthTasks]);

  // Get month name in Thai
  const getMonthName = (monthStr: string) => {
    const [year, month] = monthStr.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString("th-TH", { month: "long", year: "numeric" });
  };

  // Activity type labels and icons
  const activityTypeConfig: Record<string, { label: string; icon: string; color: string }> = {
    customer_visit: { label: "เยี่ยมลูกค้า", icon: "👥", color: "bg-blue-500" },
    meeting: { label: "ประชุม", icon: "📅", color: "bg-purple-500" },
    follow_up: { label: "ติดตามงาน", icon: "📞", color: "bg-orange-500" },
    site_survey: { label: "สำรวจพื้นที่", icon: "🗺️", color: "bg-green-500" },
    other: { label: "อื่นๆ", icon: "📋", color: "bg-gray-500" },
  };

  // Month navigation
  const currentDate = new Date();
  const currentMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}`;

  const handlePrevMonth = () => {
    const [year, month] = selectedMonth.split("-").map(Number);
    const prevMonth = new Date(year, month - 2);
    const newMonth = `${prevMonth.getFullYear()}-${String(prevMonth.getMonth() + 1).padStart(2, "0")}`;
    onMonthChange(newMonth);
  };

  const handleNextMonth = () => {
    const [year, month] = selectedMonth.split("-").map(Number);
    const nextMonth = new Date(year, month);
    const newMonth = `${nextMonth.getFullYear()}-${String(nextMonth.getMonth() + 1).padStart(2, "0")}`;
    onMonthChange(newMonth);
  };

  return (
    <div className="space-y-2">
      {/* Month Selector - Minimal */}
      <div className="flex items-center justify-between mb-2 px-1">
        <button
          onClick={handlePrevMonth}
          className="flex items-center justify-center w-7 h-7 rounded hover:bg-gray-100 transition-colors"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-gray-600" />
          <h2 className="text-sm font-semibold text-gray-900">{getMonthName(selectedMonth)}</h2>
          {selectedMonth === currentMonth && (
            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs px-1.5 py-0">เดือนนี้</Badge>
          )}
        </div>

        <button
          onClick={handleNextMonth}
          className="flex items-center justify-center w-7 h-7 rounded hover:bg-gray-100 transition-colors"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Alerts - Below */}
      {stats.overdue > 0 && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          <AlertCircle className="h-3.5 w-3.5 text-red-600 flex-shrink-0" />
          <p className="text-xs font-medium text-red-900">⚠️ งานเกินกำหนด {stats.overdue} รายการ</p>
        </div>
      )}

      {stats.completionRate >= 80 && stats.total >= 5 && (
        <div className="flex items-center gap-2 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg px-3 py-2">
          <Award className="h-3.5 w-3.5 text-amber-600 flex-shrink-0" />
          <p className="text-xs font-medium text-amber-900">🎉 ยอดเยี่ยม! ทำงานสำเร็จ {stats.completionRate}%</p>
        </div>
      )}

      {/* Detail Table - Very Compact */}
      <div className="bg-white rounded-lg border border-gray-200 p-3">
        <h3 className="text-xs font-semibold text-gray-900 flex items-center gap-1 mb-2">
          <FileText className="h-3 w-3 text-gray-600" />
          รายการทั้งหมด ({monthTasks.length})
        </h3>

        {monthTasks.length === 0 && (
          <div className="text-center py-6 text-gray-400">
            <p className="text-xs">ไม่มีข้อมูล</p>
          </div>
        )}

        {monthTasks.length > 0 && (
          <div className="overflow-x-auto -mx-3">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-2 py-1.5 text-left text-xs font-semibold text-gray-700">วันที่</th>
                  <th className="px-2 py-1.5 text-left text-xs font-semibold text-gray-700">งาน</th>
                  <th className="px-2 py-1.5 text-left text-xs font-semibold text-gray-700">ลูกค้า</th>
                  <th className="px-2 py-1.5 text-left text-xs font-semibold text-gray-700">ประเภท</th>
                  <th className="px-2 py-1.5 text-left text-xs font-semibold text-gray-700">สำคัญ</th>
                  <th className="px-2 py-1.5 text-left text-xs font-semibold text-gray-700">ผู้รับผิดชอบ</th>
                  <th className="px-2 py-1.5 text-left text-xs font-semibold text-gray-700">สถานะ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {monthTasks.map((task) => {
                  const config = activityTypeConfig[task.activityType || "other"];
                  const priorityColors = {
                    high: "bg-red-100 text-red-800",
                    medium: "bg-orange-100 text-orange-800",
                    low: "bg-blue-100 text-blue-800",
                  };
                  const priorityLabels = {
                    high: "สูง",
                    medium: "กลาง",
                    low: "ต่ำ",
                  };
                  const statusColors = {
                    completed: "bg-emerald-100 text-emerald-800",
                    "in-progress": "bg-orange-100 text-orange-800",
                    todo: "bg-gray-100 text-gray-800",
                  };
                  const statusLabels = {
                    completed: "✓",
                    "in-progress": "⟳",
                    todo: "○",
                  };

                  return (
                    <tr key={task.id} className="hover:bg-gray-50">
                      <td className="px-2 py-2 whitespace-nowrap">
                        <div className="text-xs font-medium text-gray-900">
                          {new Date(task.dueDate).toLocaleDateString("th-TH", { 
                            day: "numeric", 
                            month: "short" 
                          })}
                        </div>
                      </td>

                      <td className="px-2 py-2">
                        <div className="text-xs font-medium text-gray-900 max-w-[200px] truncate">
                          {task.title}
                        </div>
                      </td>

                      <td className="px-2 py-2 text-xs text-gray-700 max-w-[120px] truncate">
                        {task.customer || "-"}
                      </td>

                      <td className="px-2 py-2 whitespace-nowrap">
                        <span className="text-xs text-gray-700">{config?.label || "อื่นๆ"}</span>
                      </td>

                      <td className="px-2 py-2 whitespace-nowrap">
                        <span className="text-xs font-medium text-gray-700">
                          {priorityLabels[task.priority]}
                        </span>
                      </td>

                      <td className="px-2 py-2 text-xs text-gray-700 max-w-[100px] truncate">
                        {task.assignee}
                      </td>

                      <td className="px-2 py-2 whitespace-nowrap">
                        <div className={`${statusColors[task.status]} text-xs font-medium rounded px-1.5 py-0.5 inline-block`}>
                          {statusLabels[task.status]}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}