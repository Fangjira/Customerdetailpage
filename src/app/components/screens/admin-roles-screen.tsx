import { AdminMasterScreen } from "./admin-master-screen";
import { useTranslation } from "react-i18next";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { RoleFormModal, RoleFormData } from "../modals/role-form-modal";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

export function AdminRolesScreen() {
  const { t } = useTranslation();
  const [roles, setRoles] = useState<RoleFormData[]>([
    {
      id: "1",
      name: "Sales Representative",
      description: "Entry-level sales role with basic CRM access",
      permissions: ["view_leads", "create_quotations", "view_customers"],
      users: 45,
      isActive: true,
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Sales Manager",
      description: "Manages sales team and approves quotations",
      permissions: ["manage_team", "approve_quotations", "view_reports"],
      users: 12,
      isActive: true,
      createdAt: "2024-01-10",
    },
    {
      id: "3",
      name: "Admin",
      description: "Full system access and configuration",
      permissions: ["full_access", "manage_users", "system_settings"],
      users: 3,
      isActive: true,
      createdAt: "2024-01-01",
    },
    {
      id: "4",
      name: "Finance",
      description: "Financial reporting and contract management",
      permissions: ["view_contracts", "financial_reports"],
      users: 8,
      isActive: true,
      createdAt: "2024-02-01",
    },
    {
      id: "5",
      name: "Customer Service",
      description: "Customer support and ticket management",
      permissions: ["view_customers", "manage_tickets"],
      users: 15,
      isActive: false,
      createdAt: "2023-12-15",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<RoleFormData | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<string | null>(null);

  const handleAdd = () => {
    setEditingRole(null);
    setIsModalOpen(true);
  };

  const handleEdit = (id: string) => {
    const role = roles.find((r) => r.id === id);
    if (role) {
      setEditingRole(role);
      setIsModalOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    setRoleToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (roleToDelete) {
      setRoles(roles.filter((r) => r.id !== roleToDelete));
      toast.success("Role deleted successfully");
      setDeleteDialogOpen(false);
      setRoleToDelete(null);
    }
  };

  const handleSave = (data: RoleFormData) => {
    if (editingRole) {
      // Update existing role
      setRoles(
        roles.map((r) =>
          r.id === editingRole.id
            ? { ...data, id: editingRole.id, users: editingRole.users, createdAt: editingRole.createdAt }
            : r
        )
      );
    } else {
      // Create new role
      const newRole: RoleFormData = {
        ...data,
        id: String(Date.now()),
        users: 0,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setRoles([...roles, newRole]);
    }
    setIsModalOpen(false);
  };

  const columns = [
    {
      key: "name",
      label: "Role Name",
      render: (item: any) => (
        <div>
          <p className="text-sm font-medium text-foreground">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item.description}</p>
        </div>
      ),
    },
    {
      key: "permissions",
      label: "Permissions",
      render: (item: any) => (
        <div className="flex flex-wrap gap-1">
          {item.permissions.slice(0, 2).map((perm: string, index: number) => (
            <Badge key={index} className="bg-blue-100 text-blue-700 border-0 text-xs">
              {perm.replace(/_/g, " ")}
            </Badge>
          ))}
          {item.permissions.length > 2 && (
            <Badge className="bg-gray-100 text-gray-700 border-0 text-xs">
              +{item.permissions.length - 2} more
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: "users",
      label: "Users",
      render: (item: any) => (
        <p className="text-sm text-foreground font-medium">{item.users}</p>
      ),
    },
  ];

  return (
    <>
      <AdminMasterScreen
        title="Roles & Permissions"
        subtitle="Manage user roles and access permissions"
        items={roles}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <RoleFormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        role={editingRole}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this role. Users assigned to this role will need to be reassigned.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}