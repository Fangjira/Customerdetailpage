import { Card, CardContent } from "./ui/card";
import { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
}

export function SummaryCard({
  title,
  value,
  icon: Icon,
  iconColor = "text-blue-500",
}: SummaryCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className={`rounded-lg bg-muted p-3 ${iconColor}`}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="mt-1">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
