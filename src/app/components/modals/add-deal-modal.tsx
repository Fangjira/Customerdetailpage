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
import { Badge } from "../ui/badge";
import { X, Target, Building2, Package, TrendingUp, CheckCircle2, ChevronRight, ChevronLeft, DollarSign, Calendar, ChevronDown } from "lucide-react";
import {
  INDUSTRIES,
  BUSINESS_GROUPS,
  CUSTOMER_TYPES,
} from "../../../config/masterData";

interface AddDealModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSave?: (dealData: any) => void;
  expandedSections?: Record<string, boolean>;
  toggleSection?: (section: string) => void;
}

const STEPS = [
  { id: 1, title: "Deal Info", icon: Target, description: "Basic deal details" },
  { id: 2, title: "Deal Info", icon: Package, description: "Classification & industry" },
  { id: 3, title: "Customer Info", icon: Building2, description: "Customer details" },
  { id: 4, title: "Status & Progress", icon: TrendingUp, description: "Status tracking" },
  { id: 5, title: "Review", icon: CheckCircle2, description: "Confirm details" },
];

// Master Data
const TASK_TYPES = ["Lead", "Coordinator"];
const DEAL_TYPES = ["Solution Design", "Product Development", "Cost Improvement", "Internal Improvement"];
const COMMODITY_TYPES: { [key: string]: string[] } = {
  "Agriculture": ["Rice", "Rubber", "Cassava", "Palm Oil", "Sugar"],
  "Automotive": ["Automotive Parts", "Vehicles", "Tires", "Batteries"],
  "Construction & Building Material": ["Cement", "Steel", "Wood", "Glass"],
  "Chemical & Dangerous Goods": ["Industrial Chemicals", "Fertilizers", "Paints", "Solvents"],
  "Circular Economy": ["Recycled Materials", "Renewable Energy", "Waste-to-Energy"],
  "Electronics & Electrical Appliances": ["Consumer Electronics", "Industrial Equipment", "Home Appliances"],
  "Energy & Utilities": ["Oil & Gas", "Electricity", "Renewable Energy", "Water"],
  "Fashion & Garment": ["Textiles", "Apparel", "Footwear", "Accessories"],
  "Food & FMCG": ["Packaged Food", "Beverages", "Personal Care", "Household Products"],
  "Home Living & White Glove": ["Furniture", "Home Decor", "Luxury Goods", "Art & Antiques"],
  "Packaging": ["Corrugated Boxes", "Plastic Packaging", "Metal Containers", "Paper Products"],
  "Healthcare & Pharmaceutical": ["Pharmaceuticals", "Medical Devices", "Healthcare Supplies"],
  "Waste Management": ["Hazardous Waste", "Industrial Waste", "Municipal Waste", "E-Waste"],
  "Other": ["General Cargo", "Mixed Goods", "Unspecified"],
};

const SERVICES = [
  "Freight Forwarding",
  "Air Freight - International",
  "Air Freight - Domestic",
  "Sea Freight - FCL",
  "Sea Freight - LCL",
  "Land Transport - General",
  "Land Transport - Cold Chain",
  "Cross Border Transport",
  "Warehousing - General",
  "Warehousing - Bonded",
  "Warehousing - Cold Storage",
  "Customs Clearance",
  "Trading Services",
  "IT & Technology Solutions",
  "Other Services",
];

const VALUE_CHAINS = ["Service Focused", "Transport", "Value Creation / Value-added", "Multimodal"];

const DEAL_STATUSES = [
  "Prospect",
  "Approach",
  "Quotation",
  "Negotiating Process",
  "Win",
  "Lose",
  "On-hold",
  "Transfer",
  "Terminate",
  "Cancelled",
];

const PROBABILITY_LEVELS = ["High", "Medium", "Low"];

const LOST_REASONS = [
  "Pricing & Budget",
  "Service Fit",
  "Timing & Availability",
  "Competition",
  "Decision Process",
  "Customer Internal Strategy",
  "Technical or Operational Constraint",
  "Contract & Terms",
  "Customer Experience",
  "Other",
];

