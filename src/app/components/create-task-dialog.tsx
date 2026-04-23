import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Calendar, Users, Lock, Globe, Check, ChevronDown, X, Plus,
  Link2, CheckCircle2, Briefcase, Building2, UserPlus, Search
} from "lucide-react";
import { toast } from "sonner";
import { useModuleStore } from "../store/module-store";
import { TITLE_TYPES } from "../constants/task-constants";

// ==========================================
// 🔴 ส่วนที่ 1: MOCK UTILITIES & LIBRARIES 
// (ลบส่วนนี้ออกเมื่อนำไปใช้ในโปรเจกต์จริง แล้วใช้ import เดิมของคุณ)
// ==========================================

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

// จำลองการแปลภาษา
const useTranslation = () => {
  return { t: (key: string) => {
    const translations: Record<string, string> = {
      "tasks.create_new_task": "สร้างงานใหม่",
      "tasks.create_new_task_description": "เพิ่มงานใหม่และมอบหมายให้ทีม",
      "tasks.task_title": "ประเภทงาน / หัวข้อ",
      "tasks.select_task_type": "เลือกประเภทงาน",
      "tasks.description": "รายละเอียด",
      "tasks.description_placeholder": "เพิ่มรายละเอียด...",
      "tasks.due_date": "กำหนดส่ง",
      "tasks.priority": "ความสำคัญ",
      "tasks.select_priority": "เลือกระดับความสำคัญ",
      "priority.high": "สูง",
      "priority.medium": "ปานกลาง",
      "priority.low": "ต่ำ",
      "tasks.assignee": "ผู้รับผิดชอบ",
      "common.you": "คุณ",
      "common.cancel": "ยกเลิก",
      "common.save": "บันทึก"
    };
    return translations[key] || key;
  }};
};

// Event Target สำหรับจำลอง Toast
const toastEmitter = new EventTarget();

// ==========================================
// 🔴 ส่วนที่ 2: MOCK UI COMPONENTS 
// (ลบส่วนนี้ออกเมื่อนำไปใช้ในโปรเจกต์จริง)
// ==========================================

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' | 'ghost', size?: 'default' | 'sm' | 'lg' }>(({ className, variant = 'default', size = 'default', ...props }, ref) => {
  const variants = {
    default: "bg-emerald-600 text-white hover:bg-emerald-700",
    outline: "border border-gray-200 bg-white hover:bg-gray-50 text-gray-900",
    ghost: "hover:bg-gray-100 text-gray-700"
  };
  const sizes = { default: "h-10 px-4 py-2", sm: "h-8 px-3 text-xs", lg: "h-12 px-8" };
  return <button ref={ref} type={props.type || "button"} className={cn("inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:pointer-events-none disabled:opacity-50", variants[variant], sizes[size], className)} {...props} />;
});
Button.displayName = "Button";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, type, ...props }, ref) => (
  <input type={type} className={cn("flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors", className)} ref={ref} {...props} />
));
Input.displayName = "Input";

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(({ className, ...props }, ref) => (
  <label ref={ref} className={cn("text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700", className)} {...props} />
));
Label.displayName = "Label";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => (
  <textarea className={cn("flex min-h-[80px] w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors", className)} ref={ref} {...props} />
));
Textarea.displayName = "Textarea";

const Badge = ({ className, variant = "default", ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'outline' }) => (
  <div className={cn("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500", variant === 'outline' ? "text-gray-950" : "border-transparent bg-gray-900 text-gray-50", className)} {...props} />
);

const Checkbox = React.forwardRef<HTMLInputElement, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & { onCheckedChange?: (checked: boolean) => void }>(({ className, onCheckedChange, ...props }, ref) => (
  <input type="checkbox" ref={ref} onChange={(e) => onCheckedChange?.(e.target.checked)} className={cn("peer h-4 w-4 shrink-0 rounded-sm border border-gray-200 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-50 accent-emerald-500", className)} {...props} />
));
Checkbox.displayName = "Checkbox";

const Dialog = ({ open, onOpenChange, children }: any) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => onOpenChange(false)} />
      <div className="relative z-50 w-full flex justify-center animate-in fade-in zoom-in-95 duration-200">
        {React.Children.map(children, child => React.cloneElement(child, { onClose: () => onOpenChange(false) }))}
      </div>
    </div>
  );
};
const DialogContent = ({ className, children, onClose }: any) => (
  <div className={cn("flex flex-col bg-white rounded-2xl w-full max-h-[90vh] overflow-hidden relative shadow-xl", className)}>
    <div className="flex-1 overflow-y-auto p-6 md:p-8">{children}</div>
    <button type="button" onClick={onClose} className="absolute right-6 top-6 rounded-sm opacity-50 transition-opacity hover:opacity-100 bg-gray-100 p-1.5 hover:bg-gray-200">
      <X className="h-5 w-5 text-gray-700" />
    </button>
  </div>
);
const DialogHeader = ({ className, children }: any) => <div className={cn("flex flex-col space-y-1.5 text-left mb-6", className)}>{children}</div>;
const DialogTitle = ({ className, children }: any) => <h2 className={cn("text-xl font-bold leading-none tracking-tight", className)}>{children}</h2>;
const DialogDescription = ({ className, children }: any) => <p className={cn("text-sm text-gray-500", className)}>{children}</p>;

