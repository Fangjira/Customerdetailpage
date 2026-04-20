import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Download, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { SharedFlowRenderer } from "./shared-flow-renderer";

export function ExternalFlowDiagram() {
  const [zoom, setZoom] = useState(0.85);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.5));
  const handleResetZoom = () => setZoom(0.85);

  const exportToDrawIO = () => {
    const drawioXML = `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net">
  <diagram name="External Integration Flow" id="external-flow">
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
    a.download = "external-integration-flow.drawio";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const flowData = {
    title: "ระบบเชื่อมต่อภายนอก (External Data Integration System)",
    titleEn: "External Data Integration System",
    description: "กระบวนการ Sync ข้อมูลกับระบบภายนอก (ERP, Accounting, Logistics)",
    icon: "🌐",
    userSteps: [
      { id: "u1", label: "START", type: "start" as const, swimlane: "user" as const },
      { id: "u2", label: "เข้าหน้า\nIntegrations", type: "process" as const, swimlane: "user" as const, connectTo: "s1" },
      { id: "u3", label: "เลือกระบบ\nที่ต้องการ", type: "process" as const, swimlane: "user" as const, connectTo: "s2" },
      { id: "u4", label: "กำหนดค่า\nConnection", type: "process" as const, swimlane: "user" as const, connectTo: "s4" },
      { id: "u5", label: "ทดสอบ\nการเชื่อมต่อ", type: "process" as const, swimlane: "user" as const, connectTo: "s5" },
      { id: "u6", label: "เชื่อมต่อ\nสำเร็จ?", type: "decision" as const, swimlane: "user" as const, connectTo: "s6" },
      { id: "u7", label: "เปิดใช้งาน\nSync", type: "process" as const, swimlane: "user" as const, connectTo: "s8" },
      { id: "u8", label: "กำหนด\nSchedule", type: "process" as const, swimlane: "user" as const, connectTo: "s9" },
      { id: "u9", label: "Sync ทันที?", type: "decision" as const, swimlane: "user" as const },
      { id: "u10", label: "เริ่ม Sync", type: "process" as const, swimlane: "user" as const, connectTo: "s11" },
      { id: "u11", label: "ตรวจสอบ\nผลลัพธ์", type: "process" as const, swimlane: "user" as const, connectTo: "s14" },
      { id: "u12", label: "END", type: "end" as const, swimlane: "user" as const },
    ],
    systemSteps: [
      { id: "s1", label: "ตรวจสอบ\nสิทธิ์", type: "process" as const, swimlane: "system" as const },
      { id: "s2", label: "แสดงรายการ\nIntegrations", type: "process" as const, swimlane: "system" as const },
      { id: "s3", label: "DB\n(Integrations)", type: "database" as const, swimlane: "system" as const },
      { id: "s4", label: "รับ Config", type: "input" as const, swimlane: "system" as const },
      { id: "s5", label: "Validate\nCredentials", type: "process" as const, swimlane: "system" as const },
      { id: "s6", label: "Test Connection", type: "process" as const, swimlane: "system" as const },
      { id: "s7", label: "External\nAPI", type: "external" as const, swimlane: "system" as const },
      { id: "s8", label: "บันทึก Config", type: "process" as const, swimlane: "system" as const },
      { id: "s9", label: "สร้าง Sync\nJob", type: "process" as const, swimlane: "system" as const },
      { id: "s10", label: "Queue\nSystem", type: "external" as const, swimlane: "system" as const },
      { id: "s11", label: "ดึงข้อมูล\nจากภายนอก", type: "process" as const, swimlane: "system" as const },
      { id: "s12", label: "Transform\nData", type: "process" as const, swimlane: "system" as const },
      { id: "s13", label: "บันทึกลง\nCRM", type: "process" as const, swimlane: "system" as const },
      { id: "s14", label: "สร้าง Sync\nReport", type: "process" as const, swimlane: "system" as const },
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
                🌐 External Data Integration Process Flow
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