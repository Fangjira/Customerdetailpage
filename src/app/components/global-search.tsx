import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import {
  Search,
  FileText,
  Users,
  DollarSign,
  FileSignature,
  Building2,
  Calendar,
  Clock,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface SearchResult {
  id: string;
  type: "deal" | "customer" | "quotation" | "contract" | "approval" | "task";
  title: string;
  subtitle: string;
  metadata?: string;
  badge?: string;
  value?: string;
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (type: string, id: string) => void;
}

export function GlobalSearch({ isOpen, onClose, onNavigate }: GlobalSearchProps) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "Global Freight Solutions",
    "Contract APR-2024-1205",
    "Sarah Chen",
  ]);

  // Mock data for search
  const allData: SearchResult[] = [
    // Deals
    {
      id: "D-2024-089",
      type: "deal",
      title: "International Shipping Contract",
      subtitle: "Global Freight Solutions Inc.",
      metadata: "Negotiation",
      value: "$2,450,000",
      badge: "Active",
    },
    {
      id: "D-2024-075",
      type: "deal",
      title: "Sea Freight Services",
      subtitle: "Pacific Trade Corp",
      metadata: "Closed Won",
      value: "$3,200,000",
      badge: "Won",
    },
    // Customers
    {
      id: "C-1001",
      type: "customer",
      title: "Global Freight Solutions Inc.",
      subtitle: "Premium Tier • Air Freight",
      metadata: "15 Active Deals",
    },
    {
      id: "C-1002",
      type: "customer",
      title: "Pacific Trade Corp",
      subtitle: "Standard Tier • Sea Freight",
      metadata: "8 Active Deals",
    },
    {
      id: "C-1003",
      type: "customer",
      title: "Asian Logistics Network",
      subtitle: "Premium Tier • Multi-Modal",
      metadata: "12 Active Deals",
    },
    // Quotations
    {
      id: "Q-2024-156",
      type: "quotation",
      title: "Warehousing Services Quote",
      subtitle: "Pacific Trade Corp",
      metadata: "Pending",
      value: "$185,000",
    },
    {
      id: "Q-2024-142",
      type: "quotation",
      title: "Air Freight Services",
      subtitle: "Australian Mining Co",
      metadata: "Approved",
      value: "$1,250,000",
    },
    // Contracts
    {
      id: "CON-2024-078",
      type: "contract",
      title: "Annual Freight Agreement",
      subtitle: "Global Freight Solutions Inc.",
      metadata: "Active",
      value: "$12M",
    },
    {
      id: "CON-2024-065",
      type: "contract",
      title: "Sea Freight Contract",
      subtitle: "Asian Logistics Network",
      metadata: "Active",
      value: "$8.5M",
    },
    // Approvals
    {
      id: "APR-2024-1205",
      type: "approval",
      title: "International Freight Agreement",
      subtitle: "Global Freight Solutions Inc.",
      metadata: "Finance Review",
      badge: "Pending",
    },
    {
      id: "APR-2024-1198",
      type: "approval",
      title: "Warehousing Services",
      subtitle: "Pacific Trade Corp",
      metadata: "Final Approval",
      badge: "Pending",
    },
    // Tasks
    {
      id: "T-2024-345",
      type: "task",
      title: "Follow up with Global Freight Solutions",
      subtitle: "Due: Today, 4:00 PM",
      metadata: "High Priority",
      badge: "Urgent",
    },
  ];

  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = allData.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  const getIcon = (type: string) => {
    switch (type) {
      case "deal":
        return <DollarSign className="h-4 w-4 text-[#10b981]" />;
      case "customer":
        return <Building2 className="h-4 w-4 text-[#705add]" />;
      case "quotation":
        return <FileText className="h-4 w-4 text-[#3b82f6]" />;
      case "contract":
        return <FileSignature className="h-4 w-4 text-[#8b5cf6]" />;
      case "approval":
        return <FileText className="h-4 w-4 text-[#f59e0b]" />;
      case "task":
        return <Calendar className="h-4 w-4 text-[#ef4444]" />;
      default:
        return <FileText className="h-4 w-4 text-[#6b7280]" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "deal":
        return t("search.deal");
      case "customer":
        return t("search.customer");
      case "quotation":
        return t("search.quotation");
      case "contract":
        return t("search.contract");
      case "approval":
        return t("search.approval");
      case "task":
        return t("search.task");
      default:
        return type;
    }
  };

  const handleResultClick = (result: SearchResult) => {
    // Add to recent searches
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s !== result.title);
      return [result.title, ...filtered].slice(0, 5);
    });

    onNavigate?.(result.type, result.id);
    onClose();
  };

  const handleRecentSearchClick = (search: string) => {
    setSearchTerm(search);
  };

  // Group results by type
  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.type]) {
      acc[result.type] = [];
    }
    acc[result.type].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 gap-0 bg-white border-2 border-[#ede9fe]">
        <DialogTitle className="sr-only">
          {t("search.placeholder")}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {t("search.placeholder")}
        </DialogDescription>
        <div className="border-b border-[#ede9fe] p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#a78bfa]" />
            <Input
              placeholder={t("search.placeholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 h-12 border-2 border-[#ede9fe] rounded-xl bg-white focus:border-[#705add] text-base"
              autoFocus
            />
          </div>
        </div>

        <ScrollArea className="max-h-[500px]">
          {!searchTerm && recentSearches.length > 0 && (
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-4 w-4 text-[#9333ea]" />
                <p className="text-sm font-medium text-[#4c1d95]">
                  {t("search.recent_searches")}
                </p>
              </div>
              <div className="space-y-1">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearchClick(search)}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#f5f3ff] text-sm text-[#705add] transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {searchTerm && results.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <Search className="h-12 w-12 text-[#d1d5db] mb-3" />
              <p className="text-sm text-[#9333ea] mb-1">
                {t("search.no_results")}
              </p>
              <p className="text-xs text-[#a78bfa]">
                {t("search.try_different")}
              </p>
            </div>
          )}

          {searchTerm && results.length > 0 && (
            <div className="p-2">
              {Object.entries(groupedResults).map(([type, items]) => (
                <div key={type} className="mb-4">
                  <div className="px-3 py-2 flex items-center gap-2">
                    <p className="text-xs font-semibold text-[#9333ea] uppercase tracking-wide">
                      {getTypeLabel(type)} ({items.length})
                    </p>
                  </div>
                  <div className="space-y-1">
                    {items.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => handleResultClick(result)}
                        className="w-full text-left p-3 rounded-xl hover:bg-[#f5f3ff] transition-colors group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 bg-white border-2 border-[#ede9fe] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:border-[#705add] transition-colors">
                            {getIcon(result.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-[#4c1d95] text-sm truncate">
                                  {result.title}
                                </p>
                                <p className="text-xs text-[#9333ea] truncate">
                                  {result.subtitle}
                                </p>
                              </div>
                              <ArrowRight className="h-4 w-4 text-[#a78bfa] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-[#a78bfa]">
                                {result.id}
                              </span>
                              {result.metadata && (
                                <>
                                  <span className="text-[#d1d5db]">•</span>
                                  <span className="text-xs text-[#a78bfa]">
                                    {result.metadata}
                                  </span>
                                </>
                              )}
                              {result.value && (
                                <>
                                  <span className="text-[#d1d5db]">•</span>
                                  <span className="text-xs font-semibold text-[#705add]">
                                    {result.value}
                                  </span>
                                </>
                              )}
                              {result.badge && (
                                <Badge className="h-5 px-2 text-xs bg-[#fef3c7] text-[#92400e] border-[#fcd34d]">
                                  {result.badge}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {searchTerm && results.length > 0 && (
          <div className="border-t border-[#ede9fe] p-3 bg-[#faf8ff]">
            <p className="text-xs text-[#9333ea] text-center">
              {t("search.showing_results", { count: results.length })}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}