import { InternationalFreightData, LanguageType } from "../quotation-types";
import { ToggleSection, EditableTextBlock } from "../quotation-components";
import { ServiceTable } from "../dynamic-tables";
import { Label } from "../../ui/label";
import { Plane, Ship as ShipIcon } from "lucide-react";

interface InternationalFreightFormProps {
  data: any;
  onChange: (data: InternationalFreightData) => void;
  language: LanguageType;
}

export function InternationalFreightForm({ data, onChange, language }: InternationalFreightFormProps) {
  // Initialize freightData with default structure if data is undefined or null
  let freightData: InternationalFreightData = data || {
    air: {
      enabled: false,
      export: { items: [] },
      import: { items: [] },
      remarks: "",
    },
    sea: {
      enabled: false,
      export: { items: [] },
      import: { items: [] },
      remarks: "",
    },
    customsLicense: {
      enabled: false,
      items: [],
    },
  };

  // Ensure nested properties exist
  if (!freightData.air) {
    freightData.air = {
      enabled: false,
      export: { items: [] },
      import: { items: [] },
      remarks: "",
    };
  }

  if (!freightData.sea) {
    freightData.sea = {
      enabled: false,
      export: { items: [] },
      import: { items: [] },
      remarks: "",
    };
  }

  if (!freightData.customsLicense) {
    freightData.customsLicense = {
      enabled: false,
      items: [],
    };
  }

  const labels = {
    th: {
      airFreight: "4.1 ขนส่งทางอากาศ",
      seaFreight: "4.2 ขนส่งทางเรือ",
      export: "ส่งออก (Export)",
      import: "นำเข้า (Import)",
      remarks: "หมายเหตุ",
      customsLicense: "4.3 พิธีการศุลกากรและใบอนุญาต (ถ้ามี)",
    },
    en: {
      airFreight: "4.1 Air Freight",
      seaFreight: "4.2 Sea Freight",
      export: "Export",
      import: "Import",
      remarks: "Remarks",
      customsLicense: "4.3 Customs & License (If applicable)",
    },
  };

  const label = labels[language];

  return (
    <div className="space-y-6">
      {/* Air Freight Section */}
      <div className="border-2 border-[#5FB88E]/20 rounded-lg p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-[#5FB88E]/10 flex items-center justify-center">
            <Plane className="w-5 h-5 text-[#5FB88E]" />
          </div>
          <div className="flex-1 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">{label.airFreight}</h3>
            <button
              type="button"
              onClick={() =>
                onChange({
                  ...freightData,
                  air: {
                    ...freightData.air,
                    enabled: !freightData.air?.enabled,
                  },
                })
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                freightData.air?.enabled ? "bg-[#7BC9A6]" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  freightData.air?.enabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {freightData.air?.enabled && (
          <div className="space-y-4">
            {/* Export/Import Toggles */}
            <div className="flex items-center gap-6 mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={freightData.air?.exportEnabled || false}
                  onChange={(e) =>
                    onChange({
                      ...freightData,
                      air: { ...freightData.air, exportEnabled: e.target.checked },
                    })
                  }
                  className="w-4 h-4 text-[#7BC9A6] rounded focus:ring-[#7BC9A6]"
                />
                <span className="text-sm font-medium text-gray-700">{label.export}</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={freightData.air?.importEnabled || false}
                  onChange={(e) =>
                    onChange({
                      ...freightData,
                      air: { ...freightData.air, importEnabled: e.target.checked },
                    })
                  }
                  className="w-4 h-4 text-[#7BC9A6] rounded focus:ring-[#7BC9A6]"
                />
                <span className="text-sm font-medium text-gray-700">{label.import}</span>
              </label>
            </div>

            {/* Services Table */}
            <ServiceTable
              items={freightData.air?.services?.map((s: any, i: number) => ({ no: i + 1, ...s })) || []}
              onChange={(items) =>
                onChange({
                  ...freightData,
                  air: {
                    ...freightData.air,
                    services: items.map(({ service, price, unit }) => ({ service, price, unit })),
                  },
                })
              }
              language={language}
              showRemarks={false}
            />

            {/* Remarks */}
            <div>
              <Label className="mb-2 block">{label.remarks}</Label>
              <EditableTextBlock
                value={freightData.air?.remarks || ""}
                onChange={(value) =>
                  onChange({
                    ...freightData,
                    air: { ...freightData.air, remarks: value },
                  })
                }
                rows={4}
              />
            </div>
          </div>
        )}
      </div>

      {/* Sea Freight Section */}
      <div className="border-2 border-[#6CB88A]/20 rounded-lg p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-[#6CB88A]/10 flex items-center justify-center">
            <ShipIcon className="w-5 h-5 text-[#6CB88A]" />
          </div>
          <div className="flex-1 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">{label.seaFreight}</h3>
            <button
              type="button"
              onClick={() =>
                onChange({
                  ...freightData,
                  sea: {
                    ...freightData.sea,
                    enabled: !freightData.sea?.enabled,
                  },
                })
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                freightData.sea?.enabled ? "bg-[#7BC9A6]" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  freightData.sea?.enabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {freightData.sea?.enabled && (
          <div className="space-y-4">
            {/* Export/Import Toggles */}
            <div className="flex items-center gap-6 mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={freightData.sea?.exportEnabled || false}
                  onChange={(e) =>
                    onChange({
                      ...freightData,
                      sea: { ...freightData.sea, exportEnabled: e.target.checked },
                    })
                  }
                  className="w-4 h-4 text-[#7BC9A6] rounded focus:ring-[#7BC9A6]"
                />
                <span className="text-sm font-medium text-gray-700">{label.export}</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={freightData.sea?.importEnabled || false}
                  onChange={(e) =>
                    onChange({
                      ...freightData,
                      sea: { ...freightData.sea, importEnabled: e.target.checked },
                    })
                  }
                  className="w-4 h-4 text-[#7BC9A6] rounded focus:ring-[#7BC9A6]"
                />
                <span className="text-sm font-medium text-gray-700">{label.import}</span>
              </label>
            </div>

            {/* Services Table */}
            <ServiceTable
              items={freightData.sea?.services?.map((s: any, i: number) => ({ no: i + 1, ...s })) || []}
              onChange={(items) =>
                onChange({
                  ...freightData,
                  sea: {
                    ...freightData.sea,
                    services: items.map(({ service, price, unit }) => ({ service, price, unit })),
                  },
                })
              }
              language={language}
              showRemarks={false}
            />

            {/* Remarks */}
            <div>
              <Label className="mb-2 block">{label.remarks}</Label>
              <EditableTextBlock
                value={freightData.sea?.remarks || ""}
                onChange={(value) =>
                  onChange({
                    ...freightData,
                    sea: { ...freightData.sea, remarks: value },
                  })
                }
                rows={4}
              />
            </div>
          </div>
        )}
      </div>

      {/* Optional Customs & License */}
      <ToggleSection
        enabled={freightData.customsLicense?.enabled || false}
        onToggle={(enabled) =>
          onChange({
            ...freightData,
            customsLicense: {
              ...freightData.customsLicense,
              enabled,
              items: enabled && (!freightData.customsLicense.items || freightData.customsLicense.items.length === 0)
                ? [{ no: 1, service: "", price: "", unit: "", remarks: "" }]
                : freightData.customsLicense.items || [],
            },
          })
        }
        title={label.customsLicense}
      >
        <ServiceTable
          items={freightData.customsLicense?.items || []}
          onChange={(items) =>
            onChange({
              ...freightData,
              customsLicense: { ...freightData.customsLicense, items },
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
          value={freightData.termsAndConditions || ""}
          onChange={(value) => onChange({ ...freightData, termsAndConditions: value })}
          rows={6}
          placeholder={
            language === "th"
              ? "กรอกเงื่อนไขการให้บริการระหว่างประเทศ เช่น\n1. ราคาดังกล่าวยังไม่รวมภาษีมูลค่าเพิ่ม 7%\n2. ราคาอาจเปลี่ยนแปลงตามอัตราน้ำมันเชื้อเพลิงและอัตราแลกเปลี่ยน\n3. เงื่อนไขการชำระเงิน: เครดิต 30 วัน"
              : "Enter terms and conditions for International Freight service, e.g.\n1. Prices exclude 7% VAT\n2. Prices subject to fuel surcharge and exchange rate\n3. Payment terms: 30 days credit"
          }
        />
      </div>
    </div>
  );
}