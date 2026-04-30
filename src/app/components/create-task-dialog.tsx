import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
} from "react";
import {
  Calendar,
  Users,
  Lock,
  Globe,
  Check,
  ChevronDown,
  X,
  Plus,
  Link2,
  CheckCircle2,
  Briefcase,
  Building2,
  UserPlus,
  Search,
} from "lucide-react";

import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { Combobox } from "./ui/combobox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { cn } from "./ui/utils";
import { useModuleStore } from "../store/module-store";

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

const TASK_TYPES = [
  {
    value: "ติดตามลูกค้า",
    label: "ติดตามลูกค้า - Follow up customer",
  },
  {
    value: "เตรียมใบเสนอราคา",
    label: "เตรียมใบเสนอราคา - Prepare quotation",
  },
  {
    value: "นัดหมายลูกค้า",
    label: "📅 นัดหมายลูกค้า - Schedule meeting",
  },
  {
    value: "เข้าพบลูกค้า",
    label: "📍 เข้าพบลูกค้า - Visit customer",
  },
  { value: "ส่งเอกสาร", label: "ส่งเอกสาร - Send documents" },
  {
    value: "ตรวจสอบสถานะดีล",
    label: "ตรวจสอบสถานะดีล - Check deal status",
  },
  {
    value: "โทรติดต่อลูกค้า",
    label: "โทรติดต่อลูกค้า - Call customer",
  },
  { value: "ส่งอีเมล", label: "ส่งอีเมล - Send email" },
  { value: "ทำสัญญา", label: "ทำสัญญา - Prepare contract" },
  {
    value: "ส่งมอบสินค้า/บริการ",
    label: "ส่งมอบสินค้า/บริการ - Deliver service",
  },
  { value: "แก้ไขปัญหา", label: "แก้ไขปัญหา - Resolve issue" },
  { value: "ประชุมทีม", label: "ประชุมทีม - Team meeting" },
  { value: "ทำรายงาน", label: "ทำรายงาน - Prepare report" },
  {
    value: "อัพเดทข้อมูล",
    label: "อัพเดทข้อมูล - Update information",
  },
  { value: "other", label: "📝 อื่นๆ (กรอกเอง)" },
];

const MOCK_ENTITIES = {
  deal: [
    {
      id: "DL-2024-001",
      name: "Ocean Freight Contract - Global Logistics",
    },
    {
      id: "DL-2024-002",
      name: "Air Express Partnership - FastTrack",
    },
  ],
  customer: [
    { id: "CUST-001", name: "Global Freight Solutions Inc." },
    { id: "CUST-002", name: "Pacific Distribution Co." },
    { id: "CUST-003", name: "FastTrack Express" },
  ],
  lead: [{ id: "LEAD-001", name: "Global Traders Ltd." }],
  quotation: [],
  todo: [],
};

const activityTypesList = [
  {
    value: "online_meeting",
    label: "ประชุมออนไลน์ / Zoom, Teams, Google Meet",
  },
  { value: "sales_meeting", label: "ประชุมทีมขาย" },
  {
    value: "internal_meeting",
    label: "ประชุมภายใน / ทบทวนแผนกับทีม",
  },
  {
    value: "customer_visit_our_site",
    label: "ลูกค้ามาพบที่ออฟฟิศ / คลัง",
  },
  {
    value: "visit_customer_site",
    label: "ไปพบลูกค้าที่ออฟฟิศ / คลัง",
  },
  { value: "other", label: "อื่นๆ" },
];

const serviceNames = {
  freight: "Freight",
  customs: "Customs",
  warehouse: "Warehouse",
  transport: "Transport",
  crossborder: "Cross-border",
  trading: "Trading",
  service: "Service",
  other: "Other",
};

const servicesList = Object.entries(serviceNames).map(
  ([key, value]) => ({
    value: key,
    label: value,
  }),
);

