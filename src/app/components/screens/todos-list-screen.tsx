import { useState, useEffect } from "react";
import { useRole } from "../../contexts/role-context";
import { QuickAddTodoModal } from "../modals/quick-add-todo-modal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Search,
  Plus,
  Filter,
  CheckCircle2,
  Circle,
  Clock,
  AlertCircle,
  Link2,
  Calendar,
  Users,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

interface LinkedEntity {
  type: "deal" | "customer" | "lead" | "quotation" | "todo";
  id: string;
  name: string;
}

interface Todo {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in-progress" | "completed";
  assignedTo: string;
  linkedEntities: LinkedEntity[];
  createdAt: string;
  createdBy: string;
  completedAt?: string;
  businessUnit: string;
}

interface TodosListScreenProps {
  shouldOpenAddDialog?: boolean;
  setShouldOpenAddDialog?: (open: boolean) => void;
}

export function TodosListScreen({ shouldOpenAddDialog, setShouldOpenAddDialog }: TodosListScreenProps) {
  const { role } = useRole();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterAssignee, setFilterAssignee] = useState<string>("all");

  // Check if user is Manager
  const isManager = role === "Sales Manager" || role === "Admin";
  const currentUser = "ทะมากัท รัฐเจริญ";
  const currentUserBU = "HCP"; // Business Unit ของผู้ใช้ปัจจุบัน

  // Team members list
  const teamMembers = [
    "ทะมากัท รัฐเจริญ",
    "สมชาย ใจดี",
    "สมหญิง ดีมาก",
    "นภา รักดี",
  ];

  // Handle opening modal from submenu navigation
  useEffect(() => {
    if (shouldOpenAddDialog && setShouldOpenAddDialog) {
      setShowCreateModal(true);
      setShouldOpenAddDialog(false);
    }
  }, [shouldOpenAddDialog, setShouldOpenAddDialog]);

  const [todos, setTodos] = useState<Todo[]>([
    {
      id: "TODO-001",
      title: "ติดตามผลการเจรจากับ ABC Corporation",
      description: "โทรติดตามความคืบหน้าหลังส่งใบเสนอราคา และนัดหมายพบ",
      dueDate: "2026-03-22",
      priority: "high",
      status: "pending",
      assignedTo: "ทะมากัท รัฐเจริญ",
      linkedEntities: [
        { type: "deal", id: "DL-2024-001", name: "International Freight Contract - ABC Corporation" },
        { type: "quotation", id: "QT-2024-001", name: "Air Freight Quote - ABC Corp" },
      ],
      createdAt: "2026-03-20T10:30:00Z",
      createdBy: "ทะมากัท รัฐเจริญ",
      businessUnit: "HCP",
    },
    {
      id: "TODO-002",
      title: "เตรียมเอกสารนำเสนอสำหรับ XYZ Logistics",
      description: "สร้างงานนำเสนอ Warehouse solution พร้อมข้อมูล case study",
      dueDate: "2026-03-21",
      priority: "high",
      status: "in-progress",
      assignedTo: "ทะมากัท รัฐเจริญ",
      linkedEntities: [
        { type: "deal", id: "DL-2024-002", name: "Warehouse Management Services - XYZ Logistics" },
        { type: "customer", id: "CUST-002", name: "XYZ Logistics" },
      ],
      createdAt: "2026-03-18T14:20:00Z",
      createdBy: "ทะมากัท รัฐเจริญ",
      businessUnit: "HCP",
    },
    {
      id: "TODO-003",
      title: "ส่งสัญญาให้ Global Trading ลงนาม",
      description: "ตรวจสอบสัญญาอีกครั้งและส่งให้ลูกค้าผ่านอีเมล",
      dueDate: "2026-03-23",
      priority: "medium",
      status: "pending",
      assignedTo: "สมชาย ใจดี",
      linkedEntities: [
        { type: "customer", id: "CUST-003", name: "Global Trading Ltd." },
      ],
      createdAt: "2026-03-19T09:15:00Z",
      createdBy: "สมชาย ใจดี",
      businessUnit: "HCP",
    },
    {
      id: "TODO-004",
      title: "ประสานงานทีม Operations เรื่อง Cold Chain",
      description: "นัดประชุมเพื่อหารือรายละเอียด implementation",
      dueDate: "2026-03-25",
      priority: "medium",
      status: "completed",
      assignedTo: "นภา รักดี",
      linkedEntities: [
        { type: "deal", id: "DL-2024-003", name: "Cold Chain Distribution - FreshFood Co." },
      ],
      createdAt: "2026-03-15T11:00:00Z",
      createdBy: "นภา รักดี",
      completedAt: "2026-03-19T16:30:00Z",
      businessUnit: "HCP",
    },
    {
      id: "TODO-005",
      title: "อัปเดตข้อมูลใน CRM สำหรับลีดใหม่",
      description: "เพิ่มรายละเอียดจากการพูดคุยทางโทรศัพท์",
      dueDate: "2026-03-20",
      priority: "low",
      status: "completed",
      assignedTo: "ทะมากัท รัฐเจริญ",
      linkedEntities: [
        { type: "lead", id: "LEAD-001", name: "Global Traders Ltd." },
      ],
      createdAt: "2026-03-18T08:00:00Z",
      createdBy: "ทะมากัท รัฐเจริญ",
      completedAt: "2026-03-20T09:45:00Z",
      businessUnit: "HCP",
    },
    {
      id: "TODO-006",
      title: "Review และอนุมัติใบเสนอราคา",
      description: "ตรวจสอบราคาและเงื่อนไขก่อนส่งให้ลูกค้า",
      dueDate: "2026-03-24",
      priority: "high",
      status: "pending",
      assignedTo: "สมหญิง ดีมาก",
      linkedEntities: [
        { type: "quotation", id: "QT-2024-002", name: "Warehouse Service Quote - XYZ" },
        { type: "todo", id: "TODO-002", name: "เตรียมเอกสารนำเสนอสำหรับ XYZ Logistics" },
      ],
      createdAt: "2026-03-19T13:30:00Z",
      createdBy: "สมหญิง ดีมาก",
      businessUnit: "HCP",
    },
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "in-progress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "pending":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4" />;
      case "in-progress":
        return <Clock className="h-4 w-4" />;
      case "pending":
        return <Circle className="h-4 w-4" />;
      default:
        return <Circle className="h-4 w-4" />;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "สูง";
      case "medium":
        return "ปานกลาง";
      case "low":
        return "ต่ำ";
      default:
        return priority;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "เสร็จสิ้น";
      case "in-progress":
        return "กำลังดำเนินการ";
      case "pending":
        return "รอดำเนินการ";
      default:
        return status;
    }
  };

  const getEntityIcon = (type: string) => {
    switch (type) {
      case "deal":
        return "🎯";
      case "customer":
        return "👤";
      case "lead":
        return "✨";
      case "quotation":
        return "📄";
      case "todo":
        return "✅";
      default:
        return "📌";
    }
  };

  const isOverdue = (dueDate: string, status: string) => {
    if (status === "completed") return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    return due < today;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('th-TH', options);
  };

  // Filter todos
  const filteredTodos = todos.filter((todo) => {
    // Business Unit filter
    if (todo.businessUnit !== currentUserBU) {
      return false;
    }

    // Role-based filter
    if (!isManager && todo.assignedTo !== currentUser) {
      return false;
    }

    // Search filter
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      searchTerm === "" ||
      todo.title.toLowerCase().includes(searchLower) ||
      todo.description.toLowerCase().includes(searchLower) ||
      todo.id.toLowerCase().includes(searchLower);

    // Status filter
    const matchesStatus = 
      filterStatus === "all" ||
      todo.status === filterStatus;

    // Priority filter
    const matchesPriority = 
      filterPriority === "all" ||
      todo.priority === filterPriority;

    // Assignee filter
    const matchesAssignee = 
      filterAssignee === "all" ||
      todo.assignedTo === filterAssignee;

    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
  });

  // Calculate stats
  const stats = {
    total: filteredTodos.length,
    pending: filteredTodos.filter(t => t.status === "pending").length,
    inProgress: filteredTodos.filter(t => t.status === "in-progress").length,
    completed: filteredTodos.filter(t => t.status === "completed").length,
    overdue: filteredTodos.filter(t => isOverdue(t.dueDate, t.status)).length,
  };

  const handleSaveTodo = (todoData: any) => {
    setTodos(prev => [todoData, ...prev]);
  };

  const handleToggleStatus = (todoId: string) => {
    setTodos(prev => prev.map(todo => {
      if (todo.id === todoId) {
        let newStatus: "pending" | "in-progress" | "completed" = "pending";
        if (todo.status === "pending") newStatus = "in-progress";
        else if (todo.status === "in-progress") newStatus = "completed";
        else newStatus = "pending";

        return {
          ...todo,
          status: newStatus,
          completedAt: newStatus === "completed" ? new Date().toISOString() : undefined,
        };
      }
      return todo;
    }));
    toast.success("อัปเดตสถานะแล้ว");
  };

  const handleDeleteTodo = (todoId: string) => {
    setTodos(prev => prev.filter(t => t.id !== todoId));
    toast.success("ลบ To-Do แล้ว");
  };

  return (
    <div className="p-2 sm:p-3 lg:p-4 bg-gray-50 min-h-screen">
      <div className="max-w-[1600px] mx-auto space-y-2 sm:space-y-3">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-3">
              <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">To-Do ทั้งหมด</h1>
              <Badge className={`text-[10px] ${isManager ? 'bg-blue-500' : 'bg-green-500'}`}>
                {role}
              </Badge>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-500">
              {isManager ? "กำลังดูของทั้งทีม" : "กำลังดูของตัวเอง"}
            </p>
          </div>
          <Button
            size="sm"
            className="h-9 px-4 bg-[#7BC9A6] hover:bg-[#6bb896] text-white shadow-sm text-sm font-medium rounded-full"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus className="h-4 w-4 mr-1.5" />
            สร้าง To-Do
          </Button>
        </div>

        {/* Stats */}
        {filteredTodos.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
            <div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-2.5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] font-medium text-gray-500 uppercase tracking-wide truncate">ทั้งหมด</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-900 mt-0.5">{stats.total}</p>
                </div>
                <div className="h-7 w-7 sm:h-8 sm:w-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-2.5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] font-medium text-gray-500 uppercase tracking-wide truncate">รอดำเนินการ</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-900 mt-0.5">{stats.pending}</p>
                </div>
                <div className="h-7 w-7 sm:h-8 sm:w-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Circle className="h-4 w-4 text-gray-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-2.5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] font-medium text-gray-500 uppercase tracking-wide truncate">กำลังทำ</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-900 mt-0.5">{stats.inProgress}</p>
                </div>
                <div className="h-7 w-7 sm:h-8 sm:w-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-2.5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] font-medium text-gray-500 uppercase tracking-wide truncate">เสร็จสิ้น</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-900 mt-0.5">{stats.completed}</p>
                </div>
                <div className="h-7 w-7 sm:h-8 sm:w-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-2.5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] font-medium text-gray-500 uppercase tracking-wide truncate">เกินกำหนด</p>
                  <p className="text-lg sm:text-xl font-bold text-red-600 mt-0.5">{stats.overdue}</p>
                </div>
                <div className="h-7 w-7 sm:h-8 sm:w-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="ค้นหา To-Do..."
              className="h-10 pl-10 bg-white border-gray-300 text-sm rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="h-10 w-full sm:w-auto min-w-[120px] px-3 text-xs border-gray-300 bg-white gap-1.5 rounded-lg">
              <Filter className="h-4 w-4 text-gray-600 flex-shrink-0" />
              <span className="truncate">สถานะ</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทั้งหมด</SelectItem>
              <SelectItem value="pending">รอดำเนินการ</SelectItem>
              <SelectItem value="in-progress">กำลังดำเนินการ</SelectItem>
              <SelectItem value="completed">เสร็จสิ้น</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="h-10 w-full sm:w-auto min-w-[120px] px-3 text-xs border-gray-300 bg-white gap-1.5 rounded-lg">
              <AlertCircle className="h-4 w-4 text-gray-600 flex-shrink-0" />
              <span className="truncate">ความสำคัญ</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทั้งหมด</SelectItem>
              <SelectItem value="high">สูง</SelectItem>
              <SelectItem value="medium">ปานกลาง</SelectItem>
              <SelectItem value="low">ต่ำ</SelectItem>
            </SelectContent>
          </Select>

          {isManager && (
            <Select value={filterAssignee} onValueChange={setFilterAssignee}>
              <SelectTrigger className="h-10 w-full sm:w-auto min-w-[120px] px-3 text-xs border-gray-300 bg-white gap-1.5 rounded-lg">
                <Users className="h-4 w-4 text-gray-600 flex-shrink-0" />
                <span className="truncate">ผู้รับผิดชอบ</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทุกคน</SelectItem>
                {teamMembers.map((member) => (
                  <SelectItem key={member} value={member}>{member}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* To-Do List */}
        <div className="space-y-2">
          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  {/* Status Toggle */}
                  <button
                    onClick={() => handleToggleStatus(todo.id)}
                    className="mt-1 flex-shrink-0"
                  >
                    {getStatusIcon(todo.status)}
                  </button>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Title and Badges */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-sm font-semibold text-gray-900 mb-1 ${todo.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                          {todo.title}
                        </h3>
                        <p className="text-xs text-gray-600">{todo.description}</p>
                      </div>
                      
                      <div className="flex gap-1.5 flex-shrink-0">
                        <Badge className={`text-[10px] px-2 py-0.5 ${getPriorityColor(todo.priority)}`}>
                          {getPriorityLabel(todo.priority)}
                        </Badge>
                        <Badge className={`text-[10px] px-2 py-0.5 ${getStatusColor(todo.status)}`}>
                          {getStatusLabel(todo.status)}
                        </Badge>
                      </div>
                    </div>

                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-3 text-[10px] text-gray-500 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span className={isOverdue(todo.dueDate, todo.status) ? "text-red-600 font-semibold" : ""}>
                          {formatDate(todo.dueDate)}
                          {isOverdue(todo.dueDate, todo.status) && " (เกินกำหนด)"}
                        </span>
                      </div>
                      {isManager && (
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{todo.assignedTo}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <span className="text-gray-400">ID:</span>
                        <span>{todo.id}</span>
                      </div>
                    </div>

                    {/* Linked Entities */}
                    {todo.linkedEntities.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap">
                        <Link2 className="h-3 w-3 text-gray-400" />
                        {todo.linkedEntities.map((entity, idx) => (
                          <Badge
                            key={`${entity.type}-${entity.id}-${idx}`}
                            variant="outline"
                            className="text-[10px] px-2 py-0.5 bg-gray-50"
                          >
                            <span className="mr-1">{getEntityIcon(entity.type)}</span>
                            {entity.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="h-8 w-8 p-0 hover:bg-red-50 flex-shrink-0"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <CheckCircle2 className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">ไม่พบ To-Do</p>
              <p className="text-xs text-gray-400 mt-1">ลองเปลี่ยนตัวกรองหรือสร้าง To-Do ใหม่</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Add Modal */}
      <QuickAddTodoModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleSaveTodo}
      />
    </div>
  );
}
