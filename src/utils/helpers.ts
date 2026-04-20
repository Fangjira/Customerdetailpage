// Utility Helper Functions for Enterprise CRM

import { format, formatDistance, differenceInHours, differenceInDays } from 'date-fns';
import { th, enUS } from 'date-fns/locale';

// ==================== DATE & TIME ====================

export const formatDate = (date: string | Date, locale: 'th' | 'en' = 'en'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'dd MMM yyyy', { locale: locale === 'th' ? th : enUS });
};

export const formatDateTime = (date: string | Date, locale: 'th' | 'en' = 'en'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'dd MMM yyyy HH:mm', { locale: locale === 'th' ? th : enUS });
};

export const formatTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'HH:mm');
};

export const formatRelativeTime = (date: string | Date, locale: 'th' | 'en' = 'en'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return formatDistance(dateObj, new Date(), { 
    addSuffix: true, 
    locale: locale === 'th' ? th : enUS 
  });
};

export const getDaysAgo = (date: string | Date): number => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return differenceInDays(new Date(), dateObj);
};

export const getHoursRemaining = (deadline: string | Date): number => {
  const deadlineObj = typeof deadline === 'string' ? new Date(deadline) : deadline;
  return differenceInHours(deadlineObj, new Date());
};

// ==================== CURRENCY & NUMBERS ====================

