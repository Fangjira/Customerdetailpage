import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import {
  Shield,
  Search,
  Eye,
  Edit,
  Lock,
  CheckCircle2,
  XCircle,
  Plus,
  Settings,
  AlertTriangle,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Checkbox } from "../ui/checkbox";

// Mock data for user access permissions
const mockUserAccess = [
  {
    userId: "1",
    userName: "Sarah Chen",
    role: "Sales Manager",
    primaryBU: "COM",
    accessibleBUs: [
      { buCode: "COM", buName: "Commodity Business", accessLevel: "full" },
      { buCode: "CMO", buName: "Commercial Office", accessLevel: "view" },
      { buCode: "JTS", buName: "JTS", accessLevel: "edit" },
    ],
  },
  {
    userId: "2",
    userName: "Michael Wong",
    role: "Account Executive",
    primaryBU: "CMO",
    accessibleBUs: [
      { buCode: "CMO", buName: "Commercial Office", accessLevel: "full" },
    ],
  },
  {
    userId: "3",
    userName: "Jessica Taylor",
    role: "Sales Representative",
    primaryBU: "COLD",
    accessibleBUs: [
      { buCode: "COLD", buName: "Cold Chain", accessLevel: "full" },
      { buCode: "HEALTH", buName: "Healthcare and Pharmaceutical", accessLevel: "view" },
    ],
  },
  {
    userId: "4",
    userName: "David Kim",
    role: "Business Development",
    primaryBU: "JTS",
    accessibleBUs: [
      { buCode: "JTS", buName: "JTS", accessLevel: "full" },
      { buCode: "ASEAN", buName: "ASEAN Island Countries", accessLevel: "edit" },
    ],
  },
  {
    userId: "5",
    userName: "Lisa Anderson",
    role: "Admin",
    primaryBU: "ALL",
    accessibleBUs: [
      { buCode: "COM", buName: "Commodity Business", accessLevel: "full" },
      { buCode: "CMO", buName: "Commercial Office", accessLevel: "full" },
      { buCode: "JTS", buName: "JTS", accessLevel: "full" },
      { buCode: "ASEAN", buName: "ASEAN Island Countries", accessLevel: "full" },
      { buCode: "AUTO", buName: "Automotive Business", accessLevel: "full" },
      { buCode: "B2B2C", buName: "B2B2C Business", accessLevel: "full" },
      { buCode: "COLD", buName: "Cold Chain", accessLevel: "full" },
      { buCode: "HEALTH", buName: "Healthcare and Pharmaceutical", accessLevel: "full" },
    ],
  },
];

const allBusinessUnits = [
  { code: "COM", name: "Commodity Business" },
  { code: "CMO", name: "Commercial Office" },
  { code: "JTS", name: "JTS" },
  { code: "ASEAN", name: "ASEAN Island Countries" },
  { code: "AUTO", name: "Automotive Business" },
  { code: "B2B2C", name: "B2B2C Business" },
  { code: "COLD", name: "Cold Chain" },
  { code: "HEALTH", name: "Healthcare and Pharmaceutical" },
];

