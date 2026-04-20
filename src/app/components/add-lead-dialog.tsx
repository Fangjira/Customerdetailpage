import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Combobox } from "./ui/combobox";
import {
  Target,
  Database,
  FileText,
  CheckCircle,
  X,
  Loader2,
  AlertCircle,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Plus,
  Trash2,
  MessageCircle,
  Facebook,
  Instagram,
  Edit,
  Save,
  Building2,
  DollarSign,
  TrendingUp,
  Flame,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
  INDUSTRIES,
  SUPPLY_CHAIN_ROLES,
  BUSINESS_GROUPS,
  BUSINESS_UNITS,
} from "../../config/masterData";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

interface AddLeadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
}

type DataSource = "manual" | "dbd";

interface ContactPerson {
  id: string;
  name: string;
  position: string;
  phone: string;
  email: string;
  isPrimary: boolean;
}

interface LeadData {
  // Basic Info
  companyName: string;
  taxId: string;
  
  // Lead Info
  leadSource: string;
  leadStage: string;
  priority: string;
  estimatedValue: string;
  currency: string;
  
  // Primary Contact (Single)
  contactName: string;
  contactPosition: string;
  contactPhone: string;
  contactEmail: string;
  
  // Additional
  notes: string;
}

const LEAD_SOURCES = [
  { value: "website", label: "เว็บไซต์" },
  { value: "facebook", label: "Facebook" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "email", label: "Email Marketing" },
  { value: "phone", label: "โทรศัพท์" },
  { value: "exhibition", label: "งานแสดงสินค้า" },
  { value: "referral", label: "แนะนำจากลูกค้า" },
  { value: "google_ads", label: "Google Ads" },
  { value: "walk_in", label: "Walk-in" },
  { value: "cold_call", label: "Cold Call" },
  { value: "existing_customer", label: "Existing Customer" },
  { value: "other", label: "อื่นๆ" },
];

const LEAD_STAGES = [
  { value: "lead", label: "Lead" },
  { value: "contact", label: "Contact" },
  { value: "needs_analysis", label: "Needs Analysis" },
  { value: "proposal", label: "Proposal" },
];

const PRIORITIES = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

const CURRENCIES = [
  { value: "USD", label: "USD ($)" },
  { value: "THB", label: "THB (฿)" },
  { value: "EUR", label: "EUR (€)" },
];

