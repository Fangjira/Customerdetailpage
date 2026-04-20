/**
 * Enterprise Master Data Configuration
 * Centralized master data for CRM system
 */

export const LEAD_TYPES = [
  { value: "cold_call", labelKey: "masterData.leadType.coldCall" },
  { value: "existing_customer", labelKey: "masterData.leadType.existingCustomer" },
  { value: "management", labelKey: "masterData.leadType.management" },
  { value: "jv_subsidiary", labelKey: "masterData.leadType.jvSubsidiary" },
  { value: "marketing_group", labelKey: "masterData.leadType.marketingGroup" },
  { value: "cdp", labelKey: "masterData.leadType.cdp" },
  { value: "other", labelKey: "masterData.leadType.other" },
] as const;

export const LEAD_SOURCES = [
  { value: "website", labelKey: "masterData.leadSource.website" },
  { value: "referral", labelKey: "masterData.leadSource.referral" },
  { value: "trade_show", labelKey: "masterData.leadSource.tradeShow" },
  { value: "cold_call", labelKey: "masterData.leadSource.coldCall" },
  { value: "social_media", labelKey: "masterData.leadSource.socialMedia" },
  { value: "email_campaign", labelKey: "masterData.leadSource.emailCampaign" },
  { value: "partner", labelKey: "masterData.leadSource.partner" },
  { value: "existing_customer", labelKey: "masterData.leadSource.existingCustomer" },
  { value: "other", labelKey: "masterData.leadSource.other" },
] as const;

export const CUSTOMER_TYPES = [
  { value: "scg", labelKey: "masterData.customerType.scg" },
  { value: "scgjwd", labelKey: "masterData.customerType.scgjwd" },
  { value: "partner", labelKey: "masterData.customerType.partner" },
  { value: "vendor", labelKey: "masterData.customerType.vendor" },
  { value: "new_customer", labelKey: "masterData.customerType.newCustomer" },
  { value: "government", labelKey: "masterData.customerType.government" },
] as const;

export const BUSINESS_TYPES = [
  { value: "corporation", labelKey: "masterData.businessType.corporation" },
  { value: "partnership", labelKey: "masterData.businessType.partnership" },
  { value: "sole_proprietorship", labelKey: "masterData.businessType.soleProprietorship" },
  { value: "sme", labelKey: "masterData.businessType.sme" },
  { value: "startup", labelKey: "masterData.businessType.startup" },
  { value: "government", labelKey: "masterData.businessType.government" },
  { value: "ngo", labelKey: "masterData.businessType.ngo" },
] as const;

export const SALES_CHANNELS = [
  { value: "b2b", labelKey: "masterData.salesChannel.b2b" },
  { value: "b2c", labelKey: "masterData.salesChannel.b2c" },
  { value: "d2c", labelKey: "masterData.salesChannel.d2c" },
] as const;

export const INDUSTRIES = [
  { value: "agriculture", labelKey: "agriculture" },
  { value: "automotive", labelKey: "automotive" },
  { value: "construction", labelKey: "construction" },
  { value: "chemical", labelKey: "chemical" },
  { value: "circular_economy", labelKey: "circularEconomy" },
  { value: "electronics", labelKey: "electronics" },
  { value: "energy", labelKey: "energy" },
  { value: "fashion", labelKey: "fashion" },
  { value: "food_fmcg", labelKey: "foodFmcg" },
  { value: "home_living", labelKey: "homeLiving" },
  { value: "packaging", labelKey: "packaging" },
  { value: "healthcare", labelKey: "healthcare" },
  { value: "waste_management", labelKey: "wasteManagement" },
  { value: "other", labelKey: "other" },
] as const;

export const SUPPLY_CHAIN_ROLES = [
  { value: "importer", labelKey: "importer" },
  { value: "exporter", labelKey: "exporter" },
  { value: "manufacturer", labelKey: "manufacturer" },
  { value: "distributor", labelKey: "distributor" },
  { value: "wholesaler_retailer", labelKey: "wholesalerRetailer" },
  { value: "freight_forwarder", labelKey: "freightForwarder" },
] as const;

export const TASK_TYPES = [
  { value: "lead", labelKey: "lead" },
  { value: "coordinator", labelKey: "coordinator" },
] as const;

