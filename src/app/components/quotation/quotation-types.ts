// Quotation Module Type Definitions

export type QuotationTemplateType = 
  | "warehouse-transport"
  | "customs-license"
  | "cross-border"
  | "international-freight";

export type LanguageType = "th" | "en";

export interface QuotationInfo {
  quotationNo: string;
  issueDate: string;
  effectiveDate: string;
  validUntil: string;
  version: string;
}

export interface CustomerInfo {
  company: string;
  contactName: string;
  email: string;
  position: string;
  phone: string;
  address?: string;
}

export interface CompanyInfo {
  name: string;
  nameEn: string;
  address: string;
  addressEn: string;
  phone: string;
  email: string;
  taxId: string;
  logo?: string;
}

// Template 1: Warehouse + Transport
export interface WarehousingRate {
  no: number;
  service: string;
  rate: string;
  unit: string;
  remarks: string;
}

export interface TransportRate {
  no: number;
  truckType: string;
  origin: string;
  destination: string;
  price: string;
  unit: string;
  remarks: string;
}

export interface WarehouseTransportData {
  warehousing: {
    enabled: boolean;
    items: WarehousingRate[];
  };
  transport: {
    enabled: boolean;
    items: TransportRate[];
  };
}

// Template 2: Customs & License
export interface CustomsLicenseRate {
  no: number;
  service: string;
  price: string;
  unit: string;
  remarks: string;
}

export interface CustomsLicenseData {
  // Scope of Work Services (checkboxes)
  scopeOfWorkServices: {
    warehouse: boolean;
    transport: boolean;
    freightAir: boolean;
    freightSea: boolean;
    crossBorder: boolean;
  };
  
  // Warehouse Services
  warehouseLocation?: string;
  storage?: string;
  handling?: string;
  
  // Other Activity
  otherActivity?: string;
  
  // Transport Services
  transportationType?: string;
  routeOrigin?: string;
  routeDestination?: string;
  
  // Freight Services
  airFreight?: string;
  airFreightIncoterm?: string;
  seaFreight?: string;
  seaFreightIncoterm?: string;
  
  // Custom Fields
  customFields: Array<{
    id: string;
    label: string;
    value: string;
  }>;
  
  // Terms & Conditions
  termsAndConditions?: string;
}

// Template 3: Cross-Border
export interface CrossBorderRate {
  id: string;
  route: string;
  vehicleType: string;
  qty: string;
  unit: string;
  pricePerTrip: string;
  fixedCost: string;
  remarks: string;
}

export interface CrossBorderData {
  rateTable?: {
    enabled: boolean;
    rows: CrossBorderRate[];
  };
  rateSummary: string;
  clmvRemarks: string;
  jtsRemarks: string;
  salesCustomsRemarks: string;
  customsLicense: {
    enabled: boolean;
    items: CustomsLicenseRate[];
  };
  termsAndConditions?: string; // Terms & Conditions for Cross-Border
}

// Template 4: International Freight
export interface FreightMode {
  enabled: boolean;
  exportEnabled: boolean;
  importEnabled: boolean;
  services: FreightService[];
  remarks: string;
}

export interface FreightService {
  service: string;
  price: string;
  unit: string;
}

export interface FreightDetail {
  shipmentMode: "air" | "sea" | "both";
  origin: string;
  destination: string;
  cargoWeight: string;
  cargoVolume: string;
  incoterms: string;
  serviceLevel: string;
  specialHandling: string;
  insurance: string;
}

export interface InternationalFreightData {
  air: FreightMode;
  sea: FreightMode;
  customsLicense: {
    enabled: boolean;
    items: CustomsLicenseRate[];
  };
  freightDetail?: FreightDetail;
  // New Rate Table Fields
  airFreightExportRateData?: string;
  airFreightImportRateData?: string;
  seaFreightExportRateData?: string;
  seaFreightImportRateData?: string;
  freightRateRemarks?: string;
  termsAndConditions?: string; // Terms & Conditions for International Freight
}

// Master Quotation Data
export interface QuotationData {
  templateType: QuotationTemplateType;
  language: LanguageType;
  info: QuotationInfo;
  customer: CustomerInfo;
  company: CompanyInfo;
  introduction: string;
  description: string;
  scopeOfWork: string;
  templateData: WarehouseTransportData | CustomsLicenseData | CrossBorderData | InternationalFreightData;
  termsAndConditions: string;
  signatureName: string;
  signaturePosition: string;
  approvalRequired: boolean;
  approverName?: string;
  approverPosition?: string;
}

export interface TemplateMetadata {
  id: QuotationTemplateType;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
  color: string;
}