/**
 * Input Validation Utilities
 * Production-ready validation helpers with security-first approach
 * @module utils/validation
 */

/**
 * Email validation with RFC 5322 compliance
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
};

/**
 * Phone number validation (international format)
 * Supports formats: +66-XX-XXX-XXXX, (66) XXXXXXXXX, 0XX-XXX-XXXX
 */
export const isValidPhone = (phone: string): boolean => {
  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, '');
  // Allow 10-15 digits (covers most international formats)
  return /^\+?\d{10,15}$/.test(cleaned);
};

/**
 * Sanitize HTML string to prevent XSS
 * Removes script tags, event handlers, and dangerous attributes
 */
export const sanitizeHTML = (input: string): string => {
  if (typeof input !== 'string') return '';

  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '');
};

/**
 * Sanitize string for safe display (escapes HTML entities)
 */
export const escapeHTML = (str: string): string => {
  if (typeof str !== 'string') return '';

  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
};

/**
 * Validate and sanitize text input
 */
export const validateTextInput = (
  value: string,
  options: {
    minLength?: number;
    maxLength?: number;
    required?: boolean;
    pattern?: RegExp;
  } = {}
): { valid: boolean; error?: string; sanitized: string } => {
  const {
    minLength = 0,
    maxLength = 1000,
    required = false,
    pattern,
  } = options;

  const sanitized = sanitizeHTML(value.trim());

  if (required && !sanitized) {
    return { valid: false, error: 'This field is required', sanitized };
  }

  if (sanitized.length < minLength) {
    return {
      valid: false,
      error: `Minimum length is ${minLength} characters`,
      sanitized,
    };
  }

  if (sanitized.length > maxLength) {
    return {
      valid: false,
      error: `Maximum length is ${maxLength} characters`,
      sanitized,
    };
  }

  if (pattern && !pattern.test(sanitized)) {
    return {
      valid: false,
      error: 'Invalid format',
      sanitized,
    };
  }

  return { valid: true, sanitized };
};

/**
 * Validate email field with sanitization
 */
export const validateEmail = (email: string): {
  valid: boolean;
  error?: string;
  sanitized: string;
} => {
  const sanitized = email.trim().toLowerCase();

  if (!sanitized) {
    return { valid: false, error: 'Email is required', sanitized };
  }

  if (!isValidEmail(sanitized)) {
    return { valid: false, error: 'Invalid email format', sanitized };
  }

  return { valid: true, sanitized };
};

/**
 * Validate phone field with sanitization
 */
export const validatePhone = (phone: string): {
  valid: boolean;
  error?: string;
  sanitized: string;
} => {
  const sanitized = phone.trim();

  if (!sanitized) {
    return { valid: false, error: 'Phone number is required', sanitized };
  }

  if (!isValidPhone(sanitized)) {
    return {
      valid: false,
      error: 'Invalid phone format (10-15 digits required)',
      sanitized,
    };
  }

  return { valid: true, sanitized };
};

/**
 * URL validation
 */
export const isValidURL = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * Safe number parsing with bounds checking
 */
export const parseNumber = (
  value: string | number,
  options: { min?: number; max?: number; integer?: boolean } = {}
): number | null => {
  const { min = -Infinity, max = Infinity, integer = false } = options;

  const num = typeof value === 'number' ? value : parseFloat(value);

  if (isNaN(num)) return null;
  if (num < min || num > max) return null;
  if (integer && !Number.isInteger(num)) return null;

  return num;
};

/**
 * Debounced validation for real-time input
 * Returns a debounced version of the validation function
 */
export const createDebouncedValidator = <T extends (...args: any[]) => any>(
  validator: T,
  delay: number = 300
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => validator(...args), delay);
  };
};
