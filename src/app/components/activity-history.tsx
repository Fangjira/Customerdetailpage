import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import {
  Clock,
  User,
  Edit,
  Plus,
  Trash2,
  CheckCircle,
  XCircle,
  FileText,
  DollarSign,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Building,
  Tag,
  AlertCircle,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useRoleTheme } from "../hooks/use-role-theme";
import { HistoryEntry } from "@/types/crm";

interface ActivityHistoryProps {
  entries: HistoryEntry[];
  maxHeight?: string;
  showEntityType?: boolean;
  defaultOpen?: boolean;
}

export function ActivityHistory({ 
  entries, 
  maxHeight = "400px",
  showEntityType = false,
  defaultOpen = false
}: ActivityHistoryProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const roleTheme = useRoleTheme();

  const getActionIcon = (action: HistoryEntry["action"]) => {
    switch (action) {
      case "created":
        return <Plus className="h-4 w-4" style={{ color: roleTheme.primary }} />;
      case "updated":
        return <Edit className="h-4 w-4 text-blue-600" />;
      case "deleted":
        return <Trash2 className="h-4 w-4 text-red-600" />;
      case "approved":
        return <CheckCircle className="h-4 w-4" style={{ color: roleTheme.primary }} />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "sent":
        return <Mail className="h-4 w-4" style={{ color: roleTheme.primary }} />;
      case "status_changed":
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActionColor = (action: HistoryEntry["action"]) => {
    switch (action) {
      case "created":
      case "approved":
      case "sent":
        return `border-[${roleTheme.borderLight}]`;
      case "updated":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "deleted":
        return "bg-red-50 text-red-700 border-red-200";
      case "rejected":
        return "bg-red-50 text-red-700 border-red-200";
      case "status_changed":
        return "bg-orange-50 text-orange-700 border-orange-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
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
    
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (entries.length === 0) {
    return (
      <Card className="border-2 border-[#ede9fe]">
        <CardHeader className="border-b-2 border-[#ede9fe] bg-gradient-to-r from-[#faf8ff] to-white">
          <CardTitle className="text-[#4c1d95] flex items-center gap-2">
            <Clock className="h-5 w-5" style={{ color: roleTheme.primary }} />
            {t("history")}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <Clock className="h-12 w-12 mx-auto mb-3" style={{ color: roleTheme.light }} />
            <p style={{ color: roleTheme.textColor }}>{t("history.no_activity")}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className="border-2"
      style={{ borderColor: roleTheme.borderLight }}
    >
      <CardHeader 
        className="border-b-2"
        style={{
          borderColor: roleTheme.borderLight,
          background: `linear-gradient(to right, ${roleTheme.lightest}, white)`
        }}
      >
        <CardTitle className="text-[#4c1d95] flex items-center gap-2">
          <Clock className="h-5 w-5" style={{ color: roleTheme.primary }} />
          {t("history")}
          <Badge 
            variant="outline" 
            style={{
              borderColor: roleTheme.borderLight,
              color: roleTheme.primary
            }}
          >
            {entries.length} {t("history.entries")}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium text-[#4c1d95] cursor-pointer">
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            {t("history.show_details")}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ScrollArea style={{ maxHeight }}>
              <div className="space-y-4">
                {entries.map((entry, index) => (
                  <div key={entry.id} className="flex gap-4">
                    {/* Timeline line */}
                    <div className="flex flex-col items-center">
                      <div 
                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                        style={{
                          background: `linear-gradient(to bottom right, ${roleTheme.light}, ${roleTheme.primary})`
                        }}
                      >
                        {getActionIcon(entry.action)}
                      </div>
                      {index < entries.length - 1 && (
                        <div 
                          className="w-0.5 h-full mt-2"
                          style={{
                            background: `linear-gradient(to bottom, ${roleTheme.lightest}, transparent)`
                          }}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className={getActionColor(entry.action)}>
                            {getActionText(entry.action)}
                          </Badge>
                          {showEntityType && entry.entity && (
                            <Badge variant="outline" className="border-[#ede9fe] text-[#705add]">
                              {entry.entity}
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs whitespace-nowrap" style={{ color: roleTheme.light }}>
                          {formatTimestamp(entry.timestamp)}
                        </span>
                      </div>

                      {/* User */}
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-3 w-3" style={{ color: roleTheme.textColor }} />
                        <span className="text-sm font-medium text-[#4c1d95]">
                          {entry.user}
                        </span>
                      </div>

                      {/* Description or Field Change */}
                      {entry.description ? (
                        <p className="text-sm text-[#6b21a8]">{entry.description}</p>
                      ) : entry.field && (
                        <div 
                          className="p-3 rounded-lg border"
                          style={{
                            background: `linear-gradient(to right, ${roleTheme.lightest}, white)`,
                            borderColor: roleTheme.borderLight
                          }}
                        >
                          <p className="text-xs mb-1" style={{ color: roleTheme.textColor }}>
                            {t("history.field")}: <span className="font-medium text-[#4c1d95]">{entry.field}</span>
                          </p>
                          {entry.oldValue && (
                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-red-600 line-through">{entry.oldValue}</span>
                              <span style={{ color: roleTheme.light }}>→</span>
                              <span className="font-medium" style={{ color: roleTheme.primary }}>{entry.newValue}</span>
                            </div>
                          )}
                          {!entry.oldValue && entry.newValue && (
                            <div className="text-xs">
                              <span className="font-medium" style={{ color: roleTheme.primary }}>{entry.newValue}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}