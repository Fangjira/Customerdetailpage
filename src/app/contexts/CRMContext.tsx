import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Customer,
  Lead,
  Deal,
  Quotation,
  Contract,
  Ticket,
  Task,
  Approval,
  HistoryEntry,
  User,
  Notification
} from '../../types/crm';
import {
  mockCustomers,
  mockLeads,
  mockDeals,
  mockQuotations,
  mockContracts,
  mockTickets,
  mockTasks,
  mockApprovals,
  mockHistory
} from '../../data/mockData';
import { loadFromLocalStorage, saveToLocalStorage, generateId } from '../../utils/helpers';

interface CRMContextType {
  // Data
  customers: Customer[];
  leads: Lead[];
  deals: Deal[];
  quotations: Quotation[];
  contracts: Contract[];
  tickets: Ticket[];
  tasks: Task[];
  approvals: Approval[];
  history: HistoryEntry[];
  notifications: Notification[];
  
  // Current User
  currentUser: User;
  
  // Actions
  addCustomer: (customer: Customer) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  
  addLead: (lead: Lead) => void;
  updateLead: (id: string, lead: Partial<Lead>) => void;
  convertLeadToCustomer: (leadId: string) => Customer;
  
  addDeal: (deal: Deal) => void;
  updateDeal: (id: string, deal: Partial<Deal>) => void;
  deleteDeal: (id: string) => void;
  
  addQuotation: (quotation: Quotation) => void;
  updateQuotation: (id: string, quotation: Partial<Quotation>) => void;
  deleteQuotation: (id: string) => void;
  
  addContract: (contract: Contract) => void;
  updateContract: (id: string, contract: Partial<Contract>) => void;
  
  addTicket: (ticket: Ticket) => void;
  updateTicket: (id: string, ticket: Partial<Ticket>) => void;
  deleteTicket: (id: string) => void;
  
  addTask: (task: Task) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;
  
  addApproval: (approval: Approval) => void;
  updateApproval: (id: string, approval: Partial<Approval>) => void;
  approveWorkflowStage: (approvalId: string, stageId: string, comment?: string) => void;
  rejectWorkflowStage: (approvalId: string, stageId: string, reason: string) => void;
  