export const formatCurrency = (amount: number, currency: string = 'THB', locale: 'th' | 'en' = 'en'): string => {
  const localeStr = locale === 'th' ? 'th-TH' : 'en-US';
  
  if (currency === 'THB') {
    return new Intl.NumberFormat(localeStr, {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }
  
  return new Intl.NumberFormat(localeStr, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatNumber = (num: number, decimals: number = 0, locale: 'th' | 'en' = 'en'): string => {
  const localeStr = locale === 'th' ? 'th-TH' : 'en-US';
  return new Intl.NumberFormat(localeStr, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

export const formatPercent = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

export const formatCompactNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

// ==================== STRING MANIPULATION ====================

export const truncate = (str: string, length: number): string => {
  if (str.length <= length) return str;
  return str.substring(0, length) + '...';
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
};

export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// ==================== STATUS & COLORS ====================

export const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    // General
    active: 'green',
    inactive: 'gray',
    pending: 'yellow',
    approved: 'green',
    rejected: 'red',
    cancelled: 'gray',
    
    // Quotation
    draft: 'gray',
    sent: 'blue',
    viewed: 'cyan',
    accepted: 'green',
    expired: 'orange',
    revised: 'purple',
    
    // Contract
    renewed: 'green',
    terminated: 'red',
    
    // Ticket
    new: 'blue',
    assigned: 'cyan',
    in_progress: 'yellow',
    closed: 'green',
    reopened: 'purple',
    no_response: 'gray',
    
    // Payment
    paid: 'green',
    overdue: 'red',
    partial: 'orange',
    refunded: 'blue',
    
    // Deal
    open: 'blue',
    won: 'green',
    lost: 'red',
  };
  
  return statusColors[status] || 'gray';
};

export const getPriorityColor = (priority: string): string => {
  const priorityColors: Record<string, string> = {
    p1: 'red',
    p2: 'orange',
    p3: 'yellow',
    p4: 'blue',
    p5: 'gray',
    high: 'red',
    medium: 'yellow',
    low: 'blue',
  };
  
  return priorityColors[priority] || 'gray';
};

export const getSLAColor = (slaStatus: string): string => {
  const slaColors: Record<string, string> = {
    'on-time': 'green',
    'warning': 'orange',
    'overdue': 'red',
  };
  
  return slaColors[slaStatus] || 'gray';
};

// ==================== VALIDATION ====================

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Thai phone number: 0x-xxxx-xxxx or +66-x-xxxx-xxxx
  const phoneRegex = /^(\+66|0)[0-9]{1,2}-?[0-9]{3,4}-?[0-9]{4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateTaxId = (taxId: string): boolean => {
  // Thai Tax ID: 13 digits
  const taxIdRegex = /^[0-9]{13}$/;
  return taxIdRegex.test(taxId.replace(/-/g, ''));
};

// ==================== CALCULATIONS ====================

export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return (value / total) * 100;
};

export const calculateDiscount = (
  amount: number, 
  discount: number, 
  discountType: 'percentage' | 'flat'
): number => {
  if (discountType === 'percentage') {
    return amount * (discount / 100);
  }
  return discount;
};

export const calculateTotal = (
  subtotal: number,
  discount: number,
  discountType: 'percentage' | 'flat',
  vatType: 'vat_in' | 'vat_out' | 'no_vat'
): { subtotal: number; discount: number; vat: number; total: number } => {
  const VAT_RATE = 0.07;
  
  // Calculate discount amount
  const discountAmount = calculateDiscount(subtotal, discount, discountType);
  const afterDiscount = subtotal - discountAmount;
  
  // Calculate VAT
  let vat = 0;
  let total = afterDiscount;
  
  if (vatType === 'vat_out') {
    vat = afterDiscount * VAT_RATE;
    total = afterDiscount + vat;
  } else if (vatType === 'vat_in') {
    vat = afterDiscount - (afterDiscount / (1 + VAT_RATE));
  }
  
  return {
    subtotal,
    discount: discountAmount,
    vat,
    total,
  };
};

// ==================== SORTING & FILTERING ====================

export const sortByDate = <T extends Record<string, any>>(
  array: T[],
  field: keyof T,
  order: 'asc' | 'desc' = 'desc'
): T[] => {
  return [...array].sort((a, b) => {
    const dateA = new Date(a[field] as string).getTime();
    const dateB = new Date(b[field] as string).getTime();
    return order === 'asc' ? dateA - dateB : dateB - dateA;
  });
};

export const sortByNumber = <T extends Record<string, any>>(
  array: T[],
  field: keyof T,
  order: 'asc' | 'desc' = 'desc'
): T[] => {
  return [...array].sort((a, b) => {
    const numA = a[field] as number;
    const numB = b[field] as number;
    return order === 'asc' ? numA - numB : numB - numA;
  });
};

export const sortByString = <T extends Record<string, any>>(
  array: T[],
  field: keyof T,
  order: 'asc' | 'desc' = 'asc'
): T[] => {
  return [...array].sort((a, b) => {
    const strA = (a[field] as string).toLowerCase();
    const strB = (b[field] as string).toLowerCase();
    if (order === 'asc') {
      return strA.localeCompare(strB);
    }
    return strB.localeCompare(strA);
  });
};

export const filterBySearch = <T extends Record<string, any>>(
  array: T[],
  searchTerm: string,
  fields: (keyof T)[]
): T[] => {
  if (!searchTerm.trim()) return array;
  
  const lowerSearch = searchTerm.toLowerCase();
  return array.filter(item =>
    fields.some(field => {
      const value = item[field];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(lowerSearch);
      }
      return false;
    })
  );
};

// ==================== LOCAL STORAGE ====================

export const saveToLocalStorage = (key: string, value: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

export const removeFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

// ==================== FILE HANDLING ====================

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

export const getFileExtension = (filename: string): string => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
};

export const getFileIcon = (filename: string): string => {
  const ext = getFileExtension(filename).toLowerCase();
  
  const iconMap: Record<string, string> = {
    pdf: 'FileText',
    doc: 'FileText',
    docx: 'FileText',
    xls: 'Sheet',
    xlsx: 'Sheet',
    csv: 'Sheet',
    jpg: 'Image',
    jpeg: 'Image',
    png: 'Image',
    gif: 'Image',
    zip: 'Archive',
    rar: 'Archive',
    '7z': 'Archive',
  };
  
  return iconMap[ext] || 'File';
};

// ==================== ARRAY UTILITIES ====================

export const groupBy = <T extends Record<string, any>>(
  array: T[],
  key: keyof T
): Record<string, T[]> => {
  return array.reduce((result, item) => {
    const groupKey = item[key] as string;
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
};

export const uniqueBy = <T extends Record<string, any>>(
  array: T[],
  key: keyof T
): T[] => {
  const seen = new Set();
  return array.filter(item => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
};

export const chunk = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

// ==================== DEBOUNCE & THROTTLE ====================

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// ==================== RANDOM GENERATORS ====================

export const generateId = (prefix: string = ''): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 9);
  return prefix ? `${prefix}-${timestamp}-${random}` : `${timestamp}-${random}`;
};

export const generateColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 60%)`;
};

// ==================== CHANGE TRACKING ====================

export const getChangedFields = <T extends Record<string, any>>(
  original: T,
  updated: T
): { field: string; oldValue: any; newValue: any }[] => {
  const changes: { field: string; oldValue: any; newValue: any }[] = [];
  
  for (const key in updated) {
    if (original[key] !== updated[key]) {
      changes.push({
        field: key,
        oldValue: original[key],
        newValue: updated[key],
      });
    }
  }
  
  return changes;
};

export const formatChangeDescription = (
  field: string,
  oldValue: any,
  newValue: any,
  locale: 'th' | 'en' = 'en'
): string => {
  const fieldName = field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  if (locale === 'th') {
    return `เปลี่ยน ${fieldName} จาก "${oldValue}" เป็น "${newValue}"`;
  }
  
  return `Changed ${fieldName} from "${oldValue}" to "${newValue}"`;
};
