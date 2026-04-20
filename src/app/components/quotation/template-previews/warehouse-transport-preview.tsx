import { WarehouseTransportData, LanguageType } from "../quotation-types";
import { WarehousingTable, TransportTable } from "../dynamic-tables";

interface WarehouseTransportPreviewProps {
  data: any;
  language: LanguageType;
}

export function WarehouseTransportPreview({ data, language }: WarehouseTransportPreviewProps) {
  const warehouseData = data as WarehouseTransportData;

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
      {warehouseData.warehousing?.enabled && warehouseData.warehousing.items.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">{label.warehousing}</h4>
          <WarehousingTable
            items={warehouseData.warehousing.items}
            onChange={() => {}}
            language={language}
            preview={true}
          />
        </div>
      )}

      {/* Transport Section */}
      {warehouseData.transport?.enabled && warehouseData.transport.items.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">{label.transport}</h4>
          <TransportTable
            items={warehouseData.transport.items}
            onChange={() => {}}
            language={language}
            preview={true}
          />
        </div>
      )}
    </div>
  );
}