export function DataAccessControlTab() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [isManageAccessDialogOpen, setIsManageAccessDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedBUAccess, setSelectedBUAccess] = useState<Record<string, string>>({});

  const filteredUsers = mockUserAccess.filter(
    (user) =>
      (searchQuery === "" ||
        user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.primaryBU.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedRole === "all" || user.role === selectedRole)
  );

  const getAccessBadge = (level: string) => {
    const badges = {
      full: (
        <Badge className="bg-green-100 text-green-700 border border-green-200">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          {t("admin.full_access")}
        </Badge>
      ),
      edit: (
        <Badge className="bg-blue-100 text-blue-700 border border-blue-200">
          <Edit className="h-3 w-3 mr-1" />
          {t("admin.edit_access")}
        </Badge>
      ),
      view: (
        <Badge className="bg-orange-100 text-orange-700 border border-orange-200">
          <Eye className="h-3 w-3 mr-1" />
          {t("admin.view_only")}
        </Badge>
      ),
      none: (
        <Badge className="bg-gray-100 text-gray-700 border border-gray-200">
          <Lock className="h-3 w-3 mr-1" />
          {t("admin.no_access")}
        </Badge>
      ),
    };
    return badges[level as keyof typeof badges] || badges.none;
  };

  const handleManageAccess = (user: any) => {
    setSelectedUser(user);
    // Initialize selected BU access based on current permissions
    const accessMap: Record<string, string> = {};
    user.accessibleBUs.forEach((bu: any) => {
      accessMap[bu.buCode] = bu.accessLevel;
    });
    setSelectedBUAccess(accessMap);
    setIsManageAccessDialogOpen(true);
  };

  const handleAccessLevelChange = (buCode: string, level: string) => {
    setSelectedBUAccess((prev) => ({
      ...prev,
      [buCode]: level,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <Card className="border-2 border-[#fef3c7] bg-gradient-to-r from-[#fffbeb] to-white">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] rounded-lg">
              <AlertTriangle className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-[#92400e] font-semibold mb-1">
                {t("admin.data_access_info_title")}
              </h3>
              <p className="text-sm text-[#b45309]">
                {t("admin.data_access_info_description")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Card */}
      <Card className="border-2 border-[#ede9fe]">
        <CardHeader className="border-b-2 border-[#ede9fe] bg-gradient-to-r from-[#faf8ff] to-white">
          <CardTitle className="text-[#4c1d95] flex items-center gap-2">
            <Shield className="h-5 w-5 text-[#705add]" />
            {t("admin.customer_data_access_control")}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a78bfa]" />
              <Input
                placeholder={t("admin.search_users_or_bu")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-[#ede9fe] focus:border-[#705add] rounded-xl"
              />
            </div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-[200px] border-[#ede9fe] focus:border-[#705add] rounded-xl">
                <SelectValue placeholder={t("admin.filter_by_role")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("admin.all_roles")}</SelectItem>
                <SelectItem value="Sales Manager">{t("admin.sales_manager")}</SelectItem>
                <SelectItem value="Account Executive">{t("admin.account_executive")}</SelectItem>
                <SelectItem value="Sales Representative">{t("admin.sales_representative")}</SelectItem>
                <SelectItem value="Admin">{t("admin.admin")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* User Access List */}
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <Card
                key={user.userId}
                className="border-2 border-[#ede9fe] hover:shadow-md transition-shadow"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#a78bfa] to-[#705add] flex items-center justify-center text-white font-semibold shadow-md">
                        {user.userName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <h3 className="text-[#4c1d95] font-semibold">
                          {user.userName}
                        </h3>
                        <p className="text-sm text-[#8b5cf6]">{user.role}</p>
                        <p className="text-xs text-[#a78bfa] mt-1">
                          {t("admin.primary_bu")}: {user.primaryBU}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleManageAccess(user)}
                      className="border-[#ede9fe] text-[#705add] hover:bg-[#f5f3ff] rounded-xl"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      {t("admin.manage_access")}
                    </Button>
                  </div>

                  {/* BU Access Summary */}
                  <div className="border-t-2 border-[#ede9fe] pt-4">
                    <p className="text-xs text-[#8b5cf6] mb-3">
                      {t("admin.accessible_business_units")} ({user.accessibleBUs.length})
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {user.accessibleBUs.map((bu) => (
                        <div
                          key={bu.buCode}
                          className="flex items-center justify-between p-3 bg-gradient-to-r from-[#faf8ff] to-white rounded-lg border border-[#ede9fe]"
                        >
                          <div>
                            <p className="text-sm text-[#4c1d95] font-medium">
                              {bu.buCode}
                            </p>
                            <p className="text-xs text-[#a78bfa]">
                              {bu.buName}
                            </p>
                          </div>
                          {getAccessBadge(bu.accessLevel)}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Shield className="h-12 w-12 text-[#c4b5fd] mx-auto mb-3" />
              <p className="text-[#8b5cf6]">
                {t("admin.no_users_found")}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Manage Access Dialog */}
      <Dialog open={isManageAccessDialogOpen} onOpenChange={setIsManageAccessDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#4c1d95] flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#705add]" />
              {t("admin.manage_data_access")}
            </DialogTitle>
            <DialogDescription className="text-[#8b5cf6]">
              {t("admin.manage_access_for")} <span className="font-semibold">{selectedUser?.userName}</span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Primary BU Info */}
            <div className="p-4 bg-gradient-to-r from-[#f5f3ff] to-[#faf8ff] rounded-xl border-2 border-[#ede9fe]">
              <p className="text-xs text-[#8b5cf6] mb-1">
                {t("admin.primary_business_unit")}
              </p>
              <p className="text-sm text-[#4c1d95] font-semibold">
                {selectedUser?.primaryBU}
              </p>
            </div>

            {/* Access Level Legend */}
            <div className="flex gap-2 flex-wrap p-3 bg-white rounded-lg border border-[#ede9fe]">
              <p className="text-xs text-[#8b5cf6] w-full mb-2">
                {t("admin.access_levels")}:
              </p>
              {getAccessBadge("full")}
              {getAccessBadge("edit")}
              {getAccessBadge("view")}
              {getAccessBadge("none")}
            </div>

            {/* BU Access Configuration */}
            <div className="space-y-3">
              <p className="text-sm text-[#4c1d95] font-semibold">
                {t("admin.configure_bu_access")}
              </p>
              <div className="border-2 border-[#ede9fe] rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-[#faf8ff] to-[#f5f3ff]">
                    <tr>
                      <th className="text-left py-3 px-4 text-xs font-medium text-[#8b5cf6]">
                        {t("admin.business_unit")}
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-[#8b5cf6]">
                        {t("admin.access_level")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allBusinessUnits.map((bu) => (
                      <tr
                        key={bu.code}
                        className="border-t border-[#ede9fe] hover:bg-[#faf8ff]/50 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div>
                            <p className="text-sm text-[#4c1d95] font-medium">
                              {bu.code}
                            </p>
                            <p className="text-xs text-[#8b5cf6]">{bu.name}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Select
                            value={selectedBUAccess[bu.code] || "none"}
                            onValueChange={(value) =>
                              handleAccessLevelChange(bu.code, value)
                            }
                          >
                            <SelectTrigger className="w-[180px] border-[#ede9fe] focus:border-[#705add] rounded-lg">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">
                                <span className="flex items-center gap-2">
                                  <Lock className="h-3 w-3" />
                                  {t("admin.no_access")}
                                </span>
                              </SelectItem>
                              <SelectItem value="view">
                                <span className="flex items-center gap-2">
                                  <Eye className="h-3 w-3" />
                                  {t("admin.view_only")}
                                </span>
                              </SelectItem>
                              <SelectItem value="edit">
                                <span className="flex items-center gap-2">
                                  <Edit className="h-3 w-3" />
                                  {t("admin.edit_access")}
                                </span>
                              </SelectItem>
                              <SelectItem value="full">
                                <span className="flex items-center gap-2">
                                  <CheckCircle2 className="h-3 w-3" />
                                  {t("admin.full_access")}
                                </span>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-[#ede9fe]">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsManageAccessDialogOpen(false)}
                className="border-[#ede9fe] text-[#705add] hover:bg-[#f5f3ff] rounded-xl"
              >
                {t("common.cancel")}
              </Button>
              <Button
                type="submit"
                className="bg-[#705add] hover:bg-[#5b21b6] text-white rounded-xl"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                {t("common.save_changes")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
