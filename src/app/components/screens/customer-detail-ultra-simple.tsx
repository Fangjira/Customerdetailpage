import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, X, Pencil } from "lucide-react";

interface CustomerRelationship {
  type: "headquarter" | "subsidiary";
  customerId: string;
  name: string;
  code: string;
}

interface CustomerData {
  id: string;
  name: string;
  code: string;
  industry: string;
  taxId: string;
  parentCompany: string;
  accountOwner: string;
  totalValue: string;
  deals: string;
  organizationGroups: Array<{
    customerId: string;
    name: string;
    contact: string;
    role: string;
  }>;
  relationships: CustomerRelationship[];
  services: Array<{
    id: string;
    name: string;
    amount: number | null;
  }>;
  tags: string[];
  customerInsight?: string;
  businessType: string;
  legalStatus: string;
  registeredCapital: string;
  bu: string;
  pic: string;
  address: string;
  visitHistory?: Array<{
    id: string;
    date: string;
    time: string;
    salesPerson: string;
    topic: string;
    notes?: string;
  }>;
}

// Mock data for different customers
const customerDatabase: Record<string, CustomerData> = {
  "CUST-2024-0892": {
    id: "CUST-2024-0892",
    name: "Global Freight Solutions Inc.",
    code: "CUST-2024-0892",
    industry: "Logistics & Transportation",
    taxId: "0105558123456",
    parentCompany: "Global Shipping Alliance",
    accountOwner: "Sarah Chen",
    totalValue: "$1.2M",
    deals: "156",
    organizationGroups: [
      { customerId: "CUST-2024-0893", name: "SCGJWD", contact: "Somchai Intdee", role: "Assistant VP" },
      { customerId: "CUST-2024-0894", name: "SCGJWD Freight", contact: "Veerachai Uksemak", role: "Manager" },
    ],
    relationships: [
      { type: "headquarter", customerId: "CUST-2024-0001", name: "Global Shipping Alliance", code: "CUST-2024-0001" },
      { type: "subsidiary", customerId: "CUST-2024-0893", name: "SCGJWD", code: "CUST-2024-0893" },
      { type: "subsidiary", customerId: "CUST-2024-0894", name: "SCGJWD Freight", code: "CUST-2024-0894" },
    ],
    services: [
      { id: "01", name: "Freight", amount: null },
      { id: "02", name: "Customs", amount: null },
      { id: "03", name: "Warehouse", amount: 1800000 },
      { id: "04", name: "Transportation", amount: null },
      { id: "05", name: "Cross Border", amount: null },
      { id: "06", name: "Trading", amount: null },
    ],
    tags: ["TH-MY", "Cross Border", "FTL", "KA"],
    customerInsight: "สนใจ ERP",
    businessType: "บริษัทจำกัด",
    legalStatus: "ยังดำเนินการอยู่",
    registeredCapital: "50,000,000",
    bu: "Logistics",
    pic: "Sarah Chen",
    address: "123 Logistics Park, Sukhumvit Road, Bangkok 10110",
    visitHistory: [
      {
        id: "V001",
        date: "2024-02-08",
        time: "14:30",
        salesPerson: "Sarah Chen",
        topic: "ปรึกษา ERP System",
        notes: "ลูกค้าสนใจระบบ ERP เพื่อจัดการคลังสินค้า กำหนดนัดหมายครั้งถัดไปสัปดาห์หน้า"
      },
      {
        id: "V002",
        date: "2024-01-25",
        time: "10:00",
        salesPerson: "Sarah Chen",
        topic: "Follow up Quotation",
        notes: "ติดตามใบเสนอราคา Warehouse Management System"
      },
      {
        id: "V003",
        date: "2024-01-15",
        time: "15:00",
        salesPerson: "John Smith",
        topic: "Site Visit",
        notes: "เยี่ยมชมคลังสินค้า ประเมินความต้องการ"
      }
    ]
  },
  "CUST-2024-0893": {
    id: "CUST-2024-0893",
    name: "SCGJWD",
    code: "CUST-2024-0893",
    industry: "Manufacturing",
    taxId: "0105558999888",
    parentCompany: "Global Freight Solutions Inc.",
    accountOwner: "Somchai Intdee",
    totalValue: "$850K",
    deals: "42",
    organizationGroups: [],
    relationships: [
      { type: "headquarter", customerId: "CUST-2024-0892", name: "Global Freight Solutions Inc.", code: "CUST-2024-0892" },
    ],
    services: [
      { id: "01", name: "Freight", amount: 500000 },
      { id: "02", name: "Customs", amount: null },
      { id: "03", name: "Warehouse", amount: 350000 },
      { id: "04", name: "Transportation", amount: null },
      { id: "05", name: "Cross Border", amount: null },
      { id: "06", name: "Trading", amount: null },
    ],
    tags: ["Manufacturing", "Export"],
    businessType: "บริษัทจำกัด",
    legalStatus: "ยังดำเนินการอยู่",
    registeredCapital: "30,000,000",
    bu: "Manufacturing",
    pic: "Somchai Intdee",
    address: "456 Industrial Estate, Samut Prakan 10280"
  },
  "CUST-2024-0894": {
    id: "CUST-2024-0894",
    name: "SCGJWD Freight",
    code: "CUST-2024-0894",
    industry: "Logistics",
    taxId: "0105558777666",
    parentCompany: "Global Freight Solutions Inc.",
    accountOwner: "Veerachai Uksemak",
    totalValue: "$650K",
    deals: "28",
    organizationGroups: [],
    relationships: [
      { type: "headquarter", customerId: "CUST-2024-0892", name: "Global Freight Solutions Inc.", code: "CUST-2024-0892" },
    ],
    services: [
      { id: "01", name: "Freight", amount: 650000 },
      { id: "02", name: "Customs", amount: null },
      { id: "03", name: "Warehouse", amount: null },
      { id: "04", name: "Transportation", amount: null },
      { id: "05", name: "Cross Border", amount: null },
      { id: "06", name: "Trading", amount: null },
    ],
    tags: ["Freight", "TH"],
    businessType: "บริษัทจำกัด",
    legalStatus: "ยังดำเนินการอยู่",
    registeredCapital: "20,000,000",
    bu: "Logistics",
    pic: "Veerachai Uksemak",
    address: "789 Freight Center, Ladkrabang, Bangkok 10520"
  },
};

