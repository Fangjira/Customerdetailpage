import { useState } from "react";
import {
  ArrowLeft,
  Download,
  Send,
  Printer,
  Edit,
  Save,
  X,
} from "lucide-react";
import { Button } from "../ui/button";

interface QuotationPreviewMultiTemplateProps {
  quotationId: string;
  templateType?: string;
  onBack: () => void;
  onEdit?: () => void;
  onNavigate?: (path: string) => void;
}

export function QuotationPreviewMultiTemplate({
  quotationId,
  templateType = "international-freight",
  onBack,
  onEdit,
  onNavigate,
}: QuotationPreviewMultiTemplateProps) {
  const [isEditing, setIsEditing] = useState(false);

  // Mock data based on template type
  const mockQuotations: Record<string, any> = {
    "international-freight": {
      id: "QT-2024-001",
      documentNumber: "QT2024123456",
      name: "ใบเสนอราคาขนส่งทางอากาศระหว่างประเทศ",
      templateType: "international-freight",
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
      createdDate: "1 ธ.ค. 2567",
      createdBy: { name: "Sarah Chen", initials: "SC", userId: "user1" },
      approvedBy: { name: "Michael Johnson", initials: "MJ", userId: "user2" },
      approvedDate: "5 ธ.ค. 2567",
      introduction:
        "ตามที่ท่านได้สอบถามราคาบริการขนส่งสินค้าทางอากาศระหว่างประเทศ บริษัทฯ ขอเสนอราคาบริการดังนี้",
      scopeOfWork:
        "1. รับสินค้าจากโรงงาน\n2. ดำเนินการพิธีการศุลกากร\n3. ขนส่งสินค้าทางอากาศ\n4. ส่งมอบถึงปลายทาง",
      internationalProduct: "Electronic Components",
      internationalVolume: "500 kg per shipment",
      internationalPackaging: "Carton boxes with bubble wrap",
      internationalTemperature: "Ambient (15-25°C)",
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
            remarks: "Subject to space availability",
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
            remarks: "Min 500kg",
          },
        ],
      }),
      airFreightImportRateData: JSON.stringify({
        rows: [
          {
            id: "3",
            no: "1",
            airline: "Singapore Airlines",
            product: "General Cargo",
            service: "Express",
            weight: "100-500",
            pol: "SIN",
            pod: "BKK",
            routing: "Direct",
            transit: "N/A",
            transitTime: "3-5 hours",
            price: "92",
            unit: "kg",
            currencyUnit: "THB/kg",
            remarks: "Include customs clearance",
          },
          {
            id: "4",
            no: "2",
            airline: "Emirates",
            product: "General Cargo",
            service: "Standard",
            weight: "500+",
            pol: "DXB",
            pod: "BKK",
            routing: "Via SIN",
            transit: "SIN",
            transitTime: "12-18 hours",
            price: "82",
            unit: "kg",
            currencyUnit: "THB/kg",
            remarks: "Min 500kg",
          },
        ],
      }),
      seaFreightExportRateData: JSON.stringify({
        rows: [
          {
            id: "5",
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
            remarks: "Port to Port",
          },
        ],
      }),
      seaFreightImportRateData: JSON.stringify({
        rows: [
          {
            id: "6",
            no: "1",
            airline: "COSCO Shipping",
            product: "40' Container",
            service: "FCL",
            weight: "Max 28T",
            pol: "Shanghai",
            pod: "BKK",
            routing: "Direct",
            transit: "N/A",
            transitTime: "5-7 days",
            price: "52000",
            unit: "container",
            currencyUnit: "THB/container",
            remarks: "Include THC and customs clearance",
          },
        ],
      }),
      customsRateData: JSON.stringify({
        rows: [
          {
            id: "7",
            no: "1",
            service: "Import Customs Clearance",
            description: "Full service customs clearance including document preparation",
            hsCode: "8471.30.00",
            tariffRate: "0%",
            serviceFee: "2500",
            unit: "shipment",
            currencyUnit: "THB/shipment",
            remarks: "Standard clearance time 1-2 days",
          },
          {
            id: "8",
            no: "2",
            service: "Export Customs Clearance",
            description: "Export declaration and customs processing",
            hsCode: "8471.30.00",
            tariffRate: "0%",
            serviceFee: "2000",
            unit: "shipment",
            currencyUnit: "THB/shipment",
            remarks: "Same day service available",
          },
          {
            id: "9",
            no: "3",
            service: "Inspection Fee",
            description: "Customs inspection coordination",
            hsCode: "-",
            tariffRate: "-",
            serviceFee: "1500",
            unit: "inspection",
            currencyUnit: "THB/inspection",
            remarks: "If required by customs",
          },
        ],
      }),
      licenseRateData: JSON.stringify({
        rows: [
          {
            id: "10",
            no: "1",
            licenseType: "FDA Import License",
            description: "Food and drug administration import permit",
            authority: "FDA Thailand",
            processingTime: "7-14 days",
            serviceFee: "3500",
            unit: "license",
            currencyUnit: "THB/license",
            remarks: "Valid for 1 year",
          },
          {
            id: "11",
            no: "2",
            licenseType: "TISI Certification",
            description: "Thai Industrial Standards Institute certification",
            authority: "TISI",
            processingTime: "14-21 days",
            serviceFee: "5000",
            unit: "product",
            currencyUnit: "THB/product",
            remarks: "Per product type",
          },
          {
            id: "12",
            no: "3",
            licenseType: "Import/Export License",
            description: "General import/export business license",
            authority: "Ministry of Commerce",
            processingTime: "3-5 days",
            serviceFee: "2500",
            unit: "license",
            currencyUnit: "THB/license",
            remarks: "Annual renewal required",
          },
        ],
      }),
      freightRateRemarks:
        "• ราคาดังกล่าวยังไม่รวมภาษีมูลค่าเพิ่ม 7%\n• ราคาอาจมีการเปลี่ยนแปลงตามอัตราแลกเปลี่ยนและราคาน้ำมัน\n• ราคาดังกล่าวเป็นราคาพื้นฐาน ไม่รวมค่าใช้จ่ายอื่นๆ",
      currency: "THB",
      includeVat: true,
      paymentTerm: "30",
      remarks:
        "1. ราคาดังกล่าวยังไม่รวมภาษีมูลค่าเพิ่ม 7%\n2. ใบเสนอราคานี้มีอายุ 30 วัน นับจากวันที่ออกเอกสาร\n3. เงื่อนไขการชำระเงิน: เครดิต 30 วัน หลังวันที่ออกใบกำกับภาษี",
    },
    "warehouse-transport": {
      id: "QT-2024-002",
      documentNumber: "QT2024123457",
      name: "ใบเสนอราคาบริการคลังสินค้าและขนส่ง",
      templateType: "warehouse-transport",
      customer: {
        company: "บริษัท โกลบอล เทรด จำกัด",
        contact: "คุณสมหญิง รักสงบ",
        email: "somying@globaltrade.co.th",
        phone: "02-234-5678",
        address: "456 ถนนรามคำแหง แขวงหัวหมาก เขตบางกะปิ กรุงเทพมหานคร 10240",
        taxId: "0105558234567",
      },
      status: "Pending Approval",
      issueDate: "2024-12-05",
      validUntil: "2025-01-05",
      validity: 30,
      createdDate: "5 ธ.ค. 2567",
      createdBy: { name: "Mike Wong", initials: "MW", userId: "user2" },
      introduction:
        "ตามที่ท่านได้สอบถามราคาบริการคลังสินค้าและขนส่ง บริษัทฯ มีความยินดีขอเสนอราคาบริการดังนี้",
      scopeOfWork:
        "1. รับสินค้าเข้าคลังสินค้า\n2. จัดเก็บสินค้าในคลังมาตรฐาน\n3. บริหารสต็อกสินค้า\n4. จัดส่งสินค้าตามคำสั่ง\n5. รายงานสถานะสินค้าประจำเดือน",
      items: [
        {
          id: "1",
          itemName: "ค่าเช่าพื้นที่คลังสินค้า",
          description: "พื้นที่ 500 ตารางเมตร พร้อมระบบควบคุมอุณหภูมิ",
          quantity: 1,
          unit: "เดือน",
          unitPrice: 125000,
          discount: 0,
        },
        {
          id: "2",
          itemName: "ค่าบริการรับเข้า-จ่ายออก (Handling)",
          description: "ค่าบริการขนถ่ายสินค้า ตรวจสอบ และบันทึกข้อมูล",
          quantity: 2000,
          unit: "กล่อง",
          unitPrice: 15,
          discount: 10,
        },
        {
          id: "3",
          itemName: "ค่าบริการขนส่ง กทม. และปริมณฑล",
          description: "รถ 6 ล้อ พร้อมพนักงานขับรถและคนยก 2 คน",
          quantity: 20,
          unit: "เที่ยว",
          unitPrice: 3500,
          discount: 5,
        },
        {
          id: "4",
          itemName: "ค่าบริการบรรจุหีบห่อ (Packing)",
          description: "บรรจุหีบห่อสินค้าด้วยวัสดุห่อมาตรฐาร",
          quantity: 500,
          unit: "กล่อง",
          unitPrice: 25,
          discount: 0,
        },
      ],
      subtotal: 250000,
      globalDiscount: 0,
      globalDiscountType: "percent",
      netTotal: 250000,
      vat: 17500,
      grandTotal: 267500,
      currency: "THB",
      includeVat: true,
      paymentTerm: "30",
      remarks:
        "1. ราคาดังกล่าวยังไม่รวมภาษีมูลค่าเพิ่ม 7%\n2. สัญญาขั้นต่ำ 6 เดือน\n3. เงื่อนไขการชำระเงิน: เครดิต 30 วัน\n4. บริษัทฯ มีประกันภัยสินค้าในคลัง มูลค่าความคุ้มครองสูงสุด 5 ล้านบาท",
    },
    "customs-license": {
      id: "QT-2024-003",
      documentNumber: "QT2024123458",
      name: "ใบเสนอราคาบริการศุลกากรและใบอนุญาต",
      templateType: "customs-license",
      customer: {
        company: "บริษัท อิมพอร์ต เอ็กซ์เพิร์ท จำกัด",
        contact: "คุณวิชัย ชาญชัย",
        email: "wichai@importexpert.co.th",
        phone: "02-345-6789",
        address: "789 ถนนเพชรบุรีตัดใหม่ แขวงบางกะปิ เขตห้วยขวาง กรุงเทพมหานคร 10310",
        taxId: "0105558345678",
      },
      status: "Sent to Customer",
      issueDate: "2024-12-10",
      validUntil: "2025-01-10",
      validity: 30,
      createdDate: "10 ธ.ค. 2567",
      createdBy: { name: "John Smith", initials: "JS", userId: "user3" },
      introduction:
        "ตามที่ท่านได้สอบถามราคาบริการด้านศุลกากรและขออนุญาตนำเข้า-ส่งออก บริษัทฯ ขอเสนอราคาบริการดังนี้",
      scopeOfWork:
        "1. ตรวจสอบเอกสารและเตรียมเอกสารนำเข้า/ส่งออก\n2. ยื่นขอใบอนุญาตที่เกี่ยวข้อง (อย./มอก./ฯลฯ)\n3. ดำเนินการพิธีการศุลกากร\n4. ประสานงานกับหน่วยงานราชการ\n5. จัดส่งเอกสารครบถ้วน",
      items: [
        {
          id: "1",
          itemName: "ค่าธรรมเนียมพิธีการศุลกากรนำเข้า",
          description: "รวมค่าบริการยื่นเอกสาร ใบขนสินค้าขาเข้า (Import Declaration)",
          quantity: 5,
          unit: "ใบขน",
          unitPrice: 2500,
          discount: 0,
        },
        {
          id: "2",
          itemName: "ค่าบริการขออนุญาต อย.",
          description: "ยื่นขออนุญาตนำเข้าอาหารและยา ผ่านระบบออนไลน์",
          quantity: 3,
          unit: "รายการ",
          unitPrice: 3500,
          discount: 0,
        },
        {
          id: "3",
          itemName: "ค่าตรวจปล่อยสินค้า (Inspection Fee)",
          description: "ค่าประสานงานการตรวจสอบสินค้ากับเจ้าหน้าที่ศุลกากร",
          quantity: 5,
          unit: "ครั้ง",
          unitPrice: 1500,
          discount: 0,
        },
        {
          id: "4",
          itemName: "ค่าบริการด่วนพิเศษ (Express Service)",
          description: "บริการเร่งรัดดำเนินการพิธีการภายใน 24 ชม.",
          quantity: 2,
          unit: "ครั้ง",
          unitPrice: 5000,
          discount: 10,
        },
      ],
      subtotal: 41500,
      globalDiscount: 5,
      globalDiscountType: "percent",
      netTotal: 39425,
      vat: 2759.75,
      grandTotal: 42184.75,
      currency: "THB",
      includeVat: true,
      paymentTerm: "0",
      remarks:
        "1. ราาดังกล่าวยังไม่รวมภาษีมูลค่าเพิ่ม 7%\n2. ราคาดังกล่าวไม่รวมค่าอากรขาเข้า ภาษีสรรพสามิต และภาษีอื่นๆ\n3. เงื่อนไขการชำระเงิน: เงินสด ก่อนดำเนินการ\n4. หากมีค่าใช้จ่ายเพิ่มเติมจากหน่วยงานราชการ จะแจ้งให้ทราบเป็นกรณีพิเศษ",
    },
    "cross-border-clmv": {
      id: "QT-2024-004",
      documentNumber: "QT2024123459",
      name: "ใบเสนอราคาบริการขนส่งข้ามพรมแดน CLMV",
      templateType: "cross-border-clmv",
      customer: {
        company: "บริษัท เอเชีย ลิงค์ โลจิสติกส์ จำกัด",
        contact: "คุณประยุทธ วงศ์ไทย",
        email: "prayuth@asialink.co.th",
        phone: "02-456-7890",
        address: "321 ถนนพระราม 4 แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110",
        taxId: "0105558456789",
      },
      status: "Draft",
      issueDate: "2024-12-15",
      validUntil: "2025-01-15",
      validity: 30,
      createdDate: "15 ธ.ค. 2567",
      createdBy: { name: "Linda Park", initials: "LP", userId: "user4" },
      introduction:
        "ตามที่ท่านได้สอบถามราคาบริการขนส่งสินค้าข้ามพรมแดนไปยังประเทศในกลุ่ม CLMV บริษัทฯ ขอเสนอราคาบริการดังนี้",
      scopeOfWork:
        "1. รับสินค้าจากต้นทาง กรุงเทพฯ\n2. ดำเนินการพิธีการส่งออกที่ด่านชายแดนไทย\n3. ขนส่งสินค้าข้ามพรมแดน\n4. ดำเนินการพิธีการนำเข้าที่ด่านชายแดนประเทศปลายทาง\n5. ส่งมอบสินค้าถึงคลังปลายทาง",
      items: [
        {
          id: "1",
          itemName: "ค่าขนส่งทางบก กรุงเทพฯ - เวียงจันทน์",
          description: "รถ 10 ล้อตู้ทึบ พร้อมพนักงานขับรถ 2 คน Door to Door",
          quantity: 4,
          unit: "เที่ยว",
          unitPrice: 35000,
          discount: 0,
        },
        {
          id: "2",
          itemName: "ค่าพิธีการศุลกากร (Export + Import)",
          description: "รวมค่าดำเนินการพิธีการทั้งฝั่งไทยและลาว",
          quantity: 4,
          unit: "เที่ยว",
          unitPrice: 8000,
          discount: 0,
        },
        {
          id: "3",
          itemName: "ค่าบริการ Cross Border Agent",
          description: "ค่าประสานงานตัวแทนข้ามพรมแดน",
          quantity: 4,
          unit: "เที่ยว",
          unitPrice: 5000,
          discount: 10,
        },
        {
          id: "4",
          itemName: "ค่าประกันภัยสินค้า",
          description: "ประกันภัยสินค้าระหว่างการขนส่ง (ความคุ้มครอง 1,000,000 บาท/เที่ยว)",
          quantity: 4,
          unit: "เที่ยว",
          unitPrice: 2500,
          discount: 0,
        },
      ],
      subtotal: 202000,
      globalDiscount: 10000,
      globalDiscountType: "fixed",
      netTotal: 192000,
      vat: 13440,
      grandTotal: 205440,
      currency: "THB",
      includeVat: true,
      paymentTerm: "15",
      remarks:
        "1. ราคาดังกล่าวยังไม่รวมภาษีมูลค่าเพิ่ม 7%\n2. ราคาดังกล่าวไม่รวมค่าอากรขาเข้า-ส่งออก และภาษีในประเทศปลายทาง\n3. ระยะเวลาขนส่ง 3-5 วันทำการ\n4. เงื่อนไขการชำระเงิน: เครดิต 15 วัน หลังวันที่ออกใบกำกับภาษี\n5. ราคาอาจมีการปรับเปลี่ยนตามราคาน้ำมันและอัตราแลกเปลี่ยน",
    },
  };

  const quotation = mockQuotations[templateType] || mockQuotations["international-freight"];

  console.log("QuotationPreviewMultiTemplate - templateType:", templateType);
  console.log("QuotationPreviewMultiTemplate - quotation.templateType:", quotation.templateType);

  // Company Info
  const company = {
    name: "mini CRM Logistics",
    address: "999 อาคารออฟฟิศพาร์ค ชั้น 15 ถนนพระราม 4 แขวงสีลม เขตบางรัก กรุงเทพมหานคร 10500",
    phone: "02-234-5678",
    email: "info@onelink-logistics.com",
    taxId: "0105559876543",
    website: "www.onelink-logistics.com",
  };

  const calculateLineTotal = (item: any) => {
    const subtotal = item.quantity * item.unitPrice;
    const discountAmount = subtotal * (item.discount / 100);
    return subtotal - discountAmount;
  };

  const formatCurrency = (amount: number) => {
    if (!amount) return "0.00";
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

  const handleSend = () => {
    alert("ส่งอีเมลให้ลูกค้า (ยังไม่ได้เชื่อมต่อ)");
  };

  // Render International Freight Template
  const renderInternationalFreight = () => {
    const airExportData = quotation.airFreightExportRateData
      ? JSON.parse(quotation.airFreightExportRateData)
      : null;
    const airImportData = quotation.airFreightImportRateData
      ? JSON.parse(quotation.airFreightImportRateData)
      : null;
    const seaExportData = quotation.seaFreightExportRateData
      ? JSON.parse(quotation.seaFreightExportRateData)
      : null;
    const seaImportData = quotation.seaFreightImportRateData
      ? JSON.parse(quotation.seaFreightImportRateData)
      : null;
    const customsData = quotation.customsRateData
      ? JSON.parse(quotation.customsRateData)
      : null;
    const licenseData = quotation.licenseRateData
      ? JSON.parse(quotation.licenseRateData)
      : null;

    return (
      <>
        {/* Introduction */}
        {quotation.introduction && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-2">Introduction / คำนำ</h2>
            <p className="text-xs text-gray-600 whitespace-pre-line">{quotation.introduction}</p>
          </div>
        )}

        {/* Scope of Work */}
        {quotation.scopeOfWork && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-2">
              Scope of Work / ขอบเขตงาน
            </h2>
            <p className="text-xs text-gray-600 whitespace-pre-line">{quotation.scopeOfWork}</p>
          </div>
        )}

        {/* DESCRIPTION Section */}
        {(quotation.internationalProduct || quotation.internationalVolume || quotation.internationalPackaging || quotation.internationalTemperature) && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">DESCRIPTION / รายละเอียด</h2>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-xs">
                <tbody className="divide-y divide-gray-100 bg-white">
                  {quotation.internationalProduct && (
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-gray-700 w-1/3 bg-gray-50">1) Product/ผลิตภัณฑ์</td>
                      <td className="px-4 py-2.5 text-gray-900">{quotation.internationalProduct}</td>
                    </tr>
                  )}
                  {quotation.internationalVolume && (
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-gray-700 w-1/3 bg-gray-50">2) Volume/ปริมาณ</td>
                      <td className="px-4 py-2.5 text-gray-900">{quotation.internationalVolume}</td>
                    </tr>
                  )}
                  {quotation.internationalPackaging && (
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-gray-700 w-1/3 bg-gray-50">3) Packaging/ประเภทบรรจุภัณฑ์</td>
                      <td className="px-4 py-2.5 text-gray-900">{quotation.internationalPackaging}</td>
                    </tr>
                  )}
                  {quotation.internationalTemperature && (
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-gray-700 w-1/3 bg-gray-50">4) Temperature/อุณหภูมิ</td>
                      <td className="px-4 py-2.5 text-gray-900">{quotation.internationalTemperature}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Rate Tables */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">RATE / ค่าบริการ</h2>

          {/* Air Freight Export */}
          {airExportData && airExportData.rows && airExportData.rows.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xs font-bold text-gray-800 mb-2">
                3.1.1.1 AIR FREIGHT RATE (EXPORT)
              </h3>
              <div className="border border-gray-300 rounded-lg overflow-x-auto">
                <table className="w-full text-[9px]">
                  <thead className="bg-[#7BC9A6] text-white">
                    <tr>
                      <th className="px-2 py-1.5 text-center font-semibold">NO.</th>
                      <th className="px-2 py-1.5 text-left font-semibold">AIRLINE</th>
                      <th className="px-2 py-1.5 text-left font-semibold">PRODUCT</th>
                      <th className="px-2 py-1.5 text-left font-semibold">Service</th>
                      <th className="px-2 py-1.5 text-left font-semibold">WEIGHT</th>
                      <th className="px-2 py-1.5 text-left font-semibold">POL</th>
                      <th className="px-2 py-1.5 text-left font-semibold">POD</th>
                      <th className="px-2 py-1.5 text-left font-semibold">ROUTING</th>
                      <th className="px-2 py-1.5 text-left font-semibold">TRANSIT</th>
                      <th className="px-2 py-1.5 text-left font-semibold">TRANSIT TIME</th>
                      <th className="px-2 py-1.5 text-left font-semibold">PRICE</th>
                      <th className="px-2 py-1.5 text-left font-semibold">UNIT</th>
                      <th className="px-2 py-1.5 text-left font-semibold">Currency/Unit</th>
                      <th className="px-2 py-1.5 text-left font-semibold">REMARKS</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {airExportData.rows.map((row: any) => (
                      <tr key={row.id}>
                        <td className="px-2 py-1.5 text-center">{row.no}</td>
                        <td className="px-2 py-1.5">{row.airline}</td>
                        <td className="px-2 py-1.5">{row.product}</td>
                        <td className="px-2 py-1.5">{row.service}</td>
                        <td className="px-2 py-1.5">{row.weight}</td>
                        <td className="px-2 py-1.5">{row.pol}</td>
                        <td className="px-2 py-1.5">{row.pod}</td>
                        <td className="px-2 py-1.5">{row.routing}</td>
                        <td className="px-2 py-1.5">{row.transit}</td>
                        <td className="px-2 py-1.5">{row.transitTime}</td>
                        <td className="px-2 py-1.5">{row.price}</td>
                        <td className="px-2 py-1.5">{row.unit}</td>
                        <td className="px-2 py-1.5">{row.currencyUnit}</td>
                        <td className="px-2 py-1.5">{row.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Air Freight Import */}
          {airImportData && airImportData.rows && airImportData.rows.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xs font-bold text-gray-800 mb-2">
                3.1.1.2 AIR FREIGHT RATE (IMPORT)
              </h3>
              <div className="border border-gray-300 rounded-lg overflow-x-auto">
                <table className="w-full text-[9px]">
                  <thead className="bg-[#7BC9A6] text-white">
                    <tr>
                      <th className="px-2 py-1.5 text-center font-semibold">NO.</th>
                      <th className="px-2 py-1.5 text-left font-semibold">AIRLINE</th>
                      <th className="px-2 py-1.5 text-left font-semibold">PRODUCT</th>
                      <th className="px-2 py-1.5 text-left font-semibold">Service</th>
                      <th className="px-2 py-1.5 text-left font-semibold">WEIGHT</th>
                      <th className="px-2 py-1.5 text-left font-semibold">POL</th>
                      <th className="px-2 py-1.5 text-left font-semibold">POD</th>
                      <th className="px-2 py-1.5 text-left font-semibold">ROUTING</th>
                      <th className="px-2 py-1.5 text-left font-semibold">TRANSIT</th>
                      <th className="px-2 py-1.5 text-left font-semibold">TRANSIT TIME</th>
                      <th className="px-2 py-1.5 text-left font-semibold">PRICE</th>
                      <th className="px-2 py-1.5 text-left font-semibold">UNIT</th>
                      <th className="px-2 py-1.5 text-left font-semibold">Currency/Unit</th>
                      <th className="px-2 py-1.5 text-left font-semibold">REMARKS</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {airImportData.rows.map((row: any) => (
                      <tr key={row.id}>
                        <td className="px-2 py-1.5 text-center">{row.no}</td>
                        <td className="px-2 py-1.5">{row.airline}</td>
                        <td className="px-2 py-1.5">{row.product}</td>
                        <td className="px-2 py-1.5">{row.service}</td>
                        <td className="px-2 py-1.5">{row.weight}</td>
                        <td className="px-2 py-1.5">{row.pol}</td>
                        <td className="px-2 py-1.5">{row.pod}</td>
                        <td className="px-2 py-1.5">{row.routing}</td>
                        <td className="px-2 py-1.5">{row.transit}</td>
                        <td className="px-2 py-1.5">{row.transitTime}</td>
                        <td className="px-2 py-1.5">{row.price}</td>
                        <td className="px-2 py-1.5">{row.unit}</td>
                        <td className="px-2 py-1.5">{row.currencyUnit}</td>
                        <td className="px-2 py-1.5">{row.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Sea Freight Export */}
          {seaExportData && seaExportData.rows && seaExportData.rows.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xs font-bold text-gray-800 mb-2">3.2.1 SEA FREIGHT RATE (EXPORT)</h3>
              <div className="border border-gray-300 rounded-lg overflow-x-auto">
                <table className="w-full text-[9px]">
                  <thead className="bg-[#7BC9A6] text-white">
                    <tr>
                      <th className="px-2 py-1.5 text-center font-semibold">NO.</th>
                      <th className="px-2 py-1.5 text-left font-semibold">CARRIER</th>
                      <th className="px-2 py-1.5 text-left font-semibold">PRODUCT</th>
                      <th className="px-2 py-1.5 text-left font-semibold">Service</th>
                      <th className="px-2 py-1.5 text-left font-semibold">WEIGHT</th>
                      <th className="px-2 py-1.5 text-left font-semibold">POL</th>
                      <th className="px-2 py-1.5 text-left font-semibold">POD</th>
                      <th className="px-2 py-1.5 text-left font-semibold">ROUTING</th>
                      <th className="px-2 py-1.5 text-left font-semibold">TRANSIT</th>
                      <th className="px-2 py-1.5 text-left font-semibold">TRANSIT TIME</th>
                      <th className="px-2 py-1.5 text-left font-semibold">PRICE</th>
                      <th className="px-2 py-1.5 text-left font-semibold">UNIT</th>
                      <th className="px-2 py-1.5 text-left font-semibold">Currency/Unit</th>
                      <th className="px-2 py-1.5 text-left font-semibold">REMARKS</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {seaExportData.rows.map((row: any) => (
                      <tr key={row.id}>
                        <td className="px-2 py-1.5 text-center">{row.no}</td>
                        <td className="px-2 py-1.5">{row.airline}</td>
                        <td className="px-2 py-1.5">{row.product}</td>
                        <td className="px-2 py-1.5">{row.service}</td>
                        <td className="px-2 py-1.5">{row.weight}</td>
                        <td className="px-2 py-1.5">{row.pol}</td>
                        <td className="px-2 py-1.5">{row.pod}</td>
                        <td className="px-2 py-1.5">{row.routing}</td>
                        <td className="px-2 py-1.5">{row.transit}</td>
                        <td className="px-2 py-1.5">{row.transitTime}</td>
                        <td className="px-2 py-1.5">{row.price}</td>
                        <td className="px-2 py-1.5">{row.unit}</td>
                        <td className="px-2 py-1.5">{row.currencyUnit}</td>
                        <td className="px-2 py-1.5">{row.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Sea Freight Import */}
          {seaImportData && seaImportData.rows && seaImportData.rows.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xs font-bold text-gray-800 mb-2">3.2.1.1 SEA FREIGHT RATE (IMPORT)</h3>
              <div className="border border-gray-300 rounded-lg overflow-x-auto">
                <table className="w-full text-[9px]">
                  <thead className="bg-[#7BC9A6] text-white">
                    <tr>
                      <th className="px-2 py-1.5 text-center font-semibold">NO.</th>
                      <th className="px-2 py-1.5 text-left font-semibold">CARRIER</th>
                      <th className="px-2 py-1.5 text-left font-semibold">PRODUCT</th>
                      <th className="px-2 py-1.5 text-left font-semibold">Service</th>
                      <th className="px-2 py-1.5 text-left font-semibold">WEIGHT</th>
                      <th className="px-2 py-1.5 text-left font-semibold">POL</th>
                      <th className="px-2 py-1.5 text-left font-semibold">POD</th>
                      <th className="px-2 py-1.5 text-left font-semibold">ROUTING</th>
                      <th className="px-2 py-1.5 text-left font-semibold">TRANSIT</th>
                      <th className="px-2 py-1.5 text-left font-semibold">TRANSIT TIME</th>
                      <th className="px-2 py-1.5 text-left font-semibold">PRICE</th>
                      <th className="px-2 py-1.5 text-left font-semibold">UNIT</th>
                      <th className="px-2 py-1.5 text-left font-semibold">Currency/Unit</th>
                      <th className="px-2 py-1.5 text-left font-semibold">REMARKS</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {seaImportData.rows.map((row: any) => (
                      <tr key={row.id}>
                        <td className="px-2 py-1.5 text-center">{row.no}</td>
                        <td className="px-2 py-1.5">{row.airline}</td>
                        <td className="px-2 py-1.5">{row.product}</td>
                        <td className="px-2 py-1.5">{row.service}</td>
                        <td className="px-2 py-1.5">{row.weight}</td>
                        <td className="px-2 py-1.5">{row.pol}</td>
                        <td className="px-2 py-1.5">{row.pod}</td>
                        <td className="px-2 py-1.5">{row.routing}</td>
                        <td className="px-2 py-1.5">{row.transit}</td>
                        <td className="px-2 py-1.5">{row.transitTime}</td>
                        <td className="px-2 py-1.5">{row.price}</td>
                        <td className="px-2 py-1.5">{row.unit}</td>
                        <td className="px-2 py-1.5">{row.currencyUnit}</td>
                        <td className="px-2 py-1.5">{row.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Customs Rate */}
          {customsData && customsData.rows && customsData.rows.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xs font-bold text-gray-800 mb-2">3.3.1 CUSTOMS RATE</h3>
              <div className="border border-gray-300 rounded-lg overflow-x-auto">
                <table className="w-full text-[9px]">
                  <thead className="bg-[#7BC9A6] text-white">
                    <tr>
                      <th className="px-2 py-1.5 text-center font-semibold">NO.</th>
                      <th className="px-2 py-1.5 text-left font-semibold">SERVICE</th>
                      <th className="px-2 py-1.5 text-left font-semibold">DESCRIPTION</th>
                      <th className="px-2 py-1.5 text-left font-semibold">HS CODE</th>
                      <th className="px-2 py-1.5 text-left font-semibold">TARIFF RATE</th>
                      <th className="px-2 py-1.5 text-left font-semibold">SERVICE FEE</th>
                      <th className="px-2 py-1.5 text-left font-semibold">UNIT</th>
                      <th className="px-2 py-1.5 text-left font-semibold">Currency/Unit</th>
                      <th className="px-2 py-1.5 text-left font-semibold">REMARKS</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {customsData.rows.map((row: any) => (
                      <tr key={row.id}>
                        <td className="px-2 py-1.5 text-center">{row.no}</td>
                        <td className="px-2 py-1.5">{row.service}</td>
                        <td className="px-2 py-1.5">{row.description}</td>
                        <td className="px-2 py-1.5">{row.hsCode}</td>
                        <td className="px-2 py-1.5">{row.tariffRate}</td>
                        <td className="px-2 py-1.5">{row.serviceFee}</td>
                        <td className="px-2 py-1.5">{row.unit}</td>
                        <td className="px-2 py-1.5">{row.currencyUnit}</td>
                        <td className="px-2 py-1.5">{row.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* License Rate */}
          {licenseData && licenseData.rows && licenseData.rows.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xs font-bold text-gray-800 mb-2">3.3.2 LICENSE RATE</h3>
              <div className="border border-gray-300 rounded-lg overflow-x-auto">
                <table className="w-full text-[9px]">
                  <thead className="bg-[#7BC9A6] text-white">
                    <tr>
                      <th className="px-2 py-1.5 text-center font-semibold">NO.</th>
                      <th className="px-2 py-1.5 text-left font-semibold">LICENSE TYPE</th>
                      <th className="px-2 py-1.5 text-left font-semibold">DESCRIPTION</th>
                      <th className="px-2 py-1.5 text-left font-semibold">AUTHORITY</th>
                      <th className="px-2 py-1.5 text-left font-semibold">PROCESSING TIME</th>
                      <th className="px-2 py-1.5 text-left font-semibold">SERVICE FEE</th>
                      <th className="px-2 py-1.5 text-left font-semibold">UNIT</th>
                      <th className="px-2 py-1.5 text-left font-semibold">Currency/Unit</th>
                      <th className="px-2 py-1.5 text-left font-semibold">REMARKS</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {licenseData.rows.map((row: any) => (
                      <tr key={row.id}>
                        <td className="px-2 py-1.5 text-center">{row.no}</td>
                        <td className="px-2 py-1.5">{row.licenseType}</td>
                        <td className="px-2 py-1.5">{row.description}</td>
                        <td className="px-2 py-1.5">{row.authority}</td>
                        <td className="px-2 py-1.5">{row.processingTime}</td>
                        <td className="px-2 py-1.5">{row.serviceFee}</td>
                        <td className="px-2 py-1.5">{row.unit}</td>
                        <td className="px-2 py-1.5">{row.currencyUnit}</td>
                        <td className="px-2 py-1.5">{row.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Rate Remarks */}
          {quotation.freightRateRemarks && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-[9px] text-gray-700 whitespace-pre-line">
                {quotation.freightRateRemarks}
              </p>
            </div>
          )}
        </div>
      </>
    );
  };

  // Render Standard Template (for warehouse, customs, cross-border)
  const renderStandardTemplate = () => {
    return (
      <>
        {/* Introduction */}
        {quotation.introduction && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-2">Introduction / คำนำ</h2>
            <p className="text-xs text-gray-600 whitespace-pre-line">{quotation.introduction}</p>
          </div>
        )}

        {/* Scope of Work */}
        {quotation.scopeOfWork && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-2">
              Scope of Work / ขอบเขตงาน
            </h2>
            <p className="text-xs text-gray-600 whitespace-pre-line">{quotation.scopeOfWork}</p>
          </div>
        )}

        {/* Line Items Table */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">รายการสินค้า/บริการ</h2>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#7BC9A6] text-white">
                  <th className="text-left px-3 py-2 font-semibold w-12">ลำดับ</th>
                  <th className="text-left px-3 py-2 font-semibold">รายการ</th>
                  <th className="text-center px-3 py-2 font-semibold w-20">จำนวน</th>
                  <th className="text-center px-3 py-2 font-semibold w-16">หน่วย</th>
                  <th className="text-right px-3 py-2 font-semibold w-28">ราคา/หน่วย</th>
                  <th className="text-right px-3 py-2 font-semibold w-20">ส่วนลด</th>
                  <th className="text-right px-3 py-2 font-semibold w-32">จำนวนเงิน</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {quotation.items.map((item: any, index: number) => (
                  <tr key={item.id}>
                    <td className="px-3 py-2.5 text-gray-600">{index + 1}</td>
                    <td className="px-3 py-2.5">
                      <p className="font-medium text-gray-900">{item.itemName}</p>
                      {item.description && (
                        <p className="text-[10px] text-gray-500 mt-0.5">{item.description}</p>
                      )}
                    </td>
                    <td className="px-3 py-2.5 text-center text-gray-900">
                      {formatCurrency(item.quantity)}
                    </td>
                    <td className="px-3 py-2.5 text-center text-gray-600">{item.unit}</td>
                    <td className="px-3 py-2.5 text-right text-gray-900">
                      {formatCurrency(item.unitPrice)}
                    </td>
                    <td className="px-3 py-2.5 text-right text-gray-600">{item.discount}%</td>
                    <td className="px-3 py-2.5 text-right font-medium text-gray-900">
                      {formatCurrency(calculateLineTotal(item))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="flex justify-end mb-6">
          <div className="w-full sm:w-96">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">ยอดรวมก่อนหักส่วนลด:</span>
                <span className="font-medium text-gray-900">
                  {formatCurrency(quotation.subtotal)} บาท
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
                    -{formatCurrency(quotation.subtotal - quotation.netTotal)} บาท
                  </span>
                </div>
              )}

              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">ยอดรวมหลังหักส่วนลด:</span>
                <span className="font-medium text-gray-900">
                  {formatCurrency(quotation.netTotal)} บาท
                </span>
              </div>

              {quotation.includeVat && (
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">ภาษีมูลค่าเพิ่ม 7%:</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(quotation.vat)} บาท
                  </span>
                </div>
              )}

              <div className="flex justify-between py-3 bg-[#7BC9A6]/10 rounded-lg px-3 mt-2">
                <span className="font-semibold text-gray-900">ยอดรวมทั้งสิ้น:</span>
                <span className="text-lg font-bold text-[#7BC9A6]">
                  {formatCurrency(quotation.grandTotal)} บาท
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Action Bar - Hidden on Print */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm print:hidden">
        <div className="max-w-[1200px] mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={onBack} className="h-9 w-9 p-0">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-sm font-semibold text-gray-900">ดูตัวอย่างเอกสาร</h1>
                <p className="text-xs text-gray-500">{quotation.documentNumber}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
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
            </div>
          </div>
        </div>
      </div>

      {/* Document Content */}
      <div className="max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none print:rounded-none">
          {/* Document Paper */}
          <div className="p-8 sm:p-12">
            {/* Header */}
            <div className="flex items-start justify-between mb-8 pb-6 border-b-2 border-[#7BC9A6]">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-[#7BC9A6] mb-2">{company.name}</h1>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>{company.address}</p>
                  <p>โทร: {company.phone}</p>
                  <p>อีเมล: {company.email}</p>
                  <p>เลขประจำตัวผู้เสียภาษี: {company.taxId}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="inline-block bg-[#7BC9A6] text-white px-4 py-2 rounded-lg mb-3">
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
                <h2 className="text-sm font-semibold text-gray-900 mb-3">ลูกค้า</h2>
                <div className="text-xs text-gray-600 space-y-2">
                  <p className="font-medium text-gray-900 text-sm">
                    {quotation.customer.company}
                  </p>
                  <p>ผู้ติดต่อ: {quotation.customer.contact}</p>
                  <p>ที่อยู่: {quotation.customer.address}</p>
                  <p>โทร: {quotation.customer.phone}</p>
                  <p>อีเมล: {quotation.customer.email}</p>
                  {quotation.customer.taxId && (
                    <p>เลขประจำตัวผู้เสียภาษี: {quotation.customer.taxId}</p>
                  )}
                </div>
              </div>

              {/* Document Info */}
              <div>
                <h2 className="text-sm font-semibold text-gray-900 mb-3">รายละเอียดเอกสาร</h2>
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
                    <span className="font-medium text-[#7BC9A6]">{quotation.status}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Template-specific Content */}
            {quotation.templateType === "international-freight"
              ? renderInternationalFreight()
              : renderStandardTemplate()}

            {/* Remarks */}
            {quotation.remarks && (
              <div className="mb-8">
                <h2 className="text-sm font-semibold text-gray-900 mb-3">หมายเหตุ / เงื่อนไข</h2>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-xs text-gray-700 whitespace-pre-line">{quotation.remarks}</p>
                </div>
              </div>
            )}

            {/* Signature Section */}
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                {quotation.status === "Approved" ? (
                  <>
                    <div className="mb-2 pb-8 flex flex-col items-center justify-end" style={{ minHeight: '80px' }}>
                      <div className="text-3xl font-dancing text-[#7BC9A6] mb-1" style={{ fontFamily: 'cursive' }}>
                        {quotation.createdBy.name}
                      </div>
                    </div>
                    <div className="border-t-2 border-gray-400 pt-2 max-w-[200px] mx-auto">
                      <p className="text-xs text-gray-600 font-medium">ผู้เสนอราคา</p>
                      <p className="text-xs text-gray-900 mt-1">{quotation.createdBy.name}</p>
                      <p className="text-xs text-gray-500 mt-1">วันที่: {quotation.createdDate}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="border-b border-gray-300 mb-2 pb-12"></div>
                    <p className="text-xs text-gray-600">ผู้เสนอราคา</p>
                    <p className="text-xs text-gray-500 mt-1">วันที่: ......../......../.........</p>
                  </>
                )}
              </div>
              <div className="text-center">
                {quotation.status === "Approved" && quotation.approvedBy ? (
                  <>
                    <div className="mb-2 pb-8 flex flex-col items-center justify-end" style={{ minHeight: '80px' }}>
                      <div className="text-3xl font-dancing text-blue-600 mb-1" style={{ fontFamily: 'cursive' }}>
                        {quotation.approvedBy.name}
                      </div>
                      <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded text-xs font-medium">
                        ✓ อนุมัติแล้ว
                      </div>
                    </div>
                    <div className="border-t-2 border-gray-400 pt-2 max-w-[200px] mx-auto">
                      <p className="text-xs text-gray-600 font-medium">ผู้อนุมัติ</p>
                      <p className="text-xs text-gray-900 mt-1">{quotation.approvedBy.name}</p>
                      <p className="text-xs text-gray-500 mt-1">วันที่: {quotation.approvedDate}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="border-b border-gray-300 mb-2 pb-12"></div>
                    <p className="text-xs text-gray-600">ผู้อนุมัติ</p>
                    <p className="text-xs text-gray-500 mt-1">วันที่: ......../......../.........</p>
                  </>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-gray-200 text-center">
              <p className="text-[10px] text-gray-500">
                {company.name} | {company.address}
              </p>
              <p className="text-[10px] text-gray-500 mt-1">
                โทร: {company.phone} | อีเมล: {company.email} | เว็บไซต์: {company.website}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}