import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  XCircle,
  Building2,
  User,
  Calendar,
  DollarSign,
} from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "../ui/utils";
import { useRole } from "../../contexts/role-context";

interface Deal {
  id: string;
  name: string;
  company: string;
  value: number;
  stage: string;
  owner: string;
  probability: number;
  closeDate: string;
  status: "active" | "won" | "lost";
}

interface OneLinkDealsScreenProps {
  onNavigate?: (path: string, dealId?: string) => void;
}

export function OneLinkDealsScreen({ onNavigate }: OneLinkDealsScreenProps) {
  const { t } = useTranslation();
  const { role } = useRole();

  const [deals, setDeals] = useState<Deal[]>([
    {
      id: "D-001",
      name: "Enterprise Software License",
      company: "Tech Corp",
      value: 250000,
      stage: "Negotiation",
      owner: "John Smith",
      probability: 75,
      closeDate: "2024-04-15",
      status: "active",
    },
    {
      id: "D-002",
      name: "Logistics Solution Package",
      company: "Global Shipping Ltd",
      value: 180000,
      stage: "Proposal",
      owner: "Sarah Chen",
      probability: 60,
      closeDate: "2024-04-20",
      status: "active",
    },
    {
      id: "D-003",
      name: "Warehouse Management System",
      company: "Distribution Co",
      value: 320000,
      stage: "Qualification",
      owner: "Michael Wong",
      probability: 45,
      closeDate: "2024-05-10",
      status: "active",
    },
    {
      id: "D-004",
      name: "Customs Clearance Services",
      company: "Import Export Inc",
      value: 95000,
      stage: "Discovery",
      owner: "Emma Wilson",
      probability: 30,
      closeDate: "2024-05-25",
      status: "active",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [editingCell, setEditingCell] = useState<{
    dealId: string;
    field: string;
  } | null>(null);
  const [tempValue, setTempValue] = useState("");

  const stages = [
    "Discovery",
    "Qualification",
    "Proposal",
    "Negotiation",
    "Closed Won",
    "Closed Lost",
  ];

  // Inline editing functions
  const startEdit = (dealId: string, field: string, currentValue: any) => {
    setEditingCell({ dealId, field });
    setTempValue(currentValue.toString());
  };

  const saveEdit = () => {
    if (!editingCell) return;

    setDeals((prevDeals) =>
      prevDeals.map((deal) => {
        if (deal.id === editingCell.dealId) {
          return {
            ...deal,
            [editingCell.field]:
              editingCell.field === "value" ||
              editingCell.field === "probability"
                ? parseFloat(tempValue) || 0
                : tempValue,
          };
        }
        return deal;
      })
    );

    setEditingCell(null);
    setTempValue("");
  };

  const cancelEdit = () => {
    setEditingCell(null);
    setTempValue("");
  };

  const getStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      Discovery: "bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-400",
      Qualification: "bg-purple-100 text-purple-800 dark:bg-purple-950/30 dark:text-purple-400",
      Proposal: "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-400",
      Negotiation: "bg-orange-100 text-orange-800 dark:bg-orange-950/30 dark:text-orange-400",
      "Closed Won": "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-400",
      "Closed Lost": "bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-400",
    };
    return colors[stage] || "bg-gray-100 text-gray-800";
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 75) return "text-green-600 dark:text-green-400";
    if (probability >= 50) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const filteredDeals = deals.filter((deal) =>
    deal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    deal.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">ดีล</h1>
          <p className="text-sm text-muted-foreground">
            จัดการและติดตามความคืบหน้าของดีล
          </p>
        </div>
        <Button
          onClick={() => onNavigate?.("/deals/create")}
          className="bg-primary hover:bg-primary/90 gap-2"
        >
          <Plus className="h-4 w-4" />
          เพิ่มดีลใหม่
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="ค้นหาชื่อดีลหรือบริษัท..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="ขั้นตอนทั้งหมด" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ขั้นตอนทั้งหมด</SelectItem>
              {stages.map((stage) => (
                <SelectItem key={stage} value={stage}>
                  {stage}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="เจ้าของดีล" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทั้งหมด</SelectItem>
              <SelectItem value="me">ดีลของฉัน</SelectItem>
              <SelectItem value="team">ดีลของทีม</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Deals Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-4 font-semibold text-sm">ชื่อดีล</th>
                <th className="text-left p-4 font-semibold text-sm">บริษัท</th>
                <th className="text-right p-4 font-semibold text-sm">
                  มูลค่า
                </th>
                <th className="text-left p-4 font-semibold text-sm">
                  ขั้นตอน
                </th>
                <th className="text-center p-4 font-semibold text-sm">
                  โอกาสสำเร็จ
                </th>
                <th className="text-left p-4 font-semibold text-sm">
                  เจ้าของ
                </th>
                <th className="text-left p-4 font-semibold text-sm">
                  วันปิดดีล
                </th>
                <th className="text-center p-4 font-semibold text-sm">
                  การดำเนินการ
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredDeals.map((deal) => (
                <tr
                  key={deal.id}
                  className="border-b hover:bg-muted/30 transition-colors"
                >
                  {/* Deal Name - Inline Editable */}
                  <td className="p-4">
                    {editingCell?.dealId === deal.id &&
                    editingCell?.field === "name" ? (
                      <div className="flex items-center gap-2">
                        <Input
                          value={tempValue}
                          onChange={(e) => setTempValue(e.target.value)}
                          className="h-8"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveEdit();
                            if (e.key === "Escape") cancelEdit();
                          }}
                        />
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={saveEdit}
                        >
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={cancelEdit}
                        >
                          <XCircle className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    ) : (
                      <div
                        className="flex items-center gap-2 group cursor-pointer"
                        onClick={() => startEdit(deal.id, "name", deal.name)}
                      >
                        <span className="font-medium">{deal.name}</span>
                        <Edit2 className="h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                      </div>
                    )}
                  </td>

                  {/* Company */}
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{deal.company}</span>
                    </div>
                  </td>

                  {/* Value - Inline Editable */}
                  <td className="p-4 text-right">
                    {editingCell?.dealId === deal.id &&
                    editingCell?.field === "value" ? (
                      <div className="flex items-center gap-2 justify-end">
                        <Input
                          type="number"
                          value={tempValue}
                          onChange={(e) => setTempValue(e.target.value)}
                          className="h-8 w-32 text-right"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveEdit();
                            if (e.key === "Escape") cancelEdit();
                          }}
                        />
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={saveEdit}
                        >
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={cancelEdit}
                        >
                          <XCircle className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    ) : (
                      <div
                        className="group cursor-pointer flex items-center justify-end gap-2"
                        onClick={() => startEdit(deal.id, "value", deal.value)}
                      >
                        <span className="font-semibold">
                          {formatCurrency(deal.value)}
                        </span>
                        <Edit2 className="h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                      </div>
                    )}
                  </td>

                  {/* Stage - Inline Editable */}
                  <td className="p-4">
                    {editingCell?.dealId === deal.id &&
                    editingCell?.field === "stage" ? (
                      <div className="flex items-center gap-2">
                        <Select value={tempValue} onValueChange={setTempValue}>
                          <SelectTrigger className="h-8 w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {stages.map((stage) => (
                              <SelectItem key={stage} value={stage}>
                                {stage}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={saveEdit}
                        >
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={cancelEdit}
                        >
                          <XCircle className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    ) : (
                      <div
                        onClick={() =>
                          startEdit(deal.id, "stage", deal.stage)
                        }
                        className="cursor-pointer"
                      >
                        <Badge className={cn("text-xs", getStageColor(deal.stage))}>
                          {deal.stage}
                        </Badge>
                      </div>
                    )}
                  </td>

                  {/* Probability */}
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full transition-all",
                            deal.probability >= 75
                              ? "bg-green-500"
                              : deal.probability >= 50
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          )}
                          style={{ width: `${deal.probability}%` }}
                        />
                      </div>
                      <span
                        className={cn(
                          "text-sm font-medium",
                          getProbabilityColor(deal.probability)
                        )}
                      >
                        {deal.probability}%
                      </span>
                    </div>
                  </td>

                  {/* Owner */}
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{deal.owner}</span>
                    </div>
                  </td>

                  {/* Close Date */}
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {new Date(deal.closeDate).toLocaleDateString("th-TH")}
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8"
                        onClick={() => onNavigate?.("/deal-detail", deal.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit2 className="mr-2 h-4 w-4" />
                            แก้ไข
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            ลบ
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
