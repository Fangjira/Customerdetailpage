import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Download, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { SharedFlowRenderer } from "./shared-flow-renderer";

export function DBDFlowDiagram() {
  const [zoom, setZoom] = useState(0.85);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.5));
  const handleResetZoom = () => setZoom(0.85);

  const exportToDrawIO = () => {
    const drawioXML = `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net">
  <diagram name="DBD Integration Flow" id="dbd-flow">
    <mxGraphModel dx="2400" dy="1000" grid="1" gridSize="10" guides="1">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

    const blob = new Blob([drawioXML], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dbd-integration-flow.drawio";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const flowData = {
    title: "ระบบเชื่อมต่อ DBD (DBD Integration System)",
    titleEn: "DBD Integration System",
    description: "กระบวนการดึงข้อมูลนิติบุคคลจากกรมพัฒนาธุรกิจการค้า",
    icon: "🏛️",
    userSteps: [
      { id: "u1", label: "START", type: "start" as const, swimlane: "user" as const },
      { id: "u2", label: "เข้าฟอร์ม\nลูกค้า", type: "process" as const, swimlane: "user" as const, connectTo: "s1" },
      { id: "u3", label: "ค้นหาจาก\nเลขทะเบียน", type: "process" as const, swimlane: "user" as const, connectTo: "s2" },
      { id: "u4", label: "กรอกเลข\nทะเบียน", type: "process" as const, swimlane: "user" as const, connectTo: "s2" },
      { id: "u5", label: "กดค้นหา\nข้อมูล", type: "process" as const, swimlane: "user" as const, connectTo: "s3" },
      { id: "u6", label: "รอผลลัพธ์", type: "process" as const, swimlane: "user" as const, connectTo: "s6" },
      { id: "u7", label: "พบข้อมูล?", type: "decision" as const, swimlane: "user" as const, connectTo: "s8" },
      { id: "u8", label: "ตรวจสอบ\nข้อมูล", type: "process" as const, swimlane: "user" as const, connectTo: "s11" },
      { id: "u9", label: "ยืนยัน\nใช้ข้อมูล", type: "process" as const, swimlane: "user" as const, connectTo: "s11" },
      { id: "u10", label: "Auto-fill\nฟอร์ม", type: "process" as const, swimlane: "user" as const, connectTo: "s12" },
      { id: "u11", label: "บันทึก", type: "process" as const, swimlane: "user" as const, connectTo: "s13" },
      { id: "u12", label: "END", type: "end" as const, swimlane: "user" as const },
    ],
    systemSteps: [
      { id: "s1", label: "ตรวจสอบ\nสิทธิ์", type: "process" as const, swimlane: "system" as const },
      { id: "s2", label: "รับเลข\nทะเบียน", type: "input" as const, swimlane: "system" as const },
      { id: "s3", label: "Validate\nFormat", type: "process" as const, swimlane: "system" as const },
      { id: "s4", label: "เช็ค Cache", type: "process" as const, swimlane: "system" as const },
      { id: "s5", label: "Cache\nDB", type: "database" as const, swimlane: "system" as const },
      { id: "s6", label: "เรียก DBD\nAPI", type: "process" as const, swimlane: "system" as const },
      { id: "s7", label: "DBD\nGovernment\nAPI", type: "external" as const, swimlane: "system" as const },
      { id: "s8", label: "รับ Response", type: "process" as const, swimlane: "system" as const },
      { id: "s9", label: "Parse JSON", type: "process" as const, swimlane: "system" as const },
      { id: "s10", label: "บันทึก Cache", type: "process" as const, swimlane: "system" as const },
      { id: "s11", label: "แปลงข้อมูล\nเป็นฟอร์ม", type: "process" as const, swimlane: "system" as const },
      { id: "s12", label: "ส่งกลับ\nผู้ใช้", type: "process" as const, swimlane: "system" as const },
      { id: "s13", label: "บันทึกลง\nCustomers", type: "process" as const, swimlane: "system" as const },
      { id: "s14", label: "DB\n(Customers)", type: "database" as const, swimlane: "system" as const },
      { id: "s15", label: "Audit Log", type: "process" as const, swimlane: "system" as const },
    ],
    connectors: ["A", "B", "C"],
  };

  return (
    <div className="p-8">
      <Card className="border-2 border-[#ede9fe] shadow-xl">
        <CardHeader className="border-b-2 border-[#ede9fe] bg-gradient-to-r from-[#faf8ff] to-white">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-[#4c1d95] flex items-center gap-3">
                🏛️ DBD Integration Process Flow
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