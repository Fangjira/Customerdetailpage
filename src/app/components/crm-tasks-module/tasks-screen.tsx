import { useState } from "react";
import { LayoutGrid, Table2, Search, Filter, Plus, MoreVertical, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Task {
  id: string; // taskID - JetBrains Mono font
  title: string;
  status: "todo" | "in-progress" | "review" | "completed";
  priority: "low" | "medium" | "high" | "urgent";
  assignee: {
    name: string;
    initials: string;
    color: string;
  };
  dueDate: string;
  customers?: string[];
  activityType?: string;
  isActivity?: boolean;
}

const MOCK_TASKS: Task[] = [
  {
    id: "TSK-2026-0421",
    title: "Contract Signing - SCGJWD",
    status: "in-progress",
    priority: "high",
    assignee: { name: "สมชาย วงศ์สกุล", initials: "SW", color: "bg-blue-600" },
    dueDate: "2026-04-22",
    customers: ["SCG JWD"],
  },
  {
    id: "TSK-2026-0418",
    title: "Industrial Zone Sync",
    status: "todo",
    priority: "medium",
    assignee: { name: "วรรณา ศรีสุข", initials: "WS", color: "bg-purple-600" },
    dueDate: "2026-04-25",
    customers: ["Amata Corp", "WHA Group", "Thai Factory"],
  },
  {
    id: "ACT-2026-0420",
    title: "Customer Visit: PTT Group",
    status: "todo",
    priority: "high",
    assignee: { name: "แฮมทาโร่", initials: "HT", color: "bg-emerald-600" },
    dueDate: "2026-04-23",
    isActivity: true,
    activityType: "customer_visit",
  },
  {
    id: "TSK-2026-0415",
    title: "Q2 Sales Report Preparation",
    status: "review",
    priority: "medium",
    assignee: { name: "ประยุทธ์ ใจดี", initials: "PJ", color: "bg-orange-600" },
    dueDate: "2026-04-21",
  },
  {
    id: "ACT-2026-0419",
    title: "Sales Meeting - Regional Directors",
    status: "in-progress",
    priority: "high",
    assignee: { name: "สมหญิง รักดี", initials: "SR", color: "bg-pink-600" },
    dueDate: "2026-04-21",
    isActivity: true,
    activityType: "sales_meeting",
  },
  {
    id: "TSK-2026-0422",
    title: "Update CRM Database",
    status: "completed",
    priority: "low",
    assignee: { name: "ณัฐพงษ์ ทองดี", initials: "NT", color: "bg-indigo-600" },
    dueDate: "2026-04-20",
  },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "urgent": return "bg-red-100 text-red-700 border-red-300";
    case "high": return "bg-orange-100 text-orange-700 border-orange-300";
    case "medium": return "bg-yellow-100 text-yellow-700 border-yellow-300";
    case "low": return "bg-blue-100 text-blue-700 border-blue-300";
    default: return "bg-gray-100 text-gray-700 border-gray-300";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed": return "bg-emerald-100 text-emerald-700 border-emerald-300";
    case "in-progress": return "bg-blue-100 text-blue-700 border-blue-300";
    case "review": return "bg-purple-100 text-purple-700 border-purple-300";
    case "todo": return "bg-gray-100 text-gray-700 border-gray-300";
    default: return "bg-gray-100 text-gray-700 border-gray-300";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "completed": return "Completed";
    case "in-progress": return "In Progress";
    case "review": return "Review";
    case "todo": return "To Do";
    default: return status;
  }
};

