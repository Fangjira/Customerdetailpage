import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  ChevronLeft,
  Plus,
  Edit,
  MapPin,
  Mail,
  Phone,
  Clock,
  Eye,
  ExternalLink,
  TrendingUp,
  FileText,
  DollarSign,
  Target,
  Calendar,
  MessageSquare,
  MoreVertical,
} from "lucide-react";
import { CheckInDialog } from "../check-in-dialog";
import { EditCustomerDialog } from "../edit-customer-dialog";
import { CreateJobCardDialog } from "../create-job-card-dialog";
import { HistoryDialog } from "../history-dialog";
import { useRole } from "../../contexts/role-context";

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

export function CustomerDetailScreenEnhanced({ onBack }: { onBack: () => void }) {
  const { t } = useTranslation();
  
  // Add error handling for role context
  let role: ReturnType<typeof useRole>['role'] = "Sales Manager";
  try {
    const roleContext = useRole();
    role = roleContext.role;
  } catch (error) {
    console.error("RoleContext not available, using default role:", error);
  }
  
  const [isCheckInDialogOpen, setIsCheckInDialogOpen] = useState(false);
  const [isEditCustomerDialogOpen, setIsEditCustomerDialogOpen] = useState(false);
  const [isCreateJobCardDialogOpen, setIsCreateJobCardDialogOpen] = useState(false);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [selectedJobCard, setSelectedJobCard] = useState<{
    id: string;
    service: string;
    customer: string;
  } | null>(null);

  const [serviceRevenue, setServiceRevenue] = useState([
    { id: '01', name: 'Freight', value: null as string | null, type: null as string | null },
    { id: '02', name: 'Customs', value: null as string | null, type: null as string | null },
    { id: '03', name: 'Warehouse', value: '1,800,000.00' as string | null, type: 'ยอดขาย' as string | null },
    { id: '04', name: 'Transportation', value: null as string | null, type: null as string | null },
    { id: '05', name: 'Cross Border', value: null as string | null, type: null as string | null },
    { id: '06', name: 'Trading', value: null as string | null, type: null as string | null },
    { id: '07', name: 'Service', value: 'Opp' as string | null, type: 'Opportunity' as string | null },
    { id: '08', name: 'IT', value: 'Opp' as string | null, type: 'Opportunity' as string | null },
    { id: '09', name: 'Telematics', value: null as string | null, type: null as string | null },
    { id: '10', name: 'Other', value: null as string | null, type: null as string | null },
    { id: '11', name: 'Unknown', value: null as string | null, type: null as string | null },
  ]);

  const activityHistory: HistoryEntry[] = [
    {
      id: "1",
      action: "created",
      entity: "Customer",
      user: "Sarah Chen",
      timestamp: "2024-11-20T09:00:00Z",
      description: "Created customer account 'Global Freight Solutions Inc.'",
    },
  ];

  const customer = {
    id: "CUST-2024-0892",
    companyName: "Global Freight Solutions Inc.",
    industry: "Logistics & Transportation",
    taxId: "0105558123456",
    parentCompany: "Global Shipping Alliance",
    serviceModel: "International Freight",
    salesChannel: "Direct Sales",
    status: "Active",
    accountOwner: "Sarah Chen",
    contacts: [
      {
        id: 1,
        name: "John Davidson",
        title: "Operations Director",
        email: "john.d@globalfreight.com",
        phone: "+1 (555) 123-4567",
        isPrimary: true,
      },
      {
        id: 2,
        name: "Sarah Chen",
        title: "Senior Account Manager",
        email: "sarah.chen@newuscrm.com",
        phone: "+1 (555) 234-5678",
        isPrimary: false,
      },
      {
        id: 3,
        name: "Michael Torres",
        title: "Finance Manager",
        email: "m.torres@globalfreight.com",
        phone: "+1 (555) 345-6789",
        isPrimary: false,
      },
    ],
    addresses: [
      {
        id: 1,
        type: "Billing Address",
        street: "450 Market Street, Suite 2100",
        city: "San Francisco",
        state: "CA",
        zipCode: "94111",
        country: "United States",
        isPrimary: true,
      },
      {
        id: 2,
        type: "Shipping Address",
        street: "1250 Warehouse Blvd",
        city: "Oakland",
        state: "CA",
        zipCode: "94607",
        country: "United States",
        isPrimary: false,
      },
      {
        id: 3,
        type: "Corporate Office",
        street: "88 Broadway Ave, Floor 15",
        city: "New York",
        state: "NY",
        zipCode: "10004",
        country: "United States",
        isPrimary: false,
      },
    ],
  };

  // Mock Data for new sections
  const organizationInfo = {
    socoaId: "SO-2024-8921",
    doomeeEngage: "Active",
    hrSystem: "Workday",
  };

  const keyContacts = [
    { name: "คุณ สมชาย ใจดี", position: "Purchasing manager", role: "Key decision" },
    { name: "คุณ วรรณพร", position: "General manager", role: "" },
  ];

  const tags = ["TH-MY", "Cross Border", "FTL", "KA"];

  const organizationGroup = [
    {
      id: 1,
      name: "SCG/WD",
      contact: "Somchai Intdee",
      title: "Assistant VP",
      type: "Headquarter",
      icon: "🏢",
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "SCG/WD Freight",
      contact: "Veerachai Uksemak",
      title: "Manager",
      type: "Subsidiary",
      icon: "🏢",
      color: "bg-teal-500",
    },
    {
      id: 3,
      name: "JTS",
      contact: "Charles Krisch",
      title: "General Manager",
      type: "Subsidiary",
      icon: "🏢",
      color: "bg-blue-500",
    },
  ];

  const keyStats = {
    keyWin: [
      { category: "Cross Border", percentage: 40, color: "#1e40af" },
      { category: "Transportation", percentage: 30, color: "#f97316" },
      { category: "Service", percentage: 20, color: "#16a34a" },
      { category: "Customs", percentage: 10, color: "#eab308" },
    ],
    keyLoss: [
      { category: "Cross Border", percentage: 40, color: "#1e40af" },
      { category: "Customs", percentage: 20, color: "#f97316" },
      { category: "Pricing", percentage: 20, color: "#16a34a" },
      { category: "Service", percentage: 10, color: "#a855f7" },
      { category: "Transportation", percentage: 10, color: "#eab308" },
    ],
  };

  const supportActivities = [
    {
      id: "SA-001",
      date: "2024-12-15",
      type: "Site Visit",
      topic: "ตรวจสอบ ERP ระบบคลังสินค้าต้นฉบับ Purchasing Module จากระบบ SAP",
      assignedTo: "นายสมชาย ใจดี",
      status: "Completed",
    },
    {
      id: "SA-002",
      date: "2024-12-10",
      type: "Training",
      topic: "อบรมการใช้งาน WMS System",
      assignedTo: "นางสาวพิมพ์ สุขใจ",
      status: "Planned",
    },
    {
      id: "SA-003",
      date: "2024-12-05",
      type: "Technical Support",
      topic: "แก้ไขปัญหา API Integration กับระบบ ERP",
      assignedTo: "นายวิชัย เทคโนโลยี",
      status: "In Progress",
    },
  ];

  const quotations = [
    {
      id: "QT-20-001",
      name: "ข้อ 15# ค่าบริการคลัง + H&W",
      value: "฿ 3,500,000",
      status: "Draft",
      date: "01 Feb 24",
      validUntil: "28 Feb 24 23:59",
    },
    {
      id: "QT-20-002",
      name: "ระบบคลังสินค้าขนาดกลางพร้อมโซลูชั่น",
      value: "฿ 6,800,000",
      status: "Sent",
      date: "15 Jan 24",
      validUntil: "15 Mar 24 23:59",
    },
    {
      id: "QT-20-003",
      name: "ข้อ 18 Task โฉมด",
      value: "฿ 1,200,000",
      status: "Accepted",
      date: "01 Dec 23",
      validUntil: "31 Jan 24 23:59",
    },
  ];

  const relatedDeals = [
    {
      id: "CF-2024-091",
      dealName: "ข้อ 18# ค่าบริการคลัง",
      value: "฿10,000,000.00",
      stage: "Negotiation",
      closeDate: "3 Apr 2567",
      probability: "60%",
      owner: "นายสมชาย ใจดี",
      status: "งาน Hot",
    },
    {
      id: "CF-2024-101",
      dealName: "ข้อมูล ERP upgrade MAL",
      value: "฿8,500,000.00",
      stage: "สร้างข้อเสนอ",
      closeDate: "5 Jun 2567",
      probability: "40%",
      owner: "นางสาวพิมพ์ สุขใจ",
      status: "Medium",
    },
    {
      id: "CF-2024-088",
      dealName: "ข้อมูลคลัง เก็บส่งสินค้าอาหารและเครื่องดื่ม",
      value: "฿4,300,000.00",
      stage: "การทำสัญญา",
      closeDate: "1 Aug 2567",
      probability: "85%",
      owner: "นายวิชัย เทคโนโลยี",
      status: "Winning",
    },
  ];

  // Permission Check: Determine if user can edit this customer
  const canEdit = (() => {
    // Admin, Sales Director, Sales Manager always have edit permission
    if (role === "Admin" || role === "Sales Director" || role === "Sales Manager") {
      return true;
    }
    
    // Sales Representative can edit their own customers
    if (role === "Sales Representative") {
      // Check if current user is the account owner
      // In real app, compare with actual logged-in user
      return customer.accountOwner === "Sarah Chen"; // Mock check
    }
    
    // Support, Finance, Customer Service are view-only
    return false;
  })();

  const isViewOnly = !canEdit;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-3 max-w-[1600px] mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-2 hover:bg-gray-100 -ml-2 h-6 text-[10px] px-1.5"
        >
          <ChevronLeft className="h-3 w-3 mr-0.5" />
          กลับสู่รายชื่อลูกค้า
        </Button>

        {/* Customer Header Card */}
        <Card className="shadow-sm mb-3">
          <CardContent className="p-3">
            {/* Top Row: Company Name and Actions */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <h1 className="text-base font-semibold text-foreground">
                    Global Freight Solutions Inc
                  </h1>
                  <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 text-[9px] px-1.5 py-0 h-4">
                    ลูกค้าองค์กร
                  </Badge>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-[9px] px-1.5 py-0 h-4">
                    ใช้งานอยู่
                  </Badge>
                  {isViewOnly && (
                    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 text-[9px] px-1.5 py-0 h-4 flex items-center gap-1">
                      <Eye className="h-2.5 w-2.5" />
                      View Only
                    </Badge>
                  )}
                </div>
                <p className="text-[10px] text-muted-foreground">CUST-2024-0892</p>
              </div>

              <div className="flex gap-1.5">
                {!isViewOnly && (
                  <Button
                    size="sm"
                    onClick={() => setIsCreateJobCardDialogOpen(true)}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white h-7 text-[10px] px-2"
                  >
                    <Plus className="h-3 w-3 mr-0.5" />
                    สร้างกิจกรรม
                  </Button>
                )}
                {!isViewOnly && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsEditCustomerDialogOpen(true)}
                    className="h-7 text-[10px] px-2"
                  >
                    <Edit className="h-3 w-3 mr-0.5" />
                    แก้ไข
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsHistoryDialogOpen(true)}
                  className="h-7 text-[10px] px-2"
                >
                  <Clock className="h-3 w-3 mr-0.5" />
                  ประวัติ
                </Button>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-4 gap-3">
              <div>
                <p className="text-[9px] text-muted-foreground mb-0.5">มูลค่าทั้งหมด</p>
                <div className="flex items-baseline gap-1">
                  <p className="text-lg font-bold text-foreground">$1.2M</p>
                  <span className="text-[8px] font-medium text-green-600 bg-green-50 px-1 py-0.5 rounded">
                    +24.5%
                  </span>
                </div>
              </div>
              <div>
                <p className="text-[9px] text-muted-foreground mb-0.5">ข้อตกลงทั้งหมด</p>
                <p className="text-lg font-bold text-foreground">156</p>
              </div>
              <div>
                <p className="text-[9px] text-muted-foreground mb-0.5">ข้อเสนอทั้งหมด</p>
                <p className="text-lg font-bold text-foreground">8</p>
              </div>
              <div>
                <p className="text-[9px] text-muted-foreground mb-0.5">สมาชิกเมื่อปี</p>
                <p className="text-lg font-bold text-foreground">2019</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-3">
          {/* Left Column: Company Information */}
          <div className="col-span-2 space-y-3">
            {/* Company Information */}
            <Card className="shadow-sm">
              <CardHeader className="pb-1.5 px-3 pt-2">
                <CardTitle className="text-xs font-semibold">
                  ข้อมูลบริษัท / Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 pb-2 space-y-2">
                <div className="grid grid-cols-3 gap-x-4 gap-y-1.5">
                  <div>
                    <p className="text-[9px] text-muted-foreground mb-0.5">Company Name</p>
                    <p className="text-[10px] font-medium">Global Freight Solutions inc.</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-muted-foreground mb-0.5">Tax ID</p>
                    <p className="text-[10px] font-medium">0105558123456</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-muted-foreground mb-0.5">Industry</p>
                    <p className="text-[10px] font-medium">Logistics & Transportation</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-muted-foreground mb-0.5">Parent Company</p>
                    <p className="text-[10px] font-medium">Global Shipping Alliance</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-muted-foreground mb-0.5">Service Model</p>
                    <p className="text-[10px] font-medium">International Freight</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-muted-foreground mb-0.5">Sales Channel</p>
                    <p className="text-[10px] font-medium">Direct Sales</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-muted-foreground mb-0.5">Employee Size</p>
                    <p className="text-[10px] font-medium">Enterprise (500+)</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-muted-foreground mb-0.5">Member Year</p>
                    <p className="text-[10px] font-medium">2018</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-muted-foreground mb-0.5">ERP Systems</p>
                    <p className="text-[10px] font-medium">Oracle, SAP</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Organization Info - NEW */}
            <Card className="shadow-sm">
              <CardHeader className="pb-1.5 px-3 pt-2">
                <CardTitle className="text-xs font-semibold">Organization Info</CardTitle>
              </CardHeader>
              <CardContent className="px-3 pb-2">
                <div className="grid grid-cols-3 gap-2">
                  <a
                    href="#"
                    className="flex items-center justify-center gap-2 p-2 border border-blue-200 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                  >
                    <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold">SO</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-[8px] text-blue-600">SocoaID</p>
                      <p className="text-[9px] font-semibold text-blue-900">{organizationInfo.socoaId}</p>
                    </div>
                    <ExternalLink className="h-3 w-3 text-blue-600" />
                  </a>

                  <a
                    href="#"
                    className="flex items-center justify-center gap-2 p-2 border border-purple-200 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors"
                  >
                    <div className="h-8 w-8 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold">DE</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-[8px] text-purple-600">DOOMEE/Engage</p>
                      <p className="text-[9px] font-semibold text-purple-900">{organizationInfo.doomeeEngage}</p>
                    </div>
                    <ExternalLink className="h-3 w-3 text-purple-600" />
                  </a>

                  <a
                    href="#"
                    className="flex items-center justify-center gap-2 p-2 border border-green-200 rounded-lg bg-green-50 hover:bg-green-100 transition-colors"
                  >
                    <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold">HR</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-[8px] text-green-600">HR System</p>
                      <p className="text-[9px] font-semibold text-green-900">{organizationInfo.hrSystem}</p>
                    </div>
                    <ExternalLink className="h-3 w-3 text-green-600" />
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Key Stats - Win/Loss Analysis - NEW */}
            <Card className="shadow-sm">
              <CardHeader className="pb-1.5 px-3 pt-2">
                <CardTitle className="text-xs font-semibold">Key Stats - Win/Loss Analysis</CardTitle>
              </CardHeader>
              <CardContent className="px-3 pb-2">
                <div className="grid grid-cols-2 gap-4">
                  {/* Key Win */}
                  <div>
                    <h4 className="text-[10px] font-semibold text-green-700 mb-2">Key Win</h4>
                    <div className="space-y-1">
                      {keyStats.keyWin.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-green-600 h-full rounded-full"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                          <span className="text-[9px] font-medium text-gray-700 w-16">
                            {item.category}
                          </span>
                          <span className="text-[9px] font-bold text-green-700 w-10 text-right">
                            {item.percentage}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Loss */}
                  <div>
                    <h4 className="text-[10px] font-semibold text-red-700 mb-2">Key Loss</h4>
                    <div className="space-y-1">
                      {keyStats.keyLoss.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-red-600 h-full rounded-full"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                          <span className="text-[9px] font-medium text-gray-700 w-16">
                            {item.category}
                          </span>
                          <span className="text-[9px] font-bold text-red-700 w-10 text-right">
                            {item.percentage}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support/Activities - NEW */}
            <Card className="shadow-sm">
              <CardHeader className="pb-1.5 px-3 pt-2 flex flex-row items-center justify-between">
                <CardTitle className="text-xs font-semibold">Support/Activities</CardTitle>
                <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2">
                  <Plus className="h-3 w-3 mr-0.5" />
                  Add Task
                </Button>
              </CardHeader>
              <CardContent className="px-3 pb-2">
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-[9px]">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-1.5 font-semibold text-gray-700">วันที่</th>
                        <th className="text-left p-1.5 font-semibold text-gray-700">ประเภท</th>
                        <th className="text-left p-1.5 font-semibold text-gray-700">หัวข้อ</th>
                        <th className="text-left p-1.5 font-semibold text-gray-700">ผู้รับผิดชอบ</th>
                        <th className="text-left p-1.5 font-semibold text-gray-700">สถานะ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {supportActivities.map((activity) => (
                        <tr key={activity.id} className="border-t hover:bg-gray-50">
                          <td className="p-1.5">{activity.date}</td>
                          <td className="p-1.5">
                            <Badge className="bg-blue-100 text-blue-700 text-[8px] px-1 py-0 h-4">
                              {activity.type}
                            </Badge>
                          </td>
                          <td className="p-1.5 max-w-[300px] truncate">{activity.topic}</td>
                          <td className="p-1.5">{activity.assignedTo}</td>
                          <td className="p-1.5">
                            <Badge
                              className={`text-[8px] px-1 py-0 h-4 ${
                                activity.status === "Completed"
                                  ? "bg-green-100 text-green-700"
                                  : activity.status === "In Progress"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {activity.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Quotations - NEW */}
            <Card className="shadow-sm">
              <CardHeader className="pb-1.5 px-3 pt-2 flex flex-row items-center justify-between">
                <CardTitle className="text-xs font-semibold">Quotations</CardTitle>
                <Button variant="link" className="h-6 text-[10px] px-0 text-blue-600">
                  Show All
                </Button>
              </CardHeader>
              <CardContent className="px-3 pb-2 space-y-2">
                {quotations.map((quotation) => (
                  <div
                    key={quotation.id}
                    className="flex items-center justify-between p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <FileText className="h-3 w-3 text-gray-500" />
                        <p className="text-[10px] font-semibold text-gray-900">{quotation.name}</p>
                        <Badge
                          className={`text-[8px] px-1.5 py-0 h-4 ${
                            quotation.status === "Accepted"
                              ? "bg-green-100 text-green-700"
                              : quotation.status === "Sent"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {quotation.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-[9px] text-gray-600">
                        <span>{quotation.id}</span>
                        <span>•</span>
                        <span>สร้างเมื่อ: {quotation.date}</span>
                        <span>•</span>
                        <span>หมดอายุ: {quotation.validUntil}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] font-bold text-gray-900">{quotation.value}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Related Deals - NEW */}
            <Card className="shadow-sm">
              <CardHeader className="pb-1.5 px-3 pt-2 flex flex-row items-center justify-between">
                <CardTitle className="text-xs font-semibold">ข้อมูลดีลที่เกี่ยวข้อง</CardTitle>
                <Button variant="link" className="h-6 text-[10px] px-0 text-blue-600">
                  Show All
                </Button>
              </CardHeader>
              <CardContent className="px-3 pb-2">
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-[9px]">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-1.5 font-semibold text-gray-700">รหัสดีล</th>
                        <th className="text-left p-1.5 font-semibold text-gray-700">ชื่อดีล</th>
                        <th className="text-right p-1.5 font-semibold text-gray-700">มูลค่า</th>
                        <th className="text-left p-1.5 font-semibold text-gray-700">ขั้นตอน</th>
                        <th className="text-left p-1.5 font-semibold text-gray-700">วันที่ปิด</th>
                        <th className="text-center p-1.5 font-semibold text-gray-700">โอกาส</th>
                        <th className="text-left p-1.5 font-semibold text-gray-700">เจ้าของ</th>
                        <th className="text-left p-1.5 font-semibold text-gray-700">สถานะ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {relatedDeals.map((deal) => (
                        <tr key={deal.id} className="border-t hover:bg-gray-50">
                          <td className="p-1.5 font-medium text-blue-600">{deal.id}</td>
                          <td className="p-1.5 max-w-[200px] truncate">{deal.dealName}</td>
                          <td className="p-1.5 text-right font-semibold">{deal.value}</td>
                          <td className="p-1.5">
                            <Badge className="bg-purple-100 text-purple-700 text-[8px] px-1 py-0 h-4">
                              {deal.stage}
                            </Badge>
                          </td>
                          <td className="p-1.5">{deal.closeDate}</td>
                          <td className="p-1.5 text-center">
                            <span className="font-semibold text-blue-700">{deal.probability}</span>
                          </td>
                          <td className="p-1.5">{deal.owner}</td>
                          <td className="p-1.5">
                            <Badge
                              className={`text-[8px] px-1 py-0 h-4 ${
                                deal.status === "Winning"
                                  ? "bg-green-100 text-green-700"
                                  : deal.status === "งาน Hot"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {deal.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Service Revenue */}
            <Card className="shadow-sm">
              <CardHeader className="pb-1.5 px-3 pt-2">
                <CardTitle className="text-xs font-semibold">
                  ยอดขายแต่ละ Service
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 pb-2">
                <div className="grid grid-cols-4 gap-1.5">
                  {serviceRevenue.map((service) => (
                    <div 
                      key={service.id} 
                      className={`border rounded p-1.5 transition-all ${
                        service.value || service.type
                          ? 'bg-blue-50/50 border-blue-200' 
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-0.5 mb-0.5">
                        <span className="text-[8px] font-bold text-gray-500 bg-white px-1 py-0.5 rounded border border-gray-200">
                          {service.id}
                        </span>
                        <p className="text-[9px] font-medium text-foreground truncate">
                          {service.name}
                        </p>
                      </div>
                      {service.type && (
                        <div className="mb-0.5">
                          <span className="text-[8px] font-medium text-orange-600 bg-orange-100 px-1 py-0.5 rounded">
                            {service.type}
                          </span>
                        </div>
                      )}
                      {service.value ? (
                        <p className="text-[10px] font-semibold text-blue-900 truncate">
                          {service.value.match(/^[0-9,.]+$/) ? `฿${service.value}` : service.value}
                        </p>
                      ) : (
                        <p className="text-[9px] text-gray-400">-</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Customer Insights */}
            <Card className="shadow-sm">
              <CardHeader className="pb-1.5 px-3 pt-2">
                <CardTitle className="text-xs font-semibold">Customer Insight</CardTitle>
              </CardHeader>
              <CardContent className="px-3 pb-2">
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-blue-50 p-1.5 rounded border border-blue-100">
                    <p className="text-[9px] text-blue-700 mb-0.5">Average Order</p>
                    <p className="text-sm font-bold text-blue-900">$7,500</p>
                  </div>
                  <div className="bg-green-50 p-1.5 rounded border border-green-100">
                    <p className="text-[9px] text-green-700 mb-0.5">Orders (YTD)</p>
                    <p className="text-sm font-bold text-green-900">156</p>
                  </div>
                  <div className="bg-purple-50 p-1.5 rounded border border-purple-100">
                    <p className="text-[9px] text-purple-700 mb-0.5">Renewal</p>
                    <p className="text-sm font-bold text-purple-900">Mar 2025</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Contacts and Addresses */}
          <div className="space-y-3">
            {/* ผู้ติดต่อ - NEW */}
            <Card className="shadow-sm">
              <CardHeader className="pb-1.5 px-3 pt-2">
                <CardTitle className="text-xs font-semibold">ผู้ติดต่อ</CardTitle>
              </CardHeader>
              <CardContent className="px-3 pb-2">
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-[9px]">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-1.5 font-semibold text-gray-700">ชื่อ</th>
                        <th className="text-left p-1.5 font-semibold text-gray-700">ตำแหน่ง</th>
                        <th className="text-left p-1.5 font-semibold text-gray-700">บทบาท</th>
                      </tr>
                    </thead>
                    <tbody>
                      {keyContacts.map((contact, index) => (
                        <tr key={index} className="border-t hover:bg-gray-50">
                          <td className="p-1.5 font-medium">{contact.name}</td>
                          <td className="p-1.5">{contact.position}</td>
                          <td className="p-1.5">
                            {contact.role && (
                              <Badge className="bg-orange-100 text-orange-700 text-[8px] px-1 py-0 h-4">
                                {contact.role}
                              </Badge>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* TAG - NEW */}
            <Card className="shadow-sm">
              <CardHeader className="pb-1.5 px-3 pt-2 flex flex-row items-center justify-between">
                <CardTitle className="text-xs font-semibold">TAG</CardTitle>
                <Button variant="link" className="h-6 text-[10px] px-0 text-blue-600">
                  Edit
                </Button>
              </CardHeader>
              <CardContent className="px-3 pb-2">
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag, index) => (
                    <Badge
                      key={index}
                      className="bg-gray-700 text-white text-[9px] px-2 py-0.5 h-5 hover:bg-gray-800"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Organization Group - NEW */}
            <Card className="shadow-sm">
              <CardHeader className="pb-1.5 px-3 pt-2 flex flex-row items-center justify-between">
                <CardTitle className="text-xs font-semibold">Organization Group</CardTitle>
                <Button variant="link" className="h-6 text-[10px] px-0 text-blue-600">
                  Show organization
                </Button>
              </CardHeader>
              <CardContent className="px-3 pb-2">
                {/* Tabs */}
                <div className="flex gap-1 mb-2 border-b">
                  <button className="px-2 py-1 text-[9px] font-semibold text-blue-600 border-b-2 border-blue-600">
                    Headquarter
                  </button>
                  <button className="px-2 py-1 text-[9px] font-semibold text-gray-600 hover:text-blue-600">
                    Subsidiary
                  </button>
                </div>

                {/* Organization Cards */}
                <div className="space-y-2">
                  {organizationGroup.map((org) => (
                    <div
                      key={org.id}
                      className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className={`h-10 w-10 ${org.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white text-lg">{org.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-gray-900 truncate">{org.name}</p>
                        <p className="text-[8px] text-gray-600 truncate">
                          {org.contact}
                        </p>
                        <p className="text-[8px] text-gray-500 truncate">{org.title}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Helper Text */}
                <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-[8px] text-blue-700 leading-tight">
                    💡 <strong>สามารถกด icon</strong> แล้วไปหน้าช่องทางสื่อสาร Organization ของแต่ละ Headquarter and Subsidiary
                  </p>
                  <p className="text-[8px] text-blue-700 leading-tight mt-1">
                    * ถูกมักกำหนด Relationship ของกลุ่มลูกค้าที่เป็นใน Relationship หลักๆ (แม่-ลูก)
                    ถ้ากดไปหน้าหมายเลข Relationship ที่ blank
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {/* Primary Contact */}
            <Card className="shadow-sm">
              <CardHeader className="pb-1.5 px-3 pt-2">
                <CardTitle className="text-xs font-semibold">ผู้ติดต่อหลัก (3)</CardTitle>
              </CardHeader>
              <CardContent className="px-3 pb-2 space-y-1.5">
                {customer.contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`p-1.5 rounded border ${
                      contact.isPrimary 
                        ? 'bg-blue-50 border-blue-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-1 mb-0.5">
                      <p className="text-[10px] font-semibold text-foreground">
                        {contact.name}
                      </p>
                      {contact.isPrimary && (
                        <Badge className="bg-blue-600 text-white text-[8px] px-1 py-0 h-3.5 hover:bg-blue-600">
                          Primary
                        </Badge>
                      )}
                    </div>
                    <p className="text-[9px] text-muted-foreground mb-0.5">{contact.title}</p>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-0.5 text-[9px]">
                        <Mail className="h-2 w-2 text-muted-foreground flex-shrink-0" />
                        <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline truncate">
                          {contact.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-0.5 text-[9px]">
                        <Phone className="h-2 w-2 text-muted-foreground flex-shrink-0" />
                        <a href={`tel:${contact.phone}`} className="text-blue-600 hover:underline">
                          {contact.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Addresses */}
            <Card className="shadow-sm">
              <CardHeader className="pb-1.5 px-3 pt-2">
                <CardTitle className="text-xs font-semibold">ที่อยู่ (3)</CardTitle>
              </CardHeader>
              <CardContent className="px-3 pb-2 space-y-1.5">
                {customer.addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`p-1.5 rounded border ${
                      address.isPrimary
                        ? 'bg-blue-50 border-blue-200'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-1 mb-0.5">
                      <p className="text-[10px] font-semibold text-foreground">
                        {address.type}
                      </p>
                      {address.isPrimary && (
                        <Badge className="bg-blue-600 text-white text-[8px] px-1 py-0 h-3.5 hover:bg-blue-600">
                          Primary
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-start gap-0.5">
                      <MapPin className="h-2 w-2 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div className="text-[9px] text-muted-foreground">
                        <p>{address.street}</p>
                        <p>{address.city}, {address.state} {address.zipCode}</p>
                        <p>{address.country}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      {selectedJobCard && (
        <CheckInDialog
          isOpen={isCheckInDialogOpen}
          onClose={() => {
            setIsCheckInDialogOpen(false);
            setSelectedJobCard(null);
          }}
          jobCard={selectedJobCard}
        />
      )}

      <EditCustomerDialog
        isOpen={isEditCustomerDialogOpen}
        onClose={() => setIsEditCustomerDialogOpen(false)}
        customer={customer}
        serviceRevenue={serviceRevenue}
        onSaveServices={setServiceRevenue}
      />

      <CreateJobCardDialog
        isOpen={isCreateJobCardDialogOpen}
        onClose={() => setIsCreateJobCardDialogOpen(false)}
        customerName={customer.companyName}
      />

      <HistoryDialog
        isOpen={isHistoryDialogOpen}
        onClose={() => setIsHistoryDialogOpen(false)}
        history={activityHistory}
        entityName="Global Freight Solutions Inc."
      />
    </div>
  );
}