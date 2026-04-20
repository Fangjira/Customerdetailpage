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
import { Combobox, ComboboxOption } from "./ui/combobox";
import { Textarea } from "./ui/textarea";
import { FileText, Calendar, Building2, User } from "lucide-react";

interface CreateNDADialogProps {
  open: boolean;
  onClose: () => void;
  onGenerate: (ndaData: NDAData) => void;
}

interface NDAData {
  title: string;
  partyA: string;
  partyB: string;
  startDate: string;
  endDate: string;
  purpose: string;
  template: string;
}

export function CreateNDADialog({ open, onClose, onGenerate }: CreateNDADialogProps) {
  const [formData, setFormData] = useState<NDAData>({
    title: "",
    partyA: "",
    partyB: "",
    startDate: "",
    endDate: "",
    purpose: "",
    template: "standard",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  const handleChange = (field: keyof NDAData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-[#7BC9A6]" />
            สร้างเอกสาร NDA (Non-Disclosure Agreement)
          </DialogTitle>
          <DialogDescription>
            กรอกข้อมูลเพื่อสร้างเอกสารข้อตกลงการเก็บรักษาความลับ
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              ชื่อเอกสาร NDA *
            </Label>
            <Input
              id="title"
              placeholder="เช่น NDA สำหรับโครงการ XYZ"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              required
              className="text-sm"
            />
          </div>

          {/* Template */}
          <div className="space-y-2">
            <Label htmlFor="template" className="text-sm font-medium">
              Template *
            </Label>
            <Combobox
              options={[
                { value: "standard", label: "Standard NDA Template" },
                { value: "mutual", label: "Mutual NDA Template" },
                { value: "unilateral", label: "Unilateral NDA Template" },
                { value: "employee", label: "Employee NDA Template" },
                { value: "vendor", label: "Vendor NDA Template" },
              ]}
              value={formData.template}
              onValueChange={(value) => handleChange("template", value)}
              placeholder="เลือก Template"
              searchPlaceholder="ค้นหา Template..."
              className="text-sm"
            />
          </div>

          {/* Party A */}
          <div className="space-y-2">
            <Label htmlFor="partyA" className="text-sm font-medium flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              คู่สัญญาฝ่าย A *
            </Label>
            <Input
              id="partyA"
              placeholder="ชื่อบริษัท/องค์กร"
              value={formData.partyA}
              onChange={(e) => handleChange("partyA", e.target.value)}
              required
              className="text-sm"
            />
          </div>

          {/* Party B */}
          <div className="space-y-2">
            <Label htmlFor="partyB" className="text-sm font-medium flex items-center gap-2">
              <User className="h-4 w-4" />
              คู่สัญญาฝ่าย B *
            </Label>
            <Input
              id="partyB"
              placeholder="ชื่อบริษัท/บุคคล"
              value={formData.partyB}
              onChange={(e) => handleChange("partyB", e.target.value)}
              required
              className="text-sm"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                วันที่เริ่มต้น *
              </Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
                required
                className="text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate" className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                วันที่สิ้นสุด *
              </Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleChange("endDate", e.target.value)}
                required
                className="text-sm"
              />
            </div>
          </div>

          {/* Purpose */}
          <div className="space-y-2">
            <Label htmlFor="purpose" className="text-sm font-medium">
              วัตถุประสงค์ *
            </Label>
            <Textarea
              id="purpose"
              placeholder="ระบุวัตถุประสงค์ของการทำ NDA..."
              value={formData.purpose}
              onChange={(e) => handleChange("purpose", e.target.value)}
              required
              rows={4}
              className="text-sm"
            />
          </div>

          <DialogFooter className="flex gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={onClose}>
              ยกเลิก
            </Button>
            <Button type="submit" className="bg-[#7BC9A6] hover:bg-[#6ab394]">
              สร้าง NDA
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
