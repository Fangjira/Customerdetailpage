import { useDrag } from "react-dnd";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { DollarSign, Clock, CircleAlert } from "lucide-react";

export interface KanbanJobCard {
  id: string;
  customerName: string;
  assignedSales: string;
  dealValue: number;
  stage: string;
  dueDate?: string;
  hasFollowUp?: boolean;
  priority?: "low" | "medium" | "high";
}

interface JobCardKanbanCardProps {
  jobCard: KanbanJobCard;
  onClick?: (id: string) => void;
}

const ITEM_TYPE = "JOB_CARD";

export function JobCardKanbanCard({ jobCard, onClick }: JobCardKanbanCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPE,
    item: { id: jobCard.id, stage: jobCard.stage },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  };

  const isPastDue = (dueDate?: string) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  const formatDueDate = (dueDate?: string) => {
    if (!dueDate) return null;
    const date = new Date(dueDate);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays === -1) return "Yesterday";
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays < 7) return `${diffDays} days`;
    
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="cursor-move"
    >
      <Card
        className="hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => onClick?.(jobCard.id)}
      >
        <CardContent className="p-4 space-y-3">
          {/* Job Card ID and Priority */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{jobCard.id}</span>
            {jobCard.priority === "high" && (
              <Badge variant="destructive" className="h-5 px-1.5 text-xs">
                High
              </Badge>
            )}
          </div>

          {/* Customer Name */}
          <p className="line-clamp-2">{jobCard.customerName}</p>

          {/* Deal Value */}
          <div className="flex items-center gap-1.5 text-sm">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span>{formatCurrency(jobCard.dealValue)}</span>
          </div>

          {/* Status Indicators */}
          <div className="flex items-center gap-2">
            {jobCard.dueDate && (
              <Badge
                variant="outline"
                className={`text-xs ${
                  isPastDue(jobCard.dueDate)
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-blue-200 bg-blue-50 text-blue-700"
                }`}
              >
                <Clock className="mr-1 h-3 w-3" />
                {formatDueDate(jobCard.dueDate)}
              </Badge>
            )}
            {jobCard.hasFollowUp && (
              <Badge variant="outline" className="text-xs border-orange-200 bg-orange-50 text-orange-700">
                <CircleAlert className="mr-1 h-3 w-3" />
                Follow-up
              </Badge>
            )}
          </div>

          {/* Assigned Sales */}
          <div className="flex items-center gap-2 pt-2 border-t">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="bg-blue-500 text-white text-xs">
                {getInitials(jobCard.assignedSales)}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">
              {jobCard.assignedSales}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export { ITEM_TYPE };
