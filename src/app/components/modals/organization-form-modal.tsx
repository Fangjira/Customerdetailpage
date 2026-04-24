import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { toast } from "sonner";
import { Building2, X } from "lucide-react";
import { useRoleTheme } from "../../hooks/use-role-theme";

interface OrganizationFormModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: OrganizationFormData) => void;
  organization?: OrganizationFormData | null;
}

export interface OrganizationFormData {
  id?: string;
  companyName: string;
  legalName: string;
  taxId: string;
  registrationNumber: string;
  industry: string;
  companySize: string;
  website: string;
  email: string;
  phone: string;
  fax: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  foundedYear: string;
  fiscalYearStart: string;
  timezone: string;
  currency: string;
  language: string;
  isPrimary: boolean;
  isActive: boolean;
  totalUsers?: number;
  totalDepartments?: number;
  totalBranches?: number;
  createdAt?: string;
}

export function OrganizationFormModal({
  open,
  onClose,
  onSave,
  organization,
}: OrganizationFormModalProps) {
  const { t } = useTranslation();
  const roleTheme = useRoleTheme();
  const [formData, setFormData] = useState<OrganizationFormData>({
    companyName: "",
    legalName: "",
    taxId: "",
    registrationNumber: "",
    industry: "",
    companySize: "",
    website: "",
    email: "",
    phone: "",
    fax: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Thailand",
    foundedYear: "",
    fiscalYearStart: "January 1",
    timezone: "Asia/Bangkok (GMT+7)",
    currency: "THB (฿)",
    language: "Thai, English",
    isPrimary: false,
    isActive: true,
  });

  useEffect(() => {
    if (organization) {
      setFormData(organization);
    } else {
      setFormData({
        companyName: "",
        legalName: "",
        taxId: "",
        registrationNumber: "",
        industry: "",
        companySize: "",
        website: "",
        email: "",
        phone: "",
        fax: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        country: "Thailand",
        foundedYear: "",
        fiscalYearStart: "January 1",
        timezone: "Asia/Bangkok (GMT+7)",
        currency: "THB (฿)",
        language: "Thai, English",
        isPrimary: false,
        isActive: true,
      });
    }
  }, [organization, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.companyName.trim()) {
      toast.error("Please enter company name");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Please enter email");
      return;
    }

    onSave(formData);
    toast.success(
      organization
        ? "Organization updated successfully"
        : "Organization created successfully"
    );
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Building2 className="h-5 w-5" style={{ color: roleTheme.primary }} />
            {organization ? "Edit Organization" : "Create New Organization"}
          </DialogTitle>
        
          <DialogDescription className="sr-only">
            Dialog description
          </DialogDescription></DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Information */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold border-b pb-2">Company Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                  placeholder="e.g., mini CRM Corporation"
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="legalName">Legal Name</Label>
                <Input
                  id="legalName"
                  value={formData.legalName}
                  onChange={(e) =>
                    setFormData({ ...formData, legalName: e.target.value })
                  }
                  placeholder="e.g., mini CRM Corporation Limited"
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxId">Tax ID</Label>
                <Input
                  id="taxId"
                  value={formData.taxId}
                  onChange={(e) =>
                    setFormData({ ...formData, taxId: e.target.value })
                  }
                  placeholder="e.g., 0105558123456"
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="registrationNumber">Registration Number</Label>
                <Input
                  id="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, registrationNumber: e.target.value })
                  }
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  value={formData.industry}
                  onChange={(e) =>
                    setFormData({ ...formData, industry: e.target.value })
                  }
                  placeholder="e.g., Logistics & Supply Chain"
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companySize">Company Size</Label>
                <Input
                  id="companySize"
                  value={formData.companySize}
                  onChange={(e) =>
                    setFormData({ ...formData, companySize: e.target.value })
                  }
                  placeholder="e.g., 200-500 employees"
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="foundedYear">Founded Year</Label>
                <Input
                  id="foundedYear"
                  value={formData.foundedYear}
                  onChange={(e) =>
                    setFormData({ ...formData, foundedYear: e.target.value })
                  }
                  placeholder="e.g., 2010"
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                  placeholder="https://"
                  className="h-10"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold border-b pb-2">Contact Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="info@company.com"
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+66 2 123 4567"
                  className="h-10"
                />
              </div>

              <div className="space-y-2 col-span-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="Full address"
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State/Province</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={(e) =>
                    setFormData({ ...formData, postalCode: e.target.value })
                  }
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                  className="h-10"
                />
              </div>
            </div>
          </div>

          {/* Business Settings */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold border-b pb-2">Business Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fiscalYearStart">Fiscal Year Start</Label>
                <Input
                  id="fiscalYearStart"
                  value={formData.fiscalYearStart}
                  onChange={(e) =>
                    setFormData({ ...formData, fiscalYearStart: e.target.value })
                  }
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Input
                  id="timezone"
                  value={formData.timezone}
                  onChange={(e) =>
                    setFormData({ ...formData, timezone: e.target.value })
                  }
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Input
                  id="currency"
                  value={formData.currency}
                  onChange={(e) =>
                    setFormData({ ...formData, currency: e.target.value })
                  }
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Input
                  id="language"
                  value={formData.language}
                  onChange={(e) =>
                    setFormData({ ...formData, language: e.target.value })
                  }
                  className="h-10"
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isPrimary"
                checked={formData.isPrimary}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isPrimary: checked as boolean })
                }
              />
              <Label htmlFor="isPrimary" className="font-normal cursor-pointer">
                Set as Primary Organization
              </Label>
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
                Active Organization
              </Label>
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
              {organization ? "Update Organization" : "Create Organization"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
