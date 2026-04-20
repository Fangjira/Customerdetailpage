import { Badge } from "../ui/badge";
import { useTranslation } from "react-i18next";
import { getStatusColor } from "../../../utils/helpers";

interface StatusBadgeProps {
  status: string;
  translationKey?: string;
  size?: "sm" | "md" | "lg";
}

const colorClasses = {
  red: "bg-red-100 text-red-700 border-red-200",
  orange: "bg-orange-100 text-orange-700 border-orange-200",
  yellow: "bg-yellow-100 text-yellow-700 border-yellow-200",
  green: "bg-green-100 text-green-700 border-green-200",
  blue: "bg-blue-100 text-blue-700 border-blue-200",
  purple: "bg-green-100 text-green-700 border-green-200",
  cyan: "bg-cyan-100 text-cyan-700 border-cyan-200",
  gray: "bg-gray-100 text-gray-700 border-gray-200",
};

const sizeClasses = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-2.5 py-1",
  lg: "text-base px-3 py-1.5",
};

export function StatusBadge({ status, translationKey, size = "md" }: StatusBadgeProps) {
  const { t } = useTranslation();
  
  const color = getStatusColor(status);
  const colorClass = colorClasses[color as keyof typeof colorClasses] || colorClasses.gray;
  const sizeClass = sizeClasses[size];
  
  const label = translationKey 
    ? t(translationKey) 
    : status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return (
    <Badge 
      variant="outline" 
      className={`${colorClass} ${sizeClass} border font-medium`}
    >
      {label}
    </Badge>
  );
}