export function AddLeadDialog({ isOpen, onClose, onSave }: AddLeadDialogProps) {
  const { t } = useTranslation();
  const [dataSource, setDataSource] = useState<DataSource | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  // Tax ID Validation States
  const [taxIdExists, setTaxIdExists] = useState(false);
  const [existingLeadData, setExistingLeadData] = useState<any>(null);
  const [isCheckingTaxId, setIsCheckingTaxId] = useState(false);

  // DBD Search States
  const [dbdSearchResults, setDbdSearchResults] = useState<any[]>([]);
  const [showDbdResults, setShowDbdResults] = useState(false);
  const [searchType, setSearchType] = useState<'taxId' | 'companyName'>('taxId');

  const [formData, setFormData] = useState<LeadData>({
    companyName: "",
    taxId: "",
    leadSource: "",
    leadStage: "lead",
    priority: "Medium",
    estimatedValue: "",
    currency: "USD",
    contactName: "",
    contactPosition: "",
    contactPhone: "",
    contactEmail: "",
    notes: "",
  });

  const [editingContactId, setEditingContactId] = useState<string | null>(null);
  
  // Duplicate detection popup state
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);

  // Mock data for existing leads in system (for duplicate detection)
  const existingLeadsInSystem = [
    {
      id: "LEAD-001",
      companyName: "Global Traders Ltd.",
      contactName: "สมชาย วงศ์สกุล",
      email: "somchai@globaltraders.com",
      businessUnit: "HCP",
      status: "New",
      assignedTo: "Sarah Chen",
      createdDate: "2025-03-05",
    },
    {
      id: "LEAD-045",
      companyName: "Global Traders Ltd.",
      contactName: "สมชาย วงศ์สกุล",
      email: "somchai@globaltraders.com",
      businessUnit: "Freight Business",
      status: "Contacted",
      assignedTo: "Michael Wong",
      createdDate: "2025-02-28",
    },
    {
      id: "LEAD-002",
      companyName: "FreshFood Partners",
      contactName: "สมหญิง ใจดี",
      email: "somying@freshfood.co.th",
      businessUnit: "Cold Chain",
      status: "Qualified",
      assignedTo: "Emily Rodriguez",
      createdDate: "2025-03-08",
    },
    {
      id: "LEAD-999",
      companyName: "Test Company",
      contactName: "test",
      email: "test",
      phone: "test",
      businessUnit: "ASEAN Island and Taiwan",
      status: "New",
      assignedTo: "John Smith",
      createdDate: "2025-03-18",
    },
  ];

  // Find duplicate leads
  const duplicateLeads = existingLeadsInSystem.filter((lead) => {
    if (!formData.companyName && !formData.contactName && !formData.contactEmail) {
      return false;
    }

    // Check if matches by company name, contact name, or email
    const matchesCompany = lead.companyName && formData.companyName &&
      (lead.companyName.toLowerCase().includes(formData.companyName.toLowerCase()) ||
       formData.companyName.toLowerCase().includes(lead.companyName.toLowerCase()));
    
    const matchesContact = lead.contactName && formData.contactName &&
      (lead.contactName.toLowerCase().includes(formData.contactName.toLowerCase()) ||
       formData.contactName.toLowerCase().includes(lead.contactName.toLowerCase()));
    
    const matchesEmail = lead.email && formData.contactEmail &&
      lead.email.toLowerCase() === formData.contactEmail.toLowerCase();
    
    return matchesCompany || matchesContact || matchesEmail;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Contacted":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "Qualified":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  // Mock DBD Database for autocomplete
  const mockDbdDatabase = [
    {
      id: "1",
      companyName: "บริษัท ดิจิตอล คอมเมิร์ซ โซลูชั่นส์ จำกัด",
      taxId: "0105558123456",
      registrationNumber: "0105558123456",
      businessType: "บริษัทจำกัด",
      capital: "5,000,000",
      establishedDate: "2018-03-15",
      address: "123 ถนนสุขุมวิท แขวงคลองเตย",
      province: "กรุงเทพมหานคร",
      district: "คลองเตย",
      postalCode: "10110",
      status: "ดำเนินการ",
    },
    {
      id: "2",
      companyName: "บริษัท ดิจิตอล เทคโนโลยี จำกัด",
      taxId: "0105559234567",
      registrationNumber: "0105559234567",
      businessType: "บริษัทจำกัด",
      capital: "3,000,000",
      establishedDate: "2019-07-22",
      address: "456 ถนนพระราม 9 แขวงห้วยขวาง",
      province: "กรุงเทพมหานคร",
      district: "ห้วยขวาง",
      postalCode: "10310",
      status: "ดำเนินการ",
    },
    {
      id: "3",
      companyName: "บริษัท ดิจิตอล มาร์เก็ตติ้ง จำกัด",
      taxId: "0105560345678",
      registrationNumber: "0105560345678",
      businessType: "บริษัทจำกัด",
      capital: "2,000,000",
      establishedDate: "2020-01-10",
      address: "789 ถนนรัชดาภิเษก แขวงจตุจักร",
      province: "กรุงเทพมหานคร",
      district: "จตุจักร",
      postalCode: "10900",
      status: "ดำเนินการ",
    },
    {
      id: "4",
      companyName: "บริษัท โลจิสติกส์ ไทย จำกัด",
      taxId: "0105561456789",
      registrationNumber: "0105561456789",
      businessType: "บริษัทจำกัด",
      capital: "10,000,000",
      establishedDate: "2015-05-20",
      address: "321 ถนนเพชรบุรี แขวงมักกะสัน",
      province: "กรุงเทพมหานคร",
      district: "ราชเทวี",
      postalCode: "10400",
      status: "ดำเนินการ",
    },
    {
      id: "5",
      companyName: "บริษัท ไทย อิมปอร์ต เอ็กซ์ปอร์ต จำกัด",
      taxId: "0105562567890",
      registrationNumber: "0105562567890",
      businessType: "บริษัทจำกัด",
      capital: "7,500,000",
      establishedDate: "2016-08-15",
      address: "654 ถนนสาทร แขวงยานนาวา",
      province: "กรุงเทพมหานคร",
      district: "สาทร",
      postalCode: "10120",
      status: "ดำเนินการ",
    },
    {
      id: "6",
      companyName: "บริษัท สมาร์ท โซลูชั่น จำกัด",
      taxId: "0105563678901",
      registrationNumber: "0105563678901",
      businessType: "บริษัทจำกัด",
      capital: "4,000,000",
      establishedDate: "2017-11-30",
      address: "987 ถนนพหลโยธิน แขวงลาดยาว",
      province: "กรุงเทพมหานคร",
      district: "จตุจักร",
      postalCode: "10900",
      status: "ดำเนินการ",
    },
    {
      id: "7",
      companyName: "บริษัท ฟู้ด เทรดดิ้ง จำกัด",
      taxId: "0105564789012",
      registrationNumber: "0105564789012",
      businessType: "บริษัทจำกัด",
      capital: "6,000,000",
      establishedDate: "2019-03-25",
      address: "147 ถนนลาดพร้าว แขวงจันทรเกษม",
      province: "กรุงเทพมหานคร",
      district: "จตุจักร",
      postalCode: "10900",
      status: "ดำเนินการ",
    },
    {
      id: "8",
      companyName: "บริษัท อินเตอร์เนชั่นแนล คาร์โก้ จำกัด",
      taxId: "0105565890123",
      registrationNumber: "0105565890123",
      businessType: "บริษัทจำกัด",
      capital: "15,000,000",
      establishedDate: "2014-09-12",
      address: "258 ถนนสุขุมวิท แขวงพระโขนง",
      province: "กรุงเทพมหานคร",
      district: "คลองเตย",
      postalCode: "10110",
      status: "ดำเนินการ",
    },
  ];

  // Auto-search with debounce
  useEffect(() => {
    if (dataSource !== "dbd" || !searchValue.trim() || searchValue.length < 2) {
      setDbdSearchResults([]);
      setShowDbdResults(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      handleAutoSearch();
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchValue, dataSource]);

  const handleAutoSearch = async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Filter mock data - search both taxId and companyName
      const filtered = mockDbdDatabase.filter(company => {
        const searchLower = searchValue.toLowerCase();
        return company.taxId.includes(searchValue) || 
               company.companyName.toLowerCase().includes(searchLower);
      });

      setDbdSearchResults(filtered);
      setShowDbdResults(true);
      setIsLoading(false);
    } catch (error) {
      setHasError(true);
      setErrorMessage("ไม่สามารถเชื่อมต่อกับ DBD API ได้");
      setIsLoading(false);
    }
  };

  const handleDataSourceSelect = (source: DataSource) => {
    setDataSource(source);
    setHasError(false);
    setErrorMessage("");
    setShowDbdResults(false);
    setSearchValue("");
    setDbdSearchResults([]);
  };

  const handleDbdSearch = async () => {
    if (!searchValue.trim()) {
      setErrorMessage("กรุณากรอกข้อมูลที่ต้องการค้นหา");
      setHasError(true);
      return;
    }

    handleAutoSearch();
  };

  const handleSelectDbdResult = (result: any) => {
    setFormData(prev => ({
      ...prev,
      companyName: result.companyName,
      taxId: result.taxId,
    }));
    setShowDbdResults(false);
    toast.success("นำเข้าข้อมูลจาก DBD สำเร็จ");
  };

  const handleInputChange = (field: keyof LeadData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    setDataSource(null);
    setSearchValue("");
    setHasError(false);
    setErrorMessage("");
    setShowDbdResults(false);
    setDbdSearchResults([]);
    setTaxIdExists(false);
    setExistingLeadData(null);
    setShowDuplicateWarning(false);
    setFormData({
      companyName: "",
      taxId: "",
      leadSource: "",
      leadStage: "lead",
      priority: "Medium",
      estimatedValue: "",
      currency: "USD",
      contactName: "",
      contactPosition: "",
      contactPhone: "",
      contactEmail: "",
      notes: "",
    });
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!dataSource) {
      toast.error("กรุณาเลือกช่องทางข้อมูล");
      return;
    }

    if (!formData.contactName) {
      toast.error("กรุณากรอกชื่อ-นามสกุลผู้ติดต่อ");
      return;
    }

    if (!formData.contactPhone) {
      toast.error("กรุณากรอกเบอร์โทรศัพท์ผู้ติดต่อ");
      return;
    }

    if (!formData.contactEmail) {
      toast.error("กรุณากรอก Email ผู้ติดต่อ");
      return;
    }

    if (!formData.leadSource) {
      toast.error("กรุณาเลือกแหล่งที่มาของ Lead");
      return;
    }

    // Check for duplicates before saving
    if (duplicateLeads.length > 0) {
      setShowDuplicateWarning(true);
      return;
    }

    // Proceed with save
    await saveLead();
  };

  const saveLead = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSave?.(formData);
      toast.success("บันทึก Lead สำเร็จ!");
      handleClose();
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการบันทึก");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmCreate = async () => {
    setShowDuplicateWarning(false);
    await saveLead();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-2 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Target className="h-4 w-4 text-emerald-600" />
              </div>
              <div>
                <DialogTitle className="text-base font-semibold text-gray-900">
                  เพิ่ม Lead
                </DialogTitle>
                <DialogDescription className="text-[10px] text-gray-500 mt-0.5">
                  เพิ่มข้อมูล Lead ใหม่ในระบบ CRM
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 py-3">
            {/* Data Source Tabs */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">
                ช่องทางข้อมูล Lead <span className="text-red-500">*</span>
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {/* DBD API */}
                <button
                  type="button"
                  onClick={() => handleDataSourceSelect("dbd")}
                  className={`relative p-4 border-2 rounded-xl transition-all duration-200 hover:shadow-md ${
                    dataSource === "dbd"
                      ? "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100/50 shadow-sm"
                      : "border-gray-200 bg-white hover:border-blue-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      dataSource === "dbd" ? "bg-blue-500" : "bg-blue-100"
                    }`}>
                      <Database className={`h-5 w-5 ${
                        dataSource === "dbd" ? "text-white" : "text-blue-600"
                      }`} />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="text-sm font-semibold text-gray-900">DBD API</h4>
                      <p className="text-xs text-gray-500 mt-1">ดึงข้อมูลจากกรมพัฒนาธุรกิจการค้า</p>
                    </div>
                    {dataSource === "dbd" && (
                      <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                    )}
                  </div>
                </button>

                {/* Manual Entry */}
                <button
                  type="button"
                  onClick={() => handleDataSourceSelect("manual")}
                  className={`relative p-4 border-2 rounded-xl transition-all duration-200 hover:shadow-md ${
                    dataSource === "manual"
                      ? "border-emerald-500 bg-gradient-to-br from-emerald-50 to-emerald-100/50 shadow-sm"
                      : "border-gray-200 bg-white hover:border-emerald-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      dataSource === "manual" ? "bg-emerald-500" : "bg-emerald-100"
                    }`}>
                      <FileText className={`h-5 w-5 ${
                        dataSource === "manual" ? "text-white" : "text-emerald-600"
                      }`} />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="text-sm font-semibold text-gray-900">Manual Entry</h4>
                      <p className="text-xs text-gray-500 mt-1">กรอกข้อมูลด้วยตนเอง</p>
                    </div>
                    {dataSource === "manual" && (
                      <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    )}
                  </div>
                </button>
              </div>
            </div>

            {/* DBD Search Section */}
            {dataSource === "dbd" && (
              <div className="space-y-3 p-4 bg-blue-50/50 rounded-lg border border-blue-200">
                <div className="w-full">
                  <Label className="text-xs font-medium text-gray-700 mb-2 block">
                    ข้อมูลสำหรับค้นหา
                  </Label>
                  <Input
                    placeholder="พิมพ์เลขทะเบียน 13 หลัก หรือ ชื่อบริษัท..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="bg-white border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleDbdSearch();
                      }
                    }}
                  />
                  <p className="text-[10px] text-blue-600 mt-2 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    ค้นหาได้ทั้ง เลขทะเบียนนิติบุคคล หรือ ชื่อบริษัท (ภาษาไทยหรืออังกฤษ)
                  </p>
                </div>

                {hasError && (
                  <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-red-700">{errorMessage}</p>
                  </div>
                )}

                {isLoading && searchValue.length >= 2 && (
                  <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
                    <p className="text-xs text-blue-700">กำลังค้นหา...</p>
                  </div>
                )}

                {showDbdResults && dbdSearchResults.length > 0 && (
                  <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    <p className="text-[10px] font-medium text-gray-600 px-1">
                      พบ {dbdSearchResults.length} รายการ
                    </p>
                    {dbdSearchResults.map((result) => (
                      <button
                        key={result.id}
                        type="button"
                        onClick={() => handleSelectDbdResult(result)}
                        className="w-full p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-sm transition-all text-left"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 truncate">{result.companyName}</h4>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
                              <p className="text-xs text-gray-600">
                                <span className="font-medium">เลขทะเบียน:</span> {result.taxId}
                              </p>
                              <p className="text-xs text-gray-600">
                                <span className="font-medium">ประเภท:</span> {result.businessType}
                              </p>
                              <p className="text-xs text-gray-600">
                                <span className="font-medium">ทุนจดทะเบียน:</span> {result.capital} บาท
                              </p>
                              <p className="text-xs text-gray-600">
                                <span className="font-medium">สถานะ:</span> {result.status}
                              </p>
                            </div>
                          </div>
                          <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Lead Form (shown after data source selection) */}
            {dataSource && (
              <>
                {/* Basic Company Info */}
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide border-b pb-2">
                    ข้อมูลบริษัท
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="companyName" className="text-xs font-medium text-gray-700">
                        ชื่อบริษัท
                      </Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange("companyName", e.target.value)}
                        placeholder="ชื่อบริษัท"
                        className="mt-1 border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="taxId" className="text-xs font-medium text-gray-700">
                        เลขทะเบียน
                      </Label>
                      <Input
                        id="taxId"
                        value={formData.taxId}
                        onChange={(e) => handleInputChange("taxId", e.target.value)}
                        placeholder="0000000000000"
                        className="mt-1 border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Lead Info */}
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide border-b pb-2">
                    ข้อมูล Lead
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="leadSource" className="text-xs font-medium text-gray-700">
                        แหล่งที่มา <span className="text-red-500">*</span>
                      </Label>
                      <Combobox
                        options={LEAD_SOURCES}
                        value={formData.leadSource}
                        onValueChange={(value) => handleInputChange("leadSource", value)}
                        placeholder="เลือกแหล่งที่มา"
                        searchPlaceholder="ค้นหา..."
                        className="mt-1 border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="leadStage" className="text-xs font-medium text-gray-700">
                        ขั้นตอน
                      </Label>
                      <Combobox
                        options={LEAD_STAGES}
                        value={formData.leadStage}
                        onValueChange={(value) => handleInputChange("leadStage", value)}
                        placeholder="เลือก..."
                        searchPlaceholder="ค้นหา..."
                        className="mt-1 border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="priority" className="text-xs font-medium text-gray-700">
                        ความสำคัญ
                      </Label>
                      <Combobox
                        options={PRIORITIES}
                        value={formData.priority}
                        onValueChange={(value) => handleInputChange("priority", value)}
                        placeholder="เลือก..."
                        searchPlaceholder="ค้นหา..."
                        className="mt-1 border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="estimatedValue" className="text-xs font-medium text-gray-700">
                        มูลค่าโอกาส
                      </Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id="estimatedValue"
                          value={formData.estimatedValue}
                          onChange={(e) => handleInputChange("estimatedValue", e.target.value)}
                          placeholder="0.00"
                          type="number"
                          className="flex-1 border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 px-[50px] py-[4px]"
                        />
                        <Combobox
                          options={CURRENCIES}
                          value={formData.currency}
                          onValueChange={(value) => handleInputChange("currency", value)}
                          placeholder="Currency"
                          searchPlaceholder="Search..."
                          className="w-[100px] border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-[#ffffff]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Primary Contact */}
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide border-b pb-2">
                    ผู้ติดต่อหลัก
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="contactName" className="text-xs font-medium text-gray-700">
                        ชื่อ-นามสกุล <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="contactName"
                        value={formData.contactName}
                        onChange={(e) => handleInputChange("contactName", e.target.value)}
                        placeholder="ชื่อผู้ติดต่อ"
                        className="mt-1 border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactPosition" className="text-xs font-medium text-gray-700">
                        ตำแหน่ง
                      </Label>
                      <Input
                        id="contactPosition"
                        value={formData.contactPosition}
                        onChange={(e) => handleInputChange("contactPosition", e.target.value)}
                        placeholder="ตำแหน่ง"
                        className="mt-1 border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactPhone" className="text-xs font-medium text-gray-700">
                        โทรศัพท์ <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="contactPhone"
                        value={formData.contactPhone}
                        onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                        placeholder="0812345678"
                        className="mt-1 border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactEmail" className="text-xs font-medium text-gray-700">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="contactEmail"
                        value={formData.contactEmail}
                        onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                        placeholder="email@example.com"
                        className="mt-1 border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide border-b pb-2">
                    หมายเหตุ
                  </h3>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="กรอกหมายเหตุเพิ่มเติม..."
                    className="min-h-[100px] border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </>
            )}

            {/* Footer */}
            <DialogFooter className="pt-4 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
              >
                ยกเลิก
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !dataSource}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    กำลังบันทึก...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    บันทึก Lead
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Duplicate Warning Popup Dialog */}
      <Dialog open={showDuplicateWarning} onOpenChange={setShowDuplicateWarning}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader className="pb-3 border-b border-red-200">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-red-900">
                  พบข้อมูล Lead ซ้ำในระบบ!
                </DialogTitle>
                <DialogDescription className="text-xs text-red-600 mt-1">
                  ตรวจพบ {duplicateLeads.length} รายการที่มีข้อมูลคล้ายกัน
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm font-medium text-red-900 mb-2">
                ⚠️ คำเตือน: พบข้อมูลที่คล้ายกันในระบบ
              </p>
              <p className="text-xs text-red-700">
                พบข้อมูล Lead ที่มีชื่อบริษัท ชื่อผู้ติดต่อ หรืออีเมลที่คล้ายกันอยู่ในระบบแล้ว 
                การสร้าง Lead ซ้ำอาจทำให้เกิดความสับสนและข้อมูลซ้ำซ้อน
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-900">
                Lead ที่คล้ายกันในระบบ:
              </h4>
              
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                {duplicateLeads.map((dupLead) => (
                  <Card key={dupLead.id} className="border-2 border-yellow-300 bg-yellow-50/50">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className="bg-gray-100 text-gray-700 border-gray-200 text-xs">
                                {dupLead.id}
                              </Badge>
                              <Badge className={`${getStatusColor(dupLead.status)} text-xs border`}>
                                {dupLead.status}
                              </Badge>
                            </div>
                            <h5 className="text-sm font-bold text-gray-900">{dupLead.companyName}</h5>
                            <p className="text-sm text-gray-700 mt-1">
                              {dupLead.contactName} <span className="text-gray-500">({dupLead.email})</span>
                            </p>
                          </div>
                          <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-yellow-200">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Business Unit</p>
                            <p className="text-sm font-medium text-gray-900 uppercase">{dupLead.businessUnit}</p>
                          </div>
                          
                          <div>
                            <p className="text-xs text-gray-500 mb-1">ผู้รับผิดชอบ</p>
                            <p className="text-sm font-medium text-gray-900">{dupLead.assignedTo}</p>
                          </div>
                          
                          {dupLead.createdDate && (
                            <div className="col-span-2">
                              <p className="text-xs text-gray-500 mb-1">วันที่สร้าง</p>
                              <p className="text-sm text-gray-700">
                                {new Date(dupLead.createdDate).toLocaleDateString('th-TH', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-blue-800">
                <strong>💡 คำแนะนำ:</strong> หากคุณต้องการทำงานกับ Lead ที่มีอยู่แล้ว 
                กรุณาปิดหน้าต่างนี้แล้วค้นหา Lead ที่ต้องการแก้ไข หรือหากต้องการสร้าง Lead ใหม่จริงๆ 
                สามารถกดปุ่ม "สร้างต่อไป" ด้านล่าง
              </p>
            </div>
          </div>

          <DialogFooter className="pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowDuplicateWarning(false)}
              disabled={isLoading}
            >
              ยกเลิก
            </Button>
            <Button
              type="button"
              onClick={handleConfirmCreate}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  กำลังสร้าง...
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4 mr-2" />
                  สร้างต่อไป (ยืนยันการสร้างแม้มีข้อมูลซ้ำ)
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}