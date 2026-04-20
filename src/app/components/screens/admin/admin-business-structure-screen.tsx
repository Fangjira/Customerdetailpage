import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Building2,
  Plus,
  Edit,
  Trash2,
  ChevronRight,
  ChevronDown,
  Layers,
  Package,
  Search,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Badge } from "../../ui/badge";
import { useRoleTheme } from "../../../hooks/use-role-theme";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../ui/alert-dialog";

interface ProductGroup {
  id: string;
  name: string;
  isActive: boolean;
}

interface SubBusinessGroup {
  id: string;
  name: string;
  productGroups: ProductGroup[];
  isActive: boolean;
}

interface BusinessGroup {
  id: string;
  name: string;
  subBusinessGroups: SubBusinessGroup[];
  isActive: boolean;
}

export function AdminBusinessStructureScreen() {
  const { t } = useTranslation();
  const roleTheme = useRoleTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedBusinessGroups, setExpandedBusinessGroups] = useState<Set<string>>(
    new Set()
  );
  const [expandedSubBusinessGroups, setExpandedSubBusinessGroups] = useState<
    Set<string>
  >(new Set());

  const [businessGroups, setBusinessGroups] = useState<BusinessGroup[]>([
    {
      id: "1",
      name: "ASEAN Island Country and Taiwan Business",
      isActive: true,
      subBusinessGroups: [
        {
          id: "1-1",
          name: "ASEAN Island Country and Taiwan Business",
          isActive: true,
          productGroups: [
            {
              id: "1-1-1",
              name: "Project Management (ASEAN Island Country & Taiwan)",
              isActive: true,
            },
          ],
        },
      ],
    },
    {
      id: "2",
      name: "Automotive Business",
      isActive: true,
      subBusinessGroups: [
        {
          id: "2-1",
          name: "Automotive & Aftersales Service Business",
          isActive: true,
          productGroups: [
            {
              id: "2-1-1",
              name: "Automotive & Aftersales Service Business",
              isActive: true,
            },
          ],
        },
      ],
    },
    {
      id: "3",
      name: "B2B2C",
      isActive: true,
      subBusinessGroups: [
        {
          id: "3-1",
          name: "Agriculture",
          isActive: true,
          productGroups: [
            { id: "3-1-1", name: "FTL Business", isActive: true },
            { id: "3-1-2", name: "Bulk Business", isActive: true },
          ],
        },
        {
          id: "3-2",
          name: "B2b Business",
          isActive: true,
          productGroups: [
            { id: "3-2-1", name: "Service Agent", isActive: true },
            { id: "3-2-2", name: "Business Customers", isActive: true },
          ],
        },
        {
          id: "3-3",
          name: "Backbone Operation",
          isActive: true,
          productGroups: [
            { id: "3-3-1", name: "Backbone Operation", isActive: true },
          ],
        },
        {
          id: "3-4",
          name: "Drop off Business",
          isActive: true,
          productGroups: [
            { id: "3-4-1", name: "Drop off Business", isActive: true },
          ],
        },
        {
          id: "3-5",
          name: "E&E and e-Commerce Business",
          isActive: true,
          productGroups: [
            { id: "3-5-1", name: "E&E and Home Products Business", isActive: true },
            { id: "3-5-2", name: "Fulfillment Business", isActive: true },
          ],
        },
        {
          id: "3-6",
          name: "Food & FMCG Business",
          isActive: true,
          productGroups: [
            { id: "3-6-1", name: "Food & FMCG Business", isActive: true },
            { id: "3-6-2", name: "Food HORECA Business", isActive: true },
            { id: "3-6-3", name: "FMCG Business", isActive: true },
            { id: "3-6-4", name: "Food Manufacturer Business", isActive: true },
          ],
        },
        {
          id: "3-7",
          name: "Home Living & White Glove",
          isActive: true,
          productGroups: [
            { id: "3-7-1", name: "Home Decorative Business", isActive: true },
            { id: "3-7-2", name: "Furniture Business", isActive: true },
          ],
        },
      ],
    },
    {
      id: "4",
      name: "CLMV & China Business",
      isActive: true,
      subBusinessGroups: [
        {
          id: "4-1",
          name: "CLMV & China Business",
          isActive: true,
          productGroups: [
            { id: "4-1-1", name: "Operation (CLMV & China)", isActive: true },
          ],
        },
      ],
    },
    {
      id: "5",
      name: "Commodity Business",
      isActive: true,
      subBusinessGroups: [
        {
          id: "5-1",
          name: "Cement Construction & Energy",
          isActive: true,
          productGroups: [
            { id: "5-1-1", name: "SCG-Bulk Domestics", isActive: true },
            { id: "5-1-2", name: "KCL", isActive: true },
            { id: "5-1-3", name: "SCG-Cement Export", isActive: true },
            { id: "5-1-4", name: "EXW by SJ", isActive: true },
            { id: "5-1-5", name: "SCG-Bag Domestics", isActive: true },
            { id: "5-1-6", name: "Construction", isActive: true },
            { id: "5-1-7", name: "Bidding", isActive: true },
            { id: "5-1-8", name: "New Segment", isActive: true },
            { id: "5-1-9", name: "Renewable", isActive: true },
            { id: "5-1-10", name: "Trader", isActive: true },
            { id: "5-1-11", name: "NSCG Cement Export", isActive: true },
            { id: "5-1-12", name: "NSCG Energy and Raw Mat.", isActive: true },
            { id: "5-1-13", name: "SCG-Energy and Raw Mat.", isActive: true },
            { id: "5-1-14", name: "Bulk Cement", isActive: true },
            { id: "5-1-15", name: "Bag Cement", isActive: true },
            { id: "5-1-16", name: "Cement Export & Cross-border", isActive: true },
            { id: "5-1-17", name: "Energy & Raw Materials", isActive: true },
            { id: "5-1-18", name: "OutsideSCG-Cement&Energy", isActive: true },
            { id: "5-1-19", name: "Wat Bun Dai", isActive: true },
          ],
        },
        {
          id: "5-2",
          name: "Chemicals",
          isActive: true,
          productGroups: [
            { id: "5-2-1", name: "Specialty Solution", isActive: true },
            { id: "5-2-2", name: "Polymers & Plastics", isActive: true },
          ],
        },
        {
          id: "5-3",
          name: "Circular Economy Business",
          isActive: true,
          productGroups: [
            { id: "5-3-1", name: "Business Value Chain", isActive: true },
            { id: "5-3-2", name: "Circularity Solution", isActive: true },
          ],
        },
        {
          id: "5-4",
          name: "JV (Jumbo Barges and Tugs)",
          isActive: true,
          productGroups: [
            { id: "5-4-1", name: "JV (Jumbo Barges and Tugs)", isActive: true },
          ],
        },
        {
          id: "5-5",
          name: "Packaging",
          isActive: true,
          productGroups: [
            { id: "5-5-1", name: "Fibrous Chain", isActive: true },
            { id: "5-5-2", name: "Warehouse Service", isActive: true },
            { id: "5-5-3", name: "Paper Container", isActive: true },
            { id: "5-5-4", name: "Import-Export", isActive: true },
            { id: "5-5-5", name: "Domestic Transport", isActive: true },
          ],
        },
        {
          id: "5-6",
          name: "Sourcing Business",
          isActive: true,
          productGroups: [
            { id: "5-6-1", name: "Sourcing Business", isActive: true },
          ],
        },
        {
          id: "5-7",
          name: "Steel & Building Materials",
          isActive: true,
          productGroups: [
            { id: "5-7-1", name: "Building Material", isActive: true },
            { id: "5-7-2", name: "Specialty", isActive: true },
            { id: "5-7-3", name: "Steel", isActive: true },
            { id: "5-7-4", name: "Cross Border", isActive: true },
          ],
        },
      ],
    },
    {
      id: "6",
      name: "Dangerous Goods Business",
      isActive: true,
      subBusinessGroups: [
        {
          id: "6-1",
          name: "Dangerous Goods Business",
          isActive: true,
          productGroups: [
            { id: "6-1-1", name: "Dangerous Goods Business", isActive: true },
          ],
        },
      ],
    },
    {
      id: "7",
      name: "Freight Business",
      isActive: true,
      subBusinessGroups: [
        {
          id: "7-1",
          name: "3PL",
          isActive: true,
          productGroups: [{ id: "7-1-1", name: "3PL", isActive: true }],
        },
        {
          id: "7-2",
          name: "4PL",
          isActive: true,
          productGroups: [{ id: "7-2-1", name: "4PL", isActive: true }],
        },
      ],
    },
    {
      id: "8",
      name: "Healthcare and Pharmaceutical Business",
      isActive: true,
      subBusinessGroups: [
        {
          id: "8-1",
          name: "Healthcare & Pharma Business",
          isActive: true,
          productGroups: [
            {
              id: "8-1-1",
              name: "Centralized Warehouse and Distribution",
              isActive: true,
            },
            { id: "8-1-2", name: "Business Development", isActive: true },
            { id: "8-1-3", name: "Hospital Solutions", isActive: true },
          ],
        },
      ],
    },
    {
      id: "9",
      name: "Multi-Modal Business",
      isActive: true,
      subBusinessGroups: [
        {
          id: "9-1",
          name: "Multi-Mode",
          isActive: true,
          productGroups: [{ id: "9-1-1", name: "Multi-Mode", isActive: true }],
        },
      ],
    },
    {
      id: "10",
      name: "New Business Project and Process Excellence",
      isActive: true,
      subBusinessGroups: [
        {
          id: "10-1",
          name: "Business Value Creation",
          isActive: true,
          productGroups: [
            { id: "10-1-1", name: "Business Value Creation", isActive: true },
          ],
        },
      ],
    },
    {
      id: "11",
      name: "Transport and Warehouse Operations",
      isActive: true,
      subBusinessGroups: [
        {
          id: "11-1",
          name: "Transport and Warehouse Operations",
          isActive: true,
          productGroups: [
            { id: "11-1-1", name: "ESC", isActive: true },
            { id: "11-1-2", name: "RDC", isActive: true },
          ],
        },
      ],
    },
  ]);

  const toggleBusinessGroup = (id: string) => {
    setExpandedBusinessGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleSubBusinessGroup = (id: string) => {
    setExpandedSubBusinessGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filteredBusinessGroups = businessGroups.filter((bg) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    
    // Search in business group name
    if (bg.name.toLowerCase().includes(searchLower)) return true;
    
    // Search in sub business groups
    const hasMatchingSub = bg.subBusinessGroups.some((sub) => {
      if (sub.name.toLowerCase().includes(searchLower)) return true;
      
      // Search in product groups
      return sub.productGroups.some((prod) =>
        prod.name.toLowerCase().includes(searchLower)
      );
    });
    
    return hasMatchingSub;
  });

  const getTotalCounts = () => {
    let totalSub = 0;
    let totalProduct = 0;
    
    businessGroups.forEach((bg) => {
      totalSub += bg.subBusinessGroups.length;
      bg.subBusinessGroups.forEach((sub) => {
        totalProduct += sub.productGroups.length;
      });
    });
    
    return { totalSub, totalProduct };
  };

  const counts = getTotalCounts();

  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Layers className="h-7 w-7" style={{ color: roleTheme.primary }} />
            Business Structure
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            จัดการโครงสร้างธุรกิจ กลุ่มธุรกิจ และกลุ่มผลิตภัณฑ์
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Business Groups</p>
                <p className="text-2xl font-bold text-foreground">
                  {businessGroups.length}
                </p>
              </div>
              <Building2 className="h-8 w-8 text-blue-600 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Sub Business Groups</p>
                <p className="text-2xl font-bold text-foreground">{counts.totalSub}</p>
              </div>
              <Layers className="h-8 w-8 text-purple-600 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Product Groups</p>
                <p className="text-2xl font-bold text-foreground">
                  {counts.totalProduct}
                </p>
              </div>
              <Package className="h-8 w-8 text-green-600 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="ค้นหา Business Group, Sub Business Group, หรือ Product Group..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 pr-4 w-full h-10 border border-border rounded-lg bg-card"
        />
      </div>

      {/* Tree Structure */}
      <Card className="border border-border shadow-sm">
        <CardHeader className="border-b border-border bg-secondary/50">
          <CardTitle className="text-base">โครงสร้างธุรกิจ</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-2">
            {filteredBusinessGroups.map((businessGroup) => (
              <div key={businessGroup.id} className="space-y-1">
                {/* Business Group */}
                <div
                  className="flex items-center gap-2 p-3 rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors"
                  onClick={() => toggleBusinessGroup(businessGroup.id)}
                >
                  {expandedBusinessGroups.has(businessGroup.id) ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  )}
                  <Building2
                    className="h-5 w-5 flex-shrink-0"
                    style={{ color: roleTheme.primary }}
                  />
                  <span className="font-medium text-foreground flex-1">
                    {businessGroup.name}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {businessGroup.subBusinessGroups.length} sub-groups
                  </Badge>
                </div>

                {/* Sub Business Groups */}
                {expandedBusinessGroups.has(businessGroup.id) && (
                  <div className="ml-8 space-y-1">
                    {businessGroup.subBusinessGroups.map((subGroup) => (
                      <div key={subGroup.id} className="space-y-1">
                        <div
                          className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors"
                          onClick={() => toggleSubBusinessGroup(subGroup.id)}
                        >
                          {expandedSubBusinessGroups.has(subGroup.id) ? (
                            <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          )}
                          <Layers className="h-4 w-4 text-purple-600 flex-shrink-0" />
                          <span className="text-sm text-foreground flex-1">
                            {subGroup.name}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {subGroup.productGroups.length} products
                          </Badge>
                        </div>

                        {/* Product Groups */}
                        {expandedSubBusinessGroups.has(subGroup.id) && (
                          <div className="ml-8 space-y-1">
                            {subGroup.productGroups.map((product) => (
                              <div
                                key={product.id}
                                className="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                              >
                                <Package className="h-4 w-4 text-green-600 flex-shrink-0" />
                                <span className="text-sm text-muted-foreground">
                                  {product.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
