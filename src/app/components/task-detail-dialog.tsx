import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

import { VisuallyHidden } from "./ui/visually-hidden";

import { Button } from "./ui/button";

import { Badge } from "./ui/badge";

import { Card, CardContent } from "./ui/card";

import { Avatar, AvatarFallback } from "./ui/avatar";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";

import { ScrollArea } from "./ui/scroll-area";

import { Input } from "./ui/input";

import { Textarea } from "./ui/textarea";

import { Combobox } from "./ui/combobox";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

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
  Trash2,
  Paperclip,
  X,
  Check,
  Globe,
  Briefcase,
  Zap,
  Plus,
  Users,
  MessageSquare,
  Map,
  UserPlus,
  ChevronDown,
} from "lucide-react";

import { useState, useEffect } from "react";

import { toast } from "sonner";

import { useTranslation } from "react-i18next";

// Generate time options in 15-minute intervals

const generateTimeOptions = () => {
  const times: string[] = [];

  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const h = hour.toString().padStart(2, "0");

      const m = minute.toString().padStart(2, "0");

      times.push(`${h}:${m}`);
    }
  }

  return times;
};

const TIME_OPTIONS = generateTimeOptions();

// Mock data for dropdowns

const ACTIVITY_TYPES = [
  {
    value: "customer_visit",

    label: "เยี่ยมลูกค้า (Customer Visit)",
  },

  { value: "site_survey", label: "สำรวจสถานที่ (Site Survey)" },

  {
    value: "sales_meeting",

    label: "ประชุมขาย (Sales Meeting)",
  },

  {
    value: "internal_meeting",

    label: "ประชุมภายใน (Internal Meeting)",
  },

  { value: "follow_up", label: "ติดตามงาน (Follow-up)" },

  { value: "quotation", label: "เสนอราคา (Quotation)" },

  { value: "demo", label: "สาธิตสินค้า (Demo)" },
];

const SERVICE_TOPICS = [
  { value: "freight", label: "Freight (ขนส่งสินค้า)" },

  { value: "warehouse", label: "Warehouse (คลังสินค้า)" },

  { value: "customs", label: "Customs (ศุลกากร)" },

  { value: "packaging", label: "Packaging (บรรจุภัณฑ์)" },

  {
    value: "distribution",

    label: "Distribution (กระจายสินค้า)",
  },
];

const CUSTOMERS = [
  { value: "pacific", label: "Pacific Distribution Co." },

  { value: "scg", label: "SCG Chemicals" },

  { value: "ptt", label: "PTT Group" },

  { value: "cpall", label: "CP ALL" },

  { value: "central", label: "Central Group" },
];

const TEAM_MEMBERS = [
  { value: "sarah", label: "Sarah Chen" },

  { value: "michael", label: "Michael Wong" },

  { value: "david", label: "David Lee" },

  { value: "lisa", label: "Lisa Wang" },

  { value: "john", label: "John Smith" },
];

