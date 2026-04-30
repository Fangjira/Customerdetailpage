import { useState, ReactNode } from "react";
import { useRole } from "../../contexts/role-context";
import { SidebarNav } from "../sidebar-nav";
// AdminSidebarNav removed - using unified SidebarNav with role-based menus
import { OneLinkHeader } from "./onelink-header";
import { cn } from "../ui/utils";

interface OneLinkMainLayoutProps {
  children: ReactNode;
  currentPath: string;
  onNavigate: (path: string, action?: string) => void;
  onLogout: () => void;
  userName?: string;
  userEmail?: string;
  isAdminPath?: boolean;
}

export function OneLinkMainLayout({
  children,
  currentPath,
  onNavigate,
  onLogout,
  userName = "Tom Cook",
  userEmail = "admin@onelink.com",
  isAdminPath = false,
}: OneLinkMainLayoutProps) {
  const { role } = useRole();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Role-based sidebar background colors
  const getRoleSidebarColor = () => {
    switch (role) {
      case "Sales Support":
        return "bg-white dark:bg-[#1e1b2e] border-r border-[#7BC9A6]/10";
      case "Sales Manager":
        return "bg-white dark:bg-[#1e1b2e] border-r border-blue-500/10";
      case "Admin":
        return "bg-white dark:bg-[#1e1b2e] border-r border-red-500/10";
      default:
        return "bg-white dark:bg-[#1e1b2e] border-r border-gray-200 dark:border-gray-800";
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar - Desktop */}
      <aside
        className={cn(
          "hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 z-50",
          getRoleSidebarColor()
        )}
      >
        {/* Logo Section */}
        <div className="flex items-center gap-3 h-16 px-6 border-b border-border/40">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7BC9A6] to-[#5FB88E] flex items-center justify-center">
            <span className="text-white font-bold text-lg">O</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">ONELINK</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
              CRM System
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto scrollbar-hide py-4">
          <SidebarNav currentPath={currentPath} onNavigate={onNavigate} />
        </div>

        {/* User Profile Section at Bottom */}
        <div className="p-4 border-t border-border/40">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
              {userName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{userName}</p>
              <p className="text-xs text-muted-foreground truncate">
                {role}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <aside
            className={cn(
              "fixed inset-y-0 left-0 w-64 z-50 lg:hidden flex flex-col",
              getRoleSidebarColor()
            )}
          >
            {/* Logo Section */}
            <div className="flex items-center gap-3 h-16 px-6 border-b border-border/40">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7BC9A6] to-[#5FB88E] flex items-center justify-center">
                <span className="text-white font-bold text-lg">O</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold tracking-tight">
                  ONELINK
                </h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  CRM System
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto scrollbar-hide py-4">
              <SidebarNav
                currentPath={currentPath}
                onNavigate={(path) => {
                  onNavigate(path);
                  setIsMobileSidebarOpen(false);
                }}
              />
            </div>

            {/* User Profile Section at Bottom */}
            <div className="p-4 border-t border-border/40">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  {userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{userName}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {role}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-64">
        {/* Header */}
        <OneLinkHeader
          onMenuClick={() => setIsMobileSidebarOpen(true)}
          onLogout={onLogout}
          userName={userName}
          userEmail={userEmail}
          notificationCount={3}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}