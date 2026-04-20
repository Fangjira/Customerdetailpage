import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Building2,
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  Edit,
  Trash2,
  Plus,
  Star,
  Check,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useRoleTheme } from "../../hooks/use-role-theme";
import { toast } from "sonner";
import {
  OrganizationFormModal,
  OrganizationFormData,
} from "../modals/organization-form-modal";
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

export function AdminOrganizationScreen() {
  const { t } = useTranslation();
  const roleTheme = useRoleTheme();

  const [organizations, setOrganizations] = useState<OrganizationFormData[]>([
    {
      id: "1",
      companyName: "mini CRM Corporation",
      legalName: "mini CRM Corporation Limited",
      taxId: "0105558123456",
      registrationNumber: "0105558123456",
      industry: "Logistics & Supply Chain",
      companySize: "200-500 employees",
      website: "https://onelink.com",
      email: "info@onelink.com",
      phone: "+66 2 123 4567",
      fax: "+66 2 123 4568",
      address: "123 Business Tower, Sukhumvit Road",
      city: "Bangkok",
      state: "Bangkok",
      postalCode: "10110",
      country: "Thailand",
      foundedYear: "2010",
      fiscalYearStart: "January 1",
      timezone: "Asia/Bangkok (GMT+7)",
      currency: "THB (฿)",
      language: "Thai, English",
      isPrimary: true,
      isActive: true,
      totalUsers: 142,
      totalDepartments: 8,
      totalBranches: 10,
      createdAt: "2024-01-01",
    },
    {
      id: "2",
      companyName: "mini CRM Singapore Pte Ltd",
      legalName: "mini CRM Singapore Private Limited",
      taxId: "202012345A",
      registrationNumber: "202012345A",
      industry: "Logistics & Supply Chain",
      companySize: "50-100 employees",
      website: "https://onelink.sg",
      email: "info@onelink.sg",
      phone: "+65 6123 4567",
      fax: "+65 6123 4568",
      address: "456 Robinson Road, #10-01",
      city: "Singapore",
      state: "Singapore",
      postalCode: "068903",
      country: "Singapore",
      foundedYear: "2015",
      fiscalYearStart: "January 1",
      timezone: "Asia/Singapore (GMT+8)",
      currency: "SGD ($)",
      language: "English, Chinese",
      isPrimary: false,
      isActive: true,
      totalUsers: 45,
      totalDepartments: 3,
      totalBranches: 2,
      createdAt: "2024-02-15",
    },
    {
      id: "3",
      companyName: "mini CRM Malaysia Sdn Bhd",
      legalName: "mini CRM Malaysia Sendirian Berhad",
      taxId: "201801012345",
      registrationNumber: "201801012345",
      industry: "Logistics & Supply Chain",
      companySize: "20-50 employees",
      website: "https://onelink.com.my",
      email: "info@onelink.com.my",
      phone: "+60 3 1234 5678",
      fax: "+60 3 1234 5679",
      address: "789 Jalan Ampang",
      city: "Kuala Lumpur",
      state: "Federal Territory",
      postalCode: "50450",
      country: "Malaysia",
      foundedYear: "2018",
      fiscalYearStart: "January 1",
      timezone: "Asia/Kuala_Lumpur (GMT+8)",
      currency: "MYR (RM)",
      language: "English, Malay",
      isPrimary: false,
      isActive: false,
      totalUsers: 28,
      totalDepartments: 2,
      totalBranches: 3,
      createdAt: "2024-03-10",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrg, setEditingOrg] = useState<OrganizationFormData | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orgToDelete, setOrgToDelete] = useState<string | null>(null);
  const [expandedOrg, setExpandedOrg] = useState<string | null>(null);

  const handleAdd = () => {
    setEditingOrg(null);
    setIsModalOpen(true);
  };

  const handleEdit = (org: OrganizationFormData) => {
    setEditingOrg(org);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    const org = organizations.find((o) => o.id === id);
    if (org?.isPrimary) {
      toast.error("Cannot delete primary organization");
      return;
    }
    setOrgToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (orgToDelete) {
      setOrganizations(organizations.filter((o) => o.id !== orgToDelete));
      toast.success("Organization deleted successfully");
      setDeleteDialogOpen(false);
      setOrgToDelete(null);
    }
  };

  const handleSave = (data: OrganizationFormData) => {
    if (editingOrg) {
      // Update existing
      setOrganizations(
        organizations.map((o) =>
          o.id === editingOrg.id
            ? {
                ...data,
                id: editingOrg.id,
                totalUsers: editingOrg.totalUsers,
                totalDepartments: editingOrg.totalDepartments,
                totalBranches: editingOrg.totalBranches,
                createdAt: editingOrg.createdAt,
              }
            : data.isPrimary
            ? { ...o, isPrimary: false } // Remove primary from others
            : o
        )
      );
    } else {
      // Create new
      const newOrg: OrganizationFormData = {
        ...data,
        id: String(Date.now()),
        totalUsers: 0,
        totalDepartments: 0,
        totalBranches: 0,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setOrganizations(
        data.isPrimary
          ? [...organizations.map((o) => ({ ...o, isPrimary: false })), newOrg]
          : [...organizations, newOrg]
      );
    }
    setIsModalOpen(false);
  };

  const handleSetPrimary = (id: string) => {
    setOrganizations(
      organizations.map((o) => ({
        ...o,
        isPrimary: o.id === id,
      }))
    );
    toast.success("Primary organization updated");
  };

  const totalStats = {
    totalOrgs: organizations.length,
    activeOrgs: organizations.filter((o) => o.isActive).length,
    totalUsers: organizations.reduce((sum, o) => sum + (o.totalUsers || 0), 0),
    totalBranches: organizations.reduce((sum, o) => sum + (o.totalBranches || 0), 0),
  };

  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Building2 className="h-7 w-7" style={{ color: roleTheme.primary }} />
            Organization Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage multiple organizations and their settings
          </p>
        </div>
        <Button
          onClick={handleAdd}
          className="rounded-xl shadow-sm"
          style={{
            background: `linear-gradient(to right, ${roleTheme.gradientFrom}, ${roleTheme.gradientTo})`,
            color: "white",
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Organization
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border border-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Organizations</p>
                <p className="text-2xl font-bold text-foreground">{totalStats.totalOrgs}</p>
              </div>
              <Building2 className="h-8 w-8 text-blue-600 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Active Organizations</p>
                <p className="text-2xl font-bold text-green-600">{totalStats.activeOrgs}</p>
              </div>
              <Check className="h-8 w-8 text-green-600 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold text-foreground">{totalStats.totalUsers}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Branches</p>
                <p className="text-2xl font-bold text-foreground">{totalStats.totalBranches}</p>
              </div>
              <MapPin className="h-8 w-8 text-orange-600 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Organizations List */}
      <div className="space-y-4">
        {organizations.map((org) => (
          <Card
            key={org.id}
            className={`border shadow-sm transition-all ${
              org.isPrimary ? "border-yellow-300 bg-yellow-50/30" : "border-border"
            }`}
          >
            <CardHeader className="border-b border-border bg-secondary/50 pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div
                    className="h-12 w-12 rounded-xl flex items-center justify-center shadow-sm"
                    style={{
                      background: `linear-gradient(to bottom right, ${roleTheme.gradientFrom}, ${roleTheme.gradientTo})`,
                    }}
                  >
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        {org.companyName}
                      </h3>
                      {org.isPrimary && (
                        <Badge className="bg-yellow-500 text-white border-0">
                          <Star className="h-3 w-3 mr-1" />
                          Primary
                        </Badge>
                      )}
                      {org.isActive ? (
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
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{org.legalName}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        {org.country}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {org.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {org.phone}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!org.isPrimary && org.isActive && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleSetPrimary(org.id!)}
                      className="text-yellow-600 hover:bg-yellow-50 h-8"
                    >
                      <Star className="h-4 w-4 mr-1" />
                      Set Primary
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(org)}
                    className="text-blue-600 hover:bg-blue-50 h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  {!org.isPrimary && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(org.id!)}
                      className="text-red-600 hover:bg-red-50 h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                  <p className="text-xl font-bold text-blue-900">{org.totalUsers}</p>
                  <p className="text-xs text-blue-700">Users</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <Building2 className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                  <p className="text-xl font-bold text-purple-900">{org.totalDepartments}</p>
                  <p className="text-xs text-purple-700">Departments</p>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-orange-600 mx-auto mb-1" />
                  <p className="text-xl font-bold text-orange-900">{org.totalBranches}</p>
                  <p className="text-xs text-orange-700">Branches</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-green-600 mx-auto mb-1" />
                  <p className="text-xl font-bold text-green-900">{org.foundedYear}</p>
                  <p className="text-xs text-green-700">Founded</p>
                </div>
              </div>

              {/* Details Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpandedOrg(expandedOrg === org.id ? null : org.id!)}
                className="w-full text-sm"
              >
                {expandedOrg === org.id ? "Hide Details" : "Show Details"}
              </Button>

              {/* Expanded Details */}
              {expandedOrg === org.id && (
                <div className="mt-4 pt-4 border-t space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs">Tax ID</p>
                      <p className="font-medium">{org.taxId}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Industry</p>
                      <p className="font-medium">{org.industry}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Company Size</p>
                      <p className="font-medium">{org.companySize}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Website</p>
                      <a
                        href={org.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {org.website}
                      </a>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground text-xs">Address</p>
                      <p className="font-medium">
                        {org.address}, {org.city}, {org.state} {org.postalCode}, {org.country}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Currency</p>
                      <p className="font-medium">{org.currency}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Timezone</p>
                      <p className="font-medium">{org.timezone}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modals */}
      <OrganizationFormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        organization={editingOrg}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this organization. All associated data will be
              removed. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Organization
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
