import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { X, Download, Send, ChevronLeft, FileText, Building2, DollarSign } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";

interface ProposalPreviewDialogProps {
  open: boolean;
  onClose: () => void;
  onGenerate?: () => void;
  dealData?: any;
  config?: any;
}

export function ProposalPreviewDialog({
  open,
  onClose,
  onGenerate,
  dealData,
  config,
}: ProposalPreviewDialogProps) {
  const { t } = useTranslation();

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const proposalNumber = `PROP-${new Date().getFullYear()}-${String(
    Math.floor(Math.random() * 1000)
  ).padStart(3, "0")}`;

  const services = [
    {
      name: "International Air Freight",
      quantity: "500 kg/month",
      price: "฿180/kg",
      total: "฿900,000",
    },
    {
      name: "Warehouse Management",
      quantity: "200 sqm",
      price: "฿4,000/sqm",
      total: "฿800,000",
    },
    {
      name: "Distribution Services",
      quantity: "100 routes",
      price: "฿12,000/route",
      total: "฿1,200,000",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] h-[95vh] p-0 gap-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Proposal Preview</DialogTitle>
        
          <DialogDescription className="sr-only">
            Dialog description
          </DialogDescription></DialogHeader>
        
        {/* Mobile Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4 flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Badge variant="secondary" className="bg-white/20 text-white border-0 text-xs">
              DRAFT
            </Badge>
          </div>
          <h2 className="text-base font-bold text-white mb-1">
            Proposal Preview
          </h2>
          <p className="text-xs text-purple-100">
            {proposalNumber} • {dealData?.dealName || "International Freight"}
          </p>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1 bg-gray-50">
          <div className="p-4 space-y-3 pb-20">
            {/* Company Header */}
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-12 w-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-purple-900 truncate">
                      ONELINK CRM
                    </h3>
                    <p className="text-xs text-purple-700 truncate">Supply Chain Excellence</p>
                  </div>
                </div>
                <Separator className="my-2" />
                <div className="text-xs text-gray-700 space-y-0.5">
                  <p className="truncate">1 Soi Bearing 1, Bangkok 10120</p>
                  <p>📞 +66 2 123 4567</p>
                  <p>📧 contact@onelink.com</p>
                </div>
              </CardContent>
            </Card>

            {/* Proposal Info */}
            <Card>
              <CardContent className="p-3">
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div>
                    <p className="text-gray-500">Proposal #</p>
                    <p className="font-medium text-gray-900">{proposalNumber}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Date</p>
                    <p className="font-medium text-gray-900">{currentDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Valid Until</p>
                    <p className="font-medium text-gray-900">30 Days</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Status</p>
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 text-xs">
                      Draft
                    </Badge>
                  </div>
                </div>
                <Separator className="my-2" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Prepared For</p>
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {dealData?.customer || "TechCorp Asia Ltd."}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Executive Summary */}
            <Card>
              <CardContent className="p-3">
                <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-purple-600" />
                  Executive Summary
                </h3>
                <p className="text-xs text-gray-700 leading-relaxed">
                  We are pleased to present this comprehensive logistics solution proposal. 
                  Our integrated approach combines international freight forwarding, warehousing, 
                  and distribution services to optimize your supply chain operations and reduce costs by up to 30%.
                </p>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardContent className="p-3">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Proposed Services
                </h3>
                <div className="space-y-2">
                  {services.map((service, index) => (
                    <div key={index} className="bg-gradient-to-r from-purple-50 to-blue-50 p-2 rounded border border-purple-100">
                      <div className="flex items-start justify-between mb-1">
                        <p className="text-xs font-semibold text-gray-900 flex-1 pr-2">
                          {service.name}
                        </p>
                        <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs flex-shrink-0">
                          {service.total}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span>{service.quantity}</span>
                        <span>•</span>
                        <span>{service.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Total Investment */}
            <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white border-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-xs text-purple-100">Total Investment</p>
                    <p className="text-2xl font-bold">฿2,900,000</p>
                    <p className="text-xs text-purple-100 mt-1">Annual Contract</p>
                  </div>
                  <DollarSign className="h-12 w-12 text-white/20" />
                </div>
              </CardContent>
            </Card>

            {/* Key Benefits */}
            <Card className="border-green-200 bg-green-50/50">
              <CardContent className="p-3">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Key Benefits
                </h3>
                <div className="space-y-1.5">
                  <div className="flex items-start gap-2 text-xs text-gray-700">
                    <span className="text-green-600 flex-shrink-0">✓</span>
                    <span>Cost reduction up to 30%</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-gray-700">
                    <span className="text-green-600 flex-shrink-0">✓</span>
                    <span>99.5% on-time delivery guarantee</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-gray-700">
                    <span className="text-green-600 flex-shrink-0">✓</span>
                    <span>Real-time tracking & reporting</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-gray-700">
                    <span className="text-green-600 flex-shrink-0">✓</span>
                    <span>24/7 customer support</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Terms & Conditions */}
            <Card>
              <CardContent className="p-3">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Terms & Conditions
                </h3>
                <div className="space-y-2 text-xs text-gray-700">
                  <div>
                    <p className="font-medium text-gray-900">1. Payment Terms</p>
                    <p>Net 30 days from invoice date</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">2. Contract Period</p>
                    <p>12-month minimum commitment</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">3. Validity</p>
                    <p>This proposal is valid for 30 days</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Signatures */}
            <Card>
              <CardContent className="p-3">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Authorization
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-900 mb-2">Prepared By</p>
                    <div className="border-t-2 border-gray-300 pt-2">
                      <p className="text-xs font-medium text-gray-900">Sarah Chen</p>
                      <p className="text-xs text-gray-500">Sales Manager</p>
                      <p className="text-xs text-gray-500">Date: {currentDate}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900 mb-2">Customer Acceptance</p>
                    <div className="border-t-2 border-gray-300 pt-2 space-y-1.5">
                      <div className="border-b border-gray-300 h-8" />
                      <p className="text-xs text-gray-500">Signature & Date</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>

        {/* Bottom Actions */}
        <div className="flex-shrink-0 bg-white border-t p-4">
          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" size="sm" className="h-10 text-xs">
              <Download className="h-4 w-4 mr-1" />
              PDF
            </Button>
            <Button variant="outline" size="sm" className="h-10 text-xs">
              <Send className="h-4 w-4 mr-1" />
              Email
            </Button>
            {onGenerate && (
              <Button
                onClick={onGenerate}
                className="h-10 bg-purple-600 hover:bg-purple-700 text-xs"
              >
                Generate
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
