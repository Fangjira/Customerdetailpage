// Enhanced Utility Functions for Enterprise CRM
// Additional helpers beyond the base helpers.ts

import { masterData } from "../config/masterData";

// ==================== NUMBER FORMATTING ====================

export const formatCurrency = (
  amount: number,
  currency: string = "THB",
  locale: string = "th-TH"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatNumber = (
  num: number,
  locale: string = "th-TH",
  decimals: number = 0
): string => {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

export const formatPercentage = (
  value: number,
  decimals: number = 1
): string => {
  return `${value.toFixed(decimals)}%`;
};

// ==================== DATE FORMATTING ====================

export const formatDate = (
  date: string | Date,
  locale: string = "th-TH",
  options?: Intl.DateTimeFormatOptions
): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  
  return new Intl.DateTimeFormat(locale, options || defaultOptions).format(d);
};

export const formatDateTime = (
  date: string | Date,
  locale: string = "th-TH"
): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
};

export const formatRelativeTime = (date: string | Date): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours === 0) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return `${diffMinutes} minutes ago`;
    }
    return `${diffHours} hours ago`;
  }
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};

export const getDaysUntil = (date: string | Date): number => {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = d.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
};

export const getBusinessDays = (startDate: Date, endDate: Date): number => {
  let count = 0;
  const current = new Date(startDate);
  
  while (current <= endDate) {
    const dayOfWeek = current.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }
  
  return count;
};

// ==================== ID GENERATION ====================

export const generateCustomerId = (): string => {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
  return `CUST-${year}-${random}`;
};

export const generateQuotationNumber = (branchCode: string = "BKK"): string => {
  const year = new Date().getFullYear().toString().slice(-2);
  const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
  const random = Math.floor(Math.random() * 9999).toString().padStart(4, "0");
  return `QT-${branchCode}-${year}${month}-${random}`;
};

export const generateContractNumber = (branchCode: string = "BKK"): string => {
  const year = new Date().getFullYear().toString().slice(-2);
  const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
  const random = Math.floor(Math.random() * 9999).toString().padStart(4, "0");
  return `CON-${branchCode}-${year}${month}-${random}`;
};

export const generateTicketNumber = (branchCode: string = "BKK"): string => {
  const year = new Date().getFullYear().toString().slice(-2);
  const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
  const random = Math.floor(Math.random() * 9999).toString().padStart(4, "0");
  return `TK-${branchCode}-${year}${month}-${random}`;
};

export const generateApprovalNumber = (branchCode: string = "BKK"): string => {
  const year = new Date().getFullYear().toString().slice(-2);
  const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
  const random = Math.floor(Math.random() * 9999).toString().padStart(4, "0");
  return `APR-${branchCode}-${year}${month}-${random}`;
};

// ==================== VALIDATION ====================

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Thai phone number format: +66-X-XXXX-XXXX or 0X-XXXX-XXXX
  const phoneRegex = /^(\+66|0)[0-9]{1,2}-?[0-9]{3,4}-?[0-9]{4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
};

export const validateTaxId = (taxId: string): boolean => {
  // Thai tax ID format: 13 digits
  const taxIdRegex = /^[0-9]{13}$/;
  return taxIdRegex.test(taxId.replace(/-/g, ""));
};

export const validateAmount = (amount: number): boolean => {
  return amount > 0 && Number.isFinite(amount);
};

// ==================== CALCULATIONS ====================

export const calculateVAT = (
  amount: number,
  vatType: "vat_in" | "vat_out" | "no_vat",
  vatRate: number = 0.07
): { subtotal: number; vat: number; total: number } => {
  if (vatType === "vat_in") {
    // VAT included in amount
    const subtotal = amount / (1 + vatRate);
    const vat = amount - subtotal;
    return { subtotal, vat, total: amount };
  } else if (vatType === "vat_out") {
    // VAT excluded from amount
    const vat = amount * vatRate;
    return { subtotal: amount, vat, total: amount + vat };
  } else {
    // No VAT
    return { subtotal: amount, vat: 0, total: amount };
  }
};

export const calculateDiscount = (
  amount: number,
  discount: number,
  discountType: "percentage" | "flat"
): { discountAmount: number; finalAmount: number } => {
  if (discountType === "percentage") {
    const discountAmount = amount * (discount / 100);
    return { discountAmount, finalAmount: amount - discountAmount };
  } else {
    return { discountAmount: discount, finalAmount: amount - discount };
  }
};

