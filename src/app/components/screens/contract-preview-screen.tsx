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
  Clock,
  RefreshCw,
} from "lucide-react";
import { Button } from "../ui/button";

interface ContractPreviewScreenProps {
  contractId: string;
  onBack: () => void;
}

export function ContractPreviewScreen({
  contractId,
  onBack,
}: ContractPreviewScreenProps) {
  const [isEditing, setIsEditing] = useState(false);

  // Mock data - ในระบบจริงจะดึงจาก API
  const [contract, setContract] = useState({
    id: contractId,
    documentNumber: "CNT2024123456",
    contractNumber: "GFS-2024-AIR-001",
    name: "International Air Freight Master Agreement",
    customer: {
      company: "Global Freight Solutions Inc.",
      contact: "Mr. Robert Johnson",
      email: "robert.j@globalfreight.com",
      phone: "+66 2 456 7890",
      address: "555 Business Tower, Sukhumvit Road, Bangkok 10110, Thailand",
      taxId: "0105558765432",
    },
    status: "Active",
    startDate: "2024-01-15",
    endDate: "2026-01-14",
    duration: "24 เดือน",
    currency: "THB",
    includeVat: true,
    paymentTerm: "30",
    autoRenewal: true,
    terms: "1. ข้อกำหนดและเงื่อนไข\n   1.1 สัญญานี้มีผลบังคับใช้ตั้งแต่วันที่ 15 มกราคม 2567 ถึงวันที่ 14 มกราคม 2569\n   1.2 ระยะเวลาสัญญา 24 เดือน พร้อมต่ออายุอัตโนมัติ\n   1.3 เงื่อนไขการชำระเงิน: เครดิต 30 วัน หลังวันที่ออกใบกำกับภาษี\n\n2. ขอบเขตการให้บริการ\n   2.1 บริการขนส่งทางอากาศระหว่างประเทศ\n   2.2 บริการพิธีการศุลกากร\n   2.3 บริการประกันภัยสินค้า\n\n3. มูลค่าและค่าบริการ\n   3.1 มูลค่าสัญญารวม 7,350,000 บาท (รวม VAT)\n   3.2 การชำระเงินเป็นรายเดือน\n   3.3 ราคาคงที่ตลอดระยะเวลาสัญญา\n\n4. การยกเลิกสัญญา\n   4.1 แจ้งล่วงหน้าอย่างน้อย 60 วัน\n   4.2 เสียค่าปรับกรณียกเลิกก่อนกำหนด\n\n5. ความรับผิดชอบ\n   5.1 รับประกันการส่งมอบตรงเวลา 99.5%\n   5.2 ประกันภัยสินค้าครบถ้วน\n   5.3 ชดเชยความเสียหายตามเงื่อนไข",
    items: [
      {
        id: "1",
        itemName: "บริการขนส่งทางอากาศ (Air Freight)",
        description: "ขนส่งสินค้าทางอากาศระหว่างประเทศ - ปริมาณ 1,000 kg/เดือน",
        quantity: 24,
        unit: "เดือน",
        unitPrice: 250000,
        discount: 0,
      },
      {
        id: "2",
        itemName: "บริการพิธีการศุลกากร",
        description: "ดำเนินการศุลกากรนำเข้า-ส่งออก รวมเอกสาร",
        quantity: 24,
        unit: "เดือน",
        unitPrice: 50000,
        discount: 0,
      },
      {
        id: "3",
        itemName: "ค่าประกันภัยสินค้า",
        description: "ประกันภัยสินค้าระหว่างการขนส่ง ครอบคลุมเต็มมูลค่า",
        quantity: 24,
        unit: "เดือน",
        unitPrice: 12500,
        discount: 5,
      },
    ],
    globalDiscount: 2,
    globalDiscountType: "percent",
    sla: [
      "รับประกันการส่งมอบตรงเวลา 99.5%",
      "ระบบติดตามสินค้าแบบ Real-time 24/7",
      "บริการดูแลลูกค้าตลอด 24 ชั่วโมง",
      "ตอบสนองปัญหาภายใน 4 ชั่วโมง",
    ],
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

  const [originalContract, setOriginalContract] = useState(contract);

  const calculateLineTotal = (item: any) => {
    const subtotal = item.quantity * item.unitPrice;
    const discountAmount = subtotal * (item.discount / 100);
    return subtotal - discountAmount;
  };

  const calculateSubtotal = () => {
    return contract.items.reduce((sum, item) => sum + calculateLineTotal(item), 0);
  };

  const calculateGlobalDiscountAmount = () => {
    const subtotal = calculateSubtotal();
    if (contract.globalDiscountType === "percent") {
      return subtotal * (contract.globalDiscount / 100);
    }
    return contract.globalDiscount;
  };

  const calculateNetTotal = () => {
    const subtotal = calculateSubtotal();
    const globalDiscountAmount = calculateGlobalDiscountAmount();
    return subtotal - globalDiscountAmount;
  };

  const calculateVat = () => {
    if (!contract.includeVat) return 0;
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
    setOriginalContract(JSON.parse(JSON.stringify(contract)));
    setIsEditing(true);
  };

  const handleSave = () => {
    console.log("Saving:", contract);
    alert("บันทึกการแก้ไขเรียบร้อย");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setContract(originalContract);
    setIsEditing(false);
  };

  const updateCustomer = (field: string, value: string) => {
    setContract({
      ...contract,
      customer: {
        ...contract.customer,
        [field]: value,
      },
    });
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...contract.items];
    newItems[index] = {
      ...newItems[index],
      [field]: value,
    };
    setContract({
      ...contract,
      items: newItems,
    });
  };

  const updateSLA = (index: number, value: string) => {
    const newSLA = [...contract.sla];
    newSLA[index] = value;
    setContract({
      ...contract,
      sla: newSLA,
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
                  {isEditing ? "แก้ไขเอกสาร" : "ดูตัวอย่างสัญญา"}
                </h1>
                <p className="text-xs text-gray-500">
                  {contract.contractNumber}
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
                    className="h-9 px-3 text-xs bg-[#7BC9A6] hover:bg-[#6AB896] text-white"
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
                    className="h-9 px-3 text-xs bg-[#7BC9A6] hover:bg-[#6AB896] text-white"
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
        <div className={`bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none print:rounded-none ${isEditing ? 'ring-2 ring-orange-600' : ''}`}>
          {/* Document Paper */}
          <div className="p-8 sm:p-12">
            {/* Header */}
            <div className="flex items-start justify-between mb-8 pb-6 border-b-2 border-orange-600">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-orange-600 mb-2">
                  {contract.company.name}
                </h1>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>{contract.company.address}</p>
                  <p>โทร: {contract.company.phone}</p>
                  <p>อีเมล: {contract.company.email}</p>
                  <p>เลขประจำตัวผู้เสียภาษี: {contract.company.taxId}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="inline-block bg-orange-600 text-white px-4 py-2 rounded-lg mb-3">
                  <p className="text-xs font-medium">สัญญาการให้บริการ</p>
                  <p className="text-lg font-bold">SERVICE CONTRACT</p>
                </div>
                <div className="text-xs text-gray-600">
                  <p className="font-medium text-gray-900 mb-1">
                    เลขที่: {contract.contractNumber}
                  </p>
                  <p>วันที่เริ่มต้น: {formatDate(contract.startDate)}</p>
                </div>
              </div>
            </div>

            {/* Contract Title */}
            <div className="mb-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border-2 border-orange-200">
              {isEditing ? (
                <input
                  type="text"
                  value={contract.name}
                  onChange={(e) => setContract({ ...contract, name: e.target.value })}
                  className="w-full px-3 py-2 text-xl font-bold text-gray-900 border border-orange-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                />
              ) : (
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {contract.name}
                </h2>
              )}
              <p className="text-sm text-gray-600">
                สัญญาฉบับนี้ทำขึ้นระหว่าง {contract.company.name} และ {contract.customer.company}
              </p>
            </div>

            {/* Customer Info & Contract Info */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              {/* Customer Info */}
              <div>
                <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-orange-600" />
                  คู่สัญญา (ลูกค้า)
                </h2>
                <div className="text-xs text-gray-600 space-y-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={contract.customer.company}
                      onChange={(e) => updateCustomer("company", e.target.value)}
                      className="w-full px-2 py-1 text-sm font-medium text-gray-900 border border-orange-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                    />
                  ) : (
                    <p className="font-medium text-gray-900 text-sm">
                      {contract.customer.company}
                    </p>
                  )}
                  
                  {isEditing ? (
                    <input
                      type="text"
                      value={contract.customer.contact}
                      onChange={(e) => updateCustomer("contact", e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-orange-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                      placeholder="ผู้ติดต่อ"
                    />
                  ) : (
                    <p>ผู้ติดต่อ: {contract.customer.contact}</p>
                  )}

                  {isEditing ? (
                    <textarea
                      value={contract.customer.address}
                      onChange={(e) => updateCustomer("address", e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-orange-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                      rows={2}
                      placeholder="ที่อยู่"
                    />
                  ) : (
                    <p className="flex items-start gap-1.5">
                      <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      <span>{contract.customer.address}</span>
                    </p>
                  )}

                  {isEditing ? (
                    <input
                      type="text"
                      value={contract.customer.phone}
                      onChange={(e) => updateCustomer("phone", e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-orange-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                      placeholder="เบอร์โทร"
                    />
                  ) : (
                    <p className="flex items-center gap-1.5">
                      <Phone className="h-3 w-3" />
                      <span>{contract.customer.phone}</span>
                    </p>
                  )}

                  {isEditing ? (
                    <input
                      type="email"
                      value={contract.customer.email}
                      onChange={(e) => updateCustomer("email", e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-orange-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                      placeholder="อีเมล"
                    />
                  ) : (
                    <p className="flex items-center gap-1.5">
                      <Mail className="h-3 w-3" />
                      <span>{contract.customer.email}</span>
                    </p>
                  )}

                  {contract.customer.taxId && (
                    isEditing ? (
                      <input
                        type="text"
                        value={contract.customer.taxId}
                        onChange={(e) => updateCustomer("taxId", e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-orange-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                        placeholder="เลขประจำตัวผู้เสียภาษี"
                      />
                    ) : (
                      <p>เลขประจำตัวผู้เสียภาษี: {contract.customer.taxId}</p>
                    )
                  )}
                </div>
              </div>

              {/* Contract Info */}
              <div>
                <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-orange-600" />
                  รายละเอียดสัญญา
                </h2>
                <div className="text-xs space-y-2">
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-600">วันที่เริ่มสัญญา:</span>
                    <span className="font-medium text-gray-900">
                      {formatDate(contract.startDate)}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-600">วันที่สิ้นสุดสัญญา:</span>
                    <span className="font-medium text-gray-900">
                      {formatDate(contract.endDate)}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-600">ระยะเวลา:</span>
                    <span className="font-medium text-gray-900">
                      {contract.duration}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-600">เงื่อนไขการชำระเงิน:</span>
                    <span className="font-medium text-gray-900">
                      {contract.paymentTerm === "0"
                        ? "เงินสด"
                        : `เครดิต ${contract.paymentTerm} วัน`}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-600">ต่ออายุอัตโนมัติ:</span>
                    <span className={`font-medium flex items-center gap-1 ${contract.autoRenewal ? 'text-green-600' : 'text-gray-500'}`}>
                      <RefreshCw className="h-3 w-3" />
                      {contract.autoRenewal ? "เปิดใช้งาน" : "ไม่เปิดใช้งาน"}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-gray-600">สถานะ:</span>
                    <span className="font-medium text-green-600 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      {contract.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-gray-900 mb-3">
                ขอบเขตการให้บริการและค่าใช้จ่าย
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
                      <th className="text-center px-3 py-2.5 font-semibold text-gray-700 w-20">
                        หน่วย
                      </th>
                      <th className="text-right px-3 py-2.5 font-semibold text-gray-700 w-32">
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
                    {contract.items.map((item, index) => (
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
                                className="w-full px-2 py-1 text-xs font-medium border border-orange-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                              />
                              <input
                                type="text"
                                value={item.description}
                                onChange={(e) => updateItem(index, "description", e.target.value)}
                                className="w-full px-2 py-1 text-[10px] border border-orange-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
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
                              className="w-full px-2 py-1 text-xs text-center border border-orange-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
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
                              className="w-full px-2 py-1 text-xs text-center border border-orange-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
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
                              className="w-full px-2 py-1 text-xs text-right border border-orange-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
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
                              className="w-full px-2 py-1 text-xs text-right border border-orange-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
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

                  {contract.globalDiscount > 0 && (
                    <div className="flex justify-between py-2 border-b border-gray-100 text-red-600">
                      <span>
                        ส่วนลดรวม (
                        {contract.globalDiscountType === "percent"
                          ? `${contract.globalDiscount}%`
                          : `${formatCurrency(contract.globalDiscount)} บาท`}
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

                  {contract.includeVat && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">ภาษีมูลค่าเพิ่ม 7%:</span>
                      <span className="font-medium text-gray-900">
                        {formatCurrency(calculateVat())} บาท
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between py-3 bg-orange-600 bg-opacity-10 rounded-lg px-3 mt-2">
                    <span className="font-semibold text-gray-900">
                      มูลค่าสัญญาทั้งสิ้น:
                    </span>
                    <span className="text-lg font-bold text-orange-600">
                      {formatCurrency(calculateGrandTotal())} บาท
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* SLA */}
            <div className="mb-8 p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
              <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                ระดับการให้บริการ (Service Level Agreement)
              </h2>
              <div className="space-y-2">
                {contract.sla.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateSLA(index, e.target.value)}
                        className="flex-1 px-2 py-1 text-xs border border-blue-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    ) : (
                      <p className="text-xs text-gray-700">{item}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Terms & Conditions */}
            {contract.terms && (
              <div className="mb-8">
                <h2 className="text-sm font-semibold text-gray-900 mb-3">
                  ข้อกำหนดและเงื่อนไขของสัญญา
                </h2>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  {isEditing ? (
                    <textarea
                      value={contract.terms}
                      onChange={(e) => setContract({ ...contract, terms: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-orange-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-600 font-mono"
                      rows={15}
                    />
                  ) : (
                    <p className="text-xs text-gray-700 whitespace-pre-line font-mono">
                      {contract.terms}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Signature Section */}
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="border-b border-gray-300 mb-2 pb-12"></div>
                <p className="text-xs text-gray-600">ผู้ให้บริการ</p>
                <p className="text-xs font-medium text-gray-900 mt-1">{contract.company.name}</p>
                <p className="text-xs text-gray-500 mt-1">
                  วันที่: ......../......../..........
                </p>
              </div>
              <div className="text-center">
                <div className="border-b border-gray-300 mb-2 pb-12"></div>
                <p className="text-xs text-gray-600">ผู้รับบริการ</p>
                <p className="text-xs font-medium text-gray-900 mt-1">{contract.customer.company}</p>
                <p className="text-xs text-gray-500 mt-1">
                  วันที่: ......../......../..........
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-xs text-gray-500">
                เอกสารฉบับนี้ออกโดยระบบอัตโนมัติ • {contract.company.name}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {contract.company.website} • {contract.company.email}
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