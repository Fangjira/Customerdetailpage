import { useState } from "react";
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  User, 
  Clock, 
  Building2, 
  Download,
  TrendingUp,
  Users,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Eye,
  ChevronRight,
  FileText
} from "lucide-react";
import { useRoleTheme } from "../../hooks/use-role-theme";
import { useRole } from "../../contexts/role-context";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useTranslation } from "react-i18next";
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Visit {
  id: string;
  date: string;
  projectCustomer: string;
  objective: string;
  type: string;
  notes: string;
  participants: Array<{
    name: string;
    role?: string;
  }>;
  salesPerson: string;
  location?: string;
  status: 'completed' | 'cancelled' | 'in_progress' | 'follow_up_required';
  businessUnit?: string;
  serviceNames: string; // เพิ่มฟิลด์ serviceNames
  duration?: string;
  nextAction?: string;
  cancelledReason?: string;
  cancelledBy?: string;
  cancelledAt?: string;
}

interface CheckInHistoryScreenProps {
  onVisitClick?: (visitId: string) => void;
}

export function CheckInHistoryScreen({ onVisitClick }: CheckInHistoryScreenProps) {
  const { t } = useTranslation();
  const roleTheme = useRoleTheme();
  const { role } = useRole();
  
  // Check if user is Manager
  const isManager = role === "Sales Manager" || role === "Admin";
  const currentUserName = "ทะมากัท รัฐเจริญ"; // ในระบบจริงจะดึงจาก auth context
  const currentUserBU = "HCP"; // Business Unit ของผู้ใช้ปัจจุบัน - ในระบบจริงจะดึงจาก auth context
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'today' | 'week' | 'month' | 'custom'>('all');
  const [selectedSalesPerson, setSelectedSalesPerson] = useState<string>('all');
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [customStartDate, setCustomStartDate] = useState<string>('');
  const [customEndDate, setCustomEndDate] = useState<string>('');

  // Mock data - ข้อมูลการเยี่ยมชมลูกค้าของทีมทั้งหมด
  const visits: Visit[] = [
    {
      id: "V001",
      date: "2026-02-14",
      projectCustomer: "องค์การเภสัชกรรม",
      objective: "นำเสนอระบบจัดการคลังสินค้ายาและเวชภัณฑ์",
      type: "นำเสนอผลิตภัณฑ์",
      serviceNames: "Customs",
      notes: "นำเสนอ Warehouse Management System สำหรับจัดการยาและเวชภัณฑ์ พร้อมระบบ Temperature Control และ Track & Trace แบบ Real-time",
      participants: [
        { name: "นพ.สมชาย วงศ์ใหญ่", role: "ผู้อำนวยการฝ่ายจัดซื้อ" },
        { name: "ภญ.สุภาพร ศรีสวัสดิ์", role: "หัวหน้าคลังยา" }
      ],
      salesPerson: "ทะมากัท รัฐเจริญ",
      location: "กระทรวงสาธารณสุข ถนนติวานนท์",
      status: "completed",
      businessUnit: "HCP",
      duration: "2 ชม.",
      nextAction: "ส่งใบเสนอราคาภายใน 3 วัน"
    },
    {
      id: "V002",
      date: "2026-02-13",
      projectCustomer: "สภากาชาดไทย",
      objective: "ติดตามโครงการขนส่งเลือดและอวัยวะ",
      type: "ติดตามงาน",
      serviceNames: "Freight",
      notes: "ติดตามความคืบหน้าโครงการ Cold Chain Transportation สำหรับการขนส่งเลือดและอวัยวะ พร้อมระบบ GPS Tracking",
      participants: [
        { name: "ดร.สุรศักดิ์ วงศ์เจริญ", role: "ผู้อำนวยการโครงการ" },
        { name: "คุณวิภา จันทร์เพ็ญ", role: "หัวหน้าห้องเลือด" }
      ],
      salesPerson: "ศศิน ธัมปนะ",
      location: "สภากาชาดไทย ถนนอังรีดูนังต์",
      status: "follow_up_required",
      businessUnit: "HCP",
      duration: "1.5 ชม.",
      nextAction: "นัดหมายประชุมครั้งต่อไป"
    },
    {
      id: "V003",
      date: "2026-02-12",
      projectCustomer: "สถาบันวิจัยจุฬาภรณ์",
      objective: "นำเสนอระบบขนส่งตัวอย่างทางการแพทย์",
      type: "การประชุม",
      serviceNames: "Crossborder",
      notes: "นำเสนอโซลูชันการขนส่งตัวอย่างทางการแพทย์และสารเคมีอันตราย พร้อมระบบจัดการเอกสาร MSDS",
      participants: [
        { name: "ดร.สมศักดิ์ เจริญสุข", role: "ผู้อำนวยการสถาบัน" },
        { name: "คุณปรียา วิจิตร", role: "หัวหน้าฝ่ายจัดซื้อ" }
      ],
      salesPerson: "พงษ์ศิลป์ เครือกลาง",
      location: "สถาบันวิจัยจุฬาภรณ์ เขตหลักสี่",
      status: "completed",
      businessUnit: "HCP",
      duration: "3 ชม.",
      nextAction: "รอการตัดสินใจ"
    },
    {
      id: "V004",
      date: "2026-02-12",
      projectCustomer: "บริษัท ABC Logistics จำกัด",
      objective: "นำเสนอระบบ Warehouse Management",
      type: "นำเสนอผลิตภัณฑ์",
      serviceNames: "Crossborder",
      notes: "นำเสนอระบบ WMS แบบครบวงจร พร้อม IoT sensors และ AI-powered inventory optimization",
      participants: [
        { name: "คุณสมชาย ใจดี", role: "CEO" },
        { name: "คุณสุดา รักษ์สิน", role: "COO" }
      ],
      salesPerson: "สพษณวี กิติพงษ์",
      location: "สำนักงานใหญ่ สาทร",
      status: "in_progress",
      businessUnit: "Logistics",
      duration: "2 ชม.",
      nextAction: "Demo ระบบจริง"
    },
    {
      id: "V005",
      date: "2026-02-11",
      projectCustomer: "บริษัท ดีซีเอช ออริกา (ประเทศไทย)",
      objective: "นำเสนอระบบขนส่งสารเคมีและวัตถุอันตราย",
      type: "นำเสนอผลิตภัณฑ์",
      serviceNames: "Freight",
      notes: "นำเสนอบริการขนส่งสารเคมีและวัตถุอันตรายสำหรับอุตสาหกรรมเภสัชกรรม พร้อมใบอนุญาต กสอ. ครบถ้วน",
      participants: [
        { name: "คุณวิชัย ธนาพงษ์", role: "ผู้จัดการฝ่ายโลจิสติกส์" },
        { name: "คุณสุนทร ประสิทธิ์", role: "วิศวกรความปลอดภัย" }
      ],
      salesPerson: "ทะมากัท รัฐเจริญ",
      location: "นิคมอุตสาหกรรมบางปู",
      status: "completed",
      businessUnit: "Manufacturing",
      duration: "2.5 ชม.",
      nextAction: "จัดทำใบเสนอราคา"
    },
    {
      id: "V006",
      date: "2026-02-11",
      projectCustomer: "โรงพยาบาลศิริราช",
      objective: "ติดตามปัญหาการขนส่งอุปกรณ์การแพทย์",
      type: "แก้ไขปัญหา",
      serviceNames: "Trading",
      notes: "เข้าแก้ไขปัญหาการขนส่งอุปกรณ์การแพทย์ล่าช้า และปรับปรุงกระบวนการให้รวดเร็วขึ้น",
      participants: [
        { name: "คุณสมชาย วิจัยกุล", role: "ผู้จัดการฝ่ายจัดซื้อ" }
      ],
      salesPerson: "ศศิน ธัมปนะ",
      location: "คณะแพทยศาสตร์ศิริราชพยาบาล",
      status: "completed",
      businessUnit: "HCP",
      duration: "1 ชม.",
      nextAction: "ติดตามผลหลัง 1 สัปดาห์"
    },
    {
      id: "V007",
      date: "2026-02-10",
      projectCustomer: "บริษัท XYZ Trading จำกัด",
      objective: "เจรจาสัญญาระยะยาว",
      type: "ประชุมเจรจา",
      serviceNames: "customs",
      notes: "เจรจาสัญญาการให้บริการจัดเก็บสินค้าระยะยาว 3 ปี มูลค่าโครงการประมาณ 5 ล้านบาท",
      participants: [
        { name: "คุณประสิทธิ์ วงศ์ใหญ่", role: "Managing Director" },
        { name: "คุณนันทิยา แสงสว่าง", role: "CFO" }
      ],
      salesPerson: "พงษ์ศิลป์ เครือกลาง",
      location: "ห้องประชุม 1 สำนักงานใหญ่",
      status: "follow_up_required",
      businessUnit: "Retail",
      duration: "2 ชม.",
      nextAction: "ส่งร่างสัญญาภายใน 5 วัน"
    },
    {
      id: "V-CANCELLED-001",
      date: "2026-02-17",
      projectCustomer: "Lazada Thailand",
      objective: "ประชุมลูกค้า - Lazada",
      type: "นำเสนอผลิตภัณฑ์",
      serviceNames: "customs",
      notes: "การประชุมถูกยกเลิก",
      participants: [
        { name: "คุณอรรถพล เจริญสุข", role: "Head of Fulfillment" }
      ],
      salesPerson: "ทะมากัท รัฐเจริญ",
      location: "Lazada Office",
      status: "cancelled",
      businessUnit: "HCP",
      duration: "1.5 ชม.",
      cancelledReason: "ลูกค้าขอเลื่อนนัดหมาย เนื่องจากมีประชุมเร่งด่วน",
      cancelledBy: "ทะมากัท รัฐเจริญ",
      cancelledAt: "16 ก.พ. 2569 15:30 น."
    },
    {
      id: "V-CANCELLED-002",
      date: "2026-02-13",
      projectCustomer: "JWD Logistics",
      objective: "สำรวจไซต์ - JWD Warehouse",
      type: "สำรวจสถานที่",
      serviceNames: "Trading",
      notes: "การสำรวจสถานที่ถูกยกเลิก",
      participants: [
        { name: "คุณสมชาย วิศวกรรม", role: "Warehouse Manager" }
      ],
      salesPerson: "พงษ์ศิลป์ เครือกลาง",
      location: "Bangna Industrial Estate",
      status: "cancelled",
      businessUnit: "HCP",
      duration: "2 ชม.",
      cancelledReason: "สภาพอากาศไม่เอื้ออำนวย ฝนตกหนัก",
      cancelledBy: "พงษ์ศิลป์ เครือกลาง",
      cancelledAt: "12 ก.พ. 2569 09:00 น."
    },
    {
      id: "V-CANCELLED-003",
      date: "2026-02-22",
      projectCustomer: "Big C Supercenter",
      objective: "ทบทวนสัญญา - Big C Supercenter",
      type: "ประชุมเจรจา",
      serviceNames: "Other",
      notes: "การประชุมถูกยกเลิก",
      participants: [
        { name: "คุณวิชัย ประสิทธิ์", role: "Supply Chain Director" }
      ],
      salesPerson: "ทะมากัท รัฐเจริญ",
      location: "Big C Head Office",
      status: "cancelled",
      businessUnit: "HCP",
      duration: "1.5 ชม.",
      cancelledReason: "ผู้ตัดสินใจลาป่วย ขอเลื่อนการนัดหมาย",
      cancelledBy: "ทะมากัท รัฐเจริญ",
      cancelledAt: "21 ก.พ. 2569 16:45 น."
    },
    {
      id: "V-CANCELLED-004",
      date: "2026-02-26",
      projectCustomer: "Mini CRM Training Center",
      objective: "อบรม - Warehouse Safety",
      type: "การประชุม",
      serviceNames: "Trading",
      notes: "การอบรมถูกยกเลิก",
      participants: [
        { name: "ทีมงานทั้งหมด", role: "Staff" }
      ],
      salesPerson: "ทะมากัท รัฐเจริญ",
      location: "Training Room",
      status: "cancelled",
      businessUnit: "HCP",
      duration: "3 ชม.",
      cancelledReason: "วิทยากรติดภารกิจเร่งด่วน เลื่อนเป็นเดือนหน้า",
      cancelledBy: "ทะมากัท รัฐเจริญ",
      cancelledAt: "25 ก.พ. 2569 10:15 น."
    },
    {
      id: "V008",
      date: "2026-02-10",
      projectCustomer: "Central Retail Corporation",
      objective: "นำเสนอโซลูชัน Omnichannel Fulfillment",
      type: "นำเสนอผลิตภัณฑ์",
      serviceNames: "customs",
      notes: "นำเสนอระบบจัดการคลังสินค้าแบบ Omnichannel พร้อมเชื่อมต่อกับ E-commerce และหน้าร้าน",
      participants: [
        { name: "คุณสุรชัย จิตต์เจริญ", role: "VP - Supply Chain" },
        { name: "คุณวรรณา สมบูรณ์", role: "Director - Logistics" }
      ],
      salesPerson: "สพษณวี กิติพงษ์",
      location: "สำนักงานใหญ่ เซ็นทรัล",
      status: "in_progress",
      businessUnit: "Retail",
      duration: "3 ชม.",
      nextAction: "ทำ Pilot Project"
    },
    {
      id: "V009",
      date: "2026-02-10",
      projectCustomer: "โรงพยาบาลรามาธิบดี",
      objective: "นำเสนอระบบติดตามยาและเวชภัณฑ์",
      type: "นำเสนอผลิตภัณฑ์",
      serviceNames: "Trading",
      notes: "นำเสนอระบบ Track & Trace สำหรับติดตามยาตั้งแต่คลังจนถึงผู้ป่วย พร้อม RFID Technology",
      participants: [
        { name: "ภญ.สมหญิง ใจงาม", role: "หัวหน้าเภสัชกร" },
        { name: "คุณวิทย์ ศรีสุข", role: "ผู้อำนวยการโรงพยาบาล" }
      ],
      salesPerson: "ทะมากัท รัฐเจริญ",
      location: "โรงพยาบาลรามาธิบดี พญาไท",
      status: "completed",
      businessUnit: "HCP",
      duration: "2 ชม.",
      nextAction: "ส่ง Proposal ภายใน 1 สัปดาห์"
    },
    {
      id: "V010",
      date: "2026-02-09",
      projectCustomer: "บริษัท SCG Packaging จำกัด",
      objective: "ติดตามการใช้งานระบบ WMS",
      type: "ติดตามงาน",
      serviceNames: "Trading",
      notes: "ติดตามการใช้งานระบบ WMS หลัง Go-Live 2 เดือน ประเมินผลและรับ Feedback",
      participants: [
        { name: "คุณสมศักดิ์ ชัยชนะ", role: "Plant Manager" },
        { name: "คุณพิมพ์ใจ ดีมาก", role: "Warehouse Supervisor" }
      ],
      salesPerson: "สพษณวี กิติพงษ์",
      location: "โรงงาน SCG บางซื่อ",
      status: "completed",
      businessUnit: "Manufacturing",
      duration: "1.5 ชม.",
      nextAction: "จัดทำ Success Story"
    },
    {
      id: "V011",
      date: "2026-02-09",
      projectCustomer: "บริษัท Thai Union Group จำกัด",
      objective: "นำเสนอระบบ Cold Storage Management",
      type: "นำเสนอผลิตภัณฑ์",
      serviceNames: "customs",
      notes: "นำเสนอระบบจัดการคลังเย็นอัจฉริยะ พร้อมระบบควบคุมอุณหภูมิแบบ Real-time และ Alert System",
      participants: [
        { name: "คุณวิรัช มั่นคง", role: "Director - Supply Chain" },
        { name: "คุณสุภาพร ใจดี", role: "Logistics Manager" }
      ],
      salesPerson: "ศศิน ธัมปนะ",
      location: "สำนักงานใหญ่ สมุทรสาคร",
      status: "in_progress",
      businessUnit: "FMCG",
      duration: "2.5 ชม.",
      nextAction: "นัด Site Visit ที่โรงงาน"
    },
    {
      id: "V012",
      date: "2026-02-09",
      projectCustomer: "บริษัท CP All จำกัด (7-Eleven)",
      objective: "เจรจาต่อสัญญาบริการขนส่งและจัดเก็บ",
      type: "ประชุมเจรจา",
      serviceNames: "Trading",
      notes: "เจรจาต่อสัญญาบริการ Distribution Center และ Last Mile Delivery สำหรับสาขา 7-Eleven ทั่วประเทศ",
      participants: [
        { name: "คุณอนุชา สุขใจ", role: "VP - Logistics" },
        { name: "คุณประภา วรรณดี", role: "GM - Distribution" }
      ],
      salesPerson: "พงษ์ศิลป์ เครือกลาง",
      location: "CP Tower สีลม",
      status: "follow_up_required",
      businessUnit: "Retail",
      duration: "3 ชม.",
      nextAction: "ปรับราคาและส่ง Proposal ใหม่"
    },
    {
      id: "V013",
      date: "2026-02-08",
      projectCustomer: "บริษัท Toyota Motor Thailand จำกัด",
      objective: "นำเสนอระบบจัดการอะไหล่ยานยนต์",
      type: "นำเสนอผลิตภัณฑ์",
      serviceNames: "Trading",
      notes: "นำเสนอระบบ Parts Management System พร้อมเชื่อมต่อกับ Dealer Network ทั่วประเทศ",
      participants: [
        { name: "คุณสมพร ดำรงค์", role: "General Manager - After Sales" },
        { name: "คุณนิธิ วิจิตร", role: "Parts Manager" }
      ],
      salesPerson: "สพษณวี กิติพงษ์",
      location: "สำนักงานใหญ่ สำโรง",
      status: "in_progress",
      businessUnit: "Automotive",
      duration: "2 ชม.",
      nextAction: "จัดทำ POC"
    },
    {
      id: "V014",
      date: "2026-02-08",
      projectCustomer: "โรงพยาบาลบำรุงราษฎร์",
      objective: "แก้ไขปัญหาระบบ Temperature Monitoring",
      type: "แก้ไขปัญหา",
      serviceNames: "Trading",
      notes: "เข้าแก้ไข Bug ระบบติดตาม Temperature ในห้องเก็บวัคซีน และ Update Firmware",
      participants: [
        { name: "ภญ.วิภา สุขสันต์", role: "หัวหน้าห้องยา" }
      ],
      salesPerson: "ทะมากัท รัฐเจริญ",
      location: "โรงพยาบาลบำรุงราษฎร์ สุขุมวิท",
      status: "completed",
      businessUnit: "HCP",
      duration: "1 ชม.",
      nextAction: "Monitoring ระบบอีก 1 สัปดาห์"
    },
    {
      id: "V015",
      date: "2026-02-08",
      projectCustomer: "บริษัท Unilever Thai Trading จำกัด",
      objective: "นำเสนอระบบ Demand Planning",
      type: "นำเสนอผลิตภัณฑ์",
      serviceNames: "Warehouse",
      notes: "นำเสนอระบบวางแผนความต้องการสินค้าด้วย AI/ML พร้อมการพยากรณ์ที่แม่นยำ",
      participants: [
        { name: "คุณจิราพร สว่างเจริญ", role: "Supply Chain Director" },
        { name: "คุณธนพล ธนากุล", role: "Demand Planning Manager" }
      ],
      salesPerson: "ศศิน ธัมปนะ",
      location: "สำนักงานใหญ่ ปทุมวัน",
      status: "completed",
      businessUnit: "FMCG",
      duration: "2.5 ชม.",
      nextAction: "รอการตัดสินใจ 2 สัปดาห์"
    },
    {
      id: "V016",
      date: "2026-02-07",
      projectCustomer: "บริษัท Lazada Thailand จำกัด",
      objective: "หารือเรื่องขยาย Warehouse Capacity",
      type: "การประชุม",
      serviceNames: "Warehouse",
      notes: "หารือแผนขยายพื้นที่คลังสินค้าเพิ่มอีก 20,000 ตร.ม. เพื่อรองรับ Peak Season",
      participants: [
        { name: "คุณอรรถพล เจริญสุข", role: "Head of Fulfillment" },
        { name: "คุณปิยะ สุขดี", role: "Warehouse Operations Manager" }
      ],
      salesPerson: "พงษ์ศิลป์ เครือกลาง",
      location: "Lazada Warehouse ลาดกระบัง",
      status: "follow_up_required",
      businessUnit: "E-commerce",
      duration: "2 ชม.",
      nextAction: "ส่งข้อเสนอพื้นที่และราคา"
    },
    {
      id: "V017",
      date: "2026-02-07",
      projectCustomer: "บริษัท PTT Global Chemical จำกัด",
      objective: "นำเสนอระบบจัดการสารเคมีอันตราย",
      type: "นำเสนอผลิตภัณฑ์",
      serviceNames: "other",
      notes: "นำเสนอระบบจัดการสารเคมีอันตราย พร้อม MSDS Digital และ Safety Compliance Monitoring",
      participants: [
        { name: "คุณวิศวะ ประสิทธิ์", role: "HSE Manager" },
        { name: "คุณสุรพล มั่นคง", role: "Warehouse Manager" }
      ],
      salesPerson: "ทะมากัท รัฐเจริญ",
      location: "โรงงาน PTTGC ระยอง",
      status: "in_progress",
      businessUnit: "Manufacturing",
      duration: "3 ชม.",
      nextAction: "นัดดู Demo ที่สำนักงาน"
    },
    {
      id: "V018",
      date: "2026-02-07",
      projectCustomer: "โรงพยาบาลจุฬาลงกรณ์",
      objective: "ติดตามโครงการ Hospital Logistics System",
      type: "ติดตามงาน",
      serviceNames: "Warehouse",
      notes: "ติดตามการ Deploy ระบบ Logistics ภายในโรงพยาบาล Phase 2 - ห้องผ่าตัดและ ICU",
      participants: [
        { name: "คุณสมศักดิ์ เจริญกิจ", role: "ผู้อำนวยการโรงพยาบาล" },
        { name: "นพ.วิชัย ธนากุล", role: "หัวหน้าแพทย์" }
      ],
      salesPerson: "ศศิน ธัมปนะ",
      location: "โรงพยาบาลจุฬาลงกรณ์ ปทุมวัน",
      status: "completed",
      businessUnit: "HCP",
      duration: "2 ชม.",
      nextAction: "เตรียม UAT Phase 2"
    },
    {
      id: "V019",
      date: "2026-02-06",
      projectCustomer: "บริษัท Shopee Thailand จำกัด",
      objective: "เจรจาสัญญา Warehouse Partnership",
      type: "ประชุมเจรจา",
      serviceNames: "Warehouse",
      notes: "เจรจาความร่วมมือในการให้บริการคลังสินค้าสำหรับ Shopee Mall Sellers ทั่วประเทศ",
      participants: [
        { name: "คุณธนพร ศิริวัฒน์", role: "Director - Logistics & Operations" },
        { name: "คุณนันทิดา ใจดี", role: "Partnership Manager" }
      ],
      salesPerson: "สพษณวี กิติพงษ์",
      location: "Shopee Office เอกมัย",
      status: "in_progress",
      businessUnit: "E-commerce",
      duration: "2.5 ชม.",
      nextAction: "ยื่นข้อเสนออย่างเป็นทางการ"
    },
    {
      id: "V020",
      date: "2026-02-06",
      projectCustomer: "บริษัท The Mall Group จำกัด",
      objective: "นำเสนอระบบ Retail Analytics",
      type: "นำเสนอผลิตภัณฑ์",
      serviceNames: "General",
      notes: "นำเสนอระบบวิเคราะห์ข้อมูล Retail พร้อม Dashboard แบบ Real-time สำหรับทุกสาขา",
      participants: [
        { name: "คุณปิยะพงษ์ จิตต์ดี", role: "Chief Digital Officer" },
        { name: "คุณสุภาวดี ศรีสุข", role: "IT Director" }
      ],
      salesPerson: "พงษ์ศิลป์ เครือกลาง",
      location: "The Mall Head Office สยาม",
      status: "follow_up_required",
      businessUnit: "Retail",
      duration: "3 ชม.",
      nextAction: "นัดพบ CEO เพื่อนำเสนออีกครั้ง"
    }
  ];

  // Get unique sales people and business units (filtered by current user's BU)
  const salesPeople = Array.from(new Set(visits.filter(v => v.businessUnit === currentUserBU).map(v => v.salesPerson)));
  const businessUnits = Array.from(new Set(visits.filter(v => v.businessUnit === currentUserBU).map(v => v.businessUnit)));

  // Filter logic
  const filteredVisits = visits.filter(visit => {
    const now = new Date();
    const visitDate = new Date(visit.date);
    
    // Business Unit filter: Only show visits from user's own BU
    if (visit.businessUnit !== currentUserBU) {
      return false;
    }
    
    // Role-based filter: Sales Rep sees only their visits
    if (!isManager && visit.salesPerson !== currentUserName) {
      return false;
    }
    
    // Search filter
    const matchesSearch = searchQuery === "" || 
      visit.projectCustomer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.objective.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.salesPerson.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Date filter
    let matchesDate = true;
    if (selectedFilter === 'today') {
      matchesDate = visitDate.toDateString() === now.toDateString();
    } else if (selectedFilter === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      matchesDate = visitDate >= weekAgo;
    } else if (selectedFilter === 'month') {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      matchesDate = visitDate >= monthAgo;
    } else if (selectedFilter === 'custom') {
      const startDate = new Date(customStartDate);
      const endDate = new Date(customEndDate);
      matchesDate = visitDate >= startDate && visitDate <= endDate;
    }

    // Sales person filter
    const matchesSalesPerson = selectedSalesPerson === 'all' || visit.salesPerson === selectedSalesPerson;

    // Business unit filter (within current user's BU)
    const matchesBusinessUnit = selectedBusinessUnit === 'all' || visit.businessUnit === selectedBusinessUnit;

    // Status filter
    const matchesStatus = selectedStatus === 'all' || visit.status === selectedStatus;
    
    return matchesSearch && matchesDate && matchesSalesPerson && matchesBusinessUnit && matchesStatus;
  });

  // Calculate statistics
  const totalVisits = filteredVisits.length;
  const completedVisits = filteredVisits.filter(v => v.status === 'completed').length;
  const followUpRequired = filteredVisits.filter(v => v.status === 'follow_up_required').length;
  const inProgress = filteredVisits.filter(v => v.status === 'in_progress').length;

  const formatThaiDate = (dateString: string) => {
    const date = new Date(dateString);
    const thaiMonths = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    const day = date.getDate();
    const month = thaiMonths[date.getMonth()];
    const year = date.getFullYear() + 543;
    return `${day} ${month} ${year}`;
  };

  const getStatusBadge = (status: Visit['status']) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-700 border-green-300 text-xs px-2 py-0">{t('visits.status_completed')}</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-700 border-red-300 text-xs px-2 py-0 flex items-center gap-1"><span>✕</span> ยกเลิกแล้ว</Badge>;
      default:
        return null;
    }
  };

  const handleExport = () => {
    // Prepare CSV data
    const headers = [
      'วันที่',
      'ลูกค้า',
      'วัตถุประสงค์',
      'ประเภท',
      'serviceNames',
      'Business Unit',
      isManager ? 'เซลล์' : '',
      'สถานะ',
      'สถานที่',
      'ระยะเวลา',
      'การดำเนินการต่อไป',
      'บันทึกเพิ่มเติม'
    ].filter(Boolean);

    const csvRows = [
      headers.join(','),
      ...filteredVisits.map(visit => {
        const statusText = 
          visit.status === 'completed' ? 'เสร็จสิ้น' :
          visit.status === 'in_progress' ? 'กำลังดำเนินการ' :
          'ต้องติดตาม';
        
        const row = [
          formatThaiDate(visit.date),
          `\"${visit.projectCustomer}\"`,
          `\"${visit.objective}\"`,
          `\"${visit.type}\"`,
          visit.serviceNames || 'HCP', // เพิ่ม serviceNames ใน CSV
          visit.businessUnit || '',
          isManager ? `\"${visit.salesPerson}\"` : '',
          statusText,
          `\"${visit.location || ''}\"`,
          visit.duration || '',
          `\"${visit.nextAction || ''}\"`,
          `\"${visit.notes}\"`
        ].filter((_, index) => isManager || index !== 6); // Update index to skip sales person if not manager
        
        return row.join(',');
      })
    ];

    const csvContent = '\uFEFF' + csvRows.join('\n'); // Add BOM for UTF-8
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `ประวัติการเข้าเยี่ยม_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportXLSX = () => {
    // Group visits by date
    const visitsByDate = filteredVisits.reduce((acc, visit) => {
      const date = visit.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(visit);
      return acc;
    }, {} as Record<string, Visit[]>);

    // Create Summary Sheet Data
    const summaryData: any[][] = [
      ['รายงานสรุปการเข้าเยี่ยมลูกค้า'],
      ['ระบบ CRM - Mini CRM'],
      [],
      ['วันที่สร้างรายงาน:', new Date().toLocaleDateString('th-TH')],
      ['จำนวนการเข้าเยี่ยมทั้งหมด:', totalVisits],
      ['จำนวนที่เสร็จสิ้น:', completedVisits],
      ['จำนวนที่กำลังดำเนินการ:', inProgress],
      ['จำนวนที่ต้องติดตาม:', followUpRequired],
      [],
      ['สรุปรายวัน'],
      []
    ];

    // Add summary by date
    Object.keys(visitsByDate).sort((a, b) => new Date(b).getTime() - new Date(a).getTime()).forEach(date => {
      const dateVisits = visitsByDate[date];
      summaryData.push([`📅 ${formatThaiDate(date)}`]);
      summaryData.push(['จำนวนลูกค้า:', dateVisits.length, 'ราย']);
      summaryData.push([]);
      
      dateVisits.forEach((visit, index) => {
        summaryData.push([`   ${index + 1}. ${visit.projectCustomer}`]);
        summaryData.push([`      วัตถุประสงค์: ${visit.objective}`]);
        summaryData.push([`      ประเภท: ${visit.type}`]);
        summaryData.push([`      serviceNames: ${visit.serviceNames || 'HCP'}`]); // เพิ่ม serviceNames
        summaryData.push([`      สถานะ: ${visit.status === 'completed' ? 'เสร็จสิ้น' : visit.status === 'in_progress' ? 'กำลังดำเนินการ' : 'ต้องติดตาม'}`]);
        if (isManager) {
          summaryData.push([`      เซลล์: ${visit.salesPerson}`]);
        }
        summaryData.push([`      สถานที่: ${visit.location || '-'}`]);
        summaryData.push([`      ระยะเวลา: ${visit.duration}`]);
        if (visit.nextAction) {
          summaryData.push([`      การดำเนินการต่อไป: ${visit.nextAction}`]);
        }
        summaryData.push([`      📷 รูปภาพประกอบ: https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400`]);
        summaryData.push([]);
      });
      
      summaryData.push([]);
    });

    // Create Detail Table Sheet Data
    const headers = [
      'วันที่',
      'ลูกค้า',
      'วัตถุประสงค์',
      'ประเภท',
      'serviceNames', // เพิ่มหัวข้อ serviceNames
      'Business Unit',
      isManager ? 'เซลล์' : null,
      'สถานะ',
      'สถานที่',
      'ระยะเวลา',
      'การดำเนินการต่อไป',
      'บันทึกเพิ่มเติม',
      'รูปภาพ URL'
    ].filter(Boolean) as string[];

    const detailData = filteredVisits.map(visit => {
      const statusText = 
        visit.status === 'completed' ? 'เสร็จสิ้น' :
        visit.status === 'in_progress' ? 'กำลังดำเนินการ' :
        'ต้องติดตาม';
      
      const row = [
        formatThaiDate(visit.date),
        visit.projectCustomer,
        visit.objective,
        visit.type,
        visit.serviceNames || 'HCP', // ข้อมูล serviceNames
        visit.businessUnit || '',
        isManager ? visit.salesPerson : null,
        statusText,
        visit.location || '',
        visit.duration || '',
        visit.nextAction || '',
        visit.notes,
        'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400'
      ].filter((_, index) => isManager || index !== 6) as any[]; // Update index for non-manager
      
      return row;
    });

    // Create workbook
    const workbook = XLSX.utils.book_new();

    // Create Summary sheet
    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
    
    // Set column widths for summary sheet
    summarySheet['!cols'] = [
      { wch: 40 },
      { wch: 20 },
      { wch: 15 }
    ];

    // Style for summary sheet header
    if (summarySheet['A1']) {
      summarySheet['A1'].s = {
        font: { bold: true, sz: 16 },
        alignment: { horizontal: 'left' }
      };
    }

    // Create Detail sheet
    const detailSheet = XLSX.utils.aoa_to_sheet([headers, ...detailData]);
    
    // Set column widths for detail sheet
    detailSheet['!cols'] = [
      { wch: 15 },  // วันที่
      { wch: 25 },  // ลูกค้า
      { wch: 35 },  // วัตถุประสงค์
      { wch: 18 },  // ประเภท
      { wch: 12 },  // serviceNames
      { wch: 12 },  // BU
      isManager ? { wch: 20 } : null,  // เซลล์
      { wch: 15 },  // สถานะ
      { wch: 30 },  // สถานที่
      { wch: 10 },  // ระยะเวลา
      { wch: 30 },  // การดำเนินการต่อไป
      { wch: 40 },  // บันทึก
      { wch: 50 }   // รูปภาพ URL
    ].filter(Boolean) as XLSX.ColInfo[];

    // Add sheets to workbook
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'สรุป');
    XLSX.utils.book_append_sheet(workbook, detailSheet, 'ตารางข้อมูล');

    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });

    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `ประวัติการเข้าเยี่ยม_${new Date().toISOString().split('T')[0]}.xlsx`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    // สร้าง PDF ด้วย jsPDF
    const doc = new jsPDF('p', 'mm', 'a4');
    
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Add Mini CRM brand color bar at top
    doc.setFillColor(123, 201, 166); // #7BC9A6
    doc.rect(0, 0, pageWidth, 8, 'F');
    
    // Header - ชื่อบริษัท
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(44, 62, 80);
    doc.text('Mini CRM', pageWidth / 2, 18, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(123, 201, 166);
    doc.text('Customer Visit History Report', pageWidth / 2, 26, { align: 'center' });
    
    // วันที่สร้างรายงาน
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    const reportDate = new Date().toLocaleDateString('en-GB', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    doc.text(`Generated: ${reportDate}`, 14, 36);
    doc.text(`Filter: ${selectedFilter === 'all' ? 'All Records' : selectedFilter === 'week' ? 'Last 7 Days' : selectedFilter === 'month' ? 'Last 30 Days' : 'Custom Range'}`, pageWidth - 14, 36, { align: 'right' });
    
    // สรุปสถิติ - Box style
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(14, 42, pageWidth - 28, 24, 2, 2, 'F');
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(44, 62, 80);
    doc.text('Summary Statistics', 18, 49);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    
    const col1X = 18;
    const col2X = pageWidth / 2;
    doc.text(`Total Visits: ${totalVisits}`, col1X, 56);
    doc.text(`In Progress: ${inProgress}`, col2X, 56);
    doc.text(`Completed: ${completedVisits}`, col1X, 61);
    doc.text(`Follow-up Required: ${followUpRequired}`, col2X, 61);
    
    // ตารางข้อมูล
    const headers = [
      'Date',
      'Customer',
      'Objective',
      'Type',
      'serviceNames', // เพิ่มใน PDF
      'BU',
      isManager ? 'Sales' : null,
      'Location',
      'Duration'
    ].filter(Boolean) as string[];
    
    const tableData = filteredVisits.map(visit => {
      const row = [
        formatThaiDate(visit.date),
        visit.projectCustomer,
        visit.objective.length > 50 ? visit.objective.substring(0, 47) + '...' : visit.objective,
        visit.type,
        visit.serviceNames || 'HCP', // เพิ่ม serviceNames data
        visit.businessUnit || '',
        isManager ? visit.salesPerson : null,
        visit.location || '',
        visit.duration || ''
      ].filter((_, index) => isManager || index !== 6) as any[];
      
      return row;
    });
    
    autoTable(doc, {
      head: [headers],
      body: tableData,
      startY: 72,
      theme: 'striped',
      styles: {
        fontSize: 7, // ปรับฟอนต์ลงนิดหน่อยเพื่อรองรับคอลัมน์ใหม่
        cellPadding: 2,
        font: 'helvetica',
        lineColor: [229, 231, 235],
        lineWidth: 0.1
      },
      headStyles: {
        fillColor: [123, 201, 166], // #7BC9A6 - Mini CRM brand color
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'center',
        fontSize: 8,
        cellPadding: 3
      },
      alternateRowStyles: {
        fillColor: [249, 250, 251]
      },
      columnStyles: {
        0: { cellWidth: 18, halign: 'center' }, // Date
        1: { cellWidth: 30 }, // Customer
        2: { cellWidth: isManager ? 35 : 45 }, // Objective
        3: { cellWidth: 15, halign: 'center' }, // Type
        4: { cellWidth: 15, halign: 'center' }, // serviceNames
        5: { cellWidth: 15, halign: 'center' }, // BU
        6: isManager ? { cellWidth: 25 } : undefined, // Sales
        7: { cellWidth: isManager ? 20 : 25, fontSize: 6 }, // Location
        8: { cellWidth: 12, halign: 'center' } // Duration
      },
      didDrawPage: function(data) {
        // Footer with branding
        const pageCount = (doc as any).internal.getNumberOfPages();
        
        // Bottom brand bar
        doc.setFillColor(123, 201, 166);
        doc.rect(0, pageHeight - 8, pageWidth, 8, 'F');
        
        // Page number
        doc.setFontSize(8);
        doc.setTextColor(255, 255, 255);
        doc.text(
          `Page ${pageCount}`,
          pageWidth / 2,
          pageHeight - 3,
          { align: 'center' }
        );
        
        // Company name in footer
        doc.setFontSize(7);
        doc.text('Mini CRM', 14, pageHeight - 3);
        doc.text('Enterprise Sales Management', pageWidth - 14, pageHeight - 3, { align: 'right' });
      },
      margin: { top: 72, left: 14, right: 14, bottom: 12 }
    });
    
    // บันทึกไฟล์
    doc.save(`Visit-History_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="p-2 sm:p-3 lg:p-4 bg-gray-50 min-h-screen">
      <div className="max-w-[1600px] mx-auto space-y-2 sm:space-y-3">
        {/* Header */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">
                {t('visits.title')}
              </h1>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                {t('visits.subtitle')}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleExportPDF}
                className="h-10 px-4 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-lg flex items-center gap-2 shadow-sm"
                disabled={filteredVisits.length === 0}
              >
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Export PDF</span>
                <span className="sm:hidden">PDF</span>
              </Button>
              <Button
                onClick={handleExportXLSX}
                className="h-10 px-4 bg-[#7BC9A6] hover:bg-[#6BB896] text-white text-xs font-medium rounded-lg flex items-center gap-2 shadow-sm"
                disabled={filteredVisits.length === 0}
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export XLSX</span>
                <span className="sm:hidden">XLSX</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={t('common.search')}
              className="pl-10 pr-4 h-10 text-sm border-gray-300 bg-white rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Date Filter */}
          <div className="flex items-center gap-0.5 bg-white border border-gray-200 p-0.5 rounded-lg">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-2.5 py-1.5 text-xs font-medium rounded transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t('visits.all')}
            </button>
            <button
              onClick={() => setSelectedFilter('week')}
              className={`px-2.5 py-1.5 text-xs font-medium rounded transition-colors ${
                selectedFilter === 'week'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t('visits.7_days')}
            </button>
            <button
              onClick={() => setSelectedFilter('month')}
              className={`px-2.5 py-1.5 text-xs font-medium rounded transition-colors ${
                selectedFilter === 'month'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t('visits.30_days')}
            </button>
          </div>

          {/* Custom Date Range Picker - Always Visible */}
          <div className="flex items-center gap-2 p-2 bg-white border-2 border-gray-300 rounded-lg hover:border-[#7BC9A6] transition-colors">
            <Calendar className="h-4 w-4 text-gray-400" />
            <input
              type="date"
              value={customStartDate}
              onChange={(e) => {
                setCustomStartDate(e.target.value);
                setSelectedFilter('custom');
              }}
              className="h-8 px-2 text-xs border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#7BC9A6]/20 focus:border-[#7BC9A6]"
              placeholder="วันที่เริ่มต้น"
            />
            <span className="text-xs text-gray-400">-</span>
            <input
              type="date"
              value={customEndDate}
              onChange={(e) => {
                setCustomEndDate(e.target.value);
                setSelectedFilter('custom');
              }}
              className="h-8 px-2 text-xs border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#7BC9A6]/20 focus:border-[#7BC9A6]"
              placeholder="วันที่สิ้นสุด"
            />
            {customStartDate && customEndDate && (
              <button
                onClick={() => {
                  setCustomStartDate('');
                  setCustomEndDate('');
                  setSelectedFilter('week');
                }}
                className="px-2 py-1 text-xs font-medium text-red-600 hover:text-white hover:bg-red-500 rounded transition-colors"
              >
                ✕
              </button>
            )}
          </div>

          {/* Business Unit Filter */}
          {isManager && (
            <select
              value={selectedBusinessUnit}
              onChange={(e) => setSelectedBusinessUnit(e.target.value)}
              className="h-10 px-3 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#7BC9A6]/20 focus:border-[#7BC9A6]"
            >
              <option value="all">{t('visits.all_bu')}</option>
              {businessUnits.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          )}

          {/* Sales Person Filter */}
          {isManager && (
            <select
              value={selectedSalesPerson}
              onChange={(e) => setSelectedSalesPerson(e.target.value)}
              className="h-10 px-3 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#7BC9A6]/20 focus:border-[#7BC9A6]"
            >
              <option value="all">{t('visits.all_sales')}</option>
              {salesPeople.map(person => (
                <option key={person} value={person}>{person}</option>
              ))}
            </select>
          )}

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="h-10 px-3 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#7BC9A6]/20 focus:border-[#7BC9A6]"
          >
            <option value="all">สถานะทั้งหมด</option>
            <option value="completed">เสร็จสิ้น</option>
            <option value="cancelled">ยกเลิกแล้ว</option>
          </select>
        </div>

        {/* Desktop Table View */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hidden lg:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider w-[120px]">
                    {t('visits.date')}
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider w-[200px]">
                    {t('visits.customer')}
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider w-[250px]">
                    {t('activity_title')}
                  </th>
                  {isManager && (
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider w-[160px]">
                      {t('visits.sales_person')}
                    </th>
                  )}
                  
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider w-[140px]">
                    {t('visits.activity_types')}
                  </th>

                  {/* คงคอลัมน์ serviceNames ไว้ */}
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider w-[120px]">
                    {t('visits.serviceNames')}
                  </th>
                  
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider w-[100px]">
                    {t('visits.bu')}
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider w-[120px]">
                    {t('visits.status')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredVisits.map((visit) => (
                  <tr
                    key={visit.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer group"
                    onClick={() => onVisitClick?.(visit.id)}
                  >
                    <td className="px-4 py-3.5">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {formatThaiDate(visit.date)}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">{visit.duration}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div>
                        <p className="text-sm font-semibold text-gray-900 line-clamp-1">{visit.projectCustomer}</p>
                        {visit.location && (
                          <div className="flex items-center gap-1 mt-1">
                            <MapPin className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                            <p className="text-xs text-gray-500 line-clamp-1">{visit.location}</p>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="text-sm text-gray-700 line-clamp-1 leading-relaxed">{visit.objective}</p>
                    </td>
                    {isManager && (
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="h-8 w-8 rounded-full bg-[#7BC9A6]/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-semibold text-[#7BC9A6]">
                              {visit.salesPerson.split(" ").map(n => n[0]).join("")}
                            </span>
                          </div>
                          <span className="text-sm text-gray-700 font-medium">{visit.salesPerson}</span>
                        </div>
                      </td>
                    )}
                    <td className="px-4 py-3.5">
                      <Badge variant="outline" className="text-xs px-2 py-0.5 border-gray-300">
                        {visit.type}
                      </Badge>
                    </td>

                    {/* เพิ่มช่องข้อมูล serviceNames ให้ตรงกับหัวตาราง */}
                    <td className="px-4 py-3.5">
                      <Badge variant="outline" className="text-xs px-2 py-0.5 border-indigo-300 bg-indigo-50 text-indigo-700">
                        {visit.serviceNames}
                      </Badge>
                    </td>

                    <td className="px-4 py-3.5">
                      <Badge variant="outline" className="text-xs px-2 py-0.5 border-blue-300 bg-blue-50 text-blue-700">
                        {visit.businessUnit}
                      </Badge>
                    </td>
                    <td className="px-4 py-3.5">
                      {getStatusBadge(visit.status)}
                    </td>
                
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-2">
          {filteredVisits.map((visit) => (
            <div
              key={visit.id}
              className="bg-white rounded-lg border border-gray-200 p-2.5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onVisitClick?.(visit.id)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-1.5">
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-semibold text-gray-900 truncate">{visit.projectCustomer}</h3>
                  <p className="text-[10px] text-gray-500 mt-0.5">{formatThaiDate(visit.date)} • {visit.duration}</p>
                </div>
                {getStatusBadge(visit.status)}
              </div>

              {/* Objective */}
              <p className="text-xs text-gray-700 mb-1.5 line-clamp-2">{visit.objective}</p>

              {/* Info Grid */}
              <div className="space-y-1 mb-1.5 pb-1.5 border-b border-gray-100">
                {isManager && (
                  <div className="flex items-center gap-1.5">
                    <div className="h-4 w-4 rounded-full bg-[#7BC9A6]/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-[8px] font-semibold text-[#7BC9A6]">
                        {visit.salesPerson.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-600">{visit.salesPerson}</span>
                  </div>
                )}
                {visit.location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3 w-3 text-gray-400 flex-shrink-0" />
                    <span className="text-[10px] text-gray-600 truncate">{visit.location}</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                  {visit.type}
                </Badge>
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-indigo-300 bg-indigo-50 text-indigo-700">
                  {visit.serviceNames || 'HCP'}
                </Badge>
                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                  {visit.businessUnit}
                </Badge>
              </div>

              {/* Next Action */}
              {visit.nextAction && (
                <div className="flex items-start gap-1.5 p-1.5 bg-blue-50 rounded border border-blue-100 mt-1.5">
                  <AlertCircle className="h-3 w-3 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-[11px] text-blue-700 line-clamp-1 flex-1">{visit.nextAction}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredVisits.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"
              style={{ backgroundColor: `${roleTheme.primary}20` }}
            >
              <MapPin className="w-8 h-8" style={{ color: roleTheme.primary }} />
            </div>
            <p className="text-sm font-semibold text-gray-900 mb-1">{t('visits.no_visits_found')}</p>
            <p className="text-xs text-gray-500">{t('visits.try_different_filter')}</p>
          </div>
        )}
      </div>
    </div>
  );
}