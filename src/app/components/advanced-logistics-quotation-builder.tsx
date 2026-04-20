import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Warehouse,
  Truck,
  Ship,
  Globe,
  FileText,
  Plus,
  Trash2,
  Search,
  Eye,
  Save,
  Send,
  Download,
  MapPin,
  Navigation,
  Package,
  Thermometer,
  CheckCircle2,
  Circle,
  FileCheck,
} from "lucide-react";

interface RateRow {
  id: string;
  [key: string]: any;
}

interface ServiceType {
  id: string;
  label: string;
  icon: any;
  color: string;
  gradient: string;
}

export function AdvancedLogisticsQuotationBuilder() {
  const [selectedService, setSelectedService] = useState<string>("warehouse");
  const [showPreview, setShowPreview] = useState(false);
  const [selectedRemarks, setSelectedRemarks] = useState<string[]>([]);
  const [rateRows, setRateRows] = useState<RateRow[]>([
    { id: "1" },
  ]);

  // Service Types with Purple accents
  const services: ServiceType[] = [
    {
      id: "warehouse",
      label: "Warehouse",
      icon: Warehouse,
      color: "from-blue-900 to-purple-900",
      gradient: "bg-gradient-to-r from-blue-900 to-purple-900",
    },
    {
      id: "transport",
      label: "Transport",
      icon: Truck,
      color: "from-purple-900 to-blue-900",
      gradient: "bg-gradient-to-r from-purple-900 to-blue-900",
    },
    {
      id: "freight",
      label: "Freight",
      icon: Ship,
      color: "from-blue-800 to-purple-800",
      gradient: "bg-gradient-to-r from-blue-800 to-purple-800",
    },
    {
      id: "crossborder",
      label: "Cross-border",
      icon: Globe,
      color: "from-purple-800 to-blue-800",
      gradient: "bg-gradient-to-r from-purple-800 to-blue-800",
    },
    {
      id: "customs",
      label: "Customs",
      icon: FileText,
      color: "from-blue-700 to-purple-700",
      gradient: "bg-gradient-to-r from-blue-700 to-purple-700",
    },
  ];

  // Standard Logistics Remarks Library
  const remarksLibrary = [
    {
      id: "fuel-adjustment",
      labelTH: "ค่าปรับราคาน้ำมัน +/- 2%",
      labelEN: "Fuel Adjustment +/- 2%",
    },
    {
      id: "liability-limit",
      labelTH: "ความรับผิดจำกัด 100,000 บาท",
      labelEN: "Liability Limit 100,000 THB",
    },
    {
      id: "overtime-charges",
      labelTH: "ค่าบริการนอกเวลา 500 บาท/ชม.",
      labelEN: "Overtime Charges 500 THB/hour",
    },
    {
      id: "advance-booking",
      labelTH: "จองล่วงหน้า 24 ชม.",
      labelEN: "Advance Booking 24 hours",
    },
    {
      id: "insurance-optional",
      labelTH: "ประกันสินค้า 0.1% (ตัวเลือก)",
      labelEN: "Insurance 0.1% of cargo value (optional)",
    },
    {
      id: "payment-terms",
      labelTH: "เครดิต 30 วัน นับจากวันที่ออกใบแจ้งหนี้",
      labelEN: "Credit Term 30 days from invoice date",
    },
    {
      id: "vat-excluded",
      labelTH: "ราคายังไม่รวม VAT 7%",
      labelEN: "Prices exclude 7% VAT",
    },
    {
      id: "waiting-time",
      labelTH: "เวลารอฟรี 2 ชม. หลังจากนั้น 300 บาท/ชม.",
      labelEN: "Free waiting time 2 hours, 300 THB/hour after",
    },
    {
      id: "force-majeure",
      labelTH: "เงื่อนไข Force Majeure ใช้บังคับ",
      labelEN: "Force Majeure clause applies",
    },
    {
      id: "minimum-charge",
      labelTH: "ค่าบริการขั้นต่ำ 1,500 บาท/เที่ยว",
      labelEN: "Minimum charge 1,500 THB per trip",
    },
  ];

  // Smart Scope Templates
  const scopeTemplates = {
    warehouse: {
      titleTH: "ขอบเขตงาน - คลังสินค้า",
      titleEN: "Scope of Work - Warehouse",
      items: [
        { th: "รับสินค้าและตรวจสอบคุณภาพ", en: "Receiving and Quality Check" },
        { th: "จัดเก็บสินค้าในพื้นที่ควบคุมอุณหภูมิ", en: "Storage in temperature-controlled area" },
        { th: "บริหารสต็อก (FIFO/FEFO)", en: "Stock Management (FIFO/FEFO)" },
        { th: "คัดแยกและบรรจุสินค้า", en: "Order Picking and Packing" },
        { th: "อุปกรณ์: รถโฟล์คลิฟท์ 3-5 ตัน", en: "MHE: Forklift 3-5 Ton" },
      ],
    },
    transport: {
      titleTH: "ขอบเขตงาน - ขนส่ง",
      titleEN: "Scope of Work - Transport",
      items: [
        { th: "บริการขนส่งแบบ Door-to-Door", en: "Door-to-Door Transportation" },
        { th: "ติดตั้งระบบ GPS Tracking", en: "GPS Tracking System" },
        { th: "อัพเดทสถานะแบบ Real-time", en: "Real-time Status Update" },
        { th: "เอกสาร POD (หลักฐานการส่งมอบ)", en: "POD (Proof of Delivery)" },
        { th: "บริการ 24/7 ทุกวัน", en: "24/7 Service Available" },
      ],
    },
    freight: {
      titleTH: "ขอบเขตงาน - ขนส่งระหว่างประเทศ",
      titleEN: "Scope of Work - Freight",
      items: [
        { th: "จัดการ FCL/LCL Consolidation", en: "FCL/LCL Consolidation" },
        { th: "จองที่ขนส่งทางเรือ/อากาศ", en: "Sea/Air Freight Booking" },
        { th: "ประสานงานพิธีการศุลกากร", en: "Customs Clearance Coordination" },
        { th: "จัดทำเอกสาร B/L, AWB, Packing List", en: "Documentation: B/L, AWB, Packing List" },
        { th: "ประกันภัยสินค้า", en: "Cargo Insurance Arrangement" },
      ],
    },
    crossborder: {
      titleTH: "ขอบเขตงาน - ข้ามพรมแดน",
      titleEN: "Scope of Work - Cross-border",
      items: [
        { th: "ขนส่งข้ามพรมแดนหลายประเทศ", en: "Multi-country Cross-border Transportation" },
        { th: "ช่วยเหลือด่านพรมแดน", en: "Border Clearance Assistance" },
        { th: "ประสานงาน Customs Broker", en: "Customs Broker Coordination" },
        { th: "เวลาขนส่ง: 3-5 วัน (ไทย-ลาว)", en: "Transit Time: 3-5 Days (Thailand-Laos)" },
        { th: "ประกันภัยครอบคลุม", en: "Full Cargo Insurance" },
      ],
    },
    customs: {
      titleTH: "ขอบเขตงาน - พิธีการศุลกากร",
      titleEN: "Scope of Work - Customs",
      items: [
        { th: "ยื่นเอกสารนำเข้า/ส่งออก", en: "Import/Export Declaration" },
        { th: "จำแนกรหัส HS Code", en: "HS Code Classification" },
        { th: "คำนวณภาษีและอากร", en: "Tax and Duty Calculation" },
        { th: "ขอใบอนุญาต (อย., กระทรวงพาณิชย์)", en: "License Application (FDA, MOC)" },
        { th: "บริการ Green Lane / Fast Track", en: "Green Lane / Fast Track Service" },
      ],
    },
  };

  // Dynamic Rate Table Columns
  const getRateColumns = () => {
    switch (selectedService) {
      case "transport":
        return [
          { key: "truckType", label: "Truck Type", type: "select", options: ["10-Wheel", "6-Wheel", "4-Wheel", "Van"] },
          { key: "route", label: "Route", type: "text" },
          { key: "km", label: "KM", type: "number" },
          { key: "price", label: "Price", type: "number" },
          { key: "unit", label: "Unit", type: "select", options: ["Trip", "KM", "Day"] },
          { key: "remarks", label: "Remarks", type: "text" },
        ];
      case "freight":
        return [
          { key: "carrier", label: "Carrier", type: "text" },
          { key: "container", label: "Container", type: "select", options: ["20' STD", "40' STD", "40' HC", "20' Reefer"] },
          { key: "pol", label: "POL", type: "text" },
          { key: "pod", label: "POD", type: "text" },
          { key: "transitTime", label: "Transit Time", type: "text" },
          { key: "price", label: "Price", type: "number" },
          { key: "currency", label: "Currency", type: "select", options: ["THB", "USD", "EUR"] },
        ];
      default:
        return [
          { key: "description", label: "Description", type: "text" },
          { key: "quantity", label: "Quantity", type: "number" },
          { key: "unit", label: "Unit", type: "select", options: ["CBM/Month", "Pallet/Month", "Carton"] },
          { key: "unitPrice", label: "Unit Price", type: "number" },
          { key: "amount", label: "Amount", type: "number" },
        ];
    }
  };

  const handleAddRow = () => {
    setRateRows([...rateRows, { id: Date.now().toString() }]);
  };

  const handleDeleteRow = (id: string) => {
    setRateRows(rateRows.filter(row => row.id !== id));
  };

  const toggleRemark = (remarkId: string) => {
    if (selectedRemarks.includes(remarkId)) {
      setSelectedRemarks(selectedRemarks.filter(id => id !== remarkId));
    } else {
      setSelectedRemarks([...selectedRemarks, remarkId]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 text-white shadow-2xl">
        <div className="max-w-[1920px] mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Advanced Logistics Quotation Builder
              </h1>
              <p className="text-purple-200 text-sm">
                SCGJWD Professional Quotation Management System
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowPreview(!showPreview)}
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                <Eye className="h-4 w-4 mr-2" />
                {showPreview ? "Hide Preview" : "Show Preview"}
              </Button>
              <Button
                variant="outline"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg">
                <Send className="h-4 w-4 mr-2" />
                Send to Client
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Content Area */}
          <div className={`${showPreview ? "col-span-7" : "col-span-9"} space-y-6`}>
            {/* Module 1: Header Module */}
            <Card className="border-purple-200 shadow-lg">
              <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-4 rounded-t-lg">
                <h2 className="text-lg font-bold text-white">Contract Details</h2>
              </div>
              <CardContent className="p-6">
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div>
                    <Label className="text-xs font-semibold text-gray-700">Quotation ID</Label>
                    <Input value="QT-2026-0001" disabled className="mt-1 bg-gray-50" />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-700">Issue Date *</Label>
                    <Input type="date" defaultValue="2026-02-20" className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-700">Effective Date *</Label>
                    <Input type="date" defaultValue="2026-03-01" className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-700">Valid Until</Label>
                    <Input type="date" defaultValue="2026-03-31" className="mt-1" />
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-xs font-semibold text-gray-700">Company Name *</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select client..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="scg">Siam Cement Group</SelectItem>
                        <SelectItem value="cp">CP Group</SelectItem>
                        <SelectItem value="ptt">PTT Group</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-700">Contact Person *</Label>
                    <Input placeholder="Auto-filled" className="mt-1 bg-gray-50" disabled />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-700">Customer Position *</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select position..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manager">Supply Chain Manager</SelectItem>
                        <SelectItem value="director">Logistics Director</SelectItem>
                        <SelectItem value="vp">VP Operations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-700">Business Unit *</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select BU..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="warehouse">Warehouse Division</SelectItem>
                        <SelectItem value="transport">Transport Division</SelectItem>
                        <SelectItem value="freight">Freight Division</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-700">Email</Label>
                    <Input placeholder="Auto-filled" className="mt-1 bg-gray-50" disabled />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-700">Phone</Label>
                    <Input placeholder="Auto-filled" className="mt-1 bg-gray-50" disabled />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Module 2: Service-Type Configurator */}
            <Card className="border-purple-200 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-sm font-bold text-gray-900 mb-4">Service Type Selection</h3>
                <div className="grid grid-cols-5 gap-3">
                  {services.map((service) => {
                    const Icon = service.icon;
                    const isSelected = selectedService === service.id;
                    return (
                      <button
                        key={service.id}
                        onClick={() => setSelectedService(service.id)}
                        className={`relative p-6 rounded-xl transition-all ${
                          isSelected
                            ? `bg-gradient-to-br ${service.color} text-white shadow-2xl scale-105`
                            : "bg-white border-2 border-gray-200 text-gray-700 hover:border-purple-300 hover:shadow-lg"
                        }`}
                      >
                        <Icon className={`h-8 w-8 mx-auto mb-3 ${isSelected ? "text-white" : "text-purple-600"}`} />
                        <p className={`text-sm font-bold text-center ${isSelected ? "text-white" : "text-gray-900"}`}>
                          {service.label}
                        </p>
                        {isSelected && (
                          <div className="absolute top-2 right-2">
                            <CheckCircle2 className="h-5 w-5 text-white" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Module 3: Product Specs Card */}
            <Card className="border-purple-200 shadow-lg">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-t-lg border-b border-purple-200">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-purple-600" />
                  <h2 className="text-lg font-bold text-gray-900">Product Specifications</h2>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Label className="text-xs font-semibold text-gray-700">Product Type *</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select type..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Cargo</SelectItem>
                        <SelectItem value="dangerous">Dangerous Goods</SelectItem>
                        <SelectItem value="food">Food & Beverage</SelectItem>
                        <SelectItem value="pharma">Pharmaceutical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-700">Packaging *</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select packaging..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="carton">Carton Box</SelectItem>
                        <SelectItem value="pallet">Pallet</SelectItem>
                        <SelectItem value="drum">Drum</SelectItem>
                        <SelectItem value="bag">Bag</SelectItem>
                        <SelectItem value="bulk">Bulk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-700">Temperature Control *</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select temp..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ambient">Ambient</SelectItem>
                        <SelectItem value="chilled">Chilled (2-8°C)</SelectItem>
                        <SelectItem value="frozen">Frozen (-18 to -25°C)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-700">Volume/UOM *</Label>
                    <div className="flex gap-2 mt-1">
                      <Input type="number" placeholder="1000" className="flex-1" />
                      <Select>
                        <SelectTrigger className="w-24">
                          <SelectValue placeholder="UOM" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cbm">CBM</SelectItem>
                          <SelectItem value="kg">KG</SelectItem>
                          <SelectItem value="ton">Ton</SelectItem>
                          <SelectItem value="pallet">Pallet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Module 4: Smart Scope Card (Dynamic) */}
            <Card className="border-purple-200 shadow-lg">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-t-lg border-b border-purple-200">
                <div className="flex items-center gap-2">
                  <Navigation className="h-5 w-5 text-blue-600" />
                  <h2 className="text-lg font-bold text-gray-900">
                    {selectedService === "transport" && "Route & Location Details"}
                    {selectedService === "freight" && "Freight Specifications"}
                    {!["transport", "freight"].includes(selectedService) && "Service Details"}
                  </h2>
                </div>
              </div>
              <CardContent className="p-6">
                {selectedService === "transport" && (
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-xs font-semibold text-gray-700">Origin *</Label>
                      <div className="relative mt-1">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input placeholder="e.g., Bangkok" className="pl-10" />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-gray-700">Destination *</Label>
                      <div className="relative mt-1">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input placeholder="e.g., Chiang Mai" className="pl-10" />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-gray-700">Route Distance (KM)</Label>
                      <Input type="number" placeholder="700" className="mt-1" />
                    </div>
                  </div>
                )}

                {selectedService === "freight" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <Label className="text-xs font-semibold text-gray-700">Incoterm *</Label>
                        <Select>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fob">FOB</SelectItem>
                            <SelectItem value="cif">CIF</SelectItem>
                            <SelectItem value="exw">EXW</SelectItem>
                            <SelectItem value="ddp">DDP</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs font-semibold text-gray-700">POL (Port of Loading) *</Label>
                        <Input placeholder="e.g., Bangkok Port" className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-xs font-semibold text-gray-700">POD (Port of Discharge) *</Label>
                        <Input placeholder="e.g., Singapore Port" className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-xs font-semibold text-gray-700">Carrier</Label>
                        <Input placeholder="e.g., Maersk" className="mt-1" />
                      </div>
                    </div>
                  </div>
                )}

                {!["transport", "freight"].includes(selectedService) && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs font-semibold text-gray-700">Service Location</Label>
                      <Input placeholder="e.g., Warehouse Bangkok" className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-gray-700">Service Duration</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select duration..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1month">1 Month</SelectItem>
                          <SelectItem value="3months">3 Months</SelectItem>
                          <SelectItem value="6months">6 Months</SelectItem>
                          <SelectItem value="1year">1 Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Module 5: Advanced Data Table */}
            <Card className="border-purple-200 shadow-lg">
              <div className="bg-gradient-to-r from-purple-900 to-blue-900 p-4 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white">Rate Table</h2>
                  <Button
                    size="sm"
                    onClick={handleAddRow}
                    className="bg-white/20 hover:bg-white/30 text-white border-0"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Line
                  </Button>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-purple-200 bg-purple-50">
                        {getRateColumns().map((col) => (
                          <th key={col.key} className="text-left p-3 font-semibold text-gray-700">
                            {col.label}
                          </th>
                        ))}
                        <th className="w-12"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {rateRows.map((row) => (
                        <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-50">
                          {getRateColumns().map((col) => (
                            <td key={col.key} className="p-3">
                              {col.type === "select" ? (
                                <Select>
                                  <SelectTrigger className="text-sm">
                                    <SelectValue placeholder={`Select ${col.label}`} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {col.options?.map((opt) => (
                                      <SelectItem key={opt} value={opt.toLowerCase()}>
                                        {opt}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : (
                                <Input
                                  type={col.type}
                                  placeholder={`Enter ${col.label}`}
                                  className="text-sm"
                                />
                              )}
                            </td>
                          ))}
                          <td className="p-3 text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteRow(row.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Scope of Work */}
            <Card className="border-purple-200 shadow-lg">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-t-lg border-b border-purple-200">
                <h2 className="text-lg font-bold text-gray-900">Scope of Work</h2>
              </div>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-bold text-purple-900 mb-3">
                      {scopeTemplates[selectedService as keyof typeof scopeTemplates]?.titleTH}
                    </h3>
                    <ul className="space-y-2">
                      {scopeTemplates[selectedService as keyof typeof scopeTemplates]?.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0"></div>
                          {item.th}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-blue-900 mb-3">
                      {scopeTemplates[selectedService as keyof typeof scopeTemplates]?.titleEN}
                    </h3>
                    <ul className="space-y-2">
                      {scopeTemplates[selectedService as keyof typeof scopeTemplates]?.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-600 flex-shrink-0"></div>
                          {item.en}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Module 6: Terms & Remarks Library (Side Panel) */}
          <div className={`${showPreview ? "col-span-2" : "col-span-3"}`}>
            <Card className="sticky top-6 border-purple-200 shadow-lg">
              <div className="bg-gradient-to-r from-purple-900 to-blue-900 p-4 rounded-t-lg">
                <div className="flex items-center gap-2">
                  <FileCheck className="h-5 w-5 text-white" />
                  <h2 className="text-lg font-bold text-white">Terms & Remarks</h2>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search terms..."
                      className="pl-10 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
                  {remarksLibrary.map((remark) => {
                    const isSelected = selectedRemarks.includes(remark.id);
                    return (
                      <div
                        key={remark.id}
                        onClick={() => toggleRemark(remark.id)}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          isSelected
                            ? "border-purple-600 bg-purple-50"
                            : "border-gray-200 hover:border-purple-300 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <div className="mt-1">
                            {isSelected ? (
                              <CheckCircle2 className="h-4 w-4 text-purple-600" />
                            ) : (
                              <Circle className="h-4 w-4 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-gray-900">
                              {remark.labelTH}
                            </p>
                            <p className="text-xs text-gray-600 mt-0.5">
                              {remark.labelEN}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4">
                  <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                    Custom Remarks
                  </Label>
                  <textarea
                    className="w-full p-3 border border-gray-200 rounded-lg text-xs resize-none focus:outline-none focus:ring-2 focus:ring-purple-600"
                    rows={4}
                    placeholder="Add custom terms..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Module 7: Preview Mode (Side-by-side) */}
          {showPreview && (
            <div className="col-span-3">
              <Card className="sticky top-6 border-purple-200 shadow-lg">
                <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-4 rounded-t-lg">
                  <h2 className="text-lg font-bold text-white">Bilingual Preview (TH/EN)</h2>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-purple-600 text-purple-600"
                      >
                        TH Version
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-blue-600 text-blue-600"
                      >
                        EN Version
                      </Button>
                    </div>

                    <div className="border-2 border-gray-200 rounded-lg p-6 bg-white min-h-[calc(100vh-250px)]">
                      <div className="space-y-4">
                        <div className="text-center">
                          <h3 className="text-xl font-bold text-blue-900">ใบเสนอราคา / Quotation</h3>
                          <p className="text-sm text-gray-600 mt-1">QT-2026-0001</p>
                        </div>

                        <Separator />

                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>บริษัท / Company:</strong> Siam Cement Group</p>
                          <p><strong>วันที่ / Date:</strong> 20 Feb 2026</p>
                          <p><strong>บริการ / Service:</strong> {services.find(s => s.id === selectedService)?.label}</p>
                        </div>

                        <Separator />

                        <div>
                          <h4 className="text-sm font-bold text-gray-900 mb-2">ขอบเขตงาน / Scope of Work</h4>
                          <div className="text-xs text-gray-700 space-y-1">
                            {scopeTemplates[selectedService as keyof typeof scopeTemplates]?.items.map((item, idx) => (
                              <p key={idx}>• {item.th} / {item.en}</p>
                            ))}
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h4 className="text-sm font-bold text-gray-900 mb-2">เงื่อนไข / Terms & Conditions</h4>
                          <div className="text-xs text-gray-700 space-y-1">
                            {selectedRemarks.map((remarkId) => {
                              const remark = remarksLibrary.find(r => r.id === remarkId);
                              return remark ? (
                                <p key={remarkId}>• {remark.labelTH} / {remark.labelEN}</p>
                              ) : null;
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