export function TasksScreen() {
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  const [searchQuery, setSearchQuery] = useState("");

  const kanbanColumns = [
    { id: "todo", label: "To Do", tasks: MOCK_TASKS.filter(t => t.status === "todo") },
    { id: "in-progress", label: "In Progress", tasks: MOCK_TASKS.filter(t => t.status === "in-progress") },
    { id: "review", label: "Review", tasks: MOCK_TASKS.filter(t => t.status === "review") },
    { id: "completed", label: "Completed", tasks: MOCK_TASKS.filter(t => t.status === "completed") },
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>
              Tasks & Activities
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              April 21, 2026 • {MOCK_TASKS.length} total items
            </p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              style={{ fontFamily: 'Inter' }}
            />
          </div>

          {/* Filters */}
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="task">Tasks Only</SelectItem>
              <SelectItem value="activity">Activities Only</SelectItem>
            </SelectContent>
          </Select>

          {/* View Toggle */}
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("kanban")}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                viewMode === "kanban"
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-2 text-sm font-medium transition-colors border-l border-gray-200 ${
                viewMode === "table"
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Table2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {viewMode === "kanban" ? (
          // Kanban View
          <div className="grid grid-cols-4 gap-6">
            {kanbanColumns.map((column) => (
              <div key={column.id} className="flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900" style={{ fontFamily: 'Inter' }}>
                    {column.label}
                  </h3>
                  <span className="text-sm text-gray-500 font-medium">
                    {column.tasks.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {column.tasks.map((task) => (
                    <Card
                      key={task.id}
                      className="cursor-pointer hover:shadow-md transition-shadow border-l-4"
                      style={{
                        borderLeftColor: task.priority === "high" || task.priority === "urgent" ? "#f97316" : "#6b7280"
                      }}
                    >
                      <CardContent className="p-4">
                        {/* Title - NO taskID shown here */}
                        <h4 className="font-semibold text-gray-900 mb-3 leading-tight" style={{ fontFamily: 'Inter' }}>
                          {task.title}
                        </h4>

                        {/* Metadata */}
                        <div className="space-y-2">
                          {/* Priority & Type */}
                          <div className="flex items-center gap-2">
                            <Badge className={`text-xs font-semibold border ${getPriorityColor(task.priority)}`}>
                              {task.priority.toUpperCase()}
                            </Badge>
                            {task.isActivity && (
                              <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-300">
                                Activity
                              </Badge>
                            )}
                          </div>

                          {/* Due Date */}
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <CalendarIcon className="h-3 w-3" />
                            <span style={{ fontFamily: 'Inter' }}>{task.dueDate}</span>
                          </div>

                          {/* Assignee */}
                          <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className={`${task.assignee.color} text-white text-xs`}>
                                {task.assignee.initials}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-gray-700 font-medium" style={{ fontFamily: 'Inter' }}>
                              {task.assignee.name}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Table View
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ fontFamily: 'Inter' }}>
                    Task
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ fontFamily: 'Inter' }}>
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ fontFamily: 'Inter' }}>
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ fontFamily: 'Inter' }}>
                    Assignee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ fontFamily: 'Inter' }}>
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ fontFamily: 'Inter' }}>
                    Type
                  </th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {MOCK_TASKS.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50 cursor-pointer transition-colors">
                    {/* Title - NO taskID shown here */}
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900" style={{ fontFamily: 'Inter' }}>
                        {task.title}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <Badge className={`text-xs font-semibold border ${getStatusColor(task.status)}`}>
                        {getStatusLabel(task.status)}
                      </Badge>
                    </td>

                    {/* Priority */}
                    <td className="px-6 py-4">
                      <Badge className={`text-xs font-semibold border ${getPriorityColor(task.priority)}`}>
                        {task.priority.toUpperCase()}
                      </Badge>
                    </td>

                    {/* Assignee */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className={`${task.assignee.color} text-white text-xs`}>
                            {task.assignee.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-700 font-medium" style={{ fontFamily: 'Inter' }}>
                          {task.assignee.name}
                        </span>
                      </div>
                    </td>

                    {/* Due Date */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700" style={{ fontFamily: 'Inter' }}>
                        {task.dueDate}
                      </span>
                    </td>

                    {/* Type */}
                    <td className="px-6 py-4">
                      {task.isActivity ? (
                        <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-300">
                          Activity
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs bg-gray-50 text-gray-700 border-gray-300">
                          Task
                        </Badge>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
