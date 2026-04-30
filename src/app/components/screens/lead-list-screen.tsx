import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Search,
  Plus,
  Target,
  Building2,
  TrendingUp,
  DollarSign,
  Mail,
  Phone,
  Download,
  History,
  Flame,
  ChevronRight,
  Upload,
  Users,
  CheckCircle2,
  Briefcase,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  INDUSTRIES,
  SUPPLY_CHAIN_ROLES,
  BUSINESS_GROUPS,
} from "../../../config/masterData";
import { AddLeadDialog } from "../add-lead-dialog";
import { BulkImportDialog } from "../bulk-import-dialog";
import { toast } from "sonner";
import { useTableSort } from "../../hooks/use-table-sort";
import { SortableHeader } from "../ui/sortable-header";
import { TagSearchBar, Tag } from "../tag-search-bar";

interface LeadListScreenProps {
  onLeadClick: (leadId: string) => void;
  shouldOpenAddDialog?: boolean;
  setShouldOpenAddDialog?: (open: boolean) => void;
}

interface Lead {
  id: string;
  name: string;
  leadType: string;
  industry: string;
  supplyChainRole: string;
  businessGroup: string;
  email: string;
  phone: string;
  estimatedValue: string;
  stage: string;
  priority: "Low" | "Medium" | "High";
  services: {
    warehouse?: boolean;
    transport?: boolean;
    freightAir?: boolean;
    freightSea?: boolean;
    crossBorder?: boolean;
    customs?: boolean;
    license?: boolean;
    other?: boolean;
    unknown?: boolean;
  };
  tags?: string[];
}

