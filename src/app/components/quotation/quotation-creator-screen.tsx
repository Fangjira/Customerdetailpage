import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Combobox } from "../ui/combobox";
import { ArrowLeft, FileDown, Eye, EyeOff, Warehouse, FileCheck, Truck, Ship } from "lucide-react";
import { QuotationData, QuotationTemplateType, LanguageType, CustomerInfo } from "./quotation-types";
import { DEFAULT_COMPANY_INFO, DEFAULT_TERMS_CONDITIONS, QUOTATION_TEMPLATES } from "./quotation-constants";
import { QuotationPreview } from "./quotation-preview";
import { A4PreviewFrame } from "./a4-preview-frame";
import { EditableTextBlock } from "./quotation-components";
import { WarehouseTransportForm } from "./template-forms/warehouse-transport-form";
import { CustomsLicenseForm } from "./template-forms/customs-license-form";
import { CrossBorderForm } from "./template-forms/cross-border-form";
import { InternationalFreightForm } from "./template-forms/international-freight-form";
import { FreightDetailForm } from "./freight-detail-form";

interface QuotationCreatorScreenProps {
  templateType: QuotationTemplateType | null;
  mode?: 'single' | 'multiple'; // เพิ่ม mode prop
  onBack: () => void;
  onSave?: (data: QuotationData) => void;
  onTemplateChange?: (templateType: QuotationTemplateType) => void;
  initialCustomerData?: Partial<CustomerInfo>;
}

// ===== TEMPLATE DEFAULT CONTENT =====

const TEMPLATE_DEFAULTS = {
  description: {
    "customs-license": {
      th: `1) Product/ผลิตภัณฑ์: {Product Information}
2) Volume/ปริมาณ: {Product Volume and Unit of Measurement (UOM) and Frequency Period}
3) Packaging/ประเภทบรรจุภัณฑ์: {Product Packaging}
4) Temperature/อุณหภูมิ: {Temp Control of Product}`,
      en: `1) Product: {Product Information}
2) Volume: {Product Volume and Unit of Measurement (UOM) and Frequency Period}
3) Packaging: {Product Packaging}
4) Temperature: {Temp Control of Product}`
    },
    "international-freight": {
      th: `1) Product/ผลิตภัณฑ์: {Product Information}
2) Volume/ปริมาณ: {Product Volume and Unit of Measurement (UOM) and Frequency Period}
3) Packaging/ประเภทบรรจุภัณฑ์: {Product Packaging}
4) Temperature/อุณหภูมิ: {Temp Control of Product}`,
      en: `1) Product: {Product Information}
2) Volume: {Product Volume and Unit of Measurement (UOM) and Frequency Period}
3) Packaging: {Product Packaging}
4) Temperature: {Temp Control of Product}`
    }
  },
  scopeOfWork: {
    "customs-license": {
      th: `1. Warehouse location / สถานที่คลัง: {Warehouse Site}
2. Storage / การจัดเก็บสินค้า: {Text}
3. Handling / การเคลื่อนย้ายสินค้า: {Text}
4. Labeling / การติดป้ายฉลาก: {Text}
5. Documentation / การทำเอกสาร: {Text}
6. Customs clearance / การผ่านพิธีการศุลกากร: {Text}
7. License processing / การดำเนินการใบอนุญาต: {Text}`,
      en: `1. Warehouse location: {Warehouse Site}
2. Storage: {Text}
3. Handling: {Text}
4. Labeling: {Text}
5. Documentation: {Text}
6. Customs clearance: {Text}
7. License processing: {Text}`
    },
    "international-freight": {
      th: `1. Warehouse location / สถานที่คลัง: {Warehouse Site}
2. Storage / การจัดเก็บสินค้า: {Text}
3. Handling / การเคลื่อนย้ายสินค้า: {Text}
4. Labeling / การติดป้ายฉลาก: {Text}
5. Documentation / การทำเอกสาร: {Text}
6. Air Freight / บริการขนส่งทางอากาศ: {Text}
7. Sea Freight / บริการขนส่งทางทะเล: {Text}
8. Customs clearance / การผ่านพิธีการศุลกากร: {Text}
9. Insurance / การทำประกัน: {Text}
10. Tracking / การติดตามสินค้า: {Text}`,
      en: `1. Warehouse location: {Warehouse Site}
2. Storage: {Text}
3. Handling: {Text}
4. Labeling: {Text}
5. Documentation: {Text}
6. Air Freight: {Text}
7. Sea Freight: {Text}
8. Customs clearance: {Text}
9. Insurance: {Text}
10. Tracking: {Text}`
    }
  }
};

