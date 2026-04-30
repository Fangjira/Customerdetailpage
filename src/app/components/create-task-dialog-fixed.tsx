import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Calendar, Users, Lock, Globe, Check, ChevronDown, X, Plus,
  Link2, CheckCircle2, Briefcase, Building2, UserPlus, Search
} from "lucide-react";
import { useModuleManager } from "../hooks/use-module-manager";
import { toast } from "sonner";

// Import your actual UI components (replace with your real imports)
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join('');

// Combobox component (simplified - use your actual one)
const Combobox = ({ options, value, onValueChange, placeholder, className }: any) => (
  <select
    value={value}
    onChange={(e) => onValueChange(e.target.value)}
    className={cn("w-full h-10 px-3 border rounded-lg", className)}
  >
    <option value="">{placeholder}</option>
    {options.map((opt: any) => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ))}
  </select>
);

// Mock data - replace with your actual data
const TASK_TYPES = [
  { value: "follow_up", label: "ติดตามลูกค้า - Follow Up" },
  { value: "meeting", label: "นัดหมาย - Meeting" },
  { value: "call", label: "โทรศัพท์ - Call" },
  { value: "email", label: "ส่งอีเมล - Email" },
  { value: "visit", label: "เยี่ยมลูกค้า - Visit" },
  { value: "other", label: "อื่นๆ - Other" },
];

const teamMembers = [
  { id: "1", name: "คุณสมชาย" },
  { id: "2", name: "คุณสมหญิง" },
  { id: "3", name: "คุณประยุทธ" },
];

interface TaskFormData {
  titleType: string[];
  customTitle: string;
  description: string;
  priority: string;
  dueDate: string;
  assignees: string[];
  attendees: string[];
  relatedEntities: any[];
  visibility: string;
}

interface QuickCreateTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: "task" | "activity";
}

