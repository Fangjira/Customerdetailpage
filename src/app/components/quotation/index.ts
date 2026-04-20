// Main Entry Points
export { QuotationBuilderMain } from "./quotation-builder-main";
export { TemplateSelectionScreen } from "./template-selection-screen";
export { QuotationCreatorScreen } from "./quotation-creator-screen";
export { QuotationPreview } from "./quotation-preview";

// Components
export { A4PreviewFrame, A4Content } from "./a4-preview-frame";
export {
  SectionHeader,
  EditableTextBlock,
  PreviewTextBlock,
  ToggleSection,
  SignatureBlock,
  ApprovalBlock,
} from "./quotation-components";

// Tables
export {
  WarehousingTable,
  TransportTable,
  ServiceTable,
  type WarehousingItem,
  type TransportItem,
  type ServiceItem,
} from "./dynamic-tables";

// Template Forms
export { WarehouseTransportForm } from "./template-forms/warehouse-transport-form";
export { CustomsLicenseForm } from "./template-forms/customs-license-form";
export { CrossBorderForm } from "./template-forms/cross-border-form";
export { InternationalFreightForm } from "./template-forms/international-freight-form";

// Template Previews
export { WarehouseTransportPreview } from "./template-previews/warehouse-transport-preview";
export { CustomsLicensePreview } from "./template-previews/customs-license-preview";
export { CrossBorderPreview } from "./template-previews/cross-border-preview";
export { InternationalFreightPreview } from "./template-previews/international-freight-preview";

// Types
export type {
  QuotationTemplateType,
  LanguageType,
  QuotationInfo,
  CustomerInfo,
  CompanyInfo,
  QuotationData,
  TemplateMetadata,
  WarehouseTransportData,
  CustomsLicenseData,
  CrossBorderData,
  InternationalFreightData,
  WarehousingRate,
  TransportRate,
  CustomsLicenseRate,
  FreightMode,
  FreightService,
} from "./quotation-types";

// Constants
export { QUOTATION_TEMPLATES, DEFAULT_COMPANY_INFO, TEMPLATE_SECTIONS, DEFAULT_TERMS_CONDITIONS } from "./quotation-constants";