function getTemplateDescription(templateType: QuotationTemplateType, language: LanguageType): string {
  const defaults = TEMPLATE_DEFAULTS.description[templateType as keyof typeof TEMPLATE_DEFAULTS.description];
  return defaults ? defaults[language] : "";
}

function getTemplateScopeOfWork(templateType: QuotationTemplateType, language: LanguageType): string {
  const defaults = TEMPLATE_DEFAULTS.scopeOfWork[templateType as keyof typeof TEMPLATE_DEFAULTS.scopeOfWork];
  return defaults ? defaults[language] : "";
}

function getInitialTemplateData(templateType: QuotationTemplateType): any {
  switch (templateType) {
    case "warehouse-transport":
      return {
        warehousing: {
          enabled: true,
          items: [{ no: 1, service: "", rate: "", unit: "", remarks: "" }],
        },
        transport: {
          enabled: true,
          items: [{ no: 1, truckType: "", origin: "", destination: "", price: "", unit: "", remarks: "" }],
        },
      };
    case "customs-license":
      return {
        scopeOfWorkServices: {
          warehouse: false,
          transport: false,
          freightAir: false,
          freightSea: false,
          crossBorder: false,
        },
        warehouseLocation: "",
        storage: "",
        handling: "",
        otherActivity: "",
        transportationType: "",
        routeOrigin: "",
        routeDestination: "",
        airFreight: "",
        airFreightIncoterm: "",
        seaFreight: "",
        seaFreightIncoterm: "",
        customFields: [],
      };
    case "cross-border":
      return {
        rateTable: {
          enabled: false,
          rows: [],
        },
        rateSummary: "",
        clmvRemarks: "",
        jtsRemarks: "",
        salesCustomsRemarks: "",
        customsLicense: {
          enabled: false,
          items: [],
        },
        termsAndConditions: "",
      };
    case "international-freight":
      return {
        air: {
          enabled: true,
          exportEnabled: true,
          importEnabled: false,
          services: [{ service: "", price: "", unit: "" }],
          remarks: "",
        },
        sea: {
          enabled: false,
          exportEnabled: false,
          importEnabled: false,
          services: [],
          remarks: "",
        },
        customsLicense: {
          enabled: false,
          items: [],
        },
        freightDetail: {
          shipmentMode: "air",
          origin: "",
          destination: "",
          cargoWeight: "",
          cargoVolume: "",
          incoterms: "",
          serviceLevel: "",
          specialHandling: "",
          insurance: "",
        },
        termsAndConditions: "",
      };
    default:
      return {};
  }
}

const iconMap = {
  warehouse: Warehouse,
  "file-check": FileCheck,
  truck: Truck,
  ship: Ship,
};

