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
  UserCheck,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Building2,
  MapPin,
  Briefcase,
  Users,
  Package,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
  INDUSTRIES,
  SUPPLY_CHAIN_ROLES,
  BUSINESS_GROUPS,
  BUSINESS_UNITS,
} from "../../config/masterData";

interface ConvertLeadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConvert?: (data: any) => void;
  leadData: any; // Pre-filled data from Lead
}

interface CustomerData {
  // Basic Info (from Lead)
  companyName: string;
  taxId: string;
  
  // Required for Customer
  industry: string;
  supplyChainRole: string;
  businessGroup: string;
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
  
  // Address (Required)
  address: string;
  province: string;
  district: string;
  postalCode: string;
  
  // Additional
  website: string;
}

export function ConvertLeadDialog({ isOpen, onClose, onConvert, leadData }: ConvertLeadDialogProps) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const [formData, setFormData] = useState<CustomerData>({
    companyName: leadData?.companyName || "",
    taxId: leadData?.taxId || "",
    industry: leadData?.industry || "",
    supplyChainRole: leadData?.supplyChainRole || "",
    businessGroup: leadData?.businessGroup || "",
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
    address: leadData?.address || "",
    province: leadData?.province || "",
    district: leadData?.district || "",
    postalCode: leadData?.postalCode || "",
    website: leadData?.website || "",
  });

  const handleInputChange = (field: keyof CustomerData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear validation errors when user starts typing
    setValidationErrors([]);
  };

  const handleServiceToggle = (service: keyof CustomerData['services']) => {
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

    if (!formData.companyName.trim()) {
      errors.push("กรุณากรอกชื่อบริษัท");
    }

    if (!formData.industry) {
      errors.push("กรุณาเลือกอุตสาหกรรม");
    }

    if (!formData.supplyChainRole) {
      errors.push("กรุณาเลือกบทบาทในซัพพลายเชน");
    }

    if (!formData.businessGroup) {
      errors.push("กรุณาเลือก Business Group");
    }

    if (!formData.businessUnit) {
      errors.push("กรุณาเลือก Business Unit");
    }

    if (!formData.address.trim()) {
      errors.push("กรุณากรอกที่อยู่");
    }

    if (!formData.province.trim()) {
      errors.push("กรุณากรอกจังหวัด");
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      onConvert?.({
        ...leadData,
        ...formData,
        convertedAt: new Date().toISOString(),
      });
      toast.success("แปลง Lead เป็นลูกค้าสำเร็จ! 🎉");
      onClose();
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการแปลง Lead");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setValidationErrors([]);
    onClose();
  };

  // Check which fields are missing
  const missingFields: string[] = [];
  if (!formData.companyName) missingFields.push("ชื่อบริษัท");
  if (!formData.industry) missingFields.push("อุตสาหกรรม");
  if (!formData.supplyChainRole) missingFields.push("บทบาทในซัพพลายเชน");
  if (!formData.businessGroup) missingFields.push("Business Group");
  if (!formData.businessUnit) missingFields.push("Business Unit");
  if (!formData.address) missingFields.push("ที่อยู่");
  if (!formData.province) missingFields.push("จังหวัด");
  const hasService = Object.values(formData.services).some(v => v === true);
  if (!hasService) missingFields.push("บริการ");

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-2 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-emerald-100 rounded-lg flex items-center justify-center">
              <UserCheck className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <DialogTitle className="text-base font-semibold text-gray-900">
                แปลง Lead เป็นลูกค้า
              </DialogTitle>
              <DialogDescription className="text-[10px] text-gray-500 mt-0.5">
                กรุณากรอกข้อมูลสำคัญให้ครบถ้วนก่อนแปลงเป็นลูกค้า
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Validation Alert */}
        {missingFields.length > 0 && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs font-medium text-amber-900 mb-1">
                  ข้อมูลสำคัญที่ขาดหายไป ({missingFields.length} รายการ):
                </p>
                <ul className="text-xs text-amber-700 list-disc list-inside space-y-0.5">
                  {missingFields.map((field, index) => (
                    <li key={index}>{field}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

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
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="h-4 w-4 text-blue-600" />
              <h3 className="text-xs font-semibold text-blue-900">ข้อมูล Lead</h3>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-blue-600">Lead ID:</span>{" "}
                <span className="font-medium text-blue-900">{leadData?.id || "N/A"}</span>
              </div>
              <div>
                <span className="text-blue-600">ผู้ติดต่อ:</span>{" "}
                <span className="font-medium text-blue-900">{leadData?.contactName || "N/A"}</span>
              </div>
              <div>
                <span className="text-blue-600">โทรศัพท์:</span>{" "}
                <span className="font-medium text-blue-900">{leadData?.contactPhone || "N/A"}</span>
              </div>
              <div>
                <span className="text-blue-600">Email:</span>{" "}
                <span className="font-medium text-blue-900">{leadData?.contactEmail || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b pb-2">
              <Building2 className="h-4 w-4 text-gray-600" />
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">
                ข้อมูลพื้นฐาน
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <Label htmlFor="companyName" className="text-xs font-medium text-gray-700">
                  ชื่อบริษัท <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  placeholder="กรอกชื่อบริษัท"
                  className={`mt-1 ${!formData.companyName ? 'border-red-300' : ''}`}
                />
              </div>
              <div>
                <Label htmlFor="taxId" className="text-xs font-medium text-gray-700">
                  เลขทะเบียนนิติบุคคล
                </Label>
                <Input
                  id="taxId"
                  value={formData.taxId}
                  onChange={(e) => handleInputChange("taxId", e.target.value)}
                  placeholder="0000000000000"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="website" className="text-xs font-medium text-gray-700">
                  Website
                </Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="https://www.example.com"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b pb-2">
              <Briefcase className="h-4 w-4 text-gray-600" />
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">
                ข้อมูลธุรกิจ
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="industry" className="text-xs font-medium text-gray-700">
                  อุตสาหกรรม <span className="text-red-500">*</span>
                </Label>
                <Combobox
                  options={INDUSTRIES.map((industry) => ({
                    value: industry.value,
                    label: t(industry.labelKey),
                  }))}
                  value={formData.industry}
                  onValueChange={(value) => handleInputChange("industry", value)}
                  placeholder="เลือกอุตสาหกรรม"
                  searchPlaceholder="ค้นหา..."
                  className={`mt-1 ${!formData.industry ? 'border-red-300' : ''}`}
                />
              </div>
              <div>
                <Label htmlFor="supplyChainRole" className="text-xs font-medium text-gray-700">
                  บทบาทในซัพพลายเชน <span className="text-red-500">*</span>
                </Label>
                <Combobox
                  options={SUPPLY_CHAIN_ROLES.map((role) => ({
                    value: role.value,
                    label: t(role.labelKey),
                  }))}
                  value={formData.supplyChainRole}
                  onValueChange={(value) => handleInputChange("supplyChainRole", value)}
                  placeholder="เลือกบทบาท"
                  searchPlaceholder="ค้นหา..."
                  className={`mt-1 ${!formData.supplyChainRole ? 'border-red-300' : ''}`}
                />
              </div>
              <div>
                <Label htmlFor="businessGroup" className="text-xs font-medium text-gray-700">
                  Business Group <span className="text-red-500">*</span>
                </Label>
                <Combobox
                  options={BUSINESS_GROUPS.map((group) => ({
                    value: group.value,
                    label: t(group.labelKey),
                  }))}
                  value={formData.businessGroup}
                  onValueChange={(value) => handleInputChange("businessGroup", value)}
                  placeholder="เลือก Business Group"
                  searchPlaceholder="ค้นหา..."
                  className={`mt-1 ${!formData.businessGroup ? 'border-red-300' : ''}`}
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
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.services[service as keyof typeof formData.services]}
                    onChange={() => handleServiceToggle(service as keyof typeof formData.services)}
                    className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                  />
                  <span className="text-xs font-medium text-gray-700 capitalize">
                    {service}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Address */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b pb-2">
              <MapPin className="h-4 w-4 text-gray-600" />
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">
                ที่อยู่
              </h3>
            </div>
            <div className="space-y-3">
              <div>
                <Label htmlFor="address" className="text-xs font-medium text-gray-700">
                  ที่อยู่ <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="กรอกที่อยู่"
                  className={`mt-1 min-h-[80px] ${!formData.address ? 'border-red-300' : ''}`}
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="province" className="text-xs font-medium text-gray-700">
                    จังหวัด <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="province"
                    value={formData.province}
                    onChange={(e) => handleInputChange("province", e.target.value)}
                    placeholder="กรุงเทพมหานคร"
                    className={`mt-1 ${!formData.province ? 'border-red-300' : ''}`}
                  />
                </div>
                <div>
                  <Label htmlFor="district" className="text-xs font-medium text-gray-700">
                    เขต/อำเภอ
                  </Label>
                  <Input
                    id="district"
                    value={formData.district}
                    onChange={(e) => handleInputChange("district", e.target.value)}
                    placeholder="วัฒนา"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode" className="text-xs font-medium text-gray-700">
                    รหัสไปรษณีย์
                  </Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange("postalCode", e.target.value)}
                    placeholder="10110"
                    className="mt-1"
                  />
                </div>
              </div>
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
              disabled={isLoading || missingFields.length > 0}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  กำลังแปลง...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  แปลงเป็นลูกค้า
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
