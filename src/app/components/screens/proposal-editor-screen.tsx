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
  Award,
  Save,
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

interface ProposalEditorScreenProps {
  proposalId?: string;
  onNavigate: (path: string, id?: string) => void;
}

export function ProposalEditorScreen({
  proposalId,
  onNavigate,
}: ProposalEditorScreenProps) {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);

  // Mock data - ในระบบจริงจะดึงจาก API
  const [proposal, setProposal] = useState({
    id: proposalId || "PRP-2024-001",
    documentNumber: "PRP2024123456",
    
    // 🔷 HEADER SECTION - Centered Logo + Titles
    companyLogo: "onelink-logo.png", // Logo centered at top
    companyNameTH: "บริษัท วันลิงค์ โลจิสติกส์ จำกัด",
    companyNameEN: "mini CRM Logistics Co., Ltd.",
    documentTitleTH: "สัญญาให้บริการโลจิสติกส์",
    documentTitleEN: "Agreement and Proposal\nFor Logistics Services",
    
    // 🔷 SITE & SERVICE - Centered Block
    siteTH: "โรงงานบางปู สมุทรปราการ",
    siteEN: "Bangpu Factory, Samutprakarn",
    serviceTH: "บริการขนส่งสินค้าทางบก",
    serviceEN: "Land Transportation Service",
    
    // 🔷 CUSTOMER NAME - Centered Block
    customerCompanyTH: "บริษัท เทคโนโลยี อินโนเวชั่น จำกัด",
    customerCompanyEN: "Technology Innovation Co., Ltd.",
    customerContactName: "คุณวิภาวี สมหวัง",
    customerPosition: "ผู้จัดการฝ่ายจัดซื้อ", // Optional field
    
    // 🔷 ISSUED INFORMATION - Left Aligned Block
    issuedBy: "Sarah Chen",
    issuedByCompany: "บริษัท วันลิงค์ โลจิสติกส์ จำกัด",
    issuedEmail: "sarah.chen@onelink-logistics.com",
    proposalNumber: "PRP-2024-001",
    issueDate: "2024-12-01",
    issueStatus: "Draft",
    
    // 🔷 INTRO PARAGRAPH
    customerNameForIntro: "คุณวิภาวี สมหวัง",
    introParagraphEN: "We are pleased to present this proposal for logistics services. Our company has over 20 years of experience in providing comprehensive supply chain solutions.",
    introParagraphTH: "เรามีความยินดีที่จะนำเสนอข้อเสนอบริการโลจิสติกส์นี้ บริษัทของเรามีประสบการณ์กว่า 20 ปีในการให้บริการโซลูชั่นห่วงโซ่อุปทานแบบครบวงจร",
    
    // 🔷 SECTION 1: DESCRIPTION
    descriptionEN: "This proposal covers comprehensive logistics services including warehousing, transportation, and supply chain management.",
    descriptionTH: "ข้อเสนอนี้ครอบคลุมบริการโลจิสติกส์แบบครบวงจร ประกอบด้วย คลังสินค้า การขนส่ง และการบริหารจัดการห่วงโซ่อุปทาน",
    
    // 🔷 SECTION 2: SCOPE OF WORKS
    scopeOfWorksEN: [
      "Warehouse management and inventory control",
      "Transportation planning and execution",
      "Real-time tracking and reporting",
      "Customer service support 24/7"
    ],
    scopeOfWorksTH: [
      "การบริหารจัดการคลังสินค้าและควบคุมสต็อก",
      "การวางแผนและดำเนินการขนส่ง",
      "ระบบติดตามและรายงานแบบเรียลไทม์",
      "บริการดูแลลูกค้าตลอด 24 ชั่วโมง"
    ],
    
    // 🔷 SECTION 3: SERVICE CHARGES (PRICE STRUCTURE)
    // Table with exact columns: No. | Description (TH/EN) | Unit | Quantity | Unit Price | Amount
    items: [
      {
        id: "1",
        no: "1",
        descriptionTH: "ค่าบริการคลังสินค้า",
        descriptionEN: "Warehouse Service Fee",
        unit: "ตร.ม./Month",
        quantity: 1000,
        unitPrice: 150,
        discount: 0,
      },
      {
        id: "2",
        no: "2",
        descriptionTH: "ค่าบริการขนส่ง",
        descriptionEN: "Transportation Fee",
        unit: "เที่ยว/Trip",
        quantity: 50,
        unitPrice: 5000,
        discount: 5,
      },
      {
        id: "3",
        no: "3",
        descriptionTH: "ค่าบริหารจัดการ",
        descriptionEN: "Management Fee",
        unit: "เดือน/Month",
        quantity: 12,
        unitPrice: 50000,
        discount: 0,
      },
    ],
    
    currency: "THB",
    includeVat: true,
    globalDiscount: 3,
    globalDiscountType: "percent" as "percent" | "amount",
    
    // 🔷 SECTION 4: REMARKS (Numbered List)
    remarks: [
      { en: "All prices are quoted in Thai Baht (THB).", th: "ราคาที่เสนอเป็นสกุลเงินบาท" },
      { en: "This proposal is valid for 30 days from issue date.", th: "ข้อเสนอนี้มีอายุ 30 วัน นับจากวันที่ออกเอกสาร" },
      { en: "Payment term: Net 30 days.", th: "เงื่อนไขการชำระเงิน: เครดิต 30 วัน" },
      { en: "Service will commence within 15 days after contract signing.", th: "การให้บริการจะเริ่มภายใน 15 วัน หลังลงนามสัญญา" }
    ],
    
    // Legacy remarks field for backward compatibility with existing UI
    remarksText: "1. ราคาดังกล่าวยังไม่รวมภาษีมูลค่าเพิ่ม 7%\n2. ข้อเสนอโครงการนี้มีอายุ 30 วัน นับจากวันที่ออกเอกสาร\n3. เงื่อนไขการชำระเงิน: เครดิต 30 วัน หลังวันที่ออกใบกำกับภาษี\n4. การดำเนินโครงการจะเริ่มภายใน 15 วัน หลังจากลงนามในสัญญา",
    
    // 🔷 SECTION 5: TERMS AND CONDITIONS (Full-width Paragraphs - Bilingual)
    termsAndConditionsEN: [
      "1. Service Agreement: This proposal shall become a binding agreement upon acceptance by both parties.",
      "2. Service Period: The service period shall be as specified in the contract, with automatic renewal unless terminated.",
      "3. Payment Terms: Payment shall be made within 30 days from invoice date.",
      "4. Liability: The Company shall be liable for damages as specified in the service agreement.",
      "5. Force Majeure: Neither party shall be liable for delays due to circumstances beyond reasonable control."
    ],
    termsAndConditionsTH: [
      "1. สัญญาการให้บริการ: ข้อเสนอนี้จะมีผลเป็นสัญญาที่มีผลผูกพันเมื่อทั้งสองฝ่ายยอมรับ",
      "2. ระยะเวลาการให้บริการ: ระยะเวลาการให้บริการจะเป็นไปตามที่ระบุในสัญญา โดยต่ออายุอัตโนมัติเว้นแต่จะมีการบอกเลิก",
      "3. เงื่อนไขการชำระเงิน: การชำระเงินจะต้องชำระภายใน 30 วัน นับจากวันที่ออกใบกำกับภาษี",
      "4. ความรับผิด: บริษัทจะรับผิดชอบต่อความเสียหายตามที่ระบุในสัญญาการให้บริการ",
      "5. เหตุสุดวิสัย: คู่สัญญาทั้งสองฝ่ายจะไม่ต้องรับผิดชอบต่อความล่าช้าอันเกิดจากเหตุการณ์ที่อยู่เหนือการควบคุม"
    ],
    
    // Legacy fields for backward compatibility - ADD BENEFITS
    benefits: [
      "ลดต้นทุนการดำเนินงานได้ถึง 30%",
      "เพิ่มประสิทธิภาพการจัดการคลังสินค้า 50%",
      "ติดตามสินค้าแบบ Real-time ทุกขั้นตอน",
      "รายงานและวิเคราะห์ข้อมูลอัตโนมัติ",
    ],
    name: "ข้อเสนอโครงการระบบโลจิสติกส์ครบวงจร",
    customer: {
      company: "บริษัท เทคโนโลยี อินโนเวชั่น จำกัด",
      contact: "คุณวิภาวี สมหวัง",
      email: "vipavee@techinno.co.th",
      phone: "02-456-7890",
      address: "456 อาคารไอที ทาวเวอร์ ถนนพญาไท เขตราชเทวี กรุงเทพมหานคร 10400",
    },
    dealId: "DL-2024-156",
    status: "Draft",
    validUntil: "2024-12-31",
    validity: 30,
    createdDate: "1 ธ.ค. 2567",
    createdBy: {
      name: "Sarah Chen",
      initials: "SC",
      userId: "user1",
    },
    paymentTerm: "30",
  });

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
    if (proposal.currency === "THB") {
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
    return proposal.items.reduce(
      (sum, item) => sum + calculateLineTotal(item),
      0
    );
  };

  const calculateGlobalDiscountAmount = () => {
    const subtotal = calculateSubtotal();
    if (proposal.globalDiscountType === "percent") {
      return subtotal * (proposal.globalDiscount / 100);
    }
    return proposal.globalDiscount;
  };

  const calculateNetTotal = () => {
    const subtotal = calculateSubtotal();
    const globalDiscountAmount = calculateGlobalDiscountAmount();
    return subtotal - globalDiscountAmount;
  };

  const calculateVat = () => {
    if (!proposal.includeVat) return 0;
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
    onNavigate("/proposal-preview", proposal.id);
  };

  const updateCustomer = (field: string, value: string) => {
    setProposal({
      ...proposal,
      customer: {
        ...proposal.customer,
        [field]: value,
      },
    });
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...proposal.items];
    newItems[index] = {
      ...newItems[index],
      [field]: value,
    };
    setProposal({
      ...proposal,
      items: newItems,
    });
  };

  const addItem = () => {
    const newItem = {
      id: Date.now().toString(),
      itemName: "",
      description: "",
      quantity: 1,
      unit: "ชุด",
      unitPrice: 0,
      discount: 0,
    };
    setProposal({
      ...proposal,
      items: [...proposal.items, newItem],
    });
    toast.success("เพิ่มรายการเรียบร้อย");
  };

  const removeItem = (index: number) => {
    const newItems = proposal.items.filter((_, i) => i !== index);
    setProposal({
      ...proposal,
      items: newItems,
    });
    toast.success("ลบรายการเรียบร้อย");
  };

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...proposal.benefits];
    newBenefits[index] = value;
    setProposal({
      ...proposal,
      benefits: newBenefits,
    });
  };

  const addBenefit = () => {
    setProposal({
      ...proposal,
      benefits: [...proposal.benefits, ""],
    });
  };

  const removeBenefit = (index: number) => {
    const newBenefits = proposal.benefits.filter((_, i) => i !== index);
    setProposal({
      ...proposal,
      benefits: newBenefits,
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
                {proposal.name}
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                {proposal.documentNumber}
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
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-3 text-xs"
            >
              <Download className="h-3.5 w-3.5 mr-1.5" />
              ดาวน์โหลด
            </Button>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className={`${getStatusColor(proposal.status)} text-xs px-3 py-1 font-medium border`}
          >
            <span className="flex items-center gap-1.5">
              {getStatusIcon(proposal.status)}
              {proposal.status}
            </span>
          </Badge>
          <span className="text-xs text-gray-500">
            สร้างโดย {proposal.createdBy.name} • {proposal.createdDate}
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
                  <h2 className="text-sm font-semibold text-gray-900">
                    ข้อมูลเอกสาร
                  </h2>
                </div>

                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs">เลขที่เอกสาร</Label>
                      <Input
                        value={proposal.documentNumber}
                        onChange={(e) =>
                          setProposal({
                            ...proposal,
                            documentNumber: e.target.value,
                          })
                        }
                        className="mt-1 text-xs h-8"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs">วันที่ออกเอกสาร</Label>
                        <Input
                          type="date"
                          value={proposal.issueDate}
                          onChange={(e) =>
                            setProposal({
                              ...proposal,
                              issueDate: e.target.value,
                            })
                          }
                          className="mt-1 text-xs h-8"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">ใช้ได้ถึง</Label>
                        <Input
                          type="date"
                          value={proposal.validUntil}
                          onChange={(e) =>
                            setProposal({
                              ...proposal,
                              validUntil: e.target.value,
                            })
                          }
                          className="mt-1 text-xs h-8"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs">เงื่อนไขชำระเงิน</Label>
                      <Select
                        value={proposal.paymentTerm}
                        onValueChange={(value) =>
                          setProposal({ ...proposal, paymentTerm: value })
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
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <p className="text-[10px] text-gray-500 mb-1">
                        เลขที่เอกสาร
                      </p>
                      <p className="text-xs font-medium text-gray-900">
                        {proposal.documentNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 mb-1">
                        วันที่ออกเอกสาร
                      </p>
                      <p className="text-xs font-medium text-gray-900">
                        {new Date(proposal.issueDate).toLocaleDateString(
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
                        ใช้ได้ถึง
                      </p>
                      <p className="text-xs font-medium text-gray-900">
                        {new Date(proposal.validUntil).toLocaleDateString(
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
                        เงื่อนไขชำระเงิน
                      </p>
                      <p className="text-xs font-medium text-gray-900">
                        {proposal.paymentTerm === "0"
                          ? "เงินสด"
                          : `เครดิต ${proposal.paymentTerm} วัน`}
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
                  <Building2 className="h-5 w-5 text-purple-600" />
                  <h2 className="text-sm font-semibold text-gray-900">
                    ข้อมูลลูกค้า
                  </h2>
                </div>

                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs">ชื่อบริษัท</Label>
                      <Input
                        value={proposal.customer.company}
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
                          value={proposal.customer.contact}
                          onChange={(e) =>
                            updateCustomer("contact", e.target.value)
                          }
                          className="mt-1 text-xs h-8"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">เบอร์โทร</Label>
                        <Input
                          value={proposal.customer.phone}
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
                        value={proposal.customer.email}
                        onChange={(e) =>
                          updateCustomer("email", e.target.value)
                        }
                        className="mt-1 text-xs h-8"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">ที่อยู่</Label>
                      <Textarea
                        value={proposal.customer.address}
                        onChange={(e) =>
                          updateCustomer("address", e.target.value)
                        }
                        rows={2}
                        className="mt-1 text-xs"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Building2 className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-gray-900">
                          {proposal.customer.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <User className="h-4 w-4 text-gray-400 mt-0.5" />
                      <p className="text-xs text-gray-600">
                        {proposal.customer.contact}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Mail className="h-4 w-4 text-gray-400 mt-0.5" />
                      <p className="text-xs text-gray-600">
                        {proposal.customer.email}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone className="h-4 w-4 text-gray-400 mt-0.5" />
                      <p className="text-xs text-gray-600">
                        {proposal.customer.phone}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                      <p className="text-xs text-gray-600">
                        {proposal.customer.address}
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
                    <Package className="h-5 w-5 text-purple-600" />
                    <h2 className="text-sm font-semibold text-gray-900">
                      รายการสินค้า/บริการ
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
                  {proposal.items.map((item, index) => (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-lg p-3"
                    >
                      {isEditing ? (
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 space-y-2">
                              <Input
                                placeholder="ชื่อสินค้า/บริการ"
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
                            {proposal.items.length > 1 && (
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

            {/* Benefits */}
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-purple-600" />
                    <h2 className="text-sm font-semibold text-gray-900">
                      ประโยชน์ที่ได้รับ
                    </h2>
                  </div>
                  {isEditing && (
                    <Button
                      size="sm"
                      onClick={addBenefit}
                      variant="outline"
                      className="h-7 px-2 text-xs"
                    >
                      <Plus className="h-3.5 w-3.5 mr-1" />
                      เพิ่ม
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  {proposal.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {isEditing ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0" />
                          <Input
                            value={benefit}
                            onChange={(e) =>
                              updateBenefit(index, e.target.value)
                            }
                            className="flex-1 text-xs h-8"
                          />
                          {proposal.benefits.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeBenefit(index)}
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0" />
                          <p className="text-xs text-gray-700">{benefit}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Remarks */}
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <h2 className="text-sm font-semibold text-gray-900 mb-2">
                  หมายเหตุ / เงื่อนไข
                </h2>
                {isEditing ? (
                  <Textarea
                    value={proposal.remarksText}
                    onChange={(e) =>
                      setProposal({ ...proposal, remarksText: e.target.value })
                    }
                    rows={6}
                    className="text-xs"
                  />
                ) : (
                  <p className="text-xs text-gray-600 whitespace-pre-line">
                    {proposal.remarksText}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-3">
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
                      <span className="text-gray-600">
                        ยอดรวมก่อนหักส่วนลด
                      </span>
                      <span className="font-medium text-gray-900">
                        {formatCurrency(calculateSubtotal())}
                      </span>
                    </div>

                    {proposal.globalDiscount > 0 && (
                      <div className="flex justify-between text-red-600">
                        <span>
                          ส่วนลดรวม (
                          {proposal.globalDiscountType === "percent"
                            ? `${proposal.globalDiscount}%`
                            : formatCurrency(proposal.globalDiscount)}
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

                    {proposal.includeVat && (
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
                      <span className="text-base font-bold text-purple-600">
                        {formatCurrency(calculateGrandTotal())}
                      </span>
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
                      {proposal.dealId}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs text-purple-600 hover:text-purple-700"
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