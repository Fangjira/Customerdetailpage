import { AdminMasterScreen } from "./admin-master-screen";
import { Badge } from "../ui/badge";
import { Building2 } from "lucide-react";

export function AdminBusinessUnitsScreen() {
  const mockBusinessUnits = [
    {
      id: "1",
      name: "Healthcare and Pharmaceutical Business",
      code: "HCP",
      manager: "Dr. Somchai Wongsakul",
      employees: 42,
      revenue: "฿125.3M",
      status: "Active",
      isActive: true,
      description: "Healthcare and pharmaceutical logistics services",
    },
    {
      id: "2",
      name: "ASEAN Island and Taiwan",
      code: "AIT",
      manager: "Sarah Chen",
      employees: 35,
      revenue: "฿98.7M",
      status: "Active",
      isActive: true,
      description: "Regional operations across ASEAN island countries and Taiwan",
    },
    {
      id: "3",
      name: "CLMV + China",
      code: "CLMV",
      manager: "Michael Wong",
      employees: 48,
      revenue: "฿156.2M",
      status: "Active",
      isActive: true,
      description: "Operations in Cambodia, Laos, Myanmar, Vietnam and China",
    },
    {
      id: "4",
      name: "Freight Business",
      code: "FRT",
      manager: "Lisa Anderson",
      employees: 52,
      revenue: "฿215.8M",
      status: "Active",
      isActive: true,
      description: "Freight forwarding and 3PL/4PL services",
    },
    {
      id: "5",
      name: "Commodity",
      code: "CMD",
      manager: "David Kim",
      employees: 28,
      revenue: "฿78.9M",
      status: "Active",
      isActive: true,
      description: "Commodity and bulk materials logistics",
    },
    {
      id: "6",
      name: "Automotive",
      code: "AUTO",
      manager: "Emily Johnson",
      employees: 38,
      revenue: "฿142.5M",
      status: "Active",
      isActive: true,
      description: "Automotive industry logistics and supply chain",
    },
    {
      id: "7",
      name: "B2B2C",
      code: "B2B2C",
      manager: "Robert Taylor",
      employees: 45,
      revenue: "฿165.4M",
      status: "Active",
      isActive: true,
      description: "E-commerce fulfillment and last-mile delivery",
    },
    {
      id: "8",
      name: "Commercial",
      code: "COM",
      manager: "Apinya Srisawat",
      employees: 55,
      revenue: "฿198.6M",
      status: "Active",
      isActive: true,
      description: "Commercial logistics and distribution services",
    },
    {
      id: "9",
      name: "Cold Chain",
      code: "COLD",
      manager: "Prasit Pattana",
      employees: 32,
      revenue: "฿112.3M",
      status: "Active",
      isActive: true,
      description: "Temperature-controlled logistics and cold chain",
    },
    {
      id: "10",
      name: "WH & Transport",
      code: "WHT",
      manager: "Weerasak Chotichai",
      employees: 62,
      revenue: "฿185.7M",
      status: "Active",
      isActive: true,
      description: "Warehouse operations and transportation management",
    },
  ];

  const columns = [
    { key: "code", label: "Code", width: "100px" },
    { key: "name", label: "Business Unit", width: "200px" },
    {
      key: "manager",
      label: "Manager",
      width: "180px",
      render: (item: any) => (
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-xs font-medium text-blue-700">
              {item.manager
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </span>
          </div>
          <span className="text-sm text-gray-900">{item.manager}</span>
        </div>
      ),
    },
    {
      key: "employees",
      label: "Employees",
      width: "120px",
      render: (item: any) => (
        <div className="text-sm text-gray-900">{item.employees} employees</div>
      ),
    },
    {
      key: "revenue",
      label: "Annual Revenue",
      width: "140px",
      render: (item: any) => (
        <div className="text-sm font-medium text-green-600">{item.revenue}</div>
      ),
    },
    { key: "description", label: "Description", width: "300px" },
    {
      key: "status",
      label: "Status",
      width: "100px",
      render: (item: any) => (
        <Badge
          className={
            item.status === "Active"
              ? "bg-green-100 text-green-700 border-green-200"
              : "bg-gray-100 text-gray-700 border-gray-200"
          }
        >
          {item.status}
        </Badge>
      ),
    },
  ];

  const formFields = [
    {
      name: "code",
      label: "Business Unit Code",
      type: "text" as const,
      placeholder: "e.g., AF, SF",
      required: true,
    },
    {
      name: "name",
      label: "Business Unit Name",
      type: "text" as const,
      placeholder: "Enter business unit name",
      required: true,
    },
    {
      name: "manager",
      label: "Manager",
      type: "select" as const,
      placeholder: "Select manager",
      options: [
        "Sarah Chen",
        "Michael Wong",
        "Lisa Anderson",
        "David Kim",
        "Emily Johnson",
        "Robert Taylor",
        "Apinya Srisawat",
        "Prasit Pattana",
        "Weerasak Chotichai",
        "Dr. Somchai Wongsakul",
      ],
      required: true,
    },
    {
      name: "employees",
      label: "Number of Employees",
      type: "text" as const,
      placeholder: "Enter number of employees",
      required: false,
    },
    {
      name: "revenue",
      label: "Annual Revenue Target",
      type: "text" as const,
      placeholder: "e.g., ฿45.2M",
      required: false,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea" as const,
      placeholder: "Describe the business unit's primary functions",
      required: false,
    },
  ];

  return (
    <AdminMasterScreen
      title="Business Units"
      subtitle="Manage organizational business units and divisions"
      icon={Building2}
      data={mockBusinessUnits}
      columns={columns}
      formFields={formFields}
      searchPlaceholder="Search business units..."
      emptyMessage="No business units found"
      createButtonLabel="Create Business Unit"
      pageKey="admin_business_units"
      onAdd={(data) => console.log("Adding business unit:", data)}
      onEdit={(id, data) => console.log("Editing business unit:", id, data)}
      onDelete={(id) => console.log("Deleting business unit:", id)}
      onToggleStatus={(id) => console.log("Toggling business unit status:", id)}
    />
  );
}