import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  MapPin,
  Phone,
  User,
  Clock,
  Building2,
  Users,
  FileText,
  UserPlus,
  Briefcase,
  MapPinCheck,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  List,
  Columns,
  Square,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n/config";
import { AddActivityModal } from "../modals/add-activity-modal";
import { ActivityDetailModal } from "../modals/activity-detail-modal";
import { QuickActionsMenu } from "../modals/quick-actions-menu";
import { QuickVisitModal } from "../modals/quick-visit-modal";
import { useRoleTheme } from "../../hooks/use-role-theme";
import { useRole } from "../../contexts/role-context";
import { useModuleStore } from "../../store/module-store";

type DisplayMode = "month" | "week" | "day" | "list";

type ActivityType =
  | "customer_visit"
  | "sales_meeting"
  | "site_survey"
  | "internal_meeting"
  | "follow_up_call"
  | "task_reminder";
type ActivityStatus = "planned" | "completed" | "cancelled";

interface Activity {
  id: string;
  title: string;
  type: ActivityType;
  status: ActivityStatus;
  startTime: Date;
  endTime: Date;
  location?: string;
  customer?: string;
  customerAddress?: string;
  customerPhone?: string;
  customerContact?: string;
  siteBranch?: string;
  assignedTo: string;
  createdBy?: { name: string; avatar?: string };
  attendees?: string[];
  notes?: string;
  relatedDeal?: string;
  relatedContract?: string;
  interactionType?: string;
  subcategory?: string;
  example?: string;
}

interface CalendarScreenProps {
  onNavigate?: (path: string) => void;
  selectedActivityId?: string | null;
  shouldOpenActivityModal?: boolean;
  setShouldOpenActivityModal?: (value: boolean) => void;
}

