import { useState } from "react";
import { TaskDetailDialog } from "./task-detail-dialog";
import { Button } from "../ui/button";
import { FileText, Users } from "lucide-react";

const MOCK_TASKS = [
  {
    id: "TSK-2026-0418",
    title: "Industrial Zone Sync",
    description: "Coordinate and synchronize activities across multiple industrial zones for Q2 planning. Review current operations, identify synergies, and establish unified communication protocols.",
    status: "todo",
    priority: "medium",
    assignee: { name: "วรรณา ศรีสุข", initials: "WS", color: "bg-purple-600" },
    dueDate: "2026-04-25",
    customers: ["Amata Corp", "WHA Group", "Thai Factory"],
    isActivity: false,
    createdAt: "2026-04-15 09:30 AM",
    updatedAt: "2026-04-20 02:15 PM",
  },
  {
    id: "ACT-2026-0420",
    title: "Customer Visit: PTT Group",
    description: "Site visit to PTT Group headquarters to discuss expansion opportunities and review current service satisfaction. Prepare presentation materials and coordinate with regional team.",
    status: "todo",
    priority: "high",
    assignee: { name: "สมชาย วงศ์สกุล", initials: "SW", color: "bg-blue-600" },
    createdBy: { name: "แฮมทาโร่", initials: "HT", color: "bg-emerald-600" },
    dueDate: "2026-04-23",
    isActivity: true,
    activityType: "customer_visit",
    delegationNote: "Joining as an observer",
    createdAt: "2026-04-18 10:45 AM",
    updatedAt: "2026-04-19 03:30 PM",
  },
];

export function TaskDetailDemo() {
  const [selectedTask, setSelectedTask] = useState<typeof MOCK_TASKS[0] | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Inter' }}>
              Task & Activity Detail Dialog
            </h1>
            <p className="text-gray-600" style={{ fontFamily: 'Inter' }}>
              Click on any example below to view the full detail dialog with proper TaskID display and metadata.
            </p>
          </div>

          <div className="space-y-4">
            {/* Example 1: Multi-Customer Task */}
            <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-emerald-500 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>
                      Industrial Zone Sync
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3" style={{ fontFamily: 'Inter' }}>
                    Standard To-Do with 3 related customers
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Users className="h-4 w-4" />
                    <span>Amata Corp • WHA Group • Thai Factory</span>
                  </div>
                </div>
                <Button
                  onClick={() => setSelectedTask(MOCK_TASKS[0])}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  View Details
                </Button>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                <p className="text-sm text-blue-900" style={{ fontFamily: 'Inter' }}>
                  <strong>Demonstrates:</strong> Multi-customer array section with 3 customer badges stacked cleanly
                </p>
              </div>
            </div>

            {/* Example 2: Delegated Activity */}
            <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-emerald-500 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>
                      Customer Visit: PTT Group
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3" style={{ fontFamily: 'Inter' }}>
                    Activity with delegation (Created By ≠ Assignee)
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Users className="h-4 w-4" />
                    <span>Created by แฮมทาโร่ • Assigned to สมชาย วงศ์สกุล</span>
                  </div>
                </div>
                <Button
                  onClick={() => setSelectedTask(MOCK_TASKS[1])}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  View Details
                </Button>
              </div>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded">
                <p className="text-sm text-amber-900" style={{ fontFamily: 'Inter' }}>
                  <strong>Demonstrates:</strong> Created By vs Assignee metadata sidebar with delegation note "Joining as an observer"
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2" style={{ fontFamily: 'Inter' }}>
              Design Features:
            </h4>
            <ul className="text-sm text-gray-600 space-y-1" style={{ fontFamily: 'Inter' }}>
              <li>• <strong>Monospace TaskID Badge</strong> - JetBrains Mono font at the top (ONLY place taskID is shown)</li>
              <li>• <strong>To-Do or Activity Tag</strong> - Clear type identification</li>
              <li>• <strong>Rounded Action Buttons</strong> - Edit (Emerald) and Delete (Red)</li>
              <li>• <strong>Tabbed Interface</strong> - Details, Activity, Related sections</li>
              <li>• <strong>Multi-Customer Badges</strong> - Clean, stacked layout for customer arrays</li>
              <li>• <strong>Delegation Metadata</strong> - Sidebar showing Created By vs Assignee</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Dialog */}
      {selectedTask && (
        <TaskDetailDialog
          isOpen={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          task={selectedTask}
        />
      )}
    </div>
  );
}
