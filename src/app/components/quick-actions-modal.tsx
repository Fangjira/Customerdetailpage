import { X, ClipboardList, TrendingUp, Users, MapPinCheck, UserPlus , layoutlist ,telescope } from "lucide-react";
import { useRoleTheme } from "../hooks/use-role-theme";

interface QuickActionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (path: string) => void;
  onTasks: () => void;
  onCheckIn: () => void
  onCreateDeal: () => void
  onAcitivity_visit: () => void;
}

export function QuickActionsModal({
  isOpen,
  onClose,
  onNavigate,
  onTasks,
  onCheckIn,
  onCreateDeal,
  onAcitivity_visit,
}: QuickActionsModalProps) {
  const roleTheme = useRoleTheme();

  if (!isOpen) return null;

  const actions = [
    {
      id: "deal",
      label: "Quick Deal",
      labelTh: "สร้างดีล",
      icon: TrendingUp,
      gradient: "linear-gradient(135deg, #10b981, #059669)",
      onClick: () => {
        onNavigate?.("/deals/create");
        onClose();
      },
    },
    {
      id: "customer",
      label: "Quick Customer",
      labelTh: "สร้างลูกค้า",
      icon: Users,
      gradient: "linear-gradient(135deg, #3b82f6, #2563eb)",
      onClick: () => {
        onNavigate?.("/customers/add");
        onClose();
      },
    },
    {
      id: "checkin",
      label: "Quick Visit",
      labelTh: "เช็คอิน",
      icon: MapPinCheck,
      gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
      onClick: () => {
        onCheckIn();
        onClose();
      },
    },
    {
      id: "Tasks",
      label: "Quick Tasks",
      labelTh: "สร้าง TO-DO",
      icon: layoutlist,
      gradient: `linear-gradient(135deg, ${roleTheme.gradientFrom}, ${roleTheme.gradientTo})`,
      onClick: () => {
        onNavigate?.("/tasks/create");
        onClose();
      },
    },
  {
      id: "Acitivity_visit",
      label: "Quick Acitivity_visit",
      labelTh: "สร้างกิจกรรม",
      icon: telescope,
      gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
      onClick: () => {
        onNavigate?.("/calendar/add");
        onClose();
      },
    },
    {
      id: "lead",
      label: "Quick Lead",
      labelTh: "สร้างลีด",
      icon: UserPlus,
      gradient: "linear-gradient(135deg, #ec4899, #db2777)",
      onClick: () => {
        onNavigate?.("/leads/add");
        onClose();
      },
    },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-3xl shadow-2xl w-[90%] max-w-md animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Actions Grid */}
        <div className="p-6 pb-8">
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={action.onClick}
                  className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white border border-gray-200 hover:shadow-lg transition-all active:scale-95"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-3 shadow-md"
                    style={{ background: action.gradient }}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {action.labelTh}
                  </span>
                  <span className="text-xs text-gray-500 mt-0.5">
                    {action.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Handle */}
        <div className="flex justify-center pb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>
      </div>
    </>
  );
}
