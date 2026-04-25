import { useMemo } from "react";
import { X, MapPin, Briefcase, CheckSquare, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";


interface QuickActionsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onQuickVisit: () => void;
  onQuickDeal: () => void;
  onQuickActivity_Visit: () => void;
  onQuickCreatetask: () => void;
}

export function QuickActionsMenu({
  isOpen,
  onClose,
  onQuickVisit,
  onQuickDeal,
  onQuickActivity_Visit,
  onQuickCreatetask,
}: QuickActionsMenuProps) {
  const { t } = useTranslation();

  const actions = useMemo(() => [
    {
      icon: MapPin,
      label: "Quick Visit",
      labelKey: "Check IN",
      onClick: onQuickVisit,
      bgColor: "#3B82F6",
    },
    {
      icon: Briefcase,
      label: "Quick Deal",
      labelKey: "Create Deal",
      onClick: onQuickDeal,
      bgColor: "#10B981",
    },
    {
      icon: CheckSquare,
      label: "Quick Activity Visit",
      labelKey: "Create Activity Visit",
      onClick: onQuickActivity_Visit,
      bgColor: "#F59E0B",
    },
    {
      icon: CheckCircle2,
      label: "Quick CreateTask",
      labelKey: "Create TO-DO",
      onClick: onQuickCreatetask,
      bgColor: "#7BC9A6",
    },
  ], [onQuickVisit, onQuickDeal, onQuickActivity_Visit, onQuickCreatetask]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader className="border-b pb-3 -m-6 px-6 pt-6 mb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">
              Quick Actions
            </DialogTitle>
            <button
              onClick={onClose}
              className="h-8 w-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        
          <DialogDescription className="sr-only">
            Dialog description
          </DialogDescription></DialogHeader>

        <div className="grid grid-cols-2 gap-4 pb-2">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={() => {
                  action.onClick();
                  onClose();
                }}
                className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: action.bgColor }}
                >
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {action.labelKey ? t(action.labelKey, action.label) : action.label}
                </span>
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
