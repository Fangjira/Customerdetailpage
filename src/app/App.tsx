// v2.3.0 - AdminSidebarNav removed, using unified SidebarNav with role-based menus
import { useState, useEffect, useCallback } from "react";
import { APP_VERSION } from "./build-info";
// Core navigation components
import { SidebarNav } from "./components/sidebar-nav";
// AdminSidebarNav removed - using unified SidebarNav with role-based menus
import { LoginScreen } from "./components/login-screen";
import { TasksScreen } from "./components/screens/tasks-screen";
import { TaskDetailScreen } from "./components/screens/task-detail-screen";
import { ImprovedDashboardScreen } from "./components/screens/improved-dashboard-screen";
import { DashboardCatalogScreen } from "./components/screens/dashboard-catalog-screen";
// EnterpriseDashboardScreen was removed - using DashboardScreen instead
import { DealsListScreen } from "./components/screens/deals-list-screen";
import { DealDetailScreen } from "./components/screens/deal-detail-screen-v2";
import { CustomerListScreenV2 } from "./components/screens/customer-list-screen-v2";
import { CustomerDetailMobile } from "./components/screens/customer-detail-mobile";
import { CustomerDetailUltraSimple } from "./components/screens/customer-detail-ultra-simple";
import { CustomerDetailHCP } from "./components/screens/customer-detail-hcp";
import { CustomerDetailHCP as CustomerDetailHCPV2 } from "./components/screens/customer-detail-hcp";
import { MyCustomerDetailHCPV2 } from "./components/screens/my-customer-detail-hcp-v2";
import { DealDetailHCPV2 } from "./components/screens/deal-detail-hcp-v2";
import { CustomerInsightsScreen } from "./components/screens/customer-insights-screen";
import { CustomerInsightsBELScreen } from "./components/screens/customer-insights-bel-screen";
import { CustomerIntelligenceWrapper } from "./components/customer-intelligence-wrapper";
import { LeadListScreen } from "./components/screens/lead-list-screen";
import { LeadDetailScreenV2 } from "./components/screens/lead-detail-screen-v2";
import { QuotationListScreen } from "./components/screens/quotation-list-screen";
import { QuotationScreen } from "./components/screens/quotation-screen";
import { QuotationDetailScreen } from "./components/screens/quotation-detail-screen";
import { QuotationDetailMultiTemplateScreen } from "./components/screens/quotation-detail-multi-template-screen";
import { QuotationPreviewScreen } from "./components/screens/quotation-preview-screen";
import { QuotationPreviewMultiTemplate } from "./components/screens/quotation-preview-multi-template";
import { QuotationModuleDemo } from "./components/screens/quotation-module-demo";
import { QuotationBuilderScreen } from "./components/screens/quotation-builder-screen";
import { QuotationUploadDetailScreen } from "./components/screens/quotation-upload-detail-screen";
import { QuotationUploadedDetailScreen } from "./components/screens/quotation-uploaded-detail-screen";
import { ProposalsListScreen } from "./components/screens/proposals-list-screen";
import { ProposalEditorScreenV2 } from "./components/screens/proposal-editor-screen-v2";
import { ProposalBuilderScreen } from "./components/screens/proposal-builder-screen";
import { ProposalScreen } from "./components/screens/proposal-screen";
import { ProposalPreviewScreen } from "./components/screens/proposal-preview-screen";
import { ProposalsContractsScreen } from "./components/screens/proposals-contracts-screen";
import { DocumentGeneratorModal } from "./components/screens/document-generator-modal";
import { NDAPreviewScreen } from "./components/screens/nda-preview-screen";
import { NDAEditorScreenV2 } from "./components/screens/nda-editor-screen-v2";
import { NDADetailScreen } from "./components/screens/nda-detail-screen";
import { NDAGeneratorScreen } from "./components/screens/nda-generator-screen";
import { ApprovalsScreen } from "./components/screens/approvals-screen";
import { ApprovalScreen } from "./components/screens/approval-screen";
import { ContractsScreen } from "./components/screens/contracts-screen";
import { ContractScreen } from "./components/screens/contract-screen";
import { ContractEditorScreen } from "./components/screens/contract-editor-screen";
import { ContractPreviewScreen } from "./components/screens/contract-preview-screen";
import { OverAllScreen } from "./components/screens/overall-screen";
import { ReportsScreen } from "./components/screens/reports-screen";
import { CalendarScreen } from "./components/screens/calendar-screen";
import { CheckInHistoryScreen } from "./components/screens/checkin-history-screen";
import { VisitDetailScreen } from "./components/screens/visit-detail-screen";
import { ActivitiesScreen } from "./components/screens/activities-screen";
import { AdminScreenV2 as AdminScreen } from "./components/screens/admin-screen-v2";
// AdminDashboardScreen removed - using unified system with SidebarNav
import { EnterpriseAdminHub } from "./components/screens/enterprise-admin-hub";
import { UserManagementScreen } from "./components/screens/user-management-screen";
import { UserDetailScreen } from "./components/screens/user-detail-screen";
import { AdminRolesScreen } from "./components/screens/admin-roles-screen";
import { AdminDepartmentsScreen } from "./components/screens/admin-departments-screen";
import { AdminTeamsScreen } from "./components/screens/admin-teams-screen";
import { AdminBranchesScreen } from "./components/screens/admin-branches-screen";
import { AdminBusinessUnitsScreen } from "./components/screens/admin-business-units-screen";
import { AdminProductsScreen } from "./components/screens/admin-products-screen";
import { AdminCustomerTypesScreen } from "./components/screens/admin-customer-types-screen";
import { AdminLeadSourcesScreen } from "./components/screens/admin-lead-sources-screen";
import { AdminTemplatesScreen } from "./components/screens/admin-templates-screen";
// Admin UI Enhancement screens
import { AdminUserManagement } from "./components/screens/admin-user-management";
import { AdminTransferCenter } from "./components/screens/admin-transfer-center";
import { AdminAuditLog } from "./components/screens/admin-audit-log";
import { AdminCustomerOwnership } from "./components/screens/admin-customer-ownership";
import { AdminCustomFieldsScreen } from "./components/screens/admin-custom-fields-screen";
import { ApprovalWorkflowsTab } from "./components/screens/approval-workflows-tab";
import { DataAccessControlTab } from "./components/screens/data-access-control-tab";
import { SystemSettingsTabV3 as SystemSettingsTab } from "./components/screens/system-settings-tab-v3";
import { ProfileSettingsScreen } from "./components/screens/profile-settings-screen";
import { DocumentsScreen } from "./components/screens/documents-screen";
import { IntegrationsScreen } from "./components/screens/integrations-screen";
import { AuditLogScreen } from "./components/screens/audit-log-screen";
import { AdminOrganizationScreen } from "./components/screens/admin-organization-screen";
import { AdminMasterDataScreen } from "./components/screens/admin/admin-master-data-screen";
import { AdminQuotationTemplatesScreen } from "./components/screens/admin/admin-quotation-templates-screen";
import { AdminContractTemplatesScreen } from "./components/screens/admin/admin-contract-templates-screen";
import { AdminSecurityPolicyScreen } from "./components/screens/admin/admin-security-policy-screen";
import { AdminBusinessStructureScreen } from "./components/screens/admin/admin-business-structure-screen";
import { TransferLeadDemo } from "./components/screens/transfer-lead-demo";
import { KanbanView } from "./components/screens/kanban-view";
import { NotificationCenter } from "./components/notification-center";
import { GlobalSearch } from "./components/global-search";
import { QuickActionsMenu } from "./components/modals/quick-actions-menu";
import { QuickVisitModal } from "./components/modals/quick-visit-modal";
import { SalesManagerDashboard } from "./components/screens/sales-manager-dashboard";
import { TeamDealsScreen } from "./components/screens/team-deals-screen";
import { TeamActivitiesScreen } from "./components/screens/team-activities-screen";
import { TeamPerformanceScreen } from "./components/screens/team-performance-screen";
// mini CRM Clean UI Components
import { OneLinkCRMDemo } from "./components/screens/onelink-crm-demo";
import { OneLinkDashboard } from "./components/screens/onelink-dashboard";
import { OneLinkDealsScreen } from "./components/screens/onelink-deals-screen";
import { OneLinkWelcome } from "./components/screens/onelink-welcome";
import { TaskDetailDemo } from "./components/crm-tasks-module/task-detail-demo";
import { Button } from "./components/ui/button";
import { 
  LogOut, Search, Menu, Plus, Key, Settings, UserCircle, 
  RefreshCw, ChevronRight, ArrowLeft, Check, AlertCircle, 
  ToggleRight, ToggleLeft, Mail, Calendar, ExternalLink 
} from "lucide-react";
import { LanguageSwitcher } from "./components/language-switcher";
import { ThemeSwitcher } from "./components/theme-switcher";
import { RoleSwitcher } from "./components/role-switcher";
import { Toaster } from "sonner";
import { cn } from "./components/ui/utils";
import { RoleProvider, useRole } from "./contexts/role-context";
import { ThemeProvider, useTheme } from "./contexts/theme-context";
import { CRMProvider } from "../context/CRMContext";
import { LanguageProvider } from "../contexts/language-context";
import { AuthProvider, useAuth } from "./contexts/auth-context";
import { useTranslation } from "react-i18next";
import { useRoleTheme } from "./hooks/use-role-theme";
import { ErrorBoundary } from "./components/error-boundary";
import "../i18n/config";

