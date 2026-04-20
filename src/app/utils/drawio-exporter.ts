// Draw.io XML Exporter for Process Flow Diagrams
// Compatible with Draw.io, diagrams.net, Visio, and other diagramming tools

export interface FlowStep {
  id: string;
  label: string;
  type: "start" | "end" | "process" | "decision" | "input" | "database" | "external" | "subprocess";
  swimlane: "user" | "system" | "external";
  connectTo?: string;
  sequence?: number;
  branches?: { label: string; target: string }[]; // For decision branches
}

export interface FlowData {
  title: string;
  titleEn: string;
  description: string;
  icon: string;
  userSteps: FlowStep[];
  systemSteps: FlowStep[];
  externalSteps?: FlowStep[]; // Optional third swimlane
  connectors?: string[];
}

// SCGJWD LOGISTICS Colors
const COLORS = {
  userSwimlane: "#0066FF",      // น้ำเงิน
  systemSwimlane: "#9B9BB5",    // ม่วงอ่อน
  externalSwimlane: "#FF6B35",  // ส้ม
  userBg: "#E6F0FF",            // น้ำเงินอ่อน
  systemBg: "#F3E5F5",          // ม่วงพาสเทล
  externalBg: "#FFF3E0",        // ส้มอ่อน
  startEnd: "#4CAF50",          // เขียว
  decision: "#F9A825",          // เหลือง
  database: "#757575",          // เทา
  external: "#FF6B35",          // ส้ม
  accent: "#FF6B35",            // ส้ม
  subprocess: "#9C27B0",        // ม่วงเข้ม
};

function getShapeStyle(type: FlowStep["type"], swimlane: FlowStep["swimlane"]): string {
  const bgColor = swimlane === "user" ? COLORS.userBg : COLORS.systemBg;
  const borderColor = swimlane === "user" ? COLORS.userSwimlane : COLORS.systemSwimlane;

  switch (type) {
    case "start":
    case "end":
      return `rounded=1;whiteSpace=wrap;html=1;fillColor=#C8E6C9;strokeColor=${COLORS.startEnd};strokeWidth=2;fontSize=11;fontStyle=1;arcSize=50;`;
    
    case "decision":
      return `rhombus;whiteSpace=wrap;html=1;fillColor=#FFF9C4;strokeColor=${COLORS.decision};strokeWidth=2;fontSize=10;`;
    
    case "database":
      return `rounded=1;whiteSpace=wrap;html=1;fillColor=#F5F5F5;strokeColor=${COLORS.database};strokeWidth=2;fontSize=10;arcSize=10;`;
    
    case "external":
      return `rounded=1;whiteSpace=wrap;html=1;fillColor=#FFE5D6;strokeColor=${COLORS.external};strokeWidth=2;fontSize=10;dashed=1;dashPattern=5 5;`;
    
    case "input":
      return `shape=parallelogram;perimeter=parallelogramPerimeter;whiteSpace=wrap;html=1;fillColor=#E8F5E9;strokeColor=${COLORS.startEnd};strokeWidth=2;fontSize=10;`;
    
    case "subprocess":
      return `rounded=1;whiteSpace=wrap;html=1;fillColor=#FFECB3;strokeColor=${COLORS.subprocess};strokeWidth=2;fontSize=10;arcSize=10;`;
    
    case "process":
    default:
      return `rounded=1;whiteSpace=wrap;html=1;fillColor=${bgColor};strokeColor=${borderColor};strokeWidth=2;fontSize=10;arcSize=10;`;
  }
}

function getShapeGeometry(type: FlowStep["type"]): { width: number; height: number } {
  switch (type) {
    case "start":
    case "end":
      return { width: 100, height: 50 };
    case "decision":
      return { width: 120, height: 80 };
    case "database":
      return { width: 100, height: 70 };
    case "input":
      return { width: 110, height: 60 };
    default:
      return { width: 110, height: 65 };
  }
}

