// Master Data for Enterprise CRM System
// This file contains all lookup data, dropdown options, and business rules

export const masterData = {
  // ==================== LEAD & CUSTOMER ====================
  leadTypes: [
    {
      value: "cold_call",
      label: { en: "Cold Call", th: "โทรหาลูกค้าใหม่" },
    },
    {
      value: "existing_customer",
      label: { en: "Existing Customer", th: "ลูกค้าเดิม" },
    },
    {
      value: "management",
      label: { en: "Management", th: "ฝ่ายบริหาร" },
    },
    {
      value: "jv_subsidiary",
      label: {
        en: "JV/Subsidiary",
        th: "บริษัทร่วมทุน/บริษัทในเครือ",
      },
    },
    {
      value: "marketing_group",
      label: { en: "Marketing Group", th: "กลุ่มการตลาด" },
    },
    { value: "cdp", label: { en: "CDP", th: "CDP" } },
    { value: "other", label: { en: "Other", th: "อื่นๆ" } },
  ],

  customerTypes: [
    { value: "scg", label: { en: "SCG", th: "SCG" } },
    { value: "scgjwd", label: { en: "SCGJWD", th: "SCGJWD" } },
    {
      value: "partner",
      label: { en: "Partner", th: "พาร์ทเนอร์" },
    },
    { value: "vendor", label: { en: "Vendor", th: "ผู้ขาย" } },
    {
      value: "new_customer",
      label: { en: "New Customer", th: "ลูกค้าใหม่" },
    },
    {
      value: "government",
      label: { en: "Government", th: "หน่วยงานราชการ" },
    },
  ],

  salesChannels: [
    { value: "b2b", label: { en: "B2B", th: "B2B" } },
    { value: "b2c", label: { en: "B2C", th: "B2C" } },
    { value: "d2c", label: { en: "D2C", th: "D2C" } },
  ],

  customerStatuses: [
    {
      value: "new_lead",
      label: { en: "New Lead", th: "ลีดใหม่" },
    },
    {
      value: "existing",
      label: { en: "Existing", th: "ลูกค้าเดิม" },
    },
    {
      value: "follow_up",
      label: { en: "Follow-up", th: "ติดตามต่อ" },
    },
    { value: "lost", label: { en: "Lost", th: "สูญเสีย" } },
  ],

  contactSources: [
    {
      value: "phone",
      label: { en: "Phone", th: "โทรศัพท์" },
      icon: "Phone",
    },
    {
      value: "email",
      label: { en: "Email", th: "อีเมล" },
      icon: "Mail",
    },
    {
      value: "walk_in",
      label: { en: "Walk-in", th: "เดินเข้ามาเอง" },
      icon: "User",
    },
    {
      value: "line",
      label: { en: "Line", th: "Line" },
      icon: "MessageCircle",
    },
    {
      value: "facebook",
      label: { en: "Facebook", th: "Facebook" },
      icon: "Facebook",
    },
    {
      value: "instagram",
      label: { en: "Instagram", th: "Instagram" },
      icon: "Instagram",
    },
    {
      value: "tiktok",
      label: { en: "TikTok", th: "TikTok" },
      icon: "Video",
    },
    {
      value: "online_booking",
      label: { en: "Online Booking", th: "จองออนไลน์" },
      icon: "Globe",
    },
  ],

  // ==================== INDUSTRY & SUPPLY CHAIN ====================
  industries: [
    {
      value: "agriculture",
      label: { en: "Agriculture", th: "เกษตรกรรม" },
    },
    {
      value: "automotive",
      label: { en: "Automotive", th: "ยานยนต์" },
    },
    {
      value: "Construction & Building Material",
      label: {
        en: "Construction & Building Material",
        th: "ก่อสร้างและวัสดุก่อสร้าง",
      },
    },
    {
      value: "Chemical & Dangerous Goods",
      label: {
        en: "Chemical & Dangerous Goods",
        th: "เคมีภัณฑ์และสินค้าอันตราย",
      },
    },
    {
      value: "circular_economy",
      label: {
        en: "Circular Economy",
        th: "เศรษฐกิจหมุนเวียน",
      },
    },
    {
      value: "Electronics & Electrical Appliances",
      label: {
        en: "Electronics & Electrical Appliances",
        th: "อิเล็กทรอนิกส์และเครื่องใช้ไฟฟ้า",
      },
    },
    {
      value: "Energy & Utilities",
      label: {
        en: "Energy & Utilities",
        th: "พลังงานและสาธารณูปโภค",
      },
    },
    {
      value: "Fashion & Garment",
      label: {
        en: "Fashion & Garment",
        th: "แฟชั่นและเสื้อผ้า",
      },
    },
    {
      value: "Food & FMCG",
      label: {
        en: "Food & FMCG",
        th: "อาหารและสินค้าอุปโภคบริโภค",
      },
    },
    {
      value: "Home Living & White Glove",
      label: {
        en: "Home Living & White Glove",
        th: "เฟอร์นิเจอร์และของใช้ในบ้าน",
      },
    },
    {
      value: "packaging",
      label: { en: "Packaging", th: "บรรจุภัณฑ์" },
    },
    {
      value: "Healthcare & Pharmaceutical",
      label: {
        en: "Healthcare & Pharmaceutical",
        th: "สุขภาพและเภสัชกรรม",
      },
    },
    {
      value: "waste_management",
      label: { en: "Waste Management", th: "การจัดการขยะ" },
    },
    { value: "other", label: { en: "Other", th: "อื่นๆ" } },
  ],

  supplyChainRoles: [
    {
      value: "importer",
      label: { en: "Importer", th: "ผู้นำเข้า" },
    },
    {
      value: "exporter",
      label: { en: "Exporter", th: "ผู้ส่งออก" },
    },
    {
      value: "manufacturer",
      label: { en: "Manufacturer", th: "ผู้ผลิต" },
    },
    {
      value: "distributor",
      label: { en: "Distributor", th: "ผู้จัดจำหน่าย" },
    },
    {
      value: "wholesaler_retailer",
      label: {
        en: "Wholesaler/Retailer",
        th: "ผู้ค้าส่ง/ผู้ค้าปลีก",
      },
    },
    {
      value: "freight_forwarder",
      label: {
        en: "Freight Forwarder/Logistics",
        th: "ผู้ให้บริการโลจิสติกส์",
      },
    },
  ],

  // ==================== BUSINESS HIERARCHY ====================
  businessHierarchy: {
    asean_island: {
      label: {
        en: "ASEAN Island Country & Taiwan Business",
        th: "ธุรกิจอาเซียน เกาะ และไต้หวัน",
      },
      subGroups: {
        island_trade: {
          label: { en: "Island Trade", th: "การค้าเกาะ" },
          productGroups: [
            "import_export",
            "cross_border",
            "island_logistics",
          ],
        },
        taiwan_operations: {
          label: {
            en: "Taiwan Operations",
            th: "การดำเนินงานไต้หวัน",
          },
          productGroups: ["taiwan_freight", "taiwan_warehouse"],
        },
      },
    },
    clmv_china: {
      label: {
        en: "CLMV & China Business",
        th: "ธุรกิจ CLMV และจีน",
      },
      subGroups: {
        clmv_corridor: {
          label: { en: "CLMV Corridor", th: "เส้นทาง CLMV" },
          productGroups: [
            "cross_border_trucking",
            "customs_clearance",
            "multi_modal",
          ],
        },
        china_gateway: {
          label: { en: "China Gateway", th: "เกตเวย์จีน" },
          productGroups: [
            "china_import",
            "china_export",
            "rail_freight",
          ],
        },
      },
    },
    b2b2c: {
      label: { en: "B2B2C Business", th: "ธุรกิจ B2B2C" },
      subGroups: {
        ecommerce_fulfillment: {
          label: {
            en: "E-commerce Fulfillment",
            th: "ฟูลฟิลเมนต์อีคอมเมิร์ซ",
          },
          productGroups: [
            "warehouse_management",
            "order_fulfillment",
            "last_mile_delivery",
          ],
        },
        retail_distribution: {
          label: {
            en: "Retail Distribution",
            th: "การจัดจำหน่ายค้าปลีก",
          },
          productGroups: [
            "store_distribution",
            "inventory_management",
          ],
        },
      },
    },
    commodity: {
      label: {
        en: "Commodity Business",
        th: "ธุรกิจสินค้าโภคภัณฑ์",
      },
      subGroups: {
        agriculture: {
          label: { en: "Agriculture", th: "เกษตรกรรม" },
          productGroups: [
            "crop_logistics",
            "cold_chain",
            "bulk_storage",
          ],
        },
        food_fmcg: {
          label: {
            en: "Food & FMCG",
            th: "อาหารและสินค้าอุปโภคบริโภค",
          },
          productGroups: [
            "food_warehouse",
            "temperature_control",
            "fmcg_distribution",
          ],
        },
      },
    },
    dangerous_goods: {
      label: {
        en: "Dangerous Goods Business",
        th: "ธุรกิจสินค้าอันตราย",
      },
      subGroups: {
        chemical_logistics: {
          label: {
            en: "Chemical Logistics",
            th: "โลจิสติกส์เคมีภัณฑ์",
          },
          productGroups: [
            "hazmat_storage",
            "chemical_transport",
            "safety_compliance",
          ],
        },
      },
    },
    freight_3pl_4pl: {
      label: {
        en: "Freight Business (3PL / 4PL)",
        th: "ธุรกิจขนส่ง (3PL / 4PL)",
      },
      subGroups: {
        air_freight: {
          label: { en: "Air Freight", th: "ขนส่งทางอากาศ" },
          productGroups: [
            "international_air",
            "domestic_air",
            "express_air",
          ],
        },
        sea_freight: {
          label: { en: "Sea Freight", th: "ขนส่งทางเรือ" },
          productGroups: ["fcl", "lcl", "bulk_shipping"],
        },
        land_transport: {
          label: { en: "Land Transport", th: "ขนส่งทางบก" },
          productGroups: ["trucking", "rail", "intermodal"],
        },
      },
    },
    healthcare: {
      label: {
        en: "Healthcare & Pharmaceutical Business",
        th: "ธุรกิจสุขภาพและเภสัชกรรม",
      },
      subGroups: {
        pharma_logistics: {
          label: {
            en: "Pharmaceutical Logistics",
            th: "โลจิสติกส์เภสัชกรรม",
          },
          productGroups: [
            "gmp_warehouse",
            "cold_chain_pharma",
            "medical_device",
          ],
        },
      },
    },
    multi_modal: {
      label: {
        en: "Multi-Modal Business",
        th: "ธุรกิจหลายรูปแบบ",
      },
      subGroups: {
        integrated_solutions: {
          label: {
            en: "Integrated Solutions",
            th: "โซลูชันแบบบูรณาการ",
          },
          productGroups: [
            "door_to_door",
            "supply_chain_solutions",
            "project_logistics",
          ],
        },
      },
    },
    warehouse_operations: {
      label: {
        en: "Transport & Warehouse Operations",
        th: "การดำเนินงานขนส่งและคลังสินค้า",
      },
      subGroups: {
        warehouse: {
          label: { en: "Warehouse", th: "คลังสินค้า" },
          productGroups: [
            "general_warehouse",
            "bonded_warehouse",
            "temperature_controlled",
          ],
        },
        transport: {
          label: { en: "Transport", th: "ขนส่ง" },
          productGroups: [
            "local_delivery",
            "long_haul",
            "specialized_transport",
          ],
        },
      },
    },
  },

  // ==================== TASK & TICKET ====================
  taskTypes: [
    {
      value: "lead",
      label: { en: "Lead", th: "ลีด" },
      color: "blue",
    },
    {
      value: "coordinator",
      label: { en: "Coordinator", th: "ประสานงาน" },
      color: "purple",
    },
    {
      value: "follow_up",
      label: { en: "Follow-up", th: "ติดตาม" },
      color: "orange",
    },
    {
      value: "meeting",
      label: { en: "Meeting", th: "ประชุม" },
      color: "green",
    },
  ],

  ticketCategories: [
    {
      value: "customer_query",
      label: { en: "Customer Query", th: "คำถามลูกค้า" },
      icon: "HelpCircle",
    },
    {
      value: "repair_request",
      label: { en: "Repair Request", th: "แจ้งซ่อม" },
      icon: "Wrench",
    },
    {
      value: "complaint",
      label: { en: "Complaint", th: "ร้องเรียน" },
      icon: "AlertTriangle",
    },
    {
      value: "suggestion",
      label: { en: "Suggestion", th: "ข้อเสนอแนะ" },
      icon: "Lightbulb",
    },
    {
      value: "sales_lead",
      label: { en: "Sales (Lead)", th: "ขาย (ลีด)" },
      icon: "TrendingUp",
    },
    {
      value: "sales_quote",
      label: { en: "Sales (Quote)", th: "ขาย (เสนอราคา)" },
      icon: "FileText",
    },
    {
      value: "sales_upsell",
      label: { en: "Sales (Upsell)", th: "ขาย (ขายเพิ่ม)" },
      icon: "ArrowUpCircle",
    },
    {
      value: "reservation_move_in",
      label: {
        en: "Reservation (Move-in)",
        th: "การจอง (ย้ายเข้า)",
      },
      icon: "LogIn",
    },
    {
      value: "reservation_move_out",
      label: {
        en: "Reservation (Move-out)",
        th: "การจอง (ย้ายออก)",
      },
      icon: "LogOut",
    },
    {
      value: "missing_documents",
      label: { en: "Missing Documents", th: "เอกสารหาย" },
      icon: "FileX",
    },
    {
      value: "refund_request",
      label: { en: "Refund Request", th: "ขอคืนเงิน" },
      icon: "DollarSign",
    },
    {
      value: "inspection",
      label: { en: "Inspection", th: "ตรวจสอบ" },
      icon: "Search",
    },
    {
      value: "partnership",
      label: { en: "Partnership", th: "ความร่วมมือ" },
      icon: "Handshake",
    },
    {
      value: "purchasing",
      label: { en: "Purchasing", th: "การจัดซื้อ" },
      icon: "ShoppingCart",
    },
    {
      value: "hr",
      label: { en: "HR", th: "ทรัพยากรบุคคล" },
      icon: "Users",
    },
  ],

  ticketStatuses: [
    {
      value: "new",
      label: { en: "New", th: "ใหม่" },
      color: "blue",
    },
    {
      value: "assigned",
      label: { en: "Assigned", th: "มอบหมายแล้ว" },
      color: "cyan",
    },
    {
      value: "in_progress",
      label: { en: "In Progress", th: "กำลังดำเนินการ" },
      color: "yellow",
    },
    {
      value: "pending",
      label: { en: "Pending", th: "รอดำเนินการ" },
      color: "orange",
    },
    {
      value: "closed",
      label: { en: "Closed", th: "ปิด" },
      color: "green",
    },
    {
      value: "reopened",
      label: { en: "Re-opened", th: "เปิดใหม่" },
      color: "purple",
    },
    {
      value: "no_response",
      label: { en: "No Response", th: "ไม่ตอบกลับ" },
      color: "gray",
    },
  ],

  priorities: [
    {
      value: "p1",
      label: { en: "P1 - Critical", th: "P1 - วิกฤต" },
      sla: 4,
      slaUnit: "hours",
      color: "red",
    },
    {
      value: "p2",
      label: { en: "P2 - High", th: "P2 - สูง" },
      sla: 12,
      slaUnit: "hours",
      color: "orange",
    },
    {
      value: "p3",
      label: { en: "P3 - Medium", th: "P3 - ปานกลาง" },
      sla: 72,
      slaUnit: "hours",
      color: "yellow",
    },
    {
      value: "p4",
      label: { en: "P4 - Low", th: "P4 - ต่ำ" },
      sla: 168,
      slaUnit: "hours",
      color: "blue",
    },
    {
      value: "p5",
      label: { en: "P5 - No SLA", th: "P5 - ไม่มี SLA" },
      sla: null,
      slaUnit: null,
      color: "gray",
    },
  ],

  followUpTypes: [
    {
      value: "short_term",
      label: { en: "Short-term", th: "ระยะสั้น" },
    },
    {
      value: "long_term",
      label: { en: "Long-term", th: "ระยะยาว" },
    },
    { value: "none", label: { en: "None", th: "ไม่มี" } },
  ],

  // ==================== QUOTATION & DEAL ====================
  quotationStatuses: [
    {
      value: "draft",
      label: { en: "Draft", th: "ร่าง" },
      color: "gray",
    },
    {
      value: "sent",
      label: { en: "Sent", th: "ส่งแล้ว" },
      color: "blue",
    },
    {
      value: "viewed",
      label: { en: "Viewed", th: "เปิดดูแล้ว" },
      color: "cyan",
    },
    {
      value: "accepted",
      label: { en: "Accepted", th: "ยอมรับ" },
      color: "green",
    },
    {
      value: "rejected",
      label: { en: "Rejected", th: "ปฏิเสธ" },
      color: "red",
    },
    {
      value: "expired",
      label: { en: "Expired", th: "หมดอายุ" },
      color: "orange",
    },
    {
      value: "revised",
      label: { en: "Revised", th: "แก้ไข" },
      color: "purple",
    },
  ],

  validityPeriods: [
    { value: 7, label: { en: "7 Days", th: "7 วัน" } },
    { value: 15, label: { en: "15 Days", th: "15 วัน" } },
    { value: 30, label: { en: "30 Days", th: "30 วัน" } },
    { value: 45, label: { en: "45 Days", th: "45 วัน" } },
    { value: 60, label: { en: "60 Days", th: "60 วัน" } },
    { value: 90, label: { en: "90 Days", th: "90 วัน" } },
  ],

  discountTypes: [
    {
      value: "percentage",
      label: { en: "Percentage (%)", th: "เปอร์เซ็นต์ (%)" },
    },
    {
      value: "flat",
      label: { en: "Flat Amount", th: "จำนวนเงิน" },
    },
  ],

  vatTypes: [
    {
      value: "vat_in",
      label: { en: "VAT Included", th: "รวม VAT" },
    },
    {
      value: "vat_out",
      label: { en: "VAT Excluded", th: "ไม่รวม VAT" },
    },
    {
      value: "no_vat",
      label: { en: "No VAT", th: "ไม่มี VAT" },
    },
  ],

  rentalPeriodTypes: [
    {
      value: "calendar",
      label: { en: "Calendar Billing", th: "บิลตามปฏิทิน" },
    },
    {
      value: "anniversary",
      label: {
        en: "Anniversary Billing",
        th: "บิลตามวันครบรอบ",
      },
    },
  ],

  // ==================== DOCUMENT MANAGEMENT ====================
  documentCategories: [
    {
      value: "service_agreement",
      label: { en: "Service Agreement", th: "สัญญาบริการ" },
      icon: "FileText",
    },
    {
      value: "rental_agreement",
      label: { en: "Rental Agreement", th: "สัญญาเช่า" },
      icon: "FileSignature",
    },
    {
      value: "move_in",
      label: { en: "Move-in Document", th: "เอกสารย้ายเข้า" },
      icon: "LogIn",
    },
    {
      value: "move_out",
      label: { en: "Move-out Document", th: "เอกสารย้ายออก" },
      icon: "LogOut",
    },
    {
      value: "insurance",
      label: { en: "Insurance", th: "ประกันภัย" },
      icon: "Shield",
    },
    {
      value: "overdue_30",
      label: {
        en: "Overdue Letter (30 days)",
        th: "จดหมายค้างชำระ (30 วัน)",
      },
      icon: "AlertCircle",
    },
    {
      value: "overdue_60",
      label: {
        en: "Overdue Letter (60 days)",
        th: "จดหมายค้างชำระ (60 วัน)",
      },
      icon: "AlertTriangle",
    },
    {
      value: "overdue_90",
      label: {
        en: "Overdue Letter (90 days)",
        th: "จดหมายค้างชำระ (90 วัน)",
      },
      icon: "XCircle",
    },
    {
      value: "contract_expiry",
      label: {
        en: "Contract Expiry Notice",
        th: "แจ้งสัญญาใกล้หมดอายุ",
      },
      icon: "Calendar",
    },
    {
      value: "invoice",
      label: { en: "Invoice", th: "ใบแจ้งหนี้" },
      icon: "Receipt",
    },
    {
      value: "receipt",
      label: { en: "Receipt", th: "ใบเสร็จ" },
      icon: "FileCheck",
    },
    {
      value: "tax_invoice",
      label: { en: "Tax Invoice", th: "ใบกำกับภาษี" },
      icon: "FileText",
    },
    {
      value: "other",
      label: { en: "Other", th: "อื่นๆ" },
      icon: "File",
    },
  ],

  // ==================== INTEGRATIONS ====================
  integrations: [
    {
      value: "sitelink",
      label: { en: "SiteLink", th: "SiteLink" },
      description: {
        en: "Availability, Pricing, Move-in/out, Access PIN, Status Sync",
        th: "ความพร้อม, ราคา, ย้ายเข้า/ออก, PIN เข้าถึง, ซิงค์สถานะ",
      },
      icon: "Link",
      status: "connected",
    },
    {
      value: "system_x",
      label: { en: "System-X", th: "System-X" },
      description: {
        en: "Invoice, Receipt, Payment Status, SAP Sync",
        th: "ใบแจ้งหนี้, ใบเสร็จ, สถานะการชำระเงิน, ซิงค์ SAP",
      },
      icon: "Database",
      status: "connected",
    },
    {
      value: "payment_gateway",
      label: {
        en: "Payment Gateway",
        th: "เกตเวย์การชำระเงิน",
      },
      description: {
        en: "QR, Credit Card, Stripe, Bank Transfer",
        th: "QR, บัตรเครดิต, Stripe, โอนเงิน",
      },
      icon: "CreditCard",
      status: "connected",
    },
    {
      value: "online_booking",
      label: { en: "Online Booking", th: "จองออนไลน์" },
      description: {
        en: "Quotation Request → CRM → Status Feedback",
        th: "คำขอใบเสนอราคา → CRM → สถานะตอบกลับ",
      },
      icon: "Globe",
      status: "connected",
    },
    {
      value: "ippbx",
      label: { en: "IP-PBX", th: "IP-PBX" },
      description: {
        en: "Incoming Call → Auto Ticket Creation",
        th: "สายเรียกเข้า → สร้างตั๋วอัตโนมัติ",
      },
      icon: "Phone",
      status: "connected",
    },
    {
      value: "esignature",
      label: { en: "E-signature", th: "ลายเซ็นอิเล็กทรอนิกส์" },
      description: {
        en: "Signed Documents Returned to CRM",
        th: "เอกสารที่ลงนามส่งกลับ CRM",
      },
      icon: "PenTool",
      status: "connected",
    },
  ],

  // ==================== BRANCHES & LOCATIONS ====================
  branches: [
    {
      value: "bkk_head",
      label: {
        en: "Bangkok Head Office",
        th: "สำนักงานใหญ่ กรุงเทพ",
      },
      code: "BKK-HQ",
    },
    {
      value: "bkk_rama2",
      label: {
        en: "Bangkok - Rama 2",
        th: "กรุงเทพ - พระราม 2",
      },
      code: "BKK-R2",
    },
    {
      value: "bkk_bangna",
      label: { en: "Bangkok - Bangna", th: "กรุงเทพ - บางนา" },
      code: "BKK-BN",
    },
    {
      value: "sriracha",
      label: { en: "Sriracha", th: "ศรีราชา" },
      code: "SRC",
    },
    {
      value: "laemchabang",
      label: { en: "Laem Chabang", th: "แหลมฉบัง" },
      code: "LCB",
    },
    {
      value: "chonburi",
      label: { en: "Chonburi", th: "ชลบุรี" },
      code: "CHB",
    },
    {
      value: "chiangmai",
      label: { en: "Chiang Mai", th: "เชียงใหม่" },
      code: "CNX",
    },
    {
      value: "phuket",
      label: { en: "Phuket", th: "ภูเก็ต" },
      code: "HKT",
    },
  ],

  // ==================== PAYMENT & BILLING ====================
  paymentMethods: [
    {
      value: "cash",
      label: { en: "Cash", th: "เงินสด" },
      icon: "Banknote",
    },
    {
      value: "bank_transfer",
      label: { en: "Bank Transfer", th: "โอนเงิน" },
      icon: "Building2",
    },
    {
      value: "credit_card",
      label: { en: "Credit Card", th: "บัตรเครดิต" },
      icon: "CreditCard",
    },
    {
      value: "qr_payment",
      label: { en: "QR Payment", th: "QR Code" },
      icon: "QrCode",
    },
    {
      value: "cheque",
      label: { en: "Cheque", th: "เช็ค" },
      icon: "FileText",
    },
    {
      value: "stripe",
      label: { en: "Stripe", th: "Stripe" },
      icon: "Zap",
    },
  ],

  paymentStatuses: [
    {
      value: "pending",
      label: { en: "Pending", th: "รอชำระ" },
      color: "yellow",
    },
    {
      value: "paid",
      label: { en: "Paid", th: "ชำระแล้ว" },
      color: "green",
    },
    {
      value: "overdue",
      label: { en: "Overdue", th: "เกินกำหนด" },
      color: "red",
    },
    {
      value: "partial",
      label: { en: "Partial", th: "ชำระบางส่วน" },
      color: "orange",
    },
    {
      value: "refunded",
      label: { en: "Refunded", th: "คืนเงินแล้ว" },
      color: "blue",
    },
  ],

  // ==================== USER ROLES ====================
  userRoles: [
    {
      value: "admin",
      label: { en: "Admin", th: "ผู้ดูแลระบบ" },
      permissions: ["all"],
    },
    {
      value: "manager",
      label: { en: "Manager", th: "ผู้จัดการ" },
      permissions: ["view_all", "edit_all", "approve"],
    },
    {
      value: "sales",
      label: { en: "Sales", th: "ฝ่ายขาย" },
      permissions: [
        "view_own",
        "edit_own",
        "create_lead",
        "create_deal",
        "create_quote",
      ],
    },
    {
      value: "call_center",
      label: { en: "Call Center", th: "ฝ่ายบริการลูกค้า" },
      permissions: ["view_all", "create_ticket", "edit_ticket"],
    },
    {
      value: "operations",
      label: { en: "Operations", th: "ฝ่ายปฏิบัติการ" },
      permissions: [
        "view_all",
        "edit_operations",
        "manage_documents",
      ],
    },
    {
      value: "accounting",
      label: { en: "Accounting", th: "ฝ่ายบัญชี" },
      permissions: [
        "view_all",
        "manage_invoices",
        "manage_payments",
      ],
    },
    {
      value: "viewer",
      label: { en: "Viewer", th: "ผู้ดู" },
      permissions: ["view_own"],
    },
  ],
};

