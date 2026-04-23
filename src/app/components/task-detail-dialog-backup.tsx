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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Combobox } from "./ui/combobox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Command, CommandGroup, CommandItem, CommandList, CommandEmpty, CommandInput } from "./ui/command";
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
import { TITLE_TYPES, SERVICE_TOPICS, TIME_OPTIONS, CUSTOMERS, TEAM_MEMBERS } from "../constants/task-constants";

export function TaskDetailDialog({ isOpen, onClose, task, onEdit, onDelete, onStatusChange }: any) {
  const { t } = useTranslation();
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [sharingMode, setSharingMode] = useState<"private" | "public">("private");
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<string[]>([]);
  const [contactPersons, setContactPersons] = useState<string[]>([]);
  
  // State สำหรับจัดการการเปิด/ปิด Dropdown รายชื่อทีม
  const [isTeamListOpen, setIsTeamListOpen] = useState(false);

  useEffect(() => {
    if (isOpen && task) {
      setEditForm({ ...task });
      setEditingField(null);
      setContactPersons([task.contactPerson || "คุณเดวิด ลี - Logistics Manager"]);
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
    setContactPersons(contactPersons.filter((_, i) => i !== index));
    toast.success("ลบผู้ติดต่อแล้ว");
  };

  const toggleTeamMember = (memberId: string) => {
    if (selectedTeamMembers.includes(memberId)) {
      setSelectedTeamMembers(selectedTeamMembers.filter(id => id !== memberId));
    } else {
      setSelectedTeamMembers([...selectedTeamMembers, memberId]);
    }
  };

  // --- Inline Editable Component ---
  const Editable = ({ field, label, type = "text", icon: Icon, value, suffix }: any) => {
    const isEditing = editingField === field;
    const displayValue = editForm[field] || value || "-";

    return (
      <div className="group relative flex items-start gap-3 w-full">
        {Icon && <Icon className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-0.5">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
            {!isEditing && (
              <button onClick={() => setEditingField(field)} className="opacity-0 group-hover:opacity-100 text-blue-500 transition-opacity">
                <Edit2 className="h-3 w-3" />
              </button>
            )}
          </div>
          {isEditing ? (
            <div className="flex gap-1 mt-1">
              {type === "textarea" ? (
                <Textarea className="text-xs min-h-[80px] bg-white border-blue-200" value={editForm[field]} onChange={(e) => setEditForm({...editForm, [field]: e.target.value})} autoFocus />
              ) : (
                <Input className="h-7 text-xs bg-white border-blue-200" value={editForm[field]} onChange={(e) => setEditForm({...editForm, [field]: e.target.value})} autoFocus />
              )}
              <div className="flex flex-col gap-1">
                <button onClick={() => handleSaveField(field)} className="bg-emerald-500 text-white p-1 rounded hover:bg-emerald-600"><Check className="h-3 w-3" /></button>
                <button onClick={() => setEditingField(null)} className="bg-gray-100 text-gray-400 p-1 rounded hover:bg-gray-200"><X className="h-3 w-3" /></button>
              </div>
            </div>
          ) : (
            <div className="text-xs font-bold text-gray-800 leading-relaxed cursor-pointer flex items-center gap-2" onClick={() => setEditingField(field)}>
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
        {task ? (() => {
              // 1. Dynamic Layout Logic
              const isSpecialActivity = task.titleType === "นัดหมายลูกค้า" ||
                                        task.titleType === "เข้าพบลูกค้า" ||
                                        task.isActivity === true;

              // จัดการรูปแบบสถานะให้ตรงกับ value ของ Select (แก้ปัญหาข้อความหาย)
              const getNormalizedStatus = (status: string) => {
                if (!status) return "todo";
                const s = status.toLowerCase().replace("_", "-");
                if (s === "pending") return "todo";
                return s;
              };
              const currentStatus = getNormalizedStatus(task.status);
              const displayStatusBadge = task.status ? task.status.toUpperCase().replace(/[-_]/g, ' ') : 'TODO';

              // 2. Master Mockup Data
              const mockData = {
                description: task.description || "จัดเตรียมเอกสาร Presentation และตรวจสอบสต็อกสินค้าคงเหลือในระบบ SAP ให้เรียบร้อยก่อนเข้าพบลูกค้า",
                location: task.location || "789 ถนนพระราม 4 แขวงสีลม เขตบางรัก กรุงเทพฯ 10330",
                siteBranch: task.siteBranch || "สำนักงานใหญ่ (HQ)",
                contactPerson: task.contactPerson || "คุณเดวิด ลี - Logistics Manager",
                contactPhone: task.contactPhone || "02-345-6789",
                contactEmail: task.contactEmail || "david.lee@pacific-dist.com",
                customers: task.customers?.length ? task.customers : ["Pacific Distribution Co."],
                title: task.title || "สำรวจสถานที่ (Site Survey)",
                titleType: task.titleType || "สำรวจสถานที่ (Site Survey)",
                SERVICE_TOPICS: ["Freight", "Warehouse"],
                startTime: task.dueTime || "10:00",
                endTime: task.endTime || "12:00",
                attendees: ["Sarah Chen", "Michael Wong", "คุณอุ้ย (Manager)"],
                sharedWith: ["Sales Team A", "Marketing Support"],
                createdBy: task.createdBy?.name || "คุณ (You)",
                activities: [
                  { id: "1", user: "Sarah Chen", avatar: "SC", action: "เพิ่มความคิดเห็นใหม่", time: "2 ชม. ที่แล้ว", content: "ส่งใบเสนอราคาให้ลูกค้าพิจารณาแล้วค่ะ รอการตอบกลับ", file: "Quotation_v2.pdf" },
                  { id: "2", user: "Michael Wong", avatar: "MW", action: "อัปเดตสถานะ", time: "เมื่อวานนี้ 14:20", content: "อัปเดตสถานะเป็น 'In Progress' เรียบร้อยครับ" }
                ],
                relatedTasks: [
                  { id: "TASK-1002", title: "จัดเตรียมเอกสารสัญญา (Draft Contract)", status: "completed", assignee: "Sarah Chen" },
                  { id: "TASK-1005", title: "ส่งตัวอย่างสินค้า (Sample Shipping)", status: "todo", assignee: "คุณ (You)" }
                ]
              };

              // Searchable Combobox for Title Type
              const TitleTypeCombobox = ({ field, label }: any) => {
                const isEditing = editingField === field;
                const currentValue = editForm[field] || mockData.titleType;

                return (
                  <div className="group relative flex items-start gap-3 w-full">
                    <Briefcase className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-0.5">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
                        {!isEditing && (
                          <button onClick={() => setEditingField(field)} className="opacity-0 group-hover:opacity-100 text-blue-500 transition-opacity">
                            <Edit2 className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                      {isEditing ? (
                        <div className="flex gap-1 mt-1">
                          <Combobox
                            options={TITLE_TYPES}
                            value={editForm[field]}
                            onValueChange={(val) => setEditForm({...editForm, [field]: val})}
                            placeholder="เลือกประเภทกิจกรรม..."
                            searchPlaceholder="ค้นหา..."
                          />
                          <div className="flex flex-col gap-1">
                            <button onClick={() => handleSaveField(field)} className="bg-emerald-500 text-white p-1 rounded hover:bg-emerald-600"><Check className="h-3 w-3" /></button>
                            <button onClick={() => setEditingField(null)} className="bg-gray-100 text-gray-400 p-1 rounded hover:bg-gray-200"><X className="h-3 w-3" /></button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-xs font-bold text-gray-800 leading-relaxed cursor-pointer" onClick={() => setEditingField(field)}>
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
                const currentValue = editForm[field] || mockData.customers[0];

                return (
                  <div className="group relative flex items-start gap-3 w-full">
                    <Building2 className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-0.5">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
                        {!isEditing && (
                          <button onClick={() => setEditingField(field)} className="opacity-0 group-hover:opacity-100 text-blue-500 transition-opacity">
                            <Edit2 className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                      {isEditing ? (
                        <div className="flex gap-1 mt-1">
                          <Combobox
                            options={CUSTOMERS}
                            value={editForm[field]}
                            onValueChange={(val) => setEditForm({...editForm, [field]: val})}
                            placeholder="เลือกลูกค้า/ลีด..."
                            searchPlaceholder="ค้นหา..."
                          />
                          <div className="flex flex-col gap-1">
                            <button onClick={() => handleSaveField(field)} className="bg-emerald-500 text-white p-1 rounded hover:bg-emerald-600"><Check className="h-3 w-3" /></button>
                            <button onClick={() => setEditingField(null)} className="bg-gray-100 text-gray-400 p-1 rounded hover:bg-gray-200"><X className="h-3 w-3" /></button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-xs font-bold text-gray-800 leading-relaxed cursor-pointer" onClick={() => setEditingField(field)}>
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
                const currentValue = editForm[field] || (field === "startTime" ? mockData.startTime : mockData.endTime);

                return (
                  <div className="group relative flex items-start gap-3 w-full">
                    <Clock className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-0.5">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
                        {!isEditing && (
                          <button onClick={() => setEditingField(field)} className="opacity-0 group-hover:opacity-100 text-blue-500 transition-opacity">
                            <Edit2 className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                      {isEditing ? (
                        <div className="flex gap-1 mt-1">
                          <Select value={editForm[field] || currentValue} onValueChange={(val) => setEditForm({...editForm, [field]: val})}>
                            <SelectTrigger className="h-7 text-xs bg-white border-blue-200">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="max-h-[200px]">
                              {TIME_OPTIONS.map((time) => (
                                <SelectItem key={time} value={time} className="text-xs">
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <div className="flex flex-col gap-1">
                            <button onClick={() => handleSaveField(field)} className="bg-emerald-500 text-white p-1 rounded hover:bg-emerald-600"><Check className="h-3 w-3" /></button>
                            <button onClick={() => setEditingField(null)} className="bg-gray-100 text-gray-400 p-1 rounded hover:bg-gray-200"><X className="h-3 w-3" /></button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-xs font-bold text-gray-800 leading-relaxed cursor-pointer" onClick={() => setEditingField(field)}>
                          {currentValue}
                        </div>
                      )}
                    </div>
                  </div>
                );
              };

              return (
                <>
            <VisuallyHidden><DialogTitle>{task.title}</DialogTitle></VisuallyHidden>

            {/* --- HEADER --- */}
            <div className="bg-white border-b border-gray-200 p-5 flex justify-between items-start">
              <div className="space-y-1.5">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">{task.title}</h2>
            <div className="flex items-center gap-2">
              <Badge className={`rounded font-bold text-[10px] px-2 py-0.5 border ${
                currentStatus === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-blue-50 text-blue-700 border-blue-100'
              }`}>{displayStatusBadge}</Badge>
              <Badge className="bg-red-50 text-red-700 border-red-100 rounded font-bold text-[10px] px-2 py-0.5">{task.priority?.toUpperCase()}</Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onDelete?.(task.id)} className="border-red-200 text-red-600 hover:bg-red-50 font-bold h-8 text-xs">ลบ</Button>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0 rounded-full border border-gray-100 bg-white"><X className="h-4 w-4" /></Button>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* --- LEFT SIDE: Dynamic Layouts --- */}
            <div className="lg:col-span-8 space-y-5">
              <Tabs defaultValue="details">
                <TabsList className="bg-gray-200/60 p-1 h-10 rounded-lg mb-5 w-full md:w-auto">
                  <TabsTrigger value="details" className="data-[state=active]:bg-white text-xs font-bold px-10">รายละเอียด</TabsTrigger>
                  <TabsTrigger value="activity" className="text-xs font-bold px-10">กิจกรรม</TabsTrigger>
                  <TabsTrigger value="related" className="text-xs font-bold px-10">เกี่ยวข้อง</TabsTrigger>
                </TabsList>

                {/* 1. แท็บรายละเอียด */}
                <TabsContent value="details" className="mt-0 space-y-5">
                  {!isSpecialActivity ? (
                    <>
                      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                        <Editable field="description" label="รายละเอียดงาน" type="textarea" icon={FileText} value={mockData.description} />
                      </div>
                      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                        <h3 className="text-xs font-bold text-gray-400 mb-5 uppercase tracking-widest">ข้อมูลเพิ่มเติม</h3>
                        <div className="space-y-5">
                          <CustomerCombobox field="customers" label="ลูกค้า / ลีด" />
                          <TitleTypeCombobox field="titleType" label="หัวข้อ TO-DO" />
                        </div>
                      </div>
                      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                        <h3 className="text-xs font-bold text-gray-900 mb-5 uppercase">ข้อมูลติดต่อลูกค้า</h3>
                        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                          <Editable field="location" label="สถานที่" icon={MapPin} value={mockData.location} />
                          <Editable field="contactPerson" label="ผู้ติดต่อ" icon={User} value={mockData.contactPerson} />
                          <Editable field="contactPhone" label="โทรศัพท์" icon={Phone} value={mockData.contactPhone} />
                          <Editable field="contactEmail" label="อีเมล" icon={Mail} value={mockData.contactEmail} />
                        </div>

                        {contactPersons.length > 1 && (
                          <div className="mt-4 space-y-3">
                            {contactPersons.slice(1).map((person, idx) => (
                              <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                <User className="h-4 w-4 text-gray-400" />
                                <Input
                                  placeholder="ชื่อผู้ติดต่อเพิ่มเติม"
                                  className="flex-1 h-7 text-xs"
                                  value={person}
                                  onChange={(e) => {
                                    const newPersons = [...contactPersons];
                                    newPersons[idx + 1] = e.target.value;
                                    setContactPersons(newPersons);
                                  }}
                                />
                                <button
                                  onClick={() => removeContactPerson(idx + 1)}
                                  className="text-red-500 hover:bg-red-50 p-1 rounded"
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
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                      <div className="p-4 bg-blue-50/20 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="text-sm font-bold text-blue-900 flex items-center gap-2 uppercase"><Briefcase className="h-4 w-4" /> Activity Full Information</h3>
                      </div>
                      <div className="p-6 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-6">
                            <TitleTypeCombobox field="titleType" label="หัวข้อ TO-DO" />
                            <CustomerCombobox field="customers" label="ลูกค้า / ลีด" />
                            <div className="flex gap-4">
                              <TimeSelector field="startTime" label="START TIME" />
                              <TimeSelector field="endTime" label="END TIME" />
                            </div>
                          </div>
                          <div className="space-y-6">
                            <Editable field="location" label="สถานที่ / ห้องประชุม" icon={MapPin} value={mockData.location} />
                            <Editable field="siteBranch" label="สาขา / ไซด์งาน" icon={Map} value={mockData.siteBranch} />
                            <Editable field="contactPerson" label="รายชื่อผู้ติดต่อฝั่งลูกค้า" icon={User} value={mockData.contactPerson} />
                          </div>
                        </div>

                        <div className="pt-4 border-t border-gray-50">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={addContactPerson}
                            className="text-xs font-bold border-blue-200 text-blue-600 hover:bg-blue-50"
                          >
                            <UserPlus className="h-3.5 w-3.5 mr-2" />
                            เพิ่มผู้ติดต่อฝั่งลูกค้า
                          </Button>

                          {contactPersons.length > 1 && (
                            <div className="mt-4 space-y-2">
                              {contactPersons.slice(1).map((person, idx) => (
                                <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-100">
                                  <User className="h-3.5 w-3.5 text-gray-400" />
                                  <Input
                                    placeholder="ชื่อผู้ติดต่อเพิ่มเติม"
                                    className="flex-1 h-7 text-xs"
                                    value={person}
                                    onChange={(e) => {
                                      const newPersons = [...contactPersons];
                                      newPersons[idx + 1] = e.target.value;
                                      setContactPersons(newPersons);
                                    }}
                                  />
                                  <button
                                    onClick={() => removeContactPerson(idx + 1)}
                                    className="text-red-500 hover:bg-red-50 p-1 rounded"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="pt-6 border-t border-gray-50">
                          <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">หัวข้อบริการที่เกี่ยวข้อง</p>
                          <div className="flex flex-wrap gap-2">
                            {mockData.SERVICE_TOPICS.map(topic => (
                              <Badge key={topic} className="bg-gray-100 text-gray-700 border-none font-bold text-[10px]">{topic}</Badge>
                            ))}
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-6 px-2 text-[10px] border-dashed border-blue-300 text-blue-600 hover:bg-blue-50"
                            >
                              <Plus className="h-3 w-3 mr-1" /> เพิ่มหัวข้อบริการ
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                {/* 2. แท็บกิจกรรม */}
                <TabsContent value="activity" className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-6">
                  <div className="flex gap-4 border-b border-gray-50 pb-5">
                    <Avatar className="h-9 w-9"><AvatarFallback className="bg-emerald-50 text-emerald-600 text-xs font-bold">YOU</AvatarFallback></Avatar>
                    <div className="flex-1">
                      <Textarea placeholder="เพิ่มความคิดเห็นใหม่ที่นี่..." className="text-xs min-h-[70px] bg-gray-50 border-gray-100 resize-none mb-3" />
                      <div className="flex gap-2">
                         <Button size="sm" className="bg-emerald-600 h-8 font-bold text-xs"><MessageSquare className="h-3.5 w-3.5 mr-2" /> เพิ่มความคิดเห็น</Button>
                         <Button variant="outline" size="sm" className="h-8 font-bold text-xs border-gray-200"><Paperclip className="h-3.5 w-3.5 mr-2" /> แนบไฟล์</Button>
                      </div>
                    </div>
                  </div>
                  {mockData.activities.map(act => (
                    <div key={act.id} className="flex gap-4">
                      <Avatar className="h-8 w-8 border"><AvatarFallback className="text-[10px] font-bold bg-blue-50 text-blue-600">{act.avatar}</AvatarFallback></Avatar>
                      <div className="flex-1 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                        <div className="flex justify-between mb-1.5"><span className="text-[11px] font-bold text-gray-900">{act.user} <span className="text-gray-400 font-normal ml-2">[{act.action}]</span></span><span className="text-[10px] text-gray-400">{act.time}</span></div>
                        <p className="text-xs text-gray-600 leading-relaxed">{act.content}</p>
                        {act.file && <div className="mt-3 flex items-center gap-2 text-[10px] font-bold text-blue-600 bg-white p-2 rounded-lg border border-blue-50 w-fit cursor-pointer"><Paperclip className="h-3 w-3" /> {act.file}</div>}
                      </div>
                    </div>
                  ))}
                </TabsContent>

                {/* 3. แท็บเกี่ยวข้อง */}
                <TabsContent value="related">
                  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
                    <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 italic">งานที่ต้องทำต่อเนื่อง & ดีลที่ผูกอยู่</h4>
                    {mockData.relatedTasks.map(rel => (
                      <div key={rel.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-white shadow-sm hover:bg-gray-50 transition-all cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-full ${rel.status === 'completed' ? 'bg-emerald-50 text-emerald-500' : 'bg-gray-50 text-gray-300'}`}><CheckCircle2 className="h-4.5 w-4.5" /></div>
                          <div><p className="text-xs font-bold text-gray-800">{rel.title}</p><p className="text-[10px] text-gray-400 font-mono mt-0.5">{rel.id} • {rel.assignee}</p></div>
                        </div>
                        <Badge className={`text-[9px] font-bold border-none ${rel.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>{rel.status.toUpperCase()}</Badge>
                      </div>
                    ))}
                    <div className="p-4 bg-blue-50/30 rounded-xl border border-dashed border-blue-200 flex items-center gap-4 mt-4">
                       <Zap className="h-8 w-8 text-blue-400 opacity-50" />
                       <div><p className="text-[10px] font-bold text-blue-600 uppercase">Linked Deal (ดีลต้นทาง)</p><p className="text-sm font-bold text-gray-800 underline cursor-pointer">#DEAL-2026-091 - โครงการติดตั้งโซลาร์เซลล์ Pacific HQ</p></div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* --- RIGHT SIDEBAR --- */}
            <div className="lg:col-span-4 space-y-4">
              <Card className="border-gray-200 shadow-sm rounded-2xl bg-white overflow-hidden p-5 space-y-6">
                <h4 className="text-[11px] font-bold text-gray-900 border-b border-gray-50 pb-2 uppercase tracking-widest">ข้อมูลสรุป</h4>
                <div className="space-y-5">
                  <Editable field="dueDate" label="วันที่กำหนด" icon={Calendar} value={new Date(task.dueDate).toLocaleDateString("th-TH")} />
                  <Editable field="dueTime" label="เวลา" icon={Clock} value={task.dueTime} />
                  <Editable field="assignee" label="ผู้รับผิดชอบ" icon={User} value={task.assignee || "คุณ (You)"} />
                  <div className="flex items-center gap-4"><Plus className="h-5 w-5 text-blue-400" /><div><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ผู้สร้าง</p><p className="text-xs font-bold text-gray-800">{mockData.createdBy}</p></div></div>

                  {isSpecialActivity && (
                    <div className="pt-3 border-t border-gray-50">
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 flex items-center gap-2"><Users className="h-3 w-3" /> ผู้ที่ต้องเข้าร่วม</p>
                      <div className="flex flex-wrap gap-1.5">{mockData.attendees.map(n => <Badge key={n} className="bg-blue-50 text-blue-700 border-none font-bold text-[9px] px-2 py-0.5">{n}</Badge>)}</div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Actions Card */}
              <Card className="border border-gray-200 shadow-sm">
                <CardContent className="p-3 space-y-1.5">
                  <h3 className="text-xs font-semibold text-gray-900 border-b border-gray-200 pb-1.5 mb-2">
                    {t("tasks.actions")}
                  </h3>
              
                  {/* Dropdown เปลี่ยนสถานะ (ใช้งานแบบปลอดภัย รองรับทุกค่า) */}
                  <div className="mb-2">
                    <Select
                      value={currentStatus}
                      onValueChange={(val) => {
                        if (onStatusChange) {
                          onStatusChange(task.id, val);
                        }
                      }}
                    >
                      <SelectTrigger className="w-full h-8 text-xs font-medium border-gray-200 rounded-md bg-white text-gray-700 focus:ring-1 focus:ring-gray-900 focus:ring-offset-0">
                        <SelectValue placeholder={t("status.pending", "Pending")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todo" className="text-xs">TO-DO TASK</SelectItem>
                        <SelectItem value="in-progress" className="text-xs">IN PROGRESS</SelectItem>
                        <SelectItem value="completed" className="text-xs">COMPLETED</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
              
                  <Button variant="outline" size="sm" className="w-full justify-start h-8 text-xs mb-1">
                    <MapPin className="h-3.5 w-3.5 mr-1.5" />
                    {t("tasks.checkin")}
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start h-8 text-xs">
                    <Paperclip className="h-3.5 w-3.5 mr-1.5" />
                    {t("tasks.attach_file")}
                  </Button>

                  {/* -------------------- การแชร์งาน -------------------- */}
                  <div className="pt-3 mt-4 border-t border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                      การแชร์งาน
                    </p>

                    <div className="mb-4">
                      <Select
                        value={sharingMode}
                        onValueChange={(val: "private" | "public") => setSharingMode(val)}
                      >
                        <SelectTrigger className="w-full h-8 text-xs font-medium border-gray-200 rounded-md bg-white text-gray-700 focus:ring-1 focus:ring-gray-900 focus:ring-offset-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="private" className="text-xs">🔒 Private (แชร์เฉพาะในทีม)</SelectItem>
                          <SelectItem value="public" className="text-xs">🌐 Public (สาธารณะ)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {sharingMode === "private" && (
                      <div className="relative mt-2">
                        <p className="text-[10px] font-bold text-gray-500 mb-2">แชร์ให้คนในทีม</p>
                        
                        <button
                          onClick={() => setIsTeamListOpen(!isTeamListOpen)}
                          className="w-full flex items-center justify-between h-8 px-3 text-xs font-medium border border-gray-200 rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-900"
                        >
                          <span className="text-gray-500">
                            {selectedTeamMembers.length > 0 
                              ? `เลือกแล้ว ${selectedTeamMembers.length} คน` 
                              : "เลือกรายชื่อ..."}
                          </span>
                          <ChevronDown className={`h-3.5 w-3.5 text-gray-500 transition-transform ${isTeamListOpen ? "rotate-180" : ""}`} />
                        </button>

                        {isTeamListOpen && (
                          <div className="absolute left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
                            <div className="max-h-[160px] overflow-y-auto p-1 space-y-0.5">
                              {TEAM_MEMBERS.map((member) => (
                                <div
                                  key={member.value}
                                  className={`flex items-center justify-between p-2 rounded-sm cursor-pointer transition-all ${
                                    selectedTeamMembers.includes(member.value)
                                      ? "bg-purple-50 text-purple-700"
                                      : "hover:bg-gray-100 text-gray-700"
                                  }`}
                                  onClick={() => {
                                    toggleTeamMember(member.value);
                                    setIsTeamListOpen(false); // ปิดทันทีเมื่อกด
                                  }}
                                >
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-5 w-5">
                                      <AvatarFallback className="text-[9px] font-bold bg-blue-100 text-blue-700">
                                        {member.label.split(' ').map((n: string) => n[0]).join('')}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs font-medium">{member.label}</span>
                                  </div>
                                  {selectedTeamMembers.includes(member.value) && (
                                    <Check className="h-3.5 w-3.5 text-purple-600" />
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {sharingMode === "private" && selectedTeamMembers.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <p className="text-[9px] font-bold text-gray-400 uppercase mb-2">ที่เลือก ({selectedTeamMembers.length})</p>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedTeamMembers.map((memberId) => {
                            const member = TEAM_MEMBERS.find(m => m.value === memberId);
                            return (
                              <Badge
                                key={memberId}
                                className="bg-purple-100 text-purple-700 border-none font-bold text-[9px] px-2 py-0.5 flex items-center gap-1"
                              >
                                {member?.label}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleTeamMember(memberId);
                                  }}
                                  className="hover:bg-purple-200 rounded-full p-0.5"
                                >
                                  <X className="h-2.5 w-2.5" />
                                </button>
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </ScrollArea>
                </>
              );
            })() : (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">กำลังโหลด...</div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}