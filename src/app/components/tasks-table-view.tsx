import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  Calendar,
  Building2,
  MoreVertical,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";

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
  customers?: string[];
  relatedTo?: string;
  location?: string;
  contactPerson?: string;
  contactPhone?: string;
  contactEmail?: string;
  titleType?: string;
  isActivity?: boolean;
}

interface TasksTableViewProps {
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
  onEditTask?: (task: Task) => void;
}

export function TasksTableView({ tasks, onTaskClick, onEditTask }: TasksTableViewProps) {
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge className="bg-red-50 text-red-700 border-red-200 text-xs">
            High
          </Badge>
        );
      case "medium":
        return (
          <Badge className="bg-orange-50 text-orange-700 border-orange-200 text-xs">
            Medium
          </Badge>
        );
      default:
        return (
          <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
            Low
          </Badge>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-50 text-green-700 border-green-200 text-xs">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Done
          </Badge>
        );
      case "in-progress":
        return (
          <Badge className="bg-orange-50 text-orange-700 border-orange-200 text-xs">
            <Clock className="h-3 w-3 mr-1" />
            In Progress
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-50 text-gray-700 border-gray-200 text-xs">
            <AlertCircle className="h-3 w-3 mr-1" />
            To Do
          </Badge>
        );
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getInitials = (name: string) => {
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return parts[0][0] + parts[1][0];
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">
                Task
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">
                Customer
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">
                Status
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">
                Priority
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">
                Due Date
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">
                Assignee
              </th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tasks.map((task, index) => (
              <tr
                key={task.id}
                className={`hover:bg-blue-50 transition-colors cursor-pointer ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
                onClick={() => onTaskClick?.(task)}
              >
                <td className="px-4 py-3">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      {task.isActivity && <span className="text-[9px] text-amber-600 font-bold uppercase tracking-tighter">Activity</span>}
                    </div>
                    <p className="text-sm font-medium text-gray-900">{task.title}</p>
                    {task.relatedTo && (
                      <p className="text-xs text-gray-500 mt-0.5">{task.relatedTo}</p>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  {(task.customer || (task.customers && task.customers.length > 0)) && (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{task.customer || (task.customers && task.customers[0])}</span>
                      </div>
                      {task.customers && task.customers.length > 1 && (
                        <span className="text-[10px] text-emerald-600 font-bold ml-6">
                          +{task.customers.length - 1} more customers
                        </span>
                      )}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">{getStatusBadge(task.status)}</td>
                <td className="px-4 py-3">{getPriorityBadge(task.priority)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-700">{formatDate(task.dueDate)}</p>
                      {task.dueTime && (
                        <p className="text-xs text-gray-500">{task.dueTime}</p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-[10px]">
                        {getInitials(task.assignee)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-700 font-medium">{task.assignee}</span>
                      {((task.assignees?.length || 0) > 1 || (task.attendees?.length || 0) > 1) && (
                        <span className="text-[10px] text-emerald-600 font-bold">
                          +{ (task.assignees?.length || task.attendees?.length || 0) - 1 } others
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditTask?.(task);
                    }}
                  >
                    <MoreVertical className="h-4 w-4 text-gray-600" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-gray-200">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => onTaskClick?.(task)}
          >
            {/* Header: Title and Action Button */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  {task.title}
                </h3>
                {task.relatedTo && (
                  <p className="text-sm text-gray-500">{task.relatedTo}</p>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 flex-shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditTask?.(task);
                }}
              >
                <MoreVertical className="h-5 w-5 text-gray-600" />
              </Button>
            </div>

            {/* Customer */}
            {task.customer && (
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-700">{task.customer}</span>
              </div>
            )}

            {/* Status and Priority */}
            <div className="flex items-center gap-2 mb-3">
              {getStatusBadge(task.status)}
              {getPriorityBadge(task.priority)}
            </div>

            {/* Due Date and Time */}
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <div>
                <span className="text-sm text-gray-700">{formatDate(task.dueDate)}</span>
                {task.dueTime && (
                  <span className="text-sm text-gray-500 ml-2">{task.dueTime}</span>
                )}
              </div>
            </div>

            {/* Assignee */}
            <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7 flex-shrink-0">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xs">
                  {getInitials(task.assignee)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-700">{task.assignee}</span>
            </div>
          </div>
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
            <CheckCircle2 className="h-6 w-6 text-gray-400" />
          </div>
          <p className="text-sm text-gray-500">No tasks found</p>
        </div>
      )}
    </div>
  );
}