// Enterprise CRM Type Definitions

export interface Customer {
  id: string;
  // Basic Info
  name: string;
  customerType: string;
  salesChannel: string;
  status: string;
  
  // Contact Info
  contactPerson: string;
  phone: string;
  email: string;
  emergencyContact?: string;
  socialAccounts?: {
    line?: string;
    facebook?: string;
    instagram?: string;
    tiktok?: string;
  };
  
  // Address
  address: string;
  billingAddress?: string;
  documentAddress?: string;
  
  // Business Info
  taxId?: string;
  idPassport?: string;
  industry?: string;
  supplyChainRole?: string;
  
  // Hierarchy
  businessGroup?: string;
  subBusinessGroup?: string;
  productGroup?: string;
  
  // Metadata
  branch: string;
  assignedTo: string;
  source: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  
  // Stats
  totalValue?: number;
  dealsCount?: number;
  activeContracts?: number;
}

export interface Lead extends Customer {
  leadType: string;
  qualification: "cold" | "warm" | "hot";
  expectedRevenue?: number;
  probability?: number;
  nextFollowUp?: string;
}

export interface Deal {
  id: string;
  name: string;
  customerId: string;
  customerName: string;
  
  // Deal Info
  value: number;
  currency: string;
  stage: string;
  probability: number;
  expectedCloseDate: string;
  
  // Hierarchy
  businessGroup: string;
  subBusinessGroup: string;
  productGroup: string;
  
  // Products/Services
  items: DealItem[];
  
  // Ownership
  owner: {
    id: string;
    name: string;
    initials: string;
  };
  branch: string;
  
  // Timeline
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
  
  // Status
  status: "open" | "won" | "lost";
  lostReason?: string;
  
  // Related
  quotationId?: string;
  contractId?: string;
}

export interface DealItem {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  discount: number;
  discountType: "percentage" | "flat";
  amount: number;
}

export interface Quotation {
  id: string;
  quotationNumber: string;
  
  // Customer
  customerId: string;
  customerName: string;
  contactPerson: string;
  
  // Deal
  dealId?: string;
  dealName?: string;
  
  // Quotation Details
  title: string;
  description?: string;
  items: QuotationItem[];
  
  // Pricing
  subtotal: number;
  discount: number;
  discountType: "percentage" | "flat";
  vatType: "vat_in" | "vat_out" | "no_vat";
  vat: number;
  total: number;
  currency: string;
  
  // Status & Timeline
  status: "draft" | "sent" | "viewed" | "accepted" | "rejected" | "expired" | "revised";
  validityPeriod: number; // days
  createdAt: string;
  sentAt?: string;
  viewedAt?: string;
  acceptedAt?: string;
  rejectedAt?: string;
  expiryDate: string;
  
  // Ownership
  preparedBy: string;
  approvedBy?: string;
  branch: string;
  
  // Related
  ticketId?: string;
  contractId?: string;
  previousVersion?: string; // for revisions
  version: number;
  
  // Documents
  pdfUrl?: string;
  emailTemplate?: string;
  
  // Notes
  notes?: string;
  internalNotes?: string;
}

export interface QuotationItem {
  id: string;
  name: string;
  description?: string;
  category?: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  standardPrice?: number;
  promotionPrice?: number;
  discount: number;
  discountType: "percentage" | "flat";
  amount: number;
  
  // Additional
  insurance?: boolean;
  insuranceAmount?: number;
  upsell?: boolean;
  
  // Rental specific
  rentalPeriod?: number;
  rentalPeriodUnit?: "day" | "month" | "year";
  billingType?: "calendar" | "anniversary";
}

export interface Contract {
  id: string;
  contractNumber: string;
  
  // Customer
  customerId: string;
  customerName: string;
  
  // Contract Details
  title: string;
  type: "service" | "rental" | "sales";
  status: "active" | "expired" | "terminated" | "renewed";
  
  // Timeline
  startDate: string;
  endDate: string;
  renewalDate?: string;
  terminationDate?: string;
  createdAt: string;
  
  // Value
  totalValue: number;
  currency: string;
  paymentTerms: string;
  
  // Related
  quotationId?: string;
  dealId?: string;
  
  // Renewal
  autoRenewal: boolean;
  renewalNoticeDays: number;
  renewalStatus?: "pending" | "renewed" | "not_renewed";
  
  // Documents
  documents: ContractDocument[];
  
  // Services/Products
  items: ContractItem[];
  
