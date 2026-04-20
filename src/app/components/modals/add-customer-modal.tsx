import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Combobox, ComboboxOption } from "../ui/combobox";
import { Checkbox } from "../ui/checkbox";
import { X, Building2, MapPin, User, Briefcase, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import {
  INDUSTRIES,
  BUSINESS_GROUPS,
  CUSTOMER_TYPES,
  SALES_CHANNELS,
  SUBSIDIARIES,
} from "../../../config/masterData";

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (customerData: any) => void;
}

const STEPS = [
  { id: 1, title: "Company Info", icon: Building2, description: "Basic company details" },
  { id: 2, title: "Business Details", icon: Briefcase, description: "Industry & classification" },
  { id: 3, title: "Location", icon: MapPin, description: "Business address" },
  { id: 4, title: "Contact Person", icon: User, description: "Primary contact" },
  { id: 5, title: "Review", icon: CheckCircle2, description: "Confirm details" },
];

export function AddCustomerModal({ isOpen, onClose, onSave }: AddCustomerModalProps) {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    // Step 1: Company Info
    companyName: "",
    salesChannel: "",
    website: "",
    taxId: "",
    
    // Step 2: Business Details
    industry: "",
    productGroup: "",
    customerType: "",
    customerSize: "Medium",
    registeredYear: new Date().getFullYear().toString(),
    potentialGroup: "",
    ovBusiness: "",
    supplyChain: {
      importer: false,
      exporter: false,
      manufacturer: false,
      distributor: false,
      wholesaler: false,
      freightForwarder: false,
    },
    
    // Step 3: Location
    businessProvince: "",
    businessDistrict: "",
    businessPostalCode: "",
    billingAddress: "",
    
    // Step 4: Contact Person
    customerName: "",
    customerNickname: "",
    customerPosition: "",
    customerTel: "",
    customerEmail: "",
    
    // Additional
    salesAccountOwner: "",
    subsidiary: "",
    notes: "",
  });

  const currentUser = "Current User";

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setFormData(prev => ({
        ...prev,
        registeredYear: new Date().getFullYear().toString(),
        salesAccountOwner: currentUser,
      }));
    }
  }, [isOpen]);

  const handleSubmit = () => {
    const customerId = `C-${Date.now().toString().slice(-4)}`;
    
    const customerData = {
      id: customerId,
      ...formData,
      status: "active" as const,
      createdBy: currentUser,
      createdAt: new Date().toISOString(),
    };

    onSave(customerData);
    handleClose();
  };

  const handleClose = () => {
    setCurrentStep(1);
    setFormData({
      companyName: "",
      salesChannel: "",
      website: "",
      taxId: "",
      industry: "",
      productGroup: "",
      customerType: "",
      customerSize: "Medium",
      registeredYear: new Date().getFullYear().toString(),
      potentialGroup: "",
      ovBusiness: "",
      supplyChain: {
        importer: false,
        exporter: false,
        manufacturer: false,
        distributor: false,
        wholesaler: false,
        freightForwarder: false,
      },
      businessProvince: "",
      businessDistrict: "",
      businessPostalCode: "",
      billingAddress: "",
      customerName: "",
      customerNickname: "",
      customerPosition: "",
      customerTel: "",
      customerEmail: "",
      salesAccountOwner: "",
      subsidiary: "",
      notes: "",
    });
    onClose();
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateSupplyChain = (field: keyof typeof formData.supplyChain, value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      supplyChain: {
        ...prev.supplyChain,
        [field]: value,
      },
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.companyName && formData.salesChannel);
      case 2:
        return !!(formData.industry && formData.customerType);
      case 3:
        return true; // Optional fields
      case 4:
        return !!(formData.customerName && formData.customerPosition && formData.customerEmail);
      default:
        return true;
    }
  };

  const getRequiredFieldsMessage = (step: number): string | null => {
    const missingFields: string[] = [];
    
    switch (step) {
      case 1:
        if (!formData.companyName) missingFields.push(t("customers.company_name"));
        if (!formData.salesChannel) missingFields.push(t("masterData.salesChannel"));
        break;
      case 2:
        if (!formData.industry) missingFields.push(t("masterData.selectIndustry"));
        if (!formData.customerType) missingFields.push(t("customers.customer_type"));
        break;
      case 4:
        if (!formData.customerName) missingFields.push(t("customers.customer_name_surname"));
        if (!formData.customerPosition) missingFields.push(t("customers.customer_position"));
        if (!formData.customerEmail) missingFields.push(t("customers.customer_email"));
        break;
    }
    
    if (missingFields.length > 0) {
      return `${t("validation.please_fill")}: ${missingFields.join(", ")}`;
    }
    return null;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 py-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Company Information</h3>
              <p className="text-sm text-muted-foreground">Tell us about the company</p>
            </div>

            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-sm font-medium flex items-center gap-2">
                  {t("customers.company_name")} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => updateField("companyName", e.target.value)}
                  placeholder={t("customers.enter_company_name")}
                  className="h-11"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salesChannel" className="text-sm font-medium flex items-center gap-2">
                    {t("masterData.salesChannel")} <span className="text-red-500">*</span>
                  </Label>
                  <Combobox
                    options={SALES_CHANNELS.map((channel) => ({ value: channel.value, label: t(channel.labelKey) }))}
                    value={formData.salesChannel}
                    onValueChange={(value) => updateField("salesChannel", value)}
                    placeholder={t("masterData.selectSalesChannel")}
                    searchPlaceholder="ค้นหาช่องทางการขาย..."
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxId" className="text-sm font-medium">
                    {t("customers.tax_id")}
                  </Label>
                  <Input
                    id="taxId"
                    value={formData.taxId}
                    onChange={(e) => updateField("taxId", e.target.value)}
                    placeholder={t("customers.enter_tax_id")}
                    className="h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website" className="text-sm font-medium">
                  {t("customers.website")}
                </Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => updateField("website", e.target.value)}
                  placeholder="https://example.com"
                  className="h-11"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 py-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Briefcase className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Business Details</h3>
              <p className="text-sm text-muted-foreground">Industry and business classification</p>
            </div>

            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-sm font-medium flex items-center gap-2">
                    {t("masterData.selectIndustry")} <span className="text-red-500">*</span>
                  </Label>
                  <Combobox
                    options={INDUSTRIES.map((industry) => ({ value: industry.value, label: t(industry.labelKey) }))}
                    value={formData.industry}
                    onValueChange={(value) => updateField("industry", value)}
                    placeholder={t("masterData.selectIndustry")}
                    searchPlaceholder="ค้นหาอุตสาหกรรม..."
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customerType" className="text-sm font-medium flex items-center gap-2">
                    {t("customers.customer_type")} <span className="text-red-500">*</span>
                  </Label>
                  <Combobox
                    options={CUSTOMER_TYPES.map((type) => ({ value: type.value, label: t(type.labelKey) }))}
                    value={formData.customerType}
                    onValueChange={(value) => updateField("customerType", value)}
                    placeholder={t("customers.select_customer_type")}
                    searchPlaceholder="ค้นหาประเภทลูกค้า..."
                    className="h-11"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="productGroup" className="text-sm font-medium">
                    {t("customers.product_group")}
                  </Label>
                  <Combobox
                    options={BUSINESS_GROUPS.map((group) => ({ value: group.value, label: t(group.labelKey) }))}
                    value={formData.productGroup}
                    onValueChange={(value) => updateField("productGroup", value)}
                    placeholder={t("customers.select_product_group")}
                    searchPlaceholder="ค้นหากลุ่มผลิตภัณฑ์..."
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customerSize" className="text-sm font-medium">
                    {t("customers.customer_size")}
                  </Label>
                  <Combobox
                    options={[
                      { value: "Small", label: "Small (1-50 employees)" },
                      { value: "Medium", label: "Medium (51-500 employees)" },
                      { value: "Large", label: "Large (500+ employees)" },
                    ]}
                    value={formData.customerSize}
                    onValueChange={(value) => updateField("customerSize", value)}
                    placeholder="เลือกขนาดลูกค้า..."
                    searchPlaceholder="ค้นหาขนาดลูกค้า..."
                    className="h-11"
                  />
                </div>
              </div>

              <div className="space-y-3 p-4 bg-secondary/30 rounded-lg">
                <Label className="text-sm font-medium">{t("customers.supply_chain")}</Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: 'importer', label: 'Importer' },
                    { key: 'exporter', label: 'Exporter' },
                    { key: 'manufacturer', label: 'Manufacturer' },
                    { key: 'distributor', label: 'Distributor' },
                    { key: 'wholesaler', label: 'Wholesaler / Retailer' },
                    { key: 'freightForwarder', label: 'Freight Forwarder' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={item.key}
                        checked={formData.supplyChain[item.key as keyof typeof formData.supplyChain]}
                        onCheckedChange={(checked) => 
                          updateSupplyChain(item.key as keyof typeof formData.supplyChain, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={item.key}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="potentialGroup" className="text-sm font-medium">
                    {t("customers.potential_group")}
                  </Label>
                  <Input
                    id="potentialGroup"
                    value={formData.potentialGroup}
                    onChange={(e) => updateField("potentialGroup", e.target.value)}
                    placeholder={t("customers.enter_potential_group")}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ovBusiness" className="text-sm font-medium">
                    {t("customers.ov_business")}
                  </Label>
                  <Input
                    id="ovBusiness"
                    value={formData.ovBusiness}
                    onChange={(e) => updateField("ovBusiness", e.target.value)}
                    placeholder={t("customers.enter_ov_business")}
                    className="h-11"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 py-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Business Location</h3>
              <p className="text-sm text-muted-foreground">Where is the business located?</p>
            </div>

            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessProvince" className="text-sm font-medium">
                    {t("customers.business_province")}
                  </Label>
                  <Input
                    id="businessProvince"
                    value={formData.businessProvince}
                    onChange={(e) => updateField("businessProvince", e.target.value)}
                    placeholder={t("customers.enter_province")}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessDistrict" className="text-sm font-medium">
                    {t("customers.business_district")}
                  </Label>
                  <Input
                    id="businessDistrict"
                    value={formData.businessDistrict}
                    onChange={(e) => updateField("businessDistrict", e.target.value)}
                    placeholder={t("customers.enter_district")}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessPostalCode" className="text-sm font-medium">
                    {t("customers.postal_code")}
                  </Label>
                  <Input
                    id="businessPostalCode"
                    value={formData.businessPostalCode}
                    onChange={(e) => updateField("businessPostalCode", e.target.value)}
                    placeholder={t("customers.enter_postal_code")}
                    className="h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="billingAddress" className="text-sm font-medium">
                  {t("customers.billing_address")}
                </Label>
                <Textarea
                  id="billingAddress"
                  value={formData.billingAddress}
                  onChange={(e) => updateField("billingAddress", e.target.value)}
                  placeholder={t("customers.enter_billing_address")}
                  rows={3}
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subsidiary" className="text-sm font-medium">
                  {t("masterData.selectSubsidiary")}
                </Label>
                <Combobox
                  options={SUBSIDIARIES.map((subsidiary) => ({ value: subsidiary.value, label: t(subsidiary.labelKey) }))}
                  value={formData.subsidiary}
                  onValueChange={(value) => updateField("subsidiary", value)}
                  placeholder={t("masterData.selectSubsidiary")}
                  searchPlaceholder="ค้นหาบริษัทในเครือ..."
                  className="h-11"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 py-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <User className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Primary Contact</h3>
              <p className="text-sm text-muted-foreground">Who should we contact?</p>
            </div>

            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName" className="text-sm font-medium flex items-center gap-2">
                    {t("customers.customer_name_surname")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => updateField("customerName", e.target.value)}
                    placeholder={t("customers.enter_customer_name")}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customerNickname" className="text-sm font-medium">
                    {t("customers.customer_nickname")}
                  </Label>
                  <Input
                    id="customerNickname"
                    value={formData.customerNickname}
                    onChange={(e) => updateField("customerNickname", e.target.value)}
                    placeholder={t("customers.enter_nickname")}
                    className="h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerPosition" className="text-sm font-medium flex items-center gap-2">
                  {t("customers.customer_position")} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="customerPosition"
                  value={formData.customerPosition}
                  onChange={(e) => updateField("customerPosition", e.target.value)}
                  placeholder={t("customers.enter_position")}
                  className="h-11"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerEmail" className="text-sm font-medium flex items-center gap-2">
                    {t("customers.customer_email")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) => updateField("customerEmail", e.target.value)}
                    placeholder={t("leads.enter_email")}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customerTel" className="text-sm font-medium">
                    {t("customers.customer_tel")}
                  </Label>
                  <Input
                    id="customerTel"
                    type="tel"
                    value={formData.customerTel}
                    onChange={(e) => updateField("customerTel", e.target.value)}
                    placeholder="+66-XX-XXX-XXXX"
                    className="h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-medium">
                  {t("common.notes")}
                </Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => updateField("notes", e.target.value)}
                  placeholder={t("leads.enter_notes")}
                  rows={3}
                  className="resize-none"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 py-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Review & Confirm</h3>
              <p className="text-sm text-muted-foreground">Please review all information before submitting</p>
            </div>

            <div className="space-y-4 max-w-2xl mx-auto">
              {/* Company Info */}
              <div className="p-4 bg-secondary/30 rounded-lg space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-foreground">Company Information</h4>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Company:</span>
                    <p className="font-medium text-foreground">{formData.companyName || "-"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Sales Channel:</span>
                    <p className="font-medium text-foreground">{formData.salesChannel || "-"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Tax ID:</span>
                    <p className="font-medium text-foreground">{formData.taxId || "-"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Website:</span>
                    <p className="font-medium text-foreground">{formData.website || "-"}</p>
                  </div>
                </div>
              </div>

              {/* Business Details */}
              <div className="p-4 bg-secondary/30 rounded-lg space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-foreground">Business Details</h4>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Industry:</span>
                    <p className="font-medium text-foreground">{formData.industry || "-"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Customer Type:</span>
                    <p className="font-medium text-foreground">{formData.customerType || "-"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Customer Size:</span>
                    <p className="font-medium text-foreground">{formData.customerSize || "-"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{t("customers.product_group")}:</span>
                    <p className="font-medium text-foreground">{formData.productGroup || "-"}</p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="p-4 bg-secondary/30 rounded-lg space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-foreground">Location</h4>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Address:</span>
                  <p className="font-medium text-foreground">
                    {formData.businessProvince && formData.businessDistrict
                      ? `${formData.businessDistrict}, ${formData.businessProvince} ${formData.businessPostalCode}`
                      : "-"}
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="p-4 bg-secondary/30 rounded-lg space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-foreground">Primary Contact</h4>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Name:</span>
                    <p className="font-medium text-foreground">{formData.customerName || "-"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Position:</span>
                    <p className="font-medium text-foreground">{formData.customerPosition || "-"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email:</span>
                    <p className="font-medium text-foreground">{formData.customerEmail || "-"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Phone:</span>
                    <p className="font-medium text-foreground">{formData.customerTel || "-"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-white p-0">
        {/* Header */}
        <DialogHeader className="border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl text-foreground font-semibold">
                {t("customers.add_customer")}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">
                Step {currentStep} of {STEPS.length}
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Progress Stepper */}
        <div className="px-6 py-4 border-b border-border bg-secondary/20">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : isActive
                          ? "bg-primary text-white"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <StepIcon className="w-5 h-5" />
                      )}
                    </div>
                    <div className="text-center mt-2">
                      <p
                        className={`text-xs font-medium ${
                          isActive ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {step.title}
                      </p>
                    </div>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div
                      className={`h-[2px] flex-1 mx-2 transition-all ${
                        isCompleted ? "bg-green-500" : "bg-border"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-280px)] px-6">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <DialogFooter className="border-t border-border px-6 py-4">
          <div className="flex flex-col w-full gap-3">
            {/* Validation Message */}
            {!validateStep(currentStep) && currentStep < STEPS.length && (
              <div className="text-sm text-red-600 text-center bg-red-50 py-2 px-4 rounded-lg border border-red-200">
                {getRequiredFieldsMessage(currentStep)}
              </div>
            )}
            
            <div className="flex justify-between w-full">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="rounded-lg border-gray-300 disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                ก่อนหน้า
              </Button>
              
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="rounded-lg border-gray-300"
                >
                  ยกเลิก
                </Button>
                
                {currentStep < STEPS.length ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={!validateStep(currentStep)}
                    className="bg-black hover:bg-black/90 text-white rounded-lg disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                  >
                    ถัดไป
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-green-600 hover:bg-green-700 text-white rounded-lg"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    {t("customers.create_customer")}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}