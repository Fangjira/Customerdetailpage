import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  ArrowLeft,
  Save,
  Eye,
  Building2,
  Calendar,
  FileText,
  Edit2,
  Check,
  X,
  Home,
  ChevronRight,
} from "lucide-react";
import { Checkbox } from "../ui/checkbox";

interface NDAGeneratorScreenProps {
  ndaId?: string;
  onBack: () => void;
  onSave: (data: any) => void;
  onPreview: () => void;
}

export function NDAGeneratorScreen({ ndaId, onBack, onSave, onPreview }: NDAGeneratorScreenProps) {
  // Edit mode for each section
  const [editingSections, setEditingSections] = useState<Record<string, boolean>>({
    basic: false,
    partyA: false,
    partyB: false,
    purpose: false,
    conditions: false,
    witnesses: false,
  });

  // Form data
  const [formData, setFormData] = useState({
    // Basic Info
    title: "Supply Chain Platform Development NDA",
    documentNumber: "NDA-2025-003",
    contractDate: "2025-02-19",
    effectiveDate: "2025-03-01",
    contractLocation: "กรุงเทพมหานคร",
    
    // Party A
    partyA: {
      companyName: "บริษัท วันลิงค์ โลจิสติกส์ จำกัด",
      registrationNo: "0105564123456",
      address: "เลขที่ 123 อาคารสาทรสแควร์ ชั้น 25 ถนนสาทรเหนือ แขวงสีลม เขตบางรัก กรุงเทพมหานคร 10500",
      businessType: "บริการขนส่งและโลจิสติกส์",
      signatoryName: "นายสมชาย วงศ์ใหญ่",
      signatoryPosition: "กรรมการผู้จัดการ",
    },
    
    // Party B
    partyB: {
      companyName: "บริษัท ไทยเทคโนโลยี อินโนเวชั่น จำกัด (มหาชน)",
      registrationNo: "0107556789012",
      address: "เลขที่ 999/99 อาคารจัสมิน อินเตอร์เนชั่นแนล ทาวเวอร์ ชั้น 30 ถนนพหลโยธิน แขวงจตุจักร เขตจตุจักร กรุงเทพมหานคร 10900",
      businessType: "เทคโนโลยีและนวัตกรรมดิจิทัล",
      signatoryName: "นางสาวพิมพ์ชนก สุขสวัสดิ์",
      signatoryPosition: "ประธานเจ้าหน้าที่บริหาร",
    },
    
    // Business Purpose
    businessPurpose: {
      description: "เพื่อการพัฒนาและดำเนินโครงการความร่วมมือทางธุรกิจในการพัฒนาระบบ Supply Chain Management Platform แบบครบวงจร โดยทั้งสองฝ่ายจะร่วมกันแลกเปลี่ยนข้อมูลทางเทคนิค ข้อมูลลูกค้า กลยุทธ์ทางธุรกิจ และทรัพย์สินทางปัญญาที่เกี่ยวข้องกับโครงการดังกล่าว เพื่อให้การดำเนินโครงการเป็นไปอย่างมีประสิทธิภาพและบรรลุเป้าหมายร่วมกัน",
      confidentialScope: "ข้อมูลความลับที่อยู่ภายใต้สัญญานี้ ประกอบด้วย:\n1. ข้อมูลทางเทคนิคและเทคโนโลยี รวมถึงซอร์สโค้ด สถาปัตยกรรมระบบ และกระบวนการพัฒนา\n2. ข้อมูลลูกค้าและผู้ใช้งาน รวมถึงฐานข้อมูลและรูปแบบการใช้งาน\n3. แผนธุรกิจ กลยุทธ์การตลาด และข้อมูลการเงิน\n4. ข้อตกลงทางการค้า เงื่อนไขราคา และข้อมูลซัพพลายเออร์\n5. ทรัพย์สินทางปัญญา สิทธิบัตร และลิขสิทธิ์ที่เกี่ยวข้อง\n6. เอกสารและข้อมูลอื่นใดที่ระบุว่าเป็นความลับ",
      duration: "3",
    },
    
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
  });

  // Load existing data if editing
  useEffect(() => {
    if (ndaId) {
      // TODO: Load data from API
      console.log("Loading NDA data for:", ndaId);
    }
  }, [ndaId]);

  const toggleSection = (section: string) => {
    setEditingSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSave = () => {
    console.log("Saving NDA data:", formData);
    onSave(formData);
  };

  const handleAddCondition = () => {
    setFormData(prev => ({
      ...prev,
      specialConditions: [...prev.specialConditions, ""],
    }));
  };

  const handleRemoveCondition = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specialConditions: prev.specialConditions.filter((_, i) => i !== index),
    }));
  };

  const handleConditionChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      specialConditions: prev.specialConditions.map((cond, i) => 
        i === index ? value : cond
      ),
    }));
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
            <span className="text-gray-900 font-medium">
              {ndaId ? "แก้ไขเอกสาร NDA" : "สร้างเอกสาร NDA"}
            </span>
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
                <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                  {ndaId ? "แก้ไขเอกสาร NDA" : "สร้างเอกสาร NDA"}
                </h1>
                <p className="text-sm text-gray-500">
                  {formData.title || "ยังไม่มีชื่อเอกสาร"}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={onPreview}>
                <Eye className="h-4 w-4 mr-2" />
                ตัวอย่าง
              </Button>
              <Button 
                className="bg-[#7BC9A6] hover:bg-[#6AB896] text-white" 
                size="sm"
                onClick={handleSave}
              >
                <Save className="h-4 w-4 mr-2" />
                บันทึก
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-6 py-6">
        <div className="space-y-4">
          
          {/* Basic Information Section */}
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="border-b border-gray-100 bg-gray-50/50 py-3 px-5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  ข้อมูลพื้นฐาน
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSection("basic")}
                  className="h-7 text-xs"
                >
                  {editingSections.basic ? (
                    <>
                      <Check className="h-3.5 w-3.5 mr-1.5" />
                      บันทึก
                    </>
                  ) : (
                    <>
                      <Edit2 className="h-3.5 w-3.5 mr-1.5" />
                      แก้ไข
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-5">
              {editingSections.basic ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label className="text-sm font-medium text-gray-700">ชื่อเอกสาร</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">เลขที่เอกสาร</Label>
                    <Input
                      value={formData.documentNumber}
                      onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">วันที่ทำสัญญา</Label>
                    <Input
                      type="date"
                      value={formData.contractDate}
                      onChange={(e) => setFormData({ ...formData, contractDate: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">วันที่มีผลบังคับใช้</Label>
                    <Input
                      type="date"
                      value={formData.effectiveDate}
                      onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">สถานที่ทำสัญญา</Label>
                    <Input
                      value={formData.contractLocation}
                      onChange={(e) => setFormData({ ...formData, contractLocation: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">ชื่อเอกสาร</p>
                      <p className="font-medium text-gray-900">{formData.title}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">เลขที่เอกสาร</p>
                      <p className="font-medium text-gray-900">{formData.documentNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">วันที่ทำสัญญา</p>
                      <p className="font-medium text-gray-900">{formData.contractDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">วันที่มีผลบังคับใช้</p>
                      <p className="font-medium text-gray-900">{formData.effectiveDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">สถานที่ทำสัญญา</p>
                      <p className="font-medium text-gray-900">{formData.contractLocation}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Party A Section */}
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="border-b border-gray-100 bg-gray-50/50 py-3 px-5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  ฝ่าย A (ผู้เปิดเผยข้อมูล)
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSection("partyA")}
                  className="h-7 text-xs"
                >
                  {editingSections.partyA ? (
                    <>
                      <Check className="h-3.5 w-3.5 mr-1.5" />
                      บันทึก
                    </>
                  ) : (
                    <>
                      <Edit2 className="h-3.5 w-3.5 mr-1.5" />
                      แก้ไข
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-5">
              {editingSections.partyA ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label className="text-sm font-medium text-gray-700">ชื่อบริษัท</Label>
                    <Input
                      value={formData.partyA.companyName}
                      onChange={(e) => setFormData({
                        ...formData,
                        partyA: { ...formData.partyA, companyName: e.target.value }
                      })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">เลขทะเบียนนิติบุคคล</Label>
                    <Input
                      value={formData.partyA.registrationNo}
                      onChange={(e) => setFormData({
                        ...formData,
                        partyA: { ...formData.partyA, registrationNo: e.target.value }
                      })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">ประเภทธุรกิจ</Label>
                    <Input
                      value={formData.partyA.businessType}
                      onChange={(e) => setFormData({
                        ...formData,
                        partyA: { ...formData.partyA, businessType: e.target.value }
                      })}
                      className="mt-1"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm font-medium text-gray-700">ที่อยู่</Label>
                    <Textarea
                      value={formData.partyA.address}
                      onChange={(e) => setFormData({
                        ...formData,
                        partyA: { ...formData.partyA, address: e.target.value }
                      })}
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">ชื่อผู้ลงนาม</Label>
                    <Input
                      value={formData.partyA.signatoryName}
                      onChange={(e) => setFormData({
                        ...formData,
                        partyA: { ...formData.partyA, signatoryName: e.target.value }
                      })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">ตำแหน่ง</Label>
                    <Input
                      value={formData.partyA.signatoryPosition}
                      onChange={(e) => setFormData({
                        ...formData,
                        partyA: { ...formData.partyA, signatoryPosition: e.target.value }
                      })}
                      className="mt-1"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">ชื่อบริษัท</p>
                    <p className="font-medium text-gray-900">{formData.partyA.companyName}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">เลขทะเบียนนิติบุคคล</p>
                      <p className="font-medium text-gray-900">{formData.partyA.registrationNo}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">ประเภทธุรกิจ</p>
                      <p className="font-medium text-gray-900">{formData.partyA.businessType}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">ที่อยู่</p>
                    <p className="text-gray-900">{formData.partyA.address}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">ผู้ลงนาม</p>
                      <p className="font-medium text-gray-900">{formData.partyA.signatoryName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">ตำแหน่ง</p>
                      <p className="font-medium text-gray-900">{formData.partyA.signatoryPosition}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Party B Section */}
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="border-b border-gray-100 bg-gray-50/50 py-3 px-5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  ฝ่าย B (ผู้รับข้อมูล)
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSection("partyB")}
                  className="h-7 text-xs"
                >
                  {editingSections.partyB ? (
                    <>
                      <Check className="h-3.5 w-3.5 mr-1.5" />
                      บันทึก
                    </>
                  ) : (
                    <>
                      <Edit2 className="h-3.5 w-3.5 mr-1.5" />
                      แก้ไข
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-5">
              {editingSections.partyB ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label className="text-sm font-medium text-gray-700">ชื่อบริษัท</Label>
                    <Input
                      value={formData.partyB.companyName}
                      onChange={(e) => setFormData({
                        ...formData,
                        partyB: { ...formData.partyB, companyName: e.target.value }
                      })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">เลขทะเบียนนิติบุคคล</Label>
                    <Input
                      value={formData.partyB.registrationNo}
                      onChange={(e) => setFormData({
                        ...formData,
                        partyB: { ...formData.partyB, registrationNo: e.target.value }
                      })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">ประเภทธุรกิจ</Label>
                    <Input
                      value={formData.partyB.businessType}
                      onChange={(e) => setFormData({
                        ...formData,
                        partyB: { ...formData.partyB, businessType: e.target.value }
                      })}
                      className="mt-1"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm font-medium text-gray-700">ที่อยู่</Label>
                    <Textarea
                      value={formData.partyB.address}
                      onChange={(e) => setFormData({
                        ...formData,
                        partyB: { ...formData.partyB, address: e.target.value }
                      })}
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">ชื่อผู้ลงนาม</Label>
                    <Input
                      value={formData.partyB.signatoryName}
                      onChange={(e) => setFormData({
                        ...formData,
                        partyB: { ...formData.partyB, signatoryName: e.target.value }
                      })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">ตำแหน่ง</Label>
                    <Input
                      value={formData.partyB.signatoryPosition}
                      onChange={(e) => setFormData({
                        ...formData,
                        partyB: { ...formData.partyB, signatoryPosition: e.target.value }
                      })}
                      className="mt-1"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">ชื่อบริษัท</p>
                    <p className="font-medium text-gray-900">{formData.partyB.companyName}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">เลขทะเบียนนิติบุคคล</p>
                      <p className="font-medium text-gray-900">{formData.partyB.registrationNo}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">ประเภทธุรกิจ</p>
                      <p className="font-medium text-gray-900">{formData.partyB.businessType}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">ที่อยู่</p>
                    <p className="text-gray-900">{formData.partyB.address}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">ผู้ลงนาม</p>
                      <p className="font-medium text-gray-900">{formData.partyB.signatoryName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">ตำแหน่ง</p>
                      <p className="font-medium text-gray-900">{formData.partyB.signatoryPosition}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Business Purpose Section */}
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="border-b border-gray-100 bg-gray-50/50 py-3 px-5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold text-gray-900">
                  วัตถุประสงค์และขอบเขตความลับ
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSection("purpose")}
                  className="h-7 text-xs"
                >
                  {editingSections.purpose ? (
                    <>
                      <Check className="h-3.5 w-3.5 mr-1.5" />
                      บันทึก
                    </>
                  ) : (
                    <>
                      <Edit2 className="h-3.5 w-3.5 mr-1.5" />
                      แก้ไข
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-5">
              {editingSections.purpose ? (
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">วัตถุประสงค์</Label>
                    <Textarea
                      value={formData.businessPurpose.description}
                      onChange={(e) => setFormData({
                        ...formData,
                        businessPurpose: { ...formData.businessPurpose, description: e.target.value }
                      })}
                      className="mt-1"
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">ขอบเขตข้อมูลความลับ</Label>
                    <Textarea
                      value={formData.businessPurpose.confidentialScope}
                      onChange={(e) => setFormData({
                        ...formData,
                        businessPurpose: { ...formData.businessPurpose, confidentialScope: e.target.value }
                      })}
                      className="mt-1"
                      rows={8}
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">ระยะเวลา (ปี)</Label>
                    <Input
                      type="number"
                      value={formData.businessPurpose.duration}
                      onChange={(e) => setFormData({
                        ...formData,
                        businessPurpose: { ...formData.businessPurpose, duration: e.target.value }
                      })}
                      className="mt-1"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-xs font-semibold text-gray-700 mb-2">วัตถุประสงค์</p>
                    <p className="text-gray-900 leading-relaxed">{formData.businessPurpose.description}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-700 mb-2">ขอบเขตข้อมูลความลับ</p>
                    <p className="text-gray-900 leading-relaxed whitespace-pre-line">
                      {formData.businessPurpose.confidentialScope}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">ระยะเวลา</p>
                    <p className="font-medium text-gray-900">{formData.businessPurpose.duration} ปี</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Special Conditions Section */}
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="border-b border-gray-100 bg-gray-50/50 py-3 px-5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold text-gray-900">
                  เงื่อนไขเพิ่มเติม
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSection("conditions")}
                  className="h-7 text-xs"
                >
                  {editingSections.conditions ? (
                    <>
                      <Check className="h-3.5 w-3.5 mr-1.5" />
                      บันทึก
                    </>
                  ) : (
                    <>
                      <Edit2 className="h-3.5 w-3.5 mr-1.5" />
                      แก้ไข
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-5">
              {editingSections.conditions ? (
                <div className="space-y-3">
                  {formData.specialConditions.map((condition, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="flex-1">
                        <Textarea
                          value={condition}
                          onChange={(e) => handleConditionChange(index, e.target.value)}
                          placeholder={`เงื่อนไข ${index + 1}`}
                          rows={2}
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveCondition(index)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddCondition}
                    className="w-full"
                  >
                    + เพิ่มเงื่อนไข
                  </Button>
                </div>
              ) : (
                <div className="space-y-2 text-sm">
                  <ol className="list-decimal list-inside space-y-2">
                    {formData.specialConditions.map((condition, index) => (
                      <li key={index} className="text-gray-900 leading-relaxed">{condition}</li>
                    ))}
                  </ol>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Witnesses Section */}
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="border-b border-gray-100 bg-gray-50/50 py-3 px-5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold text-gray-900">
                  พยาน
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSection("witnesses")}
                  className="h-7 text-xs"
                >
                  {editingSections.witnesses ? (
                    <>
                      <Check className="h-3.5 w-3.5 mr-1.5" />
                      บันทึก
                    </>
                  ) : (
                    <>
                      <Edit2 className="h-3.5 w-3.5 mr-1.5" />
                      แก้ไข
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-5">
              {editingSections.witnesses ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={formData.includeWitness}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, includeWitness: checked as boolean })
                      }
                    />
                    <Label className="text-sm font-medium text-gray-700">มีพยาน</Label>
                  </div>

                  {formData.includeWitness && (
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">ชื่อพยานคนที่ 1</Label>
                        <Input
                          value={formData.witnesses.witnessA}
                          onChange={(e) => setFormData({
                            ...formData,
                            witnesses: { ...formData.witnesses, witnessA: e.target.value }
                          })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">ตำแหน่ง</Label>
                        <Input
                          value={formData.witnesses.positionA}
                          onChange={(e) => setFormData({
                            ...formData,
                            witnesses: { ...formData.witnesses, positionA: e.target.value }
                          })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">ชื่อพยานคนที่ 2</Label>
                        <Input
                          value={formData.witnesses.witnessB}
                          onChange={(e) => setFormData({
                            ...formData,
                            witnesses: { ...formData.witnesses, witnessB: e.target.value }
                          })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">ตำแหน่ง</Label>
                        <Input
                          value={formData.witnesses.positionB}
                          onChange={(e) => setFormData({
                            ...formData,
                            witnesses: { ...formData.witnesses, positionB: e.target.value }
                          })}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3 text-sm">
                  {formData.includeWitness ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">พยานคนที่ 1</p>
                        <p className="font-medium text-gray-900">{formData.witnesses.witnessA}</p>
                        {formData.witnesses.positionA && (
                          <p className="text-xs text-gray-600 mt-0.5">{formData.witnesses.positionA}</p>
                        )}
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">พยานคนที่ 2</p>
                        <p className="font-medium text-gray-900">{formData.witnesses.witnessB}</p>
                        {formData.witnesses.positionB && (
                          <p className="text-xs text-gray-600 mt-0.5">{formData.witnesses.positionB}</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">ไม่มีพยาน</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
