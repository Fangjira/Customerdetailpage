import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Checkbox } from "./ui/checkbox";
import { Combobox } from "./ui/combobox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandEmpty,
  CommandInput,
} from "./ui/command";
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
  Edit,
  Edit2,
  Trash2,
  MessageSquare,
  Paperclip,
  MoreVertical,
  X,
  Check,
  ChevronDown,
  Search,
  Users,
  Map,
  Lock,
  Globe,
  Briefcase,
  Zap,
  Plus,
  UserPlus,
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useRoleTheme } from "../hooks/use-role-theme";
import { useRole } from "../contexts/role-context";
import {
  TITLE_TYPES,
  SERVICE_TOPICS,
  TIME_OPTIONS,
  CUSTOMERS,
  TEAM_MEMBERS,
} from "../constants/task-constants";

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
      setContactPersons([
        task.contactPerson || "คุณเดวิด ลี - Logistics Manager",
      ]);
      setSelectedTeamMembers(["sarah", "michael"]);
      setIsTeamListOpen(false); // Reset dropdown
    }
  }, [isOpen, task]);

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
      <div className="group relative flex items-start gap-3 w-full">
        {Icon && (
          <Icon className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
        )}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-0.5">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
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
            <div className="flex gap-1 mt-1">
              {type === "textarea" ? (
                <Textarea
                  className="text-xs min-h-[80px] bg-white border-blue-200"
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
                  className="h-7 text-xs bg-white border-blue-200"
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
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => handleSaveField(field)}
                  className="bg-emerald-500 text-white p-1 rounded hover:bg-emerald-600"
                >
                  <Check className="h-3 w-3" />
                </button>
              </div>
            </div>
          ) : (
            <div
              className="text-xs font-bold text-gray-800 leading-relaxed cursor-pointer flex items-center gap-2"
              onClick={() => setEditingField(field)}
            >
              {displayValue} {suffix}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen && !!task} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0 bg-[#F9FAFB] border-none shadow-2xl font-['IBM_Plex_Sans_Thai',_'Inter',_sans-serif]">
        {task ? (
          (() => {
            // 1. Dynamic Layout Logic
            const isSpecialActivity =
              task.titleType === "นัดหมายลูกค้า" ||
              task.titleType === "เข้าพบลูกค้า" ||
              task.isActivity === true;

            // จัดการรูปแบบสถานะให้ตรงกับ value ของ Select (แก้ปัญหาข้อความหาย)
            const getNormalizedStatus = (status: string) => {
              if (!status) return "todo";
              const s = status.toLowerCase().replace("_", "-");
              if (s === "pending") return "todo";
              return s;
            };
            const currentStatus = getNormalizedStatus(
              task.status,
            );
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
              siteBranch:
                task.siteBranch || "สำนักงานใหญ่ (HQ)",
              contactPerson:
                task.contactPerson ||
                "คุณเดวิด ลี - Logistics Manager",
              contactPhone: task.contactPhone || "02-345-6789",
              contactEmail:
                task.contactEmail ||
                "david.lee@pacific-dist.com",
              customers: task.customers?.length
                ? task.customers
                : ["Pacific Distribution Co."],
              title: task.title || "สำรวจสถานที่ (Site Survey)",
              titleType:
                task.titleType || "สำรวจสถานที่ (Site Survey)",
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
                  content:
                    "อัปเดตสถานะเป็น 'In Progress' เรียบร้อยครับ",
                },
              ],
              relatedTasks: [
                {
                  id: "TASK-1002",
                  title:
                    "จัดเตรียมเอกสารสัญญา (Draft Contract)",
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

            // Searchable Combobox for Title Type
            const TitleTypeCombobox = ({
              field,
              label,
            }: any) => {
              const isEditing = editingField === field;
              const currentValue =
                editForm[field] || mockData.titleType;

              return (
                <div className="group relative flex items-start gap-3 w-full">
                  <Briefcase className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-0.5">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
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
                      <div className="flex gap-1 mt-1">
                        <Combobox
                          options={TITLE_TYPES}
                          value={editForm[field]}
                          onValueChange={(val) =>
                            setEditForm({
                              ...editForm,
                              [field]: val,
                            })
                          }
                          placeholder="เลือกประเภทกิจกรรม..."
                          searchPlaceholder="ค้นหา..."
                        />
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() =>
                              handleSaveField(field)
                            }
                            className="bg-emerald-500 text-white p-1 rounded hover:bg-emerald-600"
                          >
                            <Check className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() =>
                              setEditingField(null)
                            }
                            className="bg-gray-100 text-gray-400 p-1 rounded hover:bg-gray-200"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="text-xs font-bold text-gray-800 leading-relaxed cursor-pointer"
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
            const CustomerCombobox = ({
              field,
              label,
            }: any) => {
              const isEditing = editingField === field;
              const currentValue =
                editForm[field] || mockData.customers[0];

              return (
                <div className="group relative flex items-start gap-3 w-full">
                  <Building2 className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-0.5">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
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
                      <div className="flex gap-1 mt-1">
                        <Combobox
                          options={CUSTOMERS}
                          value={editForm[field]}
                          onValueChange={(val) =>
                            setEditForm({
                              ...editForm,
                              [field]: val,
                            })
                          }
                          placeholder="เลือกลูกค้า/ลีด..."
                          searchPlaceholder="ค้นหา..."
                        />
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() =>
                              handleSaveField(field)
                            }
                            className="bg-emerald-500 text-white p-1 rounded hover:bg-emerald-600"
                          >
                            <Check className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() =>
                              setEditingField(null)
                            }
                            className="bg-gray-100 text-gray-400 p-1 rounded hover:bg-gray-200"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="text-xs font-bold text-gray-800 leading-relaxed cursor-pointer"
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
                <div className="group relative flex items-start gap-3 w-full">
                  <Clock className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-0.5">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
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
                      <div className="flex gap-1 mt-1">
                        <Select
                          value={
                            editForm[field] || currentValue
                          }
                          onValueChange={(val) =>
                            setEditForm({
                              ...editForm,
                              [field]: val,
                            })
                          }
                        >
                          <SelectTrigger className="h-7 text-xs bg-white border-blue-200">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="max-h-[200px]">
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
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() =>
                              handleSaveField(field)
                            }
                            className="bg-emerald-500 text-white p-1 rounded hover:bg-emerald-600"
                          >
                            <Check className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="text-xs font-bold text-gray-800 leading-relaxed cursor-pointer"
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
              <>
                <VisuallyHidden>
                  <DialogTitle>{task.title}</DialogTitle>
                </VisuallyHidden>

                {/* --- HEADER --- */}
                <div className="bg-white border-b border-gray-200 p-5 flex justify-between items-start">
                  <div className="space-y-1.5">
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                      {task.title}
                    </h2>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`rounded font-bold text-[10px] px-2 py-0.5 border ${
                          currentStatus === "completed"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                            : "bg-blue-50 text-blue-700 border-blue-100"
                        }`}
                      >
                        {displayStatusBadge}
                      </Badge>
                      <Badge className="bg-red-50 text-red-700 border-red-100 rounded font-bold text-[10px] px-2 py-0.5">
                        {task.priority?.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete?.(task.id)}
                      className="border-red-200 text-red-600 hover:bg-red-50 font-bold h-8 text-xs"
                    >
                      ลบ
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClose}
                      className="h-8 w-8 p-0 rounded-full border border-gray-100 bg-white"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
<ScrollArea className="flex-1">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-2xl py-2xl">
                    {/* --- LEFT SIDE: Dynamic Layouts --- */}
                    <div className="lg:col-span-8 flex flex-col gap-2xl px-2xl ">
                      <Tabs defaultValue="details">
                        <TabsList className="bg-bg-subtle rounded-corner-lg mb-2xl flex w-300px md:inline-flex md:w-auto py-xs">
                          <TabsTrigger
                            value="details"
                            className="flex-1 data-[state=active]:bg-surface-bg data-[state=active]:shadow-sm text-video-title font-semibold px-sm h-full text-text-tertiary data-[state=active]:text-text-primary transition-all"
                          >
                            รายละเอียด
                          </TabsTrigger>
                          <TabsTrigger
                            value="activity"
                            className="flex-1 text-video-title font-semibold px-lg h-full rounded-corner-md text-text-tertiary data-[state=active]:bg-surface-bg data-[state=active]:shadow-sm data-[state=active]:text-text-primary transition-all"
                          >
                            กิจกรรม
                          </TabsTrigger>
                          <TabsTrigger
                            value="related"
                            className="flex-1 text-video-title font-semibold px-lg h-full rounded-corner-md text-text-tertiary data-[state=active]:bg-surface-bg data-[state=active]:shadow-sm data-[state=active]:text-text-primary transition-all"
                          >
                            เกี่ยวข้อง
                          </TabsTrigger>
                        </TabsList>

                        {/* 1. แท็บรายละเอียด */}
                        <TabsContent
                          value="details"
                          className="mt-0 flex flex-col gap-2xl"
                        >
                          {!isSpecialActivity ? (
                            <>
                              <div className="bg-surface-bg rounded-corner-lg border border-border-primary p-2xl shadow-sm">
                                <Editable
                                  field="description"
                                  label="รายละเอียดงาน"
                                  type="textarea"
                                  icon={FileText}
                                  value={mockData.description}
                                />
                              </div>
                              <div className="bg-surface-bg rounded-corner-lg border border-border-primary p-2xl shadow-sm">
                                <h3 className="text-video-title font-semibold text-text-secondary mb-xl uppercase tracking-widest">
                                  ข้อมูลเพิ่มเติม
                                </h3>
                                <div className="flex flex-col gap-xl">
                                  <CustomerCombobox
                                    field="customers"
                                    label="ลูกค้า / ลีด"
                                  />
                                  <TitleTypeCombobox
                                    field="titleType"
                                    label="หัวข้อ TO-DO"
                                  />
                                </div>
                              </div>
                              <div className="bg-surface-bg rounded-corner-lg border border-border-primary p-2xl shadow-sm">
                                <h3 className="text-video-title font-semibold text-text-primary mb-xl uppercase">
                                  ข้อมูลติดต่อลูกค้า
                                </h3>
                                <div className="grid grid-cols-2 gap-y-2xl gap-x-xl">
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
                                    value={
                                      mockData.contactPerson
                                    }
                                  />
                                  <Editable
                                    field="contactPhone"
                                    label="โทรศัพท์"
                                    icon={Phone}
                                    value={
                                      mockData.contactPhone
                                    }
                                  />
                                  <Editable
                                    field="contactEmail"
                                    label="อีเมล"
                                    icon={Mail}
                                    value={
                                      mockData.contactEmail
                                    }
                                  />
                                </div>

                                {contactPersons.length > 1 && (
                                  <div className="mt-2xl flex flex-col gap-lg">
                                    {contactPersons
                                      .slice(1)
                                      .map((person, idx) => (
                                        <div
                                          key={idx}
                                          className="flex items-center gap-md p-lg bg-bg-faint rounded-corner-md border border-border-secondary"
                                        >
                                          <User className="h-4 w-4 text-text-secondary" />
                                          <Input
                                            placeholder="ชื่อผู้ติดต่อเพิ่มเติม"
                                            className="flex-1 h-8 text-video-title bg-surface-bg"
                                            value={person}
                                            onChange={(e) => {
                                              const newPersons =
                                                [
                                                  ...contactPersons,
                                                ];
                                              newPersons[
                                                idx + 1
                                              ] =
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
                                            className="text-danger hover:bg-danger/10 p-sm rounded-corner-sm"
                                          >
                                            <X className="h-4 w-4" />
                                          </button>
                                        </div>
                                      ))}
                                  </div>
                                )}
                              </div>
                            </>
                          ) : (
                            <div className="bg-surface-bg rounded-corner-lg border border-border-primary shadow-sm px-[10px] pt-[24px] pb-0">
                              {/* ⭐ ปรับตาม Image 1 (L:10 R:10 T:24 B:0) */}
                              {/* HEADER */}
                              <div className="flex items-center gap-lg mb-2xl">
                                <Briefcase className="h-5 w-5 text-brand-primary" />
                                <h3 className="text-label-sm font-semibold text-brand-dark uppercase tracking-wide">
                                  Activity Full Information
                                </h3>
                              </div>
                              {/* GRID */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2xl gap-x-2xl">
                                {/* ITEM */}
                                <div className="flex items-start gap-lg">
                                  <Briefcase className="h-5 w-5 text-text-secondary shrink-0 mt-1" />
                                  <div className="space-y-2">
                                    <p className="text-video-title font-semibold text-text-secondary uppercase tracking-widest">
                                      หัวข้อ TO-DO
                                    </p>
                                    <p className="text-video-title font-semibold text-text-primary">
                                      customer_visit
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-lg">
                                  <MapPin className="h-5 w-5 text-text-secondary shrink-0 mt-1" />
                                  <div className="space-y-2">
                                    <p className="text-video-title font-semibold text-text-secondary uppercase tracking-widest">
                                      สถานที่ / ห้องประชุม
                                    </p>
                                    <p className="font-semibold text-text-primary text-video-title leading-relaxed">
                                      {mockData.location ||
                                        "789 ถนนพระราม 4 แขวงสีลม เขตบางรัก กรุงเทพฯ 10330"}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-lg">
                                  <Briefcase className="h-5 w-5 text-text-secondary shrink-0 mt-1" />
                                  <div className="space-y-2">
                                    <p className="text-video-title font-semibold text-text-secondary uppercase tracking-widest">
                                      ลูกค้า / ลีด
                                    </p>
                                    <p className="text-video-title font-semibold text-text-primary">
                                      Pacific Distribution Co.
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-lg">
                                  <Map className="h-5 w-5 text-text-secondary shrink-0 mt-1" />
                                  <div className="space-y-2">
                                    <p className="text-video-title font-semibold text-text-secondary uppercase tracking-widest">
                                      สาขา / ไซด์งาน
                                    </p>
                                    <p className="text-video-title font-semibold text-text-primary">
                                      {mockData.siteBranch ||
                                        "สำนักงานใหญ่ (HQ)"}
                                    </p>
                                  </div>
                                </div>
                                {/* TIME */}
                                <div className="flex flex-col sm:flex-row items-start gap-2xl md:col-span-2 lg:col-span-1">
                                  <div className="flex items-start gap-lg">
                                    <Clock className="h-5 w-5 text-text-secondary shrink-0 mt-1" />
                                    <div className="space-y-2">
                                      <p className="text-video-title font-semibold text-text-secondary uppercase tracking-widest">
                                        Start Time
                                      </p>
                                      <p className="text-video-title font-semibold text-text-primary">
                                        10:00 AM
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-lg">
                                    <Clock className="h-5 w-5 text-text-secondary shrink-0 mt-1" />
                                    <div className="space-y-2">
                                      <p className="text-video-title font-semibold text-text-secondary uppercase tracking-widest">
                                        End Time
                                      </p>
                                      <p className="text-video-title font-semibold text-text-primary">
                                        12:00
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                {/* CONTACT */}
                                <div className="flex items-start gap-lg md:col-span-2 lg:col-span-1">
                                  <User className="h-5 w-5 text-text-secondary shrink-0 mt-1" />

                                  <div className="w-full space-y-lg">
                                    <div className="flex items-center gap-md">
                                      <p className="text-video-title font-semibold text-text-secondary uppercase tracking-widest">
                                        รายชื่อผู้ติดต่อฝั่งลูกค้า
                                      </p>
                                      <button className="text-success hover:bg-success/10 rounded-corner-full p-1.5">
                                        <Plus className="h-4 w-4" />
                                      </button>
                                    </div>
                                    <p className="text-video-title font-semibold text-text-primary">
                                      {mockData.contactPerson ||
                                        "คุณเดวิด ลี - Logistics Manager"}
                                    </p>
                                    {contactPersons.length >
                                      1 && (
                                      <div className="pt-xl mt-xl flex flex-col gap-lg border-t border-border-secondary/50">
                                        {contactPersons
                                          .slice(1)
                                          .map(
                                            (person, idx) => (
                                              <div
                                                key={idx}
                                                className="flex items-center gap-md px-lg py-md bg-bg-faint rounded-corner-md border border-border-secondary w-full max-w-sm"
                                              >
                                                <User className="h-4 w-4 text-text-secondary" />
                                                <Input
                                                  className="flex-1 h-9 text-video-title bg-surface-bg"
                                                  value={person}
                                                />
                                                <button className="text-danger p-sm hover:bg-danger/10 rounded-corner-sm">
                                                  <X className="h-4 w-4" />
                                                </button>
                                              </div>
                                            ),
                                          )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              {/* SERVICES */}
                              <div className="mt-3xl pt-2xl border-t border-border-secondary">
                                <div className="flex items-center gap-md mb-xl">
                                  <p className="text-video-title font-semibold text-text-secondary uppercase tracking-widest">
                                    หัวข้อบริการที่เกี่ยวข้อง
                                  </p>
                                  <button className="text-success p-1.5 hover:bg-success/10 rounded-corner-full">
                                    <Plus className="h-4 w-4" />
                                  </button>
                                </div>
                                <div className="flex flex-wrap gap-lg">
                                  {(mockData.SERVICE_TOPICS
                                    ?.length
                                    ? mockData.SERVICE_TOPICS
                                    : ["Freight", "Warehouse"]
                                  ).map((topic) => (
                                    <Badge
                                      key={topic}
                                      className="bg-bg-subtle text-text-primary text-video-title px-xl py-md rounded-corner-full"
                                    >
                                      {topic}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </TabsContent>

                        {/* 2. แท็บกิจกรรม */}
                        <TabsContent
                          value="activity"
                          className="bg-surface-bg rounded-corner-lg border border-border-primary p-2xl shadow-sm flex flex-col gap-2xl"
                        >
                          <div className="flex gap-xl border-b border-border-secondary pb-2xl">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-success/10 text-success text-video-title font-semibold">
                                YOU
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <Textarea
                                placeholder="เพิ่มความคิดเห็นใหม่ที่นี่..."
                                className="text-video-title min-h-[100px] bg-bg-faint border-border-primary resize-none mb-lg rounded-corner-lg focus:bg-surface-bg transition-colors"
                              />
                              <div className="flex gap-md">
                                <Button
                                  size="sm"
                                  className="bg-success hover:bg-success/90 h-10 rounded-corner-full font-semibold text-video-title shadow-sm px-xl"
                                >
                                  <MessageSquare className="h-4 w-4 mr-md" />{" "}
                                  เพิ่มความคิดเห็น
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-10 rounded-corner-full font-semibold text-video-title border-border-primary text-text-primary px-xl"
                                >
                                  <Paperclip className="h-4 w-4 mr-md" />{" "}
                                  แนบไฟล์
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-xl">
                            {mockData.activities.map((act) => (
                              <div
                                key={act.id}
                                className="flex gap-xl"
                              >
                                <Avatar className="h-10 w-10 border border-border-primary shadow-sm">
                                  <AvatarFallback className="text-video-title font-semibold bg-brand-secondary text-brand-dark">
                                    {act.avatar}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 bg-bg-faint/50 p-xl rounded-corner-lg border border-border-secondary">
                                  <div className="flex justify-between items-center mb-md">
                                    <span className="text-video-title font-semibold text-text-primary">
                                      {act.user}{" "}
                                      <span className="text-text-secondary font-medium ml-md">
                                        [{act.action}]
                                      </span>
                                    </span>
                                    <span className="text-video-title text-text-secondary font-medium">
                                      {act.time}
                                    </span>
                                  </div>
                                  <p className="text-video-title text-text-secondary leading-relaxed">
                                    {act.content}
                                  </p>
                                  {act.file && (
                                    <div className="mt-lg flex items-center gap-md text-video-title font-semibold text-brand-primary bg-surface-bg p-md px-lg rounded-corner-md border border-brand-secondary w-fit cursor-pointer shadow-sm hover:bg-brand-secondary/10 transition-colors">
                                      <Paperclip className="h-4 w-4" />{" "}
                                      {act.file}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>

                        {/* 3. แท็บเกี่ยวข้อง */}
                        <TabsContent value="related">
                          <div className="bg-surface-bg rounded-corner-lg border border-border-primary p-2xl shadow-sm flex flex-col gap-xl">
                            <h4 className="text-video-title font-semibold text-text-secondary uppercase tracking-widest mb-md italic">
                              งานที่ต้องทำต่อเนื่อง &
                              ดีลที่ผูกอยู่
                            </h4>
                            {mockData.relatedTasks.map(
                              (rel) => (
                                <div
                                  key={rel.id}
                                  className="flex items-center justify-between p-xl border border-border-secondary rounded-corner-lg bg-surface-bg shadow-sm hover:bg-bg-hover transition-all cursor-pointer"
                                >
                                  <div className="flex items-center gap-xl">
                                    <div
                                      className={`p-md rounded-corner-full ${
                                        rel.status ===
                                        "completed"
                                          ? "bg-success/10 text-success"
                                          : "bg-bg-faint text-text-tertiary"
                                      }`}
                                    >
                                      <CheckCircle2 className="h-6 w-6" />
                                    </div>
                                    <div>
                                      <p className="text-video-title font-semibold text-text-primary mb-1">
                                        {rel.title}
                                      </p>
                                      <p className="text-video-title text-text-secondary font-mono mt-0.5">
                                        {rel.id} •{" "}
                                        {rel.assignee}
                                      </p>
                                    </div>
                                  </div>
                                  <Badge
                                    className={`text-video-title font-semibold border-none px-md py-sm rounded-corner-full ${
                                      rel.status === "completed"
                                        ? "bg-success/20 text-success"
                                        : "bg-bg-subtle text-text-tertiary"
                                    }`}
                                  >
                                    {rel.status.toUpperCase()}
                                  </Badge>
                                </div>
                              ),
                            )}
                            <div className="p-xl bg-brand-secondary/40 rounded-corner-lg border border-dashed border-brand-primary/20 flex items-center gap-xl mt-2xl hover:bg-brand-secondary/60 transition-colors">
                              <Zap className="h-8 w-8 text-brand-primary opacity-70" />
                              <div>
                                <p className="text-video-title font-semibold text-brand-primary uppercase mb-1">
                                  Linked Deal (ดีลต้นทาง)
                                </p>
                                <p className="text-label-sm font-semibold text-text-primary underline decoration-brand-primary/20 cursor-pointer hover:text-brand-primary">
                                  #DEAL-2026-091 -
                                  โครงการติดตั้งโซลาร์เซลล์
                                  Pacific HQ
                                </p>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>

                    {/* --- RIGHT SIDEBAR --- */}
                    <div className="lg:col-span-4 flex flex-col gap-2xl ">
                      {/* SUMMARY CARD */}
                      <Card className="border border-border-primary shadow-sm rounded-corner-lg ">
                        {/* ⭐ ปรับตาม Image 3 (L:10 R:0 T:23 B:0) */}
                        <div className="pl-[10px] pr-0 pt-[23px] pb-0">
                          <h3 className="text-label-sm font-semibold text-text-primary mb-xl border-b border-border-secondary pb-md">
                            ข้อมูลสรุป
                          </h3>

                          <div className="flex flex-col gap-xl">
                            <div className="flex items-start gap-lg">
                              <Calendar className="h-5 w-5 text-text-secondary shrink-0 mt-0.5" />
                              <div>
                                <p className="text-video-title font-semibold text-text-secondary uppercase tracking-widest mb-1">
                                  วันที่กำหนด
                                </p>
                                <p className="text-video-title font-semibold text-text-primary">
                                  {task.dueDate
                                    ? new Date(
                                        task.dueDate,
                                      ).toLocaleDateString(
                                        "th-TH",
                                      )
                                    : "2026-04-21"}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-lg">
                              <Clock className="h-5 w-5 text-text-secondary shrink-0 mt-0.5" />
                              <div>
                                <p className="text-video-title font-semibold text-text-secondary uppercase tracking-widest mb-1">
                                  เวลา
                                </p>
                                <p className="text-video-title font-semibold text-text-primary">
                                  {task.dueTime || "10:00 AM"}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-lg">
                              <User className="h-5 w-5 text-text-secondary shrink-0 mt-0.5" />
                              <div>
                                <p className="text-video-title font-semibold text-text-secondary uppercase tracking-widest mb-1">
                                  ผู้รับผิดชอบ
                                </p>
                                <p className="font-semibold text-text-primary text-video-title">
                                  คุณ (You)
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-lg">
                              <Plus className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" />
                              <div>
                                <p className="text-video-title font-semibold text-text-secondary uppercase tracking-widest mb-1">
                                  ผู้สร้าง
                                </p>
                                <p className="text-video-title font-semibold text-text-primary">
                                  {mockData.createdBy ||
                                    "คุณ (You)"}
                                </p>
                              </div>
                            </div>

                            {isSpecialActivity && (
                              <div className="flex items-start gap-lg pt-md mt-md border-t border-border-secondary/50">
                                <Users className="h-5 w-5 text-text-secondary shrink-0 mt-0.5" />
                                <div className="w-full">
                                  <p className="text-video-title font-semibold text-text-secondary uppercase tracking-widest mb-md">
                                    ผู้ที่ต้องเข้าร่วม
                                  </p>
                                  <div className="flex flex-wrap gap-sm">
                                    {mockData.attendees.map(
                                      (n) => (
                                        <Badge
                                          key={n}
                                          className="bg-brand-secondary text-brand-dark border-none font-semibold text-video-title px-md py-1 rounded-corner-full"
                                        >
                                          {n}
                                        </Badge>
                                      ),
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>

                      {/* ACTION CARD */}
                      <Card className="border border-border-primary shadow-sm rounded-corner-lg">
                        {/* ⭐ ปรับตาม Image 2 (L:10 R:0 T:24 B:0) */}
                        <div className="pl-[10px] pr-0 pt-[24px] pb-0 flex flex-col gap-xl mx-[5px] my-[0px]">
                          <h3 className="text-label-sm font-semibold text-text-primary mb-md">
                            การดำเนินการ
                          </h3>

                          <Select
                            value={currentStatus || "TASK"}
                            onValueChange={(val) => {
                              if (onStatusChange)
                                onStatusChange(task.id, val);
                            }}
                          >
                            <SelectTrigger className="w-full h-11 text-video-title font-semibold border-border-primary rounded-corner-md bg-surface-bg text-text-primary shadow-sm">
                              <SelectValue placeholder="TASK" />
                            </SelectTrigger>

                            <SelectContent
                              position="popper"
                              sideOffset={4}
                            >
                              <SelectItem value="todo">
                                TO-DO TASK
                              </SelectItem>
                              <SelectItem value="in-progress">
                                IN PROGRESS
                              </SelectItem>
                              <SelectItem value="completed">
                                COMPLETED
                              </SelectItem>
                            </SelectContent>
                          </Select>

                          <Button className="w-full justify-start h-11 text-video-title font-semibold border-border-primary rounded-corner-md">
                            <MapPin className="h-4 w-4 mr-md text-text-tertiary" />
                            Check-in
                          </Button>

                          <Button className="w-full justify-start h-11 text-video-title font-semibold border-border-primary rounded-corner-md">
                            <Paperclip className="h-4 w-4 mr-md text-text-tertiary" />
                            แนบไฟล์
                          </Button>

                          {/* SHARE */}
                          <div className="pt-xl mt-md border-t border-border-secondary/50">
                            <p className="text-video-title font-semibold text-text-secondary uppercase tracking-widest mb-md">
                              การแชร์งาน
                            </p>

                            <Select
                              value={sharingMode}
                              onValueChange={(val: any) =>
                                setSharingMode(val)
                              }
                            >
                              <SelectTrigger className="w-full h-11 text-video-title font-semibold border-border-primary rounded-corner-md bg-surface-bg text-text-primary shadow-sm">
                                <SelectValue placeholder="rivate" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem
                                  value="private"
                                  className="text-video-title font-semibold"
                                >
                                  Private
                                </SelectItem>
                                <SelectItem
                                  value="public"
                                  className="text-video-title font-semibold"
                                >
                                  Public
                                </SelectItem>
                                <SelectItem
                                  value="public by Org."
                                  className="text-video-title font-semibold"
                                >
                                  public by Org.
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </ScrollArea>
              </>
            );
          })()
        ) : (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">กำลังโหลด...</div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}