export const PROJECT_TYPES = [
  { value: "solution_design", labelKey: "masterData.projectType.solutionDesign" },
  { value: "product_development", labelKey: "masterData.projectType.productDevelopment" },
  { value: "cost_improvement", labelKey: "masterData.projectType.costImprovement" },
  { value: "internal_improvement", labelKey: "masterData.projectType.internalImprovement" },
] as const;

export const COMMODITY_TYPES = [
  { value: "automotive_parts", label: "Automotive Parts" },
  { value: "vehicles", label: "Vehicles" },
  { value: "consumer_electronics", label: "Consumer Electronics" },
  { value: "industrial_equipment", label: "Industrial Equipment" },
  { value: "components", label: "Components" },
  { value: "home_appliances", label: "Home Appliances" },
  { value: "packaged_food", label: "Packaged Food" },
  { value: "frozen_food", label: "Frozen Food" },
  { value: "beverages", label: "Beverages" },
  { value: "pharmaceuticals", label: "Pharmaceuticals" },
  { value: "medical_devices", label: "Medical Devices" },
  { value: "fashion_apparel", label: "Fashion & Apparel" },
  { value: "textile", label: "Textile" },
  { value: "machinery", label: "Machinery" },
  { value: "bulk_materials", label: "Bulk Materials" },
  { value: "raw_materials", label: "Raw Materials" },
  { value: "chemicals", label: "Chemicals" },
  { value: "dangerous_goods", label: "Dangerous Goods" },
  { value: "other", label: "Other" },
] as const;

/**
 * Win/Loss Analysis Factors
 * For analyzing why deals are won or lost
 */

export const WIN_FACTORS = {
  commercial: {
    labelKey: "masterData.winFactor.commercial",
    options: [
      { value: "competitive_pricing", labelKey: "masterData.winFactor.competitivePricing" },
      { value: "flexible_payment_terms", labelKey: "masterData.winFactor.flexiblePaymentTerms" },
      { value: "value_for_money", labelKey: "masterData.winFactor.valueForMoney" },
      { value: "transparent_costing", labelKey: "masterData.winFactor.transparentCosting" },
      { value: "long_term_contract_benefits", labelKey: "masterData.winFactor.longTermContractBenefits" },
    ]
  },
  solution: {
    labelKey: "masterData.winFactor.solution",
    options: [
      { value: "superior_service_quality", labelKey: "masterData.winFactor.superiorServiceQuality" },
      { value: "customized_solution", labelKey: "masterData.winFactor.customizedSolution" },
      { value: "innovative_technology", labelKey: "masterData.winFactor.innovativeTechnology" },
      { value: "comprehensive_coverage", labelKey: "masterData.winFactor.comprehensiveCoverage" },
      { value: "proven_track_record", labelKey: "masterData.winFactor.provenTrackRecord" },
      { value: "network_advantage", labelKey: "masterData.winFactor.networkAdvantage" },
      { value: "multimodal_capability", labelKey: "masterData.winFactor.multimodalCapability" },
    ]
  },
  relation: {
    labelKey: "masterData.winFactor.relation",
    options: [
      { value: "existing_relationship", labelKey: "masterData.winFactor.existingRelationship" },
      { value: "strong_account_management", labelKey: "masterData.winFactor.strongAccountManagement" },
      { value: "executive_sponsorship", labelKey: "masterData.winFactor.executiveSponsorship" },
      { value: "trusted_partner", labelKey: "masterData.winFactor.trustedPartner" },
      { value: "responsive_communication", labelKey: "masterData.winFactor.responsiveCommunication" },
      { value: "local_market_knowledge", labelKey: "masterData.winFactor.localMarketKnowledge" },
    ]
  },
  other: {
    labelKey: "masterData.winFactor.other",
    options: [
      { value: "brand_reputation", labelKey: "masterData.winFactor.brandReputation" },
      { value: "sustainability_commitment", labelKey: "masterData.winFactor.sustainabilityCommitment" },
      { value: "compliance_certifications", labelKey: "masterData.winFactor.complianceCertifications" },
      { value: "timing_advantage", labelKey: "masterData.winFactor.timingAdvantage" },
      { value: "unique_value_proposition", labelKey: "masterData.winFactor.uniqueValueProposition" },
    ]
  }
} as const;

