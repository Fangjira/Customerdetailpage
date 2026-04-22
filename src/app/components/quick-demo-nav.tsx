import { Button } from "./ui/button";
import { Calendar, Package } from "lucide-react";

/**
 * Quick Demo Navigation Component
 *
 * Use this temporarily to navigate to demos easily.
 *
 * To use:
 * 1. Import in App.tsx: import { QuickDemoNav } from "./components/quick-demo-nav";
 * 2. Add anywhere in your JSX: <QuickDemoNav onNavigate={handleNavigation} />
 * 3. Click the buttons to navigate
 */

interface QuickDemoNavProps {
  onNavigate: (path: string) => void;
}

export function QuickDemoNav({ onNavigate }: QuickDemoNavProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 p-4 bg-white rounded-lg shadow-2xl border-2 border-emerald-500">
      <div className="text-xs font-bold text-gray-700 mb-2">🚀 Quick Demo Access</div>

      <Button
        onClick={() => onNavigate("/task-activity-modal-demo")}
        className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
        size="sm"
      >
        <Calendar className="h-4 w-4 mr-2" />
        Task Modal Demo
      </Button>

      <Button
        onClick={() => onNavigate("/demos")}
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
        size="sm"
      >
        <Package className="h-4 w-4 mr-2" />
        Demo Center
      </Button>

      <div className="text-xs text-gray-500 mt-2 pt-2 border-t">
        Temporary navigation helper
      </div>
    </div>
  );
}
