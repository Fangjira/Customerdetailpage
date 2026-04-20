import { useState } from "react";
import {
  ArrowLeft,
  Edit,
  Download,
  Send,
  Eye,
  Check,
  X,
  Plus,
  Trash2,
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Package,
  CheckCircle2,
  Clock,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Target,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface QuotationDetailMultiTemplateScreenProps {
  quotationId: string;
  onBack: () => void;
  onPreview?: (quotationId: string, templateType: string) => void;
}

export function QuotationDetailMultiTemplateScreen({
  quotationId,
  onBack,
  onPreview,
}: QuotationDetailMultiTemplateScreenProps) {
  // Editing state - แยกตามส่วน
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<any>({});

  // Template selector for demo
  const [selectedTemplate, setSelectedTemplate] = useState<string>("international-freight");
  
  // Version History collapse state
  const [isVersionHistoryOpen, setIsVersionHistoryOpen] = useState(true);

  // Mock data for different templates
  const mockQuotations: Record<string, any> = {
    "international-freight": {
      id: "QT-2024-001",
      documentNumber: "QT2024123456",
      name: "ใบเสนอราคาขนส่งทางอากาศระหว่างประเทศ",
      templateType: "international-freight",
      customer: {
        company: "บริษัท แอคมี คอร์ปอเรชั่น จำกัด",
        contact: "คุณสมชาย ใจดี",
        email: "somchai@acme.co.th",
        phone: "02-123-4567",
        address: "123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110",
      },
      dealId: "DL-2024-145",
      status: "Approved",
      issueDate: "2024-12-01",
      validUntil: "2024-12-31",
      validity: 30,
      createdDate: "1 ธ.ค. 2567",
      createdBy: { name: "Sarah Chen", initials: "SC", userId: "user1" },
      introduction:
        "ตามที่ท่านได้สอบถามราคาบริการขนส่งสินค้าทางอากาศระหว่างประเทศ บริษัทฯ ขอเสนอราคาบริการดังนี้",
      scopeOfWork:
        "1. รับสินค้าจากโรงงาน\n2. ดำเนินการพิธีการศุลกากร\n3. ขนส่งสินค้าทางอากาศ\n4. ส่งมอบถึงปลายทาง",
      airFreightExportRateData: JSON.stringify({
        rows: [
          {
            id: "1",
            no: "1",
            airline: "Thai Airways",
            product: "General Cargo",
            service: "Express",
            weight: "100-500",
            pol: "BKK",
            pod: "NRT",
            routing: "Direct",
            transit: "N/A",
            transitTime: "4-6 hours",
            price: "85",
            unit: "kg",
            currencyUnit: "THB/kg",
            remarks: "Subject to space availability",
          },
          {
            id: "2",
            no: "2",
            airline: "ANA",
            product: "General Cargo",
            service: "Standard",
            weight: "500+",
            pol: "BKK",
            pod: "NRT",
            routing: "Direct",
            transit: "N/A",
            transitTime: "4-6 hours",
            price: "78",
            unit: "kg",
            currencyUnit: "THB/kg",
            remarks: "Min 500kg",
          },
        ],
      }),
      seaFreightExportRateData: JSON.stringify({
        rows: [
          {
            id: "3",
            no: "1",
            airline: "Maersk Line",
            product: "20' Container",
            service: "FCL",
            weight: "Max 28T",
            pol: "BKK",
            pod: "Yokohama",
            routing: "Direct",
            transit: "N/A",
            transitTime: "7-10 days",
            price: "45000",
            unit: "container",
            currencyUnit: "THB/container",
            remarks: "Port to Port",
          },
        ],
      }),
      freightRateRemarks:
        "• ราคาดังกล่าวยังไม่รวมภาษีมูลค่าเพิ่ม 7%\n• ราคาอาจมีการเปลี่ยนแปลงตามอัตราแลกเปลี่ยนและราคาน้ำมัน\n• ราคาดังกล่าวเป็นราคาพื้นฐาน ไม่รวมค่าใช้จ่ายอื่นๆ",
      currency: "THB",
      includeVat: true,
      paymentTerm: "30",
      remarks:
        "1. ราคาดังกล่าวยังไม่รวมภาษีมูลค่าเพิ่ม 7%\n2. ใบเสนอราคานี้มีอายุ 30 วัน นับจากวันที่ออกเอกสาร\n3. เงื่อนไขการชำระเงิน: เครดิต 30 วัน หลังวันที่ออกใบกำกับภาษี",
    },
    "warehouse-transport": {
      id: "QT-2024-002",
      documentNumber: "QT2024123457",
      name: "ใบเสนอราคาบริการคลังสินค้าและขนส่ง",
      templateType: "warehouse-transport",
      customer: {
        company: "บริษัท โกลบอล เทรด จำกัด",
        contact: "คุณสมหญิง รักสงบ",
        email: "somying@globaltrade.co.th",
        phone: "02-234-5678",
        address: "456 ถนนรามคำแหง แขวงหัวหมาก เขตบางกะปิ กรุงเทพมหานคร 10240",
      },
      dealId: "DL-2024-146",
      status: "Pending Approval",
      issueDate: "2024-12-05",
      validUntil: "2025-01-05",
      validity: 30,
      createdDate: "5 ธ.ค. 2567",
      createdBy: { name: "Mike Wong", initials: "MW", userId: "user2" },
      introduction:
        "ตามที่ท่านได้สอบถามราคาบริการคลังสินค้าและขนส่ง บริษัทฯ มีความยินดีขอเสนอราคาบริการดังนี้",
      scopeOfWork:
        "1. รับสินค้าเข้าคลังสินค้า\n2. จัดเก็บสินค้าในคลังมาตรฐาน\n3. บริหารสต็อกสินค้า\n4. จัดส่งสินค้าตามคำสั่ง\n5. รายงานสถานะสินค้าประจำเดือน",
      items: [
        {
          id: "1",
          itemName: "ค่าเช่าพื้นที่คลังสินค้า",
          description: "พื้นที่ 500 ตารางเมตร พร้อมระบบควบคุมอุณหภูมิ",
          quantity: 1,
          unit: "เดือน",
          unitPrice: 125000,
          discount: 0,
        },
        {
          id: "2",
          itemName: "ค่าบริการรับเข้า-จ่ายออก (Handling)",
          description: "ค่าบริการขนถ่ายสินค้า ตรวจสอบ และบันทึกข้อมูล",
          quantity: 2000,
          unit: "กล่อง",
          unitPrice: 15,
          discount: 10,
        },
        {
          id: "3",
          itemName: "ค่าบริการขนส่ง กทม. และปริมณฑล",
          description: "รถ 6 ล้อ พร้อมพนักงานขับรถและคนยก 2 คน",
          quantity: 20,
          unit: "เที่ยว",
          unitPrice: 3500,
          discount: 5,
        },
        {
          id: "4",
          itemName: "ค่าบริการบรรจุหีบห่อ (Packing)",
          description: "บรรจุหีบห่อสินค้าด้วยวัสดุห่อมาตรฐาน",
          quantity: 500,
          unit: "กล่อง",
          unitPrice: 25,
          discount: 0,
        },
      ],
      subtotal: 250000,
      globalDiscount: 0,
      globalDiscountType: "percent",
      netTotal: 250000,
      vat: 17500,
      grandTotal: 267500,
      currency: "THB",
      includeVat: true,
      paymentTerm: "30",
      remarks:
        "1. ราคาดังกล่าวยังไม่รวมภาษีมูลค่าเพิ่ม 7%\n2. สัญญาขั้นต่ำ 6 เดือน\n3. เงื่อนไขการชำระเงิน: เครดิต 30 วัน\n4. บริษัทฯ มีประกันภัยสินค้าในคลัง มูลค่าความคุ้มครองสูงสุด 5 ล้านบาท",
    },
    "customs-license": {
      id: "QT-2024-003",
      documentNumber: "QT2024123458",
      name: "ใบเสนอราคาบริการศุลกากรและใบอนุญาต",
      templateType: "customs-license",
      customer: {
        company: "บริษัท อิมพอร์ต เอ็กซ์เพิร์ท จำกัด",
        contact: "คุณวิชัย ชาญชัย",
        email: "wichai@importexpert.co.th",
        phone: "02-345-6789",
        address: "789 ถนนเพชรบุรีตัดใหม่ แขวงบางกะปิ เขตห้วยขวาง กรุงเทพมหานคร 10310",
      },
      dealId: "DL-2024-147",
      status: "Sent to Customer",
      issueDate: "2024-12-10",
      validUntil: "2025-01-10",
      validity: 30,
      createdDate: "10 ธ.ค. 2567",
      createdBy: { name: "John Smith", initials: "JS", userId: "user3" },
      introduction:
        "ตามที่ท่านได้สอบถามราคาบริการด้านศุลกากรและขออนุญาตนำเข้า-ส่งออก บริษัทฯ ขอเสนอราคาบริการดังนี้",
      scopeOfWork:
        "1. ตรวจสอบเอกสารและเตรียมเอกสารนำเข้า/ส่งออก\n2. ยื่นขอใบอนุญาตที่เกี่ยวข้อง (อย./มอก./ฯลฯ)\n3. ดำเนินการพิธีการศุลกากร\n4. ประสานงานกับหน่วยงานราชการ\n5. จัดส่งเอกสารครบถ้วน",
      items: [
        {
          id: "1",
          itemName: "ค่าธรรมเนียมพิธีการศุลกากรนำเข้า",
          description: "รวมค่าบริการยื่นเอกสาร ใบขนสินค้าขาเข้า (Import Declaration)",
          quantity: 5,
          unit: "ใบขน",
          unitPrice: 2500,
          discount: 0,
        },
        {
          id: "2",
          itemName: "ค่าบริการขออนุญาต อย.",
          description: "ยื่นขออนุญาตนำเข้าอาหารและยา ผ่านระบบออนไลน์",
          quantity: 3,
          unit: "รายการ",
          unitPrice: 3500,
          discount: 0,
        },
        {
          id: "3",
          itemName: "ค่าตรวจปล่อยสินค้า (Inspection Fee)",
          description: "ค่าประสานงานการตรวจสอบสินค้ากับเจ้าหน้าที่ศุลกากร",
          quantity: 5,
          unit: "ครั้ง",
          unitPrice: 1500,
          discount: 0,
        },
        {
          id: "4",
          itemName: "ค่าบริการด่วนพิเศษ (Express Service)",
          description: "บริการเร่งรัดดำเนินการพิธีการภายใน 24 ชม.",
          quantity: 2,
          unit: "ครั้ง",
          unitPrice: 5000,
          discount: 10,
        },
      ],
      subtotal: 41500,
      globalDiscount: 5,
      globalDiscountType: "percent",
      netTotal: 39425,
      vat: 2759.75,
      grandTotal: 42184.75,
      currency: "THB",
      includeVat: true,
      paymentTerm: "0",
      remarks:
        "1. ราคาดังกล่าวยังไม่รวมภาษีมูลค่าเพิ่ม 7%\n2. ราคาดังกล่าวไม่รวมค่าอากรขาเข้า ภาษีสรรพสามิต และภาษีอื่นๆ\n3. เงื่อนไขการชำระเงิน: เงินสด ก่อนดำเนินการ\n4. หากมีค่าใช้จ่ายเพิ่มเติมจากหน่วยงานราชการ จะแจ้งให้ทราบเป็นกรณีพิเศษ",
    },
    "cross-border-clmv": {
      id: "QT-2024-004",
      documentNumber: "QT2024123459",
      name: "ใบเสนอราคาบริการขนส่งข้ามพรมแดน CLMV",
      templateType: "cross-border-clmv",
      customer: {
        company: "บริษัท เอเชีย ลิงค์ โลจิสติกส์ จำกัด",
        contact: "คุณประยุทธ วงศ์ไทย",
        email: "prayuth@asialink.co.th",
        phone: "02-456-7890",
        address: "321 ถนนพระราม 4 แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110",
      },
      dealId: "DL-2024-148",
      status: "Draft",
      issueDate: "2024-12-15",
      validUntil: "2025-01-15",
      validity: 30,
      createdDate: "15 ธ.ค. 2567",
      createdBy: { name: "Linda Park", initials: "LP", userId: "user4" },
      introduction:
        "ตามที่ท่านได้สอบถามราคาบริการขนส่งสินค้าข้ามพรมแดนไปยังประเทศในกลุ่ม CLMV บริษัทฯ ขอเสนอราคาบริการดังนี้",
      scopeOfWork:
        "1. รับสินค้าจากต้นทาง กรุงเทพฯ\n2. ดำเนินการพิธีการส่งออกที่ด่านชายแดนไทย\n3. ขนส่งสินค้าข้ามพรมแดน\n4. ดำเนินการพิธีการนำเข้าที่ด่านชายแดนประเทศปลายทาง\n5. ส่งมอบสินค้าถึงคลังปลายทาง",
      items: [
        {
          id: "1",
          itemName: "ค่าขนส่งทางบก กรุงเทพฯ - เวียงจันทน์",
          description: "รถ 10 ล้อตู้ทึบ พร้อมพนักงานขับรถ 2 คน Door to Door",
          quantity: 4,
          unit: "เที่ยว",
          unitPrice: 35000,
          discount: 0,
        },
        {
          id: "2",
          itemName: "ค่าพิธีการศุลกากร (Export + Import)",
          description: "รวมค่าดำเนินการพิธีการทั้งฝั่งไทยและลาว",
          quantity: 4,
          unit: "เที่ยว",
          unitPrice: 8000,
          discount: 0,
        },
        {
          id: "3",
          itemName: "ค่าบริการ Cross Border Agent",
          description: "ค่าประสานงานตัวแทนข้ามพรมแดน",
          quantity: 4,
          unit: "เที่ยว",
          unitPrice: 5000,
          discount: 10,
        },
        {
          id: "4",
          itemName: "ค่าประกันภัยสินค้า",
          description: "ประกันภัยสินค้าระหว่างการขนส่ง (ความคุ้มครอง 1,000,000 บาท/เที่ยว)",
          quantity: 4,
          unit: "เที่ยว",
          unitPrice: 2500,
          discount: 0,
        },
      ],
      subtotal: 202000,
      globalDiscount: 10000,
      globalDiscountType: "fixed",
      netTotal: 192000,
      vat: 13440,
      grandTotal: 205440,
      currency: "THB",
      includeVat: true,
      paymentTerm: "15",
      remarks:
        "1. ราคาดังกล่าวยังไม่รวมภาษีมูลค่าเพิ่ม 7%\n2. ราคาดังกล่าวไม่รวมค่าอากรขาเข้า-ส่งออก และภาษีในประเทศปลายทาง\n3. ระยะเวลาขนส่ง 3-5 วันทำการ\n4. เงื่อนไขการชำระเงิน: เครดิต 15 วัน หลังวันที่ออกใบกำกับภาษี\n5. ราคาอาจมีการปรับเปลี่ยนตามราคาน้ำมันและอัตราแลกเปลี่ยน",
    },
  };

  const quotation = mockQuotations[selectedTemplate];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700 border-green-200";
      case "Pending Approval":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Sent to Customer":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Draft":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "Rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle2 className="h-4 w-4" />;
      case "Pending Approval":
        return <Clock className="h-4 w-4" />;
      case "Sent to Customer":
        return <Send className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount === undefined || amount === null) {
      return quotation.currency === "THB" ? "฿0.00" : "$0.00";
    }

    if (quotation.currency === "THB") {
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

  const handleQuotationPreview = (quotationId: string) => {
    setSelectedQuotationId(quotationId);
    // Pass template type to preview
    const quotation = mockQuotations[selectedTemplate];
    setCurrentPath(`/quotation-preview?template=${quotation.templateType}`);
  };

  return (
    <div className="p-2 sm:p-3 lg:p-4 bg-gray-50 min-h-screen">
      <div className="max-w-[1400px] mx-auto space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack} className="h-9 w-9 p-0">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">
                {quotation.name}
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">{quotation.documentNumber}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 px-3 text-xs">
              <Edit className="h-3.5 w-3.5 mr-1.5" />
              แก้ไข
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-3 text-xs bg-[#7BC9A6] hover:bg-[#6AB896] text-white border-[#7BC9A6]"
              onClick={() => onPreview?.(quotationId, quotation.templateType)}
            >
              <Eye className="h-3.5 w-3.5 mr-1.5" />
              ดูตัวอย่าง
            </Button>
            <Button variant="outline" size="sm" className="h-9 px-3 text-xs">
              <Download className="h-3.5 w-3.5 mr-1.5" />
              ดาวน์โหลด
            </Button>
          </div>
        </div>

        {/* Template Selector */}
        <Card className="border-[#7BC9A6] bg-[#7BC9A6]/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-[#7BC9A6]" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-900 mb-1">
                  📋 เลือกเทมเพลตเพื่อดูความแตกต่าง (Demo)
                </p>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="international-freight">
                      🌍 International Freight (ขนส่งระหว่างประเทศ)
                    </SelectItem>
                    <SelectItem value="warehouse-transport">
                      📦 Warehouse + Transport (คลังสินค้า + ขนส่ง)
                    </SelectItem>
                    <SelectItem value="customs-license">
                      📋 Customs & License (ศุลกากร + ใบอนุญาต)
                    </SelectItem>
                    <SelectItem value="cross-border-clmv">
                      🚚 Cross-Border CLMV (ขนส่งข้ามพรมแดน)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className={`${getStatusColor(quotation.status)} text-xs px-3 py-1 font-medium border`}
          >
            <span className="flex items-center gap-1.5">
              {getStatusIcon(quotation.status)}
              {quotation.status}
            </span>
          </Badge>
          <span className="text-xs text-gray-500">
            สร้างโดย {quotation.createdBy.name} • {quotation.createdDate}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-3">
            {/* Document Info */}
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-purple-600" />
                  <h2 className="text-sm font-semibold text-gray-900">ข้อมูลเอกสาร</h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <p className="text-[10px] text-gray-500 mb-1">เลขที่เอกสาร</p>
                    <p className="text-xs font-medium text-gray-900">{quotation.documentNumber}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 mb-1">วันที่ออกเอกสาร</p>
                    <p className="text-xs font-medium text-gray-900">
                      {new Date(quotation.issueDate).toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 mb-1">ใช้ได้ถึง</p>
                    <p className="text-xs font-medium text-gray-900">
                      {new Date(quotation.validUntil).toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 mb-1">เงื่อนไขชำระเงิน</p>
                    <p className="text-xs font-medium text-gray-900">
                      {quotation.paymentTerm === "0"
                        ? "เงินสด"
                        : `เครดิต ${quotation.paymentTerm} วัน`}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Info */}
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="h-5 w-5 text-purple-600" />
                  <h2 className="text-sm font-semibold text-gray-900">ข้อมูลลูกค้า</h2>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Building2 className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-gray-900">
                        {quotation.customer.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <User className="h-4 w-4 text-gray-400 mt-0.5" />
                    <p className="text-xs text-gray-600">{quotation.customer.contact}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail className="h-4 w-4 text-gray-400 mt-0.5" />
                    <p className="text-xs text-gray-600">{quotation.customer.email}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 text-gray-400 mt-0.5" />
                    <p className="text-xs text-gray-600">{quotation.customer.phone}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                    <p className="text-xs text-gray-600">{quotation.customer.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Introduction Section */}
            {quotation.introduction && (
              <Card className="border-gray-200 shadow-sm">
                <CardContent className="p-4">
                  <h2 className="text-sm font-semibold text-gray-900 mb-2">
                    Introduction / คำนำ
                  </h2>
                  <p className="text-xs text-gray-600 whitespace-pre-line">
                    {quotation.introduction}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Scope of Work Section */}
            {quotation.scopeOfWork && (
              <Card className="border-gray-200 shadow-sm">
                <CardContent className="p-4">
                  <h2 className="text-sm font-semibold text-gray-900 mb-2">
                    Scope of Work / ขอบเขตงาน
                  </h2>
                  <p className="text-xs text-gray-600 whitespace-pre-line">
                    {quotation.scopeOfWork}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* International Freight Rate Tables */}
            {quotation.templateType === "international-freight" && (
              <Card className="border-gray-200 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Package className="h-5 w-5 text-[#7BC9A6]" />
                    <h2 className="text-sm font-semibold text-gray-900">RATE / ค่าบริการ</h2>
                  </div>

                  <div className="space-y-4">
                    {/* Air Freight Export */}
                    {(() => {
                      const data = quotation.airFreightExportRateData
                        ? JSON.parse(quotation.airFreightExportRateData)
                        : null;

                      if (data && data.rows && data.rows.length > 0) {
                        return (
                          <div>
                            <h3 className="text-xs font-bold text-gray-800 mb-2">
                              3.1.1.1 AIR FREIGHT RATE (EXPORT)
                            </h3>
                            <div className="border border-gray-300 rounded-lg overflow-x-auto">
                              <table className="w-full text-[10px]">
                                <thead className="bg-[#7BC9A6] text-white">
                                  <tr>
                                    <th className="px-2 py-2 text-center font-semibold border-r border-white/20">
                                      NO.
                                    </th>
                                    <th className="px-2 py-2 text-left font-semibold border-r border-white/20">
                                      AIRLINE/CARRIER
                                    </th>
                                    <th className="px-2 py-2 text-left font-semibold border-r border-white/20">
                                      PRODUCT
                                    </th>
                                    <th className="px-2 py-2 text-left font-semibold border-r border-white/20">
                                      Service
                                    </th>
                                    <th className="px-2 py-2 text-left font-semibold border-r border-white/20">
                                      WEIGHT [kg]
                                    </th>
                                    <th className="px-2 py-2 text-left font-semibold border-r border-white/20">
                                      POL
                                    </th>
                                    <th className="px-2 py-2 text-left font-semibold border-r border-white/20">
                                      POD
                                    </th>
                                    <th className="px-2 py-2 text-left font-semibold border-r border-white/20">
                                      ROUTING
                                    </th>
                                    <th className="px-2 py-2 text-left font-semibold border-r border-white/20">
                                      TRANSIT
                                    </th>
                                    <th className="px-2 py-2 text-left font-semibold border-r border-white/20">
                                      TRANSIT TIME
                                    </th>
                                    <th className="px-2 py-2 text-left font-semibold border-r border-white/20">
                                      PRICE
                                    </th>
                                    <th className="px-2 py-2 text-left font-semibold border-r border-white/20">
                                      UNIT
                                    </th>
                                    <th className="px-2 py-2 text-left font-semibold border-r border-white/20">
                                      [Currency/Unit ext/Period]
                                    </th>
                                    <th className="px-2 py-2 text-left font-semibold">REMARKS</th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {data.rows.map((row: any) => (
                                    <tr key={row.id} className="hover:bg-gray-50">
                                      <td className="px-2 py-2 text-center border-r border-gray-200">
                                        {row.no}
                                      </td>
                                      <td className="px-2 py-2 border-r border-gray-200">
                                        {row.airline}
                                      </td>
                                      <td className="px-2 py-2 border-r border-gray-200">
                                        {row.product}
                                      </td>
                                      <td className="px-2 py-2 border-r border-gray-200">
                                        {row.service}
                                      </td>
                                      <td className="px-2 py-2 border-r border-gray-200">
                                        {row.weight}
                                      </td>
                                      <td className="px-2 py-2 border-r border-gray-200">{row.pol}</td>
                                      <td className="px-2 py-2 border-r border-gray-200">{row.pod}</td>
                                      <td className="px-2 py-2 border-r border-gray-200">
                                        {row.routing}
                                      </td>
                                      <td className="px-2 py-2 border-r border-gray-200">
                                        {row.transit}
                                      </td>
                                      <td className="px-2 py-2 border-r border-gray-200">
                                        {row.transitTime}
                                      </td>
                                      <td className="px-2 py-2 border-r border-gray-200">
                                        {row.price}
                                      </td>
                                      <td className="px-2 py-2 border-r border-gray-200">{row.unit}</td>
                                      <td className="px-2 py-2 border-r border-gray-200">
                                        {row.currencyUnit}
                                      </td>
                                      <td className="px-2 py-2">{row.remarks}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })()}

                    {/* Sea Freight Export */}
                    {(() => {
                      const data = quotation.seaFreightExportRateData
                        ? JSON.parse(quotation.seaFreightExportRateData)
                        : null;

                      if (data && data.rows && data.rows.length > 0) {
                        return (
                          <div>
                            <h3 className="text-xs font-bold text-gray-800 mb-2">
                              3.2.1 SEA FREIGHT RATE (EXPORT)
                            </h3>
                            <div className="border border-gray-300 rounded-lg overflow-x-auto">
                              <table className="w-full text-[10px]">
                                <thead className="bg-[#7BC9A6] text-white">
                                  <tr>
                                    <th className="px-2 py-2 text-center font-semibold border-r border-white/20">
                                      NO.
                                    </th>
                                    <th className="px-2 py-2 text-left font-semibold border-r border-white/20">
                                      CARRIER
                                    </th>
                                    <th className="px-2 py-2 text-left font-semibold border-r border-white/20">
                                      PRODUCT
                                    </th>
                                    <th className="px-2 py-2 text-left font-semibold border-r border-white/20">
                                      Service
                                    </th>
                                    <th className="px-2 py-2 text-left font-semibold border-r border-white/20">
                                      WEIGHT
                                    </th>
                                    <th className="px-2 py-2 text-left font-semibold border-r border-white/20">
                                      POL
                                    </th>
                                    <th className="px-2 py-2 text-left font-semibold border-r border-white/20">
                                      POD
                                    </th>
                                    <th className="px-2 py-2 text-left font-semibold border-r border-white/20">
                                      ROUTING
                                    </th>
                                    <th className="px-2 py-2 text-left font-semibold border-r border-white/20">
                                      TRANSIT
                                    </th>
                                    <th className="px-2 py-2 text-left font-semibold border-r border-white/20">
                                      TRANSIT TIME
                                    </th>
                                    <th className="px-2 py-2 text-left font-semibold border-r border-white/20">
                                      PRICE
                                    </th>
                                    <th className="px-2 py-2 text-left font-semibold border-r border-white/20">
                                      UNIT
                                    </th>
                                    <th className="px-2 py-2 text-left font-semibold border-r border-white/20">
                                      Currency/Unit
                                    </th>
                                    <th className="px-2 py-2 text-left font-semibold">REMARKS</th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {data.rows.map((row: any) => (
                                    <tr key={row.id} className="hover:bg-gray-50">
                                      <td className="px-2 py-2 text-center border-r border-gray-200">
                                        {row.no}
                                      </td>
                                      <td className="px-2 py-2 border-r border-gray-200">
                                        {row.airline}
                                      </td>
                                      <td className="px-2 py-2 border-r border-gray-200">
                                        {row.product}
                                      </td>
                                      <td className="px-2 py-2 border-r border-gray-200">
                                        {row.service}
                                      </td>
                                      <td className="px-2 py-2 border-r border-gray-200">
                                        {row.weight}
                                      </td>
                                      <td className="px-2 py-2 border-r border-gray-200">{row.pol}</td>
                                      <td className="px-2 py-2 border-r border-gray-200">{row.pod}</td>
                                      <td className="px-2 py-2 border-r border-gray-200">
                                        {row.routing}
                                      </td>
                                      <td className="px-2 py-2 border-r border-gray-200">
                                        {row.transit}
                                      </td>
                                      <td className="px-2 py-2 border-r border-gray-200">
                                        {row.transitTime}
                                      </td>
                                      <td className="px-2 py-2 border-r border-gray-200">
                                        {row.price}
                                      </td>
                                      <td className="px-2 py-2 border-r border-gray-200">{row.unit}</td>
                                      <td className="px-2 py-2 border-r border-gray-200">
                                        {row.currencyUnit}
                                      </td>
                                      <td className="px-2 py-2">{row.remarks}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })()}

                    {/* Rate Remarks */}
                    {quotation.freightRateRemarks && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <p className="text-[10px] text-gray-700 whitespace-pre-line">
                          {quotation.freightRateRemarks}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Line Items - For other templates */}
            {quotation.templateType !== "international-freight" && quotation.items && (
              <Card className="border-gray-200 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Package className="h-5 w-5 text-purple-600" />
                    <h2 className="text-sm font-semibold text-gray-900">รายการสินค้า/บริการ</h2>
                  </div>

                  <div className="space-y-3">
                    {quotation.items.map((item: any, index: number) => (
                      <div key={item.id} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <p className="text-xs font-medium text-gray-900">
                              {index + 1}. {item.itemName}
                            </p>
                            {item.description && (
                              <p className="text-[10px] text-gray-500 mt-0.5">{item.description}</p>
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
                            <span className="font-medium text-gray-900">{item.discount}%</span>
                          </div>
                          <div className="text-right">
                            <span className="text-gray-500">รวม:</span>{" "}
                            <span className="font-semibold text-gray-900">
                              {formatCurrency(calculateLineTotal(item))}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Remarks */}
            {quotation.remarks && (
              <Card className="border-gray-200 shadow-sm">
                <CardContent className="p-4">
                  <h2 className="text-sm font-semibold text-gray-900 mb-2">หมายเหตุ / เงื่อนไข</h2>
                  <p className="text-xs text-gray-600 whitespace-pre-line">{quotation.remarks}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-3">
              {/* Summary Card - Only show for templates with pricing data */}
              {quotation.subtotal && (
                <Card className="border-purple-200 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <DollarSign className="h-5 w-5 text-purple-600" />
                      <h2 className="text-sm font-semibold text-gray-900">สรุปยอดรวม</h2>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">ยอดรวมก่อนหักส่วนลด</span>
                        <span className="font-medium text-gray-900">
                          {formatCurrency(quotation.subtotal)}
                        </span>
                      </div>

                      {quotation.globalDiscount > 0 && (
                        <div className="flex justify-between text-red-600">
                          <span>
                            ส่วนลดรวม (
                            {quotation.globalDiscountType === "percent"
                              ? `${quotation.globalDiscount}%`
                              : formatCurrency(quotation.globalDiscount)}
                            )
                          </span>
                          <span>
                            -{formatCurrency(quotation.subtotal - quotation.netTotal)}
                          </span>
                        </div>
                      )}

                      <Separator />

                      <div className="flex justify-between">
                        <span className="text-gray-600">ยอดรวมหลังหักส่วนลด</span>
                        <span className="font-medium text-gray-900">
                          {formatCurrency(quotation.netTotal)}
                        </span>
                      </div>

                      {quotation.includeVat && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">ภาษีมูลค่าเพิ่ม 7%</span>
                          <span className="font-medium text-gray-900">
                            {formatCurrency(quotation.vat)}
                          </span>
                        </div>
                      )}

                      <Separator />

                      <div className="flex justify-between p-2 bg-purple-50 rounded-lg">
                        <span className="font-semibold text-gray-900">ยอดรวมทั้งสิ้น</span>
                        <span className="text-base font-bold text-purple-600">
                          {formatCurrency(quotation.grandTotal)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Related Deal */}
              <Card className="border-gray-200 shadow-sm">
                <CardContent className="p-4">
                  <h2 className="text-sm font-semibold text-gray-900 mb-2">ดีลที่เกี่ยวข้อง</h2>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">{quotation.dealId}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs text-green-600 hover:text-green-700"
                    >
                      ดูรายละเอียด
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Version History */}
              <Card className="border-gray-200 shadow-sm">
                <CardContent className="p-4">
                  <button
                    onClick={() => setIsVersionHistoryOpen(!isVersionHistoryOpen)}
                    className="w-full flex items-center justify-between mb-3 hover:opacity-70 transition-opacity"
                  >
                    <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-purple-600" />
                      ประวัติการแก้ไข
                    </h2>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-[10px] px-2 py-0.5">
                        4 เวอร์ชั่น
                      </Badge>
                      {isVersionHistoryOpen ? (
                        <ChevronUp className="h-4 w-4 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      )}
                    </div>
                  </button>

                  {isVersionHistoryOpen && (
                    <>
                    <div className="space-y-3">
                    {/* Version 1.3 - Current */}
                    <div className="relative pl-6 pb-3 border-l-2 border-purple-200">
                      <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-purple-600 border-2 border-white shadow-sm"></div>
                      <div className="bg-purple-50 rounded-lg p-2.5 border border-purple-200">
                        <div className="flex items-start justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-purple-600 text-white text-[10px] px-2 py-0.5 font-semibold">
                              v1.3
                            </Badge>
                            <Badge className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5">
                              ปัจจุบัน
                            </Badge>
                          </div>
                          <span className="text-[10px] text-gray-500">27 มี.ค. 2025</span>
                        </div>
                        <p className="text-xs text-gray-900 font-medium mb-1">
                          อัปเดตราคาขนส่งทางทะเล
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <div className="h-5 w-5 rounded-full bg-purple-600 text-white text-[10px] font-semibold flex items-center justify-center">
                              SC
                            </div>
                            <span className="text-[10px] text-gray-600">Sarah Chen</span>
                          </div>
                          <Badge className="bg-green-100 text-green-700 border-green-300 text-[10px] px-1.5 py-0">
                            <CheckCircle2 className="h-2.5 w-2.5 mr-0.5" />
                            Approved
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Version 1.2 */}
                    <div className="relative pl-6 pb-3 border-l-2 border-gray-200">
                      <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-blue-500 border-2 border-white shadow-sm"></div>
                      <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-200">
                        <div className="flex items-start justify-between mb-1.5">
                          <Badge variant="outline" className="text-[10px] px-2 py-0.5 font-semibold">
                            v1.2
                          </Badge>
                          <span className="text-[10px] text-gray-500">25 มี.ค. 2025</span>
                        </div>
                        <p className="text-xs text-gray-700 mb-1">
                          เพิ่ม Terms & Conditions
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <div className="h-5 w-5 rounded-full bg-blue-500 text-white text-[10px] font-semibold flex items-center justify-center">
                              MJ
                            </div>
                            <span className="text-[10px] text-gray-600">Mike Johnson</span>
                          </div>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300 text-[10px] px-1.5 py-0">
                            <Send className="h-2.5 w-2.5 mr-0.5" />
                            Sent
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Version 1.1 */}
                    <div className="relative pl-6 pb-3 border-l-2 border-gray-200">
                      <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-orange-500 border-2 border-white shadow-sm"></div>
                      <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-200">
                        <div className="flex items-start justify-between mb-1.5">
                          <Badge variant="outline" className="text-[10px] px-2 py-0.5 font-semibold">
                            v1.1
                          </Badge>
                          <span className="text-[10px] text-gray-500">20 มี.ค. 2025</span>
                        </div>
                        <p className="text-xs text-gray-700 mb-1">
                          แก้ไขข้อมูลลูกค้า
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <div className="h-5 w-5 rounded-full bg-orange-500 text-white text-[10px] font-semibold flex items-center justify-center">
                              SC
                            </div>
                            <span className="text-[10px] text-gray-600">Sarah Chen</span>
                          </div>
                          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-300 text-[10px] px-1.5 py-0">
                            <Clock className="h-2.5 w-2.5 mr-0.5" />
                            Revised
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Version 1.0 - Initial */}
                    <div className="relative pl-6">
                      <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-gray-400 border-2 border-white shadow-sm"></div>
                      <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-200">
                        <div className="flex items-start justify-between mb-1.5">
                          <Badge variant="outline" className="text-[10px] px-2 py-0.5 font-semibold">
                            v1.0
                          </Badge>
                          <span className="text-[10px] text-gray-500">15 มี.ค. 2025</span>
                        </div>
                        <p className="text-xs text-gray-700 mb-1">
                          สร้างใบเสนอราคาเริ่มต้น
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <div className="h-5 w-5 rounded-full bg-gray-400 text-white text-[10px] font-semibold flex items-center justify-center">
                              SC
                            </div>
                            <span className="text-[10px] text-gray-600">Sarah Chen</span>
                          </div>
                          <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-300 text-[10px] px-1.5 py-0">
                            <FileText className="h-2.5 w-2.5 mr-0.5" />
                            Draft
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* View All Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-3 h-8 text-xs text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                  >
                    ดูประวัติทั้งหมด
                  </Button>
                  </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}