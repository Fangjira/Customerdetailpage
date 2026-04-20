import React from "react";
import { Plus, Trash2, X } from "lucide-react";
import { Button } from "../ui/button";

export type CrossBorderTableRow = {
  id: string;
  truckType: string;
  origin: string;
  originPort: string;
  destination: string;
  destinationPort: string;
  product: string;
  kmFromPort: string;
  totalKm: string;
  volume: string;
  truckingPrice: string;
  customsPrice: string;
  totalPrice: string;
  unit: string;
  customsWork: string;
  remarks: string;
};

export type CrossBorderRateTableData = {
  rows: CrossBorderTableRow[];
};

interface CrossBorderRateTableProps {
  data: CrossBorderRateTableData;
  onChange: (data: CrossBorderRateTableData) => void;
}

// Helper function to generate unique IDs with crypto randomness
const generateUniqueId = () => {
  // Use crypto.getRandomValues for better randomness
  const array = new Uint32Array(2);
  crypto.getRandomValues(array);
  return `row-${Date.now()}-${array[0]}-${array[1]}`;
};

const DEFAULT_ROW: Omit<CrossBorderTableRow, "id"> = {
  truckType: "[Truck Type]",
  origin: "[Province]",
  originPort: "",
  destination: "[Province]",
  destinationPort: "",
  product: "[Auto Calculation]",
  kmFromPort: "[Auto Calculation]",
  totalKm: "[Auto Calculation]",
  volume: "",
  truckingPrice: "",
  customsPrice: "",
  totalPrice: "",
  unit: "",
  customsWork: "[Currency/Unit/Period]",
  remarks: "",
};

// Helper to ensure all rows have unique IDs
const ensureUniqueIds = (rows: CrossBorderTableRow[]): CrossBorderTableRow[] => {
  const seenIds = new Set<string>();
  return rows.map((row) => {
    // If ID is duplicate or invalid, generate a new one
    if (!row.id || seenIds.has(row.id)) {
      const newId = generateUniqueId();
      seenIds.add(newId);
      return { ...row, id: newId };
    }
    seenIds.add(row.id);
    return row;
  });
};

