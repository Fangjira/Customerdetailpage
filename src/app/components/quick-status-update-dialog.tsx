import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Combobox } from "./ui/combobox";
import { Activity, Check, ChevronLeft, TrendingUp, TrendingDown } from "lucide-react";
import { toast } from "sonner";

interface QuickStatusUpdateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  dealId: string;
  dealName: string;
  currentStatus: string;
  onSave: (newStatus: string, notes: string, winLossReason?: string, winLossDetails?: string) => void;
}

const DEAL_STATUSES = [
  { value: "Prospect", label: "Prospect", color: "bg-gray-100 text-gray-700" },
  { value: "Approach", label: "Approach", color: "bg-indigo-100 text-indigo-700" },
  { value: "Quotation", label: "Quotation", color: "bg-blue-100 text-blue-700" },
  { value: "Negotiating Process", label: "Negotiating Process", color: "bg-purple-100 text-purple-700" },
  { value: "Win", label: "Win", color: "bg-green-100 text-green-700" },
  { value: "Lose", label: "Lose", color: "bg-red-100 text-red-700" },
  { value: "On-hold", label: "On-hold", color: "bg-yellow-100 text-yellow-700" },
  { value: "Transfer", label: "Transfer", color: "bg-orange-100 text-orange-700" },
  { value: "Terminate", label: "Terminate", color: "bg-red-100 text-red-700" },
  { value: "Cancelled", label: "Cancelled", color: "bg-gray-100 text-gray-700" },
];

const WIN_REASONS = [
  { id: "price", label: "ราคาที่ดีกว่า (Better Price)", category: "commercial" },
  { id: "payment-terms", label: "เงื่อนไขการชำระที่ดีกว่า (Better Payment Terms)", category: "commercial" },
  { id: "service-quality", label: "คุณภาพบริการ (Service Quality)", category: "solution" },
  { id: "solution-fit", label: "โซลูชันที่ตรงความต้องการ (Solution Fit)", category: "solution" },
  { id: "response-speed", label: "ความเร็วในการตอบสนอง (Response Speed)", category: "solution" },
  { id: "relationship", label: "ความสัมพันธ์กับลูกค้า (Customer Relationship)", category: "relation" },
  { id: "reputation", label: "ชื่อเสียงและความน่าเชื่อถือ (Reputation & Credibility)", category: "relation" },
  { id: "other", label: "อื่นๆ (Other)", category: "other" },
];

const LOSS_REASONS = [
  { id: "price-higher", label: "แพ้ด้านราคา (ราคาสูงกว่าคู่แข่ง) (Lost on Price)", category: "commercial" },
  { id: "payment-terms", label: "เงื่อนไขการชำระไม่ดีพอ (Unfavorable Payment Terms)", category: "commercial" },
  { id: "competitor-chosen", label: "ลูกค้าเลือกคู่แข่ง (Competitor Chosen)", category: "competition" },
  { id: "project-cancelled", label: "ลูกค้ายกเลิกโครงการ (Project Cancelled)", category: "customer" },
  { id: "budget-insufficient", label: "งบประมาณไม่เพียงพอ (Insufficient Budget)", category: "customer" },
  { id: "solution-not-fit", label: "โซลูชันไม่ตรงกับความต้องการ (Solution Not Fit)", category: "solution" },
  { id: "service-quality", label: "คุณภาพบริการไม่ตรงความคาดหวัง (Service Quality Below Expectation)", category: "solution" },
  { id: "timing", label: "เวลาไม่เหมาะสม (Wrong Timing)", category: "other" },
  { id: "other", label: "อื่นๆ (Other)", category: "other" },
];

type Step = "select-status" | "select-reason" | "details";

