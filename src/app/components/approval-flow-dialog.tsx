import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { CheckCircle, Clock, Circle, XCircle, User } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ApprovalStep {
  id: string;
  stage: string;
  approver: string;
  status: "completed" | "current" | "pending" | "rejected";
  date?: string;
  comment?: string;
}

interface ApprovalFlowDialogProps {
  isOpen: boolean;
  onClose: () => void;
  approval: any;
  steps: ApprovalStep[];
}

export function ApprovalFlowDialog({
  isOpen,
  onClose,
  approval,
  steps,
}: ApprovalFlowDialogProps) {
  const { t } = useTranslation();

  if (!approval) return null;

  const getStepIcon = (status: ApprovalStep["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-6 w-6 text-[#166534]" />;
      case "current":
        return <Clock className="h-6 w-6 text-[#92400e]" />;
      case "rejected":
        return <XCircle className="h-6 w-6 text-[#991b1b]" />;
      default:
        return <Circle className="h-6 w-6 text-muted-foreground" />;
    }
  };

  const getStepBadge = (status: ApprovalStep["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-[#dcfce7] text-[#166534] border-[#86efac]">
            {t("status.completed")}
          </Badge>
        );
      case "current":
        return (
          <Badge className="bg-[#fef3c7] text-[#92400e] border-[#fcd34d]">
            {t("status.in_progress")}
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-[#fee2e2] text-[#991b1b] border-[#fca5a5]">
            {t("rejected")}
          </Badge>
        );
      default:
        return (
          <Badge className="bg-muted text-muted-foreground border-border">
            {t("status.pending")}
          </Badge>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {t("approvals.approval_flow")}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {t("approvals.approval_flow_description")}
          </DialogDescription>
          <div className="space-y-1 mt-2">
            <p className="text-sm text-foreground font-medium">{approval.title}</p>
            <p className="text-xs text-muted-foreground">{approval.id}</p>
          </div>
        </DialogHeader>

        <div className="mt-6">
          <div className="relative">
            {/* Vertical line connecting steps */}
            <div className="absolute left-[15px] top-8 bottom-8 w-0.5 bg-border"></div>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={step.id} className="relative pl-12">
                  {/* Step icon */}
                  <div
                    className={`absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center ${
                      step.status === "completed"
                        ? "bg-[#dcfce7]"
                        : step.status === "current"
                        ? "bg-[#fef3c7]"
                        : step.status === "rejected"
                        ? "bg-[#fee2e2]"
                        : "bg-muted"
                    }`}
                  >
                    {getStepIcon(step.status)}
                  </div>

                  {/* Step content */}
                  <div
                    className={`border rounded-lg p-4 ${
                      step.status === "current"
                        ? "border-[#fcd34d] bg-[#fef3c7]/10"
                        : "border-border bg-card"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-foreground">
                            {step.stage}
                          </h4>
                          {getStepBadge(step.status)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="h-3.5 w-3.5" />
                          <span>{step.approver}</span>
                        </div>
                      </div>
                      {step.date && (
                        <div className="text-xs text-muted-foreground">
                          {step.date}
                        </div>
                      )}
                    </div>

                    {step.comment && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">
                            {t("approvals.comment")}:{" "}
                          </span>
                          {step.comment}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[#166534]" />
                <span className="text-muted-foreground">
                  {steps.filter((s) => s.status === "completed").length}{" "}
                  {t("status.completed")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Circle className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {steps.filter((s) => s.status === "pending").length}{" "}
                  {t("status.pending")}
                </span>
              </div>
            </div>
            <div className="text-muted-foreground">
              {t("approvals.step")} {steps.findIndex((s) => s.status === "current") + 1} {t("approvals.of")} {steps.length}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}