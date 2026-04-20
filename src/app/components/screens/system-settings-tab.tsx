import { useState, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Settings,
  CheckCircle2,
  Plus,
  Edit2,
  Trash2,
  ListTodo,
  Users,
  MapPin,
  Building2,
  Tag,
  Briefcase,
  UserCircle,
  FolderKanban,
  Search,
  Eye,
  TrendingUp,
  Target,
  Package,
  Factory,
  AlertCircle,
  XCircle,
  Phone,
  ShoppingCart,
  Download,
  Upload,
  FileSpreadsheet,
  FileCheck,
  AlertTriangle,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export function SystemSettingsTab() {
  const { t } = useTranslation();
  const [hasChanges, setHasChanges] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("todo");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Add dialogs
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addDialogType, setAddDialogType] = useState("");
  
  // Edit dialog
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editDialogType, setEditDialogType] = useState("");
  
  // View usage dialog
  const [viewUsageDialogOpen, setViewUsageDialogOpen] = useState(false);
  const [viewingItem, setViewingItem] = useState<any>(null);

  // Import/Export dialogs
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [importPreviewData, setImportPreviewData] = useState<any[]>([]);
  const [importType, setImportType] = useState("");
  
  // Form states
  const [newItemName, setNewItemName] = useState("");
  const [newItemDescription, setNewItemDescription] = useState("");
  const [newItemColor, setNewItemColor] = useState("#7BC9A6");

  // Master Data - To-do Types
  const [todoTypes, setTodoTypes] = useState([
    { id: 1, name: "ติดตามลูกค้า", description: "งานติดตามสถานะลูกค้า", usageCount: 45, isActive: true, createdDate: "2026-01-15" },
    { id: 2, name: "ส่งเอกสาร", description: "งานส่งเอกสารให้ลูกค้า", usageCount: 32, isActive: true, createdDate: "2026-01-20" },
    { id: 3, name: "นัดหมาย", description: "งานนัดหมายพบลูกค้า", usageCount: 28, isActive: true, createdDate: "2026-02-01" },
    { id: 4, name: "เสนอราคา", description: "งานจัดทำและส่งใบเสนอราคา", usageCount: 15, isActive: true, createdDate: "2026-02-10" },
    { id: 5, name: "ทำสัญญา", description: "งานจัดทำสัญญา", usageCount: 8, isActive: true, createdDate: "2026-02-15" },
  ]);

  // Master Data - Owners (ผู้รับผิดชอบ)
  const [owners, setOwners] = useState([
    { id: 1, name: "สมชาย ใจดี", role: "Sales Rep", department: "ฝ่ายขาย", usageCount: 156, isActive: true, createdDate: "2025-12-01" },
    { id: 2, name: "สมหญิง รักงาน", role: "Sales Rep", department: "ฝ่ายขาย", usageCount: 142, isActive: true, createdDate: "2025-12-01" },
    { id: 3, name: "วิชัย มั่นคง", role: "Sales Manager", department: "ฝ่ายขาย", usageCount: 98, isActive: true, createdDate: "2025-11-15" },
    { id: 4, name: "นภา สว่าง", role: "Sales Rep", department: "ฝ่ายขาย", usageCount: 87, isActive: true, createdDate: "2026-01-05" },
    { id: 5, name: "ประพันธ์ เก่ง", role: "Admin", department: "ฝ่ายบริหาร", usageCount: 45, isActive: false, createdDate: "2025-10-01" },
  ]);

  // Master Data - Locations
  const [locations, setLocations] = useState([
    { id: 1, name: "กรุงเทพฯ (สำนักงานใหญ่)", address: "123 ถนนสุขุมวิท", usageCount: 234, isActive: true, createdDate: "2025-09-01" },
    { id: 2, name: "สาขาลาดพร้าว", address: "456 ถนนลาดพร้าว", usageCount: 178, isActive: true, createdDate: "2025-10-15" },
    { id: 3, name: "สาขานนทบุรี", address: "789 ถนนแจ้งวัฒนะ", usageCount: 145, isActive: true, createdDate: "2025-11-20" },
    { id: 4, name: "สาขาสมุทรปราการ", address: "321 ถนนเทพารักษ์", usageCount: 92, isActive: true, createdDate: "2026-01-10" },
    { id: 5, name: "สาขาชลบุรี", address: "654 ถนนสุขุมวิท พัทยา", usageCount: 67, isActive: true, createdDate: "2026-02-01" },
  ]);

  // Master Data - Customer Types
  const [customerTypes, setCustomerTypes] = useState([
    { id: 1, name: "บริษัทขนาดใหญ่", description: "บริษัทมีพนักงาน > 500 คน", usageCount: 89, isActive: true, createdDate: "2025-09-01" },
    { id: 2, name: "SME", description: "ธุรกิจขนาดกลางและเล็ก", usageCount: 234, isActive: true, createdDate: "2025-09-01" },
    { id: 3, name: "Startup", description: "บริษัทสตาร์ทอัพ", usageCount: 156, isActive: true, createdDate: "2025-10-01" },
    { id: 4, name: "รัฐวิสาหกิจ", description: "หน่วยงานรัฐวิสาหกิจ", usageCount: 45, isActive: true, createdDate: "2025-11-01" },
    { id: 5, name: "ห้างร้าน/รีเทล", description: "ธุรกิจค้าปลิก", usageCount: 198, isActive: true, createdDate: "2025-09-15" },
  ]);

  // Master Data - Deal Types
  const [dealTypes, setDealTypes] = useState([
    { id: 1, name: "New Business", description: "ลูกค้าใหม่", usageCount: 178, isActive: true, createdDate: "2025-09-01" },
    { id: 2, name: "Renewal", description: "ต่ออายุสัญญา", usageCount: 234, isActive: true, createdDate: "2025-09-01" },
    { id: 3, name: "Upsell", description: "ขายเพิ่มให้ลูกค้าเดิม", usageCount: 145, isActive: true, createdDate: "2025-09-15" },
    { id: 4, name: "Cross-sell", description: "ขายสินค้าอื่นให้ลูกค้าเดิม", usageCount: 98, isActive: true, createdDate: "2025-10-01" },
  ]);

  // Master Data - Business Units
  const [businessUnits, setBusinessUnits] = useState([
    { id: 1, name: "Storage Solutions", description: "หน่วยธุรกิจคลังสินค้า", usageCount: 456, isActive: true, createdDate: "2025-09-01" },
    { id: 2, name: "Logistics", description: "หน่วยธุรกิจขนส่ง", usageCount: 389, isActive: true, createdDate: "2025-09-01" },
    { id: 3, name: "Customs & Import/Export", description: "หน่วยธุรกิจศุลกากร", usageCount: 267, isActive: true, createdDate: "2025-09-15" },
    { id: 4, name: "Cross-Border", description: "หน่วยธุรกิจขนส่งข้ามพรมแดน", usageCount: 198, isActive: true, createdDate: "2025-10-01" },
  ]);

  // Master Data - Deal Stages (Pipeline)
  const [dealStages, setDealStages] = useState([
    { id: 1, name: "Lead ใหม่", description: "ลีดที่เพิ่งเข้ามา", color: "#94a3b8", order: 1, usageCount: 345, isActive: true, createdDate: "2025-09-01" },
    { id: 2, name: "ติดต่อแล้ว", description: "ติดต่อลีดแล้ว", color: "#60a5fa", order: 2, usageCount: 289, isActive: true, createdDate: "2025-09-01" },
    { id: 3, name: "นัดหมาย", description: "นัดพบลูกค้า", color: "#a78bfa", order: 3, usageCount: 234, isActive: true, createdDate: "2025-09-01" },
    { id: 4, name: "เสนอราคา", description: "ส่งใบเสนอราคา", color: "#f59e0b", order: 4, usageCount: 178, isActive: true, createdDate: "2025-09-01" },
    { id: 5, name: "เจรจา", description: "กำลังเจรจาต่อรอง", color: "#fb923c", order: 5, usageCount: 123, isActive: true, createdDate: "2025-09-01" },
    { id: 6, name: "ปิดการขาย", description: "ขายสำเร็จ", color: "#7BC9A6", order: 6, usageCount: 456, isActive: true, createdDate: "2025-09-01" },
    { id: 7, name: "สูญเสีย", description: "ไม่สำเร็จ", color: "#ef4444", order: 7, usageCount: 234, isActive: true, createdDate: "2025-09-01" },
  ]);

  // Master Data - Lead Sources
  const [leadSources, setLeadSources] = useState([
    { id: 1, name: "เว็บไซต์", description: "Lead จากเว็บไซต์", usageCount: 456, isActive: true, createdDate: "2025-09-01" },
    { id: 2, name: "Facebook", description: "Lead จาก Facebook", usageCount: 389, isActive: true, createdDate: "2025-09-01" },
    { id: 3, name: "Line", description: "Lead จาก Line", usageCount: 345, isActive: true, createdDate: "2025-09-01" },
    { id: 4, name: "โทรศัพท์", description: "โทรเข้ามาเองทางโทรศัพท์", usageCount: 267, isActive: true, createdDate: "2025-09-01" },
    { id: 5, name: "Walk-in", description: "เดินเข้ามาที่สำนักงาน", usageCount: 198, isActive: true, createdDate: "2025-09-01" },
    { id: 6, name: "Referral", description: "ลูกค้าแนะนำ", usageCount: 234, isActive: true, createdDate: "2025-09-01" },
    { id: 7, name: "Email Marketing", description: "จากแคมเปญอีเมล", usageCount: 178, isActive: true, createdDate: "2025-09-01" },
    { id: 8, name: "Trade Show", description: "จากงานแสดงสินค้า", usageCount: 89, isActive: true, createdDate: "2025-10-01" },
  ]);

  // Master Data - Products/Services
  const [products, setProducts] = useState([
    { id: 1, name: "Self Storage", description: "บริการคลังเก็บของส่วนตัว", category: "Storage", usageCount: 567, isActive: true, createdDate: "2025-09-01" },
    { id: 2, name: "Warehouse Management", description: "บริการบริหารคลังสินค้า", category: "Logistics", usageCount: 456, isActive: true, createdDate: "2025-09-01" },
    { id: 3, name: "Transportation", description: "บริการขนส่งสินค้า", category: "Logistics", usageCount: 389, isActive: true, createdDate: "2025-09-01" },
    { id: 4, name: "Customs Clearance", description: "บริการผ่านพิธีการศุลกากร", category: "Import/Export", usageCount: 234, isActive: true, createdDate: "2025-09-01" },
    { id: 5, name: "Cross-Border Shipping", description: "บริการขนส่งข้ามพรมแดน", category: "Import/Export", usageCount: 178, isActive: true, createdDate: "2025-09-01" },
    { id: 6, name: "Air Freight", description: "ขนส่งทางอากาศ", category: "International", usageCount: 145, isActive: true, createdDate: "2025-10-01" },
  ]);

  // Master Data - Tags
  const [tags, setTags] = useState([
    { id: 1, name: "VIP", description: "ลูกค้าระดับ VIP", color: "#fbbf24", usageCount: 89, isActive: true, createdDate: "2025-09-01" },
    { id: 2, name: "Hot Lead", description: "ลีดที่ร้อนแรง", color: "#ef4444", usageCount: 145, isActive: true, createdDate: "2025-09-01" },
    { id: 3, name: "Long Term", description: "ลูกค้าระยะยาว", color: "#10b981", usageCount: 234, isActive: true, createdDate: "2025-09-01" },
    { id: 4, name: "ราคาพิเศษ", description: "ได้รับราคาพิเศษ", color: "#8b5cf6", usageCount: 98, isActive: true, createdDate: "2025-09-15" },
    { id: 5, name: "ต้องติดตามเร่งด่วน", description: "ต้องติดตามโดยด่วน", color: "#f97316", usageCount: 67, isActive: true, createdDate: "2025-10-01" },
  ]);

  // Master Data - Industries
  const [industries, setIndustries] = useState([
    { id: 1, name: "อุตสาหกรรมการผลิต", description: "โรงงานผลิตสินค้า", usageCount: 234, isActive: true, createdDate: "2025-09-01" },
    { id: 2, name: "อีคอมเมิร์ซ", description: "ธุรกิจขายของออนไลน์", usageCount: 345, isActive: true, createdDate: "2025-09-01" },
    { id: 3, name: "รีเทล", description: "ธุรกิจค้าปลีก", usageCount: 289, isActive: true, createdDate: "2025-09-01" },
    { id: 4, name: "อาหารและเครื่องดื่ม", description: "ธุรกิจอาหาร F&B", usageCount: 178, isActive: true, createdDate: "2025-09-01" },
    { id: 5, name: "เทคโนโลยี", description: "บริษัทเทคโนโลยี", usageCount: 156, isActive: true, createdDate: "2025-09-15" },
    { id: 6, name: "แฟชั่นและเครื่องแต่งกาย", description: "อุตสาหกรรมแฟชั่น", usageCount: 134, isActive: true, createdDate: "2025-09-20" },
    { id: 7, name: "เฟอร์นิเจอร์", description: "ธุรกิจเฟอร์นิเจอร์", usageCount: 98, isActive: true, createdDate: "2025-10-01" },
  ]);

  // Master Data - Priority Levels
  const [priorities, setPriorities] = useState([
    { id: 1, name: "เร่งด่วนมาก", description: "ต้องดำเนินการทันที", color: "#dc2626", usageCount: 89, isActive: true, createdDate: "2025-09-01" },
    { id: 2, name: "เร่งด่วน", description: "ความสำคัญสูง", color: "#f59e0b", usageCount: 234, isActive: true, createdDate: "2025-09-01" },
    { id: 3, name: "ปานกลาง", description: "ความสำคัญปานกลาง", color: "#3b82f6", usageCount: 456, isActive: true, createdDate: "2025-09-01" },
    { id: 4, name: "ต่ำ", description: "ไม่เร่งด่วน", color: "#6b7280", usageCount: 178, isActive: true, createdDate: "2025-09-01" },
  ]);

  // Master Data - Lost Reasons
  const [lostReasons, setLostReasons] = useState([
    { id: 1, name: "ราคาแพงเกินไป", description: "ราคาไม่แข่งขันได้", usageCount: 89, isActive: true, createdDate: "2025-09-01" },
    { id: 2, name: "เลือกคู่แข่ง", description: "เลือกใช้บริการคู่แข่ง", usageCount: 145, isActive: true, createdDate: "2025-09-01" },
    { id: 3, name: "ไม่มีงบประมาณ", description: "ลูกค้าไม่มีงบ", usageCount: 67, isActive: true, createdDate: "2025-09-01" },
    { id: 4, name: "ยกเลิกโครงการ", description: "โครงการถูกยกเลิก", usageCount: 45, isActive: true, createdDate: "2025-09-01" },
    { id: 5, name: "ไม่ตอบกลับ", description: "ติดต่อไม่ได้", usageCount: 98, isActive: true, createdDate: "2025-09-15" },
    { id: 6, name: "Timing ไม่เหมาะสม", description: "ยังไม่ใช่เวลา", usageCount: 56, isActive: true, createdDate: "2025-09-20" },
  ]);

  // Master Data - Contact Methods
  const [contactMethods, setContactMethods] = useState([
    { id: 1, name: "โทรศัพท์", description: "ติดต่อทางโทรศัพท์", usageCount: 567, isActive: true, createdDate: "2025-09-01" },
    { id: 2, name: "อีเมล", description: "ส่งอีเมล", usageCount: 456, isActive: true, createdDate: "2025-09-01" },
    { id: 3, name: "Line", description: "แชทผ่าน Line", usageCount: 389, isActive: true, createdDate: "2025-09-01" },
    { id: 4, name: "ประชุมออนไลน์", description: "Zoom, Teams, Meet", usageCount: 234, isActive: true, createdDate: "2025-09-01" },
    { id: 5, name: "พบหน้าตรง", description: "นัดพบที่สำนักงาน", usageCount: 178, isActive: true, createdDate: "2025-09-01" },
    { id: 6, name: "WhatsApp", description: "แชทผ่าน WhatsApp", usageCount: 123, isActive: true, createdDate: "2025-09-15" },
  ]);

  // Master Data - Sales Channels
  const [salesChannels, setSalesChannels] = useState([
    { id: 1, name: "Direct Sales", description: "ขายตรง", usageCount: 456, isActive: true, createdDate: "2025-09-01" },
    { id: 2, name: "Online", description: "ขายออนไลน์", usageCount: 389, isActive: true, createdDate: "2025-09-01" },
    { id: 3, name: "Partner", description: "ผ่านพาร์ทเนอร์", usageCount: 234, isActive: true, createdDate: "2025-09-01" },
    { id: 4, name: "Reseller", description: "ผู้ค้าส่ง", usageCount: 178, isActive: true, createdDate: "2025-09-01" },
    { id: 5, name: "Distributor", description: "ผู้จัดจำหน่าย", usageCount: 145, isActive: true, createdDate: "2025-09-15" },
  ]);

  // Data mapping
  const masterDataConfig: { [key: string]: any } = {
    todo: { data: todoTypes, setter: setTodoTypes, icon: <ListTodo className="h-5 w-5" />, color: "purple", label: "หัวข้อ To-do" },
    owners: { data: owners, setter: setOwners, icon: <UserCircle className="h-5 w-5" />, color: "blue", label: "ผู้รับผิดชอบ" },
    locations: { data: locations, setter: setLocations, icon: <MapPin className="h-5 w-5" />, color: "green", label: "สถานที่" },
    customerTypes: { data: customerTypes, setter: setCustomerTypes, icon: <Users className="h-5 w-5" />, color: "amber", label: "ประเภทลูกค้า" },
    dealTypes: { data: dealTypes, setter: setDealTypes, icon: <FolderKanban className="h-5 w-5" />, color: "indigo", label: "ประเภทดีล" },
    bu: { data: businessUnits, setter: setBusinessUnits, icon: <Briefcase className="h-5 w-5" />, color: "teal", label: "Business Unit" },
    stages: { data: dealStages, setter: setDealStages, icon: <TrendingUp className="h-5 w-5" />, color: "violet", label: "ขั้นตอนดีล" },
    leadSources: { data: leadSources, setter: setLeadSources, icon: <Target className="h-5 w-5" />, color: "pink", label: "แหล่งที่มาลีด" },
    products: { data: products, setter: setProducts, icon: <Package className="h-5 w-5" />, color: "cyan", label: "สินค้า/บริการ" },
    tags: { data: tags, setter: setTags, icon: <Tag className="h-5 w-5" />, color: "yellow", label: "แท็ก" },
    industries: { data: industries, setter: setIndustries, icon: <Factory className="h-5 w-5" />, color: "slate", label: "อุตสาหกรรม" },
    priorities: { data: priorities, setter: setPriorities, icon: <AlertCircle className="h-5 w-5" />, color: "red", label: "ระดับความสำคัญ" },
    lostReasons: { data: lostReasons, setter: setLostReasons, icon: <XCircle className="h-5 w-5" />, color: "rose", label: "เหตุผลสูญเสีย" },
    contactMethods: { data: contactMethods, setter: setContactMethods, icon: <Phone className="h-5 w-5" />, color: "emerald", label: "วิธีติดต่อ" },
    salesChannels: { data: salesChannels, setter: setSalesChannels, icon: <ShoppingCart className="h-5 w-5" />, color: "orange", label: "ช่องทางขาย" },
  };

  // Excel Template columns for each type
  const getExcelColumns = (type: string) => {
    const baseColumns = ["ชื่อ", "รายละเอียด", "สถานะ (เปิดใช้งาน/ปิดใช้งาน)"];
    
    switch(type) {
      case "stages":
      case "tags":
      case "priorities":
        return [...baseColumns, "สี (Hex Code)"];
      case "owners":
        return ["ชื่อ", "ตำแหน่ง", "แผนก", "สถานะ (เปิดใช้งาน/ปิดใช้งาน)"];
      case "locations":
        return ["ชื่อสถานที่", "ที่อยู่", "สถานะ (เปิดใช้งาน/ปิดใช้งาน)"];
      case "products":
        return ["ชื่อสินค้า/บริการ", "รายละเอียด", "หมวดหมู่", "สถานะ (เปิดใช้งาน/ปิดใช้งาน)"];
      default:
        return baseColumns;
    }
  };

  // Download Excel Template
  const handleDownloadTemplate = (type: string) => {
    const config = masterDataConfig[type];
    if (!config) return;

    const columns = getExcelColumns(type);
    const sampleData = getSampleDataForType(type);
    
    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF"; // UTF-8 BOM for Thai characters
    csvContent += columns.join(",") + "\n";
    csvContent += sampleData.map(row => row.join(",")).join("\n");

    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Template_${config.label}_miniCRM.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Get sample data for template
  const getSampleDataForType = (type: string) => {
    switch(type) {
      case "todo":
        return [
          ["ติดตามลูกค้า", "งานติดตามสถานะลูกค้า", "เปิดใช้งาน"],
          ["ส่งเอกสาร", "งานส่งเอกสารให้ลูกค้า", "เปิดใช้งาน"],
        ];
      case "owners":
        return [
          ["สมชาย ใจดี", "Sales Rep", "ฝ่ายขาย", "เปิดใช้งาน"],
          ["สมหญิง รักงาน", "Sales Manager", "ฝ่ายขาย", "เปิดใช้งาน"],
        ];
      case "locations":
        return [
          ["สาขากรุงเทพ", "123 ถนนสุขุมวิท", "เปิดใช้งาน"],
          ["สาขานนทบุรี", "456 ถนนแจ้งวัฒนะ", "เปิดใช้งาน"],
        ];
      case "products":
        return [
          ["Self Storage", "บริการคลังเก็บของส่วนตัว", "Storage", "เปิดใช้งาน"],
          ["Transportation", "บริการขนส่งสินค้า", "Logistics", "เปิดใช้งาน"],
        ];
      case "stages":
      case "tags":
      case "priorities":
        return [
          ["รายการตัวอย่าง 1", "รายละเอียด", "เปิดใช้งาน", "#7BC9A6"],
          ["รายการตัวอย่าง 2", "รายละเอียด", "เปิดใช้งาน", "#60a5fa"],
        ];
      default:
        return [
          ["รายการตัวอย่าง 1", "รายละเอียด", "เปิดใช้งาน"],
          ["รายการตัวอย่าง 2", "รายละเอียด", "เปิดใช้งาน"],
        ];
    }
  };

  // Export current data to Excel
  const handleExportData = (type: string) => {
    const config = masterDataConfig[type];
    if (!config) return;

    const columns = getExcelColumns(type);
    
    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
    csvContent += columns.join(",") + "\n";
    
    config.data.forEach((item: any) => {
      let row: string[] = [];
      
      switch(type) {
        case "owners":
          row = [item.name, item.role, item.department, item.isActive ? "เปิดใช้งาน" : "ปิดใช้งาน"];
          break;
        case "locations":
          row = [item.name, item.address, item.isActive ? "เปิดใช้งาน" : "ปิดใช้งาน"];
          break;
        case "products":
          row = [item.name, item.description, item.category, item.isActive ? "เปิดใช้งาน" : "ปิดใช้งาน"];
          break;
        case "stages":
        case "tags":
        case "priorities":
          row = [item.name, item.description, item.isActive ? "เปิดใช้งาน" : "ปิดใช้งาน", item.color];
          break;
        default:
          row = [item.name, item.description || "", item.isActive ? "เปิดใช้งาน" : "ปิดใช้งาน"];
      }
      
      csvContent += row.join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Export_${config.label}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle file upload
  const handleFileUpload = (type: string) => {
    setImportType(type);
    fileInputRef.current?.click();
  };

  // Process uploaded file
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const rows = text.split("\n").filter(row => row.trim());
      
      if (rows.length < 2) {
        alert("ไฟล์ไม่มีข้อมูล");
        return;
      }

      // Skip header row
      const dataRows = rows.slice(1);
      const previewData = dataRows.map((row, index) => {
        const columns = row.split(",").map(col => col.trim());
        return {
          id: index + 1,
          columns,
          status: "pending", // pending, success, error
          message: "",
        };
      });

      setImportPreviewData(previewData);
      setImportDialogOpen(true);
    };

    reader.readAsText(file);
    event.target.value = ""; // Reset file input
  };

  // Confirm import
  const handleConfirmImport = () => {
    const config = masterDataConfig[importType];
    if (!config) return;

    const newItems = importPreviewData.map((row, index) => {
      const cols = row.columns;
      const baseItem = {
        id: Date.now() + index,
        usageCount: 0,
        isActive: cols[2]?.includes("เปิด") || cols[2]?.toLowerCase().includes("active") ? true : false,
        createdDate: new Date().toISOString().split('T')[0],
      };

      switch(importType) {
        case "owners":
          return { ...baseItem, name: cols[0], role: cols[1], department: cols[2] };
        case "locations":
          return { ...baseItem, name: cols[0], address: cols[1] };
        case "products":
          return { ...baseItem, name: cols[0], description: cols[1], category: cols[2] };
        case "stages":
        case "tags":
        case "priorities":
          return { ...baseItem, name: cols[0], description: cols[1], color: cols[3] || "#7BC9A6", ...(importType === "stages" ? { order: config.data.length + index + 1 } : {}) };
        default:
          return { ...baseItem, name: cols[0], description: cols[1] };
      }
    });

    config.setter([...config.data, ...newItems]);
    setImportDialogOpen(false);
    setImportPreviewData([]);
    setHasChanges(true);
  };

  // Generic handlers
  const handleOpenAddDialog = (type: string) => {
    setAddDialogType(type);
    setNewItemName("");
    setNewItemDescription("");
    setNewItemColor("#7BC9A6");
    setAddDialogOpen(true);
  };

  const handleAddItem = () => {
    if (!newItemName.trim()) return;

    const config = masterDataConfig[addDialogType];
    if (!config) return;

    const newItem = {
      id: Date.now(),
      name: newItemName,
      description: newItemDescription,
      usageCount: 0,
      isActive: true,
      createdDate: new Date().toISOString().split('T')[0],
      ...(addDialogType === 'stages' || addDialogType === 'tags' || addDialogType === 'priorities' ? { color: newItemColor } : {}),
      ...(addDialogType === 'locations' ? { address: newItemDescription } : {}),
      ...(addDialogType === 'owners' ? { role: "Sales Rep", department: "ฝ่ายขาย" } : {}),
      ...(addDialogType === 'products' ? { category: "General" } : {}),
      ...(addDialogType === 'stages' ? { order: config.data.length + 1 } : {}),
    };

    config.setter([...config.data, newItem]);
    setAddDialogOpen(false);
    setHasChanges(true);
  };

  const handleOpenEditDialog = (item: any, type: string) => {
    setEditingItem(item);
    setEditDialogType(type);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingItem?.name.trim()) return;

    const config = masterDataConfig[editDialogType];
    if (!config) return;

    config.setter(config.data.map((item: any) => item.id === editingItem.id ? editingItem : item));
    setEditDialogOpen(false);
    setEditingItem(null);
    setHasChanges(true);
  };

  const handleDelete = (id: number, type: string) => {
    const config = masterDataConfig[type];
    if (!config) return;

    config.setter(config.data.filter((item: any) => item.id !== id));
    setHasChanges(true);
  };

  const handleToggleActive = (id: number, type: string) => {
    const config = masterDataConfig[type];
    if (!config) return;

    config.setter(config.data.map((item: any) => item.id === id ? { ...item, isActive: !item.isActive } : item));
    setHasChanges(true);
  };

  const handleViewUsage = (item: any) => {
    setViewingItem(item);
    setViewUsageDialogOpen(true);
  };

  // Render master data table
  const renderMasterTable = (type: string) => {
    const config = masterDataConfig[type];
    if (!config) return null;

    const { data, icon } = config;
    const filteredData = data.filter((item: any) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="ค้นหา..."
              className="pl-10 h-12 text-base border-2 border-gray-200 focus:border-[#7BC9A6] rounded-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 rounded-xl h-12 px-4 text-base font-semibold"
              onClick={() => handleDownloadTemplate(type)}
            >
              <FileSpreadsheet className="h-5 w-5 mr-2" />
              Template Excel
            </Button>
            <Button
              variant="outline"
              className="border-2 border-green-500 text-green-600 hover:bg-green-50 rounded-xl h-12 px-4 text-base font-semibold"
              onClick={() => handleExportData(type)}
            >
              <Download className="h-5 w-5 mr-2" />
              Export
            </Button>
            <Button
              variant="outline"
              className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 rounded-xl h-12 px-4 text-base font-semibold"
              onClick={() => handleFileUpload(type)}
            >
              <Upload className="h-5 w-5 mr-2" />
              Import Excel
            </Button>
            <Button
              className="bg-[#7BC9A6] hover:bg-[#6ab394] text-white rounded-xl h-12 px-6 text-base font-semibold"
              onClick={() => handleOpenAddDialog(type)}
            >
              <Plus className="h-5 w-5 mr-2" />
              เพิ่มรายการ
            </Button>
          </div>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">ชื่อ</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">รายละเอียด</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">ใช้งาน</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">สถานะ</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((item: any, index: number) => (
                  <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#7BC9A6]/10 rounded-lg">
                          {icon}
                        </div>
                        <div>
                          <span className="text-base font-semibold text-gray-900">{item.name}</span>
                          {item.color && (
                            <div className="flex items-center gap-2 mt-1">
                              <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                              <span className="text-xs text-gray-500">{item.color}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {item.description || item.address || item.role || item.category || "-"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleViewUsage(item)}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                        <span className="font-semibold">{item.usageCount}</span>
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.isActive}
                          onChange={() => handleToggleActive(item.id, type)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#7BC9A6]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7BC9A6]"></div>
                      </label>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#7BC9A6] hover:bg-[#7BC9A6]/10"
                          onClick={() => handleOpenEditDialog(item, type)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:bg-red-50"
                          onClick={() => handleDelete(item.id, type)}
                          disabled={item.usageCount > 0}
                        >
                          <Trash2 className="h-4 w-4" />
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
  };

  return (
    <div className="space-y-6">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Header */}
      <div className="bg-gradient-to-r from-[#7BC9A6]/10 to-[#7BC9A6]/5 border-2 border-[#7BC9A6]/20 rounded-2xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              จัดการข้อมูลหลัก (Master Data Management)
            </h2>
            <p className="text-base text-gray-600">
              ควบคุมและตรวจสอบข้อมูลหลักทั้งหมดของระบบ CRM ครบถ้วน 12 หมวดหมู่ พร้อม Import/Export Excel
            </p>
          </div>
          <Settings className="h-10 w-10 text-[#7BC9A6]" />
        </div>
      </div>

      {/* Summary Stats */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Master Data ทั้งหมด</p>
            <p className="text-3xl font-bold text-[#7BC9A6]">12</p>
            <p className="text-xs text-gray-500 mt-1">หมวดหมู่</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">รายการทั้งหมด</p>
            <p className="text-3xl font-bold text-blue-600">
              {Object.values(masterDataConfig).reduce((sum, config) => sum + config.data.length, 0)}
            </p>
            <p className="text-xs text-gray-500 mt-1">รายการ</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">ใช้งานอยู่</p>
            <p className="text-3xl font-bold text-green-600">
              {Object.values(masterDataConfig).reduce((sum, config) => sum + config.data.filter((item: any) => item.isActive).length, 0)}
            </p>
            <p className="text-xs text-gray-500 mt-1">รายการ</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">ปิดใช้งาน</p>
            <p className="text-3xl font-bold text-red-600">
              {Object.values(masterDataConfig).reduce((sum, config) => sum + config.data.filter((item: any) => !item.isActive).length, 0)}
            </p>
            <p className="text-xs text-gray-500 mt-1">รายการ</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">การใช้งานรวม</p>
            <p className="text-3xl font-bold text-purple-600">
              {Object.values(masterDataConfig).reduce((sum, config) => 
                sum + config.data.reduce((s: number, item: any) => s + item.usageCount, 0), 0
              )}
            </p>
            <p className="text-xs text-gray-500 mt-1">ครั้ง</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">อัปเดตล่าสุด</p>
            <p className="text-lg font-bold text-gray-900">วันนี้</p>
            <p className="text-xs text-gray-500 mt-1">2026-03-05</p>
          </div>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-3">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 lg:grid-cols-12 bg-gray-50 p-1 rounded-xl gap-1 h-auto">
            {Object.entries(masterDataConfig).map(([key, config]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="data-[state=active]:bg-white data-[state=active]:text-[#7BC9A6] data-[state=active]:shadow-md rounded-lg py-3 px-2 text-xs font-semibold flex items-center justify-center gap-1"
              >
                <div className="hidden md:block">{config.icon}</div>
                <span className="truncate">{config.label.split(' ')[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {Object.entries(masterDataConfig).map(([key, config]) => (
          <TabsContent key={key} value={key}>
            <Card className="border-2 border-gray-200 shadow-sm">
              <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#7BC9A6]/20 rounded-lg">
                    {config.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl text-gray-900">{config.label}</CardTitle>
                    <CardDescription className="text-base mt-1">
                      จัดการ{config.label}ของระบบ - มีทั้งหมด {config.data.length} รายการ ({config.data.filter((item: any) => item.isActive).length} ใช้งาน)
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {renderMasterTable(key)}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Save Button */}
      {hasChanges && (
        <div className="sticky bottom-6 flex justify-center">
          <div className="bg-white border-2 border-[#7BC9A6] rounded-2xl shadow-lg p-4 flex items-center gap-4">
            <p className="text-base text-gray-700">มีการเปลี่ยนแปลงที่ยังไม่ได้บันทึก</p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl h-11 px-6 text-base font-semibold"
                onClick={() => setHasChanges(false)}
              >
                ยกเลิก
              </Button>
              <Button
                className="bg-[#7BC9A6] hover:bg-[#6ab394] text-white rounded-xl h-11 px-8 text-base font-semibold shadow-lg"
                onClick={() => setHasChanges(false)}
              >
                <CheckCircle2 className="h-5 w-5 mr-2" />
                บันทึกการเปลี่ยนแปลง
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Import Preview Dialog */}
      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <FileCheck className="h-6 w-6 text-[#7BC9A6]" />
              ตรวจสอบข้อมูลก่อน Import
            </DialogTitle>
            <DialogDescription className="text-base">
              กำลังนำเข้า {importPreviewData.length} รายการ - กรุณาตรวจสอบข้อมูลก่อนยืนยัน
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900">คำแนะนำ:</p>
                  <p className="text-sm text-blue-700 mt-1">
                    • ตรวจสอบข้อมูลให้ถูกต้องก่อนกดยืนยัน<br/>
                    • รายการที่มีข้อมูลไม่ครบจะถูกข้าม<br/>
                    • สามารถแก้ไขข้อมูลที่ Import แล้วได้ทีหลัง
                  </p>
                </div>
              </div>
            </div>

            <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">#</th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">ข้อมูล</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-gray-900">สถานะ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {importPreviewData.map((row) => (
                      <tr key={row.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-600">{row.id}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-2">
                            {row.columns.map((col, idx) => (
                              <span key={idx} className="px-2 py-1 bg-gray-100 rounded text-sm">
                                {col || "-"}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-semibold">
                            <CheckCircle2 className="h-4 w-4" />
                            พร้อม
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl h-12 text-base font-semibold"
                onClick={() => {
                  setImportDialogOpen(false);
                  setImportPreviewData([]);
                }}
              >
                ยกเลิก
              </Button>
              <Button
                className="flex-1 bg-[#7BC9A6] hover:bg-[#6ab394] text-white rounded-xl h-12 text-base font-semibold"
                onClick={handleConfirmImport}
              >
                <CheckCircle2 className="h-5 w-5 mr-2" />
                ยืนยัน Import {importPreviewData.length} รายการ
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Item Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Plus className="h-6 w-6 text-[#7BC9A6]" />
              เพิ่ม{masterDataConfig[addDialogType]?.label || "รายการ"}ใหม่
            </DialogTitle>
            <DialogDescription className="text-base">
              กรอกข้อมูลรายการที่ต้องการเพิ่ม
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-3">
              <Label className="text-base font-semibold text-gray-900">ชื่อ</Label>
              <Input
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="h-12 text-base border-2 border-gray-200 focus:border-[#7BC9A6] rounded-xl"
                placeholder="กรอกชื่อรายการ"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-base font-semibold text-gray-900">รายละเอียด</Label>
              <Input
                value={newItemDescription}
                onChange={(e) => setNewItemDescription(e.target.value)}
                className="h-12 text-base border-2 border-gray-200 focus:border-[#7BC9A6] rounded-xl"
                placeholder="กรอกรายละเอียด (ถ้ามี)"
              />
            </div>
            {(addDialogType === 'stages' || addDialogType === 'tags' || addDialogType === 'priorities') && (
              <div className="space-y-3">
                <Label className="text-base font-semibold text-gray-900">สี</Label>
                <div className="flex gap-3 items-center">
                  <Input
                    type="color"
                    value={newItemColor}
                    onChange={(e) => setNewItemColor(e.target.value)}
                    className="h-12 w-20 border-2 border-gray-200 rounded-xl"
                  />
                  <Input
                    value={newItemColor}
                    onChange={(e) => setNewItemColor(e.target.value)}
                    className="h-12 text-base border-2 border-gray-200 focus:border-[#7BC9A6] rounded-xl"
                    placeholder="#7BC9A6"
                  />
                </div>
              </div>
            )}
            <Button
              className="w-full bg-[#7BC9A6] hover:bg-[#6ab394] text-white rounded-xl h-12 text-base font-semibold"
              onClick={handleAddItem}
            >
              <Plus className="h-5 w-5 mr-2" />
              เพิ่มรายการ
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Item Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Edit2 className="h-6 w-6 text-[#7BC9A6]" />
              แก้ไข{masterDataConfig[editDialogType]?.label || "รายการ"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-3">
              <Label className="text-base font-semibold text-gray-900">ชื่อ</Label>
              <Input
                value={editingItem?.name || ""}
                onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                className="h-12 text-base border-2 border-gray-200 focus:border-[#7BC9A6] rounded-xl"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-base font-semibold text-gray-900">รายละเอียด</Label>
              <Input
                value={editingItem?.description || editingItem?.address || ""}
                onChange={(e) => setEditingItem({
                  ...editingItem,
                  description: e.target.value,
                  address: e.target.value
                })}
                className="h-12 text-base border-2 border-gray-200 focus:border-[#7BC9A6] rounded-xl"
              />
            </div>
            {editingItem?.color && (
              <div className="space-y-3">
                <Label className="text-base font-semibold text-gray-900">สี</Label>
                <div className="flex gap-3 items-center">
                  <Input
                    type="color"
                    value={editingItem.color}
                    onChange={(e) => setEditingItem({ ...editingItem, color: e.target.value })}
                    className="h-12 w-20 border-2 border-gray-200 rounded-xl"
                  />
                  <Input
                    value={editingItem.color}
                    onChange={(e) => setEditingItem({ ...editingItem, color: e.target.value })}
                    className="h-12 text-base border-2 border-gray-200 focus:border-[#7BC9A6] rounded-xl"
                  />
                </div>
              </div>
            )}
            <Button
              className="w-full bg-[#7BC9A6] hover:bg-[#6ab394] text-white rounded-xl h-12 text-base font-semibold"
              onClick={handleSaveEdit}
            >
              <CheckCircle2 className="h-5 w-5 mr-2" />
              บันทึกการแก้ไข
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Usage Dialog */}
      <Dialog open={viewUsageDialogOpen} onOpenChange={setViewUsageDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Eye className="h-6 w-6 text-[#7BC9A6]" />
              รายละเอียดการใช้งาน: {viewingItem?.name}
            </DialogTitle>
            <DialogDescription className="text-base">
              ดูว่ารายการนี้ถูกใช้งานที่ไหนบ้าง
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div className="bg-gradient-to-r from-[#7BC9A6]/10 to-[#7BC9A6]/5 border-2 border-[#7BC9A6]/20 rounded-xl p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600">จำนวนการใช้งานทั้งหมด</p>
                  <p className="text-3xl font-bold text-[#7BC9A6]">{viewingItem?.usageCount || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">สร้างเมื่อ</p>
                  <p className="text-lg font-semibold text-gray-900">{viewingItem?.createdDate || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">สถานะ</p>
                  <p className="text-lg font-semibold">
                    {viewingItem?.isActive ? (
                      <span className="text-green-600">✓ เปิดใช้งาน</span>
                    ) : (
                      <span className="text-red-600">✗ ปิดใช้งาน</span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-2 border-gray-200 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-3">ใช้งานในรายการเหล่านี้:</h4>
              <div className="space-y-2">
                {[
                  "ดีล: Storage Solution สำหรับ ABC Corp",
                  "ดีล: Logistics Package สำหรับ XYZ Ltd",
                  "งาน: ติดตามลูกค้า DEF Company",
                  "ลูกค้า: GHI Trading",
                  "ใบเสนอราคา: QT-2026-001",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <CheckCircle2 className="h-4 w-4 text-[#7BC9A6]" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
