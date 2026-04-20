import { Button } from "../ui/button";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { PageDescription } from "../page-description";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
  children?: ReactNode;
  pageKey?: string; // Add pageKey for showing description
}

export function PageHeader({
  title,
  subtitle,
  icon: Icon,
  actionLabel,
  onAction,
  children,
  pageKey,
}: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div className="flex items-start gap-4">
        {Icon && (
          <div className="p-3 bg-primary/10 rounded-xl dark:bg-primary/20">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        )}
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-foreground dark:text-foreground">{title}</h1>
            {pageKey && <PageDescription pageKey={pageKey} />}
          </div>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1 dark:text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {children}
        {actionLabel && onAction && (
          <Button
            onClick={onAction}
            className="bg-[#0066FF] hover:bg-[#0054CC] dark:bg-primary dark:hover:bg-primary/90 dark:text-primary-foreground"
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}