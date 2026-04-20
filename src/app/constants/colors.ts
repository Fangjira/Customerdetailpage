/**
 * ONELINK CRM Color Constants
 * Role-based color system for consistent UI across the application
 * Updated to use GREEN theme for Sales Representative role
 */

export const COLORS = {
  // Primary Green Theme (Sales Rep Role)
  PRIMARY: {
    DEFAULT: '#16a34a',      // green-600
    LIGHT: '#22c55e',         // green-500
    LIGHTER: '#4ade80',       // green-400
    LIGHTEST: '#86efac',      // green-300
  },
  
  // Background Green Shades
  BG: {
    PRIMARY: '#f0fdf4',       // green-50
    SECONDARY: '#dcfce7',     // green-100
    TERTIARY: '#bbf7d0',      // green-200
  },
  
  // Text Green Shades
  TEXT: {
    PRIMARY: '#15803d',       // green-700
    SECONDARY: '#16a34a',     // green-600
    TERTIARY: '#22c55e',      // green-500
    MUTED: '#4ade80',         // green-400
  },
  
  // Border Green Shades
  BORDER: {
    DEFAULT: '#dcfce7',       // green-100
    LIGHT: '#f0fdf4',         // green-50
    MEDIUM: '#bbf7d0',        // green-200
    STRONG: '#86efac',        // green-300
  },
  
  // Gradient Combinations
  GRADIENT: {
    FROM: '#4ade80',          // green-400
    TO: '#16a34a',            // green-600
    HOVER_FROM: '#22c55e',    // green-500
    HOVER_TO: '#15803d',      // green-700
  },
  
  // Legacy purple colors mapping (for reference/migration)
  LEGACY_PURPLE_TO_GREEN: {
    '#705add': '#16a34a',     // green-600
    '#8b5cf6': '#22c55e',     // green-500
    '#a78bfa': '#4ade80',     // green-400
    '#c4b5fd': '#86efac',     // green-300
    '#ddd6fe': '#bbf7d0',     // green-200
    '#e9d5ff': '#dcfce7',     // green-100
    '#ede9fe': '#f0fdf4',     // green-50
    '#f3e8ff': '#f0fdf4',     // green-50
    '#f5f3ff': '#f0fdf4',     // green-50
    '#faf8ff': '#f0fdf4',     // green-50
    '#4c1d95': '#15803d',     // green-700
    '#5b21b6': '#16a34a',     // green-600
    '#6d28d9': '#15803d',     // green-700
    '#7c3aed': '#22c55e',     // green-500
    '#9333ea': '#4ade80',     // green-400
  },
  
  // Action Colors (unchanged)
  ACTION: {
    CREATE: '#16a34a',        // Green for create
    UPDATE: '#3b82f6',        // Blue for update/edit
    DELETE: '#ef4444',        // Red for delete
    SECONDARY: '#6b7280',     // Gray for secondary actions
  },
  
  // Status Colors (keep priority badges as requested)
  STATUS: {
    HIGH: {
      BG: '#fee2e2',
      TEXT: '#991b1b',
      BORDER: '#fecaca',
    },
    MEDIUM: {
      BG: '#fed7aa',
      TEXT: '#9a3412',
      BORDER: '#fdba74',
    },
    LOW: {
      BG: '#dbeafe',
      TEXT: '#1e40af',
      BORDER: '#bfdbfe',
    },
  },
} as const;

// Helper function to get gradient classes
export const getGradientClasses = (variant: 'default' | 'hover' = 'default') => {
  if (variant === 'hover') {
    return `bg-gradient-to-r from-[${COLORS.GRADIENT.HOVER_FROM}] to-[${COLORS.GRADIENT.HOVER_TO}]`;
  }
  return `bg-gradient-to-r from-[${COLORS.GRADIENT.FROM}] to-[${COLORS.GRADIENT.TO}]`;
};

// Helper function to convert purple to green (for migration)
export const convertPurpleToGreen = (color: string): string => {
  return COLORS.LEGACY_PURPLE_TO_GREEN[color as keyof typeof COLORS.LEGACY_PURPLE_TO_GREEN] || color;
};
