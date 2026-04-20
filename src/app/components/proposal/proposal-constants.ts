import { ProposalTemplate, CompanyInfo } from "./proposal-types";

export const PROPOSAL_TEMPLATES: ProposalTemplate[] = [
  {
    id: "business-proposal",
    name: "คลังสินค้า + ขนส่ง",
    nameEn: "Warehouse + Transport",
    description: "บริการคลังสินค้าและระบบจัดเก็บในประเทศ",
    descriptionEn: "Warehouse services and domestic transportation system",
    icon: "briefcase",
    color: "#7BC9A6",
    features: [
      "บทสรุปผู้บริหาร",
      "วัตถุประสงค์และเป้าหมาย",
      "ขอบเขตงาน",
      "กรอบเวลาดำเนินการ",
      "โครงสร้างราคา"
    ],
    featuresEn: [
      "Executive Summary",
      "Objectives & Goals",
      "Scope of Work",
      "Timeline",
      "Pricing Structure"
    ]
  },
  {
    id: "partnership-proposal",
    name: "พิธีการศุลกากร + ใบอนุญาต",
    nameEn: "Customs & License",
    description: "บริการด้านพิธีการศุลกากรและจัดการใบอนุญาต",
    descriptionEn: "Customs clearance and license management services",
    icon: "handshake",
    color: "#3b82f6",
    features: [
      "ภาพรวมความร่วมมือ",
      "ประโยชน์ร่วมกัน",
      "บทบาทและความรับผิดชอบ",
      "โครงสร้างการร่วมมือ",
      "เงื่อนไขและข้อตกลง"
    ],
    featuresEn: [
      "Partnership Overview",
      "Mutual Benefits",
      "Roles & Responsibilities",
      "Partnership Structure",
      "Terms & Agreements"
    ]
  },
  {
    id: "service-proposal",
    name: "ขนส่งข้ามพรมแดน (CLMV)",
    nameEn: "Cross-Border Transport (CLMV)",
    description: "บริการขนส่งข้ามพรมแดนในอนุภูมิภาค CLMV",
    descriptionEn: "Cross-border transportation services in CLMV sub-region",
    icon: "service",
    color: "#f59e0b",
    features: [
      "รายละเอียดบริการ",
      "แพ็คเกจบริการ",
      "ระยะเวลาและกระบวนการ",
      "ทีมงานและคุณสมบัติ",
      "อัตราค่าบริการ"
    ],
    featuresEn: [
      "Service Details",
      "Service Packages",
      "Timeline & Process",
      "Team & Qualifications",
      "Service Rates"
    ]
  },
  {
    id: "project-proposal",
    name: "ขนส่งระหว่างประเทศ (อากาศ/ทะเล)",
    nameEn: "International Freight (Air/Sea)",
    description: "บริการขนส่งระหว่างประเทศทางอากาศและทางทะเล หรือ",
    descriptionEn: "International air and sea freight forwarding services",
    icon: "project",
    color: "#8b5cf6",
    features: [
      "ภาพรวมโครงการ",
      "เป้าหมายและผลลัพธ์",
      "แผนการดำเนินงาน",
      "ทรัพยากรที่ต้องการ",
      "งบประมาณและไทม์ไลน์"
    ],
    featuresEn: [
      "Project Overview",
      "Goals & Deliverables",
      "Implementation Plan",
      "Required Resources",
      "Budget & Timeline"
    ]
  }
];

export const DEFAULT_COMPANY_INFO: CompanyInfo = {
  name: "บริษัท วันลิงค์ โลจิสติกส์ จำกัด",
  nameEn: "mini CRM Logistics Co., Ltd.",
  address: "123 ถนนพระราม 4 แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110",
  addressEn: "123 Rama IV Road, Khlong Toei, Bangkok 10110, Thailand",
  phone: "02-123-4567",
  email: "info@onelink.co.th",
  website: "www.onelink.co.th",
  taxId: "0105558123456"
};

export const DEFAULT_TERMS_CONDITIONS = {
  th: `เงื่อนไขและข้อกำหนด:

1. ราคาที่เสนอนี้มีผลใช้บังคับภายในวันที่ระบุในข้อเสนอ
2. การชำระเงินจะต้องดำเนินการภายใน 30 วันนับจากวันที่ออกใบแจ้งหนี้
3. ข้อเสนอนี้อาจมีการเปลี่ยนแปลงได้หากมีการเปลี่ยนแปลงขอบเขตงาน
4. การยกเลิกหรือเลื่อนการดำเนินการต้องแจ้งล่วงหน้าอย่างน้อย 7 วันทำการ
5. ภาษีมูลค่าเพิ่ม 7% จะถูกคิดเพิ่มจากราคาที่เสนอ
6. เงื่อนไขอื่นๆ สามารถปรับเปลี่ยนได้ตามความตกลงร่วมกัน`,
  en: `Terms and Conditions:

1. The proposed prices are valid within the specified dates in this proposal
2. Payment must be made within 30 days from the invoice date
3. This proposal may be subject to change if there are modifications to the scope of work
4. Cancellation or postponement must be notified at least 7 working days in advance
5. VAT 7% will be added to the proposed prices
6. Other terms may be modified by mutual agreement`
};