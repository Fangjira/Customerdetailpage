import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import {
  Clock,
  User,
  Edit,
  Plus,
  Trash2,
  CheckCircle,
  XCircle,
  Mail,
  AlertCircle,
  ChevronRight,
  History as HistoryIcon
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { HistoryEntry } from "@/types/crm";

interface HistoryMenuProps {
  entries: HistoryEntry[];
  onViewAll?: () => void;
}

export function HistoryMenu({ entries, onViewAll }: HistoryMenuProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const getActionIcon = (action: HistoryEntry["action"]) => {
    switch (action) {
      case "created":
        return <Plus className="h-3.5 w-3.5 text-green-600" />;
      case "updated":
        return <Edit className="h-3.5 w-3.5 text-blue-600" />;
      case "deleted":
        return <Trash2 className="h-3.5 w-3.5 text-red-600" />;
      case "approved":
        return <CheckCircle className="h-3.5 w-3.5 text-green-600" />;
      case "rejected":
        return <XCircle className="h-3.5 w-3.5 text-red-600" />;
      case "sent":
        return <Mail className="h-3.5 w-3.5 text-purple-600" />;
      case "status_changed":
        return <AlertCircle className="h-3.5 w-3.5 text-orange-600" />;
      default:
        return <Clock className="h-3.5 w-3.5 text-gray-600" />;
    }
  };

  const getActionText = (action: HistoryEntry["action"]) => {
    switch (action) {
      case "created":
        return t("history.created");
      case "updated":
        return t("history.updated");
      case "deleted":
        return t("history.deleted");
      case "approved":
        return t("history.approved");
      case "rejected":
        return t("history.rejected");
      case "sent":
        return t("history.sent");
      case "status_changed":
        return t("history.status_changed");
      default:
        return action;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return t("history.just_now");
    if (diffMins < 60) return t("history.minutes_ago", { count: diffMins });
    if (diffHours < 24) return t("history.hours_ago", { count: diffHours });
    if (diffDays < 7) return t("history.days_ago", { count: diffDays });
    
    return date.toLocaleDateString();
  };

  const recentEntries = entries.slice(0, 10);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-[#705add] hover:text-[#5a47b3] hover:bg-[#faf8ff]"
        >
          <Clock className="h-4 w-4" />
          {t("history")}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[380px] p-0 border-2 border-[#ede9fe]" 
        align="end"
        sideOffset={5}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-[#ede9fe] bg-gradient-to-r from-[#faf8ff] to-white">
          <div className="flex items-center gap-2">
            <HistoryIcon className="h-4 w-4 text-[#705add]" />
            <span className="font-medium text-[#4c1d95]">
              {t("history")}
            </span>
          </div>
        </div>

        {/* Recent Activity */}
        {recentEntries.length > 0 ? (
          <>
            <div className="px-3 py-2">
              <p className="text-xs text-[#8b5cf6] uppercase tracking-wide">
                {t("history.recent_activity")}
              </p>
            </div>
            <ScrollArea className="max-h-[400px]">
              <div className="pb-2">
                {recentEntries.map((entry, index) => (
                  <div key={entry.id}>
                    <button
                      className="w-full px-4 py-2.5 hover:bg-[#faf8ff] transition-colors text-left group"
                      onClick={() => {
                        // Handle click to show detail
                      }}
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div className="mt-0.5 flex-shrink-0">
                          {getActionIcon(entry.action)}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-0.5">
                            <p className="text-sm text-[#4c1d95] line-clamp-1">
                              {entry.description || (
                                <>
                                  <span className="font-medium">{getActionText(entry.action)}</span>
                                  {entry.field && <span> • {entry.field}</span>}
                                </>
                              )}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-2 text-xs text-[#a78bfa]">
                            <User className="h-3 w-3" />
                            <span>{entry.user}</span>
                            <span>•</span>
                            <span>{formatTimestamp(entry.timestamp)}</span>
                          </div>

                          {/* Field Change */}
                          {entry.field && entry.oldValue && entry.newValue && (
                            <div className="mt-1.5 text-xs">
                              <span className="text-red-600 line-through">{entry.oldValue}</span>
                              <span className="mx-1.5 text-[#a78bfa]">→</span>
                              <span className="text-green-600 font-medium">{entry.newValue}</span>
                            </div>
                          )}
                        </div>

                        {/* Chevron */}
                        <ChevronRight className="h-4 w-4 text-[#c4b5fd] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
                      </div>
                    </button>
                    {index < recentEntries.length - 1 && (
                      <div className="px-4">
                        <Separator className="bg-[#ede9fe]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Footer */}
            {entries.length > 10 && (
              <>
                <Separator className="bg-[#ede9fe]" />
                <div className="p-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-[#705add] hover:text-[#5a47b3] hover:bg-[#faf8ff]"
                    onClick={() => {
                      setOpen(false);
                      onViewAll?.();
                    }}
                  >
                    <HistoryIcon className="h-4 w-4 mr-2" />
                    {t("history.view_all_history")}
                    <span className="ml-auto text-xs text-[#a78bfa]">
                      {entries.length} {t("history.entries")}
                    </span>
                  </Button>
                </div>
              </>
            )}
          </>
        ) : (
          <div className="px-4 py-8 text-center">
            <Clock className="h-10 w-10 text-[#c4b5fd] mx-auto mb-2" />
            <p className="text-sm text-[#8b5cf6]">{t("history.no_activity")}</p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}