import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import {
  ChevronLeft,
  Plus,
  Phone,
  Mail,
  MapPin,
  Building2,
  Users,
  User,
  TrendingUp,
  Eye,
  Menu,
  Search,
  Edit,
  Edit2,
  Save,
  X,
  Trash2,
  Check,
  FileDown,
  Lock,
  TrendingDown,
  Award,
  AlertCircle,
  ArrowRightLeft,
  UserCircle2,
  ChevronDown,
  Layers,
  AlertTriangle,
  ArrowRight,
  Receipt,
  Percent,
  CheckCircle2,
  ShieldAlert,
  Share2,
  Briefcase
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { AddTagInterestDialog } from "../add-tag-interest-dialog";
import { DealWinLossDialog } from "../deal-winloss-dialog";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// --- TransferCustomerModal Component ---
interface TransferCustomerModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  customerName?: string;
  customerId?: string;
  currentOwner?: string;
  currentBU?: string;
}

function TransferCustomerModal({
  isOpen = false,
  onClose = () => {},
  customerName = "",
  customerId = "",
  currentOwner = "",
  currentBU = ""
}: TransferCustomerModalProps) {
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
  
  if (!isOpen) return null;
  
  const handleConfirm = () => {
    console.log("Transferred Customer Data:", { transferType, transferScope, selectedServices, newOwner, reason });
    onClose();
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
    <>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-all duration-300"
        onClick={onClose}
      />

      {/* Modal Container - Compact Split Layout */}
      <div 
        className="relative bg-white rounded-[20px] shadow-2xl w-full max-w-[760px] max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300 ring-1 ring-slate-900/5"
      >
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center border border-indigo-100">
              <ArrowRightLeft className="h-4 w-4 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 tracking-tight leading-tight">
                จัดการโอนย้ายลูกค้า
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                กำหนดสิทธิ์และผู้รับผิดชอบใหม่สำหรับลูกค้ารายนี้
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 flex items-center justify-center hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

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

                  {/* ---------------------------------------------------- */}
                  {/* Policy Rules (Billing & Commission)                  */}
                  {/* ---------------------------------------------------- */}
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
          <button
            onClick={onClose}
            className="px-5 py-2 text-[13px] text-slate-500 font-bold hover:text-slate-800 transition-colors"
          >
            ยกเลิกการ{actionKeyword}
          </button>
          <button
            onClick={handleConfirm}
            disabled={!newOwner || !reason || (transferScope === 'partial' && selectedServices.length === 0)}
            className={`flex items-center gap-1.5 px-6 py-2 text-white text-[13px] font-bold rounded-xl shadow-md transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none disabled:cursor-not-allowed ${
              isShare 
                ? 'bg-emerald-600 shadow-emerald-200 hover:bg-emerald-700' 
                : 'bg-indigo-600 shadow-indigo-200 hover:bg-indigo-700'
            }`}
          >
            ยืนยันการทำรายการ
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
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
    </>
  );
}

// Wrapper for preview
function App() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4" style={{ backgroundImage: 'radial-gradient(#E2E8F0 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      <div className="text-center z-10 bg-white/80 p-8 rounded-2xl backdrop-blur-sm border border-slate-200 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Customer Management CRM</h1>
        <p className="text-slate-500 mb-8 font-medium">New Redesigned Transfer Modal Component</p>
        <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold shadow-md hover:bg-slate-800 hover:shadow-lg transition-all hover:-translate-y-0.5">
          Open Modern Modal
        </button>
      </div>
      
      {/* Render Modal directly for preview purposes */}
      <TransferCustomerModal isOpen={true} />
    </div>
  );
}
// --- Main Component ---
interface CustomerDetailHCPV2Props {
  onBack?: () => void;
  customerId?: string;
  title?: string;
  onDealClick?: (dealId: string) => void;
  onQuotationClick?: (quotationId: string) => void;
}

