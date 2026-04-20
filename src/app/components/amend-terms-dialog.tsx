import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Combobox, ComboboxOption } from "./ui/combobox";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useTranslation } from "react-i18next";
import {
  CalendarIcon,
  Plus,
  X,
  Upload,
  FileText,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";
import { th } from "date-fns/locale";

interface AmendTermsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  contractData?: {
    contractNumber: string;
    contractTitle: string;
    customer: string;
    currentValue: string;
  };
}

interface Amendment {
  id: string;
  field: string;
  currentValue: string;
  newValue: string;
  effectiveDate: Date | undefined;
}

export function AmendTermsDialog({
  isOpen,
  onClose,
  contractData,
}: AmendTermsDialogProps) {
  const { t } = useTranslation();
  const [effectiveDate, setEffectiveDate] = useState<Date>();
  const [amendments, setAmendments] = useState<Amendment[]>([
    {
      id: "1",
      field: "",
      currentValue: "",
      newValue: "",
      effectiveDate: undefined,
    },
  ]);

  const [formData, setFormData] = useState({
    amendmentType: "",
    amendmentNumber: "",
    reason: "",
    financialImpact: "",
    approvalRequired: "yes",
    notes: "",
  });

  const addAmendment = () => {
    setAmendments([
      ...amendments,
      {
        id: Date.now().toString(),
        field: "",
        currentValue: "",
        newValue: "",
        effectiveDate: undefined,
      },
    ]);
  };

  const removeAmendment = (id: string) => {
    if (amendments.length > 1) {
      setAmendments(amendments.filter((item) => item.id !== id));
    }
  };

  const updateAmendment = (
    id: string,
    field: keyof Amendment,
    value: any
  ) => {
    setAmendments(
      amendments.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSubmit = () => {
    const amendmentData = {
      ...formData,
      effectiveDate,
      amendments,
      contractNumber: contractData?.contractNumber,
      submittedDate: new Date(),
    };
    console.log("Submitting amendment:", amendmentData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#4c1d95]">
            แก้ไขเงื่อนไขสัญญา (Contract Amendment)
          </DialogTitle>
          <DialogDescription className="space-y-1">
            <span className="text-[#22c55e] block">
              {contractData?.contractTitle || "Master Service Agreement"}
            </span>
            <span className="text-sm text-gray-600 block">
              เลขที่สัญญา: {contractData?.contractNumber || "CNT-2024-4820"}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Amendment Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#4c1d95] border-b border-[#ede9fe] pb-2">
              ข้อมูลการแก้ไข
            </h3>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-sm text-[#4c1d95] mb-2 block">
                  ประเภทการแก้ไข
                </Label>
                <Combobox
                  options={[
                    { value: "pricing", label: "การเปลี่ยนแปลงราคา" },
                    { value: "scope", label: "ขอบเขตบริการ" },
                    { value: "term", label: "ระยะเวลาสัญญา" },
                    { value: "payment", label: "เงื่อนไขการชำระเงิน" },
                    { value: "volume", label: "ปริมาณการใช้งาน" },
                    { value: "sla", label: "Service Level Agreement" },
                    { value: "other", label: "อื่นๆ" },
                  ]}
                  value={formData.amendmentType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, amendmentType: value })
                  }
                  placeholder="เลือกประเภท"
                  searchPlaceholder="ค้นหาประเภท..."
                  className="border-2 border-[#ede9fe] rounded-xl"
                />
              </div>

              <div>
                <Label className="text-sm text-[#4c1d95] mb-2 block">
                  เลขที่การแก้ไข
                </Label>
                <Input
                  value={formData.amendmentNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      amendmentNumber: e.target.value,
                    })
                  }
                  placeholder="AMD-2024-001"
                  className="border-2 border-[#ede9fe] rounded-xl focus:border-[#705add]"
                />
              </div>

              <div>
                <Label className="text-sm text-[#4c1d95] mb-2 block">
                  วันที่มีผลบังคับใช้
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left border-2 border-[#ede9fe] rounded-xl hover:bg-[#f5f3ff]"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-[#22c55e]" />
                      {effectiveDate ? (
                        format(effectiveDate, "PPP", { locale: th })
                      ) : (
                        <span className="text-gray-500">เลือกวันที่</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={effectiveDate}
                      onSelect={setEffectiveDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div>
              <Label className="text-sm text-[#4c1d95] mb-2 block">
                เหตุผลในการแก้ไข
              </Label>
              <Textarea
                rows={3}
                value={formData.reason}
                onChange={(e) =>
                  setFormData({ ...formData, reason: e.target.value })
                }
                placeholder="ระบุเหตุผลในการขอแก้ไขสัญญา เช่น การเปลี่ยนแปลงปริมาณงาน, การปรับราคาตามตลาด, ฯลฯ"
                className="border-2 border-[#ede9fe] rounded-xl focus:border-[#705add]"
              />
            </div>
          </div>

          {/* Amendment Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#f0fdf4] pb-2">
              <h3 className="text-sm font-semibold text-[#15803d]">
                รายละเอียดการเปลี่ยนแปลง
              </h3>
              <Button
                size="sm"
                onClick={addAmendment}
                className="bg-gradient-to-r from-[#a78bfa] to-[#705add] hover:from-[#8b5cf6] hover:to-[#6d28d9] text-white rounded-xl border-0"
              >
                <Plus className="h-4 w-4 mr-1" />
                เพิ่มรายการ
              </Button>
            </div>

            <div className="space-y-3">
              {amendments.map((amendment, index) => (
                <div
                  key={amendment.id}
                  className="p-4 bg-[#f0fdf4] rounded-xl border-2 border-[#f0fdf4]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-sm font-medium text-[#16a34a]">
                      รายการที่ {index + 1}
                    </h4>
                    {amendments.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAmendment(amendment.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-3">
                      <Label className="text-xs text-[#22c55e] mb-1 block">
                        ช่องข้อมูล
                      </Label>
                      <Combobox
                        options={[
                          { value: "contract_value", label: "มูลค่าสัญญา" },
                          { value: "payment_terms", label: "เงื่อนไขการชำระเงิน" },
                          { value: "service_rate", label: "อัตราค่าบริการ" },
                          { value: "volume", label: "ปริมาณการใช้งาน" },
                          { value: "end_date", label: "วันที่สิ้นสุดสัญญา" },
                          { value: "credit_limit", label: "วงเงินเครดิต" },
                          { value: "sla", label: "SLA" },
                          { value: "scope", label: "ขอบเขตบริการ" },
                          { value: "other", label: "อื่นๆ" },
                        ]}
                        value={amendment.field}
                        onValueChange={(value) =>
                          updateAmendment(amendment.id, "field", value)
                        }
                        placeholder="เลือกช่อง"
                        searchPlaceholder="ค้นหาช่อง..."
                        className="border-2 border-[#f0fdf4] rounded-lg text-sm"
                      />
                    </div>

                    <div className="col-span-4">
                      <Label className="text-xs text-[#22c55e] mb-1 block">
                        ค่าเดิม (Current Value)
                      </Label>
                      <Input
                        value={amendment.currentValue}
                        onChange={(e) =>
                          updateAmendment(
                            amendment.id,
                            "currentValue",
                            e.target.value
                          )
                        }
                        placeholder="ค่าที่ใช้อยู่ปัจจุบัน"
                        className="border-2 border-[#f0fdf4] rounded-lg text-sm bg-gray-50"
                      />
                    </div>

                    <div className="col-span-4">
                      <Label className="text-xs text-[#22c55e] mb-1 block">
                        ค่าใหม่ (New Value)
                      </Label>
                      <Input
                        value={amendment.newValue}
                        onChange={(e) =>
                          updateAmendment(
                            amendment.id,
                            "newValue",
                            e.target.value
                          )
                        }
                        placeholder="ค่าใหม่ที่ต้องการเปลี่ยน"
                        className="border-2 border-[#f0fdf4] rounded-lg text-sm"
                      />
                    </div>

                    <div className="col-span-1 flex items-end">
                      <div className="text-center text-xs text-gray-500">
                        →
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Impact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#4c1d95] border-b border-[#ede9fe] pb-2">
              ผลกระทบทางการเงิน
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-[#4c1d95] mb-2 block">
                  มูลค่าผลกระทบ (Impact Value)
                </Label>
                <Input
                  type="text"
                  value={formData.financialImpact}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      financialImpact: e.target.value,
                    })
                  }
                  placeholder="เช่น +$50,000, -$10,000, หรือ 0"
                  className="border-2 border-[#ede9fe] rounded-xl focus:border-[#705add]"
                />
                <p className="text-xs text-gray-500 mt-1">
                  ระบุเป็นตัวเลข + (เพิ่มขึ้น) หรือ - (ลดลง)
                </p>
              </div>

              <div>
                <Label className="text-sm text-[#4c1d95] mb-2 block">
                  ต้องการอนุมัติ?
                </Label>
                <Combobox
                  options={[
                    { value: "yes", label: "ต้องการอนุมัติ" },
                    { value: "no", label: "ไม่ต้ออนุมัติ" },
                  ]}
                  value={formData.approvalRequired}
                  onValueChange={(value) =>
                    setFormData({ ...formData, approvalRequired: value })
                  }
                  placeholder="เลือก..."
                  searchPlaceholder="ค้นหา..."
                  className="border-2 border-[#ede9fe] rounded-xl"
                />
              </div>
            </div>

            {formData.approvalRequired === "yes" && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-3 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium">การแก้ไขนี้ต้องการการอนุมัติ</p>
                  <p className="text-xs mt-1">
                    เอกสารจะถูกส่งไปยังผู้มีอำนาจอนุมัติตามลำดับขั้นตอน:
                    ผู้จัดการฝ่ายขาย → การเงิน → กฎหมาย → ผู้บริหาร
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Documents Upload */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#4c1d95] border-b border-[#ede9fe] pb-2">
              เอกสารแนบ
            </h3>

            <div className="border-2 border-dashed border-[#f0fdf4] rounded-xl p-6 text-center hover:bg-[#f0fdf4] transition-colors">
              <Upload className="h-8 w-8 text-[#22c55e] mx-auto mb-2" />
              <p className="text-sm text-[#4c1d95] font-medium">
                อัปโหลดเอกสารประกอบการแก้ไข
              </p>
              <p className="text-xs text-gray-500 mt-1">
                รองรับไฟล์ PDF, DOC, DOCX ขนาดไม่เกิน 10MB
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-3 border-2 border-[#f0fdf4] text-[#16a34a] hover:bg-[#f0fdf4] rounded-xl"
              >
                <FileText className="h-4 w-4 mr-2" />
                เลือกไฟล์
              </Button>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#4c1d95] border-b border-[#ede9fe] pb-2">
              หมายเหตุเพิ่มเติม
            </h3>

            <div>
              <Label className="text-sm text-[#4c1d95] mb-2 block">
                ข้อมูลเพิ่มเติม
              </Label>
              <Textarea
                rows={4}
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                placeholder="ระบุรายละเอียดเพิ่มเติม เงื่อนไขพิเศษ หรือข้อมูลที่เกี่ยวข้อง..."
                className="border-2 border-[#ede9fe] rounded-xl focus:border-[#705add]"
              />
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gradient-to-br from-[#f0fdf4] to-white rounded-xl p-4 border-2 border-[#f0fdf4]">
            <h4 className="text-sm font-semibold text-[#4c1d95] mb-3">
              สรุปการแก้ไข
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-600">จำนวนรายการที่แก้ไข:</span>
                <span className="ml-2 font-medium text-[#705add]">
                  {amendments.length} รายการ
                </span>
              </div>
              <div>
                <span className="text-gray-600">ผลกระทบทางการเงิน:</span>
                <span className="ml-2 font-medium text-[#705add]">
                  {formData.financialImpact || "ยังไม่ระบุ"}
                </span>
              </div>
              <div>
                <span className="text-gray-600">วันที่มีผล:</span>
                <span className="ml-2 font-medium text-[#705add]">
                  {effectiveDate
                    ? format(effectiveDate, "PPP", { locale: th })
                    : "ยังไม่ระบุ"}
                </span>
              </div>
              <div>
                <span className="text-gray-600">สถานะอนุมัติ:</span>
                <span className="ml-2 font-medium text-[#705add]">
                  {formData.approvalRequired === "yes"
                    ? "ต้องการอนุมัติ"
                    : "ไม่ต้องอนุมัติ"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-[#f0fdf4]">
          <div className="text-sm text-[#22c55e]">
            การแก้ไขจะถูกบันทึกในสถานะ "รออนุมัติ"
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-2 border-[#ede9fe] text-[#4c1d95] hover:bg-[#f5f3ff] rounded-xl"
            >
              {t("common.cancel")}
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-[#4ade80] to-[#16a34a] hover:from-[#22c55e] hover:to-[#15803d] text-white rounded-xl border-0"
            >
              ส่งขออนุมัติการแก้ไข
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}