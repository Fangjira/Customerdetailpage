import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Warehouse, FileCheck, Truck, Ship, ArrowRight, Eye } from "lucide-react";
import { QUOTATION_TEMPLATES } from "./quotation-constants";
import { QuotationTemplateType } from "./quotation-types";

interface TemplateSelectionScreenProps {
  onSelectTemplate: (templateType: QuotationTemplateType) => void;
  onBack?: () => void;
}

const iconMap = {
  warehouse: Warehouse,
  "file-check": FileCheck,
  truck: Truck,
  ship: Ship,
};

export function TemplateSelectionScreen({ onSelectTemplate, onBack }: TemplateSelectionScreenProps) {
  const [selectedLang, setSelectedLang] = useState<"th" | "en">("th");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F9FF] to-[#E8F5F1] p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {selectedLang === "th" ? "เลือกแบบใบเสนอราคา" : "Select Quotation Template"}
            </h1>
            <p className="text-gray-600 mt-2">
              {selectedLang === "th" 
                ? "เลือกแบบฟอร์มที่เหมาะสมกับประเภทบริการของคุณ" 
                : "Choose the template that best fits your service type"}
            </p>
          </div>
        </div>
      </div>

      {/* Template Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {QUOTATION_TEMPLATES.map((template, index) => {
            const IconComponent = iconMap[template.icon as keyof typeof iconMap] || Warehouse;
            
            return (
              <Card
                key={template.id}
                className="relative overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer border-2 hover:border-[#7BC9A6]"
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, #f9fffe 100%)",
                }}
              >
                {/* Colored accent bar */}
                <div
                  className="absolute top-0 left-0 w-2 h-full"
                  style={{ backgroundColor: template.color }}
                />

                <div className="p-8 pl-10">
                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                    style={{
                      backgroundColor: `${template.color}20`,
                    }}
                  >
                    <IconComponent
                      className="w-8 h-8"
                      style={{ color: template.color }}
                    />
                  </div>

                  {/* Content */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {selectedLang === "th" ? template.name : template.nameEn}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {selectedLang === "th" ? template.description : template.descriptionEn}
                    </p>
                  </div>

                  {/* Badge */}
                  <Badge
                    variant="secondary"
                    className="mb-6"
                    style={{
                      backgroundColor: `${template.color}15`,
                      color: template.color,
                      border: "none",
                    }}
                  >
                    {selectedLang === "th" ? "แบบฟอร์ม" : "Template"} {index + 1}
                  </Badge>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 group/preview hover:border-[#7BC9A6] hover:text-[#7BC9A6]"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {selectedLang === "th" ? "ดูตัวอย่าง" : "Preview"}
                    </Button>
                    <Button
                      onClick={() => onSelectTemplate(template.id)}
                      className="flex-1 group/select"
                      style={{
                        backgroundColor: template.color,
                        color: "white",
                      }}
                    >
                      {selectedLang === "th" ? "เลือกแบบนี้" : "Select"}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/select:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#7BC9A6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </Card>
            );
          })}
        </div>
      </div>

      {/* Info Footer */}
      <div className="max-w-7xl mx-auto mt-12">
        <Card className="bg-white/80 backdrop-blur border-[#7BC9A6]/20">
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#7BC9A6]/10 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">💡</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {selectedLang === "th" ? "คำแนะนำ" : "Tips"}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {selectedLang === "th"
                    ? "แต่ละแบบฟอร์มออกแบบมาสำหรับประเภทบริการที่แตกต่างกัน คุณสามารถปรับแต่งเนื้อหาและอัตราค่าบริการได้หลังจากเลือกแบบฟอร์ม"
                    : "Each template is designed for specific service types. You can customize content and service rates after selecting a template."}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}