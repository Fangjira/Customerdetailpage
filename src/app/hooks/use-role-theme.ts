import { useRole, UserRole } from "../contexts/role-context";

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

  // Legacy compatibility
  light: string;
  lighter: string;
  lightest: string;
  textColor: string;
  borderColor: string;
  color: string;
}

export function useRoleTheme(): RoleTheme {
  const { role } = useRole();

  switch (role) {
    case "Admin":
      return {
        primary: "#dc2626",
        primaryLight: "#ef4444",
        primaryDark: "#b91c1c",
        gradientFrom: "#f87171",
        gradientTo: "#dc2626",
        bgLight: "#fef2f2",
        bgLighter: "#fee2e2",
        textPrimary: "#dc2626",
        textSecondary: "#ef4444",
        border: "#fecaca",
        borderLight: "#fee2e2",
        icon: "#dc2626",
        iconLight: "#f87171",
        badge: "#dc2626",
        badgeText: "#ffffff",
        // Legacy
        light: "#ef4444",
        lighter: "#fee2e2",
        lightest: "#fef2f2",
        textColor: "#dc2626",
        borderColor: "rgba(220, 38, 38, 0.15)",
        color: "#dc2626",
      };
    case "Sales Manager":
      return {
        primary: "#2563eb",
        primaryLight: "#3b82f6",
        primaryDark: "#1d4ed8",
        gradientFrom: "#60a5fa",
        gradientTo: "#2563eb",
        bgLight: "#eff6ff",
        bgLighter: "#dbeafe",
        textPrimary: "#2563eb",
        textSecondary: "#3b82f6",
        border: "#bfdbfe",
        borderLight: "#dbeafe",
        icon: "#2563eb",
        iconLight: "#60a5fa",
        badge: "#2563eb",
        badgeText: "#ffffff",
        // Legacy
        light: "#3b82f6",
        lighter: "#dbeafe",
        lightest: "#eff6ff",
        textColor: "#2563eb",
        borderColor: "rgba(37, 99, 235, 0.15)",
        color: "#2563eb",
      };
    case "Sales Support":
      return {
        primary: "#00BC7D",
        primaryLight: "#10d68f",
        primaryDark: "#009966",
        gradientFrom: "#4ade80",
        gradientTo: "#00BC7D",
        bgLight: "#f0fdf4",
        bgLighter: "#dcfce7",
        textPrimary: "#00BC7D",
        textSecondary: "#22c55e",
        border: "#bbf7d0",
        borderLight: "#dcfce7",
        icon: "#00BC7D",
        iconLight: "#4ade80",
        badge: "#00BC7D",
        badgeText: "#ffffff",
        // Legacy
        light: "#10d68f",
        lighter: "#dcfce7",
        lightest: "#f0fdf4",
        textColor: "#00BC7D",
        borderColor: "rgba(0, 188, 125, 0.15)",
        color: "#00BC7D",
      };
    default:
      return {
        primary: "#00BC7D",
        primaryLight: "#10d68f",
        primaryDark: "#009966",
        gradientFrom: "#4ade80",
        gradientTo: "#00BC7D",
        bgLight: "#f0fdf4",
        bgLighter: "#dcfce7",
        textPrimary: "#00BC7D",
        textSecondary: "#22c55e",
        border: "#bbf7d0",
        borderLight: "#dcfce7",
        icon: "#00BC7D",
        iconLight: "#4ade80",
        badge: "#00BC7D",
        badgeText: "#ffffff",
        // Legacy
        light: "#10d68f",
        lighter: "#dcfce7",
        lightest: "#f0fdf4",
        textColor: "#00BC7D",
        borderColor: "rgba(0, 188, 125, 0.15)",
        color: "#00BC7D",
      };
  }
}

export function getRoleLabel(role: UserRole): string {
  switch (role) {
    case "Admin":
      return "Admin";
    case "Sales Manager":
      return "Sales Manager";
    case "Sales Support":
      return "Sales Support";
    default:
      return "User";
  }
}