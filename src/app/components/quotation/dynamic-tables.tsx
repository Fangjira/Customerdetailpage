import { Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

// Warehouse Table Component
export interface WarehousingItem {
  no: number;
  service: string;
  rate: string;
  unit: string;
  remarks: string;
}

interface WarehousingTableProps {
  items: WarehousingItem[];
  onChange: (items: WarehousingItem[]) => void;
  language: "th" | "en";
  preview?: boolean;
}

export function WarehousingTable({ items, onChange, language, preview = false }: WarehousingTableProps) {
  const labels = {
    th: { no: "ลำดับ", service: "รายการบริการ", rate: "อัตราค่าบริการ", unit: "หน่วย", remarks: "หมายเหตุ" },
    en: { no: "No.", service: "Service", rate: "Rate", unit: "Unit", remarks: "Remarks" },
  };
  const label = labels[language];

  const addRow = () => {
    onChange([...items, { no: items.length + 1, service: "", rate: "", unit: "", remarks: "" }]);
  };

  const updateRow = (index: number, field: keyof WarehousingItem, value: string | number) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const deleteRow = (index: number) => {
    const updated = items.filter((_, i) => i !== index).map((item, i) => ({ ...item, no: i + 1 }));
    onChange(updated);
  };

  if (preview) {
    return (
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-[#7BC9A6]/10">
            <th className="border border-gray-300 px-3 py-2 text-left w-16">{label.no}</th>
            <th className="border border-gray-300 px-3 py-2 text-left">{label.service}</th>
            <th className="border border-gray-300 px-3 py-2 text-right w-32">{label.rate}</th>
            <th className="border border-gray-300 px-3 py-2 text-center w-24">{label.unit}</th>
            <th className="border border-gray-300 px-3 py-2 text-left w-40">{label.remarks}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-3 py-2 text-center">{item.no}</td>
              <td className="border border-gray-300 px-3 py-2">{item.service}</td>
              <td className="border border-gray-300 px-3 py-2 text-right">{item.rate}</td>
              <td className="border border-gray-300 px-3 py-2 text-center">{item.unit}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm">{item.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="space-y-2">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-2 py-2 text-left w-12">{label.no}</th>
              <th className="border border-gray-300 px-2 py-2 text-left">{label.service}</th>
              <th className="border border-gray-300 px-2 py-2 text-left w-28">{label.rate}</th>
              <th className="border border-gray-300 px-2 py-2 text-left w-20">{label.unit}</th>
              <th className="border border-gray-300 px-2 py-2 text-left w-32">{label.remarks}</th>
              <th className="border border-gray-300 px-2 py-2 w-12"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-2 py-1 text-center">{item.no}</td>
                <td className="border border-gray-300 px-2 py-1">
                  <input
                    type="text"
                    value={item.service}
                    onChange={(e) => updateRow(index, "service", e.target.value)}
                    className="w-full px-2 py-1 border-0 focus:ring-1 focus:ring-[#7BC9A6] rounded"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input
                    type="text"
                    value={item.rate}
                    onChange={(e) => updateRow(index, "rate", e.target.value)}
                    className="w-full px-2 py-1 border-0 focus:ring-1 focus:ring-[#7BC9A6] rounded text-right"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input
                    type="text"
                    value={item.unit}
                    onChange={(e) => updateRow(index, "unit", e.target.value)}
                    className="w-full px-2 py-1 border-0 focus:ring-1 focus:ring-[#7BC9A6] rounded"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input
                    type="text"
                    value={item.remarks}
                    onChange={(e) => updateRow(index, "remarks", e.target.value)}
                    className="w-full px-2 py-1 border-0 focus:ring-1 focus:ring-[#7BC9A6] rounded"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1 text-center">
                  <button
                    onClick={() => deleteRow(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addRow}
        className="w-full border-dashed border-2 border-[#7BC9A6] text-[#7BC9A6] hover:bg-[#7BC9A6]/5"
      >
        <Plus className="w-4 h-4 mr-2" />
        {language === "th" ? "เพิ่มแถว" : "Add Row"}
      </Button>
    </div>
  );
}

// Transport Table Component
export interface TransportItem {
  no: number;
  truckType: string;
  origin: string;
  destination: string;
  price: string;
  unit: string;
  remarks: string;
}

interface TransportTableProps {
  items: TransportItem[];
  onChange: (items: TransportItem[]) => void;
  language: "th" | "en";
  preview?: boolean;
}

export function TransportTable({ items, onChange, language, preview = false }: TransportTableProps) {
  const labels = {
    th: {
      no: "ลำดับ",
      truckType: "ประเภทรถ",
      origin: "ต้นทาง",
      destination: "ปลายทาง",
      price: "ราคา",
      unit: "หน่วย",
      remarks: "หมายเหตุ",
    },
    en: {
      no: "No.",
      truckType: "Truck Type",
      origin: "Origin",
      destination: "Destination",
      price: "Price",
      unit: "Unit",
      remarks: "Remarks",
    },
  };
  const label = labels[language];

  const addRow = () => {
    onChange([
      ...items,
      { no: items.length + 1, truckType: "", origin: "", destination: "", price: "", unit: "", remarks: "" },
    ]);
  };

  const updateRow = (index: number, field: keyof TransportItem, value: string | number) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const deleteRow = (index: number) => {
    const updated = items.filter((_, i) => i !== index).map((item, i) => ({ ...item, no: i + 1 }));
    onChange(updated);
  };

  if (preview) {
    return (
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-[#7BC9A6]/10">
            <th className="border border-gray-300 px-3 py-2 text-left w-16">{label.no}</th>
            <th className="border border-gray-300 px-3 py-2 text-left w-32">{label.truckType}</th>
            <th className="border border-gray-300 px-3 py-2 text-left">{label.origin}</th>
            <th className="border border-gray-300 px-3 py-2 text-left">{label.destination}</th>
            <th className="border border-gray-300 px-3 py-2 text-right w-28">{label.price}</th>
            <th className="border border-gray-300 px-3 py-2 text-center w-20">{label.unit}</th>
            <th className="border border-gray-300 px-3 py-2 text-left w-32">{label.remarks}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-3 py-2 text-center">{item.no}</td>
              <td className="border border-gray-300 px-3 py-2">{item.truckType}</td>
              <td className="border border-gray-300 px-3 py-2">{item.origin}</td>
              <td className="border border-gray-300 px-3 py-2">{item.destination}</td>
              <td className="border border-gray-300 px-3 py-2 text-right">{item.price}</td>
              <td className="border border-gray-300 px-3 py-2 text-center">{item.unit}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm">{item.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="space-y-2">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-2 py-2 text-left w-12">{label.no}</th>
              <th className="border border-gray-300 px-2 py-2 text-left w-24">{label.truckType}</th>
              <th className="border border-gray-300 px-2 py-2 text-left">{label.origin}</th>
              <th className="border border-gray-300 px-2 py-2 text-left">{label.destination}</th>
              <th className="border border-gray-300 px-2 py-2 text-left w-24">{label.price}</th>
              <th className="border border-gray-300 px-2 py-2 text-left w-16">{label.unit}</th>
              <th className="border border-gray-300 px-2 py-2 text-left w-28">{label.remarks}</th>
              <th className="border border-gray-300 px-2 py-2 w-12"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-2 py-1 text-center">{item.no}</td>
                <td className="border border-gray-300 px-2 py-1">
                  <input
                    type="text"
                    value={item.truckType}
                    onChange={(e) => updateRow(index, "truckType", e.target.value)}
                    className="w-full px-2 py-1 border-0 focus:ring-1 focus:ring-[#7BC9A6] rounded"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input
                    type="text"
                    value={item.origin}
                    onChange={(e) => updateRow(index, "origin", e.target.value)}
                    className="w-full px-2 py-1 border-0 focus:ring-1 focus:ring-[#7BC9A6] rounded"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input
                    type="text"
                    value={item.destination}
                    onChange={(e) => updateRow(index, "destination", e.target.value)}
                    className="w-full px-2 py-1 border-0 focus:ring-1 focus:ring-[#7BC9A6] rounded"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input
                    type="text"
                    value={item.price}
                    onChange={(e) => updateRow(index, "price", e.target.value)}
                    className="w-full px-2 py-1 border-0 focus:ring-1 focus:ring-[#7BC9A6] rounded text-right"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input
                    type="text"
                    value={item.unit}
                    onChange={(e) => updateRow(index, "unit", e.target.value)}
                    className="w-full px-2 py-1 border-0 focus:ring-1 focus:ring-[#7BC9A6] rounded"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input
                    type="text"
                    value={item.remarks}
                    onChange={(e) => updateRow(index, "remarks", e.target.value)}
                    className="w-full px-2 py-1 border-0 focus:ring-1 focus:ring-[#7BC9A6] rounded"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1 text-center">
                  <button onClick={() => deleteRow(index)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addRow}
        className="w-full border-dashed border-2 border-[#7BC9A6] text-[#7BC9A6] hover:bg-[#7BC9A6]/5"
      >
        <Plus className="w-4 h-4 mr-2" />
        {language === "th" ? "เพิ่มแถว" : "Add Row"}
      </Button>
    </div>
  );
}

// Generic Service Table (for Customs, License, Freight)
export interface ServiceItem {
  no: number;
  service: string;
  price: string;
  unit: string;
  remarks?: string;
}

interface ServiceTableProps {
  items: ServiceItem[];
  onChange: (items: ServiceItem[]) => void;
  language: "th" | "en";
  preview?: boolean;
  showRemarks?: boolean;
}

export function ServiceTable({ items, onChange, language, preview = false, showRemarks = true }: ServiceTableProps) {
  const labels = {
    th: { no: "ลำดับ", service: "รายการบริการ", price: "ราคา", unit: "หน่วย", remarks: "หมายเหตุ" },
    en: { no: "No.", service: "Service", price: "Price", unit: "Unit", remarks: "Remarks" },
  };
  const label = labels[language];

  const addRow = () => {
    onChange([...items, { no: items.length + 1, service: "", price: "", unit: "", remarks: "" }]);
  };

  const updateRow = (index: number, field: keyof ServiceItem, value: string | number) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const deleteRow = (index: number) => {
    const updated = items.filter((_, i) => i !== index).map((item, i) => ({ ...item, no: i + 1 }));
    onChange(updated);
  };

  if (preview) {
    return (
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-[#7BC9A6]/10">
            <th className="border border-gray-300 px-3 py-2 text-left w-16">{label.no}</th>
            <th className="border border-gray-300 px-3 py-2 text-left">{label.service}</th>
            <th className="border border-gray-300 px-3 py-2 text-right w-32">{label.price}</th>
            <th className="border border-gray-300 px-3 py-2 text-center w-24">{label.unit}</th>
            {showRemarks && <th className="border border-gray-300 px-3 py-2 text-left w-40">{label.remarks}</th>}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-3 py-2 text-center">{item.no}</td>
              <td className="border border-gray-300 px-3 py-2">{item.service}</td>
              <td className="border border-gray-300 px-3 py-2 text-right">{item.price}</td>
              <td className="border border-gray-300 px-3 py-2 text-center">{item.unit}</td>
              {showRemarks && <td className="border border-gray-300 px-3 py-2 text-sm">{item.remarks}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="space-y-2">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-2 py-2 text-left w-12">{label.no}</th>
              <th className="border border-gray-300 px-2 py-2 text-left">{label.service}</th>
              <th className="border border-gray-300 px-2 py-2 text-left w-28">{label.price}</th>
              <th className="border border-gray-300 px-2 py-2 text-left w-20">{label.unit}</th>
              {showRemarks && <th className="border border-gray-300 px-2 py-2 text-left w-32">{label.remarks}</th>}
              <th className="border border-gray-300 px-2 py-2 w-12"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-2 py-1 text-center">{item.no}</td>
                <td className="border border-gray-300 px-2 py-1">
                  <input
                    type="text"
                    value={item.service}
                    onChange={(e) => updateRow(index, "service", e.target.value)}
                    className="w-full px-2 py-1 border-0 focus:ring-1 focus:ring-[#7BC9A6] rounded"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input
                    type="text"
                    value={item.price}
                    onChange={(e) => updateRow(index, "price", e.target.value)}
                    className="w-full px-2 py-1 border-0 focus:ring-1 focus:ring-[#7BC9A6] rounded text-right"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input
                    type="text"
                    value={item.unit}
                    onChange={(e) => updateRow(index, "unit", e.target.value)}
                    className="w-full px-2 py-1 border-0 focus:ring-1 focus:ring-[#7BC9A6] rounded"
                  />
                </td>
                {showRemarks && (
                  <td className="border border-gray-300 px-2 py-1">
                    <input
                      type="text"
                      value={item.remarks || ""}
                      onChange={(e) => updateRow(index, "remarks", e.target.value)}
                      className="w-full px-2 py-1 border-0 focus:ring-1 focus:ring-[#7BC9A6] rounded"
                    />
                  </td>
                )}
                <td className="border border-gray-300 px-2 py-1 text-center">
                  <button onClick={() => deleteRow(index)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addRow}
        className="w-full border-dashed border-2 border-[#7BC9A6] text-[#7BC9A6] hover:bg-[#7BC9A6]/5"
      >
        <Plus className="w-4 h-4 mr-2" />
        {language === "th" ? "เพิ่มแถว" : "Add Row"}
      </Button>
    </div>
  );
}