export const LOSS_FACTORS = {
  commercial: {
    labelKey: "masterData.lossFactor.commercial",
    options: [
      { value: "price_too_high", labelKey: "masterData.lossFactor.priceTooHigh" },
      { value: "unfavorable_payment_terms", labelKey: "masterData.lossFactor.unfavorablePaymentTerms" },
      { value: "hidden_costs", labelKey: "masterData.lossFactor.hiddenCosts" },
      { value: "no_cost_transparency", labelKey: "masterData.lossFactor.noCostTransparency" },
      { value: "inflexible_contract", labelKey: "masterData.lossFactor.inflexibleContract" },
    ]
  },
  solution: {
    labelKey: "masterData.lossFactor.solution",
    options: [
      { value: "service_limitations", labelKey: "masterData.lossFactor.serviceLimitations" },
      { value: "inadequate_solution", labelKey: "masterData.lossFactor.inadequateSolution" },
      { value: "technology_gaps", labelKey: "masterData.lossFactor.technologyGaps" },
      { value: "coverage_issues", labelKey: "masterData.lossFactor.coverageIssues" },
      { value: "implementation_concerns", labelKey: "masterData.lossFactor.implementationConcerns" },
      { value: "lack_of_customization", labelKey: "masterData.lossFactor.lackOfCustomization" },
    ]
  },
  relation: {
    labelKey: "masterData.lossFactor.relation",
    options: [
      { value: "weak_relationship", labelKey: "masterData.lossFactor.weakRelationship" },
      { value: "poor_communication", labelKey: "masterData.lossFactor.poorCommunication" },
      { value: "slow_response_time", labelKey: "masterData.lossFactor.slowResponseTime" },
      { value: "lack_of_trust", labelKey: "masterData.lossFactor.lackOfTrust" },
      { value: "no_executive_support", labelKey: "masterData.lossFactor.noExecutiveSupport" },
      { value: "cultural_misalignment", labelKey: "masterData.lossFactor.culturalMisalignment" },
    ]
  },
  competitor: {
    labelKey: "masterData.lossFactor.competitor",
    options: [
      { value: "competitor_better_price", labelKey: "masterData.lossFactor.competitorBetterPrice" },
      { value: "competitor_better_solution", labelKey: "masterData.lossFactor.competitorBetterSolution" },
      { value: "competitor_stronger_relationship", labelKey: "masterData.lossFactor.competitorStrongerRelationship" },
      { value: "incumbent_advantage", labelKey: "masterData.lossFactor.incumbentAdvantage" },
      { value: "competitor_innovation", labelKey: "masterData.lossFactor.competitorInnovation" },
    ]
  },
  other: {
    labelKey: "masterData.lossFactor.other",
    options: [
      { value: "budget_constraints", labelKey: "masterData.lossFactor.budgetConstraints" },
      { value: "timing_issues", labelKey: "masterData.lossFactor.timingIssues" },
      { value: "internal_politics", labelKey: "masterData.lossFactor.internalPolitics" },
      { value: "project_postponed", labelKey: "masterData.lossFactor.projectPostponed" },
      { value: "regulatory_issues", labelKey: "masterData.lossFactor.regulatoryIssues" },
      { value: "requirements_changed", labelKey: "masterData.lossFactor.requirementsChanged" },
    ]
  }
} as const;

/**
 * Business Hierarchy Configuration
 * Business Unit (BU) - 10 Core Business Units
 */

export const BUSINESS_UNITS = [
  { value: "automotive", label: "Automotive", shortLabel: "Automotive" },
  { value: "cold_chain", label: "Cold Chain", shortLabel: "Cold Chain" },
  { value: "commodity", label: "Commodity", shortLabel: "Commodity" },
  { value: "hcp", label: "Healthcare & Pharmaceutical", shortLabel: "Healthcare & Pharmaceutical" },
  { value: "freight", label: "Freight", shortLabel: "Freight" },
  { value: "jts", label: "JTS", shortLabel: "JTS" },
  { value: "b2b2c", label: "B2B2C", shortLabel: "B2B2C" },
  { value: "asean_island_taiwan", label: "ASEAN Island and Taiwan", shortLabel: "ASEAN Island and Taiwan" },
  { value: "clmv_china", label: "CLMV+China", shortLabel: "CLMV+China" },
  { value: "commercial", label: "Commercial", shortLabel: "Commercial" },
] as const;

