import { useState, useEffect, useMemo } from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Plus,
  Building2,
  DollarSign,
  Briefcase,
  CheckCircle2,
  History,
  Download,
  ChevronRight,
  Upload,
  Users,
  EyeOff,
  Calendar as CalendarIcon,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRole } from "../../contexts/role-context";
import { industries } from "../../../data/masterData";
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
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import type { DateRange } from "react-day-picker";

interface Customer {
  id: string;
  companyName: string;
  companyNameEn: string;
  industries: string;
  BUSINESS_UNITS: string;
  pic: string;
  picInitials: string;
  revenue: string;
  status: string;
  activeDeals: number;
  tags: string[];
  services: {
    freight?: boolean;
    customs?: boolean;
    warehouse?: boolean;
    transport?: boolean;
    crossborder?: boolean;
    trading?: boolean;
    service?: boolean;
    other?: boolean;
    unknown?: boolean;
  };
  serviceDetails?: {
    [key: string]: {
      BUSINESS_UNITS: string;
      pic: string;
      picInitials: string;
      industries: string;
    };
  };
}

interface CustomerListScreenProps {
  onCustomerClick: (customerId: string) => void;
  shouldOpenAddDialog?: boolean;
  setShouldOpenAddDialog?: (open: boolean) => void;
  viewMode?: "all" | "my";
}

