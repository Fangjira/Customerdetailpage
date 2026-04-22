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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
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
  Lock,
  Globe,
  Briefcase,
  Zap,
  Plus,
  Users,
  MessageSquare,
  Send,
  Map,
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export function TaskDetailDialog({ isOpen, onClose, task, onEdit, onDelete, onStatusChange }: any) {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});

  useEffect(() => {
    if (isOpen && task) {
      setEditForm({ ...task });
      setEditingField(null);
    }
  }, [isOpen, task]);

  if (!task) return null;

  // 1. Dynamic Layout Logic
  const isSpecialActivity = task.activityType === "meeting" || 
                            task.activityType === "customer_visit" || 
                            task.isActivity === true;

  // 2. Master Mockup Data (ห้ามเว้นว่าง)
  const mockData = {
    description: task.description || "จัดเตรียมเอกสาร Presentation และตรวจสอบสต็อกสินค้าคงเหลือในระบบ SAP ให้เรียบร้อยก่อนเข้าพบลูกค้า",
    location: task.location || "789 ถนนพระราม 4 แขวงสีลม เขตบางรัก กรุงเทพฯ 10330",
    siteBranch: task.siteBranch || "สำนักงานใหญ่ (HQ)",
    contactPerson: task.contactPerson || "คุณเดวิด ลี - Logistics Manager",
    contactPhone: task.contactPhone || "02-345-6789",
    contactEmail: task.contactEmail || "david.lee@pacific-dist.com",
    customers: task.customers?.length ? task.customers : ["Pacific Distribution Co."],
    activityType: task.activityType || "สำรวจสถานที่ (Site Survey)",
    serviceTopics: ["ตรวจสอบระบบคลังสินค้า", "ปรึกษาเรื่องการจัดส่งแบบ Express"],
    startTime: task.dueTime || "10:00",
    endTime: task.endTime || "12:00",
    attendees: ["Sarah Chen", "Michael Wong", "คุณอุ้ย (Manager)"],
    sharedWith: ["Sales Team A", "Marketing Support"],
    createdBy: task.createdBy?.name || "คุณ (You)",
    // Mock แท็บกิจกรรม (Activity Log)
    activities: [
      { id: "1", user: "Sarah Chen", avatar: "SC", action: "เพิ่มความคิดเห็นใหม่", time: "2 ชม. ที่แล้ว", content: "ส่งใบเสนอราคาให้ลูกค้าพิจารณาแล้วค่ะ รอการตอบกลับ", file: "Quotation_v2.pdf" },
      { id: "2", user: "Michael Wong", avatar: "MW", action: "อัปเดตสถานะ", time: "เมื่อวานนี้ 14:20", content: "อัปเดตสถานะเป็น 'In Progress' เรียบร้อยครับ" }
    ],
    // Mock แท็บเกี่ยวข้อง (Related Tasks)
    relatedTasks: [
      { id: "TASK-1002", title: "จัดเตรียมเอกสารสัญญา (Draft Contract)", status: "completed", assignee: "Sarah Chen" },
      { id: "TASK-1005", title: "ส่งตัวอย่างสินค้า (Sample Shipping)", status: "todo", assignee: "คุณ (You)" }
    ]
  };

  const handleSaveField = (fieldName: string) => {
    if (onEdit) onEdit(editForm);
    toast.success(`อัปเดต ${fieldName} สำเร็จ`);
    setEditingField(null);
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0 bg-[#F9FAFB] border-none shadow-2xl font-['IBM_Plex_Sans_Thai',_'Inter',_sans-serif]">
        <VisuallyHidden><DialogTitle>{task.title}</DialogTitle></VisuallyHidden>

        {/* --- HEADER: Enterprise สไตล์เก่า --- */}
        <div className="bg-white border-b border-gray-200 p-5 flex justify-between items-start">
          <div className="space-y-1.5">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">{task.title}</h2>
            <div className="flex items-center gap-2">
              <Badge className={`rounded font-bold text-[10px] px-2 py-0.5 border ${
                task.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-blue-50 text-blue-700 border-blue-100'
              }`}>{task.status.toUpperCase()}</Badge>
              <Badge className="bg-red-50 text-red-700 border-red-100 rounded font-bold text-[10px] px-2 py-0.5">{task.priority.toUpperCase()}</Badge>
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
                    /* --- TO-DO MODE: Card Stack สไตล์เก่า 100% --- */
                    <>
                      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                        <Editable field="description" label="รายละเอียดงาน" type="textarea" icon={FileText} value={mockData.description} />
                      </div>
                      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                        <h3 className="text-xs font-bold text-gray-400 mb-5 uppercase tracking-widest">ข้อมูลเพิ่มเติม</h3>
                        <div className="space-y-5">
                          <Editable field="customers" label="ลูกค้า / ลีด" icon={Building2} value={mockData.customers[0]} />
                          <Editable field="activityType" label="ประเภทกิจกรรม (Activity Type)" icon={Briefcase} value={mockData.activityType} />
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
                      </div>
                    </>
                  ) : (
                    /* --- ACTIVITY MODE: Full Detail สไตล์ใหม่ ครบทุกฟิลด์ --- */
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                      <div className="p-4 bg-blue-50/20 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="text-sm font-bold text-blue-900 flex items-center gap-2 uppercase"><Briefcase className="h-4 w-4" /> Activity Full Information</h3>
                        <Badge className="bg-white border-blue-100 text-blue-600 font-bold text-[10px] shadow-sm"><Zap className="h-3 w-3 mr-1 fill-blue-600" /> LINKED DEAL: #DEAL-0992</Badge>
                      </div>
                      <div className="p-6 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-6">
                            <Editable field="activityType" label="ประเภทกิจกรรมนัดหมาย" value={mockData.activityType} />
                            <Editable field="customers" label="ลูกค้า / ลีด" value={mockData.customers[0]} />
                            <div className="flex gap-4">
                              <Editable field="startTime" label="START TIME" value={mockData.startTime} />
                              <Editable field="endTime" label="END TIME" value={mockData.endTime} />
                            </div>
                          </div>
                          <div className="space-y-6">
                            <Editable field="location" label="LOCATION / MEETING ROOM" icon={MapPin} value={mockData.location} />
                            <Editable field="siteBranch" label="สาขา / ไซด์งาน" icon={Map} value={mockData.siteBranch} />
                            <Editable field="contactPerson" label="CUSTOMER CONTACT PERSON" icon={User} value={mockData.contactPerson} />
                          </div>
                        </div>
                        <div className="pt-6 border-t border-gray-50">
                          <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">หัวข้อบริการที่เกี่ยวข้อง</p>
                          <div className="flex flex-wrap gap-2">
                            {mockData.serviceTopics.map(topic => (
                              <Badge key={topic} className="bg-gray-100 text-gray-700 border-none font-bold text-[10px]">{topic}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                {/* 2. แท็บกิจกรรม (Activity Log Mockup) */}
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

                {/* 3. แท็บเกี่ยวข้อง (Related Mockup) */}
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

            {/* --- RIGHT SIDEBAR: Source of Truth --- */}
            <div className="lg:col-span-4 space-y-4">
              <Card className="border-gray-200 shadow-sm rounded-2xl bg-white overflow-hidden p-5 space-y-6">
                <h4 className="text-[11px] font-bold text-gray-900 border-b border-gray-50 pb-2 uppercase tracking-widest">ข้อมูลสรุป</h4>
                <div className="space-y-5">
                  <Editable field="dueDate" label="วันที่กำหนด" icon={Calendar} value={new Date(task.dueDate).toLocaleDateString("th-TH")} />
                  <Editable field="dueTime" label="เวลา" icon={Clock} value={task.dueTime} />
                  <Editable field="assignee" label="ผู้รับผิดชอบ" icon={User} value={task.assignee || "คุณ (You)"} />
                  <div className="flex items-center gap-4"><Plus className="h-5 w-5 text-blue-400" /><div><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ผู้มอบหมาย</p><p className="text-xs font-bold text-gray-800">{mockData.createdBy}</p></div></div>

                  {/* ผู้เข้าร่วม (Badge ฟ้า) */}
                  {isSpecialActivity && (
                    <div className="pt-3 border-t border-gray-50">
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 flex items-center gap-2"><Users className="h-3 w-3" /> ผู้ที่ต้องเข้าร่วม</p>
                      <div className="flex flex-wrap gap-1.5">{mockData.attendees.map(n => <Badge key={n} className="bg-blue-50 text-blue-700 border-none font-bold text-[9px] px-2 py-0.5">{n}</Badge>)}</div>
                    </div>
                  )}

                  {/* แชร์ให้คนในทีม (Badge ม่วง) */}
                  <div className="pt-3 border-t border-gray-50">
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 flex items-center gap-2"><Lock className="h-3 w-3 text-purple-500" /> แชร์สิทธิ์ให้คนในทีม</p>
                    <div className="flex flex-wrap gap-1.5">
                      {mockData.sharedWith.map(n => <Badge key={n} className="bg-purple-50 text-purple-700 border-none font-bold text-[9px] px-2 py-0.5">{n}</Badge>)}
                      <Button variant="ghost" size="sm" className="h-5 w-5 p-0 rounded-full bg-gray-100"><Plus className="h-3 w-3 text-gray-500" /></Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* ACTION: เปลี่ยนสเตตัสแล้ว UI เปลี่ยนทันที */}
              <Card className="border-gray-200 shadow-sm rounded-2xl bg-white overflow-hidden p-5 shadow-lg border-t-4 border-t-emerald-500">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-widest">การดำเนินการ (Action)</p>
                <select 
                  className="w-full h-10 px-3 text-xs font-bold border border-gray-100 rounded-xl bg-gray-50 focus:ring-1 focus:ring-blue-500 outline-none mb-4" 
                  value={task.status} 
                  onChange={(e) => onStatusChange?.(task.id, e.target.value)}
                >
                  <option value="todo">TO-DO TASK</option>
                  <option value="in-progress">IN PROGRESS</option>
                  <option value="completed">COMPLETED</option>
                </select>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-10 rounded-xl text-[10px] font-bold border-gray-100 shadow-sm bg-white hover:bg-gray-50 transition-colors"><MapPin className="h-3.5 w-3.5 mr-1.5 text-blue-500" /> Check-in</Button>
                  <Button variant="outline" className="h-10 rounded-xl text-[10px] font-bold border-gray-100 shadow-sm bg-white hover:bg-gray-50 transition-colors"><Paperclip className="h-3.5 w-3.5 mr-1.5 text-purple-500" /> แนบไฟล์</Button>
                </div>
              </Card>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}