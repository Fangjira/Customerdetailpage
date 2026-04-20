import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ArrowLeft,
  Edit2,
  Save,
  X,
  FileText,
  Home,
  ChevronRight,
  Calendar,
  Building2,
  User,
  Check,
} from "lucide-react";
import { Switch } from "../ui/switch";

interface NDAEditorScreenProps {
  ndaId: string;
  onBack: () => void;
  onSave: () => void;
}

export function NDAEditorScreen({ ndaId, onBack, onSave }: NDAEditorScreenProps) {
  // Mock data - ในโปรเจคจริงจะ fetch จาก API ด้วย ndaId
  const [editingSection, setEditingSection] = useState<string | null>(null);
  
  const [ndaData, setNdaData] = useState({
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
  });

  const handleSectionEdit = (section: string) => {
    setEditingSection(section);
  };

  const handleSectionSave = () => {
    setEditingSection(null);
  };

  const handleSectionCancel = () => {
    setEditingSection(null);
    // TODO: Reset to original data
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
            <span className="text-gray-900 font-medium">แก้ไข NDA</span>
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
                    แก้ไข: {ndaData.title}
                  </h1>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                    <Edit2 className="w-3 h-3 mr-1" />
                    กำลังแก้ไข
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">
                  เอกสารหมายเลข: {ndaData.documentNumber}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={onBack}
              >
                <X className="h-4 w-4 mr-2" />
                ยกเลิก
              </Button>
              <Button 
                className="bg-[#7BC9A6] hover:bg-[#6AB896] text-white" 
                size="sm"
                onClick={() => {
                  onSave();
                  onBack();
                }}
              >
                <Save className="h-4 w-4 mr-2" />
                บันทึก
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          
          {/* Left Column - Edit Form */}
          <div className="col-span-5 space-y-4">
            
            {/* Section 1: Document Info */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="border-b border-gray-100 bg-gray-50/50 py-3 px-5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold text-gray-900">
                    1. ข้อมูลเอกสาร
                  </CardTitle>
                  {editingSection !== "document-info" ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleSectionEdit("document-info")}
                      className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Edit2 className="h-3.5 w-3.5 mr-1.5" />
                      แก้ไข
                    </Button>
                  ) : (
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleSectionCancel}
                        className="h-8 text-gray-600 hover:bg-gray-100"
                      >
                        <X className="h-3.5 w-3.5 mr-1" />
                        ยกเลิก
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSectionSave}
                        className="h-8 bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Check className="h-3.5 w-3.5 mr-1" />
                        บันทึก
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                {editingSection === "document-info" ? (
                  <>
                    <div>
                      <Label className="text-xs font-medium text-gray-700 mb-1.5">ชื่อเอกสาร</Label>
                      <Input
                        value={ndaData.title}
                        onChange={(e) => setNdaData({ ...ndaData, title: e.target.value })}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-gray-700 mb-1.5">วันที่ทำสัญญา</Label>
                      <Input
                        type="date"
                        value={ndaData.contractDate}
                        onChange={(e) => setNdaData({ ...ndaData, contractDate: e.target.value })}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-gray-700 mb-1.5">วันที่มีผลบังคับใช้</Label>
                      <Input
                        type="date"
                        value={ndaData.effectiveDate}
                        onChange={(e) => setNdaData({ ...ndaData, effectiveDate: e.target.value })}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-gray-700 mb-1.5">สถานที่ทำสัญญา</Label>
                      <Input
                        value={ndaData.contractLocation}
                        onChange={(e) => setNdaData({ ...ndaData, contractLocation: e.target.value })}
                        className="text-sm"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">ชื่อเอกสาร</p>
                      <p className="text-sm text-gray-900">{ndaData.title}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">วันที่ทำสัญญา</p>
                      <p className="text-sm text-gray-900">{ndaData.contractDate}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">วันที่มีผลบังคับใช้</p>
                      <p className="text-sm text-gray-900">{ndaData.effectiveDate}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">สถานที่ทำสัญญา</p>
                      <p className="text-sm text-gray-900">{ndaData.contractLocation}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Section 2: Party A */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="border-b border-gray-100 bg-gray-50/50 py-3 px-5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold text-gray-900">
                    2. ฝ่าย A (ผู้เปิดเผยข้อมูล)
                  </CardTitle>
                  {editingSection !== "party-a" ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleSectionEdit("party-a")}
                      className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Edit2 className="h-3.5 w-3.5 mr-1.5" />
                      แก้ไข
                    </Button>
                  ) : (
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleSectionCancel}
                        className="h-8 text-gray-600 hover:bg-gray-100"
                      >
                        <X className="h-3.5 w-3.5 mr-1" />
                        ยกเลิก
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSectionSave}
                        className="h-8 bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Check className="h-3.5 w-3.5 mr-1" />
                        บันทึก
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                {editingSection === "party-a" ? (
                  <>
                    <div>
                      <Label className="text-xs font-medium text-gray-700 mb-1.5">ชื่อบริษัท</Label>
                      <Input
                        value={ndaData.partyA.companyName}
                        onChange={(e) => setNdaData({
                          ...ndaData,
                          partyA: { ...ndaData.partyA, companyName: e.target.value }
                        })}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-gray-700 mb-1.5">เลขทะเบียนนิติบุคคล</Label>
                      <Input
                        value={ndaData.partyA.registrationNo}
                        onChange={(e) => setNdaData({
                          ...ndaData,
                          partyA: { ...ndaData.partyA, registrationNo: e.target.value }
                        })}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-gray-700 mb-1.5">ที่อยู่</Label>
                      <Textarea
                        value={ndaData.partyA.address}
                        onChange={(e) => setNdaData({
                          ...ndaData,
                          partyA: { ...ndaData.partyA, address: e.target.value }
                        })}
                        className="text-sm"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-gray-700 mb-1.5">ประเภทธุรกิจ</Label>
                      <Input
                        value={ndaData.partyA.businessType}
                        onChange={(e) => setNdaData({
                          ...ndaData,
                          partyA: { ...ndaData.partyA, businessType: e.target.value }
                        })}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-gray-700 mb-1.5">ผู้มีอำนาจลงนาม</Label>
                      <Input
                        value={ndaData.partyA.signatoryName}
                        onChange={(e) => setNdaData({
                          ...ndaData,
                          partyA: { ...ndaData.partyA, signatoryName: e.target.value }
                        })}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-gray-700 mb-1.5">ตำแหน่ง</Label>
                      <Input
                        value={ndaData.partyA.signatoryPosition}
                        onChange={(e) => setNdaData({
                          ...ndaData,
                          partyA: { ...ndaData.partyA, signatoryPosition: e.target.value }
                        })}
                        className="text-sm"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">ชื่อบริษัท</p>
                      <p className="text-sm text-gray-900">{ndaData.partyA.companyName}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">เลขทะเบียน</p>
                      <p className="text-sm text-gray-900">{ndaData.partyA.registrationNo}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">ที่อยู่</p>
                      <p className="text-sm text-gray-900">{ndaData.partyA.address}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">ผู้ลงนาม</p>
                      <p className="text-sm text-gray-900">
                        {ndaData.partyA.signatoryName} ({ndaData.partyA.signatoryPosition})
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Section 3: Party B */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="border-b border-gray-100 bg-gray-50/50 py-3 px-5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold text-gray-900">
                    3. ฝ่าย B (ผู้รับข้อมูล)
                  </CardTitle>
                  {editingSection !== "party-b" ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleSectionEdit("party-b")}
                      className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Edit2 className="h-3.5 w-3.5 mr-1.5" />
                      แก้ไข
                    </Button>
                  ) : (
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleSectionCancel}
                        className="h-8 text-gray-600 hover:bg-gray-100"
                      >
                        <X className="h-3.5 w-3.5 mr-1" />
                        ยกเลิก
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSectionSave}
                        className="h-8 bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Check className="h-3.5 w-3.5 mr-1" />
                        บันทึก
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                {editingSection === "party-b" ? (
                  <>
                    <div>
                      <Label className="text-xs font-medium text-gray-700 mb-1.5">ชื่อบริษัท</Label>
                      <Input
                        value={ndaData.partyB.companyName}
                        onChange={(e) => setNdaData({
                          ...ndaData,
                          partyB: { ...ndaData.partyB, companyName: e.target.value }
                        })}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-gray-700 mb-1.5">เลขทะเบียนนิติบุคคล</Label>
                      <Input
                        value={ndaData.partyB.registrationNo}
                        onChange={(e) => setNdaData({
                          ...ndaData,
                          partyB: { ...ndaData.partyB, registrationNo: e.target.value }
                        })}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-gray-700 mb-1.5">ที่อยู่</Label>
                      <Textarea
                        value={ndaData.partyB.address}
                        onChange={(e) => setNdaData({
                          ...ndaData,
                          partyB: { ...ndaData.partyB, address: e.target.value }
                        })}
                        className="text-sm"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-gray-700 mb-1.5">ประเภทธุรกิจ</Label>
                      <Input
                        value={ndaData.partyB.businessType}
                        onChange={(e) => setNdaData({
                          ...ndaData,
                          partyB: { ...ndaData.partyB, businessType: e.target.value }
                        })}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-gray-700 mb-1.5">ผู้มีอำนาจลงนาม</Label>
                      <Input
                        value={ndaData.partyB.signatoryName}
                        onChange={(e) => setNdaData({
                          ...ndaData,
                          partyB: { ...ndaData.partyB, signatoryName: e.target.value }
                        })}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-gray-700 mb-1.5">ตำแหน่ง</Label>
                      <Input
                        value={ndaData.partyB.signatoryPosition}
                        onChange={(e) => setNdaData({
                          ...ndaData,
                          partyB: { ...ndaData.partyB, signatoryPosition: e.target.value }
                        })}
                        className="text-sm"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">ชื่อบริษัท</p>
                      <p className="text-sm text-gray-900">{ndaData.partyB.companyName}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">เลขทะเบียน</p>
                      <p className="text-sm text-gray-900">{ndaData.partyB.registrationNo}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">ที่อยู่</p>
                      <p className="text-sm text-gray-900">{ndaData.partyB.address}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">ผู้ลงนาม</p>
                      <p className="text-sm text-gray-900">
                        {ndaData.partyB.signatoryName} ({ndaData.partyB.signatoryPosition})
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Section 4: Business Purpose */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="border-b border-gray-100 bg-gray-50/50 py-3 px-5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold text-gray-900">
                    4. วัตถุประสงค์และขอบเขต
                  </CardTitle>
                  {editingSection !== "purpose" ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleSectionEdit("purpose")}
                      className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Edit2 className="h-3.5 w-3.5 mr-1.5" />
                      แก้ไข
                    </Button>
                  ) : (
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleSectionCancel}
                        className="h-8 text-gray-600 hover:bg-gray-100"
                      >
                        <X className="h-3.5 w-3.5 mr-1" />
                        ยกเลิก
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSectionSave}
                        className="h-8 bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Check className="h-3.5 w-3.5 mr-1" />
                        บันทึก
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                {editingSection === "purpose" ? (
                  <>
                    <div>
                      <Label className="text-xs font-medium text-gray-700 mb-1.5">วัตถุประสงค์</Label>
                      <Textarea
                        value={ndaData.businessPurpose.description}
                        onChange={(e) => setNdaData({
                          ...ndaData,
                          businessPurpose: { ...ndaData.businessPurpose, description: e.target.value }
                        })}
                        className="text-sm"
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-gray-700 mb-1.5">ขอบเขตข้อมูลความลับ</Label>
                      <Textarea
                        value={ndaData.businessPurpose.confidentialScope}
                        onChange={(e) => setNdaData({
                          ...ndaData,
                          businessPurpose: { ...ndaData.businessPurpose, confidentialScope: e.target.value }
                        })}
                        className="text-sm"
                        rows={6}
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-gray-700 mb-1.5">ระยะเวลา (ปี)</Label>
                      <Input
                        type="number"
                        value={ndaData.businessPurpose.duration}
                        onChange={(e) => setNdaData({
                          ...ndaData,
                          businessPurpose: { ...ndaData.businessPurpose, duration: e.target.value }
                        })}
                        className="text-sm"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">วัตถุประสงค์</p>
                      <p className="text-sm text-gray-900">{ndaData.businessPurpose.description}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">ขอบเขตข้อมูลความลับ</p>
                      <p className="text-sm text-gray-900 whitespace-pre-line">
                        {ndaData.businessPurpose.confidentialScope}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">ระยะเวลา</p>
                      <p className="text-sm text-gray-900">{ndaData.businessPurpose.duration} ปี</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Section 5: Witnesses */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="border-b border-gray-100 bg-gray-50/50 py-3 px-5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold text-gray-900">
                    5. พยาน
                  </CardTitle>
                  {editingSection !== "witnesses" ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleSectionEdit("witnesses")}
                      className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Edit2 className="h-3.5 w-3.5 mr-1.5" />
                      แก้ไข
                    </Button>
                  ) : (
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleSectionCancel}
                        className="h-8 text-gray-600 hover:bg-gray-100"
                      >
                        <X className="h-3.5 w-3.5 mr-1" />
                        ยกเลิก
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSectionSave}
                        className="h-8 bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Check className="h-3.5 w-3.5 mr-1" />
                        บันทึก
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                {editingSection === "witnesses" ? (
                  <>
                    <div className="flex items-center gap-2 mb-3">
                      <Switch
                        checked={ndaData.includeWitness}
                        onCheckedChange={(checked) => setNdaData({ ...ndaData, includeWitness: checked })}
                      />
                      <Label className="text-sm font-medium">รวมพยานในสัญญา</Label>
                    </div>
                    {ndaData.includeWitness && (
                      <>
                        <div>
                          <Label className="text-xs font-medium text-gray-700 mb-1.5">พยานคนที่ 1</Label>
                          <Input
                            value={ndaData.witnesses.witnessA}
                            onChange={(e) => setNdaData({
                              ...ndaData,
                              witnesses: { ...ndaData.witnesses, witnessA: e.target.value }
                            })}
                            className="text-sm"
                          />
                        </div>
                        <div>
                          <Label className="text-xs font-medium text-gray-700 mb-1.5">ตำแหน่ง</Label>
                          <Input
                            value={ndaData.witnesses.positionA}
                            onChange={(e) => setNdaData({
                              ...ndaData,
                              witnesses: { ...ndaData.witnesses, positionA: e.target.value }
                            })}
                            className="text-sm"
                          />
                        </div>
                        <div>
                          <Label className="text-xs font-medium text-gray-700 mb-1.5">พยานคนที่ 2</Label>
                          <Input
                            value={ndaData.witnesses.witnessB}
                            onChange={(e) => setNdaData({
                              ...ndaData,
                              witnesses: { ...ndaData.witnesses, witnessB: e.target.value }
                            })}
                            className="text-sm"
                          />
                        </div>
                        <div>
                          <Label className="text-xs font-medium text-gray-700 mb-1.5">ตำแหน่ง</Label>
                          <Input
                            value={ndaData.witnesses.positionB}
                            onChange={(e) => setNdaData({
                              ...ndaData,
                              witnesses: { ...ndaData.witnesses, positionB: e.target.value }
                            })}
                            className="text-sm"
                          />
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {ndaData.includeWitness ? (
                      <>
                        <div>
                          <p className="text-xs font-medium text-gray-500 mb-1">พยานคนที่ 1</p>
                          <p className="text-sm text-gray-900">
                            {ndaData.witnesses.witnessA} ({ndaData.witnesses.positionA})
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500 mb-1">พยานคนที่ 2</p>
                          <p className="text-sm text-gray-900">
                            {ndaData.witnesses.witnessB} ({ndaData.witnesses.positionB})
                          </p>
                        </div>
                      </>
                    ) : (
                      <p className="text-sm text-gray-500">ไม่มีพยาน</p>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

          </div>

          {/* Right Column - Live Preview */}
          <div className="col-span-7">
            <div className="sticky top-24">
              <Card className="shadow-lg border-gray-200">
                <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white py-3 px-5">
                  <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    ตัวอย่างเอกสาร
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="bg-gray-100 max-h-[calc(100vh-180px)] overflow-y-auto">
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
    </div>
  );
}
