import { X, Calendar, Clock, MapPin, Users, FileText, Briefcase, Building2, Mail, Phone, Globe, Lock, Eye, Tag, User, Video, MessageSquare, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface TaskActivityDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  scenario: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
}

interface LinkedEntity {
  type: 'deal' | 'document' | 'customer' | 'quotation';
  name: string;
  icon: any;
}

interface Person {
  name: string;
  initials: string;
  color: string;
}

const SCENARIOS = {
  1: {
    title: "Private To-Do",
    topicTags: ["Compile Monthly Sales Report"],
    assignee: "You",
    visibility: "private",
    isActivity: false,
    description: "Compile and analyze all sales data from the previous month. Include revenue breakdown by region, product category, and sales representative performance metrics.",
    dueDate: "2026-04-25",
    dueTime: "17:00",
    priority: "high",
  },
  2: {
    title: "Shared Personal To-Do",
    topicTags: ["Prepare Q2 Sales Plan"],
    assignee: "You",
    visibility: "specific",
    sharedWith: [
      { name: "Sarah Chen", initials: "SC", color: "bg-blue-500" },
      { name: "Mike Johnson", initials: "MJ", color: "bg-green-500" },
    ],
    isActivity: false,
    description: "Create comprehensive Q2 sales plan including targets, strategies, and resource allocation for the upcoming quarter.",
    dueDate: "2026-04-28",
    dueTime: "15:00",
    priority: "high",
  },
  3: {
    title: "Delegated Task",
    topicTags: ["Coordinate Product Claim"],
    assignees: [
      { name: "Mr. A", initials: "A", color: "bg-purple-500" },
      { name: "Mr. B", initials: "B", color: "bg-orange-500" },
    ],
    visibility: "organization",
    isActivity: false,
    description: "Coordinate with logistics team and customer to process product claim. Verify claim details, assess product condition, and initiate replacement or refund process.",
    dueDate: "2026-04-27",
    priority: "medium",
  },
  4: {
    title: "Multi-task & Linked Entity",
    topicTags: ["Send Document", "Follow up Customer"],
    assignee: "You",
    visibility: "organization",
    linkedEntities: [
      { type: 'deal', name: "Ocean Freight", icon: Briefcase },
    ],
    isActivity: false,
    description: "Send updated contract documents to customer and follow up to confirm receipt and address any questions or concerns.",
    dueDate: "2026-04-26",
    priority: "high",
  },
  5: {
    title: "Private Activity",
    topicTags: ["Schedule Meeting"],
    assignee: "You",
    visibility: "private",
    isActivity: true,
    activityType: "Online Meeting",
    activityDate: "2026-04-24",
    startTime: "14:00",
    endTime: "15:30",
    agenda: "Discuss project requirements, timeline, and budget allocation for the upcoming enterprise system implementation.",
    relatedCustomer: "Giant Group",
    location: "Zoom Meeting Room",
    attendees: [
      { name: "You", initials: "YU", color: "bg-emerald-500" },
    ],
  },
  6: {
    title: "Team Activity & New Lead",
    topicTags: ["Visit Customer"],
    isActivity: true,
    activityType: "On-site Visit",
    activityDate: "2026-04-25",
    startTime: "10:00",
    endTime: "12:00",
    assignees: [
      { name: "You", initials: "YU", color: "bg-emerald-500" },
      { name: "David Lee", initials: "DL", color: "bg-blue-500" },
      { name: "Anna Wang", initials: "AW", color: "bg-pink-500" },
    ],
    attendees: [
      { name: "You", initials: "YU", color: "bg-emerald-500" },
      { name: "David Lee", initials: "DL", color: "bg-blue-500" },
      { name: "Anna Wang", initials: "AW", color: "bg-pink-500" },
    ],
    serviceTags: ["Logistics", "Warehouse"],
    relatedCustomer: "Neo Logistics",
    isNewLead: true,
    leadEmail: "contact@neologistics.com",
    leadPhone: "+66-2-123-4567",
    agenda: "Initial site visit to assess logistics requirements and warehouse capacity needs. Present our service offerings and discuss potential partnership opportunities.",
    location: "Neo Logistics Headquarters, Bangkok",
    visibility: "organization",
  },
  7: {
    title: "Mixed Mode (Task + Activity)",
    topicTags: ["Prepare Presentation", "Visit Customer"],
    assignee: "You",
    visibility: "organization",
    isActivity: true,
    isMixedMode: true,
    activityType: "Customer Visit",
    activityDate: "2026-04-26",
    startTime: "09:00",
    endTime: "11:00",
    description: "Prepare comprehensive presentation covering our service portfolio, case studies, and pricing proposals. Ensure all materials are ready before the customer visit.",
    agenda: "Present company capabilities, demonstrate platform features, discuss customer requirements, and negotiate service terms.",
    location: "Customer Office - Silom, Bangkok",
    dueDate: "2026-04-26",
    priority: "high",
  },
  8: {
    title: "Received Task (Co-Assignee)",
    topicTags: ["Monthly Sales Team Meeting"],
    isActivity: true,
    activityType: "Team Meeting",
    activityDate: "2026-04-30",
    startTime: "13:00",
    endTime: "15:00",
    createdBy: { name: "Mr. C - Manager", initials: "MC", color: "bg-indigo-600" },
    assignees: [
      { name: "You", initials: "YU", color: "bg-emerald-500" },
      { name: "Mr. A", initials: "A", color: "bg-purple-500" },
      { name: "Sarah Chen", initials: "SC", color: "bg-blue-500" },
      { name: "Mike Johnson", initials: "MJ", color: "bg-green-500" },
    ],
    attendees: [
      { name: "You", initials: "YU", color: "bg-emerald-500" },
      { name: "Mr. A", initials: "A", color: "bg-purple-500" },
      { name: "Sarah Chen", initials: "SC", color: "bg-blue-500" },
      { name: "Mike Johnson", initials: "MJ", color: "bg-green-500" },
    ],
    agenda: "Review monthly sales performance, discuss Q2 targets, share best practices, and address team challenges. Department-wide strategic planning session.",
    location: "Conference Room A, 3rd Floor",
    visibility: "organization",
    isReceived: true,
  },
};