export function QuickStatusUpdateDialog({
  isOpen,
  onClose,
  dealId,
  dealName,
  currentStatus,
  onSave,
}: QuickStatusUpdateDialogProps) {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [notes, setNotes] = useState("");
  const [winLossReason, setWinLossReason] = useState("");
  const [winLossDetails, setWinLossDetails] = useState("");
  const [step, setStep] = useState<Step>("select-status");

  const handleNext = () => {
    if (!selectedStatus) {
      toast.error("กรุณาเลือกสถานะ");
      return;
    }

    if (selectedStatus === currentStatus && !notes.trim()) {
      toast.error("กรุณาเลือกสถานะใหม่หรือเพิ่มหมายเหตุ");
      return;
    }

    // If Win or Loss selected, go to reason selection
    if (selectedStatus === "Win" || selectedStatus === "Lose") {
      setStep("select-reason");
    } else {
      // For other statuses, save directly
      handleSave();
    }
  };

  const handleReasonNext = () => {
    if (!winLossReason) {
      toast.error("กรุณาเลือกเหตุผล");
      return;
    }
    setStep("details");
  };

  const handleSave = () => {
    onSave(selectedStatus, notes, winLossReason, winLossDetails);
    handleClose();
  };

  const handleClose = () => {
    setSelectedStatus(currentStatus);
    setNotes("");
    setWinLossReason("");
    setWinLossDetails("");
    setStep("select-status");
    onClose();
  };

  const currentStatusObj = DEAL_STATUSES.find((s) => s.value === currentStatus);
  const selectedStatusObj = DEAL_STATUSES.find((s) => s.value === selectedStatus);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-base font-semibold">อัปเดตสถานะดีล</div>
              <div className="text-xs font-normal text-gray-500">{dealName}</div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Step 1: Select Status */}
          {step === "select-status" && (
            <>
              {/* Current Status Display */}
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">สถานะปัจจุบัน</p>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${currentStatusObj?.color}`}
                  >
                    {currentStatus}
                  </span>
                  <span className="text-xs text-gray-400">→</span>
                </div>
              </div>

              {/* New Status Selection */}
              <div className="space-y-2">
                <Label htmlFor="status" className="text-sm font-medium">
                  สถานะใหม่ <span className="text-red-500">*</span>
                </Label>
                <Combobox
                  options={DEAL_STATUSES.map((status) => ({
                    value: status.value,
                    label: `${status.label}${status.value === currentStatus ? ' (ปัจจุบัน)' : ''}`,
                  }))}
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                  placeholder="เลือกสถานะใหม่"
                  searchPlaceholder="ค้นหาสถานะ..."
                  className="h-10"
                />
              </div>

              {/* Status Change Preview */}
              {selectedStatus !== currentStatus && (
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <div className="flex items-center gap-2 text-xs">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-green-700 font-medium">
                      สถานะจะเปลี่ยนจาก{" "}
                      <span className="font-semibold">{currentStatus}</span> เป็น{" "}
                      <span className="font-semibold">{selectedStatus}</span>
                    </span>
                  </div>
                </div>
              )}

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-medium">
                  หมายเหตุ
                </Label>
                <Textarea
                  id="notes"
                  placeholder="เพิ่มหมายเหตุเกี่ยวกับการเปลี่ยนสถานะ... (ไม่บังคับ)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[100px] resize-none"
                />
                <p className="text-xs text-gray-500">
                  หมายเหตุจะถูกบันทึกในประวัติดีล
                </p>
              </div>
            </>
          )}

          {/* Step 2: Select Win/Loss Reason */}
          {step === "select-reason" && (
            <>
              {/* Show selected status */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
                <p className="text-xs text-gray-500 mb-1">สถานะที่เลือก</p>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${selectedStatusObj?.color}`}
                  >
                    {selectedStatus}
                  </span>
                  {selectedStatus === "Win" && <TrendingUp className="h-4 w-4 text-green-600" />}
                  {selectedStatus === "Lose" && <TrendingDown className="h-4 w-4 text-red-600" />}
                </div>
              </div>

              {/* Win Reason Selection */}
              {selectedStatus === "Win" && (
                <div className="space-y-2">
                  <Label htmlFor="win-reason" className="text-sm font-medium">
                    เหตุผลในการชนะ <span className="text-red-500">*</span>
                  </Label>
                  <Combobox
                    options={WIN_REASONS.map((reason) => ({
                      value: reason.id,
                      label: reason.label,
                    }))}
                    value={winLossReason}
                    onValueChange={setWinLossReason}
                    placeholder="เลือกเหตุผลในการชนะ"
                    searchPlaceholder="ค้นหา..."
                    className="h-10"
                  />
                </div>
              )}

              {/* Loss Reason Selection */}
              {selectedStatus === "Lose" && (
                <div className="space-y-2">
                  <Label htmlFor="loss-reason" className="text-sm font-medium">
                    เหตุผลในการแพ้ <span className="text-red-500">*</span>
                  </Label>
                  <Combobox
                    options={LOSS_REASONS.map((reason) => ({
                      value: reason.id,
                      label: reason.label,
                    }))}
                    value={winLossReason}
                    onValueChange={setWinLossReason}
                    placeholder="เลือกเหตุผลในการแพ้"
                    searchPlaceholder="ค้นหา..."
                    className="h-10"
                  />
                </div>
              )}

              {/* Step indicator */}
              <div className="text-xs text-gray-500 text-center">
                ขั้นตอน 2 จาก 3 • เลือกเหตุผล
              </div>
            </>
          )}

          {/* Step 3: Win/Loss Details */}
          {step === "details" && (
            <>
              {/* Show summary */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
                <p className="text-xs text-gray-500 mb-2">สรุป</p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600">สถานะ:</span>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${selectedStatusObj?.color}`}
                    >
                      {selectedStatus}
                    </span>
                  </div>
                  {winLossReason && (
                    <div className="flex items-start gap-2">
                      <span className="text-xs text-gray-600">เหตุผล:</span>
                      <span className="text-xs font-medium text-gray-900">
                        {selectedStatus === "Win"
                          ? WIN_REASONS.find((r) => r.id === winLossReason)?.label
                          : LOSS_REASONS.find((r) => r.id === winLossReason)?.label}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Details textarea */}
              <div className="space-y-2">
                <Label htmlFor="win-loss-details" className="text-sm font-medium">
                  รายละเอียดเพิ่มเติม
                </Label>
                <Textarea
                  id="win-loss-details"
                  placeholder={`เพิ่มรายละเอียดเพิ่มเติมเกี่ยวกับเหตุผลในการ${selectedStatus === "Win" ? "ชนะ" : "แพ้"}... (ไม่บังคับ)`}
                  value={winLossDetails}
                  onChange={(e) => setWinLossDetails(e.target.value)}
                  className="min-h-[100px] resize-none"
                />
                <p className="text-xs text-gray-500">
                  รายละเอียดเพิ่มเติมจะถูกบันทึกในประวัติดีล
                </p>
              </div>

              {/* Step indicator */}
              <div className="text-xs text-gray-500 text-center">
                ขั้นตอน 3 จาก 3 • รายละเอียดเพิ่มเติม
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            className="h-10 px-4"
          >
            ยกเลิก
          </Button>
          {step === "select-status" && (
            <Button
              onClick={handleNext}
              className="h-10 px-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
            >
              <Check className="h-4 w-4 mr-2" />
              บันทึกการเปลี่ยนแปลง
            </Button>
          )}
          {step === "select-reason" && (
            <div className="flex gap-2">
              <Button
                onClick={() => setStep("select-status")}
                className="h-10 px-4"
              >
                <ChevronLeft className="h-4 w-4" />
                กลับ
              </Button>
              <Button
                onClick={handleReasonNext}
                className="h-10 px-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
              >
                <Check className="h-4 w-4 mr-2" />
                บันทึกการเปลี่ยนแปลง
              </Button>
            </div>
          )}
          {step === "details" && (
            <div className="flex gap-2">
              <Button
                onClick={() => setStep("select-reason")}
                className="h-10 px-4"
              >
                <ChevronLeft className="h-4 w-4" />
                กลับ
              </Button>
              <Button
                onClick={handleSave}
                className="h-10 px-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
              >
                <Check className="h-4 w-4 mr-2" />
                บันทึกการเปลี่ยนแปลง
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}