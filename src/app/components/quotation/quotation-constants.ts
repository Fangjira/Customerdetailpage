import { QuotationTemplateType, TemplateMetadata } from "./quotation-types";

export const QUOTATION_TEMPLATES: TemplateMetadata[] = [
  {
    id: "warehouse-transport",
    name: "คลังสินค้า + ขนส่ง",
    nameEn: "Warehouse + Transport",
    description: "บริการคลังสินค้าและขนส่งภายในประเทศ",
    descriptionEn: "Warehousing and domestic transportation services",
    icon: "warehouse",
    color: "#7BC9A6",
  },
  {
    id: "customs-license",
    name: "พิธีการศุลกากร + ใบอนุญาต",
    nameEn: "Customs & License",
    description: "บริการด้านพิธีการศุลกากรและจัดการใบอนุญาต",
    descriptionEn: "Customs clearance and license management",
    icon: "file-check",
    color: "#5FB88E",
  },
  {
    id: "cross-border",
    name: "ขนส่งข้ามพรมแดน (CLMV)",
    nameEn: "Cross-Border Transport (CLMV)",
    description: "บริการขนส่งข้ามพรมแดนในภูมิภาค CLMV",
    descriptionEn: "Cross-border transportation in CLMV region",
    icon: "truck",
    color: "#6CB88A",
  },
  {
    id: "international-freight",
    name: "ขนส่งระหว่างประเทศ (อากาศ/ทะเล)",
    nameEn: "International Freight (Air/Sea)",
    description: "บริการขนส่งระหว่างประเทศทางอากาศและทางเรือ",
    descriptionEn: "International freight forwarding by air and sea",
    icon: "ship",
    color: "#4FA67C",
  },
];

export const DEFAULT_COMPANY_INFO = {
  name: "บริษัท วันลิงค์ โลจิสติกส์ จำกัด",
  nameEn: "mini CRM Logistics Co., Ltd.",
  address: "เลขที่ 123 อาคารวันลิงค์ ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110",
  addressEn: "123 mini CRM Building, Sukhumvit Road, Khlong Toei, Bangkok 10110, Thailand",
  phone: "+66 2 123 4567",
  email: "info@onelink.co.th",
  taxId: "0123456789012",
};

export const TEMPLATE_SECTIONS = {
  th: {
    introduction: "คำนำ",
    description: "รายละเอียดบริการ",
    scopeOfWork: "ขอบเขตงาน",
    rate: "อัตราค่าบริการ",
    termsAndConditions: "เงื่อนไขการให้บริการ",
    signature: "ลงนาม",
    approval: "อนุมัติ",
  },
  en: {
    introduction: "Introduction",
    description: "Service Description",
    scopeOfWork: "Scope of Work",
    rate: "Service Rates",
    termsAndConditions: "Terms & Conditions",
    signature: "Signature",
    approval: "Approval",
  },
};

export const DEFAULT_TERMS_CONDITIONS = {
  th: `1. ราคาดังกล่าวรวมภาษีมูลค่าเพิ่ม 7% แล้ว
2. ราคาที่เสนอนี้มีผลบังคับใช้เป็นระยะเวลา 30 วัน นับจากวันที่ออกใบเสนอราคา
3. ค่าบริการดังกล่าวไม่รวมค่าธรรมเนียมศุลกากร ภาษี และค่าปรับ (ถ้ามี)
4. การชำระเงินภายใน 30 วัน หลังจากได้รับใบแจ้งหนี้
5. ในกรณีที่มีการเปลี่ยนแปลงขอบเขตงาน ราคาจะต้องได้รับการตกลงใหม่`,
  en: `1. All prices include 7% VAT
2. This quotation is valid for 30 days from the date of issue
3. Prices exclude customs duties, taxes, and penalties (if any)
4. Payment terms: 30 days upon receipt of invoice
5. Any changes in scope of work require price renegotiation`,
};
