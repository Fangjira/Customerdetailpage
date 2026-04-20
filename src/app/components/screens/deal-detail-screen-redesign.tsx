import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Mail,
  Phone,
  Calendar,
  DollarSign,
  User,
  Paperclip,
  ChevronLeft,
  Edit,
  MoreVertical,
  FileText,
  Plus,
  Building2,
  Package,
  TrendingUp,
  AlertCircle,
  Target,
  Clock,
  Percent,
  MapPin,
  Briefcase,
  MessageSquare,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { CreateQuotationFromDealDialog } from "../create-quotation-from-deal-dialog";

export function DealDetailScreen({ 
  dealId, 
  onBack, 
  onNavigate 
}: { 
  dealId: string; 
  onBack: () => void;
  onNavigate?: (path: string) => void;
}) {
  const { t } = useTranslation();
  const [isCreateQuotationDialogOpen, setIsCreateQuotationDialogOpen] = useState(false);
  const [projectStatus, setProjectStatus] = useState("Negotiating Process");
  const [progress, setProgress] = useState(70);

  useEffect(() => {
    const statusProgressMap: { [key: string]: number } = {
      "Prospect": 0,
      "Approach": 10,
      "Quotation": 50,
      "Negotiating Process": 70,
      "Win": 100,
      "Lose": 100,
      "On-hold": 100,
      "Transfer": 100,
      "Terminate": 100,
      "Cancelled": 100,
    };
    setProgress(statusProgressMap[projectStatus] || 0);
  }, [projectStatus]);

  const dealData = {
    dealId: dealId,
    dealName: "International Freight Contract",
    customer: "Global Freight Solutions Inc.",
    customerEmail: "john.d@globalfreight.com",
    customerPhone: "+1 (555) 123-4567",
    totalValue: "$254,000",
    expectedCloseDate: "Jan 15, 2025",
    owner: "Sarah Chen",
    probability: "High (75%)",
    stage: "Negotiating Process",
  };

  const services = [
    {
      service: "Air Freight - International",
      quantity: "500 kg/month",
      unitPrice: "$450",
      total: "$225,000",
    },
    {
      service: "Customs Clearance",
      quantity: "Monthly",
      unitPrice: "$2,000",
      total: "$24,000",
    },
    {
      service: "Insurance Coverage",
      quantity: "Annual",
      unitPrice: "$5,000",
      total: "$5,000",
    },
  ];

  const attachments = [
    { name: "Service_Proposal_v2.pdf", size: "2.4 MB", date: "Dec 12, 2024" },
    { name: "Company_Profile.pdf", size: "1.8 MB", date: "Dec 10, 2024" },
    { name: "Route_Analysis.xlsx", size: "856 KB", date: "Dec 8, 2024" },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Breadcrumb & Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          <ChevronLeft className="h-4 w-4" />
          {t("deals.back_to_deals")}
        </button>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            {t("deals.edit_deal")}
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            size="sm"
            onClick={() => setIsCreateQuotationDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Quotation
          </Button>
        </div>
      </div>

      {/* Header Card - Clean & Compact */}
      <Card className="border-2">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-2xl font-bold text-gray-900">
                  {dealData.dealName}
                </h1>
                <Badge className="bg-purple-100 text-purple-700 border-purple-200 px-3 py-1">
                  {dealData.stage}
                </Badge>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-gray-400" />
                  <span className="font-medium text-gray-900">{dealData.customer}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <span>Deal ID: {dealData.dealId}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span>Owner: {dealData.owner}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar - Prominent */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Deal Progress</span>
              <div className="flex items-center gap-3">
                <Badge className="bg-green-50 text-green-700 border-green-200">
                  <Percent className="h-3 w-3 mr-1" />
                  {dealData.probability}
                </Badge>
                <span className="text-sm font-bold text-gray-900">{progress}%</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Approach
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Quotation
              </span>
              <span className="flex items-center gap-1 font-medium text-purple-700">
                <Activity className="h-3 w-3" />
                Negotiating
              </span>
              <span className="text-gray-400">Win/Lose</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics - 4 Columns Clean Grid */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="border hover:border-blue-300 transition-colors">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <Badge variant="outline" className="text-xs text-green-600 border-green-200">
                Revenue
              </Badge>
            </div>
            <p className="text-2xl font-bold text-gray-900">{dealData.totalValue}</p>
            <p className="text-xs text-gray-500 mt-1">{t("deals.total_deal_value")}</p>
          </CardContent>
        </Card>

        <Card className="border hover:border-blue-300 transition-colors">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <Badge variant="outline" className="text-xs text-blue-600 border-blue-200">
                Timeline
              </Badge>
            </div>
            <p className="text-xl font-bold text-gray-900">{dealData.expectedCloseDate}</p>
            <p className="text-xs text-gray-500 mt-1">Expected Close Date</p>
          </CardContent>
        </Card>

        <Card className="border hover:border-blue-300 transition-colors">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center">
                <Target className="h-5 w-5 text-amber-600" />
              </div>
              <Badge variant="outline" className="text-xs text-amber-600 border-amber-200">
                Win Rate
              </Badge>
            </div>
            <p className="text-xl font-bold text-gray-900">75%</p>
            <p className="text-xs text-gray-500 mt-1">Probability</p>
          </CardContent>
        </Card>

        <Card className="border hover:border-blue-300 transition-colors">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-purple-600" />
              </div>
              <Badge variant="outline" className="text-xs text-purple-600 border-purple-200">
                Services
              </Badge>
            </div>
            <p className="text-xl font-bold text-gray-900">{services.length}</p>
            <p className="text-xs text-gray-500 mt-1">Service Items</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content - 2 Column Layout */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - 2/3 Width */}
        <div className="col-span-2 space-y-6">
          {/* Tabs Section */}
          <Card>
            <Tabs defaultValue="overview" className="w-full">
              <CardHeader className="border-b bg-gray-50 pb-0">
                <TabsList className="h-auto bg-transparent p-0 gap-4">
                  <TabsTrigger
                    value="overview"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 pb-3 text-sm font-medium"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="services"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 pb-3 text-sm font-medium"
                  >
                    Services & Pricing
                  </TabsTrigger>
                  <TabsTrigger
                    value="project-info"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 pb-3 text-sm font-medium"
                  >
                    Project Info
                  </TabsTrigger>
                  <TabsTrigger
                    value="documents"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 pb-3 text-sm font-medium"
                  >
                    Documents
                  </TabsTrigger>
                </TabsList>
              </CardHeader>

              <CardContent className="p-6">
                {/* Overview Tab */}
                <TabsContent value="overview" className="mt-0 space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                      Deal Description
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-200">
                      Global Freight Solutions is looking to establish a long-term partnership for 
                      international air freight services. They require reliable transportation of 
                      high-value electronics from Asia to North America, with monthly volumes averaging 500kg.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Package className="h-4 w-4 text-blue-600" />
                        <span className="text-xs font-semibold text-blue-900 uppercase">Commodities</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <Badge className="bg-white text-blue-700 border-blue-300 text-xs">
                          Consumer Electronics
                        </Badge>
                        <Badge className="bg-white text-blue-700 border-blue-300 text-xs">
                          Industrial Equipment
                        </Badge>
                      </div>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-purple-600" />
                        <span className="text-xs font-semibold text-purple-900 uppercase">Value Chains</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <Badge className="bg-white text-purple-700 border-purple-300 text-xs">
                          Multimodal
                        </Badge>
                        <Badge className="bg-white text-purple-700 border-purple-300 text-xs">
                          Transport
                        </Badge>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Services Tab */}
                <TabsContent value="services" className="mt-0">
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">
                            Service
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">
                            Quantity
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">
                            Unit Price
                          </th>
                          <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 uppercase">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {services.map((service, index) => (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4 text-sm font-medium text-gray-900">
                              {service.service}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600">
                              {service.quantity}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600">
                              {service.unitPrice}
                            </td>
                            <td className="py-3 px-4 text-sm font-semibold text-gray-900 text-right">
                              {service.total}
                            </td>
                          </tr>
                        ))}
                        <tr className="bg-blue-50 border-t-2 border-blue-200">
                          <td colSpan={3} className="py-3 px-4 text-sm font-bold text-gray-900">
                            Annual Total
                          </td>
                          <td className="py-3 px-4 text-lg font-bold text-blue-900 text-right">
                            $254,000
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                {/* Project Info Tab */}
                <TabsContent value="project-info" className="mt-0 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                        Task Type
                      </label>
                      <div className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-900">
                        Lead
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                        Project Type
                      </label>
                      <div className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-900">
                        Solution Design
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                      Industry
                    </label>
                    <div className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-900">
                      Electronics & Electrical Appliances
                    </div>
                  </div>
                </TabsContent>

                {/* Documents Tab */}
                <TabsContent value="documents" className="mt-0">
                  <div className="space-y-2">
                    {attachments.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                            <p className="text-xs text-gray-500">{doc.size} • {doc.date}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>

        {/* Right Sidebar - 1/3 Width */}
        <div className="space-y-6">
          {/* Primary Contact */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Primary Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-blue-600 text-white font-semibold">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">John Davidson</p>
                  <p className="text-xs text-gray-500">Operations Director</p>
                </div>
              </div>

              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Mail className="mr-2 h-4 w-4 text-gray-400" />
                  <span className="text-xs truncate">{dealData.customerEmail}</span>
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Phone className="mr-2 h-4 w-4 text-gray-400" />
                  <span className="text-xs">{dealData.customerPhone}</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                className="w-full justify-start bg-blue-600 hover:bg-blue-700"
                size="sm"
                onClick={() => setIsCreateQuotationDialogOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Quotation
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Generate Proposal
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Meeting
              </Button>
            </CardContent>
          </Card>

          {/* Activity Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-600 mt-1.5"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900">Status updated</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-green-600 mt-1.5"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900">Email sent to client</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-purple-600 mt-1.5"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900">Meeting completed</p>
                  <p className="text-xs text-gray-500">3 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Create Quotation Dialog */}
      {isCreateQuotationDialogOpen && (
        <CreateQuotationFromDealDialog
          isOpen={isCreateQuotationDialogOpen}
          dealData={dealData}
          onClose={() => setIsCreateQuotationDialogOpen(false)}
          onNavigate={onNavigate}
          onCreateQuotation={(quotationData) => {
            console.log("Creating quotation:", quotationData);
            setIsCreateQuotationDialogOpen(false);
          }}
        />
      )}
    </div>
  );
}