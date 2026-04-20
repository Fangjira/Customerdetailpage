// Complete Flow Data for all 11 systems
// Focus on USER EXPERIENCE and practical usage, not technical database details
import { FlowData } from "../utils/drawio-exporter";

export const LEAD_FLOW: FlowData = {
  title: "ระบบจัดการลีด (Lead Management System)",
  titleEn: "Lead Management System",
  description: "กระบวนการจัดการลีดตั้งแต่รับเข้าระบบจนถึงการแปลงเป็นดีล",
  icon: "🎯",
  userSteps: [
    { id: "u1", sequence: 1, label: "START", type: "start", swimlane: "user" },
    { id: "u2", sequence: 2, label: "เข้าสู่ระบบ", type: "process", swimlane: "user", connectTo: "s1" },
    { id: "u3", sequence: 3, label: "เปิดหน้า\\nLead Management", type: "process", swimlane: "user", connectTo: "s2" },
    { id: "u4", sequence: 4, label: "ต้องการเพิ่ม\\nลีดใหม่?", type: "decision", swimlane: "user" },
    { id: "u5", sequence: 5, label: "คลิก\\n+ Add Lead", type: "process", swimlane: "user", connectTo: "s3" },
    { id: "u6", sequence: 6, label: "กรอกข้อมูล\\nลีด", type: "process", swimlane: "user", connectTo: "s4" },
    { id: "u7", sequence: 7, label: "เลือก Lead\\nSource", type: "process", swimlane: "user" },
    { id: "u8", sequence: 8, label: "ระบุความสนใจ\\nของลีด", type: "process", swimlane: "user" },
    { id: "u9", sequence: 9, label: "บันทึกลีด", type: "process", swimlane: "user", connectTo: "s5" },
    { id: "u10", sequence: 10, label: "ดู Lead Score\\nอัตโนมัติ", type: "process", swimlane: "user", connectTo: "s6" },
    { id: "u11", sequence: 11, label: "มอบหมาย\\nเซลส์?", type: "decision", swimlane: "user" },
    { id: "u12", sequence: 12, label: "เลือกเซลส์", type: "process", swimlane: "user", connectTo: "s7" },
    { id: "u13", sequence: 13, label: "สร้างกิจกรรม\\nติดตาม", type: "process", swimlane: "user", connectTo: "s8" },
    { id: "u14", sequence: 14, label: "บันทึกผล\\nการติดต่อ", type: "process", swimlane: "user", connectTo: "s9" },
    { id: "u15", sequence: 15, label: "ลีดสนใจ?", type: "decision", swimlane: "user" },
    { id: "u16", sequence: 16, label: "แปลงเป็นดีล", type: "process", swimlane: "user", connectTo: "s10" },
    { id: "u17", sequence: 17, label: "END", type: "end", swimlane: "user" },
  ],
  systemSteps: [
    { id: "s1", sequence: 2, label: "แสดงหน้า\\nDashboard", type: "process", swimlane: "system" },
    { id: "s2", sequence: 3, label: "แสดงรายการ\\nลีดทั้งหมด", type: "process", swimlane: "system" },
    { id: "s3", sequence: 5, label: "เปิดฟอร์ม\\nเพิ่มลีด", type: "process", swimlane: "system" },
    { id: "s4", sequence: 6, label: "แสดงคำแนะนำ\\nการกรอกข้อมูล", type: "process", swimlane: "system" },
    { id: "s5", sequence: 9, label: "บันทึกข้อมูล\\nสำเร็จ", type: "process", swimlane: "system" },
    { id: "s6", sequence: 10, label: "คำนวณ\\nLead Score", type: "process", swimlane: "system" },
    { id: "s7", sequence: 12, label: "ส่งการแจ้งเตือน\\nให้เซลส์", type: "external", swimlane: "system" },
    { id: "s8", sequence: 13, label: "สร้างปฏิทิน\\nกิจกรรม", type: "process", swimlane: "system" },
    { id: "s9", sequence: 14, label: "อัปเดต\\nประวัติลีด", type: "process", swimlane: "system" },
    { id: "s10", sequence: 16, label: "สร้างดีล\\nอัตโนมัติ", type: "process", swimlane: "system" },
  ],
};

