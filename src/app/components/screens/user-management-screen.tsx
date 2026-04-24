import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Users,
  Plus,
  Filter,
  Search,
  Eye,
  Edit,
  Trash2,
  Shield,
  Mail,
  Phone,
  Building2,
  CheckCircle2,
  XCircle,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { advancedMockData } from "../../../data/advancedMockData";
import { useRoleTheme } from "../../hooks/use-role-theme";

interface UserManagementScreenProps {
  onUserClick?: (userId: string) => void;
}

interface AddEditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: any) => void;
  editUser?: any;
  mode: 'add' | 'edit';
}

function AddEditUserModal({ isOpen, onClose, onSave, editUser, mode }: AddEditUserModalProps) {
  const { t } = useTranslation();
  const roleTheme = useRoleTheme();
  const [formData, setFormData] = useState(editUser || {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'sales_rep',
    department: '',
    isActive: true,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose} />
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-50">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            {mode === 'add' ? 'เพิ่มผู้ใช้ใหม่' : 'แก้ไขข้อมูลผู้ใช้'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ชื่อ <span className="text-red-500">*</span>
              </label>
              <Input
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="กรอกชื่อ"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                นามสกุล <span className="text-red-500">*</span>
              </label>
              <Input
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="กรอกนามสกุล"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              อีเมล <span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="name@company.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              เบอร์โทรศัพท์
            </label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+66 81 234 5678"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              บทบาท <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="sales_rep">Sales Representative</option>
              <option value="sales_manager">Sales Manager</option>
              <option value="account_manager">Account Manager</option>
              <option value="operations_manager">Operations Manager</option>
              <option value="admin">Admin</option>
              <option value="finance">Finance</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              แผนก
            </label>
            <Input
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              placeholder="Sales Division"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
            />
            <label htmlFor="isActive" className="text-sm text-gray-700">
              เปิดใช้งานบัญชีผู้ใช้
            </label>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t">
            <Button
              type="submit"
              className="flex-1"
              style={{
                background: `linear-gradient(to right, ${roleTheme.gradientFrom}, ${roleTheme.gradientTo})`,
              }}
            >
              {mode === 'add' ? 'เพิ่มผู้ใช้' : 'บันทึกการแก้ไข'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              ยกเลิก
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export function UserManagementScreen({ onUserClick }: UserManagementScreenProps) {
  const { t, i18n } = useTranslation();
  const roleTheme = useRoleTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [users, setUsers] = useState(advancedMockData.users);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  const getRoleBadge = (role: string) => {
    const roleConfig: Record<string, { label: string; color: string }> = {
      super_admin: { label: "Super Admin", color: "bg-red-100 text-red-700" },
      admin: { label: "Admin", color: "bg-purple-100 text-purple-700" },
      sales_manager: { label: "Sales Manager", color: "bg-blue-100 text-blue-700" },
      sales_rep: { label: "Sales Rep", color: "bg-cyan-100 text-cyan-700" },
      operations_manager: { label: "Ops Manager", color: "bg-green-100 text-green-700" },
      account_manager: { label: "Account Manager", color: "bg-orange-100 text-orange-700" },
      finance: { label: "Finance", color: "bg-yellow-100 text-yellow-700" },
      viewer: { label: "Viewer", color: "bg-gray-100 text-gray-700" },
    };

    const config = roleConfig[role] || roleConfig.viewer;
    return (
      <Badge className={`${config.color} border-0`}>
        {config.label}
      </Badge>
    );
  };

  const getStatusBadge = (isActive: boolean) => {
    if (isActive) {
      return (
        <Badge className="bg-green-100 text-green-700 border-0">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Active
        </Badge>
      );
    }
    return (
      <Badge className="bg-red-100 text-red-700 border-0">
        <XCircle className="h-3 w-3 mr-1" />
        Inactive
      </Badge>
    );
  };

  const formatLastLogin = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString(i18n.language, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && user.isActive) ||
      (filterStatus === "inactive" && !user.isActive);

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAddUser = (userData: any) => {
    const newUser = {
      ...userData,
      id: `user-${Date.now()}`,
      avatar: `${userData.firstName[0]}${userData.lastName[0]}`,
      lastLogin: new Date().toISOString(),
    };
    setUsers([...users, newUser]);
  };

  const handleEditUser = (userData: any) => {
    setUsers(users.map(u => u.id === userData.id ? userData : u));
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบผู้ใช้นี้?')) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  const openEditModal = (user: any) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const stats = {
    total: users.length,
    active: users.filter((u) => u.isActive).length,
    inactive: users.filter((u) => !u.isActive).length,
    admins: users.filter((u) => u.role === "admin" || u.role === "super_admin").length,
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="mx-auto max-w-7xl p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {t("admin_users")}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              จัดการผู้ใช้ บทบาท และสิทธิ์การเข้าถึงระบบ
            </p>
          </div>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="gap-2"
            style={{
              background: `linear-gradient(to right, ${roleTheme.gradientFrom}, ${roleTheme.gradientTo})`,
            }}
          >
            <Plus className="h-4 w-4" />
            เพิ่มผู้ใช้
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-500">ผู้ใช้ทั้งหมด</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-green-50 rounded-lg">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-500">ใช้งานอยู่</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stats.active}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-red-50 rounded-lg">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-500">ไม่ได้ใช้งาน</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stats.inactive}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-purple-50 rounded-lg">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-500">Admin</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stats.admins}</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="ค้นหาผู้ใช้..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">ทุกบทบาท</option>
                <option value="admin">Admin</option>
                <option value="sales_manager">Sales Manager</option>
                <option value="sales_rep">Sales Rep</option>
                <option value="account_manager">Account Manager</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">ทุกสถานะ</option>
                <option value="active">ใช้งานอยู่</option>
                <option value="inactive">ไม่ได้ใช้งาน</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ผู้ใช้
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  บทบาท
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  แผนก
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  สถานะ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Login ล่าสุด
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  จัดการ
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-10 w-10 rounded-full flex items-center justify-center text-white font-medium"
                        style={{
                          background: `linear-gradient(to bottom right, ${roleTheme.gradientFrom}, ${roleTheme.gradientTo})`,
                        }}
                      >
                        {user.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(user.isActive)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {formatLastLogin(user.lastLogin)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-blue-600 hover:bg-blue-50 h-8 w-8 p-0"
                        onClick={() => onUserClick && onUserClick(user.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-green-600 hover:bg-green-50 h-8 w-8 p-0"
                        onClick={() => openEditModal(user)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:bg-red-50 h-8 w-8 p-0"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="p-12 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-base font-medium text-gray-900 mb-1">
                ไม่พบผู้ใช้
              </h3>
              <p className="text-sm text-gray-500">
                ลองเปลี่ยนคำค้นหาหรือตัวกรองของคุณ
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add User Modal */}
      <AddEditUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddUser}
        mode="add"
      />

      {/* Edit User Modal */}
      <AddEditUserModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingUser(null);
        }}
        onSave={handleEditUser}
        editUser={editingUser}
        mode="edit"
      />
    </div>
  );
}