  // Branch & Owner
  branch: string;
  managedBy: string;
  
  // Notes
  terms?: string;
  notes?: string;
}

export interface ContractDocument {
  id: string;
  category: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
  uploadedBy: string;
  version: number;
  signed: boolean;
  signedAt?: string;
  signedBy?: string;
}

export interface ContractItem {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  total: number;
  startDate: string;
  endDate: string;
}

export interface Ticket {
  id: string;
  ticketNumber: string;
  
  // Basic Info
  title: string;
  description: string;
  category: string;
  priority: "p1" | "p2" | "p3" | "p4" | "p5";
  status: "new" | "assigned" | "in_progress" | "pending" | "closed" | "reopened" | "no_response";
  
  // Customer
  customerId?: string;
  customerName?: string;
  contactPerson?: string;
  contactPhone?: string;
  contactEmail?: string;
  
  // Assignment
  assignedTo?: string;
  assignedTeam?: string;
  branch: string;
  
  // Timeline
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
  dueDate?: string;
  
  // SLA
  slaDeadline: string;
  slaStatus: "on-time" | "warning" | "overdue";
  
  // Follow-up
  followUpType: "short_term" | "long_term" | "none";
  reminderDate?: string;
  
  // Related
  dealId?: string;
  quotationId?: string;
  contractId?: string;
  parentTicketId?: string;
  
  // Source
  source: string; // phone, email, walk-in, line, facebook, etc.
  sourceData?: {
    callId?: string;
    emailId?: string;
    socialMessageId?: string;
  };
  
  // Resolution
  resolution?: string;
  resolvedBy?: string;
  resolvedAt?: string;
  
  // Feedback
  customerSatisfaction?: 1 | 2 | 3 | 4 | 5;
  feedback?: string;
  
  // Metadata
  tags?: string[];
  attachments?: TicketAttachment[];
  relatedTickets?: string[];
}

export interface TicketAttachment {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  uploadedAt: string;
  uploadedBy: string;
}

export interface Task {
  id: string;
  
  // Basic Info
  title: string;
  description?: string;
  type: "lead" | "coordinator" | "follow_up" | "meeting";
  priority: "p1" | "p2" | "p3" | "p4" | "p5";
  status: "pending" | "in_progress" | "completed" | "cancelled";
  
  // Assignment
  assignedTo: string;
  assignedBy: string;
  
  // Timeline
  dueDate: string;
  dueTime?: string;
  createdAt: string;
  completedAt?: string;
  
  // Related
  customerId?: string;
  dealId?: string;
  ticketId?: string;
  
  // Location
  branch?: string;
  
  // Reminder
  reminder?: boolean;
  reminderTime?: string;
  
  // Notes
  notes?: string;
  
  // Checklist
  checklist?: TaskChecklistItem[];
}

export interface TaskChecklistItem {
  id: string;
  title: string;
  completed: boolean;
  completedAt?: string;
  completedBy?: string;
}

export interface Approval {
  id: string;
  approvalNumber: string;
  
  // Type
  type: "contract" | "quotation" | "deal" | "discount" | "refund";
  
  // Subject
  title: string;
  description?: string;
  
  // Customer
  customerId: string;
  customerName: string;
  contactPerson: string;
  
  // Value
  totalValue: number;
  currency: string;
  
  // Workflow
  currentStage: string;
  workflow: ApprovalWorkflowStage[];
  progress: number; // 0-100
  
  // Status
  status: "pending" | "approved" | "rejected" | "cancelled";
  priority: "high" | "medium" | "low";
  
  // Timeline
  submittedDate: string;
  submittedBy: string;
  daysOpen: number;
  
  // Related
  relatedId: string; // ID of quotation, contract, etc.
  relatedType: string;
  
  // Branch
  businessUnit: string;
  branch: string;
  
  // Resolution
  approvedBy?: string[];
  approvedAt?: string;
  rejectedBy?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  
  // Documents
  documents?: string[];
  
  // Comments
  comments?: ApprovalComment[];
}

export interface ApprovalWorkflowStage {
  id: string;
  name: string;
  order: number;
  approver: string;
  approverRole: string;
  status: "pending" | "approved" | "rejected" | "skipped";
  submittedAt?: string;
  respondedAt?: string;
  comments?: string;
}

export interface ApprovalComment {
  id: string;
  userId: string;
  userName: string;
  comment: string;
  timestamp: string;
  type: "comment" | "approval" | "rejection" | "request_change";
}

