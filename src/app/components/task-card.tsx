import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Clock, Users, MapPin, MoreVertical, Edit, Trash2, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";

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
  approvers?: string[];
  location?: string;
  contactPerson?: string;
  contactPhone?: string;
  contactEmail?: string;
  titleType?: string;
  isActivity?: boolean;
}

interface TaskCardProps {
  task: Task;
  canEdit: boolean;
  canDelete: boolean;
  onCheckIn: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, newStatus: "todo" | "in-progress" | "completed") => void;
  onViewDetails?: (task: Task) => void;
}

export function TaskCard({ task, canEdit, canDelete, onCheckIn, onEdit, onDelete, onStatusChange, onViewDetails }: TaskCardProps) {
  const { t } = useTranslation();
  const [openMenu, setOpenMenu] = useState(false);
  const [openStatusMenu, setOpenStatusMenu] = useState(false);

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border border-red-200";
      case "medium":
        return "bg-orange-100 text-orange-700 border border-orange-200";
      case "low":
        return "bg-blue-100 text-blue-700 border border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return t("priority.high");
      case "medium":
        return t("priority.medium");
      case "low":
        return t("priority.low");
      default:
        return priority;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "todo":
        return "bg-gray-100 text-gray-700 border border-gray-200";
      case "in-progress":
        return "bg-blue-100 text-blue-700 border border-blue-200";
      case "completed":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "todo":
        return t("tasks.to_do");
      case "in-progress":
        return t("tasks.in_progress");
      case "completed":
        return t("tasks.completed");
      default:
        return status;
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't open details if clicking on interactive elements
    const target = e.target as HTMLElement;
    if (
      target.closest('button') ||
      target.closest('[role="checkbox"]') ||
      target.closest('.badge-clickable')
    ) {
      return;
    }
    if (onViewDetails) {
      onViewDetails(task);
    }
  };

  return (
    <div 
      className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 bg-white hover:shadow-md transition-all cursor-pointer"
      onClick={handleCardClick}
    >
      <div onClick={(e) => e.stopPropagation()} className="flex-shrink-0 pt-1">
        <Checkbox
          checked={task.completed}
          className="border-gray-300 data-[state=checked]:bg-gray-900 data-[state=checked]:border-gray-900 h-6 w-6"
        />
      </div>

      <div className="flex-1 min-w-0">
        {/* Header: Title + Status Badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {task.isActivity && <Badge variant="secondary" className="text-[9px] h-4 px-1 bg-amber-50 text-amber-600 border-amber-100">Activity</Badge>}
            </div>
            <h3 className="font-semibold text-gray-900 text-base mb-1.5 line-clamp-2">
              {task.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {task.description}
            </p>
          </div>
          
          {/* Status Badge with Dropdown */}
          <div className="relative flex-shrink-0">
            <Badge 
              className={`${getStatusBadge(task.status)} rounded-md px-3 py-1 text-sm cursor-pointer hover:opacity-70 transition-opacity whitespace-nowrap font-medium`}
              onClick={(e) => {
                e.stopPropagation();
                setOpenStatusMenu(!openStatusMenu);
              }}
            >
              {getStatusLabel(task.status)}
            </Badge>
            
            {openStatusMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setOpenStatusMenu(false)}
                />
                <div className="absolute left-0 top-full z-20 mt-2 flex flex-col gap-1 p-2 border border-gray-200 rounded-lg bg-white shadow-lg min-w-[140px]">
                  <Badge
                    className="bg-gray-100 text-gray-700 border border-gray-200 rounded-md px-3 py-2 text-sm cursor-pointer hover:bg-gray-200 transition-colors whitespace-nowrap font-medium justify-start"
                    onClick={() => {
                      onStatusChange(task.id, "todo");
                      setOpenStatusMenu(false);
                    }}
                  >
                    {t("tasks.to_do")}
                  </Badge>
                  <Badge
                    className="bg-blue-100 text-blue-700 border border-blue-200 rounded-md px-3 py-2 text-sm cursor-pointer hover:bg-blue-200 transition-colors whitespace-nowrap font-medium justify-start"
                    onClick={() => {
                      onStatusChange(task.id, "in-progress");
                      setOpenStatusMenu(false);
                    }}
                  >
                    {t("tasks.in_progress")}
                  </Badge>
                  <Badge
                    className="bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-md px-3 py-2 text-sm cursor-pointer hover:bg-emerald-200 transition-colors whitespace-nowrap font-medium justify-start"
                    onClick={() => {
                      onStatusChange(task.id, "completed");
                      setOpenStatusMenu(false);
                    }}
                  >
                    {t("tasks.completed")}
                  </Badge>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Bottom row: Priority, Check-in, Menu */}
        <div className="flex items-center gap-2">
          <Badge className={`${getPriorityBadge(task.priority)} rounded-md px-3 py-1.5 text-sm flex-shrink-0 whitespace-nowrap font-medium`}>
            {getPriorityLabel(task.priority)}
          </Badge>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onCheckIn(task);
            }}
            className="px-3 py-2 h-9 text-sm bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-md transition-all border border-gray-200 flex-shrink-0 font-medium"
          >
            <MapPin className="h-4 w-4 mr-1.5" />
            <span>{t("tasks.checkin")}</span>
          </Button>

          {/* Assignee Badge */}
          <div className="flex items-center gap-1.5 bg-gray-50 text-gray-600 px-2.5 py-1.5 rounded-md border border-gray-100 max-w-[120px]">
            <Users className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-xs font-bold truncate">{task.assignee}</span>
            {((task.assignees?.length || 0) > 1 || (task.attendees?.length || 0) > 1) && (
              <Badge className="bg-emerald-500 text-white text-[9px] px-1 h-4 min-w-[16px] flex items-center justify-center rounded-full border-none">
                +{(task.assignees?.length || task.attendees?.length || 0) - 1}
              </Badge>
            )}
          </div>
          
          {/* 3-dots Menu */}
          <div className="relative ml-auto flex-shrink-0" onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpenMenu(!openMenu)}
              className="h-9 w-9 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md"
            >
              <MoreVertical className="h-5 w-5" />
            </Button>
            
            {openMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setOpenMenu(false)}
                />
                <Card className="absolute right-0 top-full z-20 mt-2 w-44 border border-gray-200 rounded-lg bg-white shadow-lg">
                  <CardContent className="p-2">
                    {canEdit && (
                      <button
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 rounded-md transition-colors font-medium"
                        onClick={() => {
                          onEdit(task);
                          setOpenMenu(false);
                        }}
                      >
                        <Edit className="h-4 w-4 text-gray-600" />
                        <span>{t("tasks.edit")}</span>
                      </button>
                    )}
                    {canDelete && (
                      <button
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors font-medium"
                        onClick={() => {
                          onDelete(task.id);
                          setOpenMenu(false);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>{t("tasks.delete")}</span>
                      </button>
                    )}
                    {onViewDetails && (
                      <button
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-50 rounded-md transition-colors font-medium"
                        onClick={() => {
                          onViewDetails(task);
                          setOpenMenu(false);
                        }}
                      >
                        <ChevronDown className="h-4 w-4 text-gray-600" />
                        <span>{t("tasks.view_details")}</span>
                      </button>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}