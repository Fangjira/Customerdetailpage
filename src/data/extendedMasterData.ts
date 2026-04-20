// Extended Master Data for Advanced CRM Features
// Customer Management, Activities, Visit, System Management, etc.

export const extendedMasterData = {
  // ==================== CUSTOMER ADVANCED ====================
  customerTags: [
    { value: "vip", label: { en: "VIP", th: "วีไอพี" }, color: "purple" },
    { value: "strategic", label: { en: "Strategic", th: "ลูกค้ายุทธศาสตร์" }, color: "blue" },
    { value: "high_value", label: { en: "High Value", th: "มูลค่าสูง" }, color: "green" },
    { value: "potential", label: { en: "High Potential", th: "ศักยภาพสูง" }, color: "cyan" },
    { value: "risk", label: { en: "Risk", th: "เสี่ยง" }, color: "red" },
    { value: "dormant", label: { en: "Dormant", th: "ไม่มีธุรกรรม" }, color: "orange" },
    { value: "partner", label: { en: "Partner", th: "พันธมิตร" }, color: "indigo" },
    { value: "competitor", label: { en: "Competitor", th: "คู่แข่ง" }, color: "gray" },
  ],

  customerLifecycleStages: [
    { value: "lead", label: { en: "Lead", th: "ลีด" }, color: "blue" },
    { value: "prospect", label: { en: "Prospect", th: "โอกาส" }, color: "cyan" },
    { value: "new", label: { en: "New Customer", th: "ลูกค้าใหม่" }, color: "green" },
    { value: "active", label: { en: "Active", th: "ใช้งานอยู่" }, color: "purple" },
    { value: "at_risk", label: { en: "At Risk", th: "เสี่ยงจะสูญเสีย" }, color: "orange" },
    { value: "dormant", label: { en: "Dormant", th: "หยุดใช้งาน" }, color: "yellow" },
    { value: "lost", label: { en: "Lost", th: "สูญเสียแล้ว" }, color: "red" },
    { value: "reactivated", label: { en: "Reactivated", th: "กลับมาใช้ใหม่" }, color: "teal" },
  ],

  customerSegments: [
    { value: "enterprise", label: { en: "Enterprise", th: "องค์กรใหญ่" }, criteria: "Annual revenue > $10M" },
    { value: "mid_market", label: { en: "Mid-Market", th: "องค์กรขนาดกลาง" }, criteria: "Annual revenue $1M-$10M" },
    { value: "smb", label: { en: "SMB", th: "SMB" }, criteria: "Annual revenue < $1M" },
    { value: "startup", label: { en: "Startup", th: "สตาร์ทอัพ" }, criteria: "New business < 3 years" },
  ],

  healthScoreFactors: [
    { factor: "engagement", weight: 0.25, label: { en: "Customer Engagement", th: "การมีส่วนร่วม" } },
    { factor: "usage", weight: 0.20, label: { en: "Service Usage", th: "การใช้บริการ" } },
    { factor: "payment", weight: 0.20, label: { en: "Payment History", th: "ประวัติการชำระเงิน" } },
    { factor: "support", weight: 0.15, label: { en: "Support Satisfaction", th: "ความพึงพอใจในบริการ" } },
    { factor: "growth", weight: 0.20, label: { en: "Revenue Growth", th: "การเติบโตของรายได้" } },
  ],

  addressTypes: [
    { value: "head_office", label: { en: "Head Office", th: "สำนักงานใหญ่" }, icon: "Building2" },
    { value: "billing", label: { en: "Billing Address", th: "ที่อยู่ออกบิล" }, icon: "FileText" },
    { value: "shipping", label: { en: "Shipping Address", th: "ที่อยู่จัดส่ง" }, icon: "Truck" },
    { value: "branch", label: { en: "Branch Office", th: "สาขา" }, icon: "Building" },
    { value: "warehouse", label: { en: "Warehouse", th: "คลังสินค้า" }, icon: "Warehouse" },
    { value: "factory", label: { en: "Factory", th: "โรงงาน" }, icon: "Factory" },
    { value: "other", label: { en: "Other", th: "อื่นๆ" }, icon: "MapPin" },
  ],

  contactRoles: [
    { value: "ceo", label: { en: "CEO", th: "ซีอีโอ" }, isDecisionMaker: true },
    { value: "cfo", label: { en: "CFO", th: "ซีเอฟโอ" }, isDecisionMaker: true },
    { value: "coo", label: { en: "COO", th: "ซีโออี" }, isDecisionMaker: true },
    { value: "director", label: { en: "Director", th: "ผู้อำนวยการ" }, isDecisionMaker: true },
    { value: "manager", label: { en: "Manager", th: "ผู้จัดการ" }, isDecisionMaker: false },
    { value: "purchasing", label: { en: "Purchasing Officer", th: "เจ้าหน้าที่จัดซื้อ" }, isDecisionMaker: false },
    { value: "logistics", label: { en: "Logistics Manager", th: "ผู้จัดการฝ่ายโลจิสติกส์" }, isDecisionMaker: false },
    { value: "operations", label: { en: "Operations Manager", th: "ผู้จัดการฝ่ายปฏิบัติการ" }, isDecisionMaker: false },
    { value: "finance", label: { en: "Finance Manager", th: "ผู้จัดการฝ่ายการเงิน" }, isDecisionMaker: false },
    { value: "it", label: { en: "IT Manager", th: "ผู้จัดการฝ่าย IT" }, isDecisionMaker: false },
    { value: "coordinator", label: { en: "Coordinator", th: "ผู้ประสานงาน" }, isDecisionMaker: false },
  ],

  customerRelationshipTypes: [
    { value: "parent", label: { en: "Parent Company", th: "บริษัทแม่" } },
    { value: "subsidiary", label: { en: "Subsidiary", th: "บริษัทลูก" } },
    { value: "branch", label: { en: "Branch", th: "สาขา" } },
    { value: "affiliate", label: { en: "Affiliate", th: "บริษัทในเครือ" } },
    { value: "partner", label: { en: "Business Partner", th: "พันธมิตรทางธุรกิจ" } },
  ],

  // ==================== DEAL & SALES ADVANCED ====================
  dealStages: [
    { value: "prospecting", label: { en: "Prospecting", th: "หาโอกาส" }, probability: 10, color: "gray" },
    { value: "qualification", label: { en: "Qualification", th: "คัดกรอง" }, probability: 20, color: "blue" },
    { value: "needs_analysis", label: { en: "Needs Analysis", th: "วิเคราะห์ความต้องการ" }, probability: 30, color: "cyan" },
    { value: "proposal", label: { en: "Proposal", th: "เสนอราคา" }, probability: 50, color: "purple" },
    { value: "negotiation", label: { en: "Negotiation", th: "เจรจา" }, probability: 70, color: "orange" },
    { value: "closed_won", label: { en: "Closed Won", th: "ปิดการขายสำเร็จ" }, probability: 100, color: "green" },
    { value: "closed_lost", label: { en: "Closed Lost", th: "ปิดการขายไม่สำเร็จ" }, probability: 0, color: "red" },
  ],

  lossReasons: [
    { value: "price", label: { en: "Price too high", th: "ราคาสูงเกินไป" }, category: "pricing" },
    { value: "competitor", label: { en: "Lost to competitor", th: "แพ้คู่แข่ง" }, category: "competition" },
    { value: "no_budget", label: { en: "No budget", th: "ไม่มีงบประมาณ" }, category: "budget" },
    { value: "timing", label: { en: "Bad timing", th: "ไม่ใช่เวลาที่เหมาะสม" }, category: "timing" },
    { value: "no_decision", label: { en: "No decision made", th: "ไม่ตัดสินใจ" }, category: "process" },
    { value: "requirements", label: { en: "Requirements not met", th: "ไม่ตรงตามความต้องการ" }, category: "product" },
    { value: "service_quality", label: { en: "Service quality concerns", th: "กังวลคุณภาพบริการ" }, category: "service" },
    { value: "relationship", label: { en: "Relationship issues", th: "ปัญหาความสัมพันธ์" }, category: "relationship" },
    { value: "other", label: { en: "Other", th: "อื่นๆ" }, category: "other" },
  ],

  dealActivities: [
    { value: "call", label: { en: "Phone Call", th: "โทรศัพท์" }, icon: "Phone" },
    { value: "meeting", label: { en: "Meeting", th: "ประชุม" }, icon: "Users" },
    { value: "email", label: { en: "Email", th: "อีเมล" }, icon: "Mail" },
    { value: "presentation", label: { en: "Presentation", th: "นำเสนอ" }, icon: "Monitor" },
    { value: "site_visit", label: { en: "Site Visit", th: "เยี่ยมชมสถานที่" }, icon: "MapPin" },
    { value: "demo", label: { en: "Demo", th: "สาธิต" }, icon: "PlayCircle" },
    { value: "proposal", label: { en: "Proposal Sent", th: "ส่งใบเสนอราคา" }, icon: "FileText" },
    { value: "negotiation", label: { en: "Negotiation", th: "เจรจา" }, icon: "MessageSquare" },
  ],

  competitorCompanies: [
    { value: "scg_logistics", label: { en: "SCG Logistics", th: "SCG Logistics" } },
    { value: "kerry_logistics", label: { en: "Kerry Logistics", th: "Kerry Logistics" } },
    { value: "wha_logistics", label: { en: "WHA Logistics", th: "WHA Logistics" } },
    { value: "yusen_logistics", label: { en: "Yusen Logistics", th: "Yusen Logistics" } },
    { value: "dhl", label: { en: "DHL", th: "DHL" } },
    { value: "fedex", label: { en: "FedEx", th: "FedEx" } },
    { value: "ups", label: { en: "UPS", th: "UPS" } },
    { value: "db_schenker", label: { en: "DB Schenker", th: "DB Schenker" } },
    { value: "other", label: { en: "Other", th: "อื่นๆ" } },
  ],

  competitorStrengths: [
    { value: "price", label: { en: "Lower Price", th: "ราคาถูกกว่า" } },
    { value: "network", label: { en: "Better Network", th: "เครือข่ายดีกว่า" } },
    { value: "technology", label: { en: "Better Technology", th: "เทคโนโลยีดีกว่า" } },
    { value: "experience", label: { en: "More Experience", th: "ประสบการณ์มากกว่า" } },
    { value: "relationship", label: { en: "Existing Relationship", th: "มีความสัมพันธ์เดิม" } },
    { value: "reputation", label: { en: "Brand Reputation", th: "ชื่อเสียงแบรนด์" } },
  ],

  // ==================== ACTIVITIES & VISITS ====================
  activityTypes: [
    { value: "visit", label: { en: "Customer Visit", th: "เยี่ยมลูกค้า" }, icon: "MapPin", color: "blue" },
    { value: "call", label: { en: "Phone Call", th: "โทรศัพท์" }, icon: "Phone", color: "green" },
    { value: "meeting", label: { en: "Meeting", th: "ประชุม" }, icon: "Users", color: "purple" },
    { value: "email", label: { en: "Email", th: "อีเมล" }, icon: "Mail", color: "cyan" },
    { value: "presentation", label: { en: "Presentation", th: "นำเสนอ" }, icon: "Monitor", color: "orange" },
    { value: "training", label: { en: "Training", th: "อบรม" }, icon: "GraduationCap", color: "indigo" },
    { value: "workshop", label: { en: "Workshop", th: "อบรมเชิงปฏิบัติการ" }, icon: "Wrench", color: "teal" },
    { value: "other", label: { en: "Other", th: "อื่นๆ" }, icon: "Clock", color: "gray" },
  ],

  visitStatuses: [
    { value: "planned", label: { en: "Planned", th: "วางแผนแล้ว" }, color: "blue" },
    { value: "confirmed", label: { en: "Confirmed", th: "ยืนยันแล้ว" }, color: "cyan" },
    { value: "in_progress", label: { en: "In Progress", th: "กำลังดำเนินการ" }, color: "purple" },
    { value: "completed", label: { en: "Completed", th: "เสร็จสิ้น" }, color: "green" },
    { value: "cancelled", label: { en: "Cancelled", th: "ยกเลิก" }, color: "red" },
    { value: "postponed", label: { en: "Postponed", th: "เลื่อนออกไป" }, color: "orange" },
  ],

  visitPurposes: [
    { value: "sales", label: { en: "Sales/New Business", th: "ขาย/ธุรกิจใหม่" } },
    { value: "relationship", label: { en: "Relationship Building", th: "สร้างความสัมพันธ์" } },
    { value: "follow_up", label: { en: "Follow-up", th: "ติดตามงาน" } },
    { value: "complaint", label: { en: "Handle Complaint", th: "จัดการข้อร้องเรียน" } },
    { value: "training", label: { en: "Training/Demo", th: "อบรม/สาธิต" } },
    { value: "survey", label: { en: "Survey/Assessment", th: "สำรวจ/ประเมิน" } },
    { value: "contract_renewal", label: { en: "Contract Renewal", th: "ต่อสัญญา" } },
    { value: "other", label: { en: "Other", th: "อื่นๆ" } },
  ],

  visitOutcomes: [
    { value: "deal_closed", label: { en: "Deal Closed", th: "ปิดการขาย" }, color: "green" },
    { value: "quotation_requested", label: { en: "Quotation Requested", th: "ขอใบเสนอราคา" }, color: "blue" },
    { value: "follow_up_scheduled", label: { en: "Follow-up Scheduled", th: "นัดติดตามต่อ" }, color: "cyan" },
    { value: "information_provided", label: { en: "Information Provided", th: "ให้ข้อมูล" }, color: "purple" },
    { value: "no_interest", label: { en: "No Interest", th: "ไม่สนใจ" }, color: "orange" },
    { value: "pending_decision", label: { en: "Pending Decision", th: "รอการตัดสินใจ" }, color: "yellow" },
    { value: "lost_to_competitor", label: { en: "Lost to Competitor", th: "แพ้คู่แข่ง" }, color: "red" },
  ],

  visitChecklistItems: [
    { id: "prepare_materials", label: { en: "Prepare presentation materials", th: "เตรียมเอกสารนำเสนอ" }, category: "before" },
    { id: "check_customer_info", label: { en: "Review customer information", th: "ตรวจสอบข้อมูลลูกค้า" }, category: "before" },
    { id: "confirm_appointment", label: { en: "Confirm appointment", th: "ยืนยันนัดหมาย" }, category: "before" },
    { id: "bring_samples", label: { en: "Bring product samples", th: "นำตัวอย่างสินค้า" }, category: "before" },
    { id: "meet_decision_maker", label: { en: "Meet decision maker", th: "พบผู้มีอำนาจตัดสินใจ" }, category: "during" },
    { id: "present_solution", label: { en: "Present solution", th: "นำเสนอโซลูชัน" }, category: "during" },
    { id: "understand_needs", label: { en: "Understand customer needs", th: "เข้าใจความต้องการลูกค้า" }, category: "during" },
    { id: "handle_objections", label: { en: "Handle objections", th: "จัดการข้อโต้แย้ง" }, category: "during" },
    { id: "take_photo", label: { en: "Take evidence photos", th: "ถ่ายภาพหลักฐาน" }, category: "during" },
    { id: "update_crm", label: { en: "Update CRM notes", th: "อัปเดตบันทึกใน CRM" }, category: "after" },
    { id: "send_follow_up", label: { en: "Send follow-up email", th: "ส่งอีเมลติดตาม" }, category: "after" },
    { id: "schedule_next", label: { en: "Schedule next action", th: "กำหนดขั้นตอนถัดไป" }, category: "after" },
  ],

  // ==================== QUOTATION & CONTRACT ADVANCED ====================
  quoteTemplates: [
    { value: "standard", label: { en: "Standard Quotation", th: "ใบเสนอราคามาตรฐาน" }, description: { en: "General services quotation", th: "ใบเสนอราคาบริการทั่วไป" } },
    { value: "warehouse", label: { en: "Warehouse Service", th: "บริการคลังสินค้า" }, description: { en: "Warehouse and storage quotation", th: "ใบเสนอราคาคลังสินค้าและจัดเก็บ" } },
    { value: "transport", label: { en: "Transport Service", th: "บริการขนส่ง" }, description: { en: "Transportation quotation", th: "ใบเสนอราคาการขนส่ง" } },
    { value: "customs", label: { en: "Customs Clearance", th: "ศุลกากร" }, description: { en: "Customs clearance quotation", th: "ใบเสนอราคาผ่านพิธีการศุลกากร" } },
    { value: "integrated", label: { en: "Integrated Solution", th: "โซลูชันแบบบูรณาการ" }, description: { en: "Full supply chain solution", th: "โซลูชันห่วงโซ่อุปทานแบบครบวงจร" } },
  ],

  contractTypes: [
    { value: "service_agreement", label: { en: "Service Agreement", th: "สัญญาบริการ" } },
    { value: "master_agreement", label: { en: "Master Service Agreement", th: "สัญญาบริการหลัก" } },
    { value: "frame_contract", label: { en: "Frame Contract", th: "สัญญากรอบ" } },
    { value: "spot_contract", label: { en: "Spot Contract", th: "สัญญาแบบจุด" } },
    { value: "long_term", label: { en: "Long-term Contract", th: "สัญญาระยะยาว" } },
  ],

  contractStatuses: [
    { value: "draft", label: { en: "Draft", th: "ฉบับร่าง" }, color: "gray" },
    { value: "pending_approval", label: { en: "Pending Approval", th: "รออนุมัติ" }, color: "yellow" },
    { value: "approved", label: { en: "Approved", th: "อนุมัติแล้ว" }, color: "blue" },
    { value: "sent_for_signature", label: { en: "Sent for Signature", th: "ส่งลงนามแล้ว" }, color: "cyan" },
    { value: "active", label: { en: "Active", th: "ใช้งานอยู่" }, color: "green" },
    { value: "expiring_soon", label: { en: "Expiring Soon", th: "ใกล้หมดอายุ" }, color: "orange" },
    { value: "expired", label: { en: "Expired", th: "หมดอายุ" }, color: "red" },
    { value: "terminated", label: { en: "Terminated", th: "ยกเลิก" }, color: "red" },
    { value: "renewed", label: { en: "Renewed", th: "ต่ออายุแล้ว" }, color: "purple" },
  ],

  pricingRules: [
    { value: "volume_discount", label: { en: "Volume Discount", th: "ส่วนลดตามปริมาณ" }, type: "discount" },
    { value: "early_payment", label: { en: "Early Payment Discount", th: "ส่วนลดชำระก่อนกำหนด" }, type: "discount" },
    { value: "loyalty_discount", label: { en: "Loyalty Discount", th: "ส่วนลดความภักดี" }, type: "discount" },
    { value: "seasonal_promotion", label: { en: "Seasonal Promotion", th: "โปรโมชั่นตามฤดูกาล" }, type: "promotion" },
    { value: "bundle_pricing", label: { en: "Bundle Pricing", th: "ราคาแบบรวม" }, type: "pricing" },
    { value: "tiered_pricing", label: { en: "Tiered Pricing", th: "ราคาแบบขั้นบันได" }, type: "pricing" },
  ],

  // ==================== SYSTEM & ADMIN ====================
  systemRoles: [
    { 
      value: "super_admin", 
      label: { en: "Super Admin", th: "ผู้ดูแลระบบสูงสุด" },
      permissions: ["*"],
      description: { en: "Full system access", th: "เข้าถึงระบบทั้งหมด" }
    },
    { 
      value: "admin", 
      label: { en: "Admin", th: "ผู้ดูแลระบบ" },
      permissions: ["view_all", "edit_all", "delete_all", "manage_users", "system_settings"],
      description: { en: "System administration", th: "จัดการระบบ" }
    },
    { 
      value: "sales_manager", 
      label: { en: "Sales Manager", th: "ผู้จัดการฝ่ายขาย" },
      permissions: ["view_all_sales", "edit_all_sales", "approve_quotes", "manage_team"],
      description: { en: "Sales team management", th: "จัดการทีมขาย" }
    },
    { 
      value: "sales_rep", 
      label: { en: "Sales Representative", th: "พนักงานขาย" },
      permissions: ["view_own", "edit_own", "create_lead", "create_deal", "create_quote"],
      description: { en: "Sales activities", th: "กิจกรรมการขาย" }
    },
    { 
      value: "operations_manager", 
      label: { en: "Operations Manager", th: "ผู้จัดการฝ่ายปฏิบัติการ" },
      permissions: ["view_all_operations", "edit_operations", "manage_documents", "manage_contracts"],
      description: { en: "Operations management", th: "จัดการปฏิบัติการ" }
    },
    { 
      value: "account_manager", 
      label: { en: "Account Manager", th: "ผู้จัดการบัญชีลูกค้า" },
      permissions: ["view_assigned_accounts", "edit_assigned_accounts", "create_activities"],
      description: { en: "Account management", th: "จัดการบัญชีลูกค้า" }
    },
    { 
      value: "finance", 
      label: { en: "Finance", th: "ฝ่ายการเงิน" },
      permissions: ["view_all_financial", "manage_invoices", "manage_payments", "view_reports"],
      description: { en: "Financial management", th: "จัดการการเงิน" }
    },
    { 
      value: "viewer", 
      label: { en: "Viewer", th: "ผู้ดู" },
      permissions: ["view_own"],
      description: { en: "Read-only access", th: "ดูข้อมูลเท่านั้น" }
    },
  ],

  auditActions: [
    { value: "create", label: { en: "Created", th: "สร้าง" }, icon: "Plus", color: "green" },
    { value: "update", label: { en: "Updated", th: "แก้ไข" }, icon: "Edit", color: "blue" },
    { value: "delete", label: { en: "Deleted", th: "ลบ" }, icon: "Trash", color: "red" },
    { value: "view", label: { en: "Viewed", th: "ดู" }, icon: "Eye", color: "gray" },
    { value: "export", label: { en: "Exported", th: "ส่งออก" }, icon: "Download", color: "purple" },
    { value: "import", label: { en: "Imported", th: "นำเข้า" }, icon: "Upload", color: "cyan" },
    { value: "approve", label: { en: "Approved", th: "อนุมัติ" }, icon: "Check", color: "green" },
    { value: "reject", label: { en: "Rejected", th: "ปฏิเสธ" }, icon: "X", color: "red" },
    { value: "login", label: { en: "Logged In", th: "เข้าสู่ระบบ" }, icon: "LogIn", color: "blue" },
    { value: "logout", label: { en: "Logged Out", th: "ออกจากระบบ" }, icon: "LogOut", color: "gray" },
  ],

  auditEntityTypes: [
    { value: "customer", label: { en: "Customer", th: "ลูกค้า" } },
    { value: "lead", label: { en: "Lead", th: "ลีด" } },
    { value: "deal", label: { en: "Deal", th: "ดีล" } },
    { value: "quotation", label: { en: "Quotation", th: "ใบเสนอราคา" } },
    { value: "contract", label: { en: "Contract", th: "สัญญา" } },
    { value: "activity", label: { en: "Activity", th: "กิจกรรม" } },
    { value: "document", label: { en: "Document", th: "เอกสาร" } },
    { value: "user", label: { en: "User", th: "ผู้ใช้" } },
    { value: "system", label: { en: "System", th: "ระบบ" } },
  ],

  dataVisibilityRules: [
    { value: "private", label: { en: "Private", th: "ส่วนตัว" }, description: { en: "Only visible to owner", th: "เห็นเฉพาะเจ้าของ" } },
    { value: "team", label: { en: "Team", th: "ทีม" }, description: { en: "Visible to team members", th: "เห็นเฉพาะสมาชิกทีม" } },
    { value: "department", label: { en: "Department", th: "แผนก" }, description: { en: "Visible to department", th: "เห็นเฉพาะแผนก" } },
    { value: "company", label: { en: "Company", th: "บริษัท" }, description: { en: "Visible to all company", th: "เห็นทั้งบริษัท" } },
    { value: "public", label: { en: "Public", th: "สาธารณะ" }, description: { en: "Visible to everyone", th: "เห็นทุกคน" } },
  ],

  // ==================== REPORTS & ANALYTICS ====================
  reportCategories: [
    { value: "sales", label: { en: "Sales Reports", th: "รายงานการขาย" }, icon: "TrendingUp" },
    { value: "customer", label: { en: "Customer Reports", th: "รายงานลูกค้า" }, icon: "Users" },
    { value: "activity", label: { en: "Activity Reports", th: "รายงานกิจกรรม" }, icon: "Activity" },
    { value: "financial", label: { en: "Financial Reports", th: "รายงานการเงิน" }, icon: "DollarSign" },
    { value: "operations", label: { en: "Operations Reports", th: "รายงานปฏิบัติการ" }, icon: "Settings" },
    { value: "performance", label: { en: "Performance Reports", th: "รายงานผลการปฏิบัติงาน" }, icon: "BarChart" },
  ],

  kpiMetrics: [
    { value: "total_revenue", label: { en: "Total Revenue", th: "รายได้รวม" }, category: "financial", format: "currency" },
    { value: "revenue_growth", label: { en: "Revenue Growth", th: "การเติบโตของรายได้" }, category: "financial", format: "percentage" },
    { value: "conversion_rate", label: { en: "Conversion Rate", th: "อัตราการแปลง" }, category: "sales", format: "percentage" },
    { value: "average_deal_size", label: { en: "Average Deal Size", th: "มูลค่าดีลเฉลี่ย" }, category: "sales", format: "currency" },
    { value: "sales_cycle_length", label: { en: "Sales Cycle Length", th: "ระยะเวลาวงจรการขาย" }, category: "sales", format: "days" },
    { value: "customer_acquisition_cost", label: { en: "Customer Acquisition Cost", th: "ต้นทุนการหาลูกค้าใหม่" }, category: "financial", format: "currency" },
    { value: "customer_lifetime_value", label: { en: "Customer Lifetime Value", th: "มูลค่าตลอดชีพลูกค้า" }, category: "financial", format: "currency" },
    { value: "customer_retention_rate", label: { en: "Customer Retention Rate", th: "อัตราการรักษาลูกค้า" }, category: "customer", format: "percentage" },
    { value: "customer_churn_rate", label: { en: "Customer Churn Rate", th: "อัตราการสูญเสียลูกค้า" }, category: "customer", format: "percentage" },
    { value: "nps_score", label: { en: "Net Promoter Score", th: "คะแนน NPS" }, category: "customer", format: "number" },
    { value: "activities_per_day", label: { en: "Activities per Day", th: "กิจกรรมต่อวัน" }, category: "activity", format: "number" },
    { value: "meetings_per_week", label: { en: "Meetings per Week", th: "การประชุมต่อสัปดาห์" }, category: "activity", format: "number" },
  ],

  timeRanges: [
    { value: "today", label: { en: "Today", th: "วันนี้" } },
    { value: "yesterday", label: { en: "Yesterday", th: "เมื่อวาน" } },
    { value: "this_week", label: { en: "This Week", th: "สัปดาห์นี้" } },
    { value: "last_week", label: { en: "Last Week", th: "สัปดาห์ที่แล้ว" } },
    { value: "this_month", label: { en: "This Month", th: "เดือนนี้" } },
    { value: "last_month", label: { en: "Last Month", th: "เดือนที่แล้ว" } },
    { value: "this_quarter", label: { en: "This Quarter", th: "ไตรมาสนี้" } },
    { value: "last_quarter", label: { en: "Last Quarter", th: "ไตรมาสที่แล้ว" } },
    { value: "this_year", label: { en: "This Year", th: "ปีนี้" } },
    { value: "last_year", label: { en: "Last Year", th: "ปีที่แล้ว" } },
    { value: "custom", label: { en: "Custom Range", th: "กำหนดเอง" } },
  ],

  exportFormats: [
    { value: "xlsx", label: { en: "Excel (.xlsx)", th: "Excel (.xlsx)" }, icon: "FileSpreadsheet" },
    { value: "csv", label: { en: "CSV (.csv)", th: "CSV (.csv)" }, icon: "FileText" },
    { value: "pdf", label: { en: "PDF (.pdf)", th: "PDF (.pdf)" }, icon: "FileType" },
    { value: "json", label: { en: "JSON (.json)", th: "JSON (.json)" }, icon: "Code" },
  ],

  // ==================== PROVINCES & REGIONS (Thailand) ====================
  regions: [
    { value: "central", label: { en: "Central", th: "ภาคกลาง" } },
    { value: "north", label: { en: "North", th: "ภาคเหนือ" } },
    { value: "northeast", label: { en: "Northeast", th: "ภาคตะวันออกเฉียงเหนือ" } },
    { value: "east", label: { en: "East", th: "ภาคตะวันออก" } },
    { value: "west", label: { en: "West", th: "ภาคตะวันตก" } },
    { value: "south", label: { en: "South", th: "ภาคใต้" } },
  ],

  provinces: [
    { value: "bangkok", label: { en: "Bangkok", th: "กรุงเทพมหานคร" }, region: "central" },
    { value: "samut_prakan", label: { en: "Samut Prakan", th: "สมุทรปราการ" }, region: "central" },
    { value: "nonthaburi", label: { en: "Nonthaburi", th: "นนทบุรี" }, region: "central" },
    { value: "pathum_thani", label: { en: "Pathum Thani", th: "ปทุมธานี" }, region: "central" },
    { value: "chonburi", label: { en: "Chonburi", th: "ชลบุรี" }, region: "east" },
    { value: "rayong", label: { en: "Rayong", th: "ระยอง" }, region: "east" },
    { value: "chiang_mai", label: { en: "Chiang Mai", th: "เชียงใหม่" }, region: "north" },
    { value: "phuket", label: { en: "Phuket", th: "ภูเก็ต" }, region: "south" },
    // Add more provinces as needed
  ],
};

