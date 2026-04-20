import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Users,
  Building2,
  Briefcase,
  BarChart3,
  FileText,
  Sparkles,
  Check,
  Zap,
  Shield,
  Globe,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface OneLinkWelcomeProps {
  onGetStarted: () => void;
  onNavigate?: (path: string) => void;
}

export function OneLinkWelcome({ onGetStarted, onNavigate }: OneLinkWelcomeProps) {
  const { t } = useTranslation();

  const features = [
    {
      icon: Users,
      title: "จัดการลูกค้า",
      description: "ติดตามและจัดการข้อมูลลูกค้าทั้งหมดในที่เดียว",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      icon: Briefcase,
      title: "ดีลและโอกาสทางธุรกิจ",
      description: "สร้างและติดตามดีลตลอด Sales Pipeline",
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/30",
    },
    {
      icon: FileText,
      title: "เอกสารและใบเสนอราคา",
      description: "สร้างใบเสนอราคาและเอกสารแบบมืออาชีพ",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
    },
    {
      icon: BarChart3,
      title: "รายงานและวิเคราะห์",
      description: "ข้อมูลเชิงลึกและ Dashboard ที่มีประสิทธิภาพ",
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950/30",
    },
  ];

  const highlights = [
    "Clean Enterprise SaaS UI สำหรับผู้ใช้ 30+",
    "Role-based UI (Rep, Manager, Admin)",
    "Inline Editing ไม่ต้องใช้ Popup",
    "Responsive สำหรับ Mobile & Desktop",
    "Advanced Logistics Quotation Builder",
    "Professional Proposal Builder",
  ];

  const quickLinks = [
    {
      title: "Dashboard",
      description: "ภาพรวมระบบและ Metrics สำคัญ",
      path: "/onelink-dashboard",
      icon: BarChart3,
    },
    {
      title: "ดีล",
      description: "จัดการดีลทั้งหมดพร้อม Inline Editing",
      path: "/onelink-deals",
      icon: Briefcase,
    },
    {
      title: "Full Demo",
      description: "ทดลองใช้ระบบ mini CRM แบบเต็มรูปแบบ",
      path: "/onelink-demo",
      icon: Sparkles,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7BC9A6] to-[#5FB88E] flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">O</span>
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold tracking-tight">mini CRM</h1>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">
                Clean Enterprise SaaS
              </p>
            </div>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            ระบบ CRM ระดับองค์กรที่เน้น UI สะอาดและใช้งานง่าย
            <br />
            พร้อม Role-based Coloring และ Inline Editing
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <Badge className="bg-[#7BC9A6] text-white px-4 py-1.5">
              Rep = Green
            </Badge>
            <Badge className="bg-[#5B9FD8] text-white px-4 py-1.5">
              Manager = Blue
            </Badge>
            <Badge className="bg-[#E57373] text-white px-4 py-1.5">
              Admin = Red
            </Badge>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={onGetStarted}
              className="bg-gradient-to-r from-[#7BC9A6] to-[#5FB88E] hover:from-[#6CB88A] hover:to-[#4FA87D] text-white gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              <Sparkles className="h-5 w-5" />
              เริ่มต้นใช้งาน
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate?.("/onelink-demo")}
              className="gap-2"
            >
              <Zap className="h-5 w-5" />
              ทดลองใช้ Full Demo
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-border/40 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className={`p-3 rounded-xl ${feature.bgColor} w-fit mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Highlights */}
        <Card className="mb-16 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              คุณสมบัติหลัก
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-0.5 p-1 rounded-full bg-primary/10">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">{highlight}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-center mb-8">
            เริ่มต้นใช้งาน
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickLinks.map((link, index) => (
              <Card
                key={index}
                className="border-border/40 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer group"
                onClick={() => onNavigate?.(link.path)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <link.icon className="h-6 w-6 text-primary" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {link.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            <Globe className="h-4 w-4" />
            mini CRM - Built for Enterprise • Version 2.0
          </p>
        </div>
      </div>
    </div>
  );
}
