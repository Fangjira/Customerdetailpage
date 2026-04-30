import {
  LayoutDashboard,
  BarChart3,
  ChartBar,
  Brain,
  ListTodo,
  Calendar,
  MapPin,
  MapPinCheck,
  Activity,
  Users,
  UserPlus,
  FileText,
  FilePlus,
  Sparkles,
  Handshake,
  Plus,
  FileSignature,
  CheckCircle2,
  Settings,
  Shield,
  GitBranch,
  FileStack,
  TrendingUp,
  Award,
  Workflow,
  Columns,
  History,
  Building2,
  Briefcase,
  User,
  FileCheck,
  ChevronDown,
  Layers,
  Package,
  Sliders,
  Tag,
  Lock,
  ListChecks,
  FolderKanban,
} from "lucide-react";
import { cn } from "./ui/utils";
import { useTranslation } from "react-i18next";
import { useRole, UserRole } from "../contexts/role-context";
import { useState, useEffect } from "react";
import { useRoleTheme, getRoleLabel } from "../hooks/use-role-theme";
import { useLanguage } from "../../contexts/language-context";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface NavItem {
  translationKey: string;
  iconType: string;
  href: string;
  active?: boolean;
  roles?: UserRole[];
  submenu?: NavItem[];
  action?: string;
}

interface SidebarNavProps {
  currentPath?: string;
  onNavigate?: (path: string, action?: string) => void;
}

const mainNavItems: NavItem[] = [
  {
    translationKey: "nav.tasks",
    iconType: "ListChecks",
    href: "/tasks",
    roles: ["Sales Support" , "Admin"],
  },
  {
    translationKey: "nav.reports_performance",
    iconType: "BarChart3",
    href: "/reports",
    roles: ["Sales Manager" , "Admin"],
    submenu: [
      {
        translationKey: "nav.reports_performance",
        iconType: "BarChart3",
        href: "/reports",
        roles: ["Sales Manager" , "Admin"],
      },
      {
        translationKey: "nav.team_performance",
        iconType: "Users",
        href: "/team-performance",
        roles: ["Sales Manager" , "Admin"],
      },
    ],
  },
  {
    translationKey: "nav.calendar",
    iconType: "Calendar",
    href: "/calendar",
    roles: ["Sales Support", "Sales Manager" , "Admin"],
    submenu: [
      {
        translationKey: "nav.calendar_activities",
        iconType: "MapPinCheck",
        href: "/calendar",
        roles: ["Sales Support", "Sales Manager" , "Admin"],
      },
      {
        translationKey: "nav.checkin_history",
        iconType: "MapPin",
        href: "/checkin-history",
        roles: ["Sales Support", "Sales Manager" , "Admin"],
      },
    ],
  },
  {
    translationKey: "nav.customers",
    iconType: "Building2",
    href: "/customers",
    roles: ["Sales Support", "Sales Manager" , "Admin" ],
    submenu: [
      {
        translationKey: "nav.leads_list",
        iconType: "Sparkles",
        href: "/leads",
        roles: ["Sales Support", "Sales Manager" , "Admin"],
      },
      {
        translationKey: "nav.customers_list",
        iconType: "Building2",
        href: "/customers",
        roles: ["Sales Support", "Sales Manager" , "Admin"],
      },
      {
        translationKey: "nav.my_customers",
        iconType: "User",
        href: "/customers/my",
        roles: ["Sales Support", "Sales Manager" , "Admin"],
      },
    ],
  },
  {
    translationKey: "nav.sales_management",
    iconType: "FolderKanban",
    href: "/sales-management",
    roles: ["Sales Support", "Sales Manager" , "Admin"],
    submenu: [
      {
        translationKey: "nav.overall",
        iconType: "FileStack",
        href: "/overall",
        roles: ["Sales Support", "Sales Manager" , "Admin"],
      },
      {
        translationKey: "nav.deals",
        iconType: "Briefcase",
        href: "/deals",
        roles: ["Sales Support", "Sales Manager" , "Admin"],
      },
      {
        translationKey: "nav.quotations",
        iconType: "FileText",
        href: "/quotations",
        roles: ["Sales Support", "Sales Manager" , "Admin"],
      },
      {
        translationKey: "nav.proposals_contracts",
        iconType: "FileCheck",
        href: "/proposals-contracts",
        roles: ["Sales Support", "Sales Manager" , "Admin"],
      },
    ],
  },
  {
    translationKey: "nav.approvals",
    iconType: "CheckCircle2",
    href: "/approvals",
    roles: ["Sales Support", "Sales Manager" , "Admin"],
  },
  // Admin-only menu items
  {
    translationKey: "nav.user_management",
    iconType: "Users",
    href: "/admin/users",
    roles: ["Admin"],
  },
  {
    translationKey: "nav.customer_ownership",
    iconType: "Shield",
    href: "/admin/ownership",
    roles: ["Admin"],
  },
  {
    translationKey: "nav.transfer_center",
    iconType: "GitBranch",
    href: "/admin/transfers",
    roles: ["Admin"],
  },
  {
    translationKey: "nav.audit_log",
    iconType: "History",
    href: "/admin/audit",
    roles: ["Admin"],
  },
  {
    translationKey: "nav.dashboard",
    iconType: "LayoutDashboard",
    href: "/dashboard",
    roles: ["Sales Support", "Sales Manager" , "Admin"],
    submenu: [
      {
        translationKey: "nav.dashboard_catalog",
        iconType: "Layers",
        href: "/dashboard",
        roles: ["Sales Support", "Sales Manager" , "Admin"],
      },
      {
        translationKey: "nav.customer_insights",
        iconType: "TrendingUp",
        href: "/customers/insights",
        roles: ["Sales Manager" , "Admin"],
      },
      {
        translationKey: "nav.customer_intelligence",
        iconType: "Brain",
        href: "/customers/insights-bel",
        roles: ["Sales Support", "Sales Manager" , "Admin"],
      },
    ],
  },
];