// Helper functions
export const getContactsByService = (serviceId: string) => {
  // This would fetch service-specific contacts from database
  return [];
};

export const calculateHealthScore = (factors: Record<string, number>): number => {
  let totalScore = 0;
  extendedMasterData.healthScoreFactors.forEach(({ factor, weight }) => {
    const score = factors[factor] || 0;
    totalScore += score * weight;
  });
  return Math.round(totalScore);
};

export const getHealthScoreColor = (score: number): string => {
  if (score >= 80) return "green";
  if (score >= 60) return "blue";
  if (score >= 40) return "yellow";
  if (score >= 20) return "orange";
  return "red";
};

export const getHealthScoreLabel = (score: number): { en: string; th: string } => {
  if (score >= 80) return { en: "Excellent", th: "ดีเยี่ยม" };
  if (score >= 60) return { en: "Good", th: "ดี" };
  if (score >= 40) return { en: "Fair", th: "พอใช้" };
  if (score >= 20) return { en: "Poor", th: "แย่" };
  return { en: "Critical", th: "วิกฤต" };
};

export const getDealScoring = (deal: any): number => {
  // Scoring based on multiple factors
  let score = 0;
  
  // Stage probability
  const stage = extendedMasterData.dealStages.find(s => s.value === deal.stage);
  score += (stage?.probability || 0) * 0.4;
  
  // Engagement level
  if (deal.lastActivityDays < 7) score += 20;
  else if (deal.lastActivityDays < 14) score += 10;
  else if (deal.lastActivityDays < 30) score += 5;
  
  // Decision maker engaged
  if (deal.decisionMakerEngaged) score += 15;
  
  // Budget confirmed
  if (deal.budgetConfirmed) score += 10;
  
  // Need urgency
  if (deal.urgency === "high") score += 10;
  else if (deal.urgency === "medium") score += 5;
  
  return Math.min(100, Math.round(score));
};
