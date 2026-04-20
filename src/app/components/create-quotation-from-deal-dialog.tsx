import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Combobox } from "./ui/combobox";
import { useTranslation } from "react-i18next";
import {
  FileText,
  CheckCircle2,
  Calendar,
  DollarSign,
  Building2,
  User,
  Package,
  X,
  Plus,
  Trash2,
  Copy,
  Upload,
  Plane,
  Warehouse,
  FileCheck,
  Truck,
  MapPin,
  Scale,
  Clock,
  Shield,
  FileBarChart,
  Navigation,
  Container,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { InternationalFreightForm } from "./quotation/template-forms/international-freight-form";
import { WarehouseTransportForm } from "./quotation/template-forms/warehouse-transport-form";
import { CustomsLicenseForm } from "./quotation/template-forms/customs-license-form";
import { CrossBorderForm } from "./quotation/template-forms/cross-border-form";

interface DealData {
  dealId: string;
  dealName: string;
  customer: string;
  customerEmail: string;
  customerPhone: string;
  billingAddress: string;
  totalValue: string;
  expectedCloseDate: string;
  owner: string;
  services: {
    service: string;
    quantity: string;
    unitPrice: string;
    total: string;
  }[];
}

interface CreateQuotationFromDealDialogProps {
  isOpen: boolean;
  onClose: () => void;
  dealData: DealData;
  onCreateQuotation?: (quotationData: any) => void;
  onNavigate?: (path: string) => void; // เพิ่ม navigation prop
}

export function CreateQuotationFromDealDialog({
  isOpen,
  onClose,
  dealData,
  onCreateQuotation,
  onNavigate, // รับ navigation function
}: CreateQuotationFromDealDialogProps) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdCount, setCreatedCount] = useState(0);

  // Step management: 'source' | 'mode' | 'form'
  const [currentStep, setCurrentStep] = useState<'source' | 'mode' | 'form'>('source');
  
  // Source selection: 'template' or 'upload'
  const [sourceType, setSourceType] = useState<'template' | 'upload' | null>(null);
  
  // Template selection (if sourceType is 'template')
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  
  // Mode selection: 'single' or 'multiple'
  const [mode, setMode] = useState<'single' | 'multiple'>('single');

  // Form state for single quotation
  const [quotationNumber, setQuotationNumber] = useState(
    `QT-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`
  );
  const [validityDays, setValidityDays] = useState("30");
  const [paymentTerms, setPaymentTerms] = useState("net30");
  const [includeVat, setIncludeVat] = useState(true);
  const [notes, setNotes] = useState("");

  // Template-specific form states
  const [templateFormData, setTemplateFormData] = useState({
    // International Freight
    originPort: "",
    destinationPort: "",
    cargoType: "general",
    weight: "",
    volume: "",
    incoterms: "FOB",
    transitTime: "",
    insurance: true,
    
    // Warehouse & Transport
    warehouseLocation: "",
    storageDuration: "",
    storageSpace: "",
    transportRoute: "",
    vehicleType: "truck",
    loadingService: true,
    
    // Customs & License
    importExportType: "import",
    hsCode: "",
    customDutyRate: "",
    licenseType: "import-license",
    processingDays: "",
    documentRequired: "",
    
    // Cross-Border CLMV
    originCountry: "thailand",
    destinationCountry: "vietnam",
    borderCrossing: "",
    crossBorderVehicle: "trailer",
    transitCountries: "",
    permitRequired: true,
  });

  const updateTemplateFormData = (field: string, value: any) => {
    setTemplateFormData(prev => ({ ...prev, [field]: value }));
  };

  // State for multiple quotations
  interface QuotationItem {
    id: string;
    quotationNumber: string;
    version: string;
    title: string;
    amount: string;
    validityDays: string;
    paymentTerms: string;
    includeVat: boolean;
    notes: string;
    selectedServiceIds: string[]; // เพิ่ม field สำหรับเก็บ services ที่เลือก
  }

  const [quotations, setQuotations] = useState<QuotationItem[]>([
    {
      id: '1',
      quotationNumber: `QT-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`,
      version: 'v1.0',
      title: `${dealData.dealName} - Quotation 1`,
      amount: dealData.totalValue,
      validityDays: '30',
      paymentTerms: 'net30',
      includeVat: true,
      notes: '',
      selectedServiceIds: dealData.services?.map((_, index) => index.toString()) || [], // เลือกทั้งหมดเป็นค่าเริ่มต้น
    },
  ]);

  const addQuotation = () => {
    const newId = (quotations.length + 1).toString();
    const newQuotation: QuotationItem = {
      id: newId,
      quotationNumber: `QT-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`,
      version: `v${quotations.length + 1}.0`,
      title: `${dealData.dealName} - Quotation ${quotations.length + 1}`,
      amount: dealData.totalValue,
      validityDays: '30',
      paymentTerms: 'net30',
      includeVat: true,
      notes: '',
      selectedServiceIds: dealData.services?.map((_, index) => index.toString()) || [],
    };
    setQuotations([...quotations, newQuotation]);
  };

  const removeQuotation = (id: string) => {
    if (quotations.length > 1) {
      setQuotations(quotations.filter(q => q.id !== id));
    }
  };

  const duplicateQuotation = (id: string) => {
    const original = quotations.find(q => q.id === id);
    if (original) {
      const newId = (Math.max(...quotations.map(q => parseInt(q.id))) + 1).toString();
      const duplicate: QuotationItem = {
        ...original,
        id: newId,
        quotationNumber: `QT-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`,
        version: `v${quotations.length + 1}.0`,
        title: `${original.title} (Copy)`,
      };
      setQuotations([...quotations, duplicate]);
    }
  };

  const updateQuotation = (id: string, field: keyof QuotationItem, value: any) => {
    setQuotations(quotations.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  // ฟังก์ชันคำนวณมูลค่ารวมของ services ที่เลือก
  const calculateTotalAmount = (selectedServiceIds: string[]) => {
    if (!dealData.services) return dealData.totalValue;
    
    const total = selectedServiceIds.reduce((sum, serviceId) => {
      const service = dealData.services[parseInt(serviceId)];
      if (service) {
        // แปลง "$225,000" เป็นตัวเลข
        const amount = parseFloat(service.total.replace(/[$,]/g, ''));
        return sum + amount;
      }
      return sum;
    }, 0);
    
    return `$${total.toLocaleString()}`;
  };

  // ฟังก์ชันสำหรับ toggle service selection
  const toggleServiceSelection = (quotationId: string, serviceId: string) => {
    setQuotations(quotations.map(q => {
      if (q.id === quotationId) {
        const currentSelected = q.selectedServiceIds;
        const newSelected = currentSelected.includes(serviceId)
          ? currentSelected.filter(id => id !== serviceId)
          : [...currentSelected, serviceId];
        
        // อัปเดตมูลค่ารวมด้วย
        const newAmount = calculateTotalAmount(newSelected);
        
        return { 
          ...q, 
          selectedServiceIds: newSelected,
          amount: newAmount
        };
      }
      return q;
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);

      if (mode === 'single') {
        const quotationData = {
          quotationNumber,
          validityDays,
          paymentTerms,
          includeVat,
          notes,
          dealData,
        };

        if (onCreateQuotation) {
          onCreateQuotation(quotationData);
        }
        setCreatedCount(1);
      } else {
        // Multiple quotations
        if (onCreateQuotation) {
          quotations.forEach(quote => {
            onCreateQuotation({
              ...quote,
              dealData,
            });
          });
        }
        setCreatedCount(quotations.length);
      }

      // Reset after showing success
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        // Reset form
        setMode('single');
        setQuotationNumber(
          `QT-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`
        );
        setValidityDays("30");
        setPaymentTerms("net30");
        setIncludeVat(true);
        setNotes("");
        setQuotations([
          {
            id: '1',
            quotationNumber: `QT-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`,
            version: 'v1.0',
            title: `${dealData.dealName} - Quotation 1`,
            amount: dealData.totalValue,
            validityDays: '30',
            paymentTerms: 'net30',
            includeVat: true,
            notes: '',
            selectedServiceIds: dealData.services?.map((_, index) => index.toString()) || [],
          },
        ]);
      }, 2000);
    }, 1500);
  };

  if (showSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-[90vw] sm:max-w-[400px]">
          <DialogTitle className="sr-only">
            Quotation Created
          </DialogTitle>
          <DialogDescription className="sr-only">
            Your quotation has been created successfully
          </DialogDescription>
          <div className="flex flex-col items-center justify-center py-8 px-4">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {createdCount === 1 ? 'Quotation Created!' : `${createdCount} Quotations Created!`}
            </h3>
            <p className="text-sm text-gray-600 text-center mb-4">
              {createdCount === 1 
                ? 'Your quotation has been created successfully' 
                : `สร้างใบเสนอราคาทั้งหมด ${createdCount} ใบเรียบร้อยแล้ว`
              }
            </p>
            {createdCount === 1 ? (
              <Badge
                variant="secondary"
                className="bg-purple-100 text-purple-700 text-sm px-3 py-1"
              >
                {quotationNumber}
              </Badge>
            ) : (
              <div className="flex flex-wrap gap-2 justify-center">
                {quotations.slice(0, 3).map((q, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="bg-green-100 text-green-700 text-xs px-2 py-1"
                  >
                    {q.quotationNumber}
                  </Badge>
                ))}
                {quotations.length > 3 && (
                  <Badge
                    variant="secondary"
                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1"
                  >
                    +{quotations.length - 3} more
                  </Badge>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] sm:max-w-[700px] max-h-[85vh] p-0 gap-0 flex flex-col">
        <DialogHeader className="px-4 sm:px-6 py-4 border-b flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                <FileText className="h-5 w-5 text-purple-600" />
              </div>
              <div className="min-w-0">
                <DialogTitle className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                  สร้างใบเสนอราคา
                </DialogTitle>
                <DialogDescription className="text-xs text-gray-500 truncate">
                  จากดีล: {dealData.dealId}
                </DialogDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
            {/* Deal Information */}
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-purple-600" />
                  ข้อมูลดีล
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-gray-500 mb-1">ชื่อดีล</p>
                    <p className="font-medium text-gray-900 truncate">{dealData.dealName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">รหัสดีล</p>
                    <p className="font-medium text-gray-900">{dealData.dealId}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">ลูกค้า</p>
                    <p className="font-medium text-gray-900 truncate">{dealData.customer}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">มูลค่ารวม</p>
                    <p className="font-bold text-purple-600">{dealData.totalValue}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 1: Source Selection */}
            {currentStep === 'source' && (
              <>
                <Card className="border-gray-200 shadow-sm">
                  <CardContent className="p-4">
                    <Label className="text-sm font-semibold text-gray-900 mb-3 block">
                      เลือกแหล่งข้อมูล
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setSourceType('template')}
                        className={`py-3 px-4 rounded-lg text-sm font-medium transition-all border-2 ${
                          sourceType === 'template'
                            ? "bg-[#7BC9A6] text-white border-[#7BC9A6] shadow-sm"
                            : "bg-white text-gray-600 border-gray-200 hover:border-[#7BC9A6]"
                        }`}
                      >
                        <FileText className="h-4 w-4 mx-auto mb-1" />
                        ใช้เทมเพลต
                      </button>
                      <button
                        type="button"
                        onClick={() => setSourceType('upload')}
                        className={`py-3 px-4 rounded-lg text-sm font-medium transition-all border-2 ${
                          sourceType === 'upload'
                            ? "bg-[#7BC9A6] text-white border-[#7BC9A6] shadow-sm"
                            : "bg-white text-gray-600 border-gray-200 hover:border-[#7BC9A6]"
                        }`}
                      >
                        <Upload className="h-4 w-4 mx-auto mb-1" />
                        อัปโหลดไฟล์
                      </button>
                    </div>
                  </CardContent>
                </Card>

                {/* Template Selection (if template is selected) */}
                {sourceType === 'template' && (
                  <Card className="border-gray-200 shadow-sm">
                    <CardContent className="p-4">
                      <Label className="text-sm font-semibold text-gray-900 mb-3 block">
                        เลือกเทมเพลต
                      </Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* International Freight */}
                        <button
                          type="button"
                          onClick={() => setSelectedTemplate('international-freight')}
                          className={`p-3 rounded-lg text-left transition-all border-2 ${
                            selectedTemplate === 'international-freight'
                              ? "bg-blue-50 border-blue-500 shadow-sm"
                              : "bg-white border-gray-200 hover:border-blue-300"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              selectedTemplate === 'international-freight'
                                ? 'bg-blue-100'
                                : 'bg-gray-100'
                            }`}>
                              <Plane className={`h-5 w-5 ${
                                selectedTemplate === 'international-freight'
                                  ? 'text-blue-600'
                                  : 'text-gray-600'
                              }`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className={`text-sm font-semibold mb-0.5 ${
                                selectedTemplate === 'international-freight'
                                  ? 'text-blue-900'
                                  : 'text-gray-900'
                              }`}>
                                International Freight
                              </h4>
                              <p className="text-xs text-gray-500">
                                ขนส่งทางอากาศระหว่างประเทศ
                              </p>
                            </div>
                          </div>
                        </button>

                        {/* Warehouse & Transport */}
                        <button
                          type="button"
                          onClick={() => setSelectedTemplate('warehouse-transport')}
                          className={`p-3 rounded-lg text-left transition-all border-2 ${
                            selectedTemplate === 'warehouse-transport'
                              ? "bg-green-50 border-green-500 shadow-sm"
                              : "bg-white border-gray-200 hover:border-green-300"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              selectedTemplate === 'warehouse-transport'
                                ? 'bg-green-100'
                                : 'bg-gray-100'
                            }`}>
                              <Warehouse className={`h-5 w-5 ${
                                selectedTemplate === 'warehouse-transport'
                                  ? 'text-green-600'
                                  : 'text-gray-600'
                              }`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className={`text-sm font-semibold mb-0.5 ${
                                selectedTemplate === 'warehouse-transport'
                                  ? 'text-green-900'
                                  : 'text-gray-900'
                              }`}>
                                Warehouse & Transport
                              </h4>
                              <p className="text-xs text-gray-500">
                                บริการคลังสินค้าและขนส่ง
                              </p>
                            </div>
                          </div>
                        </button>

                        {/* Customs & License */}
                        <button
                          type="button"
                          onClick={() => setSelectedTemplate('customs-license')}
                          className={`p-3 rounded-lg text-left transition-all border-2 ${
                            selectedTemplate === 'customs-license'
                              ? "bg-purple-50 border-purple-500 shadow-sm"
                              : "bg-white border-gray-200 hover:border-purple-300"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              selectedTemplate === 'customs-license'
                                ? 'bg-purple-100'
                                : 'bg-gray-100'
                            }`}>
                              <FileCheck className={`h-5 w-5 ${
                                selectedTemplate === 'customs-license'
                                  ? 'text-purple-600'
                                  : 'text-gray-600'
                              }`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className={`text-sm font-semibold mb-0.5 ${
                                selectedTemplate === 'customs-license'
                                  ? 'text-purple-900'
                                  : 'text-gray-900'
                              }`}>
                                Customs & License
                              </h4>
                              <p className="text-xs text-gray-500">
                                บริการศุลกากรและใบอนุญาต
                              </p>
                            </div>
                          </div>
                        </button>

                        {/* Cross-Border CLMV */}
                        <button
                          type="button"
                          onClick={() => setSelectedTemplate('cross-border-clmv')}
                          className={`p-3 rounded-lg text-left transition-all border-2 ${
                            selectedTemplate === 'cross-border-clmv'
                              ? "bg-orange-50 border-orange-500 shadow-sm"
                              : "bg-white border-gray-200 hover:border-orange-300"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              selectedTemplate === 'cross-border-clmv'
                                ? 'bg-orange-100'
                                : 'bg-gray-100'
                            }`}>
                              <Truck className={`h-5 w-5 ${
                                selectedTemplate === 'cross-border-clmv'
                                  ? 'text-orange-600'
                                  : 'text-gray-600'
                              }`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className={`text-sm font-semibold mb-0.5 ${
                                selectedTemplate === 'cross-border-clmv'
                                  ? 'text-orange-900'
                                  : 'text-gray-900'
                              }`}>
                                Cross-Border CLMV
                              </h4>
                              <p className="text-xs text-gray-500">
                                ขนส่งข้ามพรมแดน CLMV
                              </p>
                            </div>
                          </div>
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Upload File Section (if upload is selected) */}
                {sourceType === 'upload' && (
                  <Card className="border-gray-200 shadow-sm">
                    <CardContent className="p-4">
                      <Label className="text-sm font-semibold text-gray-900 mb-3 block">
                        อัปโหลดเอกสาร
                      </Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#7BC9A6] transition-colors cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          คลิกเพื่ออัปโหลดไฟล์
                        </p>
                        <p className="text-xs text-gray-500">
                          รองรับ PDF, DOCX, XLSX (ขนาดไม่เกิน 10MB)
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}

            {/* Step 2: Mode Selection */}
            {currentStep === 'mode' && (
              <Card className="border-gray-200 shadow-sm">
                <CardContent className="p-4">
                  <Label className="text-sm font-semibold text-gray-900 mb-3 block">
                    เลือกรูปแบบการสร้าง
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setMode('single')}
                      className={`py-3 px-4 rounded-lg text-sm font-medium transition-all border-2 ${
                        mode === 'single'
                          ? "bg-[#7BC9A6] text-white border-[#7BC9A6] shadow-sm"
                          : "bg-white text-gray-600 border-gray-200 hover:border-[#7BC9A6]"
                      }`}
                    >
                      <FileText className="h-4 w-4 mx-auto mb-1" />
                      สร้างใบเดียว
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode('multiple')}
                      className={`py-3 px-4 rounded-lg text-sm font-medium transition-all border-2 ${
                        mode === 'multiple'
                          ? "bg-[#7BC9A6] text-white border-[#7BC9A6] shadow-sm"
                          : "bg-white text-gray-600 border-gray-200 hover:border-[#7BC9A6]"
                      }`}
                    >
                      <Copy className="h-4 w-4 mx-auto mb-1" />
                      สร้างหลายใบ
                    </button>
                  </div>
                  {mode === 'multiple' && (
                    <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700">
                      <strong>💡 เคล็ดลับ:</strong> เหมาะสำหรับการเสนอราคาหลายเวอร์ชัน หรือแพ็คเกจที่แตกต่างกัน
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Step 3: Form */}
            {currentStep === 'form' && (
              <>
                {/* Single Quotation Form */}
                {mode === 'single' && (
                  <>
                    {/* Quotation Settings */}
                    <Card>
                      <CardContent className="p-3">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <FileText className="h-4 w-4 text-purple-600" />
                          Quotation Settings
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="quotation-number" className="text-xs text-gray-700">
                              Quotation Number
                            </Label>
                            <Input
                              id="quotation-number"
                              value={quotationNumber}
                              onChange={(e) => setQuotationNumber(e.target.value)}
                              className="mt-1 h-9 text-sm"
                              required
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label htmlFor="validity-days" className="text-xs text-gray-700">
                                Validity (Days)
                              </Label>
                              <Input
                                id="validity-days"
                                type="number"
                                value={validityDays}
                                onChange={(e) => setValidityDays(e.target.value)}
                                className="mt-1 h-9 text-sm"
                                required
                              />
                            </div>

                            <div>
                              <Label htmlFor="payment-terms" className="text-xs text-gray-700">
                                Payment Terms
                              </Label>
                              <Combobox
                                options={[
                                  { value: "net15", label: "Net 15 days" },
                                  { value: "net30", label: "Net 30 days" },
                                  { value: "net60", label: "Net 60 days" },
                                  { value: "net90", label: "Net 90 days" },
                                  { value: "immediate", label: "Immediate" },
                                ]}
                                value={paymentTerms}
                                onValueChange={setPaymentTerms}
                                placeholder="Select..."
                                searchPlaceholder="Search..."
                                className="mt-1 h-9 text-sm"
                              />
                            </div>
                          </div>

                          <div>
                            <Label className="text-xs text-gray-700 mb-2 block">
                              Include VAT (7%)
                            </Label>
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                type="button"
                                onClick={() => setIncludeVat(true)}
                                className={`py-2 px-4 rounded-lg text-xs font-medium transition-all ${
                                  includeVat
                                    ? "bg-purple-600 text-white"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                Yes
                              </button>
                              <button
                                type="button"
                                onClick={() => setIncludeVat(false)}
                                className={`py-2 px-4 rounded-lg text-xs font-medium transition-all ${
                                  !includeVat
                                    ? "bg-purple-600 text-white"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                No
                              </button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Template-Specific Forms */}
                    {sourceType === 'template' && selectedTemplate === 'international-freight' && (
                      <Card className="border-blue-200 shadow-sm">
                        <CardContent className="p-3">
                          <h3 className="text-sm font-semibold text-blue-900 mb-3 flex items-center gap-2">
                            <Plane className="h-4 w-4 text-blue-600" />
                            International Freight Form
                          </h3>
                          <InternationalFreightForm
                            data={templateFormData}
                            onChange={(data) => setTemplateFormData({ ...templateFormData, ...data })}
                            language="th"
                          />
                        </CardContent>
                      </Card>
                    )}

                    {sourceType === 'template' && selectedTemplate === 'warehouse-transport' && (
                      <Card className="border-green-200 shadow-sm">
                        <CardContent className="p-3">
                          <h3 className="text-sm font-semibold text-green-900 mb-3 flex items-center gap-2">
                            <Warehouse className="h-4 w-4 text-green-600" />
                            Warehouse & Transport Form
                          </h3>
                          <WarehouseTransportForm
                            data={templateFormData}
                            onChange={(data) => setTemplateFormData({ ...templateFormData, ...data })}
                            language="th"
                          />
                        </CardContent>
                      </Card>
                    )}

                    {sourceType === 'template' && selectedTemplate === 'customs-license' && (
                      <Card className="border-purple-200 shadow-sm">
                        <CardContent className="p-3">
                          <h3 className="text-sm font-semibold text-purple-900 mb-3 flex items-center gap-2">
                            <FileCheck className="h-4 w-4 text-purple-600" />
                            Customs & License Form
                          </h3>
                          <CustomsLicenseForm
                            data={templateFormData}
                            onChange={(data) => setTemplateFormData({ ...templateFormData, ...data })}
                            language="th"
                          />
                        </CardContent>
                      </Card>
                    )}

                    {sourceType === 'template' && selectedTemplate === 'cross-border-clmv' && (
                      <Card className="border-orange-200 shadow-sm">
                        <CardContent className="p-3">
                          <h3 className="text-sm font-semibold text-orange-900 mb-3 flex items-center gap-2">
                            <Truck className="h-4 w-4 text-orange-600" />
                            Cross-Border CLMV Form
                          </h3>
                          <CrossBorderForm
                            data={templateFormData}
                            onChange={(data) => setTemplateFormData({ ...templateFormData, ...data })}
                            language="th"
                          />
                        </CardContent>
                      </Card>
                    )}

                    {/* Notes */}
                    <Card>
                      <CardContent className="p-3">
                        <Label htmlFor="notes" className="text-xs text-gray-700">
                          Additional Notes (Optional)
                        </Label>
                        <Textarea
                          id="notes"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Add any special terms, conditions, or notes..."
                          className="mt-1 min-h-[80px] text-sm"
                          rows={3}
                        />
                      </CardContent>
                    </Card>
                  </>
                )}

                {/* Multiple Quotations Form */}
                {mode === 'multiple' && (
                  <>
                    <Card>
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                            <Copy className="h-4 w-4 text-[#7BC9A6]" />
                            รายการใบเสนอราคา ({quotations.length})
                          </h3>
                          <Button
                            type="button"
                            size="sm"
                            onClick={addQuotation}
                            className="h-7 bg-[#7BC9A6] hover:bg-[#6AB896] text-white"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            เพิ่มใบ
                          </Button>
                        </div>

                        <div className="space-y-3">
                          {quotations.map((quote, index) => (
                            <Card key={quote.id} className="border-[#7BC9A6] bg-gradient-to-r from-green-50 to-white">
                              <CardContent className="p-3">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <Badge className="bg-[#7BC9A6] text-white text-xs">
                                      #{index + 1}
                                    </Badge>
                                    <span className="text-xs font-bold text-gray-700">{quote.version}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => duplicateQuotation(quote.id)}
                                      className="h-6 w-6 p-0"
                                      title="ทำซ้ำ"
                                    >
                                      <Copy className="h-3 w-3" />
                                    </Button>
                                    {quotations.length > 1 && (
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeQuotation(quote.id)}
                                        className="h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                        title="ลบ"
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    )}
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <div>
                                    <Label className="text-xs text-gray-700">ชื่อใบเสนอราคา</Label>
                                    <Input
                                      value={quote.title}
                                      onChange={(e) => updateQuotation(quote.id, 'title', e.target.value)}
                                      className="mt-1 h-8 text-xs"
                                      placeholder="เช่น Standard Package, Premium Package"
                                    />
                                  </div>

                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <Label className="text-xs text-gray-700">Quotation Number</Label>
                                      <Input
                                        value={quote.quotationNumber}
                                        onChange={(e) => updateQuotation(quote.id, 'quotationNumber', e.target.value)}
                                        className="mt-1 h-8 text-xs"
                                      />
                                    </div>
                                    <div>
                                      <Label className="text-xs text-gray-700">มูลค่า</Label>
                                      <Input
                                        value={quote.amount}
                                        onChange={(e) => updateQuotation(quote.id, 'amount', e.target.value)}
                                        className="mt-1 h-8 text-xs"
                                      />
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <Label className="text-xs text-gray-700">Validity (Days)</Label>
                                      <Input
                                        type="number"
                                        value={quote.validityDays}
                                        onChange={(e) => updateQuotation(quote.id, 'validityDays', e.target.value)}
                                        className="mt-1 h-8 text-xs"
                                      />
                                    </div>
                                    <div>
                                      <Label className="text-xs text-gray-700">Payment Terms</Label>
                                      <Combobox
                                        options={[
                                          { value: "net15", label: "Net 15" },
                                          { value: "net30", label: "Net 30" },
                                          { value: "net60", label: "Net 60" },
                                          { value: "net90", label: "Net 90" },
                                          { value: "immediate", label: "Immediate" },
                                        ]}
                                        value={quote.paymentTerms}
                                        onValueChange={(value) => updateQuotation(quote.id, 'paymentTerms', value)}
                                        placeholder="Select..."
                                        searchPlaceholder="Search..."
                                        className="mt-1 h-8 text-xs"
                                      />
                                    </div>
                                  </div>

                                  <div>
                                    <Label className="text-xs text-gray-700 mb-1 block">
                                      Include VAT (7%)
                                    </Label>
                                    <div className="grid grid-cols-2 gap-2">
                                      <button
                                        type="button"
                                        onClick={() => updateQuotation(quote.id, 'includeVat', true)}
                                        className={`py-1 px-3 rounded text-xs font-medium transition-all ${
                                          quote.includeVat
                                            ? "bg-[#7BC9A6] text-white"
                                            : "bg-gray-100 text-gray-600"
                                        }`}
                                      >
                                        Yes
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => updateQuotation(quote.id, 'includeVat', false)}
                                        className={`py-1 px-3 rounded text-xs font-medium transition-all ${
                                          !quote.includeVat
                                            ? "bg-[#7BC9A6] text-white"
                                            : "bg-gray-100 text-gray-600"
                                        }`}
                                      >
                                        No
                                      </button>
                                    </div>
                                  </div>

                                  <div>
                                    <Label className="text-xs text-gray-700">หมายเหตุ (Optional)</Label>
                                    <Textarea
                                      value={quote.notes}
                                      onChange={(e) => updateQuotation(quote.id, 'notes', e.target.value)}
                                      placeholder="เพิ่มรายละเอียดเฉพาะสำหรับใบนี้..."
                                      className="mt-1 min-h-[60px] text-xs"
                                      rows={2}
                                    />
                                  </div>

                                  {/* Services Selection */}
                                  <div>
                                    <Label className="text-xs text-gray-700 mb-1 block font-semibold">
                                      🛒 เลือกบริการที่ต้องการในใบนี้
                                    </Label>
                                    <div className="space-y-1.5">
                                      {dealData.services?.map((service, serviceIndex) => {
                                        const serviceId = serviceIndex.toString();
                                        const isSelected = quote.selectedServiceIds.includes(serviceId);
                                        
                                        return (
                                          <div
                                            key={serviceIndex}
                                            onClick={() => toggleServiceSelection(quote.id, serviceId)}
                                            className={`p-2 rounded border cursor-pointer transition-all ${
                                              isSelected
                                                ? 'border-[#7BC9A6] bg-gradient-to-r from-green-50 to-teal-50 shadow-sm'
                                                : 'border-gray-200 bg-white hover:border-[#7BC9A6] hover:bg-gray-50'
                                            }`}
                                          >
                                            <div className="flex items-start gap-2">
                                              <div className={`mt-0.5 h-4 w-4 rounded flex items-center justify-center border flex-shrink-0 ${
                                                isSelected
                                                  ? 'bg-[#7BC9A6] border-[#7BC9A6]'
                                                  : 'bg-white border-gray-300'
                                              }`}>
                                                {isSelected && (
                                                  <CheckCircle2 className="h-3 w-3 text-white" />
                                                )}
                                              </div>
                                              <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between mb-0.5">
                                                  <p className={`text-xs font-medium flex-1 pr-2 ${
                                                    isSelected ? 'text-gray-900' : 'text-gray-700'
                                                  }`}>
                                                    {service.service}
                                                  </p>
                                                  <Badge 
                                                    variant="secondary" 
                                                    className={`text-xs flex-shrink-0 ${
                                                      isSelected 
                                                        ? 'bg-[#7BC9A6] text-white' 
                                                        : 'bg-gray-100 text-gray-700'
                                                    }`}
                                                  >
                                                    {service.total}
                                                  </Badge>
                                                </div>
                                                <p className="text-xs text-gray-500">
                                                  {service.quantity} • {service.unitPrice}/unit
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                    
                                    {/* Summary */}
                                    <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded">
                                      <div className="flex items-center justify-between">
                                        <span className="text-xs font-semibold text-blue-900">
                                          เลือก {quote.selectedServiceIds.length} จาก {dealData.services?.length || 0} บริการ
                                        </span>
                                        <span className="text-sm font-bold text-blue-900">
                                          {quote.amount}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </>
            )}
          </form>
        </div>

        {/* Bottom Actions */}
        <div className="flex-shrink-0 bg-white border-t p-4">
          <div className="grid grid-cols-2 gap-3">
            {currentStep === 'source' ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="h-11"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    if (sourceType === 'template' && selectedTemplate) {
                      setCurrentStep('mode');
                    } else if (sourceType === 'upload') {
                      setCurrentStep('mode');
                    }
                  }}
                  disabled={
                    !sourceType || 
                    (sourceType === 'template' && !selectedTemplate)
                  }
                  className="h-11 bg-[#7BC9A6] hover:bg-[#6AB896]"
                >
                  ถัดไป →
                </Button>
              </>
            ) : currentStep === 'mode' ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep('source')}
                  className="h-11"
                >
                  ← ย้อนกลับ
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    // ถ้าเลือก Template ให้ไปหน้า QuotationBuilder พร้อมส่ง template และ mode
                    if (sourceType === 'template' && selectedTemplate && onNavigate) {
                      // สร้าง URL พร้อม parameters
                      const params = new URLSearchParams({
                        template: selectedTemplate,
                        mode: mode, // single หรือ multiple
                      });
                      onNavigate(`/quotations/create?${params.toString()}`);
                      onClose(); // ปิด Dialog
                    } else {
                      // ถ้าเลือก Upload ให้ไปที่ Form ใน Dialog
                      setCurrentStep('form');
                    }
                  }}
                  className="h-11 bg-[#7BC9A6] hover:bg-[#6AB896]"
                >
                  ถัดไป →
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep('mode')}
                  disabled={isSubmitting}
                  className="h-11"
                >
                  ← ย้อนกลับ
                </Button>
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`h-11 ${mode === 'multiple' ? 'bg-[#7BC9A6] hover:bg-[#6AB896]' : 'bg-purple-600 hover:bg-purple-700'}`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Creating...
                    </>
                  ) : mode === 'single' ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Create Quotation
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Create {quotations.length} Quotations
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}