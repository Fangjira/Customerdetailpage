import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import {
  GitBranch,
  Plus,
  Edit,
  Trash2,
  Search,
  CheckCircle2,
  XCircle,
  Copy,
  ArrowRight,
  FileText,
  FileCheck,
  Briefcase,
  ArrowUp,
  ArrowDown,
  Settings,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export function ApprovalWorkflowsTab() {
  const { t } = useTranslation();
  const [isCreateWorkflowDialogOpen, setIsCreateWorkflowDialogOpen] = useState(false);
  const [isEditWorkflowDialogOpen, setIsEditWorkflowDialogOpen] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<any>(null);
  const [searchWorkflow, setSearchWorkflow] = useState("");
  const [approvalSteps, setApprovalSteps] = useState([
    { id: 1, email: "", action: "approve", stepCondition: "" },
  ]);
  const [nextStepId, setNextStepId] = useState(2);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Form states for Create Workflow
  const [workflowNameEn, setWorkflowNameEn] = useState("");
  const [workflowNameTh, setWorkflowNameTh] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [businessUnit, setBusinessUnit] = useState("all");
  const [workflowCondition, setWorkflowCondition] = useState("");
  const [workflowStatus, setWorkflowStatus] = useState("active");

  // Mock approval workflows - converted to state
  const [approvalWorkflows, setApprovalWorkflows] = useState([
    {
      id: "1",
      name: "Standard Quotation Approval",
      nameTh: "การอนุมัติใบเสนอราคามาตรฐาน",
      documentType: "Quotation",
      businessUnit: "All Units",
      status: "Active",
      steps: 3,
      condition: "Amount < $50,000",
      approvers: ["Sales Manager", "Finance Manager", "Final Approver"],
      createdBy: "Lisa Anderson",
      lastModified: "2024-12-20",
    },
    {
      id: "2",
      name: "High-Value Quotation Approval",
      nameTh: "การอนุมัติใบเสนอราคามูลค่าสูง",
      documentType: "Quotation",
      businessUnit: "All Units",
      status: "Active",
      steps: 4,
      condition: "Amount ≥ $50,000",
      approvers: ["Sales Manager", "Finance Manager", "Legal", "CEO"],
      createdBy: "Lisa Anderson",
      lastModified: "2024-12-18",
    },
    {
      id: "3",
      name: "Contract Approval Workflow",
      nameTh: "เวิร์กโฟลว์อนุมัติสัญญา",
      documentType: "Contract",
      businessUnit: "All Units",
      status: "Active",
      steps: 4,
      condition: "All Contracts",
      approvers: ["Sales Manager", "Finance", "Legal Compliance", "Final Approval"],
      createdBy: "Lisa Anderson",
      lastModified: "2024-12-15",
    },
    {
      id: "4",
      name: "Deal Approval (Commodity)",
      nameTh: "การอนุมัติดีล (สินค้าโภคภัณฑ์)",
      documentType: "Deal",
      businessUnit: "Commodity Business",
      status: "Active",
      steps: 2,
      condition: "Commodity BU Only",
      approvers: ["BU Manager", "Finance Manager"],
      createdBy: "Sarah Chen",
      lastModified: "2024-12-10",
    },
    {
      id: "5",
      name: "Express Approval Workflow",
      nameTh: "เวิร์กโฟลว์อนุมัติด่วน",
      documentType: "Quotation",
      businessUnit: "Commercial Office",
      status: "Active",
      steps: 2,
      condition: "Amount < $10,000",
      approvers: ["Sales Manager", "Auto-Approved"],
      createdBy: "Michael Wong",
      lastModified: "2024-12-05",
    },
  ]);

  const filteredWorkflows = approvalWorkflows.filter(
    (wf) =>
      wf.name.toLowerCase().includes(searchWorkflow.toLowerCase()) ||
      wf.nameTh.includes(searchWorkflow) ||
      wf.documentType.toLowerCase().includes(searchWorkflow.toLowerCase())
  );

  const handleEditWorkflow = (workflow: any) => {
    setSelectedWorkflow(workflow);
    setIsEditWorkflowDialogOpen(true);
  };

  const handleDuplicateWorkflow = (workflow: any) => {
    console.log("Duplicate workflow:", workflow);
  };

  const addApprovalStep = () => {
    setApprovalSteps([
      ...approvalSteps,
      { id: nextStepId, email: "", action: "approve", stepCondition: "" },
    ]);
    setNextStepId(nextStepId + 1);
  };

  const removeApprovalStep = (id: number) => {
    if (approvalSteps.length > 1) {
      setApprovalSteps(approvalSteps.filter((step) => step.id !== id));
    }
  };

  const moveStepUp = (index: number) => {
    if (index > 0) {
      const newSteps = [...approvalSteps];
      [newSteps[index - 1], newSteps[index]] = [newSteps[index], newSteps[index - 1]];
      setApprovalSteps(newSteps);
    }
  };

  const moveStepDown = (index: number) => {
    if (index < approvalSteps.length - 1) {
      const newSteps = [...approvalSteps];
      [newSteps[index], newSteps[index + 1]] = [newSteps[index + 1], newSteps[index]];
      setApprovalSteps(newSteps);
    }
  };

  const updateStepEmail = (id: number, email: string) => {
    setApprovalSteps(approvalSteps.map(step => 
      step.id === id ? { ...step, email } : step
    ));
  };

  const updateStepAction = (id: number, action: string) => {
    setApprovalSteps(approvalSteps.map(step => 
      step.id === id ? { ...step, action } : step
    ));
  };

  const updateStepCondition = (id: number, stepCondition: string) => {
    setApprovalSteps(approvalSteps.map(step => 
      step.id === id ? { ...step, stepCondition } : step
    ));
  };

  // Render status badge
  const renderStatusBadge = (status: string) => {
    if (status === "Active") {
      return (
        <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          {t("active")}
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="border-gray-300 text-gray-600 bg-gray-50">
          <XCircle className="h-3 w-3 mr-1" />
          {t("inactive")}
        </Badge>
      );
    }
  };

  const getTypeBadge = (type: string) => {
    const typeColors: Record<string, { color: string; iconType: string }> = {
      Quotation: { color: "bg-blue-100 text-blue-700 border-blue-200", iconType: "FileText" },
      Contract: { color: "bg-purple-100 text-purple-700 border-purple-200", iconType: "FileCheck" },
      Deal: { color: "bg-orange-100 text-orange-700 border-orange-200", iconType: "Briefcase" },
    };

    const config = typeColors[type] || {
      color: "bg-gray-100 text-gray-700 border-gray-200",
      iconType: "FileText",
    };

    const renderIcon = () => {
      switch (config.iconType) {
        case "FileText":
          return <FileText className="h-3 w-3 mr-1" />;
        case "FileCheck":
          return <FileCheck className="h-3 w-3 mr-1" />;
        case "Briefcase":
          return <Briefcase className="h-3 w-3 mr-1" />;
        default:
          return <FileText className="h-3 w-3 mr-1" />;
      }
    };

    return (
      <Badge variant="outline" className={config.color}>
        {renderIcon()}
        {type}
      </Badge>
    );
  };

  // Reset form function
  const resetCreateForm = () => {
    setWorkflowNameEn("");
    setWorkflowNameTh("");
    setDocumentType("");
    setBusinessUnit("all");
    setWorkflowCondition("");
    setWorkflowStatus("active");
    setApprovalSteps([{ id: 1, email: "", action: "approve", stepCondition: "" }]);
    setNextStepId(2);
  };

  // Handle Create Workflow Submit
  const handleCreateWorkflow = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!workflowNameEn.trim()) {
      alert(t("validation.required") + ": " + t("workflow_name_en"));
      return;
    }
    if (!workflowNameTh.trim()) {
      alert(t("validation.required") + ": " + t("workflow_name_th"));
      return;
    }
    if (!documentType) {
      alert(t("validation.required") + ": " + t("document_type"));
      return;
    }

    // Check if all steps have roles selected
    const invalidSteps = approvalSteps.filter(step => !step.email);
    if (invalidSteps.length > 0) {
      alert(t("please_select_all_approver_roles"));
      return;
    }

    // Get Business Unit display name
    const getBUName = (code: string) => {
      const buMap: Record<string, string> = {
        "all": "All Units",
        "com": "Commodity Business",
        "cmo": "Commercial Office",
        "jts": "JTS"
      };
      return buMap[code] || code;
    };

    // Get Document Type display name
    const getDocTypeName = (type: string) => {
      const typeMap: Record<string, string> = {
        "quotation": "Quotation",
        "contract": "Contract",
        "deal": "Deal"
      };
      return typeMap[type] || type;
    };

    // Build approvers list
    const approvers = approvalSteps.map(step => {
      return step.email;
    });

    // Create new workflow object
    const newWorkflow = {
      id: String(approvalWorkflows.length + 1),
      name: workflowNameEn,
      nameTh: workflowNameTh,
      documentType: getDocTypeName(documentType),
      businessUnit: getBUName(businessUnit),
      status: workflowStatus === "active" ? "Active" : "Inactive",
      steps: approvalSteps.length,
      condition: workflowCondition || "No specific condition",
      approvers: approvers,
      createdBy: "Lisa Anderson", // Current user
      lastModified: new Date().toISOString().split('T')[0],
    };

    // Add to workflows list
    setApprovalWorkflows([newWorkflow, ...approvalWorkflows]);

    // Show success message
    setToastMessage(t("workflow_created_successfully"));
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);

    // Close dialog and reset form
    setIsCreateWorkflowDialogOpen(false);
    resetCreateForm();
  };

  return (
    <div className="space-y-3">
      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-5">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg shadow-lg border border-green-400 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
            <p className="text-sm font-medium">{toastMessage}</p>
          </div>
        </div>
      )}

      <Card className="border border-border">
        <CardHeader className="border-b border-border bg-card py-2.5 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <CardTitle className="text-foreground flex items-center gap-2 text-sm font-semibold">
                <GitBranch className="h-4 w-4" />
                {t("common.approval_workflows")}
              </CardTitle>
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder={t("search_workflows")}
                  value={searchWorkflow}
                  onChange={(e) => setSearchWorkflow(e.target.value)}
                  className="pl-8 h-8 border-border text-xs"
                />
              </div>
            </div>
            <Button
              onClick={() => setIsCreateWorkflowDialogOpen(true)}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground h-8 px-3"
            >
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              {t("create_workflow")}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Table View */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left font-medium text-muted-foreground py-2 px-4">
                    {t("admin.workflow_name")}
                  </th>
                  <th className="text-left font-medium text-muted-foreground py-2 px-3">
                    {t("admin.type")}
                  </th>
                  <th className="text-left font-medium text-muted-foreground py-2 px-3">
                    {t("admin.approval_flow")}
                  </th>
                  <th className="text-left font-medium text-muted-foreground py-2 px-3">
                    {t("admin.condition")}
                  </th>
                  <th className="text-center font-medium text-muted-foreground py-2 px-3">
                    {t("admin.status")}
                  </th>
                  <th className="text-right font-medium text-muted-foreground py-2 px-4">
                    {t("common.actions")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredWorkflows.map((workflow) => (
                  <tr key={workflow.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-2.5 px-4">
                      <div>
                        <div className="font-medium text-foreground">{workflow.name}</div>
                        <div className="text-muted-foreground text-[10px] mt-0.5">{workflow.nameTh}</div>
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      {getTypeBadge(workflow.documentType)}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-1 flex-wrap max-w-md">
                        {workflow.approvers.map((approver, index) => (
                          <div key={index} className="flex items-center gap-1">
                            <span className="px-1.5 py-0.5 bg-muted border border-border rounded text-[10px] text-foreground font-medium whitespace-nowrap">
                              {approver}
                            </span>
                            {index < workflow.approvers.length - 1 && (
                              <ArrowRight className="h-2.5 w-2.5 text-muted-foreground flex-shrink-0" />
                            )}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="text-muted-foreground">{workflow.condition}</span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      {renderStatusBadge(workflow.status)}
                    </td>
                    <td className="py-2.5 px-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditWorkflow(workflow)}
                          className="h-7 w-7 p-0 hover:bg-muted"
                          title={t("common.edit")}
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDuplicateWorkflow(workflow)}
                          className="h-7 w-7 p-0 hover:bg-muted"
                          title={t("admin.duplicate")}
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 hover:bg-red-50 text-red-600"
                          title={t("common.delete")}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Create Workflow Dialog */}
      <Dialog open={isCreateWorkflowDialogOpen} onOpenChange={setIsCreateWorkflowDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#4c1d95] flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-[#705add]" />
              {t("create_workflow")}
            </DialogTitle>
            <DialogDescription className="text-[#8b5cf6]">
              {t("create_workflow_description")}
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-4" onSubmit={handleCreateWorkflow}>
            {/* Workflow Basic Info */}
            <div className="space-y-4 p-4 bg-gradient-to-r from-[#faf8ff] to-white rounded-xl border border-[#ede9fe]">
              <h3 className="text-sm font-medium text-[#4c1d95]">
                {t("workflow_information")}
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="wf-name" className="text-[#4c1d95]">
                    {t("workflow_name_en")} *
                  </Label>
                  <Input
                    id="wf-name"
                    placeholder="Standard Quotation Approval"
                    className="mt-1.5 border-[#ede9fe] focus:border-[#705add] rounded-lg"
                    value={workflowNameEn}
                    onChange={(e) => setWorkflowNameEn(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="wf-name-th" className="text-[#4c1d95]">
                    {t("workflow_name_th")} *
                  </Label>
                  <Input
                    id="wf-name-th"
                    placeholder="การอนุมัติใบเสนอราคามาตรฐาน"
                    className="mt-1.5 border-[#ede9fe] focus:border-[#705add] rounded-lg"
                    value={workflowNameTh}
                    onChange={(e) => setWorkflowNameTh(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="doc-type" className="text-[#4c1d95]">
                    {t("document_type")} *
                  </Label>
                  <Select
                    value={documentType}
                    onValueChange={(value) => setDocumentType(value)}
                  >
                    <SelectTrigger className="mt-1.5 border-[#ede9fe] focus:border-[#705add] rounded-lg">
                      <SelectValue placeholder={t("select_document_type")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quotation">Quotation</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="deal">Deal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="bu" className="text-[#4c1d95]">
                    {t("business_unit")} *
                  </Label>
                  <Select
                    value={businessUnit}
                    onValueChange={(value) => setBusinessUnit(value)}
                  >
                    <SelectTrigger className="mt-1.5 border-[#ede9fe] focus:border-[#705add] rounded-lg">
                      <SelectValue placeholder={t("select_business_unit")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Units</SelectItem>
                      <SelectItem value="com">Commodity Business</SelectItem>
                      <SelectItem value="cmo">Commercial Office</SelectItem>
                      <SelectItem value="jts">JTS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="condition" className="text-[#4c1d95]">
                  {t("workflow_condition")}
                </Label>
                <Input
                  id="condition"
                  placeholder="e.g., Amount < $50,000"
                  className="mt-1.5 border-[#ede9fe] focus:border-[#705add] rounded-lg"
                  value={workflowCondition}
                  onChange={(e) => setWorkflowCondition(e.target.value)}
                />
                <p className="text-xs text-[#a78bfa] mt-1">
                  {t("condition_hint")}
                </p>
              </div>
            </div>

            {/* Approval Steps */}
            <div className="space-y-4 p-4 bg-gradient-to-r from-[#faf8ff] to-white rounded-xl border border-[#ede9fe]">
              <h3 className="text-sm font-medium text-[#4c1d95]">
                {t("approval_steps")}
              </h3>

              <div className="space-y-3">
                {approvalSteps.map((step, index) => (
                  <div key={step.id} className="relative">
                    {/* Step Card */}
                    <div className="p-3 bg-white border-2 border-[#ede9fe] rounded-xl hover:border-[#a78bfa] transition-colors">
                      <div className="flex items-start gap-3">
                        {/* Step Number Badge */}
                        <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-to-br from-[#a78bfa] to-[#705add] text-white text-sm font-bold flex-shrink-0 shadow-sm">
                          {index + 1}
                        </div>

                        {/* Email Input */}
                        <div className="flex-1">
                          <Label className="text-xs text-[#8b5cf6] mb-1.5 block font-medium">
                            Approver Email
                          </Label>
                          <Input
                            type="email"
                            value={step.email}
                            onChange={(e) => updateStepEmail(step.id, e.target.value)}
                            placeholder="approver@example.com"
                            className="border-[#ede9fe] focus:border-[#705add] rounded-lg h-10 text-sm"
                          />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-1 pt-5">
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => moveStepUp(index)}
                              className="h-7 w-7 p-0 text-[#705add] hover:bg-[#f5f3ff]"
                              title="Move up"
                            >
                              <ArrowUp className="h-3.5 w-3.5" />
                            </Button>
                          )}
                          {index < approvalSteps.length - 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => moveStepDown(index)}
                              className="h-7 w-7 p-0 text-[#705add] hover:bg-[#f5f3ff]"
                              title="Move down"
                            >
                              <ArrowDown className="h-3.5 w-3.5" />
                            </Button>
                          )}
                          {approvalSteps.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeApprovalStep(step.id)}
                              className="h-7 w-7 p-0 text-red-600 hover:bg-red-50"
                              title="Remove"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Arrow to Next Step */}
                    {index < approvalSteps.length - 1 && (
                      <div className="flex justify-center my-2">
                        <ArrowDown className="h-5 w-5 text-[#a78bfa]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Step Button - Large and Prominent */}
              <button
                type="button"
                onClick={addApprovalStep}
                className="w-full p-4 border-2 border-dashed border-[#a78bfa] rounded-xl bg-gradient-to-r from-[#faf8ff] to-white hover:from-[#f5f3ff] hover:to-white hover:border-[#705add] transition-all group"
              >
                <div className="flex items-center justify-center gap-2 text-[#705add] group-hover:text-[#5b21b6]">
                  <div className="h-8 w-8 rounded-lg bg-[#705add] group-hover:bg-[#5b21b6] flex items-center justify-center text-white">
                    <Plus className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold">
                    {t("add_approval_step")}
                  </span>
                </div>
              </button>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-[#ede9fe]">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateWorkflowDialogOpen(false)}
                className="border-[#ede9fe] text-[#705add] hover:bg-[#f5f3ff] rounded-xl"
              >
                {t("common.cancel")}
              </Button>
              <Button
                type="submit"
                className="bg-[#705add] hover:bg-[#5b21b6] text-white rounded-xl"
              >
                <Plus className="h-4 w-4 mr-2" />
                {t("create_workflow")}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Workflow Dialog */}
      <Dialog open={isEditWorkflowDialogOpen} onOpenChange={setIsEditWorkflowDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#4c1d95] flex items-center gap-2">
              <Edit className="h-5 w-5 text-[#705add]" />
              {t("admin.edit_workflow")}
            </DialogTitle>
            <DialogDescription className="text-[#8b5cf6]">
              {selectedWorkflow?.name} • {selectedWorkflow?.nameTh}
            </DialogDescription>
          </DialogHeader>

          {selectedWorkflow && (
            <form className="space-y-4">
              {/* Workflow Basic Info */}
              <div className="space-y-3 p-4 bg-gradient-to-r from-[#faf8ff] to-white rounded-xl border border-[#ede9fe]">
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <Label className="text-xs text-[#4c1d95]">
                      {t("admin.workflow_name_en")}
                    </Label>
                    <Input
                      defaultValue={selectedWorkflow.name}
                      className="mt-1.5 border-[#ede9fe] focus:border-[#705add] rounded-lg"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-[#4c1d95]">
                      {t("admin.workflow_name_th")}
                    </Label>
                    <Input
                      defaultValue={selectedWorkflow.nameTh}
                      className="mt-1.5 border-[#ede9fe] focus:border-[#705add] rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <Label className="text-xs text-[#4c1d95]">
                      {t("admin.document_type")}
                    </Label>
                    <Select defaultValue={selectedWorkflow.documentType.toLowerCase()}>
                      <SelectTrigger className="mt-1.5 border-[#ede9fe] focus:border-[#705add] rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quotation">Quotation</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="deal">Deal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs text-[#4c1d95]">
                      {t("admin.workflow_status")}
                    </Label>
                    <Select defaultValue={selectedWorkflow.status.toLowerCase()}>
                      <SelectTrigger className="mt-1.5 border-[#ede9fe] focus:border-[#705add] rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-3 w-3 text-green-600" />
                            {t("admin.active")}
                          </div>
                        </SelectItem>
                        <SelectItem value="inactive">
                          <div className="flex items-center gap-2">
                            <XCircle className="h-3 w-3 text-gray-600" />
                            {t("admin.inactive")}
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-[#4c1d95]">
                    {t("admin.workflow_condition")} ({t("common.optional")})
                  </Label>
                  <Input
                    defaultValue={selectedWorkflow.condition}
                    placeholder="e.g., Amount < $50,000"
                    className="mt-1.5 border-[#ede9fe] focus:border-[#705add] rounded-lg"
                  />
                </div>
              </div>

              {/* Approval Steps */}
              <div className="space-y-3 p-4 bg-gradient-to-r from-[#faf8ff] to-white rounded-xl border border-[#ede9fe]">
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-[#4c1d95] font-semibold">
                    {t("admin.approval_steps")}
                  </Label>
                  <Button
                    type="button"
                    size="sm"
                    onClick={addApprovalStep}
                    className="bg-[#705add] hover:bg-[#5b21b6] text-white rounded-lg h-7 px-2 text-xs"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {t("admin.add_step")}
                  </Button>
                </div>

                <div className="space-y-2">
                  {approvalSteps.map((step, index) => (
                    <div key={step.id} className="flex items-center gap-2">
                      <div className="flex items-center justify-center h-7 w-7 rounded-full bg-gradient-to-br from-[#a78bfa] to-[#705add] text-white text-xs font-semibold flex-shrink-0">
                        {index + 1}
                      </div>
                      <Input
                        type="email"
                        value={step.email}
                        onChange={(e) => updateStepEmail(step.id, e.target.value)}
                        placeholder="approver@example.com"
                        className="flex-1 border-[#ede9fe] focus:border-[#705add] rounded-lg h-9 text-sm"
                      />
                      <div className="flex gap-1">
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => moveStepUp(index)}
                            className="h-7 w-7 p-0 text-[#705add] hover:bg-[#f5f3ff]"
                          >
                            <ArrowUp className="h-3 w-3" />
                          </Button>
                        )}
                        {index < approvalSteps.length - 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => moveStepDown(index)}
                            className="h-7 w-7 p-0 text-[#705add] hover:bg-[#f5f3ff]"
                          >
                            <ArrowDown className="h-3 w-3" />
                          </Button>
                        )}
                        {approvalSteps.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeApprovalStep(step.id)}
                            className="h-7 w-7 p-0 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                      {index < approvalSteps.length - 1 && (
                        <ArrowRight className="h-4 w-4 text-[#a78bfa] flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center gap-3 pt-4 border-t border-[#ede9fe]">
                <Button
                  type="button"
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50 rounded-xl h-9 px-3 text-sm"
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                  {t("admin.delete_workflow")}
                </Button>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditWorkflowDialogOpen(false)}
                    className="border-[#ede9fe] text-[#705add] hover:bg-[#f5f3ff] rounded-xl h-9 px-3 text-sm"
                  >
                    {t("common.cancel")}
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#705add] hover:bg-[#5b21b6] text-white rounded-xl h-9 px-3 text-sm"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                    {t("common.save_changes")}
                  </Button>
                </div>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}