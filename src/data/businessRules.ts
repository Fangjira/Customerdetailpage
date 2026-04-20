// Business Rules & Workflow Engine for Enterprise CRM
// Contains validation rules, approval workflows, and business logic

import { masterData } from "../config/masterData";

// ==================== VALIDATION RULES ====================

export interface ValidationRule {
  field: string;
  rule: (value: any, context?: any) => boolean;
  message: {
    en: string;
    th: string;
  };
}

export const quotationValidationRules: ValidationRule[] = [
  {
    field: "total",
    rule: (value, context) => {
      // Quotations over 5M THB require manager approval
      return value <= 5000000;
    },
    message: {
      en: "Quotations over 5M THB require manager approval",
      th: "ใบเสนอราคามากกว่า 5 ล้านบาทต้องได้รับการอนุมัติจากผู้จัดการ",
    },
  },
  {
    field: "discount",
    rule: (value, context) => {
      // Maximum discount is 20% without approval
      if (context?.discountType === "percentage") {
        return value <= 20;
      }
      return true;
    },
    message: {
      en: "Discount over 20% requires approval",
      th: "ส่วนลดมากกว่า 20% ต้องได้รับการอนุมัติ",
    },
  },
  {
    field: "validityPeriod",
    rule: (value) => {
      // Validity period must be between 7-90 days
      return value >= 7 && value <= 90;
    },
    message: {
      en: "Validity period must be between 7-90 days",
      th: "ระยะเวลาอายุต้องอยู่ระหว่าง 7-90 วัน",
    },
  },
  {
    field: "items",
    rule: (value) => {
      // Must have at least one item
      return Array.isArray(value) && value.length > 0;
    },
    message: {
      en: "Quotation must have at least one item",
      th: "ใบเสนอราคาต้องมีรายการอย่างน้อย 1 รายการ",
    },
  },
];

export const contractValidationRules: ValidationRule[] = [
  {
    field: "startDate",
    rule: (value, context) => {
      const startDate = new Date(value);
      const endDate = new Date(context?.endDate);
      return startDate < endDate;
    },
    message: {
      en: "Start date must be before end date",
      th: "วันที่เริ่มต้นต้องอยู่ก่อนวันที่สิ้นสุด",
    },
  },
  {
    field: "totalValue",
    rule: (value) => {
      // Contracts under 50,000 THB require finance review
      return value >= 50000;
    },
    message: {
      en: "Contracts under 50,000 THB must be reviewed",
      th: "สัญญาต่ำกว่า 50,000 บาทต้องได้รับการตรวจสอบ",
    },
  },
  {
    field: "renewalNoticeDays",
    rule: (value) => {
      // Renewal notice must be at least 30 days
      return value >= 30;
    },
    message: {
      en: "Renewal notice must be at least 30 days in advance",
      th: "ต้องแจ้งต่ออายุล่วงหน้าอย่างน้อย 30 วัน",
    },
  },
];

export const dealValidationRules: ValidationRule[] = [
  {
    field: "value",
    rule: (value) => {
      return value > 0;
    },
    message: {
      en: "Deal value must be greater than 0",
      th: "มูลค่าดีลต้องมากกว่า 0",
    },
  },
  {
    field: "probability",
    rule: (value) => {
      return value >= 0 && value <= 100;
    },
    message: {
      en: "Probability must be between 0-100%",
      th: "โอกาสความสำเร็จต้องอยู่ระหว่าง 0-100%",
    },
  },
  {
    field: "expectedCloseDate",
    rule: (value) => {
      const closeDate = new Date(value);
      const today = new Date();
      return closeDate >= today;
    },
    message: {
      en: "Expected close date must be in the future",
      th: "วันที่คาดว่าจะปิดดีลต้องเป็นวันในอนาคต",
    },
  },
];

// ==================== APPROVAL WORKFLOWS ====================

export interface ApprovalWorkflowConfig {
  type: string;
  stages: ApprovalStageConfig[];
  condition?: (data: any) => boolean;
}

export interface ApprovalStageConfig {
  order: number;
  name: string;
  role: string;
  requiredWhen?: (data: any) => boolean;
  autoApproveWhen?: (data: any) => boolean;
  slaHours: number;
}

