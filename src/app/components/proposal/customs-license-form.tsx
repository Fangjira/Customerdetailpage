import { useState } from "react";
import { CustomsLicenseProposalData, INCOTERMType, ScopeOfWorkServices } from "./proposal-types";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Combobox } from "../ui/combobox";
import { Button } from "../ui/button";
import { Plus, X, FileText } from "lucide-react";

interface CustomsLicenseFormProps {
  data: CustomsLicenseProposalData;
  onChange: (data: CustomsLicenseProposalData) => void;
  language: "th" | "en";
}

const INCOTERMS: INCOTERMType[] = ["EXW", "FCA", "FAS", "FOB", "CFR", "CIF", "CPT", "CIP", "DAT", "DAP", "DDP"];

export function CustomsLicenseForm({ data, onChange, language }: CustomsLicenseFormProps) {
  const [customFields, setCustomFields] = useState(data.customFields || []);

  const labels = {
    th: {
      scopeTitle: "SCOPE OF WORK / ขอบเขตการทำงาน",
      scopeSubtitle: "เลือก Services ที่ต้องการเสนอในสกาสระ:",
      warehouse: "(1) Warehouse",
      transport: "(2) Transport",
      freightAir: "(3) Freight: Air",
      freightSea: "(3) Freight: Sea",
      crossBorder: "(4) Cross-Border",
      
      warehouseSection: "(1) WAREHOUSE SERVICES",
      warehouseLocation: "Warehouse location / สถานที่คลัง",
      storage: "Storage / การจัดเก็บสินค้า",
      handling: "Handling / การเคลื่อนย้ายสินค้า",
      
      otherActivity: "Other Activity / กิจกรรมอื่น",
      otherActivityHint: "(จัดรวม Customs)",
      
      transportSection: "(2) TRANSPORT SERVICES",
      transportationType: "Transportation Type / ประเภทการขนส่งสินค้า",
      route: "Route / เส้นทาง",
      routeOrigin: "1) Origin / ต้นทาง",
      routeDestination: "2) Destination / ปลายทาง",
      
      freightSection: "(3) FREIGHT SERVICES",
      airFreight: "Air Freight / บริการขนส่งทางอากาศ",
      seaFreight: "Sea Freight / บริการขนส่งทางทะเล",
      incoterm: "INCOTERM",
      
      additionalFields: "Additional Custom Fields / ฟิลด์เพิ่มเติม",
      addField: "เพิ่มฟิลด์",
      fieldLabel: "ชื่อฟิลด์",
      fieldValue: "ค่า",
    },
    en: {
      scopeTitle: "SCOPE OF WORK",
      scopeSubtitle: "Select Services to include in proposal:",
      warehouse: "(1) Warehouse",
      transport: "(2) Transport",
      freightAir: "(3) Freight: Air",
      freightSea: "(3) Freight: Sea",
      crossBorder: "(4) Cross-Border",
      
      warehouseSection: "(1) WAREHOUSE SERVICES",
      warehouseLocation: "Warehouse location",
      storage: "Storage",
      handling: "Handling",
      
      otherActivity: "Other Activity",
      otherActivityHint: "(Customs bundled)",
      
      transportSection: "(2) TRANSPORT SERVICES",
      transportationType: "Transportation Type",
      route: "Route",
      routeOrigin: "1) Origin",
      routeDestination: "2) Destination",
      
      freightSection: "(3) FREIGHT SERVICES",
      airFreight: "Air Freight",
      seaFreight: "Sea Freight",
      incoterm: "INCOTERM",
      
      additionalFields: "Additional Custom Fields",
      addField: "Add Field",
      fieldLabel: "Field Name",
      fieldValue: "Value",
    }
  };

  const label = language === "th" ? labels.th : labels.en;

  const handleScopeChange = (service: keyof ScopeOfWorkServices, checked: boolean) => {
    onChange({
      ...data,
      scopeOfWorkServices: {
        ...data.scopeOfWorkServices,
        [service]: checked
      }
    });
  };

  const handleFieldChange = (field: keyof CustomsLicenseProposalData, value: any) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const handleAddCustomField = () => {
    const newField = {
      id: `custom-${Date.now()}`,
      label: "",
      value: ""
    };
    const updatedFields = [...customFields, newField];
    setCustomFields(updatedFields);
    onChange({
      ...data,
      customFields: updatedFields
    });
  };

  const handleRemoveCustomField = (id: string) => {
    const updatedFields = customFields.filter(f => f.id !== id);
    setCustomFields(updatedFields);
    onChange({
      ...data,
      customFields: updatedFields
    });
  };

  const handleCustomFieldChange = (id: string, field: 'label' | 'value', val: string) => {
    const updatedFields = customFields.map(f => 
      f.id === id ? { ...f, [field]: val } : f
    );
    setCustomFields(updatedFields);
    onChange({
      ...data,
      customFields: updatedFields
    });
  };

  return (
    <div className="space-y-4">
      {/* Scope of Work Section */}
      <Card className="border-2 border-[#00BC7D] bg-gradient-to-br from-green-50 to-white">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-5 w-5 text-[#00BC7D]" />
            <h3 className="text-base font-bold text-gray-900">{label.scopeTitle}</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">{label.scopeSubtitle}</p>
          
          <div className="grid grid-cols-2 gap-3 bg-white rounded-xl p-4 border-2 border-gray-200">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="scope-warehouse"
                checked={data.scopeOfWorkServices.warehouse}
                onCheckedChange={(checked) => handleScopeChange("warehouse", checked as boolean)}
              />
              <label
                htmlFor="scope-warehouse"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label.warehouse}
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="scope-transport"
                checked={data.scopeOfWorkServices.transport}
                onCheckedChange={(checked) => handleScopeChange("transport", checked as boolean)}
              />
              <label
                htmlFor="scope-transport"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label.transport}
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="scope-freight-air"
                checked={data.scopeOfWorkServices.freightAir}
                onCheckedChange={(checked) => handleScopeChange("freightAir", checked as boolean)}
              />
              <label
                htmlFor="scope-freight-air"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label.freightAir}
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="scope-freight-sea"
                checked={data.scopeOfWorkServices.freightSea}
                onCheckedChange={(checked) => handleScopeChange("freightSea", checked as boolean)}
              />
              <label
                htmlFor="scope-freight-sea"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label.freightSea}
              </label>
            </div>
            
            <div className="flex items-center space-x-2 col-span-2">
              <Checkbox
                id="scope-cross-border"
                checked={data.scopeOfWorkServices.crossBorder}
                onCheckedChange={(checked) => handleScopeChange("crossBorder", checked as boolean)}
              />
              <label
                htmlFor="scope-cross-border"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label.crossBorder}
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warehouse Section - Show only if checked */}
      {data.scopeOfWorkServices.warehouse && (
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-4">{label.warehouseSection}</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="warehouseLocation" className="text-sm text-gray-700">
                  {label.warehouseLocation}
                </Label>
                <Input
                  id="warehouseLocation"
                  value={data.warehouseLocation || ""}
                  onChange={(e) => handleFieldChange("warehouseLocation", e.target.value)}
                  placeholder="e.g., Warehouse Site A, Bangkok"
                  className="mt-1.5 h-10 text-sm"
                />
              </div>
              
              <div>
                <Label htmlFor="storage" className="text-sm text-gray-700">
                  {label.storage}
                </Label>
                <Textarea
                  id="storage"
                  value={data.storage || ""}
                  onChange={(e) => handleFieldChange("storage", e.target.value)}
                  placeholder="Describe storage services..."
                  className="mt-1.5 text-sm"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="handling" className="text-sm text-gray-700">
                  {label.handling}
                </Label>
                <Textarea
                  id="handling"
                  value={data.handling || ""}
                  onChange={(e) => handleFieldChange("handling", e.target.value)}
                  placeholder="Describe handling services..."
                  className="mt-1.5 text-sm"
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Other Activity Section */}
      <Card>
        <CardContent className="p-4">
          <div>
            <Label htmlFor="otherActivity" className="text-sm text-gray-700">
              {label.otherActivity} <span className="text-gray-500">{label.otherActivityHint}</span>
            </Label>
            <Textarea
              id="otherActivity"
              value={data.otherActivity || ""}
              onChange={(e) => handleFieldChange("otherActivity", e.target.value)}
              placeholder="Describe other activities..."
              className="mt-1.5 text-sm"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Transport Section - Show only if checked */}
      {data.scopeOfWorkServices.transport && (
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-4">{label.transportSection}</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="transportationType" className="text-sm text-gray-700">
                  {label.transportationType}
                </Label>
                <Input
                  id="transportationType"
                  value={data.transportationType || ""}
                  onChange={(e) => handleFieldChange("transportationType", e.target.value)}
                  placeholder="e.g., Container Truck, Refrigerated Truck"
                  className="mt-1.5 h-10 text-sm"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="routeOrigin" className="text-sm text-gray-700">
                    {label.routeOrigin}
                  </Label>
                  <Input
                    id="routeOrigin"
                    value={data.routeOrigin || ""}
                    onChange={(e) => handleFieldChange("routeOrigin", e.target.value)}
                    placeholder="e.g., Bangkok, Thailand"
                    className="mt-1.5 h-10 text-sm"
                  />
                </div>
                
                <div>
                  <Label htmlFor="routeDestination" className="text-sm text-gray-700">
                    {label.routeDestination}
                  </Label>
                  <Input
                    id="routeDestination"
                    value={data.routeDestination || ""}
                    onChange={(e) => handleFieldChange("routeDestination", e.target.value)}
                    placeholder="e.g., Chiang Mai, Thailand"
                    className="mt-1.5 h-10 text-sm"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Freight Section - Show only if Air or Sea checked */}
      {(data.scopeOfWorkServices.freightAir || data.scopeOfWorkServices.freightSea) && (
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-4">{label.freightSection}</h3>
            <div className="space-y-4">
              {/* Air Freight */}
              {data.scopeOfWorkServices.freightAir && (
                <div className="space-y-3 pb-4 border-b border-gray-200">
                  <div>
                    <Label htmlFor="airFreight" className="text-sm text-gray-700">
                      {label.airFreight}
                    </Label>
                    <Textarea
                      id="airFreight"
                      value={data.airFreight || ""}
                      onChange={(e) => handleFieldChange("airFreight", e.target.value)}
                      placeholder="Describe air freight services..."
                      className="mt-1.5 text-sm"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="airFreightIncoterm" className="text-sm text-gray-700">
                      {label.incoterm} ({label.airFreight})
                    </Label>
                    <Combobox
                      options={INCOTERMS.map((term) => ({
                        value: term,
                        label: term,
                      }))}
                      value={data.airFreightIncoterm || ""}
                      onValueChange={(value) => handleFieldChange("airFreightIncoterm", value as INCOTERMType)}
                      placeholder="Select INCOTERM"
                      searchPlaceholder="Search..."
                      className="mt-1.5 h-10 text-sm"
                    />
                  </div>
                </div>
              )}
              
              {/* Sea Freight */}
              {data.scopeOfWorkServices.freightSea && (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="seaFreight" className="text-sm text-gray-700">
                      {label.seaFreight}
                    </Label>
                    <Textarea
                      id="seaFreight"
                      value={data.seaFreight || ""}
                      onChange={(e) => handleFieldChange("seaFreight", e.target.value)}
                      placeholder="Describe sea freight services..."
                      className="mt-1.5 text-sm"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="seaFreightIncoterm" className="text-sm text-gray-700">
                      {label.incoterm} ({label.seaFreight})
                    </Label>
                    <Combobox
                      options={INCOTERMS.map((term) => ({
                        value: term,
                        label: term,
                      }))}
                      value={data.seaFreightIncoterm || ""}
                      onValueChange={(value) => handleFieldChange("seaFreightIncoterm", value as INCOTERMType)}
                      placeholder="Select INCOTERM"
                      searchPlaceholder="Search..."
                      className="mt-1.5 h-10 text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Additional Custom Fields */}
      <Card className="border-dashed border-2">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-900">{label.additionalFields}</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddCustomField}
              className="h-8"
            >
              <Plus className="h-4 w-4 mr-1" />
              {label.addField}
            </Button>
          </div>
          
          {customFields.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">
              {language === "th" ? "ไม่มีฟิลด์เพิ่มเติม - คลิกปุ่มด้านบนเพื่อเพิ่ม" : "No additional fields - Click button above to add"}
            </p>
          ) : (
            <div className="space-y-3">
              {customFields.map((field) => (
                <div key={field.id} className="flex gap-2 items-start">
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    <Input
                      placeholder={label.fieldLabel}
                      value={field.label}
                      onChange={(e) => handleCustomFieldChange(field.id, 'label', e.target.value)}
                      className="h-9 text-sm"
                    />
                    <Input
                      placeholder={label.fieldValue}
                      value={field.value}
                      onChange={(e) => handleCustomFieldChange(field.id, 'value', e.target.value)}
                      className="h-9 text-sm"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveCustomField(field.id)}
                    className="h-9 w-9 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
