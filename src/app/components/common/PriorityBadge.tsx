import { Badge } from "../ui/badge";
import { useTranslation } from "react-i18next";
import { getPriorityColor } from "../../../utils/helpers";
import { AlertCircle, AlertTriangle, Info, Minus } from "lucide-react";

interface PriorityBadgeProps {
  priority: string;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
}

const colorClasses = {
  red: "bg-red-100 text-red-700 border-red-200",
  orange: "bg-orange-100 text-orange-700 border-orange-200",
  yellow: "bg-yellow-100 text-yellow-700 border-yellow-200",
  blue: "bg-blue-100 text-blue-700 border-blue-200",
  gray: "bg-gray-100 text-gray-700 border-gray-200",
};

export function PriorityBadge({ priority, showIcon = true, size = "md" }: PriorityBadgeProps) {
  const { t } = useTranslation();
  
  const color = getPriorityColor(priority);
  const colorClass = colorClasses[color as keyof typeof colorClasses] || colorClasses.gray;
  
  const label = priority.toUpperCase();
  
  const renderIcon = () => {
    if (!showIcon) return null;
    
    switch (priority) {
      case "p1":
      case "high":
        return <AlertCircle className="h-3 w-3" />;
      case "p2":
        return <AlertTriangle className="h-3 w-3" />;
      case "p3":
      case "medium":
        return <Info className="h-3 w-3" />;
      case "p4":
      case "p5":
      case "low":
        return <Minus className="h-3 w-3" />;
      default:
        return <Info className="h-3 w-3" />;
    }
  };
  
  return (
    <Badge 
      variant="outline" 
      className={`${colorClass} border font-medium inline-flex items-center gap-1`}
    >
      {renderIcon()}
      {label}
    </Badge>
  );
}