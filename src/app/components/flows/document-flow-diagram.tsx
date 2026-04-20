import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Download, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { SharedFlowRenderer } from "./shared-flow-renderer";

export function DocumentFlowDiagram() {
  const [zoom, setZoom] = useState(0.85);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.5));
  const handleResetZoom = () => setZoom(0.85);

  const exportToDrawIO = () => {
    const drawioXML = `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net">
  <diagram name="Document Management Flow" id="document-flow">
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
    a.download = "document-management-flow.drawio";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const flowData = {
    title: "ระบบจัดการเอกสาร (Document Management System)",
    titleEn: "Document Management System",
    description: "กระบวนการอัปโหลด จัดเก็บ และแชร์เอกสาร",
    icon: "📁",
    userSteps: [
      { id: "u1", label: "START", type: "start" as const, swimlane: "user" as const },
      { id: "u2", label: "เข้าสู่หน้า\nเอกสาร", type: "process" as const, swimlane: "user" as const, connectTo: "s1" },
      { id: "u3", label: "อัปโหลด\nเอกสาร?", type: "decision" as const, swimlane: "user" as const, connectTo: "s2" },
      { id: "u4", label: "เลือกไฟล์", type: "process" as const, swimlane: "user" as const, connectTo: "s4" },
      { id: "u5", label: "เลือกหมวดหมู่", type: "process" as const, swimlane: "user" as const, connectTo: "s5" },
      { id: "u6", label: "เชื่อมโยง\nลีด/ดีล?", type: "decision" as const, swimlane: "user" as const },
      { id: "u7", label: "เลือก\nลีด/ดีล", type: "process" as const, swimlane: "user" as const, connectTo: "s12" },
      { id: "u8", label: "ตั้งค่า\nสิทธิ์?", type: "decision" as const, swimlane: "user" as const },
      { id: "u9", label: "กำหนดสิทธิ์\nการเข้าถึง", type: "process" as const, swimlane: "user" as const, connectTo: "s13" },
      { id: "u10", label: "อัปโหลด", type: "process" as const, swimlane: "user" as const, connectTo: "s9" },
      { id: "u11", label: "ดู/ดาวน์โหลด\nเอกสาร", type: "process" as const, swimlane: "user" as const, connectTo: "s14" },
      { id: "u12", label: "END", type: "end" as const, swimlane: "user" as const },
    ],
    systemSteps: [
      { id: "s1", label: "ตรวจสอบ\nสิทธิ์", type: "process" as const, swimlane: "system" as const },
      { id: "s2", label: "แสดงรายการ\nเอกสาร", type: "process" as const, swimlane: "system" as const },
      { id: "s3", label: "DB\n(Documents)", type: "database" as const, swimlane: "system" as const },
      { id: "s4", label: "รับไฟล์", type: "input" as const, swimlane: "system" as const },
      { id: "s5", label: "Validate\nไฟล์", type: "process" as const, swimlane: "system" as const },
      { id: "s6", label: "Scan Virus", type: "process" as const, swimlane: "system" as const },
      { id: "s7", label: "Anti-virus\nEngine", type: "external" as const, swimlane: "system" as const },
      { id: "s8", label: "สร้างThumb", type: "process" as const, swimlane: "system" as const },
      { id: "s9", label: "อัปโหลดไปCloud", type: "process" as const, swimlane: "system" as const },
      { id: "s10", label: "Cloud\nStorage", type: "external" as const, swimlane: "system" as const },
      { id: "s11", label: "บันทึก\nMetadata", type: "process" as const, swimlane: "system" as const },
      { id: "s12", label: "เชื่อมโยง\nข้อมูล", type: "process" as const, swimlane: "system" as const },
      { id: "s13", label: "กำหนด\nPermission", type: "process" as const, swimlane: "system" as const },
      { id: "s14", label: "แสดงเอกสาร", type: "process" as const, swimlane: "system" as const },
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
                📁 Document Management Process Flow
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