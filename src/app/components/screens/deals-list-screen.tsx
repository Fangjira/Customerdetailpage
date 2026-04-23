import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useRole } from "../../contexts/role-context";
import { QuickAddDealModal } from "../modals/quick-add-deal-modal";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { DonutProgress } from "../ui/donut-progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Search,
  Target,
  TrendingUp,
  Users,
  FileText,
  X,
  Sparkles,
  Tag,
  Layers,
  ChevronRight,
  Plus,
  Filter,
  ArrowUp,
  ArrowDown,
  TrendingFlat,
} from "lucide-react";

interface Deal {
  id: string;
  name: string;
  customer: string; // ชื่อลูกค้า/ลีด
  customerId: string; // ID ของลูกค้า/ลีด (เช่น CUST-001 หรือ LEAD-001)
  customerType: "customer" | "lead"; // ประเภท: ลูกค้าหรือลีด
  owner: string; // เพิ่ม owner
  commodityTypes: string[];
  services: string[];
  valueChains: string[];
  projectStatus: string;
  lostReason?: string;
  progress: number;
  probabilityOfDeal: string;
  remarks: string;
  dealSize: number; // มูลค่าดีล (บาท)
}

interface DealsListScreenProps {
  onDealClick: (dealId: string) => void;
  shouldOpenAddDialog?: boolean;
  setShouldOpenAddDialog?: (open: boolean) => void;
}