// Helper functions for business logic
export const getSubGroups = (businessGroupValue: string) => {
  const group =
    masterData.businessHierarchy[
      businessGroupValue as keyof typeof masterData.businessHierarchy
    ];
  return group
    ? Object.entries(group.subGroups).map(([key, value]) => ({
        value: key,
        label: value.label,
      }))
    : [];
};

export const getProductGroups = (
  businessGroupValue: string,
  subGroupValue: string,
) => {
  const group =
    masterData.businessHierarchy[
      businessGroupValue as keyof typeof masterData.businessHierarchy
    ];
  if (!group) return [];
  const subGroup =
    group.subGroups[
      subGroupValue as keyof typeof group.subGroups
    ];
  return subGroup
    ? subGroup.productGroups.map((pg: string) => ({
        value: pg,
        label: {
          en: pg
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()),
          th: pg,
        },
      }))
    : [];
};

export const getSLADeadline = (
  priority: string,
  createdAt: Date,
): Date => {
  const priorityData = masterData.priorities.find(
    (p) => p.value === priority,
  );
  if (!priorityData || !priorityData.sla) return new Date();

  const deadline = new Date(createdAt);
  deadline.setHours(deadline.getHours() + priorityData.sla);
  return deadline;
};

export const getSLAStatus = (
  priority: string,
  createdAt: Date,
  currentStatus: string,
): "on-time" | "warning" | "overdue" => {
  if (currentStatus === "closed") return "on-time";

  const deadline = getSLADeadline(priority, createdAt);
  const now = new Date();
  const timeRemaining = deadline.getTime() - now.getTime();
  const hoursRemaining = timeRemaining / (1000 * 60 * 60);

  if (timeRemaining < 0) return "overdue";
  if (hoursRemaining < 2) return "warning";
  return "on-time";
};

