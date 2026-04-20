// Proposal Template Types
export type ProposalTemplateType = 
  | "business-proposal"      // ข้อเสนอทางธุรกิจทั่วไป
  | "partnership-proposal"   // ข้อเสนอความร่วมมือ
  | "service-proposal"       // ข้อเสนอบริการ
  | "project-proposal";      // ข้อเสนอโครงการ

export type LanguageType = "th" | "en";

// INCOTERM Types
export type INCOTERMType = 
  | "EXW" 
  | "FCA" 
  | "FAS" 
  | "FOB" 
  | "CFR" 
  | "CIF" 
  | "CPT" 
  | "CIP" 
  | "DAT" 
  | "DAP" 
  | "DDP";

// Scope of Work Types
export interface ScopeOfWorkServices {
  warehouse: boolean;
  transport: boolean;
  freightAir: boolean;
  freightSea: boolean;
  crossBorder: boolean;
}

// Customs & License specific data
export interface CustomsLicenseProposalData {
  // Scope of Work Checkboxes
  scopeOfWorkServices: ScopeOfWorkServices;
  
  // (1) Warehouse
  warehouseLocation?: string;
  storage?: string;
  handling?: string;
  
  // (4) Other Activity
  otherActivity?: string;
  
  // (2) Transport
  transportationType?: string;
  routeOrigin?: string;
  routeDestination?: string;
  
  // (3) Freight
  airFreight?: string;
  airFreightIncoterm?: INCOTERMType;
  seaFreight?: string;
  seaFreightIncoterm?: INCOTERMType;
  
  // Additional custom fields
  customFields?: Array<{
    id: string;
    label: string;
    value: string;
  }>;
}

export interface CustomerInfo {
  company: string;
  contactName: string;
  email: string;
  position: string;
  phone: string;
}

export interface CompanyInfo {
  name: string;
  nameEn: string;
  address: string;
  addressEn: string;
  phone: string;
  email: string;
  website: string;
  taxId: string;
}

export interface ProposalInfo {
  proposalNo: string;
  issueDate: string;
  effectiveDate: string;
  validUntil: string;
  version: string;
}

export interface ProposalData {
  templateType: ProposalTemplateType;
  language: LanguageType;
  info: ProposalInfo;
  customer: CustomerInfo;
  company: CompanyInfo;
  title: string;
  introduction: string;
  executiveSummary: string;
  objectives: string[];
  scopeOfWork: string;
  timeline: string;
  pricing: {
    items: PricingItem[];
    subtotal: number;
    tax: number;
    total: number;
  };
  termsAndConditions: string;
  signatureName: string;
  signaturePosition: string;
  approvalRequired: boolean;
  // Customs & License specific data (only for partnership-proposal)
  customsLicenseData?: CustomsLicenseProposalData;
}

export interface PricingItem {
  no: number;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  amount: number;
}

export interface ProposalTemplate {
  id: ProposalTemplateType;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
  color: string;
  features: string[];
  featuresEn: string[];
}