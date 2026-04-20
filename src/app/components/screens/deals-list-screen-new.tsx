import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Search,
  Download,
  Plus,
  ChevronRight,
  FileText,
  Calendar,
  Target,
  TrendingUp,
  Users,
  X,
  Sparkles,
  Zap,
  Tag,
  Layers,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface Deal {
  id: string;
  name: string;
  commodityTypes: string[];
  services: string[];
  projectStatus: string;
  progress: number;
  probabilityOfDeal: string;
}

interface DealsListScreenProps {
  onDealClick: (dealId: string) => void;
}

export function DealsListScreen({ onDealClick }: DealsListScreenProps) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterService, setFilterService] = useState("all");
  const [filterProjectStatus, setFilterProjectStatus] = useState("all");

  // Mock deals data
  const deals: Deal[] = [
    {
      id: "DL-2024-001",
      name: "International Freight Contract",
      commodityTypes: ["Automotive Parts", "Vehicles"],
      services: ["Freight Forwarding"],
      projectStatus: "Negotiating Process",
      progress: 70,
      probabilityOfDeal: "High",
    },
    {
      id: "DL-2024-002",
      name: "Warehouse",
      commodityTypes: ["Packaged Food", "Beverages"],
      services: ["Warehousing - General"],
      projectStatus: "Quotation",
      progress: 50,
      probabilityOfDeal: "Medium",
    },
    {
      id: "DL-2024-003",
      name: "Customs & Compliance Package",
      commodityTypes: ["Pharmaceuticals", "Medical Devices"],
      services: ["Customs Clearance"],
      projectStatus: "Win",
      progress: 100,
      probabilityOfDeal: "High",
    },
    {
      id: "DL-2024-004",
      name: "Last Mile",
      commodityTypes: ["Consumer Electronics", "Home Appliances"],
      services: ["Land Transport - General"],
      projectStatus: "Approach",
      progress: 10,
      probabilityOfDeal: "Low",
    },
  ];

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Win":
        return "bg-green-100 text-green-700";
      case "Negotiating Process":
        return "bg-purple-100 text-purple-700";
      case "Quotation":
        return "bg-blue-100 text-blue-700";
      case "Approach":
        return "bg-blue-100 text-blue-700";
      case "Lose":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Calculate stats
  const stats = {
    total: deals.length,
    win: deals.filter((d) => d.projectStatus === "Win").length,
    negotiating: deals.filter((d) => d.projectStatus === "Negotiating Process")
      .length,
    quotation: deals.filter((d) => d.projectStatus === "Quotation").length,
    lose: deals.filter((d) => d.projectStatus === "Lose").length,
    highProbability: deals.filter((d) => d.probabilityOfDeal === "High")
      .length,
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          placeholder={t("placeholders.search_deals")}
          className="pl-12 pr-4 h-11 border rounded-lg bg-white shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filters and Stats Row */}
      <div className="flex items-center gap-3">
        {/* Filters */}
        <Select value={filterService} onValueChange={setFilterService}>
          <SelectTrigger className="w-[180px] h-9 bg-white shadow-sm text-sm">
            <SelectValue placeholder={t("common.all")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                <span>{t("common.all")}</span>
              </div>
            </SelectItem>
            <SelectItem value="Freight Forwarding">
              Freight Forwarding
            </SelectItem>
            <SelectItem value="Warehousing">Warehousing</SelectItem>
            <SelectItem value="Customs Clearance">Customs Clearance</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filterProjectStatus}
          onValueChange={setFilterProjectStatus}
        >
          <SelectTrigger className="w-[180px] h-9 bg-white shadow-sm text-sm">
            <SelectValue placeholder={t("common.all")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                <span>{t("common.all")}</span>
              </div>
            </SelectItem>
            <SelectItem value="Approach">Approach</SelectItem>
            <SelectItem value="Quotation">Quotation</SelectItem>
            <SelectItem value="Negotiating Process">
              Negotiating Process
            </SelectItem>
            <SelectItem value="Win">Win</SelectItem>
            <SelectItem value="Lose">Lose</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" className="h-9 px-4 bg-white shadow-sm text-sm">
          <Download className="mr-2 h-4 w-4" />
          {t("common.export")}
        </Button>

        {/* Stats Badges */}
        <div className="flex-1"></div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-full">
            <div className="h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center">
              <Target className="h-2.5 w-2.5 text-white" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-[9px] font-semibold text-blue-600 uppercase tracking-wider">
                Total
              </span>
              <span className="text-base font-bold text-gray-900">
                {stats.total}
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 rounded-full">
            <div className="h-5 w-5 bg-green-500 rounded-full flex items-center justify-center">
              <TrendingUp className="h-2.5 w-2.5 text-white" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-[9px] font-semibold text-green-600 uppercase tracking-wider">
                Win
              </span>
              <span className="text-base font-bold text-gray-900">
                {stats.win}
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 rounded-full">
            <div className="h-5 w-5 bg-purple-500 rounded-full flex items-center justify-center">
              <Users className="h-2.5 w-2.5 text-white" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-[9px] font-semibold text-purple-600 uppercase tracking-wider">
                Negotiating
              </span>
              <span className="text-base font-bold text-gray-900">
                {stats.negotiating}
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-full">
            <div className="h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center">
              <FileText className="h-2.5 w-2.5 text-white" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-[9px] font-semibold text-blue-600 uppercase tracking-wider">
                Quotation
              </span>
              <span className="text-base font-bold text-gray-900">
                {stats.quotation}
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 rounded-full">
            <div className="h-5 w-5 bg-red-500 rounded-full flex items-center justify-center">
              <X className="h-2.5 w-2.5 text-white" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-[9px] font-semibold text-red-600 uppercase tracking-wider">
                Lose
              </span>
              <span className="text-base font-bold text-gray-900">
                {stats.lose}
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 rounded-full">
            <div className="h-5 w-5 bg-orange-500 rounded-full flex items-center justify-center">
              <Sparkles className="h-2.5 w-2.5 text-white" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-[9px] font-semibold text-orange-600 uppercase tracking-wider">
                High Prob.
              </span>
              <span className="text-base font-bold text-gray-900">
                {stats.highProbability}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-[1fr_320px] gap-4">
        {/* Left: Deals List */}
        <div className="space-y-3">
          {deals.map((deal) => (
            <Card
              key={deal.id}
              className="hover:shadow-md transition-all duration-200 cursor-pointer border hover:border-blue-300 bg-white"
              onClick={() => onDealClick(deal.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  {/* Left: Deal ID, Status & Name */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-blue-600">
                        {deal.id}
                      </span>
                      <Badge
                        variant="secondary"
                        className={`${getStageColor(
                          deal.projectStatus
                        )} text-[10px] px-2 py-0.5 font-semibold`}
                      >
                        {deal.projectStatus}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm">
                      {deal.name}
                    </h3>
                  </div>

                  {/* Middle: Commodities & Services */}
                  <div className="flex items-center gap-6">
                    {/* Commodities */}
                    <div className="w-40">
                      <div className="flex items-center gap-1 mb-1.5">
                        <Tag className="h-3 w-3 text-gray-400" />
                        <span className="text-[10px] text-gray-500">
                          Commodities
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {deal.commodityTypes.slice(0, 1).map((type, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-blue-50 text-blue-700 text-[10px] px-2 py-0.5"
                          >
                            {type}
                          </Badge>
                        ))}
                        {deal.commodityTypes.length > 1 && (
                          <Badge
                            variant="secondary"
                            className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5"
                          >
                            +{deal.commodityTypes.length - 1}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Services */}
                    <div className="w-44">
                      <div className="flex items-center gap-1 mb-1.5">
                        <Layers className="h-3 w-3 text-gray-400" />
                        <span className="text-[10px] text-gray-500">
                          Services
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {deal.services.slice(0, 1).map((service, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-purple-50 text-purple-700 text-[10px] px-2 py-0.5"
                          >
                            {service}
                          </Badge>
                        ))}
                        {deal.services.length > 1 && (
                          <Badge
                            variant="secondary"
                            className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5"
                          >
                            +{deal.services.length - 1}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Progress & Probability */}
                  <div className="flex items-center gap-4">
                    {/* Progress */}
                    <div className="w-32">
                      <div className="flex items-center gap-1 mb-1.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                        <span className="text-[10px] text-gray-500">
                          Progress
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full transition-all ${
                              deal.progress === 100 &&
                              deal.projectStatus === "Win"
                                ? "bg-green-600"
                                : deal.progress === 100 &&
                                  deal.projectStatus === "Lose"
                                ? "bg-red-600"
                                : "bg-blue-600"
                            }`}
                            style={{ width: `${deal.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-gray-900 min-w-[32px]">
                          {deal.progress}%
                        </span>
                      </div>
                    </div>

                    {/* Probability */}
                    <div className="w-20">
                      <div className="flex items-center gap-1 mb-1.5">
                        <Sparkles className="h-3 w-3 text-gray-400" />
                        <span className="text-[10px] text-gray-500">Prob.</span>
                      </div>
                      <Badge
                        variant="secondary"
                        className={`${
                          deal.probabilityOfDeal === "High"
                            ? "bg-green-100 text-green-700"
                            : deal.probabilityOfDeal === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        } text-[10px] font-semibold px-2 py-0.5`}
                      >
                        {deal.probabilityOfDeal}
                      </Badge>
                    </div>

                    {/* Arrow */}
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Right: Quick Actions */}
        <div className="sticky top-6">
          <Card className="border border-gray-200 shadow-sm bg-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-4 w-4 text-blue-600" />
                <h3 className="text-sm font-bold text-gray-900">
                  Quick Actions
                </h3>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                Perform common deal tasks
              </p>

              <div className="space-y-2">
                <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 h-10 text-sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Quotation
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start h-10 text-sm border-gray-200 hover:bg-gray-50"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Proposal
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start h-10 text-sm border-gray-200 hover:bg-gray-50"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Meeting
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}