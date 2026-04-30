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
  ChevronDown,
  ChevronUp,
  Clock,
  Eye,
  Lock,
  ExternalLink,
  PieChart,
  TrendingUp,
  FileText,
  DollarSign,
  Target,
  Calendar,
  MessageSquare,
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

export function CustomerDetailScreen({ onBack }: { onBack: () => void }) {
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
  const [expandedContact, setExpandedContact] = useState<number | null>(0);
  const [expandedAddress, setExpandedAddress] = useState<number | null>(0);

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