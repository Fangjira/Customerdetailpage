import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Download, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { SharedFlowRenderer } from "./shared-flow-renderer";

export function ApprovalFlowDiagram() {
  const [zoom, setZoom] = useState(0.85);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.5));
  const handleResetZoom = () => setZoom(0.85);

  const exportToDrawIO = () => {
    const drawioXML = `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net">
  <diagram name="Approval Workflow" id="approval-flow">
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
    a.download = "approval-workflow.drawio";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const flowData = {
    title: "ระบบอนุมัติ (Approval Workflow System)",
    titleEn: "Approval Workflow System",
    description: "กระบวนการอนุมัติหลายขั้นตอนแบบ Multi-level",
    icon: "✅",
    userSteps: [
      { id: "u1", label: "START", type: "start" as const, swimlane: "user" as const },
      { id: "u2", label: "สร้างคำขอ\nอนุมัติ", type: "process" as const, swimlane: "user" as const, connectTo: "s1" },
      { id: "u3", label: "แนบเอกสาร\nประกอบ", type: "process" as const, swimlane: "user" as const, connectTo: "s2" },
      { id: "u4", label: "เลือกประเภท\nอนุมัติ", type: "process" as const, swimlane: "user" as const, connectTo: "s3" },
      { id: "u5", label: "เลือก\nผู้อนุมัติ", type: "process" as const, swimlane: "user" as const, connectTo: "s4" },
      { id: "u6", label: "ส่งคำขอ", type: "process" as const, swimlane: "user" as const, connectTo: "s6" },
      { id: "u7", label: "ผู้อนุมัติ\nพิจารณา", type: "process" as const, swimlane: "user" as const, connectTo: "s10" },
      { id: "u8", label: "อนุมัติ?", type: "decision" as const, swimlane: "user" as const },
      { id: "u9", label: "มีขั้นต่อไป?", type: "decision" as const, swimlane: "user" as const, connectTo: "s11" },
      { id: "u10", label: "ผู้อนุมัติ\nถัดไป", type: "process" as const, swimlane: "user" as const, connectTo: "s12" },
      { id: "u11", label: "รับผลการ\nอนุมัติ", type: "process" as const, swimlane: "user" as const, connectTo: "s13" },
      { id: "u12", label: "ดำเนินการ\nต่อ", type: "process" as const, swimlane: "user" as const, connectTo: "s14" },
      { id: "u13", label: "END", type: "end" as const, swimlane: "user" as const },
    ],
    systemSteps: [
      { id: "s1", label: "ตรวจสอบ\nสิทธิ์", type: "process" as const, swimlane: "system" as const },
      { id: "s2", label: "รับคำขอ\nอนุมัติ", type: "input" as const, swimlane: "system" as const },
      { id: "s3", label: "Validate\nข้อมูล", type: "process" as const, swimlane: "system" as const },
      { id: "s4", label: "กำหนด\nApproval Flow", type: "process" as const, swimlane: "system" as const },
      { id: "s5", label: "Workflow\nEngine", type: "external" as const, swimlane: "system" as const },
      { id: "s6", label: "บันทึก\nRequest", type: "process" as const, swimlane: "system" as const },
      { id: "s7", label: "DB\n(Approvals)", type: "database" as const, swimlane: "system" as const },
      { id: "s8", label: "ส่งแจ้งเตือน\nผู้อนุมัติ", type: "process" as const, swimlane: "system" as const },
      { id: "s9", label: "Email/\nNotification", type: "external" as const, swimlane: "system" as const },
      { id: "s10", label: "บันทึก\nการตัดสินใจ", type: "process" as const, swimlane: "system" as const },
      { id: "s11", label: "เช็ค\nNext Level", type: "process" as const, swimlane: "system" as const },
      { id: "s12", label: "ส่งแจ้งเตือน\nถัดไป", type: "process" as const, swimlane: "system" as const },
      { id: "s13", label: "อัปเดต\nสถานะสุดท้าย", type: "process" as const, swimlane: "system" as const },
      { id: "s14", label: "Trigger\nNext Process", type: "process" as const, swimlane: "system" as const },
      { id: "s15", label: "Audit Log", type: "process" as const, swimlane: "system" as const },
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
                ✅ Approval Workflow Process Flow
              </CardTitle>
              <p className="text-sm text-[#8b5cf6] mt-2">
                {flowData.description}
              </p>
              <div className="mt-2 text-xs text-[#6b7280]">
                Support: Quotations, Contracts, Discounts, High-value Deals
              </div>
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