interface QuickCreateTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuickCreateTaskDialog({
  isOpen,
  onClose,
}: QuickCreateTaskDialogProps) {
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
  const [assigneeDropdownOpen, setAssigneeDropdownOpen] =
    useState(false);
  const [attendeeDropdownOpen, setAttendeeDropdownOpen] =
    useState(false);

  // States for linked entities
  const [linkedEntities, setLinkedEntities] = useState<
    LinkedEntity[]
  >([]);
  const [linkDropdownOpen, setLinkDropdownOpen] =
    useState(false);
  const [selectedEntityType, setSelectedEntityType] =
    useState<string>("deal");
  const [searchQuery, setSearchQuery] = useState("");

  // States for Activity UI
  const [customers, setCustomers] = useState([
    ...MOCK_ENTITIES.customer,
    ...MOCK_ENTITIES.lead,
  ]);
  const [openCustomer, setOpenCustomer] = useState(false);
  const [openService, setOpenService] = useState(false);
  const [customerSearch, setCustomerSearch] = useState("");
  const [contactInput, setContactInput] = useState("");
  const [showCreateLead, setShowCreateLead] = useState(false);
  const [leadData, setLeadData] = useState({
    email: "",
    phone: "",
  });

  const teamMembers = [
    { id: "you", name: t("common.you") || "คุณ (You)" },
    { id: "sarah-chen", name: "Sarah Chen" },
    { id: "michael-wong", name: "Michael Wong" },
  ];

  // เป็นโหมด Activity หากใน Array ของหัวข้องาน มีคำว่า "นัดหมายลูกค้า" หรือ "เข้าพบลูกค้า"
  const isActivityMode =
    formData.titleType.includes("นัดหมายลูกค้า") ||
    formData.titleType.includes("เข้าพบลูกค้า");

  const getSelectedNames = (ids: string[]) => {
    if (ids.length === 0) return "เลือกพนักงาน...";
    if (ids.length === 1) {
      const member = teamMembers.find((m) => m.id === ids[0]);
      return member?.name || "";
    }
    return `${ids.length} คนที่เลือก`;
  };

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Smart Autofill: เมื่อเลือกมอบหมาย (Assignee) ให้เพิ่มเข้าในผู้เข้าร่วม (Attendees) ด้วย
  const handleAssigneeToggle = (personId: string) => {
    let newAssignees;
    let newAttendees = [...formData.attendees];

    if (formData.assignees.includes(personId)) {
      newAssignees = formData.assignees.filter(
        (id) => id !== personId,
      );
      // Optional: ถ้าเอาออก อาจจะเอาออกจากผู้เข้าร่วมด้วย
      newAttendees = newAttendees.filter(
        (id) => id !== personId,
      );
    } else {
      newAssignees = [...formData.assignees, personId];
      // เติมอัตโนมัติในผู้เข้าร่วม
      if (!newAttendees.includes(personId)) {
        newAttendees.push(personId);
      }
    }

    setFormData((prev) => ({
      ...prev,
      assignees: newAssignees,
      attendees: newAttendees,
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

  const handleAddContact = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter" && contactInput.trim()) {
      e.preventDefault();
      if (
        !formData.customerContacts.includes(contactInput.trim())
      ) {
        updateField("customerContacts", [
          ...formData.customerContacts,
          contactInput.trim(),
        ]);
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
      phone: leadData.phone,
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
      toast.error(
        "โปรดเลือกพนักงานที่ต้องการ 'มอบหมายให้' อย่างน้อย 1 คน",
      );
      return;
    }

    if (isActivityMode && formData.attendees.length === 0) {
      toast.error(
        "โปรดเลือก 'ผู้รับผิดชอบ / เข้าร่วม' กิจกรรม อย่างน้อย 1 คน",
      );
      return;
    }

    // สร้างชื่อจากหัวข้อหลายๆ อันมารวมกัน
    const selectedLabels = formData.titleType
      .filter((t) => t !== "other")
      .map(
        (t) =>
          TASK_TYPES.find((tt) => tt.value === t)?.label.split(
            " - ",
          )[0],
      );

    if (
      formData.titleType.includes("other") &&
      formData.customTitle
    ) {
      selectedLabels.push(formData.customTitle);
    }
    const finalTitle =
      selectedLabels.join(", ") || "ไม่มีหัวข้อ";

    if (isActivityMode) {
      // Data Mockup for submission
      toast.success(`สร้าง To-Do และ Activity: ${finalTitle}`);
    } else {
      toast.success(`สร้างงาน: ${finalTitle}`);
    }

    if (onClose) onClose();
    resetForm();
  };

  const addLinkedEntity = (entity: any) => {
    const newLink: LinkedEntity = {
      type: selectedEntityType as any,
      id: entity.id,
      name: entity.name,
    };

    const alreadyLinked = linkedEntities.some(
      (e) => e.type === newLink.type && e.id === newLink.id,
    );

    if (alreadyLinked) {
      toast.error("รายการนี้เชื่อมโยงอยู่แล้ว");
      return;
    }

    setLinkedEntities((prev) => [...prev, newLink]);
    setSearchQuery("");
    toast.success(`เชื่อมโยงกับ ${entity.name} แล้ว`);
  };

  const removeLinkedEntity = (index: number) => {
    setLinkedEntities((prev) =>
      prev.filter((_, i) => i !== index),
    );
    toast.info("ยกเลิกการเชื่อมโยง");
  };

  const getEntityIcon = (type: string) => {
    return (
      ENTITY_TYPES.find((t) => t.value === type)?.icon || "📌"
    );
  };

  const filteredEntities = useMemo(() => {
    return (
      MOCK_ENTITIES[
        selectedEntityType as keyof typeof MOCK_ENTITIES
      ]?.filter(
        (entity: any) =>
          entity.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          entity.id
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      ) || []
    );
  }, [selectedEntityType, searchQuery]);

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) =>
      c.name
        .toLowerCase()
        .includes(customerSearch.toLowerCase()),
    );
  }, [customers, customerSearch]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "bg-white flex flex-col gap-0 overflow-hidden p-6 sm:p-8 rounded-[14px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] border-none max-h-[90vh]",
          isActivityMode
            ? "sm:w-[600px] sm:max-w-none"
            : "sm:w-[506px] sm:max-w-none",
        )}
      >
        {/* Header ส่วนบนสุด */}
        <DialogHeader className="pb-4 shrink-0 text-left">
          <div className="flex items-center gap-3">
            <div className="w-[40px] h-[40px] bg-[#F5F3FF] rounded-[14px] flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-[#705ADD]" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-[#2D1B69]">
                {isActivityMode
                  ? "สร้าง To-Do และ กิจกรรม"
                  : "สร้างแบบฟอร์ม To-Do"}
              </DialogTitle>
              <DialogDescription className="text-gray-500 mt-0.5 text-sm">
                ระบุรายละเอียดและมอบหมายงานให้ทีม
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-1 py-1 -mx-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* ========================================= */}
            {/* Common Information */}
            {/* ========================================= */}

            {/* Task Title / ประเภทงาน (Multi-Select) */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-1.5 sm:gap-4">
              <Label
                htmlFor="titleType"
                className="text-gray-700 font-medium text-sm sm:w-40 sm:pt-2.5 sm:text-right shrink-0"
              >
                หัวข้อ To do{" "}
                <span className="text-red-500">*</span>
              </Label>
              <div className="flex-1 min-w-0 space-y-2">
                <Popover
                  open={openTitle}
                  onOpenChange={setOpenTitle}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-between bg-white border-gray-200 hover:bg-gray-50 font-normal px-3 py-2 shadow-sm text-left h-10"
                    >
                      <span
                        className={cn(
                          "flex-1 truncate text-left text-sm",
                          formData.titleType.length === 0
                            ? "text-gray-400"
                            : "text-gray-700",
                        )}
                      >
                        {formData.titleType.length === 0
                          ? "เลือกประเภทงาน..."
                          : formData.titleType.length === 1
                            ? TASK_TYPES.find(
                                (t) =>
                                  t.value ===
                                  formData.titleType[0],
                              )?.label.split(" - ")[0]
                            : `${formData.titleType.length} หัวข้อที่เลือก`}
                      </span>
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-40" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="p-2 w-[340px] sm:w-[400px]"
                    align="start"
                  >
                    <div className="max-h-[280px] overflow-y-auto space-y-1">
                      {TASK_TYPES.map((type) => (
                        <div
                          key={type.value}
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer rounded-md text-sm"
                          onClick={() => {
                            const isSelected =
                              formData.titleType.includes(
                                type.value,
                              );
                            if (isSelected) {
                              updateField(
                                "titleType",
                                formData.titleType.filter(
                                  (t: string) =>
                                    t !== type.value,
                                ),
                              );
                            } else {
                              updateField("titleType", [
                                ...formData.titleType,
                                type.value,
                              ]);
                            }
                          }}
                        >
                          <Checkbox
                            checked={formData.titleType.includes(
                              type.value,
                            )}
                            className="pointer-events-none rounded-[4px]"
                          />
                          <span className="text-gray-700">
                            {type.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>

                {/* แสดง Tags ของหัวข้อที่เลือกไว้ */}
                {formData.titleType.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {formData.titleType.map((tt) => {
                      if (tt === "other") return null;
                      const typeObj = TASK_TYPES.find(
                        (t) => t.value === tt,
                      );
                      return (
                        <Badge
                          key={tt}
                          variant="outline"
                          className="bg-gray-100 text-gray-800 border-gray-200 font-medium rounded-md px-2 py-1"
                        >
                          {typeObj
                            ? typeObj.label.split(" - ")[0]
                            : tt}
                          <button
                            type="button"
                            onClick={() =>
                              updateField(
                                "titleType",
                                formData.titleType.filter(
                                  (t: string) => t !== tt,
                                ),
                              )
                            }
                            className="ml-1.5 hover:text-red-500"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      );
                    })}
                  </div>
                )}

                {/* ช่องกรอกเมื่อเลือก "อื่นๆ" */}
                {formData.titleType.includes("other") && (
                  <div className="animate-in fade-in slide-in-from-top-1">
                    <Input
                      id="customTitle"
                      value={formData.customTitle}
                      onChange={(e) =>
                        updateField(
                          "customTitle",
                          e.target.value,
                        )
                      }
                      placeholder="โปรดระบุหัวข้องานอื่นๆ..."
                      className="border-gray-200 shadow-sm"
                      required
                      autoFocus
                    />
                  </div>
                )}
              </div>
            </div>

            {/* ความสำคัญ (Priority) */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
              <Label
                htmlFor="priority"
                className="text-gray-700 font-medium text-sm sm:w-40 sm:text-right shrink-0"
              >
                ความสำคัญ{" "}
                <span className="text-red-500">*</span>
              </Label>
              <div className="flex-1 min-w-0">
                <Combobox
                  options={[
                    { value: "high", label: `🔴 สูง` },
                    { value: "medium", label: `🟠 ปานกลาง` },
                    { value: "low", label: `🔵 ต่ำ` },
                  ]}
                  value={formData.priority}
                  onValueChange={(value: string) =>
                    updateField("priority", value)
                  }
                  placeholder="เลือกระดับความสำคัญ"
                  className="border-gray-200 bg-white shadow-sm"
                />
              </div>
            </div>

            {/* มอบหมายให้ (To-Do) */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
              <Label className="text-gray-700 font-medium text-sm sm:w-40 sm:text-right shrink-0">
                มอบหมายให้{" "}
                <span className="text-red-500">*</span>
              </Label>
              <div className="flex-1 min-w-0">
                <Popover
                  open={assigneeDropdownOpen}
                  onOpenChange={setAssigneeDropdownOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-between h-10 border-gray-200 hover:bg-gray-50 font-normal bg-white shadow-sm text-left px-3"
                    >
                      <span
                        className={cn(
                          "flex-1 truncate text-left text-sm",
                          formData.assignees.length === 0
                            ? "text-gray-400"
                            : "text-gray-900",
                        )}
                      >
                        {getSelectedNames(formData.assignees) ||
                          "เลือกพนักงานผู้รับผิดชอบ"}
                      </span>
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-40" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="p-1 bg-white"
                    align="start"
                    style={{ width: "280px" }}
                  >
                    <div className="max-h-[240px] overflow-y-auto py-1">
                      {teamMembers.map((person) => (
                        <div
                          key={`ass-${person.id}`}
                          className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 cursor-pointer rounded-md transition-colors"
                          onClick={() =>
                            handleAssigneeToggle(person.id)
                          }
                        >
                          <Checkbox
                            checked={formData.assignees.includes(
                              person.id,
                            )}
                            className="pointer-events-none rounded-[4px]"
                          />
                          <span className="text-sm text-gray-700 font-medium">
                            {person.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* แสดง Attendees (ถ้าโหมด Activity) หรือ Due Date (ถ้าโหมด Task ปกติ) */}
            {isActivityMode ? (
              <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
                <Label className="text-gray-700 font-medium text-sm sm:w-40 sm:text-right shrink-0">
                  ผู้เข้าร่วม (กิจกรรม){" "}
                  <span className="text-red-500">*</span>
                </Label>
                <div className="flex-1 min-w-0">
                  <Popover
                    open={attendeeDropdownOpen}
                    onOpenChange={setAttendeeDropdownOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full flex items-center justify-between h-10 border-gray-200 hover:bg-gray-50 font-normal bg-white shadow-sm text-left px-3"
                      >
                        <span
                          className={cn(
                            "flex-1 truncate text-left text-sm",
                            formData.attendees.length === 0
                              ? "text-gray-400"
                              : "text-gray-900",
                          )}
                        >
                          {getSelectedNames(formData.attendees)}
                        </span>
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-40" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="p-1 bg-white"
                      align="start"
                      style={{ width: "280px" }}
                    >
                      <div className="max-h-[240px] overflow-y-auto py-1">
                        {teamMembers.map((person) => (
                          <div
                            key={`att-${person.id}`}
                            className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 cursor-pointer rounded-md transition-colors"
                            onClick={() => {
                              if (
                                formData.attendees.includes(
                                  person.id,
                                )
                              ) {
                                updateField(
                                  "attendees",
                                  formData.attendees.filter(
                                    (id) => id !== person.id,
                                  ),
                                );
                              } else {
                                updateField("attendees", [
                                  ...formData.attendees,
                                  person.id,
                                ]);
                              }
                            }}
                          >
                            <Checkbox
                              checked={formData.attendees.includes(
                                person.id,
                              )}
                              className="pointer-events-none rounded-[4px]"
                            />
                            <span className="text-sm text-gray-700 font-medium">
                              {person.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
                <Label
                  htmlFor="dueDate"
                  className="text-gray-700 font-medium text-sm sm:w-40 sm:text-right shrink-0"
                >
                  กำหนดส่ง{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <div className="flex-1 min-w-0 relative">
                  <Input
                    id="dueDate"
                    type="datetime-local"
                    value={formData.dueDate}
                    onChange={(e) =>
                      updateField("dueDate", e.target.value)
                    }
                    className="border-gray-200 shadow-sm"
                    required={!isActivityMode}
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            )}

            {/* ========================================= */}
            {/* ข้อมูลโหมด ACTIVITY (กล่องสีเขียวตาม Design) */}
            {/* ========================================= */}
            {isActivityMode && (
              <div className="bg-[#f4fcf7] p-3 sm:p-6 rounded-2xl border border-[#e6f5ed] space-y-5">
                {/* Row 1: Date, Start, End */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
                  <Label className="text-emerald-900 font-medium text-sm sm:w-40 sm:text-right shrink-0">
                    วันและเวลา{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex items-center gap-2 w-auto sm:w-auto flex-1">
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        updateField("date", e.target.value)
                      }
                      required
                      className="h-9 px-2 text-sm border-emerald-200 focus-visible:ring-emerald-500 w-25"
                    />
                    <span className="text-gray-400 hidden sm:inline">
                      -
                    </span>
                    <div className="flex items-center gap-2 w-full sm:w-auto flex-1">
                      <Input
                        type="time"
                        value={formData.startTime}
                        onChange={(e) =>
                          updateField(
                            "startTime",
                            e.target.value,
                          )
                        }
                        required
                        className="h-9 px-2 text-sm border-emerald-200 focus-visible:ring-emerald-500 w-20"
                      />
                      <span className="text-gray-400">ถึง</span>
                      <Input
                        type="time"
                        value={formData.endTime}
                        onChange={(e) =>
                          updateField("endTime", e.target.value)
                        }
                        required
                        className="h-9 px-2 text-sm border-emerald-200 focus-visible:ring-emerald-500 w-20"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Interaction Type */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
                  <Label className="text-emerald-900 font-medium text-sm sm:w-40 sm:text-right shrink-0">
                    รูปแบบการพบ{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex-1 min-w-0">
                    <Combobox
                      options={activityTypesList}
                      value={formData.interactionType}
                      onValueChange={(val: string) =>
                        updateField("interactionType", val)
                      }
                      placeholder="เลือกรูปแบบ..."
                      className="h-9 border-emerald-200"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start gap-1.5 sm:gap-4">
                  <Label className="text-emerald-900 font-medium text-sm sm:w-40 sm:pt-2 sm:text-right shrink-0">
                    หัวข้อบริการที่เกี่ยวข้อง
                  </Label>
                  <div className="flex-1 min-w-0 space-y-2">
                    <Popover
                      open={openService}
                      onOpenChange={setOpenService}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full flex items-center justify-between bg-white border-emerald-200 hover:bg-emerald-50 font-normal h-9 px-3 text-left"
                        >
                          <span
                            className={cn(
                              "flex-1 truncate text-left text-sm",
                              formData.services.length === 0
                                ? "text-gray-400"
                                : "text-gray-700",
                            )}
                          >
                            <div className="flex items-center">
                              <Briefcase className="w-4 h-4 mr-2 opacity-40 shrink-0" />
                              {formData.services.length === 0
                                ? "เลือกหัวข้อบริการ"
                                : `${formData.services.length} บริการที่เลือก`}
                            </div>
                          </span>
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-40" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="p-2 w-[280px]"
                        align="start"
                      >
                        <div className="max-h-[200px] overflow-y-auto space-y-1">
                          {servicesList.map((service) => (
                            <div
                              key={service.value}
                              className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer rounded-md text-sm"
                              onClick={() => {
                                const isSelected =
                                  formData.services.includes(
                                    service.value,
                                  );
                                if (isSelected) {
                                  updateField(
                                    "services",
                                    formData.services.filter(
                                      (s) =>
                                        s !== service.value,
                                    ),
                                  );
                                } else {
                                  updateField("services", [
                                    ...formData.services,
                                    service.value,
                                  ]);
                                }
                              }}
                            >
                              <Checkbox
                                checked={formData.services.includes(
                                  service.value,
                                )}
                                className="pointer-events-none rounded-[4px]"
                              />
                              <span className="text-gray-700">
                                {service.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>

                    {/* Selected Services Tags */}
                    {formData.services.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {formData.services.map((svc) => (
                          <Badge
                            key={svc}
                            variant="outline"
                            className="bg-[#ccfbf1] text-emerald-800 border-[#99f6e4] font-medium rounded-md px-2 py-0.5"
                          >
                            {
                              serviceNames[
                                svc as keyof typeof serviceNames
                              ]
                            }
                            <button
                              type="button"
                              onClick={() =>
                                updateField(
                                  "services",
                                  formData.services.filter(
                                    (s) => s !== svc,
                                  ),
                                )
                              }
                              className="ml-1 hover:text-red-500"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Row 3: Location */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
                  <Label className="text-emerald-900 font-medium text-sm sm:w-40 sm:text-right shrink-0">
                    สถานที่ / ห้องประชุม
                  </Label>
                  <div className="flex-1 min-w-0">
                    <Input
                      value={formData.location}
                      onChange={(e) =>
                        updateField("location", e.target.value)
                      }
                      placeholder="เช่น ห้องประชุม 1"
                      className="h-9 border-emerald-200"
                    />
                  </div>
                </div>

                {/* Row 3.5: Site Branch */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
                  <Label className="text-emerald-900 font-medium text-sm sm:w-40 sm:text-right shrink-0">
                    สาขา / ไซด์งาน
                  </Label>
                  <div className="flex-1 min-w-0">
                    <Input
                      value={formData.siteBranch}
                      onChange={(e) =>
                        updateField(
                          "siteBranch",
                          e.target.value,
                        )
                      }
                      placeholder="เช่น สำนักงานใหญ่"
                      className="h-9 border-emerald-200"
                    />
                  </div>
                </div>

                {/* Row 4: Customer */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
                  <Label className="text-emerald-900 font-medium text-sm sm:w-40 sm:text-right shrink-0">
                    ลูกค้า / ลีด
                  </Label>
                  <div className="flex-1 min-w-0">
                    <Popover
                      open={openCustomer}
                      onOpenChange={setOpenCustomer}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full flex items-center justify-between bg-white border-emerald-200 hover:bg-emerald-50 font-normal px-3 h-9 text-left"
                        >
                          <span
                            className={cn(
                              "flex-1 truncate text-left text-sm",
                              !formData.customer &&
                                "text-gray-400",
                            )}
                          >
                            {formData.customer
                              ? customers.find(
                                  (c) =>
                                    c.id === formData.customer,
                                )?.name
                              : "เลือกหรือค้นหาลูกค้า..."}
                          </span>
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-40" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="p-0 w-[300px]"
                        align="start"
                      >
                        <div className="p-2 border-b bg-white">
                          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-md px-2 h-9">
                            <Search className="w-4 h-4 text-gray-400" />
                            <input
                              placeholder="พิมพ์ชื่อบริษัท..."
                              value={customerSearch}
                              onChange={(e) =>
                                setCustomerSearch(
                                  e.target.value,
                                )
                              }
                              className="w-full h-full bg-transparent focus:outline-none px-2 text-sm"
                            />
                          </div>
                        </div>
                        <div className="max-h-[200px] overflow-y-auto p-1 bg-white">
                          {filteredCustomers.length > 0 ? (
                            filteredCustomers.map((c) => (
                              <div
                                key={c.id}
                                onClick={() => {
                                  updateField("customer", c.id);
                                  setOpenCustomer(false);
                                }}
                                className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer rounded-md text-sm text-gray-700"
                              >
                                <span className="flex-1 truncate">
                                  {c.name}
                                </span>
                                {formData.customer === c.id && (
                                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                                )}
                              </div>
                            ))
                          ) : (
                            <div className="p-3 text-center">
                              <p className="text-sm text-gray-500 mb-2">
                                ไม่พบลูกค้า "{customerSearch}"
                              </p>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  setShowCreateLead(true)
                                }
                                className="w-full"
                              >
                                <UserPlus className="w-4 h-4 mr-2" />{" "}
                                เพิ่มลีดใหม่
                              </Button>
                            </div>
                          )}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Contacts */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-1.5 sm:gap-4">
                  <Label className="text-emerald-900 font-medium text-sm sm:w-40 sm:pt-2 sm:text-right shrink-0">
                    รายชื่อผู้ติดต่อ
                  </Label>
                  <div className="flex-1 min-w-0 space-y-2">
                    <Input
                      value={contactInput}
                      onChange={(e) =>
                        setContactInput(e.target.value)
                      }
                      onKeyDown={handleAddContact}
                      placeholder="พิมพ์ชื่อแล้วกด Enter..."
                      className="h-9 border-emerald-200"
                    />
                    {formData.customerContacts.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {formData.customerContacts.map(
                          (name, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center bg-white text-gray-700 px-2.5 py-1 rounded-md text-xs border border-emerald-200 shadow-sm"
                            >
                              {name}
                              <button
                                type="button"
                                onClick={() =>
                                  updateField(
                                    "customerContacts",
                                    formData.customerContacts.filter(
                                      (c) => c !== name,
                                    ),
                                  )
                                }
                                className="ml-1.5 hover:text-red-500"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </span>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Description (วาระการประชุม / รายละเอียดงาน) */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-1.5 sm:gap-4">
              <Label
                htmlFor="description"
                className="text-gray-700 font-medium text-sm sm:w-40 sm:pt-2.5 sm:text-right shrink-0"
              >
                {isActivityMode
                  ? "วาระ / รายละเอียด"
                  : "รายละเอียดงาน"}
              </Label>
              <div className="flex-1 min-w-0">
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    updateField("description", e.target.value)
                  }
                  placeholder="เพิ่มรายละเอียด..."
                  className="border-gray-200 focus:border-emerald-500 min-h-[100px] bg-white shadow-sm"
                  rows={4}
                />
              </div>
            </div>

            {/* Linked Entities (เกี่ยวข้องกับ) */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-1.5 sm:gap-4">
              <Label className="text-gray-700 font-medium text-sm sm:w-40 sm:pt-2.5 sm:text-right shrink-0">
                เกี่ยวข้องกับ
              </Label>
              <div className="flex-1 min-w-0 space-y-3">
                <Popover
                  open={linkDropdownOpen}
                  onOpenChange={setLinkDropdownOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-between h-10 border-gray-200 hover:bg-gray-50 font-normal bg-white shadow-sm text-left px-3"
                    >
                      <span
                        className={cn(
                          "flex-1 truncate text-left text-sm",
                          linkedEntities.length === 0
                            ? "text-gray-400"
                            : "text-gray-900",
                        )}
                      >
                        {linkedEntities.length === 0
                          ? "เลือกรายการที่เกี่ยวข้อง"
                          : `${linkedEntities.length} รายการที่เชื่อมโยง`}
                      </span>
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-40" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="p-0 bg-white shadow-xl border border-gray-200"
                    align="start"
                    style={{
                      width: "420px",
                      maxWidth: "100vw",
                    }}
                  >
                    <div className="p-3 space-y-3">
                      <div className="flex gap-2 flex-wrap">
                        {ENTITY_TYPES.map((type) => (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => {
                              setSelectedEntityType(type.value);
                              setSearchQuery("");
                            }}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              selectedEntityType === type.value
                                ? "bg-emerald-500 text-white shadow-sm"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            <span className="mr-1">
                              {type.icon}
                            </span>
                            {type.label}
                          </button>
                        ))}
                      </div>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          type="text"
                          placeholder={`ค้นหา${ENTITY_TYPES.find((t) => t.value === selectedEntityType)?.label}...`}
                          value={searchQuery}
                          onChange={(e) =>
                            setSearchQuery(e.target.value)
                          }
                          className="h-9 text-sm pl-9 border-gray-200"
                        />
                      </div>
                      <div className="max-h-[240px] overflow-y-auto space-y-1">
                        {filteredEntities.length > 0 ? (
                          filteredEntities.map((entity) => {
                            const isLinked =
                              linkedEntities.some(
                                (e) =>
                                  e.type ===
                                    selectedEntityType &&
                                  e.id === entity.id,
                              );
                            return (
                              <div
                                key={entity.id}
                                onClick={() =>
                                  !isLinked &&
                                  addLinkedEntity(entity)
                                }
                                className={`flex items-center justify-between px-3 py-2.5 rounded-md cursor-pointer transition-colors ${
                                  isLinked
                                    ? "bg-emerald-50 cursor-not-allowed opacity-70"
                                    : "hover:bg-gray-50"
                                }`}
                              >
                                <div className="min-w-0 flex-1">
                                  <p className="text-xs font-medium text-gray-900 truncate">
                                    {entity.name}
                                  </p>
                                  <p className="text-[10px] text-gray-500">
                                    {entity.id}
                                  </p>
                                </div>
                                {isLinked && (
                                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0 ml-2" />
                                )}
                              </div>
                            );
                          })
                        ) : (
                          <p className="text-xs text-gray-500 text-center py-6">
                            ไม่พบข้อมูล
                          </p>
                        )}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                {/* การแสดงรายการเชื่อมโยงที่เลือกไว้ */}
                {linkedEntities.length > 0 && (
                  <div className="space-y-2">
                    {linkedEntities.map((entity, index) => (
                      <div
                        key={`${entity.type}-${entity.id}-${index}`}
                        className="flex items-center justify-between bg-gray-50 rounded-lg p-2 border border-gray-200"
                      >
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <span className="text-base">
                            {getEntityIcon(entity.type)}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium text-gray-900 truncate">
                              {entity.name}
                            </p>
                            <p className="text-[10px] text-gray-500">
                              {entity.id}
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            removeLinkedEntity(index)
                          }
                          className="h-7 w-7 p-0 hover:bg-red-50 flex-shrink-0"
                        >
                          <X className="h-3 w-3 text-red-600" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Visibility / การแชร์งาน */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-1.5 sm:gap-4">
              <Label
                htmlFor="visibility"
                className="text-gray-700 font-medium text-sm sm:w-40 sm:pt-2.5 sm:text-right shrink-0"
              >
                การแชร์งาน
              </Label>
              <div className="flex-1 min-w-0 space-y-3">
                <Combobox
                  options={[
                    {
                      value: "private",
                      label: "🔒 Private - เฉพาะตัวเอง",
                    },
                    {
                      value: "public",
                      label: "👥 Public - เลือกผู้แชร์",
                    },
                    {
                      value: "organization",
                      label: "🌐 Organization - ทุกคน",
                    },
                  ]}
                  value={formData.visibility}
                  onValueChange={(value: string) =>
                    updateField("visibility", value)
                  }
                  className="border-gray-200 shadow-sm"
                />
                {/* Share with specifics */}
                {formData.visibility === "public" && (
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 animate-in fade-in slide-in-from-top-1">
                    <Label className="text-xs font-semibold text-gray-700 mb-3 block">
                      เลือกคนที่ต้องการแชร์
                    </Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {teamMembers.map((person) => (
                        <div
                          key={person.id}
                          className="flex items-center gap-2"
                        >
                          <Checkbox
                            id={`share-${person.id}`}
                            checked={formData.sharedWith.includes(
                              person.id,
                            )}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                updateField("sharedWith", [
                                  ...formData.sharedWith,
                                  person.id,
                                ]);
                              } else {
                                updateField(
                                  "sharedWith",
                                  formData.sharedWith.filter(
                                    (id) => id !== person.id,
                                  ),
                                );
                              }
                            }}
                          />
                          <label
                            htmlFor={`share-${person.id}`}
                            className="text-sm text-gray-700 cursor-pointer truncate"
                          >
                            {person.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-6 pb-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="w-full sm:w-auto border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 h-10 px-6 rounded-[14px]"
              >
                ยกเลิก
              </Button>
              <Button
                type="submit"
                className="w-full sm:w-auto bg-[#705ADD] hover:bg-[#5B21B6] text-white font-semibold shadow-[0px_10px_15px_-3px_rgba(112,90,221,0.2)] h-10 px-6 rounded-[14px]"
              >
                {isActivityMode
                  ? "สร้าง To-Do และบันทึกกิจกรรม"
                  : "บันทึกข้อมูล"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ==========================================
// 🟢 ส่วนที่ 4: APP WRAPPER สำหรับการ PREVIEW
// ==========================================

export default function App() {
  const [open, setOpen] = useState(true);
  const [toastMsg, setToastMsg] = useState<{
    msg: string;
    type: string;
  } | null>(null);

  useEffect(() => {
    const handleToast = (e: any) => {
      setToastMsg(e.detail);
      setTimeout(() => setToastMsg(null), 3000);
    };
    toastEmitter.addEventListener("show-toast", handleToast);
    return () =>
      toastEmitter.removeEventListener(
        "show-toast",
        handleToast,
      );
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center max-w-md w-full">
        <h1 className="text-xl font-bold text-gray-900 mb-2">
          ทดสอบฟอร์มสร้างกิจกรรม
        </h1>
        <p className="text-gray-500 mb-6 text-sm">
          คลิกปุ่มด้านล่างเพื่อเปิดแบบฟอร์ม
        </p>
        <Button
          onClick={() => setOpen(true)}
          className="w-full bg-[#059669] hover:bg-[#047857]"
        >
          <Plus className="mr-2 h-4 w-4" /> เปิดฟอร์มสร้างงาน
        </Button>
      </div>

      <QuickCreateTaskDialog
        isOpen={open}
        onClose={() => setOpen(false)}
      />

      {/* Toast Notification */}
      {toastMsg && (
        <div
          className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-lg text-sm font-medium animate-in fade-in slide-in-from-bottom-5 z-[100] flex items-center gap-2 ${
            toastMsg.type === "error"
              ? "bg-red-600 text-white"
              : "bg-gray-900 text-white"
          }`}
        >
          {toastMsg.type === "error" ? (
            <X className="w-4 h-4" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          )}
          {toastMsg.msg}
        </div>
      )}
    </div>
  );
}
export { QuickCreateTaskDialog as CreateTaskDialog };