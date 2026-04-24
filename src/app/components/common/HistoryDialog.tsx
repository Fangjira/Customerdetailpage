import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { useTranslation } from "react-i18next";
import { useCRM } from "../../contexts/CRMContext";
import { formatDateTime } from "../../../utils/helpers";
import { 
  FileEdit, 
  Trash2, 
  Plus, 
  CheckCircle, 
  XCircle, 
  Send,
  Eye,
  PenTool,
  ArrowRight
} from "lucide-react";

interface HistoryDialogProps {
  open: boolean;
  onClose: () => void;
  entityId: string;
  entityType: string;
}

const actionIcons = {
  created: Plus,
  updated: FileEdit,
  deleted: Trash2,
  status_changed: ArrowRight,
  approved: CheckCircle,
  rejected: XCircle,
  sent: Send,
  viewed: Eye,
  signed: PenTool,
  assigned: ArrowRight,
};

const actionColors = {
  created: "text-green-600",
  updated: "text-blue-600",
  deleted: "text-red-600",
  status_changed: "text-green-600",
  approved: "text-green-600",
  rejected: "text-red-600",
  sent: "text-blue-600",
  viewed: "text-cyan-600",
  signed: "text-green-600",
  assigned: "text-orange-600",
};

export function HistoryDialog({ open, onClose, entityId, entityType }: HistoryDialogProps) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language as 'th' | 'en';
  const { getEntityHistory } = useCRM();
  
  const history = getEntityHistory(entityId);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {t('common.history')} - {entityType}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {t('common.history')} {entityId}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[500px] pr-4">
          {history.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {t('common.no_history')}
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((entry) => {
                const Icon = actionIcons[entry.action as keyof typeof actionIcons] || FileEdit;
                const colorClass = actionColors[entry.action as keyof typeof actionColors] || "text-gray-600";
                
                return (
                  <div key={entry.id} className="flex gap-4 pb-4 border-b last:border-0">
                    <div className={`mt-1 p-2 rounded-full bg-background border ${colorClass}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium">
                          {entry.description || t(`common.${entry.action}`)}
                        </p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDateTime(entry.timestamp, locale)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        {t('common.by')} {entry.user}
                      </p>
                      
                      {entry.field && entry.oldValue !== undefined && entry.newValue !== undefined && (
                        <div className="mt-2 p-3 bg-muted/50 rounded-lg text-sm space-y-1">
                          <div className="font-medium text-foreground">
                            {entry.field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-red-600 line-through">
                              {String(entry.oldValue)}
                            </span>
                            <ArrowRight className="h-3 w-3 text-muted-foreground" />
                            <span className="text-green-600 font-medium">
                              {String(entry.newValue)}
                            </span>
                          </div>
                        </div>
                      )}
                      
                      {entry.metadata && (
                        <div className="mt-2 p-2 bg-muted/30 rounded text-xs text-muted-foreground">
                          <pre className="whitespace-pre-wrap">
                            {JSON.stringify(entry.metadata, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}