const DETAILED_LOST_REASONS: { [key: string]: string[] } = {
  "Pricing & Budget": ["Price too high", "Budget constraints", "ROI not justified", "Payment terms"],
  "Service Fit": ["Service not suitable", "Capability mismatch", "Geographic limitations", "Volume constraints"],
  "Timing & Availability": ["Lead time too long", "Resource unavailable", "Seasonal factors", "Urgent need not met"],
  "Competition": ["Competitor won", "Better offer elsewhere", "Existing relationship", "Market share loss"],
  "Decision Process": ["Decision delayed", "Stakeholder conflict", "Approval denied", "Process changed"],
  "Customer Internal Strategy": ["Budget reallocation", "Project cancelled", "Strategic shift", "Merger/Acquisition"],
  "Technical or Operational Constraint": ["Technical incompatibility", "Operational complexity", "Integration issues", "Compliance requirements"],
  "Contract & Terms": ["Terms unacceptable", "Legal concerns", "Insurance issues", "Liability concerns"],
  "Customer Experience": ["Poor communication", "Service quality concerns", "Previous bad experience", "Relationship issues"],
  "Other": ["Specify in remarks"],
};

export function AddDealModal({ isOpen, onClose, onSave }: AddDealModalProps) {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);

  // Search states for filtering
  const [industrySearch, setIndustrySearch] = useState("");
  const [servicesSearch, setServicesSearch] = useState("");
  const [commoditySearch, setCommoditySearch] = useState("");
  const [lostReasonSearch, setLostReasonSearch] = useState("");
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [valueChainDropdownOpen, setValueChainDropdownOpen] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1: Deal Info
    dealName: "",
    dealValue: "",
    currency: "USD",
    expectedCloseDate: "",
    service: "",
    businessUnit: "",
    priority: "Medium",
    description: "",
    
    // Step 2: Project Info
    taskType: "",
    projectType: "",
    industry: "",
    commodityTypes: [] as string[],
    services: [] as string[],
    valueChains: [] as string[],
    
    // Step 3: Customer Info
    customerId: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    contactPerson: "",
    contactPosition: "",
    
    // Step 4: Status & Progress
    projectStatus: "Prospect",
    progress: 0,
    probabilityOfDeal: "Medium",
    salesAccountOwner: "",
    lostReason: "",
    detailedLostReasons: [] as string[],
    lostRemarks: "",
  });

  const currentUser = "Current User";

  // Auto-calculate progress based on Project Status
  useEffect(() => {
    const statusProgressMap: { [key: string]: number } = {
      "Prospect": 0,
      "Approach": 10,
      "Quotation": 50,
      "Negotiating Process": 70,
      "Win": 100,
      "Lose": 100,
      "On-hold": 100,
      "Transfer": 100,
      "Terminate": 100,
      "Cancelled": 100,
    };
    setFormData(prev => ({
      ...prev,
      progress: statusProgressMap[prev.projectStatus] || 0
    }));
  }, [formData.projectStatus]);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setFormData({
        dealName: "",
        dealValue: "",
        currency: "USD",
        expectedCloseDate: "",
        service: "",
        businessUnit: "",
        priority: "Medium",
        description: "",
        taskType: "",
        projectType: "",
        industry: "",
        commodityTypes: [],
        services: [],
        valueChains: [],
        customerId: "",
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        contactPerson: "",
        contactPosition: "",
        projectStatus: "Prospect",
        progress: 0,
        probabilityOfDeal: "Medium",
        salesAccountOwner: currentUser,
        lostReason: "",
        detailedLostReasons: [],
        lostRemarks: "",
      });
    }
  }, [isOpen]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMultiSelectToggle = (field: string, value: string) => {
    setFormData((prev) => {
      const currentValues = prev[field as keyof typeof prev] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return { ...prev, [field]: newValues };
    });
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  const getCurrentStepIcon = () => {
    const step = STEPS.find((s) => s.id === currentStep);
    if (!step) return null;
    const Icon = step.icon;
    return <Icon className="h-5 w-5" />;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] flex flex-col p-0 gap-0 bg-white rounded-2xl">
        {/* Header with Progress */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200 p-6 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <DialogTitle className="text-xl text-foreground font-semibold">
                {t("deals.new_deal")}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">
                Step {currentStep} of {STEPS.length}
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = step.id < currentStep;
              const isCurrent = step.id === currentStep;
              
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all
                        ${isCurrent ? "bg-blue-600 border-blue-600 text-white shadow-lg scale-110" : ""}
                        ${isCompleted ? "bg-green-600 border-green-600 text-white" : ""}
                        ${!isCurrent && !isCompleted ? "bg-gray-100 border-gray-300 text-gray-400" : ""}
                      `}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>
                    <div className="text-center mt-2">
                      <div className={`text-xs font-medium ${isCurrent ? "text-blue-600" : "text-gray-500"}`}>
                        {step.title}
                      </div>
                    </div>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div className={`h-0.5 flex-1 mx-2 ${step.id < currentStep ? "bg-green-600" : "bg-gray-300"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Step 1: Deal Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dealName" className="text-sm font-medium mb-2 block">
                    {t("deals.deal_name")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="dealName"
                    value={formData.dealName}
                    onChange={(e) => handleInputChange("dealName", e.target.value)}
                    placeholder="e.g., International Freight Contract"
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="dealValue" className="text-sm font-medium mb-2 block flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-blue-600" />
                    {t("deals.deal_value")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="dealValue"
                    type="number"
                    value={formData.dealValue}
                    onChange={(e) => handleInputChange("dealValue", e.target.value)}
                    placeholder="254000"
                    className="rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currency" className="text-sm font-medium mb-2 block">
                    {t("currency")} <span className="text-red-500">*</span>
                  </Label>
                  <Combobox
                    options={[
                      { value: "USD", label: "USD - US Dollar" },
                      { value: "THB", label: "THB - Thai Baht" },
                      { value: "EUR", label: "EUR - Euro" },
                      { value: "GBP", label: "GBP - British Pound" },
                      { value: "JPY", label: "JPY - Japanese Yen" },
                    ]}
                    value={formData.currency}
                    onValueChange={(value) => handleInputChange("currency", value)}
                    placeholder="เลือกสกุลเงิน..."
                    searchPlaceholder="ค้นหาสกุลเงิน..."
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="expectedCloseDate" className="text-sm font-medium mb-2 block flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    {t("deals.expected_close_date")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="expectedCloseDate"
                    type="date"
                    value={formData.expectedCloseDate}
                    onChange={(e) => handleInputChange("expectedCloseDate", e.target.value)}
                    className="rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessUnit" className="text-sm font-medium mb-2 block">
                    {t("quotations.business_unit")} <span className="text-red-500">*</span>
                  </Label>
                  <Combobox
                    options={[
                      { value: "Air Freight", label: "Air Freight" },
                      { value: "Sea Freight", label: "Sea Freight" },
                      { value: "Land Transport", label: "Land Transport" },
                      { value: "Warehousing", label: "Warehousing" },
                      { value: "Customs", label: "Customs" },
                      { value: "Distribution", label: "Distribution" },
                      { value: "Special Cargo", label: "Special Cargo" },
                    ]}
                    value={formData.businessUnit}
                    onValueChange={(value) => handleInputChange("businessUnit", value)}
                    placeholder="Select business unit"
                    searchPlaceholder="ค้นหาหน่วยธุรกิจ..."
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="priority" className="text-sm font-medium mb-2 block">
                    {t("tasks.priority")} <span className="text-red-500">*</span>
                  </Label>
                  <Combobox
                    options={[
                      { value: "High", label: "🔴 High" },
                      { value: "Medium", label: "🟡 Medium" },
                      { value: "Low", label: "🟢 Low" },
                    ]}
                    value={formData.priority}
                    onValueChange={(value) => handleInputChange("priority", value)}
                    placeholder="เลือกความสำคัญ..."
                    searchPlaceholder="ค้นหาระดับความสำคัญ..."
                    className="rounded-lg"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium mb-2 block">
                  {t("deals.deal_description")}
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe the deal scope, requirements, and objectives..."
                  rows={4}
                  className="rounded-lg resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 2: Project Info */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    {t("deals.task_type")}
                  </Label>
                  <Combobox
                    options={TASK_TYPES.map((type) => ({ value: type, label: type }))}
                    value={formData.taskType}
                    onValueChange={(value) => handleInputChange("taskType", value)}
                    placeholder="Select task type"
                    searchPlaceholder="ค้นหาประเภทงาน..."
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    {t("deals.project_type")}
                  </Label>
                  <Combobox
                    options={DEAL_TYPES.map((type) => ({ value: type, label: type }))}
                    value={formData.projectType}
                    onValueChange={(value) => handleInputChange("projectType", value)}
                    placeholder="Select project type"
                    searchPlaceholder="ค้นหาประเภทโครงการ..."
                    className="rounded-lg"
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-4">
                  {t("deals.industry_commodity")}
                </h4>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      {t("deals.industry")} <span className="text-red-500">*</span>
                    </Label>
                    <Combobox
                      options={Object.keys(COMMODITY_TYPES).map((industry) => ({ value: industry, label: industry }))}
                      value={formData.industry}
                      onValueChange={(value) => {
                        handleInputChange("industry", value);
                        handleInputChange("commodityTypes", []); // Reset commodity types when industry changes
                      }}
                      placeholder="Select industry"
                      searchPlaceholder="ค้นหาอุตสาหกรรม..."
                      className="rounded-lg"
                    />
                  </div>

                  {formData.industry && (
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        {t("deals.commodity_type")} <span className="text-red-500">*</span>
                      </Label>
                      {/* Search Input */}
                      <Input
                        placeholder="🔍 Search commodity types..."
                        value={commoditySearch}
                        onChange={(e) => setCommoditySearch(e.target.value)}
                        className="rounded-lg mb-2"
                      />
                      <div className="border border-gray-200 rounded-lg p-4 max-h-40 overflow-y-auto space-y-2">
                        {COMMODITY_TYPES[formData.industry]?.filter(commodity =>
                          commodity.toLowerCase().includes(commoditySearch.toLowerCase())
                        ).map((commodity) => (
                          <div key={commodity} className="flex items-center gap-2">
                            <Checkbox
                              id={`commodity-${commodity}`}
                              checked={formData.commodityTypes.includes(commodity)}
                              onCheckedChange={() => handleMultiSelectToggle("commodityTypes", commodity)}
                            />
                            <Label htmlFor={`commodity-${commodity}`} className="text-sm cursor-pointer">
                              {commodity}
                            </Label>
                          </div>
                        ))}
                        {COMMODITY_TYPES[formData.industry]?.filter(commodity =>
                          commodity.toLowerCase().includes(commoditySearch.toLowerCase())
                        ).length === 0 && (
                          <p className="text-sm text-gray-400 text-center py-2">No commodity types found</p>
                        )}
                      </div>
                      {formData.commodityTypes.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.commodityTypes.map((commodity) => (
                            <Badge key={commodity} className="bg-blue-100 text-blue-700 border-blue-200">
                              {commodity}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-4">
                  {t("deals.service_value_chain")}
                </h4>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      {t("deals.service")} <span className="text-red-500">*</span>
                    </Label>
                    
                    {/* Dropdown Button */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                        className="w-full px-3 py-2 text-left bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors flex items-center justify-between"
                      >
                        <span className="text-sm text-gray-700">
                          {formData.services.length > 0 
                            ? `${formData.services.length} service${formData.services.length > 1 ? 's' : ''} selected`
                            : "Select services..."}
                        </span>
                        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Dropdown Content */}
                      {servicesDropdownOpen && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                          {/* Search Input */}
                          <div className="p-2 border-b border-gray-200">
                            <Input
                              placeholder="🔍 Search services..."
                              value={servicesSearch}
                              onChange={(e) => setServicesSearch(e.target.value)}
                              className="rounded-lg"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                          
                          {/* Checkbox List */}
                          <div className="p-2 max-h-60 overflow-y-auto space-y-2">
                            {SERVICES.filter(service => 
                              service.toLowerCase().includes(servicesSearch.toLowerCase())
                            ).map((service) => (
                              <div key={service} className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded">
                                <Checkbox
                                  id={`service-dropdown-${service}`}
                                  checked={formData.services.includes(service)}
                                  onCheckedChange={() => handleMultiSelectToggle("services", service)}
                                />
                                <Label htmlFor={`service-dropdown-${service}`} className="text-sm cursor-pointer flex-1">
                                  {service}
                                </Label>
                              </div>
                            ))}
                            {SERVICES.filter(service => 
                              service.toLowerCase().includes(servicesSearch.toLowerCase())
                            ).length === 0 && (
                              <p className="text-sm text-gray-400 text-center py-2">No services found</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Selected Items as Badges */}
                    {formData.services.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.services.map((service) => (
                          <Badge 
                            key={service} 
                            className="bg-purple-100 text-purple-700 border-purple-200 cursor-pointer hover:bg-purple-200"
                            onClick={() => handleMultiSelectToggle("services", service)}
                          >
                            {service}
                            <X className="h-3 w-3 ml-1" />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      {t("deals.value_chain")}
                    </Label>
                    {/* Dropdown Button */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setValueChainDropdownOpen(!valueChainDropdownOpen)}
                        className="w-full px-3 py-2 text-left bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors flex items-center justify-between"
                      >
                        <span className="text-sm text-gray-700">
                          {formData.valueChains.length > 0 
                            ? `${formData.valueChains.length} value chain${formData.valueChains.length > 1 ? 's' : ''} selected`
                            : "Select value chains..."}
                        </span>
                        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${valueChainDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Dropdown Content */}
                      {valueChainDropdownOpen && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                          {/* Checkbox List */}
                          <div className="p-2 max-h-60 overflow-y-auto space-y-2">
                            {VALUE_CHAINS.map((chain) => (
                              <div key={chain} className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded">
                                <Checkbox
                                  id={`chain-dropdown-${chain}`}
                                  checked={formData.valueChains.includes(chain)}
                                  onCheckedChange={() => handleMultiSelectToggle("valueChains", chain)}
                                />
                                <Label htmlFor={`chain-dropdown-${chain}`} className="text-sm cursor-pointer flex-1">
                                  {chain}
                                </Label>
                              </div>
                            ))}
                            {VALUE_CHAINS.length === 0 && (
                              <p className="text-sm text-gray-400 text-center py-2">No value chains found</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Selected Items as Badges */}
                    {formData.valueChains.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.valueChains.map((chain) => (
                          <Badge key={chain} className="bg-green-100 text-green-700 border-green-200">
                            {chain}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Customer Info */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerId" className="text-sm font-medium mb-2 block">
                    {t("customer_id")}
                  </Label>
                  <Input
                    id="customerId"
                    value={formData.customerId}
                    onChange={(e) => handleInputChange("customerId", e.target.value)}
                    placeholder="CUST-2024-001"
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="customerName" className="text-sm font-medium mb-2 block">
                    {t("customers.company_name")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => handleInputChange("customerName", e.target.value)}
                    placeholder="Global Freight Solutions Inc."
                    className="rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerEmail" className="text-sm font-medium mb-2 block">
                    {t("email")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) => handleInputChange("customerEmail", e.target.value)}
                    placeholder="contact@company.com"
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="customerPhone" className="text-sm font-medium mb-2 block">
                    {t("phone")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="customerPhone"
                    type="tel"
                    value={formData.customerPhone}
                    onChange={(e) => handleInputChange("customerPhone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="rounded-lg"
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-4">
                  {t("deals.primary_contact")}
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactPerson" className="text-sm font-medium mb-2 block">
                      {t("name")}
                    </Label>
                    <Input
                      id="contactPerson"
                      value={formData.contactPerson}
                      onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                      placeholder="John Davidson"
                      className="rounded-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPosition" className="text-sm font-medium mb-2 block">
                      {t("position")}
                    </Label>
                    <Input
                      id="contactPosition"
                      value={formData.contactPosition}
                      onChange={(e) => handleInputChange("contactPosition", e.target.value)}
                      placeholder="Operations Director"
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Status & Progress */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    {t("deals.project_status")} <span className="text-red-500">*</span>
                  </Label>
                  <Combobox
                    options={DEAL_STATUSES.map((status) => ({ value: status, label: status }))}
                    value={formData.projectStatus}
                    onValueChange={(value) => handleInputChange("projectStatus", value)}
                    placeholder="เลือกสถานะ..."
                    searchPlaceholder="ค้นหาสถานะโครงการ..."
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    {t("deals.progress")} ({t("deals.auto_calculated")})
                  </Label>
                  <div className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-500 flex items-center justify-between">
                    <span>{formData.progress}%</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2 ml-3">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${formData.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    {t("deals.probability_of_deal")} <span className="text-red-500">*</span>
                  </Label>
                  <Combobox
                    options={PROBABILITY_LEVELS.map((level) => ({ value: level, label: level }))}
                    value={formData.probabilityOfDeal}
                    onValueChange={(value) => handleInputChange("probabilityOfDeal", value)}
                    placeholder="เลือกความน่าจะเป็น..."
                    searchPlaceholder="ค้นหาระดับความน่าจะเป็น..."
                    className="rounded-lg"
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-4">
                  {t("deals.ownership")}
                </h4>
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    {t("deals.sales_account_owner")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={formData.salesAccountOwner}
                    onChange={(e) => handleInputChange("salesAccountOwner", e.target.value)}
                    placeholder="Current User"
                    className="rounded-lg"
                  />
                  <p className="text-xs text-gray-500 mt-1">Default: Creator of the deal</p>
                </div>
              </div>

              {/* Lost Information - Conditional */}
              {formData.projectStatus === "Lose" && (
                <div className="border-t pt-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-4">
                    <h4 className="text-sm font-medium text-red-900 mb-4">
                      {t("deals.lost_information")}
                    </h4>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        {t("deals.lost_reason")} <span className="text-red-500">*</span>
                      </Label>
                      <Combobox
                        options={LOST_REASONS.map((reason) => ({ value: reason, label: reason }))}
                        value={formData.lostReason}
                        onValueChange={(value) => {
                          handleInputChange("lostReason", value);
                          handleInputChange("detailedLostReasons", []); // Reset detailed reasons
                        }}
                        placeholder="Select lost reason"
                        searchPlaceholder="ค้นหาสาเหตุที่สูญเสีย..."
                        className="rounded-lg bg-white"
                      />
                    </div>

                    {formData.lostReason && DETAILED_LOST_REASONS[formData.lostReason] && (
                      <div>
                        <Label className="text-sm font-medium mb-2 block">
                          {t("deals.detailed_lost_reason")} <span className="text-red-500">*</span>
                        </Label>
                        <div className="border border-red-200 rounded-lg p-4 bg-white max-h-40 overflow-y-auto space-y-2">
                          {DETAILED_LOST_REASONS[formData.lostReason].map((reason) => (
                            <div key={reason} className="flex items-center gap-2">
                              <Checkbox
                                id={`detailed-${reason}`}
                                checked={formData.detailedLostReasons.includes(reason)}
                                onCheckedChange={() => handleMultiSelectToggle("detailedLostReasons", reason)}
                              />
                              <Label htmlFor={`detailed-${reason}`} className="text-sm cursor-pointer">
                                {reason}
                              </Label>
                            </div>
                          ))}
                        </div>
                        {formData.detailedLostReasons.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {formData.detailedLostReasons.map((reason) => (
                              <Badge key={reason} className="bg-red-100 text-red-700 border-red-300">
                                {reason}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {formData.lostReason === "Other" && (
                      <div>
                        <Label className="text-sm font-medium mb-2 block">
                          {t("remarks")} <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          value={formData.lostRemarks}
                          onChange={(e) => handleInputChange("lostRemarks", e.target.value)}
                          placeholder="Please specify the reason..."
                          rows={3}
                          className="rounded-lg resize-none bg-white"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-blue-900 mb-3">
                  {t("deals.deal_information")}
                </h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div className="text-gray-600">Deal Name:</div>
                  <div className="text-gray-900 font-medium">{formData.dealName || "-"}</div>
                  <div className="text-gray-600">Deal Value:</div>
                  <div className="text-gray-900 font-medium">{formData.dealValue ? `${formData.currency} ${formData.dealValue}` : "-"}</div>
                  <div className="text-gray-600">Expected Close Date:</div>
                  <div className="text-gray-900 font-medium">{formData.expectedCloseDate || "-"}</div>
                  <div className="text-gray-600">Business Unit:</div>
                  <div className="text-gray-900 font-medium">{formData.businessUnit || "-"}</div>
                  <div className="text-gray-600">Priority:</div>
                  <div className="text-gray-900 font-medium">{formData.priority}</div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-purple-900 mb-3">
                  {t("deals.project_information")}
                </h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div className="text-gray-600">Task Type:</div>
                  <div className="text-gray-900 font-medium">{formData.taskType || "-"}</div>
                  <div className="text-gray-600">Project Type:</div>
                  <div className="text-gray-900 font-medium">{formData.projectType || "-"}</div>
                  <div className="text-gray-600">Industry:</div>
                  <div className="text-gray-900 font-medium">{formData.industry || "-"}</div>
                  <div className="text-gray-600">Commodity Types:</div>
                  <div className="text-gray-900 font-medium">
                    {formData.commodityTypes.length > 0 ? formData.commodityTypes.join(", ") : "-"}
                  </div>
                  <div className="text-gray-600">Services:</div>
                  <div className="text-gray-900 font-medium">
                    {formData.services.length > 0 ? formData.services.join(", ") : "-"}
                  </div>
                  <div className="text-gray-600">Value Chains:</div>
                  <div className="text-gray-900 font-medium">
                    {formData.valueChains.length > 0 ? formData.valueChains.join(", ") : "-"}
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-green-900 mb-3">
                  {t("customers.customer_details")}
                </h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div className="text-gray-600">Customer ID:</div>
                  <div className="text-gray-900 font-medium">{formData.customerId || "-"}</div>
                  <div className="text-gray-600">Customer Name:</div>
                  <div className="text-gray-900 font-medium">{formData.customerName || "-"}</div>
                  <div className="text-gray-600">Email:</div>
                  <div className="text-gray-900 font-medium">{formData.customerEmail || "-"}</div>
                  <div className="text-gray-600">Phone:</div>
                  <div className="text-gray-900 font-medium">{formData.customerPhone || "-"}</div>
                  <div className="text-gray-600">Contact Person:</div>
                  <div className="text-gray-900 font-medium">{formData.contactPerson || "-"}</div>
                  <div className="text-gray-600">Contact Position:</div>
                  <div className="text-gray-900 font-medium">{formData.contactPosition || "-"}</div>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-orange-900 mb-3">
                  {t("deals.project_status_progress")}
                </h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div className="text-gray-600">Project Status:</div>
                  <div className="text-gray-900 font-medium">{formData.projectStatus}</div>
                  <div className="text-gray-600">Progress:</div>
                  <div className="text-gray-900 font-medium">{formData.progress}%</div>
                  <div className="text-gray-600">Probability:</div>
                  <div className="text-gray-900 font-medium">{formData.probabilityOfDeal}</div>
                  <div className="text-gray-600">Sales Account Owner:</div>
                  <div className="text-gray-900 font-medium">{formData.salesAccountOwner}</div>
                </div>

                {formData.projectStatus === "Lose" && formData.lostReason && (
                  <div className="mt-3 pt-3 border-t border-orange-300">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div className="text-gray-600">Lost Reason:</div>
                      <div className="text-red-700 font-medium">{formData.lostReason}</div>
                      <div className="text-gray-600">Detailed Reasons:</div>
                      <div className="text-red-700 font-medium">
                        {formData.detailedLostReasons.length > 0 ? formData.detailedLostReasons.join(", ") : "-"}
                      </div>
                      {formData.lostRemarks && (
                        <>
                          <div className="text-gray-600">Remarks:</div>
                          <div className="text-red-700 font-medium">{formData.lostRemarks}</div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <DialogFooter className="border-t bg-gray-50 p-4 flex-shrink-0">
          <div className="flex items-center justify-between w-full">
            <div>
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  className="gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  {t("previous")}
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                ยกเลิก
              </Button>
              {currentStep < STEPS.length ? (
                <Button onClick={handleNext} className="gap-2 bg-blue-600 hover:bg-blue-700">
                  ถัดไป
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="gap-2 bg-green-600 hover:bg-green-700 rounded-lg"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  {t("deals.new_deal")}
                </Button>
              )}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}