import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Combobox, ComboboxOption } from "./ui/combobox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useTranslation } from "react-i18next";
import { Loader2, X, Save, DollarSign, User, Package, TrendingUp, Building2, Briefcase, Plus } from "lucide-react";
import { Badge } from "./ui/badge";
import { DealWinLossDialog } from "./deal-winloss-dialog";
import { toast } from "sonner";
import { INDUSTRIES, PROJECT_TYPES, COMMODITY_TYPES } from "../../config/masterData";

interface EditDealDialogProps {
  dealData?: any;
  open: boolean;
  onClose: () => void;
  onSave: (updatedData: any) => void;
}

const PROJECT_STATUSES = [
  "Prospect",
  "Approach",
  "Quotation",
  "Negotiating Process",
  "Win",
  "Lose",
  "On-hold",
  "Transfer",
  "Terminate",
  "Cancelled",
];

const PROBABILITY_LEVELS = ["High", "Medium", "Low"];

export function EditDealDialog({
  dealData,
  open,
  onClose,
  onSave,
}: EditDealDialogProps) {
  const { t } = useTranslation();
  const [isSaving, setIsSaving] = useState(false);
  const [isWinLossDialogOpen, setIsWinLossDialogOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<string | null>(null);
  const [winLossData, setWinLossData] = useState<{
    type: "win" | "loss" | null;
    reason: string;
    details: string;
  }>({ type: null, reason: "", details: "" });

  const [formData, setFormData] = useState({
    dealName: dealData?.dealName || "",
    dealValue: dealData?.totalValue?.replace(/[$,฿]/g, "") || "",
    expectedCloseDate: dealData?.expectedCloseDate || "",
    customerName: dealData?.customer || "",
    customerEmail: dealData?.customerEmail || "",
    customerPhone: dealData?.customerPhone || "",
    billingAddress: dealData?.billingAddress || "",
    contactPerson: dealData?.contactPerson || "John Davidson",
    contactPosition: dealData?.contactPosition || "Operations Director",
    industry: dealData?.industry || "Electronics",
    commodityTypes: dealData?.commodityTypes || ["Consumer Electronics", "Industrial Equipment"],
    projectType: dealData?.projectType || "Solution Design",
    projectStatus: dealData?.stage || "Negotiating Process",
    probabilityOfDeal: dealData?.probability?.split(" ")[0] || "Medium",
    salesAccountOwner: dealData?.owner || "",
    description: dealData?.description || "",
  });

  const [newCommodityType, setNewCommodityType] = useState("");

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onSave(formData);
    toast.success("บันทึกการแก้ไขเรียบร้อย! ✅");
    setIsSaving(false);
    onClose();
  };

  const handleStatusChange = (status: string) => {
    if (status === "Win" || status === "Lose") {
      setPendingStatus(status);
      setIsWinLossDialogOpen(true);
    } else {
      handleInputChange("projectStatus", status);
    }
  };

  const handleWinLossDialogClose = () => {
    setIsWinLossDialogOpen(false);
    setPendingStatus(null);
    setWinLossData({ type: null, reason: "", details: "" });
  };

  const handleWinLossDialogSave = (type: "win" | "loss", reason: string, details: string) => {
    setWinLossData({ type, reason, details });
    handleInputChange("projectStatus", pendingStatus || "Negotiating Process");
    handleSave();
    handleWinLossDialogClose();
  };

  const handleAddCommodityType = () => {
    if (newCommodityType.trim()) {
      setFormData((prev) => ({
        ...prev,
        commodityTypes: [...prev.commodityTypes, newCommodityType],
      }));
      setNewCommodityType("");
    }
  };

  const handleRemoveCommodityType = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      commodityTypes: prev.commodityTypes.filter((item) => item !== type),
    }));
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-2 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Briefcase className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <DialogTitle className="text-base font-semibold text-gray-900">
                แก้ไขดีล
              </DialogTitle>
              <DialogDescription className="text-[10px] text-gray-500 mt-0.5">
                {dealData?.dealId} • {dealData?.customer}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSave} className="space-y-4 py-3">
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
                <Input
                  id="dealValue"
                  type="number"
                  value={formData.dealValue}
                  onChange={(e) => handleInputChange("dealValue", e.target.value)}
                  placeholder="0.00"
                  className={`mt-1 ${!formData.dealValue ? 'border-red-300' : ''}`}
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

          {/* Customer Information */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b pb-2">
              <Building2 className="h-4 w-4 text-gray-600" />
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">
                ข้อมูลลูกค้า
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <Label htmlFor="customerName" className="text-xs font-medium text-gray-700">
                  ชื่อบริษัท <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange("customerName", e.target.value)}
                  placeholder="กรอกชื่อบริษัท"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="contactPerson" className="text-xs font-medium text-gray-700">
                  ชื่อผู้ติดต่อ
                </Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                  placeholder="ชื่อผู้ติดต่อ"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="contactPosition" className="text-xs font-medium text-gray-700">
                  ตำแหน่ง
                </Label>
                <Input
                  id="contactPosition"
                  value={formData.contactPosition}
                  onChange={(e) => handleInputChange("contactPosition", e.target.value)}
                  placeholder="ตำแหน่ง"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="customerEmail" className="text-xs font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  id="customerEmail"
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => handleInputChange("customerEmail", e.target.value)}
                  placeholder="email@example.com"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="customerPhone" className="text-xs font-medium text-gray-700">
                  โทรศัพท์
                </Label>
                <Input
                  id="customerPhone"
                  type="tel"
                  value={formData.customerPhone}
                  onChange={(e) => handleInputChange("customerPhone", e.target.value)}
                  placeholder="0812345678"
                  className="mt-1"
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="billingAddress" className="text-xs font-medium text-gray-700">
                  ที่อยู่
                </Label>
                <Textarea
                  id="billingAddress"
                  value={formData.billingAddress}
                  onChange={(e) => handleInputChange("billingAddress", e.target.value)}
                  placeholder="กรอกที่อยู่..."
                  className="mt-1 min-h-[70px]"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="industry" className="text-xs font-medium text-gray-700">
                  อุตสาหกรรม
                </Label>
                <Combobox
                  options={[
                    { value: "Agriculture", label: "Agriculture" },
                    { value: "Automotive", label: "Automotive" },
                    { value: "Construction", label: "Construction" },
                    { value: "Chemical", label: "Chemical" },
                    { value: "Circular Economy", label: "Circular Economy" },
                    { value: "Electronics", label: "Electronics" },
                    { value: "Energy", label: "Energy" },
                    { value: "Fashion", label: "Fashion" },
                    { value: "Food & FMCG", label: "Food & FMCG" },
                    { value: "Home & Living", label: "Home & Living" },
                    { value: "Packaging", label: "Packaging" },
                    { value: "Healthcare", label: "Healthcare" },
                    { value: "Waste Management", label: "Waste Management" },
                    { value: "Other", label: "Other" },
                  ]}
                  value={formData.industry}
                  onValueChange={(value) => handleInputChange("industry", value)}
                  placeholder="เลือกอุตสาหกรรม"
                  searchPlaceholder="ค้นหาอุตสาหกรรม..."
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="projectType" className="text-xs font-medium text-gray-700">
                  ประเภทโครงการ
                </Label>
                <Combobox
                  options={[
                    { value: "Solution Design", label: "Solution Design" },
                    { value: "Product Development", label: "Product Development" },
                    { value: "Cost Improvement", label: "Cost Improvement" },
                    { value: "Internal Improvement", label: "Internal Improvement" },
                  ]}
                  value={formData.projectType}
                  onValueChange={(value) => handleInputChange("projectType", value)}
                  placeholder="เลือกประเภทโครงการ"
                  searchPlaceholder="ค้นหาประเภทโครงการ..."
                  className="mt-1"
                />
              </div>

              <div className="col-span-2">
                <Label className="text-xs font-medium text-gray-700 mb-2 block">
                  ประเภทสินค้า
                </Label>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.commodityTypes.map((type) => (
                      <Badge key={type} variant="secondary" className="bg-green-100 text-green-700 px-2 py-1">
                        {type}
                        <button
                          type="button"
                          onClick={() => handleRemoveCommodityType(type)}
                          className="ml-2 hover:text-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Combobox
                      options={COMMODITY_TYPES.map((commodity) => ({ value: commodity.label, label: commodity.label }))}
                      value={newCommodityType}
                      onValueChange={(value) => {
                        if (value && !formData.commodityTypes.includes(value)) {
                          setFormData((prev) => ({
                            ...prev,
                            commodityTypes: [...prev.commodityTypes, value],
                          }));
                        }
                      }}
                      placeholder="เลือกประเภทสินค้า"
                      searchPlaceholder="ค้นหาประเภทสินค้า..."
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Status & Progress */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b pb-2">
              <TrendingUp className="h-4 w-4 text-gray-600" />
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">
                สถานะและความคืบหน้า
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="projectStatus" className="text-xs font-medium text-gray-700">
                  ขั้นตอน <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={formData.projectStatus} 
                  onValueChange={(value) => handleStatusChange(value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="เลือกขั้นตอน" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROJECT_STATUSES.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="probabilityOfDeal" className="text-xs font-medium text-gray-700">
                  โอกาสปิดดีล <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={formData.probabilityOfDeal} 
                  onValueChange={(value) => handleInputChange("probabilityOfDeal", value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PROBABILITY_LEVELS.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <Label htmlFor="salesAccountOwner" className="text-xs font-medium text-gray-700">
                  เจ้าของดีล <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="salesAccountOwner"
                  value={formData.salesAccountOwner}
                  onChange={(e) => handleInputChange("salesAccountOwner", e.target.value)}
                  placeholder="ชื่อพนักงานขาย"
                  className="mt-1"
                />
              </div>
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
              disabled={isSaving}
            >
              ยกเลิก
            </Button>
            <Button
              type="submit"
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  กำลังบันทึก...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  บันทึกการแก้ไข
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>

      {/* Win/Loss Dialog */}
      {pendingStatus && (
        <DealWinLossDialog
          isOpen={isWinLossDialogOpen}
          onClose={handleWinLossDialogClose}
          dealId={dealData?.dealId || ""}
          dealName={formData.dealName}
          onSave={handleWinLossDialogSave}
        />
      )}
    </Dialog>
  );
}