import React, { useState } from "react";
import { QuotationFormData } from "../modals/create-quotation-form-modal";
import { QuotationTemplateType } from "./quotation-types";
import { Edit3, Check, X, Warehouse, Truck, Plane, Ship, Globe, FileText } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface QuotationDocumentPreviewProps {
  formData: Partial<QuotationFormData>;
  templateType: QuotationTemplateType | null;
  onUpdateFormData?: (updates: Partial<QuotationFormData>) => void;
  editable?: boolean;
}

export function QuotationDocumentPreview({ formData, templateType, onUpdateFormData, editable = false }: QuotationDocumentPreviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState<Partial<QuotationFormData>>({});

  // DEBUG: Log formData when component renders
  console.log("🎯 QuotationDocumentPreview [VERSION 2.0 WITH SCOPE OF WORK] - templateType:", templateType);
  console.log("📋 QuotationDocumentPreview - formData:", formData);
  console.log("📋 QuotationDocumentPreview - selectedServices:", formData.selectedServices);

  const today = new Date().toLocaleDateString('th-TH', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const startEdit = () => {
    setIsEditing(true);
    setTempData({ ...formData });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setTempData({});
  };

  const saveEdit = () => {
    if (onUpdateFormData) {
      onUpdateFormData(tempData);
    }
    setIsEditing(false);
    setTempData({});
  };

  const updateTempData = (field: string, value: any) => {
    setTempData(prev => ({ ...prev, [field]: value }));
  };

  const updateTableCell = (tableName: 'warehousingRateData' | 'transportRateData' | 'customsRateTable' | 'licenseRateTable' | 'customsLicenseRateTable', rowId: string, colId: string, value: string) => {
    const tableDataStr = currentData(tableName) as string;
    if (!tableDataStr) return;
    
    try {
      const tableData = JSON.parse(tableDataStr);
      const rowIndex = tableData.rows.findIndex((r: any) => r.id === rowId);
      if (rowIndex !== -1) {
        tableData.rows[rowIndex].cells[colId] = value;
        updateTempData(tableName, JSON.stringify(tableData));
      }
    } catch (e) {
      console.error('Failed to update table cell:', e);
    }
  };

  const currentData = (field: keyof QuotationFormData) => 
    isEditing ? (tempData[field] ?? formData[field]) : formData[field];

  return (
    <div className="relative">
      {/* Edit Control Bar - Fixed at top of preview area */}
      {editable && (
        <div className="sticky top-0 z-50 bg-gradient-to-r from-white to-green-50 border-b-2 border-[#7BC9A6] px-6 py-4 mb-6 flex items-center justify-between shadow-lg rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#7BC9A6] animate-pulse"></div>
            <span className="text-base font-semibold text-gray-800">
              {isEditing ? "🟢 โหมดแก้ไข - คลิกที่ข้อความเพื่อแก้ไข" : "📄 โหมดดูตัวอย่าง"}
            </span>
          </div>
          
          {!isEditing ? (
            <Button
              onClick={startEdit}
              className="h-10 px-6 bg-[#7BC9A6] hover:bg-[#7BC9A6]/90 text-white font-medium shadow-md"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              แก้ไขเอกสาร
            </Button>
          ) : (
            <div className="flex gap-3">
              <Button
                onClick={saveEdit}
                className="h-10 px-6 bg-[#7BC9A6] hover:bg-[#7BC9A6]/90 text-white font-medium shadow-md"
              >
                <Check className="h-4 w-4 mr-2" />
                บันทึกการแก้ไข
              </Button>
              <Button
                onClick={cancelEdit}
                variant="outline"
                className="h-10 px-6 border-2 border-gray-300 text-gray-700 hover:bg-gray-100 font-medium"
              >
                <X className="h-4 w-4 mr-2" />
                ยกเลิก
              </Button>
            </div>
          )}
        </div>
      )}

      {/* A4 Document */}
      <div className="max-w-[210mm] mx-auto bg-white shadow-2xl">
        {/* A4 Document Container */}
        <div className="min-h-[297mm] p-[20mm] space-y-6">
          
          {/* Header Section */}
          <div className="flex items-start justify-between border-b-2 border-[#7BC9A6] pb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#7BC9A6] mb-1">mini CRM</h1>
              <p className="text-sm text-gray-600">Logistics Solutions Provider</p>
              <p className="text-xs text-gray-500 mt-2">
                123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย<br />
                กรุงเทพมหานคร 10110<br />
                Tel: 02-123-4567 | Email: info@onelink.co.th
              </p>
            </div>
            <div className="text-right">
              <div className="bg-[#7BC9A6] text-white px-4 py-2 rounded-lg inline-block mb-2">
                <p className="text-xs font-medium">QUOTATION</p>
              </div>
              <p className="text-xs text-gray-600">วันที่: {today}</p>
            </div>
          </div>

          {/* Quotation Info Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-600 mb-1">เลขที่ใบเสนอราคา</p>
                {isEditing ? (
                  <Input
                    value={currentData('quotationNumber') as string || ''}
                    onChange={(e) => updateTempData('quotationNumber', e.target.value)}
                    className="h-8 text-sm font-bold border-[#7BC9A6] focus:ring-2 focus:ring-[#7BC9A6]/20"
                    placeholder="QT-2024-001"
                  />
                ) : (
                  <p className="text-sm font-bold text-gray-900">{formData.quotationNumber || "-"}</p>
                )}
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">วันที่มีผลบังคับใช้</p>
                {isEditing ? (
                  <Input
                    type="date"
                    value={currentData('validUntil') as string || ''}
                    onChange={(e) => updateTempData('validUntil', e.target.value)}
                    className="h-8 text-sm font-bold border-[#7BC9A6] focus:ring-2 focus:ring-[#7BC9A6]/20"
                  />
                ) : (
                  <p className="text-sm font-bold text-gray-900">{formData.validUntil || "-"}</p>
                )}
              </div>
            </div>
          </div>

          {/* Customer Info Section */}
          <div>
            <h2 className="text-sm font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">
              ข้อมูลลูกค้า / Customer Information
            </h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">ชื่อบริษัท (TH)</p>
                  {isEditing ? (
                    <Input
                      value={currentData('companyNameTh') as string || ''}
                      onChange={(e) => updateTempData('companyNameTh', e.target.value)}
                      className="h-8 text-sm font-semibold border-[#7BC9A6] focus:ring-2 focus:ring-[#7BC9A6]/20"
                      placeholder="บริษัท ตัวอย่าง จำกัด"
                    />
                  ) : (
                    <p className="text-sm font-semibold text-gray-900">{formData.companyNameTh || "-"}</p>
                  )}
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Company Name (EN)</p>
                  {isEditing ? (
                    <Input
                      value={currentData('companyNameEn') as string || ''}
                      onChange={(e) => updateTempData('companyNameEn', e.target.value)}
                      className="h-8 text-sm font-semibold border-[#7BC9A6] focus:ring-2 focus:ring-[#7BC9A6]/20"
                      placeholder="Example Company Ltd."
                    />
                  ) : (
                    <p className="text-sm font-semibold text-gray-900">{formData.companyNameEn || "-"}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">ชื่อผู้ติดต่อ</p>
                  {isEditing ? (
                    <Input
                      value={currentData('contactName') as string || ''}
                      onChange={(e) => updateTempData('contactName', e.target.value)}
                      className="h-8 text-sm border-[#7BC9A6] focus:ring-2 focus:ring-[#7BC9A6]/20"
                      placeholder="คุณสมชาย"
                    />
                  ) : (
                    <p className="text-sm text-gray-900">{formData.contactName || "-"}</p>
                  )}
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">ตำแหน่ง</p>
                  {isEditing ? (
                    <Input
                      value={currentData('position') as string || ''}
                      onChange={(e) => updateTempData('position', e.target.value)}
                      className="h-8 text-sm border-[#7BC9A6] focus:ring-2 focus:ring-[#7BC9A6]/20"
                      placeholder="ผู้จัดการ"
                    />
                  ) : (
                    <p className="text-sm text-gray-900">{formData.position || "-"}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">เบอร์โทร</p>
                  {isEditing ? (
                    <Input
                      value={currentData('phone') as string || ''}
                      onChange={(e) => updateTempData('phone', e.target.value)}
                      className="h-8 text-sm border-[#7BC9A6] focus:ring-2 focus:ring-[#7BC9A6]/20"
                      placeholder="02-123-4567"
                    />
                  ) : (
                    <p className="text-sm text-gray-900">{formData.phone || "-"}</p>
                  )}
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">อีเมล</p>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={currentData('email') as string || ''}
                      onChange={(e) => updateTempData('email', e.target.value)}
                      className="h-8 text-sm border-[#7BC9A6] focus:ring-2 focus:ring-[#7BC9A6]/20"
                      placeholder="contact@example.com"
                    />
                  ) : (
                    <p className="text-sm text-gray-900">{formData.email || "-"}</p>
                  )}
                </div>
              </div>
              {(formData.address || isEditing) && (
                <div>
                  <p className="text-xs text-gray-600 mb-1">ที่อยู่</p>
                  {isEditing ? (
                    <Textarea
                      value={currentData('address') as string || ''}
                      onChange={(e) => updateTempData('address', e.target.value)}
                      className="text-sm border-[#7BC9A6] focus:ring-2 focus:ring-[#7BC9A6]/20 min-h-[60px]"
                      placeholder="123 ถนน..."
                    />
                  ) : (
                    <p className="text-sm text-gray-900">{formData.address}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Introduction Section */}
          <div>
            <h2 className="text-sm font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">
              Introduction
            </h2>
            {isEditing ? (
              <Textarea
                value={currentData('introduction') as string || ''}
                onChange={(e) => updateTempData('introduction', e.target.value)}
                className="text-sm text-gray-700 leading-relaxed min-h-[100px] border-2 border-[#7BC9A6] focus:ring-2 focus:ring-[#7BC9A6]/20"
                placeholder="เรียน คุณ..."
              />
            ) : (
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {currentData('introduction') as string || `เรียน คุณ${formData.contactName ? ' ' + formData.contactName : ''},\n\nขอขอบคุณที่ให้ความสนใจในบริการของ mini CRM เรายินดีที่จะนำเสนอใบเสนอราคาสำหรับบริการโลจิสติกส์ตามที่ท่านได้สอบถามมา`}
              </p>
            )}
          </div>

          {/* SCOPE OF WORK - Show for ALL templates */}
          {formData.selectedServices && formData.selectedServices.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-[#FF6B35]" />
                <h3 className="text-sm font-bold text-gray-900">
                  SCOPE OF WORK / ขอบเขตการดำเนินงาน
                </h3>
              </div>
              
              <div className="space-y-2">
                {formData.selectedServices.includes("warehouse-location") && (
                  <div className="text-sm text-gray-700">
                    <span className="text-[#7BC9A6] font-semibold">✓</span> <span className="font-medium">Warehouse location / สถานที่คลัง:</span> {formData.warehouseSite || "-"}
                  </div>
                )}
                {formData.selectedServices.includes("storage") && (
                  <div className="text-sm text-gray-700">
                    <span className="text-[#7BC9A6] font-semibold">✓</span> <span className="font-medium">Storage / การจัดเก็บสินค้า:</span> {formData.storageDetails || "-"}
                  </div>
                )}
                {formData.selectedServices.includes("handling") && (
                  <div className="text-sm text-gray-700">
                    <span className="text-[#7BC9A6] font-semibold">✓</span> <span className="font-medium">Handling / การเคลื่อนย้ายสินค้า:</span> {formData.handlingDetails || "-"}
                  </div>
                )}
                {formData.selectedServices.includes("other-activity") && (
                  <div className="text-sm text-gray-700">
                    <span className="text-[#7BC9A6] font-semibold">✓</span> <span className="font-medium">Other Activity / กิจกรรมอื่น:</span> {formData.otherActivity || "จัดรวม Customs"}
                  </div>
                )}
                {formData.selectedServices.includes("transportation") && (
                  <div className="text-sm text-gray-700">
                    <div><span className="text-[#7BC9A6] font-semibold">✓</span> <span className="font-medium">Transportation Type / ประเภทการขนส่งสินค้า:</span> {formData.transportationType || "-"}</div>
                    {(formData.routeOrigin || formData.routeDestination) && (
                      <div className="ml-4 text-xs text-gray-600">Route: {formData.routeOrigin || "-"} → {formData.routeDestination || "-"}</div>
                    )}
                  </div>
                )}
                {formData.selectedServices.includes("air-freight") && (
                  <div className="text-sm text-gray-700">
                    <div><span className="text-[#7BC9A6] font-semibold">✓</span> <span className="font-medium">Air Freight / บริการขนส่งทางอากาศ:</span> {formData.airFreightDetails || "-"}</div>
                    {formData.airFreightIncoterm && <div className="ml-4 text-xs text-gray-600">INCOTERM: {formData.airFreightIncoterm}</div>}
                  </div>
                )}
                {formData.selectedServices.includes("sea-freight") && (
                  <div className="text-sm text-gray-700">
                    <div><span className="text-[#7BC9A6] font-semibold">✓</span> <span className="font-medium">Sea Freight / บริการขนส่งทางทะเล:</span> {formData.seaFreightDetails || "-"}</div>
                    {formData.seaFreightIncoterm && <div className="ml-4 text-xs text-gray-600">INCOTERM: {formData.seaFreightIncoterm}</div>}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Description Section - Only for non-customs-license templates */}
          {templateType !== 'customs-license' && (formData.description || isEditing) && (
            <div>
              <h2 className="text-sm font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">
                Description
              </h2>
              {isEditing ? (
                <Textarea
                  value={currentData('description') as string || ''}
                  onChange={(e) => updateTempData('description', e.target.value)}
                  className="text-sm text-gray-700 leading-relaxed min-h-[100px] border-2 border-[#7BC9A6] focus:ring-2 focus:ring-[#7BC9A6]/20"
                  placeholder="รายละเอียดเพิ่มเติม..."
                />
              ) : (
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {formData.description}
                </p>
              )}
            </div>
          )}
          
          {/* Customs & License - Additional Service Details */}
          {templateType === 'customs-license' && (
            <div>
              <h2 className="text-sm font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">
                ข้อมูลบริการและรายละเอียด / Service Information & Details
              </h2>

              {/* Warehouse Services Section */}
              {formData.selectedServices?.includes("warehouse") && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                  <h4 className="font-bold text-gray-900 mb-2 text-xs flex items-center gap-1.5">
                    <Warehouse className="w-4 h-4 text-blue-600" />
                    1. WAREHOUSE SERVICES / บริการคลังสินค้า
                  </h4>
                  <div className="space-y-2 text-xs">
                    {(formData.warehouseSite || isEditing) && (
                      <div>
                        <span className="font-semibold text-gray-700">Warehouse location / สถานที่คลัง:</span>
                        {isEditing ? (
                          <Input
                            value={currentData('warehouseSite') as string || ''}
                            onChange={(e) => updateTempData('warehouseSite', e.target.value)}
                            className="mt-1 h-8 text-xs border-[#7BC9A6]"
                            placeholder="เช่น บางปะอิน"
                          />
                        ) : (
                          <p className="text-gray-900 mt-0.5">{formData.warehouseSite}</p>
                        )}
                      </div>
                    )}
                    {(formData.storageDetails || isEditing) && (
                      <div>
                        <span className="font-semibold text-gray-700">Storage / การจัดเก็บสินค้า:</span>
                        {isEditing ? (
                          <Textarea
                            value={currentData('storageDetails') as string || ''}
                            onChange={(e) => updateTempData('storageDetails', e.target.value)}
                            className="mt-1 text-xs border-[#7BC9A6]"
                            rows={2}
                          />
                        ) : (
                          <p className="text-gray-900 mt-0.5 whitespace-pre-wrap">{formData.storageDetails}</p>
                        )}
                      </div>
                    )}
                    {(formData.handlingDetails || isEditing) && (
                      <div>
                        <span className="font-semibold text-gray-700">Handling / การเคลื่อนย้ายสินค้า:</span>
                        {isEditing ? (
                          <Textarea
                            value={currentData('handlingDetails') as string || ''}
                            onChange={(e) => updateTempData('handlingDetails', e.target.value)}
                            className="mt-1 text-xs border-[#7BC9A6]"
                            rows={2}
                          />
                        ) : (
                          <p className="text-gray-900 mt-0.5 whitespace-pre-wrap">{formData.handlingDetails}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Other Activity Section */}
              {(formData.otherActivity || isEditing) && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-3">
                  <h4 className="font-bold text-gray-900 mb-2 text-xs">Other Activity / กิจกรรมอื่น</h4>
                  {isEditing ? (
                    <Textarea
                      value={currentData('otherActivity') as string || ''}
                      onChange={(e) => updateTempData('otherActivity', e.target.value)}
                      className="text-xs border-[#7BC9A6]"
                      rows={2}
                    />
                  ) : (
                    <p className="text-xs text-gray-900 whitespace-pre-wrap leading-relaxed">{formData.otherActivity}</p>
                  )}
                </div>
              )}

              {/* Transport Services Section */}
              {formData.selectedServices?.includes("transport") && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-3">
                  <h4 className="font-bold text-gray-900 mb-2 text-xs flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-orange-600" />
                    2. TRANSPORT SERVICES / บริการขนส่ง
                  </h4>
                  <div className="space-y-2 text-xs">
                    {(formData.transportationType || isEditing) && (
                      <div>
                        <span className="font-semibold text-gray-700">Transportation Type / ประเภทการขนส่งสินค้า:</span>
                        {isEditing ? (
                          <Input
                            value={currentData('transportationType') as string || ''}
                            onChange={(e) => updateTempData('transportationType', e.target.value)}
                            className="mt-1 h-8 text-xs border-[#7BC9A6]"
                            placeholder="เช่น รถ 6 ล้อ"
                          />
                        ) : (
                          <p className="text-gray-900 mt-0.5">{formData.transportationType}</p>
                        )}
                      </div>
                    )}
                    {((formData.routeOrigin || formData.routeDestination) || isEditing) && (
                      <div>
                        <span className="font-semibold text-gray-700">Route / เส้นทาง:</span>
                        {isEditing ? (
                          <div className="flex gap-2 mt-1">
                            <Input
                              value={currentData('routeOrigin') as string || ''}
                              onChange={(e) => updateTempData('routeOrigin', e.target.value)}
                              className="flex-1 h-8 text-xs border-[#7BC9A6]"
                              placeholder="ต้นทาง"
                            />
                            <span className="self-center">→</span>
                            <Input
                              value={currentData('routeDestination') as string || ''}
                              onChange={(e) => updateTempData('routeDestination', e.target.value)}
                              className="flex-1 h-8 text-xs border-[#7BC9A6]"
                              placeholder="ปลายทาง"
                            />
                          </div>
                        ) : (
                          <p className="text-gray-900 mt-0.5">
                            {formData.routeOrigin || "-"} → {formData.routeDestination || "-"}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Freight Services Section */}
              {(formData.selectedServices?.includes("freight-air") || formData.selectedServices?.includes("freight-sea")) && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-3">
                  <h4 className="font-bold text-gray-900 mb-2 text-xs flex items-center gap-1.5">
                    <Plane className="w-4 h-4 text-purple-600" />
                    3. FREIGHT SERVICES / บริการขนส่งระหว่างประเทศ
                  </h4>
                  <div className="space-y-3 text-xs">
                    {/* Air Freight */}
                    {formData.selectedServices?.includes("freight-air") && (formData.airFreightDetails || formData.airFreightIncoterm || isEditing) && (
                      <div className="bg-white p-2 rounded border border-purple-200">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Plane className="w-3.5 h-3.5 text-purple-600" />
                          <span className="font-semibold text-gray-700">Air Freight / บริการขนส่งทางอากาศ:</span>
                        </div>
                        {isEditing ? (
                          <div className="space-y-2">
                            <Textarea
                              value={currentData('airFreightDetails') as string || ''}
                              onChange={(e) => updateTempData('airFreightDetails', e.target.value)}
                              className="text-xs border-[#7BC9A6]"
                              rows={2}
                              placeholder="รายละเอียด"
                            />
                            <Input
                              value={currentData('airFreightIncoterm') as string || ''}
                              onChange={(e) => updateTempData('airFreightIncoterm', e.target.value)}
                              className="h-8 text-xs border-[#7BC9A6]"
                              placeholder="INCOTERM (เช่น FOB, CIF)"
                            />
                          </div>
                        ) : (
                          <>
                            {formData.airFreightDetails && (
                              <p className="text-gray-900 mb-2 whitespace-pre-wrap">{formData.airFreightDetails}</p>
                            )}
                            {formData.airFreightIncoterm && (
                              <div className="bg-purple-50 px-2 py-1 rounded">
                                <span className="font-semibold text-purple-700">INCOTERM:</span>
                                <span className="text-purple-900 ml-1">{formData.airFreightIncoterm}</span>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    )}

                    {/* Sea Freight */}
                    {formData.selectedServices?.includes("freight-sea") && (formData.seaFreightDetails || formData.seaFreightIncoterm || isEditing) && (
                      <div className="bg-white p-2 rounded border border-purple-200">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Ship className="w-3.5 h-3.5 text-purple-600" />
                          <span className="font-semibold text-gray-700">Sea Freight / บริการขนส่งทางทะเล:</span>
                        </div>
                        {isEditing ? (
                          <div className="space-y-2">
                            <Textarea
                              value={currentData('seaFreightDetails') as string || ''}
                              onChange={(e) => updateTempData('seaFreightDetails', e.target.value)}
                              className="text-xs border-[#7BC9A6]"
                              rows={2}
                              placeholder="รายละเอียด"
                            />
                            <Input
                              value={currentData('seaFreightIncoterm') as string || ''}
                              onChange={(e) => updateTempData('seaFreightIncoterm', e.target.value)}
                              className="h-8 text-xs border-[#7BC9A6]"
                              placeholder="INCOTERM (เช่น FOB, CIF)"
                            />
                          </div>
                        ) : (
                          <>
                            {formData.seaFreightDetails && (
                              <p className="text-gray-900 mb-2 whitespace-pre-wrap">{formData.seaFreightDetails}</p>
                            )}
                            {formData.seaFreightIncoterm && (
                              <div className="bg-purple-50 px-2 py-1 rounded">
                                <span className="font-semibold text-purple-700">INCOTERM:</span>
                                <span className="text-purple-900 ml-1">{formData.seaFreightIncoterm}</span>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Custom Fields Section */}
              {formData.customItems && formData.customItems.length > 0 && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <h4 className="font-bold text-gray-900 mb-2 text-xs uppercase">4. ADDITIONAL INFORMATION / ข้อมูลเพิ่มเติม</h4>
                  <div className="space-y-2">
                    {formData.customItems.map((field, index) => (
                      field.label && field.value && (
                        <div key={index} className="bg-white p-2 rounded border border-gray-200">
                          <span className="font-semibold text-gray-700 text-xs block mb-0.5">{field.label}:</span>
                          <p className="text-xs text-gray-900">{field.value}</p>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Scope of Work Section - Only for non-customs-license templates */}
          {templateType !== 'customs-license' && (
            <div>
              <h2 className="text-sm font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">
                SCOPE OF WORK / ขอบเขตการดำเนินงาน
              </h2>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
              {/* (1) Warehouse Service */}
              {(formData.selectedServices?.includes("warehouse") || formData.warehouseSite || formData.storageDetails || formData.handlingDetails || isEditing) && (
                <div className="text-sm text-gray-700 border-t border-gray-300 pt-3">
                  <p className="font-semibold text-gray-900 mb-2">(1) Warehouse Service</p>
                  <div className="space-y-2 pl-4">
                    <div className="flex items-start gap-2">
                      <span className="font-medium whitespace-nowrap">1. Warehouse location / สถานที่คลัง:</span>
                      {isEditing ? (
                        <Input
                          value={currentData('warehouseSite') as string || ''}
                          onChange={(e) => updateTempData('warehouseSite', e.target.value)}
                          className="flex-1 h-8 text-sm border-[#7BC9A6] focus:ring-2 focus:ring-[#7BC9A6]/20"
                          placeholder="เช่น คลังสินค้า กทม."
                        />
                      ) : (
                        <span className="text-gray-800">{formData.warehouseSite || "-"}</span>
                      )}
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium whitespace-nowrap">2. Storage / การจัดเก็บสินค้า:</span>
                      {isEditing ? (
                        <Input
                          value={currentData('storageDetails') as string || ''}
                          onChange={(e) => updateTempData('storageDetails', e.target.value)}
                          className="flex-1 h-8 text-sm border-[#7BC9A6] focus:ring-2 focus:ring-[#7BC9A6]/20"
                          placeholder="เช่น Ambient Storage"
                        />
                      ) : (
                        <span className="text-gray-800">{formData.storageDetails || "-"}</span>
                      )}
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium whitespace-nowrap">3. Handling / การเคลื่อนย้ายสินค้า:</span>
                      {isEditing ? (
                        <Input
                          value={currentData('handlingDetails') as string || ''}
                          onChange={(e) => updateTempData('handlingDetails', e.target.value)}
                          className="flex-1 h-8 text-sm border-[#7BC9A6] focus:ring-2 focus:ring-[#7BC9A6]/20"
                          placeholder="เช่น Forklift handling"
                        />
                      ) : (
                        <span className="text-gray-800">{formData.handlingDetails || "-"}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* (2) Transport Service */}
              {(formData.selectedServices?.includes("transport") || formData.transportationType || formData.routeOrigin || formData.routeDestination || isEditing) && (
                <div className="text-sm text-gray-700 border-t border-gray-300 pt-3">
                  <p className="font-semibold text-gray-900 mb-2">(2) Transport Service</p>
                  <div className="space-y-2 pl-4">
                    <div className="flex items-start gap-2">
                      <span className="font-medium whitespace-nowrap">5. Transportation Type / ประเภทการขนส่งสินค้า:</span>
                      {isEditing ? (
                        <Input
                          value={currentData('transportationType') as string || ''}
                          onChange={(e) => updateTempData('transportationType', e.target.value)}
                          className="flex-1 h-8 text-sm border-[#7BC9A6] focus:ring-2 focus:ring-[#7BC9A6]/20"
                          placeholder="เช่น รถ 6 ล้อ"
                        />
                      ) : (
                        <span className="text-gray-800">{formData.transportationType || "-"}</span>
                      )}
                    </div>
                    <p className="pl-4 font-medium">Route / เส้นทาง</p>
                    <div className="pl-8 space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="font-medium whitespace-nowrap">1) Origin / ต้นทาง:</span>
                        {isEditing ? (
                          <Input
                            value={currentData('routeOrigin') as string || ''}
                            onChange={(e) => updateTempData('routeOrigin', e.target.value)}
                            className="flex-1 h-8 text-sm border-[#7BC9A6] focus:ring-2 focus:ring-[#7BC9A6]/20"
                            placeholder="เช่น กรุงเทพฯ"
                          />
                        ) : (
                          <span className="text-gray-800">{formData.routeOrigin || "-"}</span>
                        )}
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-medium whitespace-nowrap">2) Destination / ปลายทาง:</span>
                        {isEditing ? (
                          <Input
                            value={currentData('routeDestination') as string || ''}
                            onChange={(e) => updateTempData('routeDestination', e.target.value)}
                            className="flex-1 h-8 text-sm border-[#7BC9A6] focus:ring-2 focus:ring-[#7BC9A6]/20"
                            placeholder="เช่น ชลบุรี"
                          />
                        ) : (
                          <span className="text-gray-800">{formData.routeDestination || "-"}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* (3) Freight Service - Air & Sea */}
              {(formData.selectedServices?.includes("freight-air") || formData.selectedServices?.includes("freight-sea") || formData.airFreightDetails || formData.seaFreightDetails || isEditing) && (
                <div className="text-sm text-gray-700 border-t border-gray-300 pt-3">
                  <p className="font-semibold text-gray-900 mb-2">(3) Freight Service</p>
                  <div className="space-y-2 pl-4">
                    {(formData.selectedServices?.includes("freight-air") || formData.airFreightDetails || isEditing) && (
                      <>
                        <div className="flex items-start gap-2">
                          <span className="font-medium whitespace-nowrap">6. Air Freight / บริการขนส่งทางอากาศ:</span>
                          {isEditing ? (
                            <Input
                              value={currentData('airFreightDetails') as string || ''}
                              onChange={(e) => updateTempData('airFreightDetails', e.target.value)}
                              className="flex-1 h-8 text-sm border-[#7BC9A6] focus:ring-2 focus:ring-[#7BC9A6]/20"
                              placeholder="รายละเอียดการขนส่งทางอากาศ"
                            />
                          ) : (
                            <span className="text-gray-800">{formData.airFreightDetails || "-"}</span>
                          )}
                        </div>
                        <div className="pl-4 flex items-start gap-2">
                          <span className="font-medium whitespace-nowrap">INCOTERM:</span>
                          {isEditing ? (
                            <Input
                              value={currentData('airFreightIncoterm') as string || ''}
                              onChange={(e) => updateTempData('airFreightIncoterm', e.target.value)}
                              className="flex-1 h-8 text-sm border-[#7BC9A6] focus:ring-2 focus:ring-[#7BC9A6]/20"
                              placeholder="เช่น FOB, CIF"
                            />
                          ) : (
                            <span className="text-gray-800">{formData.airFreightIncoterm || "-"}</span>
                          )}
                        </div>
                      </>
                    )}
                    {(formData.selectedServices?.includes("freight-sea") || formData.seaFreightDetails || isEditing) && (
                      <>
                        <div className="flex items-start gap-2">
                          <span className="font-medium whitespace-nowrap">7. Sea Freight / บริการขนส่งทางทะเล:</span>
                          {isEditing ? (
                            <Input
                              value={currentData('seaFreightDetails') as string || ''}
                              onChange={(e) => updateTempData('seaFreightDetails', e.target.value)}
                              className="flex-1 h-8 text-sm border-[#7BC9A6] focus:ring-2 focus:ring-[#7BC9A6]/20"
                              placeholder="รายละเอียดการขนส่งทางทะเล"
                            />
                          ) : (
                            <span className="text-gray-800">{formData.seaFreightDetails || "-"}</span>
                          )}
                        </div>
                        <div className="pl-4 flex items-start gap-2">
                          <span className="font-medium whitespace-nowrap">INCOTERM:</span>
                          {isEditing ? (
                            <Input
                              value={currentData('seaFreightIncoterm') as string || ''}
                              onChange={(e) => updateTempData('seaFreightIncoterm', e.target.value)}
                              className="flex-1 h-8 text-sm border-[#7BC9A6] focus:ring-2 focus:ring-[#7BC9A6]/20"
                              placeholder="เช่น FOB, CIF"
                            />
                          ) : (
                            <span className="text-gray-800">{formData.seaFreightIncoterm || "-"}</span>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* (4) Cross-Border Service */}
              {(formData.selectedServices?.includes("cross-border") || formData.crossBorderDetails || isEditing) && (
                <div className="text-sm text-gray-700 border-t border-gray-300 pt-3">
                  <p className="font-semibold text-gray-900 mb-2">(4) Cross-Border Service</p>
                  <div className="space-y-2 pl-4">
                    <div className="flex items-start gap-2">
                      <span className="font-medium whitespace-nowrap">8. Cross-Border / บริการข้ามพรมแดน:</span>
                      {isEditing ? (
                        <Input
                          value={currentData('crossBorderDetails') as string || ''}
                          onChange={(e) => updateTempData('crossBorderDetails', e.target.value)}
                          className="flex-1 h-8 text-sm border-[#7BC9A6] focus:ring-2 focus:ring-[#7BC9A6]/20"
                          placeholder="รายละเอียดการขนส่งข้ามพรมแดน"
                        />
                      ) : (
                        <span className="text-gray-800">{formData.crossBorderDetails || "-"}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Customs & License Details (for Customs & License template) */}
              {templateType === 'customs-license' && (
                <div className="text-sm text-gray-700 border-t border-gray-300 pt-3">
                  <p className="font-semibold text-gray-900 mb-2">Customs & License Details</p>
                  <div className="space-y-2 pl-4">
                    <div className="flex items-start gap-2">
                      <span className="font-medium whitespace-nowrap">Customs Port:</span>
                      {isEditing ? (
                        <Input
                          value={currentData('customsPort') as string || ''}
                          onChange={(e) => updateTempData('customsPort', e.target.value)}
                          className="flex-1 h-8 text-sm border-[#7BC9A6] focus:ring-2 focus:ring-[#7BC9A6]/20"
                          placeholder="เช่น ท่าเรือกรุงเทพ"
                        />
                      ) : (
                        <span className="text-gray-800">{formData.customsPort || "-"}</span>
                      )}
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium whitespace-nowrap">License Type:</span>
                      {isEditing ? (
                        <Input
                          value={currentData('licenseType') as string || ''}
                          onChange={(e) => updateTempData('licenseType', e.target.value)}
                          className="flex-1 h-8 text-sm border-[#7BC9A6] focus:ring-2 focus:ring-[#7BC9A6]/20"
                          placeholder="เช่น FDA, อย."
                        />
                      ) : (
                        <span className="text-gray-800">{formData.licenseType || "-"}</span>
                      )}
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium whitespace-nowrap">HS Code:</span>
                      {isEditing ? (
                        <Input
                          value={currentData('hsCode') as string || ''}
                          onChange={(e) => updateTempData('hsCode', e.target.value)}
                          className="flex-1 h-8 text-sm border-[#7BC9A6] focus:ring-2 focus:ring-[#7BC9A6]/20"
                          placeholder="เช่น 8517.62.00"
                        />
                      ) : (
                        <span className="text-gray-800">{formData.hsCode || "-"}</span>
                      )}
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium whitespace-nowrap">Import/Export Type:</span>
                      {isEditing ? (
                        <Input
                          value={currentData('importExportType') as string || ''}
                          onChange={(e) => updateTempData('importExportType', e.target.value)}
                          className="flex-1 h-8 text-sm border-[#7BC9A6] focus:ring-2 focus:ring-[#7BC9A6]/20"
                          placeholder="import / export / both"
                        />
                      ) : (
                        <span className="text-gray-800">{formData.importExportType || "-"}</span>
                      )}
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium whitespace-nowrap">Country of Origin:</span>
                      {isEditing ? (
                        <Input
                          value={currentData('countryOfOrigin') as string || ''}
                          onChange={(e) => updateTempData('countryOfOrigin', e.target.value)}
                          className="flex-1 h-8 text-sm border-[#7BC9A6] focus:ring-2 focus:ring-[#7BC9A6]/20"
                          placeholder="เช่น ไทย, จีน"
                        />
                      ) : (
                        <span className="text-gray-800">{formData.countryOfOrigin || "-"}</span>
                      )}
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium whitespace-nowrap">Goods Value:</span>
                      {isEditing ? (
                        <Input
                          value={currentData('goodsValue') as string || ''}
                          onChange={(e) => updateTempData('goodsValue', e.target.value)}
                          className="flex-1 h-8 text-sm border-[#7BC9A6] focus:ring-2 focus:ring-[#7BC9A6]/20"
                          placeholder="เช่น 100,000 บาท"
                        />
                      ) : (
                        <span className="text-gray-800">{formData.goodsValue || "-"}</span>
                      )}
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium whitespace-nowrap">Product Category:</span>
                      {isEditing ? (
                        <Input
                          value={currentData('productCategory') as string || ''}
                          onChange={(e) => updateTempData('productCategory', e.target.value)}
                          className="flex-1 h-8 text-sm border-[#7BC9A6] focus:ring-2 focus:ring-[#7BC9A6]/20"
                          placeholder="เช่น เครื่องจักร, อุปกรณ์"
                        />
                      ) : (
                        <span className="text-gray-800">{formData.productCategory || "-"}</span>
                      )}
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium whitespace-nowrap">Processing Timeline:</span>
                      {isEditing ? (
                        <Input
                          value={currentData('processingTimeline') as string || ''}
                          onChange={(e) => updateTempData('processingTimeline', e.target.value)}
                          className="flex-1 h-8 text-sm border-[#7BC9A6] focus:ring-2 focus:ring-[#7BC9A6]/20"
                          placeholder="ระยะเวลาดำเนินการ"
                        />
                      ) : (
                        <span className="text-gray-800">{formData.processingTimeline || "-"}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Custom Items */}
              {formData.customItems && formData.customItems.length > 0 && (
                <div className="text-sm text-gray-700 border-t border-gray-300 pt-3">
                  <p className="font-semibold text-gray-900 mb-2">Additional Items</p>
                  <div className="space-y-1.5 pl-4">
                    {formData.customItems.map((item, index) => (
                      <p key={index}>
                        <span className="font-medium">{item.label}:</span>{" "}
                        <span className="text-gray-800">{item.value}</span>
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          )}

          {/* Rate Section */}
          <div>
            <h2 className="text-sm font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">
              RATE / อัตราค่าบริการ
            </h2>

            {/* Warehousing Services */}
            {(formData.rateTypes?.includes("warehousing") || formData.warehousingRateData || formData.warehousingRemarks) && (
              <div className="mb-6">
                <h3 className="text-xs font-bold text-gray-800 mb-2">
                  Warehousing Services
                </h3>
                
                {/* Rate Table */}
                {formData.warehousingRateData && (() => {
                  try {
                    const tableData = JSON.parse(formData.warehousingRateData);
                    return (
                      <div className="border border-gray-300 rounded-lg overflow-hidden mb-3">
                        <table className="w-full text-xs">
                          <thead className="bg-[#7BC9A6] text-white">
                            <tr>
                              {tableData.columns.map((col: any) => (
                                <th key={col.id} className="px-3 py-2 text-left font-semibold">
                                  <span className="whitespace-pre-line">{col.label}</span>
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {tableData.rows.map((row: any) => (
                              <tr key={row.id}>
                                {tableData.columns.map((col: any) => (
                                  <td key={col.id} className="px-3 py-2 text-gray-700">
                                    {isEditing ? (
                                      <Input
                                        value={row.cells[col.id] || ""}
                                        onChange={(e) => updateTableCell('warehousingRateData', row.id, col.id, e.target.value)}
                                        className="h-8 text-sm border-[#7BC9A6] focus:ring-2 focus:ring-[#7BC9A6]/20"
                                      />
                                    ) : (
                                      row.cells[col.id] || "-"
                                    )}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  } catch {
                    return null;
                  }
                })()}

                {/* Remarks */}
                {(formData.warehousingRemarks || isEditing) && (
                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Remarks/หมายเหตุ:</p>
                    {isEditing ? (
                      <Textarea
                        value={currentData('warehousingRemarks') as string || ''}
                        onChange={(e) => updateTempData('warehousingRemarks', e.target.value)}
                        className="text-xs border-[#7BC9A6] focus:ring-2 focus:ring-[#7BC9A6]/20 min-h-[80px]"
                        placeholder="1. หมายเหตุข้อที่ 1&#10;2. หมายเหตุข้อที่ 2"
                      />
                    ) : (
                      <div className="text-xs text-gray-700 space-y-1">
                        {formData.warehousingRemarks?.split('\n').map((line, idx) => (
                          <p key={idx}>{line || '\u00A0'}</p>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Transport Service */}
            {(formData.rateTypes?.includes("transport") || formData.transportRateData || formData.transportRemarks) && (
              <div className="mb-6">
                <h3 className="text-xs font-bold text-gray-800 mb-2">
                  Transport Service/ระบบการขนส่งสินค้า
                </h3>
                
                {/* Rate Table */}
                {formData.transportRateData && (() => {
                  try {
                    const tableData = JSON.parse(formData.transportRateData);
                    return (
                      <div className="border border-gray-300 rounded-lg overflow-hidden mb-3">
                        <table className="w-full text-xs">
                          <thead className="bg-[#7BC9A6] text-white">
                            <tr>
                              {tableData.columns.map((col: any) => (
                                <th key={col.id} className="px-3 py-2 text-left font-semibold">
                                  <span className="whitespace-pre-line">{col.label}</span>
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {tableData.rows.map((row: any) => (
                              <tr key={row.id}>
                                {tableData.columns.map((col: any) => (
                                  <td key={col.id} className="px-3 py-2 text-gray-700">
                                    {isEditing ? (
                                      <Input
                                        value={row.cells[col.id] || ""}
                                        onChange={(e) => updateTableCell('transportRateData', row.id, col.id, e.target.value)}
                                        className="h-8 text-sm border-[#7BC9A6] focus:ring-2 focus:ring-[#7BC9A6]/20"
                                      />
                                    ) : (
                                      row.cells[col.id] || "-"
                                    )}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  } catch {
                    return null;
                  }
                })()}

                {/* Remarks */}
                {(formData.transportRemarks || isEditing) && (
                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Remarks/หมายเหตุ:</p>
                    {isEditing ? (
                      <Textarea
                        value={currentData('transportRemarks') as string || ''}
                        onChange={(e) => updateTempData('transportRemarks', e.target.value)}
                        className="text-xs border-[#7BC9A6] focus:ring-2 focus:ring-[#7BC9A6]/20 min-h-[80px]"
                        placeholder="1. หมายเหตุข้อที่ 1&#10;2. หมายเหตุข้อที่ 2"
                      />
                    ) : (
                      <div className="text-xs text-gray-700 space-y-1">
                        {formData.transportRemarks?.split('\n').map((line, idx) => (
                          <p key={idx}>{line || '\u00A0'}</p>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Cross-Border SCOPE OF WORK */}
            {templateType === 'cross-border' && formData.crossBorderServices && formData.crossBorderServices.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs font-bold text-gray-800 mb-2">
                  SCOPE OF WORK / ขอบเขตการดำเนินงาน
                </h3>
                <div className="space-y-2">
                  {formData.crossBorderServices.includes("warehouse-location") && (
                    <div className="text-sm text-gray-700">
                      <span className="text-[#7BC9A6] font-semibold">✓</span> <span className="font-medium">Warehouse location / สถานที่คลัง:</span> {formData.crossBorderWarehouseSite || "-"}
                    </div>
                  )}
                  {formData.crossBorderServices.includes("storage") && (
                    <div className="text-sm text-gray-700">
                      <span className="text-[#7BC9A6] font-semibold">✓</span> <span className="font-medium">Storage / การจัดเก็บสินค้า:</span> {formData.crossBorderStorageDetails || "-"}
                    </div>
                  )}
                  {formData.crossBorderServices.includes("handling") && (
                    <div className="text-sm text-gray-700">
                      <span className="text-[#7BC9A6] font-semibold">✓</span> <span className="font-medium">Handling / การเคลื่อนย้ายสินค้า:</span> {formData.crossBorderHandlingDetails || "-"}
                    </div>
                  )}
                  {formData.crossBorderServices.includes("other-activity") && (
                    <div className="text-sm text-gray-700">
                      <span className="text-[#7BC9A6] font-semibold">✓</span> <span className="font-medium">Other Activity / กิจกรรมอื่น:</span> {formData.crossBorderOtherActivity || "จัดรวม Customs"}
                    </div>
                  )}
                  {formData.crossBorderServices.includes("transportation") && (
                    <div className="text-sm text-gray-700">
                      <div><span className="text-[#7BC9A6] font-semibold">✓</span> <span className="font-medium">Transportation Type / ประเภทการขนส่งสินค้า:</span> {formData.crossBorderTransportationType || "-"}</div>
                      {(formData.crossBorderRouteOrigin || formData.crossBorderRouteDestination) && (
                        <div className="ml-4 text-xs text-gray-600">Route: {formData.crossBorderRouteOrigin || "-"} → {formData.crossBorderRouteDestination || "-"}</div>
                      )}
                    </div>
                  )}
                  {formData.crossBorderServices.includes("air-freight") && (
                    <div className="text-sm text-gray-700">
                      <div><span className="text-[#7BC9A6] font-semibold">✓</span> <span className="font-medium">Air Freight / บริการขนส่งทางอากาศ:</span> {formData.crossBorderAirFreightDetails || "-"}</div>
                      {formData.crossBorderAirFreightIncoterm && <div className="ml-4 text-xs text-gray-600">INCOTERM: {formData.crossBorderAirFreightIncoterm}</div>}
                    </div>
                  )}
                  {formData.crossBorderServices.includes("sea-freight") && (
                    <div className="text-sm text-gray-700">
                      <div><span className="text-[#7BC9A6] font-semibold">✓</span> <span className="font-medium">Sea Freight / บริการขนส่งทางทะเล:</span> {formData.crossBorderSeaFreightDetails || "-"}</div>
                      {formData.crossBorderSeaFreightIncoterm && <div className="ml-4 text-xs text-gray-600">INCOTERM: {formData.crossBorderSeaFreightIncoterm}</div>}
                    </div>
                  )}
                  {formData.crossBorderCustomServices && formData.crossBorderCustomServices.length > 0 && formData.crossBorderCustomServices.map((service: any, idx: number) => (
                    <div key={idx} className="text-sm text-gray-700">
                      <span className="text-[#7BC9A6] font-semibold">✓</span> <span className="font-medium">{service.name}:</span> {service.details || "-"}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cross-Border Transport Service */}
            {(formData.crossBorderRateData || templateType === 'cross-border') && (() => {
              try {
                const rateData = formData.crossBorderRateData ? JSON.parse(formData.crossBorderRateData) : null;
                if (!rateData || !rateData.rows || rateData.rows.length === 0) return null;
                
                return (
                  <div className="mb-6">
                    <h3 className="text-xs font-bold text-gray-800 mb-2">
                      Cross-Border Transport Service / บริการขนส่งข้ามพรมแดน
                    </h3>
                    
                    {/* Cross-Border Rate Table */}
                    <div className="border border-gray-300 rounded-lg overflow-hidden mb-3">
                      <table className="w-full text-xs">
                        <thead className="bg-gray-100 text-gray-600">
                          <tr>
                            <th className="px-3 py-2 text-left font-semibold border-r border-gray-300">
                              Route<br />เส้นทาง
                            </th>
                            <th className="px-3 py-2 text-left font-semibold border-r border-gray-300">
                              Vehicle Type<br />ประเภทรถ
                            </th>
                            <th className="px-3 py-2 text-center font-semibold border-r border-gray-300 w-20">
                              Qty<br />จำนวน
                            </th>
                            <th className="px-3 py-2 text-center font-semibold border-r border-gray-300 w-24">
                              Unit<br />หน่วย
                            </th>
                            <th className="px-3 py-2 text-right font-semibold border-r border-gray-300 w-28">
                              Price/Trip<br />ราคา/เที่ยว
                            </th>
                            <th className="px-3 py-2 text-right font-semibold border-r border-gray-300 w-28">
                              Fixed cost<br />ค่าใช้จ่ายคงที่
                            </th>
                            <th className="px-3 py-2 text-left font-semibold">
                              Remarks<br />หมายเหตุ
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {rateData.rows.map((row: any) => (
                            <tr key={row.id}>
                              <td className="px-3 py-2 text-gray-700 border-r border-gray-200">{row.route || "-"}</td>
                              <td className="px-3 py-2 text-gray-700 border-r border-gray-200">{row.vehicleType || "-"}</td>
                              <td className="px-3 py-2 text-center text-gray-700 border-r border-gray-200">{row.qty || "-"}</td>
                              <td className="px-3 py-2 text-center text-gray-700 border-r border-gray-200">{row.unit || "-"}</td>
                              <td className="px-3 py-2 text-right text-gray-700 border-r border-gray-200">{row.pricePerTrip || "-"}</td>
                              <td className="px-3 py-2 text-right text-gray-700 border-r border-gray-200">{row.fixedCost || "-"}</td>
                              <td className="px-3 py-2 text-gray-700">{row.remarks || "-"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Cross-Border Remarks */}
                    {(formData.crossBorderRemark || isEditing) && (
                      <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <p className="text-xs font-semibold text-gray-700 mb-2">Remarks/หมายเหตุ:</p>
                        {isEditing ? (
                          <Textarea
                            value={currentData('crossBorderRemark') as string || ''}
                            onChange={(e) => updateTempData('crossBorderRemark', e.target.value)}
                            className="text-xs border-[#7BC9A6] focus:ring-2 focus:ring-[#7BC9A6]/20 min-h-[80px]"
                            placeholder="1. หมายเหตุข้อที่ 1&#10;2. หมายเหตุข้อที่ 2"
                          />
                        ) : (
                          <div className="text-xs text-gray-700 space-y-1">
                            {formData.crossBorderRemark?.split('\n').map((line, idx) => (
                              <p key={idx}>{line || '\u00A0'}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              } catch (error) {
                console.error('Error rendering cross-border rate table:', error);
                return null;
              }
            })()}

            {/* International Freight SCOPE OF WORK */}
            {templateType === 'international-freight' && formData.internationalServices && formData.internationalServices.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs font-bold text-gray-800 mb-2">
                  SCOPE OF WORK / ขอบเขตการดำเนินงาน
                </h3>
                <div className="space-y-2">
                  {formData.internationalServices.includes("warehouse-location") && (
                    <div className="text-sm text-gray-700">
                      <span className="text-[#7BC9A6] font-semibold">✓</span> <span className="font-medium">Warehouse location / สถานที่คลัง:</span> {formData.internationalWarehouseSite || "-"}
                    </div>
                  )}
                  {formData.internationalServices.includes("storage") && (
                    <div className="text-sm text-gray-700">
                      <span className="text-[#7BC9A6] font-semibold">✓</span> <span className="font-medium">Storage / การจัดเก็บสินค้า:</span> {formData.internationalStorageDetails || "-"}
                    </div>
                  )}
                  {formData.internationalServices.includes("handling") && (
                    <div className="text-sm text-gray-700">
                      <span className="text-[#7BC9A6] font-semibold">✓</span> <span className="font-medium">Handling / การเคลื่อนย้ายสินค้า:</span> {formData.internationalHandlingDetails || "-"}
                    </div>
                  )}
                  {formData.internationalServices.includes("other-activity") && (
                    <div className="text-sm text-gray-700">
                      <span className="text-[#7BC9A6] font-semibold">✓</span> <span className="font-medium">Other Activity / กิจกรรมอื่น:</span> {formData.internationalOtherActivity || "จัดรวม Customs"}
                    </div>
                  )}
                  {formData.internationalServices.includes("transportation") && (
                    <div className="text-sm text-gray-700">
                      <div><span className="text-[#7BC9A6] font-semibold">✓</span> <span className="font-medium">Transportation Type / ประเภทการขนส่งสินค้า:</span> {formData.internationalTransportationType || "-"}</div>
                      {(formData.internationalRouteOrigin || formData.internationalRouteDestination) && (
                        <div className="ml-4 text-xs text-gray-600">Route: {formData.internationalRouteOrigin || "-"} → {formData.internationalRouteDestination || "-"}</div>
                      )}
                    </div>
                  )}
                  {formData.internationalServices.includes("air-freight") && (
                    <div className="text-sm text-gray-700">
                      <div><span className="text-[#7BC9A6] font-semibold">✓</span> <span className="font-medium">Air Freight / บริการขนส่งทางอากาศ:</span> {formData.internationalAirFreightDetails || "-"}</div>
                      {formData.internationalAirFreightIncoterm && <div className="ml-4 text-xs text-gray-600">INCOTERM: {formData.internationalAirFreightIncoterm}</div>}
                    </div>
                  )}
                  {formData.internationalServices.includes("sea-freight") && (
                    <div className="text-sm text-gray-700">
                      <div><span className="text-[#7BC9A6] font-semibold">✓</span> <span className="font-medium">Sea Freight / บริการขนส่งทางทะเล:</span> {formData.internationalSeaFreightDetails || "-"}</div>
                      {formData.internationalSeaFreightIncoterm && <div className="ml-4 text-xs text-gray-600">INCOTERM: {formData.internationalSeaFreightIncoterm}</div>}
                    </div>
                  )}
                  {formData.internationalCustomServices && formData.internationalCustomServices.length > 0 && formData.internationalCustomServices.map((service: any, idx: number) => (
                    <div key={idx} className="text-sm text-gray-700">
                      <span className="text-[#7BC9A6] font-semibold">✓</span> <span className="font-medium">{service.name}:</span> {service.details || "-"}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* International Freight Services */}
            {templateType === 'international-freight' && (
              <>
                {/* Air Freight Export */}
                {formData.airFreightExportRateData && (() => {
                  try {
                    const airExportData = JSON.parse(formData.airFreightExportRateData);
                    if (!airExportData || !airExportData.rows || airExportData.rows.length === 0) return null;
                    
                    return (
                      <div className="mb-6">
                        <h3 className="text-xs font-bold text-gray-800 mb-2">
                          3.1.1.1 AIR FREIGHT RATE (EXPORT)
                        </h3>
                        
                        <div className="border border-gray-300 rounded-lg overflow-hidden mb-3">
                          <table className="w-full text-xs">
                            <thead className="bg-[#7BC9A6] text-white">
                              <tr>
                                <th className="px-2 py-2 text-center font-semibold border-r border-white/20">NO.</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">AIRLINE/CARRIER</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">PRODUCT</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">Service</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">WEIGHT [kg]</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">POL</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">POD</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">ROUTING</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">TRANSIT</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">TRANSIT TIME</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">PRICE</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">UNIT</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20 bg-pink-400">Import/Export Country</th>
                                <th className="px-2 py-2 text-left font-semibold">REMARKS</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {airExportData.rows.map((row: any) => (
                                <tr key={row.id}>
                                  <td className="px-2 py-2 text-center border-r border-gray-200">{row.no}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.airline || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.product || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.service || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.weight || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.pol || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.pod || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.routing || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.transit || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.transitTime || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.price || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.unit || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200 bg-pink-50">{row.importExportCountry || "-"}</td>
                                  <td className="px-2 py-2">{row.remarks || "-"}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  } catch (error) {
                    console.error('Error rendering air freight export rate table:', error);
                    return null;
                  }
                })()}

                {/* Air Freight Import */}
                {formData.airFreightImportRateData && (() => {
                  try {
                    const airImportData = JSON.parse(formData.airFreightImportRateData);
                    if (!airImportData || !airImportData.rows || airImportData.rows.length === 0) return null;
                    
                    return (
                      <div className="mb-6">
                        <h3 className="text-xs font-bold text-gray-800 mb-2">
                          3.1.2 AIR FREIGHT RATE (IMPORT)
                        </h3>
                        
                        <div className="border border-gray-300 rounded-lg overflow-hidden mb-3">
                          <table className="w-full text-xs">
                            <thead className="bg-[#7BC9A6] text-white">
                              <tr>
                                <th className="px-2 py-2 text-center font-semibold border-r border-white/20">NO.</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">AIRLINE/CARRIER</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">PRODUCT</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">Service</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">WEIGHT [kg]</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">POL</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">POD</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">ROUTING</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">TRANSIT</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">TRANSIT TIME</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">PRICE</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">UNIT</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20 bg-pink-400">Import/Export Country</th>
                                <th className="px-2 py-2 text-left font-semibold">REMARKS</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {airImportData.rows.map((row: any) => (
                                <tr key={row.id}>
                                  <td className="px-2 py-2 text-center border-r border-gray-200">{row.no}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.airline || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.product || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.service || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.weight || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.pol || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.pod || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.routing || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.transit || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.transitTime || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.price || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.unit || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200 bg-pink-50">{row.importExportCountry || "-"}</td>
                                  <td className="px-2 py-2">{row.remarks || "-"}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  } catch (error) {
                    console.error('Error rendering air freight import rate table:', error);
                    return null;
                  }
                })()}

                {/* Sea Freight Export */}
                {formData.seaFreightExportRateData && (() => {
                  try {
                    const seaExportData = JSON.parse(formData.seaFreightExportRateData);
                    if (!seaExportData || !seaExportData.rows || seaExportData.rows.length === 0) return null;
                    
                    return (
                      <div className="mb-6">
                        <h3 className="text-xs font-bold text-gray-800 mb-2">
                          3.2.1 SEA FREIGHT RATE (EXPORT)
                        </h3>
                        
                        <div className="border border-gray-300 rounded-lg overflow-hidden mb-3">
                          <table className="w-full text-xs">
                            <thead className="bg-[#7BC9A6] text-white">
                              <tr>
                                <th className="px-2 py-2 text-center font-semibold border-r border-white/20">NO.</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">AIRLINE/CARRIER</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">PRODUCT</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">Service</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">WEIGHT [kg]</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">POL</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">POD</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">ROUTING</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">TRANSIT</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">TRANSIT TIME</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">PRICE</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">UNIT</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20 bg-pink-400">Import/Export Country</th>
                                <th className="px-2 py-2 text-left font-semibold">REMARKS</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {seaExportData.rows.map((row: any) => (
                                <tr key={row.id}>
                                  <td className="px-2 py-2 text-center border-r border-gray-200">{row.no}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.airline || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.product || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.service || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.weight || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.pol || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.pod || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.routing || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.transit || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.transitTime || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.price || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.unit || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200 bg-pink-50">{row.importExportCountry || "-"}</td>
                                  <td className="px-2 py-2">{row.remarks || "-"}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  } catch (error) {
                    console.error('Error rendering sea freight export rate table:', error);
                    return null;
                  }
                })()}

                {/* Sea Freight Import */}
                {formData.seaFreightImportRateData && (() => {
                  try {
                    const seaImportData = JSON.parse(formData.seaFreightImportRateData);
                    if (!seaImportData || !seaImportData.rows || seaImportData.rows.length === 0) return null;
                    
                    return (
                      <div className="mb-6">
                        <h3 className="text-xs font-bold text-gray-800 mb-2">
                          3.2.2 SEA FREIGHT RATE (IMPORT)
                        </h3>
                        
                        <div className="border border-gray-300 rounded-lg overflow-hidden mb-3">
                          <table className="w-full text-xs">
                            <thead className="bg-[#7BC9A6] text-white">
                              <tr>
                                <th className="px-2 py-2 text-center font-semibold border-r border-white/20">NO.</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">AIRLINE/CARRIER</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">PRODUCT</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">Service</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">WEIGHT [kg]</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">POL</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">POD</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">ROUTING</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">TRANSIT</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">TRANSIT TIME</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">PRICE</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20">UNIT</th>
                                <th className="px-2 py-2 text-left font-semibold border-r border-white/20 bg-pink-400">Import/Export Country</th>
                                <th className="px-2 py-2 text-left font-semibold">REMARKS</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {seaImportData.rows.map((row: any) => (
                                <tr key={row.id}>
                                  <td className="px-2 py-2 text-center border-r border-gray-200">{row.no}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.airline || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.product || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.service || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.weight || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.pol || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.pod || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.routing || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.transit || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.transitTime || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.price || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200">{row.unit || "-"}</td>
                                  <td className="px-2 py-2 border-r border-gray-200 bg-pink-50">{row.importExportCountry || "-"}</td>
                                  <td className="px-2 py-2">{row.remarks || "-"}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  } catch (error) {
                    console.error('Error rendering sea freight import rate table:', error);
                    return null;
                  }
                })()}

                {/* Rate Remarks */}
                {(formData.freightRateRemarks || isEditing) && (
                  <div className="bg-white border border-gray-200 rounded-lg p-3 mb-6">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Remarks/หมายเหตุ:</p>
                    {isEditing ? (
                      <Textarea
                        value={currentData('freightRateRemarks') as string || ''}
                        onChange={(e) => updateTempData('freightRateRemarks', e.target.value)}
                        className="text-xs border-[#7BC9A6] focus:ring-2 focus:ring-[#7BC9A6]/20 min-h-[80px]"
                        placeholder="1. หมายเหตุข้อที่ 1&#10;2. หมายเหตุข้อที่ 2"
                      />
                    ) : (
                      <div className="text-xs text-gray-700 space-y-1">
                        {formData.freightRateRemarks?.split('\n').map((line, idx) => (
                          <p key={idx}>{line || '\u00A0'}</p>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Customs & License Services (for Customs & License template) */}
            {templateType === 'customs-license' && (
              <div className="mb-6">
                <h3 className="text-xs font-bold text-gray-800 mb-2">
                  Customs & License Services
                </h3>
                
                {/* Customs Rate Table */}
                {formData.customsRateTable && (() => {
                  try {
                    const rows = JSON.parse(formData.customsRateTable);
                    if (!Array.isArray(rows) || rows.length === 0) return null;
                    return (
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold text-gray-700 mb-2">Customs Rate</h4>
                        <div className="border border-gray-300 rounded-lg overflow-hidden mb-3">
                          <table className="w-full text-xs">
                            <thead className="bg-[#7BC9A6] text-white">
                              <tr>
                                <th className="px-3 py-2 text-left font-semibold w-12">No.</th>
                                <th className="px-3 py-2 text-left font-semibold">Service</th>
                                <th className="px-3 py-2 text-left font-semibold w-24">Price</th>
                                <th className="px-3 py-2 text-left font-semibold w-24">Unit</th>
                                <th className="px-3 py-2 text-left font-semibold">Remarks</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {rows.map((row: any, idx: number) => (
                                <tr key={idx}>
                                  <td className="px-3 py-2 text-center text-gray-700">{idx + 1}</td>
                                  <td className="px-3 py-2 text-gray-700">{row.service || "-"}</td>
                                  <td className="px-3 py-2 text-gray-700">{row.price || "-"}</td>
                                  <td className="px-3 py-2 text-gray-700">{row.unit || "-"}</td>
                                  <td className="px-3 py-2 text-gray-700">{row.remarks || "-"}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  } catch {
                    return null;
                  }
                })()}

                {/* License Rate Table */}
                {formData.licenseRateTable && (() => {
                  try {
                    const rows = JSON.parse(formData.licenseRateTable);
                    if (!Array.isArray(rows) || rows.length === 0) return null;
                    return (
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold text-gray-700 mb-2">License Rate</h4>
                        <div className="border border-gray-300 rounded-lg overflow-hidden mb-3">
                          <table className="w-full text-xs">
                            <thead className="bg-[#7BC9A6] text-white">
                              <tr>
                                <th className="px-3 py-2 text-left font-semibold w-12">No.</th>
                                <th className="px-3 py-2 text-left font-semibold">Service</th>
                                <th className="px-3 py-2 text-left font-semibold w-24">Price</th>
                                <th className="px-3 py-2 text-left font-semibold w-24">Unit</th>
                                <th className="px-3 py-2 text-left font-semibold">Remarks</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {rows.map((row: any, idx: number) => (
                                <tr key={idx}>
                                  <td className="px-3 py-2 text-center text-gray-700">{idx + 1}</td>
                                  <td className="px-3 py-2 text-gray-700">{row.service || "-"}</td>
                                  <td className="px-3 py-2 text-gray-700">{row.price || "-"}</td>
                                  <td className="px-3 py-2 text-gray-700">{row.unit || "-"}</td>
                                  <td className="px-3 py-2 text-gray-700">{row.remarks || "-"}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  } catch {
                    return null;
                  }
                })()}

                {/* Customs Rate and License Rate Table (Optional) */}
                {formData.customsLicenseRateTable && (() => {
                  try {
                    const rows = JSON.parse(formData.customsLicenseRateTable);
                    if (!Array.isArray(rows) || rows.length === 0) return null;
                    return (
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold text-gray-700 mb-2">Customs Rate and License Rate</h4>
                        <div className="border border-gray-300 rounded-lg overflow-hidden mb-3">
                          <table className="w-full text-xs">
                            <thead className="bg-[#7BC9A6] text-white">
                              <tr>
                                <th className="px-3 py-2 text-left font-semibold w-12">No.</th>
                                <th className="px-3 py-2 text-left font-semibold">Service</th>
                                <th className="px-3 py-2 text-left font-semibold w-24">Price</th>
                                <th className="px-3 py-2 text-left font-semibold w-24">Unit</th>
                                <th className="px-3 py-2 text-left font-semibold">Remarks</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {rows.map((row: any, idx: number) => (
                                <tr key={idx}>
                                  <td className="px-3 py-2 text-center text-gray-700">{idx + 1}</td>
                                  <td className="px-3 py-2 text-gray-700">{row.service || "-"}</td>
                                  <td className="px-3 py-2 text-gray-700">{row.price || "-"}</td>
                                  <td className="px-3 py-2 text-gray-700">{row.unit || "-"}</td>
                                  <td className="px-3 py-2 text-gray-700">{row.remarks || "-"}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  } catch {
                    return null;
                  }
                })()}

                {/* New DynamicRateTable - License Rate */}
                {formData.licenseRateData && (() => {
                  try {
                    const data = JSON.parse(formData.licenseRateData);
                    if (!data.rows || data.rows.length === 0) return null;
                    return (
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold text-gray-700 mb-2">LICENSE RATE</h4>
                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                          <table className="w-full text-xs">
                            <thead className="bg-[#7BC9A6] text-white">
                              <tr>
                                {data.columns.map((col: any, idx: number) => (
                                  <th key={idx} className="px-3 py-2 text-left font-semibold">{col}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {data.rows.map((row: any[], rowIdx: number) => (
                                <tr key={rowIdx}>
                                  {row.map((cell, cellIdx) => (
                                    <td key={cellIdx} className="px-3 py-2 text-gray-700">{cell || "-"}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  } catch {
                    return null;
                  }
                })()}

                {/* New DynamicRateTable - Customs Rate */}
                {formData.customsRateData && (() => {
                  try {
                    const data = JSON.parse(formData.customsRateData);
                    if (!data.rows || data.rows.length === 0) return null;
                    return (
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold text-gray-700 mb-2">CUSTOMS RATE</h4>
                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                          <table className="w-full text-xs">
                            <thead className="bg-[#7BC9A6] text-white">
                              <tr>
                                {data.columns.map((col: any, idx: number) => (
                                  <th key={idx} className="px-3 py-2 text-left font-semibold">{col}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {data.rows.map((row: any[], rowIdx: number) => (
                                <tr key={rowIdx}>
                                  {row.map((cell, cellIdx) => (
                                    <td key={cellIdx} className="px-3 py-2 text-gray-700">{cell || "-"}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  } catch {
                    return null;
                  }
                })()}

                {/* New DynamicRateTable - Customs and License Combined */}
                {formData.customsLicenseRateData && (() => {
                  try {
                    const data = JSON.parse(formData.customsLicenseRateData);
                    if (!data.rows || data.rows.length === 0) return null;
                    return (
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold text-gray-700 mb-2">CUSTOMS RATE AND LICENSE RATE</h4>
                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                          <table className="w-full text-xs">
                            <thead className="bg-[#7BC9A6] text-white">
                              <tr>
                                {data.columns.map((col: any, idx: number) => (
                                  <th key={idx} className="px-3 py-2 text-left font-semibold">{col}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {data.rows.map((row: any[], rowIdx: number) => (
                                <tr key={rowIdx}>
                                  {row.map((cell, cellIdx) => (
                                    <td key={cellIdx} className="px-3 py-2 text-gray-700">{cell || "-"}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  } catch {
                    return null;
                  }
                })()}

                {/* Remarks */}
                {(templateType === 'customs-license' || formData.rateRemarks || isEditing) && (
                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Remarks/หมายเหตุ:</p>
                    {isEditing ? (
                      <Textarea
                        value={currentData('rateRemarks') as string || ''}
                        onChange={(e) => updateTempData('rateRemarks', e.target.value)}
                        className="text-xs border-[#7BC9A6] focus:ring-2 focus:ring-[#7BC9A6]/20 min-h-[80px]"
                        placeholder="1. หมายเหตุข้อที่ 1&#10;2. หมายเหตุข้อที่ 2"
                      />
                    ) : (
                      <div className="text-xs text-gray-700 space-y-1">
                        {(formData.rateRemarks || '1) Any value-added services shall be quoted separately.\n\n2) The above rate is subject to VAT, any receipt and all other incidental expenses such as Tax etc.\n\nThe quotation is based on receipt of correct commercial documents for export customs clearance, 3 working days prior to vessel departure. Demurrage charges will be invoiced against original receipts. Any demurrage originating from dispute with customs will be for shippers account.\n\n3) All insurance for the goods are not included into this quotation. Quotation on request.').split('\n').map((line, idx) => (
                          <p key={idx}>{line || '\u00A0'}</p>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Terms & Conditions Section */}
          <div>
            <h2 className="text-sm font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">
              Terms & Conditions / เงื่อนไข
            </h2>
            <div className="text-xs text-gray-700 space-y-1">
              <p>1. ใบเสนอราคานี้มีอายุ 30 วัน นับจากวันที่ออกใบเสนอราคา</p>
              <p>2. ราคาดังกล่าวยังไม่รวมภาษีมูลค่าเพิ่ม 7%</p>
              <p>3. เงื่อนไขการชำระเงิน: เครดิต 30 วัน หลังจากวันที่ออกใบแจ้งหนี้</p>
              <p>4. ราคาอาจมีการเปลี่ยนแปลงตามสภาวะตลาดและค่าน้ำมัน</p>
            </div>
          </div>

          {/* Signature Section */}
          <div className="mt-12 pt-8 border-t-2 border-gray-200">
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="border-b-2 border-gray-300 pb-2 mb-2 h-16"></div>
                <p className="text-xs text-gray-700 font-medium">ผู้เสนอราคา</p>
                <p className="text-xs text-gray-500">mini CRM</p>
              </div>
              <div className="text-center">
                <div className="border-b-2 border-gray-300 pb-2 mb-2 h-16"></div>
                <p className="text-xs text-gray-700 font-medium">ผู้รับใบเสนอราคา</p>
                <p className="text-xs text-gray-500">{formData.companyNameTh || "_______________"}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}