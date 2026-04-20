import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Combobox } from "./ui/combobox";
import {
  Send,
  Paperclip,
  X,
  FileText,
  Image as ImageIcon,
  Calendar,
  Bold,
  Italic,
  List,
  Link as LinkIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface EmailComposerProps {
  isOpen: boolean;
  onClose: () => void;
  to?: string;
  subject?: string;
  relatedTo?: {
    type: "deal" | "customer" | "quotation" | "contract";
    id: string;
    name: string;
  };
}

export function EmailComposer({
  isOpen,
  onClose,
  to = "",
  subject = "",
  relatedTo,
}: EmailComposerProps) {
  const { t } = useTranslation();
  const [emailData, setEmailData] = useState({
    to: to,
    cc: "",
    bcc: "",
    subject: subject,
    body: "",
    template: "",
  });
  const [attachments, setAttachments] = useState<
    { name: string; size: string; type: string }[]
  >([]);
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);

  const templates = [
    {
      id: "quotation_followup",
      name: "Quotation Follow-up",
      subject: "Following up on quotation {{quotation_id}}",
      body: "Dear {{customer_name}},\n\nI hope this email finds you well. I wanted to follow up on the quotation we sent on {{date}}.\n\nIf you have any questions or need any clarification, please don't hesitate to reach out.\n\nBest regards,",
    },
    {
      id: "meeting_confirmation",
      name: "Meeting Confirmation",
      subject: "Meeting Confirmation - {{date}}",
      body: "Dear {{customer_name}},\n\nThis is to confirm our meeting scheduled for {{date}} at {{time}}.\n\nMeeting details:\n- Date: {{date}}\n- Time: {{time}}\n- Location: {{location}}\n\nLooking forward to meeting you.\n\nBest regards,",
    },
    {
      id: "contract_reminder",
      name: "Contract Renewal Reminder",
      subject: "Contract Renewal - {{contract_id}}",
      body: "Dear {{customer_name}},\n\nThis is a friendly reminder that your contract {{contract_id}} is due for renewal on {{expiry_date}}.\n\nWe would like to discuss renewal terms at your convenience.\n\nBest regards,",
    },
  ];

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setEmailData({
        ...emailData,
        template: templateId,
        subject: template.subject,
        body: template.body,
      });
    }
  };

  const handleAttachment = () => {
    // Mock attachment
    setAttachments([
      ...attachments,
      {
        name: "Quotation_Q-2024-156.pdf",
        size: "2.4 MB",
        type: "application/pdf",
      },
    ]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSend = () => {
    console.log("Sending email:", emailData, attachments);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 gap-0">
        <DialogHeader className="p-6 pb-4 border-b border-[#ede9fe]">
          <DialogTitle className="text-[#4c1d95]">
            {t("email.compose")}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {t("email.compose")}
          </DialogDescription>
          <div className="flex items-center justify-between">
            <Combobox
              options={templates.map((template) => ({
                value: template.id,
                label: template.name,
              }))}
              value={emailData.template}
              onValueChange={handleTemplateSelect}
              placeholder={t("email.select_template")}
              searchPlaceholder="Search..."
              className="w-56 border-2 border-[#ede9fe] rounded-xl h-9 text-sm"
            />
          </div>
          {relatedTo && (
            <Badge className="w-fit bg-[#f5f3ff] text-[#705add] border-[#ede9fe] mt-2">
              {t("email.related_to")}: {relatedTo.type} - {relatedTo.name}
            </Badge>
          )}
        </DialogHeader>

        <div className="p-6 space-y-4 overflow-y-auto" style={{ maxHeight: "calc(90vh - 200px)" }}>
          {/* To Field */}
          <div className="space-y-2">
            <Label className="text-[#4c1d95]">{t("email.to")}</Label>
            <Input
              value={emailData.to}
              onChange={(e) =>
                setEmailData({ ...emailData, to: e.target.value })
              }
              placeholder="recipient@example.com"
              className="border-2 border-[#ede9fe] rounded-xl"
            />
            <div className="flex items-center gap-2">
              {!showCc && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCc(true)}
                  className="text-[#705add] hover:bg-[#f5f3ff] h-7 text-xs"
                >
                  + Cc
                </Button>
              )}
              {!showBcc && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBcc(true)}
                  className="text-[#705add] hover:bg-[#f5f3ff] h-7 text-xs"
                >
                  + Bcc
                </Button>
              )}
            </div>
          </div>

          {/* Cc Field */}
          {showCc && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-[#4c1d95]">{t("email.cc")}</Label>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowCc(false)}
                  className="h-6 w-6"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <Input
                value={emailData.cc}
                onChange={(e) =>
                  setEmailData({ ...emailData, cc: e.target.value })
                }
                placeholder="cc@example.com"
                className="border-2 border-[#ede9fe] rounded-xl"
              />
            </div>
          )}

          {/* Bcc Field */}
          {showBcc && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-[#4c1d95]">{t("email.bcc")}</Label>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowBcc(false)}
                  className="h-6 w-6"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <Input
                value={emailData.bcc}
                onChange={(e) =>
                  setEmailData({ ...emailData, bcc: e.target.value })
                }
                placeholder="bcc@example.com"
                className="border-2 border-[#ede9fe] rounded-xl"
              />
            </div>
          )}

          {/* Subject Field */}
          <div className="space-y-2">
            <Label className="text-[#4c1d95]">{t("email.subject")}</Label>
            <Input
              value={emailData.subject}
              onChange={(e) =>
                setEmailData({ ...emailData, subject: e.target.value })
              }
              placeholder={t("email.enter_subject")}
              className="border-2 border-[#ede9fe] rounded-xl"
            />
          </div>

          {/* Formatting Toolbar */}
          <div className="flex items-center gap-1 p-2 bg-[#faf8ff] border border-[#ede9fe] rounded-xl">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-[#705add] hover:bg-white"
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-[#705add] hover:bg-white"
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-[#705add] hover:bg-white"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-[#705add] hover:bg-white"
            >
              <LinkIcon className="h-4 w-4" />
            </Button>
            <div className="flex-1" />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleAttachment}
              className="h-8 text-[#705add] hover:bg-white gap-1 text-xs"
            >
              <Paperclip className="h-4 w-4" />
              {t("email.attach")}
            </Button>
          </div>

          {/* Body Field */}
          <div className="space-y-2">
            <Label className="text-[#4c1d95]">{t("email.message")}</Label>
            <Textarea
              value={emailData.body}
              onChange={(e) =>
                setEmailData({ ...emailData, body: e.target.value })
              }
              placeholder={t("email.enter_message")}
              className="border-2 border-[#ede9fe] rounded-xl min-h-[300px]"
            />
          </div>

          {/* Attachments */}
          {attachments.length > 0 && (
            <div className="space-y-2">
              <Label className="text-[#4c1d95]">
                {t("email.attachments")} ({attachments.length})
              </Label>
              <div className="space-y-2">
                {attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-[#faf8ff] border border-[#ede9fe] rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-[#f5f3ff] border-2 border-[#ede9fe] rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-[#705add]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#4c1d95]">
                          {attachment.name}
                        </p>
                        <p className="text-xs text-[#9333ea]">
                          {attachment.size}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeAttachment(index)}
                      className="h-8 w-8 text-[#ef4444] hover:bg-[#fee2e2]"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-6 pt-4 border-t border-[#ede9fe] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-[#705add] hover:bg-[#f5f3ff] gap-1"
            >
              <Calendar className="h-4 w-4" />
              {t("email.schedule")}
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-2 border-[#ede9fe] text-[#705add] hover:bg-[#f5f3ff] rounded-xl"
            >
              {t("common.cancel")}
            </Button>
            <Button
              onClick={handleSend}
              className="bg-[#705add] text-white hover:bg-[#5b21b6] rounded-xl gap-2"
            >
              <Send className="h-4 w-4" />
              {t("email.send")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}