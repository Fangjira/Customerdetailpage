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
import { Switch } from "../ui/switch";
import { X, Target, Building2, MapPin, User, Briefcase, CheckCircle2, ChevronRight, ChevronLeft, Users } from "lucide-react";
import {
  INDUSTRIES,
  BUSINESS_GROUPS,
  LEAD_TYPES,
  LEAD_SOURCES,
  SALES_CHANNELS,
  CUSTOMER_TYPES,
  BUSINESS_TYPES,
  SUBSIDIARIES,
} from "../../../config/masterData";

interface AddLeadCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  mode?: "lead" | "customer";
  initialData?: any;
}

const STEPS = [
  { id: 1, title: "Basic Info", icon: Target, description: "Basic information" },
  { id: 2, title: "Business Details", icon: Briefcase, description: "Industry & classification" },
  { id: 3, title: "Location", icon: MapPin, description: "Business address" },
  { id: 4, title: "Contact Person", icon: User, description: "Primary contact" },
  { id: 5, title: "Review", icon: CheckCircle2, description: "Confirm details" },
];

export function AddLeadCustomerModal({ 
  isOpen, 
  onClose, 
  onSave,
  mode: initialMode = "lead",
  initialData = null
}: AddLeadCustomerModalProps) {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isCustomer, setIsCustomer] = useState(initialMode === "customer");

  const [formData, setFormData] = useState({
    // Basic Info
    leadType: "",
    leadFrom: "",
    companyName: "",
    salesChannel: "",
    website: "",
    taxId: "",
    estimatedValue: "",
    priority: "Medium",
    
    // Business Details
    industry: "",
    businessType: "",
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
    
    // Location
    businessProvince: "",
    businessDistrict: "",
    businessPostalCode: "",
    billingAddress: "",
    subsidiary: "",
    
    // Contact Person
    customerName: "",
    customerNickname: "",
    customerPosition: "",
    customerTel: "",
    customerEmail: "",
    
    // Additional
    salesAccountOwner: "",
    notes: "",
  });

  const currentUser = "Current User";

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setIsCustomer(initialMode === "customer");
      
      if (initialData) {
        // Pre-fill form with initial data (for convert)
        setFormData({
          ...formData,
          ...initialData,
          registeredYear: new Date().getFullYear().toString(),
          salesAccountOwner: currentUser,
        });
      } else {
        setFormData(prev => ({
          ...prev,
          leadType: "",
          leadFrom: "",
          companyName: "",
          salesChannel: "",
          website: "",
          taxId: "",
          estimatedValue: "",
          priority: "Medium",
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
          businessType: "",
          businessProvince: "",
          businessDistrict: "",
          businessPostalCode: "",
          billingAddress: "",
          subsidiary: "",
          customerName: "",
          customerNickname: "",
          customerPosition: "",
          customerTel: "",
          customerEmail: "",
          salesAccountOwner: currentUser,
          notes: "",
        }));
      }
    }
  }, [isOpen, initialMode, initialData]);

  const handleSubmit = () => {
    const data = {
      ...formData,
      type: isCustomer ? "customer" : "lead",
      status: isCustomer ? "active" : "lead",
      stage: isCustomer ? undefined : formData.stage || "lead",
      createdBy: currentUser,
      createdAt: new Date().toISOString(),
    };

    if (isCustomer) {
      data.id = `C-${Date.now().toString().slice(-4)}`;
    }

    onSave(data);
    handleClose();
  };

  const handleClose = () => {
    setCurrentStep(1);
    setIsCustomer(initialMode === "customer");
    setFormData({
      leadType: "",
      leadFrom: "",
      companyName: "",
      salesChannel: "",
      website: "",
      taxId: "",
      estimatedValue: "",
      priority: "Medium",
      industry: "",
      businessType: "",
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
      subsidiary: "",
      customerName: "",
      customerNickname: "",
      customerPosition: "",
      customerTel: "",
      customerEmail: "",
      salesAccountOwner: "",
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
        if (isCustomer) {
          return !!(formData.companyName && formData.salesChannel);
        } else {
          return !!(formData.leadType && formData.leadFrom && formData.companyName && formData.salesChannel);
        }
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
          <div className="space-y-4 py-4">
            <div className="text-center mb-4">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${
                isCustomer ? "bg-green-100" : "bg-primary/10"
              }`}>
                {isCustomer ? (
                  <Users className="w-6 h-6 text-green-600" />
                ) : (
                  <Target className="w-6 h-6 text-primary" />
                )}
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1">
                {isCustomer ? "Company Information" : "Lead Information"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {isCustomer 
                  ? "Tell us about the company" 
                  : "Tell us about this potential customer"}
              </p>
            </div>

            <div className="space-y-3 max-w-2xl mx-auto">
              {/* Type Toggle */}
              {!initialData && (
                <div className="flex items-center justify-center gap-4 p-4 bg-secondary/30 rounded-lg">
                  <Label htmlFor="type-toggle" className={`text-sm font-medium ${!isCustomer ? 'text-primary' : 'text-muted-foreground'}`}>
                    Lead
                  </Label>
                  <Switch
                    id="type-toggle"
                    checked={isCustomer}
                    onCheckedChange={setIsCustomer}
                  />
                  <Label htmlFor="type-toggle" className={`text-sm font-medium ${isCustomer ? 'text-green-600' : 'text-muted-foreground'}`}>
                    Customer
                  </Label>
                </div>
              )}

              {/* Lead Type & Source (Only for Leads) */}
              {!isCustomer && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="leadType" className="text-sm font-medium flex items-center gap-2">
                      {t("leads.lead_type")} <span className="text-red-500">*</span>
                    </Label>
                    <Combobox
                      options={LEAD_TYPES.map((type) => ({ value: type.value, label: t(type.labelKey) }))}
                      value={formData.leadType}
                      onValueChange={(value) => updateField("leadType", value)}
                      placeholder={t("leads.select_lead_type")}
                      searchPlaceholder="ค้นหาประเภทลีด..."
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="leadFrom" className="text-sm font-medium flex items-center gap-2">
                      {t("leads.lead_from")} <span className="text-red-500">*</span>
                    </Label>
                    <Combobox
                      options={LEAD_SOURCES.map((source) => ({ value: source.value, label: t(source.labelKey) }))}
                      value={formData.leadFrom}
                      onValueChange={(value) => updateField("leadFrom", value)}
                      placeholder={t("leads.select_source")}
                      searchPlaceholder="ค้นหาแหล่งที่มา..."
                      className="h-11"
                    />
                  </div>
                </div>
              )}

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

              {/* Estimated Value & Priority (Only for Leads) */}
              {!isCustomer && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="estimatedValue" className="text-sm font-medium">
                      {t("leads.estimated_value")}
                    </Label>
                    <Input
                      id="estimatedValue"
                      value={formData.estimatedValue}
                      onChange={(e) => updateField("estimatedValue", e.target.value)}
                      placeholder="$0"
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority" className="text-sm font-medium">
                      {t("leads.priority")}
                    </Label>
                    <Combobox
                      options={[
                        { value: "High", label: `🔴 ${t("priority.high")}` },
                        { value: "Medium", label: `🟡 ${t("priority.medium")}` },
                        { value: "Low", label: `🔵 ${t("priority.low")}` },
                      ]}
                      value={formData.priority}
                      onValueChange={(value) => updateField("priority", value)}
                      placeholder="เลือกความสำคัญ..."
                      searchPlaceholder="ค้นหาระดับความสำคัญ..."
                      className="h-11"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4 py-4">
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1">Business Details</h3>
              <p className="text-xs text-muted-foreground">Industry and business classification</p>
            </div>

            <div className="space-y-4 max-w-2xl mx-auto">
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
                  <Label htmlFor="businessType" className="text-sm font-medium flex items-center gap-2">
                    {t("masterData.businessType")}
                  </Label>
                  <Combobox
                    options={BUSINESS_TYPES.map((type) => ({ value: type.value, label: t(type.labelKey) }))}
                    value={formData.businessType}
                    onValueChange={(value) => updateField("businessType", value)}
                    placeholder={t("masterData.selectBusinessType")}
                    searchPlaceholder="ค้นหาประเภทธุรกิจ..."
                    className="h-11"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
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
          <div className="space-y-4 py-4">
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1">Business Location</h3>
              <p className="text-xs text-muted-foreground">Where is the business located?</p>
            </div>

            <div className="space-y-3 max-w-2xl mx-auto">
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

              {isCustomer && (
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
              )}

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
          <div className="space-y-4 py-4">
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                <User className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1">Primary Contact</h3>
              <p className="text-xs text-muted-foreground">Who should we contact?</p>
            </div>

            <div className="space-y-3 max-w-2xl mx-auto">
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
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                isCustomer ? "bg-green-100" : "bg-blue-100"
              }`}>
                <CheckCircle2 className={`w-8 h-8 ${isCustomer ? "text-green-600" : "text-blue-600"}`} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Review & Confirm</h3>
              <p className="text-sm text-muted-foreground">
                Creating as: <span className={`font-semibold ${isCustomer ? "text-green-600" : "text-primary"}`}>
                  {isCustomer ? "Customer" : "Lead"}
                </span>
              </p>
            </div>

            <div className="space-y-4 max-w-2xl mx-auto">
              {/* Basic Info */}
              <div className="p-4 bg-secondary/30 rounded-lg space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  {isCustomer ? (
                    <Building2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <Target className="w-5 h-5 text-primary" />
                  )}
                  <h4 className="font-semibold text-foreground">
                    {isCustomer ? "Company Information" : "Lead Information"}
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Company:</span>
                    <p className="font-medium text-foreground">{formData.companyName || "-"}</p>
                  </div>
                  {!isCustomer && (
                    <>
                      <div>
                        <span className="text-muted-foreground">Lead Type:</span>
                        <p className="font-medium text-foreground">
                          {formData.leadType ? t(LEAD_TYPES.find(lt => lt.value === formData.leadType)?.labelKey || "") : "-"}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Lead From:</span>
                        <p className="font-medium text-foreground">
                          {formData.leadFrom ? t(LEAD_SOURCES.find(ls => ls.value === formData.leadFrom)?.labelKey || "") : "-"}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Priority:</span>
                        <p className="font-medium text-foreground">{formData.priority || "-"}</p>
                      </div>
                    </>
                  )}
                  <div>
                    <span className="text-muted-foreground">Sales Channel:</span>
                    <p className="font-medium text-foreground">{formData.salesChannel || "-"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Tax ID:</span>
                    <p className="font-medium text-foreground">{formData.taxId || "-"}</p>
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
                    <span className="text-muted-foreground">{t("masterData.businessType")}:</span>
                    <p className="font-medium text-foreground">{formData.businessType || "-"}</p>
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
      <DialogContent className="max-w-3xl max-h-[85vh] bg-white p-0">
        {/* Header */}
        <DialogHeader className="border-b border-border px-5 py-3">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-lg text-foreground font-semibold">
                {initialData 
                  ? `Convert to Customer`
                  : isCustomer 
                    ? t("customers.add_customer") 
                    : t("leads.add_lead")}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                Step {currentStep} of {STEPS.length}
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-7 w-7 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Progress Stepper */}
        <div className="px-5 py-3 border-b border-border bg-secondary/20">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isCompleted
                          ? isCustomer ? "bg-green-500 text-white" : "bg-green-500 text-white"
                          : isActive
                          ? isCustomer ? "bg-green-600 text-white" : "bg-primary text-white"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <StepIcon className="w-4 h-4" />
                      )}
                    </div>
                    <div className="text-center mt-1.5">
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
        <div className="overflow-y-auto max-h-[calc(85vh-200px)] px-5">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <DialogFooter className="border-t border-border px-5 py-3">
          <div className="flex flex-col w-full gap-2">
            {/* Validation Message */}
            {!validateStep(currentStep) && currentStep < STEPS.length && (
              <div className="text-xs text-red-500 text-center">
                {currentStep === 1 && (
                  <span>
                    {isCustomer 
                      ? "กรุณากรอก: ชื่อบริษัท และ ช่องทางการขาย" 
                      : "กรุณากรอก: ประเภท Lead, แหล่งที่มา, ชื่อบริษัท และ ช่องทางการขาย"}
                  </span>
                )}
                {currentStep === 2 && (
                  <span>กรุณากรอก: อุตสาหกรรม และ ประเภทลูกค้า</span>
                )}
                {currentStep === 4 && (
                  <span>กรุณากรอก: ชื่อผู้ติดต่อ, ตำแหน่ง และ อีเมล</span>
                )}
              </div>
            )}
            
            <div className="flex justify-between w-full">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="rounded-lg h-9 border-gray-300"
              >
                <ChevronLeft className="w-4 h-4 mr-1.5" />
                ก่อนหน้า
              </Button>
              
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="rounded-lg h-9 border-gray-300"
                >
                  ยกเลิก
                </Button>
                
                {currentStep < STEPS.length ? (
                  <Button
                    onClick={handleNext}
                    disabled={!validateStep(currentStep)}
                    className="rounded-lg h-9 bg-black hover:bg-black/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ถัดไป
                    <ChevronRight className="w-4 h-4 ml-1.5" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className={`rounded-lg h-9 text-white ${ 
                      isCustomer 
                        ? "bg-green-600 hover:bg-green-700" 
                        : "bg-black hover:bg-black/90"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-1.5" />
                    {initialData 
                      ? "Convert to Customer"
                      : isCustomer 
                        ? t("customers.create_customer") 
                        : t("leads.create_lead")}
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