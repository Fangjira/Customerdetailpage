import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
import {
  ChevronLeft,
  CheckCircle2,
  Clock,
  FileText,
  Upload,
  Download,
  User,
  AlertCircle,
  Paperclip,
  Check,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export function ApprovalScreen({ onBack }: { onBack: () => void }) {
  const { t } = useTranslation();

  const approvalSteps = [
    { name: t("approvals.submitted"), status: "completed", date: "Dec 12, 2024" },
    { name: t("approvals.sales_manager"), status: "completed", date: "Dec 13, 2024" },
    { name: t("approvals.finance_review"), status: "pending", date: null },
    { name: t("approvals.legal_compliance"), status: "upcoming", date: null },
    { name: t("approvals.final_approval"), status: "upcoming", date: null },
  ];

  const activityTimeline = [
    {
      user: "Sarah Chen",
      action: "submitted for approval",
      date: "Dec 12, 2024 10:30 AM",
    },
    {
      user: "Michael Park",
      action: "approved (Sales Manager)",
      date: "Dec 13, 2024 2:15 PM",
      comment: "Deal terms look good, pricing is competitive.",
    },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-700"
        >
          <ChevronLeft className="h-4 w-4" />
          {t("approvals.back_to_approvals")}
        </button>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl text-gray-900 mb-2">
            {t("approvals.logistics_contract")} #L-4920
          </h1>
          <p className="text-sm text-gray-600">
            {t("approvals.approval_id")}: APR-2024-0892
          </p>
        </div>
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
          {t("approvals.pending_finance")}
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <Card>
          <CardContent className="p-3">
            <p className="text-[10px] text-gray-600">{t("approvals.total_value")}</p>
            <p className="text-base sm:text-lg font-semibold text-gray-900 mt-1">$1.2M</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3">
            <p className="text-[10px] text-gray-600">{t("deals.customer")}</p>
            <p className="text-sm sm:text-base font-semibold text-gray-900 mt-1 truncate">Global Freight</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3">
            <p className="text-[10px] text-gray-600">{t("approvals.business_unit")}</p>
            <p className="text-sm sm:text-base font-semibold text-gray-900 mt-1">Air Freight</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3">
            <p className="text-[10px] text-gray-600">{t("approvals.service_type")}</p>
            <p className="text-sm sm:text-base font-semibold text-gray-900 mt-1">International</p>
          </CardContent>
        </Card>
      </div>

      {/* Approval Stepper */}
      <Card>
        <CardHeader>
          <CardTitle>{t("approvals.approval_workflow")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200">
              <div
                className="h-full bg-blue-600 transition-all"
                style={{ width: "40%" }}
              />
            </div>

            {/* Steps */}
            <div className="relative flex items-start justify-between">
              {approvalSteps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                      step.status === "completed"
                        ? "bg-blue-600 border-blue-600"
                        : step.status === "pending"
                        ? "bg-white border-blue-600"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {step.status === "completed" ? (
                      <CheckCircle2 className="h-6 w-6 text-white" />
                    ) : (
                      <span
                        className={`text-sm ${
                          step.status === "pending"
                            ? "text-blue-600"
                            : "text-gray-400"
                        }`}
                      >
                        {index + 1}
                      </span>
                    )}
                  </div>
                  <div className="mt-3 text-center max-w-24">
                    <p
                      className={`text-sm ${
                        step.status === "pending"
                          ? "text-gray-900 font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      {step.name}
                    </p>
                    {step.date && (
                      <p className="text-xs text-gray-500 mt-1">{step.date}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contract Details */}
      <Card>
        <CardHeader>
          <CardTitle>{t("contracts.contract_details")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">{t("approvals.contract_type")}</span>
            <span className="text-gray-900">Master Service</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{t("approvals.duration")}</span>
            <span className="text-gray-900">24 months</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{t("approvals.start_date")}</span>
            <span className="text-gray-900">Jan 1, 2025</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{t("contracts.payment_term")}</span>
            <span className="text-gray-900">Net 30</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Document Preview */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between p-3">
              <CardTitle className="text-sm">{t("approvals.contract_document")}</CardTitle>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                <Download className="mr-1 h-3 w-3" />
                {t("common.download")}
              </Button>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <FileText className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">{t("approvals.pdf_preview")}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    Master_Service_Agreement_v2.pdf
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>{t("approvals.workflow_activity")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityTimeline.map((activity, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      </div>
                      {index < activityTimeline.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200 mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.user}</span>{" "}
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.date}
                      </p>
                      {activity.comment && (
                        <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">
                            {activity.comment}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Review Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("approvals.review_approve")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-medium">{t("approvals.action_required")}</p>
                  <p className="mt-1">
                    {t("approvals.action_required_message")}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-700">
                  {t("approvals.add_comment")}
                </label>
                <Textarea
                  placeholder={t("approvals.enter_comments")}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-700">
                  {t("approvals.attach_file")}
                </label>
                <Button variant="outline" className="w-full justify-start">
                  <Paperclip className="mr-2 h-4 w-4" />
                  {t("approvals.attach_document")}
                </Button>
              </div>

              <div className="pt-4 space-y-2">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Check className="mr-2 h-4 w-4" />
                  {t("approvals.approve")}
                </Button>
                <Button variant="outline" className="w-full border-red-300 text-red-700 hover:bg-red-50">
                  <X className="mr-2 h-4 w-4" />
                  {t("approvals.reject")}
                </Button>
                <Button variant="outline" className="w-full">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  {t("approvals.request_info")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}