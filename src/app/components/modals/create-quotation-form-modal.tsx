import { useState, useEffect } from "react";
import { X, FileText, Building2, Warehouse, FileCheck, Truck, Ship, ArrowRight, Eye, CheckCircle2, Edit3, Plus, ChevronDown, DollarSign, Shield, Globe, Plane } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { QUOTATION_TEMPLATES } from "../quotation/quotation-constants";
import { QuotationTemplateType } from "../quotation/quotation-types";
import { QuotationDocumentPreview } from "../quotation/quotation-document-preview";
import { DynamicRateTable, RateTableData } from "../quotation/dynamic-rate-table";
import { CustomsRateTable } from "../quotation/customs-rate-table";
import { CrossBorderRateTable, CrossBorderRateTableData } from "../quotation/cross-border-rate-table";
import { AirFreightRateTable, AirFreightRateTableData } from "../quotation/air-freight-rate-table";

interface CreateQuotationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: QuotationFormData) => void;
  initialData?: Partial<QuotationFormData>; // Add support for pre-filled data from Deal
  progressInfo?: { current: number; total: number; }; // Progress indicator for multi-quotation flow
}

export interface QuotationFormData {
  source: "crm" | "manual";
  templateType: QuotationTemplateType;
  templateTypes?: QuotationTemplateType[]; // Support multiple templates
  crmDealId?: string;
  
  // Basic Info
  quotationNumber: string;
  validUntil: string;
  paymentTerm?: string; // Payment Terms field
  
  // Customer Info
  companyNameTh: string;
  companyNameEn: string;
  contactName: string;
  position: string;
  phone: string;
  email: string;
  address?: string;
  
  // General Info
  introduction?: string;
  description?: string;
  
  // Scope of Work - Services Selection
  selectedServices?: string[]; // ["warehouse", "transport", "freight-air", "freight-sea", "cross-border"]
  
  // General - Other Activity
  otherActivity?: string; // Default: "จัดรวม Customs"
  customItems?: { label: string; value: string }[]; // Dynamic custom items
  
  // (1) Warehouse Service
  warehouseSite?: string; // Warehouse location / สถานที่คลัง
  storageDetails?: string; // Storage / การจัดเก็บสินค้า
  handlingDetails?: string; // Handling / การเคลื่อนย้ายสินค้า
  warehousePrice?: string; // Warehouse Service Price
  
  // (2) Transport Service
  transportationType?: string; // Transportation Type / ประเภทการขนส่งสินค้า
  routeOrigin?: string; // Route Origin / ต้นทาง
  routeDestination?: string; // Route Destination / ปลายทาง
  transportPrice?: string; // Transport Service Price
  
  // (3) Freight Service - Air
  airFreightDetails?: string; // Air Freight / บริการขนส่งทางอากาศ
  airFreightIncoterm?: string; // INCOTERM for Air
  airFreightPrice?: string; // Air Freight Service Price
  
  // (3) Freight Service - Sea
  seaFreightDetails?: string; // Sea Freight / บริการขนส่งทางทะเล
  seaFreightIncoterm?: string; // INCOTERM for Sea
  seaFreightPrice?: string; // Sea Freight Service Price
  
  // (4) Cross-Border Service
  crossBorderDetails?: string; // Cross-border details
  crossBorderPrice?: string; // Cross-Border Service Price
  
  // Rate Section
  rateTypes?: string[]; // ["warehousing", "transport"]
  warehousingRateData?: string; // JSON stringified RateTableData
  warehousingRemarks?: string; // Numbered remarks
  transportRateData?: string; // JSON stringified RateTableData
  transportRemarks?: string; // Numbered remarks
  
  // Legacy fields (keep for backward compatibility)
  warehouseLocation?: string;
  warehouseSize?: string;
  transportRoutes?: string;
  cargoType?: string;
  storageType?: string; // "ambient" | "refrigerated" | "frozen" | "hazmat"
  rentalPeriod?: string;
  transportFrequency?: string;
  warehouseScopeOfWork?: string;
  warehouseServiceDescription?: string;
  warehouseSpecialRequirements?: string;
  warehouseRemark?: string;
  
  // Customs & License
  customsPort?: string;
  licenseType?: string;
  hsCode?: string;
  importExportType?: string; // "import" | "export" | "both"
  countryOfOrigin?: string;
  goodsValue?: string;
  productCategory?: string;
  customsScopeOfWork?: string;
  documentRequirements?: string;
  processingTimeline?: string;
  customsRemark?: string;
  
  // Warehouse + Transport - Description Fields
  warehouseProduct?: string; // Product/ผลิตภัณฑ์
  warehouseVolume?: string; // Volume/ปริมาณ
  warehousePackaging?: string; // Packaging/ประเภทบรรจุภัณฑ์
  warehouseTemperature?: string; // Temperature/อุณหภูมิ
  
  // Customs & License - Description Fields
  customsProduct?: string; // Product/ผลิตภัณฑ์
  customsVolume?: string; // Volume/ปริมาณ
  customsPackaging?: string; // Packaging/ประเภทบรรจุภัณฑ์
  customsTemperature?: string; // Temperature/อุณหภูมิ
  customsServicePrice?: string; // Customs Service Price
  licenseServicePrice?: string; // License Service Price
  
  // Cross-Border - Description Fields
  crossBorderProduct?: string; // Product/ผลิตภัณฑ์
  crossBorderVolume?: string; // Volume/ปริมาณ
  crossBorderPackaging?: string; // Packaging/ประเภทบรรจุภัณฑ์
  crossBorderTemperature?: string; // Temperature/อุณหภูมิ
  crossBorderServicePrice?: string; // Cross-Border Service Total Price
  
  // International Freight - Description Fields
  internationalProduct?: string; // Product/ผลิตภัณฑ์
  internationalVolume?: string; // Volume/ปริมาณ
  internationalPackaging?: string; // Packaging/ประเภทบรรจุภัณฑ์
  internationalTemperature?: string; // Temperature/อุณหภูมิ
  internationalServicePrice?: string; // International Freight Service Price
  
  // Customs & License - Rate Fields
  customsRateTable?: string; // JSON string for 3.1 CUSTOMS RATE
  licenseRateTable?: string; // JSON string for 3.2 LICENSE RATE
  customsLicenseRateTable?: string; // JSON string for 3.3 CUSTOMS RATE AND LICENSE RATE (optional)
  rateRemarks?: string; // Combined remarks section (running number 1, 2, 3, ...)
  
  // New Rate Data fields (for DynamicRateTable)
  licenseRateData?: string; // JSON stringified RateTableData for LICENSE RATE
  customsRateData?: string; // JSON stringified RateTableData for CUSTOMS RATE
  customsLicenseRateData?: string; // JSON stringified RateTableData for CUSTOMS RATE AND LICENSE RATE
  customsTermsAndConditions?: string; // Terms & Conditions for Customs & License
  
  // Cross-Border
  borderCrossing?: string;
  destinationCountry?: string;
  specificRoute?: string;
  monthlyTrips?: string;
  truckType?: string; // "standard" | "refrigerated" | "flatbed"
  crossBorderScopeOfWork?: string;
  routeDetails?: string;
  transitTime?: string;
  documentation?: string;
  crossBorderRemark?: string;
  crossBorderRateData?: string; // JSON stringified CrossBorderRateTableData
  crossBorderTermsAndConditions?: string; // Terms & Conditions for Cross-Border
  
  // Cross-Border SCOPE OF WORK - New Fields
  crossBorderServices?: string[]; // Array of selected services
  crossBorderWarehouseSite?: string;
  crossBorderStorageDetails?: string;
  crossBorderHandlingDetails?: string;
  crossBorderOtherActivity?: string;
  crossBorderTransportationType?: string;
  crossBorderRouteOrigin?: string;
  crossBorderRouteDestination?: string;
  crossBorderAirFreightDetails?: string;
  crossBorderAirFreightIncoterm?: string;
  crossBorderSeaFreightDetails?: string;
  crossBorderSeaFreightIncoterm?: string;
  crossBorderCustomServices?: { name: string; details: string; }[]; // Dynamic custom services
  
  // International Freight
  shipmentMode?: string; // "air" | "sea" | "both"
  origin?: string;
  destination?: string;
  cargoWeight?: string;
  cargoVolume?: string;
  incoterms?: string; // "FOB" | "CIF" | "EXW" | "DDP"
  serviceLevel?: string; // "standard" | "express" | "economy"
  specialHandling?: string;
  freightScopeOfWork?: string;
  packagingRequirements?: string;
  insurance?: string;
  specialInstructions?: string;
  freightRemark?: string;
  
  // International Freight - Rate Tables
  airFreightExportRateData?: string; // JSON stringified AirFreightRateTableData
  airFreightImportRateData?: string; // JSON stringified AirFreightRateTableData (optional)
  seaFreightExportRateData?: string; // JSON stringified AirFreightRateTableData
  seaFreightImportRateData?: string; // JSON stringified AirFreightRateTableData (optional)
  freightRateRemarks?: string; // Combined remarks for rate section
  
  // International Freight SCOPE OF WORK - New Fields
  internationalServices?: string[]; // Array of selected services
  internationalWarehouseSite?: string;
  internationalStorageDetails?: string;
  internationalHandlingDetails?: string;
  internationalOtherActivity?: string;
  internationalTransportationType?: string;
  internationalRouteOrigin?: string;
  internationalRouteDestination?: string;
  internationalAirFreightDetails?: string;
  internationalAirFreightIncoterm?: string;
  internationalSeaFreightDetails?: string;
  internationalSeaFreightIncoterm?: string;
  internationalCustomServices?: { name: string; details: string; }[]; // Dynamic custom services
  internationalRateData?: string; // JSON stringified RateTableData for AIR FREIGHT RATE (EXPORT)
  airFreightImportRateData?: string; // JSON stringified RateTableData for AIR FREIGHT RATE (IMPORT)
  seaFreightExportRateData?: string; // JSON stringified RateTableData for SEA FREIGHT RATE (EXPORT)
  seaFreightImportRateData?: string; // JSON stringified RateTableData for SEA FREIGHT RATE (IMPORT)
  internationalCustomsRateData?: string; // JSON stringified RateTableData for CUSTOMS RATE
  internationalLicenseRateData?: string; // JSON stringified RateTableData for LICENSE RATE
  internationalTermsAndConditions?: string; // Terms & Conditions for International Freight
  
  // Remarks for each rate table
  airFreightExportRemark?: string;
  airFreightImportRemark?: string;
  seaFreightExportRemark?: string;
  seaFreightImportRemark?: string;
  customsRateRemark?: string;
  licenseRateRemark?: string;
}

const iconMap = {
  warehouse: Warehouse,
  "file-check": FileCheck,
  truck: Truck,
  ship: Ship,
};

// Mock customer data
interface CustomerData {
  id: string;
  companyNameTh: string;
  companyNameEn: string;
  contactName: string;
  position: string;
  phone: string;
  email: string;
  address: string;
}

const MOCK_CUSTOMERS: CustomerData[] = [
  {
    id: "1",
    companyNameTh: "บริษัท เอสซีจี โลจิสติกส์ จำกัด",
    companyNameEn: "SCG Logistics Co., Ltd.",
    contactName: "สมชาย ใจดี",
    position: "ผู้จัดการฝ่ายจัดซื้อ",
    phone: "081-234-5678",
    email: "somchai@scg.com",
    address: "1 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110"
  },
  {
    id: "2",
    companyNameTh: "บริษัท ซีพี ออลล์ จำกัด (มหาชน)",
    companyNameEn: "CP ALL Public Company Limited",
    contactName: "สมหญิง รักษ์ดี",
    position: "หัวหน้าฝ่ายโลจิสติกส์",
    phone: "082-345-6789",
    email: "somying@cpall.co.th",
    address: "313 ถ.ซีพีทาวเวอร์ แขวงสามเสนใน เขตพญาไท กรุงเทพฯ 10400"
  },
  {
    id: "3",
    companyNameTh: "บริษัท เซ็นทรัล รีเทล คอร์ปอเรชั่น จำกัด (มหาชน)",
    companyNameEn: "Central Retail Corporation Public Company Limited",
    contactName: "วิชัย สุขสันต์",
    position: "Supply Chain Manager",
    phone: "083-456-7890",
    email: "wichai@centralretail.com",
    address: "22 ถ.รัชดาภิเษก แขวงจตุจักร เขตจตุจักร กรุงเทพฯ 10900"
  },
  {
    id: "4",
    companyNameTh: "บริษัท ไทยยูเนี่ยน กรุ๊ป จำกัด (มหาชน)",
    companyNameEn: "Thai Union Group Public Company Limited",
    contactName: "อรุณี มานะดี",
    position: "Logistics Coordinator",
    phone: "084-567-8901",
    email: "arunee@thaiunion.com",
    address: "979/13-21 ถ.สามเสน แขวงถนนนครไชยศรี เขตดุสิต กรุงเทพฯ 10300"
  },
  {
    id: "5",
    companyNameTh: "บริษัท เบทาโกร จำกัด (มหาชน)",
    companyNameEn: "Betagro Public Company Limited",
    contactName: "ประสิทธิ์ วิทยากร",
    position: "ผู้จัดการแผนกจัดส่ง",
    phone: "085-678-9012",
    email: "prasit@betagro.com",
    address: "90 ซ.จันทน์ 41 ถ.จันทน์ แขวงทุ่งมหาเมฆ เขตสาทร กรุงเทพฯ 10120"
  }
];

