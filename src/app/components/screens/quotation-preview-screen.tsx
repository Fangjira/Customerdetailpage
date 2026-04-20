import { useState } from "react";
import {
  ArrowLeft,
  Download,
  Send,
  Printer,
  Edit,
  Save,
  X,
  CheckCircle2,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Building2,
  FileText,
} from "lucide-react";
import { Button } from "../ui/button";

interface QuotationPreviewScreenProps {
  quotationId: string;
  onBack: () => void;
  onEdit?: () => void;
  onNavigate?: (path: string) => void;
}

export function QuotationPreviewScreen({
  quotationId,
  onBack,
  onEdit,
  onNavigate,
}: QuotationPreviewScreenProps) {
  const [isEditing, setIsEditing] = useState(false);

  // Mock data - ในระบบจริงจะดึงจาก API
  const [quotation, setQuotation] = useState({
    id: "QT-2024-001",
    documentNumber: "QT2024123456",
    name: "ใบเสนอราคาขนส่งทางอากาศระหว่างประเทศ",
    customer: {
      company: "บริษัท แอคมี คอร์ปอเรชั่น จำกัด",
      contact: "คุณสมชาย ใจดี",
      email: "somchai@acme.co.th",
      phone: "02-123-4567",
      address: "123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110",
      taxId: "0105558123456",
    },
    status: "Approved",
    issueDate: "2024-12-01",
    validUntil: "2024-12-31",
    validity: 30,
    currency: "THB",
    includeVat: true,
    paymentTerm: "30",
    remarks: "1. ราคาดังกล่าวยังไม่รวมภาษีมูลค่าเพิ่ม 7%\n2. ใบเสนอราคานี้มีอายุ 30 วัน นับจากวันที่ออกเอกสาร\n3. เงื่อนไขการชำระเงิน: เครดิต 30 วัน หลังวันที่ออกใบกำกับภาษี",
    items: [
      {
        id: "1",
        itemName: "บริการขนส่งทางอากาศ (Air Freight)",
        description: "ขนส่งสินค้าทางอากาศจากไทยไปญี่ปุ่น",
        quantity: 5,
        unit: "Shipment",
        unitPrice: 850000,
        discount: 5,
      },
      {
        id: "2",
        itemName: "บริการพิธีการศุลกากร",
        description: "ดำเนินการศุลกากรนำเข้า-ส่งออก",
        quantity: 5,
        unit: "Shipment",
        unitPrice: 125000,
        discount: 0,
      },
      {
        id: "3",
        itemName: "ค่าประกันภัยสินค้า",
        description: "ประกันภัยสินค้าระหว่างการขนส่ง",
        quantity: 1,
        unit: "ชุด",
        unitPrice: 450000,
        discount: 10,
      },
    ],
    globalDiscount: 2,
    globalDiscountType: "percent",
    // Company Info
    company: {
      name: "mini CRM Logistics",
      address: "999 อาคารออฟฟิศพาร์ค ชั้น 15 ถนนพระราม 4 แขวงสีลม เขตบางรัก กรุงเทพมหานคร 10500",
      phone: "02-234-5678",
      email: "info@onelink-logistics.com",
      taxId: "0105559876543",
      website: "www.onelink-logistics.com",
    },
  });

  const [originalQuotation, setOriginalQuotation] = useState(quotation);

  const calculateLineTotal = (item: any) => {
    const subtotal = item.quantity * item.unitPrice;
    const discountAmount = subtotal * (item.discount / 100);
    return subtotal - discountAmount;
  };

  const calculateSubtotal = () => {
    return quotation.items.reduce((sum, item) => sum + calculateLineTotal(item), 0);
  };

  const calculateGlobalDiscountAmount = () => {
    const subtotal = calculateSubtotal();
    if (quotation.globalDiscountType === "percent") {
      return subtotal * (quotation.globalDiscount / 100);
    }
    return quotation.globalDiscount;
  };

  const calculateNetTotal = () => {
    const subtotal = calculateSubtotal();
    const globalDiscountAmount = calculateGlobalDiscountAmount();
    return subtotal - globalDiscountAmount;
  };

  const calculateVat = () => {
    if (!quotation.includeVat) return 0;
    return calculateNetTotal() * 0.07;
  };

  const calculateGrandTotal = () => {
    return calculateNetTotal() + calculateVat();
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("th-TH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert("ดาวน์โหลด PDF (ยังไม่ได้เชื่อมต่อ)");
  };

  const handleDownloadWord = () => {
    alert("ดาวน์โหลด Word (ยังไม่ได้เชื่อมต่อ)");
  };

  const handleSend = () => {
    alert("ส่งอีเมลให้ลูกค้า (ยังไม่ได้เชื่อมต่อ)");
  };

  const handleEdit = () => {
    setOriginalQuotation(JSON.parse(JSON.stringify(quotation)));
    setIsEditing(true);
  };

  const handleSave = () => {
    // TODO: Save to backend
    console.log("Saving:", quotation);
    alert("บันทึกการแก้ไขเรียบร้อย");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setQuotation(originalQuotation);
    setIsEditing(false);
  };

  const updateCustomer = (field: string, value: string) => {
    setQuotation({
      ...quotation,
      customer: {
        ...quotation.customer,
        [field]: value,
      },
    });
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...quotation.items];
    newItems[index] = {
      ...newItems[index],
      [field]: value,
    };
    setQuotation({
      ...quotation,
      items: newItems,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Action Bar - Hidden on Print */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm print:hidden">
        <div className="max-w-[1200px] mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="h-9 w-9 p-0"
                disabled={isEditing}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-sm font-semibold text-gray-900">
                  {isEditing ? "แก้ไขเอกสาร" : "ดูตัวอย่างเอกสาร"}
                </h1>
                <p className="text-xs text-gray-500">
                  {quotation.documentNumber}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isEditing ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancel}
                    className="h-9 px-3 text-xs"
                  >
                    <X className="h-3.5 w-3.5 mr-1.5" />
                    ยกเลิก
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSave}
                    className="h-9 px-3 text-xs bg-purple-600 hover:bg-purple-700"
                  >
                    <Save className="h-3.5 w-3.5 mr-1.5" />
                    บันทึก
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleEdit}
                    className="h-9 px-3 text-xs"
                  >
                    <Edit className="h-3.5 w-3.5 mr-1.5" />
                    แก้ไข
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrint}
                    className="h-9 px-3 text-xs"
                  >
                    <Printer className="h-3.5 w-3.5 mr-1.5" />
                    พิมพ์
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownload}
                    className="h-9 px-3 text-xs"
                  >
                    <Download className="h-3.5 w-3.5 mr-1.5" />
                    ดาวน์โหลด PDF
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadWord}
                    className="h-9 px-3 text-xs"
                  >
                    <Download className="h-3.5 w-3.5 mr-1.5" />
                    ดาวน์โหลด Word
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSend}
                    className="h-9 px-3 text-xs bg-purple-600 hover:bg-purple-700"
                  >
                    <Send className="h-3.5 w-3.5 mr-1.5" />
                    ส่งให้ลูกค้า
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Document Content */}
      <div className="max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-8">
        <div className={`bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none print:rounded-none ${isEditing ? 'ring-2 ring-[#7BC9A6]' : ''}`}>
          {/* Document Paper */}
          <div className="p-8 sm:p-12">
            {/* Header */}
            <div className="flex items-start justify-between mb-8 pb-6 border-b-2 border-gray-600">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-700 mb-2">
                  {quotation.company.name}
                </h1>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>{quotation.company.address}</p>
                  <p>โทร: {quotation.company.phone}</p>
                  <p>อีเมล: {quotation.company.email}</p>
                  <p>เลขประจำตัวผู้เสียภาษี: {quotation.company.taxId}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="inline-block bg-gray-600 text-white px-4 py-2 rounded-lg mb-3">
                  <p className="text-xs font-medium">ใบเสนอราคา</p>
                  <p className="text-lg font-bold">QUOTATION</p>
                </div>
                <div className="text-xs text-gray-600">
                  <p className="font-medium text-gray-900 mb-1">
                    เลขที่: {quotation.documentNumber}
                  </p>
                  <p>วันที่: {formatDate(quotation.issueDate)}</p>
                </div>
              </div>
            </div>

            {/* Customer Info & Document Info */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              {/* Customer Info */}
              <div>
                <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-gray-600" />
                  ลูกค้า
                </h2>
                <div className="text-xs text-gray-600 space-y-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={quotation.customer.company}
                      onChange={(e) => updateCustomer("company", e.target.value)}
                      className="w-full px-2 py-1 text-sm font-medium text-gray-900 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />
                  ) : (
                    <p className="font-medium text-gray-900 text-sm">
                      {quotation.customer.company}
                    </p>
                  )}
                  
                  {isEditing ? (
                    <input
                      type="text"
                      value={quotation.customer.contact}
                      onChange={(e) => updateCustomer("contact", e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                      placeholder="ผู้ติดต่อ"
                    />
                  ) : (
                    <p>ผู้ติดต่อ: {quotation.customer.contact}</p>
                  )}

                  {isEditing ? (
                    <textarea
                      value={quotation.customer.address}
                      onChange={(e) => updateCustomer("address", e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                      rows={2}
                      placeholder="ที่อยู่"
                    />
                  ) : (
                    <p className="flex items-start gap-1.5">
                      <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      <span>{quotation.customer.address}</span>
                    </p>
                  )}

                  {isEditing ? (
                    <input
                      type="text"
                      value={quotation.customer.phone}
                      onChange={(e) => updateCustomer("phone", e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                      placeholder="เบอร์โทร"
                    />
                  ) : (
                    <p className="flex items-center gap-1.5">
                      <Phone className="h-3 w-3" />
                      <span>{quotation.customer.phone}</span>
                    </p>
                  )}

                  {isEditing ? (
                    <input
                      type="email"
                      value={quotation.customer.email}
                      onChange={(e) => updateCustomer("email", e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                      placeholder="อีเมล"
                    />
                  ) : (
                    <p className="flex items-center gap-1.5">
                      <Mail className="h-3 w-3" />
                      <span>{quotation.customer.email}</span>
                    </p>
                  )}

                  {quotation.customer.taxId && (
                    isEditing ? (
                      <input
                        type="text"
                        value={quotation.customer.taxId}
                        onChange={(e) => updateCustomer("taxId", e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                        placeholder="เลขประจำตัวผู้เสียภาษี"
                      />
                    ) : (
                      <p>เลขประจำตัวผู้เสียภาษี: {quotation.customer.taxId}</p>
                    )
                  )}
                </div>
              </div>

              {/* Document Info */}
              <div>
                <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-600" />
                  รายละเอียดเอกสาร
                </h2>
                <div className="text-xs space-y-2">
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-600">วันที่ออกเอกสาร:</span>
                    <span className="font-medium text-gray-900">
                      {formatDate(quotation.issueDate)}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-600">ใช้ได้ถึงวันที่:</span>
                    <span className="font-medium text-gray-900">
                      {formatDate(quotation.validUntil)}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-600">เงื่อนไขการชำระเงิน:</span>
                    <span className="font-medium text-gray-900">
                      {quotation.paymentTerm === "0"
                        ? "เงินสด"
                        : `เครดิต ${quotation.paymentTerm} วัน`}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-gray-600">สถานะ:</span>
                    <span className="font-medium text-green-600 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      {quotation.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-gray-900 mb-3">
                รายการสินค้า/บริการ
              </h2>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-3 py-2.5 font-semibold text-gray-700 w-12">
                        ลำดับ
                      </th>
                      <th className="text-left px-3 py-2.5 font-semibold text-gray-700">
                        รายการ
                      </th>
                      <th className="text-center px-3 py-2.5 font-semibold text-gray-700 w-20">
                        จำนวน
                      </th>
                      <th className="text-center px-3 py-2.5 font-semibold text-gray-700 w-16">
                        หน่วย
                      </th>
                      <th className="text-right px-3 py-2.5 font-semibold text-gray-700 w-28">
                        ราคา/หน่วย
                      </th>
                      <th className="text-right px-3 py-2.5 font-semibold text-gray-700 w-20">
                        ส่วนลด
                      </th>
                      <th className="text-right px-3 py-2.5 font-semibold text-gray-700 w-32">
                        จำนวนเงิน
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {quotation.items.map((item, index) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-3 py-3 text-gray-600">
                          {index + 1}
                        </td>
                        <td className="px-3 py-3">
                          {isEditing ? (
                            <div className="space-y-1">
                              <input
                                type="text"
                                value={item.itemName}
                                onChange={(e) => updateItem(index, "itemName", e.target.value)}
                                className="w-full px-2 py-1 text-xs font-medium border border-[#7BC9A6] rounded focus:outline-none focus:ring-2 focus:ring-[#7BC9A6]"
                              />
                              <input
                                type="text"
                                value={item.description}
                                onChange={(e) => updateItem(index, "description", e.target.value)}
                                className="w-full px-2 py-1 text-[10px] border border-[#7BC9A6] rounded focus:outline-none focus:ring-2 focus:ring-[#7BC9A6]"
                              />
                            </div>
                          ) : (
                            <>
                              <p className="font-medium text-gray-900">
                                {item.itemName}
                              </p>
                              {item.description && (
                                <p className="text-[10px] text-gray-500 mt-0.5">
                                  {item.description}
                                </p>
                              )}
                            </>
                          )}
                        </td>
                        <td className="px-3 py-3 text-center text-gray-900">
                          {isEditing ? (
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateItem(index, "quantity", parseFloat(e.target.value))}
                              className="w-full px-2 py-1 text-xs text-center border border-[#7BC9A6] rounded focus:outline-none focus:ring-2 focus:ring-[#7BC9A6]"
                            />
                          ) : (
                            formatCurrency(item.quantity)
                          )}
                        </td>
                        <td className="px-3 py-3 text-center text-gray-600">
                          {isEditing ? (
                            <input
                              type="text"
                              value={item.unit}
                              onChange={(e) => updateItem(index, "unit", e.target.value)}
                              className="w-full px-2 py-1 text-xs text-center border border-[#7BC9A6] rounded focus:outline-none focus:ring-2 focus:ring-[#7BC9A6]"
                            />
                          ) : (
                            item.unit
                          )}
                        </td>
                        <td className="px-3 py-3 text-right text-gray-900">
                          {isEditing ? (
                            <input
                              type="number"
                              value={item.unitPrice}
                              onChange={(e) => updateItem(index, "unitPrice", parseFloat(e.target.value))}
                              className="w-full px-2 py-1 text-xs text-right border border-[#7BC9A6] rounded focus:outline-none focus:ring-2 focus:ring-[#7BC9A6]"
                            />
                          ) : (
                            formatCurrency(item.unitPrice)
                          )}
                        </td>
                        <td className="px-3 py-3 text-right text-gray-600">
                          {isEditing ? (
                            <input
                              type="number"
                              value={item.discount}
                              onChange={(e) => updateItem(index, "discount", parseFloat(e.target.value))}
                              className="w-full px-2 py-1 text-xs text-right border border-[#7BC9A6] rounded focus:outline-none focus:ring-2 focus:ring-[#7BC9A6]"
                            />
                          ) : (
                            `${item.discount}%`
                          )}
                        </td>
                        <td className="px-3 py-3 text-right font-medium text-gray-900">
                          {formatCurrency(calculateLineTotal(item))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary */}
            <div className="flex justify-end mb-8">
              <div className="w-full sm:w-96">
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">ยอดรวมก่อนหักส่วนลด:</span>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(calculateSubtotal())} บาท
                    </span>
                  </div>

                  {quotation.globalDiscount > 0 && (
                    <div className="flex justify-between py-2 border-b border-gray-100 text-red-600">
                      <span>
                        ส่วนลดรวม (
                        {quotation.globalDiscountType === "percent"
                          ? `${quotation.globalDiscount}%`
                          : `${formatCurrency(quotation.globalDiscount)} บาท`}
                        ):
                      </span>
                      <span className="font-medium">
                        -{formatCurrency(calculateGlobalDiscountAmount())} บาท
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">ยอดรวมหลังหักส่วนลด:</span>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(calculateNetTotal())} บาท
                    </span>
                  </div>

                  {quotation.includeVat && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">ภาษีมูลค่าเพิ่ม 7%:</span>
                      <span className="font-medium text-gray-900">
                        {formatCurrency(calculateVat())} บาท
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between py-3 bg-gray-100 rounded-lg px-3 mt-2">
                    <span className="font-semibold text-gray-900">
                      ยอดรวมทั้งสิ้น:
                    </span>
                    <span className="text-lg font-bold text-gray-700">
                      {formatCurrency(calculateGrandTotal())} บาท
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Remarks */}
            {quotation.remarks && (
              <div className="mb-8">
                <h2 className="text-sm font-semibold text-gray-900 mb-3">
                  หมายเหตุ / เงื่อนไข
                </h2>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  {isEditing ? (
                    <textarea
                      value={quotation.remarks}
                      onChange={(e) => setQuotation({ ...quotation, remarks: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-[#7BC9A6] rounded focus:outline-none focus:ring-2 focus:ring-[#7BC9A6]"
                      rows={4}
                    />
                  ) : (
                    <p className="text-xs text-gray-700 whitespace-pre-line">
                      {quotation.remarks}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Signature Section */}
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="border-b border-gray-300 mb-2 pb-12"></div>
                <p className="text-xs text-gray-600">ผู้เสนอราคา</p>
                <p className="text-xs text-gray-500 mt-1">
                  วันที่: ......../......../.........
                </p>
              </div>
              <div className="text-center">
                <div className="border-b border-gray-300 mb-2 pb-12"></div>
                <p className="text-xs text-gray-600">ผู้อนุมัติ</p>
                <p className="text-xs text-gray-500 mt-1">
                  วันที่: ......../......../.........
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-xs text-gray-500">
                เอกสารฉบับนี้ออกโดยระบบอัตโนมัติ • {quotation.company.name}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {quotation.company.website} • {quotation.company.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          
          @page {
            margin: 1cm;
            size: A4;
          }
          
          .print\\:hidden {
            display: none !important;
          }
        }
      `}} />
    </div>
  );
}