import { useState } from "react";
import { X, Warehouse, FileCheck, Truck, Ship } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { QuotationTemplateType, QUOTATION_TEMPLATES } from "../quotation/quotation-constants";

interface CreateQuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (templateType: QuotationTemplateType) => void;
}

const iconMap = {
  warehouse: Warehouse,
  "file-check": FileCheck,
  truck: Truck,
  ship: Ship,
};

export function CreateQuotationModal({ isOpen, onClose, onSelectTemplate }: CreateQuotationModalProps) {
  if (!isOpen) return null;

  const handleSelectTemplate = (templateType: QuotationTemplateType) => {
    onSelectTemplate(templateType);
    onClose();
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">สร้างใบเสนอราคา</h2>
            <p className="text-sm text-gray-600 mt-1">เลือกแบบฟอร์มที่เหมาะสมกับประเภทบริการของคุณ</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {QUOTATION_TEMPLATES.map((tmpl) => {
              const IconComponent = iconMap[tmpl.icon as keyof typeof iconMap] || Warehouse;
              return (
                <Card
                  key={tmpl.id}
                  className="relative overflow-hidden hover:shadow-lg transition-all duration-200 group cursor-pointer border-2 hover:border-[#7BC9A6]"
                  onClick={() => handleSelectTemplate(tmpl.id)}
                >
                  {/* Colored accent bar */}
                  <div
                    className="absolute top-0 left-0 w-1.5 h-full"
                    style={{ backgroundColor: tmpl.color }}
                  />

                  <div className="p-6 pl-8">
                    {/* Icon and Title */}
                    <div className="flex items-start gap-4 mb-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                        style={{
                          backgroundColor: `${tmpl.color}20`,
                        }}
                      >
                        <IconComponent
                          className="w-6 h-6"
                          style={{ color: tmpl.color }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {tmpl.name}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {tmpl.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7BC9A6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </Card>
              );
            })}
          </div>

          {/* Info Footer */}
          <Card className="mt-6 bg-white/80 backdrop-blur border-[#7BC9A6]/20">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#7BC9A6]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">💡</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">คำแนะนำ</h4>
                  <p className="text-gray-600 leading-relaxed">
                    แต่ละแบบฟอร์มออกแบบมาสำหรับประเภทบริการที่แตกต่างกัน
                    คุณสามารถปรับแต่งเนื้อหาและอัตราค่าบริการได้หลังจากเลือกแบบฟอร์ม
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
