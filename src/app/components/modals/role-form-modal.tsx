import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import { X, Shield, Users, FileText, Settings, TrendingUp, Database } from "lucide-react";
import { useRoleTheme } from "../../hooks/use-role-theme";

interface RoleFormModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: RoleFormData) => void;
  role?: RoleFormData | null;
}

export interface RoleFormData {
  id?: string;
  name: string;
  description: string;
  permissions: string[];
  isActive: boolean;
  users?: number;
  createdAt?: string;
}

const permissionCategories = [
  {
    category: "Leads & Customers",
    icon: Users,
    permissions: [
      { key: "view_leads", label: "View Leads" },
      { key: "create_leads", label: "Create Leads" },
      { key: "edit_leads", label: "Edit Leads" },
      { key: "delete_leads", label: "Delete Leads" },
      { key: "view_customers", label: "View Customers" },
      { key: "create_customers", label: "Create Customers" },
      { key: "edit_customers", label: "Edit Customers" },
      { key: "delete_customers", label: "Delete Customers" },
    ],
  },
  {
    category: "Deals & Quotations",
    icon: FileText,
    permissions: [
      { key: "view_deals", label: "View Deals" },
      { key: "create_deals", label: "Create Deals" },
      { key: "edit_deals", label: "Edit Deals" },
      { key: "delete_deals", label: "Delete Deals" },
      { key: "view_quotations", label: "View Quotations" },
      { key: "create_quotations", label: "Create Quotations" },
      { key: "approve_quotations", label: "Approve Quotations" },
      { key: "delete_quotations", label: "Delete Quotations" },
    ],
  },
  {
    category: "Contracts & Proposals",
    icon: FileText,
    permissions: [
      { key: "view_contracts", label: "View Contracts" },
      { key: "create_contracts", label: "Create Contracts" },
      { key: "approve_contracts", label: "Approve Contracts" },
      { key: "view_proposals", label: "View Proposals" },
      { key: "create_proposals", label: "Create Proposals" },
    ],
  },
  {
    category: "Reports & Analytics",
    icon: TrendingUp,
    permissions: [
      { key: "view_reports", label: "View Reports" },
      { key: "view_dashboards", label: "View Dashboards" },
      { key: "view_insights", label: "View Customer Insights" },
      { key: "export_reports", label: "Export Reports" },
    ],
  },
  {
    category: "Team Management",
    icon: Users,
    permissions: [
      { key: "view_team", label: "View Team" },
      { key: "manage_team", label: "Manage Team Members" },
      { key: "assign_tasks", label: "Assign Tasks" },
      { key: "view_team_reports", label: "View Team Reports" },
    ],
  },
  {
    category: "Administration",
    icon: Settings,
    permissions: [
      { key: "manage_users", label: "Manage Users" },
      { key: "manage_roles", label: "Manage Roles & Permissions" },
      { key: "system_settings", label: "System Settings" },
      { key: "manage_master_data", label: "Manage Master Data" },
      { key: "view_audit_log", label: "View Audit Log" },
      { key: "full_access", label: "Full System Access" },
    ],
  },
];

export function RoleFormModal({ open, onClose, onSave, role }: RoleFormModalProps) {
  const { t } = useTranslation();
  const roleTheme = useRoleTheme();
  const [formData, setFormData] = useState<RoleFormData>({
    name: "",
    description: "",
    permissions: [],
    isActive: true,
  });

  useEffect(() => {
    if (role) {
      setFormData(role);
    } else {
      setFormData({
        name: "",
        description: "",
        permissions: [],
        isActive: true,
      });
    }
  }, [role, open]);

  const handlePermissionToggle = (permissionKey: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionKey)
        ? prev.permissions.filter((p) => p !== permissionKey)
        : [...prev.permissions, permissionKey],
    }));
  };

  const handleSelectAllInCategory = (categoryPermissions: { key: string }[]) => {
    const categoryKeys = categoryPermissions.map((p) => p.key);
    const allSelected = categoryKeys.every((key) => formData.permissions.includes(key));

    setFormData((prev) => ({
      ...prev,
      permissions: allSelected
        ? prev.permissions.filter((p) => !categoryKeys.includes(p))
        : [...new Set([...prev.permissions, ...categoryKeys])],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Please enter role name");
      return;
    }

    if (formData.permissions.length === 0) {
      toast.error("Please select at least one permission");
      return;
    }

    onSave(formData);
    toast.success(role ? "Role updated successfully" : "Role created successfully");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Shield className="h-5 w-5" style={{ color: roleTheme.primary }} />
            {role ? "Edit Role" : "Create New Role"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Role Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Sales Support"
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of this role"
                className="min-h-[80px]"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isActive: checked as boolean })
                }
              />
              <Label htmlFor="isActive" className="font-normal cursor-pointer">
                Active Role
              </Label>
            </div>
          </div>

          {/* Permissions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Permissions *</Label>
              <Badge variant="outline" className="text-xs">
                {formData.permissions.length} selected
              </Badge>
            </div>

            <div className="space-y-6 border rounded-lg p-4 bg-gray-50">
              {permissionCategories.map((category) => {
                const CategoryIcon = category.icon;
                const categoryPermissionKeys = category.permissions.map((p) => p.key);
                const selectedInCategory = categoryPermissionKeys.filter((key) =>
                  formData.permissions.includes(key)
                ).length;
                const allSelected =
                  selectedInCategory === category.permissions.length &&
                  category.permissions.length > 0;

                return (
                  <div key={category.category} className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b">
                      <div className="flex items-center gap-2">
                        <CategoryIcon className="h-4 w-4 text-gray-600" />
                        <h4 className="font-medium text-sm">{category.category}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {selectedInCategory}/{category.permissions.length}
                        </Badge>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSelectAllInCategory(category.permissions)}
                        className="h-7 text-xs"
                      >
                        {allSelected ? "Deselect All" : "Select All"}
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {category.permissions.map((permission) => (
                        <div
                          key={permission.key}
                          className="flex items-center space-x-2 bg-white p-2 rounded border hover:border-gray-300 transition-colors"
                        >
                          <Checkbox
                            id={permission.key}
                            checked={formData.permissions.includes(permission.key)}
                            onCheckedChange={() => handlePermissionToggle(permission.key)}
                          />
                          <Label
                            htmlFor={permission.key}
                            className="text-sm font-normal cursor-pointer flex-1"
                          >
                            {permission.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              style={{
                background: `linear-gradient(to right, ${roleTheme.gradientFrom}, ${roleTheme.gradientTo})`,
                color: "white",
              }}
            >
              {role ? "Update Role" : "Create Role"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
