// Shared constants for task-related components

export const TITLE_TYPES = [
  { value: "ติดตามลูกค้า", label: "ติดตามลูกค้า - Follow up customer" },
  { value: "เตรียมใบเสนอราคา", label: "เตรียมใบเสนอราคา - Prepare quotation" },
  { value: "นัดหมายลูกค้า", label: "📅 นัดหมายลูกค้า - Schedule meeting" },
  { value: "เข้าพบลูกค้า", label: "📍 เข้าพบลูกค้า - Visit customer" },
  { value: "ส่งเอกสาร", label: "ส่งเอกสาร - Send documents" },
  { value: "ตรวจสอบสถานะดีล", label: "ตรวจสอบสถานะดีล - Check deal status" },
  { value: "โทรติดต่อลูกค้า", label: "โทรติดต่อลูกค้า - Call customer" },
  { value: "ส่งอีเมล", label: "ส่งอีเมล - Send email" },
  { value: "ทำสัญญา", label: "ทำสัญญา - Prepare contract" },
  { value: "ส่งมอบสินค้า/บริการ", label: "ส่งมอบสินค้า/บริการ - Deliver service" },
  { value: "แก้ไขปัญหา", label: "แก้ไขปัญหา - Resolve issue" },
  { value: "ประชุมทีม", label: "ประชุมทีม - Team meeting" },
  { value: "ทำรายงาน", label: "ทำรายงาน - Prepare report" },
  { value: "อัพเดทข้อมูล", label: "อัพเดทข้อมูล - Update information" },
  { value: "other", label: "📝 อื่นๆ (กรอกเอง)" },
];

export const SERVICE_TOPICS = [
  { value: "freight", label: "Freight (ขนส่งสินค้า)" },
  { value: "warehouse", label: "Warehouse (คลังสินค้า)" },
  { value: "customs", label: "Customs (ศุลกากร)" },
  { value: "packaging", label: "Packaging (บรรจุภัณฑ์)" },
  { value: "distribution", label: "Distribution (กระจายสินค้า)" },
];

export const PRIORITY_LEVELS = [
  { value: "high", label: "High - สูง" },
  { value: "medium", label: "Medium - ปานกลาง" },
  { value: "low", label: "Low - ต่ำ" },
];

export const TASK_STATUSES = [
  { value: "todo", label: "To Do" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "review", label: "Review" },
];

export const TITLE_TYPE_CONFIG: Record<string, { label: string; color: string }> = {
  customer_visit: { label: "เยี่ยมลูกค้า", color: "blue" },
  meeting: { label: "ประชุม", color: "purple" },
  follow_up: { label: "ติดตาม", color: "emerald" },
  site_survey: { label: "สำรวจ", color: "orange" },
  sales_meeting: { label: "ประชุมขาย", color: "indigo" },
  internal_meeting: { label: "ประชุมภายใน", color: "gray" },
  quotation: { label: "เสนอราคา", color: "yellow" },
  demo: { label: "สาธิต", color: "pink" },
};

// Generate time options in 15-minute intervals
export const generateTimeOptions = () => {
  const times: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const h = hour.toString().padStart(2, '0');
      const m = minute.toString().padStart(2, '0');
      times.push(`${h}:${m}`);
    }
  }
  return times;
};

export const TIME_OPTIONS = generateTimeOptions();

export const CUSTOMERS = [
  { value: "pacific", label: "Pacific Distribution Co." },
  { value: "scg", label: "SCG Chemicals" },
  { value: "ptt", label: "PTT Group" },
  { value: "cpall", label: "CP ALL" },
  { value: "central", label: "Central Group" },
];

export const TEAM_MEMBERS = [
  { value: "sarah", label: "Sarah Chen" },
  { value: "michael", label: "Michael Wong" },
  { value: "david", label: "David Lee" },
  { value: "lisa", label: "Lisa Wang" },
  { value: "john", label: "John Smith" },
];
