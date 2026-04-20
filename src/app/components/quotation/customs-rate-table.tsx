import { Plus, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface RateRow {
  no?: number;
  service: string;
  price: string;
  unit: string;
  remarks: string;
}

interface CustomsRateTableProps {
  title: string;
  bgColor: string;
  headerColor: string;
  buttonColor: string;
  ringColor: string;
  value: string;
  onChange: (value: string) => void;
  optional?: boolean;
}

export function CustomsRateTable({
  title,
  bgColor,
  headerColor,
  buttonColor,
  ringColor,
  value,
  onChange,
  optional = false,
}: CustomsRateTableProps) {
  const rows: RateRow[] = JSON.parse(value || "[]");

  const addRow = () => {
    const newRows = [...rows, { service: "", price: "", unit: "", remarks: "" }];
    onChange(JSON.stringify(newRows));
  };

  const updateRow = (idx: number, field: keyof RateRow, val: string) => {
    const updated = [...rows];
    updated[idx] = { ...updated[idx], [field]: val };
    onChange(JSON.stringify(updated));
  };

  const removeRow = (idx: number) => {
    const updated = rows.filter((_, i) => i !== idx);
    onChange(JSON.stringify(updated));
  };

  return (
    <div className={`${bgColor} rounded-lg p-3 space-y-3`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h4 className={`text-xs font-bold ${headerColor}`}>{title}</h4>
          {optional && (
            <span className="text-[10px] text-purple-600 bg-purple-100 px-2 py-0.5 rounded">
              optional
            </span>
          )}
        </div>
        <Button
          type="button"
          onClick={addRow}
          className={`h-7 text-xs ${buttonColor}`}
        >
          <Plus className="w-3 h-3 mr-1" /> Add Row
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs border border-gray-300">
          <thead className={headerColor.replace("text-", "bg-").replace("-900", "-100")}>
            <tr>
              <th className="border border-gray-300 px-2 py-1.5 text-left w-12">No.</th>
              <th className="border border-gray-300 px-2 py-1.5 text-left">Service</th>
              <th className="border border-gray-300 px-2 py-1.5 text-left w-24">PRICE</th>
              <th className="border border-gray-300 px-2 py-1.5 text-left w-24">UNIT</th>
              <th className="border border-gray-300 px-2 py-1.5 text-left">REMARKS</th>
              <th className="border border-gray-300 px-2 py-1.5 text-center w-16">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="border border-gray-300 px-2 py-3 text-center text-gray-500">
                  No data. Click "Add Row" to start.
                </td>
              </tr>
            ) : (
              rows.map((row, idx) => (
                <tr key={idx} className="bg-white">
                  <td className="border border-gray-300 px-2 py-1.5 text-center">{idx + 1}</td>
                  <td className="border border-gray-300 px-2 py-1.5">
                    <Input
                      value={row.service || ""}
                      onChange={(e) => updateRow(idx, "service", e.target.value)}
                      className={`h-7 text-xs border-0 ${ringColor}`}
                      placeholder="Service name"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-1.5">
                    <Input
                      value={row.price || ""}
                      onChange={(e) => updateRow(idx, "price", e.target.value)}
                      className={`h-7 text-xs border-0 ${ringColor}`}
                      placeholder="0.00"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-1.5">
                    <Input
                      value={row.unit || ""}
                      onChange={(e) => updateRow(idx, "unit", e.target.value)}
                      className={`h-7 text-xs border-0 ${ringColor}`}
                      placeholder="THB"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-1.5">
                    <Input
                      value={row.remarks || ""}
                      onChange={(e) => updateRow(idx, "remarks", e.target.value)}
                      className={`h-7 text-xs border-0 ${ringColor}`}
                      placeholder="Remarks"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-1.5 text-center">
                    <Button
                      type="button"
                      onClick={() => removeRow(idx)}
                      className="h-6 w-6 p-0 bg-red-500 hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
