import { useState, useEffect, useMemo } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Search,
  Calendar,
  Clock,
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
  Users,
  List,
  BarChart3,
  CheckCircle2,
  Circle,
  AlertCircle,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Filter,
  TrendingUp,
  Target,
  Zap,
  LayoutGrid,
  Table2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRoleTheme } from "../../hooks/use-role-theme";
import { useRole } from "../../contexts/role-context";
import { CheckInDialog } from "../check-in-dialog";
import { QuickActionsMenu } from "../modals/quick-actions-menu";
import { QuickVisitModal } from "../modals/quick-visit-modal";
import { CreateTaskDialog } from "../create-task-dialog";
import { EditTaskDialog } from "../edit-task-dialog";
import { HistoryDialog } from "../history-dialog";
import { TaskCard } from "../task-card";
import { TaskDetailDialog } from "../task-detail-dialog";
import { TasksSummaryView } from "../tasks-summary-view";
import { TasksKanbanView } from "../tasks-kanban-view";
import { TasksCalendarView } from "../tasks-calendar-view";
import { TasksTableView } from "../tasks-table-view";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "todo" | "in-progress" | "completed";
  dueDate: string;
  dueTime: string;
  assignee: string;
  completed: boolean;
  customer?: string;
  relatedTo?: string;
  location?: string;
  contactPerson?: string;
  contactPhone?: string;
  contactEmail?: string;
  activityType?: string;
}

interface TasksScreenProps {
  onNavigate?: (path: string) => void;
  onNavigateWithActivity?: (path: string, activityId: string) => void;
  shouldOpenCreateDialog?: boolean;
  userMode?: 'sales' | 'customer';
}

interface HistoryEntry {
  id: string;
  action: string;
  entity: string;
  user: string;
  timestamp: string;
  description?: string;
  field?: string;
  oldValue?: string;
  newValue?: string;
}

type SortDirection = 'asc' | 'desc' | null;
type SortField = 'dueDate' | 'priority' | 'status';

