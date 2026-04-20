import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  MoreVertical,
  Check,
  X,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { useRoleTheme } from "../../hooks/use-role-theme";

interface MasterItem {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

interface AdminMasterScreenProps {
  title: string;
  subtitle?: string;
  icon?: any;
  items?: MasterItem[];
  data?: MasterItem[]; // Support both 'data' and 'items'
  columns: {
    key: string;
    label: string;
    width?: string;
    render?: (item: MasterItem) => React.ReactNode;
  }[];
  formFields?: any[];
  searchPlaceholder?: string;
  emptyMessage?: string;
  createButtonLabel?: string;
  pageKey?: string;
  onAdd?: (data: any) => void;
  onEdit?: (id: string, data: any) => void;
  onDelete?: (id: string) => void;
  onToggleStatus?: (id: string) => void;
}

export function AdminMasterScreen({
  title,
  subtitle,
  icon: Icon,
  items: itemsProp,
  data: dataProp,
  columns,
  formFields,
  searchPlaceholder = "Search...",
  emptyMessage = "No items found",
  createButtonLabel = "Create New",
  pageKey,
  onAdd,
  onEdit,
  onDelete,
  onToggleStatus,
}: AdminMasterScreenProps) {
  const { t } = useTranslation();
  const roleTheme = useRoleTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Use either items or data prop
  const items = itemsProp || dataProp || [];

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && item.isActive) ||
      (filterStatus === "inactive" && !item.isActive);
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: items.length,
    active: items.filter((i) => i.isActive).length,
    inactive: items.filter((i) => !i.isActive).length,
  };

  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        {onAdd && (
          <Button
            className="rounded-xl shadow-sm"
            style={{
              background: `linear-gradient(to right, ${roleTheme.gradientFrom}, ${roleTheme.gradientTo})`,
              color: "white",
            }}
            onClick={onAdd}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <Check className="h-8 w-8 text-green-600 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Inactive</p>
                <p className="text-2xl font-bold text-red-600">{stats.inactive}</p>
              </div>
              <X className="h-8 w-8 text-red-600 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            className={`px-3 py-2 h-9 ${
              filterStatus === "all"
                ? "text-primary bg-primary/10 font-medium"
                : "text-muted-foreground hover:bg-primary/10"
            }`}
            onClick={() => setFilterStatus("all")}
          >
            All
          </Button>
          <Button
            variant="ghost"
            className={`px-3 py-2 h-9 ${
              filterStatus === "active"
                ? "text-primary bg-primary/10 font-medium"
                : "text-muted-foreground hover:bg-primary/10"
            }`}
            onClick={() => setFilterStatus("active")}
          >
            Active
          </Button>
          <Button
            variant="ghost"
            className={`px-3 py-2 h-9 ${
              filterStatus === "inactive"
                ? "text-primary bg-primary/10 font-medium"
                : "text-muted-foreground hover:bg-primary/10"
            }`}
            onClick={() => setFilterStatus("inactive")}
          >
            Inactive
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 w-64 h-9 border border-border rounded-lg bg-card focus:border-primary text-sm"
          />
        </div>
      </div>

      {/* Data Table */}
      <Card className="border border-border shadow-sm bg-card">
        <CardHeader className="border-b border-border bg-secondary/50 px-4 py-3">
          <CardTitle className="text-foreground text-base">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary/50 border-b border-border">
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className="text-left px-4 py-3 text-xs font-medium text-muted-foreground"
                      style={{ width: col.width }}
                    >
                      {col.label}
                    </th>
                  ))}
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-secondary/30 cursor-pointer transition-colors"
                  >
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-3">
                        {col.render ? (
                          col.render(item)
                        ) : (
                          <p className="text-sm text-foreground">
                            {item[col.key as keyof MasterItem]?.toString() || "-"}
                          </p>
                        )}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      {item.isActive ? (
                        <Badge className="bg-green-100 text-green-700 border-0">
                          <Check className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-700 border-0">
                          <X className="h-3 w-3 mr-1" />
                          Inactive
                        </Badge>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {onEdit && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-blue-600 hover:bg-blue-50 h-8 w-8 p-0"
                            onClick={() => onEdit(item.id, item)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-600 hover:bg-red-50 h-8 w-8 p-0"
                            onClick={() => onDelete(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
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