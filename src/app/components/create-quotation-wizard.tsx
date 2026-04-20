import { useState, useEffect } from "react";
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
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  CheckCircle2,
  Circle,
  Upload,
  Plus,
  Trash2,
  FileText,
  Calendar,
  Search,
  X,
  ChevronDown,
  ChevronUp,
  Edit2,
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface CreateQuotationWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LineItem {
  id: string;
  service: string;
  groupService: string;
  mainService: string;
  subService: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  vat: number;
}

// Service Hierarchy Data Structure - 3-Level Cascading Selection
// Group Service > Main Service > Sub Service
const serviceHierarchy: Record<string, any> = {
  freight: {
    label: "Freight Services",
    labelTh: "บริการขนส่งสินค้า",
    mains: {
      "ocean-freight": {
        label: "Ocean Freight",
        labelTh: "ขนส่งทางเรือ",
        subs: [
          "FCL (Full Container Load)",
          "LCL (Less Container Load)",
          "Break Bulk",
          "RORO (Roll-on/Roll-off)",
          "Project Cargo",
        ],
      },
      "air-freight": {
        label: "Air Freight",
        labelTh: "ขนส่งทางอากาศ",
        subs: [
          "Express Air",
          "Standard Air",
          "Consolidated",
          "Charter Flight",
          "Dangerous Goods",
        ],
      },
      "land-freight": {
        label: "Land Freight",
        labelTh: "ขนส่งทางบก",
        subs: [
          "FTL (Full Truck Load)",
          "LTL (Less Than Truck Load)",
          "Cross Border",
          "Domestic Transport",
          "Last Mile Delivery",
        ],
      },
      "rail-freight": {
        label: "Rail Freight",
        labelTh: "ขนส่งทางรถไฟ",
        subs: [
          "Container Train",
          "Bulk Cargo",
          "Intermodal",
          "Express Train",
        ],
      },
    },
  },
  warehouse: {
    label: "Warehouse & Distribution",
    labelTh: "คลังสินค้าและกระจายสินค้า",
    mains: {
      storage: {
        label: "Storage Services",
        labelTh: "บริการจัดเก็บสินค้า",
        subs: [
          "Ambient Storage",
          "Cold Storage",
          "Bonded Warehouse",
          "Hazmat Storage",
          "High Value Storage",
        ],
      },
      distribution: {
        label: "Distribution Services",
        labelTh: "บริการกระจายสินค้า",
        subs: [
          "Local Distribution",
          "Regional Distribution",
          "Same Day Delivery",
          "Next Day Delivery",
          "Scheduled Delivery",
        ],
      },
      fulfillment: {
        label: "Fulfillment Services",
        labelTh: "บริการจัดการคำสั่งซื้อ",
        subs: [
          "Pick & Pack",
          "Kitting & Assembly",
          "Returns Management",
          "Inventory Management",
          "Order Processing",
        ],
      },
      "cross-docking": {
        label: "Cross Docking",
        labelTh: "ขนถ่ายสินค้า",
        subs: [
          "Direct Cross Dock",
          "Consolidation Cross Dock",
          "Deconsolidation",
          "Quality Inspection",
        ],
      },
    },
  },
  customs: {
    label: "Customs & Compliance",
    labelTh: "ศุลกากรและการปฏิบัติตามกฎระเบียบ",
    mains: {
      "customs-clearance": {
        label: "Customs Clearance",
        labelTh: "พิธีการศุลกากร",
        subs: [
          "Import Clearance",
          "Export Clearance",
          "Transit Clearance",
          "Re-export Clearance",
          "Temporary Import",
        ],
      },
      "trade-compliance": {
        label: "Trade Compliance",
        labelTh: "การปฏิบัติตามกฎการค้า",
        subs: [
          "HS Code Classification",
          "Duty Optimization",
          "FTA Consulting",
          "Trade Documentation",
          "License & Permit",
        ],
      },
      inspection: {
        label: "Inspection Services",
        labelTh: "บริการตรวจสอบ",
        subs: [
          "Pre-shipment Inspection",
          "Quality Control",
          "FDA Inspection",
          "Fumigation",
          "Certificate of Origin",
        ],
      },
    },
  },
  "value-added": {
    label: "Value Added Services",
    labelTh: "บริการเพิ่มมูลค่า",
    mains: {
      packaging: {
        label: "Packaging Services",
        labelTh: "บริการบรรจุภัณฑ์",
        subs: [
          "Repackaging",
          "Labeling & Tagging",
          "Shrink Wrapping",
          "Palletizing",
          "Gift Wrapping",
        ],
      },
      "quality-control": {
        label: "Quality Control",
        labelTh: "ควบคุมคุณภาพ",
        subs: [
          "Product Inspection",
          "Sampling & Testing",
          "Defect Sorting",
          "Quality Reporting",
          "Compliance Check",
        ],
      },
      documentation: {
        label: "Documentation Services",
        labelTh: "บริการเอกสาร",
        subs: [
          "Bill of Lading",
          "Commercial Invoice",
          "Packing List",
          "Insurance Certificate",
          "Shipping Instructions",
        ],
      },
    },
  },
  insurance: {
    label: "Insurance Services",
    labelTh: "บริการประกันภัย",
    mains: {
      "cargo-insurance": {
        label: "Cargo Insurance",
        labelTh: "ประกันสินค้า",
        subs: [
          "All Risk Coverage",
          "Marine Insurance",
          "Air Cargo Insurance",
          "Warehouse Insurance",
          "Transit Insurance",
        ],
      },
      "liability-insurance": {
        label: "Liability Insurance",
        labelTh: "ประกันความรับผิด",
        subs: [
          "Public Liability",
          "Product Liability",
          "Professional Indemnity",
          "Errors & Omissions",
        ],
      },
    },
  },
  technology: {
    label: "Technology & Solutions",
    labelTh: "เทคโนโลยีและโซลูชัน",
    mains: {
      "track-trace": {
        label: "Track & Trace",
        labelTh: "ติดตามสินค้า",
        subs: [
          "Real-time Tracking",
          "GPS Monitoring",
          "IoT Sensors",
          "Temperature Monitoring",
          "Security Tracking",
        ],
      },
      "tms-wms": {
        label: "TMS & WMS",
        labelTh: "ระบบจัดการขนส่งและคลังสินค้า",
        subs: [
          "Transport Management",
          "Warehouse Management",
          "Inventory Visibility",
          "Order Management",
          "Route Optimization",
        ],
      },
      integration: {
        label: "System Integration",
        labelTh: "การเชื่อมต่อระบบ",
        subs: [
          "API Integration",
          "EDI Services",
          "ERP Integration",
          "E-commerce Integration",
          "Custom Development",
        ],
      },
    },
  },
};

