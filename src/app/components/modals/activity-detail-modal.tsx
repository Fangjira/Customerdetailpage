import { useState, useRef, useEffect } from "react";
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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import {
  X,
  Edit,
  Clock,
  MapPin,
  Building2,
  Phone,
  User,
  FileText,
  Check,
  Save,
  Users,
  Sparkles,
  Calendar as CalendarIcon,
  MapPinCheck,
  Plus,
  MessageSquare,
  Map,
  Paperclip,
  ChevronsUpDown,
  Briefcase,
  UserPlus,
  Search,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "../ui/utils";
import i18n from "../../../i18n/config";
import { QuickVisitModal } from "./quick-visit-modal";

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
  { value: "customer_visit", label: "เข้าพบลูกค้า (Onsite)" },
  { value: "online_meeting", label: "ประชุมออนไลน์" },
  { value: "sales_meeting", label: "ประชุมทีมขาย" },
  { value: "internal_meeting", label: "ประชุมภายใน" },
  { value: "customer_onboarding", label: "เริ่มต้นดูแลลูกค้า" },
  { value: "product_presentation", label: "นำเสนอผลิตภัณฑ์" },
  { value: "sales_negotiation", label: "เจรจาการขาย" },
  { value: "contract_signing", label: "เซ็นสัญญา" },
  { value: "site_survey", label: "สำรวจหน้างาน" },
  { value: "problem_solving", label: "แก้ไขปัญหา" },
  { value: "follow_up", label: "ติดตามงาน" },
  { value: "task_reminder", label: "แจ้งเตือนงาน" },
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

const formatTimeForInput = (date?: Date) => {
  if (!date) return "";
  return date.toTimeString().slice(0, 5);
};

const formatDateForInput = (date?: Date) => {
  if (!date) return "";
  return date.toISOString().split("T")[0];
};

type activity_types =
  | "customer_visit"
  | "sales_meeting"
  | "site_survey"
  | "internal_meeting"
  | "follow_up_call"
  | "task_reminder"
  | "business_engagement"
  | "technical_operation"
  | "relationship_building"
  | "marketing_education"
  | "onsite_visit"
  | "online_meeting"
  | "phone_call"
  | "email_messaging"
  | "sales_negotiation"
  | "contract_signing"
  | "sla_followup"
  | "complaint_handling"
  | "customer_onboarding"
  | "internal_review"
  | "technical_survey"
  | "site_audit"
  | "reference_visit"
  | "business_lunch"
  | "leisure_activities"
  | "holiday_gift_visit"
  | "trade_show"
  | "workshop_seminar";

type ActivityStatus = "planned" | "completed" | "cancelled";

type SubcategoryType =
  | "formal_face_to_face"
  | "formal_online"
  | "informal_voice"
  | "informal_text"
  | "formal_deal_specific"
  | "formal_legal"
  | "formal_after_sale"
  | "formal_support"
  | "formal_onboarding"
  | "internal_strategic"
  | "site_prep_field_ops"
  | "compliance_qa"
  | "customer_success_reference"
  | "relationship_social"
  | "relationship_occasion"
  | "marketing_outreach"
  | "education_engagement";

interface Activity {
  id: string;
  title: string;
  type: activity_types;
  status: ActivityStatus;
  subcategory?: SubcategoryType;
  example?: string;
  startTime: Date;
  endTime: Date;
  location?: string;
  siteBranch?: string;
  customer?: string;
  customerContact?: string;
  customerAddress?: string;
  customerPhone?: string;
  assignedTo: string;
  attendees?: string[];
  notes?: string;
  relatedDeal?: string;
  relatedContract?: string;
  services?: string[]; // เพิ่มฟิลด์ services
}

interface ActivityDetailModalProps {
  activity: Activity | null;
  isOpen?: boolean;
  onClose: () => void;
}

export function ActivityDetailModal({
  activity,
  isOpen,
  onClose,
}: ActivityDetailModalProps) {
  const { t } = useTranslation();
  const [isEditMode, setIsEditMode] = useState(false);
  const [showQuickVisit, setShowQuickVisit] = useState(false);

  const [currentStatus, setCurrentStatus] = useState<ActivityStatus>("planned");
  const [statusBadgeOpen, setStatusBadgeOpen] = useState(false);

  const [shortNote, setShortNote] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [shortNotes, setShortNotes] = useState<Array<{
    id: string;
    text: string;
    timestamp: Date;
    author: string;
    attachments?: { name: string; url: string; size: string }[];
  }>>([]);

  // Edit mode form state
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
  const [openType, setOpenType] = useState(false);
  const [openCustomer, setOpenCustomer] = useState(false);
  const [openAttendee, setOpenAttendee] = useState(false);
  const [openService, setOpenService] = useState(false);
  const [contactInput, setContactInput] = useState("");
  const [customerSearch, setCustomerSearch] = useState("");
  const [showCreateLead, setShowCreateLead] = useState(false);
  const [leadData, setLeadData] = useState({ email: "", phone: "" });

  useEffect(() => {
    if (activity) {
      setCurrentStatus(activity.status);
      // Initialize form data from activity
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
        customerContacts: activity.customerContact ? [activity.customerContact] : [],
        assignedTo: activity.assignedTo || "You",
        attendees: activity.attendees ? [...activity.attendees] : [],
        notes: activity.notes || "",
        services: activity.services ? [...activity.services] : [],
      });
    }
  }, [activity]);

  if (!activity) return null;

  const handleSave = () => {
    // ใส่ Logic บันทึกข้อมูลที่นี่
    setIsEditMode(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSave();
  };

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

  const handleMarkComplete = () => {
    setCurrentStatus("completed");
  };

  const handleCheckIn = () => {
    setShowQuickVisit(true);
  };

  const handleQuickVisitClose = () => {
    setShowQuickVisit(false);
  };

  const handleQuickVisitSave = (data: any) => {
    setShowQuickVisit(false);
    setCurrentStatus("completed");
    onClose();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleAddShortNote = () => {
    if (shortNote.trim() === "" && selectedFiles.length === 0) return;

    const newNote = {
      id: Date.now().toString(),
      text: shortNote,
      timestamp: new Date(),
      author: "คุณ (ผู้ใช้งานปัจจุบัน)",
      attachments: selectedFiles.map(file => ({
        name: file.name,
        url: URL.createObjectURL(file),
        size: (file.size / 1024).toFixed(1) + " KB"
      }))
    };

    setShortNotes([...shortNotes, newNote]);
    setShortNote("");
    setSelectedFiles([]); 
  };

  const getActivityTypeIconLarge = (type: activity_types) => {
    const iconClass = "h-5 w-5 text-[#705add]";
    switch (type) {
      case "customer_visit": return <MapPin className={iconClass} />;
      case "sales_meeting": return <Users className={iconClass} />;
      case "site_survey": return <MapPinCheck className={iconClass} />;
      case "internal_meeting": return <Users className={iconClass} />;
      case "follow_up_call": return <Phone className={iconClass} />;
      case "task_reminder": return <Clock className={iconClass} />;
      case "business_engagement": return <Building2 className={iconClass} />;
      case "technical_operation": return <Map className={iconClass} />;
      case "relationship_building": return <Users className={iconClass} />;
      case "marketing_education": return <Sparkles className={iconClass} />;
      default: return <CalendarIcon className={iconClass} />;
    }
  };

  const getActivityTypeColor = (type: activity_types) => {
    switch (type) {
      case "customer_visit": return "bg-blue-100 text-blue-700 border-blue-200";
      case "sales_meeting": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "site_survey": return "bg-purple-100 text-purple-700 border-purple-200";
      case "internal_meeting": return "bg-orange-100 text-orange-700 border-orange-200";
      case "follow_up_call": return "bg-pink-100 text-pink-700 border-pink-200";
      case "task_reminder": return "bg-gray-100 text-gray-700 border-gray-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusBadge = () => {
    const badgeClass = (() => {
      switch (currentStatus) {
        case "planned": return "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100";
        case "completed": return "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100";
        case "cancelled": return "bg-red-50 text-red-700 border-red-200 hover:bg-red-100";
        default: return "bg-gray-50 text-gray-700 border-gray-200";
      }
    })();
    return (
      <Popover open={statusBadgeOpen} onOpenChange={setStatusBadgeOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={statusBadgeOpen}
            className={cn(
              "w-30 justify-between h-8 border-[#ede9fe] hover:bg-white focus:ring-2 focus:ring-[#705add]/20 focus:border-[#705add] font-normal",
              badgeClass
            )}
          >
            <div className="flex items-center gap-1.5 shrink-0">
              <div
                className={cn(
                  "h-1.5 w-1.5 rounded-full shrink-0",
                  currentStatus === "planned"
                    ? "bg-blue-500"
                    : currentStatus === "completed"
                    ? "bg-emerald-500"
                    : "bg-red-500"
                )}
              />
              <span>{t(`calendar.status_${currentStatus}`)}</span>
            </div>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-[200px] p-0 z-[99999] bg-white shadow-2xl pointer-events-auto border border-[#ede9fe]"
          align="start"
        >
          <Command>
            <CommandList>
              <CommandGroup>
                <CommandItem
                  value="planned"
                  onSelect={() => {
                    setCurrentStatus("planned");
                    setStatusBadgeOpen(false);
                  }}
                  className="cursor-pointer py-2 px-2 rounded-sm hover:bg-blue-50"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      currentStatus === "planned" ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {t("calendar.status_planned") || "วางแผนแล้ว"}
                </CommandItem>

                <CommandItem
                  value="completed"
                  onSelect={() => {
                    setCurrentStatus("completed");
                    setStatusBadgeOpen(false);
                  }}
                  className="cursor-pointer py-2 px-2 rounded-sm hover:bg-emerald-50"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      currentStatus === "completed" ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {t("calendar.status_completed") || "เสร็จสมบูรณ์"}
                </CommandItem>

                <CommandItem
                  value="cancelled"
                  onSelect={() => {
                    setCurrentStatus("cancelled");
                    setStatusBadgeOpen(false);
                  }}
                  className="cursor-pointer py-2 px-2 rounded-sm hover:bg-red-50"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      currentStatus === "cancelled" ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {t("calendar.status_cancelled") || "ยกเลิก"}
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <Dialog open={!!activity && isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        {!isEditMode ? (
          <>
            <DialogHeader className="border-b border-[#ede9fe] pb-3 sm:pb-4 ">
              <DialogTitle className="text-lg sm:text-xl text-[#4c1d95] font-semibold">
                {activity.title}
              </DialogTitle>
              <DialogDescription className="sr-only">
                {t("calendar.activity_details")}
              </DialogDescription>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 bg-[#ede9fe] rounded-lg flex items-center justify-center flex-shrink-0">
                    {getActivityTypeIconLarge(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <Badge className={cn(getActivityTypeColor(activity.type), "text-[14px] px-2 py-1 rounded-full border shadow-none font-medium")}>
                        {t(`activity_types.${activity.type}`)}
                      </Badge>
                      {getStatusBadge()}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-8 w-8 p-0 text-[#9333ea] hover:bg-[#f5f3ff] flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>

            <div className="space-y-5 py-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#705add]" />
                  <h3 className="text-xs sm:text-sm font-semibold text-[#4c1d95]">
                    {t("calendar.date_time")}
                  </h3>
                </div>
                <div className="pl-6 space-y-1">
                  <p className="text-sm text-gray-900 font-medium">
                    {activity.startTime.toLocaleString(i18n.language === "th" ? "th-TH" : "en-US", {
                      weekday: "long", year: "numeric", month: "long", day: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-gray-600">
                    {activity.startTime.toLocaleTimeString(i18n.language === "th" ? "th-TH" : "en-US", { hour: "2-digit", minute: "2-digit" })}
                    {" - "}
                    {activity.endTime.toLocaleTimeString(i18n.language === "th" ? "th-TH" : "en-US", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-100 my-2"></div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#705add]" />
                  <h3 className="text-xs sm:text-sm font-semibold text-[#4c1d95]">
                    {t("สถานที่และสาขา")}
                  </h3>
                </div>
                <div className="pl-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">{t("calendar.location")}</p>
                    <p className="text-sm text-gray-900 font-medium">{activity.location || <span className="text-gray-400 italic font-normal">ไม่ระบุ</span>}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">{t("สาขา/ไซด์งาน")}</p>
                    <p className="text-sm text-gray-900 font-medium">{activity.siteBranch || <span className="text-gray-400 italic font-normal">ไม่ระบุ</span>}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 my-2"></div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-[#705add]" />
                  <h3 className="text-xs sm:text-sm font-semibold text-[#4c1d95]">
                    {t("ข้อมูลลูกค้าและผู้ติดต่อ")}
                  </h3>
                </div>
                <div className="pl-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">{t("calendar.customer")}</p>
                    <p className="text-sm text-gray-900 font-medium">{activity.customer || <span className="text-gray-400 italic font-normal">ไม่ระบุ</span>}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">{t("ผู้ติดต่อฝั่งลูกค้า")}</p>
                    <p className="text-sm text-gray-900 font-medium">{activity.customerContact || <span className="text-gray-400 italic font-normal">ไม่ระบุ</span>}</p>
                  </div>
                </div>
              </div>

              {/* ---------------- เพิ่มส่วนแสดงหัวข้อบริการตรงนี้ ---------------- */}
              <div className="border-t border-gray-100 my-2"></div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-[#705add]" />
                  <h3 className="text-xs sm:text-sm font-semibold text-[#4c1d95]">
                    {t("หัวข้อบริการ") || "หัวข้อบริการ"}
                  </h3>
                </div>
                <div className="pl-6">
                  {activity.services && activity.services.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {activity.services.map((serviceValue) => (
                        <Badge
                          key={serviceValue}
                          variant="outline"
                          className="bg-[#f5f3ff] text-[#705add] border-[#eef2ff] rounded-lg px-2.5 py-1 text-xs font-medium flex items-center gap-1"
                        >
                          {serviceNames[serviceValue as keyof typeof serviceNames] || serviceValue}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400 italic font-normal">ไม่ระบุ</span>
                  )}
                </div>
              </div>
              {/* ----------------------------------------------------------- */}

              <div className="border-t border-gray-100 my-2"></div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-[#705add]" />
                  <h3 className="text-xs sm:text-sm font-semibold text-[#4c1d95]">
                    {t("ผู้รับผิดชอบและผู้เข้าร่วม")}
                  </h3>
                </div>
                <div className="pl-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">{t("ผู้รับผิดชอบ")}</p>
                    <p className="text-sm text-gray-900 font-medium">{activity.assignedTo || "คุณ"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">{t("ผู้เข้าร่วมที่จำเป็น")}</p>
                    {activity.attendees && activity.attendees.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {activity.attendees.map((attendee, index) => (
                          <span key={index} className="bg-[#f0edff] text-[#5f4bb6] px-2 py-0.5 rounded text-[10px] border border-[#e5e0ff] font-medium">
                            {attendee}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400 italic font-normal">ไม่ระบุ</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 my-2"></div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#705add]" />
                  <h3 className="text-xs sm:text-sm font-semibold text-[#4c1d95]">
                    {t("หมายเหตุ")}
                  </h3>
                </div>
                <div className="pl-6">
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {activity.notes || <span className="text-gray-400 italic font-normal">ไม่ระบุ</span>}
                  </p>
                </div>
              </div>

              {/* Short Notes List */}
              {shortNotes.length > 0 && (
                <div className="space-y-3 mt-6">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-[#705add]" />
                    <h3 className="text-xs sm:text-sm font-semibold text-[#4c1d95]">
                      {t("calendar.short_notes")}
                    </h3>
                  </div>
                  <div className="pl-6 space-y-3">
                    {shortNotes.map((note) => (
                      <div key={note.id} className="bg-[#f5f3ff] border border-[#ede9fe] rounded-lg p-3 shadow-sm">
                        {note.text && <p className="text-sm text-gray-900 mb-2">{note.text}</p>}
                        {note.attachments && note.attachments.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-2">
                            {note.attachments.map((f, idx) => (
                              <div key={idx} className="flex items-center gap-1 bg-white border px-2 py-1 rounded text-[10px] text-purple-700">
                                <Paperclip className="h-3 w-3" /> {f.name}
                              </div>
                            ))}
                          </div>
                        )}
                        <p className="text-[10px] text-gray-500">{note.author} • {note.timestamp.toLocaleTimeString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add Note Input */}
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-4 mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="h-4 w-4 text-purple-700" />
                  <h3 className="text-xs sm:text-sm font-bold text-purple-900 uppercase tracking-wide">
                    {t("calendar.add_short_note")}
                  </h3>
                </div>
                <div className="space-y-3">
                  <Textarea
                    value={shortNote}
                    onChange={(e) => setShortNote(e.target.value)}
                    placeholder={t("calendar.short_note_placeholder")}
                    rows={2}
                    className="border-purple-300 bg-white text-sm"
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <input type="file" multiple className="hidden" ref={fileInputRef} onChange={handleFileSelect} />
                      <Button variant="ghost" size="sm" className="text-purple-600 h-8" onClick={() => fileInputRef.current?.click()}>
                        <Paperclip className="h-4 w-4 mr-1" /> แนบไฟล์
                      </Button>
                    </div>
                    <Button onClick={handleAddShortNote} disabled={shortNote.trim() === "" && selectedFiles.length === 0} className="bg-purple-600 h-8 text-xs">
                      <Plus className="h-3.5 w-3.5 mr-1" /> {t("calendar.add_note")}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="border-t border-[#ede9fe] pt-4">
              <div className="flex flex-col sm:flex-row gap-2 w-full justify-end">
                <Button variant="outline" onClick={() => setIsEditMode(true)} className="border-[#ede9fe] text-[#6b7280] rounded-lg">
                  <Edit className="h-4 w-4 mr-2" /> {t("common.edit")}
                </Button>
                {currentStatus !== "completed" && (
                  <Button onClick={handleMarkComplete} className="bg-red-600 hover:bg-red-700 text-white rounded-lg">
                    <Check className="h-4 w-4 mr-2" /> {t("calendar.mark_complete")}
                  </Button>
                )}
                {currentStatus !== "completed" && (
                  <Button onClick={handleCheckIn} className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                    <MapPinCheck className="h-4 w-4 mr-2" /> {t("checkin.checkin")}
                  </Button>
                )}
              </div>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader className="border-b border-[#ede9fe] pb-3 sm:pb-4">
              <DialogTitle className="text-lg text-[#4c1d95] font-semibold">{t("calendar.edit_activity")}</DialogTitle>
              <div className="flex items-center justify-end absolute right-4 top-4">
                <Button variant="ghost" size="sm" onClick={() => setIsEditMode(false)} className="h-8 w-8 p-0 text-[#9333ea]">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
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
                    className="h-12 bg-[#f8faff] border-[#eef2ff] focus:border-[#705add] focus:ring-[#705add]/10 rounded-xl px-[16px] py-[4px]"
                  />
                </div>

                {/* ประเภทกิจกรรม */}
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-[#4c1d95]">
                    {t("calendar.activity_types") || "ประเภทกิจกรรม"} <span className="text-red-500">*</span>
                  </Label>
                  <Popover open={openType} onOpenChange={setOpenType}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openType}
                        className="w-full justify-between h-12 bg-[#f8faff] border-[#eef2ff] hover:bg-white focus:ring-2 focus:ring-[#705add]/20 focus:border-[#705add] font-normal rounded-xl"
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
                        className="w-full justify-between h-12 bg-[#f8faff] border-[#eef2ff] hover:bg-white text-muted-foreground font-normal rounded-xl"
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
                <div className="grid grid-cols-[1fr_1fr] sm:grid-cols-[1fr_0.8fr_0.8fr] gap-3 col-span-1 sm:col-span-2">
                  <div className="space-y-2 col-span-2 sm:col-span-1">
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
                        className="w-full justify-between h-12 bg-[#f8faff] border-[#eef2ff] hover:bg-white font-normal text-left px-4 rounded-xl"
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

                {/* ผู้เข้าร่วมที่จำเป็น */}
                <div className="space-y-2 col-span-1 sm:col-span-2">
                  <Label className="text-sm font-bold text-[#4c1d95]">
                    {t("ผู้เข้าร่วมที่จำเป็น (ทีมของเรา)") || "ผู้เข้าร่วมที่จำเป็น (ทีมของเรา)"}
                  </Label>
                  <Popover open={openAttendee} onOpenChange={setOpenAttendee}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openAttendee}
                        className="w-full justify-between h-12 bg-[#f8faff] border-[#eef2ff] hover:bg-white text-muted-foreground font-normal rounded-xl px-4"
                      >
                        <span className="flex items-center">
                          <Search className="w-4 h-4 mr-2 opacity-50" />
                          ค้นหาและเลือกพนักงานเข้าร่วม...
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
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
                <div className="space-y-2 col-span-1 sm:col-span-2">
                  <Label className="text-sm font-bold text-[#4c1d95]">
                    {t("รายละเอียด")}
                  </Label>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => updateField("notes", e.target.value)}
                    placeholder="เพิ่มหมายเหตุหรือรายละเอียดเพิ่มเติม..."
                    rows={4}
                    className="resize-none bg-[#f8faff] border-[#eef2ff] focus:border-[#705add] rounded-xl px-4 py-3"
                  />
                </div>
              </div>

              <DialogFooter className="border-t border-[#ede9fe] pt-4 mt-4">
                <Button variant="outline" type="button" onClick={() => setIsEditMode(false)} className="rounded-lg">{t("common.cancel")}</Button>
                <Button type="submit" className="bg-[#705add] hover:bg-[#5b21b6] text-white rounded-lg">
                  <Save className="h-4 w-4 mr-2" /> {t("common.save")}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
      <QuickVisitModal
        open={showQuickVisit}
        onClose={handleQuickVisitClose}
        onSave={handleQuickVisitSave}
        activity={activity}
      />
    </Dialog>
  );
}