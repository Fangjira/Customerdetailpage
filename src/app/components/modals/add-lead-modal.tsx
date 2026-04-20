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
import { X, Target, Building2, MapPin, User, Briefcase, CheckCircle2, ChevronRight, ChevronLeft, AlertCircle } from "lucide-react";
import {
  INDUSTRIES,
  BUSINESS_GROUPS,
  LEAD_TYPES,
  LEAD_SOURCES,
  SALES_CHANNELS,
  CUSTOMER_TYPES,
  SUBSIDIARIES,
} from "../../../config/masterData";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (leadData: any) => void;
}

const STEPS = [
  { id: 1, title: "Lead Info", icon: Target, description: "Basic lead details" },
  { id: 2, title: "Business Details", icon: Briefcase, description: "Industry & classification" },
  { id: 3, title: "Location", icon: MapPin, description: "Business address" },
  { id: 4, title: "Contact Person", icon: User, description: "Primary contact" },
  { id: 5, title: "Review", icon: CheckCircle2, description: "Confirm details" },
];

export function AddLeadModal({ isOpen, onClose, onSave }: AddLeadModalProps) {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    // Step 1: Lead Info
    leadType: "",
    leadFrom: "",
    companyName: "",
    salesChannel: "",
    
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
    
    // Step 4: Contact Person
    customerName: "",
    customerNickname: "",
    customerPosition: "",
    customerTel: "",
    customerEmail: "",
    
    // Additional
    salesAccountOwner: "",
    estimatedValue: "",
    stage: "lead",
    priority: "Medium",
    subsidiary: "",
    notes: "",
  });

  const currentUser = "Current User";

  // Mock data for existing leads in system (for duplicate detection)
  const existingLeadsInSystem = [
    {
      id: "LEAD-001",
      companyName: "Global Traders Ltd.",
      contactName: "สมชาย วงศ์สกุล",
      email: "somchai@globaltraders.com",
      businessUnit: "hcp",
      status: "New",
      assignedTo: "Sarah Chen",
      createdDate: "2025-03-05",
    },
    {
      id: "LEAD-045",
      companyName: "Global Traders Ltd.",
      contactName: "สมชาย วงศ์สกุล",
      email: "somchai@globaltraders.com",
      businessUnit: "freight-business",
      status: "Contacted",
      assignedTo: "Michael Wong",
      createdDate: "2025-02-28",
    },
    {
      id: "LEAD-002",
      companyName: "FreshFood Partners",
      contactName: "สมหญิง ใจดี",
      email: "somying@freshfood.co.th",
      businessUnit: "cold-chain",
      status: "Qualified",
      assignedTo: "Emily Rodriguez",
      createdDate: "2025-03-08",
    },
  ];

  // Find duplicate leads
  const duplicateLeads = existingLeadsInSystem.filter((lead) => {
    if (!formData.companyName && !formData.customerName && !formData.customerEmail) {
      return false;
    }

    // Check if matches by company name, contact name, or email
    const matchesCompany = lead.companyName && formData.companyName &&
      (lead.companyName.toLowerCase().includes(formData.companyName.toLowerCase()) ||
       formData.companyName.toLowerCase().includes(lead.companyName.toLowerCase()));
    
    const matchesContact = lead.contactName && formData.customerName &&
      (lead.contactName.toLowerCase().includes(formData.customerName.toLowerCase()) ||
       formData.customerName.toLowerCase().includes(lead.contactName.toLowerCase()));
    
    const matchesEmail = lead.email && formData.customerEmail &&
      lead.email.toLowerCase() === formData.customerEmail.toLowerCase();
    
    return matchesCompany || matchesContact || matchesEmail;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Contacted":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "Qualified":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

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
    onSave({
      ...formData,
      createdBy: currentUser,
      createdAt: new Date().toISOString(),
    });
    handleClose();
  };

  const handleClose = () => {
    setCurrentStep(1);
    setFormData({
      leadType: "",
      leadFrom: "",
      companyName: "",
      salesChannel: "",
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
      customerName: "",
      customerNickname: "",
      customerPosition: "",
      customerTel: "",
      customerEmail: "",
      salesAccountOwner: "",
      estimatedValue: "",
      stage: "lead",
      priority: "Medium",
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

  // Function to fill mock data for testing
  const fillMockData = () => {
    setFormData({
      // Step 1: Lead Info
      leadType: "new",
      leadFrom: "website",
      companyName: "Global Traders Ltd.",
      salesChannel: "direct",
      
      // Step 2: Business Details
      industry: "food",
      productGroup: "freight",
      customerType: "new",
      customerSize: "Medium",
      registeredYear: "2020",
      potentialGroup: "High Value",
      ovBusiness: "Import/Export",
      supplyChain: {
        importer: true,
        exporter: true,
        manufacturer: false,
        distributor: false,
        wholesaler: false,
        freightForwarder: false,
      },
      
      // Step 3: Location
      businessProvince: "Bangkok",
      businessDistrict: "Pathumwan",
      businessPostalCode: "10330",
      
      // Step 4: Contact Person
      customerName: "สมชาย วงศ์สกุล",
      customerNickname: "ชาย",
      customerPosition: "Managing Director",
      customerTel: "+66-81-234-5678",
      customerEmail: "somchai@globaltraders.com",
      
      // Additional
      salesAccountOwner: currentUser,
      estimatedValue: "$150,000",
      stage: "lead",
      priority: "High",
      subsidiary: "scg",
      notes: "Interested in warehouse services for food products",
    });
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.leadType && formData.leadFrom && formData.companyName && formData.salesChannel);
      case 2:
        return !!(formData.industry && formData.customerType);
      case 3:
        return true; // Optional fields
      case 4:
        return !!(formData.customerName && formData.customerPosition && formData.customerEmail);
      case 5:
        return true; // Review step - always valid
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
          <div className="space-y-6 py-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Lead Information</h3>
              <p className="text-sm text-muted-foreground">Tell us about this potential customer</p>
            </div>

            <div className="space-y-4 max-w-2xl mx-auto">
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
                    placeholder="เลือกขนาดบริษัท..."
                    searchPlaceholder="ค้นหาขนาดบริษัท..."
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
              {/* Lead Info */}
              <div className="p-4 bg-secondary/30 rounded-lg space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-foreground">Lead Information</h4>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Company:</span>
                    <p className="font-medium text-foreground">{formData.companyName || "-"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Lead Type:</span>
                    <p className="font-medium text-foreground">{formData.leadType || "-"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Lead From:</span>
                    <p className="font-medium text-foreground">{formData.leadFrom || "-"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Priority:</span>
                    <p className="font-medium text-foreground">{formData.priority || "-"}</p>
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
                    <span className="text-muted-foreground">Sales Channel:</span>
                    <p className="font-medium text-foreground">{formData.salesChannel || "-"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Estimated Value:</span>
                    <p className="font-medium text-foreground">{formData.estimatedValue || "-"}</p>
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

              {/* Duplicate Leads */}
              {duplicateLeads.length > 0 && (
                <div className="p-4 bg-red-100 rounded-lg space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-red-700" />
                    <h4 className="font-semibold text-red-700">Duplicate Leads Detected</h4>
                  </div>
                  <div className="space-y-2">
                    {duplicateLeads.map((lead) => (
                      <div key={lead.id} className="flex items-center gap-2">
                        <Badge className="bg-gray-100 text-gray-700 border-gray-200">
                          {lead.businessUnit}
                        </Badge>
                        <Badge className={getStatusColor(lead.status)}>
                          {lead.status}
                        </Badge>
                        <p className="text-sm text-gray-700">
                          {lead.companyName} - {lead.contactName} ({lead.email})
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
                {t("leads.add_lead")}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">
                Step {currentStep} of {STEPS.length}
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={fillMockData}
                className="h-8 text-xs bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200"
              >
                Fill Mock Data
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
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
          <div className="flex justify-between w-full">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="rounded-lg"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              {t("quotations.previous")}
            </Button>
            
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="rounded-lg"
              >
                {t("common.cancel")}
              </Button>
              
              {currentStep < STEPS.length ? (
                <Button
                  onClick={handleNext}
                  disabled={!validateStep(currentStep)}
                  className="bg-primary hover:bg-primary/90 rounded-lg"
                >
                  {t("quotations.next")}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-green-600 hover:bg-green-700 rounded-lg"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  {t("leads.create_lead")}
                </Button>
              )}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}