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
import {
  CalendarIcon,
  Plus,
  X,
  Upload,
  FileText,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle2,
} from "lucide-react";
import { format, addMonths, addYears } from "date-fns";
import { th } from "date-fns/locale";
import { Badge } from "./ui/badge";

interface RenewContractDialogProps {
  isOpen: boolean;
  onClose: () => void;
  contractData?: {
    contractNumber: string;
    contractTitle: string;
    customer: string;
    currentValue: string;
    startDate: string;
    endDate: string;
    currentTermMonths: number;
  };
}

interface ServiceLineItem {
  id: string;
  service: string;
  currentRate: string;
  newRate: string;
  currentVolume: string;
  newVolume: string;
  monthlyValue: number;
  annualValue: number;
}

export function RenewContractDialog({
  isOpen,
  onClose,
  contractData,
}: RenewContractDialogProps) {
  const { t } = useTranslation();
  const [renewalStartDate, setRenewalStartDate] = useState<Date>();
  const [renewalEndDate, setRenewalEndDate] = useState<Date>();
  
  const [formData, setFormData] = useState({
    renewalType: "standard",
    newContractNumber: "",
    termLength: contractData?.currentTermMonths?.toString() || "24",
    termUnit: "months",
    paymentTerms: "Net 30",
    creditLimit: "",
    autoRenewal: "yes",
    priceAdjustment: "0",
    priceAdjustmentType: "percentage",
    renewalReason: "",
    specialTerms: "",
  });

  const [lineItems, setLineItems] = useState<ServiceLineItem[]>([
    {
      id: "1",
      service: "Air Freight - International Express",
      currentRate: "$450/kg",
      newRate: "$480/kg",
      currentVolume: "500 kg/month",
      newVolume: "600 kg/month",
      monthlyValue: 288000,
      annualValue: 3456000,
    },
    {
      id: "2",
      service: "Customs Clearance",
      currentRate: "$2,000/month",
      newRate: "$2,000/month",
      currentVolume: "Monthly Service",
      newVolume: "Monthly Service",
      monthlyValue: 2000,
      annualValue: 24000,
    },
  ]);

  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      {
        id: Date.now().toString(),
        service: "",
        currentRate: "",
        newRate: "",
        currentVolume: "",
        newVolume: "",
        monthlyValue: 0,
        annualValue: 0,
      },
    ]);
  };

  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((item) => item.id !== id));
    }
  };

  const updateLineItem = (
    id: string,
    field: keyof ServiceLineItem,
    value: any
  ) => {
    setLineItems(
      lineItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const calculateTotalValue = () => {
    return lineItems.reduce((sum, item) => sum + item.annualValue, 0);
  };

  const calculateValueChange = () => {
    const currentValue = parseFloat(
      contractData?.currentValue?.replace(/[$,]/g, "") || "0"
    );
    const newValue = calculateTotalValue();
    return newValue - currentValue;
  };

  const calculatePercentageChange = () => {
    const currentValue = parseFloat(
      contractData?.currentValue?.replace(/[$,]/g, "") || "1"
    );
    const change = calculateValueChange();
    return ((change / currentValue) * 100).toFixed(2);
  };

  const handleTermLengthChange = (value: string) => {
    setFormData({ ...formData, termLength: value });
    if (renewalStartDate) {
      if (formData.termUnit === "months") {
        setRenewalEndDate(addMonths(renewalStartDate, parseInt(value)));
      } else {
        setRenewalEndDate(addYears(renewalStartDate, parseInt(value)));
      }
    }
  };

  const handleStartDateChange = (date: Date | undefined) => {
    setRenewalStartDate(date);
    if (date) {
      const term = parseInt(formData.termLength);
      if (formData.termUnit === "months") {
        setRenewalEndDate(addMonths(date, term));
      } else {
        setRenewalEndDate(addYears(date, term));
      }
    }
  };

  const handleSubmit = () => {
    const renewalData = {
      ...formData,
      renewalStartDate,
      renewalEndDate,
      lineItems,
      totalValue: calculateTotalValue(),
      valueChange: calculateValueChange(),
      percentageChange: calculatePercentageChange(),
      originalContract: contractData?.contractNumber,
      submittedDate: new Date(),
    };
    console.log("Submitting contract renewal:", renewalData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#4c1d95]">
            ต่อสัญญา (Contract Renewal)
          </DialogTitle>
          <DialogDescription className="space-y-1">
            <span className="text-[#8b5cf6] block">
              {contractData?.contractTitle || "Master Service Agreement"}
            </span>
            <span className="text-sm text-gray-600 block">
              สัญญาเดิม: {contractData?.contractNumber || "CNT-2024-4820"} | 
              หมดอายุ: {contractData?.endDate || "31 ม.ค. 2568"}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Renewal Type */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#4c1d95] border-b border-[#ede9fe] pb-2">
              ประเภทการต่อสัญญา
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() =>
                  setFormData({ ...formData, renewalType: "standard" })
                }
                className={`p-5 rounded-xl border-2 transition-all ${
                  formData.renewalType === "standard"
                    ? "border-[#705add] bg-[#f5f3ff]"
                    : "border-[#ede9fe] hover:bg-[#faf8ff]"
                }`}
              >
                <CheckCircle2
                  className={`h-6 w-6 mb-3 ${
                    formData.renewalType === "standard"
                      ? "text-[#705add]"
                      : "text-gray-400"
                  }`}
                />
                <p className="text-base font-semibold text-[#4c1d95] mb-1">
                  Standard Renewal
                </p>
                <p className="text-sm text-gray-600">
                  ต่อสัญญาตามเงื่อนไขเดิมทุกประการ ไม่มีการเปลี่ยนแปลง
                </p>
              </button>

              <button
                onClick={() =>
                  setFormData({ ...formData, renewalType: "modified" })
                }
                className={`p-5 rounded-xl border-2 transition-all ${
                  formData.renewalType === "modified"
                    ? "border-[#705add] bg-[#f5f3ff]"
                    : "border-[#ede9fe] hover:bg-[#faf8ff]"
                }`}
              >
                <TrendingUp
                  className={`h-6 w-6 mb-3 ${
                    formData.renewalType === "modified"
                      ? "text-[#705add]"
                      : "text-gray-400"
                  }`}
                />
                <p className="text-base font-semibold text-[#4c1d95] mb-1">
                  Modified Renewal
                </p>
                <p className="text-sm text-gray-600">
                  ต่อสัญญาพร้อมปรับเงื่อนไข ราคา บริการ หรือปริมาณ
                </p>
              </button>
            </div>
          </div>

          {/* Contract Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#4c1d95] border-b border-[#ede9fe] pb-2">
              ข้อมูลสัญญาใหม่
            </h3>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-sm text-[#4c1d95] mb-2 block">
                  เลขที่สัญญาใหม่
                </Label>
                <Input
                  value={formData.newContractNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      newContractNumber: e.target.value,
                    })
                  }
                  placeholder="CNT-2025-001"
                  className="border-2 border-[#ede9fe] rounded-xl focus:border-[#705add]"
                />
              </div>

              <div>
                <Label className="text-sm text-[#4c1d95] mb-2 block">
                  วันที่เริ่มสัญญาใหม่
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left border-2 border-[#ede9fe] rounded-xl hover:bg-[#f5f3ff]"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-[#8b5cf6]" />
                      {renewalStartDate ? (
                        format(renewalStartDate, "PPP", { locale: th })
                      ) : (
                        <span className="text-gray-500">เลือกวันที่</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={renewalStartDate}
                      onSelect={handleStartDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label className="text-sm text-[#4c1d95] mb-2 block">
                  วันที่สิ้นสุด (คำนวณอัตโนมัติ)
                </Label>
                <Input
                  value={
                    renewalEndDate
                      ? format(renewalEndDate, "PPP", { locale: th })
                      : ""
                  }
                  disabled
                  className="border-2 border-[#ede9fe] rounded-xl bg-[#f5f3ff]"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2">
                <Label className="text-sm text-[#4c1d95] mb-2 block">
                  ระยะเวลาสัญญา
                </Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={formData.termLength}
                    onChange={(e) => handleTermLengthChange(e.target.value)}
                    className="border-2 border-[#ede9fe] rounded-xl focus:border-[#705add]"
                  />
                  <Combobox
                    options={[
                      { value: "months", label: "เดือน" },
                      { value: "years", label: "ปี" },
                    ]}
                    value={formData.termUnit}
                    onValueChange={(value) =>
                      setFormData({ ...formData, termUnit: value })
                    }
                    placeholder="หน่วย..."
                    searchPlaceholder="ค้นหา..."
                    className="border-2 border-[#ede9fe] rounded-xl w-32"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm text-[#4c1d95] mb-2 block">
                  เงื่อนไขการชำระเงิน
                </Label>
                <Combobox
                  options={[
                    { value: "Net 15", label: "Net 15" },
                    { value: "Net 30", label: "Net 30" },
                    { value: "Net 45", label: "Net 45" },
                    { value: "Net 60", label: "Net 60" },
                    { value: "Net 90", label: "Net 90" },
                  ]}
                  value={formData.paymentTerms}
                  onValueChange={(value) =>
                    setFormData({ ...formData, paymentTerms: value })
                  }
                  placeholder="เลือกเงื่อนไข..."
                  searchPlaceholder="ค้นหา..."
                  className="border-2 border-[#ede9fe] rounded-xl"
                />
              </div>

              <div>
                <Label className="text-sm text-[#4c1d95] mb-2 block">
                  ต่ออายุอัตโนมัติ?
                </Label>
                <Combobox
                  options={[
                    { value: "yes", label: "เปิดใช้งาน" },
                    { value: "no", label: "ปิดใช้งาน" },
                  ]}
                  value={formData.autoRenewal}
                  onValueChange={(value) =>
                    setFormData({ ...formData, autoRenewal: value })
                  }
                  placeholder="เลือก..."
                  searchPlaceholder="ค้นหา..."
                  className="border-2 border-[#ede9fe] rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Price Adjustment */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#4c1d95] border-b border-[#ede9fe] pb-2">
              การปรับราคา
            </h3>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-sm text-[#4c1d95] mb-2 block">
                  การปรับราคา
                </Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={formData.priceAdjustment}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        priceAdjustment: e.target.value,
                      })
                    }
                    className="border-2 border-[#ede9fe] rounded-xl focus:border-[#705add]"
                  />
                  <Combobox
                    options={[
                      { value: "percentage", label: "%" },
                      { value: "fixed", label: "$" },
                    ]}
                    value={formData.priceAdjustmentType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, priceAdjustmentType: value })
                    }
                    placeholder="ประเภท..."
                    searchPlaceholder="ค้นหา..."
                    className="border-2 border-[#ede9fe] rounded-xl w-32"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  ระบุเป็น + (เพิ่ม) หรือ - (ลด)
                </p>
              </div>

              <div>
                <Label className="text-sm text-[#4c1d95] mb-2 block">
                  วงเงินเครดิต
                </Label>
                <Input
                  type="text"
                  value={formData.creditLimit}
                  onChange={(e) =>
                    setFormData({ ...formData, creditLimit: e.target.value })
                  }
                  placeholder="$100,000"
                  className="border-2 border-[#ede9fe] rounded-xl focus:border-[#705add]"
                />
              </div>

              <div>
                <Label className="text-sm text-[#4c1d95] mb-2 block">
                  &nbsp;
                </Label>
                <div className="bg-gradient-to-r from-[#f5f3ff] to-white rounded-xl p-3 border-2 border-[#ede9fe]">
                  <p className="text-xs text-gray-600">
                    การปรับราคา {formData.priceAdjustment}
                    {formData.priceAdjustmentType === "percentage" ? "%" : "$"}
                  </p>
                  <p className="text-lg font-bold text-[#705add]">
                    {formData.priceAdjustment === "0"
                      ? "ไม่ปรับราคา"
                      : parseFloat(formData.priceAdjustment) > 0
                      ? "เพิ่มขึ้น"
                      : "ลดลง"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Service Line Items */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#ede9fe] pb-2">
              <h3 className="text-sm font-semibold text-[#4c1d95]">
                รายการบริการและราคา
              </h3>
              <Button
                size="sm"
                onClick={addLineItem}
                className="bg-gradient-to-r from-[#a78bfa] to-[#705add] hover:from-[#8b5cf6] hover:to-[#6d28d9] text-white rounded-xl border-0"
              >
                <Plus className="h-4 w-4 mr-1" />
                เพิ่มบริการ
              </Button>
            </div>

            <div className="space-y-3">
              {lineItems.map((item, index) => (
                <div
                  key={item.id}
                  className="p-4 bg-[#faf8ff] rounded-xl border-2 border-[#ede9fe]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium text-[#705add]">
                        บริการที่ {index + 1}
                      </h4>
                      {item.newRate !== item.currentRate && (
                        <Badge
                          variant="secondary"
                          className="bg-orange-100 text-orange-700 text-xs"
                        >
                          ปรับราคา
                        </Badge>
                      )}
                      {item.newVolume !== item.currentVolume && (
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-700 text-xs"
                        >
                          ปรับปริมาณ
                        </Badge>
                      )}
                    </div>
                    {lineItems.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeLineItem(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-3">
                      <Label className="text-xs text-[#8b5cf6] mb-1 block">
                        ชื่อบริการ
                      </Label>
                      <Input
                        value={item.service}
                        onChange={(e) =>
                          updateLineItem(item.id, "service", e.target.value)
                        }
                        placeholder="เช่น Air Freight"
                        className="border-2 border-[#ede9fe] rounded-lg text-sm"
                      />
                    </div>

                    <div className="col-span-2">
                      <Label className="text-xs text-[#8b5cf6] mb-1 block">
                        อัตราเดิม
                      </Label>
                      <Input
                        value={item.currentRate}
                        onChange={(e) =>
                          updateLineItem(
                            item.id,
                            "currentRate",
                            e.target.value
                          )
                        }
                        className="border-2 border-[#ede9fe] rounded-lg text-sm bg-gray-50"
                      />
                    </div>

                    <div className="col-span-2">
                      <Label className="text-xs text-[#8b5cf6] mb-1 block">
                        อัตราใหม่
                      </Label>
                      <Input
                        value={item.newRate}
                        onChange={(e) =>
                          updateLineItem(item.id, "newRate", e.target.value)
                        }
                        className="border-2 border-[#ede9fe] rounded-lg text-sm"
                      />
                    </div>

                    <div className="col-span-2">
                      <Label className="text-xs text-[#8b5cf6] mb-1 block">
                        ปริมาณเดิม
                      </Label>
                      <Input
                        value={item.currentVolume}
                        onChange={(e) =>
                          updateLineItem(
                            item.id,
                            "currentVolume",
                            e.target.value
                          )
                        }
                        className="border-2 border-[#ede9fe] rounded-lg text-sm bg-gray-50"
                      />
                    </div>

                    <div className="col-span-2">
                      <Label className="text-xs text-[#8b5cf6] mb-1 block">
                        ปริมาณใหม่
                      </Label>
                      <Input
                        value={item.newVolume}
                        onChange={(e) =>
                          updateLineItem(item.id, "newVolume", e.target.value)
                        }
                        className="border-2 border-[#ede9fe] rounded-lg text-sm"
                      />
                    </div>

                    <div className="col-span-1 flex items-end">
                      <div className="text-center text-xs text-gray-500">
                        →
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div>
                      <Label className="text-xs text-[#8b5cf6] mb-1 block">
                        มูลค่ารายเดือน ($)
                      </Label>
                      <Input
                        type="number"
                        value={item.monthlyValue}
                        onChange={(e) =>
                          updateLineItem(
                            item.id,
                            "monthlyValue",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="border-2 border-[#ede9fe] rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-[#8b5cf6] mb-1 block">
                        มูลค่ารายปี ($)
                      </Label>
                      <Input
                        type="number"
                        value={item.annualValue}
                        onChange={(e) =>
                          updateLineItem(
                            item.id,
                            "annualValue",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="border-2 border-[#ede9fe] rounded-lg text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Value Summary */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-gradient-to-br from-[#f5f3ff] to-white rounded-xl p-4 border-2 border-[#ede9fe]">
                <p className="text-xs text-gray-600 mb-1">มูลค่าสัญญาเดิม</p>
                <p className="text-xl font-bold text-gray-700">
                  {contractData?.currentValue || "$2,729,000"}
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#f5f3ff] to-white rounded-xl p-4 border-2 border-[#ede9fe]">
                <p className="text-xs text-gray-600 mb-1">มูลค่าสัญญาใหม่</p>
                <p className="text-xl font-bold text-[#705add]">
                  ${calculateTotalValue().toLocaleString()}
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#f5f3ff] to-white rounded-xl p-4 border-2 border-[#ede9fe]">
                <p className="text-xs text-gray-600 mb-1">การเปลี่ยนแปลง</p>
                <div className="flex items-center gap-2">
                  {calculateValueChange() > 0 ? (
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  ) : calculateValueChange() < 0 ? (
                    <TrendingDown className="h-5 w-5 text-red-600" />
                  ) : (
                    <Minus className="h-5 w-5 text-gray-600" />
                  )}
                  <p
                    className={`text-xl font-bold ${
                      calculateValueChange() > 0
                        ? "text-green-600"
                        : calculateValueChange() < 0
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {calculateValueChange() > 0 ? "+" : ""}$
                    {Math.abs(calculateValueChange()).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    ({calculatePercentageChange()}%)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Renewal Reason & Special Terms */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#4c1d95] border-b border-[#ede9fe] pb-2">
              เหตุผลและเงื่อนไขพิเศษ
            </h3>

            <div>
              <Label className="text-sm text-[#4c1d95] mb-2 block">
                เหตุผลในการต่อสัญญา
              </Label>
              <Textarea
                rows={3}
                value={formData.renewalReason}
                onChange={(e) =>
                  setFormData({ ...formData, renewalReason: e.target.value })
                }
                placeholder="ระบุเหตุผล เช่น ความต้องการเพิ่มขึ้น, ความพึงพอใจในการให้บริการ, ฯลฯ"
                className="border-2 border-[#ede9fe] rounded-xl focus:border-[#705add]"
              />
            </div>

            <div>
              <Label className="text-sm text-[#4c1d95] mb-2 block">
                เงื่อนไขพิเศษ
              </Label>
              <Textarea
                rows={3}
                value={formData.specialTerms}
                onChange={(e) =>
                  setFormData({ ...formData, specialTerms: e.target.value })
                }
                placeholder="ระบุเงื่อนไขพิเศษ ส่วนลด โบนัส หรือข้อตกลงเพิ่มเติม..."
                className="border-2 border-[#ede9fe] rounded-xl focus:border-[#705add]"
              />
            </div>
          </div>

          {/* Document Upload */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#4c1d95] border-b border-[#ede9fe] pb-2">
              เอกสารแนบ
            </h3>

            <div className="border-2 border-dashed border-[#ede9fe] rounded-xl p-6 text-center hover:bg-[#faf8ff] transition-colors">
              <Upload className="h-8 w-8 text-[#8b5cf6] mx-auto mb-2" />
              <p className="text-sm text-[#4c1d95] font-medium">
                อัปโหลดเอกสารสัญญาใหม่
              </p>
              <p className="text-xs text-gray-500 mt-1">
                รองรับไฟล์ PDF, DOC, DOCX ขนาดไม่เกิน 10MB
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-3 border-2 border-[#ede9fe] text-[#705add] hover:bg-[#f5f3ff] rounded-xl"
              >
                <FileText className="h-4 w-4 mr-2" />
                เลือกไฟล์
              </Button>
            </div>
          </div>

          {/* Approval Info */}
          {formData.renewalType !== "standard" && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium">การต่อสัญญานี้ต้องการการอนุมัติ</p>
                <p className="text-xs mt-1">
                  เนื่องจากมีการเปลี่ยนแปลงเงื่อนไขหรือราคา
                  เอกสารจะถูกส่งไปยังผู้มีอำนาจอนุมัติตามลำดับขั้นตอน
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-[#ede9fe]">
          <div className="text-sm text-[#8b5cf6]">
            สัญญาใหม่จะถูกสร้างและรอการอนุมัติ
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-2 border-[#ede9fe] text-[#4c1d95] hover:bg-[#f5f3ff] rounded-xl"
            >
              {t("common.cancel")}
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-[#a78bfa] to-[#705add] hover:from-[#8b5cf6] hover:to-[#6d28d9] text-white rounded-xl border-0"
            >
              ส่งขอต่อสัญญา
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}