import { useState, useEffect } from "react";
import { QuotationTemplateType, QuotationData, CustomerInfo } from "./quotation-types";
import { QuotationCreatorScreen } from "./quotation-creator-screen";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

interface QuotationBuilderMainProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  initialTemplate?: QuotationTemplateType | null;
  initialCustomerData?: Partial<CustomerInfo>;
  mode?: 'single' | 'multiple'; // เพิ่ม mode prop
  onBack?: () => void;
  onSave?: (data: QuotationData) => void;
}

export function QuotationBuilderMain({ 
  open = false, 
  onOpenChange,
  initialTemplate, 
  initialCustomerData,
  mode = 'single', // default เป็น single
  onBack, 
  onSave 
}: QuotationBuilderMainProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<QuotationTemplateType | null>(initialTemplate || null);

  // Update selectedTemplate when initialTemplate changes
  useEffect(() => {
    if (initialTemplate) {
      setSelectedTemplate(initialTemplate);
    }
  }, [initialTemplate]);

  const handleSelectTemplate = (templateType: QuotationTemplateType) => {
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

  const handleSaveQuotation = (data: QuotationData) => {
    console.log("Saving quotation:", data);
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
        fullScreen 
        className="p-0"
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => {
          e.preventDefault();
          handleClose();
        }}
      >
        {/* Hidden title for screen readers */}
        <DialogTitle className="sr-only">
          {selectedTemplate ? "กรอกข้อมูลใบเสนอราคาโลจิสติกส์" : "เลือกแบบฟอร์มใบเสนอราคา"}
        </DialogTitle>
        
        <QuotationCreatorScreen
          templateType={selectedTemplate}
          mode={mode}
          onBack={handleClose}
          onSave={handleSaveQuotation}
          onTemplateChange={handleSelectTemplate}
          initialCustomerData={initialCustomerData}
        />
      </DialogContent>
    </Dialog>
  );
}