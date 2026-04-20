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
  FileText,
  Building2,
  Users,
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
}

export function CustomerDetailScreenEnhancedV2({ onBack }: { onBack: () => void }) {
  const { t } = useTranslation();
  
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

  const [serviceRevenue] = useState([
    { id: '01', name: 'Freight', value: null as string | null },
    { id: '02', name: 'Customs', value: null as string | null },
    { id: '03', name: 'Warehouse', value: '1,800,000.00' as string | null },
    { id: '04', name: 'Transportation', value: null as string | null },
    { id: '05', name: 'Cross Border', value: null as string | null },
    { id: '06', name: 'Trading', value: null as string | null },
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
    ],
  };

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
    },
    {
      id: 2,
      name: "SCG/WD Freight",
      contact: "Veerachai Uksemak",
      title: "Manager",
    },
  ];

  const keyStats = {
    keyWin: [
      { category: "Cross Border", percentage: 40 },
      { category: "Transportation", percentage: 30 },
      { category: "Service", percentage: 20 },
      { category: "Customs", percentage: 10 },
    ],
    keyLoss: [
      { category: "Cross Border", percentage: 40 },
      { category: "Customs", percentage: 20 },
      { category: "Pricing", percentage: 20 },
      { category: "Service", percentage: 10 },
    ],
  };

  const quotations = [
    {
      id: "QT-20-001",
      name: "ข้อ 15# ค่าบริการคลัง + H&W",
      value: "฿ 3,500,000",
      status: "Draft",
      date: "01 Feb 24",
    },
    {
      id: "QT-20-002",
      name: "ระบบคลังสินค้าขนาดกลาง",
      value: "฿ 6,800,000",
      status: "Sent",
      date: "15 Jan 24",
    },
  ];

  const relatedDeals = [
    {
      id: "CF-2024-091",
      dealName: "ข้อ 18# ค่าบริการคลัง",
      value: "฿10,000,000",
      stage: "Negotiation",
      owner: "นายสมชาย ใจดี",
      status: "Hot",
    },
    {
      id: "CF-2024-101",
      dealName: "ERP upgrade MAL",
      value: "฿8,500,000",
      stage: "สร้างข้อเสนอ",
      owner: "นางสาวพิมพ์ สุขใจ",
      status: "Medium",
    },
  ];

  const canEdit = (() => {
    if (role === "Admin" || role === "Sales Director" || role === "Sales Manager") {
      return true;
    }
    if (role === "Sales Representative") {
      return customer.accountOwner === "Sarah Chen";
    }
    return false;
  })();

  const isViewOnly = !canEdit;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 sm:p-6 max-w-[1800px] mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 hover:bg-gray-100 -ml-2 h-10 text-sm px-3"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          กลับสู่รายชื่อลูกค้า
        </Button>

        {/* Customer Header Card */}
        <Card className="shadow-md mb-6">
          <CardContent className="p-6">
            {/* Top Row */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-foreground">
                    {customer.companyName}
                  </h1>
                  <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 text-xs px-3 py-1">
                    ลูกค้าองค์กร
                  </Badge>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs px-3 py-1">
                    ใช้งานอยู่
                  </Badge>
                  {isViewOnly && (
                    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 text-xs px-3 py-1 flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      View Only
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{customer.id}</p>
              </div>

              <div className="flex gap-2">
                {!isViewOnly && (
                  <Button
                    size="sm"
                    onClick={() => setIsCreateJobCardDialogOpen(true)}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    สร้างกิจกรรม
                  </Button>
                )}
                {!isViewOnly && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsEditCustomerDialogOpen(true)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    แก้ไข
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsHistoryDialogOpen(true)}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  ประวัติ
                </Button>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">มูลค่าทั้งหมด</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-foreground">$1.2M</p>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                    +24.5%
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">ข้อตกลงทั้งหมด</p>
                <p className="text-3xl font-bold text-foreground">156</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">ข้อเสนอทั้งหมด</p>
                <p className="text-3xl font-bold text-foreground">8</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">สมาชิกเมื่อปี</p>
                <p className="text-3xl font-bold text-foreground">2019</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Information */}
            <Card className="shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold">ข้อมูลบริษัท</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Company Name</p>
                    <p className="text-base font-medium">{customer.companyName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Tax ID</p>
                    <p className="text-base font-medium">{customer.taxId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Industry</p>
                    <p className="text-base font-medium">{customer.industry}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Parent Company</p>
                    <p className="text-base font-medium">{customer.parentCompany}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Organization Info */}
            <Card className="shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold">Organization Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <a
                    href="#"
                    className="flex items-center gap-3 p-4 border-2 border-blue-200 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
                  >
                    <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">SO</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-blue-600 font-medium">SocoaID</p>
                      <p className="text-sm font-bold text-blue-900 truncate">{organizationInfo.socoaId}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-blue-600 flex-shrink-0" />
                  </a>

                  <a
                    href="#"
                    className="flex items-center gap-3 p-4 border-2 border-purple-200 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors"
                  >
                    <div className="h-12 w-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">DE</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-purple-600 font-medium">DOOMEE</p>
                      <p className="text-sm font-bold text-purple-900 truncate">{organizationInfo.doomeeEngage}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-purple-600 flex-shrink-0" />
                  </a>

                  <a
                    href="#"
                    className="flex items-center gap-3 p-4 border-2 border-green-200 rounded-xl bg-green-50 hover:bg-green-100 transition-colors"
                  >
                    <div className="h-12 w-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">HR</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-green-600 font-medium">HR System</p>
                      <p className="text-sm font-bold text-green-900 truncate">{organizationInfo.hrSystem}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-green-600 flex-shrink-0" />
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Key Stats */}
            <Card className="shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold">Key Win/Loss Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Key Win */}
                  <div>
                    <h4 className="text-base font-bold text-green-700 mb-4">✓ Key Win</h4>
                    <div className="space-y-3">
                      {keyStats.keyWin.map((item, index) => (
                        <div key={index}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">
                              {item.category}
                            </span>
                            <span className="text-sm font-bold text-green-700">
                              {item.percentage}%
                            </span>
                          </div>
                          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-green-600 h-full rounded-full"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Loss */}
                  <div>
                    <h4 className="text-base font-bold text-red-700 mb-4">✗ Key Loss</h4>
                    <div className="space-y-3">
                      {keyStats.keyLoss.map((item, index) => (
                        <div key={index}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">
                              {item.category}
                            </span>
                            <span className="text-sm font-bold text-red-700">
                              {item.percentage}%
                            </span>
                          </div>
                          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-red-600 h-full rounded-full"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quotations */}
            <Card className="shadow-md">
              <CardHeader className="pb-4 flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-bold">ใบเสนอราคา</CardTitle>
                <Button variant="link" className="text-sm text-blue-600">
                  ดูทั้งหมด
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quotations.map((quotation) => (
                    <div
                      key={quotation.id}
                      className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <FileText className="h-5 w-5 text-gray-500" />
                          <p className="text-base font-semibold text-gray-900">{quotation.name}</p>
                          <Badge
                            className={`text-xs px-3 py-1 ${
                              quotation.status === "Sent"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {quotation.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{quotation.id}</span>
                          <span>•</span>
                          <span>{quotation.date}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">{quotation.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Related Deals */}
            <Card className="shadow-md">
              <CardHeader className="pb-4 flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-bold">ดีลที่เกี่ยวข้อง</CardTitle>
                <Button variant="link" className="text-sm text-blue-600">
                  ดูทั้งหมด
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {relatedDeals.map((deal) => (
                    <div
                      key={deal.id}
                      className="p-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <p className="text-base font-bold text-blue-600">{deal.id}</p>
                            <Badge
                              className={`text-xs px-3 py-1 ${
                                deal.status === "Hot"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {deal.status}
                            </Badge>
                          </div>
                          <p className="text-base font-semibold text-gray-900 mb-1">
                            {deal.dealName}
                          </p>
                          <p className="text-sm text-gray-600">{deal.owner}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900 mb-1">{deal.value}</p>
                          <Badge className="bg-purple-100 text-purple-700 text-xs px-2 py-1">
                            {deal.stage}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Service Revenue */}
            <Card className="shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold">ยอดขายแต่ละ Service</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {serviceRevenue.map((service) => (
                    <div
                      key={service.id}
                      className={`border-2 rounded-xl p-4 transition-all ${
                        service.value
                          ? "bg-blue-50 border-blue-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">
                          {service.id}
                        </span>
                        <p className="text-sm font-semibold text-foreground">
                          {service.name}
                        </p>
                      </div>
                      {service.value ? (
                        <p className="text-base font-bold text-blue-900">
                          ฿{service.value}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-400">-</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* ผู้ติดต่อ */}
            <Card className="shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold">ผู้ติดต่อสำคัญ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {keyContacts.map((contact, index) => (
                    <div
                      key={index}
                      className="p-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-base font-bold text-gray-900">{contact.name}</p>
                        {contact.role && (
                          <Badge className="bg-orange-100 text-orange-700 text-xs px-2 py-1">
                            {contact.role}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{contact.position}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* TAG */}
            <Card className="shadow-md">
              <CardHeader className="pb-4 flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-bold">Tags</CardTitle>
                <Button variant="link" className="text-sm text-blue-600">
                  แก้ไข
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <Badge
                      key={index}
                      className="bg-gray-700 text-white text-sm px-4 py-2 hover:bg-gray-800"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Organization Group */}
            <Card className="shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold">Organization Group</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {organizationGroup.map((org) => (
                    <div
                      key={org.id}
                      className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className="h-12 w-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Building2 className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-bold text-gray-900 truncate">{org.name}</p>
                        <p className="text-sm text-gray-600 truncate">{org.contact}</p>
                        <p className="text-xs text-gray-500 truncate">{org.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Primary Contacts */}
            <Card className="shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold">ผู้ติดต่อหลัก</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customer.contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`p-4 rounded-xl border-2 ${
                        contact.isPrimary
                          ? "bg-blue-50 border-blue-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-base font-bold text-foreground">
                          {contact.name}
                        </p>
                        {contact.isPrimary && (
                          <Badge className="bg-blue-600 text-white text-xs px-2 py-1">
                            Primary
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{contact.title}</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                            {contact.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <a href={`tel:${contact.phone}`} className="text-blue-600 hover:underline">
                            {contact.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
        onSaveServices={() => {}}
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