export const calculateLineItemTotal = (
  quantity: number,
  unitPrice: number,
  discount: number,
  discountType: "percentage" | "flat"
): number => {
  const subtotal = quantity * unitPrice;
  const { finalAmount } = calculateDiscount(subtotal, discount, discountType);
  return finalAmount;
};

export const calculateGrowthRate = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

export const calculateAverage = (numbers: number[]): number => {
  if (numbers.length === 0) return 0;
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
};

export const calculateMedian = (numbers: number[]): number => {
  if (numbers.length === 0) return 0;
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
};

// ==================== TEXT FORMATTING ====================

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
};

export const toTitleCase = (text: string): string => {
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");
};

// ==================== ARRAY UTILITIES ====================

export const sortByField = <T>(
  array: T[],
  field: keyof T,
  order: "asc" | "desc" = "asc"
): T[] => {
  return [...array].sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];
    
    if (aVal < bVal) return order === "asc" ? -1 : 1;
    if (aVal > bVal) return order === "asc" ? 1 : -1;
    return 0;
  });
};

export const groupBy = <T>(
  array: T[],
  key: keyof T
): Record<string, T[]> => {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
};

export const uniqueBy = <T>(array: T[], key: keyof T): T[] => {
  const seen = new Set();
  return array.filter((item) => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
};

// ==================== COLOR UTILITIES ====================

export const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    // Deal/Lead statuses
    new_lead: "#3b82f6", // blue
    follow_up: "#f59e0b", // amber
    existing: "#10b981", // green
    lost: "#6b7280", // gray
    
    // Task/Ticket statuses
    new: "#3b82f6",
    pending: "#f59e0b",
    in_progress: "#eab308", // yellow
    completed: "#10b981",
    closed: "#10b981",
    cancelled: "#ef4444", // red
    
    // Approval statuses
    approved: "#10b981",
    rejected: "#ef4444",
    
    // Priority colors
    p1: "#ef4444", // red
    p2: "#f59e0b", // orange
    p3: "#eab308", // yellow
    p4: "#3b82f6", // blue
    p5: "#6b7280", // gray
  };
  
  return statusColors[status] || "#6b7280";
};

export const getPriorityColor = (priority: string): string => {
  const priorityColors: Record<string, string> = {
    p1: "#ef4444", // red - Critical
    p2: "#f59e0b", // orange - High
    p3: "#eab308", // yellow - Medium
    p4: "#3b82f6", // blue - Low
    p5: "#6b7280", // gray - No SLA
  };
  
  return priorityColors[priority] || "#6b7280";
};

export const getSLAStatusColor = (slaStatus: string): string => {
  const colors: Record<string, string> = {
    "on-time": "#10b981", // green
    warning: "#f59e0b", // orange
    overdue: "#ef4444", // red
  };
  
  return colors[slaStatus] || "#6b7280";
};

// ==================== MASTER DATA LOOKUPS ====================

export const getBranchName = (
  branchCode: string,
  language: "en" | "th" = "en"
): string => {
  const branch = masterData.branches.find((b) => b.value === branchCode);
  return branch ? branch.label[language] : branchCode;
};

export const getIndustryName = (
  industryCode: string,
  language: "en" | "th" = "en"
): string => {
  const industry = masterData.industries.find((i) => i.value === industryCode);
  return industry ? industry.label[language] : industryCode;
};

export const getPriorityLabel = (
  priorityCode: string,
  language: "en" | "th" = "en"
): string => {
  const priority = masterData.priorities.find((p) => p.value === priorityCode);
  return priority ? priority.label[language] : priorityCode;
};

export const getStatusLabel = (
  statusCode: string,
  statusType: "quotation" | "ticket" | "customer",
  language: "en" | "th" = "en"
): string => {
  let statusList: any[] = [];
  
  switch (statusType) {
    case "quotation":
      statusList = masterData.quotationStatuses;
      break;
    case "ticket":
      statusList = masterData.ticketStatuses;
      break;
    case "customer":
      statusList = masterData.customerStatuses;
      break;
  }
  
  const status = statusList.find((s) => s.value === statusCode);
  return status ? status.label[language] : statusCode;
};

// ==================== EXPORT/IMPORT ====================

export const exportToCSV = (data: any[], filename: string): void => {
  if (data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      headers.map((header) => JSON.stringify(row[header] || "")).join(",")
    ),
  ].join("\n");
  
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToJSON = (data: any, filename: string): void => {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: "application/json" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// ==================== BROWSER UTILITIES ====================

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy:", err);
    return false;
  }
};

export const downloadFile = (url: string, filename: string): void => {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// ==================== DEBOUNCE/THROTTLE ====================

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
