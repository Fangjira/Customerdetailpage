import { useState, useMemo } from "react";
import { X, FileText, Check, ChevronRight, Package, DollarSign, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { toast } from "sonner";

interface Service {
  id: number;
  serviceType: string;
  service: string;
  description: string;
  quantity: string;
  unit: string;
  unitPrice: string;
  discount: string;
}

interface QuotationGroup {
  serviceType: string;
  services: Service[];
  totalAmount: number;
  itemCount: number;
  templateType: string; // Quotation template type
}

interface MultiQuotationCreationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  dealData: {
    customer: string;
    dealId: string;
    expectedCloseDate?: string;
  };
  onCreateQuotations: (quotations: QuotationGroup[], mode: 'single' | 'multiple') => void;
}

const SERVICE_TYPE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Freight: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  Customs: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  Warehouse: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
  Transport: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
  Crossborder: { bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-200" },
  Trading: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" },
  Service: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" },
  Other: { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200" },
  Unknown: { bg: "bg-gray-50", text: "text-gray-500", border: "border-gray-200" },
};

const SERVICE_TYPE_LABELS: Record<string, string> = {
  Freight: "ขนส่งสินค้า",
  Customs: "พิธีการศุลกากร",
  Warehouse: "คลังสินค้า",
  Transport: "ขนส่งทางบก",
  Crossborder: "ข้ามพรมแดน",
  Trading: "การค้า",
  Service: "บริการทั่วไป",
  Other: "อื่นๆ",
  Unknown: "ไม่ระบุ",
};

// Map service types to quotation templates
const SERVICE_TYPE_TO_TEMPLATE: Record<string, string> = {
  Freight: "international-freight",      // ขนส่งระหว่างประเทศ (อากาศ/ทะเล)
  Customs: "customs-license",           // พิธีการศุลกากร + ใบอนุญาต
  Warehouse: "warehouse-transport",     // คลังสินค้า + ขนส่ง
  Transport: "warehouse-transport",     // คลังสินค้า + ขนส่ง
  Crossborder: "cross-border",          // ขนส่งข้ามพรมแดน (CLMV)
  Trading: "warehouse-transport",       // Default to warehouse-transport
  Service: "warehouse-transport",       // Default to warehouse-transport
  Other: "warehouse-transport",         // Default to warehouse-transport
  Unknown: "warehouse-transport",       // Default to warehouse-transport
};

// Template names for display
const TEMPLATE_NAMES: Record<string, string> = {
  "international-freight": "ขนส่งระหว่างประเทศ (อากาศ/ทะเล)",
  "customs-license": "พิธีการศุลกากร + ใบอนุญาต",
  "warehouse-transport": "คลังสินค้า + ขนส่ง",
  "cross-border": "ขนส่งข้ามพรมแดน (CLMV)",
};

// All available templates for selection
const AVAILABLE_TEMPLATES = [
  { id: "international-freight", name: "ขนส่งระหว่างประเทศ (อากาศ/ทะเล)" },
  { id: "customs-license", name: "พิธีการศุลกากร + ใบอนุญาต" },
  { id: "warehouse-transport", name: "คลังสินค้า + ขนส่ง" },
  { id: "cross-border", name: "ขนส่งข้ามพรมแดน (CLMV)" },
];

export function MultiQuotationCreationDialog({
  isOpen,
  onClose,
  services,
  dealData,
  onCreateQuotations,
}: MultiQuotationCreationDialogProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [mode, setMode] = useState<'single' | 'multiple' | null>(null);
  const [selectedGroups, setSelectedGroups] = useState<Set<string>>(new Set());
  const [templateOverrides, setTemplateOverrides] = useState<Record<string, string>>({});

  // Group services by serviceType
  const quotationGroups = useMemo(() => {
    const groups = new Map<string, QuotationGroup>();

    services.forEach((service) => {
      const type = service.serviceType || "Unknown";
      
      if (!groups.has(type)) {
        groups.set(type, {
          serviceType: type,
          services: [],
          totalAmount: 0,
          itemCount: 0,
          templateType: SERVICE_TYPE_TO_TEMPLATE[type] || "default", // Default template type
        });
      }

      const group = groups.get(type)!;
      group.services.push(service);
      group.itemCount += 1;

      // Calculate amount
      const qty = parseFloat(service.quantity) || 0;
      const price = parseFloat(service.unitPrice) || 0;
      const disc = parseFloat(service.discount) || 0;
      const subtotal = qty * price;
      const amount = subtotal - (subtotal * disc / 100);
      group.totalAmount += amount;
    });

    return Array.from(groups.values());
  }, [services]);

  // Initialize selected groups when moving to step 2
  const handleSelectMode = (selectedMode: 'single' | 'multiple') => {
    setMode(selectedMode);
    
    if (selectedMode === 'multiple') {
      // Auto-select all groups
      setSelectedGroups(new Set(quotationGroups.map(g => g.serviceType)));
      setStep(2);
    } else {
      // Single mode - create immediately
      handleCreate('single');
    }
  };

  const toggleGroupSelection = (serviceType: string) => {
    const newSelected = new Set(selectedGroups);
    if (newSelected.has(serviceType)) {
      newSelected.delete(serviceType);
    } else {
      newSelected.add(serviceType);
    }
    setSelectedGroups(newSelected);
  };

  const handleTemplateChange = (serviceType: string, newTemplate: string) => {
    setTemplateOverrides(prev => ({
      ...prev,
      [serviceType]: newTemplate
    }));
  };

  const getTemplateForGroup = (group: QuotationGroup) => {
    return templateOverrides[group.serviceType] || group.templateType;
  };

  const handleCreate = (createMode: 'single' | 'multiple') => {
    if (createMode === 'multiple' && selectedGroups.size === 0) {
      toast.error("กรุณาเลือกอย่างน้อย 1 ประเภทบริการ");
      return;
    }

    const selectedQuotations = createMode === 'single' 
      ? quotationGroups 
      : quotationGroups
          .filter(g => selectedGroups.has(g.serviceType))
          .map(g => ({
            ...g,
            templateType: getTemplateForGroup(g) // Use selected template
          }));

    onCreateQuotations(selectedQuotations, createMode);
    handleClose();
  };

  const handleClose = () => {
    setStep(1);
    setMode(null);
    setSelectedGroups(new Set());
    onClose();
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("th-TH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-[#7BC9A6]/10 to-white">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FileText className="h-6 w-6 text-[#7BC9A6]" />
              สร้างใบเสนอราคา
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {step === 1 ? "เลือกรูปแบบการสร้างใบเสนอราคา" : `เลือกประเภทบริการที่ต้องการสร้าง (${quotationGroups.length} ประเภท)`}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 1 ? (
            /* Step 1: Select Mode */
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3 mb-6">
                <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">ดีลนี้มีบริการ {services.length} รายการ ใน {quotationGroups.length} ประเภท</p>
                  <p className="text-xs text-blue-700 mt-1">
                    คุณสามารถเลือกสร้างใบเสนอราคาแบบรวมทั้งหมด หรือแยกตามประเภทบริการได้
                  </p>
                </div>
              </div>

              {/* Option 1: Single Quotation */}
              <button
                onClick={() => handleSelectMode('single')}
                className="w-full border-2 border-gray-200 rounded-xl p-6 hover:border-[#7BC9A6] hover:bg-[#7BC9A6]/5 transition-all group text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#7BC9A6]/10 flex items-center justify-center group-hover:bg-[#7BC9A6] transition-colors">
                    <FileText className="h-6 w-6 text-[#7BC9A6] group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      สร้างใบเดียวรวมทุกบริการ
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      สร้างใบเสนอราคา 1 ใบที่รวมบริการทั้งหมด {services.length} รายการ
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="inline-flex items-center gap-1.5 text-gray-700">
                        <Package className="h-4 w-4" />
                        {services.length} รายการ
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-gray-700">
                        <DollarSign className="h-4 w-4" />
                        ฿{formatCurrency(quotationGroups.reduce((sum, g) => sum + g.totalAmount, 0))}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#7BC9A6] transition-colors" />
                </div>
              </button>

              {/* Option 2: Multiple Quotations */}
              <button
                onClick={() => handleSelectMode('multiple')}
                className="w-full border-2 border-gray-200 rounded-xl p-6 hover:border-[#7BC9A6] hover:bg-[#7BC9A6]/5 transition-all group text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                    <FileText className="h-6 w-6 text-blue-500 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      สร้างหลายใบแยกตามประเภทบริการ
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      สร้างใบเสนอราคาแยกตามประเภทบริการ (สูงสุด {quotationGroups.length} ใบ)
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {quotationGroups.map((group) => {
                        const colors = SERVICE_TYPE_COLORS[group.serviceType] || SERVICE_TYPE_COLORS.Unknown;
                        return (
                          <span
                            key={group.serviceType}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text} border ${colors.border}`}
                          >
                            {SERVICE_TYPE_LABELS[group.serviceType] || group.serviceType}
                            <span className="opacity-60">({group.itemCount})</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
              </button>
            </div>
          ) : (
            /* Step 2: Select Groups */
            <div className="space-y-4">
              <div className="bg-[#7BC9A6]/10 border border-[#7BC9A6]/30 rounded-xl p-4 flex gap-3 mb-6">
                <Check className="h-5 w-5 text-[#7BC9A6] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    เลือกประเภทบริการที่ต้องการสร้างใบเสนอราคา
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    แต่ละประเภทจะถูกสร้างเป็นใบเสนอราคาแยกกัน ({selectedGroups.size} / {quotationGroups.length} ใบ)
                  </p>
                </div>
              </div>

              {quotationGroups.map((group) => {
                const colors = SERVICE_TYPE_COLORS[group.serviceType] || SERVICE_TYPE_COLORS.Unknown;
                const isSelected = selectedGroups.has(group.serviceType);

                return (
                  <div
                    key={group.serviceType}
                    onClick={() => toggleGroupSelection(group.serviceType)}
                    className={`border-2 rounded-xl p-5 cursor-pointer transition-all ${
                      isSelected
                        ? `${colors.border} bg-gradient-to-r ${colors.bg}`
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="pt-1">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleGroupSelection(group.serviceType)}
                          className={isSelected ? "border-[#7BC9A6] bg-[#7BC9A6]" : ""}
                        />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${colors.bg} ${colors.text} border-2 ${colors.border}`}>
                            {SERVICE_TYPE_LABELS[group.serviceType] || group.serviceType}
                          </span>
                          <span className="text-sm text-gray-500">
                            {group.itemCount} รายการ
                          </span>
                        </div>
                        <div className="mb-3 flex items-center gap-2 text-xs" onClick={(e) => e.stopPropagation()}>
                          <span className="text-gray-500">เทมเพลต:</span>
                          <select
                            value={getTemplateForGroup(group)}
                            onChange={(e) => handleTemplateChange(group.serviceType, e.target.value)}
                            className="text-xs font-medium text-[#7BC9A6] bg-white border border-[#7BC9A6]/30 rounded-md px-2 py-1 hover:border-[#7BC9A6] focus:outline-none focus:ring-2 focus:ring-[#7BC9A6]/20 cursor-pointer"
                          >
                            {AVAILABLE_TEMPLATES.map((template) => (
                              <option key={template.id} value={template.id}>
                                {template.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2">
                          {group.services.map((service, idx) => (
                            <div key={service.id} className="flex items-center justify-between text-sm bg-white/60 rounded-lg px-3 py-2 border border-gray-200">
                              <div className="flex-1">
                                <span className="font-medium text-gray-900">{idx + 1}. {service.service}</span>
                                {service.description && (
                                  <span className="text-gray-500 ml-2">- {service.description}</span>
                                )}
                              </div>
                              <div className="flex items-center gap-4 text-gray-600">
                                <span>{service.quantity} {service.unit}</span>
                                <span className="font-medium">
                                  ฿{formatCurrency(
                                    (parseFloat(service.quantity) || 0) * (parseFloat(service.unitPrice) || 0) *
                                    (1 - (parseFloat(service.discount) || 0) / 100)
                                  )}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">มูลค่ารวม:</span>
                          <span className="text-lg font-bold text-[#7BC9A6]">
                            ฿{formatCurrency(group.totalAmount)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            {step === 2 && (
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#7BC9A6]" />
                <span>เลือกแล้ว {selectedGroups.size} ประเภท</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            {step === 2 && (
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="px-6"
              >
                ย้อนกลับ
              </Button>
            )}
            <Button
              variant="outline"
              onClick={handleClose}
              className="px-6"
            >
              ยกเลิก
            </Button>
            {step === 2 && (
              <Button
                onClick={() => handleCreate('multiple')}
                disabled={selectedGroups.size === 0}
                className="px-6 bg-[#7BC9A6] hover:bg-[#6ab395] text-white"
              >
                <FileText className="h-4 w-4 mr-2" />
                สร้าง {selectedGroups.size} ใบเสนอราคา
              </Button>
            )}
          </div>
        </div>
      </div>
  );
}