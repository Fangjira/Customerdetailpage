import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import {
  X,
  ArrowRightLeft,
  User,
  Building2,
  Share2,
  UserCircle2,
  ChevronDown,
  Layers,
  Check,
  Plus,
  ArrowRight,
  Receipt,
  Percent,
  CheckCircle2,
  ShieldAlert,
  AlertTriangle,
  Briefcase
} from "lucide-react";

interface TransferOwnershipDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerName?: string;
  customerId?: string;
  currentOwner?: string;
  currentBU?: string;
}

export function TransferOwnershipDialog({
  open,
  onOpenChange,
  customerName = "",
  customerId = "",
  currentOwner = "",
  currentBU = ""
}: TransferOwnershipDialogProps) {
  const [transferType, setTransferType] = useState("change-owner");
  const [transferScope, setTransferScope] = useState("all");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [newOwner, setNewOwner] = useState("");
  const [reason, setReason] = useState("");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const serviceDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setSearchQuery(newOwner);
      }
      if (serviceDropdownRef.current && !serviceDropdownRef.current.contains(event.target as Node)) {
        setIsServiceDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [newOwner]);

  const handleConfirm = () => {
    console.log("Transferred Customer Data:", { transferType, transferScope, selectedServices, newOwner, reason });
    onOpenChange(false);
  };

  const owners = [
    "Automotive", "Cold Chain", "Commodity", "Healthcare & Pharmaceutical",
    "Freight", "JTS", "B2B2C", "ASEAN Island and Taiwan", "CLMV+China", "Commercial"
  ];

  const availableServices = [
    { id: "srv-01", name: "Sea Freight (FCL/LCL)", type: "Ocean" },
    { id: "srv-02", name: "Air Freight", type: "Air" },
    { id: "srv-03", name: "Customs Clearance", type: "Customs" },
    { id: "srv-04", name: "Domestic Trucking", type: "Land" }
  ];

  const transferOptions = [
    { id: "change-owner", label: "เปลี่ยนเจ้าของ", icon: User },
    { id: "transfer-bu", label: "โอนย้าย BU", icon: Building2 },
    { id: "share-bu", label: "แชร์ BU", icon: Share2 }
  ];

  const filteredOwners = owners.filter(owner =>
    owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectOwner = (owner: string) => {
    setNewOwner(owner);
    setSearchQuery(owner);
    setIsDropdownOpen(false);
  };

  const isShare = transferType === 'share-bu';
  const actionKeyword = isShare ? 'แชร์' : 'โอนย้าย';

  const getPolicy = () => {
    switch (transferType) {
      case 'share-bu':
        return { bill: 'แยกออกบิลตามหน่วยธุรกิจที่รับงาน', com: 'แบ่งสัดส่วนตามข้อตกลง (Contribution)', colorBill: 'text-emerald-600', colorCom: 'text-emerald-600' };
      case 'change-owner':
        return { bill: 'ออกบิลโดยเจ้าของใหม่ 100%', com: 'ไม่ได้รับค่าคอมมิชชัน (สิทธิ์ขาด)', colorBill: 'text-amber-600', colorCom: 'text-amber-600' };
      case 'transfer-bu':
        return { bill: 'ออกบิลโดย BU ปลายทาง 100%', com: 'ได้รับค่าคอมมิชชันฐานะผู้แนะนำ', colorBill: 'text-purple-600', colorCom: 'text-purple-600' };
      default:
        return { bill: '', com: '', colorBill: '', colorCom: '' };
    }
  };
  const policy = getPolicy();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[760px] !max-h-[85vh] !p-0 !overflow-hidden">
        <DialogHeader className="px-6 py-4 flex flex-row items-center justify-between border-b border-slate-100 space-y-0">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center border border-indigo-100">
              <ArrowRightLeft className="h-4 w-4 text-indigo-600" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-slate-800 tracking-tight leading-tight">
                จัดการโอนย้ายลูกค้า
              </DialogTitle>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                กำหนดสิทธิ์และผู้รับผิดชอบใหม่สำหรับลูกค้ารายนี้
              </p>
            </div>
          </div>
        </DialogHeader>

        <DialogDescription className="sr-only">
          Transfer customer ownership dialog
        </DialogDescription>

        {/* Body - Split Grid */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-full">

            {/* LEFT COLUMN: Actions (Form) */}
            <div className="md:col-span-7 p-6 space-y-6 bg-white">

              {/* Transfer Type - Segmented Control */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  1. รูปแบบการโอนย้าย (Scenario)
                </label>
                <div className="flex p-1 bg-slate-100/80 rounded-xl overflow-x-auto custom-scrollbar">
                  {transferOptions.map((option) => {
                    const Icon = option.icon;
                    const isActive = transferType === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => setTransferType(option.id)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 min-w-fit rounded-lg text-[13px] font-semibold transition-all duration-200 whitespace-nowrap ${
                          isActive
                            ? "bg-white text-indigo-600 shadow-sm ring-1 ring-slate-900/5"
                            : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                        }`}
                      >
                        <Icon className={`h-4 w-4 ${isActive ? "text-indigo-600" : "text-slate-400"}`} />
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Transfer Scope (All vs Partial Services) */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  2. ขอบเขตการ{actionKeyword}
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => { setTransferScope('all'); setSelectedServices([]); }}
                    className={`flex flex-col items-start p-2.5 rounded-xl border-2 transition-all duration-200 ${
                      transferScope === 'all'
                        ? "border-indigo-600 bg-indigo-50/50"
                        : "border-slate-100 bg-white hover:border-slate-200"
                    }`}
                  >
                    <span className={`text-[13px] font-bold ${transferScope === 'all' ? 'text-indigo-700' : 'text-slate-700'}`}>{actionKeyword}ทั้งหมด</span>
                    <span className="text-[11px] text-slate-500 font-medium mt-0.5 line-clamp-1">ลูกค้าและประวัติทั้งหมด</span>
                  </button>
                  <button
                    onClick={() => setTransferScope('partial')}
                    className={`flex flex-col items-start p-2.5 rounded-xl border-2 transition-all duration-200 ${
                      transferScope === 'partial'
                        ? "border-indigo-600 bg-indigo-50/50"
                        : "border-slate-100 bg-white hover:border-slate-200"
                    }`}
                  >
                    <span className={`text-[13px] font-bold ${transferScope === 'partial' ? 'text-indigo-700' : 'text-slate-700'}`}>{actionKeyword}บางบริการ</span>
                    <span className="text-[11px] text-slate-500 font-medium mt-0.5 line-clamp-1">เลือกเฉพาะ Service</span>
                  </button>
                </div>
              </div>

              {/* Service Selection (Visible only if partial) */}
              {transferScope === 'partial' && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5" />
                    เลือกบริการที่ต้องการ{actionKeyword}
                  </label>

                  {/* Multi-select Dropdown for Services */}
                  <div className="relative group" ref={serviceDropdownRef}>
                    <div
                      onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                      className={`w-full min-h-[42px] pl-3 pr-8 py-1.5 bg-slate-50 border rounded-xl flex items-center flex-wrap gap-1.5 cursor-pointer transition-all ${
                        isServiceDropdownOpen
                          ? 'bg-white ring-2 ring-indigo-500/20 border-indigo-500'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {selectedServices.length === 0 ? (
                        <span className="text-[14px] text-slate-400 font-medium py-1">เลือกบริการ...</span>
                      ) : (
                        selectedServices.map(id => {
                          const srv = availableServices.find(s => s.id === id);
                          return (
                            <span
                              key={id}
                              className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-slate-200 rounded-md text-[12px] font-semibold text-slate-700 shadow-sm animate-in zoom-in duration-200"
                            >
                              {srv?.name}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedServices(prev => prev.filter(sId => sId !== id));
                                }}
                                className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-0.5 rounded transition-colors"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </span>
                          );
                        })
                      )}
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isServiceDropdownOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </div>

                    {/* Service Dropdown Menu */}
                    {isServiceDropdownOpen && (
                      <div className="absolute z-10 w-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg max-h-56 overflow-y-auto custom-scrollbar py-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                        {availableServices.map((service) => {
                          const isSelected = selectedServices.includes(service.id);
                          return (
                            <button
                              key={service.id}
                              type="button"
                              onClick={() => {
                                if (isSelected) {
                                  setSelectedServices(prev => prev.filter(id => id !== service.id));
                                } else {
                                  setSelectedServices(prev => [...prev, service.id]);
                                }
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2 transition-colors ${
                                isSelected ? 'bg-indigo-50/50' : 'hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <div className={`flex items-center justify-center h-4 w-4 rounded border transition-colors ${
                                  isSelected ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-300'
                                }`}>
                                  {isSelected && <Check className="h-3 w-3 text-white" />}
                                </div>
                                <span className={`text-[13px] ${isSelected ? 'font-bold text-indigo-700' : 'font-medium text-slate-700'}`}>
                                  {service.name}
                                </span>
                              </div>
                              <span className="text-[10px] font-bold text-slate-400 bg-white border border-slate-200 shadow-sm px-1.5 py-0.5 rounded">
                                {service.type}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Form Fields */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {transferScope === 'partial' ? '3.' : '2.'} ข้อมูลผู้รับผิดชอบใหม่
                  </label>

                  {/* Searchable Select Owner */}
                  <div className="relative group" ref={dropdownRef}>
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <UserCircle2 className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setIsDropdownOpen(true);
                      }}
                      onFocus={() => setIsDropdownOpen(true)}
                      placeholder="ค้นหาหรือเลือกผู้รับผิดชอบ..."
                      className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-slate-700 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                    />
                    <div
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>

                    {/* Owner Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute z-10 w-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg max-h-56 overflow-y-auto custom-scrollbar py-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                        {filteredOwners.length > 0 ? (
                          filteredOwners.map((owner) => (
                            <button
                              key={owner}
                              type="button"
                              onClick={() => handleSelectOwner(owner)}
                              className={`w-full flex items-center justify-between px-3 py-2 text-[13px] transition-colors ${
                                newOwner === owner
                                  ? 'bg-indigo-50/50 text-indigo-700 font-bold'
                                  : 'text-slate-700 font-medium hover:bg-slate-50'
                              }`}
                            >
                              {owner}
                              {newOwner === owner && (
                                <Check className="h-4 w-4 text-indigo-600" />
                              )}
                            </button>
                          ))
                        ) : (
                          <div className="px-3 py-4 text-center text-[13px] text-slate-500 font-medium">
                            ไม่พบรายชื่อที่ค้นหา "{searchQuery}"
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Reason */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex justify-between">
                    <span>{transferScope === 'partial' ? '4.' : '3.'} เหตุผลในการ{actionKeyword}</span>
                    <span className="text-slate-300 font-medium normal-case">* จำเป็น</span>
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="ระบุเหตุผลเพื่อเป็นข้อมูลอ้างอิงในระบบ..."
                    className="w-full h-[80px] p-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-slate-700 placeholder-slate-400 resize-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Context & Summary */}
            <div className="md:col-span-5 bg-slate-50/50 border-l border-slate-100 p-6 flex flex-col justify-between">
              <div className="space-y-5">

                {/* Current Customer Info Card */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                  <div>
                    <span className="inline-flex items-center px-2 py-0.5 bg-slate-100 text-slate-600 text-[11px] rounded-md font-bold tracking-wide mb-1.5">
                      {customerId}
                    </span>
                    <h3 className="text-[15px] font-bold text-slate-800 leading-tight">
                      {customerName}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-slate-100">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Owner</p>
                      <div className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-700 line-clamp-1">
                        <div className="h-4 w-4 rounded-full bg-slate-200 flex items-center justify-center text-[9px] flex-shrink-0">
                          {currentOwner.charAt(0)}
                        </div>
                        {currentOwner}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Business Unit</p>
                      <div className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-700">
                        <Briefcase className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                        {currentBU}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Impact Flow */}
                <div className="space-y-3">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldAlert className="h-3.5 w-3.5 text-slate-400" />
                    ผลกระทบการ{actionKeyword}
                  </h4>

                  {/* Pipeline Visual */}
                  {isShare ? (
                    <div className="flex items-center gap-2 p-1 bg-slate-200/50 rounded-lg">
                      <div className="flex-1 bg-white py-1.5 px-2 rounded-md border border-slate-200 text-center shadow-sm">
                        <span className="text-[11px] font-bold text-slate-500 block mb-0.5">เจ้าของหลัก</span>
                        <span className="text-[12px] font-bold text-slate-800">{currentBU}</span>
                      </div>
                      <div className="flex items-center justify-center h-5 w-5 rounded-full bg-slate-300 text-slate-600 flex-shrink-0">
                        <Plus className="h-3.5 w-3.5" />
                      </div>
                      <div className="flex-1 bg-emerald-600 py-1.5 px-2 rounded-md border border-emerald-500 text-center shadow-sm">
                        <span className="text-[11px] font-medium text-emerald-100 block mb-0.5">ผู้ร่วมดูแล</span>
                        <span className="text-[12px] font-bold text-white line-clamp-1">{newOwner || "เลือก BU"}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 p-1 bg-slate-200/50 rounded-lg">
                      <div className="flex-1 bg-white py-1.5 px-2 rounded-md border border-slate-200 text-center shadow-sm">
                        <span className="text-[11px] font-bold text-slate-500 block mb-0.5">จาก</span>
                        <span className="text-[12px] font-bold text-slate-800">{currentBU}</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-400 flex-shrink-0" />
                      <div className="flex-1 bg-indigo-600 py-1.5 px-2 rounded-md border border-indigo-500 text-center shadow-sm">
                        <span className="text-[11px] font-medium text-indigo-200 block mb-0.5">ไปยัง</span>
                        <span className="text-[12px] font-bold text-white line-clamp-1">{newOwner || "Target BU"}</span>
                      </div>
                    </div>
                  )}

                  {/* Policy Rules (Billing & Commission) */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-xl border border-slate-100 bg-white shadow-sm">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Receipt className={`h-3.5 w-3.5 ${policy.colorBill}`} />
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${policy.colorBill}`}>Billing Policy</span>
                      </div>
                      <p className="text-[11px] font-semibold text-slate-700 leading-tight">
                        {policy.bill}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl border border-slate-100 bg-white shadow-sm">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Percent className={`h-3.5 w-3.5 ${policy.colorCom}`} />
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${policy.colorCom}`}>Commission</span>
                      </div>
                      <p className="text-[11px] font-semibold text-slate-700 leading-tight">
                        {policy.com}
                      </p>
                    </div>
                  </div>

                  {/* Checklist */}
                  <div className="bg-white rounded-xl border border-slate-200 p-3.5 space-y-2 shadow-sm transition-all duration-300">
                    <p className="text-[11px] font-bold text-slate-800 mb-1">
                      {transferScope === 'all'
                        ? `ข้อมูลที่จะถูก${isShare ? 'แชร์' : 'ย้าย'}สิทธิ์:`
                        : `ข้อมูลที่จะถูก${isShare ? 'แชร์' : 'ย้าย'}สิทธิ์ (เฉพาะบริการ):`}
                    </p>
                    <div className="space-y-2">
                      {transferScope === 'all' ? (
                        <>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className={`h-3.5 w-3.5 flex-shrink-0 mt-0.5 ${isShare ? 'text-emerald-500' : 'text-emerald-500'}`} />
                            <span className="text-[12px] text-slate-600 font-medium leading-tight">ข้อมูลลูกค้าพื้นฐานทั้งหมด</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span className="text-[12px] text-slate-600 font-medium leading-tight">ประวัติการติดต่อและบันทึกทุกบริการ</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span className="text-[12px] text-slate-600 font-medium leading-tight">ไฟล์แนบและเอกสารทั้งหมด</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className={`h-3.5 w-3.5 flex-shrink-0 mt-0.5 ${isShare ? 'text-emerald-500' : 'text-indigo-500'}`} />
                            <span className="text-[12px] text-slate-600 font-medium leading-tight">
                              สิทธิ์ในการจัดการ <span className={`font-bold ${isShare ? 'text-emerald-700' : 'text-indigo-700'}`}>{selectedServices.length > 0 ? `${selectedServices.length} บริการที่เลือก` : 'บริการที่เลือก'}</span>
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span className="text-[12px] text-slate-600 font-medium leading-tight">ประวัติและเอกสารที่ผูกกับบริการ</span>
                          </div>
                          <div className="flex items-start gap-2 opacity-60">
                            <X className="h-3.5 w-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                            <span className="text-[12px] text-slate-500 font-medium leading-tight">บริการอื่นๆ จะยังคงมีแค่คุณที่เข้าถึงได้</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Warning Alert */}
              <div className={`mt-4 flex items-start gap-2.5 p-3 rounded-xl border transition-colors ${
                transferType === 'change-owner'
                  ? 'bg-amber-50/80 border-amber-200/60'
                  : 'bg-indigo-50/80 border-indigo-200/60'
              }`}>
                <AlertTriangle className={`h-4 w-4 flex-shrink-0 mt-0.5 ${transferType === 'change-owner' ? 'text-amber-500' : 'text-indigo-500'}`} />
                <p className={`text-[12px] leading-relaxed font-medium ${transferType === 'change-owner' ? 'text-amber-800' : 'text-indigo-800'}`}>
                  {transferType === 'change-owner'
                    ? 'ระวัง: สิทธิ์การเข้าถึงลูกค้านี้จะถูกโอนไปยังเจ้าของใหม่ทันที และคุณจะไม่ได้รับค่าคอมมิชชัน'
                    : 'ข้อมูลจะถูกส่งไปยังระบบและผู้รับผิดชอบใหม่เพื่อรับทราบเงื่อนไขและผลตอบแทนร่วมกัน'
                  }
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-white flex items-center justify-between rounded-b-[20px]">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="px-5 py-2 text-[13px] text-slate-500 font-bold hover:text-slate-800"
          >
            ยกเลิกการ{actionKeyword}
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!newOwner || !reason || (transferScope === 'partial' && selectedServices.length === 0)}
            className={`flex items-center gap-1.5 px-6 py-2 text-white text-[13px] font-bold rounded-xl shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              isShare
                ? 'bg-emerald-600 shadow-emerald-200 hover:bg-emerald-700'
                : 'bg-indigo-600 shadow-indigo-200 hover:bg-indigo-700'
            }`}
          >
            ยืนยันการทำรายการ
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          .custom-scrollbar::-webkit-scrollbar {
            width: 5px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #cbd5e1;
            border-radius: 20px;
          }
        `}} />
      </DialogContent>
    </Dialog>
  );
}
