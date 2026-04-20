import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { 
  ArrowLeft, 
  Target, 
  DollarSign, 
  FileText, 
  CheckCircle, 
  Users, 
  ListTodo, 
  Calendar, 
  FolderOpen, 
  Database, 
  Network,
  FileCheck,
  Download,
  LucideIcon 
} from "lucide-react";
import { useState } from "react";
import { SharedFlowRenderer } from "./flows/shared-flow-renderer";
import { exportFlowToDrawIO } from "../utils/drawio-exporter";
import { ALL_FLOWS, type FlowId } from "../data/flow-data";

interface FlowSystem {
  id: string;
  name: string;
  nameTh: string;
  description: string;
  icon: LucideIcon;
  color: string;
  gradient: string;
}

const flowSystems: FlowSystem[] = [
  {
    id: "lead",
    name: "Lead Management",
    nameTh: "การจัดการลีด",
    description: "กระบวนการจัดการลีดตั้งแต่รับเข้าระบบจนถึงการแปลงเป็นดีล",
    icon: Target,
    color: "#0066FF",
    gradient: "from-[#3385FF] to-[#0066FF]"
  },
  {
    id: "deal",
    name: "Deal Management",
    nameTh: "การจัดการดีล",
    description: "กระบวนการบริหารดีลตั้งแต่เริ่มต้นจนปิดการขาย",
    icon: DollarSign,
    color: "#10b981",
    gradient: "from-[#34d399] to-[#10b981]"
  },
  {
    id: "quotation",
    name: "Quotation Management",
    nameTh: "การจัดการใบเสนอราคา",
    description: "กระบวนการสร้างและจัดการใบเสนอราคาแบบครบวงจร",
    icon: FileText,
    color: "#FF6B35",
    gradient: "from-[#FF8C5A] to-[#FF6B35]"
  },
  {
    id: "contract",
    name: "Contract Management",
    nameTh: "การจัดการสัญญา",
    description: "กระบวนการสร้าง แก้ไข และจัดการสัญญาทั้งหมด",
    icon: FileCheck,
    color: "#9B9BB5",
    gradient: "from-[#B8B8CA] to-[#9B9BB5]"
  },
  {
    id: "approval",
    name: "Approval Workflow",
    nameTh: "ระบบอนุมัติ",
    description: "กระบวนการขออนุมัติและอนุมัติเอกสารต่างๆ",
    icon: CheckCircle,
    color: "#22c55e",
    gradient: "from-[#4ade80] to-[#22c55e]"
  },
  {
    id: "customer",
    name: "Customer Management",
    nameTh: "การจัดการลูกค้า",
    description: "กระบวนการจัดการข้อมูลและความสัมพันธ์กับลูกค้า",
    icon: Users,
    color: "#0066FF",
    gradient: "from-[#3385FF] to-[#0066FF]"
  },
  {
    id: "calendar",
    name: "Calendar & Activity",
    nameTh: "ปฏิทินและกิจกรรม",
    description: "กระบวนการจัดการนัดหมายและกิจกรรมต่างๆ",
    icon: Calendar,
    color: "#8b5cf6",
    gradient: "from-[#a78bfa] to-[#8b5cf6]"
  },
];

