/**
 * Utils Barrel Export
 * Central export point for all utility modules
 * @module utils
 */

// ==================== VALIDATION ====================
// Export from validation.ts
export {
  isValidEmail,
  isValidPhone,
  sanitizeHTML,
  escapeHTML,
  validateTextInput,
  validateEmail,
  validatePhone,
  isValidURL,
  parseNumber,
  createDebouncedValidator,
} from './validation';

// ==================== PERFORMANCE ====================
// Export from performance.ts
export {
  measureRender,
  useRenderPerformance,
  memoize,
  debounce as performanceDebounce,
  throttle,
  LazyComponent,
  DeferredRender,
  VirtualList,
  monitorWebVitals,
} from './performance';

// ==================== HELPERS ====================
// Export from helpers.ts (prioritized over enterpriseHelpers for generic functions)
export {
  formatDate,
  formatDateTime,
  formatTime,
  formatRelativeTime,
  getDaysAgo,
  getHoursRemaining,
  formatCurrency,
  formatNumber,
  formatPercent,
  formatCompactNumber,
  truncate,
  getInitials,
  slugify,
  getStatusColor,
  getPriorityColor,
  getSLAColor,
  calculatePercentage,
  calculateDiscount,
  calculateTotal,
  sortByDate,
  sortByNumber,
  sortByString,
  filterBySearch,
  saveToLocalStorage,
  loadFromLocalStorage,
  removeFromLocalStorage,
  formatFileSize,
  debounce,
  generateRandomId,
  copyToClipboard,
  downloadAsJSON,
  downloadAsCSV,
  deepClone,
  isEqual,
  groupByKey,
  uniqueValues,
  chunk,
  flatten,
  retry,
  timeout,
} from './helpers';

// ==================== ENTERPRISE HELPERS ====================
// Export from enterpriseHelpers.ts with aliases to avoid conflicts
export {
  formatCurrency as formatCurrencyEnterprise,
  formatNumber as formatNumberEnterprise,
  formatPercentage,
  formatDate as formatDateEnterprise,
  formatDateTime as formatDateTimeEnterprise,
  formatRelativeTime as formatRelativeTimeEnterprise,
  getDaysUntil,
  getBusinessDays,
  generateCustomerId,
  generateQuotationNumber,
  generateContractNumber,
  generateTicketNumber,
  generateApprovalNumber,
  validateAmount,
  calculateVAT,
  calculateDiscount as calculateDiscountEnterprise,
  calculateLineItemTotal,
  calculateGrowthRate,
  calculateAverage,
  calculateMedian,
  truncateText,
  toTitleCase,
  slugify as slugifyEnterprise,
  getInitials as getInitialsEnterprise,
  sortByField,
  groupBy,
  uniqueBy,
  getStatusBadgeVariant,
  getPriorityBadgeVariant,
  formatPhoneNumber,
  maskEmail,
  maskPhone,
  searchFilter,
  highlightText,
  parseCSV,
  exportToExcel,
  sanitizeInput,
  generateUUID,
  encodeBase64,
  decodeBase64,
  delay,
  debounce as debounceEnterprise,
  retryWithBackoff,
  chunk as chunkEnterprise,
  partition,
  difference,
  intersection,
  union,
} from './enterpriseHelpers';

// ==================== OTHER ====================
export * from './safeRender';
export * from './cn';
