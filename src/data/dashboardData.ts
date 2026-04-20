// Dashboard & Analytics Data for Enterprise CRM
// Real-time KPIs, metrics, and business intelligence data

import { Dashboard } from "../types/crm";

export const getDashboardData = (): Dashboard => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  return {
    // ==================== KEY PERFORMANCE INDICATORS ====================
    totalLeads: 25,
    totalLeadsChange: 18.5, // +18.5% from last period
    
    activeDeals: 42,
    activeDealsChange: 12.3, // +12.3%
    
    pendingApprovals: 8,
    pendingApprovalsChange: -15.2, // -15.2% (improvement)
    
    thisMonthRevenue: 42750000,
    thisMonthRevenueChange: 24.7, // +24.7%
    
    // ==================== CALL CENTER METRICS ====================
    callsToday: 127,
    missedCallsToday: 3,
    avgResponseTime: 2.3, // minutes
    
    // ==================== TICKET METRICS ====================
    openTickets: 34,
    overdueTickets: 5,
    ticketSatisfaction: 4.6, // out of 5
    
    // ==================== CONVERSION METRICS ====================
    leadToCustomer: 68.5, // 68.5%
    quotationToContract: 72.8, // 72.8%
    
    // ==================== REVENUE TRENDS ====================
    revenueByMonth: [
      { month: "Jan 2024", revenue: 28500000 },
      { month: "Feb 2024", revenue: 31200000 },
      { month: "Mar 2024", revenue: 29800000 },
      { month: "Apr 2024", revenue: 33500000 },
      { month: "May 2024", revenue: 35700000 },
      { month: "Jun 2024", revenue: 34200000 },
      { month: "Jul 2024", revenue: 38900000 },
      { month: "Aug 2024", revenue: 36500000 },
      { month: "Sep 2024", revenue: 39200000 },
      { month: "Oct 2024", revenue: 41800000 },
      { month: "Nov 2024", revenue: 40500000 },
      { month: "Dec 2024", revenue: 42750000 },
    ],
    
    // ==================== DEAL PIPELINE ====================
    dealsByStage: [
      { stage: "Lead", count: 25, value: 48500000 },
      { stage: "Qualification", count: 18, value: 36200000 },
      { stage: "Proposal", count: 15, value: 52800000 },
      { stage: "Negotiation", count: 12, value: 42500000 },
      { stage: "Closing", count: 8, value: 28900000 },
      { stage: "Won", count: 45, value: 185000000 },
      { stage: "Lost", count: 12, value: 24500000 },
    ],
    
    // ==================== TICKETS BY CATEGORY ====================
    ticketsByCategory: [
      { category: "Customer Query", count: 145 },
      { category: "Sales Lead", count: 89 },
      { category: "Sales Quote", count: 67 },
      { category: "Sales Upsell", count: 43 },
      { category: "Repair Request", count: 28 },
      { category: "Complaint", count: 15 },
      { category: "Inspection", count: 22 },
      { category: "Missing Documents", count: 18 },
      { category: "Move-in/Move-out", count: 35 },
      { category: "Partnership", count: 12 },
      { category: "Refund Request", count: 8 },
      { category: "Other", count: 24 },
    ],
    
    // ==================== TOP CUSTOMERS ====================
    topCustomers: [
      { name: "PTT Global Chemical", value: 31200000 },
      { name: "SCG Chemicals", value: 28750000 },
      { name: "SCG Building Materials", value: 22400000 },
      { name: "CP ALL", value: 18900000 },
      { name: "Central Food Retail", value: 15600000 },
      { name: "Thai Beverage", value: 12500000 },
      { name: "Charoen Pokphand Foods", value: 10800000 },
      { name: "Unilever Thai", value: 9400000 },
      { name: "Toyota Motor Thailand", value: 8750000 },
      { name: "Betagro", value: 7200000 },
    ],
  };
};

