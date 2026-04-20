import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ArrowLeft,
  FileText,
  Edit,
  Mail,
  Send,
  Calendar,
  Clock,
  Building2,
  User,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
  XCircle,
  FileSignature,
  Printer,
} from "lucide-react";

interface NDADetailScreenProps {
  ndaId: string;
  onBack: () => void;
  onEdit: () => void;
  onPreview: () => void;
}

export function NDADetailScreen({
  ndaId,
  onBack,
  onEdit,
  onPreview,
}: NDADetailScreenProps) {
  const { t } = useTranslation();

  // Mock data
  const ndaData = {
    id: "NDA-2025-003",
    title: "Supply Chain Platform Development NDA",
    documentNumber: "NDA-2025-003",
    status: "signed",
    createdBy: "Sarah Chen",
    createdDate: "2025-02-19",
    contractDate: "2025-02-19",
    effectiveDate: "2025-03-01",
    endDate: "2028-03-01",
    duration: "3",
    contractLocation: "กรุงเทพมหานคร",
    daysRemaining: 1096,

    // Party A (ผู้เปิดเผยข้อมูล)
    partyA: {
      companyName: "บริษัท วันลิงค์ โลจิสติกส์ จำกัด",
      registrationNo: "0105564123456",
      address:
        "เลขที่ 123 อาคารสาทรสแควร์ ชั้น 25 ถนนสาทรเหนือ แขวงสีลม เขตบางรัก กรุงเทพมหานคร 10500",
      businessType: "บริการขนส่งและโลจิสติกส์",
      signatoryName: "นายสมชาย วงศ์ใหญ่",
      signatoryPosition: "กรรมการผู้จัดการ",
      contactPerson: "นายสมชาย วงศ์ใหญ่",
      email: "somchai@onelink-logistics.com",
      phone: "+66 2 123 4567",
    },

    // Party B (ผู้รับข้อมูล)
    partyB: {
      companyName: "บริษัท ไทยเทคโนโลยี อินโนเวชั่น จำกัด (มหาชน)",
      registrationNo: "0107556789012",
      address:
        "เลขที่ 999/99 อาคารจัสมิน อินเตอร์เนชั่นแนล ทาวเวอร์ ชั้น 30 ถนนพหลโยธิน แขวงจตุจักร เขตจตุจักร กรุงเทพมหานคร 10900",
      businessType: "เทคโนโลยีและนวัตกรรมดิจิทัล",
      signatoryName: "นางสาวพิมพ์ชนก สุขสวัสดิ์",
      signatoryPosition: "ประธานเจ้าหน้าที่บริหาร",
      contactPerson: "นางสาวพิมพ์ชนก สุขสวัสดิ์",
      email: "pimchanok@thaitech-innovation.com",
      phone: "+66 2 987 6543",
    },

    // Business Purpose
    businessPurpose: {
      title: "การพัฒนาแพลตฟอร์ม Supply Chain",
      description:
        "เพื่อการพัฒนาและดำเนินโครงการความร่วมมือทางธุรกิจในการพัฒนาระบบ Supply Chain Management Platform แบบครบวงจร โดยทั้งสองฝ่ายจะร่วมกันแลกเปลี่ยนข้อมูลทางเทคนิค ข้อมูลลูกค้า กลยุทธ์ทางธุรกิจ และทรัพย์สินทางปัญญาที่เกี่ยวข้องกับโครงการดังกล่าว เพื่อให้การดำเนินโครงการเป็นไปอย่างมีประสิทธิภาพและบรรลุเป้าหมายร่วมกัน",
      descriptionEN:
        "This NDA covers comprehensive confidentiality agreement for Supply Chain Management Platform development, including technical specifications, customer data, business strategies, and intellectual property sharing between both parties to ensure efficient project execution and mutual goal achievement.",
    },

    // Confidential Scope
    confidentialScope: [
      "ข้อมูลทางเทคนิคและเทคโนโลยี รวมถึงซอร์สโค้ด สถาปัตยกรรมระบบ และกระบวนการพัฒนา",
      "ข้อมูลลูกค้าและผู้ใช้งาน รวมถึงฐานข้อมูลและรูปแบบการใช้งาน",
      "แผนธุรกิจ กลยุทธ์การตลาด และข้อมูลการเงิน",
      "ข้อตกลงทางการค้า เงื่อนไขราคา และข้อมูลซัพพลายเออร์",
      "ทรัพย์สินทางปัญญา สิทธิบัตร และลิขสิทธิ์ที่เกี่ยวข้อง",
      "เอกสารและข้อมูลอื่นใดที่ระบุว่าเป็นความลับ",
    ],

    // Special Conditions
    specialConditions: [
      "คู่สัญญาทั้งสองฝ่ายตกลงที่จะไม่นำข้อมูลความลับไปใช้เพื่อวัตถุประสงค์อื่นใดนอกเหนือจากโครงการที่ระบุในสัญญา",
      "ข้อมูลที่เปิดเผยต่อสาธารณะก่อนการทำสัญญา หรือข้อมูลที่คู่สัญญาได้มาโดยชอบด้วยกฎหมายจากบุคคลที่สาม จะไม่อยู่ภายใต้ข้อผูกพันของสัญญานี้",
      "ในกรณีที่มีการละเมิดสัญญา คู่สัญญาฝ่ายที่ถูกละเมิดมีสิทธิ์เรียกค่าเสียหายและดำเนินการทางกฎหมายได้ทันที",
    ],

    // Witnesses
    includeWitness: true,
    witnesses: {
      witnessA: "นายวิชัย ประสิทธิ์สกุล",
      witnessB: "นางสาวอรพิน เจริญสุข",
      positionA: "ที่ปรึกษากฎหมาย",
      positionB: "ผู้จัดการฝ่ายกฎหมาย",
    },

    template: "Mutual NDA Template",
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<
      string,
      { label: string; className: string; icon: JSX.Element }
    > = {
      draft: {
        label: "ฉบับร่าง",
        className: "bg-gray-100 text-gray-800 border-gray-300",
        icon: <Clock className="w-3 h-3 mr-1" />,
      },
      active: {
        label: "ใช้งานอยู่",
        className: "bg-green-100 text-green-800 border-green-300",
        icon: <CheckCircle2 className="w-3 h-3 mr-1" />,
      },
      signed: {
        label: "ลงนามแล้ว",
        className: "bg-blue-100 text-blue-800 border-blue-300",
        icon: <CheckCircle2 className="w-3 h-3 mr-1" />,
      },
      pending: {
        label: "รอดำเนินการ",
        className: "bg-yellow-100 text-yellow-800 border-yellow-300",
        icon: <Clock className="w-3 h-3 mr-1" />,
      },
      expired: {
        label: "หมดอายุ",
        className: "bg-red-100 text-red-800 border-red-300",
        icon: <XCircle className="w-3 h-3 mr-1" />,
      },
    };

    const config = statusConfig[status] || statusConfig.draft;
    return (
      <Badge className={`flex items-center ${config.className}`}>
        {config.icon}
        {config.label}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="p-2 sm:p-3 lg:p-4">
        <div className="max-w-[1600px] mx-auto space-y-3">
          {/* Header with Back Button and Actions */}
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
                  {ndaData.title}
                </h1>
                <p className="text-xs text-gray-500 mt-0.5">
                  {ndaData.documentNumber}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onEdit}
                className="h-9 px-3 text-xs"
              >
                <Edit className="h-3.5 w-3.5 mr-1.5" />
                แก้ไข
              </Button>
              <Button
                size="sm"
                className="h-9 px-3 text-xs bg-orange-600 hover:bg-orange-700"
                onClick={onPreview}
              >
                <Printer className="h-3.5 w-3.5 mr-1.5" />
                แสดงตัวอย่าง
              </Button>
              <Button
                size="sm"
                className="h-9 px-3 text-xs bg-orange-600 hover:bg-orange-700"
              >
                <Send className="h-3.5 w-3.5 mr-1.5" />
                ส่งให้ลูกค้า
              </Button>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2">
            {getStatusBadge(ndaData.status)}
            <span className="text-xs text-gray-500">
              สร้างโดย {ndaData.createdBy} • {formatDate(ndaData.createdDate)}
            </span>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-4">
              {/* ข้อมูลพื้นฐาน */}
              <Card className="shadow-sm">
                <CardHeader className="bg-orange-50 border-b border-orange-100 py-3 px-4">
                  <CardTitle className="text-sm font-semibold text-orange-900 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    ข้อมูลพื้นฐาน
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">เลขที่เอกสาร</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {ndaData.documentNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">วันที่สร้าง</p>
                      <p className="text-sm text-gray-900">
                        {formatDate(ndaData.createdDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">วันที่สิ้นสุด</p>
                      <p className="text-sm text-gray-900">
                        {formatDate(ndaData.endDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">อายุเหลือ</p>
                      <p className="text-sm font-semibold text-orange-600">
                        เหลือ {ndaData.daysRemaining} วัน
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* ข้อมูลฝ่าย A */}
              <Card className="shadow-sm">
                <CardHeader className="bg-orange-50 border-b border-orange-100 py-3 px-4">
                  <CardTitle className="text-sm font-semibold text-orange-900 flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    ข้อมูลฝ่าย A (ผู้เปิดเผยข้อมูล)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">ชื่อบริษัท</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {ndaData.partyA.companyName}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      เลขทะเบียน: {ndaData.partyA.registrationNo}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1">ประเภทธุรกิจ</p>
                    <p className="text-sm text-gray-900">
                      {ndaData.partyA.businessType}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                        <User className="h-3 w-3" />
                        ผู้ติดต่อ
                      </p>
                      <p className="text-sm text-gray-900">
                        {ndaData.partyA.contactPerson}
                      </p>
                      <p className="text-xs text-gray-500">
                        {ndaData.partyA.signatoryPosition}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        อีเมล
                      </p>
                      <p className="text-sm text-blue-600 hover:underline cursor-pointer">
                        {ndaData.partyA.email}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      โทรศัพท์
                    </p>
                    <p className="text-sm text-gray-900">{ndaData.partyA.phone}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      ที่อยู่
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {ndaData.partyA.address}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* ข้อมูลฝ่าย B */}
              <Card className="shadow-sm">
                <CardHeader className="bg-orange-50 border-b border-orange-100 py-3 px-4">
                  <CardTitle className="text-sm font-semibold text-orange-900 flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    ข้อมูลฝ่าย B (ผู้รับข้อมูล)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">ชื่อบริษัท</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {ndaData.partyB.companyName}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      เลขทะเบียน: {ndaData.partyB.registrationNo}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1">ประเภทธุรกิจ</p>
                    <p className="text-sm text-gray-900">
                      {ndaData.partyB.businessType}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                        <User className="h-3 w-3" />
                        ผู้ติดต่อ
                      </p>
                      <p className="text-sm text-gray-900">
                        {ndaData.partyB.contactPerson}
                      </p>
                      <p className="text-xs text-gray-500">
                        {ndaData.partyB.signatoryPosition}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        อีเมล
                      </p>
                      <p className="text-sm text-blue-600 hover:underline cursor-pointer">
                        {ndaData.partyB.email}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      โทรศัพท์
                    </p>
                    <p className="text-sm text-gray-900">{ndaData.partyB.phone}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      ที่อยู่
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {ndaData.partyB.address}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* รายละเอียดเอกสาร */}
              <Card className="shadow-sm">
                <CardHeader className="bg-orange-50 border-b border-orange-100 py-3 px-4">
                  <CardTitle className="text-sm font-semibold text-orange-900 flex items-center gap-2">
                    <FileSignature className="h-4 w-4" />
                    รายละเอียดเอกสาร
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-700 mb-1">
                      หัวข้อที่เกี่ยวข้อง (TH)
                    </p>
                    <p className="text-sm text-gray-900 font-medium">
                      {ndaData.businessPurpose.title}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-700 mb-1">
                      รายละเอียด (TH)
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {ndaData.businessPurpose.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-xs font-semibold text-gray-700 mb-1">
                      Description (EN)
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {ndaData.businessPurpose.descriptionEN}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* ขอบเขตข้อมูลความลับ */}
              <Card className="shadow-sm">
                <CardHeader className="bg-orange-50 border-b border-orange-100 py-3 px-4">
                  <CardTitle className="text-sm font-semibold text-orange-900 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    ขอบเขตข้อมูลความลับ / Scope of Confidential Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <ul className="space-y-2">
                    {ndaData.confidentialScope.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <span className="text-orange-600 font-semibold min-w-[20px]">
                          {index + 1}.
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* เงื่อนไขเพิ่มเติม */}
              <Card className="shadow-sm">
                <CardHeader className="bg-orange-50 border-b border-orange-100 py-3 px-4">
                  <CardTitle className="text-sm font-semibold text-orange-900 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    เงื่อนไขเพิ่มเติมและข้อกำหนดความปลอดภัย
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <ul className="space-y-2">
                    {ndaData.specialConditions.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <span className="text-orange-600 font-semibold min-w-[20px]">
                          {index + 1}.
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Summary */}
            <div className="lg:col-span-1 space-y-4">
              {/* สรุปข้อมูลสำคัญ */}
              <Card className="shadow-sm border-orange-200">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    สรุปข้อมูลสำคัญ
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  {/* Duration Display */}
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                    <p className="text-xs text-orange-700 mb-1">ระยะเวลาสัญญา</p>
                    <p className="text-3xl font-bold text-orange-600">
                      {ndaData.duration}
                    </p>
                    <p className="text-xs text-orange-700 mt-1">ปี</p>
                  </div>

                  {/* Key Information */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500">วันที่ทำสัญญา</p>
                        <p className="text-sm font-medium text-gray-900">
                          {formatDate(ndaData.contractDate)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Calendar className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500">
                          วันที่มีผลบังคับใช้
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {formatDate(ndaData.effectiveDate)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500">วันสิ้นสุดสัญญา</p>
                        <p className="text-sm font-medium text-gray-900">
                          {formatDate(ndaData.endDate)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500">สถานที่ทำสัญญา</p>
                        <p className="text-sm font-medium text-gray-900">
                          {ndaData.contractLocation}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* ข้อมูลเทมเพลต */}
              <Card className="shadow-sm">
                <CardHeader className="bg-gray-50 border-b border-gray-200 py-3 px-4">
                  <CardTitle className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    เทมเพลตที่ใช้
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm font-medium text-blue-900">
                      {ndaData.template}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* ข้อมูลพยาน */}
              {ndaData.includeWitness && (
                <Card className="shadow-sm">
                  <CardHeader className="bg-gray-50 border-b border-gray-200 py-3 px-4">
                    <CardTitle className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      พยาน
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">พยานคนที่ 1</p>
                      <p className="text-sm font-medium text-gray-900">
                        {ndaData.witnesses.witnessA}
                      </p>
                      <p className="text-xs text-gray-600">
                        {ndaData.witnesses.positionA}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">พยานคนที่ 2</p>
                      <p className="text-sm font-medium text-gray-900">
                        {ndaData.witnesses.witnessB}
                      </p>
                      <p className="text-xs text-gray-600">
                        {ndaData.witnesses.positionB}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quick Actions */}
              <Card className="shadow-sm">
                <CardHeader className="bg-gray-50 border-b border-gray-200 py-3 px-4">
                  <CardTitle className="text-sm font-semibold text-gray-900">
                    การดำเนินการ
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-xs h-9"
                    onClick={onEdit}
                  >
                    <Edit className="h-3.5 w-3.5 mr-2" />
                    แก้ไขเอกสาร
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-xs h-9"
                  >
                    <FileText className="h-3.5 w-3.5 mr-2" />
                    ดาวน์โหลด PDF
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-xs h-9"
                  >
                    <Mail className="h-3.5 w-3.5 mr-2" />
                    ส่งอีเมล
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}