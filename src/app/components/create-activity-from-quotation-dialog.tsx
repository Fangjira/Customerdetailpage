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
import { Combobox } from "./ui/combobox";
import { useTranslation } from "react-i18next";
import {
  ClipboardList,
  CheckCircle2,
  Calendar,
  User,
  FileText,
  Building2,
  Package,
  Clock,
} from "lucide-react";
import { Badge } from "./ui/badge";

interface QuotationData {
  id: string;
  name: string;
  dealId: string;
  amount: string;
  customer: {
    name: string;
    contactPerson: string;
    email: string;
    phone: string;
  };
  items: {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  bu: string;
}

interface CreateActivityFromQuotationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  quotationData: QuotationData;
}

export function CreateActivityFromQuotationDialog({
  isOpen,
  onClose,
  quotationData,
}: CreateActivityFromQuotationDialogProps) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form state
  const [activityTitle, setActivityTitle] = useState(
    `Follow-up: ${quotationData.name}`
  );
  const [activityType, setActivityType] = useState("meeting");
  const [priority, setPriority] = useState("medium");
  const [assignedTo, setAssignedTo] = useState("sarah_chen");
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  );
  const [description, setDescription] = useState(
    `Follow up on quotation ${quotationData.id} for ${quotationData.customer.name}`
  );

  const [activityId] = useState(
    `ACT-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);

      // Reset after showing success
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        // Reset form
        setActivityTitle(`Follow-up: ${quotationData.name}`);
        setActivityType("meeting");
        setPriority("medium");
        setAssignedTo("sarah_chen");
        setDueDate(
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0]
        );
        setDescription(
          `Follow up on quotation ${quotationData.id} for ${quotationData.customer.name}`
        );
      }, 2000);
    }, 1500);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getActivityTypeIcon = (type: string) => {
    switch (type) {
      case "meeting":
        return "🤝";
      case "call":
        return "📞";
      case "email":
        return "✉️";
      case "task":
        return "✅";
      case "presentation":
        return "📊";
      default:
        return "📋";
    }
  };

  if (showSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogTitle className="sr-only">
            {t("quotations.activity_created")}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {t("quotations.activity_created_successfully")}
          </DialogDescription>
          <div className="flex flex-col items-center justify-center py-12 px-6">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl text-gray-900 mb-2">
              {t("quotations.activity_created")}
            </h3>
            <p className="text-sm text-gray-600 text-center">
              {t("quotations.activity_created_successfully")}
            </p>
            <Badge
              variant="secondary"
              className="mt-4 bg-green-100 text-green-700"
            >
              {activityId}
            </Badge>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[#4c1d95]">
            <ClipboardList className="h-5 w-5 text-[#16a34a]" />
            {t("quotations.create_activity_from_quotation")}
          </DialogTitle>
          <DialogDescription className="text-sm text-[#22c55e] mt-1">
            {t("quotations.create_activity_from_quotation_subtitle")}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Quotation Information - Read Only */}
          <div className="bg-gradient-to-br from-[#faf8ff] to-white border-2 border-[#ede9fe] rounded-xl p-6">
            <h3 className="text-sm font-semibold text-[#4c1d95] mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#16a34a]" />
              {t("quotations.quotation_information")}
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label className="text-xs text-[#22c55e]">
                  {t("quotations.quote_number")}
                </Label>
                <p className="text-sm text-[#4c1d95] font-medium mt-1">
                  {quotationData.id}
                </p>
              </div>
              <div>
                <Label className="text-xs text-[#22c55e]">
                  {t("quotations.quote_name")}
                </Label>
                <p className="text-sm text-[#4c1d95] font-medium mt-1">
                  {quotationData.name}
                </p>
              </div>
              <div>
                <Label className="text-xs text-[#22c55e]">
                  {t("quotations.customer_name")}
                </Label>
                <p className="text-sm text-[#4c1d95] font-medium mt-1">
                  {quotationData.customer.name}
                </p>
              </div>
              <div>
                <Label className="text-xs text-[#22c55e]">
                  {t("quotations.contact_person")}
                </Label>
                <p className="text-sm text-[#4c1d95] font-medium mt-1">
                  {quotationData.customer.contactPerson}
                </p>
              </div>
              <div>
                <Label className="text-xs text-[#22c55e]">
                  {t("quotations.deal_id")}
                </Label>
                <p className="text-sm text-[#4c1d95] font-medium mt-1">
                  {quotationData.dealId}
                </p>
              </div>
              <div>
                <Label className="text-xs text-[#22c55e]">
                  {t("quotations.grand_total")}
                </Label>
                <p className="text-sm text-[#4c1d95] font-medium mt-1">
                  {quotationData.amount}
                </p>
              </div>
            </div>
          </div>

          {/* Activity Details */}
          <div className="border-2 border-[#ede9fe] rounded-xl p-6">
            <h3 className="text-sm font-semibold text-[#4c1d95] mb-4 flex items-center gap-2">
              <ClipboardList className="h-4 w-4 text-[#705add]" />
              {t("quotations.activity_details")}
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="activity-title" className="text-[#4c1d95]">
                  {t("quotations.activity_title")} *
                </Label>
                <Input
                  id="activity-title"
                  value={activityTitle}
                  onChange={(e) => setActivityTitle(e.target.value)}
                  className="mt-1.5 border-[#ede9fe] focus:border-[#705add] focus:ring-[#705add]"
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="activity-type" className="text-[#4c1d95]">
                    {t("quotations.activity_type")} *
                  </Label>
                  <Combobox
                    options={[
                      { value: "meeting", label: `🤝 ${t("quotations.activity_type_meeting")}` },
                      { value: "call", label: `📞 ${t("quotations.activity_type_call")}` },
                      { value: "email", label: `✉️ ${t("quotations.activity_type_email")}` },
                      { value: "task", label: `✅ ${t("quotations.activity_type_task")}` },
                      { value: "presentation", label: `📊 ${t("quotations.activity_type_presentation")}` },
                      { value: "followup", label: `📋 ${t("quotations.activity_type_followup")}` },
                    ]}
                    value={activityType}
                    onValueChange={setActivityType}
                    placeholder="เลือกประเภท..."
                    searchPlaceholder="ค้นหา..."
                    className="mt-1.5 border-[#ede9fe] focus:border-[#705add] focus:ring-[#705add]"
                  />
                </div>

                <div>
                  <Label htmlFor="priority" className="text-[#4c1d95]">
                    {t("quotations.priority")} *
                  </Label>
                  <Combobox
                    options={[
                      { value: "high", label: `🔴 ${t("quotations.priority_high")}` },
                      { value: "medium", label: `🟡 ${t("quotations.priority_medium")}` },
                      { value: "low", label: `🟢 ${t("quotations.priority_low")}` },
                    ]}
                    value={priority}
                    onValueChange={setPriority}
                    placeholder="เลือกความสำคัญ..."
                    searchPlaceholder="ค้นหา..."
                    className="mt-1.5 border-[#ede9fe] focus:border-[#705add] focus:ring-[#705add]"
                  />
                </div>

                <div>
                  <Label htmlFor="assigned-to" className="text-[#4c1d95]">
                    {t("quotations.assign_to")} *
                  </Label>
                  <Combobox
                    options={[
                      { value: "sarah_chen", label: "👤 Sarah Chen (Sales Manager)" },
                      { value: "michael_wong", label: "👤 Michael Wong (Account Executive)" },
                      { value: "jessica_taylor", label: "👤 Jessica Taylor (Sales Rep)" },
                      { value: "david_kim", label: "👤 David Kim (Business Dev)" },
                    ]}
                    value={assignedTo}
                    onValueChange={setAssignedTo}
                    placeholder="เลือกผู้รับผิดชอบ..."
                    searchPlaceholder="ค้นหา..."
                    className="mt-1.5 border-[#ede9fe] focus:border-[#705add] focus:ring-[#705add]"
                  />
                </div>

                <div>
                  <Label htmlFor="due-date" className="text-[#4c1d95]">
                    {t("quotations.due_date")} *
                  </Label>
                  <Input
                    id="due-date"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="mt-1.5 border-[#ede9fe] focus:border-[#705add] focus:ring-[#705add]"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-[#4c1d95]">
                  {t("quotations.activity_description")}
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t("quotations.enter_activity_description")}
                  className="mt-1.5 min-h-[120px] border-[#f0fdf4] focus:border-[#16a34a] focus:ring-[#16a34a]"
                />
              </div>
            </div>
          </div>

          {/* Related Services (for reference) */}
          <div className="border-2 border-[#ede9fe] rounded-xl p-6">
            <h3 className="text-sm font-semibold text-[#4c1d95] mb-4 flex items-center gap-2">
              <Package className="h-4 w-4 text-[#16a34a]" />
              {t("quotations.related_services")}
            </h3>
            <div className="space-y-2">
              {quotationData.items.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-gradient-to-r from-[#faf8ff] to-white rounded-lg border border-[#ede9fe]"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#4ade80] to-[#16a34a] flex items-center justify-center text-white text-xs font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm text-[#4c1d95] font-medium">
                        {item.description}
                      </p>
                      <p className="text-xs text-[#8b5cf6]">
                        {t("quotations.quantity")}: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-[#4c1d95] font-semibold">
                    ${item.total.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#ede9fe]">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-[#ede9fe] text-[#705add] hover:bg-[#f5f3ff] rounded-xl"
            >
              {t("common.cancel")}
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#705add] hover:bg-[#5b21b6] text-white rounded-xl"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  {t("common.creating")}...
                </>
              ) : (
                <>
                  <ClipboardList className="mr-2 h-4 w-4" />
                  {t("create_activity")}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}