import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Download, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { SharedFlowRenderer } from "./shared-flow-renderer";
import { exportFlowToDrawIO } from "../../utils/drawio-exporter";

export function LeadFlowDiagram() {
  const [zoom, setZoom] = useState(0.85);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.5));
  const handleResetZoom = () => setZoom(0.85);

  const flowData = {
    title: "ระบบจัดการลีด (Lead Management System)",
    titleEn: "Lead Management System",
    description: "กระบวนการจัดการลีดตั้งแต่รับเข้าระบบจนถึงการแปลงเป็นดีล",
    icon: "🎯",
    userSteps: [
      { id: "u1", label: "START", type: "start" as const, swimlane: "user" as const },
      { id: "u2", label: "Login", type: "process" as const, swimlane: "user" as const, connectTo: "s1" },
      { id: "u3", label: "เข้าหน้า\nจัดการลีด", type: "process" as const, swimlane: "user" as const, connectTo: "s3" },
      { id: "u4", label: "ดูรายการ\nลีด", type: "process" as const, swimlane: "user" as const, connectTo: "s5" },
      { id: "u5", label: "Filter ลีด\nตามเงื่อนไข?", type: "decision" as const, swimlane: "user" as const, connectTo: "s7" },
      { id: "u6", label: "เลือก Filter\n(Status/Source)", type: "process" as const, swimlane: "user" as const, connectTo: "s8" },
      { id: "u7", label: "เพิ่มลีด\nใหม่?", type: "decision" as const, swimlane: "user" as const },
      { id: "u8", label: "คลิกเพิ่ม\nลีด", type: "process" as const, swimlane: "user" as const, connectTo: "s10" },
      { id: "u9", label: "เลือก Lead\nSource", type: "process" as const, swimlane: "user" as const, connectTo: "s11" },
      { id: "u10", label: "กรอกชื่อ\nลีด", type: "process" as const, swimlane: "user" as const, connectTo: "s12" },
      { id: "u11", label: "กรอกบริษัท", type: "process" as const, swimlane: "user" as const, connectTo: "s13" },
      { id: "u12", label: "กรอกอีเมล", type: "process" as const, swimlane: "user" as const, connectTo: "s14" },
      { id: "u13", label: "กรอกเบอร์\nโทร", type: "process" as const, swimlane: "user" as const, connectTo: "s15" },
      { id: "u14", label: "ระบุความ\nสนใจ", type: "process" as const, swimlane: "user" as const, connectTo: "s16" },
      { id: "u15", label: "ระบุงบ\nประมาณ?", type: "decision" as const, swimlane: "user" as const },
      { id: "u16", label: "กรอกงบ\nประมาณ", type: "process" as const, swimlane: "user" as const, connectTo: "s18" },
      { id: "u17", label: "บันทึก\nลีด", type: "process" as const, swimlane: "user" as const, connectTo: "s19" },
      { id: "u18", label: "ระบบคำนวณ\nLead Score?", type: "decision" as const, swimlane: "user" as const, connectTo: "s21" },
      { id: "u19", label: "ดู Lead\nScore", type: "process" as const, swimlane: "user" as const, connectTo: "s23" },
      { id: "u20", label: "กำหนด\nPriority?", type: "decision" as const, swimlane: "user" as const },
      { id: "u21", label: "เลือก Hot/\nWarm/Cold", type: "process" as const, swimlane: "user" as const, connectTo: "s25" },
      { id: "u22", label: "มอบหมาย\nเซลส์?", type: "decision" as const, swimlane: "user" as const },
      { id: "u23", label: "เลือก\nเซลส์", type: "process" as const, swimlane: "user" as const, connectTo: "s27" },
      { id: "u24", label: "Auto Assign?", type: "decision" as const, swimlane: "user" as const, connectTo: "s29" },
      { id: "u25", label: "เซลส์รับ\nแจ้งเตือน", type: "process" as const, swimlane: "user" as const, connectTo: "s31" },
      { id: "u26", label: "เซลส์ดู\nรายละเอียด", type: "process" as const, swimlane: "user" as const, connectTo: "s33" },
      { id: "u27", label: "ติดต่อ\nลีด?", type: "decision" as const, swimlane: "user" as const },
      { id: "u28", label: "สร้าง\nกิจกรรม", type: "process" as const, swimlane: "user" as const, connectTo: "s35" },
      { id: "u29", label: "เลือกประเภท\n(Call/Email)", type: "process" as const, swimlane: "user" as const, connectTo: "s36" },
      { id: "u30", label: "บันทึกผล\nการติดต่อ", type: "process" as const, swimlane: "user" as const, connectTo: "s37" },
      { id: "u31", label: "นัดหมาย?", type: "decision" as const, swimlane: "user" as const },
      { id: "u32", label: "สร้างนัด\nใน Calendar", type: "process" as const, swimlane: "user" as const, connectTo: "s39" },
      { id: "u33", label: "ส่งอีเมล\nยืนยัน?", type: "decision" as const, swimlane: "user" as const, connectTo: "s41" },
      { id: "u34", label: "อัปเดต\nสถานะลีด", type: "process" as const, swimlane: "user" as const, connectTo: "s43" },
      { id: "u35", label: "ลีดสนใจ?", type: "decision" as const, swimlane: "user" as const },
      { id: "u36", label: "Update =\nQualified", type: "process" as const, swimlane: "user" as const, connectTo: "s45" },
      { id: "u37", label: "ส่ง\nQuotation?", type: "decision" as const, swimlane: "user" as const },
      { id: "u38", label: "สร้างใบ\nเสนอราคา", type: "process" as const, swimlane: "user" as const, connectTo: "s47" },
      { id: "u39", label: "ติดตาม\nQuotation", type: "process" as const, swimlane: "user" as const, connectTo: "s49" },
      { id: "u40", label: "ลูกค้า\nตอบรับ?", type: "decision" as const, swimlane: "user" as const },
      { id: "u41", label: "แปลงเป็น\nดีล", type: "process" as const, swimlane: "user" as const, connectTo: "s51" },
      { id: "u42", label: "กรอกมูลค่า\nดีล", type: "process" as const, swimlane: "user" as const, connectTo: "s53" },
      { id: "u43", label: "กำหนด\nStage", type: "process" as const, swimlane: "user" as const, connectTo: "s54" },
      { id: "u44", label: "ยืนยัน\nแปลง", type: "process" as const, swimlane: "user" as const, connectTo: "s55" },
      { id: "u45", label: "เสร็จสิ้น", type: "process" as const, swimlane: "user" as const, connectTo: "s58" },
      { id: "u46", label: "END", type: "end" as const, swimlane: "user" as const },
    ],
    systemSteps: [
      { id: "s1", label: "ตรวจสอบ\nAuthentication", type: "process" as const, swimlane: "system" as const },
      { id: "s2", label: "ตรวจสอบ\nPermission", type: "process" as const, swimlane: "system" as const },
      { id: "s3", label: "โหลดเมนู\nลีด", type: "process" as const, swimlane: "system" as const },
      { id: "s4", label: "Query DB\nลีดทั้งหมด", type: "database" as const, swimlane: "system" as const },
      { id: "s5", label: "Filter ตาม\nสิทธิ์", type: "process" as const, swimlane: "system" as const },
      { id: "s6", label: "แสดงรายการ\nลีด", type: "process" as const, swimlane: "system" as const },
      { id: "s7", label: "รับเงื่อนไข\nFilter", type: "input" as const, swimlane: "system" as const },
      { id: "s8", label: "Query + Filter\nDB", type: "database" as const, swimlane: "system" as const },
      { id: "s9", label: "แสดงผล\nที่กรอง", type: "process" as const, swimlane: "system" as const },
      { id: "s10", label: "เปิดฟอร์ม\nลีดใหม่", type: "process" as const, swimlane: "system" as const },
      { id: "s11", label: "โหลด Lead\nSource List", type: "database" as const, swimlane: "system" as const },
      { id: "s12", label: "Validate\nชื่อ", type: "process" as const, swimlane: "system" as const },
      { id: "s13", label: "Validate\nบริษัท", type: "process" as const, swimlane: "system" as const },
      { id: "s14", label: "Validate\nEmail Format", type: "process" as const, swimlane: "system" as const },
      { id: "s15", label: "Validate\nเบอร์โทร", type: "process" as const, swimlane: "system" as const },
      { id: "s16", label: "บันทึก\nความสนใจ", type: "database" as const, swimlane: "system" as const },
      { id: "s17", label: "Validate\nBudget Range", type: "process" as const, swimlane: "system" as const },
      { id: "s18", label: "บันทึก\nงบประมาณ", type: "database" as const, swimlane: "system" as const },
      { id: "s19", label: "ตรวจสอบ\nซ้ำ (Email)", type: "process" as const, swimlane: "system" as const },
      { id: "s20", label: "INSERT ลีด\nใหม่", type: "database" as const, swimlane: "system" as const },
      { id: "s21", label: "เรียก AI\nScoring Engine", type: "external" as const, swimlane: "system" as const },
      { id: "s22", label: "คำนวณ\nScore 0-100", type: "process" as const, swimlane: "system" as const },
      { id: "s23", label: "UPDATE\nLead Score", type: "database" as const, swimlane: "system" as const },
      { id: "s24", label: "แสดง Score\n+ Badge", type: "process" as const, swimlane: "system" as const },
      { id: "s25", label: "UPDATE\nPriority", type: "database" as const, swimlane: "system" as const },
      { id: "s26", label: "ปรับสี Badge\nตาม Priority", type: "process" as const, swimlane: "system" as const },
      { id: "s27", label: "UPDATE\nAssigned To", type: "database" as const, swimlane: "system" as const },
      { id: "s28", label: "Log Activity\nAssignment", type: "process" as const, swimlane: "system" as const },
      { id: "s29", label: "Round Robin\nAlgorithm", type: "process" as const, swimlane: "system" as const },
      { id: "s30", label: "เลือกเซลส์\nอัตโนมัติ", type: "process" as const, swimlane: "system" as const },
      { id: "s31", label: "ส่ง Email +\nLINE Notify", type: "external" as const, swimlane: "system" as const },
      { id: "s32", label: "Push Notification\nมือถือ", type: "external" as const, swimlane: "system" as const },
      { id: "s33", label: "โหลดข้อมูล\nลีดเต็ม", type: "database" as const, swimlane: "system" as const },
      { id: "s34", label: "แสดงประวัติ\nกิจกรรม", type: "process" as const, swimlane: "system" as const },
      { id: "s35", label: "สร้างรายการ\nActivity", type: "database" as const, swimlane: "system" as const },
      { id: "s36", label: "เชื่อมต่อ\nCalendar", type: "process" as const, swimlane: "system" as const },
      { id: "s37", label: "บันทึกผล\n+ Note", type: "database" as const, swimlane: "system" as const },
      { id: "s38", label: "UPDATE Last\nContact Date", type: "database" as const, swimlane: "system" as const },
      { id: "s39", label: "INSERT\nนัดหมาย", type: "database" as const, swimlane: "system" as const },
      { id: "s40", label: "Sync กับ\nGoogle Calendar", type: "external" as const, swimlane: "system" as const },
      { id: "s41", label: "ส่ง Email\nยืนยันนัด", type: "external" as const, swimlane: "system" as const },
      { id: "s42", label: "สร้าง Reminder\nก่อนนัด 1 ชม.", type: "process" as const, swimlane: "system" as const },
      { id: "s43", label: "UPDATE\nStatus", type: "database" as const, swimlane: "system" as const },
      { id: "s44", label: "Log Activity\nStatus Change", type: "process" as const, swimlane: "system" as const },
      { id: "s45", label: "UPDATE =\nQualified", type: "database" as const, swimlane: "system" as const },
      { id: "s46", label: "เพิ่ม Score\n+10 คะแนน", type: "process" as const, swimlane: "system" as const },
      { id: "s47", label: "สร้าง\nQuotation Link", type: "process" as const, swimlane: "system" as const },
      { id: "s48", label: "บันทึก\nQuotation ID", type: "database" as const, swimlane: "system" as const },
      { id: "s49", label: "Track เปิด\nอีเมล?", type: "external" as const, swimlane: "system" as const },
      { id: "s50", label: "Log View\nEvent", type: "process" as const, swimlane: "system" as const },
      { id: "s51", label: "สร้างดีล\nใหม่", type: "database" as const, swimlane: "system" as const },
      { id: "s52", label: "เชื่อมโยง\nLead -> Deal", type: "database" as const, swimlane: "system" as const },
      { id: "s53", label: "Validate\nมูลค่าดีล", type: "process" as const, swimlane: "system" as const },
      { id: "s54", label: "ตั้ง Stage =\nProposal", type: "database" as const, swimlane: "system" as const },
      { id: "s55", label: "UPDATE\nLead Status\n= Converted", type: "database" as const, swimlane: "system" as const },
      { id: "s56", label: "Copy ข้อมูล\nไปดีล", type: "process" as const, swimlane: "system" as const },
      { id: "s57", label: "ส่งแจ้งเตือน\nทีม", type: "external" as const, swimlane: "system" as const },
      { id: "s58", label: "Audit Log\nทุกขั้นตอน", type: "process" as const, swimlane: "system" as const },
      { id: "s59", label: "Update Analytics\nDashboard", type: "process" as const, swimlane: "system" as const },
    ],
    connectors: ["A", "B", "C"],
  };

  return (
    <div className="p-8">
      <Card className="border-2 border-[#E6F0FF] shadow-xl">
        <CardHeader className="border-b-2 border-[#E6F0FF] bg-gradient-to-r from-[#F5F9FF] to-white">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-[#9B9BB5] flex items-center gap-3">
                🎯 Lead Management Process Flow
              </CardTitle>
              <p className="text-sm text-[#0066FF] mt-2">
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
              <Button onClick={() => exportFlowToDrawIO(flowData)} className="bg-[#0066FF] hover:bg-[#0054CC] text-white">
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
            <SharedFlowRenderer data={flowData} onExport={() => exportFlowToDrawIO(flowData)} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}