export function DealsListScreen({ onDealClick, shouldOpenAddDialog, setShouldOpenAddDialog }: DealsListScreenProps) {
  const { t } = useTranslation();
  const { role } = useRole();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterService, setFilterService] = useState<string>("all");
  const [filterProjectStatus, setFilterProjectStatus] = useState<string>("all");
  const [filterOwner, setFilterOwner] = useState<string>("all"); // เพิ่ม owner filter
  const [filterCustomerType, setFilterCustomerType] = useState<string>("all"); // เพิ่ม customer type filter
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Check if user is Manager
  const isManager = role === "Sales Manager" || role === "Admin";
  const currentUser = "Sarah Chen"; // ในระบบจริงจะดึงจาก auth context

  // Team members list
  const teamMembers = [
    "Sarah Chen",
    "Michael Park", 
    "Emily Rodriguez",
    "David Kim",
  ];

  // Handle opening modal from submenu navigation
  useEffect(() => {
    if (shouldOpenAddDialog && setShouldOpenAddDialog) {
      setShowCreateModal(true);
      setShouldOpenAddDialog(false);
    }
  }, [shouldOpenAddDialog, setShouldOpenAddDialog]);
  
  const deals: Deal[] = [
    {
      id: "DL-2024-001",
      name: "International Freight Contract",
      customer: "ABC Corporation",
      customerId: "CUST-001",
      customerType: "customer",
      owner: "Sarah Chen",
      commodityTypes: ["Automotive Parts", "Vehicles"],
      services: ["Freight", "Crossborder"],
      valueChains: ["Multimodal", "Transport"],
      projectStatus: "Negotiating Process",
      progress: 70,
      probabilityOfDeal: "High",
      remarks: "Customer is very interested, final pricing discussion scheduled.",
      dealSize: 5000000,
    },
    {
      id: "DL-2024-002",
      name: "Warehouse Management Services",
      customer: "XYZ Logistics",
      customerId: "CUST-002",
      customerType: "customer",
      owner: "Michael Park",
      commodityTypes: ["Packaged Food", "Beverages"],
      services: ["Warehousing - General", "Distribution"],
      valueChains: ["Value Creation / Value-added"],
      projectStatus: "Quotation",
      progress: 50,
      probabilityOfDeal: "Medium",
      remarks: "Quotation sent, awaiting customer feedback.",
      dealSize: 3000000,
    },
    {
      id: "DL-2024-016",
      name: "Potential Cross-border E-commerce Deal",
      customer: "Global Traders Ltd.",
      customerId: "LEAD-001",
      customerType: "lead",
      owner: "Sarah Chen",
      commodityTypes: ["Consumer Electronics", "Fashion & Apparel"],
      services: ["Crossborder", "Customs Clearance"],
      valueChains: ["Multimodal"],
      projectStatus: "Approach",
      progress: 25,
      probabilityOfDeal: "Medium",
      remarks: "Lead from trade show, scheduled initial consultation.",
      dealSize: 2500000,
    },
    {
      id: "DL-2024-017",
      name: "Cold Chain Expansion Opportunity",
      customer: "FreshFood Partners",
      customerId: "LEAD-002",
      customerType: "lead",
      owner: "Emily Rodriguez",
      commodityTypes: ["Frozen Food", "Beverages"],
      services: ["Warehousing - Cold Storage", "Land Transport - Cold Chain"],
      valueChains: ["Value Creation / Value-added"],
      projectStatus: "Quotation",
      progress: 55,
      probabilityOfDeal: "High",
      remarks: "Lead showing strong interest, sent detailed proposal.",
      dealSize: 4200000,
    },
    {
      id: "DL-2024-018",
      name: "Manufacturing Logistics Partnership",
      customer: "TechPro Manufacturing",
      customerId: "LEAD-003",
      customerType: "lead",
      owner: "David Kim",
      commodityTypes: ["Consumer Electronics", "Components"],
      services: ["Warehouse", "Transport", "Distribution"],
      valueChains: ["Multimodal", "Transport"],
      projectStatus: "Negotiating Process",
      progress: 60,
      probabilityOfDeal: "High",
      remarks: "Lead from website inquiry, in advanced negotiations.",
      dealSize: 5500000,
    },
    {
      id: "DL-2024-019",
      name: "Pharmaceutical Distribution Network",
      customer: "MediSupply Group",
      customerId: "LEAD-004",
      customerType: "lead",
      owner: "Michael Park",
      commodityTypes: ["Pharmaceuticals", "Medical Devices"],
      services: ["Distribution", "Warehousing - General"],
      valueChains: ["Service Focused"],
      projectStatus: "Approach",
      progress: 15,
      probabilityOfDeal: "Low",
      remarks: "Cold lead from LinkedIn, need follow-up.",
      dealSize: 1800000,
    },
    {
      id: "DL-2024-020",
      name: "Automotive Parts Hub Deal",
      customer: "AutoParts Direct",
      customerId: "LEAD-005",
      customerType: "lead",
      owner: "Sarah Chen",
      commodityTypes: ["Automotive Parts", "Machinery"],
      services: ["Warehouse", "Land Transport - General"],
      valueChains: ["Value Creation / Value-added"],
      projectStatus: "Quotation",
      progress: 45,
      probabilityOfDeal: "Medium",
      remarks: "Lead from referral, submitted competitive quote.",
      dealSize: 3200000,
    },
    {
      id: "DL-2024-021",
      name: "Fashion Import & Logistics",
      customer: "StyleHub Imports",
      customerId: "LEAD-006",
      customerType: "lead",
      owner: "Emily Rodriguez",
      commodityTypes: ["Fashion & Apparel", "Textile"],
      services: ["Sea Freight - International", "Customs Clearance"],
      valueChains: ["Transport", "Service Focused"],
      projectStatus: "Lose",
      lostReason: "Pricing & Budget",
      progress: 100,
      probabilityOfDeal: "Low",
      remarks: "Lead went with cheaper competitor.",
      dealSize: 2000000,
    },
    {
      id: "DL-2024-003",
      name: "Customs & Compliance Package",
      customer: "Pacific Distribution Co.",
      customerId: "CUST-003",
      customerType: "customer",
      owner: "Emily Rodriguez",
      commodityTypes: ["Pharmaceuticals", "Medical Devices"],
      services: ["Customs Clearance"],
      valueChains: ["Service Focused"],
      projectStatus: "Win",
      progress: 100,
      probabilityOfDeal: "High",
      remarks: "Deal successfully closed with Pacific Distribution Co.",
      dealSize: 2000000,
    },
    {
      id: "DL-2024-004",
      name: "Last Mile Delivery Network",
      customer: "Tech Solutions Inc.",
      customerId: "CUST-004",
      customerType: "customer",
      owner: "David Kim",
      commodityTypes: ["Consumer Electronics", "Home Appliances"],
      services: ["Land Transport - General", "Distribution"],
      valueChains: ["Transport"],
      projectStatus: "Approach",
      progress: 10,
      probabilityOfDeal: "Low",
      remarks: "Initial approach made, needs analysis scheduled next week.",
      dealSize: 1500000,
    },
    {
      id: "DL-2024-005",
      name: "Cold Chain Logistics Solution",
      customer: "Healthcare Supplies Co.",
      customerId: "CUST-005",
      customerType: "customer",
      owner: "Sarah Chen",
      commodityTypes: ["Pharmaceuticals"],
      services: ["Warehousing - Cold Storage", "Land Transport - Cold Chain"],
      valueChains: ["Multimodal", "Value Creation / Value-added"],
      projectStatus: "Lose",
      lostReason: "Pricing & Budget",
      progress: 100,
      probabilityOfDeal: "Low",
      remarks: "Lost to competitor due to pricing concerns.",
      dealSize: 4000000,
    },
    {
      id: "DL-2024-006",
      name: "E-commerce Fulfillment Center",
      customer: "E-commerce Giant",
      customerId: "CUST-006",
      customerType: "customer",
      owner: "Michael Park",
      commodityTypes: ["Consumer Electronics", "Fashion & Apparel"],
      services: ["Warehouse", "Transport"],
      valueChains: ["Value Creation / Value-added"],
      projectStatus: "Negotiating Process",
      progress: 75,
      probabilityOfDeal: "High",
      remarks: "Client requires 24/7 operations, finalizing SLA.",
      dealSize: 6000000,
    },
    {
      id: "DL-2024-007",
      name: "Automotive Parts Distribution",
      customer: "Automotive Parts Co.",
      customerId: "CUST-007",
      customerType: "customer",
      owner: "Emily Rodriguez",
      commodityTypes: ["Automotive Parts", "Machinery"],
      services: ["Land Transport - General", "Warehousing - General"],
      valueChains: ["Transport", "Value Creation / Value-added"],
      projectStatus: "Quotation",
      progress: 45,
      probabilityOfDeal: "Medium",
      remarks: "Requested volume discounts, preparing revised quotation.",
      dealSize: 2500000,
    },
    {
      id: "DL-2024-008",
      name: "Textile Import & Clearance",
      customer: "Fashion Retailer",
      customerId: "CUST-008",
      customerType: "customer",
      owner: "David Kim",
      commodityTypes: ["Fashion & Apparel", "Textile"],
      services: ["Customs Clearance", "Sea Freight - International"],
      valueChains: ["Service Focused", "Transport"],
      projectStatus: "Win",
      progress: 100,
      probabilityOfDeal: "High",
      remarks: "Contract signed for 12-month period.",
      dealSize: 3500000,
    },
    {
      id: "DL-2024-009",
      name: "Chemical Storage Facility",
      customer: "Chemical Manufacturer",
      customerId: "CUST-009",
      customerType: "customer",
      owner: "Sarah Chen",
      commodityTypes: ["Chemicals", "Hazardous Materials"],
      services: ["Warehousing - Hazardous", "Land Transport - Hazmat"],
      valueChains: ["Service Focused"],
      projectStatus: "Approach",
      progress: 15,
      probabilityOfDeal: "Low",
      remarks: "Initial safety compliance review underway.",
      dealSize: 1000000,
    },
    {
      id: "DL-2024-010",
      name: "Food & Beverage Distribution Hub",
      customer: "Food Distributor",
      customerId: "CUST-010",
      customerType: "customer",
      owner: "Michael Park",
      commodityTypes: ["Packaged Food", "Beverages", "Frozen Food"],
      services: ["Warehousing - Cold Storage", "Distribution"],
      valueChains: ["Multimodal", "Value Creation / Value-added"],
      projectStatus: "Negotiating Process",
      progress: 80,
      probabilityOfDeal: "High",
      remarks: "Technical specs approved, negotiating pricing.",
      dealSize: 7000000,
    },
    {
      id: "DL-2024-011",
      name: "Medical Equipment Transport",
      customer: "Medical Supplies Co.",
      customerId: "CUST-011",
      customerType: "customer",
      owner: "Emily Rodriguez",
      commodityTypes: ["Medical Devices", "Pharmaceuticals"],
      services: ["Freight", "Crossborder"],
      valueChains: ["Transport", "Service Focused"],
      projectStatus: "Quotation",
      progress: 40,
      probabilityOfDeal: "Medium",
      remarks: "Awaiting FDA compliance documentation.",
      dealSize: 2000000,
    },
    {
      id: "DL-2024-012",
      name: "Electronics Manufacturing Logistics",
      customer: "Electronics Manufacturer",
      customerId: "CUST-012",
      customerType: "customer",
      owner: "David Kim",
      commodityTypes: ["Consumer Electronics", "Components"],
      services: ["Sea Freight - International", "Warehousing - General"],
      valueChains: ["Multimodal", "Transport"],
      projectStatus: "Lose",
      lostReason: "Service Coverage",
      progress: 100,
      probabilityOfDeal: "Low",
      remarks: "Could not meet required delivery timeline.",
      dealSize: 5000000,
    },
    {
      id: "DL-2024-013",
      name: "Retail Chain Replenishment",
      customer: "Major Retailer",
      customerId: "CUST-013",
      customerType: "customer",
      owner: "Sarah Chen",
      commodityTypes: ["Consumer Goods", "Home Appliances"],
      services: ["Distribution", "Land Transport - General"],
      valueChains: ["Transport", "Value Creation / Value-added"],
      projectStatus: "Win",
      progress: 100,
      probabilityOfDeal: "High",
      remarks: "3-year contract secured with major retailer.",
      dealSize: 8000000,
    },
    {
      id: "DL-2024-014",
      name: "Agricultural Products Export",
      customer: "Agricultural Exporter",
      customerId: "CUST-014",
      customerType: "customer",
      owner: "Michael Park",
      commodityTypes: ["Agricultural Products", "Packaged Food"],
      services: ["Sea Freight - International", "Customs Clearance"],
      valueChains: ["Service Focused", "Transport"],
      projectStatus: "Approach",
      progress: 20,
      probabilityOfDeal: "Medium",
      remarks: "Exploring export compliance requirements.",
      dealSize: 3000000,
    },
    {
      id: "DL-2024-015",
      name: "Industrial Equipment Shipping",
      customer: "Industrial Equipment Co.",
      customerId: "CUST-015",
      customerType: "customer",
      owner: "Emily Rodriguez",
      commodityTypes: ["Machinery", "Heavy Equipment"],
      services: ["Sea Freight - International", "Project Cargo"],
      valueChains: ["Transport", "Service Focused"],
      projectStatus: "Negotiating Process",
      progress: 65,
      probabilityOfDeal: "High",
      remarks: "Discussing specialized handling requirements.",
      dealSize: 4500000,
    },
  ];

  const getStageColor = useCallback((stage: string) => {
    switch (stage) {
      case "Win":
        return "bg-green-100 text-green-700";
      case "Negotiating Process":
        return "bg-teal-50 text-teal-700";
      case "Quotation":
        return "bg-blue-100 text-blue-700";
      case "Approach":
        return "bg-indigo-100 text-indigo-700";
      case "Lose":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  }, []);

  const getProgressColor = useCallback((progress: number) => {
    if (progress >= 76) return "bg-green-100 text-green-700 border-green-200";
    if (progress >= 51) return "bg-blue-100 text-blue-700 border-blue-200";
    if (progress >= 26) return "bg-yellow-100 text-yellow-700 border-yellow-200";
    return "bg-red-100 text-red-700 border-red-200";
  }, []);

  // Format deal size to readable format
  const formatDealSize = useCallback((size: number) => {
    if (size >= 1000000) {
      return `${(size / 1000000).toFixed(1)} ล้าน`;
    }
    if (size >= 1000) {
      return `${(size / 1000).toFixed(0)} พัน`;
    }
    return size.toLocaleString();
  }, []);

  // Filter deals based on search and filters
  const filteredDeals = useMemo(() => deals.filter((deal) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      searchTerm === "" ||
      deal.name.toLowerCase().includes(searchLower) ||
      deal.id.toLowerCase().includes(searchLower) ||
      deal.commodityTypes.some(type => type.toLowerCase().includes(searchLower)) ||
      deal.services.some(service => service.toLowerCase().includes(searchLower)) ||
      deal.valueChains.some(chain => chain.toLowerCase().includes(searchLower)) ||
      deal.remarks.toLowerCase().includes(searchLower) ||
      (deal.lostReason && deal.lostReason.toLowerCase().includes(searchLower));

    const matchesService = 
      filterService === "all" ||
      deal.services.some(service => service.includes(filterService));

    const matchesStatus = 
      filterProjectStatus === "all" ||
      deal.projectStatus === filterProjectStatus;

    const matchesOwner = 
      filterOwner === "all" ||
      deal.owner === filterOwner;

    const matchesCustomerType = 
      filterCustomerType === "all" ||
      deal.customerType === filterCustomerType;

    return matchesSearch && matchesService && matchesStatus && matchesOwner && matchesCustomerType;
  }), [deals, searchTerm, filterService, filterProjectStatus, filterOwner, filterCustomerType]);

  // Calculate stats
  const stats = useMemo(() => ({
    total: filteredDeals.length,
    win: filteredDeals.filter(d => d.projectStatus === "Win").length,
    negotiating: filteredDeals.filter(d => d.projectStatus === "Negotiating Process").length,
    quotation: filteredDeals.filter(d => d.projectStatus === "Quotation").length,
    lose: filteredDeals.filter(d => d.projectStatus === "Lose").length,
    highProbability: filteredDeals.filter(d => d.probabilityOfDeal === "High").length,
  }), [filteredDeals]);

  const totalPages = Math.ceil(filteredDeals.length / itemsPerPage);
  const currentDeals = filteredDeals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterService, filterProjectStatus, filterOwner, filterCustomerType]);

  return (
    <div className="p-2 sm:p-3 lg:p-4 bg-gray-50 min-h-screen">
      <div className="max-w-[1600px] mx-auto space-y-2 sm:space-y-3">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-3">
              <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">ดีลทั้งหมด</h1>
              {/* Debug Role Badge */}
              <Badge className={`text-[10px] ${isManager ? 'bg-blue-500' : 'bg-green-500'}`}>
                {role}
              </Badge>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-500">
              {isManager ? "กำลังดูของทั้งทีม" : "กำลังดูของตัวเอง"}
            </p>
          </div>
          <Button
            size="sm"
            className="h-9 px-4 bg-green-600 hover:bg-green-700 text-white shadow-sm text-sm font-medium rounded-full"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus className="h-4 w-4 mr-1.5" />
            สร้างดีล
          </Button>
        </div>

        {/* Stats */}
        {filteredDeals.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            <div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-2.5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] font-medium text-gray-500 uppercase tracking-wide truncate">ดีลทั้งหมด</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-900 mt-0.5">{stats.total}</p>
                </div>
                <div className="h-7 w-7 sm:h-8 sm:w-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-2.5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] font-medium text-gray-500 uppercase tracking-wide truncate">ชนะ (Win)</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-900 mt-0.5">{stats.win}</p>
                </div>
                <div className="h-7 w-7 sm:h-8 sm:w-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-2.5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] font-medium text-gray-500 uppercase tracking-wide truncate">กำลังเจรจา</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-900 mt-0.5">{stats.negotiating}</p>
                </div>
                <div className="h-7 w-7 sm:h-8 sm:w-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-2.5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] font-medium text-gray-500 uppercase tracking-wide truncate">โอกาสสูง</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-900 mt-0.5">{stats.highProbability}</p>
                </div>
                <div className="h-7 w-7 sm:h-8 sm:w-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-600" />
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

          <Select value={filterProjectStatus} onValueChange={setFilterProjectStatus}>
            <SelectTrigger className="h-10 w-auto min-w-[100px] px-3 text-xs border-gray-300 bg-white gap-1.5 rounded-lg">
              <Filter className="h-4 w-4 text-gray-600 flex-shrink-0" />
              <span className="truncate">สถานะ</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">สถานะั้งหมด</SelectItem>
              <SelectItem value="Approach">Approach</SelectItem>
              <SelectItem value="Quotation">Quotation</SelectItem>
              <SelectItem value="Negotiating Process">Negotiating</SelectItem>
              <SelectItem value="Win">Win</SelectItem>
              <SelectItem value="Lose">Lose</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterService} onValueChange={setFilterService}>
            <SelectTrigger className="h-10 w-auto min-w-[100px] px-3 text-xs border-gray-300 bg-white gap-1.5 rounded-lg">
              <Layers className="h-4 w-4 text-gray-600 flex-shrink-0" />
              <span className="truncate">บริการ</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">บริการทั้งหมด</SelectItem>
              <SelectItem value="Freight Forwarding">Freight Forwarding</SelectItem>
              <SelectItem value="Warehousing">Warehousing</SelectItem>
              <SelectItem value="Customs Clearance">Customs Clearance</SelectItem>
              <SelectItem value="Distribution">Distribution</SelectItem>
              <SelectItem value="Transport">Transport</SelectItem>
            </SelectContent>
          </Select>

          {isManager && (
            <Select value={filterOwner} onValueChange={setFilterOwner}>
              <SelectTrigger className="h-10 w-auto min-w-[100px] px-3 text-xs border-gray-300 bg-white gap-1.5 rounded-lg">
                <Users className="h-4 w-4 text-gray-600 flex-shrink-0" />
                <span className="truncate">ผู้รับผิดชอบ</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทุกคน</SelectItem>
                {teamMembers.map((member) => (
                  <SelectItem key={member} value={member}>{member}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Select value={filterCustomerType} onValueChange={setFilterCustomerType}>
            <SelectTrigger className="h-10 w-auto min-w-[100px] px-3 text-xs border-gray-300 bg-white gap-1.5 rounded-lg">
              <Tag className="h-4 w-4 text-gray-600 flex-shrink-0" />
              <span className="truncate">ประเภทลูกค้า</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทั้งหมด</SelectItem>
              <SelectItem value="customer">ลูกค้า</SelectItem>
              <SelectItem value="lead">ลีด</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Desktop Table View */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hidden lg:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-3 py-2 text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                    ประเภท
                  </th>
                  <th className="text-left px-3 py-2 text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                    ลูกค้า/ลีด
                  </th>
                  <th className="text-left px-3 py-2 text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                    ชื่อดีล
                  </th>
                  {isManager && (
                    <th className="text-left px-3 py-2 text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                      ผู้รับผิดชอบ
                    </th>
                  )}
                  <th className="text-right px-3 py-2 text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                    มูลค่า
                  </th>
                  <th className="text-left px-3 py-2 text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                    บริการ
                  </th>
                  <th className="text-center px-3 py-2 text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                    โอกาส
                  </th>
                  <th className="text-left px-3 py-2 text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                    สถานะ
                  </th>
                  <th className="text-center px-3 py-2 text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                    ความคืบหน้า
                  </th>
                  <th className="text-right px-3 py-2 text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                    
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentDeals.map((deal) => (
                  <tr
                    key={deal.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer group"
                    onClick={() => onDealClick(deal.id)}
                  >
                    <td className="px-3 py-2.5">
                      <span className="text-xs text-gray-700">
                        {deal.customerType === "customer" ? "ลูกค้า" : "ลีด"}
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
                      <p className="text-xs text-gray-700">{deal.customer}</p>
                    </td>
                    <td className="px-3 py-2.5">
                      <p className="text-xs text-gray-700">{deal.name}</p>
                    </td>
                    {isManager && (
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-[#7BC9A6]/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-[9px] font-semibold text-[#7BC9A6]">
                              {deal.owner.split(" ").map(n => n[0]).join("")}
                            </span>
                          </div>
                          <span className="text-xs text-gray-700">{deal.owner}</span>
                        </div>
                      </td>
                    )}
                    <td className="px-3 py-2.5 text-right">
                      <p className="text-[10px] text-gray-500">{formatDealSize(deal.dealSize)}</p>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex flex-wrap gap-1">
                        {deal.services.slice(0, 2).map((service, idx) => (
                          <span key={idx} className="text-xs text-gray-700">
                            {service}{idx < Math.min(1, deal.services.slice(0, 2).length - 1) ? ', ' : ''}
                          </span>
                        ))}
                        {deal.services.length > 2 && (
                          <span className="text-xs text-gray-500">
                            +{deal.services.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {deal.probabilityOfDeal === "High" && (
                          <ArrowUp className="h-3.5 w-3.5 text-green-700" strokeWidth={3} />
                        )}
                        {deal.probabilityOfDeal === "Medium" && (
                          <ArrowUp className="h-3.5 w-3.5 text-yellow-600" strokeWidth={2.5} />
                        )}
                        {deal.probabilityOfDeal === "Low" && (
                          <ArrowDown className="h-3.5 w-3.5 text-red-600" strokeWidth={3} />
                        )}
                        <span className="text-xs text-gray-700">
                          {deal.probabilityOfDeal}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="text-xs text-gray-700">
                        {deal.projectStatus}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <DonutProgress progress={deal.progress} size={52} />
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-2">
          {currentDeals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white rounded-lg border border-gray-200 p-2.5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onDealClick(deal.id)}
            >
              {/* Deal Name & Owner */}
              <div className="flex items-start justify-between mb-1.5">
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-medium text-gray-900 truncate">{deal.name}</h3>
                  <p className="text-[10px] text-gray-500 mt-0.5 truncate">{deal.id}</p>
                  {isManager && (
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="h-4 w-4 rounded-full bg-[#7BC9A6]/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-[8px] font-semibold text-[#7BC9A6]">
                          {deal.owner.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-600">{deal.owner}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Status & Probability */}
              <div className="flex flex-wrap gap-1 mb-2">
                <Badge
                  variant="secondary"
                  className={`${getStageColor(deal.projectStatus)} text-[10px] px-1.5 py-0 font-medium`}
                >
                  {deal.projectStatus}
                </Badge>
                <Badge
                  variant="secondary"
                  className={`text-[10px] px-1.5 py-0 font-medium ${
                    deal.probabilityOfDeal === "High"
                      ? "bg-green-100 text-green-700"
                      : deal.probabilityOfDeal === "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {deal.probabilityOfDeal}
                </Badge>
              </div>

              {/* Services */}
              <div className="mb-1.5 pb-1.5 border-b border-gray-100">
                <p className="text-[9px] text-gray-500 mb-0.5">บริการ</p>
                <div className="flex flex-wrap gap-1">
                  {deal.services.slice(0, 2).map((service, idx) => (
                    <span key={idx} className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
                      {service}
                    </span>
                  ))}
                  {deal.services.length > 2 && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-gray-100 text-gray-600">
                      +{deal.services.length - 2}
                    </span>
                  )}
                </div>
              </div>

              {/* Progress & Action */}
              <div className="flex items-center justify-between pt-1.5">
                <div className="flex-1 mr-3">
                  <p className="text-[9px] text-gray-500 mb-0.5">ความคืบหน้า</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
                        style={{ width: `${deal.progress}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-semibold text-gray-700">{deal.progress}%</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-6 px-1.5 text-[10px]"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDealClick(deal.id);
                  }}
                >
                  ดูรายละเอียด
                  <ChevronRight className="h-2.5 w-2.5 ml-0.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDeals.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">ไม่พบโครงการ</h3>
            <p className="text-sm text-gray-500 text-center max-w-sm mb-4">
              {searchTerm || filterService !== "all" || filterProjectStatus !== "all" || filterOwner !== "all" || filterCustomerType !== "all"
                ? "ลองปรับเปลี่ยนตัวกรองหรือคำค้นหาของคุณ"
                : "เริ่มต้นสร้างโครงการแรกของคุณ"}
            </p>
            {(searchTerm || filterService !== "all" || filterProjectStatus !== "all" || filterOwner !== "all" || filterCustomerType !== "all") && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setFilterService("all");
                  setFilterProjectStatus("all");
                  setFilterOwner("all");
                  setFilterCustomerType("all");
                }}
              >
                ล้างตัวกรองทั้งหมด
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Load More Button */}
      {filteredDeals.length > currentDeals.length && (
        <div className="mt-6 text-center">
          <Button
            variant="outline"
            onClick={() => setItemsPerPage(prev => prev + 10)}
            className="w-full h-10"
          >
            โหลดเพิ่มเติม ({filteredDeals.length - currentDeals.length} รายการ)
          </Button>
        </div>
      )}

      {/* Create Deal Modal */}
      {showCreateModal && (
        <QuickAddDealModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSave={(dealData) => {
            console.log("New deal created:", dealData);
            setShowCreateModal(false);
          }}
        />
      )}
    </div>
  );
}