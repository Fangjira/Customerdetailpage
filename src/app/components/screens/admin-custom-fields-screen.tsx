import { AdminMasterScreen } from "./admin-master-screen";
import { Badge } from "../ui/badge";
import { Sliders } from "lucide-react";

export function AdminCustomFieldsScreen() {
  const mockCustomFields = [
    { id: "1", name: "Industry", description: "Customer industry", module: "Customer", type: "Dropdown", required: true, isActive: true },
    { id: "2", name: "Annual Revenue", description: "Expected annual revenue", module: "Customer", type: "Number", required: false, isActive: true },
    { id: "3", name: "Lead Score", description: "Lead quality score", module: "Lead", type: "Number", required: false, isActive: true },
    { id: "4", name: "Deal Source", description: "Where deal originated", module: "Deal", type: "Text", required: false, isActive: true },
    { id: "5", name: "Contract Type", description: "Type of contract", module: "Contract", type: "Dropdown", required: true, isActive: true },
    { id: "6", name: "Special Requirements", description: "Customer special needs", module: "Customer", type: "Textarea", required: false, isActive: true },
  ];

  const columns = [
    {
      key: "name",
      label: "Field Name",
      render: (item: any) => (
        <div className="flex items-start gap-2">
          <Sliders className="h-4 w-4 text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">{item.name}</p>
            <p className="text-xs text-muted-foreground">{item.description}</p>
          </div>
        </div>
      ),
    },
    {
      key: "module",
      label: "Module",
      render: (item: any) => (
        <Badge className="bg-orange-100 text-orange-700 border-0">{item.module}</Badge>
      ),
    },
    {
      key: "type",
      label: "Field Type",
      render: (item: any) => (
        <Badge className="bg-blue-100 text-blue-700 border-0">{item.type}</Badge>
      ),
    },
    {
      key: "required",
      label: "Required",
      render: (item: any) => (
        <Badge className={item.required ? "bg-red-100 text-red-700 border-0" : "bg-gray-100 text-gray-700 border-0"}>
          {item.required ? "Yes" : "No"}
        </Badge>
      ),
    },
  ];

  return (
    <AdminMasterScreen
      title="Custom Fields"
      subtitle="Manage custom fields for different modules"
      items={mockCustomFields}
      columns={columns}
      onAdd={() => console.log("Add custom field")}
      onEdit={(id) => console.log("Edit custom field", id)}
      onDelete={(id) => console.log("Delete custom field", id)}
    />
  );
}
