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
  Clock,
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
  Users,
  List,
  BarChart3,
  CheckCircle2,
  Circle,
  AlertCircle,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Filter,
  TrendingUp,
  Target,
  Zap,
  LayoutGrid,
  Table2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRoleTheme } from "../../hooks/use-role-theme";
import { useRole } from "../../contexts/role-context";
import { CheckInDialog } from "../check-in-dialog";
import { QuickActionsMenu } from "../modals/quick-actions-menu";
import { QuickVisitModal } from "../modals/quick-visit-modal";
import { CreateTaskDialog } from "../create-task-dialog";
import { EditTaskDialog } from "../edit-task-dialog";
import { HistoryDialog } from "../history-dialog";
import { TaskCard } from "../task-card";
import { TaskDetailDialog } from "../task-detail-dialog";
import { TasksSummaryView } from "../tasks-summary-view";
import { TasksKanbanView } from "../tasks-kanban-view";
import { TasksCalendarView } from "../tasks-calendar-view";
import { TasksTableView } from "../tasks-table-view";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useModuleStore } from "../../store/module-store";
import { useModuleData } from "../../contexts/module-data-context";
import { HistoryEntry } from "@/types/crm";

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
  customers?: string[];
  relatedTo?: string;
  location?: string;
  contactPerson?: string;
  contactPhone?: string;
  contactEmail?: string;
  titleType?: string;
  isActivity?: boolean;
  visibility?: "private" | "public" | "organization";
  sharedWith?: string[];
  attendees?: string[];
  assignees?: string[];
  createdBy?: { id: string, name: string };
  activityType?: string;
}

interface TasksScreenProps {
  onNavigate?: (path: string) => void;
  onNavigateWithActivity?: (path: string, activityId: string) => void;
  shouldOpenCreateDialog?: boolean;
  userMode?: 'sales' | 'customer';
}

type SortDirection = 'asc' | 'desc' | null;
type SortField = 'dueDate' | 'priority' | 'status';

