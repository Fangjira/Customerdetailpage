import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  X,
  FileText,
  FileSignature,
  FileCheck,
  Plus,
  Trash2,
  Save,
  Eye,
  Edit3,
  Info,
  ArrowRight,
  ArrowLeft,
  Building2,
  User,
  Package,
  FileBarChart,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Card, CardContent } from "../ui/card";
import { toast } from "sonner";

interface DocumentGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentType: "proposal" | "contract" | "nda";
  onGenerate: (data: any) => void;
}

export function DocumentGeneratorModal({
  isOpen,
  onClose,
  documentType,
  onGenerate,
}: DocumentGeneratorModalProps) {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState<"form" | "preview">("form");
  const [sourceType, setSourceType] = useState<"deal" | "blank">("blank");
  
  // Company dropdown state
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const [companySearchTerm, setCompanySearchTerm] = useState("");
  const companyDropdownRef = useRef<HTMLDivElement>(null);
  
  // Sample company data
  const companyList = [
    { 
      nameTH: "บริษัท ไทยยูเนี่ยน โฟรเซ่น โปรดักส์ จำกัด (มหาชน)", 
      nameEN: "Thai Union Frozen Products PCL",
      address: "979/12-14 ถนนเอสเอ็มทาวเวอร์ เอสเอ็มทาวเวอร์ ชั้น 17-18 แขวงพระโขนงเหนือ เขตวัฒนา กรุงเทพมหานคร 10110 โทร: 02-298-0024"
    },
    { 
      nameTH: "บริษัท ซีพี ออลล์ จำกัด (มหาชน)", 
      nameEN: "CP ALL Public Company Limited",
      address: "313 อาคารซีพี ทาวเวอร์ ชั้น 22-29 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพมหานคร 10500 โทร: 02-677-1000"
    },
    { 
      nameTH: "บริษัท เซ็นทรัล รีเทล คอร์ปอเรชั่น จำกัด (มหาชน)", 
      nameEN: "Central Retail Corporation Public Company Limited",
      address: "4, 4/1-4/2, 4/4 ถนนราชดำริ แขวงลุมพินี เขตปทุมวัน กรุงเทพมหานคร 10330 โทร: 02-793-7000"
    },
    { 
      nameTH: "บริษัท เจริญโภคภัณฑ์อาหาร จำกัด (มหาชน)", 
      nameEN: "Charoen Pokphand Foods Public Company Limited",
      address: "313 อาคารซีพี ทาวเวอร์ ชั้น 22-29 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพมหานคร 10500 โทร: 02-638-2935"
    },
    { 
      nameTH: "บริษัท ปตท. จำกัด (มหาชน)", 
      nameEN: "PTT Public Company Limited",
      address: "555 ถนนวิภาวดีรังสิต แขวงจตุจักร เขตจตุจักร กรุงเทพมหานคร 10900 โทร: 02-537-2000"
    },
    { 
      nameTH: "บริษัท ไทยเบฟเวอเรจ จำกัด (มหาชน)", 
      nameEN: "Thai Beverage Public Company Limited",
      address: "62 อาคารไทยเบฟ ทาวเวอร์ ชั้น 20 ถนนรัชดาภิเษก แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110 โทร: 02-785-5555"
    },
    { 
      nameTH: "บริษัท ไทยออยล์ จำกัด (มหาชน)", 
      nameEN: "Thai Oil Public Company Limited",
      address: "1 อาคารไทยออยล์ ถนนวิภาวดีรังสิต แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900 โทร: 02-555-1111"
    },
    { 
      nameTH: "บริษัท เอสซีจี แพคเกจจิ้ง จำกัด (มหาชน)", 
      nameEN: "SCG Packaging Public Company Limited",
      address: "1 ถนนสวนพลู แขวงทุ่งมหาเมฆ เขตสาทร กรุงเทพมหานคร 10120 โทร: 02-586-3333"
    },
    { 
      nameTH: "บริษัท ปูนซีเมนต์ไทย จำกัด (มหาชน)", 
      nameEN: "Siam Cement Public Company Limited",
      address: "1 ถนนสวนพลู แขวงทุ่งมหาเมฆ เขตสาทร กรุงเทพมหานคร 10120 โทร: 02-586-3333"
    },
    { 
      nameTH: "บริษัท กรุงเทพดุสิตเวชการ จำกัด (มหาชน)", 
      nameEN: "Bangkok Dusit Medical Services Public Company Limited",
      address: "2 ถนนสุขุมวิท 3 แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพมหานคร 10110 โทร: 02-310-3000"
    },
  ];
  
  // Filter companies based on search term
  const filteredCompanies = companyList.filter(company => 
    company.nameTH.toLowerCase().includes(companySearchTerm.toLowerCase()) ||
    company.nameEN.toLowerCase().includes(companySearchTerm.toLowerCase())
  );
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (companyDropdownRef.current && !companyDropdownRef.current.contains(event.target as Node)) {
        setShowCompanyDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [documentData, setDocumentData] = useState({
    documentNumber: `PRP-2024-001`,
    issueDate: new Date().toISOString().split("T")[0],
    companyNameTH: "บริษัท วันลิงค์ โลจิสติกส์ จำกัด",
    companyNameEN: "mini CRM Logistics Co., Ltd.",
    companyAddress: "999 อาคารออฟฟิศพาร์ค ชั้น 15 ถนนพระราม 4 แขวงสีลม เขตบางรัก กรุงเทพมหานคร 10500 โทร: 02-234-5678",
    documentTitleTH: "",
    documentTitleEN: "",
    siteTH: "",
    siteEN: "",
    serviceTH: "",
    serviceEN: "",
    customerCompanyTH: "",
    customerCompanyEN: "",
    customerContactName: "",
    customerPosition: "",
    customerAddress: "",
    issuedBy: "mini CRM Team",
    issuedEmail: "contact@onelink.com",
    customerNameForIntro: "",
    introParagraphTH: "เรามีความยินดีที่จะนำเสนอข้อเสนอบริการโลจิสติกส์นี้ บริษัทของเรามีประสบการณ์กว่า 20 ปีในการให้บริการโซลูชั่นห่วงโซ่อุปทานแบบครบวงจร เรามุ่งมั่นในการให้บริการที่มีคุณภาพสูงสุดแก่ลูกค้าทุกท่าน",
    introParagraphEN: "We are pleased to present this proposal for logistics services. Our company has over 20 years of experience in providing comprehensive supply chain solutions. We are committed to delivering the highest quality service to all our customers.",
    descriptionTH: "ข้อเสนอนี้ครอบคลุมบริการโลจิสติกส์แบบครบวงจร ประกอบด้วย คลังสินค้า การขนส่ง และการบริหารจัดการห่วงโซ่อุปทาน โดยมีรายละเอียดตามที่ระบุในขอบเขตการดำเนินงานด้านล่าง",
    descriptionEN: "This proposal covers comprehensive logistics services including warehousing, transportation, and supply chain management, with details as specified in the scope of works below.",
    scopeOfWorkTH: "การบริหารจัดการคลังสินค้าและควบคุมสต็อก\nการวางแผนและดำเนินการขนส่ง\nระบบติดตามและรายงานแบบเรียลไทม์\nบริการดูแลลูกค้าตลอด 24 ชั่วโมง",
    scopeOfWorkEN: "Warehouse management and inventory control\nTransportation planning and execution\nReal-time tracking and reporting\nCustomer service support 24/7",
    items: [
      {
        id: "1",
        no: "1",
        descriptionTH: "",
        descriptionEN: "",
        unit: "ชุด",
        quantity: 1,
        unitPrice: 0,
        discount: 0,
      },
    ],
    currency: "THB",
    includeVat: true,
    globalDiscount: 0,
    termsTH: "ราคาที่เสนอเป็นสกุลเงินบาท\nข้อเสนอนี้มีอายุ 30 วัน นับจากวันที่ออกเอกสาร\nเงื่อนไขการชำระเงิน: เครดิต 30 วัน\nบริษัทฯ ขอสงวนสิทธิ์ในการเปลี่ยนแปลงเงื่อนไขโดยไม่ต้องแจ้งให้ทราบล่วงหน้า",
    termsEN: "All prices are quoted in Thai Baht (THB).\nThis proposal is valid for 30 days from issue date.\nPayment term: Net 30 days.\nThe company reserves the right to change terms without prior notice.",
    // Signature fields
    signatureProviderName: "",
    signatureProviderPosition: "",
    signatureProviderDate: new Date().toISOString().split("T")[0],
    signatureProviderImage: "",
    signatureReceivers: [
      {
        id: "1",
        name: "",
        position: "",
        date: "",
        image: "",
      },
    ],
  });

  const getDocumentIcon = () => {
    switch (documentType) {
      case "proposal":
        return <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />;
      case "contract":
        return <FileSignature className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />;
      case "nda":
        return <FileCheck className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />;
    }
  };

  const getDocumentColor = () => {
    switch (documentType) {
      case "proposal":
        return "purple";
      case "contract":
        return "orange";
      case "nda":
        return "blue";
    }
  };

  const getDocumentTitle = () => {
    switch (documentType) {
      case "proposal":
        return "สร้างข้อเสนอใหม่";
      case "contract":
        return "สร้างสัญญาใหม่";
      case "nda":
        return "สร้าง NDA ใหม่";
    }
  };

  const validateForm = () => {
    const errors = [];
    if (!documentData.documentTitleTH) errors.push("ชื่อเอกสาร (TH)");
    if (!documentData.documentTitleEN) errors.push("ชื่อเอกสาร (EN)");
    if (!documentData.customerCompanyTH) errors.push("ชื่อบริษัทลูกค้า (TH)");
    if (!documentData.customerContactName) errors.push("ผู้ติดต่อ");
    if (documentData.items.some(item => !item.descriptionTH || item.unitPrice === 0)) {
      errors.push("รายการค่าบริการไม่สมบูรณ์");
    }
    return errors;
  };

  const calculateLineTotal = (item: any) => {
    const subtotal = item.quantity * item.unitPrice;
    const discountAmount = subtotal * (item.discount / 100);
    return subtotal - discountAmount;
  };

  const calculateSubtotal = () => {
    return documentData.items.reduce((sum, item) => sum + calculateLineTotal(item), 0);
  };

  const calculateGlobalDiscountAmount = () => {
    return calculateSubtotal() * (documentData.globalDiscount / 100);
  };

  const calculateNetTotal = () => {
    return calculateSubtotal() - calculateGlobalDiscountAmount();
  };

  const calculateVat = () => {
    return calculateNetTotal() * 0.07;
  };

  const calculateGrandTotal = () => {
    const netTotal = calculateNetTotal();
    const vat = documentData.includeVat ? calculateVat() : 0;
    return netTotal + vat;
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("th-TH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleAddItem = () => {
    setDocumentData({
      ...documentData,
      items: [
        ...documentData.items,
        {
          id: Date.now().toString(),
          no: (documentData.items.length + 1).toString(),
          descriptionTH: "",
          descriptionEN: "",
          unit: "ชุด",
          quantity: 1,
          unitPrice: 0,
          discount: 0,
        },
      ],
    });
  };

  const handleRemoveItem = (index: number) => {
    if (documentData.items.length === 1) {
      toast.error("ต้องมีอย่างน้อย 1 รายการ");
      return;
    }
    setDocumentData({
      ...documentData,
      items: documentData.items.filter((_, i) => i !== index),
    });
  };

  const handleUpdateItem = (index: number, field: string, value: any) => {
    const newItems = [...documentData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setDocumentData({ ...documentData, items: newItems });
  };

  const handleAddReceiver = () => {
    setDocumentData({
      ...documentData,
      signatureReceivers: [
        ...documentData.signatureReceivers,
        {
          id: Date.now().toString(),
          name: "",
          position: "",
          date: "",
          image: "",
        },
      ],
    });
  };

  const handleRemoveReceiver = (index: number) => {
    if (documentData.signatureReceivers.length === 1) {
      toast.error("ต้องมีอย่างน้อย 1 ผู้รับ");
      return;
    }
    setDocumentData({
      ...documentData,
      signatureReceivers: documentData.signatureReceivers.filter((_, i) => i !== index),
    });
  };

  const handleUpdateReceiver = (index: number, field: string, value: any) => {
    const newReceivers = [...documentData.signatureReceivers];
    newReceivers[index] = { ...newReceivers[index], [field]: value };
    setDocumentData({ ...documentData, signatureReceivers: newReceivers });
  };

  const handleNextToForm = () => {
    setCurrentStep("form");
  };

  const handleNextToPreview = () => {
    const errors = validateForm();
    if (errors.length > 0) {
      toast.error(`กรุณากรอกข้อมูลให้ครบถ้วน: ${errors.join(", ")}`);
      return;
    }
    setCurrentStep("preview");
  };

  const handleBackToForm = () => {
    setCurrentStep("form");
  };

  const handleGenerate = () => {
    console.log("Generating document:", documentData);
    onGenerate(documentData);
    toast.success("สร้างเอกสารเรียบร้อย!");
    onClose();
  };

  if (!isOpen) return null;

  const color = getDocumentColor();

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl lg:max-w-5xl xl:max-w-6xl max-h-[95vh] flex flex-col overflow-hidden">
        {/* Compact Header */}
        <div className={`px-3 py-2 border-b border-${color}-200 bg-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1">
              <div className={`w-5 h-5 rounded bg-${color}-500 flex items-center justify-center`}>
                {getDocumentIcon()}
              </div>
              <h2 className="text-sm font-semibold text-gray-900">
                {getDocumentTitle()}
              </h2>
            </div>
            <div className="flex items-center gap-1">
              {currentStep === "form" && (
                <Button
                  size="sm"
                  onClick={handleNextToPreview}
                  className={`h-7 px-3 text-xs font-semibold bg-${color}-600 hover:bg-${color}-700`}
                >
                  <Eye className="h-3.5 w-3.5 mr-1" />
                  ตัวอย่าง
                </Button>
              )}
              {currentStep === "preview" && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBackToForm}
                    className="h-7 px-3 text-xs font-semibold"
                  >
                    <ArrowLeft className="h-3.5 w-3.5 mr-1" />
                    ย้อนกลับ
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleGenerate}
                    className={`h-7 px-3 text-xs font-semibold bg-${color}-600 hover:bg-${color}-700`}
                  >
                    <Save className="h-3.5 w-3.5 mr-1" />
                    สร้างเอกสาร
                  </Button>
                </>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-7 w-7 p-0 hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto bg-gray-50">
          {/* STEP: FORM */}
          {currentStep === "form" && (
            <div className="p-4 sm:p-6 lg:p-8">
              {/* Source Type Selector */}
              <div className="mb-4 sm:mb-6 bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
                <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                  แหล่งข้อมูล
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSourceType("deal")}
                    className={`p-2 rounded-lg border-2 transition-all text-left ${
                      sourceType === "deal"
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded flex items-center justify-center ${
                        sourceType === "deal" ? "bg-green-500" : "bg-gray-100"
                      }`}>
                        <FileBarChart className={`h-4 w-4 ${
                          sourceType === "deal" ? "text-white" : "text-gray-600"
                        }`} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-gray-900">จาก CRM</div>
                        <div className="text-[10px] text-gray-500">ดีล/ใบเสนอราคา</div>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setSourceType("blank")}
                    className={`p-2 rounded-lg border-2 transition-all text-left ${
                      sourceType === "blank"
                        ? "border-gray-600 bg-gray-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded flex items-center justify-center ${
                        sourceType === "blank" ? "bg-gray-500" : "bg-gray-100"
                      }`}>
                        <Plus className={`h-4 w-4 ${
                          sourceType === "blank" ? "text-white" : "text-gray-600"
                        }`} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-gray-900">กรอกเอง</div>
                        <div className="text-[10px] text-gray-500">เริ่มต้นใหม่</div>
                      </div>
                    </div>
                  </button>
                </div>
                
                {/* Search Box - เฉพาะเมื่อเลือก CRM */}
                {sourceType === "deal" && (
                  <div className="mt-3">
                    <Input
                      placeholder="ค้นหาดีล / ใบเสนอราคา..."
                      className="h-9 text-sm"
                    />
                  </div>
                )}
              </div>

              {/* Form Fields */}
              <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                {/* Basic Info */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center">
                        <FileText className="h-3.5 w-3.5 text-white" />
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        ข้อมูลเอกสาร
                      </h3>
                    </div>
                  </div>
                  <CardContent className="p-4 sm:p-5 lg:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <Label className="text-xs sm:text-sm font-medium text-gray-700 mb-1.5 block">เลขที่เอกสาร</Label>
                        <Input
                          value={documentData.documentNumber}
                          onChange={(e) => setDocumentData({ ...documentData, documentNumber: e.target.value })}
                          className="h-9 sm:h-10 text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-xs sm:text-sm font-medium text-gray-700 mb-1.5 block">วันที่ออกเอกสาร</Label>
                        <Input
                          type="date"
                          value={documentData.issueDate}
                          onChange={(e) => setDocumentData({ ...documentData, issueDate: e.target.value })}
                          className="h-9 sm:h-10 text-sm"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-4 sm:mt-5">
                      <div>
                        <Label className="text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                          ชื่อเอกสาร (TH) <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          value={documentData.documentTitleTH}
                          onChange={(e) => setDocumentData({ ...documentData, documentTitleTH: e.target.value })}
                          placeholder="เช่น สัญญาให้บริการโลจิสติกส์"
                          className="h-9 sm:h-10 text-sm border"
                        />
                      </div>
                      <div>
                        <Label className="text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                          ชื่อเอกสาร (EN) <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          value={documentData.documentTitleEN}
                          onChange={(e) => setDocumentData({ ...documentData, documentTitleEN: e.target.value })}
                          placeholder="e.g. Agreement for Logistics Services"
                          className="h-9 sm:h-10 text-sm border"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-4 sm:mt-5">
                      <div>
                        <Label className="text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">สถานที่ (TH)</Label>
                        <Input
                          value={documentData.siteTH}
                          onChange={(e) => setDocumentData({ ...documentData, siteTH: e.target.value })}
                          placeholder="เช่น โรงงานบางปู"
                          className="h-9 sm:h-10 text-sm border"
                        />
                      </div>
                      <div>
                        <Label className="text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">สถานที่ (EN)</Label>
                        <Input
                          value={documentData.siteEN}
                          onChange={(e) => setDocumentData({ ...documentData, siteEN: e.target.value })}
                          placeholder="e.g. Bangpu Factory"
                          className="h-9 sm:h-10 text-sm border"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-4 sm:mt-5">
                      <div>
                        <Label className="text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">บริการ (TH)</Label>
                        <Input
                          value={documentData.serviceTH}
                          onChange={(e) => setDocumentData({ ...documentData, serviceTH: e.target.value })}
                          placeholder="เช่น บริการขนส่งสินค้าทางบก"
                          className="h-9 sm:h-10 text-sm border"
                        />
                      </div>
                      <div>
                        <Label className="text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">บริการ (EN)</Label>
                        <Input
                          value={documentData.serviceEN}
                          onChange={(e) => setDocumentData({ ...documentData, serviceEN: e.target.value })}
                          placeholder="e.g. Land Transportation Service"
                          className="h-9 sm:h-10 text-sm border"
                        />
                      </div>
                    </div>
                  </CardContent>
                </div>

                {/* Customer Info */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-green-50 to-white px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-green-100 flex items-center justify-center">
                        <Building2 className="h-4 w-4 text-green-600" />
                      </div>
                      <h3 className="text-sm font-bold text-gray-900">
                        ข้อมูลลูกค้า
                      </h3>
                    </div>
                  </div>
                  <CardContent className="p-4 sm:p-5 lg:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div className="relative" ref={companyDropdownRef}>
                        <Label className="text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                          ชื่อบริษัท (TH) <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Input
                            value={companySearchTerm || documentData.customerCompanyTH}
                            onChange={(e) => {
                              const value = e.target.value;
                              setCompanySearchTerm(value);
                              setDocumentData({ ...documentData, customerCompanyTH: value });
                              setShowCompanyDropdown(true);
                            }}
                            onFocus={() => setShowCompanyDropdown(true)}
                            placeholder="พิมพ์เพื่อค้นหาบริษัท..."
                            className="h-9 sm:h-10 text-sm border pr-8"
                          />
                          <ChevronDown 
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" 
                          />
                          
                          {/* Dropdown List */}
                          {showCompanyDropdown && filteredCompanies.length > 0 && (
                            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                              {filteredCompanies.map((company, index) => (
                                <button
                                  key={index}
                                  type="button"
                                  onClick={() => {
                                    setDocumentData({ 
                                      ...documentData, 
                                      customerCompanyTH: company.nameTH,
                                      customerCompanyEN: company.nameEN,
                                      customerAddress: company.address
                                    });
                                    setCompanySearchTerm("");
                                    setShowCompanyDropdown(false);
                                  }}
                                  className="w-full text-left px-3 py-2 hover:bg-green-50 border-b border-gray-100 last:border-b-0 transition-colors"
                                >
                                  <div className="text-xs font-medium text-gray-900">{company.nameTH}</div>
                                  <div className="text-[10px] text-gray-500 mt-0.5">{company.nameEN}</div>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">ชื่อบริษัท (EN)</Label>
                        <Input
                          value={documentData.customerCompanyEN}
                          onChange={(e) => setDocumentData({ ...documentData, customerCompanyEN: e.target.value })}
                          placeholder="Company..."
                          className="h-9 sm:h-10 text-sm border"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-4 sm:mt-5">
                      <div>
                        <Label className="text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                          ผู้ติดต่อ <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          value={documentData.customerContactName}
                          onChange={(e) => setDocumentData({
                            ...documentData,
                            customerContactName: e.target.value,
                            customerNameForIntro: e.target.value
                          })}
                          placeholder="คุณ..."
                          className="h-9 sm:h-10 text-sm border"
                        />
                      </div>
                      <div>
                        <Label className="text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">ตำแหน่ง</Label>
                        <Input
                          value={documentData.customerPosition}
                          onChange={(e) => setDocumentData({ ...documentData, customerPosition: e.target.value })}
                          placeholder="ผู้จัดการ..."
                          className="h-9 sm:h-10 text-sm border"
                        />
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-5">
                      <Label className="text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">ที่อยู่</Label>
                      <Textarea
                        value={documentData.customerAddress}
                        onChange={(e) => setDocumentData({ ...documentData, customerAddress: e.target.value })}
                        placeholder="ที่อยู่บริษัทลูกค้า..."
                        className="text-sm h-20 sm:h-24 resize-none border"
                      />
                    </div>
                  </CardContent>
                </div>

                {/* Issuer Info - HIDDEN (Auto-filled with default values) */}

                {/* Items */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-50 to-white px-4 sm:px-5 lg:px-6 py-3 sm:py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-orange-100 flex items-center justify-center">
                          <Package className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-gray-900">
                          รายการค่าบริการ <span className="text-red-500">*</span>
                        </h3>
                      </div>
                      <Button
                        size="sm"
                        onClick={handleAddItem}
                        className={`h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm font-semibold bg-gradient-to-r from-${color}-600 to-${color}-700`}
                      >
                        <Plus className="h-4 w-4 sm:mr-2" />
                        <span className="hidden sm:inline">เพิ่มรายการ</span>
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4 sm:p-5 lg:p-6">
                    <div className="space-y-4 sm:space-y-5">
                      {documentData.items.map((item, index) => (
                        <div
                          key={item.id}
                          className="border-2 border-gray-200 rounded-xl p-5 sm:p-6 bg-gradient-to-br from-white to-gray-50"
                        >
                          <div className="flex items-start justify-between mb-4 sm:mb-5">
                            <span className="text-sm font-bold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg">
                              รายการที่ {index + 1}
                            </span>
                            {documentData.items.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveItem(index)}
                                className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 rounded-lg"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          <div className="space-y-4 sm:space-y-5">
                            <div>
                              <Label className="text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                                รายการ (TH) <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                placeholder="เช่น บริการขนส่งสินค้า"
                                value={item.descriptionTH}
                                onChange={(e) => handleUpdateItem(index, "descriptionTH", e.target.value)}
                                className="h-10 sm:h-11 text-sm border"
                              />
                            </div>
                            <div>
                              <Label className="text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Description (EN)</Label>
                              <Input
                                placeholder="e.g. Transportation Service"
                                value={item.descriptionEN}
                                onChange={(e) => handleUpdateItem(index, "descriptionEN", e.target.value)}
                                className="h-10 sm:h-11 text-sm border"
                              />
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                              <div>
                                <Label className="text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">หน่วย</Label>
                                <Input
                                  placeholder="ชุด"
                                  value={item.unit}
                                  onChange={(e) => handleUpdateItem(index, "unit", e.target.value)}
                                  className="h-10 sm:h-11 text-sm border"
                                />
                              </div>
                              <div>
                                <Label className="text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">จำนวน</Label>
                                <Input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => handleUpdateItem(index, "quantity", parseFloat(e.target.value) || 0)}
                                  className="h-10 sm:h-11 text-sm border"
                                />
                              </div>
                              <div className="col-span-2 sm:col-span-1">
                                <Label className="text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                                  ราคา/หน่วย <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                  type="number"
                                  value={item.unitPrice}
                                  onChange={(e) => handleUpdateItem(index, "unitPrice", parseFloat(e.target.value) || 0)}
                                  className="h-10 sm:h-11 text-sm border"
                                />
                              </div>
                              <div>
                                <Label className="text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">ส่วนลด%</Label>
                                <Input
                                  type="number"
                                  value={item.discount}
                                  onChange={(e) => handleUpdateItem(index, "discount", parseFloat(e.target.value) || 0)}
                                  className="h-10 sm:h-11 text-sm border"
                                />
                              </div>
                              <div className="col-span-2 sm:col-span-3 lg:col-span-1">
                                <Label className="text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">รวม</Label>
                                <Input
                                  value={formatCurrency(calculateLineTotal(item))}
                                  disabled
                                  className="h-10 sm:h-11 text-sm bg-gray-100 font-bold border"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Summary */}
                    <div className="mt-5 sm:mt-6 lg:mt-8 bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 sm:p-6 lg:p-8 border-2 border-gray-200 shadow-sm">
                      <div className="text-sm sm:text-base space-y-3 sm:space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-700">ยอดรวม:</span>
                          <span className="text-base sm:text-lg font-bold text-gray-900">฿{formatCurrency(calculateSubtotal())}</span>
                        </div>
                        {documentData.includeVat && (
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-700">VAT 7%:</span>
                            <span className="text-base sm:text-lg font-bold text-gray-900">฿{formatCurrency(calculateVat())}</span>
                          </div>
                        )}
                        <div className="flex justify-between items-center pt-3 sm:pt-4 border-t-2 border-gray-300">
                          <span className="text-base sm:text-lg font-bold text-gray-900">ยอดรวมทั้งสิ้น:</span>
                          <span className={`text-xl sm:text-2xl lg:text-3xl font-bold text-${color}-600`}>
                            ฿{formatCurrency(calculateGrandTotal())}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>

                {/* Scope of Work */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-50 to-white px-4 sm:px-5 lg:px-6 py-3 sm:py-4 border-b border-gray-200">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Package className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-gray-900">
                        ขอบเขตงาน / SCOPE OF WORK
                      </h3>
                    </div>
                  </div>
                  <CardContent className="p-4 sm:p-5 lg:p-6">
                    <div className="space-y-4 sm:space-y-5">
                      {/* Scope TH */}
                      <div>
                        <Label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">
                          ขอบเขตงาน (TH)
                        </Label>
                        <Textarea
                          value={documentData.scopeOfWorkTH}
                          onChange={(e) => setDocumentData({ ...documentData, scopeOfWorkTH: e.target.value })}
                          placeholder="ระบุขอบเขตงาน (แต่ละข้อขึ้นบรรทัดใหม่)"
                          rows={6}
                          className="text-sm border resize-none"
                        />
                      </div>

                      {/* Scope EN */}
                      <div>
                        <Label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">
                          Scope of Work (EN)
                        </Label>
                        <Textarea
                          value={documentData.scopeOfWorkEN}
                          onChange={(e) => setDocumentData({ ...documentData, scopeOfWorkEN: e.target.value })}
                          placeholder="Enter scope of work (one item per line)"
                          rows={6}
                          className="text-sm border resize-none"
                        />
                      </div>
                    </div>
                  </CardContent>
                </div>

                {/* Terms and Conditions */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-50 to-white px-4 sm:px-5 lg:px-6 py-3 sm:py-4 border-b border-gray-200">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-purple-100 flex items-center justify-center">
                        <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-gray-900">
                        เงื่อนไขและข้อกำหนด / Terms & Conditions
                      </h3>
                    </div>
                  </div>
                  <CardContent className="p-4 sm:p-5 lg:p-6">
                    <div className="space-y-4 sm:space-y-5">
                      {/* Terms TH */}
                      <div>
                        <Label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">
                          เงื่อนไขและข้อกำหนด (TH)
                        </Label>
                        <Textarea
                          value={documentData.termsTH}
                          onChange={(e) => setDocumentData({ ...documentData, termsTH: e.target.value })}
                          className="min-h-[120px] text-sm border resize-y"
                          placeholder="กรอกเงื่อนไขและข้���กำหนด (แต่ละบรรทัดคือข้อกำหนดหนึ่งข้อ)"
                        />
                      </div>

                      {/* Terms EN */}
                      <div>
                        <Label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">
                          Terms & Conditions (EN)
                        </Label>
                        <Textarea
                          value={documentData.termsEN}
                          onChange={(e) => setDocumentData({ ...documentData, termsEN: e.target.value })}
                          className="min-h-[120px] text-sm border resize-y"
                          placeholder="Enter terms and conditions (one per line)"
                        />
                      </div>
                    </div>
                  </CardContent>
                </div>

                {/* Signature Section */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-50 to-white px-4 sm:px-5 lg:px-6 py-3 sm:py-4 border-b border-gray-200">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-indigo-100 flex items-center justify-center">
                        <Edit3 className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" />
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-gray-900">
                        ลายเซ็น / Signature
                      </h3>
                    </div>
                  </div>
                  <CardContent className="p-4 sm:p-5 lg:p-6">
                    {/* Provider Signature */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <User className="h-4 w-4 text-indigo-600" />
                        <h4 className="text-sm font-semibold text-gray-900">ผู้เสนอ / Provider</h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">
                            ชื่อผู้ลงนาม
                          </Label>
                          <Input
                            value={documentData.signatureProviderName}
                            onChange={(e) => setDocumentData({ ...documentData, signatureProviderName: e.target.value })}
                            placeholder="เช่น นายสมชาย ใจดี"
                            className="h-9 sm:h-10 text-sm border"
                          />
                        </div>
                        <div>
                          <Label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">
                            ตำแหน่ง
                          </Label>
                          <Input
                            value={documentData.signatureProviderPosition}
                            onChange={(e) => setDocumentData({ ...documentData, signatureProviderPosition: e.target.value })}
                            placeholder="เช่น ผู้จัดการทั่วไป"
                            className="h-9 sm:h-10 text-sm border"
                          />
                        </div>
                        <div>
                          <Label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">
                            วันที่
                          </Label>
                          <Input
                            type="date"
                            value={documentData.signatureProviderDate}
                            onChange={(e) => setDocumentData({ ...documentData, signatureProviderDate: e.target.value })}
                            className="h-9 sm:h-10 text-sm border"
                          />
                        </div>
                        <div>
                          <Label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">
                            รูปลายเซ็น (URL) - ถ้ามี
                          </Label>
                          <Input
                            value={documentData.signatureProviderImage}
                            onChange={(e) => setDocumentData({ ...documentData, signatureProviderImage: e.target.value })}
                            placeholder="https://..."
                            className="h-9 sm:h-10 text-sm border"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Receiver Signature - Multiple */}
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-green-600" />
                          <h4 className="text-sm font-semibold text-gray-900">ผู้รับ / Receiver</h4>
                        </div>
                        <Button
                          type="button"
                          size="sm"
                          onClick={handleAddReceiver}
                          className="h-8 px-3 text-xs font-semibold bg-gradient-to-r from-green-600 to-green-700"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          เพิ่มผู้รับ
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {documentData.signatureReceivers.map((receiver, index) => (
                          <div key={receiver.id} className="border-2 border-green-100 rounded-lg p-4 bg-gradient-to-br from-white to-green-50">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-xs font-bold text-green-700">ผู้รับคนที่ {index + 1}</span>
                              {documentData.signatureReceivers.length > 1 && (
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleRemoveReceiver(index)}
                                  className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              )}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <Label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">
                                  ชื่อผู้ลงนาม
                                </Label>
                                <Input
                                  value={receiver.name}
                                  onChange={(e) => handleUpdateReceiver(index, "name", e.target.value)}
                                  placeholder="เช่น นายสมศักดิ์ รับทราบ"
                                  className="h-9 sm:h-10 text-sm border"
                                />
                              </div>
                              <div>
                                <Label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">
                                  ตำแหน่ง
                                </Label>
                                <Input
                                  value={receiver.position}
                                  onChange={(e) => handleUpdateReceiver(index, "position", e.target.value)}
                                  placeholder="เช่น ผู้อำนวยการ"
                                  className="h-9 sm:h-10 text-sm border"
                                />
                              </div>
                              <div>
                                <Label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">
                                  วันที่
                                </Label>
                                <Input
                                  type="date"
                                  value={receiver.date}
                                  onChange={(e) => handleUpdateReceiver(index, "date", e.target.value)}
                                  className="h-9 sm:h-10 text-sm border"
                                />
                              </div>
                              <div>
                                <Label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">
                                  รูปลายเซ็น (URL) - ถ้ามี
                                </Label>
                                <Input
                                  value={receiver.image}
                                  onChange={(e) => handleUpdateReceiver(index, "image", e.target.value)}
                                  placeholder="https://..."
                                  className="h-9 sm:h-10 text-sm border"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </div>
              </div>
            </div>
          )}

          {/* STEP: PREVIEW */}
          {currentStep === "preview" && (
            <div className="p-2 sm:p-5">
              <div className="max-w-full sm:max-w-[21cm] mx-auto">
                {/* Info Banner - ลดขนาด */}
                <div className="bg-gradient-to-r from-green-50 to-white border border-green-200 rounded-lg p-2.5 sm:p-4 shadow-md mb-3 sm:mb-4">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Info className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-semibold text-green-900 mb-0.5 sm:mb-1">
                        ✅ ตรวจสอบและแก้ไขข้อมูลได้เลย
                      </h4>
                      <p className="text-[10px] sm:text-xs text-green-700">
                        แก้ไขตาราง "ค่าบริการ" และ "เงื่อนไขและข้อกำหนด" ได้โดยตรง
                      </p>
                    </div>
                  </div>
                </div>

                {/* Document Preview - ลดขนาดทั้งหมด */}
                <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-3 sm:mb-4 p-3 sm:p-6">
                  <div className="text-center mb-3 sm:mb-5">
                    <div className="inline-block w-12 h-12 sm:w-16 sm:h-16 bg-[#7BC9A6] rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white text-xs sm:text-base font-bold">MC</span>
                    </div>
                  </div>

                  <div className="text-center mb-3 sm:mb-4">
                    <h1 className="text-sm sm:text-2xl font-bold text-gray-800 mb-0.5 sm:mb-1">
                      {documentData.companyNameEN}
                    </h1>
                    <p className="text-xs sm:text-xl font-semibold text-gray-700">
                      {documentData.companyNameTH}
                    </p>
                  </div>

                  <div className="border-t border-gray-400 my-2.5 sm:my-4"></div>

                  <div className="text-center mb-3 sm:mb-5">
                    <h2 className="text-sm sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-1.5">
                      {documentData.documentTitleEN}
                    </h2>
                    <p className="text-xs sm:text-base text-gray-700">
                      {documentData.documentTitleTH}
                    </p>
                  </div>

                  {(documentData.siteEN || documentData.serviceEN) && (
                    <>
                      <div className="text-center mb-2.5 sm:mb-4">
                        {documentData.siteEN && (
                          <p className="text-[10px] sm:text-sm mb-0.5 sm:mb-1">
                            <span className="font-semibold">{documentData.siteEN}</span>
                            {documentData.siteTH && ` / ${documentData.siteTH}`}
                          </p>
                        )}
                        {documentData.serviceEN && (
                          <p className="text-[10px] sm:text-sm">
                            <span className="font-semibold">{documentData.serviceEN}</span>
                            {documentData.serviceTH && ` / ${documentData.serviceTH}`}
                          </p>
                        )}
                      </div>
                      <div className="border-t border-gray-300 my-2.5 sm:my-4"></div>
                    </>
                  )}

                  <div className="text-center mb-3 sm:mb-6">
                    <p className="text-xs sm:text-base font-semibold mb-0.5 sm:mb-1">
                      {documentData.customerCompanyEN || documentData.customerCompanyTH}
                    </p>
                    {documentData.customerCompanyTH && documentData.customerCompanyEN && (
                      <p className="text-xs sm:text-base mb-0.5 sm:mb-1">
                        {documentData.customerCompanyTH}
                      </p>
                    )}
                    <p className="text-xs sm:text-base text-gray-700">
                      {documentData.customerContactName}
                      {documentData.customerPosition && ` (${documentData.customerPosition})`}
                    </p>
                    {documentData.customerAddress && (
                      <p className="text-[9px] sm:text-xs text-gray-600 mt-1">
                        {documentData.customerAddress}
                      </p>
                    )}
                  </div>

                  <div className="border border-gray-300 p-2.5 sm:p-4 rounded-lg bg-gray-50 mb-3 sm:mb-5">
                    <div className="space-y-2 sm:space-y-2.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        <div>
                          <p className="text-[10px] sm:text-sm font-semibold mb-0.5 sm:mb-1">ออกโดย / Issued by:</p>
                          <p className="text-[10px] sm:text-sm">{documentData.issuedBy}</p>
                          <p className="text-[9px] sm:text-xs text-gray-600">{documentData.issuedEmail}</p>
                        </div>
                        <div>
                          <p className="text-[10px] sm:text-sm font-semibold mb-0.5 sm:mb-1">เลขที่ / No.:</p>
                          <p className="text-[10px] sm:text-sm">{documentData.documentNumber}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] sm:text-sm font-semibold mb-0.5 sm:mb-1">วันที่ / Date:</p>
                        <p className="text-[10px] sm:text-sm">
                          {new Date(documentData.issueDate).toLocaleDateString('th-TH', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Scope of Work */}
                  {documentData.scopeOfWorkTH && documentData.scopeOfWorkTH.trim() && (
                    <div className="mb-3 sm:mb-5 bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                      <h3 className="text-xs sm:text-base font-bold mb-2 sm:mb-3 text-blue-900">
                        ขอบเขตงาน / SCOPE OF WORK
                      </h3>
                      <div className="space-y-1.5 sm:space-y-2">
                        {documentData.scopeOfWorkTH.split('\n').filter(line => line.trim()).map((work, index) => {
                          const worksEN = documentData.scopeOfWorkEN ? documentData.scopeOfWorkEN.split('\n').filter(line => line.trim()) : [];
                          return (
                            <div key={index} className="flex gap-2">
                              <span className="text-xs sm:text-sm text-gray-600 flex-shrink-0">{index + 1}.</span>
                              <div className="flex-1">
                                <p className="text-xs sm:text-sm text-gray-800">{work}</p>
                                {worksEN[index] && (
                                  <p className="text-[10px] sm:text-xs text-gray-600 italic">{worksEN[index]}</p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Service Charges Table - Mobile Optimized */}
                  <div className="mb-3 sm:mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xs sm:text-base font-bold">ค่าบริการ / Charges</h3>
                      <Badge className="bg-green-100 text-green-700 text-[9px] px-1.5 py-0.5">
                        <Edit3 className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 inline" />
                        แก้ไขได้
                      </Badge>
                    </div>

                    {/* Mobile: Card Layout, Desktop: Table */}
                    <div className="block sm:hidden space-y-2">
                      {documentData.items.map((item, index) => (
                        <div key={item.id} className="border border-gray-300 rounded-lg p-2 bg-white">
                          <div className="flex justify-between items-start mb-1.5">
                            <span className="text-[9px] font-bold text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded">
                              #{index + 1}
                            </span>
                          </div>
                          <div className="space-y-1.5">
                            <input
                              type="text"
                              value={item.descriptionTH}
                              onChange={(e) => handleUpdateItem(index, "descriptionTH", e.target.value)}
                              className="w-full px-2 py-1 text-[10px] border border-gray-300 rounded"
                              placeholder="รายการ (TH)"
                            />
                            <input
                              type="text"
                              value={item.descriptionEN}
                              onChange={(e) => handleUpdateItem(index, "descriptionEN", e.target.value)}
                              className="w-full px-2 py-1 text-[9px] border border-gray-300 rounded text-gray-600"
                              placeholder="Description (EN)"
                            />
                            <div className="grid grid-cols-3 gap-1.5 text-[9px]">
                              <div>
                                <label className="text-[10px] text-gray-600 mb-1 block">หน่วย</label>
                                <input
                                  type="text"
                                  value={item.unit}
                                  onChange={(e) => handleUpdateItem(index, "unit", e.target.value)}
                                  className="w-full px-1.5 py-1.5 text-xs text-center border border-gray-300 rounded"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-gray-600 mb-1 block">จำนวน</label>
                                <input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => handleUpdateItem(index, "quantity", parseFloat(e.target.value) || 0)}
                                  className="w-full px-1.5 py-1.5 text-xs text-center border border-gray-300 rounded"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-gray-600 mb-1 block">ส่วนลด%</label>
                                <input
                                  type="number"
                                  value={item.discount}
                                  onChange={(e) => handleUpdateItem(index, "discount", parseFloat(e.target.value) || 0)}
                                  className="w-full px-1.5 py-1.5 text-xs text-center border border-gray-300 rounded"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <label className="text-[10px] text-gray-600 mb-1 block">ราคา/หน่วย</label>
                                <input
                                  type="number"
                                  value={item.unitPrice}
                                  onChange={(e) => handleUpdateItem(index, "unitPrice", parseFloat(e.target.value) || 0)}
                                  className="w-full px-1.5 py-1.5 text-xs text-right border border-gray-300 rounded"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-gray-600 mb-1 block">รวม</label>
                                <div className="px-1.5 py-1.5 text-xs font-bold text-right bg-gray-100 rounded border border-gray-300">
                                  {formatCurrency(calculateLineTotal(item))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Desktop: Table Layout */}
                    <div className="hidden sm:block overflow-x-auto">
                      <table className="w-full border-collapse border-2 border-gray-400 text-base">
                        <thead>
                          <tr className="bg-gradient-to-r from-gray-100 to-gray-50">
                            <th className="border border-gray-400 px-3 py-3 text-center font-semibold w-12">#</th>
                            <th className="border border-gray-400 px-3 py-3 text-left font-semibold">รายการ / Description</th>
                            <th className="border border-gray-400 px-3 py-3 text-center font-semibold w-20">หน่วย</th>
                            <th className="border border-gray-400 px-3 py-3 text-center font-semibold w-20">จำนวน</th>
                            <th className="border border-gray-400 px-3 py-3 text-right font-semibold w-28">ราคา/หน่วย</th>
                            <th className="border border-gray-400 px-3 py-3 text-center font-semibold w-20">ส่วนลด%</th>
                            <th className="border border-gray-400 px-3 py-3 text-right font-semibold w-28">รวม (฿)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {documentData.items.map((item, index) => (
                            <tr key={item.id} className="hover:bg-green-50">
                              <td className="border border-gray-400 px-3 py-2 text-center">
                                {index + 1}
                              </td>
                              <td className="border border-gray-400 px-2 py-1">
                                <input
                                  type="text"
                                  value={item.descriptionTH}
                                  onChange={(e) => handleUpdateItem(index, "descriptionTH", e.target.value)}
                                  className="w-full px-2 py-1 text-base border border-gray-300 rounded mb-1"
                                  placeholder="รายการ (TH)"
                                />
                                <input
                                  type="text"
                                  value={item.descriptionEN}
                                  onChange={(e) => handleUpdateItem(index, "descriptionEN", e.target.value)}
                                  className="w-full px-2 py-1 text-base border border-gray-300 rounded"
                                  placeholder="Description (EN)"
                                />
                              </td>
                              <td className="border border-gray-400 px-2 py-2">
                                <input
                                  type="text"
                                  value={item.unit}
                                  onChange={(e) => handleUpdateItem(index, "unit", e.target.value)}
                                  className="w-full px-2 py-1 text-base text-center border border-gray-300 rounded"
                                />
                              </td>
                              <td className="border border-gray-400 px-2 py-2">
                                <input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => handleUpdateItem(index, "quantity", parseFloat(e.target.value) || 0)}
                                  className="w-full px-2 py-1 text-base text-center border border-gray-300 rounded"
                                />
                              </td>
                              <td className="border border-gray-400 px-2 py-2">
                                <input
                                  type="number"
                                  value={item.unitPrice}
                                  onChange={(e) => handleUpdateItem(index, "unitPrice", parseFloat(e.target.value) || 0)}
                                  className="w-full px-2 py-1 text-base text-right border border-gray-300 rounded"
                                />
                              </td>
                              <td className="border border-gray-400 px-2 py-2">
                                <input
                                  type="number"
                                  value={item.discount}
                                  onChange={(e) => handleUpdateItem(index, "discount", parseFloat(e.target.value) || 0)}
                                  className="w-full px-2 py-1 text-base text-center border border-gray-300 rounded"
                                />
                              </td>
                              <td className="border border-gray-400 px-3 py-2 text-right font-semibold">
                                {formatCurrency(calculateLineTotal(item))}
                              </td>
                            </tr>
                          ))}
                          
                          <tr className="bg-gray-50">
                            <td colSpan={6} className="border border-gray-400 px-3 py-2 text-right font-semibold">
                              ยอดรวมก่อนหักส่วนลด:
                            </td>
                            <td className="border border-gray-400 px-3 py-2 text-right font-semibold">
                              {formatCurrency(calculateSubtotal())}
                            </td>
                          </tr>
                          
                          {documentData.globalDiscount > 0 && (
                            <tr>
                              <td colSpan={6} className="border border-gray-400 px-3 py-2 text-right text-red-600">
                                ส่วนลดรวม ({documentData.globalDiscount}%):
                              </td>
                              <td className="border border-gray-400 px-3 py-2 text-right text-red-600">
                                -{formatCurrency(calculateGlobalDiscountAmount())}
                              </td>
                            </tr>
                          )}
                          
                          <tr className="bg-gray-50">
                            <td colSpan={6} className="border border-gray-400 px-3 py-2 text-right font-semibold">
                              ยอดรวมหลังหักส่วนลด:
                            </td>
                            <td className="border border-gray-400 px-3 py-2 text-right font-semibold">
                              {formatCurrency(calculateNetTotal())}
                            </td>
                          </tr>
                          
                          {documentData.includeVat && (
                            <tr>
                              <td colSpan={6} className="border border-gray-400 px-3 py-2 text-right">
                                ภาษีมูลค่าเพิ่ม 7%:
                              </td>
                              <td className="border border-gray-400 px-3 py-2 text-right">
                                {formatCurrency(calculateVat())}
                              </td>
                            </tr>
                          )}
                          
                          <tr className="bg-gradient-to-r from-gray-100 to-gray-50">
                            <td colSpan={6} className="border border-gray-400 px-3 py-3 text-right text-xl font-bold">
                              ยอดรวมทั้งสิ้น / Grand Total:
                            </td>
                            <td className="border border-gray-400 px-3 py-3 text-right text-xl font-bold text-green-600">
                              {formatCurrency(calculateGrandTotal())}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile Summary */}
                    <div className="block sm:hidden mt-4 bg-gradient-to-br from-gray-50 to-white rounded-lg p-4 border-2 border-gray-200">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="font-semibold text-gray-700">ยอดรวม:</span>
                          <span className="font-bold text-gray-900">{formatCurrency(calculateSubtotal())}</span>
                        </div>
                        {documentData.includeVat && (
                          <div className="flex justify-between">
                            <span className="font-semibold text-gray-700">VAT 7%:</span>
                            <span className="font-bold text-gray-900">{formatCurrency(calculateVat())}</span>
                          </div>
                        )}
                        <div className="flex justify-between pt-2 border-t-2 border-gray-300">
                          <span className="font-bold text-gray-900">ยอดรวมทั้งสิ้น:</span>
                          <span className="text-lg font-bold text-green-600">
                            ฿{formatCurrency(calculateGrandTotal())}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="mb-4 sm:mb-8">
                    <h3 className="text-base sm:text-2xl font-bold mb-3 sm:mb-4">เงื่อนไขและข้อกำหนด / Terms & Conditions</h3>
                    
                    <div className="space-y-3 sm:space-y-4">
                      {/* Terms TH - Editable */}
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 sm:p-4">
                        <Label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">
                          เงื่อนไข (TH)
                        </Label>
                        <Textarea
                          value={documentData.termsTH}
                          onChange={(e) => setDocumentData({ ...documentData, termsTH: e.target.value })}
                          className="min-h-[100px] sm:min-h-[120px] text-xs sm:text-sm border-purple-200 bg-white resize-y"
                          placeholder="กรอกเงื่อนไขและข้อกำหนด"
                        />
                      </div>

                      {/* Terms EN - Editable */}
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 sm:p-4">
                        <Label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">
                          Terms (EN)
                        </Label>
                        <Textarea
                          value={documentData.termsEN}
                          onChange={(e) => setDocumentData({ ...documentData, termsEN: e.target.value })}
                          className="min-h-[100px] sm:min-h-[120px] text-xs sm:text-sm border-purple-200 bg-white resize-y"
                          placeholder="Enter terms and conditions"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-gray-300 pt-3 sm:pt-4 text-center text-[10px] sm:text-base text-gray-600">
                    {documentData.companyAddress}
                  </div>
                </div>

                {/* Signature Section - Desktop Only */}
                <div className="hidden sm:block bg-white shadow-xl rounded-lg overflow-hidden mb-3 sm:mb-4 p-3 sm:p-6">
                  <h3 className="text-base sm:text-xl font-bold mb-4 text-gray-800">ลายเซ็น / Signature</h3>
                  <div className={`grid ${documentData.signatureReceivers.length === 1 ? 'grid-cols-2' : documentData.signatureReceivers.length === 2 ? 'grid-cols-3' : 'grid-cols-2 lg:grid-cols-4'} gap-6 pt-4`}>
                    {/* Service Provider */}
                    <div className="text-center">
                      {documentData.signatureProviderImage ? (
                        <div className="mb-3 pb-4 flex items-end justify-center h-20">
                          <img src={documentData.signatureProviderImage} alt="Provider Signature" className="max-h-16 max-w-full object-contain" />
                        </div>
                      ) : (
                        <div className="border-b-2 border-gray-400 mb-3 pb-16"></div>
                      )}
                      <p className="text-sm font-semibold text-gray-800 mb-1">
                        ผู้เสนอ / Proposed by
                      </p>
                      <p className="text-xs text-gray-600">
                        {documentData.signatureProviderName || documentData.issuedBy || documentData.companyNameTH}
                      </p>
                      {documentData.signatureProviderPosition && (
                        <p className="text-xs text-gray-500 mt-1">
                          ({documentData.signatureProviderPosition})
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-2">
                        วันที่ / Date: {documentData.signatureProviderDate ? new Date(documentData.signatureProviderDate).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }) : '_________________'}
                      </p>
                    </div>

                    {/* Multiple Receivers */}
                    {documentData.signatureReceivers.map((receiver, index) => (
                      <div key={receiver.id} className="text-center">
                        {receiver.image ? (
                          <div className="mb-3 pb-4 flex items-end justify-center h-20">
                            <img src={receiver.image} alt={`Receiver ${index + 1} Signature`} className="max-h-16 max-w-full object-contain" />
                          </div>
                        ) : (
                          <div className="border-b-2 border-gray-400 mb-3 pb-16"></div>
                        )}
                        <p className="text-sm font-semibold text-gray-800 mb-1">
                          ผู้รับคนที่ {index + 1} / Receiver {index + 1}
                        </p>
                        <p className="text-xs text-gray-600">
                          {receiver.name || documentData.customerCompanyTH || documentData.customerCompanyEN}
                        </p>
                        {receiver.position && (
                          <p className="text-xs text-gray-500 mt-1">
                            ({receiver.position})
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-2">
                          วันที่ / Date: {receiver.date ? new Date(receiver.date).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }) : '_________________'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile Note */}
                <div className="block sm:hidden bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                  <p className="text-[10px] text-blue-800 text-center">
                    💡 ส่วนลายเซ็นจะแสดงในเอกสารฉบับสมบูรณ์
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-3 sm:px-8 py-3 sm:py-5 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Info className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
              </div>
              <p className="text-[10px] sm:text-sm font-medium text-gray-700 truncate">
                {currentStep === "source" && "เลือกแหล่งข้อมูลและกดถัดไป"}
                {currentStep === "form" && "กรอกข้อมูลให้ครบถ้วน"}
                {currentStep === "preview" && "ตรวจสอบและสร้างเอกสาร"}
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onClose}
              className="h-9 sm:h-11 px-3 sm:px-6 font-semibold border-2 flex-shrink-0"
            >
              <span className="text-xs sm:text-sm">ยกเลิก</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