const VisibilityBadge = ({ visibility }: { visibility: string }) => {
  if (visibility === "private") {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
        <Lock className="h-4 w-4" />
        <span>Private</span>
      </div>
    );
  }
  if (visibility === "specific") {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
        <Eye className="h-4 w-4" />
        <span>Specific People</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium">
      <Globe className="h-4 w-4" />
      <span>Organization</span>
    </div>
  );
};

const PriorityBadge = ({ priority }: { priority: string }) => {
  const colors = {
    high: "bg-red-100 text-red-700 border-red-200",
    medium: "bg-orange-100 text-orange-700 border-orange-200",
    low: "bg-blue-100 text-blue-700 border-blue-200",
  };

  return (
    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${colors[priority as keyof typeof colors]}`}>
      {priority === 'high' && '🔴'} {priority === 'medium' && '🟠'} {priority === 'low' && '🔵'} {priority?.toUpperCase()}
    </span>
  );
};

export function TaskActivityDetailModal({ isOpen, onClose, scenario }: TaskActivityDetailModalProps) {
  const data = SCENARIOS[scenario];

  const getInteractionIcon = (type: string) => {
    if (type?.includes('Online') || type?.includes('Zoom')) return <Video className="h-4 w-4" />;
    if (type?.includes('Visit')) return <MapPin className="h-4 w-4" />;
    if (type?.includes('Meeting')) return <Users className="h-4 w-4" />;
    return <MessageSquare className="h-4 w-4" />;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <DialogHeader className="border-b pb-4 -mx-6 px-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <DialogTitle className="text-xl font-bold text-gray-900">
                  {data.title}
                </DialogTitle>
                {data.isActivity && (
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                    Activity
                  </Badge>
                )}
                {!data.isActivity && (
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    Task
                  </Badge>
                )}
              </div>

              {/* Topic Tags */}
              <div className="flex flex-wrap gap-2">
                {data.topicTags.map((tag, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg">
                    <Tag className="h-3.5 w-3.5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">{tag}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Received Task Banner */}
          {data.isReceived && (
            <div className="mt-4 -mx-6 px-6 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className={data.createdBy?.color}>
                      {data.createdBy?.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      <span className="text-indigo-600">Assigned to you</span> by {data.createdBy?.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogHeader>

        {/* Main Content */}
        <div className="space-y-6 py-4">
          {/* Description (Task Mode or Mixed Mode) */}
          {(data.description || data.isMixedMode) && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Task Description
              </label>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {data.description}
                </p>
              </div>
            </div>
          )}

          {/* Activity Details */}
          {data.isActivity && (
            <div className="grid grid-cols-2 gap-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-purple-900 uppercase tracking-wide">
                  Interaction Type
                </label>
                <div className="flex items-center gap-2 text-purple-700">
                  {getInteractionIcon(data.activityType || '')}
                  <span className="font-medium">{data.activityType}</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-purple-900 uppercase tracking-wide">
                  Date
                </label>
                <div className="flex items-center gap-2 text-purple-700">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">
                    {data.activityDate && new Date(data.activityDate).toLocaleDateString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-purple-900 uppercase tracking-wide">
                  Time
                </label>
                <div className="flex items-center gap-2 text-purple-700">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">{data.startTime} - {data.endTime}</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-purple-900 uppercase tracking-wide">
                  Location
                </label>
                <div className="flex items-center gap-2 text-purple-700">
                  <MapPin className="h-4 w-4" />
                  <span className="font-medium text-sm">{data.location}</span>
                </div>
              </div>
            </div>
          )}

          {/* Agenda (Activity only) */}
          {data.isActivity && data.agenda && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Agenda
              </label>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {data.agenda}
                </p>
              </div>
            </div>
          )}

          {/* Due Date & Priority (Task only) */}
          {!data.isActivity && data.dueDate && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Due Date</label>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <Calendar className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">
                    {new Date(data.dueDate).toLocaleDateString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                  {data.dueTime && (
                    <>
                      <span className="text-gray-400">•</span>
                      <Clock className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">{data.dueTime}</span>
                    </>
                  )}
                </div>
              </div>

              {data.priority && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Priority</label>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <PriorityBadge priority={data.priority} />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Assignee / Assignees */}
          {(data.assignee || data.assignees) && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <User className="h-4 w-4" />
                {data.assignees ? 'Assignees' : 'Assignee'}
              </label>
              <div className="flex flex-wrap gap-2">
                {data.assignee === "You" && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border-2 border-emerald-500 rounded-lg">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="bg-emerald-500 text-white text-xs">YU</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-emerald-700">You</span>
                  </div>
                )}
                {data.assignees?.map((person, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                      person.name === 'You'
                        ? 'bg-emerald-50 border-2 border-emerald-500'
                        : 'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className={person.color + " text-white text-xs"}>
                        {person.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className={`text-sm font-medium ${person.name === 'You' ? 'text-emerald-700' : 'text-gray-700'}`}>
                      {person.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Attendees (Activity only) */}
          {data.isActivity && data.attendees && data.attendees.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Attendees ({data.attendees.length})
              </label>
              <div className="flex flex-wrap gap-2">
                {data.attendees.map((person, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                      person.name === 'You'
                        ? 'bg-emerald-50 border-2 border-emerald-500'
                        : 'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className={person.color + " text-white text-xs"}>
                        {person.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className={`text-sm font-medium ${person.name === 'You' ? 'text-emerald-700' : 'text-gray-700'}`}>
                      {person.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Customer */}
          {data.relatedCustomer && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Related Customer
              </label>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{data.relatedCustomer}</p>
                      {data.isNewLead && (
                        <Badge className="mt-1 bg-orange-100 text-orange-700 border-orange-300">
                          New Lead
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* New Lead Contact Info */}
                {data.isNewLead && (
                  <div className="mt-4 pt-4 border-t border-blue-200 grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-xs text-blue-700 font-medium">Email</p>
                        <p className="text-sm text-gray-900 font-medium">{data.leadEmail}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-xs text-blue-700 font-medium">Phone</p>
                        <p className="text-sm text-gray-900 font-medium">{data.leadPhone}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Service Tags */}
          {data.serviceTags && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Service Tags</label>
              <div className="flex flex-wrap gap-2">
                {data.serviceTags.map((tag, idx) => (
                  <Badge key={idx} className="bg-indigo-100 text-indigo-700 border-indigo-300">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Linked Entities */}
          {data.linkedEntities && data.linkedEntities.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Linked Entities
              </label>
              <div className="flex flex-wrap gap-2">
                {data.linkedEntities.map((entity, idx) => {
                  const Icon = entity.icon;
                  return (
                    <div key={idx} className="flex items-center gap-2 px-4 py-2.5 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors cursor-pointer">
                      <div className="h-8 w-8 rounded-md bg-orange-600 flex items-center justify-center">
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-orange-700 font-medium uppercase tracking-wide">
                          {entity.type}
                        </p>
                        <p className="text-sm font-semibold text-gray-900">{entity.name}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Visibility & Shared With */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">Visibility</label>
              <VisibilityBadge visibility={data.visibility} />
            </div>

            {/* Shared With (only if visibility is 'specific') */}
            {data.visibility === 'specific' && data.sharedWith && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Shared with</label>
                <div className="flex items-center gap-2">
                  {data.sharedWith.map((person, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className={person.color + " text-white text-xs"}>
                          {person.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-blue-700">{person.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t -mx-6 px-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Mark as Complete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
