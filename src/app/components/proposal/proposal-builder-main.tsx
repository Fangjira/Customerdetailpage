import { useState } from "react";
import { ProposalTemplateType, ProposalData, CustomerInfo } from "./proposal-types";
import { ProposalCreatorScreen } from "./proposal-creator-screen";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

interface ProposalBuilderMainProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  initialTemplate?: ProposalTemplateType | null;
  initialCustomerData?: Partial<CustomerInfo>;
  onBack?: () => void;
  onSave?: (data: ProposalData) => void;
}

export function ProposalBuilderMain({ 
  open = false, 
  onOpenChange,
  initialTemplate, 
  initialCustomerData,
  onBack, 
  onSave 
}: ProposalBuilderMainProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<ProposalTemplateType | null>(initialTemplate || null);

  const handleSelectTemplate = (templateType: ProposalTemplateType) => {
    setSelectedTemplate(templateType);
  };

  const handleClose = () => {
    if (selectedTemplate) {
      // If in form view, go back to template selection
      setSelectedTemplate(null);
    } else {
      // If in template selection, close the modal
      onOpenChange?.(false);
      setTimeout(() => {
        setSelectedTemplate(null);
        onBack?.();
      }, 200);
    }
  };

  const handleSaveProposal = (data: ProposalData) => {
    console.log("Saving proposal:", data);
    if (onSave) {
      onSave(data);
    }
    onOpenChange?.(false);
    setTimeout(() => {
      setSelectedTemplate(null);
    }, 200);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-4xl w-full max-h-[90vh] overflow-hidden p-0"
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => {
          e.preventDefault();
          handleClose();
        }}
      >
        {/* Hidden title for screen readers */}
        <DialogTitle className="sr-only">
          {selectedTemplate ? "กรอกข้อมูลข้อเสนอทางธุรกิจ" : "เลือกแบบฟอร์มข้อเสนอ"}
        </DialogTitle>
        
        <ProposalCreatorScreen
          templateType={selectedTemplate}
          onBack={handleClose}
          onSave={handleSaveProposal}
          onTemplateChange={handleSelectTemplate}
          initialCustomerData={initialCustomerData}
        />
      </DialogContent>
    </Dialog>
  );
}