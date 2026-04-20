import { AdminMasterScreen } from "./admin-master-screen";
import { Badge } from "../ui/badge";
import { FileText } from "lucide-react";

export function AdminTemplatesScreen() {
  const mockTemplates = [
    { id: "1", name: "Quotation Template - Standard", description: "Standard quotation format", type: "Quotation", language: "EN/TH", usage: 345, isActive: true },
    { id: "2", name: "Quotation Template - Premium", description: "Premium customer format", type: "Quotation", language: "EN/TH", usage: 156, isActive: true },
    { id: "3", name: "Contract Template - Enterprise", description: "Enterprise contract", type: "Contract", language: "EN", usage: 89, isActive: true },
    { id: "4", name: "Email - Welcome", description: "New customer welcome", type: "Email", language: "EN/TH", usage: 567, isActive: true },
    { id: "5", name: "Email - Follow-up", description: "Sales follow-up", type: "Email", language: "EN/TH", usage: 892, isActive: true },
    { id: "6", name: "Proposal - Air Freight", description: "Air freight proposal", type: "Proposal", language: "EN", usage: 234, isActive: true },
    { id: "7", name: "Invoice Template", description: "Standard invoice", type: "Invoice", language: "EN/TH", usage: 1234, isActive: false },
  ];

  const columns = [
    {
      key: "name",
      label: "Template Name",
      render: (item: any) => (
        <div className="flex items-start gap-2">
          <FileText className="h-4 w-4 text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">{item.name}</p>
            <p className="text-xs text-muted-foreground">{item.description}</p>
          </div>
        </div>
      ),
    },
    {
      key: "type",
      label: "Type",
      render: (item: any) => (
        <Badge className="bg-violet-100 text-violet-700 border-0">{item.type}</Badge>
      ),
    },
    {
      key: "language",
      label: "Language",
      render: (item: any) => <p className="text-sm text-foreground">{item.language}</p>,
    },
    {
      key: "usage",
      label: "Usage Count",
      render: (item: any) => <p className="text-sm text-foreground font-medium">{item.usage}</p>,
    },
  ];

  return (
    <AdminMasterScreen
      title="Templates"
      subtitle="Manage document and email templates"
      items={mockTemplates}
      columns={columns}
      onAdd={() => console.log("Add template")}
      onEdit={(id) => console.log("Edit template", id)}
      onDelete={(id) => console.log("Delete template", id)}
    />
  );
}
