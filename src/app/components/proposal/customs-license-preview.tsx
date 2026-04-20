import { Check, FileText, Warehouse, Truck, Plane, Ship, Globe } from "lucide-react";
import { CustomsLicenseProposalData } from "./proposal-types";

interface CustomsLicensePreviewProps {
  data: CustomsLicenseProposalData;
  language?: "th" | "en";
}

export function CustomsLicensePreview({ data, language = "th" }: CustomsLicensePreviewProps) {
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
      warehouseLocation: "Warehouse location / สถานที่คลัง",
      storage: "Storage / การจัดเก็บสินค้า",
      handling: "Handling / การเคลื่อนย้ายสินค้า",
      otherActivity: "Other Activity / กิจกรรมอื่น",
      transportSection: "2. TRANSPORT SERVICES / บริการขนส่ง",
      transportationType: "Transportation Type / ประเภทการขนส่งสินค้า",
      route: "Route / เส้นทาง",
      routeOrigin: "Origin / ต้นทาง",
      routeDestination: "Destination / ปลายทาง",
      freightSection: "3. FREIGHT SERVICES / บริการขนส่งระหว่างประเทศ",
      airFreight: "Air Freight / บริการขนส่งทางอากาศ",
      seaFreight: "Sea Freight / บริการขนส่งทางทะเล",
      incoterm: "INCOTERM",
      additionalFields: "Additional Information / ข้อมูลเพิ่มเติม",
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
      warehouseLocation: "Warehouse location",
      storage: "Storage",
      handling: "Handling",
      otherActivity: "Other Activity",
      transportSection: "2. TRANSPORT SERVICES",
      transportationType: "Transportation Type",
      route: "Route",
      routeOrigin: "Origin",
      routeDestination: "Destination",
      freightSection: "3. FREIGHT SERVICES",
      airFreight: "Air Freight",
      seaFreight: "Sea Freight",
      incoterm: "INCOTERM",
      additionalFields: "Additional Information",
    }
  };

  const label = language === "th" ? labels.th : labels.en;

  const hasAnyWarehouseData = data.warehouseLocation || data.storage || data.handling;
  const hasAnyTransportData = data.transportationType || data.routeOrigin || data.routeDestination;
  const hasAnyFreightData = data.airFreight || data.seaFreight;

  return (
    <div className="space-y-4">
      {/* SCOPE OF WORK Section */}
      <div className="mb-5">
        <div className="bg-[#00BC7D] text-white px-3 py-2 rounded-t flex items-center gap-2">
          <FileText className="w-4 h-4" />
          <h3 className="text-sm font-bold">{label.scopeTitle}</h3>
        </div>
        
        <div className="border border-gray-300 border-t-0 rounded-b p-3">
          <div className="mb-2 text-xs font-semibold text-gray-700">{label.selectedServices}</div>
          <div className="grid grid-cols-2 gap-2">
            {data.scopeOfWorkServices.warehouse && (
              <div className="flex items-center gap-2 text-xs">
                <div className="w-5 h-5 rounded bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-green-700" />
                </div>
                <div className="flex items-center gap-1.5">
                  <Warehouse className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-900">{label.warehouse}</span>
                </div>
              </div>
            )}
            
            {data.scopeOfWorkServices.transport && (
              <div className="flex items-center gap-2 text-xs">
                <div className="w-5 h-5 rounded bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-green-700" />
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-900">{label.transport}</span>
                </div>
              </div>
            )}
            
            {data.scopeOfWorkServices.freightAir && (
              <div className="flex items-center gap-2 text-xs">
                <div className="w-5 h-5 rounded bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-green-700" />
                </div>
                <div className="flex items-center gap-1.5">
                  <Plane className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-900">{label.freightAir}</span>
                </div>
              </div>
            )}
            
            {data.scopeOfWorkServices.freightSea && (
              <div className="flex items-center gap-2 text-xs">
                <div className="w-5 h-5 rounded bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-green-700" />
                </div>
                <div className="flex items-center gap-1.5">
                  <Ship className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-900">{label.freightSea}</span>
                </div>
              </div>
            )}
            
            {data.scopeOfWorkServices.crossBorder && (
              <div className="flex items-center gap-2 text-xs col-span-2">
                <div className="w-5 h-5 rounded bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-green-700" />
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-900">{label.crossBorder}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Warehouse Services Section */}
      {data.scopeOfWorkServices.warehouse && hasAnyWarehouseData && (
        <div className="mb-5">
          <div className="bg-blue-600 text-white px-3 py-2 rounded-t flex items-center gap-2">
            <Warehouse className="w-4 h-4" />
            <h3 className="text-sm font-bold">{label.warehouseSection}</h3>
          </div>
          
          <div className="border border-gray-300 border-t-0 rounded-b p-3 space-y-2 text-xs">
            {data.warehouseLocation && (
              <div>
                <span className="font-semibold text-gray-700">{label.warehouseLocation}: </span>
                <span className="text-gray-900">{data.warehouseLocation}</span>
              </div>
            )}
            
            {data.storage && (
              <div>
                <span className="font-semibold text-gray-700">{label.storage}: </span>
                <div className="text-gray-900 whitespace-pre-wrap mt-1">{data.storage}</div>
              </div>
            )}
            
            {data.handling && (
              <div>
                <span className="font-semibold text-gray-700">{label.handling}: </span>
                <div className="text-gray-900 whitespace-pre-wrap mt-1">{data.handling}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Other Activity Section */}
      {data.otherActivity && (
        <div className="mb-5">
          <div className="bg-gray-700 text-white px-3 py-2 rounded-t flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <h3 className="text-sm font-bold">{label.otherActivity}</h3>
          </div>
          
          <div className="border border-gray-300 border-t-0 rounded-b p-3 text-xs">
            <div className="text-gray-900 whitespace-pre-wrap">{data.otherActivity}</div>
          </div>
        </div>
      )}

      {/* Transport Services Section */}
      {data.scopeOfWorkServices.transport && hasAnyTransportData && (
        <div className="mb-5">
          <div className="bg-orange-600 text-white px-3 py-2 rounded-t flex items-center gap-2">
            <Truck className="w-4 h-4" />
            <h3 className="text-sm font-bold">{label.transportSection}</h3>
          </div>
          
          <div className="border border-gray-300 border-t-0 rounded-b p-3 space-y-2 text-xs">
            {data.transportationType && (
              <div>
                <span className="font-semibold text-gray-700">{label.transportationType}: </span>
                <span className="text-gray-900">{data.transportationType}</span>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-3">
              {data.routeOrigin && (
                <div>
                  <span className="font-semibold text-gray-700">{label.routeOrigin}: </span>
                  <span className="text-gray-900">{data.routeOrigin}</span>
                </div>
              )}
              
              {data.routeDestination && (
                <div>
                  <span className="font-semibold text-gray-700">{label.routeDestination}: </span>
                  <span className="text-gray-900">{data.routeDestination}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Freight Services Section */}
      {(data.scopeOfWorkServices.freightAir || data.scopeOfWorkServices.freightSea) && hasAnyFreightData && (
        <div className="mb-5">
          <div className="bg-purple-600 text-white px-3 py-2 rounded-t flex items-center gap-2">
            <Plane className="w-4 h-4" />
            <h3 className="text-sm font-bold">{label.freightSection}</h3>
          </div>
          
          <div className="border border-gray-300 border-t-0 rounded-b p-3 space-y-4 text-xs">
            {/* Air Freight */}
            {data.scopeOfWorkServices.freightAir && data.airFreight && (
              <div className="pb-3 border-b border-gray-200 last:border-0 last:pb-0">
                <div className="flex items-center gap-2 mb-2">
                  <Plane className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-gray-900">{label.airFreight}</span>
                </div>
                <div className="pl-6 space-y-2">
                  <div className="text-gray-900 whitespace-pre-wrap">{data.airFreight}</div>
                  {data.airFreightIncoterm && (
                    <div>
                      <span className="font-semibold text-gray-700">{label.incoterm}: </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {data.airFreightIncoterm}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Sea Freight */}
            {data.scopeOfWorkServices.freightSea && data.seaFreight && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Ship className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-gray-900">{label.seaFreight}</span>
                </div>
                <div className="pl-6 space-y-2">
                  <div className="text-gray-900 whitespace-pre-wrap">{data.seaFreight}</div>
                  {data.seaFreightIncoterm && (
                    <div>
                      <span className="font-semibold text-gray-700">{label.incoterm}: </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {data.seaFreightIncoterm}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Additional Custom Fields */}
      {data.customFields && data.customFields.length > 0 && data.customFields.some(f => f.label && f.value) && (
        <div className="mb-5">
          <div className="bg-gray-600 text-white px-3 py-2 rounded-t flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <h3 className="text-sm font-bold">{label.additionalFields}</h3>
          </div>
          
          <div className="border border-gray-300 border-t-0 rounded-b p-3 space-y-2 text-xs">
            {data.customFields.map((field, index) => {
              if (!field.label || !field.value) return null;
              return (
                <div key={field.id || index}>
                  <span className="font-semibold text-gray-700">{field.label}: </span>
                  <span className="text-gray-900">{field.value}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
