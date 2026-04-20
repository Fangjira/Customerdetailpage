import { InternationalFreightData, LanguageType } from "../quotation-types";
import { AirFreightRateRow } from "../air-freight-rate-table";

interface InternationalFreightPreviewProps {
  data: any;
  language: LanguageType;
}

export function InternationalFreightPreview({ data, language }: InternationalFreightPreviewProps) {
  const freightData = data as InternationalFreightData;

  // Parse the rate data from JSON strings
  const airExportData = freightData.airFreightExportRateData 
    ? JSON.parse(freightData.airFreightExportRateData)
    : { rows: [] };
  const airImportData = freightData.airFreightImportRateData
    ? JSON.parse(freightData.airFreightImportRateData)
    : { rows: [] };
  const seaExportData = freightData.seaFreightExportRateData
    ? JSON.parse(freightData.seaFreightExportRateData)
    : { rows: [] };
  const seaImportData = freightData.seaFreightImportRateData
    ? JSON.parse(freightData.seaFreightImportRateData)
    : { rows: [] };

  const labels = {
    th: {
      rate: "3. RATE / ค่าบริการ",
      airFreightExport: "3.1.1.1 AIR FREIGHT RATE (EXPORT)",
      airFreightImport: "3.1.2 AIR FREIGHT RATE (IMPORT)",
      seaFreightExport: "3.2.1 SEA FREIGHT RATE (EXPORT)",
      seaFreightImport: "3.2.2 SEA FREIGHT RATE (IMPORT)",
      remarks: "หมายเหตุ",
    },
    en: {
      rate: "3. RATE",
      airFreightExport: "3.1.1.1 AIR FREIGHT RATE (EXPORT)",
      airFreightImport: "3.1.2 AIR FREIGHT RATE (IMPORT)",
      seaFreightExport: "3.2.1 SEA FREIGHT RATE (EXPORT)",
      seaFreightImport: "3.2.2 SEA FREIGHT RATE (IMPORT)",
      remarks: "Remarks",
    },
  };

  const label = labels[language];

  // Render Rate Table
  const renderRateTable = (title: string, rows: AirFreightRateRow[]) => {
    if (!rows || rows.length === 0) return null;

    return (
      <div className="mb-6">
        <h5 className="text-sm font-bold text-gray-800 mb-3">{title}</h5>
        <div className="overflow-x-auto border border-gray-300 rounded-lg">
          <table className="w-full text-xs">
            <thead className="bg-[#7BC9A6] text-white">
              <tr>
                <th className="px-2 py-2 text-center font-semibold border-r border-white/20">NO.</th>
                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">AIRLINE/CARRIER</th>
                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">PRODUCT</th>
                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">Service</th>
                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">WEIGHT [kg]</th>
                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">POL</th>
                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">POD</th>
                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">ROUTING</th>
                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">TRANSIT</th>
                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">TRANSIT TIME</th>
                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">PRICE</th>
                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">UNIT</th>
                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">Currency/Unit</th>
                <th className="px-2 py-2 text-left font-semibold">REMARKS</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className="px-2 py-2 text-center border-r border-gray-200">{row.no}</td>
                  <td className="px-2 py-2 border-r border-gray-200">{row.airline || "-"}</td>
                  <td className="px-2 py-2 border-r border-gray-200">{row.product || "-"}</td>
                  <td className="px-2 py-2 border-r border-gray-200">{row.service || "-"}</td>
                  <td className="px-2 py-2 border-r border-gray-200">{row.weight || "-"}</td>
                  <td className="px-2 py-2 border-r border-gray-200">{row.pol || "-"}</td>
                  <td className="px-2 py-2 border-r border-gray-200">{row.pod || "-"}</td>
                  <td className="px-2 py-2 border-r border-gray-200">{row.routing || "-"}</td>
                  <td className="px-2 py-2 border-r border-gray-200">{row.transit || "-"}</td>
                  <td className="px-2 py-2 border-r border-gray-200">{row.transitTime || "-"}</td>
                  <td className="px-2 py-2 border-r border-gray-200">{row.price || "-"}</td>
                  <td className="px-2 py-2 border-r border-gray-200">{row.unit || "-"}</td>
                  <td className="px-2 py-2 border-r border-gray-200">{row.currencyUnit || "-"}</td>
                  <td className="px-2 py-2">{row.remarks || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Air Freight Export */}
      {airExportData.rows.length > 0 && renderRateTable(label.airFreightExport, airExportData.rows)}

      {/* Air Freight Import */}
      {airImportData.rows.length > 0 && renderRateTable(label.airFreightImport, airImportData.rows)}

      {/* Sea Freight Export */}
      {seaExportData.rows.length > 0 && renderRateTable(label.seaFreightExport, seaExportData.rows)}

      {/* Sea Freight Import */}
      {seaImportData.rows.length > 0 && renderRateTable(label.seaFreightImport, seaImportData.rows)}

      {/* Rate Remarks */}
      {freightData.freightRateRemarks && (
        <div className="bg-gray-50 rounded-lg p-4 mt-4">
          <p className="text-xs font-medium text-gray-700 mb-2">{label.remarks}</p>
          <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
            {freightData.freightRateRemarks}
          </p>
        </div>
      )}

      {/* Terms & Conditions Section */}
      {freightData.termsAndConditions && (
        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 mt-4">
          <h4 className="font-bold text-gray-900 mb-2 text-sm">
            {language === "th" ? "5. TERMS & CONDITIONS / เงื่อนไข" : "5. TERMS & CONDITIONS"}
          </h4>
          <p className="text-sm text-gray-900 whitespace-pre-wrap leading-relaxed">
            {freightData.termsAndConditions}
          </p>
        </div>
      )}
    </div>
  );
}