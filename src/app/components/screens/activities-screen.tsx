import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Users, 
  Mail, 
  Monitor,
  Filter,
  Plus,
  Search,
  Eye,
  Edit,
  X,
  LayoutGrid,
  List
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { PageContainer } from "../common/PageContainer";
import { PageHeader } from "../common/PageHeader";
import { QuickVisitModal } from "../modals/quick-visit-modal";
import { advancedMockData } from "../../../data/advancedMockData";
import { useRoleTheme } from "../../hooks/use-role-theme";
import { useModuleData } from "../../contexts/module-data-context";

interface ActivitiesScreenProps {
  onActivityClick?: (activityId: string) => void;
}

export function ActivitiesScreen({ onActivityClick }: ActivitiesScreenProps) {
  const { t, i18n } = useTranslation();
  const roleTheme = useRoleTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [showQuickVisitModal, setShowQuickVisitModal] = useState(false);

  const { taskActivities } = useModuleData();

  const activities = useMemo(() => {
    const mockActivities = advancedMockData.activities;
    
    // Map store tasks that are activities
    const taskActivitiesFromStore = taskActivities.map(t => {
        let type = "meeting";
        const activityType = String(t.activityType || t.titleType || "").toLowerCase();
        if (activityType.includes("visit") || activityType.includes("เข้าพบ")) type = "visit";
        else if (activityType.includes("call") || activityType.includes("โทร")) type = "call";
        else if (activityType.includes("presentation") || activityType.includes("นำเสนอ")) type = "presentation";

        const normalizedStatus =
          t.status === "completed"
            ? "completed"
            : t.status === "in-progress"
              ? "in_progress"
              : t.status === "cancelled"
                ? "cancelled"
                : "planned";

        return {
          id: t.id,
          title: t.title,
          description: t.description || "",
          customer: t.customer || "N/A",
          type: type as any,
          status: normalizedStatus as any,
          scheduledDate: t.dueDate || new Date().toISOString().split('T')[0],
          scheduledTime: t.dueTime || "00:00",
          owner: t.assignee || "You",
        };
      });

    // Keep a single canonical record per id; store-backed tasks take precedence.
    return Array.from(new Map([...mockActivities, ...taskActivitiesFromStore].map((a) => [a.id, a])).values());
  }, [taskActivities]);

  const getActivityIcon = (type: string) => {
    const iconMap: Record<string, any> = {
      visit: MapPin,
      call: Phone,
      meeting: Users,
      email: Mail,
      presentation: Monitor,
    };
    return iconMap[type] || Clock;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; color: string }> = {
      planned: { label: "Planned", color: "bg-blue-100 text-blue-700" },
      confirmed: { label: "Confirmed", color: "bg-cyan-100 text-cyan-700" },
      in_progress: { label: "In Progress", color: "bg-green-100 text-green-700" },
      completed: { label: "Completed", color: "bg-green-100 text-green-700" },
      cancelled: { label: "Cancelled", color: "bg-red-100 text-red-700" },
      postponed: { label: "Postponed", color: "bg-orange-100 text-orange-700" },
    };

    const config = statusConfig[status] || statusConfig.planned;
    return (
      <Badge className={`${config.color} border-0`}>
        {config.label}
      </Badge>
    );
  };

  const getOutcomeBadge = (outcome: string | undefined) => {
    if (!outcome) return null;

    const outcomeConfig: Record<string, { label: string; color: string }> = {
      deal_closed: { label: "Deal Closed", color: "bg-green-100 text-green-700" },
      quotation_requested: { label: "Quotation Requested", color: "bg-blue-100 text-blue-700" },
      follow_up_scheduled: { label: "Follow-up Scheduled", color: "bg-cyan-100 text-cyan-700" },
      information_provided: { label: "Info Provided", color: "bg-green-100 text-green-700" },
      no_interest: { label: "No Interest", color: "bg-orange-100 text-orange-700" },
    };

    const config = outcomeConfig[outcome] || { label: outcome, color: "bg-gray-100 text-gray-700" };
    return (
      <Badge className={`${config.color} border-0`}>
        {config.label}
      </Badge>
    );
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(i18n.language, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (time: string) => {
    return time;
  };

  const filteredActivities = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return activities.filter((activity) => {
      const matchesSearch =
        activity.title.toLowerCase().includes(searchLower) ||
        activity.description.toLowerCase().includes(searchLower) ||
        (activity.customer || "").toLowerCase().includes(searchLower);
      const matchesType = filterType === "all" || activity.type === filterType;
      const matchesStatus = filterStatus === "all" || activity.status === filterStatus;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [activities, searchTerm, filterType, filterStatus]);

  // Statistics
  const stats = useMemo(() => {
    const today = new Date();
    const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    return filteredActivities.reduce(
      (acc, activity) => {
        acc.total += 1;
        if (activity.status === "planned") acc.planned += 1;
        if (activity.status === "completed") acc.completed += 1;
        const actDate = new Date(activity.scheduledDate);
        if (actDate >= today && actDate <= weekFromNow) acc.thisWeek += 1;
        return acc;
      },
      { total: 0, planned: 0, completed: 0, thisWeek: 0 }
    );
  }, [filteredActivities]);

  return (
    <PageContainer>
      <PageHeader
        title="Activities & Visits"
        subtitle="Manage customer visits, meetings, and interactions"
      >
        <Button
          variant="outline"
          className="border-2 border-border text-primary hover:bg-primary/10 rounded-xl shadow-sm"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
        <Button
          className="bg-[#7BC9A6] hover:bg-[#6BB896] text-white rounded-xl shadow-sm"
          onClick={() => setShowQuickVisitModal(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          {t('visits.record_visit')}
        </Button>
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-sm"
          onClick={() => console.log("Add Activity")}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Activity
        </Button>
      </PageHeader>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border border-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{t("calendar.total_activities")}</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              </div>
              <Calendar className="h-8 w-8 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{t("customers.activity_types.planned")}</p>
                <p className="text-2xl font-bold text-blue-600">{stats.planned}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{t("customers.activity_types.completed")}</p>
                <p className="text-2xl font-bold" style={{ color: roleTheme.primary }}>{stats.completed}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 opacity-50" style={{ color: roleTheme.primary }} />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{t("common.this_week")}</p>
                <p className="text-2xl font-bold" style={{ color: roleTheme.primary }}>{stats.thisWeek}</p>
              </div>
              <Calendar className="h-8 w-8 opacity-50" style={{ color: roleTheme.primary }} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            className={`px-3 py-2 h-9 ${
              filterType === "all"
                ? "text-primary bg-primary/10 font-medium"
                : "text-muted-foreground hover:bg-primary/10"
            }`}
            onClick={() => setFilterType("all")}
          >
            {t("common.all_types")}
          </Button>
          <Button
            variant="ghost"
            className={`px-3 py-2 h-9 ${
              filterType === "visit"
                ? "text-primary bg-primary/10 font-medium"
                : "text-muted-foreground hover:bg-primary/10"
            }`}
            onClick={() => setFilterType("visit")}
          >
            <MapPin className="h-4 w-4 mr-1" />
            {t("common.visits")}
          </Button>
          <Button
            variant="ghost"
            className={`px-3 py-2 h-9 ${
              filterType === "meeting"
                ? "text-primary bg-primary/10 font-medium"
                : "text-muted-foreground hover:bg-primary/10"
            }`}
            onClick={() => setFilterType("meeting")}
          >
            <Users className="h-4 w-4 mr-1" />
            {t("common.meetings")}
          </Button>
          <Button
            variant="ghost"
            className={`px-3 py-2 h-9 ${
              filterType === "call"
                ? "text-primary bg-primary/10 font-medium"
                : "text-muted-foreground hover:bg-primary/10"
            }`}
            onClick={() => setFilterType("call")}
          >
            <Phone className="h-4 w-4 mr-1" />
            {t("common.calls")}
          </Button>
        </div>
        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 border border-border rounded-lg p-1 bg-secondary/30">
            <Button
              variant="ghost"
              size="sm"
              className={`h-7 w-7 p-0 ${
                viewMode === "table"
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "text-muted-foreground hover:bg-secondary"
              }`}
              onClick={() => setViewMode("table")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`h-7 w-7 p-0 ${
                viewMode === "card"
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "text-muted-foreground hover:bg-secondary"
              }`}
              onClick={() => setViewMode("card")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 w-64 h-9 border border-border rounded-lg bg-card focus:border-primary text-sm"
            />
          </div>
        </div>
      </div>

      {/* Activities List */}
      <Card className="border border-border shadow-sm bg-card">
        <CardHeader className="border-b border-border bg-secondary/50 px-4 py-3">
          <CardTitle className="text-foreground text-base">
            Activity Timeline
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {viewMode === "table" ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/50 border-b border-border">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                      Type
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                      Activity
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                      Customer
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                      Date & Time
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                      Duration
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                      Assigned To
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                      Outcome
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredActivities.map((activity) => {
                    const Icon = getActivityIcon(activity.type);
                    return (
                      <tr
                        key={activity.id}
                        className="hover:bg-secondary/30 cursor-pointer transition-colors"
                        onClick={() => onActivityClick && onActivityClick(activity.id)}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <Icon className="h-4 w-4 text-primary" />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-foreground">
                            {activity.title}
                          </p>
                          <p className="text-xs text-muted-foreground truncate max-w-xs">
                            {activity.description}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-foreground">
                            {activity.customerId === "cust_001"
                              ? "CP Foods"
                              : activity.customerId === "cust_002"
                              ? "Unilever Thailand"
                              : "Toyota Thailand"}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-foreground">
                            {formatDate(activity.scheduledDate)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatTime(activity.scheduledTime)}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-foreground">{activity.duration} min</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-foreground">{activity.assignedTo}</p>
                        </td>
                        <td className="px-4 py-3">{getStatusBadge(activity.status)}</td>
                        <td className="px-4 py-3">{getOutcomeBadge(activity.outcome)}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-primary hover:bg-primary/10 h-8 w-8 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                onActivityClick && onActivityClick(activity.id);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {activity.status === "planned" && (
                              <>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-blue-600 hover:bg-blue-50 h-8 w-8 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    console.log("Edit activity", activity.id);
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-red-600 hover:bg-red-50 h-8 w-8 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    console.log("Cancel activity", activity.id);
                                  }}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            /* Card View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {filteredActivities.map((activity) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <Card 
                    key={activity.id} 
                    className="border border-border hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => onActivityClick && onActivityClick(activity.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {activity.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {activity.customerId === "cust_001"
                                ? "CP Foods"
                                : activity.customerId === "cust_002"
                                ? "Unilever Thailand"
                                : "Toyota Thailand"}
                            </p>
                          </div>
                        </div>
                        {getStatusBadge(activity.status)}
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {activity.description}
                      </p>
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(activity.scheduledDate)}</span>
                          <span>•</span>
                          <Clock className="h-3 w-3" />
                          <span>{formatTime(activity.scheduledTime)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Users className="h-3 w-3" />
                          <span>{activity.assignedTo}</span>
                          <span>•</span>
                          <span>{activity.duration} min</span>
                        </div>
                      </div>
                      
                      {activity.outcome && (
                        <div className="mb-3">
                          {getOutcomeBadge(activity.outcome)}
                        </div>
                      )}
                      
                      <div className="flex items-center gap-1 pt-3 border-t border-border">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-primary hover:bg-primary/10 h-8 flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            onActivityClick && onActivityClick(activity.id);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        {activity.status === "planned" && (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-blue-600 hover:bg-blue-50 h-8 w-8 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log("Edit activity", activity.id);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-red-600 hover:bg-red-50 h-8 w-8 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log("Cancel activity", activity.id);
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Visit Modal */}
      <QuickVisitModal
        isOpen={showQuickVisitModal}
        onClose={() => setShowQuickVisitModal(false)}
        onSave={(data) => {
          console.log("Quick Visit saved:", data);
          setShowQuickVisitModal(false);
        }}
      />
    </PageContainer>
  );
}
