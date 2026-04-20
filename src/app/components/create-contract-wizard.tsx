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
import { Combobox } from "./ui/combobox";
import { Checkbox } from "./ui/checkbox";
import {
  FileCheck,
  Building2,
  Calendar,
  DollarSign,
  FileText,
  Briefcase,
  FilePlus,
  ArrowLeft,
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface CreateContractWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

type SourceType = "quotation" | "deal" | "scratch" | "";

export function CreateContractWizard({
  isOpen,
  onClose,
}: CreateContractWizardProps) {
  const { t } = useTranslation();
  const [step, setStep] = useState<1 | 2>(1);
  const [source, setSource] = useState<SourceType>("");

  // Form state
  const [selectedQuotation, setSelectedQuotation] = useState("");
  const [selectedDeal, setSelectedDeal] = useState("");
  const [contractTitle, setContractTitle] = useState("");
  const [customer, setCustomer] = useState("");
  const [contractValue, setContractValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("Net 30");
  const [autoRenewal, setAutoRenewal] = useState(false);
  const [notes, setNotes] = useState("");

  // Mock data
  const quotations = [
    { id: "QT-2024-001", title: "ใบเสนอราคา - TechCorp Asia", customer: "TechCorp Asia Ltd.", value: "฿4,500,000" },
    { id: "QT-2024-002", title: "ใบเสนอราคา - Global Trade", customer: "Global Trade Solutions", value: "฿8,200,000" },
    { id: "QT-2024-003", title: "ใบเสนอราคา - Pacific Trade", customer: "Pacific Trade Corp", value: "฿3,200,000" },
  ];

  const deals = [
    { id: "D-2024-045", title: "International Freight Solution", customer: "TechCorp Asia Ltd.", value: "฿4,500,000" },
    { id: "D-2024-052", title: "Warehouse Management System", customer: "Global Trade Solutions", value: "฿8,200,000" },
    { id: "D-2024-067", title: "Supply Chain Optimization", customer: "Pacific Trade Corp", value: "฿3,200,000" },
  ];

  const customers = [
    "TechCorp Asia Ltd.",
    "Global Trade Solutions",
    "Pacific Trade Corp",
    "Food Distributors Inc.",
    "E-commerce Plus Co.",
    "Global Freight Solutions Inc.",
    "Asia Pacific Traders",
    "TransContinental Logistics",
    "FastTrack Express",
    "PharmaCare Global",
  ];

  const handleSourceSelect = (sourceType: SourceType) => {
    setSource(sourceType);
    setStep(2);
  };

  const handleQuotationSelect = (quotationId: string) => {
    setSelectedQuotation(quotationId);
    const selected = quotations.find(q => q.id === quotationId);
    if (selected) {
      setContractTitle(`สัญญา - ${selected.title.replace('ใบเสนอราคา - ', '')}`);
      setCustomer(selected.customer);
      setContractValue(selected.value);
    }
  };

  const handleDealSelect = (dealId: string) => {
    setSelectedDeal(dealId);
    const selected = deals.find(d => d.id === dealId);
    if (selected) {
      setContractTitle(`สัญญา - ${selected.title}`);
      setCustomer(selected.customer);
      setContractValue(selected.value);
    }
  };

  const handleSubmit = () => {
    console.log("Creating contract:", {
      source,
      selectedQuotation,
      selectedDeal,
      contractTitle,
      customer,
      contractValue,
      startDate,
      endDate,
      paymentTerms,
      autoRenewal,
      notes,
    });
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setStep(1);
    setSource("");
    setSelectedQuotation("");
    setSelectedDeal("");
    setContractTitle("");
    setCustomer("");
    setContractValue("");
    setStartDate("");
    setEndDate("");
    setPaymentTerms("Net 30");
    setAutoRenewal(false);
    setNotes("");
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  const handleBack = () => {
    setStep(1);
    setSource("");
  };

  const renderStepOne = () => (
    <div className="space-y-4 py-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          เลือกวิธีสร้างสัญญา
        </h3>
        <p className="text-sm text-gray-500">
          คุณต้องการสร้างสัญญาจากแหล่งใด?
        </p>
      </div>

      <div className="grid gap-4">
        {/* From Quotation */}
        <button
          onClick={() => handleSourceSelect("quotation")}
          className="group p-6 border-2 border-gray-200 rounded-xl hover:border-[#7BC9A6] hover:bg-[#7BC9A6]/5 transition-all duration-200 text-left"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-purple-100 group-hover:bg-[#7BC9A6]/20 transition-colors">
              <FileText className="h-6 w-6 text-purple-600 group-hover:text-[#7BC9A6]" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">จากใบเสนอราคา</h4>
              <p className="text-sm text-gray-500">
                สร้างสัญญาจากใบเสนอราคาที่มีอยู่แล้ว ข้อมูลจะถูกนำมาใช้อัตโนมัติ
              </p>
            </div>
          </div>
        </button>

        {/* From Deal */}
        <button
          onClick={() => handleSourceSelect("deal")}
          className="group p-6 border-2 border-gray-200 rounded-xl hover:border-[#7BC9A6] hover:bg-[#7BC9A6]/5 transition-all duration-200 text-left"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-blue-100 group-hover:bg-[#7BC9A6]/20 transition-colors">
              <Briefcase className="h-6 w-6 text-blue-600 group-hover:text-[#7BC9A6]" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">จากโครงการ (Deal)</h4>
              <p className="text-sm text-gray-500">
                สร้างสัญญาจากโครงการที่กำลังดำเนินการอยู่
              </p>
            </div>
          </div>
        </button>

        {/* From Scratch */}
        <button
          onClick={() => handleSourceSelect("scratch")}
          className="group p-6 border-2 border-gray-200 rounded-xl hover:border-[#7BC9A6] hover:bg-[#7BC9A6]/5 transition-all duration-200 text-left"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-green-100 group-hover:bg-[#7BC9A6]/20 transition-colors">
              <FilePlus className="h-6 w-6 text-green-600 group-hover:text-[#7BC9A6]" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">สร้างใหม่ทั้งหมด</h4>
              <p className="text-sm text-gray-500">
                เริ่มต้นสร้างสัญญาใหม่โดยกรอกข้อมูลทั้งหมดเอง
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );

  const renderStepTwo = () => (
    <div className="space-y-6 py-4">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={handleBack}
        className="mb-2 -mt-2 h-9 px-3 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        เปลี่ยนแหล่งที่มา
      </Button>

      {/* Source Selection */}
      {source === "quotation" && (
        <div className="space-y-2 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <FileText className="h-4 w-4 text-purple-600" />
            เลือกใบเสนอราคา *
          </Label>
          <Combobox
            options={quotations.map((quot) => ({
              value: quot.id,
              label: `${quot.id} - ${quot.title}`,
            }))}
            value={selectedQuotation}
            onValueChange={handleQuotationSelect}
            placeholder="เลือกใบเสนอราคา"
            searchPlaceholder="ค้นหาใบเสนอราคา..."
            className="h-11 bg-white"
          />
        </div>
      )}

      {source === "deal" && (
        <div className="space-y-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-blue-600" />
            เลือกโครงการ *
          </Label>
          <Combobox
            options={deals.map((deal) => ({
              value: deal.id,
              label: `${deal.id} - ${deal.title}`,
            }))}
            value={selectedDeal}
            onValueChange={handleDealSelect}
            placeholder="เลือกโครงการ"
            searchPlaceholder="ค้นหาโครงการ..."
            className="h-11 bg-white"
          />
        </div>
      )}

      {/* Contract Title */}
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <FileText className="h-4 w-4 text-[#7BC9A6]" />
          ชื่อสัญญา *
        </Label>
        <Input
          id="title"
          placeholder="เช่น: International Air Freight Services Agreement"
          value={contractTitle}
          onChange={(e) => setContractTitle(e.target.value)}
          className="h-11"
        />
      </div>

      {/* Customer */}
      {source === "scratch" && (
        <div className="space-y-2">
          <Label htmlFor="customer" className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Building2 className="h-4 w-4 text-[#7BC9A6]" />
            ลูกค้า *
          </Label>
          <Combobox
            options={customers.map((cust) => ({
              value: cust,
              label: cust,
            }))}
            value={customer}
            onValueChange={setCustomer}
            placeholder="เลือกลูกค้า"
            searchPlaceholder="ค้นหาลูกค้า..."
            className="h-11"
          />
        </div>
      )}

      {(source === "quotation" || source === "deal") && customer && (
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-sm">
            <Building2 className="h-4 w-4 text-gray-400" />
            <span className="text-gray-500">ลูกค้า:</span>
            <span className="font-medium text-gray-900">{customer}</span>
          </div>
        </div>
      )}

      {/* Value and Payment Terms */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="value" className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-[#7BC9A6]" />
            มูลค่าสัญญา *
          </Label>
          <Input
            id="value"
            placeholder="฿ 0.00"
            value={contractValue}
            onChange={(e) => setContractValue(e.target.value)}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="payment" className="text-sm font-medium text-gray-700">
            เงื่อนไขการชำระเงิน
          </Label>
          <Combobox
            options={[
              { value: "Net 30", label: "Net 30" },
              { value: "Net 60", label: "Net 60" },
              { value: "Net 90", label: "Net 90" },
              { value: "Advance", label: "จ่ายล่วงหน้า" },
              { value: "COD", label: "เก็บเงินปลายทาง" },
            ]}
            value={paymentTerms}
            onValueChange={setPaymentTerms}
            placeholder="เลือกเงื่อนไข..."
            searchPlaceholder="ค้นหา..."
            className="h-11"
          />
        </div>
      </div>

      {/* Start and End Date */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate" className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#7BC9A6]" />
            วันที่เริ่มต้น *
          </Label>
          <Input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate" className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#7BC9A6]" />
            วันที่สิ้นสุด *
          </Label>
          <Input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="h-11"
          />
        </div>
      </div>

      {/* Auto Renewal */}
      <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <Checkbox
          id="autoRenewal"
          checked={autoRenewal}
          onCheckedChange={(checked) => setAutoRenewal(checked as boolean)}
        />
        <div className="flex flex-col">
          <Label
            htmlFor="autoRenewal"
            className="text-sm font-medium text-gray-700 cursor-pointer"
          >
            ต่ออายุอัตโนมัติ
          </Label>
          <p className="text-xs text-gray-500">
            สัญญาจะต่ออายุอัตโนมัติเมื่อครบกำหนด
          </p>
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
          หมายเหตุ (ถ้ามี)
        </Label>
        <Textarea
          id="notes"
          placeholder="ข้อมูลเพิ่มเติมหรือหมายเหตุ..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="resize-none"
        />
      </div>
    </div>
  );

  const isFormValid = () => {
    if (source === "quotation") {
      return selectedQuotation && contractTitle && startDate && endDate;
    }
    if (source === "deal") {
      return selectedDeal && contractTitle && startDate && endDate;
    }
    return contractTitle && customer && contractValue && startDate && endDate;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-[#7BC9A6]/10">
              <FileCheck className="h-6 w-6 text-[#7BC9A6]" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                สร้างสัญญาใหม่
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                {step === 1 ? "เลือกวิธีการสร้างสัญญา" : "กรอกข้อมูลสัญญา"}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {step === 1 ? renderStepOne() : renderStepTwo()}

        {/* Footer Actions */}
        {step === 2 && (
          <div className="flex items-center justify-between pt-4 border-t">
            <Button
              variant="outline"
              onClick={handleClose}
              className="h-11 px-6"
            >
              ยกเลิก
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid()}
              className="h-11 px-6 bg-[#7BC9A6] hover:bg-[#5FB88E] text-white"
            >
              <FileCheck className="h-4 w-4 mr-2" />
              สร้างสัญญา
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
