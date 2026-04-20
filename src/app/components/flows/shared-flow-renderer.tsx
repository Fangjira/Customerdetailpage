import { Button } from "../ui/button";
import { Download } from "lucide-react";

interface FlowStep {
  id: string;
  label: string;
  type: "start" | "end" | "process" | "decision" | "input" | "database" | "external" | "subprocess";
  swimlane: "user" | "system" | "external";
  connectTo?: string; // System step ID to connect to
  position?: number; // Y position for vertical alignment
  sequence?: number; // Flow sequence number
}

interface FlowData {
  title: string;
  titleEn: string;
  description: string;
  icon: string;
  userSteps: FlowStep[];
  systemSteps: FlowStep[];
  externalSteps?: FlowStep[]; // Optional third swimlane
  connectors?: string[];
}

interface SharedFlowRendererProps {
  data: FlowData;
  onExport: () => void;
}

export function SharedFlowRenderer({ data, onExport }: SharedFlowRendererProps) {
  // Group steps by sequence for horizontal alignment
  const getStepsBySequence = () => {
    const sequenceMap = new Map<number, {
      user?: FlowStep;
      system?: FlowStep;
      external?: FlowStep;
    }>();

    // Add user steps
    data.userSteps.forEach(step => {
      const seq = step.sequence || 0;
      if (!sequenceMap.has(seq)) {
        sequenceMap.set(seq, {});
      }
      sequenceMap.get(seq)!.user = step;
    });

    // Add system steps
    data.systemSteps.forEach(step => {
      const seq = step.sequence || 0;
      if (!sequenceMap.has(seq)) {
        sequenceMap.set(seq, {});
      }
      sequenceMap.get(seq)!.system = step;
    });

    // Add external steps if exists
    if (data.externalSteps) {
      data.externalSteps.forEach(step => {
        const seq = step.sequence || 0;
        if (!sequenceMap.has(seq)) {
          sequenceMap.set(seq, {});
        }
        sequenceMap.get(seq)!.external = step;
      });
    }

    // Sort by sequence
    return Array.from(sequenceMap.entries())
      .sort((a, b) => a[0] - b[0]);
  };

  const sequencedRows = getStepsBySequence();
  const hasExternalLane = data.externalSteps && data.externalSteps.length > 0;

  const renderShape = (step: FlowStep) => {
    const baseClasses = "flex items-center justify-center text-xs font-medium text-center p-2";
    
    const SequenceBadge = () => step.sequence ? (
      <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#0066FF] text-white flex items-center justify-center text-xs font-bold border-2 border-white shadow-md z-20">
        {step.sequence}
      </div>
    ) : null;

    switch (step.type) {
      case "start":
      case "end":
        return (
          <div className="relative">
            <div className={`w-24 h-16 rounded-full ${step.type === "start" ? "bg-[#C8E6C9] border-[#4CAF50]" : "bg-[#FFCDD2] border-[#E53935]"} border-2 ${baseClasses} font-bold`}>
              {step.label}
            </div>
            <SequenceBadge />
          </div>
        );
      
      case "decision":
        return (
          <div className="relative">
            <div className="w-28 h-28 bg-[#FFF9C4] border-2 border-[#F9A825] flex items-center justify-center text-xs font-medium text-center rotate-45">
              <span className="-rotate-45">{step.label}</span>
            </div>
            <SequenceBadge />
          </div>
        );
      
      case "input":
        return (
          <div className="relative">
            <div className="w-28 h-16 bg-[#E8F5E9] border-2 border-[#4CAF50] transform skew-x-12">
              <span className={`${baseClasses} -skew-x-12 block`}>{step.label}</span>
            </div>
            <SequenceBadge />
          </div>
        );
      
      case "database":
        return (
          <div className="relative">
            <div className="w-28 h-16 rounded-xl bg-[#F5F5F5] border-2 border-[#757575] flex items-center justify-center text-xs font-medium text-center p-2">
              {step.label}
            </div>
            <SequenceBadge />
          </div>
        );
      
      case "external":
        return (
          <div className="relative">
            <div className="w-28 h-16 rounded-xl bg-[#FFE5D6] border-2 border-[#FF6B35] border-dashed flex items-center justify-center text-xs font-medium text-center p-2">
              {step.label}
            </div>
            <SequenceBadge />
          </div>
        );
      
      case "subprocess":
        return (
          <div className="relative">
            <div className="w-28 h-16 rounded-xl bg-[#FFECB3] border-2 border-[#FF9800] flex items-center justify-center text-xs font-medium text-center p-2">
              {step.label}
            </div>
            <SequenceBadge />
          </div>
        );
      
      case "process":
      default:
        const bgColor = step.swimlane === "user" ? "bg-[#E6F0FF] border-[#0066FF]" : "bg-[#E8E8F0] border-[#9B9BB5]";
        return (
          <div className="relative">
            <div className={`w-28 h-16 rounded-xl ${bgColor} border-2 ${baseClasses}`}>
              {step.label}
            </div>
            <SequenceBadge />
          </div>
        );
    }
  };

  return (
    <div className="w-full p-8 overflow-x-auto">
      {/* Header with Swimlane Labels */}
      <div className="inline-block min-w-max">
        <div className="flex gap-0 mb-0">
          <div className="w-[320px] bg-[#0066FF] text-white px-4 py-3 font-bold text-center border-2 border-[#0066FF]">
            ผู้ใช้งาน (User)
          </div>
          <div className="w-[320px] bg-[#9B9BB5] text-white px-4 py-3 font-bold text-center border-2 border-[#9B9BB5]">
            {data.title}
          </div>
          {hasExternalLane && (
            <div className="w-[320px] bg-[#FF6B35] text-white px-4 py-3 font-bold text-center border-2 border-[#FF6B35]">
              ภายนอก (External)
            </div>
          )}
        </div>

        {/* Flow Rows - Each row represents one sequence */}
        {sequencedRows.map(([sequence, steps], rowIndex) => (
          <div key={sequence} className="relative">
            {/* Row */}
            <div className="flex gap-0">
              {/* User Column */}
              <div className="w-[320px] border-2 border-t-0 border-[#0066FF] bg-[#E6F0FF] p-4 min-h-[120px] flex items-center justify-center">
                {steps.user && renderShape(steps.user)}
              </div>

              {/* System Column */}
              <div className="w-[320px] border-2 border-t-0 border-l-0 border-[#9B9BB5] bg-[#F3E5F5] p-4 min-h-[120px] flex items-center justify-center">
                {steps.system && renderShape(steps.system)}
              </div>

              {/* External Column */}
              {hasExternalLane && (
                <div className="w-[320px] border-2 border-t-0 border-l-0 border-[#FF6B35] bg-[#FFE5D6] p-4 min-h-[120px] flex items-center justify-center">
                  {steps.external && renderShape(steps.external)}
                </div>
              )}
            </div>

            {/* Arrow Down between rows */}
            {rowIndex < sequencedRows.length - 1 && (
              <div className="flex gap-0">
                {/* User Column Arrow */}
                <div className="w-[320px] border-2 border-t-0 border-[#0066FF] bg-[#E6F0FF] py-2 flex items-center justify-center">
                  {steps.user && <div className="text-2xl text-[#0066FF] font-bold">↓</div>}
                </div>

                {/* System Column Arrow */}
                <div className="w-[320px] border-2 border-t-0 border-l-0 border-[#9B9BB5] bg-[#F3E5F5] py-2 flex items-center justify-center">
                  {steps.system && <div className="text-2xl text-[#9B9BB5] font-bold">↓</div>}
                </div>

                {/* External Column Arrow */}
                {hasExternalLane && (
                  <div className="w-[320px] border-2 border-t-0 border-l-0 border-[#FF6B35] bg-[#FFE5D6] py-2 flex items-center justify-center">
                    {steps.external && <div className="text-2xl text-[#FF6B35] font-bold">↓</div>}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 p-4 border-2 border-[#e5e7eb] rounded-lg bg-white max-w-5xl">
        <div className="font-bold text-sm mb-3 text-[#9B9BB5]">สัญลักษณ์ (Legend)</div>
        <div className="grid grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-12 h-8 rounded-full bg-[#C8E6C9] border-2 border-[#4CAF50]"></div>
            <span>Start/End</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-12 h-8 rounded-lg bg-[#E6F0FF] border-2 border-[#0066FF]"></div>
            <span>User Process</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-12 h-8 rounded-lg bg-[#E8E8F0] border-2 border-[#9B9BB5]"></div>
            <span>System Process</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-[#FFF9C4] border-2 border-[#F9A825] rotate-45"></div>
            <span>Decision</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-12 h-8 bg-[#E8F5E9] border-2 border-[#4CAF50] transform skew-x-12"></div>
            <span>Input/Output</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-12 h-8 rounded-lg bg-[#F5F5F5] border-2 border-[#757575]"></div>
            <span>Database</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-12 h-8 rounded-lg bg-[#FFE5D6] border-2 border-[#FF6B35] border-dashed"></div>
            <span>External System</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#0066FF] text-white flex items-center justify-center text-xs font-bold">
              1
            </div>
            <span>Flow Sequence</span>
          </div>
        </div>
      </div>
    </div>
  );
}