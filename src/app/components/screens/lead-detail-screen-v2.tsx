import React, { useState, useRef, useEffect } from "react";
import {
  ArrowLeft, Phone, Mail, MapPin, User, Calendar, Briefcase,
  DollarSign, Edit2, UserCheck, MessageSquare, AlertCircle,
  Users, ChevronUp, ChevronDown, Check, ChevronRight, X,
  Info, ArrowRightLeft, ArrowRight, Building2, Share2,
  CheckCircle2, ShieldAlert, UserCircle2, Layers, Plus,
  Receipt, Percent, MonitorPlay, AlertTriangle, ShieldCheck, Handshake
} from "lucide-react";
import { ConvertLeadDialog as RealConvertLeadDialog } from "../convert-lead-dialog";
import { CreateDealDialog as RealCreateDealDialog } from "../create-deal-dialog";
import { TransferLeadDialog as RealTransferLeadDialog } from "../transfer-lead-dialog";
import { QuickStatusUpdateDialog } from "../quick-status-update-dialog";
import { toast } from "sonner";

// ─── Mock Libraries & UI Components for Standalone Preview ───────────────────
const useTranslation = () => ({ t: (key) => key });

const Button = ({ variant = "default", size = "default", className = "", children, ...props }) => {
  const base = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none cursor-pointer";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-200 bg-white hover:bg-gray-100 text-gray-900",
    ghost: "hover:bg-gray-100 hover:text-gray-900",
    success: "bg-[#10b981] text-white hover:bg-[#059669]", // Emerald
  };
  const sizes = { default: "h-10 px-4 py-2", sm: "h-8 px-3 text-xs" };
  return (
    <button className={`${base} ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Badge = ({ className = "", children }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}>
    {children}
  </span>
);

const Input = ({ className = "", ...props }) => (
  <input className={`flex h-9 w-full rounded-md border border-gray-200 bg-white px-3 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 ${className}`} {...props} />
);

const Textarea = ({ className = "", ...props }) => (
  <textarea className={`flex min-h-[60px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 ${className}`} {...props} />
);

const Avatar = ({ children, className = "" }) => (
  <div className={`rounded-full overflow-hidden flex items-center justify-center ${className}`}>{children}</div>
);

const AvatarFallback = ({ children, className = "" }) => (
  <div className={`w-full h-full flex items-center justify-center font-bold ${className}`}>{children}</div>
);

// ─── Shared styles ───────────────────────────────────────────────────────────
const cardClass = "bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-6 space-y-4";
const ownershipCardClass = "bg-white rounded-[24px] border border-indigo-100/50 p-6 md:p-8 space-y-4 shadow-[0_8px_30px_rgb(59,130,246,0.08),0_1px_4px_rgb(0,0,0,0.02)]";

function getStatusColor(status) {
  switch (status) {
    case "New":       return "bg-blue-50 text-blue-700 border-blue-200";
    case "Contacted": return "bg-purple-50 text-purple-700 border-purple-200";
    case "Qualified": return "bg-green-50 text-green-700 border-green-200";
    case "Unqualified":return "bg-orange-50 text-orange-700 border-orange-200";
    case "Lost":      return "bg-red-50 text-red-700 border-red-200";
    case "Active":    return "bg-emerald-50 text-emerald-700 border-emerald-200";
    default:          return "bg-gray-50 text-gray-700 border-gray-200";
  }
}

// ─── Ownership Status Components ──────────────────────────────

function ReasonCallout() {
  return (
    <div className="mt-4 p-4 rounded-xl bg-blue-50/80 border border-blue-100 flex items-start gap-3 text-blue-900">
      <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-semibold mb-1 text-blue-900">เหตุผลในการโอนย้าย</p>
        <p className="text-[13px] leading-relaxed text-blue-800">
          "ลูกค้ารายนี้ต้องการความเชี่ยวชาญเฉพาะทางด้านการจัดการขนส่งและพิธีการศุลกากรสำหรับสินค้าควบคุม ซึ่งตรงกับการดูแลของทีมใหม่มากกว่า"
        </p>
      </div>
    </div>
  );
}

function ManagerContact({ phone, email }) {
  return (
    <div className="flex items-center gap-1.5 mt-2">
      <a href={`tel:${phone}`} className="h-6 w-6 rounded-md bg-white flex items-center justify-center border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors text-gray-500 shadow-sm">
        <Phone className="h-3 w-3" />
      </a>
      <a href={`mailto:${email}`} className="h-6 w-6 rounded-md bg-white flex items-center justify-center border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors text-gray-500 shadow-sm">
        <Mail className="h-3 w-3" />
      </a>
    </div>
  );
}

function OwnershipReceivedCard() {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="bg-white rounded-2xl border border-blue-100 p-5 shadow-sm relative overflow-hidden transition-all">
      {/* Decorative left accent line */}
      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
      
      <div className={`flex items-center justify-between cursor-pointer pl-1 ${expanded ? 'mb-5' : ''}`} onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <ArrowRightLeft className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 leading-tight">สถานะ: ได้รับการโอนย้าย</h3>
            <p className="text-[11px] text-gray-500 mt-0.5">โอนย้ายมาที่คุณ</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-blue-50 text-blue-700 border-0 shadow-sm">ได้รับโอนย้าย</Badge>
          <div className="p-1 text-gray-400 hover:bg-gray-50 rounded-md transition-colors">
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </div>
      </div>
      
      <div className={`overflow-hidden transition-all duration-300 ease-in-out pl-1 ${expanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="grid grid-cols-2 gap-4 p-3.5 bg-gray-50/80 rounded-xl border border-gray-100/80">
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold mb-1.5">ผู้ดูแลปัจจุบัน</p>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="bg-blue-600 text-white font-medium text-[10px]">AM</AvatarFallback>
              </Avatar>
              <span className="text-xs font-bold text-gray-900">Alex Morgan <span className="text-gray-500 font-normal ml-0.5">(Commercial BU)</span></span>
            </div>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold mb-1.5">โอนย้ายมาจาก</p>
            <p className="text-xs font-bold text-gray-900 mt-1">Sarah Chen <span className="text-gray-500 font-normal ml-0.5">(Freight BU)</span></p>
          </div>
        </div>
        
        <div>
          <ReasonCallout />
        </div>
      </div>
    </div>
  );
}

function OwnershipSharedCard() {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 p-5 shadow-sm relative overflow-hidden transition-all">
      {/* Decorative left accent line */}
      <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
      
      <div className={`flex items-center justify-between cursor-pointer pl-1 ${expanded ? 'mb-5' : ''}`} onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Users className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 leading-tight">ดูแลลูกค้าร่วมกัน</h3>
            <p className="text-[11px] text-gray-500 mt-0.5">สิทธิ์การดูแลแบบแชร์</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-emerald-50 text-emerald-700 border-0 shadow-sm">แชร์ร่วมกัน</Badge>
          <div className="p-1 text-gray-400 hover:bg-gray-50 rounded-md transition-colors">
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </div>
      </div>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out pl-1 ${expanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 bg-gray-50/80 rounded-xl border border-gray-100/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">ผู้ดูแลที่ 1</p>
                <Badge className="bg-white border-gray-200 text-gray-500 text-[9px] px-1.5 shadow-sm">Freight</Badge>
              </div>
              <p className="text-sm font-bold text-gray-900">Sarah Chen</p>
            </div>
            <ManagerContact phone="081-123-4567" email="sarah.c@freight.com" />
          </div>
          
          <div className="p-3.5 bg-gray-50/80 rounded-xl border border-gray-100/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">ผู้ดูแลที่ 2</p>
                <Badge className="bg-white border-gray-200 text-gray-500 text-[9px] px-1.5 shadow-sm">Commercial</Badge>
              </div>
              <p className="text-sm font-bold text-gray-900">Alex Morgan</p>
            </div>
            <ManagerContact phone="081-234-5678" email="alex.m@commercial.com" />
          </div>
        </div>
      </div>
    </div>
  );
}

function OwnershipSentCard() {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm relative overflow-hidden transition-all">
      {/* Decorative left accent line */}
      <div className="absolute top-0 left-0 w-1 h-full bg-slate-400"></div>
      
      <div className="flex items-center justify-between cursor-pointer pl-1" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
            <ArrowRight className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 leading-tight">ประวัติ: โอนย้ายแล้ว</h3>
            <p className="text-[11px] text-gray-500 mt-0.5">โอนย้ายออกเรียบร้อย</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-slate-100 text-slate-600 border-0 shadow-sm">โอนแล้ว</Badge>
          <div className="p-1 text-gray-400 hover:bg-gray-50 rounded-md transition-colors">
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </div>
      </div>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out pl-1 ${expanded ? "max-h-[500px] opacity-100 mt-5" : "max-h-0 opacity-0"}`}>
        <div className="p-4 bg-gray-50/80 rounded-xl border border-gray-100/80 grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold mb-1.5">โอนไปยัง</p>
            <p className="text-xs font-bold text-gray-900">Anan Srisuk</p>
            <p className="text-[11px] text-gray-500 mt-0.5">Commercial BU</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold mb-1.5">วันที่โอนย้าย</p>
            <p className="text-xs font-bold text-gray-900">15 มี.ค. 2026</p>
            <p className="text-[11px] text-gray-500 mt-0.5">10:30 AM</p>
          </div>
          <div className="col-span-2 pt-3 border-t border-gray-200/60 mt-1">
            <p className="text-[10px] text-gray-400 uppercase font-bold mb-1.5">เจ้าของเดิม</p>
            <p className="text-xs font-bold text-gray-700">Sarah Chen <span className="font-normal text-gray-500">(Freight BU)</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Component: Transfer Context Banner ───
function TransferContextBanner({ transferData }) {
  if (!transferData) return null;

  let config = {};

  switch (transferData.type) {
    case 's1-main':
      config = {
        icon: ShieldCheck, color: "text-indigo-700", bg: "bg-indigo-50 border-indigo-200", iconBg: "bg-indigo-100 text-indigo-600",
        title: "เจ้าของดีลหลัก (Main Contractor)",
        desc: `คุณกำลังใช้งาน ${transferData.partnerBU} (${transferData.partnerName}) ในฐานะซัพพลายเออร์ภายใน`,
        policy: "คุณเป็นผู้ออกใบเสนอราคาและบิลในนาม BU ของคุณเท่านั้น (Single Billing)"
      };
      break;
    case 's1-vendor':
      config = {
        icon: Receipt, color: "text-slate-700", bg: "bg-slate-50 border-slate-200 shadow-sm", iconBg: "bg-white text-slate-500 border border-slate-200",
        title: "ทำงานในฐานะซัพพลายเออร์ (Vendor)",
        desc: `ลีดนี้อยู่ภายใต้การดูแลหลักของ ${transferData.partnerBU} (${transferData.partnerName})`,
        policy: "ไม่ต้องเปิดบิลให้ลูกค้าตรง ให้คิดค่าบริการตัดกับ BU หลัก (Internal Billing)"
      };
      break;
    case 's2-shared':
      config = {
        icon: Handshake, color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200", iconBg: "bg-emerald-100 text-emerald-600",
        title: "ดูแลลูกค้าแบบร่วมกัน (Cross-sell)",
        desc: `คุณและ ${transferData.partnerBU} (${transferData.partnerName}) ดูแลลูกค้ารายนี้ร่วมกัน`,
        policy: "ต่างฝ่ายต่างออกใบเสนอราคาและเปิดบิลแยกกัน (Multi-Billing)"
      };
      break;
    case 's3-received':
      config = {
        icon: ArrowRightLeft, color: "text-blue-700", bg: "bg-blue-50 border-blue-200", iconBg: "bg-blue-100 text-blue-600",
        title: "รับโอนสิทธิ์ขาด 100% (Transferred)",
        desc: `ลีดนี้ถูกโอนย้ายมาจาก ${transferData.partnerBU} (${transferData.partnerName}) เมื่อ ${transferData.date}`,
        policy: "คุณเป็นเจ้าของลูกค้า 100% (ไม่มีการแบ่งค่าคอมมิชชัน)"
      };
      break;
    case 's4-monitor':
      config = {
        icon: MonitorPlay, color: "text-purple-700", bg: "bg-purple-50 border-purple-200", iconBg: "bg-purple-100 text-purple-600",
        title: "สถานะ: ผู้แนะนำ / ติดตามผล (Monitor)",
        desc: `คุณได้โอนลีดนี้ให้ ${transferData.partnerBU} (${transferData.partnerName}) เป็นผู้ปิดการขายหลัก`,
        policy: "คุณมีสิทธิ์รับส่วนแบ่งค่าคอมมิชชันในฐานะผู้แนะนำ (Referral Commission)"
      };
      break;
    case 's4-owner':
      config = {
        icon: Users, color: "text-amber-700", bg: "bg-amber-50 border-amber-200", iconBg: "bg-amber-100 text-amber-600",
        title: "รับโอนงานแบบมีผู้แนะนำ (Referral)",
        desc: `ลีดนี้ถูกแนะนำมาจาก ${transferData.partnerBU} (${transferData.partnerName})`,
        policy: "หากปิดดีลได้ ระบบจะคำนวณส่วนแบ่งค่าคอมมิชชันให้ผู้แนะนำตามนโยบาย"
      };
      break;
    default:
      return null;
  }

  const Icon = config.icon;

  return (
    <div className={`p-4 rounded-xl border ${config.bg} flex items-start gap-3.5 shadow-sm mb-4 transition-all`}>
      <div className={`p-2 rounded-lg ${config.iconBg} flex-shrink-0 mt-0.5`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h4 className={`text-sm font-bold ${config.color} mb-1 leading-tight`}>{config.title}</h4>
        <p className="text-xs text-slate-700 leading-relaxed mb-2 font-medium">
          {config.desc}
        </p>
        <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-white/60 rounded-md border border-black/5">
          <Info className={`h-3 w-3 ${config.color} opacity-70`} />
          <span className={`text-[10px] font-bold ${config.color} opacity-90`}>{config.policy}</span>
        </div>
      </div>
    </div>
  );
}

// ─── 1. Transfer Modal Component ─────────────────────────────────────────────
export function TransferCustomerModal({
  isOpen,
  onClose,
  customerName,
  customerId,
  currentOwner,
  currentBU
}) {
  const [transferType, setTransferType] = useState("change-owner");
  const [transferScope, setTransferScope] = useState("all");
  const [selectedServices, setSelectedServices] = useState([]);
  const [newOwner, setNewOwner] = useState("");
  const [reason, setReason] = useState("");
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const serviceDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setSearchQuery(newOwner);
      }
      if (serviceDropdownRef.current && !serviceDropdownRef.current.contains(event.target)) {
        setIsServiceDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [newOwner]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    console.log({ transferType, transferScope, selectedServices, newOwner, reason });
    toast.success("ทำรายการโอนย้ายสำเร็จ");
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

  const filteredOwners = owners.filter(owner => owner.toLowerCase().includes(searchQuery.toLowerCase()));
  const isShare = transferType === 'share-bu';
  const actionKeyword = isShare ? 'แชร์' : 'โอนย้าย';

  const handleSelectOwner = (owner) => {
    setNewOwner(owner);
    setSearchQuery(owner);
    setIsDropdownOpen(false);
  };

  const getPolicy = () => {
    switch (transferType) {
      case 'share-bu': return { bill: 'แยกออกบิลตามหน่วยธุรกิจที่รับงาน', com: 'แบ่งสัดส่วนตามข้อตกลง', colorBill: 'text-emerald-600', colorCom: 'text-emerald-600' };
      case 'change-owner': return { bill: 'ออกบิลโดยเจ้าของใหม่ 100%', com: 'ไม่ได้รับค่าคอมมิชชัน (สิทธิ์ขาด)', colorBill: 'text-amber-600', colorCom: 'text-amber-600' };
      case 'transfer-bu': return { bill: 'ออกบิลโดย BU ปลายทาง 100%', com: 'ได้รับค่าคอมมิชชันฐานะผู้แนะนำ', colorBill: 'text-purple-600', colorCom: 'text-purple-600' };
      default: return { bill: '', com: '', colorBill: '', colorCom: '' };
    }
  };
  const policy = getPolicy();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 font-sans antialiased">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-all duration-300" onClick={onClose} />
      <div className="relative bg-white rounded-[20px] shadow-2xl w-full max-w-[760px] max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300 ring-1 ring-slate-900/5">
        <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center border border-indigo-100">
              <ArrowRightLeft className="h-4 w-4 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 tracking-tight leading-tight">จัดการโอนย้ายลูกค้า</h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">กำหนดสิทธิ์และผู้รับผิดชอบใหม่สำหรับลูกค้ารายนี้</p>
            </div>
          </div>
          <button onClick={onClose} className="h-8 w-8 flex items-center justify-center hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-full">
            <div className="md:col-span-7 p-6 space-y-6 bg-white flex flex-col justify-start">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">1. รูปแบบการโอนย้าย</label>
                <div className="flex p-1 bg-slate-100/80 rounded-xl overflow-x-auto custom-scrollbar">
                  {transferOptions.map((option) => {
                    const Icon = option.icon;
                    const isActive = transferType === option.id;
                    return (
                      <button key={option.id} onClick={() => setTransferType(option.id)} className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 min-w-fit rounded-lg text-[13px] font-semibold transition-all duration-200 whitespace-nowrap ${isActive ? "bg-white text-indigo-600 shadow-sm ring-1 ring-slate-900/5" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"}`}>
                        <Icon className={`h-4 w-4 ${isActive ? "text-indigo-600" : "text-slate-400"}`} />
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">2. ขอบเขตการ{actionKeyword}</label>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => { setTransferScope('all'); setSelectedServices([]); }} className={`flex flex-col items-start p-2.5 rounded-xl border-2 transition-all duration-200 ${transferScope === 'all' ? "border-indigo-600 bg-indigo-50/50" : "border-slate-100 bg-white hover:border-slate-200"}`}>
                    <span className={`text-[12px] font-bold ${transferScope === 'all' ? 'text-indigo-700' : 'text-slate-700'}`}>{actionKeyword}ทั้งหมด</span>
                    <span className="text-[10px] text-slate-500 font-medium mt-0.5 line-clamp-1">ลูกค้าและประวัติทั้งหมด</span>
                  </button>
                  <button onClick={() => setTransferScope('partial')} className={`flex flex-col items-start p-2.5 rounded-xl border-2 transition-all duration-200 ${transferScope === 'partial' ? "border-indigo-600 bg-indigo-50/50" : "border-slate-100 bg-white hover:border-slate-200"}`}>
                    <span className={`text-[12px] font-bold ${transferScope === 'partial' ? 'text-indigo-700' : 'text-slate-700'}`}>{actionKeyword}บางบริการ</span>
                    <span className="text-[10px] text-slate-500 font-medium mt-0.5 line-clamp-1">เลือกเฉพาะ Service</span>
                  </button>
                </div>
              </div>

              {transferScope === 'partial' && (
                <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><Layers className="h-3.5 w-3.5" />เลือกบริการที่ต้องการ{actionKeyword}</label>
                  <div className="relative group" ref={serviceDropdownRef}>
                    <div onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)} className={`w-full min-h-[42px] pl-3 pr-8 py-1.5 bg-slate-50 border rounded-xl flex items-center flex-wrap gap-1.5 cursor-pointer transition-all ${isServiceDropdownOpen ? 'bg-white ring-2 ring-indigo-500/20 border-indigo-500' : 'border-slate-200 hover:border-slate-300'}`}>
                      {selectedServices.length === 0 ? <span className="text-[13px] text-slate-400 font-medium py-1">เลือกบริการ...</span> : (
                        selectedServices.map(id => {
                          const srv = availableServices.find(s => s.id === id);
                          return (
                            <span key={id} className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-slate-200 rounded-md text-[11px] font-semibold text-slate-700 shadow-sm animate-in zoom-in duration-200">
                              {srv?.name}
                              <button onClick={(e) => { e.stopPropagation(); setSelectedServices(prev => prev.filter(sId => sId !== id)); }} className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-0.5 rounded transition-colors"><X className="h-3 w-3" /></button>
                            </span>
                          );
                        })
                      )}
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isServiceDropdownOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                    {isServiceDropdownOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-40 overflow-y-auto custom-scrollbar py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                        {availableServices.map((service) => {
                          const isSelected = selectedServices.includes(service.id);
                          return (
                            <button key={service.id} type="button" onClick={() => { if (isSelected) { setSelectedServices(prev => prev.filter(id => id !== service.id)); } else { setSelectedServices(prev => [...prev, service.id]); } }} className={`w-full flex items-center justify-between px-3 py-2 transition-colors ${isSelected ? 'bg-indigo-50/50' : 'hover:bg-slate-50'}`}>
                              <div className="flex items-center gap-2.5">
                                <div className={`flex items-center justify-center h-4 w-4 rounded border transition-colors ${isSelected ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-300'}`}>{isSelected && <Check className="h-3 w-3 text-white" />}</div>
                                <span className={`text-[12px] ${isSelected ? 'font-bold text-indigo-700' : 'font-medium text-slate-700'}`}>{service.name}</span>
                              </div>
                              <span className="text-[9px] font-bold text-slate-400 bg-white border border-slate-200 shadow-sm px-1.5 py-0.5 rounded">{service.type}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{transferScope === 'partial' ? '3.' : '2.'} {isShare ? 'ข้อมูลผู้รับสิทธิ์ร่วม' : 'ข้อมูลผู้รับผิดชอบใหม่'}</label>
                  <div className="relative group" ref={dropdownRef}>
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"><UserCircle2 className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" /></div>
                    <input type="text" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setIsDropdownOpen(true); }} onFocus={() => setIsDropdownOpen(true)} placeholder="ค้นหาหรือเลือกผู้รับผิดชอบ..." className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[13px] text-slate-700 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium" />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}><ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} /></div>
                    {isDropdownOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-40 overflow-y-auto custom-scrollbar py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                        {filteredOwners.length > 0 ? (
                          filteredOwners.map((owner) => (
                            <button key={owner} type="button" onClick={() => handleSelectOwner(owner)} className={`w-full flex items-center justify-between px-3 py-1.5 text-[12px] transition-colors ${newOwner === owner ? 'bg-indigo-50/50 text-indigo-700 font-bold' : 'text-slate-700 font-medium hover:bg-slate-50'}`}>
                              {owner}
                              {newOwner === owner && <Check className="h-4 w-4 text-indigo-600" />}
                            </button>
                          ))
                        ) : (
                          <div className="px-3 py-3 text-center text-[12px] text-slate-500 font-medium">ไม่พบรายชื่อที่ค้นหา "{searchQuery}"</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex justify-between">
                    <span>{transferScope === 'partial' ? '4.' : '3.'} เหตุผลในการ{actionKeyword}</span>
                    <span className="text-slate-300 font-medium normal-case">* จำเป็น</span>
                  </label>
                  <textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="ระบุเหตุผลเพื่อเป็นข้อมูลอ้างอิงในระบบ..." className="w-full h-[60px] p-3 bg-slate-50 border border-slate-200 rounded-xl text-[13px] text-slate-700 placeholder-slate-400 resize-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all leading-relaxed" />
                </div>
              </div>
            </div>

            <div className="md:col-span-5 bg-slate-50/50 border-l border-slate-100 p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                  <div>
                    <span className="inline-flex items-center px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded-md font-bold tracking-wide mb-1">{customerId}</span>
                    <h3 className="text-[14px] font-bold text-slate-800 leading-tight">{customerName}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">เจ้าของ</p>
                      <div className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-700 line-clamp-1">
                        <div className="h-4 w-4 rounded-full bg-slate-200 flex items-center justify-center text-[9px] flex-shrink-0">{currentOwner.charAt(0)}</div>
                        {currentOwner}
                      </div>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">หน่วยธุรกิจ</p>
                      <div className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-700 truncate"><Briefcase className="h-3 w-3 text-slate-400 flex-shrink-0" /><span className="truncate">{currentBU}</span></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><ShieldAlert className="h-3.5 w-3.5 text-slate-400" />ผลกระทบการ{actionKeyword}</h4>
                  {isShare ? (
                    <div className="flex items-center gap-2 p-1 bg-slate-200/50 rounded-lg">
                      <div className="flex-1 bg-white py-1 px-2 rounded-md border border-slate-200 text-center shadow-sm">
                        <span className="text-[10px] font-bold text-slate-500 block mb-0.5">เจ้าของหลัก</span>
                        <span className="text-[11px] font-bold text-slate-800 truncate block">{currentBU}</span>
                      </div>
                      <div className="flex items-center justify-center h-5 w-5 rounded-full bg-slate-300 text-slate-600 flex-shrink-0"><Plus className="h-3.5 w-3.5" /></div>
                      <div className="flex-1 bg-emerald-600 py-1 px-2 rounded-md border border-emerald-500 text-center shadow-sm">
                        <span className="text-[10px] font-medium text-emerald-100 block mb-0.5">ผู้ร่วมดูแล</span>
                        <span className="text-[11px] font-bold text-white truncate block">{newOwner || "เลือก BU"}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 p-1 bg-slate-200/50 rounded-lg">
                      <div className="flex-1 bg-white py-1 px-2 rounded-md border border-slate-200 text-center shadow-sm">
                        <span className="text-[10px] font-bold text-slate-500 block mb-0.5">จาก</span>
                        <span className="text-[11px] font-bold text-slate-800 truncate block">{currentBU}</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-400 flex-shrink-0" />
                      <div className="flex-1 bg-indigo-600 py-1 px-2 rounded-md border border-indigo-500 text-center shadow-sm">
                        <span className="text-[10px] font-medium text-indigo-200 block mb-0.5">ไปยัง</span>
                        <span className="text-[11px] font-bold text-white truncate block">{newOwner || "เลือก BU"}</span>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="p-2.5 rounded-xl border border-slate-100 bg-white shadow-sm">
                      <div className="flex items-center gap-1.5 mb-1"><Receipt className={`h-3 w-3 ${policy.colorBill}`} /><span className={`text-[10px] font-bold uppercase tracking-wider ${policy.colorBill}`}>นโยบายการออกบิล</span></div>
                      <p className="text-[11px] font-semibold text-slate-700 leading-tight">{policy.bill || '-'}</p>
                    </div>
                    <div className="p-2.5 rounded-xl border border-slate-100 bg-white shadow-sm">
                      <div className="flex items-center gap-1.5 mb-1"><Percent className={`h-3 w-3 ${policy.colorCom}`} /><span className={`text-[10px] font-bold uppercase tracking-wider ${policy.colorCom}`}>ค่าคอมมิชชัน</span></div>
                      <p className="text-[11px] font-semibold text-slate-700 leading-tight">{policy.com || '-'}</p>
                    </div>
                  </div>
                </div>

                <div className={`mt-2 flex items-start gap-2.5 p-3 rounded-xl border transition-colors ${transferType === 'change-owner' ? 'bg-amber-50/80 border-amber-200/60' : 'bg-indigo-50/80 border-indigo-200/60'}`}>
                  <AlertTriangle className={`h-4 w-4 flex-shrink-0 mt-0.5 ${transferType === 'change-owner' ? 'text-amber-500' : 'text-indigo-500'}`} />
                  <p className={`text-[11px] leading-relaxed font-medium ${transferType === 'change-owner' ? 'text-amber-800' : 'text-indigo-800'}`}>
                    {transferType === 'change-owner' ? 'ระวัง: สิทธิ์การเข้าถึงลูกค้านี้จะถูกโอนไปยังเจ้าของใหม่ทันที และคุณจะไม่ได้รับค่าคอมมิชชัน' : 'ข้อมูลจะถูกส่งไปยังระบบและผู้รับผิดชอบใหม่เพื่อรับทราบเงื่อนไขและผลตอบแทนร่วมกัน'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 bg-white flex items-center justify-between rounded-b-[20px]">
          <button onClick={onClose} className="px-5 py-2 text-[13px] text-slate-500 font-bold hover:text-slate-800 transition-colors">ยกเลิกการ{actionKeyword}</button>
          <button onClick={handleConfirm} disabled={!newOwner || !reason || (transferScope === 'partial' && selectedServices.length === 0)} className={`flex items-center gap-1.5 px-6 py-2 text-white text-[13px] font-bold rounded-xl shadow-md transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none disabled:cursor-not-allowed ${isShare ? 'bg-emerald-600 shadow-emerald-200 hover:bg-emerald-700' : 'bg-indigo-600 shadow-indigo-200 hover:bg-indigo-700'}`}>
            ยืนยันการทำรายการ <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ─────────────────────────────────────────────────

function DuplicateWarningCard({ duplicates }) {
  const [expanded, setExpanded] = useState(false);
  
  if (!duplicates || duplicates.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-amber-200 overflow-hidden">
      <button 
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 sm:p-5 bg-gradient-to-r from-amber-50/50 to-white hover:bg-amber-50/80 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-amber-900 flex items-center gap-2">
              ลูกค้าที่คล้ายกันใน BU อื่น
              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px]">
                {duplicates.length}
              </span>
            </h3>
            <p className="text-xs text-amber-700/70 font-medium mt-0.5">
              พบ {duplicates.length} รายการที่อาจซ้ำซ้อนใน Business Unit อื่น
            </p>
          </div>
        </div>
        <div className="text-amber-600">
          {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </button>

      <div className={`transition-all duration-300 ease-in-out ${expanded ? "max-h-[500px] border-t border-amber-100 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="p-2 space-y-1 overflow-y-auto custom-scrollbar bg-amber-50/30" style={{ maxHeight: "400px" }}>
          {duplicates.map((dup) => (
            <div key={dup.id} className="p-3 hover:bg-amber-50 rounded-xl transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-bold text-gray-900">{dup.companyName}</p>
                  <span className="text-[10px] font-semibold text-gray-500">{dup.id}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                  <span className="flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5 text-gray-400"/> {dup.businessUnit}</span>
                  <span className="text-gray-300">•</span>
                  <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5 text-gray-400"/> {dup.owner}</span>
                </div>
              </div>
              
              <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1 text-right">
                <Badge className={`${getStatusColor(dup.status)} bg-opacity-30 border-0 px-2 py-0.5`}>
                  {dup.status}
                </Badge>
                <span className="text-[10px] text-gray-400">{dup.createdDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ActivityTimeline({ activities }) {
  const PREVIEW_COUNT = 3;
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? activities : activities.slice(0, PREVIEW_COUNT);

  function getActivityIcon(type) {
    switch (type) {
      case "call": return <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center text-green-600"><Phone className="h-4 w-4" /></div>;
      case "email": return <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><Mail className="h-4 w-4" /></div>;
      case "meeting": return <div className="h-9 w-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-600"><Users className="h-4 w-4" /></div>;
      default: return <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600"><MessageSquare className="h-4 w-4" /></div>;
    }
  }

  return (
    <div className={cardClass}>
      <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100">
        <MessageSquare className="h-5 w-5 text-gray-600" />
        <h3 className="text-base font-bold text-gray-900">ประวัติกิจกรรม</h3>
      </div>

      <div className="space-y-6 pt-2">
        {visible.map((activity, index) => (
          <div key={activity.id} className="relative flex gap-4 items-start">
            <div className={`relative z-10 flex-shrink-0`}>
              {getActivityIcon(activity.type)}
            </div>
            {index !== visible.length - 1 && (
              <div className="absolute top-10 left-4.5 bottom-[-24px] w-0.5 bg-gray-100" />
            )}
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="text-sm font-bold text-gray-900 leading-snug">{activity.title}</h4>
                <span className="text-xs font-medium text-gray-400 flex-shrink-0">{activity.date}</span>
              </div>
              <p className="text-[13px] text-gray-600 leading-snug">{activity.description}</p>
              <div className="flex items-center gap-1.5 mt-2">
                <User className="h-3 w-3 text-gray-400" />
                <span className="text-xs font-medium text-gray-500">{activity.by}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {activities.length > PREVIEW_COUNT && (
        <button onClick={() => setShowAll(!showAll)} className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors mt-2 w-full justify-center py-1">
          {showAll ? <><ChevronUp className="h-3 w-3" /> ย่อลง</> : <><ChevronRight className="h-3 w-3" /> ดูกิจกรรมเพิ่มเติมอีก {activities.length - PREVIEW_COUNT} รายการ</>}
        </button>
      )}
    </div>
  );
}

function NotesCard({ initialNotes }) {
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [displayNotes, setDisplayNotes] = useState(initialNotes);
  const [editNotes, setEditNotes] = useState(initialNotes);

  const handleSave = () => { setDisplayNotes(editNotes); setIsEditing(false); toast.success("อัปเดตบันทึกเพิ่มเติมสำเร็จ"); };
  const handleCancel = () => { setEditNotes(displayNotes); setIsEditing(false); };

  return (
    <div className={cardClass}>
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <MessageSquare className="h-5 w-5 text-gray-600" />
          <h3 className="text-base font-bold text-gray-900">บันทึกเพิ่มเติม</h3>
        </div>
        {isEditing ? (
          <div className="flex items-center gap-2">
            <button onClick={handleCancel} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><X className="h-4 w-4" /></button>
            <button onClick={handleSave} className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"><Check className="h-4 w-4" /></button>
          </div>
        ) : (
          <button onClick={() => setIsEditing(true)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <Edit2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className="pt-2">
        {isEditing ? (
          <Textarea value={editNotes} onChange={(e) => setEditNotes(e.target.value)} className="text-[13px] min-h-[100px] border-gray-300" />
        ) : (
          <p className={`text-[13px] leading-relaxed text-gray-600 font-medium ${expanded ? "" : "line-clamp-3"}`}>
            {displayNotes}
          </p>
        )}
        {!isEditing && displayNotes.length > 100 && (
          <button onClick={() => setExpanded(!expanded)} className="text-xs font-bold text-blue-600 hover:text-blue-700 mt-3">
            {expanded ? "ย่อลง" : "ดูเพิ่มเติม"}
          </button>
        )}
      </div>
    </div>
  );
}

function CustomerDetailScreenV2({
  onBack = () => console.log('back'),
  leadId
}) {
  console.log('[LeadDetailScreenV2] Rendering with leadId:', leadId);

  const [currentStatus, setCurrentStatus] = useState("New");
  const [ownershipVariation, setOwnershipVariation] = useState("received");

  const [isConvertDialogOpen, setIsConvertDialogOpen] = useState(false);
  const [isCreateDealDialogOpen, setIsCreateDealDialogOpen] = useState(false);
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  const fullCustomerData = {
    id: "LEAD-046",
    companyName: "Global Traders Ltd.",
    contactName: "สมชาย วงศ์สกุล",
    contactEmail: "somchai@globaltraders.com",
    contactPhone: "081-234-5678",
    email: "somchai@globaltraders.com",
    phone: "081-234-5678",
    status: currentStatus,
    source: "Trade Show",
    assignedTo: "Sarah Chen",
    businessUnit: "HCP",
    services: {
      freight: true,
      customer: false,
      warehouse: false,
      transport: false,
      crossborder: true,
      trading: false,
      service: false,
      other: false,
      unknown: false
    },
    estimatedValue: 2500000,
    expectedCloseDate: "30 มิ.ย. 2568",
    address: "123 ถนนพระรามที่ 4 แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110",
    province: "กรุงเทพมหานคร",
    district: "คลองเตย",
    postalCode: "10110",
    industry: "Manufacturing",
    supplyChainRole: "Importer",
    businessGroup: "Logistics",
    taxId: "",
    website: "",
    notes: "ลูกค้ารายนี้มาจากงาน Trade Show นัดหมายปรึกษาเบื้องต้นแล้ว ลูกค้าสนใจโซลูชั่นการขนส่งและโลจิสติกส์ข้ามพรมแดนเป็นพิเศษ",
    deals: [{ id: "DL-2024-016", name: "Potential Cross-border E-commerce Deal", stage: "Approach", progress: 25 }],
    activities: [
      { id: 1, type: "call", title: "โทรติดตามความคืบหน้า", description: "โทรติดตาม - ลูกค้าสนใจบริการ Cross-border", by: "Sarah Chen", date: "15 มี.ค. 2026" },
      { id: 2, type: "email", title: "ส่งอีเมลใบเสนอราคา", description: "ส่งข้อมูลบริการเบื้องต้น", by: "Sarah Chen", date: "10 มี.ค. 2026" },
      { id: 3, type: "meeting", title: "พบกันที่งาน Trade Show", description: "พบที่งาน Trade Show - ได้ชื่อบัตร", by: "Sarah Chen", date: "5 มี.ค. 2026" },
    ],
    duplicates: [
      { id: "LEAD-045", companyName: "Global Traders Ltd.", businessUnit: "FREIGHT-BUSINESS", status: "Contacted", owner: "Michael Wong", createdDate: "28 ก.พ. 2026" },
      { id: "LEAD-046", companyName: "Global Traders Ltd.", businessUnit: "COMMERCIAL-BUSINESS", status: "New", owner: "Michael Wong", createdDate: "28 ก.พ. 2026" },
    ],
    transferData: {
      type: "s3-received",
      partnerBU: "Commercial BU",
      partnerName: "Alex Morgan",
      date: "15 มี.ค. 2026"
    }
  };

  // ─── Dialog Handlers ───
  const handleConvertLead = (data) => {
    console.log('Converting lead to customer:', data);
    toast.success(`แปลง ${fullCustomerData.id} เป็นลูกค้าหลักสำเร็จ!`);
  };

  const handleCreateDeal = (data) => {
    console.log('Creating deal:', data);
    toast.success(`สร้างดีลสำเร็จ!`);
  };

  const handleTransferLead = () => {
    console.log('Transferring lead');
    toast.success('โอนย้ายสิทธิ์สำเร็จ!');
  };

  const handleStatusUpdate = (newStatus, notes, winLossReason, winLossDetails) => {
    console.log('Updating status:', { newStatus, notes, winLossReason, winLossDetails });
    setCurrentStatus(newStatus);
    toast.success(`อัปเดตสถานะเป็น ${newStatus} สำเร็จ!`);
  };

  // ─── Inline Editing States ───

  const [isEditingContact, setIsEditingContact] = useState(false);
  const [displayContact, setDisplayContact] = useState({
    name: fullCustomerData.contactName,
    company: fullCustomerData.companyName,
    phone: fullCustomerData.phone,
    email: fullCustomerData.email,
    address: fullCustomerData.address,
  });
  const [editContact, setEditContact] = useState(displayContact);

  const handleSaveContact = () => { setDisplayContact(editContact); setIsEditingContact(false); toast.success("อัปเดตข้อมูลผู้ติดต่อสำเร็จ"); };
  const handleCancelContact = () => { setEditContact(displayContact); setIsEditingContact(false); };

  const [isEditingBusiness, setIsEditingBusiness] = useState(false);
  const [displayBusiness, setDisplayBusiness] = useState({
    industry: fullCustomerData.industry,
    supplyChainRole: fullCustomerData.supplyChainRole,
    estimatedValue: fullCustomerData.estimatedValue.toString(),
    expectedCloseDate: fullCustomerData.expectedCloseDate,
  });
  const [editBusiness, setEditBusiness] = useState(displayBusiness);

  const handleSaveBusiness = () => { setDisplayBusiness(editBusiness); setIsEditingBusiness(false); toast.success("อัปเดตข้อมูลธุรกิจสำเร็จ"); };
  const handleCancelBusiness = () => { setEditBusiness(displayBusiness); setIsEditingBusiness(false); };

  const leadStatuses = ["New", "Contacted", "Qualified", "Unqualified", "Lost"];

  console.log('[LeadDetailScreenV2] About to return JSX');

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 font-sans text-slate-800">
      {/* ── Header ── */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="px-6 py-4 max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <button onClick={onBack} className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-500 flex-shrink-0 transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-bold text-gray-900 truncate tracking-tight">
                {displayContact.company} <span className="text-gray-400 font-medium text-base ml-1">({fullCustomerData.id})</span>
              </h1>
              <Badge className={`${getStatusColor(fullCustomerData.status)} border font-bold text-xs flex-shrink-0 px-2.5 py-1`}>
                {fullCustomerData.status}
              </Badge>
            </div>

            <div className="flex items-center gap-2.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-hide">
              <Button variant="outline" className="h-9 rounded-full px-5 text-[13px] font-bold text-gray-700 shadow-sm" onClick={() => setIsTransferDialogOpen(true)}>
                โอนย้ายสิทธิ์
              </Button>
              <Button variant="outline" className="h-9 rounded-full px-5 text-[13px] font-bold text-gray-700 shadow-sm flex items-center" onClick={() => setIsStatusDialogOpen(true)}>
                สถานะ <ChevronDown className="h-3.5 w-3.5 ml-1 text-gray-400" />
              </Button>
              <Button variant="success" className="h-9 rounded-full px-5 text-[13px] font-bold shadow-sm flex items-center gap-2" onClick={() => setIsConvertDialogOpen(true)}>
                <UserCheck className="h-4 w-4" /> ตั้งเป็นลูกค้าหลัก
              </Button>
              <Button className="h-9 rounded-full px-5 text-[13px] font-bold shadow-sm flex items-center gap-2 bg-blue-600 hover:bg-blue-700" onClick={() => setIsCreateDealDialogOpen(true)}>
                <Briefcase className="h-4 w-4" /> สร้างดีล
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="p-6 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* ── Left Column (col-span-7) ── */}
          <div className="lg:col-span-7 flex flex-col gap-6">

  

            {/* Contact Info */}
            <div className={cardClass}>
              <div className="flex items-center justify-between pb-3">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <h3 className="text-base font-bold text-gray-900">ข้อมูลผู้ติดต่อ</h3>
                </div>
                {isEditingContact ? (
                  <div className="flex items-center gap-2">
                    <button onClick={handleCancelContact} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"><X className="h-4 w-4" /></button>
                    <button onClick={handleSaveContact} className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-colors"><Check className="h-4 w-4" /></button>
                  </div>
                ) : (
                  <button onClick={() => setIsEditingContact(true)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                    <Edit2 className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="space-y-5 pt-1">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[11px] font-bold text-gray-500 uppercase mb-1.5">บริษัท</p>
                    {isEditingContact ? <Input className="h-9" value={editContact.company} onChange={e => setEditContact({...editContact, company: e.target.value})} /> : <p className="text-[15px] font-bold text-gray-900">{displayContact.company}</p>}
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-500 uppercase mb-1.5">ชื่อ-นามสกุล</p>
                    {isEditingContact ? <Input className="h-9" value={editContact.name} onChange={e => setEditContact({...editContact, name: e.target.value})} /> : <p className="text-[15px] font-bold text-gray-900">{displayContact.name}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[11px] font-bold text-gray-500 uppercase mb-1.5">เบอร์โทรศัพท์</p>
                    {isEditingContact ? (
                      <Input className="h-9" value={editContact.phone} onChange={e => setEditContact({...editContact, phone: e.target.value})} />
                    ) : (
                      <a href={`tel:${displayContact.phone}`} className="text-[15px] font-bold text-blue-600 hover:underline flex items-center gap-2">
                        <Phone className="h-4 w-4 text-blue-500" /> {displayContact.phone}
                      </a>
                    )}
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-500 uppercase mb-1.5">อีเมล</p>
                    {isEditingContact ? (
                      <Input className="h-9" value={editContact.email} onChange={e => setEditContact({...editContact, email: e.target.value})} />
                    ) : (
                      <a href={`mailto:${displayContact.email}`} className="text-[15px] font-bold text-blue-600 hover:underline flex items-center gap-2 break-all">
                        <Mail className="h-4 w-4 text-blue-500" /> {displayContact.email}
                      </a>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-500 uppercase mb-1.5">ที่อยู่</p>
                  {isEditingContact ? (
                    <Textarea className="min-h-[80px] resize-none" value={editContact.address} onChange={e => setEditContact({...editContact, address: e.target.value})} />
                  ) : (
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <p className="text-[14px] font-medium text-gray-700 leading-relaxed">{displayContact.address}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Business Info */}
            <div className={cardClass}>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-gray-500" />
                  <h3 className="text-base font-bold text-gray-900">ข้อมูลธุรกิจ</h3>
                </div>
                {isEditingBusiness ? (
                  <div className="flex items-center gap-2">
                    <button onClick={handleCancelBusiness} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"><X className="h-4 w-4" /></button>
                    <button onClick={handleSaveBusiness} className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-colors"><Check className="h-4 w-4" /></button>
                  </div>
                ) : (
                  <button onClick={() => setIsEditingBusiness(true)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                    <Edit2 className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="space-y-5 pt-1">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[11px] font-bold text-gray-500 uppercase mb-1.5">อุตสาหกรรม (Industry)</p>
                    {isEditingBusiness ? <Input className="h-9" value={editBusiness.industry} onChange={e => setEditBusiness({...editBusiness, industry: e.target.value})} /> : <p className="text-[15px] font-bold text-gray-900">{displayBusiness.industry}</p>}
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-500 uppercase mb-1.5">หน่วยธุรกิจ (Business Unit)</p>
                    <Badge className="text-xs font-bold border-gray-200 bg-white text-gray-700 px-3 py-1 shadow-sm border">{fullCustomerData.businessUnit}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[11px] font-bold text-gray-500 uppercase mb-1.5">ห่วงโซ่อุปทาน (Supply Chain)</p>
                    {isEditingBusiness ? <Input className="h-9" value={editBusiness.supplyChainRole} onChange={e => setEditBusiness({...editBusiness, supplyChainRole: e.target.value})} /> : <p className="text-[15px] font-bold text-gray-900">{displayBusiness.supplyChainRole}</p>}
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-500 uppercase mb-1.5">แหล่งที่มา (Source)</p>
                    <Badge className="text-xs font-semibold border-gray-200 bg-white text-gray-700 px-3 py-1 shadow-sm border">{fullCustomerData.source}</Badge>
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-bold text-gray-500 uppercase mb-2">บริการที่สนใจ</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(fullCustomerData.services)
                      .filter(([key, value]) => value)
                      .map(([key]) => {
                        const serviceNames = {
                          freight: 'Freight',
                          customer: 'Customer',
                          warehouse: 'Warehouse',
                          transport: 'Transport',
                          crossborder: 'Cross-border',
                          trading: 'Trading',
                          service: 'Service',
                          other: 'Other',
                          unknown: 'Unknown'
                        };
                        return (
                          <Badge key={key} className="text-[11px] bg-[#86efac] text-[#064e3b] border border-[#6ee7b7] px-3 py-1 font-bold shadow-sm">
                            {serviceNames[key] || key}
                          </Badge>
                        );
                      })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-50">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      <p className="text-[11px] font-bold text-gray-500 uppercase">มูลค่าคาดการณ์</p>
                    </div>
                    {isEditingBusiness ? (
                      <Input className="h-9" type="number" value={editBusiness.estimatedValue} onChange={e => setEditBusiness({...editBusiness, estimatedValue: e.target.value})} />
                    ) : (
                      <p className="text-lg font-black text-gray-900">
                        {Number(displayBusiness.estimatedValue).toLocaleString()} <span className="text-sm font-semibold text-gray-600">บาท</span>
                      </p>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <p className="text-[11px] font-bold text-gray-500 uppercase">วันที่คาดว่าจะปิดดีล</p>
                    </div>
                    {isEditingBusiness ? (
                      <Input className="h-9" value={editBusiness.expectedCloseDate} onChange={e => setEditBusiness({...editBusiness, expectedCloseDate: e.target.value})} />
                    ) : (
                      <p className="text-[15px] font-bold text-gray-900">{displayBusiness.expectedCloseDate}</p>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-[11px] font-bold text-gray-500 uppercase mb-2">ผู้ดูแลลูกค้า</p>
                  <div className="flex items-center gap-2.5">
                    <Avatar className="h-8 w-8 bg-[#86efac] text-[#064e3b]">
                      <AvatarFallback className="text-[11px]">SC</AvatarFallback>
                    </Avatar>
                    <span className="text-[15px] font-bold text-gray-900">{fullCustomerData.assignedTo}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Deals */}
            <div className={cardClass}>
              <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
                <Briefcase className="h-5 w-5 text-gray-600" />
                <h3 className="text-base font-bold text-gray-900">ดีลที่เกี่ยวข้อง</h3>
              </div>

              <div className="pt-2 space-y-4">
                {fullCustomerData.deals.map((deal) => (
                  <div key={deal.id} className="space-y-3 p-4 rounded-xl bg-gray-50/80 border border-gray-100 hover:border-gray-200 transition-colors cursor-pointer group">
                    <div>
                      <p className="text-[15px] font-bold text-gray-900 leading-tight mb-1 group-hover:text-blue-600 transition-colors">{deal.name}</p>
                      <p className="text-xs text-gray-500 font-medium">{deal.id}</p>
                    </div>
                    <div className="pt-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-semibold text-gray-500">ความคืบหน้า</span>
                        <span className="text-[11px] font-bold text-gray-900">{deal.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full transition-all" style={{ width: `${deal.progress}%` }} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-500">สถานะ:</span>
                      <span className="text-xs font-bold text-gray-900">{deal.stage}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes Card */}
            <NotesCard initialNotes={fullCustomerData.notes} />

          </div>

          {/* ── Right Column (col-span-5) ── */}
          <div className="lg:col-span-5 flex flex-col min-h-0 gap-6 px-[0px] py-[5px]">

            {/* Toggle Ownership Variation for Preview */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide mb-4">
              <div className="flex bg-slate-100 p-1 rounded-lg gap-1 border border-slate-200/60 shadow-inner w-full sm:w-auto">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 flex items-center whitespace-nowrap">
                  Preview:
                </span>
                <button 
                  onClick={() => setOwnershipVariation("received")} 
                  className={`px-3 py-1.5 rounded-md text-[11px] font-bold whitespace-nowrap transition-all ${
                    ownershipVariation === "received" 
                      ? "bg-white text-blue-600 shadow-sm ring-1 ring-black/5" 
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                  }`}
                >
                  A (Received)
                </button>
                <button 
                  onClick={() => setOwnershipVariation("shared")} 
                  className={`px-3 py-1.5 rounded-md text-[11px] font-bold whitespace-nowrap transition-all ${
                    ownershipVariation === "shared" 
                      ? "bg-white text-emerald-600 shadow-sm ring-1 ring-black/5" 
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                  }`}
                >
                  B (Shared)
                </button>
                <button 
                  onClick={() => setOwnershipVariation("sent")} 
                  className={`px-3 py-1.5 rounded-md text-[11px] font-bold whitespace-nowrap transition-all ${
                    ownershipVariation === "sent" 
                      ? "bg-white text-slate-700 shadow-sm ring-1 ring-black/5" 
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                  }`}
                >
                  C (Sent)
                </button>
              </div>
            </div>

            {/* Dynamic Ownership Status Card (Bento Box style) */}
            {ownershipVariation === "received" && <OwnershipReceivedCard />}
            {ownershipVariation === "shared" && <OwnershipSharedCard />}
            {ownershipVariation === "sent" && <OwnershipSentCard />}


            
            <DuplicateWarningCard duplicates={fullCustomerData.duplicates} />
            <ActivityTimeline activities={fullCustomerData.activities} />

          </div>
        </div>
      </div>

      {/* ── Dialogs ── */}
       <RealConvertLeadDialog
        isOpen={isConvertDialogOpen}
        onClose={() => setIsConvertDialogOpen(false)}
        onConvert={handleConvertLead}
        leadData={fullCustomerData}
      />
      <RealCreateDealDialog
        isOpen={isCreateDealDialogOpen}
        onClose={() => setIsCreateDealDialogOpen(false)}
        onCreate={handleCreateDeal}
        leadData={fullCustomerData}
      />
      
      <TransferCustomerModal
        isOpen={isTransferDialogOpen}
        onClose={() => setIsTransferDialogOpen(false)}
        customerName={fullCustomerData.companyName}
        customerId={fullCustomerData.id}
        currentOwner={fullCustomerData.assignedTo}
        currentBU={fullCustomerData.businessUnit}
      />

   <QuickStatusUpdateDialog
        isOpen={isStatusDialogOpen}
        onClose={() => setIsStatusDialogOpen(false)}
        dealId={fullCustomerData.id}
        dealName={fullCustomerData.companyName}
        currentStatus={currentStatus}
        onSave={handleStatusUpdate}
      />
    
    </div>
  );
}

// Test to ensure component loads
console.log('[lead-detail-screen-v2] Module loaded, CustomerDetailScreenV2 defined:', typeof CustomerDetailScreenV2);

// Exports
export const LeadDetailScreenV2 = CustomerDetailScreenV2;
export default CustomerDetailScreenV2;