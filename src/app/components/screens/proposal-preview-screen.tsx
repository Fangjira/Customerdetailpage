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
import { getMockProposalPreviewData } from "../../utils/mock-proposals-data";

interface ProposalPreviewScreenProps {
  proposalId: string;
  onNavigate: (path: string, id?: string) => void;
}

export function ProposalPreviewScreen({
  proposalId,
  onNavigate,
}: ProposalPreviewScreenProps) {
  const [isEditing, setIsEditing] = useState(false);

  // Get proposal data from utility
  const initialProposal = getMockProposalPreviewData(proposalId);
  const [proposal, setProposal] = useState(initialProposal);
  const [originalProposal, setOriginalProposal] = useState(initialProposal);

  const calculateLineTotal = (item: any) => {
    const subtotal = item.quantity * item.unitPrice;
    const discountAmount = subtotal * (item.discount / 100);
    return subtotal - discountAmount;
  };

  const calculateSubtotal = () => {
    return proposal.items.reduce((sum, item) => sum + calculateLineTotal(item), 0);
  };

  const calculateGlobalDiscountAmount = () => {
    const subtotal = calculateSubtotal();
    if (proposal.globalDiscountType === "percent") {
      return subtotal * (proposal.globalDiscount / 100);
    }
    return proposal.globalDiscount;
  };

  const calculateNetTotal = () => {
    const subtotal = calculateSubtotal();
    const globalDiscountAmount = calculateGlobalDiscountAmount();
    return subtotal - globalDiscountAmount;
  };

  const calculateVat = () => {
    if (!proposal.includeVat) return 0;
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
    setOriginalProposal(JSON.parse(JSON.stringify(proposal)));
    setIsEditing(true);
  };

  const handleSave = () => {
    console.log("Saving:", proposal);
    alert("บันทึกการแก้ไขเรียบร้อย");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProposal(originalProposal);
    setIsEditing(false);
  };

  const handleBack = () => {
    onNavigate("/proposals-contracts");
  };

  const updateCustomer = (field: string, value: string) => {
    setProposal({
      ...proposal,
      customer: {
        ...proposal.customer,
        [field]: value,
      },
    });
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...proposal.items];
    newItems[index] = {
      ...newItems[index],
      [field]: value,
    };
    setProposal({
      ...proposal,
      items: newItems,
    });
  };

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...proposal.benefits];
    newBenefits[index] = value;
    setProposal({
      ...proposal,
      benefits: newBenefits,
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
                onClick={handleBack}
                className="h-9 w-9 p-0"
                disabled={isEditing}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-sm font-semibold text-gray-900">
                  {isEditing ? "แก้ไขเอกสาร" : "ดูตัวอย่างข้อเสนอโครงการ"}
                </h1>
                <p className="text-xs text-gray-500">
                  {proposal.documentNumber}
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
        <div className={`bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none print:rounded-none ${isEditing ? 'ring-2 ring-purple-600' : ''}`}>
          {/* Document Paper */}
          <div className="p-8 sm:p-12">
            {/* Header */}
            <div className="flex items-start justify-between mb-8 pb-6 border-b-2 border-gray-600">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-700 mb-2">
                  {proposal.company.name}
                </h1>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>{proposal.company.address}</p>
                  <p>โทร: {proposal.company.phone}</p>
                  <p>อีเมล: {proposal.company.email}</p>
                  <p>เลขประจำตัวผู้เสียภาษี: {proposal.company.taxId}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="inline-block bg-gray-600 text-white px-4 py-2 rounded-lg mb-3">
                  <p className="text-xs font-medium">ข้อเสนอโครงการ</p>
                  <p className="text-lg font-bold">BUSINESS PROPOSAL</p>
                </div>
                <div className="text-xs text-gray-600">
                  <p className="font-medium text-gray-900 mb-1">
                    เลขที่: {proposal.documentNumber}
                  </p>
                  <p>วันที่: {formatDate(proposal.issueDate)}</p>
                </div>
              </div>
            </div>

            {/* Proposal Title */}
            <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border-2 border-gray-300">
              {isEditing ? (
                <input
                  type="text"
                  value={proposal.name}
                  onChange={(e) => setProposal({ ...proposal, name: e.target.value })}
                  className="w-full px-3 py-2 text-xl font-bold text-gray-900 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
              ) : (
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {proposal.name}
                </h2>
              )}
              <p className="text-sm text-gray-600">
                ข้อเสนอโครงการสำหรับ {proposal.customer.company}
              </p>
            </div>

            {/* Customer Info & Document Info */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              {/* Customer Info */}
              <div>
                <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-gray-600" />
                  ข้อมูลลูกค้า
                </h2>
                <div className="text-xs text-gray-600 space-y-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={proposal.customer.company}
                      onChange={(e) => updateCustomer("company", e.target.value)}
                      className="w-full px-2 py-1 text-sm font-medium text-gray-900 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />
                  ) : (
                    <p className="font-medium text-gray-900 text-sm">
                      {proposal.customer.company}
                    </p>
                  )}
                  
                  {isEditing ? (
                    <input
                      type="text"
                      value={proposal.customer.contact}
                      onChange={(e) => updateCustomer("contact", e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                      placeholder="ผู้ติดต่อ"
                    />
                  ) : (
                    <p>ผู้ติดต่อ: {proposal.customer.contact}</p>
                  )}

                  {isEditing ? (
                    <textarea
                      value={proposal.customer.address}
                      onChange={(e) => updateCustomer("address", e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                      rows={2}
                      placeholder="ที่อยู่"
                    />
                  ) : (
                    <p className="flex items-start gap-1.5">
                      <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      <span>{proposal.customer.address}</span>
                    </p>
                  )}

                  {isEditing ? (
                    <input
                      type="text"
                      value={proposal.customer.phone}
                      onChange={(e) => updateCustomer("phone", e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                      placeholder="เบอร์โทร"
                    />
                  ) : (
                    <p className="flex items-center gap-1.5">
                      <Phone className="h-3 w-3" />
                      <span>{proposal.customer.phone}</span>
                    </p>
                  )}

                  {isEditing ? (
                    <input
                      type="email"
                      value={proposal.customer.email}
                      onChange={(e) => updateCustomer("email", e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                      placeholder="อีเมล"
                    />
                  ) : (
                    <p className="flex items-center gap-1.5">
                      <Mail className="h-3 w-3" />
                      <span>{proposal.customer.email}</span>
                    </p>
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
                      {formatDate(proposal.issueDate)}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-600">ใช้ได้ถึงวันที่:</span>
                    <span className="font-medium text-gray-900">
                      {formatDate(proposal.validUntil)}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-600">เงื่อนไขการชำระเงิน:</span>
                    <span className="font-medium text-gray-900">
                      {proposal.paymentTerm === "0"
                        ? "เงินสด"
                        : `เครดิต ${proposal.paymentTerm} วัน`}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-gray-600">สถานะ:</span>
                    <span className="font-medium text-blue-600 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      {proposal.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Services/Items Table */}
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-gray-900 mb-3">
                รายการบริการ
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
                      <th className="text-right px-3 py-2.5 font-semibold text-gray-700 w-32">
                        จำนวนเงิน
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {proposal.items.map((item, index) => (
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
                                className="w-full px-2 py-1 text-xs font-medium border border-purple-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                              />
                              <input
                                type="text"
                                value={item.description}
                                onChange={(e) => updateItem(index, "description", e.target.value)}
                                className="w-full px-2 py-1 text-[10px] border border-purple-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
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
                              className="w-full px-2 py-1 text-xs text-center border border-purple-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
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
                              className="w-full px-2 py-1 text-xs text-center border border-purple-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
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
                              className="w-full px-2 py-1 text-xs text-right border border-purple-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                          ) : (
                            formatCurrency(item.unitPrice)
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
                    <span className="text-gray-600">ยอดรวม:</span>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(calculateSubtotal())} บาท
                    </span>
                  </div>

                  {proposal.includeVat && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">ภาษีมูลค่าเพิ่ม 7%:</span>
                      <span className="font-medium text-gray-900">
                        {formatCurrency(calculateVat())} บาท
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between py-3 bg-purple-600 bg-opacity-10 rounded-lg px-3 mt-2">
                    <span className="font-semibold text-gray-900">
                      มูลค่าโครงการทั้งสิ้น:
                    </span>
                    <span className="text-lg font-bold text-purple-600">
                      {formatCurrency(calculateGrandTotal())} บาท
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-8 p-6 bg-green-50 rounded-lg border-2 border-green-200">
              <h2 className="text-sm font-semibold text-gray-900 mb-3">
                ประโยชน์ที่คุณจะได้รับ
              </h2>
              <div className="space-y-2">
                {proposal.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={benefit}
                        onChange={(e) => updateBenefit(index, e.target.value)}
                        className="flex-1 px-2 py-1 text-xs border border-green-600 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                      />
                    ) : (
                      <p className="text-xs text-gray-700">{benefit}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Terms & Conditions */}
            {proposal.remarks && (
              <div className="mb-8">
                <h2 className="text-sm font-semibold text-gray-900 mb-3">
                  เงื่อนไขและข้อกำหนด
                </h2>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  {isEditing ? (
                    <textarea
                      value={proposal.remarks}
                      onChange={(e) => setProposal({ ...proposal, remarks: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-purple-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                      rows={5}
                    />
                  ) : (
                    <p className="text-xs text-gray-700 whitespace-pre-line">
                      {proposal.remarks}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Signature Section */}
            <div className={`grid ${proposal.signatureReceivers.length === 1 ? 'grid-cols-2' : proposal.signatureReceivers.length === 2 ? 'grid-cols-3' : 'grid-cols-2 lg:grid-cols-4'} gap-6 pt-8 border-t border-gray-200`}>
              {/* Provider */}
              <div className="text-center">
                {proposal.signatureProviderImage ? (
                  <div className="mb-3 pb-4 flex items-end justify-center h-16">
                    <img src={proposal.signatureProviderImage} alt="Provider Signature" className="max-h-12 max-w-full object-contain" />
                  </div>
                ) : (
                  <div className="border-b border-gray-300 mb-2 pb-12"></div>
                )}
                <p className="text-xs font-semibold text-gray-700 mb-1">ผู้เสนอ / Proposed by</p>
                <p className="text-[10px] text-gray-600">
                  {proposal.signatureProviderName || proposal.company.name}
                </p>
                {proposal.signatureProviderPosition && (
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    ({proposal.signatureProviderPosition})
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  วันที่: {proposal.signatureProviderDate ? formatDate(proposal.signatureProviderDate) : '......../......../..........'}
                </p>
              </div>

              {/* Multiple Receivers */}
              {proposal.signatureReceivers.map((receiver, index) => (
                <div key={receiver.id} className="text-center">
                  {receiver.image ? (
                    <div className="mb-3 pb-4 flex items-end justify-center h-16">
                      <img src={receiver.image} alt={`Receiver ${index + 1} Signature`} className="max-h-12 max-w-full object-contain" />
                    </div>
                  ) : (
                    <div className="border-b border-gray-300 mb-2 pb-12"></div>
                  )}
                  <p className="text-xs font-semibold text-gray-700 mb-1">
                    {proposal.signatureReceivers.length > 1 ? `ผู้รับคนที่ ${index + 1} / Receiver ${index + 1}` : 'ผู้รับข้อเสนอ / Received by'}
                  </p>
                  <p className="text-[10px] text-gray-600">
                    {receiver.name || proposal.customer.contact}
                  </p>
                  {receiver.position && (
                    <p className="text-[10px] text-gray-500 mt-0.5">
                      ({receiver.position})
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    วันที่: {receiver.date ? formatDate(receiver.date) : '......../......../..........'}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-xs text-gray-500">
                เอกสารฉบับนี้ออกโดยระบบอัตโนมัติ • {proposal.company.name}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {proposal.company.website} • {proposal.company.email}
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