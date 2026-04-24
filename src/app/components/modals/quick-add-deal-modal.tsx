import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Combobox, ComboboxOption } from "../ui/combobox";
import { Badge } from "../ui/badge";
import { 
  X, 
  DollarSign, 
  Calendar, 
  Building2, 
  Package, 
  Check, 
  User, 
  Plus, 
  Trash2,
  Mail,
  Phone,
  ChevronsUpDown,
  UserPlus,
  ChevronDown,
  Upload,
  FileText,
  Paperclip
} from "lucide-react";
import { toast } from "sonner";
import { DuplicateDealWarningDialog } from "../duplicate-deal-warning-dialog";

interface QuickAddDealModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSave?: (dealData: any) => void;
}

// Smart defaults and common values
const QUICK_SERVICES = [
  "Freight",
  "Customs",
  "Warehouse",
  "Transport",
  "Crossborder",
  "Trading",
  "Service",
  "Other",
  "Unknown",
];

const QUICK_INDUSTRIES = [
  "Agriculture",
  "Automotive",
  "Electronics",
  "Food & FMCG",
  "Healthcare",
  "Manufacturing",
  "Retail",
  "Technology",
  "Other",
];

const PROJECT_STATUSES = [
  "Prospect",
  "Approach",
  "Quotation",
  "Negotiating Process",
];

const QUICK_COMMODITIES = [
  "General Cargo",
  "Electronics",
  "Food Products",
  "Automotive Parts",
  "Chemicals",
  "Textiles",
  "Machinery",
  "Other",
];

const PROBABILITY_OPTIONS = [
  { value: "low", label: "Low (25%)", percent: 25 },
  { value: "medium", label: "Medium (50%)", percent: 50 },
  { value: "high", label: "High (75%)", percent: 75 },
  { value: "very-high", label: "Very High (90%)", percent: 90 },
];

interface ServiceItem {
  id: string;
  service: string;
  quantity: string;
  unitPrice: string;
}

interface AttachedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
}

