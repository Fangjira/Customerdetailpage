import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Search,
  Plus,
  Building2,
  Phone,
  Mail,
  DollarSign,
  Briefcase,
  CheckCircle2,
  History,
  Download,
  ChevronRight,
  Upload,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRole } from "../../contexts/role-context";
import {
  INDUSTRIES,
  BUSINESS_GROUPS,
  CUSTOMER_TYPES,
} from "../../../config/masterData";
import { AddLeadCustomerModal } from "../modals/add-lead-customer-modal";
import { AddCustomerDialog } from "../add-customer-dialog";
import { HistoryDialog } from "../history-dialog";
import { BulkImportDialog } from "../bulk-import-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import { useTableSort } from "../../hooks/use-table-sort";
import { SortableHeader } from "../ui/sortable-header";
import { TagSearchBar, Tag } from "../tag-search-bar";

interface CustomerListScreenProps {
  onCustomerClick: (customerId: string) => void;
  shouldOpenAddDialog?: boolean;
  setShouldOpenAddDialog?: (open: boolean) => void;
}

export function CustomerListScreen({ onCustomerClick, shouldOpenAddDialog, setShouldOpenAddDialog }: CustomerListScreenProps) {
  const { t } = useTranslation();
  const { role } = useRole();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [filterIndustry, setFilterIndustry] = useState("all");
  const [filterBU, setFilterBU] = useState("all");
  const [filterOwner, setFilterOwner] = useState("all");
  const [isAddCustomerDialogOpen, setIsAddCustomerDialogOpen] = useState(false);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [isBulkImportDialogOpen, setIsBulkImportDialogOpen] = useState(false);

  // Check if user is Manager
  const isManager = role === "Sales Manager" || role === "Admin";
  const currentUser = "สมชาย วงศ์สกุล";

  // Team members list
  const teamMembers = [
    "สมชาย วงศ์สกุล",
    "อนุชา ศรีสวัสดิ์", 
    "วิภาวี จันทร์เจริญ",
    "ธนพล รัตนพงษ์",
  ];

  useEffect(() => {
    if (shouldOpenAddDialog) {
      setIsAddCustomerDialogOpen(true);
      setShouldOpenAddDialog?.(false);
    }
  }, [shouldOpenAddDialog, setShouldOpenAddDialog]);

  const handleSaveData = (data: any) => {
    console.log("New customer data:", data);
    console.log("Sales Channel value:", data.salesChannel);
    console.log("Industry value:", data.industry);
    console.log("Customer Type value:", data.customerType);
    console.log("Business Type value:", data.businessType);
  };

  const handleExport = () => {
    // Export filtered customers to CSV
    const headers = ["รหัสลูกค้า", "ชื่อลูกค้า", "ผู้ติดต่อ", "อีเมล", "เบอร์โทร", "อุตสาหกรรม", "กลุ่มธุรกิจ", "ประเภทลูกค้า", "สถานะ"];
    const csvData = filteredCustomers.map(customer => [
      customer.id,
      customer.name,
      customer.pic,
      customer.email,
      customer.phone,
      t(`masterData.industry.${customer.industry.replace(/_([a-z])/g, (g) => g[1].toUpperCase())}`),
      t(`masterData.businessGroup.${customer.businessGroup.replace(/_([a-z0-9])/g, (g) => g[1].toUpperCase())}`),
      t(`masterData.customerType.${customer.customerType.replace(/_([a-z])/g, (g) => g[1].toUpperCase())}`),
      customer.status === "Active" ? "ใช้งาน" : "ไม่ใช้งาน"
    ]);
    
    const csvContent = [
      headers.join(","),
      ...csvData.map(row => row.join(","))
    ].join("\n");
    
    const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `customers_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Mock customers data - ในระบบจริงจะดึงตาม user account ที่ login
  const customers = [
    {
      id: "CUST-001",
      companyName: "องค์การเภสัชกรรม",
      companyNameEn: "Government Pharmaceutical Organization",
      industry: "healthcare_pharmaceutical",
      bu: "HCP",
      pic: "นพ.สมชาย วงศ์ใหญ่",
      picInitials: "สว",
      revenue: "22,191,450",
      status: "Active",
      activeDeals: 2,
    },
    {
      id: "CUST-002",
      companyName: "สภากาชาดไทย",
      companyNameEn: "Thai Red Cross Society",
      industry: "healthcare_pharmaceutical",
      bu: "HCP",
      pic: "ดร.สุรศักดิ์ วงศ์เจริญ",
      picInitials: "สว",
      revenue: "1,170,306",
      status: "Active",
      activeDeals: 1,
    },
    {
      id: "CUST-003",
      companyName: "สถาบันวิจัยจุฬาภรณ์",
      companyNameEn: "Chulabhorn Research Institute",
      industry: "healthcare_pharmaceutical",
      bu: "HCP",
      pic: "ดร.สมศักดิ์ เจริญสุข",
      picInitials: "สจ",
      revenue: "248,050",
      status: "Active",
      activeDeals: 1,
    },
    {
      id: "CUST-004",
      companyName: "บริษัท ศิริราชวิทยวิจัย จำกัด",
      companyNameEn: "Siriraj Research Co., Ltd.",
      industry: "healthcare_pharmaceutical",
      bu: "HCP",
      pic: "คุณสมชาย วิจัยกุล",
      picInitials: "สว",
      revenue: "240,000",
      status: "Active",
      activeDeals: 1,
    },
    {
      id: "CUST-005",
      companyName: "บริษัท ดีซีเอช ออริกา (ประเทศไทย)",
      companyNameEn: "DCH Orica (Thailand) Co., Ltd.",
      industry: "healthcare_pharmaceutical",
      bu: "HCP",
      pic: "คุณวิชัย ธนาพงษ์",
      picInitials: "วธ",
      revenue: "28,106,084",
      status: "Active",
      activeDeals: 4,
    },
    {
      id: "CUST-006",
      companyName: "บริษัท ไทยเมจิฟาร์มาซิวติคัล จำกัด",
      companyNameEn: "Thai Meiji Pharmaceutical Co., Ltd.",
      industry: "healthcare_pharmaceutical",
      bu: "HCP",
      pic: "คุณประสิทธิ์ ภัทรกุล",
      picInitials: "ปภ",
      revenue: "7,500",
      status: "Active",
      activeDeals: 0,
    },
    {
      id: "CUST-007",
      companyName: "บริษัท โอเร็กซ์ เทรดดิ้ง จำกัด",
      companyNameEn: "Orex Trading Co., Ltd.",
      industry: "healthcare_pharmaceutical",
      bu: "HCP",
      pic: "คุณมานิตย์ ศรีสุข",
      picInitials: "มศ",
      revenue: "158,500",
      status: "Active",
      activeDeals: 1,
    },
    {
      id: "CUST-008",
      companyName: "บริษัท เอสดีเอส-อะคูเท็คท์ จำกัด",
      companyNameEn: "SDS-Acutech Co., Ltd.",
      industry: "healthcare_pharmaceutical",
      bu: "HCP",
      pic: "คุณจิรายุ พัฒนกุล",
      picInitials: "จพ",
      revenue: "227,450",
      status: "Active",
      activeDeals: 1,
    },
    {
      id: "CUST-009",
      companyName: "บริษัท เพ็ด เอ็กซ์ จำกัด",
      companyNameEn: "Ped-X Co., Ltd.",
      industry: "healthcare_pharmaceutical",
      bu: "HCP",
      pic: "คุณธนพล สุขสวัสดิ์",
      picInitials: "ธส",
      revenue: "686,996",
      status: "Active",
      activeDeals: 1,
    },
    {
      id: "CUST-010",
      companyName: "บมจ. นำวิวัฒน์ เมดิคอล คอร์ปอเรชั่น",
      companyNameEn: "Namwiwat Medical Corporation PCL",
      industry: "healthcare_pharmaceutical",
      bu: "HCP",
      pic: "คุณอภิญญา วงศ์ชัย",
      picInitials: "อว",
      revenue: "6,657,746",
      status: "Active",
      activeDeals: 3,
    },
    {
      id: "CUST-011",
      companyName: "บจก.นีโอเจน เอเชีย (ประเทศไทย)",
      companyNameEn: "Neogen Asia (Thailand) Co., Ltd.",
      industry: "healthcare_pharmaceutical",
      bu: "HCP",
      pic: "คุณวิภา สุขสันต์",
      picInitials: "วส",
      revenue: "7,990,000",
      status: "Active",
      activeDeals: 1,
    },
    {
      id: "CUST-012",
      companyName: "บจก.เคทู ไบโอเมดิคอล",
      companyNameEn: "K2 Biomedical Co., Ltd.",
      industry: "healthcare_pharmaceutical",
      bu: "HCP",
      pic: "คุณสุพัตรา วงศ์เจริญ",
      picInitials: "สว",
      revenue: "145,930",
      status: "Active",
      activeDeals: 1,
    },
    {
      id: "CUST-013",
      companyName: "บจก.เคทู เมดิคอล (ประเทศไทย)",
      companyNameEn: "K2 Medical (Thailand) Co., Ltd.",
      industry: "healthcare_pharmaceutical",
      bu: "HCP",
      pic: "คุณรัชนี ประยูร",
      picInitials: "รป",
      revenue: "245,387",
      status: "Active",
      activeDeals: 1,
    },
    {
      id: "CUST-014",
      companyName: "บ.โอสถ อินเตอร์ แลบบอราทอรีส์ จก.",
      companyNameEn: "Osoth Inter Laboratories Co., Ltd.",
      industry: "healthcare_pharmaceutical",
      bu: "HCP",
      pic: "คุณมานิตย์ ศรีสุข",
      picInitials: "มศ",
      revenue: "1,567,166",
      status: "Active",
      activeDeals: 2,
    },
    {
      id: "CUST-015",
      companyName: "บ.เอ.เอ็น.บี.ลาบอราตอรี่ จก.",
      companyNameEn: "N.B. Laboratory Co., Ltd.",
      industry: "healthcare_pharmaceutical",
      bu: "HCP",
      pic: "ดร.พงษ์ศิลป์ เครือกลาง",
      picInitials: "พค",
      revenue: "32,549,230",
      status: "Active",
      activeDeals: 5,
    },
    {
      id: "CUST-016",
      companyName: "คณะแพทยศาสตร์ศิริราชพยาบาล มหาวิทยาลัยมหิดล",
      companyNameEn: "Faculty of Medicine Siriraj Hospital, Mahidol University",
      industry: "healthcare_pharmaceutical",
      bu: "HCP",
      pic: "ผศ.นพ.ชัยวัฒน์ ธนสาร",
      picInitials: "ชธ",
      revenue: "98,200",
      status: "Active",
      activeDeals: 1,
    },
    {
      id: "CUST-017",
      companyName: "วรมิตร ดรักเซนเตอร์",
      companyNameEn: "Woramit Drug Center",
      industry: "healthcare_pharmaceutical",
      bu: "HCP",
      pic: "คุณประเสริฐ น้ำวิวัฒน์",
      picInitials: "ปน",
      revenue: "2,040,000",
      status: "Active",
      activeDeals: 1,
    },
    {
      id: "CUST-018",
      companyName: "บริษัท ไทยยูเนี่ยน โฟรเซ่น โปรดักส์ จำกัด (มหาชน)",
      companyNameEn: "Thai Union Frozen Products PCL",
      industry: "food_beverage",
      bu: "F&B",
      pic: "คุณสมบัติ จินดาพล",
      picInitials: "สจ",
      revenue: "45,250,000",
      status: "Active",
      activeDeals: 8,
    },
    {
      id: "CUST-019",
      companyName: "บริษัท เนสท์เล่ (ไทย) จำกัด",
      companyNameEn: "Nestle (Thai) Ltd.",
      industry: "food_beverage",
      bu: "F&B",
      pic: "คุณวิภา ศรีสวัสดิ์",
      picInitials: "วศ",
      revenue: "38,900,000",
      status: "Active",
      activeDeals: 6,
    },
    {
      id: "CUST-020",
      companyName: "บริษัท ซีพี ออลล์ จำกัด (มหาชน)",
      companyNameEn: "CP ALL Public Company Limited",
      industry: "retail",
      bu: "Retail",
      pic: "คุณธนกฤต วงศ์พานิช",
      picInitials: "ธว",
      revenue: "125,500,000",
      status: "Active",
      activeDeals: 15,
    },
    {
      id: "CUST-021",
      companyName: "บริษัท เซ็นทรัล รีเทล คอร์ปอเรชั่น จำกัด (มหาชน)",
      companyNameEn: "Central Retail Corporation PCL",
      industry: "retail",
      bu: "Retail",
      pic: "คุณปิยะนุช สุวรรณรัตน์",
      picInitials: "ปส",
      revenue: "89,750,000",
      status: "Active",
      activeDeals: 12,
    },
    {
      id: "CUST-022",
      companyName: "บริษัท ปูนซิเมนต์ไทย จำกัด (มหาชน)",
      companyNameEn: "Siam Cement PCL",
      industry: "manufacturing",
      bu: "Manufacturing",
      pic: "คุณอนุชา พรหมพันธุ์",
      picInitials: "อพ",
      revenue: "156,300,000",
      status: "Active",
      activeDeals: 20,
    },
    {
      id: "CUST-023",
      companyName: "บริษัท ไทยออยล์ จำกัด (มหาชน)",
      companyNameEn: "Thai Oil PCL",
      industry: "energy",
      bu: "Energy",
      pic: "คุณวีระศักดิ์ โชติกเสถียร",
      picInitials: "วช",
      revenue: "210,500,000",
      status: "Active",
      activeDeals: 18,
    },
    {
      id: "CUST-024",
      companyName: "บริษัท ปตท. จำกัด (มหาชน)",
      companyNameEn: "PTT Public Company Limited",
      industry: "energy",
      bu: "Energy",
      pic: "คุณสุรชัย กิตติภัทรากร",
      picInitials: "สก",
      revenue: "450,000,000",
      status: "Active",
      activeDeals: 35,
    },
    {
      id: "CUST-025",
      companyName: "บริษัท แอดวานซ์ อินโฟร์ เซอร์วิส จำกัด (มหาชน)",
      companyNameEn: "Advanced Info Service PCL",
      industry: "technology_telecom",
      bu: "Tech",
      pic: "คุณภัทรพล เจริญวิวัฒน์",
      picInitials: "ภจ",
      revenue: "95,800,000",
      status: "Active",
      activeDeals: 10,
    },
  ];

  // Get unique BUs for filter
  const uniqueBUs = Array.from(new Set(customers.map(c => c.bu)));

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.companyNameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.pic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry =
      filterIndustry === "all" || customer.industry.toLowerCase() === filterIndustry;
    const matchesBU =
      filterBU === "all" || customer.bu === filterBU;
    const matchesOwner =
      filterOwner === "all" || customer.pic === filterOwner;
    return matchesSearch && matchesIndustry && matchesBU && matchesOwner;
  });

  // Calculate total revenue
  const totalRevenue = filteredCustomers.reduce((sum, customer) => {
    return sum + parseFloat(customer.revenue.replace(/,/g, ''));
  }, 0);

  const getStatusBadge = (status: string) => {
    if (status === "Active") {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
          ใช้งาน
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
        ไม่ใช้งาน
      </span>
    );
  };

  const getIndustryBadge = (industry: string) => {
    const translationKey = industry.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
    
    return null;
  };

  const getBusinessGroupBadge = (group: string) => {
    const translationKey = group.replace(/_([a-z0-9])/g, (g) => g[1].toUpperCase());
    
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-sky-50 text-sky-700 border border-sky-200">
        {t(`masterData.businessGroup.${translationKey}`)}
      </span>
    );
  };

  const getCustomerTypeBadge = (type: string) => {
    const translationKey = type.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
    
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
        {t(`masterData.customerType.${translationKey}`)}
      </span>
    );
  };

  const { sortedData, sortConfig, handleSort } = useTableSort(filteredCustomers);

  return (
    <div className="p-2 sm:p-3 lg:p-4 bg-gray-50 min-h-screen">
      <div className="max-w-[1600px] mx-auto space-y-2 sm:space-y-3">

        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">ลูกค้าทั้งหมด</h1>
            <p className="text-[10px] sm:text-xs text-gray-500">จัดการข้อมูลลูกค้าทั้งหมด</p>
          </div>
          <div className="flex gap-1.5 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsBulkImportDialogOpen(true)}
              className="h-9 px-3 border-gray-300 hover:bg-gray-50 text-xs sm:text-sm"
            >
              <Upload className="h-4 w-4 mr-1.5" />
              <span className="hidden sm:inline">นำเข้า</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsHistoryDialogOpen(true)}
              className="h-9 px-3 border-gray-300 hover:bg-gray-50 text-xs sm:text-sm"
            >
              <History className="h-4 w-4 mr-1.5" />
              <span className="hidden sm:inline">ประวัติ</span>
            </Button>
            <Button
              size="sm"
              className="h-9 px-4 bg-green-600 hover:bg-green-700 text-white shadow-sm text-sm font-medium rounded-full"
              onClick={() => setIsAddCustomerDialogOpen(true)}
            >
              <Plus className="h-4 w-4 mr-1.5" />
              เพิ่มลูกค้า
            </Button>
          </div>
        </div>

        {/* Stats */}
        {filteredCustomers.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            <div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-2.5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] font-medium text-gray-500 uppercase tracking-wide truncate">ลูกค้าทั้งหมด</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-900 mt-0.5">{filteredCustomers.length}</p>
                </div>
                <div className="h-7 w-7 sm:h-8 sm:w-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-2.5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] font-medium text-gray-500 uppercase tracking-wide truncate">ใช้งานอยู่</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-900 mt-0.5">{filteredCustomers.filter(c => c.status === "Active").length}</p>
                </div>
                <div className="h-7 w-7 sm:h-8 sm:w-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-2.5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] font-medium text-gray-500 uppercase tracking-wide truncate">ดีลทั้งหมด</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-900 mt-0.5">{filteredCustomers.reduce((sum, c) => sum + c.activeDeals, 0)}</p>
                </div>
                <div className="h-7 w-7 sm:h-8 sm:w-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-2.5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] font-medium text-gray-500 uppercase tracking-wide truncate">มูลค่ารวม</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-900 mt-0.5">฿{totalRevenue.toLocaleString()}</p>
                </div>
                <div className="h-7 w-7 sm:h-8 sm:w-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <DollarSign className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="flex items-center gap-1.5">
          <div className="relative flex-1 sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="ค้นหา..."
              className="pl-10 pr-4 h-10 text-sm border-gray-300 bg-white rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={filterIndustry} onValueChange={setFilterIndustry}>
            <SelectTrigger className="h-10 w-auto min-w-[100px] px-3 text-xs border-gray-300 bg-white gap-1.5 rounded-lg">
              <Briefcase className="h-4 w-4 text-gray-600 flex-shrink-0" />
              <span className="truncate">อุตสาหกรรม</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">อุตสาหกรรมทั้งหมด</SelectItem>
              {INDUSTRIES.map(industry => (
                <SelectItem key={industry.value} value={industry.value}>
                  {t(`masterData.industry.${industry.label}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterBU} onValueChange={setFilterBU}>
            <SelectTrigger className="h-10 w-auto min-w-[80px] px-3 text-xs border-gray-300 bg-white gap-1.5 rounded-lg">
              <Building2 className="h-4 w-4 text-gray-600 flex-shrink-0" />
              <span className="truncate">BU</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">กลุ่มธุรกิจทั้งหมด</SelectItem>
              {uniqueBUs.map(group => (
                <SelectItem key={group} value={group}>
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {isManager && (
            <Select value={filterOwner} onValueChange={setFilterOwner}>
              <SelectTrigger className="h-10 w-auto min-w-[100px] px-3 text-xs border-gray-300 bg-white gap-1.5 rounded-lg">
                <Users className="h-4 w-4 text-gray-600 flex-shrink-0" />
                <span className="truncate">ผู้ดูแล</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทุกคน</SelectItem>
                {teamMembers.map(member => (
                  <SelectItem key={member} value={member}>
                    {member}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Button 
            variant="outline" 
            size="sm" 
            className="h-10 px-3 text-xs border-gray-300 bg-white hover:bg-gray-50 gap-1.5 rounded-lg" 
            onClick={handleExport}
          >
            <Download className="h-4 w-4 text-gray-600" />
            <span className="hidden sm:inline">ส่งออก</span>
          </Button>
        </div>

        {/* Desktop Table View */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hidden lg:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-3 py-2 text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                    ชื่อบริษัท
                  </th>
                  <th className="text-left px-3 py-2 text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                    ประเภทธุรกิจ (Industry)
                  </th>
                  <th className="text-left px-3 py-2 text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                    BU
                  </th>
                  <th className="text-left px-3 py-2 text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                    PIC (Key Account)
                  </th>
                  <th className="text-right px-3 py-2 text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                    Revenue (บาท/ปี)
                  </th>
                  <th className="text-right px-3 py-2 text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                    
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedData.map((customer) => (
                  <tr
                    key={customer.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer group"
                    onClick={() => onCustomerClick(customer.id)}
                  >
                    <td className="px-3 py-2.5">
                      <div>
                        <p className="text-xs font-medium text-gray-900">{customer.companyName}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">{customer.companyNameEn}</p>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      {getIndustryBadge(customer.industry)}
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
                        {customer.bu}
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-purple-600 text-white text-[10px]">
                            {customer.picInitials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-gray-700">
                          {customer.pic}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <span className="text-xs font-semibold text-gray-900">
                        ฿{parseFloat(customer.revenue.replace(/,/g, '')).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-7 px-2 text-[10px] font-medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          onCustomerClick(customer.id);
                        }}
                      >
                        ดูรายละเอียด
                        <ChevronRight className="h-3 w-3 ml-0.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-2">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="bg-white rounded-lg border border-gray-200 p-2.5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onCustomerClick(customer.id)}
            >
              {/* Company Name */}
              <div className="flex items-start justify-between mb-1.5">
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-medium text-gray-900 truncate">{customer.companyName}</h3>
                  <p className="text-[10px] text-gray-500 mt-0.5 truncate">{customer.companyNameEn}</p>
                </div>
              </div>

              {/* Industry & BU */}
              <div className="flex flex-wrap gap-1 mb-2">
                {getIndustryBadge(customer.industry)}
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
                  {customer.bu}
                </span>
              </div>

              {/* PIC */}
              <div className="flex items-center gap-1.5 mb-1.5 pb-1.5 border-b border-gray-100">
                <Avatar className="h-5 w-5">
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-purple-600 text-white text-[9px]">
                    {customer.picInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] text-gray-500">PIC (Key Account)</p>
                  <p className="text-[10px] font-medium text-gray-700 truncate">{customer.pic}</p>
                </div>
              </div>

              {/* Revenue & Action */}
              <div className="flex items-center justify-between pt-1.5">
                <div>
                  <p className="text-[9px] text-gray-500">Revenue</p>
                  <p className="text-xs font-bold text-gray-900">
                    ฿{parseFloat(customer.revenue.replace(/,/g, '')).toLocaleString()}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-6 px-1.5 text-[10px]"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCustomerClick(customer.id);
                  }}
                >
                  ดูรายละเอียด
                  <ChevronRight className="h-2.5 w-2.5 ml-0.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>

      </div>

      <AddLeadCustomerModal
        isOpen={false}
        onClose={() => {}}
        onSave={handleSaveData}
        mode="customer"
      />

      <AddCustomerDialog
        isOpen={isAddCustomerDialogOpen}
        onClose={() => setIsAddCustomerDialogOpen(false)}
        onSave={handleSaveData}
      />

      <HistoryDialog
        isOpen={isHistoryDialogOpen}
        onClose={() => setIsHistoryDialogOpen(false)}
        entries={[]}
        title="ประวัติลูกค้า"
      />

      <BulkImportDialog
        open={isBulkImportDialogOpen}
        onClose={() => setIsBulkImportDialogOpen(false)}
        onImport={(data) => {
          console.log("Imported customer data:", data);
          toast.success(`นำเข้าข้อมูลลูกค้า ${data.length} รายการสำเร็จ`);
        }}
        mode="customer"
      />
    </div>
  );
}