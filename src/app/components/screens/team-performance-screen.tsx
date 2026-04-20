import React, { useState } from 'react';
import { 
  Users, DollarSign, Handshake, Trophy, CalendarCheck, 
  ChartPie, CheckSquare, Briefcase, FileText, Car,
  Download, Filter, Search, AlertCircle, Clock,
  Info, Crown, Star, Check, Bell, Phone, Video,
  MapPin, Smile, Calendar, LayoutGrid, List, X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';

export function TeamPerformanceScreen() {
  const [activeTab, setActiveTab] = useState('todo');
  const [dealsView, setDealsView] = useState<'kanban' | 'table'>('kanban');
  const [quotationsView, setQuotationsView] = useState<'kanban' | 'table'>('kanban');
  const [visitsView, setVisitsView] = useState<'kanban' | 'table'>('kanban');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center py-3 gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <ChartPie className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ผลการปฏิบัติงานทีม</h1>
                <p className="text-sm text-gray-500">Team Sales - ภูมิภาคกรุงเทพฯ</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Select defaultValue="this-month">
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="this-week">สัปดาห์นี้</SelectItem>
                  <SelectItem value="this-month">เดือนนี้</SelectItem>
                  <SelectItem value="this-quarter">ไตรมาสนี้</SelectItem>
                  <SelectItem value="this-year">ปีนี้</SelectItem>
                  <SelectItem value="custom">กำหนดเอง</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-primary hover:bg-primary/90" size="sm">
                <Download size={16} className="mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        {/* Team KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Card 1: Total Revenue */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="text-green-600" size={20} />
                </div>
                <Badge className="bg-green-50 text-green-600 hover:bg-green-100 text-xs">+23.5%</Badge>
              </div>
              <h3 className="text-gray-500 text-xs font-medium mb-1">ยอดขายทีมรวม</h3>
              <p className="text-2xl font-bold text-gray-900 mb-2">฿8.4M</p>
              <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                <span>เป้าหมาย: ฿10M</span>
                <span className="font-medium text-primary">84%</span>
              </div>
              <Progress value={84} className="h-1.5" />
            </CardContent>
          </Card>

          {/* Card 2: Deals Closed */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Handshake className="text-blue-600" size={20} />
                </div>
                <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs">+12</Badge>
              </div>
              <h3 className="text-gray-500 text-xs font-medium mb-1">ดีลที่ปิดสำเร็จ</h3>
              <p className="text-2xl font-bold text-gray-900 mb-2">28 ดีล</p>
              <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                <span>เป้าหมาย: 35 ดีล</span>
                <span className="font-medium text-blue-600">80%</span>
              </div>
              <Progress value={80} className="h-1.5 bg-gray-200" />
            </CardContent>
          </Card>

          {/* Card 3: Win Rate */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Trophy className="text-purple-600" size={20} />
                </div>
                <Badge className="bg-purple-50 text-purple-600 hover:bg-purple-100 text-xs">+5%</Badge>
              </div>
              <h3 className="text-gray-500 text-xs font-medium mb-1">อัตราชนะเฉลี่ย</h3>
              <p className="text-2xl font-bold text-gray-900 mb-2">68%</p>
              <p className="text-xs text-gray-500">28 ชนะ / 41 ดีลทั้งหมด</p>
            </CardContent>
          </Card>

          {/* Card 4: Activities */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <CalendarCheck className="text-orange-600" size={20} />
                </div>
                <Badge className="bg-orange-50 text-orange-600 hover:bg-orange-100 text-xs">156</Badge>
              </div>
              <h3 className="text-gray-500 text-xs font-medium mb-1">กิจกรรมทั้งหมด</h3>
              <p className="text-2xl font-bold text-gray-900 mb-2">156</p>
              <p className="text-xs text-gray-500">เข้าเยี่ยม 68 | โทร 52 | Meeting 36</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Card>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="border-b border-gray-200 px-4">
              <TabsList className="h-auto p-0 bg-transparent border-0">
                <TabsTrigger 
                  value="todo"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3"
                >
                  <CheckSquare size={16} className="mr-2" />
                  <span className="text-sm">Team To-Do</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="deals"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3"
                >
                  <Briefcase size={16} className="mr-2" />
                  <span className="text-sm">Team Deals</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="quotations"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3"
                >
                  <FileText size={16} className="mr-2" />
                  <span className="text-sm">Team Quotations</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="visits"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3"
                >
                  <Car size={16} className="mr-2" />
                  <span className="text-sm">Team Visits</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Team To-Do Tab */}
            <TabsContent value="todo" className="p-4">
              <div className="mb-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input placeholder="ค้นหางาน..." className="w-full sm:w-64 h-9 text-sm" />
                  <Select defaultValue="all-status">
                    <SelectTrigger className="w-full sm:w-40 h-9 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-status">สถานะทั้งหมด</SelectItem>
                      <SelectItem value="not-started">Not Started</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all-members">
                    <SelectTrigger className="w-full sm:w-40 h-9 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-members">สมาชิกทั้งหมด</SelectItem>
                      <SelectItem value="somchai">สมชาย นาคทอง</SelectItem>
                      <SelectItem value="wanna">วรรณา ใจดี</SelectItem>
                      <SelectItem value="prasert">ประเสริฐ ทองดี</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <span className="text-sm text-gray-600 font-medium">รวม 47 งาน</span>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">งาน</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">ผู้รับผิดชอบ</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">สถานะ</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">ลำดับความสำคัญ</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">ครบกำหนด</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">เกี่ยวข้อง</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-gray-900">โทรติดตามใบเสนอราคา ABC Corp</p>
                        <p className="text-xs text-gray-500">ติดตามสถานะการพิจารณา</p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">SN</div>
                          <span className="text-sm text-gray-900">สมชาย</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-xs">In Progress</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs">
                          <Bell size={10} className="mr-1" />
                          Urgent
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-red-600 font-medium">วันนี้ 17:00</span>
                      </td>
                      <td className="px-4 py-3">
                        <a href="#" className="text-sm text-primary hover:underline">Deal #1234</a>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-gray-900">เตรียม Presentation สำหรับ XYZ Ltd</p>
                        <p className="text-xs text-gray-500">Meeting ครั้งต่อไป</p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">WK</div>
                          <span className="text-sm text-gray-900">วรรณา</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 text-xs">Not Started</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 text-xs">High</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-900">พรุ่งนี้</span>
                      </td>
                      <td className="px-4 py-3">
                        <a href="#" className="text-sm text-primary hover:underline">Deal #1256</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>

            {/* Team Deals Tab */}
            <TabsContent value="deals" className="p-4">
              <div className="mb-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                <div className="flex flex-col sm:flex-row gap-3 flex-1">
                  <Input placeholder="ค้นหาดีล..." className="w-full sm:w-64 h-9 text-sm" />
                  <Select defaultValue="all-stages">
                    <SelectTrigger className="w-full sm:w-40 h-9 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-stages">ขั้นตอนทั้งหมด</SelectItem>
                      <SelectItem value="prospect">Prospect</SelectItem>
                      <SelectItem value="qualification">Qualification</SelectItem>
                      <SelectItem value="proposal">Proposal</SelectItem>
                      <SelectItem value="negotiation">Negotiation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 font-medium">รวม 40 ดีล | มูลค่า ฿8.5M</span>
                  <div className="flex bg-gray-100 rounded-lg p-0.5">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-8 px-2 ${dealsView === 'kanban' ? 'bg-white shadow-sm' : ''}`}
                      onClick={() => setDealsView('kanban')}
                    >
                      <LayoutGrid size={14} className="mr-1.5" />
                      <span className="text-xs">Kanban</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-8 px-2 ${dealsView === 'table' ? 'bg-white shadow-sm' : ''}`}
                      onClick={() => setDealsView('table')}
                    >
                      <List size={14} className="mr-1.5" />
                      <span className="text-xs">Table</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Kanban View */}
              {dealsView === 'kanban' && (
                <div className="overflow-x-auto">
                  <div className="flex gap-3 min-w-max pb-4">
                    {/* Prospect Column */}
                    <div className="w-72 flex-shrink-0">
                      <div className="bg-blue-50 rounded-lg p-2.5 mb-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-blue-900">Prospect</h3>
                          <Badge className="bg-blue-200 text-blue-900 text-xs">8</Badge>
                        </div>
                        <p className="text-xs text-blue-700 mt-1">฿2.1M</p>
                      </div>
                      <div className="space-y-2">
                        <Card className="hover:shadow-md transition border-l-4 border-l-blue-500">
                          <CardContent className="p-3">
                            <h4 className="text-sm font-bold text-gray-900 mb-1">Import/Export Service</h4>
                            <p className="text-xs text-gray-600 mb-2">DEF Trading Ltd.</p>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-base font-bold text-gray-900">฿320,000</span>
                              <span className="text-xs font-medium text-blue-600">30%</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-1">
                                <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">PT</div>
                                <span className="text-gray-600">ประเสริฐ</span>
                              </div>
                              <span className="text-gray-500">5 เม.ย. 26</span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* Qualification Column */}
                    <div className="w-72 flex-shrink-0">
                      <div className="bg-green-50 rounded-lg p-2.5 mb-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-green-900">Qualification</h3>
                          <Badge className="bg-green-200 text-green-900 text-xs">12</Badge>
                        </div>
                        <p className="text-xs text-green-700 mt-1">฿3.2M</p>
                      </div>
                      <div className="space-y-2">
                        <Card className="hover:shadow-md transition border-l-4 border-l-green-500">
                          <CardContent className="p-3">
                            <h4 className="text-sm font-bold text-gray-900 mb-1">Warehouse Solution</h4>
                            <p className="text-xs text-gray-600 mb-2">XYZ Retail Group</p>
                            <div className="bg-red-50 border border-red-200 rounded p-1.5 mb-2 flex items-start">
                              <AlertCircle className="text-red-500 mr-1 flex-shrink-0" size={12} />
                              <span className="text-xs text-red-700">ไม่มีกิจกรรม 18 วัน</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-base font-bold text-gray-900">฿1,200,000</span>
                              <span className="text-xs font-medium text-yellow-600">40%</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-1">
                                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">WK</div>
                                <span className="text-gray-600">วรรณา</span>
                              </div>
                              <span className="text-gray-500">15 เม.ย. 26</span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* Proposal Column */}
                    <div className="w-72 flex-shrink-0">
                      <div className="bg-yellow-50 rounded-lg p-2.5 mb-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-yellow-900">Proposal</h3>
                          <Badge className="bg-yellow-200 text-yellow-900 text-xs">10</Badge>
                        </div>
                        <p className="text-xs text-yellow-700 mt-1">฿4.8M</p>
                      </div>
                      <div className="space-y-2">
                        <Card className="hover:shadow-md transition border-l-4 border-l-yellow-500">
                          <CardContent className="p-3">
                            <h4 className="text-sm font-bold text-gray-900 mb-1">Freight Service</h4>
                            <p className="text-xs text-gray-600 mb-2">ABC Manufacturing</p>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-base font-bold text-gray-900">฿850,000</span>
                              <span className="text-xs font-medium text-green-600">70%</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-1">
                                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">SN</div>
                                <span className="text-gray-600">สมชาย</span>
                              </div>
                              <span className="text-gray-500">30 มี.ค. 26</span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* Negotiation Column */}
                    <div className="w-72 flex-shrink-0">
                      <div className="bg-purple-50 rounded-lg p-2.5 mb-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-purple-900">Negotiation</h3>
                          <Badge className="bg-purple-200 text-purple-900 text-xs">6</Badge>
                        </div>
                        <p className="text-xs text-purple-700 mt-1">฿5.2M</p>
                      </div>
                      <div className="space-y-2">
                        <Card className="hover:shadow-md transition border-l-4 border-l-purple-500">
                          <CardContent className="p-3">
                            <h4 className="text-sm font-bold text-gray-900 mb-1">Logistics Partnership</h4>
                            <p className="text-xs text-gray-600 mb-2">MNO Corporation</p>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-base font-bold text-gray-900">฿1,800,000</span>
                              <span className="text-xs font-medium text-green-600">85%</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-1">
                                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">SN</div>
                                <span className="text-gray-600">สมชาย</span>
                              </div>
                              <span className="text-gray-500">28 มี.ค. 26</span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* Closed Won Column */}
                    <div className="w-72 flex-shrink-0">
                      <div className="bg-emerald-50 rounded-lg p-2.5 mb-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-emerald-900">Closed Won</h3>
                          <Badge className="bg-emerald-200 text-emerald-900 text-xs">4</Badge>
                        </div>
                        <p className="text-xs text-emerald-700 mt-1">฿2.8M</p>
                      </div>
                      <div className="space-y-2">
                        <Card className="hover:shadow-md transition border-l-4 border-l-emerald-500">
                          <CardContent className="p-3">
                            <h4 className="text-sm font-bold text-gray-900 mb-1">Transport Contract</h4>
                            <p className="text-xs text-gray-600 mb-2">GHI Industries</p>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-base font-bold text-gray-900">฿680,000</span>
                              <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                                <Check size={10} className="mr-1" />
                                Won
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-1">
                                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">WK</div>
                                <span className="text-gray-600">วรรณา</span>
                              </div>
                              <span className="text-gray-500">20 มี.ค. 26</span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Table View */}
              {dealsView === 'table' && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">ดีล</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">ลูกค้า</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">ขั้นตอน</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">มูลค่า</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">โอกาส</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">ผู้ดูแล</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">คาดว่าปิด</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-gray-900">Freight Service</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-900">ABC Manufacturing</p>
                        </td>
                        <td className="px-4 py-3">
                          <Badge className="bg-yellow-100 text-yellow-700 text-xs">Proposal</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-bold text-gray-900">฿850,000</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-green-600">70%</p>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">SN</div>
                            <span className="text-sm text-gray-900">สมชาย</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-900">30 มี.ค. 2026</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-gray-900">Warehouse Solution</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-900">XYZ Retail Group</p>
                        </td>
                        <td className="px-4 py-3">
                          <Badge className="bg-green-100 text-green-700 text-xs">Qualification</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-bold text-gray-900">฿1,200,000</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-yellow-600">40%</p>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">WK</div>
                            <span className="text-sm text-gray-900">วรรณา</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-orange-600">15 เม.ย. 2026</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-gray-900">Logistics Partnership</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-900">MNO Corporation</p>
                        </td>
                        <td className="px-4 py-3">
                          <Badge className="bg-purple-100 text-purple-700 text-xs">Negotiation</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-bold text-gray-900">฿1,800,000</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-green-600">85%</p>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">SN</div>
                            <span className="text-sm text-gray-900">สมชาย</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-900">28 มี.ค. 2026</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-gray-900">Import/Export Service</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-900">DEF Trading Ltd.</p>
                        </td>
                        <td className="px-4 py-3">
                          <Badge className="bg-blue-100 text-blue-700 text-xs">Prospect</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-bold text-gray-900">฿320,000</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-blue-600">30%</p>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">PT</div>
                            <span className="text-sm text-gray-900">ประเสริฐ</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-900">5 เม.ย. 2026</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>

            {/* Team Quotations Tab */}
            <TabsContent value="quotations" className="p-4">
              <div className="mb-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                <div className="flex flex-col sm:flex-row gap-3 flex-1">
                  <Input placeholder="ค้นหาใบเสนอราคา..." className="w-full sm:w-64 h-9 text-sm" />
                  <Select defaultValue="all-status">
                    <SelectTrigger className="w-full sm:w-40 h-9 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-status">สถานะทั้งหมด</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="pending">Pending Approval</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="sent">Sent</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-xs text-gray-600">รวม 32 ใบ</p>
                    <p className="text-sm font-bold text-gray-900">มูลค่า ฿12.8M</p>
                  </div>
                  <div className="flex bg-gray-100 rounded-lg p-0.5">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-8 px-2 ${quotationsView === 'kanban' ? 'bg-white shadow-sm' : ''}`}
                      onClick={() => setQuotationsView('kanban')}
                    >
                      <LayoutGrid size={14} className="mr-1.5" />
                      <span className="text-xs">Kanban</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-8 px-2 ${quotationsView === 'table' ? 'bg-white shadow-sm' : ''}`}
                      onClick={() => setQuotationsView('table')}
                    >
                      <List size={14} className="mr-1.5" />
                      <span className="text-xs">Table</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Kanban View - Quotations */}
              {quotationsView === 'kanban' && (
                <div className="overflow-x-auto">
                  <div className="flex gap-3 min-w-max pb-4">
                    {/* Draft */}
                    <div className="w-72 flex-shrink-0">
                      <div className="bg-gray-100 rounded-lg p-2.5 mb-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-gray-900">Draft</h3>
                          <Badge className="bg-gray-300 text-gray-900 text-xs">8</Badge>
                        </div>
                        <p className="text-xs text-gray-700 mt-1">฿3.2M</p>
                      </div>
                      <div className="space-y-2">
                        <Card className="hover:shadow-md transition">
                          <CardContent className="p-3">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="text-sm font-bold text-gray-900">QT-2026-089</h4>
                                <p className="text-xs text-gray-600">TUV Logistics</p>
                              </div>
                              <Badge className="bg-gray-100 text-gray-700 text-xs">Draft</Badge>
                            </div>
                            <p className="text-base font-bold text-gray-900 mb-2">฿420,000</p>
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-1">
                                <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">PT</div>
                                <span className="text-gray-600">ประเสริฐ</span>
                              </div>
                              <span className="text-gray-500">24 มี.ค.</span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* Pending Approval */}
                    <div className="w-72 flex-shrink-0">
                      <div className="bg-yellow-50 rounded-lg p-2.5 mb-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-yellow-900">Pending Approval</h3>
                          <Badge className="bg-yellow-200 text-yellow-900 text-xs">3</Badge>
                        </div>
                        <p className="text-xs text-yellow-700 mt-1">฿1.5M</p>
                      </div>
                      <div className="space-y-2">
                        <Card className="hover:shadow-md transition border-l-4 border-l-yellow-500">
                          <CardContent className="p-3">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="text-sm font-bold text-gray-900">QT-2026-092</h4>
                                <p className="text-xs text-gray-600">RST Manufacturing</p>
                              </div>
                              <Badge className="bg-yellow-100 text-yellow-700 text-xs">Pending</Badge>
                            </div>
                            <p className="text-base font-bold text-gray-900 mb-2">฿580,000</p>
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-1">
                                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">SN</div>
                                <span className="text-gray-600">สมชาย</span>
                              </div>
                              <span className="text-gray-500">2 วัน</span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* Approved */}
                    <div className="w-72 flex-shrink-0">
                      <div className="bg-blue-50 rounded-lg p-2.5 mb-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-blue-900">Approved</h3>
                          <Badge className="bg-blue-200 text-blue-900 text-xs">7</Badge>
                        </div>
                        <p className="text-xs text-blue-700 mt-1">฿2.8M</p>
                      </div>
                      <div className="space-y-2">
                        <Card className="hover:shadow-md transition border-l-4 border-l-blue-500">
                          <CardContent className="p-3">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="text-sm font-bold text-gray-900">QT-2026-087</h4>
                                <p className="text-xs text-gray-600">ABC Manufacturing</p>
                              </div>
                              <Badge className="bg-blue-100 text-blue-700 text-xs">Approved</Badge>
                            </div>
                            <p className="text-base font-bold text-gray-900 mb-2">฿850,000</p>
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-1">
                                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">SN</div>
                                <span className="text-gray-600">สมชาย</span>
                              </div>
                              <span className="text-gray-500">23 มี.ค.</span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* Sent */}
                    <div className="w-72 flex-shrink-0">
                      <div className="bg-purple-50 rounded-lg p-2.5 mb-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-purple-900">Sent</h3>
                          <Badge className="bg-purple-200 text-purple-900 text-xs">10</Badge>
                        </div>
                        <p className="text-xs text-purple-700 mt-1">฿3.9M</p>
                      </div>
                      <div className="space-y-2">
                        <Card className="hover:shadow-md transition border-l-4 border-l-purple-500">
                          <CardContent className="p-3">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="text-sm font-bold text-gray-900">QT-2026-081</h4>
                                <p className="text-xs text-gray-600">XYZ Retail</p>
                              </div>
                              <Badge className="bg-purple-100 text-purple-700 text-xs">Sent</Badge>
                            </div>
                            <p className="text-base font-bold text-gray-900 mb-2">฿1,200,000</p>
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-1">
                                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">WK</div>
                                <span className="text-gray-600">วรรณา</span>
                              </div>
                              <span className="text-gray-500">18 มี.ค.</span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* Accepted */}
                    <div className="w-72 flex-shrink-0">
                      <div className="bg-green-50 rounded-lg p-2.5 mb-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-green-900">Accepted</h3>
                          <Badge className="bg-green-200 text-green-900 text-xs">4</Badge>
                        </div>
                        <p className="text-xs text-green-700 mt-1">฿1.4M</p>
                      </div>
                      <div className="space-y-2">
                        <Card className="hover:shadow-md transition border-l-4 border-l-green-500">
                          <CardContent className="p-3">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="text-sm font-bold text-gray-900">QT-2026-075</h4>
                                <p className="text-xs text-gray-600">GHI Industries</p>
                              </div>
                              <Badge className="bg-green-100 text-green-700 text-xs">
                                <Check size={10} className="mr-1" />
                                Accepted
                              </Badge>
                            </div>
                            <p className="text-base font-bold text-gray-900 mb-2">฿680,000</p>
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-1">
                                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">WK</div>
                                <span className="text-gray-600">วรรณา</span>
                              </div>
                              <span className="text-gray-500">15 มี.ค.</span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Table View - Quotations */}
              {quotationsView === 'table' && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">เลขที่</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">ลูกค้า</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">สถานะ</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">มูลค่า</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">ผู้สร้าง</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">วันที่สร้าง</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">อัพเดทล่าสุด</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-gray-900">QT-2026-087</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-900">ABC Manufacturing</p>
                        </td>
                        <td className="px-4 py-3">
                          <Badge className="bg-blue-100 text-blue-700 text-xs">Approved</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-bold text-gray-900">฿850,000</p>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">SN</div>
                            <span className="text-sm text-gray-900">สมชาย</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-900">20 มี.ค. 2026</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-600">23 มี.ค. 2026</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-gray-900">QT-2026-081</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-900">XYZ Retail Group</p>
                        </td>
                        <td className="px-4 py-3">
                          <Badge className="bg-purple-100 text-purple-700 text-xs">Sent</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-bold text-gray-900">฿1,200,000</p>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">WK</div>
                            <span className="text-sm text-gray-900">วรรณา</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-900">15 มี.ค. 2026</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-600">18 มี.ค. 2026</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-gray-900">QT-2026-075</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-900">GHI Industries</p>
                        </td>
                        <td className="px-4 py-3">
                          <Badge className="bg-green-100 text-green-700 text-xs">
                            <Check size={10} className="mr-1" />
                            Accepted
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-bold text-gray-900">฿680,000</p>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">WK</div>
                            <span className="text-sm text-gray-900">วรรณา</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-900">10 มี.ค. 2026</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-600">15 มี.ค. 2026</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-gray-900">QT-2026-092</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-900">RST Manufacturing</p>
                        </td>
                        <td className="px-4 py-3">
                          <Badge className="bg-yellow-100 text-yellow-700 text-xs">Pending</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-bold text-gray-900">฿580,000</p>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">SN</div>
                            <span className="text-sm text-gray-900">สมชาย</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-900">22 มี.ค. 2026</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-600">23 มี.ค. 2026</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>

            {/* Team Visits Tab */}
            <TabsContent value="visits" className="p-4">
              <div className="mb-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                <div className="flex flex-col sm:flex-row gap-3 flex-1">
                  <Input placeholder="ค้นหาการเข้าเยี่ยม..." className="w-full sm:w-64 h-9 text-sm" />
                  <Select defaultValue="this-month">
                    <SelectTrigger className="w-full sm:w-40 h-9 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="this-week">สัปดาห์นี้</SelectItem>
                      <SelectItem value="this-month">เดือนนี้</SelectItem>
                      <SelectItem value="this-quarter">ไตรมาสนี้</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-xs text-gray-600">รวม 68 ครั้ง (เดือนนี้)</p>
                    <p className="text-sm font-bold text-primary">Conversion: 41%</p>
                  </div>
                  <div className="flex bg-gray-100 rounded-lg p-0.5">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-8 px-2 ${visitsView === 'kanban' ? 'bg-white shadow-sm' : ''}`}
                      onClick={() => setVisitsView('kanban')}
                    >
                      <LayoutGrid size={14} className="mr-1.5" />
                      <span className="text-xs">Kanban</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-8 px-2 ${visitsView === 'table' ? 'bg-white shadow-sm' : ''}`}
                      onClick={() => setVisitsView('table')}
                    >
                      <List size={14} className="mr-1.5" />
                      <span className="text-xs">Table</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Kanban View - Visits */}
              {visitsView === 'kanban' && (
                <div className="overflow-x-auto">
                  <div className="flex gap-3 min-w-max pb-4">
                    {/* Scheduled Column */}
                    <div className="w-80 flex-shrink-0">
                      <div className="bg-blue-50 rounded-lg p-2.5 mb-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-blue-900">Scheduled</h3>
                          <Badge className="bg-blue-200 text-blue-900 text-xs">16</Badge>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Card className="hover:shadow-md transition border-l-4 border-l-blue-500">
                          <CardContent className="p-3">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <MapPin className="text-blue-600" size={16} />
                                  <h4 className="text-sm font-bold text-gray-900">JKL Corporation</h4>
                                </div>
                                <p className="text-xs text-gray-600">456 ถ.สุขุมวิท กรุงเทพฯ</p>
                              </div>
                              <Badge className="bg-blue-100 text-blue-700 text-xs">
                                <Calendar size={10} className="mr-1" />
                                Scheduled
                              </Badge>
                            </div>
                            <div className="grid grid-cols-3 gap-2 mb-2 pb-2 border-b border-gray-200">
                              <div>
                                <p className="text-xs text-gray-500">วันที่</p>
                                <p className="text-xs font-medium text-gray-900">26 มี.ค. 26</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">เวลา</p>
                                <p className="text-xs font-medium text-gray-900">14:00</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">ผู้เยี่ยม</p>
                                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">SN</div>
                              </div>
                            </div>
                            <p className="text-xs text-gray-600">วัตถุประสงค์: นำเสนอแพ็กเกจใหม่</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* Completed Column */}
                    <div className="w-80 flex-shrink-0">
                      <div className="bg-green-50 rounded-lg p-2.5 mb-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-green-900">Completed</h3>
                          <Badge className="bg-green-200 text-green-900 text-xs">52</Badge>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Card className="hover:shadow-md transition border-l-4 border-l-green-500">
                          <CardContent className="p-3">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <MapPin className="text-green-600" size={16} />
                                  <h4 className="text-sm font-bold text-gray-900">ABC Manufacturing</h4>
                                </div>
                                <p className="text-xs text-gray-600">123 ถ.พระราม 4 กรุงเทพฯ</p>
                              </div>
                              <Badge className="bg-green-100 text-green-700 text-xs">
                                <Check size={10} className="mr-1" />
                                Completed
                              </Badge>
                            </div>
                            <div className="grid grid-cols-3 gap-2 mb-2 pb-2 border-b border-gray-200">
                              <div>
                                <p className="text-xs text-gray-500">วันที่</p>
                                <p className="text-xs font-medium text-gray-900">23 มี.ค. 26</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">ระยะเวลา</p>
                                <p className="text-xs font-medium text-gray-900">1.5 ชม.</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">ผู้เยี่ยม</p>
                                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">SN</div>
                              </div>
                            </div>
                            <div className="mb-2">
                              <p className="text-xs text-gray-500 mb-1">สรุป:</p>
                              <p className="text-xs text-gray-600">พบ COO นำเสนอบริการขนส่ง ลูกค้าสนใจขอใบเสนอราคา</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50 text-xs">
                                <Handshake size={10} className="mr-1" />
                                Deal #1234
                              </Badge>
                              <Badge className="bg-green-50 text-green-700 hover:bg-green-50 text-xs">
                                <Smile size={10} className="mr-1" />
                                Positive
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* Cancelled Column */}
                    <div className="w-80 flex-shrink-0">
                      <div className="bg-red-50 rounded-lg p-2.5 mb-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-red-900">Cancelled</h3>
                          <Badge className="bg-red-200 text-red-900 text-xs">3</Badge>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Card className="hover:shadow-md transition border-l-4 border-l-red-500">
                          <CardContent className="p-3">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <MapPin className="text-red-600" size={16} />
                                  <h4 className="text-sm font-bold text-gray-900">NOP Trading</h4>
                                </div>
                                <p className="text-xs text-gray-600">789 ถ.รัชดาภิเษก กรุงเทพฯ</p>
                              </div>
                              <Badge className="bg-red-100 text-red-700 text-xs">
                                <X size={10} className="mr-1" />
                                Cancelled
                              </Badge>
                            </div>
                            <div className="grid grid-cols-3 gap-2 mb-2 pb-2 border-b border-gray-200">
                              <div>
                                <p className="text-xs text-gray-500">กำหนดการ</p>
                                <p className="text-xs font-medium text-gray-900">24 มี.ค. 26</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">ยกเลิก</p>
                                <p className="text-xs font-medium text-red-600">24 มี.ค. 26</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">ผู้เยี่ยม</p>
                                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">WK</div>
                              </div>
                            </div>
                            <p className="text-xs text-gray-600">เหตุผล: ลูกค้าขอเลื่อนนัดใหม่เป็นเดือนหน้า</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Table View - Visits */}
              {visitsView === 'table' && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">ลูกค้า</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">สถานที่</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">สถานะ</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">วันที่</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">ระยะเวลา</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">ผู้เยี่ยม</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">ผลลัพธ์</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-gray-900">ABC Manufacturing</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-xs text-gray-600">123 ถ.พระราม 4 กรุงเทพฯ</p>
                        </td>
                        <td className="px-4 py-3">
                          <Badge className="bg-green-100 text-green-700 text-xs">
                            <Check size={10} className="mr-1" />
                            Completed
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-900">23 มี.ค. 2026</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-900">1.5 ชม.</p>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">SN</div>
                            <span className="text-sm text-gray-900">สมชาย</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge className="bg-green-100 text-green-700 text-xs">
                            <Smile size={10} className="mr-1" />
                            Positive
                          </Badge>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-gray-900">JKL Corporation</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-xs text-gray-600">456 ถ.สุขุมวิท กรุงเทพฯ</p>
                        </td>
                        <td className="px-4 py-3">
                          <Badge className="bg-blue-100 text-blue-700 text-xs">
                            <Calendar size={10} className="mr-1" />
                            Scheduled
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-900">26 มี.ค. 2026</p>
                          <p className="text-xs text-gray-500">14:00 น.</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-500">-</p>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">SN</div>
                            <span className="text-sm text-gray-900">สมชาย</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-500">-</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-gray-900">NOP Trading</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-xs text-gray-600">789 ถ.รัชดาภิเษก กรุงเทพฯ</p>
                        </td>
                        <td className="px-4 py-3">
                          <Badge className="bg-red-100 text-red-700 text-xs">
                            <X size={10} className="mr-1" />
                            Cancelled
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-900 line-through">24 มี.ค. 2026</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-500">-</p>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">WK</div>
                            <span className="text-sm text-gray-900">วรรณา</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-xs text-red-600">ยกเลิก</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </main>
    </div>
  );
}
