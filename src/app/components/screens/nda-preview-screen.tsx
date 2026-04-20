import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ArrowLeft,
  Download,
  Edit,
  Share2,
  Printer,
  FileText,
  Home,
  ChevronRight,
  CheckCircle2,
  Calendar,
  Building2,
  User,
  Clock,
} from "lucide-react";

interface NDAPreviewScreenProps {
  ndaId: string;
  onBack: () => void;
  onEdit: () => void;
}

export function NDAPreviewScreen({ ndaId, onBack, onEdit }: NDAPreviewScreenProps) {
  // Mock data - ในโปรเจคจริงจะ fetch จาก API ด้วย ndaId
  const ndaData = {
    id: "NDA-2025-003",
    title: "Supply Chain Platform Development NDA",
    status: "signed",
    contractDate: "2025-02-19",
    effectiveDate: "2025-03-01",
    contractLocation: "กรุงเทพมหานคร",
    documentNumber: "NDA-2025-003",
    
    partyA: {
      companyName: "บริษัท วันลิงค์ โลจิสติกส์ จำกัด",
      registrationNo: "0105564123456",
      address: "เลขที่ 123 อาคารสาทรสแควร์ ชั้น 25 ถนนสาทรเหนือ แขวงสีลม เขตบางรัก กรุงเทพมหานคร 10500",
      businessType: "บริการขนส่งและโลจิสติกส์",
      signatoryName: "นายสมชาย วงศ์ใหญ่",
      signatoryPosition: "กรรมการผู้จัดการ",
    },
    
    partyB: {
      companyName: "บริษัท ไทยเทคโนโลยี อินโนเวชั่น จำกัด (มหาชน)",
      registrationNo: "0107556789012",
      address: "เลขที่ 999/99 อาคารจัสมิน อินเตอร์เนชั่นแนล ทาวเวอร์ ชั้น 30 ถนนพหลโยธิน แขวงจตุจักร เขตจตุจักร กรุงเทพมหานคร 10900",
      businessType: "เทคโนโลยีและนวัตกรรมดิจิทัล",
      signatoryName: "นางสาวพิมพ์ชนก สุขสวัสดิ์",
      signatoryPosition: "ประธานเจ้าหน้าที่บริหาร",
    },
    
    businessPurpose: {
      description: "เพื่อการพัฒนาและดำเนินโครงการความร่วมมือทางธุรกิจในการพัฒนาระบบ Supply Chain Management Platform แบบครบวงจร โดยทั้งสองฝ่ายจะร่วมกันแลกเปลี่ยนข้อมูลทางเทคนิค ข้อมูลลูกค้า กลยุทธ์ทางธุรกิจ และทรัพย์สินทางปัญญาที่เกี่ยวข้องกับโครงการดังกล่าว เพื่อให้การดำเนินโครงการเป็นไปอย่างมีประสิทธิภาพและบรรลุเป้าหมายร่วมกัน",
      confidentialScope: "ข้อมูลความลับที่อยู่ภายใต้สัญญานี้ ประกอบด้วย:\n1. ข้อมูลทางเทคนิคและเทคโนโลยี รวมถึงซอร์สโค้ด สถาปัตยกรรมระบบ และกระบวนการพัฒนา\n2. ข้อมูลลูกค้าและผู้ใช้งาน รวมถึงฐานข้อมูลและรูปแบบการใช้งาน\n3. แผนธุรกิจ กลยุทธ์การตลาด และข้อมูลการเงิน\n4. ข้อตกลงทางการค้า เงื่อนไขราคา และข้อมูลซัพพลายเออร์\n5. ทรัพย์สินทางปัญญา สิทธิบัตร และลิขสิทธิ์ที่เกี่ยวข้อง\n6. เอกสารและข้อมูลอื่นใดที่ระบุว่าเป็นความลับ",
      duration: "3",
    },
    
    specialConditions: [
      "คู่สัญญาทั้งสองฝ่ายตกลงที่จะไม่นำข้อมูลความลับไปใช้เพื่อวัตถุประสงค์อื่นใดนอกเหนือจากโครงการที่ระบุในสัญญา",
      "ข้อมูลที่เปิดเผยต่อสาธารณะก่อนการทำสัญญา หรือข้อมูลที่คู่สัญญาได้มาโดยชอบด้วยกฎหมายจากบุคคลที่สาม จะไม่อยู่ภายใต้ข้อผูกพันของสัญญานี้",
      "ในกรณีที่มีการละเมิดสัญญา คู่สัญญาฝ่ายที่ถูกละเมิดมีสิทธิ์เรียกค่าเสียหายและดำเนินการทางกฎหมายได้ทันที",
    ],
    
    includeWitness: true,
    witnesses: {
      witnessA: "นายวิชัย ประสิทธิ์สกุล",
      witnessB: "นางสาวอรพิน เจริญสุข",
      positionA: "ที่ปรึกษากฎหมาย",
      positionB: "ผู้จัดการฝ่ายกฎหมาย",
    },

    createdBy: "Sarah Chen",
    createdDate: "2025-02-19",
    endDate: "2028-03-01",
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; className: string; icon: JSX.Element }> = {
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
    };

    const config = statusConfig[status] || statusConfig.draft;
    return (
      <Badge className={`flex items-center ${config.className}`}>
        {config.icon}
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
            <Home className="h-3.5 w-3.5" />
            <ChevronRight className="h-3.5 w-3.5" />
            <button onClick={onBack} className="hover:text-gray-900">
              ข้อเสนอและสัญญา
            </button>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-gray-900 font-medium">รายละเอียด NDA</span>
          </div>

          {/* Header Content */}
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={onBack}
                className="mt-1"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                กลับ
              </Button>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    {ndaData.title}
                  </h1>
                  {getStatusBadge(ndaData.status)}
                </div>
                <p className="text-sm text-gray-500">
                  เอกสารหมายเลข: {ndaData.documentNumber}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-2" />
                พิมพ์
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                แชร์
              </Button>
              <Button variant="outline" size="sm" onClick={onEdit}>
                <Edit className="h-4 w-4 mr-2" />
                แก้ไข
              </Button>
              <Button className="bg-[#7BC9A6] hover:bg-[#6AB896] text-white" size="sm">
                <Download className="h-4 w-4 mr-2" />
                ดาวน์โหลด PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          
          {/* Left Column - Document Info */}
          <div className="col-span-4 space-y-4">
            
            {/* Document Details Card */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="border-b border-gray-100 bg-gray-50/50 py-3 px-5">
                <CardTitle className="text-base font-semibold text-gray-900">
                  ข้อมูลเอกสาร
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">สถานะ</p>
                  {getStatusBadge(ndaData.status)}
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">วันที่ทำสัญญา</p>
                  <div className="flex items-center gap-2 text-sm text-gray-900">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    {ndaData.contractDate}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">วันที่มีผลบังคับใช้</p>
                  <div className="flex items-center gap-2 text-sm text-gray-900">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    {ndaData.effectiveDate}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">วันที่สิ้นสุด</p>
                  <div className="flex items-center gap-2 text-sm text-gray-900">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    {ndaData.endDate}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">ระยะเวลา</p>
                  <p className="text-sm text-gray-900 font-medium">{ndaData.businessPurpose.duration} ปี</p>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">สถานที่ทำสัญญา</p>
                  <p className="text-sm text-gray-900">{ndaData.contractLocation}</p>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">ผู้สร้าง</p>
                  <div className="flex items-center gap-2 text-sm text-gray-900">
                    <User className="h-4 w-4 text-gray-400" />
                    {ndaData.createdBy}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">วันที่สร้าง</p>
                  <p className="text-sm text-gray-900">{ndaData.createdDate}</p>
                </div>
              </CardContent>
            </Card>

            {/* Party Information Cards */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="border-b border-gray-100 bg-gray-50/50 py-3 px-5">
                <CardTitle className="text-base font-semibold text-gray-900">
                  คู่สัญญา
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                {/* Party A */}
                <div className="pb-4 border-b border-gray-100">
                  <p className="text-xs font-semibold text-gray-700 mb-2">ฝ่าย A (ผู้เปิดเผยข้อมูล)</p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Building2 className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{ndaData.partyA.companyName}</p>
                        <p className="text-xs text-gray-500">เลขทะเบียน: {ndaData.partyA.registrationNo}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 pl-6">{ndaData.partyA.address}</p>
                    <div className="pl-6">
                      <p className="text-xs text-gray-600">
                        <span className="font-medium">ผู้ลงนาม:</span> {ndaData.partyA.signatoryName}
                      </p>
                      <p className="text-xs text-gray-600">
                        <span className="font-medium">ตำแหน่ง:</span> {ndaData.partyA.signatoryPosition}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Party B */}
                <div>
                  <p className="text-xs font-semibold text-gray-700 mb-2">ฝ่าย B (ผู้รับข้อมูล)</p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Building2 className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{ndaData.partyB.companyName}</p>
                        <p className="text-xs text-gray-500">เลขทะเบียน: {ndaData.partyB.registrationNo}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 pl-6">{ndaData.partyB.address}</p>
                    <div className="pl-6">
                      <p className="text-xs text-gray-600">
                        <span className="font-medium">ผู้ลงนาม:</span> {ndaData.partyB.signatoryName}
                      </p>
                      <p className="text-xs text-gray-600">
                        <span className="font-medium">ตำแหน่ง:</span> {ndaData.partyB.signatoryPosition}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Right Column - Document Preview */}
          <div className="col-span-8">
            <Card className="shadow-lg border-gray-200">
              <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white py-3 px-5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    เอกสาร NDA
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs"
                  >
                    <Download className="h-3.5 w-3.5 mr-1.5" />
                    ดาวน์โหลด
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="bg-gray-100 max-h-[calc(100vh-200px)] overflow-y-auto">
                  {/* A4 Document Preview */}
                  <div className="p-6">
                    <div className="bg-white shadow-lg mx-auto" style={{ width: "595px", minHeight: "842px", padding: "60px" }}>
                      {/* Document Header */}
                      <div className="text-center mb-8 border-b-2 border-gray-900 pb-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                          สัญญาข้อตกลงการเก็บรักษาความลับ
                        </h1>
                        <h2 className="text-lg font-semibold text-gray-800">
                          (MUTUAL NON-DISCLOSURE AGREEMENT)
                        </h2>
                        <div className="mt-4 text-sm text-gray-700">
                          <p>เลขที่เอกสาร: {ndaData.documentNumber}</p>
                        </div>
                      </div>

                      {/* Contract Details */}
                      <div className="mb-6 text-sm leading-relaxed text-gray-800">
                        <p className="mb-2">
                          สัญญาฉบับนี้ทำขึ้น ณ{" "}
                          <span className="font-semibold underline decoration-dotted">
                            {ndaData.contractLocation}
                          </span>
                        </p>
                        <p className="mb-4">
                          เมื่อวันที่{" "}
                          <span className="font-semibold underline decoration-dotted">
                            {ndaData.contractDate}
                          </span>
                        </p>
                      </div>

                      {/* Party A */}
                      <div className="mb-6 text-sm leading-relaxed text-gray-800">
                        <p className="font-bold mb-2">ฝ่าย A (ผู้เปิดเผยข้อมูล):</p>
                        <p>
                          ชื่อบริษัท:{" "}
                          <span className="font-semibold underline decoration-dotted">
                            {ndaData.partyA.companyName}
                          </span>
                        </p>
                        <p>
                          เลขทะเบียนนิติบุคคล:{" "}
                          <span className="font-semibold">
                            {ndaData.partyA.registrationNo}
                          </span>
                        </p>
                        <p>
                          ประเภทธุรกิจ:{" "}
                          <span className="font-semibold">
                            {ndaData.partyA.businessType}
                          </span>
                        </p>
                        <p>
                          ที่อยู่:{" "}
                          <span className="font-semibold">
                            {ndaData.partyA.address}
                          </span>
                        </p>
                        <p>
                          ผู้มีอำนาจลงนาม:{" "}
                          <span className="font-semibold">
                            {ndaData.partyA.signatoryName}
                          </span>
                          {" "}ตำแหน่ง{" "}
                          <span className="font-semibold">
                            {ndaData.partyA.signatoryPosition}
                          </span>
                        </p>
                      </div>

                      {/* Party B */}
                      <div className="mb-6 text-sm leading-relaxed text-gray-800">
                        <p className="font-bold mb-2">ฝ่าย B (ผู้รับข้อมูล):</p>
                        <p>
                          ชื่อบริษัท:{" "}
                          <span className="font-semibold underline decoration-dotted">
                            {ndaData.partyB.companyName}
                          </span>
                        </p>
                        <p>
                          เลขทะเบียนนิติบุคคล:{" "}
                          <span className="font-semibold">
                            {ndaData.partyB.registrationNo}
                          </span>
                        </p>
                        <p>
                          ประเภทธุรกิจ:{" "}
                          <span className="font-semibold">
                            {ndaData.partyB.businessType}
                          </span>
                        </p>
                        <p>
                          ที่อยู่:{" "}
                          <span className="font-semibold">
                            {ndaData.partyB.address}
                          </span>
                        </p>
                        <p>
                          ผู้มีอำนาจลงนาม:{" "}
                          <span className="font-semibold">
                            {ndaData.partyB.signatoryName}
                          </span>
                          {" "}ตำแหน่ง{" "}
                          <span className="font-semibold">
                            {ndaData.partyB.signatoryPosition}
                          </span>
                        </p>
                      </div>

                      {/* Business Purpose */}
                      <div className="mb-6 text-sm leading-relaxed text-gray-800">
                        <p className="font-bold mb-2">วัตถุประสงค์:</p>
                        <p>{ndaData.businessPurpose.description}</p>
                      </div>

                      {/* Confidential Scope */}
                      <div className="mb-6 text-sm leading-relaxed text-gray-800">
                        <p className="font-bold mb-2">ขอบเขตข้อมูลความลับ:</p>
                        <p className="whitespace-pre-line">{ndaData.businessPurpose.confidentialScope}</p>
                      </div>

                      {/* Duration */}
                      <div className="mb-6 text-sm leading-relaxed text-gray-800">
                        <p>
                          ระยะเวลาการเก็บรักษาความลับ:{" "}
                          <span className="font-semibold">
                            {ndaData.businessPurpose.duration} ปี
                          </span>
                        </p>
                        <p>
                          มีผลบังคับใช้ตั้งแต่วันที่:{" "}
                          <span className="font-semibold underline decoration-dotted">
                            {ndaData.effectiveDate}
                          </span>
                        </p>
                      </div>

                      {/* Special Conditions */}
                      {ndaData.specialConditions.length > 0 && (
                        <div className="mb-6 text-sm leading-relaxed text-gray-800">
                          <p className="font-bold mb-2">เงื่อนไขเพิ่มเติม:</p>
                          <ul className="list-decimal list-inside space-y-1">
                            {ndaData.specialConditions.map((clause, index) => (
                              <li key={index}>{clause}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Signature Section */}
                      <div className="mt-12 pt-8 border-t-2 border-gray-300">
                        <div className="grid grid-cols-2 gap-8 mb-8">
                          <div className="text-center">
                            <div className="border-t border-gray-400 pt-2 mt-16">
                              <p className="font-semibold">ลงนาม ฝ่าย A</p>
                              <p className="text-xs">({ndaData.partyA.signatoryName})</p>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="border-t border-gray-400 pt-2 mt-16">
                              <p className="font-semibold">ลงนาม ฝ่าย B</p>
                              <p className="text-xs">({ndaData.partyB.signatoryName})</p>
                            </div>
                          </div>
                        </div>

                        {/* Witnesses */}
                        {ndaData.includeWitness && (
                          <div className="grid grid-cols-2 gap-8 mt-8 pt-4 border-t border-gray-200">
                            <div className="text-center">
                              <div className="border-t border-gray-400 pt-2 mt-12">
                                <p className="font-semibold">พยาน</p>
                                <p className="text-xs">({ndaData.witnesses.witnessA})</p>
                                {ndaData.witnesses.positionA && (
                                  <p className="text-xs text-gray-600">{ndaData.witnesses.positionA}</p>
                                )}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="border-t border-gray-400 pt-2 mt-12">
                                <p className="font-semibold">พยาน</p>
                                <p className="text-xs">({ndaData.witnesses.witnessB})</p>
                                {ndaData.witnesses.positionB && (
                                  <p className="text-xs text-gray-600">{ndaData.witnesses.positionB}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}