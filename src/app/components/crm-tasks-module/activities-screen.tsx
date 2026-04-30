import { useState } from "react";
import { MapPin, Users, Calendar as CalendarIcon, Clock, Building2, List, GitBranch } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface Activity {
  id: string;
  title: string;
  activityType: "customer_visit" | "sales_meeting" | "internal_meeting" | "standard_todo";
  customer: string;
  assignee: {
    name: string;
    initials: string;
    color: string;
  };
  date: string;
  time: string;
  location?: string;
  status: "upcoming" | "in-progress" | "completed";
}

const MOCK_ACTIVITIES: Activity[] = [
  {
    id: "ACT-2026-0420",
    title: "Customer Visit: PTT Group",
    activityType: "customer_visit",
    customer: "PTT Group",
    assignee: { name: "สมชาย วงศ์สกุล", initials: "SW", color: "bg-blue-600" },
    date: "2026-04-23",
    time: "10:00 AM",
    location: "PTT Headquarters, Bangkok",
    status: "upcoming",
  },
  {
    id: "ACT-2026-0419",
    title: "Sales Meeting - Regional Directors",
    activityType: "sales_meeting",
    customer: "Internal",
    assignee: { name: "สมหญิง รักดี", initials: "SR", color: "bg-pink-600" },
    date: "2026-04-21",
    time: "2:00 PM",
    location: "Conference Room A",
    status: "in-progress",
  },
  {
    id: "ACT-2026-0421",
    title: "Site Visit - Amata Industrial Estate",
    activityType: "customer_visit",
    customer: "Amata Corp",
    assignee: { name: "วรรณา ศรีสุข", initials: "WS", color: "bg-purple-600" },
    date: "2026-04-25",
    time: "9:00 AM",
    location: "Amata City Chonburi",
    status: "upcoming",
  },
  {
    id: "ACT-2026-0417",
    title: "Monthly Strategy Meeting",
    activityType: "internal_meeting",
    customer: "Internal",
    assignee: { name: "ประยุทธ์ ใจดี", initials: "PJ", color: "bg-orange-600" },
    date: "2026-04-21",
    time: "9:30 AM",
    location: "Virtual - Zoom",
    status: "completed",
  },
  {
    id: "ACT-2026-0422",
    title: "Product Demo - SCG JWD",
    activityType: "sales_meeting",
    customer: "SCG JWD",
    assignee: { name: "แฮมทาโร่", initials: "HT", color: "bg-emerald-600" },
    date: "2026-04-24",
    time: "3:00 PM",
    location: "SCG Office, Silom",
    status: "upcoming",
  },
  {
    id: "TSK-2026-0423",
    title: "Follow-up Call - WHA Group",
    activityType: "standard_todo",
    customer: "WHA Group",
    assignee: { name: "ณัฐพงษ์ ทองดี", initials: "NT", color: "bg-indigo-600" },
    date: "2026-04-22",
    time: "11:00 AM",
    location: "-",
    status: "upcoming",
  },
];

