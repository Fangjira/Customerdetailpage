import { TransferLeadModal } from "./transfer-lead-modal";

interface TransferLeadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  lead: {
    companyName?: string;
    id?: string;
    assignedTo?: string;
    businessUnit?: string;
    [key: string]: any;
  };
}

export function TransferLeadDialog({
  isOpen,
  onClose,
  lead
}: TransferLeadDialogProps) {
  return (
    <TransferLeadModal
      isOpen={isOpen}
      onClose={onClose}
      leadName={lead?.companyName || "Unknown Lead"}
      leadId={lead?.id || "LEAD-XXX"}
      currentOwner={lead?.assignedTo || "Unassigned"}
      currentBU={lead?.businessUnit || "Unassigned"}
    />
  );
}
