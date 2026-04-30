import { useRole, UserRole } from "../contexts/role-context";

export interface RoleTheme {
  primary: string;
  light: string;
  lighter: string;
  lightest: string;
  gradientFrom: string;
  gradientTo: string;
  textColor: string;
  borderColor: string;
}

export function useRoleTheme(): RoleTheme {
  const { role } = useRole();

  switch (role) {
    case "Admin":
      return {
        primary: "#dc2626",       // red-600
        light: "#ef4444",         // red-500
        lighter: "#fee2e2",       // red-100
        lightest: "#fef2f2",      // red-50
        gradientFrom: "#f87171",  // red-400
        gradientTo: "#dc2626",    // red-600
        textColor: "#dc2626",     // red-600
        borderColor: "rgba(220, 38, 38, 0.15)",
      };
    case "Sales Manager":
      return {
        primary: "#2563eb",       // blue-600
        light: "#3b82f6",         // blue-500
        lighter: "#dbeafe",       // blue-100
        lightest: "#eff6ff",      // blue-50
        gradientFrom: "#60a5fa",  // blue-400
        gradientTo: "#2563eb",    // blue-600
        textColor: "#2563eb",     // blue-600
        borderColor: "rgba(37, 99, 235, 0.15)",
      };
    case "Sales Representative":
      return {
        primary: "#00BC7D",       // Custom green
        light: "#10d68f",         
        lighter: "#dcfce7",       // green-100
        lightest: "#f0fdf4",      // green-50
        gradientFrom: "#4ade80",  // green-400
        gradientTo: "#00BC7D",    
        textColor: "#00BC7D",     
        borderColor: "rgba(0, 188, 125, 0.15)",
      };
    default:
      return {
        primary: "#00BC7D",       // green default (Sales Rep)
        light: "#10d68f",         
        lighter: "#dcfce7",       
        lightest: "#f0fdf4",      
        gradientFrom: "#4ade80",  
        gradientTo: "#00BC7D",    
        textColor: "#00BC7D",     
        borderColor: "rgba(0, 188, 125, 0.15)",
      };
  }
}

export function getRoleLabel(role: UserRole): string {
  switch (role) {
    case "Admin":
      return "Admin";
    case "Sales Manager":
      return "Sales Manager";
    case "Sales Representative":
      return "Sales Rep";
    default:
      return "User";
  }
}