import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  FileText,
  Warehouse,
  FileCheck,
  Truck,
  Ship,
  ArrowRight,
  Code,
  Eye,
  Zap,
  Globe,
  Layout,
  Download,
  CheckCircle2,
} from "lucide-react";
import { QuotationBuilderMain } from "../quotation/quotation-builder-main";
import { QuotationData } from "../quotation/quotation-types";

interface QuotationModuleDemoProps {
  onNavigate: (path: string) => void;
}

export function QuotationModuleDemo({ onNavigate }: QuotationModuleDemoProps) {
  const [showBuilder, setShowBuilder] = useState(false);

  const handleLaunchBuilder = () => {
    setShowBuilder(true);
  };

  const handleBack = () => {
    setShowBuilder(false);
  };

  const handleSave = (data: QuotationData) => {
    console.log("Quotation saved:", data);
    alert("✅ Quotation created successfully!");
    setShowBuilder(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setShowBuilder(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F9FF] to-[#E8F5F1] p-8">
      {/* QuotationBuilderMain Modal */}
      <QuotationBuilderMain
        open={showBuilder}
        onOpenChange={handleOpenChange}
        onBack={handleBack}
        onSave={handleSave}
      />

      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-[#7BC9A6] to-[#5FB88E] mb-6 shadow-lg">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Quotation Module
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Enterprise-grade quotation system with 4 dynamic templates, real-time A4 preview,
            and bilingual support for mini CRM
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              onClick={handleLaunchBuilder}
              size="lg"
              className="bg-gradient-to-r from-[#7BC9A6] to-[#5FB88E] hover:from-[#6CB88A] hover:to-[#4FA67C] text-white shadow-lg px-8"
            >
              <Zap className="w-5 h-5 mr-2" />
              Launch Quotation Builder
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => onNavigate("/quotations")}>
              <Eye className="w-5 h-5 mr-2" />
              View Live Demo
            </Button>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#7BC9A6]/10 flex items-center justify-center mb-4">
              <Layout className="w-6 h-6 text-[#7BC9A6]" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Split-View Editor</h3>
            <p className="text-sm text-gray-600">
              Real-time preview with form on left, live A4 document on right
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#5FB88E]/10 flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-[#5FB88E]" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Bilingual Support</h3>
            <p className="text-sm text-gray-600">
              Full Thai/English toggle with instant translation
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#6CB88A]/10 flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-[#6CB88A]" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">4 Templates</h3>
            <p className="text-sm text-gray-600">
              Warehouse, Customs, Cross-Border, International Freight
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#4FA67C]/10 flex items-center justify-center mb-4">
              <Download className="w-6 h-6 text-[#4FA67C]" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">PDF Export</h3>
            <p className="text-sm text-gray-600">
              Print-ready A4 layout (794×1123px) optimized for PDF
            </p>
          </Card>
        </div>

        {/* Templates Showcase */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Template 1 */}
            <Card className="overflow-hidden hover:shadow-xl transition-all group">
              <div className="h-2 bg-gradient-to-r from-[#7BC9A6] to-[#5FB88E]" />
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-[#7BC9A6]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Warehouse className="w-7 h-7 text-[#7BC9A6]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Warehouse + Transport
                    </h3>
                    <p className="text-sm text-gray-600">
                      Combined warehousing and domestic transportation services
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#7BC9A6]" />
                    <span className="text-gray-700">Warehousing rate table</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#7BC9A6]" />
                    <span className="text-gray-700">Transport rates with routes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#7BC9A6]" />
                    <span className="text-gray-700">Toggle sections on/off</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Template 2 */}
            <Card className="overflow-hidden hover:shadow-xl transition-all group">
              <div className="h-2 bg-gradient-to-r from-[#5FB88E] to-[#4FA67C]" />
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-[#5FB88E]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileCheck className="w-7 h-7 text-[#5FB88E]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Customs & License
                    </h3>
                    <p className="text-sm text-gray-600">
                      Import/export clearance and license management
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#5FB88E]" />
                    <span className="text-gray-700">Customs clearance rates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#5FB88E]" />
                    <span className="text-gray-700">License management pricing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#5FB88E]" />
                    <span className="text-gray-700">Combined package options</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Template 3 */}
            <Card className="overflow-hidden hover:shadow-xl transition-all group">
              <div className="h-2 bg-gradient-to-r from-[#6CB88A] to-[#5FB88E]" />
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-[#6CB88A]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Truck className="w-7 h-7 text-[#6CB88A]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Cross-Border (CLMV)
                    </h3>
                    <p className="text-sm text-gray-600">
                      Regional cross-border logistics in CLMV countries
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#6CB88A]" />
                    <span className="text-gray-700">Rate summary section</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#6CB88A]" />
                    <span className="text-gray-700">CLMV, JTS, Sales remarks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#6CB88A]" />
                    <span className="text-gray-700">Optional customs table</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Template 4 */}
            <Card className="overflow-hidden hover:shadow-xl transition-all group">
              <div className="h-2 bg-gradient-to-r from-[#4FA67C] to-[#3D9568]" />
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-[#4FA67C]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Ship className="w-7 h-7 text-[#4FA67C]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      International Freight
                    </h3>
                    <p className="text-sm text-gray-600">
                      Global freight forwarding by air and ocean
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4FA67C]" />
                    <span className="text-gray-700">Air freight (Export/Import)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4FA67C]" />
                    <span className="text-gray-700">Sea freight (Export/Import)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4FA67C]" />
                    <span className="text-gray-700">Mode-specific remarks</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Technical Highlights */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-gradient-to-br from-white to-gray-50">
              <div className="flex items-center gap-3 mb-4">
                <Code className="w-6 h-6 text-[#7BC9A6]" />
                <h3 className="font-bold text-gray-900">Component-Based</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Reusable table components</li>
                <li>• Template-specific forms</li>
                <li>• Modular preview system</li>
                <li>• TypeScript typed</li>
              </ul>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-white to-gray-50">
              <div className="flex items-center gap-3 mb-4">
                <Layout className="w-6 h-6 text-[#7BC9A6]" />
                <h3 className="font-bold text-gray-900">A4 Layout System</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• 794px × 1123px (A4 at 96 DPI)</li>
                <li>• Scalable preview (0.65x)</li>
                <li>• Print-optimized</li>
                <li>• PDF-ready output</li>
              </ul>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-white to-gray-50">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-6 h-6 text-[#7BC9A6]" />
                <h3 className="font-bold text-gray-900">Responsive Design</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Desktop split view</li>
                <li>• Tablet stacked layout</li>
                <li>• Mobile wizard flow</li>
                <li>• Touch-optimized</li>
              </ul>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="p-8 bg-gradient-to-r from-[#7BC9A6] to-[#5FB88E] text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Create Professional Quotations?</h2>
          <p className="text-lg mb-6 text-white/90">
            Start building enterprise-grade quotations in minutes with our powerful template system
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={handleLaunchBuilder}
              size="lg"
              className="bg-white text-[#7BC9A6] hover:bg-gray-100"
            >
              <Zap className="w-5 h-5 mr-2" />
              Get Started Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
              onClick={() => window.open("/src/app/components/quotation/README.md", "_blank")}
            >
              <FileText className="w-5 h-5 mr-2" />
              Read Documentation
            </Button>
          </div>
        </Card>

        {/* Footer Info */}
        <div className="mt-12 text-center text-sm text-gray-600">
          <p>Part of mini CRM Enterprise System</p>
          <p className="mt-2">
            <Badge variant="secondary" className="mr-2">v1.0.0</Badge>
            <Badge variant="secondary" className="mr-2">React 18</Badge>
            <Badge variant="secondary" className="mr-2">TypeScript</Badge>
            <Badge variant="secondary">Tailwind CSS v4</Badge>
          </p>
        </div>
      </div>
    </div>
  );
}