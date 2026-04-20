import { useState } from "react";
import { CustomsLicenseData, LanguageType } from "../quotation-types";
import { EditableTextBlock } from "../quotation-components";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Check, Warehouse, Truck, Plane, Ship, Globe, Plus, Trash2 } from "lucide-react";
import { Button } from "../../ui/button";

interface CustomsLicenseFormProps {
  data: any;
  onChange: (data: CustomsLicenseData) => void;
  language: LanguageType;
}

export function CustomsLicenseForm({ data, onChange, language }: CustomsLicenseFormProps) {
  // Initialize with proper defaults
  const customsData: CustomsLicenseData = data || {
    scopeOfWorkServices: {
      warehouse: false,
      transport: false,
      freightAir: false,
      freightSea: false,
      crossBorder: false,
    },
    customFields: [],
  };

  const labels = {
    th: {
      scopeTitle: "SCOPE OF WORK / ขอบเขตการดำเนินงาน",
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
      routeOrigin: "Origin / ต้นทาง",
      routeDestination: "Destination / ปลายทาง",
      freightSection: "3. FREIGHT SERVICES / บริการขนส่งระหว่างประเทศ",
      airFreight: "Air Freight / บริการขนส่งทางอากาศ",
      seaFreight: "Sea Freight / บริการขนส่งทางทะเล",
      incoterm: "INCOTERM",
      customFieldsSection: "4. ADDITIONAL INFORMATION / ข้อมูลเพิ่มเติม",
      addCustomField: "เพิ่มฟิลด์",
      fieldLabel: "ชื่อฟิลด์",
      fieldValue: "ค่า",
      termsTitle: "5. TERMS & CONDITIONS / เงื่อนไข",
      termsPlaceholder: "กรอกเงื่อนไขการให้บริการ เช่น\n1. ราคาดังกล่าวยังไม่รวมภาษีมูลค่าเพิ่ม 7%\n2. เงื่อนไขการชำระเงิน: เครดิต 30 วัน\n3. ราคาอาจมีการเปลี่ยนแปลงตามอัตราแลกเปลี่ยน",
    },
    en: {
      scopeTitle: "SCOPE OF WORK",
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
      routeOrigin: "Origin",
      routeDestination: "Destination",
      freightSection: "3. FREIGHT SERVICES",
      airFreight: "Air Freight",
      seaFreight: "Sea Freight",
      incoterm: "INCOTERM",
      customFieldsSection: "4. ADDITIONAL INFORMATION",
      addCustomField: "Add Field",
      fieldLabel: "Field Label",
      fieldValue: "Value",
      termsTitle: "5. TERMS & CONDITIONS",
      termsPlaceholder: "Enter terms and conditions, e.g.\n1. Price excludes 7% VAT\n2. Payment terms: 30 days credit\n3. Price may change based on exchange rate",
    }
  };

  const label = labels[language];

  const incotermOptions = [
    "EXW - Ex Works",
    "FCA - Free Carrier",
    "FAS - Free Alongside Ship",
    "FOB - Free On Board",
    "CFR - Cost and Freight",
    "CIF - Cost, Insurance and Freight",
    "CPT - Carriage Paid To",
    "CIP - Carriage and Insurance Paid To",
    "DAP - Delivered At Place",
    "DPU - Delivered at Place Unloaded",
    "DDP - Delivered Duty Paid",
  ];

  const toggleService = (service: keyof CustomsLicenseData["scopeOfWorkServices"]) => {
    onChange({
      ...customsData,
      scopeOfWorkServices: {
        ...customsData.scopeOfWorkServices,
        [service]: !customsData.scopeOfWorkServices[service],
      },
    });
  };

  const addCustomField = () => {
    const newField = {
      id: `custom-${Date.now()}`,
      label: "",
      value: "",
    };
    onChange({
      ...customsData,
      customFields: [...customsData.customFields, newField],
    });
  };

  const updateCustomField = (id: string, field: "label" | "value", value: string) => {
    onChange({
      ...customsData,
      customFields: customsData.customFields.map((f) =>
        f.id === id ? { ...f, [field]: value } : f
      ),
    });
  };

  const removeCustomField = (id: string) => {
    onChange({
      ...customsData,
      customFields: customsData.customFields.filter((f) => f.id !== id),
    });
  };

  return (
    <div className="space-y-6">
      {/* SCOPE OF WORK Section */}
      <div className="bg-[#00BC7D]/5 border-2 border-[#00BC7D]/20 rounded-lg p-4">
        <h3 className="text-base font-bold text-gray-900 mb-3">{label.scopeTitle}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Warehouse */}
          <button
            type="button"
            onClick={() => toggleService("warehouse")}
            className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
              customsData.scopeOfWorkServices.warehouse
                ? "border-green-500 bg-green-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div
              className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 ${
                customsData.scopeOfWorkServices.warehouse
                  ? "bg-green-500"
                  : "bg-gray-200"
              }`}
            >
              {customsData.scopeOfWorkServices.warehouse && (
                <Check className="w-4 h-4 text-white" />
              )}
            </div>
            <Warehouse className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-900">{label.warehouse}</span>
          </button>

          {/* Transport */}
          <button
            type="button"
            onClick={() => toggleService("transport")}
            className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
              customsData.scopeOfWorkServices.transport
                ? "border-green-500 bg-green-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div
              className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 ${
                customsData.scopeOfWorkServices.transport
                  ? "bg-green-500"
                  : "bg-gray-200"
              }`}
            >
              {customsData.scopeOfWorkServices.transport && (
                <Check className="w-4 h-4 text-white" />
              )}
            </div>
            <Truck className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-900">{label.transport}</span>
          </button>

          {/* Freight Air */}
          <button
            type="button"
            onClick={() => toggleService("freightAir")}
            className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
              customsData.scopeOfWorkServices.freightAir
                ? "border-green-500 bg-green-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div
              className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 ${
                customsData.scopeOfWorkServices.freightAir
                  ? "bg-green-500"
                  : "bg-gray-200"
              }`}
            >
              {customsData.scopeOfWorkServices.freightAir && (
                <Check className="w-4 h-4 text-white" />
              )}
            </div>
            <Plane className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-900">{label.freightAir}</span>
          </button>

          {/* Freight Sea */}
          <button
            type="button"
            onClick={() => toggleService("freightSea")}
            className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
              customsData.scopeOfWorkServices.freightSea
                ? "border-green-500 bg-green-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div
              className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 ${
                customsData.scopeOfWorkServices.freightSea
                  ? "bg-green-500"
                  : "bg-gray-200"
              }`}
            >
              {customsData.scopeOfWorkServices.freightSea && (
                <Check className="w-4 h-4 text-white" />
              )}
            </div>
            <Ship className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-900">{label.freightSea}</span>
          </button>

          {/* Cross-Border */}
          <button
            type="button"
            onClick={() => toggleService("crossBorder")}
            className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all md:col-span-2 ${
              customsData.scopeOfWorkServices.crossBorder
                ? "border-green-500 bg-green-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div
              className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 ${
                customsData.scopeOfWorkServices.crossBorder
                  ? "bg-green-500"
                  : "bg-gray-200"
              }`}
            >
              {customsData.scopeOfWorkServices.crossBorder && (
                <Check className="w-4 h-4 text-white" />
              )}
            </div>
            <Globe className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-900">{label.crossBorder}</span>
          </button>
        </div>
      </div>

      {/* Warehouse Services Section */}
      {customsData.scopeOfWorkServices.warehouse && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
          <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Warehouse className="w-5 h-5 text-blue-600" />
            {label.warehouseSection}
          </h3>
          <div className="space-y-3">
            <div>
              <Label className="mb-1.5">{label.warehouseLocation}</Label>
              <Input
                value={customsData.warehouseLocation || ""}
                onChange={(e) =>
                  onChange({ ...customsData, warehouseLocation: e.target.value })
                }
                placeholder={language === "th" ? "เช่น สาขาบึงสนั่น สระบุรี" : "e.g., Bueng Sanan, Saraburi"}
              />
            </div>
            <div>
              <Label className="mb-1.5">{label.storage}</Label>
              <EditableTextBlock
                value={customsData.storage || ""}
                onChange={(value) => onChange({ ...customsData, storage: value })}
                rows={3}
              />
            </div>
            <div>
              <Label className="mb-1.5">{label.handling}</Label>
              <EditableTextBlock
                value={customsData.handling || ""}
                onChange={(value) => onChange({ ...customsData, handling: value })}
                rows={3}
              />
            </div>
          </div>
        </div>
      )}

      {/* Other Activity Section */}
      <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
        <h3 className="text-base font-bold text-gray-900 mb-3">{label.otherActivity}</h3>
        <EditableTextBlock
          value={customsData.otherActivity || ""}
          onChange={(value) => onChange({ ...customsData, otherActivity: value })}
          rows={4}
        />
      </div>

      {/* Transport Services Section */}
      {customsData.scopeOfWorkServices.transport && (
        <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
          <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Truck className="w-5 h-5 text-orange-600" />
            {label.transportSection}
          </h3>
          <div className="space-y-3">
            <div>
              <Label className="mb-1.5">{label.transportationType}</Label>
              <Input
                value={customsData.transportationType || ""}
                onChange={(e) =>
                  onChange({ ...customsData, transportationType: e.target.value })
                }
                placeholder={language === "th" ? "เช่น รถบรรทุก 6 ล้อ" : "e.g., 6-wheel truck"}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="mb-1.5">{label.routeOrigin}</Label>
                <Input
                  value={customsData.routeOrigin || ""}
                  onChange={(e) =>
                    onChange({ ...customsData, routeOrigin: e.target.value })
                  }
                  placeholder={language === "th" ? "ต้นทาง" : "Origin"}
                />
              </div>
              <div>
                <Label className="mb-1.5">{label.routeDestination}</Label>
                <Input
                  value={customsData.routeDestination || ""}
                  onChange={(e) =>
                    onChange({ ...customsData, routeDestination: e.target.value })
                  }
                  placeholder={language === "th" ? "ปลายทาง" : "Destination"}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Freight Services Section */}
      {(customsData.scopeOfWorkServices.freightAir || customsData.scopeOfWorkServices.freightSea) && (
        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
          <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Plane className="w-5 h-5 text-purple-600" />
            {label.freightSection}
          </h3>
          <div className="space-y-4">
            {/* Air Freight */}
            {customsData.scopeOfWorkServices.freightAir && (
              <div className="bg-white p-3 rounded-lg border border-purple-200">
                <Label className="mb-1.5 flex items-center gap-2">
                  <Plane className="w-4 h-4" />
                  {label.airFreight}
                </Label>
                <EditableTextBlock
                  value={customsData.airFreight || ""}
                  onChange={(value) => onChange({ ...customsData, airFreight: value })}
                  rows={3}
                />
                <div className="mt-3">
                  <Label className="mb-1.5">{label.incoterm}</Label>
                  <select
                    value={customsData.airFreightIncoterm || ""}
                    onChange={(e) =>
                      onChange({ ...customsData, airFreightIncoterm: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] text-sm"
                  >
                    <option value="">{language === "th" ? "เลือก INCOTERM" : "Select INCOTERM"}</option>
                    {incotermOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Sea Freight */}
            {customsData.scopeOfWorkServices.freightSea && (
              <div className="bg-white p-3 rounded-lg border border-purple-200">
                <Label className="mb-1.5 flex items-center gap-2">
                  <Ship className="w-4 h-4" />
                  {label.seaFreight}
                </Label>
                <EditableTextBlock
                  value={customsData.seaFreight || ""}
                  onChange={(value) => onChange({ ...customsData, seaFreight: value })}
                  rows={3}
                />
                <div className="mt-3">
                  <Label className="mb-1.5">{label.incoterm}</Label>
                  <select
                    value={customsData.seaFreightIncoterm || ""}
                    onChange={(e) =>
                      onChange({ ...customsData, seaFreightIncoterm: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] text-sm"
                  >
                    <option value="">{language === "th" ? "เลือก INCOTERM" : "Select INCOTERM"}</option>
                    {incotermOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Custom Fields Section */}
      <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-gray-900">{label.customFieldsSection}</h3>
          <Button
            type="button"
            size="sm"
            onClick={addCustomField}
            className="bg-[#7BC9A6] hover:bg-[#6CB88A]"
          >
            <Plus className="w-4 h-4 mr-1" />
            {label.addCustomField}
          </Button>
        </div>

        {customsData.customFields.length > 0 && (
          <div className="space-y-3">
            {customsData.customFields.map((field) => (
              <div key={field.id} className="bg-white p-3 rounded-lg border border-gray-200">
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-4">
                    <Label className="mb-1.5 text-xs">{label.fieldLabel}</Label>
                    <Input
                      value={field.label}
                      onChange={(e) => updateCustomField(field.id, "label", e.target.value)}
                      placeholder={language === "th" ? "ชื่อฟิลด์" : "Field label"}
                      className="text-sm"
                    />
                  </div>
                  <div className="col-span-7">
                    <Label className="mb-1.5 text-xs">{label.fieldValue}</Label>
                    <Input
                      value={field.value}
                      onChange={(e) => updateCustomField(field.id, "value", e.target.value)}
                      placeholder={language === "th" ? "ค่า" : "Value"}
                      className="text-sm"
                    />
                  </div>
                  <div className="col-span-1 flex items-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCustomField(field.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 h-9 w-9 p-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {customsData.customFields.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">
            {language === "th"
              ? "คลิก 'เพิ่มฟิลด์' เพื่อเพิ่มข้อมูลเพิ่มเติม"
              : "Click 'Add Field' to add additional information"}
          </p>
        )}
      </div>

      {/* Terms & Conditions Section - MOVED TO BOTTOM */}
      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
        <h3 className="text-base font-bold text-gray-900 mb-3">{label.termsTitle}</h3>
        <EditableTextBlock
          value={customsData.termsAndConditions || ""}
          onChange={(value) => onChange({ ...customsData, termsAndConditions: value })}
          rows={6}
          placeholder={label.termsPlaceholder}
        />
      </div>
    </div>
  );
}