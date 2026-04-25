import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Calendar,
  Clock,
  User,
  MapPin,
  Phone,
  Mail,
  Building2,
  FileText,
  CheckCircle2,
  Edit2,
  ArrowLeft,
  Trash2,
  History,
  MessageSquare,
  Paperclip,
  ChevronDown,
  Check,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRoleTheme } from "../../hooks/use-role-theme";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import { toast } from "sonner";
import { useModuleStore } from "../../store/module-store";

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
  approvers?: string[];
  location?: string;
  contactPerson?: string;
  contactPhone?: string;
  contactEmail?: string;
  activityType?: string;
}

interface TaskDetailScreenProps {
  taskId: string;
  onNavigate?: (path: string) => void;
  onEdit?: (task: Task) => void;
}

// Inline editable field component
interface InlineEditFieldProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  iconBg?: string;
  onSave: (value: string) => void;
  type?: "text" | "textarea" | "date" | "email" | "tel";
  isLink?: boolean;
  linkHref?: string;
  className?: string;
}

function InlineEditField({
  label,
  value,
  icon,
  iconBg = "bg-gray-100",
  onSave,
  type = "text",
  isLink = false,
  linkHref,
  className = "",
}: InlineEditFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editValue.trim() !== value) {
      onSave(editValue.trim());
      toast.success("บันทึกสำเร็จ", {
        duration: 2000,
        icon: <Check className="h-4 w-4 text-green-600" />,
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (type !== "textarea") {
      if (e.key === "Enter") {
        handleSave();
      } else if (e.key === "Escape") {
        handleCancel();
      }
    } else {
      if (e.key === "Escape") {
        handleCancel();
      }
    }
  };

  return (
    <div className={`flex items-start gap-3 ${className}`}>
      {icon && (
        <div className={`h-9 w-9 ${iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500 mb-1">{label}</p>
        {isEditing ? (
          <div className="space-y-0">
            {type === "textarea" ? (
              <textarea
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                className="w-full px-2 py-1 text-sm border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all resize-none"
                rows={3}
              />
            ) : (
              <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type={type}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                className="w-full h-7 px-2 py-1 text-sm border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
              />
            )}
          </div>
        ) : (
          <div
            onClick={() => setIsEditing(true)}
            className="group flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded px-2 py-1 -ml-2 transition-colors min-h-[28px]"
          >
            {isLink && linkHref ? (
              <a
                href={linkHref}
                className="text-sm font-medium text-blue-600 hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {value}
              </a>
            ) : (
              <p className="text-sm text-gray-900">{value}</p>
            )}
            <Edit2 className="h-3.5 w-3.5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
          </div>
        )}
      </div>
    </div>
  );
}

// Inline select dropdown component
interface InlineSelectFieldProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  options: { value: string; label: string; color?: string }[];
  onSave: (value: string) => void;
  renderBadge?: (value: string) => React.ReactNode;
}

function InlineSelectField({
  label,
  value,
  icon,
  options,
  onSave,
  renderBadge,
}: InlineSelectFieldProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (newValue: string) => {
    if (newValue !== value) {
      onSave(newValue);
      toast.success("บันทึกสำเร็จ", {
        duration: 2000,
        icon: <Check className="h-4 w-4 text-green-600" />,
      });
    }
    setIsEditing(false);
  };

  return (
    <div className="flex items-center gap-2">
      {icon}
      <div className="flex-1">
        <p className="text-xs text-gray-500 mb-1">{label}</p>
        {isEditing ? (
          <select
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={() => setIsEditing(false)}
            autoFocus
            className="h-7 px-2 text-sm border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <div
            onClick={() => setIsEditing(true)}
            className="group flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded px-2 py-1 -ml-2 transition-colors min-h-[28px]"
          >
            {renderBadge ? renderBadge(value) : <p className="text-sm text-gray-900">{value}</p>}
            <ChevronDown className="h-3.5 w-3.5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
          </div>
        )}
      </div>
    </div>
  );
}

export function TaskDetailScreen({ taskId, onNavigate, onEdit }: TaskDetailScreenProps) {
  const { t } = useTranslation();
  const roleTheme = useRoleTheme();
  
  const tasksFromStore = useModuleStore((state) => state.modules.tasks || []);

  // Mock task data as fallback or initial state
  const mockTask: Task = {
    id: "TASK-001",
    title: "Follow up with Global Freight Solutions",
    description: "Discuss contract renewal terms and pricing adjustments. Need to review the current service agreement and propose new pricing structure based on volume increases. Also discuss potential expansion to new routes.",
    priority: "high",
    status: "in-progress",
    dueDate: "2026-12-19",
    dueTime: "12:00 PM",
    assignee: "You",
    completed: false,
    customer: "Global Freight Solutions Inc.",
    relatedTo: "Contract Renewal",
    location: "123 Sukhumvit Rd, Bangkok 10110",
    contactPerson: "John Anderson",
    contactPhone: "+66-2-123-4567",
    contactEmail: "john.anderson@globalfreight.com",
    activityType: "customer_visit",
    approvers: ["Sarah Chen", "Michael Park"],
  };

  const [task, setTask] = useState<Task>(mockTask);

  // Load task from store if taskId matches
  useEffect(() => {
    const foundTask = tasksFromStore.find(t => t.id === taskId);
    if (foundTask) {
      setTask(foundTask as Task);
    } else if (taskId === "TASK-001") {
      setTask(mockTask);
    }
  }, [taskId, tasksFromStore]);

  const [newComment, setNewComment] = useState("");

  const updateTask = (field: keyof Task, value: any) => {
    setTask((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "status") {
        next.completed = value === "completed";
      }
      if (field === "completed" && value === true) {
        next.status = "completed";
      }
      return next;
    });
  };

  const isOverdue = task.status !== "completed" && new Date(task.dueDate) < new Date();

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-700 border-red-200 rounded-md text-xs">สูง</Badge>;
      case "medium":
        return <Badge className="bg-orange-100 text-orange-700 border-orange-200 rounded-md text-xs">กลาง</Badge>;
      case "low":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200 rounded-md text-xs">ต่ำ</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200 rounded-md text-xs">{priority}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "todo":
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200 rounded-md text-xs">รอดำเนินการ</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200 rounded-md text-xs">กำลังดำเนินการ</Badge>;
      case "completed":
        return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 rounded-md text-xs">เสร็จสิ้น</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200 rounded-md text-xs">{status}</Badge>;
    }
  };

  const getActivityTypeLabel = (type?: string) => {
    switch (type) {
      case "customer_visit": return "เยี่ยมลูกค้า";
      case "meeting": return "ประชุม";
      case "site_survey": return "สำรวจสถานที่";
      case "follow_up": return "ติดตาม";
      default: return type || "ไม่ระบุ";
    }
  };

  // Mock activity data
  const activities = [
    {
      id: "1",
      user: "Sarah Chen",
      avatar: "SC",
      timestamp: "2 hours ago",
      content: "ได้คุยกับลูกค้าแล้ว พวกเขาสนใจข้อเสนอใหม่",
    },
    {
      id: "2",
      user: "You",
      avatar: "YO",
      timestamp: "5 hours ago",
      content: "เปลี่ยนสถานะจาก รอดำเนินการ เป็น กำลังดำเนินการ",
    },
    {
      id: "3",
      user: "Michael Park",
      avatar: "MP",
      timestamp: "1 day ago",
      content: "ต้องเตรียมเอกสารสัญญาเพิ่มเติม",
    },
  ];

  // Mock related tasks
  const relatedTasks = [
    {
      id: "TASK-102",
      title: "Prepare quotation document",
      status: "completed",
      assignee: "Sarah Chen",
    },
    {
      id: "TASK-103",
      title: "Schedule contract review meeting",
      status: "in-progress",
      assignee: "Michael Park",
    },
  ];

  const handleMarkComplete = () => {
    updateTask("completed", true);
    updateTask("status", "completed");
    toast.success("ทำเครื่องหมายงานเสร็จสิ้นแล้ว");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => onNavigate?.("/tasks")}
            className="mb-4 text-gray-600 hover:text-gray-900 -ml-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            กลับไปหน้างานของฉัน
          </Button>

          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              {/* Title */}
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] font-mono text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded uppercase border border-gray-100">
                  {task.id}
                </span>
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight inline">
                  {task.title}
                </h1>
              </div>

              {/* Status and Priority */}
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <InlineSelectField
                  label=""
                  value={task.status}
                  options={[
                    { value: "todo", label: "รอดำเนินการ" },
                    { value: "in-progress", label: "กำลังดำเนินการ" },
                    { value: "completed", label: "เสร็จสิ้น" },
                  ]}
                  onSave={(value) => updateTask("status", value)}
                  renderBadge={(value) => getStatusBadge(value)}
                />

                <InlineSelectField
                  label=""
                  value={task.priority}
                  options={[
                    { value: "high", label: "สูง" },
                    { value: "medium", label: "กลาง" },
                    { value: "low", label: "ต่ำ" },
                  ]}
                  onSave={(value) => updateTask("priority", value)}
                  renderBadge={(value) => getPriorityBadge(value)}
                />

                {task.completed && (
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 rounded-md text-xs">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    เสร็จสมบูรณ์
                  </Badge>
                )}
                {isOverdue && (
                  <Badge className="bg-red-100 text-red-700 border-red-200 rounded-md text-xs">
                    เลยกำหนด
                  </Badge>
                )}
              </div>

              <p className={`text-sm ${isOverdue ? "text-red-600 font-medium" : "text-gray-500"}`}>
                ครบกำหนด {new Date(task.dueDate).toLocaleDateString("th-TH")}
              </p>
            </div>

            <div className="flex gap-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-300 text-gray-700"
              >
                <History className="h-4 w-4 mr-2" />
                ประวัติ
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                ลบ
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content - 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Details */}
          <div className="lg:col-span-2 space-y-4">
            {/* Description */}
            <Card className="border border-gray-200 rounded-lg shadow-sm">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium text-gray-900">รายละเอียด</h3>
                  <FileText className="h-4 w-4 text-gray-400" />
                </div>
                <InlineEditField
                  label=""
                  value={task.description}
                  onSave={(value) => updateTask("description", value)}
                  type="textarea"
                  className="-ml-2"
                />
              </CardContent>
            </Card>

            {/* Business Info */}
            {(task.customer || task.relatedTo || task.activityType) && (
              <Card className="border border-gray-200 rounded-lg shadow-sm">
                <CardContent className="p-4 space-y-4">
                  <h3 className="text-base font-medium text-gray-900">ข้อมูลธุรกิจ</h3>
                  <div className="grid gap-4">
                    {task.customer && (
                      <InlineEditField
                        label="ลูกค้า"
                        value={task.customer}
                        icon={<Building2 className="h-4 w-4 text-gray-500" />}
                        iconBg="bg-gray-100"
                        onSave={(value) => updateTask("customer", value)}
                      />
                    )}
                    {task.relatedTo && (
                      <InlineEditField
                        label="เกี่ยวข้องกับ"
                        value={task.relatedTo}
                        icon={<FileText className="h-4 w-4 text-gray-500" />}
                        iconBg="bg-gray-100"
                        onSave={(value) => updateTask("relatedTo", value)}
                      />
                    )}
                    {task.activityType && (
                      <div className="flex items-start gap-3">
                        <div className="h-9 w-9 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="h-4 w-4 text-gray-500" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 mb-1">หัวข้อ To Do</p>
                          <InlineSelectField
                            label=""
                            value={task.activityType}
                            options={[
                              { value: "customer_visit", label: "เยี่ยมลูกค้า" },
                              { value: "meeting", label: "ประชุม" },
                              { value: "site_survey", label: "สำรวจสถานที่" },
                              { value: "follow_up", label: "ติดตาม" },
                            ]}
                            onSave={(value) => updateTask("activityType", value)}
                            renderBadge={(value) => (
                              <p className="text-sm text-gray-900">{getActivityTypeLabel(value)}</p>
                            )}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact Info */}
            {(task.location || task.contactPerson || task.contactPhone || task.contactEmail) && (
              <Card className="border border-gray-200 rounded-lg shadow-sm">
                <CardContent className="p-4 space-y-4">
                  <h3 className="text-base font-medium text-gray-900">ข้อมูลติดต่อ</h3>
                  <div className="grid gap-4">
                    {task.location && (
                      <InlineEditField
                        label="สถานที่"
                        value={task.location}
                        icon={<MapPin className="h-4 w-4 text-blue-600" />}
                        iconBg="bg-blue-100"
                        onSave={(value) => updateTask("location", value)}
                      />
                    )}
                    {task.contactPerson && (
                      <InlineEditField
                        label="ผู้ติดต่อ"
                        value={task.contactPerson}
                        icon={<User className="h-4 w-4 text-green-600" />}
                        iconBg="bg-green-100"
                        onSave={(value) => updateTask("contactPerson", value)}
                      />
                    )}
                    {task.contactPhone && (
                      <InlineEditField
                        label="โทรศัพท์"
                        value={task.contactPhone}
                        icon={<Phone className="h-4 w-4 text-purple-600" />}
                        iconBg="bg-purple-100"
                        onSave={(value) => updateTask("contactPhone", value)}
                        type="tel"
                        isLink
                        linkHref={`tel:${task.contactPhone}`}
                      />
                    )}
                    {task.contactEmail && (
                      <InlineEditField
                        label="อีเมล"
                        value={task.contactEmail}
                        icon={<Mail className="h-4 w-4 text-orange-600" />}
                        iconBg="bg-orange-100"
                        onSave={(value) => updateTask("contactEmail", value)}
                        type="email"
                        isLink
                        linkHref={`mailto:${task.contactEmail}`}
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Activity Timeline */}
            <Card className="border border-gray-200 rounded-lg shadow-sm">
              <CardContent className="p-4 space-y-4">
                <h3 className="text-base font-medium text-gray-900">กิจกรรม</h3>

                {/* Add Comment */}
                <div className="flex gap-3 pb-4 border-b border-gray-100">
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                      YO
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <textarea
                      placeholder="เพิ่มความคิดเห็น..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all resize-none"
                      rows={3}
                    />
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        size="sm"
                        style={{ backgroundColor: roleTheme.primary }}
                        className="text-white"
                        onClick={() => {
                          if (newComment.trim()) {
                            toast.success("เพิ่มความคิดเห็นแล้ว");
                            setNewComment("");
                          }
                        }}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        แสดงความคิดเห็น
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Paperclip className="h-4 w-4 mr-2" />
                        แนบไฟล์
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Activity List */}
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4 pr-4">
                    {activities.map((activity) => (
                      <div key={activity.id} className="flex gap-3">
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                            {activity.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-sm font-medium text-gray-900">
                              {activity.user}
                            </span>
                            <span className="text-xs text-gray-500">{activity.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">{activity.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Related Tasks */}
            <Card className="border border-gray-200 rounded-lg shadow-sm">
              <CardContent className="p-4 space-y-3">
                <h3 className="text-base font-medium text-gray-900">งานที่เกี่ยวข้อง</h3>
                <div className="space-y-2">
                  {relatedTasks.map((relatedTask) => (
                    <div
                      key={relatedTask.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <CheckCircle2
                          className={`h-5 w-5 flex-shrink-0 ${
                            relatedTask.status === "completed"
                              ? "text-green-600"
                              : "text-gray-400"
                          }`}
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {relatedTask.title}
                          </p>
                          <p className="text-xs text-gray-500">{relatedTask.id}</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 flex-shrink-0 ml-2">{relatedTask.assignee}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Summary & Actions */}
          <div className="space-y-4">
            {/* Quick Summary */}
            <Card className="border border-gray-200 rounded-lg shadow-sm">
              <CardContent className="p-4 space-y-4">
                <h3 className="text-base font-medium text-gray-900">สรุปข้อมูล</h3>

                {/* Due Date */}
                <InlineEditField
                  label="วันที่กำหนด"
                  value={new Date(task.dueDate).toLocaleDateString("th-TH", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  icon={<Calendar className="h-4 w-4 text-gray-500" />}
                  iconBg="bg-gray-50"
                  onSave={(value) => updateTask("dueDate", value)}
                  type="date"
                />

                {/* Due Time */}
                <InlineEditField
                  label="เวลา"
                  value={task.dueTime}
                  icon={<Clock className="h-4 w-4 text-gray-500" />}
                  iconBg="bg-gray-50"
                  onSave={(value) => updateTask("dueTime", value)}
                />

                {/* Assignee */}
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">ผู้รับผิดชอบ</p>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                          YO
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-sm text-gray-900">
                        {task.assignee === "You" ? "คุณ" : task.assignee}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Approvers */}
                {task.approvers && task.approvers.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-4 w-4 text-gray-500" />
                      <span className="text-xs text-gray-500">ผู้อนุมัติ</span>
                    </div>
                    <div className="flex flex-wrap gap-2 ml-6">
                      {task.approvers.map((approver, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-gray-100 text-gray-700 border border-gray-200 rounded-md text-xs"
                        >
                          {approver}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="border border-gray-200 rounded-lg shadow-sm">
              <CardContent className="p-4 space-y-2">
                <h3 className="text-base font-medium text-gray-900 mb-3">การดำเนินการ</h3>
                <Button
                  className="w-full justify-start text-white"
                  style={{ backgroundColor: roleTheme.primary }}
                  onClick={handleMarkComplete}
                  disabled={task.completed}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  ทำเครื่องหมายเสร็จสิ้น
                </Button>
                <Button variant="outline" className="w-full justify-start border-gray-300">
                  <MapPin className="h-4 w-4 mr-2" />
                  Check-in
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