  addHistory: (entry: Omit<HistoryEntry, 'id' | 'timestamp'>) => void;
  getEntityHistory: (entityId: string) => HistoryEntry[];
  
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  
  // Filters
  filterByBranch: (branch: string) => void;
  resetFilters: () => void;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export function CRMProvider({ children }: { children: ReactNode }) {
  // Load from localStorage or use mock data
  const [customers, setCustomers] = useState<Customer[]>(() => 
    loadFromLocalStorage('crm_customers', mockCustomers)
  );
  const [leads, setLeads] = useState<Lead[]>(() => 
    loadFromLocalStorage('crm_leads', mockLeads)
  );
  const [deals, setDeals] = useState<Deal[]>(() => 
    loadFromLocalStorage('crm_deals', mockDeals)
  );
  const [quotations, setQuotations] = useState<Quotation[]>(() => 
    loadFromLocalStorage('crm_quotations', mockQuotations)
  );
  const [contracts, setContracts] = useState<Contract[]>(() => 
    loadFromLocalStorage('crm_contracts', mockContracts)
  );
  const [tickets, setTickets] = useState<Ticket[]>(() => 
    loadFromLocalStorage('crm_tickets', mockTickets)
  );
  const [tasks, setTasks] = useState<Task[]>(() => 
    loadFromLocalStorage('crm_tasks', mockTasks)
  );
  const [approvals, setApprovals] = useState<Approval[]>(() => 
    loadFromLocalStorage('crm_approvals', mockApprovals)
  );
  const [history, setHistory] = useState<HistoryEntry[]>(() => 
    loadFromLocalStorage('crm_history', mockHistory)
  );
  const [notifications, setNotifications] = useState<Notification[]>(() => 
    loadFromLocalStorage('crm_notifications', [])
  );

  const [currentUser] = useState<User>({
    id: 'user-001',
    name: 'Admin User',
    email: 'admin@crm.com',
    role: 'admin',
    branch: 'bkk_head',
    initials: 'AU',
    status: 'active',
    permissions: ['all'],
    language: 'th',
    theme: 'light',
    notifications: true,
  });

  // Save to localStorage when data changes
  useEffect(() => {
    saveToLocalStorage('crm_customers', customers);
  }, [customers]);

  useEffect(() => {
    saveToLocalStorage('crm_leads', leads);
  }, [leads]);

  useEffect(() => {
    saveToLocalStorage('crm_deals', deals);
  }, [deals]);

  useEffect(() => {
    saveToLocalStorage('crm_quotations', quotations);
  }, [quotations]);

  useEffect(() => {
    saveToLocalStorage('crm_contracts', contracts);
  }, [contracts]);

  useEffect(() => {
    saveToLocalStorage('crm_tickets', tickets);
  }, [tickets]);

  useEffect(() => {
    saveToLocalStorage('crm_tasks', tasks);
  }, [tasks]);

  useEffect(() => {
    saveToLocalStorage('crm_approvals', approvals);
  }, [approvals]);

  useEffect(() => {
    saveToLocalStorage('crm_history', history);
  }, [history]);

  useEffect(() => {
    saveToLocalStorage('crm_notifications', notifications);
  }, [notifications]);

  // History helper
  const addHistory = (entry: Omit<HistoryEntry, 'id' | 'timestamp'>) => {
    const newEntry: HistoryEntry = {
      ...entry,
      id: generateId('hist'),
      timestamp: new Date().toISOString(),
      user: currentUser.name,
    };
    setHistory(prev => [newEntry, ...prev]);
  };

  const getEntityHistory = (entityId: string): HistoryEntry[] => {
    return history.filter(h => h.entityId === entityId);
  };

  // Customer actions
  const addCustomer = (customer: Customer) => {
    setCustomers(prev => [...prev, customer]);
    addHistory({
      action: 'created',
      entity: 'Customer',
      entityId: customer.id,
      description: `Created customer ${customer.name}`,
    });
  };

  const updateCustomer = (id: string, updates: Partial<Customer>) => {
    setCustomers(prev => prev.map(c => 
      c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
    ));
    
    const customer = customers.find(c => c.id === id);
    if (customer) {
      Object.keys(updates).forEach(key => {
        const field = key as keyof Customer;
        if (customer[field] !== updates[field]) {
          addHistory({
            action: 'updated',
            entity: 'Customer',
            entityId: id,
            field: key,
            oldValue: customer[field],
            newValue: updates[field],
            description: `Updated ${key}`,
          });
        }
      });
    }
  };

  const deleteCustomer = (id: string) => {
    const customer = customers.find(c => c.id === id);
    setCustomers(prev => prev.filter(c => c.id !== id));
    if (customer) {
      addHistory({
        action: 'deleted',
        entity: 'Customer',
        entityId: id,
        description: `Deleted customer ${customer.name}`,
      });
    }
  };

  // Lead actions
  const addLead = (lead: Lead) => {
    setLeads(prev => [...prev, lead]);
    addHistory({
      action: 'created',
      entity: 'Lead',
      entityId: lead.id,
      description: `Created lead ${lead.name}`,
    });
  };

  const updateLead = (id: string, updates: Partial<Lead>) => {
    setLeads(prev => prev.map(l => 
      l.id === id ? { ...l, ...updates, updatedAt: new Date().toISOString() } : l
    ));
    
    const lead = leads.find(l => l.id === id);
    if (lead) {
      addHistory({
        action: 'updated',
        entity: 'Lead',
        entityId: id,
        description: `Updated lead ${lead.name}`,
      });
    }
  };

  const convertLeadToCustomer = (leadId: string): Customer => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) throw new Error('Lead not found');
    
    const customer: Customer = {
      ...lead,
      id: generateId('CUST-2024'),
      status: 'existing',
    };
    
    addCustomer(customer);
    setLeads(prev => prev.filter(l => l.id !== leadId));
    
    addHistory({
      action: 'updated',
      entity: 'Lead',
      entityId: leadId,
      description: `Converted lead ${lead.name} to customer`,
    });
    