export interface Activity {
  id: string;
  title: string;
  type: string;
  status: "planned" | "completed" | "cancelled" | "in_progress";
  interactionType?: string;

  // Timing
  startTime: Date | string;
  endTime: Date | string;
  activityDate?: string;
  dueDate?: string;

  // Location
  location?: string;
  siteBranch?: string;

  // Customer
  customer?: string;
  customerContacts?: string[];
  customerContact?: string;
  customerAddress?: string;
  customerPhone?: string;
  relatedCustomer?: string;

  // Assignment
  assignedTo?: string;
  createdBy?: { id: string; name: string };
  attendees?: Array<{ id: string; name: string; role?: string }>;

  // Details
  notes?: string;
  agenda?: string;
  description?: string;

  // Related
  relatedDeal?: string;
  relatedContract?: string;
  linkedEntities?: Array<{ type: string; id: string }>;

  // Services
  services?: string[];

  // Metadata
  createdAt?: string;
  updatedAt?: string;
  isReceived?: boolean;
  isMixedMode?: boolean;
}

export interface HistoryEntry {
  id: string;
  action: "created" | "updated" | "deleted" | "status_changed" | "assigned" | "approved" | "rejected" | "sent" | "viewed" | "signed";
  entity?: string;
  entityId?: string;
  user?: string;
  timestamp: string;
  description?: string;

  // Field changes
  field?: string;
  oldValue?: any;
  newValue?: any;

  // Additional context
  metadata?: Record<string, any>;

  // Backward compatibility
  details?: string;
}

export interface Integration {
  id: string;
  name: string;
  type: string;
  status: "connected" | "disconnected" | "error";
  lastSyncAt?: string;
  config?: Record<string, any>;
  
  // Stats
  totalSyncs?: number;
  failedSyncs?: number;
  lastError?: string;
}

export interface Dashboard {
  // KPIs
  totalLeads: number;
  totalLeadsChange: number; // percentage
  
  activeDeals: number;
  activeDealsChange: number;
  
  pendingApprovals: number;
  pendingApprovalsChange: number;
  
  thisMonthRevenue: number;
  thisMonthRevenueChange: number;
  
  // Call Center
  callsToday: number;
  missedCallsToday: number;
  avgResponseTime: number; // minutes
  
  // Tickets
  openTickets: number;
  overdueTickets: number;
  ticketSatisfaction: number; // 1-5
  
  // Conversions
  leadToCustomer: number; // percentage
  quotationToContract: number; // percentage
  
  // Charts data
  revenueByMonth: Array<{ month: string; revenue: number }>;
  dealsByStage: Array<{ stage: string; count: number; value: number }>;
  ticketsByCategory: Array<{ category: string; count: number }>;
  topCustomers: Array<{ name: string; value: number }>;
}

export interface Report {
  id: string;
  name: string;
  type: "sales" | "activity" | "customer" | "financial" | "operational";
  
  // Filters
  dateFrom: string;
  dateTo: string;
  branch?: string;
  businessGroup?: string;
  user?: string;
  
  // Data
  data: any;
  
  // Metadata
  generatedAt: string;
  generatedBy: string;
  format: "pdf" | "excel" | "csv";
  fileUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  branch: string;
  team?: string;
  
  // Profile
  avatar?: string;
  initials: string;
  
  // Status
  status: "active" | "inactive";
  lastLogin?: string;
  
  // Permissions
  permissions: string[];
  
  // Preferences
  language: "th" | "en";
  theme: "light" | "dark";
  notifications: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  category: "ticket" | "approval" | "task" | "deal" | "system";
  
  // Status
  read: boolean;
  readAt?: string;
  
  // Action
  actionUrl?: string;
  actionLabel?: string;
  
  // Metadata
  createdAt: string;
  relatedId?: string;
  relatedType?: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entity: string;
  entityId: string;
  description: string;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
}

// Filters & Search
export interface FilterOptions {
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: string[];
  priority?: string[];
  branch?: string[];
  assignedTo?: string[];
  businessGroup?: string[];
  category?: string[];
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  pageSize?: number;
}

// Form States
export interface FormState<T> {
  data: Partial<T>;
  errors: Record<string, string>;
  isDirty: boolean;
  isSubmitting: boolean;
  isValid: boolean;
}

// API Response
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: {
    total?: number;
    page?: number;
    pageSize?: number;
  };
}
