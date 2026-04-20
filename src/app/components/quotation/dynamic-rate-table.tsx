import React, { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export type TableColumn = {
  id: string;
  label: string;
  labelEn?: string;
  fixed: boolean;
  position: "start" | "middle" | "end";
  optional?: boolean; // for columns like Km that can be hidden
};

export type TableRow = {
  id: string;
  cells: Record<string, string>;
};

export type RateTableData = {
  columns: TableColumn[];
  rows: TableRow[];
};

interface DynamicRateTableProps {
  tableType: "warehousing" | "transport" | "international" | "sea-freight";
  data: RateTableData;
  onChange: (data: RateTableData) => void;
}

const WAREHOUSING_DEFAULT_COLUMNS: TableColumn[] = [
  { id: "no", label: "No.\nลำดับ", fixed: true, position: "start" },
  { id: "service", label: "Service\nบริการ", fixed: true, position: "start" },
  { id: "rate", label: "Rate\nราคา", fixed: true, position: "end" },
  { id: "unit", label: "Unit\nหน่วย", fixed: true, position: "end" },
  { id: "remarks", label: "Remarks\nหมายเหตุ", fixed: true, position: "end" },
];

const TRANSPORT_DEFAULT_COLUMNS: TableColumn[] = [
  { id: "no", label: "No.\nลำดับ", fixed: true, position: "start" },
  { id: "truckType", label: "Truck Type\nประเภทรถบรรทุก", fixed: true, position: "start" },
  { id: "origin", label: "Origin\nต้นทาง", fixed: true, position: "start" },
  { id: "destination", label: "Destination\nปลายทาง", fixed: true, position: "start" },
  { id: "km", label: "Km กม.\n(Optional)", fixed: true, position: "middle", optional: true },
  { id: "price", label: "Price\nราคา", fixed: true, position: "end" },
  { id: "unit", label: "Unit\nหน่วย", fixed: true, position: "end" },
  { id: "remarks", label: "Remarks\nหมายเหตุ", fixed: true, position: "end" },
];

const INTERNATIONAL_DEFAULT_COLUMNS: TableColumn[] = [
  { id: "no", label: "No.\nลำดับ", fixed: true, position: "start" },
  { id: "airlineCarrier", label: "AIRLINE/CARRIER\nสายการบิน/ผู้ขนส่ง", fixed: true, position: "start" },
  { id: "productService", label: "PRODUCT Service\nประเภทบริการ\n(OPTIONAL)", fixed: true, position: "middle", optional: true },
  { id: "weight", label: "WEIGHT (kg)\nน้ำหนัก\n(OPTIONAL)", fixed: true, position: "middle", optional: true },
  { id: "pol", label: "POL\nท่าต้นทาง", fixed: true, position: "middle" },
  { id: "pod", label: "POD\nท่าปลายทาง", fixed: true, position: "middle" },
  { id: "routing", label: "ROUTING\nเส้นทาง\n(OPTIONAL)", fixed: true, position: "middle", optional: true },
  { id: "transit", label: "TRANSIT\nจุดแวะ\n(OPTIONAL)", fixed: true, position: "middle", optional: true },
  { id: "transitTime", label: "TRANSIT TIME\nระยะเวลา\n(OPTIONAL)", fixed: true, position: "middle", optional: true },
  { id: "price", label: "PRICE\nราคา\n(OPTIONAL)", fixed: true, position: "end", optional: true },
  { id: "unit", label: "UNIT\nหน่วย\n(OPTIONAL)", fixed: true, position: "end", optional: true },
  { id: "remarks", label: "REMARKS\nหมายเหตุ\n(OPTIONAL)", fixed: true, position: "end", optional: true },
];

const SEA_FREIGHT_DEFAULT_COLUMNS: TableColumn[] = [
  { id: "no", label: "No.\nลำดับ", fixed: true, position: "start" },
  { id: "container", label: "CONTAINER\nตู้คอนเทนเนอร์", fixed: true, position: "start" },
  { id: "carrierType", label: "CARRIER TYPE\nประเภทผู้ขนส่ง\n(OPTIONAL)", fixed: true, position: "middle", optional: true },
  { id: "service", label: "Service\nบริการ\n(OPTIONAL)", fixed: true, position: "middle", optional: true },
  { id: "pol", label: "POL\nท่าต้นทาง", fixed: true, position: "middle" },
  { id: "pod", label: "POD\nท่าปลายทาง", fixed: true, position: "middle" },
  { id: "routing", label: "ROUTING\nเส้นทาง\n(OPTIONAL)", fixed: true, position: "middle", optional: true },
  { id: "transit", label: "TRANSIT\nจุดแวะ\n(OPTIONAL)", fixed: true, position: "middle", optional: true },
  { id: "transitTime", label: "TRANSIT TIME\nระยะเวลา\n(OPTIONAL)", fixed: true, position: "middle", optional: true },
  { id: "tsPort", label: "T/S PORT\nท่าแวะ\n(OPTIONAL)", fixed: true, position: "middle", optional: true },
  { id: "reExport", label: "RE-EXPORT\nการส่งออกซ้ำ\n(OPTIONAL)", fixed: true, position: "middle", optional: true },
  { id: "etd", label: "ETD\nวันออกเดินทาง\n(OPTIONAL)", fixed: true, position: "middle", optional: true },
  { id: "volume", label: "Volume\nปริมาตร", fixed: true, position: "end" },
  { id: "price", label: "Price\nราคา", fixed: true, position: "end" },
  { id: "unit", label: "Unit\nหน่วย", fixed: true, position: "end" },
  { id: "exRate", label: "Ex-Rate\nอัตราแลกเปลี่ยน\n(OPTIONAL)", fixed: true, position: "end", optional: true },
  { id: "totalThb", label: "total THB\nรวมเป็นเงินไทย\n(OPTIONAL)", fixed: true, position: "end", optional: true },
  { id: "sailingSchedule", label: "Sailing Schedule\nตารางเดินเรือ\n(OPTIONAL)", fixed: true, position: "end", optional: true },
  { id: "remarks", label: "REMARKS\nหมายเหตุ", fixed: true, position: "end" },
];

export function DynamicRateTable({ tableType, data, onChange }: DynamicRateTableProps) {
  const [newColumnName, setNewColumnName] = useState("");
  const [showAddColumn, setShowAddColumn] = useState(false);

  // Initialize with default columns and one row if empty
  React.useEffect(() => {
    if (!data || data.columns.length === 0) {
      const defaultColumns = tableType === "warehousing" ? WAREHOUSING_DEFAULT_COLUMNS : tableType === "transport" ? TRANSPORT_DEFAULT_COLUMNS : tableType === "international" ? INTERNATIONAL_DEFAULT_COLUMNS : SEA_FREIGHT_DEFAULT_COLUMNS;
      const defaultRow: TableRow = {
        id: "1",
        cells: Object.fromEntries(defaultColumns.map(col => [col.id, col.id === "no" ? "1" : ""])),
      };
      onChange({ columns: defaultColumns, rows: [defaultRow] });
    }
  }, [tableType, data, onChange]);

  const addRow = () => {
    const newRowNumber = data.rows.length + 1;
    const newRow: TableRow = {
      id: String(newRowNumber),
      cells: Object.fromEntries(data.columns.map(col => [col.id, col.id === "no" ? String(newRowNumber) : ""])),
    };
    onChange({ ...data, rows: [...data.rows, newRow] });
  };

  const removeRow = (rowId: string) => {
    if (data.rows.length <= 1) return; // Keep at least one row
    const updatedRows = data.rows.filter(row => row.id !== rowId);
    // Re-number rows
    const renumberedRows = updatedRows.map((row, idx) => ({
      ...row,
      cells: { ...row.cells, no: String(idx + 1) },
    }));
    onChange({ ...data, rows: renumberedRows });
  };

  const addCustomColumn = () => {
    if (!newColumnName.trim()) return;
    
    const customId = `custom_${Date.now()}`;
    const newColumn: TableColumn = {
      id: customId,
      label: newColumnName,
      fixed: false,
      position: "middle",
    };

    // Insert custom column after the last "start" position column
    const startColumns = data.columns.filter(col => col.position === "start");
    const middleColumns = data.columns.filter(col => col.position === "middle");
    const endColumns = data.columns.filter(col => col.position === "end");

    const updatedColumns = [...startColumns, ...middleColumns, newColumn, ...endColumns];

    // Add empty cells for the new column in all rows
    const updatedRows = data.rows.map(row => ({
      ...row,
      cells: { ...row.cells, [customId]: "" },
    }));

    onChange({ columns: updatedColumns, rows: updatedRows });
    setNewColumnName("");
    setShowAddColumn(false);
  };

  const removeColumn = (columnId: string) => {
    const updatedColumns = data.columns.filter(col => col.id !== columnId);
    const updatedRows = data.rows.map(row => {
      const { [columnId]: removed, ...remainingCells } = row.cells;
      return { ...row, cells: remainingCells };
    });
    onChange({ columns: updatedColumns, rows: updatedRows });
  };

  const toggleOptionalColumn = (columnId: string) => {
    const column = data.columns.find(col => col.id === columnId);
    if (!column || !column.optional) return;

    // Check if column is "hidden" (all cells empty and grayed out)
    // For simplicity, we'll just toggle visibility in UI
    // This is handled by CSS class
  };

  const updateCell = (rowId: string, columnId: string, value: string) => {
    const updatedRows = data.rows.map(row => {
      if (row.id === rowId) {
        return { ...row, cells: { ...row.cells, [columnId]: value } };
      }
      return row;
    });
    onChange({ ...data, rows: updatedRows });
  };

  if (!data || data.columns.length === 0) {
    return <div className="text-xs text-gray-500">Loading...</div>;
  }

  return (
    <div className="space-y-3">
      {/* Table */}
      <div className="border border-gray-300 rounded-lg overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-[#7BC9A6] text-white">
            <tr>
              {data.columns.map((column) => (
                <th
                  key={column.id}
                  className="px-3 py-2 text-left font-semibold relative group min-w-[100px]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="whitespace-pre-line leading-tight">{column.label}</span>
                    {!column.fixed && (
                      <button
                        onClick={() => removeColumn(column.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 hover:text-red-200"
                        title="Remove column"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </th>
              ))}
              <th className="px-3 py-2 w-10"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.rows.map((row) => (
              <tr key={row.id} className="group">
                {data.columns.map((column) => (
                  <td key={column.id} className="px-3 py-2">
                    {column.id === "no" ? (
                      <span className="text-gray-700 font-medium">{row.cells[column.id]}</span>
                    ) : (
                      <Input
                        value={row.cells[column.id] || ""}
                        onChange={(e) => updateCell(row.id, column.id, e.target.value)}
                        className="h-8 text-xs bg-white border-gray-300 focus:border-[#7BC9A6]"
                        placeholder={column.optional ? "(optional)" : ""}
                      />
                    )}
                  </td>
                ))}
                <td className="px-2 py-2">
                  <button
                    onClick={() => removeRow(row.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
                    title="Remove row"
                    disabled={data.rows.length <= 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Add Row */}
        <Button
          type="button"
          onClick={addRow}
          size="sm"
          variant="outline"
          className="h-8 text-xs"
        >
          <Plus className="w-3 h-3 mr-1" />
          Add Row
        </Button>

        {/* Add Custom Column */}
        {!showAddColumn ? (
          <Button
            type="button"
            onClick={() => setShowAddColumn(true)}
            size="sm"
            variant="outline"
            className="h-8 text-xs"
          >
            <Plus className="w-3 h-3 mr-1" />
            Add Column
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Input
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
              placeholder="Column name (EN/TH)"
              className="h-8 text-xs w-48"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addCustomColumn();
                } else if (e.key === "Escape") {
                  setShowAddColumn(false);
                  setNewColumnName("");
                }
              }}
              autoFocus
            />
            <Button
              type="button"
              onClick={addCustomColumn}
              size="sm"
              className="h-8 text-xs"
              disabled={!newColumnName.trim()}
            >
              Add
            </Button>
            <Button
              type="button"
              onClick={() => {
                setShowAddColumn(false);
                setNewColumnName("");
              }}
              size="sm"
              variant="ghost"
              className="h-8 text-xs"
            >
              Cancel
            </Button>
          </div>
        )}

        {/* Optional Column Toggle (for Km in Transport) */}
        {tableType === "transport" && data.columns.some(col => col.optional) && (
          <div className="text-xs text-gray-600 ml-auto">
            <span className="italic">Note: Optional columns like "Km" can be left empty or removed</span>
          </div>
        )}
      </div>
    </div>
  );
}