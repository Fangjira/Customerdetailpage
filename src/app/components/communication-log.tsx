import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import {
  Phone,
  Mail,
  MessageSquare,
  Video,
  Calendar,
  Send,
  Paperclip,
  Plus,
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface Communication {
  id: string;
  type: "call" | "email" | "meeting" | "note" | "sms";
  direction?: "inbound" | "outbound";
  subject: string;
  content: string;
  user: string;
  timestamp: string;
  duration?: string;
  attachments?: string[];
}

interface CommunicationLogProps {
  customerId?: string;
  dealId?: string;
}

export function CommunicationLog({
  customerId,
  dealId,
}: CommunicationLogProps) {
  const { t } = useTranslation();
  const [newNote, setNewNote] = useState("");
  const [communications, setCommunications] = useState<Communication[]>([
    {
      id: "1",
      type: "call",
      direction: "outbound",
      subject: "Follow-up call regarding quotation",
      content:
        "Discussed pricing details and delivery timeline. Customer requested minor adjustments to payment terms. Agreed to send revised quotation by EOD.",
      user: "Sarah Chen",
      timestamp: "2024-12-26 10:30",
      duration: "15 min",
    },
    {
      id: "2",
      type: "email",
      direction: "outbound",
      subject: "Quotation Q-2024-156 - Warehousing Services",
      content:
        "Dear Mr. Johnson,\n\nThank you for your interest in our warehousing services. Please find attached the detailed quotation as discussed.\n\nKey highlights:\n- 10,000 sqm warehouse space\n- Temperature controlled zones\n- 24/7 security and monitoring\n\nPlease let me know if you have any questions.\n\nBest regards,\nSarah Chen",
      user: "Sarah Chen",
      timestamp: "2024-12-25 16:45",
      attachments: ["Q-2024-156.pdf"],
    },
    {
      id: "3",
      type: "meeting",
      subject: "Site visit and requirements discussion",
      content:
        "Conducted site visit with customer team. Reviewed warehouse layout, loading docks, and storage requirements. Customer impressed with facility capabilities. Next steps: prepare detailed proposal.",
      user: "Michael Park",
      timestamp: "2024-12-25 14:00",
      duration: "2 hours",
    },
    {
      id: "4",
      type: "email",
      direction: "inbound",
      subject: "Re: Service inquiry",
      content:
        "Thank you for the quick response. We would like to schedule a call to discuss the pricing in detail. Are you available tomorrow afternoon?",
      user: "John Johnson (Customer)",
      timestamp: "2024-12-24 11:20",
    },
    {
      id: "5",
      type: "note",
      subject: "Internal note",
      content:
        "Customer has budget approval for Q1 2025. Good opportunity to close before year end. Need to expedite proposal preparation.",
      user: "Sarah Chen",
      timestamp: "2024-12-24 09:15",
    },
    {
      id: "6",
      type: "call",
      direction: "inbound",
      subject: "Initial inquiry call",
      content:
        "Customer called inquiring about warehousing services for pharmaceutical products. Requires GMP-compliant facility with temperature control. Sent initial information pack.",
      user: "Sarah Chen",
      timestamp: "2024-12-23 15:30",
      duration: "20 min",
    },
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case "call":
        return <Phone className="h-4 w-4" />;
      case "email":
        return <Mail className="h-4 w-4" />;
      case "meeting":
        return <Video className="h-4 w-4" />;
      case "note":
        return <MessageSquare className="h-4 w-4" />;
      case "sms":
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "call":
        return "bg-[#dbeafe] text-[#1e40af]";
      case "email":
        return "bg-[#fef3c7] text-[#92400e]";
      case "meeting":
        return "bg-[#f5f3ff] text-[#705add]";
      case "note":
        return "bg-[#f3f4f6] text-[#4b5563]";
      default:
        return "bg-[#f0fdf4] text-[#16a34a]";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const note: Communication = {
      id: Date.now().toString(),
      type: "note",
      subject: "Quick note",
      content: newNote,
      user: "Sarah Chen",
      timestamp: new Date().toISOString().slice(0, 16).replace("T", " "),
    };

    setCommunications([note, ...communications]);
    setNewNote("");
  };

  return (
    <Card className="border-2 border-[#ede9fe] shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-[#4c1d95]">
            {t("communication.title")}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-2 border-[#ede9fe] text-[#705add] hover:bg-[#f5f3ff] rounded-lg gap-2 h-8"
            >
              <Phone className="h-3 w-3" />
              {t("communication.log_call")}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-2 border-[#ede9fe] text-[#705add] hover:bg-[#f5f3ff] rounded-lg gap-2 h-8"
            >
              <Mail className="h-3 w-3" />
              {t("communication.log_email")}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-2 border-[#ede9fe] text-[#705add] hover:bg-[#f5f3ff] rounded-lg gap-2 h-8"
            >
              <Calendar className="h-3 w-3" />
              {t("communication.log_meeting")}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Note Input */}
        <div className="space-y-2">
          <div className="relative">
            <Textarea
              placeholder={t("communication.add_note_placeholder")}
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="border-2 border-[#ede9fe] rounded-xl min-h-[80px] pr-24"
            />
            <div className="absolute bottom-2 right-2 flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-[#9333ea] hover:bg-[#f5f3ff]"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                onClick={handleAddNote}
                disabled={!newNote.trim()}
                className="bg-[#705add] text-white hover:bg-[#5b21b6] rounded-lg gap-1 h-8"
              >
                <Send className="h-3 w-3" />
                {t("communication.add_note")}
              </Button>
            </div>
          </div>
        </div>

        {/* Communication History */}
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-4">
            {communications.map((comm, index) => (
              <div
                key={comm.id}
                className="flex gap-4 pb-4 border-b border-[#ede9fe] last:border-0 last:pb-0"
              >
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div
                    className={`h-10 w-10 rounded-xl ${getTypeColor(
                      comm.type
                    )} flex items-center justify-center flex-shrink-0`}
                  >
                    {getIcon(comm.type)}
                  </div>
                  {index < communications.length - 1 && (
                    <div className="w-0.5 flex-1 bg-[#ede9fe] mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          className={`${getTypeColor(comm.type)} border-0 text-xs`}
                        >
                          {comm.type.toUpperCase()}
                        </Badge>
                        {comm.direction && (
                          <Badge
                            className={
                              comm.direction === "outbound"
                                ? "bg-[#dcfce7] text-[#166534] border-[#86efac] text-xs"
                                : "bg-[#dbeafe] text-[#1e40af] border-[#93c5fd] text-xs"
                            }
                          >
                            {comm.direction === "outbound" ? "↑ Out" : "↓ In"}
                          </Badge>
                        )}
                        {comm.duration && (
                          <span className="text-xs text-[#a78bfa]">
                            {comm.duration}
                          </span>
                        )}
                      </div>
                      <h4 className="font-semibold text-[#4c1d95] text-sm mb-1">
                        {comm.subject}
                      </h4>
                      <p className="text-sm text-[#6b7280] whitespace-pre-line mb-2">
                        {comm.content}
                      </p>
                      {comm.attachments && comm.attachments.length > 0 && (
                        <div className="flex items-center gap-2 mt-2">
                          {comm.attachments.map((attachment, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-1 px-2 py-1 bg-[#f0fdf4] border border-[#f0fdf4] rounded-lg text-xs text-[#16a34a]"
                            >
                              <Paperclip className="h-3 w-3" />
                              {attachment}
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-2 mt-3">
                        <Avatar className="h-5 w-5 border border-[#ede9fe]">
                          <AvatarFallback className="bg-[#16a34a] text-white text-xs">
                            {getInitials(comm.user)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-[#9333ea]">
                          {comm.user}
                        </span>
                        <span className="text-xs text-[#a78bfa]">•</span>
                        <span className="text-xs text-[#4ade80]">
                          {comm.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}