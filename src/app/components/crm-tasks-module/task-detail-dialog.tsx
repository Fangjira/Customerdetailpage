import { X, Edit2, Trash2, Calendar as CalendarIcon, User, Users, Clock, MessageSquare } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent } from "../ui/card";

interface TaskDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  task: {
    id: string;
    title: string;
    description?: string;
    status: string;
    priority: string;
    dueDate: string;
    assignee: {
      name: string;
      initials: string;
      color: string;
    };
    createdBy?: {
      name: string;
      initials: string;
      color: string;
    };
    customers?: string[];
    isActivity?: boolean;
    activityType?: string;
    delegationNote?: string;
    createdAt?: string;
    updatedAt?: string;
  };
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "urgent": return "bg-red-100 text-red-700 border-red-300";
    case "high": return "bg-orange-100 text-orange-700 border-orange-300";
    case "medium": return "bg-yellow-100 text-yellow-700 border-yellow-300";
    case "low": return "bg-blue-100 text-blue-700 border-blue-300";
    default: return "bg-gray-100 text-gray-700 border-gray-300";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed": return "bg-emerald-100 text-emerald-700 border-emerald-300";
    case "in-progress": return "bg-blue-100 text-blue-700 border-blue-300";
    case "review": return "bg-purple-100 text-purple-700 border-purple-300";
    case "todo": return "bg-gray-100 text-gray-700 border-gray-300";
    default: return "bg-gray-100 text-gray-700 border-gray-300";
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

export function TaskDetailDialog({ isOpen, onClose, task }: TaskDetailDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              {/* TaskID Badge - JetBrains Mono Font - ONLY PLACE WHERE taskID IS SHOWN */}
              <div className="flex items-center gap-2 mb-3">
                <Badge
                  className="bg-gray-900 text-white border-gray-900 px-3 py-1 text-sm"
                  style={{ fontFamily: 'JetBrains Mono' }}
                >
                  {task.id}
                </Badge>
                {task.isActivity ? (
                  <Badge className={`text-xs font-semibold border ${getActivityTypeBadgeColor(task.activityType || '')}`}>
                    Activity
                  </Badge>
                ) : (
                  <Badge className="bg-gray-100 text-gray-700 border-gray-300 text-xs font-semibold border">
                    To-Do
                  </Badge>
                )}
              </div>

              {/* Title */}
              <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Inter' }}>
                {task.title}
              </h2>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6">
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors ml-4"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-3 gap-6 p-6">
            {/* Main Content - 2/3 width */}
            <div className="col-span-2">
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="related">Related</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-6">
                  {/* Description */}
                  {task.description && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2" style={{ fontFamily: 'Inter' }}>
                        Description
                      </h3>
                      <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Inter' }}>
                        {task.description}
                      </p>
                    </div>
                  )}

                  {/* Multi-Customer Array Section */}
                  {task.customers && task.customers.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3" style={{ fontFamily: 'Inter' }}>
                        Related Customers ({task.customers.length})
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {task.customers.map((customer, index) => (
                          <Badge
                            key={index}
                            className="bg-blue-50 text-blue-700 border-blue-300 border px-3 py-2 text-sm font-semibold"
                            style={{ fontFamily: 'Inter' }}
                          >
                            {customer}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Status & Priority */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2" style={{ fontFamily: 'Inter' }}>
                        Status
                      </h3>
                      <Badge className={`text-sm font-semibold border ${getStatusColor(task.status)}`}>
                        {task.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Badge>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2" style={{ fontFamily: 'Inter' }}>
                        Priority
                      </h3>
                      <Badge className={`text-sm font-semibold border ${getPriorityColor(task.priority)}`}>
                        {task.priority.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  {/* Due Date */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2" style={{ fontFamily: 'Inter' }}>
                      Due Date
                    </h3>
                    <div className="flex items-center gap-2 text-gray-700">
                      <CalendarIcon className="h-4 w-4" />
                      <span style={{ fontFamily: 'Inter' }}>{task.dueDate}</span>
                    </div>
                  </div>

                  {/* Delegation Note */}
                  {task.delegationNote && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2" style={{ fontFamily: 'Inter' }}>
                        Note
                      </h3>
                      <Card className="bg-amber-50 border-amber-200">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <MessageSquare className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <p className="text-amber-900 text-sm leading-relaxed" style={{ fontFamily: 'Inter' }}>
                              {task.delegationNote}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="activity" className="space-y-4">
                  <div className="text-gray-500 text-sm" style={{ fontFamily: 'Inter' }}>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <Clock className="h-4 w-4 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-gray-700 font-medium">Task created</p>
                          <p className="text-xs text-gray-500">{task.createdAt || "2026-04-15 09:30 AM"}</p>
                        </div>
                      </div>
                      {task.updatedAt && (
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <Clock className="h-4 w-4 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-gray-700 font-medium">Last updated</p>
                            <p className="text-xs text-gray-500">{task.updatedAt}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="related">
                  <div className="text-gray-500 text-sm" style={{ fontFamily: 'Inter' }}>
                    No related items found.
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Metadata Sidebar - 1/3 width */}
            <div className="col-span-1 space-y-6">
              {/* Created By vs Assignee - Delegation Section */}
              <Card className="border-2 border-gray-200">
                <CardContent className="p-4 space-y-4">
                  {/* Created By */}
                  {task.createdBy && (
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3" style={{ fontFamily: 'Inter' }}>
                        Created By
                      </h3>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className={`${task.createdBy.color} text-white text-sm`}>
                            {task.createdBy.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm" style={{ fontFamily: 'Inter' }}>
                            {task.createdBy.name}
                          </p>
                          <p className="text-xs text-gray-500">Task Creator</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Divider */}
                  {task.createdBy && <div className="border-t border-gray-200"></div>}

                  {/* Assignee */}
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3" style={{ fontFamily: 'Inter' }}>
                      Assigned To
                    </h3>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className={`${task.assignee.color} text-white text-sm`}>
                          {task.assignee.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm" style={{ fontFamily: 'Inter' }}>
                          {task.assignee.name}
                        </p>
                        <p className="text-xs text-gray-500">Assignee</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Activity Type (if activity) */}
              {task.isActivity && task.activityType && (
                <Card className="border-2 border-gray-200">
                  <CardContent className="p-4">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3" style={{ fontFamily: 'Inter' }}>
                      Activity Type
                    </h3>
                    <Badge className={`text-xs font-semibold border ${getActivityTypeBadgeColor(task.activityType)}`}>
                      {task.activityType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
