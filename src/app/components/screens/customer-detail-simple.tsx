import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  ChevronLeft,
  Plus,
  Edit,
  MapPin,
  Mail,
  Phone,
  Clock,
  Building2,
  Users,
  FileText,
  BarChart3,
  Tag,
  ExternalLink,
} from "lucide-react";

export function CustomerDetailSimple({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState("overview");

  const customer = {
    id: "CUST-2024-0892",
    companyName: "Global Freight Solutions Inc.",
    industry: "Logistics & Transportation",
    taxId: "0105558123456",
    status: "Active",
    totalValue: "$1.2M",
    totalDeals: 156,
    totalQuotes: 8,
    memberSince: "2019",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 max-w-[1600px] mx-auto">
        {/* Back Button */}
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ChevronLeft className="h-5 w-5 mr-2" />
          กลับ
        </Button>

        {/* Header */}
        <Card className="mb-6">
          <CardContent className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-3">{customer.companyName}</h1>
                <p className="text-gray-600 text-lg mb-4">{customer.id}</p>
                <div className="flex gap-3">
                  <Badge className="bg-purple-100 text-purple-700 text-sm px-4 py-2">
                    ลูกค้าองค์กร
                  </Badge>
                  <Badge className="bg-green-100 text-green-700 text-sm px-4 py-2">
                    ใช้งานอยู่
                  </Badge>
                </div>
              </div>

              <div className="flex gap-3">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-5 w-5 mr-2" />
                  สร้างกิจกรรม
                </Button>
                <Button size="lg" variant="outline">
                  <Edit className="h-5 w-5 mr-2" />
                  แก้ไข
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-8 pt-6 border-t">
              <div>
                <p className="text-gray-600 mb-2">มูลค่าทั้งหมด</p>
                <p className="text-4xl font-bold">{customer.totalValue}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-2">ข้อตกลง</p>
                <p className="text-4xl font-bold">{customer.totalDeals}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-2">ใบเสนอราคา</p>
                <p className="text-4xl font-bold">{customer.totalQuotes}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-2">สมาชิกตั้งแต่</p>
                <p className="text-4xl font-bold">{customer.memberSince}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 h-auto p-2 bg-white border rounded-xl">
            <TabsTrigger 
              value="overview" 
              className="text-base py-4 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Building2 className="h-5 w-5 mr-2" />
              ข้อมูลทั่วไป
            </TabsTrigger>
            <TabsTrigger 
              value="contacts" 
              className="text-base py-4 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Users className="h-5 w-5 mr-2" />
              ผู้ติดต่อ
            </TabsTrigger>
            <TabsTrigger 
              value="deals" 
              className="text-base py-4 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <FileText className="h-5 w-5 mr-2" />
              ดีล & ใบเสนอ
            </TabsTrigger>
            <TabsTrigger 
              value="analysis" 
              className="text-base py-4 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              การวิเคราะห์
            </TabsTrigger>
            <TabsTrigger 
              value="organization" 
              className="text-base py-4 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Building2 className="h-5 w-5 mr-2" />
              องค์กร
            </TabsTrigger>
            <TabsTrigger 
              value="integrations" 
              className="text-base py-4 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              เชื่อมต่อ
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Overview */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">ข้อมูลบริษัท</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-8 text-lg">
                  <div>
                    <p className="text-gray-600 mb-2">ชื่อบริษัท</p>
                    <p className="font-semibold">{customer.companyName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-2">Tax ID</p>
                    <p className="font-semibold">{customer.taxId}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-2">อุตสาหกรรม</p>
                    <p className="font-semibold">{customer.industry}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-2">บริษัทแม่</p>
                    <p className="font-semibold">Global Shipping Alliance</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {["TH-MY", "Cross Border", "FTL", "KA"].map((tag) => (
                    <Badge key={tag} className="bg-gray-700 text-white text-base px-6 py-3">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 2: Contacts */}
          <TabsContent value="contacts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">ผู้ติดต่อหลัก</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "John Davidson", title: "Operations Director", email: "john.d@globalfreight.com", phone: "+1 (555) 123-4567", isPrimary: true },
                  { name: "Sarah Chen", title: "Senior Account Manager", email: "sarah.chen@newuscrm.com", phone: "+1 (555) 234-5678", isPrimary: false },
                ].map((contact, i) => (
                  <div key={i} className={`p-6 border-2 rounded-xl ${contact.isPrimary ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-gray-300'}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-xl font-bold">{contact.name}</h3>
                      {contact.isPrimary && (
                        <Badge className="bg-blue-600 text-white">Primary</Badge>
                      )}
                    </div>
                    <p className="text-gray-600 text-lg mb-4">{contact.title}</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-base">
                        <Mail className="h-5 w-5 text-gray-500" />
                        <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                          {contact.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-3 text-base">
                        <Phone className="h-5 w-5 text-gray-500" />
                        <a href={`tel:${contact.phone}`} className="text-blue-600 hover:underline">
                          {contact.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">ผู้ติดต่อสำคัญ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "คุณ สมชาย ใจดี", position: "Purchasing manager", role: "Key decision" },
                  { name: "คุณ วรรณพร", position: "General manager", role: "" },
                ].map((contact, i) => (
                  <div key={i} className="p-6 border-2 border-gray-300 rounded-xl hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold">{contact.name}</h3>
                      {contact.role && (
                        <Badge className="bg-orange-100 text-orange-700 text-sm px-4 py-2">
                          {contact.role}
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 text-lg">{contact.position}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 3: Deals & Quotes */}
          <TabsContent value="deals" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">ดีลที่เกี่ยวข้อง</CardTitle>
                  <Button>ดูทั้งหมด</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { id: "CF-2024-091", name: "ข้อ 18# ค่าบริการคลัง", value: "฿10,000,000", status: "Hot", stage: "Negotiation" },
                  { id: "CF-2024-101", name: "ERP upgrade MAL", value: "฿8,500,000", status: "Medium", stage: "สร้างข้อเสนอ" },
                ].map((deal) => (
                  <div key={deal.id} className="p-6 border-2 border-gray-300 rounded-xl hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <p className="text-xl font-bold text-blue-600">{deal.id}</p>
                          <Badge className={`text-sm px-4 py-2 ${deal.status === "Hot" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>
                            {deal.status}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{deal.name}</h3>
                        <Badge className="bg-purple-100 text-purple-700 px-4 py-2">
                          {deal.stage}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{deal.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">ใบเสนอราคา</CardTitle>
                  <Button>ดูทั้งหมด</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { id: "QT-20-001", name: "ข้อ 15# ค่าบริการคลัง + H&W", value: "฿3,500,000", status: "Draft" },
                  { id: "QT-20-002", name: "ระบบคลังสินค้าขนาดกลาง", value: "฿6,800,000", status: "Sent" },
                ].map((quote) => (
                  <div key={quote.id} className="p-6 border-2 border-gray-300 rounded-xl hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <FileText className="h-6 w-6 text-gray-500" />
                          <p className="text-base text-gray-600">{quote.id}</p>
                          <Badge className={`${quote.status === "Sent" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}>
                            {quote.status}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-semibold">{quote.name}</h3>
                      </div>
                      <p className="text-2xl font-bold">{quote.value}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 4: Analysis */}
          <TabsContent value="analysis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Win/Loss Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-12">
                  {/* Key Win */}
                  <div>
                    <h3 className="text-xl font-bold text-green-700 mb-6">✓ Key Win</h3>
                    <div className="space-y-6">
                      {[
                        { name: "Cross Border", percent: 40 },
                        { name: "Transportation", percent: 30 },
                        { name: "Service", percent: 20 },
                        { name: "Customs", percent: 10 },
                      ].map((item) => (
                        <div key={item.name}>
                          <div className="flex justify-between mb-2">
                            <span className="text-lg font-medium">{item.name}</span>
                            <span className="text-lg font-bold text-green-700">{item.percent}%</span>
                          </div>
                          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-green-600 rounded-full" style={{ width: `${item.percent}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Loss */}
                  <div>
                    <h3 className="text-xl font-bold text-red-700 mb-6">✗ Key Loss</h3>
                    <div className="space-y-6">
                      {[
                        { name: "Cross Border", percent: 40 },
                        { name: "Customs", percent: 20 },
                        { name: "Pricing", percent: 20 },
                        { name: "Service", percent: 10 },
                      ].map((item) => (
                        <div key={item.name}>
                          <div className="flex justify-between mb-2">
                            <span className="text-lg font-medium">{item.name}</span>
                            <span className="text-lg font-bold text-red-700">{item.percent}%</span>
                          </div>
                          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-red-600 rounded-full" style={{ width: `${item.percent}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 5: Organization */}
          <TabsContent value="organization" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Organization Group</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "SCG/WD", contact: "Somchai Intdee", title: "Assistant VP" },
                  { name: "SCG/WD Freight", contact: "Veerachai Uksemak", title: "Manager" },
                ].map((org, i) => (
                  <div key={i} className="flex items-center gap-6 p-6 border-2 border-gray-300 rounded-xl hover:bg-gray-50">
                    <div className="h-16 w-16 bg-blue-500 rounded-xl flex items-center justify-center">
                      <Building2 className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{org.name}</h3>
                      <p className="text-lg text-gray-600">{org.contact}</p>
                      <p className="text-base text-gray-500">{org.title}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 6: Integrations */}
          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">ระบบที่เชื่อมต่อ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { name: "SocoaID", code: "SO-2024-8921", color: "blue" },
                    { name: "DOOMEE/Engage", code: "Active", color: "purple" },
                    { name: "HR System", code: "Workday", color: "green" },
                  ].map((system) => (
                    <a
                      key={system.name}
                      href="#"
                      className={`flex items-center gap-4 p-6 border-2 border-${system.color}-300 rounded-xl bg-${system.color}-50 hover:bg-${system.color}-100 transition-colors`}
                    >
                      <div className={`h-16 w-16 bg-${system.color}-600 rounded-full flex items-center justify-center`}>
                        <span className="text-white text-lg font-bold">{system.name.substring(0, 2)}</span>
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium text-${system.color}-600 mb-1`}>{system.name}</p>
                        <p className={`text-lg font-bold text-${system.color}-900`}>{system.code}</p>
                      </div>
                      <ExternalLink className={`h-5 w-5 text-${system.color}-600`} />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
