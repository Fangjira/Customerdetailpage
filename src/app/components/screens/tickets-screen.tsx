import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "../ui/dropdown-menu";
import { ScrollArea } from "../ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Search,
  Plus,
  Filter,
  Phone,
  Mail,
  MessageCircle,
  AlertTriangle,
  Clock,
  User,
  Building2,
  Calendar,
  Tag,
  Paperclip,
  CheckCircle2,
  XCircle,
  History as HistoryIcon,
  Download,
  ChevronDown,
  MoreHorizontal,
  Eye,
  CheckSquare,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCRM } from "../../../context/CRMContext";
import { masterData, generateTicketNumber, getSLADeadline, getSLAStatus } from "../../../data/masterData";
import { generateId } from "../../../utils/helpers";
import { StatusBadge } from "../common/StatusBadge";
import { PriorityBadge } from "../common/PriorityBadge";
import { SLAIndicator } from "../common/SLAIndicator";
import { EmptyState } from "../common/EmptyState";
import { LoadingSkeleton } from "../common/LoadingSkeleton";
import { HistoryDialog } from "../common/HistoryDialog";
import { formatDate, formatRelativeTime, getDaysAgo } from "../../../utils/helpers";
import { Ticket } from "../../../types/crm";

export function TicketsScreen() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language as 'th' | 'en';
  const { tickets, addTicket, updateTicket, customers } = useCRM();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<string[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historyEntityId, setHistoryEntityId] = useState<string>("");
  const [isLoading] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);

  // Filter tickets
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = 
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customerName?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory.length === 0 || selectedCategory.includes(ticket.category);
    const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(ticket.status);
    const matchesPriority = selectedPriority.length === 0 || selectedPriority.includes(ticket.priority);
    
    return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
  });

  // Group by SLA status
  const onTimeTickets = filteredTickets.filter(t => t.slaStatus === "on-time" && t.status !== "closed");
  const warningTickets = filteredTickets.filter(t => t.slaStatus === "warning");
  const overdueTickets = filteredTickets.filter(t => t.slaStatus === "overdue");
  const closedTickets = filteredTickets.filter(t => t.status === "closed");

  const handleCreateTicket = (data: any) => {
    const newTicket: Ticket = {
      id: generateId("TK"),
      ticketNumber: generateTicketNumber(data.branch, data.category),
      title: data.title,
      description: data.description,
      category: data.category,
      priority: data.priority,
      status: "new",
      customerId: data.customerId,
      customerName: data.customerName,
      contactPerson: data.contactPerson,
      contactPhone: data.contactPhone,
      contactEmail: data.contactEmail,
      assignedTo: data.assignedTo,
      assignedTeam: data.assignedTeam,
      branch: data.branch,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      dueDate: data.dueDate,
      slaDeadline: getSLADeadline(data.priority, new Date()).toISOString(),
      slaStatus: "on-time",
      followUpType: data.followUpType || "none",
      reminderDate: data.reminderDate,
      source: data.source,
      tags: data.tags || [],
      attachments: [],
    };
    
    addTicket(newTicket);
    setIsCreateDialogOpen(false);
  };

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsDetailDialogOpen(true);
  };

  const handleStatusChange = (ticketId: string, newStatus: string) => {
    updateTicket(ticketId, { 
      status: newStatus as any,
      closedAt: newStatus === "closed" ? new Date().toISOString() : undefined,
    });
  };

  const handleViewHistory = (ticketId: string) => {
    setHistoryEntityId(ticketId);
    setIsHistoryOpen(true);
  };

  const toggleTicketSelection = (id: string) => {
    setSelectedTickets(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedTickets.length === filteredTickets.length) {
      setSelectedTickets([]);
    } else {
      setSelectedTickets(filteredTickets.map(t => t.id));
    }
  };

  const clearAllFilters = () => {
    setSelectedCategory([]);
    setSelectedStatus([]);
    setSelectedPriority([]);
    setSearchQuery("");
  };

  const hasActiveFilters = selectedCategory.length > 0 || selectedStatus.length > 0 || 
                          selectedPriority.length > 0 || searchQuery !== "";

  // Calculate SLA progress (0-100)
  const getSLAProgress = (ticket: Ticket) => {
    if (ticket.status === "closed") return 100;
    
    const now = new Date().getTime();
    const created = new Date(ticket.createdAt).getTime();
    const deadline = new Date(ticket.slaDeadline).getTime();
    const total = deadline - created;
    const elapsed = now - created;
    const progress = Math.min(100, Math.max(0, (elapsed / total) * 100));
    
    return Math.round(progress);
  };

  return (
    <div className="p-8">
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-foreground">
              {t("nav.tickets")}
            </h1>
            <p className="text-muted-foreground mt-1">
              {t("tickets.subtitle")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsHistoryOpen(true)}
              className="rounded-xl h-10 w-10"
            >
              <HistoryIcon className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="rounded-xl gap-2 bg-primary hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" />
              {t("tickets.create_ticket")}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t("tickets.on_time")}</p>
                  <p className="text-2xl text-foreground mt-1">
                    {onTimeTickets.length}
                  </p>
                </div>
                <div className="h-12 w-12 bg-[#dcfce7] dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-[#166534] dark:text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t("tickets.warning")}</p>
                  <p className="text-2xl text-foreground mt-1">
                    {warningTickets.length}
                  </p>
                </div>
                <div className="h-12 w-12 bg-[#fef3c7] dark:bg-yellow-900/30 rounded-xl flex items-center justify-center">
                  <Clock className="h-6 w-6 text-[#92400e] dark:text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t("tickets.overdue")}</p>
                  <p className="text-2xl text-foreground mt-1">
                    {overdueTickets.length}
                  </p>
                </div>
                <div className="h-12 w-12 bg-[#fee2e2] dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-[#991b1b] dark:text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t("tickets.closed")}</p>
                  <p className="text-2xl text-foreground mt-1">
                    {closedTickets.length}
                  </p>
                </div>
                <div className="h-12 w-12 bg-muted rounded-xl flex items-center justify-center">
                  <XCircle className="h-6 w-6 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Search and Filters Row */}
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t("common.search")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 rounded-xl"
                  />
                </div>
                
                {/* Category Filter */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="rounded-xl gap-2"
                    >
                      <Filter className="h-4 w-4" />
                      {t("common.category")}
                      {selectedCategory.length > 0 && (
                        <Badge className="ml-1 bg-primary text-primary-foreground h-5 w-5 rounded-full p-0 flex items-center justify-center">
                          {selectedCategory.length}
                        </Badge>
                      )}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {masterData.ticketCategories.map((cat) => (
                      <DropdownMenuCheckboxItem
                        key={cat.value}
                        checked={selectedCategory.includes(cat.value)}
                        onCheckedChange={(checked) => {
                          setSelectedCategory(prev =>
                            checked ? [...prev, cat.value] : prev.filter(c => c !== cat.value)
                          );
                        }}
                      >
                        {cat.label[locale]}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Status Filter */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="rounded-xl gap-2"
                    >
                      <Filter className="h-4 w-4" />
                      {t("common.status")}
                      {selectedStatus.length > 0 && (
                        <Badge className="ml-1 bg-primary text-primary-foreground h-5 w-5 rounded-full p-0 flex items-center justify-center">
                          {selectedStatus.length}
                        </Badge>
                      )}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {masterData.ticketStatuses.map((status) => (
                      <DropdownMenuCheckboxItem
                        key={status.value}
                        checked={selectedStatus.includes(status.value)}
                        onCheckedChange={(checked) => {
                          setSelectedStatus(prev =>
                            checked ? [...prev, status.value] : prev.filter(s => s !== status.value)
                          );
                        }}
                      >
                        {status.label[locale]}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Priority Filter */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="rounded-xl gap-2"
                    >
                      <Filter className="h-4 w-4" />
                      {t("common.priority")}
                      {selectedPriority.length > 0 && (
                        <Badge className="ml-1 bg-primary text-primary-foreground h-5 w-5 rounded-full p-0 flex items-center justify-center">
                          {selectedPriority.length}
                        </Badge>
                      )}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {masterData.priorities.map((priority) => (
                      <DropdownMenuCheckboxItem
                        key={priority.value}
                        checked={selectedPriority.includes(priority.value)}
                        onCheckedChange={(checked) => {
                          setSelectedPriority(prev =>
                            checked ? [...prev, priority.value] : prev.filter(p => p !== priority.value)
                          );
                        }}
                      >
                        {priority.label[locale]}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    onClick={clearAllFilters}
                    className="rounded-xl gap-2"
                  >
                    <XCircle className="h-4 w-4" />
                    {t("common.clear_filters")}
                  </Button>
                )}
              </div>

              {/* Bulk Actions */}
              {selectedTickets.length > 0 && (
                <div className="flex items-center justify-between p-3 bg-primary/5 rounded-xl border border-primary/20">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedTickets.length === filteredTickets.length}
                      onCheckedChange={toggleSelectAll}
                    />
                    <span className="text-sm text-foreground">
                      {selectedTickets.length} {t("common.selected")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-lg gap-2"
                    >
                      <CheckSquare className="h-4 w-4" />
                      {t("tickets.bulk_close")}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-lg gap-2"
                    >
                      <Download className="h-4 w-4" />
                      {t("common.export")}
                    </Button>
                  </div>
                </div>
              )}

              {/* Results Info */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {t("common.showing")} {filteredTickets.length} {t("common.of")} {tickets.length} {t("common.tickets")}
                </p>
              </div>

              {/* Tickets List - Card Based */}
              <div className="space-y-3 mt-6">
                {isLoading ? (
                  <LoadingSkeleton type="list" count={5} />
                ) : filteredTickets.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-foreground">{t("tickets.no_tickets")}</p>
                    <p className="text-sm text-muted-foreground mt-1">{t("tickets.no_tickets_description")}</p>
                  </div>
                ) : (
                  filteredTickets.map((ticket) => {
                    const categoryData = masterData.ticketCategories.find(c => c.value === ticket.category);
                    const progress = getSLAProgress(ticket);
                    
                    return (
                      <div
                        key={ticket.id}
                        className="border rounded-2xl p-5 hover:bg-accent/50 transition-all bg-card group"
                      >
                        <div className="flex items-center gap-6">
                          {/* Checkbox */}
                          <Checkbox
                            checked={selectedTickets.includes(ticket.id)}
                            onCheckedChange={() => toggleTicketSelection(ticket.id)}
                            onClick={(e) => e.stopPropagation()}
                          />

                          {/* Ticket Info - Left */}
                          <div 
                            className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
                            onClick={() => handleTicketClick(ticket)}
                          >
                            <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                              <MessageCircle className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="text-foreground truncate">
                                  {ticket.title}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">{ticket.ticketNumber}</span>
                                <span className="text-muted-foreground">•</span>
                                <Badge className="bg-[#ede9fe] text-[#5b21b6] border-[#c4b5fd]">
                                  {categoryData?.label[locale]}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          {/* Customer - Middle */}
                          {ticket.customerName && (
                            <div className="flex items-center gap-3 w-56 flex-shrink-0">
                              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <User className="h-5 w-5 text-primary" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm text-foreground truncate">
                                  {ticket.customerName}
                                </p>
                                {ticket.contactPerson && (
                                  <p className="text-xs text-muted-foreground truncate">{ticket.contactPerson}</p>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Date & Progress */}
                          <div className="w-64 flex-shrink-0">
                            <div className="flex items-center gap-2 mb-2">
                              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{formatRelativeTime(ticket.createdAt, locale)}</span>
                            </div>
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="text-xs text-muted-foreground">
                                {ticket.status === "closed" ? t("tickets.closed") : "SLA Progress"}
                              </span>
                              <span className="text-xs text-primary ml-auto">
                                {progress}%
                              </span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all ${
                                  ticket.slaStatus === "overdue" ? "bg-red-500" :
                                  ticket.slaStatus === "warning" ? "bg-yellow-500" :
                                  "bg-primary"
                                }`}
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>

                          {/* Status & Priority - Right */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <PriorityBadge priority={ticket.priority} />
                            <StatusBadge status={ticket.status} />
                          </div>

                          {/* Actions Menu */}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleTicketClick(ticket)}>
                                <Eye className="h-4 w-4 mr-2" />
                                {t("common.view_details")}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleViewHistory(ticket.id)}>
                                <HistoryIcon className="h-4 w-4 mr-2" />
                                {t("common.history")}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                {t("common.export")}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Ticket Dialog */}
      <CreateTicketDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleCreateTicket}
      />

      {/* Ticket Detail Dialog */}
      {selectedTicket && (
        <TicketDetailDialog
          ticket={selectedTicket}
          open={isDetailDialogOpen}
          onClose={() => {
            setIsDetailDialogOpen(false);
            setSelectedTicket(null);
          }}
          onStatusChange={handleStatusChange}
          onViewHistory={handleViewHistory}
        />
      )}

      {/* History Dialog */}
      <HistoryDialog
        open={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        entityId={historyEntityId}
        entityType="Ticket"
      />
    </div>
  );
}

// Create Ticket Dialog Component
function CreateTicketDialog({ open, onClose, onSubmit }: any) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language as 'th' | 'en';
  const { customers, currentUser } = useCRM();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "p3",
    customerId: "",
    customerName: "",
    contactPerson: "",
    contactPhone: "",
    contactEmail: "",
    assignedTo: currentUser.name,
    assignedTeam: "",
    branch: currentUser.branch,
    dueDate: "",
    followUpType: "none",
    reminderDate: "",
    source: "phone",
    tags: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form
    setFormData({
      title: "",
      description: "",
      category: "",
      priority: "p3",
      customerId: "",
      customerName: "",
      contactPerson: "",
      contactPhone: "",
      contactEmail: "",
      assignedTo: currentUser.name,
      assignedTeam: "",
      branch: currentUser.branch,
      dueDate: "",
      followUpType: "none",
      reminderDate: "",
      source: "phone",
      tags: [],
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">{t("tickets.create_ticket")}</DialogTitle>
        
          <DialogDescription className="sr-only">
            Dialog description
          </DialogDescription></DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">{t("common.title")} *</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder={t("tickets.title_placeholder")}
              required
              className="bg-card border-border text-foreground"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">{t("common.description")} *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={t("tickets.description_placeholder")}
              className="w-full min-h-[100px] p-3 border border-border rounded-lg resize-none bg-card text-foreground"
              required
            />
          </div>

          {/* Category & Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">{t("common.category")} *</label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
                required
              >
                <SelectTrigger className="bg-card border-border text-foreground">
                  <SelectValue placeholder={t("common.select_category")} />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {masterData.ticketCategories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value} className="text-foreground">
                      {cat.label[locale]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">{t("common.priority")} *</label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger className="bg-card border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {masterData.priorities.map((priority) => (
                    <SelectItem key={priority.value} value={priority.value} className="text-foreground">
                      {priority.label[locale]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Customer Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">{t("common.customer")}</label>
            <Select
              value={formData.customerId}
              onValueChange={(value) => {
                const customer = customers.find(c => c.id === value);
                setFormData({ 
                  ...formData, 
                  customerId: value,
                  customerName: customer?.name || "",
                  contactPerson: customer?.contactPerson || "",
                  contactPhone: customer?.phone || "",
                  contactEmail: customer?.email || "",
                });
              }}
            >
              <SelectTrigger className="bg-card border-border text-foreground">
                <SelectValue placeholder={t("common.select_customer")} />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {customers.map((customer) => (
                  <SelectItem key={customer.id} value={customer.id} className="text-foreground">
                    {customer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">{t("common.contact_person")}</label>
              <Input
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                placeholder={t("common.name")}
                className="bg-card border-border text-foreground"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">{t("common.phone")}</label>
              <Input
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                placeholder="+66-X-XXXX-XXXX"
                className="bg-card border-border text-foreground"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">{t("common.email")}</label>
              <Input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                placeholder="email@example.com"
                className="bg-card border-border text-foreground"
              />
            </div>
          </div>

          {/* Source & Follow-up */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">{t("common.source")} *</label>
              <Select
                value={formData.source}
                onValueChange={(value) => setFormData({ ...formData, source: value })}
              >
                <SelectTrigger className="bg-card border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {masterData.contactSources.map((source) => (
                    <SelectItem key={source.value} value={source.value} className="text-foreground">
                      {source.label[locale]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">{t("common.follow_up_type")}</label>
              <Select
                value={formData.followUpType}
                onValueChange={(value) => setFormData({ ...formData, followUpType: value })}
              >
                <SelectTrigger className="bg-card border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {masterData.followUpTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value} className="text-foreground">
                      {type.label[locale]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose} className="border-border text-foreground hover:bg-accent/50">
              {t("common.cancel")}
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {t("tickets.create_ticket")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Ticket Detail Dialog Component  
function TicketDetailDialog({ ticket, open, onClose, onStatusChange, onViewHistory }: any) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language as 'th' | 'en';
  
  const categoryData = masterData.ticketCategories.find(c => c.value === ticket.category);
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-card border-border">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-foreground">{ticket.title}</DialogTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewHistory(ticket.id)}
              className="border-border text-foreground hover:bg-accent/50"
            >
              <HistoryIcon className="h-4 w-4 mr-2" />
              {t("common.history")}
            </Button>
          </div>
        
          <DialogDescription className="sr-only">
            Dialog description
          </DialogDescription></DialogHeader>
        
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-6">
            {/* Header Info */}
            <div className="flex items-start justify-between pb-4 border-b border-border">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-border text-foreground">{ticket.ticketNumber}</Badge>
                  <PriorityBadge priority={ticket.priority} />
                  <StatusBadge status={ticket.status} />
                </div>
                <p className="text-sm text-muted-foreground">
                  {categoryData?.label[locale]} • {formatRelativeTime(ticket.createdAt, locale)}
                </p>
              </div>
              
              {ticket.status !== "closed" && (
                <SLAIndicator
                  deadline={ticket.slaDeadline}
                  status={ticket.slaStatus}
                  showTime={true}
                />
              )}
            </div>

            {/* Description */}
            <div>
              <h4 className="font-medium mb-2 text-foreground">{t("common.description")}</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {ticket.description}
              </p>
            </div>

            {/* Customer Info */}
            {ticket.customerName && (
              <div className="p-4 bg-secondary/50 rounded-lg space-y-2 border border-border">
                <h4 className="font-medium text-foreground">{t("common.customer_information")}</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">{t("common.customer")}: </span>
                    <span className="font-medium text-foreground">{ticket.customerName}</span>
                  </div>
                  {ticket.contactPerson && (
                    <div>
                      <span className="text-muted-foreground">{t("common.contact_person")}: </span>
                      <span className="font-medium text-foreground">{ticket.contactPerson}</span>
                    </div>
                  )}
                  {ticket.contactPhone && (
                    <div>
                      <span className="text-muted-foreground">{t("common.phone")}: </span>
                      <span className="font-medium text-foreground">{ticket.contactPhone}</span>
                    </div>
                  )}
                  {ticket.contactEmail && (
                    <div>
                      <span className="text-muted-foreground">{t("common.email")}: </span>
                      <span className="font-medium text-foreground">{ticket.contactEmail}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Assignment */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">{t("common.assigned_to")}: </span>
                <span className="font-medium text-foreground">{ticket.assignedTo || t("common.unassigned")}</span>
              </div>
              <div>
                <span className="text-muted-foreground">{t("common.branch")}: </span>
                <span className="font-medium text-foreground">
                  {masterData.branches.find(b => b.value === ticket.branch)?.label[locale]}
                </span>
              </div>
            </div>

            {/* Status Change */}
            <div className="space-y-2 pt-4 border-t border-border">
              <label className="text-sm font-medium text-foreground">{t("common.change_status")}</label>
              <Select
                value={ticket.status}
                onValueChange={(value) => onStatusChange(ticket.id, value)}
              >
                <SelectTrigger className="bg-card border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {masterData.ticketStatuses.map((status) => (
                    <SelectItem key={status.value} value={status.value} className="text-foreground">
                      {status.label[locale]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}