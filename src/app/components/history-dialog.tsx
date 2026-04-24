import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Clock, User, FileEdit, X } from "lucide-react";
import { Button } from "./ui/button";
import { HistoryEntry } from "@/types/crm";

interface HistoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  entries?: HistoryEntry[];
  title?: string;
}

export function HistoryDialog({
  isOpen,
  onClose,
  entries = [],
  title,
}: HistoryDialogProps) {
  const { t } = useTranslation();

  const getActionLabel = (action: string): string => {
    switch (action) {
      case "created":
        return "สร้าง";
      case "updated":
        return "แก้ไข";
      case "status_changed":
        return "เปลี่ยนสถานะ";
      case "approved":
        return "อนุมัติ";
      case "rejected":
        return "ปฏิเสธ";
      case "sent":
        return "ส่ง";
      case "converted":
        return "แปลง";
      case "assigned":
        return "มอบหมาย";
      case "commented":
        return "แสดงความเห็น";
      default:
        return action;
    }
  };

  const getActionColor = (action: string): { dot: string; text: string } => {
    switch (action) {
      case "created":
        return { dot: "bg-green-500", text: "text-green-600" };
      case "updated":
        return { dot: "bg-blue-500", text: "text-blue-600" };
      case "status_changed":
        return { dot: "bg-purple-500", text: "text-purple-600" };
      case "approved":
        return { dot: "bg-green-500", text: "text-green-600" };
      case "rejected":
        return { dot: "bg-red-500", text: "text-red-600" };
      case "sent":
        return { dot: "bg-blue-500", text: "text-blue-600" };
      case "converted":
        return { dot: "bg-orange-500", text: "text-orange-600" };
      case "assigned":
        return { dot: "bg-indigo-500", text: "text-indigo-600" };
      case "commented":
        return { dot: "bg-gray-500", text: "text-gray-600" };
      default:
        return { dot: "bg-gray-500", text: "text-gray-600" };
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString("th-TH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] sm:max-w-md h-auto max-h-[80vh] p-0 gap-0">
        <DialogTitle className="sr-only">
          {title || "กิจกรรมดีล"}
        </DialogTitle>
        <DialogDescription className="sr-only">
          ประวัติการเปลี่ยนแปลงและกิจกรรมทั้งหมด
        </DialogDescription>
        {/* Header */}
        <div className="px-4 py-4 border-b flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <h2 className="text-base font-bold text-gray-900">
                {title || "กิจกรรมดีล"}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {sortedEntries.length} รายการ
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 absolute right-4 top-4"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 bg-white">
          <div className="px-4 py-4">
            {sortedEntries.length === 0 ? (
              <div className="text-center py-12">
                <FileEdit className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-900 mb-1">
                  ยังไม่มีประวัติ
                </p>
                <p className="text-xs text-gray-500">
                  ประวัติการเปลี่ยนแปลงจะแสดงที่นี่
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedEntries.map((entry, index) => {
                  const colors = getActionColor(entry.action);
                  const isLast = index === sortedEntries.length - 1;

                  return (
                    <div key={entry.id} className="flex gap-3">
                      {/* Left: DateTime */}
                      <div className="w-24 flex-shrink-0 pt-0.5">
                        <p className="text-xs text-gray-500 leading-tight">
                          {formatTimestamp(entry.timestamp)}
                        </p>
                      </div>

                      {/* Middle: Timeline */}
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div className={`h-2.5 w-2.5 rounded-full ${colors.dot} mt-1.5`} />
                        {!isLast && (
                          <div className="w-0.5 h-full bg-gray-200 mt-1" />
                        )}
                      </div>

                      {/* Right: Content */}
                      <div className="flex-1 pb-4 min-w-0">
                        <div className="flex items-baseline gap-1.5 mb-0.5">
                          <span className={`text-sm font-semibold ${colors.text}`}>
                            {getActionLabel(entry.action)}
                          </span>
                          {entry.entity && (
                            <span className="text-xs text-gray-600">
                              {entry.entity}
                            </span>
                          )}
                        </div>

                        {entry.description && (
                          <p className="text-xs text-gray-700 mb-1.5">
                            {entry.description}
                          </p>
                        )}

                        {entry.field && entry.oldValue && entry.newValue && (
                          <div className="text-xs text-gray-600 mb-1.5">
                            <span className="font-medium">{entry.field}:</span>{" "}
                            <span className="line-through text-gray-400">
                              {entry.oldValue}
                            </span>
                            {" → "}
                            <span className="font-medium text-gray-900">
                              {entry.newValue}
                            </span>
                          </div>
                        )}

                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {entry.user}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}