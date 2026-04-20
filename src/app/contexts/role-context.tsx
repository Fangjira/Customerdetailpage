import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = 
  | "Admin" 
  | "Sales Manager" 
  | "Sales Support";

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>(() => {
    // Load role from localStorage or default to 'Sales Support'
    const savedRole = localStorage.getItem("userRole");
    return (savedRole as UserRole) || "Sales Support";
  });

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    localStorage.setItem("userRole", newRole);
  };

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}