import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, List, Grid } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface CalendarEvent {
  id: string;
  title: string;
  activityType: "customer_visit" | "sales_meeting" | "internal_meeting" | "standard_todo";
  date: string;
  time: string;
  assignee: {
    name: string;
    initials: string;
    color: string;
  };
}

const MOCK_EVENTS: CalendarEvent[] = [
  {
    id: "ACT-2026-0420",
    title: "Customer Visit: PTT Group",
    activityType: "customer_visit",
    date: "2026-04-23",
    time: "10:00 AM",
    assignee: { name: "สมชาย วงศ์สกุล", initials: "SW", color: "bg-blue-600" },
  },
  {
    id: "ACT-2026-0419",
    title: "Sales Meeting - Regional",
    activityType: "sales_meeting",
    date: "2026-04-21",
    time: "2:00 PM",
    assignee: { name: "สมหญิง รักดี", initials: "SR", color: "bg-pink-600" },
  },
  {
    id: "ACT-2026-0421",
    title: "Site Visit - Amata",
    activityType: "customer_visit",
    date: "2026-04-25",
    time: "9:00 AM",
    assignee: { name: "วรรณา ศรีสุข", initials: "WS", color: "bg-purple-600" },
  },
  {
    id: "ACT-2026-0417",
    title: "Strategy Meeting",
    activityType: "internal_meeting",
    date: "2026-04-21",
    time: "9:30 AM",
    assignee: { name: "ประยุทธ์ ใจดี", initials: "PJ", color: "bg-orange-600" },
  },
  {
    id: "ACT-2026-0422",
    title: "Product Demo - SCG",
    activityType: "sales_meeting",
    date: "2026-04-24",
    time: "3:00 PM",
    assignee: { name: "แฮมทาโร่", initials: "HT", color: "bg-emerald-600" },
  },
  {
    id: "TSK-2026-0423",
    title: "Follow-up Call",
    activityType: "standard_todo",
    date: "2026-04-22",
    time: "11:00 AM",
    assignee: { name: "ณัฐพงษ์ ทองดี", initials: "NT", color: "bg-indigo-600" },
  },
  {
    id: "ACT-2026-0424",
    title: "WHA Group Visit",
    activityType: "customer_visit",
    date: "2026-04-28",
    time: "10:30 AM",
    assignee: { name: "สมชาย วงศ์สกุล", initials: "SW", color: "bg-blue-600" },
  },
  {
    id: "ACT-2026-0425",
    title: "Team Sync",
    activityType: "internal_meeting",
    date: "2026-04-29",
    time: "4:00 PM",
    assignee: { name: "สมหญิง รักดี", initials: "SR", color: "bg-pink-600" },
  },
];

const getActivityTypeColor = (type: string) => {
  switch (type) {
    case "customer_visit": return "#3b82f6"; // Blue
    case "sales_meeting": return "#10b981"; // Emerald
    case "internal_meeting": return "#f97316"; // Orange
    case "standard_todo": return "#6b7280"; // Gray
    default: return "#6b7280";
  }
};

const getActivityTypeBadgeColor = (type: string) => {
  switch (type) {
    case "customer_visit": return "bg-blue-100 text-blue-700 border-blue-300";
    case "sales_meeting": return "bg-emerald-100 text-emerald-700 border-emerald-300";
    case "internal_meeting": return "bg-orange-100 text-orange-700 border-orange-300";
    case "standard_todo": return "bg-gray-100 text-gray-700 border-gray-300";
    default: return "bg-gray-100 text-gray-700 border-gray-300";
  }
};

