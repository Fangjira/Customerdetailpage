import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Loader2, FileText, Info, AlertCircle } from "lucide-react";
import { Combobox, ComboboxOption } from "./ui/combobox";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface GenerateProposalDialogProps {
  dealData?: {
    dealId: string;
    dealName: string;
    customer: string;
    totalValue: string;
  };
  open: boolean;
  onClose: () => void;
  onGenerate: (proposalData: any) => void;
}

export function GenerateProposalDialog({
  dealData,
  open,
  onClose,
  onGenerate,
}: GenerateProposalDialogProps) {
  const { t } = useTranslation();
  const [isGenerating, setIsGenerating] = useState(false);
  
  // 🔷 WORD TEMPLATE DATA STRUCTURE
  const [formData, setFormData] = useState({
    // Basic Info
    proposalNumber: `PRP-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
    issueDate: new Date().toISOString().split('T')[0],
    issueStatus: "Draft",
    
    // Header Section
    companyNameTH: "บริษัท วันลิงค์ โลจิสติกส์ จำกัด",
    companyNameEN: "mini CRM Logistics Co., Ltd.",
    
    // Site & Service
    siteTH: "",
    siteEN: "",
    serviceTH: "",
    serviceEN: "",
    
    // Customer Info
    customerCompanyTH: dealData?.customer || "",
    customerCompanyEN: "",
    customerContactName: "",
    customerPosition: "",
    
    // Issued By
    issuedBy: "",
    issuedByCompany: "บริษัท วันลิงค์ โลจิสติกส์ จำกัด",
    issuedEmail: "",
    
    // Content
    introParagraphEN: "",
    introParagraphTH: "",
    descriptionEN: "",
    descriptionTH: "",
  });

  const handleGenerate = async () => {
    // Validate required fields
    if (!formData.customerCompanyTH || !formData.customerContactName) {
      toast.error("กรุณากรอกข้อมูลลูกค้าที่จำเป็น");
      return;
    }
    
    if (!formData.siteTH || !formData.serviceTH) {
      toast.error("กรุณากรอกข้อมูล Site และ Service");
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Pass data to parent component which will navigate to proposal editor
    onGenerate({
      ...formData,
      dealId: dealData?.dealId,
      dealName: dealData?.dealName,
    });
    
    setIsGenerating(false);
    toast.success("สร้างข้อเสนอเรียบร้อย! กำลังเปิดหน้าแก้ไข...");
    onClose();
  };

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            📄 สร้างข้อเสนอใหม่ (Word Template)
          </DialogTitle>
          <DialogDescription>
            กรอกข้อมูลเพื่อสร้างข้อเสนอที่จะ generate เป็นเอกสาร Word แบบ Pixel-Perfect
          </DialogDescription>
        </DialogHeader>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-blue-900">
              <p className="font-medium mb-1">ข้อมูลจะถูกนำไปใส่ใน Word Template</p>
              <p className="text-blue-700">
                ข้อมูลที่กรอกจะถูก merge เข้า Word template แบบ pixel-perfect โดยรักษา layout, font, และ spacing ของต้นฉบับ
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 py-4">
          {/* Deal Information */}
          {dealData && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-900">
                ดีลที่เกี่ยวข้อง: {dealData.dealName}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {dealData.customer} • {dealData.dealId} • มูลค่า {dealData.totalValue}
              </p>
            </div>
          )}

          {/* 🔷 SECTION 1: Document Info */}
          <div className="border border-gray-200 rounded-lg p-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              📋 ข้อมูลเอกสาร
            </h3>
            
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label className="text-xs">หมายเลขสัญญา <span className="text-red-500">*</span></Label>
                <Input
                  value={formData.proposalNumber}
                  onChange={(e) => updateField("proposalNumber", e.target.value)}
                  className="mt-1 text-xs h-9"
                  placeholder="PRP-2024-001"
                />
              </div>
              <div>
                <Label className="text-xs">วันที่ออกสัญญา <span className="text-red-500">*</span></Label>
                <Input
                  type="date"
                  value={formData.issueDate}
                  onChange={(e) => updateField("issueDate", e.target.value)}
                  className="mt-1 text-xs h-9"
                />
              </div>
              <div>
                <Label className="text-xs">สถานะของสัญญา</Label>
                <Combobox
                  options={[
                    { value: "Draft", label: "Draft" },
                    { value: "Pending", label: "Pending" },
                    { value: "Sent", label: "Sent" },
                  ]}
                  value={formData.issueStatus}
                  onValueChange={(value) => updateField("issueStatus", value)}
                  placeholder="เลือกสถานะ..."
                  searchPlaceholder="ค้นหาสถานะ..."
                  className="mt-1 text-xs h-9"
                />
              </div>
            </div>
          </div>

          {/* 🔷 SECTION 2: Site & Service (Centered in Word) */}
          <div className="border border-purple-200 rounded-lg p-4 space-y-3 bg-purple-50">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              🏭 Site & Service
              <span className="text-xs font-normal text-purple-600">(จะแสดงตรงกลางในเอกสาร)</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">สถานที่ (TH) <span className="text-red-500">*</span></Label>
                <Input
                  value={formData.siteTH}
                  onChange={(e) => updateField("siteTH", e.target.value)}
                  className="mt-1 text-xs h-9"
                  placeholder="โรงงานบางปู สมุทรปราการ"
                />
              </div>
              <div>
                <Label className="text-xs">Site (EN) <span className="text-red-500">*</span></Label>
                <Input
                  value={formData.siteEN}
                  onChange={(e) => updateField("siteEN", e.target.value)}
                  className="mt-1 text-xs h-9"
                  placeholder="Bangpu Factory, Samutprakarn"
                />
              </div>
              <div>
                <Label className="text-xs">บริการ (TH) <span className="text-red-500">*</span></Label>
                <Input
                  value={formData.serviceTH}
                  onChange={(e) => updateField("serviceTH", e.target.value)}
                  className="mt-1 text-xs h-9"
                  placeholder="บริการขนส่งสินค้าทางบก"
                />
              </div>
              <div>
                <Label className="text-xs">Service (EN) <span className="text-red-500">*</span></Label>
                <Input
                  value={formData.serviceEN}
                  onChange={(e) => updateField("serviceEN", e.target.value)}
                  className="mt-1 text-xs h-9"
                  placeholder="Land Transportation Service"
                />
              </div>
            </div>
          </div>

          {/* 🔷 SECTION 3: Customer Information (Centered in Word) */}
          <div className="border border-purple-200 rounded-lg p-4 space-y-3 bg-purple-50">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              🏢 ข้อมูลลูกค้า
              <span className="text-xs font-normal text-purple-600">(จะแสดงตรงกลางในเอกสาร)</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">ชื่อบริษัทลูกค้า (TH) <span className="text-red-500">*</span></Label>
                <Input
                  value={formData.customerCompanyTH}
                  onChange={(e) => updateField("customerCompanyTH", e.target.value)}
                  className="mt-1 text-xs h-9"
                  placeholder="บริษัท เทคโนโลยี จำกัด"
                />
              </div>
              <div>
                <Label className="text-xs">Customer Company (EN)</Label>
                <Input
                  value={formData.customerCompanyEN}
                  onChange={(e) => updateField("customerCompanyEN", e.target.value)}
                  className="mt-1 text-xs h-9"
                  placeholder="Technology Co., Ltd."
                />
              </div>
              <div>
                <Label className="text-xs">ชื่อผู้ติดต่อ <span className="text-red-500">*</span></Label>
                <Input
                  value={formData.customerContactName}
                  onChange={(e) => updateField("customerContactName", e.target.value)}
                  className="mt-1 text-xs h-9"
                  placeholder="คุณสมชาย ใจดี"
                />
              </div>
              <div>
                <Label className="text-xs flex items-center gap-1">
                  ตำแหน่ง <span className="text-gray-400 text-[10px]">(Optional - ซ่อนถ้าว่าง)</span>
                </Label>
                <Input
                  value={formData.customerPosition}
                  onChange={(e) => updateField("customerPosition", e.target.value)}
                  className="mt-1 text-xs h-9"
                  placeholder="ผู้จัดการฝ่ายจัดซื้อ"
                />
              </div>
            </div>
          </div>

          {/* 🔷 SECTION 4: Issued By (Left Aligned in Word) */}
          <div className="border border-gray-200 rounded-lg p-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              👤 ออกโดย / Issued By
              <span className="text-xs font-normal text-gray-500">(ชิดซ้ายในเอกสาร)</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">ออกโดย <span className="text-red-500">*</span></Label>
                <Input
                  value={formData.issuedBy}
                  onChange={(e) => updateField("issuedBy", e.target.value)}
                  className="mt-1 text-xs h-9"
                  placeholder="Sarah Chen"
                />
              </div>
              <div>
                <Label className="text-xs">อีเมล <span className="text-red-500">*</span></Label>
                <Input
                  type="email"
                  value={formData.issuedEmail}
                  onChange={(e) => updateField("issuedEmail", e.target.value)}
                  className="mt-1 text-xs h-9"
                  placeholder="sarah.chen@onelink-logistics.com"
                />
              </div>
            </div>
          </div>

          {/* 🔷 SECTION 5: Introduction Paragraphs */}
          <div className="border border-gray-200 rounded-lg p-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              ✍️ ย่อหน้าแนะนำ
            </h3>
            
            <div className="space-y-3">
              <div>
                <Label className="text-xs">Introduction (EN)</Label>
                <Textarea
                  value={formData.introParagraphEN}
                  onChange={(e) => updateField("introParagraphEN", e.target.value)}
                  rows={3}
                  className="mt-1 text-xs"
                  placeholder="We are pleased to present this proposal for logistics services..."
                />
              </div>
              <div>
                <Label className="text-xs">ย่อหน้าแนะนำ (TH)</Label>
                <Textarea
                  value={formData.introParagraphTH}
                  onChange={(e) => updateField("introParagraphTH", e.target.value)}
                  rows={3}
                  className="mt-1 text-xs"
                  placeholder="เรามีความยินดีที่จะนำเสนอข้อเสนอบริการโลจิสติกส์นี้..."
                />
              </div>
            </div>
          </div>

          {/* 🔷 SECTION 6: Description */}
          <div className="border border-gray-200 rounded-lg p-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              📝 รายละเอียดโครงการ
            </h3>
            
            <div className="space-y-3">
              <div>
                <Label className="text-xs">Description (EN)</Label>
                <Textarea
                  value={formData.descriptionEN}
                  onChange={(e) => updateField("descriptionEN", e.target.value)}
                  rows={3}
                  className="mt-1 text-xs"
                  placeholder="This proposal covers comprehensive logistics services including..."
                />
              </div>
              <div>
                <Label className="text-xs">รายละเอียด (TH)</Label>
                <Textarea
                  value={formData.descriptionTH}
                  onChange={(e) => updateField("descriptionTH", e.target.value)}
                  rows={3}
                  className="mt-1 text-xs"
                  placeholder="ข้อเสนอนี้ครอบคลุมบริการโลจิสติกส์แบบครบวงจร..."
                />
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-amber-900">
                <p className="font-medium mb-1">⚠️ หมายเหตุ</p>
                <p className="text-amber-700">
                  หลังจากสร้างเอกสาร คุณสามารถเพิ่มรายละเอียดเพิ่มเติมได้ในหน้าแก้ไข เช่น:
                  <br />• Scope of Works (ขอบเขตการดำเนินงาน)
                  <br />• Service Charges (ค่าบริการ)
                  <br />• Remarks (หมายเหตุ)
                  <br />• Terms and Conditions (ข้อกำหนดและเงื่อนไข)
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={onClose} 
            disabled={isGenerating}
            className="text-xs"
          >
            ยกเลิก
          </Button>
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="bg-[#7BC9A6] hover:bg-[#6AB896] text-xs"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                กำลังสร้าง...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                สร้างข้อเสนอ
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
