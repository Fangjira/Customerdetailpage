import { AdminMasterScreen } from "./admin-master-screen";

export function AdminDepartmentsScreen() {
  const mockDepartments = [
    { id: "1", name: "Sales", description: "Sales department", manager: "John Smith", employees: 45, isActive: true },
    { id: "2", name: "Operations", description: "Operations management", manager: "Sarah Lee", employees: 32, isActive: true },
    { id: "3", name: "Finance", description: "Financial management", manager: "Mike Chen", employees: 12, isActive: true },
    { id: "4", name: "Customer Service", description: "Customer support", manager: "Anna Wong", employees: 18, isActive: true },
    { id: "5", name: "Marketing", description: "Marketing and promotion", manager: "Tom Brown", employees: 8, isActive: false },
  ];

  const columns = [
    {
      key: "name",
      label: "Department",
      render: (item: any) => (
        <div>
          <p className="text-sm font-medium text-foreground">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item.description}</p>
        </div>
      ),
    },
    {
      key: "manager",
      label: "Manager",
      render: (item: any) => <p className="text-sm text-foreground">{item.manager}</p>,
    },
    {
      key: "employees",
      label: "Employees",
      render: (item: any) => <p className="text-sm text-foreground font-medium">{item.employees}</p>,
    },
  ];

  return (
    <AdminMasterScreen
      title="Departments"
      subtitle="Manage organizational departments"
      items={mockDepartments}
      columns={columns}
      onAdd={() => console.log("Add department")}
      onEdit={(id) => console.log("Edit department", id)}
      onDelete={(id) => console.log("Delete department", id)}
    />
  );
}