// ==================== BRANCH PERFORMANCE ====================
export interface BranchPerformance {
  branch: string;
  branchName: {
    en: string;
    th: string;
  };
  revenue: number;
  revenueGrowth: number;
  activeCustomers: number;
  activeDeals: number;
  avgDealSize: number;
  teamSize: number;
  utilizationRate: number; // Warehouse utilization %
}

export const branchPerformanceData: BranchPerformance[] = [
  {
    branch: "bkk_head",
    branchName: { en: "Bangkok Head Office", th: "สำนักงานใหญ่ กรุงเทพ" },
    revenue: 125500000,
    revenueGrowth: 22.5,
    activeCustomers: 45,
    activeDeals: 18,
    avgDealSize: 2800000,
    teamSize: 28,
    utilizationRate: 87.5,
  },
  {
    branch: "laemchabang",
    branchName: { en: "Laem Chabang", th: "แหลมฉบัง" },
    revenue: 98200000,
    revenueGrowth: 28.3,
    activeCustomers: 32,
    activeDeals: 14,
    avgDealSize: 3200000,
    teamSize: 22,
    utilizationRate: 92.3,
  },
  {
    branch: "bkk_bangna",
    branchName: { en: "Bangkok - Bangna", th: "กรุงเทพ - บางนา" },
    revenue: 78900000,
    revenueGrowth: 19.8,
    activeCustomers: 28,
    activeDeals: 12,
    avgDealSize: 2400000,
    teamSize: 18,
    utilizationRate: 84.2,
  },
  {
    branch: "sriracha",
    branchName: { en: "Sriracha", th: "ศรีราชา" },
    revenue: 65400000,
    revenueGrowth: 15.6,
    activeCustomers: 24,
    activeDeals: 10,
    avgDealSize: 2100000,
    teamSize: 15,
    utilizationRate: 88.7,
  },
  {
    branch: "bkk_rama2",
    branchName: { en: "Bangkok - Rama 2", th: "กรุงเทพ - พระราม 2" },
    revenue: 52300000,
    revenueGrowth: 12.4,
    activeCustomers: 20,
    activeDeals: 8,
    avgDealSize: 1900000,
    teamSize: 12,
    utilizationRate: 79.5,
  },
  {
    branch: "chonburi",
    branchName: { en: "Chonburi", th: "ชลบุรี" },
    revenue: 41800000,
    revenueGrowth: 18.9,
    activeCustomers: 16,
    activeDeals: 7,
    avgDealSize: 1800000,
    teamSize: 10,
    utilizationRate: 82.1,
  },
  {
    branch: "chiangmai",
    branchName: { en: "Chiang Mai", th: "เชียงใหม่" },
    revenue: 28700000,
    revenueGrowth: 25.2,
    activeCustomers: 12,
    activeDeals: 5,
    avgDealSize: 1500000,
    teamSize: 8,
    utilizationRate: 76.3,
  },
  {
    branch: "phuket",
    branchName: { en: "Phuket", th: "ภูเก็ต" },
    revenue: 22500000,
    revenueGrowth: 31.5,
    activeCustomers: 10,
    activeDeals: 4,
    avgDealSize: 1400000,
    teamSize: 6,
    utilizationRate: 71.8,
  },
];

// ==================== SERVICE LINE PERFORMANCE ====================
export interface ServiceLinePerformance {
  serviceLine: string;
  businessGroup: string;
  revenue: number;
  revenueGrowth: number;
  margin: number; // Profit margin %
  activeContracts: number;
  avgContractValue: number;
}

