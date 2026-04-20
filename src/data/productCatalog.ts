// Product & Service Catalog for Logistics CRM
// Comprehensive pricing and service definitions

export interface ProductService {
  id: string;
  code: string;
  name: {
    en: string;
    th: string;
  };
  category: string;
  subcategory: string;
  description: {
    en: string;
    th: string;
  };
  unit: string;
  standardPrice: number;
  promotionPrice?: number;
  currency: string;
  taxable: boolean;
  businessGroup: string;
  subBusinessGroup: string;
  active: boolean;
  minQuantity?: number;
  maxQuantity?: number;
  leadTime?: number; // days
  specifications?: Record<string, any>;
}

export const productCatalog: ProductService[] = [
  // ==================== WAREHOUSE SERVICES ====================
  {
    id: "SVC-WH-001",
    code: "WH-GEN-001",
    name: {
      en: "General Warehouse Storage",
      th: "คลังสินค้าทั่วไป",
    },
    category: "warehouse",
    subcategory: "storage",
    description: {
      en: "Standard warehouse space with ambient temperature control",
      th: "พื้นที่คลังสินค้ามาตรฐานพร้อมควบคุมอุณหภูมิ",
    },
    unit: "sqm",
    standardPrice: 350,
    promotionPrice: 320,
    currency: "THB",
    taxable: true,
    businessGroup: "warehouse_operations",
    subBusinessGroup: "warehouse",
    active: true,
    minQuantity: 50,
    specifications: {
      temperatureRange: "25-30°C",
      humidity: "60-80%",
      ceilingHeight: "8m",
      loadingDocks: true,
    },
  },
  {
    id: "SVC-WH-002",
    code: "WH-TEMP-001",
    name: {
      en: "Temperature-Controlled Warehouse",
      th: "คลังสินค้าควบคุมอุณหภูมิ",
    },
    category: "warehouse",
    subcategory: "cold_chain",
    description: {
      en: "Climate-controlled storage for sensitive products (15-25°C)",
      th: "คลังสินค้าควบคุมอุณหภูมิสำหรับสินค้าที่ต้องการความระมัดระวัง (15-25°C)",
    },
    unit: "sqm",
    standardPrice: 650,
    currency: "THB",
    taxable: true,
    businessGroup: "warehouse_operations",
    subBusinessGroup: "warehouse",
    active: true,
    minQuantity: 30,
    specifications: {
      temperatureRange: "15-25°C",
      humidity: "50-60%",
      monitoring: "24/7 digital",
      backup: "Generator + cooling system",
    },
  },
  {
    id: "SVC-WH-003",
    code: "WH-COLD-001",
    name: {
      en: "Cold Storage (0-4°C)",
      th: "ห้องเย็น (0-4°C)",
    },
    category: "warehouse",
    subcategory: "cold_chain",
    description: {
      en: "Refrigerated storage for perishable goods",
      th: "ห้องเย็นสำหรับสินค้าที่เน่าเสียง่าย",
    },
    unit: "sqm",
    standardPrice: 1200,
    currency: "THB",
    taxable: true,
    businessGroup: "commodity",
    subBusinessGroup: "food_fmcg",
    active: true,
    minQuantity: 20,
    specifications: {
      temperatureRange: "0-4°C",
      complianceCertification: ["GMP", "HACCP"],
      monitoring: "24/7 IoT sensors",
    },
  },
  {
    id: "SVC-WH-004",
    code: "WH-FREEZE-001",
    name: {
      en: "Frozen Storage (-18°C to -25°C)",
      th: "ห้องแช่แข็ง (-18°C ถึง -25°C)",
    },
    category: "warehouse",
    subcategory: "cold_chain",
    description: {
      en: "Deep freeze storage for frozen products",
      th: "ห้องแช่แข็งสำหรับสินค้าแช่แข็ง",
    },
    unit: "sqm",
    standardPrice: 1800,
    currency: "THB",
    taxable: true,
    businessGroup: "commodity",
    subBusinessGroup: "food_fmcg",
    active: true,
    minQuantity: 15,
    specifications: {
      temperatureRange: "-18 to -25°C",
      quickFreeze: true,
      complianceCertification: ["GMP", "HACCP", "Halal"],
    },
  },
  {
    id: "SVC-WH-005",
    code: "WH-HAZMAT-001",
    name: {
      en: "Hazmat Warehouse (Class 3 & 8)",
      th: "คลังสินค้าอันตราย (ระดับ 3 และ 8)",
    },
    category: "warehouse",
    subcategory: "dangerous_goods",
    description: {
      en: "Certified storage for flammable liquids and corrosive materials",
      th: "คลังสินค้าที่ได้รับการรับรองสำหรับของเหลวไวไฟและสารกัดกร่อน",
    },
    unit: "sqm",
    standardPrice: 950,
    currency: "THB",
    taxable: true,
    businessGroup: "dangerous_goods",
    subBusinessGroup: "chemical_logistics",
    active: true,
    minQuantity: 100,
    specifications: {
      unClass: ["3", "8"],
      fireSuppressionSystem: "Foam + CO2",
      spillContainment: "Bunded floors",
      ventilation: "Explosion-proof fans",
      certification: ["ISO 9001", "OHSAS 18001"],
    },
  },
  {
    id: "SVC-WH-006",
    code: "WH-BONDED-001",
    name: {
      en: "Bonded Warehouse",
      th: "คลังสินค้าทัณฑ์บน",
    },
    category: "warehouse",
    subcategory: "customs",
    description: {
      en: "Customs bonded warehouse for import/export goods",
      th: "คลังสินค้าทัณฑ์บนสำหรับสินค้านำเข้า/ส่งออก",
    },
    unit: "sqm",
    standardPrice: 580,
    currency: "THB",
    taxable: true,
    businessGroup: "freight_3pl_4pl",
    subBusinessGroup: "sea_freight",
    active: true,
    minQuantity: 50,
    specifications: {
      customsClearance: true,
      securityLevel: "High",
      cctv: "24/7 monitoring",
    },
  },

  // ==================== TRANSPORT SERVICES ====================
  {
    id: "SVC-TR-001",
    code: "TR-TRUCK-001",
    name: {
      en: "Local Trucking (4-Wheel)",
      th: "รถบรรทุก 4 ล้อ (ในเมือง)",
    },
    category: "transport",
    subcategory: "local",
    description: {
      en: "Local delivery within Bangkok and surrounding areas",
      th: "บริการส่งสินค้าในกรุงเทพฯ และปริมณฑล",
    },
    unit: "trip",
    standardPrice: 2500,
    currency: "THB",
    taxable: true,
    businessGroup: "warehouse_operations",
    subBusinessGroup: "transport",
    active: true,
    specifications: {
      capacity: "1-2 tons",
      coverage: "Bangkok Metropolitan",
      leadTime: "Same day",
    },
  },
  {
    id: "SVC-TR-002",
    code: "TR-TRUCK-002",
    name: {
      en: "Long-Haul Trucking (6-Wheel)",
      th: "รถบรรทุก 6 ล้อ (ระยะไกล)",
    },
    category: "transport",
    subcategory: "long_haul",
    description: {
      en: "Inter-provincial trucking service",
      th: "บริการขนส่งระหว่างจังหวัด",
    },
    unit: "trip",
    standardPrice: 8500,
    currency: "THB",
    taxable: true,
    businessGroup: "warehouse_operations",
    subBusinessGroup: "transport",
    active: true,
    specifications: {
      capacity: "3-5 tons",
      coverage: "Thailand nationwide",
      leadTime: "1-3 days",
    },
  },
  {
    id: "SVC-TR-003",
    code: "TR-TRUCK-003",
    name: {
      en: "Heavy Trucking (10-Wheel)",
      th: "รถบรรทุก 10 ล้อ (หนัก)",
    },
    category: "transport",
    subcategory: "long_haul",
    description: {
      en: "Heavy cargo transportation",
      th: "ขนส่งสินค้าหนัก",
    },
    unit: "trip",
    standardPrice: 15000,
    currency: "THB",
    taxable: true,
    businessGroup: "warehouse_operations",
    subBusinessGroup: "transport",
    active: true,
    specifications: {
      capacity: "8-10 tons",
      coverage: "Thailand nationwide",
      leadTime: "1-3 days",
    },
  },
  {
    id: "SVC-TR-004",
    code: "TR-CONTAINER-001",
    name: {
      en: "Container Trucking (20ft)",
      th: "รถบรรทุกตู้คอนเทนเนอร์ 20 ฟุต",
    },
    category: "transport",
    subcategory: "container",
    description: {
      en: "Container transport from port to destination",
      th: "ขนส่งตู้คอนเทนเนอร์จากท่าเรือไปยังจุดหมาย",
    },
    unit: "trip",
    standardPrice: 6500,
    currency: "THB",
    taxable: true,
    businessGroup: "freight_3pl_4pl",
    subBusinessGroup: "land_transport",
    active: true,
    specifications: {
      containerSize: "20ft",
      maxWeight: "20 tons",
      portCoverage: ["Laem Chabang", "Bangkok Port"],
    },
  },
  {
    id: "SVC-TR-005",
    code: "TR-CONTAINER-002",
    name: {
      en: "Container Trucking (40ft)",
      th: "รถบรรทุกตู้คอนเทนเนอร์ 40 ฟุต",
    },
    category: "transport",
    subcategory: "container",
    description: {
      en: "40ft container transport from port",
      th: "ขนส่งตู้คอนเทนเนอร์ 40 ฟุตจากท่าเรือ",
    },
    unit: "trip",
    standardPrice: 9500,
    currency: "THB",
    taxable: true,
    businessGroup: "freight_3pl_4pl",
    subBusinessGroup: "land_transport",
    active: true,
    specifications: {
      containerSize: "40ft",
      maxWeight: "25 tons",
      portCoverage: ["Laem Chabang", "Bangkok Port"],
    },
  },

  // ==================== FREIGHT SERVICES ====================
  {
    id: "SVC-FR-001",
    code: "FR-AIR-001",
    name: {
      en: "Air Freight - International",
      th: "ขนส่งทางอากาศ - ระหว่างประเทศ",
    },
    category: "freight",
    subcategory: "air",
    description: {
      en: "International air freight service",
      th: "บริการขนส่งสินค้าทางอากาศระหว่างประเทศ",
    },
    unit: "kg",
    standardPrice: 85,
    currency: "THB",
    taxable: true,
    businessGroup: "freight_3pl_4pl",
    subBusinessGroup: "air_freight",
    active: true,
    minQuantity: 45,
    leadTime: 3,
    specifications: {
      routes: "Worldwide",
      transitTime: "3-7 days",
      tracking: "Real-time GPS",
    },
  },
  {
    id: "SVC-FR-002",
    code: "FR-SEA-FCL-001",
    name: {
      en: "Sea Freight - FCL 20ft",
      th: "ขนส่งทางเรือ - FCL 20 ฟุต",
    },
    category: "freight",
    subcategory: "sea",
    description: {
      en: "Full Container Load (FCL) 20ft international shipping",
      th: "ขนส่งตู้คอนเทนเนอร์เต็มใบ 20 ฟุต ระหว่างประเทศ",
    },
    unit: "container",
    standardPrice: 45000,
    currency: "THB",
    taxable: true,
    businessGroup: "freight_3pl_4pl",
    subBusinessGroup: "sea_freight",
    active: true,
    leadTime: 14,
    specifications: {
      containerType: "Dry 20ft",
      maxWeight: "20 tons",
      transitTime: "14-28 days",
    },
  },
  {
    id: "SVC-FR-003",
    code: "FR-SEA-FCL-002",
    name: {
      en: "Sea Freight - FCL 40ft",
      th: "ขนส่งทางเรือ - FCL 40 ฟุต",
    },
    category: "freight",
    subcategory: "sea",
    description: {
      en: "Full Container Load (FCL) 40ft international shipping",
      th: "ขนส่งตู้คอนเทนเนอร์เต็มใบ 40 ฟุต ระหว่างประเทศ",
    },
    unit: "container",
    standardPrice: 68000,
    currency: "THB",
    taxable: true,
    businessGroup: "freight_3pl_4pl",
    subBusinessGroup: "sea_freight",
    active: true,
    leadTime: 14,
    specifications: {
      containerType: "Dry 40ft",
      maxWeight: "25 tons",
      transitTime: "14-28 days",
    },
  },
  {
    id: "SVC-FR-004",
    code: "FR-SEA-LCL-001",
    name: {
      en: "Sea Freight - LCL",
      th: "ขนส่งทางเรือ - LCL",
    },
    category: "freight",
    subcategory: "sea",
    description: {
      en: "Less than Container Load (LCL) international shipping",
      th: "ขนส่งสินค้าทางเรือแบบรวมตู้ ระหว่างประเทศ",
    },
    unit: "cbm",
    standardPrice: 3500,
    currency: "THB",
    taxable: true,
    businessGroup: "freight_3pl_4pl",
    subBusinessGroup: "sea_freight",
    active: true,
    minQuantity: 1,
    leadTime: 21,
    specifications: {
      minVolume: "1 CBM",
      transitTime: "21-35 days",
    },
  },

  // ==================== VALUE-ADDED SERVICES ====================
  {
    id: "SVC-VA-001",
    code: "VA-CUSTOMS-001",
    name: {
      en: "Customs Clearance",
      th: "ผ่านพิธีการศุลกากร",
    },
    category: "value_added",
    subcategory: "customs",
    description: {
      en: "Import/Export customs clearance service",
      th: "บริการผ่านพิธีการศุลกากรนำเข้า/ส่งออก",
    },
    unit: "shipment",
    standardPrice: 4500,
    promotionPrice: 4000,
    currency: "THB",
    taxable: true,
    businessGroup: "freight_3pl_4pl",
    subBusinessGroup: "sea_freight",
    active: true,
    leadTime: 1,
    specifications: {
      services: ["Documentation", "Duty calculation", "Inspection coordination"],
    },
  },
  {
    id: "SVC-VA-002",
    code: "VA-PACKING-001",
    name: {
      en: "Professional Packing Service",
      th: "บริการบรรจุหีบห่อมืออาชีพ",
    },
    category: "value_added",
    subcategory: "handling",
    description: {
      en: "Expert packing and crating for fragile goods",
      th: "บริการบรรจุและสร้างลังไม้สำหรับสินค้าเปราะบาง",
    },
    unit: "cbm",
    standardPrice: 1200,
    currency: "THB",
    taxable: true,
    businessGroup: "freight_3pl_4pl",
    subBusinessGroup: "air_freight",
    active: true,
    specifications: {
      materials: ["Bubble wrap", "Foam", "Wooden crate"],
    },
  },
  {
    id: "SVC-VA-003",
    code: "VA-INSURANCE-001",
    name: {
      en: "Cargo Insurance",
      th: "ประกันภัยสินค้า",
    },
    category: "value_added",
    subcategory: "insurance",
    description: {
      en: "Comprehensive cargo insurance coverage",
      th: "ประกันภัยสินค้าครอบคลุมทุกความเสี่ยง",
    },
    unit: "percentage",
    standardPrice: 0.5,
    currency: "THB",
    taxable: false,
    businessGroup: "freight_3pl_4pl",
    subBusinessGroup: "sea_freight",
    active: true,
    specifications: {
      coverage: "110% of invoice value",
      claimProcessing: "24-48 hours",
    },
  },
  {
    id: "SVC-VA-004",
    code: "VA-HANDLING-001",
    name: {
      en: "Material Handling",
      th: "บริการเคลื่อนย้ายสินค้า",
    },
    category: "value_added",
    subcategory: "handling",
    description: {
      en: "Forklift and manual handling services",
      th: "บริการรถโฟล์คลิฟท์และเคลื่อนย้ายด้วยมือ",
    },
    unit: "hour",
    standardPrice: 650,
    currency: "THB",
    taxable: true,
    businessGroup: "warehouse_operations",
    subBusinessGroup: "warehouse",
    active: true,
    specifications: {
      equipment: ["Forklift 2.5 ton", "Hand pallet", "Loading ramp"],
    },
  },
  {
    id: "SVC-VA-005",
    code: "VA-LABELING-001",
    name: {
      en: "Labeling & Sticker Application",
      th: "บริการติดฉลากและสติ๊กเกอร์",
    },
    category: "value_added",
    subcategory: "fulfillment",
    description: {
      en: "Product labeling and barcode application",
      th: "บริการติดฉลากสินค้าและบาร์โค้ด",
    },
    unit: "piece",
    standardPrice: 5,
    currency: "THB",
    taxable: true,
    businessGroup: "b2b2c",
    subBusinessGroup: "ecommerce_fulfillment",
    active: true,
    minQuantity: 100,
    specifications: {
      labelTypes: ["Product label", "Barcode", "Shipping label"],
    },
  },
  {
    id: "SVC-VA-006",
    code: "VA-PICKING-001",
    name: {
      en: "Order Picking & Packing",
      th: "บริการเบิกและบรรจุสินค้า",
    },
    category: "value_added",
    subcategory: "fulfillment",
    description: {
      en: "E-commerce order fulfillment service",
      th: "บริการจัดการคำสั่งซื้ออีคอมเมิร์ซ",
    },
    unit: "order",
    standardPrice: 35,
    currency: "THB",
    taxable: true,
    businessGroup: "b2b2c",
    subBusinessGroup: "ecommerce_fulfillment",
    active: true,
    specifications: {
      accuracy: "99.9%",
      turnaroundTime: "Same day",
    },
  },

  // ==================== SAFETY & COMPLIANCE ====================
  {
    id: "SVC-SF-001",
    code: "SF-MONITOR-001",
    name: {
      en: "24/7 Safety Monitoring",
      th: "ติดตามความปลอดภัย 24/7",
    },
    category: "safety",
    subcategory: "monitoring",
    description: {
      en: "Round-the-clock safety and security monitoring",
      th: "บริการตรวจสอบความปลอดภัยและความมั่นคงตลอด 24 ชั่วโมง",
    },
    unit: "month",
    standardPrice: 45000,
    currency: "THB",
    taxable: true,
    businessGroup: "dangerous_goods",
    subBusinessGroup: "chemical_logistics",
    active: true,
    specifications: {
      features: ["CCTV", "Fire detection", "Gas leak sensors", "Security guards"],
    },
  },
  {
    id: "SVC-SF-002",
    code: "SF-INSPECTION-001",
    name: {
      en: "Safety Compliance Inspection",
      th: "ตรวจสอบมาตรฐานความปลอดภัย",
    },
    category: "safety",
    subcategory: "inspection",
    description: {
      en: "Regular safety and compliance inspection",
      th: "บริการตรวจสอบมาตรฐานความปลอดภัยเป็นประจำ",
    },
    unit: "inspection",
    standardPrice: 8500,
    currency: "THB",
    taxable: true,
    businessGroup: "dangerous_goods",
    subBusinessGroup: "chemical_logistics",
    active: true,
    specifications: {
      frequency: "Monthly",
      certification: ["ISO 14001", "OHSAS 18001"],
    },
  },
];

// Helper functions for product catalog
export const getProductsByCategory = (category: string) => {
  return productCatalog.filter(p => p.category === category && p.active);
};

export const getProductsByBusinessGroup = (businessGroup: string) => {
  return productCatalog.filter(p => p.businessGroup === businessGroup && p.active);
};

export const calculatePrice = (
  productId: string,
  quantity: number,
  usePromotion: boolean = false
): number => {
  const product = productCatalog.find(p => p.id === productId);
  if (!product) return 0;
  
  const price = usePromotion && product.promotionPrice 
    ? product.promotionPrice 
    : product.standardPrice;
    
  return price * quantity;
};

export const validateQuantity = (productId: string, quantity: number): boolean => {
  const product = productCatalog.find(p => p.id === productId);
  if (!product) return false;
  
  if (product.minQuantity && quantity < product.minQuantity) return false;
  if (product.maxQuantity && quantity > product.maxQuantity) return false;
  
  return true;
};
