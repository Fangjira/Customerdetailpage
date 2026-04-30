"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import {
  X, Calendar, MapPin, ChevronLeft, ChevronsUpDown, Check, Search,
  Plus, Users, UserPlus, Briefcase, Mail, Smartphone, ChevronDown
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { Badge } from "../ui/badge";
import { useIsMobile } from "../ui/use-mobile";
import { cn } from "../ui/utils";
import { useLanguage } from "../../../contexts/language-context";

const teamMembers = [
  { id: "u1", name: "Sarah Chen" },
  { id: "u2", name: "Michael Wong" },
  { id: "u3", name: "คุณอุ้ย (Manager)" },
];

const initialCustomers = [
  { id: "c1", name: "Pacific Distribution Co." },
  { id: "c2", name: "SCG Logistics" },
];

const activityTypesList = [
  { value: "customer_visit", label: "เยี่ยมลูกค้า (Customer Visit)" },
  { value: "online_meeting", label: "ประชุมออนไลน์ / Zoom, Teams" },
  { value: "sales_meeting", label: "ประชุมทีมขาย" },
];


const serviceNames: Record<string, string> = {
  freight: "Freight", warehouse: "Warehouse", customs: "Customs"
};
const servicesList = Object.entries(serviceNames).map(([key, value]) => ({ value: key, label: value }));