export function TaskDetailDialog({
  isOpen,

  onClose,

  task,

  onEdit,

  onDelete,

  onStatusChange,
}: any) {
  const { t } = useTranslation();

  const [editingField, setEditingField] = useState<
    string | null
  >(null);

  const [editForm, setEditForm] = useState<any>({});

  const [sharingMode, setSharingMode] = useState<
    "private" | "public"
  >("private");

  const [selectedTeamMembers, setSelectedTeamMembers] =
    useState<string[]>([]);

  const [contactPersons, setContactPersons] = useState<
    string[]
  >([]);

  // State สำหรับจัดการการเปิด/ปิด Dropdown รายชื่อทีม

  const [isTeamListOpen, setIsTeamListOpen] = useState(false);

  useEffect(() => {
    if (isOpen && task) {
      setEditForm({ ...task });

      setEditingField(null);

      setContactPersons([mockData.contactPerson]);

      setSelectedTeamMembers(["sarah", "michael"]);

      setIsTeamListOpen(false); // Reset dropdown
    }
  }, [isOpen, task]);

  if (!task) return null;

  // 1. Dynamic Layout Logic

  const isSpecialActivity =
    task.activityType === "meeting" ||
    task.activityType === "customer_visit" ||
    task.isActivity === true;

  // จัดการรูปแบบสถานะให้ตรงกับ value ของ Select (แก้ปัญหาข้อความหาย)

  const getNormalizedStatus = (status: string) => {
    if (!status) return "todo";

    const s = status.toLowerCase().replace("_", "-");

    if (s === "pending") return "todo";

    return s;
  };

  const currentStatus = getNormalizedStatus(task.status);

  const displayStatusBadge = task.status
    ? task.status.toUpperCase().replace(/[-_]/g, " ")
    : "TODO";

  // 2. Master Mockup Data

  const mockData = {
    description:
      task.description ||
      "จัดเตรียมเอกสาร Presentation และตรวจสอบสต็อกสินค้าคงเหลือในระบบ SAP ให้เรียบร้อยก่อนเข้าพบลูกค้า",

    location:
      task.location ||
      "789 ถนนพระราม 4 แขวงสีลม เขตบางรัก กรุงเทพฯ 10330",

    siteBranch: task.siteBranch || "สำนักงานใหญ่ (HQ)",

    contactPerson:
      task.contactPerson || "คุณเดวิด ลี - Logistics Manager",

    contactPhone: task.contactPhone || "02-345-6789",

    contactEmail:
      task.contactEmail || "david.lee@pacific-dist.com",

    customers: task.customers?.length
      ? task.customers
      : ["Pacific Distribution Co."],

    activityType:
      task.activityType || "สำรวจสถานที่ (Site Survey)",

    SERVICE_TOPICS: ["Freight", "Warehouse"],

    startTime: task.dueTime || "10:00",

    endTime: task.endTime || "12:00",

    attendees: [
      "Sarah Chen",

      "Michael Wong",

      "คุณอุ้ย (Manager)",
    ],

    sharedWith: ["Sales Team A", "Marketing Support"],

    createdBy: task.createdBy?.name || "คุณ (You)",

    activities: [
      {
        id: "1",

        user: "Sarah Chen",

        avatar: "SC",

        action: "เพิ่มความคิดเห็นใหม่",

        time: "2 ชม. ที่แล้ว",

        content:
          "ส่งใบเสนอราคาให้ลูกค้าพิจารณาแล้วค่ะ รอการตอบกลับ",

        file: "Quotation_v2.pdf",
      },

      {
        id: "2",

        user: "Michael Wong",

        avatar: "MW",

        action: "อัปเดตสถานะ",

        time: "เมื่อวานนี้ 14:20",

        content: "อัปเดตสถานะเป็น 'In Progress' เรียบร้อยครับ",
      },
    ],

    relatedTasks: [
      {
        id: "TASK-1002",

        title: "จัดเตรียมเอกสารสัญญา (Draft Contract)",

        status: "completed",

        assignee: "Sarah Chen",
      },

      {
        id: "TASK-1005",

        title: "ส่งตัวอย่างสินค้า (Sample Shipping)",

        status: "todo",

        assignee: "คุณ (You)",
      },
    ],
  };

  const handleSaveField = (fieldName: string) => {
    if (onEdit) onEdit(editForm);

    toast.success(`อัปเดต ${fieldName} สำเร็จ`);

    setEditingField(null);
  };

  const addContactPerson = () => {
    setContactPersons([...contactPersons, ""]);

    toast.success("เพิ่มผู้ติดต่อใหม่");
  };

  const removeContactPerson = (index: number) => {
    setContactPersons(
      contactPersons.filter((_, i) => i !== index),
    );

    toast.success("ลบผู้ติดต่อแล้ว");
  };

  const toggleTeamMember = (memberId: string) => {
    if (selectedTeamMembers.includes(memberId)) {
      setSelectedTeamMembers(
        selectedTeamMembers.filter((id) => id !== memberId),
      );
    } else {
      setSelectedTeamMembers([
        ...selectedTeamMembers,

        memberId,
      ]);
    }
  };

  // --- Inline Editable Component ---

  const Editable = ({
    field,

    label,

    type = "text",

    icon: Icon,

    value,

    suffix,
  }: any) => {
    const isEditing = editingField === field;

    const displayValue = editForm[field] || value || "-";

    return (
      <div className="group relative flex items-start gap-2 w-full">
        {Icon && (
          <Icon className="h-3.5 w-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
        )}

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-0.5">
            <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider">
              {label}
            </p>

            {!isEditing && (
              <button
                onClick={() => setEditingField(field)}
                className="opacity-0 group-hover:opacity-100 text-blue-500 transition-opacity"
              >
                <Edit2 className="h-3 w-3" />
              </button>
            )}
          </div>

          {isEditing ? (
            <div className="flex gap-1 mt-0.5">
              {type === "textarea" ? (
                <Textarea
                  className="text-xs min-h-[60px] bg-white border-blue-200"
                  value={editForm[field]}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,

                      [field]: e.target.value,
                    })
                  }
                  autoFocus
                />
              ) : (
                <Input
                  className="h-6 text-xs bg-white border-blue-200"
                  value={editForm[field]}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,

                      [field]: e.target.value,
                    })
                  }
                  autoFocus
                />
              )}

              <div className="flex flex-col gap-0.5">
                <button
                  onClick={() => handleSaveField(field)}
                  className="bg-emerald-500 text-white p-0.5 rounded hover:bg-emerald-600"
                >
                  <Check className="h-3 w-3" />
                </button>

                <button
                  onClick={() => setEditingField(null)}
                  className="bg-gray-100 text-gray-400 p-0.5 rounded hover:bg-gray-200"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
          ) : (
            <div
              className="text-xs font-semibold text-gray-800 leading-snug cursor-pointer flex items-center gap-1 break-words"
              onClick={() => setEditingField(field)}
            >
              {displayValue} {suffix}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Searchable Combobox for Activity Type

  const ActivityTypeCombobox = ({ field, label }: any) => {
    const isEditing = editingField === field;

    const currentValue =
      editForm[field] || mockData.activityType;

    return (
      <div className="group relative flex items-start gap-2 w-full">
        <Briefcase className="h-3.5 w-3.5 text-gray-400 mt-0.5 flex-shrink-0" />

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-0.5">
            <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider">
              {label}
            </p>

            {!isEditing && (
              <button
                onClick={() => setEditingField(field)}
                className="opacity-0 group-hover:opacity-100 text-blue-500 transition-opacity"
              >
                <Edit2 className="h-3 w-3" />
              </button>
            )}
          </div>

          {isEditing ? (
            <div className="flex gap-1 mt-0.5">
              <Combobox
                options={ACTIVITY_TYPES}
                value={editForm[field]}
                onValueChange={(val) =>
                  setEditForm({ ...editForm, [field]: val })
                }
                placeholder="เลือกประเภทกิจกรรม..."
                searchPlaceholder="ค้นหา..."
              />

              <div className="flex flex-col gap-0.5">
                <button
                  onClick={() => handleSaveField(field)}
                  className="bg-emerald-500 text-white p-0.5 rounded hover:bg-emerald-600"
                >
                  <Check className="h-3 w-3" />
                </button>

                <button
                  onClick={() => setEditingField(null)}
                  className="bg-gray-100 text-gray-400 p-0.5 rounded hover:bg-gray-200"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
          ) : (
            <div
              className="text-xs font-semibold text-gray-800 leading-snug cursor-pointer break-words"
              onClick={() => setEditingField(field)}
            >
              {currentValue}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Searchable Combobox for Customer/Lead

  const CustomerCombobox = ({ field, label }: any) => {
    const isEditing = editingField === field;

    const currentValue =
      editForm[field] || mockData.customers[0];

    return (
      <div className="group relative flex items-start gap-2 w-full">
        <Building2 className="h-3.5 w-3.5 text-gray-400 mt-0.5 flex-shrink-0" />

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-0.5">
            <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider">
              {label}
            </p>

            {!isEditing && (
              <button
                onClick={() => setEditingField(field)}
                className="opacity-0 group-hover:opacity-100 text-blue-500 transition-opacity"
              >
                <Edit2 className="h-3 w-3" />
              </button>
            )}
          </div>

          {isEditing ? (
            <div className="flex gap-1 mt-0.5">
              <Combobox
                options={CUSTOMERS}
                value={editForm[field]}
                onValueChange={(val) =>
                  setEditForm({ ...editForm, [field]: val })
                }
                placeholder="เลือกลูกค้า/ลีด..."
                searchPlaceholder="ค้นหา..."
              />

              <div className="flex flex-col gap-0.5">
                <button
                  onClick={() => handleSaveField(field)}
                  className="bg-emerald-500 text-white p-0.5 rounded hover:bg-emerald-600"
                >
                  <Check className="h-3 w-3" />
                </button>

                <button
                  onClick={() => setEditingField(null)}
                  className="bg-gray-100 text-gray-400 p-0.5 rounded hover:bg-gray-200"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
          ) : (
            <div
              className="text-xs font-semibold text-gray-800 leading-snug cursor-pointer break-words"
              onClick={() => setEditingField(field)}
            >
              {currentValue}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Time Selector with 15-minute intervals

  const TimeSelector = ({ field, label }: any) => {
    const isEditing = editingField === field;

    const currentValue =
      editForm[field] ||
      (field === "startTime"
        ? mockData.startTime
        : mockData.endTime);

    return (
      <div className="group relative flex items-start gap-2 w-full">
        <Clock className="h-3.5 w-3.5 text-gray-400 mt-0.5 flex-shrink-0" />

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-0.5">
            <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider">
              {label}
            </p>

            {!isEditing && (
              <button
                onClick={() => setEditingField(field)}
                className="opacity-0 group-hover:opacity-100 text-blue-500 transition-opacity"
              >
                <Edit2 className="h-3 w-3" />
              </button>
            )}
          </div>

          {isEditing ? (
            <div className="flex gap-1 mt-0.5">
              <Select
                value={editForm[field] || currentValue}
                onValueChange={(val) =>
                  setEditForm({ ...editForm, [field]: val })
                }
              >
                <SelectTrigger className="h-6 text-xs bg-white border-blue-200">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent className="max-h-[180px]">
                  {TIME_OPTIONS.map((time) => (
                    <SelectItem
                      key={time}
                      value={time}
                      className="text-xs"
                    >
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex flex-col gap-0.5">
                <button
                  onClick={() => handleSaveField(field)}
                  className="bg-emerald-500 text-white p-0.5 rounded hover:bg-emerald-600"
                >
                  <Check className="h-3 w-3" />
                </button>

                <button
                  onClick={() => setEditingField(null)}
                  className="bg-gray-100 text-gray-400 p-0.5 rounded hover:bg-gray-200"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
          ) : (
            <div
              className="text-xs font-semibold text-gray-800 leading-snug cursor-pointer"
              onClick={() => setEditingField(field)}
            >
              {currentValue}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-5xl w-[98vw] h-fit max-h-[96vh] overflow-hidden bg-[#F9FAFB] shadow-2xl border-none rounded-lg font-semibold p-0"
      >
        <VisuallyHidden>
          <DialogTitle>{task.title}</DialogTitle>
        </VisuallyHidden>

        {/* --- HEADER --- */}

        <div className="bg-white border-b border-gray-200 px-3 py-2 flex justify-between items-start shrink-0">
          <div className="space-y-1 min-w-0 flex-1">
            <h2 className="text-base font-semibold text-gray-900 tracking-tight truncate">
              {task.title}
            </h2>

            <div className="flex items-center gap-1.5">
              <Badge
                className={`rounded font-semibold text-[9px] px-1.5 py-0.5 border ${
                  currentStatus === "completed"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                    : "bg-blue-50 text-blue-700 border-blue-100"
                }`}
              >
                {displayStatusBadge}
              </Badge>

              <Badge className="bg-red-50 text-red-700 border-red-100 rounded font-semibold text-[9px] px-1.5 py-0.5">
                {task.priority?.toUpperCase()}
              </Badge>
            </div>
          </div>

          <div className="flex gap-1.5 shrink-0 ml-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete?.(task.id)}
              className="border-red-200 text-red-600 hover:bg-red-50 font-semibold h-7 text-xs px-2"
            >
              ลบ
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-7 w-7 p-0 rounded-full border border-gray-100 bg-white"
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-3 px-3 pb-3 bg-white-100 overflow-y-auto max-h-[calc(96vh-4rem)]">
          {/* --- LEFT SIDE: Dynamic Layouts --- */}

          <div className="flex-1 min-w-0 space-y-3">
            <Tabs defaultValue="details">
              <TabsList className="bg-gray-200/60 p-0.5 rounded-lg w-full grid grid-cols-3">
                <TabsTrigger
                  value="details"
                  className="data-[state=active]:bg-white text-[10px] font-semibold px-2 h-7"
                >
                  รายละเอียด
                </TabsTrigger>

                <TabsTrigger
                  value="activity"
                  className="data-[state=active]:bg-white text-[10px] font-semibold px-2 h-7"
                >
                  กิจกรรม
                </TabsTrigger>

                <TabsTrigger
                  value="related"
                  className="data-[state=active]:bg-white text-[10px] font-semibold px-2 h-7"
                >
                  เกี่ยวข้อง
                </TabsTrigger>
              </TabsList>

              {/* 1. แท็บรายละเอียด */}

              <TabsContent
                value="details"
                className="mt-2 space-y-2"
              >
                {!isSpecialActivity ? (
                  <>
                    <div className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
                      <Editable
                        field="description"
                        label="รายละเอียดงาน"
                        type="textarea"
                        icon={FileText}
                        value={mockData.description}
                      />
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
                      <h3 className="text-[11px] font-semibold text-gray-900 mb-2 uppercase">
                        ข้อมูลเพิ่มเติม
                      </h3>

                      <div className="space-y-3">
                        <CustomerCombobox
                          field="customers"
                          label="ลูกค้า / ลีด"
                        />

                        <ActivityTypeCombobox
                          field="titleType"
                          label="หัวข้อ TO-DO"
                        />
                      </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
                      <h3 className="text-[11px] font-semibold text-gray-900 mb-2 uppercase">
                        ข้อมูลติดต่อลูกค้า
                      </h3>

                      <div className="grid grid-cols-2 gap-y-3 gap-x-3">
                        <Editable
                          field="location"
                          label="สถานที่"
                          icon={MapPin}
                          value={mockData.location}
                        />

                        <Editable
                          field="contactPerson"
                          label="ผู้ติดต่อ"
                          icon={User}
                          value={mockData.contactPerson}
                        />

                        <Editable
                          field="contactPhone"
                          label="โทรศัพท์"
                          icon={Phone}
                          value={mockData.contactPhone}
                        />

                        <Editable
                          field="contactEmail"
                          label="อีเมล"
                          icon={Mail}
                          value={mockData.contactEmail}
                        />
                      </div>

                      {contactPersons.length > 1 && (
                        <div className="mt-2 space-y-1.5">
                          {contactPersons

                            .slice(1)

                            .map((person, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-1.5 p-2 bg-gray-50 rounded-lg border border-gray-100"
                              >
                                <User className="h-3.5 w-3.5 text-gray-400" />

                                <Input
                                  placeholder="ชื่อผู้ติดต่อเพิ่มเติม"
                                  className="flex-1 h-6 text-xs"
                                  value={person}
                                  onChange={(e) => {
                                    const newPersons = [
                                      ...contactPersons,
                                    ];

                                    newPersons[idx + 1] =
                                      e.target.value;

                                    setContactPersons(
                                      newPersons,
                                    );
                                  }}
                                />

                                <button
                                  onClick={() =>
                                    removeContactPerson(idx + 1)
                                  }
                                  className="text-red-500 hover:bg-red-50 p-0.5 rounded"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-2 bg-blue-50/20 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="text-[11px] font-semibold text-blue-900 flex items-center gap-1.5 uppercase">
                        <Briefcase className="h-3.5 w-3.5" />{" "}
                        Activity Full Information
                      </h3>
                    </div>

                    <div className="p-3 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <ActivityTypeCombobox
                            field="activityType"
                            label="ประเภทกิจกรรมนัดหมาย"
                          />

                          <CustomerCombobox
                            field="customers"
                            label="ลูกค้า / ลีด"
                          />

                          <div className="flex gap-2">
                            <TimeSelector
                              field="startTime"
                              label="START TIME"
                            />

                            <TimeSelector
                              field="endTime"
                              label="END TIME"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Editable
                            field="location"
                            label="LOCATION / MEETING ROOM"
                            icon={MapPin}
                            value={mockData.location}
                          />

                          <Editable
                            field="siteBranch"
                            label="สาขา / ไซด์งาน"
                            icon={Map}
                            value={mockData.siteBranch}
                          />

                          <Editable
                            field="contactPerson"
                            label="CUSTOMER CONTACT PERSON"
                            icon={User}
                            value={mockData.contactPerson}
                          />
                        </div>
                      </div>

                      <div className="pt-2 border-t border-gray-50">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={addContactPerson}
                          className="text-xs font-semibold border-blue-200 text-blue-600 hover:bg-blue-50 h-7"
                        >
                          <UserPlus className="h-3 w-3 mr-1.5" />
                          เพิ่มบุคคล
                        </Button>

                        {contactPersons.length > 1 && (
                          <div className="mt-2 space-y-1.5">
                            {contactPersons

                              .slice(1)

                              .map((person, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-1.5 p-1.5 bg-gray-50 rounded-lg border border-gray-100"
                                >
                                  <User className="h-3 w-3 text-gray-400" />

                                  <Input
                                    placeholder="ชื่อผู้ติดต่อเพิ่มเติม"
                                    className="flex-1 h-6 text-xs"
                                    value={person}
                                    onChange={(e) => {
                                      const newPersons = [
                                        ...contactPersons,
                                      ];

                                      newPersons[idx + 1] =
                                        e.target.value;

                                      setContactPersons(
                                        newPersons,
                                      );
                                    }}
                                  />

                                  <button
                                    onClick={() =>
                                      removeContactPerson(
                                        idx + 1,
                                      )
                                    }
                                    className="text-red-500 hover:bg-red-50 p-0.5 rounded"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>

                      <div className="pt-3 border-t border-gray-50">
                        <p className="text-[9px] font-semibold text-gray-400 uppercase mb-1.5">
                          หัวข้อบริการที่เกี่ยวข้อง
                        </p>

                        <div className="flex flex-wrap gap-1.5">
                          {mockData.SERVICE_TOPICS.map(
                            (topic) => (
                              <Badge
                                key={topic}
                                className="bg-gray-100 text-gray-700 border-none font-semibold text-[9px]"
                              >
                                {topic}
                              </Badge>
                            ),
                          )}

                          <Button
                            variant="outline"
                            size="sm"
                            className="h-5 px-1.5 text-[9px] border-dashed border-blue-300 text-blue-600 hover:bg-blue-50"
                          >
                            <Plus className="h-2.5 w-2.5 mr-0.5" />{" "}
                            เพิ่มหัวข้อ
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* 2. แท็บกิจกรรม */}

              <TabsContent
                value="activity"
                className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm space-y-3 mt-2"
              >
                <div className="flex gap-2 border-b border-gray-50 pb-3">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-emerald-50 text-emerald-600 text-[9px] font-semibold">
                      YOU
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <Textarea
                      placeholder="เพิ่มความคิดเห็นใหม่ที่นี่..."
                      className="text-xs min-h-[50px] bg-gray-50 border-gray-100 resize-none mb-2"
                    />

                    <div className="flex gap-1.5">
                      <Button
                        size="sm"
                        className="bg-emerald-600 h-7 font-semibold text-[10px]"
                      >
                        <MessageSquare className="h-3 w-3 mr-1" />{" "}
                        เพิ่มความคิดเห็น
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 font-semibold text-[10px] border-gray-200"
                      >
                        <Paperclip className="h-3 w-3 mr-1" />{" "}
                        แนบไฟล์
                      </Button>
                    </div>
                  </div>
                </div>

                {mockData.activities.map((act) => (
                  <div key={act.id} className="flex gap-2">
                    <Avatar className="h-6 w-6 border">
                      <AvatarFallback className="text-[9px] font-semibold bg-blue-50 text-blue-600">
                        {act.avatar}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 bg-gray-50/50 p-2.5 rounded-lg border border-gray-100 min-w-0">
                      <div className="flex justify-between mb-1">
                        <span className="text-[10px] font-semibold text-gray-900 truncate">
                          {act.user}{" "}
                          <span className="text-gray-400 font-normal ml-1">
                            [{act.action}]
                          </span>
                        </span>

                        <span className="text-[9px] text-gray-400 shrink-0 ml-2">
                          {act.time}
                        </span>
                      </div>

                      <p className="text-xs text-gray-600 leading-snug">
                        {act.content}
                      </p>

                      {act.file && (
                        <div className="mt-2 flex items-center gap-1.5 text-[9px] font-semibold text-blue-600 bg-white p-1.5 rounded-lg border border-blue-50 w-fit cursor-pointer">
                          <Paperclip className="h-3 w-3" />{" "}
                          {act.file}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </TabsContent>

              {/* 3. แท็บเกี่ยวข้อง */}

              <TabsContent value="related" className="mt-2">
                <div className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm space-y-2">
                  <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5 italic">
                    งานที่ต้องทำต่อเนื่อง & ดีลที่ผูกอยู่
                  </h4>

                  {mockData.relatedTasks.map((rel) => (
                    <div
                      key={rel.id}
                      className="flex items-center justify-between p-2.5 border border-gray-100 rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <div
                          className={`p-1.5 rounded-full ${rel.status === "completed" ? "bg-emerald-50 text-emerald-500" : "bg-gray-50 text-gray-300"}`}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-gray-800 truncate">
                            {rel.title}
                          </p>

                          <p className="text-[9px] text-gray-400 font-mono mt-0.5">
                            {rel.id} • {rel.assignee}
                          </p>
                        </div>
                      </div>

                      <Badge
                        className={`text-[9px] font-semibold border-none shrink-0 ml-2 ${rel.status === "completed" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}
                      >
                        {rel.status.toUpperCase()}
                      </Badge>
                    </div>
                  ))}

                  <div className="p-2.5 bg-blue-50/30 rounded-lg border border-dashed border-blue-200 flex items-center gap-3 mt-2">
                    <Zap className="h-6 w-6 text-blue-400 opacity-50 shrink-0" />

                    <div className="min-w-0">
                      <p className="text-[9px] font-semibold text-blue-600 uppercase">
                        Linked Deal (ดีลต้นทาง)
                      </p>

                      <p className="text-xs font-semibold text-gray-800 underline cursor-pointer truncate">
                        #DEAL-2026-091 -
                        โครงการติดตั้งโซลาร์เซลล์ Pacific HQ
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="w-full lg:w-64 shrink-0 space-y-2">
            <Card>
              <CardContent className="p-3 space-y-2.5 bg-white rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-[11px] font-semibold text-gray-900 mb-2 uppercase">
                  ข้อมูลสรุป
                </h3>

                {/* SUMMARY */}

                <Editable
                  field="dueDate"
                  label="วันที่กำหนด"
                  icon={Calendar}
                  value={task.dueDate}
                />

                <Editable
                  field="dueTime"
                  label="เวลา"
                  icon={Clock}
                  value={task.dueTime}
                />

                <Editable
                  field="assignee"
                  label="ผู้รับผิดชอบ"
                  icon={User}
                  value={task.assignee}
                />

                <div className="pt-2 border-t flex gap-2">
                  <Plus className="h-3.5 w-3.5 text-blue-500" />

                  <div className="min-w-0">
                    <p className="text-[9px] text-gray-400">
                      ผู้สร้าง
                    </p>

                    <p className="text-xs font-semibold truncate">
                      {mockData.createdBy}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <p className="text-[9px] text-gray-400 mb-1.5">
                    ผู้เข้าร่วม
                  </p>

                  <div className="flex gap-1 flex-wrap">
                    {mockData.attendees.map((a) => (
                      <Badge key={a} className="text-[9px]">{a}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3 space-y-2 bg-white rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-[11px] font-semibold text-gray-900 mb-2 uppercase">
                  {t("tasks.actions")}
                </h3>

                {/* Dropdown เปลี่ยนสถานะ (ใช้งานแบบปลอดภัย รองรับทุกค่า) */}

                <div className="mb-1.5">
                  <Select
                    value={currentStatus}
                    onValueChange={(val) => {
                      if (onStatusChange) {
                        onStatusChange(task.id, val);
                      }
                    }}
                  >
                    <SelectTrigger className="w-full h-7 text-[10px] font-medium border-gray-200 rounded-md bg-white text-gray-700 focus:ring-1 focus:ring-gray-900 focus:ring-offset-0">
                      <SelectValue
                        placeholder={t(
                          "status.pending",

                          "Pending",
                        )}
                      />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem
                        value="todo"
                        className="text-xs"
                      >
                        TO-DO TASK
                      </SelectItem>

                      <SelectItem
                        value="in-progress"
                        className="text-xs"
                      >
                        IN PROGRESS
                      </SelectItem>

                      <SelectItem
                        value="completed"
                        className="text-xs"
                      >
                        COMPLETED
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start h-7 text-[10px] mb-1"
                >
                  <MapPin className="h-3 w-3 mr-1" />

                  {t("tasks.checkin")}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start h-7 text-[10px]"
                >
                  <Paperclip className="h-3 w-3 mr-1" />

                  {t("tasks.attach_file")}
                </Button>

                {/* -------------------- การแชร์งาน -------------------- */}

                <p className="text-[9px] font-semibold text-gray-400 uppercase mb-2 flex items-center gap-1.5 pt-2">
                  การแชร์งาน
                </p>

                <div className="mb-2">
                  <Select
                    value={sharingMode}
                    onValueChange={(
                      val: "private" | "public",
                    ) => setSharingMode(val)}
                  >
                    <SelectTrigger className="w-full h-7 text-[10px] font-medium border-gray-200 rounded-md bg-white text-gray-700 focus:ring-1 focus:ring-gray-900 focus:ring-offset-0">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem
                        value="private"
                        className="text-xs"
                      >
                        🔒 Private (แชร์เฉพาะในทีม)
                      </SelectItem>

                      <SelectItem
                        value="public"
                        className="text-xs"
                      >
                        🌐 Public (สาธารณะ)
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {sharingMode === "private" && (
                    <div className="relative mt-1.5">
                      <p className="text-[9px] font-semibold text-gray-500 mb-1">
                        แชร์ให้คนในทีม
                      </p>

                      <button
                        onClick={() =>
                          setIsTeamListOpen(!isTeamListOpen)
                        }
                        className="w-full flex items-center justify-between h-7 px-2 text-[10px] font-medium border border-gray-200 rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-900"
                      >
                        <span className="text-gray-500">
                          {selectedTeamMembers.length > 0
                            ? `เลือกแล้ว ${selectedTeamMembers.length} คน`
                            : "เลือกรายชื่อ..."}
                        </span>

                        <ChevronDown
                          className={`h-3 w-3 text-gray-500 transition-transform ${isTeamListOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      {isTeamListOpen && (
                        <div className="absolute left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
                          <div className="max-h-[140px] overflow-y-auto p-0.5 space-y-0.5">
                            {TEAM_MEMBERS.map((member) => (
                              <div
                                key={member.value}
                                className={`flex items-center justify-between p-1.5 rounded-sm cursor-pointer transition-all ${
                                  selectedTeamMembers.includes(
                                    member.value,
                                  )
                                    ? "bg-purple-50 text-purple-700"
                                    : "hover:bg-gray-100 text-gray-700"
                                }`}
                                onClick={() => {
                                  toggleTeamMember(
                                    member.value,
                                  );

                                  setIsTeamListOpen(false); // ปิดทันทีเมื่อกด
                                }}
                              >
                                <div className="flex items-center gap-1.5">
                                  <Avatar className="h-5 w-5">
                                    <AvatarFallback className="text-[8px] font-semibold bg-blue-100 text-blue-700">
                                      {member.label

                                        .split(" ")

                                        .map(
                                          (n: string) => n[0],
                                        )

                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>

                                  <span className="text-[10px] font-medium">
                                    {member.label}
                                  </span>
                                </div>

                                {selectedTeamMembers.includes(
                                  member.value,
                                ) && (
                                  <Check className="h-3 w-3 text-purple-600" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {sharingMode === "private" &&
                    selectedTeamMembers.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-gray-100">
                        <p className="text-[8px] font-semibold text-gray-400 uppercase mb-1">
                          ที่เลือก ({selectedTeamMembers.length}
                          )
                        </p>

                        <div className="flex flex-wrap gap-1">
                          {selectedTeamMembers.map(
                            (memberId) => {
                              const member = TEAM_MEMBERS.find(
                                (m) => m.value === memberId,
                              );

                              return (
                                <Badge
                                  key={memberId}
                                  className="bg-purple-100 text-purple-700 border-none font-semibold text-[8px] px-1.5 py-0.5 flex items-center gap-0.5"
                                >
                                  {member?.label}

                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();

                                      toggleTeamMember(
                                        memberId,
                                      );
                                    }}
                                    className="hover:bg-purple-200 rounded-full p-0.5"
                                  >
                                    <X className="h-2 w-2" />
                                  </button>
                                </Badge>
                              );
                            },
                          )}
                        </div>
                      </div>
                    )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
