/**
 * mini CRM Demo Screen
 * 
 * This is a complete demo of the new mini CRM design system with:
 * - Clean Enterprise SaaS UI
 * - Role-based coloring (Rep=Green, Manager=Blue, Admin=Red)
 * - Sidebar + Header layout
 * - Dashboard with metrics
 * - Inline editing support
 * - Mobile responsive
 */

import { useMemo, useState } from "react";
import { OneLinkMainLayout } from "../layout/onelink-main-layout";
import { OneLinkDashboard } from "./onelink-dashboard";
import { OneLinkDealsScreen } from "./onelink-deals-screen";

type Screen = "dashboard" | "deals" | "customers" | "reports";

interface OneLinkCRMDemoProps {
  initialScreen?: Screen;
}

export function OneLinkCRMDemo({ initialScreen = "dashboard" }: OneLinkCRMDemoProps) {
  const initialPathByScreen: Record<Screen, string> = {
    dashboard: "/dashboard",
    deals: "/deals",
    customers: "/customers",
    reports: "/reports",
  };
  const [currentPath, setCurrentPath] = useState(initialPathByScreen[initialScreen] || "/dashboard");

  const currentScreen = useMemo<Screen>(() => {
    if (currentPath.startsWith("/dashboard") || currentPath === "/") return "dashboard";
    if (currentPath.startsWith("/deals") || currentPath.startsWith("/deal-detail")) return "deals";
    if (currentPath.startsWith("/customers")) return "customers";
    if (currentPath.startsWith("/reports")) return "reports";
    return "dashboard";
  }, [currentPath]);

  const handleNavigate = (path: string, action?: string) => {
    console.log("Navigate to:", path, action);
    setCurrentPath(path);
  };

  const handleLogout = () => {
    console.log("Logout");
    // Add logout logic here
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "dashboard":
        return <OneLinkDashboard />;
      case "deals":
        return <OneLinkDealsScreen onNavigate={handleNavigate} />;
      case "customers":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">ลูกค้า</h1>
            <p className="text-muted-foreground">Customer Management - Coming Soon</p>
          </div>
        );
      case "reports":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">รายงาน</h1>
            <p className="text-muted-foreground">Reports & Analytics - Coming Soon</p>
          </div>
        );
      default:
        return <OneLinkDashboard />;
    }
  };

  return (
    <OneLinkMainLayout
      currentPath={currentPath}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
      userName="Tom Cook"
      userEmail="admin@onelink.com"
      isAdminPath={currentPath.startsWith("/admin")}
    >
      {renderScreen()}
    </OneLinkMainLayout>
  );
}
