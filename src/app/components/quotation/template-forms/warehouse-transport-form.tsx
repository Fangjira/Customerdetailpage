import { WarehouseTransportData, LanguageType } from "../quotation-types";
import { ToggleSection } from "../quotation-components";
import { WarehousingTable, TransportTable } from "../dynamic-tables";

interface WarehouseTransportFormProps {
  data: any;
  onChange: (data: WarehouseTransportData) => void;
  language: LanguageType;
}

export function WarehouseTransportForm({ data, onChange, language }: WarehouseTransportFormProps) {
  // Initialize warehouseData with default structure if data is undefined or null
  let warehouseData: WarehouseTransportData = data || {
    warehousing: {
      enabled: false,
      items: [],
    },
    transport: {
      enabled: false,
      items: [],
    },
  };

  // Ensure nested properties exist
  if (!warehouseData.warehousing) {
    warehouseData.warehousing = {
      enabled: false,
      items: [],
    };
  }

  if (!warehouseData.transport) {
    warehouseData.transport = {
      enabled: false,
      items: [],
    };
  }

  const labels = {
    th: {
      warehousing: "4.1 อัตราค่าบริการคลังสินค้า",
      transport: "4.2 อัตราค่าขนส่ง",
    },
    en: {
      warehousing: "4.1 Warehousing Service Rates",
      transport: "4.2 Transportation Rates",
    },
  };

  const label = labels[language];

  return (
    <div className="space-y-6">
      {/* Warehousing Section */}
      <ToggleSection
        enabled={warehouseData.warehousing?.enabled || false}
        onToggle={(enabled) =>
          onChange({
            ...warehouseData,
            warehousing: {
              ...warehouseData.warehousing,
              enabled,
              items: enabled && warehouseData.warehousing.items.length === 0 
                ? [{ no: 1, service: "", rate: "", unit: "", remarks: "" }]
                : warehouseData.warehousing.items,
            },
          })
        }
        title={label.warehousing}
      >
        <WarehousingTable
          items={warehouseData.warehousing?.items || []}
          onChange={(items) =>
            onChange({
              ...warehouseData,
              warehousing: { ...warehouseData.warehousing, items },
            })
          }
          language={language}
        />
      </ToggleSection>

      {/* Transport Section */}
      <ToggleSection
        enabled={warehouseData.transport?.enabled || false}
        onToggle={(enabled) =>
          onChange({
            ...warehouseData,
            transport: {
              ...warehouseData.transport,
              enabled,
              items: enabled && warehouseData.transport.items.length === 0
                ? [{ no: 1, truckType: "", origin: "", destination: "", price: "", unit: "", remarks: "" }]
                : warehouseData.transport.items,
            },
          })
        }
        title={label.transport}
      >
        <TransportTable
          items={warehouseData.transport?.items || []}
          onChange={(items) =>
            onChange({
              ...warehouseData,
              transport: { ...warehouseData.transport, items },
            })
          }
          language={language}
        />
      </ToggleSection>
    </div>
  );
}