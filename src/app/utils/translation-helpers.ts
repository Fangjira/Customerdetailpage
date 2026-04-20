// Utility function to get translated deal stage
export function getTranslatedDealStage(stage: string, t: any): string {
  const stageKeyMap: Record<string, string> = {
    "Prospect": "prospect",
    "Approach": "approach",
    "Quotation": "quotation",
    "Negotiating Process": "negotiating",
    "Win": "win",
    "Lose": "lose",
    "On-hold": "on_hold",
    "Transfer": "transfer",
    "Terminate": "terminate",
    "Cancelled": "cancelled"
  };
  
  const key = stageKeyMap[stage] || stage.toLowerCase().replace(/\s+/g, '_');
  return t(`dealStage.${key}`);
}

// Utility function to get translated status
export function getTranslatedStatus(status: string, t: any): string {
  const statusKeyMap: Record<string, string> = {
    "Active": "active",
    "Inactive": "inactive",
    "Pending": "pending",
    "Approved": "approved",
    "Rejected": "rejected",
    "Draft": "draft",
    "Sent": "sent",
    "Completed": "completed",
    "Cancelled": "cancelled",
    "Expired": "expired",
    "Overdue": "overdue",
    "Open": "open",
    "Closed": "closed",
    "In Progress": "in_progress",
    "On Hold": "on_hold"
  };
  
  const key = statusKeyMap[status] || status.toLowerCase().replace(/\s+/g, '_');
  return t(`status.${key}`);
}

// Utility function to get translated priority
export function getTranslatedPriority(priority: string, t: any): string {
  const priorityKeyMap: Record<string, string> = {
    "High": "high",
    "Medium": "medium",
    "Low": "low",
    "Urgent": "urgent",
    "Normal": "normal"
  };
  
  const key = priorityKeyMap[priority] || priority.toLowerCase();
  return t(`priority.${key}`);
}

// Utility function to get translated activity type
export function getTranslatedActivityType(type: string, t: any): string {
  const typeKeyMap: Record<string, string> = {
    "Customer Visit": "customer_visit",
    "Follow Up": "follow_up",
    "Meeting": "meeting",
    "Site Survey": "site_survey",
    "Phone Call": "call",
    "Email": "email",
    "Other": "other"
  };
  
  const key = typeKeyMap[type] || type.toLowerCase().replace(/\s+/g, '_');
  return t(`activityType.${key}`);
}

// Utility function to get translated customer type
export function getTranslatedCustomerType(type: string, t: any): string {
  const typeKeyMap: Record<string, string> = {
    "Enterprise": "enterprise",
    "SME": "sme",
    "Startup": "startup",
    "Government": "government",
    "Non-Profit": "nonprofit",
    "Individual": "individual"
  };
  
  const key = typeKeyMap[type] || type.toLowerCase().replace(/\s+/g, '_');
  return t(`customerType.${key}`);
}

// Utility function to get translated probability
export function getTranslatedProbability(probability: string, t: any): string {
  const probKeyMap: Record<string, string> = {
    "High": "high",
    "Medium": "medium",
    "Low": "low"
  };
  
  const key = probKeyMap[probability] || probability.toLowerCase();
  return t(`probability.${key}`);
}
