import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Phone,
  Mail,
  MapPin,
  Building2,
  User,
  Calendar,
  TrendingUp,
  Tag,
  Briefcase,
  DollarSign,
  Clock,
  Edit2,
  UserCheck,
  MoreVertical,
  MessageSquare,
  ExternalLink,
  AlertCircle,
  Users,
  Search,
  Bell,
  Globe,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  LayoutDashboard,
  FileText,
  Handshake,
  UserPlus,
  Settings,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface LeadDetailEnterpriseProps {
  onBack?: () => void;
  leadId?: string;
}

export function LeadDetailEnterprise({ onBack, leadId = "LEAD-001" }: LeadDetailEnterpriseProps) {
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const [isDuplicateExpanded, setIsDuplicateExpanded] = useState(true);

  // Mock data
  const lead = {
    id: "LEAD-001",
    companyName: "Global Traders Ltd.",
    contactName: "สมชาย วงศ์สกุล",
    email: "somchai@globaltraders.com",
    phone: "081-234-5678",
    status: "New",
    score: 75,
    source: "Trade Show",
    assignedTo: "Sarah Chen",
    businessUnit: "HCP",
    services: ["Freight", "Crossborder"],
    estimatedValue: 2500000,
    expectedCloseDate: "2025-06-30",
    address: "123 ถนนพระรามที่ 4 แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110",
    industry: "Manufacturing",
    supplyChainRole: "Importer",
    notes: "Lead from trade show, scheduled initial consultation. Customer interested in cross-border logistics solutions. High potential for long-term partnership.",
    deals: [
      {
        id: "DL-2024-016",
        name: "Cross-border E-commerce Deal",
        stage: "Approach",
        progress: 25,
      },
    ],
    activities: [
      {
        id: 1,
        type: "call",
        title: "Call Follow-up",
        description: "โทรติดตาม - ลูกค้าสนใจบริการ Cross-border",
        by: "Sarah Chen",
        date: "Mar 15, 2026",
      },
      {
        id: 2,
        type: "email",
        title: "Email Sent",
        description: "ส่งข้อมูลบริการเบื้องต้น",
        by: "Sarah Chen",
        date: "Mar 10, 2026",
      },
      {
        id: 3,
        type: "meeting",
        title: "Met at Trade Show",
        description: "พบที่งาน Trade Show - ได้ชื่อบัตร",
        by: "Sarah Chen",
        date: "Mar 5, 2026",
      },
    ],
    duplicates: [
      {
        id: "LEAD-045",
        companyName: "Global Traders Ltd.",
        businessUnit: "Freight-Business",
        status: "Contacted",
        owner: "Michael Wong",
        createdDate: "Feb 28, 2026",
      },
      {
        id: "LEAD-052",
        companyName: "Global Traders Co., Ltd.",
        businessUnit: "Automotive",
        status: "New",
        owner: "Jennifer Park",
        createdDate: "Mar 10, 2026",
      },
    ],
  };

  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);

  const toggleLanguage = () => {
    const newLang = currentLang === "en" ? "th" : "en";
    setCurrentLang(newLang);
    i18n.changeLanguage(newLang);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Contacted":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "Qualified":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar - Fixed */}
      <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 space-y-6">
        {/* Logo */}
        <div className="h-10 w-10 bg-[#7BC9A6] rounded-lg flex items-center justify-center">
          <Building2 className="h-6 w-6 text-white" />
        </div>

        {/* Navigation Icons */}
        <nav className="flex-1 flex flex-col items-center space-y-4">
          <button className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600">
            <LayoutDashboard className="h-5 w-5" />
          </button>
          <button className="h-10 w-10 flex items-center justify-center rounded-lg bg-gray-100 text-[#7BC9A6]">
            <UserPlus className="h-5 w-5" />
          </button>
          <button className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600">
            <Users className="h-5 w-5" />
          </button>
          <button className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600">
            <Handshake className="h-5 w-5" />
          </button>
          <button className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600">
            <FileText className="h-5 w-5" />
          </button>
        </nav>

        {/* Settings at bottom */}
        <button className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600">
          <Settings className="h-5 w-5" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-9 pl-10 pr-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Side: Language, Notifications, Profile */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="h-9 px-3 flex items-center gap-1 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700"
            >
              <Globe className="h-4 w-4" />
              {currentLang.toUpperCase()}
              <ChevronDown className="h-3 w-3" />
            </button>

            {/* Notifications */}
            <button className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-[#7BC9A6] text-white text-xs">SC</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">Sarah Chen</span>
                <span className="text-xs text-gray-500">Sales Rep</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Top Section - Title and Actions - FIXED HEADER */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                {/* LEFT: Back arrow + Company Name + (LEAD-ID) + Status badge */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={onBack}
                    className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <h1 className="text-2xl font-semibold text-gray-900">
                    {lead.companyName} <span className="text-gray-400">({lead.id})</span>
                  </h1>
                  <Badge className={`${getStatusColor(lead.status)} border font-medium`}>
                    {lead.status}
                  </Badge>
                </div>

                {/* RIGHT: Action Buttons - All in one horizontal line */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="h-9 border-gray-300 hover:bg-gray-50 text-sm font-medium"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Transfer
                  </Button>
                  <Button
                    variant="outline"
                    className="h-9 border-gray-300 hover:bg-gray-50 text-sm font-medium"
                  >
                    Status
                  </Button>
                  <Button className="h-9 bg-[#7BC9A6] hover:bg-[#6BB896] text-white text-sm font-medium">
                    <UserCheck className="h-4 w-4 mr-2" />
                    Convert to Customer
                  </Button>
                  <Button className="h-9 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Create Deal
                  </Button>
                </div>
              </div>
            </div>

            {/* 2 Column Layout: LEFT 460px fixed / RIGHT fill remaining */}
            <div className="flex gap-5">
              {/* Left Column - Fixed 460px */}
              <div className="w-[460px] flex-shrink-0 space-y-5">
                {/* Contact Info Card */}
                <Card className="shadow-sm border-gray-200 rounded-xl">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-gray-900">Contact Info</h3>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Edit2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Name</p>
                        <p className="text-sm font-medium text-gray-900">{lead.contactName}</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 mb-1">Company</p>
                        <p className="text-sm font-medium text-gray-900">{lead.companyName}</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 mb-1">Phone</p>
                        <a
                          href={`tel:${lead.phone}`}
                          className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                        >
                          <Phone className="h-3 w-3" />
                          {lead.phone}
                        </a>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 mb-1">Email</p>
                        <a
                          href={`mailto:${lead.email}`}
                          className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 break-all"
                        >
                          <Mail className="h-3 w-3" />
                          {lead.email}
                        </a>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 mb-1">Address</p>
                        <p className="text-sm text-gray-700">{lead.address}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Business Info Card */}
                <Card className="shadow-sm border-gray-200 rounded-xl">
                  <CardContent className="p-5">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Business Info</h3>

                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Industry</p>
                        <p className="text-sm font-medium text-gray-900">{lead.industry}</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 mb-1.5">Business Unit</p>
                        <Badge variant="outline" className="text-xs font-medium border-gray-300">
                          {lead.businessUnit}
                        </Badge>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 mb-1">Supply Chain</p>
                        <p className="text-sm font-medium text-gray-900">{lead.supplyChainRole}</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 mb-1.5">Lead Source</p>
                        <Badge variant="outline" className="text-xs border-gray-300">
                          <Tag className="h-3 w-3 mr-1" />
                          {lead.source}
                        </Badge>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 mb-1.5">Service Tags</p>
                        <div className="flex flex-wrap gap-1.5">
                          {lead.services.map((service) => (
                            <Badge
                              key={service}
                              className="text-xs bg-[#7BC9A6] text-white border-0 hover:bg-[#6BB896]"
                            >
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-gray-100">
                        <p className="text-xs text-gray-500 mb-1">Deal Value</p>
                        <p className="text-base font-semibold text-gray-900">
                          ฿{lead.estimatedValue.toLocaleString()}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 mb-1">Closing Date</p>
                        <p className="text-sm font-medium text-gray-900">{lead.expectedCloseDate}</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 mb-1.5">Owner</p>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-[#7BC9A6] text-white text-xs">
                              SC
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium text-gray-900">{lead.assignedTo}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Related Deals Card */}
                <Card className="shadow-sm border-gray-200 rounded-xl">
                  <CardContent className="p-5">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Related Deals</h3>

                    {lead.deals.map((deal) => (
                      <div key={deal.id} className="space-y-2">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{deal.name}</p>
                          <p className="text-xs text-gray-500">{deal.id}</p>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-500">Progress</span>
                            <span className="text-xs font-medium text-gray-900">{deal.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${deal.progress}%` }}
                            />
                          </div>
                        </div>

                        <div>
                          <Badge variant="outline" className="text-xs border-gray-300">
                            {deal.stage}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Fill remaining space */}
              <div className="flex-1 space-y-5">
                {/* Duplicate Warning Card - TOP PRIORITY - Expandable/Collapsible */}
                <Card className="shadow-sm border-amber-400 bg-amber-50 rounded-xl">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-amber-600" />
                        <h3 className="text-sm font-semibold text-amber-900">
                          Duplicate in other Business Units
                        </h3>
                      </div>
                      <button
                        onClick={() => setIsDuplicateExpanded(!isDuplicateExpanded)}
                        className="text-amber-700 hover:text-amber-900 transition-transform"
                      >
                        {isDuplicateExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    {isDuplicateExpanded ? (
                      <div className="space-y-3">
                        {lead.duplicates.map((dup) => (
                          <Card
                            key={dup.id}
                            className="shadow-sm border-amber-200 bg-white rounded-lg"
                          >
                            <CardContent className="p-3">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <p className="text-sm font-semibold text-gray-900">{dup.companyName}</p>
                                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                                    <span className="text-xs text-gray-600">{dup.id}</span>
                                    <span className="text-xs text-gray-400">•</span>
                                    <span className="text-xs text-gray-600">{dup.businessUnit}</span>
                                    <Badge className={`${getStatusColor(dup.status)} border text-xs`}>
                                      {dup.status}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-2 mt-1.5">
                                    <User className="h-3 w-3 text-gray-400" />
                                    <span className="text-xs text-gray-600">{dup.owner}</span>
                                    <span className="text-xs text-gray-400">•</span>
                                    <span className="text-xs text-gray-500">{dup.createdDate}</span>
                                  </div>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="ml-3 h-7 text-xs border-gray-300"
                                >
                                  <ExternalLink className="h-3 w-3 mr-1" />
                                  View
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-amber-800">
                        {lead.duplicates.length} duplicate leads found in other Business Units
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Activity Timeline Card */}
                <Card className="shadow-sm border-gray-200 rounded-xl">
                  <CardContent className="p-5">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Activity Timeline</h3>

                    <div className="space-y-4 relative">
                      {/* Vertical timeline line */}
                      <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200" />

                      {lead.activities.map((activity) => (
                        <div key={activity.id} className="flex gap-3 relative">
                          <div className="flex-shrink-0 relative z-10">
                            <div
                              className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                activity.type === "call"
                                  ? "bg-green-100"
                                  : activity.type === "email"
                                  ? "bg-blue-100"
                                  : "bg-purple-100"
                              }`}
                            >
                              {activity.type === "call" ? (
                                <Phone className="h-4 w-4 text-green-600" />
                              ) : activity.type === "email" ? (
                                <Mail className="h-4 w-4 text-blue-600" />
                              ) : (
                                <Users className="h-4 w-4 text-purple-600" />
                              )}
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                                <p className="text-sm text-gray-600 mt-0.5">{activity.description}</p>
                                <div className="flex items-center gap-2 mt-1.5">
                                  <User className="h-3 w-3 text-gray-400" />
                                  <span className="text-xs text-gray-500">{activity.by}</span>
                                </div>
                              </div>
                              <span className="text-xs text-gray-500 ml-3 flex-shrink-0">
                                {activity.date}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Notes Card */}
                <Card className="shadow-sm border-gray-200 rounded-xl">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-gray-900">Notes</h3>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Edit2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{lead.notes}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}