export const serviceLinePerformanceData: ServiceLinePerformance[] = [
  {
    serviceLine: "Warehouse Storage",
    businessGroup: "warehouse_operations",
    revenue: 145800000,
    revenueGrowth: 18.5,
    margin: 35.2,
    activeContracts: 78,
    avgContractValue: 1870000,
  },
  {
    serviceLine: "Dangerous Goods Logistics",
    businessGroup: "dangerous_goods",
    revenue: 98500000,
    revenueGrowth: 24.3,
    margin: 42.8,
    activeContracts: 32,
    avgContractValue: 3078000,
  },
  {
    serviceLine: "Air Freight",
    businessGroup: "freight_3pl_4pl",
    revenue: 87200000,
    revenueGrowth: 21.7,
    margin: 28.5,
    activeContracts: 56,
    avgContractValue: 1557000,
  },
  {
    serviceLine: "Sea Freight",
    businessGroup: "freight_3pl_4pl",
    revenue: 76400000,
    revenueGrowth: 19.2,
    margin: 31.2,
    activeContracts: 48,
    avgContractValue: 1592000,
  },
  {
    serviceLine: "E-commerce Fulfillment",
    businessGroup: "b2b2c",
    revenue: 62100000,
    revenueGrowth: 35.8,
    margin: 38.5,
    activeContracts: 42,
    avgContractValue: 1479000,
  },
  {
    serviceLine: "Cold Chain",
    businessGroup: "commodity",
    revenue: 54300000,
    revenueGrowth: 22.5,
    margin: 36.7,
    activeContracts: 28,
    avgContractValue: 1939000,
  },
  {
    serviceLine: "Cross-Border Transport",
    businessGroup: "clmv_china",
    revenue: 42800000,
    revenueGrowth: 28.4,
    margin: 33.1,
    activeContracts: 24,
    avgContractValue: 1783000,
  },
  {
    serviceLine: "Retail Distribution",
    businessGroup: "b2b2c",
    revenue: 38900000,
    revenueGrowth: 16.3,
    margin: 29.8,
    activeContracts: 18,
    avgContractValue: 2161000,
  },
];

// ==================== SALES FUNNEL METRICS ====================
export interface SalesFunnelMetrics {
  stage: string;
  count: number;
  value: number;
  avgDaysInStage: number;
  conversionRate: number;
  dropoffRate: number;
}

export const salesFunnelData: SalesFunnelMetrics[] = [
  {
    stage: "Lead",
    count: 150,
    value: 285000000,
    avgDaysInStage: 7,
    conversionRate: 68.0,
    dropoffRate: 32.0,
  },
  {
    stage: "Qualification",
    count: 102,
    value: 248500000,
    avgDaysInStage: 12,
    conversionRate: 75.5,
    dropoffRate: 24.5,
  },
  {
    stage: "Proposal",
    count: 77,
    value: 215400000,
    avgDaysInStage: 18,
    conversionRate: 80.5,
    dropoffRate: 19.5,
  },
  {
    stage: "Negotiation",
    count: 62,
    value: 192800000,
    avgDaysInStage: 15,
    conversionRate: 85.5,
    dropoffRate: 14.5,
  },
  {
    stage: "Closing",
    count: 53,
    value: 178500000,
    avgDaysInStage: 10,
    conversionRate: 90.6,
    dropoffRate: 9.4,
  },
  {
    stage: "Won",
    count: 48,
    value: 165200000,
    avgDaysInStage: 0,
    conversionRate: 100,
    dropoffRate: 0,
  },
];

// ==================== CUSTOMER SATISFACTION METRICS ====================
export interface CustomerSatisfactionMetrics {
  category: string;
  score: number; // 1-5 scale
  responseRate: number; // Percentage of surveys completed
  totalResponses: number;
  trend: number; // Change from last period
}

export const customerSatisfactionData: CustomerSatisfactionMetrics[] = [
  {
    category: "Overall Service Quality",
    score: 4.6,
    responseRate: 82.5,
    totalResponses: 248,
    trend: 0.3,
  },
  {
    category: "Warehouse Operations",
    score: 4.7,
    responseRate: 85.2,
    totalResponses: 192,
    trend: 0.2,
  },
  {
    category: "Transportation Services",
    score: 4.5,
    responseRate: 79.8,
    totalResponses: 176,
    trend: 0.4,
  },
  {
    category: "Customer Service",
    score: 4.8,
    responseRate: 88.3,
    totalResponses: 265,
    trend: 0.1,
  },
  {
    category: "Pricing & Value",
    score: 4.3,
    responseRate: 76.5,
    totalResponses: 203,
    trend: -0.1,
  },
  {
    category: "Technology & Tracking",
    score: 4.4,
    responseRate: 72.1,
    totalResponses: 185,
    trend: 0.5,
  },
  {
    category: "Safety & Compliance",
    score: 4.9,
    responseRate: 91.2,
    totalResponses: 158,
    trend: 0.2,
  },
];

