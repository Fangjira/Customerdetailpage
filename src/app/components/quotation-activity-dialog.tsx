import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Combobox, ComboboxOption } from "./ui/combobox";
import { useTranslation } from "react-i18next";
import {
  Calendar,
  CheckCircle2,
  User,
  FileText,
  Clock,
  Building2,
  Tag,
  X,
  ChevronsUpDown,
  Check,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { cn } from "./ui/utils";

interface QuotationActivityDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onActivityCreated?: (activityData: any) => void; // Callback to sync with calendar
}

export function QuotationActivityDialog({
  isOpen,
  onClose,
  onActivityCreated,
}: QuotationActivityDialogProps) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form state
  const [activityTitle, setActivityTitle] = useState("");
  const [activityType, setActivityType] = useState("meeting");
  const [priority, setPriority] = useState("medium");
  const [assignedTo, setAssignedTo] = useState("sarah_chen");
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  );
  const [dueTime, setDueTime] = useState("10:00");
  const [description, setDescription] = useState("");
  const [relatedQuotation, setRelatedQuotation] = useState("");
  const [relatedCustomer, setRelatedCustomer] = useState("");

  const [customerOpen, setCustomerOpen] = useState(false);
  const [customerSearch, setCustomerSearch] = useState("");

  const [activityId] = useState(
    `ACT-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`
  );

  // Sample customer list
  const customers = [
    { id: "C001", name: "บริษัท ไทยเบฟเวอเรจ จำกัด (มหาชน)" },
    { id: "C002", name: "บริษัท เซ็นทรัล รีเทล คอร์ปอเรชั่น จำกัด (มหาชน)" },
    { id: "C003", name: "บริษัท ซีพี ออลล์ จำกัด (มหาชน)" },
    { id: "C004", name: "บริษัท ปูนซีเมนต์ไทย จำกัด (มหาชน)" },
    { id: "C005", name: "บริษัท แอดวานซ์ อินโฟร์ เซอร์วิส จำกัด (มหาชน)" },
    { id: "C006", name: "บริษัท เมเจอร์ ซีนีเพล็กซ์ กรุ๊ป จำกัด (มหาชน)" },
    { id: "C007", name: "บริษัท ทรู คอร์ปอเรชั่น จำกัด (มหาชน)" },
    { id: "C008", name: "บริษัท โฮม โปรดักส์ เซ็นเตอร์ จำกัด (มหาชน)" },
    { id: "C009", name: "บริษัท แอลจี อิเล็คทรอนิคส์ (ประเทศไทย) จำกัด" },
    { id: "C010", name: "บริษัท ซัมซุง อิเล็คทรอนิคส์ (ประเทศไทย) จำกัด" },
    { id: "C011", name: "บริษัท เนสท์เล่ (ไทย) จำกัด" },
    { id: "C012", name: "บริษัท ยูนิลีเวอร์ ไทย เทรดดิ้ง จำกัด" },
    { id: "C013", name: "บริษัท คาร์กิลล์ สยาม จำกัด" },
    { id: "C014", name: "บริษัท ไมโครซอฟท์ (ประเทศไทย) จำกัด" },
    { id: "C015", name: "บริษัท ออราเคิล (ประเทศไทย) จำกัด" },
  ];

  // Filter customers based on search
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(customerSearch.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create activity data
    const activityData = {
      id: activityId,
      title: activityTitle,
      type: activityType,
      priority,
      assignedTo,
      dueDate: `${dueDate}T${dueTime}:00`,
      description,
      relatedQuotation,
      relatedCustomer,
      status: "pending",
      createdAt: new Date().toISOString(),
      syncedToCalendar: true, // Flag to indicate this should appear in calendar
    };

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);

      // Call the callback to sync with calendar
      if (onActivityCreated) {
        onActivityCreated(activityData);
      }

      // Reset after showing success
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        // Reset form
        setActivityTitle("");
        setActivityType("meeting");
        setPriority("medium");
        setAssignedTo("sarah_chen");
        setDueDate(
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0]
        );
        setDueTime("10:00");
        setDescription("");
        setRelatedQuotation("");
        setRelatedCustomer("");
      }, 2000);
    }, 1500);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "not_urgent":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case "meeting":
        return "bg-[#ddd6fe] text-[#5b21b6] border-[#c4b5fd]"; // Pastel Purple
      case "call":
        return "bg-[#bfdbfe] text-[#1e3a8a] border-[#93c5fd]"; // Pastel Blue
      case "email":
        return "bg-[#fed7aa] text-[#7c2d12] border-[#fdba74]"; // Pastel Orange
      case "task":
        return "bg-[#bbf7d0] text-[#14532d] border-[#86efac]"; // Pastel Green
      case "presentation":
        return "bg-[#fecaca] text-[#7f1d1d] border-[#fca5a5]"; // Pastel Red
      case "follow_up":
        return "bg-[#fbcfe8] text-[#831843] border-[#f9a8d4]"; // Pastel Pink
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getActivityTypeIcon = (type: string) => {
    switch (type) {
      case "meeting":
        return "🤝";
      case "call":
        return "📞";
      case "email":
        return "✉️";
      case "task":
        return "✅";
      case "presentation":
        return "📊";
      case "follow_up":
        return "🔄";
      default:
        return "📋";
    }
  };

  const getActivityTypeText = (type: string) => {
    switch (type) {
      case "meeting":
        return "ประชุม";
      case "call":
        return "โทรศัพท์";
      case "email":
        return "อีเมล";
      case "task":
        return "งาน";
      case "presentation":
        return "นำเสนอ";
      case "follow_up":
        return "ติดตาม";
      default:
        return type;
    }
  };

  if (showSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogTitle className="sr-only">
            สร้างกิจกรรมสำเร็จ!
          </DialogTitle>
          <DialogDescription className="sr-only">
            กิจกรรมใบเสนอราคาถูกสร้างเรียบร้อยแล้ว
          </DialogDescription>
          <div className="flex flex-col items-center justify-center py-12 px-6">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl text-gray-900 mb-2">
              สร้างกิจกรรมสำเร็จ!
            </h3>
            <p className="text-sm text-gray-600 text-center">
              กิจกรรมใบเสนอราคาถูกสร้างและซิงค์กับปฏิทินแล้ว
            </p>
            <Badge
              variant="secondary"
              className="mt-4 bg-purple-100 text-purple-700"
            >
              {activityId}
            </Badge>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[#4c1d95]">
            <Calendar className="h-5 w-5 text-[#705add]" />
            สร้างกิจกรรมใบเสนอราคา
          </DialogTitle>
          <DialogDescription className="text-sm text-[#8b5cf6] mt-1">
            สร้างกิจกรรมที่เกี่ยวข้องกับใบเสนอราคา (ซิงค์กับปฏิทินอัตโนมัติ)
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Activity Details */}
          <div className="border-2 border-[#ede9fe] rounded-xl p-6">
            <h3 className="text-sm font-semibold text-[#4c1d95] mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#705add]" />
              รายละเอียดกิจกรรม
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="activity-title" className="text-[#4c1d95]">
                  ชื่อกิจกรรม *
                </Label>
                <Input
                  id="activity-title"
                  value={activityTitle}
                  onChange={(e) => setActivityTitle(e.target.value)}
                  placeholder="ระบุชื่อกิจกรรม..."
                  className="mt-1.5 border-[#ede9fe] focus:border-[#705add] focus:ring-[#705add]"
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="activity-type" className="text-[#4c1d95]">
                    ประเภทกิจกรรม *
                  </Label>
                  <Combobox
                    options={[
                      { value: "meeting", label: "🤝 ประชุม" },
                      { value: "call", label: "📞 โทรศัพท์" },
                      { value: "email", label: "✉️ อีเมล" },
                      { value: "task", label: "✅ งาน" },
                      { value: "presentation", label: "📊 นำเสนอ" },
                      { value: "followup", label: "📋 ติดตาม" },
                    ]}
                    value={activityType}
                    onValueChange={setActivityType}
                    placeholder="เลือกประเภท..."
                    searchPlaceholder="ค้นหา..."
                    className="mt-1.5 border-[#ede9fe] focus:border-[#705add] focus:ring-[#705add]"
                  />
                </div>

                <div>
                  <Label htmlFor="priority" className="text-[#4c1d95]">
                    ลำดับความสำคัญ *
                  </Label>
                  <Combobox
                    options={[
                      { value: "high", label: "🔴 ด่วน" },
                      { value: "medium", label: "🟡 ปานกลาง" },
                      { value: "low", label: "🟢 ไม่ด่วน" },
                    ]}
                    value={priority}
                    onValueChange={setPriority}
                    placeholder="เลือกความสำคัญ..."
                    searchPlaceholder="ค้นหา..."
                    className="mt-1.5 border-[#ede9fe] focus:border-[#705add] focus:ring-[#705add]"
                  />
                </div>

                <div>
                  <Label htmlFor="assigned-to" className="text-[#4c1d95]">
                    มอบหมายให้ *
                  </Label>
                  <Combobox
                    options={[
                      { value: "sarah_chen", label: "👤 Sarah Chen (Sales Manager)" },
                      { value: "michael_wong", label: "👤 Michael Wong (Account Executive)" },
                      { value: "jessica_taylor", label: "👤 Jessica Taylor (Sales Rep)" },
                      { value: "david_kim", label: "👤 David Kim (Business Dev)" },
                    ]}
                    value={assignedTo}
                    onValueChange={setAssignedTo}
                    placeholder="เลือกพนักงาน..."
                    searchPlaceholder="ค้นหา..."
                    className="mt-1.5 border-[#ede9fe] focus:border-[#705add] focus:ring-[#705add]"
                  />
                </div>

                <div>
                  <Label htmlFor="due-date" className="text-[#4c1d95]">
                    วันที่ *
                  </Label>
                  <Input
                    id="due-date"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="mt-1.5 border-[#ede9fe] focus:border-[#705add] focus:ring-[#705add]"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-[#4c1d95]">
                  รายละเอียดกิจกรรม
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="ระบุรายละเอียดเพิ่มเติม..."
                  className="mt-1.5 min-h-[120px] border-[#ede9fe] focus:border-[#705add] focus:ring-[#705add]"
                />
              </div>
            </div>
          </div>

          {/* Related Quotation & Customer - Optional */}
          <div className="bg-gradient-to-br from-[#faf8ff] to-white border-2 border-[#ede9fe] rounded-xl p-6">
            <h3 className="text-sm font-semibold text-[#4c1d95] mb-4 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-[#705add]" />
              ข้อมูลที่เกี่ยวข้อง (ไม่จำเป็น)
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="related-quotation" className="text-[#4c1d95]">
                  ใบเสนอราคาที่เกี่ยวข้อง
                </Label>
                <Combobox
                  options={[
                    { value: "QT-2024-001", label: "QT-2024-001 - International Air Freight Quote" },
                    { value: "QT-2024-002", label: "QT-2024-002 - Warehouse Services Package" },
                    { value: "QT-2024-003", label: "QT-2024-003 - Customs Clearance Services" },
                    { value: "QT-2024-004", label: "QT-2024-004 - Last Mile Distribution Network" },
                    { value: "QT-2024-005", label: "QT-2024-005 - Cold Chain Logistics Solution" },
                    { value: "QT-2024-006", label: "QT-2024-006 - Sea Freight Full Container Load" },
                    { value: "QT-2024-007", label: "QT-2024-007 - Express Delivery Services" },
                  ]}
                  value={relatedQuotation}
                  onValueChange={setRelatedQuotation}
                  placeholder="เลือกใบเสนอราคา..."
                  searchPlaceholder="ค้นหาใบเสนอราคา..."
                  className="mt-1.5 border-[#ede9fe] focus:border-[#705add] focus:ring-[#705add]"
                />
              </div>

              <div>
                <Label htmlFor="related-customer" className="text-[#4c1d95]">
                  ลูกค้าที่เกี่ยวข้อง
                </Label>
                <div className="relative">
                  <Input
                    id="related-customer"
                    value={relatedCustomer}
                    onChange={(e) => {
                      setRelatedCustomer(e.target.value);
                      setCustomerSearch(e.target.value);
                      setCustomerOpen(true); // เปิดทันทีเมื่อพิมพ์
                    }}
                    onFocus={() => {
                      setCustomerSearch(relatedCustomer);
                      setCustomerOpen(true);
                    }}
                    placeholder="ระบุชื่อลูกค้า..."
                    className="mt-1.5 border-[#ede9fe] focus:border-[#705add] focus:ring-[#705add] pr-8"
                  />
                  <ChevronsUpDown className="absolute right-2 top-[1.375rem] h-4 w-4 opacity-50 pointer-events-none" />
                  {customerOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                      {filteredCustomers.length === 0 ? (
                        <div className="px-3 py-2 text-sm text-gray-500">
                          {customerSearch ? `ใช้: "${customerSearch}"` : "ไม่พบลูกค้า"}
                        </div>
                      ) : (
                        <div className="py-1">
                          {filteredCustomers.map((customer) => (
                            <div
                              key={customer.id}
                              className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                              onClick={() => {
                                setRelatedCustomer(customer.name);
                                setCustomerOpen(false);
                                setCustomerSearch("");
                              }}
                            >
                              <Check
                                className={cn(
                                  "h-4 w-4",
                                  relatedCustomer === customer.name
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {customer.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sync Info */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-900 mb-1">
                  ซิงค์กับปฏิทินอัตโนมัติ
                </p>
                <p className="text-xs text-blue-700">
                  กิจกรรมนี้จะปรากฏในปฏิทินของคุณโดยอัตโนมัติ และสามารถเข้าถึงได้จากหน้าปฏิทิน
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#ede9fe]">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-[#ede9fe] text-[#705add] hover:bg-[#f5f3ff] rounded-xl"
            >
              ยกเลิก
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !activityTitle}
              className="bg-[#705add] hover:bg-[#5b21b6] text-white rounded-xl"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  กำลังสร้าง...
                </>
              ) : (
                <>
                  <Calendar className="mr-2 h-4 w-4" />
                  สร้างกิจกรรม
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}