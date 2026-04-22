import { useState, useEffect, useMemo } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Search,
  Calendar,
  Plus,
  CheckCircle2,
  Circle,
  AlertCircle,
  Filter,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRoleTheme } from "../../hooks/use-role-theme";
import { useRole } from "../../contexts/role-context";
import { CreateTaskDialog } from "../create-task-dialog-fixed";
import { TaskCard } from "../task-card";
import { toast } from "sonner";

// ✅ FIX #1: Import the Universal CRUD hook
import { useModuleManager } from "../../hooks/use-module-manager";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "todo" | "in-progress" | "completed";
  dueDate: string;
  dueTime?: string;
  assignee: string;
  completed: boolean;
  customer?: string;
  relatedTo?: string;
  location?: string;
  contactPerson?: string;
  contactPhone?: string;
  contactEmail?: string;
  activityType?: string;
  createdAt: string;
  updatedAt: string;
}

interface TasksScreenProps {
  onNavigate?: (path: string) => void;
  onNavigateWithActivity?: (path: string, activityId: string) => void;
  shouldOpenCreateDialog?: boolean;
  userMode?: 'sales' | 'customer';
}

export function TasksScreen({
  onNavigate,
  onNavigateWithActivity,
  shouldOpenCreateDialog = false,
  userMode = 'sales',
}: TasksScreenProps) {
  const { t } = useTranslation();
  const roleTheme = useRoleTheme();
  const { role } = useRole();

  // ✅ FIX #2: Replace useState with Universal CRUD System
  // ❌ OLD: const [tasks, setTasks] = useState<Task[]>(() => getMockTasks());
  // ✅ NEW:
  const tasksManager = useModuleManager<Task>('tasks');

  // UI State
  const [isCreateOpen, setIsCreateOpen] = useState(shouldOpenCreateDialog);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedTab, setSelectedTab] = useState<string>("all");

  // Open dialog if prop changes
  useEffect(() => {
    if (shouldOpenCreateDialog) {
      setIsCreateOpen(true);
    }
  }, [shouldOpenCreateDialog]);

  // ✅ FIX #3: Use dynamic data from the store, not static mock data
  // The tasks are now reactive - any createRecord/updateRecord/deleteRecord
  // will automatically trigger a re-render
  const allTasks = tasksManager.records;

  // Filter logic
  const filteredTasks = useMemo(() => {
    let filtered = allTasks;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Priority filter
    if (filterPriority !== "all") {
      filtered = filtered.filter(task => task.priority === filterPriority);
    }

    // Status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter(task => task.status === filterStatus);
    }

    // Tab filter
    if (selectedTab === "todo") {
      filtered = filtered.filter(task => task.status === "todo");
    } else if (selectedTab === "in-progress") {
      filtered = filtered.filter(task => task.status === "in-progress");
    } else if (selectedTab === "completed") {
      filtered = filtered.filter(task => task.status === "completed");
    }

    return filtered;
  }, [allTasks, searchQuery, filterPriority, filterStatus, selectedTab]);

  // Stats
  const stats = useMemo(() => ({
    total: allTasks.length,
    todo: allTasks.filter(t => t.status === "todo").length,
    inProgress: allTasks.filter(t => t.status === "in-progress").length,
    completed: allTasks.filter(t => t.status === "completed").length,
    highPriority: allTasks.filter(t => t.priority === "high").length,
  }), [allTasks]);

  // ✅ FIX #4: Update task using Universal CRUD instead of setTasks
  const handleToggleComplete = (taskId: string) => {
    const task = tasksManager.getRecord(taskId);
    if (!task) return;

    const newStatus = task.status === "completed" ? "todo" : "completed";
    tasksManager.updateRecord(taskId, {
      status: newStatus,
      completed: newStatus === "completed",
    });

    toast.success(
      newStatus === "completed" ? "Task completed!" : "Task reopened"
    );
  };

  // ✅ FIX #5: Delete task using Universal CRUD
  const handleDeleteTask = (taskId: string) => {
    tasksManager.deleteRecord(taskId);
    toast.success("Task deleted successfully");
  };

  // ✅ FIX #6: Update task status using Universal CRUD
  const handleUpdateStatus = (taskId: string, newStatus: Task["status"]) => {
    tasksManager.updateRecord(taskId, {
      status: newStatus,
      completed: newStatus === "completed",
    });
    toast.success("Task status updated");
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">งานของฉัน</h1>
            <p className="text-sm text-gray-600 mt-1">
              จัดการงานและติดตามความคืบหน้า
            </p>
          </div>
          <Button
            onClick={() => setIsCreateOpen(true)}
            style={{ backgroundColor: roleTheme.primary }}
            className="text-white hover:opacity-90"
          >
            <Plus className="h-4 w-4 mr-2" />
            สร้างงานใหม่
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-xs text-gray-600">ทั้งหมด</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{stats.todo}</div>
              <div className="text-xs text-gray-600">รอดำเนินการ</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600">{stats.inProgress}</div>
              <div className="text-xs text-gray-600">กำลังทำ</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <div className="text-xs text-gray-600">เสร็จสิ้น</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-600">{stats.highPriority}</div>
              <div className="text-xs text-gray-600">สำคัญมาก</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="ค้นหางาน..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="ความสำคัญ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทุกระดับ</SelectItem>
              <SelectItem value="high">🔴 สูง</SelectItem>
              <SelectItem value="medium">🟠 ปานกลาง</SelectItem>
              <SelectItem value="low">🔵 ต่ำ</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="สถานะ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทุกสถานะ</SelectItem>
              <SelectItem value="todo">รอดำเนินการ</SelectItem>
              <SelectItem value="in-progress">กำลังทำ</SelectItem>
              <SelectItem value="completed">เสร็จสิ้น</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="flex-1 flex flex-col">
        <div className="bg-white border-b px-6">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="all">ทั้งหมด ({stats.total})</TabsTrigger>
            <TabsTrigger value="todo">รอดำเนินการ ({stats.todo})</TabsTrigger>
            <TabsTrigger value="in-progress">กำลังทำ ({stats.inProgress})</TabsTrigger>
            <TabsTrigger value="completed">เสร็จสิ้น ({stats.completed})</TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <TabsContent value={selectedTab} className="mt-0">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-12">
                <Circle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">ไม่พบงาน</p>
                <Button
                  variant="outline"
                  onClick={() => setIsCreateOpen(true)}
                  className="mt-4"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  สร้างงานแรกของคุณ
                </Button>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredTasks.map((task) => (
                  <Card key={task.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <button
                          onClick={() => handleToggleComplete(task.id)}
                          className="mt-1"
                        >
                          {task.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          ) : (
                            <Circle className="h-5 w-5 text-gray-400" />
                          )}
                        </button>

                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-400' : ''}`}>
                                {task.title}
                              </h3>
                              {task.description && (
                                <p className="text-sm text-gray-600 mt-1">
                                  {task.description}
                                </p>
                              )}
                            </div>

                            <div className="flex items-center gap-2">
                              <Badge
                                variant={task.priority === "high" ? "destructive" : "outline"}
                                className={
                                  task.priority === "high" ? "bg-red-100 text-red-700" :
                                  task.priority === "medium" ? "bg-orange-100 text-orange-700" :
                                  "bg-blue-100 text-blue-700"
                                }
                              >
                                {task.priority === "high" ? "🔴 สูง" :
                                 task.priority === "medium" ? "🟠 ปานกลาง" :
                                 "🔵 ต่ำ"}
                              </Badge>

                              <Select
                                value={task.status}
                                onValueChange={(value) => handleUpdateStatus(task.id, value as Task["status"])}
                              >
                                <SelectTrigger className="w-[140px] h-8 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="todo">รอดำเนินการ</SelectItem>
                                  <SelectItem value="in-progress">กำลังทำ</SelectItem>
                                  <SelectItem value="completed">เสร็จสิ้น</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                            {task.dueDate && (
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{new Date(task.dueDate).toLocaleDateString('th-TH')}</span>
                              </div>
                            )}
                            {task.assignee && (
                              <div>ผู้รับผิดชอบ: {task.assignee}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>

      {/* Create Task Dialog */}
      <CreateTaskDialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        mode="task"
      />
    </div>
  );
}
