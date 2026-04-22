import { useState } from "react";
import { TaskActivityDetailModal } from "./task-activity-detail-modal";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Lock, Eye, Globe, Users, Tag, Calendar, MapPin, Building2, Mail, Briefcase } from "lucide-react";

export function TaskActivityModalDemo() {
  const [openScenario, setOpenScenario] = useState<number | null>(null);

  const scenarios = [
    {
      id: 1,
      title: "Screen 1: Private To-Do",
      description: "Personal task with private visibility",
      highlights: ["Private visibility", "Single assignee (You)", "High priority"],
      icon: Lock,
      color: "from-gray-500 to-gray-600",
    },
    {
      id: 2,
      title: "Screen 2: Shared Personal To-Do",
      description: "Task shared with specific team members",
      highlights: ["Specific people visibility", "2 team members", "Shared with avatars"],
      icon: Eye,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 3,
      title: "Screen 3: Delegated Task",
      description: "Task assigned to multiple team members",
      highlights: ["Organization visibility", "2 assignees", "Delegated work"],
      icon: Users,
      color: "from-purple-500 to-purple-600",
    },
    {
      id: 4,
      title: "Screen 4: Multi-task & Linked Entity",
      description: "Multiple topic tags with linked deal",
      highlights: ["2 topic tags", "Linked entity (Deal)", "Organization wide"],
      icon: Briefcase,
      color: "from-orange-500 to-orange-600",
    },
    {
      id: 5,
      title: "Screen 5: Private Activity",
      description: "Online meeting with customer",
      highlights: ["Activity mode", "Date/Time/Location", "Related customer"],
      icon: Calendar,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      id: 6,
      title: "Screen 6: Team Activity & New Lead",
      description: "Customer visit with multiple attendees",
      highlights: ["New lead contact info", "Service tags", "Team collaboration"],
      icon: Building2,
      color: "from-pink-500 to-pink-600",
    },
    {
      id: 7,
      title: "Screen 7: Mixed Mode (Task + Activity)",
      description: "Combined task preparation and activity",
      highlights: ["Task description", "Activity details", "Mixed mode UI"],
      icon: Tag,
      color: "from-indigo-500 to-indigo-600",
    },
    {
      id: 8,
      title: "Screen 8: Received Task",
      description: "Task assigned by manager",
      highlights: ["Created by indicator", "Co-assignee status", "Team meeting"],
      icon: Mail,
      color: "from-rose-500 to-rose-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Task & Activity Detail Modal Design System
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            8 comprehensive scenarios covering all data types and use cases for Enterprise CRM
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
              <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
              <span className="text-gray-700">Task Mode</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
              <div className="h-3 w-3 rounded-full bg-purple-500"></div>
              <span className="text-gray-700">Activity Mode</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
              <div className="h-3 w-3 rounded-full bg-indigo-500"></div>
              <span className="text-gray-700">Mixed Mode</span>
            </div>
          </div>
        </div>

        {/* Scenario Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {scenarios.map((scenario) => {
            const Icon = scenario.icon;
            return (
              <Card
                key={scenario.id}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-gray-300"
                onClick={() => setOpenScenario(scenario.id)}
              >
                <CardContent className="p-6">
                  <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${scenario.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="font-bold text-gray-900 mb-2 text-lg leading-tight">
                    {scenario.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {scenario.description}
                  </p>

                  <div className="space-y-2">
                    {scenario.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></div>
                        <span className="text-xs text-gray-600">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className="w-full mt-4 bg-gray-900 hover:bg-gray-800 text-white group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-emerald-500"
                    size="sm"
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Feature Highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
            <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <Users className="h-7 w-7 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Smart Visibility</h3>
            <p className="text-sm text-gray-600">
              Private, specific people, or organization-wide visibility with contextual sharing controls
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
            <div className="h-14 w-14 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-7 w-7 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Flexible Modes</h3>
            <p className="text-sm text-gray-600">
              Task-only, Activity-only, or Mixed mode with intelligent field adaptation
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
            <div className="h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <Briefcase className="h-7 w-7 text-emerald-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Rich Context</h3>
            <p className="text-sm text-gray-600">
              Linked entities, attendees, service tags, and customer relationships in one view
            </p>
          </div>
        </div>

        {/* Design Principles */}
        <div className="mt-12 p-8 bg-white rounded-2xl shadow-sm border-2 border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Design Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">🎨 Clean & Organized</h4>
              <p className="text-sm text-gray-600">
                Clear visual hierarchy with color-coded sections and consistent spacing
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">👥 People-First</h4>
              <p className="text-sm text-gray-600">
                Prominent avatar displays for assignees, attendees, and collaborators
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">🔗 Context-Rich</h4>
              <p className="text-sm text-gray-600">
                Linked entities, customer info, and related data always visible
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">⚡ Smart Adaptation</h4>
              <p className="text-sm text-gray-600">
                UI adapts based on mode, visibility, and data availability
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {openScenario && (
        <TaskActivityDetailModal
          isOpen={!!openScenario}
          onClose={() => setOpenScenario(null)}
          scenario={openScenario as any}
        />
      )}
    </div>
  );
}

export default TaskActivityModalDemo;