const Combobox = ({ options, value, onValueChange, placeholder, className, searchPlaceholder }: any) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const selected = options.find((o: any) => o.value === value);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((o: any) => o.label.toLowerCase().includes(search.toLowerCase()));

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className={cn("flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm cursor-pointer transition-colors focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500", className)} onClick={() => setOpen(!open)}>
        <span className={cn("flex-1 truncate text-left", !selected && "text-gray-400")}>{selected ? selected.label : placeholder}</span>
        <ChevronDown className="h-4 w-4 opacity-50 shrink-0" />
      </div>
      {open && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg flex flex-col">
          <div className="overflow-y-auto py-1">
            {filteredOptions.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">ไม่พบข้อมูล</div>
            ) : (
              filteredOptions.map((opt: any) => (
                <div key={opt.value} className="relative flex cursor-pointer select-none items-center rounded-md py-2.5 pl-8 pr-2 mx-1 text-sm outline-none hover:bg-gray-100" onClick={() => { onValueChange(opt.value); setOpen(false); setSearch(""); }}>
                  <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    {value === opt.value && <Check className="h-4 w-4 text-emerald-600" />}
                  </span>
                  {opt.label}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Popover = ({ open, onOpenChange, children }: any) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (open && wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        onOpenChange(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onOpenChange]);
  return <div ref={wrapperRef} className="relative w-full">{React.Children.map(children, child => React.cloneElement(child, { open, onOpenChange }))}</div>;
};
const PopoverTrigger = ({ asChild, children, open, onOpenChange }: any) => React.cloneElement(children, { onClick: () => onOpenChange(!open) });
const PopoverContent = ({ children, align = "center", className, open, style }: any) => {
  if (!open) return null;
  const aligns: any = { start: "left-0", center: "left-1/2 -translate-x-1/2", end: "right-0" };
  return <div style={style} className={cn("absolute z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden", aligns[align], className)}>{children}</div>;
};

// ==========================================
// 🔵 ส่วนที่ 3: CORE LOGIC & CONSTANTS
// (โค้ดสำหรับโปรเจกต์ของคุณเริ่มต้นที่นี่)
// ==========================================

interface LinkedEntity {
  type: "deal" | "customer" | "lead" | "quotation" | "todo";
  id: string;
  name: string;
}

const ENTITY_TYPES = [
  { value: "deal", label: "ดีล", icon: "🎯" },
  { value: "customer", label: "ลูกค้า", icon: "👤" },
  { value: "lead", label: "ลีด", icon: "✨" },
  { value: "quotation", label: "ใบเสนอราคา", icon: "📄" },
  { value: "todo", label: "To-Do อื่น", icon: "✅" },
];

const MOCK_ENTITIES = {
  deal: [
    { id: "DL-2024-001", name: "Ocean Freight Contract - Global Logistics" },
    { id: "DL-2024-002", name: "Air Express Partnership - FastTrack" },
  ],
  customer: [
    { id: "CUST-001", name: "Global Freight Solutions Inc." },
    { id: "CUST-002", name: "Pacific Distribution Co." },
    { id: "CUST-003", name: "FastTrack Express" },
  ],
  lead: [
    { id: "LEAD-001", name: "Global Traders Ltd." },
  ],
  quotation: [],
  todo: [],
};

const activityTypesList = [
  { value: "online_meeting", label: "ประชุมออนไลน์ / Zoom, Teams, Google Meet" },
  { value: "sales_meeting", label: "ประชุมทีมขาย" },
  { value: "internal_meeting", label: "ประชุมภายใน / ทบทวนแผนกับทีม" },
  { value: "customer_visit_our_site", label: "ลูกค้ามาพบที่ออฟฟิศ / คลัง" },
  { value: "visit_customer_site", label: "ไปพบลูกค้าที่ออฟฟิศ / คลัง" },
  { value: "other", label: "อื่นๆ" }
];

const serviceNames = {
  freight: 'Freight',
  customs: 'Customs',
  warehouse: 'Warehouse',
  transport: 'Transport',
  crossborder: 'Cross-border',
  trading: 'Trading',
  service: 'Service',
  other: 'Other'
};

const servicesList = Object.entries(serviceNames).map(([key, value]) => ({
  value: key,
  label: value,
}));

interface QuickCreateTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuickCreateTaskDialog({ isOpen, onClose }: QuickCreateTaskDialogProps) {
  const { t } = useTranslation();
  
  const initialFormState = {
    titleType: ["นัดหมายลูกค้า"] as string[],
    customTitle: "",
    description: "",
    dueDate: "",
    priority: "",
    assignees: [] as string[], // มอบหมายให้ (To-Do)
    attendees: [] as string[], // ผู้รับผิดชอบ/เข้าร่วม (Activity)
    purpose: "",
    visibility: "private",
    sharedWith: [] as string[],
    
    // ฟิลด์สำหรับ Activity Mode
    interactionType: "online_meeting",
    date: new Date().toISOString().split("T")[0],
    startTime: "09:00",
    endTime: "10:00",
    location: "",
    siteBranch: "",
    customer: "CUST-003",
    customerContacts: [] as string[],
    services: ["freight", "warehouse"] as string[],
  };

  const [formData, setFormData] = useState(initialFormState);
  const [openTitle, setOpenTitle] = useState(false);
  const [assigneeDropdownOpen, setAssigneeDropdownOpen] = useState(false);
  const [attendeeDropdownOpen, setAttendeeDropdownOpen] = useState(false);
  
  // States for linked entities
  const [linkedEntities, setLinkedEntities] = useState<LinkedEntity[]>([]);
  const [linkDropdownOpen, setLinkDropdownOpen] = useState(false);
  const [selectedEntityType, setSelectedEntityType] = useState<string>("deal");
  const [searchQuery, setSearchQuery] = useState("");

  // States for Activity UI
  const [customers, setCustomers] = useState([...MOCK_ENTITIES.customer, ...MOCK_ENTITIES.lead]);
  const [openCustomer, setOpenCustomer] = useState(false);
  const [openService, setOpenService] = useState(false);
  const [customerSearch, setCustomerSearch] = useState("");
  const [contactInput, setContactInput] = useState("");
  const [showCreateLead, setShowCreateLead] = useState(false);
  const [leadData, setLeadData] = useState({ email: "", phone: "" });

  const teamMembers = [
    { id: "somchai-wongsakul", name: "สมชาย วงศ์สกุล" }, // Matches TasksScreen currentUser
    { id: "anucha-srisawat", name: "อนุชา ศรีสวัสดิ์" },
    { id: "wipawee-chancharoen", name: "วิภาวี จันทร์เจริญ" },
  ];

  // เป็นโหมด Activity หากใน Array ของหัวข้องาน มีคำว่า "นัดหมายลูกค้า" หรือ "เข้าพบลูกค้า"
  const isActivityMode = formData.titleType.includes("นัดหมายลูกค้า") || formData.titleType.includes("เข้าพบลูกค้า");

  const getSelectedNames = (ids: string[]) => {
    if (ids.length === 0) return "เลือกพนักงาน...";
    if (ids.length === 1) {
      const member = teamMembers.find(m => m.id === ids[0]);
      return member?.name || "";
    }
    return `${ids.length} คนที่เลือก`;
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Smart Autofill: เมื่อเลือกมอบหมาย (Assignee) ให้เพิ่มเข้าในผู้เข้าร่วม (Attendees) ด้วย
  const handleAssigneeToggle = (personId: string) => {
    let newAssignees;
    let newAttendees = [...formData.attendees];

    if (formData.assignees.includes(personId)) {
      newAssignees = formData.assignees.filter((id) => id !== personId);
      // Optional: ถ้าเอาออก อาจจะเอาออกจากผู้เข้าร่วมด้วย
      newAttendees = newAttendees.filter(id => id !== personId);
    } else {
      newAssignees = [...formData.assignees, personId];
      // เติมอัตโนมัติในผู้เข้าร่วม
      if (!newAttendees.includes(personId)) {
        newAttendees.push(personId);
      }
    }
    
    setFormData(prev => ({
      ...prev,
      assignees: newAssignees,
      attendees: newAttendees
    }));
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setOpenTitle(false);
    setLinkedEntities([]);
    setContactInput("");
    setCustomerSearch("");
    setShowCreateLead(false);
  };

  const handleCancel = () => {
    if (onClose) onClose();
    resetForm();
  };

  const handleAddContact = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && contactInput.trim()) {
      e.preventDefault();
      if (!formData.customerContacts.includes(contactInput.trim())) {
        updateField("customerContacts", [...formData.customerContacts, contactInput.trim()]);
      }
      setContactInput("");
    }
  };

  const handleCreateLead = () => {
    if (!customerSearch.trim()) return;
    const newCustomer = {
      id: `LEAD-NEW-${Date.now()}`,
      name: customerSearch,
      email: leadData.email,
      phone: leadData.phone
    };
    setCustomers([...customers, newCustomer as any]);
    updateField("customer", newCustomer.id);
    setLeadData({ email: "", phone: "" });
    setCustomerSearch("");
    setShowCreateLead(false);
    setOpenCustomer(false);
    toast.success(`สร้างลีด ${newCustomer.name} เรียบร้อยแล้ว`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.titleType.length === 0) {
      toast.error("โปรดเลือกประเภทงานอย่างน้อย 1 หัวข้อ");
      return;
    }

    if (!formData.priority) {
      toast.error("โปรดเลือกระดับความสำคัญของงาน");
      return;
    }

    // ตรวจสอบข้อมูลคนรับผิดชอบ
    if (formData.assignees.length === 0) {
      toast.error("โปรดเลือกพนักงานที่ต้องการ 'มอบหมายให้' อย่างน้อย 1 คน");
      return;
    }

    // New Validations
    if (!isActivityMode && !formData.dueDate) {
      toast.error("โปรดระบุวันกำหนดส่งงาน");
      return;
    }

    if (isActivityMode) {
      if (!formData.date) {
        toast.error("โปรดระบุวันที่ของกิจกรรม");
        return;
      }
      if (!formData.startTime || !formData.endTime) {
        toast.error("โปรดระบุเวลาเริ่มและสิ้นสุดกิจกรรม");
        return;
      }
      if (!formData.customer) {
        toast.error("โปรดเลือกลูกค้าหรือลีดที่เกี่ยวข้องกับกิจกรรม");
        return;
      }
    }
    
    if (isActivityMode && formData.attendees.length === 0) {
      toast.error("โปรดเลือก 'ผู้รับผิดชอบ / เข้าร่วม' กิจกรรม อย่างน้อย 1 คน");
      return;
    }
    
    // สร้างชื่อจากหัวข้อหลายๆ อันมารวมกัน
    const selectedLabels = formData.titleType
      .filter(t => t !== "other")
      .map(t => TITLE_TYPES.find(tt => tt.value === t)?.label.split(' - ')[0]);
    
    if (formData.titleType.includes("other") && formData.customTitle) {
      selectedLabels.push(formData.customTitle);
    }
    const finalTitle = selectedLabels.join(", ") || "ไม่มีหัวข้อ";
    const upsertRecord = useModuleStore.getState().upsertRecord;

    let titleType = "";
    if (formData.titleType.includes("นัดหมายลูกค้า")) {
      titleType = "นัดหมายลูกค้า - Schedule meeting";
    } else if (formData.titleType.includes("เข้าพบลูกค้า")) {
      titleType = "เข้าพบลูกค้า - Visit customer";
    }

    // Find customer name from ID
    const customerObj = [...MOCK_ENTITIES.customer, ...MOCK_ENTITIES.lead].find(c => c.id === formData.customer);
    const customerName = customerObj ? customerObj.name : formData.customer;

    const taskData = {
      title: finalTitle,
      description: formData.description,
      priority: formData.priority,
      status: 'todo',
      dueDate: isActivityMode ? formData.date : formData.dueDate,
      dueTime: isActivityMode ? formData.startTime : '',
      assignees: formData.assignees,
      // Map the first assignee ID to the singular name expected by TasksScreen
      assignee: teamMembers.find(m => m.id === formData.assignees[0])?.name || "สมชาย วงศ์สกุล",
      attendees: formData.attendees,
      isActivity: isActivityMode,
      titleType: titleType,
      linkedEntities: linkedEntities,
      customer: customerName,
      location: formData.location,
      serviceTopics: formData.services,
      customerContacts: formData.customerContacts,
    };

    upsertRecord('tasks', taskData);

    if (isActivityMode) {
      // Data Mockup for submission
      toast.success(`สร้าง To-Do และ Activity: ${finalTitle}`);
    } else {
      toast.success(`สร้างงาน: ${finalTitle}`);
    }

    if(onClose) onClose();
    resetForm();
  };

  const addLinkedEntity = (entity: any) => {
    const newLink: LinkedEntity = {
      type: selectedEntityType as any,
      id: entity.id,
      name: entity.name,
    };
    
    const alreadyLinked = linkedEntities.some(
      e => e.type === newLink.type && e.id === newLink.id
    );
    
    if (alreadyLinked) {
      toast.error("รายการนี้เชื่อมโยงอยู่แล้ว");
      return;
    }
    
    setLinkedEntities(prev => [...prev, newLink]);
    setSearchQuery("");
    toast.success(`เชื่อมโยงกับ ${entity.name} แล้ว`);
  };

  const removeLinkedEntity = (index: number) => {
    setLinkedEntities(prev => prev.filter((_, i) => i !== index));
    toast.info("ยกเลิกการเชื่อมโยง");
  };

  const getEntityIcon = (type: string) => {
    return ENTITY_TYPES.find(t => t.value === type)?.icon || "📌";
  };

  const filteredEntities = useMemo(() => {
    return MOCK_ENTITIES[selectedEntityType as keyof typeof MOCK_ENTITIES]?.filter(
      (entity: any) => entity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                entity.id.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];
  }, [selectedEntityType, searchQuery]);

  const filteredCustomers = useMemo(() => {
    return customers.filter(c => c.name.toLowerCase().includes(customerSearch.toLowerCase()));
  }, [customers, customerSearch]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn("bg-white border-gray-200 overflow-y-auto max-h-[90vh]", isActivityMode ? 'max-w-3xl' : 'max-w-2xl')}>
        
        {/* Header ส่วนบนสุด */}
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
            {isActivityMode ? (
              <>
                <Calendar className="w-5 h-5 text-emerald-600" strokeWidth={2.5} /> 
                สร้างงานใหม่ & กิจกรรม
              </>
            ) : (
              "สร้างงานใหม่"
            )}
          </DialogTitle>
          <DialogDescription className="text-gray-500 mt-1">
            {isActivityMode 
              ? "สร้างการแจ้งเตือนงาน พร้อมบันทึกรายละเอียดกิจกรรมลงปฏิทิน"
              : "เพิ่มงานใหม่และมอบหมายให้ทีม"
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} noValidate className="space-y-6 mt-1">
          
          {/* ========================================= */}
          {/* แถวที่ 1: Task Title & Priority */}
          {/* ========================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Task Title / ประเภทงาน (Multi-Select) */}
            <div className="space-y-2">
              <Label htmlFor="titleType" className="text-gray-900">
                หัวข้อ To do <span className="text-red-500">*</span>
              </Label>
              
              <Popover open={openTitle} onOpenChange={setOpenTitle}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full flex items-center justify-between bg-white border-gray-200 hover:bg-gray-50 font-normal px-3 py-2 shadow-sm text-left h-10">
                    <span className={cn("flex-1 truncate text-left text-sm", formData.titleType.length === 0 ? "text-gray-400" : "text-gray-700")}>
                      {formData.titleType.length === 0 
                        ? "เลือกประเภทงาน..." 
                        : formData.titleType.length === 1 
                          ? TITLE_TYPES.find(t => t.value === formData.titleType[0])?.label.split(' - ')[0] 
                          : `${formData.titleType.length} หัวข้อที่เลือก`}
                    </span>
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-40" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-2 w-[340px] sm:w-[400px]" align="start">
                  <div className="max-h-[280px] overflow-y-auto space-y-1">
                    {TITLE_TYPES.map((type) => (
                      <div 
                        key={type.value} 
                        className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer rounded-md text-sm"
                        onClick={() => {
                          const isSelected = formData.titleType.includes(type.value);
                          if (isSelected) {
                            updateField("titleType", formData.titleType.filter((t: string) => t !== type.value));
                          } else {
                            updateField("titleType", [...formData.titleType, type.value]);
                          }
                        }}
                      >
                        <Checkbox checked={formData.titleType.includes(type.value)} className="pointer-events-none rounded-[4px]" />
                        <span className="text-gray-700">{type.label}</span>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              {/* แสดง Tags ของหัวข้อที่เลือกไว้ */}
              {formData.titleType.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {formData.titleType.map((tt) => {
                    if (tt === "other") return null;
                    const typeObj = TITLE_TYPES.find(t => t.value === tt);
                    return (
                      <Badge key={tt} variant="outline" className="bg-gray-100 text-gray-800 border-gray-200 font-medium rounded-md px-2 py-1">
                        {typeObj ? typeObj.label.split(' - ')[0] : tt}
                        <button type="button" onClick={() => updateField("titleType", formData.titleType.filter((t: string) => t !== tt))} className="ml-1.5 hover:text-red-500">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    );
                  })}
                </div>
              )}

              {/* ช่องกรอกเมื่อเลือก "อื่นๆ" */}
              {formData.titleType.includes("other") && (
                <div className="mt-2 animate-in fade-in slide-in-from-top-1">
                  <Input
                    id="customTitle"
                    value={formData.customTitle}
                    onChange={(e) => updateField("customTitle", e.target.value)}
                    placeholder="โปรดระบุหัวข้องานอื่นๆ..."
                    className="border-gray-200 shadow-sm"
                    autoFocus
                  />
                </div>
              )}
            </div>

            {/* ความสำคัญ (Priority) */}
            <div className="space-y-2">
              <Label htmlFor="priority" className="text-gray-900">
                ความสำคัญ <span className="text-red-500">*</span>
              </Label>
              <Combobox
                options={[
                  { value: "high", label: `🔴 สูง` },
                  { value: "medium", label: `🟠 ปานกลาง` },
                  { value: "low", label: `🔵 ต่ำ` },
                ]}
                value={formData.priority}
                onValueChange={(value: string) => updateField("priority", value)}
                placeholder="เลือกระดับความสำคัญ"
                className="border-gray-200 bg-white shadow-sm"
              />
            </div>
          </div>

          {/* ========================================= */}
          {/* แถวที่ 2: Assignee, Attendees, Due Date */}
          {/* ========================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* มอบหมายให้ (To-Do) */}
            <div className="space-y-2">
              <Label className="text-gray-900">
                มอบหมายให้ (ผู้รับผิดชอบ) <span className="text-red-500">*</span>
              </Label>
              <Popover open={assigneeDropdownOpen} onOpenChange={setAssigneeDropdownOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-between h-10 border-gray-200 hover:bg-gray-50 font-normal bg-white shadow-sm text-left px-3"
                  >
                    <span className={cn("flex-1 truncate text-left text-sm", formData.assignees.length === 0 ? "text-gray-400" : "text-gray-900")}>
                      {getSelectedNames(formData.assignees) || "เลือกพนักงานผู้รับผิดชอบ"}
                    </span>
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-40" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-1 bg-white" align="start" style={{ width: '280px' }}>
                  <div className="max-h-[240px] overflow-y-auto py-1">
                    {teamMembers.map((person) => (
                      <div
                        key={`ass-${person.id}`}
                        className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 cursor-pointer rounded-md transition-colors"
                        onClick={() => handleAssigneeToggle(person.id)}
                      >
                        <Checkbox checked={formData.assignees.includes(person.id)} className="pointer-events-none rounded-[4px]" />
                        <span className="text-sm text-gray-700 font-medium">{person.name}</span>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* แสดง Attendees (ถ้าโหมด Activity) หรือ Due Date (ถ้าโหมด Task ปกติ) */}
            {isActivityMode ? (
              <div className="space-y-2">
                <Label className="text-gray-900">
                  ผู้ที่ต้องเข้าร่วม (กิจกรรม) <span className="text-red-500">*</span>
                </Label>
                <Popover open={attendeeDropdownOpen} onOpenChange={setAttendeeDropdownOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-between h-10 border-gray-200 hover:bg-gray-50 font-normal bg-white shadow-sm text-left px-3"
                    >
                      <span className={cn("flex-1 truncate text-left text-sm", formData.attendees.length === 0 ? "text-gray-400" : "text-gray-900")}>
                        {getSelectedNames(formData.attendees)}
                      </span>
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-40" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-1 bg-white" align="start" style={{ width: '280px' }}>
                    <div className="max-h-[240px] overflow-y-auto py-1">
                      {teamMembers.map((person) => (
                        <div
                          key={`att-${person.id}`}
                          className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 cursor-pointer rounded-md transition-colors"
                          onClick={() => {
                            if (formData.attendees.includes(person.id)) {
                              updateField("attendees", formData.attendees.filter((id) => id !== person.id));
                            } else {
                              updateField("attendees", [...formData.attendees, person.id]);
                            }
                          }}
                        >
                          <Checkbox checked={formData.attendees.includes(person.id)} className="pointer-events-none rounded-[4px]" />
                          <span className="text-sm text-gray-700 font-medium">{person.name}</span>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="dueDate" className="text-gray-900">กำหนดส่ง <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Input
                    id="dueDate"
                    type="datetime-local" 
                    value={formData.dueDate}
                    onChange={(e) => updateField("dueDate", e.target.value)}
                    className="border-gray-200 shadow-sm"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            )}
          </div>

          {/* ========================================= */}
          {/* ข้อมูลโหมด ACTIVITY (กล่องสีเขียวตาม Design) */}
          {/* ========================================= */}
          {isActivityMode && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 bg-[#f4fcf7] p-5 sm:p-6 rounded-2xl border border-[#e6f5ed]">
              
              {/* Row 1: Date, Start, End */}
              <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-3 sm:col-span-1 w-full">
                <div className="space-y-1.5">
                  <Label className="text-emerald-900 text-xs">วันที่ <span className="text-red-500">*</span></Label>
                  <Input type="date" value={formData.date} onChange={(e) => updateField("date", e.target.value)} className="h-9 px-2 text-sm border-gray-200" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-emerald-900 text-xs">เริ่ม <span className="text-red-500">*</span></Label>
                  <Input type="time" value={formData.startTime} onChange={(e) => updateField("startTime", e.target.value)} className="h-9 px-2 text-sm border-gray-200" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-emerald-900 text-xs">สิ้นสุด <span className="text-red-500">*</span></Label>
                  <Input type="time" value={formData.endTime} onChange={(e) => updateField("endTime", e.target.value)} className="h-9 px-2 text-sm border-gray-200" />
                </div>
              </div>
              <div className="hidden sm:block"></div> {/* Spacer for right side of Row 1 */}

              {/* Row 2: Interaction Type & Services */}
              <div className="space-y-1.5">
                <Label className="text-emerald-900 text-xs">ประเภทกิจกรรมการเข้าพบ <span className="text-red-500">*</span></Label>
                <Combobox
                  options={activityTypesList}
                  value={formData.interactionType}
                  onValueChange={(val: string) => updateField("interactionType", val)}
                  placeholder="เลือกรูปแบบ..."
                  className="h-9 border-gray-200"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-emerald-900 text-xs">หัวข้อบริการที่เกี่ยวข้อง</Label>
                <Popover open={openService} onOpenChange={setOpenService}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full flex items-center justify-between bg-white border-gray-200 hover:bg-gray-50 font-normal h-9 px-3 text-left">
                      <span className={cn("flex-1 truncate text-left text-sm", formData.services.length === 0 ? "text-gray-400" : "text-gray-700")}>
                        <div className="flex items-center">
                          <Briefcase className="w-4 h-4 mr-2 opacity-40 shrink-0" />
                          {formData.services.length === 0 ? "เลือกหัวข้อบริการ" : `${formData.services.length} บริการที่เลือก`}
                        </div>
                      </span>
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-40" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-2 w-[280px]" align="start">
                    <div className="max-h-[200px] overflow-y-auto space-y-1">
                      {servicesList.map((service) => (
                        <div 
                          key={service.value} 
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer rounded-md text-sm"
                          onClick={() => {
                            const isSelected = formData.services.includes(service.value);
                            if (isSelected) {
                              updateField("services", formData.services.filter(s => s !== service.value));
                            } else {
                              updateField("services", [...formData.services, service.value]);
                            }
                          }}
                        >
                          <Checkbox checked={formData.services.includes(service.value)} className="pointer-events-none rounded-[4px]" />
                          <span className="text-gray-700">{service.label}</span>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                
                {/* Selected Services Tags */}
                {formData.services.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {formData.services.map((svc) => (
                      <Badge key={svc} variant="outline" className="bg-[#ccfbf1] text-emerald-800 border-[#99f6e4] font-medium rounded-md px-2 py-0.5">
                        {serviceNames[svc as keyof typeof serviceNames]}
                        <button type="button" onClick={() => updateField("services", formData.services.filter(s => s !== svc))} className="ml-1 hover:text-red-500">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Row 3: Location & Branch */}
              <div className="space-y-1.5">
                <Label className="text-emerald-900 text-xs">สถานที่ / ห้องประชุม</Label>
                <Input value={formData.location} onChange={(e) => updateField("location", e.target.value)} placeholder="เช่น ห้องประชุม 1" className="h-9 border-gray-200" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-emerald-900 text-xs">สาขา / ไซด์งาน</Label>
                <Input value={formData.siteBranch} onChange={(e) => updateField("siteBranch", e.target.value)} placeholder="เช่น สำนักงานใหญ่" className="h-9 border-gray-200" />
              </div>

              {/* Row 4: Customer & Contacts */}
              <div className="space-y-1.5">
                <Label className="text-emerald-900 text-xs">ลูกค้า / ลีด ที่เกี่ยวข้อง</Label>
                <Popover open={openCustomer} onOpenChange={setOpenCustomer}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full flex items-center justify-between bg-white border-gray-200 hover:bg-gray-50 font-normal px-3 h-9 text-left">
                      <span className={cn("flex-1 truncate text-left text-sm", !formData.customer && "text-gray-400")}>
                        {formData.customer ? (
                          customers.find((c) => c.id === formData.customer)?.name
                        ) : (
                          "เลือกหรือค้นหาลูกค้า..."
                        )}
                      </span>
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-40" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-[300px]" align="start">
                    <div className="p-2 border-b bg-white">
                      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-md px-2 h-9">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input 
                          placeholder="พิมพ์ชื่อบริษัท..." 
                          value={customerSearch} 
                          onChange={e => setCustomerSearch(e.target.value)} 
                          className="w-full h-full bg-transparent focus:outline-none px-2 text-sm" 
                        />
                      </div>
                    </div>
                    <div className="max-h-[200px] overflow-y-auto p-1 bg-white">
                      {filteredCustomers.length > 0 ? (
                        filteredCustomers.map(c => (
                          <div 
                            key={c.id} 
                            onClick={() => { updateField("customer", c.id); setOpenCustomer(false); }}
                            className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer rounded-md text-sm text-gray-700"
                          >
                            <span className="flex-1 truncate">{c.name}</span>
                            {formData.customer === c.id && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                          </div>
                        ))
                      ) : (
                        <div className="p-3 text-center">
                          <p className="text-sm text-gray-500 mb-2">ไม่พบลูกค้า "{customerSearch}"</p>
                          <Button type="button" variant="outline" size="sm" onClick={() => setShowCreateLead(true)} className="w-full">
                            <UserPlus className="w-4 h-4 mr-2" /> เพิ่มลีดใหม่
                          </Button>
                        </div>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-1.5">
                <Label className="text-emerald-900 text-xs">รายชื่อผู้ติดต่อฝั่งลูกค้า (พิมพ์ชื่อแล้วกด Enter)</Label>
                <div className="flex flex-col gap-2">
                  <Input 
                    value={contactInput} 
                    onChange={(e) => setContactInput(e.target.value)} 
                    onKeyDown={handleAddContact} 
                    placeholder="ระบุผู้ติดต่อ แล้วกด Enter..." 
                    className="h-9 border-gray-200" 
                  />
                  {formData.customerContacts.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {formData.customerContacts.map((name, idx) => (
                        <span key={idx} className="inline-flex items-center bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-xs border border-gray-200">
                          {name}
                          <button type="button" onClick={() => updateField("customerContacts", formData.customerContacts.filter(c => c !== name))} className="ml-1 hover:text-red-500">
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Description (วาระการประชุม / รายละเอียดงาน) */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-900">
              {isActivityMode ? "วาระการประชุม / รายละเอียดงาน" : "รายละเอียดงาน"}
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="เพิ่มรายละเอียด..."
              className="border-gray-200 focus:border-emerald-500 min-h-[100px] bg-white shadow-sm"
              rows={4}
            />
          </div>

          {/* === ส่วนของการเกี่ยวข้องกับ & Visibility === */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Linked Entities (เกี่ยวข้องกับ) */}
            <div className="space-y-2">
              <Label className="text-gray-900">เกี่ยวข้องกับ</Label>
              <Popover open={linkDropdownOpen} onOpenChange={setLinkDropdownOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-between h-10 border-gray-200 hover:bg-gray-50 font-normal bg-white shadow-sm text-left px-3"
                  >
                    <span className={cn("flex-1 truncate text-left text-sm", linkedEntities.length === 0 ? "text-gray-400" : "text-gray-900")}>
                      {linkedEntities.length === 0 ? "เลือกลายการที่เกี่ยวข้อง" : `${linkedEntities.length} รายการที่เชื่อมโยง`}
                    </span>
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-40" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 bg-white shadow-xl border border-gray-200" align="start" style={{ width: '420px' }}>
                  <div className="p-3 space-y-3">
                    <div className="flex gap-2 flex-wrap">
                      {ENTITY_TYPES.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => { setSelectedEntityType(type.value); setSearchQuery(""); }}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            selectedEntityType === type.value
                              ? "bg-emerald-500 text-white shadow-sm"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          <span className="mr-1">{type.icon}</span>{type.label}
                        </button>
                      ))}
                    </div>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder={`ค้นหา${ENTITY_TYPES.find(t => t.value === selectedEntityType)?.label}...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-9 text-sm pl-9 border-gray-200"
                      />
                    </div>
                    <div className="max-h-[240px] overflow-y-auto space-y-1">
                      {filteredEntities.length > 0 ? (
                        filteredEntities.map((entity) => {
                          const isLinked = linkedEntities.some(e => e.type === selectedEntityType && e.id === entity.id);
                          return (
                            <div
                              key={entity.id}
                              onClick={() => !isLinked && addLinkedEntity(entity)}
                              className={`flex items-center justify-between px-3 py-2.5 rounded-md cursor-pointer transition-colors ${
                                isLinked ? "bg-emerald-50 cursor-not-allowed opacity-70" : "hover:bg-gray-50"
                              }`}
                            >
                              <div className="min-w-0 flex-1">
                                <p className="text-xs font-medium text-gray-900 truncate">{entity.name}</p>
                                <p className="text-[10px] text-gray-500">{entity.id}</p>
                              </div>
                              {isLinked && <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0 ml-2" />}
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-xs text-gray-500 text-center py-6">ไม่พบข้อมูล</p>
                      )}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* การแสดงรายการเชื่อมโยงที่เลือกไว้ */}
              {linkedEntities.length > 0 && (
                <div className="mt-3 space-y-2">
                  {linkedEntities.map((entity, index) => (
                    <div key={`${entity.type}-${entity.id}-${index}`} className="flex items-center justify-between bg-gray-50 rounded-lg p-2 border border-gray-200">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <span className="text-base">{getEntityIcon(entity.type)}</span>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-gray-900 truncate">{entity.name}</p>
                          <p className="text-[10px] text-gray-500">{entity.id}</p>
                        </div>
                      </div>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeLinkedEntity(index)} className="h-7 w-7 p-0 hover:bg-red-50 flex-shrink-0">
                        <X className="h-3 w-3 text-red-600" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Visibility / การแชร์งาน */}
            <div className="space-y-2">
              <Label htmlFor="visibility" className="text-gray-900">
                การแชร์งาน (Visibility)
              </Label>
              <Combobox
                options={[
                  { value: "private", label: "🔒 Private - เฉพาะตัวเองเห็นได้" },
                  { value: "public", label: "👥 Public - เลือกคนที่ต้องการแชร์" },
                  { value: "organization", label: "🌐 Public by Organization - ทุกคนเห็นได้" },
                ]}
                value={formData.visibility}
                onValueChange={(value: string) => updateField("visibility", value)}
                className="border-gray-200 shadow-sm"
              />
            </div>
            
            {/* Share with specifics (Spans full width if shown) */}
            {formData.visibility === "public" && (
              <div className="mt-1 p-4 bg-gray-50 rounded-lg border border-gray-200 sm:col-span-2">
                <Label className="text-xs font-semibold text-gray-700 mb-3 block">เลือกคนที่ต้องการแชร์ (Select people to share with)</Label>
                <div className="grid grid-cols-2 gap-3">
                  {teamMembers.map((person) => (
                    <div key={person.id} className="flex items-center gap-2">
                      <Checkbox
                        id={`share-${person.id}`}
                        checked={formData.sharedWith.includes(person.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateField("sharedWith", [...formData.sharedWith, person.id]);
                          } else {
                            updateField("sharedWith", formData.sharedWith.filter((id) => id !== person.id));
                          }
                        }}
                      />
                      <label htmlFor={`share-${person.id}`} className="text-sm text-gray-700 cursor-pointer truncate">
                        {person.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-8 mt-4 border-t border-gray-100">
            <Button type="button" variant="outline" onClick={handleCancel} className="w-full sm:w-auto border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 h-10 px-6 rounded-lg">
              ยกเลิก
            </Button>
            <Button type="submit" className="w-full sm:w-auto bg-[#059669] hover:bg-[#047857] text-white font-semibold shadow-sm h-10 px-6 rounded-lg">
              {isActivityMode ? "สร้าง To-Do และบันทึกกิจกรรม" : "บันทึกข้อมูล"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ==========================================
// 🟢 ส่วนที่ 4: APP WRAPPER สำหรับการ PREVIEW
// ==========================================

export default function App() {
  const [open, setOpen] = useState(true);
  const [toastMsg, setToastMsg] = useState<{msg: string, type: string} | null>(null);

  useEffect(() => {
    const handleToast = (e: any) => {
      setToastMsg(e.detail);
      setTimeout(() => setToastMsg(null), 3000);
    };
    toastEmitter.addEventListener('show-toast', handleToast);
    return () => toastEmitter.removeEventListener('show-toast', handleToast);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center max-w-md w-full">
        <h1 className="text-xl font-bold text-gray-900 mb-2">ทดสอบฟอร์มสร้างกิจกรรม</h1>
        <p className="text-gray-500 mb-6 text-sm">คลิกปุ่มด้านล่างเพื่อเปิดแบบฟอร์ม</p>
        <Button onClick={() => setOpen(true)} className="w-full bg-[#059669] hover:bg-[#047857]">
          <Plus className="mr-2 h-4 w-4" /> เปิดฟอร์มสร้างงาน
        </Button>
      </div>

      <QuickCreateTaskDialog isOpen={open} onClose={() => setOpen(false)} />

      {/* Toast Notification */}
      {toastMsg && (
        <div className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-lg text-sm font-medium animate-in fade-in slide-in-from-bottom-5 z-[100] flex items-center gap-2 ${
          toastMsg.type === 'error' ? 'bg-red-600 text-white' : 'bg-gray-900 text-white'
        }`}>
          {toastMsg.type === 'error' ? <X className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          {toastMsg.msg}
        </div>
      )}
    </div>
  );
}
export { QuickCreateTaskDialog as CreateTaskDialog };