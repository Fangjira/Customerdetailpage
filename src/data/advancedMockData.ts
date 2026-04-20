// Advanced Mock Data for CRM Features
// Activities, Visits, Customer Details, System Management, etc.

export const advancedMockData = {
  // ==================== CUSTOMER ADDRESSES ====================
  customerAddresses: [
    {
      id: "addr_001",
      customerId: "cust_001",
      type: "head_office",
      address: "123 Sukhumvit Road, Khlong Toei",
      district: "Khlong Toei",
      province: "Bangkok",
      postalCode: "10110",
      country: "Thailand",
      isPrimary: true,
      isActive: true,
    },
    {
      id: "addr_002",
      customerId: "cust_001",
      type: "billing",
      address: "123 Sukhumvit Road, Khlong Toei",
      district: "Khlong Toei",
      province: "Bangkok",
      postalCode: "10110",
      country: "Thailand",
      isPrimary: false,
      isActive: true,
    },
    {
      id: "addr_003",
      customerId: "cust_001",
      type: "shipping",
      address: "456 Bangna-Trad Road, Bang Kaeo",
      district: "Bang Phli",
      province: "Samut Prakan",
      postalCode: "10540",
      country: "Thailand",
      isPrimary: false,
      isActive: true,
    },
  ],

  // ==================== CUSTOMER CONTACTS ====================
  customerContacts: [
    {
      id: "contact_001",
      customerId: "cust_001",
      firstName: "Somchai",
      lastName: "Tanaka",
      role: "ceo",
      email: "somchai.t@cpgroup.com",
      phone: "+66 2 123 4567",
      mobile: "+66 81 234 5678",
      lineId: "somchai.cp",
      isPrimary: true,
      isDecisionMaker: true,
      isActive: true,
      preferredLanguage: "th",
      preferredContactMethod: "phone",
      notes: "Prefers morning calls, available Mon-Fri 9AM-12PM",
    },
    {
      id: "contact_002",
      customerId: "cust_001",
      firstName: "Nattawut",
      lastName: "Saengthong",
      role: "logistics",
      email: "nattawut.s@cpgroup.com",
      phone: "+66 2 123 4568",
      mobile: "+66 82 345 6789",
      lineId: "nattawut.logistics",
      isPrimary: false,
      isDecisionMaker: false,
      isActive: true,
      preferredLanguage: "th",
      preferredContactMethod: "email",
      notes: "Main coordinator for daily operations",
    },
    {
      id: "contact_003",
      customerId: "cust_001",
      firstName: "Sutida",
      lastName: "Chaisri",
      role: "purchasing",
      email: "sutida.c@cpgroup.com",
      phone: "+66 2 123 4569",
      mobile: "+66 83 456 7890",
      isPrimary: false,
      isDecisionMaker: false,
      isActive: true,
      preferredLanguage: "th",
      preferredContactMethod: "email",
    },
  ],

  // ==================== CUSTOMER INSIGHTS ====================
  customerInsights: [
    {
      id: "insight_001",
      customerId: "cust_001",
      category: "behavior",
      title: "High Engagement Customer",
      description: "Average 15 interactions per month, responds within 24 hours",
      score: 85,
      createdAt: "2025-01-15",
      createdBy: "Sarah Johnson",
    },
    {
      id: "insight_002",
      customerId: "cust_001",
      category: "preference",
      title: "Prefers Air Freight",
      description: "70% of shipments via air freight, willing to pay premium for speed",
      score: 90,
      createdAt: "2025-01-10",
      createdBy: "Michael Chen",
    },
    {
      id: "insight_003",
      customerId: "cust_001",
      category: "growth",
      title: "Expansion to Vietnam",
      description: "Planning to expand operations to Vietnam in Q2 2025",
      score: 95,
      createdAt: "2025-01-20",
      createdBy: "Sarah Johnson",
    },
  ],

  // ==================== COMPETITOR INSIGHTS ====================
  competitorInsights: [
    {
      id: "comp_001",
      customerId: "cust_001",
      dealId: "deal_005",
      competitor: "kerry_logistics",
      status: "active",
      strengths: ["price", "network"],
      weaknesses: ["technology", "customer_service"],
      theirPrice: "$8,500/month",
      ourPrice: "$9,200/month",
      winProbability: 60,
      notes: "Kerry quoted 8% lower but lacks temperature-controlled facilities",
      lastUpdated: "2025-01-25",
      updatedBy: "Sarah Johnson",
    },
  ],

  // ==================== CUSTOMER HEALTH SCORES ====================
  customerHealthScores: [
    {
      id: "health_001",
      customerId: "cust_001",
      overallScore: 85,
      factors: {
        engagement: 90,
        usage: 85,
        payment: 95,
        support: 80,
        growth: 75,
      },
      trend: "up",
      lastCalculated: "2025-01-29",
      alerts: [],
    },
    {
      id: "health_002",
      customerId: "cust_002",
      overallScore: 45,
      factors: {
        engagement: 30,
        usage: 40,
        payment: 60,
        support: 50,
        growth: 45,
      },
      trend: "down",
      lastCalculated: "2025-01-29",
      alerts: [
        { type: "low_engagement", message: "No interaction in 45 days" },
        { type: "usage_decline", message: "Service usage decreased by 35%" },
      ],
    },
  ],

  // ==================== CUSTOMER RELATIONSHIPS ====================
  customerRelationships: [
    {
      id: "rel_001",
      parentId: "cust_001",
      childId: "cust_010",
      type: "subsidiary",
      relationship: "CP Foods owns 75% of CP Vietnam",
      notes: "Shared procurement policies",
      createdAt: "2024-06-15",
    },
    {
      id: "rel_002",
      parentId: "cust_001",
      childId: "cust_011",
      type: "branch",
      relationship: "CP Foods Chiang Mai Branch",
      notes: "Separate quotations required",
      createdAt: "2024-08-20",
    },
  ],

  // ==================== ACTIVITIES & VISITS ====================
  activities: [
    {
      id: "act_001",
      type: "customer_visit",
      customerId: "cust_001",
      dealId: "deal_005",
      title: "Quarterly Business Review",
      description: "Review Q4 performance and discuss 2025 expansion plans",
      purpose: "relationship",
      status: "completed",
      interactionType: "onsite_visit",
      subcategory: "formal_face_to_face",
      scheduledDate: "2025-01-15",
      scheduledTime: "14:00",
      startTime: new Date("2025-01-15T14:00:00"),
      endTime: new Date("2025-01-15T16:00:00"),
      duration: 120,
      
      // เพิ่มฟิลด์ใหม่ตามที่คุณต้องการ
      location: "SCGJWD",
      siteBranch: "บางซื่อ",
      customerContact: "คุณ สมศรี, คุณสมใจ",
      attendees: ["คุณ สมชาย", "คุณ สมหมาย"],

      latitude: 13.736717,
      longitude: 100.523186,
      assignedTo: "Sarah Johnson",
      participants: ["Somchai Tanaka", "Nattawut Saengthong"],
      outcome: "deal_closed",
      notes: "Excellent meeting. Secured $2.5M contract for 2025. Next step: Send contract draft by Jan 20.",
      checklistCompleted: 10,
      checklistTotal: 12,
      attachments: [
        { id: "att_001", name: "meeting_notes.pdf", type: "pdf", size: "245 KB" },
        { id: "att_002", name: "site_photo.jpg", type: "image", size: "1.2 MB" },
      ],
      createdAt: "2025-01-10",
      completedAt: "2025-01-15",
      createdBy: "Sarah Johnson",
    },
    {
      id: "act_002",
      type: "follow_up_call",
      customerId: "cust_002",
      title: "Follow-up on Quotation QT-002",
      description: "Discuss pricing concerns and service requirements",
      purpose: "follow_up",
      status: "completed",
      interactionType: "phone_call",
      subcategory: "informal_voice",
      scheduledDate: "2025-01-28",
      scheduledTime: "10:30",
      startTime: new Date("2025-01-28T10:30:00"),
      endTime: new Date("2025-01-28T11:00:00"),
      duration: 30,

      // เพิ่มฟิลด์ใหม่ตามที่คุณต้องการ
      location: "Online",
      siteBranch: "สาขาระยอง",
      customerContact: "คุณ วิชัย",
      attendees: ["คุณ ไมเคิล"],

      assignedTo: "Michael Chen",
      outcome: "follow_up_scheduled",
      notes: "Customer needs time to review with finance team. Scheduled follow-up for Feb 5.",
      createdAt: "2025-01-27",
      completedAt: "2025-01-28",
      createdBy: "Michael Chen",
    },
    {
      id: "act_003",
      type: "sales_meeting",
      customerId: "cust_003",
      title: "Solution Presentation",
      description: "Present integrated logistics solution for automotive parts",
      purpose: "sales",
      status: "planned",
      interactionType: "online_meeting",
      subcategory: "formal_online",
      scheduledDate: "2025-02-05",
      scheduledTime: "14:00",
      startTime: new Date("2025-02-05T14:00:00"),
      endTime: new Date("2025-02-05T15:30:00"),
      duration: 90,
      
      // เพิ่มฟิลด์ใหม่ตามที่คุณต้องการ
      location: "Microsoft Teams",
      siteBranch: "สำนักงานใหญ่",
      customerContact: "คุณ อรทัย",
      attendees: ["คุณ เดวิด", "ทีม Presales"],

      assignedTo: "David Kim",
      participants: [],
      notes: "Prepare demo of WMS system integration",
      createdAt: "2025-01-29",
      createdBy: "David Kim",
    },
  ],

  visitChecklist: [
    {
      id: "check_001",
      activityId: "act_001",
      itemId: "prepare_materials",
      completed: true,
      completedAt: "2025-01-14",
      completedBy: "Sarah Johnson",
    },
    {
      id: "check_002",
      activityId: "act_001",
      itemId: "confirm_appointment",
      completed: true,
      completedAt: "2025-01-13",
      completedBy: "Sarah Johnson",
    },
  ],

  // ==================== DEAL ACTIVITIES ====================
  dealActivities: [
    {
      id: "deact_001",
      dealId: "deal_005",
      type: "meeting",
      title: "Initial Discovery Meeting",
      description: "Understanding customer requirements and pain points",
      date: "2024-11-15",
      duration: 90,
      attendees: ["Somchai Tanaka", "Sarah Johnson"],
      outcome: "Identified need for integrated cold chain solution",
      nextStep: "Prepare detailed quotation",
      createdBy: "Sarah Johnson",
      createdAt: "2024-11-15",
    },
    {
      id: "deact_002",
      dealId: "deal_005",
      type: "proposal",
      title: "Quotation Sent",
      description: "Sent comprehensive cold chain logistics proposal",
      date: "2024-12-01",
      amount: 2500000,
      quotationId: "quote_012",
      outcome: "Under review by customer",
      nextStep: "Follow up in 1 week",
      createdBy: "Sarah Johnson",
      createdAt: "2024-12-01",
    },
    {
      id: "deact_003",
      dealId: "deal_005",
      type: "negotiation",
      title: "Price Negotiation",
      description: "Discussed pricing and payment terms",
      date: "2024-12-15",
      duration: 60,
      outcome: "Agreed on 3% discount for 2-year commitment",
      nextStep: "Update quotation and send for approval",
      createdBy: "Sarah Johnson",
      createdAt: "2024-12-15",
    },
  ],

  // ==================== DEAL TASKS ====================
  dealTasks: [
    {
      id: "task_001",
      dealId: "deal_005",
      title: "Send updated quotation",
      description: "Update pricing with 3% discount and resend",
      priority: "p2",
      status: "completed",
      assignedTo: "Sarah Johnson",
      dueDate: "2024-12-20",
      completedDate: "2024-12-18",
      createdAt: "2024-12-15",
    },
    {
      id: "task_002",
      dealId: "deal_005",
      title: "Prepare contract draft",
      description: "Prepare service agreement based on approved quotation",
      priority: "p2",
      status: "in_progress",
      assignedTo: "Legal Team",
      dueDate: "2025-01-20",
      createdAt: "2025-01-15",
    },
  ],

  // ==================== QUOTATION VERSIONS ====================
  quotationVersions: [
    {
      id: "qv_001",
      quotationId: "quote_012",
      version: 1,
      status: "sent",
      totalAmount: 2580000,
      validUntil: "2024-12-15",
      changes: "Initial quotation",
      createdBy: "Sarah Johnson",
      createdAt: "2024-12-01",
    },
    {
      id: "qv_002",
      quotationId: "quote_012",
      version: 2,
      status: "revised",
      totalAmount: 2502600,
      validUntil: "2024-12-31",
      changes: "Applied 3% discount for 2-year commitment",
      createdBy: "Sarah Johnson",
      createdAt: "2024-12-18",
    },
    {
      id: "qv_003",
      quotationId: "quote_012",
      version: 3,
      status: "accepted",
      totalAmount: 2502600,
      validUntil: "2025-01-31",
      changes: "Extended validity period",
      createdBy: "Sarah Johnson",
      createdAt: "2025-01-05",
      acceptedAt: "2025-01-15",
    },
  ],

  // ==================== CONTRACT AMENDMENTS ====================
  contractAmendments: [
    {
      id: "amend_001",
      contractId: "contract_001",
      amendmentNumber: 1,
      type: "price_adjustment",
      description: "Annual price adjustment based on CPI",
      oldValue: "$50,000/month",
      newValue: "$52,000/month",
      effectiveDate: "2025-01-01",
      status: "active",
      approvedBy: "John Smith",
      approvedAt: "2024-12-15",
      createdAt: "2024-12-01",
    },
  ],

  // ==================== USERS & TEAMS ====================
  users: [
    {
      id: "user_001",
      email: "sarah.johnson@scglogistics.com",
      firstName: "Sarah",
      lastName: "Johnson",
      role: "sales_manager",
      department: "sales",
      team: "enterprise_sales",
      manager: "user_010",
      phone: "+66 2 123 4567",
      mobile: "+66 81 234 5678",
      branch: "bkk_head",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      isActive: true,
      lastLogin: "2025-01-29T08:30:00Z",
      createdAt: "2023-01-15",
    },
    {
      id: "user_002",
      email: "michael.chen@scglogistics.com",
      firstName: "Michael",
      lastName: "Chen",
      role: "sales_rep",
      department: "sales",
      team: "smb_sales",
      manager: "user_001",
      phone: "+66 2 123 4568",
      mobile: "+66 82 345 6789",
      branch: "bkk_bangna",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      isActive: true,
      lastLogin: "2025-01-29T09:15:00Z",
      createdAt: "2023-03-20",
    },
    {
      id: "user_003",
      email: "david.kim@scglogistics.com",
      firstName: "David",
      lastName: "Kim",
      role: "account_manager",
      department: "sales",
      team: "enterprise_sales",
      manager: "user_001",
      phone: "+66 2 123 4569",
      mobile: "+66 83 456 7890",
      branch: "bkk_head",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      isActive: true,
      lastLogin: "2025-01-29T07:45:00Z",
      createdAt: "2023-06-10",
    },
    {
      id: "user_010",
      email: "john.smith@scglogistics.com",
      firstName: "John",
      lastName: "Smith",
      role: "admin",
      department: "management",
      team: "leadership",
      phone: "+66 2 123 4560",
      mobile: "+66 80 123 4567",
      branch: "bkk_head",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      isActive: true,
      lastLogin: "2025-01-29T08:00:00Z",
      createdAt: "2022-01-01",
    },
  ],

  teams: [
    {
      id: "team_001",
      name: "Enterprise Sales",
      code: "ENT-SALES",
      department: "sales",
      manager: "user_001",
      members: ["user_001", "user_003", "user_004"],
      description: "Enterprise and strategic account sales team",
      isActive: true,
      createdAt: "2023-01-01",
    },
    {
      id: "team_002",
      name: "SMB Sales",
      code: "SMB-SALES",
      department: "sales",
      manager: "user_002",
      members: ["user_002", "user_005", "user_006"],
      description: "Small and medium business sales team",
      isActive: true,
      createdAt: "2023-01-01",
    },
  ],

  // ==================== AUDIT LOGS ====================
  auditLogs: [
    {
      id: "audit_001",
      timestamp: "2025-01-29T10:30:15Z",
      userId: "user_001",
      userName: "Sarah Johnson",
      action: "update",
      entityType: "deal",
      entityId: "deal_005",
      entityName: "CP Foods - Cold Chain Logistics",
      changes: {
        status: { old: "negotiation", new: "closed_won" },
        value: { old: 2500000, new: 2502600 },
      },
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
      module: "deals",
    },
    {
      id: "audit_002",
      timestamp: "2025-01-29T09:15:22Z",
      userId: "user_002",
      userName: "Michael Chen",
      action: "create",
      entityType: "quotation",
      entityId: "quote_025",
      entityName: "QT-BKK-2501-0025",
      ipAddress: "192.168.1.105",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...",
      module: "quotations",
    },
    {
      id: "audit_003",
      timestamp: "2025-01-29T08:45:10Z",
      userId: "user_003",
      userName: "David Kim",
      action: "export",
      entityType: "customer",
      entityId: "export_batch_001",
      entityName: "Customer List Export",
      metadata: {
        format: "xlsx",
        recordCount: 150,
        filters: { status: "active", segment: "enterprise" },
      },
      ipAddress: "192.168.1.110",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
      module: "customers",
    },
    {
      id: "audit_004",
      timestamp: "2025-01-29T08:30:00Z",
      userId: "user_001",
      userName: "Sarah Johnson",
      action: "login",
      entityType: "system",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
      module: "auth",
    },
  ],

  // ==================== NOTIFICATIONS ====================
  notifications: [
    {
      id: "notif_001",
      userId: "user_001",
      type: "deal_won",
      title: "Deal Closed Won",
      message: "Congratulations! Deal 'CP Foods - Cold Chain Logistics' has been closed won.",
      isRead: false,
      priority: "high",
      actionUrl: "/deals/deal_005",
      createdAt: "2025-01-29T10:30:15Z",
    },
    {
      id: "notif_002",
      userId: "user_001",
      type: "contract_expiring",
      title: "Contract Expiring Soon",
      message: "Contract 'CT-001' with 'Unilever Thailand' expires in 30 days.",
      isRead: false,
      priority: "medium",
      actionUrl: "/contracts/contract_001",
      createdAt: "2025-01-29T08:00:00Z",
    },
    {
      id: "notif_003",
      userId: "user_002",
      type: "quotation_viewed",
      title: "Quotation Viewed",
      message: "Customer has viewed quotation 'QT-BKK-2501-0020'.",
      isRead: true,
      priority: "low",
      actionUrl: "/quotations/quote_020",
      createdAt: "2025-01-28T14:30:00Z",
    },
  ],

  // ==================== DASHBOARDS ====================
  customDashboards: [
    {
      id: "dash_001",
      userId: "user_001",
      name: "My Sales Dashboard",
      description: "Personal sales performance dashboard",
      isDefault: true,
      layout: [
        { id: "widget_001", type: "kpi", metric: "total_revenue", size: "small", position: { x: 0, y: 0 } },
        { id: "widget_002", type: "kpi", metric: "conversion_rate", size: "small", position: { x: 1, y: 0 } },
        { id: "widget_003", type: "chart", chartType: "pipeline", size: "large", position: { x: 0, y: 1 } },
        { id: "widget_004", type: "chart", chartType: "revenue_trend", size: "large", position: { x: 0, y: 2 } },
      ],
      filters: {
        timeRange: "this_month",
        userId: "user_001",
      },
      createdAt: "2024-01-15",
      updatedAt: "2025-01-20",
    },
  ],

  // ==================== SAVED FILTERS ====================
  savedFilters: [
    {
      id: "filter_001",
      userId: "user_001",
      module: "customers",
      name: "High-Value Enterprise Customers",
      filters: {
        segment: "enterprise",
        tags: ["vip", "high_value"],
        minRevenue: 1000000,
        status: "active",
      },
      isDefault: false,
      createdAt: "2024-06-15",
    },
    {
      id: "filter_002",
      userId: "user_001",
      module: "deals",
      name: "Hot Deals This Quarter",
      filters: {
        stage: ["proposal", "negotiation"],
        probability: { min: 60 },
        expectedCloseDate: "this_quarter",
      },
      isDefault: true,
      createdAt: "2024-12-01",
    },
  ],
};

// Helper functions for mock data
export const getMockUserById = (userId: string) => {
  return advancedMockData.users.find(u => u.id === userId);
};

export const getMockActivitiesByCustomer = (customerId: string) => {
  return advancedMockData.activities.filter(a => a.customerId === customerId);
};

export const getMockActivitiesByDeal = (dealId: string) => {
  return advancedMockData.dealActivities.filter(a => a.dealId === dealId);
};

export const getMockAuditLogs = (filters?: { userId?: string; entityType?: string; action?: string; dateFrom?: string; dateTo?: string }) => {
  let logs = advancedMockData.auditLogs;
  
  if (filters?.userId) {
    logs = logs.filter(log => log.userId === filters.userId);
  }
  
  if (filters?.entityType) {
    logs = logs.filter(log => log.entityType === filters.entityType);
  }
  
  if (filters?.action) {
    logs = logs.filter(log => log.action === filters.action);
  }
  
  return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};