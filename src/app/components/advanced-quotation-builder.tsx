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
  ChevronDown,
  ChevronUp,
  Fuel,
  CheckSquare,
  FileSignature,
  Save,
  Send,
  Download,
} from "lucide-react";

interface RateRow {
  id: string;
  description: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  currency: string;
  amount: number;
}

interface ProductInfo {
  productType: string;
  volume: string;
  uom: string;
  temperatureControl: string;
  temperatureRange: string;
}

export function AdvancedQuotationBuilder() {
  const [selectedService, setSelectedService] = useState("warehouse");
  const [showFuelTable, setShowFuelTable] = useState(false);
  const [selectedClient, setSelectedClient] = useState("");
  const [productInfo, setProductInfo] = useState<ProductInfo>({
    productType: "",
    volume: "",
    uom: "CBM",
    temperatureControl: "ambient",
    temperatureRange: "",
  });

  const [rateRows, setRateRows] = useState<RateRow[]>([
    {
      id: "1",
      description: "Warehouse Storage Fee",
      unit: "CBM/Month",
      quantity: 1000,
      unitPrice: 350,
      currency: "THB",
      amount: 350000,
    },
  ]);

  const [selectedRemarks, setSelectedRemarks] = useState<string[]>([]);

  // Service Types
  const services = [
    { id: "warehouse", label: "Warehouse", icon: Warehouse, color: "bg-blue-600" },
    { id: "transport", label: "Transport", icon: Truck, color: "bg-green-600" },
    { id: "freight", label: "Freight", icon: Ship, color: "bg-cyan-600" },
    { id: "crossborder", label: "Cross-border", icon: Globe, color: "bg-purple-600" },
    { id: "customs", label: "Customs/License", icon: FileText, color: "bg-orange-600" },
  ];

  // Standard Remarks Library
  const remarksLibrary = [
    { id: "credit-30", label: "Credit Term: 30 Days from Invoice Date" },
    { id: "credit-60", label: "Credit Term: 60 Days from Invoice Date" },
    { id: "minimum-charge", label: "Minimum Charge: 1,000 THB per shipment" },
    { id: "waiting-time", label: "Waiting Time: Free 2 hours, 500 THB/hour after" },
    { id: "advance-booking", label: "Advance Booking Required: 24 hours notice" },
    { id: "fuel-surcharge", label: "Fuel Surcharge: Subject to market adjustment" },
    { id: "vat-excluded", label: "All prices exclude 7% VAT" },
    { id: "insurance", label: "Insurance: 0.1% of cargo value (optional)" },
    { id: "force-majeure", label: "Force Majeure clause applies" },
    { id: "cancellation", label: "Cancellation: 24 hours notice, 50% charge if late" },
  ];

  // Fuel Reference Table Data
  const fuelReferenceData = [
    { dieselPrice: "30-32", adjustment: "+0%" },
    { dieselPrice: "32-34", adjustment: "+2%" },
    { dieselPrice: "34-36", adjustment: "+4%" },
    { dieselPrice: "36-38", adjustment: "+6%" },
    { dieselPrice: "38-40", adjustment: "+8%" },
    { dieselPrice: "40+", adjustment: "+10%" },
  ];

  // Scope of Work Templates
  const scopeOfWorkTemplates = {
    warehouse: [
      "Receiving and Quality Check",
      "Put-away to assigned location",
      "Storage in temperature-controlled area",
      "Stock Management (FIFO/FEFO)",
      "Order Picking and Packing",
      "Loading and Documentation",
      "MHE Equipment: Forklift 3-5 Ton, Reach Truck",
    ],
    transport: [
      "Door-to-Door Transportation",
      "Cargo Loading and Unloading",
      "GPS Tracking System",
      "Real-time Status Update",
      "POD (Proof of Delivery)",
      "Vehicle Type: 10-Wheel Truck, 6-Wheel Truck, Van",
      "Service Hours: 24/7 Available",
    ],
    freight: [
      "FCL/LCL Consolidation",
      "Sea/Air Freight Booking",
      "Incoterms: FOB, CIF, EXW, DDP",
      "Customs Clearance Coordination",
      "Cargo Insurance Arrangement",
      "Container Types: 20'/40' Standard, Reefer",
      "Documentation: B/L, AWB, Packing List",
    ],
    crossborder: [
      "Cross-border Transportation",
      "Border Clearance Assistance",
      "Multi-country Routing",
      "Customs Broker Coordination",
      "Transit Time: 3-5 Days (Thailand-Laos)",
      "Required Documents: Form D, Invoice, Packing List",
      "Insurance Coverage: Full Cargo Value",
    ],
    customs: [
      "Import/Export Declaration",
      "HS Code Classification",
      "Tax and Duty Calculation",
      "License Application (FDA, MOC, etc.)",
      "Document Preparation and Submission",
      "Customs Inspection Coordination",
      "Green Lane / Fast Track Service",
    ],
  };

  const handleAddRateRow = () => {
    const newRow: RateRow = {
      id: Date.now().toString(),
      description: "",
      unit: "Trip",
      quantity: 1,
      unitPrice: 0,
      currency: "THB",
      amount: 0,
    };
    setRateRows([...rateRows, newRow]);
  };

  const handleDeleteRateRow = (id: string) => {
    setRateRows(rateRows.filter((row) => row.id !== id));
  };

  const handleRateRowChange = (id: string, field: keyof RateRow, value: any) => {
    setRateRows(
      rateRows.map((row) => {
        if (row.id === id) {
          const updatedRow = { ...row, [field]: value };
          if (field === "quantity" || field === "unitPrice") {
            updatedRow.amount = updatedRow.quantity * updatedRow.unitPrice;
          }
          return updatedRow;
        }
        return row;
      })
    );
  };

  const toggleRemark = (remarkId: string) => {
    if (selectedRemarks.includes(remarkId)) {
      setSelectedRemarks(selectedRemarks.filter((id) => id !== remarkId));
    } else {
      setSelectedRemarks([...selectedRemarks, remarkId]);
    }
  };

  const totalAmount = rateRows.reduce((sum, row) => sum + row.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Logistics Quotation Builder</h1>
              <p className="text-blue-200 text-sm">
                SCGJWD - Advanced Quotation Management System
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="bg-white text-blue-900 hover:bg-blue-50 border-0"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button
                variant="outline"
                className="bg-white text-blue-900 hover:bg-blue-50 border-0"
              >
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white border-0">
                <Send className="h-4 w-4 mr-2" />
                Send to Client
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar - Service Configurator */}
          <div className="col-span-12 lg:col-span-3">
            <Card className="sticky top-6 border-gray-200 shadow-md">
              <CardContent className="p-4">
                <h3 className="text-sm font-bold text-gray-900 mb-4">
                  Service Type
                </h3>
                <div className="space-y-2">
                  {services.map((service) => {
                    const Icon = service.icon;
                    const isSelected = selectedService === service.id;
                    return (
                      <button
                        key={service.id}
                        onClick={() => setSelectedService(service.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                          isSelected
                            ? "bg-blue-900 text-white shadow-lg scale-105"
                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg ${
                            isSelected ? "bg-white/20" : "bg-white"
                          }`}
                        >
                          <Icon
                            className={`h-5 w-5 ${
                              isSelected ? "text-white" : "text-blue-900"
                            }`}
                          />
                        </div>
                        <span className="text-sm font-semibold">
                          {service.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-gray-900">
                    Quick Actions
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-xs"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Load Template
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-xs"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Import Rates
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9 space-y-6">
            {/* Section 1: Header Module - Contract Details */}
            <Card className="border-gray-200 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-blue-900">
                    Contract Details
                  </h2>
                  <Badge className="bg-blue-100 text-blue-900 text-xs">
                    QT-2026-0001
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-xs font-semibold text-gray-700">
                      Quotation ID
                    </Label>
                    <Input
                      value="QT-2026-0001"
                      disabled
                      className="mt-1 bg-gray-50"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-700">
                      Issue Date
                    </Label>
                    <Input
                      type="date"
                      defaultValue="2026-02-20"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-700">
                      Effective Date
                    </Label>
                    <Input
                      type="date"
                      defaultValue="2026-03-01"
                      className="mt-1"
                    />
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-900">
                    Client Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs font-semibold text-gray-700">
                        Company Name *
                      </Label>
                      <Select
                        value={selectedClient}
                        onValueChange={setSelectedClient}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select client..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="siam-cement">
                            Siam Cement Group
                          </SelectItem>
                          <SelectItem value="cp-group">CP Group</SelectItem>
                          <SelectItem value="pttor">PTT Oil and Retail</SelectItem>
                          <SelectItem value="central">Central Group</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-gray-700">
                        Tax ID
                      </Label>
                      <Input
                        placeholder="Auto-filled from database"
                        className="mt-1 bg-gray-50"
                        value={selectedClient ? "0123456789012" : ""}
                        disabled
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-gray-700">
                        Contact Person *
                      </Label>
                      <Input
                        placeholder="Auto-filled from database"
                        className="mt-1 bg-gray-50"
                        value={selectedClient ? "Khun Somchai Logistics" : ""}
                        disabled
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-gray-700">
                        Position
                      </Label>
                      <Input
                        placeholder="Auto-filled from database"
                        className="mt-1 bg-gray-50"
                        value={selectedClient ? "Supply Chain Manager" : ""}
                        disabled
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-gray-700">
                        Email
                      </Label>
                      <Input
                        placeholder="Auto-filled from database"
                        className="mt-1 bg-gray-50"
                        value={
                          selectedClient ? "somchai.l@siamcement.com" : ""
                        }
                        disabled
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-gray-700">
                        Phone
                      </Label>
                      <Input
                        placeholder="Auto-filled from database"
                        className="mt-1 bg-gray-50"
                        value={selectedClient ? "+66 2 123 4567" : ""}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 2: Dynamic Product Info */}
            <Card className="border-gray-200 shadow-md">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-blue-900 mb-4">
                  Product Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Label className="text-xs font-semibold text-gray-700">
                      Product Type *
                    </Label>
                    <Select
                      value={productInfo.productType}
                      onValueChange={(value) =>
                        setProductInfo({ ...productInfo, productType: value })
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select product type..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Cargo</SelectItem>
                        <SelectItem value="dangerous">
                          Dangerous Goods
                        </SelectItem>
                        <SelectItem value="food">Food & Beverage</SelectItem>
                        <SelectItem value="pharma">Pharmaceutical</SelectItem>
                        <SelectItem value="cold-chain">Cold Chain</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-xs font-semibold text-gray-700">
                      Volume *
                    </Label>
                    <Input
                      type="number"
                      placeholder="Enter volume"
                      value={productInfo.volume}
                      onChange={(e) =>
                        setProductInfo({
                          ...productInfo,
                          volume: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-xs font-semibold text-gray-700">
                      UOM *
                    </Label>
                    <Select
                      value={productInfo.uom}
                      onValueChange={(value) =>
                        setProductInfo({ ...productInfo, uom: value })
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CBM">CBM (Cubic Meter)</SelectItem>
                        <SelectItem value="KG">KG (Kilogram)</SelectItem>
                        <SelectItem value="TON">Ton</SelectItem>
                        <SelectItem value="PALLET">Pallet</SelectItem>
                        <SelectItem value="CONTAINER">Container</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-xs font-semibold text-gray-700">
                      Temperature Control
                    </Label>
                    <Select
                      value={productInfo.temperatureControl}
                      onValueChange={(value) =>
                        setProductInfo({
                          ...productInfo,
                          temperatureControl: value,
                        })
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ambient">
                          Ambient (No Control)
                        </SelectItem>
                        <SelectItem value="chilled">
                          Chilled (2-8°C)
                        </SelectItem>
                        <SelectItem value="frozen">
                          Frozen (-18 to -25°C)
                        </SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {productInfo.temperatureControl === "custom" && (
                  <div className="mt-4">
                    <Label className="text-xs font-semibold text-gray-700">
                      Custom Temperature Range
                    </Label>
                    <Input
                      placeholder="e.g., 15-25°C"
                      value={productInfo.temperatureRange}
                      onChange={(e) =>
                        setProductInfo({
                          ...productInfo,
                          temperatureRange: e.target.value,
                        })
                      }
                      className="mt-1 max-w-xs"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Section 3: Smart Rate Table */}
            <Card className="border-gray-200 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-blue-900">
                    Rate & Pricing
                  </h2>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowFuelTable(!showFuelTable)}
                      className="text-xs"
                    >
                      <Fuel className="h-4 w-4 mr-2" />
                      Fuel Adjustment
                      {showFuelTable ? (
                        <ChevronUp className="h-4 w-4 ml-2" />
                      ) : (
                        <ChevronDown className="h-4 w-4 ml-2" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleAddRateRow}
                      className="bg-blue-900 hover:bg-blue-800 text-xs"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Line
                    </Button>
                  </div>
                </div>

                {/* Fuel Adjustment Table */}
                {showFuelTable && (
                  <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <h3 className="text-sm font-bold text-gray-900 mb-3">
                      Fuel Surcharge Reference Table
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-orange-200">
                            <th className="text-left p-2 font-semibold text-gray-700">
                              Diesel Price (THB/Liter)
                            </th>
                            <th className="text-right p-2 font-semibold text-gray-700">
                              Surcharge Adjustment
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {fuelReferenceData.map((row, index) => (
                            <tr
                              key={index}
                              className="border-b border-orange-100"
                            >
                              <td className="p-2 text-gray-700">
                                {row.dieselPrice}
                              </td>
                              <td className="p-2 text-right font-semibold text-orange-600">
                                {row.adjustment}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      * Reference: PTT Diesel Price Index, updated monthly
                    </p>
                  </div>
                )}

                {/* Rate Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-blue-900 bg-gray-50">
                        <th className="text-left p-3 font-semibold text-gray-700">
                          Description
                        </th>
                        <th className="text-center p-3 font-semibold text-gray-700 w-32">
                          Unit
                        </th>
                        <th className="text-right p-3 font-semibold text-gray-700 w-24">
                          Qty
                        </th>
                        <th className="text-right p-3 font-semibold text-gray-700 w-28">
                          Unit Price
                        </th>
                        <th className="text-center p-3 font-semibold text-gray-700 w-24">
                          Currency
                        </th>
                        <th className="text-right p-3 font-semibold text-gray-700 w-32">
                          Amount
                        </th>
                        <th className="w-12"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {rateRows.map((row) => (
                        <tr key={row.id} className="border-b border-gray-200">
                          <td className="p-3">
                            <Input
                              value={row.description}
                              onChange={(e) =>
                                handleRateRowChange(
                                  row.id,
                                  "description",
                                  e.target.value
                                )
                              }
                              placeholder="Enter description"
                              className="text-sm"
                            />
                          </td>
                          <td className="p-3">
                            <Select
                              value={row.unit}
                              onValueChange={(value) =>
                                handleRateRowChange(row.id, "unit", value)
                              }
                            >
                              <SelectTrigger className="text-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Trip">Trip</SelectItem>
                                <SelectItem value="CBM/Month">
                                  CBM/Month
                                </SelectItem>
                                <SelectItem value="Pallet/Month">
                                  Pallet/Month
                                </SelectItem>
                                <SelectItem value="KG">KG</SelectItem>
                                <SelectItem value="Container">
                                  Container
                                </SelectItem>
                                <SelectItem value="Shipment">
                                  Shipment
                                </SelectItem>
                                <SelectItem value="Document">
                                  Document
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="p-3">
                            <Input
                              type="number"
                              value={row.quantity}
                              onChange={(e) =>
                                handleRateRowChange(
                                  row.id,
                                  "quantity",
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="text-right text-sm"
                            />
                          </td>
                          <td className="p-3">
                            <Input
                              type="number"
                              value={row.unitPrice}
                              onChange={(e) =>
                                handleRateRowChange(
                                  row.id,
                                  "unitPrice",
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="text-right text-sm"
                            />
                          </td>
                          <td className="p-3">
                            <Select
                              value={row.currency}
                              onValueChange={(value) =>
                                handleRateRowChange(row.id, "currency", value)
                              }
                            >
                              <SelectTrigger className="text-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="THB">THB</SelectItem>
                                <SelectItem value="USD">USD</SelectItem>
                                <SelectItem value="EUR">EUR</SelectItem>
                                <SelectItem value="JPY">JPY</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="p-3 text-right font-semibold text-blue-900">
                            {row.amount.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </td>
                          <td className="p-3 text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteRateRow(row.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-blue-900 bg-blue-50">
                        <td
                          colSpan={5}
                          className="p-3 text-right font-bold text-gray-900"
                        >
                          Total Amount:
                        </td>
                        <td className="p-3 text-right font-bold text-blue-900 text-lg">
                          {totalAmount.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Section 4: Scope of Work Builder */}
            <Card className="border-gray-200 shadow-md">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-blue-900 mb-4">
                  Scope of Work
                </h2>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <ul className="space-y-2">
                    {scopeOfWorkTemplates[
                      selectedService as keyof typeof scopeOfWorkTemplates
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-1 h-2 w-2 rounded-full bg-blue-900 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                    Additional Remarks
                  </Label>
                  <textarea
                    className="w-full p-3 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-900"
                    rows={4}
                    placeholder="Add any additional scope details or special requirements..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Section 5: Conditional Remarks Library */}
            <Card className="border-gray-200 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-blue-900">
                    Terms & Conditions
                  </h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search terms..."
                      className="pl-10 w-64 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {remarksLibrary.map((remark) => (
                    <div
                      key={remark.id}
                      onClick={() => toggleRemark(remark.id)}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedRemarks.includes(remark.id)
                          ? "border-blue-900 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          <CheckSquare
                            className={`h-5 w-5 ${
                              selectedRemarks.includes(remark.id)
                                ? "text-blue-900"
                                : "text-gray-400"
                            }`}
                          />
                        </div>
                        <span className="text-sm text-gray-700">
                          {remark.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                    Custom Terms
                  </Label>
                  <textarea
                    className="w-full p-3 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-900"
                    rows={3}
                    placeholder="Add any custom terms and conditions..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Section 6: Dual-Signature Workflow */}
            <Card className="border-gray-200 shadow-md">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-blue-900 mb-4">
                  Signature & Approval
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Prepared By */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FileSignature className="h-5 w-5 text-blue-900" />
                      <h3 className="text-sm font-bold text-gray-900">
                        Prepared By (Sales)
                      </h3>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <Label className="text-xs font-semibold text-gray-700">
                          Full Name
                        </Label>
                        <Input
                          defaultValue="Somchai Logistics"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-semibold text-gray-700">
                          Position
                        </Label>
                        <Input
                          defaultValue="Senior Sales Executive"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-semibold text-gray-700">
                          Date
                        </Label>
                        <Input
                          type="date"
                          defaultValue="2026-02-20"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    {/* Signature Placeholder */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                      <FileSignature className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-500 mb-2">
                        Digital Signature
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        Sign Here
                      </Button>
                    </div>
                  </div>

                  {/* Accepted By */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FileSignature className="h-5 w-5 text-green-600" />
                      <h3 className="text-sm font-bold text-gray-900">
                        Accepted By (Customer)
                      </h3>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <Label className="text-xs font-semibold text-gray-700">
                          Full Name
                        </Label>
                        <Input
                          placeholder="Will be filled by customer"
                          className="mt-1 bg-gray-50"
                          disabled
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-semibold text-gray-700">
                          Position
                        </Label>
                        <Input
                          placeholder="Will be filled by customer"
                          className="mt-1 bg-gray-50"
                          disabled
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-semibold text-gray-700">
                          Date
                        </Label>
                        <Input
                          type="date"
                          className="mt-1 bg-gray-50"
                          disabled
                        />
                      </div>
                    </div>

                    {/* Signature Placeholder */}
                    <div className="border-2 border-dashed border-green-300 rounded-lg p-6 text-center bg-green-50">
                      <FileSignature className="h-8 w-8 text-green-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-500 mb-2">
                        Awaiting Customer Signature
                      </p>
                      <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                        Pending
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Footer Actions */}
            <div className="flex justify-between items-center p-6 bg-white rounded-lg border border-gray-200 shadow-md">
              <div className="text-sm text-gray-600">
                <p>
                  Total Amount: <span className="font-bold text-blue-900 text-lg">
                    {totalAmount.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })} THB
                  </span>
                </p>
                <p className="text-xs mt-1">
                  * All prices exclude 7% VAT unless stated
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="lg">
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-blue-900 text-blue-900 hover:bg-blue-50"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
                <Button
                  size="lg"
                  className="bg-blue-900 hover:bg-blue-800"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit Quotation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
