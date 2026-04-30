import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Combobox, ComboboxOption } from "../ui/combobox";
import { UserPlus, Building2, Mail, Phone, MapPin, Briefcase, Check, Tag } from "lucide-react";
import { toast } from "sonner";

interface QuickAddLeadModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSave?: (leadData: any) => void;
}

const LEAD_SOURCES = [
  "เว็บไซต์",
  "Facebook",
  "LinkedIn",
  "Email Marketing",
  "โทรศัพท์",
  "งานแสดงสินค้า",
  "แนะนำจากลูกค้า",
  "Google Ads",
  "Walk-in",
  "อื่นๆ",
];

const LEAD_STATUS = [
  "New",
  "Contacted",
  "Qualified",
  "Unqualified",
];

const QUICK_INDUSTRIES = [
  "Agriculture",
  "Automotive",
  "Electronics",
  "Food & FMCG",
  "Healthcare",
  "Manufacturing",
  "Retail",
  "Technology",
  "Logistics",
  "Other",
];

const INTEREST_SERVICES = [
  "Freight",
  "Customer",
  "Warehouse",
  "Transport",
  "Crossborder",
  "Trading",
  "Service",
  "Other",
  "Unknown",
];

export function QuickAddLeadModal({ isOpen, onClose, onSave }: QuickAddLeadModalProps) {
  const { t } = useTranslation();
  const companyNameRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    contactPosition: "",
    email: "",
    phone: "",
    industry: "",
    leadSource: "",
    leadStatus: "New",
    interestedService: "",
    estimatedValue: "",
    currency: "USD",
    address: "",
    remarks: "",
  });

  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Auto-focus on company name when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        companyNameRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleService = (service: string) => {
    setSelectedServices(prev => {
      if (prev.includes(service)) {
        return prev.filter(s => s !== service);
      }
      return [...prev, service];
    });
  };

  const handleSave = () => {
    // Validation - Required: ชื่อบริษัท, ชื่อ, เบอร์โทร, อีเมล
    if (!formData.companyName.trim()) {
      toast.error("กรุณาระบุชื่อบริษัท");
      companyNameRef.current?.focus();
      return;
    }

    if (!formData.contactPerson.trim()) {
      toast.error("กรุณาระบุชื่อผู้ติดต่อ");
      return;
    }

    if (!formData.phone.trim()) {
      toast.error("กรุณาระบุเบอร์โทรศัพท์");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("กรุณาระบุอีเมล");
      return;
    }

    // Email validation
    if (formData.email && !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error("รูปแบบอีเมลไม่ถูกต้อง");
      return;
    }

    // Prepare lead data
    const leadData = {
      ...formData,
      interestedServices: selectedServices,
      id: `LEAD-${Date.now()}`,
      createdAt: new Date().toISOString(),
      createdBy: "Current User",
      score: 0,
    };

    onSave?.(leadData);
    toast.success("สร้างลีดใหม่สำเร็จ");
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      companyName: "",
      contactPerson: "",
      contactPosition: "",
      email: "",
      phone: "",
      industry: "",
      leadSource: "",
      leadStatus: "New",
      interestedService: "",
      estimatedValue: "",
      currency: "USD",
      address: "",
      remarks: "",
    });
    setSelectedServices([]);
    onClose();
  };

  // Quick keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      // Cmd/Ctrl + Enter to save
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        handleSave();
      }

      // Escape to close
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, formData, selectedServices]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#7BC9A6]/10 flex items-center justify-center">
              <UserPlus className="h-5 w-5 text-[#7BC9A6]" />
            </div>
            <span>สร้างลีดใหม่</span>
          </DialogTitle>
          <p className="text-base text-gray-600 mt-2 ml-[52px]">
            เพิ่มข้อมูลลูกค้าเป้าหมายใหม่เพื่อติดตามและพัฒนาเป็นดีล
          </p>
        </DialogHeader>

        <div className="space-y-6 py-6">
          {/* Required Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px flex-1 bg-gray-200"></div>
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">ข้อมูลพื้นฐาน (บังคับ)</span>
              <div className="h-px flex-1 bg-gray-200"></div>
            </div>

            <div className="grid grid-cols-1 gap-5">
              {/* Company Name */}
              <div>
                <Label className="text-base font-medium text-gray-900 mb-2.5 flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-[#7BC9A6]" />
                  ชื่อบริษัท / องค์กร
                </Label>
                <Input
                  ref={companyNameRef}
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  placeholder="ระบุชื่อบริษัทหรือองค์กร"
                  className="h-12 text-base border-gray-300 focus:border-[#7BC9A6] focus:ring-[#7BC9A6] rounded-lg"
                />
              </div>

              {/* Contact Person & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label className="text-base font-medium text-gray-900 mb-2.5 flex items-center gap-2">
                    <UserPlus className="h-4 w-4 text-[#7BC9A6]" />
                    ชื่อผู้ติดต่อ
                    <span className="text-[#ef4444] text-lg">*</span>
                  </Label>
                  <Input
                    value={formData.contactPerson}
                    onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                    placeholder="ชื่อ-นามสกุล"
                    className="h-12 text-base border-gray-300 focus:border-[#7BC9A6] focus:ring-[#7BC9A6] rounded-lg"
                  />
                </div>

                <div>
                  <Label className="text-base font-medium text-gray-900 mb-2.5 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#7BC9A6]" />
                    เบอร์โทรศัพท์
                    <span className="text-[#ef4444] text-lg">*</span>
                  </Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="0XX-XXX-XXXX"
                    className="h-12 text-base border-gray-300 focus:border-[#7BC9A6] focus:ring-[#7BC9A6] rounded-lg"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <Label className="text-base font-medium text-gray-900 mb-2.5 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#7BC9A6]" />
                  อีเมล
                  <span className="text-[#ef4444] text-lg">*</span>
                </Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="email@company.com"
                  className="h-12 text-base border-gray-300 focus:border-[#7BC9A6] focus:ring-[#7BC9A6] rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Optional Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px flex-1 bg-gray-200"></div>
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">ข้อมูลเพิ่มเติม (ไม่บังคับ)</span>
              <div className="h-px flex-1 bg-gray-200"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Position */}
              <div>
                <Label className="text-base font-medium text-gray-700 mb-2.5 flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-gray-400" />
                  ตำแหน่ง
                </Label>
                <Input
                  value={formData.contactPosition}
                  onChange={(e) => handleInputChange("contactPosition", e.target.value)}
                  placeholder="เช่น ผู้จัดการฝ่ายจัดซื้อ"
                  className="h-12 text-base border-gray-300 focus:border-[#7BC9A6] focus:ring-[#7BC9A6] rounded-lg"
                />
              </div>

              {/* Industry */}
              <div>
                <Label className="text-base font-medium text-gray-700 mb-2.5">
                  อุตสาหกรรม
                </Label>
                <Combobox
                  options={QUICK_INDUSTRIES.map((industry) => ({ value: industry, label: industry }))}
                  value={formData.industry}
                  onValueChange={(val) => handleInputChange("industry", val)}
                  placeholder="เลือกอุตสาหกรรม"
                  searchPlaceholder="ค้นหาอุตสาหกรรม..."
                  className="h-12 text-base border-gray-300 focus:border-[#7BC9A6] focus:ring-[#7BC9A6] rounded-lg"
                />
              </div>

              {/* Lead Source */}
              <div>
                <Label className="text-base font-medium text-gray-700 mb-2.5 flex items-center gap-2">
                  <Tag className="h-4 w-4 text-gray-400" />
                  แหล่งที่มา
                </Label>
                <Combobox
                  options={LEAD_SOURCES.map((source) => ({ value: source, label: source }))}
                  value={formData.leadSource}
                  onValueChange={(val) => handleInputChange("leadSource", val)}
                  placeholder="เลือกแหล่งที่มา"
                  searchPlaceholder="ค้นหาแหล่งที่มา..."
                  className="h-12 text-base border-gray-300 focus:border-[#7BC9A6] focus:ring-[#7BC9A6] rounded-lg"
                />
              </div>

              {/* Lead Status */}
              <div>
                <Label className="text-base font-medium text-gray-700 mb-2.5">
                  สถานะลีด
                </Label>
                <Combobox
                  options={LEAD_STATUS.map((status) => ({ value: status, label: status }))}
                  value={formData.leadStatus}
                  onValueChange={(val) => handleInputChange("leadStatus", val)}
                  placeholder="เลือกสถานะลีด..."
                  searchPlaceholder="ค้นหาสถานะลีด..."
                  className="h-12 text-base border-gray-300 focus:border-[#7BC9A6] focus:ring-[#7BC9A6] rounded-lg"
                />
              </div>
            </div>

            {/* Interested Services */}
            <div>
              <Label className="text-base font-medium text-gray-700 mb-2.5">
                บริการที่สนใจ
              </Label>
              <div className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50/50">
                <div className="flex flex-wrap gap-2.5">
                  {INTEREST_SERVICES.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggleService(service)}
                      className={`px-4 py-2 rounded-lg text-base font-medium transition-all ${
                        selectedServices.includes(service)
                          ? "bg-[#7BC9A6] text-white shadow-sm"
                          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                      }`}
                    >
                      {selectedServices.includes(service) && (
                        <Check className="inline h-4 w-4 mr-1.5" />
                      )}
                      {service}
                    </button>
                  ))}
                </div>
              </div>
              {selectedServices.length > 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  เลือกแล้ว: {selectedServices.length} บริการ
                </p>
              )}
            </div>

            {/* Estimated Value */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label className="text-base font-medium text-gray-700 mb-2.5">
                  มูลค่าโอกาสโดยประมาณ
                </Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={formData.estimatedValue}
                    onChange={(e) => handleInputChange("estimatedValue", e.target.value)}
                    placeholder="0.00"
                    className="h-12 text-base border-gray-300 focus:border-[#7BC9A6] focus:ring-[#7BC9A6] rounded-lg flex-1"
                  />
                  <Combobox
                    options={[
                      { value: "USD", label: "USD" },
                      { value: "THB", label: "THB" },
                      { value: "EUR", label: "EUR" },
                    ]}
                    value={formData.currency}
                    onValueChange={(val) => handleInputChange("currency", val)}
                    placeholder="สกุล"
                    searchPlaceholder="ค้นหาสกุลเงิน..."
                    className="h-12 w-28 text-base border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <Label className="text-base font-medium text-gray-700 mb-2.5 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  ที่อยู่
                </Label>
                <Input
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="ที่อยู่บริษัท"
                  className="h-12 text-base border-gray-300 focus:border-[#7BC9A6] focus:ring-[#7BC9A6] rounded-lg"
                />
              </div>
            </div>

            {/* Remarks */}
            <div>
              <Label className="text-base font-medium text-gray-700 mb-2.5">
                หมายเหตุ
              </Label>
              <Textarea
                value={formData.remarks}
                onChange={(e) => handleInputChange("remarks", e.target.value)}
                placeholder="บันทึกข้อมูลเพิ่มเติมเกี่ยวกับลีด..."
                className="text-base border-gray-300 focus:border-[#7BC9A6] focus:ring-[#7BC9A6] rounded-lg resize-none"
                rows={4}
              />
            </div>
          </div>
        </div>

        <DialogFooter className="border-t pt-5 bg-gray-50/50">
          <div className="flex justify-between items-center w-full">
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <span className="hidden md:inline">💡 กด</span>
              <kbd className="px-2 py-1 bg-white rounded border border-gray-300 text-xs font-mono shadow-sm hidden md:inline-block">⌘</kbd>
              <span className="hidden md:inline">+</span>
              <kbd className="px-2 py-1 bg-white rounded border border-gray-300 text-xs font-mono shadow-sm hidden md:inline-block">Enter</kbd>
              <span className="hidden md:inline">เพื่อบันทึกเร็ว</span>
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleClose}
                className="h-11 px-6 text-base border-gray-300 hover:bg-gray-100 rounded-lg"
              >
                ยกเลิก
              </Button>
              <Button
                onClick={handleSave}
                className="h-11 px-6 text-base bg-[#7BC9A6] hover:bg-[#6BB896] text-white rounded-lg shadow-sm"
              >
                <Check className="h-4 w-4 mr-2" />
                สร้างลีด
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}