import { CrossBorderData, LanguageType } from "../quotation-types";
import { ServiceTable } from "../dynamic-tables";

interface CrossBorderPreviewProps {
  data: any;
  language: LanguageType;
}

export function CrossBorderPreview({ data, language }: CrossBorderPreviewProps) {
  const crossBorderData = data as CrossBorderData;

  const labels = {
    th: {
      rateTable: "4.1 ตารางอัตราค่าบริการขนส่งข้ามพรมแดน",
      rateSummary: "4.2 สรุปอัตราค่าบริการ",
      clmvRemarks: "หมายเหตุ CLMV",
      jtsRemarks: "หมายเหตุ JTS",
      salesCustomsRemarks: "หมายเหตุ Sales & Customs",
      customsLicense: "4.3 พิธีการศุลกากรและใบอนุญาต (ถ้ามี)",
      route: "เส้นทาง",
      vehicleType: "ประเภทรถ",
      qty: "จำนวน",
      unit: "หน่วย",
      pricePerTrip: "ราคา/เที่ยว",
      fixedCost: "ค่าใช้จ่ายคงที่",
      remarks: "หมายเหตุ",
    },
    en: {
      rateTable: "4.1 Cross-Border Transport Rate Table",
      rateSummary: "4.2 Rate Summary",
      clmvRemarks: "CLMV Remarks",
      jtsRemarks: "JTS Remarks",
      salesCustomsRemarks: "Sales & Customs Remarks",
      customsLicense: "4.3 Customs & License (If applicable)",
      route: "Route",
      vehicleType: "Vehicle Type",
      qty: "Qty",
      unit: "Unit",
      pricePerTrip: "Price/Trip",
      fixedCost: "Fixed cost",
      remarks: "Remarks",
    },
  };

  const label = labels[language];

  return (
    <div className="space-y-6">
      {/* Cross-Border Rate Table */}
      {crossBorderData.rateTable?.enabled && crossBorderData.rateTable.rows.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">{label.rateTable}</h4>
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold border-r border-gray-300">
                    {label.route}
                  </th>
                  <th className="px-3 py-2 text-left font-semibold border-r border-gray-300">
                    {label.vehicleType}
                  </th>
                  <th className="px-3 py-2 text-center font-semibold border-r border-gray-300 w-20">
                    {label.qty}
                  </th>
                  <th className="px-3 py-2 text-center font-semibold border-r border-gray-300 w-24">
                    {label.unit}
                  </th>
                  <th className="px-3 py-2 text-right font-semibold border-r border-gray-300 w-28">
                    {label.pricePerTrip}
                  </th>
                  <th className="px-3 py-2 text-right font-semibold border-r border-gray-300 w-28">
                    {label.fixedCost}
                  </th>
                  <th className="px-3 py-2 text-left font-semibold">
                    {label.remarks}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {crossBorderData.rateTable.rows.map((row, index) => (
                  <tr key={row.id || index}>
                    <td className="px-3 py-2 text-gray-700 border-r border-gray-200">{row.route || "-"}</td>
                    <td className="px-3 py-2 text-gray-700 border-r border-gray-200">{row.vehicleType || "-"}</td>
                    <td className="px-3 py-2 text-center text-gray-700 border-r border-gray-200">{row.qty || "-"}</td>
                    <td className="px-3 py-2 text-center text-gray-700 border-r border-gray-200">{row.unit || "-"}</td>
                    <td className="px-3 py-2 text-right text-gray-700 border-r border-gray-200">{row.pricePerTrip || "-"}</td>
                    <td className="px-3 py-2 text-right text-gray-700 border-r border-gray-200">{row.fixedCost || "-"}</td>
                    <td className="px-3 py-2 text-gray-700">{row.remarks || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Rate Summary */}
      {crossBorderData.rateSummary && (
        <div className="bg-[#7BC9A6]/5 rounded-lg p-6 border-l-4 border-[#7BC9A6]">
          <h4 className="font-semibold text-gray-900 mb-3">{label.rateSummary}</h4>
          <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed font-medium">
            {crossBorderData.rateSummary}
          </p>
        </div>
      )}

      {/* Remarks Sections */}
      <div className="grid grid-cols-1 gap-4">
        {crossBorderData.clmvRemarks && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2 text-sm">{label.clmvRemarks}</h4>
            <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
              {crossBorderData.clmvRemarks}
            </p>
          </div>
        )}

        {crossBorderData.jtsRemarks && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2 text-sm">{label.jtsRemarks}</h4>
            <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
              {crossBorderData.jtsRemarks}
            </p>
          </div>
        )}

        {crossBorderData.salesCustomsRemarks && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2 text-sm">{label.salesCustomsRemarks}</h4>
            <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
              {crossBorderData.salesCustomsRemarks}
            </p>
          </div>
        )}
      </div>

      {/* Optional Customs & License */}
      {crossBorderData.customsLicense?.enabled && crossBorderData.customsLicense.items.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">{label.customsLicense}</h4>
          <ServiceTable
            items={crossBorderData.customsLicense.items}
            onChange={() => {}}
            language={language}
            preview={true}
            showRemarks={true}
          />
        </div>
      )}

      {/* Terms & Conditions Section */}
      {crossBorderData.termsAndConditions && (
        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 mt-4">
          <h4 className="font-bold text-gray-900 mb-2 text-sm">
            {language === "th" ? "5. TERMS & CONDITIONS / เงื่อนไข" : "5. TERMS & CONDITIONS"}
          </h4>
          <p className="text-sm text-gray-900 whitespace-pre-wrap leading-relaxed">
            {crossBorderData.termsAndConditions}
          </p>
        </div>
      )}
    </div>
  );
}
