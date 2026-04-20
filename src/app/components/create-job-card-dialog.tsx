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
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useTranslation } from "react-i18next";
import { CalendarIcon, Plus, X } from "lucide-react";
import { format } from "date-fns";
import { th } from "date-fns/locale";

interface CreateJobCardDialogProps {
  isOpen: boolean;
  onClose: () => void;
  customerName?: string;
}

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export function CreateJobCardDialog({
  isOpen,
  onClose,
  customerName = "Global Freight Solutions Inc.",
}: CreateJobCardDialogProps) {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: "1", description: "", quantity: 1, unitPrice: 0 },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "Medium",
    status: "Draft",
    specialInstructions: "",
  });

  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      {
        id: Date.now().toString(),
        description: "",
        quantity: 1,
        unitPrice: 0,
      },
    ]);
  };

  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((item) => item.id !== id));
    }
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: any) => {
    setLineItems(
      lineItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const calculateTotal = () => {
    return lineItems.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );
  };

  const handleCreate = () => {
    const jobCardData = {
      ...formData,
      startDate,
      endDate,
      lineItems,
      totalValue: calculateTotal(),
      customer: customerName,
    };
    console.log("Creating job card:", jobCardData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#4c1d95]">
            สร้างกิจกรรม
          </DialogTitle>
          <DialogDescription className="text-[#8b5cf6]">
            {customerName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Job Card Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#4c1d95] border-b border-[#ede9fe] pb-2">
              ข้อมูลงาน
            </h3>

            <div>
              <Label className="text-sm text-[#4c1d95] mb-2 block">
                ชื่องาน / หัวข้อ
              </Label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="เช่น การนำเสนอโปรแกรม CRM"
                className="border-2 border-[#ede9fe] rounded-xl focus:border-[#705add]"
              />
            </div>

            <div>
              <Label className="text-sm text-[#4c1d95] mb-2 block">
                รายละเอียดงาน
              </Label>
              <Textarea
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="อธิบายรายละเอียดของงานที่ต้องทำ..."
                className="border-2 border-[#ede9fe] rounded-xl focus:border-[#705add]"
              />
            </div>
          </div>

          {/* Assignment & Schedule */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#4c1d95] border-b border-[#ede9fe] pb-2">
              การมอบหมายและกำหนดการ
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-[#4c1d95] mb-2 block">
                  มอบหมายให้
                </Label>
                <Combobox
                  options={[
                    { value: "sarah-chen", label: "Sarah Chen" },
                    { value: "michael-park", label: "Michael Park" },
                    { value: "emily-rodriguez", label: "Emily Rodriguez" },
                    { value: "david-kim", label: "David Kim" },
                    { value: "lisa-anderson", label: "Lisa Anderson" },
                  ]}
                  value={formData.assignedTo}
                  onValueChange={(value) =>
                    setFormData({ ...formData, assignedTo: value })
                  }
                  placeholder="เลือกพนักงาน"
                  searchPlaceholder="ค้นหาพนักงาน..."
                  className="border-2 border-[#ede9fe] rounded-xl"
                />
              </div>

              <div>
                <Label className="text-sm text-[#4c1d95] mb-2 block">
                  สถานะ
                </Label>
                <Combobox
                  options={[
                    { value: "Draft", label: "Draft" },
                    { value: "In Progress", label: "In Progress" },
                    { value: "On Hold", label: "On Hold" },
                    { value: "Completed", label: "Completed" },
                  ]}
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                  placeholder="เลือกสถานะ"
                  searchPlaceholder="ค้นหาสถานะ..."
                  className="border-2 border-[#ede9fe] rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-sm text-[#4c1d95] mb-2 block">
                  ความสำคัญ
                </Label>
                <Combobox
                  options={[
                    { value: "Low", label: "ต่ำ" },
                    { value: "Medium", label: "ปานกลาง" },
                    { value: "High", label: "สูง" },
                    { value: "Urgent", label: "เร่งด่วน" },
                  ]}
                  value={formData.priority}
                  onValueChange={(value) =>
                    setFormData({ ...formData, priority: value })
                  }
                  placeholder="เลือกความสำคัญ"
                  searchPlaceholder="ค้นหาความสำคัญ..."
                  className="border-2 border-[#ede9fe] rounded-xl"
                />
              </div>

              <div>
                <Label className="text-sm text-[#4c1d95] mb-2 block">
                  วันที่เริ่มต้น
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left border-2 border-[#ede9fe] rounded-xl hover:bg-[#f5f3ff]"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-[#8b5cf6]" />
                      {startDate ? (
                        format(startDate, "PPP", { locale: th })
                      ) : (
                        <span className="text-gray-500">เลือกวันที่</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label className="text-sm text-[#4c1d95] mb-2 block">
                  วันที่กำหนดเสร็จ
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left border-2 border-[#ede9fe] rounded-xl hover:bg-[#f5f3ff]"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-[#8b5cf6]" />
                      {endDate ? (
                        format(endDate, "PPP", { locale: th })
                      ) : (
                        <span className="text-gray-500">เลือกวันที่</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#ede9fe] pb-2">
              <h3 className="text-sm font-semibold text-[#4c1d95]">
                รายการค่าใช้จ่าย
              </h3>
              <Button
                size="sm"
                onClick={addLineItem}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl border-0"
              >
                <Plus className="h-4 w-4 mr-1" />
                เพิ่มรายการ
              </Button>
            </div>

            <div className="space-y-3">
              {lineItems.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-3 items-start p-3 bg-[#faf8ff] rounded-xl border-2 border-[#ede9fe]"
                >
                  <div className="col-span-6">
                    <Label className="text-xs text-[#8b5cf6] mb-1 block">
                      รายการ
                    </Label>
                    <Input
                      value={item.description}
                      onChange={(e) =>
                        updateLineItem(item.id, "description", e.target.value)
                      }
                      placeholder="เช่น ค่าขนส่ง"
                      className="border-2 border-[#ede9fe] rounded-lg text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-xs text-[#8b5cf6] mb-1 block">
                      จำนวน
                    </Label>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateLineItem(
                          item.id,
                          "quantity",
                          Number(e.target.value)
                        )
                      }
                      className="border-2 border-[#ede9fe] rounded-lg text-sm"
                    />
                  </div>
                  <div className="col-span-3">
                    <Label className="text-xs text-[#8b5cf6] mb-1 block">
                      ราคา/หน่วย ($)
                    </Label>
                    <Input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) =>
                        updateLineItem(
                          item.id,
                          "unitPrice",
                          Number(e.target.value)
                        )
                      }
                      className="border-2 border-[#ede9fe] rounded-lg text-sm"
                    />
                  </div>
                  <div className="col-span-1 flex items-end justify-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLineItem(item.id)}
                      disabled={lineItems.length === 1}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-end">
              <div className="bg-gradient-to-br from-[#f5f3ff] to-white rounded-xl p-4 border-2 border-[#ede9fe] min-w-[250px]">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#8b5cf6] font-medium">
                    มูลค่ารวม
                  </span>
                  <span className="text-2xl text-[#705add] font-bold">
                    ${calculateTotal().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Special Instructions */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#4c1d95] border-b border-[#ede9fe] pb-2">
              คำแนะนำพิเศษ
            </h3>

            <div>
              <Label className="text-sm text-[#4c1d95] mb-2 block">
                หมายเหตุ
              </Label>
              <Textarea
                rows={4}
                value={formData.specialInstructions}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    specialInstructions: e.target.value,
                  })
                }
                placeholder="ระบุคำแนะนำพิเศษหรือข้อกำหนดเพิ่มเติม..."
                className="border-2 border-[#ede9fe] rounded-xl focus:border-[#705add]"
              />
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-[#ede9fe]">
          <div className="text-sm text-[#8b5cf6]">
            กิจกรรมจะถูกสร้างในสถานะ "Draft"
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-2 border-[#ede9fe] text-[#4c1d95] hover:bg-[#f5f3ff] rounded-xl"
            >
              ยกเลิก
            </Button>
            <Button
              onClick={handleCreate}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl border-0"
            >
              สร้างกิจกรรม
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}