    return customer;
  };

  // Deal actions
  const addDeal = (deal: Deal) => {
    setDeals(prev => [...prev, deal]);
    addHistory({
      action: 'created',
      entity: 'Deal',
      entityId: deal.id,
      description: `Created deal ${deal.name}`,
    });
  };

  const updateDeal = (id: string, updates: Partial<Deal>) => {
    setDeals(prev => prev.map(d => 
      d.id === id ? { ...d, ...updates, updatedAt: new Date().toISOString() } : d
    ));
    
    const deal = deals.find(d => d.id === id);
    if (deal && updates.stage && deal.stage !== updates.stage) {
      addHistory({
        action: 'status_changed',
        entity: 'Deal',
        entityId: id,
        field: 'stage',
        oldValue: deal.stage,
        newValue: updates.stage,
        description: `Moved deal to ${updates.stage}`,
      });
    }
  };

  const deleteDeal = (id: string) => {
    const deal = deals.find(d => d.id === id);
    setDeals(prev => prev.filter(d => d.id !== id));
    if (deal) {
      addHistory({
        action: 'deleted',
        entity: 'Deal',
        entityId: id,
        description: `Deleted deal ${deal.name}`,
      });
    }
  };

  // Quotation actions
  const addQuotation = (quotation: Quotation) => {
    setQuotations(prev => [...prev, quotation]);
    addHistory({
      action: 'created',
      entity: 'Quotation',
      entityId: quotation.id,
      description: `Created quotation ${quotation.quotationNumber}`,
    });
  };

  const updateQuotation = (id: string, updates: Partial<Quotation>) => {
    setQuotations(prev => prev.map(q => 
      q.id === id ? { ...q, ...updates } : q
    ));
    
    const quotation = quotations.find(q => q.id === id);
    if (quotation && updates.status && quotation.status !== updates.status) {
      addHistory({
        action: 'status_changed',
        entity: 'Quotation',
        entityId: id,
        field: 'status',
        oldValue: quotation.status,
        newValue: updates.status,
        description: `Quotation status changed to ${updates.status}`,
      });
    }
  };

  const deleteQuotation = (id: string) => {
    const quotation = quotations.find(q => q.id === id);
    setQuotations(prev => prev.filter(q => q.id !== id));
    if (quotation) {
      addHistory({
        action: 'deleted',
        entity: 'Quotation',
        entityId: id,
        description: `Deleted quotation ${quotation.quotationNumber}`,
      });
    }
  };

  // Contract actions
  const addContract = (contract: Contract) => {
    setContracts(prev => [...prev, contract]);
    addHistory({
      action: 'created',
      entity: 'Contract',
      entityId: contract.id,
      description: `Created contract ${contract.contractNumber}`,
    });
  };

  const updateContract = (id: string, updates: Partial<Contract>) => {
    setContracts(prev => prev.map(c => 
      c.id === id ? { ...c, ...updates } : c
    ));
    
    const contract = contracts.find(c => c.id === id);
    if (contract) {
      addHistory({
        action: 'updated',
        entity: 'Contract',
        entityId: id,
        description: `Updated contract ${contract.contractNumber}`,
      });
    }
  };

  // Ticket actions
  const addTicket = (ticket: Ticket) => {
    setTickets(prev => [...prev, ticket]);
    addHistory({
      action: 'created',
      entity: 'Ticket',
      entityId: ticket.id,
      description: `Created ticket ${ticket.ticketNumber}`,
    });
    
    // Create notification for assigned user
    if (ticket.assignedTo) {
      addNotification({
        userId: 'user-001',
        title: 'New Ticket Assigned',
        message: `You have been assigned ticket ${ticket.ticketNumber}: ${ticket.title}`,
        type: 'info',
        category: 'ticket',
        actionUrl: `/tickets/${ticket.id}`,
        actionLabel: 'View Ticket',
        relatedId: ticket.id,
        relatedType: 'ticket',
      });
    }
  };

  const updateTicket = (id: string, updates: Partial<Ticket>) => {
    setTickets(prev => prev.map(t => 
      t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
    ));
    
    const ticket = tickets.find(t => t.id === id);
    if (ticket && updates.status && ticket.status !== updates.status) {
      addHistory({
        action: 'status_changed',
        entity: 'Ticket',
        entityId: id,
        field: 'status',
        oldValue: ticket.status,
        newValue: updates.status,
        description: `Ticket status changed to ${updates.status}`,
      });
    }
  };

  const deleteTicket = (id: string) => {
    const ticket = tickets.find(t => t.id === id);
    setTickets(prev => prev.filter(t => t.id !== id));
    if (ticket) {
      addHistory({
        action: 'deleted',
        entity: 'Ticket',
        entityId: id,
        description: `Deleted ticket ${ticket.ticketNumber}`,
      });
    }
  };

  // Task actions
  const addTask = (task: Task) => {
    setTasks(prev => [...prev, task]);
    addHistory({
      action: 'created',
      entity: 'Task',
      entityId: task.id,
      description: `Created task: ${task.title}`,
    });
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, ...updates } : t
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const completeTask = (id: string) => {
    updateTask(id, { 
      status: 'completed', 
      completedAt: new Date().toISOString() 
    });
    
    const task = tasks.find(t => t.id === id);
    if (task) {
      addHistory({
        action: 'status_changed',
        entity: 'Task',
        entityId: id,
        description: `Completed task: ${task.title}`,
      });
    }
  };

  // Approval actions
  const addApproval = (approval: Approval) => {
    setApprovals(prev => [...prev, approval]);
    addHistory({
      action: 'created',
      entity: 'Approval',
      entityId: approval.id,
      description: `Created approval request: ${approval.title}`,
    });
  };

  const updateApproval = (id: string, updates: Partial<Approval>) => {
    setApprovals(prev => prev.map(a => 
      a.id === id ? { ...a, ...updates } : a
    ));
  };

  const approveWorkflowStage = (approvalId: string, stageId: string, comment?: string) => {
    const approval = approvals.find(a => a.id === approvalId);
    if (!approval) return;
    
    const updatedWorkflow = approval.workflow.map(stage => {
      if (stage.id === stageId) {
        return {
          ...stage,
          status: 'approved' as const,
          respondedAt: new Date().toISOString(),
          comments: comment,
        };
      }
      return stage;
    });
    
    const allApproved = updatedWorkflow.every(s => s.status === 'approved');
    
    updateApproval(approvalId, {
      workflow: updatedWorkflow,
      status: allApproved ? 'approved' : 'pending',
      progress: (updatedWorkflow.filter(s => s.status === 'approved').length / updatedWorkflow.length) * 100,
    });
    
    addHistory({
      action: 'approved',
      entity: 'Approval',
      entityId: approvalId,
      description: `Approved stage: ${updatedWorkflow.find(s => s.id === stageId)?.name}`,
    });
  };

  const rejectWorkflowStage = (approvalId: string, stageId: string, reason: string) => {
    const approval = approvals.find(a => a.id === approvalId);
    if (!approval) return;
    
    const updatedWorkflow = approval.workflow.map(stage => {
      if (stage.id === stageId) {
        return {
          ...stage,
          status: 'rejected' as const,
          respondedAt: new Date().toISOString(),
          comments: reason,
        };
      }
      return stage;
    });
    
    updateApproval(approvalId, {
      workflow: updatedWorkflow,
      status: 'rejected',
      rejectedBy: currentUser.name,
      rejectedAt: new Date().toISOString(),
      rejectionReason: reason,
    });
    
    addHistory({
      action: 'rejected',
      entity: 'Approval',
      entityId: approvalId,
      description: `Rejected at stage: ${updatedWorkflow.find(s => s.id === stageId)?.name}`,
    });
  };

  // Notification actions
  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: generateId('notif'),
      createdAt: new Date().toISOString(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true, readAt: new Date().toISOString() } : n
    ));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ 
      ...n, 
      read: true, 
      readAt: new Date().toISOString() 
    })));
  };

  // Filters (placeholder)
  const filterByBranch = (branch: string) => {
    // Implementation would filter all data by branch
    console.log('Filter by branch:', branch);
  };

  const resetFilters = () => {
    // Reset all filters
    console.log('Reset filters');
  };

  const value: CRMContextType = {
    customers,
    leads,
    deals,
    quotations,
    contracts,
    tickets,
    tasks,
    approvals,
    history,
    notifications,
    currentUser,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    addLead,
    updateLead,
    convertLeadToCustomer,
    addDeal,
    updateDeal,
    deleteDeal,
    addQuotation,
    updateQuotation,
    deleteQuotation,
    addContract,
    updateContract,
    addTicket,
    updateTicket,
    deleteTicket,
    addTask,
    updateTask,
    deleteTask,
    completeTask,
    addApproval,
    updateApproval,
    approveWorkflowStage,
    rejectWorkflowStage,
    addHistory,
    getEntityHistory,
    addNotification,
    markNotificationRead,
    markAllNotificationsRead,
    filterByBranch,
    resetFilters,
  };

  return <CRMContext.Provider value={value}>{children}</CRMContext.Provider>;
}

export function useCRM() {
  const context = useContext(CRMContext);
  if (context === undefined) {
    throw new Error('useCRM must be used within a CRMProvider');
  }
  return context;
}
