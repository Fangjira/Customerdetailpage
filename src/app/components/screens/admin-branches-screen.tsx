import { AdminMasterScreen } from "./admin-master-screen";
import { MapPin } from "lucide-react";

export function AdminBranchesScreen() {
  const mockBranches = [
    { id: "1", name: "Bangkok Headquarters", description: "Main office", address: "123 Sukhumvit Rd, Bangkok", employees: 85, isActive: true },
    { id: "2", name: "Chiang Mai Branch", description: "Northern region", address: "456 Nimman Rd, Chiang Mai", employees: 25, isActive: true },
    { id: "3", name: "Phuket Branch", description: "Southern region", address: "789 Patong Beach Rd, Phuket", employees: 18, isActive: true },
    { id: "4", name: "Pattaya Branch", description: "Eastern region", address: "321 Beach Rd, Pattaya", employees: 15, isActive: true },
    { id: "5", name: "Chonburi Warehouse", description: "Storage facility", address: "Laem Chabang, Chonburi", employees: 12, isActive: false },
  ];

  const columns = [
    {
      key: "name",
      label: "Branch Name",
      render: (item: any) => (
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">{item.name}</p>
            <p className="text-xs text-muted-foreground">{item.description}</p>
          </div>
        </div>
      ),
    },
    {
      key: "address",
      label: "Address",
      render: (item: any) => <p className="text-sm text-foreground">{item.address}</p>,
    },
    {
      key: "employees",
      label: "Employees",
      render: (item: any) => <p className="text-sm text-foreground font-medium">{item.employees}</p>,
    },
  ];

  return (
    <AdminMasterScreen
      title="Branches / Locations"
      subtitle="Manage company branches and office locations"
      items={mockBranches}
      columns={columns}
      onAdd={() => console.log("Add branch")}
      onEdit={(id) => console.log("Edit branch", id)}
      onDelete={(id) => console.log("Delete branch", id)}
    />
  );
}
