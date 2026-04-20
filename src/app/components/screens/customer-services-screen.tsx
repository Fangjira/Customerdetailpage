import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import {
  Home,
  Briefcase,
  Wine,
  Lock,
  Truck,
  Cloud,
  Package,
  Luggage,
  ShoppingBag,
  MapPin,
  Star,
  TrendingUp,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Thermometer,
  Shield,
  Clock,
} from "lucide-react";

interface CustomerServicesScreenProps {
  userEmail: string;
  onNavigate: (path: string) => void;
}

export function CustomerServicesScreen({ userEmail, onNavigate }: CustomerServicesScreenProps) {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Services Data
  const services = [
    {
      id: "personal-storage",
      icon: Home,
      name: "ห้องเก็บของส่วนตัว",
      nameEn: "Personal Storage",
      description: "เก็บของใช้ส่วนตัว เฟอร์นิเจอร์ เอกสาร ในพื้นที่ปลอดภัยและสะอาด",
      gradient: "from-purple-500 to-purple-600",
      features: ["ปลอดภัย 24/7", "ควบคุมอุณหภูมิ", "เข้าถึงได้ทุกเวลา"],
      priceFrom: "฿800",
      popular: true,
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    },
    {
      id: "business-storage",
      icon: Briefcase,
      name: "ห้องเก็บของธุรกิจ",
      nameEn: "Business Storage",
      description: "พื้นที่สำหรับธุรกิจ เก็บสินค้า สต็อก เอกสารบริษัท",
      gradient: "from-blue-500 to-blue-600",
      features: ["พื้นที่กว้าง", "รับส่งสินค้าได้", "ระบบบริหารจัดการ"],
      priceFrom: "฿2,500",
      popular: true,
      sizes: ["M", "L", "XL", "XXL", "Drive-in"],
    },
    {
      id: "wine-storage",
      icon: Wine,
      name: "ห้องเก็บไวน์",
      nameEn: "Wine Storage",
      description: "ห้องควบคุมอุณหภูมิและความชื้นสำหรับไวน์คุณภาพสูง",
      gradient: "from-rose-500 to-rose-600",
      features: ["อุณหภูมิคงที่ 12-18°C", "ความชื้น 60-70%", "ป้องกันแสง UV"],
      priceFrom: "฿5,000",
      popular: false,
      sizes: ["S", "M", "L"],
    },
    {
      id: "safe-deposit",
      icon: Lock,
      name: "ตู้นิรภัย",
      nameEn: "Safe Deposit Box",
      description: "เก็บของมีค่า เอกสารสำคัญ ในตู้นิรภัยระดับธนาคาร",
      gradient: "from-amber-500 to-amber-600",
      features: ["ระบบรักษาความปลอดภัยสูง", "ประกันภัย", "ควบคุมการเข้าถึง"],
      priceFrom: "฿3,000",
      popular: false,
      sizes: ["Mini", "S", "M"],
    },
    {
      id: "drive-in",
      icon: Truck,
      name: "ไดร์ฟอิน สตอเรจ",
      nameEn: "Drive-in Storage",
      description: "ขับรถเข้าห้องได้โดยตรง สะดวกในการขนย้ายของขนาดใหญ่",
      gradient: "from-green-500 to-green-600",
      features: ["ขับรถเข้าได้", "พื้นที่กว้างมาก", "ขนย้ายง่าย"],
      priceFrom: "฿8,000",
      popular: false,
      sizes: ["Drive-in S", "Drive-in M", "Drive-in L"],
    },
    {
      id: "cloudroom",
      icon: Cloud,
      name: "คลาวด์รูม",
      nameEn: "Cloudroom",
      description: "ห้องควบคุมอุณหภูมิและความชื้นแบบพิเศษ สำหรับของที่ต้องการดูแลเป็นพิเศษ",
      gradient: "from-cyan-500 to-cyan-600",
      features: ["ควบคุมอุณหภูมิ 20-25°C", "ควบคุมความชื้น", "ระบบกรองอากาศ"],
      priceFrom: "฿4,500",
      popular: false,
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: "locker",
      icon: Package,
      name: "ล็อกเกอร์",
      nameEn: "Locker",
      description: "ตู้ล็อกเกอร์ขนาดเล็ก เก็บของใช้ส่วนตัว เอกสาร",
      gradient: "from-indigo-500 to-indigo-600",
      features: ["ราคาประหยัด", "เหมาะกับนักศึกษา", "เข้าถึงง่าย"],
      priceFrom: "฿500",
      popular: true,
      sizes: ["Mini Locker", "Locker"],
    },
    {
      id: "luggage-transfer",
      icon: Luggage,
      name: "รับส่งกระเป๋า",
      nameEn: "Luggage Transfer",
      description: "บริการรับส่งกระเป๋าจากที่พัก/สนามบิน ไปยังโรงแรม/สถานที่ท่องเที่ยว",
      gradient: "from-orange-500 to-orange-600",
      features: ["รับส่งตรงเวลา", "ประกันภัย", "ติดตามสถานะได้"],
      priceFrom: "฿200",
      popular: true,
      sizes: ["ต่อชิ้น"],
    },
    {
      id: "daily-luggage",
      icon: ShoppingBag,
      name: "ฝากกระเป๋ารายวัน",
      nameEn: "Daily Luggage Storage",
      description: "ฝากกระเป๋าชั่วคราว เหมาะกับนักท่องเที่ยวและผู้ที่ต้องการฝากสัมภาระระหว่างวัน",
      gradient: "from-pink-500 to-pink-600",
      features: ["ฝากได้ทันที", "คิดราคารายชั่วโมง", "ใกล้แหล่งท่องเที่ยว"],
      priceFrom: "฿50",
      popular: false,
      sizes: ["รายชั่วโมง"],
    },
  ];

  // Branches Data
  const branches = [
    { id: "siam", name: "สาขาสยาม", area: "กรุงเทพฯ กลาง", services: 9 },
    { id: "ramintra", name: "สาขารามอินทรา", area: "กรุงเทพฯ เหนือ", services: 8 },
    { id: "ari", name: "สาขาอารีย์", area: "กรุงเทพฯ กลาง", services: 7 },
    { id: "asoke", name: "สาขาอโศก", area: "กรุงเทพฯ กลาง", services: 9 },
    { id: "ladprao", name: "สาขาลาดพร้าว", area: "กรุงเทพฯ เหนือ", services: 8 },
    { id: "ekkamai", name: "สาขาเอกมัย", area: "กรุงเทพฯ ตะวันออก", services: 7 },
    { id: "bangna", name: "สาขาบางนา", area: "กรุงเทพฯ ใต้", services: 9 },
    { id: "chiangmai", name: "สาขาเชียงใหม่", area: "เชียงใหม่", services: 6 },
    { id: "phuket", name: "สาขาภูเก็ต", area: "ภูเก็ต", services: 6 },
    { id: "pattaya", name: "สาขาพัทยา", area: "ชลบุรี", services: 5 },
  ];

  const popularServices = services.filter(s => s.popular);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#8b5cf6] via-[#7c3aed] to-[#6d28d9] text-white overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/25 backdrop-blur-md px-4 py-2 rounded-full mb-6 shadow-lg border border-white/30">
              <Star className="h-4 w-4 fill-yellow-300 text-yellow-300" />
              <span className="text-sm font-semibold text-white drop-shadow-md">บริการครบวงจร Self Storage อันดับ 1</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg text-white">
              ยินดีต้อนรับสู่ mini crm
            </h1>
            <p className="text-xl text-white/95 mb-8 drop-shadow-md font-medium">
              พื้นที่เก็บของที่ปลอดภัย สะอาด และเข้าถึงได้ง่าย ทั่วประเทศไทย
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                onClick={() => onNavigate("/customer-book-room")}
                size="lg"
                className="bg-white text-purple-700 hover:bg-purple-50 rounded-xl px-8 font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              >
                จองห้องเลย
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button
                onClick={() => onNavigate("/customer-dashboard")}
                size="lg"
                variant="outline"
                className="border-2 border-white bg-white/15 backdrop-blur-md text-white hover:bg-white/25 rounded-xl px-8 font-bold shadow-xl"
              >
                ดูห้องของฉัน
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 -mt-20">
          {[
            { label: "สาขาทั่วประเทศ", value: "10+", icon: MapPin, color: "from-blue-500 to-blue-600" },
            { label: "บริการหลากหลาย", value: "9", icon: Package, color: "from-purple-500 to-purple-600" },
            { label: "ลูกค้าพึงพอใจ", value: "98%", icon: TrendingUp, color: "from-green-500 to-green-600" },
            { label: "ปลอดภัย 24/7", value: "100%", icon: Shield, color: "from-orange-500 to-orange-600" },
          ].map((stat, index) => (
            <Card key={index} className="border-2 rounded-2xl shadow-lg bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Popular Services Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">บริการยอดนิยม</h2>
              <p className="text-muted-foreground">บริการที่ลูกค้าเลือกใช้มากที่สุด</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularServices.map((service) => (
              <Card
                key={service.id}
                className="border-2 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105"
                onClick={() => onNavigate("/customer-book-room")}
              >
                <CardContent className="p-0">
                  <div className={`h-32 bg-gradient-to-br ${service.gradient} flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors" />
                    <service.icon className="h-16 w-16 text-white relative z-10" />
                    <div className="absolute top-3 right-3">
                      <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current" />
                        ยอดนิยม
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-foreground mb-1">{service.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{service.description}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-primary">เริ่มต้น {service.priceFrom}</span>
                      <span className="text-xs text-muted-foreground">/เดือน</span>
                    </div>
                    <Button
                      size="sm"
                      className={`w-full bg-gradient-to-r ${service.gradient} hover:opacity-90 text-white rounded-xl`}
                      onClick={() => onNavigate("/customer-book-room")}
                    >
                      จองเลย
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Services Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">บริการทั้งหมด</h2>
              <p className="text-muted-foreground">เลือกบริการที่เหมาะสมกับความต้องการของคุณ</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card
                key={service.id}
                className="border-2 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => onNavigate("/customer-book-room")}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${service.gradient} shrink-0`}>
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground mb-1">{service.name}</h3>
                      <p className="text-xs text-muted-foreground">{service.nameEn}</p>
                    </div>
                    {service.popular && (
                      <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2 py-1 rounded-full text-xs font-bold shrink-0">
                        ยอดนิยม
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{service.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="h-3 w-3 text-green-600 dark:text-green-400 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {service.sizes.slice(0, 4).map((size, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-secondary rounded-md text-xs text-foreground"
                      >
                        {size}
                      </span>
                    ))}
                    {service.sizes.length > 4 && (
                      <span className="px-2 py-1 bg-secondary rounded-md text-xs text-muted-foreground">
                        +{service.sizes.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <span className="text-lg font-bold text-primary">{service.priceFrom}</span>
                      <span className="text-xs text-muted-foreground ml-1">/เดือน</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-primary hover:bg-secondary rounded-xl group-hover:translate-x-1 transition-transform"
                    >
                      ดูรายละเอียด
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Branches Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">สาขาทั่วประเทศ</h2>
              <p className="text-muted-foreground">เลือกสาขาที่สะดวกสำหรับคุณ</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {branches.map((branch) => (
              <Card
                key={branch.id}
                className="border-2 rounded-2xl hover:shadow-lg transition-all duration-300 cursor-pointer group hover:border-primary"
                onClick={() => onNavigate("/customer-book-room")}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="font-bold text-foreground mb-1">{branch.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{branch.area}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Package className="h-3 w-3" />
                    <span>{branch.services} บริการ</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="border-2 rounded-2xl bg-gradient-to-r from-[#a78bfa] to-[#705add] text-white overflow-hidden">
          <CardContent className="p-12 text-center relative">
            <div className="absolute inset-0 bg-white/5" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">พร้อมเริ่มใช้งานแล้วหรือยัง?</h2>
              <p className="text-purple-100 mb-8">
                จองห้องเก็บของออนไลน์ง่ายๆ ภายใน 3 นาที รับส่วนลดพิเศษสำหรับลูกค้าใหม่
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                  onClick={() => onNavigate("/customer-book-room")}
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 rounded-xl px-8 font-semibold"
                >
                  จองห้องเลย
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
                <Button
                  onClick={() => onNavigate("/customer-dashboard")}
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 rounded-xl px-8 font-semibold"
                >
                  ดูห้องของฉัน
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}