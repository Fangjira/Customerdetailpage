import { useState } from "react";
import { ProposalBuilderMain } from "../proposal/proposal-builder-main";
import { ProposalData, ProposalTemplateType } from "../proposal/proposal-types";

interface ProposalBuilderScreenProps {
  onNavigate: (path: string) => void;
  currentPath?: string;
}

export function ProposalBuilderScreen({ onNavigate, currentPath }: ProposalBuilderScreenProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleBack = () => {
    onNavigate("/proposals-contracts");
  };

  const handleSave = (data: ProposalData) => {
    console.log("Proposal saved:", data);
    // TODO: Save to backend/state management
    // Show success notification
    alert("Proposal created successfully!");
    onNavigate("/proposals-contracts");
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      handleBack();
    }
  };

  // Extract template from URL query params
  const urlParams = new URLSearchParams(currentPath?.split("?")[1] || "");
  const templateParam = urlParams.get("template") as ProposalTemplateType | null;

  return (
    <ProposalBuilderMain
      open={isOpen}
      onOpenChange={handleOpenChange}
      initialTemplate={templateParam}
      onBack={handleBack}
      onSave={handleSave}
    />
  );
}
