import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  Edit,
  Download,
  Send,
  Printer,
  CheckCircle2,
  Clock,
  FileText,
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Package,
  Plus,
  Trash2,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { toast } from "sonner";

// Contract Editor Screen - Using mini CRM Brand Green (#7BC9A6)
interface ContractEditorScreenProps {
  contractId?: string;
  onNavigate: (path: string, id?: string) => void;
}

export function ContractEditorScreen({
  contractId,
  onNavigate,
}: ContractEditorScreenProps) {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);

  // Mock data - ในระบบจริงจะดึงจาก API
  const [contract, setContract] = useState({
    id: contractId || "CNT-2024-001",
    documentNumber: "CNT2024123456",
    contractNumber: "GFS-2024-AIR-001",
    name: "International Air Freight Master Agreement",
    customer: {
      company: "Global Freight Solutions Inc.",
      contact: "Mr. Robert Johnson",
      email: "robert.j@globalfreight.com",
      phone: "+66 2 456 7890",
      address:
        "555 Business Tower, Sukhumvit Road, Bangkok 10110, Thailand",
      taxId: "0105558765432",
    },
    dealId: "DL-2024-167",
    status: "Active",
    startDate: "2024-01-15",
    endDate: "2026-01-14",
    duration: "24",
    createdDate: "15 ม.ค. 2567",
    createdBy: {
      name: "Sarah Chen",
      initials: "SC",
      userId: "user1",
    },
    currency: "THB",
    includeVat: true,
    paymentTerm: "30",
    autoRenewal: true,
    remarks:
      "1. ข้อกำหนดและเงื่อนไข\n   1.1 สัญญานี้มีผลบังคับใช้ตั้งแต่วันที่ 15 มกราคม 2567 ถึงวันที่ 14 มกราคม 2569\n   1.2 ระยะเวลาสัญญา 24 เดือน พร้อมต่ออายุอัตโนมัติ\n   1.3 เงื่อนไขการชำระเงิน: เครดิต 30 วัน หลังวันที่ออกใบกำกับภาษี\n\n2. ขอบเขตการให้บริการ\n   2.1 บริการขนส่งทางอากาศระหว่างประเทศ\n   2.2 บริการพิธีการศุลกากร\n   2.3 บริการประกันภัยสินค้า\n\n3. มูลค่าและค่าบริการ\n   3.1 มูลค่าสัญญารวม 7,350,000 บาท (รวม VAT)\n   3.2 การชำระเงินเป็นรายเดือน\n   3.3 ราคาคงที่ตลอดระยะเวลาสัญญา\n\n4. การยกเลิกสัญญา\n   4.1 แจ้งล่วงหน้าอย่างน้อย 60 วัน\n   4.2 เสียค่าปรับกรณียกเลิกก่อนกำหนด\n\n5. ความรับผิดชอบ\n   5.1 รับประกันการส่งมอบตรงเวลา 99.5%\n   5.2 ประกันภัยสินค้าครบถ้วน\n   5.3 ชดเชยความเสียหายตามเงื่อนไข",
    items: [
      {
        id: "1",
        itemName: "บริการขนส่งทางอากาศ (Air Freight)",
        description:
          "ขนส่งสินค้าทางอากาศระหว่างประเทศ - ปริมาณ 1,000 kg/เดือน",
        quantity: 24,
        unit: "เดือน",
        unitPrice: 250000,
        discount: 0,
      },
      {
        id: "2",
        itemName: "บริการพิธีการศุลกากร",
        description: "ดำเนินการศุลกากรนำเข้า-ส่งออก รวมเอกสาร",
        quantity: 24,
        unit: "เดือน",
        unitPrice: 50000,
        discount: 0,
      },
      {
        id: "3",
        itemName: "ค่าประกันภัยสินค้า",
        description:
          "ประกันภัยสินค้าระหว่างการขนส่ง ครอบคลุมเต็มมูลค่า",
        quantity: 24,
        unit: "เดือน",
        unitPrice: 12500,
        discount: 5,
      },
    ],
    sla: [
      "รับประกันการส่งมอบตรงเวลา 99.5%",
      "ระบบติดตามสินค้าแบบ Real-time 24/7",
      "บริการดูแลลูกค้าตลอด 24 ชั่วโมง",
      "ตอบสนองปัญหาภายใน 4 ชั่วโมง",
    ],
    globalDiscount: 2,
    globalDiscountType: "percent" as "percent" | "amount",
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700 border-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Expired":
        return "bg-red-100 text-red-700 border-red-200";
      case "Draft":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <CheckCircle2 className="h-4 w-4" />;
      case "Pending":
        return <Clock className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const formatCurrency = (amount: number) => {
    if (contract.currency === "THB") {
      return `฿${amount.toLocaleString("th-TH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }
    return `$${amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const calculateLineTotal = (item: any) => {
    const subtotal = item.quantity * item.unitPrice;
    const discountAmount = subtotal * (item.discount / 100);
    return subtotal - discountAmount;
  };

  const calculateSubtotal = () => {
    return contract.items.reduce(
      (sum, item) => sum + calculateLineTotal(item),
      0
    );
  };

  const calculateGlobalDiscountAmount = () => {
    const subtotal = calculateSubtotal();
    if (contract.globalDiscountType === "percent") {
      return subtotal * (contract.globalDiscount / 100);
    }
    return contract.globalDiscount;
  };

  const calculateNetTotal = () => {
    const subtotal = calculateSubtotal();
    const globalDiscountAmount = calculateGlobalDiscountAmount();
    return subtotal - globalDiscountAmount;
  };

  const calculateVat = () => {
    if (!contract.includeVat) return 0;
    return calculateNetTotal() * 0.07;
  };

  const calculateGrandTotal = () => {
    return calculateNetTotal() + calculateVat();
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      toast.success("บันทึกการแก้ไขเรียบร้อย");
    }
  };

  const handleBack = () => {
    onNavigate("/proposals-contracts");
  };

  const handlePreview = () => {
    onNavigate("/contract-preview", contract.id);
  };

  const updateCustomer = (field: string, value: string) => {
    setContract({
      ...contract,
      customer: {
        ...contract.customer,
        [field]: value,
      },
    });
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...contract.items];
    newItems[index] = {
      ...newItems[index],
      [field]: value,
    };
    setContract({
      ...contract,
      items: newItems,
    });
  };

  const addItem = () => {
    const newItem = {
      id: Date.now().toString(),
      itemName: "",
      description: "",
      quantity: 1,
      unit: "เดือน",
      unitPrice: 0,
      discount: 0,
    };
    setContract({
      ...contract,
      items: [...contract.items, newItem],
    });
    toast.success("เพิ่มรายการเรียบร้อย");
  };

  const removeItem = (index: number) => {
    const newItems = contract.items.filter((_, i) => i !== index);
    setContract({
      ...contract,
      items: newItems,
    });
    toast.success("ลบรายการเรียบร้อย");
  };

  const updateSLA = (index: number, value: string) => {
    const newSLA = [...contract.sla];
    newSLA[index] = value;
    setContract({
      ...contract,
      sla: newSLA,
    });
  };

  const addSLA = () => {
    setContract({
      ...contract,
      sla: [...contract.sla, ""],
    });
  };

  const removeSLA = (index: number) => {
    const newSLA = contract.sla.filter((_, i) => i !== index);
    setContract({
      ...contract,
      sla: newSLA,
    });
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
              onClick={handleBack}
              className="h-9 w-9 p-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">
                {contract.name}
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                {contract.contractNumber}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className={`h-9 px-3 text-xs ${
                isEditing
                  ? "bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                  : ""
              }`}
              onClick={handleEdit}
            >
              <Edit className="h-3.5 w-3.5 mr-1.5" />
              {isEditing ? "บันทึก" : "แก้ไข"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-3 text-xs bg-[#7BC9A6] hover:bg-[#6AB896] text-white border-[#7BC9A6]"
              onClick={handlePreview}
            >
              <FileText className="h-3.5 w-3.5 mr-1.5" />
              ดูตัวอย่างเอกสาร
            </Button>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className={`${getStatusColor(contract.status)} text-xs px-3 py-1 font-medium border`}
          >
            <span className="flex items-center gap-1.5">
              {getStatusIcon(contract.status)}
              {contract.status}
            </span>
          </Badge>
          <span className="text-xs text-gray-500">
            สร้างโดย {contract.createdBy.name} • {contract.createdDate}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-3">
            {/* Contract Info */}
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-[#7BC9A6]" />
                  <h2 className="text-sm font-semibold text-gray-900">
                    ข้อมูลสัญญา
                  </h2>
                </div>

                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs">เลขที่สัญญา</Label>
                      <Input
                        value={contract.contractNumber}
                        onChange={(e) =>
                          setContract({
                            ...contract,
                            contractNumber: e.target.value,
                          })
                        }
                        className="mt-1 text-xs h-8"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs">วันที่เริ่มสัญญา</Label>
                        <Input
                          type="date"
                          value={contract.startDate}
                          onChange={(e) =>
                            setContract({
                              ...contract,
                              startDate: e.target.value,
                            })
                          }
                          className="mt-1 text-xs h-8"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">วันที่สิ้นสุดสัญญา</Label>
                        <Input
                          type="date"
                          value={contract.endDate}
                          onChange={(e) =>
                            setContract({
                              ...contract,
                              endDate: e.target.value,
                            })
                          }
                          className="mt-1 text-xs h-8"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs">ระยะเวลา (เดือน)</Label>
                        <Input
                          type="number"
                          value={contract.duration}
                          onChange={(e) =>
                            setContract({
                              ...contract,
                              duration: e.target.value,
                            })
                          }
                          className="mt-1 text-xs h-8"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">เงื่อนไขชำระเงิน</Label>
                        <Select
                          value={contract.paymentTerm}
                          onValueChange={(value) =>
                            setContract({ ...contract, paymentTerm: value })
                          }
                        >
                          <SelectTrigger className="mt-1 text-xs h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">เงินสด</SelectItem>
                            <SelectItem value="7">เครดิต 7 วัน</SelectItem>
                            <SelectItem value="15">เครดิต 15 วัน</SelectItem>
                            <SelectItem value="30">เครดิต 30 วัน</SelectItem>
                            <SelectItem value="45">เครดิต 45 วัน</SelectItem>
                            <SelectItem value="60">เครดิต 60 วัน</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="autoRenewal"
                        checked={contract.autoRenewal}
                        onCheckedChange={(checked) =>
                          setContract({
                            ...contract,
                            autoRenewal: checked as boolean,
                          })
                        }
                      />
                      <Label
                        htmlFor="autoRenewal"
                        className="text-xs font-medium cursor-pointer flex items-center gap-2"
                      >
                        <RefreshCw className="h-4 w-4 text-[#7BC9A6]" />
                        ต่ออายุอัตโนมัติ
                      </Label>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <p className="text-[10px] text-gray-500 mb-1">
                        เลขที่สัญญา
                      </p>
                      <p className="text-xs font-medium text-gray-900">
                        {contract.contractNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 mb-1">
                        วันที่เริ่มสัญญา
                      </p>
                      <p className="text-xs font-medium text-gray-900">
                        {new Date(contract.startDate).toLocaleDateString(
                          "th-TH",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 mb-1">
                        วันที่สิ้นสุด
                      </p>
                      <p className="text-xs font-medium text-gray-900">
                        {new Date(contract.endDate).toLocaleDateString(
                          "th-TH",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 mb-1">
                        ระยะเวลา
                      </p>
                      <p className="text-xs font-medium text-gray-900">
                        {contract.duration} เดือน
                        {contract.autoRenewal && (
                          <span className="ml-1 text-[#7BC9A6]">
                            (ต่ออายุอัตโนมัติ)
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Customer Info */}
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="h-5 w-5 text-[#7BC9A6]" />
                  <h2 className="text-sm font-semibold text-gray-900">
                    คู่สัญญา (ลูกค้า)
                  </h2>
                </div>

                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs">ชื่อบริษัท</Label>
                      <Input
                        value={contract.customer.company}
                        onChange={(e) =>
                          updateCustomer("company", e.target.value)
                        }
                        className="mt-1 text-xs h-8"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs">ผู้ติดต่อ</Label>
                        <Input
                          value={contract.customer.contact}
                          onChange={(e) =>
                            updateCustomer("contact", e.target.value)
                          }
                          className="mt-1 text-xs h-8"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">เบอร์โทร</Label>
                        <Input
                          value={contract.customer.phone}
                          onChange={(e) =>
                            updateCustomer("phone", e.target.value)
                          }
                          className="mt-1 text-xs h-8"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs">อีเมล</Label>
                      <Input
                        type="email"
                        value={contract.customer.email}
                        onChange={(e) =>
                          updateCustomer("email", e.target.value)
                        }
                        className="mt-1 text-xs h-8"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">ที่อยู่</Label>
                      <Textarea
                        value={contract.customer.address}
                        onChange={(e) =>
                          updateCustomer("address", e.target.value)
                        }
                        rows={2}
                        className="mt-1 text-xs"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">เลขประจำตัวผู้เสียภาษี</Label>
                      <Input
                        value={contract.customer.taxId}
                        onChange={(e) =>
                          updateCustomer("taxId", e.target.value)
                        }
                        className="mt-1 text-xs h-8"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Building2 className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-gray-900">
                          {contract.customer.company}
                        </p>
                        <p className="text-[10px] text-gray-500 mt-0.5">
                          เลขที่ผู้เสียภาษี: {contract.customer.taxId}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <User className="h-4 w-4 text-gray-400 mt-0.5" />
                      <p className="text-xs text-gray-600">
                        {contract.customer.contact}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Mail className="h-4 w-4 text-gray-400 mt-0.5" />
                      <p className="text-xs text-gray-600">
                        {contract.customer.email}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone className="h-4 w-4 text-gray-400 mt-0.5" />
                      <p className="text-xs text-gray-600">
                        {contract.customer.phone}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                      <p className="text-xs text-gray-600">
                        {contract.customer.address}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Line Items */}
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-[#7BC9A6]" />
                    <h2 className="text-sm font-semibold text-gray-900">
                      ขอบเขตการให้บริการ
                    </h2>
                  </div>
                  {isEditing && (
                    <Button
                      size="sm"
                      onClick={addItem}
                      className="h-7 px-2 text-xs bg-[#7BC9A6] hover:bg-[#6AB896]"
                    >
                      <Plus className="h-3.5 w-3.5 mr-1" />
                      เพิ่ม
                    </Button>
                  )}
                </div>

                <div className="space-y-3">
                  {contract.items.map((item, index) => (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-lg p-3"
                    >
                      {isEditing ? (
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 space-y-2">
                              <Input
                                placeholder="ชื่อบริการ"
                                value={item.itemName}
                                onChange={(e) =>
                                  updateItem(index, "itemName", e.target.value)
                                }
                                className="text-xs h-8"
                              />
                              <Input
                                placeholder="คำอธิบาย"
                                value={item.description}
                                onChange={(e) =>
                                  updateItem(
                                    index,
                                    "description",
                                    e.target.value
                                  )
                                }
                                className="text-xs h-8"
                              />
                            </div>
                            {contract.items.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(index)}
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          <div className="grid grid-cols-5 gap-2">
                            <Input
                              type="number"
                              placeholder="จำนวน"
                              value={item.quantity}
                              onChange={(e) =>
                                updateItem(
                                  index,
                                  "quantity",
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="text-xs h-8"
                            />
                            <Input
                              placeholder="หน่วย"
                              value={item.unit}
                              onChange={(e) =>
                                updateItem(index, "unit", e.target.value)
                              }
                              className="text-xs h-8"
                            />
                            <Input
                              type="number"
                              placeholder="ราคา/หน่วย"
                              value={item.unitPrice}
                              onChange={(e) =>
                                updateItem(
                                  index,
                                  "unitPrice",
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="text-xs h-8"
                            />
                            <Input
                              type="number"
                              placeholder="ส่วนลด %"
                              value={item.discount}
                              onChange={(e) =>
                                updateItem(
                                  index,
                                  "discount",
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="text-xs h-8"
                            />
                            <Input
                              value={formatCurrency(calculateLineTotal(item))}
                              disabled
                              className="text-xs h-8 bg-gray-50"
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <p className="text-xs font-medium text-gray-900">
                                {index + 1}. {item.itemName}
                              </p>
                              {item.description && (
                                <p className="text-[10px] text-gray-500 mt-0.5">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-4 gap-2 text-[10px] text-gray-600 mt-2">
                            <div>
                              <span className="text-gray-500">จำนวน:</span>{" "}
                              <span className="font-medium text-gray-900">
                                {item.quantity} {item.unit}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500">ราคา/หน่วย:</span>{" "}
                              <span className="font-medium text-gray-900">
                                {formatCurrency(item.unitPrice)}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500">ส่วนลด:</span>{" "}
                              <span className="font-medium text-gray-900">
                                {item.discount}%
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-gray-500">รวม:</span>{" "}
                              <span className="font-semibold text-gray-900">
                                {formatCurrency(calculateLineTotal(item))}
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* SLA */}
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-[#7BC9A6]" />
                    <h2 className="text-sm font-semibold text-gray-900">
                      Service Level Agreement (SLA)
                    </h2>
                  </div>
                  {isEditing && (
                    <Button
                      size="sm"
                      onClick={addSLA}
                      variant="outline"
                      className="h-7 px-2 text-xs"
                    >
                      <Plus className="h-3.5 w-3.5 mr-1" />
                      เพิ่ม
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  {contract.sla.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {isEditing ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-[#7BC9A6] flex-shrink-0" />
                          <Input
                            value={item}
                            onChange={(e) => updateSLA(index, e.target.value)}
                            className="flex-1 text-xs h-8"
                          />
                          {contract.sla.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSLA(index)}
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-[#7BC9A6] flex-shrink-0" />
                          <p className="text-xs text-gray-700">{item}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Terms & Conditions */}
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <h2 className="text-sm font-semibold text-gray-900 mb-2">
                  ข้อกำหนดและเงื่อนไขสัญญา
                </h2>
                {isEditing ? (
                  <Textarea
                    value={contract.remarks}
                    onChange={(e) =>
                      setContract({ ...contract, remarks: e.target.value })
                    }
                    rows={12}
                    className="text-xs font-mono"
                  />
                ) : (
                  <p className="text-xs text-gray-600 whitespace-pre-line">
                    {contract.remarks}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-3">
              {/* Summary Card */}
              <Card className="border-gray-200 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="h-5 w-5 text-[#7BC9A6]" />
                    <h2 className="text-sm font-semibold text-gray-900">
                      มูลค่าสัญญา
                    </h2>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        ยอดรวมก่อนหักส่วนลด
                      </span>
                      <span className="font-medium text-gray-900">
                        {formatCurrency(calculateSubtotal())}
                      </span>
                    </div>

                    {contract.globalDiscount > 0 && (
                      <div className="flex justify-between text-red-600">
                        <span>
                          ส่วนลดรวม (
                          {contract.globalDiscountType === "percent"
                            ? `${contract.globalDiscount}%`
                            : formatCurrency(contract.globalDiscount)}
                          )
                        </span>
                        <span>
                          -{formatCurrency(calculateGlobalDiscountAmount())}
                        </span>
                      </div>
                    )}

                    <Separator />

                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        ยอดรวมหลังหักส่วนลด
                      </span>
                      <span className="font-medium text-gray-900">
                        {formatCurrency(calculateNetTotal())}
                      </span>
                    </div>

                    {contract.includeVat && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">ภาษีมูลค่าเพิ่ม 7%</span>
                        <span className="font-medium text-gray-900">
                          {formatCurrency(calculateVat())}
                        </span>
                      </div>
                    )}

                    <Separator />

                    <div className="flex justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="font-semibold text-gray-900">
                        มูลค่าสัญญาทั้งสิ้น
                      </span>
                      <span className="text-base font-bold text-[#7BC9A6]">
                        {formatCurrency(calculateGrandTotal())}
                      </span>
                    </div>

                    {/* Contract Duration Info */}
                    <div className="pt-2 border-t space-y-2 mt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">ระยะเวลา:</span>
                        <span className="font-medium text-gray-900">
                          {contract.duration} เดือน
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">ต่ออายุอัตโนมัติ:</span>
                        <span
                          className={`font-medium ${
                            contract.autoRenewal
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          {contract.autoRenewal ? "เปิดใช้งาน" : "ไม่เปิดใช้งาน"}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Deal */}
              <Card className="border-gray-200 shadow-sm">
                <CardContent className="p-4">
                  <h2 className="text-sm font-semibold text-gray-900 mb-2">
                    ดีลที่เกี่ยวข้อง
                  </h2>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">
                      {contract.dealId}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs text-[#7BC9A6] hover:text-[#6AB896]"
                    >
                      ดูรายละเอียด
                    </Button>
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