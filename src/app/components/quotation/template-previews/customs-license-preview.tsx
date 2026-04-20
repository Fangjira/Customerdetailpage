import { CustomsLicenseData, LanguageType } from "../quotation-types";
import { Check, Warehouse, Truck, Plane, Ship, Globe } from "lucide-react";

interface CustomsLicensePreviewProps {
  data: any;
  language: LanguageType;
}

export function CustomsLicensePreview({ data, language }: CustomsLicensePreviewProps) {
  const customsData = data as CustomsLicenseData;

  console.log("🔍 CustomsLicensePreview received data:", customsData);

  if (!customsData) {
    console.log("⚠️ No data received in CustomsLicensePreview");
    return null;
  }

  const labels = {
    th: {
      scopeTitle: "SCOPE OF WORK / ขอบเขตการดำเนินงาน",
      selectedServices: "บริการที่เลือก:",
      warehouse: "(1) Warehouse / คลังสินค้า",
      transport: "(2) Transport / ขนส่ง",
      freightAir: "(3) Freight: Air / ขนส่งทางอากาศ",
      freightSea: "(3) Freight: Sea / ขนส่งทางทะเล",
      crossBorder: "(4) Cross-Border / ข้ามพรมแดน",
      warehouseSection: "1. WAREHOUSE SERVICES / บริการคลังสินค้า",
      warehouseLocation: "Warehouse location / สถานที่คลัง:",
      storage: "Storage / การจัดเก็บสินค้า:",
      handling: "Handling / การเคลื่อนย้ายสินค้า:",
      otherActivity: "Other Activity / กิจกรรมอื่น",
      transportSection: "2. TRANSPORT SERVICES / บริการขนส่ง",
      transportationType: "Transportation Type / ประเภทการขนส่งสินค้า:",
      route: "Route / เส้นทาง:",
      freightSection: "3. FREIGHT SERVICES / บริการขนส่งระหว่างประเทศ",
      airFreight: "Air Freight / บริการขนส่งทางอากาศ:",
      seaFreight: "Sea Freight / บริการขนส่งทางทะเล:",
      incoterm: "INCOTERM:",
      customFieldsSection: "4. ADDITIONAL INFORMATION / ข้อมูลเพิ่มเติม",
      termsTitle: "5. TERMS & CONDITIONS / เงื่อนไข",
    },
    en: {
      scopeTitle: "SCOPE OF WORK",
      selectedServices: "Selected Services:",
      warehouse: "(1) Warehouse",
      transport: "(2) Transport",
      freightAir: "(3) Freight: Air",
      freightSea: "(3) Freight: Sea",
      crossBorder: "(4) Cross-Border",
      warehouseSection: "1. WAREHOUSE SERVICES",
      warehouseLocation: "Warehouse location:",
      storage: "Storage:",
      handling: "Handling:",
      otherActivity: "Other Activity",
      transportSection: "2. TRANSPORT SERVICES",
      transportationType: "Transportation Type:",
      route: "Route:",
      freightSection: "3. FREIGHT SERVICES",
      airFreight: "Air Freight:",
      seaFreight: "Sea Freight:",
      incoterm: "INCOTERM:",
      customFieldsSection: "4. ADDITIONAL INFORMATION",
      termsTitle: "5. TERMS & CONDITIONS",
    }
  };

  const label = labels[language];

  const hasSelectedServices = customsData.scopeOfWorkServices && (
    customsData.scopeOfWorkServices.warehouse ||
    customsData.scopeOfWorkServices.transport ||
    customsData.scopeOfWorkServices.freightAir ||
    customsData.scopeOfWorkServices.freightSea ||
    customsData.scopeOfWorkServices.crossBorder
  );

  return (
    <div className="space-y-4 text-sm">
      {/* SCOPE OF WORK Section */}
      {hasSelectedServices && (
        <div className="bg-[#00BC7D]/5 border border-[#00BC7D]/20 rounded-lg p-3">
          <h4 className="font-bold text-gray-900 mb-2 text-xs uppercase">{label.scopeTitle}</h4>
          <div className="flex flex-wrap gap-2">
            {customsData.scopeOfWorkServices.warehouse && (
              <div className="flex items-center gap-1.5 bg-green-100 px-2.5 py-1 rounded-md">
                <Check className="w-3.5 h-3.5 text-green-700" />
                <Warehouse className="w-3.5 h-3.5 text-green-700" />
                <span className="text-xs font-medium text-green-900">{label.warehouse}</span>
              </div>
            )}
            {customsData.scopeOfWorkServices.transport && (
              <div className="flex items-center gap-1.5 bg-green-100 px-2.5 py-1 rounded-md">
                <Check className="w-3.5 h-3.5 text-green-700" />
                <Truck className="w-3.5 h-3.5 text-green-700" />
                <span className="text-xs font-medium text-green-900">{label.transport}</span>
              </div>
            )}
            {customsData.scopeOfWorkServices.freightAir && (
              <div className="flex items-center gap-1.5 bg-green-100 px-2.5 py-1 rounded-md">
                <Check className="w-3.5 h-3.5 text-green-700" />
                <Plane className="w-3.5 h-3.5 text-green-700" />
                <span className="text-xs font-medium text-green-900">{label.freightAir}</span>
              </div>
            )}
            {customsData.scopeOfWorkServices.freightSea && (
              <div className="flex items-center gap-1.5 bg-green-100 px-2.5 py-1 rounded-md">
                <Check className="w-3.5 h-3.5 text-green-700" />
                <Ship className="w-3.5 h-3.5 text-green-700" />
                <span className="text-xs font-medium text-green-900">{label.freightSea}</span>
              </div>
            )}
            {customsData.scopeOfWorkServices.crossBorder && (
              <div className="flex items-center gap-1.5 bg-green-100 px-2.5 py-1 rounded-md">
                <Check className="w-3.5 h-3.5 text-green-700" />
                <Globe className="w-3.5 h-3.5 text-green-700" />
                <span className="text-xs font-medium text-green-900">{label.crossBorder}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Warehouse Services Section */}
      {customsData.scopeOfWorkServices?.warehouse && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <h4 className="font-bold text-gray-900 mb-2 text-xs flex items-center gap-1.5">
            <Warehouse className="w-4 h-4 text-blue-600" />
            {label.warehouseSection}
          </h4>
          <div className="space-y-2">
            {customsData.warehouseLocation && (
              <div>
                <span className="font-semibold text-gray-700 text-xs">{label.warehouseLocation}</span>
                <p className="text-xs text-gray-900 mt-0.5">{customsData.warehouseLocation}</p>
              </div>
            )}
            {customsData.storage && (
              <div>
                <span className="font-semibold text-gray-700 text-xs">{label.storage}</span>
                <p className="text-xs text-gray-900 mt-0.5 whitespace-pre-wrap">{customsData.storage}</p>
              </div>
            )}
            {customsData.handling && (
              <div>
                <span className="font-semibold text-gray-700 text-xs">{label.handling}</span>
                <p className="text-xs text-gray-900 mt-0.5 whitespace-pre-wrap">{customsData.handling}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Other Activity Section */}
      {customsData.otherActivity && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <h4 className="font-bold text-gray-900 mb-2 text-xs">{label.otherActivity}</h4>
          <p className="text-xs text-gray-900 whitespace-pre-wrap leading-relaxed">{customsData.otherActivity}</p>
        </div>
      )}

      {/* Transport Services Section */}
      {customsData.scopeOfWorkServices?.transport && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
          <h4 className="font-bold text-gray-900 mb-2 text-xs flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-orange-600" />
            {label.transportSection}
          </h4>
          <div className="space-y-2">
            {customsData.transportationType && (
              <div>
                <span className="font-semibold text-gray-700 text-xs">{label.transportationType}</span>
                <p className="text-xs text-gray-900 mt-0.5">{customsData.transportationType}</p>
              </div>
            )}
            {(customsData.routeOrigin || customsData.routeDestination) && (
              <div>
                <span className="font-semibold text-gray-700 text-xs">{label.route}</span>
                <p className="text-xs text-gray-900 mt-0.5">
                  {customsData.routeOrigin || "-"} → {customsData.routeDestination || "-"}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Freight Services Section */}
      {(customsData.scopeOfWorkServices?.freightAir || customsData.scopeOfWorkServices?.freightSea) && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
          <h4 className="font-bold text-gray-900 mb-2 text-xs flex items-center gap-1.5">
            <Plane className="w-4 h-4 text-purple-600" />
            {label.freightSection}
          </h4>
          <div className="space-y-3">
            {/* Air Freight */}
            {customsData.scopeOfWorkServices?.freightAir && (customsData.airFreight || customsData.airFreightIncoterm) && (
              <div className="bg-white p-2 rounded border border-purple-200">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Plane className="w-3.5 h-3.5 text-purple-600" />
                  <span className="font-semibold text-gray-700 text-xs">{label.airFreight}</span>
                </div>
                {customsData.airFreight && (
                  <p className="text-xs text-gray-900 mb-2 whitespace-pre-wrap">{customsData.airFreight}</p>
                )}
                {customsData.airFreightIncoterm && (
                  <div className="bg-purple-50 px-2 py-1 rounded">
                    <span className="text-xs font-semibold text-purple-700">{label.incoterm}</span>
                    <span className="text-xs text-purple-900 ml-1">{customsData.airFreightIncoterm}</span>
                  </div>
                )}
              </div>
            )}

            {/* Sea Freight */}
            {customsData.scopeOfWorkServices?.freightSea && (customsData.seaFreight || customsData.seaFreightIncoterm) && (
              <div className="bg-white p-2 rounded border border-purple-200">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Ship className="w-3.5 h-3.5 text-purple-600" />
                  <span className="font-semibold text-gray-700 text-xs">{label.seaFreight}</span>
                </div>
                {customsData.seaFreight && (
                  <p className="text-xs text-gray-900 mb-2 whitespace-pre-wrap">{customsData.seaFreight}</p>
                )}
                {customsData.seaFreightIncoterm && (
                  <div className="bg-purple-50 px-2 py-1 rounded">
                    <span className="text-xs font-semibold text-purple-700">{label.incoterm}</span>
                    <span className="text-xs text-purple-900 ml-1">{customsData.seaFreightIncoterm}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Custom Fields Section */}
      {customsData.customFields && customsData.customFields.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <h4 className="font-bold text-gray-900 mb-2 text-xs uppercase">{label.customFieldsSection}</h4>
          <div className="space-y-2">
            {customsData.customFields.map((field) => (
              field.label && field.value && (
                <div key={field.id} className="bg-white p-2 rounded border border-gray-200">
                  <span className="font-semibold text-gray-700 text-xs block mb-0.5">{field.label}:</span>
                  <p className="text-xs text-gray-900">{field.value}</p>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Terms & Conditions Section - BOTTOM */}
      {customsData.termsAndConditions && (
        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3">
          <h4 className="font-bold text-gray-900 mb-2 text-xs uppercase">{label.termsTitle}</h4>
          <p className="text-xs text-gray-900 whitespace-pre-wrap leading-relaxed">{customsData.termsAndConditions}</p>
        </div>
      )}
    </div>
  );
}