export function CustomerListScreenV2({ 
  onCustomerClick, 
  shouldOpenAddDialog, 
  setShouldOpenAddDialog,
  viewMode: initialViewMode = "all"
}: CustomerListScreenProps) {
  const { t } = useTranslation();
  const { role } = useRole();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [filterindustries, setFilterindustries] = useState("all");
  const [filterBUSINESS_UNITS, setFilterBUSINESS_UNITS] = useState("all");
  const [filterOwner, setFilterOwner] = useState("all");
  const [filterDateRange, setFilterDateRange] = useState<DateRange | undefined>(undefined);
  const [viewMode, setViewMode] = useState<"all" | "my">(initialViewMode);
  const [isAddCustomerDialogOpen, setIsAddCustomerDialogOpen] = useState(false);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [isBulkImportDialogOpen, setIsBulkImportDialogOpen] = useState(false);

  // Check if user is Manager
  const isManager = role === "Sales Manager" || role === "Admin";
  const canViewRevenue = role === "Sales Manager" || role === "Admin" || viewMode === "my";

  // Current user (mock - in real app, get from auth context)
  const currentUser = "somchai.wong@onelink.co.th";

  // Team members list
  const teamMembers = [
    "สมชาย วงศ์สกุล",
    "อนุชา ศรีสวัสดิ์", 
    "วิภาวี จันทร์เจริญ",
    "ธนพล รัตนพงษ์",
  ];

  // Sync viewMode with prop when it changes
  useEffect(() => {
    setViewMode(initialViewMode);
  }, [initialViewMode]);

  useEffect(() => {
    if (shouldOpenAddDialog) {
      setIsAddCustomerDialogOpen(true);
      setShouldOpenAddDialog?.(false);
    }
  }, [shouldOpenAddDialog, setShouldOpenAddDialog]);

  const handleSaveData = (data: any) => {
    console.log("New customer data:", data);
    toast.success("บันทึกข้อมูลลูกค้าสำเร็จ");
  };

  // Available tags for filtering
  const availableTags: Tag[] = [
    { id: "ka", name: "KA", color: "#dc2626" },
    { id: "vip", name: "VIP", color: "#f59e0b" },
    { id: "new", name: "ลูกค้าใหม่", color: "#10b981" },
    { id: "government", name: "หน่วยงานรัฐ", color: "#3b82f6" },
    { id: "corporate", name: "บริษัทเอกชน", color: "#8b5cf6" },
    { id: "hot", name: "Hot Lead", color: "#ef4444" },
    { id: "potential", name: "มีศักยภาพ", color: "#06b6d4" },
  ];

  // Mock customers data with tags (Cleaned industries strings)
  const customers: Customer[] = [
    {
      id: "CUST-001",
      companyName: "องค์การเภสัชกรรม",
      companyNameEn: "Government Pharmaceutical Organization",
      industries: "Healthcare & Pharmaceutical",
      BUSINESS_UNITS: "Healthcare & Pharmaceutical",
      pic: "somchai.wong@onelink.co.th",
      picInitials: "สว",
      revenue: "22191450",
      status: "Active",
      activeDeals: 2,
      tags: ["ka", "government", "vip"],
      services: {
        freight: true,
        customs: true,
      },
      serviceDetails: {
        freight: { BUSINESS_UNITS: "Healthcare & Pharmaceutical", pic: "somchai.wong@onelink.co.th", picInitials: "สว", industries: "healthcare_pharmaceutical" },
        customs: { BUSINESS_UNITS: "B2B2C", pic: "apinya.wong@onelink.co.th", picInitials: "อว", industries: "healthcare_pharmaceutical" },
      }
    },
    {
      id: "CUST-002",
      companyName: "สภากาชาดไทย",
      companyNameEn: "Thai Red Cross Society",
      industries: "Healthcare & Pharmaceutical",
      BUSINESS_UNITS: "Healthcare & Pharmaceutical",
      pic: "surasak.wong@onelink.co.th",
      picInitials: "สว",
      revenue: "1170306",
      status: "Active",
      activeDeals: 1,
      tags: ["government", "vip"],
      services: {
        service: true,
      },
    },
    {
      id: "CUST-003",
      companyName: "สถาบันวิจัยจุฬาภรณ์",
      companyNameEn: "Chulabhorn Research Institute",
      industries: "Healthcare & Pharmaceutical",
      BUSINESS_UNITS: "Healthcare & Pharmaceutical",
      pic: "somsak.charoen@onelink.co.th",
      picInitials: "สจ",
      revenue: "248050",
      status: "Active",
      activeDeals: 1,
      tags: ["government"],
      services: {
        warehouse: true,
      },
    },
    {
      id: "CUST-018",
      companyName: "บริษัท ไทยยูเนี่ยน โฟรเซ่น โปรดักส์ จำกัด (มหาชน)",
      companyNameEn: "Thai Union Frozen Products PCL",
      industries: "Food & FMCG",
      BUSINESS_UNITS: "Cold Chain",
      pic: "sombat.jindapol@onelink.co.th",
      picInitials: "สจ",
      revenue: "45250000",
      status: "Active",
      activeDeals: 8,
      tags: ["ka", "corporate", "vip"],
      services: {
        freight: true,
        warehouse: true,
        transport: true,
      },
      serviceDetails: {
        freight: { BUSINESS_UNITS: "Freight", pic: "sombat.jindapol@onelink.co.th", picInitials: "สจ", industries: "food_beverage" },
        warehouse: { BUSINESS_UNITS: "Cold Chain", pic: "weerasak.chot@onelink.co.th", picInitials: "วช", industries: "food_beverage" },
        transport: { BUSINESS_UNITS: "Commercial", pic: "thanakrit.wong@onelink.co.th", picInitials: "ธว", industries: "food_beverage" },
      }
    },
    {
      id: "CUST-019",
      companyName: "บริษัท เนสท์เล่ (ไทย) จำกัด",
      companyNameEn: "Nestle (Thai) Ltd.",
      industries: "Food & FMCG",
      BUSINESS_UNITS: "Commercial",
      pic: "wipa.sriswat@onelink.co.th",
      picInitials: "วศ",
      revenue: "38900000",
      status: "Active",
      activeDeals: 6,
      tags: ["ka", "corporate"],
      services: {
        customer: true,
        warehouse: true,
      },
      serviceDetails: {
        customer: { BUSINESS_UNITS: "Commercial", pic: "wipa.sriswat@onelink.co.th", picInitials: "วศ", industries: "food_beverage" },
        warehouse: { BUSINESS_UNITS: "Commercial", pic: "prasit.patta@onelink.co.th", picInitials: "ปภ", industries: "food_beverage" },
      }
    },
    {
      id: "CUST-020",
      companyName: "บริษัท ซีพี ออลล์ จำกัด (มหาชน)",
      companyNameEn: "CP ALL Public Company Limited",
      industries: "Other",
      BUSINESS_UNITS: "Commercial",
      pic: "thanakrit.wong@onelink.co.th",
      picInitials: "ธว",
      revenue: "125500000",
      status: "Active",
      activeDeals: 15,
      tags: ["ka", "corporate", "vip"],
      services: {
        freight: true,
        warehouse: true,
        transport: true,
        crossborder: true,
      },
      serviceDetails: {
        freight: { BUSINESS_UNITS: "Freight", pic: "thanakrit.wong@onelink.co.th", picInitials: "ธว", industries: "retail" },
        warehouse: { BUSINESS_UNITS: "Commercial", pic: "apinya.wong@onelink.co.th", picInitials: "อว", industries: "retail" },
        transport: { BUSINESS_UNITS: "Commercial", pic: "surachai.kitt@onelink.co.th", picInitials: "สก", industries: "retail" },
        crossborder: { BUSINESS_UNITS: "CLMV+China", pic: "pattarapol.charoen@onelink.co.th", picInitials: "ภจ", industries: "retail" },
      }
    },
    {
      id: "CUST-021",
      companyName: "บริษัท เซ็นทรัล รีเทล คอร์ปอเรชั่น จำกัด (มหาชน)",
      companyNameEn: "Central Retail Corporation PCL",
      industries: "Other",
      BUSINESS_UNITS: "Commercial",
      pic: "piyanuch.suwan@onelink.co.th",
      picInitials: "ปส",
      revenue: "89750000",
      status: "Active",
      activeDeals: 12,
      tags: ["ka", "corporate"],
      services: {
        warehouse: true,
        transport: true,
      },
      serviceDetails: {
        warehouse: { BUSINESS_UNITS: "Commercial", pic: "piyanuch.suwan@onelink.co.th", picInitials: "ปส", industries: "retail" },
        transport: { BUSINESS_UNITS: "Commercial", pic: "weerasak.chot@onelink.co.th", picInitials: "วช", industries: "retail" },
      }
    },
    {
      id: "CUST-022",
      companyName: "บริษัท ปูนซิเมนต์ไทย จำกัด (มหาชน)",
      companyNameEn: "Siam Cement PCL",
      industries: "Energy & Utilities",
      BUSINESS_UNITS: "Commodity",
      pic: "anucha.prom@onelink.co.th",
      picInitials: "อพ",
      revenue: "156300000",
      status: "Active",
      activeDeals: 20,
      tags: ["ka", "corporate", "vip", "potential"],
      services: {
        freight: true,
        transport: true,
        trading: true,
      },
      serviceDetails: {
        freight: { BUSINESS_UNITS: "Freight", pic: "anucha.prom@onelink.co.th", picInitials: "อพ", industries: "manufacturing" },
        transport: { BUSINESS_UNITS: "Commercial", pic: "prasit.patta@onelink.co.th", picInitials: "ปภ", industries: "manufacturing" },
        trading: { BUSINESS_UNITS: "Commodity", pic: "david.kim@onelink.co.th", picInitials: "DK", industries: "manufacturing" },
      }
    },
    {
      id: "CUST-023",
      companyName: "บริษัท ไทยออยล์ จำกัด (มหาชน)",
      companyNameEn: "Thai Oil PCL",
      industries: "Energy & Utilities",
      BUSINESS_UNITS: "Commodity",
      pic: "weerasak.chot@onelink.co.th",
      picInitials: "วช",
      revenue: "210500000",
      status: "Active",
      activeDeals: 18,
      tags: ["ka", "corporate", "vip"],
      services: {
        freight: true,
        crossborder: true,
        trading: true,
      },
      serviceDetails: {
        freight: { BUSINESS_UNITS: "Freight", pic: "weerasak.chot@onelink.co.th", picInitials: "วช", industries: "energy" },
        crossborder: { BUSINESS_UNITS: "CLMV+China", pic: "michael.wong@onelink.co.th", picInitials: "MW", industries: "energy" },
        trading: { BUSINESS_UNITS: "Commodity", pic: "david.kim@onelink.co.th", picInitials: "DK", industries: "energy" },
      }
    },
    {
      id: "CUST-024",
      companyName: "บริษัท ปตท. จำกัด (มหาชน)",
      companyNameEn: "PTT Public Company Limited",
      industries: "Energy & Utilities",
      BUSINESS_UNITS: "Commodity",
      pic: "surachai.kitt@onelink.co.th",
      picInitials: "สก",
      revenue: "450000000",
      status: "Active",
      activeDeals: 35,
      tags: ["ka", "corporate", "vip"],
      services: {
        freight: true,
        transport: true,
        crossborder: true,
        other: true,
      },
      serviceDetails: {
        freight: { BUSINESS_UNITS: "Freight", pic: "surachai.kitt@onelink.co.th", picInitials: "สก", industries: "energy" },
        transport: { BUSINESS_UNITS: "Commercial", pic: "apinya.wong@onelink.co.th", picInitials: "อว", industries: "energy" },
        crossborder: { BUSINESS_UNITS: "CLMV+China", pic: "michael.wong@onelink.co.th", picInitials: "MW", industries: "energy" },
        other: { BUSINESS_UNITS: "Commodity", pic: "david.kim@onelink.co.th", picInitials: "DK", industries: "energy" },
      }
    },
    {
      id: "CUST-025",
      companyName: "บริษัท แอดวานซ์ อินโฟร์ เซอร์วิส จำกัด (มหาชน)",
      companyNameEn: "Advanced Info Service PCL",
      industries: "Electronics & Electrical Appliances",
      BUSINESS_UNITS: "Commercial",
      pic: "pattarapol.charoen@onelink.co.th",
      picInitials: "ภจ",
      revenue: "95800000",
      status: "Active",
      activeDeals: 10,
      tags: ["ka", "corporate", "hot"],
      services: {
        customs: true,
        service: true,
      },
      serviceDetails: {
        customs: { BUSINESS_UNITS: "B2B2C", pic: "pattarapol.charoen@onelink.co.th", picInitials: "ภจ", industries: "technology_telecom" },
        service: { BUSINESS_UNITS: "Commercial", pic: "robert.taylor@onelink.co.th", picInitials: "RT", industries: "technology_telecom" },
      }
    },
    {
      id: "CUST-015",
      companyName: "บ.เอ.เอ็น.บี.ลาบอราตอรี่ จก.",
      companyNameEn: "N.B. Laboratory Co., Ltd.",
      industries: "Healthcare & Pharmaceutical",
      BUSINESS_UNITS: "Healthcare & Pharmaceutical",
      pic: "pongsin.kruea@onelink.co.th",
      picInitials: "พค",
      revenue: "32549230",
      status: "Active",
      activeDeals: 5,
      tags: ["ka", "corporate", "potential"],
      services: {
        freight: true,
        customer: true,
        warehouse: true,
      },
    },
    {
      id: "CUST-006",
      companyName: "บริษัท ไทยเมจิฟาร์มาซิวติคัล จำกัด",
      companyNameEn: "Thai Meiji Pharmaceutical Co., Ltd.",
      industries: "Healthcare & Pharmaceutical",
      BUSINESS_UNITS: "Healthcare & Pharmaceutical",
      pic: "prasit.patta@onelink.co.th",
      picInitials: "ปภ",
      revenue: "7500",
      status: "Active",
      activeDeals: 0,
      tags: ["new"],
      services: {
        unknown: true,
      },
    },
    {
      id: "CUST-010",
      companyName: "บมจ. นำวิวัฒน์ เมดิคอล คอร์ปอเรชั่น",
      companyNameEn: "Namwiwat Medical Corporation PCL",
      industries: "Healthcare & Pharmaceutical",
      BUSINESS_UNITS: "Healthcare & Pharmaceutical",
      pic: "apinya.wong@onelink.co.th",
      picInitials: "อว",
      revenue: "6657746",
      status: "Active",
      activeDeals: 3,
      tags: ["corporate", "potential"],
      services: {
        transport: true,
        service: true,
      },
    },
    {
      id: "CUST-026",
      companyName: "บริษัท สยามเคมีคอล จำกัด (มหาชน)",
      companyNameEn: "Siam Chemical PCL",
      industries: "Manufacturing",
      BUSINESS_UNITS: "Commodity",
      pic: "somchai.wong@onelink.co.th",
      picInitials: "สว",
      revenue: "58200000",
      status: "Active",
      activeDeals: 7,
      tags: ["ka", "corporate"],
      services: {
        freight: true,
        warehouse: true,
        transport: true,
      },
      serviceDetails: {
        freight: { BUSINESS_UNITS: "Freight", pic: "somchai.wong@onelink.co.th", picInitials: "สว", industries: "manufacturing" },
        warehouse: { BUSINESS_UNITS: "Commercial", pic: "weerasak.chot@onelink.co.th", picInitials: "วช", industries: "manufacturing" },
        transport: { BUSINESS_UNITS: "Commercial", pic: "apinya.wong@onelink.co.th", picInitials: "อว", industries: "manufacturing" },
      }
    },
    {
      id: "CUST-027",
      companyName: "บริษัท เบทาโกร จำกัด (มหาชน)",
      companyNameEn: "Betagro PCL",
      industries: "Food & FMCG",
      BUSINESS_UNITS: "Cold Chain",
      pic: "somchai.wong@onelink.co.th",
      picInitials: "สว",
      revenue: "42500000",
      status: "Active",
      activeDeals: 6,
      tags: ["ka", "corporate", "vip"],
      services: {
        freight: true,
        warehouse: true,
        crossborder: true,
      },
      serviceDetails: {
        freight: { BUSINESS_UNITS: "Freight", pic: "somchai.wong@onelink.co.th", picInitials: "สว", industries: "food_beverage" },
        warehouse: { BUSINESS_UNITS: "Cold Chain", pic: "prasit.patta@onelink.co.th", picInitials: "ปภ", industries: "food_beverage" },
        crossborder: { BUSINESS_UNITS: "ASEAN Island and Taiwan", pic: "sarah.chen@onelink.co.th", picInitials: "SC", industries: "food_beverage" },
      }
    },
    {
      id: "CUST-028",
      companyName: "บริษัท สยามพิวรรธน์ จำกัด",
      companyNameEn: "Siam Piwat Co., Ltd.",
      industries: "Retail",
      BUSINESS_UNITS: "Commercial",
      pic: "somchai.wong@onelink.co.th",
      picInitials: "สว",
      revenue: "35800000",
      status: "Active",
      activeDeals: 5,
      tags: ["corporate", "potential"],
      services: {
        transport: true,
        warehouse: true,
      },
      serviceDetails: {
        transport: { BUSINESS_UNITS: "Commercial", pic: "somchai.wong@onelink.co.th", picInitials: "สว", industries: "retail" },
        warehouse: { BUSINESS_UNITS: "Commercial", pic: "weerasak.chot@onelink.co.th", picInitials: "วช", industries: "retail" },
      }
    },
    {
      id: "CUST-029",
      companyName: "บริษัท มิตรผล จำกัด (มหาชน)",
      companyNameEn: "Mitr Phol Sugar Corp., Ltd.",
      industries: "Food & FMCG",
      BUSINESS_UNITS: "Commodity",
      pic: "somchai.wong@onelink.co.th",
      picInitials: "สว",
      revenue: "67500000",
      status: "Active",
      activeDeals: 9,
      tags: ["ka", "corporate", "vip"],
      services: {
        freight: true,
        warehouse: true,
        trading: true,
      },
      serviceDetails: {
        freight: { BUSINESS_UNITS: "Freight", pic: "somchai.wong@onelink.co.th", picInitials: "สว", industries: "food_beverage" },
        warehouse: { BUSINESS_UNITS: "Commercial", pic: "apinya.wong@onelink.co.th", picInitials: "อว", industries: "food_beverage" },
        trading: { BUSINESS_UNITS: "Commodity", pic: "david.kim@onelink.co.th", picInitials: "DK", industries: "food_beverage" },
      }
    },
    {
      id: "CUST-030",
      companyName: "บริษัท โตโยต้า มอเตอร์ ประเทศไทย จำกัด",
      companyNameEn: "Toyota Motor Thailand Co., Ltd.",
      industries: "Automotive",
      BUSINESS_UNITS: "Automotive",
      pic: "apinya.wong@onelink.co.th",
      picInitials: "อว",
      revenue: "185000000",
      status: "Active",
      activeDeals: 22,
      tags: ["ka", "corporate", "vip"],
      services: {
        freight: true,
        warehouse: true,
        transport: true,
        crossborder: true,
      },
      serviceDetails: {
        freight: { BUSINESS_UNITS: "Freight", pic: "apinya.wong@onelink.co.th", picInitials: "อว", industries: "automotive" },
        warehouse: { BUSINESS_UNITS: "Commercial", pic: "weerasak.chot@onelink.co.th", picInitials: "วช", industries: "automotive" },
        transport: { BUSINESS_UNITS: "Automotive", pic: "emily.johnson@onelink.co.th", picInitials: "EJ", industries: "automotive" },
        crossborder: { BUSINESS_UNITS: "ASEAN Island and Taiwan", pic: "sarah.chen@onelink.co.th", picInitials: "SC", industries: "automotive" },
      }
    },
  ];

  // Get unique BUSINESS_UNITS for filter
  const uniqueBUSINESS_UNITS = useMemo(() =>
    Array.from(new Set(customers.map(c => c.BUSINESS_UNITS))),
    [customers]
  );

  // Get unique industries for filter (Added .trim() here)
  const uniqueIndustries = useMemo(() =>
    Array.from(new Set(customers.map(c => c.industries.trim()))),
    [customers]
  );

  // Filter customers
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      // View mode filter (My Customers vs All)
      const matchesViewMode = 
        viewMode === "all" || customer.pic === currentUser;
      
      // Text search
      const matchesSearch =
        searchTerm === "" ||
        customer.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.companyNameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.pic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Tag filter
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every(selectedTag => 
          customer.tags.includes(selectedTag.id)
        );
      
      // industries filter (Added .trim() here)
      const matchesindustries =
        filterindustries === "all" || customer.industries.trim() === filterindustries;
      
      // BUSINESS_UNITS filter
      const matchesBUSINESS_UNITS =
        filterBUSINESS_UNITS === "all" || customer.BUSINESS_UNITS === filterBUSINESS_UNITS;
      
      // Owner filter
      const matchesOwner =
        filterOwner === "all" || customer.pic === filterOwner;
      
      return matchesViewMode && matchesSearch && matchesTags && matchesindustries && matchesBUSINESS_UNITS && matchesOwner;
    });
  }, [customers, viewMode, currentUser, searchTerm, selectedTags, filterindustries, filterBUSINESS_UNITS, filterOwner]);

  // Apply sorting
  const { sortedData, sortState, handleSort } = useTableSort(filteredCustomers);

  // Calculate total revenue
  const totalRevenue = useMemo(() => 
    filteredCustomers.reduce((sum, customer) => 
      sum + parseFloat(customer.revenue), 0
    ),
    [filteredCustomers]
  );

  const handleExport = () => {
    toast.success("ส่งออกข้อมูลสำเร็จ");
  };

  // Helper function to get active services for a customer
  const getActiveServices = (customer: Customer) => {
    const activeServices: string[] = [];
    Object.entries(customer.services).forEach(([key, value]) => {
      if (value) {
        activeServices.push(key);
      }
    });
    return activeServices;
  };

  // Helper function to get service details
  const getServiceDetail = (customer: Customer, serviceKey: string) => {
    if (customer.serviceDetails && customer.serviceDetails[serviceKey]) {
      return customer.serviceDetails[serviceKey];
    }
    // Fallback to main customer data
    return {
      BUSINESS_UNITS: customer.BUSINESS_UNITS,
      pic: customer.pic,
      picInitials: customer.picInitials,
      industries: customer.industries,
    };
  };

  // Helper function to remove "บริษัท" from company name
  const removeCompanyPrefix = (name: string) => {
    return name.replace(/^บริษัท\s+/, '').replace(/^บมจ\.\s+/, '').replace(/^บจก\.\s+/, '');
  };

  return (
    <div className="p-2 sm:p-3 lg:p-4 bg-gray-50 min-h-screen">
      <div className="max-w-[1600px] mx-auto space-y-2 sm:space-y-3">

        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">
              {viewMode === "my" ? "ลูกค้าของฉัน" : "ลูกค้าทั้งหมด"}
            </h1>
            <p className="text-[10px] sm:text-xs text-gray-500">
              {viewMode === "my" ? "จัดการข้อมูลลูกค้าที่คุณดูแล" : "จัดการข้อมูลลูกค้าทั้งหมด"}
            </p>
          </div>
          <div className="flex gap-1.5 flex-shrink-0">
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 grid-center">
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

            {canViewRevenue && (
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
            )}
          </div>
        )}

        {/* Search with Tag Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5">
          <div className="flex-1 sm:max-w-lg">
            <TagSearchBar
              value={searchTerm}
              onValueChange={setSearchTerm}
              selectedTags={selectedTags}
              onTagsChange={setSelectedTags}
              availableTags={availableTags}
              placeholder="ค้นหาลูกค้า... (พิมพ์ KA, VIP เพื่อกรองตาม tag)"
            />
          </div>

          <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap">
            <Select value={filterindustries} onValueChange={setFilterindustries}>
              <SelectTrigger className="h-10 w-auto min-w-[150px] px-3 text-xs border-gray-300 bg-white gap-1.5 rounded-lg">
                <Briefcase className="h-4 w-4 text-gray-600 flex-shrink-0" />
                <span className="truncate">อุตสาหกรรม</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">อุตสาหกรรมทั้งหมด</SelectItem>
                {uniqueIndustries.map(industry => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterBUSINESS_UNITS} onValueChange={setFilterBUSINESS_UNITS}>
              <SelectTrigger className="h-10 w-auto min-w-[80px] px-3 text-xs border-gray-300 bg-white gap-1.5 rounded-lg">
                <Building2 className="h-4 w-4 text-gray-600 flex-shrink-0" />
                <span className="truncate">หน่วยธุรกิจ</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">กลุ่มธุรกิจทั้งหมด</SelectItem>
                {uniqueBUSINESS_UNITS.map(group => (
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

            {/* Date Range Inputs */}
            <div className="flex items-center gap-1.5">
              <Popover>
                <PopoverTrigger
                  type="button"
                  className="relative h-10 w-[130px] px-3 pr-9 text-xs border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer text-left"
                >
                  <span className={filterDateRange?.from ? "text-gray-900" : "text-gray-400"}>
                    {filterDateRange?.from ? format(filterDateRange.from, "dd/MM/yyyy") : "dd/mm/yyyy"}
                  </span>
                  <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600 pointer-events-none" />
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filterDateRange?.from}
                    onSelect={(date) => setFilterDateRange({ from: date, to: filterDateRange?.to })}
                    locale={th}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <span className="text-gray-400 text-xs">ถึง</span>

              <Popover>
                <PopoverTrigger
                  type="button"
                  className="relative h-10 w-[130px] px-3 pr-9 text-xs border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer text-left"
                >
                  <span className={filterDateRange?.to ? "text-gray-900" : "text-gray-400"}>
                    {filterDateRange?.to ? format(filterDateRange.to, "dd/MM/yyyy") : "dd/mm/yyyy"}
                  </span>
                  <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600 pointer-events-none" />
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filterDateRange?.to}
                    onSelect={(date) => setFilterDateRange({ from: filterDateRange?.from, to: date })}
                    locale={th}
                    initialFocus
                    disabled={(date) => filterDateRange?.from ? date < filterDateRange.from : false}
                  />
                </PopoverContent>
              </Popover>

              {filterDateRange?.from && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 p-0 hover:bg-gray-100"
                  onClick={() => setFilterDateRange(undefined)}
                >
                  <X className="h-4 w-4 text-gray-500" />
                </Button>
              )}
            </div>

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
        </div>

        {/* Desktop Table View */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hidden lg:block">
          <div className="overflow-hidden">
            <table className="w-full table-fixed">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left px-4 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wide bg-gray-50/50 w-[16%]" rowSpan={2}>
                    ชื่อลูกค้า
                  </th>
                  <th className="text-center px-3 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wide bg-gray-50/50 w-[10%]" rowSpan={2}>
                    หน่วยธุรกิจ
                  </th>
                  <th className="text-left px-4 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wide bg-gray-50/50 w-[13%]" rowSpan={2}>
                    ผู้ดูแล
                  </th>
                  <th className="text-left px-4 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wide bg-gray-50/50 w-[11%]" rowSpan={2}>
                    อุตสาหกรรม
                  </th>
                  <th className="text-center px-3 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wide bg-gray-50/50 w-[40%]" colSpan={9}>
                    บริการ
                  </th>
                  <th className="text-center px-4 py-2.5 text-[10px] font-semibold text-gray-600 uppercase tracking-wide bg-gray-50/50 w-[5%]" rowSpan={2}>
                    Revenue
                  </th>
                </tr>
                <tr className="border-b border-gray-200">
                  <th className="text-center px-2 py-2.5 text-[10px] font-medium text-gray-600 bg-gray-50/50 border-l border-r border-gray-200 min-w-[80px]">
                    Freight
                  </th>
                  <th className="text-center px-2 py-2.5 text-[10px] font-medium text-gray-600 bg-gray-50/50 border-l border-r border-gray-200 min-w-[80px]">
                    Customs
                  </th>
                  <th className="text-center px-2 py-2.5 text-[10px] font-medium text-gray-600 bg-gray-50/50 border-l border-r border-gray-200 min-w-[80px]">Warehouse</th>
                  <th className="text-center px-2 py-2.5 text-[10px] font-medium text-gray-600 bg-gray-50/50 border-l border-r border-gray-200 min-w-[80px]">
                    Transport
                  </th>
                  <th className="text-center px-2 py-2.5 text-[10px] font-medium text-gray-600 bg-gray-50/50 border-l border-r border-gray-200 min-w-[80px]">
                    Crossborder
                  </th>
                  <th className="text-center px-2 py-2.5 text-[10px] font-medium text-gray-600 bg-gray-50/50 border-l border-r border-gray-200 min-w-[80px]">
                    Trading
                  </th>
                  <th className="text-center px-2 py-2.5 text-[10px] font-medium text-gray-600 bg-gray-50/50 border-l border-r border-gray-200 min-w-[80px]">
                    Service
                  </th>
                  <th className="text-center px-2 py-2.5 text-[10px] font-medium text-gray-600 bg-gray-50/50 border-l border-r border-gray-200 min-w-[80px]">
                    Other
                  </th>
                  <th className="text-center px-2 py-2.5 text-[10px] font-medium text-gray-600 bg-gray-50/50 border-l border-r border-gray-200 min-w-[80px]">
                    Unknown
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sortedData.map((customer, index) => {
                  const activeServices = getActiveServices(customer);
                  return (
                  <tr
                    key={customer.id}
                    className={`hover:bg-blue-50/30 transition-colors cursor-pointer group border-b border-gray-200 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    }`}
                    onClick={() => onCustomerClick(customer.id)}
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {removeCompanyPrefix(customer.companyName)}
                        </p>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex flex-col gap-1">
                        {activeServices.map((serviceKey, idx) => {
                          const detail = getServiceDetail(customer, serviceKey);
                          return (
                            <span
                              key={idx}
                              className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-100 truncate"
                              title={detail.BUSINESS_UNITS}
                            >
                              {detail.BUSINESS_UNITS}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        {activeServices.map((serviceKey, idx) => {
                          const detail = getServiceDetail(customer, serviceKey);
                          return (
                            <span key={idx} className="text-xs text-gray-700 truncate" title={detail.pic}>
                              {detail.pic}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-gray-600 truncate block" title={customer.industries}>
                        {customer.industries}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-center border-l border-r border-gray-200">
                      {customer.services.freight && (
                        <span className="text-[#10b981] text-base font-semibold">✓</span>
                      )}
                    </td>
                    <td className="px-3 py-4 text-center border-r border-gray-200">
                      {customer.services.customer && (
                        <span className="text-[#10b981] text-base font-semibold">✓</span>
                      )}
                    </td>
                    <td className="px-3 py-4 text-center border-r border-gray-200">
                      {customer.services.warehouse && (
                        <span className="text-[#10b981] text-base font-semibold">✓</span>
                      )}
                    </td>
                    <td className="px-3 py-4 text-center border-r border-gray-200">
                      {customer.services.transport && (
                        <span className="text-[#10b981] text-base font-semibold">✓</span>
                      )}
                    </td>
                    <td className="px-3 py-4 text-center border-r border-gray-200">
                      {customer.services.crossborder && (
                        <span className="text-[#10b981] text-base font-semibold">✓</span>
                      )}
                    </td>
                    <td className="px-3 py-4 text-center border-r border-gray-200">
                      {customer.services.trading && (
                        <span className="text-[#10b981] text-base font-semibold">✓</span>
                      )}
                    </td>
                    <td className="px-3 py-4 text-center border-r border-gray-200">
                      {customer.services.service && (
                        <span className="text-[#10b981] text-base font-semibold">✓</span>
                      )}
                    </td>
                    <td className="px-3 py-4 text-center border-r border-gray-200">
                      {customer.services.other && (
                        <span className="text-[#10b981] text-base font-semibold">✓</span>
                      )}
                    </td>
                    <td className="px-3 py-4 text-center border-r border-gray-200">
                      {customer.services.unknown && (
                        <span className="text-[#10b981] text-base font-semibold">✓</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {canViewRevenue ? (
                        <span className="font-semibold text-gray-900 text-[10px]">
                          ฿{parseFloat(customer.revenue).toLocaleString()}
                        </span>
                      ) : (
                        <div className="flex items-center justify-end">
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        </div>
                      )}
                    </td>
                  </tr>
                );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-2">
          {sortedData.map((customer) => (
            <div
              key={customer.id}
              className="bg-white rounded-lg border border-gray-200 p-2.5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onCustomerClick(customer.id)}
            >
              {/* Company Name */}
              <div className="flex items-start justify-between mb-1.5">
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-medium text-gray-900 truncate">{removeCompanyPrefix(customer.companyName)}</h3>
                </div>
              </div>

              {/* BUSINESS_UNITS */}
              <div className="flex flex-wrap gap-1 mb-2">
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
                  {customer.BUSINESS_UNITS}
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
                {canViewRevenue && (
                  <div>
                    <p className="text-[9px] text-gray-500">Revenue</p>
                    <p className="text-xs font-bold text-gray-900">
                      ฿{parseFloat(customer.revenue).toLocaleString()}
                    </p>
                  </div>
                )}
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