// ==================== TEAM PERFORMANCE METRICS ====================
export interface TeamPerformanceMetrics {
  teamMember: string;
  role: string;
  activeDeals: number;
  closedDeals: number;
  totalRevenue: number;
  avgDealSize: number;
  winRate: number;
  avgSalesCycle: number; // days
}

export const teamPerformanceData: TeamPerformanceMetrics[] = [
  {
    teamMember: "Sarah Chen",
    role: "Sales",
    activeDeals: 8,
    closedDeals: 12,
    totalRevenue: 35400000,
    avgDealSize: 2950000,
    winRate: 80.0,
    avgSalesCycle: 42,
  },
  {
    teamMember: "Michael Park",
    role: "Sales",
    activeDeals: 10,
    closedDeals: 15,
    totalRevenue: 48200000,
    avgDealSize: 3213000,
    winRate: 83.3,
    avgSalesCycle: 38,
  },
  {
    teamMember: "Emily Rodriguez",
    role: "Sales",
    activeDeals: 6,
    closedDeals: 10,
    totalRevenue: 28900000,
    avgDealSize: 2890000,
    winRate: 76.9,
    avgSalesCycle: 45,
  },
  {
    teamMember: "Somchai Prasert",
    role: "Call Center",
    activeDeals: 0,
    closedDeals: 0,
    totalRevenue: 0,
    avgDealSize: 0,
    winRate: 0,
    avgSalesCycle: 0,
  },
  {
    teamMember: "Apinya Suksawat",
    role: "Operations",
    activeDeals: 0,
    closedDeals: 0,
    totalRevenue: 0,
    avgDealSize: 0,
    winRate: 0,
    avgSalesCycle: 0,
  },
];

// ==================== OPERATIONAL METRICS ====================
export interface OperationalMetrics {
  metric: string;
  value: number;
  unit: string;
  target: number;
  achievement: number; // Percentage of target
  trend: number;
}

export const operationalMetricsData: OperationalMetrics[] = [
  {
    metric: "Warehouse Utilization",
    value: 87.5,
    unit: "%",
    target: 85.0,
    achievement: 102.9,
    trend: 2.5,
  },
  {
    metric: "On-Time Delivery",
    value: 96.8,
    unit: "%",
    target: 95.0,
    achievement: 101.9,
    trend: 1.2,
  },
  {
    metric: "SLA Compliance",
    value: 94.3,
    unit: "%",
    target: 90.0,
    achievement: 104.8,
    trend: 3.1,
  },
  {
    metric: "Avg Response Time",
    value: 2.3,
    unit: "minutes",
    target: 3.0,
    achievement: 123.3,
    trend: -0.4,
  },
  {
    metric: "Customer Retention",
    value: 92.5,
    unit: "%",
    target: 90.0,
    achievement: 102.8,
    trend: 1.8,
  },
  {
    metric: "Safety Incidents",
    value: 2,
    unit: "incidents",
    target: 5,
    achievement: 250.0,
    trend: -1,
  },
  {
    metric: "Avg Deal Close Time",
    value: 42,
    unit: "days",
    target: 45,
    achievement: 107.1,
    trend: -3,
  },
];

// Helper function to calculate period comparison
export const calculatePeriodChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

// Helper function to get trend indicator
export const getTrendIndicator = (change: number): "up" | "down" | "stable" => {
  if (change > 2) return "up";
  if (change < -2) return "down";
  return "stable";
};
