import { Card, CardContent } from "../ui/card";
import { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { ReactNode } from "react";
import React from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon | ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "purple" | "green" | "orange" | "red" | "blue" | "gray";
  borderPosition?: "left" | "top" | "none";
  className?: string;
}

const colorClasses = {
  purple: {
    border: "border-l-[#9B9BB5]",
    iconBg: "bg-[#F5F5F8] dark:bg-[#9B9BB5]/20",
    iconColor: "text-[#9B9BB5] dark:text-[#B8B8CA]",
    statsBg: "bg-[#F5F5F8] dark:bg-[#9B9BB5]/20",
  },
  green: {
    border: "border-l-[#10b981]",
    iconBg: "bg-[#d1fae5] dark:bg-[#10b981]/20",
    iconColor: "text-[#10b981] dark:text-[#34d399]",
    statsBg: "bg-[#d1fae5] dark:bg-[#10b981]/20",
  },
  blue: {
    border: "border-l-[#0066FF]",
    iconBg: "bg-[#F5F9FF] dark:bg-[#0066FF]/20",
    iconColor: "text-[#0066FF] dark:text-[#3385FF]",
    statsBg: "bg-[#F5F9FF] dark:bg-[#0066FF]/20",
  },
  orange: {
    border: "border-l-[#FF6B35]",
    iconBg: "bg-[#FFE5D6] dark:bg-[#FF6B35]/20",
    iconColor: "text-[#FF6B35] dark:text-[#FF8C5A]",
    statsBg: "bg-[#FFE5D6] dark:bg-[#FF6B35]/20",
  },
  red: {
    border: "border-l-[#ef4444]",
    iconBg: "bg-[#fee2e2] dark:bg-[#ef4444]/20",
    iconColor: "text-[#ef4444] dark:text-[#f87171]",
    statsBg: "bg-[#fee2e2] dark:bg-[#ef4444]/20",
  },
};

export function StatsCard({
  title,
  value,
  icon,
  trend,
  color = "purple",
  borderPosition = "left",
  className,
}: StatsCardProps) {
  const colors = colorClasses[color];
  const borderClass = borderPosition === "left" ? `border-l-4 ${colors.border}` : 
                      borderPosition === "top" ? `border-t-4 ${colors.border}` : "";

  const TrendIcon = trend
    ? trend.isPositive
      ? TrendingUp
      : TrendingDown
    : Minus;
  
  // Render icon based on whether it's a component or ReactNode
  const renderIcon = () => {
    if (!icon) return null;
    
    // If it's already a valid React element, clone it without ref
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon as React.ReactElement<any>, {
        className: `h-6 w-6 ${colors.iconColor}`,
      });
    }
    
    // If it's a component function (LucideIcon)
    if (typeof icon === 'function') {
      const IconComponent = icon as LucideIcon;
      return <IconComponent className={`h-6 w-6 ${colors.iconColor}`} />;
    }
    
    // Fallback for other types
    return null;
  };

  return (
    <Card className={`${borderClass} transition-all hover:shadow-md dark:bg-card dark:border-border ${className || ''}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {trend && (
              <div className={`flex items-center gap-1 mt-2 text-xs ${
                trend.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}>
                <TrendIcon className="h-3 w-3" />
                <span>{Math.abs(trend.value)}%</span>
              </div>
            )}
          </div>
          <div className={`p-3 ${colors.statsBg} rounded-xl`}>
            {renderIcon()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}