export function CustomerDetailUltraSimple({ onBack, onVisitClick }: { 
  onBack: () => void;
  onVisitClick?: (visitId: string) => void;
}) {
  const [activeTab, setActiveTab] = useState("info");
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceAmount, setServiceAmount] = useState("");
  const [currentCustomerId, setCurrentCustomerId] = useState("CUST-2024-0892");
  const [showAddTagModal, setShowAddTagModal] = useState(false);
  const [newTagText, setNewTagText] = useState("");
  const [newTagType, setNewTagType] = useState<"tag" | "interest">("tag");
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [newServiceName, setNewServiceName] = useState("");
  const [newServiceAmount, setNewServiceAmount] = useState("");
  const [showEditInfoModal, setShowEditInfoModal] = useState(false);
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [newContactName, setNewContactName] = useState("");
  const [newContactPosition, setNewContactPosition] = useState("");
  const [newContactEmail, setNewContactEmail] = useState("");
  const [newContactPhone, setNewContactPhone] = useState("");
  const [newContactAddresses, setNewContactAddresses] = useState<string[]>([]);
  const [currentAddress, setCurrentAddress] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");

  // Edit Info Modal States
  const [editTaxId, setEditTaxId] = useState("");
  const [editBusinessType, setEditBusinessType] = useState("");
  const [editLegalStatus, setEditLegalStatus] = useState("");
  const [editRegisteredCapital, setEditRegisteredCapital] = useState("");
  const [editBu, setEditBu] = useState("");
  const [editPic, setEditPic] = useState("");
  const [editAddress, setEditAddress] = useState("");

  // Edit Customer Insight Modal States
  const [showEditInsightModal, setShowEditInsightModal] = useState(false);
  const [editInsightText, setEditInsightText] = useState("");

  const currentCustomer = customerDatabase[currentCustomerId];
  const [services, setServices] = useState(currentCustomer.services);
  const [tags, setTags] = useState(currentCustomer.tags);
  const [interests, setInterests] = useState(["ค่าบริการคลัง", "Purchasing manager"]);

  const handleServiceClick = (service: typeof services[0]) => {
    setEditingServiceId(service.id);
    setServiceAmount(service.amount ? service.amount.toString() : "");
  };

  const handleSaveService = (serviceId: string) => {
    const amount = serviceAmount ? parseFloat(serviceAmount) : null;
    setServices(
      services.map((s) =>
        s.id === serviceId ? { ...s, amount } : s
      )
    );
    setEditingServiceId(null);
    setServiceAmount("");
  };

  const handleCancelEdit = () => {
    setEditingServiceId(null);
    setServiceAmount("");
  };

  const handleNavigateToCustomer = (customerId: string) => {
    // Check if customer exists in database
    const newCustomer = customerDatabase[customerId];
    if (!newCustomer) {
      alert(`ไม่พบข้อมูลลูกค้า ${customerId}`);
      return;
    }
    
    setCurrentCustomerId(customerId);
    setServices(newCustomer.services);
    setActiveTab("info");
  };

  const formatCurrency = (amount: number | null) => {
    if (amount === null) return "-";
    return `฿${amount.toLocaleString()}`;
  };

  const headquarter = currentCustomer.relationships.filter(r => r.type === "headquarter");
  const subsidiaries = currentCustomer.relationships.filter(r => r.type === "subsidiary");

  const handleAddTag = () => {
    if (newTagText.trim() === "") return;
    if (newTagType === "tag") {
      setTags([...tags, newTagText]);
    } else {
      setInterests([...interests, newTagText]);
    }
    setNewTagText("");
    setShowAddTagModal(false);
    setConfirmMessage(`เพิ่ม ${newTagType === "tag" ? "Tag" : "Interest"} "${newTagText}" สำเร็จ!`);
    setShowConfirmModal(true);
  };

  const handleAddService = () => {
    if (newServiceName.trim() === "") return;
    const newService = {
      id: `0${services.length + 1}`,
      name: newServiceName,
      amount: newServiceAmount ? parseFloat(newServiceAmount) : null,
    };
    setServices([...services, newService]);
    const serviceName = newServiceName;
    setNewServiceName("");
    setNewServiceAmount("");
    setShowAddServiceModal(false);
    setConfirmMessage(`เพิ่ม Service "${serviceName}" สำเร็จ!`);
    setShowConfirmModal(true);
  };

  const handleAddContact = () => {
    if (newContactName.trim() === "") return;
    const contactName = newContactName;
    setNewContactName("");
    setNewContactPosition("");
    setNewContactEmail("");
    setNewContactPhone("");
    setNewContactAddresses([]);
    setCurrentAddress("");
    setShowAddContactModal(false);
    setConfirmMessage(`เพิ่มผู้ติดต่อ "${contactName}" สำเร็จ!`);
    setShowConfirmModal(true);
  };

  const handleEditInfo = () => {
    setEditTaxId(currentCustomer.taxId);
    setEditBusinessType(currentCustomer.businessType);
    setEditLegalStatus(currentCustomer.legalStatus);
    setEditRegisteredCapital(currentCustomer.registeredCapital);
    setEditBu(currentCustomer.bu);
    setEditPic(currentCustomer.pic);
    setEditAddress(currentCustomer.address);
    setShowEditInfoModal(true);
  };

  const handleSaveInfo = () => {
    // ในการใช้งานจริงจะต้องอัพเดทข้อมูลในฐานข้อมูล
    setShowEditInfoModal(false);
    setConfirmMessage("แก้ไขข้อมูลพื้นฐานสำเร็จ!");
    setShowConfirmModal(true);
  };

  const handleEditInsight = () => {
    setEditInsightText(currentCustomer.customerInsight || "");
    setShowEditInsightModal(true);
  };

  const handleSaveInsight = () => {
    // ในการใช้งานจริงจะต้องอัพเดทข้อมูลในฐานข้อมูล
    setShowEditInsightModal(false);
    setConfirmMessage("แก้ไข Customer Insight สำเร็จ!");
    setShowConfirmModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="p-4 flex items-center">
          <button onClick={onBack} className="mr-3">
            <ChevronLeft className="h-6 w-6 text-blue-600" />
          </button>
          <h1 className="text-xl font-semibold">รายละเอียดลูกค้า</h1>
        </div>
      </div>

      {/* Company Header - Simple */}
      <div className="bg-white p-3 mb-3">
        <h2 className="text-lg font-bold mb-0.5">{currentCustomer.name}</h2>
        <p className="text-gray-500 text-xs mb-2">{currentCustomer.code}</p>
        
        {/* Stats - Simple Grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-blue-50 p-2 rounded-lg">
            <p className="text-xs text-gray-600">มูลค่าทั้งหมด</p>
            <p className="text-xl font-bold text-blue-600">{currentCustomer.totalValue}</p>
          </div>
          <div className="bg-green-50 p-2 rounded-lg">
            <p className="text-xs text-gray-600">ข้อตกลง</p>
            <p className="text-xl font-bold text-green-600">{currentCustomer.deals}</p>
          </div>
        </div>
      </div>

      {/* Tabs - iOS Style */}
      <div className="bg-white border-b px-1 flex">
        <button
          onClick={() => setActiveTab("info")}
          className={`flex-1 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
            activeTab === "info"
              ? "text-blue-600 border-blue-600"
              : "text-gray-500 border-transparent"
          }`}
        >
          ข้อมูล
        </button>
        <button
          onClick={() => setActiveTab("contacts")}
          className={`flex-1 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
            activeTab === "contacts"
              ? "text-blue-600 border-blue-600"
              : "text-gray-500 border-transparent"
          }`}
        >
          ผู้ติดต่อ
        </button>
        <button
          onClick={() => setActiveTab("deals")}
          className={`flex-1 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
            activeTab === "deals"
              ? "text-blue-600 border-blue-600"
              : "text-gray-500 border-transparent"
          }`}
        >
          ดีล
        </button>
        <button
          onClick={() => setActiveTab("visits")}
          className={`flex-1 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
            activeTab === "visits"
              ? "text-blue-600 border-blue-600"
              : "text-gray-500 border-transparent"
          }`}
        >
          การพบ
        </button>
        <button
          onClick={() => setActiveTab("analysis")}
          className={`flex-1 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
            activeTab === "analysis"
              ? "text-blue-600 border-blue-600"
              : "text-gray-500 border-transparent"
          }`}
        >
          วิเคราะห์
        </button>
      </div>

      {/* Content */}
      <div className="pb-20">
        {activeTab === "info" && (
          <div className="space-y-3 p-3">
            {/* Basic Info - Grid 2 Columns */}
            <div className="bg-white rounded-lg p-2.5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-500 uppercase">ข้อมูลพื้นฐาน</p>
                <button 
                  className="text-xs text-blue-600 font-medium"
                  onClick={() => handleEditInfo()}
                >
                  แก้ไข
                </button>
              </div>
              <div className="grid grid-cols-2 gap-x-2.5 gap-y-1.5">
                <div>
                  <p className="text-xs text-gray-500">Tax ID</p>
                  <p className="text-xs mt-0.5">{currentCustomer.taxId}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">ประเภทธุรกิจ</p>
                  <p className="text-xs mt-0.5">{currentCustomer.businessType}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-500">สถานะนิติบุคคล</p>
                  <p className="text-xs mt-0.5 text-green-600">{currentCustomer.legalStatus}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">ทุนจดทะเบียน</p>
                  <p className="text-xs mt-0.5">฿{currentCustomer.registeredCapital}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">BU</p>
                  <p className="text-xs mt-0.5">{currentCustomer.bu}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-500">PIC</p>
                  <p className="text-xs mt-0.5">{currentCustomer.pic}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="text-xs mt-0.5 leading-snug">{currentCustomer.address}</p>
                </div>
              </div>
            </div>

            {/* Tags + Interest */}
            <div className="bg-white rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-2">Tags & Interest</p>
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag, index) => (
                  <span key={`tag-${index}`} className="group px-2 py-0.5 bg-gray-200 text-gray-800 rounded text-xs flex items-center gap-1">
                    {tag}
                    <button
                      onClick={() => setTags(tags.filter((_, i) => i !== index))}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3 text-gray-600 hover:text-red-600" />
                    </button>
                  </span>
                ))}
                {interests.map((interest, index) => (
                  <span key={`interest-${index}`} className="group px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs flex items-center gap-1">
                    {interest}
                    <button
                      onClick={() => setInterests(interests.filter((_, i) => i !== index))}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3 text-blue-600 hover:text-red-600" />
                    </button>
                  </span>
                ))}
                <button
                  className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs flex items-center hover:bg-green-200 active:bg-green-300 transition-colors"
                  onClick={() => setShowAddTagModal(true)}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add
                </button>
              </div>
            </div>

            {/* Organization Group */}
            {(headquarter.length > 0 || subsidiaries.length > 0 || currentCustomer.organizationGroups.length > 0) && (
              <div>
                <div className="flex items-center justify-between px-1 mb-2">
                  <p className="text-xs text-gray-500 uppercase">Organization Group</p>
                  <button className="text-xs text-blue-600">Show organization</button>
                </div>
                
                <div className="bg-white rounded-lg p-3">
                  {/* Headquarter Section */}
                  {headquarter.length > 0 && (
                    <div className={`${(subsidiaries.length > 0 || currentCustomer.organizationGroups.length > 0) ? 'mb-3' : ''}`}>
                      <p className="text-xs text-gray-500 mb-2">Headquarter</p>
                      <div className="space-y-2">
                        {headquarter.map((hq) => (
                          <button
                            key={hq.customerId}
                            className="w-full bg-blue-50 rounded-lg p-2.5 hover:bg-blue-100 active:bg-blue-200 transition-colors"
                            onClick={() => handleNavigateToCustomer(hq.customerId)}
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold text-xs">HQ</span>
                              </div>
                              <div className="flex-1 text-left min-w-0">
                                <p className="text-sm font-semibold truncate">{hq.name}</p>
                                <p className="text-xs text-gray-500">บริษัทแม่</p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Subsidiary Section */}
                  {(subsidiaries.length > 0 || currentCustomer.organizationGroups.length > 0) && (
                    <div>
                      <p className="text-xs text-gray-500 mb-2">Subsidiary</p>
                      <div className="space-y-2">
                        {/* Organization Groups */}
                        {currentCustomer.organizationGroups.map((group) => (
                          <button
                            key={group.customerId}
                            className="w-full bg-teal-50 rounded-lg p-2.5 hover:bg-teal-100 active:bg-teal-200 transition-colors"
                            onClick={() => handleNavigateToCustomer(group.customerId)}
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                              </div>
                              <div className="flex-1 text-left min-w-0">
                                <p className="text-sm font-semibold truncate">{group.name}</p>
                                <p className="text-xs text-gray-500 truncate">{group.contact}</p>
                              </div>
                            </div>
                          </button>
                        ))}
                        
                        {/* Other Subsidiaries */}
                        {subsidiaries.filter(sub => 
                          !currentCustomer.organizationGroups.some(g => g.customerId === sub.customerId)
                        ).map((sub) => (
                          <button
                            key={sub.customerId}
                            className="w-full bg-teal-50 rounded-lg p-2.5 hover:bg-teal-100 active:bg-teal-200 transition-colors"
                            onClick={() => handleNavigateToCustomer(sub.customerId)}
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                              </div>
                              <div className="flex-1 text-left min-w-0">
                                <p className="text-sm font-semibold truncate">{sub.name}</p>
                                <p className="text-xs text-gray-500">บริษัทลูก</p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Service Revenue - Compact */}
            <div>
              <div className="flex items-center justify-between px-1 mb-2">
                <p className="text-xs text-gray-500 uppercase">ยอดขายแต่ละ Service</p>
                <button
                  className="text-xs text-green-600 font-medium flex items-center gap-1"
                  onClick={() => setShowAddServiceModal(true)}
                >
                  <Plus className="h-3 w-3" />
                  Add Service
                </button>
              </div>
              <div className="bg-white rounded-lg overflow-hidden">
                <div className="grid grid-cols-3 gap-px bg-gray-200">
                  {services.map((service) => (
                    <div key={service.id}>
                      {editingServiceId === service.id ? (
                        <div className="bg-blue-50 p-2">
                          <p className="text-xs text-gray-500 mb-1">{service.name}</p>
                          <input
                            type="number"
                            value={serviceAmount}
                            onChange={(e) => setServiceAmount(e.target.value)}
                            autoFocus
                            onBlur={() => handleSaveService(service.id)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleSaveService(service.id);
                              } else if (e.key === 'Escape') {
                                handleCancelEdit();
                              }
                            }}
                            className="w-full px-1 py-0.5 text-sm font-semibold text-blue-600 border border-blue-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="0"
                          />
                        </div>
                      ) : (
                        <button
                          className="bg-white p-2 hover:bg-gray-50 active:bg-gray-100 transition-colors w-full text-left relative group"
                          onClick={() => handleServiceClick(service)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="text-xs text-gray-500 mb-0.5">{service.name}</p>
                              <p className={`text-sm font-semibold ${service.amount ? 'text-blue-600' : 'text-gray-400'}`}>
                                {formatCurrency(service.amount)}
                              </p>
                            </div>
                            <Pencil className="h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-1" />
                          </div>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Customer Insight */}
            {currentCustomer.customerInsight && (
              <div className="bg-white rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-gray-500 uppercase">Customer Insight</p>
                  <button 
                    className="text-xs text-blue-600 font-medium"
                    onClick={handleEditInsight}
                  >
                    แก้ไข
                  </button>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {currentCustomer.customerInsight}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "contacts" && (
          <div className="space-y-6 p-4">
            {/* Primary Contact */}
            <div>
              <div className="flex items-center justify-between px-4 mb-2">
                <h3 className="text-sm font-semibold text-gray-500 uppercase">
                  ผู้ติดต่อหลัก
                </h3>
                <button 
                  className="text-xs text-green-600 font-medium flex items-center gap-1"
                  onClick={() => setShowAddContactModal(true)}
                >
                  <Plus className="h-3 w-3" />
                  Add Contact
                </button>
              </div>
              <div className="bg-white rounded-lg">
                <button className="w-full px-4 py-4 text-left border-b active:bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-base font-semibold">John Davidson</p>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Primary</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Operations Director</p>
                  <p className="text-sm text-blue-600">john.d@globalfreight.com</p>
                  <p className="text-sm text-blue-600">+1 (555) 123-4567</p>
                </button>
                <button className="w-full px-4 py-4 text-left active:bg-gray-50">
                  <p className="text-base font-semibold mb-2">Sarah Chen</p>
                  <p className="text-sm text-gray-600 mb-1">Senior Account Manager</p>
                  <p className="text-sm text-blue-600">sarah.chen@newuscrm.com</p>
                  <p className="text-sm text-blue-600">+1 (555) 234-5678</p>
                </button>
              </div>
            </div>

            {/* Key Contacts */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase px-4 mb-2">
                ผู้ติดต่อสำคัญ
              </h3>
              <div className="bg-white rounded-lg">
                <button className="w-full px-4 py-4 flex items-center justify-between border-b active:bg-gray-50">
                  <div className="text-left flex-1">
                    <p className="text-base font-medium">คุณ สมชาย ใจดี</p>
                    <p className="text-sm text-gray-500">Purchasing manager</p>
                  </div>
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                    Key decision
                  </span>
                </button>
                <button className="w-full px-4 py-4 text-left active:bg-gray-50">
                  <p className="text-base font-medium">คุณ วรรณพร</p>
                  <p className="text-sm text-gray-500">General manager</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "deals" && (
          <div className="space-y-6 p-4">
            {/* Deals */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase px-4 mb-2">
                ดีลที่เกี่ยวข้อง
              </h3>
              <div className="bg-white rounded-lg">
                <button className="w-full px-4 py-4 text-left border-b active:bg-gray-50">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-sm text-blue-600 mb-1">CF-2024-091</p>
                      <p className="text-base font-semibold mb-1">ข้อ 18# ค่าบริการคลัง</p>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                        Negotiation
                      </span>
                    </div>
                    <div className="text-right ml-3">
                      <p className="text-lg font-bold">฿10M</p>
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Hot</span>
                    </div>
                  </div>
                </button>
                <button className="w-full px-4 py-4 text-left active:bg-gray-50">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-sm text-blue-600 mb-1">CF-2024-101</p>
                      <p className="text-base font-semibold mb-1">ERP upgrade MAL</p>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                        สร้างข้อเสนอ
                      </span>
                    </div>
                    <div className="text-right ml-3">
                      <p className="text-lg font-bold">฿8.5M</p>
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Medium</span>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Quotations */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase px-4 mb-2">
                ใบเสนอราคา
              </h3>
              <div className="bg-white rounded-lg">
                <button className="w-full px-4 py-4 text-left border-b active:bg-gray-50">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm text-gray-500">QT-20-001</p>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Draft</span>
                  </div>
                  <p className="text-base font-medium mb-1">ข้อ 15# ค่าบริการคลัง + H&W</p>
                  <p className="text-lg font-bold text-gray-900">฿3,500,000</p>
                </button>
                <button className="w-full px-4 py-4 text-left active:bg-gray-50">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm text-gray-500">QT-20-002</p>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Sent</span>
                  </div>
                  <p className="text-base font-medium mb-1">ระบบคลังสินค้าขนาดกลาง</p>
                  <p className="text-lg font-bold text-gray-900">฿6,800,000</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "visits" && (
          <div className="p-3">
            {currentCustomer.visitHistory && currentCustomer.visitHistory.length > 0 ? (
              <div className="space-y-2">
                {currentCustomer.visitHistory.map((visit) => (
                  <div 
                    key={visit.id} 
                    onClick={() => onVisitClick?.(visit.id)}
                    className="bg-white rounded-lg p-3 border border-gray-200 cursor-pointer hover:border-blue-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">{visit.topic}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(visit.date).toLocaleDateString('th-TH', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })} • {visit.time} น.
                        </p>
                      </div>
                      <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded ml-2 flex-shrink-0">
                        {visit.salesPerson}
                      </span>
                    </div>
                    {visit.notes && (
                      <div className="mt-2 pt-2 border-t border-gray-100">
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {visit.notes}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-500">ยังไม่มีประวัติการพบลูกค้า</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "analysis" && (
          <div className="p-4">
            <div className="bg-white rounded-lg p-4">
              <h3 className="text-lg font-bold mb-4">Win/Loss Analysis</h3>
              
              {/* Win */}
              <div className="mb-6">
                <p className="text-base font-semibold text-green-700 mb-3">✓ Key Win</p>
                <div className="space-y-3">
                  {[
                    { name: "Cross Border", percent: 40 },
                    { name: "Transportation", percent: 30 },
                    { name: "Service", percent: 20 },
                    { name: "Customs", percent: 10 },
                  ].map((item) => (
                    <div key={item.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">{item.name}</span>
                        <span className="text-sm font-bold text-green-700">{item.percent}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${item.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Loss */}
              <div>
                <p className="text-base font-semibold text-red-700 mb-3">✗ Key Loss</p>
                <div className="space-y-3">
                  {[
                    { name: "Cross Border", percent: 40 },
                    { name: "Customs", percent: 20 },
                    { name: "Pricing", percent: 20 },
                    { name: "Service", percent: 10 },
                  ].map((item) => (
                    <div key={item.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">{item.name}</span>
                        <span className="text-sm font-bold text-red-700">{item.percent}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div
                          className="h-full bg-red-500 rounded-full"
                          style={{ width: `${item.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FAB */}
      <button className="fixed bottom-6 right-6 h-14 w-14 bg-blue-600 rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-transform">
        <Plus className="h-6 w-6 text-white" />
      </button>

      {/* Add Tag Modal */}
      {showAddTagModal && (
        <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] flex flex-col shadow-2xl">
            {/* Header */}
            <div className="p-6 pb-4 text-center border-b border-gray-100">
              <h2 id="add-tag-title" className="text-xl font-bold text-gray-900 mb-2">
                <span className="text-2xl mr-2">🏷️</span>
                Add Tag/Interest
              </h2>
              <p id="add-tag-description" className="text-sm text-gray-500">
                เพิ่ม Tag หรือ Interest เพื่อจัดหมวดหมู่ข้อมูลลูกค้า
              </p>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-5">
                {/* Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    ชนิด <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      className={`px-4 py-3 rounded-xl border-2 text-left transition-all ${
                        newTagType === "tag"
                          ? "border-purple-500 bg-purple-50 shadow-sm"
                          : "border-gray-300 bg-white"
                      }`}
                      onClick={() => setNewTagType("tag")}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          newTagType === "tag" ? "border-purple-500 bg-purple-500" : "border-gray-300"
                        }`}>
                          {newTagType === "tag" && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                        <span className={newTagType === "tag" ? "font-semibold text-purple-700" : "text-gray-600"}>
                          Tag
                        </span>
                      </div>
                    </button>
                    <button
                      className={`px-4 py-3 rounded-xl border-2 text-left transition-all ${
                        newTagType === "interest"
                          ? "border-purple-500 bg-purple-50 shadow-sm"
                          : "border-gray-300 bg-white"
                      }`}
                      onClick={() => setNewTagType("interest")}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          newTagType === "interest" ? "border-purple-500 bg-purple-500" : "border-gray-300"
                        }`}>
                          {newTagType === "interest" && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                        <span className={newTagType === "interest" ? "font-semibold text-purple-700" : "text-gray-600"}>
                          Interest
                        </span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Name Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ชื่อ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newTagText}
                    onChange={(e) => setNewTagText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAddTag();
                      }
                    }}
                    autoFocus
                    className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm placeholder-gray-400"
                    placeholder={`ระบุชื่อ${newTagType === "tag" ? "แท็ก" : "ความสนใจ"}`}
                  />
                </div>

                {/* Preview */}
                {newTagText.trim() && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ตัวอย่าง
                    </label>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <span className={`px-3 py-1.5 rounded text-sm ${
                        newTagType === "tag"
                          ? "bg-gray-200 text-gray-800"
                          : "bg-blue-50 text-blue-700"
                      }`}>
                        {newTagText}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 pt-4 border-t border-gray-100">
              <div className="flex gap-3">
                <button
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 active:bg-gray-300 transition-colors text-sm"
                  onClick={() => {
                    setShowAddTagModal(false);
                    setNewTagText("");
                  }}
                >
                  ยกเลิก
                </button>
                <button
                  className="flex-1 px-6 py-3 bg-[rgb(25,169,42)] text-white rounded-xl font-medium hover:bg-purple-700 active:bg-purple-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  onClick={handleAddTag}
                  disabled={newTagText.trim() === ""}
                >
                  บันทึก
                </button>
              </div>
            </div>
          </div>
      )}

      {/* Add Service Modal */}
      {showAddServiceModal && (
        <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <button
                onClick={() => {
                  setShowAddServiceModal(false);
                  setNewServiceName("");
                  setNewServiceAmount("");
                }}
                className="text-gray-700 hover:text-gray-900"
                aria-label="ปิด"
              >
                <X className="h-6 w-6" />
              </button>
              <h1 id="add-service-title" className="text-lg font-bold text-purple-600 flex items-center gap-2">
                <span className="text-2xl">🏷️</span>
                Add Service
              </h1>
              <div className="w-6"></div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="max-w-lg mx-auto space-y-6">
                {/* Description */}
                <p id="add-service-description" className="text-sm text-gray-600">
                  เพิ่ม Service เพื่อจัดหมวดหมู่ข้อมูลลูกค้า
                </p>

                {/* Name Input */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <span className="text-purple-600">📝</span>
                    ชื่อ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newServiceName}
                    onChange={(e) => setNewServiceName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAddService();
                      }
                    }}
                    autoFocus
                    className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="ระบุชื่อ Service"
                  />
                </div>

                {/* Amount Input */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <span className="text-purple-600">💰</span>
                    จำนวนเงิน
                  </label>
                  <input
                    type="number"
                    value={newServiceAmount}
                    onChange={(e) => setNewServiceAmount(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAddService();
                      }
                    }}
                    className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="ระบุจำนวนเงิน"
                  />
                </div>

                {/* Preview */}
                {newServiceName.trim() && (
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <span className="text-purple-600">👁️</span>
                      ตัวอย่าง
                    </label>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="bg-white p-3 rounded-lg border border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">{newServiceName}</p>
                        <p className={`text-base font-semibold ${newServiceAmount ? 'text-blue-600' : 'text-gray-400'}`}>
                          {newServiceAmount ? formatCurrency(parseFloat(newServiceAmount)) : '-'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4 bg-white">
              <div className="max-w-lg mx-auto flex gap-3">
                <button
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 active:bg-gray-300 transition-colors"
                  onClick={() => {
                    setShowAddServiceModal(false);
                    setNewServiceName("");
                    setNewServiceAmount("");
                  }}
                >
                  ยกเลิก
                </button>
                <button
                  className="flex-1 px-6 py-3 bg-[rgb(34,194,9)] text-white rounded-lg font-medium hover:bg-purple-700 active:bg-purple-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleAddService}
                  disabled={newServiceName.trim() === ""}
                >
                  บันทึก
                </button>
              </div>
            </div>
          </div>
      )}

      {/* Add Contact Modal */}
      {showAddContactModal && (
        <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] flex flex-col shadow-2xl">
            {/* Header */}
            <div className="p-6 pb-4 text-center border-b border-gray-100">
              <h2 id="add-contact-title" className="text-xl font-bold text-gray-900 mb-2">เพิ่มผู้ติดต่อ</h2>
              <p id="add-contact-description" className="text-sm text-gray-500">กรอกรายละเอียดผู้ติดต่อให้ครบถ้วน</p>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-5">
                {/* Name Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ชื่อผู้ติดต่อ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newContactName}
                    onChange={(e) => setNewContactName(e.target.value)}
                    autoFocus
                    className="w-full px-4 py-3 border-2 border-blue-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder-gray-400"
                    placeholder="กรอกชื่อผู้ติดต่อ"
                  />
                </div>

                {/* Position Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ตำแหน่ง
                  </label>
                  <input
                    type="text"
                    value={newContactPosition}
                    onChange={(e) => setNewContactPosition(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder-gray-400 bg-gray-50"
                    placeholder="กรอกตำแหน่ง"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    อีเมล
                  </label>
                  <input
                    type="email"
                    value={newContactEmail}
                    onChange={(e) => setNewContactEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder-gray-400 bg-gray-50"
                    placeholder="example@email.com"
                  />
                </div>

                {/* Phone Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    เบอร์โทรศัพท์
                  </label>
                  <input
                    type="tel"
                    value={newContactPhone}
                    onChange={(e) => setNewContactPhone(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder-gray-400 bg-gray-50"
                    placeholder="+66 XX XXX XXXX"
                  />
                </div>

                {/* Address Input - Multiple */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ที่อยู่
                  </label>
                  
                  {/* Existing Addresses */}
                  {newContactAddresses.length > 0 && (
                    <div className="space-y-2 mb-3">
                      {newContactAddresses.map((address, index) => (
                        <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 rounded-xl border border-blue-100">
                          <p className="flex-1 text-sm text-gray-700">{address}</p>
                          <button
                            onClick={() => setNewContactAddresses(newContactAddresses.filter((_, i) => i !== index))}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* New Address Input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentAddress}
                      onChange={(e) => setCurrentAddress(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && currentAddress.trim()) {
                          setNewContactAddresses([...newContactAddresses, currentAddress]);
                          setCurrentAddress("");
                        }
                      }}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder-gray-400 bg-gray-50"
                      placeholder="ระบุที่อยู่"
                    />
                    <button
                      onClick={() => {
                        if (currentAddress.trim()) {
                          setNewContactAddresses([...newContactAddresses, currentAddress]);
                          setCurrentAddress("");
                        }
                      }}
                      disabled={!currentAddress.trim()}
                      className="px-4 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 active:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
                    >
                      <Plus className="h-4 w-4" />
                      เพิ่ม
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 pt-4 border-t border-gray-100">
              <div className="flex gap-3">
                <button
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 active:bg-gray-300 transition-colors text-sm"
                  onClick={() => {
                    setShowAddContactModal(false);
                    setNewContactName("");
                    setNewContactPosition("");
                    setNewContactEmail("");
                    setNewContactPhone("");
                    setNewContactAddresses([]);
                    setCurrentAddress("");
                  }}
                >
                  ยกเลิก
                </button>
                <button
                  className="flex-1 px-6 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 active:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  onClick={handleAddContact}
                  disabled={newContactName.trim() === ""}
                >
                  บันทึก
                </button>
              </div>
            </div>
          </div>
      )}

      {/* Edit Info Modal */}
      {showEditInfoModal && (
        <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] flex flex-col shadow-2xl">
            {/* Header */}
            <div className="p-6 pb-4 text-center border-b border-gray-100">
              <h2 id="edit-info-title" className="text-xl font-bold text-gray-900 mb-2">แก้ไขข้อมูลพื้นฐาน</h2>
              <p id="edit-info-description" className="text-sm text-gray-500">กรอกรายละเอียดให้ครบถ้วน</p>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-5">
                {/* Tax ID Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tax ID
                  </label>
                  <input
                    type="text"
                    value={editTaxId}
                    onChange={(e) => setEditTaxId(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder-gray-400 bg-gray-50"
                    placeholder="กรอก Tax ID"
                  />
                </div>

                {/* Business Type Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ประเภทธุรกิจ
                  </label>
                  <input
                    type="text"
                    value={editBusinessType}
                    onChange={(e) => setEditBusinessType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder-gray-400 bg-gray-50"
                    placeholder="กรอกประเภทธุรกิจ"
                  />
                </div>

                {/* Legal Status Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    สถานะนิติบุคคล
                  </label>
                  <input
                    type="text"
                    value={editLegalStatus}
                    onChange={(e) => setEditLegalStatus(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder-gray-400 bg-gray-50"
                    placeholder="กรอกสถานะนิติบุคคล"
                  />
                </div>

                {/* Registered Capital Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ทุนจดทะเบียน
                  </label>
                  <input
                    type="text"
                    value={editRegisteredCapital}
                    onChange={(e) => setEditRegisteredCapital(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder-gray-400 bg-gray-50"
                    placeholder="กรอกทุนจดทะเบียน"
                  />
                </div>

                {/* BU Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    BU
                  </label>
                  <input
                    type="text"
                    value={editBu}
                    onChange={(e) => setEditBu(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder-gray-400 bg-gray-50"
                    placeholder="กรอก BU"
                  />
                </div>

                {/* PIC Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PIC
                  </label>
                  <input
                    type="text"
                    value={editPic}
                    onChange={(e) => setEditPic(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder-gray-400 bg-gray-50"
                    placeholder="กรอก PIC"
                  />
                </div>

                {/* Address Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder-gray-400 bg-gray-50 resize-none"
                    placeholder="กรอกที่อยู่"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 pt-4 border-t border-gray-100">
              <div className="flex gap-3">
                <button
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 active:bg-gray-300 transition-colors text-sm"
                  onClick={() => {
                    setShowEditInfoModal(false);
                  }}
                >
                  ยกเลิก
                </button>
                <button
                  className="flex-1 px-6 py-3 bg-[rgb(32,206,69)] text-white rounded-xl font-medium hover:bg-blue-600 active:bg-blue-700 transition-colors text-sm"
                  onClick={handleSaveInfo}
                >
                  บันทึก
                </button>
              </div>
            </div>
          </div>
      )}

      {/* Edit Customer Insight Modal */}
      {showEditInsightModal && (
        <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] flex flex-col shadow-2xl">
            {/* Header */}
            <div className="p-6 pb-4 text-center border-b border-gray-100">
              <h2 id="edit-insight-title" className="text-xl font-bold text-gray-900 mb-2">แก้ไข Customer Insight</h2>
              <p id="edit-insight-description" className="text-sm text-gray-500">กรอกข้อมูลเพิ่มเติมเกี่ยวกับลูกค้า</p>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  หมายเหตุ / Customer Insight
                </label>
                <textarea
                  value={editInsightText}
                  onChange={(e) => setEditInsightText(e.target.value)}
                  rows={12}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder-gray-400 bg-gray-50 resize-none"
                  placeholder="กรอกข้อมูลเพิ่มเติมเกี่ยวกับลูกค้า เช่น ลักษณะธุรกิจ ผู้ตัดสินใจ Pain Points โอกาสทางธุรกิจ ฯลฯ"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 pt-4 border-t border-gray-100">
              <div className="flex gap-3">
                <button
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 active:bg-gray-300 transition-colors text-sm"
                  onClick={() => {
                    setShowEditInsightModal(false);
                  }}
                >
                  ยกเลิก
                </button>
                <button
                  className="flex-1 px-6 py-3 bg-[rgb(15,172,20)] text-white rounded-xl font-medium hover:bg-blue-600 active:bg-blue-700 transition-colors text-sm"
                  onClick={handleSaveInsight}
                >
                  บันทึก
                </button>
              </div>
            </div>
          </div>
      )}

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl">
            {/* Icon */}
            <div className="flex justify-center pt-8 pb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Message */}
            <div className="px-6 pb-6 text-center">
              <p className="text-lg font-semibold text-gray-900 mb-2">สำเร็จ!</p>
              <p className="text-sm text-gray-600">{confirmMessage}</p>
            </div>

            {/* Button */}
            <div className="px-6 pb-6">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 active:bg-green-800 transition-colors"
              >
                ตกลง
              </button>
            </div>
          </div>
      )}
    </div>
  );
}