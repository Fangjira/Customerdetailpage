/**
 * Contexts Barrel Export
 * Central export point for all React contexts
 * @module contexts
 */

// Auth context
export * from './auth-context';
export { AuthProvider, useAuth } from './auth-context';

// Role context
export * from './role-context';
export { RoleProvider, useRole } from './role-context';

// Theme context
export * from './theme-context';
export { ThemeProvider, useTheme } from './theme-context';

// Language context
export * from './language-context';
export { LanguageProvider, useLanguage } from './language-context';

// CRM context
export * from './CRMContext';
export { CRMProvider, useCRM } from './CRMContext';
