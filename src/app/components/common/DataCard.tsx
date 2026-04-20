import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { LucideIcon } from "lucide-react";

interface DataCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  icon?: LucideIcon;
  badges?: Array<{
    label: string;
    variant?: "default" | "outline" | "secondary";
    color?: string;
  }>;
  metadata?: Array<{
    icon: LucideIcon;
    label: string;
    value: string;
  }>;
  actions?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function DataCard({
  title,
  subtitle,
  description,
  icon: Icon,
  badges,
  metadata,
  actions,
  onClick,
  className = "",
}: DataCardProps) {
  return (
    <Card
      className={`
        transition-all hover:shadow-md dark:bg-card dark:border-border
        ${onClick ? "cursor-pointer hover:border-primary dark:hover:border-primary" : ""}
        ${className}
      `}
      onClick={onClick}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          {/* Left Section */}
          <div className="flex gap-4 flex-1 min-w-0">
            {Icon && (
              <div className="p-3 bg-primary/10 rounded-xl shrink-0 dark:bg-primary/20">
                <Icon className="h-6 w-6 text-primary dark:text-primary" />
              </div>
            )}
            
            <div className="flex-1 min-w-0 space-y-2">
              {/* Title & Subtitle */}
              <div>
                <div className="flex items-start gap-2 mb-1">
                  <h3 className="font-semibold text-foreground truncate">
                    {title}
                  </h3>
                  {subtitle && (
                    <Badge variant="outline" className="shrink-0 text-xs dark:bg-secondary dark:border-border dark:text-secondary-foreground">
                      {subtitle}
                    </Badge>
                  )}
                </div>
                
                {/* Description */}
                {description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {description}
                  </p>
                )}
              </div>
              
              {/* Metadata */}
              {metadata && metadata.length > 0 && (
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  {metadata.map((item, idx) => {
                    const MetaIcon = item.icon;
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-1.5 text-muted-foreground"
                      >
                        <MetaIcon className="h-4 w-4 shrink-0" />
                        <span className="truncate">
                          {item.label && <span className="font-medium">{item.label}: </span>}
                          {item.value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          
          {/* Right Section - Badges & Actions */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            {badges && badges.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-end">
                {badges.map((badge, idx) => (
                  <Badge
                    key={idx}
                    variant={badge.variant || "outline"}
                    className={`text-xs ${badge.color || ""} dark:border-border`}
                  >
                    {badge.label}
                  </Badge>
                ))}
              </div>
            )}
            
            {actions && (
              <div onClick={(e) => e.stopPropagation()}>
                {actions}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}