import { FreightDetail, LanguageType } from "./quotation-types";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Package } from "lucide-react";

interface FreightDetailFormProps {
  data: FreightDetail | undefined;
  onChange: (data: FreightDetail) => void;
  language: LanguageType;
}

export function FreightDetailForm({ data, onChange, language }: FreightDetailFormProps) {
  const freightDetail: FreightDetail = data || {
    shipmentMode: "air",
    origin: "",
    destination: "",
    cargoWeight: "",
    cargoVolume: "",
    incoterms: "",
    serviceLevel: "",
    specialHandling: "",
    insurance: "",
  };

  const labels = {
    th: {
      title: "Air / Sea Freight Detail",
      shipmentMode: "Shipment Mode",
      airFreight: "Air Freight",
      seaFreight: "Sea Freight",
      both: "Both",
      origin: "Origin",
      destination: "Destination",
      cargoWeight: "Cargo Weight (kg)",
      cargoVolume: "Cargo Volume (CBM)",
      incoterms: "Incoterms",
      serviceLevel: "Service Level",
      specialHandling: "Special Handling",
      insurance: "Insurance",
      exampleOrigin: "เช่น Bangkok, Thailand",
      exampleDestination: "เช่น Los Angeles, USA",
      exampleWeight: "เช่น 1,000 kg",
      exampleVolume: "เช่น 10 CBM",
      exampleIncoterms: "FOB / CIF / EXW / DDP",
      exampleServiceLevel: "standard / express / economy",
      exampleHandling: "เช่น Fragile, Temperature Controlled",
      exampleInsurance: "ข้อมูลประกันภัย...",
    },
    en: {
      title: "Air / Sea Freight Detail",
      shipmentMode: "Shipment Mode",
      airFreight: "Air Freight",
      seaFreight: "Sea Freight",
      both: "Both",
      origin: "Origin",
      destination: "Destination",
      cargoWeight: "Cargo Weight (kg)",
      cargoVolume: "Cargo Volume (CBM)",
      incoterms: "Incoterms",
      serviceLevel: "Service Level",
      specialHandling: "Special Handling",
      insurance: "Insurance",
      exampleOrigin: "e.g. Bangkok, Thailand",
      exampleDestination: "e.g. Los Angeles, USA",
      exampleWeight: "e.g. 1,000 kg",
      exampleVolume: "e.g. 10 CBM",
      exampleIncoterms: "FOB / CIF / EXW / DDP",
      exampleServiceLevel: "standard / express / economy",
      exampleHandling: "e.g. Fragile, Temperature Controlled",
      exampleInsurance: "Insurance information...",
    },
  };

  const label = labels[language];

  return (
    <div className="border-l-4 border-[#7BC9A6] bg-[#7BC9A6]/5 rounded-r-lg p-5">
      <div className="flex items-center gap-2 mb-5">
        <Package className="w-5 h-5 text-[#7BC9A6]" />
        <h4 className="font-semibold text-gray-900">{label.title}</h4>
      </div>

      <div className="space-y-4">
        {/* Shipment Mode */}
        <div>
          <Label className="mb-2 block">{label.shipmentMode}</Label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onChange({ ...freightDetail, shipmentMode: "air" })}
              className={`flex-1 px-4 py-3 border-2 rounded-lg font-medium transition-all ${
                freightDetail.shipmentMode === "air"
                  ? "border-[#7BC9A6] bg-[#7BC9A6]/10 text-[#7BC9A6]"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              {label.airFreight}
            </button>
            <button
              type="button"
              onClick={() => onChange({ ...freightDetail, shipmentMode: "sea" })}
              className={`flex-1 px-4 py-3 border-2 rounded-lg font-medium transition-all ${
                freightDetail.shipmentMode === "sea"
                  ? "border-[#7BC9A6] bg-[#7BC9A6]/10 text-[#7BC9A6]"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              {label.seaFreight}
            </button>
            <button
              type="button"
              onClick={() => onChange({ ...freightDetail, shipmentMode: "both" })}
              className={`flex-1 px-4 py-3 border-2 rounded-lg font-medium transition-all ${
                freightDetail.shipmentMode === "both"
                  ? "border-[#7BC9A6] bg-[#7BC9A6]/10 text-[#7BC9A6]"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              {label.both}
            </button>
          </div>
        </div>

        {/* Origin & Destination */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>{label.origin}</Label>
            <Input
              value={freightDetail.origin}
              onChange={(e) => onChange({ ...freightDetail, origin: e.target.value })}
              placeholder={label.exampleOrigin}
            />
          </div>
          <div>
            <Label>{label.destination}</Label>
            <Input
              value={freightDetail.destination}
              onChange={(e) => onChange({ ...freightDetail, destination: e.target.value })}
              placeholder={label.exampleDestination}
            />
          </div>
        </div>

        {/* Cargo Weight & Volume */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>{label.cargoWeight}</Label>
            <Input
              value={freightDetail.cargoWeight}
              onChange={(e) => onChange({ ...freightDetail, cargoWeight: e.target.value })}
              placeholder={label.exampleWeight}
            />
          </div>
          <div>
            <Label>{label.cargoVolume}</Label>
            <Input
              value={freightDetail.cargoVolume}
              onChange={(e) => onChange({ ...freightDetail, cargoVolume: e.target.value })}
              placeholder={label.exampleVolume}
            />
          </div>
        </div>

        {/* Incoterms */}
        <div>
          <Label>{label.incoterms}</Label>
          <Input
            value={freightDetail.incoterms}
            onChange={(e) => onChange({ ...freightDetail, incoterms: e.target.value })}
            placeholder={label.exampleIncoterms}
          />
        </div>

        {/* Service Level */}
        <div>
          <Label>{label.serviceLevel}</Label>
          <Input
            value={freightDetail.serviceLevel}
            onChange={(e) => onChange({ ...freightDetail, serviceLevel: e.target.value })}
            placeholder={label.exampleServiceLevel}
          />
        </div>

        {/* Special Handling */}
        <div>
          <Label>{label.specialHandling}</Label>
          <Input
            value={freightDetail.specialHandling}
            onChange={(e) => onChange({ ...freightDetail, specialHandling: e.target.value })}
            placeholder={label.exampleHandling}
          />
        </div>

        {/* Insurance */}
        <div>
          <Label>{label.insurance}</Label>
          <Input
            value={freightDetail.insurance}
            onChange={(e) => onChange({ ...freightDetail, insurance: e.target.value })}
            placeholder={label.exampleInsurance}
          />
        </div>
      </div>
    </div>
  );
}