// Debug: Module initialization  
console.log("[APP-INIT] Loading App.tsx v2.3.2", APP_VERSION, "with ErrorBoundary support");

function AppContent() {
  console.log("[AppContent] Component called");

  // Hooks must be called at the top level, outside try-catch
  const { t } = useTranslation();
  const { user, isAuthenticated, login, logout } = useAuth();

  console.log("[AppContent] Rendering - isAuthenticated:", isAuthenticated);

  // Core navigation state
  const [currentPath, setCurrentPath] = useState("/dashboard");
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  
  // Debug state initialization
  console.log("[APP-STATE] setSelectedLeadId defined:", typeof setSelectedLeadId === 'function');
  
  // User configuration
  const [userMode, setUserMode] = useState<'sales' | 'customer'>('sales');
  const [userRole, setUserRole] = useState('sales');
  const [userEmail, setUserEmail] = useState('sales@onelink.com');
  
  // Entity selections
  const [selectedDealId, setSelectedDealId] = useState<string | null>(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [selectedApprovalId, setSelectedApprovalId] = useState<string | null>(null);
  const [selectedContractId, setSelectedContractId] = useState<string | null>(null);
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);
  const [selectedVisitId, setSelectedVisitId] = useState<string | null>(null);
  const [selectedQuotationId, setSelectedQuotationId] = useState<string | null>(null);
  const [selectedQuotationTemplate, setSelectedQuotationTemplate] = useState<string>("international-freight");
  const [selectedProposalId, setSelectedProposalId] = useState<string | null>(null);
  const [selectedNDAId, setSelectedNDAId] = useState<string | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [shouldOpenActivityModal, setShouldOpenActivityModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showQuickActionsMenu, setShowQuickActionsMenu] = useState(false);
  const [showQuickVisitModal, setShowQuickVisitModal] = useState(false);
  const [visitPreviousPath, setVisitPreviousPath] = useState<string>("/customer-detail");
  const [proposalPreviousPath, setProposalPreviousPath] = useState<string>("/proposals-contracts");

  // Debug: Log lead state changes
  useEffect(() => {
    if (selectedLeadId) {
      console.log("[APP] Lead ID updated:", selectedLeadId);
    }
  }, [selectedLeadId]);

  // Lead navigation handler with useCallback (defined early for renderContent)
  const handleLeadClick = useCallback((leadId: string) => {
    console.log("[LEAD-CLICK] Navigating to lead:", leadId);
    setSelectedLeadId(leadId);
    setCurrentPath("/lead-detail");
  }, []);

  // Verify callback is created
  console.log("[APP-RENDER] Lead handler type:", typeof handleLeadClick);

  const handleLogin = (email: string, password: string, mode: "staff" | "customer") => {
    login(email, password, mode);
    const userModeValue = mode === "staff" ? "sales" : "customer";
    setUserMode(userModeValue);
    setUserEmail(email);
    // Set initial path based on mode
    setCurrentPath(mode === 'customer' ? '/customer-services' : '/dashboard');
  };

  const handleLogout = () => {
    logout();
    setUserMode('sales');
    setUserRole('sales');
    setUserEmail('');
    setCurrentPath("/tasks");
    setSelectedDealId(null);
    setSelectedCustomerId(null);
    setSelectedApprovalId(null);
    setSelectedContractId(null);
    setSelectedActivityId(null);
    setSelectedVisitId(null);
    setSelectedQuotationId(null);
    setSelectedProposalId(null);
    setSelectedNDAId(null);
    setSelectedTaskId(null);
  };

  // Keyboard shortcut for search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    console.log("[AppContent] Rendering LoginScreen");
    return <LoginScreen onLogin={handleLogin} />;
  }

  console.log("[AppContent] Rendering MainApp");
  
  // Otherwise show main app
  return (
    <MainApp
      userMode={userMode}
      userRole={userRole}
      userEmail={userEmail}
      currentPath={currentPath}
      setCurrentPath={setCurrentPath}
      selectedDealId={selectedDealId}
      setSelectedDealId={setSelectedDealId}
      selectedCustomerId={selectedCustomerId}
      setSelectedCustomerId={setSelectedCustomerId}
      selectedApprovalId={selectedApprovalId}
      setSelectedApprovalId={setSelectedApprovalId}
      selectedContractId={selectedContractId}
      setSelectedContractId={setSelectedContractId}
      selectedActivityId={selectedActivityId}
      setSelectedActivityId={setSelectedActivityId}
      selectedVisitId={selectedVisitId}
      setSelectedVisitId={setSelectedVisitId}
      selectedQuotationId={selectedQuotationId}
      setSelectedQuotationId={setSelectedQuotationId}
      selectedQuotationTemplate={selectedQuotationTemplate}
      setSelectedQuotationTemplate={setSelectedQuotationTemplate}
      selectedProposalId={selectedProposalId}
      setSelectedProposalId={setSelectedProposalId}
      selectedNDAId={selectedNDAId}
      setSelectedNDAId={setSelectedNDAId}
      selectedTaskId={selectedTaskId}
      setSelectedTaskId={setSelectedTaskId}
      selectedLeadId={selectedLeadId}
      setSelectedLeadId={setSelectedLeadId}
      handleLeadClick={handleLeadClick}
      isSearchOpen={isSearchOpen}
      setIsSearchOpen={setIsSearchOpen}
      handleLogout={handleLogout}
      shouldOpenActivityModal={shouldOpenActivityModal}
      setShouldOpenActivityModal={setShouldOpenActivityModal}
      selectedUserId={selectedUserId}
      setSelectedUserId={setSelectedUserId}
      isMobileSidebarOpen={isMobileSidebarOpen}
      setIsMobileSidebarOpen={setIsMobileSidebarOpen}
      showQuickActionsMenu={showQuickActionsMenu}
      setShowQuickActionsMenu={setShowQuickActionsMenu}
      showQuickVisitModal={showQuickVisitModal}
      setShowQuickVisitModal={setShowQuickVisitModal}
      visitPreviousPath={visitPreviousPath}
      setVisitPreviousPath={setVisitPreviousPath}
      proposalPreviousPath={proposalPreviousPath}
      setProposalPreviousPath={setProposalPreviousPath}
    />
  );
}

