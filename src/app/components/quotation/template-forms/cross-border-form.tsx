import { CrossBorderData, LanguageType } from "../quotation-types";
import { ToggleSection, EditableTextBlock } from "../quotation-components";
import { ServiceTable } from "../dynamic-tables";
import { Label } from "../../ui/label";
import { CrossBorderRateTable, CrossBorderRateTableData } from "../cross-border-rate-table";

interface CrossBorderFormProps {
  data: any;
  onChange: (data: CrossBorderData) => void;
  language: LanguageType;
}

export function CrossBorderForm({ data, onChange, language }: CrossBorderFormProps) {
  // Initialize crossBorderData with default structure if data is undefined or null
  let crossBorderData: CrossBorderData = data || {
    rateTable: {
      enabled: false,
      rows: [],
    },
    rateSummary: "",
    clmvRemarks: "",
    jtsRemarks: "",
    salesCustomsRemarks: "",
    customsLicense: {
      enabled: false,
      items: [],
    },
  };

  // Ensure nested properties exist
  if (!crossBorderData.rateTable) {
    crossBorderData.rateTable = {
      enabled: false,
      rows: [],
    };
  }
  
  if (!crossBorderData.customsLicense) {
    crossBorderData.customsLicense = {
      enabled: false,
      items: [],
    };
  }

  const labels = {
    th: {
      rateTable: "4.1 ตารางอัตราค่าบริการขนส่งข้ามพรมแดน",
      rateSummary: "4.2 สรุปอัตราค่าบริการ",
      clmvRemarks: "หมายเหตุ CLMV",
      jtsRemarks: "หมายเหตุ JTS",
      salesCustomsRemarks: "หมายเหตุ Sales & Customs",
      customsLicense: "4.3 พิธีการศุลกากรและใบอนุญาต (ถ้ามี)",
    },
    en: {
      rateTable: "4.1 Cross-Border Transport Rate Table",
      rateSummary: "4.2 Rate Summary",
      clmvRemarks: "CLMV Remarks",
      jtsRemarks: "JTS Remarks",
      salesCustomsRemarks: "Sales & Customs Remarks",
      customsLicense: "4.3 Customs & License (If applicable)",
    },
  };

  const label = labels[language];

  return (
    <div className="space-y-6">
      {/* Cross-Border Rate Table */}
      <ToggleSection
        enabled={crossBorderData.rateTable?.enabled || false}
        onToggle={(enabled) => {
          const defaultRows = enabled && (!crossBorderData.rateTable?.rows || crossBorderData.rateTable.rows.length === 0)
            ? [
                {
                  id: crypto.randomUUID(),
                  route: "",
                  vehicleType: "",
                  qty: "",
                  unit: "",
                  pricePerTrip: "",
                  fixedCost: "",
                  remarks: "",
                }
              ]
            : crossBorderData.rateTable?.rows || [];
          
          onChange({
            ...crossBorderData,
            rateTable: {
              enabled,
              rows: defaultRows,
            },
          });
        }}
        title={label.rateTable}
      >
        <CrossBorderRateTable
          data={{ rows: crossBorderData.rateTable?.rows || [] }}
          onChange={(tableData: CrossBorderRateTableData) =>
            onChange({
              ...crossBorderData,
              rateTable: {
                ...crossBorderData.rateTable!,
                rows: tableData.rows,
              },
            })
          }
        />
      </ToggleSection>

      {/* Rate Summary */}
      <div>
        <Label className="mb-2 block">{label.rateSummary}</Label>
        <EditableTextBlock
          value={crossBorderData.rateSummary || ""}
          onChange={(value) =>
            onChange({
              ...crossBorderData,
              rateSummary: value,
            })
          }
          rows={6}
          placeholder={language === "th" 
            ? "กรุณาระบุอัตราค่าบริการโดยสรุป เช่น ราคาขนส่งต่อตู้, ระยะทาง, เงื่อนไขพิเศษ"
            : "Please specify rate summary, e.g., price per container, distance, special conditions"}
        />
      </div>

      {/* CLMV Remarks */}
      <div>
        <Label className="mb-2 block">{label.clmvRemarks}</Label>
        <EditableTextBlock
          value={crossBorderData.clmvRemarks || ""}
          onChange={(value) =>
            onChange({
              ...crossBorderData,
              clmvRemarks: value,
            })
          }
          rows={4}
          placeholder={language === "th" 
            ? "หมายเหตุสำหรับเส้นทาง CLMV"
            : "Remarks for CLMV routes"}
        />
      </div>

      {/* JTS Remarks */}
      <div>
        <Label className="mb-2 block">{label.jtsRemarks}</Label>
        <EditableTextBlock
          value={crossBorderData.jtsRemarks || ""}
          onChange={(value) =>
            onChange({
              ...crossBorderData,
              jtsRemarks: value,
            })
          }
          rows={4}
          placeholder={language === "th" 
            ? "หมายเหตุสำหรับ JTS (Join Through Service)"
            : "Remarks for JTS (Join Through Service)"}
        />
      </div>

      {/* Sales & Customs Remarks */}
      <div>
        <Label className="mb-2 block">{label.salesCustomsRemarks}</Label>
        <EditableTextBlock
          value={crossBorderData.salesCustomsRemarks || ""}
          onChange={(value) =>
            onChange({
              ...crossBorderData,
              salesCustomsRemarks: value,
            })
          }
          rows={4}
          placeholder={language === "th" 
            ? "หมายเหตุด้าน Sales และ Customs"
            : "Sales and Customs remarks"}
        />
      </div>

      {/* Optional Customs & License */}
      <ToggleSection
        enabled={crossBorderData.customsLicense?.enabled || false}
        onToggle={(enabled) =>
          onChange({
            ...crossBorderData,
            customsLicense: {
              ...crossBorderData.customsLicense,
              enabled,
              items: enabled && (!crossBorderData.customsLicense.items || crossBorderData.customsLicense.items.length === 0)
                ? [{ no: 1, service: "", price: "", unit: "", remarks: "" }]
                : crossBorderData.customsLicense.items || [],
            },
          })
        }
        title={label.customsLicense}
      >
        <ServiceTable
          items={crossBorderData.customsLicense?.items || []}
          onChange={(items) =>
            onChange({
              ...crossBorderData,
              customsLicense: { ...crossBorderData.customsLicense, items },
            })
          }
          language={language}
          showRemarks={true}
        />
      </ToggleSection>

      {/* Terms & Conditions Section */}
      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
        <h3 className="text-base font-bold text-gray-900 mb-3">
          {language === "th" ? "5. TERMS & CONDITIONS / เงื่อนไข" : "5. TERMS & CONDITIONS"}
        </h3>
        <EditableTextBlock
          value={crossBorderData.termsAndConditions || ""}
          onChange={(value) => onChange({ ...crossBorderData, termsAndConditions: value })}
          rows={6}
          placeholder={
            language === "th"
              ? "กรอกเงื่อนไขการให้บริการ Cross-Border เช่น\n1. ราคาดังกล่าวยังไม่รวมภาษีมูลค่าเพิ่ม 7%\n2. ราคาไม่รวมค่าธรรมเนียมด่านศุลกากร\n3. เงื่อนไขการชำระเงิน: เครดิต 30 วัน"
              : "Enter terms and conditions for Cross-Border service, e.g.\n1. Prices exclude 7% VAT\n2. Prices exclude customs clearance fees\n3. Payment terms: 30 days credit"
          }
        />
      </div>
    </div>
  );
}