import { Badge } from "../ui/badge";
import { Clock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getHoursRemaining, formatRelativeTime } from "../../../utils/helpers";

interface SLAIndicatorProps {
  deadline: string;
  status: "on-time" | "warning" | "overdue";
  showTime?: boolean;
}

const statusConfig = {
  "on-time": {
    color: "bg-green-100 text-green-700 border-green-200",
    labelKey: "common.on_time",
  },
  "warning": {
    color: "bg-orange-100 text-orange-700 border-orange-200",
    labelKey: "common.warning",
  },
  "overdue": {
    color: "bg-red-100 text-red-700 border-red-200",
    labelKey: "common.overdue",
  },
};

export function SLAIndicator({ deadline, status, showTime = true }: SLAIndicatorProps) {
  const { t } = useTranslation();
  
  const config = statusConfig[status];
  const hoursRemaining = getHoursRemaining(deadline);
  const relativeTime = formatRelativeTime(deadline);
  
  const renderIcon = () => {
    switch (status) {
      case "on-time":
        return <CheckCircle2 className="h-3 w-3" />;
      case "warning":
        return <AlertTriangle className="h-3 w-3" />;
      case "overdue":
        return <AlertTriangle className="h-3 w-3" />;
      default:
        return <Clock className="h-3 w-3" />;
    }
  };
  
  return (
    <div className="flex items-center gap-2">
      <Badge 
        variant="outline" 
        className={`${config.color} border font-medium inline-flex items-center gap-1`}
      >
        {renderIcon()}
        {t(config.labelKey)}
      </Badge>
      {showTime && (
        <span className="text-xs text-muted-foreground">
          {status === "overdue" ? (
            <span className="text-red-600 font-medium">{relativeTime}</span>
          ) : hoursRemaining < 24 ? (
            <span className="text-orange-600 font-medium">{hoursRemaining}h remaining</span>
          ) : (
            relativeTime
          )}
        </span>
      )}
    </div>
  );
}