export const BUSINESS_GROUPS = [
  { value: "asean_island", labelKey: "aseanIsland" },
  { value: "clmv_china", labelKey: "clmvChina" },
  { value: "b2b2c", labelKey: "b2b2c" },
  { value: "commodity", labelKey: "commodity" },
  { value: "dangerous_goods", labelKey: "dangerousGoods" },
  { value: "freight_3pl_4pl", labelKey: "freight3pl4pl" },
  { value: "healthcare_pharma", labelKey: "healthcarePharma" },
  { value: "multi_modal", labelKey: "multiModal" },
  { value: "new_business", labelKey: "newBusiness" },
  { value: "transport_warehouse", labelKey: "transportWarehouse" },
] as const;

export const SUB_BUSINESS_GROUPS: Record<string, { value: string; labelKey: string }[]> = {
  asean_island: [
    { value: "indonesia_ops", labelKey: "masterData.subBusinessGroup.indonesiaOps" },
    { value: "philippines_ops", labelKey: "masterData.subBusinessGroup.philippinesOps" },
    { value: "taiwan_ops", labelKey: "masterData.subBusinessGroup.taiwanOps" },
  ],
  clmv_china: [
    { value: "cambodia_ops", labelKey: "cambodiaOps" },
    { value: "laos_ops", labelKey: "laosOps" },
    { value: "myanmar_ops", labelKey: "myanmarOps" },
    { value: "vietnam_ops", labelKey: "vietnamOps" },
    { value: "china_ops", labelKey: "chinaOps" },
  ],
  b2b2c: [
    { value: "ecommerce_fulfillment", labelKey: "masterData.subBusinessGroup.ecommerceFulfillment" },
    { value: "last_mile_delivery", labelKey: "masterData.subBusinessGroup.lastMileDelivery" },
    { value: "omnichannel", labelKey: "masterData.subBusinessGroup.omnichannel" },
  ],
  commodity: [
    { value: "bulk_materials", labelKey: "masterData.subBusinessGroup.bulkMaterials" },
    { value: "raw_materials", labelKey: "masterData.subBusinessGroup.rawMaterials" },
    { value: "liquid_bulk", labelKey: "masterData.subBusinessGroup.liquidBulk" },
  ],
  dangerous_goods: [
    { value: "class_3_flammable", labelKey: "masterData.subBusinessGroup.class3Flammable" },
    { value: "class_8_corrosive", labelKey: "masterData.subBusinessGroup.class8Corrosive" },
    { value: "class_9_misc", labelKey: "masterData.subBusinessGroup.class9Misc" },
  ],
  freight_3pl_4pl: [
    { value: "contract_logistics", labelKey: "masterData.subBusinessGroup.contractLogistics" },
    { value: "supply_chain_consulting", labelKey: "masterData.subBusinessGroup.supplyChainConsulting" },
    { value: "managed_services", labelKey: "masterData.subBusinessGroup.managedServices" },
  ],
  healthcare_pharma: [
    { value: "cold_chain", labelKey: "masterData.subBusinessGroup.coldChain" },
    { value: "gmp_compliant", labelKey: "masterData.subBusinessGroup.gmpCompliant" },
    { value: "medical_devices", labelKey: "masterData.subBusinessGroup.medicalDevices" },
  ],
  multi_modal: [
    { value: "sea_air", labelKey: "masterData.subBusinessGroup.seaAir" },
    { value: "rail_truck", labelKey: "masterData.subBusinessGroup.railTruck" },
    { value: "intermodal", labelKey: "masterData.subBusinessGroup.intermodal" },
  ],
  new_business: [
    { value: "innovation_lab", labelKey: "masterData.subBusinessGroup.innovationLab" },
    { value: "process_excellence", labelKey: "masterData.subBusinessGroup.processExcellence" },
    { value: "digital_transformation", labelKey: "masterData.subBusinessGroup.digitalTransformation" },
  ],
  transport_warehouse: [
    { value: "inbound_logistics", labelKey: "masterData.subBusinessGroup.inboundLogistics" },
    { value: "outbound_logistics", labelKey: "masterData.subBusinessGroup.outboundLogistics" },
    { value: "warehouse_management", labelKey: "masterData.subBusinessGroup.warehouseManagement" },
  ],
};

