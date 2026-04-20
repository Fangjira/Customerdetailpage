// Email & Document Templates for Enterprise CRM
// Professional templates for customer communication

export interface EmailTemplate {
  id: string;
  name: string;
  category: string;
  subject: {
    en: string;
    th: string;
  };
  body: {
    en: string;
    th: string;
  };
  variables: string[];
  attachments?: string[];
}

export const emailTemplates: EmailTemplate[] = [
  // ==================== QUOTATION TEMPLATES ====================
  {
    id: "TMPL-QT-001",
    name: "quotation_send",
    category: "quotation",
    subject: {
      en: "Quotation {{quotationNumber}} - {{customerName}}",
      th: "ใบเสนอราคา {{quotationNumber}} - {{customerName}}",
    },
    body: {
      en: `Dear {{contactPerson}},

Thank you for your interest in our logistics services.

Please find attached our quotation {{quotationNumber}} for your consideration.

Quotation Details:
- Quotation Number: {{quotationNumber}}
- Total Value: {{total}} {{currency}}
- Validity Period: {{validityPeriod}} days
- Expiry Date: {{expiryDate}}

This quotation includes the following services:
{{itemsList}}

Should you have any questions or require clarification on any items, please feel free to contact us.

We look forward to the opportunity to serve you.

Best regards,
{{preparedBy}}
{{branchName}}
SCG Just-in-World Distribution (Thailand) Co., Ltd.
Tel: {{branchPhone}}
Email: {{preparedByEmail}}`,
      th: `เรียน คุณ{{contactPerson}}

ขอขอบคุณที่ให้ความสนใจในบริการโลจิสติกส์ของเรา

กรุณาพิจารณาใบเสนอราคา {{quotationNumber}} ที่แนบมานี้

รายละเอียดใบเสนอราคา:
- เลขที่ใบเสนอราคา: {{quotationNumber}}
- มูลค่ารวม: {{total}} {{currency}}
- ระยะเวลาอายุ: {{validityPeriod}} วัน
- วันที่หมดอายุ: {{expiryDate}}

ใบเสนอราคานี้รวมบริการดังต่อไปนี้:
{{itemsList}}

หากท่านมีข้อสงสัยหรือต้องการคำชี้แจงเพิ่มเติม กรุณาติดต่อเราได้ตลอดเวลา

เราหวังเป็นอย่างยิ่งว่าจะได้รับใช้ท่าน

ด้วยความเคารพ
{{preparedBy}}
{{branchName}}
บริษัท เอสซีจี จัสท์อิน-เวิลด์ ดิสทริบิวชั่น (ประเทศไทย) จำกัด
โทร: {{branchPhone}}
อีเมล: {{preparedByEmail}}`,
    },
    variables: ["quotationNumber", "customerName", "contactPerson", "total", "currency", "validityPeriod", "expiryDate", "itemsList", "preparedBy", "branchName", "branchPhone", "preparedByEmail"],
    attachments: ["quotation.pdf"],
  },
  {
    id: "TMPL-QT-002",
    name: "quotation_reminder",
    category: "quotation",
    subject: {
      en: "Reminder: Quotation {{quotationNumber}} Expires Soon",
      th: "เตือนความจำ: ใบเสนอราคา {{quotationNumber}} ใกล้หมดอายุ",
    },
    body: {
      en: `Dear {{contactPerson}},

This is a friendly reminder that our quotation {{quotationNumber}} will expire on {{expiryDate}}.

If you would like to proceed with our services or have any questions, please let us know before the expiry date.

We are happy to extend the validity period or revise the quotation if needed.

Best regards,
{{preparedBy}}
{{branchName}}`,
      th: `เรียน คุณ{{contactPerson}}

ขอเตือนความจำเป็นมิตรว่าใบเสนอราคา {{quotationNumber}} จะหมดอายุในวันที่ {{expiryDate}}

หากท่านต้องการดำเนินการต่อหรือมีข้อสงสัย กรุณาแจ้งให้เราทราบก่อนวันหมดอายุ

เรายินดีที่จะขยายระยะเวลาอายุหรือแก้ไขใบเสนอราคาหากจำเป็น

ด้วยความเคารพ
{{preparedBy}}
{{branchName}}`,
    },
    variables: ["quotationNumber", "contactPerson", "expiryDate", "preparedBy", "branchName"],
  },
  {
    id: "TMPL-QT-003",
    name: "quotation_accepted",
    category: "quotation",
    subject: {
      en: "Thank You - Quotation {{quotationNumber}} Accepted",
      th: "ขอบคุณ - ใบเสนอราคา {{quotationNumber}} ได้รับการยอมรับ",
    },
    body: {
      en: `Dear {{contactPerson}},

Thank you for accepting our quotation {{quotationNumber}}.

We are excited to begin working with you. Our team will contact you shortly to coordinate the next steps and finalize the service agreement.

Documents to be prepared:
- Service Agreement Contract
- Terms and Conditions
- Payment Schedule

If you have any immediate questions, please don't hesitate to contact us.

Best regards,
{{preparedBy}}
{{branchName}}`,
      th: `เรียน คุณ{{contactPerson}}

ขอขอบคุณที่ยอมรับใบเสนอราคา {{quotationNumber}}

เรายินดีเป็นอย่างยิ่งที่จะได้ทำงานร่วมกับท่าน ทีมงานของเราจะติดต่อท่านเร็วๆ นี้เพื่อประสานงานขั้นตอนต่อไปและจัดทำสัญญาบริการ

เอกสารที่จะจัดเตรียม:
- สัญญาบริการ
- ข้อกำหนดและเงื่อนไข
- กำหนดการชำระเงิน

หากท่านมีคำถามเร่งด่วน กรุณาติดต่อเราได้ทันที

ด้วยความเคารพ
{{preparedBy}}
{{branchName}}`,
    },
    variables: ["quotationNumber", "contactPerson", "preparedBy", "branchName"],
  },

  // ==================== CONTRACT TEMPLATES ====================
  {
    id: "TMPL-CT-001",
    name: "contract_send",
    category: "contract",
    subject: {
      en: "Service Agreement {{contractNumber}} - Ready for Signature",
      th: "สัญญาบริการ {{contractNumber}} - พร้อมสำหรับลงนาม",
    },
    body: {
      en: `Dear {{contactPerson}},

We are pleased to send you the Service Agreement {{contractNumber}} for your review and signature.

Contract Details:
- Contract Number: {{contractNumber}}
- Service Period: {{startDate}} to {{endDate}}
- Total Value: {{totalValue}} {{currency}}
- Payment Terms: {{paymentTerms}}

Please review the attached documents and return the signed copy at your earliest convenience.

You can sign electronically using our e-signature system or return a scanned copy to this email.

If you have any questions about the contract terms, please contact us.

Best regards,
{{managedBy}}
{{branchName}}`,
      th: `เรียน คุณ{{contactPerson}}

เรายินดีที่จะส่งสัญญาบริการ {{contractNumber}} เพื่อให้ท่านพิจารณาและลงนาม

รายละเอียดสัญญา:
- เลขที่สัญญา: {{contractNumber}}
- ระยะเวลาบริการ: {{startDate}} ถึง {{endDate}}
- มูลค่ารวม: {{totalValue}} {{currency}}
- เงื่อนไขการชำระเงิน: {{paymentTerms}}

กรุณาตรวจสอบเอกสารที่แนบมาและส่งคืนสำเนาที่ลงนามแล้วโดยเร็ว

ท่านสามารถลงนามอิเล็กทรอนิกส์ผ่านระบบของเรา หรือส่งสแกนเอกสารมาที่อีเมลนี้

หากท่านมีคำถามเกี่ยวกับเงื่อนไขในสัญญา กรุณาติดต่อเรา

ด้วยความเคารพ
{{managedBy}}
{{branchName}}`,
    },
    variables: ["contractNumber", "contactPerson", "startDate", "endDate", "totalValue", "currency", "paymentTerms", "managedBy", "branchName"],
    attachments: ["contract.pdf", "terms_and_conditions.pdf"],
  },
  {
    id: "TMPL-CT-002",
    name: "contract_renewal_notice",
    category: "contract",
    subject: {
      en: "Contract Renewal Notice - {{contractNumber}}",
      th: "แจ้งการต่ออายุสัญญา - {{contractNumber}}",
    },
    body: {
      en: `Dear {{contactPerson}},

This is to inform you that your Service Agreement {{contractNumber}} will expire on {{endDate}}.

We value your partnership and would like to continue serving you. We will prepare a renewal proposal with updated terms and pricing for your consideration.

Current Contract Details:
- Contract Number: {{contractNumber}}
- End Date: {{endDate}}
- Current Value: {{totalValue}} {{currency}}

Our team will contact you within the next few days to discuss the renewal terms.

If you have any questions or would like to discuss changes to the service, please let us know.

Best regards,
{{managedBy}}
{{branchName}}`,
      th: `เรียน คุณ{{contactPerson}}

ขอแจ้งให้ทราบว่าสัญญาบริการ {{contractNumber}} จะสิ้นสุดในวันที่ {{endDate}}

เราให้คุณค่ากับความร่วมมือของท่านและหวังเป็นอย่างยิ่งว่าจะได้ให้บริการท่านต่อไป เราจะจัดเตรียมข้อเสนอการต่ออายุพร้อมเงื่อนไขและราคาที่อัพเดตให้ท่านพิจารณา

รายละเอียดสัญญาปัจจุบัน:
- เลขที่สัญญา: {{contractNumber}}
- วันที่สิ้นสุด: {{endDate}}
- มูลค่าปัจจุบัน: {{totalValue}} {{currency}}

ทีมงานของเราจะติดต่อท่านภายในไม่กี่วันเพื่อหารือเงื่อนไขการต่ออายุ

หากท่านมีคำถามหรือต้องการเปลี่ยนแปลงบริการ กรุณาแจ้งให้เราทราบ

ด้วยความเคารพ
{{managedBy}}
{{branchName}}`,
    },
    variables: ["contractNumber", "contactPerson", "endDate", "totalValue", "currency", "managedBy", "branchName"],
  },

  // ==================== INVOICE TEMPLATES ====================
  {
    id: "TMPL-INV-001",
    name: "invoice_send",
    category: "invoice",
    subject: {
      en: "Invoice {{invoiceNumber}} - {{customerName}}",
      th: "ใบแจ้งหนี้ {{invoiceNumber}} - {{customerName}}",
    },
    body: {
      en: `Dear {{contactPerson}},

Please find attached Invoice {{invoiceNumber}} for services provided.

Invoice Details:
- Invoice Number: {{invoiceNumber}}
- Invoice Date: {{invoiceDate}}
- Due Date: {{dueDate}}
- Total Amount: {{total}} {{currency}}

Payment can be made via:
- Bank Transfer to Account: XXX-X-XXXXX-X (Kasikorn Bank)
- QR Code Payment (attached)
- Credit Card (contact us for payment link)

Please send payment confirmation to accounting@scgjwd.com

Thank you for your business.

Best regards,
Accounting Department
{{branchName}}`,
      th: `เรียน คุณ{{contactPerson}}

กรุณาตรวจสอบใบแจ้งหนี้ {{invoiceNumber}} สำหรับบริการที่ให้แล้ว

รายละเอียดใบแจ้งหนี้:
- เลขที่ใบแจ้งหนี้: {{invoiceNumber}}
- วันที่ออกใบแจ้งหนี้: {{invoiceDate}}
- วันครบกำหนดชำระ: {{dueDate}}
- จำนวนเงินรวม: {{total}} {{currency}}

ช่องทางการชำระเงิน:
- โอนเงินผ่านธนาคาร บัญชี: XXX-X-XXXXX-X (ธนาคารกสิกรไทย)
- QR Code Payment (แนบมาด้วย)
- บัตรเครดิต (ติดต่อเราเพื่อรับ payment link)

กรุณาส่งหลักฐานการชำระเงินมาที่ accounting@scgjwd.com

ขอขอบคุณที่ใช้บริการ

ด้วยความเคารพ
ฝ่ายบัญชี
{{branchName}}`,
    },
    variables: ["invoiceNumber", "customerName", "contactPerson", "invoiceDate", "dueDate", "total", "currency", "branchName"],
    attachments: ["invoice.pdf", "qr_payment.png"],
  },
  {
    id: "TMPL-INV-002",
    name: "payment_reminder",
    category: "invoice",
    subject: {
      en: "Payment Reminder - Invoice {{invoiceNumber}}",
      th: "เตือนการชำระเงิน - ใบแจ้งหนี้ {{invoiceNumber}}",
    },
    body: {
      en: `Dear {{contactPerson}},

This is a friendly reminder that payment for Invoice {{invoiceNumber}} is due on {{dueDate}}.

Invoice Amount: {{total}} {{currency}}
Days Overdue: {{daysOverdue}}

If you have already made the payment, please disregard this message and send us the payment confirmation.

If you are experiencing any issues with payment, please contact us to discuss payment arrangements.

Best regards,
Accounting Department
{{branchName}}`,
      th: `เรียน คุณ{{contactPerson}}

ขอเตือนความจำเป็นมิตรว่าการชำระเงินสำหรับใบแจ้งหนี้ {{invoiceNumber}} ครบกำหนดในวันที่ {{dueDate}}

จำนวนเงิน: {{total}} {{currency}}
เกินกำหนด: {{daysOverdue}} วัน

หากท่านชำระเงินแล้ว กรุณาเพิกเฉยข้อความนี้และส่งหลักฐานการชำระเงินมาให้เรา

หากท่านมีปัญหาในการชำระเงิน กรุณาติดต่อเราเพื่อหารือเรื่องการผ่อนชำระ

ด้วยความเคารพ
ฝ่ายบัญชี
{{branchName}}`,
    },
    variables: ["invoiceNumber", "contactPerson", "dueDate", "total", "currency", "daysOverdue", "branchName"],
  },

  // ==================== TICKET TEMPLATES ====================
  {
    id: "TMPL-TK-001",
    name: "ticket_created",
    category: "ticket",
    subject: {
      en: "Ticket {{ticketNumber}} Created - {{title}}",
      th: "ตั๋ว {{ticketNumber}} ถูกสร้าง - {{title}}",
    },
    body: {
      en: `Dear {{contactPerson}},

Thank you for contacting us. We have created Ticket {{ticketNumber}} for your request.

Ticket Details:
- Ticket Number: {{ticketNumber}}
- Category: {{category}}
- Priority: {{priority}}
- Assigned To: {{assignedTo}}

Our team will review your request and respond within {{slaHours}} hours according to our service level agreement.

You can track the status of your ticket by replying to this email or contacting us at {{branchPhone}}.

Thank you for your patience.

Best regards,
Customer Service Team
{{branchName}}`,
      th: `เรียน คุณ{{contactPerson}}

ขอขอบคุณที่ติดต่อเรา เราได้สร้างตั๋ว {{ticketNumber}} สำหรับคำขอของท่านแล้ว

รายละเอียดตั๋ว:
- หมายเลขตั๋ว: {{ticketNumber}}
- หมวดหมู่: {{category}}
- ความสำคัญ: {{priority}}
- มอบหมายให้: {{assignedTo}}

ทีมงานของเราจะตรวจสอบคำขอของท่านและตอบกลับภายใน {{slaHours}} ชั่วโมงตามข้อตกลงระดับบริการของเรา

ท่านสามารถติดตามสถานะของตั๋วได้โดยตอบกลับอีเมลนี้หรือติดต่อเราที่ {{branchPhone}}

ขอบคุณสำหรับความอดทนของท่าน

ด้วยความเคารพ
ทีมบริการลูกค้า
{{branchName}}`,
    },
    variables: ["ticketNumber", "contactPerson", "title", "category", "priority", "assignedTo", "slaHours", "branchPhone", "branchName"],
  },
  {
    id: "TMPL-TK-002",
    name: "ticket_resolved",
    category: "ticket",
    subject: {
      en: "Ticket {{ticketNumber}} Resolved",
      th: "ตั๋ว {{ticketNumber}} ได้รับการแก้ไขแล้ว",
    },
    body: {
      en: `Dear {{contactPerson}},

We are pleased to inform you that Ticket {{ticketNumber}} has been resolved.

Resolution Summary:
{{resolution}}

If you are satisfied with the resolution, no further action is required.

If you have any concerns or the issue persists, please reply to this email and we will reopen your ticket immediately.

We value your feedback. Please take a moment to rate your experience:
[Rate Experience Button]

Thank you for giving us the opportunity to assist you.

Best regards,
Customer Service Team
{{branchName}}`,
      th: `เรียน คุณ{{contactPerson}}

เรายินดีที่จะแจ้งให้ทราบว่าตั๋ว {{ticketNumber}} ได้รับการแก้ไขแล้ว

สรุปการแก้ไข:
{{resolution}}

หากท่านพอใจกับการแก้ไข ไม่จำเป็นต้องดำเนินการใดๆ เพิ่มเติม

หากท่านมีข้อกังวลหรือปัญหายังคงอยู่ กรุณาตอบกลับอีเมลนี้และเราจะเปิดตั๋วของท่านอีกครั้งทันที

เราให้คุณค่ากับความคิดเห็นของท่าน กรุณาใช้เวลาสักครู่เพื่อให้คะแนนประสบการณ์:
[ปุ่มให้คะแนนประสบการณ์]

ขอบคุณที่ให้โอกาสเราช่วยเหลือท่าน

ด้วยความเคารพ
ทีมบริการลูกค้า
{{branchName}}`,
    },
    variables: ["ticketNumber", "contactPerson", "resolution", "branchName"],
  },

  // ==================== WELCOME & ONBOARDING ====================
  {
    id: "TMPL-WL-001",
    name: "customer_welcome",
    category: "welcome",
    subject: {
      en: "Welcome to SCG Just-in-World Distribution!",
      th: "ยินดีต้อนรับสู่ SCG Just-in-World Distribution!",
    },
    body: {
      en: `Dear {{contactPerson}},

Welcome to SCG Just-in-World Distribution! We are thrilled to have you as our valued customer.

Your account has been set up and you can now access our services:

Customer Portal: https://portal.scgjwd.com
Username: {{email}}
Temporary Password: (sent separately)

Our Services:
- Warehouse Storage & Management
- Domestic & International Transportation
- Customs Clearance
- Value-Added Services
- 24/7 Customer Support

Your dedicated account manager is {{assignedTo}} who will be your primary point of contact.
Contact: {{assignedToEmail}} / {{assignedToPhone}}

We look forward to building a long-lasting partnership with you.

Best regards,
Customer Success Team
SCG Just-in-World Distribution (Thailand) Co., Ltd.`,
      th: `เรียน คุณ{{contactPerson}}

ยินดีต้อนรับสู่ SCG Just-in-World Distribution! เรายินดีเป็นอย่างยิ่งที่มีท่านเป็นลูกค้าที่มีคุณค่าของเรา

บัญชีของท่านได้ถูกสร้างแล้วและท่านสามารถเข้าใช้บริการของเราได้:

พอร์ทัลลูกค้า: https://portal.scgjwd.com
ชื่อผู้ใช้: {{email}}
รหัสผ่านชั่วคราว: (ส่งแยกต่างหาก)

บริการของเรา:
- คลังสินค้าและการจัดการ
- ขนส่งในประเทศและระหว่างประเทศ
- ผ่านพิธีการศุลกากร
- บริการเสริม
- บริการลูกค้า 24/7

ผู้จัดการบัญชีเฉพาะของท่านคือ {{assignedTo}} ซึ่งจะเป็นผู้ติดต่อหลักของท่าน
ติดต่อ: {{assignedToEmail}} / {{assignedToPhone}}

เราหวังเป็นอย่างยิ่งว่าจะได้สร้างความร่วมมือระยะยาวกับท่าน

ด้วยความเคารพ
ทีมความสำเร็จลูกค้า
บริษัท เอสซีจี จัสท์อิน-เวิลด์ ดิสทริบิวชั่น (ประเทศไทย) จำกัด`,
    },
    variables: ["contactPerson", "email", "assignedTo", "assignedToEmail", "assignedToPhone"],
  },
];

// Helper function to render template with variables
export const renderEmailTemplate = (
  templateId: string,
  language: "en" | "th",
  variables: Record<string, any>
): { subject: string; body: string } | null => {
  const template = emailTemplates.find(t => t.id === templateId);
  if (!template) return null;
  
  let subject = template.subject[language];
  let body = template.body[language];
  
  // Replace all variables
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    subject = subject.replace(regex, String(value));
    body = body.replace(regex, String(value));
  }
  
  return { subject, body };
};

// Get templates by category
export const getTemplatesByCategory = (category: string) => {
  return emailTemplates.filter(t => t.category === category);
};
