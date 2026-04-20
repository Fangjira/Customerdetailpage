import { useState, useEffect } from "react";
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
  CheckCircle2,
  Circle,
  Upload,
  Plus,
  Trash2,
  FileText,
  Calendar,
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface EditQuotationWizardProps {
  isOpen: boolean;
  onClose: () => void;
  quotationData: any;
}

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount: number;
}

export function EditQuotationWizard({
  isOpen,
  onClose,
  quotationData,
}: EditQuotationWizardProps) {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [editedQuotation, setEditedQuotation] = useState<any>(quotationData);

  // โหลดข้อมูลเดิมเมื่อเปิด wizard
  useEffect(() => {
    if (isOpen && quotationData) {
      setLineItems(quotationData.items || []);
      setEditedQuotation(quotationData);
    }
  }, [isOpen, quotationData]);

  const steps = [
    { number: 1, title: t("quotations.steps.setup"), description: t("quotations.step_descriptions.setup") },
    { number: 2, title: t("quotations.steps.customer"), description: t("quotations.step_descriptions.customer") },
    { number: 3, title: t("quotations.steps.items"), description: t("quotations.step_descriptions.items") },
    { number: 4, title: t("quotations.steps.documents"), description: t("quotations.step_descriptions.documents") },
    { number: 5, title: t("quotations.steps.review"), description: t("quotations.step_descriptions.review") },
  ];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      // บันทึกการแก้ไข
      handleSave();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    // บันทึกการเปลี่ยนแปลง
    console.log("Saving quotation changes...");
    onClose();
  };

  const addLineItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      unitPrice: 0,
      discount: 0,
    };
    setLineItems([...lineItems, newItem]);
  };

  const removeLineItem = (id: string) => {
    setLineItems(lineItems.filter((item) => item.id !== id));
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: any) => {
    setLineItems(
      lineItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const calculateItemTotal = (item: LineItem) => {
    const subtotal = item.quantity * item.unitPrice;
    const discountAmount = subtotal * (item.discount / 100);
    return subtotal - discountAmount;
  };

  const calculateSubtotal = () => {
    return lineItems.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  };

  const calculateTotalDiscount = () => {
    return lineItems.reduce((sum, item) => {
      const subtotal = item.quantity * item.unitPrice;
      return sum + subtotal * (item.discount / 100);
    }, 0);
  };

  const calculateVAT = () => {
    return calculateSubtotal() * 0.07;
  };

  const calculateGrandTotal = () => {
    return calculateSubtotal() + calculateVAT();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#4c1d95]">
            {t("quotations.edit_quotation")}
          </DialogTitle>
          <DialogDescription className="text-[#8b5cf6]">
            {quotationData?.id} - {quotationData?.name}
          </DialogDescription>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <button
                    onClick={() => setCurrentStep(step.number)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all cursor-pointer hover:scale-110 ${
                      currentStep === step.number
                        ? "bg-[#705add] border-[#705add] text-white"
                        : currentStep > step.number
                        ? "bg-[#c4b5fd] border-[#c4b5fd] text-white"
                        : "bg-white border-[#ede9fe] text-[#c4b5fd] hover:border-[#c4b5fd]"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle2 className="h-6 w-6" />
                    ) : (
                      <span className="text-sm font-medium">{step.number}</span>
                    )}
                  </button>
                  <button
                    onClick={() => setCurrentStep(step.number)}
                    className={`text-xs mt-2 text-center cursor-pointer hover:text-[#705add] transition-colors ${
                      currentStep === step.number
                        ? "text-[#4c1d95] font-medium"
                        : "text-[#c4b5fd]"
                    }`}
                  >
                    {step.title}
                  </button>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 ${
                      currentStep > step.number ? "bg-[#c4b5fd]" : "bg-[#ede9fe]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="min-h-[400px]">
          {currentStep === 1 && (
            <Step1Setup t={t} quotationData={quotationData} />
          )}
          {currentStep === 2 && (
            <Step2Customer t={t} quotationData={quotationData} />
          )}
          {currentStep === 3 && (
            <Step3Items
              t={t}
              lineItems={lineItems}
              addLineItem={addLineItem}
              removeLineItem={removeLineItem}
              updateLineItem={updateLineItem}
              calculateItemTotal={calculateItemTotal}
              calculateSubtotal={calculateSubtotal}
              calculateTotalDiscount={calculateTotalDiscount}
              calculateVAT={calculateVAT}
              calculateGrandTotal={calculateGrandTotal}
            />
          )}
          {currentStep === 4 && <Step4Documents t={t} />}
          {currentStep === 5 && (
            <Step5Review t={t} quotationData={quotationData} lineItems={lineItems} />
          )}
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-[#ede9fe]">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="border-2 border-[#ede9fe] text-[#4c1d95] hover:bg-[#f5f3ff] rounded-xl"
          >
            {t("quotations.previous")}
          </Button>

          <div className="text-sm text-[#8b5cf6]">
            {t("quotations.step_of", { current: currentStep, total: 5 })}
          </div>

          <Button
            onClick={handleNext}
            className="bg-[#00BC7D] hover:bg-[#00a86b] text-white rounded-xl border-0 shadow-md hover:shadow-lg transition-all duration-200"
          >
            {currentStep === 5
              ? t("quotations.save_changes")
              : t("quotations.next")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Step 1: Setup
function Step1Setup({ t, quotationData }: { t: any; quotationData: any }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label className="text-sm text-[#4c1d95] mb-2 block">
            {t("quotations.quote_number")}
          </Label>
          <Input
            defaultValue={quotationData?.id}
            disabled
            className="border-2 border-[#ede9fe] rounded-xl bg-[#f5f3ff]"
          />
        </div>

        <div>
          <Label className="text-sm text-[#4c1d95] mb-2 block">
            {t("quotations.status")}
          </Label>
          <Combobox
            options={[
              { value: "Draft", label: t("status.draft") },
              { value: "Pending Approval", label: t("pending") },
              { value: "Approved", label: t("approved") },
              { value: "Sent to Customer", label: "ส่งให้ลูกค้าแล้ว" },
            ]}
            value={quotationData?.status || ""}
            onValueChange={() => {}}
            placeholder="เลือกสถานะ..."
            searchPlaceholder="ค้นหา..."
            className="border-2 border-[#ede9fe] rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label className="text-sm text-[#4c1d95] mb-2 block">
            {t("quotations.validity_period")} ({t("quotations.days")})
          </Label>
          <Input
            type="number"
            defaultValue={quotationData?.validityPeriod}
            className="border-2 border-[#ede9fe] rounded-xl"
          />
        </div>

        <div>
          <Label className="text-sm text-[#4c1d95] mb-2 block">
            {t("quotations.issue_date")}
          </Label>
          <Input
            type="date"
            defaultValue={quotationData?.issueDate}
            className="border-2 border-[#ede9fe] rounded-xl"
          />
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-[#f5f3ff] rounded-xl border-2 border-[#ede9fe]">
        <div>
          <p className="text-sm text-[#4c1d95] font-medium">
            {t("quotations.include_vat")}
          </p>
          <p className="text-xs text-[#8b5cf6] mt-1">
            {t("quotations.vat_notice")}
          </p>
        </div>
        <Checkbox defaultChecked={quotationData?.includeVat} />
      </div>
    </div>
  );
}

// Step 2: Customer
function Step2Customer({ t, quotationData }: { t: any; quotationData: any }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label className="text-sm text-[#4c1d95] mb-2 block">
            {t("quotations.customer_name")}
          </Label>
          <Input
            defaultValue={quotationData?.customer?.name}
            className="border-2 border-[#ede9fe] rounded-xl"
          />
        </div>

        <div>
          <Label className="text-sm text-[#4c1d95] mb-2 block">
            {t("quotations.contact_person")}
          </Label>
          <Input
            defaultValue={quotationData?.customer?.contactPerson}
            className="border-2 border-[#ede9fe] rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label className="text-sm text-[#4c1d95] mb-2 block">
            {t("common.email")}
          </Label>
          <Input
            type="email"
            defaultValue={quotationData?.customer?.email}
            className="border-2 border-[#ede9fe] rounded-xl"
          />
        </div>

        <div>
          <Label className="text-sm text-[#4c1d95] mb-2 block">
            {t("common.phone")}
          </Label>
          <Input
            type="tel"
            defaultValue={quotationData?.customer?.phone}
            className="border-2 border-[#ede9fe] rounded-xl"
          />
        </div>
      </div>

      <div>
        <Label className="text-sm text-[#4c1d95] mb-2 block">
          {t("quotations.bill_to")}
        </Label>
        <Textarea
          rows={3}
          defaultValue={quotationData?.customer?.billingAddress}
          className="border-2 border-[#ede9fe] rounded-xl"
        />
      </div>

      <div>
        <Label className="text-sm text-[#4c1d95] mb-2 block">
          {t("quotations.ship_to")}
        </Label>
        <Textarea
          rows={3}
          defaultValue={quotationData?.customer?.shippingAddress}
          className="border-2 border-[#ede9fe] rounded-xl"
        />
      </div>
    </div>
  );
}

// Step 3: Items
function Step3Items({
  t,
  lineItems,
  addLineItem,
  removeLineItem,
  updateLineItem,
  calculateItemTotal,
  calculateSubtotal,
  calculateTotalDiscount,
  calculateVAT,
  calculateGrandTotal,
}: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-[#4c1d95] font-medium">
          {t("quotations.line_items")}
        </h3>
        <Button
          onClick={addLineItem}
          size="sm"
          className="bg-gradient-to-r from-[#a78bfa] to-[#705add] hover:from-[#8b5cf6] hover:to-[#6d28d9] text-white rounded-xl border-0"
        >
          <Plus className="h-4 w-4 mr-2" />
          {t("quotations.add_item")}
        </Button>
      </div>

      <div className="space-y-4 max-h-[300px] overflow-y-auto">
        {lineItems.map((item: LineItem) => (
          <div
            key={item.id}
            className="p-4 border-2 border-[#ede9fe] rounded-xl bg-[#faf8ff]"
          >
            <div className="grid grid-cols-12 gap-3 items-start">
              <div className="col-span-4">
                <Label className="text-xs text-[#8b5cf6] mb-1 block">
                  {t("quotations.service")}
                </Label>
                <Input
                  value={item.description}
                  onChange={(e) =>
                    updateLineItem(item.id, "description", e.target.value)
                  }
                  placeholder={t("quotations.enter_service")}
                  className="border-2 border-[#ede9fe] rounded-lg text-sm"
                />
              </div>
              <div className="col-span-2">
                <Label className="text-xs text-[#8b5cf6] mb-1 block">
                  {t("quotations.quantity")}
                </Label>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    updateLineItem(item.id, "quantity", Number(e.target.value))
                  }
                  className="border-2 border-[#ede9fe] rounded-lg text-sm"
                />
              </div>
              <div className="col-span-2">
                <Label className="text-xs text-[#8b5cf6] mb-1 block">
                  {t("quotations.unit_price")}
                </Label>
                <Input
                  type="number"
                  value={item.unitPrice}
                  onChange={(e) =>
                    updateLineItem(item.id, "unitPrice", Number(e.target.value))
                  }
                  className="border-2 border-[#ede9fe] rounded-lg text-sm"
                />
              </div>
              <div className="col-span-2">
                <Label className="text-xs text-[#8b5cf6] mb-1 block">
                  {t("quotations.discount")} %
                </Label>
                <Input
                  type="number"
                  value={item.discount}
                  onChange={(e) =>
                    updateLineItem(item.id, "discount", Number(e.target.value))
                  }
                  className="border-2 border-[#ede9fe] rounded-lg text-sm"
                />
              </div>
              <div className="col-span-1">
                <Label className="text-xs text-[#8b5cf6] mb-1 block">
                  {t("quotations.total")}
                </Label>
                <p className="text-sm text-[#4c1d95] font-medium mt-2">
                  ${calculateItemTotal(item).toLocaleString()}
                </p>
              </div>
              <div className="col-span-1 flex items-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeLineItem(item.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {lineItems.length === 0 && (
        <div className="text-center py-12 text-[#8b5cf6]">
          <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">{t("quotations.no_items")}</p>
        </div>
      )}

      {/* Totals */}
      <div className="bg-gradient-to-br from-[#f5f3ff] to-white rounded-xl p-6 border-2 border-[#ede9fe]">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-[#8b5cf6]">{t("quotations.subtotal")}</span>
            <span className="text-[#4c1d95] font-medium">
              ${calculateSubtotal().toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#8b5cf6]">{t("quotations.total_discount")}</span>
            <span className="text-red-600 font-medium">
              -${calculateTotalDiscount().toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#8b5cf6]">{t("quotations.vat")} 7%</span>
            <span className="text-[#4c1d95] font-medium">
              ${calculateVAT().toLocaleString()}
            </span>
          </div>
          <div className="pt-3 border-t-2 border-[#ddd6fe] flex justify-between">
            <span className="text-[#4c1d95] font-semibold">
              {t("quotations.grand_total")}
            </span>
            <span className="text-2xl text-[#705add] font-bold">
              ${calculateGrandTotal().toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 4: Documents
function Step4Documents({ t }: { t: any }) {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-sm text-[#4c1d95] mb-2 block">
          {t("quotations.attach_documents")}
        </Label>
        <div className="border-2 border-dashed border-[#c4b5fd] rounded-xl p-12 text-center bg-[#faf8ff] hover:bg-[#f5f3ff] transition-colors cursor-pointer">
          <Upload className="h-12 w-12 text-[#a78bfa] mx-auto mb-4" />
          <p className="text-sm text-[#4c1d95] font-medium mb-2">
            {t("quotations.upload_documents")}
          </p>
          <p className="text-xs text-[#8b5cf6]">
            {t("quotations.upload_documents_hint")}
          </p>
        </div>
      </div>

      <div>
        <Label className="text-sm text-[#4c1d95] mb-2 block">
          {t("quotations.notes")}
        </Label>
        <Textarea
          rows={5}
          placeholder={t("quotations.enter_notes")}
          className="border-2 border-[#ede9fe] rounded-xl"
        />
      </div>
    </div>
  );
}

// Step 5: Review
function Step5Review({ t, quotationData, lineItems }: { t: any; quotationData: any; lineItems: any[] }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-[#f5f3ff] to-white rounded-xl p-6 border-2 border-[#ede9fe]">
        <h3 className="text-[#4c1d95] font-medium mb-4">
          {t("quotations.review_quotation")}
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-[#8b5cf6] mb-1">{t("quotations.quote_number")}</p>
            <p className="text-sm text-[#4c1d95] font-medium">{quotationData?.id}</p>
          </div>
          <div>
            <p className="text-xs text-[#8b5cf6] mb-1">{t("quotations.customer_name")}</p>
            <p className="text-sm text-[#4c1d95] font-medium">{quotationData?.customer?.name}</p>
          </div>
          <div>
            <p className="text-xs text-[#8b5cf6] mb-1">{t("quotations.line_items")}</p>
            <p className="text-sm text-[#4c1d95] font-medium">{lineItems.length} {t("quotations.items")}</p>
          </div>
          <div>
            <p className="text-xs text-[#8b5cf6] mb-1">{t("quotations.grand_total")}</p>
            <p className="text-xl text-[#705add] font-bold">{quotationData?.amount}</p>
          </div>
        </div>
      </div>

      <div className="text-center py-8">
        <CheckCircle2 className="h-16 w-16 text-[#705add] mx-auto mb-4" />
        <p className="text-[#4c1d95] font-medium">
          {t("quotations.review_message")}
        </p>
        <p className="text-sm text-[#8b5cf6] mt-2">
          คุณสามารถกลับไปแก้ไขได้ในขั้นตอนก่อนหน้า
        </p>
      </div>
    </div>
  );
}