const getActivityTypeColor = (type: string) => {
  switch (type) {
    case "customer_visit": return { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-300", icon: "bg-blue-600" };
    case "sales_meeting": return { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-300", icon: "bg-emerald-600" };
    case "internal_meeting": return { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-300", icon: "bg-orange-600" };
    case "standard_todo": return { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-300", icon: "bg-gray-600" };
    default: return { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-300", icon: "bg-gray-600" };
  }
};

const getActivityTypeLabel = (type: string) => {
  switch (type) {
    case "customer_visit": return "Customer Visit";
    case "sales_meeting": return "Sales Meeting";
    case "internal_meeting": return "Internal Meeting";
    case "standard_todo": return "To-Do";
    default: return type;
  }
};

const getActivityTypeIcon = (type: string) => {
  switch (type) {
    case "customer_visit": return MapPin;
    case "sales_meeting": return Users;
    case "internal_meeting": return Users;
    default: return List;
  }
};

export function ActivitiesScreen() {
  const [viewMode, setViewMode] = useState<"timeline" | "table">("timeline");

  // Group activities by date
  const groupedActivities = MOCK_ACTIVITIES.reduce((acc, activity) => {
    if (!acc[activity.date]) {
      acc[activity.date] = [];
    }
    acc[activity.date].push(activity);
    return acc;
  }, {} as Record<string, Activity[]>);

  const sortedDates = Object.keys(groupedActivities).sort();

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>
              Activities & Visits
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              April 21, 2026 • {MOCK_ACTIVITIES.length} scheduled activities
            </p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Schedule Activity
          </Button>
        </div>

        {/* View Toggle */}
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)}>
          <TabsList>
            <TabsTrigger value="timeline">
              <GitBranch className="h-4 w-4 mr-2" />
              Timeline View
            </TabsTrigger>
            <TabsTrigger value="table">
              <List className="h-4 w-4 mr-2" />
              Table View
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {viewMode === "timeline" ? (
          // Timeline View
          <div className="max-w-5xl mx-auto">
            <div className="space-y-8">
              {sortedDates.map((date, dateIndex) => (
                <div key={date} className="relative">
                  {/* Date Header */}
                  <div className="sticky top-0 bg-gray-50 z-10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-white px-4 py-2 rounded-lg border-2 border-gray-200 shadow-sm">
                        <div className="text-sm font-semibold text-gray-900" style={{ fontFamily: 'Inter' }}>
                          {new Date(date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                      <div className="flex-1 h-px bg-gray-200"></div>
                    </div>
                  </div>

                  {/* Timeline Items */}
                  <div className="space-y-4 ml-4 border-l-2 border-gray-200 pl-8">
                    {groupedActivities[date].map((activity, activityIndex) => {
                      const colors = getActivityTypeColor(activity.activityType);
                      const Icon = getActivityTypeIcon(activity.activityType);

                      return (
                        <div key={activity.id} className="relative">
                          {/* Timeline Dot */}
                          <div className={`absolute -left-10 top-6 h-4 w-4 rounded-full ${colors.icon} border-4 border-gray-50`}></div>

                          <Card className={`cursor-pointer hover:shadow-md transition-shadow border-l-4 ${colors.border}`}>
                            <CardContent className="p-5">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  {/* Type Badge */}
                                  <div className="flex items-center gap-2 mb-3">
                                    <div className={`h-8 w-8 rounded-lg ${colors.icon} flex items-center justify-center`}>
                                      <Icon className="h-4 w-4 text-white" />
                                    </div>
                                    <Badge className={`text-xs font-semibold ${colors.bg} ${colors.text} border ${colors.border}`}>
                                      {getActivityTypeLabel(activity.activityType)}
                                    </Badge>
                                  </div>

                                  {/* Title - NO taskID shown here */}
                                  <h3 className="font-bold text-gray-900 text-lg mb-3" style={{ fontFamily: 'Inter' }}>
                                    {activity.title}
                                  </h3>

                                  {/* Details Grid */}
                                  <div className="grid grid-cols-2 gap-4">
                                    {/* Customer */}
                                    <div className="flex items-center gap-2 text-sm">
                                      <Building2 className="h-4 w-4 text-gray-400" />
                                      <span className="text-gray-700 font-medium" style={{ fontFamily: 'Inter' }}>
                                        {activity.customer}
                                      </span>
                                    </div>

                                    {/* Time */}
                                    <div className="flex items-center gap-2 text-sm">
                                      <Clock className="h-4 w-4 text-gray-400" />
                                      <span className="text-gray-700" style={{ fontFamily: 'Inter' }}>
                                        {activity.time}
                                      </span>
                                    </div>

                                    {/* Assignee */}
                                    <div className="flex items-center gap-2">
                                      <Avatar className="h-6 w-6">
                                        <AvatarFallback className={`${activity.assignee.color} text-white text-xs`}>
                                          {activity.assignee.initials}
                                        </AvatarFallback>
                                      </Avatar>
                                      <span className="text-sm text-gray-700 font-medium" style={{ fontFamily: 'Inter' }}>
                                        {activity.assignee.name}
                                      </span>
                                    </div>

                                    {/* Location */}
                                    {activity.location && activity.location !== "-" && (
                                      <div className="flex items-center gap-2 text-sm">
                                        <MapPin className="h-4 w-4 text-gray-400" />
                                        <span className="text-gray-600" style={{ fontFamily: 'Inter' }}>
                                          {activity.location}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Status */}
                                <div>
                                  {activity.status === "completed" && (
                                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300 border">
                                      Completed
                                    </Badge>
                                  )}
                                  {activity.status === "in-progress" && (
                                    <Badge className="bg-blue-100 text-blue-700 border-blue-300 border">
                                      In Progress
                                    </Badge>
                                  )}
                                  {activity.status === "upcoming" && (
                                    <Badge className="bg-gray-100 text-gray-700 border-gray-300 border">
                                      Upcoming
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Table View
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ fontFamily: 'Inter' }}>
                    Activity Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ fontFamily: 'Inter' }}>
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ fontFamily: 'Inter' }}>
                    Customer Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ fontFamily: 'Inter' }}>
                    Assignee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ fontFamily: 'Inter' }}>
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ fontFamily: 'Inter' }}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {MOCK_ACTIVITIES.map((activity) => {
                  const colors = getActivityTypeColor(activity.activityType);
                  const Icon = getActivityTypeIcon(activity.activityType);

                  return (
                    <tr key={activity.id} className="hover:bg-gray-50 cursor-pointer transition-colors">
                      {/* Activity Type */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`h-8 w-8 rounded-lg ${colors.icon} flex items-center justify-center`}>
                            <Icon className="h-4 w-4 text-white" />
                          </div>
                          <Badge className={`text-xs font-semibold ${colors.bg} ${colors.text} border ${colors.border}`}>
                            {getActivityTypeLabel(activity.activityType)}
                          </Badge>
                        </div>
                      </td>

                      {/* Title - NO taskID shown here */}
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900" style={{ fontFamily: 'Inter' }}>
                          {activity.title}
                        </div>
                        {activity.location && activity.location !== "-" && (
                          <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                            <MapPin className="h-3 w-3" />
                            {activity.location}
                          </div>
                        )}
                      </td>

                      {/* Customer */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-700 font-medium" style={{ fontFamily: 'Inter' }}>
                            {activity.customer}
                          </span>
                        </div>
                      </td>

                      {/* Assignee */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7">
                            <AvatarFallback className={`${activity.assignee.color} text-white text-xs`}>
                              {activity.assignee.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-700 font-medium" style={{ fontFamily: 'Inter' }}>
                            {activity.assignee.name}
                          </span>
                        </div>
                      </td>

                      {/* Date & Time */}
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700" style={{ fontFamily: 'Inter' }}>
                          {new Date(activity.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        <div className="text-xs text-gray-500" style={{ fontFamily: 'Inter' }}>
                          {activity.time}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        {activity.status === "completed" && (
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300 border text-xs">
                            Completed
                          </Badge>
                        )}
                        {activity.status === "in-progress" && (
                          <Badge className="bg-blue-100 text-blue-700 border-blue-300 border text-xs">
                            In Progress
                          </Badge>
                        )}
                        {activity.status === "upcoming" && (
                          <Badge className="bg-gray-100 text-gray-700 border-gray-300 border text-xs">
                            Upcoming
                          </Badge>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
