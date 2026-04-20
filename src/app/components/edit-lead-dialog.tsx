import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Combobox, ComboboxOption } from "./ui/combobox";
import { useTranslation } from "react-i18next";
import { Loader2, X, Save, Target, Building2, User, Tag } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

interface EditLeadDialogProps {
  leadData?: any;
  open: boolean;
  onClose: () => void;
  onSave: (updatedData: any) => void;
}

const LEAD_STATUSES = [
  "New",
  "Contacted",
  "Qualified",
  "Unqualified",
];

const LEAD_SOURCES = [
  "Website",
  "LinkedIn",
  "Facebook",
  "Referral",
  "Cold Call",
  "Email Campaign",
  "Event",
  "Other",
];

export function EditLeadDialog({
  leadData,
  open,
  onClose,
  onSave,
}: EditLeadDialogProps) {
  const { t } = useTranslation();
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    companyName: leadData?.companyName || "",
    industry: leadData?.industry || "",
    address: leadData?.address || "",
    phone: leadData?.phone || "",
    email: leadData?.email || "",
    website: leadData?.website || "",
    source: leadData?.source || "LinkedIn",
    status: leadData?.status || "New",
    assignedTo: leadData?.assignedTo || "",
    estimatedValue: leadData?.estimatedValue || "",
    notes: leadData?.notes || "",
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onSave(formData);
    setIsSaving(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[95vh] p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b bg-gradient-to-r from-green-50 to-teal-50 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Target className="h-5 w-5 text-[#7BC9A6] flex-shrink-0" />
              <div className="min-w-0">
                <DialogTitle className="text-lg font-bold text-gray-900 truncate">
                  แก้ไขลีด
                </DialogTitle>
                <DialogDescription className="text-sm text-gray-600 truncate">
                  {leadData?.id} • {leadData?.companyName}
                </DialogDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="p-6 space-y-4 pb-20">
            {/* Company Information */}
            <Card className="border-[#7BC9A6]/20 bg-gradient-to-br from-green-50 to-teal-50">
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-[#7BC9A6]" />
                  ข้อมูลบริษัท
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="companyName" className="text-sm text-gray-700">
                      ชื่อบริษัท / องค์กร *
                    </Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange("companyName", e.target.value)}
                      placeholder="e.g., Tech Innovation Co., Ltd."
                      className="mt-1.5 h-10 text-sm"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="industry" className="text-sm text-gray-700">
                        อุตสาหกรรม
                      </Label>
                      <Input
                        id="industry"
                        value={formData.industry}
                        onChange={(e) => handleInputChange("industry", e.target.value)}
                        placeholder="e.g., Technology"
                        className="mt-1.5 h-10 text-sm"
                      />
                    </div>

                    <div>
                      <Label htmlFor="estimatedValue" className="text-sm text-gray-700">
                        มูลค่าคาดหวัง (฿)
                      </Label>
                      <Input
                        id="estimatedValue"
                        type="number"
                        value={formData.estimatedValue}
                        onChange={(e) => handleInputChange("estimatedValue", e.target.value)}
                        placeholder="500000"
                        className="mt-1.5 h-10 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-sm text-gray-700">
                      ที่อยู่
                    </Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="ที่อยู่บริษัท..."
                      className="mt-1.5 min-h-[70px] text-sm"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="phone" className="text-sm text-gray-700">
                        เบอร์โทรศัพท์
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="02-555-6789"
                        className="mt-1.5 h-10 text-sm"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-sm text-gray-700">
                        อีเมล
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="contact@company.com"
                        className="mt-1.5 h-10 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="website" className="text-sm text-gray-700">
                      เว็บไซต์
                    </Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      placeholder="www.company.com"
                      className="mt-1.5 h-10 text-sm"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lead Information */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Tag className="h-4 w-4 text-[#7BC9A6]" />
                  ข้อมูลลีด
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="status" className="text-sm text-gray-700">
                        สถานะ *
                      </Label>
                      <Combobox
                        options={LEAD_STATUSES.map((status) => ({ value: status, label: status }))}
                        value={formData.status}
                        onValueChange={(value) => handleInputChange("status", value)}
                        placeholder="เลือกสถานะ..."
                        searchPlaceholder="ค้นหาสถานะลีด..."
                        className="mt-1.5 h-10 text-sm"
                      />
                    </div>

                    <div>
                      <Label htmlFor="source" className="text-sm text-gray-700">
                        แหล่งที่มา
                      </Label>
                      <Combobox
                        options={LEAD_SOURCES.map((source) => ({ value: source, label: source }))}
                        value={formData.source}
                        onValueChange={(value) => handleInputChange("source", value)}
                        placeholder="เลือกแหล่งที่มา..."
                        searchPlaceholder="ค้นหาแหล่งที่มา..."
                        className="mt-1.5 h-10 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="assignedTo" className="text-sm text-gray-700">
                      เจ้าของลีด
                    </Label>
                    <Input
                      id="assignedTo"
                      value={formData.assignedTo}
                      onChange={(e) => handleInputChange("assignedTo", e.target.value)}
                      placeholder="ชื่อผู้รับผิดชอบ"
                      className="mt-1.5 h-10 text-sm"
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes" className="text-sm text-gray-700">
                      หมายเหตุ
                    </Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                      placeholder="บันทึกข้อมูลเพิ่มเติมเกี่ยวกับลีด..."
                      className="mt-1.5 min-h-[100px] text-sm"
                      rows={4}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="border-t bg-gray-50 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <Button variant="outline" onClick={onClose} disabled={isSaving}>
            ยกเลิก
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-[#7BC9A6] hover:bg-[#6BB896] text-white min-w-[100px]"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                กำลังบันทึก...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                บันทึก
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