export const CONTRACT_FLOW: FlowData = {
  title: "ระบบจัดการสัญญา (Contract Management System)",
  titleEn: "Contract Management System",
  description: "กระบวนการสร้าง แก้ไข และจัดการสัญญาทั้งหมด",
  icon: "📋",
  userSteps: [
    { id: "u1", sequence: 1, label: "START", type: "start", swimlane: "user" },
    { id: "u2", sequence: 2, label: "เข้าหน้า\\nสัญญา", type: "process", swimlane: "user", connectTo: "s1" },
    { id: "u3", sequence: 3, label: "คลิกสร้าง\\nสัญญาใหม่", type: "process", swimlane: "user", connectTo: "s2" },
    { id: "u4", sequence: 4, label: "เลือก Template\\nสัญญา", type: "process", swimlane: "user", connectTo: "s3" },
    { id: "u5", sequence: 5, label: "กรอกรายละเอียด\\nสัญญา", type: "process", swimlane: "user", connectTo: "s4" },
    { id: "u6", sequence: 6, label: "อัปโหลด\\nเอกสาร", type: "process", swimlane: "user", connectTo: "s5" },
    { id: "u7", sequence: 7, label: "ตรวจสอบ\\nข้อมูล", type: "process", swimlane: "user" },
    { id: "u8", sequence: 8, label: "ส่งขออนุมัติ", type: "process", swimlane: "user", connectTo: "s6" },
    { id: "u9", sequence: 9, label: "รออนุมัติ", type: "process", swimlane: "user", connectTo: "s7" },
    { id: "u10", sequence: 10, label: "ได้รับการ\\nอนุมัติ?", type: "decision", swimlane: "user" },
    { id: "u11", sequence: 11, label: "Activate\\nสัญญา", type: "process", swimlane: "user", connectTo: "s8" },
    { id: "u12", sequence: 12, label: "END", type: "end", swimlane: "user" },
  ],
  systemSteps: [
    { id: "s1", sequence: 2, label: "แสดงรายการ\\nสัญญา", type: "process", swimlane: "system" },
    { id: "s2", sequence: 3, label: "เปิดฟอร์ม\\nสัญญาใหม่", type: "process", swimlane: "system" },
    { id: "s3", sequence: 4, label: "แสดง Template\\nสัญญา", type: "process", swimlane: "system" },
    { id: "s4", sequence: 5, label: "แสดงช่อง\\nกรอกข้อมูล", type: "process", swimlane: "system" },
    { id: "s5", sequence: 6, label: "สร้าง Preview\\nเอกสาร", type: "process", swimlane: "system" },
    { id: "s6", sequence: 8, label: "ส่งแจ้งเตือน\\nผู้อนุมัติ", type: "external", swimlane: "system" },
    { id: "s7", sequence: 9, label: "แสดงสถานะ\\nรออนุมัติ", type: "process", swimlane: "system" },
    { id: "s8", sequence: 11, label: "เปลี่ยนสถานะ\\nActive", type: "process", swimlane: "system" },
  ],
};

