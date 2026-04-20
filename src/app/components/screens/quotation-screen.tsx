import { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  ChevronLeft,
  Save,
  Eye,
  Plus,
  Trash2,
  Building2,
  FileText,
  Calendar,
  DollarSign,
  Package,
  AlertCircle,
} from "lucide-react";

interface QuotationItem {
  id: string;
  itemName: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  discount: number; // percentage
}

export function QuotationScreen({ onBack }: { onBack: () => void }) {
  // Basic Information
  const [documentNumber, setDocumentNumber] = useState(`QT${new Date().getFullYear()}${String(Date.now()).slice(-6)}`);
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);
  const [validity, setValidity] = useState(30); // days
  const [currency, setCurrency] = useState("THB");
  const [includeVat, setIncludeVat] = useState(true);
  const [globalDiscount, setGlobalDiscount] = useState(0);
  const [globalDiscountType, setGlobalDiscountType] = useState<"percent" | "amount">("percent");
  const [paymentTerm, setPaymentTerm] = useState("30");
  const [remarks, setRemarks] = useState("1. ราคาดังกล่าวยังไม่รวมภาษีมูลค่าเพิ่ม 7%\n2. ใบเสนอราคานี้มีอายุ 30 วัน นับจากวันที่ออกเอกสาร\n3. เงื่อนไขการชำระเงิน: เครดิต 30 วัน หลังวันที่ออกใบกำกับภาษี");

  // Customer Information
  const [customerCompany, setCustomerCompany] = useState("");
  const [customerContact, setCustomerContact] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  // Line Items
  const [items, setItems] = useState<QuotationItem[]>([
    {
      id: "1",
      itemName: "",
      description: "",
      quantity: 1,
      unit: "ชุด",
      unitPrice: 0,
      discount: 0,
    },
  ]);

  // Calculate Due Date
  const calculateDueDate = () => {
    if (!issueDate || !validity) return "";
    const date = new Date(issueDate);
    date.setDate(date.getDate() + validity);
    return date.toISOString().split('T')[0];
  };

  // Format date to DD/MM/YYYY
  const formatDateThai = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear() + 543; // Thai year
    return `${day}/${month}/${year}`;
  };

  // Calculate line total
  const calculateLineTotal = (item: QuotationItem) => {
    const subtotal = item.quantity * item.unitPrice;
    const discountAmount = subtotal * (item.discount / 100);
    return subtotal - discountAmount;
  };

  // Calculate subtotal
  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + calculateLineTotal(item), 0);
  };

  // Calculate total line discount
  const calculateTotalLineDiscount = () => {
    return items.reduce((sum, item) => {
      const subtotal = item.quantity * item.unitPrice;
      const discountAmount = subtotal * (item.discount / 100);
      return sum + discountAmount;
    }, 0);
  };

  // Calculate global discount amount
  const calculateGlobalDiscountAmount = () => {
    const subtotal = calculateSubtotal();
    if (globalDiscountType === "percent") {
      return subtotal * (globalDiscount / 100);
    }
    return globalDiscount;
  };

  // Calculate net total
  const calculateNetTotal = () => {
    const subtotal = calculateSubtotal();
    const globalDiscountAmount = calculateGlobalDiscountAmount();
    return subtotal - globalDiscountAmount;
  };

  // Calculate VAT
  const calculateVat = () => {
    if (!includeVat) return 0;
    return calculateNetTotal() * 0.07;
  };

  // Calculate grand total
  const calculateGrandTotal = () => {
    return calculateNetTotal() + calculateVat();
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    if (currency === "THB") {
      return `฿${amount.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Add item
  const handleAddItem = () => {
    const newItem: QuotationItem = {
      id: Date.now().toString(),
      itemName: "",
      description: "",
      quantity: 1,
      unit: "ชุด",
      unitPrice: 0,
      discount: 0,
    };
    setItems([...items, newItem]);
  };

  // Remove item
  const handleRemoveItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  // Update item
  const handleItemChange = (id: string, field: keyof QuotationItem, value: any) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // Validation
  const validateForm = () => {
    if (!customerCompany.trim()) {
      alert("กรุณากรอกชื่อบริษัทลูกค้า");
      return false;
    }
    if (!customerAddress.trim()) {
      alert("กรุณากรอกที่อยู่ลูกค้า");
      return false;
    }
    if (!issueDate) {
      alert("กรุณาเลือกวันที่ออกเอกสาร");
      return false;
    }
    if (!validity || validity <= 0) {
      alert("กรุณากรอกระยะเวลาใช้งานเอกสาร");
      return false;
    }
    const hasValidItem = items.some(
      (item) => item.itemName.trim() !== "" && item.quantity > 0 && item.unitPrice > 0
    );
    if (!hasValidItem) {
      alert("กรุณากรอกรายการสินค้า/บริการอย่างน้อย 1 รายการ");
      return false;
    }
    return true;
  };

  // Save draft
  const handleSaveDraft = () => {
    if (!validateForm()) return;
    console.log("Saving draft...");
    alert("บันทึกแบบร่างเรียบร้อย");
  };

  // Preview
  const handlePreview = () => {
    if (!validateForm()) return;
    // TODO: Navigate to preview screen
    console.log("Opening preview...");
    alert("เปิดหน้า Preview (ยังไม่ได้เชื่อมต่อ)");
  };

  return (
    <div className="p-2 sm:p-3 lg:p-4 bg-gray-50 min-h-screen">
      <div className="max-w-[1400px] mx-auto space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="h-9 px-3"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              ย้อนกลับ
            </Button>
            <div>
              <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">
                สร้างใบเสนอราคา
              </h1>
              <p className="text-[10px] sm:text-xs text-gray-500">
                กรอกข้อมูลใบเสนอราคาตามฟอร์ม
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveDraft}
              className="h-9 px-4"
            >
              <Save className="h-4 w-4 mr-1.5" />
              บันทึกแบบร่าง
            </Button>
            <Button
              size="sm"
              onClick={handlePreview}
              className="h-9 px-4 bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Eye className="h-4 w-4 mr-1.5" />
              ดูตัวอย่าง
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Left Column - Main Form */}
          <div className="lg:col-span-2 space-y-3">
            {/* Basic Information */}
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-purple-600" />
                  <h2 className="text-sm font-semibold text-gray-900">
                    ข้อมูลเอกสาร
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <Label className="text-xs font-medium text-gray-700 mb-1.5 block">
                      เลขที่เอกสาร
                    </Label>
                    <Input
                      value={documentNumber}
                      onChange={(e) => setDocumentNumber(e.target.value)}
                      className="h-9 text-xs"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-700 mb-1.5 block">
                      วันที่ออกเอกสาร <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="date"
                      value={issueDate}
                      onChange={(e) => setIssueDate(e.target.value)}
                      className="h-9 text-xs"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-700 mb-1.5 block">
                      อายุเอกสาร (วัน) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="number"
                      value={validity}
                      onChange={(e) => setValidity(parseInt(e.target.value) || 0)}
                      className="h-9 text-xs"
                      min="1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                  <div>
                    <Label className="text-xs font-medium text-gray-700 mb-1.5 block">
                      เงื่อนไขการชำระเงิน
                    </Label>
                    <Select value={paymentTerm} onValueChange={setPaymentTerm}>
                      <SelectTrigger className="h-9 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">เงินสด</SelectItem>
                        <SelectItem value="7">เครดิต 7 วัน</SelectItem>
                        <SelectItem value="15">เครดิต 15 วัน</SelectItem>
                        <SelectItem value="30">เครดิต 30 วัน</SelectItem>
                        <SelectItem value="45">เครดิต 45 วัน</SelectItem>
                        <SelectItem value="60">เครดิต 60 วัน</SelectItem>
                        <SelectItem value="90">เครดิต 90 วัน</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-700 mb-1.5 block">
                      สกุลเงิน
                    </Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger className="h-9 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="THB">บาท (THB)</SelectItem>
                        <SelectItem value="USD">ดอลลาร์ (USD)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-700 mb-1.5 block">
                      ภาษีมูลค่าเพิ่ม
                    </Label>
                    <Select
                      value={includeVat ? "include" : "exclude"}
                      onValueChange={(val) => setIncludeVat(val === "include")}
                    >
                      <SelectTrigger className="h-9 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="include">รวม VAT 7%</SelectItem>
                        <SelectItem value="exclude">ไม่รวม VAT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-3">
                  <Label className="text-xs font-medium text-gray-700 mb-1.5 block">
                    หมายเหตุ / เงื่อนไข
                  </Label>
                  <textarea
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-lg text-xs resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows={4}
                    placeholder="กรอกหมายเหตุหรือเงื่อนไขเพิ่มเติม..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="h-5 w-5 text-purple-600" />
                  <h2 className="text-sm font-semibold text-gray-900">
                    ข้อมูลลูกค้า
                  </h2>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label className="text-xs font-medium text-gray-700 mb-1.5 block">
                      ชื่อบริษัท <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={customerCompany}
                      onChange={(e) => setCustomerCompany(e.target.value)}
                      placeholder="บริษัท ตัวอย่าง จำกัด"
                      className="h-9 text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs font-medium text-gray-700 mb-1.5 block">
                        ชื่อผู้ติดต่อ
                      </Label>
                      <Input
                        value={customerContact}
                        onChange={(e) => setCustomerContact(e.target.value)}
                        placeholder="คุณสมชาย ใจดี"
                        className="h-9 text-xs"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-gray-700 mb-1.5 block">
                        เบอร์โทร
                      </Label>
                      <Input
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="02-xxx-xxxx"
                        className="h-9 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs font-medium text-gray-700 mb-1.5 block">
                      อีเมล
                    </Label>
                    <Input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="email@company.com"
                      className="h-9 text-xs"
                    />
                  </div>

                  <div>
                    <Label className="text-xs font-medium text-gray-700 mb-1.5 block">
                      ที่อยู่ <span className="text-red-500">*</span>
                    </Label>
                    <textarea
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full p-2.5 border border-gray-300 rounded-lg text-xs resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={3}
                      placeholder="123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Line Items */}
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-purple-600" />
                    <h2 className="text-sm font-semibold text-gray-900">
                      รายการสินค้า/บริการ
                    </h2>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleAddItem}
                    className="h-8 px-3 text-xs"
                  >
                    <Plus className="h-3.5 w-3.5 mr-1" />
                    เพิ่มรายการ
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left p-2 font-medium text-gray-700 w-8">
                          #
                        </th>
                        <th className="text-left p-2 font-medium text-gray-700">
                          ชื่อรายการ *
                        </th>
                        <th className="text-left p-2 font-medium text-gray-700">
                          รายละเอียด
                        </th>
                        <th className="text-center p-2 font-medium text-gray-700 w-20">
                          จำนวน
                        </th>
                        <th className="text-center p-2 font-medium text-gray-700 w-24">
                          หน่วย
                        </th>
                        <th className="text-right p-2 font-medium text-gray-700 w-28">
                          ราคา/หน่วย
                        </th>
                        <th className="text-right p-2 font-medium text-gray-700 w-20">
                          ส่วนลด %
                        </th>
                        <th className="text-right p-2 font-medium text-gray-700 w-32">
                          รวม
                        </th>
                        <th className="w-10"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                        <tr key={item.id} className="border-b border-gray-100">
                          <td className="p-2 text-gray-500">{index + 1}</td>
                          <td className="p-2">
                            <Input
                              value={item.itemName}
                              onChange={(e) =>
                                handleItemChange(item.id, "itemName", e.target.value)
                              }
                              placeholder="ชื่อสินค้า/บริการ"
                              className="h-8 text-xs"
                            />
                          </td>
                          <td className="p-2">
                            <Input
                              value={item.description}
                              onChange={(e) =>
                                handleItemChange(item.id, "description", e.target.value)
                              }
                              placeholder="รายละเอียดเพิ่มเติม"
                              className="h-8 text-xs"
                            />
                          </td>
                          <td className="p-2">
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                handleItemChange(
                                  item.id,
                                  "quantity",
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="h-8 text-xs text-center"
                              min="0"
                            />
                          </td>
                          <td className="p-2">
                            <Select
                              value={item.unit}
                              onValueChange={(value) =>
                                handleItemChange(item.id, "unit", value)
                              }
                            >
                              <SelectTrigger className="h-8 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ชุด">ชุด</SelectItem>
                                <SelectItem value="กล่อง">กล่อง</SelectItem>
                                <SelectItem value="ชิ้น">ชิ้น</SelectItem>
                                <SelectItem value="อัน">อัน</SelectItem>
                                <SelectItem value="เครื่อง">เครื่อง</SelectItem>
                                <SelectItem value="CBM">CBM</SelectItem>
                                <SelectItem value="Pallet">Pallet</SelectItem>
                                <SelectItem value="Trip">Trip</SelectItem>
                                <SelectItem value="KG">KG</SelectItem>
                                <SelectItem value="Container">Container</SelectItem>
                                <SelectItem value="Shipment">Shipment</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="p-2">
                            <Input
                              type="number"
                              value={item.unitPrice}
                              onChange={(e) =>
                                handleItemChange(
                                  item.id,
                                  "unitPrice",
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="h-8 text-xs text-right"
                              min="0"
                              step="0.01"
                            />
                          </td>
                          <td className="p-2">
                            <Input
                              type="number"
                              value={item.discount}
                              onChange={(e) =>
                                handleItemChange(
                                  item.id,
                                  "discount",
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="h-8 text-xs text-right"
                              min="0"
                              max="100"
                            />
                          </td>
                          <td className="p-2 text-right font-medium text-gray-900">
                            {formatCurrency(calculateLineTotal(item))}
                          </td>
                          <td className="p-2 text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveItem(item.id)}
                              disabled={items.length === 1}
                              className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Global Discount */}
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="h-5 w-5 text-purple-600" />
                  <h2 className="text-sm font-semibold text-gray-900">
                    ส่วนลดรวม (ถ้ามี)
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs font-medium text-gray-700 mb-1.5 block">
                      ประเภท
                    </Label>
                    <Select
                      value={globalDiscountType}
                      onValueChange={(val: any) => setGlobalDiscountType(val)}
                    >
                      <SelectTrigger className="h-9 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percent">เปอร์เซ็นต์ (%)</SelectItem>
                        <SelectItem value="amount">จำนวนเงิน</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-700 mb-1.5 block">
                      มูลค่า
                    </Label>
                    <Input
                      type="number"
                      value={globalDiscount}
                      onChange={(e) => setGlobalDiscount(parseFloat(e.target.value) || 0)}
                      className="h-9 text-xs"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-3">
              {/* Document Info */}
              <Card className="border-purple-200 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    <h2 className="text-sm font-semibold text-gray-900">
                      ข้อมูลสรุป
                    </h2>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">เลขที่:</span>
                      <span className="font-medium text-gray-900">{documentNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">วันที่ออก:</span>
                      <span className="font-medium text-gray-900">{formatDateThai(issueDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ครบกำหนด:</span>
                      <span className="font-medium text-gray-900">{formatDateThai(calculateDueDate())}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">อายุเอกสาร:</span>
                      <span className="font-medium text-gray-900">{validity} วัน</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Summary Card */}
              <Card className="border-purple-200 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="h-5 w-5 text-purple-600" />
                    <h2 className="text-sm font-semibold text-gray-900">
                      สรุปยอดรวม
                    </h2>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">ยอดรวมก่อนหักส่วนลด</span>
                      <span className="font-medium text-gray-900">
                        {formatCurrency(calculateSubtotal())}
                      </span>
                    </div>

                    {calculateTotalLineDiscount() > 0 && (
                      <div className="flex justify-between text-red-600">
                        <span>ส่วนลดรายการ</span>
                        <span>-{formatCurrency(calculateTotalLineDiscount())}</span>
                      </div>
                    )}

                    {globalDiscount > 0 && (
                      <div className="flex justify-between text-red-600">
                        <span>ส่วนลดรวม</span>
                        <span>-{formatCurrency(calculateGlobalDiscountAmount())}</span>
                      </div>
                    )}

                    <Separator />

                    <div className="flex justify-between">
                      <span className="text-gray-600">ยอดรวมหลังหักส่วนลด</span>
                      <span className="font-medium text-gray-900">
                        {formatCurrency(calculateNetTotal())}
                      </span>
                    </div>

                    {includeVat && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">ภาษีมูลค่าเพิ่ม 7%</span>
                        <span className="font-medium text-gray-900">
                          {formatCurrency(calculateVat())}
                        </span>
                      </div>
                    )}

                    <Separator />

                    <div className="flex justify-between p-2 bg-purple-50 rounded-lg">
                      <span className="font-semibold text-gray-900">
                        ยอดรวมทั้งสิ้น
                      </span>
                      <span className="text-lg font-bold text-purple-600">
                        {formatCurrency(calculateGrandTotal())}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Validation Alert */}
              <Card className="border-orange-200 bg-orange-50 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5" />
                    <div className="text-xs text-orange-800">
                      <p className="font-medium mb-1">กรุณาตรวจสอบ</p>
                      <ul className="space-y-0.5 list-disc list-inside text-[10px]">
                        <li>กรอกข้อมูลลูกค้าให้ครบถ้วน</li>
                        <li>ตรวจสอบรายการสินค้า/บริการ</li>
                        <li>ตรวจสอบยอดเงินให้ถูกต้อง</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
