import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import {
  Calendar,
  User,
  Building2,
  Plus,
  MoreVertical,
  Clock,
  MapPin,
  Phone,
  Mail,
  AlertCircle,
  CheckCircle2,
  EyeOff,
  Edit,
  Trash2,
  ChevronDown, // 🟢 ใช้สำหรับปุ่มพับการ์ด
  ChevronUp,   // 🟢 ใช้สำหรับปุ่มขยายการ์ด
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "todo" | "in-progress" | "completed";
  dueDate: string;
  dueTime: string;
  assignee: string;
  assignees?: string[];
  attendees?: string[];
  completed: boolean;
  customer?: string;
  relatedTo?: string;
  location?: string;
  contactPerson?: string;
  contactPhone?: string;
  contactEmail?: string;
  activityType?: string;
}

interface TaskCardProps {
  task: Task;
  onMove: (taskId: string, newStatus: "todo" | "in-progress" | "completed") => void;
  onEdit?: (task: Task) => void;
  onView?: (task: Task) => void;
  onHide?: (taskId: string) => void; // เก็บ Prop ไว้เผื่อใช้ทำอย่างอื่นต่อ
  onDelete?: (taskId: string) => void;
}

const TaskCard = ({ task, onMove, onEdit, onView, onHide, onDelete }: TaskCardProps) => {
  const { t } = useTranslation();
  
  // 🟢 เพิ่ม State สำหรับควบคุมการพับ/ขยายการ์ด (ค่าเริ่มต้นคือ ขยาย)
  const [isExpanded, setIsExpanded] = useState(true);

  const [{ isDragging }, drag] = useDrag({
    type: "task",
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500";
      case "medium":
        return "border-l-orange-500";
      default:
        return "border-l-blue-500";
    }
  };

  const getStatusBadge = () => {
    const today = new Date().toISOString().split("T")[0];
    const taskDate = task.dueDate;
    const isPast = taskDate < today;

    if (task.status === "completed") {
      return (
        <Badge className="bg-green-50 text-green-600 border-green-300 text-[10px] px-2 py-0.5">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Done
        </Badge>
      );
    }

    if (task.status === "in-progress") {
      if (isPast) {
        return (
          <Badge className="bg-red-50 text-red-600 border-red-300 text-[10px] px-2 py-0.5">
            overdue
          </Badge>
        );
      }
      if (taskDate === today) {
        return (
          <Badge className="bg-orange-50 text-orange-600 border-orange-300 text-[10px] px-2 py-0.5">
            today
          </Badge>
        );
      }
      return (
        <Badge className="bg-orange-50 text-orange-600 border-orange-300 text-[10px] px-2 py-0.5">
          <Clock className="h-3 w-3 mr-1" />
          In Progress
        </Badge>
      );
    }

    if (isPast) {
      return (
        <Badge className="bg-red-50 text-red-600 border-red-300 text-[10px] px-2 py-0.5">
          overdue
        </Badge>
      );
    }

    return (
      <Badge className="bg-red-50 text-red-600 border-red-300 text-[10px] px-2 py-0.5">
        <AlertCircle className="h-3 w-3 mr-1" />
        Pending
      </Badge>
    );
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const month = date.toLocaleString("en", { month: "short" });
    const day = date.getDate();
    return `${month} ${day}`;
  };

  const getInitials = (name: string) => {
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return parts[0][0] + parts[1][0];
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div
      ref={drag as any}
      className={`mb-3 ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      <Card
        className={`border-l-4 ${getPriorityColor(
          task.priority
        )} hover:shadow-lg transition-all cursor-move bg-white`}
        onClick={() => onView?.(task)}
      >
        <CardContent className="p-3">
          {/* Header with Menu */}
          <div className={`flex items-start justify-between gap-2 ${isExpanded ? 'mb-3' : ''}`}>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 text-sm leading-tight mb-1.5">
                {task.title}
              </h4>
              {getStatusBadge()}
            </div>
            
            {/* 🟢 Action Buttons Container */}
            <div className="flex items-center gap-0.5 flex-shrink-0">
              {/* ปุ่มพับ/ขยาย การ์ด */}
              <button
                className="h-7 w-7 rounded hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors"
                onClick={(e) => {
                  e.stopPropagation(); // ป้องกันไม่ให้ทะลุไปเปิด View Modal
                  setIsExpanded(!isExpanded);
                }}
              >
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger
                  className="h-7 w-7 rounded hover:bg-gray-100 flex items-center justify-center flex-shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <MoreVertical className="h-4 w-4 text-gray-500" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit?.(task);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete?.(task.id);
                    }}
                    className="text-red-600 focus:text-red-600 focus:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* 🟢 หุ้มรายละเอียดด้วย isExpanded */}
          {isExpanded && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Date & Time */}
              <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-3">
                <Calendar className="h-3.5 w-3.5" />
                <span>
                  {formatDate(task.dueDate)}
                  {task.dueTime && ` • ${task.dueTime}`}
                </span>
              </div>

              {/* Deal Info */}
              {task.relatedTo && (
                <div className="mb-3">
                  <div className="text-xs font-medium text-gray-500 mb-0.5">Deal</div>
                  <div className="text-xs text-gray-900 font-medium">{task.relatedTo}</div>
                </div>
              )}

              {/* Customer */}
              {task.customer && (
                <div className="mb-3">
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <Building2 className="h-3.5 w-3.5" />
                    <span className="truncate">{task.customer}</span>
                  </div>
                </div>
              )}

              {/* Assignee */}
              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 bg-gradient-to-br from-[#7BC9A6] to-[#5FB592] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[10px] font-bold">
                        {getInitials(task.assignee)}
                      </span>
                    </div>
                    <span className="text-xs text-gray-700 font-medium truncate max-w-[100px]">{task.assignee}</span>
                  </div>
                  {((task.assignees?.length || 0) > 1 || (task.attendees?.length || 0) > 1) && (
                    <div className="h-6 w-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[9px] font-bold text-emerald-600">
                      +{(task.assignees?.length || task.attendees?.length || 0) - 1}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
};

// ... โค้ด Column และ TasksKanbanView เหมือนเดิมไม่เปลี่ยนแปลง ...
interface ColumnProps {
  status: "todo" | "in-progress" | "completed";
  title: string;
  tasks: Task[];
  count: number;
  onMove: (taskId: string, newStatus: "todo" | "in-progress" | "completed") => void;
  onAddTask?: () => void;
  onEdit?: (task: Task) => void;
  onView?: (task: Task) => void;
  onHide?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
}

const Column = ({ status, title, tasks, count, onMove, onAddTask, onEdit, onView, onHide, onDelete }: ColumnProps) => {
  const [{ isOver }, drop] = useDrop({
    accept: "task",
    drop: (item: { id: string; status: string }) => {
      if (item.status !== status) {
        onMove(item.id, status);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const getColumnColor = () => {
    switch (status) {
      case "todo":
        return "bg-gray-50";
      case "in-progress":
        return "bg-orange-50";
      case "completed":
        return "bg-green-50";
      default:
        return "bg-gray-50";
    }
  };

  return (
    <div
      ref={drop as any}
      className={`flex-shrink-0 w-80 ${
        isOver ? "bg-blue-50 border-2 border-dashed border-blue-400" : ""
      } rounded-lg transition-all p-2`}
    >
      <div className={`${getColumnColor()} rounded-lg h-full border border-gray-200 flex flex-col`}>
        {/* Column Header */}
        <div className="p-3 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
              <Badge className="bg-white text-gray-700 border-gray-300 text-xs px-2 py-0.5">
                {count}
              </Badge>
            </div>
          </div>
        </div>

        {/* Tasks */}
        <div className="p-3 flex-1 flex flex-col">
          <ScrollArea className="h-[calc(100vh-320px)] flex-1">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onMove={onMove} onEdit={onEdit} onView={onView} onHide={onHide} onDelete={onDelete} />
            ))}
            {tasks.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center h-full">
                <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <CheckCircle2 className="h-6 w-6 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">No tasks</p>
              </div>
            )}
          </ScrollArea>

          {/* Add Task Button */}
          <button
            onClick={onAddTask}
            className="mt-3 w-full flex items-center gap-2 text-orange-600 hover:text-orange-700 text-sm font-medium py-2 px-3 rounded-lg hover:bg-orange-50 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add a card
          </button>
        </div>
      </div>
    </div>
  );
};

interface TasksKanbanViewProps {
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: "todo" | "in-progress" | "completed") => void;
  onAddTask?: () => void;
  onEditTask?: (task: Task) => void;
  onViewTask?: (task: Task) => void;
  onHideTask?: (taskId: string) => void;
  onDeleteTask?: (taskId: string) => void;
}

export function TasksKanbanView({ tasks, onStatusChange, onAddTask, onEditTask, onViewTask, onHideTask, onDeleteTask }: TasksKanbanViewProps) {
  const { t } = useTranslation();

  const columns = [
    { status: "todo" as const, title: "To Do" },
    { status: "in-progress" as const, title: "In Progress" },
    { status: "completed" as const, title: "Done" },
  ];

  const getTasksByStatus = (status: "todo" | "in-progress" | "completed") => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-full mx-auto">
          {/* Kanban Board */}
          <div className="overflow-x-auto pb-6">
            <div className="flex gap-4 min-w-max px-3">
              {columns.map((column) => (
                <Column
                  key={column.status}
                  status={column.status}
                  title={column.title}
                  tasks={getTasksByStatus(column.status)}
                  count={getTasksByStatus(column.status).length}
                  onMove={onStatusChange}
                  onAddTask={onAddTask}
                  onEdit={onEditTask}
                  onView={onViewTask}
                  onHide={onHideTask}
                  onDelete={onDeleteTask}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}