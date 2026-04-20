import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import {
  MapPin,
  Search,
  Filter,
  Download,
  Eye,
  TrendingUp,
  Building2,
  Target,
  Award,
  Star,
  ChevronDown,
  Factory,
  X,
  Brain,
  Map,
} from "lucide-react";
import { CustomerInsightsScreen } from "./customer-insights-screen";
import { CustomerIntelligenceWrapper } from "../customer-intelligence-wrapper";

interface CustomerInsightsBELScreenProps {
  onNavigate?: (path: string) => void;
}

type CustomerType = "Cold Chain" | "High" | "Medium";
type BusinessUnit = "All BU" | "Cold Chain Logistics" | "General Logistics" | "Warehouse Management" | "Transportation" | "Express Delivery" | "E-commerce Logistics" | "Contract Logistics" | "International Logistics";
type ViewMode = "bel" | "insights" | "intelligence";

interface FactoryData {
  license: string;
  name: string;
  matchingRate: number;
  geoDistance: number;
  manufacturingCapacity: number;
  businessPotential: number;
  businessAge: number;
  potentialScore: number;
  tsic: number;
  type: CustomerType;
  lat: number;
  lng: number;
  businessUnit: BusinessUnit;
}

export function CustomerInsightsBELScreen({ onNavigate }: CustomerInsightsBELScreenProps) {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<ViewMode>("bel");
  const [activeTab, setActiveTab] = useState<"customer" | "customer_target" | "competitor">("customer_target");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBU, setSelectedBU] = useState<BusinessUnit>("All BU");
  const [showBUFilter, setShowBUFilter] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const businessUnits: BusinessUnit[] = [
    "All BU",
    "Cold Chain Logistics",
    "General Logistics",
    "Warehouse Management",
    "Transportation",
    "Express Delivery",
    "E-commerce Logistics",
    "Contract Logistics",
    "International Logistics",
  ];

  // Mock data for high potential customers with coordinates
  const factoryData: FactoryData[] = [
    { license: "1010000125159", name: "จ้าวพระยาน้ำกิ้ง จ.ชาชะเชิงสิง-ต้นนัง", matchingRate: 5, geoDistance: 4, manufacturingCapacity: 1, businessPotential: 4, businessAge: 5, potentialScore: 10759, tsic: 10759, type: "High", lat: 13.7563, lng: 100.5018, businessUnit: "Cold Chain Logistics" },
    { license: "0010060125346", name: "บริษัท จิเดลล์ ซิสท์ จำกัด-จ้าวพลิต", matchingRate: 5, geoDistance: 4, manufacturingCapacity: 1, businessPotential: 3, businessAge: 5, potentialScore: 21001, tsic: 21001, type: "High", lat: 13.8561, lng: 100.6153, businessUnit: "General Logistics" },
    { license: "1010000125572", name: "บริษัท เฉลิด ขริด จำกัด", matchingRate: 5, geoDistance: 4, manufacturingCapacity: 1, businessPotential: 5, businessAge: 3, potentialScore: 10202, tsic: 10202, type: "High", lat: 13.6532, lng: 100.4931, businessUnit: "Warehouse Management" },
    { license: "1010048625053", name: "สถ.ผล.เตาหัวแดด น.น.คังเอง-จ้าวจินต์", matchingRate: 5, geoDistance: 4, manufacturingCapacity: 1, businessPotential: 3, businessAge: 5, potentialScore: 10132, tsic: 10132, type: "High", lat: 13.9123, lng: 100.7234, businessUnit: "Transportation" },
    { license: "1910000625125", name: "จ้าวพระยาน้ำกิ้ง โรงงานการาเทรส์-คติ", matchingRate: 5, geoDistance: 4, manufacturingCapacity: 1, businessPotential: 5, businessAge: 5, potentialScore: 10739, tsic: 10739, type: "High", lat: 13.7234, lng: 100.5678, businessUnit: "Express Delivery" },
    { license: "0010000645155", name: "บริษัท ด.ชมลี้เหนิ่ง จำกัด", matchingRate: 5, geoDistance: 4, manufacturingCapacity: 1, businessPotential: 5, businessAge: 5, potentialScore: 10739, tsic: 10739, type: "High", lat: 13.8234, lng: 100.6234, businessUnit: "E-commerce Logistics" },
    { license: "0010000125315", name: "บริษัท เจ.ห้วง แมน-เชิงโลก-จ้าวพลิต", matchingRate: 5, geoDistance: 5, manufacturingCapacity: 1, businessPotential: 4, businessAge: 4, potentialScore: 10615, tsic: 10615, type: "High", lat: 13.6945, lng: 100.5289, businessUnit: "Contract Logistics" },
    { license: "0010060125330", name: "บริษัท ธิ.ไหล-จ้าวกริต-จ้าวพลิต", matchingRate: 5, geoDistance: 5, manufacturingCapacity: 1, businessPotential: 3, businessAge: 5, potentialScore: 21001, tsic: 21001, type: "High", lat: 18.7883, lng: 98.9853, businessUnit: "International Logistics" },
    { license: "1010000125423", name: "บริษัท ชงเฉียด จังเจา จำกัด", matchingRate: 5, geoDistance: 4, manufacturingCapacity: 1, businessPotential: 2, businessAge: 5, potentialScore: 10743, tsic: 10743, type: "High", lat: 7.8804, lng: 98.3923, businessUnit: "All BU" },
    { license: "0010000125391", name: "บริษัท ฟู่ชมเจริ-จ้าวพลิต", matchingRate: 5, geoDistance: 4, manufacturingCapacity: 1, businessPotential: 3, businessAge: 5, potentialScore: 10139, tsic: 10139, type: "High", lat: 13.8945, lng: 100.6534, businessUnit: "All BU" },
    { license: "1910001225156", name: "บริษัท ด.ซักเฉินหย จำกัด", matchingRate: 5, geoDistance: 4, manufacturingCapacity: 1, businessPotential: 4, businessAge: 5, potentialScore: 10752, tsic: 10752, type: "High", lat: 13.7645, lng: 100.5389, businessUnit: "All BU" },
    { license: "0010020125381", name: "บริษัท เซ่งดอง้ง จำกัด", matchingRate: 4, geoDistance: 4, manufacturingCapacity: 1, businessPotential: 3, businessAge: 4, potentialScore: 10711, tsic: 10711, type: "High", lat: 13.6234, lng: 100.4789, businessUnit: "All BU" },
    { license: "1010000125472", name: "บริษัท ธิจางอะตสารการเทรเซอนะ-จ้าวพลิต", matchingRate: 5, geoDistance: 5, manufacturingCapacity: 1, businessPotential: 1, businessAge: 4, potentialScore: 10309, tsic: 10309, type: "High", lat: 13.7845, lng: 100.6089, businessUnit: "All BU" },
    { license: "0010000225332", name: "บริษัท กรีนเอจเอิคเอทไซเซ-จ้าวพลิต", matchingRate: 5, geoDistance: 4, manufacturingCapacity: 1, businessPotential: 5, businessAge: 5, potentialScore: 21001, tsic: 21001, type: "High", lat: 13.6734, lng: 100.4634, businessUnit: "All BU" },
    { license: "1010000225199", name: "บริษัท พลัส ดอก จำกัด", matchingRate: 5, geoDistance: 4, manufacturingCapacity: 1, businessPotential: 4, businessAge: 4, potentialScore: 10743, tsic: 10743, type: "High", lat: 13.9234, lng: 100.7534, businessUnit: "All BU" },
    { license: "1910000225506", name: "จ้าวพระยาน้ำกิ้ง จิริโซเนม", matchingRate: 5, geoDistance: 5, manufacturingCapacity: 1, businessPotential: 2, businessAge: 5, potentialScore: 10769, tsic: 10769, type: "High", lat: 13.7434, lng: 100.5834, businessUnit: "All BU" },
    { license: "0020000225371", name: "สหกรณ์โรงเย็นกรมชิต จำกัด", matchingRate: 5, geoDistance: 3, manufacturingCapacity: 1, businessPotential: 3, businessAge: 5, potentialScore: 10501, tsic: 10501, type: "Cold Chain", lat: 13.8134, lng: 100.6434, businessUnit: "All BU" },
    { license: "0010010125383", name: "บริษัท นาง จำกัด", matchingRate: 5, geoDistance: 5, manufacturingCapacity: 1, businessPotential: 1, businessAge: 5, potentialScore: 10491, tsic: 10491, type: "High", lat: 13.6634, lng: 100.4834, businessUnit: "All BU" },
    { license: "1910000225231", name: "จ้าวพระยาน้ำกิ้ง โรงงานอนเป็นกาเนีง", matchingRate: 5, geoDistance: 5, manufacturingCapacity: 1, businessPotential: 1, businessAge: 5, potentialScore: 10712, tsic: 10712, type: "High", lat: 13.7934, lng: 100.6234, businessUnit: "All BU" },
  ];

  const totalFactories = 3299;
  const highPotentialCount = 159;

  const filteredData = factoryData.filter((factory) => {
    const matchesSearch =
      factory.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      factory.license.includes(searchQuery);
    const matchesBU = selectedBU === "All BU" || factory.businessUnit === selectedBU;
    return matchesSearch && matchesBU;
  });

  const getPotentialBadge = (type: CustomerType) => {
    switch (type) {
      case "Cold Chain":
        return <Badge className="bg-orange-500 text-white border-0">Cold Chain</Badge>;
      case "High":
        return <Badge className="bg-green-500 text-white border-0">High</Badge>;
      case "Medium":
        return <Badge className="bg-yellow-500 text-white border-0">Medium</Badge>;
      default:
        return <Badge className="bg-gray-400 text-white border-0">Low</Badge>;
    }
  };

  const getMarkerColor = (type: CustomerType) => {
    switch (type) {
      case "Cold Chain":
        return "#f97316"; // orange-500
      case "High":
        return "#22c55e"; // green-500
      case "Medium":
        return "#eab308"; // yellow-500
      default:
        return "#9ca3af"; // gray-400
    }
  };

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapRef.current || viewMode !== "bel") return;

    // Clean up existing map
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    // Create new map
    const map = L.map(mapRef.current).setView([13.7563, 100.5018], 7);

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Add markers for each factory
    filteredData.forEach((factory) => {
      const marker = L.circleMarker([factory.lat, factory.lng], {
        radius: 8,
        fillColor: getMarkerColor(factory.type),
        color: "#fff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8,
      }).addTo(map);

      // Add popup
      marker.bindPopup(`
        <div style="font-size: 12px;">
          <div style="font-weight: 600; margin-bottom: 4px;">${factory.name}</div>
          <div style="font-size: 10px; color: #666;">License: ${factory.license}</div>
          <div style="font-size: 10px;">Type: ${factory.type}</div>
          <div style="font-size: 10px;">Score: ${factory.potentialScore}</div>
        </div>
      `);
    });

    mapInstanceRef.current = map;

    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [viewMode, filteredData]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-gray-800" />
            <span className="text-gray-900 text-lg font-semibold">Customer Intelligence & Insights</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-gray-700 hover:bg-gray-100 flex items-center gap-1 text-sm">
            <span>🇹🇭</span>
            <ChevronDown className="h-4 w-4 text-gray-700" />
          </Button>
        </div>
      </div>

      {/* View Mode Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("bel")}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
              viewMode === "bel"
                ? "bg-orange-50 text-orange-600 border-b-2 border-orange-500"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <Map className="h-4 w-4" />
            BEL Dashboard
          </button>
          <button
            onClick={() => setViewMode("insights")}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
              viewMode === "insights"
                ? "bg-orange-50 text-orange-600 border-b-2 border-orange-500"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <Brain className="h-4 w-4" />
            Customer Insights
          </button>
          <button
            onClick={() => setViewMode("intelligence")}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
              viewMode === "intelligence"
                ? "bg-orange-50 text-orange-600 border-b-2 border-orange-500"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <Target className="h-4 w-4" />
            Customer Intelligence
          </button>
        </div>
      </div>

      {/* Render content based on viewMode */}
      {viewMode === "insights" && <CustomerInsightsScreen onNavigate={onNavigate} />}
      {viewMode === "intelligence" && <CustomerIntelligenceWrapper />}
      {viewMode === "bel" && (
        <>
          {/* Tabs */}
          <div className="bg-gray-50 border-b border-gray-200 px-6">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("customer")}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === "customer"
                    ? "bg-white text-gray-900 border-b-2 border-orange-500 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                Customer
              </button>
              <button
                onClick={() => setActiveTab("customer_target")}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === "customer_target"
                    ? "bg-white text-gray-900 border-b-2 border-orange-500 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                Customer Target
              </button>
              <button
                onClick={() => setActiveTab("competitor")}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === "competitor"
                    ? "bg-white text-gray-900 border-b-2 border-orange-500 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                Competitor
              </button>
            </div>
          </div>

          <div className="flex h-[calc(100vh-180px)]">
            {/* Left Side - Map */}
            <div className="w-1/3 bg-white border-r border-gray-200 p-4 relative">
              {/* Map Legend */}
              <div className="absolute top-6 left-6 z-[1000] bg-white/95 backdrop-blur-sm rounded-lg p-3 border border-gray-300 shadow-lg">
                <div className="text-xs text-gray-800 font-semibold mb-2">Type</div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span className="text-xs text-gray-700">Cold Chain</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs text-gray-700">High</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-xs text-gray-700">Medium</span>
                  </div>
                </div>
              </div>

              {/* Last Update */}
              <div className="absolute top-6 right-6 z-[1000] bg-gray-800 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-gray-700 shadow-lg">
                <span className="text-xs text-blue-400">LAST UPDATE 27-JAN-2026 23:06</span>
              </div>

              {/* Leaflet Map */}
              <div ref={mapRef} className="w-full h-full rounded-lg overflow-hidden" style={{ background: '#f5f5f5' }} />
            </div>

            {/* Right Side - Data Table */}
            <div className="flex-1 bg-white overflow-hidden flex flex-col">
              {/* Header Section */}
              <div className="p-6 border-b border-gray-200">
                {/* BU Filter Header */}
                <div className="mb-4 pb-3 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Building2 className="h-5 w-5 text-gray-700" />
                      <span className="text-gray-600 text-sm font-medium">Filtering by Business Unit:</span>
                      <span className="text-orange-600 text-lg font-bold">{selectedBU}</span>
                    </div>
                    {selectedBU !== "All BU" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedBU("All BU")}
                        className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Clear Filter
                      </Button>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-orange-500" />
                      <span className="text-gray-900 text-lg font-semibold">
                        TOTAL HIGH POTENTIAL OF CUSTOMER TARGET
                      </span>
                      <span className="text-orange-500 text-2xl font-bold">{highPotentialCount}</span>
                      <span className="text-gray-600 text-sm">FACTORY</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 text-sm">TOTAL</span>
                    <span className="text-gray-900 text-lg font-bold">{totalFactories.toLocaleString()}</span>
                    <span className="text-gray-600 text-sm">FACTORY</span>
                  </div>
                </div>

                {/* Search and Actions */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by factory name or license..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
                    />
                  </div>
                  <div className="relative">
                    <Button
                      variant="outline"
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowBUFilter(!showBUFilter)}
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      {selectedBU === "All BU" ? "Filter by BU" : selectedBU}
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                    
                    {/* BU Filter Dropdown */}
                    {showBUFilter && (
                      <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-20 w-64 max-h-80 overflow-auto">
                        {businessUnits.map((bu) => (
                          <button
                            key={bu}
                            onClick={() => {
                              setSelectedBU(bu);
                              setShowBUFilter(false);
                            }}
                            className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                              selectedBU === bu
                                ? "bg-orange-50 text-orange-600 font-medium"
                                : "text-gray-700"
                            }`}
                          >
                            {bu}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              {/* Table */}
              <div className="flex-1 overflow-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-gray-50 border-b border-gray-200 z-10">
                    <tr>
                      <th className="text-left p-3 text-gray-700 font-medium text-xs">Factory license</th>
                      <th className="text-left p-3 text-gray-700 font-medium text-xs">Factory name</th>
                      <th className="text-center p-3 text-gray-700 font-medium text-xs">
                        Matching<br />Rate
                      </th>
                      <th className="text-center p-3 text-gray-700 font-medium text-xs">
                        Geo<br />Distance
                      </th>
                      <th className="text-center p-3 text-gray-700 font-medium text-xs">
                        Manufacturing<br />Capacity
                      </th>
                      <th className="text-center p-3 text-gray-700 font-medium text-xs">
                        Business<br />potential
                      </th>
                      <th className="text-center p-3 text-gray-700 font-medium text-xs">
                        Business<br />age
                      </th>
                      <th className="text-center p-3 text-gray-700 font-medium text-xs">
                        Potential<br />Score
                      </th>
                      <th className="text-center p-3 text-gray-700 font-medium text-xs">TSIC</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((factory, index) => (
                      <tr
                        key={factory.license}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-3 text-gray-700 text-xs font-mono">{factory.license}</td>
                        <td className="p-3 text-gray-700 text-xs">{factory.name}</td>
                        <td className="p-3 text-center text-gray-900 text-xs">{factory.matchingRate}</td>
                        <td className="p-3 text-center text-gray-900 text-xs">{factory.geoDistance}</td>
                        <td className="p-3 text-center text-gray-900 text-xs">{factory.manufacturingCapacity}</td>
                        <td className="p-3 text-center text-gray-900 text-xs">{factory.businessPotential}</td>
                        <td className="p-3 text-center text-gray-900 text-xs">{factory.businessAge}</td>
                        <td className="p-3 text-center">
                          {getPotentialBadge(factory.type)}
                        </td>
                        <td className="p-3 text-center text-gray-700 text-xs">{factory.tsic}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}