import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Combobox } from "./ui/combobox";
import {
  Briefcase,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Building2,
  DollarSign,
  Calendar,
  Package,
  Target,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
  BUSINESS_UNITS,
} from "../../config/masterData";

interface CreateDealDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate?: (data: any) => void;
  leadData?: any; // Pre-filled data from Lead
}

interface DealData {
  // Basic Info
  dealName: string;
  dealValue: string;
  currency: string;
  probability: string;
  expectedCloseDate: string;
  
  // From Lead
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  
  // Deal Info
  stage: string;
  businessUnit: string;
  
  // Services
  services: {
    freight: boolean;
    customer: boolean;
    warehouse: boolean;
    transport: boolean;
    crossborder: boolean;
    trading: boolean;
    service: boolean;
    other: boolean;
    unknown: boolean;
  };
  
  // Additional
  description: string;
}

const DEAL_STAGES = [
  { value: "prospecting", label: "Prospecting" },
  { value: "qualification", label: "Qualification" },
  { value: "proposal", label: "Proposal" },
  { value: "negotiation", label: "Negotiation" },
  { value: "closed-won", label: "Closed Won" },
  { value: "closed-lost", label: "Closed Lost" },
];

const CURRENCIES = [
  { value: "THB", label: "THB (฿)" },
  { value: "USD", label: "USD ($)" },
  { value: "EUR", label: "EUR (€)" },
];