// Mock customer companies data
const INITIAL_CUSTOMER_COMPANIES = [
  { value: "บริษัท แอคมี คอร์ปอเรชั่น จำกัด", label: "บริษัท แอคมี คอร์ปอเรชั่น จำกัด" },
  { value: "บริษัท โกลบอล เทค อินดัสทรีส์ จำกัด", label: "บริษัท โกลบอล เทค อินดัสทรีส์ จำกัด" },
  { value: "บริษัท แปซิฟิค ิมพอร์ต จำกัด", label: "บริษัท แปซิฟิค อิมพอร์ต จำกัด" },
  { value: "บริษัท เมโทร รีเทล กรุ๊ป จำกัด", label: "บริษัท เมโทร รีเทล กรุ๊ป จำกัด" },
  { value: "บริษัท เฟรชฟาร์ม ฟู้ดส์ จำกัด", label: "บริษัท เฟรชฟาร์ม ฟู้ดส์ จำกัด" },
  { value: "บริษัท ควิกชิป โลจิสติกส์ จำกัด", label: "บริษัท ควิกชิป โลจิสติกส์ จำกัด" },
  { value: "บริษัท ไทยคอนซูเมอร์ โปรดักส์ จำกัด", label: "บริษัท ไทยคอนซูเมอร์ โปรดักส์ จำกัด" },
  { value: "บริษัท อีคอมเมิร์ซ โซลูชั่นส์ จำกัด", label: "บริษัท อีคอมเมิร์ซ โซลูชั่นส์ จำกัด" },
  { value: "บริษัท เทรดดิ้ง พลัส จำกัด", label: "บริษัท เทรดดิ้ง พลัส จำกัด" },
  { value: "บริษัท เซาท์อีสต์ โลจิสติกส์ จำกัด", label: "บริษัท เซาท์อีสต์ โลจิสติกส์ จำกัด" },
];