export function CreateQuotationFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  progressInfo,
}: CreateQuotationFormModalProps) {
  // If templateType is provided in initialData, skip template selection and go directly to form
  const [step, setStep] = useState<"template" | "form" | "preview">(
    initialData?.templateType ? "form" : "template"
  );
  const [selectedTemplates, setSelectedTemplates] = useState<QuotationTemplateType[]>(
    initialData?.templateType ? [initialData.templateType] : []
  );
  const [source, setSource] = useState<"crm" | "manual">(initialData?.source || "manual");
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("new");
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [companySearchQuery, setCompanySearchQuery] = useState(initialData?.companyNameTh || "");
  const [showCompanySuggestions, setShowCompanySuggestions] = useState(false);
  const [formData, setFormData] = useState<Partial<QuotationFormData>>({
    source: initialData?.source || "manual",
    quotationNumber: initialData?.quotationNumber || "QT-2025-001",
    validUntil: initialData?.validUntil || "2025-03-27",
    paymentTerm: initialData?.paymentTerm || "30",
    companyNameTh: initialData?.companyNameTh || "",
    companyNameEn: initialData?.companyNameEn || "",
    contactName: initialData?.contactName || "",
    position: initialData?.position || "",
    phone: initialData?.phone || "",
    email: initialData?.email || "",
    address: initialData?.address || "",
    crmDealId: initialData?.crmDealId || "",
    otherActivity: "จัดรวม Customs",
    selectedServices: initialData?.selectedServices || [],
    rateTypes: [],
    ...initialData, // Merge any other initial data
  });

  const handleSelectCustomer = (customerId: string) => {
    setSelectedCustomerId(customerId);
    setShowCustomerDropdown(false);
    
    if (customerId === "new") {
      // Clear customer fields for new customer
      setFormData({
        ...formData,
        companyNameTh: "",
        companyNameEn: "",
        contactName: "",
        position: "",
        phone: "",
        email: "",
        address: "",
      });
    } else {
      // Auto-fill from selected customer
      const customer = MOCK_CUSTOMERS.find(c => c.id === customerId);
      if (customer) {
        setFormData({
          ...formData,
          companyNameTh: customer.companyNameTh,
          companyNameEn: customer.companyNameEn,
          contactName: customer.contactName,
          position: customer.position,
          phone: customer.phone,
          email: customer.email,
          address: customer.address,
        });
      }
    }
  };

  const handleCompanySearchChange = (value: string) => {
    setCompanySearchQuery(value);
    updateFormData("companyNameTh", value);
    setShowCompanySuggestions(value.length > 0);
  };

  const handleSelectCompanySuggestion = (customer: CustomerData) => {
    setCompanySearchQuery(customer.companyNameTh);
    setShowCompanySuggestions(false);
    setFormData({
      ...formData,
      companyNameTh: customer.companyNameTh,
      companyNameEn: customer.companyNameEn,
      address: customer.address,
    });
  };

  const filteredCompanies = MOCK_CUSTOMERS.filter(customer =>
    customer.companyNameTh.toLowerCase().includes(companySearchQuery.toLowerCase()) ||
    customer.companyNameEn.toLowerCase().includes(companySearchQuery.toLowerCase())
  );

  const handleSelectTemplate = (templateType: QuotationTemplateType) => {
    // Toggle template selection
    setSelectedTemplates(prev => {
      if (prev.includes(templateType)) {
        return prev.filter(t => t !== templateType);
      } else {
        return [...prev, templateType];
      }
    });
  };

  const handleContinueToForm = () => {
    if (selectedTemplates.length === 0) {
      alert("กรุณาเลือกอย่างน้อย 1 เทมเพลต");
      return;
    }
    setStep("form");
  };

  const handleSubmit = () => {
    // If in multi-quotation mode, skip preview and submit directly
    if (progressInfo && progressInfo.total > 1) {
      handleConfirm();
    } else {
      // No validation - allow preview with incomplete data
      setStep("preview");
    }
  };

  const handleConfirm = () => {
    // Validate required fields before final submit
    if (
      selectedTemplates.length === 0 ||
      !formData.companyNameTh ||
      !formData.companyNameEn ||
      !formData.contactName ||
      !formData.phone ||
      !formData.email
    ) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วนก่อนสร้างใบเสนอราคา");
      return;
    }

    onSubmit({
      ...formData,
      templateType: selectedTemplates[0], // Primary template
      templateTypes: selectedTemplates,
    } as QuotationFormData);
  };

  const handleSkip = () => {
    if (selectedTemplates.length === 0) {
      alert("กรุณาเลือกอย่างน้อย 1 template ก่อน");
      return;
    }

    // Submit with minimal data
    onSubmit({
      source: "manual",
      templateType: selectedTemplates[0],
      templateTypes: selectedTemplates,
      quotationNumber: formData.quotationNumber || "QT-2025-001",
      validUntil: formData.validUntil || "2025-03-27",
      companyNameTh: "-",
      companyNameEn: "-",
      contactName: "-",
      position: "-",
      phone: "-",
      email: "-",
    });
  };

  // Effect to handle CRM data and template preselection
  useEffect(() => {
    if (isOpen && initialData?.source === "crm" && initialData?.crmDealId) {
      setSource("crm");
      
      // If templateType is provided, skip template selection and go directly to form
      if (initialData.templateType) {
        console.log("Template preselected from CRM:", initialData.templateType);
        setSelectedTemplates([initialData.templateType]);
        setStep("form");
      }
    }
  }, [isOpen, initialData]);

  // Effect to update form data when initialData changes
  useEffect(() => {
    if (initialData) {
      console.log("CreateQuotationFormModal - Received initialData:", {
        templateType: initialData.templateType,
        source: initialData.source,
        description: initialData.description?.substring(0, 100),
        hasServices: !!initialData.description
      });
      
      setFormData(prev => ({
        ...prev,
        ...initialData,
      }));
      setCompanySearchQuery(initialData.companyNameTh || "");
    }
  }, [initialData]);

  const handleClose = () => {
    // Reset to initial state or template selection based on initialData
    const shouldStartAtForm = initialData?.templateType ? true : false;
    
    setStep(shouldStartAtForm ? "form" : "template");
    setSelectedTemplates(shouldStartAtForm && initialData?.templateType ? [initialData.templateType] : []);
    setSource(initialData?.source || "manual");
    setFormData({
      source: "manual",
      quotationNumber: "QT-2025-001",
      validUntil: "2025-03-27",
      companyNameTh: "",
      companyNameEn: "",
      contactName: "",
      position: "",
      phone: "",
      email: "",
      address: "",
    });
    onClose();
  };

  const updateFormData = (field: string, value: string) => {
    // Handle selectedServices and rateTypes as array
    if (field === "selectedServices" || field === "rateTypes") {
      try {
        const arrayValue = JSON.parse(value);
        setFormData({ ...formData, [field]: arrayValue });
      } catch {
        setFormData({ ...formData, [field]: value });
      }
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  // Render template-specific fields
  const renderTemplateFields = () => {
    return selectedTemplates.map((templateType, index) => {
      const tmpl = QUOTATION_TEMPLATES.find(t => t.id === templateType);
      if (!tmpl) return null;

      return (
        <div key={templateType} className="space-y-6">
          {/* Template Section Header */}
          {selectedTemplates.length > 1 && (
            <div className="bg-gradient-to-r from-[#7BC9A6]/20 to-transparent rounded-xl p-4 border-l-4 border-[#7BC9A6]">
              <h3 className="text-base font-bold text-gray-900">
                ส่วนที่ {index + 1}: {tmpl.name}
              </h3>
              <p className="text-xs text-gray-600 mt-1">{tmpl.description}</p>
            </div>
          )}

          {/* Render fields based on template type */}
          {templateType === "warehouse-transport" && renderWarehouseTransportFields()}
          {templateType === "customs-license" && renderCustomsFields()}
          {templateType === "cross-border" && renderCrossBorderFields()}
          {templateType === "international-freight" && renderInternationalFreightFields()}
        </div>
      );
    });
  };

  const renderWarehouseTransportFields = () => {
    return (
      <>
        {/* Introduction */}
        <div className="bg-purple-50/50 rounded-xl p-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-purple-600 flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">
              Introduction
            </h3>
          </div>

          <div>
            <Label className="text-xs text-gray-700 mb-1.5 block">
              คำนำ / Introduction
            </Label>
            <Textarea
              value={formData.warehouseServiceDescription || ""}
              onChange={(e) => updateFormData("warehouseServiceDescription", e.target.value)}
              className="min-h-[80px] text-sm bg-white resize-none"
              placeholder="ขอบคุณที่ให้โอกาสเราได้นำเสนอบริการ..."
            />
          </div>
        </div>

        {/* Description */}
            <div className="bg-indigo-50/50 rounded-xl p-4 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900">
                  DESCRIPTION / รายละเอียด
                </h3>
              </div>

              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-gray-700 mb-1.5 block">1) Product/ผลิตภัณฑ์</Label>
                  <Input value={formData.warehouseProduct || ""} onChange={(e) => updateFormData("warehouseProduct", e.target.value)} className="h-9 text-sm bg-white" placeholder="Product Information" />
                </div>
                <div>
                  <Label className="text-xs text-gray-700 mb-1.5 block">2) Volume/ปริมาณ</Label>
                  <Input value={formData.warehouseVolume || ""} onChange={(e) => updateFormData("warehouseVolume", e.target.value)} className="h-9 text-sm bg-white" placeholder="Volume and UOM" />
                </div>
                <div>
                  <Label className="text-xs text-gray-700 mb-1.5 block">3) Packaging/ประเภทบรรจุภัณฑ์</Label>
                  <Input value={formData.warehousePackaging || ""} onChange={(e) => updateFormData("warehousePackaging", e.target.value)} className="h-9 text-sm bg-white" placeholder="Packaging" />
                </div>
                <div>
                  <Label className="text-xs text-gray-700 mb-1.5 block">4) Temperature/อุณหภูมิ</Label>
                  <Input value={formData.warehouseTemperature || ""} onChange={(e) => updateFormData("warehouseTemperature", e.target.value)} className="h-9 text-sm bg-white" placeholder="Temperature Control" />
                </div>
              </div>
            </div>

            {/* Scope of Work */}
            <div className="bg-orange-50/50 rounded-xl p-4 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-orange-600 flex items-center justify-center">
                  <Warehouse className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900">
                  SCOPE OF WORK / ขอบเขตการดำเนินงาน
                </h3>
              </div>

              {/* Service Selection Checkboxes */}
              <div className="space-y-2 border border-gray-300 rounded-lg p-3">
                <p className="text-xs font-semibold text-gray-700 mb-2">เลือก Services ที่ต้องการแสดงในเอกสาร:</p>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.selectedServices?.includes("warehouse") || false}
                      onChange={(e) => {
                        const services = formData.selectedServices || [];
                        if (e.target.checked) {
                          updateFormData("selectedServices", JSON.stringify([...services, "warehouse"]));
                        } else {
                          updateFormData("selectedServices", JSON.stringify(services.filter(s => s !== "warehouse")));
                        }
                      }}
                      className="w-4 h-4 text-[#7BC9A6] rounded focus:ring-[#7BC9A6]"
                    />
                    <span className="text-xs text-gray-700">(1) Warehouse</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.selectedServices?.includes("transport") || false}
                      onChange={(e) => {
                        const services = formData.selectedServices || [];
                        if (e.target.checked) {
                          updateFormData("selectedServices", JSON.stringify([...services, "transport"]));
                        } else {
                          updateFormData("selectedServices", JSON.stringify(services.filter(s => s !== "transport")));
                        }
                      }}
                      className="w-4 h-4 text-[#7BC9A6] rounded focus:ring-[#7BC9A6]"
                    />
                    <span className="text-xs text-gray-700">(2) Transport</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.selectedServices?.includes("freight-air") || false}
                      onChange={(e) => {
                        const services = formData.selectedServices || [];
                        if (e.target.checked) {
                          updateFormData("selectedServices", JSON.stringify([...services, "freight-air"]));
                        } else {
                          updateFormData("selectedServices", JSON.stringify(services.filter(s => s !== "freight-air")));
                        }
                      }}
                      className="w-4 h-4 text-[#7BC9A6] rounded focus:ring-[#7BC9A6]"
                    />
                    <span className="text-xs text-gray-700">(3) Freight: Air</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.selectedServices?.includes("freight-sea") || false}
                      onChange={(e) => {
                        const services = formData.selectedServices || [];
                        if (e.target.checked) {
                          updateFormData("selectedServices", JSON.stringify([...services, "freight-sea"]));
                        } else {
                          updateFormData("selectedServices", JSON.stringify(services.filter(s => s !== "freight-sea")));
                        }
                      }}
                      className="w-4 h-4 text-[#7BC9A6] rounded focus:ring-[#7BC9A6]"
                    />
                    <span className="text-xs text-gray-700">(3) Freight: Sea</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.selectedServices?.includes("cross-border") || false}
                      onChange={(e) => {
                        const services = formData.selectedServices || [];
                        if (e.target.checked) {
                          updateFormData("selectedServices", JSON.stringify([...services, "cross-border"]));
                        } else {
                          updateFormData("selectedServices", JSON.stringify(services.filter(s => s !== "cross-border")));
                        }
                      }}
                      className="w-4 h-4 text-[#7BC9A6] rounded focus:ring-[#7BC9A6]"
                    />
                    <span className="text-xs text-gray-700">(4) Cross-Border</span>
                  </label>
                </div>
              </div>

              {/* (1) Warehouse Service Fields */}
              {formData.selectedServices?.includes("warehouse") && (
                <div className="border-l-4 border-blue-400 pl-4 space-y-3 bg-blue-50/30 py-3 rounded-r">
                  <h4 className="text-xs font-bold text-blue-900">
                    (1) Warehouse Service
                  </h4>
                  <div>
                    <Label className="text-xs text-gray-700 mb-1.5 block">
                      1. Warehouse location / สถานที่คลัง
                    </Label>
                    <Input
                      value={formData.warehouseSite || ""}
                      onChange={(e) => updateFormData("warehouseSite", e.target.value)}
                      className="h-9 text-sm bg-white"
                      placeholder="เช่น บางพลี, สมุทรปราการ"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-700 mb-1.5 block">
                      2. Storage / การจัดเก็บสินค้า
                    </Label>
                    <Textarea
                      value={formData.storageDetails || ""}
                      onChange={(e) => updateFormData("storageDetails", e.target.value)}
                      className="min-h-[60px] text-sm bg-white resize-none"
                      placeholder="เช่น พื้นที่ 1,000 ตร.ม., Ambient Storage"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-700 mb-1.5 block">
                      3. Handling / การเคลื่อนย้ายสินค้า
                    </Label>
                    <Textarea
                      value={formData.handlingDetails || ""}
                      onChange={(e) => updateFormData("handlingDetails", e.target.value)}
                      className="min-h-[60px] text-sm bg-white resize-none"
                      placeholder="เช่น รับสินค้า, จัดเก็บ, คัดแยก, แพ็คสินค้า"
                    />
                  </div>
                  <div className="pt-2 border-t border-blue-200">
                    <Label className="text-xs text-gray-700 mb-1.5 block flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-blue-600" />
                      <span className="font-semibold">ราคาบริการ Warehouse / Price</span>
                    </Label>
                    <Input
                      type="text"
                      value={formData.warehousePrice || ""}
                      onChange={(e) => updateFormData("warehousePrice", e.target.value)}
                      className="h-9 text-sm bg-white font-medium"
                      placeholder="เช่น 15,000 บาท/เดือน หรือ ตามจริง"
                    />
                  </div>
                </div>
              )}

              {/* (2) Transport Service Fields */}
              {formData.selectedServices?.includes("transport") && (
                <div className="border-l-4 border-purple-400 pl-4 space-y-3 bg-purple-50/30 py-3 rounded-r">
                  <h4 className="text-xs font-bold text-purple-900">
                    (2) Transport Service
                  </h4>
                  <div>
                    <Label className="text-xs text-gray-700 mb-1.5 block">
                      5. Transportation Type / ประเภทการขนส่งสินค้า
                    </Label>
                    <Input
                      value={formData.transportationType || ""}
                      onChange={(e) => updateFormData("transportationType", e.target.value)}
                      className="h-9 text-sm bg-white"
                      placeholder="เช่น รถ 6 ล้อ, รถ 10 ล้อ, รถตู้เย็น"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-gray-700 mb-1.5 block">
                        Route: 1) Origin / ต้นทาง
                      </Label>
                      <Input
                        value={formData.routeOrigin || ""}
                        onChange={(e) => updateFormData("routeOrigin", e.target.value)}
                        className="h-9 text-sm bg-white"
                        placeholder="เช่น กรุงเทพฯ"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-700 mb-1.5 block">
                        Route: 2) Destination / ปลายทาง
                      </Label>
                      <Input
                        value={formData.routeDestination || ""}
                        onChange={(e) => updateFormData("routeDestination", e.target.value)}
                        className="h-9 text-sm bg-white"
                        placeholder="เช่น เชียงใหม่"
                      />
                    </div>
                  </div>
                  <div className="pt-2 border-t border-purple-200">
                    <Label className="text-xs text-gray-700 mb-1.5 block flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-purple-600" />
                      <span className="font-semibold">ราคาบริการ Transport / Price</span>
                    </Label>
                    <Input
                      type="text"
                      value={formData.transportPrice || ""}
                      onChange={(e) => updateFormData("transportPrice", e.target.value)}
                      className="h-9 text-sm bg-white font-medium"
                      placeholder="เช่น 8,000 บาท/เที่ยว หรือ ตามระยะทาง"
                    />
                  </div>
                </div>
              )}

              {/* (3) Freight Service - Air Fields */}
              {formData.selectedServices?.includes("freight-air") && (
                <div className="border-l-4 border-sky-400 pl-4 space-y-3 bg-sky-50/30 py-3 rounded-r">
                  <h4 className="text-xs font-bold text-sky-900">
                    (3) Freight Service - Air
                  </h4>
                  <div>
                    <Label className="text-xs text-gray-700 mb-1.5 block">
                      6. Air Freight / บริการขนส่งทางอากาศ
                    </Label>
                    <Textarea
                      value={formData.airFreightDetails || ""}
                      onChange={(e) => updateFormData("airFreightDetails", e.target.value)}
                      className="min-h-[60px] text-sm bg-white resize-none"
                      placeholder="รายละเอียดการขนส่งทางอากาศ"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-700 mb-1.5 block">
                      INCOTERM
                    </Label>
                    <select
                      value={formData.airFreightIncoterm || ""}
                      onChange={(e) => updateFormData("airFreightIncoterm", e.target.value)}
                      className="w-full h-9 text-sm bg-white border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-[#7BC9A6]"
                    >
                      <option value="">-- เลือก INCOTERM --</option>
                      <option value="EXW">EXW - Ex Works</option>
                      <option value="FCA">FCA - Free Carrier</option>
                      <option value="FAS">FAS - Free Alongside Ship</option>
                      <option value="FOB">FOB - Free On Board</option>
                      <option value="CFR">CFR - Cost and Freight</option>
                      <option value="CIF">CIF - Cost, Insurance and Freight</option>
                      <option value="CPT">CPT - Carriage Paid To</option>
                      <option value="CIP">CIP - Carriage and Insurance Paid To</option>
                      <option value="DAT">DAT - Delivered At Terminal</option>
                      <option value="DAP">DAP - Delivered At Place</option>
                      <option value="DDP">DDP - Delivered Duty Paid</option>
                    </select>
                  </div>
                  <div className="pt-2 border-t border-sky-200">
                    <Label className="text-xs text-gray-700 mb-1.5 block flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-sky-600" />
                      <span className="font-semibold">ราคาบริการ Air Freight / Price</span>
                    </Label>
                    <Input
                      type="text"
                      value={formData.airFreightPrice || ""}
                      onChange={(e) => updateFormData("airFreightPrice", e.target.value)}
                      className="h-9 text-sm bg-white font-medium"
                      placeholder="เช่น 120 บาท/กก. หรือ ตามน้ำหนัก"
                    />
                  </div>
                </div>
              )}

              {/* (3) Freight Service - Sea Fields */}
              {formData.selectedServices?.includes("freight-sea") && (
                <div className="border-l-4 border-cyan-400 pl-4 space-y-3 bg-cyan-50/30 py-3 rounded-r">
                  <h4 className="text-xs font-bold text-cyan-900">
                    (3) Freight Service - Sea
                  </h4>
                  <div>
                    <Label className="text-xs text-gray-700 mb-1.5 block">
                      7. Sea Freight / บริการขนส่งทางทะเล
                    </Label>
                    <Textarea
                      value={formData.seaFreightDetails || ""}
                      onChange={(e) => updateFormData("seaFreightDetails", e.target.value)}
                      className="min-h-[60px] text-sm bg-white resize-none"
                      placeholder="รายละเอียดการขนส่งทางทะเล"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-700 mb-1.5 block">
                      INCOTERM
                    </Label>
                    <select
                      value={formData.seaFreightIncoterm || ""}
                      onChange={(e) => updateFormData("seaFreightIncoterm", e.target.value)}
                      className="w-full h-9 text-sm bg-white border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-[#7BC9A6]"
                    >
                      <option value="">-- เลือก INCOTERM --</option>
                      <option value="EXW">EXW - Ex Works</option>
                      <option value="FCA">FCA - Free Carrier</option>
                      <option value="FAS">FAS - Free Alongside Ship</option>
                      <option value="FOB">FOB - Free On Board</option>
                      <option value="CFR">CFR - Cost and Freight</option>
                      <option value="CIF">CIF - Cost, Insurance and Freight</option>
                      <option value="CPT">CPT - Carriage Paid To</option>
                      <option value="CIP">CIP - Carriage and Insurance Paid To</option>
                      <option value="DAT">DAT - Delivered At Terminal</option>
                      <option value="DAP">DAP - Delivered At Place</option>
                      <option value="DDP">DDP - Delivered Duty Paid</option>
                    </select>
                  </div>
                  <div className="pt-2 border-t border-cyan-200">
                    <Label className="text-xs text-gray-700 mb-1.5 block flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-cyan-600" />
                      <span className="font-semibold">ราคาบริการ Sea Freight / Price</span>
                    </Label>
                    <Input
                      type="text"
                      value={formData.seaFreightPrice || ""}
                      onChange={(e) => updateFormData("seaFreightPrice", e.target.value)}
                      className="h-9 text-sm bg-white font-medium"
                      placeholder="เช่น 2,500 USD/Container หรือ ตามขนาด"
                    />
                  </div>
                </div>
              )}

              {/* (4) Cross-Border Service Fields */}
              {formData.selectedServices?.includes("cross-border") && (
                <div className="border-l-4 border-amber-400 pl-4 space-y-3 bg-amber-50/30 py-3 rounded-r">
                  <h4 className="text-xs font-bold text-amber-900">
                    (4) Cross-Border Service
                  </h4>
                  <div>
                    <Label className="text-xs text-gray-700 mb-1.5 block">
                      8. Cross-Border / บริการข้ามพรมแดน
                    </Label>
                    <Textarea
                      value={formData.crossBorderDetails || ""}
                      onChange={(e) => updateFormData("crossBorderDetails", e.target.value)}
                      className="min-h-[60px] text-sm bg-white resize-none"
                      placeholder="รายละเอียดการขนส่งข้ามพรมแดน (CLMV)"
                    />
                  </div>
                  <div className="pt-2 border-t border-amber-200">
                    <Label className="text-xs text-gray-700 mb-1.5 block flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-amber-600" />
                      <span className="font-semibold">ราคาบริการ Cross-Border / Price</span>
                    </Label>
                    <Input
                      type="text"
                      value={formData.crossBorderPrice || ""}
                      onChange={(e) => updateFormData("crossBorderPrice", e.target.value)}
                      className="h-9 text-sm bg-white font-medium"
                      placeholder="เช่น 25,000 บาท/เที่ยว หรือ ตามเส้นทาง"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Rate Section */}
            <div className="bg-emerald-50/50 rounded-xl p-4 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-emerald-600 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900">
                  3. RATE / อัตราค่าบริการ
                </h3>
              </div>

              {/* Rate Type Selection */}
              <div className="space-y-2 border border-gray-300 rounded-lg p-3">
                <p className="text-xs font-semibold text-gray-700 mb-2">เลือกประเภทอัตราค่าบริการ:</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.rateTypes?.includes("warehousing") || false}
                      onChange={(e) => {
                        const types = formData.rateTypes || [];
                        if (e.target.checked) {
                          updateFormData("rateTypes", JSON.stringify([...types, "warehousing"]));
                        } else {
                          updateFormData("rateTypes", JSON.stringify(types.filter(t => t !== "warehousing")));
                        }
                      }}
                      className="w-4 h-4 text-[#7BC9A6] rounded focus:ring-[#7BC9A6]"
                    />
                    <span className="text-xs text-gray-700">3.1.1 Warehousing Services</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.rateTypes?.includes("transport") || false}
                      onChange={(e) => {
                        const types = formData.rateTypes || [];
                        if (e.target.checked) {
                          updateFormData("rateTypes", JSON.stringify([...types, "transport"]));
                        } else {
                          updateFormData("rateTypes", JSON.stringify(types.filter(t => t !== "transport")));
                        }
                      }}
                      className="w-4 h-4 text-[#7BC9A6] rounded focus:ring-[#7BC9A6]"
                    />
                    <span className="text-xs text-gray-700">3.1.2 Transport Service</span>
                  </label>
                </div>
              </div>

              {/* Warehousing Rate Table */}
              {formData.rateTypes?.includes("warehousing") && (
                <div className="border-l-4 border-emerald-400 pl-4 space-y-3 bg-emerald-50/30 py-3 rounded-r">
                  <h4 className="text-xs font-bold text-emerald-900">
                    3.1.1 Warehousing Services (optional)
                  </h4>
                  <div>
                    <Label className="text-xs text-gray-700 mb-1.5 block">
                      Warehousing Rate Table
                    </Label>
                    <DynamicRateTable
                      tableType="warehousing"
                      data={formData.warehousingRateData ? JSON.parse(formData.warehousingRateData) : { columns: [], rows: [] }}
                      onChange={(data) => updateFormData("warehousingRateData", JSON.stringify(data))}
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-700 mb-1.5 block">
                      Warehousing Remarks (กรอกทีละบรรทัด)
                    </Label>
                    <Textarea
                      value={formData.warehousingRemarks || ""}
                      onChange={(e) => updateFormData("warehousingRemarks", e.target.value)}
                      className="min-h-[100px] text-sm bg-white resize-none"
                      placeholder="1. Remark 1&#10;2. Remark 2"
                    />
                  </div>
                </div>
              )}

              {/* Transport Rate Table */}
              {formData.rateTypes?.includes("transport") && (
                <div className="border-l-4 border-blue-400 pl-4 space-y-3 bg-blue-50/30 py-3 rounded-r">
                  <h4 className="text-xs font-bold text-blue-900">
                    3.1.2 Transport Service (optional)
                  </h4>
                  <div>
                    <Label className="text-xs text-gray-700 mb-1.5 block">
                      Transport Rate Table
                    </Label>
                    <DynamicRateTable
                      tableType="transport"
                      data={formData.transportRateData ? JSON.parse(formData.transportRateData) : { columns: [], rows: [] }}
                      onChange={(data) => updateFormData("transportRateData", JSON.stringify(data))}
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-700 mb-1.5 block">
                      Transport Remarks (กรอกทีละบรรทัด)
                    </Label>
                    <Textarea
                      value={formData.transportRemarks || ""}
                      onChange={(e) => updateFormData("transportRemarks", e.target.value)}
                      className="min-h-[100px] text-sm bg-white resize-none"
                      placeholder="1. Remark 1&#10;2. Remark 2"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Remark */}
            <div className="bg-gray-50/50 rounded-xl p-4 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-gray-600 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Remark / หมายเหตุ
                </h3>
              </div>
              <div>
                <Label className="text-xs text-gray-700 mb-1.5 block">
                  หมายเหตุเพิ่มเติม
                </Label>
                <Textarea
                  value={formData.warehouseRemark || ""}
                  onChange={(e) => updateFormData("warehouseRemark", e.target.value)}
                  className="min-h-[80px] text-sm bg-white resize-none"
                  placeholder="หมายเหตุเพิ่มเติมเกี่ยวกับใบเสนอราคา..."
                />
              </div>
            </div>
      </>
    );
  };

  const renderCustomsFields = () => {
    return (
      <>
        <div className="bg-purple-50/50 rounded-xl p-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-purple-600 flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">Introduction</h3>
          </div>
          <div>
            <Label className="text-xs text-gray-700 mb-1.5 block">คำนำ / Introduction</Label>
            <Textarea value={formData.customsIntroduction || ""} onChange={(e) => updateFormData("customsIntroduction", e.target.value)} className="min-h-[80px] text-sm bg-white resize-none" placeholder="ขอบคุณที่ให้โอกาสเราได้นำเสนอบริการศุลกากร..." />
          </div>
        </div>

        <div className="bg-blue-50/50 rounded-xl p-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">DESCRIPTION / รายละเอียด</h3>
          </div>
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-gray-700 mb-1.5 block">1) Product/ผลิตภัณฑ์</Label>
              <Input value={formData.customsProduct || ""} onChange={(e) => updateFormData("customsProduct", e.target.value)} className="h-9 text-sm bg-white" placeholder="Product Information" />
            </div>
            <div>
              <Label className="text-xs text-gray-700 mb-1.5 block">2) Volume/ปริมาณ</Label>
              <Input value={formData.customsVolume || ""} onChange={(e) => updateFormData("customsVolume", e.target.value)} className="h-9 text-sm bg-white" placeholder="Volume and UOM" />
            </div>
            <div>
              <Label className="text-xs text-gray-700 mb-1.5 block">3) Packaging/ประเภทบรรจุภัณฑ์</Label>
              <Input value={formData.customsPackaging || ""} onChange={(e) => updateFormData("customsPackaging", e.target.value)} className="h-9 text-sm bg-white" placeholder="Packaging" />
            </div>
            <div>
              <Label className="text-xs text-gray-700 mb-1.5 block">4) Temperature/อุณหภูมิ</Label>
              <Input value={formData.customsTemperature || ""} onChange={(e) => updateFormData("customsTemperature", e.target.value)} className="h-9 text-sm bg-white" placeholder="Temperature Control" />
            </div>
          </div>
        </div>

        <div className="bg-orange-50/50 rounded-xl p-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-orange-600 flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">SCOPE OF WORK / ขอบเขตการดำเนินงาน</h3>
          </div>
          <div className="space-y-3">
            <Label className="text-xs text-gray-700 block font-semibold">เลือก Services ที่ต้องการเสนอ และกรอกรายละเอียด</Label>
            <div className="space-y-3 bg-white rounded-lg p-3 border border-gray-200 max-h-[400px] overflow-y-auto">
              <div className="space-y-1.5">
                <label className="flex items-start gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded">
                  <input type="checkbox" checked={formData.selectedServices?.includes("warehouse-location") || false} onChange={(e) => { const current = formData.selectedServices || []; updateFormData("selectedServices", e.target.checked ? [...current, "warehouse-location"] : current.filter(s => s !== "warehouse-location")); }} className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#7BC9A6] focus:ring-[#7BC9A6]" />
                  <span className="text-xs font-medium text-gray-900">Warehouse location / สถานที่คลัง</span>
                </label>
                {formData.selectedServices?.includes("warehouse-location") && (<Input placeholder="ระบุสถานที่คลัง" value={formData.warehouseSite || ""} onChange={(e) => updateFormData("warehouseSite", e.target.value)} className="ml-5 text-xs h-8" />)}
              </div>
              <div className="space-y-1.5">
                <label className="flex items-start gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded">
                  <input type="checkbox" checked={formData.selectedServices?.includes("storage") || false} onChange={(e) => { const current = formData.selectedServices || []; updateFormData("selectedServices", e.target.checked ? [...current, "storage"] : current.filter(s => s !== "storage")); }} className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#7BC9A6] focus:ring-[#7BC9A6]" />
                  <span className="text-xs font-medium text-gray-900">Storage / การจัดเก็บสินค้า</span>
                </label>
                {formData.selectedServices?.includes("storage") && (<Textarea placeholder="รายละเอียดการจัดเก็บ" value={formData.storageDetails || ""} onChange={(e) => updateFormData("storageDetails", e.target.value)} className="ml-5 text-xs min-h-[50px] resize-none" />)}
              </div>
              <div className="space-y-1.5">
                <label className="flex items-start gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded">
                  <input type="checkbox" checked={formData.selectedServices?.includes("handling") || false} onChange={(e) => { const current = formData.selectedServices || []; updateFormData("selectedServices", e.target.checked ? [...current, "handling"] : current.filter(s => s !== "handling")); }} className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#7BC9A6] focus:ring-[#7BC9A6]" />
                  <span className="text-xs font-medium text-gray-900">Handling / การเคลื่อนย้ายสินค้า</span>
                </label>
                {formData.selectedServices?.includes("handling") && (<Textarea placeholder="รายละเอียดการเคลื่อนย้าย" value={formData.handlingDetails || ""} onChange={(e) => updateFormData("handlingDetails", e.target.value)} className="ml-5 text-xs min-h-[50px] resize-none" />)}
              </div>
              <div className="space-y-1.5 border-t pt-2">
                <label className="flex items-start gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded">
                  <input type="checkbox" checked={formData.selectedServices?.includes("other-activity") || false} onChange={(e) => { const current = formData.selectedServices || []; updateFormData("selectedServices", e.target.checked ? [...current, "other-activity"] : current.filter(s => s !== "other-activity")); }} className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#7BC9A6] focus:ring-[#7BC9A6]" />
                  <span className="text-xs font-medium text-gray-900">Other Activity / กิจกรรมอื่น</span>
                </label>
                {formData.selectedServices?.includes("other-activity") && (<Input placeholder="จัดรวม Customs" value={formData.otherActivity || "จัดรวม Customs"} onChange={(e) => updateFormData("otherActivity", e.target.value)} className="ml-5 text-xs h-8" />)}
              </div>
              <div className="space-y-1.5 border-t pt-2">
                <label className="flex items-start gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded">
                  <input type="checkbox" checked={formData.selectedServices?.includes("transportation") || false} onChange={(e) => { const current = formData.selectedServices || []; updateFormData("selectedServices", e.target.checked ? [...current, "transportation"] : current.filter(s => s !== "transportation")); }} className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#7BC9A6] focus:ring-[#7BC9A6]" />
                  <span className="text-xs font-medium text-gray-900">Transportation Type / ประเภทการขนส่งสินค้า</span>
                </label>
                {formData.selectedServices?.includes("transportation") && (<div className="ml-5 space-y-1.5"><Input placeholder="ประเภทการขนส่ง" value={formData.transportationType || ""} onChange={(e) => updateFormData("transportationType", e.target.value)} className="text-xs h-8" /><div className="grid grid-cols-2 gap-2"><Input placeholder="Origin / ต้นทาง" value={formData.routeOrigin || ""} onChange={(e) => updateFormData("routeOrigin", e.target.value)} className="text-xs h-8" /><Input placeholder="Destination / ปลายทาง" value={formData.routeDestination || ""} onChange={(e) => updateFormData("routeDestination", e.target.value)} className="text-xs h-8" /></div></div>)}
              </div>
              <div className="space-y-1.5 border-t pt-2">
                <label className="flex items-start gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded">
                  <input type="checkbox" checked={formData.selectedServices?.includes("air-freight") || false} onChange={(e) => { const current = formData.selectedServices || []; updateFormData("selectedServices", e.target.checked ? [...current, "air-freight"] : current.filter(s => s !== "air-freight")); }} className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#7BC9A6] focus:ring-[#7BC9A6]" />
                  <span className="text-xs font-medium text-gray-900">Air Freight / บริการขนส่งทางอากาศ</span>
                </label>
                {formData.selectedServices?.includes("air-freight") && (<div className="ml-5 space-y-1.5"><Textarea placeholder="รายละเอียด Air Freight" value={formData.airFreightDetails || ""} onChange={(e) => updateFormData("airFreightDetails", e.target.value)} className="text-xs min-h-[50px] resize-none" /><select value={formData.airFreightIncoterm || ""} onChange={(e) => updateFormData("airFreightIncoterm", e.target.value)} className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md"><option value="">เลือก INCOTERM</option><option value="EXW">EXW</option><option value="FCA">FCA</option><option value="FOB">FOB</option><option value="CFR">CFR</option><option value="CIF">CIF</option><option value="CPT">CPT</option><option value="CIP">CIP</option><option value="DAT">DAT</option><option value="DAP">DAP</option><option value="DDP">DDP</option></select></div>)}
              </div>
              <div className="space-y-1.5 border-t pt-2">
                <label className="flex items-start gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded">
                  <input type="checkbox" checked={formData.selectedServices?.includes("sea-freight") || false} onChange={(e) => { const current = formData.selectedServices || []; updateFormData("selectedServices", e.target.checked ? [...current, "sea-freight"] : current.filter(s => s !== "sea-freight")); }} className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#7BC9A6] focus:ring-[#7BC9A6]" />
                  <span className="text-xs font-medium text-gray-900">Sea Freight / บริการขนส่งทางทะเล</span>
                </label>
                {formData.selectedServices?.includes("sea-freight") && (<div className="ml-5 space-y-1.5"><Textarea placeholder="รายละเอียด Sea Freight" value={formData.seaFreightDetails || ""} onChange={(e) => updateFormData("seaFreightDetails", e.target.value)} className="text-xs min-h-[50px] resize-none" /><select value={formData.seaFreightIncoterm || ""} onChange={(e) => updateFormData("seaFreightIncoterm", e.target.value)} className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md"><option value="">เลือก INCOTERM</option><option value="EXW">EXW</option><option value="FCA">FCA</option><option value="FOB">FOB</option><option value="CFR">CFR</option><option value="CIF">CIF</option><option value="CPT">CPT</option><option value="CIP">CIP</option><option value="DAT">DAT</option><option value="DAP">DAP</option><option value="DDP">DDP</option></select></div>)}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-emerald-50/50 rounded-xl p-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-emerald-600 flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">RATE / อัตราค่าบริการ</h3>
          </div>

          {/* Quick Price Summary */}
          <div className="bg-white rounded-lg p-3 border-2 border-emerald-200 space-y-2">
            <Label className="text-xs font-semibold text-emerald-900 flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              ราคาสรุป (ถ้าไม่ต้องการใช้ตารางราคาด้านล่าง)
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-gray-600 mb-1 block">Customs Service Price</Label>
                <Input
                  type="text"
                  value={formData.customsServicePrice || ""}
                  onChange={(e) => updateFormData("customsServicePrice", e.target.value)}
                  className="h-8 text-sm font-medium"
                  placeholder="เช่น 5,000 บาท/ครั้ง"
                />
              </div>
              <div>
                <Label className="text-xs text-gray-600 mb-1 block">License Service Price</Label>
                <Input
                  type="text"
                  value={formData.licenseServicePrice || ""}
                  onChange={(e) => updateFormData("licenseServicePrice", e.target.value)}
                  className="h-8 text-sm font-medium"
                  placeholder="เช่น 3,000 บาท/รายการ"
                />
              </div>
            </div>
          </div>
          
          <div>
            <Label className="text-xs text-gray-700 mb-1.5 block font-semibold">LICENSE RATE (ตารางรายละเอียด - Optional)</Label>
            <DynamicRateTable tableType="license" data={formData.licenseRateData ? JSON.parse(formData.licenseRateData) : { columns: [], rows: [] }} onChange={(data) => updateFormData("licenseRateData", JSON.stringify(data))} />
          </div>

          <div>
            <Label className="text-xs text-gray-700 mb-1.5 block font-semibold">CUSTOMS RATE (ตารางรายละเอียด - Optional)</Label>
            <DynamicRateTable tableType="customs" data={formData.customsRateData ? JSON.parse(formData.customsRateData) : { columns: [], rows: [] }} onChange={(data) => updateFormData("customsRateData", JSON.stringify(data))} />
          </div>

          <div>
            <Label className="text-xs text-gray-700 mb-1.5 block font-semibold">CUSTOMS RATE AND LICENSE RATE (ตารางรวม - Optional)</Label>
            <DynamicRateTable tableType="customs-license" data={formData.customsLicenseRateData ? JSON.parse(formData.customsLicenseRateData) : { columns: [], rows: [] }} onChange={(data) => updateFormData("customsLicenseRateData", JSON.stringify(data))} />
          </div>
        </div>

        {/* Terms & Conditions Section */}
        <div className="bg-yellow-50/50 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-yellow-600 flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">TERMS & CONDITIONS / เงื่อนไข</h3>
          </div>
          <div>
            <Label className="text-xs text-gray-700 mb-1.5 block">เงื่อนไขการให้บริการ</Label>
            <Textarea
              value={formData.customsTermsAndConditions || ""}
              onChange={(e) => updateFormData("customsTermsAndConditions", e.target.value)}
              className="min-h-[120px] text-sm bg-white resize-none"
              placeholder="กรอกเงื่อนไขการให้บริการ เช่น&#10;1. ราคาดังกล่าวยังไม่รวมภาษีมูลค่าเพิ่ม 7%&#10;2. เงื่อนไขการชำระเงิน: เครดิต 30 วัน&#10;3. ราคาอาจมีการเปลี่ยนแปลงตามอัตราแลกเปลี่ยน"
            />
          </div>
        </div>
      </>
    );
  };

  const renderCrossBorderFields = () => {
    return (
      <>
        <div className="bg-purple-50/50 rounded-xl p-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-purple-600 flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">Introduction</h3>
          </div>
          <div>
            <Label className="text-xs text-gray-700 mb-1.5 block">คำนำ / Introduction</Label>
            <Textarea value={formData.crossBorderIntroduction || ""} onChange={(e) => updateFormData("crossBorderIntroduction", e.target.value)} className="min-h-[80px] text-sm bg-white resize-none" placeholder="ขอบคุณที่ให้โอกาสเราได้นำเสนอบริการข้ามพรมแดน..." />
          </div>
        </div>

        <div className="bg-blue-50/50 rounded-xl p-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">DESCRIPTION / รายละเอียด</h3>
          </div>
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-gray-700 mb-1.5 block">1) Product/ผลิตภัณฑ์</Label>
              <Input value={formData.crossBorderProduct || ""} onChange={(e) => updateFormData("crossBorderProduct", e.target.value)} className="h-9 text-sm bg-white" placeholder="Product Information" />
            </div>
            <div>
              <Label className="text-xs text-gray-700 mb-1.5 block">2) Volume/ปริมาณ</Label>
              <Input value={formData.crossBorderVolume || ""} onChange={(e) => updateFormData("crossBorderVolume", e.target.value)} className="h-9 text-sm bg-white" placeholder="Volume and UOM" />
            </div>
            <div>
              <Label className="text-xs text-gray-700 mb-1.5 block">3) Packaging/ประเภทบรรจุภัณฑ์</Label>
              <Input value={formData.crossBorderPackaging || ""} onChange={(e) => updateFormData("crossBorderPackaging", e.target.value)} className="h-9 text-sm bg-white" placeholder="Packaging" />
            </div>
            <div>
              <Label className="text-xs text-gray-700 mb-1.5 block">4) Temperature/อุณหภูมิ</Label>
              <Input value={formData.crossBorderTemperature || ""} onChange={(e) => updateFormData("crossBorderTemperature", e.target.value)} className="h-9 text-sm bg-white" placeholder="Temperature Control" />
            </div>
          </div>
        </div>

        <div className="bg-orange-50/50 rounded-xl p-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-orange-600 flex items-center justify-center">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">SCOPE OF WORK / ขอบเขตการดำเนินงาน</h3>
          </div>
          
          <div className="space-y-3 bg-white rounded-lg p-3 border border-gray-200 max-h-[400px] overflow-y-auto">
            <div className="space-y-1.5">
              <label className="flex items-start gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded">
                <input type="checkbox" checked={formData.crossBorderServices?.includes("warehouse-location") || false} onChange={(e) => { const current = formData.crossBorderServices || []; updateFormData("crossBorderServices", e.target.checked ? [...current, "warehouse-location"] : current.filter(s => s !== "warehouse-location")); }} className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#7BC9A6] focus:ring-[#7BC9A6]" />
                <span className="text-xs font-medium text-gray-900">Warehouse location / สถานที่คลัง</span>
              </label>
              {formData.crossBorderServices?.includes("warehouse-location") && (<Input placeholder="ระบุสถานที่คลัง" value={formData.crossBorderWarehouseSite || ""} onChange={(e) => updateFormData("crossBorderWarehouseSite", e.target.value)} className="ml-5 text-xs h-8" />)}
            </div>
            <div className="space-y-1.5">
              <label className="flex items-start gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded">
                <input type="checkbox" checked={formData.crossBorderServices?.includes("storage") || false} onChange={(e) => { const current = formData.crossBorderServices || []; updateFormData("crossBorderServices", e.target.checked ? [...current, "storage"] : current.filter(s => s !== "storage")); }} className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#7BC9A6] focus:ring-[#7BC9A6]" />
                <span className="text-xs font-medium text-gray-900">Storage / การจัดเก็บสินค้า</span>
              </label>
              {formData.crossBorderServices?.includes("storage") && (<Textarea placeholder="รายละเอียดการจัดเก็บ" value={formData.crossBorderStorageDetails || ""} onChange={(e) => updateFormData("crossBorderStorageDetails", e.target.value)} className="ml-5 text-xs min-h-[50px] resize-none" />)}
            </div>
            <div className="space-y-1.5">
              <label className="flex items-start gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded">
                <input type="checkbox" checked={formData.crossBorderServices?.includes("handling") || false} onChange={(e) => { const current = formData.crossBorderServices || []; updateFormData("crossBorderServices", e.target.checked ? [...current, "handling"] : current.filter(s => s !== "handling")); }} className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#7BC9A6] focus:ring-[#7BC9A6]" />
                <span className="text-xs font-medium text-gray-900">Handling / การเคลื่อนย้ายสินค้า</span>
              </label>
              {formData.crossBorderServices?.includes("handling") && (<Textarea placeholder="รายละเอียดการเคลื่อนย้าย" value={formData.crossBorderHandlingDetails || ""} onChange={(e) => updateFormData("crossBorderHandlingDetails", e.target.value)} className="ml-5 text-xs min-h-[50px] resize-none" />)}
            </div>
            <div className="space-y-1.5 border-t pt-2">
              <label className="flex items-start gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded">
                <input type="checkbox" checked={formData.crossBorderServices?.includes("other-activity") || false} onChange={(e) => { const current = formData.crossBorderServices || []; updateFormData("crossBorderServices", e.target.checked ? [...current, "other-activity"] : current.filter(s => s !== "other-activity")); }} className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#7BC9A6] focus:ring-[#7BC9A6]" />
                <span className="text-xs font-medium text-gray-900">Other Activity / กิจกรรมอื่น</span>
              </label>
              {formData.crossBorderServices?.includes("other-activity") && (<Input placeholder="จัดรวม Customs" value={formData.crossBorderOtherActivity || "จัดรวม Customs"} onChange={(e) => updateFormData("crossBorderOtherActivity", e.target.value)} className="ml-5 text-xs h-8" />)}
            </div>
            <div className="space-y-1.5 border-t pt-2">
              <label className="flex items-start gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded">
                <input type="checkbox" checked={formData.crossBorderServices?.includes("transportation") || false} onChange={(e) => { const current = formData.crossBorderServices || []; updateFormData("crossBorderServices", e.target.checked ? [...current, "transportation"] : current.filter(s => s !== "transportation")); }} className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#7BC9A6] focus:ring-[#7BC9A6]" />
                <span className="text-xs font-medium text-gray-900">Transportation Type / ประเภทการขนส่งสินค้า</span>
              </label>
              {formData.crossBorderServices?.includes("transportation") && (<div className="ml-5 space-y-1.5"><Input placeholder="ประเภทการขนส่ง" value={formData.crossBorderTransportationType || ""} onChange={(e) => updateFormData("crossBorderTransportationType", e.target.value)} className="text-xs h-8" /><div className="grid grid-cols-2 gap-2"><Input placeholder="Origin / ต้นทาง" value={formData.crossBorderRouteOrigin || ""} onChange={(e) => updateFormData("crossBorderRouteOrigin", e.target.value)} className="text-xs h-8" /><Input placeholder="Destination / ปลายทาง" value={formData.crossBorderRouteDestination || ""} onChange={(e) => updateFormData("crossBorderRouteDestination", e.target.value)} className="text-xs h-8" /></div></div>)}
            </div>
            <div className="space-y-1.5 border-t pt-2">
              <label className="flex items-start gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded">
                <input type="checkbox" checked={formData.crossBorderServices?.includes("air-freight") || false} onChange={(e) => { const current = formData.crossBorderServices || []; updateFormData("crossBorderServices", e.target.checked ? [...current, "air-freight"] : current.filter(s => s !== "air-freight")); }} className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#7BC9A6] focus:ring-[#7BC9A6]" />
                <span className="text-xs font-medium text-gray-900">Air Freight / บริการขนส่งทางอากาศ</span>
              </label>
              {formData.crossBorderServices?.includes("air-freight") && (<div className="ml-5 space-y-1.5"><Textarea placeholder="รายละเอียด Air Freight" value={formData.crossBorderAirFreightDetails || ""} onChange={(e) => updateFormData("crossBorderAirFreightDetails", e.target.value)} className="text-xs min-h-[50px] resize-none" /><select value={formData.crossBorderAirFreightIncoterm || ""} onChange={(e) => updateFormData("crossBorderAirFreightIncoterm", e.target.value)} className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md"><option value="">เลือก INCOTERM</option><option value="EXW">EXW</option><option value="FCA">FCA</option><option value="FAS">FAS</option><option value="FOB">FOB</option><option value="CFR">CFR</option><option value="CIF">CIF</option><option value="CPT">CPT</option><option value="CIP">CIP</option><option value="DAT">DAT</option><option value="DAP">DAP</option><option value="DDP">DDP</option></select></div>)}
            </div>
            <div className="space-y-1.5 border-t pt-2">
              <label className="flex items-start gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded">
                <input type="checkbox" checked={formData.crossBorderServices?.includes("sea-freight") || false} onChange={(e) => { const current = formData.crossBorderServices || []; updateFormData("crossBorderServices", e.target.checked ? [...current, "sea-freight"] : current.filter(s => s !== "sea-freight")); }} className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#7BC9A6] focus:ring-[#7BC9A6]" />
                <span className="text-xs font-medium text-gray-900">Sea Freight / บริการขนส่งทางทะเล</span>
              </label>
              {formData.crossBorderServices?.includes("sea-freight") && (<div className="ml-5 space-y-1.5"><Textarea placeholder="รายละเอียด Sea Freight" value={formData.crossBorderSeaFreightDetails || ""} onChange={(e) => updateFormData("crossBorderSeaFreightDetails", e.target.value)} className="text-xs min-h-[50px] resize-none" /><select value={formData.crossBorderSeaFreightIncoterm || ""} onChange={(e) => updateFormData("crossBorderSeaFreightIncoterm", e.target.value)} className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md"><option value="">เลือก INCOTERM</option><option value="EXW">EXW</option><option value="FCA">FCA</option><option value="FAS">FAS</option><option value="FOB">FOB</option><option value="CFR">CFR</option><option value="CIF">CIF</option><option value="CPT">CPT</option><option value="CIP">CIP</option><option value="DAT">DAT</option><option value="DAP">DAP</option><option value="DDP">DDP</option></select></div>)}
            </div>
            <div className="space-y-1.5 border-t pt-2">
              <Label className="text-xs font-medium text-gray-700">Custom Service Items / รายการบริการเพิ่มเติม</Label>
              {(formData.crossBorderCustomServices || []).map((service: any, index: number) => (<div key={index} className="flex gap-2 items-start bg-gray-50 p-2 rounded"><div className="flex-1 space-y-1"><Input placeholder="Service name / ชื่อบริการ" value={service.name || ""} onChange={(e) => { const updated = [...(formData.crossBorderCustomServices || [])]; updated[index] = { ...updated[index], name: e.target.value }; updateFormData("crossBorderCustomServices", updated); }} className="text-xs h-8" /><Textarea placeholder="Details / รายละเอียด" value={service.details || ""} onChange={(e) => { const updated = [...(formData.crossBorderCustomServices || [])]; updated[index] = { ...updated[index], details: e.target.value }; updateFormData("crossBorderCustomServices", updated); }} className="text-xs min-h-[50px] resize-none" /></div><button type="button" onClick={() => { const updated = (formData.crossBorderCustomServices || []).filter((_: any, i: number) => i !== index); updateFormData("crossBorderCustomServices", updated); }} className="text-red-500 hover:text-red-700 p-1"><X className="w-4 h-4" /></button></div>))}
              <button type="button" onClick={() => { const current = formData.crossBorderCustomServices || []; updateFormData("crossBorderCustomServices", [...current, { name: "", details: "" }]); }} className="text-xs text-[#7BC9A6] hover:text-[#6AB896] font-medium flex items-center gap-1"><Plus className="w-3 h-3" /> Add Custom Service</button>
            </div>
          </div>
        </div>

        <div className="bg-emerald-50/50 rounded-xl p-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-emerald-600 flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">RATE / อัตราค่าบริการ</h3>
          </div>

          {/* Quick Price Summary */}
          <div className="bg-white rounded-lg p-3 border-2 border-emerald-200">
            <Label className="text-xs font-semibold text-emerald-900 flex items-center gap-1 mb-2">
              <DollarSign className="w-4 h-4" />
              ราคาสรุปบริการ Cross-Border (ถ้าไม่ต้องการใช้ตารางด้านล่าง)
            </Label>
            <Input
              type="text"
              value={formData.crossBorderServicePrice || ""}
              onChange={(e) => updateFormData("crossBorderServicePrice", e.target.value)}
              className="h-9 text-sm font-medium"
              placeholder="เช่น 25,000 บาท/เที่ยว หรือ ตามระยะทาง"
            />
          </div>

          <div>
            <Label className="text-xs text-gray-700 mb-1.5 block">Cross-Border Rate Table (ตารางรายละเอียด - Optional)</Label>
            <DynamicRateTable tableType="crossborder" data={formData.crossBorderRateData ? JSON.parse(formData.crossBorderRateData) : { columns: [], rows: [] }} onChange={(data) => updateFormData("crossBorderRateData", JSON.stringify(data))} />
          </div>
        </div>

        {/* Terms & Conditions Section */}
        <div className="bg-yellow-50/50 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-yellow-600 flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">TERMS & CONDITIONS / เงื่อนไข</h3>
          </div>
          <div>
            <Label className="text-xs text-gray-700 mb-1.5 block">เงื่อนไขการให้บริการ Cross-Border</Label>
            <Textarea
              value={formData.crossBorderTermsAndConditions || ""}
              onChange={(e) => updateFormData("crossBorderTermsAndConditions", e.target.value)}
              className="min-h-[120px] text-sm bg-white resize-none"
              placeholder="กรอกเงื่อนไขการให้บริการ Cross-Border เช่น&#10;1. ราคาดังกล่าวยังไม่รวมภาษีมูลค่าเพิ่ม 7%&#10;2. ราคาไม่รวมค่าธรรมเนียมด่านศุลกากร&#10;3. เงื่อนไขการชำระเงิน: เครดิต 30 วัน"
            />
          </div>
        </div>
      </>
    );
  };

  const renderInternationalFreightFields = () => {
    return (
      <>
        <div className="bg-purple-50/50 rounded-xl p-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-purple-600 flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">Introduction</h3>
          </div>
          <div>
            <Label className="text-xs text-gray-700 mb-1.5 block">คำนำ / Introduction</Label>
            <Textarea value={formData.internationalIntroduction || ""} onChange={(e) => updateFormData("internationalIntroduction", e.target.value)} className="min-h-[80px] text-sm bg-white resize-none" placeholder="ขอบคุณที่ให้โอกาสเราได้นำเสนอบริการระหว่างประเทศ..." />
          </div>
        </div>

        <div className="bg-blue-50/50 rounded-xl p-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">DESCRIPTION / รายละเอียด</h3>
          </div>
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-gray-700 mb-1.5 block">1) Product/ผลิตภัณฑ์</Label>
              <Input value={formData.internationalProduct || ""} onChange={(e) => updateFormData("internationalProduct", e.target.value)} className="h-9 text-sm bg-white" placeholder="Product Information" />
            </div>
            <div>
              <Label className="text-xs text-gray-700 mb-1.5 block">2) Volume/ปริมาณ</Label>
              <Input value={formData.internationalVolume || ""} onChange={(e) => updateFormData("internationalVolume", e.target.value)} className="h-9 text-sm bg-white" placeholder="Volume and UOM" />
            </div>
            <div>
              <Label className="text-xs text-gray-700 mb-1.5 block">3) Packaging/ประเภทบรรจุภัณฑ์</Label>
              <Input value={formData.internationalPackaging || ""} onChange={(e) => updateFormData("internationalPackaging", e.target.value)} className="h-9 text-sm bg-white" placeholder="Packaging" />
            </div>
            <div>
              <Label className="text-xs text-gray-700 mb-1.5 block">4) Temperature/อุณหภูมิ</Label>
              <Input value={formData.internationalTemperature || ""} onChange={(e) => updateFormData("internationalTemperature", e.target.value)} className="h-9 text-sm bg-white" placeholder="Temperature Control" />
            </div>
          </div>
        </div>

        <div className="bg-orange-50/50 rounded-xl p-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-orange-600 flex items-center justify-center">
              <Plane className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">SCOPE OF WORK / ขอบเขตการดำเนินงาน</h3>
          </div>
          
          <div className="space-y-3 bg-white rounded-lg p-3 border border-gray-200 max-h-[400px] overflow-y-auto">
            <div className="space-y-1.5">
              <label className="flex items-start gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded">
                <input type="checkbox" checked={formData.internationalServices?.includes("warehouse-location") || false} onChange={(e) => { const current = formData.internationalServices || []; updateFormData("internationalServices", e.target.checked ? [...current, "warehouse-location"] : current.filter(s => s !== "warehouse-location")); }} className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#7BC9A6] focus:ring-[#7BC9A6]" />
                <span className="text-xs font-medium text-gray-900">Warehouse location / สถานที่คลัง</span>
              </label>
              {formData.internationalServices?.includes("warehouse-location") && (<Input placeholder="ระบุสถานที่คลัง" value={formData.internationalWarehouseSite || ""} onChange={(e) => updateFormData("internationalWarehouseSite", e.target.value)} className="ml-5 text-xs h-8" />)}
            </div>
            <div className="space-y-1.5">
              <label className="flex items-start gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded">
                <input type="checkbox" checked={formData.internationalServices?.includes("storage") || false} onChange={(e) => { const current = formData.internationalServices || []; updateFormData("internationalServices", e.target.checked ? [...current, "storage"] : current.filter(s => s !== "storage")); }} className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#7BC9A6] focus:ring-[#7BC9A6]" />
                <span className="text-xs font-medium text-gray-900">Storage / การจัดเก็บสินค้า</span>
              </label>
              {formData.internationalServices?.includes("storage") && (<Textarea placeholder="รายละเอียดการจัดเก็บ" value={formData.internationalStorageDetails || ""} onChange={(e) => updateFormData("internationalStorageDetails", e.target.value)} className="ml-5 text-xs min-h-[50px] resize-none" />)}
            </div>
            <div className="space-y-1.5">
              <label className="flex items-start gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded">
                <input type="checkbox" checked={formData.internationalServices?.includes("handling") || false} onChange={(e) => { const current = formData.internationalServices || []; updateFormData("internationalServices", e.target.checked ? [...current, "handling"] : current.filter(s => s !== "handling")); }} className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#7BC9A6] focus:ring-[#7BC9A6]" />
                <span className="text-xs font-medium text-gray-900">Handling / การเคลื่อนย้ายสินค้า</span>
              </label>
              {formData.internationalServices?.includes("handling") && (<Textarea placeholder="รายละเอียดการเคลื่อนย้าย" value={formData.internationalHandlingDetails || ""} onChange={(e) => updateFormData("internationalHandlingDetails", e.target.value)} className="ml-5 text-xs min-h-[50px] resize-none" />)}
            </div>
            <div className="space-y-1.5 border-t pt-2">
              <label className="flex items-start gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded">
                <input type="checkbox" checked={formData.internationalServices?.includes("other-activity") || false} onChange={(e) => { const current = formData.internationalServices || []; updateFormData("internationalServices", e.target.checked ? [...current, "other-activity"] : current.filter(s => s !== "other-activity")); }} className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#7BC9A6] focus:ring-[#7BC9A6]" />
                <span className="text-xs font-medium text-gray-900">Other Activity / กิจกรรมอื่น</span>
              </label>
              {formData.internationalServices?.includes("other-activity") && (<Input placeholder="จัดรวม Customs" value={formData.internationalOtherActivity || "จัดรวม Customs"} onChange={(e) => updateFormData("internationalOtherActivity", e.target.value)} className="ml-5 text-xs h-8" />)}
            </div>
            <div className="space-y-1.5 border-t pt-2">
              <label className="flex items-start gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded">
                <input type="checkbox" checked={formData.internationalServices?.includes("transportation") || false} onChange={(e) => { const current = formData.internationalServices || []; updateFormData("internationalServices", e.target.checked ? [...current, "transportation"] : current.filter(s => s !== "transportation")); }} className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#7BC9A6] focus:ring-[#7BC9A6]" />
                <span className="text-xs font-medium text-gray-900">Transportation Type / ประเภทการขนส่งสินค้า</span>
              </label>
              {formData.internationalServices?.includes("transportation") && (<div className="ml-5 space-y-1.5"><Input placeholder="ประเภทการขนส่ง" value={formData.internationalTransportationType || ""} onChange={(e) => updateFormData("internationalTransportationType", e.target.value)} className="text-xs h-8" /><div className="grid grid-cols-2 gap-2"><Input placeholder="Origin / ต้นทาง" value={formData.internationalRouteOrigin || ""} onChange={(e) => updateFormData("internationalRouteOrigin", e.target.value)} className="text-xs h-8" /><Input placeholder="Destination / ปลายทาง" value={formData.internationalRouteDestination || ""} onChange={(e) => updateFormData("internationalRouteDestination", e.target.value)} className="text-xs h-8" /></div></div>)}
            </div>
            <div className="space-y-1.5 border-t pt-2">
              <label className="flex items-start gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded">
                <input type="checkbox" checked={formData.internationalServices?.includes("air-freight") || false} onChange={(e) => { const current = formData.internationalServices || []; updateFormData("internationalServices", e.target.checked ? [...current, "air-freight"] : current.filter(s => s !== "air-freight")); }} className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#7BC9A6] focus:ring-[#7BC9A6]" />
                <span className="text-xs font-medium text-gray-900">Air Freight / บริการขนส่งทางอากาศ</span>
              </label>
              {formData.internationalServices?.includes("air-freight") && (<div className="ml-5 space-y-1.5"><Textarea placeholder="รายละเอียด Air Freight" value={formData.internationalAirFreightDetails || ""} onChange={(e) => updateFormData("internationalAirFreightDetails", e.target.value)} className="text-xs min-h-[50px] resize-none" /><select value={formData.internationalAirFreightIncoterm || ""} onChange={(e) => updateFormData("internationalAirFreightIncoterm", e.target.value)} className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md"><option value="">เลือก INCOTERM</option><option value="EXW">EXW</option><option value="FCA">FCA</option><option value="FAS">FAS</option><option value="FOB">FOB</option><option value="CFR">CFR</option><option value="CIF">CIF</option><option value="CPT">CPT</option><option value="CIP">CIP</option><option value="DAT">DAT</option><option value="DAP">DAP</option><option value="DDP">DDP</option></select></div>)}
            </div>
            <div className="space-y-1.5 border-t pt-2">
              <label className="flex items-start gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded">
                <input type="checkbox" checked={formData.internationalServices?.includes("sea-freight") || false} onChange={(e) => { const current = formData.internationalServices || []; updateFormData("internationalServices", e.target.checked ? [...current, "sea-freight"] : current.filter(s => s !== "sea-freight")); }} className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#7BC9A6] focus:ring-[#7BC9A6]" />
                <span className="text-xs font-medium text-gray-900">Sea Freight / บริการขนส่งทางทะเล</span>
              </label>
              {formData.internationalServices?.includes("sea-freight") && (<div className="ml-5 space-y-1.5"><Textarea placeholder="รายละเอียด Sea Freight" value={formData.internationalSeaFreightDetails || ""} onChange={(e) => updateFormData("internationalSeaFreightDetails", e.target.value)} className="text-xs min-h-[50px] resize-none" /><select value={formData.internationalSeaFreightIncoterm || ""} onChange={(e) => updateFormData("internationalSeaFreightIncoterm", e.target.value)} className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md"><option value="">เลือก INCOTERM</option><option value="EXW">EXW</option><option value="FCA">FCA</option><option value="FAS">FAS</option><option value="FOB">FOB</option><option value="CFR">CFR</option><option value="CIF">CIF</option><option value="CPT">CPT</option><option value="CIP">CIP</option><option value="DAT">DAT</option><option value="DAP">DAP</option><option value="DDP">DDP</option></select></div>)}
            </div>
            <div className="space-y-1.5 border-t pt-2">
              <Label className="text-xs font-medium text-gray-700">Custom Service Items / รายการบริการเพิ่มเติม</Label>
              {(formData.internationalCustomServices || []).map((service: any, index: number) => (<div key={index} className="flex gap-2 items-start bg-gray-50 p-2 rounded"><div className="flex-1 space-y-1"><Input placeholder="Service name / ชื่อบริการ" value={service.name || ""} onChange={(e) => { const updated = [...(formData.internationalCustomServices || [])]; updated[index] = { ...updated[index], name: e.target.value }; updateFormData("internationalCustomServices", updated); }} className="text-xs h-8" /><Textarea placeholder="Details / รายละเอียด" value={service.details || ""} onChange={(e) => { const updated = [...(formData.internationalCustomServices || [])]; updated[index] = { ...updated[index], details: e.target.value }; updateFormData("internationalCustomServices", updated); }} className="text-xs min-h-[50px] resize-none" /></div><button type="button" onClick={() => { const updated = (formData.internationalCustomServices || []).filter((_: any, i: number) => i !== index); updateFormData("internationalCustomServices", updated); }} className="text-red-500 hover:text-red-700 p-1"><X className="w-4 h-4" /></button></div>))}
              <button type="button" onClick={() => { const current = formData.internationalCustomServices || []; updateFormData("internationalCustomServices", [...current, { name: "", details: "" }]); }} className="text-xs text-[#7BC9A6] hover:text-[#6AB896] font-medium flex items-center gap-1"><Plus className="w-3 h-3" /> Add Custom Service</button>
            </div>
          </div>
        </div>

        <div className="bg-emerald-50/50 rounded-xl p-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-emerald-600 flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">RATE / อัตราค่าบริการ</h3>
          </div>

          {/* Quick Price Summary */}
          <div className="bg-white rounded-lg p-3 border-2 border-emerald-200">
            <Label className="text-xs font-semibold text-emerald-900 flex items-center gap-1 mb-2">
              <DollarSign className="w-4 h-4" />
              ราคาสรุปบริการระหว่างประเทศ (ถ้าไม่ต้องการใช้ตารางด้านล่าง)
            </Label>
            <Input
              type="text"
              value={formData.internationalServicePrice || ""}
              onChange={(e) => updateFormData("internationalServicePrice", e.target.value)}
              className="h-9 text-sm font-medium"
              placeholder="เช่น 50,000 บาท/เที่ยว หรือ ตามน้ำหนัก/ปริมาตร"
            />
          </div>

          <div>
            <Label className="text-xs text-gray-700 mb-1.5 block">AIR FREIGHT RATE (EXPORT) - ตารางรายละเอียด (Optional)</Label>
            <DynamicRateTable tableType="international" data={formData.internationalRateData ? JSON.parse(formData.internationalRateData) : { columns: [], rows: [] }} onChange={(data) => updateFormData("internationalRateData", JSON.stringify(data))} />
            <div className="mt-2">
              <Label className="text-xs text-gray-600 mb-1 block">Remark / หมายเหตุ</Label>
              <Textarea value={formData.airFreightExportRemark || ""} onChange={(e) => updateFormData("airFreightExportRemark", e.target.value)} placeholder="Enter remarks for Air Freight Export..." className="text-xs min-h-[60px] resize-y" />
            </div>
          </div>
          <div>
            <Label className="text-xs text-gray-700 mb-1.5 block">AIR FREIGHT RATE (IMPORT) - ตารางรายละเอียด (Optional)</Label>
            <DynamicRateTable tableType="international" data={formData.airFreightImportRateData ? JSON.parse(formData.airFreightImportRateData) : { columns: [], rows: [] }} onChange={(data) => updateFormData("airFreightImportRateData", JSON.stringify(data))} />
            <div className="mt-2">
              <Label className="text-xs text-gray-600 mb-1 block">Remark / หมายเหตุ</Label>
              <Textarea value={formData.airFreightImportRemark || ""} onChange={(e) => updateFormData("airFreightImportRemark", e.target.value)} placeholder="Enter remarks for Air Freight Import..." className="text-xs min-h-[60px] resize-y" />
            </div>
          </div>
          <div>
            <Label className="text-xs text-gray-700 mb-1.5 block">SEA FREIGHT RATE (EXPORT) - ตารางรายละเอียด (Optional)</Label>
            <DynamicRateTable tableType="sea-freight" data={formData.seaFreightExportRateData ? JSON.parse(formData.seaFreightExportRateData) : { columns: [], rows: [] }} onChange={(data) => updateFormData("seaFreightExportRateData", JSON.stringify(data))} />
            <div className="mt-2">
              <Label className="text-xs text-gray-600 mb-1 block">Remark / หมายเหตุ</Label>
              <Textarea value={formData.seaFreightExportRemark || ""} onChange={(e) => updateFormData("seaFreightExportRemark", e.target.value)} placeholder="Enter remarks for Sea Freight Export..." className="text-xs min-h-[60px] resize-y" />
            </div>
          </div>
          <div>
            <Label className="text-xs text-gray-700 mb-1.5 block">SEA FREIGHT RATE (IMPORT) - ตารางรายละเอียด (Optional)</Label>
            <DynamicRateTable tableType="sea-freight" data={formData.seaFreightImportRateData ? JSON.parse(formData.seaFreightImportRateData) : { columns: [], rows: [] }} onChange={(data) => updateFormData("seaFreightImportRateData", JSON.stringify(data))} />
            <div className="mt-2">
              <Label className="text-xs text-gray-600 mb-1 block">Remark / หมายเหตุ</Label>
              <Textarea value={formData.seaFreightImportRemark || ""} onChange={(e) => updateFormData("seaFreightImportRemark", e.target.value)} placeholder="Enter remarks for Sea Freight Import..." className="text-xs min-h-[60px] resize-y" />
            </div>
          </div>
          <div>
            <Label className="text-xs text-gray-700 mb-1.5 block">CUSTOMS RATE - ตารางรายละเอียด (Optional)</Label>
            <DynamicRateTable tableType="warehousing" data={formData.internationalCustomsRateData ? JSON.parse(formData.internationalCustomsRateData) : { columns: [], rows: [] }} onChange={(data) => updateFormData("internationalCustomsRateData", JSON.stringify(data))} />
            <div className="mt-2">
              <Label className="text-xs text-gray-600 mb-1 block">Remark / หมายเหตุ</Label>
              <Textarea value={formData.customsRateRemark || ""} onChange={(e) => updateFormData("customsRateRemark", e.target.value)} placeholder="Enter remarks for Customs Rate..." className="text-xs min-h-[60px] resize-y" />
            </div>
          </div>
          <div>
            <Label className="text-xs text-gray-700 mb-1.5 block">LICENSE RATE - ตารางรายละเอียด (Optional)</Label>
            <DynamicRateTable tableType="warehousing" data={formData.internationalLicenseRateData ? JSON.parse(formData.internationalLicenseRateData) : { columns: [], rows: [] }} onChange={(data) => updateFormData("internationalLicenseRateData", JSON.stringify(data))} />
            <div className="mt-2">
              <Label className="text-xs text-gray-600 mb-1 block">Remark / หมายเหตุ</Label>
              <Textarea value={formData.licenseRateRemark || ""} onChange={(e) => updateFormData("licenseRateRemark", e.target.value)} placeholder="Enter remarks for License Rate..." className="text-xs min-h-[60px] resize-y" />
            </div>
          </div>
        </div>

        {/* Terms & Conditions Section */}
        <div className="bg-yellow-50/50 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-yellow-600 flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">TERMS & CONDITIONS / เงื่อนไข</h3>
          </div>
          <div>
            <Label className="text-xs text-gray-700 mb-1.5 block">เงื่อนไขการให้บริการระหว่างประเทศ</Label>
            <Textarea
              value={formData.internationalTermsAndConditions || ""}
              onChange={(e) => updateFormData("internationalTermsAndConditions", e.target.value)}
              className="min-h-[120px] text-sm bg-white resize-none"
              placeholder="กรอกเงื่อนไขการให้บริการระหว่างประเทศ เช่น&#10;1. ราคาดังกล่าวยังไม่รวมภาษีมูลค่าเพิ่ม 7%&#10;2. ราคาอาจเปลี่ยนแปลงตามอัตราน้ำมันเชื้อเพลิงและอัตราแลกเปลี่ยน&#10;3. เงื่อนไขการชำระเงิน: เครดิต 30 วัน"
            />
          </div>
        </div>
      </>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">
                สร้างใบเสนอราคา
                {progressInfo && progressInfo.total > 1 && (
                  <span className="ml-2 text-sm font-normal text-[#7BC9A6]">
                    (ใบที่ {progressInfo.current} จาก {progressInfo.total})
                  </span>
                )}
              </h2>
              <p className="text-xs text-gray-600">
                {progressInfo && progressInfo.total > 1 
                  ? `กำลังสร้างใบเสนอราคาแบบแยกประเภท` 
                  : "Create New Quotation"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
          {step === "template" ? (
            // Step 1: Template Selection
            <div className="p-6 space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  เลือกเทมเพลตใบเสนอราคา
                </h3>
                <p className="text-sm text-gray-600">
                  คุณสามารถเลือกได้มากกว่า 1 เทมเพลตเพื่อสร้างใบเสนอราคาแบบรวม
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {QUOTATION_TEMPLATES.map((template) => {
                  const IconComponent = iconMap[template.icon as keyof typeof iconMap] || Warehouse;
                  const isSelected = selectedTemplates.includes(template.id);

                  return (
                    <button
                      key={template.id}
                      onClick={() => handleSelectTemplate(template.id)}
                      className={`
                        relative p-6 rounded-xl border-2 text-left transition-all duration-200
                        ${isSelected 
                          ? 'border-[#7BC9A6] bg-[#7BC9A6]/10 shadow-lg scale-105' 
                          : 'border-gray-200 bg-white hover:border-[#7BC9A6]/50 hover:shadow-md'
                        }
                      `}
                    >
                      {isSelected && (
                        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#7BC9A6] flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                      )}

                      <div className="flex items-start gap-4">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${template.color}20` }}
                        >
                          <IconComponent className="w-7 h-7" style={{ color: template.color }} />
                        </div>

                        <div className="flex-1">
                          <h4 className="text-base font-bold text-gray-900 mb-1">
                            {template.name}
                          </h4>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {template.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedTemplates.length > 0 && (
                <div className="bg-[#7BC9A6]/10 rounded-xl p-4 border border-[#7BC9A6]/30">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-[#7BC9A6]" />
                    <p className="text-sm font-semibold text-gray-900">
                      เลือกแล้ว {selectedTemplates.length} เทมเพลต
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedTemplates.map(templateId => {
                      const tmpl = QUOTATION_TEMPLATES.find(t => t.id === templateId);
                      if (!tmpl) return null;
                      return (
                        <div 
                          key={templateId} 
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg text-xs font-medium"
                          style={{ color: tmpl.color, borderWidth: '1px', borderColor: tmpl.color }}
                        >
                          {tmpl.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : step === "preview" ? (
            // Step 3: Preview
            <div className="bg-gray-100 p-6">
              {selectedTemplates.map((templateType, index) => (
                <div key={templateType} className="mb-6 last:mb-0">
                  {selectedTemplates.length > 1 && (
                    <div className="bg-white rounded-t-xl p-3 border-b-2 border-[#7BC9A6]">
                      <h3 className="text-sm font-bold text-gray-900">
                        ส่วนที่ {index + 1}: {QUOTATION_TEMPLATES.find(t => t.id === templateType)?.name}
                      </h3>
                    </div>
                  )}
                  <QuotationDocumentPreview 
                    key={`preview-${templateType}-${JSON.stringify(formData.selectedServices)}`}
                    formData={formData}
                    templateType={templateType}
                    onUpdateFormData={(updates) => {
                      setFormData(prev => ({ ...prev, ...updates }));
                    }}
                    editable={true}
                  />
                </div>
              ))}
            </div>
          ) : (
            // Step 2: Form
            <div className="p-6 space-y-6">
              {/* Selected Templates Display */}
              {selectedTemplates.length > 0 && (
                <div className="bg-[#7BC9A6]/10 rounded-xl p-4 border border-[#7BC9A6]/30">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-[#7BC9A6]" />
                    <h3 className="text-sm font-semibold text-gray-900">
                      เทมเพลตที่เลือก ({selectedTemplates.length})
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedTemplates.map(templateId => {
                      const tmpl = QUOTATION_TEMPLATES.find(t => t.id === templateId);
                      if (!tmpl) return null;
                      const IconComponent = iconMap[tmpl.icon as keyof typeof iconMap] || Warehouse;
                      return (
                        <div key={templateId} className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-[#7BC9A6]/30">
                          <div
                            className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${tmpl.color}20` }}
                          >
                            <IconComponent className="w-4 h-4" style={{ color: tmpl.color }} />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-gray-900">{tmpl.name}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quotation Info */}
              <div className="bg-blue-50/50 rounded-xl p-4 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Quotation Info
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-gray-700 mb-1.5 block">
                      Quotation No.
                    </Label>
                    <Input
                      value={formData.quotationNumber}
                      onChange={(e) => updateFormData("quotationNumber", e.target.value)}
                      className="h-9 text-sm bg-white"
                      placeholder="QT-2025-001"
                    />
                  </div>

                  <div>
                    <Label className="text-xs text-gray-700 mb-1.5 block">
                      Effective Date
                    </Label>
                    <Input
                      type="date"
                      value={formData.validUntil}
                      onChange={(e) => updateFormData("validUntil", e.target.value)}
                      className="h-9 text-sm bg-white"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-gray-700 mb-1.5 block">
                    เงื่อนไขการชำระเงิน / Payment Terms
                  </Label>
                  <div className="flex gap-2">
                    <select
                      value={formData.paymentTerm === "0" ? "cash" : "credit"}
                      onChange={(e) => {
                        if (e.target.value === "cash") {
                          updateFormData("paymentTerm", "0");
                        } else {
                          updateFormData("paymentTerm", "30");
                        }
                      }}
                      className="h-9 px-3 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7BC9A6]"
                    >
                      <option value="cash">เงินสด (Cash)</option>
                      <option value="credit">เครดิต (Credit)</option>
                    </select>
                    {formData.paymentTerm !== "0" && (
                      <div className="flex items-center gap-2 flex-1">
                        <Input
                          type="number"
                          value={formData.paymentTerm || "30"}
                          onChange={(e) => updateFormData("paymentTerm", e.target.value)}
                          className="h-9 text-sm bg-white"
                          placeholder="30"
                          min="1"
                        />
                        <span className="text-xs text-gray-600 whitespace-nowrap">วัน</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="bg-green-50/50 rounded-xl p-4 space-y-4">
                <div className="flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-green-600 flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      Customer Info
                    </h3>
                  </div>
                  {formData.source === "crm" && formData.crmDealId && (
                    <div className="flex items-center gap-1.5 bg-blue-100 text-blue-700 px-2.5 py-1 rounded-md">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span className="text-xs font-semibold">Auto-filled from Deal {formData.crmDealId}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-gray-700 mb-1.5 block">
                      ชื่อบริษัท (TH) <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        value={formData.companyNameTh}
                        onChange={(e) => handleCompanySearchChange(e.target.value)}
                        onFocus={() => setShowCompanySuggestions(true)}
                        className="h-9 text-sm bg-white"
                        placeholder="พิมพ์เพื่อค้นหาหรือสร้างใหม่..."
                        autoComplete="off"
                      />
                      
                      {showCompanySuggestions && filteredCompanies.length > 0 && (
                        <>
                          <div 
                            className="fixed inset-0 z-10" 
                            onClick={() => setShowCompanySuggestions(false)}
                          />
                          
                          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-20 max-h-64 overflow-y-auto">
                            {filteredCompanies.map((customer) => (
                              <button
                                key={customer.id}
                                onClick={() => handleSelectCompanySuggestion(customer)}
                                className="w-full px-3 py-2.5 text-sm text-left hover:bg-green-50 transition-colors border-b border-gray-100 last:border-0"
                              >
                                <p className="font-medium text-gray-900">{customer.companyNameTh}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{customer.companyNameEn}</p>
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-700 mb-1.5 block">
                      ชื่อบริษัท (EN) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={formData.companyNameEn}
                      onChange={(e) => updateFormData("companyNameEn", e.target.value)}
                      className="h-9 text-sm bg-white"
                      placeholder="Company Name..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-gray-700 mb-1.5 block">
                      ชื่อผู้ติดต่อ <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={formData.contactName}
                      onChange={(e) => updateFormData("contactName", e.target.value)}
                      className="h-9 text-sm bg-white"
                      placeholder="ชื่อ-นามสกุล..."
                    />
                  </div>

                  <div>
                    <Label className="text-xs text-gray-700 mb-1.5 block">
                      ตำแหน่ง <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={formData.position}
                      onChange={(e) => updateFormData("position", e.target.value)}
                      className="h-9 text-sm bg-white"
                      placeholder="เช่น ผู้จัดการฝ่ายจัดซื้อ"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-gray-700 mb-1.5 block">
                      เบอร์โทร <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      className="h-9 text-sm bg-white"
                      placeholder="0812345678"
                    />
                  </div>

                  <div>
                    <Label className="text-xs text-gray-700 mb-1.5 block">
                      อีเมล <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      className="h-9 text-sm bg-white"
                      placeholder="email@company.com"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-gray-700 mb-1.5 block">
                    ที่อยู่
                  </Label>
                  <Textarea
                    value={formData.address || ""}
                    onChange={(e) => updateFormData("address", e.target.value)}
                    className="min-h-[60px] text-sm bg-white resize-none"
                    placeholder="ที่อยู่บริษัท..."
                  />
                </div>
              </div>

              {/* Template-specific fields */}
              {renderTemplateFields()}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              {progressInfo && progressInfo.total > 1 ? (
                // Multi-quotation progress indicator
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: progressInfo.total }).map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-full ${
                          idx < progressInfo.current ? 'bg-[#7BC9A6]' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span>
                    กำลังสร้างใบที่ {progressInfo.current} จาก {progressInfo.total}
                  </span>
                </div>
              ) : (
                // Single quotation step indicator
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center">
                    <span className="text-[10px]">{step === "template" ? "1" : step === "preview" ? "3" : "2"}</span>
                  </div>
                  <span>
                    {step === "template" 
                      ? "เลือกเทมเพลตที่เหมาะสม" 
                      : step === "preview"
                      ? "ตรวจสอบความถูกต้อง"
                      : "กรอกข้อมูลตาม template"}
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center gap-3">
              {step !== "template" && !progressInfo && (
                <Button
                  onClick={() => setStep(step === "preview" ? "form" : "template")}
                  className="h-9 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm rounded-lg"
                >
                  ย้อนกลับ
                </Button>
              )}

              {step === "template" ? (
                <Button
                  onClick={handleContinueToForm}
                  disabled={selectedTemplates.length === 0}
                  className="h-9 px-6 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  ถัดไป
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : step === "preview" ? (
                <Button
                  onClick={handleConfirm}
                  className="h-9 px-6 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {progressInfo && progressInfo.current < progressInfo.total 
                    ? `สร้างและถัดไป (${progressInfo.current}/${progressInfo.total})`
                    : "ยืนยันสร้างเอกสาร"}
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="h-9 px-6 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  {progressInfo && progressInfo.total > 1 ? "สร้างและถัดไป" : "ดูตัวอย่าง"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}