export function AddActivityModal({ activity, isOpen, onClose, onSave }: any) {
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  const [formData, setFormData] = useState<any>({
    customerContacts: [],
    attendees: [],
    services: [],
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
    if (isOpen && activity) {
      setFormData({
        ...activity,
        startDateTime: activity.startTime ? new Date(activity.startTime).toISOString().slice(0, 16) : "2026-04-27T15:55",
        endDateTime: activity.endTime ? new Date(activity.endTime).toISOString().slice(0, 16) : "2026-04-27T16:55",
        customerContacts: activity.customerContacts || [],
        attendees: activity.attendees || [],
        services: activity.services || [],
      });
    }
  }, [isOpen, activity]);

  const updateField = (field: string, value: any) => setFormData((prev: any) => ({ ...prev, [field]: value }));

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
    const newCustomer = { id: `new-${Date.now()}`, name: customerSearch, email: leadData.email, phone: leadData.phone };
    setCustomers((prev) => [...prev, newCustomer]);
    updateField("customer", newCustomer.id);
    setShowCreateLead(false);
    setOpenCustomer(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave?.({ ...formData, startTime: new Date(formData.startDateTime), endTime: new Date(formData.endDateTime) });
    onClose();
  };

  if (!isOpen) return null;



  // --- 🎨 UI Renderer (Inline JSX to fix Focus bug) ---

  const renderFields = (layout: "desktop" | "mobile") => {
  const isMob = layout === "mobile";
  const row = isMob ? "grid grid-cols-[120px_1fr] items-start gap-5 mb-4" : "space-y-1.5 mb-4";
  const labelStyle = cn(
      "font-semibold text-[#4C1D95] uppercase tracking-tight",
      isMob ? "text-sm text-right mt-3" : "text-[13px]"
    );
  const inputBase = cn(
      "w-full bg-[#F8FAFF] border-2 border-slate-200 rounded-[18px] px-5 transition-all outline-none",
      "text-slate-700 font-normal placeholder:text-slate-400 placeholder:font-normal", 
      isMob ? "h-10 text-[12px]" : "h-7 text-[12px]" 
    );

return (
      <div className={isMob ? "space-y-2 py-3" : "space-y-2 px-1"}>
        {/* 1. หัวข้อกิจกรรม */}
        <div className={row}>
          <Label className={labelStyle}>หัวข้อกิจกรรม *</Label>
          <Input
            value={formData.title}
            onChange={(e) => updateField("title", e.target.value)}
            className={cn("truncate", !formData.target && "text-slate-400 font-normal border-gray-200 focus-visible:ring-emerald-500 h-7 ")} 
            placeholder="ระบุชื่อกิจกรรม"
          />
        </div>

        {/* 2. เวลาเริ่มต้น / สิ้นสุด */}
        <div className={row}>
          <Label className={labelStyle}>เวลา</Label>
          <div className="flex items-center text-xs gap-2 ">
            <Input
              type="datetime-local"
              value={formData.startDateTime || ""}
              onChange={(e) => updateField("startDateTime", e.target.value)}
              className={cn("truncate", !formData.target && "flex justify-between items-center text-slate-400 font-normal text-[9px] border-gray-200 focus-visible:ring-emerald-500 h-7 w-180")} 

            />
            <span className="text-gray-500 text-sm ">ถึง</span>
            <Input
              type="datetime-local"
              value={formData.endDateTime || ""}
              onChange={(e) => updateField("endDateTime", e.target.value)}
              className={cn("truncate", !formData.target && "text-slate-400 font-normal border-gray-200 focus-visible:ring-emerald-500 h-7 w-180")} 
            />
          </div>
        </div>

        {/* 3. ประเภท & 4. บริการ */}
        <div className={isMob ? "space-y-0" : "grid grid-cols-2 gap-4"}>
          {/* ประเภท */}
          <div className={row}>
            <Label className={labelStyle}>ประเภท *</Label>
            <Popover open={openType} onOpenChange={setOpenType}>
              <PopoverTrigger asChild>
                <div className={cn(inputBase, "flex justify-between items-center cursor-pointer")}>
                  <span className={cn("truncate", !formData.interactionType && "text-slate-400 font-normal")}>
                    {formData.interactionType
                      ? activityTypesList.find(t => t.value === formData.interactionType)?.label
                      : "เลือกประเภท..."}
                  </span>
                  <ChevronsUpDown className="size-4 opacity-40" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0 z-[10001] shadow-2xl border-none rounded-2xl overflow-hidden">
                <Command>
                  <CommandList>
                    <CommandEmpty className="p-4 text-center text-slate-400 text-[13px]">ไม่พบประเภทกิจกรรม</CommandEmpty>
                    <CommandGroup>
                      {activityTypesList.map((t) => (
                        <CommandItem
                          key={t.value}
                          onSelect={() => { updateField("interactionType", t.value); setOpenType(false); }}
                          className="flex items-center gap-2 px-4 py-2.5 text-[12px] text-slate-700 hover:bg-indigo-50 cursor-pointer"
                        >
                          <div className={cn("w-1.5 h-1.5 rounded-full bg-indigo-400 opacity-0", formData.interactionType === t.value && "opacity-100")} />
                          {t.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* หัวข้อบริการ */}
          <div className={row}>
            <Label className={labelStyle}>หัวข้อบริการ</Label>
            <Popover open={openService} onOpenChange={setOpenService}>
              <PopoverTrigger asChild>
                <div className={cn(inputBase, "flex justify-between items-center cursor-pointer")}>
                  <span className={cn("truncate", formData.services.length === 0 && "text-slate-400 font-normal")}>
                    {formData.services.length > 0 ? `เลือกแล้ว ${formData.services.length} หัวข้อ` : "เลือกบริการ..."}
                  </span>
                  <ChevronsUpDown className="size-4 opacity-40" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[240px] p-0 z-[10001] shadow-2xl border-none rounded-2xl overflow-hidden">
                <Command>
                  <CommandList>
                    <CommandEmpty className="p-4 text-center text-slate-400 text-[13px]">ไม่พบหัวข้อบริการ</CommandEmpty>
                    <CommandGroup>
                      {servicesList.map((s) => (
                        <CommandItem
                          key={s.value}
                          onSelect={() => {
                            const isSelected = formData.services.includes(s.value);
                            updateField("services", isSelected ? formData.services.filter((v: any) => v !== s.value) : [...formData.services, s.value]);
                          }}
                          className="flex justify-between items-center px-4 py-2.5 text-[13px] text-slate-700 hover:bg-indigo-50"
                        >
                          {s.label}
                          {formData.services.includes(s.value) && <Check className="size-4 text-indigo-600 font-bold" />}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* 5. สถานที่ & 6. สาขา */}
        <div className={isMob ? "space-y-0" : "grid grid-cols-2 gap-4"}>
          <div className={row}>
            <Label className={labelStyle}>สถานที่</Label>
            <Input
              value={formData.location}
              onChange={(e) => updateField("location", e.target.value)}
              className={cn("truncate", !formData.target && "text-slate-400 font-normal border-gray-200 h-7 ")} 
              placeholder="เช่น ห้องประชุม 1"
            />
          </div>
          <div className={row}>
            <Label className={labelStyle}>สาขา/ไซด์งาน</Label>
            <Input
              value={formData.siteBranch}
              onChange={(e) => updateField("siteBranch", e.target.value)}
              className={inputBase}
              placeholder="เช่น สาขาบางซื่อ"
            />
          </div>
        </div>

        {/* 7. ลูกค้า & 8. ทีมงาน */}
        <div className={isMob ? "space-y-0" : "grid grid-cols-2 gap-4"}>
          {/* ลูกค้า */}
          <div className={row}>
            <Label className={labelStyle}>ลูกค้า/ลีด *</Label>
            <Popover open={openCustomer} onOpenChange={setOpenCustomer}>
              <PopoverTrigger asChild>
                <div className={cn(inputBase, "flex justify-between items-center cursor-pointer")}>
                  <span className={cn("truncate", !formData.customer && "text-slate-400 font-normal")}>
                    {formData.customer ? customers.find(c => c.id === formData.customer)?.name : "ค้นหาบริษัท..."}
                  </span>
                  <Search className="size-4 opacity-40" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[280px] p-0 z-[10001] shadow-2xl border-none rounded-2xl overflow-hidden">
                <Command>
                  <CommandInput placeholder="พิมพ์ชื่อบริษัท..." className="h-10 text-[13px]" />
                  <CommandList>
                    <CommandEmpty className="p-3 text-center">
                      <Button size="sm" variant="ghost" onClick={() => setShowCreateLead(true)} className="w-full text-indigo-600 font-bold hover:bg-indigo-50 text-[12px]">
                        <UserPlus className="h-4 w-4 mr-2" /> สร้างลีดใหม่
                      </Button>
                    </CommandEmpty>
                    <CommandGroup>
                      {customers.map(c => (
                        <CommandItem key={c.id} onSelect={() => { updateField("customer", c.id); setOpenCustomer(false); }} className="text-[13px]">{c.name}</CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* ทีมงาน */}
          <div className={row}>
            <Label className={labelStyle}>ทีมงาน</Label>
            <Popover open={openAttendee} onOpenChange={setOpenAttendee}>
              <PopoverTrigger asChild>
                <div className={cn(inputBase, "flex justify-between items-center cursor-pointer")}>
                  <span className={cn("truncate", formData.attendees.length === 0 && "text-slate-400 font-normal")}>
                    {formData.attendees.length > 0 ? `เลือกแล้ว ${formData.attendees.length} คน` : "เพิ่มสมาชิกทีม..."}
                  </span>
                  <Search className="size-4 opacity-40" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[260px] p-0 z-[10001] shadow-2xl border-none rounded-2xl overflow-hidden">
                <Command>
                  <CommandInput placeholder="ค้นหาชื่อทีมงาน..." className="h-7 text-[13px] border-none focus:ring-0" />
                  <CommandList>
                    <CommandEmpty className="p-4 text-center text-slate-400 text-[13px]">ไม่พบรายชื่อทีมงาน</CommandEmpty>
                    <CommandGroup>
                      {teamMembers.map((m) => (
                        <CommandItem
                          key={m.id}
                          onSelect={() => {
                            const isSelected = formData.attendees.includes(m.name);
                            updateField("attendees", isSelected ? formData.attendees.filter((n: any) => n !== m.name) : [...formData.attendees, m.name]);
                          }}
                          className="flex justify-between items-center px-4 py-2.5 text-[13px] hover:bg-indigo-50"
                        >
                          <div className="flex items-center gap-2">
                            <div className={cn("w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600", formData.attendees.includes(m.name) && "bg-indigo-600 text-white")}>
                              {m.name.substring(0, 2).toUpperCase()}
                            </div>
                            <span>{m.name}</span>
                          </div>
                          {formData.attendees.includes(m.name) && <Check className="size-4 text-indigo-600 font-bold" />}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* 9. ผู้ติดต่อ (Input + Badges) */}
        <div className={row}>
          <Label className={labelStyle}>ผู้ติดต่อ (Enter)</Label>
          <div className="flex-1 space-y-2">
            <Input
              value={contactInput}
              onChange={(e) => setContactInput(e.target.value)}
              onKeyDown={handleAddContact}
              className={inputBase}
              placeholder="พิมพ์ชื่อแล้วกด Enter"
            />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {formData.customerContacts.map((contact: string) => (
                <Badge key={contact} className="bg-indigo-50 text-indigo-600 border-none px-3 py-1 flex items-center gap-1.5 rounded-full text-[12px] font-bold shadow-sm">
                  {contact}
                  <X className="size-3.5 cursor-pointer opacity-60 hover:opacity-100" onClick={() => updateField("customerContacts", formData.customerContacts.filter((i: string) => i !== contact))} />
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* 10. รายละเอียด */}
        <div className={row}>
          <Label className={labelStyle}>รายละเอียด</Label>
          <Textarea
            value={formData.notes}
            onChange={(e) => updateField("notes", e.target.value)}
            className={cn(inputBase, "min-h-[80px] py-3 resize-none")}
            placeholder="ระบุรายละเอียดเพิ่มเติม..."
          />
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {isMobile ? (
        <div className="fixed inset-0 bg-white z-[9999] flex flex-col font-semi animate-in fade-in duration-200">
          <div className=" flex-1 pt-5  p-2 space-y-3 no-scrollbar ">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-[#F5F3FF] p-5 rounded-2xl">
                <Calendar className="size-7 text-[#705ADD]" />
              </div>
              <h2 className="text-2xl font-semibold text-[#1E1B4B]">
                เพิ่มกิจกรรม
              </h2>
            </div>
            {renderFields("mobile")}
          </div>
          <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-sm flex gap-2 z-[10000] border-t">
            <Button
              variant="ghost"
              onClick={onClose}
              className="flex-1 h-10 bg-[#F5F8FF] text-[#4C1D95] rounded-[22px] font-black text-lg"
            >
              ยกเลิก
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 h-14 bg-[#705ADD] text-white rounded-[22px] font-black text-lg shadow-[0_10px_25px_rgba(112,90,221,0.4)]"
            >
              สร้างกิจกรรม
            </Button>
          </div>
        </div>
      ) : (
        <DialogContent className="max-w-130 w-full max-h-[100dvh] p-2 bg-white border-none shadow-2xl rounded-[24px] flex flex-col ">
          <DialogHeader className=" pt-5 flex flex-row items-center relative shrink-1 border-b border-slate-50">
            <div className="bg-[#f5f3ff] p-2 rounded-xl shrink-1">
              <Calendar className="h-5 w-5 text-[#705add]" />
            </div>
            <DialogTitle className="text-lg font-bold text-[#1e1b4b] leading-none">
              {activity ? "แก้ไขกิจกรรม" : "เพิ่มกิจกรรม"}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute right-2 top-3 rounded-full text-slate-300 hover:text-slate-500 transition-colors"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col flex-1 overflow-hidden "
          >
            <div className="flex-1 overflow-y-auto px-3 py-2 no-scrollbar ">
              <div className="space-y-1 text-xs ">
               {renderFields("desktop")}
              </div>
            </div>
            {/* --- FOOTER: ยัดปุ่มให้ดูเป็นระบบเดียวกัน --- */}
            <div className="p-3 px-5 bg-white border-t flex justify-end gap-2 shrink-0">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="h-9 px-5 text-slate-500 font-bold text-[13px] hover:bg-slate-50 rounded-xl"
              >
                ยกเลิก
              </Button>
              <Button
                type="submit"
                className="h-9 px-6 bg-[#705add] hover:bg-[#5b48bd] text-white rounded-xl font-bold text-[13px] shadow-sm transition-all"
              >
                บันทึกกิจกรรม
              </Button>
            </div>
          </form>
        </DialogContent>
      )}
    </Dialog>
  );
}