export function CreateDealDialog({ isOpen, onClose, onCreate, leadData }: CreateDealDialogProps) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const [formData, setFormData] = useState<DealData>({
    dealName: leadData ? `Deal - ${leadData.companyName}` : "",
    dealValue: leadData?.estimatedValue?.toString() || "",
    currency: "THB",
    probability: "50",
    expectedCloseDate: "",
    
    companyName: leadData?.companyName || "",
    contactName: leadData?.contactName || "",
    contactEmail: leadData?.contactEmail || leadData?.email || "",
    contactPhone: leadData?.contactPhone || leadData?.phone || "",
    
    stage: "prospecting",
    businessUnit: leadData?.businessUnit || "",
    
    services: {
      freight: leadData?.services?.freight || false,
      customer: leadData?.services?.customer || false,
      warehouse: leadData?.services?.warehouse || false,
      transport: leadData?.services?.transport || false,
      crossborder: leadData?.services?.crossborder || false,
      trading: leadData?.services?.trading || false,
      service: leadData?.services?.service || false,
      other: leadData?.services?.other || false,
      unknown: leadData?.services?.unknown || false,
    },
    
    description: "",
  });

  const handleInputChange = (field: keyof DealData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear validation errors when user starts typing
    setValidationErrors([]);
  };

  const handleServiceToggle = (service: keyof DealData['services']) => {
    setFormData(prev => ({
      ...prev,
      services: {
        ...prev.services,
        [service]: !prev.services[service],
      },
    }));
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];

    if (!formData.dealName.trim()) {
      errors.push("กรุณากรอกชื่อดีล");
    }

    if (!formData.dealValue.trim()) {
      errors.push("กรุณากรอกมูลค่าดีล");
    }

    if (!formData.expectedCloseDate) {
      errors.push("กรุณาเลือกวันที่คาดว่าจะปิดดีล");
    }

    if (!formData.businessUnit) {
      errors.push("กรุณาเลือก Business Unit");
    }

    // Check if at least one service is selected
    const hasService = Object.values(formData.services).some(v => v === true);
    if (!hasService) {
      errors.push("กรุณาเลือกบริการอย่างน้อย 1 รายการ");
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const dealId = `DEAL-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
      
      onCreate?.({
        id: dealId,
        ...formData,
        leadId: leadData?.id,
        createdAt: new Date().toISOString(),
      });
      
      toast.success(`สร้างดีล ${dealId} สำเร็จ! 🎉`);
      handleClose();
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการสร้างดีล");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setValidationErrors([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-2 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Briefcase className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <DialogTitle className="text-base font-semibold text-gray-900">
                สร้างดีลใหม่
              </DialogTitle>
              <DialogDescription className="text-[10px] text-gray-500 mt-0.5">
                {leadData ? `สร้างดีลจาก Lead: ${leadData.id}` : "สร้างดีลใหม่"}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs font-medium text-red-900 mb-1">กรุณาแก้ไขข้อมูลดังนี้:</p>
                <ul className="text-xs text-red-700 list-disc list-inside space-y-0.5">
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 py-3">
          {/* Lead Info Preview */}
          {leadData && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-emerald-600" />
                <h3 className="text-xs font-semibold text-emerald-900">ข้อมูลจาก Lead</h3>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-emerald-600">Lead ID:</span>{" "}
                  <span className="font-medium text-emerald-900">{leadData.id}</span>
                </div>
                <div>
                  <span className="text-emerald-600">บริษัท:</span>{" "}
                  <span className="font-medium text-emerald-900">{leadData.companyName}</span>
                </div>
                <div>
                  <span className="text-emerald-600">ผู้ติดต่อ:</span>{" "}
                  <span className="font-medium text-emerald-900">{leadData.contactName || leadData.assignedTo}</span>
                </div>
                <div>
                  <span className="text-emerald-600">สถานะ:</span>{" "}
                  <span className="font-medium text-emerald-900">{leadData.status}</span>
                </div>
              </div>
            </div>
          )}

          {/* Deal Information */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b pb-2">
              <Briefcase className="h-4 w-4 text-gray-600" />
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">
                ข้อมูลดีล
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <Label htmlFor="dealName" className="text-xs font-medium text-gray-700">
                  ชื่อดีล <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="dealName"
                  value={formData.dealName}
                  onChange={(e) => handleInputChange("dealName", e.target.value)}
                  placeholder="กรอกชื่อดีล"
                  className={`mt-1 ${!formData.dealName ? 'border-red-300' : ''}`}
                />
              </div>
              
              <div>
                <Label htmlFor="dealValue" className="text-xs font-medium text-gray-700">
                  มูลค่าดีล <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="dealValue"
                    type="number"
                    value={formData.dealValue}
                    onChange={(e) => handleInputChange("dealValue", e.target.value)}
                    placeholder="1.00"
                    className={`flex-1 ${!formData.dealValue ? 'border-red-300' : ''} px-[100px] py-[4px]`}
                  />
                  <Combobox
                    options={CURRENCIES.map((currency) => ({
                      value: currency.value,
                      label: currency.label,
                    }))}
                    value={formData.currency}
                    onValueChange={(value) => handleInputChange("currency", value)}
                    placeholder="สกุลเงิน..."
                    searchPlaceholder="ค้นหา..."
                    className="w-32"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="probability" className="text-xs font-medium text-gray-700">
                  โอกาสปิดดีล (%)
                </Label>
                <Input
                  id="probability"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.probability}
                  onChange={(e) => handleInputChange("probability", e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="stage" className="text-xs font-medium text-gray-700">
                  ขั้นตอน
                </Label>
                <Combobox
                  options={DEAL_STAGES.map((stage) => ({
                    value: stage.value,
                    label: stage.label,
                  }))}
                  value={formData.stage}
                  onValueChange={(value) => handleInputChange("stage", value)}
                  placeholder="เลือกขั้นตอน"
                  searchPlaceholder="ค้นหา..."
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="expectedCloseDate" className="text-xs font-medium text-gray-700">
                  วันที่คาดว่าจะปิดดีล <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="expectedCloseDate"
                  type="date"
                  value={formData.expectedCloseDate}
                  onChange={(e) => handleInputChange("expectedCloseDate", e.target.value)}
                  className={`mt-1 ${!formData.expectedCloseDate ? 'border-red-300' : ''}`}
                />
              </div>
            </div>
          </div>

          {/* Company & Contact */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b pb-2">
              <Building2 className="h-4 w-4 text-gray-600" />
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">
                บริษัทและผู้ติดต่อ
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <Label htmlFor="companyName" className="text-xs font-medium text-gray-700">
                  ชื่อบริษัท
                </Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  placeholder="กรอกชื่อบริษัท"
                  className="mt-1"
                  disabled={!!leadData}
                />
              </div>
              <div>
                <Label htmlFor="contactName" className="text-xs font-medium text-gray-700">
                  ชื่อผู้ติดต่อ
                </Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) => handleInputChange("contactName", e.target.value)}
                  placeholder="ชื่อผู้ติดต่อ"
                  className="mt-1"
                  disabled={!!leadData}
                />
              </div>
              <div>
                <Label htmlFor="contactEmail" className="text-xs font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  id="contactEmail"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                  placeholder="email@example.com"
                  className="mt-1"
                  disabled={!!leadData}
                />
              </div>
              <div>
                <Label htmlFor="contactPhone" className="text-xs font-medium text-gray-700">
                  โทรศัพท์
                </Label>
                <Input
                  id="contactPhone"
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                  placeholder="0812345678"
                  className="mt-1"
                  disabled={!!leadData}
                />
              </div>
              <div>
                <Label htmlFor="businessUnit" className="text-xs font-medium text-gray-700">
                  Business Unit <span className="text-red-500">*</span>
                </Label>
                <Combobox
                  options={BUSINESS_UNITS.map((unit) => ({
                    value: unit.value,
                    label: unit.label,
                  }))}
                  value={formData.businessUnit}
                  onValueChange={(value) => handleInputChange("businessUnit", value)}
                  placeholder="เลือก Business Unit"
                  searchPlaceholder="ค้นหา..."
                  className={`mt-1 ${!formData.businessUnit ? 'border-red-300' : ''}`}
                />
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b pb-2">
              <Package className="h-4 w-4 text-gray-600" />
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">
                บริการ <span className="text-red-500">*</span>
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {Object.keys(formData.services).map((service) => (
                <label
                  key={service}
                  className={`flex items-center gap-2 p-2 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.services[service as keyof typeof formData.services]
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.services[service as keyof typeof formData.services]}
                    onChange={() => handleServiceToggle(service as keyof typeof formData.services)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-xs font-medium text-gray-700 capitalize">
                    {service === 'customer' ? 'Customs' : service}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b pb-2">
              <DollarSign className="h-4 w-4 text-gray-600" />
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">
                รายละเอียดเพิ่มเติม
              </h3>
            </div>
            <div>
              <Label htmlFor="description" className="text-xs font-medium text-gray-700">
                รายละเอียดดีล
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="กรอกรายละเอียดดีล..."
                className="mt-1 min-h-[100px]"
              />
            </div>
          </div>

          {/* Footer */}
          <DialogFooter className="pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              ยกเลิก
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  กำลังสร้าง...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  สร้างดีล
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}