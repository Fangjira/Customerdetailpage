import { useState, useEffect } from "react";
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

const formatDateTimeForInput = (date?: Date) => {
  if (!date) return "";
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
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
    startDateTime: formatDateTimeForInput(new Date()),
    endDateTime: formatDateTimeForInput(new Date(Date.now() + 3600000)), // default + 1 hour
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

  const [openType, setOpenType] = useState(false);
  const [openCustomer, setOpenCustomer] = useState(false);
  const [openAttendee, setOpenAttendee] = useState(false);
  const [openService, setOpenService] = useState(false);

  const [contactInput, setContactInput] = useState("");
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
          startDateTime: formatDateTimeForInput(activity.startTime) || formatDateTimeForInput(new Date()),
          endDateTime: formatDateTimeForInput(activity.endTime) || formatDateTimeForInput(new Date(Date.now() + 3600000)),
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
        setFormData({
          title: "",
          type: "customer_visit",
          interactionType: "",
          startDateTime: formatDateTimeForInput(new Date()),
          endDateTime: formatDateTimeForInput(new Date(Date.now() + 3600000)),
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

  const removeAttendee = (name: string) => {
    updateField("attendees", formData.attendees.filter((a) => a !== name));
  };

  const removeService = (serviceValue: string) => {
    updateField("services", formData.services.filter((s) => s !== serviceValue));
  };

  const handleCreateLead = () => {
    if (!customerSearch.trim()) return;
    const newCustomer = {
      id: `new-${Date.now()}`,
      name: customerSearch,
      contact: "",
      email: leadData.email,
      phone: leadData.phone
    };
    setCustomers([...customers, newCustomer]);
    updateField("customer", newCustomer.id);
    setLeadData({ email: "", phone: "" });
    setCustomerSearch("");
    setShowCreateLead(false);
    setOpenCustomer(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const startDateTime = new Date(formData.startDateTime);
    const endDateTime = new Date(formData.endDateTime);

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

  // Custom styling rules based on design system
  const inputClass = "h-[44px] bg-[#F8FAFF] border-[#EEF2FF] focus:border-[#705ADD] focus:ring-[#705ADD]/10 rounded-[14px] px-4 text-[14px] w-full font-normal shadow-none placeholder:text-[#64748B]";
  const labelClass = "text-[14px] font-medium text-[#4C1D95] shrink-0";
  const rowClass = "flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[95vw] sm:max-w-[540px] bg-white p-5 sm:p-8 rounded-[20px] border-none shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] flex flex-col gap-0 max-h-[90vh] overflow-hidden">
        
        <DialogHeader className="pb-4 sm:pb-6 shrink-0 text-left border-b border-[#7BC9A6]/15 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-[40px] h-[40px] bg-[#F5F3FF] rounded-[14px] flex items-center justify-center shrink-0">
              <CalendarIcon className="w-5 h-5 text-[#705ADD]" />
            </div>
            <DialogTitle className="text-[24px] font-bold text-[#2D1B69]">
              {isEditMode ? t("calendar.edit_activity") || "แก้ไขกิจกรรม" : t("calendar.add_activity") || "เพิ่มกิจกรรม"}
            </DialogTitle>
          </div>
          <DialogDescription className="sr-only">
            {isEditMode ? "Edit existing activity" : "Add a new activity"}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-1 py-1 -mx-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-300">
          <form id="activity-form" onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
            
            {/* Title */}
            <div className={cn("grid grid-cols-[100px_1fr] sm:grid-cols-[140px_1fr] items-center gap-2 sm:gap-4")}>
              <Label className={labelClass}>
                หัวข้อกิจกรรม <span className="text-red-500">*</span>
              </Label>
              <Input
                value={formData.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="เช่น ประชุมนำเสนอผลงาน"
                required
                className={inputClass}
              />
            </div>

            {/* Date and Time Group */}
            <div className="space-y-4 pt-1">
              <div className={cn("grid grid-cols-[100px_1fr] sm:grid-cols-[140px_1fr] items-center gap-2 sm:gap-4")}>
                <Label className={labelClass}>เวลาเริ่มต้น <span className="text-red-500">*</span></Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="datetime-local"
                    value={formData.startDateTime}
                    onChange={(e) => updateField("startDateTime", e.target.value)}
                    required
                    className={cn(inputClass, "flex-1 min-w-0")}
                  />
                  {/* Mock All Day switch based on CSS */}
                  <div className="flex items-center justify-center bg-[#F5F3FF] px-2 py-1 h-[32px] rounded-[14px] shrink-0 cursor-pointer">
                    <span className="text-[14px] font-medium text-[#4C1D95]">ทั้งวัน</span>
                  </div>
                </div>
              </div>

              <div className={cn("grid grid-cols-[100px_1fr] sm:grid-cols-[140px_1fr] items-center gap-2 sm:gap-4")}>
                <Label className={labelClass}>เวลาสิ้นสุด <span className="text-red-500">*</span></Label>
                <Input
                  type="datetime-local"
                  value={formData.endDateTime}
                  onChange={(e) => updateField("endDateTime", e.target.value)}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Activity Type */}
            <div className={cn("grid grid-cols-[100px_1fr] sm:grid-cols-[140px_1fr] items-center gap-2 sm:gap-4")}>
              <Label className={labelClass}>
                ประเภทกิจกรรม <span className="text-red-500">*</span>
              </Label>
              <Popover open={openType} onOpenChange={setOpenType}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openType}
                    className={cn(inputClass, "justify-between bg-[#F8FAFF] hover:bg-[#F0F5FF] text-left border-[#EEF2FF]")}
                  >
                    <span className="truncate text-[#64748B]">
                      {formData.interactionType
                        ? activityTypesList.find((type) => type.value === formData.interactionType)?.label
                        : "เลือกประเภทกิจกรรม..."}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0 border-[#EEF2FF] rounded-[14px] shadow-lg" align="start">
                  <Command>
                    <CommandInput placeholder="ค้นหาประเภทกิจกรรม..." className="border-none focus:ring-0" />
                    <CommandList className="max-h-[200px] overflow-y-auto">
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
                            className="py-2.5 px-4 cursor-pointer hover:bg-[#F5F3FF]"
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4 text-[#705ADD]",
                                formData.interactionType === type.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                            <span className="truncate text-sm">{type.label}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Service Topic */}
            <div className={cn("grid grid-cols-[100px_1fr] sm:grid-cols-[140px_1fr] items-start gap-2 sm:gap-4")}>
              <Label className={cn(labelClass, "mt-3")}>
                หัวข้อบริการ
              </Label>
              <div className="flex flex-col gap-2 w-full min-w-0">
                <Popover open={openService} onOpenChange={setOpenService}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openService}
                      className={cn(inputClass, "justify-between bg-[#F5F9FF] border-[#EDE9FE] hover:bg-[#F0F5FF] rounded-[12px] text-left")}
                    >
                      <span className="flex items-center text-[#64748B] truncate">
                        <Briefcase className="w-4 h-4 mr-2 opacity-50 shrink-0" />
                        เลือกหัวข้อบริการ...
                      </span>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 text-[#64748B]" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] p-0 border-[#EEF2FF] rounded-[14px] shadow-lg" align="start">
                    <Command>
                      <CommandInput placeholder="ค้นหาหัวข้อบริการ..." className="border-none focus:ring-0" />
                      <CommandList className="max-h-[200px] overflow-y-auto">
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
                              className="py-2.5 px-4 cursor-pointer hover:bg-[#F5F3FF]"
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4 text-[#705ADD]",
                                  formData.services.includes(service.value) ? "opacity-100" : "opacity-0"
                                )}
                              />
                              <span className="text-sm">{service.label}</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                {formData.services.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {formData.services.map((serviceValue) => (
                      <Badge
                        key={serviceValue}
                        variant="outline"
                        className="bg-[#F5F3FF] text-[#705ADD] border-[#EEF2FF] rounded-[8px] px-2.5 py-1 text-xs font-medium flex items-center gap-1"
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
            </div>

            {/* Location */}
            <div className={cn("grid grid-cols-[100px_1fr] sm:grid-cols-[140px_1fr] items-center gap-2 sm:gap-4")}>
              <Label className={labelClass}>สถานที่</Label>
              <Input
                value={formData.location}
                onChange={(e) => updateField("location", e.target.value)}
                placeholder="เช่น ห้องประชุม 1"
                className={inputClass}
              />
            </div>

            {/* Branch */}
            <div className={cn("grid grid-cols-[100px_1fr] sm:grid-cols-[140px_1fr] items-center gap-2 sm:gap-4")}>
              <Label className={labelClass}>สาขา/ไซด์งาน</Label>
              <Input
                value={formData.siteBranch}
                onChange={(e) => updateField("siteBranch", e.target.value)}
                placeholder="เช่น สาขาบางซื่อ"
                className={inputClass}
              />
            </div>

            {/* Customer */}
            <div className={cn("grid grid-cols-[100px_1fr] sm:grid-cols-[140px_1fr] items-center gap-2 sm:gap-4")}>
              <Label className={labelClass}>ลูกค้า/ลีด</Label>
              <Popover open={openCustomer} onOpenChange={setOpenCustomer}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openCustomer}
                    className={cn(inputClass, "justify-between bg-[#F5F9FF] border-[#EDE9FE] hover:bg-[#F0F5FF] rounded-[12px] text-left")}
                  >
                    {formData.customer ? (
                      <span className="truncate text-gray-900 font-medium">
                        {customers.find((c) => c.id === formData.customer)?.name}
                      </span>
                    ) : (
                      <span className="text-[#64748B] flex items-center truncate text-[14px]">
                        <Search className="w-4 h-4 mr-2" />
                        ค้นหา หรือพิมพ์ชื่อบริษัท...
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0 border-[#EEF2FF] rounded-[14px] shadow-lg" align="start">
                  <Command>
                    <CommandInput 
                      placeholder="พิมพ์ชื่อบริษัท..." 
                      value={customerSearch}
                      onValueChange={setCustomerSearch}
                      className="border-none focus:ring-0"
                    />
                    <CommandList className="max-h-[220px] overflow-y-auto">
                      <CommandEmpty className="p-0">
                        <div>
                          <div className="px-3 py-2 text-xs text-amber-700 bg-amber-50">
                            ไม่พบลูกค้า "{customerSearch}"
                          </div>
                          {!showCreateLead ? (
                            <div
                              className="px-3 py-2.5 text-xs cursor-pointer hover:bg-blue-50 flex items-center gap-2 text-blue-600 font-medium"
                              onClick={() => setShowCreateLead(true)}
                            >
                              <UserPlus className="h-3.5 w-3.5" />
                              <span>ต้องการสร้างลีดใหม่?</span>
                            </div>
                          ) : (
                            <div className="p-3 space-y-2.5 bg-blue-50/50">
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
                                  <Label className="text-xs text-gray-700 mb-1 block">อีเมล <span className="text-red-500">*</span></Label>
                                  <Input
                                    type="email"
                                    placeholder="example@company.com"
                                    value={leadData.email}
                                    onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                                    className="h-8 text-xs rounded-lg"
                                  />
                                </div>
                                <div>
                                  <Label className="text-xs text-gray-700 mb-1 block">เบอร์โทรศัพท์ <span className="text-red-500">*</span></Label>
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
                                  className="w-full h-8 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg mt-1"
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
                            className="py-2.5 px-4 cursor-pointer hover:bg-[#F5F3FF]"
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4 text-[#705ADD]",
                                formData.customer === c.id ? "opacity-100" : "opacity-0"
                              )}
                            />
                            <span className="text-sm">{c.name}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Customer Contacts */}
            <div className={cn("grid grid-cols-[100px_1fr] sm:grid-cols-[140px_1fr] items-start gap-2 sm:gap-4")}>
              <Label className={cn(labelClass, "mt-3")}>ผู้ติดต่อฝั่ง<br/>ลูกค้า/ลีด</Label>
              <div className="flex flex-col gap-2 w-full min-w-0">
                <Input
                  value={contactInput}
                  onChange={(e) => setContactInput(e.target.value)}
                  onKeyDown={handleAddContact}
                  placeholder="พิมพ์ชื่อแล้วกด Enter"
                  className={inputClass}
                />
                {formData.customerContacts.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {formData.customerContacts.map((name, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center bg-[#F0F9FF] text-[#0284C7] px-2.5 py-1 rounded-[8px] text-xs border border-[#E0F2FE] font-medium"
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

            {/* Required Attendees */}
            <div className={cn("grid grid-cols-[100px_1fr] sm:grid-cols-[140px_1fr] items-start gap-2 sm:gap-4")}>
              <Label className={cn(labelClass, "mt-3 leading-tight")}>
                ผู้เข้าร่วมที่จำเป็น<br/><span className="text-xs font-normal text-gray-500"> </span>
              </Label>
              <div className="flex flex-col gap-2 w-full min-w-0">
                <Popover open={openAttendee} onOpenChange={setOpenAttendee}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openAttendee}
                      className={cn(inputClass, "justify-center bg-[#F5F9FF] border-[#EDE9FE] hover:bg-[#F0F5FF] rounded-[12px]")}
                    >
                      <span className="flex items-center text-[#64748B] text-[14px]">
                        <Search className="w-4 h-4 mr-2" />
                        ค้นหาและเลือกพนักงานเข้าร่วม...
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] p-0 border-[#EEF2FF] rounded-[14px] shadow-lg" align="start">
                    <Command>
                      <CommandInput placeholder="พิมพ์ชื่อพนักงาน..." className="border-none focus:ring-0" />
                      <CommandList className="max-h-[200px] overflow-y-auto">
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
                                className="py-1.5 px-1 cursor-pointer hover:bg-[#F5F3FF]"
                              >
                                <span className="text-sm">{member.name}</span>
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                {formData.attendees.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {formData.attendees.map((name, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center bg-[#F5F3FF] text-[#705ADD] px-1.5 py-1 rounded-[8px] text-xs border border-[#EEF2FF] font-medium"
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
            </div>

            {/* Details */}
            <div className={cn("grid grid-cols-[100px_1fr] sm:grid-cols-[140px_1fr] items-start gap-2 sm:gap-4")}>
              <Label className={cn(labelClass, "mt-3")}>รายละเอียด</Label>
              <Textarea
                value={formData.notes}
                onChange={(e) => updateField("notes", e.target.value)}
                placeholder="เพิ่มหมายเหตุหรือรายละเอียดเพิ่มเติม..."
                className="min-h-[80px] sm:min-h-[100px] resize-none bg-[#F8FAFF] border-[#EEF2FF] focus:border-[#705ADD] rounded-[18px] px-4 py-3 text-[14px] placeholder:text-[#64748B]"
              />
            </div>

          </form>
        </div>

        <DialogFooter className="pt-4 sm:pt-6 pb-1.5 shrink-0 border-t border-transparent">
          <div className="flex justify-center sm:justify-start gap-3 sm:gap-6 w-full">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="h-[48px] w-[106px] px-0 bg-[#F5F8FF] text-[#4C1D95] hover:bg-[#EEF2FF] rounded-[18px] font-bold text-[14px]"
            >
              {t("common.cancel") || "ยกเลิก"}
            </Button>
            <Button
              form="activity-form"
              type="submit"
              className="h-[48px] w-[147px] px-0 bg-[#705ADD] hover:bg-[#5B21B6] text-white rounded-[18px] font-bold shadow-[0px_10px_15px_-3px_rgba(112,90,221,0.2)] text-[14px]"
            >
              {isEditMode ? t("common.save") || "บันทึกข้อมูล" : t("calendar.create_activity") || "สร้างกิจกรรม"}
            </Button>
          </div>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}
