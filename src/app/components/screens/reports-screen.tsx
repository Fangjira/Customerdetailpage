import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Users,
  DollarSign,
  Target,
  TrendingUp,
  Briefcase,
  FileText,
  ListTodo,
  ChevronRight,
  Calendar,
  Building2,
  ArrowLeft,
  Trophy,
  Award,
  Star,
  MapPin,
} from "lucide-react";
import { useRoleTheme } from "../../hooks/use-role-theme";

export function ReportsScreen({ 
  onDealClick, 
  onQuotationClick, 
  onTaskClick 
}: { 
  onDealClick?: (dealId: string) => void;
  onQuotationClick?: (quotationId: string) => void;
  onTaskClick?: (taskId: string) => void;
}) {
  const roleTheme = useRoleTheme();
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"deals" | "quotations" | "tasks" | "visits">("deals");

  // ข้อมูลทีม
  const salesTeam = [
    {
      id: "1",
      name: "สมชาย วงศ์สกุล",
      avatar: "สว",
      totalDeals: 12,
      closedDeals: 10,
      dealValue: 8500000,
      performance: 95,
      location: "กรุงเทพฯ",
      quotations: 8,
      tasks: 15,
    },
    {
      id: "2",
      name: "อนุชา ศรีสวัสดิ์",
      avatar: "อศ",
      totalDeals: 10,
      closedDeals: 7,
      dealValue: 6200000,
      performance: 88,
      location: "เชียงใหม่",
      quotations: 6,
      tasks: 12,
    },
    {
      id: "3",
      name: "วิภาวี จันทร์เจริญ",
      avatar: "วจ",
      totalDeals: 15,
      closedDeals: 12,
      dealValue: 9800000,
      performance: 92,
      location: "ภูเก็ต",
      quotations: 10,
      tasks: 18,
    },
    {
      id: "4",
      name: "ธนพล รัตนพงษ์",
      avatar: "ธร",
      totalDeals: 8,
      closedDeals: 4,
      dealValue: 3200000,
      performance: 72,
      location: "ขอนแก่น",
      quotations: 5,
      tasks: 10,
    },
  ];

  // ดีลทั้งหมด
  const allDeals = [
    { id: "D-001", name: "โครงการ Logistics ABC", customer: "ABC Transport", value: 2500000, status: "เจรจา", owner: "สมชาย วงศ์สกุล", ownerAvatar: "สว", ownerId: "1" },
    { id: "D-002", name: "ระบบ Warehouse XYZ", customer: "XYZ Logistics", value: 3200000, status: "ปิดแล้ว", owner: "สมชาย วงศ์สกุล", ownerAvatar: "สว", ownerId: "1" },
    { id: "D-003", name: "ขนส่งสินค้าระหว่างประเทศ", customer: "Global Freight", value: 2800000, status: "ปิดแล้ว", owner: "สมชาย วงศ์สกุล", ownerAvatar: "สว", ownerId: "1" },
    { id: "D-004", name: "บริการขนส่งทางอากาศ", customer: "Air Cargo Plus", value: 1800000, status: "ปิดแล้ว", owner: "อนุชา ศรีสวัสดิ์", ownerAvatar: "อศ", ownerId: "2" },
    { id: "D-005", name: "โครงการคลังสินค้า", customer: "Storage Solutions", value: 2200000, status: "เสนอราคา", owner: "อนุชา ศรีสวัสดิ์", ownerAvatar: "อศ", ownerId: "2" },
    { id: "D-006", name: "ระบบจัดการคลังสินค้า", customer: "Smart Warehouse", value: 3500000, status: "ปิดแล้ว", owner: "วิภาวี จันทร์เจริญ", ownerAvatar: "วจ", ownerId: "3" },
    { id: "D-007", name: "ขนส่งทางทะเล", customer: "Ocean Freight", value: 2800000, status: "ปิดแล้ว", owner: "วิภาวี จันทร์เจริญ", ownerAvatar: "วจ", ownerId: "3" },
    { id: "D-008", name: "โครงการ Supply Chain", customer: "Supply Chain Co", value: 3500000, status: "เจรจา", owner: "วิภาวี จันทร์เจริญ", ownerAvatar: "วจ", ownerId: "3" },
    { id: "D-009", name: "บริการขนส่งสินค้า", customer: "Local Transport", value: 1200000, status: "เสนอราคา", owner: "ธนพล รัตนพงษ์", ownerAvatar: "ธร", ownerId: "4" },
    { id: "D-010", name: "ระบบติดตามสินค้า", customer: "Track Solutions", value: 2000000, status: "เจรจา", owner: "ธนพล รัตนพงษ์", ownerAvatar: "ธร", ownerId: "4" },
  ];

  // ใบเสนอราคาทั้งหมด
  const allQuotations = [
    { id: "Q-001", name: "ใบเสนอราคา Logistics ABC", customer: "ABC Transport", value: 2500000, status: "รออนุมัติ", owner: "สมชาย วงศ์สกุล", ownerAvatar: "สว", date: "20 ธ.ค. 2567", ownerId: "1" },
    { id: "Q-002", name: "ใบเสนอราคา Warehouse XYZ", customer: "XYZ Logistics", value: 3200000, status: "อนุมัติแล้ว", owner: "สมชาย วงศ์สกุล", ownerAvatar: "สว", date: "18 ธ.ค. 2567", ownerId: "1" },
    { id: "Q-003", name: "ใบเสนอราคาขนส่งทางอากาศ", customer: "Air Cargo Plus", value: 1800000, status: "อนุมัติแล้ว", owner: "อนุชา ศรีสวัสดิ์", ownerAvatar: "อศ", date: "19 ธ.ค. 2567", ownerId: "2" },
    { id: "Q-004", name: "ใบเสนอราคาคลังสินค้า", customer: "Storage Solutions", value: 2200000, status: "รออนุมัติ", owner: "อนุชา ศรีสวัสดิ์", ownerAvatar: "อศ", date: "21 ธ.ค. 2567", ownerId: "2" },
    { id: "Q-005", name: "ใบเสนอราคาระบบคลังสินค้า", customer: "Smart Warehouse", value: 3500000, status: "อนุมัติแล้ว", owner: "วิภาวี จันทร์เจริญ", ownerAvatar: "วจ", date: "17 ธ.ค. 2567", ownerId: "3" },
    { id: "Q-006", name: "ใบเสนอราคาขนส่งทางทะเล", customer: "Ocean Freight", value: 2800000, status: "อนุมัติแล้ว", owner: "วิภาวี จันทร์เจริญ", ownerAvatar: "วจ", date: "16 ธ.ค. 2567", ownerId: "3" },
    { id: "Q-007", name: "ใบเสนอราคา Supply Chain", customer: "Supply Chain Co", value: 3500000, status: "รออนุมัติ", owner: "วิภาวี จันทร์เจริญ", ownerAvatar: "วจ", date: "22 ธ.ค. 2567", ownerId: "3" },
    { id: "Q-008", name: "ใบเสนอราคาบริการขนส่ง", customer: "Local Transport", value: 1200000, status: "รออนุมัติ", owner: "ธนพล รัตนพงษ์", ownerAvatar: "ธร", date: "21 ธ.ค. 2567", ownerId: "4" },
  ];

  // งานทั้งหมด
  const allTasks = [
    { id: "T-001", title: "ติดตามใบเสนอราคา ABC", dueDate: "26 ธ.ค. 2567", status: "กำลังทำ", owner: "สมชาย วงศ์สกุล", ownerAvatar: "สว", ownerId: "1" },
    { id: "T-002", title: "นัดหมายลูกค้า XYZ", dueDate: "27 ธ.ค. 2567", status: "รอดำเนินการ", owner: "สมชาย วงศ์สกุล", ownerAvatar: "สว", ownerId: "1" },
    { id: "T-004", title: "ส่งเอกสาให้ลูกค้า", dueDate: "26 ธ.ค. 2567", status: "กำลังทำ", owner: "อนุชา ศรีสวัสดิ์", ownerAvatar: "อศ", ownerId: "2" },
    { id: "T-005", title: "เตรียมการนำเสนอ", dueDate: "29 ธ.ค. 2567", status: "รอดำเนินการ", owner: "อนุชา ศรีสวัสดิ์", ownerAvatar: "อศ", ownerId: "2" },
    { id: "T-006", title: "ประชุมกับลูกค้า", dueDate: "27 ธ.ค. 2567", status: "กำลังทำ", owner: "วิภาวี จันทร์เจริญ", ownerAvatar: "วจ", ownerId: "3" },
    { id: "T-007", title: "ติดตามการอนุมัติ", dueDate: "28 ธ.ค. 2567", status: "รอดำเนินการ", owner: "วิภาวี จันทร์เจริญ", ownerAvatar: "วจ", ownerId: "3" },
    { id: "T-009", title: "โทรหาลูกค้าใหม่", dueDate: "26 ธ.ค. 2567", status: "รอดำเนินการ", owner: "ธนพล รัตนพงษ์", ownerAvatar: "ธร", ownerId: "4" },
    { id: "T-010", title: "ส่งใบเสนอราคา", dueDate: "27 ธ.ค. 2567", status: "กำลังทำ", owner: "ธนพล รัตนพงษ์", ownerAvatar: "ธร", ownerId: "4" },
  ];

  // กิจกรรมเข้าเยี่ยมทั้งหมด
  const allVisits = [
    { id: "V-001", customer: "ABC Transport", purpose: "นำเสนอโซลูชันโลจิสติกส์", date: "18 ธ.ค. 2567", time: "10:00", location: "สำนักงานลูกค้า กรุงเทพฯ", status: "เสร็จสิ้น", result: "สนใจสูง", owner: "สมชาย วงศ์สกุล", ownerAvatar: "สว", ownerId: "1" },
    { id: "V-002", customer: "XYZ Logistics", purpose: "ติดตามหลังส่งใบเสนอราคา", date: "19 ธ.ค. 2567", time: "14:30", location: "สำนักงานลูกค้า กรุงเทพฯ", status: "เสร็จสิ้น", result: "รอพิจารณา", owner: "สมชาย วงศ์สกุล", ownerAvatar: "สว", ownerId: "1" },
    { id: "V-003", customer: "Global Freight", purpose: "ประชุมเจรจาต่อรอง", date: "20 ธ.ค. 2567", time: "11:00", location: "สำนักงานลูกค้า กรุงเทพฯ", status: "เสร็จสิ้น", result: "ปิดดีล", owner: "สมชาย วงศ์สกุล", ownerAvatar: "สว", ownerId: "1" },
    { id: "V-004", customer: "Air Cargo Plus", purpose: "นำเสนอบริการขนส่งทางอากาศ", date: "17 ธ.ค. 2567", time: "09:30", location: "สำนักงานลูกค้า เชียงใหม่", status: "เสร็จสิ้น", result: "ปิดดีล", owner: "อนุชา ศรีสวัสดิ์", ownerAvatar: "อศ", ownerId: "2" },
    { id: "V-005", customer: "Storage Solutions", purpose: "สำรวจพื้นที่คลังสินค้า", date: "21 ธ.ค. 2567", time: "13:00", location: "โรงงานลูกค้า เชียงใหม่", status: "เสร็จสิ้น", result: "สนใจสูง", owner: "อนุชา ศรีสวัสดิ์", ownerAvatar: "อศ", ownerId: "2" },
    { id: "V-006", customer: "Smart Warehouse", purpose: "Demo ระบบจัดการคลัง", date: "15 ธ.ค. 2567", time: "10:30", location: "สำนักงานลูกค้า ภูเก็ต", status: "เสร็จสิ้น", result: "ปิดดีล", owner: "วิภาวี จันทร์เจริญ", ownerAvatar: "วจ", ownerId: "3" },
    { id: "V-007", customer: "Ocean Freight", purpose: "นำเสนอบริการขนส่งทางทะเล", date: "16 ธ.ค. 2567", time: "14:00", location: "สำนักงานลูกค้า ภูเก็ต", status: "เสร็จสิ้น", result: "ปิดดีล", owner: "วิภาวี จันทร์เจริญ", ownerAvatar: "วจ", ownerId: "3" },
    { id: "V-008", customer: "Supply Chain Co", purpose: "หารือโครงการ Supply Chain", date: "22 ธ.ค. 2567", time: "15:00", location: "สำนักงานลูกค้า ภูเก็ต", status: "รอดำเนินการ", result: "-", owner: "วิภาวี จันทร์เจริญ", ownerAvatar: "วจ", ownerId: "3" },
    { id: "V-009", customer: "Local Transport", purpose: "แนะนำบริการใหม่", date: "20 ธ.ค. 2567", time: "11:30", location: "สำนักงานลูกค้า ขอนแก่น", status: "เสร็จสิ้น", result: "สนใจปานกลาง", owner: "ธนพล รัตนพงษ์", ownerAvatar: "ธร", ownerId: "4" },
    { id: "V-010", customer: "Track Solutions", purpose: "นำเสนอระบบติดตามสินค้า", date: "23 ธ.ค. 2567", time: "10:00", location: "สำนักงานลูกค้า ขอนแก่น", status: "รอดำเนินการ", result: "-", owner: "ธนพล รัตนพงษ์", ownerAvatar: "ธร", ownerId: "4" },
  ];

  // คำนวณสถิติรวม
  const totalStats = {
    totalDeals: salesTeam.reduce((sum, s) => sum + s.totalDeals, 0),
    closedDeals: salesTeam.reduce((sum, s) => sum + s.closedDeals, 0),
    totalValue: salesTeam.reduce((sum, s) => sum + s.dealValue, 0),
    avgPerformance: Math.round(
      salesTeam.reduce((sum, s) => sum + s.performance, 0) / salesTeam.length
    ),
  };

  // ฟังก์ชันกรองข้อมูลตามที่เลือก
  const filteredDeals = selectedMember
    ? allDeals.filter(d => d.ownerId === selectedMember)
    : allDeals;

  const filteredQuotations = selectedMember
    ? allQuotations.filter(q => q.ownerId === selectedMember)
    : allQuotations;

  const filteredTasks = selectedMember
    ? allTasks.filter(t => t.ownerId === selectedMember)
    : allTasks;

  const filteredVisits = selectedMember
    ? allVisits.filter(v => v.ownerId === selectedMember)
    : allVisits;

  const getStatusBadgeStyle = (status: string) => {
    if (status === "ปิดแล้ว" || status === "อนุมัติแล้ว" || status === "เสร็จสิ้น") {
      return "bg-green-100 text-green-700 border-green-200";
    } else if (status === "เจรจา" || status === "กำลังทำ") {
      return "bg-blue-100 text-blue-700 border-blue-200";
    } else {
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  const getPerformanceBadge = (score: number) => {
    if (score >= 90) return { label: "ยอดเยี่ยม", color: "bg-green-100 text-green-700 border-green-200", icon: Trophy };
    if (score >= 80) return { label: "ดีมาก", color: "bg-blue-100 text-blue-700 border-blue-200", icon: Award };
    if (score >= 70) return { label: "ดี", color: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: Star };
    return { label: "ต้องปรับปรุง", color: "bg-gray-100 text-gray-700 border-gray-200", icon: Target };
  };

  const selectedMemberData = salesTeam.find(m => m.id === selectedMember);
  const sortedTeam = [...salesTeam].sort((a, b) => b.performance - a.performance);

  // ถ้าเลือกคน แสดง Individual View
  if (selectedMember && selectedMemberData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-6">

          {/* Back Button */}
          <button
            onClick={() => setSelectedMember(null)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-medium">กลับไปภาพรวมทีม</span>
          </button>

          {/* Member Profile Card */}
          <div className="bg-white rounded-xl p-4 mb-4 border border-gray-200 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#7BC9A6] to-[#5BA88A] flex items-center justify-center">
                  <span className="text-lg font-bold text-white">{selectedMemberData.avatar}</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{selectedMemberData.name}</h2>
                  <p className="text-sm text-gray-500 mt-0.5">{selectedMemberData.location}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <div className="bg-gray-50 rounded-lg p-2 border border-gray-100">
                <p className="text-xs text-gray-500 mb-0.5">ดีลทั้งหมด</p>
                <p className="text-xl font-bold text-gray-900">{selectedMemberData.totalDeals}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 border border-gray-100">
                <p className="text-xs text-gray-500 mb-0.5">ปิดสำเร็จ</p>
                <p className="text-xl font-bold text-gray-900">{selectedMemberData.closedDeals}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 border border-gray-100">
                <p className="text-xs text-gray-500 mb-0.5">มูลค่ารวม</p>
                <p className="text-xl font-bold text-[#7BC9A6]">฿{(selectedMemberData.dealValue / 1000000).toFixed(1)}M</p>
              </div>
            </div>
          </div>

          {/* Tabs Pills */}
          <div className="mb-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveTab("deals")}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === "deals"
                    ? "bg-[#7BC9A6] text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                ดีลทั้งหมด ({filteredDeals.length})
              </button>
              <button
                onClick={() => setActiveTab("quotations")}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === "quotations"
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                ใบเสนอราคา ({filteredQuotations.length})
              </button>
              <button
                onClick={() => setActiveTab("tasks")}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === "tasks"
                    ? "bg-purple-500 text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                งานทั้งหมด ({filteredTasks.length})
              </button>
              <button
                onClick={() => setActiveTab("visits")}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === "visits"
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                กิจกรรมเข้าเยี่ยม ({filteredVisits.length})
              </button>
            </div>
          </div>

          {/* Grid Cards View */}
          {activeTab === "deals" && (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">รหัส</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ชื่อดีล</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ลูกค้า</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">มูลค่า</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">สถานะ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredDeals.map((deal) => (
                    <tr
                      key={deal.id}
                      onClick={() => {
                        console.log('Clicking deal:', deal.id);
                        onDealClick?.(deal.id);
                      }}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded bg-gradient-to-br from-[#7BC9A6] to-[#5BA88A] flex items-center justify-center">
                            <Briefcase className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{deal.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-900">{deal.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600">{deal.customer}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm font-bold text-[#7BC9A6]">
                          ฿{(deal.value / 1000000).toFixed(2)}M
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={`${getStatusBadgeStyle(deal.status)} text-xs font-medium border`}>
                          {deal.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "quotations" && (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">รหัส</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ชื่อใบเสนอราคา</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ลูกค้า</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">วันที่</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">มูลค่า</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">สถานะ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredQuotations.map((quotation) => (
                    <tr
                      key={quotation.id}
                      onClick={() => onQuotationClick?.(quotation.id)}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                            <FileText className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{quotation.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-900">{quotation.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600">{quotation.customer}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm text-gray-600">{quotation.date}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm font-bold text-blue-600">
                          ฿{(quotation.value / 1000000).toFixed(2)}M
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={`${getStatusBadgeStyle(quotation.status)} text-xs font-medium border`}>
                          {quotation.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "tasks" && (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">รหัส</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ชื่องาน</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">กำหนดส่ง</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">สถานะ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredTasks.map((task) => (
                    <tr
                      key={task.id}
                      onClick={() => onTaskClick?.(task.id)}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                            <ListTodo className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{task.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-900">{task.title}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm text-gray-600">{task.dueDate}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={`${getStatusBadgeStyle(task.status)} text-xs font-medium border`}>
                          {task.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "visits" && (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">รหัส</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ลูกค้า</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">วัตถุประสงค์</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">สถานที่</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">วันที่</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">เวลา</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">สถานะ</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ผลลัพธ์</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredVisits.map((visit) => (
                    <tr
                      key={visit.id}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                            <MapPin className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{visit.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-900">{visit.customer}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600">{visit.purpose}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600">{visit.location}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm text-gray-600">{visit.date}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm text-gray-600">{visit.time}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={`${getStatusBadgeStyle(visit.status)} text-xs font-medium border`}>
                          {visit.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm text-gray-900">{visit.result}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    );
  }

  // หน้าภาพรวมทีม (Team Overview)
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">ผลการปฏิบัติงาน Sales</h1>
          <p className="text-sm text-gray-500 mt-1">ติดตามและวัดผลการทำงานของทีมขาย</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">ทีมทั้งหมด</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{salesTeam.length} คน</p>
              </div>
              <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">ดีลรวม</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">
                  {totalStats.closedDeals}/{totalStats.totalDeals}
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">มูลค่ารวม</p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  ฿{(totalStats.totalValue / 1000000).toFixed(1)}M
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900">สมาชิกในทีม</h2>
          <p className="text-sm text-gray-500 mt-1">คลิกเพื่อดูรายละเอียดการทำงานของแต่ละคน</p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sortedTeam.map((member, index) => {
            const badge = getPerformanceBadge(member.performance);
            const IconComponent = badge.icon;
            
            return (
              <div
                key={member.id}
                onClick={() => setSelectedMember(member.id)}
                className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-lg hover:border-[#7BC9A6] transition-all cursor-pointer group"
              >
                {/* Ranking Badge */}
                {index < 3 && (
                  <div className="flex justify-end mb-2">
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      index === 0 ? "bg-yellow-100 text-yellow-700" :
                      index === 1 ? "bg-gray-100 text-gray-700" :
                      "bg-orange-100 text-orange-700"
                    }`}>
                      #{index + 1}
                    </div>
                  </div>
                )}

                {/* Avatar & Name */}
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#7BC9A6] to-[#5BA88A] flex items-center justify-center text-white text-xl font-bold mb-3 group-hover:scale-110 transition-transform">
                    {member.avatar}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#7BC9A6] transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">{member.location}</p>
                </div>

                {/* Stats */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">ดีล</span>
                    <span className="font-bold text-gray-900">
                      {member.closedDeals}/{member.totalDeals}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">มูลค่า</span>
                    <span className="font-bold text-gray-900">
                      ฿{(member.dealValue / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">การเข้าเยี่ยม</span>
                    <span className="font-bold text-gray-900">
                      {allVisits.filter(v => v.ownerId === member.id).length}
                    </span>
                  </div>
                </div>

                {/* View Details Button */}
                <Button
                  variant="ghost"
                  className="w-full text-[#7BC9A6] hover:bg-[#7BC9A6]/10 group-hover:bg-[#7BC9A6] group-hover:text-white transition-all"
                  size="sm"
                >
                  ดูรายละเอียด
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}