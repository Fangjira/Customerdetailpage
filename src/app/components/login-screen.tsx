import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { CheckCircle2, Lock, Mail, Shield, Globe, LogIn } from "lucide-react";

interface LoginScreenProps {
  onLogin: (email: string, password: string, mode: "staff" | "customer") => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  console.log("[LoginScreen] Rendering");
  
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);
  const [mode] = useState<"staff" | "customer">("staff");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowLogoutMessage(false);
    
    // Simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    onLogin(email, password, mode);
    setIsLoading(false);
  };

  const handleSSOLogin = () => {
    // Simulate SSO login
    setIsLoading(true);
    setTimeout(() => {
      onLogin("sso@onelink.com", "sso", "staff");
      setIsLoading(false);
    }, 1500);
  };

  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("demo123");
    setShowLogoutMessage(false);
    setTimeout(() => {
      onLogin(demoEmail, "demo123", demoEmail.includes("staff") ? "staff" : "customer");
    }, 500);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "th" ? "en" : "th";
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/30 via-teal-50/20 to-cyan-50/30 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Abstract Background Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-40 w-80 h-80 bg-cyan-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-40 w-72 h-72 bg-emerald-300/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-56 h-56 bg-teal-300/15 rounded-full blur-3xl"></div>
      </div>

      {/* Language Toggle */}
      <Button
        variant="outline"
        size="sm"
        onClick={toggleLanguage}
        className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all z-10 border-gray-200"
      >
        <Globe className="h-4 w-4 mr-2" />
        {i18n.language === "th" ? "EN" : "TH"}
      </Button>

      {/* Login Card */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {i18n.language === "th" ? "ยินดีต้อนรับกลับมา" : "Welcome Back"}
            </h1>
            <p className="text-sm text-gray-600">
              {i18n.language === "th" 
                ? "เข้าสู่ระบบ mini CRM ของคุณ"
                : "Sign in to your mini CRM account"}
            </p>
          </div>

          {/* Success Message (Optional) */}
          {showLogoutMessage && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-emerald-800 font-medium">
                  {i18n.language === "th" 
                    ? "ออกจากระบบสำเร็จ คุณสามารถเข้าสู่ระบบอีกครั้งได้ด้านล่าง"
                    : "Successfully logged out. You can sign in again below."}
                </p>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                {i18n.language === "th" ? "ชื่อผู้ใช้หรืออีเมล" : "Username or Email"}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="text"
                  placeholder={i18n.language === "th" ? "sunisa.k@onelink.com" : "sunisa.k@onelink.com"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-gray-50/50 border-gray-200 focus:bg-white"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                {i18n.language === "th" ? "รหัสผ่าน" : "Password"}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="•••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 bg-gray-50/50 border-gray-200 focus:bg-white"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg shadow-sm transition-all"
              disabled={isLoading}
            >
              <LogIn className="h-5 w-5 mr-2" />
              {isLoading 
                ? (i18n.language === "th" ? "กำลังเข้าสู่ระบบ..." : "Signing in...") 
                : (i18n.language === "th" ? "เข้าสู่ระบบ" : "Sign in")}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                {i18n.language === "th" ? "หรือดำเนินการต่อด้วย" : "Or continue with"}
              </span>
            </div>
          </div>

          {/* SSO Section */}
          <div className="space-y-4 mb-6">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-gray-700" />
                <span className="font-semibold text-gray-900">
                  {i18n.language === "th" ? "Single Sign-On (SSO)" : "Single Sign-On (SSO)"}
                </span>
              </div>
              <p className="text-xs text-gray-600 text-center mb-4">
                {i18n.language === "th" 
                  ? "การยืนยันตัวตนที่ปลอดภัยผ่านองค์กรของคุณ"
                  : "Secure authentication via your organization"}
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={handleSSOLogin}
                className="w-full h-11 border-gray-300 hover:bg-gray-50 font-medium"
                disabled={isLoading}
              >
                <Shield className="h-4 w-4 mr-2" />
                {i18n.language === "th" ? "เข้าสู่ระบบด้วย Single Sign-On" : "Sign in with Single Sign-On"}
              </Button>
            </div>
          </div>

          {/* Quick Demo Access */}
          <div className="space-y-3 mb-6 p-4 bg-blue-50/50 rounded-lg border border-blue-100">
            <p className="text-xs font-semibold text-blue-900 mb-2">
              {i18n.language === "th" ? "🚀 เข้าสู่ระบบด่วน (สำหรับทดสอบ)" : "🚀 Quick Demo Access"}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleDemoLogin("staff@onelink.com")}
                className="text-xs h-9 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
              >
                👤 {i18n.language === "th" ? "พนักงาน" : "Staff"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleDemoLogin("customer@onelink.com")}
                className="text-xs h-9 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
              >
                🏢 {i18n.language === "th" ? "ลูกค้า" : "Customer"}
              </Button>
            </div>
          </div>

          {/* Security Footer */}
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-gray-500" />
              <span className="text-xs font-semibold text-gray-700">
                {i18n.language === "th" 
                  ? "รักษาความปลอดภัยด้วย OAuth 2.0 + PKCE & TLS Encryption"
                  : "Secured with OAuth 2.0 + PKCE & TLS Encryption"}
              </span>
            </div>
            <p className="text-xs text-gray-500 text-center">
              {i18n.language === "th" 
                ? "วิธีการยืนยันตัวตนทั้งหมดใช้ระบบรักษาความปลอดภัยระดับองค์กร"
                : "All authentication methods use enterprise-grade security"}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            © 2024 mini CRM. {i18n.language === "th" ? "สงวนลิขสิทธิ์" : "All rights reserved."}
          </p>
        </div>
      </div>
    </div>
  );
}