export function CrossBorderRateTable({ data, onChange }: CrossBorderRateTableProps) {
  const initializedRef = React.useRef(false);
  
  // Lazy initial state - only run once
  const [localData, setLocalData] = React.useState<CrossBorderRateTableData>(() => {
    if (data && data.rows && data.rows.length > 0) {
      // Use existing data but ensure unique IDs
      return { rows: ensureUniqueIds(data.rows) };
    }
    // Otherwise create default rows
    initializedRef.current = true;
    const defaultRows: CrossBorderTableRow[] = [
      { id: generateUniqueId(), ...DEFAULT_ROW },
      { id: generateUniqueId(), ...DEFAULT_ROW },
      { id: generateUniqueId(), ...DEFAULT_ROW },
    ];
    return { rows: defaultRows };
  });

  // Notify parent of initial state only once
  React.useEffect(() => {
    if (initializedRef.current) {
      onChange(localData);
    }
  }, []);

  const handleChange = (newData: CrossBorderRateTableData) => {
    setLocalData(newData);
    onChange(newData);
  };

  const addRow = () => {
    const newRow: CrossBorderTableRow = {
      id: generateUniqueId(),
      ...DEFAULT_ROW,
    };
    handleChange({ rows: [...localData.rows, newRow] });
  };

  const removeRow = (rowId: string) => {
    if (localData.rows.length <= 1) return; // Keep at least one row
    const updatedRows = localData.rows.filter(row => row.id !== rowId);
    handleChange({ rows: updatedRows });
  };

  const updateCell = (rowId: string, field: keyof Omit<CrossBorderTableRow, "id">, value: string) => {
    const updatedRows = localData.rows.map(row =>
      row.id === rowId ? { ...row, [field]: value } : row
    );
    handleChange({ rows: updatedRows });
  };

  if (!localData || !localData.rows) return null;

  return (
    <div className="space-y-3">
      {/* Header with Add Row button */}
      <div className="flex items-center justify-end">
        <Button
          type="button"
          onClick={addRow}
          size="sm"
          className="h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-3 h-3 mr-1" />
          Add Row
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-3 py-3 text-left w-12 font-semibold text-gray-700 text-xs uppercase">No.</th>
              <th className="border border-gray-200 px-3 py-3 text-left w-24 font-semibold text-gray-700 text-xs uppercase">
                TRUCK<br />TYPE
              </th>
              <th className="border border-gray-200 px-3 py-3 text-left w-24 font-semibold text-gray-700 text-xs uppercase">
                ORIGIN<br /><span className="text-[10px] font-normal text-gray-400 normal-case">(Optional)</span>
              </th>
              <th className="border border-gray-200 px-3 py-3 text-left w-32 font-semibold text-gray-700 text-xs uppercase">
                ORIGIN<br />PORT/<br />CHECKPOINT
              </th>
              <th className="border border-gray-200 px-3 py-3 text-left w-24 font-semibold text-gray-700 text-xs uppercase">DESTINATION</th>
              <th className="border border-gray-200 px-3 py-3 text-left w-32 font-semibold text-gray-700 text-xs uppercase">
                DESTINATION<br />PORT<br /><span className="text-[10px] font-normal text-gray-400 normal-case">(Optional)</span>
              </th>
              <th className="border border-gray-200 px-3 py-3 text-left w-24 font-semibold text-gray-700 text-xs uppercase">
                PRODUCT<br /><span className="text-[10px] font-normal text-gray-400 normal-case">(Optional)</span>
              </th>
              <th className="border border-gray-200 px-3 py-3 text-left w-24 font-semibold text-gray-700 text-xs uppercase">
                km from<br />PORT<br /><span className="text-[10px] font-normal text-gray-400 normal-case">(Optional)</span>
              </th>
              <th className="border border-gray-200 px-3 py-3 text-left w-20 font-semibold text-gray-700 text-xs uppercase">
                Total<br />km<br /><span className="text-[10px] font-normal text-gray-400 normal-case">(Optional)</span>
              </th>
              <th className="border border-gray-200 px-3 py-3 text-left w-20 font-semibold text-gray-700 text-xs uppercase">
                Volume<br /><span className="text-[10px] font-normal text-gray-400 normal-case">(Optional)</span>
              </th>
              <th className="border border-gray-200 px-3 py-3 text-left w-28 font-semibold text-gray-700 text-xs uppercase">
                TRUCK<br />PRICE
              </th>
              <th className="border border-gray-200 px-3 py-3 text-left w-28 font-semibold text-gray-700 text-xs uppercase">
                CUSTOMS<br />PRICE
              </th>
              <th className="border border-gray-200 px-3 py-3 text-left w-24 font-semibold text-gray-700 text-xs uppercase">
                Total<br />Price
              </th>
              <th className="border border-gray-200 px-3 py-3 text-left w-20 font-semibold text-gray-700 text-xs uppercase">UNIT</th>
              <th className="border border-gray-200 px-3 py-3 text-left w-32 font-semibold text-orange-600 text-xs uppercase bg-orange-50">
                งานพิธีการ<br />ศุลกากร
              </th>
              <th className="border border-gray-200 px-3 py-3 text-left w-28 font-semibold text-gray-700 text-xs uppercase">REMARKS</th>
              <th className="border border-gray-200 px-3 py-3 w-20 text-center font-semibold text-gray-700 text-xs uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {localData.rows.map((row, index) => (
              <tr key={row.id}>
                <td className="border border-gray-200 px-3 py-2 text-center text-gray-500 text-sm">{index + 1}</td>
                <td className="border border-gray-200 px-2 py-1">
                  <input
                    type="text"
                    value={row.truckType}
                    onChange={(e) => updateCell(row.id, "truckType", e.target.value)}
                    className="w-full px-2 py-1.5 text-sm text-gray-400 border-0 focus:outline-none focus:ring-1 focus:ring-[#7BC9A6] rounded bg-transparent"
                    placeholder="[Truck Type]"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1">
                  <input
                    type="text"
                    value={row.origin}
                    onChange={(e) => updateCell(row.id, "origin", e.target.value)}
                    className="w-full px-2 py-1.5 text-sm text-gray-400 border-0 focus:outline-none focus:ring-1 focus:ring-[#7BC9A6] rounded bg-transparent"
                    placeholder="[Province]"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1">
                  <input
                    type="text"
                    value={row.originPort}
                    onChange={(e) => updateCell(row.id, "originPort", e.target.value)}
                    className="w-full px-2 py-1.5 text-sm text-gray-400 border-0 focus:outline-none focus:ring-1 focus:ring-[#7BC9A6] rounded bg-transparent"
                    placeholder="Origin port"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1">
                  <input
                    type="text"
                    value={row.destination}
                    onChange={(e) => updateCell(row.id, "destination", e.target.value)}
                    className="w-full px-2 py-1.5 text-sm text-gray-400 border-0 focus:outline-none focus:ring-1 focus:ring-[#7BC9A6] rounded bg-transparent"
                    placeholder="[Province]"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1">
                  <input
                    type="text"
                    value={row.destinationPort}
                    onChange={(e) => updateCell(row.id, "destinationPort", e.target.value)}
                    className="w-full px-2 py-1.5 text-sm text-gray-400 border-0 focus:outline-none focus:ring-1 focus:ring-[#7BC9A6] rounded bg-transparent"
                    placeholder="Destination"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1">
                  <input
                    type="text"
                    value={row.product}
                    onChange={(e) => updateCell(row.id, "product", e.target.value)}
                    className="w-full px-2 py-1.5 text-sm text-gray-400 border-0 focus:outline-none focus:ring-1 focus:ring-[#7BC9A6] rounded bg-transparent"
                    placeholder="[Auto Calculation]"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1">
                  <input
                    type="text"
                    value={row.kmFromPort}
                    onChange={(e) => updateCell(row.id, "kmFromPort", e.target.value)}
                    className="w-full px-2 py-1.5 text-sm text-gray-400 border-0 focus:outline-none focus:ring-1 focus:ring-[#7BC9A6] rounded bg-transparent"
                    placeholder="[Auto Calculation]"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1">
                  <input
                    type="text"
                    value={row.totalKm}
                    onChange={(e) => updateCell(row.id, "totalKm", e.target.value)}
                    className="w-full px-2 py-1.5 text-sm text-gray-400 border-0 focus:outline-none focus:ring-1 focus:ring-[#7BC9A6] rounded bg-transparent"
                    placeholder="[Auto Calculation]"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1">
                  <input
                    type="text"
                    value={row.volume}
                    onChange={(e) => updateCell(row.id, "volume", e.target.value)}
                    className="w-full px-2 py-1.5 text-sm text-gray-400 border-0 focus:outline-none focus:ring-1 focus:ring-[#7BC9A6] rounded bg-transparent text-right"
                    placeholder="0"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1">
                  <input
                    type="text"
                    value={row.truckingPrice}
                    onChange={(e) => updateCell(row.id, "truckingPrice", e.target.value)}
                    className="w-full px-2 py-1.5 text-sm text-gray-400 border-0 focus:outline-none focus:ring-1 focus:ring-[#7BC9A6] rounded bg-transparent text-right"
                    placeholder="0.00"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1">
                  <input
                    type="text"
                    value={row.customsPrice}
                    onChange={(e) => updateCell(row.id, "customsPrice", e.target.value)}
                    className="w-full px-2 py-1.5 text-sm text-gray-400 border-0 focus:outline-none focus:ring-1 focus:ring-[#7BC9A6] rounded bg-transparent text-right"
                    placeholder="0.00"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1">
                  <input
                    type="text"
                    value={row.totalPrice}
                    onChange={(e) => updateCell(row.id, "totalPrice", e.target.value)}
                    className="w-full px-2 py-1.5 text-sm text-gray-400 border-0 focus:outline-none focus:ring-1 focus:ring-[#7BC9A6] rounded bg-transparent text-right"
                    placeholder="0.00"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1">
                  <input
                    type="text"
                    value={row.unit}
                    onChange={(e) => updateCell(row.id, "unit", e.target.value)}
                    className="w-full px-2 py-1.5 text-sm text-gray-400 border-0 focus:outline-none focus:ring-1 focus:ring-[#7BC9A6] rounded bg-transparent text-center"
                    placeholder="THB"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 bg-orange-50/30">
                  <input
                    type="text"
                    value={row.customsWork}
                    onChange={(e) => updateCell(row.id, "customsWork", e.target.value)}
                    className="w-full px-2 py-1.5 text-sm text-gray-400 border-0 focus:outline-none focus:ring-1 focus:ring-orange-400 rounded bg-transparent"
                    placeholder="[Currency/Unit/Period]"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1">
                  <input
                    type="text"
                    value={row.remarks}
                    onChange={(e) => updateCell(row.id, "remarks", e.target.value)}
                    className="w-full px-2 py-1.5 text-sm text-gray-400 border-0 focus:outline-none focus:ring-1 focus:ring-[#7BC9A6] rounded bg-transparent"
                    placeholder="Remarks"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-2 text-center">
                  <button
                    onClick={() => removeRow(row.id)}
                    className="w-7 h-7 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center mx-auto transition-colors"
                    title="Delete row"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}