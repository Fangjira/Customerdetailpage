import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Combobox, ComboboxOption } from "./ui/combobox";
import { useTranslation } from "react-i18next";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  CalendarIcon,
  Loader2,
  Clock,
  Users,
  MapPin,
  Video,
  CheckCircle2,
} from "lucide-react";
import { format } from "date-fns";
import { Badge } from "./ui/badge";

interface ScheduleMeetingDialogProps {
  dealData?: {
    dealId: string;
    dealName: string;
    customer: string;
    customerEmail: string;
  };
  open: boolean;
  onClose: () => void;
  onSchedule: (meetingData: any) => void;
}

export function ScheduleMeetingDialog({
  dealData,
  open,
  onClose,
  onSchedule,
}: ScheduleMeetingDialogProps) {
  const { t } = useTranslation();
  const [isScheduling, setIsScheduling] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [formData, setFormData] = useState({
    title: `Meeting: ${dealData?.dealName}`,
    date: undefined as Date | undefined,
    time: "10:00",
    duration: "60",
    type: "video",
    location: "",
    attendees: dealData?.customerEmail,
    agenda: "",
    meetingLink: "",
  });

  const handleSchedule = async () => {
    setIsScheduling(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Generate meeting link for video calls
    if (formData.type === "video") {
      setFormData({
        ...formData,
        meetingLink: `https://meet.scgjwd.com/${Math.random().toString(36).substring(7)}`,
      });
    }
    
    onSchedule(formData);
    setIsScheduling(false);
    setIsScheduled(true);
  };

  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00"
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Schedule Meeting
          </DialogTitle>
          <DialogDescription>
            Schedule a meeting for {dealData?.customer}
          </DialogDescription>
        </DialogHeader>

        {!isScheduled ? (
          <div className="space-y-6 py-4">
            {/* Deal Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {dealData?.dealName}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {dealData?.customer} • {dealData?.dealId}
                  </p>
                </div>
              </div>
            </div>

            {/* Meeting Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Meeting Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter meeting title"
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 space-y-2">
                <Label>Meeting Date *</Label>
                <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date
                        ? format(formData.date, "PPP")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => {
                        if (date) {
                          setFormData({ ...formData, date });
                          setShowCalendar(false);
                        }
                      }}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Time *</Label>
                <Combobox
                  options={timeSlots.map((time) => ({ value: time, label: time }))}
                  value={formData.time}
                  onValueChange={(value) =>
                    setFormData({ ...formData, time: value })
                  }
                  placeholder="เลือกเวลา..."
                  searchPlaceholder="ค้นหาเวลา..."
                />
              </div>
            </div>

            {/* Duration and Type */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Duration (minutes) *</Label>
                <Combobox
                  options={[
                    { value: "15", label: "15 minutes" },
                    { value: "30", label: "30 minutes" },
                    { value: "60", label: "1 hour" },
                    { value: "90", label: "1.5 hours" },
                    { value: "120", label: "2 hours" },
                  ]}
                  value={formData.duration}
                  onValueChange={(value) =>
                    setFormData({ ...formData, duration: value })
                  }
                  placeholder="เลือกระยะเวลา..."
                  searchPlaceholder="ค้นหาระยะเวลา..."
                />
              </div>

              <div className="space-y-2">
                <Label>Meeting Type *</Label>
                <Combobox
                  options={[
                    { value: "video", label: "📹 Video Call" },
                    { value: "onsite", label: "📍 On-site Meeting" },
                    { value: "phone", label: "📞 Phone Call" },
                  ]}
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value })
                  }
                  placeholder="เลือกประเภทการประชุม..."
                  searchPlaceholder="ค้นหาประเภท..."
                />
              </div>
            </div>

            {/* Location (conditional) */}
            {formData.type === "onsite" && (
              <div className="space-y-2">
                <Label htmlFor="location">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Location *
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="Enter meeting location"
                />
              </div>
            )}

            {/* Attendees */}
            <div className="space-y-2">
              <Label htmlFor="attendees">
                <Users className="inline h-4 w-4 mr-1" />
                Attendees (Email addresses, comma-separated) *
              </Label>
              <Input
                id="attendees"
                value={formData.attendees}
                onChange={(e) =>
                  setFormData({ ...formData, attendees: e.target.value })
                }
                placeholder="email1@example.com, email2@example.com"
              />
            </div>

            {/* Agenda */}
            <div className="space-y-2">
              <Label htmlFor="agenda">Meeting Agenda</Label>
              <Textarea
                id="agenda"
                value={formData.agenda}
                onChange={(e) =>
                  setFormData({ ...formData, agenda: e.target.value })
                }
                placeholder="Enter meeting agenda or topics to discuss..."
                rows={4}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-6 py-8">
            {/* Success State */}
            <div className="flex flex-col items-center justify-center text-center">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Meeting Scheduled Successfully!
              </h3>
              <p className="text-sm text-gray-600">
                Calendar invites have been sent to all attendees.
              </p>
            </div>

            {/* Meeting Details */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                  Meeting Details
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {formData.title}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Date & Time</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formData.date && format(formData.date, "PPP")} at{" "}
                    {formData.time}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Duration</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formData.duration} minutes
                  </p>
                </div>
              </div>

              {formData.type === "video" && formData.meetingLink && (
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-2">
                    <Video className="inline h-3 w-3 mr-1" />
                    Video Conference Link
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded p-2">
                    <p className="text-xs font-mono text-blue-900 break-all">
                      {formData.meetingLink}
                    </p>
                  </div>
                </div>
              )}

              {formData.type === "onsite" && formData.location && (
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">
                    <MapPin className="inline h-3 w-3 mr-1" />
                    Location
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {formData.location}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <DialogFooter>
          {!isScheduled ? (
            <>
              <Button
                variant="outline"
                onClick={onClose}
                disabled={isScheduling}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSchedule}
                disabled={isScheduling || !formData.date}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isScheduling ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Scheduling...
                  </>
                ) : (
                  <>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Schedule Meeting
                  </>
                )}
              </Button>
            </>
          ) : (
            <Button
              onClick={onClose}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Done
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}