export const DEAL_FLOW: FlowData = {
  title: "ระบบ MINI CRM",
  titleEn: "Deal Management System", 
  description: "กระบวนการบริหารดีลตั้งแต่เริ่มต้นจนปิดการขาย พร้อมระบบอนุมัติแบบหลายขั้นตอน",
  icon: "💰",
  userSteps: [
    { id: "u1", sequence: 1, label: "เริ่ม", type: "start", swimlane: "user" },
    { id: "u2", sequence: 2, label: "เลือกดำเนินการ", type: "decision", swimlane: "user" },
    { id: "u3", sequence: 3, label: "แสดงรายการที่สร้างแล้ว", type: "process", swimlane: "user", connectTo: "s1" },
    { id: "u4", sequence: 4, label: "ค้นหาดีล", type: "decision", swimlane: "user" },
    
    // Branch 1: ค้นจาก Deal
    { id: "u5", sequence: 5, label: "ค้นจากดีล", type: "process", swimlane: "user" },
    { id: "u6", sequence: 6, label: "ระบุดีล", type: "input", swimlane: "user", connectTo: "s2" },
    
    // Branch 2: ค้นจาก Quotation
    { id: "u7", sequence: 5, label: "ค้นจาก Quotation", type: "process", swimlane: "user" },
    { id: "u8", sequence: 6, label: "ระบุ Quotation", type: "input", swimlane: "user", connectTo: "s3" },
    
    // Branch 3: สร้างใหม่
    { id: "u9", sequence: 5, label: "สร้างใหม่", type: "process", swimlane: "user", connectTo: "s4" },
    
    // Main Flow continues
    { id: "u10", sequence: 7, label: "เลือกที่อยู่\\nขนส่ง", type: "process", swimlane: "user", connectTo: "s5" },
    { id: "u11", sequence: 8, label: "กรอกรายละเอียด\\nสินค้า", type: "process", swimlane: "user", connectTo: "s6" },
    { id: "u12", sequence: 9, label: "กรอก ปริมาตร", type: "input", swimlane: "user" },
    { id: "u13", sequence: 10, label: "บันทึกข้อมูล", type: "process", swimlane: "user", connectTo: "s7" },
    { id: "u14", sequence: 11, label: "มีรูปภาพ?", type: "decision", swimlane: "user" },
    { id: "u15", sequence: 12, label: "ระบุรูปภาพ", type: "input", swimlane: "user", connectTo: "s8" },
    { id: "u16", sequence: 13, label: "บันทึกสำเร็จ", type: "process", swimlane: "user", connectTo: "s9" },
  ],
  
  systemSteps: [
    { id: "s1", sequence: 3, label: "Query รายการดีล\\nทั้งหมด", type: "database", swimlane: "system" },
    { id: "s2", sequence: 6, label: "ค้นหา Deal\\nจาก DB", type: "database", swimlane: "system" },
    { id: "s3", sequence: 6, label: "ค้นหา Quotation\\nจาก DB", type: "database", swimlane: "system" },
    { id: "s4", sequence: 5, label: "สร้างฟอร์ม\\nดีลใหม่", type: "process", swimlane: "system" },
    { id: "s5", sequence: 7, label: "แสดงที่อยู่\\nติดต่อ", type: "process", swimlane: "system" },
    { id: "s6", sequence: 8, label: "แสดงฟอร์ม\\nสินค้า", type: "process", swimlane: "system" },
    { id: "s7", sequence: 10, label: "Validate\\nข้อมูล", type: "process", swimlane: "system" },
    { id: "s8", sequence: 12, label: "Upload\\nรูปภาพ", type: "external", swimlane: "system", connectTo: "e1" },
    { id: "s9", sequence: 13, label: "บันทึกลง DB", type: "database", swimlane: "system", connectTo: "e2" },
  ],
  
  externalSteps: [
    { id: "e1", sequence: 12, label: "ระบบจัดเก็บ\\nรูปภาพ", type: "external", swimlane: "external" },
    { id: "e2", sequence: 13, label: "มีการอนุมัติ?", type: "decision", swimlane: "external" },
    { id: "e3", sequence: 14, label: "ตรวจสอบเงื่อนไข\\nการอนุมัติ", type: "process", swimlane: "external" },
    { id: "e4", sequence: 15, label: "ส่ง Business Unit", type: "external", swimlane: "external" },
    { id: "e5", sequence: 15, label: "ส่ง ประกันภัย", type: "external", swimlane: "external" },
    { id: "e6", sequence: 15, label: "ส่ง ข้อมูลลูกค้า", type: "external", swimlane: "external" },
    { id: "e7", sequence: 16, label: "รอผลการ\\nอนุมัติ", type: "process", swimlane: "external" },
    { id: "e8", sequence: 17, label: "อนุมัติ?", type: "decision", swimlane: "external" },
    { id: "e9", sequence: 18, label: "ยกเลิก", type: "end", swimlane: "external" },
    { id: "e10", sequence: 18, label: "เสร็จสิ้น", type: "end", swimlane: "external" },
  ],
};