export function CalendarScreen({ onNavigate, selectedActivityId, shouldOpenActivityModal, setShouldOpenActivityModal }: CalendarScreenProps) {
  const { t } = useTranslation();
  const roleTheme = useRoleTheme();
  const { role } = useRole();
  
  // Check if user is Manager
  const isManager = role === "Sales Manager" || role === "Admin";
  
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 21));
  const [displayMode, setDisplayMode] = useState<DisplayMode>("month");
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [showQuickActionsMenu, setShowQuickActionsMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());
  const [monthViewType, setMonthViewType] = useState<"grid" | "list">("grid");
  const [showQuickVisitModal, setShowQuickVisitModal] = useState(false);

  // Thai Holidays and Important Days
  const holidays: { [key: string]: { name: string; nameEn: string; type: 'holiday' | 'important' } } = {
    '2026-01-01': { name: 'วันขึ้นปีใหม่', nameEn: 'New Year\'s Day', type: 'holiday' },
    '2026-02-11': { name: 'วันมาฆบูชา', nameEn: 'Makha Bucha Day', type: 'holiday' },
    '2026-04-06': { name: 'วันจักรี', nameEn: 'Chakri Memorial Day', type: 'holiday' },
    '2026-04-13': { name: 'วันสงกรานต์', nameEn: 'Songkran Festival', type: 'holiday' },
    '2026-04-14': { name: 'วันสงกรานต์', nameEn: 'Songkran Festival', type: 'holiday' },
    '2026-04-15': { name: 'วันสงกรานต์', nameEn: 'Songkran Festival', type: 'holiday' },
    '2026-05-01': { name: 'วันแรงงานแห่งชาติ', nameEn: 'Labour Day', type: 'holiday' },
    '2026-05-04': { name: 'วันฉัตรมงคล', nameEn: 'Coronation Day', type: 'holiday' },
    '2026-05-11': { name: 'วันวิสาขบูชา', nameEn: 'Visakha Bucha Day', type: 'holiday' },
    '2026-06-03': { name: 'วันเฉลิมพระชนมพรรษาสมเด็จพระนางเจ้าฯ', nameEn: 'HM The Queen\'s Birthday', type: 'holiday' },
    '2026-07-08': { name: 'วันอาสาฬหบูชา', nameEn: 'Asalha Bucha Day', type: 'holiday' },
    '2026-07-09': { name: 'วันเข้าพรรษา', nameEn: 'Buddhist Lent Day', type: 'holiday' },
    '2026-07-28': { name: 'วันเฉลิมพระชนมพรรษาพระบาทสมเด็จพระเจ้าอยู่หัว', nameEn: 'HM The King\'s Birthday', type: 'holiday' },
    '2026-08-12': { name: 'วันแม่แห่งชาติ', nameEn: 'HM Queen Sirikit\'s Birthday', type: 'holiday' },
    '2026-10-13': { name: 'วันคงคล้ายวันสวรรคตพระบาทสมเด็จพระปรมินทรมหาภูมิพลอดุลยเดช บรมนาถบพิตร', nameEn: 'HM King Bhumibol Adulyadej Memorial Day', type: 'holiday' },
    '2026-10-23': { name: 'วันปิยมหาราช', nameEn: 'King Chulalongkorn Memorial Day', type: 'holiday' },
    '2026-12-05': { name: 'วันชาติและวันพ่อแห่งชาติ', nameEn: 'National Day & HM King Bhumibol\'s Birthday', type: 'holiday' },
    '2026-12-10': { name: 'วันรัฐธรรมนูญ', nameEn: 'Constitution Day', type: 'holiday' },
    '2026-12-31': { name: 'วันสิ้นปี', nameEn: 'New Year\'s Eve', type: 'holiday' },
    // Important days (not holidays)
    '2026-02-14': { name: 'วันวาเลนไทน์', nameEn: 'Valentine\'s Day', type: 'important' },
  };

  // Get holiday for a specific date
  const getHoliday = (date: Date) => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return holidays[dateStr];
  };

  const storeTasks = useModuleStore((state) => state.modules.tasks || []);

  // Combine Mock activities data with store tasks
  const activities = useMemo(() => {
    const mockActivities: Activity[] = [
      // Week 1 - Feb 1-7
      {
        id: "ACT-001",
        title: "New Year Sales Review Meeting",
        type: "internal_meeting",
        status: "completed",
        startTime: new Date(2026, 1, 2, 9, 0),
        endTime: new Date(2026, 1, 2, 11, 0),
        location: "Conference Room A",
        assignedTo: "You",
        notes: "Q4 2025 performance review",
      },
      {
        id: "ACT-002",
        title: "Site Visit - ABC Logistics",
        type: "customer_visit",
        status: "completed",
        startTime: new Date(2026, 1, 3, 10, 0),
        endTime: new Date(2026, 1, 3, 12, 0),
        location: "Ladkrabang Industrial Estate",
        siteBranch: "สาขากรุงเทพฯ (ลาดกระบัง)",
        customer: "ABC Logistics Co., Ltd.",
        customerContact: "คุณสมชาย วงศ์สุวรรณ",
        customerAddress: "123 ถ.ลาดกระบัง แขวงลาดกระบัง เขตลาดกระบัง กรุงเทพฯ 10520",
        customerPhone: "02-123-4567",
        assignedTo: "You",
        attendees: ["คุณสมหญิง เจริญสุข", "คุณประสิทธิ์ แสงทอง"],
        notes: "สำรวจพื้นที่คลังสินค้าเพื่อเสนอระบบชั้นวางสินค้า",
        relatedDeal: "DEAL-2026-0023",
        relatedContract: "CNT-2025-189",
        interactionType: "business_engagement",
        subcategory: "relationship_building",
        example: "เยี่ยมชมสถานที่จริงเพื่อสร้างความสัมพันธ์และเข้าใจความต้องการของลูกค้า",
      },
      {
        id: "ACT-003",
        title: "Contract Negotiation - DHL",
        type: "sales_meeting",
        status: "completed",
        startTime: new Date(2026, 1, 4, 14, 0),
        endTime: new Date(2026, 1, 4, 16, 0),
        location: "DHL Office - Sathorn",
        siteBranch: "สาขาสาทร",
        customer: "DHL Supply Chain Thailand",
        customerContact: "Ms. Jennifer Lee",
        customerAddress: "456 ถ.สาทร แขวงยานนาวา เขตสาทร กรุงเทพฯ 10120",
        customerPhone: "02-987-6543",
        assignedTo: "Sarah Chen",
        attendees: ["คุณวิชัย กิจสมบูรณ์", "Ms. Jennifer Lee", "คุณนิภา สุขเกษม"],
        notes: "เจรจาต่อสัญญาเช่าพื้นที่คลังสินค้า ระยะเวลา 3 ปี",
        relatedDeal: "DEAL-2026-0035",
        relatedContract: "CNT-2026-001",
        interactionType: "business_engagement",
        subcategory: "negotiation",
        example: "ประชุมเจรจาเพื่อตกลงเงื่อนไขทางธุรกิจและข้อตกลงสัญญา",
      },
      {
        id: "ACT-004",
        title: "Warehouse Survey - New Facility",
        type: "site_survey",
        status: "completed",
        startTime: new Date(2026, 1, 5, 9, 0),
        endTime: new Date(2026, 1, 5, 12, 0),
        location: "Samut Prakan",
        siteBranch: "สาขาสมุทรปราการ",
        customer: "Thai Cold Storage",
        customerContact: "คุณอรุณ พรหมมินทร์",
        customerAddress: "789 ถ.สุขุมวิท ต.บางปูใหม่ อ.เมืองฯ จ.สมุทรปราการ 10280",
        customerPhone: "02-765-4321",
        assignedTo: "Michael Park",
        attendees: ["คุณธนพล วิศวกิจ", "คุณสุภาพร ธนาวุฒิ"],
        notes: "สำรวจพื้นที่ติดตั้งระบบชั้นวางแบบ Cold Storage และวัดขนาดพื้นที่",
        relatedDeal: "DEAL-2026-0041",
        interactionType: "technical_operation",
        subcategory: "site_survey",
        example: "สำรวจสถานที่เพื่อประเมินความเป็นไปได้ทางเทคนิคและออกแบบโซลูชัน",
      },
      {
        id: "ACT-005",
        title: "Follow-up: Q1 Pricing Proposal",
        type: "follow_up_call",
        status: "completed",
        startTime: new Date(2026, 1, 6, 10, 30),
        endTime: new Date(2026, 1, 6, 11, 0),
        customer: "Kerry Express",
        assignedTo: "You",
      },
      {
        id: "ACT-006",
        title: "Team Weekly Sync",
        type: "internal_meeting",
        status: "completed",
        startTime: new Date(2026, 1, 6, 15, 0),
        endTime: new Date(2026, 1, 6, 16, 0),
        location: "Virtual - Teams",
        assignedTo: "You",
      },
  
      // Week 2 - Feb 8-14
      {
        id: "ACT-007",
        title: "Client Presentation - Flash Express",
        type: "customer_visit",
        status: "completed",
        startTime: new Date(2026, 1, 9, 13, 0),
        endTime: new Date(2026, 1, 9, 15, 0),
        location: "Flash Express HQ",
        customer: "Flash Express",
        assignedTo: "You",
      },
      {
        id: "ACT-008",
        title: "Partnership Discussion - Shopee",
        type: "sales_meeting",
        status: "completed",
        startTime: new Date(2026, 1, 10, 10, 0),
        endTime: new Date(2026, 1, 10, 12, 0),
        location: "Shopee Office - Rama 4",
        customer: "Shopee Logistics",
        assignedTo: "Sarah Chen",
      },
      {
        id: "ACT-009",
        title: "Valentine Team Lunch",
        type: "internal_meeting",
        status: "completed",
        startTime: new Date(2026, 1, 14, 12, 0),
        endTime: new Date(2026, 1, 14, 13, 30),
        location: "Central World",
        assignedTo: "You",
        notes: "Team building",
      },
      {
        id: "ACT-009-CANCELLED",
        title: "Site Visit - JWD Warehouse",
        type: "site_survey",
        status: "cancelled",
        startTime: new Date(2026, 1, 13, 14, 0),
        endTime: new Date(2026, 1, 13, 16, 0),
        location: "Bangna Industrial Estate",
        customer: "JWD Logistics",
        assignedTo: "Michael Park",
        notes: "สภาพอากาศไม่เอื้ออำนวย ฝนตกหนัก",
      },
  
      // Week 3 - Feb 15-21
      {
        id: "ACT-010",
        title: "Site Survey - Bangna Warehouse",
        type: "site_survey",
        status: "completed",
        startTime: new Date(2026, 1, 16, 9, 0),
        endTime: new Date(2026, 1, 16, 11, 30),
        location: "Bangna-Trad KM 8",
        customer: "Siam Piwat Storage",
        assignedTo: "Michael Park",
      },
      {
        id: "ACT-011",
        title: "Quarterly Review - Top Charoen",
        type: "customer_visit",
        status: "completed",
        startTime: new Date(2026, 1, 17, 14, 0),
        endTime: new Date(2026, 1, 17, 16, 0),
        location: "Top Charoen Office",
        customer: "Top Charoen Optical",
        assignedTo: "You",
      },
      {
        id: "ACT-011-CANCELLED",
        title: "Client Meeting - Lazada",
        type: "customer_visit",
        status: "cancelled",
        startTime: new Date(2026, 1, 17, 10, 0),
        endTime: new Date(2026, 1, 17, 11, 30),
        location: "Lazada Office",
        customer: "Lazada Thailand",
        assignedTo: "You",
        notes: "ลูกค้าขอเลื่อนนัดหมาย เนื่องจากมีประชุมเร่งด่วน",
      },
      {
        id: "ACT-012",
        title: "Contract Signing - Central Group",
        type: "sales_meeting",
        status: "completed",
        startTime: new Date(2026, 1, 18, 10, 0),
        endTime: new Date(2026, 1, 18, 12, 0),
        location: "Central Office - Silom",
        customer: "Central Department Store",
        assignedTo: "Sarah Chen",
      },
      {
        id: "ACT-013",
        title: "Customer Site Visit - Global Freight",
        type: "customer_visit",
        status: "planned",
        startTime: new Date(2026, 1, 19, 10, 0),
        endTime: new Date(2026, 1, 19, 12, 0),
        location: "Bangkok Distribution Center",
        siteBranch: "สาขาบางนา",
        customer: "Global Freight Solutions",
        customerContact: "คุณสุรชัย ขวัญแก้ว",
        customerAddress: "234 ถ.บางนา-ตราด กม.5 แขวงบางนา เขตบางนา กรุงเทพฯ 10260",
        customerPhone: "02-345-6789",
        assignedTo: "Sarah Chen",
        attendees: ["คุณพิมพ์ใจ ศรีสุข", "Mr. Robert Smith"],
        notes: "Quarterly review meeting - ทบทวนผลการดำเนินงานไตรมาสที่ผ่านมา",
        relatedDeal: "DEAL-2026-0018",
        relatedContract: "CNT-2025-234",
        interactionType: "relationship_building",
        subcategory: "relationship_nurturing",
        example: "การพบปะและดูแลลูกค้าเดิมเพื่อรักษาความสัมพันธ์และขยายโอกาสทางธุรกิจ",
      },
      {
        id: "ACT-014",
        title: "Pricing Discussion - มีสเปซ",
        type: "sales_meeting",
        status: "planned",
        startTime: new Date(2026, 1, 19, 14, 0),
        endTime: new Date(2026, 1, 19, 15, 30),
        location: "Conference Room A",
        siteBranch: "สำนักงานใหญ่",
        customer: "บริษัท สยามพาณิชย์ จำกัด",
        customerContact: "คุณมนัสชัย เจริญทรัพย์",
        customerAddress: "567 ถ.พระราม 4 แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110",
        customerPhone: "02-234-5678",
        assignedTo: "You",
        attendees: ["คุณวราภรณ์ สินธุ์ชัย", "คุณชัยพร วงศ์ใหญ่"],
        notes: "เสนอราคาห้องเก็บของและระบบจัดการคลังสินค้า",
        relatedDeal: "DEAL-2026-0052",
        interactionType: "business_engagement",
        subcategory: "proposal_presentation",
        example: "นำเสนอข้อเสนอเชิงพาณิชย์และอธิบายรายละเอียดผลิตภัณฑ์/บริการ",
      },
      {
        id: "ACT-015",
        title: "Follow-up: Robinson Proposal",
        type: "follow_up_call",
        status: "planned",
        startTime: new Date(2026, 1, 20, 9, 0),
        endTime: new Date(2026, 1, 20, 9, 30),
        location: "โทรศัพท์",
        siteBranch: "สำนักงานใหญ่",
        customer: "Robinson Department Store",
        customerContact: "คุณสมศักดิ์ ธนาเจริญ",
        customerPhone: "02-876-5432",
        assignedTo: "You",
        notes: "ติดตามผลข้อเสนอโครงการชั้นวางสินค้าที่นำเสนอไปเมื่อสัปดาห์ที่แล้ว",
        relatedDeal: "DEAL-2026-0047",
        interactionType: "relationship_building",
        subcategory: "follow_up",
        example: "ติดตามผลหลังการนำเสนอเพื่อรับฟีดแบ็กและผลักดันการตัดสินใจ",
      },
      {
        id: "ACT-016",
        title: "Site Survey - Warehouse Expansion",
        type: "site_survey",
        status: "planned",
        startTime: new Date(2026, 1, 20, 13, 0),
        endTime: new Date(2026, 1, 20, 15, 0),
        location: "Samut Prakan",
        customer: "Thai Logistics Co.",
        assignedTo: "Michael Park",
      },
      {
        id: "ACT-017",
        title: "Morning Briefing",
        type: "internal_meeting",
        status: "planned",
        startTime: new Date(2026, 1, 21, 8, 30),
        endTime: new Date(2026, 1, 21, 9, 0),
        location: "Virtual - Teams",
        assignedTo: "You",
      },
      {
        id: "ACT-018",
        title: "Contract Renewal Call",
        type: "follow_up_call",
        status: "planned",
        startTime: new Date(2026, 1, 21, 10, 0),
        endTime: new Date(2026, 1, 21, 10, 30),
        customer: "PharmaCare Global",
        assignedTo: "You",
      },
  
      // Week 4 - Feb 22-28
      {
        id: "ACT-019",
        title: "Client Presentation - Import Export",
        type: "customer_visit",
        status: "planned",
        startTime: new Date(2026, 1, 22, 10, 0),
        endTime: new Date(2026, 1, 22, 12, 0),
        location: "Client Office - Silom",
        customer: "Bangkok Import Export",
        assignedTo: "You",
      },
      {
        id: "ACT-020",
        title: "Partnership Meeting - Lazada",
        type: "sales_meeting",
        status: "planned",
        startTime: new Date(2026, 1, 22, 15, 0),
        endTime: new Date(2026, 1, 22, 16, 30),
        location: "Lazada Office - Lat Phrao",
        customer: "Lazada Logistics",
        assignedTo: "Sarah Chen",
      },
      {
        id: "ACT-020-CANCELLED",
        title: "Contract Review - Big C Supercenter",
        type: "sales_meeting",
        status: "cancelled",
        startTime: new Date(2026, 1, 22, 9, 0),
        endTime: new Date(2026, 1, 22, 10, 30),
        location: "Big C Head Office",
        customer: "Big C Supercenter",
        assignedTo: "You",
        notes: "ผู้ตัดสินใจลาป่วย ขอเลื่อนการนัดหมาย",
      },
      {
        id: "ACT-021",
        title: "Weekly Sales Review",
        type: "internal_meeting",
        status: "planned",
        startTime: new Date(2026, 1, 23, 9, 0),
        endTime: new Date(2026, 1, 23, 10, 30),
        location: "Conference Room B",
        siteBranch: "สำนักงานใหญ่",
        assignedTo: "You",
        attendees: ["ทีมขาย", "ผู้จัดการฝ่ายขาย", "ผู้ช่วยผู้จัดการ"],
        notes: "ประชุมทบทวนผลการขายประจำสัปดาห์ และวางแผนงานสัปดาห์หน้า",
        interactionType: "business_engagement",
        subcategory: "internal_coordination",
        example: "ประชุมภายในเพื่อประสานงานและวางแผนกลยุทธ์ร่วมกัน",
      },
      {
        id: "ACT-022",
        title: "Site Visit - HomePro Warehouse",
        type: "customer_visit",
        status: "planned",
        startTime: new Date(2026, 1, 24, 13, 0),
        endTime: new Date(2026, 1, 24, 15, 0),
        location: "Bangplee",
        siteBranch: "สาขาบางพลี",
        customer: "HomePro Public Company",
        customerContact: "คุณกมลชนก สุขสวัสดิ์",
        customerAddress: "999 ถ.เทพรัตน ต.บางพลีใหญ่ อ.บางพลี จ.สมุทรปราการ 10540",
        customerPhone: "02-765-9876",
        assignedTo: "Michael Park",
        attendees: ["คุณอนุชา พันธุ์ดี", "คุณเจษฎา วงศ์วิวัฒน์"],
        notes: "เยี่ยมชมคลังสินค้าและหารือเรื่องการขยายพื้นที่จัดเก็บ",
        relatedDeal: "DEAL-2026-0061",
        relatedContract: "CNT-2025-301",
        interactionType: "relationship_building",
        subcategory: "relationship_nurturing",
        example: "การเยี่ยมชมสถานที่ลูกค้าเพื่อติดตามผลการใช้งานและสร้างความสัมพันธ์",
      },
      {
        id: "ACT-023",
        title: "Contract Signing - Big C",
        type: "sales_meeting",
        status: "planned",
        startTime: new Date(2026, 1, 25, 10, 0),
        endTime: new Date(2026, 1, 25, 12, 0),
        location: "Big C Head Office",
        siteBranch: "สาขาราชดำริ",
        customer: "Big C Supercenter",
        customerContact: "คุณนภาพร จันทร์เพ็ญ",
        customerAddress: "1234 ถ.ราชดำริ แขวงลุมพินี เขตปทุมวัน กรุงเทพฯ 10330",
        customerPhone: "02-654-3210",
        assignedTo: "You",
        attendees: ["คุณสุวิทย์ ชัยวัฒนา", "คุณปรียา สกุลไทย", "Legal Team"],
        notes: "ลงนามในสัญญาจัดหาชั้นวางสินค้าทั่วประเทศไทย มูลค่า 50 ล้านบาท",
        relatedDeal: "DEAL-2026-0078",
        relatedContract: "CNT-2026-015",
        interactionType: "business_engagement",
        subcategory: "contract_closing",
        example: "การประชุมเพื่อลงนามในสัญญาและปิดดีล",
      },
      {
        id: "ACT-024",
        title: "Cold Storage Inspection",
        type: "site_survey",
        status: "planned",
        startTime: new Date(2026, 1, 26, 9, 0),
        endTime: new Date(2026, 1, 26, 11, 0),
        location: "Rangsit",
        siteBranch: "สาขารังสิต",
        customer: "CP All Cold Storage",
        customerContact: "คุณธีรพงษ์ มหาชัย",
        customerAddress: "555 หมู่ 3 ต.ประชาธิปัตย์ อ.ธัญบุรี จ.ปทุมธานี 12130",
        customerPhone: "02-543-2109",
        assignedTo: "Michael Park",
        attendees: ["คุณวีระ เทคโนโลยี", "คุณสมบัติ วิศวกร"],
        notes: "ตรวจสอบระบบชั้นวาง Cold Storage และประเมินความจุที่เพิ่มได้",
        relatedDeal: "DEAL-2026-0083",
        interactionType: "technical_operation",
        subcategory: "technical_assessment",
        example: "การตรวจสอบและประเมินความเป็นไปได้ทางเทคนิคของโครงการ",
      },
      {
        id: "ACT-024-CANCELLED",
        title: "Training Session - Warehouse Safety",
        type: "internal_meeting",
        status: "cancelled",
        startTime: new Date(2026, 1, 26, 13, 0),
        endTime: new Date(2026, 1, 26, 16, 0),
        location: "Training Room",
        assignedTo: "You",
        notes: "วิทยากรติดภารกิจเร่งด่วน เลื่อนเป็นเดือนหน้า",
      },
      {
        id: "ACT-025",
        title: "Month-End Review Meeting",
        type: "internal_meeting",
        status: "planned",
        startTime: new Date(2026, 1, 27, 14, 0),
        endTime: new Date(2026, 1, 27, 16, 0),
        location: "Conference Room A",
        assignedTo: "You",
        notes: "February performance review",
      },
      {
        id: "ACT-026",
        title: "Follow-up: Tesco Lotus",
        type: "follow_up_call",
        status: "planned",
        startTime: new Date(2026, 1, 28, 10, 0),
        endTime: new Date(2026, 1, 28, 10, 30),
        customer: "Tesco Lotus",
        assignedTo: "You",
      },
      {
        id: "ACT-027",
        title: "Q1 Planning Session",
        type: "internal_meeting",
        status: "planned",
        startTime: new Date(2026, 1, 28, 15, 0),
        endTime: new Date(2026, 1, 28, 17, 0),
        location: "Virtual - Teams",
        assignedTo: "You",
        notes: "Prepare March targets",
      },
      // March 2026
      {
        id: "ACT-028",
        title: "March Monthly Sync",
        type: "internal_meeting",
        status: "completed",
        startTime: new Date(2026, 2, 2, 9, 0),
        endTime: new Date(2026, 2, 2, 10, 30),
        location: "Main Boardroom",
        assignedTo: "You",
      },
      {
        id: "ACT-029",
        title: "Site Visit - Linfox",
        type: "customer_visit",
        status: "completed",
        startTime: new Date(2026, 2, 10, 13, 0),
        endTime: new Date(2026, 2, 10, 15, 0),
        location: "Linfox Logistics Center",
        customer: "Linfox",
        assignedTo: "You",
      },
      {
        id: "ACT-030",
        title: "Proposal Presentation - Thai Airways",
        type: "sales_meeting",
        status: "completed",
        startTime: new Date(2026, 2, 18, 10, 0),
        endTime: new Date(2026, 2, 18, 12, 0),
        location: "Thai Airways HQ",
        customer: "Thai Airways",
        assignedTo: "You",
      },
      {
        id: "ACT-031",
        title: "Service Review - Big C",
        type: "customer_visit",
        status: "completed",
        startTime: new Date(2026, 2, 25, 14, 0),
        endTime: new Date(2026, 2, 25, 16, 0),
        location: "Big C Head Office",
        customer: "Big C Supercenter",
        assignedTo: "You",
      },
      // April 2026
      {
        id: "TASK-VISIT-01",
        title: "Contract Signing - SCGJWD",
        type: "customer_visit",
        status: "planned",
        startTime: new Date(2026, 3, 21, 10, 0),
        endTime: new Date(2026, 3, 21, 11, 30),
        location: "SCG JWD Office",
        customer: "SCGJWD",
        assignedTo: "You",
        notes: "Joining as an observer",
      },
      {
        id: "TASK-MEETING-01",
        title: "Customer Visit: PTT Group",
        type: "sales_meeting",
        status: "planned",
        startTime: new Date(2026, 3, 21, 14, 0),
        endTime: new Date(2026, 3, 21, 15, 30),
        location: "PTT HQ",
        customer: "PTT Group",
        assignedTo: "สมชาย วงศ์สกุล",
        createdBy: { name: "แฮมทาโร่" },
        notes: "Project kickoff discussion",
      },
      {
        id: "TASK-SYNC-01",
        title: "Industrial Zone Sync",
        type: "internal_meeting",
        status: "planned",
        startTime: new Date(2026, 3, 30, 9, 0),
        endTime: new Date(2026, 3, 30, 10, 30),
        location: "War Room",
        customer: "Amata Corp",
        assignedTo: "You",
      },
    ];

    // Map store tasks that are activities
    const taskActivities = storeTasks
      .filter(t => t.isActivity)
      .map(t => {
        let type: ActivityType = "sales_meeting";
        if (t.activityType?.includes("เข้าพบลูกค้า")) type = "customer_visit";
        else if (t.activityType?.includes("นัดหมายลูกค้า")) type = "sales_meeting";

        const start = t.dueDate ? new Date(`${t.dueDate}T${t.dueTime || '09:00:00'}`) : new Date();
        const end = new Date(start.getTime() + 60 * 60 * 1000); // Default to 1 hour

        return {
          id: t.id,
          title: t.title,
          type: type,
          status: t.status === "completed" ? "completed" as const : "planned" as const,
          startTime: start,
          endTime: end,
          customer: t.customer,
          assignedTo: t.assignee || "You",
          notes: t.description,
          location: t.location,
          attendees: t.attendees,
        };
      });

    return [...taskActivities, ...mockActivities];
  }, [storeTasks]);

  useEffect(() => {
    if (shouldOpenActivityModal) {
      setShowCreateModal(true);
      if (setShouldOpenActivityModal) {
        setTimeout(() => setShouldOpenActivityModal(false), 100);
      }
    }
  }, [shouldOpenActivityModal, setShouldOpenActivityModal]);

  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case "customer_visit": return <Users className="h-3 w-3" />;
      case "sales_meeting": return <FileText className="h-3 w-3" />;
      case "site_survey": return <MapPin className="h-3 w-3" />;
      case "internal_meeting": return <Building2 className="h-3 w-3" />;
      case "follow_up_call": return <Phone className="h-3 w-3" />;
      case "task_reminder": return <Clock className="h-3 w-3" />;
    }
  };

  const getActivityColor = (type: ActivityType) => {
    switch (type) {
      case "customer_visit": return "bg-blue-500";
      case "sales_meeting": return "bg-emerald-500";
      case "site_survey": return "bg-purple-500";
      case "internal_meeting": return "bg-orange-500";
      case "follow_up_call": return "bg-pink-500";
      case "task_reminder": return "bg-gray-500";
    }
  };

  const getStatusBadge = (status: ActivityStatus) => {
    switch (status) {
      case "planned": return "bg-blue-100 text-blue-700";
      case "completed": return "bg-emerald-100 text-emerald-700";
      case "cancelled": return "bg-red-100 text-red-700";
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(i18n.language === "th" ? "th-TH" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(i18n.language === "th" ? "th-TH" : "en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateFull = (date: Date) => {
    return date.toLocaleDateString(i18n.language === "th" ? "th-TH" : "en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const goToPreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getCurrentMonthYear = () => {
    return currentDate.toLocaleDateString(i18n.language === "th" ? "th-TH" : "en-US", {
      year: "numeric",
      month: "long",
    });
  };

  const getFilteredActivities = () => {
    return activities.filter((activity) => {
      if (!isManager && activity.assignedTo !== "You") return false;
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          activity.title.toLowerCase().includes(searchLower) ||
          activity.customer?.toLowerCase().includes(searchLower) ||
          activity.location?.toLowerCase().includes(searchLower)
        );
      }
      return true;
    });
  };

  const filteredActivities = getFilteredActivities();

  // Get days in current month for Month View
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();
    
    const days: (Date | null)[] = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  // Get days in current week for Week View
  const getDaysInWeek = () => {
    const days: Date[] = [];
    const current = new Date(currentDate);
    const day = current.getDay();
    const diff = current.getDate() - day;
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(current);
      date.setDate(diff + i);
      days.push(date);
    }
    
    return days;
  };

  // Get activities for a specific date
  const getActivitiesForDate = (date: Date) => {
    return filteredActivities.filter(activity => {
      const activityDate = new Date(activity.startTime);
      return (
        activityDate.getDate() === date.getDate() &&
        activityDate.getMonth() === date.getMonth() &&
        activityDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Get activities for current day
  const getActivitiesForCurrentDay = () => {
    return getActivitiesForDate(currentDate).sort((a, b) => 
      a.startTime.getTime() - b.startTime.getTime()
    );
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  // Render Activity Card (used in multiple views)
  const renderActivityCard = (activity: Activity, compact: boolean = false) => {
    // Check if activity is cancelled
    const isCancelled = activity.status === 'cancelled';
    
    // Use softer colors for compact (grid) view
    let cardStyle = compact 
      ? 'bg-gray-100 text-gray-700 border border-gray-200'
      : `${getActivityColor(activity.type)} text-white`;
    
    // Override style for cancelled activities
    if (isCancelled) {
      cardStyle = compact 
        ? 'bg-red-50 text-red-600 border border-red-200'
        : 'bg-red-100 text-red-700 border border-red-300';
    }
    
    return (
      <div
        key={activity.id}
        className={`${cardStyle} rounded-md p-2 mb-1 cursor-pointer hover:opacity-90 transition-opacity ${
          compact ? 'text-xs' : 'text-sm'
        } ${isCancelled ? 'opacity-70' : ''}`}
        onClick={(e) => {
          if (compact) e.stopPropagation();
          setSelectedActivity(activity);
          setShowActivityModal(true);
        }}
      >
        <div className="flex items-start gap-1">
          {compact && (
            <div className={`${
              isCancelled 
                ? 'bg-red-400' 
                : getActivityColor(activity.type).replace('bg-', 'bg-opacity-100 bg-')
            } w-1 h-1 rounded-full mt-1.5 flex-shrink-0`} />
          )}
          {!compact && getActivityIcon(activity.type)}
          <div className="flex-1 min-w-0">
            <div className={`font-medium truncate ${isCancelled ? 'line-through' : ''}`}>
              {activity.title}
            </div>
            {!compact && (
              <>
                <div className={`text-xs opacity-90 ${isCancelled ? 'line-through' : ''}`}>
                  {formatTime(activity.startTime)} - {formatTime(activity.endTime)}
                </div>
                {activity.customer && (
                  <div className="text-xs opacity-80 truncate">{activity.customer}</div>
                )}
                {isCancelled && (
                  <div className="text-xs font-semibold mt-1 flex items-center gap-1">
                    <span className="text-red-600">✕</span> ยกเลิกแล้ว
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Month View
  const renderMonthView = () => {
    const days = getDaysInMonth();
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <>
        <Card className="border-0 shadow-sm mb-4">
          <CardHeader className="pb-3 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">
                {monthViewType === "grid" ? "Calendar Grid" : "Calendar List"}
              </CardTitle>
              <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-0.5 bg-white">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-7 px-2 ${
                    monthViewType === "grid"
                      ? "bg-[#7BC9A6] text-white hover:bg-[#6CB88A]"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setMonthViewType("grid")}
                >
                  <LayoutGrid className="h-3.5 w-3.5 mr-1" />
                  <span className="text-xs">Grid</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-7 px-2 ${
                    monthViewType === "list"
                      ? "bg-[#7BC9A6] text-white hover:bg-[#6CB88A]"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setMonthViewType("list")}
                >
                  <List className="h-3.5 w-3.5 mr-1" />
                  <span className="text-xs">List</span>
                </Button>
                
              </div>
            </div>
          </CardHeader>
        </Card>
              {/* Bottom Row: View Mode Toggle + Search + Add Button */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                {/* View Mode Toggle */}
                     
        {monthViewType === "grid" ? (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              {/* Week Day Headers */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {weekDays.map(day => (
                  <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {days.map((date, index) => {
                  if (!date) {
                    return <div key={`empty-${index}`} className="min-h-[120px] bg-gray-50 rounded-lg" />;
                  }

                  const activitiesForDay = getActivitiesForDate(date);
                  const isCurrentDay = isToday(date);
                  const isCurrentMonthDay = isCurrentMonth(date);
                  const holiday = getHoliday(date);

                  return (
                    <div
                      key={date.toISOString()}
                      className={`min-h-[120px] p-2 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md ${
                        isCurrentDay
                          ? 'border-[#7BC9A6] bg-[#7BC9A6]/5'
                          : isCurrentMonthDay
                          ? 'border-gray-200 bg-white'
                          : 'border-gray-100 bg-gray-50'
                      }`}
                      onClick={() => {
                        setCurrentDate(date);
                        setDisplayMode('day');
                      }}
                    >
                      <div className={`text-sm font-semibold mb-1 ${
                        isCurrentDay ? 'text-[#7BC9A6]' : isCurrentMonthDay ? 'text-gray-900' : 'text-gray-400'
                      }`}>
                        {date.getDate()}
                      </div>
                      {holiday && (
                        <div className="text-xs text-gray-500 mb-1">
                          {holiday.name}
                        </div>
                      )}
                      <div className="space-y-1">
                        {activitiesForDay.slice(0, 2).map(activity => renderActivityCard(activity, true))}
                        {activitiesForDay.length > 2 && (
                          <div className="text-xs text-gray-500 pl-1">
                            +{activitiesForDay.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ) : (
          renderMonthListView()
        )}
              </div>
      </>
    );
  };

  // Month List View
  const renderMonthListView = () => {
    // Get all days in current month
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Create array of all dates in month
    const allDates: Date[] = [];
    for (let day = 1; day <= daysInMonth; day++) {
      allDates.push(new Date(year, month, day));
    }
    
    // Group activities by date
    const groupedActivities: { [key: string]: { date: Date; activities: Activity[] } } = {};
    
    // Initialize all dates
    allDates.forEach(date => {
      const dateKey = date.toLocaleDateString(i18n.language === "th" ? "th-TH" : "en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        weekday: "short"
      });
      groupedActivities[dateKey] = { date, activities: [] };
    });
    
    // Add activities to their dates
    filteredActivities.forEach(activity => {
      if (activity.startTime.getMonth() === month && activity.startTime.getFullYear() === year) {
        const dateKey = activity.startTime.toLocaleDateString(i18n.language === "th" ? "th-TH" : "en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          weekday: "short"
        });
        
        if (groupedActivities[dateKey]) {
          groupedActivities[dateKey].activities.push(activity);
        }
      }
    });

    // Sort activities within each group
    Object.keys(groupedActivities).forEach(dateKey => {
      groupedActivities[dateKey].activities.sort((a, b) => 
        a.startTime.getTime() - b.startTime.getTime()
      );
    });

    return (
      <div className="space-y-4">
        {Object.keys(groupedActivities).map(dateKey => {
          const { date, activities: activitiesForDate } = groupedActivities[dateKey];
          const isCurrentDay = isToday(date);
          const holiday = getHoliday(date);

          return (
            <Card key={dateKey} className={`border-0 shadow-sm overflow-hidden ${
              isCurrentDay ? 'ring-2 ring-[#7BC9A6]' : ''
            }`}>
              {/* Date Header */}
              <div className={`w-full px-4 py-3 flex items-center justify-between border-b ${
                isCurrentDay ? 'bg-[#7BC9A6]/5' : ''
              }`}>
                <div className="flex items-center gap-2">
                  <CalendarIcon className={`h-4 w-4 ${isCurrentDay ? 'text-[#7BC9A6]' : 'text-gray-400'}`} />
                  <span className={`font-semibold ${isCurrentDay ? 'text-[#7BC9A6]' : 'text-gray-900'}`}>
                    {dateKey}
                  </span>
                  {activitiesForDate.length > 0 ? (
                    <Badge variant="secondary" className="bg-[#7BC9A6] text-white">
                      {activitiesForDate.length}
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-gray-100 text-gray-400">
                      0
                    </Badge>
                  )}
                </div>
                {holiday && (
                  <div className="text-xs text-gray-500">
                    {holiday.name}
                  </div>
                )}
              </div>

              {/* Activities List - Always Visible */}
              <CardContent className="p-0">
                {activitiesForDate.length === 0 ? (
                  <div className="px-4 py-6 text-center text-gray-400 text-sm">
                    No activities scheduled
                  </div>
                ) : (
                  activitiesForDate.map((activity, index) => (
                    <div
                      key={activity.id}
                      className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                        index !== activitiesForDate.length - 1 ? 'border-b' : ''
                      }`}
                      onClick={() => {
                        setSelectedActivity(activity);
                        setShowActivityModal(true);
                      }}
                    >
                      <div className="flex gap-3">
                        {/* Time Column */}
                        <div className="flex-shrink-0 text-right min-w-[50px]">
                          <div className="text-sm font-semibold text-gray-900">
                            {formatTime(activity.startTime)}
                          </div>
                          <div className="text-xs text-gray-400">
                            {formatTime(activity.endTime)}
                          </div>
                        </div>

                        {/* Content Column */}
                        <div className="flex-1 min-w-0">
                          {/* Title + Badge */}
                          <div className="flex items-start gap-2 mb-2">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 text-sm inline">
                                {activity.title}
                              </h4>
                            </div>
                            <Badge
                              className={`${
                                activity.type === 'customer_visit'
                                  ? 'bg-blue-100 text-blue-700 border-blue-200'
                                  : activity.type === 'sales_meeting'
                                  ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                                  : activity.type === 'site_survey'
                                  ? 'bg-purple-100 text-purple-700 border-purple-200'
                                  : activity.type === 'internal_meeting'
                                  ? 'bg-orange-100 text-orange-700 border-orange-200'
                                  : activity.type === 'follow_up_call'
                                  ? 'bg-pink-100 text-pink-700 border-pink-200'
                                  : 'bg-gray-100 text-gray-700 border-gray-200'
                              } text-xs px-2 py-0.5 font-medium border`}
                            >
                              {getActivityIcon(activity.type)}
                              <span className="ml-1">
                                {activity.type === 'customer_visit'
                                  ? 'customer_visit'
                                  : activity.type === 'sales_meeting'
                                  ? 'sales_meeting'
                                  : activity.type === 'site_survey'
                                  ? 'site_survey'
                                  : activity.type === 'internal_meeting'
                                  ? 'internal_meeting'
                                  : activity.type === 'follow_up_call'
                                  ? 'follow_up_call'
                                  : 'task'}
                              </span>
                            </Badge>
                          </div>

                          {/* Details */}
                          <div className="space-y-1 text-xs text-gray-600">
                            {activity.customer && (
                              <div className="flex items-center gap-1.5">
                                <User className="h-3.5 w-3.5 text-gray-400" />
                                <span>{activity.customer}</span>
                              </div>
                            )}
                            {activity.location && (
                              <div className="flex items-center gap-1.5">
                                <MapPin className="h-3.5 w-3.5 text-gray-400" />
                                <span>{activity.location}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1.5">
                              <Users className="h-3.5 w-3.5 text-gray-400" />
                              <span>{activity.assignedTo}</span>
                              {activity.assignedTo === "You" && (
                                <Badge
                                  variant="secondary"
                                  className="bg-blue-50 text-blue-600 text-xs px-2 py-0 border-0"
                                >
                                  งานของคุณ
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  // List View (All Activities)
  const renderListView = () => {
    // Group activities by date
    const groupedActivities: { [key: string]: Activity[] } = {};
    
    filteredActivities.forEach(activity => {
      const dateKey = activity.startTime.toLocaleDateString(i18n.language === "th" ? "th-TH" : "en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        weekday: "short"
      });
      
      if (!groupedActivities[dateKey]) {
        groupedActivities[dateKey] = [];
      }
      groupedActivities[dateKey].push(activity);
    });

    // Sort activities within each group
    Object.keys(groupedActivities).forEach(dateKey => {
      groupedActivities[dateKey].sort((a, b) => 
        a.startTime.getTime() - b.startTime.getTime()
      );
    });

    const toggleDate = (dateKey: string) => {
      const newExpanded = new Set(expandedDates);
      if (newExpanded.has(dateKey)) {
        newExpanded.delete(dateKey);
      } else {
        newExpanded.add(dateKey);
      }
      setExpandedDates(newExpanded);
    };

    return (
      <div className="space-y-4">
        {Object.keys(groupedActivities).length === 0 ? (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-12 text-center">
              <CalendarIcon className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">No activities found</p>
            </CardContent>
          </Card>
        ) : (
          Object.keys(groupedActivities).map(dateKey => {
            const isExpanded = expandedDates.has(dateKey);
            const activitiesForDate = groupedActivities[dateKey];

            return (
              <Card key={dateKey} className="border-0 shadow-sm overflow-hidden">
                {/* Date Header */}
                <button
                  onClick={() => toggleDate(dateKey)}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors border-b"
                >
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-[#7BC9A6]" />
                    <span className="font-semibold text-gray-900">{dateKey}</span>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                      {activitiesForDate.length}
                    </Badge>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  )}
                </button>

                {/* Activities List */}
                {isExpanded && (
                  <CardContent className="p-0">
                    {activitiesForDate.map((activity, index) => (
                      <div
                        key={activity.id}
                        className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                          index !== activitiesForDate.length - 1 ? 'border-b' : ''
                        }`}
                        onClick={() => {
                          setSelectedActivity(activity);
                          setShowActivityModal(true);
                        }}
                      >
                        <div className="flex gap-3">
                          {/* Time Column */}
                          <div className="flex-shrink-0 text-right min-w-[50px]">
                            <div className="text-sm font-semibold text-gray-900">
                              {formatTime(activity.startTime)}
                            </div>
                            <div className="text-xs text-gray-400">
                              {formatTime(activity.endTime)}
                            </div>
                          </div>

                          {/* Content Column */}
                          <div className="flex-1 min-w-0">
                            {/* Title + Badge */}
                            <div className="flex items-start gap-2 mb-2">
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 text-sm inline">
                                  {activity.title}
                                </h4>
                              </div>
                              <Badge
                                className={`${
                                  activity.type === 'customer_visit'
                                    ? 'bg-blue-100 text-blue-700 border-blue-200'
                                    : activity.type === 'sales_meeting'
                                    ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                                    : activity.type === 'site_survey'
                                    ? 'bg-purple-100 text-purple-700 border-purple-200'
                                    : activity.type === 'internal_meeting'
                                    ? 'bg-orange-100 text-orange-700 border-orange-200'
                                    : activity.type === 'follow_up_call'
                                    ? 'bg-pink-100 text-pink-700 border-pink-200'
                                    : 'bg-gray-100 text-gray-700 border-gray-200'
                                } text-xs px-2 py-0.5 font-medium border`}
                              >
                                {getActivityIcon(activity.type)}
                                <span className="ml-1">
                                  {activity.type === 'customer_visit'
                                    ? 'customer_visit'
                                    : activity.type === 'sales_meeting'
                                    ? 'sales_meeting'
                                    : activity.type === 'site_survey'
                                    ? 'site_survey'
                                    : activity.type === 'internal_meeting'
                                    ? 'internal_meeting'
                                    : activity.type === 'follow_up_call'
                                    ? 'follow_up_call'
                                    : 'task'}
                                </span>
                              </Badge>
                            </div>

                            {/* Details */}
                            <div className="space-y-1 text-xs text-gray-600">
                              {activity.customer && (
                                <div className="flex items-center gap-1.5">
                                  <User className="h-3.5 w-3.5 text-gray-400" />
                                  <span>{activity.customer}</span>
                                </div>
                              )}
                              {activity.location && (
                                <div className="flex items-center gap-1.5">
                                  <MapPin className="h-3.5 w-3.5 text-gray-400" />
                                  <span>{activity.location}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-1.5">
                                <Users className="h-3.5 w-3.5 text-gray-400" />
                                <span>{activity.assignedTo}</span>
                                <Badge
                                  variant="secondary"
                                  className="bg-blue-50 text-blue-600 text-xs px-2 py-0 border-0"
                                >
                                  งานของคุณ
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                )}
              </Card>
            );
          })
        )}
      </div>
    );
  };

  // Week View
  const renderWeekView = () => {
    const daysInWeek = getDaysInWeek();
    const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

    return (
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="grid grid-cols-8 gap-2">
            {/* Time Column */}
            <div className="space-y-[60px]">
              <div className="h-12" /> {/* Header spacer */}
              {hours.map(hour => (
                <div key={hour} className="text-xs text-gray-500 text-right pr-2">
                  {hour}:00
                </div>
              ))}
            </div>

            {/* Day Columns */}
            {daysInWeek.map(date => {
              const activitiesForDay = getActivitiesForDate(date);
              const isCurrentDay = isToday(date);

              return (
                <div key={date.toISOString()} className="space-y-1">
                  {/* Day Header */}
                  <div
                    className={`text-center p-2 rounded-lg mb-2 cursor-pointer ${
                      isCurrentDay
                        ? 'bg-[#7BC9A6] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => {
                      setCurrentDate(date);
                      setDisplayMode('day');
                    }}
                  >
                    <div className="text-xs font-medium">{formatDate(date).split(',')[0]}</div>
                    <div className="text-lg font-bold">{date.getDate()}</div>
                  </div>

                  {/* Activities */}
                  <div className="space-y-1 min-h-[720px] relative">
                    {activitiesForDay.map(activity => {
                      const startHour = activity.startTime.getHours();
                      const startMinute = activity.startTime.getMinutes();
                      const duration = (activity.endTime.getTime() - activity.startTime.getTime()) / (1000 * 60);
                      const top = ((startHour - 8) * 60 + startMinute) + 48; // 48px for header
                      const height = duration;

                      return (
                        <div
                          key={activity.id}
                          className="absolute left-0 right-0"
                          style={{ top: `${top}px`, height: `${Math.max(height, 30)}px` }}
                        >
                          {renderActivityCard(activity, true)}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  };

  // Day View
  const renderDayView = () => {
    const activitiesForDay = getActivitiesForCurrentDay();
    const hours = Array.from({ length: 12 }, (_, i) => i + 8);

    return (
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3 border-b">
          <CardTitle className="text-xl flex items-center justify-between">
            <span>{formatDateFull(currentDate)}</span>
            <Badge className="bg-[#7BC9A6] text-white">
              {activitiesForDay.length} {activitiesForDay.length === 1 ? 'Activity' : 'Activities'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          {activitiesForDay.length === 0 ? (
            <div className="text-center py-12">
              <CalendarIcon className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">No activities scheduled for this day</p>
            </div>
          ) : (
            <div className="grid grid-cols-8 gap-4">
              {/* Time Column */}
              <div className="space-y-[60px]">
                {hours.map(hour => (
                  <div key={hour} className="text-sm text-gray-500 text-right pr-2">
                    {hour}:00
                  </div>
                ))}
              </div>

              {/* Activities Column */}
              <div className="col-span-7 relative min-h-[720px]">
                {activitiesForDay.map(activity => {
                  const startHour = activity.startTime.getHours();
                  const startMinute = activity.startTime.getMinutes();
                  const duration = (activity.endTime.getTime() - activity.startTime.getTime()) / (1000 * 60);
                  const top = (startHour - 8) * 60 + startMinute;
                  const height = duration;

                  return (
                    <div
                      key={activity.id}
                      className="absolute left-0 right-0"
                      style={{ top: `${top}px`, height: `${Math.max(height, 60)}px` }}
                    >
                      <Card
                        className="h-full border-l-4 cursor-pointer hover:shadow-lg transition-shadow"
                        style={{ borderLeftColor: getActivityColor(activity.type).replace('bg-', '#') }}
                        onClick={() => {
                          setSelectedActivity(activity);
                          setShowActivityModal(true);
                        }}
                      >
                        <CardContent className="p-3 h-full">
                          <div className="flex items-start gap-2 mb-2">
                            <div className={`${getActivityColor(activity.type)} text-white p-1.5 rounded`}>
                              {getActivityIcon(activity.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 text-sm truncate">
                                {activity.title}
                              </h4>
                              <p className="text-xs text-gray-600">
                                {formatTime(activity.startTime)} - {formatTime(activity.endTime)}
                              </p>
                            </div>
                            <Badge className={getStatusBadge(activity.status)}>
                              {activity.status}
                            </Badge>
                          </div>
                          {activity.customer && (
                            <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-1">
                              <User className="h-3 w-3" />
                              <span className="truncate">{activity.customer}</span>
                            </div>
                          )}
                          {activity.location && (
                            <div className="flex items-center gap-1.5 text-xs text-gray-600">
                              <MapPin className="h-3 w-3" />
                              <span className="truncate">{activity.location}</span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {t("nav.calendar_activities")}
          </h1>
          <p className="text-sm text-gray-600">
            {t("calendar.manage_activities")}
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-4 border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="space-y-4">
              {/* Top Row: Navigation + Title */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (displayMode === 'month') goToPreviousMonth();
                      else if (displayMode === 'week') goToPreviousWeek();
                      else if (displayMode === 'day') goToPreviousDay();
                    }}
                    className="h-9 w-9 p-0"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-[#7BC9A6]" />
                    <h2 className="text-lg font-bold text-gray-900 min-w-[200px] text-center">
                      {displayMode === 'day' ? formatDateFull(currentDate) : getCurrentMonthYear()}
                    </h2>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (displayMode === 'month') goToNextMonth();
                      else if (displayMode === 'week') goToNextWeek();
                      else if (displayMode === 'day') goToNextDay();
                    }}
                    className="h-9 w-9 p-0"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToToday}
                  className="px-4 h-9 border-[#7BC9A6] text-[#7BC9A6] hover:bg-[#7BC9A6] hover:text-white font-medium"
                >
                  Today
                </Button>
              </div>

              {/* Bottom Row: View Mode Toggle + Search + Add Button */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                {/* View Mode Toggle */}
                <div className="flex items-center gap-1 border-2 border-gray-200 rounded-lg p-1 bg-white w-full sm:w-auto">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-8 flex-1 sm:flex-initial sm:px-3 ${
                      displayMode === "month"
                        ? "bg-[#7BC9A6] text-white hover:bg-[#6CB88A]"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => setDisplayMode("month")}
                  >
                    <LayoutGrid className="h-4 w-4 sm:mr-1.5" />
                    <span className="text-xs font-medium">Month</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-8 flex-1 sm:flex-initial sm:px-3 ${
                      displayMode === "week"
                        ? "bg-[#7BC9A6] text-white hover:bg-[#6CB88A]"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => setDisplayMode("week")}
                  >
                    <Columns className="h-4 w-4 sm:mr-1.5" />
                    <span className="text-xs font-medium">Week</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-8 flex-1 sm:flex-initial sm:px-3 ${
                      displayMode === "day"
                        ? "bg-[#7BC9A6] text-white hover:bg-[#6CB88A]"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => setDisplayMode("day")}
                  >
                    <Square className="h-4 w-4 sm:mr-1.5" />
                    <span className="text-xs font-medium">Day</span>
                  </Button>
                </div>

                {/* Search Bar */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder={t("calendar.search_activities")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-10 border-gray-200"
                  />
                </div>

                {/* Add Button */}
                <Button
                  onClick={() => setShowCreateModal(true)}
                  className="h-10 px-4 bg-[#7BC9A6] hover:bg-[#6CB88A] text-white font-medium whitespace-nowrap"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  บันทึกกิจกรรม
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendar Views */}
        {displayMode === 'month' && renderMonthView()}
        {displayMode === 'week' && renderWeekView()}
        {displayMode === 'day' && renderDayView()}
        {displayMode === 'list' && renderListView()}
      </div>

      {/* Modals */}
      <AddActivityModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />

      {selectedActivity && (
        <ActivityDetailModal
          isOpen={showActivityModal}
          onClose={() => {
            setShowActivityModal(false);
            setSelectedActivity(null);
          }}
          activity={selectedActivity}
        />
      )}

      <QuickVisitModal
        isOpen={showQuickVisitModal}
        onClose={() => setShowQuickVisitModal(false)}
        onSave={(data) => {
          console.log("Quick Visit saved:", data);
          setShowQuickVisitModal(false);
        }}
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
          setShowCreateModal(true);
        }}
        onQuickCreatetask={() => {
          if (onNavigate) onNavigate("/tasks", "add");
        }}
      />

      {/* Quick Actions FAB */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setShowQuickActionsMenu(true)}
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow bg-[#7BC9A6] hover:bg-[#6CB88A]"
        >
          <Plus className="h-6 w-6 text-white" />
        </Button>
      </div>
    </div>
  );
}