export function TasksScreen({ onNavigate, onNavigateWithActivity, shouldOpenCreateDialog, userMode = 'sales' }: TasksScreenProps = {}) {
  const { t, i18n } = useTranslation();
  const roleTheme = useRoleTheme();
  const { role } = useRole();
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"list" | "summary">("list");
  const [displayMode, setDisplayMode] = useState<"kanban" | "calendar" | "table">("kanban");
  const [hiddenTaskIds, setHiddenTaskIds] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterOwner, setFilterOwner] = useState<string>("all");
  const [filterActivityType, setFilterActivityType] = useState<string>("all");
  const [filterDateFrom, setFilterDateFrom] = useState<string>("");
  const [filterDateTo, setFilterDateTo] = useState<string>("");
  const [currentMeetingIndex, setCurrentMeetingIndex] = useState(0);
  const [isCheckInDialogOpen, setIsCheckInDialogOpen] = useState(false);
  const [isQuickVisitModalOpen, setIsQuickVisitModalOpen] = useState(false);
  const [isCreateTaskDialogOpen, setIsCreateTaskDialogOpen] = useState(false);
  const [isEditTaskDialogOpen, setIsEditTaskDialogOpen] = useState(false);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isTaskDetailDialogOpen, setIsTaskDetailDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [viewingTask, setViewingTask] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  
  // Sorting state
  const [sortField, setSortField] = useState<SortField>('dueDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // Suggestion state
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Check if user is Manager
  const isManager = role === "Sales Manager" || role === "Admin";
  const [showQuickActionsMenu, setShowQuickActionsMenu] = useState(false);

  // FAB dragging state
  const [fabPosition, setFabPosition] = useState(() => {
    const saved = localStorage.getItem('fab-position');
    return saved ? JSON.parse(saved) : { bottom: 24, right: 24 };
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);

  const currentUser = "สมชาย วงศ์สกุล";
  const { tasks: tasksFromStore } = useModuleData();

  // Team members list
  const teamMembers = [
    "สมชาย วงศ์สกุล",
    "อนุชา ศรีสวัสดิ์", 
    "วิภาวี จันทร์เจริญ",
    "ธนพล รัตนพงษ์",
  ];

  // Mock data generator based on language
  const getMockTasks = (): Task[] => {
    const isEnglish = i18n.language === 'en';
    
    if (isEnglish) {
      return [
        {
          id: "TASK-EN-001",
          title: "Visit Customer: SCGJWD Bangsue",
          description: "Discuss 2026 warehouse expansion plan",
          priority: "high",
          status: "todo",
          dueDate: "2026-04-21",
          dueTime: "10:00 AM",
          assignee: "สมชาย วงศ์สกุล",
          completed: false,
          customer: "SCGJWD Logistics",
          titleType: "customer_visit",
          isActivity: true,
        },
        {
          id: "TASK-EN-002",
          title: "Weekly Status Sync",
          description: "Sync with team on weekly targets",
          priority: "medium",
          status: "todo",
          dueDate: "2026-04-21",
          dueTime: "04:00 PM",
          assignee: "สมชาย วงศ์สกุล",
          completed: false,
          titleType: "meeting",
          isActivity: true,
        }
      ];
    }
    
    // Thai version
    return [
      {
        id: "TASK-PRIVATE-01",
        title: "ทำรายงานรวมยอดขาย (งานส่วนตัว)",
        description: "สรุปตัวเพลหายจากทุก BU เพื่อเตรียมส่งเข้าที่ประชุม",
        priority: "medium",
        status: "todo",
        dueDate: "2026-04-21",
        dueTime: "04:00 PM",
        assignee: "สมชาย วงศ์สกุล",
        completed: false,
        visibility: "private",
        isActivity: false,
      },
      {
        id: "TASK-SHARED-01",
        title: "เตรียมแผนการขายไตรมาส 2 (แชร์ให้ทีม)",
        description: "จัดเตรียม Presentation และรายละเอียดโปรโมชั่นใหม่",
        priority: "high",
        status: "in-progress",
        dueDate: "2026-04-21",
        dueTime: "09:00 AM",
        assignee: "สมชาย วงศ์สกุล",
        completed: false,
        visibility: "public",
        sharedWith: ["sarah-chen", "michael-wong"],
        isActivity: false,
      },
      {
        id: "TASK-DELEGATED-BY-OTHERS",
        title: "สรุปยอดขายประจำสัปดาห์ (รับมอบหมาย)",
        description: "รวบรวมข้อมูลยอดขายจากสมาชิกในทีมทุกคน",
        priority: "high",
        status: "todo",
        dueDate: "2026-04-21",
        dueTime: "11:00 AM",
        assignee: "สมชาย วงศ์สกุล",
        createdBy: { id: "manager-id", name: "Manager - วิชัย ประสิทธิ์" },
        completed: false,
        isActivity: false,
      },
      {
        id: "TASK-VISIT-01",
        title: "เข้าพบลูกค้า - Visit customer: SCGJWD Bangsue",
        description: "คุยเรื่องแผนการขยายคลังสินค้าปี 2026",
        priority: "high",
        status: "todo",
        dueDate: "2026-04-21",
        dueTime: "10:00 AM",
        assignee: "สมชาย วงศ์สกุล",
        completed: false,
        customer: "SCGJWD Logistics",
        titleType: "customer_visit",
        isActivity: true,
      },
      {
        id: "TASK-MEETING-01",
        title: "นัดหมายลูกค้า - Schedule meeting: CP All",
        description: "นำเสนอ Solution ระบบจัดการขนส่งใหม่",
        priority: "medium",
        status: "todo",
        dueDate: "2026-04-21",
        dueTime: "02:30 PM",
        assignee: "สมชาย วงศ์สกุล",
        completed: false,
        customer: "CP All Public Company",
        titleType: "meeting",
        isActivity: true,
      },
      {
        id: "TASK-SHARED-VISIT-02",
        title: "เข้าพบลูกค้า: PTT Group (คนอื่นแชร์มา)",
        description: "คุยเรื่องงานวางระบบคลังสินค้าอัจฉริยะ คุณจีรพุธแชร์มาให้ร่วมสังเกตการณ์",
        priority: "medium",
        status: "todo",
        dueDate: "2026-04-21",
        dueTime: "01:00 PM",
        assignee: "คุณจีรพุธ (Jiraputh)",
        attendees: ["คุณจีรพุธ (Jiraputh)", "สมชาย วงศ์สกุล"],
        completed: false,
        customer: "PTT Public Company Limited",
        titleType: "customer_visit",
        isActivity: true,
        createdBy: { id: "jiraputh-id", name: "คุณจีรพุธ (Jiraputh)" }
      },
      {
        id: "TASK-MULTI-CUST-01",
        title: "ประชุมกลุ่มนิคมอุตสาหกรรม (ลูกค้าหลายราย)",
        description: "รวบรวมความต้องการจากกลุ่มลูกค้าในนิคมฯ อมตะ",
        priority: "low",
        status: "todo",
        dueDate: "2026-04-21",
        dueTime: "03:30 PM",
        assignee: "สมชาย วงศ์สกุล",
        completed: false,
        customers: ["Amata Corp", "WHA Group", "Thai Factory Ltd"],
        titleType: "meeting",
        isActivity: true,
      }
    ];
  };

  const [tasks, setTasks] = useState<Task[]>(() => getMockTasks());

  // Save FAB position to localStorage
  useEffect(() => {
    localStorage.setItem('fab-position', JSON.stringify(fabPosition));
  }, [fabPosition]);

  // Handle FAB drag
  const handleFabDragStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setHasMoved(false);
    setDragStart({ x: clientX, y: clientY });
  };

  const handleFabDragMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;

    const dx = clientX - dragStart.x;
    const dy = dragStart.y - clientY;

    // Mark as moved if dragged more than 5px
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      setHasMoved(true);
    }

    if (hasMoved) {
      setFabPosition(prev => {
        const newBottom = Math.max(16, Math.min(window.innerHeight - 70, prev.bottom + dy));
        const newRight = Math.max(16, Math.min(window.innerWidth - 70, prev.right - dx));
        return { bottom: newBottom, right: newRight };
      });

      setDragStart({ x: clientX, y: clientY });
    }
  };

  const handleFabDragEnd = () => {
    if (isDragging && hasMoved) {
      // Snap to nearest edge (left or right)
      setFabPosition(prev => {
        const screenWidth = window.innerWidth;
        const buttonCenterX = screenWidth - prev.right - 28;
        const snapToRight = buttonCenterX > screenWidth / 2;

        return {
          bottom: prev.bottom,
          right: snapToRight ? 24 : screenWidth - 80,
        };
      });
    }
    setIsDragging(false);
    setHasMoved(false);
  };

  const canEditTask = (task: Task): boolean => {
    if (isManager) {
      return true;
    }
    return task.assignee === currentUser;
  };

  const canDeleteTask = (task: Task): boolean => {
    if (isManager) {
      return true;
    }
    return task.assignee === currentUser;
  };

  // 3-step sorting handler
  const handleSort = (field: SortField) => {
    if (sortField !== field) {
      setSortField(field);
      setSortDirection('asc');
    } else {
      if (sortDirection === null) {
        setSortDirection('asc');
      } else if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortDirection(null);
      }
    }
  };

  const handleCheckIn = (task: Task) => {
    setSelectedTask({
      customer: task.customer || "Unknown Customer",
      customerAddress: task.location,
      title: task.title,
      notes: task.description,
      purpose: task.titleType === "customer_visit" ? "เยี่ยมลูกค้า" : 
               task.titleType === "meeting" ? "การประชุม/พูดคุย" :
               task.titleType === "follow_up" ? "ติดตามงาน" : "",
      visitType: task.titleType === "customer_visit" ? "เยี่ยมลูกค้า" :
                  task.titleType === "meeting" ? "นัดหมาย" :
                  task.titleType === "site_survey" ? "สำรวจ" :
                  task.titleType === "follow_up" ? "งานบริการ" : "",
    });
    setIsQuickVisitModalOpen(true);
  };

  const handleQuickVisit = (task: Task) => {
    setSelectedTask({
      id: task.id,
      service: task.relatedTo || task.title,
      customer: task.customer || "Unknown Customer",
      location: task.location,
      contactPerson: task.contactPerson,
      contactPhone: task.contactPhone,
      contactEmail: task.contactEmail,
      titleType: task.titleType,
    });
    setIsQuickVisitModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    if (!canEditTask(task)) {
      toast.error(t("permissions.no_permission", "ไม่มีสิทธิ์"));
      return;
    }
    setEditingTask(task);
    setIsEditTaskDialogOpen(true);
  };

  const handleViewDetails = (task: Task) => {
    setViewingTask(task);
    setIsTaskDetailDialogOpen(true);
  };

  const handleSaveTask = (taskId: string, updatedTask: Partial<Task>) => {
    const upsertRecord = useModuleStore.getState().upsertRecord;
    
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const newTask = {
            ...task,
            ...updatedTask,
            completed: updatedTask.status === "completed" || task.completed,
          };
          // Persist to store if it exists there
          upsertRecord('tasks', newTask);
          return newTask;
        }
        return task;
      })
    );
    toast.success(t("tasks.task_updated"));
    setIsEditTaskDialogOpen(false);
  };

  const handleStatusChange = (taskId: string, newStatus: "todo" | "in-progress" | "completed") => {
    const upsertRecord = useModuleStore.getState().upsertRecord;

    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const newTask = {
            ...task,
            status: newStatus,
            completed: newStatus === "completed",
          };
          // Persist to store
          upsertRecord('tasks', newTask);
          return newTask;
        }
        return task;
      })
    );
    toast.success(t("tasks.status_updated"));
  };

  const handleDeleteTask = (taskId: string) => {
    const deleteRecord = useModuleStore.getState().deleteRecord;
    
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    deleteRecord('tasks', taskId);
    
    setIsDeleteDialogOpen(false);
    setTaskToDelete(null);
    toast.success(t("tasks.task_deleted"));
  };

  const confirmDelete = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task && !canDeleteTask(task)) {
      toast.error(t("permissions.no_permission", "ไม่มีสิทธิ์"));
      return;
    }
    setTaskToDelete(taskId);
    setIsDeleteDialogOpen(true);
  };

  const handleHideTask = (taskId: string) => {
    setHiddenTaskIds((prev) => [...prev, taskId]);
    toast.success("Task hidden");
  };

  const sourceTasks = useMemo(() => {
    // Merge local tasks with store tasks and deduplicate by ID.
    // Store records should win over local/mock records for consistency.
    const combined = [...tasks, ...(tasksFromStore as Task[])];
    const deduped = Array.from(new Map(combined.map((t) => [t.id, t])).values());

    // Normalize API shape differences between mock/local and store records
    // so filtering/counting logic reads from one canonical field set.
    return deduped.map((task) => ({
      ...task,
      titleType: task.titleType || task.activityType,
      completed: task.completed ?? task.status === "completed",
    }));
  }, [tasks, tasksFromStore]);

  const visibleTasks = useMemo(() => {
    let filtered = sourceTasks;
    
    // Filter out hidden tasks
    filtered = filtered.filter(t => !hiddenTaskIds.includes(t.id));
    
    // Sales Rep เห็นของตัวเอง และงานที่ได้รับมอบหมาย
    if (!isManager) {
      filtered = filtered.filter(t => 
        t.assignee === currentUser || 
        t.assignees?.includes(currentUser) ||
        t.assignees?.includes("somchai-wongsakul") ||
        t.attendees?.includes(currentUser) ||
        t.attendees?.includes("somchai-wongsakul")
      );
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(t => 
        t.title.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.customer?.toLowerCase().includes(query) ||
        t.relatedTo?.toLowerCase().includes(query)
      );
    }

    // Filter by owner (เฉพาะ Manager)
    if (isManager && filterOwner !== "all") {
      filtered = filtered.filter(t => t.assignee === filterOwner);
    }

    // Filter by activity type
    if (filterActivityType !== "all") {
      filtered = filtered.filter(t => t.titleType === filterActivityType);
    }

    // Filter by date range
    if (filterDateFrom && filterDateTo) {
      const from = new Date(filterDateFrom);
      const to = new Date(filterDateTo);
      filtered = filtered.filter(t => {
        const taskDate = new Date(t.dueDate);
        return taskDate >= from && taskDate <= to;
      });
    }
    
    // Sorting Logic
    if (sortDirection) {
      filtered = [...filtered].sort((a, b) => {
        let comparison = 0;
        
        if (sortField === 'dueDate') {
          comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        } else if (sortField === 'priority') {
          const priorityWeight = { high: 3, medium: 2, low: 1 };
          comparison = priorityWeight[a.priority] - priorityWeight[b.priority];
        } else if (sortField === 'status') {
          const statusWeight = { todo: 1, 'in-progress': 2, completed: 3 };
          comparison = statusWeight[a.status] - statusWeight[b.status];
        }

        return sortDirection === 'asc' ? comparison : -comparison;
      });
    } else {
      // Default Sort: Today's tasks first, then by date
      const today = new Date().toISOString().split('T')[0];
      filtered = [...filtered].sort((a, b) => {
        const aIsToday = a.dueDate === today;
        const bIsToday = b.dueDate === today;
        
        // Today's tasks first
        if (aIsToday && !bIsToday) return -1;
        if (!aIsToday && bIsToday) return 1;
        
        // Then sort by date
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
    }

    return filtered;
  }, [sourceTasks, hiddenTaskIds, isManager, currentUser, searchQuery, filterOwner, filterActivityType, filterDateFrom, filterDateTo, sortDirection, sortField]);

  // Stats calculations (single source/single pass to guarantee consistency with tab count)
  const taskMetrics = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return visibleTasks.reduce(
      (acc, task) => {
        acc.total += 1;
        if (task.status === "todo") acc.todo += 1;
        if (task.status === "in-progress") acc.inProgress += 1;
        if (task.status === "completed") acc.completed += 1;
        if (task.dueDate < today && task.status !== "completed") acc.overdue += 1;
        return acc;
      },
      { total: 0, todo: 0, inProgress: 0, completed: 0, overdue: 0 }
    );
  }, [visibleTasks]);

  // Activity type config
  const titleTypeConfig: Record<string, { label: string; color: string }> = {
    customer_visit: { label: t("tasks.activity_types.customer_visit", "เยี่ยมลูกค้า"), color: "blue" },
    meeting: { label: t("tasks.activity_types.meeting", "ประชุม"), color: "purple" },
    site_survey: { label: t("tasks.activity_types.site_survey", "สำรวจสถานที่"), color: "orange" },
    follow_up: { label: t("tasks.activity_types.follow_up", "ติดตามงาน"), color: "green" },
    "นัดหมายลูกค้า - Schedule meeting": { label: "นัดหมายลูกค้า - Schedule meeting", color: "purple" },
    "เข้าพบลูกค้า - Visit customer": { label: "เข้าพบลูกค้า - Visit customer", color: "blue" },
  };

  const allTasksHistory: HistoryEntry[] = [
    {
      id: "1",
      action: "created",
      entity: "Task",
      user: "You",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      description: "Created task \"Complete finance approval for Logistics Contract\"",
    },
  ];

  // Mock meetings data (Updated to 2026)
  const meetings = [
    {
      id: 1,
      date: "19 ก.พ. 2026",
      time: "09:00",
      title: "ประชุมทีมขาย",
    },
    {
      id: 2,
      date: "19 ก.พ. 2026",
      time: "14:00",
      title: "พบลูกค้า Global Logistics",
    },
    {
      id: 3,
      date: "19 ก.พ. 2026",
      time: "16:00",
      title: "Review สัญญา Pacific Distribution",
    },
  ];

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMeetingIndex((prev) => (prev + 1) % meetings.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [meetings.length]);

  const handlePrevMeeting = () => {
    setCurrentMeetingIndex((prev) => (prev - 1 + meetings.length) % meetings.length);
  };

  const handleNextMeeting = () => {
    setCurrentMeetingIndex((prev) => (prev + 1) % meetings.length);
  };

  // Tag suggestions
  const suggestions = [
    "ต่ออายุสัญญา",
    "ตรวจสอบใบเสนอราคา",
    "แก้ไขสัญญา",
    "การสาธิตระบบ",
    "อนุมัติฝ่ายการเงิน",
    "การวิเคราะห์",
    "ระบบ IT",
    "แผนการตลาด",
  ];

  const filteredSuggestions = suggestions.filter(item => 
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-3 sm:p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">{t('tasks.all_tasks_title')}</h1>
            <p className="text-xs sm:text-sm text-gray-500">{t('tasks.all_tasks_subtitle')}</p>
          </div>
          <Button
            size="sm"
            className="h-9 px-4 bg-green-600 hover:bg-green-700 text-white shadow-sm text-sm font-medium rounded-full"
            onClick={() => setIsCreateTaskDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-1.5" />
            {t('tasks.create_task')}
          </Button>
        </div>

        {/* Top Meeting Card with Carousel */}
        <Card 
          className="mb-3 rounded-lg shadow-sm relative"
          style={{
            background: `linear-gradient(to right, ${roleTheme.light}, ${roleTheme.primary})`
          }}
        >
          <CardContent className="p-4 pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  <span className="text-white text-sm sm:text-base font-semibold">{meetings[currentMeetingIndex].date}</span>
                </div>
                <div className="h-5 w-px bg-white/30"></div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  <span className="text-white text-sm sm:text-base">{meetings[currentMeetingIndex].time} - {meetings[currentMeetingIndex].title}</span>
                </div>
              </div>
              <Button 
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 h-8 sm:h-9 px-3 sm:px-4 text-sm"
              >
                {t('common.update')}
              </Button>
            </div>
            
            {/* Dots Indicator with Arrows */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <button
                onClick={handlePrevMeeting}
                className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition-colors"
                aria-label="Previous meeting"
              >
                <ChevronLeft className="h-4 w-4 text-white" />
              </button>

              <div className="flex items-center gap-2">
                {meetings.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentMeetingIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentMeetingIndex
                        ? 'w-8 bg-white'
                        : 'w-2 bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Go to meeting ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextMeeting}
                className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition-colors"
                aria-label="Next meeting"
              >
                <ChevronRight className="h-4 w-4 text-white" />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards Row - 4 boxes */}
        <div className="grid grid-cols-4 gap-2 mb-2">
          <Card className="border border-gray-200 rounded-lg bg-white">
            <CardContent className="p-2">
              <div className="flex flex-col">
                <p className="text-xs text-gray-500 font-medium mb-1">{t("tasks.todo")}</p>
                <p className="text-4XL font-bold text-gray-900 text-[24px]">{taskMetrics.todo}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 rounded-lg bg-white">
            <CardContent className="p-2">
              <div className="flex flex-col">
                <p className="text-xs text-gray-500 font-medium mb-1">{t("tasks.in_progress")}</p>
                <p className="text-4XL font-bold text-gray-900 text-[24px]">{taskMetrics.inProgress}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 rounded-lg bg-white">
            <CardContent className="p-2">
              <div className="flex flex-col">
                <p className="text-xs text-gray-500 font-medium mb-1">{t("tasks.completed")}</p>
                <p className="text-4XL font-bold text-gray-900">{taskMetrics.completed}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 rounded-lg bg-white">
            <CardContent className="p-2">
              <div className="flex flex-col">
                <p className="text-xs text-gray-500 font-medium mb-1">{t("tasks.overdue")}</p>
                <p className="text-4XL font-bold text-gray-900">{taskMetrics.overdue}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs & Content */}
        <Card className="border border-gray-200 rounded-lg bg-white shadow-sm">
          <CardContent className="p-0">
            {/* Tab Header with View Switcher */}
            <div className="flex items-center justify-between border-b border-gray-200 px-3">
              <button
                onClick={() => setSelectedTab("all")}
                className={`px-4 py-3 text-sm sm:text-base font-medium border-b-2 transition-colors ${
                  selectedTab === "all"
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                {t("tasks.all_tasks")} ({taskMetrics.total})
              </button>

              {/* View Switcher */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setDisplayMode("kanban")}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    displayMode === "kanban"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" />
                  <span className="hidden sm:inline">Kanban</span>
                </button>
                <button
                  onClick={() => setDisplayMode("calendar")}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    displayMode === "calendar"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Calendar className="h-4 w-4" />
                  <span className="hidden sm:inline">Calendar</span>
                </button>
                <button
                  onClick={() => setDisplayMode("table")}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    displayMode === "table"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Table2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Table</span>
                </button>
              </div>
            </div>

            {/* Search Bar & Sort */}
            <div className="p-3 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search with Tag Suggestion */}
                <div className="relative flex-1 z-10">
                  <Popover open={showSuggestions && searchQuery.length > 0 && filteredSuggestions.length > 0} onOpenChange={setShowSuggestions}>
                    <PopoverTrigger asChild>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                        <Input
                          type="text"
                          placeholder={t('placeholders.search_tasks')}
                          value={searchQuery}
                          onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setShowSuggestions(true);
                          }}
                          className="pl-10 pr-10 h-10 sm:h-11 border-gray-200 rounded-lg text-sm sm:text-base w-full"
                        />
                        {searchQuery && (
                          <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            <X className="h-4 w-4 sm:h-5 sm:w-5" />
                          </button>
                        )}
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]" align="start">
                      <div className="max-h-[300px] overflow-y-auto">
                        <div className="p-2">
                          <div className="text-xs font-semibold text-gray-500 px-2 py-1.5">Suggestions</div>
                          {filteredSuggestions.map((suggestion) => (
                            <div
                              key={suggestion}
                              onClick={() => {
                                setSearchQuery(suggestion);
                                setShowSuggestions(false);
                              }}
                              className="px-2 py-1.5 text-sm cursor-pointer hover:bg-gray-100 rounded"
                            >
                              {suggestion}
                            </div>
                          ))}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Filters Group */}
                <div className="flex items-center gap-2">
                  {isManager && (
                    <Select value={filterOwner} onValueChange={setFilterOwner}>
                      <SelectTrigger className="h-10 sm:h-11 w-auto min-w-[140px] px-3 text-xs sm:text-sm border-gray-300 bg-white gap-1.5 rounded-lg">
                        <Users className="h-4 w-4 text-gray-600 flex-shrink-0" />
                        <span className="truncate">{t('tasks.filters.owner')}</span>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('tasks.filters.all_owners')}</SelectItem>
                        {teamMembers.map((member) => (
                          <SelectItem key={member} value={member}>{member}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  {/* Activity Type Filter */}
                  <Select value={filterActivityType} onValueChange={setFilterActivityType}>
                    <SelectTrigger className="h-10 sm:h-11 w-auto min-w-[140px] px-3 text-xs sm:text-sm border-gray-300 bg-white rounded-lg">
                      {/* ใช้ div ครอบ Icon และ SelectValue ไว้ด้วยกัน เพื่อจัดให้อยู่ชิดซ้าย (เว้นระยะไอคอนลูกศรชิดขวา) */}
                      <div className="flex items-center gap-1.5 overflow-hidden">
                        <List className="h-4 w-4 text-gray-600 flex-shrink-0" />
                        {/* ใช้ SelectValue แทน span เดิม เพื่อให้มันเปลี่ยนข้อความตามที่เลือกอัตโนมัติ */}
                        <SelectValue placeholder={t('tasks.filters.titleType')} />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('ทั้งหมด')}</SelectItem>
                      {Object.entries(titleTypeConfig).map(([type, config]) => (
                        <SelectItem key={type} value={type}>
                          {config.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Date Range Filter */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <Input
                      type="date"
                      value={filterDateFrom}
                      onChange={(e) => setFilterDateFrom(e.target.value)}
                      className="h-10 sm:h-11 px-3 text-xs sm:text-sm border-gray-300 rounded-lg w-full sm:w-[160px]"
                      placeholder={t('tasks.filters.from')}
                    />
                    <span className="text-gray-500 text-sm">{t('tasks.filters.to')}</span>
                    <Input
                      type="date"
                      value={filterDateTo}
                      onChange={(e) => setFilterDateTo(e.target.value)}
                      className="h-10 sm:h-11 px-3 text-xs sm:text-sm border-gray-300 rounded-lg w-full sm:w-[160px]"
                      placeholder={t('tasks.filters.to')}
                    />
                    {(filterDateFrom || filterDateTo) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setFilterDateFrom("");
                          setFilterDateTo("");
                        }}
                        className="h-10 sm:h-11 px-2 text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {/* Sort Button (3-step) */}
                  <Button
                    variant="outline"
                    className={`h-10 sm:h-11 px-3 gap-2 border-gray-300 ${sortDirection ? 'bg-green-50 text-green-700 border-green-200' : 'text-gray-600'}`}
                    onClick={() => handleSort('dueDate')}
                  >
                    <ArrowUpDown className="h-4 w-4" />
                    <span className="hidden sm:inline text-xs sm:text-sm">
                      {sortDirection === 'asc' ? t('tasks.sort.date_old_new') : sortDirection === 'desc' ? t('tasks.sort.date_new_old') : t('tasks.sort.sort_by_date')}
                    </span>
                  </Button>

                  {/* Active Filters Count */}
                  {(filterOwner !== "all" || filterActivityType !== "all" || filterDateFrom || filterDateTo || searchQuery) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSearchQuery("");
                        setFilterOwner("all");
                        setFilterActivityType("all");
                        setFilterDateFrom("");
                        setFilterDateTo("");
                      }}
                      className="h-10 sm:h-11 px-3 text-xs text-gray-600 hover:text-gray-900"
                    >
                      <Filter className="h-4 w-4 mr-1.5" />
                      {t('tasks.filters.clear')}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Task Display based on displayMode */}
            {displayMode === "kanban" ? (
              <div className="p-0">
                <TasksKanbanView
                  tasks={visibleTasks}
                  onStatusChange={handleStatusChange}
                  onAddTask={() => setIsCreateTaskDialogOpen(true)}
                  onEditTask={handleEditTask}
                  onViewTask={handleViewDetails}
                  onHideTask={handleHideTask}
                  onDeleteTask={confirmDelete}
                />
              </div>
            ) : displayMode === "calendar" ? (
              <div className="p-3">
                <TasksCalendarView
                  tasks={visibleTasks}
                  onTaskClick={handleViewDetails}
                />
              </div>
            ) : (
              <div className="p-3">
                <TasksTableView
                  tasks={visibleTasks}
                  onTaskClick={handleViewDetails}
                  onEditTask={handleEditTask}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
      {selectedTask && (
        <CheckInDialog
          isOpen={isCheckInDialogOpen}
          onClose={() => setIsCheckInDialogOpen(false)}
          task={selectedTask}
        />
      )}

      {selectedTask && (
        <QuickVisitModal
          isOpen={isQuickVisitModalOpen}
          onClose={() => setIsQuickVisitModalOpen(false)}
          task={selectedTask}
        />
      )}

      <CreateTaskDialog
        isOpen={isCreateTaskDialogOpen}
        onClose={() => setIsCreateTaskDialogOpen(false)}
      />

      <EditTaskDialog
        isOpen={isEditTaskDialogOpen}
        onClose={() => setIsEditTaskDialogOpen(false)}
        task={editingTask}
        onSave={handleSaveTask}
      />

      <HistoryDialog
        isOpen={isHistoryDialogOpen}
        onClose={() => setIsHistoryDialogOpen(false)}
        entries={allTasksHistory}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("tasks.delete_task_title")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("tasks.delete_task_description")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
              {t("common.cancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => taskToDelete && handleDeleteTask(taskToDelete)}
              className="bg-red-600 hover:bg-red-700"
            >
              {t("common.delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <TaskDetailDialog
        isOpen={isTaskDetailDialogOpen}
        onClose={() => setIsTaskDetailDialogOpen(false)}
        task={viewingTask}
        onEdit={handleEditTask}
        onDelete={confirmDelete}
        onStatusChange={handleStatusChange}
      />
      <QuickActionsMenu
        isOpen={showQuickActionsMenu}
        onClose={() => setShowQuickActionsMenu(false)}
        onQuickVisit={() => {
          if (onNavigate) onNavigate("/customers", "add");
        }}
        onQuickDeal={() => {
          if (onNavigate) onNavigate("/deals", "add");
        }}
        onQuickActivity_Visit={() => {
          if (onNavigate) onNavigate("/calendar", "add");
        }}
        onQuickCreatetask={() => {
          setShowQuickActionsMenu(false); 
          setIsCreateTaskDialogOpen(true); 
        }}
      />

        {/* Quick Actions FAB - Show in all pages for Sales Mode */}
        {userMode === 'sales' && (
          <>
            <div 
              className="fixed z-50 touch-none select-none"
              style={{
                bottom: `${fabPosition.bottom}px`,
                right: `${fabPosition.right}px`,
                cursor: isDragging ? 'grabbing' : 'grab',
                transition: hasMoved ? 'none' : 'all 300ms ease-out',
                willChange: isDragging ? 'bottom, right' : 'auto',
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                handleFabDragStart(e.clientX, e.clientY);
              }}
              onMouseUp={handleFabDragEnd}
              onMouseMove={(e) => {
                e.preventDefault();
                handleFabDragMove(e.clientX, e.clientY);
              }}
              onMouseLeave={handleFabDragEnd}
              onTouchStart={(e) => {
                const touch = e.touches[0];
                handleFabDragStart(touch.clientX, touch.clientY);
              }}
              onTouchEnd={handleFabDragEnd}
              onTouchMove={(e) => {
                const touch = e.touches[0];
                handleFabDragMove(touch.clientX, touch.clientY);
              }}
            >
              <Button
                onClick={(e) => {
                  if (!isDragging) {
                    setShowQuickActionsMenu(true);
                  }
                }}
                className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                style={{
                  background: `linear-gradient(135deg, ${roleTheme.primary}, ${roleTheme.light})`,
                }}
              >
                <Plus className="h-6 w-6 text-white" />
              </Button>
            </div>
          </>
        )}
      </div>
  );
}
