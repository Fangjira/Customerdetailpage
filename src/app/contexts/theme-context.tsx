import { createContext, useContext, ReactNode, useMemo } from "react";
import { useRole, UserRole } from "./role-context";

// Define color palette for each role
export interface RoleTheme {
  // Primary colors
  primary: string;
  primaryLight: string;
  primaryDark: string;
  
  // Gradient colors
  gradientFrom: string;
  gradientTo: string;
  
  // Background colors
  bgLight: string;
  bgLighter: string;
  
  // Text colors
  textPrimary: string;
  textSecondary: string;
  
  // Border colors
  border: string;
  borderLight: string;
  
  // Icon colors
  icon: string;
  iconLight: string;
  
  // Badge/Tag colors
  badge: string;
  badgeText: string;
}

// Role-based color themes
const roleThemes: Record<UserRole, RoleTheme> = {
  "Admin": {
    primary: "#dc2626",           // red-600
    primaryLight: "#ef4444",      // red-500
    primaryDark: "#b91c1c",       // red-700
    gradientFrom: "#f87171",      // red-400
    gradientTo: "#dc2626",        // red-600
    bgLight: "#fef2f2",           // red-50
    bgLighter: "#fee2e2",         // red-100
    textPrimary: "#dc2626",       // red-600
    textSecondary: "#ef4444",     // red-500
    border: "#fecaca",            // red-200
    borderLight: "#fee2e2",       // red-100
    icon: "#dc2626",              // red-600
    iconLight: "#f87171",         // red-400
    badge: "#dc2626",             // red-600
    badgeText: "#ffffff",         // white
  },
  
  "Sales Manager": {
    primary: "#2563eb",           // blue-600
    primaryLight: "#3b82f6",      // blue-500
    primaryDark: "#1d4ed8",       // blue-700
    gradientFrom: "#60a5fa",      // blue-400
    gradientTo: "#2563eb",        // blue-600
    bgLight: "#eff6ff",           // blue-50
    bgLighter: "#dbeafe",         // blue-100
    textPrimary: "#2563eb",       // blue-600
    textSecondary: "#3b82f6",     // blue-500
    border: "#bfdbfe",            // blue-200
    borderLight: "#dbeafe",       // blue-100
    icon: "#2563eb",              // blue-600
    iconLight: "#60a5fa",         // blue-400
    badge: "#2563eb",             // blue-600
    badgeText: "#ffffff",         // white
  },
  
  "Sales Support": {
    primary: "#00BC7D",           // Custom green
    primaryLight: "#10d68f",      
    primaryDark: "#009966",       
    gradientFrom: "#4ade80",      // green-400
    gradientTo: "#00BC7D",        
    bgLight: "#f0fdf4",           // green-50
    bgLighter: "#dcfce7",         // green-100
    textPrimary: "#00BC7D",       
    textSecondary: "#22c55e",     // green-500
    border: "#bbf7d0",            // green-200
    borderLight: "#dcfce7",       // green-100
    icon: "#00BC7D",              
    iconLight: "#4ade80",         // green-400
    badge: "#00BC7D",             
    badgeText: "#ffffff",         // white
  }
};

interface ThemeContextType {
  theme: RoleTheme;
  role: UserRole;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { role } = useRole();
  
  const theme = useMemo(() => roleThemes[role], [role]);

  return (
    <ThemeContext.Provider value={{ theme, role }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// Utility function to get theme colors
export function getRoleTheme(role: UserRole): RoleTheme {
  return roleThemes[role];
}