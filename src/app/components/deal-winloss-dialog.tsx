import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Check, TrendingUp, TrendingDown, X, ChevronLeft } from "lucide-react";
import { toast } from "sonner";

interface DealWinLossDialogProps {
  isOpen: boolean;
  onClose: () => void;
  dealId: string;
  dealName: string;
  onSave: (type: "win" | "loss", reason: string, details: string) => void;
}

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

export function DealWinLossDialog({
  isOpen,
  onClose,
  dealId,
  dealName,
  onSave,
}: DealWinLossDialogProps) {
  const [selectedType, setSelectedType] = useState<"win" | "loss" | null>(null);
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [details, setDetails] = useState("");

  const handleClose = () => {
    setSelectedType(null);
    setSelectedReason("");
    setDetails("");
    onClose();
  };

  const handleSave = () => {
    if (!selectedType) {
      toast.error("กรุณาเลือก Win หรือ Loss");
      return;
    }

    if (!selectedReason) {
      toast.error("กรุณาเลือกเหตุผล");
      return;
    }

    const reasonLabel =
      selectedType === "win"
        ? WIN_REASONS.find((r) => r.id === selectedReason)?.label
        : LOSS_REASONS.find((r) => r.id === selectedReason)?.label;

    onSave(selectedType, reasonLabel || selectedReason, details);
    toast.success(
      selectedType === "win"
        ? "บันทึกผลการ Win สำเร็จ! 🎉"
        : "บันทึกผลการ Loss สำเร็จ"
    );
    handleClose();
  };

  const handleBackFromReason = () => {
    setSelectedReason("");
    setDetails("");
  };

  const reasons = selectedType === "win" ? WIN_REASONS : LOSS_REASONS;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#4c1d95] flex items-center gap-2">
            {!selectedType && (
              <>
                <TrendingUp className="h-5 w-5 text-[#8b5cf6]" />
                อัปเดตสถานะดีล
              </>
            )}
            {selectedType === "win" && !selectedReason && (
              <>
                <TrendingUp className="h-5 w-5 text-green-600" />
                Win - เลือกเหตุผล
              </>
            )}
            {selectedType === "loss" && !selectedReason && (
              <>
                <TrendingDown className="h-5 w-5 text-red-600" />
                Loss - เลือกเหตุผล
              </>
            )}
            {selectedReason && (
              <>
                {selectedType === "win" ? (
                  <TrendingUp className="h-5 w-5 text-green-600" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-red-600" />
                )}
                รายละเอียดเพิ่มเติม
              </>
            )}
          </DialogTitle>
          <div className="mt-2">
            <p className="text-sm text-gray-600 font-medium">{dealName}</p>
            <p className="text-xs text-gray-500 mt-0.5">รหัสดีล: {dealId}</p>
          </div>
        
          <DialogDescription className="sr-only">
            Dialog description
          </DialogDescription></DialogHeader>

        <div className="py-4 space-y-4">
          {/* Step 1: Select Win or Loss */}
          {!selectedType && (
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700">
                เลือกผลลัพธ์ของดีล
              </Label>

              <button
                onClick={() => setSelectedType("win")}
                className="w-full p-4 rounded-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-green-900">Win</p>
                    <p className="text-xs text-green-700">ชนะดีลนี้แล้ว</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setSelectedType("loss")}
                className="w-full p-4 rounded-xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-rose-50 hover:from-red-100 hover:to-rose-100 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <TrendingDown className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-red-900">Loss</p>
                    <p className="text-xs text-red-700">แพ้หรือยกเลิกดีลนี้</p>
                  </div>
                </div>
              </button>
            </div>
          )}

          {/* Step 2: Select Reason */}
          {selectedType && !selectedReason && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedType(null)}
                  className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900"
                >
                  <ChevronLeft className="h-3 w-3" />
                  กลับ
                </button>
                <Label className="text-sm font-semibold text-gray-700">
                  เลือกเหตุผล
                </Label>
              </div>

              <div className="space-y-2">
                {reasons.map((reason) => (
                  <button
                    key={reason.id}
                    onClick={() => setSelectedReason(reason.id)}
                    className={`w-full p-3 rounded-lg border-2 text-left transition-all duration-200 hover:shadow-md ${
                      selectedType === "win"
                        ? "border-green-200 bg-green-50/50 hover:bg-green-100/70 hover:border-green-300"
                        : "border-red-200 bg-red-50/50 hover:bg-red-100/70 hover:border-red-300"
                    }`}
                  >
                    <p
                      className={`text-sm font-medium ${
                        selectedType === "win" ? "text-green-900" : "text-red-900"
                      }`}
                    >
                      {reason.label}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Enter Details */}
          {selectedReason && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleBackFromReason}
                  className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900"
                >
                  <ChevronLeft className="h-3 w-3" />
                  กลับ
                </button>
                <Label className="text-sm font-semibold text-gray-700">
                  {reasons.find((r) => r.id === selectedReason)?.label}
                </Label>
              </div>

              <div>
                <Label className="text-xs font-medium text-gray-700 mb-2 block">
                  รายละเอียดเพิ่มเติม (ไม่บังคับ)
                </Label>
                <Textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="ระบุรายละเอียดเพิ่มเติม..."
                  className={`min-h-[120px] text-sm border-2 rounded-xl ${
                    selectedType === "win"
                      ? "border-green-200 focus:border-green-400 bg-green-50/30"
                      : "border-red-200 focus:border-red-400 bg-red-50/30"
                  }`}
                />
              </div>

              <div
                className={`p-3 rounded-lg border-2 ${
                  selectedType === "win"
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <p
                  className={`text-xs font-semibold mb-1 ${
                    selectedType === "win" ? "text-green-900" : "text-red-900"
                  }`}
                >
                  สรุป
                </p>
                <p
                  className={`text-xs ${
                    selectedType === "win" ? "text-green-700" : "text-red-700"
                  }`}
                >
                  <span className="font-medium">ผลลัพธ์:</span>{" "}
                  {selectedType === "win" ? "Win" : "Loss"}
                </p>
                <p
                  className={`text-xs ${
                    selectedType === "win" ? "text-green-700" : "text-red-700"
                  }`}
                >
                  <span className="font-medium">เหตุผล:</span>{" "}
                  {reasons.find((r) => r.id === selectedReason)?.label}
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          {selectedReason && (
            <>
              <Button
                variant="outline"
                onClick={handleClose}
                className="border-2 border-gray-200 hover:bg-gray-100 rounded-xl"
              >
                <X className="h-4 w-4 mr-2" />
                ยกเลิก
              </Button>
              <Button
                onClick={handleSave}
                className={`rounded-xl gap-2 ${
                  selectedType === "win"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                <Check className="h-4 w-4" />
                บันทึก {selectedType === "win" ? "Win" : "Loss"}
              </Button>
            </>
          )}
          {!selectedReason && (
            <Button
              variant="outline"
              onClick={handleClose}
              className="w-full border-2 border-gray-200 hover:bg-gray-100 rounded-xl"
            >
              ปิด
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}