export function TasksScreen({ onNavigate, onNavigateWithActivity, shouldOpenCreateDialog, userMode = 'sales' }: TasksScreenProps = {}) {
  const { t, i18n } = useTranslation();
  const roleTheme = useRoleTheme();
  const { role } = useRole();
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"list" | "summary">("list");
  const [displayMode, setDisplayMode] = useState<"kanban" | "calendar" | "table">("kanban");
  const [hiddenTaskIds, setHiddenTaskIds] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterOwner, setFilterOwner] = useState<string>("all");
  const [filterActivityType, setFilterActivityType] = useState<string>("all");
  const [filterDateFrom, setFilterDateFrom] = useState<string>("");
  const [filterDateTo, setFilterDateTo] = useState<string>("");
  const [currentMeetingIndex, setCurrentMeetingIndex] = useState(0);
  const [isCheckInDialogOpen, setIsCheckInDialogOpen] = useState(false);
  const [isQuickVisitModalOpen, setIsQuickVisitModalOpen] = useState(false);
  const [isCreateTaskDialogOpen, setIsCreateTaskDialogOpen] = useState(false);
  const [isEditTaskDialogOpen, setIsEditTaskDialogOpen] = useState(false);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isTaskDetailDialogOpen, setIsTaskDetailDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [viewingTask, setViewingTask] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  
  // Sorting state
  const [sortField, setSortField] = useState<SortField>('dueDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // Suggestion state
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Check if user is Manager
  const isManager = role === "Sales Manager" || role === "Admin";
  const [showQuickActionsMenu, setShowQuickActionsMenu] = useState(false);

  // FAB dragging state
  const [fabPosition, setFabPosition] = useState(() => {
    const saved = localStorage.getItem('fab-position');
    return saved ? JSON.parse(saved) : { bottom: 24, right: 24 };
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);

  const currentUser = "สมชาย วงศ์สกุล";

  // Team members list
  const teamMembers = [
    "สมชาย วงศ์สกุล",
    "อนุชา ศรีสวัสดิ์", 
    "วิภาวี จันทร์เจริญ",
    "ธนพล รัตนพงษ์",
  ];

  // Mock data generator based on language
  const getMockTasks = (): Task[] => {
    const isEnglish = i18n.language === 'en';
    
    if (isEnglish) {
      return [
        // February 2026 (Current)
        {
          id: "TASK-001",
          title: "Follow up with Global Freight Solutions",
          description: "Discuss contract renewal and pricing adjustment",
          priority: "high",
          status: "todo",
          dueDate: "2026-02-19",
          dueTime: "12:00 PM",
          assignee: "สมชาย วงศ์สกุล",
          completed: false,
          customer: "บริษัท โกลบอล เฟรท โซลูชั่น จำกัด",
          relatedTo: "Contract Renewal - Freight BU",
          location: "123 Sukhumvit Road, Bangkok 10110",
          contactPerson: "Mr. John Anderson",
          contactPhone: "+66-2-123-4567",
          contactEmail: "john.anderson@globalfreight.com",
          activityType: "customer_visit",
        },
        {
          id: "TASK-002",
          title: "Review quotation for TransContinental Logistics",
          description: "Review pricing and scope before sending to customer",
          priority: "high",
          status: "todo",
          dueDate: "2026-02-19",
          dueTime: "02:00 PM",
          assignee: "อนุชา ศรีสวัสดิ์",
          completed: false,
          customer: "บริษัท ทรานส์คอนติเนนทอล โลจิสติกส์ จำกัด",
          relatedTo: "Quotation Review - Freight BU",
          location: "456 Silom Road, Bangkok 10500",
          contactPerson: "Ms. Maria Santos",
          contactPhone: "+66-2-234-5678",
          contactEmail: "maria.santos@transcon.com",
          activityType: "meeting",
        },
        {
          id: "TASK-003",
          title: "Prepare contract amendment for Pacific Distribution",
          description: "Update service levels and add new distribution center",
          priority: "medium",
          status: "in-progress",
          dueDate: "2026-02-20",
          dueTime: "03:00 PM",
          assignee: "สมชาย วงศ์สกุล",
          completed: false,
          customer: "บริษัท แปซิฟิค ดิสทริบิวชั่น จำกัด",
          relatedTo: "Contract Amendment - Commercial BU",
          location: "789 Rama 4 Road, Bangkok 10330",
          contactPerson: "Mr. David Lee",
          contactPhone: "+66-2-345-6789",
          contactEmail: "david.lee@pacific-dist.com",
          activityType: "site_survey",
        },
        {
          id: "TASK-004",
          title: "System demo meeting with FastTrack Express",
          description: "Present last-mile delivery solution",
          priority: "low",
          status: "completed",
          dueDate: "2026-02-18",
          dueTime: "04:00 PM",
          assignee: "อนุชา ศรีสวัสดิ์",
          completed: true,
          customer: "บริษัท ฟาสต์แทร็ค เอ็กซ์เพรส จำกัด",
          relatedTo: "System Demo - B2B2C BU",
          location: "Online Meeting",
          contactPerson: "Ms. Sarah Johnson",
          contactPhone: "+66-2-456-7890",
          contactEmail: "sarah.johnson@fasttrack.com",
          activityType: "meeting",
        },
        {
          id: "TASK-020",
          title: "Cold Chain certification follow-up",
          description: "Follow up on GDP certification for cold storage facility",
          priority: "high",
          status: "in-progress",
          dueDate: "2026-02-21",
          dueTime: "09:00 AM",
          assignee: "วิภาวี จันทร์เจริญ",
          completed: false,
          customer: "บริษัท ไบโอฟาร์มา (ประเทศไทย) จำกัด",
          relatedTo: "GDP Certification - Cold Chain BU",
          location: "Lat Krabang Cold Storage",
          contactPerson: "Dr. Sumalee Tanaka",
          contactPhone: "+66-2-789-1234",
          contactEmail: "sumalee@biopharma.co.th",
          activityType: "site_survey",
        },
        {
          id: "TASK-022",
          title: "Automotive parts inventory planning",
          description: "Plan Q2 inventory for automotive components client",
          priority: "medium",
          status: "todo",
          dueDate: "2026-02-22",
          dueTime: "10:30 AM",
          assignee: "ปรีชา อัตตะกุล",
          completed: false,
          customer: "บริษัท ออโต้ คอมโพเนนท์ (ไทยแลนด์) จำกัด",
          relatedTo: "Inventory Planning - Automotive BU",
          location: "Rayong Factory",
          contactPerson: "Mr. Takeshi Yamamoto",
          contactPhone: "+66-38-456-7890",
          contactEmail: "takeshi@autoparts.co.th",
          activityType: "customer_visit",
        },
        {
          id: "TASK-023",
          title: "Team review - Healthcare logistics performance",
          description: "Review team KPIs for Healthcare & Pharmaceutical BU",
          priority: "low",
          status: "todo",
          dueDate: "2026-02-23",
          dueTime: "02:00 PM",
          assignee: "นพ.อภิชาติ ศรีนาค",
          completed: false,
          customer: "ภายใน - ทีมเฮลท์แคร์",
          relatedTo: "Team Review - Healthcare & Pharmaceutical BU",
          location: "Office Conference Room A",
          contactPerson: "Healthcare Team",
          contactPhone: "-",
          contactEmail: "-",
          activityType: "meeting",
        },
        {
          id: "TASK-024",
          title: "JTS terminal operations optimization",
          description: "Review and optimize terminal operations workflow",
          priority: "high",
          status: "in-progress",
          dueDate: "2026-02-24",
          dueTime: "11:00 AM",
          assignee: "กมลชนก พลอยงาม",
          completed: false,
          customer: "บริษัท เจทีเอส ออเปอเรชั่น จำกัด",
          relatedTo: "Operations Review - JTS BU",
          location: "Laem Chabang Terminal",
          contactPerson: "Mr. Wichai Somboon",
          contactPhone: "+66-38-123-9999",
          contactEmail: "wichai@jts-terminal.com",
          activityType: "site_survey",
        },
        {
          id: "TASK-021",
          title: "Present new services to Mega Corp",
          description: "Introduce premium logistics services",
          priority: "high",
          status: "completed",
          dueDate: "2025-12-28",
          dueTime: "10:00 AM",
          assignee: "สมชาย วงศ์สกุล",
          completed: true,
          customer: "บริษัท เมก้า คอร์ป จำกัด",
          relatedTo: "New Service - Commercial BU",
          location: "Customer Office",
          activityType: "customer_visit",
        },
        // March 2026
        {
          id: "TASK-005",
          title: "Q1 Business Review with Asia Logistics",
          description: "Review quarterly performance and discuss expansion plans",
          priority: "high",
          status: "todo",
          dueDate: "2026-03-05",
          dueTime: "10:00 AM",
          assignee: "สมชาย วงศ์สกุล",
          completed: false,
          customer: "บริษัท เอเชีย โลจิสติกส์ กรุ๊ป จำกัด",
          relatedTo: "Q1 Review - Freight BU",
          location: "Customer Office, Sathorn",
          contactPerson: "Mr. Robert Chen",
          contactPhone: "+66-2-555-1234",
          contactEmail: "robert.chen@asialogistics.com",
          activityType: "meeting",
        },
        {
          id: "TASK-006",
          title: "Cold chain facility inspection",
          description: "Inspect new cold storage facility for pharmaceutical client",
          priority: "high",
          status: "todo",
          dueDate: "2026-03-07",
          dueTime: "09:00 AM",
          assignee: "วิภาวี จันทร์เจริญ",
          completed: false,
          customer: "บริษัท เมดิซัพพลาย (ประเทศไทย) จำกัด",
          relatedTo: "Facility Inspection - Cold Chain BU",
          location: "Lat Krabang Industrial Estate",
          contactPerson: "Dr. Sumalee Tanaka",
          contactPhone: "+66-2-555-2345",
          contactEmail: "sumalee.t@medisupply.co.th",
          activityType: "site_survey",
        },
        {
          id: "TASK-007",
          title: "Customs clearance training session",
          description: "Conduct training for new customs procedures",
          priority: "medium",
          status: "in-progress",
          dueDate: "2026-03-10",
          dueTime: "02:00 PM",
          assignee: "อนุชา ศรีสวัสดิ์",
          completed: false,
          customer: "บริษัท อิมพอร์ต เอ็กซ์พอร์ต โซลูชั่นส์ จำกัด",
          relatedTo: "Training - Freight BU",
          location: "Office Training Room",
          contactPerson: "Ms. Pacharee Wong",
          contactPhone: "+66-2-555-3456",
          contactEmail: "pacharee.w@iesolutions.com",
          activityType: "meeting",
        },
        {
          id: "TASK-008",
          title: "ASEAN expansion proposal presentation",
          description: "Present cross-border logistics expansion to Vietnam and Cambodia",
          priority: "high",
          status: "todo",
          dueDate: "2026-03-12",
          dueTime: "11:00 AM",
          assignee: "ชนิดา ทองสุข",
          completed: false,
          customer: "บริษัท ภูมิภาค เทรด พาร์ทเนอร์ส จำกัด",
          relatedTo: "ASEAN Expansion - ASEAN Island & Taiwan BU",
          location: "Online Meeting (Zoom)",
          contactPerson: "Mr. Nguyen Van Minh",
          contactPhone: "+84-28-555-4567",
          contactEmail: "nguyen.minh@rtp.com.vn",
          activityType: "meeting",
        },
        {
          id: "TASK-009",
          title: "Warehouse automation demo",
          description: "Demonstrate new WMS system to potential client",
          priority: "medium",
          status: "todo",
          dueDate: "2026-03-15",
          dueTime: "01:30 PM",
          assignee: "ภาณุมาส รัตนาวดี",
          completed: false,
          customer: "บริษัท สมาร์ท แวร์เฮ้าส์ จำกัด",
          relatedTo: "WMS Demo - B2B2C BU",
          location: "Bangna Distribution Center",
          contactPerson: "Mr. Somchai Pattana",
          contactPhone: "+66-2-555-5678",
          contactEmail: "somchai@smartwarehouse.co.th",
          activityType: "customer_visit",
        },
        {
          id: "TASK-010",
          title: "Contract negotiation - Automotive Parts",
          description: "Final round of contract negotiation for automotive logistics",
          priority: "high",
          status: "in-progress",
          dueDate: "2026-03-18",
          dueTime: "10:30 AM",
          assignee: "ปรีชา อัตตะกุล",
          completed: false,
          customer: "บริษัท ออโต้ คอมโพเนนท์ อินเตอร์เนชั่นแนล จำกัด",
          relatedTo: "Contract Negotiation - Automotive BU",
          location: "Customer Headquarters, Rayong",
          contactPerson: "Mr. Takeshi Yamamoto",
          contactPhone: "+66-38-555-6789",
          contactEmail: "t.yamamoto@autocomponents.com",
          activityType: "meeting",
        },
        {
          id: "TASK-011",
          title: "Freight rate review - Ocean shipping",
          description: "Review and update ocean freight rates for Q2",
          priority: "medium",
          status: "todo",
          dueDate: "2026-03-20",
          dueTime: "03:00 PM",
          assignee: "อนุชา ศรีสวัสดิ์",
          completed: false,
          customer: "บริษัท แปซิฟิค ชิปปิ้ง ไลน์ จำกัด",
          relatedTo: "Rate Review - Freight BU",
          location: "Office Meeting Room 2",
          contactPerson: "Ms. Linda Kim",
          contactPhone: "+66-2-555-7890",
          contactEmail: "linda.kim@pacificshipping.com",
          activityType: "meeting",
        },
        {
          id: "TASK-012",
          title: "Commodity trading compliance audit",
          description: "Conduct compliance audit for commodity trading operations",
          priority: "high",
          status: "todo",
          dueDate: "2026-03-22",
          dueTime: "09:30 AM",
          assignee: "วีระพงษ์ สมบัติ",
          completed: false,
          customer: "บริษัท โกลบอล คอมมอดิตี้ เทรดดิ้ง จำกัด",
          relatedTo: "Compliance Audit - Commodity BU",
          location: "Client Office, Silom",
          contactPerson: "Mr. James Mitchell",
          contactPhone: "+66-2-555-8901",
          contactEmail: "j.mitchell@gct-global.com",
          activityType: "site_survey",
        },
        {
          id: "TASK-013",
          title: "E-commerce fulfillment site visit",
          description: "Visit new B2B2C fulfillment center for assessment",
          priority: "medium",
          status: "in-progress",
          dueDate: "2026-03-25",
          dueTime: "11:00 AM",
          assignee: "ภาณุมาส รัตนาวดี",
          completed: false,
          customer: "บริษัท อี-คอมเมิร์ซ โลจิสติกส์ ฮับ จำกัด",
          relatedTo: "Site Assessment - B2B2C BU",
          location: "Chonburi Warehouse Park",
          contactPerson: "Ms. Siriwan Techapaiboon",
          contactPhone: "+66-38-555-9012",
          contactEmail: "siriwan@ecommhub.co.th",
          activityType: "site_survey",
        },
        {
          id: "TASK-014",
          title: "Healthcare logistics partnership meeting",
          description: "Discuss strategic partnership for pharmaceutical distribution",
          priority: "high",
          status: "todo",
          dueDate: "2026-03-27",
          dueTime: "02:00 PM",
          assignee: "ธนพล สุขสมบูรณ์",
          completed: false,
          customer: "บริษัท ฟาร์มาแคร์ ดิสทริบิวชั่น จำกัด",
          relatedTo: "Partnership Discussion - Healthcare & Pharmaceutical BU",
          location: "Pharma Office, Ramkhamhaeng",
          contactPerson: "Dr. Ananya Srisawat",
          contactPhone: "+66-2-555-0123",
          contactEmail: "ananya@pharmacare.co.th",
          activityType: "meeting",
        },
        {
          id: "TASK-015",
          title: "Monthly performance review - Team",
          description: "Conduct monthly team performance review and planning",
          priority: "low",
          status: "todo",
          dueDate: "2026-03-28",
          dueTime: "04:00 PM",
          assignee: "นันทวัฒน์ เจริญสุข",
          completed: false,
          customer: "ภายใน - ทีมขาย",
          relatedTo: "Team Review - Commercial BU",
          location: "Office Conference Room",
          contactPerson: "Internal Team",
          contactPhone: "-",
          contactEmail: "-",
          activityType: "meeting",
        },
        {
          id: "TASK-016",
          title: "China-Thailand cross-border solution proposal",
          description: "Prepare proposal for China-Thailand land transport solution",
          priority: "high",
          status: "todo",
          dueDate: "2026-03-29",
          dueTime: "10:00 AM",
          assignee: "วีระพงษ์ สมบัติ",
          completed: false,
          customer: "บริษัท ไซโน-ไทย เทรดดิ้ง จำกัด",
          relatedTo: "Cross-border Proposal - CLMV+China BU",
          location: "Customer Office, Bangkok",
          contactPerson: "Mr. Zhang Wei",
          contactPhone: "+66-2-888-9999",
          contactEmail: "zhang.wei@sinothai.com",
          activityType: "meeting",
        },
        {
          id: "TASK-017",
          title: "Automotive supply chain review with Manager",
          description: "Review automotive BU performance with team manager",
          priority: "medium",
          status: "in-progress",
          dueDate: "2026-03-30",
          dueTime: "03:00 PM",
          assignee: "สุนิสา วัฒนาชัย",
          completed: false,
          customer: "ภายใน - ทีมยานยนต์",
          relatedTo: "Team Performance Review - Automotive BU",
          location: "Office Meeting Room B",
          contactPerson: "ปรีชา อัตตะกุล",
          contactPhone: "-",
          contactEmail: "-",
          activityType: "meeting",
        },
        {
          id: "TASK-018",
          title: "JTS terminal capacity expansion planning",
          description: "Plan terminal capacity expansion for Q3-Q4 2026",
          priority: "high",
          status: "todo",
          dueDate: "2026-03-31",
          dueTime: "09:00 AM",
          assignee: "สุรเชษฐ์ ไพบูลย์",
          completed: false,
          customer: "บริษัท เจทีเอส แมเนจเมนท์ จำกัด",
          relatedTo: "Capacity Planning - JTS BU",
          location: "JTS Head Office",
          contactPerson: "กมลชนก พลอยงาม",
          contactPhone: "-",
          contactEmail: "-",
          activityType: "meeting",
        },
        {
          id: "TASK-019",
          title: "Cold Chain temperature monitoring system upgrade",
          description: "Coordinate with IT team for IoT sensor deployment",
          priority: "high",
          status: "in-progress",
          dueDate: "2026-03-31",
          dueTime: "02:30 PM",
          assignee: "ดร.วิชัย ประสิทธิ์",
          completed: false,
          customer: "ภายใน - ฝ่ายปฏิบัติการห่วงโซ่เย็น",
          relatedTo: "System Upgrade - Cold Chain BU",
          location: "Cold Chain Warehouse",
          contactPerson: "วิภาวี จันทร์เจริญ",
          contactPhone: "-",
          contactEmail: "-",
          activityType: "site_survey",
        },
      ];
    }
    
    // Thai version
    return [
      // กุมภาพันธ์ 2026 (Current)
      {
        id: "TASK-001",
        title: "ติดตามลูกค้า Global Freight Solutions",
        description: "หารือเรื่องการต่ออายุสัญญาและปรับราคา",
        priority: "high",
        status: "todo",
        dueDate: "2026-02-19",
        dueTime: "12:00 PM",
        assignee: "สมชาย วงศ์สกุล",
        completed: false,
        customer: "Global Freight Solutions Inc.",
        relatedTo: "ต่ออายุสัญญา",
        location: "123 ถนนสุขุมวิท กรุงเทพฯ 10110",
        contactPerson: "คุณจอห์น แอนเดอร์สัน",
        contactPhone: "+66-2-123-4567",
        contactEmail: "john.anderson@globalfreight.com",
        activityType: "customer_visit",
      },
      {
        id: "TASK-002",
        title: "ตรวจสอบใบเสนอราคาสำหรับ TransContinental Logistics",
        description: "ตรวจสอบราคาและขอบเขตบริการก่อนส่งให้ลูกค้า",
        priority: "high",
        status: "todo",
        dueDate: "2026-02-19",
        dueTime: "02:00 PM",
        assignee: "อนุชา ศรีสวัสดิ์",
        completed: false,
        customer: "TransContinental Logistics",
        relatedTo: "ตรวจสอบใบเสนอราคา",
        location: "456 ถนนสีลม กรุงเทพฯ 10500",
        contactPerson: "คุณมาเรีย ซานโตส",
        contactPhone: "+66-2-234-5678",
        contactEmail: "maria.santos@transcon.com",
        activityType: "meeting",
      },
      {
        id: "TASK-003",
        title: "เตรียมสัญญาแก้ไขสำหรับ Pacific Distribution",
        description: "อัปเดตระดับการให้บริการและเพิ่มศูนย์กระจายสินค้าใหม่",
        priority: "medium",
        status: "in-progress",
        dueDate: "2026-02-20",
        dueTime: "03:00 PM",
        assignee: "สมชาย วงศ์สกุล",
        completed: false,
        customer: "Pacific Distribution Co.",
        relatedTo: "แก้ไขสัญญา",
        location: "789 ถนนพระราม 4 กรุงเทพฯ 10330",
        contactPerson: "คุณเดวิด ลี",
        contactPhone: "+66-2-345-6789",
        contactEmail: "david.lee@pacific-dist.com",
        activityType: "site_survey",
      },
      {
        id: "TASK-004",
        title: "นัดหมายสาธิตระบบกับ FastTrack Express",
        description: "นำเสนอโซลูชันการส่งของระยะสุดท้าย",
        priority: "low",
        status: "completed",
        dueDate: "2026-02-18",
        dueTime: "04:00 PM",
        assignee: "อนุชา ศรีสวัสดิ์",
        completed: true,
        customer: "FastTrack Express",
        relatedTo: "การสาธิตระบบ",
        location: "ประชุมออนไลน์",
        contactPerson: "คุณซาราห์ จอห์นสัน",
        contactPhone: "+66-2-456-7890",
        contactEmail: "sarah.johnson@fasttrack.com",
        activityType: "meeting",
      },
      {
        id: "TASK-021",
        title: "นำเสนอบริการใหม่ให้ Mega Corp",
        description: "แนะนำบริการขนส่งแบบพิเศษ",
        priority: "high",
        status: "completed",
        dueDate: "2025-12-28",
        dueTime: "10:00 AM",
        assignee: "สมชาย วงศ์สกุล",
        completed: true,
        customer: "Mega Corp Ltd.",
        relatedTo: "บริการใหม่",
        location: "สำนักงานลูกค้า",
        activityType: "customer_visit",
      },
      // มีนาคม 2026
      {
        id: "TASK-005",
        title: "ประชุมสรุปผลไตรมาสที่ 1 กับ Asia Logistics",
        description: "ทบทวนผลการดำเนินงานไตรมาสและหารือแผนขยายธุรกิจ",
        priority: "high",
        status: "todo",
        dueDate: "2026-03-05",
        dueTime: "10:00 AM",
        assignee: "สมชาย วงศ์สกุล",
        completed: false,
        customer: "Asia Logistics Group",
        relatedTo: "สรุปผล Q1",
        location: "สำนักงานลูกค้า สาทร",
        contactPerson: "คุณโรเบิร์ต เฉิน",
        contactPhone: "+66-2-555-1234",
        contactEmail: "robert.chen@asialogistics.com",
        activityType: "meeting",
      },
      {
        id: "TASK-006",
        title: "ตรวจสอบคลังสินค้าห้องเย็น",
        description: "ตรวจสอบคลังเย็นใหม่สำหรับลูกค้าเภสัชกรรม",
        priority: "high",
        status: "todo",
        dueDate: "2026-03-07",
        dueTime: "09:00 AM",
        assignee: "วิภาวี จันทร์เจริญ",
        completed: false,
        customer: "MediSupply Thailand",
        relatedTo: "ตรวจสอบคลังสินค้า",
        location: "นิคมอุตสาหกรรมลาดกระบัง",
        contactPerson: "ดร.สุมาลี ทานากะ",
        contactPhone: "+66-2-555-2345",
        contactEmail: "sumalee.t@medisupply.co.th",
        activityType: "site_survey",
      },
      {
        id: "TASK-007",
        title: "อบรมพิธีการศุลกากร",
        description: "จัดอบรมขั้นตอนพิธีการศุลกากรใหม่",
        priority: "medium",
        status: "in-progress",
        dueDate: "2026-03-10",
        dueTime: "02:00 PM",
        assignee: "อนุชา ศรีสวัสดิ์",
        completed: false,
        customer: "Import Export Solutions",
        relatedTo: "การอบรม",
        location: "ห้องอบรมบริษัท",
        contactPerson: "คุณพัชรี วงศ์",
        contactPhone: "+66-2-555-3456",
        contactEmail: "pacharee.w@iesolutions.com",
        activityType: "meeting",
      },
      {
        id: "TASK-008",
        title: "นำเสนอแผนขยายตลาด ASEAN",
        description: "นำเสนอการขยายธุรกิจโลจิสติกส์ข้ามพรมแดนไปเวียดนามและกัมพูชา",
        priority: "high",
        status: "todo",
        dueDate: "2026-03-12",
        dueTime: "11:00 AM",
        assignee: "ธนพล รัตนพงษ์",
        completed: false,
        customer: "Regional Trade Partners",
        relatedTo: "ขยายตลาด ASEAN",
        location: "ประชุมออนไลน์ (Zoom)",
        contactPerson: "คุณเหงวียน ว่าน มินห์",
        contactPhone: "+84-28-555-4567",
        contactEmail: "nguyen.minh@rtp.com.vn",
        activityType: "meeting",
      },
      {
        id: "TASK-009",
        title: "สาธิตระบบคลังสินค้าอัตโนมัติ",
        description: "สาธิตระบบ WMS ใหม่ให้ลูกค้าที่มีโอกาส",
        priority: "medium",
        status: "todo",
        dueDate: "2026-03-15",
        dueTime: "01:30 PM",
        assignee: "วิภาวี จันทร์เจริญ",
        completed: false,
        customer: "Smart Warehouse Co.",
        relatedTo: "สาธิต WMS",
        location: "ศูนย์กระจายสินค้าบางนา",
        contactPerson: "คุณสมชาย พัฒนา",
        contactPhone: "+66-2-555-5678",
        contactEmail: "somchai@smartwarehouse.co.th",
        activityType: "customer_visit",
      },
      {
        id: "TASK-010",
        title: "เจรจาสัญญา - ชิ้นส่วนยานยนต์",
        description: "เจรจาสัญญารอบสุดท้ายสำหรับโลจิสติกส์อุตสาหกรรมยานยนต์",
        priority: "high",
        status: "in-progress",
        dueDate: "2026-03-18",
        dueTime: "10:30 AM",
        assignee: "สมชาย วงศ์สกุล",
        completed: false,
        customer: "Auto Components International",
        relatedTo: "เจรจาสัญญา",
        location: "สำนักงานใหญ่ลูกค้า ระยอง",
        contactPerson: "คุณทาเคชิ ยามาโมโตะ",
        contactPhone: "+66-38-555-6789",
        contactEmail: "t.yamamoto@autocomponents.com",
        activityType: "meeting",
      },
      {
        id: "TASK-011",
        title: "ทบทวนอัตราค่าขนส่งทางเรือ",
        description: "ทบทวนและปรับปรุงอัตราค่าขนส่งทางเรือสำหรับไตรมาสที่ 2",
        priority: "medium",
        status: "todo",
        dueDate: "2026-03-20",
        dueTime: "03:00 PM",
        assignee: "อนุชา ศรีสวัสดิ์",
        completed: false,
        customer: "Pacific Shipping Lines",
        relatedTo: "ทบทวนอัตราค่าบริการ",
        location: "ห้องประชุม 2",
        contactPerson: "คุณลินดา คิม",
        contactPhone: "+66-2-555-7890",
        contactEmail: "linda.kim@pacificshipping.com",
        activityType: "meeting",
      },
      {
        id: "TASK-012",
        title: "ตรวจสอบการปฏิบัติตามกฎระเบียบการค้าสินค้าโภคภัณฑ์",
        description: "ตรวจสอบการปฏิบัติตามกฎเกณฑ์ธุรกิจการค้าสินค้าโภคภัณฑ์",
        priority: "high",
        status: "todo",
        dueDate: "2026-03-22",
        dueTime: "09:30 AM",
        assignee: "ธนพล รัตนพงษ์",
        completed: false,
        customer: "Global Commodities Trading",
        relatedTo: "ตรวจสอบการปฏิบัติตามกฎ",
        location: "สำนักงานลูกค้า สีลม",
        contactPerson: "คุณเจมส์ มิทเชลล์",
        contactPhone: "+66-2-555-8901",
        contactEmail: "j.mitchell@gct-global.com",
        activityType: "site_survey",
      },
      {
        id: "TASK-013",
        title: "เยี่ยมชมศูนย์กระจายสินค้าอีคอมเมิร์ซ",
        description: "เยี่ยมชมศูนย์กระจายสินค้า B2B2C ใหม่เพื่อประเมิน",
        priority: "medium",
        status: "in-progress",
        dueDate: "2026-03-25",
        dueTime: "11:00 AM",
        assignee: "วิภาวี จันทร์เจริญ",
        completed: false,
        customer: "E-Commerce Logistics Hub",
        relatedTo: "ประเมินสถานที่",
        location: "คลังสินค้า ชลบุรี",
        contactPerson: "คุณศิริวรรณ เตชะไพบูลย์",
        contactPhone: "+66-38-555-9012",
        contactEmail: "siriwan@ecommhub.co.th",
        activityType: "site_survey",
      },
      {
        id: "TASK-014",
        title: "ประชุมหารือความร่วมมือด้านโลจิสติกส์สุขภาพ",
        description: "หารือความร่วมมือเชิงกลยุทธ์สำหรับการกระจายสินค้าเภสัชกรรม",
        priority: "high",
        status: "todo",
        dueDate: "2026-03-27",
        dueTime: "02:00 PM",
        assignee: "สมชาย วงศ์สกุล",
        completed: false,
        customer: "PharmaCare Distribution",
        relatedTo: "หารือความร่วมมือ",
        location: "สำนักงานฟาร์มา รามคำแหง",
        contactPerson: "ดร.อนัญญา ศรีสวัสดิ์",
        contactPhone: "+66-2-555-0123",
        contactEmail: "ananya@pharmacare.co.th",
        activityType: "meeting",
      },
      {
        id: "TASK-015",
        title: "ประชุมทบทวนผลงานประจำเดือน - ทีม",
        description: "ทบทวนผลการทำงานของทีมและวางแผนประจำเดือน",
        priority: "low",
        status: "todo",
        dueDate: "2026-03-28",
        dueTime: "04:00 PM",
        assignee: "สมชาย วงศ์สกุล",
        completed: false,
        customer: "ภายใน - ทีมขาย",
        relatedTo: "ทบทวนทีม",
        location: "ห้องประชุมบริษัท",
        contactPerson: "ทีมภายใน",
        contactPhone: "-",
        contactEmail: "-",
        activityType: "meeting",
      },
    ];
  };

  // Use useMemo to regenerate tasks when language changes
  const [tasks, setTasks] = useState<Task[]>(() => getMockTasks());

  // Update tasks when language changes
  useEffect(() => {
    setTasks(getMockTasks());
  }, [i18n.language]);

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

  const canEditTask = (task: Task): boolean => {
    if (isManager) {
      return true;
    }
    return task.assignee === currentUser;
  };

  const canDeleteTask = (task: Task): boolean => {
    if (isManager) {
      return true;
    }
    return task.assignee === currentUser;
  };

  // 3-step sorting handler
  const handleSort = (field: SortField) => {
    if (sortField !== field) {
      setSortField(field);
      setSortDirection('asc');
    } else {
      if (sortDirection === null) {
        setSortDirection('asc');
      } else if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortDirection(null);
      }
    }
  };

  const handleCheckIn = (task: Task) => {
    setSelectedTask({
      customer: task.customer || "Unknown Customer",
      customerAddress: task.location,
      title: task.title,
      notes: task.description,
      purpose: task.activityType === "customer_visit" ? "เยี่ยมลูกค้า" : 
               task.activityType === "meeting" ? "การประชุม/พูดคุย" :
               task.activityType === "follow_up" ? "ติดตามงาน" : "",
      visitType: task.activityType === "customer_visit" ? "เยี่ยมลูกค้า" :
                  task.activityType === "meeting" ? "นัดหมาย" :
                  task.activityType === "site_survey" ? "สำรวจ" :
                  task.activityType === "follow_up" ? "งานบริการ" : "",
    });
    setIsQuickVisitModalOpen(true);
  };

  const handleQuickVisit = (task: Task) => {
    setSelectedTask({
      id: task.id,
      service: task.relatedTo || task.title,
      customer: task.customer || "Unknown Customer",
      location: task.location,
      contactPerson: task.contactPerson,
      contactPhone: task.contactPhone,
      contactEmail: task.contactEmail,
      activityType: task.activityType,
    });
    setIsQuickVisitModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    if (!canEditTask(task)) {
      toast.error(t("permissions.no_permission", "ไม่มีสิทธิ์"));
      return;
    }
    setEditingTask(task);
    setIsEditTaskDialogOpen(true);
  };

  const handleViewDetails = (task: Task) => {
    setViewingTask(task);
    setIsTaskDetailDialogOpen(true);
  };

  const handleSaveTask = (taskId: string, updatedTask: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              ...updatedTask,
              completed: updatedTask.status === "completed" || task.completed,
            }
          : task
      )
    );
    toast.success(t("tasks.task_updated"));
    setIsEditTaskDialogOpen(false);
  };

  const handleStatusChange = (taskId: string, newStatus: "todo" | "in-progress" | "completed") => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
              completed: newStatus === "completed",
            }
          : task
      )
    );
    toast.success(t("tasks.status_updated"));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    setIsDeleteDialogOpen(false);
    setTaskToDelete(null);
    toast.success(t("tasks.task_deleted"));
  };

  const confirmDelete = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task && !canDeleteTask(task)) {
      toast.error(t("permissions.no_permission", "ไม่มีสิทธิ์"));
      return;
    }
    setTaskToDelete(taskId);
    setIsDeleteDialogOpen(true);
  };

  const handleHideTask = (taskId: string) => {
    setHiddenTaskIds((prev) => [...prev, taskId]);
    toast.success("Task hidden");
  };

  const getFilteredTasks = () => {
    let filtered = tasks;
    
    // Filter out hidden tasks
    filtered = filtered.filter(t => !hiddenTaskIds.includes(t.id));
    
    // Sales Rep เห็นแค่ของตัวเอง, Manager เห็นของทั้งทีม
    if (!isManager) {
      filtered = filtered.filter(t => t.assignee === currentUser);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(t => 
        t.title.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.customer?.toLowerCase().includes(query) ||
        t.relatedTo?.toLowerCase().includes(query)
      );
    }

    // Filter by owner (เฉพาะ Manager)
    if (isManager && filterOwner !== "all") {
      filtered = filtered.filter(t => t.assignee === filterOwner);
    }

    // Filter by activity type
    if (filterActivityType !== "all") {
      filtered = filtered.filter(t => t.activityType === filterActivityType);
    }

    // Filter by date range
    if (filterDateFrom && filterDateTo) {
      const from = new Date(filterDateFrom);
      const to = new Date(filterDateTo);
      filtered = filtered.filter(t => {
        const taskDate = new Date(t.dueDate);
        return taskDate >= from && taskDate <= to;
      });
    }
    
    // Sorting Logic
    if (sortDirection) {
      filtered = [...filtered].sort((a, b) => {
        let comparison = 0;
        
        if (sortField === 'dueDate') {
          comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        } else if (sortField === 'priority') {
          const priorityWeight = { high: 3, medium: 2, low: 1 };
          comparison = priorityWeight[a.priority] - priorityWeight[b.priority];
        } else if (sortField === 'status') {
          const statusWeight = { todo: 1, 'in-progress': 2, completed: 3 };
          comparison = statusWeight[a.status] - statusWeight[b.status];
        }

        return sortDirection === 'asc' ? comparison : -comparison;
      });
    } else {
      // Default Sort: Today's tasks first, then by date
      const today = new Date().toISOString().split('T')[0];
      filtered = [...filtered].sort((a, b) => {
        const aIsToday = a.dueDate === today;
        const bIsToday = b.dueDate === today;
        
        // Today's tasks first
        if (aIsToday && !bIsToday) return -1;
        if (!aIsToday && bIsToday) return 1;
        
        // Then sort by date
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
    }

    return filtered;
  };

  // Stats calculations
  const filteredTasks = useMemo(() => getFilteredTasks(), [tasks, hiddenTaskIds, isManager, currentUser, searchQuery, filterOwner, filterActivityType, filterDateFrom, filterDateTo, sortDirection, sortField]);
  const todoTasks = useMemo(() => filteredTasks.filter(t => t.status === "todo"), [filteredTasks]);
  const inProgressTasks = useMemo(() => filteredTasks.filter(t => t.status === "in-progress"), [filteredTasks]);
  const completedTasks = useMemo(() => filteredTasks.filter(t => t.status === "completed"), [filteredTasks]);
  const overdueTasks = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return filteredTasks.filter(t => t.dueDate < today && t.status !== "completed");
  }, [filteredTasks]);

  // Activity type config
  const activityTypeConfig: Record<string, { label: string; color: string }> = {
    customer_visit: { label: t("tasks.activity_types.customer_visit", "เยี่ยมลูกค้า"), color: "blue" },
    meeting: { label: t("tasks.activity_types.meeting", "ประชุม"), color: "purple" },
    site_survey: { label: t("tasks.activity_types.site_survey", "สำรวจสถานที่"), color: "orange" },
    follow_up: { label: t("tasks.activity_types.follow_up", "ติดตามงาน"), color: "green" },
  };

  const allTasksHistory: HistoryEntry[] = [
    {
      id: "1",
      action: "created",
      entity: "Task",
      user: "You",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      description: "Created task \"Complete finance approval for Logistics Contract\"",
    },
  ];

  // Mock meetings data (Updated to 2026)
  const meetings = [
    {
      id: 1,
      date: "19 ก.พ. 2026",
      time: "09:00",
      title: "ประชุมทีมขาย",
    },
    {
      id: 2,
      date: "19 ก.พ. 2026",
      time: "14:00",
      title: "พบลูกค้า Global Logistics",
    },
    {
      id: 3,
      date: "19 ก.พ. 2026",
      time: "16:00",
      title: "Review สัญญา Pacific Distribution",
    },
  ];

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMeetingIndex((prev) => (prev + 1) % meetings.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [meetings.length]);

  const handlePrevMeeting = () => {
    setCurrentMeetingIndex((prev) => (prev - 1 + meetings.length) % meetings.length);
  };

  const handleNextMeeting = () => {
    setCurrentMeetingIndex((prev) => (prev + 1) % meetings.length);
  };

  // Tag suggestions
  const suggestions = [
    "ต่ออายุสัญญา",
    "ตรวจสอบใบเสนอราคา",
    "แก้ไขสัญญา",
    "การสาธิตระบบ",
    "อนุมัติฝ่ายการเงิน",
    "การวิเคราะห์",
    "ระบบ IT",
    "แผนการตลาด",
  ];

  const filteredSuggestions = suggestions.filter(item => 
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-3 sm:p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">{t('tasks.all_tasks_title')}</h1>
            <p className="text-xs sm:text-sm text-gray-500">{t('tasks.all_tasks_subtitle')}</p>
          </div>
          <Button
            size="sm"
            className="h-9 px-4 bg-green-600 hover:bg-green-700 text-white shadow-sm text-sm font-medium rounded-full"
            onClick={() => setIsCreateTaskDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-1.5" />
            {t('tasks.create_task')}
          </Button>
        </div>

        {/* Top Meeting Card with Carousel */}
        <Card 
          className="mb-3 rounded-lg shadow-sm relative"
          style={{
            background: `linear-gradient(to right, ${roleTheme.light}, ${roleTheme.primary})`
          }}
        >
          <CardContent className="p-4 pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  <span className="text-white text-sm sm:text-base font-semibold">{meetings[currentMeetingIndex].date}</span>
                </div>
                <div className="h-5 w-px bg-white/30"></div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  <span className="text-white text-sm sm:text-base">{meetings[currentMeetingIndex].time} - {meetings[currentMeetingIndex].title}</span>
                </div>
              </div>
              <Button 
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 h-8 sm:h-9 px-3 sm:px-4 text-sm"
              >
                {t('common.update')}
              </Button>
            </div>
            
            {/* Dots Indicator with Arrows */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <button
                onClick={handlePrevMeeting}
                className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition-colors"
                aria-label="Previous meeting"
              >
                <ChevronLeft className="h-4 w-4 text-white" />
              </button>

              <div className="flex items-center gap-2">
                {meetings.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentMeetingIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentMeetingIndex
                        ? 'w-8 bg-white'
                        : 'w-2 bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Go to meeting ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextMeeting}
                className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition-colors"
                aria-label="Next meeting"
              >
                <ChevronRight className="h-4 w-4 text-white" />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards Row - 4 boxes */}
        <div className="grid grid-cols-4 gap-2 mb-2">
          <Card className="border border-gray-200 rounded-lg bg-white">
            <CardContent className="p-2">
              <div className="flex flex-col">
                <p className="text-xs text-gray-500 font-medium mb-1">{t("tasks.todo")}</p>
                <p className="text-4XL font-bold text-gray-900 text-[24px]">{todoTasks.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 rounded-lg bg-white">
            <CardContent className="p-2">
              <div className="flex flex-col">
                <p className="text-xs text-gray-500 font-medium mb-1">{t("tasks.in_progress")}</p>
                <p className="text-4XL font-bold text-gray-900 text-[24px]">{inProgressTasks.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 rounded-lg bg-white">
            <CardContent className="p-2">
              <div className="flex flex-col">
                <p className="text-xs text-gray-500 font-medium mb-1">{t("tasks.completed")}</p>
                <p className="text-4XL font-bold text-gray-900">{completedTasks.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 rounded-lg bg-white">
            <CardContent className="p-2">
              <div className="flex flex-col">
                <p className="text-xs text-gray-500 font-medium mb-1">{t("tasks.overdue")}</p>
                <p className="text-4XL font-bold text-gray-900">{overdueTasks.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs & Content */}
        <Card className="border border-gray-200 rounded-lg bg-white shadow-sm">
          <CardContent className="p-0">
            {/* Tab Header with View Switcher */}
            <div className="flex items-center justify-between border-b border-gray-200 px-3">
              <button
                onClick={() => setSelectedTab("all")}
                className={`px-4 py-3 text-sm sm:text-base font-medium border-b-2 transition-colors ${
                  selectedTab === "all"
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                {t("tasks.all_tasks")} ({tasks.length})
              </button>

              {/* View Switcher */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setDisplayMode("kanban")}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    displayMode === "kanban"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" />
                  <span className="hidden sm:inline">Kanban</span>
                </button>
                <button
                  onClick={() => setDisplayMode("calendar")}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    displayMode === "calendar"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Calendar className="h-4 w-4" />
                  <span className="hidden sm:inline">Calendar</span>
                </button>
                <button
                  onClick={() => setDisplayMode("table")}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    displayMode === "table"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Table2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Table</span>
                </button>
              </div>
            </div>

            {/* Search Bar & Sort */}
            <div className="p-3 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search with Tag Suggestion */}
                <div className="relative flex-1 z-10">
                  <Popover open={showSuggestions && searchQuery.length > 0 && filteredSuggestions.length > 0} onOpenChange={setShowSuggestions}>
                    <PopoverTrigger asChild>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                        <Input
                          type="text"
                          placeholder={t('placeholders.search_tasks')}
                          value={searchQuery}
                          onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setShowSuggestions(true);
                          }}
                          className="pl-10 pr-10 h-10 sm:h-11 border-gray-200 rounded-lg text-sm sm:text-base w-full"
                        />
                        {searchQuery && (
                          <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            <X className="h-4 w-4 sm:h-5 sm:w-5" />
                          </button>
                        )}
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]" align="start">
                      <div className="max-h-[300px] overflow-y-auto">
                        <div className="p-2">
                          <div className="text-xs font-semibold text-gray-500 px-2 py-1.5">Suggestions</div>
                          {filteredSuggestions.map((suggestion) => (
                            <div
                              key={suggestion}
                              onClick={() => {
                                setSearchQuery(suggestion);
                                setShowSuggestions(false);
                              }}
                              className="px-2 py-1.5 text-sm cursor-pointer hover:bg-gray-100 rounded"
                            >
                              {suggestion}
                            </div>
                          ))}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Filters Group */}
                <div className="flex items-center gap-2">
                  {isManager && (
                    <Select value={filterOwner} onValueChange={setFilterOwner}>
                      <SelectTrigger className="h-10 sm:h-11 w-auto min-w-[140px] px-3 text-xs sm:text-sm border-gray-300 bg-white gap-1.5 rounded-lg">
                        <Users className="h-4 w-4 text-gray-600 flex-shrink-0" />
                        <span className="truncate">{t('tasks.filters.owner')}</span>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('tasks.filters.all_owners')}</SelectItem>
                        {teamMembers.map((member) => (
                          <SelectItem key={member} value={member}>{member}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  {/* Activity Type Filter */}
                  <Select value={filterActivityType} onValueChange={setFilterActivityType}>
                    <SelectTrigger className="h-10 sm:h-11 w-auto min-w-[140px] px-3 text-xs sm:text-sm border-gray-300 bg-white rounded-lg">
                      {/* ใช้ div ครอบ Icon และ SelectValue ไว้ด้วยกัน เพื่อจัดให้อยู่ชิดซ้าย (เว้นระยะไอคอนลูกศรชิดขวา) */}
                      <div className="flex items-center gap-1.5 overflow-hidden">
                        <List className="h-4 w-4 text-gray-600 flex-shrink-0" />
                        {/* ใช้ SelectValue แทน span เดิม เพื่อให้มันเปลี่ยนข้อความตามที่เลือกอัตโนมัติ */}
                        <SelectValue placeholder={t('tasks.filters.activityType')} />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('ทั้งหมด')}</SelectItem>
                      {Object.entries(activityTypeConfig).map(([type, config]) => (
                        <SelectItem key={type} value={type}>
                          {config.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Date Range Filter */}
                  <div className="flex items-center gap-2">
                    <Input
                      type="date"
                      value={filterDateFrom}
                      onChange={(e) => setFilterDateFrom(e.target.value)}
                      className="h-10 sm:h-11 px-3 text-xs sm:text-sm border-gray-300 rounded-lg w-[160px]"
                      placeholder={t('tasks.filters.from')}
                    />
                    <span className="text-gray-500 text-sm">{t('tasks.filters.to')}</span>
                    <Input
                      type="date"
                      value={filterDateTo}
                      onChange={(e) => setFilterDateTo(e.target.value)}
                      className="h-10 sm:h-11 px-3 text-xs sm:text-sm border-gray-300 rounded-lg w-[160px]"
                      placeholder={t('tasks.filters.to')}
                    />
                    {(filterDateFrom || filterDateTo) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setFilterDateFrom("");
                          setFilterDateTo("");
                        }}
                        className="h-10 sm:h-11 px-2 text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {/* Sort Button (3-step) */}
                  <Button
                    variant="outline"
                    className={`h-10 sm:h-11 px-3 gap-2 border-gray-300 ${sortDirection ? 'bg-green-50 text-green-700 border-green-200' : 'text-gray-600'}`}
                    onClick={() => handleSort('dueDate')}
                  >
                    <ArrowUpDown className="h-4 w-4" />
                    <span className="hidden sm:inline text-xs sm:text-sm">
                      {sortDirection === 'asc' ? t('tasks.sort.date_old_new') : sortDirection === 'desc' ? t('tasks.sort.date_new_old') : t('tasks.sort.sort_by_date')}
                    </span>
                  </Button>

                  {/* Active Filters Count */}
                  {(filterOwner !== "all" || filterActivityType !== "all" || filterDateFrom || filterDateTo || searchQuery) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSearchQuery("");
                        setFilterOwner("all");
                        setFilterActivityType("all");
                        setFilterDateFrom("");
                        setFilterDateTo("");
                      }}
                      className="h-10 sm:h-11 px-3 text-xs text-gray-600 hover:text-gray-900"
                    >
                      <Filter className="h-4 w-4 mr-1.5" />
                      {t('tasks.filters.clear')}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Task Display based on displayMode */}
            {displayMode === "kanban" ? (
              <div className="p-0">
                <TasksKanbanView
                  tasks={filteredTasks}
                  onStatusChange={handleStatusChange}
                  onAddTask={() => setIsCreateTaskDialogOpen(true)}
                  onEditTask={handleEditTask}
                  onViewTask={handleViewDetails}
                  onHideTask={handleHideTask}
                  onDeleteTask={confirmDelete}
                />
              </div>
            ) : displayMode === "calendar" ? (
              <div className="p-3">
                <TasksCalendarView
                  tasks={filteredTasks}
                  onTaskClick={handleViewDetails}
                />
              </div>
            ) : (
              <div className="p-3">
                <TasksTableView
                  tasks={filteredTasks}
                  onTaskClick={handleViewDetails}
                  onEditTask={handleEditTask}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
      {selectedTask && (
        <CheckInDialog
          isOpen={isCheckInDialogOpen}
          onClose={() => setIsCheckInDialogOpen(false)}
          task={selectedTask}
        />
      )}

      {selectedTask && (
        <QuickVisitModal
          isOpen={isQuickVisitModalOpen}
          onClose={() => setIsQuickVisitModalOpen(false)}
          task={selectedTask}
        />
      )}

      <CreateTaskDialog
        isOpen={isCreateTaskDialogOpen}
        onClose={() => setIsCreateTaskDialogOpen(false)}
      />

      <EditTaskDialog
        isOpen={isEditTaskDialogOpen}
        onClose={() => setIsEditTaskDialogOpen(false)}
        task={editingTask}
        onSave={handleSaveTask}
      />

      <HistoryDialog
        isOpen={isHistoryDialogOpen}
        onClose={() => setIsHistoryDialogOpen(false)}
        entries={allTasksHistory}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("tasks.delete_task_title")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("tasks.delete_task_description")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
              {t("common.cancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => taskToDelete && handleDeleteTask(taskToDelete)}
              className="bg-red-600 hover:bg-red-700"
            >
              {t("common.delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <TaskDetailDialog
        isOpen={isTaskDetailDialogOpen}
        onClose={() => setIsTaskDetailDialogOpen(false)}
        task={viewingTask}
        onEdit={handleEditTask}
        onDelete={confirmDelete}
        onStatusChange={handleStatusChange}
      />
      <QuickActionsMenu
        isOpen={showQuickActionsMenu}
        onClose={() => setShowQuickActionsMenu(false)}
        onQuickVisit={() => {
          if (onNavigate) onNavigate("/customers", "add");
        }}
        onQuickDeal={() => {
          if (onNavigate) onNavigate("/deals", "add");
        }}
        onQuickActivity_Visit={() => {
          if (onNavigate) onNavigate("/calendar", "add");
        }}
        onQuickCreatetask={() => {
          setShowQuickActionsMenu(false); 
          setIsCreateTaskDialogOpen(true); 
        }}
      />

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
          </>
        )}
      </div>
  );
}