export const approvalWorkflows: Record<string, ApprovalWorkflowConfig[]> = {
  quotation: [
    {
      type: "standard",
      condition: (data) => data.total <= 1000000,
      stages: [
        {
          order: 1,
          name: "Sales Manager",
          role: "manager",
          slaHours: 24,
        },
      ],
    },
    {
      type: "high_value",
      condition: (data) => data.total > 1000000 && data.total <= 5000000,
      stages: [
        {
          order: 1,
          name: "Sales Manager",
          role: "manager",
          slaHours: 24,
        },
        {
          order: 2,
          name: "Finance Review",
          role: "accounting",
          slaHours: 48,
        },
      ],
    },
    {
      type: "enterprise",
      condition: (data) => data.total > 5000000,
      stages: [
        {
          order: 1,
          name: "Sales Manager",
          role: "manager",
          slaHours: 24,
        },
        {
          order: 2,
          name: "Finance Review",
          role: "accounting",
          slaHours: 48,
        },
        {
          order: 3,
          name: "Legal Compliance",
          role: "admin",
          slaHours: 72,
        },
        {
          order: 4,
          name: "Executive Approval",
          role: "admin",
          slaHours: 48,
        },
      ],
    },
  ],
  contract: [
    {
      type: "standard",
      condition: (data) => data.totalValue <= 2000000,
      stages: [
        {
          order: 1,
          name: "Operations Manager",
          role: "operations",
          slaHours: 48,
        },
        {
          order: 2,
          name: "Legal Review",
          role: "admin",
          slaHours: 72,
        },
      ],
    },
    {
      type: "high_value",
      condition: (data) => data.totalValue > 2000000,
      stages: [
        {
          order: 1,
          name: "Operations Manager",
          role: "operations",
          slaHours: 48,
        },
        {
          order: 2,
          name: "Finance Review",
          role: "accounting",
          slaHours: 48,
        },
        {
          order: 3,
          name: "Legal Review",
          role: "admin",
          slaHours: 72,
        },
        {
          order: 4,
          name: "Executive Approval",
          role: "admin",
          slaHours: 48,
        },
      ],
    },
  ],
  discount: [
    {
      type: "low_discount",
      condition: (data) => data.discountPercentage <= 10,
      stages: [
        {
          order: 1,
          name: "Sales Manager",
          role: "manager",
          autoApproveWhen: (data) => data.discountPercentage <= 5,
          slaHours: 24,
        },
      ],
    },
    {
      type: "high_discount",
      condition: (data) => data.discountPercentage > 10 && data.discountPercentage <= 20,
      stages: [
        {
          order: 1,
          name: "Sales Manager",
          role: "manager",
          slaHours: 24,
        },
        {
          order: 2,
          name: "Regional Manager",
          role: "manager",
          slaHours: 48,
        },
      ],
    },
    {
      type: "exceptional_discount",
      condition: (data) => data.discountPercentage > 20,
      stages: [
        {
          order: 1,
          name: "Sales Manager",
          role: "manager",
          slaHours: 24,
        },
        {
          order: 2,
          name: "Regional Manager",
          role: "manager",
          slaHours: 48,
        },
        {
          order: 3,
          name: "CFO Approval",
          role: "admin",
          slaHours: 72,
        },
      ],
    },
  ],
  refund: [
    {
      type: "small_refund",
      condition: (data) => data.amount <= 50000,
      stages: [
        {
          order: 1,
          name: "Customer Service Manager",
          role: "manager",
          slaHours: 24,
        },
      ],
    },
    {
      type: "large_refund",
      condition: (data) => data.amount > 50000,
      stages: [
        {
          order: 1,
          name: "Customer Service Manager",
          role: "manager",
          slaHours: 24,
        },
        {
          order: 2,
          name: "Finance Manager",
          role: "accounting",
          slaHours: 48,
        },
        {
          order: 3,
          name: "Executive Approval",
          role: "admin",
          requiredWhen: (data) => data.amount > 200000,
          slaHours: 72,
        },
      ],
    },
  ],
};

// ==================== BUSINESS LOGIC HELPERS ====================

export const getApprovalWorkflow = (type: string, data: any): ApprovalWorkflowConfig | null => {
  const workflows = approvalWorkflows[type];
  if (!workflows) return null;
  
  for (const workflow of workflows) {
    if (!workflow.condition || workflow.condition(data)) {
      return workflow;
    }
  }
  
  return workflows[0]; // Return default workflow
};

