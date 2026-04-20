import { AdminMasterScreen } from "./admin-master-screen";
import { Badge } from "../ui/badge";

export function AdminTeamsScreen() {
  const mockTeams = [
    { id: "1", name: "Enterprise Sales", description: "Large corporate accounts", department: "Sales", members: 12, isActive: true },
    { id: "2", name: "SME Sales", description: "Small and medium businesses", department: "Sales", members: 18, isActive: true },
    { id: "3", name: "Air Freight", description: "Air cargo operations", department: "Operations", members: 15, isActive: true },
    { id: "4", name: "Sea Freight", description: "Ocean cargo operations", department: "Operations", members: 17, isActive: true },
    { id: "5", name: "Customer Support", description: "Customer service team", department: "Customer Service", members: 10, isActive: true },
  ];

  const columns = [
    {
      key: "name",
      label: "Team Name",
      render: (item: any) => (
        <div>
          <p className="text-sm font-medium text-foreground">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item.description}</p>
        </div>
      ),
    },
    {
      key: "department",
      label: "Department",
      render: (item: any) => (
        <Badge className="bg-purple-100 text-purple-700 border-0">{item.department}</Badge>
      ),
    },
    {
      key: "members",
      label: "Members",
      render: (item: any) => <p className="text-sm text-foreground font-medium">{item.members}</p>,
    },
  ];

  return (
    <AdminMasterScreen
      title="Teams"
      subtitle="Manage teams within departments"
      items={mockTeams}
      columns={columns}
      onAdd={() => console.log("Add team")}
      onEdit={(id) => console.log("Edit team", id)}
      onDelete={(id) => console.log("Delete team", id)}
    />
  );
}
