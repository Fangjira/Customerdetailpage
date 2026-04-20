import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Users,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Clock,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  User,
  Calendar,
  ChevronRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Deal {
  id: string;
  name: string;
  customer: string;
  owner: string;
  stage: string;
  amount: number;
  probability: number;
  closeDate: Date;
  lastActivity: string;
  daysInStage: number;
  status: "at-risk" | "on-track" | "closing-soon" | "won" | "lost";
}

interface TeamDealsScreenProps {
  onNavigate?: (path: string) => void;
  onDealClick?: (dealId: string) => void;
}

export function TeamDealsScreen({ onNavigate, onDealClick }: TeamDealsScreenProps) {
  const [selectedOwner, setSelectedOwner] = useState<string>("all");
  const [selectedStage, setSelectedStage] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Team members
  const teamMembers = [
    { id: "sarah", name: "Sarah Chen" },
    { id: "michael", name: "Michael Park" },
    { id: "emily", name: "Emily Rodriguez" },
    { id: "david", name: "David Kim" },
  ];

  // Mock deals data for entire team
  const allDeals: Deal[] = [
    {
      id: "2507",
      name: "Enterprise CRM Implementation",
      customer: "Siam Commercial Bank",
      owner: "Sarah Chen",
      stage: "Proposal",
      amount: 5200000,
      probability: 70,
      closeDate: new Date("2025-03-15"),
      lastActivity: "2 days ago",
      daysInStage: 15,
      status: "on-track",
    },
    {
      id: "2426",
      name: "Digital Transformation Package",
      customer: "PTT Energy",
      owner: "Michael Park",
      stage: "Negotiation",
      amount: 8500000,
      probability: 85,
      closeDate: new Date("2025-02-28"),
      lastActivity: "1 day ago",
      daysInStage: 8,
      status: "closing-soon",
    },
    {
      id: "2447",
      name: "Cloud Migration Project",
      customer: "CP All Retail",
      owner: "Emily Rodriguez",
      stage: "Qualified",
      amount: 3200000,
      probability: 40,
      closeDate: new Date("2025-04-10"),
      lastActivity: "5 days ago",
      daysInStage: 32,
      status: "at-risk",
    },
    {
      id: "2402",
      name: "Supply Chain Automation",
      customer: "Thai Union Manufacturing",
      owner: "David Kim",
      stage: "Proposal",
      amount: 6800000,
      probability: 75,
      closeDate: new Date("2025-03-05"),
      lastActivity: "Today",
      daysInStage: 12,
      status: "on-track",
    },
    {
      id: "2405",
      name: "POS System Upgrade",
      customer: "Central F&B Group",
      owner: "Sarah Chen",
      stage: "Negotiation",
      amount: 4500000,
      probability: 80,
      closeDate: new Date("2025-02-25"),
      lastActivity: "Today",
      daysInStage: 6,
      status: "closing-soon",
    },
    {
      id: "2508",
      name: "HR System Implementation",
      customer: "Bangkok Hospital",
      owner: "Michael Park",
      stage: "Lead",
      amount: 2800000,
      probability: 25,
      closeDate: new Date("2025-05-20"),
      lastActivity: "3 days ago",
      daysInStage: 5,
      status: "on-track",
    },
    {
      id: "2509",
      name: "Warehouse Management System",
      customer: "Robinson Department Store",
      owner: "Emily Rodriguez",
      stage: "Proposal",
      amount: 5500000,
      probability: 65,
      closeDate: new Date("2025-03-25"),
      lastActivity: "1 day ago",
      daysInStage: 18,
      status: "on-track",
    },
    {
      id: "2510",
      name: "Customer Portal Development",
      customer: "AIS Thailand",
      owner: "David Kim",
      stage: "Negotiation",
      amount: 7200000,
      probability: 90,
      closeDate: new Date("2025-02-20"),
      lastActivity: "Today",
      daysInStage: 4,
      status: "closing-soon",
    },
    {
      id: "2511",
      name: "ERP System Upgrade",
      customer: "Charoen Pokphand Foods",
      owner: "Sarah Chen",
      stage: "Qualified",
      amount: 9500000,
      probability: 50,
      closeDate: new Date("2025-04-30"),
      lastActivity: "7 days ago",
      daysInStage: 45,
      status: "at-risk",
    },
    {
      id: "2512",
      name: "Mobile App Development",
      customer: "True Corporation",
      owner: "Michael Park",
      stage: "Lead",
      amount: 3800000,
      probability: 30,
      closeDate: new Date("2025-05-15"),
      lastActivity: "2 days ago",
      daysInStage: 8,
      status: "on-track",
    },
  ];

  // Filter deals
  const filteredDeals = allDeals.filter((deal) => {
    if (selectedOwner !== "all" && deal.owner !== selectedOwner) return false;
    if (selectedStage !== "all" && deal.stage !== selectedStage) return false;
    if (selectedStatus !== "all" && deal.status !== selectedStatus) return false;
    if (searchQuery && !deal.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !deal.customer.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Calculate summary statistics
  const totalValue = filteredDeals.reduce((sum, deal) => sum + deal.amount, 0);
  const weightedValue = filteredDeals.reduce((sum, deal) => sum + (deal.amount * deal.probability / 100), 0);
  const atRiskCount = filteredDeals.filter(d => d.status === "at-risk").length;
  const closingSoonCount = filteredDeals.filter(d => d.status === "closing-soon").length;

  // Group deals by owner
  const dealsByOwner = teamMembers.map(member => ({
    ...member,
    deals: filteredDeals.filter(d => d.owner === member.name),
    totalValue: filteredDeals.filter(d => d.owner === member.name).reduce((sum, d) => sum + d.amount, 0),
    atRisk: filteredDeals.filter(d => d.owner === member.name && d.status === "at-risk").length,
  }));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "at-risk":
        return "bg-red-100 text-red-700 border-red-300";
      case "closing-soon":
        return "bg-green-100 text-green-700 border-green-300";
      case "on-track":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "won":
        return "bg-emerald-100 text-emerald-700 border-emerald-300";
      case "lost":
        return "bg-gray-100 text-gray-700 border-gray-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "at-risk":
        return "At Risk";
      case "closing-soon":
        return "Closing Soon";
      case "on-track":
        return "On Track";
      case "won":
        return "Won";
      case "lost":
        return "Lost";
      default:
        return status;
    }
  };

  const getStageBadge = (stage: string) => {
    const colors: Record<string, string> = {
      Lead: "bg-gray-100 text-gray-700",
      Qualified: "bg-blue-100 text-blue-700",
      Proposal: "bg-purple-100 text-purple-700",
      Negotiation: "bg-orange-100 text-orange-700",
      Won: "bg-green-100 text-green-700",
      Lost: "bg-red-100 text-red-700",
    };
    return colors[stage] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Deals</h1>
          <p className="text-sm text-muted-foreground mt-1">
            ดีลของทั้งทีม - จัดการและติดตามความคืบหน้า
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total Deals</span>
              <DollarSign className="h-5 w-5 text-[#7BC9A6]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{filteredDeals.length}</p>
            <p className="text-xs text-muted-foreground mt-1">
              ฿{(totalValue / 1000000).toFixed(1)}M total value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Weighted Value</span>
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              ฿{(weightedValue / 1000000).toFixed(1)}M
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Based on probability
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">At Risk</span>
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-red-600">{atRiskCount}</p>
            <p className="text-xs text-muted-foreground mt-1">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Closing Soon</span>
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">{closingSoonCount}</p>
            <p className="text-xs text-muted-foreground mt-1">Within 2 weeks</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search deals or customers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6]"
                />
              </div>
            </div>

            {/* Owner Filter */}
            <Select value={selectedOwner} onValueChange={setSelectedOwner}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Team Members" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Team Members</SelectItem>
                {teamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.name}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Stage Filter */}
            <Select value={selectedStage} onValueChange={setSelectedStage}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="All Stages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="Lead">Lead</SelectItem>
                <SelectItem value="Qualified">Qualified</SelectItem>
                <SelectItem value="Proposal">Proposal</SelectItem>
                <SelectItem value="Negotiation">Negotiation</SelectItem>
                <SelectItem value="Won">Won</SelectItem>
                <SelectItem value="Lost">Lost</SelectItem>
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="at-risk">At Risk</SelectItem>
                <SelectItem value="on-track">On Track</SelectItem>
                <SelectItem value="closing-soon">Closing Soon</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Deals by Team Member */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {dealsByOwner.map((member) => (
          <Card key={member.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#7BC9A6] to-[#6CB88A] flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {member.deals.length} deals • ฿{(member.totalValue / 1000000).toFixed(1)}M
                    </p>
                  </div>
                </div>
                {member.atRisk > 0 && (
                  <Badge className="bg-red-100 text-red-700">
                    {member.atRisk} at risk
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {member.deals.slice(0, 3).map((deal) => (
                  <div
                    key={deal.id}
                    className="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => onDealClick?.(deal.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-gray-900 truncate">
                          {deal.name}
                        </h4>
                        <p className="text-xs text-muted-foreground truncate">
                          {deal.customer}
                        </p>
                      </div>
                      <Badge className={getStatusBadge(deal.status)}>
                        {getStatusText(deal.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className={getStageBadge(deal.stage)}>{deal.stage}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {deal.daysInStage}d in stage
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        ฿{(deal.amount / 1000000).toFixed(1)}M
                      </span>
                    </div>
                  </div>
                ))}
                {member.deals.length > 3 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-[#7BC9A6] hover:bg-[#7BC9A6]/10"
                    onClick={() => setSelectedOwner(member.name)}
                  >
                    View all {member.deals.length} deals
                  </Button>
                )}
                {member.deals.length === 0 && (
                  <p className="text-center text-sm text-muted-foreground py-4">
                    No deals found
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* All Deals Table - Desktop */}
      <Card className="hidden lg:block">
        <CardHeader>
          <CardTitle>All Team Deals ({filteredDeals.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                    Deal Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                    Owner
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                    Stage
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">
                    Probability
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDeals.map((deal) => (
                  <tr
                    key={deal.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => onDealClick?.(deal.id)}
                  >
                    <td className="px-4 py-3">
                      <p className="text-sm font-semibold text-gray-900">{deal.name}</p>
                      <p className="text-xs text-muted-foreground">{deal.lastActivity}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{deal.customer}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-[#7BC9A6]/20 flex items-center justify-center">
                          <span className="text-[9px] font-semibold text-[#7BC9A6]">
                            {deal.owner
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <span className="text-sm text-gray-700">{deal.owner}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={getStageBadge(deal.stage)}>{deal.stage}</Badge>
                    </td>
                    <td className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
                      ฿{(deal.amount / 1000000).toFixed(1)}M
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-gray-700">
                      {deal.probability}%
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge className={getStatusBadge(deal.status)}>
                        {getStatusText(deal.status)}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
