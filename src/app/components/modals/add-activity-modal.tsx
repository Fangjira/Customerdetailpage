import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import {
  X,
  Calendar as CalendarIcon,
  ChevronsUpDown,
  Check,
  UserPlus,
  Search,
  Building2,
  Briefcase
} from "lucide-react";
import { cn } from "../ui/utils";
import { Badge } from "../ui/badge";

const teamMembers = [
  { id: "u1", name: "John Doe (Sales)" },
  { id: "u2", name: "Jane Smith (Manager)" },
  { id: "u3", name: "Somchai (Engineer)" },
  { id: "u4", name: "Somsri (Support)" },
];

const initialCustomers = [
  { id: "c1", name: "SCG Logistics", contact: "Khun A" },
  { id: "c2", name: "WHA Corporation", contact: "Khun B" },
  { id: "c3", name: "Kerry Express", contact: "Khun C" },
];

const activityTypesList = [
  { value: "online_meeting", label: "ประชุมออนไลน์ / Zoom, Teams, Google Meet" },
  { value: "sales_meeting", label: "ประชุมทีมขาย" },
  { value: "internal_meeting", label: "ประชุมภายใน / ทบทวนแผนกับทีม" },
  { value: "customer_onboarding", label: "เริ่มต้นดูแลลูกค้า / แนะนำการใช้งานบริการ" },
  { value: "product_presentation", label: "นำเสนอผลิตภัณฑ์" },
  { value: "contract_signing", label: "เซ็นสัญญา" },
  { value: "site_survey", label: "สำรวจสถานที่ / ตรวจพื้นที่ก่อนเริ่มบริการ" },
  { value: "problem_solving", label: "แก้ไขปัญหา / Complaint Handling" },
  { value: "customer_visit_our_site", label: "ลูกค้ามาพบที่ออฟฟิศ / คลัง" },
  { value: "visit_customer_site", label: "ไปพบลูกค้าที่ออฟฟิศ / คลัง" },
  { value: "follow_up_call", label: "โทรสอบถาม / ติดตามดีล" },
  { value: "sales_negotiation", label: "เจรจาการขาย / ต่อรองราคา" },
  { value: "reference_visit", label: "พาไปชมไซต์ลูกค้ารายอื่น" },
  { value: "business_lunch", label: "รับประทานอาหารกลางวัน / เย็น" },
  { value: "leisure_activities", label: "เล่นกอล์ฟ / ดูคอนเสิร์ต / งานเลี้ยง" },
  { value: "holiday_gift_visit", label: "เยี่ยมช่วงเทศกาล / ส่งของขวัญ" },
  { value: "trade_show", label: "พบลูกค้าในงานแสดงสินค้า" },
  { value: "workshop_seminar", label: "จัดสัมมนา / อบรมให้ลูกค้า" }
];

const serviceNames = {
  freight: 'Freight',
  customs: 'Customs',
  warehouse: 'Warehouse',
  transport: 'Transport',
  crossborder: 'Cross-border',
  trading: 'Trading',
  service: 'Service',
  other: 'Other',
  unknown: 'Unknown'
};

const servicesList = Object.entries(serviceNames).map(([key, value]) => ({
  value: key,
  label: value,
}));

type ActivityType = string;
type ActivityStatus = "planned" | "completed" | "cancelled";

interface Activity {
  id: string;
  title: string;
  type: ActivityType;
  status: ActivityStatus;
  interactionType?: string;
  startTime: Date;
  endTime: Date;
  location?: string;
  siteBranch?: string;
  customer?: string;
  customerContacts?: string[]; 
  customerAddress?: string;
  customerPhone?: string;
  assignedTo: string;
  attendees?: string[]; 
  notes?: string;
  relatedDeal?: string;
  relatedContract?: string;
  services?: string[];
}

interface AddActivityModalProps {
  activity?: Activity | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (activityData: any) => void; 
}

const formatTimeForInput = (date?: Date) => {
  if (!date) return "";
  return date.toTimeString().slice(0, 5);
};

