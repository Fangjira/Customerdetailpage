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
  FileSignature,
  Calendar,
  FileText,
  CheckCircle,
  AlertCircle,
  DollarSign,
} from "lucide-react";
import { toast } from "sonner";

interface CreateContractDialogProps {
  isOpen: boolean;
  onClose: () => void;
  quotationData: any;
}

export function CreateContractFromQuotationDialog({
  isOpen,
  onClose,
  quotationData,
}: CreateContractDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    contractName: `สัญญา - ${quotationData?.name || ""}`,
    templateId: "",
    startDate: "",
    endDate: "",
    paymentTerms: "30",
    depositPercentage: "30",
    notes: "",
  });

  const contractTemplates = [
    { id: "1", name: "สัญญามาตรฐาน - บริการ" },
    { id: "2", name: "สัญญามาตรฐาน - สินค้า" },
    { id: "3", name: "สัญญาระยะยาว - Enterprise" },
    { id: "4", name: "สัญญา SaaS - Subscription" },
  ];

  const paymentTermOptions = [
    { value: "0", label: "ชำระทันที" },
    { value: "15", label: "15 วัน" },
    { value: "30", label: "30 วัน" },
    { value: "45", label: "45 วัน" },
    { value: "60", label: "60 วัน" },
    { value: "90", label: "90 วัน" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.templateId) {
      toast.error("กรุณาเลือกเทมเพลตสัญญา");
      return;
    }
    if (!formData.startDate || !formData.endDate) {
      toast.error("กรุณาระบุวันที่เริ่มและสิ้นสุดสัญญา");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const contractId = `CT-${Math.floor(Math.random() * 90000) + 10000}`;

      toast.success("สร้างสัญญาสำเร็จ!", {
        description: `สัญญาเลขที่ ${contractId} ถูกสร้างจากใบเสนอราคา ${quotationData.id}`,
      });

      // Reset form and close
      setFormData({
        contractName: "",
        templateId: "",
        startDate: "",
        endDate: "",
        paymentTerms: "30",
        depositPercentage: "30",
        notes: "",
      });
      onClose();
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด", {
        description: "ไม่สามารถสร้างสัญญาได้ กรุณาลองใหม่อีกครั้ง",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader className="border-b border-gray-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <FileSignature className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold text-gray-900">
                สร้างสัญญาจากใบเสนอราคา
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500 mt-1">
                สร้างสัญญาจากใบเสนอราคา {quotationData?.id}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Quotation Summary */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">
                  ข้อมูลใบเสนอราคา
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-blue-600">เลขที่:</span>{" "}
                    <span className="font-medium text-blue-900">
                      {quotationData?.id}
                    </span>
                  </div>
                  <div>
                    <span className="text-blue-600">ลูกค้า:</span>{" "}
                    <span className="font-medium text-blue-900">
                      {quotationData?.customer?.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-blue-600">มูลค่า:</span>{" "}
                    <span className="font-medium text-blue-900">
                      ฿{quotationData?.grandTotal?.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-blue-600">รายการ:</span>{" "}
                    <span className="font-medium text-blue-900">
                      {quotationData?.items?.length} รายการ
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contract Name */}
          <div className="space-y-2">
            <Label htmlFor="contractName" className="text-sm font-medium text-gray-900">
              ชื่อสัญญา <span className="text-red-500">*</span>
            </Label>
            <Input
              id="contractName"
              type="text"
              value={formData.contractName}
              onChange={(e) =>
                setFormData({ ...formData, contractName: e.target.value })
              }
              className="h-10 text-sm border-gray-300 focus:border-emerald-500"
              placeholder="ระบุชื่อสัญญา"
              required
            />
          </div>

          {/* Template Selection */}
          <div className="space-y-2">
            <Label htmlFor="template" className="text-sm font-medium text-gray-900">
              เทมเพลตสัญญา <span className="text-red-500">*</span>
            </Label>
            <Combobox
              options={contractTemplates.map((t) => ({
                value: t.id,
                label: t.name,
              }))}
              value={formData.templateId}
              onValueChange={(value) =>
                setFormData({ ...formData, templateId: value })
              }
              placeholder="เลือกเทมเพลตสัญญา"
              searchPlaceholder="ค้นหาเทมเพลต..."
              className="h-10 text-sm border-gray-300"
            />
            <p className="text-xs text-gray-500">
              เลือกเทมเพลตที่เหมาะสมกับประเภทสัญญา
            </p>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-sm font-medium text-gray-900">
                วันที่เริ่มสัญญา <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  className="h-10 text-sm pl-10 border-gray-300 focus:border-emerald-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate" className="text-sm font-medium text-gray-900">
                วันที่สิ้นสุดสัญญา <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  className="h-10 text-sm pl-10 border-gray-300 focus:border-emerald-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Payment Terms */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paymentTerms" className="text-sm font-medium text-gray-900">
                เงื่อนไขการชำระเงิน
              </Label>
              <Combobox
                options={paymentTermOptions}
                value={formData.paymentTerms}
                onValueChange={(value) =>
                  setFormData({ ...formData, paymentTerms: value })
                }
                placeholder="เลือกเงื่อนไข..."
                searchPlaceholder="ค้นหาเงื่อนไข..."
                className="h-10 text-sm border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="depositPercentage" className="text-sm font-medium text-gray-900">
                เงินมัดจำ (%)
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <Input
                  id="depositPercentage"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.depositPercentage}
                  onChange={(e) =>
                    setFormData({ ...formData, depositPercentage: e.target.value })
                  }
                  className="h-10 text-sm pl-10 border-gray-300 focus:border-emerald-500"
                  placeholder="30"
                />
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium text-gray-900">
              หมายเหตุเพิ่มเติม
            </Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="resize-none text-sm border-gray-300 focus:border-emerald-500"
              rows={3}
              placeholder="เพิ่มหมายเหตุหรือเงื่อนไขพิเศษ..."
            />
          </div>

          {/* Info Alert */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="text-sm font-medium text-amber-900 mb-1">
                  ข้อมูลสำคัญ
                </h5>
                <ul className="text-xs text-amber-800 space-y-1 list-disc list-inside">
                  <li>ข้อมูลรายการสินค้าและราคาจะถูกคัดลอกจากใบเสนอราคา</li>
                  <li>สัญญาจะถูกสร้างในสถานะ "Draft" และต้องส่งขอลายเซ็น</li>
                  <li>สามารถแก้ไขข้อมูลได้ภายหลังในหน้ารายละเอียดสัญญา</li>
                </ul>
              </div>
            </div>
          </div>
        </form>

        <DialogFooter className="border-t border-gray-200 pt-4">
          <div className="flex gap-3 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1 sm:flex-none h-10 px-6 text-sm"
              disabled={isSubmitting}
            >
              ยกเลิก
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              className="flex-1 sm:flex-none h-10 px-6 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  กำลังสร้าง...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  สร้างสัญญา
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