export function exportFlowToDrawIO(flowData: FlowData): void {
  const { userSteps, systemSteps, externalSteps, title, titleEn, description } = flowData;
  
  let cellId = 2;
  const cells: string[] = [];
  
  // Calculate swimlane dimensions
  const maxSteps = Math.max(userSteps.length, systemSteps.length, externalSteps ? externalSteps.length : 0);
  
  // Group steps by sequence to align them horizontally
  const getSequenceGroups = (steps: FlowStep[]) => {
    const groups = new Map<number, FlowStep[]>();
    steps.forEach(step => {
      const seq = step.sequence || 0;
      if (!groups.has(seq)) {
        groups.set(seq, []);
      }
      groups.get(seq)!.push(step);
    });
    return groups;
  };
  
  const userSequenceGroups = getSequenceGroups(userSteps);
  const systemSequenceGroups = getSequenceGroups(systemSteps);
  const externalSequenceGroups = externalSteps ? getSequenceGroups(externalSteps) : new Map<number, FlowStep[]>();
  
  // Get all unique sequences
  const allSequences = new Set([
    ...Array.from(userSequenceGroups.keys()),
    ...Array.from(systemSequenceGroups.keys()),
    ...Array.from(externalSequenceGroups.keys())
  ]);
  const sortedSequences = Array.from(allSequences).sort((a, b) => a - b);
  
  const verticalSpacing = 120;
  const swimlaneHeight = sortedSequences.length * verticalSpacing + 100;
  const swimlaneWidth = 350;
  
  // User Swimlane
  cells.push(`
    <mxCell id="${cellId++}" value="ผู้ใช้งาน (User)" style="swimlane;horizontal=0;whiteSpace=wrap;html=1;fillColor=${COLORS.userBg};strokeColor=${COLORS.userSwimlane};strokeWidth=3;fontSize=13;fontStyle=1;startSize=30;" vertex="1" parent="1">
      <mxGeometry x="40" y="80" width="${swimlaneWidth}" height="${swimlaneHeight}" as="geometry"/>
    </mxCell>`);
  
  const userLaneId = cellId - 1;
  
  // System Swimlane  
  cells.push(`
    <mxCell id="${cellId++}" value="${title}" style="swimlane;horizontal=0;whiteSpace=wrap;html=1;fillColor=${COLORS.systemBg};strokeColor=${COLORS.systemSwimlane};strokeWidth=3;fontSize=13;fontStyle=1;startSize=30;" vertex="1" parent="1">
      <mxGeometry x="390" y="80" width="${swimlaneWidth}" height="${swimlaneHeight}" as="geometry"/>
    </mxCell>`);
  
  const systemLaneId = cellId - 1;
  
  // External Swimlane (Optional)
  let externalLaneId: number | null = null;
  if (externalSteps && externalSteps.length > 0) {
    cells.push(`
      <mxCell id="${cellId++}" value="ภายนอก (External)" style="swimlane;horizontal=0;whiteSpace=wrap;html=1;fillColor=${COLORS.externalBg};strokeColor=${COLORS.externalSwimlane};strokeWidth=3;fontSize=13;fontStyle=1;startSize=30;" vertex="1" parent="1">
        <mxGeometry x="740" y="80" width="${swimlaneWidth}" height="${swimlaneHeight}" as="geometry"/>
      </mxCell>`);
    
    externalLaneId = cellId - 1;
  }
  
  // Map to store cell IDs for connections
  const stepIdMap = new Map<string, number>();
  
  // Map sequence to Y position
  const sequenceToY = new Map<number, number>();
  sortedSequences.forEach((seq, index) => {
    sequenceToY.set(seq, 60 + index * verticalSpacing);
  });
  
  // Add User Steps with aligned Y positions
  userSteps.forEach((step) => {
    const stepId = cellId++;
    stepIdMap.set(step.id, stepId);
    const geometry = getShapeGeometry(step.type);
    const style = getShapeStyle(step.type, step.swimlane);
    const x = 30 + swimlaneWidth / 2 - geometry.width / 2;
    const y = sequenceToY.get(step.sequence || 0) || 60;
    
    // Add sequence badge if exists
    const labelWithSequence = step.sequence 
      ? `<b>[${step.sequence}]</b> ${step.label}`
      : step.label;
    
    cells.push(`
    <mxCell id="${stepId}" value="${escapeXML(labelWithSequence)}" style="${style}" vertex="1" parent="${userLaneId}">
      <mxGeometry x="${x}" y="${y}" width="${geometry.width}" height="${geometry.height}" as="geometry"/>
    </mxCell>`);
  });
  
  // Add System Steps with aligned Y positions
  systemSteps.forEach((step) => {
    const stepId = cellId++;
    stepIdMap.set(step.id, stepId);
    const geometry = getShapeGeometry(step.type);
    const style = getShapeStyle(step.type, step.swimlane);
    const x = 30 + swimlaneWidth / 2 - geometry.width / 2;
    const y = sequenceToY.get(step.sequence || 0) || 60;
    
    const labelWithSequence = step.sequence 
      ? `<b>[${step.sequence}]</b> ${step.label}`
      : step.label;
    
    cells.push(`
    <mxCell id="${stepId}" value="${escapeXML(labelWithSequence)}" style="${style}" vertex="1" parent="${systemLaneId}">
      <mxGeometry x="${x}" y="${y}" width="${geometry.width}" height="${geometry.height}" as="geometry"/>
    </mxCell>`);
  });
  
  // Add External Steps with aligned Y positions
  if (externalSteps && externalLaneId !== null) {
    externalSteps.forEach((step) => {
      const stepId = cellId++;
      stepIdMap.set(step.id, stepId);
      const geometry = getShapeGeometry(step.type);
      const style = getShapeStyle(step.type, step.swimlane);
      const x = 30 + swimlaneWidth / 2 - geometry.width / 2;
      const y = sequenceToY.get(step.sequence || 0) || 60;
      
      const labelWithSequence = step.sequence 
        ? `<b>[${step.sequence}]</b> ${step.label}`
        : step.label;
      
      cells.push(`
      <mxCell id="${stepId}" value="${escapeXML(labelWithSequence)}" style="${style}" vertex="1" parent="${externalLaneId}">
        <mxGeometry x="${x}" y="${y}" width="${geometry.width}" height="${geometry.height}" as="geometry"/>
      </mxCell>`);
    });
  }
  
  // Add connections
  const allSteps = [...userSteps, ...systemSteps, ...(externalSteps || [])];
  
  allSteps.forEach((step) => {
    if (step.connectTo) {
      const sourceId = stepIdMap.get(step.id);
      const targetId = stepIdMap.get(step.connectTo);
      
      if (sourceId && targetId) {
        const isCrossSwimlane = step.swimlane !== allSteps.find(s => s.id === step.connectTo)?.swimlane;
        const edgeStyle = isCrossSwimlane
          ? `edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${COLORS.accent};strokeWidth=2.5;dashed=1;dashPattern=5 5;`
          : `edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${step.swimlane === 'user' ? COLORS.userSwimlane : step.swimlane === 'system' ? COLORS.systemSwimlane : COLORS.externalSwimlane};strokeWidth=2;`;
        
        cells.push(`
    <mxCell id="${cellId++}" value="" style="${edgeStyle}" edge="1" parent="1" source="${sourceId}" target="${targetId}">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>`);
      }
    }
  });
  
  // Sequential connections within same swimlane
  userSteps.forEach((step, index) => {
    if (index < userSteps.length - 1 && !step.connectTo) {
      const sourceId = stepIdMap.get(step.id);
      const targetId = stepIdMap.get(userSteps[index + 1].id);
      
      if (sourceId && targetId) {
        cells.push(`
    <mxCell id="${cellId++}" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${COLORS.userSwimlane};strokeWidth=2;endArrow=block;endFill=1;" edge="1" parent="1" source="${sourceId}" target="${targetId}">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>`);
      }
    }
  });
  
  systemSteps.forEach((step, index) => {
    if (index < systemSteps.length - 1 && !step.connectTo) {
      const sourceId = stepIdMap.get(step.id);
      const targetId = stepIdMap.get(systemSteps[index + 1].id);
      
      if (sourceId && targetId) {
        cells.push(`
    <mxCell id="${cellId++}" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${COLORS.systemSwimlane};strokeWidth=2;endArrow=block;endFill=1;" edge="1" parent="1" source="${sourceId}" target="${targetId}">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>`);
      }
    }
  });
  
  if (externalSteps && externalLaneId !== null) {
    externalSteps.forEach((step, index) => {
      if (index < externalSteps.length - 1 && !step.connectTo) {
        const sourceId = stepIdMap.get(step.id);
        const targetId = stepIdMap.get(externalSteps[index + 1].id);
        
        if (sourceId && targetId) {
          cells.push(`
      <mxCell id="${cellId++}" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${COLORS.externalSwimlane};strokeWidth=2;endArrow=block;endFill=1;" edge="1" parent="1" source="${sourceId}" target="${targetId}">
        <mxGeometry relative="1" as="geometry"/>
      </mxCell>`);
        }
      }
    });
  }
  
  // Title annotation
  cells.push(`
    <mxCell id="${cellId++}" value="&lt;h1 style=&quot;font-size: 18px;&quot;&gt;${escapeXML(titleEn)}&lt;/h1&gt;&lt;p&gt;${escapeXML(description)}&lt;/p&gt;&lt;p&gt;&lt;br&gt;&lt;/p&gt;&lt;p style=&quot;font-size: 10px;&quot;&gt;🎨 SCGJWD LOGISTICS&lt;br&gt;Exported from CRM System&lt;/p&gt;" style="text;html=1;strokeColor=none;fillColor=none;spacing=5;spacingTop=-20;whiteSpace=wrap;overflow=hidden;rounded=0;fontSize=12;" vertex="1" parent="1">
      <mxGeometry x="40" y="10" width="700" height="60" as="geometry"/>
    </mxCell>`);
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" modified="${new Date().toISOString()}" agent="SCGJWD CRM System" version="21.0.0" type="device">
  <diagram name="${escapeXML(titleEn)}" id="${generateId()}">
    <mxGraphModel dx="1500" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="1654" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${cells.join('\n        ')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

  downloadFile(xml, `${titleEn.toLowerCase().replace(/\s+/g, '-')}-flow.drawio`);
}

function escapeXML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    .replace(/\n/g, '&lt;br&gt;');
}

function generateId(): string {
  return `flow-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}