const mockLeads: Lead[] = [
  {
    id: "LEAD-2024-001",
    name: "Digital Commerce Solutions",
    leadType: "coldCall",
    industry: "electronics",
    supplyChainRole: "distributor",
    businessGroup: "b2b2c",
    email: "contact@digitalcommerce.com",
    phone: "+66 2-123-4567",
    estimatedValue: "$850,000",
    stage: "contact",
    priority: "High",
    services: {
      warehouse: true,
      transport: true,
      freightAir: true,
      customs: true,
    },
    tags: ["VIP", "Hot Lead"],
  },
  {
    id: "LEAD-2024-002",
    name: "Green Energy Corp",
    leadType: "existingCustomer",
    industry: "energy",
    supplyChainRole: "manufacturer",
    businessGroup: "commodity",
    email: "info@greenenergy.com",
    phone: "+66 2-234-5678",
    estimatedValue: "$1,200,000",
    stage: "needs_analysis",
    priority: "High",
    services: {
      freightSea: true,
      crossBorder: true,
      customs: true,
      license: true,
    },
    tags: ["KA"],
  },
  {
    id: "LEAD-2024-003",
    name: "Fresh Foods Distribution",
    leadType: "marketingGroup",
    industry: "foodFmcg",
    supplyChainRole: "distributor",
    businessGroup: "healthcarePharma",
    email: "sales@freshfoods.com",
    phone: "+66 2-345-6789",
    estimatedValue: "$650,000",
    stage: "contact",
    priority: "Medium",
    services: {
      warehouse: true,
      transport: true,
      license: true,
    },
    tags: [],
  },
  {
    id: "LEAD-2024-004",
    name: "AutoParts Plus",
    leadType: "coldCall",
    industry: "automotive",
    supplyChainRole: "wholesalerRetailer",
    businessGroup: "freight3pl4pl",
    email: "inquiries@autopartsplus.com",
    phone: "+66 2-456-7890",
    estimatedValue: "$420,000",
    stage: "lead",
    priority: "Medium",
    services: {
      freightSea: true,
      customs: true,
      warehouse: true,
    },
    tags: [],
  },
  {
    id: "LEAD-2024-005",
    name: "BuildRight Materials",
    leadType: "management",
    industry: "construction",
    supplyChainRole: "manufacturer",
    businessGroup: "commodity",
    email: "contact@buildright.com",
    phone: "+66 2-567-8901",
    estimatedValue: "$980,000",
    stage: "needs_analysis",
    priority: "High",
    services: {
      warehouse: true,
      crossBorder: true,
      freightSea: true,
      transport: true,
    },
    tags: ["Hot Lead"],
  },
  {
    id: "LEAD-2024-006",
    name: "Fashion Forward Inc",
    leadType: "other",
    industry: "fashion",
    supplyChainRole: "importer",
    businessGroup: "b2b2c",
    email: "hello@fashionforward.com",
    phone: "+66 2-678-9012",
    estimatedValue: "$310,000",
    stage: "lead",
    priority: "Low",
    services: {
      freightAir: true,
      customs: true,
      transport: true,
    },
    tags: [],
  },
  {
    id: "LEAD-2024-007",
    name: "Tech Innovation Labs",
    leadType: "coldCall",
    industry: "electronics",
    supplyChainRole: "manufacturer",
    businessGroup: "b2b2c",
    email: "bizdev@techinnovation.com",
    phone: "+66 2-789-0123",
    estimatedValue: "$1,500,000",
    stage: "contact",
    priority: "High",
    services: {
      warehouse: true,
      freightAir: true,
      crossBorder: true,
      customs: true,
      other: true,
    },
    tags: ["VIP", "KA"],
  },
  {
    id: "LEAD-2024-008",
    name: "Global Pharma Solutions",
    leadType: "existingCustomer",
    industry: "healthcare",
    supplyChainRole: "distributor",
    businessGroup: "healthcarePharma",
    email: "contact@globalpharma.com",
    phone: "+66 2-890-1234",
    estimatedValue: "$2,100,000",
    stage: "proposal",
    priority: "High",
    services: {
      warehouse: true,
      transport: true,
      freightAir: true,
      customs: true,
      license: true,
    },
    tags: ["KA", "VIP"],
  },
  {
    id: "LEAD-2024-009",
    name: "Eco Packaging Co",
    leadType: "marketingGroup",
    industry: "manufacturing",
    supplyChainRole: "manufacturer",
    businessGroup: "commodity",
    email: "sales@ecopackaging.com",
    phone: "+66 2-901-2345",
    estimatedValue: "$540,000",
    stage: "needs_analysis",
    priority: "Medium",
    services: {
      warehouse: true,
      freightSea: true,
      crossBorder: true,
    },
    tags: [],
  },
  {
    id: "LEAD-2024-010",
    name: "Smart Agriculture Tech",
    leadType: "coldCall",
    industry: "agriculture",
    supplyChainRole: "manufacturer",
    businessGroup: "commodity",
    email: "info@smartagritech.com",
    phone: "+66 2-012-3456",
    estimatedValue: "$720,000",
    stage: "lead",
    priority: "Medium",
    services: { transport: true, warehouse: true, other: true },
    tags: [],
  },
  {
    id: "LEAD-2024-011",
    name: "Luxury Goods Import",
    leadType: "other",
    industry: "fashion",
    supplyChainRole: "importer",
    businessGroup: "b2b2c",
    email: "import@luxurygoods.com",
    phone: "+66 2-123-4568",
    estimatedValue: "$890,000",
    stage: "contact",
    priority: "High",
    services: {
      freightAir: true,
      customs: true,
      license: true,
      warehouse: true,
    },
    tags: ["VIP"],
  },
  {
    id: "LEAD-2024-012",
    name: "Industrial Equipment Supply",
    leadType: "management",
    industry: "manufacturing",
    supplyChainRole: "distributor",
    businessGroup: "freight3pl4pl",
    email: "procurement@industrialeq.com",
    phone: "+66 2-234-5679",
    estimatedValue: "$1,350,000",
    stage: "needs_analysis",
    priority: "High",
    services: {
      freightSea: true,
      crossBorder: true,
      customs: true,
      warehouse: true,
      transport: true,
    },
    tags: ["Hot Lead"],
  },
  {
    id: "LEAD-2024-013",
    name: "Organic Foods Wholesale",
    leadType: "existingCustomer",
    industry: "foodFmcg",
    supplyChainRole: "wholesalerRetailer",
    businessGroup: "b2b2c",
    email: "orders@organicfoods.com",
    phone: "+66 2-345-6780",
    estimatedValue: "$480,000",
    stage: "contact",
    priority: "Medium",
    services: {
      warehouse: true,
      transport: true,
      license: true,
    },
    tags: [],
  },
  {
    id: "LEAD-2024-014",
    name: "Electronics Megastore Chain",
    leadType: "coldCall",
    industry: "electronics",
    supplyChainRole: "wholesalerRetailer",
    businessGroup: "b2b2c",
    email: "logistics@megastore.com",
    phone: "+66 2-456-7891",
    estimatedValue: "$950,000",
    stage: "lead",
    priority: "Medium",
    services: {
      warehouse: true,
      transport: true,
      freightSea: true,
    },
    tags: [],
  },
  {
    id: "LEAD-2024-015",
    name: "Medical Devices International",
    leadType: "marketingGroup",
    industry: "healthcare",
    supplyChainRole: "importer",
    businessGroup: "healthcarePharma",
    email: "supply@medicaldevices.com",
    phone: "+66 2-567-8902",
    estimatedValue: "$1,800,000",
    stage: "proposal",
    priority: "High",
    services: {
      freightAir: true,
      customs: true,
      license: true,
      warehouse: true,
      other: true,
    },
    tags: ["KA", "VIP"],
  },
  {
    id: "LEAD-2024-016",
    name: "Renewable Energy Parts",
    leadType: "coldCall",
    industry: "energy",
    supplyChainRole: "distributor",
    businessGroup: "commodity",
    email: "contact@renewableparts.com",
    phone: "+66 2-678-9013",
    estimatedValue: "$670,000",
    stage: "lead",
    priority: "Low",
    services: {
      freightSea: true,
      crossBorder: true,
      warehouse: true,
    },
    tags: [],
  },
  {
    id: "LEAD-2024-017",
    name: "Premium Coffee Importers",
    leadType: "other",
    industry: "foodFmcg",
    supplyChainRole: "importer",
    businessGroup: "b2b2c",
    email: "trade@premiumcoffee.com",
    phone: "+66 2-789-0124",
    estimatedValue: "$380,000",
    stage: "contact",
    priority: "Medium",
    services: {
      freightSea: true,
      customs: true,
      license: true,
    },
    tags: [],
  },
  {
    id: "LEAD-2024-018",
    name: "Construction Materials Hub",
    leadType: "existingCustomer",
    industry: "construction",
    supplyChainRole: "distributor",
    businessGroup: "commodity",
    email: "sales@constructionhub.com",
    phone: "+66 2-890-1235",
    estimatedValue: "$1,100,000",
    stage: "needs_analysis",
    priority: "High",
    services: {
      warehouse: true,
      transport: true,
      freightSea: true,
      crossBorder: true,
    },
    tags: ["Hot Lead"],
  },
  {
    id: "LEAD-2024-019",
    name: "Textile Manufacturing Co",
    leadType: "management",
    industry: "fashion",
    supplyChainRole: "manufacturer",
    businessGroup: "commodity",
    email: "export@textileco.com",
    phone: "+66 2-901-2346",
    estimatedValue: "$820,000",
    stage: "contact",
    priority: "Medium",
    services: {
      warehouse: true,
      freightSea: true,
      customs: true,
      crossBorder: true,
    },
    tags: [],
  },
  {
    id: "LEAD-2024-020",
    name: "Unknown Industry Client",
    leadType: "coldCall",
    industry: "other",
    supplyChainRole: "distributor",
    businessGroup: "b2b2c",
    email: "info@unknownclient.com",
    phone: "+66 2-012-3457",
    estimatedValue: "$150,000",
    stage: "lead",
    priority: "Low",
    services: { other: true },
    tags: [],
  },
];

