import { CustomerDetailHCP as CustomerDetailHCPV2 } from "./customer-detail-hcp";

interface DealDetailHCPV2Props {
  onBack: () => void;
  dealId?: string;
}

export function DealDetailHCPV2({ onBack, dealId = "DEAL-001" }: DealDetailHCPV2Props) {
  // Reuses CustomerDetailHCPV2 component but with "รายละเอียดดีล" title
  return <CustomerDetailHCPV2 onBack={onBack} customerId={dealId} title="รายละเอียดดีล" />;
}
