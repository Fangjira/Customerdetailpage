import { Card, CardContent } from "./ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  colorClass?: string;
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  colorClass = "text-blue-600",
}: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={`${colorClass}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground truncate">{title}</p>
            <p className="mt-0.5 truncate">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
