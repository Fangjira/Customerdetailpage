import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Download, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { SharedFlowRenderer } from "./flows/shared-flow-renderer";

export function ProcessFlowDiagram() {
  const [zoom, setZoom] = useState(0.85);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.5));
  const handleResetZoom = () => setZoom(0.85);

  const exportToDrawIO = () => {
    const drawioXML = `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net">
  <diagram name="Contract Management Flow" id="contract-flow">
    <mxGraphModel dx="2400" dy="1000" grid="1" gridSize="10" guides="1">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        
        <!-- User Swimlane -->
        <mxCell id="swimlane-user" value="ผู้ใช้งาน (User)" style="swimlane;horizontal=1;startSize=40;fillColor=#E8F5E9;strokeColor=#4CAF50;" parent="1" vertex="1">
          <mxGeometry x="40" y="40" width="2800" height="350" as="geometry" />
        </mxCell>
        
        <!-- System Swimlane -->
        <mxCell id="swimlane-system" value="ระบบจัดการสัญญา (Contract Management System)" style="swimlane;horizontal=1;startSize=40;fillColor=#E3F2FD;strokeColor=#2196F3;" parent="1" vertex="1">
          <mxGeometry x="40" y="390" width="2800" height="400" as="geometry" />
        </mxCell>
        
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

    const blob = new Blob([drawioXML], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contract-management-flow.drawio";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const flowData = {
    title: "ระบบจัดการสัญญา (Contract Management System)",
    titleEn: "Contract Management System",
    description: "กระบวนการสร้าง อนุมัติ และจัดการสัญญาตั้งแต่ต้นจนจบ",
    icon: "📄",
    userSteps: [
      { id: "u1", label: "START", type: "start" as const, swimlane: "user" as const },
      { id: "u2", label: "Login", type: "process" as const, swimlane: "user" as const, connectTo: "s1" },
      { id: "u3", label: "เข้าสู่หน้า\nสัญญา", type: "process" as const, swimlane: "user" as const, connectTo: "s3" },
      { id: "u4", label: "ดูรายการ\nสัญญา", type: "process" as const, swimlane: "user" as const, connectTo: "s5" },
      { id: "u5", label: "สร้างสัญญา\nใหม่?", type: "decision" as const, swimlane: "user" as const },
      { id: "u6", label: "คลิกสร้าง\nสัญญา", type: "process" as const, swimlane: "user" as const, connectTo: "s7" },
      { id: "u7", label: "เลือกประเภท\nสัญญา", type: "process" as const, swimlane: "user" as const, connectTo: "s8" },
      { id: "u8", label: "เลือกลูกค้า", type: "process" as const, swimlane: "user" as const, connectTo: "s9" },
      { id: "u9", label: "กรอกข้อมูล\nพื้นฐาน", type: "process" as const, swimlane: "user" as const, connectTo: "s11" },
      { id: "u10", label: "กำหนดมูลค่า\nสัญญา", type: "process" as const, swimlane: "user" as const, connectTo: "s12" },
      { id: "u11", label: "กำหนด\nวันที่เริ่มต้น", type: "process" as const, swimlane: "user" as const, connectTo: "s13" },
      { id: "u12", label: "กำหนด\nระยะเวลา", type: "process" as const, swimlane: "user" as const, connectTo: "s14" },
      { id: "u13", label: "เพิ่มเงื่อนไข\nพิเศษ?", type: "decision" as const, swimlane: "user" as const },
      { id: "u14", label: "กรอกเงื่อนไข\nเพิ่มเติม", type: "process" as const, swimlane: "user" as const, connectTo: "s16" },
      { id: "u15", label: "แนบเอกสาร\nประกอบ?", type: "decision" as const, swimlane: "user" as const },
      { id: "u16", label: "เลือกไฟล์\nเอกสาร", type: "process" as const, swimlane: "user" as const, connectTo: "s18" },
      { id: "u17", label: "อัปโหลด\nไฟล์", type: "process" as const, swimlane: "user" as const, connectTo: "s19" },
      { id: "u18", label: "ตรวจสอบ\nข้อมูล", type: "process" as const, swimlane: "user" as const, connectTo: "s22" },
      { id: "u19", label: "ข้อมูล\nถูกต้อง?", type: "decision" as const, swimlane: "user" as const },
      { id: "u20", label: "บันทึก\nฉบับร่าง", type: "process" as const, swimlane: "user" as const, connectTo: "s24" },
      { id: "u21", label: "เลือก\nผู้อนุมัติ", type: "process" as const, swimlane: "user" as const, connectTo: "s26" },
      { id: "u22", label: "กำหนด\nลำดับอนุมัติ", type: "process" as const, swimlane: "user" as const, connectTo: "s27" },
      { id: "u23", label: "ส่งขอ\nอนุมัติ", type: "process" as const, swimlane: "user" as const, connectTo: "s28" },
      { id: "u24", label: "รอการ\nอนุมัติ", type: "process" as const, swimlane: "user" as const },
      { id: "u25", label: "ผู้อนุมัติ\nLevel 1\nพิจารณา", type: "process" as const, swimlane: "user" as const, connectTo: "s31" },
      { id: "u26", label: "อนุมัติ\nLevel 1?", type: "decision" as const, swimlane: "user" as const },
      { id: "u27", label: "ผู้อนุมัติ\nLevel 2\nพิจารณา", type: "process" as const, swimlane: "user" as const, connectTo: "s34" },
      { id: "u28", label: "อนุมัติ\nLevel 2?", type: "decision" as const, swimlane: "user" as const },
      { id: "u29", label: "ผู้อนุมัติ\nFinal\nพิจารณา", type: "process" as const, swimlane: "user" as const, connectTo: "s37" },
      { id: "u30", label: "อนุมัติ\nสุดท้าย?", type: "decision" as const, swimlane: "user" as const },
      { id: "u31", label: "รับแจ้งเตือน\nผลอนุมัติ", type: "process" as const, swimlane: "user" as const, connectTo: "s40" },
      { id: "u32", label: "สร้างเอกสาร\nสัญญา PDF", type: "process" as const, swimlane: "user" as const, connectTo: "s42" },
      { id: "u33", label: "ตรวจสอบ\nเอกสาร", type: "process" as const, swimlane: "user" as const },
      { id: "u34", label: "ส่งให้ลูกค้า\nเซ็นสัญญา", type: "process" as const, swimlane: "user" as const, connectTo: "s44" },
      { id: "u35", label: "ลูกค้า\nเซ็นสัญญา?", type: "decision" as const, swimlane: "user" as const },
      { id: "u36", label: "อัปโหลด\nสัญญาที่เซ็น", type: "process" as const, swimlane: "user" as const, connectTo: "s46" },
      { id: "u37", label: "ทำ E-Signature?", type: "decision" as const, swimlane: "user" as const },
      { id: "u38", label: "ส่งลิงค์\nE-Sign", type: "process" as const, swimlane: "user" as const, connectTo: "s48" },
      { id: "u39", label: "ยืนยัน\nสัญญา Active", type: "process" as const, swimlane: "user" as const, connectTo: "s50" },
      { id: "u40", label: "บันทึก\nเลขที่สัญญา", type: "process" as const, swimlane: "user" as const, connectTo: "s52" },
      { id: "u41", label: "แจ้งทีม\nที่เกี่ยวข้อง", type: "process" as const, swimlane: "user" as const, connectTo: "s54" },
      { id: "u42", label: "เชื่อมต่อ\nระบบบัญชี?", type: "decision" as const, swimlane: "user" as const },
      { id: "u43", label: "Sync ไป\nAccounting", type: "process" as const, swimlane: "user" as const, connectTo: "s56" },
      { id: "u44", label: "ตั้งค่า\nการแจ้งเตือน", type: "process" as const, swimlane: "user" as const, connectTo: "s58" },
      { id: "u45", label: "เสร็จสิ้น", type: "process" as const, swimlane: "user" as const, connectTo: "s59" },
      { id: "u46", label: "END", type: "end" as const, swimlane: "user" as const },
    ],
    systemSteps: [
      { id: "s1", label: "ตรวจสอบ\nAuthentication", type: "process" as const, swimlane: "system" as const },
      { id: "s2", label: "ตรวจสอบ\nRole & Permission", type: "process" as const, swimlane: "system" as const },
      { id: "s3", label: "โหลดเมนู\nสัญญา", type: "process" as const, swimlane: "system" as const },
      { id: "s4", label: "Query DB\nสัญญาทั้งหมด", type: "database" as const, swimlane: "system" as const },
      { id: "s5", label: "Filter ตาม\nสิทธิ์ผู้ใช้", type: "process" as const, swimlane: "system" as const },
      { id: "s6", label: "แสดงรายการ\nสัญญา", type: "process" as const, swimlane: "system" as const },
      { id: "s7", label: "เปิดฟอร์ม\nสร้างสัญญา", type: "process" as const, swimlane: "system" as const },
      { id: "s8", label: "โหลดประเภท\nสัญญา", type: "database" as const, swimlane: "system" as const },
      { id: "s9", label: "ค้นหาลูกค้า\nจาก DB", type: "database" as const, swimlane: "system" as const },
      { id: "s10", label: "แสดงข้อมูล\nลูกค้า", type: "process" as const, swimlane: "system" as const },
      { id: "s11", label: "รับข้อมูล\nฟอร์ม", type: "input" as const, swimlane: "system" as const },
      { id: "s12", label: "Validate\nมูลค่า", type: "process" as const, swimlane: "system" as const },
      { id: "s13", label: "Validate\nวันที่", type: "process" as const, swimlane: "system" as const },
      { id: "s14", label: "คำนวณ\nวันสิ้นสุด", type: "process" as const, swimlane: "system" as const },
      { id: "s15", label: "Business Logic\nValidation", type: "process" as const, swimlane: "system" as const },
      { id: "s16", label: "บันทึก\nเงื่อนไขพิเศษ", type: "database" as const, swimlane: "system" as const },
      { id: "s17", label: "Validate\nรูปแบบไฟล์", type: "process" as const, swimlane: "system" as const },
      { id: "s18", label: "ตรวจสอบ\nขนาดไฟล์", type: "process" as const, swimlane: "system" as const },
      { id: "s19", label: "Upload ไป\nCloud Storage", type: "external" as const, swimlane: "system" as const },
      { id: "s20", label: "Virus Scan\nไฟล์", type: "external" as const, swimlane: "system" as const },
      { id: "s21", label: "สร้าง File URL", type: "process" as const, swimlane: "system" as const },
      { id: "s22", label: "Validate\nทุกฟิลด์", type: "process" as const, swimlane: "system" as const },
      { id: "s23", label: "ตรวจสอบ\nBusiness Rules", type: "process" as const, swimlane: "system" as const },
      { id: "s24", label: "บันทึก Draft\nสัญญา", type: "database" as const, swimlane: "system" as const },
      { id: "s25", label: "สร้างเลขที่\nสัญญาชั่วคราว", type: "process" as const, swimlane: "system" as const },
      { id: "s26", label: "ดึงรายชื่อ\nผู้อนุมัติ", type: "database" as const, swimlane: "system" as const },
      { id: "s27", label: "สร้าง Approval\nWorkflow", type: "process" as const, swimlane: "system" as const },
      { id: "s28", label: "Update Status\n= Pending", type: "database" as const, swimlane: "system" as const },
      { id: "s29", label: "ส่ง Email\nแจ้งเตือน", type: "external" as const, swimlane: "system" as const },
      { id: "s30", label: "ส่ง LINE Notify\n(ถ้าเปิดใช้)", type: "external" as const, swimlane: "system" as const },
      { id: "s31", label: "บันทึกผล\nอนุมัติ L1", type: "database" as const, swimlane: "system" as const },
      { id: "s32", label: "Log Activity\nL1", type: "process" as const, swimlane: "system" as const },
      { id: "s33", label: "ส่งแจ้งเตือน\nL2", type: "external" as const, swimlane: "system" as const },
      { id: "s34", label: "บันทึกผล\nอนุมัติ L2", type: "database" as const, swimlane: "system" as const },
      { id: "s35", label: "Log Activity\nL2", type: "process" as const, swimlane: "system" as const },
      { id: "s36", label: "ส่งแจ้งเตือน\nFinal", type: "external" as const, swimlane: "system" as const },
      { id: "s37", label: "บันทึกผล\nอนุมัติ Final", type: "database" as const, swimlane: "system" as const },
      { id: "s38", label: "Update Status\n= Approved", type: "database" as const, swimlane: "system" as const },
      { id: "s39", label: "Log Activity\nFinal", type: "process" as const, swimlane: "system" as const },
      { id: "s40", label: "ส่ง Email\nผลอนุมัติ", type: "external" as const, swimlane: "system" as const },
      { id: "s41", label: "สร้างเลขที่\nสัญญาจริง", type: "process" as const, swimlane: "system" as const },
      { id: "s42", label: "Generate PDF\nจาก Template", type: "process" as const, swimlane: "system" as const },
      { id: "s43", label: "Merge ข้อมูล\nลงในเอกสาร", type: "process" as const, swimlane: "system" as const },
      { id: "s44", label: "ส่ง Email\nเอกสารสัญญา", type: "external" as const, swimlane: "system" as const },
      { id: "s45", label: "Log Activity\nส่งเอกสาร", type: "process" as const, swimlane: "system" as const },
      { id: "s46", label: "บันทึกไฟล์\nสัญญาเซ็น", type: "database" as const, swimlane: "system" as const },
      { id: "s47", label: "OCR ตรวจสอบ\nลายเซ็น", type: "external" as const, swimlane: "system" as const },
      { id: "s48", label: "เชื่อมต่อ\nE-Signature API", type: "external" as const, swimlane: "system" as const },
      { id: "s49", label: "รอ Webhook\nจาก E-Sign", type: "process" as const, swimlane: "system" as const },
      { id: "s50", label: "Update Status\n= Active", type: "database" as const, swimlane: "system" as const },
      { id: "s51", label: "กำหนดวันหมดอายุ\nสัญญา", type: "process" as const, swimlane: "system" as const },
      { id: "s52", label: "บันทึกเลขที่\nสัญญาสุดท้าย", type: "database" as const, swimlane: "system" as const },
      { id: "s53", label: "Index สัญญา\nใน Search", type: "process" as const, swimlane: "system" as const },
      { id: "s54", label: "ส่ง Notification\nทีมงาน", type: "external" as const, swimlane: "system" as const },
      { id: "s55", label: "Update Timeline\nสัญญา", type: "database" as const, swimlane: "system" as const },
      { id: "s56", label: "API Integration\nAccounting System", type: "external" as const, swimlane: "system" as const },
      { id: "s57", label: "สร้างรายการ\nในระบบบัญชี", type: "external" as const, swimlane: "system" as const },
      { id: "s58", label: "สร้าง Reminder\nครบกำหนด", type: "process" as const, swimlane: "system" as const },
      { id: "s59", label: "Audit Log\nทุกขั้นตอน", type: "process" as const, swimlane: "system" as const },
      { id: "s60", label: "Send Webhook\nระบบภายนอก", type: "external" as const, swimlane: "system" as const },
    ],
    connectors: ["A", "B", "C", "D"],
  };

  return (
    <div className="p-8">
      <Card className="border-2 border-[#ede9fe] shadow-xl">
        <CardHeader className="border-b-2 border-[#ede9fe] bg-gradient-to-r from-[#faf8ff] to-white">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-[#4c1d95] flex items-center gap-3">
                📄 Contract Management Process Flow
              </CardTitle>
              <p className="text-sm text-[#8b5cf6] mt-2">
                {flowData.description}
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleZoomOut} variant="outline" size="sm">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button onClick={handleResetZoom} variant="outline" size="sm">
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button onClick={handleZoomIn} variant="outline" size="sm">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button onClick={exportToDrawIO} className="bg-[#705add] hover:bg-[#5b21b6] text-white">
                <Download className="h-4 w-4 mr-2" />
                Export to Draw.io
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto bg-white">
          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "top left",
              transition: "transform 0.2s ease-out",
            }}
          >
            <SharedFlowRenderer data={flowData} onExport={exportToDrawIO} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}