export function QuotationCreatorScreen({ 
  templateType, 
  mode = 'single', // รับ mode prop พร้อม default value
  onBack, 
  onSave, 
  onTemplateChange, 
  initialCustomerData 
}: QuotationCreatorScreenProps) {
  const [showPreview, setShowPreview] = useState(true);
  const [language, setLanguage] = useState<LanguageType>("th");
  const [customerCompanies, setCustomerCompanies] = useState(INITIAL_CUSTOMER_COMPANIES);
  const [quotationData, setQuotationData] = useState<QuotationData | null>(null);

  const template = templateType ? QUOTATION_TEMPLATES.find((t) => t.id === templateType) : null;

  const handleCreateCompany = (companyName: string) => {
    const newCompany = { value: companyName, label: companyName };
    setCustomerCompanies((prev) => [...prev, newCompany]);
    if (quotationData) {
      setQuotationData({
        ...quotationData,
        customer: { ...quotationData.customer, company: companyName },
      });
    }
  };

  const handleLanguageChange = (newLang: LanguageType) => {
    setLanguage(newLang);
    if (quotationData) {
      setQuotationData({
        ...quotationData,
        language: newLang,
        termsAndConditions: DEFAULT_TERMS_CONDITIONS[newLang],
      });
    }
  };

  const handleGeneratePDF = () => {
    console.log("Generating PDF...", quotationData);
    alert("PDF Generation will be implemented");
  };

  const handleSave = () => {
    if (onSave && quotationData) {
      onSave(quotationData);
    }
  };

  // Initialize quotation data when template changes
  useEffect(() => {
    if (templateType) {
      console.log("🔄 Initializing template:", templateType, "language:", language);
      
      const description = templateType !== "customs-license" ? getTemplateDescription(templateType, language) : "";
      const scopeOfWork = templateType !== "customs-license" ? getTemplateScopeOfWork(templateType, language) : "";
      
      console.log("📝 Description:", description);
      console.log("📋 Scope of Work:", scopeOfWork);
      
      const newData: QuotationData = {
        templateType,
        language,
        info: {
          quotationNo: "QT-2024-" + Math.floor(Math.random() * 1000).toString().padStart(3, "0"),
          issueDate: new Date().toLocaleDateString("th-TH", { 
            year: "numeric", 
            month: "long", 
            day: "numeric" 
          }),
          effectiveDate: new Date().toLocaleDateString("th-TH", { 
            year: "numeric", 
            month: "long", 
            day: "numeric" 
          }),
          validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("th-TH", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          version: "1.0",
        },
        customer: {
          company: "",
          contactName: "",
          email: "",
          position: "",
          phone: "",
        },
        company: DEFAULT_COMPANY_INFO,
        introduction:
          language === "th"
            ? "ด้วย บริษัท วันลิงค์ โลจิสติกส์ จำกัด ได้รับทราบความต้องการของท่าน และมีความยินดีที่จะนำเสนอบริการโลจิสติกส์ครบวงจรตามรายละเอียดดังต่อไปนี้"
            : "mini CRM Logistics Co., Ltd. is pleased to present our comprehensive logistics services as per your requirements, detailed as follows:",
        description: description,
        scopeOfWork: scopeOfWork,
        templateData: getInitialTemplateData(templateType),
        termsAndConditions: DEFAULT_TERMS_CONDITIONS[language],
        signatureName: "นางสาว สมหญิง ใจดี",
        signaturePosition: "ผู้จัดการฝ่ายขาย",
        approvalRequired: false,
      };
      
      console.log("✅ New quotation data created");
      setQuotationData(newData);
    }
  }, [templateType, language]);

  // Template selection screen
  if (!templateType) {
    return (
      <div className="h-screen flex flex-col bg-gray-50">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack} className="hover:bg-gray-100">
                <ArrowLeft className="w-4 h-4 mr-2" />
                กลับ
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">สร้างใบเสนอราคาโลจิสติกส์</h1>
                <p className="text-sm text-gray-600 mt-1">เลือกแบบฟอร์มที่เหมาะสมกับประเภทบริการของคุณ</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#7BC9A6]/10 rounded-lg border border-[#7BC9A6]/20">
              <div className="w-2 h-2 bg-[#7BC9A6] rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">ขั้นตอนที่ 1/2: เลือกแบบฟอร์ม</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6 bg-gradient-to-r from-[#7BC9A6]/10 to-blue-50 border border-[#7BC9A6]/20 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-2xl">📋</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">เลือกแบบฟอร์มที่เหมาะสมกับบริการของคุณ</h3>
                  <p className="text-gray-600 leading-relaxed">
                    แต่ละแบบฟอร์มออกแบบมาเฉพาะสำหรับบริการโลจิสติกส์แต่ละประเภท 
                    คุณสามารถปรับแต่งรายละเอียดและอัตราค่าบริการได้ในขั้นตอนถัดไป
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {QUOTATION_TEMPLATES.map((tmpl) => {
                const IconComponent = iconMap[tmpl.icon as keyof typeof iconMap] || Warehouse;
                return (
                  <Card
                    key={tmpl.id}
                    className="relative overflow-hidden hover:shadow-lg transition-all duration-200 group cursor-pointer border-2 hover:border-[#7BC9A6]"
                    onClick={() => onTemplateChange?.(tmpl.id)}
                  >
                    <div
                      className="absolute top-0 left-0 w-1.5 h-full"
                      style={{ backgroundColor: tmpl.color }}
                    />

                    <div className="p-6 pl-8">
                      <div className="flex items-start gap-4 mb-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                          style={{
                            backgroundColor: `${tmpl.color}20`,
                          }}
                        >
                          <IconComponent
                            className="w-6 h-6"
                            style={{ color: tmpl.color }}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">
                            {tmpl.name}
                          </h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {tmpl.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-br from-[#7BC9A6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main creator screen
  // Wait for quotation data to be initialized
  if (!quotationData) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#7BC9A6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">
            {language === "th" ? "กำลังโหลดข้อมูล..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="hover:bg-gray-100">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === "th" ? "กลับ" : "Back"}
            </Button>
            <div className="border-l border-gray-300 pl-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-[#7BC9A6] rounded-full"></div>
                <span className="text-xs font-medium text-gray-500">
                  {language === "th" ? "ขั้นตอนที่ 2/2: กรอกข้อมูล" : "Step 2/2: Fill Information"}
                </span>
                {/* Mode Indicator */}
                <div className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                  mode === 'multiple' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {mode === 'multiple' 
                    ? (language === "th" ? "สร้างหลายใบ" : "Multiple Quotations")
                    : (language === "th" ? "สร้างใบเดียว" : "Single Quotation")
                  }
                </div>
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                {language === "th" ? template?.name : template?.nameEn}
              </h1>
              <p className="text-sm text-gray-600">{quotationData?.info.quotationNo}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => handleLanguageChange("th")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  language === "th"
                    ? "bg-[#7BC9A6] text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                TH
              </button>
              <button
                onClick={() => handleLanguageChange("en")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  language === "en"
                    ? "bg-[#7BC9A6] text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                EN
              </button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
              className="lg:hidden"
            >
              {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>

            <Button onClick={handleGeneratePDF} className="bg-[#7BC9A6] hover:bg-[#6CB88A]">
              <FileDown className="w-4 h-4 mr-2" />
              {language === "th" ? "สร้าง PDF" : "Generate PDF"}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-hidden flex bg-gray-50">
        {/* Left Side - Form */}
        <div className={`w-full lg:w-1/2 overflow-y-auto custom-scrollbar ${showPreview ? "hidden lg:block" : ""}`}>
          <div className="p-6 space-y-6 max-w-3xl">
            {/* Customer Information */}
            <Card className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                {language === "th" ? "ข้อมูลลูกค้า" : "Customer Information"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label>{language === "th" ? "ชื่อบริษัท" : "Company Name"}</Label>
                  <Combobox
                    options={customerCompanies}
                    value={quotationData?.customer.company}
                    onValueChange={(value) =>
                      setQuotationData({
                        ...quotationData!,
                        customer: { ...quotationData!.customer, company: value },
                      })
                    }
                    placeholder={language === "th" ? "เลือกหรือสร้างบริษัท" : "Select or create company"}
                    searchPlaceholder={language === "th" ? "ค้นหหรือพิมพ์ชื่อบริษัทใหม่..." : "Search or type new company..."}
                    emptyText={language === "th" ? "ไม่พบบริษัท" : "No company found"}
                    allowCreate={true}
                    createText={language === "th" ? "สร้างบริษัท" : "Create company"}
                    onCreate={handleCreateCompany}
                  />
                </div>
                <div>
                  <Label>{language === "th" ? "ชื่อผู้ติดต่อ" : "Contact Name"}</Label>
                  <Input
                    value={quotationData?.customer.contactName}
                    onChange={(e) =>
                      setQuotationData({
                        ...quotationData!,
                        customer: { ...quotationData!.customer, contactName: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <Label>{language === "th" ? "ตำแหน่ง" : "Position"}</Label>
                  <Input
                    value={quotationData?.customer.position}
                    onChange={(e) =>
                      setQuotationData({
                        ...quotationData!,
                        customer: { ...quotationData!.customer, position: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <Label>{language === "th" ? "อีเมล" : "Email"}</Label>
                  <Input
                    type="email"
                    value={quotationData?.customer.email}
                    onChange={(e) =>
                      setQuotationData({
                        ...quotationData!,
                        customer: { ...quotationData!.customer, email: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <Label>{language === "th" ? "โทรศัพท์" : "Phone"}</Label>
                  <Input
                    value={quotationData?.customer.phone}
                    onChange={(e) =>
                      setQuotationData({
                        ...quotationData!,
                        customer: { ...quotationData!.customer, phone: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </Card>

            {/* Introduction */}
            <Card className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                {language === "th" ? "1. คำนำ" : "1. Introduction"}
              </h2>
              <EditableTextBlock
                value={quotationData?.introduction || ""}
                onChange={(value) => setQuotationData({ ...quotationData!, introduction: value })}
                rows={4}
              />
            </Card>

            {/* Description */}
            {templateType !== "customs-license" && (
              <Card className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  {language === "th" ? "2. รายละเอียดบริการ" : "2. Service Description"}
                </h2>
                <EditableTextBlock
                  value={quotationData?.description || ""}
                  onChange={(value) => setQuotationData({ ...quotationData!, description: value })}
                  rows={6}
                />
              </Card>
            )}

            {/* Scope of Work */}
            {templateType !== "customs-license" && (
              <Card className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  {language === "th" ? "3. ขอบเขตงาน" : "3. Scope of Work"}
                </h2>
                
                {/* Show Freight Detail Form for International Freight */}
                {templateType === "international-freight" && quotationData && (
                  <div className="mb-4">
                    <FreightDetailForm
                      data={quotationData.templateData?.freightDetail}
                      onChange={(freightDetail) =>
                        setQuotationData({
                          ...quotationData,
                          templateData: {
                            ...quotationData.templateData,
                            freightDetail,
                          },
                        })
                      }
                      language={language}
                    />
                  </div>
                )}
                
                <EditableTextBlock
                  value={quotationData?.scopeOfWork || ""}
                  onChange={(value) => setQuotationData({ ...quotationData!, scopeOfWork: value })}
                  rows={6}
                />
              </Card>
            )}

            {/* Dynamic Template Form */}
            <Card className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                {templateType === "customs-license" 
                  ? (language === "th" ? "2. ข้อมูลบริการและขอบเขตงาน" : "2. Service Information & Scope of Work")
                  : (language === "th" ? "4. อัตราค่าบริการ" : "4. Service Rates")
                }
              </h2>
              {templateType === "warehouse-transport" && (
                <WarehouseTransportForm
                  data={quotationData?.templateData}
                  onChange={(data) => setQuotationData({ ...quotationData!, templateData: data })}
                  language={language}
                />
              )}
              {templateType === "customs-license" && (
                <CustomsLicenseForm
                  data={quotationData?.templateData}
                  onChange={(data) => setQuotationData({ ...quotationData!, templateData: data })}
                  language={language}
                />
              )}
              {templateType === "cross-border" && (
                <CrossBorderForm
                  data={quotationData?.templateData}
                  onChange={(data) => setQuotationData({ ...quotationData!, templateData: data })}
                  language={language}
                />
              )}
              {templateType === "international-freight" && (
                <InternationalFreightForm
                  data={quotationData?.templateData}
                  onChange={(data) => setQuotationData({ ...quotationData!, templateData: data })}
                  language={language}
                />
              )}
            </Card>

            {/* Terms & Conditions */}
            <Card className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                {language === "th" ? "5. เงื่อนไขการให้บริการ" : "5. Terms & Conditions"}
              </h2>
              <EditableTextBlock
                value={quotationData?.termsAndConditions || ""}
                onChange={(value) => setQuotationData({ ...quotationData!, termsAndConditions: value })}
                rows={8}
              />
            </Card>

            {/* Signature */}
            <Card className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                {language === "th" ? "ผู้ลงนาม" : "Signature"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>{language === "th" ? "ชื่อผู้ลงนาม" : "Name"}</Label>
                  <Input
                    value={quotationData?.signatureName || ""}
                    onChange={(e) => setQuotationData({ ...quotationData!, signatureName: e.target.value })}
                  />
                </div>
                <div>
                  <Label>{language === "th" ? "ตำแหน่ง" : "Position"}</Label>
                  <Input
                    value={quotationData?.signaturePosition || ""}
                    onChange={(e) => setQuotationData({ ...quotationData!, signaturePosition: e.target.value })}
                  />
                </div>
              </div>
            </Card>

            {/* Approval */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">
                  {language === "th" ? "การอนุมัติ (ถ้ามี)" : "Approval (Optional)"}
                </h2>
                <button
                  type="button"
                  onClick={() =>
                    setQuotationData({ ...quotationData!, approvalRequired: !quotationData!.approvalRequired })
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    quotationData?.approvalRequired ? "bg-[#7BC9A6]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      quotationData?.approvalRequired ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              {quotationData?.approvalRequired && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>{language === "th" ? "ชื่อผู้อนุมัติ" : "Approver Name"}</Label>
                    <Input
                      value={quotationData?.approverName || ""}
                      onChange={(e) => setQuotationData({ ...quotationData!, approverName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>{language === "th" ? "ตำแหน่ง" : "Position"}</Label>
                    <Input
                      value={quotationData?.approverPosition || ""}
                      onChange={(e) => setQuotationData({ ...quotationData!, approverPosition: e.target.value })}
                    />
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Right Side - Live Preview */}
        <div className={`w-full lg:w-1/2 bg-gray-100 overflow-hidden ${!showPreview ? "hidden lg:block" : ""}`}>
          <A4PreviewFrame scale={0.65}>
            <QuotationPreview data={quotationData} />
          </A4PreviewFrame>
        </div>
      </div>
    </div>
  );
}