// ========================================================
// UserProfile Component (Advanced with Microsoft Sync View)
// ========================================================
function UserProfile({ email, onLogout }: { email?: string; onLogout?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeView, setActiveView] = useState('home'); 
  const [isMsConnected, setIsMsConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  
  const { role } = useRole();
  const roleTheme = useRoleTheme();

  // Get user initials from email
  const getInitials = (email: string = 'User') => {
    const name = email.split('@')[0];
    const parts = name.split(/[._-]/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const initials = getInitials(email);
  const userName = email ? email.split('@')[0] : 'User';

  const resetAndClose = () => {
    setIsOpen(false);
    setTimeout(() => setActiveView('home'), 200);
  };

  // ฟังก์ชันจำลองการเชื่อมต่อ Microsoft
  const handleConnectMS = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsMsConnected(true);
      setIsSyncing(false);
    }, 1500);
  };

  return (
    <div className="relative">
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-10 w-10 sm:h-11 sm:w-11 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 border-2 border-white overflow-hidden relative z-50"
        style={{ background: `linear-gradient(to bottom right, ${roleTheme.gradientFrom}, ${roleTheme.gradientTo})` }}
        aria-label="User Profile"
      >
        <span className="text-sm text-white font-bold">{initials}</span>
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-transparent" onClick={resetAndClose} />
          
          <div className="absolute right-0 mt-3 w-72 sm:w-85 bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in duration-200 origin-top-right">
            
            {/* View 1: Main Home Menu */}
            {activeView === 'home' && (
              <div className="animate-in slide-in-from-right-4 duration-300">
                <div className="p-6 flex flex-col items-center justify-center text-center bg-slate-50/50">
                  <div className="h-20 w-20 rounded-full flex items-center justify-center shadow-inner mb-3 border-4 border-white"
                    style={{ background: `linear-gradient(to bottom right, ${roleTheme.gradientFrom}22, ${roleTheme.gradientTo}22)` }}>
                    <div className="h-16 w-16 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg"
                      style={{ background: `linear-gradient(to bottom right, ${roleTheme.gradientFrom}, ${roleTheme.gradientTo})` }}>
                      {initials}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 leading-tight capitalize">{userName}</h3>
                  <p className="text-sm text-gray-500 font-medium mb-1">{email}</p>
                  <span className="px-2.5 py-0.5 rounded-full bg-gray-200/60 text-gray-600 text-xs font-semibold">
                    {role}
                  </span>
                </div>

                <div className="p-2 bg-white space-y-1">
                  <MenuButton 
                    icon={<Calendar size={18} className="text-blue-600" />} 
                    label="Microsoft Calendar" 
                    subLabel={isMsConnected ? "Connected and Syncing" : "Not connected"}
                    onClick={() => setActiveView('ms-sync')} 
                  />
                  <MenuButton icon={<Settings size={18} />} label="System Settings" onClick={() => setActiveView('home')} />
                  <div className="h-px bg-gray-100 my-1 mx-4" />
                  <button onClick={() => { resetAndClose(); onLogout?.(); }}
                    className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-red-50 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-gray-50 group-hover:bg-white shadow-sm transition-colors text-red-500"><LogOut size={18} /></div>
                      <p className="text-sm font-semibold text-red-600">Sign out</p>
                    </div>
                    <ChevronRight size={14} className="text-gray-300 group-hover:text-red-400" />
                  </button>
                </div>
              </div>
            )}

            {/* View 2: Microsoft Calendar Sync Settings */}
            {activeView === 'ms-sync' && (
              <SubViewHeader title="Microsoft Sync" onBack={() => setActiveView('home')}>
                <div className="p-4 space-y-4">
                  <div className={`p-4 rounded-2xl border transition-all ${isMsConnected ? 'bg-blue-50/50 border-blue-100' : 'bg-gray-50 border-gray-100'}`}>
                    <div className="flex items-start gap-3">
                      <div className={`p-2.5 rounded-xl ${isMsConnected ? 'bg-white text-blue-600 shadow-sm' : 'bg-gray-200 text-gray-400'}`}>
                        <Calendar size={20} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-800">
                          {isMsConnected ? 'Account Connected' : 'Outlook / Office 365'}
                        </h4>
                        <p className="text-[11px] text-gray-500 font-medium">
                          {isMsConnected ? email : 'Connect to sync your events'}
                        </p>
                      </div>
                      {isMsConnected ? (
                        <div className="bg-green-500 p-1 rounded-full"><Check size={10} className="text-white" /></div>
                      ) : (
                        <AlertCircle size={16} className="text-gray-300" />
                      )}
                    </div>
                  </div>

                  {isMsConnected ? (
                    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <div className="px-1">
                        <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Sync Options</h5>
                        <div className="space-y-2">
                          <ToggleItem label="Two-way Sync" description="Changes update both systems" active={true} />
                          <ToggleItem label="Auto-sync" description="Sync every 15 minutes" active={true} />
                        </div>
                      </div>
                      <div className="pt-4 border-t border-gray-50">
                        <button 
                          disabled={isSyncing}
                          className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white rounded-2xl text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95"
                        >
                          <RefreshCw size={14} className={isSyncing ? 'animate-spin' : ''} />
                          {isSyncing ? 'Syncing...' : 'Force Sync Now'}
                        </button>
                        <button onClick={() => setIsMsConnected(false)} className="w-full mt-2 py-2 text-[11px] font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                          Disconnect Account
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-6 text-center space-y-4">
                      <div className="flex justify-center"><Mail size={40} className="text-gray-200" /></div>
                      <p className="text-xs text-gray-500 px-6 font-medium">
                        Sync your Microsoft Outlook or Office 365 calendar events with our internal system automatically.
                      </p>
                      <button 
                        onClick={handleConnectMS}
                        disabled={isSyncing}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-2xl text-xs font-bold hover:bg-black transition-all active:scale-95"
                      >
                        {isSyncing ? <RefreshCw size={14} className="animate-spin" /> : <ExternalLink size={14} />}
                        Connect Microsoft Account
                      </button>
                    </div>
                  )}
                </div>
              </SubViewHeader>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// Support components for UserProfile
function SubViewHeader({ title, onBack, children }: any) {
  return (
    <div className="animate-in slide-in-from-left-4 duration-300">
      <div className="flex items-center gap-3 p-4 border-b border-gray-100">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-500">
          <ArrowLeft size={18} />
        </button>
        <h3 className="font-bold text-gray-800 text-sm">{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  );
}

function ToggleItem({ label, description, active }: any) {
  return (
    <div className="flex items-center justify-between p-2">
      <div>
        <p className="text-xs font-bold text-gray-700 leading-tight">{label}</p>
        <p className="text-[10px] text-gray-400 font-medium">{description}</p>
      </div>
      <button className={`transition-colors ${active ? 'text-blue-500' : 'text-gray-300'}`}>
        {active ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
      </button>
    </div>
  );
}

function MenuButton({ icon, label, subLabel, onClick }: any) {
  return (
    <button onClick={onClick} className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition-colors group">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-gray-50 group-hover:bg-white shadow-sm transition-colors text-gray-600">{icon}</div>
        <div className="text-left">
          <p className="text-sm font-semibold text-gray-700">{label}</p>
          {subLabel && <p className="text-[10px] text-gray-400 font-medium leading-none">{subLabel}</p>}
        </div>
      </div>
      <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-500 transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}

// =========================================
// MainApp Component
// =========================================
function MainApp({
  userMode,
  userRole,
  userEmail,
  currentPath,
  setCurrentPath,
  selectedDealId,
  setSelectedDealId,
  selectedCustomerId,
  setSelectedCustomerId,
  selectedApprovalId,
  setSelectedApprovalId,
  selectedContractId,
  setSelectedContractId,
  selectedActivityId,
  setSelectedActivityId,
  selectedVisitId,
  setSelectedVisitId,
  selectedQuotationId,
  setSelectedQuotationId,
  selectedQuotationTemplate,
  setSelectedQuotationTemplate,
  selectedProposalId,
  setSelectedProposalId,
  selectedNDAId,
  setSelectedNDAId,
  selectedTaskId,
  setSelectedTaskId,
  selectedLeadId,
  setSelectedLeadId,
  handleLeadClick,
  isSearchOpen,
  setIsSearchOpen,
  handleLogout,
  shouldOpenActivityModal,
  setShouldOpenActivityModal,
  selectedUserId,
  setSelectedUserId,
  isMobileSidebarOpen,
  setIsMobileSidebarOpen,
  showQuickActionsMenu,
  setShowQuickActionsMenu,
  showQuickVisitModal,
  setShowQuickVisitModal,
  visitPreviousPath,
  setVisitPreviousPath,
  proposalPreviousPath,
  setProposalPreviousPath,
}: any) {
  console.log("[MainApp] Rendering - currentPath:", currentPath);
  
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { role } = useRole();
  const roleTheme = useRoleTheme();

  // Auto-redirect Sales Manager to Reports page
  useEffect(() => {
    if (role === "Sales Manager" && currentPath === "/tasks") {
      setCurrentPath("/reports");
    }
  }, [role, currentPath, setCurrentPath]);

  // FAB dragging state
  const [fabPosition, setFabPosition] = useState(() => {
    const saved = localStorage.getItem('fab-position');
    return saved ? JSON.parse(saved) : { bottom: 24, right: 24 };
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);

  // Save FAB position to localStorage
  useEffect(() => {
    localStorage.setItem('fab-position', JSON.stringify(fabPosition));
  }, [fabPosition]);

  // Handle FAB drag
  const handleFabDragStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setHasMoved(false);
    setDragStart({ x: clientX, y: clientY });
  };

  const handleFabDragMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    
    const dx = clientX - dragStart.x;
    const dy = dragStart.y - clientY;
    
    // Mark as moved if dragged more than 5px
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      setHasMoved(true);
    }
    
    if (hasMoved) {
      setFabPosition(prev => {
        const newBottom = Math.max(16, Math.min(window.innerHeight - 70, prev.bottom + dy));
        const newRight = Math.max(16, Math.min(window.innerWidth - 70, prev.right - dx));
        return { bottom: newBottom, right: newRight };
      });
      
      setDragStart({ x: clientX, y: clientY });
    }
  };

  const handleFabDragEnd = () => {
    if (isDragging && hasMoved) {
      // Snap to nearest edge (left or right)
      setFabPosition(prev => {
        const screenWidth = window.innerWidth;
        const buttonCenterX = screenWidth - prev.right - 28;
        const snapToRight = buttonCenterX > screenWidth / 2;
        
        return {
          bottom: prev.bottom,
          right: snapToRight ? 24 : screenWidth - 80,
        };
      });
    }
    setIsDragging(false);
    setHasMoved(false);
  };

  const handleNavigation = (path: string, action?: string) => {
    console.log("handleNavigation called with:", { path, action });
    
    // Handle proposal navigation with ID
    if (path === "/proposal-preview" && action) {
      setSelectedProposalId(action); // action is actually the ID here
      setCurrentPath("/proposal-preview");
      return;
    }
    
    if (path === "/proposal-detail" && action) {
      setSelectedProposalId(action); // action is actually the ID here
      setCurrentPath("/proposal-detail");
      return;
    }
    
    if (path === "/proposal-editor" && action) {
      setSelectedProposalId(action); // action is actually the ID here
      setCurrentPath("/proposal-editor");
      return;
    }
    
    // 🔷 NEW: Handle proposal-editor-v2 navigation with ID
    if (path === "/proposal-editor-v2" && action) {
      setSelectedProposalId(action); // action is actually the ID here
      setCurrentPath("/proposal-editor-v2");
      return;
    }
    
    // Handle contract navigation with ID
    if (path === "/contract-editor" && action) {
      setSelectedContractId(action); // action is actually the ID here
      setCurrentPath("/contract-editor");
      return;
    }
    
    if (path === "/contract-preview" && action) {
      setSelectedContractId(action); // action is actually the ID here
      setCurrentPath("/contract-preview");
      return;
    }
    
    // Handle special actions
    if (action === "add" && path.includes("/calendar")) {
      setCurrentPath("/calendar");
      setShouldOpenActivityModal(true);
      return;
    }
    
    // Handle create task action
    if (action === "create" && path.includes("/tasks")) {
      setCurrentPath("/tasks");
      setShouldOpenActivityModal(true);
      return;
    }
    
    // Handle add lead action
    if (action === "add" && path.includes("/leads")) {
      setCurrentPath("/leads");
      setShouldOpenActivityModal(true); // Reuse this state for leads modal
      return;
    }
    
    // Handle /leads/add path directly
    if (path === "/leads/add") {
      setCurrentPath("/leads");
      setShouldOpenActivityModal(true);
      return;
    }
    
    // Handle add customer action
    if (action === "add" && path.includes("/customers")) {
      setCurrentPath("/customers");
      setShouldOpenActivityModal(true); // Reuse this state for customers modal
      return;
    }
    
    // Handle /customers/add path directly
    if (path === "/customers/add") {
      setCurrentPath("/customers");
      setShouldOpenActivityModal(true);
      return;
    }
    
    // Handle add deal action
    if (action === "add" && path.includes("/deals")) {
      setCurrentPath("/deals");
      setShouldOpenActivityModal(true); // Reuse this state for deals modal
      return;
    }
    
    // Handle /deals/create path directly
    if (path === "/deals/create") {
      setCurrentPath("/deals");
      setShouldOpenActivityModal(true);
      return;
    }
    
    // Handle add quotation action
    if (action === "add" && path.includes("/quotations")) {
      console.log("Setting quotations path with add action");
      setCurrentPath("/quotations?action=add");
      setShouldOpenActivityModal(true); // Reuse this state for quotations modal
      return;
    }
    
    // Handle add-activity from quotations menu
    if (action === "add-activity" && path.includes("/quotations")) {
      console.log("Setting quotations path with add-activity action");
      setCurrentPath("/quotations?action=add-activity");
      setShouldOpenActivityModal(true); // Will trigger quotation-specific activity modal
      return;
    }
    
    // Handle add contract action
    if (action === "add" && path.includes("/contracts")) {
      console.log("Setting contracts path with add action");
      setCurrentPath("/contracts?action=add");
      setShouldOpenActivityModal(true); // Reuse this state for contracts modal
      return;
    }
    
    // Handle admin tab switching
    if (action?.startsWith("tab-") && path.includes("/admin")) {
      const tabName = action.replace("tab-", "");
      console.log("Setting admin path with tab:", tabName);
      setCurrentPath(`/admin?tab=${tabName}`);
      return;
    }
    
    // When navigating back to proposals-contracts, preserve selectedContractId
    if (path === "/proposals-contracts") {
      setCurrentPath(path);
      setSelectedDealId(null);
      setSelectedCustomerId(null);
      setSelectedApprovalId(null);
      // Don't reset selectedContractId here - keep it for the contracts list
      setSelectedActivityId(null);
      setSelectedVisitId(null);
      setSelectedQuotationId(null);
      setSelectedProposalId(null);
      setSelectedNDAId(null);
      setSelectedTaskId(null);
      setShouldOpenActivityModal(false);
      return;
    }
    
    setCurrentPath(path);
    setSelectedDealId(null);
    setSelectedCustomerId(null);
    setSelectedApprovalId(null);
    setSelectedContractId(null);
    setSelectedActivityId(null);
    setSelectedVisitId(null);
    setSelectedQuotationId(null);
    setSelectedProposalId(null);
    setSelectedNDAId(null);
    setSelectedTaskId(null);
    setShouldOpenActivityModal(false);
  };

  const handleNavigationWithActivity = (path: string, activityId: string) => {
    setCurrentPath(path);
    setSelectedActivityId(activityId);
    setSelectedDealId(null);
    setSelectedCustomerId(null);
    setSelectedApprovalId(null);
    setSelectedContractId(null);
    setSelectedVisitId(null);
    setSelectedQuotationId(null);
    setSelectedProposalId(null);
    setSelectedNDAId(null);
    setSelectedTaskId(null);
  };

  const handleDealClick = (dealId: string) => {
    setSelectedDealId(dealId);
    setCurrentPath("/deal-detail");
  };

  const handleBackFromDeal = () => {
    setSelectedDealId(null);
    setCurrentPath("/deals");
  };

  // Handle customer click navigation
  const handleCustomerClick = useCallback((customerId: string) => {
    setSelectedCustomerId(customerId);
    setCurrentPath("/customer-detail");
  }, [setSelectedCustomerId, setCurrentPath]);

  const handleBackFromCustomer = () => {
    setSelectedCustomerId(null);
    setCurrentPath("/customers");
  };

  const handleMyCustomerClick = (customerId: string) => {
    setSelectedCustomerId(customerId);
    setCurrentPath("/my-customer-detail");
  };

  const handleBackFromMyCustomer = () => {
    setSelectedCustomerId(null);
    setCurrentPath("/customers/my");
  };

  const handleApprovalClick = (approvalId: string) => {
    setSelectedApprovalId(approvalId);
    setCurrentPath("/approval-detail");
  };

  const handleBackFromApproval = () => {
    setSelectedApprovalId(null);
    setCurrentPath("/approvals");
  };

  const handleContractClick = (contractId: string) => {
    setSelectedContractId(contractId);
    setCurrentPath("/contract-detail");
  };

  const handleContractPreview = (contractId: string) => {
    setSelectedContractId(contractId);
    setCurrentPath("/contract-preview");
  };

  const handleBackFromContract = () => {
    setSelectedContractId(null);
    setCurrentPath("/overall");
  };

  const handleBackFromContractPreview = () => {
    // Don't reset selectedContractId, just navigate back to editor
    setCurrentPath("/contract-editor");
  };

  const handleQuotationClick = (quotationId: string) => {
    setSelectedQuotationId(quotationId);
    // Check quotation type and navigate to appropriate screen
    // For now, check if it's QT-2024-008 (uploaded type)
    if (quotationId === "QT-2024-008") {
      setCurrentPath("/quotation-upload-detail");
    } else {
      setCurrentPath("/quotation-detail");
    }
  };

  const handleViewQuotationUploadDetail = (quotationId: string) => {
    setSelectedQuotationId(quotationId);
    setCurrentPath("/quotation-upload-detail");
  };

  const handleQuotationPreview = (quotationId: string, templateType?: string) => {
    console.log("handleQuotationPreview called with:", { quotationId, templateType });
    setSelectedQuotationId(quotationId);
    if (templateType) {
      console.log("Setting templateType to:", templateType);
      setSelectedQuotationTemplate(templateType);
    } else {
      console.log("No templateType provided, using default:", selectedQuotationTemplate);
    }
    setCurrentPath("/quotation-preview");
  };

  const handleBackFromQuotation = () => {
    setSelectedQuotationId(null);
    setCurrentPath("/quotations");
  };

  const handleBackFromQuotationPreview = () => {
    setSelectedQuotationId(null);
    setCurrentPath("/quotations");  // กลับไปหน้ารายการทั้งหมด
  };

  const handleProposalClick = (proposalId: string) => {
    setSelectedProposalId(proposalId);
    // Save the current path so we can return to it later
    setProposalPreviousPath(currentPath);
    setCurrentPath("/proposal-detail");
  };

  const handleBackFromProposal = () => {
    setSelectedProposalId(null);
    const pathToReturn = proposalPreviousPath;
    // Reset to default after using
    setProposalPreviousPath("/proposals-contracts");
    setCurrentPath(pathToReturn);
  };

  const handleNDAClick = (ndaId: string) => {
    setSelectedNDAId(ndaId);
    setCurrentPath("/nda-preview");
  };

  const handleBackFromNDA = () => {
    setSelectedNDAId(null);
    setCurrentPath("/proposals-contracts");
  };

  const handleTaskClick = (taskId: string) => {
    setSelectedTaskId(taskId);
    setCurrentPath("/task-detail");
  };

  const handleBackFromTask = () => {
    setSelectedTaskId(null);
    setCurrentPath("/tasks");
  };

  const handleUserClick = (userId: string) => {
    setSelectedUserId(userId);
    setCurrentPath("/admin/user-detail");
  };

  const handleBackFromUser = () => {
    setSelectedUserId(null);
    setCurrentPath("/admin/users");
  };

  const handleVisitClick = (visitId: string) => {
    setSelectedVisitId(visitId);
    // Save the current path so we can return to it later
    setVisitPreviousPath(currentPath);
    setCurrentPath("/visit-detail");
  };

  const handleBackFromVisit = () => {
    setSelectedVisitId(null);
    const pathToReturn = visitPreviousPath;
    // Reset to default after using
    setVisitPreviousPath("/customer-detail");
    setCurrentPath(pathToReturn);
  };

  const handleBackToMain = () => {
    setCurrentPath("/dashboard");
  };

  const handleSearchNavigate = (type: string, id: string) => {
    // Navigate based on search result type
    switch (type) {
      case "deal":
        handleDealClick(id);
        break;
      case "customer":
        handleCustomerClick(id);
        break;
      case "quotation":
        handleQuotationClick(id);
        break;
      case "contract":
        handleContractClick(id);
        break;
      case "approval":
        handleApprovalClick(id);
        break;
      case "task":
        setCurrentPath("/tasks");
        break;
      default:
        break;
    }
    setIsSearchOpen(false);
  };

  const renderContent = () => {
    console.log("[renderContent] Called with currentPath:", currentPath, "userMode:", userMode);
    
    // Sales Mode - existing logic
    // Deal detail view
    if (currentPath === "/deal-detail" && selectedDealId) {
      return (
        <DealDetailScreen 
          dealId={selectedDealId} 
          onBack={handleBackFromDeal}
          onQuotationClick={handleQuotationClick}
          onNavigate={handleNavigation}
        />
      );
    }

    // Customer detail view
    if (currentPath === "/customer-detail" && selectedCustomerId) {
      return (
        <CustomerDetailHCP
          customerId={selectedCustomerId} 
          onBack={handleBackFromCustomer}
          onDealClick={(dealId) => {
            setSelectedDealId(dealId);
            setCurrentPath("/deal-detail-hcp-v2");
          }}
          onQuotationClick={(quotationId) => {
            setSelectedQuotationId(quotationId);
            setCurrentPath("/quotation-detail");
          }}
        />
      );
    }

    // My Customer detail view
    if (currentPath === "/my-customer-detail" && selectedCustomerId) {
      return (
        <MyCustomerDetailHCPV2 customerId={selectedCustomerId} onBack={handleBackFromMyCustomer} />
      );
    }

    // Deal detail view (HCP V2)
    if (currentPath === "/deal-detail-hcp-v2" && selectedDealId) {
      return (
        <DealDetailHCPV2 
          dealId={selectedDealId} 
          onBack={() => {
            setSelectedDealId(null);
            setCurrentPath("/customer-detail");
          }} 
        />
      );
    }

    // Approval detail view
    if (currentPath === "/approval-detail" && selectedApprovalId) {
      return (
        <ApprovalScreen onBack={handleBackFromApproval} />
      );
    }

    // Contract detail view
    if (currentPath === "/contract-detail" && selectedContractId) {
      return (
        <ContractScreen 
          onBack={handleBackFromContract} 
          onNavigate={handleNavigation}
          onPreview={handleContractPreview}
        />
      );
    }

    // Quotation detail view
    if (currentPath === "/quotation-detail" && selectedQuotationId) {
      return (
        <QuotationDetailScreen 
          quotationId={selectedQuotationId} 
          onBack={handleBackFromQuotation} 
          onNavigate={handleNavigation}
          onPreview={handleQuotationPreview}
        />
      );
    }
    
    // Quotation Upload Detail view (File version history)
    if (currentPath === "/quotation-upload-detail" && selectedQuotationId) {
      return (
        <QuotationUploadDetailScreen 
          quotationId={selectedQuotationId} 
          onBack={() => setCurrentPath("/quotations")} 
        />
      );
    }
    
    // Quotation Uploaded Detail view (For uploaded quotations with PDF viewer)
    if (currentPath === "/quotation-uploaded-detail" && selectedQuotationId) {
      return (
        <QuotationUploadedDetailScreen 
          quotationId={selectedQuotationId} 
          onBack={() => setCurrentPath("/quotations")} 
        />
      );
    }
    
    // Quotation detail multi-template view (for demo)
    if (currentPath === "/quotation-detail-demo") {
      return (
        <QuotationDetailMultiTemplateScreen 
          quotationId="QT-2024-001"
          onBack={() => setCurrentPath("/quotations")} 
          onPreview={handleQuotationPreview}
        />
      );
    }

    // Quotation preview view
    if (currentPath === "/quotation-preview" && selectedQuotationId) {
      return (
        <QuotationPreviewMultiTemplate 
          quotationId={selectedQuotationId}
          templateType={selectedQuotationTemplate}
          onBack={handleBackFromQuotationPreview}
          onNavigate={handleNavigation}
        />
      );
    }

    // Proposal detail view
    if (currentPath === "/proposal-detail" && selectedProposalId) {
      return (
        <ProposalScreen proposalId={selectedProposalId} onNavigate={handleNavigation} />
      );
    }
    
    // Proposal editor view (A4 Word document)
    if (currentPath === "/proposal-editor-v2" && selectedProposalId) {
      return (
        <ProposalEditorScreenV2 proposalId={selectedProposalId} onNavigate={handleNavigation} />
      );
    }

    // Proposal preview view
    if (currentPath === "/proposal-preview" && selectedProposalId) {
      return (
        <ProposalPreviewScreen proposalId={selectedProposalId} onNavigate={handleNavigation} />
      );
    }

    // Proposal editor view
    if (currentPath === "/proposal-editor" && selectedProposalId) {
      return (
        <ProposalEditorScreenV2 proposalId={selectedProposalId} onNavigate={handleNavigation} />
      );
    }

    // Contract detail view (old - for backward compatibility)
    if (currentPath === "/contract-detail" && selectedContractId) {
      return (
        <ContractScreen onBack={handleBackFromContract} onNavigate={handleNavigation} />
      );
    }

    // Contract editor view
    if (currentPath === "/contract-editor" && selectedContractId) {
      return (
        <ContractEditorScreen contractId={selectedContractId} onNavigate={handleNavigation} />
      );
    }

    // Contract preview view
    if (currentPath === "/contract-preview" && selectedContractId) {
      return (
        <ContractPreviewScreen contractId={selectedContractId} onBack={handleBackFromContractPreview} />
      );
    }

    // NDA preview view
    if (currentPath === "/nda-preview" && selectedNDAId) {
      return (
        <NDADetailScreen 
          ndaId={selectedNDAId} 
          onBack={handleBackFromNDA}
          onEdit={() => {
            setCurrentPath("/nda-editor");
          }}
          onPreview={() => {
            setCurrentPath("/nda-document");
          }}
        />
      );
    }

    // NDA document view (A4 document)
    if (currentPath === "/nda-document" && selectedNDAId) {
      return (
        <NDAEditorScreenV2 
          ndaId={selectedNDAId} 
          onNavigate={(path, id) => {
            if (path === "/nda-preview" || path.includes("back")) {
              setCurrentPath("/nda-preview");
            } else {
              handleNavigation(path, id);
            }
          }}
        />
      );
    }

    // NDA editor view
    if (currentPath === "/nda-editor" && selectedNDAId) {
      return (
        <NDAGeneratorScreen 
          ndaId={selectedNDAId} 
          onBack={() => setCurrentPath("/nda-preview")}
          onSave={(data) => {
            console.log("Saving NDA data:", data);
            // TODO: Save to backend
            setCurrentPath("/nda-preview");
          }}
          onPreview={() => setCurrentPath("/nda-preview")}
        />
      );
    }

    // Task detail view
    if (currentPath === "/task-detail" && selectedTaskId) {
      return (
        <TaskDetailScreen taskId={selectedTaskId} onNavigate={handleNavigation} />
      );
    }

    // Visit detail view
    if (currentPath === "/visit-detail" && selectedVisitId) {
      return (
        <VisitDetailScreen visitId={selectedVisitId} onBack={handleBackFromVisit} />
      );
    }

    // Check for /quotations/create before the switch statement
    if (currentPath.startsWith("/quotations/create")) {
      console.log("[APP-RENDER] Rendering QuotationBuilderScreen for:", currentPath);
      return <QuotationBuilderScreen onNavigate={handleNavigation} currentPath={currentPath} />;
    }

    // Check for /quotation-builder before the switch statement  
    if (currentPath.startsWith("/quotation-builder")) {
      console.log("[APP-RENDER] Rendering QuotationBuilderScreen for:", currentPath);
      return <QuotationBuilderScreen onNavigate={handleNavigation} currentPath={currentPath} />;
    }

    // Main screens based on route
    switch (true) {
      case currentPath === "/manager-dashboard":
        return <SalesManagerDashboard onNavigate={handleNavigation} />;
      case currentPath === "/team-performance":
        return <TeamPerformanceScreen />;
      case currentPath === "/team-deals":
        return <TeamDealsScreen onNavigate={handleNavigation} onDealClick={handleDealClick} />;
      case currentPath === "/team-activities":
        return <TeamActivitiesScreen onNavigate={handleNavigation} />;
      case currentPath === "/dashboard":
        return <ImprovedDashboardScreen onNavigate={handleNavigation} />;
      case currentPath === "/dashboard-catalog":
        return <DashboardCatalogScreen onNavigate={handleNavigation} />;
      case currentPath === "/enterprise-dashboard":
        return <ImprovedDashboardScreen onNavigate={handleNavigation} />; // File removed, use ImprovedDashboardScreen instead
      case currentPath === "/deals" || currentPath === "/deals/create":
        return <DealsListScreen onDealClick={handleDealClick} shouldOpenAddDialog={shouldOpenActivityModal} setShouldOpenAddDialog={setShouldOpenActivityModal} />;
      case currentPath === "/quotation-create":
        return <QuotationScreen onBack={() => setCurrentPath("/quotations")} />;
      case currentPath.startsWith("/quotations/create"):
        return <QuotationBuilderScreen onNavigate={handleNavigation} currentPath={currentPath} />;
      case currentPath.startsWith("/quotations"):
        return <QuotationListScreen onQuotationClick={handleQuotationClick} onViewUploadDetail={handleViewQuotationUploadDetail} onNavigate={handleNavigation} currentPath={currentPath} shouldOpenAddDialog={shouldOpenActivityModal} setShouldOpenAddDialog={setShouldOpenActivityModal} />;
      case currentPath === "/overall":
        return <OverAllScreen onDealClick={handleDealClick} onQuotationClick={handleQuotationClick} onContractClick={handleContractClick} />;
      case currentPath.startsWith("/proposals-contracts") || currentPath === "/proposals-contracts":
        return <ProposalsContractsScreen onNavigate={handleNavigation} onContractClick={handleContractClick} onNDAClick={handleNDAClick} currentPath={currentPath} shouldOpenAddDialog={shouldOpenActivityModal} setShouldOpenAddDialog={setShouldOpenActivityModal} />;
      case currentPath === "/customers" || currentPath === "/customers/add":
        return <CustomerListScreenV2 onCustomerClick={handleCustomerClick} shouldOpenAddDialog={shouldOpenActivityModal} setShouldOpenAddDialog={setShouldOpenActivityModal} />;
      case currentPath === "/customers/my":
        return <CustomerListScreenV2 onCustomerClick={handleMyCustomerClick} shouldOpenAddDialog={shouldOpenActivityModal} setShouldOpenAddDialog={setShouldOpenActivityModal} viewMode="my" />;
      case currentPath === "/customers/insights":
        return <CustomerInsightsScreen onNavigate={handleNavigation} />;
      case currentPath === "/customers/insights-bel":
        return <CustomerInsightsBELScreen onNavigate={handleNavigation} />;
      case currentPath === "/customers/intelligence":
        return <CustomerIntelligenceWrapper />;
      case currentPath === "/leads" || currentPath === "/leads/add":
        return <LeadListScreen 
          onLeadClick={handleLeadClick}
          shouldOpenAddDialog={shouldOpenActivityModal} 
          setShouldOpenAddDialog={setShouldOpenActivityModal} 
        />;
      case currentPath === "/lead-detail":
        return <LeadDetailScreenV2 onBack={() => setCurrentPath("/leads")} leadId={selectedLeadId || undefined} />;
      case currentPath === "/approvals":
        return <ApprovalsScreen onApprovalClick={handleApprovalClick} />;
      case currentPath === "/admin/users":
        return <AdminUserManagement />;
      case currentPath === "/admin/transfers":
        return <AdminTransferCenter 
          onCustomerClick={handleCustomerClick}
          onDealClick={handleDealClick}
          onQuotationClick={handleQuotationClick}
        />;
      case currentPath === "/admin/audit":
        return <AdminAuditLog />;
      case currentPath === "/admin/ownership":
        return <AdminCustomerOwnership onCustomerClick={handleCustomerClick} onNavigate={handleNavigation} />;
      case currentPath === "/reports/insights":
        return <CustomerInsightsScreen onNavigate={handleNavigation} />;
      case currentPath === "/reports" || currentPath === "/reports/tasks":
        return <ReportsScreen onDealClick={handleDealClick} onQuotationClick={handleQuotationClick} onTaskClick={handleTaskClick} />;
      case currentPath === "/calendar" || currentPath === "/calendar/create":
        return <CalendarScreen 
          onNavigate={handleNavigation} 
          selectedActivityId={selectedActivityId} 
          shouldOpenActivityModal={shouldOpenActivityModal}
          setShouldOpenActivityModal={setShouldOpenActivityModal}
        />;
      case currentPath === "/activities":
        return <ActivitiesScreen onActivityClick={(activityId) => {
          setSelectedActivityId(activityId);
          handleNavigation("/calendar");
        }} />;
      case currentPath === "/tasks" || currentPath === "/tasks/create":
        return <TasksScreen userMode={userMode} />;
      case currentPath === "/checkin-history":
        return <CheckInHistoryScreen onVisitClick={handleVisitClick} />;
      // Redirect old admin dashboard to main dashboard
      case currentPath === "/admin/dashboard":
        handleNavigation("/dashboard");
        return null;
      case currentPath === "/admin/users":
        return <UserManagementScreen onUserClick={handleUserClick} />;
      case currentPath === "/admin/roles-permissions":
        return <AdminRolesScreen />;
      case currentPath === "/admin/teams":
        return <AdminTeamsScreen />;
      case currentPath === "/admin/companies":
        return <div className="p-8"><h1 className="text-2xl font-bold">Companies Management</h1><p className="text-gray-600 mt-2">Coming soon...</p></div>;
      case currentPath === "/admin/products-services":
        return <AdminProductsScreen />;
      case currentPath === "/admin/deal-stages":
        return <div className="p-8"><h1 className="text-2xl font-bold">Deal Stages</h1><p className="text-gray-600 mt-2">Coming soon...</p></div>;
      case currentPath === "/admin/custom-fields":
        return <AdminCustomFieldsScreen />;
      case currentPath === "/admin/email-templates":
        return <AdminTemplatesScreen />;
      case currentPath === "/admin/integrations":
        return <IntegrationsScreen />;
      case currentPath === "/admin/settings":
        return <SystemSettingsTab />;
      case currentPath === "/admin/audit-log":
        return <AuditLogScreen />;
      case currentPath.startsWith("/admin"):
        return <div className="p-8"><h1 className="text-2xl font-bold">Admin Panel</h1><p className="text-gray-600 mt-2">Select a menu item from the sidebar</p></div>;

        // Old routes commented out - now handled by AdminMainScreen
      case currentPath === "/kanban":
        return <KanbanView />;
      case currentPath === "/onelink-welcome":
        return <OneLinkWelcome onGetStarted={() => handleNavigation("/onelink-demo")} onNavigate={handleNavigation} />;
      case currentPath === "/onelink-demo":
        return <OneLinkCRMDemo />;
      case currentPath === "/onelink-dashboard":
        return <OneLinkDashboard />;
      case currentPath === "/onelink-deals":
        return <OneLinkDealsScreen onNavigate={handleNavigation} />;
      case currentPath === "/quotation-builder-demo":
        return <QuotationModuleDemo onNavigate={handleNavigation} />;
      case currentPath.startsWith("/quotation-builder"):
        return <QuotationBuilderScreen onNavigate={handleNavigation} currentPath={currentPath} />;
      case currentPath.startsWith("/proposal-builder"):
        return <ProposalBuilderScreen onNavigate={handleNavigation} currentPath={currentPath} />;
      case currentPath === "/profile-settings":
        return <ProfileSettingsScreen />;
      case currentPath === "/documents":
        return <DocumentsScreen />;
      case currentPath === "/audit-log":
        return <AuditLogScreen />;
      case currentPath === "/tasks" || currentPath === "/tasks/create":
        return <TasksScreen onNavigate={handleNavigation} onNavigateWithActivity={handleNavigationWithActivity} shouldOpenCreateDialog={shouldOpenActivityModal} userMode={userMode} />;
      case currentPath === "/transfer-lead-demo":
        return <TransferLeadDemo />;
      default:
        console.log("[renderContent] No route matched, rendering TaskDetailDemo");
        return <TaskDetailDemo />;
    }
  };

  const getPageTitle = () => {
    if (currentPath === "/deal-detail") return t("deals.deal_details");
    if (currentPath === "/customer-detail") return t("customers.customer_details");
    if (currentPath === "/approval-detail") return t("approvals.approval_workflow");
    if (currentPath === "/contract-detail") return t("contracts.contract_details");
    if (currentPath === "/quotation-detail") return t("quotations.quotation_details");
    if (currentPath === "/proposal-detail") return t("proposals.proposal_details");
    if (currentPath === "/proposal-preview") return t("deals.preview_proposal");
    
    // Handle paths with query parameters
    const pathWithoutQuery = currentPath.split('?')[0];
    
    switch (pathWithoutQuery) {
      case "/dashboard":
        return t("nav.dashboard");
      case "/dashboard-catalog":
        return t("nav.dashboard_catalog") || "Dashboard Catalog";
      case "/enterprise-dashboard":
        return t("nav.enterprise_dashboard");
      case "/deals":
      case "/deals/create":
        return t("nav.deals");
      case "/quotations":
      case "/quotations/create":
        return t("nav.quotations");
      case "/customers":
      case "/customers/add":
        return t("nav.customers");
      case "/customers/insights":
        return t("nav.customer_insights");
      case "/customers/insights-bel":
        return t("nav.customers_insights_bel");
      case "/leads":
      case "/leads/add":
        return t("nav.leads");
      case "/lead-detail":
        return "รายละเอียดลีด";
      case "/contracts":
      case "/contracts/create":
        return t("nav.contracts");
      case "/approvals":
        return t("nav.approvals");
      case "/admin/users":
        return t("nav.user_management");
      case "/admin/transfers":
        return t("nav.transfer_center");
      case "/admin/audit":
        return t("nav.audit_log");
      case "/admin/ownership":
        return t("nav.customer_ownership");
      case "/reports":
      case "/reports/tasks":
      case "/reports/insights":
        return t("nav.reports");
      case "/calendar":
      case "/calendar/create":
        return t("nav.calendar");
      case "/admin":
      case "/admin/settings":
      case "/admin/integrations":
        return t("nav.admin");
      case "/kanban":
        return t("nav.kanban");
      case "/profile-settings":
        return t("nav.profile_settings");
      case "/documents":
        return t("nav.documents");
      case "/audit-log":
        return t("nav.audit_log");
      case "/tasks":
      case "/tasks/create":
        return t("nav.tasks");
      default:
        return t("nav.dashboard");
    }
  };

  // Check if we're in Admin mode
  const isAdminMode = currentPath.startsWith('/admin');
  const isAdmin = role === 'Admin';

  return (
    <div className="flex h-screen bg-background transition-colors duration-200">
      {/* Sidebar Navigation */}
      {userMode === 'sales' && (
        <>
          {/* Desktop Sidebar - Always visible on desktop */}
          <div className="hidden md:block">
            <SidebarNav currentPath={currentPath} onNavigate={handleNavigation} />
          </div>

          {/* Mobile Sidebar Overlay */}
          {isMobileSidebarOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              {/* Backdrop */}
              <div 
                className="absolute inset-0 bg-black/50" 
                onClick={() => setIsMobileSidebarOpen(false)}
              />
              
              {/* Sidebar */}
              <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl">
                <SidebarNav currentPath={currentPath} onNavigate={(path, action) => {
                  handleNavigation(path, action);
                  setIsMobileSidebarOpen(false);
                }} />
              </div>
            </div>
          )}
        </>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Header */}
        <header className="border-b-2 border-gray-200 bg-white sticky top-0 z-10 shadow-md">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5">
            {/* Left Side: Logo + Tasks Menu + Search */}
            <div className="flex items-center gap-2 sm:gap-6">
              {userMode === 'customer' && (
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#3385FF] to-[#0066FF] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform" onClick={() => handleNavigation('/customer-services')}>
                      <span className="text-white font-bold">MC</span>
                    </div>
                    <h2 className="text-xl font-bold text-foreground">mini crm</h2>
                  </div>
                  <div className="flex items-center gap-2 bg-secondary/50 p-1 rounded-xl">
                    <button
                      onClick={() => handleNavigation('/customer-services')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        currentPath === '/customer-services'
                          ? 'bg-gradient-to-r from-[#3385FF] to-[#0066FF] text-white shadow-md'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      บริการทั้งหมด
                    </button>
                    <button
                      onClick={() => handleNavigation('/customer-dashboard')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        currentPath === '/customer-dashboard'
                          ? 'bg-gradient-to-r from-[#3385FF] to-[#0066FF] text-white shadow-md'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      ห้องของฉัน
                    </button>
                  </div>
                </div>
              )}
              {userMode === 'sales' && (
                <>
                  {/* Mobile Menu Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="md:hidden h-8 w-8 p-0"
                    onClick={() => setIsMobileSidebarOpen(true)}
                  >
                    <Menu className="h-5 w-5" />
                  </Button>

                  {/* Tasks Menu - Hide on small mobile */}
                  <button
                    onClick={() => handleNavigation('/tasks')}
                    className={`hidden sm:block px-4 py-2 text-[15px] font-semibold transition-colors rounded-lg ${
                      currentPath === '/tasks' || currentPath.startsWith('/tasks')
                        ? 'text-gray-900'
                        : 'text-[#1a1a2e] hover:bg-gray-50'
                    }`}
                  >
                    Tasks
                  </button>

                  {/* Search - Icon only on mobile */}
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 rounded-lg text-[15px] font-medium text-gray-600 transition-all hover:shadow-sm"
                  >
                    <Search className="h-4 w-4" />
                    <span className="hidden sm:inline">Search</span>
                  </button>
                  {/* Global Search Dialog */}
                  <GlobalSearch 
                    isOpen={isSearchOpen} 
                    onClose={() => setIsSearchOpen(false)} 
                    onNavigate={handleSearchNavigate}
                  />
                </>
              )}
            </div>

            {/* Right Side: Notifications + Controls + User */}
            <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
              {/* Notification Center - Hide on mobile */}
              {userMode === 'sales' && (
                <div className="relative hidden sm:block">
                  <NotificationCenter />
                </div>
              )}

              {/* Help Button - Hide on mobile */}
              {userMode === 'sales' && (
                <Button variant="ghost" size="sm" className="hidden md:flex text-gray-600 hover:bg-gray-100 rounded-lg h-10 px-4 text-[15px] font-medium">
                  {t("common.help")}
                </Button>
              )}

              {/* Language Switcher - Hide on small mobile */}
              <div className="hidden sm:block">
                <LanguageSwitcher />
              </div>

              {/* Dark Mode Toggle - Hide on mobile */}
              <div className="hidden sm:block">
                <ThemeSwitcher />
              </div>

              {/* Role Switcher - Hide on mobile */}
              {userMode === 'sales' && (
                <div className="hidden md:block">
                  <RoleSwitcher />
                </div>
              )}

              {/* User Profile - Always visible */}
              <UserProfile email={userEmail} onLogout={handleLogout} />
            </div>
          </div>
        </header>

        {/* Content */}
        <ErrorBoundary
          fallback={
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Content Error</h2>
                <p className="text-gray-600">Failed to load content</p>
              </div>
            </div>
          }
        >
          {renderContent()}
        </ErrorBoundary>

        {/* Quick Actions FAB - Show in all pages for Sales Mode */}
        {userMode === 'sales' && (
          <>
            <div 
              className="fixed z-50 touch-none select-none"
              style={{
                bottom: `${fabPosition.bottom}px`,
                right: `${fabPosition.right}px`,
                cursor: isDragging ? 'grabbing' : 'grab',
                transition: hasMoved ? 'none' : 'all 300ms ease-out',
                willChange: isDragging ? 'bottom, right' : 'auto',
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                handleFabDragStart(e.clientX, e.clientY);
              }}
              onMouseUp={handleFabDragEnd}
              onMouseMove={(e) => {
                e.preventDefault();
                handleFabDragMove(e.clientX, e.clientY);
              }}
              onMouseLeave={handleFabDragEnd}
              onTouchStart={(e) => {
                const touch = e.touches[0];
                handleFabDragStart(touch.clientX, touch.clientY);
              }}
              onTouchEnd={handleFabDragEnd}
              onTouchMove={(e) => {
                const touch = e.touches[0];
                handleFabDragMove(touch.clientX, touch.clientY);
              }}
            >
              <Button
                onClick={(e) => {
                  if (!isDragging) {
                    setShowQuickActionsMenu(true);
                  }
                }}
                className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                style={{
                  background: `linear-gradient(135deg, ${roleTheme.primary}, ${roleTheme.light})`,
                }}
              >
                <Plus className="h-6 w-6 text-white" />
              </Button>
            </div>

            {/* Quick Actions Menu Modal */}
            <QuickActionsMenu
              isOpen={showQuickActionsMenu}
              onClose={() => setShowQuickActionsMenu(false)}
              onQuickVisit={() => {
                setShowQuickActionsMenu(false);
                setShowQuickVisitModal(true);
              }}
              onQuickDeal={() => {
                handleNavigation("/deals", "add");
              }}
              onQuickActivity_Visit={() => {
                handleNavigation('/calendar', 'add');
              }}
              onQuickCreatetask={() => {
                handleNavigation('/tasks', 'add');
              }}
              />

            {/* Quick Visit Modal */}
            <QuickVisitModal
              isOpen={showQuickVisitModal}
              onClose={() => setShowQuickVisitModal(false)}
              onSave={(data) => {
                console.log("Quick Visit saved:", data);
                // TODO: Save visit data to backend
              }}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default function App() {
  console.log("[APP-ROOT] App component rendering - v2.3.1");
  
  // Simple fallback to ensure SOMETHING always renders
  try {
    return (
      <ErrorBoundary>
        <AuthProvider>
          <RoleProvider>
            <ThemeProvider>
              <CRMProvider>
                <LanguageProvider>
                  <ErrorBoundary>
                    <AppContent />
                    <Toaster position="top-right" richColors />
                  </ErrorBoundary>
                </LanguageProvider>
              </CRMProvider>
            </ThemeProvider>
          </RoleProvider>
        </AuthProvider>
      </ErrorBoundary>
    );
  } catch (error) {
    console.error("[APP-ROOT] Critical error:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Critical Error</h1>
          <p className="text-gray-700">Failed to load application. Please refresh the page.</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }
}