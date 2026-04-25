import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Building2,
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
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface AddCustomerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
  mode?: "customer" | "lead";
}

type DataSource = "manual" | "dbd";

interface ContactPerson {
  id: string;
  name: string;
  position: string;
  phone: string;
  email: string;
  line: string;
  facebook: string;
  instagram: string;
  whatsapp: string;
  isPrimary: boolean;
}

interface CustomerData {
  // Basic Info
  companyName: string;
  taxId: string;
  registrationNumber: string;
  
  // Business Info
  businessType: string;
  industry: string;
  capital: string;
  establishedDate: string;
  
  // Address
  address: string;
  province: string;
  district: string;
  postalCode: string;
  
  // Contact Persons (Multiple)
  contacts: ContactPerson[];
  
  // Additional
  website: string;
  notes: string;
}

export function AddCustomerDialog({ isOpen, onClose, onSave, mode = "customer" }: AddCustomerDialogProps) {
  const { t } = useTranslation();
  const [dataSource, setDataSource] = useState<DataSource | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  // Tax ID Validation States
  const [taxIdExists, setTaxIdExists] = useState(false);
  const [existingCustomerData, setExistingCustomerData] = useState<any>(null);
  const [isCheckingTaxId, setIsCheckingTaxId] = useState(false);

  // DBD Search States
  const [dbdSearchResults, setDbdSearchResults] = useState<any[]>([]);
  const [showDbdResults, setShowDbdResults] = useState(false);
  const [searchType, setSearchType] = useState<'taxId' | 'companyName'>('taxId');

  const [formData, setFormData] = useState<CustomerData>({
    companyName: "",
    taxId: "",
    registrationNumber: "",
    businessType: "",
    industry: "",
    capital: "",
    establishedDate: "",
    address: "",
    province: "",
    district: "",
    postalCode: "",
    contacts: [
      {
        id: "1",
        name: "",
        position: "",
        phone: "",
        email: "",
        line: "",
        facebook: "",
        instagram: "",
        whatsapp: "",
        isPrimary: true,
      },
    ],
    website: "",
    notes: "",
  });

  const handleDataSourceSelect = (source: DataSource) => {
    setDataSource(source);
    setHasError(false);
    setErrorMessage("");
    setSearchValue("");
    setDbdSearchResults([]);
    setShowDbdResults(false);
  };

  // Mock DBD Database
  const mockDbdDatabase = [
    {
      companyName: "บริษัท ตนยนต์ อุตสาหกรรม จำกัด",
      companyNameEn: "Ton Yon Industries Co., Ltd.",
      taxId: "0105557000000",
      registrationNumber: "0105557000000",
      businessType: "Manufacturing",
      industry: "Automotive",
      capital: "75,000,000",
      establishedDate: "2012-08-10",
      address: "55 ถนนรามคำแหง แขวงหัวหมาก",
      province: "กรุงเทพมหานคร",
      district: "บางกะปิ",
      postalCode: "10240",
    },
    {
      companyName: "บริษัท โกลบอล โลจิสติกส์ โซลูชั่น จำกัด",
      companyNameEn: "Global Logistics Solution Co., Ltd.",
      taxId: "0105558000001",
      registrationNumber: "0105558000001",
      businessType: "Logistics & Supply Chain",
      industry: "Transportation & Warehousing",
      capital: "50,000,000",
      establishedDate: "2015-05-20",
      address: "123 ถนนสุขุมวิท แขวงคลองเตย",
      province: "กรุงเทพมหานคร",
      district: "คลองเตย",
      postalCode: "10110",
    },
    {
      companyName: "บริษัท แปซิฟิค ดิสทริบิวชั่น จำกัด",
      companyNameEn: "Pacific Distribution Co., Ltd.",
      taxId: "0105559000002",
      registrationNumber: "0105559000002",
      businessType: "Trading & Distribution",
      industry: "Wholesale",
      capital: "30,000,000",
      establishedDate: "2018-03-15",
      address: "456 ถนนพระราม 9 แขวงห้วยขวาง",
      province: "กรุงเทพมหานคร",
      district: "ห้วยขวาง",
      postalCode: "10310",
    },
    {
      companyName: "บริษัท ไทยออโต้พาร์ท จำกัด",
      companyNameEn: "Thai Auto Parts Co., Ltd.",
      taxId: "0105560000003",
      registrationNumber: "0105560000003",
      businessType: "Manufacturing",
      industry: "Automotive Parts",
      capital: "100,000,000",
      establishedDate: "2010-07-22",
      address: "789 นิคมอุตสาหกรรมบางปู",
      province: "สมุทรปราการ",
      district: "บางปู",
      postalCode: "10280",
    },
    {
      companyName: "บริษัท เอสซีจี แพคเกจจิ้ง จำกัด (มหาชน)",
      companyNameEn: "SCG Packaging Public Company Limited",
      taxId: "0107537000352",
      registrationNumber: "0107537000352",
      businessType: "Manufacturing",
      industry: "Packaging",
      capital: "8,483,366,000",
      establishedDate: "1991-08-15",
      address: "1 ถนนสยามพัฒนา แขวงบางซื่อ",
      province: "กรุงเทพมหานคร",
      district: "บางซื่อ",
      postalCode: "10800",
    },
    {
      companyName: "บริษัท ซีพี ออลล์ จำกัด (มหาชน)",
      companyNameEn: "CP ALL Public Company Limited",
      taxId: "0105536001583",
      registrationNumber: "0105536001583",
      businessType: "Retail",
      industry: "Convenience Store",
      capital: "3,882,000,000",
      establishedDate: "1988-10-18",
      address: "313 ซีพี ทาวเวอร์ ถนนสีลม",
      province: "กรุงเทพมหานคร",
      district: "บางรัก",
      postalCode: "10500",
    },
    {
      companyName: "องค์การเภสัชกรรม",
      companyNameEn: "Government Pharmaceutical Organization",
      taxId: "0994000165891",
      registrationNumber: "0994000165891",
      businessType: "Government Enterprise",
      industry: "Pharmaceutical",
      capital: "500,000,000",
      establishedDate: "1966-01-01",
      address: "75/1 ถนนพระรามที่ 6 แขวงทุ่งพญาไท",
      province: "กรุงเทพมหานคร",
      district: "ราชเทวี",
      postalCode: "10400",
    },
    {
      companyName: "บริษัท ไทยเบฟเวอเรจ จำกัด (มหาชน)",
      companyNameEn: "Thai Beverage Public Company Limited",
      taxId: "0107538000746",
      registrationNumber: "0107538000746",
      businessType: "Manufacturing",
      industry: "Beverage",
      capital: "25,353,838,982",
      establishedDate: "2003-09-05",
      address: "62 ถนนรัชดาภิเษก แขวงคลองเตย",
      province: "กรุงเทพมหานคร",
      district: "คลองเตย",
      postalCode: "10110",
    },
    {
      companyName: "บริษัท เซ็นทรัล รีเทล คอร์ปอเรชั่น จำกัด (มหาชน)",
      companyNameEn: "Central Retail Corporation Public Company Limited",
      taxId: "0107536000415",
      registrationNumber: "0107536000415",
      businessType: "Retail",
      industry: "Department Store",
      capital: "4,500,000,000",
      establishedDate: "1995-03-15",
      address: "4, 4/1-4/2 ถนนราชดำริ แขวงลุมพินี",
      province: "กรุงเทพมหานคร",
      district: "ปทุมวัน",
      postalCode: "10330",
    },
    {
      companyName: "บริษัท ปูนซีเมนต์ไทย จำกัด (มหาชน)",
      companyNameEn: "Siam Cement Public Company Limited",
      taxId: "0107536000962",
      registrationNumber: "0107536000962",
      businessType: "Manufacturing",
      industry: "Construction Materials",
      capital: "12,000,000,000",
      establishedDate: "1913-11-26",
      address: "1 ถนนสยามพัฒนา แขวงบางซื่อ",
      province: "กรุงเทพมหานคร",
      district: "บางซื่อ",
      postalCode: "10800",
    },
  ];

  // Search DBD Database
  const handleSearchDbdDatabase = (query: string) => {
    if (!query || query.length < 2) {
      setDbdSearchResults([]);
      setShowDbdResults(false);
      return;
    }

    const searchLower = query.toLowerCase();
    const results = mockDbdDatabase.filter((company) => {
      if (company.taxId.includes(query)) return true;
      if (company.companyName.toLowerCase().includes(searchLower)) return true;
      if (company.companyNameEn.toLowerCase().includes(searchLower)) return true;
      return false;
    });

    setDbdSearchResults(results.slice(0, 5)); // Limit to 5 results
    setShowDbdResults(true); // เปิด dropdown เสมอเมื่อพิมพ์ครบ 2 ตัวอักษร
  };

  // Select company from search results
  const handleSelectDbdCompany = (company: any) => {
    const filledData = {
      companyName: company.companyName,
      taxId: company.taxId,
      registrationNumber: company.registrationNumber,
      businessType: company.businessType,
      industry: company.industry,
      capital: company.capital,
      establishedDate: company.establishedDate,
      address: company.address,
      province: company.province,
      district: company.district,
      postalCode: company.postalCode,
      contacts: [
        {
          id: "1",
          name: "",
          position: "",
          phone: "",
          email: "",
          line: "",
          facebook: "",
          instagram: "",
          whatsapp: "",
          isPrimary: true,
        },
      ],
      website: "",
      notes: "",
    };

    setFormData(filledData);
    setSearchValue("");
    setShowDbdResults(false);
    setDbdSearchResults([]);
    toast.success(`ดึงข้อมูล "${company.companyName}" สำเร็จ`);
  };

  const handleFetchData = async () => {
    if (!searchValue.trim()) {
      toast.error("กรุณากรอกข้อมูล");
      return;
    }

    setIsLoading(true);
    setHasError(false);
    setErrorMessage("");

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (searchValue.toLowerCase().includes("error") || searchValue.includes("9999")) {
        throw new Error("Data not found");
      }

      if (dataSource === "dbd") {
        const mockDbdData = {
          companyName: "บริษัท โกลบอล โลจิสติกส์ โซลูชั่น จำกัด",
          taxId: searchValue,
          registrationNumber: "0105558000001",
          businessType: "Logistics & Supply Chain",
          industry: "Transportation & Warehousing",
          capital: "50,000,000",
          establishedDate: "2015-05-20",
          address: "123 ถนนสุขุมวิท แขวงคลองเตย",
          province: "กรุงเทพมหานคร",
          district: "คลองเตย",
          postalCode: "10110",
          contacts: [
            {
              id: "1",
              name: "คุณสมชาย ใจดี",
              position: "ผู้อำนวยการ",
              phone: "+66-2-123-4567",
              email: "contact@globallogistics.co.th",
              line: "",
              facebook: "",
              instagram: "",
              whatsapp: "",
              isPrimary: true,
            },
          ],
          website: "www.globallogistics.co.th",
          notes: "",
        };
        
        setFormData(mockDbdData);
        toast.success("ดึงข้อมูลจาก DBD สำเร็จ");
      }
    } catch (error) {
      setHasError(true);
      setErrorMessage("ไม่พบข้อมูลในระบบ DBD หรือเลขประจำตัวผู้เสียภาษีไม่ถูกต้อง");
      toast.error("ไม่พบข้อมูลในระบบ DBD");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.companyName.trim() || !formData.taxId.trim()) {
      toast.error("กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน");
      return;
    }

    // ✅ Check Tax ID before saving
    setIsCheckingTaxId(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mock existing customers database
      const existingCustomers = [
        {
          id: "CUST-001",
          companyName: "บริษัท โกลบอล โลจิสติกส์ โซลูชั่น จำกัด",
          taxId: "0105558000001",
          phone: "+66-2-123-4567",
          email: "contact@globallogistics.co.th",
        },
        {
          id: "CUST-002",
          companyName: "บริษัท แปซิฟิค ดิสทริบิวชั่น จำกัด",
          taxId: "0105559000002",
          phone: "+66-2-987-6543",
          email: "info@pacificdist.co.th",
        },
      ];

      // Check if Tax ID exists
      const existingCustomer = existingCustomers.find(
        (customer) => customer.taxId === formData.taxId
      );

      if (existingCustomer) {
        // ❌ Tax ID already exists - Show warning
        setTaxIdExists(true);
        setExistingCustomerData(existingCustomer);
        setIsCheckingTaxId(false);
        
        toast.error("⚠️ มีข้อมูลลูกค้าอยู่แล้วในระบบ", {
          description: `${existingCustomer.companyName} (${existingCustomer.id})`,
          duration: 5000,
        });
        
        // Scroll to Tax ID field
        document.getElementById("taxId")?.scrollIntoView({ behavior: "smooth", block: "center" });
        return; // Stop submission
      }

      // ✅ Tax ID is unique - Continue saving
      setIsCheckingTaxId(false);
      setIsLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSave?.(formData);
      toast.success("บันทึกสำเร็จ!");
      handleClose();
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      setIsCheckingTaxId(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setDataSource(null);
    setSearchValue("");
    setHasError(false);
    setErrorMessage("");
    setTaxIdExists(false);
    setExistingCustomerData(null);
    setFormData({
      companyName: "",
      taxId: "",
      registrationNumber: "",
      businessType: "",
      industry: "",
      capital: "",
      establishedDate: "",
      address: "",
      province: "",
      district: "",
      postalCode: "",
      contacts: [
        {
          id: "1",
          name: "",
          position: "",
          phone: "",
          email: "",
          line: "",
          facebook: "",
          instagram: "",
          whatsapp: "",
          isPrimary: true,
        },
      ],
      website: "",
      notes: "",
    });
    onClose();
  };

  // Handle opening existing customer profile
  const handleOpenExistingCustomer = () => {
    if (existingCustomerData) {
      // TODO: Navigate to customer profile page
      console.log("Opening customer profile:", existingCustomerData.id);
      toast.info(`เปิดโปรไฟล์ลูกค้า: ${existingCustomerData.companyName}`);
      handleClose();
    }
  };

  // Contact Management Functions
  const addContact = () => {
    const newContact: ContactPerson = {
      id: Date.now().toString(),
      name: "",
      position: "",
      phone: "",
      email: "",
      line: "",
      facebook: "",
      instagram: "",
      whatsapp: "",
      isPrimary: false,
    };
    setFormData({
      ...formData,
      contacts: [...formData.contacts, newContact],
    });
  };

  const removeContact = (id: string) => {
    if (formData.contacts.length === 1) {
      toast.error("ต้องมีผู้ติดต่ออย่างน้อย 1 คน");
      return;
    }
    setFormData({
      ...formData,
      contacts: formData.contacts.filter((contact) => contact.id !== id),
    });
    toast.success("ลบผู้ติดต่อสำเร็จ");
  };

  const updateContact = (id: string, field: keyof ContactPerson, value: string | boolean) => {
    setFormData({
      ...formData,
      contacts: formData.contacts.map((contact) =>
        contact.id === id ? { ...contact, [field]: value } : contact
      ),
    });
  };

  const setPrimaryContact = (id: string) => {
    setFormData({
      ...formData,
      contacts: formData.contacts.map((contact) => ({
        ...contact,
        isPrimary: contact.id === id,
      })),
    });
  };

  // Save individual sections
  const saveBasicInfo = async () => {
    if (!formData.companyName.trim() || !formData.taxId.trim()) {
      toast.error("กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน");
      return;
    }

    // Check Tax ID
    setIsCheckingTaxId(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const existingCustomers = [
        { id: "CUST-001", companyName: "บริษัท โกลบอล โลจิสติกส์ โซลูชั่น จำกัด", taxId: "0105558000001" },
        { id: "CUST-002", companyName: "บริษัท แปซิฟิค ดิสทริบิวชั่น จำกัด", taxId: "0105559000002" },
      ];

      const existingCustomer = existingCustomers.find((c) => c.taxId === formData.taxId);
      if (existingCustomer) {
        setTaxIdExists(true);
        setExistingCustomerData(existingCustomer);
        toast.error("⚠️ มีข้อมูลลูกค้าอยู่แล้วในระบบ");
        setIsCheckingTaxId(false);
        return;
      }

      setIsCheckingTaxId(false);
      toast.success("บันทึกข้อมูลพื้นฐานสำเร็จ");
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด");
      setIsCheckingTaxId(false);
    }
  };

  const saveBusinessInfo = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success("บันทึกข้อมูลธุรกิจสำเร็จ");
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด");
    }
  };

  const saveAddressInfo = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success("บันทึกที่อยู่สำเร็จ");
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด");
    }
  };

  const saveAdditionalInfo = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success("บันทึกข้อมูลเพิ่มเติมสำเร็จ");
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด");
    }
  };

  const saveAllAndClose = async () => {
    if (!formData.companyName.trim() || !formData.taxId.trim()) {
      toast.error("กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน");
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSave?.(formData);
      toast.success(mode === "lead" ? "บันทึก Lead สำเร็จ!" : "บันทึกลูกค้าสำเร็จ!");
      handleClose();
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการบันทึก");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader className="border-b border-gray-200 pb-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Building2 className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <DialogTitle className="text-base font-semibold text-gray-900">
                {mode === "lead" ? "เพิ่ม Lead" : "เพิ่มลูกค้า"}
              </DialogTitle>
              <DialogDescription className="text-[10px] text-gray-500 mt-0.5">
                {mode === "lead" ? "เพิ่มข้อมูล Lead ใหม่ในระบบ CRM" : "เพิ่มข้อมูลใหม่ในระบบ CRM"}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 p-[12px]">
          {/* Data Source Tabs */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">
              {mode === "lead" ? "ช่องทางข้อมูล Lead" : "ช่องทางข้อมูลลูกค้า"} <span className="text-red-500">*</span>
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
                {dataSource === "dbd" && (
                  <div className="absolute top-3 right-3">
                    <div className="h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-3.5 w-3.5 text-white" />
                    </div>
                  </div>
                )}
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center transition-colors ${
                    dataSource === "dbd" ? "bg-blue-500" : "bg-gray-100"
                  }`}>
                    <Database className={`h-6 w-6 ${
                      dataSource === "dbd" ? "text-white" : "text-gray-600"
                    }`} />
                  </div>
                  <div>
                    <h4 className={`font-semibold text-sm mb-1 ${
                      dataSource === "dbd" ? "text-blue-900" : "text-gray-900"
                    }`}>
                      ข้อมูลสำเร็จรูป
                    </h4>
                    <p className="text-xs text-gray-500">
                      ดึงข้อมูลจากระบบ DBD
                    </p>
                  </div>
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
                {dataSource === "manual" && (
                  <div className="absolute top-3 right-3">
                    <div className="h-5 w-5 bg-emerald-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-3.5 w-3.5 text-white" />
                    </div>
                  </div>
                )}
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center transition-colors ${
                    dataSource === "manual" ? "bg-emerald-500" : "bg-gray-100"
                  }`}>
                    <FileText className={`h-6 w-6 ${
                      dataSource === "manual" ? "text-white" : "text-gray-600"
                    }`} />
                  </div>
                  <div>
                    <h4 className={`font-semibold text-sm mb-1 ${
                      dataSource === "manual" ? "text-emerald-900" : "text-gray-900"
                    }`}>
                      กรอกข้อมูลเอง
                    </h4>
                    <p className="text-xs text-gray-500">
                      กรอกข้อมูลด้วยตัวเอง
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Data Fetch Section (DBD/SAP) */}
          {dataSource && dataSource !== "manual" && !formData.companyName && (
            <div className="space-y-3">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-200">
                <div className="space-y-3">
                  <div className="relative">
                    <Label htmlFor="searchValue" className="text-gray-900 text-xs font-medium">
                      ข้อมูลสำหรับค้นหาลูกค้า <span className="text-red-500">*</span>
                    </Label>
                    <div className="mt-1.5">
                      <Input
                        id="searchValue"
                        type="text"
                        placeholder="พิมพ์เลขทะเบียน 13 หลัก หรือ ชื่อบริษัท..."
                        value={searchValue}
                        onChange={(e) => {
                          setSearchValue(e.target.value);
                          handleSearchDbdDatabase(e.target.value);
                        }}
                        onFocus={() => {
                          if (searchValue.length >= 2) {
                            handleSearchDbdDatabase(searchValue);
                          }
                        }}
                        className="w-full border-gray-300 focus:border-blue-500 h-8 bg-white text-xs pr-10"
                        disabled={isLoading}
                        autoComplete="off"
                      />
                      {searchValue && (
                        <button
                          type="button"
                          onClick={() => {
                            setSearchValue("");
                            setShowDbdResults(false);
                            setDbdSearchResults([]);
                          }}
                          className="absolute right-2 top-9 text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <p className="text-[10px] text-gray-600 mt-1.5">
                      💡 ค้นหาได้ทั้ง <strong>เลขทะเบียนนิติบุคคล</strong> หรือ <strong>ชื่อบริษัท</strong> (ภาษาไทยหรืออังกฤษ)
                    </p>

                    {/* Search Results Dropdown */}
                    {showDbdResults && dbdSearchResults.length > 0 && (
                      <div className="absolute z-10 mt-1 w-full bg-white border-2 border-blue-300 rounded-lg shadow-xl max-h-64 overflow-y-auto">
                        <div className="p-2 bg-blue-50 border-b border-blue-200">
                          <p className="text-[10px] font-semibold text-blue-900">
                            🔍 พบ {dbdSearchResults.length} รายการ
                          </p>
                        </div>
                        <div className="divide-y divide-gray-100">
                          {dbdSearchResults.map((company, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => handleSelectDbdCompany(company)}
                              className="w-full p-3 hover:bg-blue-50 text-left transition-colors"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-semibold text-gray-900 line-clamp-1">
                                    {company.companyName}
                                  </p>
                                  <p className="text-[10px] text-gray-500 mt-0.5">
                                    {company.companyNameEn}
                                  </p>
                                  <div className="flex items-center gap-2 mt-1.5">
                                    <span className="text-[10px] text-blue-600 font-mono bg-blue-100 px-1.5 py-0.5 rounded">
                                      {company.taxId}
                                    </span>
                                    <span className="text-[10px] text-gray-600">
                                      {company.industry}
                                    </span>
                                  </div>
                                </div>
                                <Building2 className="h-4 w-4 text-blue-500 flex-shrink-0" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* No Results */}
                    {showDbdResults && dbdSearchResults.length === 0 && searchValue.length >= 2 && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg p-3">
                        <div className="flex items-center gap-2 text-gray-500">
                          <AlertCircle className="h-4 w-4" />
                          <p className="text-xs">ไม่พบข้อมูลที่ตรงกับ "{searchValue}"</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {hasError && (
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-red-50 border-2 border-red-200 rounded-xl">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                            <AlertCircle className="h-5 w-5 text-red-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xs font-semibold text-red-900 mb-1">
                            ไม่พบข้อมูล
                          </h4>
                          <p className="text-[10px] text-red-700 mb-3">
                            {errorMessage}
                          </p>
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              onClick={handleFetchData}
                              size="sm"
                              className="bg-red-600 hover:bg-red-700 text-white h-7 px-3 text-[10px]"
                            >
                              <Database className="h-3 w-3 mr-1" />
                              ลองอีกครั้ง
                            </Button>
                            <Button
                              type="button"
                              onClick={() => handleDataSourceSelect("manual")}
                              size="sm"
                              variant="outline"
                              className="border-red-300 text-red-700 hover:bg-red-50 h-7 px-3 text-[10px]"
                            >
                              <FileText className="h-3 w-3 mr-1" />
                              กรอกข้อมูลเอง
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <h5 className="text-xs font-medium text-amber-900 mb-1.5">
                              แนะนำ
                            </h5>
                            <ul className="text-[10px] text-amber-800 space-y-0.5 list-disc list-inside">
                              <li>ตรวจสอบรูปแบบข้อมูลให้ถูกต้อง</li>
                              <li>ตรวจสอบว่าข้อมูลมีอยู่ในระบบ</li>
                              <li>ติดต่อฝ่ายสนับสนุนหากปัญหายังคงอยู่</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Customer Form */}
          {(dataSource === "manual" || formData.companyName) && (
            <div className="space-y-4">
              {/* Header with source badge */}
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-semibold text-gray-900 uppercase tracking-wide">
                  ข้อมูลลูกค้า
                </h3>
                <div className="flex items-center gap-2">
                  {formData.companyName && dataSource !== "manual" && (
                    <div className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-medium">
                      <CheckCircle className="h-2.5 w-2.5 inline mr-1" />
                      DBD Auto-filled
                    </div>
                  )}
                </div>
              </div>

              {/* Basic Information */}
              <div className="space-y-3 p-3 rounded-xl border bg-gray-50/50">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-emerald-600" />
                    ข้อมูลพื้นฐาน
                    {dataSource === "dbd" && formData.companyName && (
                      <span className="text-[9px] text-blue-600 font-normal normal-case ml-2">
                        ข้อมูลจาก DBD (แก้ไขไม่ได้)
                      </span>
                    )}
                  </h4>
                  {dataSource === "manual" && (
                    <Button
                      type="button"
                      onClick={saveBasicInfo}
                      size="sm"
                      className="h-6 px-3 text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white"
                      disabled={isCheckingTaxId}
                    >
                      {isCheckingTaxId ? (
                        <>
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                          ตรวจสอบ...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          บันทึก
                        </>
                      )}
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <Label htmlFor="companyName" className="text-gray-900 text-xs font-medium">
                      ชื่อบริษัท <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="companyName"
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="mt-1.5 border-gray-300 focus:border-emerald-500 h-8 text-xs disabled:bg-gray-50 disabled:text-gray-600 disabled:cursor-not-allowed"
                      required
                      disabled={dataSource === "dbd" && formData.companyName !== ""}
                    />
                  </div>

                  <div className="col-span-2">
                    <Label htmlFor="taxId" className="text-gray-900 text-xs font-medium">
                      เลขประจำตัวผู้เสียภาษี <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="taxId"
                      type="text"
                      value={formData.taxId}
                      onChange={(e) => {
                        setFormData({ ...formData, taxId: e.target.value });
                        // Clear validation when user types
                        setTaxIdExists(false);
                        setExistingCustomerData(null);
                      }}
                      className={`mt-1.5 h-8 text-xs disabled:bg-gray-50 disabled:text-gray-600 disabled:cursor-not-allowed ${
                        taxIdExists 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 focus:border-emerald-500'
                      }`}
                      required
                      maxLength={13}
                      placeholder="0105558000001"
                      disabled={dataSource === "dbd" && formData.companyName !== ""}
                    />
                    
                    {/* Loading State */}
                    {isCheckingTaxId && (
                      <div className="mt-2 flex items-center gap-2 text-blue-600">
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span className="text-xs font-medium">กำลังตรวจสอบเลขประจำตัวผู้เสียภาษี...</span>
                      </div>
                    )}
                    
                    {/* Warning - Tax ID Already Exists */}
                    {taxIdExists && existingCustomerData && (
                      <div className="mt-2 p-3 bg-red-50 border-2 border-red-200 rounded-xl">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                              <AlertCircle className="h-4 w-4 text-red-600" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xs font-bold text-red-900 mb-1">
                              ⚠️ มีข้อมูลลูกค้าอยู่แล้วในระบบ
                            </h4>
                            <div className="space-y-1 mb-2">
                              <p className="text-xs text-red-800">
                                <span className="font-semibold">ชื่อบริษัท:</span> {existingCustomerData.companyName}
                              </p>
                              <p className="text-xs text-red-800">
                                <span className="font-semibold">รหัสลูกค้า:</span> {existingCustomerData.id}
                              </p>
                              <p className="text-xs text-red-800">
                                <span className="font-semibold">เบอร์โทร:</span> {existingCustomerData.phone}
                              </p>
                            </div>
                            <Button
                              type="button"
                              onClick={handleOpenExistingCustomer}
                              size="sm"
                              className="bg-red-600 hover:bg-red-700 text-white h-7 px-3 text-xs"
                            >
                              <User className="h-3 w-3 mr-1" />
                              เปิดโปรไฟล์ลูกค้า
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="col-span-2">
                    <Label htmlFor="registrationNumber" className="text-gray-900 text-xs font-medium">
                      เลขะเบียนนิติบุคคล
                    </Label>
                    <Input
                      id="registrationNumber"
                      type="text"
                      value={formData.registrationNumber}
                      onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                      className="mt-1.5 border-gray-300 focus:border-emerald-500 h-8 text-xs disabled:bg-gray-50 disabled:text-gray-600 disabled:cursor-not-allowed"
                      disabled={dataSource === "dbd" && formData.companyName !== ""}
                    />
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5 text-blue-600" />
                  ข้อมูลธุรกิจ
                  {dataSource === "dbd" && formData.companyName && (
                    <span className="text-[9px] text-blue-600 font-normal normal-case ml-auto">
                      ข้อมูลจาก DBD (แก้ไขไม่ได้)
                    </span>
                  )}
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="businessType" className="text-gray-900 text-xs font-medium">
                      ประเภทธุรกิจ
                    </Label>
                    <Input
                      id="businessType"
                      type="text"
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      className="mt-1.5 border-gray-300 focus:border-emerald-500 h-8 text-xs disabled:bg-gray-50 disabled:text-gray-600 disabled:cursor-not-allowed"
                      disabled={dataSource === "dbd" && formData.companyName !== ""}
                    />
                  </div>

                  <div>
                    <Label htmlFor="industry" className="text-gray-900 text-xs font-medium">
                      อุตสาหกรรม
                    </Label>
                    <Input
                      id="industry"
                      type="text"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="mt-1.5 border-gray-300 focus:border-emerald-500 h-8 text-xs disabled:bg-gray-50 disabled:text-gray-600 disabled:cursor-not-allowed"
                      disabled={dataSource === "dbd" && formData.companyName !== ""}
                    />
                  </div>

                  <div>
                    <Label htmlFor="capital" className="text-gray-900 text-xs font-medium">
                      ทุนจดทะเบียน
                    </Label>
                    <Input
                      id="capital"
                      type="text"
                      value={formData.capital}
                      onChange={(e) => setFormData({ ...formData, capital: e.target.value })}
                      className="mt-1.5 border-gray-300 focus:border-emerald-500 h-8 text-xs disabled:bg-gray-50 disabled:text-gray-600 disabled:cursor-not-allowed"
                      placeholder="50,000,000"
                      disabled={dataSource === "dbd" && formData.companyName !== ""}
                    />
                  </div>

                  <div>
                    <Label htmlFor="establishedDate" className="text-gray-900 text-xs font-medium">
                      วันที่ก่อตั้ง
                    </Label>
                    <Input
                      id="establishedDate"
                      type="date"
                      value={formData.establishedDate}
                      onChange={(e) => setFormData({ ...formData, establishedDate: e.target.value })}
                      className="mt-1.5 border-gray-300 focus:border-emerald-500 h-8 text-xs disabled:bg-gray-50 disabled:text-gray-600 disabled:cursor-not-allowed"
                      disabled={dataSource === "dbd" && formData.companyName !== ""}
                    />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-purple-600" />
                  ที่อยู่
                  {dataSource === "dbd" && formData.companyName && (
                    <span className="text-[9px] text-blue-600 font-normal normal-case ml-auto">
                      ข้อมูลจาก DBD (แก้ไขไม่ได้)
                    </span>
                  )}
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <Label htmlFor="address" className="text-gray-900 text-xs font-medium">
                      ที่อยู่
                    </Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="mt-1.5 border-gray-300 focus:border-emerald-500 resize-none text-xs disabled:bg-gray-50 disabled:text-gray-600 disabled:cursor-not-allowed"
                      rows={2}
                      disabled={dataSource === "dbd" && formData.companyName !== ""}
                    />
                  </div>

                  <div>
                    <Label htmlFor="province" className="text-gray-900 text-xs font-medium">
                      จังหวัด
                    </Label>
                    <Input
                      id="province"
                      type="text"
                      value={formData.province}
                      onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                      className="mt-1.5 border-gray-300 focus:border-emerald-500 h-8 text-xs disabled:bg-gray-50 disabled:text-gray-600 disabled:cursor-not-allowed"
                      disabled={dataSource === "dbd" && formData.companyName !== ""}
                    />
                  </div>

                  <div>
                    <Label htmlFor="district" className="text-gray-900 text-xs font-medium">
                      เขต/อำเภอ
                    </Label>
                    <Input
                      id="district"
                      type="text"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="mt-1.5 border-gray-300 focus:border-emerald-500 h-8 text-xs disabled:bg-gray-50 disabled:text-gray-600 disabled:cursor-not-allowed"
                      disabled={dataSource === "dbd" && formData.companyName !== ""}
                    />
                  </div>

                  <div>
                    <Label htmlFor="postalCode" className="text-gray-900 text-xs font-medium">
                      รหัสไปรษณีย์
                    </Label>
                    <Input
                      id="postalCode"
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="mt-1.5 border-gray-300 focus:border-emerald-500 h-8 text-xs disabled:bg-gray-50 disabled:text-gray-600 disabled:cursor-not-allowed"
                      disabled={dataSource === "dbd" && formData.companyName !== ""}
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information - Multiple Contacts */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-orange-600" />
                    ผู้ติดต่อ ({formData.contacts.length})
                  </h4>
                  <Button
                    type="button"
                    onClick={addContact}
                    size="sm"
                    variant="outline"
                    className="h-7 px-2 text-[10px] border-orange-300 text-orange-700 hover:bg-orange-50"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    เพิ่มผู้ติดต่อ
                  </Button>
                </div>

                {/* Contact Cards */}
                <div className="space-y-3">
                  {formData.contacts.map((contact, index) => (
                    <div
                      key={contact.id}
                      className="p-3 rounded-xl border bg-white"
                    >
                      {/* Contact Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center ${
                              contact.isPrimary
                                ? "bg-orange-500"
                                : "bg-gray-400"
                            }`}
                          >
                            <User className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-900">
                              ผู้ติดต่อ #{index + 1}
                            </p>
                            {contact.isPrimary && (
                              <span className="text-[10px] text-orange-600 font-medium">
                                ผู้ติดต่อหลัก
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {!contact.isPrimary && (
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              onClick={() => setPrimaryContact(contact.id)}
                              className="h-6 px-2 text-[10px] text-orange-600 hover:bg-orange-100"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              ตั้งเป็นหลัก
                            </Button>
                          )}
                          {formData.contacts.length > 1 && (
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              onClick={() => removeContact(contact.id)}
                              className="h-6 px-2 text-[10px] text-red-600 hover:bg-red-100"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Contact Fields */}
                      <div className="grid grid-cols-2 gap-2">
                        {/* Basic Info */}
                        <div>
                          <Label className="text-gray-700 text-[10px] font-medium">
                            ชื่อผู้ติดต่อ
                          </Label>
                          <Input
                            type="text"
                            value={contact.name}
                            onChange={(e) =>
                              updateContact(contact.id, "name", e.target.value)
                            }
                            className="mt-1 border-gray-300 focus:border-orange-500 h-7 text-xs"
                            placeholder="ชื่อ-นามสกุล"
                          />
                        </div>

                        <div>
                          <Label className="text-gray-700 text-[10px] font-medium">
                            ตำแหน่ง
                          </Label>
                          <Input
                            type="text"
                            value={contact.position}
                            onChange={(e) =>
                              updateContact(contact.id, "position", e.target.value)
                            }
                            className="mt-1 border-gray-300 focus:border-orange-500 h-7 text-xs"
                            placeholder="ตำแหน่งงาน"
                          />
                        </div>

                        <div>
                          <Label className="text-gray-700 text-[10px] font-medium flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            เบอร์โทร
                          </Label>
                          <Input
                            type="tel"
                            value={contact.phone}
                            onChange={(e) =>
                              updateContact(contact.id, "phone", e.target.value)
                            }
                            className="mt-1 border-gray-300 focus:border-orange-500 h-7 text-xs"
                            placeholder="08X-XXX-XXXX"
                          />
                        </div>

                        <div>
                          <Label className="text-gray-700 text-[10px] font-medium flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            อีเมล
                          </Label>
                          <Input
                            type="email"
                            value={contact.email}
                            onChange={(e) =>
                              updateContact(contact.id, "email", e.target.value)
                            }
                            className="mt-1 border-gray-300 focus:border-orange-500 h-7 text-xs"
                            placeholder="email@example.com"
                          />
                        </div>

                        {/* Social Media / Online Channels */}
                        <div className="col-span-2">
                          <Label className="text-gray-700 text-[10px] font-medium mb-1.5 block">
                            ช่องทางออนไลน์
                          </Label>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <div className="flex items-center gap-1.5 mb-1">
                                <MessageCircle className="h-3 w-3 text-green-600" />
                                <span className="text-[10px] text-gray-600">LINE ID</span>
                              </div>
                              <Input
                                type="text"
                                value={contact.line}
                                onChange={(e) =>
                                  updateContact(contact.id, "line", e.target.value)
                                }
                                className="border-gray-300 focus:border-green-500 h-7 text-xs"
                                placeholder="@lineid"
                              />
                            </div>

                            <div>
                              <div className="flex items-center gap-1.5 mb-1">
                                <Facebook className="h-3 w-3 text-blue-600" />
                                <span className="text-[10px] text-gray-600">Facebook</span>
                              </div>
                              <Input
                                type="text"
                                value={contact.facebook}
                                onChange={(e) =>
                                  updateContact(contact.id, "facebook", e.target.value)
                                }
                                className="border-gray-300 focus:border-blue-500 h-7 text-xs"
                                placeholder="facebook.com/..."
                              />
                            </div>

                            <div>
                              <div className="flex items-center gap-1.5 mb-1">
                                <Instagram className="h-3 w-3 text-pink-600" />
                                <span className="text-[10px] text-gray-600">Instagram</span>
                              </div>
                              <Input
                                type="text"
                                value={contact.instagram}
                                onChange={(e) =>
                                  updateContact(contact.id, "instagram", e.target.value)
                                }
                                className="border-gray-300 focus:border-pink-500 h-7 text-xs"
                                placeholder="@username"
                              />
                            </div>

                            <div>
                              <div className="flex items-center gap-1.5 mb-1">
                                <Phone className="h-3 w-3 text-green-700" />
                                <span className="text-[10px] text-gray-600">WhatsApp</span>
                              </div>
                              <Input
                                type="tel"
                                value={contact.whatsapp}
                                onChange={(e) =>
                                  updateContact(contact.id, "whatsapp", e.target.value)
                                }
                                className="border-gray-300 focus:border-green-500 h-7 text-xs"
                                placeholder="+66-XX-XXX-XXXX"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-semibold text-gray-700 uppercase tracking-wide">
                  ข้อมูลเพิ่มเติม
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <Label htmlFor="website" className="text-gray-900 text-xs font-medium">
                      เว็บไซต์
                    </Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="mt-1.5 border-gray-300 focus:border-emerald-500 h-8 text-xs"
                      placeholder="www.example.com"
                    />
                  </div>

                  <div className="col-span-2">
                    <Label htmlFor="notes" className="text-gray-900 text-xs font-medium">
                      หมายเหตุ
                    </Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="mt-1.5 border-gray-300 focus:border-emerald-500 resize-none text-xs"
                      rows={2}
                      placeholder="บันทึกข้อมูลเพิ่มเติม..."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          {(dataSource === "manual" || formData.companyName) && (
            <DialogFooter className="border-t border-gray-200 pt-3 mt-2">
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1 sm:flex-none h-8 px-4 text-xs"
                  disabled={isLoading}
                >
                  ยกเลิก
                </Button>
                <Button
                  type="submit"
                  className="flex-1 sm:flex-none h-8 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
                  disabled={isLoading || taxIdExists}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-3 w-3 mr-1.5 animate-spin" />
                      กำลังบันทึก...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1.5" />
                      บันทึก
                    </>
                  )}
                </Button>
              </div>
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}