export const calculateApprovalProgress = (workflow: any[]): number => {
  const totalStages = workflow.length;
  const completedStages = workflow.filter(s => s.status === "approved").length;
  return Math.round((completedStages / totalStages) * 100);
};

export const isApprovalRequired = (type: string, data: any): boolean => {
  switch (type) {
    case "quotation":
      return data.total > 1000000 || (data.discount && data.discountType === "percentage" && data.discount > 10);
    case "contract":
      return data.totalValue > 50000;
    case "discount":
      return data.discountPercentage > 5;
    case "refund":
      return data.amount > 10000;
    default:
      return false;
  }
};

// ==================== WORKFLOW AUTOMATION ====================

export interface AutomationRule {
  trigger: string;
  condition: (data: any) => boolean;
  actions: AutomationAction[];
}

export interface AutomationAction {
  type: "create_task" | "send_notification" | "update_status" | "send_email" | "create_approval";
  data: any;
}

export const automationRules: AutomationRule[] = [
  {
    trigger: "quotation_sent",
    condition: (data) => data.status === "sent",
    actions: [
      {
        type: "create_task",
        data: {
          type: "follow_up",
          title: "Follow up on quotation",
          dueDate: "+3 days",
        },
      },
      {
        type: "send_notification",
        data: {
          title: "Quotation Sent",
          message: "Quotation has been sent to customer",
        },
      },
    ],
  },
  {
    trigger: "quotation_expired",
    condition: (data) => {
      const expiryDate = new Date(data.expiryDate);
      const today = new Date();
      return expiryDate < today && data.status !== "accepted";
    },
    actions: [
      {
        type: "update_status",
        data: {
          status: "expired",
        },
      },
      {
        type: "send_notification",
        data: {
          title: "Quotation Expired",
          message: "Quotation has expired without acceptance",
        },
      },
    ],
  },
  {
    trigger: "contract_renewal_due",
    condition: (data) => {
      const endDate = new Date(data.endDate);
      const today = new Date();
      const daysUntilExpiry = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntilExpiry <= data.renewalNoticeDays && data.autoRenewal;
    },
    actions: [
      {
        type: "create_task",
        data: {
          type: "coordinator",
          title: "Prepare contract renewal",
          priority: "p2",
        },
      },
      {
        type: "send_notification",
        data: {
          title: "Contract Renewal Due",
          message: "Contract is approaching renewal date",
        },
      },
      {
        type: "send_email",
        data: {
          template: "contract_renewal_notice",
          to: "customer",
        },
      },
    ],
  },
  {
    trigger: "ticket_sla_warning",
    condition: (data) => {
      return data.slaStatus === "warning";
    },
    actions: [
      {
        type: "send_notification",
        data: {
          title: "SLA Warning",
          message: "Ticket is approaching SLA deadline",
          type: "warning",
        },
      },
    ],
  },
  {
    trigger: "ticket_sla_breach",
    condition: (data) => {
      return data.slaStatus === "overdue";
    },
    actions: [
      {
        type: "send_notification",
        data: {
          title: "SLA Breach",
          message: "Ticket has exceeded SLA deadline",
          type: "error",
        },
      },
      {
        type: "create_task",
        data: {
          type: "follow_up",
          title: "Escalate overdue ticket",
          priority: "p1",
        },
      },
    ],
  },
  {
    trigger: "deal_won",
    condition: (data) => data.status === "won",
    actions: [
      {
        type: "create_task",
        data: {
          type: "coordinator",
          title: "Prepare contract from deal",
        },
      },
      {
        type: "send_notification",
        data: {
          title: "Deal Won!",
          message: "Congratulations! Deal has been won",
          type: "success",
        },
      },
    ],
  },
  {
    trigger: "approval_completed",
    condition: (data) => data.status === "approved",
    actions: [
      {
        type: "send_notification",
        data: {
          title: "Approval Completed",
          message: "All approval stages have been completed",
          type: "success",
        },
      },
      {
        type: "update_status",
        data: {
          relatedEntityStatus: "approved",
        },
      },
    ],
  },
];

