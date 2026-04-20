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
import { Checkbox } from "./ui/checkbox"; // 🟢 เพิ่ม Import Checkbox
import { Combobox } from "./ui/combobox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Command, CommandGroup, CommandItem, CommandList, CommandEmpty, CommandInput } from "./ui/command";
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
  Lock, // 🟢 เพิ่ม Icon Lock
  Globe // 🟢 เพิ่ม Icon Globe
} from "lucide-react";
import { useRoleTheme } from "../hooks/use-role-theme";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRole } from "../contexts/role-context";

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
  customers?: string[]; 
  customer?: string;
  relatedTo?: string;
  approvers?: string[];
  location?: string;
  contactPerson?: string;
  contactPhone?: string;
  contactEmail?: string;
  activityType?: string;
  // 🟢 เพิ่มฟิลด์สำหรับการแชร์
  visibility?: "private" | "public" | "organization";
  sharedWith?: string[];
}

interface TaskDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  onStatusChange?: (taskId: string, newStatus: "todo" | "in-progress" | "completed") => void;
}

// Mock Data ลูกค้า
const mockCustomers = [
  {
    name: "Global Traders Ltd.",
    location: "999 ถนนพระราม 4 แขวงสีลม เขตบางรัก กรุงเทพมหานคร 10500",
    contactPerson: "คุณสมชาย วงศ์ใหญ่ - Logistics Manager",
    phone: "081-234-5678",
    email: "somchai.w@globaltraders.com"
  },
  {
    name: "Tech Solutions Inc.",
    location: "123 Cyber World Tower, Ratchadaphisek Rd, Bangkok 10310",
    contactPerson: "Mr. Alan Turing - IT Director",
    phone: "089-876-5432",
    email: "alan.t@techsolutions.com"
  },
  {
    name: "บริษัท สยามพัฒนา จำกัด",
    location: "456 หมู่ 1 ต.บางปู อ.เมือง จ.สมุทรปราการ 10280",
    contactPerson: "คุณวิภาวี ดีเสมอ - ฝ่ายจัดซื้อ",
    phone: "082-345-6789",
    email: "wipawee@siampattana.co.th"
  },
  {
    name: "ร้านค้า ABC",
    location: "789 ตลาดนัดจตุจักร โครงการ 1 กรุงเทพมหานคร 10900",
    contactPerson: "เจ๊สมศรี - เจ้าของร้าน",
    phone: "085-555-4444",
    email: "somsri_abc@gmail.com"
  }
];

// 🟢 Mock Data ทีมงาน (สำหรับการแชร์แบบ Public)
const teamMembers = [
  { id: "sarah-chen", name: "Sarah Chen" },
  { id: "michael-wong", name: "Michael Wong" },
  { id: "jessica-patel", name: "Jessica Patel" },
  { id: "david-kim", name: "David Kim" },
];

