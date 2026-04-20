import { AdminMasterScreen } from "./admin-master-screen";
import { Badge } from "../ui/badge";

export function AdminCustomerTypesScreen() {
  const mockCustomerTypes = [
    { id: "1", name: "Enterprise", description: "Large corporations", minRevenue: "฿10M+", discount: "15-25%", customers: 45, isActive: true },
    { id: "2", name: "SME", description: "Small-medium enterprises", minRevenue: "฿1M-10M", discount: "5-15%", customers: 128, isActive: true },
    { id: "3", name: "Startup", description: "New businesses", minRevenue: "฿100K-1M", discount: "0-5%", customers: 67, isActive: true },
    { id: "4", name: "Individual", description: "Personal customers", minRevenue: "-", discount: "0%", customers: 234, isActive: true },
    { id: "5", name: "VIP", description: "Premium customers", minRevenue: "฿50M+", discount: "25-35%", customers: 12, isActive: true },
  ];

  const columns = [
    {
      key: "name",
      label: "Type Name",
      render: (item: any) => (
        <div>
          <p className="text-sm font-medium text-foreground">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item.description}</p>
        </div>
      ),
    },
    {
      key: "minRevenue",
      label: "Revenue Range",
      render: (item: any) => <p className="text-sm text-foreground">{item.minRevenue}</p>,
    },
    {
      key: "discount",
      label: "Discount",
      render: (item: any) => (
        <Badge className="bg-green-100 text-green-700 border-0">{item.discount}</Badge>
      ),
    },
    {
      key: "customers",
      label: "Customers",
      render: (item: any) => <p className="text-sm text-foreground font-medium">{item.customers}</p>,
    },
  ];

  return (
    <AdminMasterScreen
      title="Customer Types"
      subtitle="Manage customer categories and segments"
      items={mockCustomerTypes}
      columns={columns}
      onAdd={() => console.log("Add customer type")}
      onEdit={(id) => console.log("Edit customer type", id)}
      onDelete={(id) => console.log("Delete customer type", id)}
    />
  );
}
