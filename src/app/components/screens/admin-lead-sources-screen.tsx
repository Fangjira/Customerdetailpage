import { AdminMasterScreen } from "./admin-master-screen";
import { Badge } from "../ui/badge";
import { Sparkles } from "lucide-react";

export function AdminLeadSourcesScreen() {
  const mockLeadSources = [
    { id: "1", name: "Website", description: "Company website inquiries", channel: "Online", leads: 342, conversionRate: "28%", isActive: true },
    { id: "2", name: "Referral", description: "Customer referrals", channel: "Word of Mouth", leads: 156, conversionRate: "45%", isActive: true },
    { id: "3", name: "Trade Show", description: "Industry exhibitions", channel: "Event", leads: 89, conversionRate: "35%", isActive: true },
    { id: "4", name: "Cold Call", description: "Outbound sales calls", channel: "Direct Sales", leads: 234, conversionRate: "12%", isActive: true },
    { id: "5", name: "Social Media", description: "Facebook, LinkedIn, etc", channel: "Online", leads: 178, conversionRate: "22%", isActive: true },
    { id: "6", name: "Email Campaign", description: "Marketing emails", channel: "Marketing", leads: 267, conversionRate: "18%", isActive: true },
    { id: "7", name: "Partner", description: "Business partnerships", channel: "Partnership", leads: 45, conversionRate: "52%", isActive: true },
  ];

  const columns = [
    {
      key: "name",
      label: "Source Name",
      render: (item: any) => (
        <div className="flex items-start gap-2">
          <Sparkles className="h-4 w-4 text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">{item.name}</p>
            <p className="text-xs text-muted-foreground">{item.description}</p>
          </div>
        </div>
      ),
    },
    {
      key: "channel",
      label: "Channel",
      render: (item: any) => (
        <Badge className="bg-cyan-100 text-cyan-700 border-0">{item.channel}</Badge>
      ),
    },
    {
      key: "leads",
      label: "Total Leads",
      render: (item: any) => <p className="text-sm text-foreground font-medium">{item.leads}</p>,
    },
    {
      key: "conversionRate",
      label: "Conversion Rate",
      render: (item: any) => (
        <Badge className="bg-green-100 text-green-700 border-0">{item.conversionRate}</Badge>
      ),
    },
  ];

  return (
    <AdminMasterScreen
      title="Lead Sources"
      subtitle="Manage lead sources and track conversion rates"
      items={mockLeadSources}
      columns={columns}
      onAdd={() => console.log("Add lead source")}
      onEdit={(id) => console.log("Edit lead source", id)}
      onDelete={(id) => console.log("Delete lead source", id)}
    />
  );
}