export function ProcessFlowHub() {
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null);

  const handleExportFlow = (flowId: string) => {
    const flow = ALL_FLOWS[flowId as FlowId];
    if (flow) {
      exportFlowToDrawIO(flow);
    }
  };

  const renderFlowDiagram = () => {
    if (selectedFlow) {
      const flowData = ALL_FLOWS[selectedFlow as FlowId];
      if (flowData) {
        return <SharedFlowRenderer data={flowData} onExport={() => handleExportFlow(selectedFlow)} />;
      }
    }
    return null;
  };

  if (selectedFlow) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5F9FF] to-white">
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b-2 border-[#E6F0FF] px-8 py-4 flex items-center justify-between">
          <Button
            onClick={() => setSelectedFlow(null)}
            variant="outline"
            className="border-[#E6F0FF] text-[#0066FF] hover:bg-[#F5F9FF]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            กลับไปรายการ Process Flow
          </Button>
          <Button
            onClick={() => handleExportFlow(selectedFlow)}
            className="bg-[#0066FF] hover:bg-[#0054CC] text-white"
          >
            <Download className="h-4 w-4 mr-2" />
            Export to Draw.io
          </Button>
        </div>
        {renderFlowDiagram()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F9FF] to-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#9B9BB5] mb-4">
            📊 ผังงานกระบวนการทำงาน (Process Flow Diagrams)
          </h1>
          
          {/* One Copy Description */}
          <div className="bg-white border-2 border-[#E6F0FF] rounded-2xl p-6 mb-6 shadow-sm">
            <p className="text-[#0066FF] text-lg font-medium mb-3">
              ระบบแสดงผังงานกระบวนการทำงานทั้งหมดของ CRM ระดับองค์กร
            </p>
            <p className="text-[#666] leading-relaxed">
              ช่วยให้ทีมงานเข้าใจขั้นตอนการทำงานของแต่ละโมดูลอย่างชัดเจน ตั้งแต่การจัดการลีดและดีล ไปจนถึงการอนุมัติและการทำสัญญา 
              แต่ละผังงานแสดงความสัมพันธ์ระหว่างผู้ใช้งาน ระบบ และระบบภายนอก เพื่อให้มองเห็นภาพรวมของกระบวนการได้อย่างครบถ้วน 
              พร้อมรองรับการ Export เป็นไฟล์ Draw.io (.drawio) สำหรับนำไปแก้ไขหรือนำเสนอต่อได้ทันที
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-[#9B9BB5]">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5F5F8] border border-[#E8E8F0] rounded-lg">
              <span className="font-semibold">{flowSystems.length}</span> ระบบทั้งหมด
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5F5F8] border border-[#E8E8F0] rounded-lg">
              ✨ Enterprise-grade
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5F5F8] border border-[#E8E8F0] rounded-lg">
              🎨 Draw.io Compatible
            </span>
          </div>
        </div>

        {/* Flow Systems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flowSystems.map((system) => {
            const Icon = system.icon;
            return (
              <Card
                key={system.id}
                className="border-2 border-[#E6F0FF] hover:border-[#0066FF] transition-all duration-200 cursor-pointer hover:shadow-xl group"
                onClick={() => setSelectedFlow(system.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${system.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200`}
                    >
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg text-[#9B9BB5] mb-1">
                        {system.nameTh}
                      </CardTitle>
                      <p className="text-xs text-[#0066FF] font-medium">
                        {system.name}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#6b7280] leading-relaxed mb-4">
                    {system.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#10b981]"></span>
                      <span className="text-xs text-[#6b7280]">Ready to Export</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#0066FF] hover:bg-[#F5F9FF] group-hover:translate-x-1 transition-transform"
                    >
                      ดูผังงาน →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-2 border-[#E6F0FF] bg-gradient-to-br from-[#F5F9FF] to-white">
            <CardHeader>
              <CardTitle className="text-base text-[#9B9BB5] flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                ออกแบบตามมาตรฐาน
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[#6b7280]">
                ใช้สัญลักษณ์ตามมาตรฐาน BPMN และ Flowchart ที่เข้าใจง่าย
                เหมาะสำหรับเอกสารราชการและ TOR
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#E6F0FF] bg-gradient-to-br from-[#F5F9FF] to-white">
            <CardHeader>
              <CardTitle className="text-base text-[#9B9BB5] flex items-center gap-2">
                <span className="text-2xl">💾</span>
                Export ได้ทันที
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[#6b7280]">
                Export เป็น Draw.io XML ได้ทุก Flow พร้อมแก้ไขเพิ่มเติมใน
                Visio, Draw.io, Figma, PowerPoint
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#E6F0FF] bg-gradient-to-br from-[#F5F9FF] to-white">
            <CardHeader>
              <CardTitle className="text-base text-[#9B9BB5] flex items-center gap-2">
                <span className="text-2xl">🌐</span>
                ครอบคลุมทุกระบบ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[#6b7280]">
                ครอบคลุมทุกกระบวนการตั้งแต่ Lead จนถึง Contract, Integration,
                และ Approval Workflow
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}