export function TaskDetailDialog({
  isOpen,
  onClose,
  task,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskDetailDialogProps) {
  const roleTheme = useRoleTheme();
  const { t } = useTranslation();
  const { role } = useRole();

  const [openCustomerDropdown, setOpenCustomerDropdown] = useState(false);
  const [customerSearchQuery, setCustomerSearchQuery] = useState("");

  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [editForm, setEditForm] = useState({
    description: "",
    customers: [] as string[],
    relatedTo: "",
    activityType: "",
    location: "",
    contactPerson: "",
    contactPhone: "",
    contactEmail: "",
    // 🟢 เพิ่ม State สำหรับการแชร์
    visibility: "private" as "private" | "public" | "organization",
    sharedWith: [] as string[],
  });

  useEffect(() => {
    if (isOpen && task) {
      const initialCustomers = task.customers || (task.customer ? [task.customer] : []);
      
      let loc = task.location || "";
      let cp = task.contactPerson || "";
      let phone = task.contactPhone || "";
      let email = task.contactEmail || "";

      if (initialCustomers.length === 1 && (!loc || !cp || !phone || !email)) {
        const matchedCustomer = mockCustomers.find(c => c.name === initialCustomers[0]);
        if (matchedCustomer) {
          loc = loc || matchedCustomer.location;
          cp = cp || matchedCustomer.contactPerson;
          phone = phone || matchedCustomer.phone;
          email = email || matchedCustomer.email;
        }
      }

      setEditForm({
        description: task.description || "",
        customers: initialCustomers,
        relatedTo: task.relatedTo || "",
        activityType: task.activityType || "",
        location: loc,
        contactPerson: cp,
        contactPhone: phone,
        contactEmail: email,
        // 🟢 เซ็ตค่าตั้งต้นของการแชร์
        visibility: task.visibility || "private",
        sharedWith: task.sharedWith || [],
      });
      
      setIsEditingDetails(false); 
      setOpenCustomerDropdown(false);
    }
  }, [isOpen, task]);

  const handleCancelDetails = () => {
    if (!task) return;
    setIsEditingDetails(false);
    
    const initialCustomers = task.customers || (task.customer ? [task.customer] : []);
    let loc = task.location || "";
    let cp = task.contactPerson || "";
    let phone = task.contactPhone || "";
    let email = task.contactEmail || "";

    if (initialCustomers.length === 1 && (!loc || !cp || !phone || !email)) {
      const matchedCustomer = mockCustomers.find(c => c.name === initialCustomers[0]);
      if (matchedCustomer) {
        loc = loc || matchedCustomer.location;
        cp = cp || matchedCustomer.contactPerson;
        phone = phone || matchedCustomer.phone;
        email = email || matchedCustomer.email;
      }
    }

    setEditForm({
      description: task.description || "",
      customers: initialCustomers,
      relatedTo: task.relatedTo || "",
      activityType: task.activityType || "",
      location: loc,
      contactPerson: cp,
      contactPhone: phone,
      contactEmail: email,
      visibility: task.visibility || "private",
      sharedWith: task.sharedWith || [],
    });
  };

  const handleSaveDetails = () => {
    if (!task) return;
    if (onEdit) {
      onEdit({
        ...task,
        description: editForm.description,
        customers: editForm.customers,
        customer: editForm.customers.length > 0 ? editForm.customers[0] : "",
        relatedTo: editForm.relatedTo,
        activityType: editForm.activityType,
        location: editForm.location,
        contactPerson: editForm.contactPerson,
        contactPhone: editForm.contactPhone,
        contactEmail: editForm.contactEmail,
        visibility: editForm.visibility,
        sharedWith: editForm.sharedWith,
      });
      toast.success(t("tasks.edit_success"));
    }
    setIsEditingDetails(false);
  };

  const toggleCustomer = (customerName: string) => {
    setEditForm((prev) => {
      const current = prev.customers || [];
      const isSelected = current.includes(customerName);
      
      const newCustomers = isSelected
        ? current.filter((c) => c !== customerName)
        : [...current, customerName];

      let newContactInfo = {
        location: prev.location,
        contactPerson: prev.contactPerson,
        contactPhone: prev.contactPhone,
        contactEmail: prev.contactEmail,
      };

      if (newCustomers.length === 1) {
        const selectedCustomer = mockCustomers.find(c => c.name === newCustomers[0]);
        if (selectedCustomer) {
          newContactInfo = {
            location: selectedCustomer.location,
            contactPerson: selectedCustomer.contactPerson,
            contactPhone: selectedCustomer.phone,
            contactEmail: selectedCustomer.email
          };
        }
      } else if (newCustomers.length > 1) {
        newContactInfo = { location: "", contactPerson: "", contactPhone: "", contactEmail: "" };
      } else {
        newContactInfo = { location: "", contactPerson: "", contactPhone: "", contactEmail: "" };
      }

      return {
        ...prev,
        customers: newCustomers,
        ...newContactInfo
      };
    });
  };

  if (!task) return null;

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-700 border border-red-200";
      case "medium": return "bg-orange-100 text-orange-700 border border-orange-200";
      case "low": return "bg-blue-100 text-blue-700 border border-blue-200";
      default: return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high": return t("priority.high");
      case "medium": return t("priority.medium");
      case "low": return t("priority.low");
      default: return priority;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "todo": return "bg-gray-100 text-gray-700 border border-gray-200";
      case "in-progress": return "bg-blue-100 text-blue-700 border border-blue-200";
      case "completed": return "bg-emerald-100 text-emerald-700 border border-emerald-200";
      default: return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "todo": return t("tasks.to_do");
      case "in-progress": return t("tasks.in_progress");
      case "completed": return t("tasks.completed");
      default: return status;
    }
  };

  const getActivityTypeLabel = (type?: string) => {
    switch (type) {
      case "customer_visit": return t("tasks.activity_customer_visit");
      case "meeting": return t("tasks.activity_meeting");
      case "site_survey": return t("tasks.activity_site_survey");
      case "follow_up": return t("tasks.activity_follow_up");
      default: return type || t("tasks.activity_not_specified");
    }
  };

  const activities = [
    {
      id: "1", type: "comment", user: "Sarah Chen", avatar: "SC",
      timestamp: "เพิ่งจะ", 
      content: " ",
      attachments: [
        { type: "pdf", name: "Quotation_v2.pdf", size: "1.2 MB" },
        { type: "image", name: "Warehouse_Layout.png", size: "850 KB" }
      ]
    },
    {
      id: "2", type: "comment", user: "Sarah Chen", avatar: "SC",
      timestamp: t("tasks.activity_timestamp_2_hours", "2 ชั่วโมงที่แล้ว"), content: t("tasks.activity_comment_1", "รับทราบค่ะ จะรีบตรวจสอบให้ค่ะ"),
    }
  ];

  const relatedTasks = [
    { id: "TASK-102", title: t("tasks.related_task_1_title", "จัดเตรียมเอกสารสัญญา (Draft Contract)"), status: "completed", assignee: "Sarah Chen" },
    { id: "TASK-103", title: t("tasks.related_task_2_title", "คำนวณต้นทุนการจัดส่ง (Cost Estimation)"), status: "in-progress", assignee: "Michael Park" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[85vh] p-0 gap-0 bg-white">
        <VisuallyHidden><DialogTitle>{task.title}</DialogTitle></VisuallyHidden>
        
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="flex items-start justify-between p-4 pb-3">
            <div className="flex-1 mr-4">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">{task.title}</h2>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={`${getStatusBadge(task.status)} rounded-md text-xs font-medium px-2 py-0.5`}>
                  {getStatusLabel(task.status)}
                </Badge>
                <Badge className={`${getPriorityBadge(task.priority)} rounded-md text-xs font-medium px-2 py-0.5`}>
                  {getPriorityLabel(task.priority)}
                </Badge>
              </div>
            </div>

            <div className="flex gap-1.5">
              {onDelete && (
                <Button variant="outline" size="sm" onClick={() => { onDelete(task.id); onClose(); }} className="border-red-300 text-red-600 hover:bg-red-50 h-8 text-xs">
                  <Trash2 className="h-3.5 w-3.5 mr-1.5" /> {t("tasks.delete")}
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-gray-100 h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="px-4 pb-2">
            <p className="text-xs text-gray-500">
              {task.id} • {t("tasks.created_on", "สร้างเมื่อ")} {new Date(task.dueDate).toLocaleDateString("th-TH", {
                year: "numeric", month: "short", day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 max-h-[calc(85vh-140px)] overflow-y-auto">
          <div className="p-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Main Content - Left Side */}
              <div className="lg:col-span-2 space-y-4">
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-4 bg-gray-100 h-9">
                    <TabsTrigger value="details" className="data-[state=active]:bg-white text-xs">{t("tasks.details", "รายละเอียด")}</TabsTrigger>
                    <TabsTrigger value="activity" className="data-[state=active]:bg-white text-xs">{t("tasks.activity", "ความเคลื่อนไหว")}</TabsTrigger>
                    <TabsTrigger value="related" className="data-[state=active]:bg-white text-xs">{t("tasks.related", "งานที่เกี่ยวข้อง")}</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="space-y-4 mt-0">
                    {/* Description Section */}
                    <div className="bg-white rounded-lg border border-gray-100 p-3 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                          <FileText className="h-3.5 w-3.5 text-gray-500" />
                          {t("tasks.description")}
                        </h3>
                        {isEditingDetails ? (
                          <div className="flex items-center gap-2">
                            <button onClick={handleCancelDetails} className="text-red-500 hover:text-red-700 p-1"><X className="h-4 w-4" /></button>
                            <button onClick={handleSaveDetails} className="text-emerald-600 hover:text-emerald-700 p-1"><Check className="h-4 w-4" /></button>
                          </div>
                        ) : (
                          <button onClick={() => setIsEditingDetails(true)} className="text-gray-400 hover:text-gray-600 p-1 transition-colors"><Edit2 className="h-3.5 w-3.5" /></button>
                        )}
                      </div>
                      <div className="pl-5">
                        {isEditingDetails ? (
                          <Textarea
                            value={editForm.description}
                            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                            className="text-[10px] min-h-[80px] border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                            placeholder="เพิ่มรายละเอียดงาน..."
                          />
                        ) : (
                          <p className="text-xs text-gray-700 leading-relaxed">
                            {editForm.description || "ไม่มีรายละเอียดเพิ่มเติม"}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Customer & Related Info */}
                    <div className="bg-white rounded-lg border border-gray-100 p-3 shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-semibold text-gray-900">{t("tasks.additional_info", "ข้อมูลเพิ่มเติม")}</h3>
                        {isEditingDetails ? (
                          <div className="flex items-center gap-2">
                            <button onClick={handleCancelDetails} className="text-red-500 hover:text-red-700 p-1"><X className="h-4 w-4" /></button>
                            <button onClick={handleSaveDetails} className="text-emerald-600 hover:text-emerald-700 p-1"><Check className="h-4 w-4" /></button>
                          </div>
                        ) : (
                          <button onClick={() => setIsEditingDetails(true)} className="text-gray-400 hover:text-gray-600 p-1 transition-colors"><Edit2 className="h-3.5 w-3.5" /></button>
                        )}
                      </div>
                      <div className="space-y-3 pl-1">
                        
                        {/* Customer Multi-Select Section */}
                        <div className="flex items-start gap-2">
                          <Building2 className="h-3.5 w-3.5 text-gray-500 mt-1.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-[10px] text-gray-500 mb-0.5">{t("tasks.customer")}</p>
                            
                            {isEditingDetails ? (
                              <div className="w-full max-w-sm relative">
                                <Popover open={openCustomerDropdown} onOpenChange={setOpenCustomerDropdown}>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      aria-expanded={openCustomerDropdown}
                                      className="w-full justify-between h-auto min-h-[28px] py-1 px-2 text-[10px] border-gray-300 hover:bg-white"
                                    >
                                      {editForm.customers.length > 0 ? (
                                        <div className="flex flex-wrap gap-1">
                                          {editForm.customers.map((c) => (
                                            <Badge key={c} variant="secondary" className="text-[12px] font-normal bg-blue-50 text-blue-700 hover:bg-blue-50">
                                              {c}
                                            </Badge>
                                          ))}
                                        </div>
                                      ) : (
                                        <span className="text-gray-400">เลือกลูกค้า...</span>
                                      )}
                                      <ChevronDown className="h-3.5 w-3.5 opacity-50 shrink-0" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-[300px] p-0" align="start">
                                    <Command>
                                      <CommandInput placeholder="ค้นหาลูกค้า..." className="h-8 text-xs" value={customerSearchQuery} onValueChange={setCustomerSearchQuery} />
                                      <CommandList>
                                        <CommandEmpty className="py-2 text-center text-xs text-gray-500">ไม่พบลูกค้า</CommandEmpty>
                                        <CommandGroup>
                                          {mockCustomers.map((cust) => (
                                            <CommandItem
                                              key={cust.name}
                                              value={cust.name}
                                              onSelect={() => toggleCustomer(cust.name)}
                                              className="text-xs"
                                            >
                                              <Check
                                                className={`mr-2 h-3.5 w-3.5 ${
                                                  editForm.customers.includes(cust.name) ? "opacity-100 text-emerald-600" : "opacity-0"
                                                }`}
                                              />
                                              {cust.name}
                                            </CommandItem>
                                          ))}
                                        </CommandGroup>
                                      </CommandList>
                                    </Command>
                                  </PopoverContent>
                                </Popover>
                              </div>
                            ) : (
                              <div className="flex flex-wrap gap-1 mt-0.5">
                                {editForm.customers && editForm.customers.length > 0 ? (
                                  editForm.customers.map((c) => (
                                    <Badge key={c} variant="secondary" className="text-[10px] font-normal bg-gray-100 text-gray-800">
                                      {c}
                                    </Badge>
                                  ))
                                ) : (
                                  <span className="text-xs font-medium text-gray-900">-</span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

{/* Activity Type */}
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-amber-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-[10px] font-semibold text-gray-500 mb-1 tracking-wide uppercase">{t("tasks.activity_type")}</p>
                            {isEditingDetails ? (
                              <Combobox
                                options={[
                                  { value: "ติดตามลูกค้า", label: "ติดตามลูกค้า" },
                                  { value: "เตรียมใบเสนอราคา", label: "เตรียมใบเสนอราคา" },
                                  { value: "นัดหมายลูกค้า", label: "นัดหมายลูกค้า" },
                                  { value: "ส่งเอกสาร", label: "ส่งเอกสาร" },
                                  { value: "ตรวจสอบสถานะดีล", label: "ตรวจสอบสถานะดีล" },
                                  { value: "โทรติดต่อลูกค้า", label: "โทรติดต่อลูกค้า" },
                                  { value: "ส่งอีเมล", label: "ส่งอีเมล" },
                                  { value: "เข้าพบลูกค้า", label: "เข้าพบลูกค้า" },
                                  { value: "ทำสัญญา", label: "ทำสัญญา" },
                                  { value: "ส่งมอบสินค้า/บริการ", label: "ส่งมอบสินค้า/บริการ" },
                                  { value: "แก้ไขปัญหา", label: "แก้ไขปัญหา" },
                                  { value: "ประชุมทีม", label: "ประชุมทีม" },
                                  { value: "ทำรายงาน", label: "ทำรายงาน" },
                                ]}
                                value={editForm.activityType}
                                onValueChange={(value) => setEditForm({ ...editForm, activityType: value })}
                                placeholder={t("tasks.select_task_type")}
                                searchPlaceholder="ค้นหา..."
                                className="w-full max-w-sm h-9 text-xs"
                              />
                            ) : (
                              <div className="mt-1">
                                {editForm.activityType ? (
                                  <span className="text-xs font-medium text-gray-900  px-2 py-1 rounded-md ">
                                    {getActivityTypeLabel(editForm.activityType)}
                                  </span>
                                ) : (
                                  <span className="text-xs font-medium text-gray-400 italic">-</span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Contact Information Section */}
                    {editForm.customers && editForm.customers.length > 1 ? (
                      <div className="bg-gray-50 rounded-lg border border-dashed border-gray-200 p-6 flex flex-col items-center justify-center text-center">
                        <div className="bg-white p-2 rounded-full shadow-sm mb-2">
                          <Users className="h-5 w-5 text-blue-500" />
                        </div>
                        <p className="text-xs font-medium text-gray-700">มีลูกค้าที่เกี่ยวข้องหลายราย</p>
                        <p className="text-[10px] text-gray-500 mt-1 max-w-[250px]">
                          ข้อมูลสถานที่และเบอร์ติดต่อแบบเจาะจงถูกซ่อนไว้ เนื่องจากงานนี้อ้างอิงถึงลูกค้ามากกว่า 1 ราย
                        </p>
                      </div>
                    ) : (
                      <div className="bg-white rounded-lg border border-gray-100 p-3 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xs font-semibold text-gray-900">{t("tasks.contact_info")}</h3>
                          {isEditingDetails && (
                            <div className="flex items-center gap-2 opacity-50">
                              <Edit2 className="h-3.5 w-3.5" />
                            </div>
                          )}
                        </div>
                        <div className="space-y-3 pl-1">
                          {/* Location */}
                          <div className="flex items-start gap-2">
                            <MapPin className="h-3.5 w-3.5 text-blue-600 mt-1.5 flex-shrink-0" />
                            <div className="flex-1">
                              <p className="text-[10px] text-gray-500 mb-0.5">{t("tasks.location")}</p>
                              {isEditingDetails ? (
                                <Textarea
                                  value={editForm.location}
                                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                                  className="min-h-[60px] text-xs border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 max-w-sm"
                                  placeholder="สถานที่ตั้ง"
                                />
                              ) : (
                                <p className="text-xs font-medium text-gray-900">{editForm.location || "-"}</p>
                              )}
                            </div>
                          </div>

                          {/* Contact Person */}
                          <div className="flex items-start gap-2">
                            <User className="h-3.5 w-3.5 text-green-600 mt-1.5 flex-shrink-0" />
                            <div className="flex-1">
                              <p className="text-[10px] text-gray-500 mb-0.5">{t("tasks.contact_person")}</p>
                              {isEditingDetails ? (
                                <Input
                                  value={editForm.contactPerson}
                                  onChange={(e) => setEditForm({ ...editForm, contactPerson: e.target.value })}
                                  className="h-7 text-xs border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 w-full max-w-sm"
                                  placeholder="ชื่อผู้ติดต่อ"
                                />
                              ) : (
                                <p className="text-xs font-medium text-gray-900">{editForm.contactPerson || "-"}</p>
                              )}
                            </div>
                          </div>

                          {/* Phone */}
                          <div className="flex items-start gap-2">
                            <Phone className="h-3.5 w-3.5 text-purple-600 mt-1.5 flex-shrink-0" />
                            <div className="flex-1">
                              <p className="text-[10px] text-gray-500 mb-0.5">{t("tasks.phone")}</p>
                              {isEditingDetails ? (
                                <Input
                                  value={editForm.contactPhone}
                                  onChange={(e) => setEditForm({ ...editForm, contactPhone: e.target.value })}
                                  className="h-7 text-[10px] border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 w-full max-w-sm"
                                  placeholder="เบอร์โทรศัพท์"
                                />
                              ) : (
                                editForm.contactPhone ? (
                                  <a href={`tel:${editForm.contactPhone}`} className="text-xs font-medium text-blue-600 hover:underline" onClick={(e) => e.stopPropagation()}>
                                    {editForm.contactPhone}
                                  </a>
                                ) : <p className="text-xs font-medium text-gray-900">-</p>
                              )}
                            </div>
                          </div>

                          {/* Email */}
                          <div className="flex items-start gap-2">
                            <Mail className="h-3.5 w-3.5 text-orange-600 mt-1.5 flex-shrink-0" />
                            <div className="flex-1">
                              <p className="text-[10px] text-gray-500 mb-0.5">{t("tasks.email")}</p>
                              {isEditingDetails ? (
                                <Input
                                  value={editForm.contactEmail}
                                  onChange={(e) => setEditForm({ ...editForm, contactEmail: e.target.value })}
                                  className="h-7 text-xs border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 w-full max-w-sm"
                                  placeholder="อีเมล"
                                />
                              ) : (
                                editForm.contactEmail ? (
                                  <a href={`mailto:${editForm.contactEmail}`} className="text-[10px] font-medium text-blue-600 hover:underline" onClick={(e) => e.stopPropagation()}>
                                    {editForm.contactEmail}
                                  </a>
                                ) : <p className="text-xs font-medium text-gray-900">-</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="activity" className="mt-0">
                    <div className="bg-white rounded-lg border border-gray-100 p-3 shadow-sm space-y-4">
                      <h3 className="text-xs font-semibold text-gray-900">{t("tasks.activity")}</h3>
                      <div className="flex gap-3 pb-3 border-b border-gray-100">
                        <Avatar className="h-7 w-7 flex-shrink-0">
                          <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">YO</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <Textarea placeholder="เพิ่มความคิดเห็น..." className="w-full text-xs min-h-[60px] border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 resize-none" rows={3} />
                          <div className="flex items-center gap-2 mt-2">
                            <Button size="sm" style={{ backgroundColor: roleTheme.primary }} className="text-white h-7 text-xs">
                              <MessageSquare className="h-3.5 w-3.5 mr-1.5" /> {t("tasks.add_comment")}
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 text-xs">
                              <Paperclip className="h-3.5 w-3.5 mr-1.5" /> {t("tasks.attach_file")}
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="h-[300px] overflow-y-auto">
                        <div className="space-y-4 pr-2">
                          {activities.map((activity) => (
                            <div key={activity.id} className="flex gap-3">
                              <Avatar className="h-7 w-7 flex-shrink-0">
                                <AvatarFallback className="text-xs" style={{ backgroundColor: roleTheme.lighter, color: roleTheme.primary }}>
                                  {activity.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <span className="text-[10px] text-gray-500">{activity.timestamp}</span>
                                </div>
                                <p className="text-xs text-gray-700 leading-relaxed">{activity.content}</p>

                                {activity.attachments && activity.attachments.length > 0 && (
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {activity.attachments.map((file, idx) => (
                                      <a key={idx} href="#" className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-2.5 py-1.5 rounded-md text-xs hover:bg-gray-100 transition-colors">
                                        <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${file.type === 'pdf' ? 'bg-red-100' : 'bg-blue-100'}`}>
                                          {file.type === 'pdf' ? (
                                            <FileText className="h-3 w-3 text-red-600" />
                                          ) : (
                                            <Map className="h-3 w-3 text-blue-600" />
                                          )}
                                        </div>
                                        <div className="flex flex-col">
                                          <span className="font-medium text-gray-700 truncate max-w-[120px]">{file.name}</span>
                                          <span className="text-[9px] text-gray-400">{file.size}</span>
                                        </div>
                                      </a>
                                    ))}
                                  </div>
                                )}

                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="related" className="mt-0">
                    <div className="bg-white rounded-lg border border-gray-100 p-3 shadow-sm">
                      <h3 className="text-xs font-semibold text-gray-900 mb-3">{t("tasks.related")}</h3>
                      <div className="space-y-2">
                        {relatedTasks.map((relatedTask) => (
                          <div key={relatedTask.id} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200">
                            <div className="flex items-center gap-2.5 flex-1 min-w-0">
                              <CheckCircle2 className={`h-4 w-4 flex-shrink-0 ${relatedTask.status === "completed" ? "text-green-600" : "text-gray-400"}`} />
                              <div className="min-w-0">
                                <p className="text-xs font-medium text-gray-900 truncate">{relatedTask.title}</p>
                                <p className="text-[10px] text-gray-500">{relatedTask.id}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                              <span className="text-[10px] text-gray-500">{relatedTask.assignee}</span>
                              <Badge className={`${relatedTask.status === "completed" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-blue-100 text-blue-700 border-blue-200"} rounded-md text-[10px] px-1.5 py-0`}>
                                {relatedTask.status === "completed" ? t("tasks.completed") : t("tasks.in_progress")}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar - Right Side */}
              <div className="space-y-3">
                <Card className="border border-gray-200 shadow-sm">
                  <CardContent className="p-3 space-y-3">
                    <h3 className="text-xs font-semibold text-gray-900 border-b border-gray-200 pb-1.5">{t("tasks.summary")}</h3>
                    <div className="space-y-2">
                      <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <Calendar className="h-3.5 w-3.5 text-gray-500" />
                          <span className="text-xs font-medium text-gray-700">{t("tasks.due_date_label")}</span>
                        </div>
                        <p className="text-xs text-gray-900 ml-5">
                          {new Date(task.dueDate).toLocaleDateString("th-TH", { year: "numeric", month: "short", day: "numeric" })}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <Clock className="h-3.5 w-3.5 text-gray-500" />
                          <span className="text-xs font-medium text-gray-700">{t("tasks.time")}</span>
                        </div>
                        <p className="text-xs text-gray-900 ml-5">{task.dueTime}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <User className="h-3.5 w-3.5 text-gray-500" />
                          <span className="text-xs font-medium text-gray-700">{t("tasks.responsible")}</span>
                        </div>
                        <div className="flex items-center gap-1.5 ml-5">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback className="text-xs" style={{ backgroundColor: roleTheme.lighter, color: roleTheme.primary }}>
                              {task.assignee === "You" ? "YO" : task.assignee.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <p className="text-xs text-gray-900">{task.assignee === "You" ? t("tasks.you") : task.assignee}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 🟢 Action & Visibility Card */}
                <Card className="border border-gray-200 shadow-sm">
                  <CardContent className="p-3 space-y-1.5">
                    <h3 className="text-xs font-semibold text-gray-900 border-b border-gray-200 pb-1.5 mb-2">
                      {t("tasks.actions")}
                    </h3>
                    
                    {/* เปลี่ยนสถานะ */}
                    <div className="relative">
                      <p className="text-[10px] text-gray-500 mb-0.5 mt-1">{t("tasks.status", "สถานะงาน")}</p>
                      <select
                        className="w-full h-8 pl-3 pr-8 text-xs font-medium border border-gray-200 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-gray-900 bg-white text-gray-700 cursor-pointer"
                        value={task.status || "todo"}
                        onChange={(e) => {
                          if (onStatusChange) {
                            onStatusChange(
                              task.id,
                              e.target.value as any,
                            );
                          }
                        }}
                      >
                        <option value="todo">
                          {t("tasks.to_do")}
                        </option>
                        <option value="in-progress">
                          {t("tasks.in_progress")}
                        </option>
                        <option value="completed">
                          {t("tasks.completed")}
                        </option>
                      </select>
                      <ChevronDown className="absolute right-2 top-[28px] h-3.5 w-3.5 text-gray-500 pointer-events-none" />
                    </div>

                    {/* การแชร์งาน (Visibility) */}
                    <div className="relative mt-2">
                      <p className="text-[10px] text-gray-500 mb-0.5 mt-2">{t("tasks.visibility", "การแชร์งาน")}</p>
                      <select
                        className="w-full h-8 pl-8 pr-8 text-xs font-medium border border-gray-200 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-gray-900 bg-white text-gray-700 cursor-pointer"
                        value={editForm.visibility}
                        onChange={(e) => {
                          const value = e.target.value as "private" | "public" | "organization";
                          if (value === "private" || value === "organization") {
                            setEditForm({ ...editForm, visibility: value, sharedWith: [] });
                          } else {
                            setEditForm({ ...editForm, visibility: value });
                          }
                        }}
                      >
                        <option value="private">Private (ส่วนตัว)</option>
                        <option value="public">Public (เลือกคนแชร์)</option>
                        <option value="organization">Organization (องค์กร)</option>
                      </select>
                      <div className="absolute left-2 top-[28px] pointer-events-none">
                        {editForm.visibility === "private" && <Lock className="h-3.5 w-3.5 text-gray-500" />}
                        {editForm.visibility === "public" && <Users className="h-3.5 w-3.5 text-gray-500" />}
                        {editForm.visibility === "organization" && <Globe className="h-3.5 w-3.5 text-gray-500" />}
                      </div>
                      <ChevronDown className="absolute right-2 top-[28px] h-3.5 w-3.5 text-gray-500 pointer-events-none" />
                    </div>

                    {/* ปุ่ม Action พื้นฐาน */}
                    <div className="grid grid-cols-2 gap-2 mt-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-center h-8 text-xs"
                      >
                        <MapPin className="h-3.5 w-3.5 mr-1.5" />{" "}
                        {t("tasks.checkin")}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-center h-8 text-xs"
                      >
                        <Paperclip className="h-3.5 w-3.5 mr-1.5" />{" "}
                        {t("tasks.attach_file")}
                      </Button>
                    </div>

                    {/* Share with specific people */}
                    {editForm.visibility === "public" && (
                      <div className="mt-2 p-2 bg-gray-50 rounded-md border border-gray-100">
                        <p className="text-[10px] font-semibold text-gray-500 mb-2 block">
                          เลือกคนที่ต้องการแชร์
                        </p>
                        <div className="max-h-[100px] overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
                          {teamMembers.map((person) => (
                            <div key={person.id} className="flex items-center gap-2 bg-white px-2 py-1 rounded border border-gray-100">
                              <Checkbox
                                id={`share-${person.id}`}
                                checked={editForm.sharedWith.includes(person.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setEditForm({ ...editForm, sharedWith: [...editForm.sharedWith, person.id] });
                                  } else {
                                    setEditForm({ ...editForm, sharedWith: editForm.sharedWith.filter((id) => id !== person.id) });
                                  }
                                }}
                                className="w-3.5 h-3.5 rounded-sm"
                              />
                              <label
                                htmlFor={`share-${person.id}`}
                                className="text-[10px] text-gray-700 cursor-pointer flex-1 truncate"
                              >
                                {person.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}