export function CreateQuotationWizard({
  isOpen,
  onClose,
}: CreateQuotationWizardProps) {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6; // เพิ่มจาก 5 เป็น 6 steps

  // Step 1: Basic Information
  const [quoteNumber, setQuoteNumber] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [validityPeriod, setValidityPeriod] = useState("30");
  const [currency, setCurrency] = useState("");
  const [businessUnit, setBusinessUnit] = useState("");
  const [serviceType, setServiceType] = useState(""); // New: Service Type selection
  const [paymentTerms, setPaymentTerms] = useState("");
  const [includeVAT, setIncludeVAT] = useState(true);
  const [status, setStatus] = useState("");
  
  // Quotation Type Selection
  const [quotationType, setQuotationType] = useState<"single" | "multi-same-bu" | "multi-diff-bu">("single");
  const [separateByBU, setSeparateByBU] = useState(false);

  // Step 2: Customer Information - Support Multiple Customers
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [customerSearchQuery, setCustomerSearchQuery] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  // IMPORTANT: Billing addresses are now stored per customer (customerId => address)
  // This allows each selected customer to have their own unique billing address
  // Example: If you select 10 customers, you'll have 10 separate billing addresses
  const [billingAddresses, setBillingAddresses] = useState<{ [customerId: string]: string }>({});
  // IMPORTANT: Shipping addresses are now also stored per customer (customerId => address)
  const [shippingAddresses, setShippingAddresses] = useState<{ [customerId: string]: string }>({});
  
  // Available customers list with detailed information
  const availableCustomers = [
    { 
      id: "global-freight", 
      name: "Global Freight Solutions Inc.", 
      industry: "Logistics",
      contactPerson: "John Anderson",
      contactEmail: "j.anderson@globalfreight.com",
      contactPhone: "+66 2 123 4567",
      billingAddress: "123 Sukhumvit Road, Khlong Toei, Bangkok 10110, Thailand",
      shippingAddress: "123 Sukhumvit Road, Khlong Toei, Bangkok 10110, Thailand"
    },
    { 
      id: "pacific", 
      name: "Pacific Distribution Co.", 
      industry: "Distribution",
      contactPerson: "Sarah Chen",
      contactEmail: "s.chen@pacificdist.com",
      contactPhone: "+66 2 234 5678",
      billingAddress: "456 Rama IV Road, Pathum Wan, Bangkok 10330, Thailand",
      shippingAddress: "789 Bangna-Trad Road, Bang Phli, Samut Prakan 10540, Thailand"
    },
    { 
      id: "fasttrack", 
      name: "FastTrack Express", 
      industry: "Express Delivery",
      contactPerson: "Michael Wong",
      contactEmail: "m.wong@fasttrack.com",
      contactPhone: "+66 2 345 6789",
      billingAddress: "321 Petchburi Road, Ratchathewi, Bangkok 10400, Thailand",
      shippingAddress: "321 Petchburi Road, Ratchathewi, Bangkok 10400, Thailand"
    },
    { 
      id: "pharma", 
      name: "PharmaCare Global", 
      industry: "Pharmaceutical",
      contactPerson: "Dr. Lisa Thompson",
      contactEmail: "l.thompson@pharmacare.com",
      contactPhone: "+66 2 456 7890",
      billingAddress: "555 Chaeng Watthana Road, Pak Kret, Nonthaburi 11120, Thailand",
      shippingAddress: "555 Chaeng Watthana Road, Pak Kret, Nonthaburi 11120, Thailand"
    },
    { 
      id: "asian-trade", 
      name: "Asian Trade Corp", 
      industry: "Import/Export",
      contactPerson: "David Kim",
      contactEmail: "d.kim@asiantrade.com",
      contactPhone: "+66 2 567 8901",
      billingAddress: "888 Silom Road, Bang Rak, Bangkok 10500, Thailand",
      shippingAddress: "999 Laem Chabang Port, Si Racha, Chonburi 20230, Thailand"
    },
    { 
      id: "euro-shipping", 
      name: "Euro Shipping Solutions", 
      industry: "Maritime",
      contactPerson: "Hans Mueller",
      contactEmail: "h.mueller@euroshipping.com",
      contactPhone: "+66 2 678 9012",
      billingAddress: "777 Sathorn Road, Yan Nawa, Bangkok 10120, Thailand",
      shippingAddress: "777 Sathorn Road, Yan Nawa, Bangkok 10120, Thailand"
    },
    { 
      id: "thai-logistics", 
      name: "Thai Logistics Alliance", 
      industry: "Freight Forwarding",
      contactPerson: "Somchai Tanaka",
      contactEmail: "s.tanaka@thailogistics.com",
      contactPhone: "+66 2 789 0123",
      billingAddress: "1234 Ratchadaphisek Road, Huai Khwang, Bangkok 10310, Thailand",
      shippingAddress: "1234 Ratchadaphisek Road, Huai Khwang, Bangkok 10310, Thailand"
    },
    { 
      id: "metro-warehouse", 
      name: "Metro Warehouse Solutions", 
      industry: "Warehousing",
      contactPerson: "Amanda Lee",
      contactEmail: "a.lee@metrowarehouse.com",
      contactPhone: "+66 2 890 1234",
      billingAddress: "567 Bangna-Trad Road, Bang Kaeo, Samut Prakan 10560, Thailand",
      shippingAddress: "567 Bangna-Trad Road, Bang Kaeo, Samut Prakan 10560, Thailand"
    },
    { 
      id: "coastal-freight", 
      name: "Coastal Freight Services", 
      industry: "Ocean Freight",
      contactPerson: "Captain James Rodriguez",
      contactEmail: "j.rodriguez@coastalfreight.com",
      contactPhone: "+66 2 901 2345",
      billingAddress: "888 Sukhumvit 107, Samrong Nuea, Samut Prakan 10270, Thailand",
      shippingAddress: "100 Laem Chabang Industrial Estate, Chonburi 20130, Thailand"
    },
    { 
      id: "crown-moving", 
      name: "Crown International Moving", 
      industry: "Relocation Services",
      contactPerson: "Patricia Williams",
      contactEmail: "p.williams@crowninternational.com",
      contactPhone: "+66 2 012 3456",
      billingAddress: "456 Vibhavadi Rangsit Road, Chatuchak, Bangkok 10900, Thailand",
      shippingAddress: "456 Vibhavadi Rangsit Road, Chatuchak, Bangkok 10900, Thailand"
    },
  ];
  
  // Step 3: Deal Selection (NEW)
  const [selectedDeals, setSelectedDeals] = useState<string[]>([]);
  const [dealSearchQuery, setDealSearchQuery] = useState("");
  const [availableDeals, setAvailableDeals] = useState([
    { id: "deal-001", name: "Bangkok Warehouse Expansion", bu: "warehousing", customer: "global-freight" },
    { id: "deal-002", name: "Chonburi Distribution Center", bu: "distribution", customer: "global-freight" },
    { id: "deal-003", name: "International Air Freight Q1", bu: "air-freight", customer: "global-freight" },
    { id: "deal-004", name: "Ocean Freight - Export", bu: "sea-freight", customer: "pacific" },
    { id: "deal-005", name: "Cold Chain Logistics", bu: "warehousing", customer: "pharma" },
    { id: "deal-006", name: "Cross Border Transport", bu: "land-freight", customer: "fasttrack" },
    { id: "deal-007", name: "E-commerce Fulfillment", bu: "warehousing", customer: "global-freight" },
    { id: "deal-008", name: "Last Mile Delivery Network", bu: "distribution", customer: "fasttrack" },
    { id: "deal-009", name: "Customs Clearance Services", bu: "customs", customer: "pacific" },
    { id: "deal-010", name: "Tech Integration Project", bu: "technology", customer: "global-freight" },
  ]);

  // Step 4: Line Items (modified to include project reference)
  const [lineItems, setLineItems] = useState<LineItem[]>([
    {
      id: "1",
      service: "",
      groupService: "",
      mainService: "",
      subService: "",
      description: "",
      quantity: 1,
      unitPrice: 0,
      discount: 0,
      vat: 7,
    },
  ]);

  // Step 5: Documents
  const [notes, setNotes] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  // Step 6: Approval Information
  const [approverName, setApproverName] = useState("");
  const [approverEmail, setApproverEmail] = useState("");
  const [approverPosition, setApproverPosition] = useState("");
  const [approverLevel, setApproverLevel] = useState("");
  
  // Mock Approver Data - Auto Approval by Sales Hierarchy
  const approverData = {
    manager: {
      name: "Somchai Wongsakul",
      nameEn: "Somchai Wongsakul", 
      nameTh: "สมชาย วงศ์สกุล",
      email: "somchai.w@onelink.co.th",
      position: "Sales Manager",
      positionTh: "ผู้จัดการฝ่ายขาย",
      level: "Manager",
      threshold: 100000
    },
    director: {
      name: "Siriporn Tancharoen",
      nameEn: "Siriporn Tancharoen",
      nameTh: "ศิริพร ธัญเจริญ", 
      email: "siriporn.t@onelink.co.th",
      position: "Sales Director",
      positionTh: "ผู้อำนวยการฝ่ายขาย",
      level: "Director",
      threshold: 500000
    },
    ceo: {
      name: "Wanchai Ruangsri",
      nameEn: "Wanchai Ruangsri",
      nameTh: "วันชัย เรืองศรี",
      email: "wanchai.r@onelink.co.th",
      position: "Chief Executive Officer",
      positionTh: "ประธานเจ้าหน้าที่บริหาร",
      level: "CEO",
      threshold: Infinity
    }
  };

  // Auto-select approver based on grand total
  useEffect(() => {
    const { grandTotal } = calculateTotals();
    
    let selectedApprover;
    if (grandTotal < 100000) {
      selectedApprover = approverData.manager;
    } else if (grandTotal >= 100000 && grandTotal < 500000) {
      selectedApprover = approverData.director;
    } else {
      selectedApprover = approverData.ceo;
    }
    
    setApproverName(selectedApprover.name);
    setApproverEmail(selectedApprover.email);
    setApproverPosition(selectedApprover.position);
    setApproverLevel(selectedApprover.level);
  }, [lineItems]); // Recalculate when line items change
  
  // Collapsible quotations state - track which quotations are collapsed
  const [collapsedQuotations, setCollapsedQuotations] = useState<{ [customerId: string]: boolean }>({});

  const toggleQuotation = (customerId: string) => {
    setCollapsedQuotations(prev => ({
      ...prev,
      [customerId]: !prev[customerId]
    }));
  };
  
  // Service search state for each line item
  const [serviceSearchQueries, setServiceSearchQueries] = useState<{ [itemId: string]: string }>({});

  const steps = [
    { number: 1, label: t("quotations.steps.setup") },
    { number: 2, label: t("quotations.steps.customer") },
    { number: 3, label: t("quotations.steps.projects") }, // Deals step
    { number: 4, label: t("quotations.steps.items") },
    { number: 5, label: t("quotations.steps.documents") },
    { number: 6, label: t("quotations.steps.review") },
  ];

  // Auto-fill contact person and addresses when customers are selected
  useEffect(() => {
    if (selectedCustomers.length > 0) {
      const selectedCustomerData = availableCustomers.filter(
        c => selectedCustomers.includes(c.id)
      );
      
      // Auto-fill billing addresses for each selected customer
      const newBillingAddresses: { [customerId: string]: string } = {};
      selectedCustomerData.forEach(customer => {
        // Only auto-fill if not already set (preserve user edits)
        if (!billingAddresses[customer.id]) {
          newBillingAddresses[customer.id] = customer.billingAddress;
        } else {
          newBillingAddresses[customer.id] = billingAddresses[customer.id];
        }
      });
      setBillingAddresses(newBillingAddresses);
      
      // Auto-fill contact person and shipping addresses
      if (selectedCustomers.length === 1) {
        // Single customer - use their contact person
        const customer = selectedCustomerData[0];
        setContactPerson(customer.contactPerson);
        
        // Auto-fill shipping address if not already set
        if (!shippingAddresses[customer.id]) {
          setShippingAddresses(prev => ({
            ...prev,
            [customer.id]: customer.shippingAddress
          }));
        }
      } else {
        // Multiple customers - combine contact persons
        const contactPersons = selectedCustomerData
          .map(c => `${c.contactPerson} (${c.name})`)
          .join("; ");
        
        setContactPerson(contactPersons);
        
        // Auto-fill shipping addresses for each customer if not already set
        const newShippingAddresses = { ...shippingAddresses };
        selectedCustomerData.forEach(customer => {
          if (!newShippingAddresses[customer.id]) {
            newShippingAddresses[customer.id] = customer.shippingAddress;
          }
        });
        setShippingAddresses(newShippingAddresses);
      }
    }
    // Note: We don't clear fields when deselecting to preserve user edits
  }, [selectedCustomers]);

  // Helper: Build flat service list for single dropdown
  const getAllServicesFlat = (searchQuery: string = "") => {
    const flatList: Array<{
      value: string;
      label: string;
      group: string;
      groupLabel: string;
      main: string;
      mainLabel: string;
      isHeader?: boolean;
      searchText?: string;
    }> = [];

    const query = searchQuery.toLowerCase().trim();

    Object.entries(serviceHierarchy).forEach(([groupKey, groupData]) => {
      Object.entries(groupData.mains).forEach(([mainKey, mainData]) => {
        const groupLabel = groupData.label.replace(' Services', '');
        const mainLabel = mainData.label;
        
        // Filter subs by search query
        const filteredSubs = mainData.subs.filter((sub) => {
          if (!query) return true;
          const searchText = `${groupLabel} ${mainLabel} ${sub}`.toLowerCase();
          return searchText.includes(query);
        });

        // Only add header if there are matching subs
        if (filteredSubs.length > 0) {
          flatList.push({
            value: `header-${groupKey}-${mainKey}`,
            label: `${groupLabel} › ${mainLabel}`,
            group: groupKey,
            groupLabel: groupLabel,
            main: mainKey,
            mainLabel: mainLabel,
            isHeader: true,
          });

          // Add filtered subs
          filteredSubs.forEach((sub) => {
            flatList.push({
              value: `${groupKey}|${mainKey}|${sub}`,
              label: sub,
              group: groupKey,
              groupLabel: groupLabel,
              main: mainKey,
              mainLabel: mainLabel,
              searchText: `${groupLabel} ${mainLabel} ${sub}`.toLowerCase(),
            });
          });
        }
      });
    });

    return flatList;
  };

  const buildDescription = (item: LineItem) => {
    const parts = [];
    if (item.service && serviceHierarchy[item.service]) {
      parts.push(serviceHierarchy[item.service].label);
    }
    if (
      item.service &&
      item.groupService &&
      serviceHierarchy[item.service]?.groups[item.groupService]
    ) {
      parts.push(
        serviceHierarchy[item.service].groups[item.groupService].label
      );
    }
    if (
      item.service &&
      item.groupService &&
      item.mainService &&
      serviceHierarchy[item.service]?.groups[item.groupService]?.mains[
        item.mainService
      ]
    ) {
      parts.push(
        serviceHierarchy[item.service].groups[item.groupService].mains[
          item.mainService
        ].label
      );
    }
    if (item.subService) {
      parts.push(item.subService);
    }
    return parts.join(" > ");
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // TODO: Handle submission
    console.log("Submitting quotation...");
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setCurrentStep(1);
    setQuoteNumber("");
    setIssueDate("");
    setValidityPeriod("30");
    setCurrency("");
    setBusinessUnit("");
    setServiceType("");
    setPaymentTerms("");
    setIncludeVAT(true);
    setStatus("");
    setSelectedCustomers([]);
    setCustomerSearchQuery("");
    setContactPerson("");
    setBillingAddresses({});
    setShippingAddresses({});
    setSelectedDeals([]);
    setLineItems([
      {
        id: "1",
        service: "",
        groupService: "",
        mainService: "",
        subService: "",
        description: "",
        quantity: 1,
        unitPrice: 0,
        discount: 0,
        vat: 7,
      },
    ]);
    setNotes("");
    setUploadedFiles([]);
  };

  const addLineItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      service: "",
      groupService: "",
      mainService: "",
      subService: "",
      description: "",
      quantity: 1,
      unitPrice: 0,
      discount: 0,
      vat: 7,
    };
    setLineItems([...lineItems, newItem]);
  };

  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((item) => item.id !== id));
    }
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: any) => {
    setLineItems(
      lineItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          // Auto-update description when any service field changes
          if (
            field === "service" ||
            field === "groupService" ||
            field === "mainService" ||
            field === "subService"
          ) {
            updatedItem.description = buildDescription(updatedItem);
          }
          return updatedItem;
        }
        return item;
      })
    );
  };

  const calculateLineTotal = (item: LineItem) => {
    const subtotal = item.quantity * item.unitPrice;
    const afterDiscount = subtotal * (1 - item.discount / 100);
    const total = afterDiscount * (1 + item.vat / 100);
    return total;
  };

  const calculateTotals = () => {
    const subtotal = lineItems.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );
    const totalDiscount = lineItems.reduce(
      (sum, item) =>
        sum + item.quantity * item.unitPrice * (item.discount / 100),
      0
    );
    const afterDiscount = subtotal - totalDiscount;
    const totalVAT = lineItems.reduce((sum, item) => {
      const itemSubtotal = item.quantity * item.unitPrice;
      const itemAfterDiscount = itemSubtotal * (1 - item.discount / 100);
      return sum + itemAfterDiscount * (item.vat / 100);
    }, 0);
    const grandTotal = afterDiscount + totalVAT;

    return { subtotal, totalDiscount, totalVAT, grandTotal };
  };

  const totals = calculateTotals();

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            {/* Quote Number */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-medium text-[#4c1d95]">
                  {t("quotations.quote_number")}{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={quoteNumber}
                  onChange={(e) => setQuoteNumber(e.target.value)}
                  placeholder="QT-2024-XXX"
                  className="border-[#ede9fe] focus:border-[#705add]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium text-[#4c1d95]">
                  {t("quotations.status")}{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Combobox
                  options={[
                    { value: "draft", label: t("status.draft") },
                    { value: "pending", label: t("status.pending") },
                    { value: "approved", label: t("status.approved") },
                  ]}
                  value={status}
                  onValueChange={setStatus}
                  placeholder={t("quotations.select_status")}
                  searchPlaceholder="Search..."
                />
              </div>
            </div>

            {/* Issue Date & Validity */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-medium text-[#4c1d95]">
                  {t("quotations.issue_date")}{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    className="border-[#ede9fe] focus:border-[#705add]"
                    required
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8b5cf6] pointer-events-none" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium text-[#4c1d95]">
                  {t("quotations.validity_period")}{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={validityPeriod}
                    onChange={(e) => setValidityPeriod(e.target.value)}
                    className="border-[#ede9fe] focus:border-[#705add]"
                    required
                  />
                  <span className="flex items-center text-xs text-[#8b5cf6] whitespace-nowrap">
                    {t("quotations.days")}
                  </span>
                </div>
              </div>
            </div>

            {/* Currency & Business Unit */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-medium text-[#4c1d95]">
                  {t("quotations.currency")}{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Combobox
                  options={[
                    { value: "usd", label: "USD ($)" },
                    { value: "thb", label: "THB (฿)" },
                    { value: "eur", label: "EUR (€)" },
                    { value: "gbp", label: "GBP (£)" },
                    { value: "jpy", label: "JPY (¥)" },
                  ]}
                  value={currency}
                  onValueChange={setCurrency}
                  placeholder={t("quotations.select_currency")}
                  searchPlaceholder="Search..."
                  className="border-[#ede9fe] focus:border-[#705add]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium text-[#4c1d95]">
                  {t("quotations.business_unit")}{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Combobox
                  options={[
                    { value: "air-freight", label: "Air Freight" },
                    { value: "sea-freight", label: "Sea Freight" },
                    { value: "warehousing", label: "Warehousing" },
                    { value: "distribution", label: "Distribution" },
                  ]}
                  value={businessUnit}
                  onValueChange={setBusinessUnit}
                  placeholder={t("quotations.select_business_unit")}
                  searchPlaceholder="Search..."
                  className="border-[#ede9fe] focus:border-[#705add]"
                />
              </div>
            </div>

            {/* Service Type */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[#4c1d95]">
                ประเภท Service: <span className="text-red-500">*</span>
              </Label>
              <Combobox
                options={[
                  { value: "all", label: "ทั้งหมด" },
                  { value: "01-freight", label: "01 Freight" },
                  { value: "02-customs", label: "02 Customs" },
                  { value: "03-warehouse", label: "03 Warehouse" },
                  { value: "04-transportation", label: "04 Transportation" },
                  { value: "05-cross-border", label: "05 Cross Border" },
                  { value: "06-trading", label: "06 Trading" },
                  { value: "07-service", label: "07 Service" },
                  { value: "08-it", label: "08 IT" },
                  { value: "09-telematics", label: "09 Telematics" },
                  { value: "10-other", label: "10 Other" },
                  { value: "11-unknown", label: "11 Unknown" },
                ]}
                value={serviceType}
                onValueChange={setServiceType}
                placeholder="ทั้งหมด"
                searchPlaceholder="Search..."
                className="border-[#ede9fe] focus:border-[#705add]"
              />
            </div>

            {/* Payment Terms */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[#4c1d95]">
                {t("quotations.payment_terms")}{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Combobox
                options={[
                  { value: "net30", label: "Net 30 days" },
                  { value: "net60", label: "Net 60 days" },
                  { value: "advance", label: "Advance payment" },
                  { value: "cod", label: "Cash on delivery" },
                ]}
                value={paymentTerms}
                onValueChange={setPaymentTerms}
                placeholder={t("quotations.select_payment_terms")}
                searchPlaceholder="Search..."
                className="border-[#ede9fe] focus:border-[#705add]"
              />
            </div>

            {/* Include VAT */}
            <div className="flex items-center space-x-2 p-3 bg-[#f5f3ff] rounded-lg border border-[#ede9fe]">
              <Checkbox
                id="vat"
                checked={includeVAT}
                onCheckedChange={(checked) => setIncludeVAT(checked as boolean)}
              />
              <Label
                htmlFor="vat"
                className="text-xs font-medium text-[#4c1d95] cursor-pointer"
              >
                {t("quotations.vat_notice")}
              </Label>
            </div>
          </div>
        );

      case 2:
        const filteredCustomers = availableCustomers.filter(c =>
          c.name.toLowerCase().includes(customerSearchQuery.toLowerCase()) ||
          c.industry.toLowerCase().includes(customerSearchQuery.toLowerCase()) ||
          c.contactPerson.toLowerCase().includes(customerSearchQuery.toLowerCase()) ||
          c.contactEmail.toLowerCase().includes(customerSearchQuery.toLowerCase())
        );

        return (
          <div className="space-y-4">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#f5f3ff] to-[#ede9fe] p-4 rounded-xl border border-[#c4b5fd]">
              <h3 className="text-lg font-semibold text-[#4c1d95] mb-2">
                {t("quotations.customer_information")}
              </h3>
              <p className="text-xs text-[#8b5cf6]">
                {t("quotations.select_multiple_customers_desc") || "You can select multiple customers for this quotation"}
              </p>
            </div>

            {/* Customer Single-Selection with Autocomplete */}
            <div className="space-y-3">
              <Label className="text-xs font-medium text-[#4c1d95]">
                {t("quotations.customer_name")}{" "}
                <span className="text-red-500">*</span>
              </Label>
              
              {/* Searchable Dropdown with Auto-suggestion */}
              <div className="relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8b5cf6] z-10" />
                  <Input
                    value={customerSearchQuery}
                    onChange={(e) => {
                      setCustomerSearchQuery(e.target.value);
                      // Clear selection when typing
                      if (e.target.value && selectedCustomers.length > 0) {
                        const selectedCustomer = availableCustomers.find(c => c.id === selectedCustomers[0]);
                        if (selectedCustomer && !selectedCustomer.name.toLowerCase().includes(e.target.value.toLowerCase())) {
                          setSelectedCustomers([]);
                        }
                      }
                    }}
                    onFocus={() => setCustomerSearchQuery(customerSearchQuery || "")}
                    placeholder={
                      selectedCustomers.length > 0
                        ? availableCustomers.find(c => c.id === selectedCustomers[0])?.name
                        : "ค้นหาชื่อลูกค้า/บริษัท..."
                    }
                    className="pl-10 pr-10 border-[#ede9fe] focus:border-[#705add] h-11"
                  />
                  {(customerSearchQuery || selectedCustomers.length > 0) && (
                    <button
                      type="button"
                      onClick={() => {
                        setCustomerSearchQuery("");
                        setSelectedCustomers([]);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b5cf6] hover:text-[#705add] z-10"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Auto-suggestion Dropdown */}
                {customerSearchQuery && filteredCustomers.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-[#ede9fe] rounded-lg shadow-lg max-h-80 overflow-y-auto">
                    {filteredCustomers.map((customer) => (
                      <div
                        key={customer.id}
                        className={`flex items-start gap-3 p-3 hover:bg-[#f5f3ff] cursor-pointer transition-colors border-b border-[#ede9fe] last:border-b-0 ${
                          selectedCustomers.includes(customer.id) ? "bg-[#f5f3ff]" : ""
                        }`}
                        onClick={() => {
                          setSelectedCustomers([customer.id]);
                          setCustomerSearchQuery("");
                        }}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#4c1d95] mb-1">
                            {customer.name}
                          </p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                              {customer.industry}
                            </span>
                            <span className="text-xs text-[#8b5cf6]">
                              {customer.contactPerson}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {customer.contactEmail} • {customer.contactPhone}
                          </p>
                        </div>
                        {selectedCustomers.includes(customer.id) && (
                          <CheckCircle2 className="h-5 w-5 text-[#705add] flex-shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* No Results */}
                {customerSearchQuery && filteredCustomers.length === 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-[#ede9fe] rounded-lg shadow-lg p-4">
                    <p className="text-sm text-gray-500 text-center">
                      ไม่พบลูกค้า "{customerSearchQuery}"
                    </p>
                  </div>
                )}
              </div>

              {/* Selected Customer Display */}
              {selectedCustomers.length > 0 && !customerSearchQuery && (
                <div className="border-2 border-[#705add] rounded-lg p-4 bg-gradient-to-br from-white to-[#faf8ff]">
                  {selectedCustomers.map((customerId) => {
                    const customer = availableCustomers.find(c => c.id === customerId);
                    if (!customer) return null;
                    
                    return (
                      <div key={customerId} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-[#705add]" />
                            <span className="text-sm font-semibold text-[#4c1d95]">
                              {customer.name}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setSelectedCustomers([])}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-[#8b5cf6]">Industry:</span>
                            <p className="font-medium text-[#4c1d95]">{customer.industry}</p>
                          </div>
                          <div>
                            <span className="text-[#8b5cf6]">Contact:</span>
                            <p className="font-medium text-[#4c1d95]">{customer.contactPerson}</p>
                          </div>
                          <div className="col-span-2">
                            <span className="text-[#8b5cf6]">Email:</span>
                            <p className="font-medium text-[#4c1d95]">{customer.contactEmail}</p>
                          </div>
                          <div className="col-span-2">
                            <span className="text-[#8b5cf6]">Phone:</span>
                            <p className="font-medium text-[#4c1d95]">{customer.contactPhone}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Auto-fill Notice */}
            {selectedCustomers.length > 0 && (
              <div className="flex items-start gap-2 p-3 bg-[#f0fdf4] rounded-lg border border-[#86efac]">
                <CheckCircle2 className="h-5 w-5 text-[#22c55e] flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#166534]">
                    {t("quotations.auto_filled") || "Information Auto-Filled"}
                  </p>
                  <p className="text-xs text-[#15803d] mt-1">
                    {selectedCustomers.length === 1
                      ? t("quotations.auto_filled_desc_single") || "Contact and address information has been automatically filled from the selected customer. You can modify them as needed."
                      : t("quotations.auto_filled_desc_multiple") || `Contact information from ${selectedCustomers.length} selected customers has been combined. Please review and adjust as needed.`
                    }
                  </p>
                </div>
              </div>
            )}

            {/* Contact Person */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[#4c1d95]">
                {t("quotations.contact_person")}{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                placeholder={t("quotations.enter_contact_person")}
                className="border-[#ede9fe] focus:border-[#705add]"
                required
              />
            </div>

            {/* Billing Addresses - Per Customer */}
            <div className="space-y-3">
              <Label className="text-xs font-medium text-[#4c1d95]">
                {t("quotations.billing_address")}{" "}
                <span className="text-red-500">*</span>
              </Label>
              
              {selectedCustomers.length > 0 ? (
                <div className="space-y-3">
                  {selectedCustomers.map((customerId) => {
                    const customer = availableCustomers.find(c => c.id === customerId);
                    if (!customer) return null;
                    
                    return (
                      <div key={customerId} className="border border-[#ede9fe] rounded-lg p-4 bg-gradient-to-br from-white to-[#faf8ff]">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-[#705add]"></div>
                            <span className="text-sm font-semibold text-[#4c1d95]">
                              {customer.name}
                            </span>
                          </div>
                          <span className="text-xs text-[#8b5cf6] bg-[#f5f3ff] px-2 py-1 rounded">
                            {customer.industry}
                          </span>
                        </div>
                        <Textarea
                          value={billingAddresses[customerId] || ""}
                          onChange={(e) => {
                            setBillingAddresses({
                              ...billingAddresses,
                              [customerId]: e.target.value
                            });
                          }}
                          placeholder={t("quotations.enter_billing_address")}
                          className="border-[#c4b5fd] focus:border-[#705add] bg-white"
                          rows={3}
                          required
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="border border-dashed border-[#c4b5fd] rounded-lg p-6 text-center">
                  <p className="text-sm text-[#8b5cf6]">
                    {t("quotations.select_customer_to_add_billing") || "Please select customer(s) first to add billing addresses"}
                  </p>
                </div>
              )}
            </div>

            {/* Shipping Address - Multiple Addresses */}
            <div className="space-y-3">
              <Label className="text-xs font-medium text-[#4c1d95]">
                {t("quotations.shipping_address")}
              </Label>
              
              {selectedCustomers.length > 0 ? (
                <div className="space-y-3">
                  {selectedCustomers.map((customerId) => {
                    const customer = availableCustomers.find(c => c.id === customerId);
                    if (!customer) return null;
                    
                    return (
                      <div key={customerId} className="p-3 border-2 border-[#ede9fe] rounded-lg bg-white hover:border-[#c4b5fd] transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <Label className="text-xs font-semibold text-[#705add]">
                            {customer.name}
                          </Label>
                          {billingAddresses[customerId] && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => setShippingAddresses(prev => ({
                                ...prev,
                                [customerId]: billingAddresses[customerId]
                              }))}
                              className="text-xs text-[#705add] hover:bg-[#f5f3ff] h-6"
                            >
                              {t("quotations.copy_from_billing") || "Copy from billing"}
                            </Button>
                          )}
                        </div>
                        <Textarea
                          value={shippingAddresses[customerId] || ""}
                          onChange={(e) => setShippingAddresses(prev => ({
                            ...prev,
                            [customerId]: e.target.value
                          }))}
                          placeholder={t("quotations.enter_shipping_address")}
                          className="border-[#ede9fe] focus:border-[#705add] text-sm"
                          rows={3}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="border border-dashed border-[#c4b5fd] rounded-lg p-6 text-center">
                  <p className="text-sm text-[#8b5cf6]">
                    {t("quotations.select_customer_to_add_shipping") || "Please select customer(s) first to add shipping addresses"}
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        // Get deals for selected customers - now supports multiple customers
        const customerDeals = selectedCustomers.length > 0
          ? availableDeals.filter(d => selectedCustomers.includes(d.customer))
          : availableDeals;
        
        // Filter deals by search query
        const filteredDeals = customerDeals.filter(d => 
          d.name.toLowerCase().includes(dealSearchQuery.toLowerCase()) ||
          d.bu.toLowerCase().includes(dealSearchQuery.toLowerCase()) ||
          d.id.toLowerCase().includes(dealSearchQuery.toLowerCase())
        );
        
        const selectedDealsData = availableDeals.filter(d => 
          selectedDeals.includes(d.id)
        );
        const uniqueBUs = [...new Set(selectedDealsData.map(d => d.bu))];
        const hasMultipleBUs = uniqueBUs.length > 1;
        
        return (
          <div className="space-y-4">
            {/* Header with Optional Notice */}
            <div className="bg-gradient-to-r from-[#f5f3ff] to-[#ede9fe] p-4 rounded-xl border border-[#c4b5fd]">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#4c1d95] mb-2">
                    {t("quotations.deal_selection")} 
                    <span className="ml-2 text-xs font-normal text-[#8b5cf6] bg-[#ede9fe] px-2 py-1 rounded">
                      {t("common.optional") || "Optional"}
                    </span>
                  </h3>
                  <p className="text-xs text-[#8b5cf6]">
                    {t("quotations.deal_selection_optional_desc") || "Link this quotation to existing deals (optional). You can create quotations without selecting any deals."}
                  </p>
                </div>
              </div>
            </div>

            {/* Search and Select Deals */}
            <div className="space-y-3">
              <Label className="text-xs font-medium text-[#4c1d95]">
                {selectedCustomers.length > 0 
                  ? `${t("quotations.available_deals_for")} ${selectedCustomers.length} ${t("common.customers")}`
                  : t("quotations.available_deals")}
              </Label>
              
              {/* Multi-Select Dropdown Trigger */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-between border-[#ede9fe] hover:border-[#705add] hover:bg-[#faf8ff] text-left font-normal"
                  >
                    <span className="text-sm">
                      {selectedDeals.length === 0 ? (
                        <span className="text-[#8b5cf6]">
                          {customerDeals.length === 0 
                            ? t("quotations.select_customer_first")
                            : t("quotations.select_deals")}
                        </span>
                      ) : (
                        <span className="text-[#4c1d95]">
                          {selectedDeals.length} {t("quotations.deals_count")} {t("quotations.selected")}
                        </span>
                      )}
                    </span>
                    <ChevronDown className="h-4 w-4 text-[#8b5cf6]" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0" align="start">
                  <div className="p-3 border-b border-[#ede9fe] bg-gradient-to-br from-[#faf8ff] to-white">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold text-[#4c1d95]">
                        {t("quotations.select_deals")}
                      </h4>
                      {filteredDeals.length > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const allFilteredIds = filteredDeals.map(d => d.id);
                            const allSelected = allFilteredIds.every(id => selectedDeals.includes(id));
                            
                            if (allSelected) {
                              setSelectedDeals(selectedDeals.filter(id => !allFilteredIds.includes(id)));
                            } else {
                              const newSelection = [...new Set([...selectedDeals, ...allFilteredIds])];
                              setSelectedDeals(newSelection);
                            }
                          }}
                          className="text-xs text-[#705add] hover:text-[#6d28d9] hover:bg-[#f5f3ff]"
                        >
                          {filteredDeals.every(d => selectedDeals.includes(d.id)) 
                            ? t("quotations.deselect_all")
                            : t("quotations.select_all")
                          }
                        </Button>
                      )}
                    </div>
                    {/* Search Box */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8b5cf6]" />
                      <Input
                        value={dealSearchQuery}
                        onChange={(e) => setDealSearchQuery(e.target.value)}
                        placeholder={t("common.search") + "..."}
                        className="pl-10 pr-10 border-[#ede9fe] focus:border-[#705add] text-sm"
                        onClick={(e) => e.stopPropagation()}
                      />
                      {dealSearchQuery && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setDealSearchQuery("");
                          }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b5cf6] hover:text-[#705add]"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Deal List */}
                  <div className="max-h-[280px] overflow-y-auto">
                    {filteredDeals.length === 0 ? (
                      <div className="p-8 text-center text-sm text-[#8b5cf6]">
                        {dealSearchQuery 
                          ? t("common.no_results_found")
                          : t("quotations.no_deals_available")}
                      </div>
                    ) : (
                      filteredDeals.map((deal) => {
                        const isSelected = selectedDeals.includes(deal.id);
                        return (
                          <div
                            key={deal.id}
                            className={`flex items-center gap-3 p-3 border-b border-[#ede9fe] hover:bg-[#faf8ff] transition-colors cursor-pointer ${
                              isSelected ? 'bg-[#f5f3ff]' : ''
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              if (isSelected) {
                                setSelectedDeals(selectedDeals.filter(id => id !== deal.id));
                              } else {
                                setSelectedDeals([...selectedDeals, deal.id]);
                              }
                            }}
                          >
                            <Checkbox
                              id={deal.id}
                              checked={isSelected}
                              className="border-[#c4b5fd] pointer-events-none"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-medium text-[#4c1d95]">{deal.name}</span>
                                <span className="text-xs px-2 py-0.5 bg-gradient-to-r from-[#a78bfa] to-[#705add] text-white rounded-full font-medium">
                                  {deal.bu}
                                </span>
                              </div>
                              <div className="text-xs text-[#8b5cf6] mt-0.5">ID: {deal.id}</div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Footer Stats */}
                  {customerDeals.length > 0 && (
                    <div className="p-2 border-t border-[#ede9fe] bg-[#faf8ff] flex items-center justify-between text-xs">
                      <span className="text-[#8b5cf6]">
                        {filteredDeals.length} {t("quotations.deals_count")} {t("quotations.available")}
                      </span>
                      {selectedDeals.length > 0 && (
                        <span className="font-semibold text-[#705add]">
                          {selectedDeals.length} {t("quotations.selected")}
                        </span>
                      )}
                    </div>
                  )}
                </PopoverContent>
              </Popover>

              {/* Info Message - Standalone Quotation */}
              {selectedDeals.length === 0 && customerDeals.length > 0 && (
                <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <FileText className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-blue-700">
                    ไม่ได้เลือกดีล - ใบเสนอราคาจะถูกสร้างแบบอิสระ
                  </p>
                </div>
              )}

              {/* Selected Deals Display */}
              {selectedDeals.length > 0 && (
                <div className="p-3 bg-gradient-to-br from-[#f5f3ff] to-[#faf8ff] border border-[#c4b5fd] rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-[#4c1d95]">
                      {t("quotations.selected_deals")} ({selectedDeals.length})
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedDeals([])}
                      className="h-6 text-xs text-[#dc2626] hover:text-[#b91c1c] hover:bg-red-50"
                    >
                      {t("quotations.clear_all")}
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedDeals.map((dealId) => {
                      const deal = customerDeals.find(d => d.id === dealId);
                      if (!deal) return null;
                      return (
                        <div
                          key={dealId}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-[#c4b5fd] rounded-lg text-xs group hover:border-[#705add] transition-colors"
                        >
                          <span className="font-medium text-[#4c1d95]">{deal.name}</span>
                          <span className="text-[#8b5cf6]">({deal.bu})</span>
                          <button
                            onClick={() => setSelectedDeals(selectedDeals.filter(id => id !== dealId))}
                            className="text-[#8b5cf6] hover:text-[#dc2626] transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Selected Deals Summary */}
            {selectedDeals.length > 0 && (
              <div className="bg-[#f5f3ff] border border-[#c4b5fd] rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-[#4c1d95]">
                    {t("quotations.selected_deals")} ({selectedDeals.length})
                  </h4>
                  {hasMultipleBUs && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                      {t("quotations.multiple_bus_detected")}
                    </div>
                  )}
                </div>
                
                {/* Group by BU */}
                <div className="space-y-2">
                  {uniqueBUs.map(bu => {
                    const dealsInBU = selectedDealsData.filter(d => d.bu === bu);
                    return (
                      <div key={bu} className="bg-white rounded-lg p-3 border border-[#ede9fe]">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="px-2 py-1 bg-gradient-to-r from-[#a78bfa] to-[#705add] text-white rounded text-xs font-semibold">
                            {bu}
                          </div>
                          <span className="text-xs text-[#8b5cf6]">
                            {dealsInBU.length} {dealsInBU.length > 1 ? t("quotations.deals_count") : t("quotations.deal")}
                          </span>
                        </div>
                        <div className="space-y-1">
                          {dealsInBU.map(d => (
                            <div key={d.id} className="text-xs text-[#4c1d95] pl-2">
                              • {d.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Multiple BU Options */}
            {hasMultipleBUs && selectedDeals.length > 1 && (
              <div className="bg-gradient-to-br from-[#fff7ed] to-[#ffedd5] border-2 border-[#fdba74] rounded-xl p-4">
                <h4 className="text-sm font-semibold text-[#ea580c] mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  {t("quotations.quotation_generation_options")}
                </h4>
                <p className="text-xs text-[#9a3412] mb-3">
                  {t("quotations.quotation_generation_desc")}
                </p>
                
                <div className="space-y-2">
                  <div 
                    className={`p-3 rounded-lg border-2 cursor-pointer ${
                      !separateByBU 
                        ? 'bg-white border-[#705add]' 
                        : 'bg-white/50 border-[#ede9fe]'
                    }`}
                    onClick={() => setSeparateByBU(false)}
                  >
                    <div className="flex items-start gap-2">
                      <Checkbox
                        checked={!separateByBU}
                        className="mt-0.5"
                      />
                      <div>
                        <div className="text-xs font-medium text-[#4c1d95]">
                          {t("quotations.case_3a_title")}
                        </div>
                        <div className="text-xs text-[#8b5cf6] mt-1">
                          {t("quotations.case_3a_desc")}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div 
                    className={`p-3 rounded-lg border-2 cursor-pointer ${
                      separateByBU 
                        ? 'bg-white border-[#705add]' 
                        : 'bg-white/50 border-[#ede9fe]'
                    }`}
                    onClick={() => setSeparateByBU(true)}
                  >
                    <div className="flex items-start gap-2">
                      <Checkbox
                        checked={separateByBU}
                        className="mt-0.5"
                      />
                      <div>
                        <div className="text-xs font-medium text-[#4c1d95]">
                          {t("quotations.case_3b_title")}
                        </div>
                        <div className="text-xs text-[#8b5cf6] mt-1">
                          {t("quotations.case_3b_desc").replace("{count}", uniqueBUs.length.toString())}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Single Deal or Same BU Info */}
            {selectedDeals.length > 0 && !hasMultipleBUs && (
              <div className="bg-gradient-to-r from-[#dbeafe] to-[#bfdbfe] border-2 border-[#60a5fa] rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#2563eb]" />
                  <div>
                    <div className="text-sm font-semibold text-[#1e40af] mb-1">
                      {selectedDeals.length === 1 ? t("quotations.case_1_title") : t("quotations.case_2_title")}
                    </div>
                    <div className="text-xs text-[#1e3a8a]">
                      {t("quotations.case_1_desc")} {selectedDeals.length} {selectedDeals.length > 1 ? t("quotations.deals_count") : t("quotations.deal")}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {t("quotations.line_items")}
                </h3>
                <p className="text-sm text-gray-500 mt-1">เพิ่มรายการสินค้าและบริการ</p>
              </div>
              <Button
                type="button"
                onClick={addLineItem}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                {t("quotations.add_item")}
              </Button>
            </div>

            {/* Table Format for Items */}
            <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
              {/* Table Header */}
              <div className="bg-gray-50 border-b-2 border-gray-200">
                <div className="grid grid-cols-12 gap-4 px-6 py-3.5">
                  <div className="col-span-1 text-xs font-semibold text-gray-700">#</div>
                  <div className="col-span-4 text-xs font-semibold text-gray-700">
                    {t("quotations.item_description")}
                  </div>
                  <div className="col-span-1 text-xs font-semibold text-gray-700 text-center">
                    {t("quotations.quantity")}
                  </div>
                  <div className="col-span-2 text-xs font-semibold text-gray-700 text-right">
                    {t("quotations.unit_price")}
                  </div>
                  <div className="col-span-1 text-xs font-semibold text-gray-700 text-center">
                    ส่วนลด %
                  </div>
                  <div className="col-span-1 text-xs font-semibold text-gray-700 text-center">VAT %</div>
                  <div className="col-span-2 text-xs font-semibold text-gray-700 text-right">
                    {t("quotations.total")}
                  </div>
                </div>
              </div>

              {/* Table Body - Scrollable */}
              <div className="max-h-[400px] overflow-y-auto">
                {lineItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 hover:bg-blue-50/30 transition-colors group"
                  >
                    {/* Index & Delete Button */}
                    <div className="col-span-1 flex items-start justify-center pt-2">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-xs font-semibold text-blue-600">
                            {index + 1}
                          </span>
                        </div>
                        {lineItems.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeLineItem(item.id)}
                            className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Description - SINGLE Dropdown with all services */}
                    <div className="col-span-4">
                      {item.description ? (
                        /* Display selected service with edit button */
                        <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 flex items-center justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="text-[10px] text-blue-600 font-medium uppercase mb-0.5">บริการที่เลือก</div>
                            <div className="text-xs text-gray-700 font-medium leading-snug">
                              {item.description}
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setLineItems(
                                lineItems.map((it) =>
                                  it.id === item.id
                                    ? {
                                        ...it,
                                        service: "",
                                        groupService: "",
                                        mainService: "",
                                        subService: "",
                                        description: "",
                                      }
                                    : it
                                )
                              );
                            }}
                            className="h-7 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-100 flex-shrink-0"
                          >
                            <Edit2 className="h-3.5 w-3.5 mr-1" />
                            <span className="text-[10px]">เปลี่ยน</span>
                          </Button>
                        </div>
                      ) : (
                        /* Single Service Selector */
                        <Combobox
                        options={getAllServicesFlat("").filter(s => !s.isHeader).map(s => ({ value: s.value, label: s.label }))}
                        value={item.mainService || ""}
                        onValueChange={(value) => {
                          if (value.startsWith('header-')) return; // Ignore header clicks

                          // Parse value: "groupKey|mainKey|subService"
                          const [groupKey, mainKey, subService] = value.split('|');

                          if (groupKey && mainKey && subService) {
                            const groupLabel = serviceHierarchy[groupKey]?.label.replace(' Services', '') || '';
                            const mainLabel = serviceHierarchy[groupKey]?.mains[mainKey]?.label || '';

                            // Remove redundant words from main label
                            let cleanMainLabel = mainLabel;
                            const groupWords = groupLabel.split(' ');
                            groupWords.forEach(word => {
                              if (word.length > 4) {
                                cleanMainLabel = cleanMainLabel.replace(new RegExp(`\\b${word}\\b`, 'gi'), '').trim();
                              }
                            });

                            const fullDesc = `${groupLabel} › ${cleanMainLabel} › ${subService}`;

                            setLineItems(
                              lineItems.map((it) =>
                                it.id === item.id
                                  ? {
                                      ...it,
                                      service: groupKey,
                                      groupService: mainKey,
                                      mainService: value,
                                      subService: subService,
                                      description: fullDesc,
                                    }
                                  : it
                              )
                            );

                            // Clear search query after selection
                            setServiceSearchQueries({
                              ...serviceSearchQueries,
                              [item.id]: "",
                            });
                          }
                        }}
                        placeholder="เลือกบริการ..."
                        searchPlaceholder="ค้นหาบริการ..."
                        className="h-9 text-xs border-gray-300 focus:border-blue-500 bg-white"
                      />
                      )}
                    </div>

                    {/* Quantity */}
                    <div className="col-span-1">
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateLineItem(
                            item.id,
                            "quantity",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="h-10 text-xs text-center border-gray-300 focus:border-blue-500"
                      />
                    </div>

                    {/* Unit Price */}
                    <div className="col-span-2">
                      <Input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) =>
                          updateLineItem(
                            item.id,
                            "unitPrice",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="h-10 text-xs text-right border-gray-300 focus:border-blue-500"
                      />
                    </div>

                    {/* Discount */}
                    <div className="col-span-1">
                      <Input
                        type="number"
                        value={item.discount}
                        onChange={(e) =>
                          updateLineItem(
                            item.id,
                            "discount",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="h-10 text-xs text-center border-gray-300 focus:border-blue-500"
                      />
                    </div>

                    {/* VAT */}
                    <div className="col-span-1">
                      <Input
                        type="number"
                        value={item.vat}
                        onChange={(e) =>
                          updateLineItem(
                            item.id,
                            "vat",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="h-10 text-xs text-center border-gray-300 focus:border-blue-500"
                      />
                    </div>

                    {/* Total */}
                    <div className="col-span-2 flex items-center justify-end">
                      <div className="text-right">
                        <span className="text-sm font-bold text-blue-600">
                          ${calculateLineTotal(item).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {lineItems.length === 0 && (
                <div className="py-12 text-center">
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-xs text-gray-500">{t("quotations.no_items")}</p>
                </div>
              )}
            </div>

            {/* Totals Summary */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="max-w-md ml-auto space-y-3">
                <div className="flex justify-between items-center py-2">
                  <span className="text-xs text-gray-600">
                    {t("quotations.subtotal")}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    ${totals.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-xs text-gray-600">
                    {t("quotations.total_discount")}
                  </span>
                  <span className="text-sm font-semibold text-red-600">
                    -${totals.totalDiscount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-xs text-gray-600">VAT</span>
                  <span className="text-sm font-semibold text-gray-900">
                    ${totals.totalVAT.toFixed(2)}
                  </span>
                </div>
                <div className="border-t-2 border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-bold text-gray-900">
                      {t("quotations.grand_total")}
                    </span>
                    <span className="text-xl font-bold text-blue-600">
                      ${totals.grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#4c1d95]">
              {t("quotations.attach_documents")}
            </h3>

            {/* File Upload */}
            <div className="border-2 border-dashed border-[#c4b5fd] rounded-xl p-8 text-center bg-gradient-to-br from-white to-[#faf8ff] hover:border-[#705add] transition-colors cursor-pointer">
              <Upload className="h-12 w-12 text-[#8b5cf6] mx-auto mb-4" />
              <p className="text-xs font-medium text-[#4c1d95] mb-2">
                {t("quotations.upload_documents")}
              </p>
              <p className="text-xs text-[#8b5cf6]">
                {t("quotations.upload_documents_hint")}
              </p>
            </div>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-[#f5f3ff] rounded-lg border border-[#ede9fe]"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-[#8b5cf6]" />
                      <span className="text-sm text-[#4c1d95]">{file}</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setUploadedFiles(
                          uploadedFiles.filter((_, i) => i !== index)
                        )
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Notes */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[#4c1d95]">
                {t("quotations.notes")}
              </Label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t("quotations.enter_notes")}
                className="border-[#ede9fe] focus:border-[#705add]"
                rows={5}
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-8">
            {/* Simplified Header */}
            <div className="text-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#f5f3ff] mb-3">
                <CheckCircle2 className="h-6 w-6 text-[#705add]" />
              </div>
              <h3 className="text-xl font-bold text-[#4c1d95] mb-1.5">
                {t("quotations.review_quotation")}
              </h3>
              <p className="text-sm text-gray-600 max-w-2xl mx-auto">
                {t("quotations.review_message")}
              </p>
              
              {/* Quotation Count Info - Cleaner Design */}
              {selectedCustomers.length > 1 && (
                <div className="mt-4 p-3 bg-[#faf8ff] rounded-lg border border-[#ede9fe] max-w-md mx-auto">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <FileText className="h-4 w-4 text-[#705add]" />
                    <p className="font-semibold text-[#4c1d95]">
                      {selectedCustomers.length} ใบเสนอราคา
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">
                    แต่ละลูกค้าจะได้รับใบเสนอราคาแยกกัน 1 ใบ
                  </p>
                </div>
              )}
            </div>

            {/* Quotation Preview Documents - Multiple Quotations */}
            <div className="space-y-4">
              {selectedCustomers.length > 0 ? (
                selectedCustomers.map((customerId, customerIndex) => {
                  const customer = availableCustomers.find(c => c.id === customerId);
                  if (!customer) return null;

                  const isCollapsed = collapsedQuotations[customerId];

                  return (
                    <div key={customerId} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transition-all hover:shadow-md">
                      {/* Collapsible Header - Cleaner Design */}
                      <div 
                        className="p-4 bg-gray-50/50 border-b border-gray-200 cursor-pointer hover:bg-gray-100/50 transition-colors"
                        onClick={() => toggleQuotation(customerId)}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            {selectedCustomers.length > 1 && (
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold bg-[#705add] text-white flex-shrink-0">
                                {customerIndex + 1}
                              </span>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-[#4c1d95] truncate">{customer.name}</p>
                              <p className="text-xs text-gray-500 mt-0.5">
                                {quoteNumber ? `${quoteNumber}-${String(customerIndex + 1).padStart(2, '0')}` : "QT-XXXX-XXXX"}
                              </p>
                            </div>
                          </div>
                          
                          {/* Summary when collapsed */}
                          {isCollapsed && (
                            <div className="flex items-center gap-4 flex-shrink-0">
                              <div className="text-right">
                                <p className="text-xs text-gray-500">Total</p>
                                <p className="font-bold text-[#705add]">{currency.toUpperCase()} {totals.grandTotal.toFixed(2)}</p>
                              </div>
                              {approverLevel && (
                                <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                                  approverLevel === 'Manager' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                                  approverLevel === 'Director' ? 'bg-purple-100 text-purple-700 border border-purple-200' :
                                  'bg-red-100 text-red-700 border border-red-200'
                                }`}>
                                  {approverLevel}
                                </span>
                              )}
                            </div>
                          )}
                          
                          {/* Toggle Icon */}
                          <button className="p-1.5 hover:bg-white rounded-md transition-colors flex-shrink-0">
                            {isCollapsed ? (
                              <ChevronDown className="h-5 w-5 text-gray-400" />
                            ) : (
                              <ChevronUp className="h-5 w-5 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Collapsible Content */}
                      {!isCollapsed && (
                        <div className="p-6 space-y-6 bg-white">
                      {/* Header - Refined */}
                      <div className="border-b border-gray-200 pb-5">
                        <div className="flex justify-between items-start gap-6">
                          <div>
                            <h2 className="text-2xl font-bold text-[#705add] mb-1">mini CRM</h2>
                            <p className="text-xs text-gray-500">Global Logistics Solutions</p>
                            <p className="text-xs text-gray-400 mt-1">
                              Bangkok, Thailand | +66 2 123 4567
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="inline-block px-3 py-1 bg-[#f5f3ff] rounded-md mb-2">
                              <h3 className="text-lg font-bold text-[#4c1d95]">QUOTATION</h3>
                            </div>
                            <p className="text-sm font-semibold text-gray-700">
                              {quoteNumber ? `${quoteNumber}-${String(customerIndex + 1).padStart(2, '0')}` : "QT-XXXX-XXXX"}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {issueDate ? new Date(issueDate).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB')}
                            </p>
                            {issueDate && validityPeriod && (
                              <p className="text-xs text-gray-400 mt-0.5">
                                Valid: {(() => {
                                  const date = new Date(issueDate);
                                  date.setDate(date.getDate() + parseInt(validityPeriod));
                                  return date.toLocaleDateString('en-GB');
                                })()}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Customer Information - Refined */}
                      <div className="grid grid-cols-2 gap-8">
                        <div className="bg-gray-50/50 p-4 rounded-lg">
                          <h4 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Bill To</h4>
                          <p className="font-semibold text-gray-900">{customer.name}</p>
                          <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                            {billingAddresses[customerId] || customer.billingAddress}
                          </p>
                        </div>
                        <div className="bg-gray-50/50 p-4 rounded-lg">
                          <h4 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Contact</h4>
                          <p className="text-sm font-medium text-gray-900">{customer.contactPerson || "-"}</p>
                          <p className="text-xs text-gray-600 mt-1.5">{customer.contactEmail || ""}</p>
                          <p className="text-xs text-gray-600">{customer.contactPhone || ""}</p>
                          {shippingAddresses[customerId] && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <h4 className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Ship To</h4>
                              <p className="text-xs text-gray-600 leading-relaxed">{shippingAddresses[customerId]}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Line Items Table - Cleaner Design */}
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                              <th className="text-left py-3 px-4 text-gray-700 font-semibold">#</th>
                              <th className="text-left py-3 px-4 text-gray-700 font-semibold">Service Description</th>
                              <th className="text-center py-3 px-4 text-gray-700 font-semibold">Qty</th>
                              <th className="text-right py-3 px-4 text-gray-700 font-semibold">Unit Price</th>
                              <th className="text-right py-3 px-4 text-gray-700 font-semibold">Discount</th>
                              <th className="text-right py-3 px-4 text-gray-700 font-semibold">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {lineItems.map((item, index) => {
                              const amount = item.quantity * item.unitPrice;
                              const discountAmount = (amount * item.discount) / 100;
                              const totalAmount = amount - discountAmount;
                              
                              return (
                                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                                  <td className="py-3 px-4 text-gray-500 text-xs">{index + 1}</td>
                                  <td className="py-3 px-4 text-gray-900">
                                    {item.description || "Service not selected"}
                                  </td>
                                  <td className="py-3 px-4 text-center text-gray-600">{item.quantity}</td>
                                  <td className="py-3 px-4 text-right text-gray-600">
                                    {currency.toUpperCase()} {item.unitPrice.toFixed(2)}
                                  </td>
                                  <td className="py-3 px-4 text-right text-gray-600">
                                    {item.discount > 0 ? `${item.discount}%` : "-"}
                                  </td>
                                  <td className="py-3 px-4 text-right font-semibold text-gray-900">
                                    {currency.toUpperCase()} {totalAmount.toFixed(2)}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      {/* Totals - Refined Design */}
                      <div className="flex justify-end">
                        <div className="w-96 bg-gray-50/50 rounded-lg p-4 space-y-2">
                          <div className="flex justify-between text-sm py-1.5">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-medium text-gray-900">
                              {currency.toUpperCase()} {(totals.subtotal || 0).toFixed(2)}
                            </span>
                          </div>
                          {totals.totalDiscount > 0 && (
                            <div className="flex justify-between text-sm py-1.5">
                              <span className="text-gray-600">Discount</span>
                              <span className="font-medium text-red-600">
                                -{currency.toUpperCase()} {(totals.totalDiscount || 0).toFixed(2)}
                              </span>
                            </div>
                          )}
                          {includeVAT && totals.totalVAT > 0 && (
                            <div className="flex justify-between text-sm py-1.5">
                              <span className="text-gray-600">VAT (7%)</span>
                              <span className="font-medium text-gray-900">
                                {currency.toUpperCase()} {(totals.totalVAT || 0).toFixed(2)}
                              </span>
                            </div>
                          )}
                          <div className="flex justify-between text-base font-bold border-t border-gray-300 pt-3 mt-2">
                            <span className="text-gray-700">Grand Total</span>
                            <span className="text-[#705add] text-lg">
                              {currency.toUpperCase()} {(totals.grandTotal || 0).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Notes - Cleaner */}
                      {notes && (
                        <div className="bg-amber-50/50 border border-amber-200/50 rounded-lg p-4">
                          <h4 className="text-xs font-semibold text-amber-900 mb-2 uppercase tracking-wide">Notes</h4>
                          <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{notes}</p>
                        </div>
                      )}

                      {/* Approval Information - Refined */}
                      {approverName && approverEmail && (
                        <div className="bg-blue-50/50 border border-blue-200/50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-xs font-semibold text-blue-900 uppercase tracking-wide">Approval Required</h4>
                            {approverLevel && (
                              <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                                approverLevel === 'Manager' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                                approverLevel === 'Director' ? 'bg-purple-100 text-purple-700 border border-purple-200' :
                                'bg-red-100 text-red-700 border border-red-200'
                              }`}>
                                {approverLevel} Level
                              </span>
                            )}
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-semibold text-gray-900">
                              {approverName}
                            </p>
                            {approverPosition && (
                              <p className="text-xs text-gray-600">{approverPosition}</p>
                            )}
                            <p className="text-xs text-gray-600">
                              {approverEmail}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Terms & Conditions - Minimal */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-xs font-semibold text-gray-700 mb-2.5 uppercase tracking-wide">Terms & Conditions</h4>
                        <ul className="space-y-1.5 text-xs text-gray-600">
                          <li className="flex items-start gap-2">
                            <span className="text-gray-400 mt-0.5">•</span>
                            <span>Payment terms: {paymentTerms || "As agreed"}</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-gray-400 mt-0.5">•</span>
                            <span>Prices are subject to change without prior notice</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-gray-400 mt-0.5">•</span>
                            <span>All services are subject to availability</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-gray-400 mt-0.5">•</span>
                            <span>Standard terms and conditions apply</span>
                          </li>
                        </ul>
                      </div>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <FileText className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">No customer selected</p>
                </div>
              )}
            </div>

            {/* Summary Sections */}
            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {/* Basic Information */}
              <div className="p-4 bg-white rounded-lg border border-[#ede9fe]">
                <h4 className="font-semibold text-[#4c1d95] mb-3">
                  {t("quotations.steps.setup")}
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-[#8b5cf6]">
                      {t("quotations.quote_number")}:
                    </span>
                    <p className="font-medium text-[#4c1d95]">
                      {quoteNumber || "-"}
                    </p>
                  </div>
                  <div>
                    <span className="text-[#8b5cf6]">
                      {t("quotations.status")}:
                    </span>
                    <p className="font-medium text-[#4c1d95]">
                      {status || "-"}
                    </p>
                  </div>
                  <div>
                    <span className="text-[#8b5cf6]">
                      {t("quotations.currency")}:
                    </span>
                    <p className="font-medium text-[#4c1d95]">
                      {currency.toUpperCase() || "-"}
                    </p>
                  </div>
                  <div>
                    <span className="text-[#8b5cf6]">
                      {t("quotations.business_unit")}:
                    </span>
                    <p className="font-medium text-[#4c1d95]">
                      {businessUnit || "-"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="p-4 bg-white rounded-lg border border-[#ede9fe]">
                <h4 className="font-semibold text-[#4c1d95] mb-3">
                  {t("quotations.steps.customer")}
                </h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-[#8b5cf6]">
                      {t("quotations.customer_name")}:
                    </span>
                    <p className="font-medium text-[#4c1d95]">
                      {selectedCustomers.length > 0 
                        ? availableCustomers
                            .filter(c => selectedCustomers.includes(c.id))
                            .map(c => c.name)
                            .join(", ")
                        : "-"}
                    </p>
                  </div>
                  <div>
                    <span className="text-[#8b5cf6]">
                      {t("quotations.contact_person")}:
                    </span>
                    <p className="font-medium text-[#4c1d95]">
                      {contactPerson || "-"}
                    </p>
                  </div>
                  <div>
                    <span className="text-[#8b5cf6]">
                      {t("quotations.billing_address")}:
                    </span>
                    <div className="mt-2 space-y-2">
                      {selectedCustomers.length > 0 ? (
                        selectedCustomers.map((customerId) => {
                          const customer = availableCustomers.find(c => c.id === customerId);
                          return customer ? (
                            <div key={customerId} className="p-2 bg-[#faf8ff] rounded border border-[#ede9fe]">
                              <p className="text-xs font-semibold text-[#705add] mb-1">
                                {customer.name}
                              </p>
                              <p className="text-xs text-[#4c1d95]">
                                {billingAddresses[customerId] || "-"}
                              </p>
                            </div>
                          ) : null;
                        })
                      ) : (
                        <p className="font-medium text-[#4c1d95]">-</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-[#8b5cf6]">
                      {t("quotations.shipping_address")}:
                    </span>
                    <div className="mt-2 space-y-2">
                      {selectedCustomers.length > 0 ? (
                        selectedCustomers.map((customerId) => {
                          const customer = availableCustomers.find(c => c.id === customerId);
                          return customer ? (
                            <div key={customerId} className="p-2 bg-[#faf8ff] rounded border border-[#ede9fe]">
                              <p className="text-xs font-semibold text-[#705add] mb-1">
                                {customer.name}
                              </p>
                              <p className="text-xs text-[#4c1d95]">
                                {shippingAddresses[customerId] || "-"}
                              </p>
                            </div>
                          ) : null;
                        })
                      ) : (
                        <p className="font-medium text-[#4c1d95]">-</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Items Summary */}
              <div className="p-4 bg-white rounded-lg border border-[#ede9fe]">
                <h4 className="font-semibold text-[#4c1d95] mb-3">
                  {t("quotations.steps.items")}
                </h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#8b5cf6]">Total Items:</span>
                    <span className="font-medium text-[#4c1d95]">
                      {lineItems.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8b5cf6]">
                      {t("quotations.grand_total")}:
                    </span>
                    <span className="font-bold text-[#705add]">
                      ${totals.grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Approval Information Section */}
            <div className="p-5 bg-gradient-to-br from-[#fef3c7] to-[#fde68a] rounded-lg border-2 border-[#fbbf24]">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-[#92400e] flex items-center gap-2">
                  <Circle className="h-5 w-5 fill-[#fbbf24]" />
                  {t("quotations.approval_information")}
                </h4>
                {approverLevel && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#92400e] font-medium">Auto-Selected:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      approverLevel === 'Manager' ? 'bg-blue-500 text-white' :
                      approverLevel === 'Director' ? 'bg-purple-600 text-white' :
                      'bg-red-600 text-white'
                    }`}>
                      {approverLevel}
                    </span>
                    <span className="text-xs text-[#92400e]">
                      (${totals.grandTotal.toFixed(0)})
                    </span>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-[#92400e]">
                      {t("quotations.approver_name")} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={approverName}
                      onChange={(e) => setApproverName(e.target.value)}
                      placeholder={t("quotations.enter_approver_name")}
                      className="border-[#fbbf24] focus:border-[#f59e0b] bg-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-[#92400e]">
                      {t("quotations.approver_position")}
                    </Label>
                    <Input
                      value={approverPosition}
                      onChange={(e) => setApproverPosition(e.target.value)}
                      placeholder={t("quotations.enter_approver_position")}
                      className="border-[#fbbf24] focus:border-[#f59e0b] bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-[#92400e]">
                    {t("quotations.approver_email")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    value={approverEmail}
                    onChange={(e) => setApproverEmail(e.target.value)}
                    placeholder={t("quotations.enter_approver_email")}
                    className="border-[#fbbf24] focus:border-[#f59e0b] bg-white"
                  />
                  <p className="text-xs text-[#92400e]">
                    {t("quotations.approval_email_hint")}
                  </p>
                </div>

                {/* Auto-Selection Info */}
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <div className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">ⓘ</div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-blue-900 mb-1">Auto-Approval Rules:</p>
                      <ul className="text-xs text-blue-700 space-y-0.5">
                        <li>• &lt; $100,000 → <span className="font-bold">Manager</span></li>
                        <li>• $100,000 - $500,000 → <span className="font-bold">Director</span></li>
                        <li>• &gt; $500,000 → <span className="font-bold">CEO</span></li>
                      </ul>
                    </div>
                  </div>
                </div>

                {approverName && approverEmail && (
                  <div className="mt-4 p-3 bg-white/50 rounded-lg border border-[#fbbf24]">
                    <p className="text-xs text-[#92400e] mb-1 font-medium">
                      {t("quotations.will_send_to")}:
                    </p>
                    <p className="text-sm font-semibold text-[#78350f]">
                      {approverName} {approverPosition && `(${approverPosition})`}
                    </p>
                    <p className="text-sm text-[#92400e]">
                      📧 {approverEmail}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-gradient-to-br from-white to-[#faf8ff] border-[#ede9fe]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#4c1d95]">
            {t("quotations.create_new_quotation")}
          </DialogTitle>
          <DialogDescription className="text-[#8b5cf6]">
            {t("quotations.create_new_quotation_subtitle")}
          </DialogDescription>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="py-4">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      step.number === currentStep
                        ? "bg-gradient-to-r from-[#a78bfa] to-[#705add] text-white shadow-lg scale-110"
                        : step.number < currentStep
                        ? "bg-[#705add] text-white"
                        : "bg-[#ede9fe] text-[#8b5cf6]"
                    }`}
                  >
                    {step.number < currentStep ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <span className="font-semibold">{step.number}</span>
                    )}
                  </div>
                  <span
                    className={`text-xs mt-2 text-center ${
                      step.number === currentStep
                        ? "font-semibold text-[#705add]"
                        : "text-[#8b5cf6]"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all ${
                      step.number < currentStep ? "bg-[#705add]" : "bg-[#ede9fe]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-xs text-[#8b5cf6]">
              {t("quotations.step_of", {
                current: currentStep,
                total: totalSteps,
              })}
            </p>
          </div>
        </div>

        {/* Step Content */}
        <div className="overflow-y-auto max-h-[50vh] px-1">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-[#ede9fe]">
          <Button
            type="button"
            variant="outline"
            onClick={currentStep === 1 ? onClose : handlePrevious}
            className="border-[#ede9fe] text-[#4c1d95] hover:bg-[#f5f3ff]"
          >
            {currentStep === 1 ? t("common.cancel") : t("quotations.previous")}
          </Button>

          <div className="flex gap-2">
            {currentStep === totalSteps ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSubmit}
                  className="border-[#ede9fe] text-[#4c1d95] hover:bg-[#f5f3ff]"
                >
                  {t("quotations.save_draft")}
                </Button>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!approverName || !approverEmail}
                  className="bg-gradient-to-r from-[#a78bfa] to-[#705add] hover:from-[#8b5cf6] hover:to-[#6d28d9] text-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  title={!approverName || !approverEmail ? t("quotations.please_fill_approver") : ""}
                >
                  {t("quotations.submit_approval")}
                </Button>
              </>
            ) : (
              <Button
                type="button"
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
              >
                {t("quotations.next")}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}