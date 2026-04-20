import { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  ChevronLeft,
  Plus,
  Building2,
  Users,
  FileText,
  BarChart3,
  ExternalLink,
  Phone,
  Mail,
} from "lucide-react";

export function CustomerDetailMobile({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Top Bar */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button className="p-2 -mr-2">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>

      {/* Header Card */}
      <div className="p-4">
        <Card className="p-6 shadow-lg">
          {/* Company Name & Button */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-2">
                Global Freight Solutions Inc.
              </h1>
              <p className="text-sm text-gray-600 mb-4">CUST-2024-0892</p>
              
              {/* Badges */}
              <div className="flex gap-2">
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 px-4 py-1.5 rounded-full">
                  ลูกค้าองค์กร
                </Badge>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 px-4 py-1.5 rounded-full">
                  ใช้งานอยู่
                </Badge>
              </div>
            </div>

            <Button 
              size="sm"
              className="bg-green-500 hover:bg-green-600 text-white rounded-full px-4 ml-2 flex-shrink-0"
            >
              <Plus className="h-4 w-4 mr-1" />
              สร้างกิจกรรม
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4 pt-4 border-t">
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-1">มูลค่าทั้งหมด</p>
              <p className="text-2xl font-bold text-gray-900">$1.2M</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-1">ข้อตกลง</p>
              <p className="text-2xl font-bold text-gray-900">56</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-1">ใบเสนอราคา</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-1">สมาชิกเมื่อ</p>
              <p className="text-2xl font-bold text-gray-900">2019</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap transition-colors ${
              activeTab === "overview"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            <Building2 className="h-4 w-4" />
            ข้อมูลทั่วไป
          </button>
          <button
            onClick={() => setActiveTab("contacts")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap transition-colors ${
              activeTab === "contacts"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            <Users className="h-4 w-4" />
            ผู้ติดต่อ
          </button>
          <button
            onClick={() => setActiveTab("deals")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap transition-colors ${
              activeTab === "deals"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            <FileText className="h-4 w-4" />
            ดีล & ใบเสนอ
          </button>
          <button
            onClick={() => setActiveTab("analysis")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap transition-colors ${
              activeTab === "analysis"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            การวิเคราะห์
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 space-y-4">
        {activeTab === "overview" && (
          <>
            {/* System Connections */}
            <div>
              <h2 className="text-lg font-bold mb-3">ระบบที่เชื่อมต่อ</h2>
              <div className="grid grid-cols-3 gap-3">
                <a href="#" className="block">
                  <Card className="p-4 text-center hover:shadow-md transition-shadow">
                    <div className="h-12 w-12 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">SO</span>
                    </div>
                    <p className="text-xs font-medium text-blue-600 mb-1">Socoa</p>
                    <p className="text-xs font-bold text-gray-900">SO-2024-8921</p>
                  </Card>
                </a>

                <a href="#" className="block">
                  <Card className="p-4 text-center hover:shadow-md transition-shadow">
                    <div className="h-12 w-12 bg-purple-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">DO</span>
                    </div>
                    <p className="text-xs font-medium text-purple-600 mb-1">DOOMEE</p>
                    <p className="text-xs font-bold text-gray-900">Active</p>
                  </Card>
                </a>

                <a href="#" className="block">
                  <Card className="p-4 text-center hover:shadow-md transition-shadow">
                    <div className="h-12 w-12 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">HR</span>
                    </div>
                    <p className="text-xs font-medium text-green-600 mb-1">HR System</p>
                    <p className="text-xs font-bold text-gray-900">Workday</p>
                  </Card>
                </a>
              </div>
            </div>

            {/* Company Info */}
            <Card className="p-5">
              <h3 className="text-base font-bold mb-4">ข้อมูลบริษัท</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-600 mb-1">อุตสาหกรรม</p>
                  <p className="text-sm font-medium">Logistics & Transportation</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Tax ID</p>
                  <p className="text-sm font-medium">0105558123456</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">บริษัทแม่</p>
                  <p className="text-sm font-medium">Global Shipping Alliance</p>
                </div>
              </div>
            </Card>

            {/* Tags */}
            <Card className="p-5">
              <h3 className="text-base font-bold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {["TH-MY", "Cross Border", "FTL", "KA"].map((tag) => (
                  <Badge key={tag} className="bg-gray-700 text-white px-3 py-1.5 rounded-full">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          </>
        )}

        {activeTab === "contacts" && (
          <>
            {/* Primary Contacts */}
            <div>
              <h2 className="text-lg font-bold mb-3">ผู้ติดต่อหลัก</h2>
              <div className="space-y-3">
                <Card className="p-5 border-2 border-blue-200 bg-blue-50">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-base font-bold mb-1">John Davidson</h3>
                      <p className="text-sm text-gray-600">Operations Director</p>
                    </div>
                    <Badge className="bg-blue-600 text-white text-xs px-2 py-1">
                      Primary
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <a href="mailto:john.d@globalfreight.com" className="flex items-center gap-2 text-sm text-blue-600">
                      <Mail className="h-4 w-4" />
                      john.d@globalfreight.com
                    </a>
                    <a href="tel:+15551234567" className="flex items-center gap-2 text-sm text-blue-600">
                      <Phone className="h-4 w-4" />
                      +1 (555) 123-4567
                    </a>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="mb-3">
                    <h3 className="text-base font-bold mb-1">Sarah Chen</h3>
                    <p className="text-sm text-gray-600">Senior Account Manager</p>
                  </div>
                  <div className="space-y-2">
                    <a href="mailto:sarah.chen@newuscrm.com" className="flex items-center gap-2 text-sm text-blue-600">
                      <Mail className="h-4 w-4" />
                      sarah.chen@newuscrm.com
                    </a>
                    <a href="tel:+15552345678" className="flex items-center gap-2 text-sm text-blue-600">
                      <Phone className="h-4 w-4" />
                      +1 (555) 234-5678
                    </a>
                  </div>
                </Card>
              </div>
            </div>

            {/* Key Contacts */}
            <div>
              <h2 className="text-lg font-bold mb-3">ผู้ติดต่อสำคัญ</h2>
              <div className="space-y-3">
                <Card className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-bold mb-1">คุณ สมชาย ใจดี</h3>
                      <p className="text-sm text-gray-600">Purchasing manager</p>
                    </div>
                    <Badge className="bg-orange-100 text-orange-700 text-xs px-2 py-1">
                      Key decision
                    </Badge>
                  </div>
                </Card>

                <Card className="p-5">
                  <h3 className="text-base font-bold mb-1">คุณ วรรณพร</h3>
                  <p className="text-sm text-gray-600">General manager</p>
                </Card>
              </div>
            </div>
          </>
        )}

        {activeTab === "deals" && (
          <>
            {/* Deals */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold">ดีลที่เกี่ยวข้อง</h2>
                <button className="text-sm text-blue-600">ดูทั้งหมด</button>
              </div>
              <div className="space-y-3">
                <Card className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-sm font-bold text-blue-600">CF-2024-091</p>
                        <Badge className="bg-red-100 text-red-700 text-xs px-2 py-1">
                          Hot
                        </Badge>
                      </div>
                      <h3 className="text-base font-bold mb-1">ข้อ 18# ค่าบริการคลัง</h3>
                      <Badge className="bg-purple-100 text-purple-700 text-xs px-2 py-1">
                        Negotiation
                      </Badge>
                    </div>
                    <p className="text-lg font-bold text-gray-900">฿10M</p>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-sm font-bold text-blue-600">CF-2024-101</p>
                        <Badge className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1">
                          Medium
                        </Badge>
                      </div>
                      <h3 className="text-base font-bold mb-1">ERP upgrade MAL</h3>
                      <Badge className="bg-purple-100 text-purple-700 text-xs px-2 py-1">
                        สร้างข้อเสนอ
                      </Badge>
                    </div>
                    <p className="text-lg font-bold text-gray-900">฿8.5M</p>
                  </div>
                </Card>
              </div>
            </div>

            {/* Quotations */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold">ใบเสนอราคา</h2>
                <button className="text-sm text-blue-600">ดูทั้งหมด</button>
              </div>
              <div className="space-y-3">
                <Card className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-gray-500" />
                    <p className="text-xs text-gray-600">QT-20-001</p>
                    <Badge className="bg-gray-100 text-gray-700 text-xs px-2 py-1">
                      Draft
                    </Badge>
                  </div>
                  <h3 className="text-base font-bold mb-2">ข้อ 15# ค่าบริการคลัง + H&W</h3>
                  <p className="text-lg font-bold text-gray-900">฿3,500,000</p>
                </Card>

                <Card className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-gray-500" />
                    <p className="text-xs text-gray-600">QT-20-002</p>
                    <Badge className="bg-blue-100 text-blue-700 text-xs px-2 py-1">
                      Sent
                    </Badge>
                  </div>
                  <h3 className="text-base font-bold mb-2">ระบบคลังสินค้าขนาดกลาง</h3>
                  <p className="text-lg font-bold text-gray-900">฿6,800,000</p>
                </Card>
              </div>
            </div>
          </>
        )}

        {activeTab === "analysis" && (
          <Card className="p-5">
            <h2 className="text-lg font-bold mb-4">Win/Loss Analysis</h2>
            
            {/* Key Win */}
            <div className="mb-6">
              <h3 className="text-base font-bold text-green-700 mb-3">✓ Key Win</h3>
              <div className="space-y-3">
                {[
                  { name: "Cross Border", percent: 40 },
                  { name: "Transportation", percent: 30 },
                  { name: "Service", percent: 20 },
                  { name: "Customs", percent: 10 },
                ].map((item) => (
                  <div key={item.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="text-sm font-bold text-green-700">{item.percent}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-600 rounded-full" 
                        style={{ width: `${item.percent}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Loss */}
            <div>
              <h3 className="text-base font-bold text-red-700 mb-3">✗ Key Loss</h3>
              <div className="space-y-3">
                {[
                  { name: "Cross Border", percent: 40 },
                  { name: "Customs", percent: 20 },
                  { name: "Pricing", percent: 20 },
                  { name: "Service", percent: 10 },
                ].map((item) => (
                  <div key={item.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="text-sm font-bold text-red-700">{item.percent}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-600 rounded-full" 
                        style={{ width: `${item.percent}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 h-14 w-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center z-50">
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
}