// ==================== PRICING RULES ====================

export interface PricingRule {
  name: string;
  condition: (data: any) => boolean;
  apply: (price: number, data: any) => number;
  description: {
    en: string;
    th: string;
  };
}

export const pricingRules: PricingRule[] = [
  {
    name: "volume_discount",
    condition: (data) => data.quantity >= 100,
    apply: (price, data) => {
      if (data.quantity >= 500) return price * 0.85; // 15% discount
      if (data.quantity >= 300) return price * 0.90; // 10% discount
      return price * 0.95; // 5% discount
    },
    description: {
      en: "Volume discount: 5% for 100+, 10% for 300+, 15% for 500+",
      th: "ส่วนลดตามปริมาณ: 5% สำหรับ 100+ ชิ้น, 10% สำหรับ 300+ ชิ้น, 15% สำหรับ 500+ ชิ้น",
    },
  },
  {
    name: "long_term_discount",
    condition: (data) => data.contractMonths >= 12,
    apply: (price, data) => {
      if (data.contractMonths >= 36) return price * 0.80; // 20% discount for 3+ years
      if (data.contractMonths >= 24) return price * 0.85; // 15% discount for 2+ years
      return price * 0.90; // 10% discount for 1+ year
    },
    description: {
      en: "Long-term contract discount: 10% for 1 year, 15% for 2 years, 20% for 3 years",
      th: "ส่วนลดสัญญาระยะยาว: 10% สำหรับ 1 ปี, 15% สำหรับ 2 ปี, 20% สำหรับ 3 ปี",
    },
  },
  {
    name: "scg_partner_discount",
    condition: (data) => data.customerType === "scg" || data.customerType === "scgjwd",
    apply: (price) => price * 0.92, // 8% discount
    description: {
      en: "SCG Group partner discount: 8%",
      th: "ส่วนลดพันธมิตร SCG Group: 8%",
    },
  },
  {
    name: "seasonal_promotion",
    condition: (data) => {
      const month = new Date().getMonth();
      return month === 11 || month === 0; // December or January
    },
    apply: (price) => price * 0.95, // 5% seasonal discount
    description: {
      en: "Year-end promotion: 5% discount in December and January",
      th: "โปรโมชั่นสิ้นปี: ส่วนลด 5% ในเดือนธันวาคมและมกราคม",
    },
  },
];

export const applyPricingRules = (basePrice: number, data: any): { finalPrice: number; appliedRules: string[] } => {
  let finalPrice = basePrice;
  const appliedRules: string[] = [];
  
  for (const rule of pricingRules) {
    if (rule.condition(data)) {
      finalPrice = rule.apply(finalPrice, data);
      appliedRules.push(rule.name);
    }
  }
  
  return { finalPrice, appliedRules };
};

// ==================== SLA MANAGEMENT ====================

export const calculateSLADeadline = (priority: string, createdAt: Date): Date => {
  const priorityData = masterData.priorities.find(p => p.value === priority);
  if (!priorityData || !priorityData.sla) {
    return new Date(createdAt.getTime() + 24 * 60 * 60 * 1000); // Default 24 hours
  }
  
  const deadline = new Date(createdAt);
  deadline.setHours(deadline.getHours() + priorityData.sla);
  return deadline;
};

export const getSLAStatus = (priority: string, createdAt: Date, currentStatus: string): "on-time" | "warning" | "overdue" => {
  if (currentStatus === "closed" || currentStatus === "completed") return "on-time";
  
  const deadline = calculateSLADeadline(priority, createdAt);
  const now = new Date();
  const timeRemaining = deadline.getTime() - now.getTime();
  const hoursRemaining = timeRemaining / (1000 * 60 * 60);
  
  if (timeRemaining < 0) return "overdue";
  if (hoursRemaining < 2) return "warning";
  return "on-time";
};

export const getSLATimeRemaining = (priority: string, createdAt: Date): string => {
  const deadline = calculateSLADeadline(priority, createdAt);
  const now = new Date();
  const diff = deadline.getTime() - now.getTime();
  
  if (diff < 0) {
    const hours = Math.abs(Math.floor(diff / (1000 * 60 * 60)));
    return `-${hours}h (overdue)`;
  }
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${hours}h ${minutes}m`;
};
