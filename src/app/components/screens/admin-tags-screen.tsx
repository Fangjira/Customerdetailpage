import { AdminMasterScreen } from "./admin-master-screen";
import { Badge } from "../ui/badge";
import { Tag } from "lucide-react";

export function AdminTagsScreen() {
  const mockTags = [
    { id: "1", name: "VIP", description: "VIP customer", category: "Customer", color: "#f59e0b", usage: 45, isActive: true },
    { id: "2", name: "Hot Lead", description: "High priority lead", category: "Lead", color: "#ef4444", usage: 89, isActive: true },
    { id: "3", name: "Urgent", description: "Urgent deal", category: "Deal", color: "#dc2626", usage: 23, isActive: true },
    { id: "4", name: "Large Contract", description: "Contract > 10M", category: "Contract", color: "#8b5cf6", usage: 12, isActive: true },
    { id: "5", name: "Referral", description: "Came from referral", category: "Lead", color: "#10b981", usage: 67, isActive: true },
    { id: "6", name: "International", description: "Cross-border shipment", category: "Deal", color: "#3b82f6", usage: 156, isActive: true },
    { id: "7", name: "Expired", description: "Expired contract", category: "Contract", color: "#6b7280", usage: 34, isActive: false },
  ];

  const columns = [
    {
      key: "name",
      label: "Tag Name",
      render: (item: any) => (
        <div className="flex items-start gap-2">
          <Tag className="h-4 w-4 mt-0.5" style={{ color: item.color }} />
          <div>
            <p className="text-sm font-medium text-foreground">{item.name}</p>
            <p className="text-xs text-muted-foreground">{item.description}</p>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (item: any) => (
        <Badge className="bg-teal-100 text-teal-700 border-0">{item.category}</Badge>
      ),
    },
    {
      key: "color",
      label: "Color",
      render: (item: any) => (
        <div className="flex items-center gap-2">
          <div
            className="h-6 w-6 rounded-md border border-border"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-xs text-muted-foreground">{item.color}</span>
        </div>
      ),
    },
    {
      key: "usage",
      label: "Usage Count",
      render: (item: any) => <p className="text-sm text-foreground font-medium">{item.usage}</p>,
    },
  ];

  return (
    <AdminMasterScreen
      title="Tags & Labels"
      subtitle="Manage tags and labels for categorization"
      items={mockTags}
      columns={columns}
      onAdd={() => console.log("Add tag")}
      onEdit={(id) => console.log("Edit tag", id)}
      onDelete={(id) => console.log("Delete tag", id)}
    />
  );
}