const formatDateForInput = (date?: Date) => {
  if (!date) return "";
  return date.toISOString().split("T")[0];
};

export function AddActivityModal({
  activity,
  isOpen,
  onClose,
  onSave,
}: AddActivityModalProps) {
  const { t } = useTranslation();

  // --- States ---
  const [formData, setFormData] = useState({
    title: "",
    type: "customer_visit",
    interactionType: "",
    date: formatDateForInput(new Date()),
    startTime: "09:00",
    endTime: "10:00",
    location: "",
    siteBranch: "",
    customer: "",
    customerContacts: [] as string[],
    assignedTo: "You",
    attendees: [] as string[],
    notes: "",
    services: [] as string[],
  });

  const [customers, setCustomers] = useState(initialCustomers);

  // States สำหรับ Popovers ควบคุมการเปิดปิด
  const [openType, setOpenType] = useState(false);
  const [openCustomer, setOpenCustomer] = useState(false);
  const [openAttendee, setOpenAttendee] = useState(false);
  const [openService, setOpenService] = useState(false);

  // States สำหรับ Tag Input ฝั่งลูกค้า
  const [contactInput, setContactInput] = useState("");

  // States สำหรับการสร้าง Lead ใหม่ที่แก้ไขให้ตรงกับ UI
  const [customerSearch, setCustomerSearch] = useState("");
  const [showCreateLead, setShowCreateLead] = useState(false);
  const [leadData, setLeadData] = useState({ email: "", phone: "" });

  useEffect(() => {
    if (isOpen) {
      if (activity) {
        setFormData({
          title: activity.title || "",
          type: activity.type || "customer_visit",
          interactionType: activity.interactionType || "",
          date: formatDateForInput(activity.startTime),
          startTime: formatTimeForInput(activity.startTime) || "09:00",
          endTime: formatTimeForInput(activity.endTime) || "10:00",
          location: activity.location || "",
          siteBranch: activity.siteBranch || "",
          customer: activity.customer || "",
          customerContacts: activity.customerContacts ? [...activity.customerContacts] : [],
          assignedTo: activity.assignedTo || "You",
          attendees: activity.attendees ? [...activity.attendees] : [],
          notes: activity.notes || "",
          services: activity.services ? [...activity.services] : [],
        });
      } else {
        // Clear Form for New
        setFormData({
          title: "",
          type: "customer_visit",
          interactionType: "",
          date: formatDateForInput(new Date()),
          startTime: "09:00",
          endTime: "10:00",
          location: "",
          siteBranch: "",
          customer: "",
          customerContacts: [],
          assignedTo: "You",
          attendees: [],
          notes: "",
          services: [],
        });
      }
      setContactInput("");
      setCustomerSearch("");
      setShowCreateLead(false);
      setLeadData({ email: "", phone: "" });
    }
  }, [isOpen, activity]);

  const updateField = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // --- Handlers: จัดการเพิ่ม/ลบ ผู้ติดต่อลูกค้า (Tag Input) ---
  const handleAddContact = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && contactInput.trim()) {
      e.preventDefault();
      if (!formData.customerContacts.includes(contactInput.trim())) {
        updateField("customerContacts", [...formData.customerContacts, contactInput.trim()]);
      }
      setContactInput("");
    }
  };

  const removeContact = (name: string) => {
    updateField("customerContacts", formData.customerContacts.filter((c) => c !== name));
  };

  // --- Handlers: จัดการลบ ผู้เข้าร่วมทีมเรา ---
  const removeAttendee = (name: string) => {
    updateField("attendees", formData.attendees.filter((a) => a !== name));
  };

  // --- Handlers: จัดการลบ หัวข้อบริการ ---
  const removeService = (serviceValue: string) => {
    updateField("services", formData.services.filter((s) => s !== serviceValue));
  };

  // --- Handlers: สร้าง Lead ใหม่ ---
  const handleCreateLead = () => {
    if (!customerSearch.trim()) return;
    
    // จำลองสร้าง ID ใหม่
    const newCustomer = {
      id: `new-${Date.now()}`,
      name: customerSearch,
      contact: "",
      email: leadData.email,
      phone: leadData.phone
    };

    // อัปเดต List และเลือกทันที
    setCustomers([...customers, newCustomer]);
    updateField("customer", newCustomer.id);
    
    // เคลียร์ค่าและปิด Popover
    setLeadData({ email: "", phone: "" });
    setCustomerSearch("");
    setShowCreateLead(false);
    setOpenCustomer(false);
  };

  // --- Submit ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const startDateTime = new Date(`${formData.date}T${formData.startTime}:00`);
    const endDateTime = new Date(`${formData.date}T${formData.endTime}:00`);

    const newActivityData = {
      id: activity?.id || `ACT-${Date.now().toString().slice(-4)}`,
      title: formData.title,
      type: formData.type,
      status: activity?.status || "planned",
      interactionType: formData.interactionType || undefined,
      startTime: startDateTime,
      endTime: endDateTime,
      location: formData.location,
      siteBranch: formData.siteBranch,
      customer: formData.customer,
      customerContacts: formData.customerContacts, 
      assignedTo: formData.assignedTo,
      attendees: formData.attendees,
      notes: formData.notes,
      services: formData.services,
      createdAt: activity ? undefined : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(newActivityData);
  };

  const isEditMode = !!activity;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl overflow-visible bg-white p-8 rounded-3xl border-none shadow-2xl max-h-[100vh] overflow-y-auto">
        <DialogHeader className="pb-4 mb-2">
          <div className="flex items-center gap-3">
            <div className="bg-[#f5f3ff] p-2 rounded-lg">
              <CalendarIcon className="h-6 w-6 text-[#705add]" />
            </div>
            <DialogTitle className="text-2xl font-bold text-[#2d1b69]">
              {isEditMode ? t("calendar.edit_activity") || "แก้ไขกิจกรรม" : t("calendar.add_activity") || "เพิ่มกิจกรรม"}
            </DialogTitle>
          </div>
          <DialogDescription className="sr-only">
            {isEditMode ? "Edit existing activity" : "Add a new activity"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-5">
            {/* หัวข้อกิจกรรม */}
            <div className="space-y-2">
              <Label className="text-sm font-bold text-[#4c1d95]">
                {t("calendar.activity_title")} <span className="text-red-500">*</span>
              </Label>
              <Input
                value={formData.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="เช่น ประชุมนำเสนอผลงาน"
                required
                className="h-12 bg-[#f8faff] border-[#eef2ff] focus:border-[#705add] focus:ring-[#705add]/10 rounded-xl px-[5px] py-[4px]"
              />
            </div>

            {/* ประเภทกิจกรรม */}
            <div className="space-y-2">
              <Label className="text-sm font-bold text-[#4c1d95]">
                {t("visits.activity_types") || "ประเภทกิจกรรม"} <span className="text-red-500">*</span>
              </Label>
             <Popover open={openType} onOpenChange={setOpenType}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openType}
                  className="w-full justify-between h-10 border-[#ede9fe] hover:bg-white focus:ring-2 focus:ring-[#705add]/20 focus:border-[#705add] font-normal"
                >
                  {formData.interactionType
                    ? activityTypesList.find((type) => type.value === formData.interactionType)?.label
                    : "เลือกประเภทกิจกรรม..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="ค้นหาประเภทกิจกรรม..." />
                    <CommandList className="max-h-[250px]">
                      <CommandEmpty>ไม่พบประเภทกิจกรรม</CommandEmpty>
                      <CommandGroup>
                        {activityTypesList.map((type) => (
                          <CommandItem
                            key={type.value}
                            value={type.label} 
                            onSelect={() => {
                              updateField("interactionType", type.value);
                              setOpenType(false);
                            }}
                            className="py-3 px-4 cursor-pointer hover:bg-[#f5f3ff]"
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4 text-[#705add]",
                                formData.interactionType === type.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {type.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* หัวข้อบริการ */}
            <div className="space-y-2">
              <Label className="text-sm font-bold text-[#4c1d95]">
                {t("หัวข้อบริการ") || "หัวข้อบริการ"}
              </Label>
              <Popover open={openService} onOpenChange={setOpenService}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openService}
                  className="w-full justify-between h-10 border-[#ede9fe] hover:bg-white text-muted-foreground font-normal"
                >
                  <span className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-2 opacity-50" />
                    เลือกหัวข้อบริการ...
                  </span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="ค้นหาหัวข้อบริการ..." />
                    <CommandList className="max-h-[300px]">
                      <CommandEmpty>ไม่พบหัวข้อบริการ</CommandEmpty>
                      <CommandGroup>
                        {servicesList.map((service) => (
                          <CommandItem
                            key={service.value}
                            value={service.label}
                            onSelect={() => {
                              const isSelected = formData.services.includes(service.value);
                              if (isSelected) {
                                updateField("services", formData.services.filter(s => s !== service.value));
                              } else {
                                updateField("services", [...formData.services, service.value]);
                              }
                            }}
                            className="py-3 px-4 cursor-pointer hover:bg-[#f5f3ff]"
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4 text-[#705add]",
                                formData.services.includes(service.value) ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {service.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {/* แสดง Tag หัวข้อบริการที่เลือก */}
              {formData.services.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {formData.services.map((serviceValue) => (
                    <Badge
                      key={serviceValue}
                      variant="outline"
                      className="bg-[#f5f3ff] text-[#705add] border-[#eef2ff] rounded-lg px-2.5 py-1 text-xs font-medium flex items-center gap-1"
                    >
                      {serviceNames[serviceValue as keyof typeof serviceNames]}
                      <button
                        type="button"
                        onClick={() => removeService(serviceValue)}
                        className="hover:text-red-500 focus:outline-none"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* วันที่และเวลา */}
            <div className="grid grid-cols-[1fr_0.8fr_0.8fr] gap-3">
              <div className="space-y-2">
                <Label className="text-sm font-bold text-[#4c1d95]">
                  {t("calendar.date")} <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => updateField("date", e.target.value)}
                  required
                  className="h-12 bg-[#f8faff] border-[#eef2ff] focus:border-[#705add] rounded-xl px-2 text-xs sm:text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-bold text-[#4c1d95]">
                  {t("calendar.start_time")} <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => updateField("startTime", e.target.value)}
                  required
                  className="h-12 bg-[#f8faff] border-[#eef2ff] focus:border-[#705add] rounded-xl px-3 text-xs sm:text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-bold text-[#4c1d95]">
                  {t("calendar.end_time")} <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => updateField("endTime", e.target.value)}
                  required
                  className="h-12 bg-[#f8faff] border-[#eef2ff] focus:border-[#705add] rounded-xl px-3 text-xs sm:text-sm"
                />
              </div>
            </div>

            {/* สถานที่ */}
            <div className="space-y-2">
              <Label className="text-sm font-bold text-[#4c1d95]">
                {t("calendar.location")}
              </Label>
              <Input
                value={formData.location}
                onChange={(e) => updateField("location", e.target.value)}
                placeholder="เช่น ห้องประชุม 1"
                className="h-12 bg-[#f8faff] border-[#eef2ff] focus:border-[#705add] rounded-xl px-4"
              />
            </div>

            {/* สาขา/ไซด์งาน */}
            <div className="space-y-2">
              <Label className="text-sm font-bold text-[#4c1d95]">
                {t("สาขา/ไซด์งาน") || "สาขา/ไซด์งาน"}
              </Label>
              <Input
                value={formData.siteBranch}
                onChange={(e) => updateField("siteBranch", e.target.value)}
                placeholder="เช่น สาขาบางซื่อ"
                className="h-12 bg-[#f8faff] border-[#eef2ff] focus:border-[#705add] rounded-xl px-4"
              />
            </div>

            {/* ลูกค้า/ลีด */}
            <div className="space-y-2">
              <Label className="text-sm font-bold text-[#4c1d95]">
                {t("ลูกค้า/ลีด")}
              </Label>
             <Popover open={openCustomer} onOpenChange={setOpenCustomer}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openCustomer}
                  className="w-full justify-between h-10 border-[#ede9fe] hover:bg-white font-normal text-left px-3"
                >
                  {formData.customer ? (
                    <span className="truncate">
                      {customers.find((c) => c.id === formData.customer)?.name}
                    </span>
                  ) : (
                    <span className="text-muted-foreground flex items-center">
                      <Building2 className="w-4 h-4 mr-2 opacity-50" />
                      ค้นหา หรือพิมพ์ชื่อบริษัท...
                    </span>
                  )}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                  <Command>
                    <CommandInput 
                      placeholder="พิมพ์ชื่อบริษัท..." 
                      value={customerSearch}
                      onValueChange={setCustomerSearch}
                    />
                    <CommandList className="max-h-[300px]">
                      <CommandEmpty className="p-0">
                        <div>
                          <div className="px-3 py-2 text-xs text-amber-700 bg-amber-50">
                            ไม่พบลูกค้า "{customerSearch}"
                          </div>
                          {!showCreateLead ? (
                            <div
                              className="px-3 py-2 text-xs cursor-pointer hover:bg-blue-50 flex items-center gap-2 text-blue-600 font-medium"
                              onClick={() => setShowCreateLead(true)}
                            >
                              <UserPlus className="h-3.5 w-3.5" />
                              <span>ต้องการสร้างลีดใหม่?</span>
                            </div>
                          ) : (
                            <div className="p-3 space-y-2 bg-blue-50/50">
                              <div className="flex items-center justify-between">
                                <h4 className="text-xs font-semibold text-gray-900">สร้างลีดใหม่: "{customerSearch}"</h4>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setShowCreateLead(false);
                                    setLeadData({ email: "", phone: "" });
                                  }}
                                  className="text-gray-400 hover:text-gray-600"
                                >
                                  <X className="h-3.5 w-3.5" />
                                </button>
                              </div>
                              <div className="space-y-2">
                                <div>
                                  <Label className="text-xs text-gray-700 mb-1 block">
                                    อีเมล <span className="text-red-500">*</span>
                                  </Label>
                                  <Input
                                    type="email"
                                    placeholder="example@company.com"
                                    value={leadData.email}
                                    onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                                    className="h-8 text-xs rounded-lg"
                                  />
                                </div>
                                <div>
                                  <Label className="text-xs text-gray-700 mb-1 block">
                                    เบอร์โทรศัพท์ <span className="text-red-500">*</span>
                                  </Label>
                                  <Input
                                    type="tel"
                                    placeholder="08X-XXX-XXXX"
                                    value={leadData.phone}
                                    onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                                    className="h-8 text-xs rounded-lg"
                                  />
                                </div>
                                <Button
                                  type="button"
                                  onClick={handleCreateLead}
                                  className="w-full h-8 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg"
                                >
                                  <Check className="h-3 w-3 mr-1" />
                                  สร้างลีดและใช้งาน
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </CommandEmpty>
                      <CommandGroup heading="รายชื่อลูกค้าในระบบ">
                        {customers.map((c) => (
                          <CommandItem
                            key={c.id}
                            value={c.name}
                            onSelect={() => {
                              updateField("customer", c.id);
                              setOpenCustomer(false);
                            }}
                            className="py-3 px-4 cursor-pointer hover:bg-[#f5f3ff]"
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4 text-[#705add]",
                                formData.customer === c.id ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {c.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* ผู้ติดต่อฝั่งลูกค้า */}
            <div className="space-y-2">
              <Label className="text-sm font-bold text-[#4c1d95]">
                {t("ผู้ติดต่อฝั่งลูกค้า/ลีด") || "ผู้ติดต่อฝั่งลูกค้า/ลีด"}
              </Label>
              <div className="flex flex-col gap-2">
                <Input
                  value={contactInput}
                  onChange={(e) => setContactInput(e.target.value)}
                  onKeyDown={handleAddContact}
                  placeholder="พิมพ์ชื่อแล้วกด Enter"
                  className="h-12 bg-[#f8faff] border-[#eef2ff] focus:border-[#705add] rounded-xl px-4"
                />
                {formData.customerContacts.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {formData.customerContacts.map((name, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center bg-[#f0f9ff] text-[#0284c7] px-2.5 py-1 rounded-lg text-xs border border-[#e0f2fe] font-medium"
                      >
                        {name}
                        <button
                          type="button"
                          onClick={() => removeContact(name)}
                          className="ml-1 hover:text-red-500 focus:outline-none"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ผู้เข้าร่วมที่จำเป็น */}
          <div className="space-y-2">
            <Label className="text-sm font-bold text-[#4c1d95]">
              {t("ผู้เข้าร่วมที่จำเป็น") || "ผู้เข้าร่วมที่จำเป็น"}
            </Label>
            <Popover open={openAttendee} onOpenChange={setOpenAttendee}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openAttendee}
                className="w-full justify-between h-10 border-[#ede9fe] hover:bg-white text-muted-foreground font-normal"
              >
                <span className="flex items-center">
                  <Search className="w-4 h-4 mr-2 opacity-50" />
                  ค้นหาและเลือกพนักงานเข้าร่วม...
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
              {/* ... โค้ด Command ด้านในคงเดิม ... */}
                      <Command>
                  <CommandInput placeholder="พิมพ์ชื่อพนักงาน..." />
                  <CommandList className="max-h-[300px]">
                    <CommandEmpty>ไม่พบชื่อพนักงาน</CommandEmpty>
                    <CommandGroup>
                      {teamMembers
                        .filter((m) => !formData.attendees.includes(m.name))
                        .map((member) => (
                          <CommandItem
                            key={member.id}
                            value={member.name}
                            onSelect={() => {
                              updateField("attendees", [...formData.attendees, member.name]);
                              setOpenAttendee(false);
                            }}
                            className="py-3 px-4 cursor-pointer hover:bg-[#f5f3ff]"
                          >
                            {member.name}
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {formData.attendees.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {formData.attendees.map((name, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center bg-[#f5f3ff] text-[#705add] px-2.5 py-1 rounded-lg text-xs border border-[#eef2ff] font-medium"
                  >
                    {name}
                    <button
                      type="button"
                      onClick={() => removeAttendee(name)}
                      className="ml-1 hover:text-red-500 focus:outline-none"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* รายละเอียด */}
          <div className="space-y-2">
            <Label className="text-sm font-bold text-[#4c1d95]">
              {t("รายละเอียด")}
            </Label>
            <Textarea
              value={formData.notes}
              onChange={(e) => updateField("notes", e.target.value)}
              placeholder="เพิ่มหมายเหตุหรือรายละเอียดเพิ่มเติม..."
              rows={3}
              className="resize-none bg-[#f8faff] border-[#eef2ff] focus:border-[#705add] rounded-xl px-4 py-3"
            />
          </div>

          <DialogFooter className="pt-4 mt-6">
            <div className="flex gap-3 w-full justify-end">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="h-12 px-8 bg-[#f5f8ff] text-[#4c1d95] hover:bg-[#eef2ff] rounded-xl font-bold"
              >
                {t("common.cancel") || "ยกเลิก"}
              </Button>
              <Button
                type="submit"
                className="h-12 px-8 bg-[#705add] hover:bg-[#5b21b6] text-white rounded-xl font-bold shadow-lg shadow-[#705add]/20"
              >
                {isEditMode ? t("common.save") || "บันทึกการเปลี่ยนแปลง" : t("calendar.create_activity") || "สร้างกิจกรรม"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
