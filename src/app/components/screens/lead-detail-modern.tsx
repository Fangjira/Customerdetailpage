import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import {
  ArrowLeft,
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
  Eye,
  Clock,
  Edit2,
  Save,
  X,
  UserCheck,
  MoreVertical,
  MessageSquare,
  ExternalLink,
  AlertCircle,
  Users,
  Globe,
  CheckCircle2,
  Package,
  Lock,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface LeadDetailModernProps {
  onBack: () => void;
  leadId?: string;
}

export function LeadDetailModern({ onBack, leadId = "LEAD-001" }: LeadDetailModernProps) {
  const { t } = useTranslation();

  // Mock data สำหรับ Lead
  const mockLeads: any = {
    "LEAD-001": {
      id: "LEAD-001",
      companyName: "Global Traders Ltd.",
      contactName: "สมชาย วงศ์สกุล",
      email: "somchai@globaltraders.com",
      phone: "081-234-5678",
      status: "New",
      score: 75,
      source: "Trade Show",
      assignedTo: "Sarah Chen",
      businessUnit: "hcp",
      services: ["Freight", "Crossborder"],
      estimatedValue: 2500000,
      expectedCloseDate: "2025-06-30",
      address: "123 ถนนพระรามที่ 4 แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110",
      industry: "Manufacturing",
      supplyChainRole: "Importer",
      businessGroup: "automotive",
      notes: "Lead from trade show, scheduled initial consultation. Customer interested in cross-border logistics solutions.",
      lastContactDate: "2025-03-15",
      nextFollowUpDate: "2025-03-25",
      createdDate: "2025-03-05",
      deals: [
        { id: "DL-2024-016", name: "Cross-border E-commerce Deal", stage: "Approach", value: 2500000, progress: 25 },
      ],
      activities: [
        { id: 1, type: "call", date: "2025-03-15", time: "14:30", description: "โทรติดตาม - ลูกค้าสนใจบริการ Cross-border", by: "Sarah Chen" },
        { id: 2, type: "email", date: "2025-03-10", time: "10:15", description: "ส่งข้อมูลบริการเบื้องต้น", by: "Sarah Chen" },
        { id: 3, type: "meeting", date: "2025-03-05", time: "15:00", description: "พบที่งาน Trade Show - ได้ชื่อบัตร", by: "Sarah Chen" },
      ],
      duplicates: [
        {
          id: "LEAD-045",
          companyName: "Global Traders Ltd.",
          businessUnit: "freight-business",
          assignedTo: "Michael Wong",
          status: "Contacted",
        },
        {
          id: "LEAD-052",
          companyName: "Global Traders Co., Ltd.",
          businessUnit: "automotive",
          assignedTo: "Jennifer Park",
          status: "New",
        },
      ],
    },
  };

  const lead = mockLeads[leadId] || mockLeads["LEAD-001"];

  // Inline editing states
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isEditingBusiness, setIsEditingBusiness] = useState(false);
  const [isEditingDeal, setIsEditingDeal] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);

  // Edit form data
  const [editContactData, setEditContactData] = useState({
    contactName: lead.contactName,
    companyName: lead.companyName,
    phone: lead.phone,
    email: lead.email,
    address: lead.address,
  });

  const [editBusinessData, setEditBusinessData] = useState({
    industry: lead.industry,
    supplyChainRole: lead.supplyChainRole,
    businessUnit: lead.businessUnit,
    source: lead.source,
  });

  const [editDealData, setEditDealData] = useState({
    estimatedValue: lead.estimatedValue,
    expectedCloseDate: lead.expectedCloseDate,
    assignedTo: lead.assignedTo,
  });

  const [editNoteData, setEditNoteData] = useState(lead.notes);

  // Determine if this is own BU
  const currentUserBU = "hcp"; // In real app, get from auth context
  const isOwnBU = lead.businessUnit === currentUserBU;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Contacted":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "Qualified":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Proposal":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "Negotiation":
        return "bg-amber-100 text-amber-700 border-amber-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const handleSaveContact = () => {
    console.log("Saving contact:", editContactData);
    toast.success("Contact information updated successfully");
    setIsEditingContact(false);
  };

  const handleCancelContact = () => {
    setEditContactData({
      contactName: lead.contactName,
      companyName: lead.companyName,
      phone: lead.phone,
      email: lead.email,
      address: lead.address,
    });
    setIsEditingContact(false);
  };

  const handleSaveBusiness = () => {
    console.log("Saving business:", editBusinessData);
    toast.success("Business information updated successfully");
    setIsEditingBusiness(false);
  };

  const handleCancelBusiness = () => {
    setEditBusinessData({
      industry: lead.industry,
      supplyChainRole: lead.supplyChainRole,
      businessUnit: lead.businessUnit,
      source: lead.source,
    });
    setIsEditingBusiness(false);
  };

  const handleSaveDeal = () => {
    console.log("Saving deal:", editDealData);
    toast.success("Deal information updated successfully");
    setIsEditingDeal(false);
  };

  const handleCancelDeal = () => {
    setEditDealData({
      estimatedValue: lead.estimatedValue,
      expectedCloseDate: lead.expectedCloseDate,
      assignedTo: lead.assignedTo,
    });
    setIsEditingDeal(false);
  };

  const handleSaveNote = () => {
    console.log("Saving note:", editNoteData);
    toast.success("Note updated successfully");
    setIsEditingNote(false);
  };

  const handleCancelNote = () => {
    setEditNoteData(lead.notes);
    setIsEditingNote(false);
  };

  const handleConvertToCustomer = () => {
    toast.success("Converting to customer... 🎉");
  };

  const handleCreateDeal = () => {
    toast.success("Creating new deal... 📊");
  };

  const handleTransfer = () => {
    toast.info("Transfer lead dialog would open here");
  };

  const handleChangeStatus = () => {
    toast.info("Change status dialog would open here");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="px-4 sm:px-6 lg:px-8 py-4 max-w-[1600px] mx-auto">
          {/* Top Row: Back + Title + Actions */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="flex-shrink-0 h-10 w-10 p-0 rounded-lg hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                    {lead.companyName || lead.contactName}
                  </h1>
                  <span className="text-base text-gray-400">({lead.id})</span>
                </div>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <Badge className={`${getStatusColor(lead.status)} text-sm border font-medium`}>
                    {lead.status}
                  </Badge>
                  <Badge variant="outline" className="text-sm border-gray-300">
                    <TrendingUp className={`h-3.5 w-3.5 mr-1 ${getScoreColor(lead.score)}`} />
                    Score: {lead.score}
                  </Badge>
                  {!isOwnBU && (
                    <Badge variant="outline" className="text-sm border-amber-500 text-amber-700 bg-amber-50">
                      <Eye className="h-3.5 w-3.5 mr-1" />
                      Read Only
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
              {isOwnBU && (
                <>
                  <Button
                    onClick={handleTransfer}
                    variant="outline"
                    className="rounded-lg h-10 text-sm border-gray-300 hover:bg-gray-50"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Transfer
                  </Button>
                  <Button
                    onClick={handleChangeStatus}
                    variant="outline"
                    className="rounded-lg h-10 text-sm border-gray-300 hover:bg-gray-50"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Change Status
                  </Button>
                  <Button
                    onClick={handleConvertToCustomer}
                    className="bg-[#7BC9A6] hover:bg-[#6BB896] text-white rounded-lg h-10 text-sm font-medium shadow-sm"
                  >
                    <UserCheck className="h-4 w-4 mr-2" />
                    Convert to Customer
                  </Button>
                  <Button
                    onClick={handleCreateDeal}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg h-10 text-sm font-medium shadow-sm"
                  >
                    <Briefcase className="h-4 w-4 mr-2" />
                    Create Deal
                  </Button>
                  <Button variant="ghost" className="rounded-lg h-10 w-10 p-0 hover:bg-gray-100">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Action Buttons */}
          {isOwnBU && (
            <div className="flex lg:hidden gap-2 mt-3">
              <Button
                onClick={handleConvertToCustomer}
                className="flex-1 bg-[#7BC9A6] hover:bg-[#6BB896] text-white rounded-lg h-10 text-sm"
              >
                <UserCheck className="h-4 w-4 mr-1" />
                Convert
              </Button>
              <Button
                onClick={handleCreateDeal}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg h-10 text-sm"
              >
                <Briefcase className="h-4 w-4 mr-1" />
                Create Deal
              </Button>
              <Button variant="outline" className="rounded-lg h-10 w-10 p-0 border-gray-300">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Content - 2 Column Layout */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column - 35% width (5 of 12 columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Information Card */}
            <Card className="shadow-sm border-gray-200 rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">Contact Info</h2>
                  </div>
                  {isOwnBU && !isEditingContact && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditingContact(true)}
                      className="h-8 w-8 p-0 rounded-lg hover:bg-gray-100"
                    >
                      <Edit2 className="h-4 w-4 text-gray-500" />
                    </Button>
                  )}
                  {isEditingContact && (
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCancelContact}
                        className="h-8 w-8 p-0 rounded-lg hover:bg-gray-100"
                      >
                        <X className="h-4 w-4 text-gray-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleSaveContact}
                        className="h-8 w-8 p-0 rounded-lg hover:bg-green-50"
                      >
                        <Save className="h-4 w-4 text-green-600" />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {!isEditingContact ? (
                    <>
                      <div>
                        <p className="text-sm text-gray-500 mb-1.5">Contact Name</p>
                        <p className="text-base font-medium text-gray-900">{lead.contactName}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 mb-1.5">Company Name</p>
                        <p className="text-base font-medium text-gray-900">{lead.companyName || "-"}</p>
                      </div>

                      <Separator />

                      <div>
                        <p className="text-sm text-gray-500 mb-1.5">Phone</p>
                        <a
                          href={`tel:${lead.phone}`}
                          className="text-base font-medium text-blue-600 hover:text-blue-700 inline-flex items-center gap-2"
                        >
                          <Phone className="h-4 w-4" />
                          {lead.phone}
                        </a>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 mb-1.5">Email</p>
                        <a
                          href={`mailto:${lead.email}`}
                          className="text-base font-medium text-blue-600 hover:text-blue-700 inline-flex items-center gap-2 break-all"
                        >
                          <Mail className="h-4 w-4 flex-shrink-0" />
                          {lead.email}
                        </a>
                      </div>

                      {lead.address && (
                        <>
                          <Separator />
                          <div>
                            <p className="text-sm text-gray-500 mb-1.5">Address</p>
                            <div className="flex gap-2">
                              <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                              <p className="text-base text-gray-700">{lead.address}</p>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-700 font-medium mb-1.5 block">Contact Name</label>
                        <Input
                          value={editContactData.contactName}
                          onChange={(e) =>
                            setEditContactData({ ...editContactData, contactName: e.target.value })
                          }
                          className="h-10 text-base"
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-700 font-medium mb-1.5 block">Company Name</label>
                        <Input
                          value={editContactData.companyName}
                          onChange={(e) =>
                            setEditContactData({ ...editContactData, companyName: e.target.value })
                          }
                          className="h-10 text-base"
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-700 font-medium mb-1.5 block">Phone</label>
                        <Input
                          value={editContactData.phone}
                          onChange={(e) => setEditContactData({ ...editContactData, phone: e.target.value })}
                          className="h-10 text-base"
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-700 font-medium mb-1.5 block">Email</label>
                        <Input
                          type="email"
                          value={editContactData.email}
                          onChange={(e) => setEditContactData({ ...editContactData, email: e.target.value })}
                          className="h-10 text-base"
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-700 font-medium mb-1.5 block">Address</label>
                        <Textarea
                          value={editContactData.address}
                          onChange={(e) =>
                            setEditContactData({ ...editContactData, address: e.target.value })
                          }
                          rows={3}
                          className="text-base resize-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Business Information Card */}
            <Card className="shadow-sm border-gray-200 rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-purple-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">Business Info</h2>
                  </div>
                  {isOwnBU && !isEditingBusiness && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditingBusiness(true)}
                      className="h-8 w-8 p-0 rounded-lg hover:bg-gray-100"
                    >
                      <Edit2 className="h-4 w-4 text-gray-500" />
                    </Button>
                  )}
                  {isEditingBusiness && (
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCancelBusiness}
                        className="h-8 w-8 p-0 rounded-lg hover:bg-gray-100"
                      >
                        <X className="h-4 w-4 text-gray-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleSaveBusiness}
                        className="h-8 w-8 p-0 rounded-lg hover:bg-green-50"
                      >
                        <Save className="h-4 w-4 text-green-600" />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {!isEditingBusiness ? (
                    <>
                      <div>
                        <p className="text-sm text-gray-500 mb-1.5">Industry</p>
                        <p className="text-base font-medium text-gray-900">{lead.industry || "-"}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 mb-1.5">Supply Chain Role</p>
                        <p className="text-base font-medium text-gray-900">{lead.supplyChainRole || "-"}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 mb-1.5">Business Unit</p>
                        <Badge variant="outline" className="text-sm font-medium border-gray-300">
                          {lead.businessUnit.toUpperCase()}
                        </Badge>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 mb-1.5">Lead Source</p>
                        <Badge variant="outline" className="text-sm border-gray-300">
                          <Tag className="h-3.5 w-3.5 mr-1" />
                          {lead.source}
                        </Badge>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-700 font-medium mb-1.5 block">Industry</label>
                        <Input
                          value={editBusinessData.industry}
                          onChange={(e) =>
                            setEditBusinessData({ ...editBusinessData, industry: e.target.value })
                          }
                          className="h-10 text-base"
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-700 font-medium mb-1.5 block">Supply Chain Role</label>
                        <Input
                          value={editBusinessData.supplyChainRole}
                          onChange={(e) =>
                            setEditBusinessData({ ...editBusinessData, supplyChainRole: e.target.value })
                          }
                          className="h-10 text-base"
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-700 font-medium mb-1.5 block">Business Unit</label>
                        <Input
                          value={editBusinessData.businessUnit}
                          onChange={(e) =>
                            setEditBusinessData({ ...editBusinessData, businessUnit: e.target.value })
                          }
                          className="h-10 text-base"
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-700 font-medium mb-1.5 block">Lead Source</label>
                        <Input
                          value={editBusinessData.source}
                          onChange={(e) =>
                            setEditBusinessData({ ...editBusinessData, source: e.target.value })
                          }
                          className="h-10 text-base"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tags Card */}
            <Card className="shadow-sm border-gray-200 rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center">
                    <Tag className="h-5 w-5 text-green-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Tags</h2>
                </div>

                <div className="flex flex-wrap gap-2">
                  {lead.services.length > 0 ? (
                    lead.services.map((service: string) => (
                      <Badge
                        key={service}
                        className="text-sm capitalize bg-[#7BC9A6] text-white hover:bg-[#6BB896] cursor-pointer px-3 py-1.5 rounded-full font-medium"
                      >
                        {service}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No tags</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Deal Value & Close Date Card */}
            <Card className="shadow-sm border-gray-200 rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-amber-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">Deal Information</h2>
                  </div>
                  {isOwnBU && !isEditingDeal && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditingDeal(true)}
                      className="h-8 w-8 p-0 rounded-lg hover:bg-gray-100"
                    >
                      <Edit2 className="h-4 w-4 text-gray-500" />
                    </Button>
                  )}
                  {isEditingDeal && (
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCancelDeal}
                        className="h-8 w-8 p-0 rounded-lg hover:bg-gray-100"
                      >
                        <X className="h-4 w-4 text-gray-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleSaveDeal}
                        className="h-8 w-8 p-0 rounded-lg hover:bg-green-50"
                      >
                        <Save className="h-4 w-4 text-green-600" />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {!isEditingDeal ? (
                    <>
                      <div>
                        <p className="text-sm text-gray-500 mb-1.5">Estimated Value</p>
                        <p className="text-xl font-semibold text-gray-900">
                          ฿{lead.estimatedValue.toLocaleString()}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 mb-1.5">Expected Close Date</p>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <p className="text-base font-medium text-gray-900">{lead.expectedCloseDate}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 mb-1.5">Owner</p>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-[#7BC9A6] flex items-center justify-center">
                            <User className="h-4 w-4 text-white" />
                          </div>
                          <p className="text-base font-medium text-gray-900">{lead.assignedTo}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-700 font-medium mb-1.5 block">Estimated Value</label>
                        <Input
                          type="number"
                          value={editDealData.estimatedValue}
                          onChange={(e) =>
                            setEditDealData({ ...editDealData, estimatedValue: Number(e.target.value) })
                          }
                          className="h-10 text-base"
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-700 font-medium mb-1.5 block">
                          Expected Close Date
                        </label>
                        <Input
                          type="date"
                          value={editDealData.expectedCloseDate}
                          onChange={(e) =>
                            setEditDealData({ ...editDealData, expectedCloseDate: e.target.value })
                          }
                          className="h-10 text-base"
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-700 font-medium mb-1.5 block">Owner</label>
                        <Input
                          value={editDealData.assignedTo}
                          onChange={(e) =>
                            setEditDealData({ ...editDealData, assignedTo: e.target.value })
                          }
                          className="h-10 text-base"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Related Deals Card */}
            {lead.deals && lead.deals.length > 0 && (
              <Card className="shadow-sm border-gray-200 rounded-xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-blue-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">Related Deals</h2>
                  </div>

                  <div className="space-y-3">
                    {lead.deals.map((deal: any) => (
                      <div
                        key={deal.id}
                        className="p-4 bg-gradient-to-r from-blue-50 to-blue-100/30 rounded-lg border border-blue-200 hover:border-blue-400 transition-all cursor-pointer hover:shadow-sm"
                      >
                        <div className="mb-3">
                          <h3 className="text-base font-semibold text-gray-900 mb-1">{deal.name}</h3>
                          <p className="text-sm text-gray-600">{deal.id}</p>
                        </div>

                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Progress</span>
                            <span className="text-sm font-semibold text-gray-900">{deal.progress}%</span>
                          </div>
                          <div className="w-full bg-white/80 rounded-full h-2.5">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full transition-all"
                              style={{ width: `${deal.progress}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <Badge variant="outline" className="text-xs border-blue-300">
                            {deal.stage}
                          </Badge>
                          <span className="font-semibold text-blue-600">
                            ฿{(deal.value / 1000000).toFixed(1)}M
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - 65% width (7 of 12 columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Upcoming Task - Highlighted */}
            <Card className="shadow-md border-[#7BC9A6] bg-gradient-to-br from-[#7BC9A6]/10 via-white to-white rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="h-12 w-12 rounded-full bg-[#7BC9A6] flex items-center justify-center shadow-sm">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Upcoming Task</h3>
                    <p className="text-sm text-gray-600">Next Follow-up Scheduled</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 pl-16">
                  <Calendar className="h-5 w-5 text-[#7BC9A6]" />
                  <span className="text-xl font-semibold text-gray-900">{lead.nextFollowUpDate}</span>
                  <Badge className="ml-2 bg-[#7BC9A6] text-white border-0 px-3 py-1">Due in 2 days</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Duplicate Warning */}
            {lead.duplicates && lead.duplicates.length > 0 && (
              <Card className="shadow-sm border-amber-400 bg-amber-50/50 rounded-xl">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                    <h3 className="text-base font-semibold text-amber-900">Duplicate Alert</h3>
                  </div>
                  <p className="text-sm text-amber-800 mb-4">
                    {lead.duplicates.length} potential duplicate(s) found in other Business Units
                  </p>

                  <div className="space-y-2">
                    {lead.duplicates.map((dup: any) => (
                      <div key={dup.id} className="p-3 bg-white rounded-lg border border-amber-300 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-900">{dup.companyName}</p>
                            <p className="text-xs text-gray-600 mt-1">
                              {dup.id} • {dup.businessUnit.toUpperCase()} • {dup.assignedTo}
                            </p>
                          </div>
                          <Button variant="outline" size="sm" className="text-xs ml-3 rounded-lg">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Activity Timeline */}
            <Card className="shadow-sm border-gray-200 rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Activity Timeline</h2>
                </div>

                <div className="space-y-6 relative">
                  {/* Vertical timeline line */}
                  <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200" />

                  {lead.activities &&
                    lead.activities.map((activity: any, index: number) => (
                      <div key={activity.id} className="flex gap-4 relative">
                        <div className="flex-shrink-0 relative z-10">
                          <div
                            className={`h-10 w-10 rounded-full flex items-center justify-center shadow-sm ${
                              activity.type === "call"
                                ? "bg-green-100 border-2 border-green-300"
                                : activity.type === "email"
                                ? "bg-blue-100 border-2 border-blue-300"
                                : "bg-purple-100 border-2 border-purple-300"
                            }`}
                          >
                            {activity.type === "call" ? (
                              <Phone className="h-5 w-5 text-green-600" />
                            ) : activity.type === "email" ? (
                              <Mail className="h-5 w-5 text-blue-600" />
                            ) : (
                              <Users className="h-5 w-5 text-purple-600" />
                            )}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0 pb-6">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h4 className="text-base font-semibold text-gray-900 mb-1">
                                {activity.type === "call"
                                  ? "Phone Call"
                                  : activity.type === "email"
                                  ? "Email Sent"
                                  : "Meeting"}
                              </h4>
                              <p className="text-base text-gray-700 leading-relaxed">{activity.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 mt-3">
                            <div className="flex items-center gap-2">
                              <div className="h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center">
                                <User className="h-4 w-4 text-gray-600" />
                              </div>
                              <span className="text-sm text-gray-600 font-medium">{activity.by}</span>
                            </div>
                            <span className="text-sm text-gray-500">
                              {activity.date} • {activity.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Notes Section */}
            {lead.notes && (
              <Card className="shadow-sm border-gray-200 rounded-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-gray-600" />
                      </div>
                      <h2 className="text-lg font-semibold text-gray-900">Notes</h2>
                    </div>
                    {isOwnBU && !isEditingNote && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsEditingNote(true)}
                        className="h-8 w-8 p-0 rounded-lg hover:bg-gray-100"
                      >
                        <Edit2 className="h-4 w-4 text-gray-500" />
                      </Button>
                    )}
                    {isEditingNote && (
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleCancelNote}
                          className="h-8 w-8 p-0 rounded-lg hover:bg-gray-100"
                        >
                          <X className="h-4 w-4 text-gray-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleSaveNote}
                          className="h-8 w-8 p-0 rounded-lg hover:bg-green-50"
                        >
                          <Save className="h-4 w-4 text-green-600" />
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {!isEditingNote ? (
                    <p className="text-base text-gray-700 leading-relaxed">{lead.notes}</p>
                  ) : (
                    <Textarea
                      value={editNoteData}
                      onChange={(e) => setEditNoteData(e.target.value)}
                      rows={5}
                      className="text-base resize-none"
                      placeholder="Add your notes here..."
                    />
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