export function SidebarNav({ currentPath = "/tasks", onNavigate }: SidebarNavProps) {
  const { t, i18n } = useTranslation();
  const { role } = useRole();
  const roleTheme = useRoleTheme();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [openNestedSubmenu, setOpenNestedSubmenu] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoveredSubItem, setHoveredSubItem] = useState<string | null>(null);
  const [hoveredNestedItem, setHoveredNestedItem] = useState<string | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  
  // Debug: แสดง role ปัจจุบัน
  console.log('[SidebarNav] Current role:', role);
  console.log('[SidebarNav] Role theme:', roleTheme);
  console.log('[SidebarNav] Admin menus visible:', role === "Admin");
  
  // Filter and log menu items
  const visibleMenus = mainNavItems.filter(item => !item.roles || item.roles.includes(role));
  console.log('[SidebarNav] Visible menus count:', visibleMenus.length);
  console.log('[SidebarNav] Admin-only menus:', mainNavItems.filter(item => item.roles?.includes("Admin")).map(m => m.translationKey));
  
  useEffect(() => {
    if (currentPath?.startsWith('/quotations') || currentPath?.startsWith('/deals') || currentPath?.startsWith('/proposals-contracts') || currentPath?.startsWith('/overall')) {
      setOpenSubmenu('nav.sales_management');
    }
  }, [currentPath]);

  const handleNavClick = (href: string, action?: string) => {
    if (onNavigate) {
      const cleanHref = href.split('?')[0];
      onNavigate(cleanHref, action);
    }
  };

  const handleSettingsClick = () => {
    // Handle settings
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const renderNavIcon = (iconType: string, className: string) => {
    switch (iconType) {
      case "LayoutDashboard":
        return <LayoutDashboard className={className} />;
      case "ListChecks":
        return <ListTodo className={className} />;
      case "Calendar":
        return <Calendar className={className} />;
      case "Building2":
        return <Building2 className={className} />;
      case "Briefcase":
        return <Briefcase className={className} />;
      case "FileText":
        return <FileText className={className} />;
      case "Users":
        return <Users className={className} />;
      case "UserPlus":
        return <UserPlus className={className} />;
      case "CheckCircle2":
        return <CheckCircle2 className={className} />;
      case "ChartBar":
        return <ChartBar className={className} />;
      case "BarChart3":
        return <BarChart3 className={className} />;
      case "Settings":
        return <Settings className={className} />;
      case "MapPin":
        return <MapPin className={className} />;
      case "MapPinCheck":
        return <MapPinCheck className={className} />;
      case "Activity":
        return <Activity className={className} />;
      case "User":
        return <User className={className} />;
      case "Kanban":
        return <Layers className={className} />;
      case "Layers":
        return <Layers className={className} />;
      case "Brain":
        return <Brain className={className} />;
      case "Shield":
        return <Shield className={className} />;
      case "Plus":
        return <Plus className={className} />;
      case "GitBranch":
        return <GitBranch className={className} />;
      case "FileCheck":
        return <FileCheck className={className} />;
      case "Package":
        return <Package className={className} />;
      case "Sliders":
        return <Sliders className={className} />;
      case "Tag":
        return <Tag className={className} />;
      case "Lock":
        return <Lock className={className} />;
      case "TrendingUp":
        return <TrendingUp className={className} />;
      case "Sparkles":
        return <Sparkles className={className} />;
      case "Columns":
        return <Columns className={className} />;
      case "FileStack":
        return <FileStack className={className} />;
      case "FolderKanban":
        return <FolderKanban className={className} />;
      case "History":
        return <History className={className} />;
      default:
        return <LayoutDashboard className={className} />;
    }
  };

  const getButtonBackground = (isActive: boolean, isHovered: boolean) => {
    if (isActive) {
      return `linear-gradient(to right, ${roleTheme.gradientFrom}, ${roleTheme.gradientTo})`;
    }
    if (isHovered) {
      return roleTheme.lighter;
    }
    return roleTheme.lightest;
  };

  const getSubButtonBackground = (isActive: boolean, isHovered: boolean) => {
    if (isActive) {
      return `linear-gradient(to right, ${roleTheme.gradientFrom}, ${roleTheme.gradientTo})`;
    }
    if (isHovered) {
      return roleTheme.lighter;
    }
    return 'transparent';
  };

  return (
    <aside className="flex h-screen w-64 flex-col border-r-2 bg-white shadow-sm transition-colors duration-200" style={{ borderColor: roleTheme.borderColor }}>
      {/* Brand Section */}
      <div className="flex items-center gap-3 p-6 border-b-2" style={{ borderColor: roleTheme.borderColor }}>
        <div 
          className="h-12 w-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md"
          style={{
            background: `linear-gradient(to bottom right, ${roleTheme.gradientFrom}, ${roleTheme.gradientTo})`
          }}
        >
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xl text-[#1a1a2e] truncate font-bold tracking-tight">mini CRM</span>
          <span className="text-xs truncate font-medium" style={{ color: roleTheme.textColor }}>
            {getRoleLabel(role)}
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
        {mainNavItems.map((item) => {
          const isActive = item.href === currentPath || item.active;

          if (item.roles && !item.roles.includes(role)) {
            return null;
          }

          return (
            <div key={item.translationKey}>
              <button
                onClick={() => {
                  if (item.submenu) {
                    setOpenSubmenu(openSubmenu === item.translationKey ? null : item.translationKey);
                  } else {
                    handleNavClick(item.href, item.action);
                  }
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-[15px] transition-all duration-200 font-semibold",
                  isActive
                    ? "text-white shadow-md"
                    : "text-[#1a1a2e] hover:text-[#1a1a2e]"
                )}
                style={{
                  background: getButtonBackground(isActive, hoveredItem === item.translationKey)
                }}
                onMouseEnter={(e) => {
                  setHoveredItem(item.translationKey);
                }}
                onMouseLeave={(e) => {
                  setHoveredItem(null);
                }}
              >
                <span style={{ color: isActive ? 'white' : roleTheme.primary }}>
                  {renderNavIcon(
                    item.iconType,
                    "h-5 w-5 flex-shrink-0"
                  )}
                </span>
                <span className="truncate">{t(item.translationKey)}</span>
                {item.submenu && (
                  <ChevronDown
                    className="h-5 w-5 flex-shrink-0 ml-auto"
                    style={{ color: isActive ? 'white' : roleTheme.primary }}
                  />
                )}
              </button>
              {item.submenu && openSubmenu === item.translationKey && (
                <div className="pl-8 mt-1 space-y-1">
                  {item.submenu.map((subItem) => {
                    const isSubActive = subItem.href === currentPath || subItem.active;

                    if (subItem.roles && !subItem.roles.includes(role)) {
                      return null;
                    }

                    return (
                      <div key={subItem.translationKey}>
                        <button
                          onClick={() => {
                            if (subItem.submenu) {
                              setOpenNestedSubmenu(openNestedSubmenu === subItem.translationKey ? null : subItem.translationKey);
                            } else {
                              handleNavClick(subItem.href, subItem.action);
                            }
                          }}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-[14px] transition-all duration-200 font-semibold",
                            isSubActive
                              ? "text-white shadow-sm"
                              : "text-[#1a1a2e]"
                          )}
                          style={{
                            background: getSubButtonBackground(isSubActive, hoveredSubItem === subItem.translationKey)
                          }}
                          onMouseEnter={(e) => {
                            setHoveredSubItem(subItem.translationKey);
                          }}
                          onMouseLeave={(e) => {
                            setHoveredSubItem(null);
                          }}
                        >
                          <span style={{ color: isSubActive ? 'white' : roleTheme.primary }}>
                            {renderNavIcon(
                              subItem.iconType,
                              "h-4 w-4 flex-shrink-0"
                            )}
                          </span>
                          <span className="truncate">{t(subItem.translationKey)}</span>
                          {subItem.submenu && (
                            <ChevronDown
                              className="h-4 w-4 flex-shrink-0 ml-auto"
                              style={{ color: isSubActive ? 'white' : roleTheme.primary }}
                            />
                          )}
                        </button>
                        {subItem.submenu && openNestedSubmenu === subItem.translationKey && (
                          <div className="pl-6 mt-1 space-y-1">
                            {subItem.submenu.map((nestedItem) => {
                              const isNestedActive = nestedItem.href === currentPath || nestedItem.active;

                              if (nestedItem.roles && !nestedItem.roles.includes(role)) {
                                return null;
                              }

                              return (
                                <button
                                  key={nestedItem.translationKey}
                                  onClick={() => handleNavClick(nestedItem.href, nestedItem.action)}
                                  className={cn(
                                    "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs transition-all duration-200",
                                    isNestedActive
                                      ? "text-white shadow-sm"
                                      : "text-[#1a1a2e]"
                                  )}
                                  style={{
                                    background: getSubButtonBackground(isNestedActive, hoveredNestedItem === nestedItem.translationKey)
                                  }}
                                  onMouseEnter={(e) => {
                                    setHoveredNestedItem(nestedItem.translationKey);
                                  }}
                                  onMouseLeave={(e) => {
                                    setHoveredNestedItem(null);
                                  }}
                                >
                                  <span style={{ color: isNestedActive ? 'white' : roleTheme.primary }}>
                                    {renderNavIcon(
                                      nestedItem.iconType,
                                      "h-3.5 w-3.5 flex-shrink-0"
                                    )}
                                  </span>
                                  <span className="truncate">{t(nestedItem.translationKey)}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
      
      {/* User Profile Section */}
      <div 
        className="border-t-2 p-4"
        style={{ 
          borderColor: roleTheme.borderColor,
          backgroundColor: roleTheme.lightest 
        }}
      >
        
        
      </div>
    </aside>
  );
}