export const QUOTATION_FLOW: FlowData = {
  title: "ระบบจัดการใบเสนอราคา (Quotation Management System)",
  titleEn: "Quotation Management System",
  description: "กระบวนการสร้างและจัดการใบเสนอราคาแบบครบวงจร",
  icon: "📄",
  userSteps: [
    { id: "u1", sequence: 1, label: "START", type: "start", swimlane: "user" },
    { id: "u2", sequence: 2, label: "เข้าหน้า\\nQuotation", type: "process", swimlane: "user", connectTo: "s1" },
    { id: "u3", sequence: 3, label: "สร้าง Quotation\\nใหม่", type: "process", swimlane: "user", connectTo: "s2" },
    { id: "u4", sequence: 4, label: "เลือกลูกค้า", type: "process", swimlane: "user", connectTo: "s3" },
    { id: "u5", sequence: 5, label: "เพิ่มสินค้า\\n/บริการ", type: "process", swimlane: "user", connectTo: "s4" },
    { id: "u6", sequence: 6, label: "ระบุจำนวน\\nและราคา", type: "process", swimlane: "user", connectTo: "s5" },
    { id: "u7", sequence: 7, label: "ใส่ส่วนลด?", type: "decision", swimlane: "user" },
    { id: "u8", sequence: 8, label: "ระบุส่วนลด", type: "process", swimlane: "user", connectTo: "s6" },
    { id: "u9", sequence: 9, label: "ตรวจสอบ\\nยอดรวม", type: "process", swimlane: "user", connectTo: "s7" },
    { id: "u10", sequence: 10, label: "สร้าง PDF\\nและส่ง", type: "process", swimlane: "user", connectTo: "s8" },
    { id: "u11", sequence: 11, label: "ติดตามสถานะ", type: "process", swimlane: "user", connectTo: "s9" },
    { id: "u12", sequence: 12, label: "END", type: "end", swimlane: "user" },
  ],
  systemSteps: [
    { id: "s1", sequence: 2, label: "แสดงรายการ\\nQuotation", type: "process", swimlane: "system" },
    { id: "s2", sequence: 3, label: "เปิดฟอร์ม\\nQuote ใหม่", type: "process", swimlane: "system" },
    { id: "s3", sequence: 4, label: "แสดงข้อมูล\\nลูกค้า", type: "process", swimlane: "system" },
    { id: "s4", sequence: 5, label: "แสดงรายการ\\nสินค้า", type: "process", swimlane: "system" },
    { id: "s5", sequence: 6, label: "คำนวณราคา\\nอัตโนมัติ", type: "process", swimlane: "system" },
    { id: "s6", sequence: 8, label: "คำนวณส่วนลด\\nและ VAT", type: "process", swimlane: "system" },
    { id: "s7", sequence: 9, label: "แสดงยอดรวม\\nทั้งหมด", type: "process", swimlane: "system" },
    { id: "s8", sequence: 10, label: "สร้าง PDF\\nและส่ง Email", type: "external", swimlane: "system" },
    { id: "s9", sequence: 11, label: "แสดงสถานะ\\nการเปิด", type: "process", swimlane: "system" },
  ],
};

