import { useRole, UserRole } from "../contexts/role-context";
import { Combobox } from "./ui/combobox";
import { Badge } from "./ui/badge";
import { useTranslation } from "react-i18next";
import { UserCircle, ShieldCheck, Users } from "lucide-react";

export function RoleSwitcher() {
  const { role, setRole } = useRole();
  const { t } = useTranslation();

  console.log('[RoleSwitcher] Current role:', role);

  const handleRoleChange = (value: string) => {
    console.log('[RoleSwitcher] Changing role to:', value);
    setRole(value as UserRole);
  };

  const getRoleIcon = (roleValue: UserRole) => {
    switch (roleValue) {
      case "Admin":
        return <ShieldCheck className="h-4 w-4 text-red-600" />;
      case "Sales Manager":
        return <Users className="h-4 w-4 text-blue-600" />;
      case "Sales Support":
        return <UserCircle className="h-4 w-4 text-green-600" />;
    }
  };

  const getRoleColor = (roleValue: UserRole) => {
    switch (roleValue) {
      case "Admin":
        return "bg-red-100 text-red-700 border-red-200";
      case "Sales Manager":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Sales Support":
        return "bg-green-100 text-green-700 border-green-200";
    }
  };

  const getRoleLabel = (roleValue: UserRole) => {
    switch (roleValue) {
      case "Admin":
        return "Admin";
      case "Sales Manager":
        return "Sales Manager";
      case "Sales Support":
        return "Sales Support";
    }
  };

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-1.5 w-[110px] sm:w-[140px] lg:w-[180px]">
        {getRoleIcon(role)}
        <Combobox
          options={[
            { value: "Admin", label: "Admin" },
            { value: "Sales Manager", label: "Sales Manager" },
            { value: "Sales Support", label: "Sales Support" },
          ]}
          value={role}
          onValueChange={handleRoleChange}
          placeholder="Select role..."
          searchPlaceholder="ค้นหา..."
          className="h-9 border-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all flex-1"
        />
      </div>
    </div>
  );
}