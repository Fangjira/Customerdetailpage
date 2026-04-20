import { CustomerDetailHCP as CustomerDetailHCPV2 } from "./customer-detail-hcp";

interface MyCustomerDetailHCPV2Props {
  onBack: () => void;
  customerId?: string;
}

export function MyCustomerDetailHCPV2({ onBack, customerId = "CUST-001" }: MyCustomerDetailHCPV2Props) {
  // Reuses CustomerDetailHCPV2 component but with "รายละเอียดลูกค้าของฉัน" title
  return <CustomerDetailHCPV2 onBack={onBack} customerId={customerId} title="รายละเอียดลูกค้าของฉัน" />;
}
