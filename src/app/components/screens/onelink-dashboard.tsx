import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Users,
  Building2,
  Briefcase,
  Activity,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  CheckCircle2,
  AlertCircle,
  Clock,
  Database,
  Server,
  Mail,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useRole } from "../../contexts/role-context";
import { cn } from "../ui/utils";

interface MetricCardProps {
  icon: React.ElementType;
  title: string;
  value: string | number;
  subtitle: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  iconColor: string;
  iconBgColor: string;
  liveIndicator?: boolean;
}

function MetricCard({
  icon: Icon,
  title,
  value,
  subtitle,
  trend,
  iconColor,
  iconBgColor,
  liveIndicator,
}: MetricCardProps) {
  return (
    <Card className="border-border/40 shadow-sm hover:shadow-md transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className={cn("p-2.5 rounded-xl", iconBgColor)}>
                <Icon className={cn("h-5 w-5", iconColor)} />
              </div>
              {liveIndicator && (
                <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary px-2 py-0.5 text-xs font-medium">
                  <Eye className="h-3 w-3 mr-1 inline-block" />
                  Live
                </Badge>
              )}
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              {title}
            </h3>
            <p className="text-3xl font-semibold tracking-tight mb-1">
              {value}
            </p>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
          {trend && (
            <div
              className={cn(
                "flex items-center gap-1 px-2.5 py-1 rounded-lg text-sm font-medium",
                trend.isPositive
                  ? "bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400"
                  : "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400"
              )}
            >
              {trend.isPositive ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <ArrowDownRight className="h-4 w-4" />
              )}
              <span>{trend.value}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface RecentActivity {
  id: string;
  user: string;
  avatar: string;
  action: string;
  target: string;
  timestamp: string;
  type: "success" | "warning" | "info";
}

interface SystemStatus {
  name: string;
  status: "healthy" | "running" | "warning";
  uptime: string;
  details: string;
}

export function OneLinkDashboard() {
  const { t } = useTranslation();
  const { role } = useRole();

  // Role-based colors
  const getRoleColors = () => {
    switch (role) {
      case "Sales Support":
        return {
          primary: "text-[#7BC9A6]",
          bg: "bg-[#7BC9A6]/10",
          border: "border-[#7BC9A6]",
          hover: "hover:bg-[#7BC9A6]/20",
        };
      default:
        return {
          primary: "text-[#7BC9A6]",
          bg: "bg-[#E8F6EF]",
          border: "border-[#7BC9A6]/20",
        };
    }
  };

  const roleColors = getRoleColors();

  // Sample data for dashboard metrics
  const metrics = [
    {
      icon: Users,
      title: "Total Users",
      value: "248",
      subtitle: "+24 this month",
      trend: { value: "+12%", isPositive: true },
      iconColor: "text-blue-600",
      iconBgColor: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      icon: Building2,
      title: "Total Companies",
      value: "1,248",
      subtitle: "+86 this month",
      trend: { value: "+8%", isPositive: true },
      iconColor: "text-purple-600",
      iconBgColor: "bg-purple-50 dark:bg-purple-950/30",
    },
    {
      icon: Briefcase,
      title: "Active Deals",
      value: "342",
      subtitle: "$45.2M value",
      trend: { value: "+15%", isPositive: true },
      iconColor: "text-green-600",
      iconBgColor: "bg-green-50 dark:bg-green-950/30",
    },
    {
      icon: Activity,
      title: "System Activity",
      value: "98%",
      subtitle: "Uptime",
      liveIndicator: true,
      iconColor: "text-orange-600",
      iconBgColor: "bg-orange-50 dark:bg-orange-950/30",
    },
  ];

  // Recent activities data
  const recentActivities: RecentActivity[] = [
    {
      id: "1",
      user: "John Smith",
      avatar: "JS",
      action: "Created new user account",
      target: "",
      timestamp: "5 mins ago",
      type: "success",
    },
    {
      id: "2",
      user: "Sarah Chen",
      avatar: "SC",
      action: "Updated company profile",
      target: "",
      timestamp: "15 mins ago",
      type: "info",
    },
    {
      id: "3",
      user: "Michael Wong",
      avatar: "MW",
      action: "Approved discount request",
      target: "",
      timestamp: "1 hour ago",
      type: "success",
    },
    {
      id: "4",
      user: "Emma Wilson",
      avatar: "EW",
      action: "Modified workflow settings",
      target: "",
      timestamp: "2 hours ago",
      type: "warning",
    },
  ];

  // System status data
  const systemStatus: SystemStatus[] = [
    {
      name: "Database",
      status: "healthy",
      uptime: "99.9%",
      details: "Uptime: 99.9%",
    },
    {
      name: "API Server",
      status: "healthy",
      uptime: "99.5%",
      details: "Uptime: 99.5%",
    },
    {
      name: "Email Service",
      status: "healthy",
      uptime: "98.5%",
      details: "Uptime: 98.5%",
    },
    {
      name: "Background Jobs",
      status: "running",
      uptime: "100%",
      details: "Uptime: 100%",
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "success":
        return (
          <div className="p-2 rounded-full bg-green-50 dark:bg-green-950/30">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
        );
      case "warning":
        return (
          <div className="p-2 rounded-full bg-yellow-50 dark:bg-yellow-950/30">
            <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          </div>
        );
      case "info":
        return (
          <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-950/30">
            <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
        );
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-green-600 dark:text-green-400">
              Healthy
            </span>
          </div>
        );
      case "running":
        return (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Running
            </span>
          </div>
        );
      case "warning":
        return (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
            <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
              Warning
            </span>
          </div>
        );
      default:
        return null;
    }
  };

  const getSystemIcon = (name: string) => {
    switch (name) {
      case "Database":
        return <Database className="h-5 w-5 text-muted-foreground" />;
      case "API Server":
        return <Server className="h-5 w-5 text-muted-foreground" />;
      case "Email Service":
        return <Mail className="h-5 w-5 text-muted-foreground" />;
      case "Background Jobs":
        return <Zap className="h-5 w-5 text-muted-foreground" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          System overview and key metrics
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities - Takes 2 columns */}
        <div className="lg:col-span-2">
          <Card className="border-border/40 shadow-sm h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    {getActivityIcon(activity.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                          {activity.avatar}
                        </div>
                        <span className="font-medium text-sm">
                          {activity.user}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Status - Takes 1 column */}
        <div className="lg:col-span-1">
          <Card className="border-border/40 shadow-sm h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemStatus.map((system, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-background">
                        {getSystemIcon(system.name)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{system.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {system.details}
                        </p>
                      </div>
                    </div>
                    {getStatusIcon(system.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}