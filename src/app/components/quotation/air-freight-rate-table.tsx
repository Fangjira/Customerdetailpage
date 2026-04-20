import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export type AirFreightRateRow = {
  id: string;
  no: string;
  airline: string;
  product: string;
  service: string;
  weight: string;
  pol: string;
  pod: string;
  routing: string;
  transit: string;
  transitTime: string;
  price: string;
  unit: string;
  importExportCountry: string; // NEW: Import/Export column
  remarks: string;
};

export type AirFreightRateTableData = {
  rows: AirFreightRateRow[];
};

interface AirFreightRateTableProps {
  title: string;
  optional?: boolean;
  data: AirFreightRateTableData;
  onChange: (data: AirFreightRateTableData) => void;
}

const createEmptyRow = (no: number): AirFreightRateRow => ({
  id: String(no),
  no: String(no),
  airline: "",
  product: "",
  service: "",
  weight: "",
  pol: "",
  pod: "",
  routing: "",
  transit: "",
  transitTime: "",
  price: "",
  unit: "",
  importExportCountry: "", // NEW: Import/Export column
  remarks: "",
});

export function AirFreightRateTable({ title, optional, data, onChange }: AirFreightRateTableProps) {
  const [isVisible, setIsVisible] = React.useState(true);

  // Initialize with 3 rows if empty
  React.useEffect(() => {
    if (!data || data.rows.length === 0) {
      onChange({
        rows: [createEmptyRow(1), createEmptyRow(2), createEmptyRow(3)],
      });
    }
  }, [data, onChange]);

  const addRow = () => {
    const newRowNumber = data.rows.length + 1;
    onChange({ rows: [...data.rows, createEmptyRow(newRowNumber)] });
  };

  const removeRow = (rowId: string) => {
    const updatedRows = data.rows.filter(row => row.id !== rowId);
    // Re-number rows
    const renumberedRows = updatedRows.map((row, idx) => ({
      ...row,
      id: String(idx + 1),
      no: String(idx + 1),
    }));
    onChange({ rows: renumberedRows });
  };

  const removeSection = () => {
    onChange({ rows: [] });
    setIsVisible(false);
  };

  const restoreSection = () => {
    onChange({
      rows: [createEmptyRow(1), createEmptyRow(2), createEmptyRow(3)],
    });
    setIsVisible(true);
  };

  const updateCell = (rowId: string, field: keyof AirFreightRateRow, value: string) => {
    const updatedRows = data.rows.map(row => {
      if (row.id === rowId) {
        return { ...row, [field]: value };
      }
      return row;
    });
    onChange({ rows: updatedRows });
  };

  // If section is removed and is optional, show restore button
  if (optional && !isVisible) {
    return (
      <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-semibold text-gray-700">{title}</h4>
            <p className="text-xs text-gray-500 mt-1">Section ถูกลบออกแล้ว</p>
          </div>
          <Button
            type="button"
            onClick={restoreSection}
            size="sm"
            variant="outline"
            className="h-8 text-xs"
          >
            <Plus className="w-3 h-3 mr-1" />
            เพิ่ม Section นี้
          </Button>
        </div>
      </div>
    );
  }

  if (!data || data.rows.length === 0) {
    return <div className="text-xs text-gray-500">Loading...</div>;
  }

  return (
    <div className="space-y-3">
      {/* Header with Add Row button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h4 className="text-xs font-bold text-gray-800">{title}</h4>
          {optional && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">Optional</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {optional && (
            <Button
              type="button"
              onClick={removeSection}
              size="sm"
              variant="outline"
              className="h-8 text-xs text-red-600 border-red-300 hover:bg-red-50"
            >
              <Trash2 className="w-3 h-3 mr-1" />
              ลบ Section
            </Button>
          )}
          <Button
            type="button"
            onClick={addRow}
            size="sm"
            className="h-8 text-xs bg-[#7BC9A6] hover:bg-[#6AB896] text-white"
          >
            <Plus className="w-3 h-3 mr-1" />
            Add Row
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="border border-gray-300 rounded-lg overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-[#7BC9A6] text-white">
            <tr>
              <th className="px-2 py-2 text-center font-semibold min-w-[40px] border-r border-white/20">
                NO.
              </th>
              <th className="px-2 py-2 text-left font-semibold min-w-[120px] border-r border-white/20">
                AIRLINE/<br/>CARRIER
              </th>
              <th className="px-2 py-2 text-left font-semibold min-w-[100px] border-r border-white/20">
                PRODUCT<br/>(OPTIONAL)
              </th>
              <th className="px-2 py-2 text-left font-semibold min-w-[100px] border-r border-white/20">
                Service<br/>(OPTIONAL)
              </th>
              <th className="px-2 py-2 text-left font-semibold min-w-[100px] border-r border-white/20">
                WEIGHT [kg]<br/>(OPTIONAL)
              </th>
              <th className="px-2 py-2 text-left font-semibold min-w-[80px] border-r border-white/20">
                POL
              </th>
              <th className="px-2 py-2 text-left font-semibold min-w-[80px] border-r border-white/20">
                POD
              </th>
              <th className="px-2 py-2 text-left font-semibold min-w-[100px] border-r border-white/20">
                ROUTING<br/>OPTIONAL
              </th>
              <th className="px-2 py-2 text-left font-semibold min-w-[100px] border-r border-white/20">
                TRANSIT<br/>(OPTIONAL)
              </th>
              <th className="px-2 py-2 text-left font-semibold min-w-[100px] border-r border-white/20">
                TRANSIT TIME<br/>(OPTIONAL)
              </th>
              <th className="px-2 py-2 text-left font-semibold min-w-[100px] border-r border-white/20">
                PRICE<br/>(OPTIONAL)
              </th>
              <th className="px-2 py-2 text-left font-semibold min-w-[80px] border-r border-white/20">
                UNIT<br/>(OPTIONAL)
              </th>
              <th className="px-2 py-2 text-left font-semibold min-w-[140px] border-r border-white/20 bg-pink-400">
                ImportExport column<br/>(ระบุประเทศนำเข้า-ส่งออก)
              </th>
              <th className="px-2 py-2 text-left font-semibold min-w-[120px] border-r border-white/20">
                REMARKS<br/>(OPTIONAL)
              </th>
              <th className="px-2 py-2 w-10"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.rows.map((row) => (
              <tr key={row.id} className="group hover:bg-gray-50">
                <td className="px-2 py-2 text-center border-r border-gray-200">
                  <span className="text-gray-700 font-medium">{row.no}</span>
                </td>
                <td className="px-2 py-2 border-r border-gray-200">
                  <Input
                    value={row.airline}
                    onChange={(e) => updateCell(row.id, "airline", e.target.value)}
                    className="h-8 text-xs bg-white border-gray-300 focus:border-[#7BC9A6]"
                    placeholder=""
                  />
                </td>
                <td className="px-2 py-2 border-r border-gray-200">
                  <Input
                    value={row.product}
                    onChange={(e) => updateCell(row.id, "product", e.target.value)}
                    className="h-8 text-xs bg-white border-gray-300 focus:border-[#7BC9A6]"
                    placeholder=""
                  />
                </td>
                <td className="px-2 py-2 border-r border-gray-200">
                  <Input
                    value={row.service}
                    onChange={(e) => updateCell(row.id, "service", e.target.value)}
                    className="h-8 text-xs bg-white border-gray-300 focus:border-[#7BC9A6]"
                    placeholder=""
                  />
                </td>
                <td className="px-2 py-2 border-r border-gray-200">
                  <Input
                    value={row.weight}
                    onChange={(e) => updateCell(row.id, "weight", e.target.value)}
                    className="h-8 text-xs bg-white border-gray-300 focus:border-[#7BC9A6]"
                    placeholder=""
                  />
                </td>
                <td className="px-2 py-2 border-r border-gray-200">
                  <Input
                    value={row.pol}
                    onChange={(e) => updateCell(row.id, "pol", e.target.value)}
                    className="h-8 text-xs bg-white border-gray-300 focus:border-[#7BC9A6]"
                    placeholder="[Location]"
                  />
                </td>
                <td className="px-2 py-2 border-r border-gray-200">
                  <Input
                    value={row.pod}
                    onChange={(e) => updateCell(row.id, "pod", e.target.value)}
                    className="h-8 text-xs bg-white border-gray-300 focus:border-[#7BC9A6]"
                    placeholder="[Location]"
                  />
                </td>
                <td className="px-2 py-2 border-r border-gray-200">
                  <Input
                    value={row.routing}
                    onChange={(e) => updateCell(row.id, "routing", e.target.value)}
                    className="h-8 text-xs bg-white border-gray-300 focus:border-[#7BC9A6]"
                    placeholder=""
                  />
                </td>
                <td className="px-2 py-2 border-r border-gray-200">
                  <Input
                    value={row.transit}
                    onChange={(e) => updateCell(row.id, "transit", e.target.value)}
                    className="h-8 text-xs bg-white border-gray-300 focus:border-[#7BC9A6]"
                    placeholder=""
                  />
                </td>
                <td className="px-2 py-2 border-r border-gray-200">
                  <Input
                    value={row.transitTime}
                    onChange={(e) => updateCell(row.id, "transitTime", e.target.value)}
                    className="h-8 text-xs bg-white border-gray-300 focus:border-[#7BC9A6]"
                    placeholder=""
                  />
                </td>
                <td className="px-2 py-2 border-r border-gray-200">
                  <Input
                    value={row.price}
                    onChange={(e) => updateCell(row.id, "price", e.target.value)}
                    className="h-8 text-xs bg-white border-gray-300 focus:border-[#7BC9A6]"
                    placeholder=""
                  />
                </td>
                <td className="px-2 py-2 border-r border-gray-200">
                  <Input
                    value={row.unit}
                    onChange={(e) => updateCell(row.id, "unit", e.target.value)}
                    className="h-8 text-xs bg-white border-gray-300 focus:border-[#7BC9A6]"
                    placeholder=""
                  />
                </td>
                <td className="px-2 py-2 border-r border-gray-200">
                  <Input
                    value={row.importExportCountry}
                    onChange={(e) => updateCell(row.id, "importExportCountry", e.target.value)}
                    className="h-8 text-xs bg-white border-gray-300 focus:border-[#7BC9A6]"
                    placeholder="[Currency/Unit ext/Period]"
                  />
                </td>
                <td className="px-2 py-2">
                  <Input
                    value={row.remarks}
                    onChange={(e) => updateCell(row.id, "remarks", e.target.value)}
                    className="h-8 text-xs bg-white border-gray-300 focus:border-[#7BC9A6]"
                    placeholder=""
                  />
                </td>
                <td className="px-2 py-2">
                  <button
                    onClick={() => removeRow(row.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
                    title="Remove row"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Note */}
      <div className="text-[10px] text-gray-500 italic">
        Note: กรอกข้อมูลในช่องที่ต้องการ คอลัมน์ที่มี (OPTIONAL) สามารถเว้นว่างได้
      </div>
    </div>
  );
}