export const generateTicketNumber = (
  branch: string,
  category: string,
): string => {
  const branchCode =
    masterData.branches.find((b) => b.value === branch)?.code ||
    "BKK";
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1)
    .toString()
    .padStart(2, "0");
  const random = Math.floor(Math.random() * 9999)
    .toString()
    .padStart(4, "0");

  return `TK-${branchCode}-${year}${month}-${random}`;
};

export const generateQuotationNumber = (
  branch: string,
): string => {
  const branchCode =
    masterData.branches.find((b) => b.value === branch)?.code ||
    "BKK";
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1)
    .toString()
    .padStart(2, "0");
  const random = Math.floor(Math.random() * 9999)
    .toString()
    .padStart(4, "0");

  return `QT-${branchCode}-${year}${month}-${random}`;
};

export const calculateQuotationExpiry = (
  createdAt: Date,
  validityDays: number,
): Date => {
  const expiry = new Date(createdAt);
  expiry.setDate(expiry.getDate() + validityDays);
  return expiry;
};

export const calculateVAT = (
  amount: number,
  vatType: string,
): { subtotal: number; vat: number; total: number } => {
  const VAT_RATE = 0.07; // 7%

  if (vatType === "vat_in") {
    const subtotal = amount / (1 + VAT_RATE);
    const vat = amount - subtotal;
    return { subtotal, vat, total: amount };
  } else if (vatType === "vat_out") {
    const vat = amount * VAT_RATE;
    return { subtotal: amount, vat, total: amount + vat };
  } else {
    return { subtotal: amount, vat: 0, total: amount };
  }
};