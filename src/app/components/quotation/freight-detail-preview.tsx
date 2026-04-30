import { FreightDetail, LanguageType } from "../quotation-types";

interface FreightDetailPreviewProps {
  data: FreightDetail | undefined;
  language: LanguageType;
}

export function FreightDetailPreview({ data, language }: FreightDetailPreviewProps) {
  if (!data) return null;

  const labels = {
    th: {
      title: "Air / Sea Freight Detail",
      shipmentMode: "Shipment Mode",
      origin: "Origin",
      destination: "Destination",
      cargoWeight: "Cargo Weight (kg)",
      cargoVolume: "Cargo Volume (CBM)",
      incoterms: "Incoterms",
      serviceLevel: "Service Level",
      specialHandling: "Special Handling",
      insurance: "Insurance",
      airFreight: "Air Freight",
      seaFreight: "Sea Freight",
      both: "Both",
    },
    en: {
      title: "Air / Sea Freight Detail",
      shipmentMode: "Shipment Mode",
      origin: "Origin",
      destination: "Destination",
      cargoWeight: "Cargo Weight (kg)",
      cargoVolume: "Cargo Volume (CBM)",
      incoterms: "Incoterms",
      serviceLevel: "Service Level",
      specialHandling: "Special Handling",
      insurance: "Insurance",
      airFreight: "Air Freight",
      seaFreight: "Sea Freight",
      both: "Both",
    },
  };

  const label = labels[language];

  const shipmentModeLabel = {
    air: label.airFreight,
    sea: label.seaFreight,
    both: label.both,
  }[data.shipmentMode];

  return (
    <div className="border-l-4 border-[#7BC9A6] bg-[#7BC9A6]/5 rounded-r-lg p-4 mb-4">
      <h4 className="font-semibold text-gray-900 mb-3 text-sm">{label.title}</h4>

      {/* Shipment Mode */}
      <div className="mb-3">
        <div className="text-xs font-medium text-gray-600 mb-1">{label.shipmentMode}</div>
        <div className="inline-block px-3 py-1 bg-[#7BC9A6] text-white rounded-md text-sm font-medium">
          {shipmentModeLabel}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        {/* Origin */}
        {data.origin && (
          <div>
            <span className="text-gray-600">{label.origin}:</span>
            <span className="ml-2 font-medium text-gray-900">{data.origin}</span>
          </div>
        )}

        {/* Destination */}
        {data.destination && (
          <div>
            <span className="text-gray-600">{label.destination}:</span>
            <span className="ml-2 font-medium text-gray-900">{data.destination}</span>
          </div>
        )}

        {/* Cargo Weight */}
        {data.cargoWeight && (
          <div>
            <span className="text-gray-600">{label.cargoWeight}:</span>
            <span className="ml-2 font-medium text-gray-900">{data.cargoWeight}</span>
          </div>
        )}

        {/* Cargo Volume */}
        {data.cargoVolume && (
          <div>
            <span className="text-gray-600">{label.cargoVolume}:</span>
            <span className="ml-2 font-medium text-gray-900">{data.cargoVolume}</span>
          </div>
        )}

        {/* Incoterms */}
        {data.incoterms && (
          <div className="col-span-2">
            <span className="text-gray-600">{label.incoterms}:</span>
            <span className="ml-2 font-medium text-gray-900">{data.incoterms}</span>
          </div>
        )}

        {/* Service Level */}
        {data.serviceLevel && (
          <div className="col-span-2">
            <span className="text-gray-600">{label.serviceLevel}:</span>
            <span className="ml-2 font-medium text-gray-900">{data.serviceLevel}</span>
          </div>
        )}

        {/* Special Handling */}
        {data.specialHandling && (
          <div className="col-span-2">
            <span className="text-gray-600">{label.specialHandling}:</span>
            <span className="ml-2 font-medium text-gray-900">{data.specialHandling}</span>
          </div>
        )}

        {/* Insurance */}
        {data.insurance && (
          <div className="col-span-2">
            <span className="text-gray-600">{label.insurance}:</span>
            <span className="ml-2 font-medium text-gray-900">{data.insurance}</span>
          </div>
        )}
      </div>
    </div>
  );
}