export function QuickAddDealModal({ isOpen, onClose, onSave }: QuickAddDealModalProps) {
  const { t } = useTranslation();
  const dealNameRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    dealName: "",
    customerName: "",
    customerType: "customer" as "customer" | "lead",
    dealValue: "",
    currency: "USD",
    industry: "",
    commodityType: "",
    commodityDetail: "",
    projectStatus: "Prospect",
    expectedCloseDate: "",
    projectStartDate: "",
    probability: "medium",
    owner: "Current User",
    remarks: "",
  });

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [serviceItems, setServiceItems] = useState<ServiceItem[]>([]);
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);
  const [duplicateDeals, setDuplicateDeals] = useState<any[]>([]);
  const [pendingDealData, setPendingDealData] = useState<any>(null);

  // Customer suggestion states
  const [customerOpen, setCustomerOpen] = useState(false);
  const [customerSearch, setCustomerSearch] = useState("");
  const [showCreateLead, setShowCreateLead] = useState(false);
  const [leadData, setLeadData] = useState({
    email: "",
    phone: "",
  });

  // Sample customer list
  const customers = [
    { id: "C001", name: "บริษัท ไทยเบฟเวอเรจ จำกัด (มหาชน)", type: "customer" },
    { id: "C002", name: "บริษัท เซ็นทรัล รีเทล คอร์ปอเรชั่น จำกัด (มหาชน)", type: "customer" },
    { id: "C003", name: "บริษัท ซีพี ออลล์ จำกัด (มหาชน)", type: "customer" },
    { id: "C004", name: "บริษัท ปูนซีเมนต์ไทย จำกัด (มหาชน)", type: "customer" },
    { id: "C005", name: "บริษัท แอดวานซ์ อินโฟร์ เซอร์วิส จำกัด (มหาชน)", type: "customer" },
    { id: "L001", name: "ABC Trading Co., Ltd.", type: "lead" },
    { id: "L002", name: "XYZ Logistics Solutions", type: "lead" },
  ];

  // Filter customers based on search
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(customerSearch.toLowerCase())
  );

  // Mock existing deals database
  const existingDeals = [
    {
      id: "DEAL-2024-001",
      dealName: "International Air Freight to Japan",
      customerName: "บริษัท เทคโนโลยี จำกัด",
      services: ["Freight", "Crossborder"],
      dealValue: "150000",
      currency: "USD",
      createdBy: "สมชาย ใจดี",
      createdAt: "2024-03-10T10:30:00Z",
      status: "Quotation",
    },
  ];

  // Auto-focus on deal name when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        dealNameRef.current?.focus();
      }, 100);
      
      // Set default dates
      const today = new Date();
      const defaultCloseDate = new Date(today);
      defaultCloseDate.setDate(defaultCloseDate.getDate() + 30);
      
      setFormData(prev => ({
        ...prev,
        projectStartDate: today.toISOString().split('T')[0],
        expectedCloseDate: defaultCloseDate.toISOString().split('T')[0],
      }));
    }
  }, [isOpen]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle creating lead
  const handleCreateLead = () => {
    // Validate email and phone
    if (!leadData.email || !leadData.phone) {
      toast.error("กรุณากรอกอีเมลและเบอร์โทรศัพท์");
      return;
    }

    // Create lead with customer search as company name
    const newLead = {
      id: `L-${Date.now().toString().slice(-4)}`,
      companyName: customerSearch,
      email: leadData.email,
      phone: leadData.phone,
      createdAt: new Date().toISOString(),
    };

    console.log("Creating new lead:", newLead);

    // Set the customer to the search term and mark as lead
    setFormData((prev) => ({
      ...prev,
      customerName: customerSearch,
      customerType: "lead",
    }));

    // Close the dropdown and reset
    setShowCreateLead(false);
    setCustomerOpen(false);
    setLeadData({ email: "", phone: "" });
    
    toast.success(`สร้างลีด "${customerSearch}" สำเร็จ!`);
  };

  const toggleService = (service: string) => {
    setSelectedServices(prev => {
      if (prev.includes(service)) {
        return prev.filter(s => s !== service);
      }
      return [...prev, service];
    });
  };

  const addServiceItem = () => {
    setServiceItems(prev => [
      ...prev,
      {
        id: `service-${Date.now()}`,
        service: "",
        quantity: "",
        unitPrice: "",
      }
    ]);
  };

  const updateServiceItem = (id: string, field: string, value: string) => {
    setServiceItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const removeServiceItem = (id: string) => {
    setServiceItems(prev => prev.filter(item => item.id !== id));
  };

  const calculateServiceTotal = (item: ServiceItem) => {
    const qty = parseFloat(item.quantity) || 0;
    const price = parseFloat(item.unitPrice) || 0;
    return (qty * price).toFixed(2);
  };

  const calculateTotalValue = () => {
    const total = serviceItems.reduce((sum, item) => {
      const qty = parseFloat(item.quantity) || 0;
      const price = parseFloat(item.unitPrice) || 0;
      return sum + (qty * price);
    }, 0);
    return total.toFixed(2);
  };

  // File handling functions
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles: AttachedFile[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`ไฟล์ ${file.name} มีขนาดใหญ่เกิน 10MB`);
        continue;
      }

      newFiles.push({
        id: `file-${Date.now()}-${i}`,
        name: file.name,
        size: file.size,
        type: file.type,
        file: file,
      });
    }

    setAttachedFiles(prev => [...prev, ...newFiles]);
    
    if (newFiles.length > 0) {
      toast.success(`แนบไฟล์ ${newFiles.length} ไฟล์สำเร็จ`);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (fileId: string) => {
    setAttachedFiles(prev => prev.filter(f => f.id !== fileId));
    toast.success("ลบไฟล์สำเร็จ");
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return <FileText className="h-4 w-4 text-red-500" />;
    if (fileType.includes('image')) return <FileText className="h-4 w-4 text-blue-500" />;
    if (fileType.includes('word') || fileType.includes('document')) return <FileText className="h-4 w-4 text-blue-600" />;
    if (fileType.includes('excel') || fileType.includes('sheet')) return <FileText className="h-4 w-4 text-green-600" />;
    return <FileText className="h-4 w-4 text-gray-500" />;
  };

  const handleSave = () => {
    // Validation
    if (!formData.dealName.trim()) {
      toast.error("กรุณาระบุชื่อดีล");
      dealNameRef.current?.focus();
      return;
    }

    if (!formData.customerName.trim()) {
      toast.error("กรุณาระบุชื่อลูกค้า");
      return;
    }

    if (selectedServices.length === 0) {
      toast.error("กรุณาเลือกบริการอย่างน้อย 1 รายการ");
      return;
    }

    // Auto-calculate deal value from service items if available
    let finalDealValue = formData.dealValue;
    if (serviceItems.length > 0) {
      const calculatedTotal = calculateTotalValue();
      if (parseFloat(calculatedTotal) > 0) {
        finalDealValue = calculatedTotal;
      }
    }

    // Prepare deal data
    const dealData = {
      ...formData,
      dealValue: finalDealValue,
      services: selectedServices,
      serviceItems: serviceItems,
      attachedFiles: attachedFiles,
      id: `DEAL-${Date.now()}`,
      createdAt: new Date().toISOString(),
      createdBy: formData.owner,
      progress: 0,
      probabilityOfDeal: PROBABILITY_OPTIONS.find(p => p.value === formData.probability)?.label || "Medium (50%)",
    };

    // Check for duplicate deals
    const duplicates = checkForDuplicates(formData.customerName, selectedServices);

    if (duplicates.length > 0) {
      setShowDuplicateWarning(true);
      setDuplicateDeals(duplicates);
      setPendingDealData(dealData);
    } else {
      saveDeal(dealData);
    }
  };

  const checkForDuplicates = (customerName: string, services: string[]) => {
    const duplicates = existingDeals
      .filter(deal => {
        const isSameCustomer = deal.customerName.toLowerCase() === customerName.toLowerCase();
        const matchingServices = deal.services.filter(s => services.includes(s));
        return isSameCustomer && matchingServices.length > 0;
      })
      .map(deal => {
        const matchingServices = deal.services.filter(s => services.includes(s));
        const customerMatch = deal.customerName.toLowerCase() === customerName.toLowerCase() ? 50 : 0;
        const serviceMatch = (matchingServices.length / Math.max(deal.services.length, services.length)) * 50;
        const matchPercentage = Math.round(customerMatch + serviceMatch);

        return {
          ...deal,
          matchPercentage,
        };
      })
      .sort((a, b) => b.matchPercentage - a.matchPercentage);

    return duplicates;
  };

  const saveDeal = (dealData: any) => {
    onSave?.(dealData);
    
    if (duplicateDeals.length > 0) {
      const notifiedUsers = duplicateDeals.map(d => d.createdBy).filter((v, i, a) => a.indexOf(v) === i);
      
      notifiedUsers.forEach(user => {
        console.log(`🔔 Notification sent to ${user}: มีผู้ใช้งานสร้างดีลที่คล้ายกับดีลของคุณ - ${dealData.dealName} (${dealData.customerName})`);
      });

      toast.success(`สร้างดีลใหม่สำเร็จ และแจ้งเตือนไปยัง ${notifiedUsers.length} ผู้ใช้งาน`, {
        description: `ผู้ใช้ที่ได้รับการแจ้งเตือน: ${notifiedUsers.join(", ")}`,
        duration: 5000,
      });
    } else {
      toast.success("สร้างดีลใหม่สำเร็จ");
    }

    handleClose();
  };

  const handleContinueWithDuplicate = () => {
    if (pendingDealData) {
      saveDeal(pendingDealData);
    }
    setShowDuplicateWarning(false);
    setDuplicateDeals([]);
    setPendingDealData(null);
  };

  const handleCancelDuplicate = () => {
    setShowDuplicateWarning(false);
    setDuplicateDeals([]);
    setPendingDealData(null);
    toast.info("ยกเลิกการสร้างดีล");
  };

  const handleClose = () => {
    setFormData({
      dealName: "",
      customerName: "",
      customerType: "customer",
      dealValue: "",
      currency: "USD",
      industry: "",
      commodityType: "",
      commodityDetail: "",
      projectStatus: "Prospect",
      expectedCloseDate: "",
      projectStartDate: "",
      probability: "medium",
      owner: "Current User",
      remarks: "",
    });
    setSelectedServices([]);
    setServiceItems([]);
    setAttachedFiles([]);
    setCustomerSearch("");
    setShowCreateLead(false);
    setLeadData({ email: "", phone: "" });
    onClose();
  };

  // Calculate progress percentage
  const calculateProgress = () => {
    let completed = 0;
    const total = 4;
    
    if (formData.dealName && formData.customerName) completed++;
    if (formData.commodityDetail || formData.commodityType || formData.industry) completed++;
    if (selectedServices.length > 0) completed++;
    if (formData.expectedCloseDate && formData.projectStartDate) completed++;
    
    return (completed / total) * 100;
  };

  const progress = calculateProgress();

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-3xl max-h-[96vh] md:max-h-[96vh] h-full md:h-auto w-full md:w-auto p-0 gap-0">
          <DialogHeader className="sr-only">
            <DialogTitle>สร้างดีลใหม่</DialogTitle>
          
          <DialogDescription className="sr-only">
            Dialog description
          </DialogDescription></DialogHeader>
          
          {/* Header with Progress */}
          <div className="bg-gradient-to-r from-[#7BC9A6] to-[#6AB896] px-4 md:px-6 py-3 md:py-2.5 text-white flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-base md:text-sm">สร้างดีลใหม่</h2>
                <p className="text-xs md:text-[10px] text-white/90 mt-0.5">
                  กรอกข้อมูลเพื่อเริ่มต้นโอกาสทางธุรกิจใหม่
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="h-8 w-8 md:h-7 md:w-7 p-0 text-white hover:bg-white/20 rounded-full flex-shrink-0"
              >
                <X className="h-5 w-5 md:h-4 md:w-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto flex-1 px-4 md:px-6 py-4 md:py-3">
            <div className="relative">
              {/* Vertical Line - Hidden on mobile */}
              <div className="hidden md:block absolute left-4 top-4 bottom-4 w-px bg-gray-200"></div>
              
              <div className="space-y-4 md:space-y-3 relative">
                {/* Step 1: ข้อมูลพื้นฐาน */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 relative z-10">
                    <div className="h-8 w-8 rounded-full bg-white border-2 border-purple-500 text-purple-500 flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                  </div>
                  <div className="flex-1 pb-2">
                    <h3 className="font-bold text-gray-900 mb-2 text-sm">ข้อมูลพื้นฐาน</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-2.5">
                      {/* ชื่อดีล */}
                      <div>
                        <Label className="text-sm md:text-xs text-gray-700 mb-1.5 block">
                          <span className="text-red-500">* </span>ชื่อดีล
                        </Label>
                        <Input
                          ref={dealNameRef}
                          value={formData.dealName}
                          onChange={(e) => handleInputChange("dealName", e.target.value)}
                          placeholder="ชื่อดีล"
                          className="h-11 md:h-9 text-base md:text-sm"
                        />
                      </div>

                      {/* เลือกลูกค้า/ลีด */}
                      <div>
                        <Label className="text-sm md:text-xs text-gray-700 mb-1.5 block">
                          <span className="text-red-500">* </span>เลือกลูกค้า/ลีด
                        </Label>
                        <div className="relative">
                          <Input
                            value={formData.customerName}
                            onChange={(e) => {
                              handleInputChange("customerName", e.target.value);
                              setCustomerSearch(e.target.value);
                              setCustomerOpen(true);
                              setShowCreateLead(false);
                            }}
                            onFocus={() => {
                              setCustomerSearch(formData.customerName);
                              setCustomerOpen(true);
                            }}
                            placeholder="เลือกลูกค้า/ลีด"
                            className="h-11 md:h-9 text-base md:text-sm pr-10"
                          />
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 md:h-4 md:w-4 text-gray-400 pointer-events-none" />
                          
                          {/* Dropdown */}
                          {customerOpen && (
                            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                              {filteredCustomers.length > 0 ? (
                                <div>
                                  {filteredCustomers.map((customer) => (
                                    <div
                                      key={customer.id}
                                      className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                                      onClick={() => {
                                        handleInputChange("customerName", customer.name);
                                        handleInputChange("customerType", customer.type);
                                        setCustomerOpen(false);
                                        setCustomerSearch("");
                                      }}
                                    >
                                      {customer.name}
                                    </div>
                                  ))}
                                </div>
                              ) : customerSearch ? (
                                <div>
                                  <div className="px-3 py-2 text-xs text-amber-700 bg-amber-50">
                                    ไม่พบลูกค้า "{customerSearch}"
                                  </div>
                                  {!showCreateLead ? (
                                    <div
                                      className="px-3 py-2 text-xs cursor-pointer hover:bg-blue-50 flex items-center gap-2 text-blue-600 font-medium"
                                      onClick={() => setShowCreateLead(true)}
                                    >
                                      <UserPlus className="h-3.5 w-3.5" />
                                      <span>ต้องการสร้างลีดใหม่?</span>
                                    </div>
                                  ) : (
                                    <div className="p-3 space-y-2 bg-blue-50/50">
                                      <div className="flex items-center justify-between">
                                        <h4 className="text-xs font-semibold text-gray-900">สร้างลีดใหม่: "{customerSearch}"</h4>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setShowCreateLead(false);
                                            setLeadData({ email: "", phone: "" });
                                          }}
                                          className="text-gray-400 hover:text-gray-600"
                                        >
                                          <X className="h-3.5 w-3.5" />
                                        </button>
                                      </div>
                                      
                                      <div className="space-y-2">
                                        <div>
                                          <Label className="text-xs text-gray-700 mb-1 block">
                                            อีเมล <span className="text-red-500">*</span>
                                          </Label>
                                          <Input
                                            type="email"
                                            placeholder="example@company.com"
                                            value={leadData.email}
                                            onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                                            className="h-8 text-xs"
                                          />
                                        </div>
                                        
                                        <div>
                                          <Label className="text-xs text-gray-700 mb-1 block">
                                            เบอร์โทรศัพท์ <span className="text-red-500">*</span>
                                          </Label>
                                          <Input
                                            type="tel"
                                            placeholder="08X-XXX-XXXX"
                                            value={leadData.phone}
                                            onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                                            className="h-8 text-xs"
                                          />
                                        </div>

                                        <Button
                                          type="button"
                                          onClick={handleCreateLead}
                                          className="w-full h-8 bg-blue-600 hover:bg-blue-700 text-white text-xs"
                                        >
                                          <Check className="h-3 w-3 mr-1" />
                                          สร้างลีดและใช้งาน
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ) : null}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2: รายละเอียดโครงการ */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 relative z-10">
                    <div className="h-8 w-8 rounded-full bg-white border-2 border-orange-500 text-orange-500 flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                  </div>
                  <div className="flex-1 pb-2">
                    <h3 className="font-bold text-gray-900 mb-2 text-sm">รายละเอียดโครงการ</h3>
                    <div className="grid grid-cols-2 gap-2.5">
                      {/* ประเภทสินค้า */}
                      <div>
                        <Label className="text-xs text-gray-700 mb-1.5 block">
                          ประเภทสินค้า
                        </Label>
                        <Combobox
                          options={QUICK_COMMODITIES.map((commodity) => ({ value: commodity, label: commodity }))}
                          value={formData.commodityType}
                          onValueChange={(val) => handleInputChange("commodityType", val)}
                          placeholder="ประเภทสินค้า"
                          searchPlaceholder="ค้นหาประเภทสินค้า..."
                          className="h-9 text-sm"
                        />
                      </div>

                      {/* อุตสาหกรรม */}
                      <div>
                        <Label className="text-xs text-gray-700 mb-1.5 block">
                          อุตสาหกรรม
                        </Label>
                        <Combobox
                          options={QUICK_INDUSTRIES.map((industry) => ({ value: industry, label: industry }))}
                          value={formData.industry}
                          onValueChange={(val) => handleInputChange("industry", val)}
                          placeholder="อุตสาหกรรม"
                          searchPlaceholder="ค้นหาอุตสาหกรรม..."
                          className="h-9 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3: บริการและผลิตภัณฑ์ */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 relative z-10">
                    <div className="h-8 w-8 rounded-full bg-white border-2 border-[#7BC9A6] text-[#7BC9A6] flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                  </div>
                  <div className="flex-1 pb-2">
                    <h3 className="font-bold text-gray-900 mb-2 text-sm">บริการและผลิตภัณฑ์</h3>
                    
                    {/* เลือกบริการ */}
                    <div className="mb-3">
                      <Label className="text-xs text-gray-700 mb-1.5 flex items-center gap-1 block">
                        <span className="text-red-500">* </span>เลือกบริการ
                      </Label>
                      <div className="flex flex-wrap gap-1.5">
                        {QUICK_SERVICES.map((service) => (
                          <button
                            key={service}
                            type="button"
                            onClick={() => toggleService(service)}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                              selectedServices.includes(service)
                                ? "bg-[#7BC9A6] text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {service}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* รายละเอียดบริการ */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-xs text-gray-700">
                          รายละเอียดบริการ (ไม่บังคับ)
                        </Label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={addServiceItem}
                          className="h-7 text-xs text-[#7BC9A6] hover:text-[#6AB896] hover:bg-green-50 px-2"
                        >
                          <Plus className="h-3.5 w-3.5 mr-1" />
                          เพิ่มรายการ
                        </Button>
                      </div>
                      
                      {serviceItems.length > 0 && (
                        <div className="border border-gray-200 rounded-md overflow-hidden">
                          {/* Table Header */}
                          <div className="bg-gray-50 border-b border-gray-200 grid grid-cols-12 gap-2 px-3 py-2 text-xs font-semibold text-gray-700">
                            <div className="col-span-5">ชื่อบริการ</div>
                            <div className="col-span-2">จำนวน</div>
                            <div className="col-span-3">ราคา/หน่วย</div>
                            <div className="col-span-2 text-right">รวม</div>
                          </div>
                          
                          {/* Table Body */}
                          <div className="divide-y divide-gray-200">
                            {serviceItems.map((item, index) => (
                              <div key={item.id} className="grid grid-cols-12 gap-2 px-3 py-2 items-center hover:bg-gray-50">
                                <div className="col-span-5">
                                  <Input
                                    value={item.service}
                                    onChange={(e) => updateServiceItem(item.id, "service", e.target.value)}
                                    placeholder="ชื่อบริการ"
                                    className="h-8 text-xs border-gray-200"
                                  />
                                </div>
                                <div className="col-span-2">
                                  <Input
                                    value={item.quantity}
                                    onChange={(e) => updateServiceItem(item.id, "quantity", e.target.value)}
                                    placeholder="0"
                                    className="h-8 text-xs border-gray-200"
                                  />
                                </div>
                                <div className="col-span-3">
                                  <Input
                                    type="number"
                                    value={item.unitPrice}
                                    onChange={(e) => updateServiceItem(item.id, "unitPrice", e.target.value)}
                                    placeholder="0.00"
                                    className="h-8 text-xs border-gray-200"
                                  />
                                </div>
                                <div className="col-span-2 flex items-center justify-end gap-2">
                                  <span className="text-xs font-medium text-gray-700">
                                    {calculateServiceTotal(item)}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => removeServiceItem(item.id)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          {/* Total */}
                          <div className="bg-green-50 border-t border-gray-200 px-3 py-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-gray-900">มูลค่ารวมทั้งหมด:</span>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">{formData.currency}</span>
                                <span className="font-bold text-[#7BC9A6]">
                                  {calculateTotalValue()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Step 4: ข้อมูลดีลและเจ้าของ */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 relative z-10">
                    <div className="h-8 w-8 rounded-full bg-white border-2 border-blue-500 text-blue-500 flex items-center justify-center font-bold text-sm">
                      4
                    </div>
                  </div>
                  <div className="flex-1 pb-2">
                    <h3 className="font-bold text-gray-900 mb-2 text-sm">ข้อมูลดีลและเจ้าของ</h3>
                    <div className="grid grid-cols-2 gap-2.5">
                      {/* วันที่คาดว่าจะปิดดีล */}
                      <div>
                        <Label className="text-xs text-gray-700 mb-1.5 block">
                          วันที่คาดว่าจะปิดดีล
                        </Label>
                        <Input
                          type="date"
                          value={formData.expectedCloseDate}
                          onChange={(e) => handleInputChange("expectedCloseDate", e.target.value)}
                          className="h-9 text-sm"
                        />
                      </div>

                      {/* วันเริ่มต้นโปรเจค */}
                      <div>
                        <Label className="text-xs text-gray-700 mb-1.5 block">
                          วันเริ่มต้นโปรเจค
                        </Label>
                        <Input
                          type="date"
                          value={formData.projectStartDate}
                          onChange={(e) => handleInputChange("projectStartDate", e.target.value)}
                          className="h-9 text-sm"
                        />
                      </div>

                      {/* ความน่าจะเป็นในการปิดดีล */}
                      <div>
                        <Label className="text-xs text-gray-700 mb-1.5 block">
                          ความน่าจะเป็นในการปิดดีล
                        </Label>
                        <Combobox
                          options={PROBABILITY_OPTIONS.map((opt) => ({ value: opt.value, label: opt.label }))}
                          value={formData.probability}
                          onValueChange={(val) => handleInputChange("probability", val)}
                          placeholder="เลือกความน่าจะเป็น..."
                          searchPlaceholder="ค้นหาความน่าจะเป็น..."
                          className="h-9 text-sm"
                        />
                      </div>

                      {/* สถานะดีล */}
                      <div>
                        <Label className="text-xs text-gray-700 mb-1.5 block">
                          สถานะดีล
                        </Label>
                        <Combobox
                          options={PROJECT_STATUSES.map((status) => ({ value: status, label: status }))}
                          value={formData.projectStatus}
                          onValueChange={(val) => handleInputChange("projectStatus", val)}
                          placeholder="เลือกสถานะดีล..."
                          searchPlaceholder="ค้นหาสถานะดีล..."
                          className="h-9 text-sm"
                        />
                      </div>

                      {/* เจ้าของดีล */}
                      <div className="col-span-2">
                        <Label className="text-xs text-gray-700 mb-1.5 block">
                          เจ้าของดีล
                        </Label>
                        <Input
                          value={formData.owner}
                          className="h-9 text-sm bg-gray-50"
                          disabled
                        />
                      </div>
                      
                      {/* Enter หมายเหตุ */}
                      <div className="col-span-2">
                        <Label className="text-xs text-gray-700 mb-1.5 block">
                          Enter หมายเหตุ
                        </Label>
                        <Input
                          value={formData.remarks}
                          onChange={(e) => handleInputChange("remarks", e.target.value)}
                          placeholder="หมายเหตุ"
                          className="h-9 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* File Attachments Section */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Paperclip className="h-3.5 w-3.5 text-gray-500" />
                      <h4 className="text-xs font-semibold text-gray-900">เอกสารแนบ (ไม่บังคับ)</h4>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="h-7 text-xs"
                    >
                      <Upload className="h-3 w-3 mr-1" />
                      เลือกไฟล์
                    </Button>
                  </div>

                  {/* Hidden File Input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  {/* Attached Files List */}
                  {attachedFiles.length > 0 && (
                    <div className="space-y-1.5">
                      {attachedFiles.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between px-2.5 py-1.5 bg-gray-50 rounded border border-gray-200 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            {getFileIcon(file.type)}
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-gray-900 truncate">
                                {file.name}
                              </p>
                              <p className="text-[10px] text-gray-500">
                                {formatFileSize(file.size)}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(file.id)}
                            className="text-red-500 hover:text-red-700 flex-shrink-0 ml-2"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t bg-white px-4 md:px-6 py-3 md:py-3 flex items-center justify-end gap-2.5 md:gap-2 flex-shrink-0">
            <Button
              variant="outline"
              onClick={handleClose}
              className="h-11 md:h-9 px-6 md:px-4 text-base md:text-sm"
            >
              ยกเลิก
            </Button>
            <Button
              onClick={handleSave}
              disabled={!formData.dealName || !formData.customerName || selectedServices.length === 0}
              className="h-11 md:h-9 px-8 md:px-6 bg-[#7BC9A6] hover:bg-[#6AB896] text-white text-base md:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              สร้างดีล
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Duplicate Deal Warning Dialog */}
      <DuplicateDealWarningDialog
        open={showDuplicateWarning}
        duplicateDeals={duplicateDeals}
        newDealData={{
          customerName: formData.customerName,
          services: selectedServices,
        }}
        onCancel={handleCancelDuplicate}
        onContinue={handleContinueWithDuplicate}
      />
    </>
  );
}