export const APPROVAL_FLOW: FlowData = {
  title: "ระบบอนุมัติ (Approval Workflow System)",
  titleEn: "Approval Workflow System",
  description: "กระบวนการขออนุมัติและอนุมัติเอกสารต่างๆ",
  icon: "✅",
  userSteps: [
    { id: "u1", sequence: 1, label: "START", type: "start", swimlane: "user" },
    { id: "u2", sequence: 2, label: "เข้าหน้า\\nApprovals", type: "process", swimlane: "user", connectTo: "s1" },
    { id: "u3", sequence: 3, label: "เลือกเอกสาร\\nที่ต้องการอนุมัติ", type: "process", swimlane: "user", connectTo: "s2" },
    { id: "u4", sequence: 4, label: "เลือกผู้อนุมัติ", type: "process", swimlane: "user", connectTo: "s3" },
    { id: "u5", sequence: 5, label: "ใส่หมายเหตุ", type: "process", swimlane: "user" },
    { id: "u6", sequence: 6, label: "ส่งขออนุมัติ", type: "process", swimlane: "user", connectTo: "s4" },
    { id: "u7", sequence: 7, label: "รอการอนุมัติ", type: "process", swimlane: "user", connectTo: "s5" },
    { id: "u8", sequence: 8, label: "ได้รับการ\\nอนุมัติ?", type: "decision", swimlane: "user" },
    { id: "u9", sequence: 9, label: "ดำเนินการ\\nต่อ", type: "process", swimlane: "user" },
    { id: "u10", sequence: 10, label: "END", type: "end", swimlane: "user" },
  ],
  systemSteps: [
    { id: "s1", sequence: 2, label: "แสดงรายการ\\nขออนุมัติ", type: "process", swimlane: "system" },
    { id: "s2", sequence: 3, label: "แสดงข้อมูล\\nเอกสาร", type: "process", swimlane: "system" },
    { id: "s3", sequence: 4, label: "แสดงรายชื่อ\\nผู้อนุมัติ", type: "process", swimlane: "system" },
    { id: "s4", sequence: 6, label: "ส่งแจ้งเตือน\\nผู้อนุมัติ", type: "external", swimlane: "system" },
    { id: "s5", sequence: 7, label: "อัปเดตสถานะ\\nเอกสาร", type: "process", swimlane: "system" },
  ],
};

export const CUSTOMER_FLOW: FlowData = {
  title: "ระบบจัดการลูกค้า (Customer Management System)",
  titleEn: "Customer Management System",
  description: "กระบวนการจัดการข้อมูลและความสัมพันธ์กับลูกค้า",
  icon: "👥",
  userSteps: [
    { id: "u1", sequence: 1, label: "START", type: "start", swimlane: "user" },
    { id: "u2", sequence: 2, label: "เข้าหน้า\\nCustomers", type: "process", swimlane: "user", connectTo: "s1" },
    { id: "u3", sequence: 3, label: "เพิ่มลูกค้า\\nใหม่?", type: "decision", swimlane: "user" },
    { id: "u4", sequence: 4, label: "คลิกเพิ่ม\\nลูกค้า", type: "process", swimlane: "user", connectTo: "s2" },
    { id: "u5", sequence: 5, label: "กรอกข้อมูล\\nลูกค้า", type: "process", swimlane: "user", connectTo: "s3" },
    { id: "u6", sequence: 6, label: "กรอกที่อยู่\\nติดต่อ", type: "process", swimlane: "user" },
    { id: "u7", sequence: 7, label: "เพิ่มผู้ติดต่อ", type: "process", swimlane: "user", connectTo: "s4" },
    { id: "u8", sequence: 8, label: "บันทึกข้อมูล", type: "process", swimlane: "user", connectTo: "s5" },
    { id: "u9", sequence: 9, label: "ดูประวัติ\\nลูกค้า", type: "process", swimlane: "user", connectTo: "s6" },
    { id: "u10", sequence: 10, label: "END", type: "end", swimlane: "user" },
  ],
  systemSteps: [
    { id: "s1", sequence: 2, label: "แสดงรายการ\\nลูกค้า", type: "process", swimlane: "system" },
    { id: "s2", sequence: 4, label: "เปิดฟอร์ม\\nลูกค้าใหม่", type: "process", swimlane: "system" },
    { id: "s3", sequence: 5, label: "ตรวจสอบ\\nข้อมูลซ้ำ", type: "process", swimlane: "system" },
    { id: "s4", sequence: 7, label: "แสดงฟอร์ม\\nผู้ติดต่อ", type: "process", swimlane: "system" },
    { id: "s5", sequence: 8, label: "บันทึกข้อมูล\\nสำเร็จ", type: "process", swimlane: "system" },
    { id: "s6", sequence: 9, label: "แสดงประวัติ\\nทั้งหมด", type: "process", swimlane: "system" },
  ],
};

