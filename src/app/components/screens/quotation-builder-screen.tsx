import { useState } from "react";
import { QuotationBuilderMain } from "../quotation/quotation-builder-main";
import { QuotationCreatorScreen } from "../quotation/quotation-creator-screen";
import { QuotationData, QuotationTemplateType } from "../quotation/quotation-types";

interface QuotationBuilderScreenProps {
  onNavigate: (path: string) => void;
  currentPath?: string;
}

export function QuotationBuilderScreen({ onNavigate, currentPath }: QuotationBuilderScreenProps) {
  console.log("[QuotationBuilderScreen] Rendering with currentPath:", currentPath);
  
  const [isOpen, setIsOpen] = useState(true);

  const handleBack = () => {
    onNavigate("/quotations");
  };

  const handleSave = (data: QuotationData) => {
    console.log("Quotation saved:", data);
    // TODO: Save to backend/state management
    // Show success notification
    alert("Quotation created successfully!");
    onNavigate("/quotations");
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      handleBack();
    }
  };

  // Extract template and mode from URL query params
  const urlParams = new URLSearchParams(currentPath?.split("?")[1] || "");
  const templateParam = urlParams.get("template") as QuotationTemplateType | null;
  const modeParam = urlParams.get("mode") as 'single' | 'multiple' | null;

  console.log("[QuotationBuilderScreen] URL params:", { templateParam, modeParam });

  // Check if this is a full-page view (from /quotations/create route)
  const isFullPage = currentPath?.startsWith("/quotations/create");
  
  console.log("[QuotationBuilderScreen] isFullPage:", isFullPage);

  // If full-page view, render directly without Dialog
  if (isFullPage) {
    console.log("[QuotationBuilderScreen] Rendering QuotationCreatorScreen in full-page mode");
    return (
      <QuotationCreatorScreen
        templateType={templateParam}
        mode={modeParam || 'single'}
        onBack={handleBack}
        onSave={handleSave}
        onTemplateChange={(template) => {
          // Update URL with selected template
          const newUrl = `/quotations/create?template=${template}&mode=${modeParam || 'single'}`;
          onNavigate(newUrl);
        }}
      />
    );
  }

  console.log("[QuotationBuilderScreen] Rendering QuotationBuilderMain in dialog mode");
  
  // Otherwise, use Dialog wrapper
  return (
    <QuotationBuilderMain
      open={isOpen}
      onOpenChange={handleOpenChange}
      initialTemplate={templateParam}
      mode={modeParam || 'single'}
      onBack={handleBack}
      onSave={handleSave}
    />
  );
}