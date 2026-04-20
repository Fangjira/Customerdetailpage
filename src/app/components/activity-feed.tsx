import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import {
  FileText,
  DollarSign,
  UserPlus,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Calendar,
  TrendingUp,
  Filter,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRoleTheme } from "../hooks/use-role-theme";

interface Activity {
  id: string;
  type:
    | "deal_created"
    | "deal_updated"
    | "deal_won"
    | "deal_lost"
    | "approval"
    | "customer_added"
    | "comment"
    | "meeting";
  user: string;
  userAvatar?: string;
  action: string;
  target: string;
  targetId?: string;
  timestamp: string;
  metadata?: {
    value?: number;
    status?: string;
    oldValue?: string;
    newValue?: string;
  };
}

export function ActivityFeed() {
  const { t } = useTranslation();
  const roleTheme = useRoleTheme();
  const [filter, setFilter] = useState<"all" | "today" | "week">("all");

  const activities: Activity[] = [
    {
      id: "1",
      type: "deal_won",
      user: "Sarah Chen",
      action: "won deal",
      target: "International Shipping Contract",
      targetId: "D-2024-089",
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      metadata: { value: 2450000, status: "Won" },
    },
    {
      id: "2",
      type: "approval",
      user: "Michael Park",
      action: "approved quotation",
      target: "Warehousing Services Quote",
      targetId: "Q-2024-156",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
      id: "3",
      type: "customer_added",
      user: "Emily Rodriguez",
      action: "added new customer",
      target: "Global Tech Industries",
      targetId: "C-1045",
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    },
    {
      id: "4",
      type: "deal_updated",
      user: "David Kim",
      action: "moved deal to",
      target: "Sea Freight Services",
      targetId: "D-2024-075",
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      metadata: { oldValue: "Proposal", newValue: "Negotiation" },
    },
    {
      id: "5",
      type: "comment",
      user: "Lisa Anderson",
      action: "commented on",
      target: "Annual Freight Agreement",
      targetId: "CON-2024-078",
      timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    },
    {
      id: "6",
      type: "meeting",
      user: "Sarah Chen",
      action: "scheduled meeting with",
      target: "Pacific Trade Corp",
      targetId: "M-2024-234",
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    },
    {
      id: "7",
      type: "deal_created",
      user: "Michael Park",
      action: "created new deal",
      target: "Express Delivery Services",
      targetId: "D-2024-103",
      timestamp: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
      metadata: { value: 850000 },
    },
    {
      id: "8",
      type: "deal_lost",
      user: "David Kim",
      action: "lost deal",
      target: "Customs Clearance Package",
      targetId: "D-2024-098",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      metadata: { value: 450000, status: "Lost to Competitor" },
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "deal_won":
        return <CheckCircle2 className="h-4 w-4 text-[#10b981]" />;
      case "deal_lost":
        return <XCircle className="h-4 w-4 text-[#ef4444]" />;
      case "deal_created":
      case "deal_updated":
        return <DollarSign className="h-4 w-4 text-[#0066FF]" />;
      case "approval":
        return <FileText className="h-4 w-4 text-[#f59e0b]" />;
      case "customer_added":
        return <UserPlus className="h-4 w-4 text-[#3b82f6]" />;
      case "comment":
        return <MessageSquare className="h-4 w-4 text-[#22c55e]" />;
      case "meeting":
        return <Calendar className="h-4 w-4 text-[#ec4899]" />;
      default:
        return <TrendingUp className="h-4 w-4 text-[#6b7280]" />;
    }
  };

  const getIconBgColor = (type: string) => {
    switch (type) {
      case "deal_won":
        return "bg-[#dcfce7]";
      case "deal_lost":
        return "bg-[#fee2e2]";
      case "deal_created":
      case "deal_updated":
        return "bg-[#F5F9FF]";
      case "approval":
        return "bg-[#fef3c7]";
      case "customer_added":
        return "bg-[#dbeafe]";
      case "comment":
        return "bg-[#f3e8ff]";
      case "meeting":
        return "bg-[#fce7f3]";
      default:
        return "bg-[#f3f4f6]";
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diff = now.getTime() - then.getTime();
    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return t("activity.just_now");
    if (minutes < 60) return t("activity.minutes_ago", { count: minutes });
    if (hours < 24) return t("activity.hours_ago", { count: hours });
    return t("activity.days_ago", { count: days });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="border-2 border-[#E6F0FF] shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-[#9B9BB5]">
            {t("activity.recent_activity")}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant={filter === "all" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("all")}
              className={
                filter === "all"
                  ? "bg-[#0066FF] text-white hover:bg-[#0054CC] h-8 text-xs"
                  : "text-[#0066FF] hover:bg-[#F5F9FF] h-8 text-xs"
              }
            >
              {t("activity.all")}
            </Button>
            <Button
              variant={filter === "today" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("today")}
              className={
                filter === "today"
                  ? "bg-[#0066FF] text-white hover:bg-[#0054CC] h-8 text-xs"
                  : "text-[#0066FF] hover:bg-[#F5F9FF] h-8 text-xs"
              }
            >
              {t("activity.today")}
            </Button>
            <Button
              variant={filter === "week" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("week")}
              className={
                filter === "week"
                  ? "bg-[#0066FF] text-white hover:bg-[#0054CC] h-8 text-xs"
                  : "text-[#0066FF] hover:bg-[#F5F9FF] h-8 text-xs"
              }
            >
              {t("activity.this_week")}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className="flex gap-4 pb-4 border-b border-[#E6F0FF] last:border-0 last:pb-0"
              >
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div
                    className={`h-10 w-10 rounded-xl ${getIconBgColor(
                      activity.type
                    )} flex items-center justify-center flex-shrink-0`}
                  >
                    {getIcon(activity.type)}
                  </div>
                  {index < activities.length - 1 && (
                    <div className="w-0.5 flex-1 bg-[#E6F0FF] mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Avatar className="h-6 w-6 border border-[#E6F0FF]">
                          <AvatarFallback className="bg-[#0066FF] text-white text-xs">
                            {getInitials(activity.user)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-[#9B9BB5] text-sm">
                          {activity.user}
                        </span>
                        <span className="text-sm text-[#9B9BB5]">
                          {activity.action}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-[#0066FF] mb-1">
                        {activity.target}
                        {activity.targetId && (
                          <span className="text-xs text-[#3385FF] ml-2">
                            {activity.targetId}
                          </span>
                        )}
                      </p>
                      {activity.metadata && (
                        <div className="flex items-center gap-2 mt-2">
                          {activity.metadata.value && (
                            <Badge className="bg-[#dcfce7] text-[#166534] border-[#86efac] text-xs">
                              ${(activity.metadata.value / 1000).toFixed(0)}K
                            </Badge>
                          )}
                          {activity.metadata.oldValue &&
                            activity.metadata.newValue && (
                              <div className="flex items-center gap-1 text-xs">
                                <Badge className="bg-[#f3f4f6] text-[#6b7280] border-[#d1d5db]">
                                  {activity.metadata.oldValue}
                                </Badge>
                                <span className="text-[#9B9BB5]">→</span>
                                <Badge className="bg-[#F5F9FF] text-[#0066FF] border-[#E6F0FF]">
                                  {activity.metadata.newValue}
                                </Badge>
                              </div>
                            )}
                          {activity.metadata.status && (
                            <Badge
                              className={
                                activity.metadata.status.includes("Lost")
                                  ? "bg-[#fee2e2] text-[#991b1b] border-[#fca5a5] text-xs"
                                  : "bg-[#dcfce7] text-[#166534] border-[#86efac] text-xs"
                              }
                            >
                              {activity.metadata.status}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-[#3385FF] whitespace-nowrap">
                      {getTimeAgo(activity.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}