export function CalendarScreen() {
  const [viewMode, setViewMode] = useState<"month" | "list">("month");
  const [currentDate] = useState(new Date("2026-04-21"));

  // Generate calendar days for April 2026
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const calendarDays: (number | null)[] = [];

  // Add empty cells for days before the month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Get events for a specific day
  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return MOCK_EVENTS.filter(event => event.date === dateStr);
  };

  // Group events by date for list view
  const groupedEvents = MOCK_EVENTS.reduce((acc, event) => {
    if (!acc[event.date]) {
      acc[event.date] = [];
    }
    acc[event.date].push(event);
    return acc;
  }, {} as Record<string, CalendarEvent[]>);

  const sortedDates = Object.keys(groupedEvents).sort();

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>
              Calendar
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              April 2026 • {MOCK_EVENTS.length} scheduled events
            </p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <CalendarIcon className="h-4 w-4 mr-2" />
            New Event
          </Button>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>
              April 2026
            </div>
            <Button variant="outline" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)}>
            <TabsList>
              <TabsTrigger value="month">
                <Grid className="h-4 w-4 mr-2" />
                Month Grid
              </TabsTrigger>
              <TabsTrigger value="list">
                <List className="h-4 w-4 mr-2" />
                List View
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {viewMode === "month" ? (
          // Month Grid View
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Day Headers */}
            <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  style={{ fontFamily: 'Inter' }}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7">
              {calendarDays.map((day, index) => {
                const events = day ? getEventsForDay(day) : [];
                const isToday = day === 21; // April 21, 2026

                return (
                  <div
                    key={index}
                    className={`min-h-[140px] border-r border-b border-gray-200 p-2 ${
                      day === null ? "bg-gray-50" : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    {day && (
                      <>
                        {/* Day Number */}
                        <div className="flex items-center justify-between mb-2">
                          <div
                            className={`h-7 w-7 rounded-full flex items-center justify-center text-sm font-semibold ${
                              isToday
                                ? "bg-emerald-600 text-white"
                                : "text-gray-700"
                            }`}
                            style={{ fontFamily: 'Inter' }}
                          >
                            {day}
                          </div>
                        </div>

                        {/* Events - NO taskID shown here */}
                        <div className="space-y-1">
                          {events.slice(0, 3).map((event) => (
                            <div
                              key={event.id}
                              className="text-xs px-2 py-1 rounded cursor-pointer hover:opacity-80 transition-opacity truncate"
                              style={{
                                backgroundColor: getActivityTypeColor(event.activityType) + "20",
                                borderLeft: `3px solid ${getActivityTypeColor(event.activityType)}`,
                                fontFamily: 'Inter'
                              }}
                            >
                              <div className="font-medium truncate">
                                {event.time}
                              </div>
                              <div className="truncate text-gray-700">
                                {event.title}
                              </div>
                            </div>
                          ))}
                          {events.length > 3 && (
                            <div className="text-xs text-gray-500 px-2 font-medium">
                              +{events.length - 3} more
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          // List View
          <div className="max-w-5xl mx-auto space-y-6">
            {sortedDates.map((date) => (
              <div key={date}>
                {/* Date Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white px-4 py-2 rounded-lg border-2 border-gray-200 shadow-sm">
                    <div className="text-sm font-semibold text-gray-900" style={{ fontFamily: 'Inter' }}>
                      {new Date(date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                {/* Events */}
                <div className="space-y-3">
                  {groupedEvents[date].map((event) => (
                    <Card
                      key={event.id}
                      className="cursor-pointer hover:shadow-md transition-shadow border-l-4"
                      style={{
                        borderLeftColor: getActivityTypeColor(event.activityType)
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4 flex-1">
                            {/* Time */}
                            <div className="text-center">
                              <div className="text-sm font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>
                                {event.time.split(' ')[0]}
                              </div>
                              <div className="text-xs text-gray-500">
                                {event.time.split(' ')[1]}
                              </div>
                            </div>

                            {/* Event Details */}
                            <div className="flex-1">
                              {/* Title - NO taskID shown here */}
                              <h3 className="font-semibold text-gray-900 mb-2" style={{ fontFamily: 'Inter' }}>
                                {event.title}
                              </h3>

                              <div className="flex items-center gap-3">
                                {/* Type Badge */}
                                <Badge className={`text-xs font-semibold border ${getActivityTypeBadgeColor(event.activityType)}`}>
                                  {event.activityType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </Badge>

                                {/* Assignee */}
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-5 w-5">
                                    <AvatarFallback className={`${event.assignee.color} text-white text-xs`}>
                                      {event.assignee.initials}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs text-gray-600" style={{ fontFamily: 'Inter' }}>
                                    {event.assignee.name}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Color Indicator */}
                          <div
                            className="h-12 w-1 rounded-full"
                            style={{ backgroundColor: getActivityTypeColor(event.activityType) }}
                          ></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="bg-white border-t border-gray-200 px-6 py-3">
        <div className="flex items-center gap-6 text-xs" style={{ fontFamily: 'Inter' }}>
          <div className="font-semibold text-gray-600">Color Legend:</div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-600"></div>
            <span className="text-gray-700">Customer Visit</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-emerald-600"></div>
            <span className="text-gray-700">Sales Meeting</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-orange-600"></div>
            <span className="text-gray-700">Internal Meeting</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-gray-600"></div>
            <span className="text-gray-700">Standard To-Do</span>
          </div>
        </div>
      </div>
    </div>
  );
}