export const CALENDAR_FLOW: FlowData = {
  title: "ระบบปฏิทินและกิจกรรม (Calendar & Activity System)",
  titleEn: "Calendar & Activity System",
  description: "กระบวนการจัดการนัดหมายและกิจกรรมต่างๆ",
  icon: "📅",
  userSteps: [
    { id: "u1", sequence: 1, label: "START", type: "start", swimlane: "user" },
    { id: "u2", sequence: 2, label: "เข้าหน้า\\nCalendar", type: "process", swimlane: "user", connectTo: "s1" },
    { id: "u3", sequence: 3, label: "สร้างกิจกรรม\\nใหม่", type: "process", swimlane: "user", connectTo: "s2" },
    { id: "u4", sequence: 4, label: "เลือกประเภท\\nกิจกรรม", type: "process", swimlane: "user", connectTo: "s3" },
    { id: "u5", sequence: 5, label: "กรอกรายละเอียด", type: "process", swimlane: "user" },
    { id: "u6", sequence: 6, label: "เลือกวันและเวลา", type: "process", swimlane: "user", connectTo: "s4" },
    { id: "u7", sequence: 7, label: "เชื่อมโยง\\nกับลีด/ดีล?", type: "decision", swimlane: "user" },
    { id: "u8", sequence: 8, label: "เลือกลีด\\nหรือดีล", type: "process", swimlane: "user", connectTo: "s5" },
    { id: "u9", sequence: 9, label: "บันทึกกิจกรรม", type: "process", swimlane: "user", connectTo: "s6" },
    { id: "u10", sequence: 10, label: "รับการแจ้งเตือน", type: "process", swimlane: "user", connectTo: "s7" },
    { id: "u11", sequence: 11, label: "END", type: "end", swimlane: "user" },
  ],
  systemSteps: [
    { id: "s1", sequence: 2, label: "แสดงปฏิทิน\\nรายเดือน", type: "process", swimlane: "system" },
    { id: "s2", sequence: 3, label: "เปิดฟอร์ม\\nกิจกรรม", type: "process", swimlane: "system" },
    { id: "s3", sequence: 4, label: "แสดงประเภท\\nกิจกรรม", type: "process", swimlane: "system" },
    { id: "s4", sequence: 6, label: "ตรวจสอบ\\nเวลาว่าง", type: "process", swimlane: "system" },
    { id: "s5", sequence: 8, label: "แสดงรายการ\\nที่เกี่ยวข้อง", type: "process", swimlane: "system" },
    { id: "s6", sequence: 9, label: "บันทึกใน\\nปฏิทิน", type: "process", swimlane: "system" },
    { id: "s7", sequence: 10, label: "ส่งการแจ้งเตือน\\nก่อนถึงเวลา", type: "external", swimlane: "system" },
  ],
};

// Export all flows as a collection (keyed by flow ID)
export const ALL_FLOWS: Record<string, FlowData> = {
  lead: LEAD_FLOW,
  contract: CONTRACT_FLOW,
  deal: DEAL_FLOW,
  quotation: QUOTATION_FLOW,
  approval: APPROVAL_FLOW,
  customer: CUSTOMER_FLOW,
  calendar: CALENDAR_FLOW,
};

export type FlowId = keyof typeof ALL_FLOWS;