export function QuickCreateTaskDialog({ isOpen, onClose, mode = "task" }: QuickCreateTaskDialogProps) {
  // ✅ FIX #1: Connect to Universal CRUD System
  const tasks = useModuleManager('tasks');

  const isActivityMode = mode === "activity";

  const [formData, setFormData] = useState<TaskFormData>({
    titleType: [],
    customTitle: "",
    description: "",
    priority: "",
    dueDate: "",
    assignees: [],
    attendees: [],
    relatedEntities: [],
    visibility: "private",
  });

  const [assigneeDropdownOpen, setAssigneeDropdownOpen] = useState(false);
  const [attendeeDropdownOpen, setAttendeeDropdownOpen] = useState(false);

  const updateField = (field: keyof TaskFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      titleType: [],
      customTitle: "",
      description: "",
      priority: "",
      dueDate: "",
      assignees: [],
      attendees: [],
      relatedEntities: [],
      visibility: "private",
    });
  };

  // ✅ FIX #2: Proper handleSubmit with e.preventDefault() and actual record creation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // ✅ Already present - prevents page reload

    // Validation
    if (formData.titleType.length === 0) {
      toast.error("โปรดเลือกประเภทงานอย่างน้อย 1 หัวข้อ");
      return;
    }

    if (!formData.priority) {
      toast.error("โปรดเลือกระดับความสำคัญของงาน");
      return;
    }

    if (formData.assignees.length === 0) {
      toast.error("โปรดเลือกพนักงานที่ต้องการ 'มอบหมายให้' อย่างน้อย 1 คน");
      return;
    }

    if (isActivityMode && formData.attendees.length === 0) {
      toast.error("โปรดเลือก 'ผู้รับผิดชอบ / เข้าร่วม' กิจกรรม อย่างน้อย 1 คน");
      return;
    }

    // Build final title from selected types
    const selectedLabels = formData.titleType
      .filter(t => t !== "other")
      .map(t => TASK_TYPES.find(tt => tt.value === t)?.label.split(' - ')[0]);

    if (formData.titleType.includes("other") && formData.customTitle) {
      selectedLabels.push(formData.customTitle);
    }
    const finalTitle = selectedLabels.join(", ") || "ไม่มีหัวข้อ";

    // ✅ FIX #3: Actually CREATE the record using Universal CRUD System
    try {
      const newTask = tasks.createRecord({
        title: finalTitle,
        description: formData.description,
        priority: formData.priority as "high" | "medium" | "low",
        status: "todo", // or "open" depending on your schema
        dueDate: formData.dueDate,
        assignee: formData.assignees.join(", "), // or just first one: formData.assignees[0]
        completed: false,
        activityType: isActivityMode ? formData.titleType[0] : undefined,
        // Add any other fields your Task interface requires
      });

      // ✅ FIX #4: UI updates are now INSTANT because Zustand triggers re-render
      toast.success(`${isActivityMode ? 'สร้าง Activity' : 'สร้างงาน'}: ${finalTitle}`);

      console.log("✅ Task created successfully:", newTask);

      resetForm();
      onClose();
    } catch (error) {
      console.error("❌ Error creating task:", error);
      toast.error("เกิดข้อผิดพลาดในการสร้างงาน");
    }
  };

  const handleAssigneeToggle = (personId: string) => {
    if (formData.assignees.includes(personId)) {
      updateField("assignees", formData.assignees.filter(id => id !== personId));
    } else {
      updateField("assignees", [...formData.assignees, personId]);
    }
  };

  const getSelectedNames = (ids: string[]) => {
    if (ids.length === 0) return "";
    const names = ids.map(id => teamMembers.find(m => m.id === id)?.name || id);
    return names.join(", ");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isActivityMode ? "สร้าง Activity ใหม่" : "สร้างงานใหม่"}
          </DialogTitle>
          <DialogDescription>
            เพิ่มงานใหม่และมอบหมายให้ทีม
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Task Type */}
          <div className="space-y-2">
            <Label className="text-gray-900">
              ประเภทงาน / หัวข้อ <span className="text-red-500">*</span>
            </Label>
            <div className="flex flex-wrap gap-2">
              {TASK_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => {
                    if (formData.titleType.includes(type.value)) {
                      updateField("titleType", formData.titleType.filter(t => t !== type.value));
                    } else {
                      updateField("titleType", [...formData.titleType, type.value]);
                    }
                  }}
                  className={cn(
                    "px-3 py-1.5 rounded-lg border text-sm transition-colors",
                    formData.titleType.includes(type.value)
                      ? "bg-emerald-100 border-emerald-500 text-emerald-700"
                      : "bg-white border-gray-200 hover:bg-gray-50"
                  )}
                >
                  {type.label.split(' - ')[0]}
                </button>
              ))}
            </div>

            {formData.titleType.includes("other") && (
              <Input
                value={formData.customTitle}
                onChange={(e) => updateField("customTitle", e.target.value)}
                placeholder="โปรดระบุหัวข้องานอื่นๆ..."
                required
                className="mt-2"
              />
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>รายละเอียด</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="เพิ่มรายละเอียด..."
              rows={3}
            />
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label>
              ความสำคัญ <span className="text-red-500">*</span>
            </Label>
            <Combobox
              options={[
                { value: "high", label: "🔴 สูง" },
                { value: "medium", label: "🟠 ปานกลาง" },
                { value: "low", label: "🔵 ต่ำ" },
              ]}
              value={formData.priority}
              onValueChange={(value: string) => updateField("priority", value)}
              placeholder="เลือกระดับความสำคัญ"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Assignees */}
            <div className="space-y-2">
              <Label>
                มอบหมายให้ <span className="text-red-500">*</span>
              </Label>
              <Popover open={assigneeDropdownOpen} onOpenChange={setAssigneeDropdownOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-between"
                  >
                    <span className="truncate">
                      {getSelectedNames(formData.assignees) || "เลือกพนักงาน"}
                    </span>
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[280px] p-2">
                  <div className="space-y-1">
                    {teamMembers.map((person) => (
                      <div
                        key={person.id}
                        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
                        onClick={() => handleAssigneeToggle(person.id)}
                      >
                        <Checkbox
                          checked={formData.assignees.includes(person.id)}
                          onCheckedChange={() => handleAssigneeToggle(person.id)}
                        />
                        <span className="text-sm">{person.name}</span>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Due Date */}
            <div className="space-y-2">
              <Label>
                กำหนดส่ง <span className="text-red-500">*</span>
              </Label>
              <Input
                type="datetime-local"
                value={formData.dueDate}
                onChange={(e) => updateField("dueDate", e.target.value)}
                required={!isActivityMode}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              ยกเลิก
            </Button>
            <Button type="submit">
              บันทึก
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { QuickCreateTaskDialog as CreateTaskDialog };
export default QuickCreateTaskDialog;
