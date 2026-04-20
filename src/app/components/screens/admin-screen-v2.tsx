import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import {
  LayoutDashboard,
  Users,
  Building2,
  Settings,
  Shield,
  CheckCircle2,
  Search,
  Plus,
  Edit2,
  Trash2,
  GitBranch,
  FolderOpen,
  Link2,
  ChevronRight,
  Home,
  ChevronDown,
  ChevronUp,
  UserCircle,
  ShieldCheck,
  Database,
  Mail,
  Zap,
  Download,
  Upload,
  HardDrive,
  BarChart3,
  Wrench,
  Bell,
  Globe,
  Calendar,
  MapPin,
  DollarSign,
  Clock,
  FileText,
  Lock,
  Key,
  Activity,
  TrendingUp,
  AlertCircle,
  Eye,
  MoreHorizontal,
  Target,
  Award,
  Users2,
  Phone,
  UserCheck,
  ClipboardCheck,
  LineChart,
  PieChart,
  BarChart2,
  Server,
  Wifi,
  RefreshCw,
  Archive,
  FileCheck,
  Layers,
  Boxes,
  Filter,
  Table,
  Workflow,
  Smartphone,
  Code,
  Webhook,
  Network,
  History,
  UserCog,
  Building,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { useTranslation } from "react-i18next";

// Import existing screens
import { SystemSettingsTabV3 } from "./system-settings-tab-v3";
import { ApprovalWorkflowsTab } from "./approval-workflows-tab";
import { DataAccessControlTab } from "./data-access-control-tab";
import { AuditLogScreen } from "./audit-log-screen";
import { DocumentsScreen } from "./documents-screen";
import { IntegrationsScreen } from "./integrations-screen";

interface AdminScreenV2Props {
  currentPath?: string;
}

export function AdminScreenV2({ currentPath }: AdminScreenV2Props) {
  const { t } = useTranslation();
  const [selectedMenu, setSelectedMenu] = useState<string>("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [collapsedGroups, setCollapsedGroups] = useState<{ [key: string]: boolean }>({});

  // Menu configuration with groups - REDESIGNED FOR ADMIN CRM
  const menuConfig = {
    dashboard: {
      label: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      color: "text-red-600",
      bgColor: "bg-red-50",
      items: [
        {
          key: "dashboard",
          label: "System Overview",
          icon: <LayoutDashboard className="h-5 w-5" />,
          description: "System health & performance",
          badge: "Home",
        },
        {
          key: "alerts",
          label: "System Alerts",
          icon: <AlertCircle className="h-5 w-5" />,
          description: "Critical system notifications",
          count: 3,
        },
      ],
    },
    userManagement: {
      label: "User Management",
      icon: <Users className="h-5 w-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      items: [
        {
          key: "users",
          label: "All Users",
          icon: <Users className="h-5 w-5" />,
          description: "Manage user accounts",
          count: 42,
        },
        {
          key: "roles",
          label: "Roles & Permissions",
          icon: <ShieldCheck className="h-5 w-5" />,
          description: "Role-based access control",
          count: 8,
        },
        {
          key: "teams",
          label: "Teams",
          icon: <Users2 className="h-5 w-5" />,
          description: "Team management",
          count: 12,
        },
        {
          key: "departments",
          label: "Departments",
          icon: <Building className="h-5 w-5" />,
          description: "Department structure",
          count: 6,
        },
        {
          key: "user-activity",
          label: "User Activity",
          icon: <Activity className="h-5 w-5" />,
          description: "Monitor user actions",
          badge: "Live",
        },
      ],
    },
    organization: {
      label: "Organization",
      icon: <Building2 className="h-5 w-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      items: [
        {
          key: "company-profile",
          label: "Company Profile",
          icon: <Building2 className="h-5 w-5" />,
          description: "Company information",
        },
        {
          key: "business-units",
          label: "Business Units",
          icon: <Boxes className="h-5 w-5" />,
          description: "Business unit structure",
        },
        {
          key: "branches",
          label: "Branches/Locations",
          icon: <MapPin className="h-5 w-5" />,
          description: "Office & branch locations",
        },
        {
          key: "org-chart",
          label: "Organization Chart",
          icon: <Network className="h-5 w-5" />,
          description: "Visual org structure",
        },
      ],
    },
    salesManagement: {
      label: "Sales Management",
      icon: <Target className="h-5 w-5" />,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      items: [
        {
          key: "performance-dashboard",
          label: "Performance Dashboard",
          icon: <TrendingUp className="h-5 w-5" />,
          description: "Team & individual performance",
        },
        {
          key: "goals-targets",
          label: "Goals & Targets",
          icon: <Target className="h-5 w-5" />,
          description: "Set & track sales targets",
        },
        {
          key: "leaderboard",
          label: "Leaderboard",
          icon: <Award className="h-5 w-5" />,
          description: "Top performers ranking",
        },
        {
          key: "pipeline-management",
          label: "Pipeline Management",
          icon: <Layers className="h-5 w-5" />,
          description: "Manage sales pipeline stages",
        },
        {
          key: "activity-reports",
          label: "Activity Reports",
          icon: <ClipboardCheck className="h-5 w-5" />,
          description: "Sales activity tracking",
        },
      ],
    },
    masterData: {
      label: "Master Data",
      icon: <Database className="h-5 w-5" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
      items: [
        {
          key: "products-services",
          label: "Products/Services",
          icon: <Boxes className="h-5 w-5" />,
          description: "Product catalog",
        },
        {
          key: "customer-types",
          label: "Customer Types",
          icon: <UserCog className="h-5 w-5" />,
          description: "Customer categories",
        },
        {
          key: "lead-sources",
          label: "Lead Sources",
          icon: <Filter className="h-5 w-5" />,
          description: "Lead origin tracking",
        },
        {
          key: "pipeline-stages",
          label: "Pipeline Stages",
          icon: <Layers className="h-5 w-5" />,
          description: "Deal pipeline stages",
        },
        {
          key: "deal-categories",
          label: "Deal Categories",
          icon: <Table className="h-5 w-5" />,
          description: "Deal classification",
        },
        {
          key: "custom-fields",
          label: "Custom Fields",
          icon: <Wrench className="h-5 w-5" />,
          description: "Customize data fields",
        },
      ],
    },
    systemConfig: {
      label: "System Configuration",
      icon: <Settings className="h-5 w-5" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      items: [
        {
          key: "general-settings",
          label: "General Settings",
          icon: <Settings className="h-5 w-5" />,
          description: "System-wide settings",
        },
        {
          key: "email-settings",
          label: "Email Settings",
          icon: <Mail className="h-5 w-5" />,
          description: "Email configuration",
        },
        {
          key: "notification-settings",
          label: "Notification Settings",
          icon: <Bell className="h-5 w-5" />,
          description: "Notification preferences",
        },
        {
          key: "mobile-settings",
          label: "Mobile App Settings",
          icon: <Smartphone className="h-5 w-5" />,
          description: "Mobile configuration",
        },
        {
          key: "regional-settings",
          label: "Regional Settings",
          icon: <Globe className="h-5 w-5" />,
          description: "Language & timezone",
        },
      ],
    },
    templates: {
      label: "Templates",
      icon: <FileText className="h-5 w-5" />,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      items: [
        {
          key: "quotation-templates",
          label: "Quotation Templates",
          icon: <FileCheck className="h-5 w-5" />,
          description: "Quotation document templates",
          count: 4,
        },
        {
          key: "proposal-templates",
          label: "Proposal Templates",
          icon: <FileText className="h-5 w-5" />,
          description: "Proposal document templates",
          count: 4,
        },
        {
          key: "contract-templates",
          label: "Contract Templates",
          icon: <FileCheck className="h-5 w-5" />,
          description: "Contract document templates",
          count: 3,
        },
        {
          key: "email-templates",
          label: "Email Templates",
          icon: <Mail className="h-5 w-5" />,
          description: "Email template library",
          count: 12,
        },
      ],
    },
    automation: {
      label: "Workflows & Automation",
      icon: <Workflow className="h-5 w-5" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      items: [
        {
          key: "approval-workflows",
          label: "Approval Workflows",
          icon: <GitBranch className="h-5 w-5" />,
          description: "Approval processes",
        },
        {
          key: "automation-rules",
          label: "Automation Rules",
          icon: <Zap className="h-5 w-5" />,
          description: "Workflow automation",
        },
        {
          key: "email-automation",
          label: "Email Automation",
          icon: <Mail className="h-5 w-5" />,
          description: "Automated email campaigns",
        },
        {
          key: "triggers-actions",
          label: "Triggers & Actions",
          icon: <Workflow className="h-5 w-5" />,
          description: "Event-based automation",
        },
      ],
    },
    security: {
      label: "Security & Compliance",
      icon: <Shield className="h-5 w-5" />,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      items: [
        {
          key: "data-access",
          label: "Data Access Control",
          icon: <Shield className="h-5 w-5" />,
          description: "Access permissions",
        },
        {
          key: "security-policies",
          label: "Security Policies",
          icon: <Lock className="h-5 w-5" />,
          description: "Security configuration",
        },
        {
          key: "password-policies",
          label: "Password Policies",
          icon: <Key className="h-5 w-5" />,
          description: "Password requirements",
        },
        {
          key: "two-factor-auth",
          label: "Two-Factor Auth",
          icon: <ShieldCheck className="h-5 w-5" />,
          description: "2FA configuration",
        },
        {
          key: "session-management",
          label: "Session Management",
          icon: <Clock className="h-5 w-5" />,
          description: "User session control",
        },
      ],
    },
    reports: {
      label: "Reports & Analytics",
      icon: <BarChart3 className="h-5 w-5" />,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      items: [
        {
          key: "sales-reports",
          label: "Sales Reports",
          icon: <LineChart className="h-5 w-5" />,
          description: "Sales performance reports",
        },
        {
          key: "user-reports",
          label: "User Reports",
          icon: <Users className="h-5 w-5" />,
          description: "User activity reports",
        },
        {
          key: "system-reports",
          label: "System Reports",
          icon: <Server className="h-5 w-5" />,
          description: "System usage reports",
        },
        {
          key: "custom-reports",
          label: "Custom Reports",
          icon: <BarChart2 className="h-5 w-5" />,
          description: "Build custom reports",
        },
        {
          key: "export-center",
          label: "Export Center",
          icon: <Download className="h-5 w-5" />,
          description: "Export data & reports",
        },
      ],
    },
    dataManagement: {
      label: "Data Management",
      icon: <HardDrive className="h-5 w-5" />,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      items: [
        {
          key: "import-export",
          label: "Import/Export",
          icon: <Upload className="h-5 w-5" />,
          description: "Bulk data operations",
        },
        {
          key: "backup-restore",
          label: "Backup & Restore",
          icon: <HardDrive className="h-5 w-5" />,
          description: "Data backup management",
        },
        {
          key: "data-cleanup",
          label: "Data Cleanup",
          icon: <Trash2 className="h-5 w-5" />,
          description: "Clean duplicate data",
        },
        {
          key: "archive",
          label: "Archive Management",
          icon: <Archive className="h-5 w-5" />,
          description: "Archived data",
        },
        {
          key: "documents",
          label: "Document Library",
          icon: <FolderOpen className="h-5 w-5" />,
          description: "Document management",
        },
      ],
    },
    audit: {
      label: "Audit & Logs",
      icon: <Eye className="h-5 w-5" />,
      color: "text-slate-600",
      bgColor: "bg-slate-50",
      items: [
        {
          key: "audit-log",
          label: "Audit Log",
          icon: <FileText className="h-5 w-5" />,
          description: "System audit trail",
        },
        {
          key: "login-history",
          label: "Login History",
          icon: <History className="h-5 w-5" />,
          description: "User login tracking",
        },
        {
          key: "system-changes",
          label: "System Changes",
          icon: <RefreshCw className="h-5 w-5" />,
          description: "Configuration changes log",
        },
        {
          key: "data-changes",
          label: "Data Changes",
          icon: <Database className="h-5 w-5" />,
          description: "Data modification history",
        },
      ],
    },
    integrations: {
      label: "Integrations",
      icon: <Link2 className="h-5 w-5" />,
      color: "text-violet-600",
      bgColor: "bg-violet-50",
      items: [
        {
          key: "connected-apps",
          label: "Connected Apps",
          icon: <Wifi className="h-5 w-5" />,
          description: "Integrated applications",
          count: 5,
        },
        {
          key: "api-management",
          label: "API Management",
          icon: <Code className="h-5 w-5" />,
          description: "API keys & endpoints",
        },
        {
          key: "webhooks",
          label: "Webhooks",
          icon: <Webhook className="h-5 w-5" />,
          description: "Webhook configuration",
        },
        {
          key: "third-party",
          label: "Third-party Apps",
          icon: <Link2 className="h-5 w-5" />,
          description: "External integrations",
        },
      ],
    },
  };

  // Toggle group collapse
  const toggleGroup = (groupKey: string) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [groupKey]: !prev[groupKey],
    }));
  };

  // Filter menu items based on search
  const getFilteredMenuConfig = () => {
    if (!searchTerm) return menuConfig;

    const filtered: any = {};
    Object.entries(menuConfig).forEach(([groupKey, group]) => {
      const matchingItems = group.items.filter(
        (item) =>
          item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (matchingItems.length > 0) {
        filtered[groupKey] = {
          ...group,
          items: matchingItems,
        };
      }
    });

    return filtered;
  };

  const filteredMenuConfig = getFilteredMenuConfig();

  // Render content based on selected menu
  const renderContent = () => {
    switch (selectedMenu) {
      case "dashboard":
        return renderDashboard();
      case "alerts":
        return renderSystemAlerts();
      case "users":
        return renderUsersContent();
      case "roles":
        return renderRolesContent();
      case "teams":
        return renderTeamsContent();
      case "departments":
        return renderDepartmentsContent();
      case "user-activity":
        return renderUserActivity();
      case "company-profile":
        return renderCompanyProfile();
      case "business-units":
        return renderBusinessUnitsContent();
      case "branches":
        return renderBranches();
      case "org-chart":
        return renderOrgChart();
      case "performance-dashboard":
        return renderPerformanceDashboard();
      case "goals-targets":
        return renderGoalsTargets();
      case "leaderboard":
        return renderLeaderboard();
      case "pipeline-management":
        return renderPipelineManagement();
      case "activity-reports":
        return renderActivityReports();
      case "products-services":
        return renderProductsServices();
      case "customer-types":
        return renderCustomerTypes();
      case "lead-sources":
        return renderLeadSources();
      case "pipeline-stages":
        return renderPipelineStages();
      case "deal-categories":
        return renderDealCategories();
      case "custom-fields":
        return renderCustomFields();
      case "general-settings":
        return <SystemSettingsTabV3 />;
      case "email-settings":
        return renderEmailSettings();
      case "notification-settings":
        return renderNotificationSettings();
      case "mobile-settings":
        return renderMobileSettings();
      case "regional-settings":
        return renderRegionalSettings();
      case "quotation-templates":
        return renderQuotationTemplates();
      case "proposal-templates":
        return renderProposalTemplates();
      case "contract-templates":
        return renderContractTemplates();
      case "email-templates":
        return renderEmailTemplates();
      case "approval-workflows":
        return <ApprovalWorkflowsTab />;
      case "automation-rules":
        return renderAutomationRules();
      case "email-automation":
        return renderEmailAutomation();
      case "triggers-actions":
        return renderTriggersActions();
      case "data-access":
        return <DataAccessControlTab />;
      case "security-policies":
        return renderSecurityPolicies();
      case "password-policies":
        return renderPasswordPolicies();
      case "two-factor-auth":
        return renderTwoFactorAuth();
      case "session-management":
        return renderSessionManagement();
      case "sales-reports":
        return renderSalesReports();
      case "user-reports":
        return renderUserReports();
      case "system-reports":
        return renderSystemReports();
      case "custom-reports":
        return renderCustomReports();
      case "export-center":
        return renderExportCenter();
      case "import-export":
        return renderImportExport();
      case "backup-restore":
        return renderBackupRestore();
      case "data-cleanup":
        return renderDataCleanup();
      case "archive":
        return renderArchive();
      case "documents":
        return <DocumentsScreen />;
      case "audit-log":
        return <AuditLogScreen />;
      case "login-history":
        return renderLoginHistory();
      case "system-changes":
        return renderSystemChanges();
      case "data-changes":
        return renderDataChanges();
      case "connected-apps":
        return <IntegrationsScreen />;
      case "api-management":
        return renderApiManagement();
      case "webhooks":
        return renderWebhooks();
      case "third-party":
        return renderThirdParty();
      default:
        return renderPlaceholderContent();
    }
  };

  // Dashboard - System Overview
  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-50 to-white border-2 border-red-200 rounded-2xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">System Overview</h1>
            <p className="text-lg text-gray-600">Monitor your CRM system health & performance</p>
          </div>
          <div className="p-3 bg-red-100 rounded-xl">
            <Server className="h-8 w-8 text-red-600" />
          </div>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white border-2 border-gray-200 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">System Status</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xl font-bold text-green-600">Healthy</span>
            </div>
          </div>
          <div className="bg-white border-2 border-gray-200 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">Active Users</p>
            <p className="text-3xl font-bold text-gray-900">38</p>
            <Badge className="mt-2 bg-blue-100 text-blue-700">/ 42 total</Badge>
          </div>
          <div className="bg-white border-2 border-gray-200 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">Server Load</p>
            <p className="text-3xl font-bold text-emerald-600">42%</p>
            <Badge className="mt-2 bg-emerald-100 text-emerald-700">Normal</Badge>
          </div>
          <div className="bg-white border-2 border-gray-200 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">Storage Used</p>
            <p className="text-3xl font-bold text-gray-900">68GB</p>
            <Badge className="mt-2 bg-purple-100 text-purple-700">/ 500GB</Badge>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Activity */}
        <Card className="border-2 border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              Today's Activity
            </h3>
            <div className="space-y-3">
              {[
                { label: "New Deals Created", value: 24, icon: <Target className="h-5 w-5" />, color: "green" },
                { label: "Customers Added", value: 18, icon: <Users className="h-5 w-5" />, color: "blue" },
                { label: "Quotations Sent", value: 32, icon: <FileText className="h-5 w-5" />, color: "purple" },
                { label: "Deals Closed", value: 7, icon: <CheckCircle2 className="h-5 w-5" />, color: "emerald" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 bg-${stat.color}-100 rounded-lg`}>
                      <div className={`text-${stat.color}-600`}>{stat.icon}</div>
                    </div>
                    <span className="font-semibold text-gray-900">{stat.label}</span>
                  </div>
                  <span className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="border-2 border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Server className="h-5 w-5 text-green-500" />
              System Health
            </h3>
            <div className="space-y-4">
              {[
                { component: "Database", status: "Healthy", uptime: "99.9%", color: "green" },
                { component: "API Server", status: "Healthy", uptime: "99.8%", color: "green" },
                { component: "Email Service", status: "Healthy", uptime: "98.5%", color: "green" },
                { component: "Storage", status: "Normal", uptime: "100%", color: "blue" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full bg-${item.color}-100 flex items-center justify-center`}>
                      <Server className={`h-5 w-5 text-${item.color}-600`} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{item.component}</p>
                      <p className="text-sm text-gray-600">Uptime: {item.uptime}</p>
                    </div>
                  </div>
                  <Badge className={`bg-${item.color}-100 text-${item.color}-700`}>
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Log */}
      <Card className="border-2 border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Recent System Activity</h3>
            <Button variant="outline" size="sm">
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-3">
            {[
              { user: "Sarah Chen", action: "Updated customer record", time: "2 minutes ago", type: "edit" },
              { user: "Michael Wong", action: "Created new deal", time: "5 minutes ago", type: "create" },
              { user: "Emma Wilson", action: "Sent quotation", time: "12 minutes ago", type: "send" },
              { user: "Admin", action: "Updated system settings", time: "1 hour ago", type: "settings" },
              { user: "David Lee", action: "Closed deal #1248", time: "2 hours ago", type: "success" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                  {activity.user.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-bold text-gray-900">{activity.user}</span>
                    <span className="text-gray-600"> {activity.action}</span>
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <Badge variant="outline">{activity.type}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-2 border-red-200 bg-red-50">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button className="h-auto flex-col gap-2 py-4 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200">
              <Plus className="h-6 w-6" />
              Add User
            </Button>
            <Button className="h-auto flex-col gap-2 py-4 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200">
              <Download className="h-6 w-6" />
              Export Data
            </Button>
            <Button className="h-auto flex-col gap-2 py-4 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200">
              <HardDrive className="h-6 w-6" />
              Backup Now
            </Button>
            <Button className="h-auto flex-col gap-2 py-4 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200">
              <Eye className="h-6 w-6" />
              View Logs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // System Alerts
  const renderSystemAlerts = () => (
    <div className="space-y-6">
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">System Alerts</h2>
            <p className="text-gray-600">Critical system notifications & warnings</p>
          </div>
          <Badge className="bg-red-100 text-red-700 text-lg px-4 py-2">3 Active</Badge>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {[
            {
              level: "warning",
              title: "Storage Usage Warning",
              message: "Storage usage is at 85%. Consider upgrading or cleaning old data.",
              time: "2 hours ago",
            },
            {
              level: "info",
              title: "Backup Completed",
              message: "Daily backup completed successfully at 2:00 AM.",
              time: "4 hours ago",
            },
            {
              level: "warning",
              title: "License Renewal",
              message: "Your license will expire in 30 days. Please renew to avoid service interruption.",
              time: "1 day ago",
            },
          ].map((alert, i) => (
            <div
              key={i}
              className={`p-4 border-2 rounded-xl ${
                alert.level === "warning"
                  ? "border-orange-200 bg-orange-50"
                  : "border-blue-200 bg-blue-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <AlertCircle
                  className={`h-6 w-6 mt-0.5 ${
                    alert.level === "warning" ? "text-orange-600" : "text-blue-600"
                  }`}
                />
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 mb-1">{alert.title}</h4>
                  <p className="text-gray-700 mb-2">{alert.message}</p>
                  <p className="text-sm text-gray-500">{alert.time}</p>
                </div>
                <Button size="sm" variant="outline">
                  Dismiss
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Users Content
  const renderUsersContent = () => (
    <div className="space-y-6">
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
            <p className="text-gray-600">Manage all user accounts</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add New User
          </Button>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl text-center">
            <p className="text-sm text-gray-600 mb-1">Total Users</p>
            <p className="text-3xl font-bold text-blue-600">42</p>
          </div>
          <div className="p-4 bg-green-50 border-2 border-green-200 rounded-xl text-center">
            <p className="text-sm text-gray-600 mb-1">Active Now</p>
            <p className="text-3xl font-bold text-green-600">38</p>
          </div>
          <div className="p-4 bg-orange-50 border-2 border-orange-200 rounded-xl text-center">
            <p className="text-sm text-gray-600 mb-1">Inactive</p>
            <p className="text-3xl font-bold text-orange-600">4</p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input placeholder="Search users..." className="pl-10 h-12" />
          </div>
          <Button variant="outline" className="h-12">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Users Table */}
        <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">User</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Role</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Department</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Status</th>
                <th className="px-6 py-4 text-right text-sm font-bold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { name: "Sarah Chen", email: "sarah@company.com", role: "Sales Rep", dept: "Sales", status: "Active" },
                { name: "Michael Wong", email: "michael@company.com", role: "Sales Rep", dept: "Sales", status: "Active" },
                { name: "Emma Wilson", email: "emma@company.com", role: "Manager", dept: "Sales", status: "Active" },
                { name: "David Lee", email: "david@company.com", role: "Sales Rep", dept: "Sales", status: "Inactive" },
              ].map((user, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className="bg-purple-100 text-purple-700">{user.role}</Badge>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{user.dept}</td>
                  <td className="px-6 py-4 text-center">
                    <Badge className={user.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="outline">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Roles Content
  const renderRolesContent = () => (
    <div className="space-y-6">
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Roles & Permissions</h2>
            <p className="text-gray-600">Configure role-based access control</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create Role
          </Button>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "Admin", users: 2, color: "red", permissions: 28 },
            { name: "Manager", users: 5, color: "blue", permissions: 22 },
            { name: "Sales Rep", users: 35, color: "green", permissions: 15 },
            { name: "Guest", users: 0, color: "gray", permissions: 5 },
          ].map((role, i) => (
            <Card key={i} className="border-2 border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`h-12 w-12 rounded-xl bg-${role.color}-100 flex items-center justify-center mb-4`}>
                  <ShieldCheck className={`h-6 w-6 text-${role.color}-600`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{role.name}</h3>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">{role.users}</span> users
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">{role.permissions}</span> permissions
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit2 className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    <Eye className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  // Teams Content
  const renderTeamsContent = () => (
    <div className="space-y-6">
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Teams</h2>
            <p className="text-gray-600">Manage sales teams</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create Team
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "Storage Solutions", members: 12, leader: "Emma Wilson", target: "฿10M", color: "blue" },
            { name: "Logistics", members: 15, leader: "John Smith", target: "฿15M", color: "green" },
            { name: "Customs & Import/Export", members: 8, leader: "Lisa Zhang", target: "฿8M", color: "purple" },
          ].map((team, i) => (
            <Card key={i} className="border-2 border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`h-12 w-12 rounded-xl bg-${team.color}-100 flex items-center justify-center`}>
                    <Users2 className={`h-6 w-6 text-${team.color}-600`} />
                  </div>
                  <Button size="sm" variant="outline">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{team.name}</h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Team Lead: <span className="font-semibold text-gray-900">{team.leader}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Members: <span className="font-semibold text-gray-900">{team.members}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Target: <span className="font-semibold text-emerald-600">{team.target}</span>
                  </p>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  Manage Team
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  // Business Units Content
  const renderBusinessUnitsContent = () => (
    <div className="space-y-6">
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Business Units</h2>
            <p className="text-gray-600">Manage business unit structure</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Business Unit
          </Button>
        </div>

        <div className="space-y-4">
          {[
            { name: "Warehouse & Storage", head: "John Smith", employees: 25, revenue: "฿18.5M" },
            { name: "Transport & Logistics", head: "Emma Wilson", employees: 30, revenue: "฿15.2M" },
            { name: "Customs & Import/Export", head: "Lisa Zhang", employees: 15, revenue: "฿8.3M" },
          ].map((unit, i) => (
            <div key={i} className="p-6 border-2 border-gray-200 rounded-xl hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-xl bg-purple-100 flex items-center justify-center">
                    <Boxes className="h-7 w-7 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{unit.name}</h3>
                    <p className="text-sm text-gray-600">Head: {unit.head}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">Revenue (YTD)</p>
                  <p className="text-2xl font-bold text-emerald-600">{unit.revenue}</p>
                  <p className="text-sm text-gray-600">{unit.employees} employees</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Performance Dashboard (from previous implementation)
  const renderPerformanceDashboard = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-50 to-white border-2 border-emerald-200 rounded-2xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Performance Dashboard</h1>
            <p className="text-lg text-gray-600">Team & Individual Sales Performance</p>
          </div>
          <div className="p-3 bg-emerald-100 rounded-xl">
            <TrendingUp className="h-8 w-8 text-emerald-600" />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white border-2 border-gray-200 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-gray-900">฿45.2M</p>
            <Badge className="mt-2 bg-green-100 text-green-700">+12.5%</Badge>
          </div>
          <div className="bg-white border-2 border-gray-200 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">Deals Closed</p>
            <p className="text-3xl font-bold text-gray-900">148</p>
            <Badge className="mt-2 bg-blue-100 text-blue-700">+8 this week</Badge>
          </div>
          <div className="bg-white border-2 border-gray-200 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">Win Rate</p>
            <p className="text-3xl font-bold text-emerald-600">68%</p>
            <Badge className="mt-2 bg-emerald-100 text-emerald-700">+5%</Badge>
          </div>
          <div className="bg-white border-2 border-gray-200 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">Avg Deal Size</p>
            <p className="text-3xl font-bold text-gray-900">฿305K</p>
            <Badge className="mt-2 bg-purple-100 text-purple-700">+15%</Badge>
          </div>
        </div>
      </div>

      {/* Team Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <Card className="border-2 border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500" />
              Top Performers This Month
            </h3>
            <div className="space-y-3">
              {[
                { name: "Sarah Chen", revenue: "฿8.5M", deals: 32, winRate: 78, avatar: "SC", rank: 1, color: "yellow" },
                { name: "Michael Wong", revenue: "฿7.2M", deals: 28, winRate: 72, avatar: "MW", rank: 2, color: "gray" },
                { name: "Emma Wilson", revenue: "฿6.8M", deals: 25, winRate: 70, avatar: "EW", rank: 3, color: "orange" },
              ].map((rep, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-${rep.color}-100 text-${rep.color}-700 font-bold text-sm`}>
                    #{rep.rank}
                  </div>
                  <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                    {rep.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{rep.name}</p>
                    <p className="text-sm text-gray-600">{rep.deals} deals • {rep.winRate}% win rate</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-600">{rep.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Comparison */}
        <Card className="border-2 border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users2 className="h-5 w-5 text-blue-500" />
              Team Performance Comparison
            </h3>
            <div className="space-y-4">
              {[
                { team: "Storage Solutions", progress: 85, target: "฿10M", current: "฿8.5M", color: "blue" },
                { team: "Logistics", progress: 72, target: "฿15M", current: "฿10.8M", color: "green" },
                { team: "Customs & Import/Export", progress: 68, target: "฿8M", current: "฿5.4M", color: "purple" },
              ].map((team, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">{team.team}</span>
                    <span className="text-sm text-gray-600">{team.current} / {team.target}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-${team.color}-500`}
                        style={{ width: `${team.progress}%` }}
                      ></div>
                    </div>
                    <span className={`text-sm font-bold text-${team.color}-600`}>{team.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Goals & Targets (from previous implementation)
  const renderGoalsTargets = () => (
    <div className="space-y-6">
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Goals & Targets</h2>
            <p className="text-gray-600">Set and track sales targets</p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Set New Target
          </Button>
        </div>

        {/* Quarterly Targets */}
        <div className="space-y-4">
          <h3 className="font-bold text-gray-900">Q1 2025 Targets</h3>
          {[
            { name: "Sarah Chen", target: "฿3M", current: "฿2.8M", progress: 93, status: "On Track" },
            { name: "Michael Wong", target: "฿2.5M", current: "฿2.1M", progress: 84, status: "On Track" },
            { name: "Emma Wilson", target: "฿2M", current: "฿1.5M", progress: 75, status: "At Risk" },
          ].map((rep, i) => (
            <div key={i} className="p-4 border-2 border-gray-200 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                    {rep.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{rep.name}</p>
                    <p className="text-sm text-gray-600">{rep.current} / {rep.target}</p>
                  </div>
                </div>
                <Badge className={rep.progress >= 90 ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}>
                  {rep.status}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${rep.progress >= 90 ? "bg-green-500" : "bg-orange-500"}`}
                    style={{ width: `${rep.progress}%` }}
                  ></div>
                </div>
                <span className="text-sm font-bold text-gray-900">{rep.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Leaderboard (from previous implementation)
  const renderLeaderboard = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-yellow-50 to-white border-2 border-yellow-200 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-yellow-100 rounded-xl">
            <Award className="h-8 w-8 text-yellow-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Leaderboard</h2>
            <p className="text-gray-600">Top performers ranking</p>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="mt-6 border-2 border-gray-200 rounded-xl overflow-hidden bg-white">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Rank</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Sales Rep</th>
                <th className="px-6 py-4 text-right text-sm font-bold text-gray-900">Revenue</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Deals</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Win Rate</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { rank: 1, name: "Sarah Chen", revenue: "฿8.5M", deals: 32, winRate: 78, trend: "+2", color: "yellow" },
                { rank: 2, name: "Michael Wong", revenue: "฿7.2M", deals: 28, winRate: 72, trend: "+1", color: "gray" },
                { rank: 3, name: "Emma Wilson", revenue: "฿6.8M", deals: 25, winRate: 70, trend: "-1", color: "orange" },
                { rank: 4, name: "David Lee", revenue: "฿5.9M", deals: 22, winRate: 68, trend: "+3", color: "white" },
                { rank: 5, name: "Lisa Zhang", revenue: "฿5.2M", deals: 20, winRate: 65, trend: "0", color: "white" },
              ].map((rep, i) => (
                <tr key={i} className={`hover:bg-gray-50 ${i < 3 ? 'bg-' + rep.color + '-50/30' : ''}`}>
                  <td className="px-6 py-4">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-${rep.color}-100 border-2 border-${rep.color}-300 font-bold text-lg ${rep.rank <= 3 ? 'text-' + rep.color + '-700' : 'text-gray-700'}`}>
                      #{rep.rank}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                        {rep.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-semibold text-gray-900">{rep.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-bold text-emerald-600">{rep.revenue}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge className="bg-blue-100 text-blue-700">{rep.deals}</Badge>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge className="bg-purple-100 text-purple-700">{rep.winRate}%</Badge>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge className={rep.trend.startsWith('+') ? "bg-green-100 text-green-700" : rep.trend.startsWith('-') ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"}>
                      {rep.trend}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Activity Reports (from previous implementation)
  const renderActivityReports = () => (
    <div className="space-y-6">
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Activity Reports</h2>
            <p className="text-gray-600">Track sales activities and engagement</p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Activity Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Calls", value: "1,248", avg: "42/day", color: "blue" },
            { label: "Customer Visits", value: "342", avg: "11/day", color: "green" },
            { label: "Meetings", value: "186", avg: "6/day", color: "purple" },
            { label: "Follow-ups", value: "524", avg: "17/day", color: "orange" },
          ].map((stat, i) => (
            <Card key={i} className="border-2 border-gray-200">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.avg} average</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Activity by Rep */}
        <Card className="border-2 border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Activity by Sales Rep</h3>
            <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Sales Rep</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Calls</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Visits</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Meetings</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Follow-ups</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { name: "Sarah Chen", calls: 285, visits: 78, meetings: 42, followups: 124 },
                    { name: "Michael Wong", calls: 248, visits: 65, meetings: 38, followups: 98 },
                    { name: "Emma Wilson", calls: 212, visits: 52, meetings: 32, followups: 86 },
                    { name: "David Lee", calls: 195, visits: 48, meetings: 28, followups: 72 },
                  ].map((rep, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                            {rep.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="font-semibold text-gray-900">{rep.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Badge className="bg-blue-100 text-blue-700">{rep.calls}</Badge>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Badge className="bg-green-100 text-green-700">{rep.visits}</Badge>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Badge className="bg-purple-100 text-purple-700">{rep.meetings}</Badge>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Badge className="bg-orange-100 text-orange-700">{rep.followups}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Placeholder functions for other menu items
  const renderPlaceholderContent = () => (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-12 text-center">
      <div className="max-w-md mx-auto">
        <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Wrench className="h-10 w-10 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Under Development</h3>
        <p className="text-lg text-gray-600 mb-6">This section is currently being built and will be available soon.</p>
        <Button variant="outline">
          <Bell className="h-4 w-4 mr-2" />
          Notify Me When Ready
        </Button>
      </div>
    </div>
  );

  // Add all placeholder render functions
  const renderDepartmentsContent = renderPlaceholderContent;
  const renderUserActivity = renderPlaceholderContent;
  const renderCompanyProfile = renderPlaceholderContent;
  const renderBranches = renderPlaceholderContent;
  const renderOrgChart = renderPlaceholderContent;
  const renderPipelineManagement = renderPlaceholderContent;
  const renderProductsServices = renderPlaceholderContent;
  const renderCustomerTypes = renderPlaceholderContent;
  const renderLeadSources = renderPlaceholderContent;
  const renderPipelineStages = renderPlaceholderContent;
  const renderDealCategories = renderPlaceholderContent;
  const renderCustomFields = renderPlaceholderContent;
  const renderEmailSettings = renderPlaceholderContent;
  const renderNotificationSettings = renderPlaceholderContent;
  const renderMobileSettings = renderPlaceholderContent;
  const renderRegionalSettings = renderPlaceholderContent;
  const renderQuotationTemplates = renderPlaceholderContent;
  const renderProposalTemplates = renderPlaceholderContent;
  const renderContractTemplates = renderPlaceholderContent;
  const renderEmailTemplates = renderPlaceholderContent;
  const renderAutomationRules = renderPlaceholderContent;
  const renderEmailAutomation = renderPlaceholderContent;
  const renderTriggersActions = renderPlaceholderContent;
  const renderSecurityPolicies = renderPlaceholderContent;
  const renderPasswordPolicies = renderPlaceholderContent;
  const renderTwoFactorAuth = renderPlaceholderContent;
  const renderSessionManagement = renderPlaceholderContent;
  const renderSalesReports = renderPlaceholderContent;
  const renderUserReports = renderPlaceholderContent;
  const renderSystemReports = renderPlaceholderContent;
  const renderCustomReports = renderPlaceholderContent;
  const renderExportCenter = renderPlaceholderContent;
  const renderImportExport = renderPlaceholderContent;
  const renderBackupRestore = renderPlaceholderContent;
  const renderDataCleanup = renderPlaceholderContent;
  const renderArchive = renderPlaceholderContent;
  const renderLoginHistory = renderPlaceholderContent;
  const renderSystemChanges = renderPlaceholderContent;
  const renderDataChanges = renderPlaceholderContent;
  const renderApiManagement = renderPlaceholderContent;
  const renderWebhooks = renderPlaceholderContent;
  const renderThirdParty = renderPlaceholderContent;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r-2 border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b-2 border-gray-200 bg-gradient-to-r from-red-50 to-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 bg-red-600 rounded-xl flex items-center justify-center">
              <Shield className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
              <p className="text-sm text-gray-600">System Management</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search admin..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white border-2 border-gray-200"
            />
          </div>
        </div>

        {/* Menu Groups */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {Object.entries(filteredMenuConfig).map(([groupKey, group]) => (
            <div key={groupKey} className="mb-3">
              {/* Group Header */}
              <button
                onClick={() => toggleGroup(groupKey)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all hover:bg-gray-100 ${
                  collapsedGroups[groupKey] ? "bg-white" : group.bgColor
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={group.color}>{group.icon}</div>
                  <span className="font-bold text-gray-900 text-sm">{group.label}</span>
                </div>
                {collapsedGroups[groupKey] ? (
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                )}
              </button>

              {/* Group Items */}
              {!collapsedGroups[groupKey] && (
                <div className="mt-1 space-y-1 ml-2">
                  {group.items.map((item: any) => (
                    <button
                      key={item.key}
                      onClick={() => setSelectedMenu(item.key)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                        selectedMenu === item.key
                          ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <div className={selectedMenu === item.key ? "text-white" : "text-gray-600"}>
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm truncate">{item.label}</span>
                          {item.count && (
                            <Badge
                              className={
                                selectedMenu === item.key
                                  ? "bg-white text-red-600"
                                  : "bg-gray-200 text-gray-700"
                              }
                            >
                              {item.count}
                            </Badge>
                          )}
                          {item.badge && (
                            <Badge
                              className={
                                selectedMenu === item.key
                                  ? "bg-white text-red-600"
                                  : "bg-blue-100 text-blue-700"
                              }
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        {item.description && (
                          <p
                            className={`text-xs mt-0.5 truncate ${
                              selectedMenu === item.key ? "text-red-100" : "text-gray-500"
                            }`}
                          >
                            {item.description}
                          </p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t-2 border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3 p-3 bg-white border-2 border-gray-200 rounded-xl">
            <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
              <UserCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm truncate">System Admin</p>
              <p className="text-xs text-gray-600 truncate">admin@company.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">{renderContent()}</div>
      </div>
    </div>
  );
}
