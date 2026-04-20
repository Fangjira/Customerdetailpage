import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  Download,
  Plus,
  Trash2,
  Save,
  Lock,
  Edit3,
  Send,
  Printer,
} from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface NDAEditorScreenV2Props {
  ndaId?: string;
  onNavigate: (path: string, id?: string) => void;
}

export function NDAEditorScreenV2({
  ndaId,
  onNavigate,
}: NDAEditorScreenV2Props) {
  const { t } = useTranslation();

  // 🎯 Edit Mode Toggle
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // 🔷 Initial NDA Data
  const initialData = {
    id: ndaId || "NDA-2025-003",
    documentNumber: "NDA-2025-003",
    documentTitleTH: "สัญญาข้อตกลงการเก็บรักษาความลับ",
    documentTitleEN: "MUTUAL NON-DISCLOSURE AGREEMENT",

    // Contract Info
    contractDate: "2025-02-19",
    effectiveDate: "2025-03-01",
    endDate: "2028-03-01",
    contractLocation: "กรุงเทพมหานคร",
    duration: "3",

    // Party A (ผู้เปิดเผยข้อมูล)
    partyA_companyName: "บริษัท วันลิงค์ โลจิสติกส์ จำกัด",
    partyA_registrationNo: "0105564123456",
    partyA_address:
      "เลขที่ 123 อาคารสาทรสแควร์ ชั้น 25 ถนนสาทรเหนือ แขวงสีลม เขตบางรัก กรุงเทพมหานคร 10500",
    partyA_businessType: "บริการขนส่งและโลจิสติกส์",
    partyA_signatoryName: "นายสมชาย วงศ์ใหญ่",
    partyA_signatoryPosition: "กรรมการผู้จัดการ",

    // Party B (ผู้รับข้อมูล)
    partyB_companyName: "บริษัท ไทยเทคโนโลยี อินโนเวชั่น จำกัด (มหาชน)",
    partyB_registrationNo: "0107556789012",
    partyB_address:
      "เลขที่ 999/99 อาคารจัสมิน อินเตอร์เนชั่นแนล ทาวเวอร์ ชั้น 30 ถนนพหลโยธิน แขวงจตุจักร เขตจตุจักร กรุงเทพมหานคร 10900",
    partyB_businessType: "เทคโนโลยีและนวัตกรรมดิจิทัล",
    partyB_signatoryName: "นางสาวพิมพ์ชนก สุขสวัสดิ์",
    partyB_signatoryPosition: "ประธานเจ้าหน้าที่บริหาร",

    // Business Purpose
    businessPurposeDescription:
      "เพื่อการพัฒนาและดำเนินโครงการความร่วมมือทางธุรกิจในการพัฒนาระบบ Supply Chain Management Platform แบบครบวงจร โดยทั้งสองฝ่ายจะร่วมกันแลกเปลี่ยนข้อมูลทางเทคนิค ข้อมูลลูกค้า กลยุทธ์ทางธุรกิจ และทรัพย์สินทางปัญญาที่เกี่ยวข้องกับโครงการดังกล่าว เพื่อให้การดำเนินโครงการเป็นไปอย่างมีประสิทธิภาพและบรรลุเป้าหมายร่วมกัน",

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
    witnessA_name: "นายวิชัย ประสิทธิ์สกุล",
    witnessA_position: "ที่ปรึกษากฎหมาย",
    witnessB_name: "นางสาวอรพิน เจริญสุข",
    witnessB_position: "ผู้จัดการฝ่ายกฎหมาย",

    // Company Address Footer
    companyAddress:
      "บริษัท วันลิงค์ โลจิสติกส์ จำกัด | 123 อาคารสาทรสแควร์ ชั้น 25 ถนนสาทรเหนือ แขวงสีลม เขตบางรัก กรุงเทพมหานคร 10500 | โทร. 02-123-4567 | อีเมล: contact@onelink-logistics.com",
  };

  const [nda, setNda] = useState(initialData);

  // 🎯 Update functions
  const updateField = (field: string, value: any) => {
    setNda({
      ...nda,
      [field]: value,
    });
    setHasUnsavedChanges(true);
  };

  const updateArrayItem = (arrayName: string, index: number, value: string) => {
    const newArray = [...(nda as any)[arrayName]];
    newArray[index] = value;
    setNda({
      ...nda,
      [arrayName]: newArray,
    });
    setHasUnsavedChanges(true);
  };

  const addArrayItem = (arrayName: string) => {
    const newArray = [...(nda as any)[arrayName], ""];
    setNda({
      ...nda,
      [arrayName]: newArray,
    });
    setHasUnsavedChanges(true);
  };

  const removeArrayItem = (arrayName: string, index: number) => {
    const currentArray = (nda as any)[arrayName];
    if (currentArray.length <= 1) {
      toast.error("ต้องมีอย่างน้อย 1 รายการ");
      return;
    }
    const newArray = currentArray.filter((_: any, i: number) => i !== index);
    setNda({
      ...nda,
      [arrayName]: newArray,
    });
    setHasUnsavedChanges(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleBack = () => {
    onNavigate("/nda-preview");
  };

  const handleGenerateWord = () => {
    console.log("Generating Word document with data:", nda);
    toast.success("กำลังสร้างเอกสาร Word...");

    setTimeout(() => {
      toast.success("สร้างเอกสารเรียบร้อย! กำลังดาวน์โหลด...");
    }, 2000);
  };

  const handleSave = () => {
    console.log("Saving NDA:", nda);
    toast.success("บันทึกข้อมูลเรียบร้อย");
    setHasUnsavedChanges(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSend = () => {
    toast.success("ส่งอีเมลให้ลูกค้าเรียบร้อย");
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
                disabled={isEditMode}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-sm font-semibold text-gray-900">
                  {isEditMode ? "แก้ไขเอกสาร NDA" : "ดูตัวอย่างสัญญา NDA"}
                </h1>
                <p className="text-xs text-gray-500">{nda.documentNumber}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isEditMode ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditMode(false)}
                    className="h-9 px-3 text-xs"
                  >
                    <Lock className="h-3.5 w-3.5 mr-1.5" />
                    ยกเลิก
                  </Button>
                  {hasUnsavedChanges && (
                    <Button
                      size="sm"
                      onClick={handleSave}
                      className="h-9 px-3 text-xs bg-orange-600 hover:bg-orange-700"
                    >
                      <Save className="h-3.5 w-3.5 mr-1.5" />
                      บันทึก
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditMode(true)}
                    className="h-9 px-3 text-xs"
                  >
                    <Edit3 className="h-3.5 w-3.5 mr-1.5" />
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
                    onClick={handleGenerateWord}
                    className="h-9 px-3 text-xs"
                  >
                    <Download className="h-3.5 w-3.5 mr-1.5" />
                    ดาวน์โหลด Word
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSend}
                    className="h-9 px-3 text-xs bg-orange-600 hover:bg-orange-700"
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
      <div className="max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-8 print:p-0">
        {/* ============================================
            PAGE 1: COVER PAGE - No Border
            ============================================ */}
        <div
          className={`bg-white mb-8 print:mb-0 print:page-break-after-always ${
            isEditMode ? "ring-2 ring-orange-600 rounded-lg print:ring-0" : ""
          }`}
        >
          <div className="p-8 sm:p-12 min-h-[297mm] flex flex-col">
            {/* Logo - Centered at Top */}
            <div className="flex justify-center mb-12 mt-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className="text-5xl font-bold text-blue-600">
                    mini CRM
                  </span>
                </div>
                <p className="text-xs text-blue-600 tracking-wider">
                  LOGISTICS
                </p>
              </div>
            </div>

            {/* Document Title - Centered */}
            <div className="text-center mb-8">
              {isEditMode ? (
                <>
                  <input
                    type="text"
                    value={nda.documentTitleTH}
                    onChange={(e) =>
                      updateField("documentTitleTH", e.target.value)
                    }
                    className="w-full mb-2 px-3 py-2 text-xl font-bold text-gray-900 text-center border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                    placeholder="ชื่อเอกสาร (TH)"
                  />
                  <input
                    type="text"
                    value={nda.documentTitleEN}
                    onChange={(e) =>
                      updateField("documentTitleEN", e.target.value)
                    }
                    className="w-full px-3 py-2 text-base font-bold text-gray-900 text-center border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                    placeholder="Document Title (EN)"
                  />
                </>
              ) : (
                <>
                  <h1 className="text-xl font-bold text-gray-900 mb-2">
                    {nda.documentTitleTH}
                  </h1>
                  <p className="text-base font-bold text-gray-900">
                    {nda.documentTitleEN}
                  </p>
                </>
              )}
            </div>

            {/* Document Number */}
            <div className="text-center text-sm text-gray-900 mb-16">
              {isEditMode ? (
                <div>
                  <span className="font-medium">เลขที่เอกสาร / Document No. : </span>
                  <input
                    type="text"
                    value={nda.documentNumber}
                    onChange={(e) =>
                      updateField("documentNumber", e.target.value)
                    }
                    className="px-2 py-1 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                    placeholder="เลขที่เอกสาร"
                  />
                </div>
              ) : (
                <p>
                  <span className="font-medium">เลขที่เอกสาร / Document No. : </span>
                  {nda.documentNumber}
                </p>
              )}
            </div>

            {/* Contract Details Box - With Border */}
            <div className="max-w-2xl mx-auto w-full mb-16">
              <div className="border-4 border-gray-900 p-8 text-left min-h-[200px]">
                <div className="space-y-3">
                  {/* Contract Date */}
                  <div className="flex items-start">
                    <span className="font-medium min-w-[180px]">
                      วันที่ทำสัญญา / Contract Date :
                    </span>
                    {isEditMode ? (
                      <input
                        type="date"
                        value={nda.contractDate}
                        onChange={(e) =>
                          updateField("contractDate", e.target.value)
                        }
                        className="flex-1 px-2 py-1 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                      />
                    ) : (
                      <span className="text-red-600 font-bold">
                        {formatDate(nda.contractDate)}
                      </span>
                    )}
                  </div>

                  {/* Location */}
                  <div className="flex items-start">
                    <span className="font-medium min-w-[180px]">
                      สถานที่ / Location :
                    </span>
                    {isEditMode ? (
                      <input
                        type="text"
                        value={nda.contractLocation}
                        onChange={(e) =>
                          updateField("contractLocation", e.target.value)
                        }
                        className="flex-1 px-2 py-1 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                        placeholder="สถานที่ทำสัญญา"
                      />
                    ) : (
                      <span className="text-red-600 font-bold">
                        {nda.contractLocation}
                      </span>
                    )}
                  </div>

                  {/* Effective Date */}
                  <div className="flex items-start">
                    <span className="font-medium min-w-[180px]">
                      วันที่มีผลบังคับใช้ :
                    </span>
                    {isEditMode ? (
                      <input
                        type="date"
                        value={nda.effectiveDate}
                        onChange={(e) =>
                          updateField("effectiveDate", e.target.value)
                        }
                        className="flex-1 px-2 py-1 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                      />
                    ) : (
                      <span className="text-red-600 font-bold">
                        {formatDate(nda.effectiveDate)}
                      </span>
                    )}
                  </div>

                  {/* Duration */}
                  <div className="flex items-start">
                    <span className="font-medium min-w-[180px]">
                      ระยะเวลา / Duration :
                    </span>
                    {isEditMode ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={nda.duration}
                          onChange={(e) =>
                            updateField("duration", e.target.value)
                          }
                          className="w-20 px-2 py-1 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                        />
                        <span>ปี</span>
                      </div>
                    ) : (
                      <span className="text-red-600 font-bold">
                        {nda.duration} ปี
                      </span>
                    )}
                  </div>

                  {/* End Date */}
                  <div className="flex items-start">
                    <span className="font-medium min-w-[180px]">
                      วันที่สิ้นสุด / End Date :
                    </span>
                    {isEditMode ? (
                      <input
                        type="date"
                        value={nda.endDate}
                        onChange={(e) => updateField("endDate", e.target.value)}
                        className="flex-1 px-2 py-1 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                      />
                    ) : (
                      <span className="text-red-600 font-bold">
                        {formatDate(nda.endDate)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer - Company Address */}
            <div className="mt-auto pt-8 border-t border-gray-300">
              <p className="text-[9px] text-gray-600 leading-relaxed text-center">
                {isEditMode ? (
                  <textarea
                    value={nda.companyAddress}
                    onChange={(e) =>
                      updateField("companyAddress", e.target.value)
                    }
                    rows={2}
                    className="w-full px-2 py-1 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600 text-center"
                    placeholder="ที่อยู่บริษัท"
                  />
                ) : (
                  nda.companyAddress
                )}
              </p>
            </div>
          </div>
        </div>

        {/* ============================================
            PAGE 2: CONTENT PAGE
            ============================================ */}
        <div
          className={`bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none print:rounded-none ${
            isEditMode ? "ring-2 ring-orange-600" : ""
          }`}
        >
          <div className="p-8 sm:p-12">
            {/* Document Header */}
            <div className="text-center mb-8 pb-6 border-b-2 border-gray-900">
              {isEditMode ? (
                <>
                  <input
                    type="text"
                    value={nda.documentTitleTH}
                    onChange={(e) =>
                      updateField("documentTitleTH", e.target.value)
                    }
                    className="w-full mb-2 px-3 py-2 text-xl font-bold text-gray-900 text-center border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                    placeholder="ชื่อเอกสาร (TH)"
                  />
                  <input
                    type="text"
                    value={nda.documentTitleEN}
                    onChange={(e) =>
                      updateField("documentTitleEN", e.target.value)
                    }
                    className="w-full mb-2 px-3 py-2 text-base font-semibold text-gray-800 text-center border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                    placeholder="Document Title (EN)"
                  />
                  <input
                    type="text"
                    value={nda.documentNumber}
                    onChange={(e) =>
                      updateField("documentNumber", e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm text-gray-700 text-center border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                    placeholder="เลขที่เอกสาร"
                  />
                </>
              ) : (
                <>
                  <h1 className="text-xl font-bold text-gray-900 mb-2">
                    {nda.documentTitleTH}
                  </h1>
                  <h2 className="text-base font-semibold text-gray-800 mb-2">
                    {nda.documentTitleEN}
                  </h2>
                  <p className="text-sm text-gray-700">
                    เลขที่เอกสาร: {nda.documentNumber}
                  </p>
                </>
              )}
            </div>

            {/* Contract Details */}
            <div className="mb-8 text-sm leading-relaxed text-gray-800">
              <div className="flex items-baseline gap-2 mb-2">
                <span>สัญญาฉบับนี้ทำขึ้น ณ</span>
                {isEditMode ? (
                  <input
                    type="text"
                    value={nda.contractLocation}
                    onChange={(e) =>
                      updateField("contractLocation", e.target.value)
                    }
                    className="flex-1 px-2 py-1 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                  />
                ) : (
                  <span className="font-semibold underline decoration-dotted">
                    {nda.contractLocation}
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-2">
                <span>เมื่อวันที่</span>
                {isEditMode ? (
                  <input
                    type="date"
                    value={nda.contractDate}
                    onChange={(e) =>
                      updateField("contractDate", e.target.value)
                    }
                    className="px-2 py-1 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                  />
                ) : (
                  <span className="font-semibold underline decoration-dotted">
                    {formatDate(nda.contractDate)}
                  </span>
                )}
              </div>
            </div>

            {/* Party A */}
            <div className="mb-8 text-sm leading-relaxed text-gray-800">
              <p className="font-bold mb-3 text-base">
                ฝ่าย A (ผู้เปิดเผยข้อมูล):
              </p>
              <div className="space-y-2 pl-4">
                <div className="flex items-start gap-2">
                  <span className="min-w-[180px]">ชื่อบริษัท:</span>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={nda.partyA_companyName}
                      onChange={(e) =>
                        updateField("partyA_companyName", e.target.value)
                      }
                      className="flex-1 px-2 py-1 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                    />
                  ) : (
                    <span className="font-semibold underline decoration-dotted">
                      {nda.partyA_companyName}
                    </span>
                  )}
                </div>
                <div className="flex items-start gap-2">
                  <span className="min-w-[180px]">เลขทะเบียนนิติบุคคล:</span>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={nda.partyA_registrationNo}
                      onChange={(e) =>
                        updateField("partyA_registrationNo", e.target.value)
                      }
                      className="flex-1 px-2 py-1 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                    />
                  ) : (
                    <span className="font-semibold">
                      {nda.partyA_registrationNo}
                    </span>
                  )}
                </div>
                <div className="flex items-start gap-2">
                  <span className="min-w-[180px]">ประเภทธุรกิจ:</span>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={nda.partyA_businessType}
                      onChange={(e) =>
                        updateField("partyA_businessType", e.target.value)
                      }
                      className="flex-1 px-2 py-1 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                    />
                  ) : (
                    <span className="font-semibold">
                      {nda.partyA_businessType}
                    </span>
                  )}
                </div>
                <div className="flex items-start gap-2">
                  <span className="min-w-[180px]">ที่อยู่:</span>
                  {isEditMode ? (
                    <textarea
                      value={nda.partyA_address}
                      onChange={(e) =>
                        updateField("partyA_address", e.target.value)
                      }
                      rows={2}
                      className="flex-1 px-2 py-1 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                    />
                  ) : (
                    <span className="font-semibold">{nda.partyA_address}</span>
                  )}
                </div>
                <div className="flex items-start gap-2">
                  <span className="min-w-[180px]">ผู้มีอำนาจลงนาม:</span>
                  {isEditMode ? (
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="text"
                        value={nda.partyA_signatoryName}
                        onChange={(e) =>
                          updateField("partyA_signatoryName", e.target.value)
                        }
                        className="flex-1 px-2 py-1 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                        placeholder="ชื่อผู้ลงนาม"
                      />
                      <span>ตำแหน่ง</span>
                      <input
                        type="text"
                        value={nda.partyA_signatoryPosition}
                        onChange={(e) =>
                          updateField("partyA_signatoryPosition", e.target.value)
                        }
                        className="flex-1 px-2 py-1 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                        placeholder="ตำแหน่ง"
                      />
                    </div>
                  ) : (
                    <span className="font-semibold">
                      {nda.partyA_signatoryName} ตำแหน่ง{" "}
                      {nda.partyA_signatoryPosition}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Party B */}
            <div className="mb-8 text-sm leading-relaxed text-gray-800">
              <p className="font-bold mb-3 text-base">
                ฝ่าย B (ผู้รับข้อมูล):
              </p>
              <div className="space-y-2 pl-4">
                <div className="flex items-start gap-2">
                  <span className="min-w-[180px]">��ื่อบริษัท:</span>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={nda.partyB_companyName}
                      onChange={(e) =>
                        updateField("partyB_companyName", e.target.value)
                      }
                      className="flex-1 px-2 py-1 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                    />
                  ) : (
                    <span className="font-semibold underline decoration-dotted">
                      {nda.partyB_companyName}
                    </span>
                  )}
                </div>
                <div className="flex items-start gap-2">
                  <span className="min-w-[180px]">เลขทะเบียนนิติบุคคล:</span>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={nda.partyB_registrationNo}
                      onChange={(e) =>
                        updateField("partyB_registrationNo", e.target.value)
                      }
                      className="flex-1 px-2 py-1 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                    />
                  ) : (
                    <span className="font-semibold">
                      {nda.partyB_registrationNo}
                    </span>
                  )}
                </div>
                <div className="flex items-start gap-2">
                  <span className="min-w-[180px]">ประเภทธุรกิจ:</span>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={nda.partyB_businessType}
                      onChange={(e) =>
                        updateField("partyB_businessType", e.target.value)
                      }
                      className="flex-1 px-2 py-1 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                    />
                  ) : (
                    <span className="font-semibold">
                      {nda.partyB_businessType}
                    </span>
                  )}
                </div>
                <div className="flex items-start gap-2">
                  <span className="min-w-[180px]">ที่อยู่:</span>
                  {isEditMode ? (
                    <textarea
                      value={nda.partyB_address}
                      onChange={(e) =>
                        updateField("partyB_address", e.target.value)
                      }
                      rows={2}
                      className="flex-1 px-2 py-1 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                    />
                  ) : (
                    <span className="font-semibold">{nda.partyB_address}</span>
                  )}
                </div>
                <div className="flex items-start gap-2">
                  <span className="min-w-[180px]">ผู้มีอำนาจลงนาม:</span>
                  {isEditMode ? (
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="text"
                        value={nda.partyB_signatoryName}
                        onChange={(e) =>
                          updateField("partyB_signatoryName", e.target.value)
                        }
                        className="flex-1 px-2 py-1 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                        placeholder="ชื่อผู้ลงนาม"
                      />
                      <span>ตำแหน่ง</span>
                      <input
                        type="text"
                        value={nda.partyB_signatoryPosition}
                        onChange={(e) =>
                          updateField("partyB_signatoryPosition", e.target.value)
                        }
                        className="flex-1 px-2 py-1 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                        placeholder="ตำแหน่ง"
                      />
                    </div>
                  ) : (
                    <span className="font-semibold">
                      {nda.partyB_signatoryName} ตำแหน่ง{" "}
                      {nda.partyB_signatoryPosition}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Business Purpose */}
            <div className="mb-8 text-sm leading-relaxed text-gray-800">
              <p className="font-bold mb-3 text-base">วัตถุประสงค์:</p>
              {isEditMode ? (
                <textarea
                  value={nda.businessPurposeDescription}
                  onChange={(e) =>
                    updateField("businessPurposeDescription", e.target.value)
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                />
              ) : (
                <p className="pl-4">{nda.businessPurposeDescription}</p>
              )}
            </div>

            {/* Confidential Scope */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <p className="font-bold text-base text-gray-900">
                  ขอบเขตข้อมูลความลับ:
                </p>
                {isEditMode && (
                  <Button
                    size="sm"
                    onClick={() => addArrayItem("confidentialScope")}
                    variant="outline"
                    className="h-7 px-2 text-xs border-orange-600 text-orange-600 hover:bg-orange-50"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    เพิ่มรายการ
                  </Button>
                )}
              </div>
              <div className="pl-4">
                {nda.confidentialScope.map((item, index) => (
                  <div
                    key={index}
                    className="text-sm text-gray-800 mb-2 flex items-start gap-2"
                  >
                    <span className="text-gray-500">{index + 1}.</span>
                    {isEditMode ? (
                      <>
                        <input
                          type="text"
                          value={item}
                          onChange={(e) =>
                            updateArrayItem(
                              "confidentialScope",
                              index,
                              e.target.value
                            )
                          }
                          className="flex-1 px-2 py-1 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                          placeholder={`ข้อมูล ${index + 1}`}
                        />
                        {nda.confidentialScope.length > 1 && (
                          <button
                            onClick={() =>
                              removeArrayItem("confidentialScope", index)
                            }
                            className="text-red-600 hover:bg-red-50 p-1 rounded"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        )}
                      </>
                    ) : (
                      <span>{item}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div className="mb-8 text-sm leading-relaxed text-gray-800">
              <div className="flex items-baseline gap-2 mb-2">
                <span>ระยะเวลาการเก็บรักษาความลับ:</span>
                {isEditMode ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={nda.duration}
                      onChange={(e) => updateField("duration", e.target.value)}
                      className="w-20 px-2 py-1 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                    />
                    <span>ปี</span>
                  </div>
                ) : (
                  <span className="font-semibold">{nda.duration} ปี</span>
                )}
              </div>
              <div className="flex items-baseline gap-2">
                <span>มีผลบังคับใช้ตั้งแต่วันที่:</span>
                {isEditMode ? (
                  <input
                    type="date"
                    value={nda.effectiveDate}
                    onChange={(e) =>
                      updateField("effectiveDate", e.target.value)
                    }
                    className="px-2 py-1 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                  />
                ) : (
                  <span className="font-semibold underline decoration-dotted">
                    {formatDate(nda.effectiveDate)}
                  </span>
                )}
              </div>
            </div>

            {/* Special Conditions */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <p className="font-bold text-base text-gray-900">
                  เงื่อนไขเพิ่มเติม:
                </p>
                {isEditMode && (
                  <Button
                    size="sm"
                    onClick={() => addArrayItem("specialConditions")}
                    variant="outline"
                    className="h-7 px-2 text-xs border-orange-600 text-orange-600 hover:bg-orange-50"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    เพิ่มเงื่อนไข
                  </Button>
                )}
              </div>
              <div className="pl-4">
                {nda.specialConditions.map((item, index) => (
                  <div
                    key={index}
                    className="text-sm text-gray-800 mb-2 flex items-start gap-2"
                  >
                    <span className="text-gray-500">{index + 1}.</span>
                    {isEditMode ? (
                      <>
                        <textarea
                          value={item}
                          onChange={(e) =>
                            updateArrayItem(
                              "specialConditions",
                              index,
                              e.target.value
                            )
                          }
                          rows={2}
                          className="flex-1 px-2 py-1 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                          placeholder={`เงื่อนไข ${index + 1}`}
                        />
                        {nda.specialConditions.length > 1 && (
                          <button
                            onClick={() =>
                              removeArrayItem("specialConditions", index)
                            }
                            className="text-red-600 hover:bg-red-50 p-1 rounded"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        )}
                      </>
                    ) : (
                      <span>{item}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Signature Section */}
            <div className="mt-12 pt-8 border-t-2 border-gray-300">
              <div className="grid grid-cols-2 gap-16 mb-8">
                <div className="text-center">
                  <div className="border-b-2 border-gray-400 mb-3 pb-16"></div>
                  <p className="text-sm font-semibold text-gray-900">
                    ลงนาม ฝ่าย A
                  </p>
                  <p className="text-xs text-gray-600 mt-2">
                    ({nda.partyA_signatoryName})
                  </p>
                  <p className="text-xs text-gray-500">
                    {nda.partyA_signatoryPosition}
                  </p>
                </div>
                <div className="text-center">
                  <div className="border-b-2 border-gray-400 mb-3 pb-16"></div>
                  <p className="text-sm font-semibold text-gray-900">
                    ลงนาม ฝ่าย B
                  </p>
                  <p className="text-xs text-gray-600 mt-2">
                    ({nda.partyB_signatoryName})
                  </p>
                  <p className="text-xs text-gray-500">
                    {nda.partyB_signatoryPosition}
                  </p>
                </div>
              </div>

              {/* Witnesses */}
              {nda.includeWitness && (
                <div className="grid grid-cols-2 gap-16 mt-8 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <div className="border-b-2 border-gray-400 mb-3 pb-12"></div>
                    <p className="text-sm font-semibold text-gray-900">พยาน</p>
                    {isEditMode ? (
                      <div className="space-y-1 mt-2">
                        <input
                          type="text"
                          value={nda.witnessA_name}
                          onChange={(e) =>
                            updateField("witnessA_name", e.target.value)
                          }
                          className="w-full px-2 py-1 text-xs border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                          placeholder="ชื่อพยาน"
                        />
                        <input
                          type="text"
                          value={nda.witnessA_position}
                          onChange={(e) =>
                            updateField("witnessA_position", e.target.value)
                          }
                          className="w-full px-2 py-1 text-xs border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                          placeholder="ตำแหน่ง"
                        />
                      </div>
                    ) : (
                      <>
                        <p className="text-xs text-gray-600 mt-2">
                          ({nda.witnessA_name})
                        </p>
                        <p className="text-xs text-gray-500">
                          {nda.witnessA_position}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="text-center">
                    <div className="border-b-2 border-gray-400 mb-3 pb-12"></div>
                    <p className="text-sm font-semibold text-gray-900">พยาน</p>
                    {isEditMode ? (
                      <div className="space-y-1 mt-2">
                        <input
                          type="text"
                          value={nda.witnessB_name}
                          onChange={(e) =>
                            updateField("witnessB_name", e.target.value)
                          }
                          className="w-full px-2 py-1 text-xs border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                          placeholder="ชื่อพยาน"
                        />
                        <input
                          type="text"
                          value={nda.witnessB_position}
                          onChange={(e) =>
                            updateField("witnessB_position", e.target.value)
                          }
                          className="w-full px-2 py-1 text-xs border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                          placeholder="ตำแหน่ง"
                        />
                      </div>
                    ) : (
                      <>
                        <p className="text-xs text-gray-600 mt-2">
                          ({nda.witnessB_name})
                        </p>
                        <p className="text-xs text-gray-500">
                          {nda.witnessB_position}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}