export const PRODUCT_GROUPS: Record<string, { value: string; labelKey: string }[]> = {
  indonesia_ops: [
    { value: "jakarta_hub", labelKey: "masterData.productGroup.jakartaHub" },
    { value: "surabaya_hub", labelKey: "masterData.productGroup.surabayaHub" },
  ],
  philippines_ops: [
    { value: "manila_hub", labelKey: "masterData.productGroup.manilaHub" },
    { value: "cebu_hub", labelKey: "masterData.productGroup.cebuHub" },
  ],
  taiwan_ops: [
    { value: "taipei_hub", labelKey: "masterData.productGroup.taipeiHub" },
    { value: "kaohsiung_hub", labelKey: "masterData.productGroup.kaohsiungHub" },
  ],
  ecommerce_fulfillment: [
    { value: "pick_pack", labelKey: "masterData.productGroup.pickPack" },
    { value: "returns_management", labelKey: "masterData.productGroup.returnsManagement" },
    { value: "kitting", labelKey: "masterData.productGroup.kitting" },
  ],
  last_mile_delivery: [
    { value: "same_day", labelKey: "masterData.productGroup.sameDay" },
    { value: "next_day", labelKey: "masterData.productGroup.nextDay" },
    { value: "scheduled", labelKey: "masterData.productGroup.scheduled" },
  ],
  cold_chain: [
    { value: "temp_controlled_2_8c", labelKey: "masterData.productGroup.tempControlled2to8" },
    { value: "frozen_minus_20c", labelKey: "masterData.productGroup.frozenMinus20" },
    { value: "ultra_cold", labelKey: "masterData.productGroup.ultraCold" },
  ],
  contract_logistics: [
    { value: "dedicated_fleet", labelKey: "masterData.productGroup.dedicatedFleet" },
    { value: "shared_user", labelKey: "masterData.productGroup.sharedUser" },
    { value: "value_added_services", labelKey: "masterData.productGroup.valueAddedServices" },
  ],
};

/**
 * Subsidiaries and Legal Entities
 */
export const SUBSIDIARIES = [
  { value: "nexus_logistics_th", labelKey: "masterData.subsidiary.nexusLogisticsTH", country: "TH" },
  { value: "nexus_logistics_sg", labelKey: "masterData.subsidiary.nexusLogisticsSG", country: "SG" },
  { value: "nexus_logistics_vn", labelKey: "masterData.subsidiary.nexusLogisticsVN", country: "VN" },
  { value: "nexus_logistics_id", labelKey: "masterData.subsidiary.nexusLogisticsID", country: "ID" },
  { value: "nexus_logistics_my", labelKey: "masterData.subsidiary.nexusLogisticsMY", country: "MY" },
  { value: "nexus_logistics_ph", labelKey: "masterData.subsidiary.nexusLogisticsPH", country: "PH" },
  { value: "nexus_logistics_tw", labelKey: "masterData.subsidiary.nexusLogisticsTW", country: "TW" },
  { value: "nexus_logistics_cn", labelKey: "masterData.subsidiary.nexusLogisticsCN", country: "CN" },
] as const;

/**
 * Helper function to get sub business groups based on business group
 */
export function getSubBusinessGroups(businessGroup: string): { value: string; labelKey: string }[] {
  return SUB_BUSINESS_GROUPS[businessGroup] || [];
}

/**
 * Helper function to get product groups based on sub business group
 */
export function getProductGroups(subBusinessGroup: string): { value: string; labelKey: string }[] {
  return PRODUCT_GROUPS[subBusinessGroup] || [];
}

/**
 * Validation helpers
 */
export const REQUIRED_FIELD_INDICATOR = "*";

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone);
}

export function getRequiredFieldError(fieldName: string): string {
  return `validation.required`;
}