export function CustomerDetailHCPV2({ 
  onBack = () => console.log("Back clicked"), 
  customerId = "CUST-010", 
  title = "รายละเอียดลูกค้า",
  onDealClick,
  onQuotationClick
}: CustomerDetailHCPV2Props) {
  const [activeTab, setActiveTab] = useState<"info" | "contacts" | "deals" | "visits" | "activities" | "win-loss-factors">("info");
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  
  // Inline editing states
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState<number | null>(null);
  const [isEditingHeadquarter, setIsEditingHeadquarter] = useState(false);
  const [isEditingSubsidiary, setIsEditingSubsidiary] = useState<number | null>(null);
  const [isAddingSubsidiary, setIsAddingSubsidiary] = useState(false);
  const [isEditingService, setIsEditingService] = useState(false);
  const [isEditingInsight, setIsEditingInsight] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState<number | null>(null);
  const [isEditingSupplyChain, setIsEditingSupplyChain] = useState(false);
  
  // Win/Loss Analysis states
  const [selectedLossFactors, setSelectedLossFactors] = useState<string[]>([]);
  const [lossFactorDetails, setLossFactorDetails] = useState<{
    [key: string]: { freeText: string }
  }>({
    pricing: { freeText: '' },
    service: { freeText: '' },
    infrastructure: { freeText: '' },
    competition: { freeText: '' },
    documentation: { freeText: '' },
    timing: { freeText: '' },
    relation: { freeText: '' },
    other: { freeText: '' }
  });
  
  // Dropdown states
  const [isLossDropdownOpen, setIsLossDropdownOpen] = useState(false);
  const [currentLossCategory, setCurrentLossCategory] = useState<string | null>(null);
  
  // Edit form data
  const [editAccountData, setEditAccountData] = useState({ bu: "", pic: "" });
  const [editAddressData, setEditAddressData] = useState({ label: "", address: "", isPrimary: false });
  const [editHeadquarterData, setEditHeadquarterData] = useState({ name: "", code: "" });
  const [editSubsidiaryData, setEditSubsidiaryData] = useState({ name: "", code: "", contact: "" });
  const [newSubsidiaryData, setNewSubsidiaryData] = useState({ name: "", code: "", contact: "" });
  const [editInsightData, setEditInsightData] = useState<string[]>([]);
  const [editContactData, setEditContactData] = useState({ name: "", role: "", email: "", phone: "", isPrimary: false });
  
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);
  const [isEditServiceModalOpen, setIsEditServiceModalOpen] = useState(false);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const [isAddTagModalOpen, setIsAddTagModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<{ name: string; value: string | null } | null>(null);
  const [selectedVisit, setSelectedVisit] = useState<number | null>(null);
  const [newContact, setNewContact] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    isPrimary: false,
  });
  const [newService, setNewService] = useState({
    name: "",
    value: "",
  });
  const [newAddress, setNewAddress] = useState({
    label: "",
    address: "",
    isPrimary: false,
  });

  // Win/Loss Dialog states
  const [isWinLossDialogOpen, setIsWinLossDialogOpen] = useState(false);
  const [selectedDealForWinLoss, setSelectedDealForWinLoss] = useState<{
    id: string;
    name: string;
    stage: string;
  } | null>(null);
  const [addresses, setAddresses] = useState([
    { id: 1, label: "สำนักงานใหญ่", address: "123 Logistics Park, Sukhumvit Road, Bangkok 10110", isPrimary: true },
  ]);
  const [subsidiaries, setSubsidiaries] = useState<Array<{ id: number; name: string; code: string; contact: string }>>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>(["Freight", "Warehouse", "Transportation"]);
  const [serviceRevenue, setServiceRevenue] = useState([
    { name: "Freight" },
    { name: "Customs" },
    { name: "Warehouse" },
    { name: "Transportation" },
    { name: "Cross Border" },
    { name: "Trading" },
  ]);

  // Supply Chain & Sales Channel states
  const [supplyChainRoles, setSupplyChainRoles] = useState({
    exporter: true,
    importer: false,
    manufacturer: true,
    distributor: true,
    retailer: false,
    logistics: false,
    other: false,
  });
  const [salesChannels, setSalesChannels] = useState({
    b2b: true,
    b2c: false,
  });

  // Mock visit history data - องค์การเภสัชกรรม
  const visitHistory = [
    {
      id: 1,
      date: "2026-02-10",
      time: "14:30",
      visitedBy: "ทะมากัท รัฐเจริญ",
      visitedByRole: "Sales Representative",
      bu: "HCP",
      purpose: "นำเสนอระบบจัดการคลังสินค้ายาและเวชภัณฑ์",
      location: "กระทรวงสาธารณสุข ถนนติวานนท์",
      notes: "นำเสนอ Warehouse Management System สำหรับจัดการยาและเวชภัณฑ์ พร้อมระบบ Temperature Control และ Track & Trace แบบ Real-time สำหรับยาที่ต้องควบคุมอุณหภูมิ ลูกค้าสนใจและขอดูรายละเอียดเพิ่มเติม",
      status: "Completed",
      contactPerson: "นพ.สมชาย วงศ์ใหญ่, ภญ.สุภาพร ศรีสวัสดิ์",
      nextAction: "ส่งใบเสนอราคา WMS พร้อม ROI Analysis",
      nextActionDate: "2026-02-15",
      images: [
        "https://images.unsplash.com/photo-1576669801820-a9ab287ac2d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJlaG91c2UlMjBwaGFybWFjZXV0aWNhbCUyMG1lZGljaW5lJTIwc3RvcmFnZXxlbnwxfHx8fDE3NzM2NDUxODV8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1758518730384-be3d205838e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBoYW5kc2hha2UlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzczNTY2MTg3fDA&ixlib=rb-4.1.0&q=80&w=1080"
      ]
    },
    {
      id: 2,
      date: "2026-01-28",
      time: "10:00",
      visitedBy: "พงษ์ศิลป์ เครือกลาง",
      visitedByRole: "Sales Representative",
      bu: "HCP",
      purpose: "แก้ไขปัญหาระบบ Tracking ของรถขนส่ง",
      location: "องค์การเภสัชกรรม ศูนย์กระจายสินค้า",
      notes: "เข้าแก้ไขปัญหาระบบ GPS Tracking บางรถที่ไม่แสดงตำแหน่งแบบ Real-time และปรับปรุง Dashboard การแสดงผลให้ user-friendly มากขึ้น ทดสอบระบบแล้วเสร็จ ลูกค้าพอใจผลการแก้ไข",
      status: "Completed",
      contactPerson: "นพ.สมชาย วงศ์ใหญ่, คุณเทพพิทักษ์ รักษ์สุข",
      nextAction: "จัดอบรมการใช้งาน Dashboard ใหม่",
      nextActionDate: "2026-02-05",
      images: [
        "https://images.unsplash.com/photo-1767696674746-14d4d6a3ec48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpdmVyeSUyMHRydWNrJTIwbG9naXN0aWNzJTIwdHJhbnNwb3J0fGVufDF8fHx8MTc3MzY0NTE5MHww&ixlib=rb-4.1.0&q=80&w=1080"
      ]
    },
    {
      id: 3,
      date: "2026-01-20",
      time: "15:00",
      visitedBy: "ศศิน ธัมปนะ",
      visitedByRole: "Sales Manager",
      bu: "Logistics",
      purpose: "ประชุมทบทวนสัญญาประจำปี",
      location: "ห้องประชุมชั้น 5 กระทรวงสาธารณสุข",
      notes: "ทบทวนสัญญาบริการขนส่งยาและเวชภัณฑ์ประจำปี 2569 ลูกค้าพอใจบริการ ขอเพิ่ม Service Level Agreement และขยายขอบเขตบริการไปยังโรงพยาบาลในภูมิภาคเพิ่มเติม 20 แห่ง",
      status: "Completed",
      contactPerson: "นพ.สมชาย วงศ์ใหญ่",
      nextAction: "จัดทำสัญญาใหม่พร้อมเงื่อนไข SLA",
      nextActionDate: "2026-01-31",
    },
    {
      id: 4,
      date: "2026-01-15",
      time: "11:30",
      visitedBy: "ทะมากัท รัฐเจริญ",
      visitedByRole: "Sales Representative",
      bu: "HCP",
      purpose: "Check-in ประจำเดือน",
      location: "องค์การเภสัชกรรม สำนักงานใหญ่",
      notes: "สอบถามความพึงพอใจในบริการขนส่งยาและเวชภัณฑ์ ไม่มีปัญหา ลูกค้าพอใจบริการ ระบบ Track & Trace ทำงานได้ดี",
      status: "Completed",
      contactPerson: "นพ.สมชาย วงศ์ใหญ่",
      nextAction: "Check-in ครั้งถัดไป",
      nextActionDate: "2026-02-15",
    },
    {
      id: 5,
      date: "2026-01-08",
      time: "13:45",
      visitedBy: "อนันต์ ศรีสุข",
      visitedByRole: "Sales Representative",
      bu: "E-commerce",
      purpose: "นำเสนอระบบ Last-Mile Delivery สำหรับยา",
      location: "กระทรวงสาธารณสุข ห้องประชุม 302",
      notes: "นำเสนอ Last-Mile Delivery Solution สำหรับส่งยาถึงบ้านผู้ป่วย พร้อม Temperature Monitoring และ GPS Tracking Real-time รองรับการส่งยาเย็นและยาควบคุม ลูกค้าให้ข้อมูลว่ากำลังพิจารณาขยายบริการส่งยาถึงบ้านในปี 2570",
      status: "Completed",
      contactPerson: "ภญ.สุภาพร ศรีสวัสดิ์",
      nextAction: "รอการตัดสินใจจากลูกค้า",
      nextActionDate: "2026-06-01",
    },
    {
      id: 6,
      date: "2025-12-20",
      time: "09:30",
      visitedBy: "วิชัย พานิชกุล",
      visitedByRole: "Sales Manager",
      bu: "Automotive",
      purpose: "สอบถามความต้องการขนส่งอุปกรณ์การแพทย์",
      location: "องค์การเภสัชกรรม สำนักงานใหญ่",
      notes: "สำรวจความต้องการขนส่งอุปกรณ์การแพทย์และเครื่องมือทางการแพทย์ขนาดใหญ่ไปยังโรงพยาบาลในต่างจังหวัด ลูกค้าให้ข้อมูลว่ามีแผนจัดซื้อเครื่อง MRI และ CT Scan สำหรับโรงพยาบาลในภูมิภาค",
      status: "Completed",
      contactPerson: "นพ.สมชาย วงศ์ใหญ่, คุณเทพพิทักษ์ รักษ์สุข",
      nextAction: "ติดตามแผนจัดซื้ออุปกรณ์",
      nextActionDate: "2026-03-01",
    },
    {
      id: 7,
      date: "2025-12-05",
      time: "14:00",
      visitedBy: "สุรชัย มั่นคง",
      visitedByRole: "Sales Representative",
      bu: "Retail",
      purpose: "เสนอบริการจัดเก็บสินค้าในคลัง Ambient",
      location: "องค์การเภสัชกรรม ศูนย์กระจายสินค้า",
      notes: "นำเสนอบริการคลังสินค้า Ambient Temperature สำหรับอุปกรณ์การแพทย์ที่ไม่ต้องควบคุมอุณหภูมิ เช่น ผ้าพันแผล เวชภัณฑ์ทั่วไป ลูกค้าสนใจแต่ต้องการดูรายละเอียดค่าใช้จ่ายเปรียบเทียบกับคลังปัจจุบัน",
      status: "Completed",
      contactPerson: "คุณเทพพิทักษ์ รักษ์สุข",
      nextAction: "ส่งใบเสนอราคาพร้อม Cost Comparison",
      nextActionDate: "2025-12-15",
    },
  ];

  // Customer Data Mock - 7 customers
  const customerData: any = {
    "CUST-001": {
      id: "CUST-001",
      code: "0994000165891",
      companyName: "องค์การเภสัชกรรม",
      companyNameEn: "Government Pharmaceutical Organization",
      taxId: "0994000165891",
      businessType: "องค์กรของรัฐ",
      legalStatus: "ยังดำเนินการอยู่",
      registeredCapital: "500,000,000",
      customerType: "Government",
      status: "Active",
      segment: "Government Enterprise",
      bu: "HCP - Healthcare and Pharmaceutical",
      pic: "ทะมากัท รัฐเจริญ",
      createdFrom: "dbd",
      industry: "เภสัชกรรมและสาธารณสุข",
      registrationNumber: "0994000165891",
      foundedDate: "2518-01-15",
      province: "กรุงเทพมหานคร",
      district: "ราชเทวี",
      postalCode: "10400",
      address: "75/1 ถนนพระรามที่ 6 แขวงทุ่งพญาไท เขตราชเทวี กรุงเทพฯ 10400",
      tags: ["Cold Chain", "Government", "Pharmaceutical", "Track & Trace"],
      interests: ["Director", "Procurement Manager"],
      revenueYear: "8,500,000",
      netCon: "22%",
      winningChance: "High",
      service: "Transportation & Warehouse",
      volume: "2,500 Boxes/month",
      contract: "2 ปี",
      operationalArm: "SCGJWD (H&P) + Warehouse",
      site: "Multi-site",
      organizationGroup: {
        headquarter: { name: "กระทรวงสาธารณสุข", code: "HQ-GOV-001" },
        subsidiaries: [
          { name: "องค์การเภสัชกรรม สำนักงานใหญ่", code: "GPO-HQ", contact: "นพ.สมชาย วงศ์ใหญ่" },
          { name: "องค์การเภสัชกรรม ศูนย์กระจายสินค้า", code: "GPO-DC", contact: "คุณเทพพิทักษ์ รักษ์สุข" },
        ],
      },
      serviceRevenue: [
        { name: "Freight", value: null },
        { name: "Customs", value: null },
        { name: "Warehouse", value: "3,200,000" },
        { name: "Transportation", value: "5,300,000" },
        { name: "Cross Border", value: null },
        { name: "Trading", value: null },
      ],
      insights: [
        "มีความต้องการระบบ WMS สำหรับจัดการยาและเวชภัณฑ์",
        "ขอขยายบริการไปยังโรงพยาบาลในภูมิภาค 20 แห่ง",
      ],
      keyWinData: [
        { name: "Cold Chain", value: 35, reason: "Service", percentage: "45%" },
        { name: "Transportation", value: 30, reason: "Infrastructure", percentage: "35%" },
        { name: "Warehouse", value: 25, reason: "Technology", percentage: "30%" },
        { name: "Track & Trace", value: 10, reason: "Service", percentage: "40%" },
      ],
      keyLossData: [
        { name: "Pricing", value: 40, reason: "Pricing", percentage: "50%" },
        { name: "Competition", value: 35, reason: "Service", percentage: "35%" },
        { name: "Infrastructure", value: 15, reason: "Other", percentage: "15%" },
        { name: "Documentation", value: 10, reason: "Other", percentage: "10%" },
      ],
      winLossReasons: {
        win: [
          { category: "Commercial & Price", reason: "Commercial & Price", count: 4, percentage: 50 },
          { category: "Solution & Capability Fit", reason: "Solution & Capability Fit", count: 2, percentage: 25 },
          { category: "Relation", reason: "Relation", count: 0, percentage: 0 },
          { category: "Other", reason: "Other", count: 2, percentage: 25 },
        ],
        winTotal: 8,
        loss: [
          { category: "Commercial & Price", reason: "Price too high", count: 7, percentage: 30 },
          { category: "Commercial & Price", reason: "Budget cuts", count: 2, percentage: 9 },
          { category: "Commercial & Price", reason: "Payment terms unacceptable", count: 3, percentage: 13 },
          { category: "Commercial & Price", reason: "Other", count: 1, percentage: 4 },
          { category: "Solution & Capability Fit", reason: "Could not meet SLA", count: 4, percentage: 17 },
          { category: "Solution & Capability Fit", reason: "IT system limitations", count: 0, percentage: 0 },
          { category: "Solution & Capability Fit", reason: "Technical constraints", count: 0, percentage: 0 },
          { category: "Solution & Capability Fit", reason: "Other", count: 2, percentage: 9 },
          { category: "Relation", reason: "Relation", count: 1, percentage: 4 },
          { category: "Other", reason: "Other", count: 3, percentage: 13 },
        ],
        lossTotal: 23,
      },
      contacts: [
        { id: 1, name: "นพ.สมชาย วงศ์ใหญ่", role: "ผู้อำนวยการฝ่ายจัดซื้อ", email: "somchai.w@gpo.or.th", phone: "02-590-1234", isPrimary: true },
        { id: 2, name: "ภญ.สุภาพร ศรีสวัสดิ์", role: "หัวหน้าแผนกคลังสินค้า", email: "supaporn.s@gpo.or.th", phone: "02-590-1235", isPrimary: false },
        { id: 3, name: "คุณเทพพิทักษ์ รักษ์สุข", role: "ผู้จัดการศูนย์กระจายสินค้า", email: "tepparak.r@gpo.or.th", phone: "02-590-1236", isPrimary: false },
      ],
      deals: [
        { id: "DEAL-2426-01", name: "ดีลขนส่งยาและเวชภัณฑ์ทั่วประเทศ", stage: "Active", revenue: "5,300,000", bu: "HCP", pic: "ทะมากัท รัฐเจริญ" },
        { id: "DEAL-2426-02", name: "ดีล WMS และคลังสินค้ายา", stage: "Negotiation", revenue: "3,200,000", bu: "HCP", pic: "ทะมากัท รัฐเจริญ" },
        { id: "DEAL-2426-05", name: "ดีล Fulfillment Center สำหรับ E-commerce", stage: "Proposal", revenue: "•••", bu: "E-commerce", pic: "สุภัทรา กุลวิจิตร", isRestricted: true },
        { id: "DEAL-2426-03", name: "ดีลระบบ Logistics สำหรับศูนย์กระจายสินค้า", stage: "Proposal", revenue: "2,100,000", bu: "HCP", pic: "สมศักดิ์ จันทร์เพ็ญ" },
        { id: "DEAL-2426-04", name: "ดีลขนส่งวัตถุดิบผลิตยา", stage: "Active", revenue: "1,800,000", bu: "HCP", pic: "วิชัย ประสิทธิ์" },
        { id: "DEAL-2426-06", name: "ดีลขนส่งชิ้นส่วนยานยนต์ JIT", stage: "Active", revenue: "•••", bu: "Automotive", pic: "นภัสสร ดีมาก", isRestricted: true },
      ],
      quotations: [
        { id: "QT-2426-01", name: "ใบเสนอราคาขนส่งยา Cold Chain", dealId: "DEAL-2426-01", status: "Approved", amount: "5,300,000", validUntil: "2026-04-30", bu: "HCP", createdBy: "ทะมากัท รัฐเจริญ" },
        { id: "QT-2426-02", name: "ใบเสนอราคา WMS Implementation", dealId: "DEAL-2426-02", status: "Pending", amount: "3,200,000", validUntil: "2026-05-15", bu: "HCP", createdBy: "ทะมากัท รัฐเจริญ" },
        { id: "QT-2426-03", name: "ใบเสนอราคา Fulfillment Center", dealId: "DEAL-2426-05", status: "Draft", amount: "•••", validUntil: "2026-06-01", bu: "E-commerce", createdBy: "สุภัทรา กุลวิจิตร", isRestricted: true },
        { id: "QT-2426-04", name: "ใบเสนอราคาระบบ Logistics", dealId: "DEAL-2426-03", status: "Revised", amount: "2,100,000", validUntil: "2026-05-20", bu: "HCP", createdBy: "สมศักดิ์ จันทร์เพ็ญ" },
        { id: "QT-2426-05", name: "ใบเสนอราคาขนส่งวัตถุดิบ", dealId: "DEAL-2426-04", status: "Approved", amount: "1,800,000", validUntil: "2026-12-31", bu: "HCP", createdBy: "วิชัย ประสิทธิ์" },
      ],
      visits: [
        { 
          id: 1, 
          title: "นำเสนอระบบจัดการคลังสินค้ายาและเวชภัณฑ์", 
          date: "2026-02-10", 
          notes: "นำเสนอ Warehouse Management System สำหรับจัดการยาและเวชภัณฑ์", 
          visitedBy: "ทะมากัท รัฐเจริญ",
          bu: "HCP",
          tasks: []
        },
        { 
          id: 2, 
          title: "นำเสนอ Fulfillment Solution สำหรับ E-commerce", 
          date: "2026-02-05", 
          notes: "ไม่สามารถดูรายละเอียดได้", 
          visitedBy: "สุภัทรา กุลวิจิตร",
          bu: "E-commerce",
          isRestricted: true,
          tasks: []
        },
        { 
          id: 3, 
          title: "แก้ไขปัญหาระบบ Tracking ของรถขนส่ง", 
          date: "2026-01-28", 
          notes: "เข้าแก้ไขปัญหาระบบ GPS Tracking บางรถที่ไม่แสดงตำแหน่งแบบ Real-time", 
          visitedBy: "พงษ์ศิลป์ เครือกลาง",
          bu: "HCP",
          tasks: []
        },
        { 
          id: 4, 
          title: "ประชุมทบทวนสัญญาประจำปี", 
          date: "2026-01-20", 
          notes: "ทบทวนสัญญาบริการขนส่งยาและเวชภัณฑ์ประจำปี 2569", 
          visitedBy: "ศศิน ธัมปนะ",
          bu: "HCP",
          tasks: []
        },
        { 
          id: 5, 
          title: "Check-in สำรวจความต้องการขนส่งชิ้นส่วนยานยนต์", 
          date: "2026-01-18", 
          notes: "ไม่สามารถดูรายละเอียดได้", 
          visitedBy: "วิชัย พานิชกุล",
          bu: "Automotive",
          isRestricted: true,
          tasks: []
        },
        { 
          id: 6, 
          title: "Check-in ประจำเดือน", 
          date: "2026-01-15", 
          notes: "สอบถามความพึงพอใจในบริการขนส่งยาและเวชภัณฑ์", 
          visitedBy: "ทะมากัท รัฐเจริญ",
          bu: "HCP",
          tasks: []
        },
        { 
          id: 7, 
          title: "นำเสนอระบบ Last-Mile Delivery สำหรับยา", 
          date: "2026-01-08", 
          notes: "นำเสนอ Last-Mile Delivery Solution สำหรับส่งยาถึงบ้านผู้ป่วย", 
          visitedBy: "อนันต์ ศรีสุข",
          bu: "HCP",
          tasks: []
        },
        { 
          id: 8, 
          title: "นำเสนอ Distribution Center สำหรับ Retail", 
          date: "2025-12-28", 
          notes: "ไม่สามารถดูรายละเอียดได้", 
          visitedBy: "นภัสสร ดีมาก",
          bu: "Retail",
          isRestricted: true,
          tasks: []
        },
        { 
          id: 9, 
          title: "สอบถามความต้องการขนส่งอุปกรณ์การแพทย์", 
          date: "2025-12-20", 
          notes: "สำรวจความต้องการขนส่งอุปกรณ์การแพทย์ขนาดใหญ่", 
          visitedBy: "วิชัย พานิชกุล",
          bu: "HCP",
          tasks: []
        },
        { 
          id: 10, 
          title: "เสนอบริการจัดเก็บสินค้าในคลัง Ambient", 
          date: "2025-12-05", 
          notes: "นำเสนอบริการคลังสินค้า Ambient Temperature", 
          visitedBy: "สุรชัย มั่นคง",
          bu: "HCP",
          tasks: []
        },
      ],
    },
    "CUST-010": {
      id: "CUST-010",
      code: "010555612345B",
      companyName: "บมจ. นำวิวัฒน์ เมดิคอล คอร์ปอเรชั่น",
      companyNameEn: "Namwiwat Medical Corporation PCL",
      taxId: "0105561234567",
      businessType: "บริษัทมหาชนจำกัด",
      legalStatus: "ยังดำเนินการอยู่",
      registeredCapital: "120,000,000",
      customerType: "Enterprise",
      status: "Active",
      segment: "Local Manufacturer",
      bu: "HCP - Healthcare and Pharmaceutical",
      pic: "Sarah Chen",
      address: "123 Logistics Park, Sukhumvit Road, Bangkok 10110",
      tags: ["TH-MY", "Cross Border", "FTL", "KA"],
      interests: ["Purchasing manager"],
      revenueYear: "2,040,000",
      netCon: "27%",
      winningChance: "High",
      service: "Transportation",
      volume: "1,300 Boxes",
      contract: "1 ปี",
      operationalArm: "B2B2C + LPC",
      site: "B2B2C-Conso",
      organizationGroup: {
        headquarter: { name: "Global Shipping Alliance", code: "HQ-001" },
        subsidiaries: [
          { name: "SCGJWD", code: "SUB-001", contact: "Somchai Imdee" },
          { name: "SCGJWD Freight", code: "SUB-002", contact: "Weerachai Ukeemak" },
        ],
      },
      serviceRevenue: [
        { name: "Freight", value: null },
        { name: "Customs", value: null },
        { name: "Warehouse", value: "1,800,000" },
        { name: "Transportation", value: null },
        { name: "Cross Border", value: null },
        { name: "Trading", value: null },
      ],
      insights: [
        "ลูกค้ามีความต้องการด้าน Compliance สูง (DG, NDA, Credit)",
        "มีโอกาสขยายบริการคลังและ DG",
      ],
      keyWinData: [
        { name: "Cross Border", value: 40, reason: "Pricing", percentage: "50%" },
        { name: "Customs", value: 30, reason: "Service", percentage: "30%" },
        { name: "Transportation", value: 20, reason: "Other", percentage: "20%" },
        { name: "Service", value: 10, reason: "Service", percentage: "50%" },
      ],
      keyLossData: [
        { name: "Cross Border", value: 40, reason: "Pricing", percentage: "50%" },
        { name: "Customs", value: 30, reason: "Service", percentage: "30%" },
        { name: "Transportation", value: 20, reason: "Pricing", percentage: "70%" },
        { name: "Service", value: 10, reason: "Other", percentage: "10%" },
      ],
      winLossReasons: {
        win: [
          { category: "Commercial & Price", reason: "Competitive pricing", count: 3, percentage: 43 },
          { category: "Commercial & Price", reason: "Flexible payment terms", count: 1, percentage: 14 },
          { category: "Solution & Capability Fit", reason: "Service quality", count: 2, percentage: 29 },
          { category: "Relation", reason: "Long-term partnership", count: 1, percentage: 14 },
        ],
        winTotal: 7,
        loss: [
          { category: "Commercial & Price", reason: "Price too high", count: 5, percentage: 36 },
          { category: "Commercial & Price", reason: "Budget cuts", count: 2, percentage: 14 },
          { category: "Solution & Capability Fit", reason: "Could not meet SLA", count: 3, percentage: 21 },
          { category: "Solution & Capability Fit", reason: "Service limitations", count: 2, percentage: 14 },
          { category: "Other", reason: "Other", count: 2, percentage: 14 },
        ],
        lossTotal: 14,
      },
      contacts: [
        { id: 1, name: "คุณอภิญญา วงศ์ชัย", role: "Operations Manager", email: "aphinya.w@namwiwat.com", phone: "+66 2-XXX-XXXX", isPrimary: true },
      ],
      deals: [
        { id: "DEAL-2405-01", name: "Namwiwat Consolidation TS", stage: "Active", revenue: "2,040,000", bu: "HCP", pic: "Sarah Chen" },
        { id: "DEAL-2405-02", name: "ดีลขนส่งวัตถุดิบทางการแพทย์", stage: "Negotiation", revenue: "1,200,000", bu: "Logistics", pic: "สมศักดิ์ จันทร์เพ็ญ" },
      ],
      quotations: [
        { id: "QT-2405-01", name: "ใบเสนอราคา Consolidation Service", dealId: "DEAL-2405-01", status: "Approved", amount: "2,040,000", validUntil: "2026-05-30", bu: "HCP", createdBy: "Sarah Chen" },
        { id: "QT-2405-02", name: "ใบเสนอราคาขนส่งวัตถุดิบ", dealId: "DEAL-2405-02", status: "Pending", amount: "1,200,000", validUntil: "2026-06-15", bu: "Logistics", createdBy: "สมศักดิ์ จันทร์เพ็ญ" },
      ],
      visits: [
        { id: 1, title: "Meeting ครั้งแรกกับ Operations Manager", date: "2024-02-28", notes: "แนะนำบริการและทำความเข้าใจความต้องการ", visitedBy: "Sarah Chen" },
        { id: 2, title: "เยี่ยมชมโรงงานผลิต", date: "2024-02-15", notes: "สำรวจกระบวนการผลิตและความต้องการขนส่ง", visitedBy: "Sarah Chen, สมศักดิ์ จันทร์เพ็ญ" },
      ],
    },
    // ... อื่นๆ สามารถใส่เพิ่มได้ตาม CustomerData Mock ของคุณ
  };

  const customer = customerData[customerId] || customerData["CUST-001"];

  // Export Visit History to PDF Function
  const exportVisitHistoryToPDF = () => {
    const doc = new jsPDF();
    const currentUserBU = customer.bu.split(' - ')[0];
    
    // Add Thai font support (using default for now, can be enhanced)
    doc.setFont('helvetica');
    
    // Header
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text('Visit History Report', 14, 20);
    
    // Customer Info
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text(`Customer: ${customer.companyName}`, 14, 30);
    doc.text(`Code: ${customer.code}`, 14, 36);
    doc.text(`BU: ${customer.bu}`, 14, 42);
    doc.text(`Generated: ${new Date().toLocaleDateString('th-TH', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}`, 14, 48);
    
    // Prepare table data
    const tableData = visitHistory
      .filter(visit => visit.bu === currentUserBU)
      .map(visit => [
        visit.date,
        visit.time,
        visit.purpose,
        visit.contactPerson,
        visit.visitedBy,
        visit.status
      ]);
    
    // Table
    autoTable(doc, {
      startY: 55,
      head: [['Date', 'Time', 'Purpose', 'Contact Person', 'Sales Rep', 'Status']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [123, 201, 166],
        textColor: 255,
        fontStyle: 'bold',
        fontSize: 9
      },
      bodyStyles: {
        fontSize: 8,
        textColor: 60
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      margin: { top: 55 },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 20 },
        2: { cellWidth: 50 },
        3: { cellWidth: 35 },
        4: { cellWidth: 30 },
        5: { cellWidth: 25 }
      }
    });
    
    // Footer
    const pageCount = doc.internal.pages.length - 1;
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        { align: 'center' }
      );
    }
    
    // Save PDF
    const fileName = `Visit_History_${customer.code}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  };

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { className: string } } = {
      "Active": { className: "bg-green-100 text-green-700 border-green-200" },
      "Pre-Sales": { className: "bg-blue-100 text-blue-700 border-blue-200" },
    };
    const config = statusMap[status] || statusMap["Active"];
    return <Badge className={`${config.className} hover:${config.className} text-[10px] px-2 py-0.5 h-5 border`}>{status}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="h-8 w-8 p-0">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-base font-semibold text-gray-900 flex-1">{title}</h1>
          <Button variant="outline" className="h-8 border-gray-300 text-xs px-3" onClick={() => setIsTransferModalOpen(true)}>
            Transfer
          </Button>
        </div>
      </div>

      <div className="pb-24">
        {/* Tab Navigation - Sticky */}
        <div className="bg-white border-b border-gray-200 sticky top-14 z-10">
          <div className="flex items-center overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab("info")}
              className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "info"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              ข้อมูล
            </button>
            <button
              onClick={() => setActiveTab("contacts")}
              className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "contacts"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              บุคคลติดต่อ
            </button>
            <button
              onClick={() => setActiveTab("deals")}
              className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "deals"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              ดีล
            </button>
            <button
              onClick={() => setActiveTab("visits")}
              className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "visits"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              การเยี่ยมชม
            </button>
            <button
              onClick={() => setActiveTab("win-loss-factors")}
              className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "win-loss-factors"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Win/Loss Factors
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 pb-20 space-y-3">
          {/* Tab Content - ข้อมูล */}
          {activeTab === "info" && (
            <>
              {/* 2-Column Grid Layout on Desktop */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {/* LEFT COLUMN */}
                <div className="space-y-3">
              {/* Customer Info Section */}
              <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 space-y-3">
                {/* Company Name - Prominent */}
                <div className="pb-3 border-b border-gray-200">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-green-600 leading-tight mb-1">
                        {customer.companyName}
                      </h3>
                      <p className="text-sm text-gray-600">{customer.companyNameEn}</p>
                    </div>
                    {getStatusBadge(customer.status)}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                
                    {customer.createdFrom === "dbd" && (
                      <Badge className="bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-50 text-xs px-2.5 py-1 flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        ข้อมูลจาก DBD
                      </Badge>
                    )}
                    
                  </div>
                </div>

                {/* Corporate Information */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">ข้อมูลนิติบุคคล</h4>
                    {customer.createdFrom === "dbd" && (
                      <Badge className="bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-50 text-xs px-2 py-0.5">
                        <Lock className="h-3 w-3 mr-1" />
                        ล็อกโดย DBD
                      </Badge>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-gray-500 mb-1.5 flex items-center gap-1">
                        เลขประจำตัวผู้เสียภาษี *
                        {customer.createdFrom === "dbd" && <Lock className="h-3 w-3 text-gray-400" />}
                      </Label>
                      <Input
                        value={customer.taxId}
                        disabled={customer.createdFrom === "dbd"}
                        className="h-8 text-sm disabled:bg-gray-50 disabled:text-gray-600 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500 mb-1.5 flex items-center gap-1">
                        ประเภทธุรกิจ
                        {customer.createdFrom === "dbd" && <Lock className="h-3 w-3 text-gray-400" />}
                      </Label>
                      <Input
                        value={customer.businessType}
                        disabled={customer.createdFrom === "dbd"}
                        className="h-8 text-sm disabled:bg-gray-50 disabled:text-gray-600 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-gray-500 mb-1.5 flex items-center gap-1">
                        เลขทะเบียนนิติบุคคล
                        {customer.createdFrom === "dbd" && <Lock className="h-3 w-3 text-gray-400" />}
                      </Label>
                      <Input
                        value={customer.registrationNumber || ""}
                        disabled={customer.createdFrom === "dbd"}
                        className="h-8 text-sm disabled:bg-gray-50 disabled:text-gray-600 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500 mb-1.5 flex items-center gap-1">
                        อุตสาหกรรม
                        {customer.createdFrom === "dbd" && <Lock className="h-3 w-3 text-gray-400" />}
                      </Label>
                      <Input
                        value={customer.industry || ""}
                        disabled={customer.createdFrom === "dbd"}
                        className="h-8 text-sm disabled:bg-gray-50 disabled:text-gray-600 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1.5">สถานะนิติบุคคล</p>
                      <Badge className="bg-green-50 text-green-700 border border-green-200 hover:bg-green-50 text-xs px-2.5 py-1">
                        {customer.legalStatus}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500 mb-1.5 flex items-center gap-1">
                        ทุนจดทะเบียน
                        {customer.createdFrom === "dbd" && <Lock className="h-3 w-3 text-gray-400" />}
                      </Label>
                      <Input
                        value={customer.registeredCapital || ""}
                        disabled={customer.createdFrom === "dbd"}
                        className="h-8 text-sm disabled:bg-gray-50 disabled:text-gray-600 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-gray-500 mb-1.5 flex items-center gap-1">
                        วันที่ก่อตั้ง
                        {customer.createdFrom === "dbd" && <Lock className="h-3 w-3 text-gray-400" />}
                      </Label>
                      <Input
                        type="date"
                        value={customer.foundedDate || ""}
                        disabled={customer.createdFrom === "dbd"}
                        className="h-8 text-sm disabled:bg-gray-50 disabled:text-gray-600 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-500 mb-1.5 flex items-center gap-1">
                      ที่อยู่
                      {customer.createdFrom === "dbd" && <Lock className="h-3 w-3 text-gray-400" />}
                    </Label>
                    <Textarea
                      value={customer.address || ""}
                      disabled={customer.createdFrom === "dbd"}
                      className="min-h-[60px] text-sm disabled:bg-gray-50 disabled:text-gray-600 disabled:cursor-not-allowed resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-xs text-gray-500 mb-1.5 flex items-center gap-1">
                        จังหวัด
                        {customer.createdFrom === "dbd" && <Lock className="h-3 w-3 text-gray-400" />}
                      </Label>
                      <Input
                        value={customer.province || ""}
                        disabled={customer.createdFrom === "dbd"}
                        className="h-8 text-sm disabled:bg-gray-50 disabled:text-gray-600 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500 mb-1.5 flex items-center gap-1">
                        เขต/อำเภอ
                        {customer.createdFrom === "dbd" && <Lock className="h-3 w-3 text-gray-400" />}
                      </Label>
                      <Input
                        value={customer.district || ""}
                        disabled={customer.createdFrom === "dbd"}
                        className="h-8 text-sm disabled:bg-gray-50 disabled:text-gray-600 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500 mb-1.5 flex items-center gap-1">
                        รหัสไปรษณีย์
                        {customer.createdFrom === "dbd" && <Lock className="h-3 w-3 text-gray-400" />}
                      </Label>
                      <Input
                        value={customer.postalCode || ""}
                        disabled={customer.createdFrom === "dbd"}
                        className="h-8 text-sm disabled:bg-gray-50 disabled:text-gray-600 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                {/* Financial Information */}
                <div className="space-y-3 pt-3 border-t border-gray-200">
                  <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">ข้อมูลการเงิน</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1.5">Revenue/Year</p>
                      <p className="text-sm font-medium text-gray-900">
                        {customer.revenueYear === "TBD" ? "TBD" : `฿${parseFloat(customer.revenueYear).toLocaleString()}`}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1.5">Net Con</p>
                      <p className="text-sm font-medium text-gray-900">{customer.netCon}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1.5">Winning Chance</p>
                    <Badge className={`${
                      customer.winningChance === "High" ? "bg-green-100 text-green-700 border-green-200" :
                      customer.winningChance === "Medium" ? "bg-yellow-100 text-yellow-700 border-yellow-200" :
                      "bg-red-100 text-red-700 border-red-200"
                    } hover:${
                      customer.winningChance === "High" ? "bg-green-100" :
                      customer.winningChance === "Medium" ? "bg-yellow-100" :
                      "bg-red-100"
                    } text-xs px-2.5 py-1 border`}>
                      {customer.winningChance}
                    </Badge>
                  </div>
                </div>

                {/* Account Management */}
                <div className="space-y-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">การจัดการบัญชี</h4>
                    {!isEditingAccount ? (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-7 px-2.5 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        onClick={() => {
                          setEditAccountData({ bu: customer.bu, pic: customer.pic });
                          setIsEditingAccount(true);
                        }}
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        แก้ไข
                      </Button>
                    ) : (
                      <div className="flex items-center gap-1">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-7 px-2.5 text-xs text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsEditingAccount(false)}
                        >
                          <X className="h-3 w-3 mr-1" />
                          ยกเลิก
                        </Button>
                        <Button 
                          size="sm" 
                          className="h-7 px-2.5 text-xs bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => {
                            // TODO: Save to backend
                            console.log("Save account data:", editAccountData);
                            setIsEditingAccount(false);
                          }}
                        >
                          <Save className="h-3 w-3 mr-1" />
                          บันึก
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {!isEditingAccount ? (
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500 mb-1.5">Business Unit</p>
                        <Badge className="bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-50 text-xs px-2.5 py-1">
                          {customer.bu || 'Logistics'}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1.5">Person in Charge</p>
                        <p className="text-sm font-medium text-gray-900">{customer.pic}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <Label className="text-xs text-gray-700">Business Unit</Label>
                        <Input
                          value={editAccountData.bu}
                          onChange={(e) => setEditAccountData({ ...editAccountData, bu: e.target.value })}
                          className="mt-1.5 h-8 text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-700">Person in Charge</Label>
                        <Input
                          value={editAccountData.pic}
                          onChange={(e) => setEditAccountData({ ...editAccountData, pic: e.target.value })}
                          className="mt-1.5 h-8 text-sm"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Address */}
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">ที่อยู่</h4>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-7 px-2.5 text-xs text-green-600 hover:text-green-700 hover:bg-green-50"
                      onClick={() => setIsAddAddressModalOpen(true)}
                    >
                      + เพิ่ม
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {addresses.map((addr) => (
                      <div key={addr.id} className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                        {isEditingAddress === addr.id ? (
                          // Edit Mode
                          <div className="space-y-2">
                            <div>
                              <Label className="text-xs text-gray-700">ชื่อที่อยู่</Label>
                              <Input
                                value={editAddressData.label}
                                onChange={(e) => setEditAddressData({ ...editAddressData, label: e.target.value })}
                                className="mt-1 h-8 text-sm"
                              />
                            </div>
                            <div>
                              <Label className="text-xs text-gray-700">ที่อยู่</Label>
                              <Textarea
                                value={editAddressData.address}
                                onChange={(e) => setEditAddressData({ ...editAddressData, address: e.target.value })}
                                className="mt-1 text-sm resize-none"
                                rows={3}
                              />
                            </div>
                            <div className="flex items-center justify-end gap-1 pt-2">
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-7 px-2.5 text-xs text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsEditingAddress(null)}
                              >
                                <X className="h-3 w-3 mr-1" />
                                ยกเลิก
                              </Button>
                              <Button 
                                size="sm" 
                                className="h-7 px-2.5 text-xs bg-blue-600 hover:bg-blue-700 text-white"
                                onClick={() => {
                                  // TODO: Save to backend
                                  const updatedAddresses = addresses.map(a => 
                                    a.id === addr.id ? { ...a, ...editAddressData } : a
                                  );
                                  setAddresses(updatedAddresses);
                                  setIsEditingAddress(null);
                                }}
                              >
                                <Save className="h-3 w-3 mr-1" />
                                บันทึก
                              </Button>
                            </div>
                          </div>
                        ) : (
                          // View Mode
                          <div className="flex items-start gap-2.5">
                            <MapPin className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="text-xs font-semibold text-gray-900">{addr.label}</p>
                                {addr.isPrimary && (
                                  <Badge className="bg-blue-600 text-white text-[10px] px-2 py-0.5 h-5 hover:bg-blue-600">
                                    หลัก
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-gray-700 leading-relaxed">{addr.address}</p>
                            </div>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-7 w-7 p-0 text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                              onClick={() => {
                                setEditAddressData({ label: addr.label, address: addr.address, isPrimary: addr.isPrimary });
                                setIsEditingAddress(addr.id);
                              }}
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags & Interest */}
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Tags & Interest</h4>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-7 px-2.5 text-xs text-green-600 hover:text-green-700 hover:bg-green-50"
                      onClick={() => setIsAddTagModalOpen(true)}
                    >
                      + เพิ่ม
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {customer.tags.map((tag: any, idx: number) => (
                      <Badge key={idx} className="bg-gray-100 text-gray-700 hover:bg-gray-100 text-xs px-2.5 py-1 border border-gray-200">
                        {tag}
                      </Badge>
                    ))}
                    {customer.interests.map((interest: any, idx: number) => (
                      <Badge key={idx} className="bg-blue-50 text-blue-700 hover:bg-blue-50 text-xs px-2.5 py-1 border border-blue-200">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
                </div> {/* End LEFT COLUMN */}

                {/* RIGHT COLUMN */}
                <div className="space-y-3">
              {/* Organization Group */}
              <div className="bg-white rounded-lg border border-gray-200 p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-gray-700 uppercase">Organization Group</p>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-7 px-2 text-xs text-green-600 hover:text-green-700 hover:bg-green-50"
                    onClick={() => {
                      setNewSubsidiaryData({ name: "", code: "", contact: "" });
                      setIsAddingSubsidiary(true);
                    }}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    เพิ่ม Subsidiary
                  </Button>
                </div>

                {/* Headquarter */}
                <div className="mb-3">
                  <p className="text-[10px] text-gray-500 mb-1.5">Headquarter</p>
                  {!isEditingHeadquarter ? (
                    <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-md border border-blue-100">
                      <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                        <Building2 className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-900">{customer.organizationGroup.headquarter.name}</p>
                        <p className="text-[10px] text-gray-500">{customer.organizationGroup.headquarter.code}</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-7 w-7 p-0 text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                        onClick={() => {
                          setEditHeadquarterData({ 
                            name: customer.organizationGroup.headquarter.name, 
                            code: customer.organizationGroup.headquarter.code 
                          });
                          setIsEditingHeadquarter(true);
                        }}
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2 p-2 bg-blue-50 rounded-md border border-blue-200">
                      <div>
                        <Label className="text-xs text-gray-700">ชื่อ Headquarter</Label>
                        <Input
                          value={editHeadquarterData.name}
                          onChange={(e) => setEditHeadquarterData({ ...editHeadquarterData, name: e.target.value })}
                          className="mt-1 h-8 text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-700">รหัส</Label>
                        <Input
                          value={editHeadquarterData.code}
                          onChange={(e) => setEditHeadquarterData({ ...editHeadquarterData, code: e.target.value })}
                          className="mt-1 h-8 text-sm"
                        />
                      </div>
                      <div className="flex items-center justify-end gap-1 pt-1">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-7 px-2.5 text-xs text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsEditingHeadquarter(false)}
                        >
                          <X className="h-3 w-3 mr-1" />
                          ยกเลิก
                        </Button>
                        <Button 
                          size="sm" 
                          className="h-7 px-2.5 text-xs bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => {
                            // TODO: Save to backend
                            console.log("Save headquarter:", editHeadquarterData);
                            setIsEditingHeadquarter(false);
                          }}
                        >
                          <Save className="h-3 w-3 mr-1" />
                          บันทึก
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Subsidiary */}
                <div>
                  <p className="text-[10px] text-gray-500 mb-1.5">Subsidiary</p>
                  <div className="space-y-2">
                    {/* Existing Subsidiaries from customer data */}
                    {customer.organizationGroup.subsidiaries.map((sub: any, idx: number) => (
                      <div key={idx}>
                        {isEditingSubsidiary === idx ? (
                          // Edit Mode
                          <div className="space-y-2 p-2 bg-teal-50 rounded-md border border-teal-200">
                            <div>
                              <Label className="text-xs text-gray-700">ชื่อ Subsidiary</Label>
                              <Input
                                value={editSubsidiaryData.name}
                                onChange={(e) => setEditSubsidiaryData({ ...editSubsidiaryData, name: e.target.value })}
                                className="mt-1 h-8 text-sm"
                              />
                            </div>
                            <div>
                              <Label className="text-xs text-gray-700">รหัส</Label>
                              <Input
                                value={editSubsidiaryData.code}
                                onChange={(e) => setEditSubsidiaryData({ ...editSubsidiaryData, code: e.target.value })}
                                className="mt-1 h-8 text-sm"
                              />
                            </div>
                            <div>
                              <Label className="text-xs text-gray-700">ผู้ติดต่อ</Label>
                              <Input
                                value={editSubsidiaryData.contact}
                                onChange={(e) => setEditSubsidiaryData({ ...editSubsidiaryData, contact: e.target.value })}
                                className="mt-1 h-8 text-sm"
                              />
                            </div>
                            <div className="flex items-center justify-end gap-1 pt-1">
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-7 px-2.5 text-xs text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsEditingSubsidiary(null)}
                              >
                                <X className="h-3 w-3 mr-1" />
                                ยกเลิก
                              </Button>
                              <Button 
                                size="sm" 
                                className="h-7 px-2.5 text-xs bg-teal-600 hover:bg-teal-700 text-white"
                                onClick={() => {
                                  // TODO: Save to backend
                                  console.log("Save subsidiary:", editSubsidiaryData);
                                  setIsEditingSubsidiary(null);
                                }}
                              >
                                <Save className="h-3 w-3 mr-1" />
                                บันทึก
                              </Button>
                            </div>
                          </div>
                        ) : (
                          // View Mode
                          <div className="flex items-center gap-2 p-2 bg-teal-50 rounded-md border border-teal-100">
                            <div className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                              <Building2 className="h-4 w-4 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-gray-900">{sub.name}</p>
                              <p className="text-[10px] text-gray-500">{sub.contact}</p>
                            </div>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-7 w-7 p-0 text-gray-400 hover:text-teal-600 hover:bg-teal-50"
                              onClick={() => {
                                setEditSubsidiaryData({ name: sub.name, code: sub.code, contact: sub.contact });
                                setIsEditingSubsidiary(idx);
                              }}
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Added Subsidiaries from state */}
                    {subsidiaries.map((sub) => (
                      <div key={sub.id}>
                        {isEditingSubsidiary === sub.id ? (
                          // Edit Mode
                          <div className="space-y-2 p-2 bg-teal-50 rounded-md border border-teal-200">
                            <div>
                              <Label className="text-xs text-gray-700">ชื่อ Subsidiary</Label>
                              <Input
                                value={editSubsidiaryData.name}
                                onChange={(e) => setEditSubsidiaryData({ ...editSubsidiaryData, name: e.target.value })}
                                className="mt-1 h-8 text-sm"
                              />
                            </div>
                            <div>
                              <Label className="text-xs text-gray-700">รหัส</Label>
                              <Input
                                value={editSubsidiaryData.code}
                                onChange={(e) => setEditSubsidiaryData({ ...editSubsidiaryData, code: e.target.value })}
                                className="mt-1 h-8 text-sm"
                              />
                            </div>
                            <div>
                              <Label className="text-xs text-gray-700">ผู้ติดต่อ</Label>
                              <Input
                                value={editSubsidiaryData.contact}
                                onChange={(e) => setEditSubsidiaryData({ ...editSubsidiaryData, contact: e.target.value })}
                                className="mt-1 h-8 text-sm"
                              />
                            </div>
                            <div className="flex items-center justify-end gap-1 pt-1">
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-7 px-2.5 text-xs text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsEditingSubsidiary(null)}
                              >
                                <X className="h-3 w-3 mr-1" />
                                ยกเลิก
                              </Button>
                              <Button 
                                size="sm" 
                                className="h-7 px-2.5 text-xs bg-teal-600 hover:bg-teal-700 text-white"
                                onClick={() => {
                                  const updatedSubs = subsidiaries.map(s => 
                                    s.id === sub.id ? { ...s, ...editSubsidiaryData } : s
                                  );
                                  setSubsidiaries(updatedSubs);
                                  setIsEditingSubsidiary(null);
                                }}
                              >
                                <Save className="h-3 w-3 mr-1" />
                                บันทึก
                              </Button>
                            </div>
                          </div>
                        ) : (
                          // View Mode
                          <div className="flex items-center gap-2 p-2 bg-teal-50 rounded-md border border-teal-100">
                            <div className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                              <Building2 className="h-4 w-4 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-gray-900">{sub.name}</p>
                              <p className="text-[10px] text-gray-500">{sub.contact}</p>
                            </div>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-7 w-7 p-0 text-gray-400 hover:text-teal-600 hover:bg-teal-50"
                              onClick={() => {
                                setEditSubsidiaryData({ name: sub.name, code: sub.code, contact: sub.contact });
                                setIsEditingSubsidiary(sub.id);
                              }}
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-7 w-7 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50"
                              onClick={() => {
                                setSubsidiaries(subsidiaries.filter(s => s.id !== sub.id));
                              }}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Add New Subsidiary Form */}
                    {isAddingSubsidiary && (
                      <div className="space-y-2 p-2 bg-teal-50 rounded-md border-2 border-teal-300">
                        <div>
                          <Label className="text-xs text-gray-700">ชื่อ Subsidiary</Label>
                          <Input
                            value={newSubsidiaryData.name}
                            onChange={(e) => setNewSubsidiaryData({ ...newSubsidiaryData, name: e.target.value })}
                            className="mt-1 h-8 text-sm"
                            placeholder="ชื่อบริษัทย่อย"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-700">รหัส</Label>
                          <Input
                            value={newSubsidiaryData.code}
                            onChange={(e) => setNewSubsidiaryData({ ...newSubsidiaryData, code: e.target.value })}
                            className="mt-1 h-8 text-sm"
                            placeholder="SUB-XXX"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-700">ผู้ติดต่อ</Label>
                          <Input
                            value={newSubsidiaryData.contact}
                            onChange={(e) => setNewSubsidiaryData({ ...newSubsidiaryData, contact: e.target.value })}
                            className="mt-1 h-8 text-sm"
                            placeholder="ชื่อผู้ติดต่อ"
                          />
                        </div>
                        <div className="flex items-center justify-end gap-1 pt-1">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-7 px-2.5 text-xs text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                            onClick={() => {
                              setIsAddingSubsidiary(false);
                              setNewSubsidiaryData({ name: "", code: "", contact: "" });
                            }}
                          >
                            <X className="h-3 w-3 mr-1" />
                            ยกเลิก
                          </Button>
                          <Button 
                            size="sm" 
                            className="h-7 px-2.5 text-xs bg-teal-600 hover:bg-teal-700 text-white"
                            onClick={() => {
                              if (newSubsidiaryData.name && newSubsidiaryData.code) {
                                setSubsidiaries([...subsidiaries, { id: Date.now(), ...newSubsidiaryData }]);
                                setIsAddingSubsidiary(false);
                                setNewSubsidiaryData({ name: "", code: "", contact: "" });
                              }
                            }}
                          >
                            <Save className="h-3 w-3 mr-1" />
                            เพิ่ม
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Service Revenue */}
              <div className="bg-white rounded-lg border border-gray-200 p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-gray-700 uppercase">บริการที่ใช้</p>
                  {!isEditingService ? (
                    null
                  ) : (
                    <div className="flex items-center gap-1">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-7 px-2.5 text-xs text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsEditingService(false)}
                      >
                        <X className="h-3 w-3 mr-1" />
                        ยกเลิก
                      </Button>
                      <Button 
                        size="sm" 
                        className="h-7 px-2.5 text-xs bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => {
                          // TODO: Save to backend
                          console.log("Save services:", selectedServices);
                          setIsEditingService(false);
                        }}
                      >
                        <Save className="h-3 w-3 mr-1" />
                        บันทึก
                      </Button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  {serviceRevenue.map((service, idx) => {
                    const isSelected = selectedServices.includes(service.name);
                    return (
                      <div
                        key={idx}
                        className={`p-2 rounded-md border transition-all ${
                          isEditingService 
                            ? 'cursor-pointer hover:shadow-md' 
                            : ''
                        } ${
                          isSelected
                            ? "bg-green-50 border-green-200"
                            : "bg-gray-100 border-gray-300"
                        }`}
                        onClick={() => {
                          if (isEditingService) {
                            if (isSelected) {
                              setSelectedServices(selectedServices.filter(s => s !== service.name));
                            } else {
                              setSelectedServices([...selectedServices, service.name]);
                            }
                          }
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <p className={`text-xs font-medium ${isSelected ? 'text-gray-900' : 'text-gray-500'}`}>
                            {service.name}
                          </p>
                          {isSelected && (
                            <div className="flex items-center justify-center h-5 w-5 rounded-full bg-green-500">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Supply Chain & Sales Channel */}
              <div className="bg-white rounded-lg border border-gray-200 p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-gray-700 uppercase">Supply Chain & Sales Channel</p>
                  {!isEditingSupplyChain ? (
                    null
                  ) : (
                    <div className="flex items-center gap-1">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-7 px-2.5 text-xs text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsEditingSupplyChain(false)}
                      >
                        <X className="h-3 w-3 mr-1" />
                        ยกเลิก
                      </Button>
                      <Button 
                        size="sm" 
                        className="h-7 px-2.5 text-xs bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => {
                          // TODO: Save to backend
                          console.log("Save supply chain:", supplyChainRoles, salesChannels);
                          setIsEditingSupplyChain(false);
                        }}
                      >
                        <Save className="h-3 w-3 mr-1" />
                        บันทึก
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  {/* Supply Chain */}
                  <div>
                    <p className="text-[10px] font-semibold text-gray-600 uppercase mb-1.5">Supply Chain</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { key: 'exporter', label: 'Exporter' },
                        { key: 'importer', label: 'Importer' },
                        { key: 'manufacturer', label: 'Manufacturer' },
                        { key: 'distributor', label: 'Distributor' },
                        { key: 'retailer', label: 'Retailer/Wholesaler' },
                        { key: 'logistics', label: 'Logistics' },
                        { key: 'other', label: 'Other' },
                      ].map((item) => {
                        const isSelected = supplyChainRoles[item.key as keyof typeof supplyChainRoles];
                        return (
                          <div
                            key={item.key}
                            className={`p-2 rounded-md border transition-all ${
                              isEditingSupplyChain 
                                ? 'cursor-pointer hover:shadow-md' 
                                : ''
                            } ${
                              isSelected
                                ? "bg-green-50 border-green-200"
                                : "bg-gray-100 border-gray-300"
                            }`}
                            onClick={() => {
                              if (isEditingSupplyChain) {
                                setSupplyChainRoles({
                                  ...supplyChainRoles,
                                  [item.key]: !isSelected
                                });
                              }
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <p className={`text-xs font-medium ${isSelected ? 'text-gray-900' : 'text-gray-500'}`}>
                                {item.label}
                              </p>
                              {isSelected && (
                                <div className="flex items-center justify-center h-5 w-5 rounded-full bg-green-500">
                                  <Check className="h-3 w-3 text-white" />
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Sales Channel */}
                  <div>
                    <p className="text-[10px] font-semibold text-gray-600 uppercase mb-1.5">Sales Channel</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { key: 'b2b', label: 'B2B' },
                        { key: 'b2c', label: 'B2C' },
                      ].map((item) => {
                        const isSelected = salesChannels[item.key as keyof typeof salesChannels];
                        return (
                          <div
                            key={item.key}
                            className={`p-2 rounded-md border transition-all ${
                              isEditingSupplyChain 
                                ? 'cursor-pointer hover:shadow-md' 
                                : ''
                            } ${
                              isSelected
                                ? "bg-green-50 border-green-200"
                                : "bg-gray-100 border-gray-300"
                            }`}
                            onClick={() => {
                              if (isEditingSupplyChain) {
                                setSalesChannels({
                                  ...salesChannels,
                                  [item.key]: !isSelected
                                });
                              }
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <p className={`text-xs font-medium ${isSelected ? 'text-gray-900' : 'text-gray-500'}`}>
                                {item.label}
                              </p>
                              {isSelected && (
                                <div className="flex items-center justify-center h-5 w-5 rounded-full bg-green-500">
                                  <Check className="h-3 w-3 text-white" />
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Insight */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-2">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-xs font-semibold text-blue-700 uppercase">Customer Insight</p>
                  {!isEditingInsight ? (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-7 px-2 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-100"
                      onClick={() => {
                        setEditInsightData(customer.insights);
                        setIsEditingInsight(true);
                      }}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      แก้ไข
                    </Button>
                  ) : (
                    <div className="flex items-center gap-1">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-7 px-2.5 text-xs text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsEditingInsight(false)}
                      >
                        <X className="h-3 w-3 mr-1" />
                        ยกเลิก
                      </Button>
                      <Button 
                        size="sm" 
                        className="h-7 px-2.5 text-xs bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => {
                          // TODO: Save to backend
                          console.log("Save insights:", editInsightData);
                          setIsEditingInsight(false);
                        }}
                      >
                        <Save className="h-3 w-3 mr-1" />
                        บันทึก
                      </Button>
                    </div>
                  )}
                </div>
                
                {!isEditingInsight ? (
                  // View Mode
                  <div className="space-y-1.5">
                    {customer.insights.map((insight: any, idx: number) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></div>
                        <p className="text-xs text-blue-800">{insight}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Edit Mode - Single textarea
                  <div>
                    <Textarea
                      value={editInsightData.join('\n')}
                      onChange={(e) => {
                        const lines = e.target.value.split('\n');
                        setEditInsightData(lines);
                      }}
                      className="text-xs resize-none bg-white"
                      rows={6}
                      placeholder="แต่ละบรรทัด = 1 Insight"
                    />
                    <p className="text-[10px] text-blue-600 mt-1">💡 แต่ละบรรทัด = 1 Insight</p>
                  </div>
                )}
              </div>

                </div> {/* End RIGHT COLUMN */}
              </div> {/* End 2-Column Grid */}
            </>
          )}

          {/* Tab Content - บุคคลติดต่อ */}
          {activeTab === "contacts" && (
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <p className="text-xs font-semibold text-gray-700 uppercase mb-2">ผู้ติดต่อ</p>
              <div className="space-y-1.5">
                {customer.contacts.map((contact: any) => (
                  <div key={contact.id} className="p-2 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-start gap-2">
                      <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0">
                        <Users className="h-4 w-4 text-blue-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-semibold text-gray-900">{contact.name}</p>
                          {contact.isPrimary && (
                            <Badge className="bg-blue-600 text-white text-[9px] px-1.5 py-0 h-4 hover:bg-blue-600">
                              Primary
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mb-0.5">{contact.position || contact.role}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-600 mt-2">
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            <span>{contact.phone}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            <span className="truncate">{contact.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content - ดีล */}
          {activeTab === "deals" && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 w-[140px]">รหัสดีล</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">ชื่อดีล</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 w-[120px]">Stage</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 w-[100px]">BU</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 w-[180px]">PIC</th>
                  </tr>
                </thead>
                <tbody>
                  {customer.deals && customer.deals.length > 0 ? (
                    customer.deals.map((deal: any, index: number) => (
                      <tr 
                        key={deal.id} 
                        className={`border-b border-gray-100 cursor-pointer ${
                          deal.isRestricted 
                            ? 'bg-gray-100/50' 
                            : 'hover:bg-gray-50'
                        } transition-colors`}
                        onClick={() => {
                          if (onDealClick) {
                            onDealClick(deal.id);
                          }
                        }}
                      >
                        <td className="px-4 py-3 align-top">
                          <div className="flex flex-col gap-0.5">
                            <span className={`text-xs font-medium ${deal.isRestricted ? 'text-gray-400' : 'text-gray-900'}`}>#{deal.id}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 align-top">
                          <div className="flex items-center gap-2">
                            {deal.isRestricted && <Lock className="h-3 w-3 text-gray-400 flex-shrink-0" />}
                            <p className={`text-xs font-normal ${deal.isRestricted ? 'text-gray-500' : 'text-gray-900'}`}>{deal.name}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 align-top">
                          <Badge className={`text-[9px] px-1.5 py-0 h-4 ${
                            deal.isRestricted ? 'bg-gray-200 text-gray-500 border-gray-300' :
                            deal.stage === 'Active' ? 'bg-green-100 text-green-700 border-green-200' :
                            deal.stage === 'Negotiation' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                            deal.stage === 'Proposal' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                            'bg-gray-100 text-gray-700 border-gray-200'
                          }`}>
                            {deal.stage}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 align-top">
                          <Badge variant="outline" className={`text-[9px] px-1.5 py-0 h-4 ${deal.isRestricted ? 'text-gray-400 border-gray-300' : ''}`}>{deal.bu}</Badge>
                        </td>
                        <td className="px-4 py-3 align-top">
                          <div className="flex items-center gap-1">
                            <User className={`h-3 w-3 ${deal.isRestricted ? 'text-gray-400' : 'text-gray-500'}`} />
                            <span className={`text-xs ${deal.isRestricted ? 'text-gray-400' : 'text-gray-600'}`}>{deal.pic}</span>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center">
                        <p className="text-xs text-gray-400">ไม่มีดีล</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Quotations Table - ใต้ตารางดีล */}
              <div className="mt-6">
                <p className="text-xs font-semibold text-gray-700 uppercase mb-3 px-1">ใบเสนอราคา</p>
                <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 w-[140px]">รหัส</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">ชื่อใบเสนอราคา</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 w-[120px]">สถานะ</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 w-[100px]">BU</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 w-[140px]">มูลค่า</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 w-[120px]">ใช้ได้ถึง</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 w-[180px]">ผู้สร้าง</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customer.quotations && customer.quotations.length > 0 ? (
                      customer.quotations.map((quotation: any, index: number) => (
                        <tr 
                          key={quotation.id} 
                          className={`border-b border-gray-100 cursor-pointer ${
                            quotation.isRestricted 
                              ? 'bg-gray-100/50' 
                              : 'hover:bg-gray-50'
                          } transition-colors`}
                          onClick={() => {
                            if (onQuotationClick) {
                              onQuotationClick(quotation.id);
                            }
                          }}
                        >
                          <td className="px-4 py-3 align-top">
                            <span className={`text-xs font-medium ${quotation.isRestricted ? 'text-gray-400' : 'text-gray-900'}`}>{quotation.id}</span>
                          </td>
                          <td className="px-4 py-3 align-top">
                            <div className="flex items-center gap-2">
                              {quotation.isRestricted && <Lock className="h-3 w-3 text-gray-400 flex-shrink-0" />}
                              <p className={`text-xs font-normal ${quotation.isRestricted ? 'text-gray-500' : 'text-gray-900'}`}>{quotation.name}</p>
                            </div>
                          </td>
                          <td className="px-4 py-3 align-top">
                            <Badge className={`text-[9px] px-1.5 py-0 h-4 ${
                              quotation.isRestricted ? 'bg-gray-200 text-gray-500 border-gray-300' :
                              quotation.status === 'Approved' ? 'bg-green-100 text-green-700 border-green-200' :
                              quotation.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                              quotation.status === 'Draft' ? 'bg-gray-100 text-gray-700 border-gray-200' :
                              quotation.status === 'Revised' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                              'bg-gray-100 text-gray-700 border-gray-200'
                            }`}>
                              {quotation.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 align-top">
                            <Badge variant="outline" className={`text-[9px] px-1.5 py-0 h-4 ${quotation.isRestricted ? 'text-gray-400 border-gray-300' : ''}`}>{quotation.bu}</Badge>
                          </td>
                          <td className="px-4 py-3 align-top text-right">
                            <span className={`text-xs font-semibold ${quotation.isRestricted ? 'text-gray-400 italic' : 'text-gray-900'}`}>฿{quotation.amount}</span>
                          </td>
                          <td className="px-4 py-3 align-top">
                            <span className={`text-xs ${quotation.isRestricted ? 'text-gray-400' : 'text-gray-600'}`}>{quotation.validUntil}</span>
                          </td>
                          <td className="px-4 py-3 align-top">
                            <div className="flex items-center gap-1">
                              <User className={`h-3 w-3 ${quotation.isRestricted ? 'text-gray-400' : 'text-gray-500'}`} />
                              <span className={`text-xs ${quotation.isRestricted ? 'text-gray-400' : 'text-gray-600'}`}>{quotation.createdBy}</span>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center">
                          <p className="text-xs text-gray-400">ไม่มีใบเสนอราคา</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab Content - การเยี่ยมชม */}
          {activeTab === "visits" && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 w-[100px]">วันที่</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 w-[280px]">หัวข้อ</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 w-[180px]">ผู้เยี่ยมชม</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">หมายเหตุ/บันทึก</th>
                  </tr>
                </thead>
                <tbody>
                  {customer.visits && customer.visits.length > 0 ? (
                    customer.visits.map((visit: any, index: number) => (
                      <tr key={visit.id} className={`border-b border-gray-100 ${
                        visit.isRestricted 
                          ? 'bg-gray-100/50' 
                          : index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                      } ${!visit.isRestricted && 'hover:bg-blue-50/30'} transition-colors ${visit.isRestricted && 'opacity-60'}`}>
                        <td className="px-4 py-3 align-top">
                          <div className="flex flex-col gap-0.5">
                            <span className={`text-xs font-medium ${visit.isRestricted ? 'text-gray-500' : 'text-gray-900'}`}>{visit.date}</span>
                            <span className="text-[11px] text-gray-500">14:30</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 align-top">
                          <div className="flex items-center gap-2">
                            {visit.isRestricted && <Lock className="h-3 w-3 text-gray-400" />}
                            <p className={`text-xs font-normal ${visit.isRestricted ? 'text-gray-500' : 'text-gray-900'}`}>{visit.title}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 align-top">
                          <div className="flex flex-col gap-0.5">
                            <span className={`text-xs font-medium ${visit.isRestricted ? 'text-gray-500' : 'text-[#155dfc]'}`}>{visit.visitedBy}</span>
                            <span className="text-[11px] text-gray-500">BU: {visit.bu}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 align-top">
                          <p className={`text-xs leading-relaxed ${visit.isRestricted ? 'text-gray-400 italic' : 'text-gray-700'}`}>{visit.notes}</p>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center">
                        <p className="text-xs text-gray-400">ไม่มีประวัติการเยี่ยมชม</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Tab Content - กิจกรรม */}
          {activeTab === "activities" && (
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <p className="text-xs font-semibold text-gray-700 uppercase mb-2">กิจกรรม</p>
              <div className="space-y-2">
                {(customer.activities || []).map((activity: any) => (
                  <div key={activity.id} className="p-2 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-start gap-2">
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-900">{activity.title}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">{activity.date} - {activity.user}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {(!customer.activities || customer.activities.length === 0) && (
                  <p className="text-xs text-gray-400 text-center py-4">ไม่มีกิจกรรม</p>
                )}
              </div>
            </div>
          )}

          {/* Tab Content - Win/Loss Factors */}
          {activeTab === "win-loss-factors" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Win Factors Section */}
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg px-4 py-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-white" />
                      <h3 className="text-base font-semibold text-white">Win Factors</h3>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-white text-sm font-semibold">Total: {customer.winLossReasons?.winTotal}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {(() => {
                    const categories = Array.from(new Set(customer.winLossReasons?.win.map((i: any) => i.category)));
                    return categories.map((category: any) => {
                      const items = customer.winLossReasons?.win.filter((i: any) => i.category === category);
                      const categoryTotal = items.reduce((sum: number, i: any) => sum + i.count, 0);
                      
                      return (
                        <div key={category} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                          <div className="bg-emerald-50 px-3 py-2 border-b border-emerald-100">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-semibold text-emerald-900">{category}</h4>
                              <span className="text-xs font-medium text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                                {categoryTotal} deals
                              </span>
                            </div>
                          </div>
                          <div className="p-3 space-y-2">
                            {items.map((item: any, idx: number) => (
                              <div key={idx} className="flex items-center justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-gray-700 truncate">{item.reason}</p>
                                  <div className="mt-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                    <div 
                                      className="bg-emerald-500 h-full rounded-full transition-all" 
                                      style={{ width: `${item.percentage}%` }}
                                    />
                                  </div>
                                </div>
                                <div className="flex items-center gap-3 flex-shrink-0">
                                  <span className="text-sm font-semibold text-gray-900 min-w-[2rem] text-right">
                                    {item.count}
                                  </span>
                                  <span className="text-sm font-bold text-emerald-600 min-w-[3rem] text-right">
                                    {item.percentage}%
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>

              {/* Loss Factors Section */}
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg px-4 py-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-white" />
                      <h3 className="text-base font-semibold text-white">Loss Factors</h3>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-white text-sm font-semibold">Total: {customer.winLossReasons?.lossTotal}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {(() => {
                    const categories = Array.from(new Set(customer.winLossReasons?.loss.map((i: any) => i.category)));
                    return categories.map((category: any) => {
                      const items = customer.winLossReasons?.loss.filter((i: any) => i.category === category);
                      const categoryTotal = items.reduce((sum: number, i: any) => sum + i.count, 0);
                      
                      return (
                        <div key={category} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                          <div className="bg-red-50 px-3 py-2 border-b border-red-100">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-semibold text-red-900">{category}</h4>
                              <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                                {categoryTotal} deals
                              </span>
                            </div>
                          </div>
                          <div className="p-3 space-y-2">
                            {items.map((item: any, idx: number) => (
                              <div key={idx} className="flex items-center justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-gray-700 truncate">{item.reason}</p>
                                  <div className="mt-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                    <div 
                                      className="bg-red-500 h-full rounded-full transition-all" 
                                      style={{ width: `${item.percentage}%` }}
                                    />
                                  </div>
                                </div>
                                <div className="flex items-center gap-3 flex-shrink-0">
                                  <span className="text-sm font-semibold text-gray-900 min-w-[2rem] text-right">
                                    {item.count}
                                  </span>
                                  <span className="text-sm font-bold text-red-600 min-w-[3rem] text-right">
                                    {item.percentage}%
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Transfer Modal - Place at end of parent view */}
      <TransferCustomerModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        customerName={customer.companyName}
        customerId={customer.id}
        currentOwner={customer.pic}
        currentBU={customer.bu}
      />
    </div>
  );
}

export { CustomerDetailHCPV2 as CustomerDetailHCP };
export default CustomerDetailHCPV2;

