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
import { Checkbox } from "./ui/checkbox";
import { useTranslation } from "react-i18next";
import {
  FileCheck,
  CheckCircle2,
  Calendar,
  DollarSign,
  Building2,
  User,
  FileText,
  X,
  Shield,
  Clock,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

interface DealData {
  dealId: string;
  dealName: string;
  customer: string;
  customerEmail: string;
  customerPhone: string;
  billingAddress: string;
  totalValue: string;
  expectedCloseDate: string;
  owner: string;
  services: {
    service: string;
    quantity: string;
    unitPrice: string;
    total: string;
  }[];
}

interface CreateContractFromDealDialogProps {
  isOpen: boolean;
  onClose: () => void;
  dealData: DealData;
  onCreateContract?: (contractData: any) => void;
  onNavigate?: (path: string, contractId?: string) => void;
}

export function CreateContractFromDealDialog({
  isOpen,
  onClose,
  dealData,
  onCreateContract,
  onNavigate,
}: CreateContractFromDealDialogProps) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form state - Auto-filled from dealData
  const [contractNumber, setContractNumber] = useState(
    `CT-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`
  );
  const [contractTitle, setContractTitle] = useState(`สัญญา - ${dealData.dealName}`);
  const [customer, setCustomer] = useState(dealData.customer);
  const [customerEmail, setCustomerEmail] = useState(dealData.customerEmail || "");
  const [customerPhone, setCustomerPhone] = useState(dealData.customerPhone || "");
  const [billingAddress, setBillingAddress] = useState(dealData.billingAddress || "");
  const [contractValue, setContractValue] = useState(dealData.totalValue);
  
  // Contract-specific fields
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      .toISOString()
      .split("T")[0]
  );
  const [contractDuration, setContractDuration] = useState("12"); // months
  const [paymentTerms, setPaymentTerms] = useState("net30");
  const [paymentSchedule, setPaymentSchedule] = useState("monthly");
  const [autoRenewal, setAutoRenewal] = useState(false);
  const [renewalNotice, setRenewalNotice] = useState("30"); // days
  const [includeVat, setIncludeVat] = useState(true);
  const [penaltyClause, setPenaltyClause] = useState(true);
  const [confidentialityClause, setConfidentialityClause] = useState(true);
  const [notes, setNotes] = useState("");
  const [internalNotes, setInternalNotes] = useState(
    `สร้างจากดีล: ${dealData.dealId} - ${dealData.dealName}`
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const contractData = {
        contractNumber,
        contractTitle,
        customer,
        customerEmail,
        customerPhone,
        billingAddress,
        contractValue,
        startDate,
        endDate,
        contractDuration,
        paymentTerms,
        paymentSchedule,
        autoRenewal,
        renewalNotice,
        includeVat,
        penaltyClause,
        confidentialityClause,
        notes,
        internalNotes,
        dealData,
        createdAt: new Date().toISOString(),
        status: "draft",
      };

      if (onCreateContract) {
        onCreateContract(contractData);
      }

      setIsSubmitting(false);
      setShowSuccess(true);

      // Reset after showing success
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        
        // Navigate to contract editor if callback provided
        if (onNavigate) {
          onNavigate("/contract-editor", contractNumber);
        }
      }, 2000);
    }, 1500);
  };

  // Calculate contract end date based on duration
  const handleDurationChange = (months: string) => {
    setContractDuration(months);
    const start = new Date(startDate);
    const end = new Date(start.setMonth(start.getMonth() + parseInt(months)));
    setEndDate(end.toISOString().split("T")[0]);
  };

  if (showSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-[90vw] sm:max-w-[400px]">
          <DialogTitle className="sr-only">Contract Created</DialogTitle>
          <DialogDescription className="sr-only">
            Your contract has been created successfully
          </DialogDescription>
          <div className="flex flex-col items-center justify-center py-8 px-4">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              สร้างสัญญาสำเร็จ!
            </h3>
            <p className="text-sm text-gray-600 text-center mb-4">
              สัญญาของคุณถูกสร้างเรียบร้อยแล้ว
            </p>
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-700 text-sm px-3 py-1"
            >
              {contractNumber}
            </Badge>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] sm:max-w-[700px] max-h-[85vh] p-0 gap-0 flex flex-col">
        <DialogHeader className="px-4 sm:px-6 py-4 border-b flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <FileCheck className="h-5 w-5 text-blue-600" />
              </div>
              <div className="min-w-0">
                <DialogTitle className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                  สร้างสัญญาจากดีล
                </DialogTitle>
                <DialogDescription className="text-xs text-gray-500 truncate">
                  ดีล: {dealData.dealId} - {dealData.dealName}
                </DialogDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
            {/* Deal Information Summary */}
            <Card className="border-blue-200 bg-blue-50/50 shadow-sm">
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-blue-600" />
                  ข้อมูลดีล (Auto-filled)
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-gray-500 mb-1">ชื่อดีล</p>
                    <p className="font-medium text-gray-900 truncate">
                      {dealData.dealName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">รหัสดีล</p>
                    <p className="font-medium text-gray-900">{dealData.dealId}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">ลูกค้า</p>
                    <p className="font-medium text-gray-900 truncate">
                      {dealData.customer}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">มูลค่ารวม</p>
                    <p className="font-bold text-blue-600">{dealData.totalValue}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contract Information */}
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FileCheck className="h-4 w-4 text-blue-600" />
                  ข้อมูลสัญญา
                </h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="contract-number" className="text-xs text-gray-700">
                      เลขที่สัญญา
                    </Label>
                    <Input
                      id="contract-number"
                      value={contractNumber}
                      onChange={(e) => setContractNumber(e.target.value)}
                      className="mt-1 h-9 text-sm"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="contract-title" className="text-xs text-gray-700">
                      ชื่อสัญญา
                    </Label>
                    <Input
                      id="contract-title"
                      value={contractTitle}
                      onChange={(e) => setContractTitle(e.target.value)}
                      className="mt-1 h-9 text-sm"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="contract-value" className="text-xs text-gray-700">
                        มูลค่าสัญญา
                      </Label>
                      <Input
                        id="contract-value"
                        value={contractValue}
                        onChange={(e) => setContractValue(e.target.value)}
                        className="mt-1 h-9 text-sm"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="contract-duration" className="text-xs text-gray-700">
                        ระยะเวลา (เดือน)
                      </Label>
                      <Combobox
                        options={[
                          { value: "3", label: "3 เดือน" },
                          { value: "6", label: "6 เดือน" },
                          { value: "12", label: "12 เดือน" },
                          { value: "24", label: "24 เดือน" },
                          { value: "36", label: "36 เดือน" },
                        ]}
                        value={contractDuration}
                        onValueChange={handleDurationChange}
                        placeholder="เลือกระยะเวลา..."
                        searchPlaceholder="ค้นหา..."
                        className="mt-1 h-9 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <User className="h-4 w-4 text-blue-600" />
                  ข้อมูลลูกค้า (Auto-filled)
                </h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="customer" className="text-xs text-gray-700">
                      ชื่อลูกค้า
                    </Label>
                    <Input
                      id="customer"
                      value={customer}
                      onChange={(e) => setCustomer(e.target.value)}
                      className="mt-1 h-9 text-sm bg-gray-50"
                      readOnly
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="customer-email" className="text-xs text-gray-700">
                        อีเมล
                      </Label>
                      <Input
                        id="customer-email"
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="mt-1 h-9 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="customer-phone" className="text-xs text-gray-700">
                        เบอร์โทร
                      </Label>
                      <Input
                        id="customer-phone"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="mt-1 h-9 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="billing-address" className="text-xs text-gray-700">
                      ที่อยู่ออกบิล
                    </Label>
                    <Textarea
                      id="billing-address"
                      value={billingAddress}
                      onChange={(e) => setBillingAddress(e.target.value)}
                      className="mt-1 text-sm"
                      rows={2}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contract Period */}
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  ระยะเวลาสัญญา
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="start-date" className="text-xs text-gray-700">
                      วันที่เริ่มต้น
                    </Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="mt-1 h-9 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="end-date" className="text-xs text-gray-700">
                      วันที่สิ้นสุด
                    </Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="mt-1 h-9 text-sm"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Terms */}
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-blue-600" />
                  เงื่อนไขการชำระเงิน
                </h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="payment-terms" className="text-xs text-gray-700">
                        เงื่อนไขชำระเงิน
                      </Label>
                      <Combobox
                        options={[
                          { value: "immediate", label: "ชำระทันที" },
                          { value: "net15", label: "Net 15 วัน" },
                          { value: "net30", label: "Net 30 วัน" },
                          { value: "net60", label: "Net 60 วัน" },
                          { value: "net90", label: "Net 90 วัน" },
                        ]}
                        value={paymentTerms}
                        onValueChange={setPaymentTerms}
                        placeholder="เลือกเงื่อนไข..."
                        searchPlaceholder="ค้นหา..."
                        className="mt-1 h-9 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="payment-schedule" className="text-xs text-gray-700">
                        รอบการชำระ
                      </Label>
                      <Combobox
                        options={[
                          { value: "one-time", label: "ครั้งเดียว" },
                          { value: "monthly", label: "รายเดือน" },
                          { value: "quarterly", label: "รายไตรมาส" },
                          { value: "annually", label: "รายปี" },
                        ]}
                        value={paymentSchedule}
                        onValueChange={setPaymentSchedule}
                        placeholder="เลือกรอบ..."
                        searchPlaceholder="ค้นหา..."
                        className="mt-1 h-9 text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <Checkbox
                      id="include-vat"
                      checked={includeVat}
                      onCheckedChange={(checked) => setIncludeVat(checked as boolean)}
                    />
                    <Label
                      htmlFor="include-vat"
                      className="text-xs text-gray-700 cursor-pointer"
                    >
                      รวม VAT 7%
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Renewal & Terms */}
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  การต่ออายุและข้อกำหนด
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="auto-renewal"
                      checked={autoRenewal}
                      onCheckedChange={(checked) => setAutoRenewal(checked as boolean)}
                    />
                    <Label
                      htmlFor="auto-renewal"
                      className="text-xs text-gray-700 cursor-pointer"
                    >
                      ต่ออายุอัตโนมัติ
                    </Label>
                  </div>

                  {autoRenewal && (
                    <div>
                      <Label htmlFor="renewal-notice" className="text-xs text-gray-700">
                        แจ้งเตือนล่วงหน้า (วัน)
                      </Label>
                      <Input
                        id="renewal-notice"
                        type="number"
                        value={renewalNotice}
                        onChange={(e) => setRenewalNotice(e.target.value)}
                        className="mt-1 h-9 text-sm"
                        min="1"
                      />
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="penalty-clause"
                      checked={penaltyClause}
                      onCheckedChange={(checked) =>
                        setPenaltyClause(checked as boolean)
                      }
                    />
                    <Label
                      htmlFor="penalty-clause"
                      className="text-xs text-gray-700 cursor-pointer"
                    >
                      รวมข้อกำหนดค่าปรับ
                    </Label>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="confidentiality-clause"
                      checked={confidentialityClause}
                      onCheckedChange={(checked) =>
                        setConfidentialityClause(checked as boolean)
                      }
                    />
                    <Label
                      htmlFor="confidentiality-clause"
                      className="text-xs text-gray-700 cursor-pointer"
                    >
                      รวมข้อกำหนดความลับทางการค้า (NDA)
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  หมายเหตุ
                </h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="notes" className="text-xs text-gray-700">
                      หมายเหตุสัญญา (แสดงในเอกสาร)
                    </Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="mt-1 text-sm"
                      rows={2}
                      placeholder="หมายเหตุที่จะแสดงในสัญญา..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="internal-notes" className="text-xs text-gray-700">
                      หมายเหตุภายใน (ไม่แสดงในเอกสาร)
                    </Label>
                    <Textarea
                      id="internal-notes"
                      value={internalNotes}
                      onChange={(e) => setInternalNotes(e.target.value)}
                      className="mt-1 text-sm bg-gray-50"
                      rows={2}
                      placeholder="หมายเหตุภายในสำหรับทีม..."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services from Deal */}
            {dealData.services && dealData.services.length > 0 && (
              <Card className="border-gray-200 shadow-sm">
                <CardContent className="p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-600" />
                    บริการจากดีล ({dealData.services.length} รายการ)
                  </h3>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {dealData.services.map((service, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded text-xs"
                      >
                        <span className="text-gray-700">{service.service}</span>
                        <span className="font-medium text-gray-900">
                          {service.total}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 h-10"
                disabled={isSubmitting}
              >
                ยกเลิก
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "กำลังสร้างสัญญา..." : "สร้างสัญญา"}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
