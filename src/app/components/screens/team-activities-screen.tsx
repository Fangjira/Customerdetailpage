import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Calendar,
  Clock,
  User,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  Users,
  MapPin,
  FileText,
  LayoutGrid,
  List,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Activity {
  id: string;
  type: "call" | "meeting" | "email" | "task" | "visit";
  title: string;
  description: string;
  owner: string;
  customer?: string;
  deal?: string;
  dueDate: Date;
  status: "completed" | "in-progress" | "overdue" | "pending";
  priority: "high" | "medium" | "low";
  duration?: string;
}

interface TeamActivitiesScreenProps {
  onNavigate?: (path: string) => void;
}

export function TeamActivitiesScreen({ onNavigate }: TeamActivitiesScreenProps) {
  const [selectedOwner, setSelectedOwner] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<string>("today");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grouped" | "list">("grouped");

  // Team members
  const teamMembers = [
    { id: "sarah", name: "Sarah Chen" },
    { id: "michael", name: "Michael Park" },
    { id: "emily", name: "Emily Rodriguez" },
    { id: "david", name: "David Kim" },
  ];

  // Mock activities data
  const allActivities: Activity[] = [
    {
      id: "1",
      type: "call",
      title: "Follow-up call with SCB",
      description: "Discuss proposal timeline and pricing",
      owner: "Sarah Chen",
      customer: "Siam Commercial Bank",
      deal: "Enterprise CRM Implementation",
      dueDate: new Date("2025-02-17 10:00"),
      status: "pending",
      priority: "high",
      duration: "30 min",
    },
    {
      id: "2",
      type: "meeting",
      title: "Site visit at PTT Energy",
      description: "Technical requirements gathering",
      owner: "Michael Park",
      customer: "PTT Energy",
      deal: "Digital Transformation Package",
      dueDate: new Date("2025-02-17 14:00"),
      status: "pending",
      priority: "high",
      duration: "2 hours",
    },
    {
      id: "3",
      type: "email",
      title: "Send quotation to CP All",
      description: "Final pricing for cloud migration",
      owner: "Emily Rodriguez",
      customer: "CP All Retail",
      deal: "Cloud Migration Project",
      dueDate: new Date("2025-02-17 16:00"),
      status: "overdue",
      priority: "high",
      duration: "1 hour",
    },
    {
      id: "4",
      type: "task",
      title: "Prepare demo for Thai Union",
      description: "Supply chain automation demo",
      owner: "David Kim",
      customer: "Thai Union Manufacturing",
      deal: "Supply Chain Automation",
      dueDate: new Date("2025-02-18 09:00"),
      status: "in-progress",
      priority: "medium",
      duration: "3 hours",
    },
    {
      id: "5",
      type: "visit",
      title: "Customer visit - Central F&B",
      description: "Requirements finalization meeting",
      owner: "Sarah Chen",
      customer: "Central F&B Group",
      deal: "POS System Upgrade",
      dueDate: new Date("2025-02-18 11:00"),
      status: "pending",
      priority: "medium",
      duration: "1.5 hours",
    },
    {
      id: "6",
      type: "call",
      title: "Check-in call with Bangkok Hospital",
      description: "Project status update",
      owner: "Michael Park",
      customer: "Bangkok Hospital",
      deal: "HR System Implementation",
      dueDate: new Date("2025-02-16 15:00"),
      status: "completed",
      priority: "low",
      duration: "20 min",
    },
    {
      id: "7",
      type: "meeting",
      title: "Contract negotiation - AIS",
      description: "Final terms discussion",
      owner: "David Kim",
      customer: "AIS Thailand",
      deal: "Customer Portal Development",
      dueDate: new Date("2025-02-19 10:00"),
      status: "pending",
      priority: "high",
      duration: "2 hours",
    },
    {
      id: "8",
      type: "email",
      title: "Follow-up email to CP Foods",
      description: "Proposal clarification",
      owner: "Sarah Chen",
      customer: "Charoen Pokphand Foods",
      deal: "ERP System Upgrade",
      dueDate: new Date("2025-02-15 14:00"),
      status: "overdue",
      priority: "high",
      duration: "30 min",
    },
    {
      id: "9",
      type: "task",
      title: "Update sales forecast",
      description: "Monthly forecast review",
      owner: "Michael Park",
      dueDate: new Date("2025-02-17 17:00"),
      status: "pending",
      priority: "medium",
      duration: "1 hour",
    },
    {
      id: "10",
      type: "call",
      title: "Discovery call - True Corp",
      description: "Initial needs assessment",
      owner: "Emily Rodriguez",
      customer: "True Corporation",
      deal: "Mobile App Development",
      dueDate: new Date("2025-02-20 14:00"),
      status: "pending",
      priority: "low",
      duration: "45 min",
    },
  ];

  // Filter activities
  const filteredActivities = allActivities.filter((activity) => {
    if (selectedOwner !== "all" && activity.owner !== selectedOwner) return false;
    if (selectedType !== "all" && activity.type !== selectedType) return false;
    if (selectedStatus !== "all" && activity.status !== selectedStatus) return false;
    
    // Date filter
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const activityDate = new Date(activity.dueDate);
    activityDate.setHours(0, 0, 0, 0);
    
    if (selectedDate === "today") {
      if (activityDate.getTime() !== today.getTime()) return false;
    } else if (selectedDate === "week") {
      const weekLater = new Date(today);
      weekLater.setDate(weekLater.getDate() + 7);
      if (activityDate < today || activityDate > weekLater) return false;
    } else if (selectedDate === "overdue") {
      if (activity.status !== "overdue") return false;
    }
    
    if (searchQuery && 
        !activity.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !activity.customer?.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Calculate statistics
  const totalCount = filteredActivities.length;
  const overdueCount = filteredActivities.filter(a => a.status === "overdue").length;
  const pendingCount = filteredActivities.filter(a => a.status === "pending").length;
  const completedCount = filteredActivities.filter(a => a.status === "completed").length;

  // Group by owner
  const activitiesByOwner = teamMembers.map(member => ({
    ...member,
    activities: filteredActivities.filter(a => a.owner === member.name),
    overdue: filteredActivities.filter(a => a.owner === member.name && a.status === "overdue").length,
    pending: filteredActivities.filter(a => a.owner === member.name && a.status === "pending").length,
  }));

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "call":
        return Phone;
      case "meeting":
        return Users;
      case "email":
        return Mail;
      case "task":
        return CheckCircle2;
      case "visit":
        return MapPin;
      default:
        return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "call":
        return "bg-blue-100 text-blue-700";
      case "meeting":
        return "bg-purple-100 text-purple-700";
      case "email":
        return "bg-green-100 text-green-700";
      case "task":
        return "bg-orange-100 text-orange-700";
      case "visit":
        return "bg-cyan-100 text-cyan-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "in-progress":
        return "bg-blue-100 text-blue-700";
      case "overdue":
        return "bg-red-100 text-red-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-600 text-white";
      case "medium":
        return "bg-yellow-600 text-white";
      case "low":
        return "bg-blue-600 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Activities</h1>
          <p className="text-sm text-muted-foreground mt-1">
            กิจกรรมและงานของทั้งทีม - ติดตามความคืบหน้า
          </p>
        </div>
        <Button className="bg-[#7BC9A6] hover:bg-[#6CB88A]">
          <Calendar className="h-4 w-4 mr-2" />
          View Calendar
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total Activities</span>
              <FileText className="h-5 w-5 text-[#7BC9A6]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalCount}</p>
            <p className="text-xs text-muted-foreground mt-1">Filtered results</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Overdue</span>
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-red-600">{overdueCount}</p>
            <p className="text-xs text-muted-foreground mt-1">Need immediate action</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Pending</span>
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
            <p className="text-xs text-muted-foreground mt-1">Upcoming tasks</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Completed</span>
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">{completedCount}</p>
            <p className="text-xs text-muted-foreground mt-1">Done today</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6]"
                />
              </div>
            </div>

            {/* Date Filter */}
            <Select value={selectedDate} onValueChange={setSelectedDate}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>

            {/* Owner Filter */}
            <Select value={selectedOwner} onValueChange={setSelectedOwner}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Team Members</SelectItem>
                {teamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.name}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Type Filter */}
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-36">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="call">Calls</SelectItem>
                <SelectItem value="meeting">Meetings</SelectItem>
                <SelectItem value="email">Emails</SelectItem>
                <SelectItem value="task">Tasks</SelectItem>
                <SelectItem value="visit">Visits</SelectItem>
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-36">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 border border-gray-300 rounded-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 w-8 p-0 ${
                  viewMode === "grouped"
                    ? "bg-[#7BC9A6] text-white hover:bg-[#6CB88A]"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setViewMode("grouped")}
              >
                <Users className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 w-8 p-0 ${
                  viewMode === "list"
                    ? "bg-[#7BC9A6] text-white hover:bg-[#6CB88A]"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activities Views */}
      {viewMode === "grouped" ? (
        /* Grouped by Team Member */
        <div className="space-y-4">
          {activitiesByOwner.map((member) => (
            <Card key={member.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#7BC9A6] to-[#6CB88A] flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {member.activities.length} activities
                        {member.overdue > 0 && ` • ${member.overdue} overdue`}
                      </p>
                    </div>
                  </div>
                  {member.overdue > 0 && (
                    <Badge className="bg-red-100 text-red-700">
                      {member.overdue} overdue
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {member.activities.length === 0 ? (
                    <p className="text-center text-sm text-muted-foreground py-4">
                      No activities found
                    </p>
                  ) : (
                    member.activities.map((activity) => {
                      const TypeIcon = getTypeIcon(activity.type);
                      return (
                        <div
                          key={activity.id}
                          className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${getTypeColor(activity.type)}`}>
                              <TypeIcon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <h4 className="font-semibold text-sm text-gray-900">
                                    {activity.title}
                                  </h4>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {activity.description}
                                  </p>
                                </div>
                                <Badge className={getPriorityBadge(activity.priority)}>
                                  {activity.priority}
                                </Badge>
                              </div>
                              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{formatDateTime(activity.dueDate)}</span>
                                </div>
                                {activity.duration && (
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    <span>{activity.duration}</span>
                                  </div>
                                )}
                                {activity.customer && (
                                  <span className="text-gray-700 font-medium">
                                    {activity.customer}
                                  </span>
                                )}
                                <Badge className={getStatusBadge(activity.status)}>
                                  {activity.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* List View - All Activities */
        <Card>
          <CardHeader>
            <CardTitle>All Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredActivities.length === 0 ? (
                <p className="text-center text-sm text-muted-foreground py-8">
                  No activities found
                </p>
              ) : (
                filteredActivities.map((activity) => {
                  const TypeIcon = getTypeIcon(activity.type);
                  return (
                    <div
                      key={activity.id}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${getTypeColor(activity.type)}`}>
                          <TypeIcon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm text-gray-900">
                                {activity.title}
                              </h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                {activity.description}
                              </p>
                            </div>
                            <Badge className={getPriorityBadge(activity.priority)}>
                              {activity.priority}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span className="font-medium">{activity.owner}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDateTime(activity.dueDate)}</span>
                            </div>
                            {activity.duration && (
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{activity.duration}</span>
                              </div>
                            )}
                            {activity.customer && (
                              <span className="text-gray-700 font-medium">
                                {activity.customer}
                              </span>
                            )}
                            <Badge className={getStatusBadge(activity.status)}>
                              {activity.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}