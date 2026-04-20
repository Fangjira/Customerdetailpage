import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Download, Printer, X, Upload } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRef } from "react";

interface QuotationPreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  quotationData: any;
}

export function QuotationPreviewDialog({
  isOpen,
  onClose,
  quotationData,
}: QuotationPreviewDialogProps) {
  const { t, i18n } = useTranslation();
  const printRef = useRef<HTMLDivElement>(null);
  const isThaiLanguage = i18n.language === "th";

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // ใช้ window.print() และให้ user เลือก "Save as PDF"
    // หรือในอนาคตสามารถใช้ jspdf + html2canvas
    window.print();
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "Approved":
        return isThaiLanguage ? "อนุมัติแล้ว" : "Approved";
      case "Sent to Customer":
        return isThaiLanguage ? "ส่งให้ลูกค้าแล้ว" : "Sent to Customer";
      case "Pending Approval":
        return isThaiLanguage ? "รอการอนุมัติ" : "Pending Approval";
      case "Draft":
        return isThaiLanguage ? "แบบร่าง" : "Draft";
      case "Rejected":
        return isThaiLanguage ? "ถูกปฏิเสธ" : "Rejected";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Sent to Customer":
        return "bg-blue-100 text-blue-700";
      case "Pending Approval":
        return "bg-yellow-100 text-yellow-700";
      case "Draft":
        return "bg-gray-100 text-gray-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-purple-100 text-purple-700";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isThaiLanguage) {
      return date.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl max-h-[95vh] p-0 print:max-w-full">
          <DialogDescription className="sr-only" id="quotation-preview-description">
            {t("quotations.quotation_preview")} - {quotationData?.id}
          </DialogDescription>
          <DialogHeader className="print:hidden border-b-2 border-[#ede9fe] bg-gradient-to-r from-[#f5f3ff] to-white px-6 py-4 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl text-[#4c1d95]">
                {t("quotations.quotation_preview")}
              </DialogTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrint}
                  className="border-2 border-[#ede9fe] text-[#4c1d95] hover:bg-[#f5f3ff] rounded-xl"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  {t("quotations.print_quotation")}
                </Button>
                <Button
                  size="sm"
                  onClick={handleDownloadPDF}
                  className="bg-gradient-to-r from-[#a78bfa] to-[#705add] hover:from-[#8b5cf6] hover:to-[#6d28d9] text-white rounded-xl border-0"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {t("quotations.download_pdf")}
                </Button>
              </div>
            </div>
          </DialogHeader>

          {/* PDF Preview Content */}
          <div className="overflow-y-auto max-h-[calc(95vh-80px)] print:overflow-visible">
            {quotationData?.isFromBulkCreation ? (
              // Custom Quotation Template - Modern Blue Design
              <div
                ref={printRef}
                className="bg-white p-8 print:p-8"
                id="quotation-preview"
                style={{ fontSize: "13px" }}
              >
                {/* Header - Full Width Blue Band */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 -mx-8 -mt-8 mb-6">
                  <div className="flex items-start justify-between text-white">
                    {/* Left - Logo & Company */}
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                          <Upload className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <span className="text-2xl font-bold">
                            {isThaiLanguage ? "โลจิสติกส์" : "LOGISTICS"}
                          </span>
                          <p className="text-xs text-blue-100">
                            {isThaiLanguage ? "Custom Quotation System" : "Custom Quotation System"}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-0.5 text-xs text-blue-50">
                        <p className="font-semibold text-white">
                          {isThaiLanguage
                            ? "บริษัท โกลบอล โลจิสติกส์ โซลูชั่น จำกัด"
                            : "Global Logistics Solutions Co., Ltd."}
                        </p>
                        <p>{isThaiLanguage ? "เลขที่ 95/5 ถนนสุขุมวิท แขวงคลองเตย" : "95/5 Sukhumvit Road, Khlong Toei"}</p>
                        <p>{isThaiLanguage ? "เขตคลองเตย กรุงเทพฯ 10110" : "Bangkok 10110, Thailand"}</p>
                        <p>{isThaiLanguage ? "โทร: 02-XXX-XXXX • อีเมล: info@globallogistics.co.th" : "Tel: +66 2-XXX-XXXX • Email: info@globallogistics.com"}</p>
                      </div>
                    </div>

                    {/* Right - Document Info */}
                    <div className="text-right">
                      <h1 className="text-3xl font-bold mb-3">{isThaiLanguage ? "ใบเสนอราคา" : "QUOTATION"}</h1>
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 text-sm space-y-1.5 min-w-[200px]">
                        <div className="flex justify-between gap-4">
                          <span className="text-blue-100">{isThaiLanguage ? "เลขที่:" : "No:"}</span>
                          <span className="font-bold">{quotationData?.id}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-blue-100">{isThaiLanguage ? "วันที่:" : "Date:"}</span>
                          <span className="font-semibold">{formatDate(quotationData?.issueDate)}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-blue-100">{isThaiLanguage ? "ยืนราคาถึง:" : "Valid Until:"}</span>
                          <span className="font-semibold">{formatDate(quotationData?.validUntil)}</span>
                        </div>
                        <div className="flex justify-between gap-4 pt-2 border-t border-white/30">
                          <span className="text-blue-100">{isThaiLanguage ? "หน่วยงาน:" : "Dept:"}</span>
                          <span className="font-bold">{quotationData?.bu}</span>
                        </div>
                        <div className="pt-2">
                          <Badge className={`${getStatusColor(quotationData?.status)} text-xs w-full justify-center`}>
                            {getStatusText(quotationData?.status)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Blue accent bar with Custom badge only */}
                <div className="flex items-center justify-end mb-6 pb-3 border-b-2 border-blue-200">
                  <Badge className="bg-blue-500 text-white text-sm px-4 py-1.5 flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    {isThaiLanguage ? "สร้างด้วย Custom Quotation" : "Generated by Custom Quotation"}
                  </Badge>
                </div>

                {/* Customer Info Only - Full Width */}
                <div className="mb-6">
                  <div className="border-2 border-blue-200 rounded-lg p-5 bg-blue-50/30">
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-blue-300">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <h3 className="text-sm font-bold text-blue-700">
                        {isThaiLanguage ? "ข้อมูลลูกค้า" : "CUSTOMER INFORMATION"}
                      </h3>
                    </div>
                    <div className="grid grid-cols-3 gap-6 text-xs">
                      <div className="space-y-3">
                        <div>
                          <p className="text-blue-600 font-semibold mb-1">{isThaiLanguage ? "ชื่อลูกค้า" : "Customer Name"}</p>
                          <p className="font-bold text-gray-900 text-sm">{quotationData?.customer?.name}</p>
                        </div>
                        <div>
                          <p className="text-blue-600 font-semibold mb-1">{isThaiLanguage ? "ผู้ติดต่อ" : "Contact Person"}</p>
                          <p className="text-gray-900">{quotationData?.customer?.contactPerson}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-blue-600 font-semibold mb-1">{isThaiLanguage ? "อีเมล" : "Email"}</p>
                          <p className="text-gray-900">{quotationData?.customer?.email}</p>
                        </div>
                        <div>
                          <p className="text-blue-600 font-semibold mb-1">{isThaiLanguage ? "โทรศัพท์" : "Phone"}</p>
                          <p className="text-gray-900">{quotationData?.customer?.phone}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-blue-600 font-semibold mb-1">{isThaiLanguage ? "ที่อยู่" : "Address"}</p>
                        <p className="text-gray-900 whitespace-pre-line text-xs leading-relaxed">{quotationData?.customer?.billingAddress}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {quotationData?.notes && (
                  <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg text-xs">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">!</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-blue-700 mb-1">{isThaiLanguage ? "หมายเหตุ" : "NOTES"}</p>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{quotationData.notes}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Line Items Table - Blue theme */}
                <div className="mb-6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
                        <th className="py-3 px-3 text-left text-xs font-bold border-r border-blue-400">{isThaiLanguage ? "ลำดับ" : "No."}</th>
                        <th className="py-3 px-3 text-left text-xs font-bold border-r border-blue-400">{isThaiLanguage ? "รายการ" : "Description"}</th>
                        <th className="py-3 px-3 text-center text-xs font-bold border-r border-blue-400">{isThaiLanguage ? "จำนวน" : "Qty"}</th>
                        <th className="py-3 px-3 text-right text-xs font-bold border-r border-blue-400">{isThaiLanguage ? "ราคาต่อหน่วย" : "Unit Price"}</th>
                        <th className="py-3 px-3 text-center text-xs font-bold border-r border-blue-400">{isThaiLanguage ? "ส่วนลด" : "Disc."}</th>
                        <th className="py-3 px-3 text-right text-xs font-bold">{isThaiLanguage ? "จำนวนเงิน" : "Amount"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quotationData?.items?.map((item: any, index: number) => (
                        <tr key={`item-${index}-${item.id || item.description}`} className={`border-b border-blue-100 ${index % 2 === 0 ? "bg-white" : "bg-blue-50/30"}`}>
                          <td className="py-3 px-3 text-center text-xs font-semibold text-blue-600">{index + 1}</td>
                          <td className="py-3 px-3 text-xs text-gray-800">{item.description}</td>
                          <td className="py-3 px-3 text-center text-xs text-gray-800 font-semibold">{item.quantity}</td>
                          <td className="py-3 px-3 text-right text-xs text-gray-800">{item.unitPrice.toLocaleString()}</td>
                          <td className="py-3 px-3 text-center text-xs">
                            {item.discount > 0 && <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded font-semibold">{item.discount}%</span>}
                          </td>
                          <td className="py-3 px-3 text-right text-xs font-bold text-gray-900">{item.total.toLocaleString()}</td>
                        </tr>
                      ))}
                      
                      {/* Summary with blue styling */}
                      <tr className="bg-blue-50">
                        <td colSpan={5} className="py-2 px-3 text-right text-xs font-semibold text-gray-700">{isThaiLanguage ? "ยอดรวมก่อนหักส่วนลด" : "Subtotal"}</td>
                        <td className="py-2 px-3 text-right text-xs font-semibold text-gray-900">{quotationData?.subtotal?.toLocaleString()}</td>
                      </tr>
                      <tr className="bg-blue-50">
                        <td colSpan={5} className="py-2 px-3 text-right text-xs font-semibold text-gray-700">{isThaiLanguage ? "ส่วนลดรวม" : "Total Discount"}</td>
                        <td className="py-2 px-3 text-right text-xs font-semibold text-red-600">-{quotationData?.totalDiscount?.toLocaleString()}</td>
                      </tr>
                      <tr className="bg-blue-50">
                        <td colSpan={5} className="py-2 px-3 text-right text-xs font-semibold text-gray-700">{isThaiLanguage ? "ยอดรวมหลังหักส่วนลด" : "After Discount"}</td>
                        <td className="py-2 px-3 text-right text-xs font-semibold text-gray-900">{(quotationData?.subtotal - quotationData?.totalDiscount)?.toLocaleString()}</td>
                      </tr>
                      <tr className="bg-blue-100">
                        <td colSpan={5} className="py-2 px-3 text-right text-xs font-bold text-blue-700">{isThaiLanguage ? "ภาษีมูลค่าเพิ่ม 7%" : "VAT 7%"}</td>
                        <td className="py-2 px-3 text-right text-xs font-bold text-blue-700">{quotationData?.vat?.toLocaleString()}</td>
                      </tr>
                      <tr className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
                        <td colSpan={5} className="py-3 px-3 text-right text-sm font-bold">{isThaiLanguage ? "ยอดรวมทั้งสิ้น" : "GRAND TOTAL"}</td>
                        <td className="py-3 px-3 text-right text-lg font-bold">{quotationData?.grandTotal?.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Terms & Conditions - Blue design */}
                <div className="mb-6 border-2 border-blue-200 rounded-lg overflow-hidden">
                  <div className="bg-blue-500 text-white px-4 py-2">
                    <h3 className="text-xs font-bold">{isThaiLanguage ? "ข้อกำหนดและเงื่อนไข" : "TERMS & CONDITIONS"}</h3>
                  </div>
                  <div className="p-4 bg-blue-50/30">
                    <ul className="text-xs text-gray-700 space-y-1.5 leading-relaxed">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold">•</span>
                        <span>{isThaiLanguage ? `ใบเสนอราคานี้มีผลใช้ได้ ${quotationData?.validityPeriod} วัน นับจากวันที่ออกเอกสาร` : `This quotation is valid for ${quotationData?.validityPeriod} days from the issue date.`}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold">•</span>
                        <span>{isThaiLanguage ? "เงื่อนไขการชำระเงิน: ชำระภายใน 30 วัน นับจากวันที่ออกใบแจ้งหนี้" : "Payment terms: Net 30 days from invoice date."}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold">•</span>
                        <span>{isThaiLanguage ? "ราคาดังกล่าวรวมภาษีมูลค่าเพิ่ม 7% แล้ว" : "All prices include 7% VAT."}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold">•</span>
                        <span>{isThaiLanguage ? "บริการขึ้นอยู่กับความพร้อมและการยืนยันจากทางบริษัท" : "Services are subject to availability and confirmation."}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold">•</span>
                        <span>{isThaiLanguage ? "การเปลี่ยนแปลงขอบเขตงานอาจส่งผลต่อการปรับราคา" : "Any changes to the scope may result in price adjustments."}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold">•</span>
                        <span>{isThaiLanguage ? "เอกสารนี้สร้างโดยระบบ Custom Quotation อัตโนมัติ" : "This document was generated by the Custom Quotation system."}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Signature Area - Blue theme */}
                <div className="grid grid-cols-2 gap-8 mb-6">
                  <div className="text-center">
                    <div className="border-t-2 border-blue-400 pt-2 mt-16">
                      <p className="text-xs font-semibold text-blue-700">{isThaiLanguage ? "ลงชื่อลูกค้า" : "Customer Signature"}</p>
                      <p className="text-xs text-gray-600 mt-1">({isThaiLanguage ? "วันที่" : "Date"}: _____________)</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="border-t-2 border-blue-400 pt-2 mt-16">
                      <p className="text-xs font-semibold text-blue-700">{isThaiLanguage ? "ผู้อนุมัติ" : "Authorized Signature"}</p>
                      <p className="text-xs text-gray-900 font-semibold mt-1">{quotationData?.createdBy?.name}</p>
                    </div>
                  </div>
                </div>

                {/* Footer - Blue theme */}
                <div className="border-t-2 border-blue-300 pt-4 text-center bg-blue-50/50 -mx-8 px-8 -mb-8 pb-8">
                  <p className="text-xs font-semibold text-blue-700 mb-1">{isThaiLanguage ? "ขอบคุณที่ไว้วางใจในการใช้บริการของเรา" : "Thank you for your business!"}</p>
                  <p className="text-xs text-gray-600">{isThaiLanguage ? `หากมีข้อสงสัย กรุณาติดต่อ ${quotationData?.createdBy?.name}` : `For questions, please contact ${quotationData?.createdBy?.name}`}</p>
                  <p className="text-xs text-blue-600 font-semibold">{quotationData?.createdBy?.email} • {quotationData?.createdBy?.phone}</p>
                  <p className="text-xs text-blue-400 mt-2 italic">{isThaiLanguage ? "สร้างโดย Custom Quotation System" : "Generated by Custom Quotation System"}</p>
                </div>
              </div>
            ) : (
              // Standard Quotation Template - Original Purple Design
              <div
                ref={printRef}
                className="bg-white p-8 print:p-8"
                id="quotation-preview"
                style={{ fontSize: "13px" }}
              >
                {/* Header with Logo and Company Info */}
                <div className={`flex items-start justify-between mb-6 pb-4 border-b-2 ${quotationData?.isFromBulkCreation ? 'border-blue-400' : 'border-gray-300'}`}>
                  {/* Left - Company Logo */}
                  <div className="w-1/3">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#705add] to-[#a78bfa] rounded"></div>
                      <span className="text-xl font-bold text-[#705add]">
                        {isThaiLanguage ? "โลจิสติกส์" : "LOGISTICS"}
                      </span>
                    </div>
                    <div className="space-y-1 text-xs text-gray-700">
                      <p className="font-semibold">
                        {isThaiLanguage
                          ? "บริษัท โกลบอล โลจิสติกส์ โซลูชั่น จำกัด"
                          : "Global Logistics Solutions Co., Ltd."}
                      </p>
                      <p>
                        {isThaiLanguage
                          ? "เลขที่ 95/5 ถนนสุขุมวิท แขวงคลองเตย"
                          : "95/5 Sukhumvit Road, Khlong Toei"}
                      </p>
                      <p>
                        {isThaiLanguage
                          ? "เขตคลองเตย กรุงเทพฯ 10110"
                          : "Bangkok 10110, Thailand"}
                      </p>
                      <p>
                        {isThaiLanguage
                          ? "โทร: 02-XXX-XXXX แฟกซ์: 02-XXX-XXXX"
                          : "Tel: +66 2-XXX-XXXX Fax: +66 2-XXX-XXXX"}
                      </p>
                      <p>
                        {isThaiLanguage
                          ? "อีเมล: info@globallogistics.co.th"
                          : "Email: info@globallogistics.com"}
                      </p>
                    </div>
                  </div>

                  {/* Center - Title */}
                  <div className="w-1/3 text-center">
                    <h1 className="text-2xl font-bold text-[#4c1d95] mb-2">
                      {isThaiLanguage ? "ใบเสนอราคา" : "QUOTATION"}
                    </h1>
                    {quotationData?.isFromBulkCreation && (
                      <div className="mb-2">
                        <Badge className="bg-blue-500 text-white text-xs px-3 py-1 flex items-center justify-center gap-1">
                          <Upload className="h-3 w-3" />
                          {isThaiLanguage ? "สร้างด้วย Custom Quotation" : "Custom Quotation"}
                        </Badge>
                      </div>
                    )}
                    <p className="text-sm text-gray-600">
                      {isThaiLanguage ? "เลขที่:" : "Reference No:"} <span className="font-semibold">{quotationData?.id}</span>
                    </p>
                  </div>

                  {/* Right - Status and Date */}
                  <div className="w-1/3 text-right">
                    <div className="space-y-2 text-xs">
                      <div>
                        <p className="text-gray-600">
                          {isThaiLanguage ? "วันที่:" : "Date:"}
                        </p>
                        <p className="font-semibold text-gray-800">
                          {formatDate(quotationData?.issueDate)}
                        </p>
                      </div>
                      <div>
                        <Badge className={`${getStatusColor(quotationData?.status)} text-xs`}>
                          {getStatusText(quotationData?.status)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  {/* Left Column - Customer Info */}
                  <div className="border border-gray-300 rounded p-4 bg-gray-50">
                    <h3 className="text-sm font-bold text-[#705add] mb-3 border-b border-gray-300 pb-1">
                      {isThaiLanguage ? "ข้อมูลลูกค้า" : "CUSTOMER INFORMATION"}
                    </h3>
                    <div className="space-y-2 text-xs">
                      <div>
                        <p className="text-gray-600">
                          {isThaiLanguage ? "ชื่อลูกค้า:" : "Customer:"}
                        </p>
                        <p className="font-semibold text-gray-900">
                          {quotationData?.customer?.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">
                          {isThaiLanguage ? "ผู้ติดต่อ:" : "Contact Person:"}
                        </p>
                        <p className="text-gray-900">
                          {quotationData?.customer?.contactPerson}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">
                          {isThaiLanguage ? "ที่อยู่:" : "Address:"}
                        </p>
                        <p className="text-gray-900 whitespace-pre-line">
                          {quotationData?.customer?.billingAddress}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">
                          {isThaiLanguage ? "อีเมล:" : "Email:"}
                        </p>
                        <p className="text-gray-900">
                          {quotationData?.customer?.email}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">
                          {isThaiLanguage ? "โทร:" : "Tel:"}
                        </p>
                        <p className="text-gray-900">
                          {quotationData?.customer?.phone}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Quotation Details */}
                  <div className="border border-gray-300 rounded p-4 bg-gray-50">
                    <h3 className="text-sm font-bold text-[#705add] mb-3 border-b border-gray-300 pb-1">
                      {isThaiLanguage ? "รายละเอียดใบเสนอราคา" : "QUOTATION DETAILS"}
                    </h3>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {isThaiLanguage ? "เลขที่เอกสาร:" : "Document No:"}
                        </span>
                        <span className="font-semibold text-gray-900">
                          {quotationData?.id}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {isThaiLanguage ? "วันที่ออกเอกสาร:" : "Issue Date:"}
                        </span>
                        <span className="text-gray-900">
                          {formatDate(quotationData?.issueDate)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {isThaiLanguage ? "ยืนราคาถึงวันที่:" : "Valid Until:"}
                        </span>
                        <span className="text-gray-900">
                          {formatDate(quotationData?.validUntil)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {isThaiLanguage ? "ระยะเวลายืนราคา:" : "Validity Period:"}
                        </span>
                        <span className="text-gray-900">
                          {quotationData?.validityPeriod} {isThaiLanguage ? "วัน" : "days"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {isThaiLanguage ? "ผู้ออกเอกสาร:" : "Created By:"}
                        </span>
                        <span className="text-gray-900">
                          {quotationData?.createdBy?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {isThaiLanguage ? "หน่วยงาน:" : "Department:"}
                        </span>
                        <span className="text-gray-900">
                          {quotationData?.bu}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes Before Table */}
                {quotationData?.notes && (
                  <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-xs">
                    <p className="font-semibold text-gray-700 mb-1">
                      {isThaiLanguage ? "หมายเหตุ:" : "Note:"}
                    </p>
                    <p className="text-gray-700 italic whitespace-pre-line">
                      {quotationData.notes}
                    </p>
                  </div>
                )}

                {/* Line Items Table */}
                <div className="mb-6">
                  <table className="w-full border-collapse border border-gray-400">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-400 py-2 px-3 text-left text-xs font-bold text-gray-800">
                          {isThaiLanguage ? "ลำดับ" : "No."}
                        </th>
                        <th className="border border-gray-400 py-2 px-3 text-left text-xs font-bold text-gray-800">
                          {isThaiLanguage ? "รายการ" : "Description"}
                        </th>
                        <th className="border border-gray-400 py-2 px-3 text-center text-xs font-bold text-gray-800">
                          {isThaiLanguage ? "จำนวน" : "Qty"}
                        </th>
                        <th className="border border-gray-400 py-2 px-3 text-right text-xs font-bold text-gray-800">
                          {isThaiLanguage ? "ราคาต่อหน่วย" : "Unit Price"}
                        </th>
                        <th className="border border-gray-400 py-2 px-3 text-center text-xs font-bold text-gray-800">
                          {isThaiLanguage ? "ส่วนลด" : "Discount"}
                        </th>
                        <th className="border border-gray-400 py-2 px-3 text-right text-xs font-bold text-gray-800">
                          {isThaiLanguage ? "จำนวนเงิน" : "Amount"}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {quotationData?.items?.map((item: any, index: number) => (
                        <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border border-gray-400 py-2 px-3 text-center text-xs text-gray-800">
                            {index + 1}
                          </td>
                          <td className="border border-gray-400 py-2 px-3 text-xs text-gray-800">
                            {item.description}
                          </td>
                          <td className="border border-gray-400 py-2 px-3 text-center text-xs text-gray-800">
                            {item.quantity}
                          </td>
                          <td className="border border-gray-400 py-2 px-3 text-right text-xs text-gray-800">
                            ${item.unitPrice.toLocaleString()}
                          </td>
                          <td className="border border-gray-400 py-2 px-3 text-center text-xs text-gray-800">
                            {item.discount}%
                          </td>
                          <td className="border border-gray-400 py-2 px-3 text-right text-xs font-semibold text-gray-900">
                            ${item.total.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                      
                      {/* Summary Rows */}
                      <tr className="bg-gray-100">
                        <td colSpan={5} className="border border-gray-400 py-2 px-3 text-right text-xs font-semibold text-gray-800">
                          {isThaiLanguage ? "ยอดรวมก่อนหักส่วนลด:" : "Subtotal:"}
                        </td>
                        <td className="border border-gray-400 py-2 px-3 text-right text-xs font-semibold text-gray-900">
                          ${quotationData?.subtotal?.toLocaleString()}
                        </td>
                      </tr>
                      <tr className="bg-gray-100">
                        <td colSpan={5} className="border border-gray-400 py-2 px-3 text-right text-xs font-semibold text-gray-800">
                          {isThaiLanguage ? "ส่วนลดรวม:" : "Total Discount:"}
                        </td>
                        <td className="border border-gray-400 py-2 px-3 text-right text-xs font-semibold text-red-600">
                          -${quotationData?.totalDiscount?.toLocaleString()}
                        </td>
                      </tr>
                      <tr className="bg-gray-100">
                        <td colSpan={5} className="border border-gray-400 py-2 px-3 text-right text-xs font-semibold text-gray-800">
                          {isThaiLanguage ? "ยอดรวมหลังหักส่วนลด:" : "Total After Discount:"}
                        </td>
                        <td className="border border-gray-400 py-2 px-3 text-right text-xs font-semibold text-gray-900">
                          ${(quotationData?.subtotal - quotationData?.totalDiscount)?.toLocaleString()}
                        </td>
                      </tr>
                      <tr className="bg-gray-100">
                        <td colSpan={5} className="border border-gray-400 py-2 px-3 text-right text-xs font-semibold text-gray-800">
                          {isThaiLanguage ? "ภาษีมูลค่าเพิ่ม 7%:" : "VAT 7%:"}
                        </td>
                        <td className="border border-gray-400 py-2 px-3 text-right text-xs font-semibold text-gray-900">
                          ${quotationData?.vat?.toLocaleString()}
                        </td>
                      </tr>
                      <tr className="bg-[#705add] text-white">
                        <td colSpan={5} className="border border-gray-400 py-2 px-3 text-right text-xs font-bold">
                          {isThaiLanguage ? "ยอดรวมทั้งสิ้น:" : "GRAND TOTAL:"}
                        </td>
                        <td className="border border-gray-400 py-2 px-3 text-right text-sm font-bold">
                          ${quotationData?.grandTotal?.toLocaleString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Terms & Conditions */}
                <div className="mb-6 border border-gray-300 rounded p-4 bg-gray-50">
                  <h3 className="text-xs font-bold text-[#705add] mb-2 border-b border-gray-300 pb-1">
                    {isThaiLanguage ? "ข้อกำหนดและเงื่อนไข" : "TERMS & CONDITIONS"}
                  </h3>
                  <ul className="text-xs text-gray-700 space-y-1.5 leading-relaxed">
                    <li>
                      • {isThaiLanguage 
                        ? `ใบเสนอราคานี้มีผลใช้ได้ ${quotationData?.validityPeriod} วัน นับจากวันที่ออกเอกสาร`
                        : `This quotation is valid for ${quotationData?.validityPeriod} days from the issue date.`}
                    </li>
                    <li>
                      • {isThaiLanguage
                        ? "เงื่อนไขการชำระเงิน: ชำระภายใน 30 วัน นับจากวันที่ออกใบแจ้งหนี้"
                        : "Payment terms: Net 30 days from invoice date."}
                    </li>
                    <li>
                      • {isThaiLanguage
                        ? "ราคาดังกล่าวเป็นสกุลเงินดอลลาร์สหรัฐ (USD) และรวมภาษีมูลค่าเพิ่ม 7% แล้ว"
                        : "All prices are in USD and include 7% VAT."}
                    </li>
                    <li>
                      • {isThaiLanguage
                        ? "บริการขึ้นอยู่กับความพร้อมและการยืนยันจากทางบริษัท"
                        : "Services are subject to availability and confirmation."}
                    </li>
                    <li>
                      • {isThaiLanguage
                        ? "การเปลี่ยนแปลงขอบเขตงานอาจส่งผลต่อการปรับราคา"
                        : "Any changes to the scope may result in price adjustments."}
                    </li>
                    <li>
                      • {isThaiLanguage
                        ? "กรุณาตรวจสอบรายละเอียดและยืนยันการสั่งซื้อกลับมายังบริษัทฯ"
                        : "Please review the details and confirm your order with the company."}
                    </li>
                  </ul>
                </div>

                {/* Signature Area */}
                <div className="grid grid-cols-2 gap-8 mt-8 mb-6">
                  <div className="text-center">
                    <div className="border-t-2 border-gray-400 pt-2 mt-16">
                      <p className="text-xs text-gray-700">
                        {isThaiLanguage ? "ลงชื่อลูกค้า" : "Customer Signature"}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        ({isThaiLanguage ? "วันที่" : "Date"}: _____________)
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="border-t-2 border-gray-400 pt-2 mt-16">
                      <p className="text-xs text-gray-700">
                        {isThaiLanguage ? "ผู้อนุมัติ" : "Authorized Signature"}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {quotationData?.createdBy?.name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t-2 border-gray-300 pt-4 text-center">
                  <p className="text-xs text-gray-600">
                    {isThaiLanguage
                      ? "ขอบคุณที่ไว้วางใจในการใช้บริการของเรา"
                      : "Thank you for your business!"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {isThaiLanguage
                      ? `หากมีข้อสงสัยเกี่ยวกับใบเสนอราคานี้ กรุณาติดต่อ ${quotationData?.createdBy?.name}`
                      : `For questions about this quotation, please contact ${quotationData?.createdBy?.name}`}
                  </p>
                  <p className="text-xs text-gray-500">
                    {quotationData?.createdBy?.email} | {quotationData?.createdBy?.phone}
                  </p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #quotation-preview,
          #quotation-preview * {
            visibility: visible;
          }
          #quotation-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}