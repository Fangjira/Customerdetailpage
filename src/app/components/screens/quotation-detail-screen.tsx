import { useState, useEffect } from "react";
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
  Eye,
  Check,
  X,
  Target,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

interface QuotationDetailScreenProps {
  quotationId: string;
  onBack: () => void;
  onNavigate?: (path: string) => void;
  onPreview?: (quotationId: string, templateType?: string) => void;
}

export function QuotationDetailScreen({
  quotationId,
  onBack,
  onNavigate,
  onPreview,
}: QuotationDetailScreenProps) {
  const { t } = useTranslation();
  
  // Editing state - แยกตามส่วน
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<any>({});
  
  // Version History collapse state
  const [isVersionHistoryOpen, setIsVersionHistoryOpen] = useState(true);
  
  // Status update state
  const [currentStatus, setCurrentStatus] = useState("Approved");
  
  // Send for approval dialog state
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false);
  const [selectedApprover, setSelectedApprover] = useState("");

  // Mock approvers list - ในระบบจริงจะดึงจาก API ตาม role Manager และ Admin
  const approvers = [
    { id: "mgr1", name: "John Smith", role: "Manager", department: "Sales" },
    { id: "mgr2", name: "Lisa Wong", role: "Manager", department: "Operations" },
    { id: "admin1", name: "David Chen", role: "Admin", department: "Management" },
    { id: "admin2", name: "Sarah Johnson", role: "Admin", department: "Finance" },
  ];

  // Auto-select ผู้อนุมัติคนแรกเมื่อเปิด dialog แต่ยังสามารถเปลี่ยนได้
  useEffect(() => {
    if (isApprovalDialogOpen && approvers.length > 0) {
      // เลือกผู้อนุมัติคนแรกโดยอัตโนมัติ (ในระบบจริงอาจเลือกตาม logic เช่น Manager ในแผนกเดียวกัน)
      setSelectedApprover(approvers[0].id);
    }
  }, [isApprovalDialogOpen]);

  // Mock data - ในระบบจริงจะดึงจาก API
  const quotation = {
    id: "QT-2024-001",
    documentNumber: "QT2024123456",
    name: "ใบเสนอราคาขนส่งทางอากาศระหว่างประเทศ",
    templateType: "international-freight" as const,
    customer: {
      company: "บริษัท แอคมี คอร์ปอเรชั่น จำกัด",
      contact: "คุณสมชาย ใจดี",
      email: "somchai@acme.co.th",
      phone: "02-123-4567",
      address: "123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110",
    },
    dealId: "DL-2024-145",
    status: "Approved",
    issueDate: "2024-12-01T09:00:00Z",
    validUntil: "2025-03-31T23:59:59Z",
    validity: 30,
    createdDate: "2024-12-01T09:00:00Z",
    createdBy: {
      name: "Sarah Chen",
      initials: "SC",
      userId: "user1",
    },
    introduction: "ตามที่ท่านได้สอบถามราคาบริการขนส่งสินค้าทางอากาศระหว่างประเทศ บริษัทฯ ขอเสนอราคาบริการดังนี้",
    scopeOfWork: "1. รับสินค้าจากโรงงาน\n2. ดำเนินการพิธีการศุลกากร\n3. ขนส่งสินค้าทางอากาศ\n4. ส่งมอบถึงปลายทาง",
    // Air Freight Export Rate Data
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
          remarks: "Subject to space availability"
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
          remarks: "Min 500kg"
        }
      ]
    }),
    // Air Freight Import - Removed (empty rows)
    airFreightImportRateData: JSON.stringify({ rows: [] }),
    // Sea Freight Export Rate Data
    seaFreightExportRateData: JSON.stringify({
      rows: [
        {
          id: "1",
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
          remarks: "Port to Port"
        }
      ]
    }),
    // Sea Freight Import - Removed (empty rows)
    seaFreightImportRateData: JSON.stringify({ rows: [] }),
    freightRateRemarks: "• ราคาดังกล่าวยังไม่รวมภาษีมูลค่าเพิ่ม 7%\n• ราคาอาจมีการเปลี่ยนแปลงตามอัตราแลกเปลี่ยนและราคาน้ำมัน\n• ราคาดังกล่าวเป็นราคาพื้นฐาน ไม่รวมค่าใช้จ่ายอื่นๆ",
    currency: "THB",
    includeVat: true,
    paymentTerm: "30",
    remarks: "1. ราคาดังกล่าวยังไม่รวมภาษีมูลค่าเพิ่ม 7%\n2. ใบเสนอราคานี้มีอายุ 30 วัน นับจากวันที่ออกเอกสาร\n3. เงื่อนไขการชำระเงิน: เครดิต 30 วัน หลังวันที่ออกใบกำกับภาษี",
  };

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
    // Safety check for undefined or null
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

  // Handlers สำหรับแก้ไขแต่ละส่วน
  const handleEditSection = (section: string) => {
    setEditingSection(section);
    
    // เตรียมข้อมูลสำหรับส่วนที่จะแก้ไข
    if (section === 'customer-info') {
      setEditedData({
        ...editedData,
        [section]: {
          customer: { ...quotation.customer },
        }
      });
    } else if (section === 'introduction') {
      setEditedData({
        ...editedData,
        [section]: { text: quotation.introduction }
      });
    } else if (section === 'scope-of-work') {
      setEditedData({
        ...editedData,
        [section]: { text: quotation.scopeOfWork }
      });
    } else if (section === 'remarks') {
      setEditedData({
        ...editedData,
        [section]: { text: quotation.remarks }
      });
    } else if (section === 'rates') {
      // เตรียมข้อมูลทั้งหมดของ rates section
      setEditedData({
        ...editedData,
        [section]: {
          airFreightExport: quotation.airFreightExportRateData 
            ? JSON.parse(quotation.airFreightExportRateData)
            : { rows: [] },
          airFreightImport: quotation.airFreightImportRateData
            ? JSON.parse(quotation.airFreightImportRateData)
            : { rows: [] },
          seaFreightExport: quotation.seaFreightExportRateData
            ? JSON.parse(quotation.seaFreightExportRateData)
            : { rows: [] },
          seaFreightImport: quotation.seaFreightImportRateData
            ? JSON.parse(quotation.seaFreightImportRateData)
            : { rows: [] },
          remarks: quotation.freightRateRemarks || ''
        }
      });
    } else if (section === 'air-freight-export') {
      const data = quotation.airFreightExportRateData 
        ? JSON.parse(quotation.airFreightExportRateData)
        : { rows: [] };
      setEditedData({ ...editedData, [section]: data });
    } else if (section === 'air-freight-import') {
      const data = quotation.airFreightImportRateData
        ? JSON.parse(quotation.airFreightImportRateData)
        : { rows: [] };
      setEditedData({ ...editedData, [section]: data });
    } else if (section === 'sea-freight-export') {
      const data = quotation.seaFreightExportRateData
        ? JSON.parse(quotation.seaFreightExportRateData)
        : { rows: [] };
      setEditedData({ ...editedData, [section]: data });
    } else if (section === 'sea-freight-import') {
      const data = quotation.seaFreightImportRateData
        ? JSON.parse(quotation.seaFreightImportRateData)
        : { rows: [] };
      setEditedData({ ...editedData, [section]: data });
    }
  };

  const handleSaveSection = (section: string) => {
    console.log(`Saving ${section}:`, editedData[section]);
    // TODO: Update to backend
    alert(`บันทึกการแก้ไข ${section} เรียบร้อย`);
    setEditingSection(null);
  };

  const handleCancelSection = (section: string) => {
    setEditingSection(null);
    const newData = { ...editedData };
    delete newData[section];
    setEditedData(newData);
  };

  const handleAddRateRow = (section: string, subsection?: string) => {
    const newRow = {
      id: Date.now().toString(),
      no: "",
      airline: "",
      product: "",
      service: "",
      weight: "",
      pol: "",
      pod: "",
      routing: "",
      transit: "",
      transitTime: "",
      price: "",
      unit: "",
      currencyUnit: "",
      remarks: "",
    };

    const updatedData = { ...editedData };
    
    // Handle rates section with subsections
    if (section === 'rates' && subsection) {
      if (!updatedData[section]) {
        updatedData[section] = {
          airFreightExport: { rows: [] },
          airFreightImport: { rows: [] },
          seaFreightExport: { rows: [] },
          seaFreightImport: { rows: [] },
          remarks: ''
        };
      }
      if (!updatedData[section][subsection]) {
        updatedData[section][subsection] = { rows: [] };
      }
      updatedData[section][subsection].rows.push(newRow);
    } else {
      // Original logic for other sections
      if (!updatedData[section]) {
        updatedData[section] = { rows: [] };
      }
      updatedData[section].rows.push(newRow);
    }
    setEditedData(updatedData);
  };

  const handleDeleteRateRow = (section: string, rowId: string, subsection?: string) => {
    const updatedData = { ...editedData };
    
    // Handle rates section with subsections
    if (section === 'rates' && subsection) {
      if (updatedData[section] && updatedData[section][subsection]) {
        updatedData[section][subsection].rows = updatedData[section][subsection].rows.filter(
          (row: any) => row.id !== rowId
        );
        setEditedData(updatedData);
      }
    } else {
      // Original logic for other sections
      if (updatedData[section]) {
        updatedData[section].rows = updatedData[section].rows.filter(
          (row: any) => row.id !== rowId
        );
        setEditedData(updatedData);
      }
    }
  };

  const handleUpdateRateRow = (
    section: string,
    rowId: string,
    field: string,
    value: string,
    subsection?: string
  ) => {
    const updatedData = { ...editedData };
    
    // Handle rates section with subsections
    if (section === 'rates' && subsection) {
      if (updatedData[section] && updatedData[section][subsection] && updatedData[section][subsection].rows) {
        const rowIndex = updatedData[section][subsection].rows.findIndex((row: any) => row.id === rowId);
        if (rowIndex !== -1) {
          updatedData[section][subsection].rows[rowIndex][field] = value;
          setEditedData(updatedData);
        }
      }
    } else {
      // Original logic for other sections
      if (updatedData[section] && updatedData[section].rows) {
        const rowIndex = updatedData[section].rows.findIndex((row: any) => row.id === rowId);
        if (rowIndex !== -1) {
          updatedData[section].rows[rowIndex][field] = value;
          setEditedData(updatedData);
        }
      }
    }
  };

  const handleUpdateField = (section: string, field: string, value: any) => {
    const updatedData = { ...editedData };
    if (!updatedData[section]) {
      updatedData[section] = {};
    }
    
    // Handle nested fields (e.g., customer.company)
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      if (!updatedData[section][parent]) {
        updatedData[section][parent] = {};
      }
      updatedData[section][parent][child] = value;
    } else {
      updatedData[section][field] = value;
    }
    setEditedData(updatedData);
  };

  // Helper function to render rate table
  const renderRateTable = (
    title: string,
    data: any,
    subsection: string,
    isEditing: boolean
  ) => {
    if (!data || !data.rows || data.rows.length === 0) return null;

    const displayData = isEditing 
      ? editedData['rates']?.[subsection] || data
      : data;

    return (
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold text-gray-800">{title}</h3>
          {isEditing && (
            <Button
              variant="outline"
              size="sm"
              className="h-6 px-2 text-[10px] text-[#7BC9A6] border-[#7BC9A6] hover:bg-[#7BC9A6] hover:text-white"
              onClick={() => handleAddRateRow('rates', subsection)}
            >
              <Plus className="h-3 w-3 mr-1" />
              เพิ่มแถว
            </Button>
          )}
        </div>
        <div className="border border-gray-300 rounded-lg overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead className="bg-[#7BC9A6] text-white">
              <tr>
                <th className="px-2 py-2 text-center font-semibold border-r border-white/20">NO.</th>
                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">AIRLINE/CARRIER</th>
                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">PRODUCT</th>
                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">Service</th>
                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">WEIGHT [kg]</th>
                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">POL</th>
                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">POD</th>
                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">ROUTING</th>
                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">TRANSIT</th>
                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">TRANSIT TIME</th>
                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">PRICE</th>
                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">UNIT</th>
                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">[Currency/Unit ext/Period]</th>
                <th className="px-2 py-2 text-left font-semibold">REMARKS</th>
                {isEditing && (
                  <th className="px-2 py-2 text-center font-semibold">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayData.rows.map((row: any) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {isEditing ? (
                    <>
                      <td className="px-2 py-2 text-center border-r border-gray-200">
                        <Input
                          value={row.no}
                          onChange={(e) => handleUpdateRateRow('rates', row.id, 'no', e.target.value, subsection)}
                          className="h-6 text-[10px] text-center"
                        />
                      </td>
                      <td className="px-2 py-2 border-r border-gray-200">
                        <Input
                          value={row.airline}
                          onChange={(e) => handleUpdateRateRow('rates', row.id, 'airline', e.target.value, subsection)}
                          className="h-6 text-[10px]"
                        />
                      </td>
                      <td className="px-2 py-2 border-r border-gray-200">
                        <Input
                          value={row.product}
                          onChange={(e) => handleUpdateRateRow('rates', row.id, 'product', e.target.value, subsection)}
                          className="h-6 text-[10px]"
                        />
                      </td>
                      <td className="px-2 py-2 border-r border-gray-200">
                        <Input
                          value={row.service}
                          onChange={(e) => handleUpdateRateRow('rates', row.id, 'service', e.target.value, subsection)}
                          className="h-6 text-[10px]"
                        />
                      </td>
                      <td className="px-2 py-2 border-r border-gray-200">
                        <Input
                          value={row.weight}
                          onChange={(e) => handleUpdateRateRow('rates', row.id, 'weight', e.target.value, subsection)}
                          className="h-6 text-[10px]"
                        />
                      </td>
                      <td className="px-2 py-2 border-r border-gray-200">
                        <Input
                          value={row.pol}
                          onChange={(e) => handleUpdateRateRow('rates', row.id, 'pol', e.target.value, subsection)}
                          className="h-6 text-[10px]"
                        />
                      </td>
                      <td className="px-2 py-2 border-r border-gray-200">
                        <Input
                          value={row.pod}
                          onChange={(e) => handleUpdateRateRow('rates', row.id, 'pod', e.target.value, subsection)}
                          className="h-6 text-[10px]"
                        />
                      </td>
                      <td className="px-2 py-2 border-r border-gray-200">
                        <Input
                          value={row.routing}
                          onChange={(e) => handleUpdateRateRow('rates', row.id, 'routing', e.target.value, subsection)}
                          className="h-6 text-[10px]"
                        />
                      </td>
                      <td className="px-2 py-2 border-r border-gray-200">
                        <Input
                          value={row.transit}
                          onChange={(e) => handleUpdateRateRow('rates', row.id, 'transit', e.target.value, subsection)}
                          className="h-6 text-[10px]"
                        />
                      </td>
                      <td className="px-2 py-2 border-r border-gray-200">
                        <Input
                          value={row.transitTime}
                          onChange={(e) => handleUpdateRateRow('rates', row.id, 'transitTime', e.target.value, subsection)}
                          className="h-6 text-[10px]"
                        />
                      </td>
                      <td className="px-2 py-2 border-r border-gray-200">
                        <Input
                          value={row.price}
                          onChange={(e) => handleUpdateRateRow('rates', row.id, 'price', e.target.value, subsection)}
                          className="h-6 text-[10px]"
                        />
                      </td>
                      <td className="px-2 py-2 border-r border-gray-200">
                        <Input
                          value={row.unit}
                          onChange={(e) => handleUpdateRateRow('rates', row.id, 'unit', e.target.value, subsection)}
                          className="h-6 text-[10px]"
                        />
                      </td>
                      <td className="px-2 py-2 border-r border-gray-200">
                        <Input
                          value={row.currencyUnit}
                          onChange={(e) => handleUpdateRateRow('rates', row.id, 'currencyUnit', e.target.value, subsection)}
                          className="h-6 text-[10px]"
                        />
                      </td>
                      <td className="px-2 py-2 border-r border-gray-200">
                        <Input
                          value={row.remarks}
                          onChange={(e) => handleUpdateRateRow('rates', row.id, 'remarks', e.target.value, subsection)}
                          className="h-6 text-[10px]"
                        />
                      </td>
                      <td className="px-2 py-2 text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeleteRateRow('rates', row.id, subsection)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-2 py-2 text-center border-r border-gray-200">{row.no}</td>
                      <td className="px-2 py-2 border-r border-gray-200">{row.airline}</td>
                      <td className="px-2 py-2 border-r border-gray-200">{row.product}</td>
                      <td className="px-2 py-2 border-r border-gray-200">{row.service}</td>
                      <td className="px-2 py-2 border-r border-gray-200">{row.weight}</td>
                      <td className="px-2 py-2 border-r border-gray-200">{row.pol}</td>
                      <td className="px-2 py-2 border-r border-gray-200">{row.pod}</td>
                      <td className="px-2 py-2 border-r border-gray-200">{row.routing}</td>
                      <td className="px-2 py-2 border-r border-gray-200">{row.transit}</td>
                      <td className="px-2 py-2 border-r border-gray-200">{row.transitTime}</td>
                      <td className="px-2 py-2 border-r border-gray-200">{row.price}</td>
                      <td className="px-2 py-2 border-r border-gray-200">{row.unit}</td>
                      <td className="px-2 py-2 border-r border-gray-200">{row.currencyUnit}</td>
                      <td className="px-2 py-2">{row.remarks}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Calculate quotation age (days since created)
  const calculateQuotationAge = (createdDate: string) => {
    const created = new Date(createdDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "วันนี้";
    if (diffDays === 1) return "1 วัน";
    if (diffDays < 7) return `${diffDays} วัน`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} สัปดาห์`;
    }
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} เดือน`;
    }
    const years = Math.floor(diffDays / 365);
    return `${years} ปี`;
  };

  // Calculate days until valid date (or overdue)
  const calculateDaysUntilValid = (validDate: string) => {
    const valid = new Date(validDate);
    const now = new Date();
    const diffTime = valid.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      // Overdue
      const overdueDays = Math.abs(diffDays);
      if (overdueDays === 0) return { text: "วันนี้", isOverdue: false, color: "text-orange-600" };
      if (overdueDays === 1) return { text: "หมดอายุแล้ว 1 วัน", isOverdue: true, color: "text-red-600" };
      if (overdueDays < 7) return { text: `หมดอายุแล้ว ${overdueDays} วัน`, isOverdue: true, color: "text-red-600" };
      if (overdueDays < 30) {
        const weeks = Math.floor(overdueDays / 7);
        return { text: `หมดอายุแล้ว ${weeks} สัปดาห์`, isOverdue: true, color: "text-red-600" };
      }
      const months = Math.floor(overdueDays / 30);
      return { text: `หมดอายุแล้ว ${months} เดือน`, isOverdue: true, color: "text-red-600" };
    } else {
      // Not overdue
      if (diffDays === 0) return { text: "หมดอายุวันนี้", isOverdue: false, color: "text-orange-600" };
      if (diffDays === 1) return { text: "เหลืออีก 1 วัน", isOverdue: false, color: "text-orange-600" };
      if (diffDays < 7) return { text: `เหลืออีก ${diffDays} วัน`, isOverdue: false, color: diffDays <= 3 ? "text-orange-600" : "text-blue-600" };
      if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return { text: `เหลืออีก ${weeks} สัปดาห์`, isOverdue: false, color: "text-blue-600" };
      }
      if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return { text: `เหลืออีก ${months} เดือน`, isOverdue: false, color: "text-green-600" };
      }
      const years = Math.floor(diffDays / 365);
      return { text: `เหลืออีก ${years} ปี`, isOverdue: false, color: "text-green-600" };
    }
  };

  // Calculate validity period (days from created to valid date)
  const calculateValidityPeriod = (createdDate: string, validDate: string) => {
    const created = new Date(createdDate);
    const valid = new Date(validDate);
    const diffTime = Math.abs(valid.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 7) return `${diffDays} วัน`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} สัปดาห์`;
    }
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} เดือน`;
    }
    const years = Math.floor(diffDays / 365);
    return `${years} ปี`;
  };

  // Format date in Thai format
  const formatThaiDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const daysUntilValid = calculateDaysUntilValid(quotation.validUntil);

  return (
    <div className="p-2 sm:p-3 lg:p-4 bg-gray-50 min-h-screen">
      <div className="max-w-[1400px] mx-auto space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="h-9 w-9 p-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">
                {quotation.name}
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                {quotation.documentNumber}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-3 text-xs bg-orange-600 hover:bg-orange-700 text-white border-orange-600"
              onClick={() => setIsApprovalDialogOpen(true)}
            >
              <Send className="h-3.5 w-3.5 mr-1.5" />
              ส่งอนุมัติ
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
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-3 text-xs"
              onClick={() => {
                alert("กำลังดาวน์โหลดใบเสนอราคา...");
              }}
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
            className={`${getStatusColor(currentStatus)} text-xs px-3 py-1 font-medium border`}
          >
            <span className="flex items-center gap-1.5">
              {getStatusIcon(currentStatus)}
              {currentStatus}
            </span>
          </Badge>

        </div>

        {/* Quotation Timeline Card */}
        <Card className="border-gray-200 shadow-sm bg-gradient-to-r from-green-50 to-blue-50">
          <CardContent className="p-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {/* เลขที่เอกสาร */}
              <div>
                <p className="text-[10px] text-gray-500 mb-1">เลขที่เอกสาร</p>
                <p className="text-xs font-semibold text-gray-900">{quotation.documentNumber}</p>
              </div>

              {/* วันที่สร้าง */}
              <div>
                <p className="text-[10px] text-gray-500 mb-1">วันที่สร้าง</p>
                <p className="text-xs font-semibold text-gray-900">{formatThaiDate(quotation.createdDate)}</p>
                <p className="text-[10px] text-gray-600">{calculateQuotationAge(quotation.createdDate)}ที่ผ่านมา</p>
              </div>

              {/* ใช้ได้ถึง */}
              <div>
                <p className="text-[10px] text-gray-500 mb-1">ใช้ได้ถึง</p>
                <p className="text-xs font-semibold text-gray-900">{formatThaiDate(quotation.validUntil)}</p>
                <p className={`text-[10px] font-medium ${daysUntilValid.color}`}>{daysUntilValid.text}</p>
              </div>

              {/* เงื่อนไขชำระเงิน */}
              <div>
                <p className="text-[10px] text-gray-500 mb-1">เงื่อนไขชำระเงิน</p>
                <p className="text-xs font-semibold text-gray-900">
                  {quotation.paymentTerm === "0" ? "เงินสด" : `เครดิต ${quotation.paymentTerm} วัน`}
                </p>
              </div>

              {/* ดีลที่เกี่ยวข้อง */}
              <div>
                <p className="text-[10px] text-gray-500 mb-1">ดีล</p>
                <p className="text-xs font-semibold text-green-600 cursor-pointer hover:underline"
                   onClick={() => onNavigate?.(`/deals/${quotation.dealId}`)}>
                  {quotation.dealId}
                </p>
              </div>

              {/* สร้างโดย */}
              <div>
                <p className="text-[10px] text-gray-500 mb-1">สร้างโดย</p>
                <p className="text-xs font-semibold text-gray-900">{quotation.createdBy.name}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-3">
            {/* Customer Info */}
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-purple-600" />
                    <h2 className="text-sm font-semibold text-gray-900">
                      ข้อมูลลูกค้า
                    </h2>
                  </div>
                  {editingSection === 'customer-info' ? (
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-green-600 hover:text-green-700 hover:bg-green-50"
                        onClick={() => handleSaveSection('customer-info')}
                      >
                        <Check className="h-3.5 w-3.5 mr-1" />
                        <span className="text-xs">บันทึก</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                        onClick={() => handleCancelSection('customer-info')}
                      >
                        <X className="h-3.5 w-3.5 mr-1" />
                        <span className="text-xs">ยกเลิก</span>
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                      onClick={() => handleEditSection('customer-info')}
                    >
                      <Edit className="h-3.5 w-3.5 mr-1" />
                      <span className="text-xs">แก้ไข</span>
                    </Button>
                  )}
                </div>

                {editingSection === 'customer-info' ? (
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] text-gray-500 mb-1 block">บริษัท</label>
                      <Input
                        value={editedData['customer-info']?.customer?.company || quotation.customer.company}
                        onChange={(e) => handleUpdateField('customer-info', 'customer.company', e.target.value)}
                        className="h-8 text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-500 mb-1 block">ผู้ติดต่อ</label>
                      <Input
                        value={editedData['customer-info']?.customer?.contact || quotation.customer.contact}
                        onChange={(e) => handleUpdateField('customer-info', 'customer.contact', e.target.value)}
                        className="h-8 text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-500 mb-1 block">อีเมล</label>
                      <Input
                        value={editedData['customer-info']?.customer?.email || quotation.customer.email}
                        onChange={(e) => handleUpdateField('customer-info', 'customer.email', e.target.value)}
                        className="h-8 text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-500 mb-1 block">โทรศัพท์</label>
                      <Input
                        value={editedData['customer-info']?.customer?.phone || quotation.customer.phone}
                        onChange={(e) => handleUpdateField('customer-info', 'customer.phone', e.target.value)}
                        className="h-8 text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-500 mb-1 block">ที่อยู่</label>
                      <Textarea
                        value={editedData['customer-info']?.customer?.address || quotation.customer.address}
                        onChange={(e) => handleUpdateField('customer-info', 'customer.address', e.target.value)}
                        className="text-xs min-h-[60px]"
                      />
                    </div>
                  </div>
                ) : (
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
                      <p className="text-xs text-gray-600">
                        {quotation.customer.contact}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Mail className="h-4 w-4 text-gray-400 mt-0.5" />
                      <p className="text-xs text-gray-600">
                        {quotation.customer.email}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone className="h-4 w-4 text-gray-400 mt-0.5" />
                      <p className="text-xs text-gray-600">
                        {quotation.customer.phone}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                      <p className="text-xs text-gray-600">
                        {quotation.customer.address}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Introduction Section */}
            {quotation.introduction && (
              <Card className="border-gray-200 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-sm font-semibold text-gray-900">
                      Introduction / คำนำ
                    </h2>
                    {editingSection === 'introduction' ? (
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => handleSaveSection('introduction')}
                        >
                          <Check className="h-3.5 w-3.5 mr-1" />
                          <span className="text-xs">บันทึก</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                          onClick={() => handleCancelSection('introduction')}
                        >
                          <X className="h-3.5 w-3.5 mr-1" />
                          <span className="text-xs">ยกเลิก</span>
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                        onClick={() => handleEditSection('introduction')}
                      >
                        <Edit className="h-3.5 w-3.5 mr-1" />
                        <span className="text-xs">แก้ไข</span>
                      </Button>
                    )}
                  </div>

                  {editingSection === 'introduction' ? (
                    <Textarea
                      value={editedData['introduction']?.text || quotation.introduction}
                      onChange={(e) => handleUpdateField('introduction', 'text', e.target.value)}
                      className="text-xs min-h-[100px]"
                      placeholder="กรอกคำนำ..."
                    />
                  ) : (
                    <p className="text-xs text-gray-600 whitespace-pre-line">
                      {quotation.introduction}
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Scope of Work Section */}
            {quotation.scopeOfWork && (
              <Card className="border-gray-200 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-sm font-semibold text-gray-900">
                      Scope of Work / ขอบเขตงาน
                    </h2>
                    {editingSection === 'scope-of-work' ? (
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => handleSaveSection('scope-of-work')}
                        >
                          <Check className="h-3.5 w-3.5 mr-1" />
                          <span className="text-xs">บันทึก</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                          onClick={() => handleCancelSection('scope-of-work')}
                        >
                          <X className="h-3.5 w-3.5 mr-1" />
                          <span className="text-xs">ยกเลิก</span>
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                        onClick={() => handleEditSection('scope-of-work')}
                      >
                        <Edit className="h-3.5 w-3.5 mr-1" />
                        <span className="text-xs">แก้ไข</span>
                      </Button>
                    )}
                  </div>

                  {editingSection === 'scope-of-work' ? (
                    <Textarea
                      value={editedData['scope-of-work']?.text || quotation.scopeOfWork}
                      onChange={(e) => handleUpdateField('scope-of-work', 'text', e.target.value)}
                      className="text-xs min-h-[120px]"
                      placeholder="กรอกขอบเขตงาน..."
                    />
                  ) : (
                    <p className="text-xs text-gray-600 whitespace-pre-line">
                      {quotation.scopeOfWork}
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Rate Tables Section - International Freight */}
            {quotation.templateType === "international-freight" && (
              <Card className="border-gray-200 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-[#7BC9A6]" />
                      <h2 className="text-sm font-semibold text-gray-900">
                        RATE / ค่าบริการ
                      </h2>
                    </div>
                    {editingSection === 'rates' ? (
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => handleSaveSection('rates')}
                        >
                          <Check className="h-3.5 w-3.5 mr-1" />
                          <span className="text-xs">บันทึก</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                          onClick={() => handleCancelSection('rates')}
                        >
                          <X className="h-3.5 w-3.5 mr-1" />
                          <span className="text-xs">ยกเลิก</span>
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                        onClick={() => handleEditSection('rates')}
                      >
                        <Edit className="h-3.5 w-3.5 mr-1" />
                        <span className="text-xs">แก้ไข</span>
                      </Button>
                    )}
                  </div>

                  <div className="space-y-4">
                    {/* Air Freight Export */}
                    {renderRateTable(
                      '3.1.1.1 AIR FREIGHT RATE (EXPORT)',
                      quotation.airFreightExportRateData ? JSON.parse(quotation.airFreightExportRateData) : null,
                      'airFreightExport',
                      editingSection === 'rates'
                    )}

                    {/* Air Freight Import */}
                    {renderRateTable(
                      '3.1.2 AIR FREIGHT RATE (IMPORT)',
                      quotation.airFreightImportRateData ? JSON.parse(quotation.airFreightImportRateData) : null,
                      'airFreightImport',
                      editingSection === 'rates'
                    )}

                    {/* Sea Freight Export */}
                    {renderRateTable(
                      '3.2.1 SEA FREIGHT RATE (EXPORT)',
                      quotation.seaFreightExportRateData ? JSON.parse(quotation.seaFreightExportRateData) : null,
                      'seaFreightExport',
                      editingSection === 'rates'
                    )}

                    {/* Sea Freight Import */}
                    {renderRateTable(
                      '3.2.2 SEA FREIGHT RATE (IMPORT)',
                      quotation.seaFreightImportRateData ? JSON.parse(quotation.seaFreightImportRateData) : null,
                      'seaFreightImport',
                      editingSection === 'rates'
                    )}

                    {/* Rate Remarks */}
                    {(quotation.freightRateRemarks || editingSection === 'rates') && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                        {editingSection === 'rates' ? (
                          <Textarea
                            value={editedData['rates']?.remarks ?? quotation.freightRateRemarks}
                            onChange={(e) => {
                              const updatedData = { ...editedData };
                              if (!updatedData['rates']) {
                                updatedData['rates'] = {
                                  airFreightExport: { rows: [] },
                                  airFreightImport: { rows: [] },
                                  seaFreightExport: { rows: [] },
                                  seaFreightImport: { rows: [] },
                                  remarks: ''
                                };
                              }
                              updatedData['rates'].remarks = e.target.value;
                              setEditedData(updatedData);
                            }}
                            className="text-[10px] min-h-[60px] bg-white"
                            placeholder="กรอกหมายเหตุค่าบริการ..."
                          />
                        ) : (
                          <p className="text-[10px] text-gray-700 whitespace-pre-line">
                            {quotation.freightRateRemarks}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Line Items - Old format (for backward compatibility with other templates) */}
            {quotation.templateType !== "international-freight" && quotation.items && (
              <Card className="border-gray-200 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Package className="h-5 w-5 text-purple-600" />
                    <h2 className="text-sm font-semibold text-gray-900">
                      รายการสินค้า/บริการ
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {quotation.items.map((item, index) => (
                      <div
                        key={item.id}
                        className="border border-gray-200 rounded-lg p-3"
                      >
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
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-sm font-semibold text-gray-900">
                      หมายเหตุ / เงื่อนไข
                    </h2>
                    {editingSection === 'remarks' ? (
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => handleSaveSection('remarks')}
                        >
                          <Check className="h-3.5 w-3.5 mr-1" />
                          <span className="text-xs">บันทึก</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                          onClick={() => handleCancelSection('remarks')}
                        >
                          <X className="h-3.5 w-3.5 mr-1" />
                          <span className="text-xs">ยกเลิก</span>
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                        onClick={() => handleEditSection('remarks')}
                      >
                        <Edit className="h-3.5 w-3.5 mr-1" />
                        <span className="text-xs">แก้ไข</span>
                      </Button>
                    )}
                  </div>

                  {editingSection === 'remarks' ? (
                    <Textarea
                      value={editedData['remarks']?.text || quotation.remarks}
                      onChange={(e) => handleUpdateField('remarks', 'text', e.target.value)}
                      className="text-xs min-h-[120px]"
                      placeholder="กรอกหมายเหตุ/เงื่อนไข..."
                    />
                  ) : (
                    <p className="text-xs text-gray-600 whitespace-pre-line">
                      {quotation.remarks}
                    </p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-3">
              {/* Summary Card - Only show for templates with pricing data */}
              {quotation.templateType !== "international-freight" && quotation.subtotal && (
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
                            -
                            {formatCurrency(
                              quotation.subtotal - quotation.netTotal
                            )}
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
                          <span className="text-gray-600">ภาษีมูลค่าเิ่ม 7%</span>
                          <span className="font-medium text-gray-900">
                            {formatCurrency(quotation.vat)}
                          </span>
                        </div>
                      )}

                      <Separator />

                      <div className="flex justify-between p-2 bg-purple-50 rounded-lg">
                        <span className="font-semibold text-gray-900">
                          ยอดรวมทั้งสิ้น
                        </span>
                        <span className="text-base font-bold text-purple-600">
                          {formatCurrency(quotation.grandTotal)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

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

      {/* Send for Approval Confirmation Dialog */}
      <AlertDialog open={isApprovalDialogOpen} onOpenChange={setIsApprovalDialogOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-semibold text-gray-900">
              ยืนยันการส่งอนุมัติ
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-gray-600">
              กรุณาตรวจสอบรายละเอียดใบเสนอราคาก่อนส่งอนุมัติ
            </AlertDialogDescription>
          </AlertDialogHeader>

          {/* รายละเอียดใบเสนอราคา */}
          <div className="space-y-3 py-4">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">เลขที่เอกสาร</p>
                <p className="text-sm font-medium text-gray-900">{quotation.documentNumber}</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">ลูกค้า</p>
                <p className="text-sm font-medium text-gray-900">{quotation.customer.company}</p>
                <p className="text-xs text-gray-600">{quotation.customer.contact}</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-3">
              <DollarSign className="h-5 w-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">จำนวนเงินรวม</p>
                <p className="text-sm font-medium text-gray-900">
                  {formatCurrency(quotation.totalAmount)}
                </p>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">ผู้สร้าง</p>
                <p className="text-sm font-medium text-gray-900">{quotation.createdBy.name}</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">ระยะเวลาใช้งาน</p>
                <p className="text-sm font-medium text-gray-900">
                  {quotation.validity} วัน (หมดอายุ {new Date(quotation.validUntil).toLocaleDateString('th-TH', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })})
                </p>
              </div>
            </div>

            <Separator />

            {/* เลือกผู้อนุมัติ */}
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-orange-500 mt-0.5" />
              <div className="flex-1">
                <Label htmlFor="approver" className="text-xs text-gray-500 mb-1.5 block">
                  ผู้อนุมัติ <span className="text-xs text-gray-400">(สามารถเปลี่ยนได้)</span>
                </Label>
                <Select value={selectedApprover} onValueChange={setSelectedApprover}>
                  <SelectTrigger id="approver" className="h-9 text-sm">
                    <SelectValue placeholder="เลือกผู้อนุมัติ" />
                  </SelectTrigger>
                  <SelectContent>
                    {approvers.map((approver) => (
                      <SelectItem key={approver.id} value={approver.id}>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{approver.name}</span>
                          <Badge 
                            variant="outline" 
                            className={`text-[10px] px-1.5 py-0 ${
                              approver.role === 'Manager' 
                                ? 'bg-blue-50 text-blue-700 border-blue-200' 
                                : 'bg-red-50 text-red-700 border-red-200'
                            }`}
                          >
                            {approver.role}
                          </Badge>
                          <span className="text-xs text-gray-500">({approver.department})</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel className="text-xs">
              ยกเลิก
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (!selectedApprover) {
                  alert("กรุณาเลือกผู้อนุมัติ");
                  return;
                }
                const approver = approvers.find(a => a.id === selectedApprover);
                setCurrentStatus("Pending Approval");
                setIsApprovalDialogOpen(false);
                setSelectedApprover("");
                alert(`ส่งใบเสนอราคาเพื่อขออนุมัติจาก ${approver?.name} สำเร็จ`);
              }}
              className="bg-orange-600 hover:bg-orange-700 text-white text-xs"
              disabled={!selectedApprover}
            >
              ยืนยันส่งอนุมัติ
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}