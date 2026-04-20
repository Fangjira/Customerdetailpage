import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import {
  Bell,
  Check,
  CheckCheck,
  FileText,
  DollarSign,
  Calendar,
  AlertCircle,
  UserPlus,
  MessageSquare,
  TrendingUp,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface Notification {
  id: string;
  type: "approval" | "task" | "deal" | "comment" | "system" | "customer";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority?: "high" | "medium" | "low";
  actionUrl?: string;
}

export function NotificationCenter() {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "approval",
      title: "Approval Required",
      message: "Contract APR-2024-1205 needs your approval",
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      read: false,
      priority: "high",
    },
    {
      id: "2",
      type: "task",
      title: "Task Due Soon",
      message: "Follow up with Global Freight Solutions - Due in 2 hours",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      read: false,
      priority: "high",
    },
    {
      id: "3",
      type: "deal",
      title: "Deal Updated",
      message: "Deal D-2024-089 moved to Negotiation stage",
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      read: false,
      priority: "medium",
    },
    {
      id: "4",
      type: "comment",
      title: "New Comment",
      message: "Sarah Chen mentioned you in a comment",
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      read: false,
    },
    {
      id: "5",
      type: "customer",
      title: "New Customer",
      message: "Global Tech Industries added to your account",
      timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
      read: true,
    },
    {
      id: "6",
      type: "system",
      title: "System Update",
      message: "Weekly report is now available for download",
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      read: true,
    },
    {
      id: "7",
      type: "approval",
      title: "Approval Completed",
      message: "Your quotation Q-2024-156 has been approved",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      read: true,
    },
    {
      id: "8",
      type: "deal",
      title: "Deal Won",
      message: "Congratulations! Deal D-2024-075 is closed-won ($2.5M)",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      read: true,
    },
  ]);

  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case "approval":
        return <FileText className="h-4 w-4 text-[#705add]" />;
      case "task":
        return <Calendar className="h-4 w-4 text-[#f59e0b]" />;
      case "deal":
        return <DollarSign className="h-4 w-4 text-[#10b981]" />;
      case "comment":
        return <MessageSquare className="h-4 w-4 text-[#3b82f6]" />;
      case "customer":
        return <UserPlus className="h-4 w-4 text-[#8b5cf6]" />;
      case "system":
        return <AlertCircle className="h-4 w-4 text-[#6b7280]" />;
      default:
        return <Bell className="h-4 w-4 text-[#6b7280]" />;
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diff = now.getTime() - then.getTime();
    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return t("notifications.just_now");
    if (minutes < 60) return t("notifications.minutes_ago", { count: minutes });
    if (hours < 24) return t("notifications.hours_ago", { count: hours });
    return t("notifications.days_ago", { count: days });
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-lg hover:bg-gray-100 h-10 w-10 shadow-sm"
        >
          <Bell className="h-5 w-5 text-gray-700" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500 text-white text-xs font-bold shadow-md">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[420px] p-0" align="end">
        <div className="border-b border-[#ede9fe] p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-[#4c1d95]">
              {t("notifications.title")}
            </h3>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs text-[#705add] hover:bg-[#f5f3ff] h-7 px-2"
              >
                <CheckCheck className="h-3 w-3 mr-1" />
                {t("notifications.mark_all_read")}
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
              className={
                filter === "all"
                  ? "bg-[#705add] text-white hover:bg-[#5b21b6] h-8 text-xs"
                  : "border-[#ede9fe] text-[#705add] hover:bg-[#f5f3ff] h-8 text-xs"
              }
            >
              {t("notifications.all")} ({notifications.length})
            </Button>
            <Button
              variant={filter === "unread" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("unread")}
              className={
                filter === "unread"
                  ? "bg-[#705add] text-white hover:bg-[#5b21b6] h-8 text-xs"
                  : "border-[#ede9fe] text-[#705add] hover:bg-[#f5f3ff] h-8 text-xs"
              }
            >
              {t("notifications.unread")} ({unreadCount})
            </Button>
          </div>
        </div>

        <ScrollArea className="h-[480px]">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Bell className="h-12 w-12 text-[#d1d5db] mb-3" />
              <p className="text-sm text-[#9333ea]">
                {t("notifications.no_notifications")}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#ede9fe]">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`p-4 hover:bg-[#faf8ff] cursor-pointer transition-colors relative group ${
                    !notification.read ? "bg-[#f5f3ff]" : ""
                  }`}
                >
                  <div className="flex gap-3">
                    <div
                      className={`h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        !notification.read ? "bg-white" : "bg-[#f5f3ff]"
                      }`}
                    >
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p
                          className={`text-sm font-medium ${
                            !notification.read
                              ? "text-[#4c1d95]"
                              : "text-[#6b7280]"
                          }`}
                        >
                          {notification.title}
                        </p>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => deleteNotification(notification.id, e)}
                          className="opacity-0 group-hover:opacity-100 h-6 w-6 text-[#9333ea] hover:text-[#4c1d95] hover:bg-white"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-xs text-[#9333ea] mb-2 line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#a78bfa]">
                          {getTimeAgo(notification.timestamp)}
                        </span>
                        {!notification.read && (
                          <div className="h-1.5 w-1.5 rounded-full bg-[#705add]" />
                        )}
                        {notification.priority === "high" && (
                          <Badge className="h-4 px-1.5 text-xs bg-[#fee2e2] text-[#991b1b] border-[#fca5a5]">
                            {t("priority.high")}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {filteredNotifications.length > 0 && (
          <div className="border-t border-[#ede9fe] p-3">
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-[#705add] hover:bg-[#f5f3ff] text-xs"
            >
              {t("notifications.view_all")}
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