const availableTags = [
  {
    id: "ka",
    name: "KA",
    color: "text-purple-700 border-purple-300",
  },
  {
    id: "vip",
    name: "VIP",
    color: "text-yellow-700 border-yellow-300",
  },
  {
    id: "hot-lead",
    name: "Hot Lead",
    color: "text-red-700 border-red-300",
  },
  {
    id: "new",
    name: "New",
    color: "text-green-700 border-green-300",
  },
];

export function LeadListScreen({
  onLeadClick,
  shouldOpenAddDialog,
  setShouldOpenAddDialog,
}: LeadListScreenProps) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [filterStage, setFilterStage] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterIndustry, setFilterIndustry] = useState("all");
  const [isBulkImportDialogOpen, setIsBulkImportDialogOpen] =
    useState(false);
  const [isAddLeadDialogOpen, setIsAddLeadDialogOpen] =
    useState(false);

  useEffect(() => {
    if (shouldOpenAddDialog) {
      setIsAddLeadDialogOpen(true);
      if (setShouldOpenAddDialog) {
        setShouldOpenAddDialog(false);
      }
    }
  }, [shouldOpenAddDialog, setShouldOpenAddDialog]);

  const filteredLeads = useMemo(() => {
    return mockLeads.filter((lead) => {
      const matchesSearch =
        lead.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        lead.id
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        lead.email
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) =>
          lead.tags?.includes(tag.name),
        );

      const matchesStage =
        filterStage === "all" || lead.stage === filterStage;

      const matchesPriority =
        filterPriority === "all" ||
        lead.priority === filterPriority;

      const matchesIndustry =
        filterIndustry === "all" ||
        lead.industry === filterIndustry;

      return (
        matchesSearch &&
        matchesTags &&
        matchesStage &&
        matchesPriority &&
        matchesIndustry
      );
    });
  }, [
    searchTerm,
    selectedTags,
    filterStage,
    filterPriority,
    filterIndustry,
  ]);

  // Apply sorting
  const { sortedData, sortState, handleSort } =
    useTableSort(filteredLeads);

  const getIndustryBadge = (industry: string) => {
    const translationKey = industry.replace(/_([a-z])/g, (g) =>
      g[1].toUpperCase(),
    );

    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-normal text-gray-700  ">
        {t(`${translationKey}`)}
      </span>
    );
  };

  const getStageBadge = (stage: string) => {
    const stageMap: Record<
      string,
      { label: string; color: string }
    > = {
      lead: {
        label: t("deals.stages.lead"),
        color: " text-indigo-700 ",
      },
      contact: {
        label: t("deals.stages.contact"),
        color: " text-blue-700 ",
      },
      needs_analysis: {
        label: t("deals.stages.needs_analysis"),
        color: " text-amber-700 ",
      },
      proposal: {
        label: t("deals.stages.proposal"),
        color: "text-emerald-700 ",
      },
    };

    const config = stageMap[stage] || {
      label: stage,
      color: "bg-gray-50 text-gray-700 border-gray-200",
    };

    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs text-gray-700 font-normal `}
      >
        {config.label}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityMap: Record<
      string,
      { label: string; color: string }
    > = {
      High: {
        label: "High",
        color: "bg-red-50 text-red-700 border-red-200",
      },
      Medium: {
        label: "Medium",
        color: "bg-orange-50 text-orange-700 border-orange-200",
      },
      Low: {
        label: "Low",
        color: "bg-blue-50 text-blue-700 border-blue-200",
      },
    };

    const config = priorityMap[priority] || {
      label: priority,
      color: "bg-gray-50 text-gray-700 border-gray-200",
    };

    return (
      <span
        className={`inline-flex items-center px-2 py-0.5  text-xs font-medium `}
      >
        {config.label}
      </span>
    );
  };

  const getLeadTypeBadge = (leadType: string) => {
    const leadTypeMap: Record<
      string,
      { label: string; color: string }
    > = {
      coldCall: {
        label: "Cold Call",
        color: "bg-gray-50 text-gray-700 border-gray-200",
      },
      existingCustomer: {
        label: "Existing Customer",
        color: "bg-gray-50 text-gray-700 border-gray-200",
      },
      marketingGroup: {
        label: "Marketing Group",
        color: "bg-gray-50 text-gray-700 border-gray-200",
      },
      management: {
        label: "Management",
        color: "bg-gray-50 text-gray-700 border-gray-200",
      },
      other: {
        label: "Other",
        color: "bg-gray-50 text-gray-700 border-gray-200",
      },
    };

    const config = leadTypeMap[leadType] || {
      label: leadType,
      color: "bg-gray-50 text-gray-700 border-gray-200",
    };

    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium`}
      >
        {config.label}
      </span>
    );
  };

  const totalEstimatedValue = filteredLeads.reduce(
    (sum, lead) => {
      const value = parseFloat(
        lead.estimatedValue.replace(/[$,]/g, ""),
      );
      return sum + value;
    },
    0,
  );

  const handleExport = () => {
    toast.success("ส่งออกข้อมูลสำเร็จ");
  };

  return (
    <div className="p-2 sm:p-3 lg:p-4 bg-gray-50 min-h-screen">
      <div className="max-w-[1600px] mx-auto space-y-2 sm:space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-sm sm:text-base lg:text-xl font-semibold text-gray-900">
              {t("leads.all_leads")}
            </h1>
            <p className="text-[10px] sm:text-xs text-gray-500">
              {t("leads.subtitle")}
            </p>
          </div>
        </div>

        {/* Stats */}
        {filteredLeads.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            <div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-2.5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] font-medium text-gray-500 uppercase tracking-wide truncate">
                    Leads ทั้งหมด
                  </p>
                  <p className="text-base sm:text-lg font-bold text-gray-900 mt-0.5">
                    {filteredLeads.length}
                  </p>
                </div>
                <div className="h-7 w-7 sm:h-8 sm:w-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-2.5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] font-medium text-gray-500 uppercase tracking-wide truncate">
                    กำลังติดต่อ
                  </p>
                  <p className="text-base sm:text-lg font-bold text-gray-900 mt-0.5">
                    {
                      filteredLeads.filter(
                        (l) =>
                          l.stage === "contact" ||
                          l.stage === "needs_analysis",
                      ).length
                    }
                  </p>
                </div>
                <div className="h-7 w-7 sm:h-8 sm:w-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-2.5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] font-medium text-gray-500 uppercase tracking-wide truncate">
                    มูลค่าโอกาส
                  </p>
                  <p className="text-base sm:text-lg font-bold text-gray-900 mt-0.5">
                    $
                    {(totalEstimatedValue / 1000000).toFixed(2)}
                    M
                  </p>
                </div>
                <div className="h-7 w-7 sm:h-8 sm:w-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <DollarSign className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search with Tag Filter */}
        <div className="flex justify-between flex-col  sm:flex-row sm:flex-col-3 items-stretch sm:items-center gap-1.5">
          <div className="flex-1 sm:max-w-sm">
            <TagSearchBar
              value={searchTerm}
              onValueChange={setSearchTerm}
              selectedTags={selectedTags}
              onTagsChange={setSelectedTags}
              availableTags={availableTags}
              placeholder="ค้นหา Lead... (พิมพ์ KA, VIP เพื่อกรองตาม tag)"
            />
          </div>
          <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap">
            {/* Industry */}
            <Select
              value={filterIndustry}
              onValueChange={setFilterIndustry}
            >
              <SelectTrigger className="h-10 w-29 text-xs border-gray-300 bg-white gap-1.5 rounded-lg px-3">
                <span className="truncate">อุตสาหกรรม</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทั้งหมด</SelectItem>
                {INDUSTRIES.map((industry) => (
                  <SelectItem
                    key={industry.value}
                    value={industry.value}
                  >
                    {t(industry.labelKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Stage */}
            <Select
              value={filterStage}
              onValueChange={setFilterStage}
            >
              <SelectTrigger className="h-10 w-23 px-3 text-xs border-gray-300 bg-white gap-1.5 rounded-lg">
                <span className="truncate">สถานะ</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทั้งหมด</SelectItem>
                <SelectItem value="lead">
                  {t("deals.stages.lead")}
                </SelectItem>
                <SelectItem value="contact">
                  {t("deals.stages.contact")}
                </SelectItem>
                <SelectItem value="needs_analysis">
                  {t("deals.stages.needs_analysis")}
                </SelectItem>
                <SelectItem value="proposal">
                  {t("deals.stages.proposal")}
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Priority */}
            <Select
              value={filterPriority}
              onValueChange={setFilterPriority}
            >
              <SelectTrigger className="h-10 w-[110px] px-3 text-xs border-gray-300 bg-white gap-1.5 rounded-lg">
                <span className="truncate">ความสำคัญ</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทั้งหมด</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>

            {/* Export */}
            <Button
              variant="outline"
              size="sm"
              className="h-10 px-3 text-xs border-gray-300 bg-white hover:bg-gray-50 gap-1.5 rounded-lg"
              onClick={handleExport}
            >
              <Download className="h-4 w-4 text-gray-600" />
              <span>ส่งออก</span>
            </Button>

            {/* Add Lead */}
            <Button
              size="sm"
              className="h-10 px-4 bg-green-600 hover:bg-green-700 text-white shadow-sm text-sm font-medium rounded-full"
              onClick={() => setIsAddLeadDialogOpen(true)}
            >
              <Plus className="h-4 w-4 mr-1.5" />
              เพิ่ม Lead
            </Button>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hidden lg:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th
                    className=" text-left px-4 py-3.5 text-[13px] font-semibold text-gray-600 uppercase tracking-wide bg-gray-50/50"
                    rowSpan={2}
                  >
                    ชื่อ Lead
                  </th>
                  <th
                    className="text-left px-4 py-3.5 text-[13px] font-semibold text-gray-600 uppercase tracking-wide bg-gray-50/50"
                    rowSpan={2}
                  >
                    ผู้ติดต่อ
                  </th>
                  <th
                    className="text-left px-4 py-3.5 text-[13px] font-semibold text-gray-600 uppercase tracking-wide bg-gray-50/50"
                    rowSpan={2}
                  >
                    อุตสาหกรรม
                  </th>
                  <th
                    className="text-left px-4 py-3.5 text-[13px] font-semibold text-gray-600 uppercase tracking-wide bg-gray-50/50"
                    rowSpan={2}
                  >
                    สถานะ
                  </th>
                  <th
                    className="text-center px-4 py-3.5 text-[13px] font-semibold text-gray-600 uppercase tracking-wide bg-gray-50/50"
                    colSpan={8}
                  >
                    บริการที่สนใจ
                  </th>
                </tr>
                <tr className="border-b border-gray-200">
                  <th className="text-center px-4 py-2.5 text-[10px] font-medium text-gray-600 bg-gray-50/50 border-l border-r border-gray-200 min-w-[80px]">
                    Freight
                  </th>
                  <th className="text-center px-4 py-2.5 text-[10px] font-medium text-gray-600 bg-gray-50/50 border-r border-gray-200 min-w-[80px]">
                    Customs
                  </th>
                  <th className="text-center px-4 py-2.5 text-[10px] font-medium text-gray-600 bg-gray-50/50 border-r border-gray-200 min-w-[90px]">
                    Warehouse
                  </th>
                  <th className="text-center px-4 py-2.5 text-[10px] font-medium text-gray-600 bg-gray-50/50 border-r border-gray-200 min-w-[85px]">
                    Transport
                  </th>
                  <th className="text-center px-4 py-2.5 text-[10px] font-medium text-gray-600 bg-gray-50/50 border-r border-gray-200 min-w-[95px]">
                    Crossborder
                  </th>
                  <th className="text-center px-4 py-2.5 text-[10px] font-medium text-gray-600 bg-gray-50/50 border-r border-gray-200 min-w-[75px]">
                    Trading
                  </th>
                  <th className="text-center px-4 py-2.5 text-[10px] font-medium text-gray-600 bg-gray-50/50 border-r border-gray-200 min-w-[75px]">
                    Service
                  </th>
                  <th className="text-center px-4 py-2.5 text-[10px] font-medium text-gray-600 bg-gray-50/50 border-r border-gray-200 min-w-[70px]">
                    Other
                  </th>
                  <th className="text-center px-4 py-2.5 text-[10px] font-medium text-gray-600 bg-gray-50/50 border-r border-gray-200 min-w-[80px]">
                    Unknown
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedData.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer group"
                    onClick={() => onLeadClick(lead.id)}
                  >
                    <td className="px-2 py-3 w-20">
                      <div>
                        <p className="font-normal text-gray-900 text-xs">
                          {lead.name}
                        </p>
                        {lead.tags && lead.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {lead.tags.map((tag) => {
                              const tagConfig =
                                availableTags.find(
                                  (t) => t.name === tag,
                                );
                              return tagConfig ? (
                                <span
                                  key={tag}
                                  className={`flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border ${tagConfig.color}`}
                                >
                                  #{tag}
                                </span>
                              ) : null;
                            })}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 text-xs text-gray-700">
                          <span className="gray max-w-[200px]">
                            {lead.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {getIndustryBadge(lead.industry)}
                    </td>
                    <td className="px-4 py-3">
                      {getStageBadge(lead.stage)}
                    </td>

                    {/* Services Columns */}
                    <td className="px-3 py-3 text-center border-l border-r border-gray-200 bg-gray-50/30">
                      {lead.services.warehouse && (
                        <span className="text-[#10b981] text-xs">
                          ✓
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-3 text-center border-r border-gray-200 bg-gray-50/30">
                      {lead.services.transport && (
                        <span className="text-[#10b981] text-xs">
                          ✓
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-3 text-center border-r border-gray-200 bg-gray-50/30">
                      {lead.services.freightAir && (
                        <span className="text-[#10b981] text-xs">
                          ✓
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-3 text-center border-r border-gray-200 bg-gray-50/30">
                      {lead.services.freightSea && (
                        <span className="text-[#10b981] text-xs">
                          ✓
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-3 text-center border-r border-gray-200 bg-gray-50/30">
                      {lead.services.crossBorder && (
                        <span className="text-[#10b981] text-xs">
                          ✓
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-3 text-center border-r border-gray-200 bg-gray-50/30">
                      {lead.services.customs && (
                        <span className="text-[#10b981] text-xs">
                          ✓
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-3 text-center border-r border-gray-200 bg-gray-50/30">
                      {lead.services.license && (
                        <span className="text-[#10b981] text-xs">
                          ✓
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-3 text-center border-r border-gray-200 bg-gray-50/30">
                      {lead.services.other && (
                        <span className="text-[#10b981] text-xs">
                          ✓
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-3 text-center border-r border-gray-200 bg-gray-50/30">
                      {lead.services.unknown && (
                        <span className="text-[#10b981] text-xs">
                          ✓
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3 text-right"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-3">
          {sortedData.map((lead) => (
            <div
              key={lead.id}
              className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onLeadClick(lead.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {lead.name}
                  </h3>
                  {lead.tags && lead.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {lead.tags.map((tag) => {
                        const tagConfig = availableTags.find(
                          (t) => t.name === tag,
                        );
                        return tagConfig ? (
                          <span
                            key={tag}
                            className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border ${tagConfig.color}`}
                          >
                            {tag}
                          </span>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>
                {getPriorityBadge(lead.priority)}
              </div>

              <div className="space-y-1.5 mb-3">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Mail className="h-3 w-3 text-gray-400 flex-shrink-0" />
                  <span className="truncate">{lead.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Phone className="h-3 w-3 text-gray-400 flex-shrink-0" />
                  <span>{lead.phone}</span>
                </div>
              </div>

              {/* Services Grid */}
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-1.5">
                  บริการที่สนใจ:
                </p>
                <div className="grid grid-cols-3 gap-1.5">
                  {lead.services.warehouse && (
                    <div className="flex items-center gap-1 text-[10px] text-blue-700 bg-blue-50 px-2 py-1 rounded border border-blue-200">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Warehouse</span>
                    </div>
                  )}
                  {lead.services.transport && (
                    <div className="flex items-center gap-1 text-[10px] text-purple-700 bg-purple-50 px-2 py-1 rounded border border-purple-200">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Transport</span>
                    </div>
                  )}
                  {lead.services.freightAir && (
                    <div className="flex items-center gap-1 text-[10px] text-sky-700 bg-sky-50 px-2 py-1 rounded border border-sky-200">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Freight Air</span>
                    </div>
                  )}
                  {lead.services.freightSea && (
                    <div className="flex items-center gap-1 text-[10px] text-cyan-700 bg-cyan-50 px-2 py-1 rounded border border-cyan-200">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Freight Sea</span>
                    </div>
                  )}
                  {lead.services.crossBorder && (
                    <div className="flex items-center gap-1 text-[10px] text-amber-700 bg-amber-50 px-2 py-1 rounded border border-amber-200">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Cross-Border</span>
                    </div>
                  )}
                  {lead.services.customs && (
                    <div className="flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Customs</span>
                    </div>
                  )}
                  {lead.services.license && (
                    <div className="flex items-center gap-1 text-[10px] text-green-700 bg-green-50 px-2 py-1 rounded border border-green-200">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>License</span>
                    </div>
                  )}
                  {lead.services.other && (
                    <div className="flex items-center gap-1 text-[10px] text-gray-700 bg-gray-50 px-2 py-1 rounded border border-gray-200">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Other</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {getStageBadge(lead.stage)}
                {getIndustryBadge(lead.industry)}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-xs font-medium text-gray-900">
                  {lead.estimatedValue}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-7 px-2 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    onLeadClick(lead.id);
                  }}
                >
                  ดูรายละเอียด
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Lead Dialog */}
      {setShouldOpenAddDialog && (
        <AddLeadDialog
          isOpen={shouldOpenAddDialog}
          onClose={() => setShouldOpenAddDialog(false)}
          onSave={(data) => {
            console.log("New lead data:", data);
            setShouldOpenAddDialog(false);
          }}
        />
      )}

      {/* Add Lead Dialog */}
      <AddLeadDialog
        isOpen={isAddLeadDialogOpen}
        onClose={() => setIsAddLeadDialogOpen(false)}
        onSave={(data) => {
          console.log("New lead data:", data);
          setIsAddLeadDialogOpen(false);
        }}
      />

      {/* Bulk Import Dialog */}
      <BulkImportDialog
        open={isBulkImportDialogOpen}
        onClose={() => setIsBulkImportDialogOpen(false)}
        onImport={(data) => {
          console.log("Imported lead data:", data);
          toast.success(
            `นำเข้าข้อมูล Lead ${data.length} รายการสำเร็จ`,
          );
        }}
        mode="lead"
      />
    </div>
  );
}